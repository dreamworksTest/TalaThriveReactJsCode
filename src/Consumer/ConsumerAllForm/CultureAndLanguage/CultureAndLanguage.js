import React, { useEffect, useRef, useState } from "react";
import "./CultureAndLanguage.css";
import ConsumerHeader from "../../ConsumerHeader/ConsumerHeader";
import InformationModalComponent from "../../Page/InformationModalComponent/InformationModalComponent";
import { getConsumerDetailsService, uploadConsumerProfileImage } from "../../Service/Service";
 
const CultureAndLanguage = ({
  language,
  setLanguage,
  culture,
  setCulture,
  onNext,
  onPrevious,
}) => {
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [showAll, setShowAll] = useState(false);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const allLanguages = [
    "Afrikaans",
    "Arabic",
    "Bengali",
    "Cantonese",
    "Danish",
    "Dutch",
    "English",
    "Farsi",
    "French",
    "German",
    "Greek",
    "Gujarati",
    "Hausa",
    "Hindi",
    "Indonesian",
    "Italian",
    "Japanese",
    "Korean",
    "Malay",
    "Mandarin",
    "Portuguese",
    "Punjabi",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Somali",
    "Spanish",
    "Swedish",
    "Tagalog",
    "Tamil",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Urdu",
    "Vietnamese",
    "Yoruba",
    "Zulu",
    "Other",
  ];
  const visibleLanguages = showAll ? allLanguages : allLanguages.slice(0, 4);

  const handleReligionOrientationChange = (languageNew) => {
    const updatedOrientations = [...language];
    const orientationIndex = updatedOrientations.indexOf(languageNew);

    if (orientationIndex !== -1) {
      updatedOrientations.splice(orientationIndex, 1);
    } else {
      updatedOrientations.push(languageNew);
    }
    setLanguage(updatedOrientations);
  };
  const handleOpenInformationClick = () => {
    setShowInformationModalComponent(true);
  };
  const handleInformationClickCloseModal = () => {
    setShowInformationModalComponent(false);
  };

  const handleDocumentClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateHandleImage(file);
    }
  };

   const updateHandleImage = async (image) => {
     try {
       const formData = new FormData();
       formData.append("fileUrl", image);
       const res = await uploadConsumerProfileImage(formData);
       if (res && res.data && res.data.data) {
         setProfileDetails({
           ...profileDetails,
           profileImage: res.data.data.profileImage,
         });
       }
     } catch (err) {
       console.log(err);
     }
   };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await getConsumerDetailsService();
        if (res && res?.data && res?.data?.data) {
          setProfileDetails(res?.data?.data);
          if (
            res.data?.data?.language !== "" &&
            res.data?.data?.culture !== ""
          ) {
            setLanguage(res.data?.data?.language);
            setCulture(res.data?.data?.culture);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const validateCultureAndLanguage = () => {
    if (!culture || !language || culture === "Select culture") {
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (culture || language || culture !== "Select culture") {
      onNext();
    }
  };

  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent CultureAndLanguageSection">
        <div className="main-panel">
          <div className="transactionSection">
            <div className="container align-items-center boxSectionNew d-flex align-items-center">
              <div className="row mainRow">
                <div className="col-md-2 mb-3 mb-md-0 position-relative">
                  <img
                    src={
                      profileDetails.profileImage
                        ? profileDetails.profileImage
                        : "../../../../assets/images/profileImage/defaultProfileImage.png"
                    }
                    alt=""
                    className="img-fluid rounded-circle roundedProfileImage"
                  />
                  <div className="edit-icon" onClick={handleDocumentClick}>
                    <img
                      src="../../../../assets/images/globalImages/editButtonImage.png"
                      alt="Edit Icon"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="col-md-10">
                  <div className="profileInfo">
                    <div className="row profileinforRow">
                      <div
                        className="col-md-6 d-flex align-items-center"
                        style={{ paddingTop: "6px" }}
                      >
                        <h1 className="profileName AthleticsFont">
                          Hi {profileDetails.firstName}!
                        </h1>
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                      </div>
                    </div>
                    <p className="mb-0 imageSectionContent AthleticsFont">
                       Help us match you with the right therapist or coach. Your
                      answers will help us identify the practitioners best
                      suited to you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew5 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-4 text-center">
                  
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">Step 2 of 10</p>
                    </div>
                 
                  <div
                    className="col-md-7 d-flex align-items-left justify-content-left"
                    style={{ paddingLeft: "0px" }}
                  >
                  
                  </div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                      Culture
                    </p>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                    <div className="mainbox2">
                      <div className="form-group text-left mb-5 mainQuestionContainer">
                        <i
                          className="fas fa-arrow-left arrow-icon goBackIcon"
                          onClick={onPrevious}
                        ></i>
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mb-3"
                        >
                          With which of the following ethnicities or cultural
                          groups do you identify?
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 mainCountrySelectBox"
                          aria-label="Default select example"
                          value={culture}
                          onChange={(e) => setCulture(e.target.value)}
                        >
                          <option>Select culture</option>
                          <option>African</option>
                          <option>Arabic</option>
                          <option>Bangladeshi</option>
                          <option>Caribbean</option>
                          <option>Chinese</option>
                          <option>
                            English, Welsh, Scottish, Northern Irish or British
                          </option>
                          <option>Gypsies/Traveller</option>
                          <option>German</option>
                          <option>Indian</option>
                          <option>Irish</option>
                          <option>Italian</option>
                          <option>Japanese</option>
                          <option>Korean</option>
                          <option>Latin</option>
                          <option>Malaysian</option>
                          <option>Other Asian background</option>
                          <option>Other Black or Caribbean background</option>
                          <option>Other Ethnic Group</option>
                          <option>Other White background</option>
                          <option>Other mixed race</option>
                          <option>Pakistani</option>
                          <option>Polish</option>
                          <option>Portuguese</option>
                          <option>Roma</option>
                          <option>Spanish</option>
                          <option>Thai</option>
                          <option>Vietnamese</option>
                          <option>White and Black African</option>
                          <option>White and Black Caribbean</option>
                          <option>White and Asian</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="form-group text-left mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mainQuestion2 mb-3"
                        >
                          Please select the languages you speak fluently
                        </label>
                        <br />
                        <span className="mainQuestionSpan AthleticsFont">
                          (check any/all that apply)
                        </span>
                      </div>
                      <div>
                        {visibleLanguages.map((languageNew) => (
                          <div
                            key={languageNew}
                            className="form-group checkboxDiv"
                          >
                            <label
                              className={`checkbox-button OutfitFont ${
                                language.includes(languageNew) ? "selected" : ""
                              }`}
                              htmlFor={languageNew.toLowerCase()}
                              onClick={() =>
                                handleReligionOrientationChange(languageNew)
                              }
                            >
                              {languageNew}
                            </label>
                          </div>
                        ))}
                        {allLanguages.length > 2 && (
                          <div
                            className="form-group checkboxDiv OutfitFont viewLessMore"
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() =>
                              setShowAll((prevShowAll) => !prevShowAll)
                            }
                          >
                            {showAll ? "View Less" : "View More"}
                          </div>
                        )}
                      </div>
                      <br />

                      {/* ... (rest of your code) ... */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex align-items-center talaThriveInformation">
                    <p onClick={() => handleOpenInformationClick()}>
                      Why does Tala Thrive need this information?
                    </p>
                  </div>
                  <div
                    className="col-md-6 d-flex align-items-center"
                    style={{ textAlign: "right" }}
                  >
                    <div className="form-group w-100">
                      <button
                        type="submit"
                        onClick={handleNext}
                        disabled={validateCultureAndLanguage()}
                        className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InformationModalComponent
              show={showInformationModal}
              onHide={handleInformationClickCloseModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CultureAndLanguage;
