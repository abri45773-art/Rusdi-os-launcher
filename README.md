# Rusdi OS Launcher — Space Edition

Launcher Android & iOS ringan bertema luar angkasa. Dibuat dengan HTML, CSS, dan JavaScript murni, sehingga bisa dijalankan langsung di browser, dipasang sebagai PWA, atau dibungkus menjadi APK.

## Fitur

- **Boot screen & lock screen** dengan animasi galaksi dan jam
- **Home screen** dengan grid aplikasi, jam, dan search bar
- **App drawer** untuk semua aplikasi, lengkap dengan pencarian
- **Dock** dan **Control Center** (Wi-Fi, Bluetooth, mode pesawat, senter, Jangan Ganggu, rotasi, kecerahan, volume)
- **Aplikasi bawaan**: Telepon, Pesan, Email, Browser, Kamera, Foto, Musik, Kalender, Jam, Cuaca, Peta, Catatan, Kalkulator, File, Pengaturan, Terminal, Galeri, Game, Tentang, dan lainnya
- **Long-press menu** dan multitasking sederhana (window manager di `js/wm.js`)
- **Offline ready** berkat service worker (`sw.js`) dan manifest PWA

## Struktur Repository

```
.
├── rusdi-jmk48/             # Source code launcher (web app)
│   ├── index.html           # Halaman utama
│   ├── styles.css           # Tema & animasi
│   ├── manifest.json        # Konfigurasi PWA
│   ├── sw.js                # Service worker (cache offline)
│   └── js/
│       ├── main.js          # Boot, lock screen, home, gesture
│       ├── apps.js          # Definisi semua aplikasi
│       └── wm.js            # Window manager
├── capacitor.config.json    # Konfigurasi pembungkus Android (APK)
├── package.json             # Dependensi Capacitor
├── LICENSE
└── README.md
```

## Menjalankan di Browser

Tidak perlu instalasi. Cukup buka `rusdi-jmk48/index.html` di browser, atau jalankan server statis dari folder `rusdi-jmk48`:

```bash
cd rusdi-jmk48
python3 -m http.server 8080
```

Lalu buka `http://localhost:8080`.

## Memasang di HP

### Android (APK)

1. Buka halaman [Releases](../../releases).
2. Unduh file **`Rusdi-os-launcher.apk`** dari release terbaru.
3. Buka file tersebut di HP, lalu izinkan **Install dari sumber tidak dikenal** jika diminta.
4. Setelah terpasang, tekan tombol Home dan pilih **Rusdi os launcher** sebagai launcher default jika ingin.

### iOS (PWA)

1. Buka alamat launcher di Safari.
2. Tekan tombol **Bagikan**, lalu pilih **Tambahkan ke Layar Utama**.

## Membuat APK Sendiri

APK dibangun dari source code di folder `rusdi-jmk48/` memakai [Capacitor](https://capacitorjs.com/). Untuk membangun secara lokal, butuh Node.js 22+, JDK 21, dan Android SDK (atau Android Studio):

```bash
npm install
npx cap add android      # hanya sekali
npx cap sync android
cd android && ./gradlew assembleDebug
```

Hasil APK ada di `android/app/build/outputs/apk/debug/app-debug.apk`. Ganti namanya menjadi `Rusdi-os-launcher.apk` sebelum diunggah ke release.

## Lisensi

Lihat file [LICENSE](LICENSE).
