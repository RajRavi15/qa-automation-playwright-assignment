import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../types/world';

// ================= WHEN =================

When('user clicks on {string} menu', async function (this: CustomWorld, menu: string) {
  if (menu === 'Products') {
    await this.headerPage.clickProducts();
  }
});

// ================= THEN =================

Then('user should be navigated to products page', async function (this: CustomWorld) {
  await this.headerPage.verifyOnProductsPage();
});