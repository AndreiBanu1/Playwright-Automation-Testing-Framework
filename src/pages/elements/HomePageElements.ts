import { Page } from "@playwright/test";

export default class HomePageElements {

    constructor(private page: Page) {

    }

    getServiceTitle() {
        return this.page.getByTitle("Service");
    }

    getAppLauncher() {
        return this.page.getByTitle("App Launcher");
    }

    getAppLauncherSearchField() {
        return this.page.getByPlaceholder("Search apps and items...");
    }

    getContactsLink() {
        return this.page.locator('a[href="/lightning/o/Contact/home"]');
    }
}
