import React, { useEffect, useRef, useState } from 'react';
import "./CultureBackground.css";
import { getConsumerDetailsService, uploadConsumerProfileImage } from '../../Service/Service';
import ConsumerHeader from '../../ConsumerHeader/ConsumerHeader';
import InformationModalComponent from '../../Page/InformationModalComponent/InformationModalComponent';

const CultureBackground = ({ cultureBackground, setCultureBackground,onNext, onPrevious  }) => {
   const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const [isNextDisabled, setIsNextDisabled] = useState(cultureBackground === 0);
 
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
            res.data?.data?.cultureBackground.length !==  0
          ) {
            setCultureBackground(res.data.data.cultureBackground);
            setIsNextDisabled(res.data.data.cultureBackground.length === 0);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

   console.log(profileDetails)
  const handleNext = () => {
    if (cultureBackground) {
      onNext();
    }
  };

  let max = 5;
  let min = 1;

  const getLinearGradient = () => {
    const percentage = ((cultureBackground- min) / (max - min)) * 100;
    return `linear-gradient(to right, #191B1C 0%, #191B1C ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
  };

  const trackStyle = {
    background: getLinearGradient(),
  };

//   const getLinearGradient1 = () => {
//     const percentage = ((leadsAndGiveAdvice - min) / (max - min)) * 100;
//     return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
//   };

//   const trackStyle1 = {
//     background: getLinearGradient1(),
//   };

//   const getLinearGradient2 = () => {
//     const percentage = ((supportiveAndFactual - min) / (max - min)) * 100;
//     return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
//   };

//   const trackStyle2 = {
//     background: getLinearGradient2(),
//   };

//   const getLinearGradient3 = () => {
//     const percentage = ((nonJudgmentalAndHonesty - min) / (max - min)) * 100;
//     return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
//   };

//   const trackStyle3 = {
//     background: getLinearGradient3(),
//   };

  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent CultureBackgroundSection">
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew99   d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-3">
                  <div className="col-md-4 text-left">
                    <p className="stepPTag AthleticsFont">Step 4 of 10</p>
                  </div>
                  {/* <div
                    className="col-md-8 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                    style={{ paddingLeft: "0px" }}
                  >
                        <p className="AthleticsFont mainContainerHeading">
                        Your area of expertise
                        </p>
                  </div> */}
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
                          How important is it that your therapist or coach is
                          from the same cultural background as you?
                        </label>           
                      </div>
                      <div className="form-group text-left mainQuestionContainer inputrangeformgroup">
                        <br />
                        <br />
                        <br />
                        <div className="d-flex justify-content-between mt-2">
                          <span className="position-absolute start-0 track1text OutfitFont">
                            Don`t care
                          </span>
                          <span className="position-absolute end-0 track2text OutfitFont">
                            Very important
                          </span>
                        </div>
                        <input
                          type="range"
                          className="custom-range"
                          onChange={(e) => setCultureBackground(e.target.value)}
                          value={cultureBackground}
                          min="1"
                          max="5"
                          step="1"
                          id="customRange"
                        />
                        <div className="d-flex justify-content-between mt-2 rangenumbers">
                          <span className="rangeNumber OutfitFont">1</span>
                          <span className="rangeNumber OutfitFont">2</span>
                          <span className="rangeNumber OutfitFont">3</span>
                          <span className="rangeNumber OutfitFont">4</span>
                          <span className="rangeNumber OutfitFont">5</span>
                        </div>
                        <style>
                          {`
          #customRange::-webkit-slider-runnable-track {
            background: ${trackStyle.background};
          }

          /* For Firefox */
          #customRange::-moz-range-track {
            background: ${trackStyle.background};
          }
        `}
                        </style>
                      </div>
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
                    <div className="form-group w-100 nextButtonFormGroup">
                      <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
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

export default CultureBackground