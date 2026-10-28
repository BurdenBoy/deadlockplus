// Shared page effects: the particle figure-eight behind the hero, the title's letters dropping in,
// the logo's eye following the cursor, a light following the cursor over banners, the nav turning
// solid on scroll and sections sliding in.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- title letters drop in one by one ----------
  document.querySelectorAll("h1.title").forEach((h) => {
    let n = 0;
    h.querySelectorAll("[data-letters]").forEach((part) => {
      const text = part.textContent;
      part.setAttribute("aria-label", text);
      part.innerHTML = [...text].map((ch) => `<span class="l" aria-hidden="true" style="animation-delay:${(0.15 + n++ * 0.06).toFixed(2)}s">${ch}</span>`).join("");
    });
  });

  // ---------- particle band along a figure eight ----------
  const cv = document.getElementById("flow");
  if (cv) {
    const cx = cv.getContext("2d");
    let w = 0, h = 0, P = [], raf = 0;
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(4200, Math.round((w * h) / 520));
      P = Array.from({ length: n }, () => ({ u: Math.random(), v: gauss(), s: 0.5 + Math.random() * 1.5, o: 0.15 + Math.random() * 0.6, k: Math.random() * 6.28, sp: 0.4 + Math.random() }));
    };
    const mix = (t) => `rgb(${Math.round(229 + (157 - 229) * t)},${Math.round(72 + (140 - 72) * t)},${Math.round(77 + (255 - 77) * t)})`;
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      cx.clearRect(0, 0, w, h);
      const wide = w > 900;
      const a = wide ? Math.min(w * 0.3, h * 0.75) : Math.min(w * 0.42, h * 0.5);
      const ox = wide ? w * 0.66 : w * 0.5, oy = wide ? h * 0.52 : h * 0.72;
      const L = (q) => { const s = Math.sin(q), c = Math.cos(q), d = 1 + s * s; return [a * c / d, a * s * c / d]; };
      for (const p of P) {
        const tt = (p.u + (reduce ? 0 : t * 0.012 * p.sp)) * Math.PI * 2;
        const [x0, y0] = L(tt), [x1, y1] = L(tt + 0.002), tl = Math.hypot(x1 - x0, y1 - y0) || 1;
        const spread = a * 0.13 * p.v * (1 + 0.3 * Math.sin(t * 0.6 + p.k)) * (p.k > 5.9 ? 2.4 : 1);
        const x = ox + x0 + (-(y1 - y0) / tl) * spread, y = oy + y0 + ((x1 - x0) / tl) * spread;
        cx.globalAlpha = Math.min(1, p.o * (1.1 - Math.min(1, Math.abs(p.v)) * 0.6)) * 0.85;
        cx.fillStyle = mix((Math.cos(tt) + 1) / 2);
        cx.fillRect(x, y, p.s, p.s);
      }
      cx.globalAlpha = 1;
      raf = reduce || document.hidden ? 0 : requestAnimationFrame(frame);
    };
    new ResizeObserver(() => { size(); if (!raf) raf = requestAnimationFrame(frame); }).observe(cv);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && !raf) raf = requestAnimationFrame(frame); });
  }

  // ---------- the logo's eye looks at the cursor ----------
  document.querySelectorAll("svg.eye").forEach((logo) => {
    const pupil = logo.querySelector(".pupil");
    if (!pupil) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      pupil.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(step) : 0;
    };
    addEventListener("mousemove", (e) => {
      const r = logo.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 260);
      tx = (dx / d) * 58 * k; ty = (dy / d) * 30 * k;
      if (!raf) raf = requestAnimationFrame(step);
    });
  });

  // ---------- a soft light follows the cursor over banners ----------
  document.querySelectorAll(".banner").forEach((b) => b.addEventListener("mousemove", (e) => {
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
    b.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
  }));

  // ---------- nav and reveal ----------
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("solid", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
})();
