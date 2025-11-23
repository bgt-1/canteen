import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Dashboard Stats
router.get("/", async (req, res) => {
  try {
    const [[ordersToday]] = await db.query(
      "SELECT COUNT(*) AS total_today FROM orders WHERE DATE(created_at) = CURDATE()"
    );

    const [[revenueToday]] = await db.query(
      "SELECT SUM(total) AS revenue_today FROM orders WHERE DATE(created_at) = CURDATE()"
    );

    const [[pendingOrders]] = await db.query(
      "SELECT COUNT(*) AS pending_count FROM orders WHERE status = 'pending'"
    );

    const [lowStock] = await db.query(
      "SELECT COUNT(*) AS low_stock FROM inventory WHERE qty < 20"
    );

    res.json({
      total_today: ordersToday.total_today,
      revenue_today: revenueToday.revenue_today || 0,
      pending_orders: pendingOrders.pending_count,
      low_stock: lowStock[0]?.low_stock || 0,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

export default router;
