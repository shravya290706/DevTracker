function getFilteredExpenses() {
  const category = document.getElementById('filterCategory').value;
  const month = document.getElementById('filterMonth').value;
  let expenses = getExpenses();

  if (category !== 'All') {
    expenses = expenses.filter(e => e.category === category);
  }
  if (month) {
    expenses = expenses.filter(e => e.date && e.date.startsWith(month));
  }
  return expenses;
}

function refreshUI() {
  render(getFilteredExpenses());
}

// Add expense
document.getElementById('addBtn').addEventListener('click', () => {
  const desc = document.getElementById('descInput').value.trim();
  const amount = document.getElementById('amountInput').value.trim();
  const category = document.getElementById('categoryInput').value;
  const date = document.getElementById('dateInput').value;

  if (!desc || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  addExpense({ id: generateId(), description: desc, amount, category, date });

  document.getElementById('descInput').value = '';
  document.getElementById('amountInput').value = '';
  document.getElementById('dateInput').value = '';

  refreshUI();
});

// Delete expense (event delegation)
document.getElementById('expenseList').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteExpense(e.target.dataset.id);
    refreshUI();
  }
});

// Filters
document.getElementById('filterCategory').addEventListener('change', refreshUI);
document.getElementById('filterMonth').addEventListener('change', refreshUI);

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('filterCategory').value = 'All';
  document.getElementById('filterMonth').value = '';
  refreshUI();
});

// Initial load
refreshUI();
