const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// All routes below require admin access
router.use(verifyToken, authorizeRoles("admin"));

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
