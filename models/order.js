import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
