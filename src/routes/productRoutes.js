const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    addReview,
    getReviews,
} = require("../controllers/productController");

const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// All routes below require admin access
// router.use(verifyToken, authorizeRoles("admin"));

router.get(
    "/",
    // verifyToken,
    // authorizeRoles("admin", "manager"),
    getAllProducts
);
router.get("/:id", getSingleProduct);

router.post("/", verifyToken, authorizeRoles("admin"), createProduct);
router.put("/:id", verifyToken, authorizeRoles("admin"), updateProduct);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteProduct);

router.post("/:productId/reviews", verifyToken, addReview);
router.get("/:productId/reviews", getReviews);

module.exports = router;
