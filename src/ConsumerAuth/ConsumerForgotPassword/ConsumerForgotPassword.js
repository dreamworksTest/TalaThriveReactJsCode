import React, {  useState } from "react";
import "./ConsumerForgotPassword.css";
import { Link } from "react-router-dom";
import { forgotPasswordConsumerValidation } from "../Validations/Validations";
import { forgotPasswordConsumerService } from "../Services/Services";
import ConsumerGotEmail from "../../Consumer/Page/ConsumerGotEmail/ConsumerGotEmail";

const ConsumerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await  forgotPasswordConsumerValidation(email);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = { email };
        const res = await forgotPasswordConsumerService(userDetails);
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
  };

  const isNextDisabled = () => {
    if (!email) {
      return true;
    }
    return false;
  };

  return (
    <div className="login-header">
      {emailSent ? (
        <ConsumerGotEmail handleResetButton={handleResetButton} />
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
                      Back to
                      <Link to="/consumerLogin" className="AthleticsFont">
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

export default ConsumerForgotPassword;