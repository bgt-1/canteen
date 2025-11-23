import { useEffect, useState } from "react";
import API from "../api/apiClient.js";
import jsPDF from "jspdf";

const downloadReceipt = (order) => {
  const doc = new jsPDF();

  doc.text("Order Receipt", 20, 20);
  doc.text(`Order ID: ${order.id}`, 20, 40);
  doc.text(`Total: ₹${order.total}`, 20, 55);
  doc.text(`Status: ${order.status}`, 20, 70);
  doc.text(`Date: ${order.created_at}`, 20, 85);

  doc.text("Items:", 20, 110);

  order.items.forEach((item, index) => {
    doc.text(
      `${item.name} x ${item.qty} — ₹${item.price}`,
      20,
      125 + index * 10
    );
  });

  doc.save(`receipt_${order.id}.pdf`);
};



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

          <button
            className="bg-blue-600 text-white px-3 py-1 mt-2"
            onClick={() => downloadReceipt(o)}
          >
            Download Receipt
          </button>
        </div>
      ))}
    </div>
  );
}
