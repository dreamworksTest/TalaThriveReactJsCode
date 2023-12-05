import React, { useEffect, useRef, useState } from "react";
import "./Preferences.css";
import ConsumerHeader from "../../ConsumerHeader/ConsumerHeader";
import InformationModalComponent from "../../Page/InformationModalComponent/InformationModalComponent";
import { getConsumerDetailsService, uploadConsumerProfileImage } from "../../Service/Service";
import PrefrencePopup from "../../Page/PrefrencePopup/PrefrencePopup";

const Preferences = ({ preference, setPreference, onPrevious, handleSubmit }) => {
  const [showInformationModal, setShowInformationModalComponent] = useState(false);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
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
          if (res.data?.data?.preference !== "") {
            setPreference(res.data.data.preference);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const handlePreference = (e) => {
    const selectedPreference = e.target.value;
    setPreference(selectedPreference);
  };

  const validateTypeOfCoach = () => {
    if (!preference) {
      return true;
    }
    return false;
  };

  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainPreferencesSection">
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
                    alt="Profile Image"
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew89 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5">
                  <div className="col-md-3 text-left">
                    <p className="stepPTag AthleticsFont">Step 10 of 10</p>
                  </div>
                  <div
                    className="col-md-9 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                    style={{ paddingLeft: "30px" }}
                  >
                    {/* <p className="AthleticsFont mainContainerHeading">
                      What type of coach are you?
                    </p> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                    <div className="mainbox2">
                      <div className="form-group text-left  mainQuestionContainer">
                        <i
                          className="fas fa-arrow-left arrow-icon goBackIcon"
                          onClick={onPrevious}
                        ></i>
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mb-3 bioLabel"
                        >
                          Would you prefer to have a Therapist or a coach?
                        </label>
                        <p className="AthleticsFont underline chooseBetweenCoachTherpist AthleticsFont" onClick={()=>handleOpenInformationClick()}>
                          How do I choose between coaching and therapist?
                        </p>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="Therapist"
                            name="Therapist"
                            className="customradio"
                            value="Therapist"
                            checked={preference === "Therapist"}
                            onChange={handlePreference}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="Therapist"
                          >
                            Therapist
                          </label>
                        </div>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="LifeCoach"
                            name="LifeCoach"
                            className="customradio"
                            value="LifeCoach"
                            checked={preference === "LifeCoach"}
                            onChange={handlePreference}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="LifeCoach"
                          >
                            Life coach
                          </label>
                        </div>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="ExecutiveCoach"
                            name="ExecutiveCoach"
                            className="customradio"
                            value="ExecutiveCoach"
                            checked={preference === "ExecutiveCoach"}
                            onChange={handlePreference}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="ExecutiveCoach"
                          >
                            Executive coach
                          </label>
                        </div>
                      </div>

                      <br />
                      <br />

                      {/* ... (rest of your code) ... */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex align-items-center talaThriveInformation">
                    {/* <p onClick={() => handleOpenInformationClick()}>
                      Why does Tala Thrive need this information?
                    </p> */}
                  </div>
                  <div
                    className="col-md-6 d-flex align-items-center"
                    style={{ textAlign: "right" }}
                  >
                    <div className="form-group w-100 nextButtonFormGroup">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={validateTypeOfCoach()}
                        className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                      >
                         Save profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    <div className="container customSelectedOptionsContainer" style={{ width: '820px', padding: '0px' }}>
      <div className="row customSelectedOptionsContainerRow">
        <div className="col-md-4 mb-3 col-sm-12 mainPreferencesSectionContainerColumn mainPreferenceFirstColumn">
          {/* Your content for the first div goes here */}
          <div style={{backgroundColor: '#fff'}} className={`insideMainPrefrenceSectionContainerColumn ${ preference === "Therapist" ? 'active' : ''} text-center`}>

             <h3 className="prefrenceSelectTypeHeading AthleticsFont">
             Therapist
             </h3>
             
             <div className="row">
              <div className="col-md-6"><p className="prefrenceSelectTypePricingText AthleticsFont">Pricing</p></div>
              <div className="col-md-6 text-left prefrenceSelectTypePricingPerMin"><p className="AthleticsFont">£79</p>
               <p className="AthleticsFont">Per 45 minuts</p><p className="AthleticsFont">Session</p></div>
             </div>

          </div>
        </div>
        <div className="col-md-4 mb-3 col-sm-12 mainPreferencesSectionContainerColumn mainPreferenceSecondColumn">
          {/* Your content for the second div goes here */}
          <div style={{  backgroundColor: '#fff' }} className={`insideMainPrefrenceSectionContainerColumn ${ preference === "LifeCoach" ? 'active' : ' '} text-center`}>
          <h3 className="prefrenceSelectTypeHeading AthleticsFont">
          Life coach
             </h3>
             <div className="row">
              <div className="col-md-6"><p className="prefrenceSelectTypePricingText AthleticsFont">Pricing</p></div>
              <div className="col-md-6 text-left prefrenceSelectTypePricingPerMin">
                <p className="AthleticsFont">£79</p>
               <p className="AthleticsFont">Per 45 minuts</p><p className="AthleticsFont">Session</p>
              </div>
             </div>
          </div>
        </div>
        <div className="col-md-4 mb-3 col-sm-12 mainPreferencesSectionContainerColumn mainPreferenceThirdColumn">
          {/* Your content for the third div goes here */}
          <div style={{ backgroundColor: '#fff'}} className={`insideMainPrefrenceSectionContainerColumn ${ preference === "ExecutiveCoach" ? 'active' : ''} text-center`}>
          <h3 className="prefrenceSelectTypeHeading AthleticsFont">
          Executive coach
             </h3>
             <div className="row">
              <div className="col-md-6"><p className="prefrenceSelectTypePricingText AthleticsFont">Pricing</p></div>
              <div className="col-md-6 text-left prefrenceSelectTypePricingPerMin"><p className="AthleticsFont">£79</p>
               <p className="AthleticsFont">Per 45 minuts</p><p className="AthleticsFont">Session</p></div>
             </div>
          </div>
        </div>
      </div>
    </div>
            <PrefrencePopup
              show={showInformationModal}
              onHide={handleInformationClickCloseModal}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid bottomImageContainer">
        <img src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"></img>
      </div>
    </>
  );
};

export default Preferences;
