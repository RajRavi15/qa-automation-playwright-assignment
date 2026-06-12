import { Page, Locator, expect } from '@playwright/test';

export class HeaderPage {
  private page: Page;

  // ===== LOCATORS =====
  private productsMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    // Use a text-based locator because the header Products link does not expose a role reliably.
    this.productsMenu = page.locator('a', { hasText: 'Products' });
  }

  // ===== ACTION =====
  async clickProducts() {
    await Promise.all([
      this.page.waitForURL('**/products', { waitUntil: 'domcontentloaded', timeout: 15000 }),
      this.productsMenu.first().click({ timeout: 10000 }),
    ]);
  }

  // ===== ASSERTION =====
  async verifyOnProductsPage() {
    await expect(this.page).toHaveURL(/\/products$/, { timeout: 15000 });
  }
}