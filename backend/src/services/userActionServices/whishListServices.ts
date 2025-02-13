import { prisma } from "../../utils/prisma";
import { Platform, Wishlist } from "@prisma/client";

export class WishListService {
  public static async addCourseToTheWishlist(
    userId: string,
    title: string,
    description: string,
    url: string,
    imageUrl: string,
    platform: Platform
  ): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: {
        userId,
        title,
        url,
      },
    });

    if (existingWishlistItem) {
      throw new Error("Course is already in wishlist");
    }

    await prisma.wishlist.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title,
        description,
        url,
        imageUrl,
        platform,
      },
    });
  }

  public static async removeCourseFromWishlist(
    userId: string,
    wishlistId: string
  ): Promise<void> {
    const deleted = await prisma.wishlist.deleteMany({
      where: {
        userId,
        id: wishlistId,
      },
    });

    if (deleted.count === 0) {
      throw new Error("Course not found in wishlist");
    }
  }

  public static async getWishlist(userId: string): Promise<Wishlist[]> {
    const wishlistItems = await prisma.wishlist.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return wishlistItems;
  }

  public static async isInWishlist(
    userId: string,
    wishlistId: string
  ): Promise<boolean> {
    const wishlistItem = await prisma.wishlist.findFirst({
      where: {
        userId,
        id: wishlistId,
      },
    });

    return !!wishlistItem;
  }
}
