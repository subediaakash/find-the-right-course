import express from "express";
import { Router } from "express";
import { ScrapingController } from "../../controllers/course/course.controller";

const router: Router = express.Router();
const baseRoute = "";

const scrapingController = new ScrapingController();
router.get(`${baseRoute}/scrape`, (req, res) =>
  scrapingController.handleScrapeRequest(req, res)
);

export default router;
