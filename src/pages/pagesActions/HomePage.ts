import { Page, expect } from "@playwright/test";
import HomePageElements from "../elements/HomePageElements";
import logger from "../../utils/LoggerUtil";

export default class HomePage {
     private elements: HomePageElements;

    constructor(private page: Page) {
        this.elements = new HomePageElements();
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.elements.getServiceTitle())).toBeVisible({timeout: 15000})
        .catch((error) => {
            logger.error(`Error waiting for Service Title to be visible: ${error}`);
            throw error;
        }).then(() => logger.info("Service Title is visible"));
    }
    
}