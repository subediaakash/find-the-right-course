import { Request, Response } from "express";
import { HistoryService } from "../../services/userActionService/historyServices";
import { z } from "zod";
import { addHistorySchema } from "../../zod/historySchema.zod";

interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

export class HistoryController {
  private sendResponse<T>(
    res: Response,
    status: number,
    response: ApiResponse<T>
  ): void {
    res.status(status).json(response);
  }

  private handleError(res: Response, error: unknown): void {
    console.error("Error in HistoryController:", error);

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
        "History item not found": 404,
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

  async addToHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const validatedData = addHistorySchema.parse(req.body);

      await HistoryService.addToHistory(
        userId,
        validatedData.title,
        validatedData.url,
        validatedData.imageUrl,
        validatedData.platform
      );

      this.sendResponse(res, 201, {
        success: true,
        data: { message: "Added to history successfully" },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async clearHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      await HistoryService.clearHistory(userId);

      this.sendResponse(res, 200, {
        success: true,
        data: { message: "History cleared successfully" },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const history = await HistoryService.getHistory(userId);

      this.sendResponse(res, 200, {
        success: true,
        data: { history },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async removeFromHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.validateUser(req, res);
      if (!userId) return;

      const { historyId } = req.params;

      if (!historyId) {
        this.sendResponse(res, 400, {
          success: false,
          error: "History ID is required",
        });
        return;
      }

      await HistoryService.removeFromHistory(userId, historyId);

      this.sendResponse(res, 200, {
        success: true,
        data: { message: "Removed from history successfully" },
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}
