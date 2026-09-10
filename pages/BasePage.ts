import { Page } from '@playwright/test';
import { TestHelper } from '../utils/testHelper';

/**
 * BasePage holds behaviour shared by every Page Object (navigation, screenshots, waits).
 * All concrete page objects extend this class.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async takeScreenshot(name: string): Promise<string> {
    return TestHelper.captureScreenshot(this.page, name);
  }

  async waitForUrlContains(fragment: string): Promise<void> {
    await this.page.waitForURL(`**/*${fragment}*`);
  }
}
