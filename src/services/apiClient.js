import axios from "axios";

const baseConfig = {
  baseURL: "http://localhost:3001/api",
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
