const STORAGE_KEY = 'expense_tracker_data';

function getExpenses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function addExpense(expense) {
  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
}

function deleteExpense(id) {
  const expenses = getExpenses().filter(e => e.id !== id);
  saveExpenses(expenses);
}
