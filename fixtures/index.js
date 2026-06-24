import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { SearchPage } from '../pages/SearchPage.js';
import { DownloadPage } from '../pages/DownloadPage.js';

const testData = {
  login: {
    invalidUsername: 'invalid_user_xyz_qa',
    invalidPassword: 'wrongpass123',
    errorMessage: 'Invalid user or password',
    path: '/login',
  },
  homepage: {
    title: 'Redmine',
    projectsHeading: 'Projects',
    projectsPath: '/projects',
  },
  search: {
    query: 'plugin',
  },
  download: {
    title: 'Download',
  },
};

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  downloadPage: async ({ page }, use) => {
    await use(new DownloadPage(page));
  },
  testData: async ({}, use) => {
    await use(testData);
  },
});

export { test, expect };
