import { Page } from 'playwright';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async waitForElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }
}