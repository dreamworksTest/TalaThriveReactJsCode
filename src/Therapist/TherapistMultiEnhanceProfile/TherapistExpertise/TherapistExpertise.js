import React, { useEffect, useRef, useState } from "react";
import "./TherapistExpertise.css";
import Header from "../../Header/Header";
import { Modal } from "react-bootstrap";
import {
  UpdateImageService,
  getTherapistDetailsService,
} from "../../TherapistServices/TherapistServices";
import InformationModalComponent from "../../InformationModalComponent/InformationModalComponent";

const TherapistExpertise = ({
  nonJudgmentalAndHonesty,
  setNonJudgmentalAndHonesty,
  supportiveAndFactual,
  setSupportiveAndFactual,
  leadsAndGiveAdvice,
  setLeadsAndGiveAdvice,
  listenerAndTalker,
  setListenerAndTalker,
  expertise,
  setExpertise,
  onNext,
  onPrevious,
  handleSubmit,
}) => {
  const fileInputRef = useRef(null);
  const [showInformationModal, setShowInformationModalComponent] =
    useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  console.log(listenerAndTalker);
  console.log(expertise);
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
            res.data?.data?.expertise !== "" &&
            res.data?.data?.listenerAndTalker !== "" &&
            res.data?.data?.leadsAndGiveAdvice !== "" &&
            res.data?.data?.nonJudgmentalAndHonesty !== "" &&
            res.data?.data?.supportiveAndFactual !== ""
          ) {
            setExpertise(res.data.data.expertise);
            setListenerAndTalker(res.data.data.listenerAndTalker);
            setLeadsAndGiveAdvice(res.data.data.leadsAndGiveAdvice);
            setNonJudgmentalAndHonesty(res.data.data.nonJudgmentalAndHonesty);
            setSupportiveAndFactual(res.data.data.supportiveAndFactual);
            setIsNextDisabled(res.data.data.expertise.length === 0);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const [isNextDisabled, setIsNextDisabled] = useState(expertise.length === 0);
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
          option.toLowerCase().includes(inputValue) &&
          !expertise.includes(option)
      );
      setSuggestions(filteredOptions);
    }
    setIsNextDisabled(inputValue.length === 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setExpertise([...expertise, suggestion]);
    setSearchInput("");
    setSuggestions([]);
    // setIsAddNewTagVisible(false);
    setIsNextDisabled(suggestion.length === 0);
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
    setIsNextDisabled(updatedexpertise.length === 0);
  };

  // const openAddTagModal = () => {
  //   // Implement this function to open the modal for adding a new tag
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };
  // const handleAddNewTag = (e) => {
  //   e.preventDefault();
  //   if (newTagInput) {
  //     setExpertise([...expertise, newTagInput]);
  //     setNewTagInput(""); // Clear the input field
  //     setShowModal(false);
  //     setIsAddNewTagVisible(false);
  //     setSuggestions([]);
  //   }
  // };

  const handleNext = () => {
    if (expertise) {
      onNext();
    }
  };

  let max = 5;
  let min = 1;

  const getLinearGradient = () => {
    const percentage = ((listenerAndTalker - min) / (max - min)) * 100;
    return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
  };

  const trackStyle = {
    background: getLinearGradient(),
  };

  const getLinearGradient1 = () => {
    const percentage = ((leadsAndGiveAdvice - min) / (max - min)) * 100;
    return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
  };

  const trackStyle1 = {
    background: getLinearGradient1(),
  };

  const getLinearGradient2 = () => {
    const percentage = ((supportiveAndFactual - min) / (max - min)) * 100;
    return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
  };

  const trackStyle2 = {
    background: getLinearGradient2(),
  };

  const getLinearGradient3 = () => {
    const percentage = ((nonJudgmentalAndHonesty - min) / (max - min)) * 100;
    return `linear-gradient(to right, #f68a40 0%, #f68a40 ${percentage}%, #FFE7CC ${percentage}%, #FFE7CC 100%)`;
  };

  const trackStyle3 = {
    background: getLinearGradient3(),
  };

  return (
    <>
      <Header profileDetails={profileDetails} />
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
                          Hi {profileDetails.firstName}!
                        </h1>
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                      </div>
                    </div>
                    {role == "therapist" ? (
                      <p className="mb-0 imageSectionContent AthleticsFont">
                        Your profile is almost complete! Next, you can set your
                        schedule...
                      </p>
                    ) : (
                      <p className="mb-0 imageSectionContent AthleticsFont">
                        Your profile is almost there!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {role === "therapist" && (
              <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 boxsectionNewForTherapist d-flex align-items-center">
                <div className="mainBox2RowUp">
                  <div className="row mb-5">
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont">Step 6 of 6</p>
                    </div>
                    <div
                      className="col-md-8 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                      style={{ paddingLeft: "0px" }}
                    >
                      <p className="AthleticsFont mainContainerHeading">
                        Your area of expertise
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                      <div className="mainbox2">
                        <div className="form-group text-left  mainQuestionContainer">
                          <i
                            className="fas fa-arrow-left arrow-icon goBackTherapistAndCoachIcon"
                            onClick={onPrevious}
                          ></i>
                          <label
                            htmlFor="exampleInputEmail1"
                            className="AthleticsFont mainQuestion mb-3 bioLabel"
                          >
                            Select your areas of expertise
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
                              {/* {isAddNewTagVisible && (
                                <div
                                  className="suggestion add-new-tag OutfitFont"
                                  onClick={openAddTagModal}
                                >
                                  <p>
                                    <span className="plus-icon">+ </span>Add new
                                    tag
                                  </p>
                                </div>
                              )} */}

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

                            {/* <Modal show={showModal} onHide={handleCloseModal}>
                              <Modal.Header closeButton></Modal.Header>
                              <Modal.Body>
                             
                                <form action="#">
                                  <div className="form-group">
                                    <label htmlFor="tag" className="OutfitFont">
                                      Add New Tag:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control OutfitFont"
                                      placeholder="Tag"
                                      id="addNewTag"
                                      value={newTagInput}
                                      onChange={(e) =>
                                        setNewTagInput(e.target.value)
                                      }
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    className="btn btn-default submitmodelbutton OutfitFont"
                                    onClick={handleAddNewTag}
                                  >
                                    Add
                                  </button>
                                </form>
                              </Modal.Body>
                            </Modal> */}
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
                          disabled={isNextDisabled}
                          className="btn btn-primary btn-block py-3 mainnextbutton OutfitFont"
                        >
                          Save profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {role === "coach" && (
              <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                <div className="mainBox2RowUp">
                  <div className="row mb-5 text-center">
                    <div className="col-md-4 text-left">
                      <p className="stepPTag AthleticsFont position-absolute">
                        Step 6 of 7
                      </p>
                    </div>
                    <div
                      className="col-md-8 d-flex align-items-left justify-content-left mainContainerHeadingMainDiv"
                      style={{ paddingLeft: "0px" }}
                    ></div>
                    <p className="AthleticsFont mainContainerHeading mx-auto">
                      Your area of expertise
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                      <div className="mainbox2">
                        <div className="form-group text-left  mainQuestionContainer">
                          <i
                            className="fas fa-arrow-left arrow-icon goBackTherapistAndCoachIcon"
                            onClick={onPrevious}
                          ></i>
                          <label
                            htmlFor="exampleInputEmail1"
                            className="AthleticsFont mainQuestion mb-3 bioLabel"
                          >
                            Select your areas of expertise
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
                              {/* {isAddNewTagVisible && (
                                <div
                                  className="suggestion add-new-tag OutfitFont"
                                  onClick={openAddTagModal}
                                >
                                  <p>
                                    <span className="plus-icon">+ </span>Add new
                                    tag
                                  </p>
                                </div>
                              )} */}

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

                            {/* <Modal show={showModal} onHide={handleCloseModal}>
                              <Modal.Header closeButton></Modal.Header>
                              <Modal.Body>
                      
                                <form action="#">
                                  <div className="form-group">
                                    <label htmlFor="tag" className="OutfitFont">
                                      Add New Tag:
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control OutfitFont"
                                      placeholder="Tag"
                                      id="addNewTag"
                                      value={newTagInput}
                                      onChange={(e) =>
                                        setNewTagInput(e.target.value)
                                      }
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    className="btn btn-default submitmodelbutton OutfitFont"
                                    onClick={handleAddNewTag}
                                  >
                                    Add
                                  </button>
                                </form>
                              </Modal.Body>
                            </Modal> */}
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

                        <div className="form-group text-left mainQuestionContainer inputrangeformgroup">
                          <label
                            className="AthleticsFont bioLabel"
                            htmlFor="textArea2"
                          >
                            What is your typical coaching style?
                          </label>
                          <br />
                          <br />
                          <br />
                          <div className="d-flex justify-content-between mt-2">
                            <span className="position-absolute start-0 track1text OutfitFont">
                              Listener
                            </span>
                            <span className="position-absolute end-0 track2text OutfitFont">
                              Talker
                            </span>
                          </div>
                          <input
                            type="range"
                            className="custom-range"
                            onChange={(e) =>
                              setListenerAndTalker(e.target.value)
                            }
                            value={listenerAndTalker}
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
                          <br />
                          <br />
                          <br />
                          <div className="d-flex justify-content-between mt-2">
                            <span className="position-absolute start-0 track1text OutfitFont">
                              Leads patient to conclusions
                            </span>
                            <span className="position-absolute end-0 track2text OutfitFont">
                              Gives advice
                            </span>
                          </div>
                          <input
                            type="range"
                            className="custom-range"
                            onChange={(e) =>
                              setLeadsAndGiveAdvice(e.target.value)
                            }
                            value={leadsAndGiveAdvice}
                            min="1"
                            max="5"
                            step="1"
                            id="customRange1"
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
          #customRange1::-webkit-slider-runnable-track {
            background: ${trackStyle1.background};
          }

          /* For Firefox */
          #customRange1::-moz-range-track {
            background: ${trackStyle1.background};
          }
        `}
                          </style>
                          <br />
                          <br />
                          <br />
                          <div className="d-flex justify-content-between mt-2">
                            <span className="position-absolute start-0 track1text OutfitFont">
                              Worm & supportive
                            </span>
                            <span className="position-absolute end-0 track2text OutfitFont">
                              Factual
                            </span>
                          </div>
                          <input
                            type="range"
                            className="custom-range"
                            onChange={(e) =>
                              setSupportiveAndFactual(e.target.value)
                            }
                            value={supportiveAndFactual}
                            min="1"
                            max="5"
                            step="1"
                            id="customRange2"
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
          #customRange2::-webkit-slider-runnable-track {
            background: ${trackStyle2.background};
          }

          /* For Firefox */
          #customRange2::-moz-range-track {
            background: ${trackStyle2.background};
          }
        `}
                          </style>
                          <br />
                          <br />
                          <br />

                          <div className="d-flex justify-content-between mt-2">
                            <span className="position-absolute start-0 track1text OutfitFont">
                              Non-judgmental
                            </span>
                            <span className="position-absolute end-0 track2text OutfitFont">
                              Radical honesty
                            </span>
                          </div>
                          <input
                            type="range"
                            className="custom-range"
                            onChange={(e) =>
                              setNonJudgmentalAndHonesty(e.target.value)
                            }
                            value={nonJudgmentalAndHonesty}
                            min="1"
                            max="5"
                            step="1"
                            id="customRange3"
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
          #customRange3::-webkit-slider-runnable-track {
            background: ${trackStyle3.background};
          }

          /* For Firefox */
          #customRange3::-moz-range-track {
            background: ${trackStyle3.background};
          }
        `}
                          </style>
                        </div>

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
                          disabled={isNextDisabled}
                          className="btn btn-primary btn-block  py-3 mainnextbutton OutfitFont"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

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

export default TherapistExpertise;
