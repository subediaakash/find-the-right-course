interface YouTubeVideo {
  title: string | null;
  views: string | null;
  likes: string | null;
  url: string | null;
}

import { BaseScraper } from "./baseScrape";

export class YouTubeScraper extends BaseScraper {
  async scrape(query: string): Promise<YouTubeVideo[]> {
    try {
      await this.launchBrowser();
      if (!this.page) {
        throw new Error("Browser page not initialized");
      }

      this.page.on("console", (msg) => console.log("Browser Log:", msg.text()));

      await this.page.setViewport({ width: 1280, height: 800 });

      await this.page.goto(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`,
        { waitUntil: "networkidle0" }
      );

      await this.page.waitForSelector("ytd-video-renderer", { timeout: 10000 });

      for (let i = 0; i < 3; i++) {
        await this.page.evaluate(() => {
          return new Promise((resolve) => {
            window.scrollBy(0, window.innerHeight);
            setTimeout(resolve, 1000);
          });
        });
      }

      const videos = await this.page.evaluate(() => {
        const results: YouTubeVideo[] = [];

        const videoElements = document.querySelectorAll("ytd-video-renderer");
        console.log(`Found ${videoElements.length} video elements`);

        videoElements.forEach((video, index) => {
          const titleElement =
            video.querySelector("#video-title") ||
            video.querySelector("yt-formatted-string.ytd-video-renderer");

          const viewsElement =
            video.querySelector("#metadata-line span:first-child") ||
            video.querySelector("span.ytd-video-meta-block");

          const title = titleElement?.textContent?.trim() || null;
          const views = viewsElement?.textContent?.trim() || null;
          const url =
            (video.querySelector("a#video-title") as HTMLAnchorElement)?.href ||
            (video.querySelector("a.ytd-video-renderer") as HTMLAnchorElement)
              ?.href ||
            null;

          console.log(`Video ${index + 1}:`, { title, views, url });

          if (title || views || url) {
            results.push({ title, views, likes: null, url });
          }
        });

        return results;
      });

      console.log("Scraped videos:", videos.length);

      videos.slice(0, 3).forEach((video, index) => {
        console.log(`Video ${index + 1}:`, video);
      });

      return this.filterAndSortVideos(videos);
    } catch (error) {
      console.error("Scraping error:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to scrape YouTube videos");
    } finally {
      await this.closeBrowser();
    }
  }

  private filterAndSortVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
    const filtered = videos.filter((video) => {
      if (!video.views) return false;
      const views = this.parseViews(video.views);
      const isValid = !isNaN(views) && views > 10000;
      console.log("Filtering video:", {
        views: video.views,
        parsedViews: views,
        isValid,
      });
      return isValid;
    });

    console.log(`Filtered from ${videos.length} to ${filtered.length} videos`);

    return filtered.sort((a, b) => {
      const viewsA = this.parseViews(a.views || "0");
      const viewsB = this.parseViews(b.views || "0");
      return viewsB - viewsA;
    });
  }

  private parseViews(views: string): number {
    try {
      console.log("Parsing views:", views);
      const cleaned = views.replace(/[^0-9.KMBk]/g, "").toUpperCase();
      console.log("Cleaned views:", cleaned);

      if (cleaned.includes("K")) {
        return parseFloat(cleaned) * 1000;
      } else if (cleaned.includes("M")) {
        return parseFloat(cleaned) * 1000000;
      } else if (cleaned.includes("B")) {
        return parseFloat(cleaned) * 1000000000;
      } else {
        return parseFloat(cleaned);
      }
    } catch (error) {
      console.error("Error parsing views:", error);
      return 0;
    }
  }
}
