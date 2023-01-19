import "components/Appointment/styles.scss"
import React from "react"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "hooks/useVisualMode"
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";  
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const ERROR_SAVE ="ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer:interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id,interview)
    .then(()=> transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  function deleteInterview () {
    if(mode === CONFIRM) {
      transition(DELETING,true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));

    } else {
      transition(CONFIRM)
    }
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment" data-testid="appointment">
      <Header time = {props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE &&
       <Form 
      
      interviewers = {props.interviewers}
      onCancel ={back}
      onSave={save}
      />}
      {mode === EDIT && 
      <Form
      student = {props.interview.student}
      interviewer ={props.interview.interviewer.id}
      interviewers = {props.interviewers}
      onCancel={back}
      onSave={save}
       />}
      {mode === SHOW && 
      <Show
      student ={props.interview.student}
      interviewer ={props.interview.interviewer}
      onDelete = {deleteInterview}
      onEdit={()=> transition(EDIT)}
      />}
      {mode === SAVING && <Status message = "SAVING"/>}
      {mode === DELETING && <Status message = "DELETING" />}
      {mode === CONFIRM && <Confirm 
      message = "Are you sure to delete ?"
      onCancel = {back}
      onConfirm = {deleteInterview}
      />}
      {mode === ERROR_DELETE && 
      <Error 
      message= "Could not cancel appointment"
      onClose= {back}
      />}
      {mode === ERROR_SAVE &&
      <Error
      message="Could not save appointment"
      onClose = {back}
      />
      }
      
    </article>
  )
}