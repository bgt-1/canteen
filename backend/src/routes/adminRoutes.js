import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ADMIN LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND role = 'admin'";

    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        if (results.length === 0)
            return res.status(401).json({ message: "Invalid admin email" });

        const admin = results[0];

        if (admin.password !== password)
            return res.status(401).json({ message: "Wrong password" });

        res.json({ message: "Admin login successful", admin });
    });
});

export default router;
