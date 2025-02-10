import { BaseScraper, Course } from "./baseScrape";

export class CourseraScraper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      await this.launchBrowser();
      if (!this.page) throw new Error("Browser page not initialized");

      await this.page.goto(
        `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
        { waitUntil: "networkidle2" }
      );

      await this.page.waitForSelector(".cds-ProductCard-gridCard", {
        timeout: 10000,
      });

      const courses = await this.page.$$(".cds-ProductCard-gridCard");
      console.log(`Found ${courses.length} courses`);

      if (courses.length === 0) {
        throw new Error("No courses found. Selector might be incorrect.");
      }

      const coursesData = await Promise.all(
        courses.map(async (course) => {
          try {
            const title = await course.$eval(
              ".cds-CommonCard-title",
              (el) => el.textContent?.trim() || null
            );

            const rating = await course
              .$eval(
                ".cds-RatingStat-sizeLabel .css-6ecy9b",
                (el) => el.textContent?.trim() || null
              )
              .catch(() => null);

            const url = await course.$eval(
              ".cds-CommonCard-titleLink",
              (el) =>
                `https://www.coursera.org${el.getAttribute("href")}` || null
            );

            const imageUrl = await course
              .$eval(".cds-CommonCard-previewImage img", (el) => {
                const src = el.getAttribute("src");
                if (!src) return null;

                return src.split("?")[0] || null;
              })
              .catch(() => null);

            return {
              title,
              rating,
              url,
              imageUrl,
            } as Course;
          } catch (error) {
            console.error("Error processing course:", error);
            return {
              title: null,
              rating: null,
              url: null,
              imageUrl: null,
            } as Course;
          }
        })
      );

      return coursesData.filter(
        (course) =>
          course.title !== null ||
          course.rating !== null ||
          course.url !== null ||
          course.imageUrl !== null
      );
    } catch (error) {
      console.error("Scraping error:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to scrape Coursera courses");
    } finally {
      await this.closeBrowser();
    }
  }
}
