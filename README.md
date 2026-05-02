# 💸 ExpenseTrack

A full-stack personal expense tracker built with vanilla HTML, CSS, and JavaScript — powered by Supabase for authentication and real-time database storage.

🔗 **Live Demo:** [https://dev-tracker-amber.vercel.app/login.html](https://dev-tracker-amber.vercel.app/login.html)

---

## 📸 Screenshots

> Add screenshots here after taking them from your live app

---

## ✨ Features

- 🔐 **Authentication** — Secure signup and login powered by Supabase Auth
- 💾 **Real Database** — Expenses saved to PostgreSQL via Supabase (not localStorage)
- 🔒 **Row Level Security** — Users can only access their own data
- ➕ **Add Expenses** — Description, amount, category, date and optional note
- ✏️ **Edit & Delete** — Modify or remove any expense
- 📊 **Category Chart** — Visual bar chart showing spending per category
- 🎯 **Monthly Budget** — Set a budget with a progress bar and warning alerts
- 🔍 **Search & Filter** — Search by name, filter by category or month
- 🔃 **Sort** — Sort by date or amount
- ⬇️ **Export to CSV** — Download your expenses as a spreadsheet
- 🌙 **Dark Mode** — Toggle between light and dark theme
- 📱 **Responsive** — Works on mobile and desktop
- 🔔 **Toast Notifications** — Clean feedback instead of browser alerts

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript (ES Modules) |
| Auth | Supabase Authentication |
| Database | Supabase (PostgreSQL) |
| Hosting | Vercel |

---

## 📁 Project Structure

```
expense-tracker/
├── login.html                  ← Auth page (signup/login)
├── index.html                  ← Main app dashboard
├── .gitignore
├── README.md
└── assets/
    ├── css/
    │   ├── style.css           ← Main app styles
    │   └── auth.css            ← Login page styles
    └── js/
        ├── supabase.js         ← Supabase client initialization
        ├── app.js              ← Entry point, event listeners
        ├── storage.js          ← All Supabase database calls
        ├── ui.js               ← DOM rendering functions
        └── utils.js            ← Helper functions (format, sort, export)
```

---

## 🗄️ Database Schema

```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  description text not null,
  amount numeric not null,
  category text not null,
  date text,
  note text,
  created_at timestamp default now()
);
```

Row Level Security is enabled — users can only read and write their own expenses.

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/shravya290706/DevTracker.git
cd DevTracker/expense-tracker
```

### 2. Set up Supabase
- Create a free project at [supabase.com](https://supabase.com)
- Run the SQL schema above in the SQL Editor
- Enable Row Level Security and add the policy
- Copy your Project URL and Publishable Key

### 3. Add your Supabase credentials
Open `assets/js/supabase.js` and replace:
```js
const SUPABASE_URL = 'your_project_url';
const SUPABASE_KEY = 'your_publishable_key';
```

### 4. Run locally
Open `login.html` with a Live Server extension in VS Code.

> ⚠️ Must use Live Server or a local server — ES Modules don't work with direct file:// opening

---

## 🌿 Git Workflow

This project follows a feature branch workflow:

```
main          ← stable, deployed code
└── develop   ← integration branch
    ├── feature/ui-redesign
    ├── feature/ui-improvements
    └── feature/supabase-auth
```

Every feature is developed on its own branch, merged into `develop` via Pull Request, then merged into `main` for deployment.

---

## 📦 Deployment

Deployed on **Vercel** with automatic deployments on every push to `main`.

To deploy your own:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add your Vercel URL to Supabase → Authentication → URL Configuration

---

## 🔮 Planned Features

- [ ] Recurring expenses
- [ ] Email alerts when budget is exceeded
- [ ] Profile page with currency preferences
- [ ] Monthly spending history
- [ ] Node.js + Express backend version

---

## 👩‍💻 Author

**Shravya** — [github.com/shravya290706](https://github.com/shravya290706)
