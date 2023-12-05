import React, {  useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { forgotPasswordValidation } from "../Validations/Validations";
import { forgotPasswordService } from "../Services/Services";
import GotEmail from "../../Therapist/GotEmail/GotEmail";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await forgotPasswordValidation(email);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = { email };
        const res = await forgotPasswordService(userDetails);
        if (res.data && res.data.message) {
          setEmailSent(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResetButton = () => {
    setEmailSent(false);
  }


    const isNextDisabled = () => {
      if (!email) {
        return true;
      }
      return false;
    };

  return (
    <div className="login-header">
      {emailSent ? (
        <GotEmail handleResetButton={handleResetButton} />
      ) : (
        <div className="container-fluid forgotPasswordMaincontainer">
          <div className="row forgotPasswordMaincontainerRow">
            <div className="col-md-6 mainLeftSideImage"></div>
            <div className="col-md-6 d-flex mainRightDiv">
              <div className="d-flex align-items-center inputwidthmanage">
                <div className="container mainSiteContainer">
                  <h2 className="AthleticsFont mainHeading">
                    Forgot your password?
                  </h2>
                  <p className="mainDescription AthleticsFont">
                    Reset your password
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className={`form-control AthleticsFont ${
                          errors.email && !email
                            ? "error-border red-placeholder"
                            : ""
                        }`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors && (
                        <span className="errors ">{errors.email}</span>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className="btn btn-primary full-width-button forgotPasswordMainButton py-3 AthleticsFont"
                    >
                      Reset
                    </button>
                    <br />
                    <p className="loginlinkMobile AthleticsFont">
                      Back to{" "}
                      <Link to="/login" className="AthleticsFont">
                        Log in
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;