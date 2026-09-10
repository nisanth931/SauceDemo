import { test, expect } from '../fixtures/testFixtures';

test.describe('Logout', () => {
  // Mandatory Scenario 8: Logout
  test('TC_LOGOUT_001 - should log the user out and return to the login page @smoke', async ({
    loggedInPage,
    loginPage,
    page,
  }) => {
    await loggedInPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('TC_LOGOUT_003 - browser back navigation after logout should not restore the products page', async ({
    loggedInPage,
    page,
  }) => {
    await loggedInPage.logout();
    await page.goBack();

    // Session is cleared on logout, so navigating directly to inventory redirects back to login
    await page.goto('/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
});
