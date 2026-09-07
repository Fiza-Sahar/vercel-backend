require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const connectDb = require("./utils/db");

// Routers
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const productRouter = require("./router/product-router");
const orderRouter = require("./router/order-router");
const adminRouter = require("./router/admin-router");

const errorMiddleware = require("./middleware/error-middleware");

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Main API Endpoints
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port http://localhost:${PORT}`);
    });
});
