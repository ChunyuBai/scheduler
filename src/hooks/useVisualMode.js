import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode,replace = false) => {
    setMode(newMode);
    if(replace) {
      setHistory(prev => ([...prev.slice(0,prev.length-1),newMode]))
    } else {
      setHistory(prev => ([...prev, newMode]))
    }
  };
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        prev.pop()
        setMode(prev[prev.length - 1]) 
        return prev      
      })
    } else {
      setHistory(initial)
      setMode(initial)
    }
  }
  return { mode, transition, back };
}

