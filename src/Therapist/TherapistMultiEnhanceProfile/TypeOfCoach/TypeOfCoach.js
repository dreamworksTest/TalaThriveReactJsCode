import React, { useEffect, useRef, useState } from "react";
import Header from "../../Header/Header";
import "./TypeOfCoach.css";
import InformationModalComponent from "../../InformationModalComponent/InformationModalComponent";
import {
  UpdateImageService,
  getTherapistDetailsService,
} from "../../TherapistServices/TherapistServices";

const TypeOfCoach = ({
  typeOfCoach,
  setTypeOfCoach,
  onPrevious,
  handleSubmit,
}) => {
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");

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
      formData.append("profileImageUrl", image);
      const res = await UpdateImageService(id, formData);
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
        const res = await getTherapistDetailsService();
        if (res && res?.data && res?.data?.data) {
          setProfileDetails(res?.data?.data);
          if (res.data?.data?.typeOfCoach !== "") {
            setTypeOfCoach(res.data.data.typeOfCoach);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const handleTypeOfCoach = (e) => {
    const selectedTypeOfCoach = e.target.value;
    setTypeOfCoach(selectedTypeOfCoach);
  };

  const validateTypeOfCoach = () => {
    if (!typeOfCoach) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Header profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainTypeOfCoachSection">
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
                      Your profile’s complete! Next, you can set your
                      schedule...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5 text-center">
                  <div className="col-md-3 text-left">
                    <p className="stepPTag AthleticsFont position-absolute">
                      Step 7 of 7
                    </p>
                  </div>
                  <div
                    className="col-md-9 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                    style={{ paddingLeft: "30px" }}
                  ></div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                    What type of coach are you?
                  </p>
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
                          Choose the most applicable as you can only choose one
                        </label>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="ExecutiveCoach"
                            name="ExecutiveCoach"
                            className="customradio"
                            value="ExecutiveCoach"
                            checked={typeOfCoach === "ExecutiveCoach"}
                            onChange={handleTypeOfCoach}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="ExecutiveCoach"
                          >
                            Executive coach
                          </label>
                        </div>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="LifeCoach"
                            name="LifeCoach"
                            className="customradio"
                            value="LifeCoach"
                            checked={typeOfCoach === "LifeCoach"}
                            onChange={handleTypeOfCoach}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="LifeCoach"
                          >
                            Life coach
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
                    <p
                      className="mt-auto"
                      onClick={() => handleOpenInformationClick()}
                    >
                      Why does Tala Thrive need this information?
                    </p>
                  </div>
                  <div
                    className="col-md-6 d-flex align-items-center"
                    style={{ textAlign: "right" }}
                  >
                    <div className="w-100 nextButtonFormGroup">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={validateTypeOfCoach()}
                        className="btn btn-primary btn-block  py-3 mainnextbutton OutfitFont"
                      >
                        Save profile
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
        <img src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"></img>
      </div>
    </>
  );
};

export default TypeOfCoach;
