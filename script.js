let budget = {
  salaryTotal: 0, // Fixed: Initialized to prevent NaN
  needs: 0,
  wants: 0,
  savings: 0,
  spent: {
    needs: 0,
    wants: 0,
    savings: 0,
  },
};

function calculateBudget() {
  let salary = Number(document.getElementById("salary").value);
  if (!salary) return;

  budget.salaryTotal += salary;
  budget.needs += salary * 0.5;
  budget.wants += salary * 0.3;
  budget.savings += salary * 0.2;

  document.getElementById("salary").value = "";
  saveData();
  render();
}

function addExpense() {
  let amount = Number(document.getElementById("amount").value);
  let category = document.getElementById("category").value;
  if (!amount) return;

  budget.spent[category] += amount;

  document.getElementById("amount").value = "";
  saveData();
  render();
}

function render() {
  let output = document.getElementById("output");

  if (budget.salaryTotal === 0) {
    output.innerHTML = "";
    return;
  }

  let totalSpent =
    budget.spent.needs + budget.spent.wants + budget.spent.savings;
  let totalRemaining = budget.salaryTotal - totalSpent;

  let html = `
    <div class="ios-summary-card">
      <div class="summary-item">
        <span class="summary-label">Total Salary</span>
        <span class="summary-val">₱${budget.salaryTotal.toLocaleString()}</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-grid">
        <div>
          <span class="summary-label">Spent</span>
          <span class="summary-val mini">₱${totalSpent.toLocaleString()}</span>
        </div>
        <div>
          <span class="summary-label">Available</span>
          <span class="summary-val mini safe">₱${totalRemaining.toLocaleString()}</span>
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

  // Calculate percentage for progress bar
  let percent = total > 0 ? Math.min((spent / total) * 100, 100) : 0;

  // iOS dynamic status tints
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
    // Backward compatibility check for existing items in storage without total initialized
    if (budget.salaryTotal === undefined) budget.salaryTotal = 0;
    render();
  }
}

function resetBudget() {
  let code = prompt("Enter reset code:");
  if (code === "abcde12345") {
    budget = {
      salaryTotal: 0,
      needs: 0,
      wants: 0,
      savings: 0,
      spent: { needs: 0, wants: 0, savings: 0 },
    };
    saveData();
    render();
    alert("Budget cleared successfully!");
  } else {
    alert("Incorrect code.");
  }
}

loadData();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(() => {});
}
