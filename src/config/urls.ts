/** Default base URL; override with `BASE_URL` env. */
export const BASE_URL = process.env.BASE_URL ?? 'https://example.com';

/** Salesforce login URL (custom domain or https://login.salesforce.com). */
export const SALESFORCE_URL =
  process.env.SALESFORCE_URL ?? 'https://login.salesforce.com';

export const PRACTICE_URL =
    process.env.PRACTICE_URL ?? 'https://automationexercise.com';
