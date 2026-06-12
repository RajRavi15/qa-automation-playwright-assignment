const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const response = await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('status', response && response.status(), 'url', page.url());
    const logoCount = await page.locator('img[alt="Website for automation practice"]').count();
    console.log('logoCount', logoCount);
    if (logoCount > 0) {
      console.log('logo visible', await page.locator('img[alt="Website for automation practice"]').isVisible());
      console.log('logo src', await page.locator('img[alt="Website for automation practice"]').getAttribute('src'));
    }
    console.log('banner count', await page.locator('#slider-carousel').count());
    console.log('categories count', await page.locator('.left-sidebar').count());
    const html = await page.content();
    console.log('html contains home page title', html.includes('Automation Exercise'));
  } catch (e) {
    console.error('error', e.message);
  } finally {
    await browser.close();
  }
})();
