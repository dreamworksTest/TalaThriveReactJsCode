import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import ProfileBio from "./profileBio";
import Header from "../Header/Header";
import { UpdateCertificateService, UpdateImageService, UpdateInsuranceService, UpdateTherapistProfileService, getTherapistDetailsService } from "../TherapistServices/TherapistServices";
import { Link, useNavigate } from "react-router-dom";
import ProfileCountry from "./profileCountry";
import ProfileTags from "./profileTags";
import ProfileGender from "./profileGender";
import ProfileCulture from "./ProfileCulture";
import ProfileSexualOrientation from "./profileSexualOrientation";
import ProfileReligion from "./ProfileReligion";
import ProfileLanguage from "./profileLanguage";
 


const Profile = () => {
  const [isChecked, setIsChecked] = useState(true);
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  const certificateInputRef = useRef(null);
  const insuranceInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
 
  // upload insurance
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateHandleInsurance(file); // Call the update function after setting the image source
    }
  };

  const updateHandleInsurance = async (insurance) => {
    try {
  
      const formData = new FormData();
      formData.append("insurance", insurance);
      const res = await UpdateInsuranceService(formData);
      setDetails({ ...details, insurance: res.data.data.insurance });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };console.log(details)

  const handleInsuranceClick = () => {
    insuranceInputRef.current.click();
  };

  //upload certificate
 
  const handleCertificateChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateHandleCertificate(file);  
    }
  };

  const updateHandleCertificate = async (certificate) => {
    try {
   
      const formData = new FormData();
      formData.append("certificate", certificate);
      const res = await UpdateCertificateService(formData);
      setDetails({ ...details, certificate: res.data.data.certificate });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCertificateClick = () => {
    certificateInputRef.current.click();
  };

  // bio code
  const [showFullBio, setShowFullBio] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [bio, setBio] = useState("");

  const handleBioEditClick = () => {
    setBio(details.bio);
    setShowFullBio(true); // Set showFullBio to true when editing bio
    setShowBioModal(true);
  };

  const handleBioEditCloseModal = () => {
    // setBio("")
    setShowBioModal(false);
  };

  const updateTherapistBio = (e) => {
    e.preventDefault();
    // Update the bio for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      bio: bio,
    }));
    // Make an API call or update the data in your backend with the new bio

    handleBioEditCloseModal();
  };

  //   country code

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryOfResidence, setCountryOfResidence] = useState("");

  const handleCountryEditClick = () => {
    setCountryOfResidence(details.countryOfResidence);
    setShowCountryModal(true);
  };

  const handleCountryEditCloseModal = () => {
    setShowCountryModal(false);
  };

  const updateTherapistcountryOfResidence = (e) => {
    e.preventDefault();
    // Update the bio for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      countryOfResidence: countryOfResidence,
    }));
    handleCountryEditCloseModal();
  };

  // gender code
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [gender, setGender] = useState("");

  const handleGenderEditClick = () => {
    setGender(details.gender);
    setShowGenderModal(true);
  };

  const handleGenderEditCloseModal = () => {
    setShowGenderModal(false);
  };

  const updateTherapistGender = (e) => {
    e.preventDefault();
    // Update the bio for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      gender: gender,
    }));
    handleGenderEditCloseModal();
  };

  // sexualOrientationModal code
  const [sexualOrientationModal, setShowSexualOrientationModal] =
    useState(false);
  const [sexualOrientation, setSexualOrientation] = useState("");

  const handleSexualOrientationEditClick = () => {
    setSexualOrientation(details.sexualOrientation);
    setShowSexualOrientationModal(true);
  };

  const handleSexualOrientationEditCloseModal = () => {
    setShowSexualOrientationModal(false);
  };

  const updateTherapistSexualOrientation = (e) => {
    e.preventDefault();
    // Update the bio for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      sexualOrientation: sexualOrientation,
    }));
    handleSexualOrientationEditCloseModal();
  };

  // languageModal code
  const [languageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState([]);

  const languageStringArray = language.join(", ");

  const handleLanguageEditClick = () => {
    setLanguage(details.language)
    setLanguageModal(true);
  };

  const handleLanguageEditCloseModal = () => {
    setLanguageModal(false);
  };

    const updateTherapistLanguage = (e) => {
      e.preventDefault();
      setDetails((prevDetails) => ({
        ...prevDetails,
        language: language,
      }));
      handleLanguageEditCloseModal();
    };


  // tags code

  const [showTagsModal, setShowTagsModal] = useState(false);
  const [expertise, setExpertise] = useState([]);
  const expertiseStringArray = expertise.join(", ");

  const handleTagsEditClick = () => {
    setExpertise(details.expertise);
    setShowTagsModal(true);
  };

  const handleTagsEditCloseModal = () => {
    setShowTagsModal(false);
  };

  const updateTherapistTag = (e) => {
    e.preventDefault();

    // Update the expertise for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      expertise: expertise,
    }));

    // Close the modal
    handleTagsEditCloseModal();
  };

  // religionModal code
  const [religionModal, setReligionModal] = useState(false);
  const [religion, setReligion] = useState("");

  const handleReligionEditClick = () => {
    setReligionModal(true);
  };

  const handleReligionEditCloseModal = () => {
    setReligionModal(false);
  };

  const updateTherapistReligion = (e) => {
    e.preventDefault();
    // Update the bio for the therapist
    setDetails((prevDetails) => ({
      ...prevDetails,
      religion: religion,
    }));
    handleReligionEditCloseModal();
  };

  // religionModal code
  const [cultureModal, setCultureModal] = useState(false);
  const [culture, setCulture] = useState("");

  const handleCultureEditClick = () => {
    setCulture(details.culture);
    setCultureModal(true);
  };

  const handleCultureEditCloseModal = () => {
    setCultureModal(false);
  };

  const updateTherapistCulture = (e) => {
    e.preventDefault();
    setDetails((prevDetails) => ({
      ...prevDetails,
      culture: culture,
    }));
    handleCultureEditCloseModal();
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
 

  const handleVisibilityOfCustomer = async () => {
    // e.preventDefault();
    try {
     const userDetails = { visibilityForCustomer :!isChecked};
      const res = await UpdateTherapistProfileService(details.therapistId, userDetails);
       setDetails({ ...details, visibilityForCustomer: res.data.data.visibilityForCustomer }); 
      } catch (err) {
        console.log(err);
      }
    }

  useEffect(() => {
    const getTherapistDetails = async () => {
      try {
        const res = await getTherapistDetailsService();
        console.log(res.data.data);
        setDetails(res.data.data);
        setProfileDetails(res.data.data);
        setBio(res.data.data.bio);
        setExpertise(res.data.data.expertise);
        setCountryOfResidence(res.data.data.countryOfResidence);
        setLanguage(res.data.data.language);
        setReligion(res.data.data.religion);
        setGender(res.data.data.gender);
        setCulture(res.data.data.culture);
        setSexualOrientation(res.data.data.sexualOrientation);
      } catch (err) {
        console.log(err);
      }
    };
    getTherapistDetails();
  }, [setDetails]);

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
        setDetails({
          ...profileDetails,
          profileImage: res.data.data.profileImage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

 

  useEffect(() => {
    if (role !== "therapist" && role !== "coach") {
      navigate("/login");
    }
  }, [navigate, role]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const therapistDetails = {
         bio: bio,
         expertise: expertiseStringArray,
         language: languageStringArray,
         countryOfResidence: countryOfResidence,
         religion: religion,
         gender: gender,
         culture: culture,
         sexualOrientation:sexualOrientation
       };
      const res = await UpdateTherapistProfileService(id, therapistDetails);
      if (res.data) {
          swal({
            title: "success",
            text: res.data.message,
            icon: "success",
            button: "Ok",
          });
        setDetails({
          ...details,
          bio:res.data.data.bio,
          expertise:  res.data.data.expertise,
          language: res.data.data.language,
          countryOfResidence: res.data.data.countryOfResidence,
          religion: res.data.data.religion,
          gender: res.data.data.gender,
          culture: res.data.data.culture,
          sexualOrientation: res.data.data.sexualOrientation,
        });
      } 
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <>
      {role === "therapist" || role === "coach" ? (
        <>
          <Header profileDetails={profileDetails} />
          <div className="container-fluid page-body-wrapper heightByContent mainProfileSection">
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
                        alt=""
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
                          +Add a profile picture to help clients find you!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                  <div className="mainBox2RowUp">
                    <div className="row customProfileRow1">
                      <div className="col-md-6">
                        <div className="mainInsideSmallDiv mainInsideSmallDivBio">
                          <div className="row profileEditingContainerRow">
                            <div className="col-6 col-md-8 titleLeft">
                              <h3 className="AthleticsFont">Your Bio</h3>
                            </div>
                            <div className="col-6 col-md-4 text-right editImageRight">
                              <Link to="/bio?source=redirect">
                                <img
                                  src="../../../../assets/images/profile/edit2.png"
                                  alt="Edit"
                                  className="editIconImage"
                                  // onClick={() => handleBioEditClick()}
                                />
                              </Link>
                            </div>

                            <p className="bioDetailDescription AthleticsFont">
                              {showFullBio
                                ? details.bio
                                : `${details.bio?.slice(0, 200)}...`}
                              {!showFullBio && details.bio?.length > 200 && (
                                <span
                                  className="read-more"
                                  onClick={() => setShowFullBio(true)}
                                >
                                  Read More
                                </span>
                              )}
                            </p>
                          </div>
                          <ProfileBio
                            onHide={handleBioEditCloseModal}
                            bio={bio}
                            setBio={setBio}
                            show={showBioModal}
                            onSave={updateTherapistBio}
                          />
                        </div>
                      </div>

                      <div className="col-md-6 mt-md-0 mt-3">
                        <div className="mainInsideSmallDiv">
                          <div className="row profileEditingContainerRow">
                            <div className="col-6 col-md-8 titleLeft">
                              <h3 className="AthleticsFont">
                                Upload documents
                              </h3>
                            </div>
                            <div className="col-6 col-md-4 text-right editImageRight">
                              <span className="requiredSpanCertificate AthleticsFont">
                                Required
                              </span>
                              {/* <img src="../../../../assets/images/profile/edit2.png" alt="Edit" className="editIconImage" /> */}
                            </div>
                          </div>
                          <div>
                            <div className="documents">
                              <div className="docu">
                                <div
                                  className="document"
                                  onClick={handleCertificateClick}
                                >
                                  {details.certificate !==
                                  `${apiBaseUrl}/null` ? (
                                    <img src={details.certificate} alt="" />
                                  ) : (
                                    <div className="document-icon OutfitFont">
                                      <i className="fas fa-plus"></i>Add
                                    </div>
                                  )}
                                </div>
                                <div className="document-text AthleticsFont">
                                  Certificate
                                </div>
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  accept="image/*"
                                  ref={certificateInputRef}
                                  onChange={handleCertificateChange}
                                />
                              </div>

                              <div className="docu">
                                <div
                                  className="document"
                                  onClick={handleInsuranceClick}
                                >
                                  {details.insurance !==
                                  `${apiBaseUrl}/null` ? (
                                    <img src={details.insurance} alt="" />
                                  ) : (
                                    <div className="document-icon OutfitFont">
                                      <i className="fas fa-plus"></i>Add
                                    </div>
                                  )}
                                </div>
                                <div className="document-text AthleticsFont">
                                  Insurance
                                </div>
                                <input
                                  type="file"
                                  ref={insuranceInputRef}
                                  style={{ display: "none" }}
                                  accept="image/*"
                                  onChange={handleFileChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2nd section */}
                    <div className="row customProfileRow2">
                      <div className="col-md-6">
                        <div className="mainInsideSmallDiv mainInsideSmallDivTags">
                          <div className="row profileEditingContainerRow">
                            <div className="col-6 col-md-8 titleLeft">
                              <h3 className="AthleticsFont">Your tags</h3>
                            </div>
                            <div className="col-6 col-md-4 text-right editImageRight">
                              <img
                                src="../../../../assets/images/profile/edit2.png"
                                alt="Edit"
                                className="editIconImage"
                                onClick={() => handleTagsEditClick()}
                              />
                            </div>
                            <div className="row">
                              <div className="button-container">
                                {details.expertise?.map((data, index) => (
                                  <p key={index}>#{data}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <ProfileTags
                          show={showTagsModal}
                          onSave={updateTherapistTag}
                          onHide={handleTagsEditCloseModal}
                          expertise={expertise}
                          setExpertise={setExpertise}
                        />
                      </div>

                      <div className="col-md-6 mt-md-0 mt-3">
                        <div className="mainInsideSmallDiv mainInsideVerySmallDivNew">
                          <div className="profileEditingContainerRow">
                            <div
                              className="col-12 smallsizediv"
                              style={{ marginBottom: "18px" }}
                            >
                              <div className="row smallDivRow">
                                <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                  <h3 className="AthleticsFont">
                                    Country of residence
                                  </h3>
                                </div>
                                <div className="col-6 col-md-4 text-right editImageRight">
                                  <img
                                    src="../../../../assets/images/profile/edit2.png"
                                    alt="Edit"
                                    className="editIconImage"
                                    onClick={() => handleCountryEditClick()}
                                  />
                                </div>
                                <p>{details.countryOfResidence}</p>
                              </div>
                              <ProfileCountry
                                onHide={handleCountryEditCloseModal}
                                countryOfResidence={countryOfResidence}
                                setCountryOfResidence={setCountryOfResidence}
                                show={showCountryModal}
                                onSave={updateTherapistcountryOfResidence}
                              />
                            </div>
                            <div className="col-12 smallsizediv">
                              <div className="row smallDivRow smallDivRowLanguage">
                                <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                  <h3 className="AthleticsFont">Languages</h3>
                                </div>
                                <div className="col-6 col-md-4 text-right editImageRight">
                                  <img
                                    src="../../../../assets/images/profile/edit2.png"
                                    alt="Edit"
                                    className="editIconImage"
                                    onClick={handleLanguageEditClick}
                                  />
                                </div>
                                <div className="language-container">
                                  {details.language?.map((data, index) => (
                                    <p key={index}>{data}</p>
                                  ))}
                                </div>
                              </div>
                              <ProfileLanguage
                                show={languageModal}
                                onHide={handleLanguageEditCloseModal}
                                language={language}
                                setLanguage={setLanguage}
                                onSave={updateTherapistLanguage}
                              />
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>

                    {/* 3rd section */}

                    <div className="row customProfileRow2">
                      <div className="col-md-6">
                        <div className="smallsizediv">
                          <div className="col-12 smallsizediv">
                            <div className="row smallDivRow">
                              <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                <h3 className="AthleticsFont">Religion</h3>
                              </div>
                              <div className="col-6 col-md-4 text-right editImageRight">
                                <img
                                  src="../../../../assets/images/profile/edit2.png"
                                  alt="Edit"
                                  className="editIconImage"
                                  onClick={() => handleReligionEditClick()}
                                />
                              </div>
                              <p>{details.religion}</p>
                              <ProfileReligion
                                onSave={updateTherapistReligion}
                                show={religionModal}
                                onHide={handleReligionEditCloseModal}
                                religion={religion}
                                setReligion={setReligion}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mt-md-0 mt-3">
                        <div className="smallsizediv">
                          <div className="col-12 smallsizediv">
                            <div className="row smallDivRow">
                              <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                <h3 className="AthleticsFont">
                                  Gender identity
                                </h3>
                              </div>
                              <div className="col-6 col-md-4 text-right editImageRight">
                                <img
                                  src="../../../../assets/images/profile/edit2.png"
                                  alt="Edit"
                                  className="editIconImage"
                                  onClick={handleGenderEditClick}
                                />
                              </div>
                              <p>{details.gender}</p>
                            </div>
                            <ProfileGender
                              show={showGenderModal}
                              onHide={handleGenderEditCloseModal}
                              gender={gender}
                              setGender={setGender}
                              onSave={updateTherapistGender}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4th section */}

                    <div className="row customProfileRow2">
                      <div className="col-md-6">
                        <div className="smallsizediv">
                          <div
                            className="col-12 smallsizediv"
                            style={{ marginBottom: "18px" }}
                          >
                            <div className="row smallDivRow">
                              <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                <h3 className="AthleticsFont">Culture</h3>
                              </div>
                              <div className="col-6 col-md-4 text-right editImageRight">
                                <img
                                  src="../../../../assets/images/profile/edit2.png"
                                  alt="Edit"
                                  className="editIconImage"
                                  onClick={handleCultureEditClick}
                                />
                              </div>
                              <p>{details.culture}</p>
                            </div>
                            <ProfileCulture
                              onSave={updateTherapistCulture}
                              show={cultureModal}
                              onHide={handleCultureEditCloseModal}
                              culture={culture}
                              setCulture={setCulture}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mt-md-0 mt-3">
                        <div className="smallsizediv">
                          <div
                            className="col-12 smallsizediv"
                            style={{ marginBottom: "18px" }}
                          >
                            <div className="row smallDivRow">
                              <div className="col-6 col-md-8 titleLeft titleLeftForSmallDiv">
                                <h3 className="AthleticsFont">
                                  Sexual Orientation
                                </h3>
                              </div>
                              <div className="col-6 col-md-4 text-right editImageRight">
                                <img
                                  src="../../../../assets/images/profile/edit2.png"
                                  alt="Edit"
                                  className="editIconImage"
                                  onClick={handleSexualOrientationEditClick}
                                />
                              </div>

                              <div className="col-6 col-md-5 titleLeft titleLeftForSmallDiv">
                                <p>{details.sexualOrientation} </p>
                              </div>
                              <div className="col-6 col-md-7 text-right editImageRight">
                                <ProfileSexualOrientation
                                  onSave={updateTherapistSexualOrientation}
                                  show={sexualOrientationModal}
                                  onHide={handleSexualOrientationEditCloseModal}
                                  sexualOrientation={sexualOrientation}
                                  setSexualOrientation={setSexualOrientation}
                                />
                                <label
                                  className="form-check-label visibilityToggleClass"
                                  htmlFor="visibilityToggle"
                                >
                                  Visible to customers
                                </label>
                                <div className="toggle-button mr-1">
                                  <input
                                    type="checkbox"
                                    className="form-check-input visibilityCheckBox"
                                    id="visibilityToggle"
                                    checked={isChecked}
                                    onChange={handleToggle}
                                    onClick={() => handleVisibilityOfCustomer()}
                                  />
                                  <label
                                    className="toggle-label visibilityTogglelabel"
                                    htmlFor="visibilityToggle"
                                  >
                                    <i
                                      className={`fa fa-toggle-${
                                        isChecked ? "on" : "off"
                                      }`}
                                      aria-hidden="true"
                                    ></i>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group w-100 nextButtonFormGroup">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          // disabled={validateGenderAndOrientation()}
                          className="btn btn-primary btn-block my-4 py-3 mainProfileSubmitBUttonNew AthleticsFont"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid bottomImageContainer">
            <img
              src="../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
              alt=""
            ></img>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Profile;

 