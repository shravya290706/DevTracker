export function formatCurrency(amount) {
  return '₹' + parseFloat(amount).toFixed(2);
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function generateId() {
  return Date.now().toString();
}

export function calcTotal(expenses) {
  return expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
}

export function calcByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + parseFloat(e.amount);
    return acc;
  }, {});
}

export function sortExpenses(expenses, sortBy) {
  const sorted = [...expenses];
  switch (sortBy) {
    case 'date-asc':    return sorted.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
    case 'date-desc':   return sorted.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    case 'amount-asc':  return sorted.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
    case 'amount-desc': return sorted.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));
    default:            return sorted;
  }
}

export function exportToCSV(expenses) {
  if (expenses.length === 0) return showToast('No expenses to export.', 'error');
  const header = 'Description,Amount,Category,Date,Note';
  const rows = expenses.map(e => `"${e.description}",${e.amount},${e.category},${e.date},"${e.note || ''}"`);
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'expenses.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported successfully!', 'success');
}

let toastTimer;
export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}
