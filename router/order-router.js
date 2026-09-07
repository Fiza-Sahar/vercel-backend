// Order Router
const express = require("express");
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrdersAdmin,
    updateOrderStatusAdmin,
} = require("../controllers/order-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

// Customer Protected Routes
router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);

// Admin Protected Routes (placed before /:id to avoid route collision)
router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrdersAdmin);
router.patch("/admin/:id/status", authMiddleware, adminMiddleware, updateOrderStatusAdmin);

// Single Order Route
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;
