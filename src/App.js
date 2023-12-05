import './App.css';
import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Therapist/Loading/Loading";
const GetStarted = lazy(() => import("./Getstarted/Getstarted"));  
const SignupGotEmail = lazy(() => import( './Therapist/SignupGotEmail/SignupGotEmail'));
const AuthenticationForms = lazy(() => import("./Auth/AuthenticationForms/AuthenticationForms")); 
const Login = lazy(() => import("./Auth/Login/Login")); 
const ForgotPassword = lazy(() => import("./Auth/ForgotPassword/ForgotPassword")); 
const ResetPassword = lazy(() => import("./Auth/ResetPassword/ResetPassword")); 
const WelcomePage = lazy(() => import("./Therapist/WelcomePage/WelcomePage"));  
const Logout = lazy(() => import("./Therapist/Logout/Logout")); 
const EmailVerify = lazy(() => import("./Auth/EmailVerify/EmailVerify")); 
const MultiStepForm = lazy(() => import("./Therapist/MultiStepForm/MultiStepForm"));  
// const ChangePassword = lazy(() => import("./Therapist/ChangePassword/ChangePassword"));  
const TherapistAllAppointments = lazy(() => import("./Therapist/TherapistAllAppointments/TherapistAllAppointments"));  
// const TransactionHistory = lazy(() => import("./Therapist/TransactionHistory/TransactionHistory"));  
const Profile = lazy(() => import("./Therapist/Profile/Profile"));  
// const Verifysuccessful = lazy(() => import("./Therapist/Verifysuccessful/Verifysuccessful"));  
const TherapistNewSchedule = lazy(() => import("./Therapist/TherapistMultiEnhanceProfile/TherapistNewSchedule/TherapistNewSchedule")); 
const BankInformation = lazy(() => import("./Therapist/BankInformation/BankInformation")); 
 




const ConsumerSignup = lazy(() => import("./ConsumerAuth/ConsumerSignup/ConsumerSignup"));  
const ConsumerLogin = lazy(() => import("./ConsumerAuth/ConsumerLogin/ConsumerLogin"));  
const ConsumerMainForm = lazy(() => import("./Consumer/ConsumerMainForm/ConsumerMainForm")); 
const ConsumerForgotPassword = lazy(() => import("./ConsumerAuth/ConsumerForgotPassword/ConsumerForgotPassword")); 
const ConsumerResetPassword = lazy(() => import("./ConsumerAuth/ConsumerResetPassword/ConsumerResetPassword")); 
const ConsumerSignupGotEmail = lazy(() => import("./Consumer/Page/ConsumerSignupGotEmail/ConsumerSignupGotEmail")); 
const ConsumerEmailVerify = lazy(() => import("./ConsumerAuth/ConsumerEmailVerify/ConsumerEmailVerify")); 
const ConsumerWelcomePage = lazy(() => import("./Consumer/ConsumerWelcomePage/ConsumerWelcomePage")); 
const ConsumerLogout = lazy(() => import("./Consumer/ConsumerLogout/ConsumerLogout"));  
const ConsumerAllAppointments = lazy(() => import("./Consumer/ConsumerAllAppointments/ConsumerAllAppointments"));   
const PaymentSuccess = lazy(() => import("./Consumer/Stripe/PaymentSuccess/PaymentSuccess"));  
const PaymentFailed = lazy(() => import("./Consumer/Stripe/PaymentFailed/PaymentFailed"));  
const MatchTherapist = lazy(() => import("./Consumer/MatchTherapist/MatchTherapist"));  


function App() {


  return (
    <div>
      <ToastContainer />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<GetStarted />}></Route>

          {/* Therapist routes */}
          <Route path="/signup" element={<AuthenticationForms />}></Route>
          <Route path="/signupGotEmail" element={<SignupGotEmail />}></Route>
          <Route path="/emailVerify/:token" element={<EmailVerify />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route  path="/resetPassword/:id/:token"  element={<ResetPassword />} ></Route>
          <Route path="/onBoard" element={<WelcomePage />}></Route>
          <Route path="/startForm" element={<MultiStepForm />}></Route>
          <Route  path="/allAppointments" element={<TherapistAllAppointments />} ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route  path="/therapistAddSchedule"  element={<TherapistNewSchedule />} ></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/payment" element={<BankInformation />}></Route>
          {/* <Route path="/transactionHistory" element={<TransactionHistory />}></Route> */}
          {/* <Route path="/changePassword" element={<ChangePassword />}></Route> */}
          {/* <Route path="/verifysuccessful" element={<Verifysuccessful />}></Route>   */}

          {/* Consumer routes */}
          <Route path="/consumerSignup" element={<ConsumerSignup />}></Route>
          <Route   path="/consumerSignupGotEmail"  element={<ConsumerSignupGotEmail />}  ></Route>
          <Route   path="/consumer/emailVerify/:token"  element={<ConsumerEmailVerify />} ></Route>
          <Route path="/consumerLogin" element={<ConsumerLogin />}></Route>
          <Route  path="/consumerForgotPassword"  element={<ConsumerForgotPassword />}  ></Route>
          <Route  path="/consumer/resetPassword/:id/:token"  element={<ConsumerResetPassword />}  ></Route>
          <Route path="/onBoardConsumer" element={<ConsumerWelcomePage />} ></Route>
          <Route  path="/consumerMainForm"  element={<ConsumerMainForm />}  ></Route>
          <Route path="/consumerLogout" element={<ConsumerLogout />}></Route>
          <Route path="/consumerAppointment" element={<ConsumerAllAppointments />}></Route>
          <Route path='/consumer/paymentSuccess' element={<PaymentSuccess />}></Route>
          <Route path='/consumer/paymentFailed' element={<PaymentFailed />}></Route>
          <Route path='/matchTherapist' element={<MatchTherapist/>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
 

export default App;
