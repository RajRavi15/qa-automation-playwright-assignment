import { ApiClient } from '../client/apiClient';

export class ProductAPI {
  constructor(private api: ApiClient) {}

  async getAllProducts() {
    return this.api.get('/api/productsList');
  }

  async postProductsList() {
    return this.api.post('/api/productsList');
  }

  async getAllBrands() {
  return this.api.get('/api/brandsList');
  }

  async putBrandsList() {
    return this.api.put('/api/brandsList');
  }

  async searchProduct(text: string) {
  return this.api.post('/api/searchProduct', { search_product: text });
  }

  async searchWithoutParam() {
  return this.api.post('/api/searchProduct');
  }
}