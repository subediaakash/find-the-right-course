import { Request, Response } from "express";
import { WishListService } from "../../services/userActionServices/whishListServices";
import { Platform } from "@prisma/client";

export class UserActionsController {
  async addCourseToTheWishlist(req: Request, res: Response): Promise<void> {
    const { title, description, url, imageUrl, platform } = req.body;
    const { userId } = res.locals.user;

    if (!title || !description || !url || !imageUrl || !platform) {
      res.status(400).json({
        error: "Title, description, URL, image URL, and platform are required",
      });
      return;
    }

    if (!Object.values(Platform).includes(platform)) {
      res.status(400).json({
        error: "Invalid platform. Must be one of: UDEMY, YOUTUBE, COURSERA",
      });
      return;
    }

    try {
      await WishListService.addCourseToTheWishlist(
        userId,
        title,
        description,
        url,
        imageUrl,
        platform as Platform
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async removeCourseFromWishlist(req: Request, res: Response): Promise<void> {
    const { wishlistId } = req.params;
    const { userId } = res.locals.user;

    if (!wishlistId) {
      res.status(400).json({ error: "Wishlist ID is required" });
      return;
    }

    try {
      await WishListService.removeCourseFromWishlist(userId, wishlistId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getWishlist(req: Request, res: Response): Promise<void> {
    const { userId } = res.locals.user;

    try {
      const wishlist = await WishListService.getWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async isInWishlist(req: Request, res: Response): Promise<void> {
    const { wishlistId } = req.params;
    const { userId } = res.locals.user;

    if (!wishlistId) {
      res.status(400).json({ error: "Wishlist ID is required" });
      return;
    }

    try {
      const isInWishlist = await WishListService.isInWishlist(
        userId,
        wishlistId
      );
      res.json({ isInWishlist });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
