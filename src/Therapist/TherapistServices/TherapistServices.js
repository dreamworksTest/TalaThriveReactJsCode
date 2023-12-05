import axios from "axios";
import axiosInstance from "../../Interceptors/Interceptors";
 const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const MultipleFormServices = async (formData) => {
    const res = await axiosInstance.post("/users/addAndUpdateTherapist", formData);
  return res;
}

export const AddTherapistSchedule = async (userDetails) => {
  const res = await axiosInstance.post("/users/addTherapistScheduleNew",userDetails);
  return res;
};


//changePassword service 
export const changePasswordService = async (userdetails) => {
  const res = await axiosInstance.post("/users/changePassword", userdetails);
  return res;
};


 //GetAllAppointment Service
export const GetAllAppointmentService = async (status,page,limit) => {
  const res = await axiosInstance.get(`/users/getAllAppointments?status=${status}&page=${page}&limit=${limit}`);
  return res;
};


 //getTherapistDetails Service
export const getTherapistDetailsService = async () => {
  const res = await axiosInstance.get("/users/getTherapistProfileDetails");
  return res;
};

export const getIsProfileCompletedService = async () => {
  const res = await axiosInstance.get("/users/getIsProfileCreated");
  return res;
};
 
 


//UpdateImageService
export const UpdateImageService = async (id,formData) => {
  const res = await axiosInstance.patch(`/users/updateTherapistProfileImage/${id}`,formData);
  return res;
};

//UpdateProfileNameService
export const UpdateProfileNameService = async (id,usesDetails) => {
  const res = await axiosInstance.patch(`/users/updateTherapistName/${id}`,usesDetails);
  return res;
};



export const UpdateTherapistProfileService = async (id,usesDetails) => {
  const res = await axiosInstance.patch(`/users/updateTherapistProfile/${id}`,usesDetails);
  return res;
};


export const UpdateCertificateService = async (formData) => {
  const res = await axiosInstance.post("/users/addAndUpdateCertificate",formData);
  return res;
};

export const UpdateInsuranceService = async (formData) => {
  const res = await axiosInstance.post("/users/addAndUpdateInsurance",formData);
  return res;
};


export const getTherapistStartedVideoService = async (bookAppointmentId) => {
  const res = await axiosInstance.get(`/users/joiningCall/${bookAppointmentId}`);
  return res;
};


export const AddBankDetailsService = async (userDetails) => {
  const res = await axiosInstance.post("/users/addUpdateBankDetails",userDetails);
  return res;
};


export const GetBankDetailsService = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": process.env.REACT_APP_VALID_X_API_KEY,
      },
    };
    const res = await axios.get(`${baseUrl}/users/getBankDetails`, config);
    return res;
  } catch (error) {
    console.error("Error fetching bank details:", error);
    throw error;
  }
};











    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",  
    //   },
    // };