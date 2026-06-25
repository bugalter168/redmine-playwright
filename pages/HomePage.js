import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    const topMenu = page.locator('#top-menu');
    this.homeLink = topMenu.getByRole('link', { name: 'Home' });
    this.projectsLink = topMenu.getByRole('link', { name: 'Projects' });
    this.helpLink = topMenu.getByRole('link', { name: 'Help' });
    this.signInLink = topMenu.getByRole('link', { name: 'Sign in' });
    this.mainHeading = page.locator('#header h1');
  }

  async goto() {
    await this.navigate('/');
    await this.mainHeading.waitFor({ state: 'visible' });
  }

  async clickProjects() {
    await this.projectsLink.click();
    await this.page.waitForURL('**/projects');
  }

  async isHomeLinkVisible() {
    return this.homeLink.isVisible();
  }

  async isProjectsLinkVisible() {
    return this.projectsLink.isVisible();
  }

  async isHelpLinkVisible() {
    return this.helpLink.isVisible();
  }

  async isSignInLinkVisible() {
    return this.signInLink.isVisible();
  }
}
