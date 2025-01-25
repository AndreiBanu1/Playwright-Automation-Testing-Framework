import { Page, expect } from "@playwright/test";
import HomePageElements from "../elements/HomePageElements";

export default class HomePage {
     private elements: HomePageElements;

    constructor(private page: Page) {
        this.elements = new HomePageElements();
    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.elements.getServiceTitle())).toBeVisible({timeout: 15000});
    }
    
}