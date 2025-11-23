import { useEffect, useState } from "react";
import {
  getInventory,
  updateInventory
} from "../api/adminApi";

export default function InventoryManage() {
  const [items, setItems] = useState([]);
  const [qtyInputs, setQtyInputs] = useState({});

  const fetchInventory = () => {
    getInventory().then((res) => setItems(res.data));
  };

  const handleChange = (id, value) => {
    setQtyInputs({
      ...qtyInputs,
      [id]: value,
    });
  };

  const handleUpdate = (id) => {
    const qty = qtyInputs[id];

    if (!qty || qty < 0) {
      alert("Enter a valid quantity");
      return;
    }

    updateInventory(id, qty).then(() => {
      fetchInventory();
      alert("Quantity updated ✅");
    });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory</h1>

      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map((i) => (
          <div
            key={i.id}
            className="border p-4 mb-2 flex justify-between items-center"
          >
            <span>
              {i.item_name} — {i.qty}
            </span>

            <div className="flex gap-2">
              <input
                type="number"
                className="border p-1 w-24"
                value={qtyInputs[i.id] || ""}
                onChange={(e) => handleChange(i.id, e.target.value)}
                placeholder="New qty"
              />

              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => handleUpdate(i.id)}
              >
                Update
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
