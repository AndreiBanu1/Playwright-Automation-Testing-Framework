import { Page } from "@playwright/test";

export default class ContactPageElements {
  constructor(private page: Page) {}

  get contactsLink() {
    return this.page.getByRole('link', { name: "Contacts" });
  }

  get newButton() {
    return this.page.getByRole('button', { name: "New" });
  }

  get firstNameTextField() {
    return this.page.getByPlaceholder("First Name");
  }

  get lastNameTextField() {
    return this.page.getByPlaceholder("Last Name");
  }

  get saveButton() {
    return this.page.getByRole('button', { name: "Save", exact: true });
  }

  get searchBox() {
    return this.page.getByPlaceholder("Search this list...");
  }

  get contactFullNameLabel() {
    return this.page.locator("lightning-formatted-name");
  }

  get contactDisplayName() {
    return this.page.locator("#brandBand_2");
  }
}
