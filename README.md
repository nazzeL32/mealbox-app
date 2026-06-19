# 🍱 MealBox — Platform Pemesanan Catering Harian Online

Proyek Web Frontend oleh **Kelompok 1 — Sistem Informasi 2024**

---

## 👥 Tim Pengembang

| Nama | NIM | Peran |
|---|---|---|
| Ananda Pratama | 2409010109 | Ketua |
| Baiq Reingganis Sutami | 2409010123 | Anggota |
| Shinta Puspita Dewi | 2409010130 | Anggota |
| Dina Purwandari | 2409010125 | Anggota |
| Suhaila Widyaiswara | 2409010128 | Anggota |

---

## 📁 Struktur File

```
mealbox/
├── index.html              ← Entry point utama
├── README.md
│
├── css/
│   ├── base.css            ← Reset, variabel CSS, komponen global
│   ├── nav.css             ← Navbar
│   ├── modal.css           ← Modal login/register
│   ├── home.css            ← Halaman beranda (landing page)
│   ├── menu.css            ← Halaman katalog menu
│   ├── order.css           ← Halaman pemesanan / checkout
│   ├── tracking.css        ← Halaman tracking pesanan
│   └── dashboard.css       ← Halaman dashboard admin
│
├── js/
│   ├── data.js             ← Data menu, pesanan mock, konstanta
│   ├── cart.js             ← Logika keranjang belanja
│   ├── router.js           ← Navigasi antar halaman (SPA)
│   ├── modal.js            ← Kontrol modal login/register
│   ├── toast.js            ← Sistem notifikasi toast
│   └── app.js              ← Entry point & inisialisasi aplikasi
│
└── pages/
    ├── home.js             ← Render halaman beranda
    ├── menu.js             ← Render halaman menu + filter
    ├── order.js            ← Render halaman pemesanan + validasi
    ├── tracking.js         ← Render halaman tracking + simulasi status
    └── dashboard.js        ← Render dashboard admin
```

---

## 🚀 Cara Menjalankan

Cukup buka `index.html` di browser. Tidak perlu server atau build tool.

```bash
# Dengan Live Server (VS Code):
# Klik kanan index.html → Open with Live Server

# Atau buka langsung:
open index.html
```

---

## 🎯 Halaman & Fitur

| Halaman | Deskripsi |
|---|---|
| **Beranda** | Hero, statistik, cara kerja, preview menu, testimoni, paket langganan |
| **Menu** | Katalog 9 menu + filter kategori, tombol tambah ke keranjang |
| **Pesan** | Form pengiriman, pilih metode bayar, ringkasan keranjang dinamis |
| **Tracking** | Input nomor pesanan, timeline status realtime |
| **Dashboard** | KPI cards, pesanan terkini, grafik mingguan, menu terlaris, notifikasi |

---

## 🛠️ Tech Stack (Rencana Backend)

| Layer | Teknologi |
|---|---|
| Frontend | React.js / Next.js |
| Backend | Laravel 12 |
| Database | MySQL |
| Auth | Laravel Breeze / Sanctum |
| Payment | Midtrans / Xendit |
| Realtime | Laravel Reverb / Pusher |
| Notifikasi | WhatsApp / Email Gateway |
