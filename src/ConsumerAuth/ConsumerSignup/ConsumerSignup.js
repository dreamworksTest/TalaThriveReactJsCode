import React, {useState } from 'react'
import "./ConsumerSignup.css";
import { Link, useNavigate } from "react-router-dom";
import { signupConsumerValidation } from "../Validations/Validations";
import { signupConsumerService } from "../Services/Services";
 

const ConsumerSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [role] = useState("consumer");
  const navigate = useNavigate();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isAnyInputEmptyOrZero = () => {
    // Check if any input is empty or equal to 0
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !preferredName ||
      termsAndConditions === false
    ) {
      return true;
    }
    return false;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await signupConsumerValidation(
        firstName,
        lastName,
        preferredName,
        email,
        password,
        confirmPassword,
        termsAndConditions
      );
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = {
          firstName:firstName,
          lastName:lastName,
          preferredName:preferredName,
          email:email,
          password:password,
          confirmPassword:confirmPassword,
          role:role,
          termsAndConditions:termsAndConditions,
        };
        const res = await signupConsumerService(userDetails);
          if (res.data) {
            navigate("/consumerSignupGotEmail");
            setFirstName("");
            setLastName("");
            setPreferredName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTermsAndConditions("");
          }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <div className="container-fluid signup2Maincontainer">
    //   <div className="row signup2MaincontainerRow">
    //     {/* <div className="col-md-6 full-height mainSignupLeftSideImage"> */}
    //     <div className="col-md-6  mainSignupLeftSideImage"></div>
    //     {/* <div className="col-md-6 full-height d-flex"> */}
    //     <div className="col-md-6 d-flex mainRightDiv">
    //       <div className="d-flex align-items-center">
    //         <div className="container mainSiteContainer">
    //           <h2 className="AthleticsFont mainHeading">Create your account</h2>
    //           <p className="mainDescription AthleticsFont">
    //             Help our clients thrive and not just survive
    //           </p>
    //           <br />
    //           <button className="btn btn-primary full-width-button py-3 OutfitFont googleButton">
    //             <span>
    //               <img
    //                 src="../assets/images/signupImages/googleimge.png"
    //                 alt="Google Logo"
    //                 width="30"
    //                 height="30"
    //                 className="justify-items-center "
    //               />
    //             </span>
    //             Continue with Google
    //           </button>

    //           <div className="divider OutfitFont">
    //             <span>or continue with email</span>
    //           </div>

    //           <form onSubmit={handleSubmit}>
    //             <div className="row">
    //               <div className="col-md-6 mb-2">
    //                 <div className="mb-2 inputField">
    //                   <input
    //                     className={`form-control AthleticsFont ${
    //                       errors.firstName && !firstName
    //                         ? "error-border red-placeholder"
    //                         : ""
    //                     }`}
    //                     type="text"
    //                     placeholder=""
    //                     value={firstName}
    //                     onChange={(e) => setFirstName(e.target.value)}
    //                   />
    //                   <span
    //                     className={` ${
    //                       errors.firstName && !firstName
    //                         ? "red-placeholder"
    //                         : ""
    //                     }`}
    //                   >
    //                     First name
    //                   </span>
    //                 </div>
    //                 {errors && !firstName && (
    //                   <span className="errors ">{errors.firstName}</span>
    //                 )}
    //               </div>
    //               <div className="col-md-6 mb-2">
    //                 <div className="mb-2 inputField">
    //                   <input
    //                     className={`form-control AthleticsFont ${
    //                       errors.lastName && !lastName ? "error-border" : ""
    //                     }`}
    //                     type="text"
    //                     placeholder=" "
    //                     value={lastName}
    //                     onChange={(e) => setLastName(e.target.value)}
    //                   />
    //                   <span
    //                     className={` ${
    //                       errors.lastName && !lastName ? "red-placeholder" : ""
    //                     }`}
    //                   >
    //                     Last name
    //                   </span>
    //                 </div>
    //                 {errors && !lastName && (
    //                   <span className="errors ">{errors.lastName}</span>
    //                 )}
    //               </div>
    //             </div>
    //             <div className="mb-3">
    //               <div className="mb-2 inputField">
    //                 <input
    //                   className={`form-control AthleticsFont ${
    //                     errors.email && !email ? "error-border" : ""
    //                   }`}
    //                   type="email"
    //                   placeholder=" "
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                 />
    //                 <span
    //                   className={`${
    //                     errors.email && !email ? "red-placeholder" : ""
    //                   }`}
    //                 >
    //                   Email
    //                 </span>
    //               </div>
    //               {errors && <span className="errors ">{errors.email}</span>}
    //             </div>
    //             <div className="mb-3">
    //               <div className="mb-2 inputField password-toggle">
    //                 <input
    //                   className={`form-control AthleticsFont createpasswordfield ${
    //                     errors.password && !password ? "error-border" : ""
    //                   }`}
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder=" "
    //                   id="password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                 <span
    //                   className={` ${
    //                     errors.password && !password ? "red-placeholder" : ""
    //                   }`}
    //                 >
    //                   Create Password
    //                 </span>
    //                 <i
    //                   className={`password-eye far ${
    //                     showPassword ? "fa-eye" : "fa-eye-slash"
    //                   }`}
    //                   onClick={togglePasswordVisibility}
    //                   id="password-eyenew"
    //                 ></i>
    //               </div>
    //               {errors && <span className="errors ">{errors.password}</span>}
    //             </div>
    //             <div className="confirmPasswordUpsideDiv">
    //               <div className="inputField password-toggle">
    //                 <input
    //                   className={`form-control AthleticsFont createpasswordfield ${
    //                     errors.confirmPassword && !confirmPassword
    //                       ? "error-border"
    //                       : ""
    //                   }`}
    //                   type={showConfirmPassword ? "text" : "password"}
    //                   placeholder=" "
    //                   id="confirmpassword"
    //                   value={confirmPassword}
    //                   onChange={(e) => setConfirmPassword(e.target.value)}
    //                 />
    //                 <span
    //                   className={` ${
    //                     errors.confirmPassword && !confirmPassword
    //                       ? "red-placeholder"
    //                       : ""
    //                   }`}
    //                 >
    //                   Confirm Password
    //                 </span>
    //                 <i
    //                   className={`password-eye far ${
    //                     showConfirmPassword ? "fa-eye" : "fa-eye-slash"
    //                   }`}
    //                   onClick={toggleConfirmPasswordVisibility}
    //                   id="password-eyenew"
    //                 ></i>
    //               </div>
    //               {errors && (
    //                 <span className="errors ">{errors.confirmPassword}</span>
    //               )}
    //             </div>
    //             <div className="mt-1 form-check formcheckmargin">
    //               <input
    //                 type="checkbox"
    //                 className={`form-check-input signupTermsCheckBox OutfitFont ${
    //                   errors.termsAndConditions && !termsAndConditions
    //                     ? "error-checkbox"
    //                     : ""
    //                 }`}
    //                 id="termsCheckbox"
    //                 checked={termsAndConditions}
    //                 onChange={(e) => setTermsAndConditions(e.target.checked)}
    //               />
    //               <label
    //                 className="form-check-label OutfitFont"
    //                 htmlFor="termsCheckbox"
    //               >
    //                 I agree to the <Link to="#">terms and conditions</Link> and
    //                 <Link to="#"> privacy policy </Link> and
    //                 <br />I confirm I am above 18 years old
    //               </label>
    //             </div>
    //             <button
    //               type="submit"
    //               disabled={isAnyInputEmptyOrZero()}
    //               className="btn btn-primary full-width-button signupmainButton py-3 OutfitFont onBoardSubmitButton"
    //             >
    //               Sign Up
    //             </button>

    //             <br />
    //             {/* <p className="loginlinkMobile  d-block d-md-none OutfitFont">
    //               Already have an account?<Link to="/login"> Login</Link>
    //             </p> */}
    //           </form>
    //         </div>
    //         {/* <p className="loginlinkDesktop position-absolute top-0 end-0 py-2 px-2 d-none d-md-block OutfitFont">
    //           Already have an account? <Link to="/login">Login</Link>
    //         </p> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container-fluid signup2Maincontainer">
      <div className="row signup2MaincontainerRow">
        {/* <div className="col-md-6 full-height mainSignupLeftSideImage"> */}
        <div className="col-md-6  mainSignupLeftSideImage"></div>
        {/* <div className="col-md-6 full-height d-flex"> */}
        <div className="col-md-6 d-flex mainRightDiv">
          <div className="d-flex align-items-center">
            <div className="container mainSiteContainer">
              <h2 className="AthleticsFont mainHeading">Create your account</h2>
              <p className="mainDescription AthleticsFont">
                Help our clients thrive and not just survive
              </p>
              <br />
              <button className="btn btn-primary full-width-button py-3 OutfitFont googleButton">
                <span>
                  <img
                    src="../assets/images/signupImages/googleimge.png"
                    alt="Google Logo"
                    width="30"
                    height="30"
                    className="justify-items-center "
                  />
                </span>
                Continue with Google
              </button>

              <div className="divider OutfitFont">
                <span>or continue with email</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-2">
                 <div className="mb-2 inputField">
                      <input  className={`form-control AthleticsFont ${  errors.firstName && !firstName  ? "error-border red-placeholder"  : ""  }`}
                        type="text"
                        placeholder=" "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <span
                        className={` ${
                          errors.firstName && !firstName
                            ? "red-placeholder"
                            : ""
                        }`}
                      >
                        First name
                      </span>
                    </div>
                    {errors && !firstName && (
                      <span className="errors ">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="mb-2 inputField">
                      <input
                        className={`form-control AthleticsFont ${
                          errors.lastName && !lastName ? "error-border" : ""
                        }`}
                        type="text"
                        placeholder=" "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <span
                        className={` ${
                          errors.lastName && !lastName ? "red-placeholder" : ""
                        }`}
                      >
                        Last name
                      </span>
                    </div>
                    {errors && !lastName && (
                      <span className="errors ">{errors.lastName}</span>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-2 inputField">
                    <input
                      className={`form-control preferredNameField AthleticsFont ${
                        errors.email && !email ? "error-border" : ""
                      }`}
                      type="text"
                      placeholder=""
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                    />
                    <span>Preferred name</span>
                  </div>
                  {errors && <span className="errors ">{errors.PreferredName}</span>}
                </div>
                <div className="mb-3">
                  <div className="mb-2 inputField">
                    <input
                      className={`form-control AthleticsFont ${
                        errors.email && !email ? "error-border" : ""
                      }`}
                      type="email"
                      placeholder=" "
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span
                      className={`${
                        errors.email && !email ? "red-placeholder" : ""
                      }`}
                    >
                      Email
                    </span>
                  </div>
                  {errors && <span className="errors ">{errors.email}</span>}
                </div>
                <div className="mb-3">
                  <div className="mb-2 inputField password-toggle">
                    <input
                      className={`form-control AthleticsFont createpasswordfield ${
                        errors.password && !password ? "error-border" : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className={` ${
                        errors.password && !password ? "red-placeholder" : ""
                      }`}
                    >
                      Create Password
                    </span>
                    <i
                      className={`password-eye far ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                      id="password-eyenew"
                    ></i>
                  </div>
                  {errors && <span className="errors ">{errors.password}</span>}
                </div>
                <div className="confirmPasswordUpsideDiv">
                  <div className="inputField password-toggle">
                    <input
                      className={`form-control AthleticsFont createpasswordfield ${
                        errors.confirmPassword && !confirmPassword
                          ? "error-border"
                          : ""
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder=" "
                      id="confirmpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      className={` ${
                        errors.confirmPassword && !confirmPassword
                          ? "red-placeholder"
                          : ""
                      }`}
                    >
                      Confirm Password
                    </span>
                    <i
                      className={`password-eye far ${
                        showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={toggleConfirmPasswordVisibility}
                      id="password-eyenew"
                    ></i>
                  </div>
                  {errors && (
                    <span className="errors ">{errors.confirmPassword}</span>
                  )}
                </div>
                <div className="mt-1 form-check formcheckmargin">
                  <input
                    type="checkbox"
                    className={`form-check-input signupTermsCheckBox OutfitFont ${
                      errors.termsAndConditions && !termsAndConditions
                        ? "error-checkbox"
                        : ""
                    }`}
                    id="termsCheckbox"
                    checked={termsAndConditions}
                    onChange={(e) => setTermsAndConditions(e.target.checked)}
                  />
                  <label
                    className="form-check-label OutfitFont"
                    htmlFor="termsCheckbox"
                  >
                    I agree to the <Link to="#">terms and conditions</Link> and
                    <Link to="#"> privacy policy </Link> and
                    <br />I confirm I am above 18 years old
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isAnyInputEmptyOrZero()}
                  className="btn btn-primary full-width-button signupmainButton py-3 OutfitFont onBoardSubmitButton"
                >
                  Sign Up
                </button>

                <br />
                <p className="loginlinkMobile  d-block d-md-none OutfitFont">
                  Already have an account?<Link to="/consumerLogin"> Login</Link>
                </p>
              </form>
            </div>
            <p className="loginlinkDesktop position-absolute top-0 end-0 py-2 px-2 d-none d-md-block OutfitFont">
              Already have an account? <Link to="/consumerLogin">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerSignup;