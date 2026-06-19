-- Jalankan file ini di phpMyAdmin > tab SQL
-- Database: mealbox

CREATE DATABASE IF NOT EXISTS mealbox;
USE mealbox;

-- Hapus tabel lama jika ada, buat ulang
DROP TABLE IF EXISTS pesanan;

CREATE TABLE pesanan (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  order_id          VARCHAR(30) UNIQUE NOT NULL,
  nama_penerima     VARCHAR(100),
  whatsapp          VARCHAR(20),
  alamat            TEXT,
  kecamatan         VARCHAR(50),
  waktu_pengiriman  VARCHAR(60),
  catatan           TEXT,
  metode_pembayaran VARCHAR(30),
  items             TEXT,
  total             INT DEFAULT 0,
  status            VARCHAR(20) DEFAULT 'processing',
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
