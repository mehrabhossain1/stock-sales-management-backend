// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sku: { type: String, unique: true },
        description: String,
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }, // stock quantity
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
