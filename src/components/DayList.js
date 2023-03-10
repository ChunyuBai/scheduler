import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const listDay = days.map(day => {
    return(
      <DayListItem
      key={day.id}
      name={day.name} 
      spots={day.spots} 
      // selected={props.value&&props.value.name?day.name===props.value.name:false}
      selected={day.name===props.value}
      setDay={props.setDay}
      />)
    });
  
  return(
    <ul>
      {listDay}
    </ul>
  )
}