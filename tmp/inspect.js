const { chromium } = require('playwright');
const { request } = require('undici');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log('Home page checking...');
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('logo count', await page.locator('img[alt="Website for automation practice"]').count());
  console.log('banner count', await page.locator('#slider-carousel').count());
  console.log('categories count', await page.locator('.left-sidebar').count());

  console.log('Contact page checking...');
  await page.goto('https://automationexercise.com/contact_us', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('contact form count', await page.locator('.contact-form').count());
  console.log('file input count', await page.locator('input[type="file"]').count());
  console.log('file label count', await page.locator('label:has-text("Choose File")').count());
  console.log('submit button count', await page.getByRole('button', { name: 'Submit' }).count());

  await browser.close();

  const endpoints = [
    '/api/productsList',
    '/api/brandsList',
    '/api/searchProduct',
    '/api/verifyLogin',
  ];
  for (const endpoint of endpoints) {
    const url = 'https://automationexercise.com' + endpoint;
    try {
      const res = await request(url, { method: endpoint === '/api/searchProduct' ? 'POST' : 'GET', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: endpoint === '/api/searchProduct' ? 'search_product=top' : undefined });
      const text = await res.body.text();
      console.log('endpoint', endpoint, 'status', res.status, 'startsWith', text.slice(0,50));
    } catch (error) {
      console.log('endpoint', endpoint, 'error', error.message);
    }
  }
})();
