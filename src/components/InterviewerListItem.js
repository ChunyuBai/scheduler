import "components/InterviewerListItem.scss"
import React from 'react';
import classNames from "classnames";

export default function InterviewerListItem (props) {
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });
  return (
    <li className={interviewerListItemClass}
     onClick={()=>{
      console.log("id===>",props.id);
      props.setInterviewer(props.id)
    }} >
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
)
}