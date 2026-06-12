import { Page, Locator, expect } from '@playwright/test';
import { TestUser } from '../types/world';

export class RegisterPage {
  private page: Page;

  // ===== SIGNUP =====
  private nameInput: Locator;
  private emailInput: Locator;
  private signupButton: Locator;
  private signupForm: Locator;
  private accountSection: Locator;

  // ===== ACCOUNT INFO =====
  private accountHeader: Locator;
  private passwordInput: Locator;

  private titleMr: Locator;
  private day: Locator;
  private month: Locator;
  private year: Locator;

  private firstName: Locator;
  private lastName: Locator;
  private address: Locator;
  private state: Locator;
  private city: Locator;
  private zipcode: Locator;
  private mobile: Locator;

  private createAccountButton: Locator;
  private continueButton: Locator;

  // ===== SUCCESS =====
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // ===== SIGNUP =====

    this.signupForm = page.locator('form').filter({ hasText: 'Signup' });

    this.nameInput = this.signupForm.getByPlaceholder('Name');
    this.emailInput = this.signupForm.getByPlaceholder('Email Address');
    this.signupButton = this.signupForm.getByRole('button', { name: 'Signup' });

    // ===== ACCOUNT INFO =====
    this.accountHeader = page.getByText('Enter Account Information');

    this.passwordInput = page.locator('[data-qa="password"]');

    this.titleMr = page.getByRole('radio', { name: 'Mr.' });

    // DROPDOWN (no role available → fallback stable locator)
    this.day = page.locator('[data-qa="days"]');
    this.month = page.locator('[data-qa="months"]');
    this.year = page.locator('[data-qa="years"]');
    // ===== ADDRESS =====
    this.firstName = page.locator('[data-qa="first_name"]');
this.lastName = page.locator('[data-qa="last_name"]');
this.address = page.locator('[data-qa="address"]');
this.state = page.locator('[data-qa="state"]');
this.city = page.locator('[data-qa="city"]');
this.zipcode = page.locator('[data-qa="zipcode"]');
this.mobile = page.locator('[data-qa="mobile_number"]');

this.createAccountButton = page.locator('[data-qa="create-account"]');
this.continueButton = page.locator('[data-qa="continue-button"]');

    // ===== SUCCESS =====
    this.successMessage = page.getByText('Account Created!');
  }

  // ===== NAVIGATION =====
  async navigate() {
    await this.page.goto('https://automationexercise.com/login', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await expect(this.signupForm).toBeVisible({ timeout: 15000 });
  }

  // ===== SIGNUP =====
  async enterSignupDetails(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async clickSignup() {
    await this.signupButton.click();
  }

  // ===== ACCOUNT PAGE =====
  async verifyAccountInfoPage() {
    await expect(this.passwordInput).toBeVisible();
  }

  // ===== FORM =====

  async selectTitle() {
  await this.titleMr.check();
}

  async fillAccountInformation(user: TestUser) {
    await this.selectTitle();
    await this.passwordInput.fill(user.password);

    // DOB - dropdowns
    await this.day.selectOption('1');
    await this.month.selectOption('1');
    await this.year.selectOption('2000');

    await this.firstName.fill(user.name);
    await this.lastName.fill(user.name);

    await this.address.fill('Test Address');
    await this.state.fill('UP');
    await this.city.fill('Noida');
    await this.zipcode.fill('201301');
    await this.mobile.fill('9999999999');
  }

  async clickCreateAccount() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.successMessage).toBeVisible();
  }

  async clickContinue() {
  await this.continueButton.click();
}
}