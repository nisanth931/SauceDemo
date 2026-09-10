import { test, expect } from '../fixtures/testFixtures';
import users from '../test-data/users.json';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  // Mandatory Scenario 1: Valid Login
  test('TC_LOGIN_001 - should log in successfully with valid credentials @smoke', async ({
    loginPage,
    productsPage,
    page,
  }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory.html/);
    await productsPage.assertLoaded();
  });

  // Mandatory Scenario 2: Invalid Login
  test('TC_LOGIN_002 - should show an error with an invalid password @smoke', async ({ loginPage, page }) => {
    await loginPage.login(users.validUser.username, 'wrong_password');

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(users.expectedErrorMessages.invalidCredentials);
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('TC_LOGIN_004 - should show an error for a locked out user', async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(users.expectedErrorMessages.lockedOut);
  });

  test('TC_LOGIN_006 - should show an error when username is empty', async ({ loginPage }) => {
    await loginPage.login('', users.validUser.password);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(users.expectedErrorMessages.usernameRequired);
  });

  test('TC_LOGIN_007 - should show an error when password is empty', async ({ loginPage }) => {
    await loginPage.login(users.validUser.username, '');

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain(users.expectedErrorMessages.passwordRequired);
  });
});
