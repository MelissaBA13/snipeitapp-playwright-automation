import { test, expect } from '../../fixtures/pageFixtures';
import { AssetPage } from '../../pages/AssetPage';
import { AssetListPage } from '../../pages/AssetListPage';
import { generateAssetName } from '../../support/utils';

let assetPage: AssetPage;
let assetListPage: AssetListPage;
let assetName: string;
let serialNumber: string;
let assetTagNo: string;

test.describe('Asset Management', () => {
    test.beforeAll(async () => {
        assetName = generateAssetName('Macbook Pro 13"');
    });
    test.beforeEach(async ({ page }) => {
        assetPage = new AssetPage(page);
        assetListPage = new AssetListPage(page);
    });
    
    test('Create Asset', async () => {
        await assetPage.gotoCreateAsset();
        const result = await assetPage.createNewAsset(assetName);
        serialNumber = result.serialNumber;
        assetTagNo = result.assetTagNo;
    });
    
    test('Verify Asset in List', async () => {
        await assetListPage.gotoList();
        await assetListPage.searchAsset(serialNumber);
        await assetListPage.openAsset(serialNumber);
        await assetPage.validateAssetDetails(assetTagNo);
    });
    
    test('Verify History Tab', async () => {
        await assetListPage.gotoList();
        await assetListPage.searchAsset(serialNumber);
        await assetListPage.openAsset(serialNumber);
        await assetPage.validateHistoryDetails(assetTagNo);
    });
});
