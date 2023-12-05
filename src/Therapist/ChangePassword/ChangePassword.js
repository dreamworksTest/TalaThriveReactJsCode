import React, { useEffect,useState } from 'react';
import "./ChangePassword.css";
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { toast } from 'react-toastify';
import { changePasswordService } from '../TherapistServices/TherapistServices';
import { changePasswordValidation } from '../TherapistValidation/TherapistValidation';
 

const ChangePassword = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
 

      useEffect(() => {
        if (role !== "therapist" && role !== "coach") {
          navigate("/login");
        }
      }, [navigate, role]);
    
    const handleSubmit =async (e) => {
         try {
      e.preventDefault();
      const validate = await changePasswordValidation(oldPassword,newPassword,confirmPassword);
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = { oldPassword, newPassword,confirmPassword, };
        const res = await changePasswordService(userDetails);  
        toast.success(res.data.message, { position: toast.POSITION.BOTTOM_LEFT, });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.log(err)
    }
    }
 
    
  return (
    <div className="welcome_page">
      {role === "therapist" || role === "coach" ? (
        <>
          <Header />
          <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
              <div className="container mt-5 changePasswordSection">
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center align-items-center">
                    <div className="mainbox2" style={{ padding: "50px" }}>
                      <br />
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputEmail1"
                            className="OutfitFont"
                          >
                            Change password
                          </label>
                          <p className="OutfitFont description">
                            Please update your new password
                          </p>
                        </div>

                        <div className="form-group">
                          <div className="mb-2 inputField">
                            <input
                              className={`form-control OutfitFont createpasswordfield ${
                                errors.oldPassword && !oldPassword
                                  ? "error-border"
                                  : ""
                              }`}
                              type="password"
                              placeholder=" "
                              onChange={(e) => setOldPassword(e.target.value)}
                              value={oldPassword}
                            />
                            <span
                              className={` ${
                                errors.oldPassword && !oldPassword
                                  ? "red-placeholder"
                                  : ""
                              }`}
                            >
                              Old password
                            </span>
                          </div>
                          {errors && (
                            <span className="errors_changePassword ">
                              {errors.oldPassword}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="mb-2 inputField">
                            <input
                              className={`form-control OutfitFont createpasswordfield ${
                                errors.newPassword && !newPassword
                                  ? "error-border"
                                  : ""
                              }`}
                              type="password"
                              placeholder=" "
                              onChange={(e) => setNewPassword(e.target.value)}
                              value={newPassword}
                            />
                            <span
                              className={` ${
                                errors.newPassword && !newPassword
                                  ? "red-placeholder"
                                  : ""
                              }`}
                            >
                              New password
                            </span>
                          </div>
                          {errors && (
                            <span className="errors_changePassword ">
                              {errors.newPassword}
                            </span>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="mb-2 inputField">
                            <input
                              className={`form-control OutfitFont createpasswordfield ${
                                errors.confirmPassword && !confirmPassword
                                  ? "error-border"
                                  : ""
                              }`}
                              type="password"
                              placeholder=" "
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
                            />
                            <span
                              className={` ${
                                errors.confirmPassword && !confirmPassword
                                  ? "red-placeholder"
                                  : ""
                              }`}
                            >
                              Confirm password
                            </span>
                          </div>
                          {errors && (
                            <span className="errors_changePassword">
                              {errors.confirmPassword}
                            </span>
                          )}
                        </div>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block my-4 py-3 mainSubmitButton OutfitFont"
                          >
                            Change password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ChangePassword