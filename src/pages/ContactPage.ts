import { Page, Locator, expect } from '@playwright/test';

export class ContactPage {
  private page: Page;

  // ===== FORM =====
  private nameInput: Locator;
  private emailInput: Locator;
  private subjectInput: Locator;
  private messageInput: Locator;
  private fileUpload: Locator;
  private submitButton: Locator;

  // ===== SUCCESS =====
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // USER-FACING LOCATORS (ASSESSMENT RULE)
    

    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.locator('.contact-form').getByPlaceholder('Email');
    this.subjectInput = page.getByPlaceholder('Subject');
    this.messageInput = page.getByPlaceholder('Your Message Here');

    this.fileUpload = page.getByLabel('Choose File'); // fallback below if needed

    this.submitButton = page.getByRole('button', { name: 'Submit' });

    this.successMessage = page.getByText('Success! Your details have been submitted successfully.');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/contact_us');
    await this.page.waitForSelector('.contact-form', { timeout: 10000 });
  }

  async fillContactForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async uploadFile(filePath: string) {
    // Try quick checks to avoid long, implicit waits causing Cucumber timeouts
    const byLabel = this.fileUpload;
    if ((await byLabel.count()) > 0) {
      await byLabel.setInputFiles(filePath);
      return;
    }

    const bySelector = this.page.locator('input[type="file"]');
    if ((await bySelector.count()) > 0) {
      await bySelector.setInputFiles(filePath);
      return;
    }

    throw new Error('File input element not found on contact page');
  }

  async clickSubmit() {
  await this.submitButton.click();
}

  async submitFormAccept() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.submitButton.click();
  }

  async submitFormDismiss() {
    this.page.once('dialog', async dialog => {
      await dialog.dismiss();
    });

    await this.submitButton.click();
  }

  async verifySuccessMessage() {
    await expect(this.successMessage.first()).toBeVisible();
  }

  async verifyFormNotSubmitted() {
    await expect(this.successMessage).not.toBeVisible();
  }
}