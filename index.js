import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import pizzas from "./Pizza.js";
import orderRoutes from "./routes/orderRoutes.js";
import SelectedItem from "./models/SelectedItem.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});

/* ---------- PIZZAS ---------- */
app.get("/api/pizzas", (req, res) => {
  res.json(pizzas);
});

/* ---------- MONGODB ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

/* ---------- SELECTED ITEMS APIs ---------- */

/* SAVE ITEM */
app.post("/api/selected-items", async (req, res) => {
  try {
    const item = new SelectedItem(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL ITEMS */
app.get("/api/selected-items", async (req, res) => {
  try {
    const items = await SelectedItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE ITEM */
app.delete("/api/selected-items/:id", async (req, res) => {
  try {
    await SelectedItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------- ORDERS ---------- */
app.use("/api/orders", orderRoutes);

/* ---------- SERVER ---------- */
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
