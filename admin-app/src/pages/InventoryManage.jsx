import { useEffect, useState } from "react";
import API from "../api/api";

export default function InventoryManage() {
  const [items, setItems] = useState([]);

  const fetchInventory = () => {
    API.getInventory().then((res) => setItems(res.data));
  };

  const updateQty = (id, qty) => {
    API.updateInventory(id, qty).then(() => {
      fetchInventory();
      alert("Updated!");
    });
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Inventory</h1>

      {items.map((i) => (
        <div key={i.id} className="border p-4 mb-2 flex justify-between">
          <span>{i.item_name} — {i.qty}</span>

          <input
            type="number"
            className="border p-1 w-20"
            onChange={(e) => updateQty(i.id, e.target.value)}
            placeholder="Update qty"
          />
        </div>
      ))}
    </div>
  );
}
