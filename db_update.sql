-- Jalankan query ini di phpMyAdmin atau MySQL untuk update struktur tabel pesanan
-- (Jika tabel belum ada, gunakan CREATE TABLE di bawah)

-- Tambah kolom yang kurang (aman jika sudah ada kolom akan di-skip)
ALTER TABLE pesanan
  ADD COLUMN IF NOT EXISTS order_id VARCHAR(30) UNIQUE AFTER id,
  ADD COLUMN IF NOT EXISTS items     TEXT         AFTER catatan,
  ADD COLUMN IF NOT EXISTS total     INT DEFAULT 0 AFTER items,
  ADD COLUMN IF NOT EXISTS status    VARCHAR(20) DEFAULT 'processing' AFTER total;

-- Atau jika ingin buat tabel baru dari awal:
-- DROP TABLE IF EXISTS pesanan;
-- CREATE TABLE pesanan (
--   id                INT AUTO_INCREMENT PRIMARY KEY,
--   order_id          VARCHAR(30) UNIQUE NOT NULL,
--   nama_penerima     VARCHAR(100),
--   whatsapp          VARCHAR(20),
--   alamat            TEXT,
--   kecamatan         VARCHAR(50),
--   waktu_pengiriman  VARCHAR(60),
--   catatan           TEXT,
--   metode_pembayaran VARCHAR(30),
--   items             TEXT,
--   total             INT DEFAULT 0,
--   status            VARCHAR(20) DEFAULT 'processing',
--   created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
