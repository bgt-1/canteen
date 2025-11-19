import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET inventory
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM inventory");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Inventory error" });
  }
});

// UPDATE item quantity
router.put("/", async (req, res) => {
  const { item_name, qty } = req.body;

  try {
    await db
      .promise()
      .query("UPDATE inventory SET qty = ? WHERE item_name = ?", [
        qty,
        item_name,
      ]);

    res.json({ message: "Inventory updated" });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;
