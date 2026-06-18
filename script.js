let budget = {
  salaryTotal: 0,
  needs: 0,
  wants: 0,
  savings: 0,
  spent: {
    needs: 0,
    wants: 0,
    savings: 0,
  },
};

let lastExpense = null;
let currentAlertCallback = null;

function openExpenseModal() {
  document.getElementById("expenseModal").style.display = "flex";
}

function closeExpenseModal() {
  document.getElementById("expenseModal").style.display = "none";
}

function openSalaryModal() {
  document.getElementById("salaryModal").style.display = "flex";
}

function closeSalaryModal() {
  document.getElementById("salaryModal").style.display = "none";
}

/* Custom Unified UI Alert System replacing ugly default confirm/prompts */
function showActionAlert(type) {
  const alertOverlay = document.getElementById("systemAlert");
  const title = document.getElementById("alertTitle");
  const message = document.getElementById("alertMessage");
  const inputWrapper = document.getElementById("alertInputWrapper");
  const actionBtn = document.getElementById("alertConfirmBtn");
  const promptInput = document.getElementById("alertPromptInput");

  // Reset display styles
  inputWrapper.style.display = "none";
  actionBtn.classList.remove("danger-action");
  promptInput.value = "";

  if (type === "undo") {
    if (!lastExpense) {
      title.innerText = "Nothing to Undo";
      message.innerText =
        "You have no tracked expenses recorded in this session history.";
      actionBtn.innerText = "OK";
      currentAlertCallback = () => closeSystemAlert();
    } else {
      let amt = `₱${lastExpense.amount.toLocaleString()}`;
      let cat =
        lastExpense.category.charAt(0).toUpperCase() +
        lastExpense.category.slice(1);
      title.innerText = "Undo Expense?";
      message.innerText = `Are you sure you want to revert the expense of ${amt} matching your "${cat}" allocation?`;
      actionBtn.innerText = "Undo Action";
      actionBtn.classList.add("danger-action");
      currentAlertCallback = () => executeUndoExpense();
    }
  } else if (type === "reset") {
    title.innerText = "Reset All Data";
    message.innerText =
      "This action is destructive. Please supply the administrator passphrase sequence to format this register ledger:";
    inputWrapper.style.display = "block";
    actionBtn.innerText = "Erase All";
    actionBtn.classList.add("danger-action");
    currentAlertCallback = () => executeResetBudget();
  }

  alertOverlay.style.display = "flex";
}

function closeSystemAlert() {
  document.getElementById("systemAlert").style.display = "none";
}

document.getElementById("alertConfirmBtn").addEventListener("click", () => {
  if (currentAlertCallback) currentAlertCallback();
});

function addSalary() {
  let salary = Number(document.getElementById("salaryInput").value);
  if (!salary) return;

  budget.salaryTotal += salary;
  budget.needs += salary * 0.5;
  budget.wants += salary * 0.3;
  budget.savings += salary * 0.2;

  document.getElementById("salaryInput").value = "";
  saveData();
  render();
  closeSalaryModal();
}

function addExpense() {
  let amount = Number(document.getElementById("expenseAmount").value);
  let category = document.getElementById("expenseCategory").value;
  if (!amount) return;

  lastExpense = { amount, category };
  budget.spent[category] += amount;

  document.getElementById("expenseAmount").value = "";
  saveData();
  render();
  closeExpenseModal();
}

function executeUndoExpense() {
  budget.spent[lastExpense.category] -= lastExpense.amount;
  lastExpense = null;
  saveData();
  render();
  closeSystemAlert();
}

function executeResetBudget() {
  let code = document.getElementById("alertPromptInput").value;
  if (code === "abcde12345") {
    budget = {
      salaryTotal: 0,
      needs: 0,
      wants: 0,
      savings: 0,
      spent: { needs: 0, wants: 0, savings: 0 },
    };
    lastExpense = null;
    saveData();
    render();
    closeSystemAlert();
  } else {
    // Show sub-error state
    document.getElementById("alertMessage").innerText =
      "Invalid security token mismatch. Please try again:";
    document.getElementById("alertPromptInput").value = "";
  }
}

