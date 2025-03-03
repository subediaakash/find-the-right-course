import { prisma } from "../../utils/prisma";

import { User } from "@prisma/client";
type SafeUser = Omit<User, "password">;

export class ProfileService {
  public static async getUserProfile(userId: string): Promise<SafeUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public static async updateUserProfile(
    userId: string,
    name: string,
    email: string
  ): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
  }
}
