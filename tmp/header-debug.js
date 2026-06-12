const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  const products = page.locator('a', { hasText: 'Products' });
  console.log('products count', await products.count());
  for (let i = 0; i < await products.count(); i++) {
    const text = await products.nth(i).innerText();
    console.log('products link', i, text, 'visible', await products.nth(i).isVisible());
    console.log('href', await products.nth(i).getAttribute('href'));
  }
  const headerProducts = page.locator('header').locator('text=Products');
  console.log('header products count', await headerProducts.count());
  const types = await headerProducts.evaluateAll(nodes => nodes.map(n=>({tag:n.tagName, text:n.textContent, role:n.getAttribute('role'), href:n.getAttribute('href'), class:n.className})));
  console.log(types);
  try {
    await Promise.all([
      page.waitForURL('**/products', { timeout: 15000 }),
      headerProducts.first().click({ timeout: 10000 }),
    ]);
    console.log('navigated to', page.url());
  } catch (e) {
    console.error('click error', e.message);
  }
  await browser.close();
})();
