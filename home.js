/**
 * pages/home.js — Home / Landing Page
 * MealBox Platform
 */

function buildMenuCard(menu) {
  const tagsHtml = menu.tags.map(t => {
    const labels = { popular: 'Terlaris', spicy: 'Pedas', veg: 'Vegetarian', new: 'Baru' };
    return `<span class="tag ${t}">${labels[t] || t}</span>`;
  }).join('');

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

function initHomePage() {
  const page = document.getElementById('page-home');
  if (!page) return;

  page.innerHTML = `
    <!-- HERO -->
    <div class="hero">
      <div class="hero-bg"></div>
      <div class="hero-grid"></div>
      <div class="hero-content">
        <div class="hero-tag">Pesan Sekarang, Nikmati Hari Ini</div>
        <h1>Catering Harian<br><em>Lebih Mudah</em><br>dari Sebelumnya</h1>
        <p>Pilih menu, tentukan porsi, jadwalkan pengiriman. MealBox menghadirkan makan siang & malam berkualitas langsung ke pintu Anda.</p>
        <div class="hero-btns">
          <button class="btn-primary" onclick="showPage('menu')">🍽️ Lihat Menu Hari Ini</button>
          <button class="btn-outline" onclick="showPage('tracking')">📍 Lacak Pesanan</button>
        </div>
      </div>
      <div class="hero-float">
        <div class="float-card">
          <div class="fc-label">Pesanan Hari Ini</div>
          <div class="fc-main">247 Pesanan</div>
          <div class="fc-status green"><span class="fc-dot"></span> Sedang Diproses</div>
        </div>
        <div class="float-card">
          <div class="fc-label">Menu Terlaris</div>
          <div class="fc-main">🍛 Nasi Padang</div>
          <div class="fc-sub">Terjual 89 porsi hari ini</div>
        </div>
        <div class="float-card">
          <div class="fc-label">Estimasi Pengiriman</div>
          <div class="fc-main">30–45 menit</div>
          <div class="fc-status orange"><span class="fc-dot"></span> Area Kota</div>
        </div>
      </div>
    </div>

    <!-- STATS BAR -->
    <div class="stats-bar">
      <div class="stat-item"><div class="stat-num">2.400+</div><div class="stat-desc">Pelanggan Aktif</div></div>
      <div class="stat-item"><div class="stat-num">18.000+</div><div class="stat-desc">Pesanan Terselesaikan</div></div>
      <div class="stat-item"><div class="stat-num">98%</div><div class="stat-desc">Kepuasan Pelanggan</div></div>
      <div class="stat-item"><div class="stat-num">45 mnt</div><div class="stat-desc">Rata-rata Pengiriman</div></div>
    </div>

    <!-- HOW IT WORKS -->
    <div class="section">
      <div class="section-header">
        <div class="section-tag">Cara Kerja</div>
        <div class="section-title">Pesan dalam 4 Langkah</div>
        <div class="section-sub">Mudah, cepat, dan bisa dipantau realtime</div>
      </div>
      <div class="steps-grid">
        <div class="step-card" data-num="01"><div class="step-icon">👤</div><h3>Buat Akun</h3><p>Daftar gratis dan lengkapi profil pengiriman Anda sekali saja.</p></div>
        <div class="step-card" data-num="02"><div class="step-icon">📋</div><h3>Pilih Menu</h3><p>Telusuri menu harian dan pilih paket yang sesuai selera & kebutuhan.</p></div>
        <div class="step-card" data-num="03"><div class="step-icon">💳</div><h3>Bayar Online</h3><p>Bayar aman via transfer bank, e-wallet, atau kartu kredit/debit.</p></div>
        <div class="step-card" data-num="04"><div class="step-icon">🚴</div><h3>Terima & Nikmati</h3><p>Kurir mengantar tepat waktu. Lacak posisi pengiriman secara realtime.</p></div>
      </div>
    </div>

    <!-- MENU PREVIEW -->
    <div class="section" style="padding-top:0">
      <div class="section-header">
        <div class="section-tag">Menu Pilihan</div>
        <div class="section-title">Menu Favorit Hari Ini</div>
        <div class="section-sub">Menu diperbarui setiap hari pukul 06.00 WIB</div>
      </div>
      <div class="menu-grid">
        ${MENUS.slice(0, 6).map(buildMenuCard).join('')}
      </div>
      <div style="text-align:center;margin-top:28px">
        <button class="btn-outline" onclick="showPage('menu')">Lihat Semua Menu →</button>
      </div>
    </div>

    <!-- TESTIMONIALS -->
    <div class="section" style="padding-top:0">
      <div class="section-header">
        <div class="section-tag">Testimoni</div>
        <div class="section-title">Kata Pelanggan Kami</div>
      </div>
      <div class="testi-grid">
        <div class="testi-card">
          <div class="testi-stars">★★★★★</div>
          <p class="testi-text">"MealBox udah jadi andalan makan siang kantor kami. Praktis banget, tinggal pesan pagi, siang udah dateng tepat waktu!"</p>
          <div class="testi-user">
            <div class="testi-avatar" style="background:rgba(244,118,26,0.15);color:var(--orange)">RH</div>
            <div><div class="testi-name">Rina Handayani</div><div class="testi-loc">HRD Manager, Medan</div></div>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">★★★★★</div>
          <p class="testi-text">"Langganan mingguan di MealBox bikin pengeluaran makan lebih terkontrol. Makanannya enak dan porsi standar banget!"</p>
          <div class="testi-user">
            <div class="testi-avatar" style="background:rgba(46,204,139,0.15);color:var(--green)">DN</div>
            <div><div class="testi-name">Dika Nugraha</div><div class="testi-loc">Mahasiswa, Kos Setia Budi</div></div>
          </div>
        </div>
        <div class="testi-card">
          <div class="testi-stars">★★★★☆</div>
          <p class="testi-text">"Fitur tracking realtime-nya kerasa banget manfaatnya. Tau persis kapan makanan datang, nggak perlu nunggu bingung."</p>
          <div class="testi-user">
            <div class="testi-avatar" style="background:rgba(100,180,255,0.15);color:var(--blue)">AP</div>
            <div><div class="testi-name">Andi Prasetyo</div><div class="testi-loc">Freelancer, WFH</div></div>
          </div>
        </div>
      </div>
    </div>

    <!-- PLANS -->
    <div class="section" style="padding-top:0">
      <div class="section-header">
        <div class="section-tag">Paket Langganan</div>
        <div class="section-title">Pilih Paket Terbaik</div>
        <div class="section-sub">Hemat lebih banyak dengan berlangganan</div>
      </div>
      <div class="plans-grid">
        <div class="plan-card">
          <div class="plan-name">Harian</div>
          <div class="plan-price">Rp 25K</div>
          <div class="plan-period">per porsi / per hari</div>
          <ul class="plan-features">
            <li>Pilih 1 menu per hari</li>
            <li>Pengiriman 1x</li>
            <li>Tanpa komitmen</li>
            <li>Support via WhatsApp</li>
          </ul>
          <button class="plan-btn" onclick="showPage('order')">Pesan Sekarang</button>
        </div>
        <div class="plan-card featured">
          <div class="plan-tag">⭐ Paling Populer</div>
          <div class="plan-name">Mingguan</div>
          <div class="plan-price">Rp 155K</div>
          <div class="plan-period">per minggu · hemat 14%</div>
          <ul class="plan-features">
            <li>5 menu berbeda / minggu</li>
            <li>Pengiriman setiap hari</li>
            <li>Ganti menu fleksibel</li>
            <li>Priority support</li>
          </ul>
          <button class="plan-btn" onclick="showPage('order')">Langganan Sekarang</button>
        </div>
        <div class="plan-card">
          <div class="plan-name">Bulanan</div>
          <div class="plan-price">Rp 550K</div>
          <div class="plan-period">per bulan · hemat 27%</div>
          <ul class="plan-features">
            <li>22 hari kerja penuh</li>
            <li>Menu premium eksklusif</li>
            <li>Gratis ongkir</li>
            <li>Dedicated account manager</li>
          </ul>
          <button class="plan-btn" onclick="showPage('order')">Mulai Berlangganan</button>
        </div>
      </div>
    </div>

    <!-- CTA BANNER -->
    <div class="cta-banner">
      <h2>Siap Makan Lebih Praktis? 🍱</h2>
      <p>Ribuan pelanggan sudah merasakan manfaatnya. Bergabunglah sekarang.</p>
      <div class="cta-banner-btns">
        <button class="btn-primary" onclick="openModal()">Daftar Gratis Sekarang</button>
        <button class="btn-outline" onclick="showPage('menu')">Lihat Menu Dulu</button>
      </div>
    </div>

    <!-- FOOTER -->
    <footer>
      <div class="footer-brand">
        <div class="logo">🍱 MealBox</div>
        <p>Platform pemesanan catering harian online yang menghubungkan pelanggan dengan penyedia catering terpercaya.</p>
      </div>
      <div>
        <h4>Produk</h4>
        <ul>
          <li><a onclick="showPage('menu')">Menu Hari Ini</a></li>
          <li><a onclick="showPage('order')">Pesan Sekarang</a></li>
          <li><a>Paket Langganan</a></li>
          <li><a onclick="showPage('tracking')">Tracking Pesanan</a></li>
        </ul>
      </div>
      <div>
        <h4>Perusahaan</h4>
        <ul>
          <li><a>Tentang Kami</a></li>
          <li><a>Karir</a></li>
          <li><a>Blog</a></li>
          <li><a>Kemitraan</a></li>
        </ul>
      </div>
      <div>
        <h4>Bantuan</h4>
        <ul>
          <li><a>FAQ</a></li>
          <li><a>Hubungi Kami</a></li>
          <li><a>WhatsApp Support</a></li>
          <li><a>Syarat & Ketentuan</a></li>
        </ul>
      </div>
    </footer>
    <div class="footer-bottom">© 2025 MealBox. Dibuat dengan ❤️ oleh Kelompok 1 — Sistem Informasi 2024</div>
  `;
}
