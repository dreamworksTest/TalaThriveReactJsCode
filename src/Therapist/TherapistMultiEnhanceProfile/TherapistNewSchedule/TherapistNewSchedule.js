import React, { useEffect, useRef, useState } from "react";
import "./TherapistNewSchedule.css";
import { AddTherapistSchedule, UpdateImageService, getTherapistDetailsService } from "../../TherapistServices/TherapistServices";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";

const TherapistNewSchedule = () => {
  const fileInputRef = useRef(null);
  const [profileDetails, setProfileDetails] = useState({});
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [timeZone, setTimeZone] = useState("America/New_York");
  const [infiniteDate, setInfiniteDate] = useState(false);
  const [anotherOption, setAnotherOption] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meetingDuration, setMeetingDuration] = useState(45);
  const [dayOfWeek, setDayOfWeek] = useState([
    { day: "SUN", available: false, startTime: "", endTime: "" },
    { day: "MON", available: false, startTime: "", endTime: "" },
    { day: "TUE", available: false, startTime: "", endTime: "" },
    { day: "WED", available: false, startTime: "", endTime: "" },
    { day: "THU", available: false, startTime: "", endTime: "" },
    { day: "FRI", available: false, startTime: "", endTime: "" },
    { day: "SAT", available: false, startTime: "", endTime: "" },
  ]);

  const [dateError, setDateError] = useState("");

  // const today = new Date().toLocaleDateString("en-GB");
  const today = new Date().toLocaleDateString("en-CA");
  console.log(today);
  console.log(startDate);
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    if (startDate && newEndDate < startDate) {
      setDateError("End date should not be less than start date.");
    } else {
      setDateError("");
    }
  };

  const handleInfiniteDateChange = () => {
    setInfiniteDate(true);
    setAnotherOption(false);
  };

  const handleAnotherOptionChange = () => {
    setInfiniteDate(false);
    setAnotherOption(true);
  };

  const handleDayOfWeekChange = (index, field, value) => {
    const updatedDayOfWeek = [...dayOfWeek];
    updatedDayOfWeek[index][field] = value;
    setDayOfWeek(updatedDayOfWeek);
  };

  const handleCheckboxChange = (index, isChecked) => {
    const updatedDayOfWeek = [...dayOfWeek];
    updatedDayOfWeek[index].available = isChecked;
    setDayOfWeek(updatedDayOfWeek);
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
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileImage();
  }, [setProfileDetails]);

  useEffect(() => {
    if (role !== "therapist" && role !== "coach") {
      navigate("/login");
    }
  }, [navigate, role]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userDetails = {
        timeZone,
        startDate,
        endDate,
        infiniteDate,
        meetingDuration,
        dayOfWeek,
      };
      const res = await AddTherapistSchedule(userDetails);
      if (res.data) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "Ok",
        }).then(() => {
          // Reload the page after the user clicks "Ok"
          window.location.reload();
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAnyInputEmptyOrZero = () => {
    // Check if any input is empty or equal to 0
    if (
      !timeZone ||
      (!infiniteDate && (!startDate || !endDate)) ||
      isNaN(meetingDuration) || // Check if meetingDuration is not a number
      meetingDuration <= 0 || // Check if meetingDuration is less than or equal to 0
      dayOfWeek.some((day) => {
        return (
          day.available &&
          (day.startTime === "" ||
            day.endTime === "" ||
            day.startTime === "0" ||
            day.endTime === "0")
        );
      })
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      {role === "therapist" || role === "coach" ? (
        <>
          <Header profileDetails={profileDetails} />
          <div className="container-fluid page-body-wrapper heightByContent mainScheduleSection">
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
                        alt="Profile "
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
                            className="col-md-5 d-flex align-items-center"
                            style={{ paddingTop: "6px" }}
                          >
                            <h1 className="profileName AthleticsFont">
                              Hi {profileDetails.firstName}!
                            </h1>
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            {/* <p className="mb-0 profileType OutfitFont">
                              {role}
                            </p> */}
                          </div>
                        </div>
                        {/* <p className="mb-0 imageSectionContent AthleticsFont">
                          You can amend your schedule at any time under
                          ‘Schedule’
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container align-items-center justify-content-center boxSectionNew boxsectionNew2 d-flex align-items-center">
                  <div className="mainBox2RowUp">
                    <div className="row">
                      <div className="col-md-12 d-flex align-items-center justify-content-center mainContainerHeadingMainDiv">
                        <p className="AthleticsFont mainContainerHeading">
                          Set your tentative weekly schedule
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 d-flex justify-content-center align-items-center mainBox2ColMd12">
                        <div className="mainbox2">
                          <div className="text-left mainQuestionContainer mainQuestionContainer1">
                            <label
                              className="AthleticsFont appointmentLabelOne"
                              htmlFor="textArea2"
                            >
                              When can clients schedule appointments with you?
                            </label>
                            <br />
                            <span className="AthleticsFont indicateClientText">
                              Please indicate your general availability for
                              clients.
                            </span>
                          </div>

                          <div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-check dateRangeFormCheck">
                                  <input
                                    type="radio"
                                    className="form-check-input dateRadio"
                                    id="radio1"
                                    name="optradio"
                                    value="DateRange"
                                    onChange={handleAnotherOptionChange}
                                    defaultChecked
                                  />
                                  Date range
                                </div>
                                {anotherOption && (
                                  <div className="container d-flex justify-content-lg-start justify-content-center align-items-center">
                                    <div>
                                      <div className="d-flex flex-column flex-lg-row align-items-center">
                                        <input
                                          type="date"
                                          className="form-control mb-2 mb-lg-0 mr-2"
                                          value={startDate}
                                          onChange={handleStartDateChange}
                                          min={today}
                                        ></input>
                                        <span className="mb-2 mb-lg-0 mr-2">
                                          -
                                        </span>
                                        <input
                                          type="date"
                                          className="form-control mb-2 mb-lg-0"
                                          value={endDate}
                                          onChange={handleEndDateChange}
                                          min={startDate || today}
                                        ></input>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="row">
                                  <div className="col-md-3 col-sm-12"></div>
                                  <div className="col-md-9">
                                    <label className="timeZoneSelectLabel OutfitFont">
                                      Time Zone
                                    </label>
                                    <select
                                      className=" OutfitFont selectTime selectBoxTimeZone form-control"
                                      style={{ width: "100%" }}
                                      value={timeZone}
                                      onChange={(e) =>
                                        setTimeZone(e.target.value)
                                      }
                                    >
                                      <option value="America/New_York">
                                        Eastern Time - US & Canada
                                      </option>
                                      <option value="America/Chicago">
                                        US Time
                                      </option>
                                      <option value="Europe/London">
                                        London Time
                                      </option>
                                      <option value="Asia/Kolkata">
                                        Kolkata Time
                                      </option>
                                    </select>
                                    <div className="select-arrow">
                                      <i className="fas fa-chevron-down"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="form-check InfinitePeriodFormCheck">
                              <input
                                type="radio"
                                className="form-check-input dateRadio"
                                id="radio2"
                                name="optradio"
                                value="InfinitePeriod"
                                onChange={handleInfiniteDateChange}
                                checked={infiniteDate}
                              />
                              Infinite Period
                            </div>
                          </div>

                          <div className="form-group text-left mainQuestionContainer">
                            <label
                              className="OutfitFont setWeeklyHoursLabel AthleticsFont"
                              htmlFor="textArea3"
                            >
                              Set your Weekly Hours
                            </label>

                            <div>
                              <table className="table appointmentTable">
                                <thead>
                                  <tr>
                                    <th className="text-center AthleticsFont">
                                      Select available
                                    </th>
                                    <th className="AthleticsFont">
                                      Add/Remove hours
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {dayOfWeek.map((day, index) => (
                                    <tr key={index}>
                                      <td>
                                        <div className="form-check">
                                          <input
                                            className="form-check-input DayCheckBox"
                                            type="checkbox"
                                            id="checkSat"
                                            name="optionSat"
                                            checked={day.available}
                                            onChange={(e) =>
                                              handleCheckboxChange(
                                                index,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label
                                            className="form-check-label daytext AthleticsFont"
                                            htmlFor="checkSat"
                                          >
                                            {day.day}
                                          </label>
                                        </div>
                                      </td>
                                      {day.available ? (
                                        <>
                                          {" "}
                                          <td>
                                            <div className="row">
                                              <div className="col-12 col-md-4 d-flex align-items-center">
                                                <select
                                                  className="form-control form-control-lg OutfitFont selectTime"
                                                  style={{ width: "100%" }}
                                                  value={day.startTime}
                                                  onChange={(e) =>
                                                    handleDayOfWeekChange(
                                                      index,
                                                      "startTime",
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Select Time
                                                  </option>
                                                  {Array.from(
                                                    { length: 24 },
                                                    (_, index) => index
                                                  ).map((hour) => (
                                                    <option
                                                      key={hour}
                                                      value={`${(hour % 12 === 0
                                                        ? 12
                                                        : hour % 12
                                                      )
                                                        .toString()
                                                        .padStart(2, "0")}:00 ${
                                                        hour < 12 ? "am" : "pm"
                                                      }`}
                                                    >
                                                      {`${(hour % 12 === 0
                                                        ? 12
                                                        : hour % 12
                                                      )
                                                        .toString()
                                                        .padStart(2, "0")}:00 ${
                                                        hour < 12 ? "am" : "pm"
                                                      }`}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                              <div className="col-12 col-md-1 d-flex align-items-center justify-content-center">
                                                <span className="mr-2">-</span>
                                              </div>
                                              <div className="col-12 col-md-4 d-flex align-items-center">
                                                <select
                                                  className="form-control form-control-lg OutfitFont selectTime"
                                                  style={{ width: "100%" }}
                                                  value={day.endTime}
                                                  onChange={(e) =>
                                                    handleDayOfWeekChange(
                                                      index,
                                                      "endTime",
                                                      e.target.value
                                                    )
                                                  }
                                                >
                                                  <option value="">
                                                    Select Time
                                                  </option>
                                                  {Array.from(
                                                    { length: 24 },
                                                    (_, index) => index
                                                  ).map((hour) => (
                                                    <option
                                                      key={hour}
                                                      value={`${(hour % 12 === 0
                                                        ? 12
                                                        : hour % 12
                                                      )
                                                        .toString()
                                                        .padStart(2, "0")}:00 ${
                                                        hour < 12 ? "am" : "pm"
                                                      }`}
                                                    >
                                                      {`${(hour % 12 === 0
                                                        ? 12
                                                        : hour % 12
                                                      )
                                                        .toString()
                                                        .padStart(2, "0")}:00 ${
                                                        hour < 12 ? "am" : "pm"
                                                      }`}
                                                    </option>
                                                  ))}
                                                </select>
                                              </div>
                                            </div>
                                          </td>
                                        </>
                                      ) : (
                                        <td>
                                          <div className="row">
                                            <div className="col-12 col-md-4 d-flex align-items-center">
                                              <p className="UnavailablePTag OutfitFont">
                                                Unavailable
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {/* <div className="text-left mainQuestionContainer">
                            <label
                              className="OutfitFont setDurationLabel AthleticsFont"
                              htmlFor="textArea3"
                            >
                              Set Duration
                            </label>
                            <select
                              className="form-control form-control-lg OutfitFont selectTime"
                              style={{ width: "100%" }}
                              value={meetingDuration}
                              onChange={(e) =>
                                setMeetingDuration(e.target.value)
                              }
                            >
                              <option value="">Select Duration</option>
                              <option value="15">15 Min</option>
                              <option value="30">30 Min</option>
                              <option value="45">45 Min</option>
                              <option value="60">60 Min</option>
                            </select>
                          </div> */}
                          {/* ... (rest of your code) ... */}
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
                        <div className="form-group w-100 nextButtonFormGroup">
                          <button
                            type="submit"
                            disabled={isAnyInputEmptyOrZero()}
                            onClick={handleSubmit}
                            className="btn btn-primary btn-block my-4 py-3 mainnextbutton OutfitFont"
                          >
                            Save Schedule
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
      ) : null}
    </>
  );
};

export default TherapistNewSchedule;
