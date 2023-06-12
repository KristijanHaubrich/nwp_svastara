import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});
const apiRequest = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
  return axiosInstance;
};

export default apiRequest