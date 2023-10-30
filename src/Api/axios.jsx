import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://wearher-from-mimi.com/api/",
});

export default axiosInstance;
