import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/loginLocators';

/**
 * Page Object for the SauceDemo Login page (https://www.saucedemo.com/).
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(LoginLocators.usernameInput, username);
    await this.page.fill(LoginLocators.passwordInput, password);
    await this.page.click(LoginLocators.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator(LoginLocators.errorMessage);
    await expect(errorLocator).toBeVisible();
    return (await errorLocator.textContent())?.trim() ?? '';
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.page.locator(LoginLocators.loginButton).isVisible();
  }

  async closeError(): Promise<void> {
    await this.page.click(LoginLocators.errorCloseButton);
  }
}
