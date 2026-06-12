import { Given, When, Then } from '@cucumber/cucumber';

// ===== COMMON =====
Given('user is on products page', async function () {
  await this.productsPage.navigate();
});

// ===== UI-008 =====
Then('product list should be visible', async function () {
  await this.productsPage.verifyProductGrid();
});

Then('each product should have name and price', async function () {
  await this.productsPage.verifyProductNameAndPrice();
});

// ===== UI-009 =====
When('user clicks on a product', async function () {
  await this.productsPage.clickFirstProduct();
});

Then('product name should be displayed', async function () {
  await this.productsPage.verifyProductName();
});

Then('product price should be displayed', async function () {
  await this.productsPage.verifyProductPrice();
});

Then('availability should be visible', async function () {
  await this.productsPage.verifyAvailability();
});

// ===== UI-010 =====
When('user searches for {string}', async function (keyword: string) {
  await this.productsPage.searchProduct(keyword);
});

Then('search results should be displayed', async function () {
  await this.productsPage.verifySearchResults();
});

// ===== UI-011 =====
Then('user clicks on the search icon button', async function () {
  await this.productsPage.clickSearchButton();

});

Then('no results message should be displayed', async function () {
  await this.productsPage.verifyNoResults();
});

// ===== UI-012 =====
When('user selects brand {string}', async function (brand: string) {
  await this.productsPage.selectBrand(brand);
});

Then('filtered products should be displayed', async function () {
  await this.productsPage.verifyFilteredProducts();
});

// ===== UI-013 =====
When('user adds a product to cart', async function () {
  await this.productsPage.addFirstProductToCart();
});

When('user clicks on view cart', async function () {
  await this.productsPage.clickViewCart();
});

Then('cart should contain the product', async function () {
  await this.productsPage.verifyCartHasProducts();
});

// ===== UI-014 =====
Given('user has product in cart', async function () {
  await this.productsPage.navigate();
  await this.productsPage.addFirstProductToCart();
  await this.productsPage.clickViewCart();
});

When('user increases quantity', async function () {
  await this.productsPage.addAnotherProduct();
});

Then('total price should be updated', async function () {
  await this.productsPage.verifyTotalUpdated();
});