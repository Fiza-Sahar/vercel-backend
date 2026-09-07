// Auth Router - Handles user registration, login, and profile
const express = require("express");
const router = express.Router();

const {
    home,
    register,
    login,
    getProfile,
    updateProfile,
} = require("../controllers/auth-controller");

const authMiddleware = require("../middleware/auth-middleware");
const validate = require("../middleware/validate-middleware");

const {
    signupSchema,
    loginSchema,
} = require("../validators/auth-validator");

// Home Route
router.get("/", home);

// Register Route
router.post(
    "/register",
    validate(signupSchema),
    register
);

// Login Route
router.post(
    "/login",
    validate(loginSchema),
    login
);

// Protected Profile Routes
router.get("/profile", authMiddleware, getProfile);
router.get("/user", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;