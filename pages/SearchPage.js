import { BasePage } from "./BasePage.js";
export class SearchPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = '#q';
    this.resultsItems = '#search-results dt';
  }

  async search(query) {
    await this.waitForElement(this.searchInput);
    await this.page.fill(this.searchInput, query);
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForURL('**/search**');
  }

  async getResultCount() {
    await this.waitForElement(this.resultsItems);
    return this.page.locator(this.resultsItems).count();
  }

  isOnSearchPage() {
    return this.getCurrentUrl().includes('/search');
  }
}
