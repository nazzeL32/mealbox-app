/**
 * cart.js — Shopping Cart Logic
 * MealBox Platform
 */

let cart = [];

function addToCart(id) {
  const item = MENUS.find(m => m.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
  showToast('✅', `${item.name} ditambahkan!`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function clearCart() {
  cart = [];
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  // Update badge
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = getCartCount();

  const cartList    = document.getElementById('cart-list');
  const summaryTotal = document.getElementById('summary-total');
  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Keranjang masih kosong.<br>Tambahkan menu terlebih dahulu.</p>
        <button class="btn-primary"
          style="margin-top:16px;font-size:13px;padding:10px 20px"
          onclick="showPage('menu')">Lihat Menu</button>
      </div>`;
    if (summaryTotal) summaryTotal.style.display = 'none';
    return;
  }

  cartList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        <img src="${item.image}" alt="${item.name}"
          style="width:48px;height:48px;object-fit:cover;border-radius:8px;display:block"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div style="display:none;width:48px;height:48px;border-radius:8px;
          background:var(--card2,#2a2a2a);align-items:center;justify-content:center;font-size:22px">🍽️</div>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty">${item.qty} porsi &times; ${fmt(item.price)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
        <button onclick="removeFromCart(${item.id})"
          style="background:none;border:none;color:var(--muted);cursor:pointer;font-size:16px;line-height:1"
          title="Hapus">✕</button>
      </div>
    </div>`).join('');

  const sub = getCartTotal();
  const el  = id => document.getElementById(id);
  if (el('subtotal-val')) el('subtotal-val').textContent = fmt(sub);
  if (el('total-val'))    el('total-val').textContent    = fmt(sub + 6000);
  if (summaryTotal)       summaryTotal.style.display = 'block';
}
