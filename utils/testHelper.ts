import { Page } from '@playwright/test';
import path from 'path';

/**
 * Reusable, generic helper functions that don't belong to a single Page Object.
 */
export class TestHelper {
  /**
   * Converts a product name (e.g. "Sauce Labs Backpack") into the slug used
   * in SauceDemo's data-test attributes (e.g. "sauce-labs-backpack").
   */
  static toProductSlug(productName: string): string {
    return productName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  /**
   * Parses a SauceDemo price string like "$29.99" into a number: 29.99
   */
  static parsePrice(priceText: string): number {
    return parseFloat(priceText.replace('$', '').trim());
  }

  /**
   * Captures a full-page screenshot into the project's /screenshots folder,
   * timestamped so re-runs never overwrite previous evidence.
   */
  static async captureScreenshot(page: Page, name: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join('screenshots', `${name}-${timestamp}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }

  /**
   * Simple retry wrapper for flaky async actions (e.g. third-party widgets).
   */
  static async retry<T>(fn: () => Promise<T>, retries = 3, delayMs = 500): Promise<T> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
    throw lastError;
  }
}
