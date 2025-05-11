const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Feedback = require("../models/Feedback"); // if you haven't created one, you'll need to
const fetchuser = require("../middleware/fetchuser");

// Admin-only middleware (extend this to check for admin)
const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

// Get all orders
router.get("/orders", fetchuser, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get all feedback
router.get("/feedbacks", fetchuser, adminOnly, async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
