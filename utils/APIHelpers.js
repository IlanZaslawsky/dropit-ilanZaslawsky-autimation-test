const { request } = require('@playwright/test');

class APIHelpers {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async sendRequest(method, endpoint, data = null) {
    const context = await request.newContext();
    const response = await context[method.toLowerCase()](`${this.baseURL}${endpoint}`, {
      data: data || undefined,
    });
    await context.dispose();

    if (!response.ok()) {
      const errorText = await response.text();
      throw new Error(`Failed request [${method} ${endpoint}]: ${errorText}`);
    }

    return response;
  }

  async createPet(petData) {
    return await this.sendRequest('POST', '/pet', petData);
  }

  async findPetsByStatus(status) {
    return await this.sendRequest('GET', `/pet/findByStatus?status=${status}`);
  }

  async updatePet(petData) {
    return await this.sendRequest('PUT', '/pet', petData);
  }
}
module.exports = APIHelpers;
