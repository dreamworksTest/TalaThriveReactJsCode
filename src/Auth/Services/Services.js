import axios from "axios";
import axiosInstance from "../../Interceptors/Interceptors";
 
 const apiKey = process.env.REACT_APP_VALID_X_API_KEY;
 const baseUrl = process.env.REACT_APP_API_BASE_URL;
 
//Signup Auth service 
export const signupService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/signup", userdetails);
  return res;
};

export const getEmailVerifyService = async (token) => {
  const res = await axios.get(`${baseUrl}/auth/emailVerify/${token}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });
  return res;
};

//Login Auth service
export const loginService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/login", userdetails);
  return res;
};


//forgot Password Service  
export const forgotPasswordService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/forgotPassword", userdetails);
  return res;
};

//reset Password Service
export const resetPasswordService = async (userdetails,id,token) => {
  const res = await axiosInstance.post(`/auth/resetPassword/${id}/${token}`, userdetails);
  return res;
};
