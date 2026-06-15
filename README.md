# Redmine Playwright Automation

## 1. Project Overview

End-to-end test suite for [redmine.org](https://www.redmine.org/) built with **Playwright** and **JavaScript**. The suite covers five functional areas: login validation (invalid credentials, empty fields), homepage navigation, keyword search, and the Download page. All tests are structured with the **Page Object Model** pattern, integrated with **Allure** for rich HTML reports, and run automatically via **GitHub Actions** on every push or pull request to `main`.

---

## 2. Tech Stack

| Tool                                                                 | Purpose             |
| -------------------------------------------------------------------- | ------------------- |
| [Playwright](https://playwright.dev/)                                | Browser automation  |
| JavaScript (Node.js)                                                 | Test language       |
| [allure-playwright](https://www.npmjs.com/package/allure-playwright) | Test reporting      |
| [Allure CLI](https://docs.qameta.io/allure/)                         | Report generation   |
| GitHub Actions                                                       | CI/CD pipeline      |
| GitHub Pages                                                         | Live report hosting |

---

## 3. Prerequisites

- **Node.js** ≥ 18 (LTS recommended) — [download](https://nodejs.org/)
- **Allure CLI** (for local report generation):
  ```bash
  npm install -g allure-commandline
  ```
- **Git** — to clone the repository

---

## 4. Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/redmine-playwright-tests.git
cd redmine-playwright-tests

# Install Node dependencies
npm ci

# Install Playwright browser binaries
npx playwright install chromium
```

---

## 5. How to Run Tests Locally

```bash
# Run all tests (headless)
npm test

# Run all tests with a visible browser window
npm run test:headed

# Run a single spec file
npx playwright test tests/login.spec.js
```

Test results (screenshots, videos on failure) are saved to:

- `test-results/` — Playwright artifacts
- `allure-results/` — raw Allure data

---

## 6. How to View the Allure Report Locally

```bash
# Generate and open the report
npm run report
```

This runs `allure generate allure-results --clean -o allure-report` then opens the HTML report in your default browser.

---

## 7. CI/CD Pipeline Description

The pipeline is defined in `.github/workflows/ci.yml` and triggers on every `push` or `pull_request` to the `main` branch.

**Steps:**

1. Checkout repository
2. Set up Node.js 20
3. Install dependencies (`npm ci`)
4. Install Playwright browsers
5. Run tests (`npm test`) — continues even if tests fail so the report is always generated
6. Fetch Allure history from the `gh-pages` branch to preserve trend data across runs
7. Generate Allure report (using `simple-elf/allure-report-action`)
8. Publish the report to the `gh-pages` branch (using `peaceiris/actions-gh-pages`)

---

## 8. Live Report Link

After the first successful pipeline run, the Allure report is available at:

**https://\<your-username\>.github.io/redmine-playwright-tests/**

> To activate GitHub Pages: go to **Repository → Settings → Pages → Source → Deploy from branch → `gh-pages` / `/ (root)`**.  
> Paste the live URL into the repository **Description** field for quick access.

---

## 9. Project Structure

```
redmine-playwright/
├── pages/
│   ├── BasePage.js          # Shared navigation & utility methods
│   ├── LoginPage.js         # Login form locators & actions
│   ├── HomePage.js          # Homepage nav locators & actions
│   ├── SearchPage.js        # Search input & results locators
│   └── DownloadPage.js      # Download page locators & assertions
├── tests/
│   ├── login.spec.js                # C001, C002 – Login tests
│   ├── homepage-navigation.spec.js  # C003 – Homepage navigation structure
│   ├── search.spec.js               # C004 – Search returns results
│   └── download-page.spec.js        # C005 – Download page content
├── allure-results/          # Raw results written by Playwright (git-ignored)
├── allure-report/           # Generated HTML report (git-ignored)
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions pipeline
├── playwright.config.js     # Playwright configuration
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

**Architecture principles:**

- All locators live exclusively inside `pages/` — spec files contain zero locators.
- `BasePage.js` provides `navigate()`, `waitForElement()`, `getTitle()`, and `getCurrentUrl()` for all page objects to inherit.
- Each spec file maps 1-to-1 to a test case in the test plan.
- Every test uses `test.step()` blocks for steps and `allure.label()` for metadata.
