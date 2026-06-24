import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.homeLink = '#top-menu a.home';
    this.projectsLink = '#top-menu a.projects';
    this.helpLink = '#top-menu a.help';
    this.signInLink = '#top-menu a.login';
    this.mainHeading = 'h1';
  }

  async goto() {
    await this.navigate('/');
    await this.waitForElement(this.mainHeading);
  }

  async clickProjects() {
    await this.page.click(this.projectsLink);
    await this.page.waitForURL('**/projects');
  }

  async isNavLinkVisible(selector) {
    return this.page.isVisible(selector);
  }
}