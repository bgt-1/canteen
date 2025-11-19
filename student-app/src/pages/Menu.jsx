import { useEffect, useState } from "react";
import API from "../api/apiClient.js";
import { useCart } from "../context/CartContext.jsx";

export default function Menu() {
  const { addToCart } = useCart();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    API.get("/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log("Menu error:", err));
  }, []);

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {menu.map((item) => (
        <div key={item.id} className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p className="text-gray-500">{item.category}</p>
          <p className="font-bold">₹{item.price}</p>

          <button
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
