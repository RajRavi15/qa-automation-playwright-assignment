import { ApiClient } from '../client/apiClient';

export class UserAPI {
  constructor(private api: ApiClient) {}

  async createUser(data: Record<string, string>) {
    return this.api.post('/api/createAccount', data);
  }

  async updateUser(data: Record<string, string>) {
  return this.api.put('/api/updateAccount', data);
  }

  async getUserByEmail(email: string) {
  return this.api.get(`/api/getUserDetailByEmail?email=${email}`);
  }

  async deleteUser(data: Record<string, string>) {
  return this.api.delete('/api/deleteAccount', data);
  }

  async verifyLogin(data: Record<string, string>) {
  return this.api.post('/api/verifyLogin', data);
  }
}