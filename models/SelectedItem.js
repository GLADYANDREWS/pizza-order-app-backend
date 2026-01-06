// Backend/models/SelectedItem.js
import mongoose from "mongoose";

const selectedItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

export default mongoose.model("SelectedItem", selectedItemSchema);
