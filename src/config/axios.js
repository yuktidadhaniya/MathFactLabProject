import axios from "axios";
import ReactGA from "react-ga";

let axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/v1`,
  timeout: 40000,
});

// request inceptors for taking token
axiosInstance.interceptors.request.use(
  config => {
    config.headers.authorization = `bearer ${localStorage.getItem(
      "user-token",
    ) || sessionStorage.getItem("user-token")}`;

    return config;
  },
  error => Promise.reject(error),
);

// response inceptors for handling response
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      localStorage.removeItem("user-token");
      sessionStorage.removeItem("user-token");
      window.location.href = "/student/login";
    } else {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: API || ${error?.response?.request?.responseURL} `,
        action: `${error?.message} `,
        label: "AXIOS Error || API",
      });
      return Promise.reject(error);
    }
  },
);

export const axiosGIT = axios.create({
  baseURL: `${process.env.GIT_ZERO_TO_CAREER_URL}/api/v4/`,
  timeout: 10000,
});

// request inceptors for taking token
axiosGIT.interceptors.request.use(
  config => {
    config.headers["PRIVATE-TOKEN"] = `${process.env.GIT_PRIVATE_TOKEN}`;
    return config;
  },
  error => Promise.reject(error),
);

export default axiosInstance;
