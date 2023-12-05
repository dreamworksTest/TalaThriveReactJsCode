import axiosInstance from "../../Interceptors/Interceptors";


export const getConsumerDetailsService = async () => {
    const res = await axiosInstance.get("/consumers/getProfileDetails");
    return res;
}

export const consumerMultipleFormServices = async (userDetails) => {
    const res = await axiosInstance.post("/consumers/updateProfileDetails", userDetails);
  return res;
}


export const  uploadConsumerProfileImage = async (formData) => {
  const res = await axiosInstance.post("/consumers/uploadProfileImage",formData);
  return res;
};

export const getConsumerAllAppointmentService = async (status,page,limit) => {
  const res = await axiosInstance.get(`/consumers/getAllAppointments?status=${status}&page=${page}&limit=${limit}`);
  return res;
};


export const getMatchTherapistSlotService = async (id,formattedDate) => {
  const res = await axiosInstance.get(`/consumers/getTherapistsSlots/${id}/${formattedDate}`);
  return res;
};



export const getMatchTherapistservice = async (page,limit) => {
  const res = await axiosInstance.get(`/consumers/getAllTherapists?page=${page}&limit=${limit}`);
  return res;
};



export const bookAppointmentService = async (userDetails) => {
  const res = await axiosInstance.post("/consumers/bookAppointment",userDetails);
  return res;
};


export const  updatePaymentService = async (userDetails) => {
  const res = await axiosInstance.post("/consumers/updatePaymentStatus",userDetails);
  return res;
};


export const  cancelAppointmentService = async (userDetails) => {
  const res = await axiosInstance.put("/consumers/cancelledAppoinment",userDetails);
  return res;
};


export const getStartedVideoService = async (bookAppointmentId) => {
  const res = await axiosInstance.get(`/consumers/joiningCall/${bookAppointmentId}`);
  return res;
};