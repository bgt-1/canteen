import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass =
    "px-4 py-2 rounded-md text-sm font-medium transition";
  const activeClass = "bg-blue-600 text-white";
  const normalClass = "text-gray-700 hover:bg-blue-200";

  return (
    <nav className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-2xl font-bold text-blue-600">Canteen</h1>

        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => linkClass + " " + (isActive ? activeClass : normalClass)}>Home</NavLink>

          <NavLink to="/menu" className={({ isActive }) => linkClass + " " + (isActive ? activeClass : normalClass)}>Menu</NavLink>

          <NavLink to="/cart" className={({ isActive }) => linkClass + " " + (isActive ? activeClass : normalClass)}>Cart</NavLink>

          <NavLink to="/orders" className={({ isActive }) => linkClass + " " + (isActive ? activeClass : normalClass)}>Orders</NavLink>
        </div>
      </div>
    </nav>
  );
}
