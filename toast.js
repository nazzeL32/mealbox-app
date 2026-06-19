/**
 * toast.js — Toast Notification System
 * MealBox Platform
 */

let toastTimer = null;

function showToast(icon, message) {
  const toast = document.getElementById('toast');
  const iconEl = document.getElementById('t-icon');
  const msgEl  = document.getElementById('t-msg');

  if (!toast) return;

  iconEl.textContent = icon;
  msgEl.textContent  = message;

  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
