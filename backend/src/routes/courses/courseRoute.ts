import express from "express";
import type { Request, Response } from "express";
import {
  UdemyScraper,
  CourseraScraper,
  YouTubeScraper,
} from "../../services/scrapping";

const router = express.Router();

const handleScrapeRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { platform, query } = req.query;

  if (!platform || !query) {
    res.status(400).json({ error: "Platform and query are required" });
    return;
  }

  try {
    let data;

    switch (platform as string) {
      case "udemy": {
        const scraper = new UdemyScraper();
        data = await scraper.scrape(query as string);
        break;
      }
      case "coursera": {
        const scraper = new CourseraScraper();
        data = await scraper.scrape(query as string);
        break;
      }
      case "youtube": {
        const scraper = new YouTubeScraper();
        data = await scraper.scrape(query as string);
        break;
      }
      default:
        res.status(400).json({ error: "Unsupported platform" });
        return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

router.get("/scrape", handleScrapeRequest);

export default router;
