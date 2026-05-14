import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('User navigate to Salesforce Application', async function (this: CustomWorld) {
  await this.loginPage.navigateToSalesforce();
});


Given('User Login as {string}', async function (this: CustomWorld, userAlias: string) {
  await this.loginPage.loginAs(userAlias);
});

Given('User closes all open tabs', async function (this: CustomWorld) {
  await this.loginPage.closeAllTabsExceptCurrent();
});
