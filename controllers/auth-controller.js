const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome Home");
    } catch (error) {
        console.log(error);
    }
};

// Register Logic
const register = async (req, res) => {
    try {

        console.log(req.body);

        const { username, email, phone, password } = req.body;

        // Check Email
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                msg: "Email already exists"
            });
        }
        // Save User
        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

      res.status(201).json({
            message: userCreated,
            token:await userCreated.generateToken(),
            userId:userCreated._id.toString(),

        });
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg: "Internal Server Error"
        });

    }
};

// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {

            return res.status(200).json({
                message: "Login Successful",

                token: await userExist.generateToken(),

                user: {
                    id: userExist._id.toString(),
                    username: userExist.username,
                    email: userExist.email,
                    phone: userExist.phone,
                    isAdmin: userExist.isAdmin
                }
            });

        } else {

            return res.status(401).json({
                message: "Invalid Email or Password"
            });

        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
const getProfile = async (req, res) => {
    try {
        // req.user auth-middleware se database se fetched latest user data hai
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: req.user,
        });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Update User Profile
const updateProfile = async (req, res) => {
    try {
        const { username, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { username, phone },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile update ho gayi hai",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Profile update karne mein error aaya",
        });
    }
};

module.exports = { home, register, login, getProfile, updateProfile };