import React, { useEffect, useRef, useState } from "react";
import "./Bio.css";
import Header from "../../Header/Header";
import InformationModalComponent from "../../InformationModalComponent/InformationModalComponent";
import {
  UpdateImageService,
  getTherapistDetailsService,
} from "../../TherapistServices/TherapistServices";

const Bio = ({
  bio,
  setBio,
  bioProfessionalExperience,
  setBioProfessionalExperience,
  bioLivedExperience,
  setBioLivedExperience,
  onNext,
  onPrevious,
}) => {
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
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
          if (
            res.data?.data?.bio !== "" &&
            res.data?.data?.bioProfessionalExperience !== "" &&
            res.data?.data?.bioLivedExperience !== ""
          ) {
            setBio(res.data.data.bio);
            setBioProfessionalExperience(
              res.data.data.bioProfessionalExperience
            );
            setBioLivedExperience(res.data.data.bioLivedExperience);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const maxWords = 100;

  const countWords = (text) => {
    if (!text) {
      return 0;
    }
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const validateBio = () => {
    if (!bio || !bioProfessionalExperience || !bioLivedExperience) {
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (bio && bioProfessionalExperience && bioLivedExperience) {
      onNext();
    }
  };

  return (
    <>
      <Header profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainBioSection">
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
                          Hi {profileDetails.firstName}!
                        </h1>
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                      </div>
                    </div>
                    <p className="mb-0 imageSectionContent AthleticsFont">
                      Let’s enhance your profile, this will help clients get to
                      know you
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew3 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5 text-center">
                  {role === "coach" ? (
                    <div className="col-md-5 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">
                        Step 5 of 7
                      </p>
                    </div>
                  ) : (
                    <div className="col-md-5 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">
                        Step 5 of 6
                      </p>
                    </div>
                  )}
                  <div
                    className="col-md-7 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                    style={{ paddingLeft: "0px" }}
                  ></div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                    Your bio
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
                          Tell us about yourself
                        </label>
                        <textarea
                          id="textArea1"
                          className="OutfitFont md-textarea form-control"
                          rows="5"
                          placeholder="Write something about yourself"
                          value={bio}
                          onChange={(e) => {
                            if (countWords(e.target.value.trim()) <= maxWords) {
                              setBio(e.target.value);
                            }
                          }}
                        />
                        <small className="form-text text-muted my-2 text-end AthleticsFont">
                          {countWords(bio)}/{maxWords} Words
                        </small>
                      </div>

                      <div className="form-group text-left mainQuestionContainer">
                        <label
                          className="OutfitFont bioLabel"
                          htmlFor="textArea2"
                        >
                          Tell us about your professional experience
                        </label>
                        <textarea
                          id="textArea2"
                          className="OutfitFont md-textarea form-control"
                          rows="5"
                          placeholder="Write about your professional experience"
                          value={bioProfessionalExperience}
                          onChange={(e) => {
                            if (countWords(e.target.value.trim()) <= maxWords) {
                              setBioProfessionalExperience(e.target.value);
                            }
                          }}
                        />
                        <small className="form-text text-muted my-2 text-align-right text-end AthleticsFont">
                          {countWords(bioProfessionalExperience)}/{maxWords}{" "}
                          Words
                        </small>
                      </div>

                      <div className="form-group text-left mainQuestionContainer">
                        <label
                          className="OutfitFont bioLabel"
                          htmlFor="textArea3"
                        >
                          Tell us about your lived experience
                        </label>
                        <textarea
                          id="textArea3"
                          className="OutfitFont md-textarea form-control"
                          rows="5"
                          placeholder="Write something about your lived experience"
                          value={bioLivedExperience}
                          onChange={(e) => {
                            if (countWords(e.target.value.trim()) <= maxWords) {
                              setBioLivedExperience(e.target.value);
                            }
                          }}
                        />
                        <small className="form-text text-muted my-2 text-end AthleticsFont">
                          {countWords(bioLivedExperience)}/{maxWords} Words
                        </small>
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
                        onClick={handleNext}
                        disabled={validateBio()}
                        className="btn btn-primary btn-block  py-3 mainnextbutton OutfitFont"
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

export default Bio;
