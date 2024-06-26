import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST,
  withCredentials: true,
});

export default baseAPI;
