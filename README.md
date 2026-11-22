# 🚀 Rusdi OS Launcher — Space Edition

> Launcher bertema **luar angkasa** untuk Android & iOS yang berjalan sebagai Progressive Web App (PWA). Jelajahi galaksi dari layar utama perangkat Anda dengan animasi bintang berkelip, nebula yang melayang, dan planet yang berputar.

![Version](https://img.shields.io/badge/version-2.0.0-purple.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Web-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-cyan.svg)

---

## ✨ Fitur Utama

### 🌌 Tema Luar Angkasa
- **Starfield animasi** — 150 bintang berkelip di `<canvas>` dengan efek twinkle dan shooting star
- **Nebula clouds** — awan nebula ungu, pink, dan cyan yang melayang dengan animasi drift
- **Planet melayang** — Saturnus (dengan cincin) dan Mars yang mengambang dengan animasi smooth
- **Glassmorphism UI** — panel transparan dengan efek blur dan glow berwarna

### 📱 Pengalaman Launcher Mobile
- **Boot screen** — animasi planet berputar dengan satelit orbit + progress bar
- **Lock screen** — jam besar, widget planet, notifikasi, dan **geser ke atas** untuk membuka
- **Home screen** — widget jam + cuaca, grid 12 aplikasi, dock bawah, search bar
- **App drawer** — semua aplikasi dengan pencarian instan
- **Control Center** — toggle Wi-Fi, Bluetooth, Airplane, Flashlight, DND, Rotate, Brightness, Volume
- **Gesture support** — swipe atas (buka drawer), swipe bawah dari atas (control center), long-press (menu)

### 📦 19 Aplikasi Bawaan
| Ikon | Nama | Keterangan |
|------|------|------------|
| 📞 | Telepon | Dialer dengan avatar astronot |
| 💬 | Pesan | Daftar chat dengan badge notifikasi |
| ✉️ | Email | Inbox dengan status belum dibaca |
| 🌐 | Browser | Browser dengan bookmark |
| 📷 | Kamera | Viewfinder dengan grid |
| 🖼️ | Foto | Galeri thumbnail |
| 🎵 | Musik | Player dengan cover beranimasi |
| 📅 | Kalender | Kalender bulanan interaktif |
| 🕐 | Jam | Jam dunia (Jakarta, Tokyo, NY, London) |
| ⛅ | Cuaca | Widget cuaca luar angkasa |
| 🗺️ | Peta | Peta dengan pin lokasi |
| 🗒️ | Catatan | Editor catatan (tersimpan di localStorage) |
| 🧮 | Kalkulator | Kalkulator ilmiah |
| 📁 | File | File manager dengan folder virtual |
| ⚙️ | Pengaturan | Wallpaper, suara, notifikasi |
| ⌨️ | Terminal | Shell dengan perintah `help`, `neofetch`, `space` |
| 🎨 | Galeri | Galeri emoji luar angkasa |
| 🎮 | Game | Tic-Tac-Toe melawan AI sederhana |
| ℹ️ | Tentang | Informasi sistem |

### ⚙️ Teknis
- **PWA** — dapat diinstal ke home screen Android & iOS, bekerja offline (service worker)
- **Responsif** — dioptimalkan untuk layar mobile & desktop
- **Tanpa dependensi** — vanilla HTML, CSS, JavaScript murni
- **localStorage** — pengaturan & catatan tersimpan lokal

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 | Struktur halaman |
| CSS3 | Styling, animasi, glassmorphism |
| Vanilla JavaScript | Logika aplikasi, starfield canvas |
| Service Worker | Offline support (PWA) |
| Web App Manifest | Instalasi ke home screen |

---

## 📁 Struktur Proyek

```
Rusdi-os-launcher/
├── README.md              # Dokumentasi ini
├── LICENSE                # Lisensi MIT
└── rusdi-jmk48/           # Source code aplikasi
    ├── index.html         # Struktur halaman utama
    ├── styles.css         # Styling tema luar angkasa (1456 baris)
    ├── manifest.json      # Konfigurasi PWA
    ├── sw.js              # Service worker (offline cache)
    └── js/
        ├── main.js        # Entry point, starfield, boot, gestures
        ├── wm.js          # Window manager (fullscreen app view)
        └── apps.js        # 19 aplikasi bawaan
```

---

## 🚀 Instalasi

### Opsi 1: Jalankan Lokal

```bash
# Clone repository
git clone https://github.com/abri45773-art/Rusdi-os-launcher.git
cd Rusdi-os-launcher/rusdi-jmk48

# Jalankan server lokal (pilih salah satu)
python3 -m http.server 8080
# atau
npx serve .
# atau
php -S localhost:8080
```

Buka browser ke `http://localhost:8080`.

### Opsi 2: Instal sebagai PWA di Android/iOS

1. Buka aplikasi di browser (Chrome/Safari)
2. **Android (Chrome):** Menu ⋮ → **Add to Home screen** → **Install**
3. **iOS (Safari):** Share → **Add to Home Screen** → **Add**
4. Aplikasi akan muncul di home screen seperti aplikasi native

> **Catatan:** Service worker memerlukan HTTPS atau `localhost` untuk berfungsi.

---

## 🎮 Cara Penggunaan

| Aksi | Cara |
|------|------|
| Buka aplikasi | Tap ikon aplikasi |
| Buka app drawer | Swipe ke atas dari bawah layar |
| Buka control center | Swipe ke bawah dari bagian atas |
| Tutup drawer/CC | Swipe ke bawah atau tap area luar |
| Kembali dari aplikasi | Tap tombol ← di header |
| Menu cepat | Long-press ikon aplikasi |
| Unlock lock screen | Geser ke atas atau tap tombol unlock |

---

## 🌐 Kompatibilitas Browser

| Browser | Status | Catatan |
|---------|--------|---------|
| Chrome (Android) | ✅ | PWA instalasi penuh |
| Safari (iOS) | ✅ | PWA instalasi penuh |
| Firefox | ✅ | Berjalan normal |
| Edge | ✅ | Berjalan normal |
| Chrome (Desktop) | ✅ | Layout mobile-centered |

---

## 🔧 Development

```bash
# Edit file source di rusdi-jmk48/
# Setelah perubahan, refresh browser (Ctrl+Shift+R untuk bypass cache SW)

# Untuk update cache service worker, ubah versi CACHE di sw.js:
# const CACHE = 'rusdi-os-space-v2';  -> 'rusdi-os-space-v3'
```

### Menambahkan Aplikasi Baru

Tambahkan objek baru di `rusdi-jmk48/js/apps.js`:

```javascript
myapp: {
  name: 'Aplikasi Saya',
  icon: '🌟',
  glow: 'glow-cyan',          // glow-cyan | glow-purple | glow-pink | glow-gold | glow-green
  gradient: 'gradient-1',     // gradient-1 s/d gradient-8
  render: (el) => {
    el.innerHTML = '<div>Konten aplikasi</div>';
  }
}
```

Lalu tambahkan `'myapp'` ke array `HOME_APPS` atau `DRAWER_APPS`.

---

## 📸 Screenshots

<details>
<summary><b>Boot Screen</b> 🚀</summary>

Animasi planet berputar dengan satelit orbit dan progress bar peluncuran.
</details>

<details>
<summary><b>Lock Screen</b> 🔒</summary>

Jam besar, widget planet, notifikasi, dan geser ke atas untuk membuka.
</details>

<details>
<summary><b>Home Screen</b> 🏠</summary>

Widget jam+cuaca, grid 12 aplikasi bertema luar angkasa, dock bawah.
</details>

<details>
<summary><b>App Drawer</b> 📱</summary>

Semua 19 aplikasi dengan pencarian instan.
</details>

<details>
<summary><b>Control Center</b> ⚡</summary>

Toggle sistem dan slider brightness/volume.
</details>

---

## 📝 Changelog

### v2.0.0 — Space Edition
- 🎨 Redesign penuh dengan tema luar angkasa
- 🌌 Starfield canvas dengan bintang berkelip + shooting star
- 🪐 Planet melayang (Saturnus, Mars)
- ☁️ Nebula clouds animasi
- 📱 Home screen launcher mobile (grid, dock, widget)
- 📂 App drawer dengan pencarian
- ⚡ Control Center
- 🎮 19 aplikasi bawaan
- 🔧 PWA support (offline, instalable)

### v1.0.0 — Lite Edition
- 🪟 Desktop OS style dengan window manager
- 📦 10 aplikasi dasar

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👨‍🚀 Credits

Dibuat dengan 💜 oleh **Rusdi OS** untuk para penjelajah galaksi.

> *"Jelajahi luar angkasa dari ujung jari Anda."* 🚀
