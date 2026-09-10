/**
 * Centralized locators for the Checkout flow (Step One, Step Two/Overview, Complete).
 */
export const CheckoutLocators = {
  // Step One - Your Information
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorMessage: '[data-test="error"]',

  // Step Two - Overview
  cartItem: '.cart_item',
  itemTotalLabel: '.summary_subtotal_label',
  taxLabel: '.summary_tax_label',
  totalLabel: '.summary_total_label',
  finishButton: '[data-test="finish"]',

  // Step Three - Complete
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  backHomeButton: '[data-test="back-to-products"]',
  ponyExpressImage: '.pony_express',
};
