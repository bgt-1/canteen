import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
});


//  MENU
export const getMenu = () => API.get("/menu");
export const addItem = (data) => API.post("/menu", data);
export const deleteItem = (id) => API.delete(`/menu/${id}`);


// ORDERS
export const getOrders = () => API.get("/orders");
export const updateOrderStatus = (id, status) =>
  API.put(`/orders/${id}`, { status });

// ✅ INVENTORY
export const getInventory = () => API.get("/inventory");
export const updateInventory = (id, qty) =>
  API.put(`/inventory/${id}`, { qty });

export default {
  getMenu,
  addItem,
  deleteItem,
  getOrders,
  updateOrderStatus,
  getInventory,
  updateInventory,
};
