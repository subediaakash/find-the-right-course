import { BaseScraper, Course } from "./baseScrape";

export class CourseraScraper extends BaseScraper {
  async scrape(query: string): Promise<Course[]> {
    try {
      await this.launchBrowser();
      if (!this.page) throw new Error("Browser page not initialized");

      // Navigate to Coursera search page
      await this.page.goto(
        `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
        { waitUntil: "networkidle2" }
      );

      // Wait for course cards to load
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
            // Extract title
            const title = await course.$eval(
              ".cds-CommonCard-title",
              (el) => el.textContent?.trim() || null
            );

            // Extract rating
            const rating = await course
              .$eval(
                ".cds-RatingStat-sizeLabel .css-6ecy9b",
                (el) => el.textContent?.trim() || null
              )
              .catch(() => null);

            // Extract URL
            const url = await course.$eval(
              ".cds-CommonCard-titleLink",
              (el) =>
                `https://www.coursera.org${el.getAttribute("href")}` || null
            );

            // Extract image URL
            const imageUrl = await course
              .$eval(".cds-CommonCard-previewImage img", (el) => {
                // Get the src attribute
                const src = el.getAttribute("src");
                if (!src) return null;

                // Remove any URL parameters to get the base image URL
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
            // Return a null course object if any field fails to extract
            return {
              title: null,
              rating: null,
              url: null,
              imageUrl: null,
            } as Course;
          }
        })
      );

      // Filter out any courses with all null values
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
