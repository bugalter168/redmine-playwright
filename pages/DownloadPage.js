import { BasePage } from './BasePage.js';

export class DownloadPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageHeading = page.locator('#content h1');
    this.latestReleasesSection = page
      .locator('#content')
      .getByRole('heading', { name: 'Latest releases' });
    this.tarGzLinks = page.locator('#content a[href$=".tar.gz"]');
    this.zipLinks = page.locator('#content a[href$=".zip"]');
    this.supportTable = page.locator('#content table').first();
  }

  async goto() {
    await this.navigate('/projects/redmine/wiki/Download');
    await this.pageHeading.waitFor({ state: 'visible' });
  }

  async isLatestReleasesVisible() {
    return this.latestReleasesSection.isVisible();
  }

  async getTarGzLinkCount() {
    return this.tarGzLinks.count();
  }

  async getZipLinkCount() {
    return this.zipLinks.count();
  }

  async isSupportTableVisible() {
    return this.supportTable.isVisible();
  }
}
