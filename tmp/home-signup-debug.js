const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/', { waitUntil: 'load', timeout: 60000 });
  const signupLink = page.getByRole('link', { name: 'Signup / Login' });
  console.log('signup link count', await signupLink.count());
  console.log('signup visible', await signupLink.isVisible());
  console.log('signup href', await signupLink.first().getAttribute('href'));
  const loaders = await page.locator('.loader').count();
  console.log('loader count', loaders);
  console.log('content snippet', await page.locator('body').innerText().then(t=>t.slice(0,200)));
  await browser.close();
})();
