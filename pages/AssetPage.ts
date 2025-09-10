import { Locator, Page, expect } from '@playwright/test';
import { Statuses, URLs } from '../support/constants';

export class AssetPage {
  readonly page: Page;
  readonly serialInput: Locator;
  readonly assetTag: Locator;
  readonly company: Locator;
  readonly model: Locator;
  readonly statusDropdown: Locator;
  readonly assignedToDropdown: Locator;
  readonly submitButton: Locator;
  readonly header: Locator;
  readonly cardBody: Locator;
  readonly dropdownOptions: Locator;
  readonly successAlert: Locator;
  readonly historyTab: Locator;
  readonly historyTable: Locator;
  readonly historySearchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.serialInput = page.locator('#serials\\[1\\]');
    this.assetTag = page.locator('#asset_tag');
    this.company = page.locator('#select2-company_select-container');
    this.model = page.locator('#select2-model_select_id-container');
    this.statusDropdown = page.locator('#select2-status_select_id-container');
    this.assignedToDropdown = page.locator('#select2-assigned_user_select-container');
    this.submitButton = page.locator('#submit_button');
    this.header = page.locator('h1');
    this.cardBody = page.locator('.card-body');
    this.dropdownOptions = page.locator('.select2-results__option');
    this.successAlert = page.locator('div.alert-success');
    this.historyTab = page.locator('ul.nav.nav-tabs.hidden-print a', { hasText: 'History' });
    this.historyTable = page.locator('#assetHistory');
    this.historySearchInput = page.locator('#history input[placeholder="Search"]');
  }

  async gotoCreateAsset() {
    await this.page.goto(URLs.assetCreate);
  }

  async createNewAsset(assetName: string) {
    await this.company.click();
    await this.dropdownOptions.nth(1).waitFor({ state: 'visible' });
    await this.dropdownOptions.nth(1).click();

    const serialNumber = await this.setSerialNumber('SN001');
    const assetTagValue = await this.generateUniqueDigit();

    await this.assetTag.fill(assetTagValue);

    await this.model.click();
    await this.dropdownOptions.filter({ hasText: assetName }).first().click();

    await this.statusDropdown.click();
    await this.dropdownOptions.filter({ hasText: 'Ready to Deploy' }).first().click();

    await this.assignedToDropdown.click();
    await this.dropdownOptions.nth(4).click();

    await this.submitButton.first().click();

    await expect(this.successAlert).toContainText(
      `Success: Asset with tag ${assetTagValue} was created successfully`
    );

    return { serialNumber, assetTagNo: assetTagValue };
  }

  async validateAssetDetails(assetTag: string) {
    await expect(this.header).toContainText(`(${assetTag}) - Macbook Pro 13`);
  }

  async validateHistoryDetails(assetTag: string) {
    await this.historyTab.click();
    await this.historyTable.waitFor({ state: 'visible' });

    await this.historySearchInput.fill(assetTag);

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/api/v1/reports/activity') &&
        response.status() === 200
    );

    const row = this.historyTable.locator('tbody tr').filter({
      hasText: 'create new',
    }).filter({
      hasText: assetTag,
    }).first();

    await expect(row).toHaveCount(1);
    await expect(row.locator('td').nth(3)).toHaveText('create new');
    await expect(row.locator('td').nth(4)).toContainText(assetTag);
  }

  async setSerialNumber(serial: string): Promise<string> {
    const uniqNum = await this.generateUniqueDigit();
    const finalSerial = `${serial}${uniqNum}`;

    await this.serialInput.fill(finalSerial);
    return finalSerial;
  }

    async generateUniqueDigit(): Promise<string> {
      const uniqNum = Math.floor(10000000 + Math.random() * 90000000).toString();
      return uniqNum;
    }
  
}