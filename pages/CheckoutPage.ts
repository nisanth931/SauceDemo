import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutLocators } from '../locators/checkoutLocators';
import { TestHelper } from '../utils/testHelper';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Page Object covering the full Checkout flow:
 * Step One (Your Information) -> Step Two (Overview) -> Step Three (Complete).
 */
export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ---------- Step One ----------
  async fillCheckoutInfo(info: CheckoutInfo): Promise<void> {
    if (info.firstName) await this.page.fill(CheckoutLocators.firstNameInput, info.firstName);
    if (info.lastName) await this.page.fill(CheckoutLocators.lastNameInput, info.lastName);
    if (info.postalCode) await this.page.fill(CheckoutLocators.postalCodeInput, info.postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.page.click(CheckoutLocators.continueButton);
  }

  async cancel(): Promise<void> {
    await this.page.click(CheckoutLocators.cancelButton);
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(CheckoutLocators.errorMessage);
    await expect(errorLocator).toBeVisible();
    return (await errorLocator.textContent())?.trim() ?? '';
  }

  // ---------- Step Two: Overview ----------
  async getItemTotal(): Promise<number> {
    const text = await this.page.locator(CheckoutLocators.itemTotalLabel).textContent();
    return TestHelper.parsePrice((text ?? '').replace('Item total: ', ''));
  }

  async getTax(): Promise<number> {
    const text = await this.page.locator(CheckoutLocators.taxLabel).textContent();
    return TestHelper.parsePrice((text ?? '').replace('Tax: ', ''));
  }

  async getTotal(): Promise<number> {
    const text = await this.page.locator(CheckoutLocators.totalLabel).textContent();
    return TestHelper.parsePrice((text ?? '').replace('Total: ', ''));
  }

  async finish(): Promise<void> {
    await this.page.click(CheckoutLocators.finishButton);
  }

  // ---------- Step Three: Complete ----------
  async assertOrderConfirmed(): Promise<void> {
    await expect(this.page.locator(CheckoutLocators.completeHeader)).toHaveText('Thank you for your order!');
    await expect(this.page.locator(CheckoutLocators.completeText)).toBeVisible();
  }

  async backToProducts(): Promise<void> {
    await this.page.click(CheckoutLocators.backHomeButton);
  }
}
