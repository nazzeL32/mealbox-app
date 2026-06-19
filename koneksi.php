<?php
$conn = mysqli_connect("localhost", "root", "", "mealbox");

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>