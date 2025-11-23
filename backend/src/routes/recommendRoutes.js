import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Get top 3 trending items
router.get("/", async (req, res) => {
  try {
    const [items] = await db.query(
      "SELECT * FROM menu_items ORDER BY stock ASC LIMIT 3"
    );

    res.json(items);
  } catch (err) {
    console.log("RECOMMEND ERROR:", err);
    res.status(500).json({ message: "Trending fetch failed" });
  }
});

export default router;
