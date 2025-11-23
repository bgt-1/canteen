import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";





// for admin 

import adminMenuRoutes from "./routes/adminMenuRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminInventoryRoutes from "./routes/adminInventoryRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());
// for User
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);


// for admin 


app.use("/api/admin/menu", adminMenuRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/inventory", adminInventoryRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);


app.get("/", (req, res) => res.send("Backend running"));

app.listen(process.env.PORT, () =>
  console.log("🚀 Backend running on PORT " + process.env.PORT)
);
