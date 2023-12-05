import { Link } from "react-router-dom";
import "./Header.css";
import { getIsProfileCompletedService, getTherapistDetailsService } from "../TherapistServices/TherapistServices";
import { useEffect, useState } from "react";

const Header = ({ profileDetails }) => {
  const [profileCompleted, setProfileCompleted] = useState({});
  
  useEffect(() => {
    const getTherapistDetails = async () => {
      try {
        const res = await getIsProfileCompletedService();
        if (res && res?.data?.data) {
          const { isProfileCompleted } = res.data.data;
          setProfileCompleted(isProfileCompleted);
        } else {
          console.log("Data not found or unexpected response structure:", res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTherapistDetails();
  }, []);

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo ml-5" to="/onBoard">
          <img
            src="../assets/images/mainSectionImages/logo.png"
            className="mr-2"
            alt="logo"
          />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/onBoard">
          <img src="../assets/images/mainSectionImages/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile dropdown">
            <Link
              className="nav-link dropdown-toggle d-flex align-items-center"
              to="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              <p className="m-0">{profileDetails.firstName}</p>

              {profileDetails.profileImage ? (
                <img
                  src={profileDetails.profileImage}
                  alt="profile"
                  className="ml-2"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                <img
                  src="../../../../assets/images/profileImage/defaultProfileImage.png"
                  alt="profile"
                  className="ml-2"
                  style={{ width: "30px", height: "30px" }}
                />
              )}
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown mainMenuBar"
              aria-labelledby="profileDropdown"
            >
              <div className="menuLinkUpsideDiv">
                <Link
                  to="/onBoard"
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                >
                  Home
                  <img
                    src="../../../assets/images/menuBar/home.png"
                    alt=""
                  ></img>
                </Link>
              </div>

              <div className="menuLinkUpsideDiv">
                <Link
                  to="#"
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                >
                  Messages
                  <img
                    src="../../../assets/images/menuBar/messages.png"
                    alt=""
                  ></img>
                </Link>
              </div>

              {profileCompleted === true ? (
                <div className="menuLinkUpsideDiv">
                  <Link
                    to="/profile"
                    className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                  >
                    Edit profile
                    <img
                      src="../../../assets/images/menuBar/editProfile.png"
                      alt=""
                    ></img>
                  </Link>
                </div>
              ) : (
                ""
              )}

<div className="menuLinkUpsideDiv">
                <Link
                  to="/allAppointments"
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                >
                  Appointments
                  <img
                    src="../../../assets/images/menuBar/schedule.png"
                    alt=""
                  ></img>
                </Link>
              </div>
              <div className="menuLinkUpsideDiv">
                <Link
                  to="/therapistAddSchedule"
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                >
                  Schedule
                  <img
                    src="../../../assets/images/menuBar/schedule.png"
                    alt=""
                  ></img>
                </Link>
              </div>

              <div className="menuLinkUpsideDiv">
                <Link
                  to="/payment"
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                >
                  Payments
                  <img
                    src="../../../assets/images/menuBar/payments.png"
                    alt=""
                  ></img>
                </Link>
              </div>

              <div className="menuLinkUpsideDiv">
                <Link
                  className="dropdown-item d-flex justify-content-between dropdownmenuitemtext AthleticsFont"
                  to="/logout"
                >
                  Logout
                  <img
                    src="../../../assets/images/menuBar/logout.png"
                    alt=""
                  ></img>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header