/**
 * router.js — Page Navigation / SPA Router
 * MealBox Platform
 */

const PAGE_INIT = {
  menu:      initMenuPage,
  dashboard: initDashboard,
};

function showPage(name) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Remove active from nav links
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target page
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');

  // Activate nav link
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');

  // Scroll to top
  window.scrollTo(0, 0);

  // Run page init if needed
  if (PAGE_INIT[name]) {
    setTimeout(PAGE_INIT[name], 50);
  }
}
