import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://localhost:44306/" });

export default axiosInstance;
