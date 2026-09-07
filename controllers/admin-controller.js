// Admin Controller - Overview statistics and User Management
const User = require("../models/user-model");
const Product = require("../models/product-model");
const Order = require("../models/order-model");

// 1. Get Admin Dashboard Summary Statistics
// GET /api/admin/stats
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Calculate total sales from all non-cancelled orders
        const orders = await Order.find({ orderStatus: { $ne: "Cancelled" } });
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

        // Recent 5 orders
        const recentOrders = await Order.find()
            .populate("user", "username email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                recentOrders,
            },
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({
            success: false,
            message: "Stats fetch karne mein error aaya",
        });
    }
};

// 2. Get All Users (Admin Only)
// GET /api/admin/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({
            success: false,
            message: "Users fetch karne mein error aaya",
        });
    }
};

// 3. Delete User (Admin Only)
// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
    try {
        // Prevent deleting oneself
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "Aap apna account delete nahi kar sakte",
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User nahi mila",
            });
        }

        res.status(200).json({
            success: true,
            message: "User delete ho gaya",
        });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({
            success: false,
            message: "User delete karne mein error aaya",
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser,
};
