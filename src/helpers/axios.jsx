import axios from "axios";
import * as utils from "./utils";

const API_URL = utils.API_URL;

// axios interceptor request to setup token in header
axios.interceptors.request.use(async (config) => {
  config.baseURL = API_URL;
  config.headers.Authorization = utils.API_ACCESS_TOKEN
    ? utils.API_ACCESS_TOKEN
    : "";
  config.headers = {
    ...config.headers,
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Accept-Language": "en",
    "Access-Control-Allow-Origin": "*",
  };
  return config;
});

//axios interceptor response to set auto logout
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      error.response = {
        status: 500,
        data: {
          message: "Network Error | Network Unavailable",
        },
      };
    }
    if (error.response.status === 401) {
      let errMsg = error?.response?.data?.msg
        ? error?.response?.data?.msg
        : error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.response?.data?.error
        ? error?.response?.data?.error
        : "Unauthorized";

      error.response = {
        status: 401,
        data: {
          message: errMsg,
        },
      };
      utils.Reset();
    }
    if (error.response.status === 500) {
      if (!error.response.data || !error.response.data.message) {
        error.response = {
          status: 500,
          data: {
            message: "Something went wrong",
          },
        };
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
