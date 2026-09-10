import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartLocators } from '../locators/cartLocators';
import { TestHelper } from '../utils/testHelper';

/**
 * Page Object for the Cart page.
 */
export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async assertItemCount(expectedCount: number): Promise<void> {
    await expect(this.page.locator(CartLocators.cartItem)).toHaveCount(expectedCount);
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(CartLocators.cartItemName).allTextContents();
  }

  async removeProduct(productName: string): Promise<void> {
    const slug = TestHelper.toProductSlug(productName);
    await this.page.click(CartLocators.removeButtonByProduct(slug));
  }

  async continueShopping(): Promise<void> {
    await this.page.click(CartLocators.continueShoppingButton);
  }

  async checkout(): Promise<void> {
    await this.page.click(CartLocators.checkoutButton);
  }
}
