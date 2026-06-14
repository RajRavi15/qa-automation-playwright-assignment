const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/', { waitUntil: 'load', timeout: 60000 });
  const logo = page.locator('img[alt="Website for automation practice"]');
  console.log('logo count', await logo.count());
  if (await logo.count() > 0) {
    console.log('visible', await logo.isVisible());
    console.log('outerHTML', await logo.first().evaluate(node => node.outerHTML));
  }
  console.log('home title', await page.title());
  console.log('content includes logo alt', (await page.content()).includes('Website for automation practice'));
  await browser.close();
})();
