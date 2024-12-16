import { test, expect } from '@playwright/test';
import { generateAPIEndpoint } from '../../utils/apiUtils'

//p0 positive path
test('API Test: Get Bill payment Details', async ({ request }) => {
  // Define the API endpoint
  let url: string = generateAPIEndpoint('17229', '25')
  const response = await request.get(url, {
    headers: {
      'Accept': 'application/json',
    },});

  // Verify the response status code
  expect(response.status()).toBe(200);

  // Parse and validate the JSON response body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody[0]).toHaveProperty('accountId', 17229);
  expect(responseBody[0]).toHaveProperty('type', 'Debit');
  expect(responseBody[0]).toHaveProperty('amount', 25);
});

//p0 negative path
test('API Test: Negative scenario', async ({ request }) => {
  // Define the API endpoint
  let url: string = generateAPIEndpoint('12345 ', '50')
  const response = await request.get(url, {
    headers: {
      'Accept': 'application/json',
    },});

  // Verify the response status code
  expect(response.status()).toBe(200);

  // Parse and validate the JSON response body
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(responseBody[0] == null)
});