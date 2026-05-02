import { supabase } from './supabase.js';

// If already logged in, go to app
const { data: { session } } = await supabase.auth.getSession();
if (session) window.location.href = 'index.html';

// Tab switching
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.style.display = 'flex';
  signupForm.style.display = 'none';
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.style.display = 'flex';
  loginForm.style.display = 'none';
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');

  msg.textContent = 'Logging in...';
  msg.className = 'auth-msg';

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    msg.textContent = error.message;
  } else {
    msg.className = 'auth-msg success';
    msg.textContent = 'Success! Redirecting...';
    setTimeout(() => window.location.href = 'index.html', 800);
  }
});

// Signup
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const msg = document.getElementById('signupMsg');

  msg.textContent = 'Creating account...';
  msg.className = 'auth-msg';

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    msg.textContent = error.message;
  } else {
    msg.className = 'auth-msg success';
    msg.textContent = 'Account created! You can now log in.';
  }
});
