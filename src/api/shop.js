import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 상품 목록 조회 GET /{type}
export const getItems = async (type = "clothes", params = {}) => {
  const res = await api.get(`/${type}`, { params });
  return Array.isArray(res.data) ? res.data : [];
};

// 특정 상품 조회 GET /{type}/{id}
export const getItemById = async (type = "clothes", id) => {
  const res = await api.get(`/${type}/${id}`);
  return res.data;
};

// 상품 등록 POST /{type}
export const createItem = async (type = "clothes", body) => {
  const res = await api.post(`/${type}`, body);
  return res.data;
};

// 상품 전체 수정 PUT /{type}/{id}
export const updateItem = async (type = "clothes", id, body) => {
  const res = await api.put(`/${type}/${id}`, body);
  return res.data;
};

// 상품 삭제 DELETE /{type}/{id}
export const deleteItem = async (type = "clothes", id) => {
  const res = await api.delete(`/${type}/${id}`);
  return res.data;
};