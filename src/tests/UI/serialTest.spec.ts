import { test } from "../fixtures/serialLoginFixture";
import ContactPage from "../pages/pagesActions/ContactPage";
import CasePage from "../pages/pagesActions/CasePage";
import testdata from "../testdata/contactCaseFlow.json";

let contactPage: ContactPage;

test.describe.configure({ mode: "serial" });

test("Create Contact and Open", async ({ homePage }) => {
  contactPage = await homePage.navigateToContactTab();
  await contactPage.createNewContact(testdata.contactFName, testdata.contactLName);
  await contactPage.expectContactLabelContainsFirstNameAndLastName(testdata.contactFName, testdata.contactLName);
  await contactPage.findExistingContactByLastName(testdata.contactLName);
});

test("Create Case", async () => {
  const casePage = new CasePage(contactPage.getPage());
  await casePage.createNewCaseFromContactDetailPage(testdata.caseOrigin, testdata.caseProduct, testdata.caseType);
});
