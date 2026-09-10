import { test, expect } from '../fixtures/testFixtures';

test.describe('Products', () => {
  // Mandatory Scenario 3: Verify Products Page
  test('TC_PROD_001 - should display the products page with 6 products @smoke', async ({ loggedInPage }) => {
    await loggedInPage.assertLoaded();

    const count = await loggedInPage.getProductCount();
    expect(count).toBe(6);
  });

  test('TC_PROD_003 - should sort products by Name (A to Z)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('az');

    const names = await loggedInPage.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test('TC_PROD_005 - should sort products by Price (low to high)', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');

    const prices = await loggedInPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC_PROD_007 - should add a single product to the cart', async ({ loggedInPage }) => {
    await loggedInPage.addProductToCart('Sauce Labs Backpack');

    const badgeCount = await loggedInPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });
});
