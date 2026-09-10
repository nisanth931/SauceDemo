/**
 * Centralized locators for the Cart page.
 */
export const CartLocators = {
  cartList: '.cart_list',
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  cartItemQuantity: '.cart_quantity',
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton: '[data-test="checkout"]',
  removeButtonByProduct: (productSlug: string) => `[data-test="remove-${productSlug}"]`,
};
