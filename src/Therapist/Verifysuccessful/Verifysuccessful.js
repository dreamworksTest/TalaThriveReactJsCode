 import React from "react";
 import "./Verifysuccessful.css";
 import { Link } from "react-router-dom";

 const Verifysuccessful = () => {
   return (
     <div className="container-fluid chooosePasswordMaincontainer">
       <div className="row chooosePasswordMaincontainerRow">
         <div className="col-md-6 mainLeftSideImage"></div>
         <div className="col-md-6 d-flex mainRightDiv">
           <div className="d-flex align-items-center inputwidthmanage">
             <div className="container passwordchangedcontainer">
               <img src="../../assets/images/passwordChangedImages/success.png" alt="" />
               <br />
               <h2 className="maintitle AthleticsFont">Email Verified Successfully!</h2>
               <p className="mainDescription AthleticsFont">
                 Your email has been verified successfully.
               </p>
               <p className="loginlink AthleticsFont">
                 <Link to="/login"> Continue to Login</Link>
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Verifysuccessful;
