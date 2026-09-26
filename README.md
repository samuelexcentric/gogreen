# EcoSmart - Digital Green Solutions 🌿

Aplikasi web aksi iklim dan solusi hijau digital interaktif nusantara, dirancang dengan sistem desain ramah lingkungan modern berbasis **Tailwind CSS**, font **Plus Jakarta Sans & Inter**, dan **Google Material Symbols**.

---

## 📁 Struktur Direktori & File

Semua berkas telah dipisahkan secara modular antara **HTML**, **CSS**, dan **JavaScript**, serta dibersihkan dari seluruh komentar (`//`, `/* */`, dan `<!-- -->`):

```text
ecosmart/
├── css/
│   └── style.css            # Pengaturan layout global, scrollbar & base layer
├── js/
│   ├── tailwind-config.js   # Konfigurasi token warna, font, dan spacing Tailwind
│   ├── index.js             # Logika interaktif Beranda, DIY Filter, Asisten Siram & Kalkulator Karbon
│   ├── ecotracker.js        # Logika EcoTracker, quest, dan penyiraman pohon
│   ├── kampanye.js          # Logika peta geospatial, pendaftaran relawan
│   ├── katalog-bibit.js     # Logika kalkulator serapan bibit & adopsi pohon
│   ├── login.js             # Logika autentikasi & validasi login
│   └── register.js          # Logika registrasi & password strength meter
├── index.html               # Halaman Beranda & DIY
├── ecotracker.html          # Halaman EcoTracker
├── kampanye.html            # Halaman Kampanye Relawan
├── katalog-bibit.html       # Halaman Katalog Bibit
├── login.html               # Halaman Masuk
├── register.html            # Halaman Daftar
└── README.md
```

---

## 🌐 Daftar Halaman Web

Semua halaman telah terhubung (*interlinked*) dan memiliki navigasi desktop serta *mobile drawer*:

1. **[Beranda & Edukasi](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/index.html)** (`index.html`)
   - Panduan metode penghijauan mandiri DIY (Vertikultur botol bekas, Kompos Takakura, Kebun Microgreens, Biopori PVC, Irigasi infus tetes, Stek nodus).
   - Fitur filter interaktif berdasarkan anggaran (Rp 0 s/d Rp 25rb), lahan sempit/balkon, hemat air, dan pemula.
   - Smart Digital Tools Interaktif: **Watering Reminder AI** (Asisten Jadwal Siram Adaptif Cuaca & GPS) dan **Kalkulator Jejak Karbon Pribadi** (Audit Emisi Mandiri Standar IPCC 2024 dengan unduhan sertifikat).

2. **[EcoTracker Interaktif](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/ecotracker.html)** (`ecotracker.html`)
   - Gamifikasi pelacak aksi iklim harian ala Duolingo (Peta petualangan berbentuk S-curve dengan checkpoint, misteri chest, dan level evaluasi).
   - Profil Pengguna (Lv. 4: Penjaga Hutan Kota, 14 Hari Streak, 1.420 Daun Emas).
   - Fitur interaktif siram Pohon Mangrove Virtual (+5% pertumbuhan real-time).
   - Modal Catat Aksi Hijau Harian & Verifikasi Foto AI untuk misi harian.

3. **[Kampanye & Relawan](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/kampanye.html)** (`kampanye.html`)
   - Radar peta geospatial titik aksi hijau terdekat (Muara Gembong, Ciliwung, Sukamaju).
   - Feed aktivitas relawan *real-time* dan mini leaderboard gotong royong.
   - Katalog kampanye terbuka dengan progress bar kuota relawan & modal pendaftaran tiket instan via WhatsApp.
   - Formulir inisiasi aksi mandiri untuk pengurus RT/RW & komunitas.

4. **[Katalog Bibit & Donasi](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/katalog-bibit.html)** (`katalog-bibit.html`)
   - Katalog bibit pohon unggul nusantara (Tabebuya, Mangrove, Trembesi, Alpukat Aligator, Gaharu, Kiara Payung).
   - Kalkulator dampak serapan emisi CO₂ dinamis berdasarkan jumlah bibit pohon yang diadopsi.
   - Sistem KTP Pohon Geotagged GPS & simulasi sertifikat adopsi resmi.
   - Modal adopsi pohon lengkap dengan opsi plakat nama dedikasi fisik.

5. **[Masuk / Autentikasi](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/login.html)** (`login.html`)
   - Formulir login bertema bio-digital dengan validasi input, toggle lihat sandi, dan simulasi Single Sign-On (Google & Apple ID).
   - Pengalihan otomatis ke EcoTracker setelah verifikasi.

6. **[Daftar Akun Baru](file:///home/shersamsam/.gemini/antigravity/scratch/ecosmart/register.html)** (`register.html`)
   - Registrasi relawan iklim baru dengan indikator kekuatan kata sandi (*Password Strength Meter*) real-time.
   - Pilihan domisili wilayah nusantara, persetujuan syarat ketentuan iklim, dan bonus sambutan +100 Daun Emas.

---

## 🚀 Cara Menjalankan & Membuka

Anda dapat membuka file langsung di peramban (browser) atau menjalankan server lokal:

```bash
cd /home/shersamsam/.gemini/antigravity/scratch/ecosmart
python3 -m http.server 8080
```
Buka browser di: `http://localhost:8080`
