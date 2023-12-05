import React, { useEffect, useRef, useState } from "react";
import "./HarmingYourself.css";
import ConsumerHeader from "../../ConsumerHeader/ConsumerHeader";
import InformationModalComponent from "../../Page/InformationModalComponent/InformationModalComponent";
import { getConsumerDetailsService, uploadConsumerProfileImage } from "../../Service/Service";

const HarmingYourself = ({
  harmingYourself,
  setHarmingYourself,
  onPrevious,
  onNext,
}) => {
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
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
          if (res.data?.data?.harmingYourself !== "") {
            setHarmingYourself(res.data.data.harmingYourself);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const handleHarmingYourseft = (e) => {
    const selectedHarmingYouself = e.target.value;
    setHarmingYourself(selectedHarmingYouself);
  };

  const validateTypeOfCoach = () => {
    if (!harmingYourself) {
      return true;
    }
    return false;
  };

  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew82 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5">
                  <div className="col-md-3 text-left">
                    <p className="stepPTag AthleticsFont">Step 8 of 10</p>
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
                          In the past 6 months, have you had thoughts of suicide
                          or considered harming yourself?
                        </label>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="No-Notatall"
                            name="harmingYourself"
                            className="customradio"
                            value="No-Not at all"
                            checked={harmingYourself === "No-Not at all"}
                            onChange={handleHarmingYourseft}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="No-Notatall"
                          >
                            No - Not at all
                          </label>
                        </div>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="YesOccasionally"
                            name="harmingYourself"
                            className="customradio"
                            value="Yes Occasionally"
                            checked={harmingYourself === "Yes Occasionally"}
                            onChange={handleHarmingYourseft}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="YesOccasionally"
                          >
                            Yes Occasionally
                          </label>
                        </div>
                        <div className="form-group radioDiv">
                          <input
                            type="radio"
                            id="Yes-Often"
                            name="harmingYourself"
                            className="customradio"
                            value="Yes - Often"
                            checked={harmingYourself === "Yes - Often"}
                            onChange={handleHarmingYourseft}
                          />
                          <label
                            className="radio-button AthleticsFont"
                            htmlFor="Yes-Often"
                          >
                            Yes - Often
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
                        type="submit"
                        onClick={onNext}
                        disabled={validateTypeOfCoach()}
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
        <img src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"></img>
      </div>
    </>
  );
};

export default HarmingYourself;
