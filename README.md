# SauceDemo Playwright Automation Framework

Playwright (TypeScript) end-to-end automation suite for **SauceDemo** (https://www.saucedemo.com/),
built as part of the QA Automation Assessment — Phase 2.

The suite automates the 8 mandatory critical business scenarios identified from the Phase 1
manual test cases, following the **Page Object Model (POM)** with locators, fixtures, and test
data kept in dedicated, reusable modules.

---

## 1. Project Structure

```
project/
├── tests/                  # Test specs (.spec.ts) grouped by module
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── logout.spec.ts
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── locators/                # Selectors, isolated from page logic
│   ├── loginLocators.ts
│   ├── productsLocators.ts
│   ├── cartLocators.ts
│   └── checkoutLocators.ts
├── fixtures/                # Custom Playwright fixtures (page-object & login injection)
│   └── testFixtures.ts
├── utils/                   # Generic helpers (slugify, price parsing, screenshots, retry)
│   └── testHelper.ts
├── test-data/                # Test data separated from test logic
│   ├── users.json
│   └── checkoutInfo.json
├── reports/                  # Generated HTML/JUnit reports (created on test run)
├── screenshots/               # Manually captured screenshots (created on test run)
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## 2. Mandatory Automated Scenarios

| # | Scenario                     | Spec file            |
|---|-------------------------------|-----------------------|
| 1 | Valid Login                   | `tests/login.spec.ts`    |
| 2 | Invalid Login                  | `tests/login.spec.ts`    |
| 3 | Verify Products Page           | `tests/products.spec.ts` |
| 4 | Add Two Products to Cart       | `tests/cart.spec.ts`     |
| 5 | Remove One Product from Cart   | `tests/cart.spec.ts`     |
| 6 | Complete Checkout              | `tests/checkout.spec.ts` |
| 7 | Verify Order Confirmation      | `tests/checkout.spec.ts` |
| 8 | Logout                        | `tests/logout.spec.ts`   |

Each spec file also includes a handful of additional, related test cases pulled from the
Phase 1 manual test case sheet (e.g. empty-field validation, locked-out user, sorting,
cancel flows) to demonstrate broader coverage beyond the 8 mandatory scenarios.

## 3. Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (v20 LTS recommended)
- npm v9 or later (bundled with Node.js)

Verify your versions:
```bash
node -v
npm -v
```

## 4. Installation

1. Extract/clone the project and move into its folder:
   ```bash
   cd project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install the Playwright browser binaries (Chromium, Firefox, WebKit):
   ```bash
   npx playwright install --with-deps
   ```
   > On a machine without permission to install OS-level dependencies, drop `--with-deps` and
   > run `npx playwright install` instead.

## 5. Running the Tests

Run the full suite (all browsers configured in `playwright.config.ts`):
```bash
npm test
```

Run in headed mode (see the browser):
```bash
npm run test:headed
```

Run with the interactive Playwright UI runner (recommended for debugging):
```bash
npm run test:ui
```

Run a single module's specs:
```bash
npm run test:login
npm run test:products
npm run test:cart
npm run test:checkout
npm run test:logout
```

Run a specific browser project only:
```bash
npx playwright test --project=chromium
```

Run only smoke-tagged tests:
```bash
npx playwright test --grep @smoke
```

Debug a specific test:
```bash
npx playwright test tests/login.spec.ts --debug
```

## 6. Reports

- **HTML report** is generated automatically after every run at `reports/html-report/`.
  Open it with:
  ```bash
  npm run report
  ```
- **JUnit XML** report (for CI pipelines) is written to `reports/junit-results.xml`.
- **Console/list output** is printed during the run.

## 7. Screenshots & Videos

- On any **test failure**, Playwright automatically captures a screenshot and a video,
  saved under `test-results/` (configured via `screenshot: 'only-on-failure'` and
  `video: 'retain-on-failure'` in `playwright.config.ts`).
- The `TestHelper.captureScreenshot()` utility can additionally be called from any test to
  save a manual, timestamped screenshot into the `screenshots/` folder.
- On failed retries, a **Playwright trace** is captured (`trace: 'on-first-retry'`) — view it
  with:
  ```bash
  npx playwright show-trace test-results/<test-folder>/trace.zip
  ```

## 8. Framework Design Notes

- **Page Object Model (POM):** each page has a dedicated class in `pages/` that exposes
  high-level actions (`login()`, `addProductToCart()`, `checkout()`) — tests never touch raw
  selectors directly.
- **Locators separated:** all CSS/data-test selectors live in `locators/`, so a UI change only
  requires updating one file instead of every test.
- **Fixtures:** `fixtures/testFixtures.ts` extends Playwright's base `test` to auto-inject page
  objects and provides a `loggedInPage` fixture, eliminating repeated login steps across specs.
- **Test data separation:** credentials and checkout information live in `test-data/*.json`,
  not hardcoded inside specs.
- **Assertions:** Playwright's built-in `expect` with web-first, auto-retrying assertions
  (`toHaveURL`, `toBeVisible`, `toHaveText`, `toHaveCount`) are used throughout for stability.
- **Explicit waits:** navigation/assertion calls (`waitForURL`, `expect(...).toBeVisible()`)
  are used instead of arbitrary `page.waitForTimeout()` sleeps.
- **Config:** `playwright.config.ts` centralizes timeouts, retries, reporters, and the
  `baseURL`, so tests use relative paths (`loginPage.open()` → `/`) rather than hardcoded URLs.

## 9. Test Credentials Used (SauceDemo standard demo accounts)

| User                       | Password       | Purpose                          |
|-----------------------------|----------------|------------------------------------|
| `standard_user`              | `secret_sauce` | Primary happy-path user            |
| `locked_out_user`            | `secret_sauce` | Negative login scenario            |
| `problem_user`                | `secret_sauce` | UI-defect exploratory user (not automated by default) |
| `performance_glitch_user`      | `secret_sauce` | Slow-load exploratory user (not automated by default) |

## 10. Troubleshooting

- **`Executable doesn't exist` error:** run `npx playwright install` before `npm test`.
- **Tests time out on first run:** check your network can reach `https://www.saucedemo.com/`.
- **Report doesn't open automatically:** it's set to `open: 'never'` in the config by design
  (CI-friendly); run `npm run report` to open it manually.
