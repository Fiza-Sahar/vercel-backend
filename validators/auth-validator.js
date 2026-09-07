const { z } = require("zod");

// Register Validation
const signupSchema = z.object({
    username: z
        .string({ error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(255, { message: "Username must not be more than 255 characters" }),

    email: z
        .string({ error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must not be more than 255 characters" }),

    phone: z
        .string({ error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 digits" })
        .max(20, { message: "Phone must not be more than 20 characters" }),

    password: z
        .string({ error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" })
        .max(255, { message: "Password must not be more than 255 characters" }),
});

// Login Validation
const loginSchema = z.object({
    email: z
        .string({ error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string({ error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
});

module.exports = {
    signupSchema,
    loginSchema,
};




