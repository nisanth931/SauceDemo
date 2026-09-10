import { test, expect } from '../fixtures/testFixtures';
import checkoutData from '../test-data/checkoutInfo.json';

const PRODUCT_1 = 'Sauce Labs Backpack';
const PRODUCT_2 = 'Sauce Labs Bike Light';

test.describe('Checkout', () => {
  // Mandatory Scenario 6: Complete Checkout
  // Mandatory Scenario 7: Verify Order Confirmation
  test('TC_CHK_001/009 - should complete checkout end-to-end and confirm the order @smoke', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.addProductToCart(PRODUCT_2);
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillCheckoutInfo(checkoutData.validCheckoutInfo);
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Validate totals math: item total + tax = total
    const itemTotal = await checkoutPage.getItemTotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    expect(Math.round((itemTotal + tax) * 100) / 100).toBeCloseTo(total, 2);

    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete.html/);
    await checkoutPage.assertOrderConfirmed();

    const badgeCount = await loggedInPage.getCartBadgeCount();
    expect(badgeCount).toBe(0);
  });

  test('TC_CHK_002 - should show an error when First Name is missing', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillCheckoutInfo(checkoutData.missingFirstName);
    await checkoutPage.continueCheckout();

    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('First Name is required');
  });

  test('TC_CHK_004 - should show an error when Postal Code is missing', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.fillCheckoutInfo(checkoutData.missingPostalCode);
    await checkoutPage.continueCheckout();

    const errorText = await checkoutPage.getErrorMessage();
    expect(errorText).toContain('Postal Code is required');
  });

  test('TC_CHK_006 - Cancel on step one should return to the cart page', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();
    await cartPage.checkout();

    await checkoutPage.cancel();

    await expect(page).toHaveURL(/cart.html/);
  });

  test('TC_CHK_011 - "Back Home" on confirmation page should return to Products page', async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await loggedInPage.addProductToCart(PRODUCT_1);
    await loggedInPage.goToCart();
    await cartPage.checkout();
    await checkoutPage.fillCheckoutInfo(checkoutData.validCheckoutInfo);
    await checkoutPage.continueCheckout();
    await checkoutPage.finish();
    await checkoutPage.assertOrderConfirmed();

    await checkoutPage.backToProducts();

    await expect(page).toHaveURL(/inventory.html/);
  });
});
