import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "http://127.0.0.1:8000",
  baseURL: "https://fast-api-first.vercel.app/",
  withCredentials: true,
});

export default axiosInstance;
