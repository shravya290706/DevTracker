import { supabase } from './supabase.js';

const BUDGET_KEY = 'expense_tracker_budget';

// Get current logged in user
async function getUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

async function getExpenses() {
  const user = await getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });
  if (error) { console.error(error); return []; }
  return data;
}

async function addExpense(expense) {
  const user = await getUser();
  if (!user) return;
  const { error } = await supabase.from('expenses').insert({
    user_id: user.id,
    description: expense.description,
    amount: expense.amount,
    category: expense.category,
    date: expense.date,
    note: expense.note || ''
  });
  if (error) console.error(error);
}

async function deleteExpense(id) {
  const { error } = await supabase.from('expenses').delete().eq('id', id);
  if (error) console.error(error);
}

async function updateExpense(id, updated) {
  const { error } = await supabase.from('expenses').update({
    description: updated.description,
    amount: updated.amount,
    category: updated.category,
    date: updated.date,
    note: updated.note || ''
  }).eq('id', id);
  if (error) console.error(error);
}

function getBudget() {
  return parseFloat(localStorage.getItem(BUDGET_KEY)) || null;
}

function saveBudget(amount) {
  localStorage.setItem(BUDGET_KEY, amount);
}

export { getExpenses, addExpense, deleteExpense, updateExpense, getBudget, saveBudget, getUser };
