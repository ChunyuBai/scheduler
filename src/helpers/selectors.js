

export function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(eachDay => eachDay.name === day)
  if(!dayObj) return [];
  return dayObj.appointments.map(apptID => {

    return state.appointments[apptID]

  })
}

export function getInterview(state, interview) {
  let interviewObj = {};
  if (!interview) {
    return null
  }
  interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }

  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(eachDay => eachDay.name === day)
  if(!dayObj) return [];
  return dayObj.interviewers.map(intID => {

    return state.interviewers[intID]

  })
}