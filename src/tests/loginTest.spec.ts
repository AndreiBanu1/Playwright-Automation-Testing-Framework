import { expect, test } from '@playwright/test';
import LoginPage from '../pages/pagesActions/LoginPage';
import { decrypt } from "../utils/CryptojsUtil";
import logger from "../utils/LoggerUtil";
import { encryptEnvFile } from '../utils/EncryptEnvFile';

const authFile = "src/config/auth.json";

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
    await page.context().storageState({ path: authFile});
    logger.info("Auth state is saved");
  });

  test.skip("Login with auth file", async ({ browser }) => {
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    await page.goto(
      "https://samsung2-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home"
    );
    await expect(page.getByRole("link", { name: "Accounts" })).toBeVisible();
  });

  test("Encryption test", async ({ page }) => {
   encryptEnvFile()
  });