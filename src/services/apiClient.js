import axios from "axios";

const baseConfig = {
  baseURL: "https://api-360feedback-aa3c087647eb.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create(baseConfig);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network Error: ", error);
    }
    return Promise.reject(error);
  }
);

export const apiClientWithToken = axios.create(baseConfig);

apiClientWithToken.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClientWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network Error: ", error);
    }
    return Promise.reject(error);
  }
);
