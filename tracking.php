<?php
include 'koneksi.php';

header('Content-Type: application/json');

$order_id = $_GET['order_id'] ?? '';

if (empty($order_id)) {
    echo json_encode(['success' => false, 'message' => 'Order ID kosong']);
    exit;
}

$stmt = $conn->prepare(
    "SELECT order_id, nama_penerima, status, alamat, waktu_pengiriman, items, total
     FROM pesanan
     WHERE order_id = ?
     LIMIT 1"
);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Query error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('s', $order_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Pesanan tidak ditemukan']);
    exit;
}

$data = $result->fetch_assoc();

echo json_encode([
    'success'   => true,
    'order_id'  => $data['order_id'],
    'nama'      => $data['nama_penerima'],
    'status'    => $data['status'],
    'alamat'    => $data['alamat'],
    'waktu'     => $data['waktu_pengiriman'],
    'items'     => $data['items'],
    'total'     => (int)$data['total'],
]);

$stmt->close();
?>
