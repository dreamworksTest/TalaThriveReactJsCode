import React, { useEffect, useRef, useState } from "react";
import "./ProfileImage.css";
import Header from "../../Header/Header";
import { UpdateImageService, getTherapistDetailsService } from "../../TherapistServices/TherapistServices";
 
 

const ProfileImage = ({ profileImage, setProfileImage, onNext,onPrevious }) => {
  const [imageSrc, setImageSrc] = useState(  profileImage ? URL.createObjectURL(profileImage) : "../../../../assets/images/profileImage/defaultProfileImage.png");
  const fileInputRef = useRef(null);
  const fileInputupload = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");

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
       }
     } catch (err) {
       console.log(err);
     }
   };
   fetchProfileImage();
 }, [setProfileDetails]);
  
  

    const handleProfileClick = () => {
      fileInputupload.current.click();
    };  

  
  const handleProfileUpload = (e) => {
       const file = e.target.files[0];
       setProfileImage(file);
       if (file) {
         const projectUrl = URL.createObjectURL(file);
         setImageSrc(projectUrl);
       }
     };
  


  const handleNext = () => {
    if (profileImage || imageSrc) {
      onNext();
    }
  };

  const validateProfileImage = () => {
    if (!profileImage && !profileDetails.profileImage) {
      return true;
    }
    return false;
  };
 
 

  return (
    <>
      <Header profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainProfileImageSection">
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
                      {/* <div className="col-md-6 d-flex align-items-center">
          <p className="mb-0 profileType OutfitFont">Therapist</p>
        </div> */}
                    </div>
                    <p className="mb-0 imageSectionContent">
                      We need a profile photo to approve your account
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container  align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                  <div className="mainbox2">
                    <div className="form-group mainQuestionContainer">
                      <i className="fas fa-arrow-left arrow-icon goBackIcon" onClick={onPrevious}></i>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="AthleticsFont maintitlemain"
                      >
                        We’d love to see your face
                      </label>
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="AthleticsFont profilePhotoUploadTitle"
                      >
                        Please upload a profile photo
                      </label>
                    </div>

                    <br />
                    <div className="form-group mainBigProfileImageFormGroup">
                      <img
                        src={
                          profileImage
                            ? URL.createObjectURL(profileImage)
                            : profileDetails.profileImage ||
                              "../../../../assets/images/profileImage/defaultProfileImage.png"
                        }
                        alt="Profile" id="bigSizeProfileImage"
                        className="img-fluid rounded-circle bigRoundedProfileImage"
                      />
                      <div
                        className="editIconForBigProfileImage"
                        onClick={handleProfileClick}
                      >
                        <img
                          src="../../../../assets/images/globalImages/editButtonImage.png"
                          alt="Edit Icon"
                          style={{ width: "35px", height: "35px" }}
                        />
                      </div>
                      <input
                        type="file"
                        ref={fileInputupload}
                        style={{ display: "none" }}
                        onChange={handleProfileUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 d-flex align-items-center talaThriveInformation">
                    {/* <p onClick={()=>handleOpenInformationClick()}>Why does Tala Thrive need this information?</p> */}
                  </div>
                  <div
                    className="col-md-6 d-flex align-items-center"
                    style={{ textAlign: "right" }}
                  >
                    {" "}
                    <div className="form-group w-100">
                      <button
                        type="submit"
                        onClick={handleNext}
                        disabled={validateProfileImage()}
                        className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default ProfileImage;
 