# Portofolio — Aryo Fajar Pratomo

Website portofolio pribadi satu halaman dengan tema **gelap ungu**. Dibuat untuk kebutuhan
melamar kerja dan magang: menampilkan data diri, keahlian, pengalaman organisasi, hobi,
motto hidup, dan kutipan favorit dalam satu halaman yang rapi dan responsif.

<!-- Setelah deploy, ganti bagian ini dengan URL website Anda -->
> 🔗 **Live demo:** `https://aryofajar17.github.io/` _(aktifkan GitHub Pages dulu — lihat bagian [Deploy](#-deploy))_

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
│   └── favicon.svg       # Ikon tab browser (inisial AF)
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
| Hero | Nama, status, animasi peran, tombol aksi, media sosial |
| 01 Tentang | Cerita singkat + kartu data diri |
| 02 Keahlian | Hard skill (progress bar), tools favorit, soft skill |
| 03 Pengalaman | Sekretaris Umum (2026–2027), Staff Divisi Operasional, proyek latihan, pendidikan |
| 04 Hobi | Bermain game, gym, mencoba koding baru |
| 05 Motto | Motto hidup + kutipan favorit |
| 06 Kontak | Email, WhatsApp, lokasi, form kontak |

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
| Hobi & game favorit | bagian `#hobi` → `.hobby-card` |
| Motto & kutipan | bagian `#motto` |
| Kontak | bagian `#kontak` |
| Alamat email form | `assets/main.js` → variabel `mailto` |

### Foto profil

Timpa `assets/foto-profil.jpeg` dengan foto baru (nama file sama), atau ubah atribut `src`
pada elemen `<img>` di dalam `.profile-photo`. Foto akan dipotong otomatis ke kotak 1:1
dengan fokus di area wajah (`object-position: center 22%`).

## 🌐 Deploy

### GitHub Pages (gratis)

1. Buka **Settings → Pages** pada repositori ini.
2. Bagian *Source*, pilih branch **`main`** dan folder **`/ (root)`**.
3. Klik **Save**, tunggu 1–2 menit.
4. Website tersedia di `https://<username>.github.io/<nama-repo>/`.

> **Tips:** bila repo diberi nama `<username>.github.io`, website langsung dapat diakses
> di `https://<username>.github.io/` tanpa akhiran nama repo.

### Alternatif

- **Netlify** — drag & drop folder ini ke [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel** — import repositori, tanpa konfigurasi build (framework: *Other*).
- **Cloudflare Pages** — hubungkan repositori, build command dikosongkan.

## 📤 Push ke GitHub

Repositori lokal sudah diinisialisasi dan commit pertama sudah dibuat pada branch `main`.
Tinggal tambahkan remote dan push:

```bash
# 1. Hubungkan ke repo GitHub Anda (ganti URL-nya)
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# 2. Push commit pertama
git push -u origin main
```

Jika repo GitHub sudah berisi file (mis. README bawaan), tarik dulu lalu gabungkan:

```bash
git pull --rebase origin main --allow-unrelated-histories
git push -u origin main
```

Untuk perubahan berikutnya cukup:

```bash
git add -A
git commit -m "update: perbaikan konten"
git push
```

## 📄 Lisensi

Kode boleh dipakai dan dimodifikasi bebas untuk keperluan pribadi.
Konten, foto, dan data diri di dalamnya milik Aryo Fajar Pratomo.

---

Dibuat dengan teliti &amp; secangkir kopi. ☕
