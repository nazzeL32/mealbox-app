/**
 * pages/order.js — Order / Checkout Page
 * MealBox Platform
 */

let selectedPayMethod = '';

function initOrderPage() {
  const page = document.getElementById('page-order');
  if (!page) return;

  const paymentMethods = [
    { key: 'GoPay',       icon: '💚' },
    { key: 'OVO',         icon: '💜' },
    { key: 'DANA',        icon: '💙' },
    { key: 'BCA Virtual', icon: '🏦' },
    { key: 'Mandiri',     icon: '🏛️' },
    { key: 'COD',         icon: '💵' },
  ];

  const payHtml = paymentMethods.map(m => `
    <div class="pay-opt" id="pay-${m.key.replace(' ','_')}" onclick="selectPayment(this,'${m.key}')">
      <div class="pay-opt-icon">${m.icon}</div>
      <div class="pay-opt-name">${m.key}</div>
    </div>`).join('');

  const districts = ['Medan Kota','Medan Baru','Medan Selayang','Medan Polonia','Medan Sunggal','Medan Helvetia'];
  const deliveryTimes = [
    '11:00 — 12:00 (Makan Siang)',
    '12:00 — 13:00 (Makan Siang)',
    '17:00 — 18:00 (Makan Malam)',
    '18:00 — 19:00 (Makan Malam)',
  ];

  page.innerHTML = `
    <div class="order-hero">
      <h1>Buat Pesanan</h1>
      <p>Lengkapi detail pengiriman dan konfirmasi pesanan Anda</p>
    </div>

    <div class="order-layout">
      <div>
        <!-- Delivery Form -->
        <div class="order-form-section">
          <h2>📍 Detail Pengiriman</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Nama Penerima</label>
              <input type="text" id="inp-name" placeholder="Masukkan nama lengkap">
            </div>
            <div class="form-group">
              <label>No. WhatsApp</label>
              <input type="text" id="inp-phone" placeholder="08xxxxxxxxxx">
            </div>
          </div>
          <div class="form-group">
            <label>Alamat Pengiriman</label>
            <input type="text" id="inp-address" placeholder="Jalan, nomor rumah/kos">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Kecamatan</label>
              <select id="inp-district">
                <option value="">Pilih Kecamatan</option>
                ${districts.map(d => `<option>${d}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Waktu Pengiriman</label>
              <select id="inp-time">
                <option value="">Pilih Waktu</option>
                ${deliveryTimes.map(t => `<option>${t}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Catatan Tambahan</label>
            <textarea id="inp-note" rows="3" placeholder="Catatan untuk dapur atau kurir (opsional)"
              style="resize:vertical"></textarea>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="order-form-section">
          <h2>💳 Metode Pembayaran</h2>
          <div class="payment-grid">${payHtml}</div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary">
        <h3>🛒 Ringkasan Pesanan</h3>
        <div id="cart-list">
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <p>Keranjang masih kosong.<br>Tambahkan menu terlebih dahulu.</p>
            <button class="btn-primary" style="margin-top:16px;font-size:13px;padding:10px 20px"
              onclick="showPage('menu')">Lihat Menu</button>
          </div>
        </div>
        <div class="summary-total" id="summary-total" style="display:none">
          <div class="total-row"><span>Subtotal</span><span id="subtotal-val">Rp 0</span></div>
          <div class="total-row"><span>Ongkir</span><span>Rp 5.000</span></div>
          <div class="total-row"><span>Biaya Layanan</span><span>Rp 1.000</span></div>
          <div class="total-row final"><span>Total</span><span id="total-val">Rp 0</span></div>
          <button class="btn-primary confirm-btn" id="btn-confirm" onclick="placeOrder()">Konfirmasi & Bayar →</button>
        </div>
      </div>
    </div>
  `;

  updateCartUI();
}

function selectPayment(el, name) {
  document.querySelectorAll('.pay-opt').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedPayMethod = name;
}

function placeOrder() {
  if (cart.length === 0) {
    showToast('❌', 'Keranjang masih kosong!');
    return;
  }

  const name     = document.getElementById('inp-name').value.trim();
  const phone    = document.getElementById('inp-phone').value.trim();
  const address  = document.getElementById('inp-address').value.trim();
  const district = document.getElementById('inp-district').value;
  const time     = document.getElementById('inp-time').value;
  const note     = document.getElementById('inp-note').value.trim();

  if (!name || !address) {
    showToast('⚠️', 'Lengkapi nama dan alamat pengiriman!');
    return;
  }
  if (!time) {
    showToast('⚠️', 'Pilih waktu pengiriman!');
    return;
  }
  if (!selectedPayMethod) {
    showToast('⚠️', 'Pilih metode pembayaran!');
    return;
  }

  // Generate order ID
  const orderId = 'MBX-' + new Date().toISOString().slice(0,10).replace(/-/g,'')
    + '-' + Math.floor(Math.random() * 900 + 100);

  // Serialize cart items as JSON
  const items = JSON.stringify(cart.map(c => ({
    id:    c.id,
    name:  c.name,
    qty:   c.qty,
    price: c.price
  })));

  const total = getCartTotal() + 6000; // subtotal + ongkir + layanan

  // Disable button to prevent double-submit
  const btn = document.getElementById('btn-confirm');
  if (btn) { btn.disabled = true; btn.textContent = 'Memproses...'; }

  fetch("pesan.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:
      "order_id="   + encodeURIComponent(orderId) +
      "&nama="      + encodeURIComponent(name) +
      "&whatsapp="  + encodeURIComponent(phone) +
      "&alamat="    + encodeURIComponent(address) +
      "&kecamatan=" + encodeURIComponent(district) +
      "&waktu="     + encodeURIComponent(time) +
      "&catatan="   + encodeURIComponent(note) +
      "&pembayaran="+ encodeURIComponent(selectedPayMethod) +
      "&items="     + encodeURIComponent(items) +
      "&total="     + encodeURIComponent(total)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      clearCart();
      showToast('🎉', 'Pesanan berhasil! ID: ' + orderId);
      // Redirect to tracking after 1.5s
      setTimeout(() => {
        const trackInput = document.getElementById('track-input');
        if (trackInput) trackInput.value = orderId;
        showPage('tracking');
        trackOrder();
      }, 1500);
    } else {
      showToast('❌', 'Gagal menyimpan pesanan: ' + (data.message || 'Coba lagi'));
      if (btn) { btn.disabled = false; btn.textContent = 'Konfirmasi & Bayar →'; }
    }
  })
  .catch(error => {
    console.error(error);
    showToast('❌', 'Koneksi bermasalah. Coba lagi.');
    if (btn) { btn.disabled = false; btn.textContent = 'Konfirmasi & Bayar →'; }
  });
}
