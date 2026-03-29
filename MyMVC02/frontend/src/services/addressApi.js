import API from "./api";

export const getAddressList = () => API.get("/address");
export const createAddress = (data) => API.post("/address", data);
export const updateAddress = (id, data) => API.put(`/address/${id}`, data);
export const deleteAddress = (id) => API.delete(`/address/${id}`);
