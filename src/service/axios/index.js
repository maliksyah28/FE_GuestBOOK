import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:36450" });

export default axiosInstance;
