import { test, expect } from "@playwright/test";
import ContactApi from "../../api/ContactApi";
import { getSalesforceAccessToken } from "../../utils/salesforceAuth";

test("Create contact via API", async ({ playwright }) => {
  const { accessToken, instanceUrl } = await getSalesforceAccessToken();

  const apiContext = await playwright.request.newContext({
    baseURL: `${instanceUrl}/services/data/v59.0`,
    extraHTTPHeaders: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const contactApi = new ContactApi(apiContext);
  const contactId = await contactApi.createContact({
    FirstName: "API",
    LastName: "Tester",
    Email: "api.tester@example.com",
  });

  const contact = await contactApi.getContactById(contactId);
  expect(contact.LastName).toBe("Tester");

  await contactApi.deleteContact(contactId);

  await apiContext.dispose();
});
