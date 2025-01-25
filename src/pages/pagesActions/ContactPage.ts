import { Page, expect } from "@playwright/test";
import logger from "../../utils/LoggerUtil";
import ContactPageElements from "../elements/ContactPageElements";

export default class ContactPage {
  private elements: ContactPageElements;

  constructor(private page: Page) {
    this.elements = new ContactPageElements(page);
  }

  async createNewContact(fname: string, lname: string) {
    await this.elements.contactsLink.click();
    await this.elements.newButton.click();
    logger.info("New button is clicked");

    await this.elements.firstNameTextField.click();
    await this.elements.firstNameTextField.fill(fname);
    logger.info(`First name is filled as ${fname}`);

    await this.elements.firstNameTextField.press('Tab');
    await this.elements.lastNameTextField.fill(lname);
    logger.info(`Last name is filled as ${lname}`);

    await this.elements.saveButton.click()
      .catch((error) => {
        logger.error(`Error clicking Save button: ${error}`);
        throw error;
      })
      .then(() => logger.info("Save Button is clicked"));
  }

  async expectContactLabelContainsFirstNameAndLastName(fname: string, lname: string) {
    await expect(this.elements.contactFullNameLabel).toContainText(`${fname} ${lname}`);
    logger.info(`New contact created and ${fname} ${lname} is visible`);
    
    await this.elements.contactsLink.click();
  }

  async findExistingContactByLastName(lname: string) {
    await this.elements.contactsLink.click();
    await this.elements.searchBox.click();
    await this.elements.searchBox.fill(lname);
    await this.elements.searchBox.press("Enter");
    await this.page.getByRole("link", { name: lname }).click(); 
  }
}
