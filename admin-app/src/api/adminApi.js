import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});

// MENU
export const getMenu = () => API.get("/menu");
export const addItem = (data) => API.post("/menu", data);
export const deleteItem = (id) => API.delete(`/menu/${id}`);

// ORDERS
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}`, { status });
