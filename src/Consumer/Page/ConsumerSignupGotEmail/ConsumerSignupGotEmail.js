import React from "react";
import "./ConsumerSignupGotEmail.css";
import { Link, useNavigate } from "react-router-dom";

const ConsumerSignupGotEmail = () => {
  const navigate = useNavigate();
  
  const handleResetButton = () => {
    navigate("/consumerLogin");
  };

  return (
    <div className="container-fluid gotMailMaincontainer">
      <div className="row gotMailMaincontainerRow">
        <div className="col-md-6  mainLeftSideImage"></div>
        <div className="col-md-6  d-flex mainRightDiv">
          <div className="d-flex align-items-center inputwidthmanage">
            <div className="container passwordchangedcontainer ">
              <img
                height="60"
                width="60"
                alt=""
                src="../../../../assets/images/gotMailImages/gotMail.png"
              />
              <br />
              <h2 className="maintitle AthleticsFont">You've got mail!</h2>
              <p className="mainDescription AthleticsFont">
                We've sent you an email - if you don't <br /> see it, please
                check your spam folder
              </p>
              <p className="loginlink AthleticsFont">
                Continue to <span onClick={handleResetButton}>Login</span>
              </p>
            </div>
          </div>
          <Link to="/consumerLogin">
            <img
              src="../../../../assets/images/gotMailImages/cross.png"
              alt=""
              className="position-absolute top-0 end-0 py-3 px-3 crossButton"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsumerSignupGotEmail;
