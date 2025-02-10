import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { BaseScraper } from "./baseScrape";
import { Course } from "./baseScrape";

puppeteer.use(StealthPlugin());

export class UdemyScraper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      this.browser = await puppeteer.launch({
        headless: false,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      this.page = await this.browser.newPage();

      await this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
      );

      await this.page.goto(
        `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`,
        { waitUntil: "networkidle2" }
      );

      await this.page.waitForSelector('div[data-purpose="container"]', {
        timeout: 30000,
      });

      const coursesData = await this.page.evaluate(() => {
        return Array.from(
          document.querySelectorAll('div[data-purpose="container"]')
        ).map((course) => ({
          title: course.querySelector("h3")?.innerText.trim() || null,
          url: course.querySelector("a")?.href || null,
          rating:
            course
              .querySelector(".star-rating--rating-number")
              ?.textContent?.trim() || null,
        }));
      });

      return coursesData.filter((course) => course.title !== null);
    } catch (error) {
      console.error("Scraping error:", error);
      throw error;
    } finally {
      await this.closeBrowser();
    }
  }
}
