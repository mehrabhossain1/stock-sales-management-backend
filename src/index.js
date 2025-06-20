const express = require("express");
const dotenv = require("dotenv").config();

const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");

// Connect to the database
dbConnect();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
