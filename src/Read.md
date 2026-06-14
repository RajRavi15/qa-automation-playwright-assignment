# QA Automation Framework - Playwright + Cucumber

## 📌 Tech Stack
- Playwright (UI Automation)
- Cucumber (BDD)
- TypeScript
- API Testing (Custom Client)
- Allure Reporting

## 📂 Project Structure
- src/features → Feature files
- src/steps → Step definitions
- src/pages → Page Object Model
- src/api → API layer
- src/hooks → Hooks & setup

## ▶️ Run Tests

### UI Tests
npm run ui:bdd

### API Tests
npm run api:bdd

### All Tests
npx cucumber-js src/features --require src/steps/**/*.ts --require-module ts-node/register

## 📊 Allure Report

Generate report:
npm run allure:generate

Open report:
npm run allure:open

## 💡 Highlights
- BDD framework with reusable steps
- Page Object Model implementation
- API + UI combined testing
- Network interception scenario
- Multi-session browser testing
- Allure reporting with screenshots
