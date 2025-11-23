import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-4 gap-4">
      <div className="p-4 bg-blue-500 text-white rounded">
        <h2 className="text-xl">Orders Today</h2>
        <p className="text-3xl">{stats.total_today}</p>
      </div>

      <div className="p-4 bg-green-500 text-white rounded">
        <h2 className="text-xl">Revenue Today</h2>
        <p className="text-3xl">₹{stats.revenue_today}</p>
      </div>

      <div className="p-4 bg-yellow-500 text-white rounded">
        <h2 className="text-xl">Pending Orders</h2>
        <p className="text-3xl">{stats.pending_orders}</p>
      </div>

      <div className="p-4 bg-red-500 text-white rounded">
        <h2 className="text-xl">Low Stock Items</h2>
        <p className="text-3xl">{stats.low_stock}</p>
      </div>
    </div>
  );
}
