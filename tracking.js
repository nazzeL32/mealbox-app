/**
 * pages/tracking.js — Order Tracking Page
 * MealBox Platform
 */

function initTrackingPage() {
  const page = document.getElementById('page-tracking');
  if (!page) return;

  page.innerHTML = `
    <div class="tracking-container">
      <h1>Lacak Pesanan</h1>
      <p>Masukkan nomor pesanan untuk melihat status terkini</p>

      <div class="tracking-input-row">
        <input type="text" id="track-input"
          placeholder="Contoh: MBX-20250526-001">
        <button class="track-btn" onclick="trackOrder()">Lacak →</button>
      </div>

      <div id="track-result"></div>
    </div>
  `;
}

function trackOrder() {
  const input = document.getElementById('track-input');
  if (!input) return;

  const orderId = input.value.trim();
  if (!orderId) {
    showToast('⚠️', 'Masukkan nomor pesanan terlebih dahulu!');
    return;
  }

  const resultEl = document.getElementById('track-result');
  resultEl.innerHTML = '<p style="text-align:center;padding:24px;opacity:.6">🔍 Mencari pesanan...</p>';

  fetch('tracking.php?order_id=' + encodeURIComponent(orderId))
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        resultEl.innerHTML = `
          <div style="text-align:center;padding:32px">
            <div style="font-size:40px">🔎</div>
            <p style="margin-top:12px;opacity:.7">${data.message || 'Pesanan tidak ditemukan'}</p>
          </div>`;
        return;
      }

      const status = data.status || 'processing';
      const statusLabel = {
        processing: 'Sedang Diproses',
        delivering: 'Sedang Dikirim',
        delivered:  'Terkirim',
        done:       'Selesai',
      };

      const isDone      = s => s === 'delivered' || s === 'delivering' || s === 'done';
      const isDelivered = s => s === 'delivered' || s === 'done';

      const steps = [
        { label: 'Pesanan Dikonfirmasi',         done: true,              active: false },
        { label: 'Sedang Dipersiapkan di Dapur', done: true,              active: status === 'processing' },
        { label: 'Pesanan Siap Dikirim',         done: isDone(status),    active: false },
        { label: 'Kurir Sedang Mengantar',       done: isDelivered(status), active: status === 'delivering' },
        { label: 'Pesanan Terkirim',             done: isDelivered(status), active: false },
      ];

      const stepsHtml = steps.map(step => `
        <div class="track-step ${step.done ? 'done' : ''} ${step.active ? 'active' : ''}">
          <div class="step-dot">${step.done ? '✓' : ''}</div>
          <div class="step-body">
            <div class="step-title">${step.label}</div>
          </div>
        </div>`).join('');

      // Parse items if available
      let itemsHtml = '';
      try {
        const items = JSON.parse(data.items || '[]');
        if (items.length > 0) {
          itemsHtml = items.map(i => `${i.name} ×${i.qty}`).join(', ');
        }
      } catch(e) { itemsHtml = data.items || '-'; }

      resultEl.innerHTML = `
        <div class="order-track-card">
          <div class="track-header">
            <div class="track-order-id">${data.order_id}</div>
            <span class="track-status-badge ${status}">${statusLabel[status] || status}</span>
          </div>
          <div class="track-info-grid">
            <div class="track-info-item">
              <div class="tii-label">Penerima</div>
              <div class="tii-value">${data.nama || '-'}</div>
            </div>
            <div class="track-info-item">
              <div class="tii-label">Menu</div>
              <div class="tii-value">${itemsHtml || '-'}</div>
            </div>
            <div class="track-info-item">
              <div class="tii-label">Total</div>
              <div class="tii-value">${data.total ? fmt(data.total) : '-'}</div>
            </div>
            <div class="track-info-item">
              <div class="tii-label">Estimasi</div>
              <div class="tii-value">${isDelivered(status) ? 'Sudah Tiba' : '±15 menit'}</div>
            </div>
          </div>
          <div class="track-steps">${stepsHtml}</div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      resultEl.innerHTML = '<p style="text-align:center;padding:24px;color:red">❌ Gagal menghubungi server.</p>';
    });
}
