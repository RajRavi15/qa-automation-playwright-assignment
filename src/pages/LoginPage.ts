import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  private loginForm: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  private loggedInText: Locator;
  private logoutLink: Locator;

  private loginError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginForm = page.locator('form').filter({ hasText: 'Login' });

    this.emailInput = this.loginForm.locator('[data-qa="login-email"]');
    this.passwordInput = this.loginForm.locator('[data-qa="login-password"]');
    this.loginButton = this.loginForm.locator('[data-qa="login-button"]');

    // More stable
    this.loggedInText = page.locator('a:has-text("Logged in as")');
    this.logoutLink = page.locator('a[href="/logout"]');

    // Slightly stronger
    this.loginError = this.loginForm.locator('p:has-text("Your email or password is incorrect!")');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async verifyOnLoginPage() {
    await expect(this.page).toHaveURL(/login/);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Critical stability fix
    await Promise.race([
      this.loggedInText.waitFor(),
      this.loginError.waitFor()
    ]);
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickSignupLogin() {
    await this.page.locator('a[href="/login"]').first().click();
  }

  async isUserLoggedIn() {
    await expect(this.loggedInText).toBeVisible();
  }

  async isLogoutVisible() {
    await expect(this.logoutLink).toBeVisible();
  }

  async getLoginErrorMessage() {
    await expect(this.loginError).toBeVisible();
  }
}