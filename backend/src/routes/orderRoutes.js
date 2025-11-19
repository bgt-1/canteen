import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;

    const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

    // Insert into orders
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)",
      [1, total, "pending"]
    );

    const orderId = orderResult.insertId;

    // Insert items
    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, item_id, qty, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.qty, item.price]
      );
    }

    res.json({ message: "Order placed", orderId });
  } catch (err) {
    console.log("Order error:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, total, status, created_at FROM orders ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;
