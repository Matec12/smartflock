import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
    } else if (error.response.status === 404) {
      toast.error("Route is not a valid route");
      return;
    } else if (error.response.status === 401) {
      toast.error("UnAuthorized");
      setTimeout(() => localStorage.removeItem("accessToken"), 2000);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
