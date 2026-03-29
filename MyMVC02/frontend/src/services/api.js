import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9000/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      alert("인증이 만료되었거나 유효하지 않습니다. 다시 로그인하세요.");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default API;
