import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        // Ensure the cookie is present
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No token provided" });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Unauthorized - Invalid token" });
        }

        // Find the user in the database
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password field
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the user to the request object
        req.user = user;

        // Call the next middleware
        next();
    } catch (error) {
        console.error("Error in protection middleware:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;
