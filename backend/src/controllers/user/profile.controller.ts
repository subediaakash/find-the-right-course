import { Request, Response } from "express";
import { ProfileService } from "../../services/userActionService/profileService";

interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export class ProfileController {
  private sendResponse<T>(
    res: Response,
    status: number,
    response: ApiResponse<T>
  ): void {
    res.status(status).json(response);
  }

  private handleError(res: Response, error: unknown): void {
    console.error("Error in ProfileController:", error);

    if (error instanceof Error) {
      this.sendResponse(res, 500, {
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

  public async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id || res.locals.user?.userId;

      if (!userId) {
        this.sendResponse(res, 401, {
          success: false,
          error: "Authentication required",
        });
        return;
      }

      const user = await ProfileService.getUserProfile(userId);

      this.sendResponse(res, 200, {
        success: true,
        data: user,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id || res.locals.user?.userId;

      if (!userId) {
        this.sendResponse(res, 401, {
          success: false,
          error: "Authentication required",
        });
        return;
      }

      const { name, email } = req.body;

      if (!name || !email) {
        this.sendResponse(res, 400, {
          success: false,
          error: "Name and email are required",
        });
        return;
      }

      await ProfileService.updateUserProfile(userId, name, email);

      this.sendResponse(res, 200, {
        success: true,
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
