import express from "express";
import { ScrapingController } from "../../controllers/course/course.controller";
import { verifyToken } from "../../middlewares/auth.middleware";
import { Router } from "express";

const courseRouter = Router();
const baseRoute = "";

courseRouter.use(verifyToken);

const scrapingController = new ScrapingController();
courseRouter.get(`${baseRoute}/scrape`, (req, res) =>
  scrapingController.handleScrapeRequest(req, res)
);

export default courseRouter;
