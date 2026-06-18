# 💰 iOS-Style Budget Tracker PWA

A clean, offline-first personal finance application modeled after native iOS design systems. It helps you manage income distributions using flexible allocation models like the popular 50/30/20 rule, tracking expenses in real-time right from your device's home screen.

---

## 🚀 Core Features

### 📐 Smart Allocation & Settings Engine
* **Forward-Looking Custom Ratios:** Adjust allocation sliders anytime in Settings without disrupting your active, remaining balances. New rules apply smoothly to future income.
* **Scalable Architecture:** A decoupled Settings Panel separates configuration tools from daily transaction logging, creating an ideal slot for future feature expansions.

### 💸 Daily Ledger Management
* **Income Stacking:** Drop in fresh paychecks via `+ Salary` to accumulate balances dynamically across your budget envelopes rather than overwriting current history.
* **Granular Expense Tracking:** Sort spending quickly across localized category filters featuring instant progress bar updates.
* **Safety Nets:** Avoid data entry mistakes with a built-in one-click **Undo Last Expense** function.

### 🔒 Enterprise Protection & Performance
* **Destructive Safety Gates:** Crucial data flushes require an administrator confirmation passphrase sequence (`abcde12345`) to prevent accidental wipeouts.
* **Progressive Web App (PWA):** Fully optimized for an installable iOS standalone experience, complete with an app-like bottom navigation dock, safe-area padding layouts, and adaptive dark mode integration.
* **Privacy First:** Keep 100% ownership of your data. The application operates entirely offline, storing ledger entries locally via `LocalStorage`.

---

## 🎨 Budget Envelopes

The dashboard maps out your financial health into three core segments, dynamically applying status color states (**Normal**, **Warning**, **Critical**) as you approach category ceilings:

| Allocation Category | Default Split | Includes Targets Like... |
| :--- | :---: | :--- |
| **Needs** | `50%` | Rent, Utilities, Groceries, Insurance, Fixed Loans |
| **Wants** | `30%` | Dining Out, Shopping, Streaming Content, Hobbies |
| **Savings** | `20%` | Emergency Funds, Stocks, Crypto, Long-term Retirement |

---

## 🛠️ Tech Stack

* **Structure & UI:** Semantic HTML5, CSS3 Custom Variables (Dynamic Light/Dark Mode)
* **Logic Controller:** Vanilla JavaScript (ES6 Modules)
* **Data Persistence:** Web Storage API (`LocalStorage`)
* **Distribution Engine:** Service Worker API for local asset caching and offline functionality

---

## 📁 Project Structure

```text
budget-app/
├── index.html          # Application structure & modal containers
├── style.css           # Native iOS-style tokens & layout engines
├── script.js           # Transaction handler & state management logic
├── manifest.json       # PWA configurations & splash screen tokens
├── service-worker.js   # Offline caching rulesets
└── README.md           # Documentation guide
