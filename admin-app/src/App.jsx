import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";

import Dashboard from "./pages/Dashboard";
import MenuManage from "./pages/MenuManage";
import OrdersManage from "./pages/OrdersManage";
import InventoryManage from "./pages/InventoryManage";

export default function App() {
  return (
    <BrowserRouter>
      <AdminNavbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/menu-manage" element={<MenuManage />} />
          <Route path="/orders-manage" element={<OrdersManage />} />
          <Route path="/inventory-manage" element={<InventoryManage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
