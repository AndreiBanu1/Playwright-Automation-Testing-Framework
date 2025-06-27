import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/pagesActions/LoginPage';
import HomePage from '../pages/pagesActions/HomePage';
import { decrypt } from '../utils/CryptojsUtil';

type Fixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await use(homePage);
  },
});

export { expect };
