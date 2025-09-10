import { chromium } from '@playwright/test';
import config from './playwright.config';
import { LoginPage } from './pages/LoginPage';
import users from './data/users.json';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const baseURL = config.use?.baseURL;
  if (!baseURL) throw new Error('baseURL is not defined in playwright.config.ts');
  await page.goto(`${baseURL}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await loginPage.login(users.admin.username, users.admin.password);

  await context.storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
