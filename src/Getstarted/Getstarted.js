import React from "react";
import "./Getstarted.css";
import { Link } from "react-router-dom";

const GetStarted = () => {
  

  return (
    <div className="container-fluid signup1Maincontainer">
      <div className="row signup1MaincontainerRow">
        {/* <div className="col-md-6 full-height mainSignupLeftSideImage"> */}
        <div className="col-md-6 mainSignupLeftSideImage"></div>
        {/* <div className="col-md-6 full-height d-flex"> */}
        <div className="col-md-6  d-flex mainRightDiv">
          <div className="d-flex align-items-center">
            <div className="container mainSiteContainer">
              <h2 className="AthleticsFont mainHeading">
                Welcome to Tala Thrive
              </h2>
              <p className="mainDescription AthleticsFont">
                Please select your profession
              </p>
              <form style={{ marginTop: "21px" }}>
                <div className="container mt-5 form-group signupform1">
                  <ul className="nav nav-tabs" id="myTabs" role="tablist">
                    <li
                      className="nav-item firstProfession"
                      role="presentation"
                    >
                      <Link
                        className="nav-link active AthleticsFont"
                        // id="tab1-tab"
                        // data-bs-toggle="tab"
                        to="/signup"
                        role="tab"
                        aria-controls="tab1"
                        aria-selected="true"
                      >
                        Therapist Or Coach
                      </Link>
                    </li>
                    <li
                      className="nav-item secondProfession"
                      role="presentation"
                    >
                      <Link
                        className="nav-link AthleticsFont"
                        // id="tab2-tab"
                        // data-bs-toggle="tab"
                        to="/consumerLogin"
                        role="tab"
                        aria-controls="tab2"
                        aria-selected="false"
                      >
                        Consumer
                      </Link>
                    </li>
                  </ul>
                  {/* <div className="tab-content professiontab" id="myTabsContent">
                    <div
                      className="tab-pane fade show active bordered-list"
                      id="tab1"
                      role="tabpanel"
                      aria-labelledby="tab1-tab"
                    >
                      <h3 className="AthleticsFont tabheading">
                        Signup as a therapist
                      </h3>
                      <p className="dotted removeMargin AthleticsFont">
                        Apply your experience and skills where they can make the
                        most impact.
                      </p>
                      <p className="dotted removeMargin AthleticsFont">
                        Work online at home and decide your own hours.
                      </p>
                      <p className="dotted AthleticsFont">
                        Reduce your admin and maximize your income.
                      </p>
                    </div>
                    <div
                      className="tab-pane fade bordered-list"
                      id="tab2"
                      role="tabpanel"
                      aria-labelledby="tab2-tab"
                    >
                      <h3 className="AthleticsFont tabheading">
                        Signup as a coach
                      </h3>
                      <p className="dotted removeMargin AthleticsFont">
                        Apply your experience and skills where they can make the
                        most impact.
                      </p>
                      <p className="dotted removeMargin AthleticsFont">
                        Work online at home and decide your own hours.
                      </p>
                      <p className="dotted AthleticsFont">
                        Reduce your admin and maximize your income.
                      </p>
                    </div>
                  </div> */}
                </div>

                {/* <div className="form-group">
                  <button
                    type="submit"
                    onClick={onNext}
                    className="btn btn-primary btn-block my-4 py-3 signupnextbutton1 AthleticsFont onBoardSubmitButton"
                  >
                    Next
                  </button>
                </div> */}
              </form>
              {/* <p className="loginlinkMobile  d-block d-md-none AthleticsFont">
                Already have an account? <Link to="/login">Log in</Link>
              </p> */}
            </div>
            {/* <p className="loginlinkDesktop position-absolute top-0 end-0 py-2 px-2 d-none d-md-block AthleticsFont">
              Already have an account? <Link to="/login">Log in</Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
