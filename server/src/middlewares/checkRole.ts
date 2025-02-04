import { Request, Response, NextFunction } from "express";
import axios from "axios";
import UserModel from "../models/user.model.js";

// Custom request type to include user details
interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// Middleware to authenticate users with GitHub OAuth token
export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("Headers received:", req.headers);
  console.log("Cookies received:", req.cookies);  
  try {
    const token = req.cookies.access_token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Authentication token missing" });
    }
    
    // Fetch user from DB based on GitHub user ID (you might store GitHub user ID in your DB)
    const user = await UserModel.findOne({ accessToken : token});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user info to request
    req.user = { id: (user._id as string).toString(), role: user.role };
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

// Middleware to authorize only admins
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden - Admin access required" });
  }
  next();
};
