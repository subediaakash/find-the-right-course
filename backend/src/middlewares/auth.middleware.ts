import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      res.status(500).json({ error: "JWT Secret is not defined" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded || !decoded.userId) {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      res.status(401).json({ error: "Invalid token" });
    } else {
      res.status(500).json({ error: "Authentication failed" });
    }
  }
};
