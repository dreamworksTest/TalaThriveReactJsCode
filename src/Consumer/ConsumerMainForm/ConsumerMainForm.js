import React, { useEffect, useState } from "react";
import "./ConsumerMainForm.css";
import { useNavigate } from "react-router-dom";
import { consumerMultipleFormServices } from "../Service/Service";
import HearAboutUs from "../ConsumerAllForm/HearAboutUs/HearAboutUs";
import DobAndCountry from "../ConsumerAllForm/DobAndCountry/DobAndCountry";
import CultureAndLanguage from "../ConsumerAllForm/CultureAndLanguage/CultureAndLanguage";
import Generation from "../ConsumerAllForm/Generation/Generation";
import Religion from "../ConsumerAllForm/Religion/Religion";
import GenderAndSexualOrientation from "../ConsumerAllForm/GenderAndSexualOrientation/GenderAndSexualOrientation";
import Support from "../ConsumerAllForm/Support/Support";
import CultureBackground from "../ConsumerAllForm/CultureBackground/CultureBackground";
import HarmingYourself from "../ConsumerAllForm/HarmingYourself/HarmingYourseft";
import Situation from "../ConsumerAllForm/Situation/Situation";
import Preferences from "../ConsumerAllForm/Preferences/Preferences";
import FormSubmitModel from "../Page/FormSubmitModel/FormSubmitModel";
 
 

const ConsumerMainForm = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [culture, setCulture] = useState("");
  const [language, setLanguage] = useState([])
  const[generation,setGeneration]=useState("")
  const [primaryReligion, setPrimaryReligion] = useState("")
  const [gender, setGender] = useState("");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [expertise, setExpertise] = useState([]);
  const [cultureBackground, setCultureBackground] = useState(1);
  const [harmingYourself, setHarmingYourself] = useState("");
  const [situation, setSituation] = useState(1);
  const [preference, setPreference] = useState("");
  const [observingAndCurious] = useState(1);
  const [intuiativeAndFactual] = useState(1);
  const [explorativeAndStructured] = useState(1);
  const [listnerAndTalker] = useState(1);
  const [leadAndAdvice] = useState(1);
  const [warmAndFactual] = useState(1);
  const [nonJudgmentalAndHonesty] = useState(1);

console.log(cultureBackground);
    const handleNext = () => {
      setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
      setCurrentStep(currentStep - 1);
    };


      const [showSubmitForm, setShowSubmitForm] = useState(false);
      const [message, setMessage] = useState("");

      // const handleOpenModelForm=()=>{
      //   setShowSubmitForm(true)
      // }

      const handleCloseModelForm = () => {
        // navigate("/onBoard");
        setShowSubmitForm(false);
      };
 
   
  const handleSubmit = async (e) => {
      e.preventDefault();
    try {
        const userDetails = {
          hearAboutUs: hearAboutUs,
          country: country,
          timeZone: timeZone,
          dateOfBirth: dateOfBirth,
          culture: culture,
          language: language,
          generation: generation,
          cultureBackground: 1*cultureBackground,
          primaryReligion: primaryReligion,
          gender: gender,
          sexualOrientation: sexualOrientation,
          support: expertise,
          harmingYourself: harmingYourself,
          situation: 1*situation,
          preference:preference,
          observingAndCurious: observingAndCurious,
          intuiativeAndFactual: intuiativeAndFactual,
          explorativeAndStructured: explorativeAndStructured,
          listnerAndTalker: listnerAndTalker,
          leadAndAdvice: leadAndAdvice,
          warmAndFactual: warmAndFactual,
          nonJudgmentalAndHonesty: nonJudgmentalAndHonesty,
        };
      console.log(userDetails)
      const res = await consumerMultipleFormServices(userDetails);
        
      if (res.data.statusCode === 201) {
        setShowSubmitForm(true);
        var newProfileStatus = true
        localStorage.setItem("isProfileCompleted", newProfileStatus);
        setMessage(res.data.message);
      }
      } catch (err) {
        console.log(err);
      }
    };


   
 


    const stepForm = [
   <HearAboutUs hearAboutUs={hearAboutUs} setHearAboutUs={setHearAboutUs}   onNext={handleNext} />,
   <DobAndCountry timeZone={timeZone} setTimeZone={setTimeZone}   country={country} setCountry={setCountry} dateOfBirth={dateOfBirth}   setDateOfBirth={setDateOfBirth} onPrevious={handlePrevious}  onNext={handleNext} /> ,
   <CultureAndLanguage language={language} setLanguage={setLanguage} culture={culture} setCulture={setCulture} onNext={handleNext} onPrevious={handlePrevious} />,
   <Generation generation={generation} setGeneration={setGeneration} onNext={handleNext} onPrevious={handlePrevious}  />,
   <CultureBackground  cultureBackground={cultureBackground} setCultureBackground={setCultureBackground} onNext={handleNext} onPrevious={handlePrevious} />,
   <Religion primaryReligion={primaryReligion} setPrimaryReligion={setPrimaryReligion} onNext={handleNext} onPrevious={handlePrevious} />,
   <GenderAndSexualOrientation sexualOrientation={sexualOrientation} setSexualOrientation={setSexualOrientation} gender={gender} setGender={setGender} onNext={handleNext} onPrevious={handlePrevious} />,
   <Support expertise={expertise} setExpertise={setExpertise}  onNext={handleNext} onPrevious={handlePrevious} />,
   <HarmingYourself harmingYourself={harmingYourself} setHarmingYourself={setHarmingYourself} onNext={handleNext} onPrevious={handlePrevious} />,
   <Situation  situation={situation} setSituation={setSituation} onNext={handleNext} onPrevious={handlePrevious} />,
   <Preferences preference={preference} setPreference={setPreference} onPrevious={handlePrevious} handleSubmit={handleSubmit} />,
    ]
  
  

    

   useEffect(() => {
     if (role !== "consumer") {
       navigate("/consumerLogin");
     }
   }, [navigate, role]);

  return (
    <>
      {role === "consumer" ? (
    <>
   {stepForm[currentStep]}
   <FormSubmitModel show={showSubmitForm} onHide={handleCloseModelForm} message={message} />
    </>
        ) : null}
      </>
  );
};

export default ConsumerMainForm;
