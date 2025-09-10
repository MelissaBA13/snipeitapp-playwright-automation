import { Locator, Page, expect } from '@playwright/test';
import { URLs } from '../support/constants';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.header = page.locator('h1');
  }

  async goto() {
    await this.page.goto(URLs.login);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username, { timeout: 10000 });
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await expect(this.header).toHaveText('Dashboard');
  }
}
