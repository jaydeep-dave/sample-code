import { expect } from '@playwright/test';
import { BasePage } from './basePage';

let accountId;
let newAccountId;

export class OverviewPage extends BasePage {
  async checkAccountOverview(): Promise<string> {
    await this.page.click('//a[normalize-space()=\"Accounts Overview\"]');
    accountId = await this.page.locator('//tbody/tr[1]/td[1]').textContent();
    // await expect(this.page.locator('//tbody/tr[1]/td[2]')).toContainText('$515.50');
    // await expect(this.page.locator('//tbody/tr[1]/td[3]')).toContainText('$515.50');
    return(accountId)
  }

  async createNewSavingsAccount(): Promise<string> {
    await this.page.waitForURL('https://parabank.parasoft.com/parabank/overview.htm'); // Wait for navigation
    await this.page.click('//a[normalize-space()=\"Open New Account\"]');
    await this.page.click('//select[@id="type"]');
    await this.page.locator('#type').selectOption('1');
    await this.page.waitForTimeout(1000);
    await this.page.click('//input[@value=\"Open New Account\"]');
    await this.page.waitForTimeout(1000);
    newAccountId = await this.page.locator('//a[@id=\"newAccountId\"]').textContent();
    await expect(this.page.locator('//h1[normalize-space()=\"Account Opened!\"]')).toBeVisible();
    return(newAccountId);
  }

  async verifyAccountOverviewAfterCreatingNewSavingsAccount(): Promise<void> {
    await this.page.click('//a[normalize-space()=\"Accounts Overview\"]')
    // await expect(this.page.locator('//tbody/tr[1]/td[2]')).toContainText('$415.50');
    // await expect(this.page.locator('//tbody/tr[1]/td[3]')).toContainText('$415.50');
    // await expect(this.page.locator('//tbody/tr[2]/td[2]')).toContainText('$100.00');
    // await expect(this.page.locator('//tbody/tr[2]/td[3]')).toContainText('$100.00');
  }

  async transferFunds(amount: string, accountId: string): Promise<void> {
    await this.page.click('//a[normalize-space()=\"Transfer Funds\"]');
    await this.page.fill('//input[@id=\"amount\"]', amount);
    await this.page.click('//select[@id=\"fromAccountId\"]');
    await this.page.locator('#fromAccountId').selectOption(accountId);
    await this.page.click('//input[@value=\"Transfer\"]');
    await expect(this.page.locator('//h1[normalize-space()=\"Transfer Complete!\"]')).toBeVisible();
  }

  async billPay(payeeName: string, streetAddress: string, city: string, state: string, 
    zipCode: string, phoneNumber: string, accountNumber: string, verifyAccountNumber: string, amount: string, accountId: string): Promise<void> {
    await this.page.click('//a[normalize-space()=\"Bill Pay\"]')
    await this.page.fill('//input[@name=\"payee.name\"]', payeeName);
    await this.page.fill('//input[@name=\"payee.address.street\"]', streetAddress);
    await this.page.fill('//input[@name=\"payee.address.city\"]', city);
    await this.page.fill('//input[@name=\"payee.address.state\"]', state);
    await this.page.fill('//input[@name=\"payee.address.zipCode\"]', zipCode);
    await this.page.fill('//input[@name=\"payee.phoneNumber\"]', phoneNumber);
    await this.page.fill('//input[@name=\"payee.accountNumber\"]', accountNumber);
    await this.page.fill('//input[@name=\"verifyAccount\"]', verifyAccountNumber);
    await this.page.fill('//input[@name=\"amount\"]', amount);
    await this.page.click('//select[@name=\"fromAccountId\"]');
    await this.page.selectOption('select[name=\"fromAccountId\"]', accountId);
    await this.page.click('//input[@value=\"Send Payment\"]');
    await expect(this.page.locator('//h1[normalize-space()=\"Bill Payment Complete\"]')).toBeVisible();
  }
}
