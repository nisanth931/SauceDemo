import { test, expect } from '../fixtures/testFixtures';

const PRODUCT_1 = 'Sauce Labs Backpack';
const PRODUCT_2 = 'Sauce Labs Bike Light';

test.describe('Cart', () => {
  // Mandatory Scenario 4: Add Two Products to Cart
  test('TC_CART_001/002 - should add two products to the cart and display them correctly @smoke', async ({
    loggedInPage,
    cartPage,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.addProductToCart(PRODUCT_2);

    const badgeCount = await loggedInPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);

    await loggedInPage.goToCart();
    await cartPage.assertItemCount(2);

    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toEqual(expect.arrayContaining([PRODUCT_1, PRODUCT_2]));
  });

  // Mandatory Scenario 5: Remove One Product from Cart
  test('TC_CART_003 - should remove one product from the cart @smoke', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.addProductToCart(PRODUCT_2);
    await loggedInPage.goToCart();
    await cartPage.assertItemCount(2);

    await cartPage.removeProduct(PRODUCT_1);

    await cartPage.assertItemCount(1);
    const remainingItems = await cartPage.getCartItemNames();
    expect(remainingItems).toEqual([PRODUCT_2]);
  });

  test('TC_CART_004 - "Continue Shopping" should return to the Products page', async ({
    loggedInPage,
    cartPage,
    page,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();

    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC_CART_005 - "Checkout" should navigate to the checkout information page', async ({
    loggedInPage,
    cartPage,
    page,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();

    await cartPage.checkout();

    await expect(page).toHaveURL(/checkout-step-one.html/);
  });
});
