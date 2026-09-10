/**
 * Centralized locators for the Products (Inventory) page.
 */
export const ProductsLocators = {
  pageTitle: '[data-test="title"]',
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  inventoryItemPrice: '.inventory_item_price',
  sortDropdown: '[data-test="product-sort-container"]',
  cartIcon: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  menuButton: '#react-burger-menu-btn',
  logoutLink: '#logout_sidebar_link',
  allItemsLink: '#inventory_sidebar_link',
  resetAppStateLink: '#reset_sidebar_link',
  addToCartButtonByProduct: (productSlug: string) => `[data-test="add-to-cart-${productSlug}"]`,
  removeButtonByProduct: (productSlug: string) => `[data-test="remove-${productSlug}"]`,
};
