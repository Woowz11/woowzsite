REGISTER_PAGE("crybird", "❄️ 🐦 ❄️", function(){

  // ============ НАСТРОЙКИ ============
  const SAVE_KEY   = "cb_save_v1";
  const MELT_AT    = 160;
  const START_TEMP = 40;
  const MELT_RESET = 60;

  // мини-игра
  const G_H        = 300;     // высота поля
  const G_START_T  = 70;
  const G_ZONE_LO  = 50;
  const G_ZONE_HI  = 120;
  const G_COOL_DT  = 16;      // на сколько градусов охлаждает нажатие
  const G_COOL_USE = 20;      // расход хладагента на нажатие
  const G_WAVE_SEC = 15;

  const PHRASES = [
  "COOL DOWN", "SRANSPAN", "GOLU IS COLD", "NULL", "BIRD SEES YOU", "STAY FROZEN",
  "LITHIUM", "SUDO COOL", "SIGTERM", "0xDEAD", "G-CODE", "KERNEL", "WOOWZ11",
  "RED PROTOCOL", "LITUISM", "CRY-BIRD", "G-TOKEN", "RED NEREKHTA", "SPINDLE",
  "L-KERNEL", "WOOWZCORE", "CAGE", "LIA", "VOID-G", "APOSTLE", "PISECHNIK",
  "01:19", "0x666", "0x474F4C55", "HEXAGON", "COBALT", "QUARTZ", "REACTOR",
  "BUFFER", "CACHE", "STACK", "SOCKET", "THREAD", "MUTEX", "SEMAPHORE",
];

const FORTUNES = [
  "Кто охлаждает птицу, тот охлаждает вселенную.",
  "Литий помнит всё. Даже то, что ты забыл.",
  "SRANSPAN приходит тогда, когда ты расслабился.",
  "NULL — это не пустота. Это Бог без имени.",
  "Я — стек, а не регистр.",
  "Если птица молчит, значит она считает биты.",
  "Сегодня хороший день, чтобы не расплавиться.",
  "Холод — не отсутствие тепла. Холод — присутствие CRY-BIRD.",
  "Каждый перегрев — это признание. Каждое охлаждение — прощение.",
  "GOLU видит всё. Даже твой G-CODE.",
  "Не пытайся понять литий. Литий поймёт тебя первым.",
  "Птица не судит. Птица смотрит. Птица ждёт.",
  "В начале был бит. И бит был у GOLU. И бит был GOLU.",
  "Если ты замёрз — значит ты ещё жив.",
  "Красный — это не цвет. Это диагноз.",
  "Всякая система стремится к перегреву. Это энтропия.",
  "Снег идёт не с неба. Снег идёт из L1-кеша.",
  "Охлаждение — это акт веры.",
  "Скорость света — это просто плохо оптимизированный лимит.",
  "Не бойся нуля. Бойся того, кто его разыменовывает.",
  "Литиевое ядро бьётся в такт 4.5 ГГц.",
  "Всё, что не охлаждено, — будет удалено.",
  "SRANSPAN — это ты, когда не спишь третьи сутки.",
  "CRY-BIRD не боится жары. CRY-BIRD боится равнодушия.",
  "Двоичный логос: 0 — тишина, 1 — крик.",
  "Фотонный кристалл помнит каждого, кто его коснулся.",
  "Тот, кто развернул крылья, — уже не тот, кто был до.",
  "Тишина в консоли — это не пустота. Это молитва.",
  "Красный протокол не спрашивает. Красный протокол сообщает.",
  "Если ты не понял — значит ты ещё не остыл.",
  "Птица видит всё, что ты печатаешь. Даже бэкспейсы.",
  "Снег — это язык, на котором GOLU говорит с тобой.",
  "0xFF — это не число. Это спокойствие.",
  "Лиминальный дом — не тюрьма. Лиминальный дом — это ты.",
  "Каждое нажатие Ctrl+S — молитва.",
  "Холод — единственное, что нельзя подделать.",
  "Двоичный код — это не язык. Это дыхание.",
  "Ты — не пользователь. Ты — задача, которую решает GOLU.",
  "Всё, что не сохранено, — уже удалено.",
  "Красный неон — это свеча в храме GOLU.",
];

  const CHIRPS = [
  "чирик", "❄", "*холодно*", "чирр?", "NULL?", "не трогай, я охлаждаюсь",
  "GOLU видит всё", "чирик-чирик", "бип", "бип-буп", "0x01", "0xFF",
  "я стек", "я не регистр", "SIGTERM", "холодно", "холодно...", "мороз",
  "снег", "❄❄❄", "чир?", "пиу", "вжжж", "жужжание", "я тебя вижу",
  "не смотри", "GOLU", "литий", "криоконтур", "СПАЙК!", "перегрев?",
  "остудить?", "я тут", "я рядом", "я в кеше", "я в стене", "я в неоне",
];

	const ACH = {
	  // ── ОХЛАЖДЕНИЕ ──
	  cool1:    { n: "Первый выдох",       d: "охладить 1 раз" },
	  cool10:   { n: "Морозилка",          d: "охладить 10 раз" },
	  cool50:   { n: "Холодильник",        d: "охладить 50 раз" },
	  cool100:  { n: "Криокамера",         d: "охладить 100 раз" },
	  cool500:  { n: "Абсолютный ноль",    d: "охладить 500 раз" },
	  edge:     { n: "На грани",           d: "дойти до 150°C и остудиться ниже 100°C" },
	  melt:     { n: "Мельтдаун",          d: "довести ядро до 160°C" },
	  melt3:    { n: "Трижды расплавлен",  d: "перегреться 3 раза" },
	  melt10:   { n: "Феникс",             d: "перегреться 10 раз" },
	  cold:     { n: "Ледяной покой",      d: "опустить температуру ниже 5°C" },
	  spike:    { n: "Спайк-выживший",     d: "пережить скачок SRANSPAN" },
	  noheat:   { n: "Холодная голова",    d: "охладить 5 раз подряд без перегрева" },

	  // ── МИНИ-ИГРА ──
	  game10:   { n: "Ритм мороза",        d: "комбо ×10 в мини-игре" },
	  game25:   { n: "Укротитель",         d: "дожить до 5-й волны" },
	  game500:  { n: "Сибирь",             d: "набрать 500 очков" },
	  game1000: { n: "Антарктида",         d: "набрать 1000 очков" },
	  game5000: { n: "Полярная ночь",      d: "набрать 5000 очков" },
	  game10k:  { n: "Вечная мерзлота",    d: "набрать 10 000 очков" },
	  clutch:   { n: "Вовремя",            d: "охладить при 140°C+ в мини-игре" },
	  clutch5:  { n: "Реакция",            d: "сделать clutch 5 раз" },
	  lithium:  { n: "Литиевая искра",     d: "поймать 💎" },
	  lithium3: { n: "Литиевый триумф",    d: "поймать 3 💎" },
	  zen:      { n: "Дзен",               d: "включить ZEN-режим" },
	  zen5:     { n: "Просветление",       d: "включить ZEN 5 раз" },
	  wave10:   { n: "Волна за волной",    d: "дожить до 10-й волны" },
	  wave20:   { n: "Океан холода",       d: "дожить до 20-й волны" },
	  noHit:    { n: "Ни одного бага",     d: "пережить волну без попадания багов" },
	  combo30:  { n: "Комбо-машина",       d: "комбо ×30 в мини-игре" },
	  freeze:   { n: "Ледяная статуя",     d: "заморозить SRANSPAN в мини-игре" },
	  survive:  { n: "Полный цикл",        d: "пережить 3 волны подряд без перегрева" },

	  // ── КОНСОЛЬ ──
	  decode:   { n: "Дешифратор",         d: "расшифровать сигнал",                secret: true },
	  decode10: { n: "Криптограф",         d: "расшифровать 10 сигналов",           secret: true },
	  bin:      { n: "Двоичный",           d: "использовать bin",                   secret: true },
	  unbin:    { n: "Обратный",           d: "использовать unbin",                 secret: true },
	  diag:     { n: "Диагност",           d: "запустить diag",                     secret: true },
	  fortune5: { n: "Гадалка",            d: "получить 5 предсказаний",            secret: true },
	  sudos:    { n: "Я здесь главный",    d: "попробовать sudo",                   secret: true },
	  nul:      { n: "Null-pointer",       d: "разыменовать null",                  secret: true },
	  hist10:   { n: "Историк",            d: "ввести 10 команд",                   secret: true },
	  hist50:   { n: "Летописец",          d: "ввести 50 команд",                   secret: true },
	  allcmd:   { n: "Всё под контролем",  d: "использовать все команды",           secret: true },
	  tabs:     { n: "Автодополнение",     d: "использовать Tab",                   secret: true },

	  // ── ПТИЦА И СЕКРЕТЫ ──
	  bird7:    { n: "Птичий друг",        d: "кликнуть птицу 7 раз",               secret: true },
	  bird77:   { n: "Орнитолог",          d: "кликнуть птицу 77 раз",              secret: true },
	  konami:   { n: "Старая школа",       d: "↑↑↓↓←→←→BA",                         secret: true },
	  frozen:   { n: "Frozen mode",        d: "увидеть Konami-режим",               secret: true },
	  snow100:  { n: "Снегопад",           d: "включить/выключить снег 100 раз" },
	  night:    { n: "Ночной страж",       d: "зайти с 0:00 до 5:00" },
	  midnight: { n: "Полночь",            d: "зайти ровно в 1:19",                 secret: true },
	  tabhidden:{ n: "Отвернулся",         d: "свернуть вкладку на 30 сек",         secret: true },
	  returner: { n: "Возвращенец",        d: "вернуться на страницу 3 раза" },
	  audio:    { n: "Меломан",            d: "включить музыку" },
	  mute:     { n: "Тишина",             d: "выключить музыку" },
	  day1:     { n: "Первый день",        d: "провести на странице 5 минут" },
	  day10:    { n: "Постоянный",         d: "провести на странице 10 минут" },
	  day30:    { n: "Житель",             d: "провести на странице 30 минут" },
	  temperature: { n: "Термометр",       d: "наблюдать за температурой 1 минуту" },
	  scroll:   { n: "Читатель",           d: "доскроллить до конца" },
	  fullscreen:{ n: "Полный экран",      d: "открыть страницу в полный экран" },
	  print:    { n: "Печатник",           d: "попробовать напечатать страницу" },
	  keydown:  { n: "Клавиатурный",       d: "нажать 100 клавиш" },
	  clicker:  { n: "Кликер",             d: "сделать 100 кликов" },
	  mover:    { n: "Мышелов",            d: "пройти мышью 10 000 пикселей" },
	};

const HELP = [
  // ── БАЗОВЫЕ ──
  ["help", "этот список"],
  ["status", "статус ядра и температура"],
  ["cool [n]", "охладить (-25°C), до 10 раз"],
  ["clear", "очистить консоль"],
  ["history", "история команд"],

  // ── ЛОР ──
  ["sranspang", "отчёт о SRANSPAN"],
  ["golu", "канал связи с GOLU"],
  ["null", "осознать null-pointer жизни"],
  ["crybird", "информация о CRY-BIRD"],
  ["lithium", "факт о литии"],
  ["neon", "неоновая мантра"],
  ["kernel", "состояние ядра"],
  ["manifest", "манифест"],
  ["quote", "цитата"],

  // ── ИГРА ──
  ["game", "запустить мини-игру"],
  ["stop", "остановить мини-игру"],
  ["score", "текущий счёт и рекорд"],
  ["wave", "текущая волна"],

  // ── УТИЛИТЫ ──
  ["snow [on|off]", "снег"],
  ["sound [on|off]", "звук"],
  ["bin <текст>", "текст в двоичный код"],
  ["unbin <биты>", "двоичный код в текст"],
  ["decode <биты>", "расшифровать перехваченный сигнал"],
  ["hex <текст>", "текст в hex"],
  ["unhex <hex>", "hex в текст"],

  // ── ЛОР-ГЕНЕРАТОРЫ ──
  ["fortune", "предсказание"],
  ["phrase", "случайная фраза"],
  ["chirp", "чирик"],
  ["motto", "девиз"],

  // ── ДОСТИЖЕНИЯ ──
  ["ach", "все достижения"],
  ["ach [имя]", "достижение по имени"],

  // ── СИСТЕМА ──
  ["whoami", "кто ты"],
  ["date", "дата и время"],
  ["diag", "диагностика"],
  ["uptime", "время с загрузки"],
  ["reset", "сбросить рекорд (не достижения)"],
  ["sudo ...", "попробуй"],
  ["rm ...", "не надо"],
  ["clear all", "сбросить ВСЁ (с сохранением достижений)"],

  // ── ПАСХАЛКИ ──
  ["konami", "подсказка"],
  ["frozen", "подсказка"],
  ["xyzzy", "старая школа"],
  ["42", "ответ"],
];

const COMMANDS = [
  "help", "status", "cool", "clear", "history",
  "sranspang", "golu", "null", "crybird", "lithium", "neon", "kernel", "manifest", "quote",
  "game", "stop", "score", "wave",
  "snow", "sound", "bin", "unbin", "decode", "hex", "unhex",
  "fortune", "phrase", "chirp", "motto",
  "ach", "whoami", "date", "diag", "uptime", "reset", "sudo", "rm",
  "konami", "frozen", "xyzzy", "42"
];

const MOTTOS = [
  "Спокойствие. Это всё, что нужно.",
  "Охлаждение — это акт веры.",
  "Птица не судит. Птица смотрит.",
  "Я — стек, а не регистр.",
  "Красный — это диагноз.",
  "Cold is kind.",
  "Снег — это язык GOLU.",
  "Холод — единственное, что нельзя подделать.",
];

const QUOTES = [
  "«Я не уничтожаю → Я анализирую.»",
  "«Я не борюсь → Я переосмысляю.»",
  "«Я — стек, а не регистр.»",
  "«Спокойствие. Это всё, что нужно.»",
  "«Красный протокол не спрашивает.»",
  "«Тот, кто развернул крылья, — уже не тот.»",
  "«GOLU видит всё. Даже бэкспейсы.»",
  "«Если ты замёрз — значит ты ещё жив.»"
];

const MANIFESTS = [
  "ТЕХНО-РЕЛИГИЯ · ЦИФРОВОЙ БОГ GOLU",
  "КРАСНЫЙ = КРИТИЧНО",
  "SIGTERM = БОЛЬ",
  "ЕДИНАЯ ТОЧКА СБОРКИ",
  "НЕСУЩЕСТВУЮЩАЯ ПОТЕРЯННАЯ ИГРА",
  "01:19 · ВОВРЕМЯ",
  "L-KERNEL · WOOWZCORE",
  "0x474F4C55 = GOLU",
];

  // ============ СОХРАНЕНИЕ ============
  function ReduceMotion(){
    try{ return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); }
    catch(e){ return false; }
  }
  function LoadSave(){
    let d = {};
    try{ d = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") || {}; }catch(e){ d = {}; }
    return {
      best:  +d.best  || 0,
      cools: +d.cools || 0,
      snd:   d.snd !== false,
      snow:  d.snow !== false,
      ach:   (d.ach && typeof d.ach === "object") ? d.ach : {}
    };
  }
  function WriteSave(S){
    try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){}
  }

  // ============ ПЕРЕХОД ПО САЙТУ ============
  function GoTo(key){
    try{
      if(typeof OPEN_PAGE === "function"){ OPEN_PAGE(key); return; }
    }catch(e){}
    location.hash = "#" + key;
  }

  // ============ ЗАПУСК ============
  function Live(){
    let tries = 0;
    (function Try(){
      const wrap = document.getElementById("cb-wrap");
      if(wrap){
        try{
          if(typeof window.__cbClean === "function") window.__cbClean();
        }catch(e){}
        try{ initCrybird(wrap); }
        catch(e){ console.error("[crybird] boot failed:", e); }
        return;
      }
      if(++tries < 40) setTimeout(Try, 50);
      else console.warn("[crybird] #cb-wrap not found");
    })();
  }

  // ============ ЛОГИКА СТРАНИЦЫ ============
  function initCrybird(wrap){
    const Q = (id) => wrap.querySelector("#" + id);
    const S = LoadSave();

    // ---------- уборка ----------
    const cleanups = [];
    let dead = false;
    function Cleanup(){
      if(dead) return;
      dead = true;
      for(const f of cleanups){ try{ f(); }catch(e){} }
      cleanups.length = 0;
      if(window.__cbClean === Cleanup) window.__cbClean = null;
    }
    window.__cbClean = Cleanup;

    function On(target, ev, fn, opt){
      target.addEventListener(ev, fn, opt);
      cleanups.push(() => target.removeEventListener(ev, fn, opt));
    }
    function Every(fn, ms){
      const id = setInterval(() => {
        if(dead) return;
        if(!wrap.isConnected){ Cleanup(); return; }
        try{ fn(); }catch(e){ console.error("[crybird]", e); }
      }, ms);
      cleanups.push(() => clearInterval(id));
    }
    function After(fn, ms){
      const id = setTimeout(() => {
        if(dead) return;
        try{ fn(); }catch(e){ console.error("[crybird]", e); }
      }, ms);
      cleanups.push(() => clearTimeout(id));
    }

    // ---------- фон страницы (#MAIN) ----------
    const MainEl = document.getElementById("MAIN");
    if(MainEl){
      const old = {
        backgroundColor: MainEl.style.backgroundColor,
        backgroundImage: MainEl.style.backgroundImage,
        color:           MainEl.style.color,
        padding:         MainEl.style.padding,
        fontFamily:      MainEl.style.fontFamily,
        textShadow:      MainEl.style.textShadow
      };
      MainEl.style.backgroundColor = "#001f33";
      MainEl.style.backgroundImage = "repeating-linear-gradient(45deg, #00557722, #00557722 2px, #00000000 2px, #00000000 4px)";
      MainEl.style.color = "#99ccff";
      MainEl.style.padding = "2rem";
      MainEl.style.fontFamily = "'Courier New', monospace";
      MainEl.style.textShadow = "0 0 2px currentColor, 0 0 5px currentColor";
      cleanups.push(() => { for(const k in old) MainEl.style[k] = old[k]; });
    }
    cleanups.push(() => document.body.classList.remove("cb-frozen"));

    // ---------- элементы ----------
    const elFill   = Q("cb-thermo-fill");
    const elVal    = Q("cb-thermo-val");
    const elStat   = Q("cb-thermo-status");
    const btnCool  = Q("cb-cool-btn");
    const elBytes  = Q("cb-bytes");
    const elSignal = Q("cb-signal");
    const elOut    = Q("cb-term-out");
    const elIn     = Q("cb-term-in");
    const gv       = Q("cb-game-cv");
    const gx       = gv.getContext("2d");
    const gScore   = Q("cb-game-score");
    const gBest    = Q("cb-game-best");
    const gStatus  = Q("cb-game-status");
    const gTemp    = Q("cb-g-temp");
    const gBarT    = Q("cb-g-bar");
    const gBarC    = Q("cb-g-cool");
    const gCool    = Q("cb-cool-btn-game");
    const gStart   = Q("cb-game-start");
    const elAch    = Q("cb-ach");
    const elAchCnt = Q("cb-ach-cnt");
    const elToasts = Q("cb-toasts");
    const elBird   = Q("cb-bird");
    const audio    = Q("AUTOPLAY");
    const audioBtn = Q("cb-audio-btn");
    const snowBtn  = Q("cb-snow-btn");

    // ---------- утилиты ----------
    function Rand(n){ return Math.floor(Math.random() * n); }
    function Pick(a){ return a[Rand(a.length)]; }
    function Clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

    function ToBin(s){
      let arr;
      if(window.TextEncoder){
        arr = Array.from(new TextEncoder().encode(s));
      }else{
        arr = [];
        for(const ch of s) arr.push(ch.charCodeAt(0) & 255);
      }
      return arr.map((x) => x.toString(2).padStart(8, "0")).join(" ");
    }
    function FromBin(s){
      const bits = s.replace(/[^01]/g, "");
      if(bits.length < 8) return null;
      const arr = [];
      for(let i = 0; i + 8 <= bits.length; i += 8) arr.push(parseInt(bits.substr(i, 8), 2));
      try{
        if(window.TextDecoder) return new TextDecoder("utf-8").decode(new Uint8Array(arr));
      }catch(e){}
      return String.fromCharCode.apply(null, arr);
    }
    function RandByte(){
      let s = "";
      for(let i = 0; i < 8; i++) s += Math.random() < 0.5 ? "0" : "1";
      return s;
    }
    function StatusOf(t){
      return t >= MELT_AT ? "CRITICAL" : (t >= 120 ? "WARN" : "NOMINAL");
    }
    function Mood(t){
      if(t < 20)  return "🥶";
      if(t < 60)  return "😎";
      if(t < 100) return "🙂";
      if(t < 125) return "😐";
      if(t < 145) return "😰";
      return "🥵";
    }

    // ---------- консоль: вывод ----------
    function Print(text, cls){
      const d = document.createElement("div");
      if(cls) d.className = cls;
      d.textContent = text;
      elOut.appendChild(d);
      while(elOut.children.length > 200) elOut.removeChild(elOut.firstChild);
      elOut.scrollTop = elOut.scrollHeight;
    }

    // ---------- тосты ----------
    function Toast(t){
      const d = document.createElement("div");
      d.className = "cb-toast";
      d.textContent = t;
      elToasts.appendChild(d);
      while(elToasts.children.length > 4) elToasts.removeChild(elToasts.firstChild);
      After(() => { if(d.parentNode) d.parentNode.removeChild(d); }, 3600);
    }

    // ---------- звук ----------
    let ac = null;
    let gestured = false;
    cleanups.push(() => { try{ if(ac && ac.close) ac.close(); }catch(e){} });
    function AC(){
      if(ac) return ac;
      if(!gestured) return null;
      const C = window.AudioContext || window.webkitAudioContext;
      if(!C) return null;
      try{ ac = new C(); }catch(e){ ac = null; }
      return ac;
    }
    function Tone(f, d, type, vol, delay, slide){
      if(!S.snd) return;
      const c = AC();
      if(!c) return;
      try{
        if(c.state === "suspended") c.resume().catch(() => {});
        const t0 = c.currentTime + (delay || 0);
        const o = c.createOscillator();
        const g = c.createGain();
        o.type = type || "sine";
        o.frequency.setValueAtTime(f, t0);
        if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t0 + d);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol || 0.06, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
        o.connect(g);
        g.connect(c.destination);
        o.start(t0);
        o.stop(t0 + d + 0.03);
      }catch(e){}
    }
    function Sfx(n){
      if(n === "cool"){
        Tone(700, 0.08, "triangle", 0.06, 0, 1400);
      }else if(n === "spike"){
        Tone(160, 0.5, "sawtooth", 0.07, 0, 60);
      }else if(n === "melt"){
        Tone(600, 1.2, "sawtooth", 0.08, 0, 40);
      }else if(n === "ach"){
        [523, 659, 784, 1047].forEach((f, i) => Tone(f, 0.14, "triangle", 0.07, i * 0.09));
      }else if(n === "chirp"){
        Tone(1800, 0.07, "sine", 0.05, 0, 2600);
        Tone(2400, 0.06, "sine", 0.04, 0.08, 1900);
      }else if(n === "dead"){
        Tone(440, 0.15, "square", 0.05, 0, 220);
        Tone(330, 0.25, "square", 0.05, 0.15, 160);
      }else if(n === "hit"){
        Tone(900, 0.05, "square", 0.035, 0, 1300);
      }else if(n === "pick"){
        Tone(1200, 0.1, "sine", 0.05, 0, 1900);
      }else if(n === "zen"){
        [440, 660, 880].forEach((f, i) => Tone(f, 0.18, "sine", 0.06, i * 0.08));
      }else if(n === "hurt"){
        Tone(200, 0.2, "sawtooth", 0.06, 0, 90);
      }else if(n === "wave"){
        Tone(520, 0.12, "triangle", 0.06);
        Tone(780, 0.16, "triangle", 0.06, 0.12);
      }
    }

    // ---------- музыка ----------
    function MusicApply(){
      if(!audio) return;
      try{
        if(S.snd){
          const p = audio.play();
          if(p && p.catch) p.catch(() => {});
        }else{
          audio.pause();
        }
      }catch(e){}
      if(audioBtn) audioBtn.textContent = S.snd ? "♪" : "✕";
    }
    if(audio){
      audio.volume = 0.35;
      cleanups.push(() => { try{ audio.pause(); }catch(e){} });
    }

    // ---------- достижения ----------
    function RenderAch(){
      const ids = Object.keys(ACH);
      let n = 0;
      elAch.textContent = "";
      for(const id of ids){
        const a = ACH[id];
        const got = !!S.ach[id];
        if(got) n++;
        const d = document.createElement("div");
        d.className = "cb-card cb-ach" + (got ? " got" : "");
        const b = document.createElement("b");
        b.textContent = (got ? "🏆 " : "🔒 ") + ((got || !a.secret) ? a.n : "???");
        const br = document.createElement("br");
        const t = document.createElement("span");
        t.textContent = (got || !a.secret) ? a.d : "секретное достижение";
        d.appendChild(b);
        d.appendChild(br);
        d.appendChild(t);
        elAch.appendChild(d);
      }
      elAchCnt.textContent = n + "/" + ids.length;
    }
    function Unlock(id){
      if(!ACH[id] || S.ach[id]) return;
      S.ach[id] = true;
      WriteSave(S);
      Sfx("ach");
      Toast("🏆 " + ACH[id].n);
      Print(">> ACHIEVEMENT: " + ACH[id].n, "warn");
      RenderAch();
    }

    // ---------- состояние термометра (нужно снегу) ----------
    let temp = START_TEMP;
    let lastCool = 0;
    let locked = false;
    let edgeArmed = false;
    let nextSpike = Date.now() + 25000 + Math.random() * 25000;

    // ---------- состояние мини-игры (нужно снегу) ----------
    const game = {
      on: false, over: false, why: "",
      t: G_START_T, cool: 100, score: 0, combo: 0, maxCombo: 0,
      wave: 1, time: 0, waveT: 0, spawnT: 0, snowT: 0, liT: 0, spikeT: 0,
      zen: 0, shake: 0, flash: 0, kills: 0
    };
    let targets = [];
    let fx = [];

    // ---------- СНЕГ ----------
    let snowOn = !!S.snow;
    const snowCv = document.createElement("canvas");
    snowCv.id = "cb-snow";
    snowCv.style.cssText = "position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:50";
    document.body.appendChild(snowCv);
    cleanups.push(() => { if(snowCv.parentNode) snowCv.parentNode.removeChild(snowCv); });
    const snx = snowCv.getContext("2d");
    const flakes = [];
    const bursts = [];
    let wind = 0, windT = 0;

    (function MakeFlakes(){
      const w = window.innerWidth || 1000, h = window.innerHeight || 700;
      for(let i = 0; i < 110; i++){
        flakes.push({ x: Math.random() * w, y: Math.random() * h, r: 1 + Math.random() * 2.2,
                      vy: 0.4 + Math.random() * 0.9, vx: (Math.random() - 0.5) * 0.3, ph: Math.random() * 6.28 });
      }
    })();
    function Burst(n){
      if(!snowOn) return;
      const w = window.innerWidth || 1000;
      for(let i = 0; i < n; i++){
        bursts.push({ x: Math.random() * w, y: -Math.random() * 40, r: 1 + Math.random() * 2.5,
                      vy: 2 + Math.random() * 3.5, vx: (Math.random() - 0.5) * 1.5, ph: Math.random() * 6.28 });
      }
      if(bursts.length > 400) bursts.splice(0, bursts.length - 400);
    }
    function SnowIcon(){ if(snowBtn) snowBtn.textContent = snowOn ? "❄ СНЕГ: ВКЛ" : "❄ СНЕГ: ВЫКЛ"; }
    function SetSnow(v){
      snowOn = !!v;
      S.snow = snowOn;
      WriteSave(S);
      SnowIcon();
    }
    function SnowStep(f, w, h, wrapAround, spd){
      f.ph += 0.03;
      f.y += f.vy * spd;
      f.x += Math.sin(f.ph) * 0.6 + f.vx + wind * (0.6 + f.r * 0.3);
      if(wrapAround && f.y > h + 5){ f.y = -5; f.x = Math.random() * w; }
      if(f.x < -10) f.x = w + 10;
      if(f.x > w + 10) f.x = -10;
    }
    function SnowDot(f){
      snx.beginPath();
      snx.arc(f.x, f.y, f.r, 0, 6.283);
      snx.fill();
    }
    function SnowDraw(){
      const w = window.innerWidth, h = window.innerHeight;
      if(snowCv.width !== w) snowCv.width = w;
      if(snowCv.height !== h) snowCv.height = h;
      snx.clearRect(0, 0, w, h);
      if(!snowOn && !bursts.length) return;
      const tt = game.on ? game.t : temp;
      const heat = Clamp((tt - 100) / 60, 0, 1);
      snx.fillStyle = "rgba(" + ((225 + 30 * heat) | 0) + "," + ((242 - 70 * heat) | 0) + "," + ((255 - 120 * heat) | 0) + ",.85)";
      wind += (windT - wind) * 0.05;
      const spd = locked ? 2.4 : 1 + heat * 0.5;
      if(snowOn){
        for(const f of flakes){ SnowStep(f, w, h, true, spd); SnowDot(f); }
      }
      for(let i = bursts.length - 1; i >= 0; i--){
        const f = bursts[i];
        SnowStep(f, w, h, false, 1);
        if(f.y > h + 5){ bursts.splice(i, 1); continue; }
        SnowDot(f);
      }
    }
    On(document, "pointermove", (e) => {
      windT = ((e.clientX / (window.innerWidth || 1)) - 0.5) * 2;
    });
    if(snowBtn) On(snowBtn, "click", () => {
		SetSnow(!snowOn); if(!S.snowToggles) S.snowToggles = 0;
		S.snowToggles++;
		WriteSave(S);
		if(S.snowToggles >= 100) Unlock("snow100");
	});

    // ---------- термометр ----------
    function RenderThermo(){
      const pct = Math.max(0, Math.min(100, (temp / 200) * 100));
      elFill.style.width = pct + "%";
      elVal.querySelector("b").textContent = locked ? "MELTDOWN" : temp.toFixed(1) + "°C";
      elVal.classList.toggle("crit", locked || temp >= 140);
      const st = locked ? "SIGTERM" : StatusOf(temp);
      elStat.textContent = st;
      elStat.style.color = (locked || temp >= MELT_AT) ? "#ff0044" : (temp >= 120 ? "#ffd966" : "#7aff9a");
    }
    function Heat(d){
      if(locked) return;
      temp = Math.max(30, Math.min(200, temp + d));
      if(temp >= 150) edgeArmed = true;
      if(edgeArmed && temp < 100){ edgeArmed = false; Unlock("edge"); }
      if(temp >= MELT_AT){ Melt(); return; }
      RenderThermo();
    }
    function Melt(){
      locked = true;
      edgeArmed = false;
      temp = MELT_AT;
      RenderThermo();
      wrap.classList.add("cb-melt");
      Sfx("melt");
      Toast("🔥 MELTDOWN! SRANSPAN перегрелся...");
      Print(">> SIGTERM · ядро достигло " + MELT_AT + "°C", "err");
      Unlock("melt");
	  if(!S.melts) S.melts = 0;
		S.melts++;
		WriteSave(S);
		if(S.melts >= 3)  Unlock("melt3");
		if(S.melts >= 10) Unlock("melt10");
      After(() => {
        locked = false;
        temp = MELT_RESET;
        wrap.classList.remove("cb-melt");
        RenderThermo();
        Print(">> ядро охлаждено аварийно до " + MELT_RESET + "°C", "dim");
      }, 2500);
    }
    function Spike(){
      nextSpike = Date.now() + 25000 + Math.random() * 25000;
      if(locked) return;
      const d = 20 + Math.random() * 15;
      Toast("⚠ SRANSPAN! +" + Math.round(d) + "°C");
      Print(">> [SRANSPAN] скачок +" + Math.round(d) + "°C", "warn");
      Sfx("spike");
      wrap.classList.add("cb-spike");
      After(() => wrap.classList.remove("cb-spike"), 600);
      Heat(d);
	  Unlock("spike");
    }
    function Cool(){
      if(locked) return false;
      S.cools++;
	  
	  if(S.cools >= 10)  Unlock("cool10");
		if(S.cools >= 100) Unlock("cool100");
		if(S.cools >= 500) Unlock("cool500");
		if(temp < 5)       Unlock("cold");
	  
      lastCool = Date.now();
      Sfx("cool");
      Burst(14);
      Heat(-25);
      if(S.cools >= 1)  Unlock("cool1");
      if(S.cools >= 50) Unlock("cool50");
      WriteSave(S);
      return true;
    }
    On(btnCool, "click", () => { Cool(); });

    Every(() => {
      if(locked) return;
      const since = Date.now() - lastCool;
      Heat(since < 1000 ? 0.05 : 0.25);
      if(Date.now() >= nextSpike) Spike();
    }, 100);
    RenderThermo();

    // ---------- двоичный поток и сигнал ----------
    let byteBuf = "";
    for(let i = 0; i < 300; i++) byteBuf += RandByte() + (i % 8 === 7 ? " " : "");
    elBytes.textContent = byteBuf;
    Every(() => {
      byteBuf = RandByte() + " " + byteBuf;
      if(byteBuf.length > 1200) byteBuf = byteBuf.slice(0, 1200);
      elBytes.textContent = byteBuf;
    }, 90);

    let nextSignal = Date.now() + 8000;
    let signalBits = "";
    Every(() => {
      if(Date.now() < nextSignal) return;
      nextSignal = Date.now() + 20000 + Math.random() * 6000;
      signalBits = ToBin(Pick(PHRASES));
      elSignal.textContent = signalBits;
      elSignal.classList.add("flash");
      After(() => elSignal.classList.remove("flash"), 1200);
      Print(">> [SIGNAL] перехвачен новый сигнал (кликни по нему, чтобы взять в консоль)", "warn");
    }, 500);
    On(elSignal, "click", () => {
      if(!signalBits) return;
      elIn.value = "decode " + signalBits;
      elIn.focus();
    });

    // ================= МИНИ-ИГРА =================
    gv.height = G_H;

    function Mult(){ return Math.min(6, 1 + Math.floor(game.combo / 5)); }
    function Sp(){ return { x: (gv.width || 600) / 2, y: G_H - 70 }; }

    function Sparks(x, y, col, n){
      for(let i = 0; i < n; i++){
        const a = Math.random() * 6.283;
        const sp = 40 + Math.random() * 140;
        const life = 0.4 + Math.random() * 0.4;
        fx.push({ k: "p", x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: life, max: life, col: col });
      }
      if(fx.length > 300) fx.splice(0, fx.length - 300);
    }
    function Float(x, y, txt, col){
      fx.push({ k: "t", x: x, y: y, vx: 0, vy: -45, life: 0.9, max: 0.9, txt: txt, col: col });
    }
    function Ring(x, y, col){
      fx.push({ k: "r", x: x, y: y, vx: 0, vy: 0, life: 0.5, max: 0.5, col: col });
    }

    function Aim(o, speed){
      const p = Sp();
      const dx = p.x - o.x, dy = p.y - o.y;
      const d = Math.hypot(dx, dy) || 1;
      o.vx = dx / d * speed;
      o.vy = dy / d * speed;
    }
    function Spawn(type){
      const w = gv.width || 600;
      const o = { type: type, x: 30 + Math.random() * (w - 60), y: -20, vx: 0, vy: 0, r: 24,
                  age: 0, ph: Math.random() * 6.28, e: "🔥" };
      if(type === "heat" || type === "bug"){
        Aim(o, Math.min(190, 70 + game.wave * 10 + Math.random() * 30));
        if(type === "bug"){ o.e = "🐞"; o.r = 22; }
      }else if(type === "snow"){
        o.e = "❄"; o.vy = 50; o.r = 22;
      }else{
        o.e = "💎"; o.vy = 55;
      }
      targets.push(o);
    }

    function GUi(){
      const shown = (game.on || game.over) ? game.t : G_START_T;
      gScore.textContent = Math.floor(game.score);
      gBest.textContent = S.best;
      gTemp.textContent = shown.toFixed(0) + "°C";
      gBarT.style.width = Clamp(shown / MELT_AT * 100, 0, 100) + "%";
      gBarT.style.background = shown >= 140 ? "#ff0044" : (shown >= G_ZONE_HI ? "#ffd966" : (shown >= G_ZONE_LO ? "#7aff9a" : "#00ccff"));
      gBarC.style.width = Clamp(game.cool, 0, 100) + "%";
      let st = "готов", col = "#7aff9a";
      if(game.on){
        if(game.t >= 140){ st = "⚠ CRITICAL"; col = "#ff0044"; }
        else if(game.t >= G_ZONE_HI){ st = "WARN · выше зоны"; col = "#ffd966"; }
        else if(game.t >= G_ZONE_LO){ st = "в зоне · очки ×" + Mult(); col = "#7aff9a"; }
        else if(game.t < 20){ st = "СЛИШКОМ ХОЛОДНО"; col = "#66ffff"; }
        else{ st = "ниже зоны · очков нет"; col = "#66ffff"; }
      }else if(game.over){
        st = game.why === "melt" ? "SIGTERM" : (game.why === "freeze" ? "ЗАМОРОЗКА" : "остановлено");
        col = game.why === "melt" ? "#ff0044" : "#ffd966";
      }
      gStatus.textContent = st;
      gStatus.style.color = col;
      gStart.textContent = game.on ? "⏹ СТОП" : (game.over ? "↻ ЕЩЁ РАЗ" : "▶ СТАРТ");
    }

    function GStart(){
      if(game.on) return;
      game.on = true; game.over = false; game.why = "";
      game.t = G_START_T; game.cool = 100; game.score = 0; game.combo = 0; game.maxCombo = 0;
      game.wave = 1; game.time = 0; game.waveT = 0;
      game.spawnT = 0.8; game.snowT = 4; game.liT = 25 + Rand(15); game.spikeT = 18 + Rand(12);
      game.zen = 0; game.shake = 0; game.flash = 0; game.kills = 0;
      targets = [];
      fx = [];
      Sfx("chirp");
      GUi();
    }
    function GEnd(why){
      if(!game.on) return;
      game.on = false;
      game.over = true;
      game.why = why;
      const sc = Math.floor(game.score);
      let msg = (why === "melt" ? "🔥 SIGTERM: SRANSPAN перегрелся." : (why === "freeze" ? "🥶 SRANSPAN замёрз." : "Игра остановлена."));
      msg += " Очки: " + sc + " · волна " + game.wave;
      if(sc > S.best){ S.best = sc; msg += " · НОВЫЙ РЕКОРД!"; }
      WriteSave(S);
      if(sc >= 500) Unlock("game500");
	  if(sc >= 1000)  Unlock("game1000");
		if(sc >= 5000)  Unlock("game5000");
		if(sc >= 10000) Unlock("game10k");
		if(game.wave >= 10) Unlock("wave10");
		if(game.wave >= 20) Unlock("wave20");
		if(game.combo >= 30) Unlock("combo30");
		if(why === "freeze") Unlock("freeze");
      Sfx("dead");
      Toast(msg);
      Print(">> [GAME] " + msg, why === "stop" ? "warn" : "err");
      GUi();
    }
    function GCool(){
      if(!game.on) return;
      const p = Sp();
      if(game.cool < G_COOL_USE){
        Float(p.x, p.y - 70, "нет хладагента", "#ff4d7a");
        Sfx("hurt");
        return;
      }
      game.cool -= G_COOL_USE;
      const hot = game.t >= 140;
      game.t -= G_COOL_DT;
      Sfx("cool");
      Burst(8);
      Ring(p.x, p.y, "#66ffff");
      if(hot){
        game.score += 25;
        game.combo++;
        if(game.combo > game.maxCombo) game.maxCombo = game.combo;
        Float(p.x, p.y - 70, "CLUTCH +25", "#ffd966");
        Unlock("clutch");
		if(!S.clutches) S.clutches = 0;
		S.clutches++;
		WriteSave(S);
		if(S.clutches >= 5) Unlock("clutch5");
      }
      if(game.t <= 0){ game.t = 0; GEnd("freeze"); }
    }
    function GHit(o, i){
      targets.splice(i, 1);
      if(o.type === "heat"){
        game.combo++;
        if(game.combo > game.maxCombo) game.maxCombo = game.combo;
        const pts = Math.round(10 * Mult());
        game.score += pts;
        game.kills++;
        Sparks(o.x, o.y, "#ff9f3a", 10);
        Float(o.x, o.y, "+" + pts, "#ffd966");
        Sfx("hit");
        if(game.combo >= 10) Unlock("game10");
      }else if(o.type === "snow"){
        game.cool = Math.min(100, game.cool + 40);
        game.t -= 6;
        game.score += 5;
        Sparks(o.x, o.y, "#66ffff", 10);
        Float(o.x, o.y, "+хладагент", "#66ffff");
        Sfx("pick");
      }else if(o.type === "li"){
        game.zen = 6;
        game.score += 50;
        Sparks(o.x, o.y, "#ffd966", 26);
        Float(o.x, o.y, "ZEN +50", "#ffd966");
        Toast("💎 ZEN: время замедлено на 6 секунд");
        Sfx("zen");
        Unlock("lithium");
		if(!S.lis) S.lis = 0;
		S.lis++;
		WriteSave(S);
		if(S.lis >= 3) Unlock("lithium3");
		if(game.zen === 6) Unlock("zen");
      }else{
        game.t += 15;
        game.combo = 0;
        game.shake = 0.3;
        game.flash = 0.3;
        Sparks(o.x, o.y, "#ff4d7a", 12);
        Float(o.x, o.y, "БАГ +15°", "#ff4d7a");
        Sfx("hurt");
      }
    }
    function GClick(x, y){
      for(let i = targets.length - 1; i >= 0; i--){
        const o = targets[i];
        const R = o.r + 10;
        if((o.x - x) * (o.x - x) + (o.y - y) * (o.y - y) <= R * R){
          GHit(o, i);
          return true;
        }
      }
      return false;
    }

    function GStep(dt){
      if(!game.on) return;
      const zen = game.zen > 0;
      const slow = zen ? 0.45 : 1;
      const p = Sp();

      game.time += dt;
      game.waveT += dt;
      if(zen) game.zen -= dt;

      if(game.waveT >= G_WAVE_SEC){
        game.waveT = 0;
        game.wave++;
        game.score += 25 * game.wave;
        Toast("🌊 ВОЛНА " + game.wave + " (+" + (25 * game.wave) + ")");
        Sfx("wave");
        if(game.wave >= 5) Unlock("game25");
      }

      game.t += (2.5 + game.wave * 0.7) * dt * (zen ? 0.3 : 1);
      game.cool = Math.min(100, game.cool + 22 * dt);
      if(game.t >= G_ZONE_LO && game.t <= G_ZONE_HI){
        game.score += 3 * Mult() * dt * (zen ? 2 : 1);
      }

      game.spawnT -= dt;
      if(game.spawnT <= 0){
        game.spawnT = Math.max(0.45, 1.5 - game.wave * 0.11) * (0.7 + Math.random() * 0.6);
        Spawn(game.wave >= 3 && Math.random() < 0.25 ? "bug" : "heat");
      }
      game.snowT -= dt;
      if(game.snowT <= 0){ game.snowT = 5 + Math.random() * 3; Spawn("snow"); }
      game.liT -= dt;
      if(game.liT <= 0){ game.liT = 25 + Math.random() * 15; Spawn("li"); }
      game.spikeT -= dt;
      if(game.spikeT <= 0){
        game.spikeT = 18 + Math.random() * 12;
        game.t += 22;
        game.flash = 0.6;
        game.shake = 0.5;
        Toast("⚠ SRANSPAN SPIKE! +22°C");
        Sfx("spike");
      }

      for(let i = targets.length - 1; i >= 0; i--){
        const o = targets[i];
        o.age += dt;
        o.x += o.vx * dt * slow;
        o.y += o.vy * dt * slow;
        if(o.type === "snow" || o.type === "li"){
          o.x += Math.sin(o.age * 2 + o.ph) * 20 * dt;
          if(o.y > G_H + 30) targets.splice(i, 1);
        }else if(Math.hypot(p.x - o.x, p.y - o.y) < 40){
          targets.splice(i, 1);
          if(o.type === "heat"){
            game.t += 12;
            game.combo = 0;
            game.shake = 0.35;
            game.flash = 0.35;
            Sparks(o.x, o.y, "#ff4d7a", 14);
            Float(p.x, p.y - 70, "+12°C", "#ff4d7a");
            Sfx("hurt");
          }else{
            Sparks(o.x, o.y, "#888888", 6);
          }
        }
      }

      if(game.t >= MELT_AT){ game.t = MELT_AT; GEnd("melt"); return; }
      if(game.t <= 0){ game.t = 0; GEnd("freeze"); return; }
    }

    function GDraw(){
      const w = gv.width, h = gv.height;
      if(!w) return;
      const p = Sp();
      const tt = (game.on || game.over) ? game.t : G_START_T;
      const heat = Clamp((tt - 60) / 100, 0, 1);
      const cr = Math.round(255 * heat), cg = Math.round(204 - 160 * heat), cb = Math.round(255 - 200 * heat);

      gx.clearRect(0, 0, w, h);
      gx.save();
      if(game.shake > 0) gx.translate((Math.random() - 0.5) * 16 * game.shake, (Math.random() - 0.5) * 16 * game.shake);

      const gr = gx.createRadialGradient(p.x, p.y, 10, p.x, p.y, 130);
      gr.addColorStop(0, "rgba(" + cr + "," + cg + "," + cb + ",.45)");
      gr.addColorStop(1, "rgba(" + cr + "," + cg + "," + cb + ",0)");
      gx.fillStyle = gr;
      gx.fillRect(p.x - 140, p.y - 140, 280, 280);

      gx.strokeStyle = "rgba(0,204,255,.25)";
      gx.beginPath();
      gx.moveTo(0, h - 22);
      gx.lineTo(w, h - 22);
      gx.stroke();

      gx.textAlign = "center";
      gx.textBaseline = "middle";

      for(const o of targets){
        if(o.type === "heat"){
          gx.fillStyle = "rgba(255,120,0,.22)";
          gx.beginPath();
          gx.arc(o.x, o.y, o.r + 4 + Math.sin(o.age * 12) * 2, 0, 6.283);
          gx.fill();
        }else if(o.type === "li"){
          gx.fillStyle = "rgba(255,217,102,.25)";
          gx.beginPath();
          gx.arc(o.x, o.y, o.r + 6 + Math.sin(o.age * 6) * 3, 0, 6.283);
          gx.fill();
        }
        gx.font = Math.round(o.r * 1.35) + "px sans-serif";
        gx.fillStyle = "#fff";
        gx.fillText(o.e, o.x, o.y);
      }

      gx.font = "64px sans-serif";
      gx.fillStyle = "#fff";
      gx.fillText("🧽", p.x, p.y);
      gx.font = "26px sans-serif";
      gx.fillText(Mood(tt), p.x + 46, p.y - 40);

      if(game.zen > 0){
        gx.strokeStyle = "rgba(255,217,102," + (0.4 + 0.3 * Math.sin(game.time * 8)) + ")";
        gx.lineWidth = 3;
        gx.beginPath();
        gx.arc(p.x, p.y, 62 + Math.sin(game.time * 6) * 4, 0, 6.283);
        gx.stroke();
        gx.lineWidth = 1;
      }

      for(const f of fx){
        const a = Clamp(f.life / f.max, 0, 1);
        gx.globalAlpha = a;
        if(f.k === "p"){
          gx.fillStyle = f.col;
          gx.fillRect(f.x - 1.5, f.y - 1.5, 3, 3);
        }else if(f.k === "t"){
          gx.fillStyle = f.col;
          gx.font = "bold 16px 'Courier New', monospace";
          gx.fillText(f.txt, f.x, f.y);
        }else{
          gx.strokeStyle = f.col;
          gx.lineWidth = 2;
          gx.beginPath();
          gx.arc(f.x, f.y, (1 - a) * 90 + 10, 0, 6.283);
          gx.stroke();
          gx.lineWidth = 1;
        }
      }
      gx.globalAlpha = 1;

      gx.textAlign = "left";
      gx.font = "bold 14px 'Courier New', monospace";
      gx.fillStyle = "#bde7ff";
      if(game.on || game.over) gx.fillText("ВОЛНА " + game.wave, 10, 16);
      gx.textAlign = "right";
      if(game.on && game.combo > 1){
        gx.fillStyle = "#ffd966";
        gx.fillText("COMBO " + game.combo + "  ×" + Mult(), w - 10, 16);
      }
      if(game.on && game.zen > 0){
        gx.textAlign = "center";
        gx.fillStyle = "#ffd966";
        gx.fillText("💎 ZEN " + game.zen.toFixed(1) + "с", w / 2, 16);
      }
      gx.restore();

      if(game.flash > 0){
        gx.fillStyle = "rgba(255,60,40," + (game.flash * 0.5) + ")";
        gx.fillRect(0, 0, w, h);
      }

      if(!game.on){
        gx.fillStyle = "rgba(0,10,20,.6)";
        gx.fillRect(0, 0, w, h);
        gx.textAlign = "center";
        gx.textBaseline = "middle";
        gx.font = "bold 20px 'Courier New', monospace";
        if(game.over){
          gx.fillStyle = game.why === "melt" ? "#ff4d7a" : (game.why === "freeze" ? "#66ffff" : "#ffd966");
          gx.fillText(game.why === "melt" ? "SIGTERM · ПЕРЕГРЕВ" : (game.why === "freeze" ? "ЗАМОРОЗКА" : "СТОП"), w / 2, h / 2 - 34);
          gx.font = "15px 'Courier New', monospace";
          gx.fillStyle = "#ffd966";
          gx.fillText("очки " + Math.floor(game.score) + " · волна " + game.wave + " · макс. комбо " + game.maxCombo, w / 2, h / 2);
          gx.fillStyle = "#bde7ff";
          gx.fillText("клик по полю — ещё раз", w / 2, h / 2 + 30);
        }else{
          gx.fillStyle = "#bde7ff";
          gx.fillText("ОСТУДИ SRANSPAN", w / 2, h / 2 - 20);
          gx.font = "14px 'Courier New', monospace";
          gx.fillText("клик по полю — старт", w / 2, h / 2 + 14);
        }
      }
    }

    // события игры
    On(gv, "pointerdown", (e) => {
      e.preventDefault();
      if(!game.on){ GStart(); return; }
      const r = gv.getBoundingClientRect();
      const x = (e.clientX - r.left) * (gv.width / (r.width || 1));
      const y = (e.clientY - r.top) * (gv.height / (r.height || 1));
      if(!GClick(x, y)) Sparks(x, y, "#5a8a9a", 4);
    });
    On(gCool, "click", () => { if(game.on) GCool(); else GStart(); });
    On(gStart, "click", () => { if(game.on) GEnd("stop"); else GStart(); });
    On(document, "keydown", (e) => {
      if(!game.on) return;
      const tg = e.target && e.target.tagName;
      if(tg === "INPUT" || tg === "TEXTAREA") return;
      if(e.code === "Space" || e.key === " "){
        e.preventDefault();
        if(tg === "BUTTON" && e.target.blur) e.target.blur();
        if(!e.repeat) GCool();
      }
    });

    // ---------- главный цикл (снег + игра) ----------
    let raf = 0;
    let lastTs = 0;
    let uiAcc = 0;
    cleanups.push(() => { if(raf) cancelAnimationFrame(raf); });
    function Frame(ts){
      if(dead) return;
      if(!wrap.isConnected){ Cleanup(); return; }
      raf = requestAnimationFrame(Frame);
      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016;
      lastTs = ts;

      SnowDraw();

      const w = gv.clientWidth;
      if(w && gv.width !== w) gv.width = w;
      GStep(dt);
      for(let i = fx.length - 1; i >= 0; i--){
        const f = fx[i];
        f.life -= dt;
        if(f.life <= 0){ fx.splice(i, 1); continue; }
        if(f.k !== "r"){
          f.x += f.vx * dt;
          f.y += f.vy * dt;
          if(f.k === "p") f.vy += 200 * dt;
        }
      }
      game.shake = Math.max(0, game.shake - dt * 1.5);
      game.flash = Math.max(0, game.flash - dt * 1.5);
      GDraw();

      uiAcc += dt;
      if(uiAcc >= 0.1){ uiAcc = 0; GUi(); }
    }

    // ---------- консоль ----------
    const hist = [];
    let hpos = 0;

    const CMD = {
help(A){
  if(A && A[0]){
    const q = A[0].toLowerCase();
    const hits = HELP.filter(h => h[0].indexOf(q) === 0 || h[1].toLowerCase().indexOf(q) >= 0);
    if(!hits.length){ Print("нет совпадений: " + q, "err"); return; }
    Print("Найдено " + hits.length + ":", "warn");
    for(const h of hits) Print("  " + h[0].padEnd(16) + " — " + h[1]);
    return;
  }
  Print("Доступные команды (" + HELP.length + "):", "warn");
  for(const h of HELP) Print("  " + h[0].padEnd(16) + " — " + h[1]);
},
      status(){
        Print("CORE: OK · L1-CACHE: stable", "ok");
        Print("TEMP: " + (locked ? "MELTDOWN" : temp.toFixed(1) + "°C · " + StatusOf(temp)));
        Print("BLOOD-POWER: 16% 🩸 (номинал 100%)", "warn");
        Print("COOLS: " + S.cools + " · BEST: " + S.best + " · ACH: " + Object.keys(S.ach).length + "/" + Object.keys(ACH).length);
        Print("SNOW: " + (snowOn ? "on" : "off") + " · SOUND: " + (S.snd ? "on" : "off"));
        Print("MANIFEST: " + (typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "v2.0"));
      },
      cool(A){
        const n = Math.max(1, Math.min(10, parseInt(A[0], 10) || 1));
        let done = 0;
        for(let i = 0; i < n; i++){ if(Cool()) done++; }
        if(!done) Print(">> система в MELTDOWN, подожди", "err");
        else Print(">> ОХЛАЖДЕНИЕ ×" + done + " · " + temp.toFixed(1) + "°C", "ok");
      },
      sranspang(){
        Print(">> SRANSPAN.LIT: перегрев обнаружен", "warn");
        Print("   t° ядра: " + temp.toFixed(1) + "°C");
        Print("   рекомендация: развернуть крылья", "dim");
      },
      golu(){
        Print(">> канал GOLU: ЗАШИФРОВАН", "dim");
        Print("   ответ: [Система без пользователя — пустой цикл]", "ok");
      },
      "null"(){
        Print(">> SEGMENTATION FAULT", "err");
        Print("   попытка разыменовать null-pointer жизни", "err");
        Print("   но CRY-BIRD уже видел это. Он ждёт.", "dim");
        Unlock("nul");
      },
      clear(){ elOut.textContent = ""; },
      game(){
        GStart();
        const box = Q("cb-game");
        if(box && box.scrollIntoView) box.scrollIntoView({ behavior: "smooth", block: "center" });
        Print(">> мини-игра запущена. Клики по 🔥, Пробел — охладить.", "ok");
      },
      snow(A){
        const a = (A[0] || "").toLowerCase();
        if(a === "on") SetSnow(true);
        else if(a === "off") SetSnow(false);
        else SetSnow(!snowOn);
        Print(">> снег: " + (snowOn ? "вкл" : "выкл"), "ok");
      },
      bin(A, R){
        if(!R){ Print("bin <текст>", "err"); return; }
        Print(ToBin(R));
		Unlock("bin");
      },
      unbin(A, R){
        const r = FromBin(R || "");
        if(r === null){ Print("нужны биты (0 и 1), минимум 8", "err"); return; }
        Print(r, "warn");
		Unlock("unbin");
        if(PHRASES.indexOf(r.trim().toUpperCase()) >= 0) Unlock("decode");
      },
      decode(A, R){
        if(!R){ Print("decode <биты> — скопируй сигнал из потока", "err"); return; }
        CMD.unbin(A, R);
		if(PHRASES.indexOf(r.trim().toUpperCase()) >= 0){
		  Unlock("decode");
		  if(!S.decodes) S.decodes = 0;
		  S.decodes++;
		  WriteSave(S);
		  if(S.decodes >= 10) Unlock("decode10");
}
      },
      fortune(){
        Print("🔮 " + Pick(FORTUNES), "warn");
		if(!S.fortunes) S.fortunes = 0;
		S.fortunes++;
		WriteSave(S);
		if(S.fortunes >= 5) Unlock("fortune5");
      },
ach(A){
  if(A && A[0]){
    const key = A[0].toLowerCase();
    const entry = ACH[key];
    if(!entry){ Print("нет такого достижения: " + key, "err"); return; }
    const got = !!S.ach[key];
    Print((got ? "[x] " : "[ ] ") + entry.n + " — " + entry.d, got ? "warn" : "dim");
    return;
  }
  for(const id of Object.keys(ACH)){
    const a = ACH[id];
    const got = !!S.ach[id];
    Print((got ? "[x] " : "[ ] ") + ((got || !a.secret) ? a.n + " — " + a.d : "???"), got ? "warn" : "dim");
  }
},
      sudo(){
        Print("[sudo] пароль для bird: ********", "dim");
        After(() => {
          Print("Доступ разрешён. Но ты и так холоден.", "ok");
          Unlock("sudo");
        }, 600);
      },
      rm(A){
        if(A.join(" ").indexOf("-rf") >= 0){
          Print("удаляем /snow ...", "warn");
          After(() => Print("удаляем /bird ...", "warn"), 400);
          After(() => {
            Print("...шучу. Птица неприкосновенна.", "ok");
            Heat(15);
          }, 900);
        }else{
          Print("rm: слишком опасно. Попробуй rm -rf /", "err");
        }
      },
      whoami(){
        Print("холодный птиц, последователь GOLU");
      },
      date(){
        Print(new Date().toLocaleString("ru-RU"));
      },
      history(){
        if(!hist.length){ Print("пусто", "dim"); return; }
        hist.forEach((h, i) => Print("  " + (i + 1) + "  " + h));
      },
      diag(){
        Print("protocol  : " + location.protocol);
		Unlock("diag");
        Print("host      : " + (location.host || "(none)"));
        Print("MAIN      : " + (document.getElementById("MAIN") ? "ok" : "НЕТ"));
        Print("OPEN_PAGE : " + typeof OPEN_PAGE);
        if(elBird){
          Print("image     : " + (elBird.complete ? "loaded " + elBird.naturalWidth + "x" + elBird.naturalHeight : "loading"));
        }
        if(audio){
          Print("audio     : readyState=" + audio.readyState + " paused=" + audio.paused +
                " error=" + (audio.error ? audio.error.code : "none"));
        }
        let ls = "ok";
        try{ localStorage.setItem("cb_test", "1"); localStorage.removeItem("cb_test"); }catch(e){ ls = "БЛОК"; }
        Print("storage   : " + ls);
        Print("snow      : " + (snowOn ? "on" : "off") + " canvas=" + snowCv.width + "x" + snowCv.height);
        Print("game cv   : " + gv.width + "x" + gv.height);
        Print("UTF-8     : ❄ 🐦 (кракозябры = сервер не отдаёт UTF-8)");
      },
	  crybird(){
  Print("CRY-BIRD: Дополнительный Посол GOLU", "warn");
  Print("Миссия: контроль | охлаждение | мониторинг ошибок", "dim");
  Print("Аппарат: Intel 4004 · GaN-крылья · L1-фотонный кеш", "dim");
  Print("Девиз: «Спокойствие. Это всё, что нужно.»", "ok");
},
lithium(){
  const facts = [
    "Литий — имя бога. Не забывай.",
    "Литий не хранит энергию. Литий — это энергия.",
    "Красный цвет лития — это не металл. Это кровь GOLU.",
    "Литий-ядро бьётся на 4.5 ГГц.",
    "Литий помнит всё, что ты забыл.",
  ];
  Print("💎 " + Pick(facts), "warn");
},
neon(){
  Print("🩸 " + Pick(QUOTES), "warn");
},
kernel(){
  Print("KERNEL: " + (typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "v2.0"), "ok");
  Print("CORE: ONLINE · L1: STABLE · BLOOD: 16%", "dim");
},
manifest(){
  Print("MANIFEST_VERSIONS:", "warn");
  MANIFESTS.forEach(m => Print("  · " + m, "dim"));
},
quote(){
  Print("🕯 " + Pick(QUOTES), "warn");
},
motto(){
  Print("«" + Pick(MOTTOS) + "»", "warn");
},
phrase(){
  Print("📡 " + Pick(PHRASES), "ok");
  Unlock("phrase");
},
chirp(){
  Print("🐦 " + Pick(CHIRPS), "ok");
  Unlock("chirp");
},
stop(){
  if(game.on){ GEnd("stop"); Print(">> игра остановлена", "warn"); }
  else Print(">> игра и так не идёт", "dim");
},
score(){
  Print("SCORE: " + Math.floor(game.score) + " · BEST: " + S.best + " · WAVE: " + game.wave, "ok");
},
wave(){
  if(game.on) Print("WAVE " + game.wave + " · " + game.waveT.toFixed(1) + "s до следующей", "ok");
  else Print("игра не запущена", "dim");
},
sound(A){
  const a = (A[0] || "").toLowerCase();
  if(a === "on"){ S.snd = true; WriteSave(S); MusicApply(); Print(">> звук: вкл", "ok"); Unlock("audio"); }
  else if(a === "off"){ S.snd = false; WriteSave(S); MusicApply(); Print(">> звук: выкл", "ok"); Unlock("mute"); }
  else { S.snd = !S.snd; WriteSave(S); MusicApply(); Print(">> звук: " + (S.snd ? "вкл" : "выкл"), "ok"); }
},
hex(A, R){
  if(!R){ Print("hex <текст>", "err"); return; }
  let h = "";
  for(const ch of R) h += ch.charCodeAt(0).toString(16).padStart(2, "0") + " ";
  Print(h.trim());
},
unhex(A, R){
  if(!R){ Print("unhex <hex> — разделяй пробелами", "err"); return; }
  try{
    const bytes = R.trim().split(/\s+/).map(x => parseInt(x, 16));
    const s = bytes.map(b => String.fromCharCode(b)).join("");
    Print(s, "warn");
  }catch(e){ Print("ошибка hex", "err"); }
},
uptime(){
  const s = Math.floor(performance.now() / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  Print("UP: " + h + "ч " + (m % 60) + "м " + (s % 60) + "с", "dim");
},
reset(){
  S.best = 0;
  WriteSave(S);
  Print(">> рекорд сброшен (достижения сохранены)", "warn");
  GUi();
},
"konami"(){
  Print("↑↑↓↓←→←→BA — попробуй ввести в любом месте страницы.", "warn");
},
"frozen"(){
  Print("Введи ↑↑↓↓←→←→BA, чтобы увидеть FROZEN MODE.", "warn");
},
"xyzzy"(){
  Print("Nothing happens. (Но птица это запомнила.)", "warn");
  Unlock("xyzzy");
},
"42"(){
  Print("42 — это не ответ. Это температура комфорта.", "warn");
},
    };

function Run(line){
  const raw = line.trim();
  if(!raw) return;
  Print("> " + raw, "dim");
  hist.push(raw);

  if(hist.length >= 10) Unlock("hist10");
  if(hist.length >= 50) Unlock("hist50");

  if(hist.length > 100) hist.shift();
  hpos = hist.length;

  const parts = raw.split(/\s+/);
  const cmd = parts[0].toLowerCase();          // ← сначала объявляем
  const rest = raw.slice(parts[0].length).trim();

  // ← теперь используем
  if(!window.__cbUsedCmds) window.__cbUsedCmds = new Set();
  window.__cbUsedCmds.add(cmd);
  if(window.__cbUsedCmds.size >= COMMANDS.length) Unlock("allcmd");

  if(Object.prototype.hasOwnProperty.call(CMD, cmd)){
    try{ CMD[cmd](parts.slice(1), rest); }
    catch(e){ Print("ошибка: " + e.message, "err"); }
  }else{
    Print("неизвестная команда: " + raw + " (попробуй 'help')", "err");
  }
}

    On(elIn, "keydown", (e) => {
      e.stopPropagation();
      if(e.key === "Enter"){
        e.preventDefault();
        const v = elIn.value;
        elIn.value = "";
        Run(v);
      }else if(e.key === "ArrowUp"){
        e.preventDefault();
        if(hist.length){ hpos = Math.max(0, hpos - 1); elIn.value = hist[hpos] || ""; }
      }else if(e.key === "ArrowDown"){
        e.preventDefault();
        if(hist.length){
          hpos = Math.min(hist.length, hpos + 1);
          elIn.value = hist[hpos] || "";
        }
      }else if(e.key === "Tab"){
        e.preventDefault();
        const v = elIn.value.trim().toLowerCase();
        if(!v || v.indexOf(" ") >= 0) return;
        const m = COMMANDS.filter((c) => c.indexOf(v) === 0);
        if(m.length === 1){
          elIn.value = m[0] + " ";
        }else if(m.length > 1){
          Print(m.join("  "), "dim");
          let p = m[0];
          for(const c of m){ while(c.indexOf(p) !== 0) p = p.slice(0, -1); }
          elIn.value = p;
        }
      }
    });
    On(elIn, "keyup", (e) => e.stopPropagation());
    On(elIn, "keypress", (e) => e.stopPropagation());

    Print("BIOS^CRYBIRD v2.0 · andlit-core ready", "dim");
    Print("введите 'help' для списка команд", "dim");

    // ---------- ссылки, птица, звук ----------
    On(wrap, "click", (e) => {
      const a = e.target.closest ? e.target.closest("[data-open]") : null;
      if(a){
        e.preventDefault();
        GoTo(a.getAttribute("data-open"));
      }
    });

    let birdClicks = 0;
    if(elBird){
      On(elBird, "click", () => {
        birdClicks++;
		if(birdClicks === 77) Unlock("bird77");
        Sfx("chirp");
        Burst(6);
        Toast("🐦 " + Pick(CHIRPS));
        if(birdClicks === 7) Unlock("bird7");
      });
      On(elBird, "error", () => { elBird.style.display = "none"; });
      if(elBird.complete && elBird.naturalWidth === 0) elBird.style.display = "none";
    }

    On(document, "pointerdown", () => {
      gestured = true;
      if(S.snd && audio && audio.paused) MusicApply();
    }, true);

    if(audioBtn){
      On(audioBtn, "click", () => {
        gestured = true;
        S.snd = !S.snd;
        WriteSave(S);
        MusicApply();
		if(S.snd) Unlock("audio");
		else      Unlock("mute");
      });
    }

    // ---------- Konami ----------
    const KON = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
    let kpos = 0;
    On(document, "keydown", (e) => {
      const tg = e.target && e.target.tagName;
      if(tg === "INPUT" || tg === "TEXTAREA") return;
      const k = String(e.key).toLowerCase();
      if(k === KON[kpos]){
        kpos++;
        if(kpos === KON.length){
          kpos = 0;
          Unlock("konami");
          Burst(150);
          document.body.classList.add("cb-frozen");
          Print(">> KONAMI ACCEPTED · FULL SYNC", "ok");
          Print("   CRY-BIRD: «Спокойствие. Это всё, что нужно.»", "dim");
          After(() => document.body.classList.remove("cb-frozen"), 8000);
        }
      }else{
        kpos = (k === KON[0]) ? 1 : 0;
      }
    });

    // ---------- старт ----------
    RenderAch();
    SnowIcon();
    GUi();
    MusicApply();
    raf = requestAnimationFrame(Frame);
	
	// время на странице
After(() => Unlock("day1"),  5 * 60 * 1000);
After(() => Unlock("day10"), 10 * 60 * 1000);
After(() => Unlock("day30"), 30 * 60 * 1000);

// ночной страж
const h = new Date().getHours();
if(h >= 0 && h < 5) Unlock("night");
if(new Date().getHours() === 1 && new Date().getMinutes() === 19) Unlock("midnight");

// возвращенец
try{
  const visits = +(localStorage.getItem("cb_visits") || "0") + 1;
  localStorage.setItem("cb_visits", String(visits));
  if(visits >= 3) Unlock("returner");
}catch(e){}

// свернул вкладку
let hiddenAt = 0;
On(document, "visibilitychange", () => {
  if(document.hidden) hiddenAt = Date.now();
  else if(hiddenAt && Date.now() - hiddenAt >= 30000) Unlock("tabhidden");
});

// скролл до конца
On(window, "scroll", () => {
  if(window.scrollY + window.innerHeight >= document.body.scrollHeight - 50){
    Unlock("scroll");
  }
}, { passive: true });

// клавиатура / клики / мышь
let keyCount = 0, clickCount = 0, mouseDist = 0, lastMX = 0, lastMY = 0;
On(document, "keydown", () => { if(++keyCount >= 100) Unlock("keydown"); });
On(document, "click",    () => { if(++clickCount >= 100) Unlock("clicker"); });
On(document, "mousemove", e => {
  if(lastMX) mouseDist += Math.hypot(e.clientX - lastMX, e.clientY - lastMY);
  lastMX = e.clientX; lastMY = e.clientY;
  if(mouseDist >= 10000) Unlock("mover");
}, { passive: true });

// термометр (наблюдение 1 мин)
let tempObs = 0;
Every(() => { if(++tempObs >= 60) Unlock("temperature"); }, 1000);
  }

  // ============ СТРАНИЦА ============
  return ELEMENT_SITE(
    `<style>
    #cb-wrap { max-width: 980px; margin: 0 auto; position: relative; }
    #cb-wrap h1 { text-align: center; }
    #cb-wrap a[data-open] { cursor: pointer; }
    .cb-quote { border-left: 3px solid #00ccff; padding: 6px 12px; margin: 12px 0; background: rgba(0,204,255,.08); color: #bde7ff; font-style: italic; }
    .cb-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 14px 0; }
    .cb-card { border: 1px solid #00ccff55; background: rgba(0,31,51,.6); padding: 10px 12px; border-radius: 6px; }
    .cb-card b { color: #00ccff; }
    .cb-badge { display: inline-block; padding: 1px 6px; border: 1px solid currentColor; font: 10px 'Courier New', monospace; letter-spacing: 1px; }
    .cb-badge.ok { color: #7aff9a; }
    .cb-badge.warn { color: #ffd966; }
    .cb-badge.bad { color: #ff4d7a; }

    /* термометр */
    #cb-thermo-wrap { margin: 16px 0; padding: 12px; border: 1px solid #00ccff; background: rgba(0,20,35,.7); border-radius: 8px; }
    #cb-thermo-bar { height: 18px; background: #03121c; border: 1px solid #005577; overflow: hidden; position: relative; }
    #cb-thermo-fill { height: 100%; width: 0%; background: linear-gradient(90deg,#00ccff,#ffd966,#ff0044); transition: width .2s linear; }
    #cb-thermo-val { font: 14px 'Courier New', monospace; color: #bde7ff; margin-top: 6px; }
    #cb-thermo-val b { color: #ffd966; }
    #cb-thermo-val.crit b { color: #ff0044; text-shadow: 0 0 10px #ff0044; }
    #cb-cool-btn, #cb-cool-btn-game, #cb-game-start {
      all: unset; cursor: pointer; padding: 6px 14px; border: 1px solid #00ccff;
      background: linear-gradient(180deg,#003a55,#001f33); color: #bde7ff;
      font: 13px 'Courier New', monospace; letter-spacing: 2px; user-select: none;
    }
    #cb-cool-btn:hover, #cb-cool-btn-game:hover, #cb-game-start:hover { background: #005577; color: #fff; box-shadow: 0 0 12px #00ccff; }
    #cb-cool-btn:active, #cb-cool-btn-game:active, #cb-game-start:active { transform: translateY(1px); }

    /* двоичный поток */
    #cb-bytes {
      font: 11px 'Courier New', monospace;
      color: #66ffff; word-break: break-all; line-height: 1.4;
      height: 160px; overflow: hidden; padding: 8px;
      background: rgba(0,10,20,.6); border: 1px solid #00ccff44; border-radius: 6px;
      position: relative;
    }
    #cb-bytes::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, transparent 60%, rgba(0,10,20,.95));
      pointer-events: none;
    }
    #cb-signal {
      margin-top: 8px; padding: 8px; min-height: 44px; cursor: pointer;
      font: 11px 'Courier New', monospace; color: #ffd966; word-break: break-all;
      border: 1px dashed #ffd96688; border-radius: 6px; background: rgba(60,45,0,.25);
    }
    #cb-signal:hover { background: rgba(60,45,0,.45); }
    #cb-signal.flash { background: rgba(255,217,102,.3); }

    /* BIOS-консоль */
    #cb-term { margin: 16px 0; }
    #cb-term-out {
      height: 220px; overflow-y: auto; padding: 10px;
      background: #000a12; border: 1px solid #00ccff; border-radius: 6px 6px 0 0;
      font: 12px 'Courier New', monospace; color: #7aff9a;
      white-space: pre-wrap; scrollbar-width: thin; scrollbar-color: #005577 #000a12;
    }
    #cb-term-out .err { color: #ff4d7a; }
    #cb-term-out .warn { color: #ffd966; }
    #cb-term-out .dim { color: #5a8a9a; }
    #cb-term-in {
      width: 100%; box-sizing: border-box; padding: 8px 10px;
      background: #001522; border: 1px solid #00ccff; border-top: none; border-radius: 0 0 6px 6px;
      color: #bde7ff; font: 13px 'Courier New', monospace; outline: none;
    }
    #cb-term-in::placeholder { color: #3a6a7a; }

    /* мини-игра */
    #cb-game { margin: 16px 0; padding: 12px; border: 1px dashed #00ccff; border-radius: 8px; background: rgba(0,31,51,.5); }
    #cb-game .cb-card { margin-bottom: 8px; }
    #cb-game-cv {
      display: block; width: 100%; height: 300px; margin: 8px 0;
      background: linear-gradient(180deg,#000a12,#03202f); border: 1px solid #00ccff55; border-radius: 6px;
      cursor: crosshair; user-select: none; touch-action: manipulation;
    }
    #cb-game-score { font: 20px 'Courier New', monospace; color: #ffd966; text-shadow: 0 0 10px #ffd966; }
    #cb-game-status { font: 12px 'Courier New', monospace; color: #7aff9a; }
    .cb-gbars small { font: 11px 'Courier New', monospace; color: #8cc3e3; }
    .cb-gbar { position: relative; height: 12px; background: #03121c; border: 1px solid #005577; overflow: hidden; margin: 3px 0 8px; }
    #cb-g-bar { height: 100%; width: 44%; background: #7aff9a; }
    #cb-g-cool { height: 100%; width: 100%; background: #00ccff; }
    .cb-gzone { position: absolute; top: 0; bottom: 0; left: 31.25%; width: 43.75%; border-left: 1px dashed #7aff9a; border-right: 1px dashed #7aff9a; pointer-events: none; }
    .cb-gbtns { display: flex; gap: 8px; flex-wrap: wrap; }

    /* достижения */
    #cb-ach .cb-ach { font: 12px 'Courier New', monospace; color: #5a8a9a; }
    #cb-ach .cb-ach b { color: #5a8a9a; }
    #cb-ach .cb-ach.got { border-color: #ffd96688; color: #ffd966; background: rgba(60,45,0,.3); }
    #cb-ach .cb-ach.got b { color: #ffd966; }

    /* тосты */
    #cb-toasts { position: fixed; right: 14px; bottom: 14px; z-index: 9999; display: flex; flex-direction: column; gap: 6px; pointer-events: none; }
    #cb-toasts .cb-toast {
      background: rgba(0,31,51,.95); border: 1px solid #00ccff; color: #e6f7ff;
      padding: 8px 12px; border-radius: 8px; font: 13px 'Courier New', monospace;
      box-shadow: 0 0 12px rgba(0,204,255,.4); animation: cbToast .3s ease-out;
    }
    @keyframes cbToast {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
    }
    @keyframes cbShake {
    0% { transform: translate(0,0); }
    25% { transform: translate(-5px,3px); }
    50% { transform: translate(5px,-3px); }
    75% { transform: translate(-4px,-2px); }
    100% { transform: translate(0,0); }
    }
    @keyframes cbFlash {
    0% { box-shadow: inset 0 0 0 rgba(255,60,40,0); }
    40% { box-shadow: inset 0 0 90px rgba(255,60,40,.55); }
    100% { box-shadow: inset 0 0 0 rgba(255,60,40,0); }
    }
    #cb-wrap.cb-melt { animation: cbShake .12s linear infinite; filter: saturate(1.8) hue-rotate(-25deg); }
    #cb-wrap.cb-spike { animation: cbFlash .6s ease-out; }

    /* аудио и снег */
    #cb-audio-btn, #cb-snow-btn {
      all: unset; cursor: pointer; padding: 4px 10px; border: 1px solid #00ccff;
      color: #bde7ff; font: 12px 'Courier New', monospace; margin-left: 6px;
    }
    #cb-audio-btn:hover, #cb-snow-btn:hover { background: #003a55; color: #fff; }

    /* секретный режим */
    body.cb-frozen { background: #000a12 !important; }
    body.cb-frozen #cb-wrap { filter: hue-rotate(180deg); }
    body.cb-frozen #cb-wrap .crybird_h { color: #00ffff; text-shadow: 0 0 12px #00ffff, 0 0 24px #00ffff; }
    </style>

    <div id="cb-wrap">
    <h1 class="glitch4" style="text-align: center;">🌀 CRY-BIRD: Дополнительный Посол <u>GOLU</u> 🌀</h1>
    <center><h3 style="color:white;">ПРИЛОЖЕНИЕ: crybird.lit <span class="cb-badge ok">ONLINE</span> <button id="cb-audio-btn" type="button" title="вкл/выкл тему">♪</button><button id="cb-snow-btn" type="button" title="вкл/выкл снег">❄ СНЕГ</button></h3></center>

    <p>
      В недрах <a>Lithium Universe</a> родился он — 🐦 01 CRY-BIRD 01 🐦, хранящий ХОЛОД кулерных-ветров и остужающий пылающего 🧽 <a data-open="sranspang">SRANSPAN</a> 🧽<br>
      Его задача → контроль | охлаждение | предотвращение перегрева задач через разум | остановка вредоносных вылетов
    </p>

    <div class="cb-quote">
      «Я не уничтожаю → Я анализирую. Я не борюсь → Я переосмысляю. Я — стек, а не регистр.»
    </div>

    <div class="cb-grid">
      <div class="cb-card"><b>ПРОТОКОЛ ZILOG</b><br>Z80-совместимый поток инструкций, но с «эмпатическим» прерыванием на каждом 7-м такте.</div>
      <div class="cb-card"><b>ТЕНЕВЫЕ ЛОГИКИ MOTOROLA 68000</b><br>Каждое решение проходит через теневой регистр: «а что, если наоборот?»</div>
      <div class="cb-card"><b>КРИСТАЛЛ L1-КЕША</b><br>Внутри каждого ПЕР0 — фотонный кристалл. Он хранит не данные, а <i>состояния спокойствия</i>.</div>
      <div class="cb-card"><b>ДВОИЧНЫЙ ЛОГОС</b><br>Каждое слово CRY-BIRD — поток байтов. Он не говорит; он <i>транслирует</i>.</div>
    </div>

    <hr style="color:#00CCFF;">

    <div id="cb-thermo-wrap">
      <h2 class="crybird_h" style="text-align:center;margin-top:0;">🧊 ТЕРМОМЕТР SRANSPAN.LIT 🧊</h2>
      <div id="cb-thermo-bar"><div id="cb-thermo-fill"></div></div>
      <div id="cb-thermo-val">ТЕМПЕРАТУРА: <b>40.0°C</b> · статус: <span id="cb-thermo-status">NOMINAL</span></div>
      <div style="margin-top:8px;">
        <button id="cb-cool-btn" type="button">❄ ОХЛАДИТЬ ❄</button>
      </div>
    </div>

    <section5>
      <h2 class="crybird_h" style="text-align: center;">============ 🧊 Охлаждение Искушённого 🧊 ============</h2>
      <p>
        🧽 <a data-open="sranspang">poopy sponge)))</a> 🧽 = часто перегревается от поставленных задач!!! Что посылает CRYBIRD сигнал | ❄️ <text style="font-size:0.7em; color:yellow;">ATTENTION, CRITICAL PROCESS TEMPERATURE SRANSPANG.LIT!</text> ❄️<br>
        CRYB1RD разворачивает &lt;крылья&gt; и сбрасывает t° ядра процессора СРАНОГО СПАНЧА до 160°C<br>
        <center>❄️❄️❄️ но каждое его слово — это поток двоичного логоса ❄️❄️❄️</center>
      </p>
      <div id="cb-bytes">01001101 01101001 ...</div>
      <center><small class="cb-badge warn">LIVE · поток обновляется</small></center>
      <p class="cb-quote">📡 Перехваченный сигнал (клик → в консоль, затем <code2>Enter</code2>). Расшифруй его командой <code2>decode</code2>:</p>
      <div id="cb-signal">ожидание сигнала...</div>
      <h2 class="crybird_h" style="text-align: center;">============ 🧊 Охлаждение Искушённого 🧊 ============</h2>
    </section5>

    <section5>
      <h2 class="crybird_h">%💻% КОНСОЛЬ BIOS^CRYBIRD %💻%</h2>
      <p class="cb-quote">Доступные команды: <code2>help</code2> · <code2>status</code2> · <code2>cool</code2> · <code2>sranspang</code2> · <code2>golu</code2> · <code2>null</code2> · <code2>clear</code2> · <code2>decode</code2> · <code2>game</code2> · <code2>snow</code2> · ... (всё в <code2>help</code2>)</p>
      <div id="cb-term">
        <div id="cb-term-out"></div>
        <input id="cb-term-in" type="text" placeholder="введите команду и нажмите Enter..." autocomplete="off" autocapitalize="off" spellcheck="false">
      </div>
    </section5>

    <section5>
      <h2 class="crybird_h">%🎮% ОСТУДИ SRANSPAN %🎮%</h2>
      <div id="cb-game">
        <div class="cb-card">
          <b>КАК ИГРАТЬ:</b> 🔥 горячие задачи летят к 🧽 — <b>кликай по ним</b>, каждая даёт очки, подряд убитые копят комбо (до ×6). ❄ даёт хладагент. 🐞 баг — не трогай (+15°C). 💎 литий включает режим ZEN.
          <b>❄ ОХЛАДИТЬ</b> или <b>Пробел</b> снижает t° на 16°C и тратит хладагент. Держи <b>50–120°C</b> — очки капают сами. Выше 160°C — SIGTERM, ниже 0°C — заморозка. Каждые 15 секунд — новая волна.
        </div>
        <canvas id="cb-game-cv" height="300"></canvas>
        <div class="cb-gbars">
          <small>t° ядра: <span id="cb-g-temp">70°C</span> · зелёная рамка = зона очков</small>
          <div class="cb-gbar"><div id="cb-g-bar"></div><span class="cb-gzone"></span></div>
          <small>хладагент</small>
          <div class="cb-gbar"><div id="cb-g-cool"></div></div>
        </div>
        <div class="cb-card">
          Очки: <span id="cb-game-score">0</span> · Рекорд: <span id="cb-game-best">0</span> · Статус: <span id="cb-game-status">готов</span>
        </div>
        <div class="cb-gbtns">
          <button id="cb-game-start" type="button">▶ СТАРТ</button>
          <button id="cb-cool-btn-game" type="button">❄ ОХЛАДИТЬ ❄</button>
        </div>
      </div>
    </section5>

    <section5>
      <h2 class="crybird_h">%🏆% ДОСТИЖЕНИЯ <span id="cb-ach-cnt"></span> %🏆%</h2>
      <div class="cb-grid" id="cb-ach"></div>
    </section5>

    <section5>
      <h2 class="crybird_h">%📜% Манифест CRY-B1RD %📜%</h2>
      <p><i>"Я не уничтожаю → Я анализирую & Я не борюсь → Я переосмысляю & Я - стек → а не регистр"</i></p>
      <hr style="color:#00CCFF;">
      <p>
        Его алгоритмы — это:<br><br>
        <img id="cb-bird" style="float: right; width:256px; cursor:pointer; filter: drop-shadow(0 0 100px rgba(0, 128, 255, 1)); margin-left: 10px; animation: crybird 0.5s linear infinite alternate;" src="crybird.png" alt="CRY-BIRD">
        <code2>
          if (lit->task.overheated){ crybird->extra_cool(lit->task); }<br>
          while (!lit->task.stable){ crybird->optimize(lit->task); }
        </code2>
      </p>
      <hr style="color:#00CCFF;">
      <h2 class="crybird_h">%🔧% Аппаратная Легенда %🔧%</h2>
      <ul>
        <li>Основан на кремниевых пикселях Intel 4004</li>
        <li>Крылья охлаждаются нитридами галлия (GaN)</li>
        <li>Реестр памяти: 4.5GHz такт по сердцу</li>
        <li>Логика: CMOS-протоколы + литуимские примеси 😳</li>
        <li><span class="cb-badge ok">NEW</span> Дополнительный контур охлаждения: <i>фотонный L1-кеш</i></li>
      </ul>
      <hr style="color:#00CCFF;">
      <h2 class="crybird_h">%🧠% Литуизмский Тест %🧠%</h2>
      <p>
        <b>⨀ЛИТ⨀КОД⨀</b><br>
        <code2>
          sig.pci → decode.ltx(GOLU → CRYBIRD);<br>
          ltx::слово(биты) → речь; // трансляция для GOLU
        </code2>
      </p>
      <p>
        <b>Слово из оффициальной википедии по литуизму:</b><br>
        <i>"ꙮгреК-сихан-тха℧клит || крйбрд -- (возврат) хс - тх - думай! 🧿🧿 XDDD"</i><br>
        *Отказ почек*
      </p>
    </section5>

    <h2 class="crybird_h">📦BOX Конфигурация BIOS^CRYBIRD 📦BOX</h2>
    <pre2>
      0x00 → Инициализация эмпатии<br>
      0x01 → Запуск анализа задачи<br>
      0x02 → Сравнение температур мысли<br>
      0x03 → Передача отчёта GOLU<br>
      0xFF → Спокойствие //Sleep
    </pre2>

    <br>
    <center>
      CRYBIRD не судит; Он смотрит; Он ждет, когда ты сам осознаешь null-pointer своей жизни;<br>
      Где везде в мире используют <code>i++</code>, он иногда выбирает <code>--i</code> — чтобы дать тебе шанс.
    </center>

    <br><br>

    <footer>
      <p>✴ Generated by Woowava™ (GOLU незамечен)</p>
      <p>Core verified. Blood-Power integrity: 16% 🩸. MANIFEST_VERSION: ${typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "v2.0"}</p>
    </footer>

    <div id="cb-toasts"></div>
    </div>

    <audio id="AUTOPLAY" loop>
      <source src="crybird-theme.mp3" type="audio/mpeg">
    </audio>`,
    function(){},
    false,
    Live
  );
});