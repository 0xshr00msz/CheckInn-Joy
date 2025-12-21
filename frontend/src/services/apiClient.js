import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const apiClient = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL,
    timeout: 5000,
});

//request interceptor
AxiosInstance.interceptors.request.use(
  (error) => {
    console.error("Request error ::", error);
    return Promise.reject(error);
  }
);

//response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      console.error("Response error :: ", error.response);
      
      try{
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccesToken}`;
        return await axios(originalRequest);
      }
      catch (refreshError) {
        const navigate = useNavigate(); 
        navigate("/home");

        return await Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;