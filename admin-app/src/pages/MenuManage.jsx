import { useEffect, useState } from "react";
import {
  getMenu,
  addItem,
  deleteItem
} from "../api/adminApi";

export default function MenuManage() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  const fetchMenu = () => {
    getMenu().then((res) => setMenu(res.data));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addMenuItem = () => {
    addItem(newItem).then(() => {
      fetchMenu();
      alert("Menu item added ✅");
    });
  };

  const removeItem = (id) => {
    deleteItem(id).then(() => {
      fetchMenu();
      alert("Deleted ✅");
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>

      <div className="mb-6 flex gap-2">
        <input placeholder="Name" className="border p-2" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
        <input placeholder="Price" className="border p-2" onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
        <input placeholder="Category" className="border p-2" onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
        <input placeholder="Stock" className="border p-2" onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })} />

        <button className="bg-green-600 text-white px-4" onClick={addMenuItem}>
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {menu.map((m) => (
          <div key={m.id} className="p-4 shadow border">
            <h2 className="font-bold">{m.name}</h2>
            <p>₹{m.price}</p>
            <p>{m.category}</p>

            <button
              className="mt-2 bg-red-600 text-white px-3 py-1"
              onClick={() => removeItem(m.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
