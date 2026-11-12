/* =========================================================
   Portfolio — Rizky Pratama
   Vanilla JS: tema, navigasi, animasi, form, dsb.
   ========================================================= */
(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Tema (gelap default, tersimpan di localStorage) ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");
  const THEME_KEY = "rp-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f7fb" : "#0a0c11");
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(theme === "light"));
      themeToggle.title = theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang";
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) { /* mode privat */ }
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* abaikan */ }
    });
  }

  /* ---------- 2. Toast ---------- */
  const toastEl = $("#toast");
  let toastTimer = null;
  function toast(message, ms = 3200) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), ms);
  }

  /* ---------- 3. Menu mobile ---------- */
  const navToggle = $("#navToggle");
  const nav = $("#primaryNav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu navigasi");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
    });
    $$(".nav-link", nav).forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });
    document.addEventListener("click", (e) => {
      if (!nav.classList.contains("open")) return;
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  /* ---------- 4. Header, progress bar, tombol ke atas ---------- */
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("scrolled", y > 8);
    if (progress) progress.style.transform = `scaleX(${docH > 0 ? Math.min(y / docH, 1) : 0})`;
    if (toTop) toTop.classList.toggle("show", y > 620);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- 5. Reveal saat masuk viewport ---------- */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach((el) => {
      // Elemen yang sudah berada di layar saat halaman dibuka langsung tampil,
      // supaya tidak ada area kosong saat animasi awal belum terpicu.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("reveal-instant", "is-visible");
      } else {
        revealObs.observe(el);
      }
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 6. Animasi skill bar ---------- */
  const skillPanels = $$(".skill-panel");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          skillObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    skillPanels.forEach((panel) => skillObs.observe(panel));
  } else {
    skillPanels.forEach((panel) => panel.classList.add("is-visible"));
  }

  /* ---------- 7. Angka statistik ---------- */
  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const decimals = Number(el.dataset.decimals || 0);
    if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }

    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = $$(".counter");
  if ("IntersectionObserver" in window && counters.length) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => countObs.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = Number(c.dataset.count || 0).toFixed(Number(c.dataset.decimals || 0)); });
  }

  /* ---------- 8. Efek mengetik di hero ---------- */
  const typedEl = $("#typedText");
  const roles = ["Teknik Informatika", "Web Developer", "Esports Enthusiast", "Siap Belajar Cepat"];

  if (typedEl && !reduceMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = false;

    function typeLoop() {
      const word = roles[roleIndex];
      typedEl.textContent = word.slice(0, charIndex);

      let delay = deleting ? 45 : 85;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 420;
      }

      if (deleting) charIndex--;
      else charIndex++;

      setTimeout(typeLoop, delay);
    }
    setTimeout(typeLoop, 1800);
  }

  /* ---------- 9. Kutipan berputar ---------- */
  const rotating = $("#rotatingQuote");
  const quotes = [
    "Kamu hanya perlu melangkah ke depan tanpa harus melihat ke belakang.",
    "Selesaikan dulu, sempurnakan kemudian.",
    "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.",
    "Belajar satu hal baru setiap hari, sekecil apa pun."
  ];

  if (rotating && !reduceMotion) {
    let qi = 0;
    setInterval(() => {
      rotating.parentElement.classList.add("is-fading");
      setTimeout(() => {
        qi = (qi + 1) % quotes.length;
        rotating.textContent = quotes[qi];
        rotating.parentElement.classList.remove("is-fading");
      }, 420);
    }, 7000);
  }

  /* ---------- 10. Sorotan kursor pada kartu hobi ---------- */
  if (window.matchMedia("(hover: hover)").matches) {
    $$(".hobby-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ---------- 11. Navigasi aktif sesuai bagian ---------- */
  const navLinks = $$(".nav-link");
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? $(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach((section) => navObs.observe(section));
  }

  /* ---------- 12. Form kontak (validasi + mailto) ---------- */
  const form = $("#contactForm");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function setError(field, message) {
    const errorEl = $(`[data-error-for="${field.name}"]`, form);
    if (errorEl) errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  function validateField(field) {
    const value = field.value.trim();
    if (!value) return setError(field, "Bagian ini wajib diisi.");
    if (field.type === "email" && !EMAIL_RE.test(value)) return setError(field, "Format email belum benar.");
    if (field.name === "message" && value.length < 12) return setError(field, "Tuliskan setidaknya 12 karakter.");
    return setError(field, "");
  }

  if (form) {
    const fields = $$("input, textarea", form);

    fields.forEach((field) => {
      field.addEventListener("blur", () => { if (field.value.trim()) validateField(field); });
      field.addEventListener("input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = fields.map(validateField);
      const firstInvalid = fields.find((f) => f.getAttribute("aria-invalid") === "true");

      if (firstInvalid) {
        firstInvalid.focus();
        toast("Mohon lengkapi data yang ditandai terlebih dahulu.");
        return;
      }

      if (results.every(Boolean)) {
        const name = $("#name", form).value.trim();
        const email = $("#email", form).value.trim();
        const subject = $("#subject", form).value.trim();
        const message = $("#message", form).value.trim();

        const body = [
          `Nama: ${name}`,
          `Email: ${email}`,
          "",
          message
        ].join("\n");

        const mailto = `mailto:aryofajar17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
        toast("Aplikasi email Anda sedang dibuka. Terima kasih!");
        form.reset();
        fields.forEach((f) => f.setAttribute("aria-invalid", "false"));
      }
    });
  }

  /* ---------- 13. Cetak / simpan CV sebagai PDF ---------- */
  const printBtn = $("#printCv");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      toast("Pilih “Save as PDF” pada dialog cetak untuk menyimpan CV.");
      setTimeout(() => window.print(), 500);
    });
  }

  /* ---------- 14. Tahun berjalan ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
