import { test } from '@playwright/test';
import LoginPage from '../pages/pagesActions/LoginPage';

test("Login test", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(process.env.userid!);
    await loginPage.fillPassword(process.env.password!);

    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleToBeVisible();
});