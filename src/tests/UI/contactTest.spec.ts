import { test } from "../../fixtures/contactFixture";
import cdata from "../../testdata/datademo.json";
import logger from "../../utils/LoggerUtil";

for (const contact of cdata) {
  test(`Create contact: ${contact.firstName}`, async ({ contactPage }) => {
    logger.info("Creating contact...");
    await contactPage.createNewContact(contact.firstName, contact.lastName);
    await contactPage.expectContactLabelContainsFirstNameAndLastName(contact.firstName, contact.lastName);
  });
}
