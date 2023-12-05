import React, { useEffect, useRef, useState } from 'react';
import "./Support.css";
import ConsumerHeader from '../../ConsumerHeader/ConsumerHeader';
import { getConsumerDetailsService, uploadConsumerProfileImage } from '../../Service/Service';
import InformationModalComponent from '../../Page/InformationModalComponent/InformationModalComponent';

const Support = ({ expertise, setExpertise, onNext, onPrevious }) => {
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const role = localStorage.getItem("role");
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
            res.data?.data?.support !== "" ||
            res.data.data.support?.length !== 0
          ) {
            setExpertise(res.data.data.support);
            setIsNextDisabled(res.data.data.support?.length === 0);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const [isNextDisabled, setIsNextDisabled] = useState(expertise?.length === 0);
  const [searchInput, setSearchInput] = useState("");
  const options = [
    "ACC / ADHD",
    "Addiction",
    "Adultification",
    "Anger Management",
    "Anxiety",
    "Arranged Marriages / Set Standards",
    "Being The 'Only' At Work / In The Room",
    "Bereavement / Grief",
    "Body Image",
    "Break-Ups - Relationships / Friendships / Family",
    "Burnout",
    "Career Change",
    "Career Development",
    "Chronic Pain",
    "Code-Switching",
    "Co-Parenting",
    "Conflict",
    "Conflict Avoidance",
    "Couples Counseling",
    "Cultural Identity",
    "Day-To-Day Life",
    "Depression",
    "Difficult Work Colleagues / Superiors",
    "Disordered Eating",
    "Discrimination",
    "Divorce / Mediation",
    "Divorces",
    "Empowerment",
    "End-Of-Life",
    "Executive Coaching",
    "Existential Crisis",
    "Finances",
    "Five-Year Plan",
    "Focus / Laser / Goal Attainment",
    "Friend of family member",
    "Friendship Issues",
    "Gambling",
    "Gender Roles",
    "Gender Transitions + Families",
    "Generational / Intergenerational Trauma",
    "Google/online search",
    "Habit Breaking",
    "IBS (Irritable Bowel Syndrome)",
    "Influencer",
    "Lack of Purpose",
    "LGBT+ Communities",
    "Life Transitions",
    "Life Coaching",
    "Life Transition",
    "Lack of purpose",
    "Making Conversation",
    "Manifestation",
    "Menopause / Peri-menopause",
    "Military Service Members + Families",
    "Moving Home",
    "Neglect",
    "Negotiation",
    "New Marriage",
    "New Starter - Workplace",
    "New Year / Five-Year / One-Year Plan",
    "Newsletters",
    "Obsessive-Compulsive Disorder",
    "Online Dating",
    "Parenting",
    "Personal Branding",
    "Personal Development",
    "Performance Reviews",
    "People Pleasing",
    "Personal Growth",
    "Phobias",
    "Phobias (including Germs)",
    "Post-Natal",
    "Pre-Natal",
    "Pregnancy",
    "Previously Incarcerated People + Families",
    "PTSD",
    "Public Speaking",
    "Racism",
    "Recovery",
    "Redundancy",
    "Relationship Check-In",
    "Relationships",
    "Remote Working",
    "Resilience",
    "Resume / Interview",
    "Retirement",
    "Returning to Work",
    "Self-Acceptance",
    "Self-Discovery",
    "Self-Esteem",
    "Sense of Belonging",
    "Sex",
    "Sleep Disorders",
    "Small Business",
    "Societal Pressure",
    "Social Anxiety",
    "Social Isolation / Loneliness",
    "Spirituality",
    "Starting A Business",
    "Stress",
    "Ten-Year Plan",
    "Tala Thrive Team",
    "Therapy",
    "Trauma",
    "Traumatic Childhood",
    "Travel",
    "TV",
    "Uni / School Application",
    "Us Directly Contacting You",
    "Visa Stress",
    "Wide-Ranging Coaching",
    "Wide-Ranging Therapy",
    "Word of Mouth",
    "Youtube",
    "Other",
    "I Don't Know",
  ];
  const [suggestions, setSuggestions] = useState([]);
  // const [isAddNewTagVisible, setIsAddNewTagVisible] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [newTagInput, setNewTagInput] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();
    setSearchInput(inputValue);

    if (inputValue === "") {
      // When the input is empty, clear suggestions
      setSuggestions([]);
    } else {
      // Filter suggestions based on the input and selected items
      const filteredOptions = options.filter(
        (option) =>
          option.toLowerCase()?.includes(inputValue) &&
          !expertise.includes(option)
      );
      setSuggestions(filteredOptions);
    }
    setIsNextDisabled(inputValue?.length === 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setExpertise([...expertise, suggestion]);
    setSearchInput("");
    setSuggestions([]);
    // setIsAddNewTagVisible(false);
    setIsNextDisabled(suggestion?.length === 0);
  };

  const handleInputClick = () => {
    setSuggestions(options.filter((option) => !expertise.includes(option)));
    // setIsAddNewTagVisible(true);
  };
  const handleRemoveTag = (tag) => {
    const updatedexpertise = expertise.filter((item) => item !== tag);
    setExpertise(updatedexpertise);
    // setIsAddNewTagVisible(false);
    setSuggestions([]);
    // setSuggestions([tag, ...suggestions]);
    setIsNextDisabled(updatedexpertise?.length === 0);
  };

 

  const handleNext = () => {
    if (expertise) {
      onNext();
    }
  };
  return (
    <>
      <ConsumerHeader profileDetails={profileDetails} />
      <div className="container-fluid page-body-wrapper heightByContent mainAreaOfExpertiseSection">
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
            <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew45 d-flex align-items-center">
              <div className="mainBox2RowUp">
                <div className="row mb-5">
                  <div className="col-md-4 text-left">
                    <p className="stepPTag AthleticsFont">Step 7 of 10</p>
                  </div>
                  <div
                    className="col-md-8 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                    style={{ paddingLeft: "0px" }}
                  >
                    {/* <p className="AthleticsFont mainContainerHeading">
                      Your area of expertise
                    </p> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                    <div className="mainbox2">
                      <div className="form-group text-left  mainQuestionContainer">
                        <i
                          className="fas fa-arrow-left arrow-icon goBackSupportIcon "
                          onClick={onPrevious}
                        ></i>
                        <label
                          htmlFor="exampleInputEmail1"
                          className="AthleticsFont mainQuestion mb-3 bioLabel"
                        >
                          What would you most like support with?
                        </label>
                        <div className="form-group">
                          <div className="search-container">
                            <input
                              type="text"
                              className="search-input form-control"
                              placeholder="Search..."
                              value={searchInput}
                              onChange={handleInputChange}
                              onClick={handleInputClick}
                            />
                          </div>

                          <div className="suggestions">
                            {suggestions?.map((option) => (
                              <div
                                key={option}
                                className="suggestion"
                                onClick={() => handleSuggestionClick(option)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <p className="OutfitFont description">
                            Selected tags
                          </p>
                        </div>
                        <div className="form-group">
                          <div className="selectedTagsdiv row">
                            {expertise?.map((item) => (
                              <div
                                className="col-6 col-sm-4 col-md-3 col-lg-2 selectedTagManageWidth"
                                key={item}
                              >
                                <div className="selectedTag">
                                  <div className="d-flex justify-content-between align-items-center selectedTagContent">
                                    <span>{item}</span>
                                    <span
                                      className="remove-tag"
                                      onClick={() => handleRemoveTag(item)}
                                    >
                                      ×
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
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
                    <div className="form-group w-100 nextButtonFormGroup">
                      <button
                        type="submit"
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

export default Support