const STORAGE_KEY = 'expense_tracker_data';
const BUDGET_KEY = 'expense_tracker_budget';

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
  saveExpenses(getExpenses().filter(e => e.id !== id));
}

function updateExpense(id, updated) {
  saveExpenses(getExpenses().map(e => e.id === id ? { ...e, ...updated } : e));
}

function getBudget() {
  return parseFloat(localStorage.getItem(BUDGET_KEY)) || null;
}

function saveBudget(amount) {
  localStorage.setItem(BUDGET_KEY, amount);
}
