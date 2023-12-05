import React, { useState } from 'react';
import "./AuthenticationForms.css";
import Profession from '../Profession/Profession';
import Signup from "../Signup/Signup";
 

function AuthenticationForms() {
  const [role, setRole] = useState("therapist");
  const [currentStep, setCurrentStep] = useState(0);
 
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };


  const steps = [
    <Profession onNext={nextStep} setRole={setRole} />,
    <Signup role={role}  />,
  ];

  return <div>{steps[currentStep]}</div>;
}

export default AuthenticationForms;
