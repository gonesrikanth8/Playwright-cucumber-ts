import { defineConfig, devices } from '@playwright/test';

/** Playwright Test only (`npm run test:playwright`). Workers: PLAYWRIGHT_WORKERS (Bamboo -> env). CI forces 1 worker unless specified. */
function playwrightWorkers(): number | undefined {
  const raw = process.env.PLAYWRIGHT_WORKERS;
  if (raw === undefined || raw === '') {
    return process.env.CI ? 1 : undefined;
  }
  const n = parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default defineConfig({
  testDir: './tests/playwright-html-bridge',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: playwrightWorkers(),
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
