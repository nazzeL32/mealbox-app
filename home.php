<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

$nama = $_SESSION['username'];
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MealBox - Home</title>

    <style>
        *{
            margin:0;
            padding:0;
            box-sizing:border-box;
            font-family:Arial, sans-serif;
        }

        body{
            background:#111;
            color:white;
        }

        .navbar{
            background:#000;
            padding:15px 50px;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }

        .logo{
            font-size:28px;
            font-weight:bold;
            color:#ff7a00;
        }

        .menu a{
            color:white;
            text-decoration:none;
            margin:0 15px;
        }

        .menu a:hover{
            color:#ff7a00;
        }

        .hero{
            height:85vh;
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            text-align:center;
        }

        .hero h1{
            font-size:60px;
            margin-bottom:15px;
        }

        .hero span{
            color:#ff7a00;
        }

        .hero p{
            font-size:20px;
            margin-bottom:30px;
        }

        .btn{
            background:#ff7a00;
            color:white;
            padding:12px 25px;
            text-decoration:none;
            border-radius:8px;
        }

        .btn:hover{
            opacity:0.9;
        }

        .welcome{
            color:#ff7a00;
            font-weight:bold;
        }
    </style>
</head>
<body>

    <nav class="navbar">
        <div class="logo">MealBox</div>

        <div class="menu">
            <a href="#">Beranda</a>
            <a href="#">Menu</a>
            <a href="#">Pesanan</a>
            <a href="#">Tracking</a>
            <a href="logout.php">Logout</a>
        </div>
    </nav>

    <section class="hero">
        <h1>Selamat Datang <span><?php echo $nama; ?></span></h1>

        <p>Anda berhasil login ke sistem MealBox.</p>

        <a href="#" class="btn">Pesan Sekarang</a>
    </section>

</body>
</html>