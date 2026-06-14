const { chromium, expect } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    console.log('goto home');
    await page.goto('https://automationexercise.com/', { waitUntil: 'load', timeout: 60000 });
    console.log('after goto', page.url());
    const logo = page.locator('img[alt="Website for automation practice"]');
    console.log('logo count', await logo.count());
    try {
      await expect(logo).toBeVisible({ timeout: 30000 });
      console.log('logo visible OK');
    } catch (err) {
      console.error('expect failed', err.message);
      const html = await page.content();
      console.log('page html length', html.length);
    }
  } catch (err) {
    console.error('goto failed', err.message);
  } finally {
    await browser.close();
  }
})();
