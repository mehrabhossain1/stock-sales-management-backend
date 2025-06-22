const express = require("express");
const router = express.Router();

// ✅ Simple health check route
router.get("/ping", (req, res) => {
    res.status(200).json({ message: "Server is alive" });
});

module.exports = router;
