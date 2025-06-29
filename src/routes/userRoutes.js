const express = require("express");

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const userModel = require("../models/userModel");

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch profile" });
    }
});

// Admin routes
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({ message: "Admin route accessed" });
});

// Manager routes
router.get(
    "/manager",
    verifyToken,
    authorizeRoles("admin", "manager"),
    (req, res) => {
        res.status(200).json({ message: "Manager route accessed" });
    }
);

// User routes
router.get(
    "/user",
    verifyToken,
    authorizeRoles("admin", "manager", "user"),
    (req, res) => {
        res.status(200).json({ message: "User route accessed" });
    }
);

module.exports = router;
// This file defines the user routes for different roles
// It exports the router which can be used in the main application file
