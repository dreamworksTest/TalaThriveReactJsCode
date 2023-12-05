import React, { useEffect, useRef, useState } from 'react'
import "./Generation.css";
import ConsumerHeader from '../../ConsumerHeader/ConsumerHeader';
import InformationModalComponent from '../../Page/InformationModalComponent/InformationModalComponent';
import { getConsumerDetailsService, uploadConsumerProfileImage } from '../../Service/Service';

const Generation = ({ generation, setGeneration, onNext, onPrevious }) => {
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =useState(false);
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
          if (
            res.data?.data?.generation !== ""  
          ) {
            setGeneration(res.data.data.generation);
          }
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchProfileImage();
}, [setProfileDetails]);


   const handleNext = () => {
      if (generation) {
        onNext();
      }
    };
  
    const validateGenderAndOrientation = () => {
      if (!generation) {
        return true;
      }
      return false;
    };

    const handleGeneration = (e) => {
        const generationDetails = e.target.value;
        setGeneration(generationDetails);
    }



    return (
      <>
        <ConsumerHeader profileDetails={profileDetails} />
        <div className="container-fluid page-body-wrapper heightByContent mainGenrationSection">
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
                        Help us match you with the right therapist or coach.
                        Your answers will help us identify the practitioners
                        best suited to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                <div className="mainBox2RowUp">
                  <div className="row mb-3">
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont">Step 3 of 10</p>
                    </div>
                    <div
                      className="col-md-8 d-flex align-items-left justify-content-left"
                      style={{ paddingLeft: "16px" }}
                    >
                      {/* <p className="AthleticsFont mainContainerHeading">
                      Gender and Sexuality
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
                            className="AthleticsFont mainQuestion mb-3"
                          >
                            Are you first, second or third generation?
                          </label>

                          <div className="form-group radioDiv">
                            <input
                              type="radio"
                              id="First generation"
                              name="generation"
                              className="customradio"
                              value="First generation"
                              checked={generation === "First generation"}
                              onChange={handleGeneration}
                            />
                            <label
                              className="radio-button AthleticsFont"
                              htmlFor="First generation"
                            >
                              <p className="genrationClientOptionsPTag">
                                First generation
                              </p>
                              <span className="smallDescriptionForGenrationClient">
                                 I moved to this country
                              </span>
                            </label>
                          </div>
                          <div className="form-group radioDiv">
                            <input
                              type="radio"
                              id="SecondGeneration"
                              name="generation"
                              className="customradio"
                              value="Second generation"
                              checked={generation === "Second generation"}
                              onChange={handleGeneration}
                            />
                            <label
                              className="radio-button AthleticsFont"
                              htmlFor="SecondGeneration"
                            >
                              <p className="genrationClientOptionsPTag">
                                Second generation
                              </p>
                              <span className="smallDescriptionForGenrationClient">
                                 My parents moved to this country
                              </span>
                            </label>
                          </div>
                          <div className="form-group radioDiv">
                            <input
                              type="radio"
                              id="Third generation"
                              name="hearAbout"
                              className="customradio"
                              value="Third generation"
                              checked={generation === "Third generation"}
                              onChange={handleGeneration}
                            />
                            <label
                              className="radio-button AthleticsFont"
                              htmlFor="Third generation"
                            >
                              <p className="genrationClientOptionsPTag">
                                Third generation or more
                              </p>
                              <span className="smallDescriptionForGenrationClient">
                                 My grandparents or family further back moved to
                                this country
                              </span>
                            </label>
                          </div>
                          <div className="form-group radioDiv">
                            <input
                              type="radio"
                              id="Idon’tknow"
                              name="generation"
                              className="customradio"
                              value="I don’t know"
                              checked={generation === "I don’t know"}
                              onChange={handleGeneration}
                            />
                            <label
                              className="radio-button AthleticsFont justify-content-center d-flex align-items-center "
                              htmlFor="Idon’tknow"
                            >
                              <p className="genrationClientOptionsPTag">
                                I don’t know
                              </p>
                            </label>
                          </div>
                          <div className="form-group radioDiv">
                            <input
                              type="radio"
                              id="Iprefernottosay"
                              name="generation"
                              className="customradio"
                              value="I prefer not to say"
                              checked={generation === "I prefer not to say"}
                              onChange={handleGeneration}
                            />
                            <label
                              className="radio-button AthleticsFont justify-content-center d-flex align-items-center "
                              htmlFor="Iprefernottosay"
                            >
                              <p className="genrationClientOptionsPTag">
                                I prefer not to say
                              </p>
                            </label>
                          </div>
                        </div>

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

export default Generation