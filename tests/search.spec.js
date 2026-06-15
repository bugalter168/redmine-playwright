'use strict';

const { test, expect } = require('../fixtures');
const { allure } = require('allure-playwright');

test('C004 - Search for a keyword returns results', async ({ homePage, searchPage, testData }) => {
  allure.label('severity', 'normal');
  allure.label('feature', 'Search');
  allure.label('story', 'Keyword search');
  allure.description(
    'Verify searching "plugin" navigates to search results page with at least one result.'
  );

  await test.step('Navigate to homepage', async () => {
    await homePage.goto();
  });

  await test.step('Type "plugin" in the search box and submit', async () => {
    await searchPage.search(testData.search.query);
  });

  await test.step('Verify URL is the search results page', async () => {
    expect(searchPage.isOnSearchPage()).toBe(true);
  });

  await test.step('Verify at least one result is displayed', async () => {
    const count = await searchPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });
});
