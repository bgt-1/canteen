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
    const [orders] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    for (let order of orders) {
      const [items] = await db.query(
        `SELECT 
            oi.qty, 
            oi.price, 
            m.name 
         FROM order_items oi
         JOIN menu_items m ON oi.item_id = m.id
         WHERE oi.order_id = ?`,
        [order.id]
      );

      order.items = items;
    }

    res.json(orders);
  } catch (err) {
    console.log("ORDER FETCH ERROR:", err);
    res.status(500).json({ message: "Orders fetch failed" });
  }
});




export default router;
