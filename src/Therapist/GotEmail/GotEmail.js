import React from "react";
import "./GotEmail.css";
import { Link } from "react-router-dom";

const GotEmail = ({ handleResetButton }) => {
  return (
   <div className="container-fluid gotMailMaincontainer">
        <div className="row gotMailMaincontainerRow">
            <div className="col-md-6  mainLeftSideImage">
            </div>
            <div className="col-md-6  d-flex mainRightDiv">
                <div className="d-flex align-items-center inputwidthmanage">
                    <div className="container passwordchangedcontainer ">
                        <img height="60" width="60" alt="" src="../../assets/images/gotMailImages/gotMail.png" />
                        <br/>
                        <h2 className="maintitle AthleticsFont">You've got mail!</h2>
                        <p className="mainDescription AthleticsFont">We've sent you an email - if you don't <br/> see it, please check your spam folder</p>
                        <p className="loginlink AthleticsFont">Not Received? <span onClick={handleResetButton}>Resend</span></p> 
                    </div> 
                 </div>
                 <Link to="/login">
                  <img src="../assets/images/gotMailImages/cross.png" alt='' className="position-absolute top-0 end-0 py-3 px-3 crossButton"/>
                  </Link>
            </div>
        </div>
    </div>
  );
};

export default GotEmail;
