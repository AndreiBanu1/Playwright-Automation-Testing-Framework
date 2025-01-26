import { test, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

test("API Monitoring test", async ({ page }) => {
  page.on("request", (request) => {
    logger.info(`Requested Url is ${request.url()}`);
    logger.info(`Requested method is ${request.method()}`);
    logger.info(
      `Request headers is ${JSON.stringify(request.headers(), null, 2)}`
    );
  });

  page.on("response", (response) => {
    logger.info(`Response status is ${response.status()}`);
  });

  await page.goto("/");
});

test("API Intercepting test", async ({ page }) => {
    // Enable request interception
    await page.route("**/*", async (route) => {
      // Get the original headers of the request
      const headers = route.request().headers();
  
      // Add a custom header
      headers["X-Custom-Header"] = "integration-check";
      
      // Log the modified headers
      console.log("Modified headers:", headers);
  
      // Continue the request with the modified headers
      await route.continue({ headers });
    });
  
    // Log request details whenever a request is made
    page.on('request', (request) => {
      logger.info(
        `Modified Request headers: ${JSON.stringify(request.headers(), null, 2)}\n` +
        `Modified Request method: ${request.method()}`
      );
    });
  
    // Go to the desired page (replace with your actual URL)
    await page.goto('https://example.com'); // Replace with your actual base URL
  
    // Wait for the network to be idle before ending the test
    await page.waitForLoadState('networkidle');
  });

test("API Mocking test", async ({ page }) => {
  page.route(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits",
    async (route) => {
      const json = [
        {name: "Mandarin", id: 3},
        {name: "Tangerine",id: 1},
        {name: "Clementines",id: 5},
      ];

      await route.fulfill({ json });
    }
  );

  await page.goto("https://demo.playwright.dev/api-mocking/");
  await page.waitForLoadState('networkidle');
});

