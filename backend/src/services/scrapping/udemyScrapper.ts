import { BaseScraper } from "./baseScrape";
import { Course } from "./baseScrape";

export class UdemyScraper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      await this.launchBrowser();

      if (!this.page) {
        throw new Error("Browser page not initialized");
      }

      await this.page.goto(
        `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`,
        {
          waitUntil: "networkidle0",
        }
      );

      await this.page.waitForSelector(".course-list--container--3zXPS", {
        timeout: 10000,
      });

      const courses = await this.page.$$(
        ".course-list--container--3zXPS .course-card--container--3w8Zm"
      );

      if (courses.length === 0) {
        console.warn("No courses found for query:", query);
      }

      const coursesData = await Promise.all(
        courses.map(async (course) => {
          try {
            const title = await course.$eval(
              ".udlite-focus-visible-target",
              (el) => el.textContent?.trim() || ""
            );

            const rating = await course.$eval(
              ".star-rating--rating--3lVe8",
              (el) => el.textContent?.trim() || ""
            );

            const url = await course.$eval(
              "a",
              (el) => (el as HTMLAnchorElement).href || ""
            );

            return { title, rating, url };
          } catch (error) {
            console.error("Error extracting course details:", error);
            return null;
          }
        })
      );

      return coursesData.filter((course) => course !== null) as Course[];
    } catch (error) {
      console.error("Scraping error:", error);
      throw error;
    } finally {
      await this.closeBrowser();
    }
  }
}
