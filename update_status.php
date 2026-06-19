<?php
include 'koneksi.php';
header('Content-Type: application/json');

$order_id = $_POST['order_id'] ?? '';
$status   = $_POST['status']   ?? '';

$allowed = ['processing', 'delivering', 'delivered', 'done'];

if (empty($order_id) || !in_array($status, $allowed)) {
    echo json_encode(['success' => false, 'message' => 'Data tidak valid']);
    exit;
}

$stmt = $conn->prepare("UPDATE pesanan SET status=? WHERE order_id=?");
$stmt->bind_param('ss', $status, $order_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
$stmt->close();
?>
