import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I open the example domain page', async function (this: CustomWorld) {
  await this.examplePage.open();
});

Then('I see the heading {string}', async function (this: CustomWorld, text: string) {
  await expect(this.examplePage.heading(text)).toBeVisible();
});
