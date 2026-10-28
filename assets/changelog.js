// What changed in each version, newest first. Shown once after an update ("Что нового") and on demand.
// Every line is [Russian, English].
window.CHANGELOG = [
  {
    v: "1.4.3",
    date: "2026-10-28",
    groups: [
      {
        kind: "fix",
        app: "launcher",
        title: ["Исправлено", "Fixed"],
        items: [
          ["Скины героев: «Стандартный вид» показывает героя целиком, а не обрезанную голову", "Hero skins: «Default look» shows the whole hero instead of a cropped head"],
          ["Меню слева стало чище — убрана подпись внизу", "The side menu is cleaner — the note at the bottom is gone"],
        ],
      },
    ],
  },
  {
    v: "1.4.2",
    date: "2026-10-28",
    groups: [
      {
        kind: "new",
        app: "launcher",
        title: ["Мета", "Meta"],
        items: [
          ["Раздел «Мета»: тир-лист героев по рангу и периоду — процент побед, частота выбора, K/D/A", "A Meta page: a hero tier list by rank and period — win rate, pick rate, K/D/A"],
          ["Нажми на героя — лучшие предметы по каждому уровню с процентом побед и временем покупки", "Click a hero for the best items per tier with win rate and buy time"],
        ],
      },
      {
        kind: "fix",
        app: "launcher",
        title: ["Исправлено", "Fixed"],
        items: [
          ["Прицел: в широком окне предпросмотр больше не растягивается на всю страницу, герой на фоне чёткий", "Crosshair: in a wide window the preview no longer stretches across the page, and the hero behind it is sharp"],
        ],
      },
    ],
  },
  {
    v: "1.4.1",
    date: "2026-10-28",
    groups: [
      {
        kind: "new",
        app: "overlay",
        title: ["Панель в игре", "In-game panel"],
        items: [
          ["Блоки панели можно переставлять как угодно: перетащи их в меню оверлея: Настройки → «Боковая панель в игре»", "Panel blocks can be arranged any way you like: drag them in the overlay menu: Settings → “In-game side panel”"],
        ],
      },
      {
        kind: "improved",
        app: "both",
        title: ["Что нового", "What's new"],
        items: [
          ["Отдельные списки изменений для лаунчера и для оверлея в игре", "Separate change lists for the launcher and the in-game overlay"],
        ],
      },
      {
        kind: "fix",
        app: "launcher",
        title: ["Исправлено", "Fixed"],
        items: [
          ["Постер героя в широком окне больше не обрезает голову", "The hero poster in a wide window no longer cuts off the head"],
          ["Место в матче «10-е» и «12-е» больше не переносится на две строки", "Match places like 10th and 12th no longer wrap onto two lines"],
        ],
      },
    ],
  },
  {
    v: "1.4.0",
    date: "2026-10-28",
    groups: [
      {
        kind: "new",
        app: "launcher",
        title: ["Моды", "Mods"],
        items: [
          ["Профили модов: разные наборы, переключение в шапке, код профиля для друга и бэкап в аккаунт", "Mod profiles: separate setups, switching in the title bar, a profile code for friends and an account backup"],
          ["Скины героев: для каждого героя выбери скин или стандартный вид", "Hero skins: pick a skin or the default look for each hero"],
          ["Конфликты: какие включённые моды меняют одни и те же файлы и какой из них работает в игре", "Conflicts: which enabled mods change the same files, and which one the game uses"],
          ["Если обновление игры отключило моды, лаунчер скажет об этом и вернёт их одной кнопкой", "If a game update turns the mods off, the launcher says so and brings them back with one button"],
        ],
      },
      {
        kind: "new",
        app: "launcher",
        title: ["Игра", "Game"],
        items: [
          ["Редактор прицела с живым предпросмотром и пресетами; старый прицел можно вернуть", "A crosshair editor with a live preview and presets; the old crosshair can be restored"],
        ],
      },
      {
        kind: "improved",
        app: "launcher",
        title: ["Настройки игры", "Game settings"],
        items: [
          ["Параметр запуска +exec autoexec больше не обязателен — Deadlock выполняет autoexec.cfg сам", "The +exec autoexec launch option is no longer required — Deadlock runs autoexec.cfg on its own"],
        ],
      },
    ],
  },
  {
    v: "1.3.1",
    date: "2026-10-28",
    groups: [
      {
        kind: "improved",
        app: "launcher",
        title: ["Оформление", "Look and feel"],
        items: [
          ["В широком окне справа на «Настройках игры» и «Настройках» — постер со случайным героем, как на заставке", "In a wide window, Game settings and Settings show a poster with a random hero on the right, like the loading screen"],
          ["Кнопка на постере меняет героя", "A button on the poster switches the hero"],
        ],
      },
    ],
  },
  {
    v: "1.3.0",
    date: "2026-10-28",
    groups: [
      {
        kind: "new",
        app: "launcher",
        title: ["Матчи и разбор после игры", "Matches and post-game review"],
        items: [
          ["Раздел «Матчи»: история игр с рангом, героем, K/D/A, душами, местом в матче, оценкой от A+ до D- и изменением рейтинга", "A Matches page: your games with rank, hero, K/D/A, souls, place in the match, an A+ to D- grade and the rating change"],
          ["Оценка сравнивает матч с игроками на том же герое твоего ранга", "The grade compares the match with players on the same hero at your rank"],
          ["График побед и поражений, лучшие герои и паутинка стиля игры", "A win/loss chart, top heroes and a play-style radar"],
          ["Разбор матча: что получилось и что исправить, фаза линии, души по ходу игры, предметы, смерти и таблица матча", "Match review: what went well and what to fix, the lane phase, souls over time, items, deaths and the scoreboard"],
          ["Кнопка «Разобрать матч»: отзыв AI-тренера по цифрам игры", "A Review this match button: the AI coach's take on the game's numbers"],
        ],
      },
    ],
  },
  {
    v: "1.2.0",
    date: "2026-10-28",
    groups: [
      {
        kind: "new",
        app: "launcher",
        title: ["Лаунчер и моды", "Launcher and mods"],
        items: [
          ["Лаунчер: большая кнопка «Играть с модами» или «Без модов» — моды ставятся и игра запускается через Steam", "Launcher: a big “Play modded” or “Play without mods” button — mods go in and Steam starts the game"],
          ["Магазин модов из GameBanana: поиск, категории, сортировка, превью и установка в один клик", "Mod store from GameBanana: search, categories, sorting, previews and one-click install"],
          ["Библиотека: включение и выключение, порядок загрузки, варианты внутри мода, проверка обновлений", "Library: on/off toggles, load order, variants inside a mod, update checks"],
          ["Значок в игре показывает, сколько модов применено, а подсказка — какие", "The in-game icon shows how many mods are applied, and its tooltip lists them"],
        ],
      },
      {
        kind: "new",
        app: "overlay",
        title: ["AI-тренер в игре", "AI coach in game"],
        items: [
          ["AI-окно над способностями: ответы Claude видны прямо в матче", "An AI window above the abilities: Claude's answers right in the match"],
          ["Вопрос текстом (Ctrl+Shift+Q) или голосом (Ctrl+Shift+V, голосовой ввод Windows)", "Ask by typing (Ctrl+Shift+Q) or by voice (Ctrl+Shift+V, Windows voice typing)"],
          ["«Разбор пиков»: шансы, главная угроза, что собирать — по винрейтам всех героев", "“Draft review”: chances, the main threat, what to build — from every hero's win rates"],
        ],
      },
      {
        kind: "new",
        app: "both",
        title: ["Оформление", "Look and feel"],
        items: [
          ["Стили: Стекло, Карбон, Песок, Неон", "Styles: Glass, Carbon, Sand, Neon"],
          ["Анимации разделов, карточек и кнопок; уровень — полные, мягкие или выключены", "Animations for views, cards and buttons; full, gentle or off"],
          ["Это окно «Что нового» после каждого обновления", "This “What's new” window after every update"],
          ["Экран загрузки лаунчера — постер со случайным героем Deadlock и названием", "Launcher loading screen — a poster with a random Deadlock hero and the title", "launcher"],
          ["Эффекты фона на выбор: Поток ∞, Кольцо, Пепел, Искры, Созвездие; плотность частиц", "Background effects to choose from: Flow ∞, Ring, Ash, Embers, Web; particle density", "launcher"],
          ["Масштаб интерфейса: «Авто» под Full HD, 2K и 4K или свой", "Interface scale: “Auto” for Full HD, 2K and 4K, or your own"],
          ["Главная в стиле магазина: мод недели, карусели популярного и свежего", "Store-style dashboard: mod of the week, carousels of popular and fresh mods", "launcher"],
          ["Подсказки при наведении на пункты настроек", "Hover tips on settings"],
        ],
      },
      {
        kind: "new",
        app: "launcher",
        title: ["Аккаунты", "Accounts"],
        items: [
          ["Регистрация и вход по почте и паролю прямо в лаунчере, с подтверждением почты и восстановлением пароля", "Sign-up and sign-in with e-mail and password in the launcher, with e-mail confirmation and password reset"],
          ["После входа заставка встречает по нику; сессия запоминается", "After sign-in the intro greets you by name; the session is remembered"],
          ["Профиль в настройках: ник, аватар-портрет героя, выход из аккаунта", "Profile in settings: nickname, a hero-portrait avatar, sign out"],
        ],
      },
      {
        kind: "new",
        app: "launcher",
        title: ["Настройки игры", "Game settings"],
        items: [
          ["Соотношение сторон (r_aspectratio), соло-подбор, новая полоса HP, регион подбора и свои команды — в autoexec.cfg", "Aspect ratio (r_aspectratio), solo queue, new HP bar, matchmaking region and your own commands — in autoexec.cfg"],
          ["Кнопка, которая сама добавляет +exec autoexec в параметры запуска Steam", "A button that adds +exec autoexec to Steam's launch options for you"],
        ],
      },
      {
        kind: "fix",
        app: "both",
        title: ["Исправлено", "Fixed"],
        items: [
          ["После вопроса в AI-окне фокус возвращается ровно в игру", "After asking in the AI window, focus goes straight back to the game", "overlay"],
          ["Окно AI не пересоздаёт поле ввода во время голосового ввода", "The AI window no longer rebuilds the input field mid-dictation", "overlay"],
          ["Свечение значка в игре больше не обрезается", "The in-game icon's glow is no longer cut off", "overlay"],
          ["Tab в меню оверлея больше не прыгает по кнопкам", "Tab no longer jumps between buttons in the overlay menu", "overlay"],
          ["Крестик меню оверлея прячет меню, а не закрывает всё приложение; выход — в настройках", "The overlay menu's cross hides the menu instead of quitting; Quit is in settings", "overlay"],
          ["Лайки и просмотры в карточках модов читаются, карточки больше не растягиваются", "Likes and views on mod cards are readable, and cards no longer stretch", "launcher"],
          ["Второй запуск больше не создаёт вторую копию (и второй значок) — он открывает уже запущенную", "A second launch no longer starts a second copy (and a second icon) — it opens the running one"],
          ["Аватар берётся из Steam, если deadlock-api не знает профиль", "The avatar comes from Steam when deadlock-api doesn't know the profile"],
          ["В настройках игры — статус каждой команды: включено, выключено, не сохранено", "Game settings show each command's state: on, off, not saved", "launcher"],
          ["Бинды (Insert и другие) работают поверх игры: Deadlock глушил обычные горячие клавиши", "Binds (Insert and others) work over the game: Deadlock was muting ordinary hotkeys", "overlay"],
          ["Предупреждение и кнопка перезапуска, если Steam и игра запущены от администратора", "A warning and a restart button when Steam and the game run as administrator"],
          ["Значок в игре снова перетаскивается и открывает меню, даже если меню его перекрывает", "The in-game icon drags again and opens the menu even when the menu covers it", "overlay"],
          ["Лаунчер открывается в фокусе и подгоняет масштаб под ширину окна", "The launcher opens focused and fits its zoom to the window width", "launcher"],
          ["Глаз в логотипе лаунчера следит за курсором", "The launcher logo's eye follows the cursor", "launcher"],
          ["Заставка — только герой и крупное название, держится дольше", "The intro shows just the hero and a big title, and stays longer", "launcher"],
          ["Карточки модов наклоняются за курсором, картинка приближается", "Mod cards tilt toward the cursor and their image zooms in", "launcher"],
          ["Автомасштаб мягче: 2K и 4K без лишнего увеличения", "Gentler auto scale: no oversized UI on 2K and 4K"],
          ["Меню оверлея открывается одним кадром — без мигания «как будто дважды»", "The overlay menu opens in a single frame — no more flicker that looked like a double open", "overlay"],
          ["Значок в игре нельзя утащить за край экрана", "The in-game icon can't be dragged off the screen", "overlay"],
        ],
      },
    ],
  },
  {
    v: "1.1.0",
    groups: [
      {
        kind: "new",
        app: "overlay",
        title: ["Новое", "New"],
        items: [
          ["Название Deadlock Plus, свой значок и заставка", "The Deadlock Plus name, its own icon and splash screen"],
          ["Значок в игре: клик открывает меню, его можно перетащить", "In-game icon: click opens the menu, drag moves it"],
          ["Английский язык интерфейса", "English interface"],
          ["Топ игроков, трекер друзей, патчи с усилениями и ослаблениями", "Top players, friend tracker, patches with buffs and nerfs"],
          ["Сборки с лучшим винрейтом и «Следить в игре»", "Best win-rate builds and “Follow in game”"],
        ],
      },
      {
        kind: "fix",
        app: "overlay",
        title: ["Исправлено", "Fixed"],
        items: [["Insert иногда не открывал меню поверх игры", "Insert sometimes didn't open the menu over the game"]],
      },
    ],
  },
  {
    v: "1.0.0",
    groups: [
      {
        kind: "new",
        app: "overlay",
        title: ["Первый выпуск", "First release"],
        items: [
          ["Оверлей поверх игры с авто-матчем и шансом на победу", "Overlay over the game with auto-match and win chance"],
          ["Боковая панель: души, что когда покупать, прокачка, линия или лес", "Side panel: souls, what to buy when, ability order, lane or jungle"],
          ["AI-разбор матча через Claude", "Match review by Claude"],
        ],
      },
    ],
  },
];
