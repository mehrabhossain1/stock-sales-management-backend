const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Unauthorized access, token missing" });
        }

        // If token is present, decode it
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Attach user info to request object

            console.log("Token verified successfully: ", req.user, decoded);

            next(); // Proceed to the next middleware or route handler
        } catch (err) {
            res.status(401).json({
                message: "Unauthorized access, invalid token",
                error: err.message,
            });
        }
    } else {
        res.status(401).json({
            message: "Unauthorized access, token not provided",
        });
    }
};

module.exports = verifyToken;
