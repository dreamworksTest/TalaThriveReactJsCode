import React, { useEffect, useRef, useState } from "react";
import "./DobAndCountry.css";
// import SorryPopup from "../../SorryPopup/SorryPopup";
// import SorryPopupDob from "../../Page/SorryPopupDob/SorryPopupDob";
import { getConsumerDetailsService, uploadConsumerProfileImage } from "../../Service/Service";
import ConsumerHeader from "../../ConsumerHeader/ConsumerHeader";
import InformationModalComponent from "../../Page/InformationModalComponent/InformationModalComponent";
import SorryPopup from "../../Page/SorryPopup/SorryPopup";

const DobAndCountry = ({
  country,
  setCountry,
  dateOfBirth,
  setDateOfBirth,
  onNext,
  onPrevious,
  timeZone,
  setTimeZone,
}) => {
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
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
            res.data?.data?.country !== "" &&
            res.data?.data?.dateOfBirth !== "" &&
            res.data?.data?.timeZone !== ""
          ) {
            setTimeZone(res.data.data.timeZone);
            setCountry(res.data.data.country);
            const details = res.data.data.dateOfBirth;
            setDateOfBirth(retrieveFormattedDate(details));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const retrieveFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

 

  const handleNext = () => {
    if (
      dateOfBirth ||
      country ||
      country !== "Select country"
    ) {
      onNext();
    }
  };

  const validateDobAndCountry = () => {
    if (
      !dateOfBirth ||
      !country ||
      country === "Select country" ||
      country === "Other"
    ) {
      return true;
    }
    return false;
  };

  const [showSorryModal, setShowSorryModal] = useState(false);
  useEffect(() => {
    if (country === "Other") {
      setShowSorryModal(true);
    }
  }, [country]);

  const handleCountryEditClick = () => {
  setShowSorryModal(true);
  };

  const handleSorryCloseModal = () => {
    setShowSorryModal(false);
  };

  // const [showSorryDobModal, setShowSorryDobModal] = useState(false);

  // const handleSorryDobEditClick = () => {
  // setShowSorryDobModal(true);
  // };

  // const handleSorryDobCloseModal = () => {
  //   setShowSorryDobModal(false);
  // };

  // const isUnder18 = (inputValue) => {
  //   const today = new Date();
  //   const birthDate = new Date(inputValue);
  //   const age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   const dayDiff = today.getDate() - birthDate.getDate();

  //   if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
  //     return age - 1;
  //   } else {
  //     return age;
  //   }
  // };

  const handleDateInputChangeDateOfBirth = (e) => {
    const inputValue = e.target.value;
       setDateOfBirth(inputValue);
    // const age = inputValue ? isUnder18(inputValue) : null;
    // if (age > 18) {
    //   setDateOfBirth(inputValue);
    // } else {
    //   setShowSorryDobModal(true);
    // }
  };

  const handleCountryChange = (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const selectedCountry = selectedOption.textContent;
    const selectedTimeZone = selectedOption.getAttribute("timeZone");

    setCountry(selectedCountry);
    setTimeZone(selectedTimeZone);
  };

  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainDOBAndCountrySection">
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
                    alt="Profile "
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew13 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5 text-center">
            
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">Step 1 of 10</p>
                    </div>
                
                  <div
                    className="col-md-8 d-flex align-items-left justify-content-left"
                    style={{ paddingLeft: "0px" }}
                  >
                   
                  </div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                      Basic information
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
                          className="AthleticsFont mainQuestion"
                        >
                          What is your country of residence?
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 mainCountrySelectBox"
                          aria-label="Default select example"
                          value={country}
                          onChange={handleCountryChange}
                        >
                          <option>Select country</option>
                          <option timezone="Australia/Sydney">Australia</option>
                          <option timezone="Europe/Vienna">Austria</option>
                          <option timezone="Europe/Brussels">Belgium</option>
                          <option timezone="Europe/Sofia">Bulgaria</option>
                          <option timezone="Canada/Eastern">Canada</option>
                          <option timezone="Europe/Zagreb">Croatia</option>
                          <option timezone="Asia/Nicosia">Cyprus</option>
                          <option timezone="Europe/Prague">
                            Czech Republic
                          </option>
                          <option timezone="Europe/Copenhagen">Denmark</option>
                          <option timezone="Europe/Tallinn">Estonia</option>
                          <option timezone="Europe/Helsinki">Finland</option>
                          <option timezone="Europe/Paris">France</option>
                          <option timezone="Europe/Berlin">Germany</option>
                          <option timezone="Europe/Athens">Greece</option>
                          <option timezone="Europe/Budapest">Hungary</option>
                          <option timezone="Europe/Dublin">Ireland</option>
                          <option timezone="Europe/Rome">Italy</option>
                          <option timezone="Europe/Riga">Latvia</option>
                          <option timezone="Europe/Vilnius">Lithuania</option>
                          <option timezone="Europe/Luxembourg">
                            Luxembourg
                          </option>
                          <option timezone="Europe/Malta">Malta</option>
                          <option timezone="Europe/Amsterdam">
                            Netherlands
                          </option>
                          <option timezone="Pacific/Auckland">
                            New Zealand
                          </option>
                          <option timezone="Europe/Warsaw">Poland</option>
                          <option timezone="Europe/Lisbon">Portugal</option>
                          <option timezone="Europe/Bucharest">Romania</option>
                          <option timezone="Europe/Bratislava">Slovakia</option>
                          <option timezone="Europe/Ljubljana">Slovenia</option>
                          <option timezone="Europe/Madrid">Spain</option>
                          <option timezone="Europe/Stockholm">Sweden</option>
                          <option timezone="Europe/London">
                            United Kingdom
                          </option>
                          <option onClick={handleCountryEditClick}>Other</option>
                        </select>
                        <span className="mainQuestionSpanCountry AthleticsFont">
                          *We are required to ask this for safety and regulatory
                          reasons.
                        </span>
                      </div>

                      <div className="form-group text-left mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mb-3"
                        >
                          What is your date of birth?
                        </label>
                        <input
                          className="form-control mainDOBInput"
                          type="date"
                          placeholder="DD/MM/YYYY"
                          value={dateOfBirth}
                          // onChange={(e) => handleDateInputChange(e.target.value)}
                          onChange={handleDateInputChangeDateOfBirth}
                        />
                        <span className="mainQuestionSpanCountry AthleticsFont">
                          *We are required to ask this for safety and regulatory
                          reasons.
                        </span>
                      </div>
                      <br />
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
                        disabled={validateDobAndCountry()}
                        className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SorryPopup show={showSorryModal} onHide={handleSorryCloseModal} />
            {/* <SorryPopupDob
              show={showSorryDobModal}
              onHide={handleSorryDobCloseModal}
            /> */}
            <InformationModalComponent
              show={showInformationModal}
              onHide={handleInformationClickCloseModal}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid bottomImageContainer">
        <img
          src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
          alt=""
        ></img>
      </div>
    </>
  );
};

export default DobAndCountry;
