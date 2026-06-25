import { test, expect } from '../fixtures/index.js';
import { allure } from 'allure-playwright';

test('C003 - Verify that homepage navigation links are visible and functional', async ({
  homePage,
  testData,
  page,
}) => {
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
    expect(await homePage.isHomeLinkVisible()).toBe(true);
  });

  await test.step('Verify Projects link is present', async () => {
    expect(await homePage.isProjectsLinkVisible()).toBe(true);
  });

  await test.step('Verify Help link is present', async () => {
    expect(await homePage.isHelpLinkVisible()).toBe(true);
  });

  await test.step('Verify Sign in link is present', async () => {
    expect(await homePage.isSignInLinkVisible()).toBe(true);
  });

  await test.step('Click Projects and verify navigation', async () => {
    await homePage.clickProjects();
    expect(homePage.getCurrentUrl()).toContain(testData.homepage.projectsPath);
    const heading = await page
      .getByRole('heading', { name: testData.homepage.projectsHeading })
      .textContent();
    expect(heading).toContain(testData.homepage.projectsHeading);
  });
});
