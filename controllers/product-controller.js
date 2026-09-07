// Product Controller - Handles all product operations
const Product = require("../models/product-model");

// 1. Get All Products (With Search, Category Filter, and Sorting)
// GET /api/products
const getAllProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;

        // Query filter object
        let queryObj = {};

        // Search by keyword in title or description
        if (search && search.trim() !== "") {
            queryObj.$or = [
                { title: { $regex: search.trim(), $options: "i" } },
                { description: { $regex: search.trim(), $options: "i" } },
            ];
        }

        // Filter by Category
        if (category && category !== "All") {
            queryObj.category = category;
        }

        let query = Product.find(queryObj);

        // Sorting
        if (sort === "price-asc") {
            query = query.sort({ price: 1 }); // Low to High
        } else if (sort === "price-desc") {
            query = query.sort({ price: -1 }); // High to Low
        } else if (sort === "rating") {
            query = query.sort({ rating: -1 });
        } else {
            query = query.sort({ createdAt: -1 }); // Default: Newest first
        }

        const products = await query;

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error("Get All Products Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error! Products fetch nahi ho sake",
        });
    }
};

// 2. Get Single Product by ID
// GET /api/products/:id
const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product nahi mila",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("Get Single Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Invalid Product ID ya Server Error",
        });
    }
};

// 3. Create Product (Admin Only)
// POST /api/products
const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, image, stock } = req.body;

        if (!title || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description, price aur category zaroori hain",
            });
        }

        const newProduct = await Product.create({
            title,
            description,
            price: Number(price),
            category,
            image: image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
            stock: stock ? Number(stock) : 10,
        });

        res.status(201).json({
            success: true,
            message: "Product kamyabi se add ho gaya",
            product: newProduct,
        });
    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Product add karne mein error aaya",
        });
    }
};

// 4. Update Product (Admin Only)
// PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product nahi mila update karne ke liye",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product update ho gaya",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Product update karne mein error aaya",
        });
    }
};

// 5. Delete Product (Admin Only)
// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product nahi mila delete karne ke liye",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product kamyabi se delete ho gaya",
        });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Product delete karne mein error aaya",
        });
    }
};

// 6. Get Distinct Product Categories
// GET /api/products/categories/list
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.status(200).json({
            success: true,
            categories: ["All", ...categories],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Categories fetch nahi ho sakin",
        });
    }
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
};
