// JWT verification middleware
// Ye middleware protected routes par token verify karta hai
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    try {
        // Request headers se Authorization header lena (format: "Bearer <token>")
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Unauthorized! Token provide nahi kiya gaya"
            });
        }

        // "Bearer <token>" se token nikalna
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized! JWT token missing hai"
            });
        }

        // Secret key se token verify karna
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Database se latest user details fetch karna (password exclude karke)
        const userData = await User.findById(decoded.userId).select("-password");

        if (!userData) {
            return res.status(401).json({
                message: "User database mein exist nahi karta"
            });
        }

        // Verified user details request object mein attach karna
        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next(); // Next middleware ya controller par jana
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({
            message: "Invalid ya expired token! Dubara login karein"
        });
    }
};

module.exports = authMiddleware;