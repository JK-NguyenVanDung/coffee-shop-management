import axios from "axios";
import { message } from "antd";
import { API_URL } from "./api";
const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => new URLSearchParams({ params }),
});

axiosConfig.interceptors.request.use(async (config) => {
  const customHeaders = {};

  let auth = localStorage.getItem("persist:root");
  let stringParse = JSON.parse(auth);
  const accessToken = JSON.parse(stringParse.auth).token;

  if (accessToken) {
    customHeaders.Authorization = accessToken;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    const { config, data } = error.response;
    console.log({
      baseUrl: config.baseURL,
      url: config.url,
      method: config.method,
      body: config.data && JSON.parse(config.data),
      response: data.error,
      token: config.headers && config.headers.Authorization,
    });
    if (error.response.data.error.message) {
      throw error.response.data.error.message;
    }
    message.error(error.response?.data?.error);
    if (error.response?.status === 401) {
      // localStorage.clear();
    }
    if (error.response?.status === 404) {
      //  localStorage.clear();
    }
    throw error;
  }
);
export default axiosConfig;
