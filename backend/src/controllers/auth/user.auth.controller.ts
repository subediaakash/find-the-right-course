import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "@prisma/client";
import { UserSchema } from "../../zod/user.zod";
import { prisma } from "../../utils/prisma";

export class UserAuthController {
  async signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body as User;

    if (!UserSchema.safeParse({ name, email, password })) {
      res.status(400).json({ error: "Invalid user data" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const user = await prisma.user.create({ data: { name, email, password } });

    const token = sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || "your-default-secret",
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "User created successfully",
      data: {
        name: user.name,
        email: user.email,
      },
      token,
    });
    return;
  }
}
