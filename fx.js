// Page effects: title letters dropping in, the occult rings, ability icons, marquee tapes, the
// "select a feature" screen, launcher screenshot tabs, floating cards that follow the cursor,
// the logo's eye, the nav and sections sliding in. Feature data comes from assets/features.js.
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = window.DLP || { features: [], icons: {} };
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  // feature text in the page's language (features.js carries both)
  const tx = (f, k) => (window.LANG === "en" && f[k + "_en"]) || f[k];
  const svgIcon = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${D.icons[name] || ""}</svg>`;

  // ---------- title letters drop in one by one ----------
  $$("h1.title").forEach((h) => {
    let n = 0;
    $$("[data-letters]", h).forEach((part) => {
      const text = part.textContent;
      part.setAttribute("aria-label", text);
      part.innerHTML = [...text].map((ch) => `<span class="l" aria-hidden="true" style="animation-delay:${(0.2 + n++ * 0.055).toFixed(2)}s">${ch}</span>`).join("");
    });
  });

  // ---------- thin rotating rings ----------
  const ticks = (r, n, len) => Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
    return `M${(500 + c * (r - len)).toFixed(1)} ${(500 + s * (r - len)).toFixed(1)}L${(500 + c * r).toFixed(1)} ${(500 + s * r).toFixed(1)}`;
  }).join("");
  const spokes = Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * Math.PI * 2 + 0.26; return `M500 500L${(500 + Math.cos(a) * 300).toFixed(1)} ${(500 + Math.sin(a) * 300).toFixed(1)}`; }).join("");
  const RINGS = `<svg viewBox="0 0 1000 1000" fill="none" stroke="#fff" stroke-opacity=".06" stroke-width="1.6">
    <g class="r1"><circle cx="500" cy="500" r="480"/><circle cx="500" cy="500" r="300"/><path d="${ticks(480, 72, 26)}"/></g>
    <g class="r2"><circle cx="500" cy="500" r="400" stroke-dasharray="4 12"/><path d="${spokes}"/><circle cx="500" cy="500" r="120"/><circle cx="500" cy="500" r="180" stroke-dasharray="2 8"/></g></svg>`;
  $$(".rings").forEach((el) => (el.innerHTML = RINGS));

  // ---------- ability icons ----------
  $$("[data-ic]").forEach((el) => (el.innerHTML = svgIcon(el.dataset.ic)));
  $$("[data-abils]").forEach((box) => {
    box.innerHTML = box.dataset.abils.split(" ").map((n, i) => `<span class="ab" style="animation-delay:${(0.9 + i * 0.1).toFixed(2)}s">${svgIcon(n)}</span>`).join("");
  });

  // ---------- marquee tapes (content doubled for a seamless loop) ----------
  $$("[data-tape]").forEach((run) => {
    const items = run.dataset.tape.split("|").map((t) => `<span>${t}</span>`).join("");
    run.innerHTML = items.repeat(4);
  });

  // ---------- select a feature ----------
  const sel = $("#sel");
  if (sel && D.features.length) {
    const F = D.features, grid = $(".sel-grid", sel), art = $(".art", sel), poster = $("#sp");
    const name = $("#sp-name"), num = $("#sp-num"), tags = $("#sp-tags"), abs = $("#sp-abs"), lead = $("#si-lead"), desc = $("#si-desc"), bar = $(".bar", sel);
    const T = 5000;
    grid.innerHTML = F.map((f, i) => `<button class="pick" role="tab" data-i="${i}" aria-label="${tx(f, "name")}"><img src="assets/cards/${f.id}.svg" alt="" width="240" height="320"><span class="nm">${tx(f, "name")}</span></button>`).join("");
    bar.innerHTML = F.map(() => "<i></i>").join("");
    F.forEach((f) => { new Image().src = `assets/posters/${f.id}.svg`; });
    const picks = $$(".pick", grid), bars = $$("i", bar);
    let cur = -1, timer = 0, hover = false;
    const replay = (el) => { el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); };
    const show = (i) => {
      if (i === cur) return;
      cur = i;
      const f = F[i];
      picks.forEach((p, k) => { p.classList.toggle("on", k === i); p.setAttribute("aria-selected", k === i); });
      bars.forEach((b, k) => { b.className = k < i ? "done" : k === i ? "on" : ""; });
      bars[i].style.setProperty("--t", T + "ms");
      poster.style.setProperty("--c1", f.c1);
      poster.style.setProperty("--c2", f.c2);
      const img = new Image();
      img.src = `assets/posters/${f.id}.svg`;
      img.alt = "";
      img.className = "out";
      art.appendChild(img);
      requestAnimationFrame(() => requestAnimationFrame(() => img.classList.remove("out")));
      $$("img", art).slice(0, -1).forEach((old) => { old.classList.add("out"); setTimeout(() => old.remove(), 700); });
      num.textContent = `${String(i + 1).padStart(2, "0")} / ${String(F.length).padStart(2, "0")}`;
      name.textContent = tx(f, "name");
      tags.innerHTML = tx(f, "tags").map((t) => `<span>${t}</span>`).join("");
      abs.innerHTML = f.ab.map((a) => `<span class="ab">${svgIcon(a)}</span>`).join("");
      lead.textContent = tx(f, "lead");
      desc.textContent = tx(f, "desc").join(" ");
      [name, tags, abs].forEach(replay);
    };
    const schedule = () => {
      clearTimeout(timer);
      if (!hover && !reduce) timer = setTimeout(() => { show((cur + 1) % F.length); schedule(); }, T);
    };
    grid.addEventListener("click", (e) => {
      const p = e.target.closest(".pick");
      if (p) { show(+p.dataset.i); schedule(); }
    });
    grid.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 5, ArrowUp: -5 }[e.key];
      if (d == null) return;
      e.preventDefault();
      const i = (cur + d + F.length) % F.length;
      show(i);
      picks[i].focus();
    });
    sel.addEventListener("pointerenter", () => { hover = true; sel.classList.add("paused"); clearTimeout(timer); });
    sel.addEventListener("pointerleave", () => {
      hover = false;
      sel.classList.remove("paused");
      bars[cur].className = "";
      void bars[cur].offsetWidth;
      bars[cur].className = "on";
      schedule();
    });
    show(0);
    // start cycling once the screen is actually visible
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { schedule(); io.disconnect(); } }, { threshold: 0.3 }).observe(sel);
  }

  // ---------- launcher screenshot tabs ----------
  const shot = $("#shot");
  if (shot) {
    const cap = $("#shot-cap");
    $$("[data-shot]").forEach((b) => {
      new Image().src = `assets/shot-${b.dataset.shot}.webp`;
      b.addEventListener("click", () => {
        $$("[data-shot]").forEach((x) => x.classList.toggle("on", x === b));
        shot.classList.add("out");
        setTimeout(() => {
          shot.src = `assets/shot-${b.dataset.shot}.webp`;
          cap.textContent = b.dataset.cap;
          shot.classList.remove("out");
        }, 260);
      });
    });
    // the launcher's own menu on the screenshot works like the tabs
    $$("[data-hot]").forEach((h) => (h.onclick = () => {
      const k = h.dataset.hot;
      if (k.startsWith("#")) { const t = $(k); if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); return; }
      const tab = $(`[data-shot="${k}"]`);
      if (tab) { tab.click(); tab.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); }
    }));
    // once in view, the clickable spots pulse briefly so people notice them
    const scr = shot.closest(".screen");
    if (scr && !reduce) new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { io.disconnect(); setTimeout(() => scr.classList.add("hint"), 600); } }, { threshold: 0.5 }).observe(scr);
  }

  // ---------- floating cards lean away from the cursor ----------
  const fl = $$(".fl");
  if (fl.length && !reduce) {
    addEventListener("mousemove", (e) => {
      const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
      fl.forEach((el, i) => {
        const k = (i % 2 ? 26 : 16) * (el.classList.contains("dim") ? 0.6 : 1);
        el.style.setProperty("--px", (-dx * k).toFixed(1) + "px");
        el.style.setProperty("--py", (-dy * k).toFixed(1) + "px");
      });
    }, { passive: true });
  }

  // ---------- the logo's eye looks at the cursor ----------
  $$("svg.eye").forEach((logo) => {
    const pupil = $(".pupil", logo);
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

  // ---------- nav and reveal ----------
  const nav = $(".nav");
  const onScroll = () => nav && nav.classList.toggle("solid", scrollY > 24);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
  $$(".rv").forEach((el) => io.observe(el));
})();
