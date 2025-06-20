const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user's role is in the allowed roles
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }

        // If the user is authorized, proceed to the next middleware or route handler
        next();
    };
};

module.exports = authorizeRoles;
// This middleware function will check the user's role against the allowed roles
