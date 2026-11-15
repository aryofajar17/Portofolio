/* =========================================================
   Portfolio — Aryo Fajar Pratomo
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
  const THEME_KEY = "af-theme";

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

  /* ---------- 4. Header, progress bar, tombol ke atas, dock ---------- */
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  const dock = $("#dock");
  let dockLinks = dock ? Array.from(dock.querySelectorAll("a")) : [];
  let ticking = false;

  function setDockActive(hash) {
    dockLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === hash));
  }

  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("scrolled", y > 8);
    if (progress) progress.style.transform = `scaleX(${docH > 0 ? Math.min(y / docH, 1) : 0})`;
    if (toTop) toTop.classList.toggle("show", y > 620);
    if (y < 240) setDockActive("#top");
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

  const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

  if (typedEl && !reduceMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = false;

    function typeLoop() {
      const word = roles[roleIndex];
      // Sentuhan scramble ala React Bits: karakter berikutnya berkedip acak saat mengetik
      let shown = word.slice(0, charIndex);
      if (!deleting && charIndex < word.length) {
        shown += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      typedEl.textContent = shown;

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

  /* ---------- 10. Sorotan kursor (spotlight) pada kartu ---------- */
  if (window.matchMedia("(hover: hover)").matches) {
    $$(".spotlight, .hobby-card").forEach((card) => {
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
        setDockActive(`#${entry.target.id}`);
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

  /* =========================================================
     15. Efek ala React Bits (vanilla) — partikel, split text,
         tilt 3D, dock magnification, tombol magnet
     ========================================================= */
  const canHoverFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* 15a. Partikel melayang di hero (canvas ringan, berhenti saat di luar layar) */
  const heroSection = $(".hero");
  const heroCanvas = $("#heroParticles");
  if (heroSection && heroCanvas && !reduceMotion && heroCanvas.getContext) {
    const ctx = heroCanvas.getContext("2d");
    const PARTICLE_COLORS = ["192,132,252", "139,92,246", "240,171,252"];
    const parts = [];
    let w = 0, h = 0, rafId = null;

    function sizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      heroCanvas.width = Math.round(w * dpr);
      heroCanvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnParticles() {
      const count = w < 640 ? 22 : 40;
      parts.length = 0;
      for (let i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.7 + .6,
          vx: (Math.random() - .5) * .25,
          vy: (Math.random() - .5) * .25 - .1,
          c: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
          a: Math.random() * .45 + .12,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += .02;
        if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12; else if (p.y > h + 12) p.y = -12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = `rgba(${p.c},${(p.a * (0.6 + 0.4 * Math.sin(p.tw))).toFixed(3)})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(drawParticles);
    }

    function startParticles() { if (rafId === null) rafId = requestAnimationFrame(drawParticles); }
    function stopParticles() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }
    window.__stopHeroParticles = stopParticles;

    sizeCanvas();
    spawnParticles();
    startParticles();
    window.addEventListener("resize", () => { sizeCanvas(); spawnParticles(); }, { passive: true });
    document.addEventListener("visibilitychange", () => { document.hidden ? stopParticles() : startParticles(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => (en.isIntersecting ? startParticles() : stopParticles()));
      }, { threshold: 0 }).observe(heroSection);
    }
  }

  /* 15b. Split-text judul section: muncul kata demi kata saat di-scroll */
  const splitTitles = $$(".section-head h2");
  if ("IntersectionObserver" in window && !reduceMotion && splitTitles.length) {
    splitTitles.forEach((h2) => {
      const original = h2.textContent.trim();
      const words = original.split(/\s+/);
      h2.setAttribute("aria-label", original);
      h2.textContent = "";
      const wrap = document.createElement("span");
      wrap.setAttribute("aria-hidden", "true");
      wrap.className = "split-wrap";
      words.forEach((word, i) => {
        const s = document.createElement("span");
        s.className = "split-word rise-word";
        s.style.setProperty("--wi", String(i));
        s.textContent = word;
        wrap.appendChild(s);
        if (i < words.length - 1) wrap.appendChild(document.createTextNode(" "));
      });
      h2.appendChild(wrap);
    });

    const splitObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("split-in");
          splitObs.unobserve(entry.target);
        }
      });
    }, { threshold: .25 });
    splitTitles.forEach((h2) => {
      if (h2.getBoundingClientRect().top < window.innerHeight) h2.classList.add("split-in");
      else splitObs.observe(h2);
    });
  }

  /* 15c. Kartu tilt 3D mengikuti kursor */
  if (canHoverFine && !reduceMotion) {
    $$("[data-tilt]").forEach((el) => {
      let raf = null;
      el.addEventListener("pointermove", (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = null;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - .5;
          const py = (e.clientY - r.top) / r.height - .5;
          el.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
          el.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
        });
      });
      el.addEventListener("pointerleave", () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* 15d. Dock: ikon membesar mengikuti jarak kursor (macOS dock) */
  if (dock && canHoverFine && !reduceMotion && dockLinks.length) {
    const RANGE = 105, MAG = 1.5;
    let dockRaf = null;

    dock.addEventListener("pointermove", (e) => {
      if (dockRaf) return;
      dockRaf = requestAnimationFrame(() => {
        dockRaf = null;
        dockLinks.forEach((link) => {
          const r = link.getBoundingClientRect();
          const dist = Math.abs(e.clientX - (r.left + r.width / 2));
          const t = Math.max(0, 1 - dist / RANGE);
          const eased = t * t * (3 - 2 * t);
          link.style.setProperty("--s", (1 + (MAG - 1) * eased).toFixed(3));
        });
      });
    });
    dock.addEventListener("pointerleave", () => {
      if (dockRaf) { cancelAnimationFrame(dockRaf); dockRaf = null; }
      dockLinks.forEach((link) => link.style.setProperty("--s", "1"));
    });
  }

  /* 15e. Tombol magnet: tertarik mengikuti kursor */
  if (canHoverFine && !reduceMotion) {
    $$("[data-magnetic]").forEach((el) => {
      let rafM = null, lastEvt = null;
      el.addEventListener("pointermove", (e) => {
        lastEvt = e;
        if (rafM) return;
        rafM = requestAnimationFrame(() => {
          rafM = null;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--tx", `${((lastEvt.clientX - (r.left + r.width / 2)) * .3).toFixed(1)}px`);
          el.style.setProperty("--ty", `${((lastEvt.clientY - (r.top + r.height / 2)) * .3).toFixed(1)}px`);
        });
      });
      el.addEventListener("pointerleave", () => {
        if (rafM) { cancelAnimationFrame(rafM); rafM = null; }
        el.style.setProperty("--tx", "0px");
        el.style.setProperty("--ty", "0px");
      });
    });
  }

  /* 15g. Watchdog performa: bila FPS perangkat rendah, turunkan efek otomatis */
  if (!reduceMotion && "requestAnimationFrame" in window) {
    let perfChecks = 0;
    function checkPerformance() {
      perfChecks++;
      let frames = 0;
      const t0 = performance.now();
      function tick() {
        frames++;
        if (performance.now() - t0 < 1200) requestAnimationFrame(tick);
        else {
          const fps = frames / ((performance.now() - t0) / 1000);
          if (fps < 30) {
            document.documentElement.classList.add("perf-lite");
            if (typeof window.__stopHeroParticles === "function") window.__stopHeroParticles();
          } else if (perfChecks < 2) {
            setTimeout(checkPerformance, 4000);
          }
        }
      }
      requestAnimationFrame(tick);
    }
    setTimeout(checkPerformance, 900);
  }
})();
