import { expect, test } from '@playwright/test';
import { BASE_URL } from '../../src/config/urls';

/** Lets `playwright test` emit `playwright-report/`; main suite is Cucumber (`npm test`). */
test('example.com smoke', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});
