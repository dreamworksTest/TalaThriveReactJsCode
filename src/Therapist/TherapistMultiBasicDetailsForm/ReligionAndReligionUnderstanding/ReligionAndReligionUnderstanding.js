import React, { useEffect, useRef, useState } from "react";
import "./ReligionAndReligionUnderstanding.css";
import Header from "../../Header/Header";
import InformationModalComponent from "../../InformationModalComponent/InformationModalComponent";
import {
  UpdateImageService,
  getTherapistDetailsService,
} from "../../TherapistServices/TherapistServices";

const ReligionAndReligionUnderstanding = ({
  religionUnderstanding,
  setReligionUnderstanding,
  religion,
  setReligion,
  onNext,
  onPrevious,
}) => {
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const allLanguages = [
    "Atheist",
    "Buddhist",
    "Catholic",
    "Christian",
    "Greek Orthodox",
    "Hindu",
    "Jewish",
    "Muslim",
    "No religion",
    "Prefer not to answer",
    "Protestant",
    "Shinto",
    "Sikh",
    "Spiritual",
    "Other",
  ];

  const handleReligionOrientationChange = (languageNew) => {
    const updatedOrientations = [...religionUnderstanding];
    const orientationIndex = updatedOrientations.indexOf(languageNew);
    if (orientationIndex !== -1) {
      updatedOrientations.splice(orientationIndex, 1);
    } else {
      updatedOrientations.push(languageNew);
    }
    setReligionUnderstanding(updatedOrientations);
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
            res.data?.data?.religion !== "" &&
            res.data?.data?.religionUnderstanding !== ""
          ) {
            setReligion(res.data.data.religion);
            setReligionUnderstanding(res.data.data.religionUnderstanding);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const validateReligion = () => {
    if (
      !religion ||
      religionUnderstanding.length === 0 ||
      religion === "Select primary religious"
    ) {
      return true;
    }
    return false;
  };

  const handleNext = () => {
    if (
      religion ||
      religionUnderstanding.length !== 0 ||
      religion !== "Select primary religious"
    ) {
      onNext();
    }
  };

  return (
    <>
      <Header profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainReligionInformationSection">
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
                      The more information provided, the stronger the match with
                      your client
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew12 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-4 text-center">
                  {role === "coach" ? (
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">
                        Step 3 of 7
                      </p>
                    </div>
                  ) : (
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">
                        Step 3 of 6
                      </p>
                    </div>
                  )}
                  <div
                    className="col-md-7 d-flex align-items-left justify-content-left"
                    style={{ paddingLeft: "0px" }}
                  >
                    {/* <p className="AthleticsFont mainContainerHeading mx-auto">
                      Religion
                    </p> */}
                  </div>
                  <p className="AthleticsFont mainContainerHeading mx-auto">
                    Religion
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
                          Please select your primary religious belief and/or
                          practise
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 mainCountrySelectBox"
                          aria-label="Default select example"
                          value={religion}
                          onChange={(e) => setReligion(e.target.value)}
                        >
                          <option>Select your primary religion</option>
                          <option>Atheist</option>
                          <option>Buddhist</option>
                          <option>Catholic</option>
                          <option>Christian</option>
                          <option>Greek</option>
                          <option>Orthodox</option>
                          <option>Jewish</option>
                          <option>Muslim</option>
                          <option>No religion</option>
                          <option>Prefer not to answer</option>
                          <option>Protestant</option>
                          <option>Shinto</option>
                          <option>Sikh</option>
                          <option>Spiritual</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div className="form-group text-left mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mainQuestion2 mb-3"
                        >
                          Please select the religions you have a deep <br />
                          understanding of
                        </label>
                        <br />
                        <span className="mainQuestionSpan AthleticsFont">
                          (check any/all that apply)
                        </span>
                      </div>
                      <div>
                        {allLanguages.map((languageNew) => (
                          <div
                            key={languageNew}
                            className="form-group checkboxDiv"
                          >
                            <label
                              className={`checkbox-button OutfitFont ${
                                religionUnderstanding.includes(languageNew)
                                  ? "selected"
                                  : ""
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
                      </div>
                      <br />
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
                    <div className="w-100">
                      <button
                        onClick={handleNext}
                        disabled={validateReligion()}
                        type="submit"
                        className="btn btn-primary btn-block py-3 mainnextbutton OutfitFont"
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

export default ReligionAndReligionUnderstanding;
