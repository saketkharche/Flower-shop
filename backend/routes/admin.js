// backend/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');

// GET /api/admin/stats - Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalOrders = await Order.countDocuments({});
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$bill" } } }
    ]);

    const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    res.json({
      totalUsers,
      totalOrders,
      pendingOrders,
      revenue
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET latest users
router.get('/latest-users', async (req, res) => {
  const users = await User.find().sort({ date: -1 }).limit(5);
  res.json(users);
});

// GET latest orders
router.get('/latest-orders', async (req, res) => {
  const orders = await Order.find().populate('userId', 'name').sort({ date: -1 }).limit(5);
  res.json(orders);
});

module.exports = router;