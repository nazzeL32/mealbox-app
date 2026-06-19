<?php
session_start();
include 'koneksi.php';

// ============================================================
// MODE TESTING — Bypass database, pakai akun dummy
// Ubah ke false saat production
// ============================================================
$TESTING_MODE = true;

$TEST_ACCOUNTS = [
    ['username' => 'admin',    'password' => 'admin123',    'role' => 'admin'],
    ['username' => 'customer', 'password' => 'customer123', 'role' => 'customer'],
    ['username' => 'demo',     'password' => 'demo',        'role' => 'customer'],
];

$error   = '';
$success = '';

if (isset($_POST['login'])) {

    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $error = 'Username dan password tidak boleh kosong.';

    } elseif ($TESTING_MODE) {
        // --- TESTING: cek akun dummy ---
        $found = false;
        foreach ($TEST_ACCOUNTS as $acc) {
            if ($acc['username'] === $username && $acc['password'] === $password) {
                session_regenerate_id(true);
                $_SESSION['login']    = true;
                $_SESSION['username'] = $username;
                $_SESSION['role']     = $acc['role'];
                $found = true;
                break;
            }
        }
        if ($found) {
            header('Location: index.php');
            exit;
        } else {
            $error = 'Username atau password salah.';
        }

    } else {
        // --- PRODUCTION: cek database dengan prepared statement + password_verify ---
        $stmt = mysqli_prepare($conn, "SELECT id, username, password, role FROM users WHERE username = ?");
        mysqli_stmt_bind_param($stmt, 's', $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $user   = mysqli_fetch_assoc($result);

        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['login']    = true;
            $_SESSION['username'] = $user['username'];
            $_SESSION['role']     = $user['role'];
            header('Location: index.php');
            exit;
        } else {
            $error = 'Username atau password salah.';
        }
        mysqli_stmt_close($stmt);
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login — MealBox</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg:          #0D0D0B;
      --surface:     #161614;
      --card:        #1E1E1B;
      --border:      rgba(255,255,255,0.07);
      --orange:      #F4761A;
      --orange-glow: rgba(244,118,26,0.18);
      --orange-soft: rgba(244,118,26,0.08);
      --text:        #F0EDE8;
      --muted:       #8A8880;
      --muted2:      #5A5856;
      --green:       #2ECC8B;
      --red:         #FF5B5B;
      --font-head:   'Syne', sans-serif;
      --font-body:   'Outfit', sans-serif;
      --r-md:        12px;
      --r-lg:        16px;
      --r-xl:        20px;
      --r-2xl:       24px;
    }

    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }

    /* Background blob */
    body::before {
      content: '';
      position: fixed;
      top: -200px; left: 50%;
      transform: translateX(-50%);
      width: 600px; height: 600px;
      background: radial-gradient(circle, var(--orange-glow) 0%, transparent 70%);
      pointer-events: none;
    }

    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--r-2xl);
      padding: 40px;
      width: 100%;
      max-width: 420px;
      position: relative;
      z-index: 1;
    }

    /* Logo */
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;
      margin-bottom: 6px;
    }
    .logo-icon {
      width: 40px; height: 40px;
      background: var(--orange-soft);
      border: 1px solid var(--orange-glow);
      border-radius: var(--r-md);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
    }
    .logo-text {
      font-family: var(--font-head);
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .subtitle {
      text-align: center;
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 28px;
    }

    /* Testing badge */
    .test-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(244,118,26,0.08);
      border: 1px solid rgba(244,118,26,0.25);
      border-radius: var(--r-lg);
      padding: 12px 14px;
      margin-bottom: 24px;
      font-size: 12px;
    }
    .test-badge .dot {
      width: 8px; height: 8px;
      background: var(--orange);
      border-radius: 50%;
      flex-shrink: 0;
      animation: pulse 1.6s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.5; transform: scale(0.85); }
    }
    .test-badge strong { color: var(--orange); }

    /* Accounts grid */
    .accounts-grid {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 24px;
    }
    .acc-chip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      user-select: none;
    }
    .acc-chip:hover {
      border-color: var(--orange);
      background: var(--orange-soft);
    }
    .acc-chip .acc-left { display: flex; align-items: center; gap: 10px; }
    .acc-chip .acc-icon {
      width: 30px; height: 30px;
      background: var(--orange-soft);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
    }
    .acc-chip .acc-name { font-size: 13px; font-weight: 600; }
    .acc-chip .acc-role {
      font-size: 11px;
      color: var(--muted);
    }
    .acc-chip .acc-hint {
      font-size: 11px;
      color: var(--muted2);
      font-family: monospace;
    }

    /* Divider */
    .divider {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      color: var(--muted2);
      font-size: 12px;
    }
    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border);
    }

    /* Form */
    .form-group { margin-bottom: 14px; }
    label {
      display: block;
      font-size: 12px;
      color: var(--muted);
      margin-bottom: 6px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    input[type=text], input[type=password] {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px 14px;
      font-size: 14px;
      color: var(--text);
      font-family: var(--font-body);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    input:focus {
      border-color: var(--orange);
      box-shadow: 0 0 0 3px var(--orange-soft);
    }

    /* Alert */
    .alert {
      padding: 12px 14px;
      border-radius: var(--r-md);
      font-size: 13px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .alert-error {
      background: rgba(255,91,91,0.1);
      border: 1px solid rgba(255,91,91,0.25);
      color: var(--red);
    }
    .alert-success {
      background: rgba(46,204,139,0.1);
      border: 1px solid rgba(46,204,139,0.25);
      color: var(--green);
    }

    /* Button */
    .btn-submit {
      width: 100%;
      background: var(--orange);
      color: #fff;
      padding: 14px;
      border-radius: var(--r-md);
      font-size: 15px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      font-family: var(--font-body);
      margin-top: 4px;
      transition: opacity 0.2s, transform 0.15s;
    }
    .btn-submit:hover { opacity: 0.88; transform: translateY(-1px); }
    .btn-submit:active { transform: translateY(0); }

    .footer-link {
      text-align: center;
      font-size: 13px;
      color: var(--muted);
      margin-top: 18px;
    }
    .footer-link a { color: var(--orange); text-decoration: none; }
    .footer-link a:hover { text-decoration: underline; }

    /* Back link */
    .back-link {
      position: absolute;
      top: 20px; left: 24px;
      font-size: 13px;
      color: var(--muted);
      text-decoration: none;
      display: flex; align-items: center; gap: 4px;
      transition: color 0.2s;
    }
    .back-link:hover { color: var(--text); }
  </style>
</head>
<body>

<div class="card">
  <a class="back-link" href="index.php">← Beranda</a>

  <div class="logo">
    <div class="logo-icon">🍱</div>
    <span class="logo-text">MealBox</span>
  </div>
  <p class="subtitle">Masuk ke akun kamu</p>

  <?php if ($TESTING_MODE): ?>
  <!-- Testing Banner -->
  <div class="test-badge">
    <div class="dot"></div>
    <div>
      <strong>Mode Testing Aktif</strong> — Klik akun di bawah untuk login cepat
    </div>
  </div>

  <!-- Quick Login Chips -->
  <div class="accounts-grid">
    <div class="acc-chip" onclick="fillLogin('admin','admin123')">
      <div class="acc-left">
        <div class="acc-icon">👑</div>
        <div>
          <div class="acc-name">Admin</div>
          <div class="acc-role">Role: admin</div>
        </div>
      </div>
      <span class="acc-hint">admin / admin123</span>
    </div>
    <div class="acc-chip" onclick="fillLogin('customer','customer123')">
      <div class="acc-left">
        <div class="acc-icon">🧑</div>
        <div>
          <div class="acc-name">Customer</div>
          <div class="acc-role">Role: customer</div>
        </div>
      </div>
      <span class="acc-hint">customer / customer123</span>
    </div>
    <div class="acc-chip" onclick="fillLogin('demo','demo')">
      <div class="acc-left">
        <div class="acc-icon">🚀</div>
        <div>
          <div class="acc-name">Demo</div>
          <div class="acc-role">Role: customer</div>
        </div>
      </div>
      <span class="acc-hint">demo / demo</span>
    </div>
  </div>

  <div class="divider">atau isi manual</div>
  <?php endif; ?>

  <!-- Error / Success -->
  <?php if ($error): ?>
    <div class="alert alert-error">⚠️ <?= htmlspecialchars($error) ?></div>
  <?php endif; ?>

  <!-- Form -->
  <form method="POST" autocomplete="off">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" name="username"
             value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
             placeholder="Masukkan username" required autofocus>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password"
             placeholder="Masukkan password" required>
    </div>
    <button type="submit" name="login" class="btn-submit">
      Masuk →
    </button>
  </form>

  <div class="footer-link">
    Belum punya akun? <a href="register.php">Daftar sekarang</a>
  </div>
</div>

<script>
function fillLogin(user, pass) {
  document.getElementById('username').value = user;
  document.getElementById('password').value = pass;
  document.getElementById('username').closest('form').submit();
}
</script>

</body>
</html>
