import React, { useEffect, useRef, useState } from "react";
import "./EmailVerify.css";
import { getEmailVerifyService } from "../Services/Services";
import { useParams } from "react-router-dom";

const EmailVerify = () => {
    const { token } = useParams();
    const [verificationStatus, setVerificationStatus] = useState("pending"); // Possible values: "pending", "success", "expired"
    const [error, setErrors] = useState("");
    const initialized = useRef(false);

    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true;

        getVerifyEmail();
      }
    }, []);

    const getVerifyEmail = async () => {
      try {
        const res = await getEmailVerifyService(token);
        if (res.data.statusCode === 200) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("expired");
        }
      } catch (err) {
        setVerificationStatus("expired");
        setErrors("This link has been expired");
        console.log(err);
      }
    };

 

  return (
    <div className="container-fluid chooosePasswordMaincontainer">
      <div className="row chooosePasswordMaincontainerRow">
        <div className="col-md-6 mainLeftSideImage"></div>
        <div className="col-md-6 d-flex mainRightDiv">
          <div className="d-flex align-items-center inputwidthmanage">
            <div className="container passwordchangedcontainer">
              {verificationStatus === "success" ? (
                // Content for successful verification
                <>
                  <img
                    src="../../../../assets/images/passwordChangedImages/success.png"
                    alt=""
                  />
                  <br />
                  <h2 className="maintitle AthleticsFont">Email Verified!</h2>
                  <p className="mainDescription AthleticsFont">
                    Your email has been successfully verified.
                  </p>
                  <p className="loginlink AthleticsFont">
                    <a href="/login"> Continue to Login</a>
                  </p>
                </>
              ) : verificationStatus === "expired" ? (
                // Content for expired link
                <>
                  <img src="../../../../assets/images/errorImage.png" alt="" />
                  <br />
                  <h2 className="maintitle AthleticsFont">
                    Verification Link Expired!
                  </h2>
                  <p className="mainDescription AthleticsFont">{error}</p>
                </>
              ) : (
                // Default content (optional)
                <>
                  {/* <p className="defaultContent">Some default content</p> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
