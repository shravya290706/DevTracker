function renderExpenses(expenses) {
  const list = document.getElementById('expenseList');
  list.innerHTML = '';

  if (expenses.length === 0) {
    list.innerHTML = '<li class="empty-msg">No expenses found. Add one above!</li>';
    return;
  }

  expenses.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="expense-info">
        <span class="expense-desc">${e.description}</span>
        ${e.note ? `<span class="expense-note">${e.note}</span>` : ''}
        <span class="expense-meta">
          <span class="category-badge cat-${e.category}">${e.category}</span>
          ${formatDate(e.date)}
        </span>
      </div>
      <div class="expense-right">
        <span class="expense-amount">${formatCurrency(e.amount)}</span>
        <button class="edit-btn" data-id="${e.id}">✏️</button>
        <button class="delete-btn" data-id="${e.id}">✕</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderSummary(expenses) {
  document.getElementById('totalAmount').textContent = formatCurrency(calcTotal(expenses));
  document.getElementById('totalCount').textContent = expenses.length;
}

function renderChart(expenses) {
  const chart = document.getElementById('chart');
  chart.innerHTML = '';
  const byCategory = calcByCategory(expenses);
  const max = Math.max(...Object.values(byCategory), 1);

  if (Object.keys(byCategory).length === 0) {
    chart.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:0.78rem">No data yet.</p>';
    return;
  }

  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, total]) => {
      const pct = (total / max) * 100;
      const row = document.createElement('div');
      row.className = 'chart-row';
      row.innerHTML = `
        <span class="chart-label">${cat}</span>
        <div class="chart-bar-wrap">
          <div class="chart-bar chart-${cat}" style="width:${pct}%"></div>
        </div>
        <span class="chart-amount">${formatCurrency(total)}</span>
      `;
      chart.appendChild(row);
    });
}

function renderBudget(expenses) {
  const budget = getBudget();
  const total = calcTotal(expenses);
  const left = budget - total;
  const budgetLeft = document.getElementById('budgetLeft');
  const budgetBarWrap = document.getElementById('budgetBarWrap');
  const budgetBarFill = document.getElementById('budgetBarFill');
  const budgetWarning = document.getElementById('budgetWarning');

  if (!budget) {
    budgetLeft.textContent = '—';
    budgetBarWrap.style.display = 'none';
    return;
  }

  budgetLeft.textContent = formatCurrency(left);
  budgetBarWrap.style.display = 'block';

  const pct = Math.min((total / budget) * 100, 100);
  budgetBarFill.style.width = pct + '%';
  budgetBarFill.className = 'budget-bar-fill' + (pct >= 100 ? ' over' : pct >= 80 ? ' warning' : '');
  budgetWarning.textContent = pct >= 100 ? '⚠️ You have exceeded your budget!' : pct >= 80 ? '⚠️ You are close to your budget limit.' : '';
}

function render(filtered, all) {
  renderExpenses(filtered);
  renderSummary(filtered);
  renderChart(all);
  renderBudget(all);
}
