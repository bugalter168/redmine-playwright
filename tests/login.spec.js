'use strict';

const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const LoginPage = require('../pages/LoginPage');

test.describe('Login', () => {

  test('C001 - Login with invalid credentials', async ({ page }) => {
    allure.label('severity', 'critical');
    allure.label('feature', 'Login');
    allure.label('story', 'Invalid credentials');
    allure.description(
      'Verify that submitting wrong username and password shows an error message ' +
      '"Invalid user or password" and does not authenticate the user.'
    );

    const loginPage = new LoginPage(page);

    await allure.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await allure.step('Enter invalid username and password', async () => {
      await loginPage.login('invalid_user_xyz_qa', 'wrongpass123');
    });

    await allure.step('Verify error message is displayed', async () => {
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Invalid user or password');
    });

    await allure.step('Verify user is still on the login page', async () => {
      expect(loginPage.getCurrentUrl()).toContain('/login');
    });
  });

  test('C002 - Login with empty fields', async ({ page }) => {
    allure.label('severity', 'normal');
    allure.label('feature', 'Login');
    allure.label('story', 'Empty credentials');
    allure.description(
      'Verify that submitting the login form with both fields empty triggers the ' +
      'server-side validation error "Invalid user or password".'
    );

    const loginPage = new LoginPage(page);

    await allure.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await allure.step('Submit form without entering any credentials', async () => {
      await loginPage.submitEmpty();
    });

    await allure.step('Verify error message is displayed', async () => {
      const errorText = await loginPage.getErrorMessage();
      expect(errorText).toContain('Invalid user or password');
    });

    await allure.step('Verify user remains on the login page', async () => {
      expect(loginPage.getCurrentUrl()).toContain('/login');
    });
  });

});