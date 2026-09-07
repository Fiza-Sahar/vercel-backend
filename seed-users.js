// Seed Default Admin & Customer Accounts
require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./utils/db");
const User = require("./models/user-model");

const seedUsers = async () => {
    try {
        await connectDb();
        console.log("Connected to MongoDB...");

        // 1. Create or Update Default Admin
        const adminEmail = "admin@mernstore.com";
        const adminPassword = "AdminPassword123";

        let adminUser = await User.findOne({ email: adminEmail });
        if (adminUser) {
            adminUser.password = adminPassword;
            adminUser.isAdmin = true;
            await adminUser.save();
            console.log("Admin account updated successfully!");
        } else {
            await User.create({
                username: "Administrator",
                email: adminEmail,
                phone: "+1234567890",
                password: adminPassword,
                isAdmin: true,
            });
            console.log("Admin account created successfully!");
        }

        // 2. Create or Update Default Customer
        const userEmail = "user@mernstore.com";
        const userPassword = "UserPassword123";

        let customerUser = await User.findOne({ email: userEmail });
        if (customerUser) {
            customerUser.password = userPassword;
            customerUser.isAdmin = false;
            await customerUser.save();
            console.log("Customer account updated successfully!");
        } else {
            await User.create({
                username: "JohnCustomer",
                email: userEmail,
                phone: "+1987654321",
                password: userPassword,
                isAdmin: false,
            });
            console.log("Customer account created successfully!");
        }

        console.log("\n==========================================");
        console.log("DEFAULT CREDENTIALS CONFIGURED:");
        console.log("==========================================");
        console.log("ADMIN ACCOUNT:");
        console.log("  Email:    admin@mernstore.com");
        console.log("  Password: AdminPassword123");
        console.log("------------------------------------------");
        console.log("CUSTOMER ACCOUNT:");
        console.log("  Email:    user@mernstore.com");
        console.log("  Password: UserPassword123");
        console.log("==========================================\n");

        process.exit(0);
    } catch (error) {
        console.error("User Seeder Error:", error);
        process.exit(1);
    }
};

seedUsers();
