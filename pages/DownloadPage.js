import { BasePage } from "./BasePage.js";

export class DownloadPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageHeading = '#content h1';
    this.latestReleasesAnchor = 'h2:has-text("Latest releases")';
    this.tarGzLinks = 'a[href$=".tar.gz"]';
    this.zipLinks = 'a[href$=".zip"]';
    this.supportTable = 'table';
  }

  async goto() {
    await this.navigate('/projects/redmine/wiki/Download');
    await this.waitForElement(this.pageHeading);
  }

  async isLatestReleasesVisible() {
    return this.page.isVisible(this.latestReleasesAnchor);
  }

  async getTarGzLinkCount() {
    return this.page.locator(this.tarGzLinks).count();
  }

  async getZipLinkCount() {
    return this.page.locator(this.zipLinks).count();
  }

  async isSupportTableVisible() {
    return this.page.isVisible(this.supportTable);
  }
}