import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";

export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }
  // const save = () => {
  //   setStudent(props.student)
  //   setInterviewer(props.interviewer)
  // }
  return(
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={student}
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
       value={student}
       onChange={(event)=>setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
      /* your code goes here */
      interviewers = {props.interviewers}
      value = {interviewer}
      onChange={(event)=>
        {console.log("event===>",event)
        setInterviewer(event)}}
        
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick = {props.onSave}>Save</Button>
    </section>
  </section>
</main>)
}