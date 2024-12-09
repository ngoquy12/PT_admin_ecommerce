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
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJudnF1eUBnbWFpbC5jb20iLCJpYXQiOjE3MzM3NDYyOTksImV4cCI6MTc0MjM4NjI5OX0.9zI84sfvU-FrYBTHd4NpCpqyVkYEpTdXyGQQsVBm8D0";

    config.headers.Authorization = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default jsonAxios;
