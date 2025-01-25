import { Page, expect } from "@playwright/test";
import HomePageElements from "../elements/HomePageElements";
import ContactPage from "./ContactPage";
import ContactPageElements from "../elements/ContactPageElements";
import logger from "../../utils/LoggerUtil";

export default class HomePage {
    private elements: HomePageElements;
    private contactElements: ContactPageElements;

    constructor(private page: Page) {
        this.elements = new HomePageElements(page);
        this.contactElements = new ContactPageElements(page);
    }

    async expectServiceTitleToBeVisible() {
        await expect((this.elements.getServiceTitle())).toBeVisible({timeout: 15000})
        .catch((error) => {
            logger.error(`Error waiting for Service Title to be visible: ${error}`);
            throw error;
        }).then(() => logger.info("Service Title is visible"));
    }

    async navigateToContactTab() {
        await this.elements.getAppLauncher().click();
        logger.info("App Launcher is opened");
        await this.elements.getAppLauncherSearchField().fill("Contacts");
        await this.elements.getContactsLink().click();
        logger.info("Contacts Tab is clicked.");
        return new ContactPage(this.page);
    }
}
