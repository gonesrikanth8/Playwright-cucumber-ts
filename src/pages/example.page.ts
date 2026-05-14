import { Locator } from 'playwright';
import { BASE_URL } from '../config/urls';
import { BasePage } from './base.page';

export class ExamplePage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  heading(text: string): Locator {
    return this.page.getByRole('heading', { name: text });
  }
}

