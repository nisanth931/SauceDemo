/**
 * Centralized locators for the Login page.
 * Kept separate from the Page Object so selectors can be reused/updated in one place.
 */
export const LoginLocators = {
  usernameInput: '#user-name',
  passwordInput: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]',
  errorCloseButton: '.error-button',
};
