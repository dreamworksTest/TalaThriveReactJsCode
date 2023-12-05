import React, {useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConsumerLogout = () => {
    const navigate = useNavigate();
    
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("id");
    localStorage.removeItem("isProfileCompleted");
    navigate("/consumerLogin");
  },[navigate]);
  return <div>Logout</div>;
};

export default ConsumerLogout;
