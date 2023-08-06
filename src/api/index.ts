import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
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

interface RetryConfig extends AxiosRequestConfig {
  retry: number;
  retryDelay: number;
}

export const globalConfig: RetryConfig = {
  retry: 5,
  retryDelay: 1000
};

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    const { config } = error;

    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
    } else if (error.response.status === 404) {
      toast.error("Route is not a valid route");
      return;
    } else if (error.response.status === 401) {
      toast.error("UnAuthorized");
      setTimeout(() => localStorage.removeItem("accessToken"), 2000);
    } else if (!config || !config.retry) {
      return Promise.reject(error);
    } else {
      config.retry -= 1;
      const delayRetryRequest = new Promise<void>((resolve) => {
        setTimeout(() => {
          if (config.retry === 0) {
            toast.error(
              error.response.data.error ??
                "Failed to log request due to an error on our end"
            );
          }
          resolve();
        }, config.retryDelay || 1000);
      });
      return delayRetryRequest.then(() => axiosInstance(config));
    }
  }
);

export default axiosInstance;
