import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  private page: Page;

  private logo: Locator;
  private banner: Locator;
  private categories: Locator;
  private signupLoginLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.locator('img[alt="Website for automation practice"]');

    // banner (top carousel / hero section)
    this.banner = page.locator('#slider-carousel');

    // categories (left sidebar)
    this.categories = page.locator('.left-sidebar');

    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'load',
      timeout: 60000,
    });
    await expect(this.page).toHaveURL('https://automationexercise.com/', { timeout: 30000 });
    await expect(this.signupLoginLink).toBeVisible({ timeout: 30000 });
  }

  async verifyLogoVisible() {
    await expect(this.logo).toBeVisible();
  }

  async verifyBannerVisible() {
    await expect(this.banner).toBeVisible();
  }

  async verifyCategoriesVisible() {
    await expect(this.categories).toBeVisible();
  }
}