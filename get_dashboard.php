<?php
include 'koneksi.php';
header('Content-Type: application/json');

// Total pesanan hari ini
$today = date('Y-m-d');
$r = mysqli_query($conn, "SELECT COUNT(*) as total, SUM(total) as revenue FROM pesanan WHERE DATE(created_at) = '$today'");
$today_data = mysqli_fetch_assoc($r);

// Pesanan sedang dikirim
$r2 = mysqli_query($conn, "SELECT COUNT(*) as cnt FROM pesanan WHERE status='delivering'");
$delivering = mysqli_fetch_assoc($r2)['cnt'];

// Pesanan processing
$r3 = mysqli_query($conn, "SELECT COUNT(*) as cnt FROM pesanan WHERE status='processing'");
$processing = mysqli_fetch_assoc($r3)['cnt'];

// Total semua pesanan
$r4 = mysqli_query($conn, "SELECT COUNT(*) as cnt FROM pesanan");
$total_all = mysqli_fetch_assoc($r4)['cnt'];

// 10 pesanan terkini
$r5 = mysqli_query($conn, "SELECT order_id, nama_penerima, items, metode_pembayaran, total, status, created_at FROM pesanan ORDER BY created_at DESC LIMIT 10");
$orders = [];
while ($row = mysqli_fetch_assoc($r5)) {
    // Parse items untuk tampilkan ringkasan menu
    $items_parsed = json_decode($row['items'], true);
    $menu_summary = '';
    if ($items_parsed && count($items_parsed) > 0) {
        $menu_summary = implode(', ', array_map(fn($i) => $i['name'].' ×'.$i['qty'], $items_parsed));
    }
    $row['menu_summary'] = $menu_summary ?: '-';
    $orders[] = $row;
}

echo json_encode([
    'success'    => true,
    'today_orders'  => (int)($today_data['total'] ?? 0),
    'today_revenue' => (int)($today_data['revenue'] ?? 0),
    'delivering' => (int)$delivering,
    'processing' => (int)$processing,
    'total_all'  => (int)$total_all,
    'orders'     => $orders,
]);
?>
