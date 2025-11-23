import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (err) {
    console.log("ORDER FETCH ERROR:", err);
    res.status(500).json({ message: "Orders fetch failed" });
  }
});

// UPDATE order status
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({ message: "Status updated ✅" });
  } catch (err) {
    console.log("ORDER UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
