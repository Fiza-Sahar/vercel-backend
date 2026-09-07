// Order Controller - Handles user orders and admin order management
const Order = require("../models/order-model");

// 1. Create New Order (Protected - Logged in user)
// POST /api/orders
const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart empty hai! Koi item add karein",
            });
        }

        if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.address) {
            return res.status(400).json({
                success: false,
                message: "Shipping address ki details mukammal karein",
            });
        }

        const newOrder = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod: paymentMethod || "Cash on Delivery",
            itemsPrice: Number(itemsPrice),
            shippingPrice: Number(shippingPrice),
            totalPrice: Number(totalPrice),
            orderStatus: "Pending",
        });

        const createdOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order kamyabi se place ho gaya hai",
            order: createdOrder,
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Order place karne mein error aaya",
        });
    }
};

// 2. Get Logged-in User's Orders
// GET /api/orders/my-orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Get My Orders Error:", error);
        res.status(500).json({
            success: false,
            message: "Orders fetch karne mein error aaya",
        });
    }
};

// 3. Get Single Order Details by ID
// GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "username email phone");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order nahi mila",
            });
        }

        // Check if user is owner or admin
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            !req.user.isAdmin
        ) {
            return res.status(403).json({
                success: false,
                message: "Yeh order dekhne ki ijazat nahi hai",
            });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Get Order By ID Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// 4. Get All Orders (Admin Only)
// GET /api/orders/admin/all
const getAllOrdersAdmin = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "username email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error("Admin Get All Orders Error:", error);
        res.status(500).json({
            success: false,
            message: "Admin orders fetch karne mein error aaya",
        });
    }
};

// 5. Update Order Status (Admin Only)
// PATCH /api/orders/admin/:id/status
const updateOrderStatusAdmin = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "New status provide karna zaroori hai",
            });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order nahi mila",
            });
        }

        order.orderStatus = status;
        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            message: `Order status '${status}' par update ho gaya`,
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Update Order Status Error:", error);
        res.status(500).json({
            success: false,
            message: "Status update karne mein error aaya",
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrdersAdmin,
    updateOrderStatusAdmin,
};
