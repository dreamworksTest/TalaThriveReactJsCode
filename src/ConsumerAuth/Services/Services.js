import axios  from "axios";
import axiosInstance from "../../Interceptors/Interceptors";

 const baseUrl = process.env.REACT_APP_API_BASE_URL; 
 const apiKey = process.env.REACT_APP_VALID_X_API_KEY;
//Signup Auth service 
export const signupConsumerService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/consumer/signup", userdetails);
  return res;
};

export const getConsumerEmailVerifyService = async (token) => {
  const res = await axios.get(`${baseUrl}/auth/consumer/verifyEmail/${token}`, {
    headers: {
      'x-api-key': apiKey,
    }
  });
  return res;
};

// export const getConsumerEmailVerifyService = async (token) => {
//   const res = await axiosInstance.get(`/auth/consumer/verifyEmail/${token}`);
//   return res;
// };



//Login Auth service
export const loginConsumerService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/consumer/login", userdetails);
  return res;
};


//forgot Password Service  
export const forgotPasswordConsumerService = async (userdetails) => {
  const res = await axiosInstance.post("/auth/consumer/forgotPassword", userdetails);
  return res;
};

//reset Password Service
export const resetPasswordConsumerService = async (userdetails, id, token) => {
  const res = await axiosInstance.post(`/auth/consumer/resetPassword/${id}/${token}`, userdetails);
  return res;
};
