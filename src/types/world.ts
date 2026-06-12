import { IWorld } from '@cucumber/cucumber';
import { Browser, Page,BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ApiClient } from '../api/client/apiClient';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/registerPage';
import { ContactPage } from '../pages/ContactPage';
import { HeaderPage } from '../pages/HeaderPage';

export interface TestUser {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  responseCode: number;
  message?: string;
  products?: any[];
  brands?: any[];
}

export interface CustomWorld extends IWorld {
  browser: Browser;
  context: BrowserContext;
  page: Page;

  loginPage: LoginPage;
  homePage: HomePage;
  apiClient: ApiClient;
  registerPage: RegisterPage;
  contactPage: ContactPage;
  headerPage: HeaderPage;

  user?: TestUser;
  response?: ApiResponse;
  body?: ApiResponse;
}