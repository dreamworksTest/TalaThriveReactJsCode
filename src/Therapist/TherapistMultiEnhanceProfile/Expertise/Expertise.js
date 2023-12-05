import React from "react";
import "./Expertise.css";
import TherapistExpertise from "../TherapistExpertise/TherapistExpertise";
// import CoachExpertise from "../CoachExpertise/CoachExpertise";

const Expertise = ({ nonJudgmentalAndHonesty,setNonJudgmentalAndHonesty,supportiveAndFactual,setSupportiveAndFactual,leadsAndGiveAdvice,setLeadsAndGiveAdvice,listenerAndTalker,setListenerAndTalker,expertise,setExpertise, onNext, onPrevious,handleSubmit }) => {
  // const role = localStorage.getItem("role");
 

  return   (<TherapistExpertise handleSubmit={handleSubmit} nonJudgmentalAndHonesty={nonJudgmentalAndHonesty} setNonJudgmentalAndHonesty={setNonJudgmentalAndHonesty} supportiveAndFactual={supportiveAndFactual} setSupportiveAndFactual={setSupportiveAndFactual} leadsAndGiveAdvice={leadsAndGiveAdvice} setLeadsAndGiveAdvice={setLeadsAndGiveAdvice}  listenerAndTalker={listenerAndTalker} setListenerAndTalker={setListenerAndTalker} expertise={expertise} setExpertise={setExpertise} onNext={onNext} onPrevious={onPrevious} />)
  // ) : (
    // <CoachExpertise  nonJudgmentalAndHonesty={nonJudgmentalAndHonesty} setNonJudgmentalAndHonesty={setNonJudgmentalAndHonesty} supportiveAndFactual={supportiveAndFactual} setSupportiveAndFactual={setSupportiveAndFactual} leadsAndGiveAdvice={leadsAndGiveAdvice} setLeadsAndGiveAdvice={setLeadsAndGiveAdvice}  listenerAndTalker={listenerAndTalker} setListenerAndTalker={setListenerAndTalker} expertise={expertise} setExpertise={setExpertise} onNext={onNext} onPrevious={onPrevious} />
  // );
};

export default Expertise;
