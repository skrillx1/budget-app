# 💰 Simple Budget Tracker

A clean, distraction-free budgeting tool that helps you manage your money using smart allocation rules. It works entirely offline, saves everything directly to your phone or computer, and can be installed as an app without downloading anything from the App Store.

🌐 **Try the Live App:** [skrillx1.github.io/budget-app/](https://skrillx1.github.io/budget-app/)

---

## ✨ What It Does

*   **Smart Money Splitting:** Automatically divides your incoming salary into three customizable envelopes: **Needs**, **Wants**, and **Savings**.
*   **Persistent Balances:** Adjust your budget ratios anytime in settings without messing up your current wallet balances—changes only apply to future paychecks.
*   **Quick Track & Oops-Proof:** Add expenses instantly or click "Undo" if you made a quick mistake typing one in.
*   **Total Privacy:** Your financial data belongs to you. No accounts, no links to bank accounts, and zero cloud data collection.
*   **Safe Keeping:** Includes a built-in safety lock to keep your dashboard secure and prevent accidental data resets.

---

## 📱 How to Install It on Your Phone

You don't need an app store. Because this is a **PWA (Progressive Web App)**, you can save it straight to your home screen in seconds.

### For iPhone & iPad (Safari)
1. Open Safari and go to: `https://skrillx1.github.io/budget-app/`
2. Tap the **Share** button (the square icon with an arrow pointing up at the bottom of the screen).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add** in the top right corner. The app icon will appear on your phone.

### For Android (Chrome)
1. Open Google Chrome and go to: `https://skrillx1.github.io/budget-app/`
2. Tap the **Three Dots** menu icon in the top-right corner.
3. Tap **Install app** or **Add to Home Screen**.
4. Follow the prompt to confirm.

---

## 🛠️ How it Works under the Hood

For the curious mind, here is how the app handles your money behind the scenes:

*   **LocalStorage:** The app uses your browser's built-in memory bank. If you close the tab, restart your phone, or switch off your internet, your entry history remains saved right there.
*   **Service Worker:** A small invisible script that allows the app's files to load instantly even if you are totally offline (like on a flight or in an area with bad reception).

---

## 📂 Project Structure

If you downloaded this code to look at files or run it locally on a computer, here is what is inside the folder:

```text
budget-app/
├── index.html          # The visual structure and pages
├── style.css           # Colors, layouts, and dark mode triggers
├── script.js          # The brain—calculates percentages and math
├── manifest.json       # Telling your phone it is an installable app
├── service-worker.js   # Handles offline capabilities
└── README.md           # This guide document
