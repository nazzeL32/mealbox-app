/**
 * pages/menu.js — Menu Catalog Page
 * MealBox Platform
 */

window.initMenuPage = function(cat) {
  cat = cat || 'all';
  const page = document.getElementById('page-menu');
  if (!page) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const filtered = cat === 'all'
    ? MENUS
    : MENUS.filter(m => m.cat === cat || m.tags.includes(cat));

  const categories = [
    { key: 'all',        label: 'Semua'       },
    { key: 'nasi',       label: 'Nasi'        },
    { key: 'mie',        label: 'Mie & Bakmi' },
    { key: 'sehat',      label: 'Menu Sehat'  },
    { key: 'vegetarian', label: 'Vegetarian'  },
    { key: 'spesial',    label: 'Spesial'     },
  ];

  const tabsHtml = categories.map(c => `
    <button class="filter-tab ${c.key === cat ? 'active' : ''}"
      onclick="initMenuPage('${c.key}')">
      ${c.label}
    </button>`).join('');

  const cardsHtml = filtered.map(buildMenuCard).join('');

  page.innerHTML = `
    <div class="page-header">
      <h1>Menu Hari Ini</h1>
      <p>${dateStr}</p>
      <div class="filter-tabs">${tabsHtml}</div>
    </div>
    <div class="menu-page-grid">${cardsHtml}</div>
  `;
}

function buildMenuCard(menu) {
  const labels = { popular: 'Terlaris', spicy: 'Pedas', veg: 'Vegetarian', new: 'Baru' };
  const tagsHtml = menu.tags.map(t =>
    `<span class="tag ${t}">${labels[t] || t}</span>`
  ).join('');

  return `
    <div class="menu-card">
      <div class="menu-thumb"> <img src="${menu.image}" alt="${menu.name}"> </div>
      <div class="menu-info">
        ${tagsHtml ? `<div class="tag-row">${tagsHtml}</div>` : ''}
        <div class="menu-name">${menu.name}</div>
        <div class="menu-desc">${menu.desc}</div>
        <div class="menu-footer">
          <div class="menu-price">${fmt(menu.price)}<span>/porsi</span></div>
          <button class="add-btn" onclick="addToCart(${menu.id})" title="Tambah ke keranjang">+</button>
        </div>
      </div>
    </div>`;
}
