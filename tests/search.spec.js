'use strict';

const { test, expect } = require('@playwright/test');
const { allure }       = require('allure-playwright');
const HomePage         = require('../pages/HomePage');
const SearchPage       = require('../pages/SearchPage');

test('C004 - Search for a keyword returns results', async ({ page }) => {
  allure.label('severity', 'normal');
  allure.label('feature', 'Search');
  allure.label('story', 'Keyword search');
  allure.description(
    'Verify that searching for "plugin" from the Redmine homepage navigates to the ' +
    'search results page and displays at least one result.'
  );

  const homePage   = new HomePage(page);
  const searchPage = new SearchPage(page);

  await allure.step('Navigate to homepage', async () => {
    await homePage.goto();
  });

  await allure.step('Type "plugin" in the search box and submit', async () => {
    await searchPage.search('plugin');
  });

  await allure.step('Verify URL is the search results page', async () => {
    expect(searchPage.isOnSearchPage()).toBe(true);
  });

  await allure.step('Verify at least one result is displayed', async () => {
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });
});