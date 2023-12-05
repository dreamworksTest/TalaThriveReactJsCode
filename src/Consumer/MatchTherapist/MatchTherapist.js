import React, { useEffect, useRef, useState } from 'react'
import "./MatchTherapist.css";
import { getConsumerDetailsService, getMatchTherapistservice, uploadConsumerProfileImage } from '../Service/Service';
import { useNavigate } from 'react-router-dom';
import ConsumerHeader from '../ConsumerHeader/ConsumerHeader';
import BookAppointmentPopup from '../Page/BookAppointmentPopup/BookAppointmentPopup';
import { format } from "date-fns";

const MatchTherapist = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [page] = useState(1);
  // const [totalPage, setTotalPage] = useState(1);
  const [matchTherapist, setMatchTherapist] = useState([]);
  const [limit] = useState(200);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const firstName = localStorage.getItem("firstName");

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
    
    
  console.log(matchTherapist);

  useEffect(() => {
       const getMetchTherapist=async()=>{
        try {
      const res = await getMatchTherapistservice(page,limit);
          if (res.data) {
        setMatchTherapist(res.data.data);
        // setTotalPage(res.data.totalPages);
      }
    } catch (err) {
      console.log(err);
        }
    }
    getMetchTherapist()
  }, [])
  

    const [therapistsToShow, setTherapistsToShow] = useState(2);

    const handleShowMore = () => {
      setTherapistsToShow((prevCount) => prevCount + 2);
    };





      useEffect(() => {
        const fetchProfileImage = async () => {
          try {
            const res = await getConsumerDetailsService();
            if (res && res?.data && res?.data?.data) {
              setProfileDetails(res?.data?.data);
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchProfileImage();
      }, [setProfileDetails]);
    
      useEffect(() => {
        if (role !== "consumer") {
          navigate("/consumerLogin");
        }
      }, [navigate, role]);
  
  const [showBookAppointmentPopup, setShowBookAppointmentPopup] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState({});

  const handleOpenBookAppointment = (details) => {
    console.log(details);
      setSelectedTherapist(details);
     setShowBookAppointmentPopup(true);
   };
   const handleInformationBookAppointmentCloseModal = () => {
     setShowBookAppointmentPopup(false);
   };

 
    return (
      <div>
        {role === "consumer" ? (
          <>
            <ConsumerHeader profileDetails={profileDetails} />
            <div className="container-fluid page-body-wrapper heightByContent mainConsumnerMatchesSection">
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
                        <div
                          className="edit-icon"
                          onClick={handleDocumentClick}
                        >
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

                  <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew89 d-flex align-items-center">
                    <div className="mainBox2RowUp">
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                          <div className="mainbox2">
                            <div className="form-group text-left  mainQuestionContainer">
                              <h3 className="consumerMatchesHeading AthleticsFont">
                                Here are the two best matches based on your
                                answers
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row consumerMatchesRow">
                        {matchTherapist
                          .slice(0, therapistsToShow)
                          .map((details, index) => (
                            <div
                              className="col-md-6 col-sm-12 consumerMatchesColumn2"
                              key={index}
                            >
                              {/* Box 2 */}
                              <div className="consumerMatchesbox">
                                <div className="d-flex align-items-center matchTherapistImageAndNameDiv">
                                  {/* Small circle image */}
                                  <img
                                    src={details.profileImage}
                                    alt="Profile"
                                    className="img-fluid rounded-circle therapistMatchesProfileImage"
                                  />
                                  <div>
                                    {/* Title */}
                                    <h5 className="matchingTherapistName AthleticsFont">
                                      {details.firstName} {details.lastName}
                                    </h5>
                                    {/* Small text */}
                                    <p className="matchingTherapistDescription AthleticsFont">
                                      {details.typeOfCoach}
                                    </p>
                                  </div>
                                </div>
                                {/* Description with View Profile link */}
                                <div>
                                  <p className="matchingTherapisShortDetails OutfitFont">
                                    {details.bio}
                                    {/* .{details.bioLivedExperience}.
                                    {details.bioProfessionalExperience} */}
                                  </p>
                                  <strong className="matchingTherapisViewProfile AthleticsFont">
                                    View Profile {">"}
                                  </strong>
                                </div>

                                <div className="matchingTherapistSpecialText">
                                  <p className="AthleticsFont">
                                    Specialises in:
                                  </p>
                                </div>

                                <div className="button-container ">
                                  {details.expertise?.map((expert, index) => (
                                    <p key={index}>{expert}</p>
                                  ))}
                                </div>
                              </div>

                              <div className="consumerMatchesbox2">
                                <div className="row">
                                  {/* First Part */}
                                  <div className="col-md-4 consumerMatchesbox2Column">
                                    <div>
                                      <p className="feesText AthleticsFont">
                                        Fees/ 45 Minute
                                      </p>
                                      <p className="priceText AthleticsFont">
                                        £{details.nextAvailable.fees}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Second Part */}
                                  <div className="col-md-4 consumerMatchesbox2Column">
                                    <div>
                                      <p className="availableText AthleticsFont">
                                        Next available
                                      </p>
                                      <p className="timeText AthleticsFont">
                                        {/* 10 Oct 8:30AM */}
                                        {format(
                                          new Date(
                                            details.nextAvailable.nextSlotDate
                                          ),
                                          "d MMM"
                                        )}{" "}
                                        {details.nextAvailable.nextSlotTime}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Third Part */}
                                  <div className="col-md-4 consumerMatchesbox2Column consumerMatchesbox2ButtonColumn">
                                    <button
                                      className="btn bookAppointmentButton AthleticsFont"
                                      onClick={() =>
                                        handleOpenBookAppointment(details)
                                      }
                                    >
                                      Book
                                    </button>
                                    <BookAppointmentPopup
                                      show={showBookAppointmentPopup}
                                      therapist={selectedTherapist}
                                      onHide={
                                        handleInformationBookAppointmentCloseModal
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {therapistsToShow < matchTherapist.length && (
                        <div className="row show2moreRow">
                          <button
                            className="AthleticsFont"
                            onClick={handleShowMore}
                          >
                            Show Two More
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid bottomImageContainer">
              <img src="../../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"></img>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
}

export default MatchTherapist