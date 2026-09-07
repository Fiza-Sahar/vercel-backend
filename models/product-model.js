// Product Model - MongoDB Schema for E-Commerce Products
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Product ka title zaroori hai"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product ki description zaroori hai"],
        },
        price: {
            type: Number,
            required: [true, "Product ka price zaroori hai"],
            min: [0, "Price 0 se kam nahi ho sakti"],
        },
        category: {
            type: String,
            required: [true, "Category zaroori hai (e.g. Electronics, Clothing, Footwear)"],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Product image URL zaroori hai"],
            default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
        },
        stock: {
            type: Number,
            required: [true, "Stock count zaroori hai"],
            default: 10,
            min: [0, "Stock 0 se kam nahi ho sakta"],
        },
        rating: {
            type: Number,
            default: 4.5,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt & updatedAt
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
