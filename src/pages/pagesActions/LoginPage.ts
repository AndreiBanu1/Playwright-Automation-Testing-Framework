import { Page, expect } from "@playwright/test";
import HomePage from "./HomePage";
import LoginPageElements from "../elements/LoginPageElements";
import logger from "../../utils/LoggerUtil";
import { decrypt } from "../../utils/CryptojsUtil";
import findValidElement from "../../utils/SelfHealingUtil";

export default class LoginPage {
    private elements: LoginPageElements;

    constructor(private page: Page) {
        this.elements = new LoginPageElements();
    }

    async navigateToLoginPage() {
        console.log("Encrypted URL:", process.env.url);
        console.log("Decrypted URL:", decrypt(process.env.url!));
        await this.page.goto(decrypt(process.env.url!));
    }

    async quickLogin(username: string, password: string) {
        await this.navigateToLoginPage();
        await this.fillUsername(username);
        await this.fillPassword(password);
        return await this.clickLoginButton();
      }

    async fillUsername(username: string) {
        await this.page.locator(this.elements.getUsernameInput()).fill(username);
    }

    async fillUsername_selfheal(username: string) {
        let usernameInputLocator = await findValidElement(this.page, this.elements.getUsernameInputs());
        await usernameInputLocator?.fill(username);
        const enteredValue = await usernameInputLocator?.inputValue();
        expect(enteredValue).toBe(username);
      }

    async fillPassword(password: string) {
        await this.page.locator(this.elements.getPasswordInput()).fill(password);
    }

    async clickLoginButton() {
        await this.page
            .locator(this.elements.getLoginButton())
            .click()
            .catch((error) => {
                console.error(`Error clicking the login button: ${error}`);
                throw error;
            }).then(() => logger.info("Clicked login button"));

        return new HomePage(this.page);
    }
}
