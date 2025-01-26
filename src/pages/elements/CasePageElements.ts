import { Page, Locator } from "@playwright/test";

export default class CasePageElements {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get caseLink(): Locator {
    return this.page.getByLabel("Cases");
  }

  get newButton(): Locator {
    return this.page.getByRole("button", { name: "New" });
  }

  get caseOriginDropdown(): Locator {
    return this.page.getByLabel("Case Origin - Current");
  }

  get caseProductDropdown(): Locator {
    return this.page.getByLabel("Product - Current Selection");
  }

  get caseTypeDropdown(): Locator {
    return this.page.getByLabel("Type - Current Selection: --");
  }

  get saveButton(): Locator {
    return this.page.getByRole("button", { name: "Save", exact: true });
  }

  get contactFullNameLabel(): Locator {
    return this.page.locator(".sfa-output-name-with-hierarchy-icon-wrapper");
  }
}
