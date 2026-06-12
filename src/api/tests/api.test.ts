import { test, expect } from '@playwright/test';
import { ApiClient } from '../client/apiClient';
import { ProductAPI } from '../endpoints/product.api';
import { UserAPI } from '../endpoints/user.api';
import {
  ProductsResponse,
  BrandsResponse,
  ApiResponse
} from '../types/api.types';

test.describe('@api @smoke @regression', () => {

  let apiClient: ApiClient;
  let productAPI: ProductAPI;
  let userAPI: UserAPI;

  test.beforeEach(async () => {
    apiClient = new ApiClient();
    await apiClient.init();

    productAPI = new ProductAPI(apiClient);
    userAPI = new UserAPI(apiClient);
  });

  // API-001
  test('API-001: Get all products', async () => {
    const res = await productAPI.getAllProducts();

    expect(res.status()).toBe(200);

    const body = await res.json() as ProductsResponse;

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String)
    });
  });

  // API-002 (Negative)
  test('API-002: POST products (should fail)', async () => {
    const res = await productAPI.postProductsList();

    expect(res.status()).toBe(200);

    const body = await res.json() as ApiResponse;

    expect(body.responseCode).toBe(405);
    expect(body.message).toBeDefined();
  });

  // API-003
  test('API-003: Get brands', async () => {
    const res = await productAPI.getAllBrands();

    expect(res.status()).toBe(200);

    const body = await res.json() as BrandsResponse;

    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
    expect(body.brands[0]).toHaveProperty('brand');
  });

  // API-004 (Negative)
  test('API-004: PUT brands (fail)', async () => {
    const res = await productAPI.putBrandsList();

    expect(res.status()).toBe(200);

    const body = await res.json() as ApiResponse;

    expect(body.responseCode).toBe(405);
    expect(body.message).toBeDefined();
  });

  // API-005
  test('API-005: Search product', async () => {
    const res = await productAPI.searchProduct('top');

    expect(res.status()).toBe(200);

    const body = await res.json() as ProductsResponse;

    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products[0]).toHaveProperty('name');
  });

  // API-006 (Negative)
  test('API-006: Search without param', async () => {
    const res = await productAPI.searchWithoutParam();

    expect(res.status()).toBe(200);

    const body = await res.json() as ApiResponse;

    expect(body.responseCode).toBe(400);
    expect(body.message).toBeDefined();
  });

  // API-007 (Lifecycle)
  test('API-007: User lifecycle', async () => {
    const email = `test${Date.now()}@yopmail.com`;

    const userData = {
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
    };

    // CREATE
    const createRes = await userAPI.createUser(userData);
    expect(createRes.status()).toBe(200);

    const createBody = await createRes.json() as ApiResponse;
    expect(createBody.responseCode).toBe(201);

    // UPDATE
    const updateRes = await userAPI.updateUser(userData);
    expect(updateRes.status()).toBe(200);

    const updateBody = await updateRes.json() as ApiResponse;
    expect(updateBody.responseCode).toBe(200);

    // GET
    const getRes = await userAPI.getUserByEmail(email);
    expect(getRes.status()).toBe(200);

    const getBody = await getRes.json() as ApiResponse;
    expect(getBody.responseCode).toBe(200);
    expect(getBody).toHaveProperty('user');

    // DELETE
    const deleteRes = await userAPI.deleteUser({
      email,
      password: '123456'
    });

    expect(deleteRes.status()).toBe(200);

    const deleteBody = await deleteRes.json() as ApiResponse;
    expect(deleteBody.responseCode).toBe(200);
  });

  // API-008 (Negative)
  test('API-008: Invalid login', async () => {
    const res = await userAPI.verifyLogin({
      email: 'invalid@test.com',
      password: 'wrong123'
    });

    expect(res.status()).toBe(200);

    const body = await res.json() as ApiResponse;

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found');
  });
});