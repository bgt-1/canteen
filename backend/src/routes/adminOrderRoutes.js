import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM orders ORDER BY created_at DESC");

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Orders fetch failed" });
  }
});

// UPDATE order status
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  try {
    await db
      .promise()
      .query("UPDATE orders SET status = ? WHERE id = ?", [
        status,
        req.params.id,
      ]);

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
