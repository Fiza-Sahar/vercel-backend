// Admin Router
const express = require("express");
const router = express.Router();

const {
    getDashboardStats,
    getAllUsers,
    deleteUser,
} = require("../controllers/admin-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

// All routes here require login + admin role
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;
