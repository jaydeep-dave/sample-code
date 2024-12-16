import { expect } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
  async registration(firstName: string, lastName: string, street: string, city: string, state: string, 
    zipCode: string, phoneNumber: string, ssn: string, username: string, password: string, repeatedPassword: string): Promise<void> {
    await this.navigateTo('https://parabank.parasoft.com/')
    await this.page.click('//a[normalize-space()=\"Register\"]')
    await this.page.fill('[id=\"customer\\.firstName\"]', firstName);
    await this.page.fill('[id=\"customer\\.lastName\"]', lastName);
    await this.page.fill('[id=\"customer\\.address\\.street\"]', street);
    await this.page.fill('[id=\"customer\\.address\\.city\"]', city);
    await this.page.fill('[id=\"customer\\.address\\.state\"]', state);
    await this.page.fill('[id=\"customer\\.address\\.zipCode\"]', zipCode);
    await this.page.fill('[id=\"customer\\.phoneNumber\"]', phoneNumber);
    await this.page.fill('[id=\"customer\\.ssn\"]', ssn);
    await this.page.fill('[id=\"customer\\.username\"]', username);
    await this.page.fill('[id=\"customer\\.password\"]', password);
    await this.page.fill('#repeatedPassword', repeatedPassword);
    await this.page.click('//input[@value=\"Register\"]');
  }

  async   isRegistrationSuccessfull(): Promise<void> {
    await expect(this.page.locator('//p[contains(text(),\"Your account was created successfully. You are now logged in.\")]')).toBeVisible();
  }

  async loginAfterRegistration(username: string, password: string): Promise<void> {
    await this.page.click('//a[normalize-space()=\"Log Out\"]')
    await this.navigateTo('https://parabank.parasoft.com/')
    await this.page.fill('//input[@name=\"username\"]', username);
    await this.page.fill('//input[@name=\"password\"]', password);
    await this.page.click('//input[@value=\"Log In\"]');
    await this.page.waitForTimeout(3000); // Wait for navigation
  }

  async isLoginSuccessful(): Promise<void> {
    await expect(this.page.locator('//h1[normalize-space()=\"Accounts Overview\"]')).toBeVisible();
  }
}
