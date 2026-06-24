export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path);
  }

  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async getTitle() {
    return this.page.title();
  }

  getCurrentUrl() {
    return this.page.url();
  }
}

