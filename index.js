import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(
  cors({
    origin: [
      "http://localhost:5173",                // for local testing
      "https://e-commerce-frontend-768f.onrender.com" // replace with your actual frontend domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ===== Database Connection =====
connectDB();

// ===== Root Test Route =====
app.get("/", (req, res) => {
  res.send("✅ E-commerce Backend is running successfully...");
});

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
