import {Before,After,setWorldConstructor,setDefaultTimeout,ITestCaseHookParameter} from '@cucumber/cucumber';

import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { CustomWorld, TestUser, ApiResponse } from '../types/world';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ApiClient } from '../api/client/apiClient';
import * as allure from 'allure-js-commons';
import { RegisterPage } from '../pages/registerPage';
import { ContactPage } from '../pages/ContactPage';
import { ProductsPage } from '../pages/ProductsPage';
import { HeaderPage } from '../pages/HeaderPage';

// Timeout
setDefaultTimeout(60 * 1000);

// ================= WORLD =================

class World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  loginPage!: LoginPage;
  homePage!: HomePage;
  registerPage!: RegisterPage;
  contactPage!: ContactPage;
  productsPage!: ProductsPage;
  headerPage!:HeaderPage;

  apiClient!: ApiClient;

  user?: TestUser;
  response?: ApiResponse;
  body?: ApiResponse;

  attach?: (data: Buffer, mediaType: string) => Promise<void>;
}

setWorldConstructor(World);

// ================= BEFORE =================

Before(async function (this: CustomWorld, scenario) {
  const isApi = scenario.pickle.tags.some(tag => tag.name === '@api');

  // ================= API FLOW =================
  if (isApi) {
    this.apiClient = new ApiClient();
    await this.apiClient.init();
    return; // 🚫 DO NOT launch browser
  }

  // ================= UI FLOW =================
  this.browser = await chromium.launch({
    headless: true
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();

  // Page objects
  this.loginPage = new LoginPage(this.page);
  this.homePage = new HomePage(this.page);
  this.registerPage = new RegisterPage(this.page);
  this.contactPage = new ContactPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.headerPage = new HeaderPage(this.page);

  // API also available for hybrid tests
  this.apiClient = new ApiClient();
  await this.apiClient.init();
});

// ================= AFTER =================

After(async function (
  this: CustomWorld,
  scenario: ITestCaseHookParameter
) {
  const isApi = scenario.pickle.tags.some(tag => tag.name === '@api');

  //Screenshot ONLY for UI failures
  if (!isApi && this.page && scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });

    // Fix here
    if (typeof this.attach === 'function') {
      this.attach(screenshot, 'image/png');
    }

    // Allure
    allure.attachment('Failure Screenshot', screenshot, 'image/png');
  }

  // Close browser ONLY if exists
  if (this.browser) {
    await this.browser.close();
  }
});