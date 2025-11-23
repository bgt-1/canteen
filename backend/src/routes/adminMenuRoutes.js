import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ✅ GET all menu items
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (err) {
    console.log("MENU FETCH ERROR:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// ✅ ADD menu item
router.post("/", async (req, res) => {
  const { name, price, category, stock } = req.body;

  try {
    await db.query(
      "INSERT INTO menu_items (name, price, category, stock) VALUES (?, ?, ?, ?)",
      [name, price, category, stock]
    );

    res.json({ message: "Item added ✅" });
  } catch (err) {
    console.log("MENU INSERT ERROR:", err);
    res.status(500).json({ message: "Insert failed" });
  }
});

// ✅ DELETE menu item
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM menu_items WHERE id = ?", [
      req.params.id,
    ]);

    res.json({ message: "Item deleted ✅" });
  } catch (err) {
    console.log("MENU DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
