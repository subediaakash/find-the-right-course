import puppeteer, { Browser, executablePath, Page } from "puppeteer";

export abstract class BaseScraper {
  protected browser: Browser | null = null;
  protected page: Page | null = null;

  private userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36",
  ];

  private getRandomUserAgent(): string {
    return this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
  }

  async launchBrowser() {
    this.browser = await puppeteer.launch({
      headless: false,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    this.page = await this.browser.newPage();

    // Set a random user agent
    const randomUserAgent = this.getRandomUserAgent();
    await this.page.setUserAgent(randomUserAgent);

    // Set headers to mimic real browsing
    await this.page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      "Upgrade-Insecure-Requests": "1",
      "Accept-Encoding": "gzip, deflate, br",
      "Cache-Control": "no-cache",
    });

    console.log("Using User-Agent:", randomUserAgent);
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
  imageUrl: string | null;
}
