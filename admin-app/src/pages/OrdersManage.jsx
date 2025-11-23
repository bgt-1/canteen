import { useEffect, useState } from "react";
import API from "../api/adminApi";

export default function OrdersManage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    API.getOrders().then((res) => setOrders(res.data));
  };

  const updateStatus = (id, status) => {
    API.updateOrderStatus(id, status).then(() => {
      fetchOrders();
      alert("Status Updated ✅");
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="p-4 border mb-3">
          <h2 className="font-bold">Order #{o.id}</h2>
          <p>Total: ₹{o.total}</p>

          <select
            className="border p-2"
            defaultValue={o.status}
            onChange={(e) => updateStatus(o.id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}
