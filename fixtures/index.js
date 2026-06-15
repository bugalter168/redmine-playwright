'use strict';

const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');
const DownloadPage = require('../pages/DownloadPage');

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

module.exports = { test, expect };
