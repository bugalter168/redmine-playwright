import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.loginInput = page.getByLabel('Login');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('#flash_error');
  }

  async goto() {
    await this.navigate('/login');
    await this.loginInput.waitFor({ state: 'visible' });
  }

  async login(username, password) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async submitEmpty() {
    await this.submitButton.click();
  }

  async getErrorMessage() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return this.errorMessage.textContent();
    } catch {
      return null;
    }
  }
}
