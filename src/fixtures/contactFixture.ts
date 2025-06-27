import { test as base } from '@playwright/test';
import ContactPage from '../pages/pagesActions/ContactPage';
import { test as loginTest } from './loginFixture';

type Fixtures = {
  contactPage: ContactPage;
};

export const test = loginTest.extend<Fixtures>({
  contactPage: async ({ homePage }, use) => {
    const contactPage = await homePage.navigateToContactTab();
    await use(contactPage);
  },
});
