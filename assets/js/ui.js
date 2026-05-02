function renderExpenses(expenses) {
  const list = document.getElementById('expenseList');
  list.innerHTML = '';

  if (expenses.length === 0) {
    list.innerHTML = '<li class="empty-msg">No expenses yet. Add one above!</li>';
    return;
  }

  expenses.forEach(e => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="expense-info">
        <span>${e.description}</span>
        <span class="expense-meta">${e.category} · ${formatDate(e.date)}</span>
      </div>
      <div class="expense-right">
        <span class="expense-amount">${formatCurrency(e.amount)}</span>
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

function renderBreakdown(expenses) {
  const breakdown = document.getElementById('breakdown');
  breakdown.innerHTML = '';
  const byCategory = calcByCategory(expenses);
  Object.entries(byCategory).forEach(([cat, total]) => {
    const span = document.createElement('span');
    span.className = 'breakdown-item';
    span.textContent = `${cat}: ${formatCurrency(total)}`;
    breakdown.appendChild(span);
  });
}

function render(expenses) {
  renderExpenses(expenses);
  renderSummary(expenses);
  renderBreakdown(expenses);
}
