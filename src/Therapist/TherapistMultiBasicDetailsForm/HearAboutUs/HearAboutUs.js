import React, { useEffect, useRef, useState } from "react";
import "./HearAboutUs.css";
import Header from "../../Header/Header";
// import InformationModalComponent from "../../InformationModalComponent/InformationModalComponent";
import { UpdateImageService, getTherapistDetailsService } from "../../TherapistServices/TherapistServices";
import { Link } from "react-router-dom";
//  import { Link } from "react-router-dom";
 
const HearAboutUs = ({ hearAboutUs, setHearAboutUs, onNext }) => {
  const [profileDetails, setProfileDetails] = useState({});
  const fileInputRef = useRef(null);
  // const [showInformationModal, setShowInformationModalComponent] = useState(false);
  const id = localStorage.getItem("id");

  // const handleOpenInformationClick = () => {  
  //   setShowInformationModalComponent(true);
  // };

  // const handleInformationClickCloseModal = () => {
  //   setShowInformationModalComponent(false);
  // };

 
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
      console.log(res.data)
      //   if (res && res.data && res.data.data) {
      //  setProfileDetails({ ...profileDetails, profileImage: res.data.data.profileImage });
      //   }
    } catch (err) {
      console.log(err);
    }
  };


    useEffect(() => {
      const fetchProfileImage = async () => {
        try {
          const res = await getTherapistDetailsService();
          if (res && res.data && res.data.data) {
            setProfileDetails(res.data.data);
            if (res.data?.data?.hearAboutUs !== "") {
            setHearAboutUs(res.data?.data?.hearAboutUs);
          }
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchProfileImage();
    }, [setProfileDetails]);
  

const  validateHearAboutUs = () => {
  if (!hearAboutUs) {
    return true;
  }
  return false;
}
  
 
  
  
  
    const handleHearAboutUs = (e) => {
      const selectedHearAboutUs = e.target.value;
      setHearAboutUs(selectedHearAboutUs);
      // Store the selected value in local storage
   
    };
  
    const handleNext = () => {
      if (hearAboutUs) {
        onNext();
      }
    };
  
 

  return (
    <>
      <Header profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainHearAboutUsSection">
        <div className="main-panel">
          <div className="transactionSection">
            <div className="container  align-items-center boxSectionNew d-flex align-items-center">
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
                        <p className="mb-0 profileType OutfitFont"> </p>
                      </div>
                    </div>
                    {/* <p className="mb-0 imageSectionContent AthleticsFont">
                      + Add a profile picture to help clients find you!
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="container  align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                  <div className="mainbox2">
                    <div className="form-group mainQuestionContainer">
                      <Link to="/onBoard">
                        <i className="fas fa-arrow-left arrow-icon goBackIcon"></i>
                      </Link>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="AthleticsFont maintitlemain"
                      >
                        How did you hear about us?
                      </label>
                    </div>
                    <br />
                    <br />
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="BAATNNetwork"
                        name="hearAbout"
                        className="customradio"
                        value="BAATNNetwork"
                        checked={hearAboutUs === "BAATNNetwork"}
                        onChange={handleHearAboutUs}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="BAATNNetwork"
                      >
                        BAATN Network
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Facebook"
                        name="hearAbout"
                        className="customradio"
                        value="Facebook"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Facebook"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Facebook"
                      >
                        Facebook
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="FriendOrFamilyMember"
                        name="hearAbout"
                        className="customradio"
                        value="Friend Or Family Member"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Friend Or Family Member"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="FriendOrFamilyMember"
                      >
                        Friend or family member
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Google/OnlineSearch"
                        name="hearAbout"
                        className="customradio"
                        value="Google/OnlineSearch"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Google/OnlineSearch"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Google/OnlineSearch"
                      >
                        Google/Online search
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="ICF"
                        name="hearAbout"
                        className="customradio"
                        value="ICF"
                        checked={hearAboutUs === "ICF"}
                        onChange={handleHearAboutUs}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="ICF"
                      >
                        ICF
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Influencer"
                        name="hearAbout"
                        className="customradio"
                        value="Influencer"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Influencer"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Influencer"
                      >
                        Influencer
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Instagram"
                        name="hearAbout"
                        className="customradio"
                        value="Instagram"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Instagram"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Instagram"
                      >
                        Instagram
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="LinkedIn"
                        name="hearAbout"
                        className="customradio"
                        value="LinkedIn"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "LinkedIn"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="LinkedIn"
                      >
                        LinkedIn
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Newsletters"
                        name="hearAbout"
                        className="customradio"
                        value="Newsletters"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Newsletters"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Newsletters"
                      >
                        Newsletters
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="PsychologyToday"
                        name="hearAbout"
                        className="customradio"
                        value="PsychologyToday"
                        checked={hearAboutUs === "PsychologyToday"}
                        onChange={handleHearAboutUs}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="PsychologyToday"
                      >
                        Psychology Today
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="ReferralFromOneOfOurAmazingTherapistsOrCoaches"
                        name="hearAbout"
                        className="customradio"
                        value="ReferralFromOneOfOurAmazingTherapistsOrCoaches"
                        onChange={handleHearAboutUs}
                        checked={
                          hearAboutUs ===
                          "ReferralFromOneOfOurAmazingTherapistsOrCoaches"
                        }
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="ReferralFromOneOfOurAmazingTherapistsOrCoaches"
                      >
                        Referral from one of our amazing therapists or coaches
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="TalaThriveteam"
                        name="hearAbout"
                        className="customradio"
                        value="Tala Thrive team"
                        checked={hearAboutUs === "Tala Thrive team"}
                        onChange={handleHearAboutUs}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Tala Thrive team
"
                      >
                        Tala Thrive team
                      </label>
                    </div>
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="TikTok"
                        name="hearAbout"
                        className="customradio"
                        value="TikTok"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "TikTok"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="TikTok"
                      >
                        TikTok
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="TV"
                        name="hearAbout"
                        className="customradio"
                        value="TV"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "TV"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="TV"
                      >
                        TV
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="UsdirectlycContactingYou"
                        name="hearAbout"
                        className="customradio"
                        value="Us directly Contacting You"
                        checked={hearAboutUs === "Us directly Contacting You"}
                        onChange={handleHearAboutUs}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="UsdirectlycContactingYou"
                      >
                        Us directly contacting you
                      </label>
                    </div>

                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="YouTube"
                        name="hearAbout"
                        className="customradio"
                        value="YouTube"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "YouTube"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="YouTube"
                      >
                        YouTube
                      </label>
                    </div>
                    {/* <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="WordOfMouth"
                        name="hearAbout"
                        className="customradio"
                        value="WordOfMouth"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "WordOfMouth"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="WordOfMouth"
                      >
                        Word of mouth
                      </label>
                    </div> */}
                    <div className="form-group radioDiv">
                      <input
                        type="radio"
                        id="Other"
                        name="hearAbout"
                        className="customradio"
                        value="Other"
                        onChange={handleHearAboutUs}
                        checked={hearAboutUs === "Other"}
                      />
                      <label
                        className="radio-button AthleticsFont"
                        htmlFor="Other"
                      >
                        Other
                      </label>
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
                    {" "}
                    <div className="form-group w-100">
                      <button
                        type="submit"
                        disabled={validateHearAboutUs()}
                        onClick={handleNext}
                        className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <InformationModalComponent
              show={showInformationModal}
              onHide={handleInformationClickCloseModal}
            /> */}
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
 
export default HearAboutUs;
