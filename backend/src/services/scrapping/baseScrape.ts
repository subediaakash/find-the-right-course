import puppeteer, { Browser, executablePath, Page } from "puppeteer";

export abstract class BaseScraper {
  protected browser: Browser | null = null;
  protected page: Page | null = null;

  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
    });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }
  abstract scrape(query: string): Promise<any>;
}

export interface Course {
  title: string | null;
  rating: string | null;
  url: string | null;
}
