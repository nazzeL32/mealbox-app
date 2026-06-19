<?php

include 'koneksi.php';

header('Content-Type: application/json');

/*
|--------------------------------------------------------------------------
| Total Pesanan
|--------------------------------------------------------------------------
*/

$qPesanan = mysqli_query(
    $conn,
    "SELECT COUNT(*) as total FROM pesanan"
);

$totalPesanan = mysqli_fetch_assoc($qPesanan)['total'] ?? 0;


/*
|--------------------------------------------------------------------------
| Total Pendapatan
|--------------------------------------------------------------------------
| sementara dihitung Rp25.000 per pesanan
| nanti bisa diganti sesuai tabel detail pesanan
*/

$qPendapatan = mysqli_query(
    $conn,
    "SELECT COUNT(*) * 25000 as total FROM pesanan"
);

$totalPendapatan = mysqli_fetch_assoc($qPendapatan)['total'] ?? 0;


/*
|--------------------------------------------------------------------------
| Sedang Dikirim
|--------------------------------------------------------------------------
*/

$qDikirim = mysqli_query(
    $conn,
    "SELECT COUNT(*) as total
     FROM pesanan
     WHERE status='Dikirim'"
);

$totalDikirim = mysqli_fetch_assoc($qDikirim)['total'] ?? 0;


/*
|--------------------------------------------------------------------------
| Pesanan Terbaru
|--------------------------------------------------------------------------
*/

$orders = [];

$qOrders = mysqli_query(
    $conn,
    "SELECT *
     FROM pesanan
     ORDER BY id DESC
     LIMIT 10"
);

while($row = mysqli_fetch_assoc($qOrders)){

    $orders[] = [

        "id" => $row['order_id'],

        "customer" => $row['nama_penerima'],

        "menu" => "Pesanan Catering",

        "total" => 25000,

        "status" => $row['status']
    ];
}


/*
|--------------------------------------------------------------------------
| Data Grafik Mingguan
|--------------------------------------------------------------------------
*/

$weekly = [];

$qWeekly = mysqli_query(
    $conn,
    "SELECT
        DAYNAME(created_at) as hari,
        COUNT(*) as jumlah
     FROM pesanan
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
     GROUP BY DAY(created_at)"
);

while($row = mysqli_fetch_assoc($qWeekly)){

    $weekly[] = [
        "day" => $row['hari'],
        "orders" => (int)$row['jumlah']
    ];
}


/*
|--------------------------------------------------------------------------
| Output JSON
|--------------------------------------------------------------------------
*/

echo json_encode([

    "success" => true,

    "totalPesanan" => (int)$totalPesanan,

    "totalPendapatan" => (int)$totalPendapatan,

    "totalDikirim" => (int)$totalDikirim,

    "rating" => 4.8,

    "orders" => $orders,

    "weekly" => $weekly

]);