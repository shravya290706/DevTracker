function formatCurrency(amount) {
  return '$' + parseFloat(amount).toFixed(2);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

function generateId() {
  return Date.now().toString();
}

function calcTotal(expenses) {
  return expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
}

function calcByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + parseFloat(e.amount);
    return acc;
  }, {});
}
