'use strict';

const { test, expect } = require('../fixtures');
const { allure } = require('allure-playwright');

test.describe('Login', () => {
  test('C001 - Login with invalid credentials', async ({ loginPage, testData }) => {
    allure.label('severity', 'critical');
    allure.label('feature', 'Login');
    allure.label('story', 'Invalid credentials');
    allure.description('Verify that wrong credentials show "Invalid user or password" error.');

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter invalid username and password', async () => {
      await loginPage.login(testData.login.invalidUsername, testData.login.invalidPassword);
    });

    await test.step('Verify error message is displayed', async () => {
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(testData.login.errorMessage);
    });

    await test.step('Verify user is still on the login page', async () => {
      expect(loginPage.getCurrentUrl()).toContain(testData.login.path);
    });
  });

  test('C002 - Login with empty fields', async ({ loginPage, testData }) => {
    allure.label('severity', 'normal');
    allure.label('feature', 'Login');
    allure.label('story', 'Empty credentials');
    allure.description(
      'Verify that submitting empty form triggers "Invalid user or password" error.'
    );

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Submit form without entering any credentials', async () => {
      await loginPage.submitEmpty();
    });

    await test.step('Verify error message is displayed', async () => {
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain(testData.login.errorMessage);
    });

    await test.step('Verify user remains on the login page', async () => {
      expect(loginPage.getCurrentUrl()).toContain(testData.login.path);
    });
  });
});
