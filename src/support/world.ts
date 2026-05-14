import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { ExamplePage } from '../pages/example.page';
import { LoginPage } from '../pages/login.page';

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  get examplePage(): ExamplePage {
    return new ExamplePage(this.page);
  }

  get loginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
