// Site language: Russian in the HTML, English swapped in from the table below. The choice is
// remembered; on a first visit it follows the browser. Scripts that build text call T(ru, en).
// Also adds the language switch and the GitHub link to the header.
(function () {
  let lang = null;
  try { lang = localStorage.getItem("dlp-lang"); } catch (e) { /* storage blocked */ }
  if (lang !== "ru" && lang !== "en") lang = /^(ru|uk|be|kk)/i.test(navigator.language || "") ? "ru" : "en";
  const EN = lang === "en";
  window.LANG = lang;
  window.T = (ru, en) => (EN ? en : ru);
  window.LOC = EN ? "en-US" : "ru-RU";
  document.documentElement.lang = lang;

  const D = {
    "Deadlock Plus — оверлей, моды и AI-тренер для Deadlock": "Deadlock Plus — overlay, mods and AI coach for Deadlock",
    "Бесплатный помощник для Deadlock: что когда покупать прямо в игре, AI-тренер на Claude, моды с GameBanana в один клик и настройки игры. Не трогает процесс игры.": "A free companion for Deadlock: what to buy and when right in the match, an AI coach on Claude, GameBanana mods in one click and game settings. It doesn't touch the game process.",
    "Оверлей, моды и AI-тренер для Deadlock.": "Overlay, mods and AI coach for Deadlock.",
    "Функции": "Features", "Лаунчер": "Launcher", "Инструменты": "Tools", "Изменения": "Changelog", "Вопросы": "FAQ", "Скачать": "Download",
    "Оверлей": "Overlay", "Моды": "Mods", "AI-тренер": "AI coach",
    "Оверлей для Deadlock: подсказывает, что и когда покупать, ставит моды с GameBanana и разбирает сыгранные матчи. На вопросы об игре отвечает AI-тренер — текстом или голосом.": "An overlay for Deadlock: it tells you what to buy and when, installs mods from GameBanana and reviews the matches you've played. An AI coach answers questions about the game — by text or voice.",
    "Скачать для Windows": "Download for Windows", "Посмотреть лаунчер": "See the launcher", "Бесплатно": "Free",
    "· Windows 10 / 11 · не связан с Valve": "· Windows 10 / 11 · not affiliated with Valve",
    "Лаунчер Deadlock Plus: мод недели и популярные моды": "Deadlock Plus launcher: mod of the week and popular mods",
    "Оверлей|Что покупать|AI-тренер|Разбор матчей|Мета героев|Моды GameBanana|Скины героев": "Overlay|What to buy|AI coach|Match reviews|Hero meta|GameBanana mods|Hero skins",
    "Профили модов|Редактор прицела|Конфликты модов|Настройки игры|История матчей|Голосовой ввод": "Mod profiles|Crosshair editor|Mod conflicts|Game settings|Match history|Voice input",
    "Окно поверх игры в режиме «Без рамки». Открывается клавишей Insert или кликом по значку в углу экрана.": "A window over the game in borderless mode. Open it with Insert or by clicking the icon in the corner of the screen.",
    "Выбери функцию": "Pick a feature",
    "Нажимай на пункты меню на скриншоте или на вкладки.": "Click the menu on the screenshot or the tabs.",
    "Темы": "Themes", "Стиль и цвет меняются в настройках лаунчера. Посмотри, как это выглядит.": "Style and colour are set in the launcher's settings. See how each one looks.",
    "Стекло": "Glass", "Карбон": "Carbon", "Песок": "Sand", "Неон": "Neon", "Синий": "Blue", "Мята": "Mint",
    "Главная: мод недели и популярное с GameBanana": "Home: mod of the week and what's popular on GameBanana", "Главная": "Home",
    "Магазин модов: каталог GameBanana с поиском и категориями": "Mods store: the GameBanana catalogue with search and categories", "Магазин": "Store",
    "Библиотека: порядок, варианты и обновления модов": "Library: order, variants and updates of your mods", "Библиотека": "Library",
    "Скины героев: скин или стандартный вид для каждого героя": "Hero skins: a skin or the default look for each hero", "Скины": "Skins",
    "Конфликты: моды, которые меняют одни и те же файлы": "Conflicts: mods that change the same files", "Конфликты": "Conflicts",
    "Профили: наборы модов и код для друга": "Profiles: mod sets and a code for friends", "Профили": "Profiles",
    "Матчи: история с оценками, местом в матче и графиком побед": "Matches: history with grades, match place and a win chart", "Матчи": "Matches",
    "Разбор матча: что получилось, что исправить, фаза линии": "Match review: what went well, what to fix, the lane phase", "Разбор матча": "Match review",
    "Мета: тир-лист героев и лучшие предметы по рангу": "Meta: a hero tier list and the best items by rank", "Мета": "Meta",
    "Настройки игры: команды autoexec переключателями": "Game settings: autoexec commands as switches", "Настройки игры": "Game settings",
    "Прицел: редактор с предпросмотром и пресетами": "Crosshair: an editor with a preview and presets", "Прицел": "Crosshair",
    "Настройки: стиль, цвет, анимации и эффекты фона": "Settings: style, colour, animations and background effects", "Настройки": "Settings",
    "Что нового: изменения лаунчера и оверлея отдельно": "What's new: launcher and overlay changes kept apart", "Что нового": "What's new",
    "Лаунчер Deadlock Plus": "Deadlock Plus launcher", "Устанавливаю мод": "Installing mod",
    "Главная — мод недели и популярное с GameBanana": "Home — mod of the week and what's popular on GameBanana",
    "Deadlock сейчас": "Deadlock right now", "загружаю…": "loading…", "по данным deadlock-api": "data from deadlock-api",
    "Матчей за 24 часа": "Matches in 24 hours", "Игроков за 24 часа": "Players in 24 hours", "уникальные аккаунты": "unique accounts",
    "Средний матч": "Average match", "Самый сильный герой": "Strongest hero",
    "Deadlock Plus скачали": "Deadlock Plus downloads:", "раз · последняя версия": "· latest version",
    "Работают прямо на сайте, устанавливать ничего не нужно.": "They run right on the site, nothing to install.",
    "Случайный герой": "Random hero", "кто сегодня на линии": "who's laning today",
    "Генератор прицела": "Crosshair generator", "собери и скопируй команды": "build it and copy the commands",
    "Конструктор autoexec": "Autoexec builder", "готовый файл за минуту": "a ready file in a minute",
    "Твой герой": "Your hero", "Крутить": "Spin", "Зазор": "Gap", "Длина": "Length", "Толщина": "Thickness",
    "Видимость усиков": "Pip opacity", "Видимость точки": "Dot opacity", "обводка усиков": "pip outline",
    "Скопировать команды": "Copy commands",
    "Вставь в консоль игры (~). В Deadlock Plus прицел меняется кнопкой и сохраняется в настройках игры.": "Paste them into the game console (~). In Deadlock Plus the crosshair changes with a button and is saved in the game's settings.",
    "Соотношение сторон (шире обзор)": "Aspect ratio (wider view)", "как в игре": "game default", "2 — шире": "2 — wider", "3 — максимум": "3 — maximum",
    "только соло-игроки в подборе": "solo players only in matchmaking", "новая полоса здоровья": "new health bar",
    "Регион подбора (нужен VPN)": "Matchmaking region (needs a VPN)", "Европа": "Europe", "Сев. Америка": "North America", "Азия": "Asia",
    "Юж. Америка": "South America", "Океания": "Oceania", "FPS-лимит": "FPS limit", "без лимита": "no limit",
    "Скачать autoexec.cfg": "Download autoexec.cfg", "Скопировать": "Copy", "Положи файл в папку": "Put the file in",
    ". В Deadlock Plus те же настройки — переключателями.": ". Deadlock Plus has the same settings as switches.",
    "Не нашёл ответ? Напиши в": "Didn't find an answer? Write in", "Issues на GitHub": "GitHub Issues",
    "Это безопасно? Не забанят?": "Is it safe? Can I get banned?",
    "Deadlock Plus не читает память игры и ничего не внедряет в её процесс — это отдельное окно поверх игры. Статистика берётся из публичного deadlock-api. Моды меняют только внешний вид, как разрешает Valve, и видны только тебе.": "Deadlock Plus doesn't read the game's memory or inject anything into its process — it's a separate window over the game. Stats come from the public deadlock-api. Mods only change how things look, as Valve allows, and only you see them.",
    "Почему Windows пишет «Windows защитил ваш компьютер»?": "Why does Windows say “Windows protected your PC”?",
    "Так SmartScreen реагирует на новые программы без платной подписи. Нажми «Подробнее» → «Выполнить в любом случае». Предупреждение не значит, что файл опасен.": "That's how SmartScreen treats new programs without a paid signature. Click “More info” → “Run anyway”. The warning doesn't mean the file is dangerous.",
    "Как поставить моды?": "How do I install mods?",
    "Открой «Магазин модов», нажми «Установить» и запусти игру кнопкой «Играть с модами». Лаунчер сам положит файлы в нужную папку и подключит их.": "Open the Mods store, click Install and start the game with “Play modded”. The launcher puts the files in the right folder and hooks them up.",
    "Как убрать все моды?": "How do I remove all mods?",
    "Нажми «Без модов» в шапке лаунчера — игра запустится чистой. Или «Настройки → Вернуть игру как было»: моды уйдут из папки игры, библиотека останется.": "Click “Without mods” at the top of the launcher — the game starts clean. Or Settings → “Restore the game”: mods leave the game folder, the library stays.",
    "После обновления Deadlock моды пропали": "My mods disappeared after a Deadlock update",
    "Обновление может вернуть файлы игры. Лаунчер это заметит и покажет полосу «Моды перестали загружаться» с кнопкой «Вернуть моды».": "An update can restore the game's files. The launcher notices and shows a “The mods stopped loading” bar with a “Restore mods” button.",
    "Нужен ли ключ для AI-тренера?": "Do I need a key for the AI coach?",
    "Да, свой ключ Claude API — он хранится зашифрованным на твоём компьютере. Всё остальное работает без ключа.": "Yes, your own Claude API key — it's stored encrypted on your PC. Everything else works without a key.",
    "Почему в «Матчах» пусто?": "Why is Matches empty?",
    "Матчи берутся из deadlock-api — там они появляются после игр. Если ты играешь с другого аккаунта Steam, укажи его ID в разделе «Матчи».": "Matches come from deadlock-api, where they appear after you play. If you play on another Steam account, enter its ID in Matches.",
    "Установщик для Windows 10 и 11, около 80 МБ. Новые версии ставятся поверх старой — моды и настройки сохраняются.": "An installer for Windows 10 and 11, about 80 MB. New versions install over the old one — mods and settings are kept.",
    "Установщик": "Installer",
    "Если Windows покажет «Windows защитил ваш компьютер», нажми": "If Windows shows “Windows protected your PC”, click",
    "«Подробнее» → «Выполнить в любом случае»": "“More info” → “Run anyway”",
    ". В игре нужен режим экрана «Без рамки» или «В окне».": ". The game needs “Borderless” or “Windowed” display mode.",
    "Конфиденциальность": "Privacy", "Все версии": "All releases",
    "Deadlock — товарный знак Valve. Deadlock Plus не связан с Valve.": "Deadlock is a trademark of Valve. Deadlock Plus is not affiliated with Valve.",
    "Deadlock Plus — что нового": "Deadlock Plus — changelog",
    "Все изменения Deadlock Plus: лаунчер, моды, оверлей в игре и AI-тренер — по версиям, с поиском.": "Every Deadlock Plus change: launcher, mods, in-game overlay and AI coach — by version, with search.",
    "Что": "What's", "нового": "new", "Поиск по изменениям…": "Search changes…", "Поиск по изменениям": "Search changes", "На главную": "Home",
    "Deadlock Plus — политика конфиденциальности": "Deadlock Plus — privacy policy", "Политика конфиденциальности": "Privacy policy",
    "Обновлено 28 октября 2026 г.": "Updated 28 October 2026", "Что хранится в аккаунте": "What an account stores",
    "Если ты создаёшь аккаунт Deadlock Plus, на сервере аккаунтов (Supabase, регион ЕС) хранятся: адрес почты, ник, выбранный аватар и дата регистрации. Пароль хранится только в виде хеша — его не видит никто, включая нас. Аккаунт необязателен: программой можно пользоваться без него.": "If you create a Deadlock Plus account, the account server (Supabase, EU region) stores your e-mail address, nickname, chosen avatar and sign-up date. The password is stored only as a hash — nobody can see it, including us. An account is optional: you can use the program without one.",
    "Что остаётся на твоём компьютере": "What stays on your PC",
    "Сессия входа и ключ Claude API — в зашифрованном виде, средствами Windows.": "Your sign-in session and Claude API key — encrypted by Windows.",
    "Настройки, библиотека модов, номер аккаунта Steam (берётся из настроек Steam) — в папке программы.": "Settings, the mods library and your Steam account number (read from Steam's settings) — in the program's folder.",
    "Какие сервисы использует программа": "Which services the program uses",
    "— публичная статистика матчей и героев.": "— public match and hero stats.", "— каталог и скачивание модов.": "— the mod catalogue and downloads.",
    "— только если ты сам добавил ключ и задаёшь вопрос AI-тренеру. Отправляется статистика матча и твой вопрос; ники и ID игроков не отправляются.": "— only if you added a key yourself and ask the AI coach. The match stats and your question are sent; player names and IDs are not.",
    "— картинки героев для экрана загрузки, один раз на героя.": "— hero pictures for the loading screen, once per hero.",
    "Deadlock Plus не читает память игры и не вмешивается в её процесс.": "Deadlock Plus doesn't read the game's memory or interfere with its process.",
    "Удаление аккаунта": "Deleting your account", "Напиши в": "Write in", "разделе Issues на GitHub": "GitHub Issues",
    "(без почты и пароля в тексте) — удалим аккаунт и все связанные с ним данные. Выйти из аккаунта можно в Настройках лаунчера, сессия на компьютере при этом удаляется.": "(without your e-mail or password in the text) — we'll delete the account and all data tied to it. You can sign out in the launcher's Settings; that removes the session from your PC.",
    "Прочее": "Other", "Deadlock — товарный знак Valve. Deadlock Plus — независимый проект и не связан с Valve.": "Deadlock is a trademark of Valve. Deadlock Plus is an independent project, not affiliated with Valve.",
    "← На главную": "← Home", "Deadlock Plus — аккаунт": "Deadlock Plus — account",
  };

  const ATTRS = ["placeholder", "aria-label", "title", "alt", "data-cap", "data-tape", "content"];
  function translate(root) {
    if (!EN) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && /^(SCRIPT|STYLE)$/.test(n.parentElement.tagName) ? 2 : 1) });
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    for (const n of nodes) {
      const k = n.nodeValue.replace(/\s+/g, " ").trim();
      if (k && D[k]) n.nodeValue = n.nodeValue.replace(/^(\s*)[\s\S]*?(\s*)$/, (_, a, b) => a + D[k] + b);
    }
    for (const a of ATTRS) root.querySelectorAll(`[${a}]`).forEach((el) => { const v = el.getAttribute(a); if (D[v]) el.setAttribute(a, D[v]); });
    if (D[document.title]) document.title = D[document.title];
  }
  translate(document.documentElement);
  window.translatePage = translate;

  // header: language switch and GitHub
  // drawn flags: Windows shows emoji flags as two letters
  const FLAG = {
    ru: '<svg class="flag" viewBox="0 0 9 6" aria-hidden="true"><rect width="9" height="2" fill="#fff"/><rect y="2" width="9" height="2" fill="#0039a6"/><rect y="4" width="9" height="2" fill="#d52b1e"/></svg>',
    en: '<svg class="flag" viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" stroke-width="3"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/></svg>',
  };
  const GH = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>';
  const pill = document.querySelector(".nav .pill");
  const dl = pill && pill.querySelector(".btn.acc");
  if (pill && dl) {
    const box = document.createElement("div");
    box.className = "nav-x";
    box.innerHTML = `<div class="lang"><button class="lang-b" aria-haspopup="true" aria-label="${T("Язык", "Language")}"><span>${FLAG[lang]}</span>${lang.toUpperCase()}<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="lang-m" hidden>${[["ru", "Русский"], ["en", "English"]].map(([k, l]) => `<button data-lang="${k}" class="${k === lang ? "on" : ""}"><span>${FLAG[k]}</span>${l}</button>`).join("")}</div></div>
      <a class="gh" href="https://github.com/BurdenBoy" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">${GH}</a>`;
    pill.insertBefore(box, dl);
    const b = box.querySelector(".lang-b"), m = box.querySelector(".lang-m");
    b.onclick = (e) => { e.stopPropagation(); m.hidden = !m.hidden; };
    document.addEventListener("click", () => (m.hidden = true));
    box.querySelectorAll("[data-lang]").forEach((x) => (x.onclick = () => {
      try { localStorage.setItem("dlp-lang", x.dataset.lang); } catch (e) { /* storage blocked */ }
      location.reload();
    }));
  }

  // "new version" link in place of the version badge, from the changelog
  const badge = document.querySelector(".hero .badge");
  const log = window.CHANGELOG;
  if (badge && log && log[0]) {
    const r = log[0], g = r.groups[0], it = g && g.items[0];
    const a = document.createElement("a");
    a.className = "badge news";
    a.href = "changelog.html#v" + r.v;
    a.innerHTML = `<i></i><b>${T("Вышла", "Out now:")} ${r.v}</b><span>${it ? (EN ? it[1] : it[0]).split(/[:.—]/)[0].slice(0, 60) : ""}</span><em>→</em>`;
    badge.replaceWith(a);
  }
})();
