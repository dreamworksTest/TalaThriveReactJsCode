import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginValidation } from "../Validations/Validations";
import { loginService } from "../Services/Services";
// import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  const handleEmailChange = (e) => {
      const selectedEmail = e.target.value;
      setEmail(selectedEmail);
    };

  const handlePasswordChange = (e) => {
      const selectedPassword = e.target.value;
      setPassword(selectedPassword);
    };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = await loginValidation(
        email,
        password,
      );
      setErrors(validate);
      if (Object.keys(validate).length === 0) {
        const userDetails = {  
          email,
          password,
        };
        const res = await loginService(userDetails);
      
        const { token, user } = res.data;
        if (user.role === "coach" || user.role === "therapist") {
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            localStorage.setItem("role", user.role);
            localStorage.setItem("id", user.id);
            localStorage.setItem("firstName", user.firstName);
            localStorage.setItem("lastName", user.lastName);
            navigate("/onBoard");
           
          }
      }
    } catch (err) {
      console.log(err);
    }
  };
    
 useEffect(() => {
   const role = localStorage.getItem("role");
   if (role === "coach" || role === "therapist") {
     navigate("/onBoard");
   }
 }, [navigate]);
 
  
  const isNextDisabled = () => {
    if (!password || !email) {
      return true;
    }
    return false;
  }
    
    
    
  return (
    <div className="container-fluid loginMaincontainer">
      <div className="row loginMaincontainerRow">
        <div className="col-md-6 mainLoginLeftSideImage"></div>
        <div className="col-md-6  d-flex mainRightDiv">
          <div className="d-flex align-items-center logininputwidthmanage">
            <div className="container mainSiteContainer">
              <h2 className="AthleticsFont mainHeading">Welcome back!</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    className={`form-control AthleticsFont loginInput loginInput1 ${
                      errors.email && !email
                        ? "error-border red-placeholder"
                        : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="logininput2Div">
                  <div className=" password-toggle">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control AthleticsFont loginInput loginInput2 ${
                        errors.password && !password
                          ? "error-border red-placeholder"
                          : ""
                      }`}
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <i
                      className={`password-eye far ${
                        showPassword ? "fa-eye" : "fa-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                      id="password-eyenew"
                    ></i>
                  </div>
                </div>
                <div>
                  <Link
                    className="forgotpasswordlink AthleticsFont"
                    to="/forgotPassword"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isNextDisabled()}
                  className="btn btn-primary full-width-button loginmainButton py-3 AthleticsFont onBoardSubmitButton"
                >
                  Log in
                </button>
              </form>
              <div className="divider AthleticsFont">
                <span>or continue with social</span>
              </div>
              <button className="btn btn-primary full-width-button py-3 OutfitFont googleButton">
                <span>
                  <img
                    src="../assets/images/loginImages/googleimge.png"
                    alt="Google"
                    width="24"
                    height="24"
                  />
                </span>
                Continue with Google
              </button>
              <br />
              <p className="loginlinkMobile  d-block d-md-none AthleticsFont">
                Don’t have an account yet? <Link to="/signup">Sign up now</Link>
              </p>
            </div>
            <p className="loginlinkDesktop position-absolute top-0 end-0 py-2 px-2 d-none d-md-block AthleticsFont">
              Don’t have an account yet? <Link to="/signup">Sign up now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
