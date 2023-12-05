import React, { useState } from 'react';
import './ResetPassword.css';
import { resetPasswordValidation } from '../Validations/Validations';
import { resetPasswordService } from "../Services/Services";
import { useParams } from 'react-router-dom';
import PasswordChangeSuccessfull from "../../Therapist/PasswordChangeSuccessfull/PasswordChangeSuccessfull";
 
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordChangeSuccessfull, setpasswordChangeSuccessfull] = useState(false);
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await resetPasswordValidation(password, confirmPassword);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = { password, confirmPassword };
        const res = await resetPasswordService(userDetails, id, token);
        if (res.data && res.data.message) {
          setpasswordChangeSuccessfull(true);
        }
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err);
    }
  };


      const isNextDisabled = () => {
        if (!password || !confirmPassword) {
          return true;
        }
        return false;
      };

  return (
    <div className="login-header">
      {passwordChangeSuccessfull ? (
        <PasswordChangeSuccessfull />
      ) : (
        <div className="container-fluid chooosePasswordMaincontainer">
          <div className="row chooosePasswordMaincontainerRow">
            <div className="col-md-6  mainLeftSideImage"></div>
            <div className="col-md-6 d-flex mainRightDiv">
              <div className="d-flex align-items-center inputwidthmanage">
                <div className="container mainSiteContainer">
                  <h2 className="AthleticsFont mainHeading">
                    Choose a new password
                  </h2>
                  <p className="mainDescription AthleticsFont">
                    To continue, input your new password
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Enter a new password"
                        className={`form-control AthleticsFont ${
                          errors.password && !password
                            ? "error-border red-placeholder"
                            : ""
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors && (
                        <span className="errors ">{errors.password}</span>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        placeholder="Confirm your password"
                        className={`form-control AthleticsFont ${
                          errors.confirmPassword && !confirmPassword
                            ? "error-border red-placeholder"
                            : ""
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors && (
                        <span className="errors ">
                          {errors.confirmPassword}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isNextDisabled()}
                      className="btn btn-primary full-width-button choosePasswordMainButton py-3 AthleticsFont"
                    >
                      Next
                    </button>
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

export default ResetPassword;
