const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        pricePerUnit: {
            type: Number,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paidAmount: {
            type: Number,
            required: true,
        },
        dueAmount: {
            type: Number,
            required: true,
        },
        customerName: {
            type: String,
        },
        soldBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        saleDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);
