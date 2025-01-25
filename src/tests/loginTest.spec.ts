import { test } from '@playwright/test';
import LoginPage from '../pages/pagesActions/LoginPage';
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import { decryptEnvFile, encryptEnvFile } from '../utils/EncryptEnvFile';

test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    console.log("Decrypted userid:", decrypt(process.env.userid!));
    console.log("Decrypted password:", decrypt(process.env.password!));
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
    
    logger.info("Test for login is completed");
    logger.info("Auth state is saved");
  });

  test("Encryption test", async ({ page }) => {
   encryptEnvFile()
  });