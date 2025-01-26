import { Page } from "@playwright/test";
import CasePageElements from "../elements/CasePageElements";

export default class CasePage {
  private casePageElements: CasePageElements;

  constructor(private page: Page) {
    this.casePageElements = new CasePageElements(page);
  }

  async createNewCaseFromContactDetailPage(caseOrigin: string, productName: string, caseType: string) {
    await this.casePageElements.newButton.click();
    await this.selectCaseOrigin(caseOrigin);
    await this.selectProduct(productName);
    await this.selectCaseType(caseType);
    await this.casePageElements.saveButton.click();
  }

  private async selectCaseOrigin(caseOrigin: string) {
    await this.casePageElements.caseOriginDropdown.click();
    await this.page.getByRole("option", { name: caseOrigin }).locator("span").nth(1).click();
  }

  private async selectProduct(productName: string) {
    await this.casePageElements.caseProductDropdown.click();
    await this.page.getByRole("option", { name: productName }).locator("span").nth(1).click();
  }

  private async selectCaseType(caseType: string) {
    await this.casePageElements.caseTypeDropdown.click();
    await this.page.getByRole("option", { name: caseType }).locator("span").nth(1).click();
  }
}
