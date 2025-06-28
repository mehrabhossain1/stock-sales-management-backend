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

// POST create product
exports.createProduct = async (req, res) => {
    const { name, sku, description, price, quantity } = req.body;

    try {
        const newProduct = new Product({
            name,
            sku,
            description,
            price,
            quantity,
            createdBy: req.user.id, // Assuming req.user is set by auth middleware
            // If you have a user ID in the request, you can use it to set createdBy
        });

        console.log(newProduct);

        const savedProduct = await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
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
