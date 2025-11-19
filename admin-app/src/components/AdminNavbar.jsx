import { NavLink } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex space-x-6">
      <NavLink to="/" className="hover:text-yellow-300">Dashboard</NavLink>
      <NavLink to="/menu-manage" className="hover:text-yellow-300">Menu</NavLink>
      <NavLink to="/orders-manage" className="hover:text-yellow-300">Orders</NavLink>
      <NavLink to="/inventory-manage" className="hover:text-yellow-300">Inventory</NavLink>
    </nav>
  );
}
