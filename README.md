# Portofolio — Aryo Fajar Pratomo

Website portofolio pribadi satu halaman dengan tema **gelap ungu**. Dibuat untuk kebutuhan
melamar kerja dan magang: menampilkan data diri, keahlian, pengalaman organisasi, proyek,
hobi, motto hidup, dan kutipan favorit dalam satu halaman yang rapi dan responsif.

> 🔗 **Live demo:** [https://aryofajar17.github.io/Portofolio/](https://aryofajar17.github.io/Portofolio/)
> _(GitHub Pages sudah aktif — otomatis ter-update setiap kali ada push ke `main`)_

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tanpa dependensi](https://img.shields.io/badge/dependencies-0-8b5cf6?style=flat-square)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-c084fc?style=flat-square)

---

## ✨ Fitur

- **Tema gelap ungu** sebagai default, plus tombol ganti ke tema terang (pilihan tersimpan di browser).
- **Hero** dengan animasi mengetik, kartu profil berfoto, dan statistik singkat.
- **Navigasi sticky** dengan penanda bagian aktif, menu mobile, dan progress bar gulir.
- **Animasi reveal** saat elemen masuk layar — otomatis dinonaktifkan bila pengunjung memakai
  `prefers-reduced-motion`.
- **Efek ala React Bits** (reactbits.dev, dibuat ulang murni CSS/JS tanpa dependensi):
  - *Aurora background* + *partikel* melayang di hero (canvas, berhenti saat di luar layar),
  - Nama di hero muncul dengan efek *blur-in*, judul section muncul *kata demi kata* (split text),
    animasi ketik dengan sentuhan *scramble*,
  - Kartu *tilt 3D* mengikuti kursor + *spotlight glow* pada kartu proyek, data diri, keahlian, dan kutipan,
  - *Dock navigasi* ala macOS di bawah layar (ikon membesar mengikuti kursor, penanda bagian aktif),
  - Tombol *magnet* yang tertarik mengikuti kursor dan tombol utama dengan *star border*
    (bingkai cahaya berputar).
- **Kartu Spotify** — kartu dua kolom di bagian Hobi: heading, deskripsi, dan tombol menuju playlist
  di kiri; player resmi Spotify dengan daftar lagu di kanan (bisa diputar langsung). Otomatis
  disembunyikan saat mencetak CV.
- **Form kontak** dengan validasi dan pengiriman via aplikasi email.
- **Tombol Unduh / Cetak CV** → pilih "Save as PDF" pada dialog cetak (ada stylesheet khusus print).
- **Responsif** untuk desktop, tablet, dan ponsel.
- **Aksesibilitas & SEO**: skor Lighthouse **Accessibility 100 · Best Practices 100 · SEO 100**.

## 🛠️ Teknologi

Murni HTML, CSS, dan JavaScript — **tanpa framework, tanpa build tool, tanpa dependensi**.
Cukup buka `index.html` di browser, tidak ada proses instalasi.

| Bagian | Detail |
|---|---|
| Markup | HTML5 semantik + SVG sprite untuk ikon |
| Styling | CSS custom properties (variabel), Flexbox & Grid, `clamp()` untuk tipografi |
| Interaksi | Vanilla JS — IntersectionObserver, requestAnimationFrame |
| Font | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Sora](https://fonts.google.com/specimen/Sora) via Google Fonts |

## 📁 Struktur file

```
.
├── index.html            # Seluruh konten halaman
├── assets/
│   ├── style.css         # Desain & tema (gelap/terang, responsif, print)
│   ├── main.js           # Interaksi: menu, animasi, validasi form, tema
│   ├── foto-profil.jpeg  # Foto profil
│   ├── favicon.svg       # Ikon tab browser (inisial AF)
│   ├── get-blessed.jpg   # Gambar dekorasi cadangan (belum terpakai)
│   └── games/            # Gambar kartu game favorit (5 file jpg)
├── .gitignore
├── .gitattributes
└── README.md
```

## 🚀 Menjalankan secara lokal

Tidak perlu instalasi apa pun. Pilih salah satu:

```bash
# 1. Buka langsung
#    klik dua kali index.html

# 2. Server lokal (Python)
python -m http.server 5500
# lalu buka http://localhost:5500

# 3. Server lokal (Node.js)
npx serve .
```

## 📝 Isi website

| Bagian | Konten |
|---|---|
| Hero | Nama, status, animasi peran, tombol aksi, media sosial, aurora + partikel |
| 01 Tentang | Cerita singkat + kartu data diri |
| 02 Keahlian | Hard skill (progress bar), tools favorit, soft skill |
| 03 Pengalaman | Sekretaris Umum (2026–2027), Staff Divisi Operasional, proyek latihan, pendidikan |
| 04 Proyek | Kartu proyek/eksperimen (tilt 3D + spotlight) + tombol ke GitHub |
| 05 Hobi | Bermain game (kartu bergambar), gym, mencoba koding baru, playlist Spotify |
| 06 Motto | Motto hidup + kutipan favorit |
| 07 Kontak | Email, WhatsApp, lokasi, form kontak |

## 🎨 Kustomisasi

### Warna

Semua warna terpusat sebagai CSS variable di bagian atas `assets/style.css`:

```css
:root {
  --bg:       #0a0812;  /* latar utama */
  --surface:  #130f1e;  /* kartu */
  --accent:   #c084fc;  /* aksen ungu */
  --accent-2: #8b5cf6;
  --accent-3: #f0abfc;
  --text:     #efeaf9;
}
```

### Konten

| Data | Lokasi di `index.html` |
|---|---|
| Nama, headline, status | `<title>`, `.hero h1`, `.profile-meta`, `.brand` |
| Data diri | bagian `#tentang` → `.info-list` |
| Keahlian & persentase | bagian `#keahlian` → `.skill-label` dan `--w` pada `.bar-fill` |
| Pengalaman & pendidikan | bagian `#pengalaman` → `.timeline-item` |
| Proyek | bagian `#proyek` → `.project-card` (judul, deskripsi, tag, link GitHub) |
| Hobi & game favorit | bagian `#hobi` → `.hobby-card`, kartu game di `.game-card` (gambar di `assets/games/`, badge, judul, genre) |
| Playlist Spotify | bagian `#hobi` → judul/teks di `.spotify-copy`, URL iframe `.spotify-embed` (ganti id playlist pada `src`), dan tautan tombol `.spotify-btn` |
| Motto & kutipan | bagian `#motto` |
| Kontak | bagian `#kontak` |
| Dock navigasi bawah | elemen `#dock` (tautan & ikon tiap bagian) |
| Alamat email form | `assets/main.js` → variabel `mailto` |

### Efek ala React Bits

| Efek | Cara mengatur |
|---|---|
| Jumlah & warna partikel hero | `assets/main.js` → fungsi `spawnParticles` & `PARTICLE_COLORS` |
| Warna & kecepatan aurora | `assets/style.css` → bagian `19a` (`.a-blob`, `@keyframes auroraA/B/C`) |
| Kekuatan tilt kartu | `assets/main.js` → bagian `15c` (angka `6` dan `8` = derajat kemiringan) |
| Besar maksimum ikon dock | `assets/main.js` → bagian `15d` (konstanta `MAG` dan `RANGE`) |
| Kecepatan star border | `assets/style.css` → durasi `animation: starSpin` pada `.btn-primary::before` |

> Semua efek otomatis nonaktif untuk pengunjung dengan `prefers-reduced-motion`, saat mencetak,
> dan partikel berhenti saat tab tidak aktif (hemat baterai).

### Foto profil

Timpa `assets/foto-profil.jpeg` dengan foto baru (nama file sama), atau ubah atribut `src`
pada elemen `<img>` di dalam `.profile-photo`. Foto akan dipotong otomatis ke kotak 1:1
dengan fokus di area wajah (`object-position: center 22%`).

## 🌐 Deploy

### GitHub Pages (gratis) — ✅ sudah aktif

Repo ini sudah ter-deploy: setiap push ke `main` otomatis memicu rebuild, dan website
tampil di **https://aryofajar17.github.io/Portofolio/** (cek statusnya di
**Settings → Pages**, source: branch `main`, folder `/ (root)`).

> **Tips:** bila repo diberi nama `<username>.github.io`, website langsung dapat diakses
> di `https://<username>.github.io/` tanpa akhiran nama repo.

### Alternatif

- **Netlify** — drag & drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel** — import repositori, tanpa konfigurasi build (framework: *Other*).
- **Cloudflare Pages** — hubungkan repositori, build command dikosongkan.

## 📤 Push ke GitHub

Remote `origin` sudah terhubung ke `https://github.com/aryofajar17/Portofolio.git`
dan branch `main` sudah ter-push. Untuk perubahan berikutnya cukup:

```bash
git add -A
git commit -m "update: perbaikan konten"
git push
```

GitHub Pages akan otomatis membangun ulang website beberapa saat setelah push
(bisa dipantau di **Settings → Pages → Builds**).

## 📄 Lisensi

Kode boleh dipakai dan dimodifikasi bebas untuk keperluan pribadi.
Konten, foto, dan data diri di dalamnya milik Aryo Fajar Pratomo.

---

Dibuat dengan teliti &amp; secangkir kopi. ☕
