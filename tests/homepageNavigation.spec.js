'use strict';

const { test, expect } = require('../fixtures');
const { allure } = require('allure-playwright');

test('C003 - Homepage navigation structure', async ({ homePage, testData, page }) => {
  allure.label('severity', 'normal');
  allure.label('feature', 'Navigation');
  allure.label('story', 'Top nav links');
  allure.description(
    'Verify homepage loads and all top-nav links are visible. Projects link navigates to /projects.'
  );

  await test.step('Navigate to homepage', async () => {
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title).toContain(testData.homepage.title);
  });

  await test.step('Verify Home link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.homeLink)).toBe(true);
  });

  await test.step('Verify Projects link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.projectsLink)).toBe(true);
  });

  await test.step('Verify Help link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.helpLink)).toBe(true);
  });

  await test.step('Verify Sign in link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.signInLink)).toBe(true);
  });

  await test.step('Click Projects and verify navigation', async () => {
    await homePage.clickProjects();
    expect(homePage.getCurrentUrl()).toContain(testData.homepage.projectsPath);
    const heading = await page.textContent('h2');
    expect(heading).toContain(testData.homepage.projectsHeading);
  });
});
