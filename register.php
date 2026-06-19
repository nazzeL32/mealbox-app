<?php

session_start();
include 'koneksi.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $nama = mysqli_real_escape_string($conn, $_POST['nama']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $wa = mysqli_real_escape_string($conn, $_POST['wa']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $cek = mysqli_query(
        $conn,
        "SELECT * FROM users WHERE email='$email'"
    );

    if (mysqli_num_rows($cek) > 0) {

        echo "<script>
            alert('Email sudah terdaftar');
            window.location='index.php';
        </script>";
        exit;
    }

    $simpan = mysqli_query(
        $conn,
        "INSERT INTO users
        (nama,email,wa,password,role)
        VALUES
        ('$nama','$email','$wa','$password','customer')"
    );

    if ($simpan) {

        echo "<script>
            alert('Registrasi berhasil, silakan login');
            window.location='index.php';
        </script>";

    } else {

        echo "<script>
            alert('Registrasi gagal');
            window.location='index.php';
        </script>";
    }
}
?>