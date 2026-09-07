// Admin Verification Middleware
// Ye middleware check karta hai ke logged-in user admin hai ya nahi
const adminMiddleware = (req, res, next) => {
    try {
        // req.user authMiddleware se set hota hai
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                message: "Access denied! Sirf admin hi yeh action perform kar sakta hai."
            });
        }
        next(); // Agar admin hai toh request aage proceed karegi
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return res.status(500).json({
            message: "Internal Server Error in Admin Check"
        });
    }
};

module.exports = adminMiddleware;
