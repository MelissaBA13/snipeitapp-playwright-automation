import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global.setup.ts',
  use: {
    baseURL: 'https://demo.snipeitapp.com',
    headless: true,
    storageState: 'storageState.json',
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'always' }]],
});
