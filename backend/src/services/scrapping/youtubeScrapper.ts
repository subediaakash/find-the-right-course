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

      await this.page.goto(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          query
        )}`
      );

      const videos = await this.page.evaluate(() => {
        const results: YouTubeVideo[] = [];

        document.querySelectorAll("ytd-video-renderer").forEach((video) => {
          const title =
            video.querySelector("#video-title")?.textContent?.trim() || null;
          const views =
            video
              .querySelector(".inline-metadata-item:last-child")
              ?.textContent?.trim() || null;
          const likes =
            video
              .querySelector("#menu #top-level-buttons yt-formatted-string")
              ?.textContent?.trim() || null;
          const url =
            (video.querySelector("#video-title") as HTMLAnchorElement)?.href ||
            null;

          results.push({ title, views, likes, url });
        });

        return results;
      });

      return this.filterAndSortVideos(videos);
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("Failed to scrape YouTube videos");
    } finally {
      await this.closeBrowser();
    }
  }

  private filterAndSortVideos(videos: YouTubeVideo[]): YouTubeVideo[] {
    return videos
      .filter((video) => {
        if (!video.views) return false;
        const views = this.parseViews(video.views);
        return !isNaN(views) && views > 10000;
      })
      .sort((a, b) => {
        const viewsA = this.parseViews(a.views || "0");
        const viewsB = this.parseViews(b.views || "0");
        return viewsB - viewsA;
      });
  }

  private parseViews(views: string): number {
    try {
      const cleaned = views.replace(/[^0-9.KMk]/g, "").toUpperCase();

      if (cleaned.includes("K")) {
        return parseFloat(cleaned) * 1000;
      } else if (cleaned.includes("M")) {
        return parseFloat(cleaned) * 1000000;
      } else {
        return parseFloat(cleaned);
      }
    } catch {
      return 0;
    }
  }
}
