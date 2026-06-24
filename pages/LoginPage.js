import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginInput = '#username';
    this.passwordInput = '#password';
    this.submitButton = 'input[type="submit"]';
    this.errorMessage = '#flash_error';
  }

  async goto() {
    await this.navigate('/login');
    await this.waitForElement(this.loginInput);
  }

  async login(username, password) {
    await this.page.fill(this.loginInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async submitEmpty() {
    await this.page.click(this.submitButton);
  }

  async getErrorMessage() {
    try {
      await this.waitForElement(this.errorMessage, 5000);
      return this.page.textContent(this.errorMessage);
    } catch {
      return null;
    }
  }
}
