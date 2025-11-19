import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([]); // empty cart for now
});

export default router;
