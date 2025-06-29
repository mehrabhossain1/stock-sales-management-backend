const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: String,
    },
    { timestamps: true }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sku: { type: String, unique: true },
        description: String, // can be HTML from a rich text editor
        quantity: { type: Number, required: true },

        // ✅ Price fields
        previousPrice: Number,
        price: { type: Number, required: true },

        // ✅ E-commerce meta
        category: String,
        brand: String,
        tags: [String],
        images: [String],

        // ✅ Flags
        isFeatured: { type: Boolean, default: false },
        isHot: { type: Boolean, default: false },

        // ✅ Reviews
        reviews: [reviewSchema],
        averageRating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },

        // ✅ Creator
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
