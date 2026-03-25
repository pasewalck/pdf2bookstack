import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../helpers/env";

const JWT_SECRET = env.JWT_SECRET;
console.log(JWT_SECRET);
if (!JWT_SECRET) throw new Error("JWT_SECRET must be defined!");

export interface AuthRequest extends Request {
    exp?: number;
    bookId?: number;
}

export const verifyBookstackToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid authorization header" });
        return;
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.bookId = decoded.book_id;
        req.exp = decoded.exp;

        if (!req.bookId) {
            res.status(400).json({ error: "Token missing book_id" });
            return;
        }

        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
        return;
    }
};
