// Product Router
const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
} = require("../controllers/product-controller");

const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

// Public Routes
router.get("/", getAllProducts);
router.get("/categories/list", getCategories);
router.get("/:id", getSingleProduct);

// Protected Admin-Only Routes
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
