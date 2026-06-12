import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../types/world';

// ================= COMMON =================

Given('user is on login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

Given('user is on home page', async function (this: CustomWorld) {
  await this.homePage.navigate();
});

// ================= UI-003 =================

When('user clicks on Signup\\/Login', async function (this: CustomWorld) {
  await this.loginPage.clickSignupLogin();
});

Then('user should be navigated to login page', async function (this: CustomWorld) {
  await this.loginPage.verifyOnLoginPage();
});

// ================= UI-005 =================

When('user enters valid credentials', async function (this: CustomWorld) {
  // Works for BOTH:
  // - E2E flow (uses dynamic user)
  // - Independent login test (uses fallback user)

  const email = this.user?.email ?? 'test136@yopmail.com';
  const password = this.user?.password ?? '123456';

  await this.loginPage.login(email, password);
});

Then('user name should be visible in header', async function (this: CustomWorld) {
  await this.loginPage.isUserLoggedIn();
});

Then('logout button should be visible', async function (this: CustomWorld) {
  await this.loginPage.isLogoutVisible();
});

// ================= UI-006 =================

When('user enters invalid credentials', async function (this: CustomWorld) {
  await this.loginPage.login('invalid@test.com', 'wrongPassword123');
});

Then('error message should be displayed', async function (this: CustomWorld) {
  await this.loginPage.getLoginErrorMessage();
});

// ================= UI-007 =================

Given('user is logged in', async function (this: CustomWorld) {

  const email = this.user?.email ?? 'test136@yopmail.com';
  const password = this.user?.password ?? '123456';

  await this.loginPage.navigate();
  await this.loginPage.login(email, password);
});

When('user clicks logout button', async function (this: CustomWorld) {
  await this.loginPage.clickLogout();
});

// for E2E flow
When('user navigates to login page', async function (this: CustomWorld) {
  await this.loginPage.navigate();
});

Then('user should be redirected to login page', async function (this: CustomWorld) {
  await this.loginPage.verifyOnLoginPage();
});