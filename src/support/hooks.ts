import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  After,
  Before,
  BeforeAll,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import type { ITestCaseHookParameter } from '@cucumber/cucumber';
import { TestStepResultStatus } from '@cucumber/messages';
import { chromium } from 'playwright';
import { CustomWorld } from './world';

setDefaultTimeout(60 * 1000);

const root = process.cwd();
const traceDir = join(root, 'test-results', 'cucumber', 'traces');
const shotDir = join(root, 'test-results', 'cucumber', 'screenshots');

BeforeAll(() => {
  mkdirSync(join(root, 'reports', 'cucumber'), { recursive: true });
  mkdirSync(traceDir, { recursive: true });
  mkdirSync(shotDir, { recursive: true });
});

Before(async function (this: CustomWorld) {
  const headed = process.env.HEADED === 'true';
  this.browser = await chromium.launch({ headless: !headed });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const failed = scenario.result?.status === TestStepResultStatus.FAILED;
  const alwaysTrace = process.env.TRACE === 'all';
  const safeName =
    `${scenario.testCaseStartedId}_${scenario.pickle.name}`
      .replace(/[^\w\-]+/g, '_')
      .slice(0, 180) || 'scenario';

  try {
    if (this.context) {
      if (failed) {
        await this.page
          ?.screenshot({
            path: join(shotDir, `${safeName}.png`),
            fullPage: true,
          })
          .catch(() => undefined);
        await this.context.tracing
          .stop({ path: join(traceDir, `${safeName}.zip`) })
          .catch(() => undefined);
      } else if (alwaysTrace) {
        await this.context.tracing
          .stop({ path: join(traceDir, `${safeName}.zip`) })
          .catch(() => undefined);
      } else {
        await this.context.tracing.stop().catch(() => undefined);
      }
    }
  } finally {
    await this.page?.close().catch(() => undefined);
    await this.context?.close().catch(() => undefined);
    await this.browser?.close().catch(() => undefined);
  }
});
