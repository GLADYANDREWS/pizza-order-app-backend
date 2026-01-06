// import express from "express";
// import Order from "../models/Order.js";

// const router = express.Router();

// router.post("/save-order", async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items provided" });
//     }

//     const newOrder = new Order({ items });
//     await newOrder.save();  

//     res.status(201).json({
//       message: "Order Saved Successfully",
//       order: newOrder
//     });
//   } catch (error) {
//     console.error("Save order error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/all-orders", async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;


// routes/orderRoutes.js



import express from "express";
import Order from "../models/Order.js"; // create Order model

const router = express.Router();

// Save order
router.post("/save-order", async (req, res) => {
  try {
    const order = new Order(req.body); // { items: [...] }
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete order by ID
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
