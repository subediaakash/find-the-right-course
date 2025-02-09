import { BaseScraper } from "./baseScrape";
import { Course } from "./baseScrape";

export class UdemyScrapper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      await this.launchBrowser();

      if (!this.page) {
        throw new Error("Browser page not initialized");
      }

      await this.page.goto(`https://www.udemy.com/courses/search/?q=${query}`);

      const courses = await this.page.$$(".course-list--container--3zXPS");

      const coursesData = await Promise.all(
        courses.map(async (course) => {
          const title = await course.$eval(
            ".udlite-focus-visible-target",
            (el) => el.textContent || ""
          );

          const rating = await course.$eval(
            ".star-rating--rating--3lVe8",
            (el) => el.textContent || ""
          );

          const url = await course.$eval(
            "a",
            (el) => el.getAttribute("href") || ""
          );

          return {
            title,
            rating,
            url,
          };
        })
      );

      return coursesData;
    } catch (error) {
      throw error;
    } finally {
      await this.closeBrowser();
    }
  }
}
