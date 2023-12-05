import React, { useEffect, useRef, useState } from "react";
import "./GenderAndSexualOrientation.css";
import ConsumerHeader from "../../ConsumerHeader/ConsumerHeader";
import InformationModalComponent from "../../Page/InformationModalComponent/InformationModalComponent";
import { getConsumerDetailsService, uploadConsumerProfileImage } from "../../Service/Service";
 
const GenderAndSexualOrientation = ({gender,setGender,sexualOrientation,setSexualOrientation,onPrevious,onNext }) => {
 
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const firstName = localStorage.getItem("firstName");
  
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
           if (res.data?.data?.gender !== "" && res.data?.data?.sexualOrientation !== "") {
           setGender(res.data.data.gender);
           setSexualOrientation(res.data.data.sexualOrientation);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchProfileImage();
}, [setProfileDetails]);


   const handleNext = () => {
      if (gender || sexualOrientation || gender !== "Select gender" || sexualOrientation !== "Select sexual orientation") {
        onNext();
      }
    };
  
    const validateGenderAndOrientation = () => {
      if (!gender || !sexualOrientation || gender === "Select gender" || sexualOrientation === "Select sexual orientation") {
        return true;
      }
      return false;
    };



  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainBasicInformationSection">
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
                    alt="Profile"
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
                          Hi {firstName}!
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew7 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5 text-center">
                  <div className="col-md-4 text-left">
                    <p className="stepPTag AthleticsFont position-absolute">Step 6 of 10</p>
                  </div>
                  <div
                    className="col-md-8 d-flex align-items-left justify-content-left"
                    style={{ paddingLeft: "0px" }}
                  >
                  
                  </div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                      Gender and Sexuality
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
                          What is your current gender identity?
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 mainCountrySelectBox"
                          aria-label="Default select example"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option>Select gender</option>
                          <option value="Asexual">Asexual</option>
                          <option value="Bisexual">Bisexual</option>
                          <option value="Gay">Gay</option>
                          <option value="Lesbian">Lesbian</option>
                          <option value="Pansexual">Pansexual</option>
                          <option value="PreferNotToSay">PreferNotToSay</option>
                          <option value="Queer">Queer</option>
                          <option value="Questioning or unsure">
                            Questioning or unsure
                          </option>
                          <option value="Same Gender Loving">
                            Same Gender Loving
                          </option>
                        </select>
                      </div>

                      <div className="form-group text-left mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mb-3"
                        >
                          What is your sexual orientation?
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 mainCountrySelectBox"
                          aria-label="Default select example"
                          value={sexualOrientation}
                          onChange={(e) => setSexualOrientation(e.target.value)}
                        >
                          <option>Select sexual orientation</option>
                          <option value="Asexual">Asexual</option>
                          <option value="Bisexual">Bisexual</option>
                          <option value="Gay">Gay</option>
                          <option value="Lesbian">Lesbian</option>
                          <option value="Pansexual">Pansexual</option>
                          <option value="PreferNotToSay">PreferNotToSay</option>
                          <option value="Queer">Queer</option>
                          <option value="Same Gender Loving">
                            Same Gender Loving
                          </option>
                          <option value="Not listed above">
                            Not listed above
                          </option>
                        </select>
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
                        disabled={validateGenderAndOrientation()}
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
      <div className="container-fluid bottomImageContainer">
        <img
          src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
          alt=""
        ></img>
      </div>
    </>
  );
};

export default GenderAndSexualOrientation;
