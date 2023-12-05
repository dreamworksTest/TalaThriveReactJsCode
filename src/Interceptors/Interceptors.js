import axios from "axios";
// import { toast } from "react-toastify";
import swal from "sweetalert";



// Create a new instance of Axios with default config
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
 
// Add a request interceptor to handle errors globally
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
       config.headers["x-api-key"] = process.env.REACT_APP_VALID_X_API_KEY;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response data
    if (
      response.data.statusCode === 200 || response.data.statusCode === 201 || response.status === 200 || response.status === 201
    ) {
      return response;
    }
  },
  (error) => {
    // Handle errors globally
    if (error.response.data.statusCode === 400) {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});
      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else if (error.response.data.statusCode === 401) {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});

      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else if (error.response.data.statusCode === 403) {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});

      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else if (error.response.data.statusCode === 404) {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});
      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else if (error.response.data.statusCode === 409) {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});
      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      swal({ title: "Wrong Entry", text: error.response.data.message,icon: "warning", button: "Ok",});
      // toast.error(error.response.data.message, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
    // Return a rejected Promise so that calling code can handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
