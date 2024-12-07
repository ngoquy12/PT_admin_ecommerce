import axios from "axios";

const jsonAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

jsonAxios.interceptors.request.use(
  (config) => {
    const token =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudnF1eUBnbWFpbC5jb20iLCJpYXQiOjE3MzM0OTQyMTQsImV4cCI6MTc0MjEzNDIxNH0.3Dhwx9gtW29tP9zKftpudbgEAdGYORWX67l_wwhEGRQ";

    config.headers.Authorization = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default jsonAxios;
