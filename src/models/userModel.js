// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["super-admin", "admin", "manager", "vendor", "user"],
            default: "user",
        },

        // ✅ Extended fields for My Profile
        fullName: String,
        phone: String,
        address: String,
        avatar: String, // store image URL
        bio: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
