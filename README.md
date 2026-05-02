# Expense Tracker

A simple personal expense tracker built with HTML, CSS, and JavaScript.

## Features
- Add expenses with description, amount, category, and date
- Filter expenses by category or month
- See total spent and per-category breakdown
- Data persists in localStorage (no backend needed)
- Delete individual expenses

## How to Run
Just open `index.html` in your browser. No setup needed.

## Project Structure
```
expense-tracker/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── app.js       ← entry point, event listeners
        ├── storage.js   ← localStorage read/write
        ├── ui.js        ← DOM rendering
        └── utils.js     ← helper functions
```

## Live Demo
[View Live App](https://dev-tracker-amber.vercel.app/login.html)
