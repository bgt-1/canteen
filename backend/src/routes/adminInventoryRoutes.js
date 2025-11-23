import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET inventory
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM inventory");
    res.json(rows);
  } catch (err) {
    console.log("🔥 REAL MYSQL ERROR --->", err);
    res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  const { qty } = req.body;
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE inventory SET qty = ? WHERE id = ?",
      [qty, id]
    );

    res.json({ message: "Inventory updated ✅" });
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});


export default router;
