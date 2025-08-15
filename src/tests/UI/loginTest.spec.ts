import { test } from "../../fixtures/loginFixture";
import { decrypt } from "../../utils/CryptojsUtil";
import logger from "../../utils/LoggerUtil";
import { encryptEnvFile } from "../../utils/EncryptEnvFile";

const authFile = "src/config/auth.json";

test("Login test and save auth", async ({ page, homePage }) => {
  await homePage.expectServiceTitleToBeVisible();
  logger.info("Login completed");
  await page.context().storageState({ path: authFile });
  logger.info("Auth saved");
});

test("Encrypt env", async () => {
  encryptEnvFile();
});
