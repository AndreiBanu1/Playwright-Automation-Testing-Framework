import { APIRequestContext, expect } from "@playwright/test";

export default class ContactApi {
  constructor(private request: APIRequestContext) {}

  async createContact(data: { FirstName: string; LastName: string; Email?: string }) {
    const response = await this.request.post("/sobjects/Contact", { data });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty("id");
    return body.id;
  }

  async getContactById(id: string) {
    const response = await this.request.get(`/sobjects/Contact/${id}`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async deleteContact(id: string) {
    const response = await this.request.delete(`/sobjects/Contact/${id}`);
    expect([204, 404]).toContain(response.status()); // 404 if already deleted
  }
}
