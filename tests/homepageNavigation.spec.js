'use strict';

const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const HomePage = require('../pages/HomePage');

test('C003 - Homepage navigation structure', async ({ page }) => {
  allure.label('severity', 'normal');
  allure.label('feature', 'Navigation');
  allure.label('story', 'Top nav links');
  allure.description(
    'Verify that the Redmine homepage loads correctly and all expected top-navigation ' +
    'links are visible. Then verify the Projects link navigates to /projects.'
  );

  const homePage = new HomePage(page);

  await allure.step('Navigate to homepage', async () => {
    await homePage.goto();
    const title = await homePage.getTitle();
    expect(title).toContain('Redmine');
  });

  await allure.step('Verify Home link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.homeLink)).toBe(true);
  });

  await allure.step('Verify Projects link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.projectsLink)).toBe(true);
  });

  await allure.step('Verify Help link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.helpLink)).toBe(true);
  });

  await allure.step('Verify Sign in link is present', async () => {
    expect(await homePage.isNavLinkVisible(homePage.signInLink)).toBe(true);
  });

  await allure.step('Click Projects and verify navigation', async () => {
    await homePage.clickProjects();
    expect(homePage.getCurrentUrl()).toContain('/projects');
    const heading = await page.textContent('h2');
    expect(heading).toContain('Projects');
  });
});