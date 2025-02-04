import { Page, Locator } from "@playwright/test";

export default class LoginPageElements {
  private readonly page: Page;
  private readonly usernameInputSelectors = ["#username",'input[name="username"]', ".username", "//*[@id='username]"];

  constructor(page: Page) {
    this.page = page;
  }

  get usernameInput(): Locator {
    return this.page.locator("#username");
  }

  get passwordInput(): Locator {
    return this.page.locator("#password");
  }

  get loginButton(): Locator {
    return this.page.locator("#Login");
  }

  get usernameInputs() {
    return this.usernameInputSelectors;
}

}
