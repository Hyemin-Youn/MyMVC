import axios from "axios";
import API from "./api";

export const loginUser = (data) => {
  return axios.post("http://localhost:9000/api/auth/login", data);
};

export const getMyInfo = () => {
  return API.get("/auth/me");
};
