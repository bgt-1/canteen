import express from "express";
import db from "../config/db.js";

const router = express.Router();

// STUDENT LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email = ? AND role = 'student'";

    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ message: "DB Error" });

        if (results.length === 0)
            return res.status(401).json({ message: "Invalid email" });

        const user = results[0];

        if (user.password !== password)
            return res.status(401).json({ message: "Invalid password" });

        res.json({ message: "Login successful", user });
    });
});

export default router;
