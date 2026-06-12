import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../types/world';
import { ApiClient } from '../api/client/apiClient';
import { UserAPI } from '../api/endpoints/user.api';

let response: any;
let body: any;
let email: string;

// INIT ONCE (BEST PRACTICE)
Before(async function (this: CustomWorld) {
  this.apiClient = new ApiClient();
  await this.apiClient.init();
});

// ================= REQUESTS =================

Given('user sends GET request to {string}', async function (this: CustomWorld, endpoint: string) {
  response = await this.apiClient.get(endpoint);
  body = await response.json();
});

Given('user sends POST request to {string}', async function (this: CustomWorld, endpoint: string) {
  response = await this.apiClient.post(endpoint);
  body = await response.json();
});

Given('user sends PUT request to {string}', async function (this: CustomWorld, endpoint: string) {
  response = await this.apiClient.put(endpoint);
  body = await response.json();
});

Given('user sends POST request to {string} with search term {string}', async function (this: CustomWorld, endpoint: string, term: string) {
  response = await this.apiClient.post(endpoint, { search_product: term });
  body = await response.json();
});

Given('user sends POST request to {string} without body', async function (this: CustomWorld, endpoint: string) {
  response = await this.apiClient.post(endpoint);
  body = await response.json();
});

Given('user sends POST request to {string} with invalid credentials', async function (this: CustomWorld, endpoint: string) {
  response = await this.apiClient.post(endpoint, {
    email: 'invalid@test.com',   
    password: 'wrong123'
  });

  body = await response.json();
});

// ================= ASSERTIONS =================

Then('response status should be {int}', function (status: number) {
  expect(response.status()).toBe(status);
});

Then('response code should be {int}', function (code: number) {
  expect(body.responseCode).toBe(code);
});

Then('products list should be an array', function () {
  expect(Array.isArray(body.products)).toBeTruthy();
});

Then('each product should contain id, name, price and brand', function () {
  const product = body.products[0];
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('brand');
});

Then('brands list should be an array', function () {
  expect(Array.isArray(body.brands)).toBeTruthy();
});

Then('each brand should contain brand name', function () {
  expect(body.brands[0]).toHaveProperty('brand');
});

Then('products list should be returned', function () {
  expect(body.products.length).toBeGreaterThan(0);
});

Then('matching products should be present', function () {
  expect(body.products.length).toBeGreaterThan(0);
});

Then('error message should be present', function () {
  expect(body.message).toBeDefined();
});

Then('validation error message should be returned', function () {
  expect(body.message).toBeDefined();
});

Then('error message should contain {string}', function (msg: string) {
  expect(body.message).toContain(msg);
});

// ================= USER LIFECYCLE =================

Given('user creates a new account', async function (this: CustomWorld) {
  const userAPI = new UserAPI(this.apiClient);

  email = `test${Date.now()}@yopmail.com`;

  response = await userAPI.createUser({
    name: 'Test User',
    email,
    password: '123456',
    title: 'Mr',
    birth_date: '1',
    birth_month: '1',
    birth_year: '2000',
    firstname: 'Test',
    lastname: 'User',
    company: 'TestCo',
    address1: 'Noida',
    country: 'India',
    zipcode: '201301',
    state: 'UP',
    city: 'Noida',
    mobile_number: '9999999999'
  });

  body = await response.json();
});

Then('create account response code should be {int}', function (code: number) {
  expect(body.responseCode).toBe(code);
});

When('user updates the account', async function (this: CustomWorld) {
  const userAPI = new UserAPI(this.apiClient);

  response = await userAPI.updateUser({
    email,
    password: '123456'
  });

  body = await response.json();
});

Then('update account response code should be {int}', function (code: number) {
  expect(body.responseCode).toBe(code);
});

When('user fetches user details by email', async function (this: CustomWorld) {
  const userAPI = new UserAPI(this.apiClient);

  response = await userAPI.getUserByEmail(email);
  body = await response.json();
});

Then('get user response code should be {int}', function (code: number) {
  expect(body.responseCode).toBe(code);
});

When('user deletes the account', async function (this: CustomWorld) {
  const userAPI = new UserAPI(this.apiClient);

  response = await userAPI.deleteUser({
    email,
    password: '123456'
  });

  body = await response.json();
});

Then('delete account response code should be {int}', function (code: number) {
  expect(body.responseCode).toBe(code);
});