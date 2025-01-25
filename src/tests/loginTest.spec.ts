import { test } from '@playwright/test';
import LoginPage from '../pages/pagesActions/LoginPage';
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";

test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.username!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    
    logger.info("Test for login is completed");
    logger.info("Auth state is saved");
  });