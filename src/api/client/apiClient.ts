import { request, APIRequestContext } from '@playwright/test';

export class ApiClient {
  private request!: APIRequestContext;

  async init() {
    this.request = await request.newContext({
      baseURL: 'https://automationexercise.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    });
  }

  async get(url: string) {
    return await this.request.get(url);
  }

  async post(url: string, data?: Record<string, string>) {
    return await this.request.post(url, {
      form: data
    });
  }

  async put(url: string, data?: Record<string, string>) {
    return await this.request.put(url, {
      form: data
    });
  }

  async delete(url: string, data?: Record<string, string>) {
    return await this.request.delete(url, {
      form: data
    });
  }
}