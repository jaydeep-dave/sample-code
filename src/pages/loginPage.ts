import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  async login(username: string, password: string): Promise<void> {
    await this.navigateTo('https://parabank.parasoft.com/')
    await this.page.fill('//input[@name=\"username\"]', username);
    await this.page.fill('//input[@name=\"password\"]', password);
    await this.page.click('//input[@value=\"Log In\"]');
    await this.page.waitForTimeout(3000); // Wait for navigation
  }


  async isGlobalNavigationMenuWorkingAsExpected(): Promise<void> {
    // Navigate to "About Us" and verify URL
    await this.page.click('//li[normalize-space()="About Us"]');
    await this.page.waitForTimeout(1000); // Wait for navigation
    const aboutUsURL = this.page.url();
    if (aboutUsURL !== 'https://parabank.parasoft.com/parabank/about.htm') {
      throw new Error(`Expected URL to be https://parabank.parasoft.com/parabank/about.htm, but got ${aboutUsURL}`);
    }

    // Navigate to "Services" and verify URL
    await this.page.click('//li[normalize-space()=\"Services\"]');
    await this.page.waitForTimeout(1000); // Wait for navigation
    const servicesURL = this.page.url();
    if (servicesURL !== 'https://parabank.parasoft.com/parabank/services.htm') {
      throw new Error(`Expected URL to be https://parabank.parasoft.com/parabank/services.htm, but got ${servicesURL}`);
    }

    // Navigate to "Products" and verify URL
    await this.page.click('//li[normalize-space()=\"Products\"]');
    await this.page.waitForTimeout(1000); // Wait for navigation
    const productsURL = this.page.url();
    if (productsURL !== 'https://www.parasoft.com/products/') {
      throw new Error(`Expected URL to be https://www.parasoft.com/products/, but got ${productsURL}`);
    }
    this.page.goBack()

    // Navigate to "Locations" and verify URL
    await this.page.waitForTimeout(1000); // Wait for navigation
    await this.page.click('//li[normalize-space()=\"Locations\"]');
    await this.page.waitForTimeout(3000); // Wait for navigation
    const locationsURL = this.page.url();
    if (locationsURL !== 'https://www.parasoft.com/solutions/') {
      throw new Error(`Expected URL to be https://www.parasoft.com/solutions/, but got ${locationsURL}`);
    }
    this.page.goBack()

    // Navigate to "Admin Page" and verify URL
    await this.page.click('//li[normalize-space()=\"Admin Page\"]');
    await this.page.waitForTimeout(1000); // Wait for navigation
    const adminPageURL = this.page.url();
    if (adminPageURL !== 'https://parabank.parasoft.com/parabank/admin.htm') {
      throw new Error(`Expected URL to be https://parabank.parasoft.com/parabank/admin.htm, but got ${adminPageURL}`);
    }
  }
}