function render() {
  let output = document.getElementById("output");

  if (budget.salaryTotal === 0) {
    output.innerHTML = `
      <div style="text-align: center; margin-top: 60px; color: var(--ios-tertiary-label); padding: 0 24px;">
        <p style="font-size: 19px; font-weight: 600; color: var(--ios-label);">No Active Budget Set</p>
        <p style="font-size: 15px; margin-top: 6px; line-height: 1.4;">Tap "+ Salary" on the active navigation drawer to establish allocations.</p>
      </div>`;
    return;
  }

  let totalSpent =
    budget.spent.needs + budget.spent.wants + budget.spent.savings;
  let totalRemaining = budget.salaryTotal - totalSpent;

  // Manage semantic tracking colors for central balance container
  let balanceStatusClass = "safe";
  if (totalRemaining <= budget.salaryTotal * 0.15) {
    balanceStatusClass = "critical";
  } else if (totalRemaining <= budget.salaryTotal * 0.4) {
    balanceStatusClass = "warning";
  }

  let html = `
    <div class="ios-summary-card">
      <div class="summary-item">
        <span class="summary-label">Available Balance</span>
        <span class="summary-val ${balanceStatusClass}">₱${totalRemaining.toLocaleString()}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-grid">
        <div>
          <span class="summary-label">Total Salary</span>
          <span class="summary-val mini">₱${budget.salaryTotal.toLocaleString()}</span>
        </div>
        <div>
          <span class="summary-label">Total Spent</span>
          <span class="summary-val mini" style="color: var(--ios-red)">₱${totalSpent.toLocaleString()}</span>
        </div>
      </div>
    </div>

    <div class="section-title">Allocations</div>
    <div class="ios-group">
      ${createCategoryRow("Needs (50%)", "needs", "var(--ios-blue)")}
      ${createCategoryRow("Wants (30%)", "wants", "var(--ios-orange)")}
      ${createCategoryRow("Savings (20%)", "savings", "var(--ios-green)")}
    </div>
  `;

  output.innerHTML = html;
}

function createCategoryRow(title, key, themeColor) {
  let spent = budget.spent[key];
  let total = budget[key];
  let remaining = total - spent;
  let percent = total > 0 ? Math.min((spent / total) * 100, 100) : 0;

  let statusClass = "status-normal";
  if (remaining <= total * 0.2) {
    statusClass = "status-critical";
  } else if (remaining <= total * 0.5) {
    statusClass = "status-warning";
  }

  return `
    <div class="category-row">
      <div class="category-meta">
        <span class="category-title"><span class="dot" style="background:${themeColor}"></span>${title}</span>
        <span class="category-remaining ${statusClass}">₱${remaining.toLocaleString()} left</span>
      </div>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${percent}%; background-color: ${themeColor};"></div>
      </div>
      <div class="category-sub">
        <span>Spent: ₱${spent.toLocaleString()}</span>
        <span>Limit: ₱${total.toLocaleString()}</span>
      </div>
    </div>
  `;
}

function saveData() {
  localStorage.setItem("budgetData", JSON.stringify(budget));
}

function loadData() {
  let data = localStorage.getItem("budgetData");
  if (data) {
    budget = JSON.parse(data);
    if (budget.salaryTotal === undefined) budget.salaryTotal = 0;
  }
  render();
}

function unlockApp() {
  let input = document.getElementById("pinInput").value;
  let storedPin = localStorage.getItem("pin") || "1234";

  if (input === storedPin) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("app").style.display = "flex";
  } else {
    showActionAlert("wrong_pin");
    document.getElementById("pinInput").value = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  document.getElementById("currentDate").innerText =
    new Date().toLocaleDateString("en-US", options);
  loadData();
});
