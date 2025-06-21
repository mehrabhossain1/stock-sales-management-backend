const Sale = require("../models/saleModel");
const Product = require("../models/productModel");

exports.createSale = async (req, res) => {
    const { productId, quantity, paidAmount, customerName } = req.body;

    try {
        // Fetch product
        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({ error: "Product not found" });

        // Check stock
        if (product.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        const pricePerUnit = product.price;
        const totalAmount = pricePerUnit * quantity;
        const dueAmount = totalAmount - paidAmount;

        // Create sale
        const newSale = new Sale({
            product: product._id,
            quantity,
            pricePerUnit,
            totalAmount,
            paidAmount,
            dueAmount,
            customerName,
            soldBy: req.user.id,
        });

        await newSale.save();

        // Update stock
        product.quantity -= quantity;
        await product.save();

        res.status(201).json(newSale);
    } catch (error) {
        console.error("❌ Sale creation failed:", error);
        res.status(500).json({
            error: "Failed to create sale",
            message: error.message,
        });
    }
};

exports.getSales = async (req, res) => {
    try {
        let filter = {};

        // Managers see only their own sales
        if (req.user.role === "manager") {
            filter.soldBy = req.user.id;
        }

        const sales = await Sale.find(filter)
            .populate("product", "name sku price")
            .populate("soldBy", "name role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Sales fetched successfully",
            count: sales.length,
            sales,
        });
    } catch (error) {
        console.error("❌ Failed to fetch sales:", error);
        res.status(500).json({ error: "Failed to fetch sales" });
    }
};

exports.getDueSales = async (req, res) => {
    try {
        let filter = { dueAmount: { $gt: 0 } };

        // Managers see only their own due sales
        if (req.user.role === "manager") {
            filter.soldBy = req.user.id;
        }

        const dueSales = await Sale.find(filter)
            .populate("product", "name sku price")
            .populate("soldBy", "name role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Due sales fetched successfully",
            count: dueSales.length,
            dueSales,
        });
    } catch (error) {
        console.error("❌ Failed to fetch due sales:", error);
        res.status(500).json({ error: "Failed to fetch due sales" });
    }
};
