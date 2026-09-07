// Utility script to create or promote an admin user in MongoDB
require("dotenv").config();
const connectDb = require("./utils/db");
const User = require("./models/user-model");

const makeAdmin = async () => {
    try {
        await connectDb();
        console.log("Connected to MongoDB...");

        const emailArg = process.argv[2];

        if (emailArg) {
            const user = await User.findOne({ email: emailArg.toLowerCase() });
            if (!user) {
                console.log(`User with email "${emailArg}" not found in database.`);
                console.log("Please register this email first through the website, then run this command again.");
                process.exit(1);
            }

            user.isAdmin = true;
            await user.save();
            console.log(`✅ Success! User "${user.username}" (${user.email}) is now an ADMIN!`);
            console.log("You can now login on the website to access the Admin Panel.");
            process.exit(0);
        } else {
            // Find the first registered user or list users
            const users = await User.find({}).select("-password");
            if (users.length === 0) {
                console.log("No users found in database. Register a user on the website first (http://localhost:5173/register) and run:");
                console.log("node make-admin.js your-email@example.com");
            } else {
                console.log(`Found ${users.length} user(s) in database:`);
                users.forEach((u, i) => {
                    console.log(`${i + 1}. ${u.username} (${u.email}) - isAdmin: ${u.isAdmin}`);
                });
                console.log("\nTo promote a user to admin, run:");
                console.log(`node make-admin.js <email>`);
                console.log(`Example: node make-admin.js ${users[0].email}`);
            }
            process.exit(0);
        }
    } catch (err) {
        console.error("Make Admin Error:", err);
        process.exit(1);
    }
};

makeAdmin();
