/**
 * app.js — App Entry Point & Initializer
 * MealBox Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set today's date on menu page header
  const dateEl = document.getElementById('menu-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = 'Menu hari ini — ' + now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric'
    });
  }

  // Render home page menu preview (first 6 items)
  initHomePage();

  // Render full menu page
  initMenuPage();

  // Render order page
  initOrderPage();

  // Render tracking page
  initTrackingPage();

  // Render dashboard
  initDashboard();

  // Init cart UI
  updateCartUI();
});
