import React, { useEffect, useRef, useState } from "react";
import "./ConsumerAllAppointments.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import { getConsumerAllAppointmentService, getConsumerDetailsService, getStartedVideoService, uploadConsumerProfileImage } from "../Service/Service";
import ConsumerHeader from "../ConsumerHeader/ConsumerHeader";
import CancelPopup from "../Page/CancelPopup/CancelPopup";
import { format } from "date-fns";
import { enUS } from "date-fns/locale"; 
import { VideoRoom } from "../Agora/Main/VideoRoom";
 

const ConsumerAllAppointments = () => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalAppointment, setTotalAppointment] = useState(1);
  const [sizes, setSize] = useState(1);
  const [limit] = useState(10);
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookAppointmentId, setBookAppointmentId] = useState();
  const firstName = localStorage.getItem("firstName");

  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handleOpenCancelPopup = (bookingId) => {
    setBookAppointmentId(bookingId);
    setShowCancelPopup(true);
  };
  const handleCloseCancelPopup = () => {
      setShowCancelPopup(false);
  };
  
  
  useEffect(() => {
    if (role !== "consumer") {
      navigate("/consumerLogin");
    }
  }, [navigate, role]);

  useEffect(() => {
    handleStatus("today");
  }, []);
  
 
  const handleStatus = async (status) => {
    try {
      setStatus(status);
      setLoading(true);
      const res = await getConsumerAllAppointmentService(status, page, limit);
      console.log(res.data);
      if (res.data) {
        setAppointmentDetails(res.data.data);
        setTotalPage(res.data.totalPages);
        setTotalAppointment(res.data.totalRecords);
        setSize(res.data.size);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //  useEffect(() => {
  //         const calculatedTotalPage = Math.ceil(totalAppointment / limit);
  //         setTotalPage(calculatedTotalPage);
  //       }, [totalAppointment, limit]);

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
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  const [joined, setJoined] = useState(false);
  const [videoJoinDetails, setVideoJoinDetails] = useState({});
   
  const handleJoinVideoCall = async (bookAppointmentId) => {  
    try {
      const res = await getStartedVideoService(bookAppointmentId);
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
  }
 
  return (
    <div>
      {role === "consumer" ? (
        <>
          {loading ? (
            <Loading />
          ) : joined === false ? (
            <>
              <ConsumerHeader profileDetails={profileDetails} />
              <div className="container-fluid page-body-wrapper heightByContent mainAppointmentSection">
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
                              Your next appointment is Today and 09:00AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                      <div className="mainBox2RowUp">
                        <div className="row">
                          <div className="col-md-6">
                            <p className="AthleticsFont mainContainerHeading">
                              Your appointments
                            </p>
                          </div>
                          <div className="col-md-6">
                            <Link to="/matchTherapist">
                              <p className="viewYourMatchesText AthleticsFont">
                                View your matches
                              </p>
                            </Link>
                          </div>
                          {/* <div></div> */}

                          <div className="Table-form-group">
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
                                  onClick={() => handleStatus("today", page)}
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
                                  onClick={() => handleStatus("upcoming", page)}
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
                                                      src="../../../../assets/images/appointments/appointmentDetail.png"
                                                      alt="Appointment Detail"
                                                    />
                                                  </button>
                                                  <button
                                                    className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2"
                                                    onClick={() =>
                                                      handleOpenCancelPopup(
                                                        appointment.bookAppointmentId
                                                      )
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                  <button
                                                    className="btn btn-default appointmentButton appointmentStartButton OutfitFont "
                                                    onClick={() =>
                                                      handleJoinVideoCall(
                                                        appointment.bookAppointmentId
                                                      )
                                                    }
                                                  >
                                                    <i className="fas fa-video pr-1"></i>
                                                    Join
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
                                                      src="../../../../assets/images/appointments/appointmentDetail.png"
                                                      alt="Appointment Detail"
                                                    />
                                                  </button>
                                                  <button
                                                    className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2"
                                                    onClick={() =>
                                                      handleOpenCancelPopup(
                                                        appointment.bookAppointmentId
                                                      )
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
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
                                                  <button className="btn btn-default mr-2 appointmentButton appointmentDetailButton OutfitFont underline-text appointmentInvoiceButton">
                                                    Invoice
                                                  </button>
                                                  <button className="btn btn-default appointmentButton appointmentStartButton1 OutfitFont mr-2">
                                                    Review
                                                  </button>
                                                  <button className="btn btn-default appointmentButton appointmentStartButton OutfitFont ">
                                                    Book again
                                                  </button>
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
                                <nav className="d-flex justify-content-between ">
                                  <div className="OutfitFont countNumberTableData">
                                    Showing 0
                                  </div>
                                </nav>
                              ) : (
                                <Pagination
                                  page={page}
                                  sizes={sizes}
                                  setPage={setPage}
                                  totalPage={totalPage}
                                  totalAppointment={totalAppointment}
                                  status={status}
                                  handleStatus={handleStatus}
                                />
                              )}
                              <CancelPopup
                                setAppointmentDetails={setAppointmentDetails}
                                bookAppointmentId={bookAppointmentId}
                                show={showCancelPopup}
                                onHide={handleCloseCancelPopup}
                                appointmentDetails={appointmentDetails}
                              />
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

export default ConsumerAllAppointments;
