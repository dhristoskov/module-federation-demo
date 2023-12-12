import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

dotenv.config();

const validate = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        res.status(401).json({ message: "Not authenticated." });
        return;
    }
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    } catch (err) {
        res.status(500).json({ message: "Server failed, please try again later." });
        return;
    }
    
    const userId = decodedToken.userId;
    
    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        res.status(500).json({ message: "Server failed, please try again later." });
        return;
    }
    
    if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
    }
    
    req.user = user;
    next();
};

export default validate;