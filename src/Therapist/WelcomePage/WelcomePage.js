import React, { useEffect, useRef, useState } from "react";
import "./WelcomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import {
  GetAllAppointmentService,
  UpdateImageService,
  getTherapistDetailsService,
  getTherapistStartedVideoService,
} from "../TherapistServices/TherapistServices";
import Pagination from "../Pagination/Pagination";
import { VideoRoom } from "../AgoraTherapist/Main/VideoRoom";
import Loading from "../Loading/Loading";
import { format } from "date-fns";
import { enUS } from "date-fns/locale"; 
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
 

const WelcomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [totalPage, setTotalPage] = useState(1);
  const [totalAppointment, setTotalAppointment] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const fileInputRef = useRef(null);
  const id = localStorage.getItem("id");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

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

const [profileCompleted,setProfileCompleted]=useState(false)
const [scheduleCompleted, setScheduleCompleted] = useState(false);
const [bankDetailsCompleted, setBankDetailsCompleted] = useState(false);
 
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const res = await getTherapistDetailsService();
        if (res && res?.data && res?.data?.data) {
          setProfileDetails(res?.data?.data);
          setProfileCompleted(res.data.data.isProfileCompleted);
          setScheduleCompleted(res.data.data.isScheduleCompleted);
          setBankDetailsCompleted(res.data.data.isBankDetailsCompleted);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  useEffect(() => {
    handleStatus("today");
  }, []);

  const handleStatus = async (status) => {
    try {
      setLoading(true);
      setStatus(status);
      const res = await GetAllAppointmentService(status, page, limit);
      console.log(res.data);
      if (res.data) {
        setAppointmentDetails(res.data.data);
        setTotalPage(res.data.totalPages);
        setTotalAppointment(res.data.totalRecords);
        setLoading(false);
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


   const [joined, setJoined] = useState(false);
   const [videoJoinDetails, setVideoJoinDetails] = useState({});

   const handleJoinVideoCall = async (bookAppointmentId) => {
     try {
       const res = await getTherapistStartedVideoService(bookAppointmentId);
       if (res.data) {
         setVideoJoinDetails(res.data.data);
         setJoined(true);
       }
     } catch (err) {
       console.log(err);
     }
   };

   const handleCloseVideo = () => {
     setJoined(false);
   };
  
  
  let percentage;

if (profileCompleted === true && scheduleCompleted === false && bankDetailsCompleted === false) {
  percentage = 25;
} else if (profileCompleted === true && scheduleCompleted === true && bankDetailsCompleted === false) {
  percentage = 67;
} else if (profileCompleted === true && scheduleCompleted === true && bankDetailsCompleted === true) {
  percentage = 100;
} else {
  percentage = 0;
}

   

  return (
    <div className="welcome_page">
      {role === "therapist" || role === "coach" ? (
        <>
          {loading ? (
            <Loading />
          ) : joined === false ? (
            <>
              <Header profileDetails={profileDetails} />
              <div className="container-fluid page-body-wrapper heightByContent mainWelcomePageSection">
                <div className="main-panel">
                  {/* <div className="transactionSection"> */}
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
                                Hi {profileDetails.firstName}!
                              </h1>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                              {/* <p className="mb-0 profileType OutfitFont">Therapist</p> */}
                            </div>
                          </div>
                          {/* <p className="mb-0 imageSectionContent AthleticsFont">
                      Share more, match better!
                    </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`container align-items-center justify-content-center boxSectionNew boxsectionNew2 ${
                      profileCompleted === true &&
                      scheduleCompleted === false &&
                      bankDetailsCompleted === false
                        ? "firstprocesscomplete"
                        : profileCompleted === true &&
                          scheduleCompleted === true &&
                          bankDetailsCompleted === false
                        ? "secondprocesscomplete"
                        : profileCompleted === true &&
                          scheduleCompleted === true &&
                          bankDetailsCompleted === true
                        ? "thirdprocesscomplete"
                        : "defaultProcess"
                    } d-flex align-items-center`}
                  >
                    <div className="mainBox2RowUp">
                      <div className="row mb-5">
                        <div className="col-md-8 align-items-left justify-content-left mainContainerHeadingMainDiv">
                          <p className="AthleticsFont mainContainerHeading">
                            Welcome to your Dashboard
                          </p>
                          <p className="AthleticsFont description">
                            Let’s get your profile ready to start matching with
                            clients. Remember, you can edit your information at
                            any time!
                          </p>
                        </div>
                        <div className="col-md-4">
                          <div className="progress-bar-container">
                            {/* <div
                              className="progress-bar1 css"
                              style={{
                                "--progress-value": "40%",
                              }}
                            >
                              <progress
                                id="css"
                                min="0"
                                max="100"
                                value="50"
                              ></progress>
                            </div> */}
                            <CircularProgressbar
                              value={percentage}
                              text={`${percentage}%`}
                            />
                            
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-4">
                            <Link to="/startForm">
                              <button className="btn btn-primary btn-block dashboardButtons">
                                1. Personalise your profile
                              </button>
                            </Link>
                          </div>
                          <div className="col-md-4">
                            <Link to="/therapistAddSchedule">
                              <button
                                className="btn btn-secondary btn-block dashboardButtons"
                                disabled={!profileCompleted}
                              >
                                2. Set your schedule
                              </button>
                            </Link>
                          </div>
                          <div className="col-md-4">
                            <button
                              className="btn btn-success btn-block dashboardButtons"
                              disabled={!scheduleCompleted}
                            >
                              3. Add payment method
                            </button>
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="row">
                        <div className="form-group">
                          <p className="AthleticsFont mainContainerHeading">
                            Appointments
                          </p>
                        </div>

                        <div className="form-group">
                          <ul
                            className="nav nav-tabs"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item">
                              <Link
                                className={`nav-link AthleticsFont ${
                                  status === "today" ? "active" : ""
                                }`}
                                id="tab1-tab"
                                data-toggle="tab"
                                to="#"
                                role="tab"
                                aria-controls="tab1"
                                aria-selected="true"
                                onClick={() => handleStatus("today")}
                              >
                                Today
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link AthleticsFont ${
                                  status === "upcoming" ? "active" : ""
                                }`}
                                id="tab2-tab"
                                data-toggle="tab"
                                to="#"
                                role="tab"
                                aria-controls="tab2"
                                aria-selected="false"
                                onClick={() => handleStatus("upcoming")}
                              >
                                Upcoming
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link AthleticsFont ${
                                  status === "completed" ? "active" : ""
                                }`}
                                id="tab3-tab"
                                data-toggle="tab"
                                to="#"
                                role="tab"
                                aria-controls="tab3"
                                aria-selected="false"
                                onClick={() => handleStatus("completed")}
                              >
                                Completed
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link AthleticsFont ${
                                  status === "cancelled" ? "active" : ""
                                }`}
                                id="tab4-tab"
                                data-toggle="tab"
                                to="#"
                                role="tab"
                                aria-controls="tab4"
                                aria-selected="false"
                                onClick={() => handleStatus("cancelled")}
                              >
                                Cancelled
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="tab1"
                            role="tabpanel"
                            aria-labelledby="tab1-tab"
                          >
                            <div className="table-responsive">
                              {appointmentDetails.length !== 0 ? (
                                <table className="table appointmentTable">
                                  <thead>
                                    <tr>
                                      <th className="OutfitFont">Name</th>
                                      <th className="OutfitFont">Location</th>
                                      <th className="OutfitFont">Date</th>
                                      <th className="OutfitFont">Time</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {status === "today"
                                      ? appointmentDetails?.map(
                                          (appointment, index) => (
                                            <tr key={index}>
                                              <td className="OutfitFont">
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  {/* <img
                                                      src="../assets/images/appointments/tableuser.png"
                                                      alt="Profile"
                                                      width="50"
                                                      height="50"
                                                    /> */}
                                                  <span
                                                    style={{
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    {appointment.name}
                                                  </span>
                                                </div>
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.location}
                                              </td>
                                              <td className="OutfitFont">
                                                {format(
                                                  new Date(
                                                    appointment.appointmentDate
                                                  ),
                                                  "dd MMM yyyy",
                                                  { locale: enUS }
                                                )}
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.startTime}-
                                                {appointment.endTime}
                                              </td>
                                              <td className="OutfitFont">
                                                <button className="btn btn-default mr-2 appointmentButton appointmentDetailButton OutfitFont">
                                                  <img
                                                    className="appointmentDetailDashboardImage"
                                                    src="../../../../assets/images/appointments/appointmentDetail.png"
                                                    alt="Appointment Detail"
                                                  />
                                                </button>
                                                {/* <button
                                                  className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2"
                                                  onClick={() =>
                                                    handleOpenCancelPopup(
                                                      appointment.bookAppointmentId
                                                    )
                                                  }
                                                >
                                                  Cancel
                                                </button> */}
                                                <button
                                                  className="btn btn-default appointmentButton appointmentStartButton OutfitFont "
                                                  onClick={() =>
                                                    handleJoinVideoCall(
                                                      appointment.bookAppointmentId
                                                    )
                                                  }
                                                >
                                                  <i className="fas fa-video pr-1"></i>
                                                  Start
                                                </button>
                                              </td>
                                            </tr>
                                          )
                                        )
                                      : status === "upcoming"
                                      ? appointmentDetails?.map(
                                          (appointment, index) => (
                                            <tr key={index}>
                                              <td className="OutfitFont">
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  {/* <img
                                                      src="../assets/images/appointments/tableuser.png"
                                                      alt="Profile"
                                                      width="50"
                                                      height="50"
                                                    /> */}
                                                  <span
                                                    style={{
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    {appointment.name}
                                                  </span>
                                                </div>
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.location}
                                              </td>
                                              <td className="OutfitFont">
                                                {format(
                                                  new Date(
                                                    appointment.appointmentDate
                                                  ),
                                                  "dd MMM yyyy",
                                                  { locale: enUS }
                                                )}
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.startTime}-
                                                {appointment.endTime}
                                              </td>
                                              <td className="OutfitFont">
                                                <button className="btn btn-default mr-2 appointmentButton appointmentDetailButton OutfitFont">
                                                  <img
                                                    className="appointmentDetailDashboardImage"
                                                    src="../../../../assets/images/appointments/appointmentDetail.png"
                                                    alt="Appointment Detail"
                                                  />
                                                </button>
                                                {/* <button
                                                  className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2"
                                                  onClick={() =>
                                                    handleOpenCancelPopup(
                                                      appointment.bookAppointmentId
                                                    )
                                                  }
                                                >
                                                  Cancel
                                                </button> */}
                                                {/* <button className="btn btn-default appointmentButton appointmentStartButton OutfitFont ">
                                                    <i className="fas fa-video pr-1"></i>
                                                    Join
                                                  </button> */}
                                              </td>
                                            </tr>
                                          )
                                        )
                                      : status === "completed" ||
                                        status === "cancelled"
                                      ? appointmentDetails?.map(
                                          (appointment, index) => (
                                            <tr key={index}>
                                              <td className="OutfitFont">
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  {/* <img
                                                      src="../assets/images/appointments/tableuser.png"
                                                      alt="Profile"
                                                      width="50"
                                                      height="50"
                                                    /> */}
                                                  <span
                                                    style={{
                                                      marginLeft: "10px",
                                                    }}
                                                  >
                                                    {appointment.name}
                                                  </span>
                                                </div>
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.location}
                                              </td>
                                              <td className="OutfitFont">
                                                {format(
                                                  new Date(
                                                    appointment.appointmentDate
                                                  ),
                                                  "dd MMM yyyy",
                                                  { locale: enUS }
                                                )}
                                              </td>
                                              <td className="OutfitFont">
                                                {appointment.startTime}-
                                                {appointment.endTime}
                                              </td>
                                              <td className="OutfitFont">
                                                {/* <button className="btn btn-default mr-2 appointmentButton appointmentDetailButton OutfitFont underline-text appointmentInvoiceButton">
                                                  Invoice
                                                </button>
                                                <button className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2">
                                                  Review
                                                </button>
                                                <button className="btn btn-default appointmentButton appointmentStartButton OutfitFont ">
                                                  Book again
                                                </button> */}
                                              </td>
                                            </tr>
                                          )
                                        )
                                      : null}
                                  </tbody>
                                </table>
                              ) : (
                                <>
                                  <div className="row w-100 datanotrow">
                                    <p className="AthleticsFont description dashboardTableInsideDescription">
                                      When you match with a client your
                                      appointment with them can be found here!
                                    </p>
                                  </div>
                                  <hr />
                                </>
                              )}
                            </div>
                            {appointmentDetails.length === 0 ? (
                              <nav className="d-flex justify-content-between">
                                <div className="p-2">Showing 0</div>
                              </nav>
                            ) : (
                              <Pagination
                                page={page}
                                setPage={setPage}
                                totalPage={totalPage}
                                totalAppointment={totalAppointment}
                                status={status}
                                handleStatus={handleStatus}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="container-fluid bottomImageContainer">
                <img
                  src="../../../assets/images/mainBottomBackgroundImage/bottomBackgroundImage.png"
                  alt=""
                ></img>
              </div>
            </>
          ) : (
            <VideoRoom
              videoJoinDetails={videoJoinDetails}
              onHide={handleCloseVideo}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default WelcomePage;
