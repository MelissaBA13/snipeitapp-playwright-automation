# Snipe-IT Playwright Automation

This repository contains automation scripts for testing the Snipe-IT - asset management. 
The framework uses **TypeScript** and supports **asset creation and verification**.

---

## Project Structure
..\Automation\snipeitapp-playwright-automation 
├── data/
│ └── users.json # Test user credentials
├── fixtures/
│ └── pageFixtures.ts # Playwright fixtures and custom test setup
├── pages/
│ ├── AssetPage.ts # Page object for asset creation & history
│ ├── AssetListPage.ts # Page object for asset listing & search
│ └── LoginPage.ts # Page object for login
├── support/
│ ├── constants.ts # URLs and status constants
│ └── utils.ts # Utility functions
├── tests/ui/
│ └── assets.spec.ts # Test scenarios
├── global.setup.ts # Pre-test login setup
├── playwright.config.ts # Playwright configuration
├── storageState.json # Logged-in session state
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation


## Prerequisites

- Node.js (v20+ recommended)
- Yarn or npm
- Git
- Playwright


## Setup Instructions
1. **Clone the repository**:

```bash
git clone https://github.com/<USERNAME>/snipeitapp-playwright-automation.git
cd snipeitapp-playwright-automation

yarn install
npx playwright install

##The project uses a pre-authenticated session stored in storageState.json. If you want to regenerate:
npx playwright test --global-setup

## Running Test
### Run command below to run e2e test runner running in the background 
yarn e2e
### Run command below to show test report
yarn report

## Open Playwright Test Runner UI:
npx playwright test --ui
