import { test as base, Page } from "@playwright/test";
import LoginPage from "../pages/pagesActions/LoginPage";
import HomePage from "../pages/pagesActions/HomePage"; 
import { decrypt } from "../utils/CryptojsUtil";

const test = base.extend<{ homePage: HomePage }>({
  homePage: async (
    { page }: { page: Page },
    use: (homePage: HomePage) => Promise<void>
  ) => {
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.quickLogin(
      decrypt(process.env.userid!),
      decrypt(process.env.password!)
    );
    await homePage.expectServiceTitleToBeVisible();
    await use(homePage);
  },
});

export { test };
