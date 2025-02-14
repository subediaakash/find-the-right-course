import { Request, Response } from "express";
import {
  UdemyScraper,
  CourseraScraper,
  YouTubeScraper,
} from "../../services/scrapping";

export class ScrapingController {
  private static readonly SUPPORTED_PLATFORMS = [
    "udemy",
    "coursera",
    "youtube",
  ];

  private getScraperInstance(platform: string) {
    switch (platform) {
      case "udemy":
        return new UdemyScraper();
      case "coursera":
        return new CourseraScraper();
      case "youtube":
        return new YouTubeScraper();
      default:
        throw new Error("Unsupported platform");
    }
  }

  private validateRequest(platform: any, query: any): void {
    if (!platform || !query) {
      throw new Error("Platform and query are required");
    }

    if (!ScrapingController.SUPPORTED_PLATFORMS.includes(platform as string)) {
      throw new Error("Unsupported platform");
    }
  }

  public async handleScrapeRequest(req: Request, res: Response): Promise<void> {
    try {
      const { platform, query } = req.query;

      this.validateRequest(platform, query);

      const scraper = this.getScraperInstance(platform as string);
      const data = await scraper.scrape(query as string);

      res.json(data);
    } catch (error) {
      const statusCode =
        error instanceof Error &&
        (error.message.includes("required") ||
          error.message.includes("Unsupported"))
          ? 400
          : 500;

      res.status(statusCode).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
