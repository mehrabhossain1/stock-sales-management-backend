const Product = require("../models/productModel");

// GET all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({
            message: "Products fetched successfully",
            count: products.length,
            products,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
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
