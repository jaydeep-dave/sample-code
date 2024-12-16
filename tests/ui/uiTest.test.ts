import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../src/pages/RegisterPage.ts';
import { LoginPage } from '../../src/pages/loginPage.ts';
import { OverviewPage } from '../../src/pages/overviewPage.ts';

import { generateRandomUsername } from '../../utils/uiUtils.ts';

//p0 positive test
test('test', async ({ page }) => {
  let randomUserName: string = generateRandomUsername()
  let accountId: string;
  let newAccountId: string;
  let amount: string = '25';

  const registerPage = new RegisterPage(page);
  await registerPage.registration('firstName', 'lastName', 'street', 'city', 'state', '123456', '123456789', '987654', randomUserName, 'password', 'password');
  expect(await registerPage.isRegistrationSuccessfull());
  
  await registerPage.loginAfterRegistration(randomUserName, 'password');
  expect(await registerPage.isLoginSuccessful());

  const loginPage = new LoginPage(page);
  expect(await loginPage.isGlobalNavigationMenuWorkingAsExpected());

  const overviewPage = new OverviewPage(page);
  accountId = await overviewPage.checkAccountOverview();
  newAccountId = await overviewPage.createNewSavingsAccount();
  expect(await overviewPage.verifyAccountOverviewAfterCreatingNewSavingsAccount());
  expect(await overviewPage.transferFunds('50', newAccountId));
  expect(await overviewPage.billPay('payeeName', 'streetAddress', 'city', 'state', '123456', '123456789', '654321', '654321', amount, newAccountId));
});

//p0 negative test "when password and verify password does not match"
test('Negative test when password and verify password does not match', async ({ page }) => {
  let randomUserName: string = generateRandomUsername()

  const registerPage = new RegisterPage(page);
  await registerPage.registration('firstName', 'lastName', 'street', 'city', 'state', '123456', '123456789', '987654', randomUserName, 'password', 'reverifyPassword');
  expect(await registerPage.isRegistrationSuccessfull().catch());
});

//p0 negative test "when account and verify account does not match during bill pay"
test('Negative test when account and verify account during bill pay does not match', async ({ page }) => {
  let randomUserName: string = generateRandomUsername()
  let accountId: string;
  let amount: string = '25';

  const registerPage = new RegisterPage(page);
  await registerPage.registration('firstName', 'lastName', 'street', 'city', 'state', '123456', '123456789', '987654', randomUserName, 'password', 'password');
  expect(await registerPage.isRegistrationSuccessfull());

  const overviewPage = new OverviewPage(page);
  accountId = await overviewPage.checkAccountOverview();
  expect(await overviewPage.billPay('payeeName', 'streetAddress', 'city', 'state', '123456', '123456789', '654321', '654521', amount, accountId));
});

//p0 negative test "when amount is empty during bill pay"
test('Negative test when amount is empty during bill pay does not match', async ({ page }) => {
  let randomUserName: string = generateRandomUsername()
  let accountId: string;
  let amount: string = '25';

  const registerPage = new RegisterPage(page);
  await registerPage.registration('firstName', 'lastName', 'street', 'city', 'state', '123456', '123456789', '987654', randomUserName, 'password', 'password');
  expect(await registerPage.isRegistrationSuccessfull());

  const overviewPage = new OverviewPage(page);
  accountId = await overviewPage.checkAccountOverview();
  expect(await overviewPage.billPay('payeeName', 'streetAddress', 'city', 'state', '123456', '123456789', '654321', '654321', ' ', accountId));
});

//p0 negative test "when transfer amount is empty during transfer funds"
test('Negative test when transfer amount is empty during transfer funds', async ({ page }) => {
  let randomUserName: string = generateRandomUsername()
  let accountId: string;

  const registerPage = new RegisterPage(page);
  await registerPage.registration('firstName', 'lastName', 'street', 'city', 'state', '123456', '123456789', '987654', randomUserName, 'password', 'password');
  expect(await registerPage.isRegistrationSuccessfull());

  const overviewPage = new OverviewPage(page);
  accountId = await overviewPage.checkAccountOverview();
  expect(await overviewPage.transferFunds(' ', accountId));
});