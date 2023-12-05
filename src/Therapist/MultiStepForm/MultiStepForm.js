import React, { useEffect, useState } from "react";
import Bio from "../TherapistMultiEnhanceProfile/Bio/Bio";
import ProfileImage from "../TherapistMultiEnhanceProfile/ProfileImage/ProfileImage";
import TypeOfCoach from "../TherapistMultiEnhanceProfile/TypeOfCoach/TypeOfCoach";
import { useNavigate } from "react-router-dom";
import { MultipleFormServices } from "../TherapistServices/TherapistServices";
import Expertise from "../TherapistMultiEnhanceProfile/Expertise/Expertise";
import HearAboutUs from "../TherapistMultiBasicDetailsForm/HearAboutUs/HearAboutUs";
import DobAndCountryResidence from "../TherapistMultiBasicDetailsForm/DobAndCountryResidence/DobAndCountryResidence";
import GenderAndSexualOrientation from "../TherapistMultiBasicDetailsForm/GenderAndSexualOrientation/GenderAndSexualOrientation";
import CultureAndLanguage from "../TherapistMultiBasicDetailsForm/CultureAndLanguage/CultureAndLanguage";
import ReligionAndReligionUnderstanding from "../TherapistMultiBasicDetailsForm/ReligionAndReligionUnderstanding/ReligionAndReligionUnderstanding";
import FormSubmitModel from "../Page/FormSubmitModel/FormSubmitModel";
 

const MultiStepForm = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [currentStep, setCurrentStep] = useState(0);
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [culture, setCulture] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [language, setLanguage] = useState([]);
  const [religion, setReligion] = useState("");
  const [religionUnderstanding, setReligionUnderstanding] = useState([]);
  const [gender, setGender] = useState("");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [bio, setBio] = useState("");
  const [bioProfessionalExperience, setBioProfessionalExperience] = useState("");
  const [bioLivedExperience, setBioLivedExperience] = useState("");
  const [typeOfCoach, setTypeOfCoach] = useState("ExecutiveCoach");
  const [expertise, setExpertise] = useState([]);
  const [listenerAndTalker, setListenerAndTalker] = useState(1);
  const [leadsAndGiveAdvice, setLeadsAndGiveAdvice] = useState(1);
  const [supportiveAndFactual, setSupportiveAndFactual] = useState(1);
  const [nonJudgmentalAndHonesty, setNonJudgmentalAndHonesty] = useState(1);
 
  const languageStringData = language.join(", ");
  const religionStringData = religionUnderstanding.join(", ");
  const expertiseStringData = expertise.join(", ");
 
 
 
 
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
     setCurrentStep(currentStep - 1);
  }

  

    useEffect(() => {
      if (role !== "therapist" && role !== "coach") {
        navigate("/login");
      }
    }, [navigate, role]);


  const  [showSubmitForm,setShowSubmitForm]=useState(false);
  const  [ message,setMessage]=useState("");

    // const handleOpenModelForm=()=>{
    //   setShowSubmitForm(true)
    // }

    const handleCloseModelForm=()=>{
      navigate("/onBoard");
      setShowSubmitForm(false)
    }


  
    
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hearAboutUs", hearAboutUs);
      formData.append("countryOfResidence", countryOfResidence);
      formData.append("timeZone", timeZone);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("culture", culture);
      formData.append("language", languageStringData);
      formData.append("religion", religion);
      formData.append("religionUnderstanding", religionStringData);
      formData.append("gender", gender);
      formData.append("sexualOrientation", sexualOrientation);
      formData.append("profileImageUrl", profileImage);
      formData.append("bio", bio);
      formData.append("bioProfessionalExperience", bioProfessionalExperience);
      formData.append("bioLivedExperience", bioLivedExperience);
      formData.append("expertise", expertiseStringData);
      formData.append("typeOfCoach", typeOfCoach);
      formData.append("listenerAndTalker", listenerAndTalker);
      formData.append("leadsAndGiveAdvice", leadsAndGiveAdvice);
      formData.append("supportiveAndFactual", supportiveAndFactual);
      formData.append("nonJudgmentalAndHonesty", nonJudgmentalAndHonesty);

      const res = await MultipleFormServices(formData);
  
      if (res.data.statusCode === 201) {
        setShowSubmitForm(true)
        setMessage(res.data.message);
       }
    } catch (err) {
      console.log(err)
     }
  }



  const stepForm = [
   <HearAboutUs hearAboutUs={hearAboutUs} setHearAboutUs={setHearAboutUs}   onNext={handleNext} />,
   <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} onNext={handleNext}  onPrevious={handlePrevious}  />,
   <DobAndCountryResidence setTimeZone={setTimeZone} timeZone={timeZone}  countryOfResidence={countryOfResidence} setCountryOfResidence={setCountryOfResidence} dateOfBirth={dateOfBirth}   setDateOfBirth={setDateOfBirth} onPrevious={handlePrevious}  onNext={handleNext} /> ,
   <CultureAndLanguage language={language} setLanguage={setLanguage} culture={culture} setCulture={setCulture} onNext={handleNext} onPrevious={handlePrevious} />,
   <ReligionAndReligionUnderstanding religionUnderstanding={religionUnderstanding} setReligionUnderstanding={setReligionUnderstanding} religion={religion}  setReligion={setReligion} onNext={handleNext} onPrevious={handlePrevious} /> ,
   <GenderAndSexualOrientation sexualOrientation={sexualOrientation} setSexualOrientation={setSexualOrientation} gender={gender} setGender={setGender} onNext={handleNext} onPrevious={handlePrevious} />,
   <Bio  bio={bio} setBio={setBio} bioProfessionalExperience={bioProfessionalExperience} setBioProfessionalExperience={setBioProfessionalExperience} bioLivedExperience={bioLivedExperience} setBioLivedExperience={setBioLivedExperience} onNext={handleNext} onPrevious={handlePrevious}/> ,
   <Expertise handleSubmit={handleSubmit} nonJudgmentalAndHonesty={nonJudgmentalAndHonesty} setNonJudgmentalAndHonesty={setNonJudgmentalAndHonesty} supportiveAndFactual={supportiveAndFactual} setSupportiveAndFactual={setSupportiveAndFactual} leadsAndGiveAdvice={leadsAndGiveAdvice} setLeadsAndGiveAdvice={setLeadsAndGiveAdvice}  listenerAndTalker={listenerAndTalker} setListenerAndTalker={setListenerAndTalker}  expertise={expertise} setExpertise={setExpertise}  onNext={handleNext} onPrevious={handlePrevious} />,
   <TypeOfCoach handleSubmit={handleSubmit} typeOfCoach={typeOfCoach} setTypeOfCoach={setTypeOfCoach} onPrevious={handlePrevious} />,
]
 
  return (
        <>
      {role === "therapist" || role === "coach" ? (<>
   {stepForm[currentStep]}
   <FormSubmitModel show={showSubmitForm} onHide={handleCloseModelForm} message={message} />
      </>) : null}
    </>
  );
}

export default MultiStepForm;


 