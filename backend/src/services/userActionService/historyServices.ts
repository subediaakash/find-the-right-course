import { prisma } from "../../utils/prisma";
import { Platform, History } from "@prisma/client";

export class HistoryService {
  public static async addToHistory(
    userId: string,
    title: string,
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

    await prisma.history.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title,
        url,
        imageUrl,
        platform,
      },
    });
  }

  public static async clearHistory(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.history.deleteMany({
      where: {
        userId,
      },
    });
  }

  public static async getHistory(userId: string): Promise<History[]> {
    const historyItems = await prisma.history.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return historyItems;
  }

  public static async removeFromHistory(
    userId: string,
    historyId: string
  ): Promise<void> {
    const deleted = await prisma.history.deleteMany({
      where: {
        userId,
        id: historyId,
      },
    });

    if (deleted.count === 0) {
      throw new Error("History item not found");
    }
  }
}
