import { BasePage } from './BasePage.js';
export class SearchPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = page.locator('#q');
    this.resultsItems = page.locator('#search-results dt');
  }

  async search(query) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
    await this.page.waitForURL('**/search**');
  }

  async getResultCount() {
    await this.resultsItems.first().waitFor({ state: 'visible' });
    return this.resultsItems.count();
  }

  isOnSearchPage() {
    return this.getCurrentUrl().includes('/search');
  }
}
