'use strict';

const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');
const DownloadPage = require('../pages/DownloadPage');

test('C005 - Download page shows latest release versions', async ({ page }) => {
  allure.label('severity', 'minor');
  allure.label('feature', 'Download');
  allure.label('story', 'Release listing');
  allure.description(
    'Verify that the Download wiki page displays the "Latest releases" section, ' +
    'provides at least one .tar.gz and one .zip download link, and includes the ' +
    'version support status table.'
  );

  const downloadPage = new DownloadPage(page);

  await allure.step('Navigate to the Download wiki page', async () => {
    await downloadPage.goto();
    const title = await downloadPage.getTitle();
    expect(title).toContain('Download');
  });

  await allure.step('Verify "Latest releases" section heading is visible', async () => {
    expect(await downloadPage.isLatestReleasesVisible()).toBe(true);
  });

  await allure.step('Verify at least one .tar.gz download link is present', async () => {
    const count = await downloadPage.getTarGzLinkCount();
    expect(count).toBeGreaterThan(0);
  });

  await allure.step('Verify at least one .zip download link is present', async () => {
    const count = await downloadPage.getZipLinkCount();
    expect(count).toBeGreaterThan(0);
  });

  await allure.step('Verify the version support status table is visible', async () => {
    expect(await downloadPage.isSupportTableVisible()).toBe(true);
  });
});