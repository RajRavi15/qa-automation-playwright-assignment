const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  console.log('navigating to login page');
  const response = await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('login status', response && response.status());
  console.log('url', page.url());
  console.log('title', await page.title());
  console.log('signup form count', await page.locator('form').count());
  const forms = await page.locator('form').all();
  for (let i = 0; i < forms.length; i++) {
    const text = await forms[i].innerText();
    console.log('form', i, 'text:', text.slice(0, 200).replace(/\n/g, ' '));
  }
  const signupButton = page.locator('form button:has-text("Signup")');
  console.log('signup buttons count', await signupButton.count());
  console.log('form has text Signup count', await page.locator('form', { hasText: 'Signup' }).count());
  console.log('name placeholder exists', await page.locator('[placeholder="Name"]').count());
  console.log('email placeholder exists', await page.locator('[placeholder="Email Address"]').count());
  await page.goto('https://automationexercise.com/products', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('products loaded url', page.url());
  console.log('product count', await page.locator('.product-image-wrapper').count());
  console.log('view product buttons', await page.locator('text=View Product').count());
  const firstView = page.locator('text=View Product').first();
  console.log('first view visible', await firstView.isVisible());
  console.log('first view bounding box', await firstView.boundingBox());
  await page.locator('.product-image-wrapper').first().scrollIntoViewIfNeeded();
  await page.locator('.product-image-wrapper').first().hover();
  await page.waitForTimeout(1000);
  await firstView.click({ force: true });
  await page.waitForTimeout(3000);
  console.log('post-click url', page.url());
  console.log('product info h2 count', await page.locator('.product-information h2').count());
  console.log('product info span span count', await page.locator('.product-information span span').count());
  console.log('product info html', await page.locator('.product-information').innerHTML().catch(e=>e.message));
  await browser.close();
})();
