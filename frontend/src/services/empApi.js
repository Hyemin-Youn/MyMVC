import axios from "axios";

// 1. 비동기 통신을 구현하는 함수를 선언 / 접속하려는 백엔드 및 타 사이트 url 선언
const API = axios.create({
  baseURL: "http://localhost:3001/api"
});

// 2. API 지정된 URL의 rest API를 통해서 값전달, 라우팅을 구현한다. [url, 파라미터]

export const searchEmp = (searchType, keyword) => 
  API.get("/emps/search", {
    params: { [searchType]: keyword }
  });

export const getEmpPage = (page = 1, size = 5) => 
  API.get("/emps/page", {
    params: { page, size }
  });

export const getEmpList = () => API.get("/emps");
export const getEmpById = (empno) => API.get(`/emps/${empno}`);
export const createEmp = (data) => API.post("/emps", data);
export const updateEmp = (empno, data) => API.put(`/emps/${empno}`, data);
export const deleteEmp = (empno) => API.delete(`/emps/${empno}`);

export default API;