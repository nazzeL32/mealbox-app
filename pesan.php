<?php
include 'koneksi.php';

header('Content-Type: application/json');

$order_id   = $_POST['order_id']   ?? '';
$nama       = $_POST['nama']       ?? '';
$whatsapp   = $_POST['whatsapp']   ?? '';
$alamat     = $_POST['alamat']     ?? '';
$kecamatan  = $_POST['kecamatan']  ?? '';
$waktu      = $_POST['waktu']      ?? '';
$catatan    = $_POST['catatan']    ?? '';
$pembayaran = $_POST['pembayaran'] ?? '';
$items      = $_POST['items']      ?? '[]';
$total      = (int)($_POST['total'] ?? 0);

// Validasi field wajib
if (empty($order_id) || empty($nama) || empty($alamat) || empty($waktu) || empty($pembayaran)) {
    echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
    exit;
}

// Sanitasi input menggunakan prepared statement
$stmt = $conn->prepare(
    "INSERT INTO pesanan
     (order_id, nama_penerima, whatsapp, alamat, kecamatan,
      waktu_pengiriman, catatan, metode_pembayaran, items, total, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'processing')"
);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Query error: ' . $conn->error]);
    exit;
}

$stmt->bind_param(
    'ssssssssis',
    $order_id, $nama, $whatsapp, $alamat, $kecamatan,
    $waktu, $catatan, $pembayaran, $items, $total
);

if ($stmt->execute()) {
    echo json_encode([
        'success'  => true,
        'order_id' => $order_id,
        'message'  => 'Pesanan berhasil disimpan'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Gagal menyimpan: ' . $stmt->error
    ]);
}

$stmt->close();
?>
