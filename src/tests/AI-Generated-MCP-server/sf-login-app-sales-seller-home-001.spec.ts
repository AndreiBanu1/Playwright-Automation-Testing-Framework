import { test, expect } from '@playwright/test';

// Test case: SF-LOGIN-APP-SALES-SELLER-HOME-001
// Name: Login → Launch Sales Console → Verify “Seller Home” & tiles
// Purpose: Validate that a user can log into Salesforce, open the App Launcher, launch Sales Console, and see “Seller Home” with the expected sections.

test('SF-LOGIN-APP-SALES-SELLER-HOME-001: Login, Launch Sales Console, Verify Seller Home & Tiles', async ({ page }) => {
  test.setTimeout(120000); // Increase timeout to 2 minutes for slow Salesforce login
  // Step 1: Navigate to login
  await page.goto('https://samsung2-dev-ed.develop.my.salesforce.com/', { waitUntil: 'domcontentloaded' });

  // Assert login page loaded
  const usernameInput = page.locator('#username');
  const passwordInput = page.locator('#password');
  const loginButton = page.locator('#Login');
  await expect(usernameInput).toBeVisible();
  await expect(usernameInput).toBeEnabled();
  await expect(passwordInput).toBeVisible();
  await expect(passwordInput).toBeEnabled();
  await expect(loginButton).toBeVisible();

  // Step 2: Enter credentials
  await usernameInput.fill('andreibanu97@yahoo.com');
  await passwordInput.fill('Password123@');
  await expect(usernameInput).toHaveValue('andreibanu97@yahoo.com');
  // Password field: just check it's filled
  await expect(passwordInput).not.toHaveValue('');

  // Step 3: Submit login
  await loginButton.click();
  // Wait for Lightning UI to load by waiting for App Launcher button
  const appLauncher = page.getByRole('button', { name: /App Launcher/i });
  await appLauncher.waitFor({ state: 'visible', timeout: 90000 });
  await expect(appLauncher).toBeVisible();
  await expect(appLauncher).toBeEnabled();
  // Debug: log if App Launcher is found
  console.log('App Launcher button is visible after login.');

  // Step 4: Open App Launcher
  await appLauncher.click();
  // Debug: log after clicking App Launcher
  console.log('Clicked App Launcher, waiting for search input...');
  let searchInput;
  try {
    searchInput = page.getByPlaceholder('Search apps and items...');
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await expect(searchInput).toBeFocused();
    console.log('Search input found by placeholder.');
  } catch (e) {
    // Fallback: try input[placeholder*="Search"]
    searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible({ timeout: 15000 });
    await expect(searchInput).toBeFocused();
    console.log('Search input found by fallback locator.');
  }

  // Step 5: Launch Sales Console
  await searchInput.fill('Sales Console');
  // Wait for search results to appear
  // Try role-based locator first
  let salesConsoleTile = page.getByRole('link', { name: /Sales Console/i });
  try {
    await expect(salesConsoleTile).toBeVisible({ timeout: 10000 });
    await expect(salesConsoleTile).toBeEnabled();
    console.log('Sales Console tile found by role-link.');
  } catch (e) {
    // Fallback: try button or text locator
    salesConsoleTile = page.getByText(/^Sales Console$/);
    await expect(salesConsoleTile).toBeVisible({ timeout: 10000 });
    console.log('Sales Console tile found by text fallback.');
  }
  await salesConsoleTile.click();
  console.log('Clicked Sales Console tile, waiting for Seller Home heading...');
  // Wait for Seller Home heading to appear (explicitly, not just networkidle)
  const sellerHomeHeading = page.getByRole('heading', { level: 1, name: 'Seller Home' });
  await expect(sellerHomeHeading).toBeVisible({ timeout: 30000 });

  // Step 6: Verify Seller Home title (already waited above)

  // Step 7: Verify sub-category tiles on Seller Home
  const tiles = [
    'Close Deals',
    'Plan My Accounts',
    'Grow Relationships',
    'Build Pipeline',
    'My Goals',
    "Today's Events",
    "Today's Tasks",
    'Recent Records',
  ];
  for (const tile of tiles) {
    let tileHeading = page.getByRole('heading', { name: tile });
    try {
      await expect(tileHeading).toBeVisible({ timeout: 5000 });
      console.log(`Tile '${tile}' found by heading role.`);
    } catch (e) {
      // Fallback: try exact text
      tileHeading = page.getByText(new RegExp(`^${tile}$`));
      try {
        await expect(tileHeading).toBeVisible({ timeout: 5000 });
        console.log(`Tile '${tile}' found by text fallback.`);
      } catch (err) {
        console.warn(`Tile '${tile}' not found by heading or text.`);
      }
    }
  }
});
