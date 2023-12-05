import React from "react";
import "./ConsumerPasswordChangeSuccessfull.css";
// import { Link } from "react-router-dom";

const ConsumerPasswordChangeSuccessfull = () => {
  return (
    <div className="container-fluid chooosePasswordMaincontainer">
      <div className="row chooosePasswordMaincontainerRow">
        <div className="col-md-6 mainLeftSideImage"></div>
        <div className="col-md-6 d-flex mainRightDiv">
          <div className="d-flex align-items-center inputwidthmanage">
            <div className="container passwordchangedcontainer">
              <img
                src="../../../../assets/images/passwordChangedImages/success.png"
                alt=""
              />
              <br />
              <h2 className="maintitle AthleticsFont">Password changed!</h2>
              <p className="mainDescription AthleticsFont">
                Your password has been changed successfully.
              </p>
              <p className="loginlink AthleticsFont">
                <a href="/consumerLogin"> Continue to Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerPasswordChangeSuccessfull;
