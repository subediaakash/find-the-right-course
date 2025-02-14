import { Request, Response } from "express";
import { WishListService } from "../../services/userActionService/whishListServices";
import { Platform } from "@prisma/client";
import { z } from "zod";
import { addWishlistSchema } from "../../zod/wishlist.zod";

interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export class WishListController {
  private sendResponse<T>(
    res: Response,
    status: number,
    response: ApiResponse<T>
  ): void {
    res.status(status).json(response);
  }

  private handleError(res: Response, error: unknown): void {
    console.error("Error in WishListController:", error);

    if (error instanceof z.ZodError) {
      this.sendResponse(res, 400, {
        success: false,
        error: error.errors.map((e) => e.message).join(", "),
      });
      return;
    }

    if (error instanceof Error) {
      const errorMap: Record<string, number> = {
        "User not found": 404,
        "Course is already in wishlist": 409,
        "Course not found in wishlist": 404,
      };

      const statusCode = errorMap[error.message] || 500;
      this.sendResponse(res, statusCode, {
        success: false,
        error: error.message,
      });
      return;
    }

    this.sendResponse(res, 500, {
      success: false,
      error: "An unexpected error occurred",
    });
  }

  private validateUser(req: Request, res: Response): string | false {
    const userId = req.user?.id || res.locals.user?.userId;

    if (!userId) {
      this.sendResponse(res, 401, {
        success: false,
        error: "Authentication required",
      });
      return false;
    }

    return userId;
  }

  async addCourseToTheWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const validatedData = addWishlistSchema.parse(req.body);

      await WishListService.addCourseToTheWishlist(
        userId,
        validatedData.title,
        validatedData.url,
        validatedData.imageUrl,
        validatedData.platform
      );

      this.sendResponse(res, 201, {
        success: true,
        data: { message: "Course added to wishlist successfully" },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async removeCourseFromWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const { wishlistId } = req.params;

      if (!wishlistId) {
        this.sendResponse(res, 400, {
          success: false,
          error: "Wishlist ID is required",
        });
        return;
      }

      await WishListService.removeCourseFromWishlist(userId, wishlistId);

      this.sendResponse(res, 200, {
        success: true,
        data: { message: "Course removed from wishlist successfully" },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const wishlist = await WishListService.getWishlist(userId);

      this.sendResponse(res, 200, {
        success: true,
        data: { wishlist },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async isInWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const { wishlistId } = req.params;

      if (!wishlistId) {
        this.sendResponse(res, 400, {
          success: false,
          error: "Wishlist ID is required",
        });
        return;
      }

      const isInWishlist = await WishListService.isInWishlist(
        userId,
        wishlistId
      );

      this.sendResponse(res, 200, {
        success: true,
        data: { isInWishlist },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
