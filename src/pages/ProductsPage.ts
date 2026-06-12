import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  private page: Page;

  private products: Locator;
  private productNames: Locator;
  private productPrices: Locator;

  private searchInput: Locator;
  private searchButton: Locator;

  private viewProductLink: Locator;
  private viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.products = page.locator('.product-image-wrapper');
    this.productNames = page.locator('.productinfo p');
    this.productPrices = page.locator('.productinfo h2');

    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');

    this.viewProductLink = page.locator('.product-image-wrapper').locator('text=View Product');
    this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
  }

  // ===== NAVIGATION =====
  async navigate() {
    await this.page.goto('https://automationexercise.com/products', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await this.products.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  // ===== UI-008 =====
  async verifyProductGrid() {
    await expect(this.products.first()).toBeVisible();
  }

  async verifyProductNameAndPrice() {
    await expect(this.productNames.first()).toBeVisible();
    await expect(this.productPrices.first()).toBeVisible();
  }

  // ===== UI-009 =====
  async clickFirstProduct() {
    const firstProduct = this.products.first();
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();

    const viewLink = firstProduct.locator('text=View Product');
    await expect(viewLink).toBeVisible({ timeout: 10000 });

    await Promise.all([
      this.page.waitForURL('**/product_details/**', { timeout: 15000 }),
      viewLink.click(),
    ]);
  }

  async verifyProductName() {
    await expect(this.page.locator('.product-information h2')).toBeVisible({ timeout: 15000 });
  }

  async verifyProductPrice() {
    await expect(this.page.locator('.product-information span span')).toBeVisible();
  }

  async verifyAvailability() {
    await expect(this.page.getByText('Availability')).toBeVisible();
  }

  // ===== UI-010 =====
  async searchProduct(keyword: string) {
    await this.searchInput.fill(keyword);
  
  }

  async verifySearchResults() {
    await expect(this.products.first()).toBeVisible();
  }

  // ===== UI-011 =====
  async clickSearchButton() {
    await this.searchButton.click();
  }

  async verifyNoResults() {
    await expect(this.page.locator('.features_items h2')).toHaveText('Searched Products');
    await expect(this.products).toHaveCount(0);
  }

  // ===== UI-012 =====
  async selectBrand(brand: string) {
    await this.page
      .locator('.brands_products')
      .getByRole('link', { name: new RegExp(brand, 'i') })
      .click();
  }

  async verifyFilteredProducts() {
    await expect(this.products.first()).toBeVisible();
  }

  // ===== UI-013 =====
  async addFirstProductToCart() {
    const product = this.products.first();

    await product.scrollIntoViewIfNeeded();
    await product.hover();

    await product.locator('.add-to-cart').first().click();

  }

  async clickViewCart() {
    await this.page.locator('.modal-content').waitFor({ state: 'visible' });
    await this.viewCartLink.click();
  }

  async verifyCartHasProducts() {
    await expect(this.page.locator('#cart_info_table tbody tr')).toHaveCount(1);
  }

  // ===== UI-014 =====
  async addAnotherProduct() {
    await this.page.getByRole('link', { name: 'Products' }).click();

    const secondProduct = this.products.nth(1);

    await secondProduct.scrollIntoViewIfNeeded();
    await secondProduct.hover();

    await secondProduct.locator('.add-to-cart').first().click();

    await this.page.locator('.modal-content').waitFor({ state: 'visible' });

    await this.viewCartLink.click();
  }

  async verifyTotalUpdated() {
    const items = this.page.locator('#cart_info_table tbody tr');

    await expect(items).toHaveCount(2);

const prices = this.page.locator('#cart_info_table tbody tr td:nth-child(3)');
const totals = this.page.locator('#cart_info_table tbody tr td:nth-child(5)');

await expect(prices.first()).toContainText('Rs.');
await expect(totals.first()).toContainText('Rs.');
  }
}