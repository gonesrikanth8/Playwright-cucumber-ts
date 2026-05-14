import { BasePage } from './base.page';
import { SALESFORCE_URL } from '../config/urls';

function credentialEnvKey(alias: string): string {
  return alias
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toUpperCase();
}

export function credentialsForAlias(alias: string): {
  username: string;
  password: string;
} {
  const key = credentialEnvKey(alias);
  const username =
    process.env[`SALESFORCE_USER_${key}_USERNAME`] ??
    process.env[`USER_${key}_USERNAME`];
  const password =
    process.env[`SALESFORCE_USER_${key}_PASSWORD`] ??
    process.env[`USER_${key}_PASSWORD`];

  if (!username || !password) {
    throw new Error(
      `Missing credentials for "${alias}". Set SALESFORCE_USER_${key}_USERNAME and SALESFORCE_USER_${key}_PASSWORD (or USER_${key}_USERNAME / PASSWORD)`
    );
  }
  return { username, password };
}

export class LoginPage extends BasePage {
  async navigateToSalesforce(): Promise<void> {
    await this.page.goto(SALESFORCE_URL, { waitUntil: 'domcontentloaded' });
  }

  async loginAs(alias: string): Promise<void> {
    const { username, password } = credentialsForAlias(alias);

    const userLocator = this.page
      .locator('#username')
      .or(this.page.locator('input[name="username"]'))
      .first();
    await userLocator.fill(username);

    const nextBtn = this.page.getByRole('button', { name: /^next$/i });
    if (await nextBtn.isVisible().catch(() => false)) {
      await nextBtn.click();
    }

    const passLocator = this.page
      .locator('#password')
      .or(this.page.locator('input[name="pw"]'))
      .first();
    
    await passLocator.waitFor({ state: 'visible', timeout: 15_000 });
    await passLocator.fill(password);

    const loginBtn = this.page
      .locator('#Login')
      .or(this.page.getByRole('button', { name: /^log in$/i }))
      .first();

    await loginBtn.click();

    await this.page.waitForLoadState('networkidle', { timeout: 60_000 }).catch(() => undefined);
  }

  async closeAllTabsExceptCurrent(): Promise<void> {
    const context = this.page.context();
    const keep = this.page;
    for (const p of context.pages()) {
      if (p !== keep) {
        await p.close().catch(() => undefined);
      }
    }
  }
}
