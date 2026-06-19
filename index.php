<?php
include 'koneksi.php';
session_start();
?>

<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MealBox — Platform Catering Harian Online</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/nav.css">
  <link rel="stylesheet" href="css/modal.css">
  <link rel="stylesheet" href="css/home.css">
  <link rel="stylesheet" href="css/menu.css">
  <link rel="stylesheet" href="css/order.css">
  <link rel="stylesheet" href="css/tracking.css">
  <link rel="stylesheet" href="css/dashboard.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav>
    <a class="nav-logo" onclick="showPage('home')">
      <div class="nav-logo-box">🍱</div>
      MealBox
    </a>
    <div class="nav-links">
      <a onclick="showPage('home')"      id="nav-home"      class="active">Beranda</a>
      <a onclick="showPage('menu')"      id="nav-menu">Menu</a>
      <a onclick="showPage('order')"     id="nav-order">Pesan</a>
      <a onclick="showPage('tracking')"  id="nav-tracking">Tracking</a>
      <a onclick="showPage('dashboard')" id="nav-dashboard">Dashboard</a>
    </div>
    <div class="nav-right">
  <div class="nav-cart" onclick="showPage('order')">
    🛒
    <div class="cart-badge" id="cart-count">0</div>
  </div>

  <?php if(isset($_SESSION['login']) && $_SESSION['login'] == true): ?>

      <span style="color:white;margin-right:15px;">
          Halo, <?php echo $_SESSION['username']; ?>
      </span>

      <a href="logout.php" class="nav-cta"
         style="text-decoration:none;display:flex;align-items:center;">
         Logout
      </a>

  <?php else: ?>

      <button class="nav-cta" onclick="openModal()">
          Masuk / Daftar
      </button>

  <?php endif; ?>
</div>

  </nav>

  <!-- PAGES -->
  <div id="page-home"      class="page active"></div>
  <div id="page-menu"      class="page"></div>
  <div id="page-order"     class="page"></div>
  <div id="page-tracking"  class="page"></div>
  <div id="page-dashboard" class="page"></div>

  <!-- LOGIN MODAL -->
  <div class="modal-overlay" id="modal">
    <div class="modal-box">
      <button class="modal-close" onclick="closeModal()">✕</button>
      <div class="modal-logo">🍱 MealBox</div>
      <div class="modal-sub">Selamat datang kembali!</div>
      <div class="modal-tabs">
        <div class="modal-tab active" onclick="switchTab(this,'login')">Masuk</div>
        <div class="modal-tab" onclick="switchTab(this,'register')">Daftar</div>
      </div>
      <form action="login.php" method="POST">

    <div class="form-group">
        <label>Username</label>
        <input type="text" name="username" required>
    </div>

    <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" required>
    </div>

    <button class="modal-submit" type="submit" name="login">
        Masuk ke MealBox
    </button>

</form>

        <div class="modal-divider">atau lanjutkan dengan</div>
        <button class="btn-google" onclick="fakeLogin()">🌐 Masuk dengan Google</button>
      </div>
      <div class="modal-form" id="register-form" style="display:none">
        <div class="form-row">
          <div class="form-group"><label>Nama Depan</label><input type="text" placeholder="Nama"></div>
          <div class="form-group"><label>Nama Belakang</label><input type="text" placeholder="Belakang"></div>
        </div>
        <div class="form-group"><label>Email</label><input type="email" placeholder="nama@email.com"></div>
        <div class="form-group"><label>No. WhatsApp</label><input type="text" placeholder="08xxxxxxxxxx"></div>
        <div class="form-group"><label>Password</label><input type="password" placeholder="Minimal 8 karakter"></div>
        <button class="modal-submit" onclick="fakeLogin()">Buat Akun Gratis</button>
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div class="toast" id="toast">
    <span class="toast-icon" id="t-icon">✅</span>
    <span id="t-msg">Berhasil!</span>
  </div>

  <!-- SCRIPTS -->
  <script src="js/data.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/modal.js"></script>
  <script src="js/toast.js"></script>
  <script src="pages/home.js"></script>
  <script src="pages/menu.js"></script>
  <script src="pages/order.js"></script>
  <script src="pages/tracking.js"></script>
  <script src="pages/dashboard.js"></script>
  <script src="js/router.js"></script>
  <script src="js/app.js"></script>

</body>
</html>
