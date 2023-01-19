import { useState,useEffect } from "react";
import axios from "axios"

axios.defaults.baseURL = "https://scheduler-api-chunyu.up.railway.app";

export default function useApplicationData (props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));
  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(daysURL),axios.get(appointmentsURL),axios.get(interviewersURL)
    ])
    .then(all => {
      setState(prev=> ({...prev,days:all[0].data,appointments:all[1].data,interviewers:all[2].data}))
    })
    .catch((err)=>{
      setState({
        day: "error setting data",
        days: [],
        appointments: {},
        interviewers:{}
      })
    })
    const cleanup = ()=>{
      setState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers:{}
      })
    }

    return cleanup;
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      
    };
    const days = updateSpot(true)
   return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=>{
      setState({
        ...state,
        days,
        appointments
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview:null
    }
    const appointments = {
      ...state.appointments,
      [id]:appointment
    }
    const days = updateSpot(false)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      
      setState({
        ...state,
        days,
        appointments
      });
    })
  }

  function updateSpot (isBooking) {
    const currentDayIndex = state.days.findIndex(day => day.name === state.day);
    const currentDay = {...state.days[currentDayIndex]}
    if(isBooking){
      currentDay.spots -= 1;
    } else {
      currentDay.spots += 1;
    } 
    const days = [...state.days] 
    days[currentDayIndex] = currentDay
    return days
  }

  return{state,setDay,bookInterview,cancelInterview}
  

}