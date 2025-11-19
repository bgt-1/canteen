import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu_items");
    res.json(rows);
  } catch (err) {
    console.log("Menu error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
