import { useEffect, useState } from "react";
import API from "../api/apiClient.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.map((o) => (
        <div key={o.id} className="p-4 border-b">
          <p>Order #{o.id}</p>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>
          <p>Date: {o.created_at}</p>
        </div>
      ))}
    </div>
  );
}
