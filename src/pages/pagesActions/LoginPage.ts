import { Page } from "@playwright/test";
import HomePage from "./HomePage";
import LoginPageElements from "../elements/LoginPageElements";
import logger from "../../utils/LoggerUtil";

export default class LoginPage {
    private elements: LoginPageElements;

    constructor(private page: Page) {
        this.elements = new LoginPageElements();
    }

    async navigateToLoginPage() {
        await this.page.goto(process.env.url!);
    }

    async fillUsername(username: string) {
        await this.page.locator(this.elements.getUsernameInput()).fill(username);
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
