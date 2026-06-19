/**
 * modal.js — Login / Register Modal
 * MealBox Platform
 */

function openModal() {
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

function switchTab(btn, tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function fakeLogin() {
  window.location.href = "login.php";
}

// Close on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }
});
