const express = require("express");
const dotenv = require("dotenv").config();

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Connect to the database
dbConnect();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
