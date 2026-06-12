import { Given, When, Then} from '@cucumber/cucumber';
import { generateUser } from '../utils/dataGenerator';
import path from 'path';

Given('user is on contact us page', async function () {
  await this.contactPage.navigate();
});

When('user fills contact form', async function () {
  const user = generateUser();

  await this.contactPage.fillContactForm(
    user.name,
    user.email,
    'Automation Test',
    'This is a test message'
  );
});

When('user uploads a file', async function () {
  const filePath = path.resolve('src/test-data/account.png');
  await this.contactPage.uploadFile(filePath);
  
});

When('user submits the form', async function () {
});

When('user accepts the confirmation alert', async function () {
  await this.contactPage.submitFormAccept();
});

Then('success message should be displayed', async function () {
  await this.contactPage.verifySuccessMessage();
});

When('user dismisses the confirmation alert', async function () {
  await this.contactPage.submitFormDismiss();
});

Then('form should not be submitted', async function () {
  await this.contactPage.verifyFormNotSubmitted();
});