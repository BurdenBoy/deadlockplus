// Shared page effects: ransom-note headings, rising bubbles, the eye that follows the cursor,
// the header turning solid on scroll and sections sliding in.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- ransom-note letters: every [data-cut] becomes mismatched paper cut-outs ----------
  // A small seeded random keeps each heading the same on every visit.
  const seeded = (str) => { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296; };
  const cutAll = (root) => root.querySelectorAll("[data-cut]:not(.cut)").forEach((el) => {
    const text = el.dataset.cut || el.textContent.trim();
    const rnd = seeded(text + (el.dataset.seed || ""));
    el.setAttribute("aria-label", text);
    el.classList.add("cut");
    el.innerHTML = text.split(" ").map((word) => `<span class="w" aria-hidden="true">${[...word].map((ch) => {
      const r = rnd();
      const kind = r < 0.38 ? "a" : r < 0.62 ? "b" : r < 0.93 ? "c" : "d";
      const size = rnd() < 0.18 ? " s" : rnd() < 0.2 ? " l" : "";
      const font = rnd() < 0.12 ? " f" : "";
      const rot = ((rnd() - 0.5) * 14).toFixed(1);
      const y = ((rnd() - 0.5) * 0.1).toFixed(2);
      return `<i class="${kind}${size}${font}" style="--r:${rot}deg;--y:${y}em">${ch === "&" ? "&amp;" : ch === "<" ? "&lt;" : ch}</i>`;
    }).join("")}</span>`).join("");
  });
  cutAll(document);
  window.cutLetters = cutAll; // for content a page draws later

  // ---------- light patches drifting through the water ----------
  // Drawn at 1/6 size and stretched: the browser's smoothing turns circles into soft caustic patches.
  const wv = document.querySelector("canvas.water");
  if (wv) {
    const ctx = wv.getContext("2d");
    const K = 6;
    let w, h, blobs = [];
    const size = () => {
      w = Math.ceil(innerWidth / K); h = Math.ceil(innerHeight / K); wv.width = w; wv.height = h;
      blobs = Array.from({ length: Math.round((w * h) / 620) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 3 + Math.random() * 7,
        parts: Array.from({ length: 4 + (Math.random() * 3 | 0) }, () => ({ a: Math.random() * 6.28, d: 0.4 + Math.random() * 0.9, s: 0.4 + Math.random() * 0.6, k: Math.random() * 6.28 })),
        vx: (Math.random() - 0.5) * 0.06, vy: -0.02 - Math.random() * 0.05 }));
    };
    size(); addEventListener("resize", size);
    const t0 = performance.now();
    let last = 0;
    const draw = (now) => {
      if (now - last > 33) { // ~30 fps is plenty for slow water
        last = now;
        const t = (now - t0) / 1000;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(190,245,255,.9)";
        for (const b of blobs) {
          if (!reduce) { b.x += b.vx; b.y += b.vy; if (b.y < -15) { b.y = h + 15; b.x = Math.random() * w; } if (b.x < -15) b.x = w + 15; if (b.x > w + 15) b.x = -15; }
          for (const p of b.parts) {
            const a = p.a + Math.sin(t * 0.35 + p.k) * 0.6;
            ctx.beginPath();
            ctx.arc(b.x + Math.cos(a) * b.r * p.d, b.y + Math.sin(a) * b.r * p.d * 0.7, b.r * p.s * (0.85 + 0.15 * Math.sin(t * 0.5 + p.k)), 0, 6.283);
            ctx.fill();
          }
        }
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  // ---------- bubbles rising through the water ----------
  const cv = document.querySelector("canvas.bubbles");
  if (cv && !reduce) {
    const cx = cv.getContext("2d");
    let w, h, B = [];
    const size = () => {
      const dpr = Math.min(2, devicePixelRatio || 1);
      w = innerWidth; h = innerHeight; cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + "px"; cv.style.height = h + "px";
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      B = Array.from({ length: Math.round(w / 18) }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 4, v: 0.2 + Math.random() * 0.7, k: Math.random() * 6.28 }));
    };
    size(); addEventListener("resize", size);
    const t0 = performance.now();
    const frame = (now) => {
      const t = (now - t0) / 1000;
      cx.clearRect(0, 0, w, h);
      for (const b of B) {
        b.y -= b.v; if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; }
        const x = b.x + Math.sin(t * 0.8 + b.k) * 6;
        cx.globalAlpha = 0.35; cx.strokeStyle = "#dffbff"; cx.lineWidth = 1;
        cx.beginPath(); cx.arc(x, b.y, b.r, 0, 6.283); cx.stroke();
        cx.globalAlpha = 0.5; cx.fillStyle = "#fff"; cx.fillRect(x - b.r * 0.4, b.y - b.r * 0.5, 1.2, 1.2);
      }
      if (!document.hidden) requestAnimationFrame(frame); else document.addEventListener("visibilitychange", () => requestAnimationFrame(frame), { once: true });
    };
    requestAnimationFrame(frame);
  }

  // ---------- the eye looks at the cursor ----------
  document.querySelectorAll("svg.eye").forEach((logo) => {
    const pupil = logo.querySelector(".pupil");
    if (!pupil) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const step = () => {
      x += (tx - x) * 0.16; y += (ty - y) * 0.16;
      pupil.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.2 ? requestAnimationFrame(step) : 0;
    };
    addEventListener("mousemove", (e) => {
      const r = logo.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / (r.width * 0.9 + 120));
      tx = (dx / d) * 58 * k; ty = (dy / d) * 30 * k;
      if (!raf) raf = requestAnimationFrame(step);
    });
  });

  // ---------- header, menu highlight, reveal ----------
  const top = document.querySelector(".top");
  const onScroll = () => top && top.classList.toggle("solid", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".rv").forEach((el) => io.observe(el));
})();
