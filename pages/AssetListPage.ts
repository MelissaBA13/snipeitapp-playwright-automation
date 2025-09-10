import { Page, Locator, expect } from '@playwright/test';
import { URLs } from '../support/constants';

export class AssetListPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly tableRowBySerial: (serial: string) => Locator;
  readonly tableRowLink: (serial: string) => Locator;

  constructor(page: Page) {
      this.page = page;
      this.searchInput = page.locator('input[type="search"]');
      this.table = page.locator('#assetsListingTable');
      this.tableRows = this.table.locator('tbody tr');
      this.tableRowBySerial = (serial: string) =>
      this.table.locator('tbody tr', { hasText: serial });
      this.tableRowLink = (serial: string) =>
      this.tableRowBySerial(serial).first().locator('td:nth-child(4) a');
  }

  async gotoList() {
    await this.page.goto(URLs.assetList);
  }

  async searchAsset(serialNumber: string) {
    await this.searchInput.fill(serialNumber);
    await this.searchInput.press('Enter');

    const row = this.tableRowBySerial(serialNumber);
    await expect(row).toHaveCount(1, { timeout: 10000 });
  }

  async openAsset(serialNumber: string) {
    const row = this.tableRowBySerial(serialNumber).first();
    await row.waitFor({ state: 'visible' });
    await this.tableRowLink(serialNumber).click();
  }
}
