// Database Seeder Script - Inserts initial sample products
require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./utils/db");
const Product = require("./models/product-model");

const sampleProducts = [
    {
        title: "Apple iPhone 15 Pro",
        description: "Titanium design, A17 Pro chip, customizable Action button, and a more versatile pro camera system.",
        price: 999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop&q=60",
        stock: 15,
        rating: 4.8,
    },
    {
        title: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading noise cancellation with two processors and 8 microphones for exceptional sound quality.",
        price: 349,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        stock: 25,
        rating: 4.7,
    },
    {
        title: "MacBook Air M2 (13.6-inch)",
        description: "Strikingly thin design, 13.6-inch Liquid Retina display, 8GB Unified Memory, 256GB SSD storage.",
        price: 1099,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60",
        stock: 10,
        rating: 4.9,
    },
    {
        title: "Nike Air Max 270",
        description: "Nike's first lifestyle Air unit delivers style, comfort and 270 degrees of transparent Air cushioning.",
        price: 150,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60",
        stock: 20,
        rating: 4.6,
    },
    {
        title: "Adidas Ultraboost Light",
        description: "Experience epic energy with the lightest Ultraboost ever made, with BOOST midsole and Continental Rubber outsole.",
        price: 180,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&auto=format&fit=crop&q=60",
        stock: 12,
        rating: 4.5,
    },
    {
        title: "Men's Premium Cotton Hoodie",
        description: "Classic relaxed fit hoodie made from heavy-weight organic combed cotton with kangaroo pocket.",
        price: 49,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60",
        stock: 35,
        rating: 4.3,
    },
    {
        title: "Casual Slim-Fit Denim Jacket",
        description: "Timeless trucker-style denim jacket with button-front closure and flap chest pockets.",
        price: 79,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60",
        stock: 18,
        rating: 4.4,
    },
    {
        title: "Fossil Men's Minimalist Leather Watch",
        description: "Slim, clean stainless steel case with genuine brown leather strap and quartz movement.",
        price: 120,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60",
        stock: 14,
        rating: 4.6,
    },
    {
        title: "Ray-Ban Classic Aviator Sunglasses",
        description: "Iconic teardrop shape with crystal polarized green lenses and durable metal frame.",
        price: 165,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60",
        stock: 22,
        rating: 4.7,
    },
];

const seedData = async () => {
    try {
        await connectDb();
        console.log("Connected to database...");

        // Optional: clear existing products or just insert if empty
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(sampleProducts);
            console.log("Sample products inserted successfully!");
        } else {
            console.log(`Database already has ${count} products.`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Seeder Error:", error);
        process.exit(1);
    }
};

seedData();
