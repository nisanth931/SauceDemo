import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductsLocators } from '../locators/productsLocators';
import { TestHelper } from '../utils/testHelper';

/**
 * Page Object for the Products (Inventory) page.
 */
export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async assertLoaded(): Promise<void> {
    await expect(this.page.locator(ProductsLocators.pageTitle)).toHaveText('Products');
    await expect(this.page.locator(ProductsLocators.inventoryList)).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return this.page.locator(ProductsLocators.inventoryItem).count();
  }

  async addProductToCart(productName: string): Promise<void> {
    const slug = TestHelper.toProductSlug(productName);
    await this.page.click(ProductsLocators.addToCartButtonByProduct(slug));
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const slug = TestHelper.toProductSlug(productName);
    await this.page.click(ProductsLocators.removeButtonByProduct(slug));
  }

  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator(ProductsLocators.cartBadge);
    if (await badge.count() === 0) return 0;
    const text = await badge.textContent();
    return text ? parseInt(text, 10) : 0;
  }

  async goToCart(): Promise<void> {
    await this.page.click(ProductsLocators.cartIcon);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.page.selectOption(ProductsLocators.sortDropdown, option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator(ProductsLocators.inventoryItemName).allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator(ProductsLocators.inventoryItemPrice).allTextContents();
    return priceTexts.map((p) => TestHelper.parsePrice(p));
  }

  async logout(): Promise<void> {
    await this.page.click(ProductsLocators.menuButton);
    await this.page.click(ProductsLocators.logoutLink);
  }
}
