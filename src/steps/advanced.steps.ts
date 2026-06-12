import { Given, When, Then } from '@cucumber/cucumber';
import { expect, BrowserContext, Page } from '@playwright/test';
import { CustomWorld } from '../types/world';

let contextA: BrowserContext;
let contextB: BrowserContext;
let pageA: Page;
let pageB: Page;

/**
 * =========================================
 * UI-016: Network Interception
 * =========================================
 */

Given('user blocks heavy banner requests', async function (this: CustomWorld) {
  // Block images (simulate slow/heavy banner blocking)
  await this.context.route('**/*.{png,jpg,jpeg,svg}', route => route.abort());
});

When('user opens home page after blocking banners', async function (this: CustomWorld) {
  await this.page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
  });
});

Then('page should load successfully without banner', async function (this: CustomWorld) {
  // Validate page loads properly
  await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'Products' })).toBeVisible();

  // URL validation
  await expect(this.page).toHaveURL('https://automationexercise.com/');

  // Cleanup (important for next tests)
  await this.page.unroute('**/*.{png,jpg,jpeg,svg}');
});

/**
 * =========================================
 * UI-017: Multi-context Session Sharing
 * =========================================
 */

Given('user logs in', async function (this: CustomWorld) {
  // Ensure user exists (from register or fallback)
  const email = this.user?.email ?? 'test136@yopmail.com';
  const password = this.user?.password ?? '123456';

  contextA = await this.browser.newContext();
  pageA = await contextA.newPage();

  await pageA.goto('https://automationexercise.com/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  const loginForm = pageA.locator('form').filter({ hasText: 'Login' });

  await loginForm.getByPlaceholder('Email Address').fill(email);
  await loginForm.getByPlaceholder('Password').fill(password);
  await loginForm.getByRole('button', { name: 'Login' }).click();

  // Wait for the actual logged-in state rather than network idle
  await expect(pageA.getByText('Logged in as')).toBeVisible({ timeout: 30000 });
});

When('session cookies are copied to new browser', async function (this: CustomWorld) {
  // Get cookies from first context
  const cookies = await contextA.cookies();

  //Create new context and inject cookies
  contextB = await this.browser.newContext();
  await contextB.addCookies(cookies);

  pageB = await contextB.newPage();
  await pageB.goto('https://automationexercise.com');

  await pageB.waitForLoadState('networkidle');
});

Then('user should remain logged in', async function (this: CustomWorld) {
  // Validate session persisted
  await expect(pageB.getByText('Logged in as')).toBeVisible();

  // Strong validation
  await expect(pageB).not.toHaveURL(/login/);
});