const Product = require("../models/productModel");

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;

        const query = {
            name: { $regex: search, $options: "i" },
        };

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            message: "Products fetched successfully",
            count: products.length,
            total,
            page: Number(page),
            limit: Number(limit),
            products,
        });
    } catch (err) {
        console.error("Get products failed:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET single product
exports.getSingleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        console.error("Get product failed:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// POST create product
exports.createProduct = async (req, res) => {
    const {
        name,
        sku,
        description,
        price,
        quantity,
        images,
        category,
        brand,
        tags,
        isFeatured,
        isHot,
    } = req.body;

    try {
        const newProduct = new Product({
            name,
            sku,
            description,
            price,
            quantity,
            images,
            category,
            brand,
            tags,
            isFeatured,
            isHot,
            createdBy: req.user.id,
        });

        console.log(newProduct);

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Product creation failed" });
    }
};

// PUT update product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
            new: true,
        });
        res.json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(400).json({ error: "Product update failed" });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: "Product deletion failed" });
    }
};

// Review
// Add this in productController.js for quick testing
exports.addReview = async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res
            .status(400)
            .json({ message: "Rating must be between 1 and 5" });
    }

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = {
            user: req.user.id,
            rating,
            comment,
        };

        product.reviews.push(review);

        await product.save();

        res.status(201).json({
            message: "Review added successfully",
            review,
        });
    } catch (error) {
        console.error("Add review error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /products/:productId/reviews
exports.getReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate(
            "reviews.user",
            "username email"
        ); // Populate user info in reviews (optional)

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Reviews fetched successfully",
            count: product.reviews.length,
            reviews: product.reviews,
        });
    } catch (error) {
        console.error("Get reviews error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
