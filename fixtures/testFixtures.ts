import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/users.json';

type Pages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * Extends Playwright's base test with ready-to-use Page Object instances,
 * plus a `loggedInPage` fixture that performs a standard login before the
 * test body runs — removing repeated login boilerplate from every spec.
 */
export const test = base.extend<Pages & { loggedInPage: ProductsPage }>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Provides a ProductsPage with a valid user already logged in.
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.validUser.username, users.validUser.password);
    const productsPage = new ProductsPage(page);
    await productsPage.assertLoaded();
    await use(productsPage);
  },
});

export { expect } from '@playwright/test';
