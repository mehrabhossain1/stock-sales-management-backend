const express = require("express");
const router = express.Router();

const {
    createSale,
    getSales,
    getDueSales,
} = require("../controllers/saleController");

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Create sale - admin or manager
router.post("/", verifyToken, authorizeRoles("admin", "manager"), createSale);

// Get sales - admin sees all, manager sees own
router.get("/", verifyToken, authorizeRoles("admin", "manager"), getSales);

// Get due sales - admin or manager
router.get(
    "/dues",
    verifyToken,
    authorizeRoles("admin", "manager"),
    getDueSales
);

module.exports = router;
