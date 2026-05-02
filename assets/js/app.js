let editingId = null;

function getFilteredAndSorted() {
  const category = document.getElementById('filterCategory').value;
  const month = document.getElementById('filterMonth').value;
  const sortBy = document.getElementById('sortBy').value;
  let expenses = getExpenses();

  if (category !== 'All') expenses = expenses.filter(e => e.category === category);
  if (month) expenses = expenses.filter(e => e.date && e.date.startsWith(month));

  return sortExpenses(expenses, sortBy);
}

function refreshUI() {
  render(getFilteredAndSorted());
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

// Delete & Edit (event delegation)
document.getElementById('expenseList').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    deleteExpense(e.target.dataset.id);
    refreshUI();
  }

  if (e.target.classList.contains('edit-btn')) {
    const expense = getExpenses().find(ex => ex.id === e.target.dataset.id);
    if (!expense) return;
    editingId = expense.id;
    document.getElementById('editDesc').value = expense.description;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editDate').value = expense.date;
    document.getElementById('modalOverlay').classList.add('active');
  }
});

// Save edit
document.getElementById('saveEditBtn').addEventListener('click', () => {
  const desc = document.getElementById('editDesc').value.trim();
  const amount = document.getElementById('editAmount').value.trim();
  const category = document.getElementById('editCategory').value;
  const date = document.getElementById('editDate').value;

  if (!desc || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    alert('Please enter a valid description and amount.');
    return;
  }

  updateExpense(editingId, { description: desc, amount, category, date });
  document.getElementById('modalOverlay').classList.remove('active');
  editingId = null;
  refreshUI();
});

// Cancel edit
document.getElementById('cancelEditBtn').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('active');
  editingId = null;
});

// Set budget
document.getElementById('setBudgetBtn').addEventListener('click', () => {
  const val = document.getElementById('budgetInput').value.trim();
  if (!val || isNaN(val) || parseFloat(val) <= 0) {
    alert('Please enter a valid budget amount.');
    return;
  }
  saveBudget(parseFloat(val));
  document.getElementById('budgetInput').value = '';
  refreshUI();
});

// Filters & sort
document.getElementById('filterCategory').addEventListener('change', refreshUI);
document.getElementById('filterMonth').addEventListener('change', refreshUI);
document.getElementById('sortBy').addEventListener('change', refreshUI);

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('filterCategory').value = 'All';
  document.getElementById('filterMonth').value = '';
  document.getElementById('sortBy').value = 'date-desc';
  refreshUI();
});

// Export CSV
document.getElementById('exportBtn').addEventListener('click', () => {
  exportToCSV(getFilteredAndSorted());
});

// Initial load
refreshUI();
