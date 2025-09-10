export function generateAssetName(prefix: string): string {
    return `${prefix}`;
  }
  
  export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../data/users.json';

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.admin.username, users.admin.password);
    await expect(page).toHaveURL(/dashboard/);
    await use(page);
  },
});

export { expect };
