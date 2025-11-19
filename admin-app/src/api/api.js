import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default {
  // MENU
  getMenu: () => API.get("/menu"),
  deleteMenu: (id) => API.delete(`/menu/${id}`),
  addMenu: (data) => API.post("/menu", data),

  // ORDERS
  getOrders: () => API.get("/orders"),
  updateOrder: (id, status) => API.put(`/orders/${id}`, { status }),

  // INVENTORY
  getInventory: () => API.get("/inventory"),
  updateInventory: (id, qty) => API.put(`/inventory/${id}`, { qty }),
};
