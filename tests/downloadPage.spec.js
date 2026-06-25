import { test, expect } from '../fixtures/index.js';
import { allure } from 'allure-playwright';

test('C005 - Verify that Download page shows latest release versions', async ({
  downloadPage,
  testData,
}) => {
  allure.label('severity', 'minor');
  allure.label('feature', 'Download');
  allure.label('story', 'Release listing');
  allure.description(
    'Verify Download page has Latest releases section, .tar.gz/.zip links, and support table.'
  );

  await test.step('Navigate to the Download wiki page', async () => {
    await downloadPage.goto();
    const title = await downloadPage.getTitle();
    expect(title).toContain(testData.download.title);
  });

  await test.step('Verify "Latest releases" section heading is visible', async () => {
    expect(await downloadPage.isLatestReleasesVisible()).toBe(true);
  });

  await test.step('Verify at least one .tar.gz download link is present', async () => {
    const count = await downloadPage.getTarGzLinkCount();
    expect(count).toBeGreaterThan(0);
  });

  await test.step('Verify at least one .zip download link is present', async () => {
    const count = await downloadPage.getZipLinkCount();
    expect(count).toBeGreaterThan(0);
  });

  await test.step('Verify the version support status table is visible', async () => {
    expect(await downloadPage.isSupportTableVisible()).toBe(true);
  });
});
