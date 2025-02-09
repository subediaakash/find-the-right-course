import { BaseScraper, Course } from "./baseScrape";
export class CourseeraScrapper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      await this.launchBrowser();

      if (!this.page) {
        throw new Error("Browser page not initialized");
      }

      await this.page.goto(
        `https://www.coursera.org/search?query=${encodeURIComponent(query)}`
      );

      await this.page.waitForSelector(".ais-InfiniteHits-item", {
        timeout: 5000,
      });

      const courses = await this.page.$$(".ais-InfiniteHits-item");

      const coursesData = await Promise.all(
        courses.map(async (course) => {
          try {
            const title = await course.$eval(
              ".color-primary-text.card-title.headline-1-text",
              (el) => el.textContent || ""
            );

            const rating = await course.$eval(
              ".ratings-text",
              (el) => el.textContent || ""
            );

            const url = await course.$eval(
              "a",
              (el) => el.getAttribute("href") || ""
            );

            return {
              title: title as string,
              rating: rating as string,
              url: url.startsWith("http")
                ? url
                : `https://www.coursera.org${url}`,
            } as Course;
          } catch (error) {
            console.error("Error processing course:", error);
            return null;
          }
        })
      );

      return coursesData.filter((course): course is Course => course !== null);
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to scrape Coursera courses");
    } finally {
      await this.closeBrowser();
    }
  }
}
