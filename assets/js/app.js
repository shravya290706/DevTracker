import { getExpenses, addExpense, deleteExpense, updateExpense, getBudget, saveBudget, getUser } from './storage.js';
import { supabase } from './supabase.js';
import { formatCurrency, formatDate, generateId, calcTotal, calcByCategory, sortExpenses, exportToCSV, showToast } from './utils.js';
import { render } from './ui.js';

let editingId = null;

// Auth guard — redirect to login if not logged in
const user = await getUser();
if (!user) window.location.href = 'login.html';

// Show user email
document.getElementById('userEmail').textContent = user.email;

function getFilters() {
  return {
    category: document.getElementById('filterCategory').value,
    month: document.getElementById('filterMonth').value,
    sortBy: document.getElementById('sortBy').value,
    search: document.getElementById('searchInput').value.trim().toLowerCase()
  };
}

async function getFilteredAndSorted() {
  const { category, month, sortBy, search } = getFilters();
  let expenses = await getExpenses();

  if (category !== 'All') expenses = expenses.filter(e => e.category === category);
  if (month) expenses = expenses.filter(e => e.date && e.date.startsWith(month));
  if (search) expenses = expenses.filter(e => e.description.toLowerCase().includes(search));

  return sortExpenses(expenses, sortBy);
}

async function refreshUI() {
  const all = await getExpenses();
  const filtered = await getFilteredAndSorted();
  render(filtered, all, getBudget);
}

// Add expense
async function handleAdd() {
  const desc = document.getElementById('descInput').value.trim();
  const amount = document.getElementById('amountInput').value.trim();
  const category = document.getElementById('categoryInput').value;
  const date = document.getElementById('dateInput').value;
  const note = document.getElementById('noteInput').value.trim();

  if (!desc || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    showToast('Please enter a valid description and amount.', 'error');
    return;
  }

  await addExpense({ description: desc, amount, category, date, note });

  document.getElementById('descInput').value = '';
  document.getElementById('amountInput').value = '';
  document.getElementById('noteInput').value = '';
  document.getElementById('dateInput').value = '';

  showToast('Expense added!', 'success');
  await refreshUI();
}

document.getElementById('addBtn').addEventListener('click', handleAdd);
document.getElementById('amountInput').addEventListener('keydown', e => { if (e.key === 'Enter') handleAdd(); });

// Delete & Edit
document.getElementById('expenseList').addEventListener('click', async (e) => {
  if (e.target.classList.contains('delete-btn')) {
    await deleteExpense(e.target.dataset.id);
    showToast('Expense deleted.', 'error');
    await refreshUI();
  }

  if (e.target.classList.contains('edit-btn')) {
    const all = await getExpenses();
    const expense = all.find(ex => ex.id === e.target.dataset.id);
    if (!expense) return;
    editingId = expense.id;
    document.getElementById('editDesc').value = expense.description;
    document.getElementById('editAmount').value = expense.amount;
    document.getElementById('editCategory').value = expense.category;
    document.getElementById('editDate').value = expense.date;
    document.getElementById('editNote').value = expense.note || '';
    document.getElementById('modalOverlay').classList.add('active');
  }
});

// Save edit
document.getElementById('saveEditBtn').addEventListener('click', async () => {
  const desc = document.getElementById('editDesc').value.trim();
  const amount = document.getElementById('editAmount').value.trim();
  const category = document.getElementById('editCategory').value;
  const date = document.getElementById('editDate').value;
  const note = document.getElementById('editNote').value.trim();

  if (!desc || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
    showToast('Please enter a valid description and amount.', 'error');
    return;
  }

  await updateExpense(editingId, { description: desc, amount, category, date, note });
  document.getElementById('modalOverlay').classList.remove('active');
  editingId = null;
  showToast('Expense updated!', 'success');
  await refreshUI();
});

document.getElementById('cancelEditBtn').addEventListener('click', () => {
  document.getElementById('modalOverlay').classList.remove('active');
  editingId = null;
});

// Set budget
document.getElementById('setBudgetBtn').addEventListener('click', async () => {
  const val = document.getElementById('budgetInput').value.trim();
  if (!val || isNaN(val) || parseFloat(val) <= 0) {
    showToast('Please enter a valid budget amount.', 'error');
    return;
  }
  saveBudget(parseFloat(val));
  document.getElementById('budgetInput').value = '';
  showToast('Budget set!', 'success');
  await refreshUI();
});

// Filters
document.getElementById('filterCategory').addEventListener('change', refreshUI);
document.getElementById('filterMonth').addEventListener('change', refreshUI);
document.getElementById('sortBy').addEventListener('change', refreshUI);
document.getElementById('searchInput').addEventListener('input', refreshUI);

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('filterCategory').value = 'All';
  document.getElementById('filterMonth').value = '';
  document.getElementById('sortBy').value = 'date-desc';
  document.getElementById('searchInput').value = '';
  refreshUI();
});

// Export
document.getElementById('exportBtn').addEventListener('click', async () => {
  exportToCSV(await getFilteredAndSorted());
});

// Dark mode
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
});

// Initial load
await refreshUI();
