// Home page extras: live Deadlock numbers from deadlock-api, the download counter from GitHub
// releases, the "installing a mod" toast on the launcher screenshot, and the free tools (random hero, crosshair generator, autoexec builder).
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const T = window.T || ((ru) => ru), LOC = window.LOC || "ru-RU";
  const pct1 = (x) => (x * 100).toFixed(1).replace(".", LOC === "ru-RU" ? "," : ".");
  const copy = (t, btn) => {
    navigator.clipboard.writeText(t).then(() => { const o = btn.textContent; btn.textContent = T("Скопировано ✓", "Copied ✓"); setTimeout(() => (btn.textContent = o), 1600); }).catch(() => {});
  };

  // ---------- download counter ----------
  fetch("https://api.github.com/repos/BurdenBoy/deadlockplus/releases?per_page=100")
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((rels) => {
      const n = rels.reduce((a, r) => a + (r.assets || []).reduce((b, x) => b + (x.download_count || 0), 0), 0);
      const el = $("#st-dl");
      if (el) el.textContent = n.toLocaleString(LOC);
      const latest = rels.find((r) => !r.draft && !r.prerelease);
      if (latest && $("#st-ver")) $("#st-ver").textContent = latest.tag_name;
    })
    .catch(() => {});
  function countUp(el, n) {
    const from = +String(el.dataset.n || 0);
    el.dataset.n = n;
    if (reduce || !from) { el.textContent = n.toLocaleString(LOC); if (from && from !== n) bump(el); if (!from && !reduce) roll(el, 0, n); return; }
    if (from !== n) { roll(el, from, n); bump(el); }
  }
  function roll(el, a, b) {
    const t0 = performance.now(), D = 1200;
    const step = (t) => { const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(a + (b - a) * e).toLocaleString(LOC); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  const bump = (el) => { el.classList.add("bump"); setTimeout(() => el.classList.remove("bump"), 900); };

  // ---------- Deadlock right now: last 24 hours from deadlock-api, refreshed every minute ----------
  const API = "https://api.deadlock-api.com";
  let HERO_NAMES = null;
  async function live() {
    if (!$("#lv-matches")) return;
    const since = Math.floor(Date.now() / 1000) - 86400;
    try {
      if (!HERO_NAMES) {
        const h = await (await fetch(API + "/v1/assets/heroes?only_active=true")).json();
        HERO_NAMES = Object.fromEntries(h.map((x) => [x.id, x.name]));
      }
      const [g, hs] = await Promise.all([
        fetch(`${API}/v1/analytics/game-stats?min_unix_timestamp=${since}`).then((r) => r.json()),
        fetch(`${API}/v1/analytics/hero-stats?min_unix_timestamp=${since}`).then((r) => r.json()),
      ]);
      const s = (Array.isArray(g) ? g[0] : g) || {};
      countUp($("#lv-matches"), s.total_matches || 0);
      countUp($("#lv-players"), s.total_players || 0);
      const d = s.avg_duration_s || 0;
      $("#lv-dur").textContent = `${Math.floor(d / 60)}:${String(Math.round(d % 60)).padStart(2, "0")}`;
      // best win rate among heroes with enough games, pulled toward 50% for small samples
      const best = hs.filter((r) => HERO_NAMES[r.hero_id] && r.matches >= 300)
        .map((r) => ({ ...r, s: (r.wins + 250) / (r.matches + 500) }))
        .sort((a, b) => b.s - a.s)[0];
      if (best) {
        $("#lv-hero").textContent = HERO_NAMES[best.hero_id];
        $("#lv-hero-s").textContent = `${pct1(best.wins / best.matches)}% ${T("побед", "win rate")}`;
      }
      $("#lv-at").textContent = "";
    } catch (e) {
      $("#lv-at").textContent = T("нет связи", "offline");
    }
  }
  if ($("#lv-matches")) {
    live();
    setInterval(live, 60000);
  }

  // ---------- "installing a mod" toast on the screenshot ----------
  const toast = $(".demo-toast");
  if (toast && !reduce) {
    const MODS = ["Yamato remodel", "Jacket (Billy Overhaul)", "Holliday Remodel", "Toon Ivy (CNS)", "Shiv Refresh"];
    let i = 0;
    const cycle = () => {
      const name = MODS[i++ % MODS.length];
      $(".dt-t", toast).textContent = T("Устанавливаю мод", "Installing mod");
      $(".dt-s", toast).textContent = name;
      toast.className = "demo-toast show";
      requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add("run")));
      setTimeout(() => { toast.classList.add("done"); $(".dt-t", toast).textContent = T("Мод установлен", "Mod installed"); $(".dt-s", toast).textContent = name + T(" — готов к игре", " is ready to play"); }, 2000);
      setTimeout(() => (toast.className = "demo-toast"), 4600);
    };
    new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { io.disconnect(); cycle(); setInterval(cycle, 7000); } }, { threshold: 0.4 }).observe(toast.closest(".screen"));
  }

  // ---------- tools: tabs ----------
  $$("[data-tool]").forEach((b) => (b.onclick = () => {
    $$("[data-tool]").forEach((x) => x.classList.toggle("on", x === b));
    $$("[data-pane]").forEach((p) => (p.hidden = p.dataset.pane !== b.dataset.tool));
  }));

  // ---------- random hero ----------
  const track = $("#roll-track");
  let HEROES = null, spinning = false;
  if (track) {
    fetch("https://api.deadlock-api.com/v1/assets/heroes?only_active=true").then((r) => r.json()).then((h) => {
      HEROES = h.filter((x) => x.player_selectable && !x.disabled).map((x) => ({ name: x.name, img: (x.images || {}).icon_hero_card || (x.images || {}).icon_image_small || "" })).filter((x) => x.img);
      fill(null);
    }).catch(() => { $("#roll-name").textContent = T("нет связи", "offline"); });
  }
  function fill(pick) {
    const list = [];
    for (let i = 0; i < 44; i++) list.push(HEROES[Math.floor(Math.random() * HEROES.length)]);
    if (pick) list[38] = pick;
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.innerHTML = list.map((h) => `<img src="${esc(h.img)}" alt="${esc(h.name)}" loading="lazy">`).join("");
    return list;
  }
  const go = $("#roll-go");
  if (go) go.onclick = () => {
    if (!HEROES || spinning) return;
    spinning = true; go.disabled = true;
    const pick = HEROES[Math.floor(Math.random() * HEROES.length)];
    fill(pick);
    $("#roll-name").textContent = "…";
    // land the picked card (no. 38) under the frame, a little off-centre so it doesn't look staged
    const stage = track.parentElement.clientWidth, card = track.children[38];
    const target = card.offsetLeft + card.offsetWidth / 2 - stage / 2 + (Math.random() * 0.5 - 0.25) * card.offsetWidth;
    track.getBoundingClientRect(); // restart the transition from 0
    track.style.transition = reduce ? "none" : "transform 3.6s cubic-bezier(.12,.75,.14,1)";
    track.style.transform = `translateX(${-target}px)`;
    setTimeout(() => { $("#roll-name").textContent = pick.name; spinning = false; go.disabled = false; go.textContent = T("Ещё раз", "Again"); }, reduce ? 0 : 3700);
  };

  // ---------- counter picks: the hero's win rate against each enemy, last 2 weeks ----------
  // Compared with the hero's own win rate, so a strong hero doesn't look like it beats everyone.
  const ctBox = $("#ct-heroes");
  let CT = null, ctHero = null;
  async function ctLoad() {
    if (CT || !ctBox) return;
    CT = {};
    try {
      const since = Math.floor(Date.now() / 1000) - 14 * 86400;
      const [h, rows] = await Promise.all([
        fetch(API + "/v1/assets/heroes?only_active=true").then((r) => r.json()),
        fetch(`${API}/v1/analytics/hero-counter-stats?min_unix_timestamp=${since}`).then((r) => r.json()),
      ]);
      CT.heroes = h.filter((x) => x.player_selectable && !x.disabled)
        .map((x) => ({ id: x.id, name: x.name, img: (x.images || {}).icon_image_small || (x.images || {}).icon_hero_card || "" }))
        .sort((a, b) => a.name.localeCompare(b.name));
      CT.by = {};
      for (const r of rows) (CT.by[r.hero_id] ||= []).push(r);
      CT.heroes = CT.heroes.filter((x) => CT.by[x.id]);
      ctBox.innerHTML = CT.heroes.map((x) => `<button data-ct="${x.id}" title="${esc(x.name)}" aria-label="${esc(x.name)}"><img src="${esc(x.img)}" alt=""></button>`).join("");
      $$("[data-ct]").forEach((b) => (b.onclick = () => ctShow(+b.dataset.ct)));
      ctShow(CT.heroes[Math.floor(Math.random() * CT.heroes.length)].id);
    } catch (e) {
      CT = null;
      ctBox.innerHTML = `<span class="note-s">${T("Нет связи — попробуй позже.", "Offline — try again later.")}</span>`;
    }
  }
  function ctShow(id) {
    ctHero = id;
    $$("[data-ct]").forEach((b) => b.classList.toggle("on", +b.dataset.ct === id));
    const hero = CT.heroes.find((x) => x.id === id), name = (hid) => (CT.heroes.find((x) => x.id === hid) || {}).name;
    const rows = CT.by[id].filter((r) => r.matches_played >= 400 && name(r.enemy_hero_id));
    const base = rows.reduce((a, r) => a + r.wins, 0) / Math.max(1, rows.reduce((a, r) => a + r.matches_played, 0));
    const vs = rows.map((r) => ({ id: r.enemy_hero_id, wr: r.wins / r.matches_played, d: r.wins / r.matches_played - base })).sort((a, b) => a.d - b.d);
    const max = Math.max(0.01, ...vs.map((v) => Math.abs(v.d)));
    const img = (hid) => (CT.heroes.find((x) => x.id === hid) || {}).img;
    const sign = (d) => (d > 0 ? "+" : "−") + pct1(Math.abs(d));
    const list = (arr) => arr.map((v) => `<div class="ct-row"><img src="${esc(img(v.id))}" alt=""><b>${esc(name(v.id))}</b><span class="ct-bar"><i style="width:${(Math.abs(v.d) / max * 100).toFixed(0)}%"></i></span><em title="${T("побед против него", "win rate against")}: ${pct1(v.wr)}%">${sign(v.d)}%</em></div>`).join("");
    $("#ct-out").innerHTML = `<div class="ct-head"><img src="${esc(hero.img)}" alt=""><div><small>${T("Контрпики для", "Counters for")}</small><b>${esc(hero.name)}</b><span>${T("побед в среднем", "average win rate")} ${pct1(base)}%</span></div></div>
      <div class="ct-cols"><div class="bad"><h4>${T("Тяжело против", "Struggles against")}</h4>${list(vs.slice(0, 6))}</div>
      <div class="good"><h4>${T("Легко против", "Does well against")}</h4>${list(vs.slice(-6).reverse())}</div></div>`;
  }
  const ctTab = $('[data-tool="ct"]');
  if (ctTab) ctTab.addEventListener("click", ctLoad);

  // ---------- crosshair generator ----------
  const X = { gap: 0, height: 16, width: 4, pip: 100, dot: 100, border: false, color: "#ffffff" };
  const SW = ["#ffffff", "#46ff78", "#00e6ff", "#ffe14d", "#ff69b4", "#ff4d4d", "#a77bff"];
  function xsvg() {
    const S = 3, C = 150, inner = Math.max(0, 11 + X.gap) * S, len = X.height * S, w = X.width * S, op = X.pip / 100;
    const pip = (x, y, pw, ph) => `${X.border ? `<rect x="${x - 2}" y="${y - 2}" width="${pw + 4}" height="${ph + 4}" fill="#000" opacity="${op * 0.85}"/>` : ""}<rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="${X.color}" opacity="${op}"/>`;
    return `<svg viewBox="0 0 300 300">${pip(C - w / 2, C - inner - len, w, len)}${pip(C - w / 2, C + inner, w, len)}${pip(C - inner - len, C - w / 2, len, w)}${pip(C + inner, C - w / 2, len, w)}
      <rect x="${C - 6}" y="${C - 6}" width="12" height="12" fill="${X.color}" opacity="${X.dot / 100}"/></svg>`;
  }
  function xcmds() {
    const r = parseInt(X.color.slice(1, 3), 16), g = parseInt(X.color.slice(3, 5), 16), b = parseInt(X.color.slice(5, 7), 16);
    return [`citadel_crosshair_color_r ${r}`, `citadel_crosshair_color_g ${g}`, `citadel_crosshair_color_b ${b}`, `citadel_crosshair_pip_gap ${X.gap}`, `citadel_crosshair_pip_height ${X.height}`,
      `citadel_crosshair_pip_width ${X.width}`, `citadel_crosshair_pip_opacity ${X.pip / 100}`, `citadel_crosshair_dot_opacity ${X.dot / 100}`, `citadel_crosshair_pip_outline_border ${X.border ? 1 : 0}`].join("; ");
  }
  function xdraw() {
    $("#xh-view").innerHTML = xsvg();
    $("#xh-code").textContent = xcmds();
    $$("[data-v]").forEach((b) => (b.textContent = X[b.dataset.v] + (/pip|dot/.test(b.dataset.v) ? "%" : "")));
    $$("#xh-sw button").forEach((b) => b.classList.toggle("on", b.dataset.c === X.color));
  }
  if ($("#xh-view")) {
    $("#xh-sw").innerHTML = SW.map((c) => `<button data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join("");
    $$("#xh-sw button").forEach((b) => (b.onclick = () => { X.color = b.dataset.c; xdraw(); }));
    $$("[data-x]").forEach((i) => (i.oninput = () => { X[i.dataset.x] = i.type === "checkbox" ? i.checked : +i.value; xdraw(); }));
    $("#xh-copy").onclick = (e) => copy(xcmds(), e.currentTarget);
    xdraw();
  }

  // ---------- autoexec builder ----------
  function cfgText() {
    const v = (k) => { const el = $(`[data-c="${k}"]`); return el.type === "checkbox" ? el.checked : el.value.trim(); };
    const lines = [T("// autoexec.cfg — собрано на burdenboy.github.io/deadlockplus", "// autoexec.cfg — built at burdenboy.github.io/deadlockplus")];
    if (v("aspect")) lines.push(`r_aspectratio "${v("aspect")}"`);
    if (v("solo")) lines.push("mm_prefer_solo_only 1");
    if (v("hp")) lines.push("citadel_unit_status_use_new true");
    if (v("region") !== "") lines.push(`citadel_region_override ${v("region")}`);
    if (v("fps") && +v("fps") > 0) lines.push(`fps_max ${Math.min(999, Math.round(+v("fps")))}`);
    if (lines.length === 1) lines.push(T("// выбери настройки слева", "// pick settings on the left"));
    return lines.join("\n") + "\n";
  }
  function cfgDraw() { $("#cfg-code").innerHTML = esc(cfgText()).replace(/^(\/\/.*)$/gm, '<span class="c">$1</span>'); }
  if ($("#cfg-code")) {
    $$("[data-c]").forEach((i) => (i.oninput = i.onchange = cfgDraw));
    $("#cfg-copy").onclick = (e) => copy(cfgText(), e.currentTarget);
    $("#cfg-dl").onclick = () => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([cfgText()], { type: "text/plain" }));
      a.download = "autoexec.cfg";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    cfgDraw();
  }
})();
