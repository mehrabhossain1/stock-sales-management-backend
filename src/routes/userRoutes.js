const express = require("express");

const router = express.Router();

// Admin routes
router.get("/admin", (req, res) => {
    res.status(200).json({ message: "Admin route accessed" });
});

// Manager routes
router.get("/manager", (req, res) => {
    res.status(200).json({ message: "Manager route accessed" });
});

// User routes
router.get("/user", (req, res) => {
    res.status(200).json({ message: "User route accessed" });
});

module.exports = router;
// This file defines the user routes for different roles
// It exports the router which can be used in the main application file
