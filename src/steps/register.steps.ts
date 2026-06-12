import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../types/world';
import { generateUser } from '../utils/dataGenerator';

// ================= SCENARIO =================

Given('user is on signup page', async function (this: CustomWorld) {
  await this.registerPage.navigate();
});

When('user enters name and email on the signup details', async function (this: CustomWorld) {
  const user = generateUser();
  this.user = user;

  await this.registerPage.enterSignupDetails(user.name, user.email);
});

When('user clicks on the signup button', async function (this: CustomWorld) {
  await this.registerPage.clickSignup();
});

When('on the "Account information" page user fills account information', async function (this: CustomWorld) {
  await this.registerPage.verifyAccountInfoPage();

  await this.registerPage.fillAccountInformation(this.user!);
});

When('user clicks on the {string} button', async function (this: CustomWorld, buttonName: string) {
  if (buttonName === 'Create Account') {
    await this.registerPage.clickCreateAccount();
  } else if (buttonName === 'Signup') {
    await this.registerPage.clickSignup();
  }
});

Then('account should be created successfully', async function (this: CustomWorld) {
  await this.registerPage.verifyAccountCreated();
});

When('user clicks Continue button', async function (this: CustomWorld) {
  await this.registerPage.clickContinue();
});