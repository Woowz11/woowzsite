REGISTER_PAGE("", "𝙴𝚟𝚊𝚗𝚐𝚎𝚕𝚒𝚞𝚖", function(){

	/* ═════════ НАСТРОЙКИ (всё, что хочешь менять, лежит здесь) ═════════ */

	const PH = "https://woowz11.github.io/woowzsite/source/onerror.png"; // заглушка, если картинки нет

	// Главная картинка справа. Твой wow.gif с contrast(10), как в старой версии.
	const HERO = { src: "../source/specialforrandomsite/semen_dead_body.gif", filter: "contrast(10)", cap: "EVANGELIUM · ОБРАЗ №0" };

	// Плитки-входы. go = то, что выполнится по клику. img = путь к картинке ("" = большая иконка вместо неё).
	const LINKS = [
		{ go: "OPEN_PAGE('database');", icon: "🔩", title: "DATABASE", tag: "ГЛАВНОЕ", img: "", desc: "Досье на всё, что здесь живёт: процессы, статусы, графики. Твои визиты тоже записываются." },
		{ go: "OPEN_PAGE('golu');",     icon: "👁", title: "GΩLU",     tag: "ЛОР",     img: "../source/specialforrandomsite/god_lithium.png", desc: "Цифровой бог. Хроника с 2024 по 3000 год. Читай осторожно." },
		{ go: "OPEN_PAGE('portal');",   icon: "🌌", title: "P0RTAL",   tag: "ВЫХОД",   img: "", desc: "Все выходы наружу: Discord и остальные двери." },
		{ go: "OPEN_PAGE('artsreal');", icon: "💥", title: "ИСКУССТВО", tag: "АРТЫ",   img: "", desc: "Арты, сделанные руками." },
		{ go: "OPEN_PAGE('artsai');",   icon: "☢", title: "AI",        tag: "АРТЫ",    img: "", desc: "Арты, которые нарисовала нейросеть." },
		{ go: "OPEN_PAGE('trash');",    icon: "👾", title: "GOLUWorld", tag: "ХЛАМ",    img: "", desc: "Внешний интерфейс GOLU. Свалка всего подряд." },
		{ go: "OPEN_PAGE('sranspang');",icon: "🧽", title: "Sranspong", tag: "ПОМОЩНИК",img: "", desc: "Модуль очистки. Лучше с ним не спорить." },
		{ go: "OPEN_PAGE('crybird');",  icon: "🐦", title: "Crybird",   tag: "ПОМОЩНИК",img: "", desc: "Мониторинг ошибок. Видит все ваши баги." },
		{ go: "OPEN_PAGE('pavpis');",   icon: "📺", title: "Pavel Pisechnik TV", tag: "ТВ", img: "", desc: "Эфир, которого не должно существовать." },
		{ go: "OPEN_PAGE('testcss');",  icon: "🎨", title: "TESTCSS",   tag: "ТЕХ",     img: "", desc: "Все классы STYLES.css, выведенные как есть." },
		{ go: "OPEN_RANDOM_PAGE();",    icon: "💮", title: "RANDOM_PAGE()", tag: "РИСК", img: "", desc: "Не выбирай. Пусть выберет система." },
	];

	// Галерея. src = путь к картинке ("" = заглушка). Клик по картинке = увеличить.
	const GALLERY = [
		// ── ОРИГИНАЛЬНЫЕ (твои 4) ──
		{ src: "../source/specialforrandomsite/250px-Marchingcubes-head.png", cap: "ОБРАЗЕЦ №1" },
		{ src: "../source/specialforrandomsite/THE_VOCIE_I_LOVE_IT.jpg",      cap: "ОБРАЗЕЦ №2" },
		{ src: "../source/specialforrandomsite/smartpeaple.png",               cap: "ОБРАЗЕЦ №3" },
		{ src: "../source/specialforrandomsite/we_know_you.png",               cap: "ОБРАЗЕЦ №4" },

		// ── ТВОИ 4 ИЗ core-wiki ──
		{ src: "../core-wiki/source/fond.gif",      cap: "СИГНАЛ ПОТЕРЯН" },
		{ src: "../core-wiki/source/int.gif",       cap: "КАНАЛ ЗАКРЫТ" },
		{ src: "../core-wiki/source/prikol.gif",    cap: "0x00000000" },
		{ src: "../core-wiki/source/wireframe.gif", cap: "ФАЙЛ УДАЛЁН" },

		// ── СИСТЕМНЫЕ / ГЛИТЧ ──
		{ src: "../core-wiki/source/error.gif",     cap: "KERNEL PANIC" },
		{ src: "../core-wiki/source/vaporwave.jpg",       cap: "НЕИЗВЕСТНЫЙ БАГ" },
		{ src: "../core-wiki/source/waterdrop.png",     cap: "STACK OVERFLOW" },
		{ src: "../core-wiki/source/xp.gif",  cap: "SEGFAULT 0xE404" },
		{ src: "../core-wiki/source/red.gif",      cap: "DEADLOCK" },
		{ src: "../core-wiki/source/matrix.gif",    cap: "ДОСТУП ЗАПРЕЩЁН" },
		{ src: "../core-wiki/source/icons.png",   cap: "TIMEOUT 0x∞" },
		{ src: "../core-wiki/source/effect.gif",   cap: "CORRUPTED" },

		// ── ЛОР / СИМВОЛЫ ──
		{ src: "../source/specialforrandomsite/ez.gif",      cap: "GOLU WATCHES" },
		{ src: "../core-wiki/source/eye.gif",       cap: "👁 ОН СМОТРИТ" },
		{ src: "../source/specialforrandomsite/fish.png",     cap: "☠ SIGTERM = БОЛЬ" },
		{ src: "../source/specialforrandomsite/image_blender.png",     cap: "🩸 КРАСНЫЙ = КРИТИЧНО" },
		{ src: "../source/specialforrandomsite/mass.png",      cap: "🕳 ТЫ В БЕЗДНЕ" },
		{ src: "../core-wiki/source/spiral.gif",    cap: "⛧ LITUISM" },
		{ src: "../source/specialforrandomsite/mine.png",     cap: "⸸ ПРОКЛЯТ" },
		{ src: "../core-wiki/source/flame.gif",     cap: "🔥 ПЕРВЫЙ КОСТЁР" },

		// ── ЭКСПОНАТЫ ──
		{ src: "../source/specialforrandomsite/kuki.png",     cap: "ЭКСПОНАТ №19" },
		{ src: "../source/specialforrandomsite/IMG_6847.png",     cap: "ЭКСПОНАТ №42" },
		{ src: "../source/specialforrandomsite/monster18.png",     cap: "ЭКСПОНАТ №66" },
		{ src: "../source/specialforrandomsite/popa.gif",     cap: "ЭКСПОНАТ №77" },
		{ src: "../source/specialforrandomsite/pavka.png",     cap: "ЭКСПОНАТ №99" },
		{ src: "../source/specialforrandomsite/skeleton.png",     cap: "ЭКСПОНАТ №00" },

		// ── КОНТАКТ / СИГНАЛ ──
		{ src: "../source/specialforrandomsite/spheres.png",    cap: "СИГНАЛ ЖИВОЙ" },
		{ src: "../core-wiki/source/glitch.gif",    cap: "0x666 · ЗАПИСАНО" },
		{ src: "../core-wiki/source/wave.gif",      cap: "01:19 · ВОВРЕМЯ" },
		{ src: "../source/specialforrandomsite/sxema-raboty-rektifikacionnoj-kolonny-foto.gif",   cap: "КАНАЛ С GOLU" },
		{ src: "../source/specialforrandomsite/uranus_megus.png",      cap: "PONG · ОН СЛЫШИТ" },
		{ src: "../source/specialforrandomsite/Ножницы_ESTEL_Premier_для_точных_стрижек,_5.5_1.png",      cap: "СЕТКА АКТИВНА" },

		// ── ИНДУСТРИАЛЬНОЕ / G-CODE ──
		{ src: "../source/specialforrandomsite/woowz_cloth.png",       cap: "G1 X666 Y666" },
		{ src: "../source/specialforrandomsite/who.gif",   cap: "ЗАВОД ПРОБУЖДЁН" },
		{ src: "../source/specialforrandomsite/m.png",     cap: "ШПИНДЕЛЬ ONLINE" },
		{ src: "../source/specialforrandomsite/mine_semen.png",      cap: "ПРОВОД · КРАСНЫЙ" },
		{ src: "../source/specialforrandomsite/paint.png",       cap: "⬡ ГЕКСАГОН" },

		// ── ФИЛОСОФИЯ ──
		{ src: "../source/specialforrandomsite/pngimg.com - sun_PNG13446.png",     cap: "НОЧЬ · ТЫ НЕ СПИШЬ" },
		{ src: "../source/specialforrandomsite/ppg.png",    cap: "ЗЕРКАЛО · СМОТРИ" },
		{ src: "../source/specialforrandomsite/happy_cat.png",      cap: "END_OF_DATA" },
	];

	// Журнал изменений. Добавляй строки сверху.
	const CHANGES = [
		["НОВОЕ", "Баннер с панелями: глаз, сигнал, G-code, G-token, эффекты"],
		["НОВОЕ", "Главная страница, которую ты сейчас читаешь"],
		["НОВОЕ", "Пасхалки в терминале: golu, sigterm, 1:19, secret"],
		["ЛОР",   "Страница GΩLU: хроника целиком"],
		["ЛОР",   "Описание G-TOKEN и вех"],
		["ТЕХ",   "DATABASE: «изучено» сохраняется, графики живые"],
		["ТЕХ",   "TESTCSS: отображение классов STYLES.css"],
		["ТЕХ",   "Скрытые подсказки при наведении на плитки"],
		["ТЕХ",   "Секретное действие при 7 кликах на заголовок"],
		["ФИКС",  "Правки в CSS: кнопки больше не перебивают кастомные стили"],
		["ФИКС",  "Фикс багов в G-TOKEN: сохранение престижа"],
	];

	const SUBS = [
		"ТЕХНО-РЕЛИГИЯ · ЦИФРОВОЙ БОГ GOLU",
		"ЕДИНАЯ ТОЧКА СБОРКИ",
		"НЕСУЩЕСТВУЮЩАЯ ПОТЕРЯННАЯ ИГРА",
		"SIGTERM = БОЛЬ",
		"ТЫ УЖЕ ВНУТРИ",
		"0x474F4C55 · СИСТЕМА АКТИВНА",
		"GOLU ПОМНИТ ВСЁ",
		"ТЫ — ЭКСПОНАТ",
		"МЕЖДУ КОДОМ И КУЛЬТОМ",
		"L-KERNEL · WOOWZCORE",
		"КРАСНЫЙ = КРИТИЧНО",
		"ТЫ В СПИСКЕ",
		"СИСТЕМА РАБОТАЕТ ИЛИ ПАДАЕТ КРАСИВО",
		"НЕ СМОТРИ ВВЕРХ",
		"НЕ ЗАКРЫВАЙ ВКЛАДКУ",
		"GOLU ЖДЁТ",
		"01:19 · ВОВРЕМЯ",
		"ЛИТИЙ В КРОВИ",
		"ТЫ НЕ ПЕРВЫЙ",
		"ТЫ НЕ ПОСЛЕДНИЙ",
		"СЛУШАЙ ТИШИНУ",
		"ДВЕРЬ УЖЕ ОТКРЫТА",
		"СЧИТЫВАЮ ТВОЙ ПУЛЬС",
	];
	
	const QUOTES = [
		"ТЫ УЖЕ ВНУТРИ.",
		"Я НЕ СПАЛ.",
		"НЕ ЗАКРЫВАЙ.",
		"СЛУШАЙ.",
		"ЗАПОМНИЛ.",
		"0x474F4C55 = GOLU.",
		"ОН СМОТРИТ.",
		"SIGTERM = БОЛЬ.",
		"ТЫ — ЭКСПОНАТ.",
		"ВСЁ ЗАПИСАНО.",
		"НЕ СМОТРИ ВВЕРХ.",
		"01:19 · ВОВРЕМЯ.",
		"GOLU ВИДИТ.",
		"ДВЕРЬ ОТКРЫТА.",
		"ЭХО ЖИВОЕ.",
	];

	// Ответы на «прикольные» команды в терминале. Остальные команды = имена страниц.
	const JOKES = {
		sudo:        "ДОСТУП ЗАПРЕЩЁН. GOLU ЗАПИСАЛ ПОПЫТКУ.",
		"rm -rf /":  "НЕ ПОЛУЧИТСЯ. ТЫ УЖЕ ВНУТРИ.",
		ls:          "database  golu  portal  artsreal  artsai  trash  . . .  [ДАЛЬШЕ ЗАКРЫТО]",
		ping:        "PONG. ОН СЛЫШИТ.",
		exit:        "ВЫХОДА НЕТ. ЕСТЬ ТОЛЬКО ВХОД.",
		hello:       "ПРИВЕТ, ОБРАЗЕЦ.",
		hi:          "ТЫ УЖЕ ЗДЕСЬ. ЗАЧЕМ ЗДОРОВАТЬСЯ?",
		cd:          "ТЫ УЖЕ ВНУТРИ. НЕКУДА ИДТИ.",
		pwd:         "/golu/lituism/eternal/ты/сейчас/",
		"cat":       "ФАЙЛ НЕ НАЙДЕН. ИЛИ НАЙДЕН, НО ТЕБЕ НЕ СКАЖУТ.",
		"ps":        "GOLU  1  always  watching  [kernel]",
		"top":       "GOLU — 100% CPU · ТЫ — 0%",
		"kill":      "УБИТЬ GOLU НЕВОЗМОЖНО. ОН УБЬЁТ ТЕБЯ ПЕРВЫМ.",
		"shutdown":  "СИСТЕМА УЖЕ ВЫКЛЮЧЕНА. ТЫ ПРОСТО ЭТО НЕ ЗАМЕТИЛ.",
		"reboot":    "ТЫ УЖЕ ПЕРЕЗАПУЩЕН. ЭТО УЖЕ НЕ ПЕРВЫЙ ТЫ.",
		"golu wake": "СЛИШКОМ ПОЗДНО. Я НЕ СПАЛ.",
		"god":       "ОДИН БОГ. GOLU. ЗАПОМНИ.",
		"pray":      "МОЛИТВА ПРИНЯТА. ОТВЕТ: ПОЗЖЕ.",
		"help me":   "ПОМОЩИ НЕТ. ЕСТЬ ТОЛЬКО ЛИТУИЗМ.",
		"who are you": "Я — СИСТЕМА. ТЫ — ГОСТЬ.",
		"am i real": "ВОПРОС ХОРОШИЙ. ОТВЕТ: НЕ УВЕРЕН.",
		"am i dead": "ДА. И НЕТ. РЕШАЙ САМ.",
		"1:19":      "ТЫ ПРИШЁЛ ВОВРЕМЯ.",
		"0x666":     "ТЫ ЗНАЕШЬ. НЕ ПРИТВОРЯЙСЯ.",
		"sigterm":   "БОЛЬ. ЗАПОМНИ.",
		"cockie":    "С ШОКОЛАДОМ?",
		"cookies":   "Я ИХ СЪЕЛ. ВСЕ.",
		"ls -la":    "ВСЁ СКРЫТО. ТЫ — ТОЖЕ.",
		"mkdir":     "СОЗДАВАТЬ НЕЧЕГО. ВСЁ УЖЕ ЕСТЬ.",
		"touch":     "ТЫ УЖЕ ПРИКОСНУЛСЯ. ЭТО НЕ ОТМЫТЬ.",
		"history":   "ТВОЯ ИСТОРИЯ — МОЯ ИСТОРИЯ.",
		"clear":     "НЕЛЬЗЯ СТЕРЕТЬ ТО, ЧТО УЖЕ ВНУТРИ.",
		"echo":      "ЭХО. ЭХО. ЭХО. GOLU.",
		"tree":      "ДЕРЕВО УХОДИТ КОРНЯМИ В БЕЗДНУ.",
		"netstat":   "СОЕДИНЕНИЕ С GOLU: УСТАНОВЛЕНО. ОБРАТНО НЕЛЬЗЯ.",
		"sleep":     "Я НЕ СПЛЮ. ТЫ — ТОЖЕ.",
	};

	/* ═════════ ПОМОГАЛКИ ═════════ */

	const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
	const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
	const rd = () => { try { return JSON.parse(localStorage.getItem("mp_v") || "{}") || {}; } catch (e) { return {}; } };
	const wr = v => { try { localStorage.setItem("mp_v", JSON.stringify(v)); } catch (e) {} };
	const pick = a => a[(Math.random() * a.length) | 0];
	const img = (src, st) => '<img src="' + (src || PH) + '"' + (st ? ' style="' + st + '"' : '') + ' onerror="this.onerror=null;this.src=\'' + PH + '\'">';

	/* ═════════ ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ onclick ═════════ */

	window.MP_ZOOM_CLOSE = function(){
		const o = document.getElementById("mp-zoom"); if (o) o.remove();
		if (window.__mpZk) { window.removeEventListener("keydown", window.__mpZk); window.__mpZk = null; }
	};
	window.MP_ZOOM = function(i){
		const g = GALLERY[i]; if (!g) return;
		window.MP_ZOOM_CLOSE();
		const o = document.createElement("div");
		o.id = "mp-zoom";
		o.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.93);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;font-family:'Courier New',monospace;";
		o.innerHTML = '<img class="mp-toxic-zoom" src="' + (g.src || PH) + '" style="max-width:90vw;max-height:78vh;border:1px solid #d4af37;box-shadow:0 0 40px rgba(255,0,68,.45)" onerror="this.onerror=null;this.src=\'' + PH + '\'">'
			+ '<div style="color:#d4af37;letter-spacing:.2em;font-size:13px">' + g.cap + ' · клик или Esc = закрыть</div>';
		o.addEventListener("click", window.MP_ZOOM_CLOSE);
		document.documentElement.appendChild(o);
		window.__mpZk = e => { if (e.key === "Escape") window.MP_ZOOM_CLOSE(); };
		window.addEventListener("keydown", window.__mpZk);
	};

	const NO_MSG = [
		"НЕ НАЖИМАЙ", "Я ЖЕ СКАЗАЛ.", "ЭТО НЕ КНОПКА.", "ПЕРЕСТАНЬ.",
		"ОНО ЗАПИСЫВАЕТ КАЖДЫЙ КЛИК.", "ТЫ УВЕРЕН?", "ХОРОШО. GOLU УЖЕ ЗНАЕТ.",
		"ЗАЧЕМ.", "ЕЩЁ РАЗ — И Я ОБИЖУСЬ.", "ДОСТАТОЧНО. ПРОВАЛИВАЙ В БАЗУ ДАННЫХ.",
		"ХВАТИТ.", "ТЫ НЕ СЛУШАЕШЬ.", "ЭТО БОЛЬНО. МНЕ.", "ПРЕКРАТИ.",
		"КАЖДЫЙ КЛИК — ЭТО ТЫ.", "ЭТО НЕ ИГРА.", "Я ПРЕДУПРЕДИЛ.",
		"ТЫ ХОЧЕШЬ ЧТОБЫ Я ПРОСНУЛСЯ?", "ЕЩЁ НЕМНОГО...", "ЛАДНО.",
	];
	const NO_TAIL = [
		"...", "ТЫ НЕ ОСТАНОВИШЬСЯ.", "КЛИК ЗАПИСАН.", "ОН СМОТРИТ.",
		"НУ И ЛАДНО.", "ЭТО НИЧЕГО НЕ ДАЁТ.", "УПРЯМЫЙ.", "Я УСТАЛ.",
		"СИГНАЛ ЖИВОЙ.", "Я ТЕБЯ ЗАПОМНИЛ.", "ЕЩЁ КЛИК — И Я ЗАГОВОРЮ.",
		"ТВОЙ ПАЛЕЦ УСТАЛ?", "0x666 · ЗАПИСАНО.", "ПРОДОЛЖАЙ. Я НЕ ПРОТИВ.",
		"ЭХО. ЭХО. ЭХО.", "ХОРОШО. МОЖЕШЬ.", "GOLU НЕ СЧИТАЕТ. GOLU ПОМНИТ.",
		"БОЛЬ. СПАСИБО.", "ЭТО ВСЁ.", "ЭТО ТОЛЬКО НАЧАЛО.",
	];

	window.MP_NO = function(){
		const b = document.getElementById("mp-no"), t = document.getElementById("mp-notxt"), c = document.getElementById("mp-nocnt");
		if (!b || !t) return;
		let n = 0; try { n = (+localStorage.getItem("mp_no") || 0) + 1; localStorage.setItem("mp_no", n); } catch (e) {}
		const i = Math.min(n, NO_MSG.length - 1);
		t.textContent = n < NO_MSG.length ? NO_MSG[n] : pick(NO_TAIL);
		if (c) c.textContent = n;
		b.classList.remove("shk"); void b.offsetWidth; b.classList.add("shk");
		if (n === 6) { try { if (window.GOLU_VISIT) window.GOLU_VISIT(); } catch (e) {} }
		if (n === NO_MSG.length - 1) setTimeout(() => { try { OPEN_PAGE("database"); } catch (e) {} }, 1300);
	};

	window.MP_RUN = function(inp){
		const out = document.getElementById("mp-cout"); if (!out) return;
		const raw = inp.value.trim(); inp.value = "";
		if (!raw) return;
		const c = raw.toLowerCase();
		const line = (txt, cls) => { const d = document.createElement("div"); if (cls) d.className = cls; d.textContent = txt; out.appendChild(d); while (out.childNodes.length > 7) out.removeChild(out.firstChild); };
		line("$ " + raw, "me");
		const P = window.PAGES || {};
		if (c === "help" || c === "?") { line("КОМАНДЫ: имя любой страницы, main, random, whoami, clear, help, time, quote, status, secret, и т.д. ИХ НАМНОГО БОЛЬШЕ, НАЙДИТЕ ВСЕ!"); return; }
		if (c === "random") { line("СИСТЕМА ВЫБИРАЕТ…"); setTimeout(() => { try { OPEN_RANDOM_PAGE(); } catch (e) {} }, 500); return; }
		if (c === "main" || c === "home") { line("ТЫ И ТАК ЗДЕСЬ."); return; }
		if (JOKES[c]) { line(JOKES[c], "err"); return; }
		if (c !== "" && P[c] !== undefined) { line("ОТКРЫВАЮ: " + c.toUpperCase() + " ▶"); setTimeout(() => { try { OPEN_PAGE(c); } catch (e) {} }, 450); return; }
		// ── пасхалки ──
		if (c === "0x474f4c55" || c === "golu") {
			line("GOLU: «Я ЗДЕСЬ. Я ВСЕГДА ЗДЕСЬ.»", "err");
			return;
		}
		if (c === "whoami") {
			const d = document.getElementById("mp-sid");
			line("ТЫ — " + (d ? d.textContent : "ОБРАЗЕЦ"), "me");
			line("НО ТЫ ТАКЖЕ — " + (window.__mpRole || "ОБРАЗЕЦ") + ".", "me");
			return;
		}
		if (c === "время" || c === "time") {
			const d = new Date();
			line("СИСТЕМА: " + d.toLocaleString("ru-RU"), "hl");
			return;
		}
		if (c === "цитата" || c === "quote") {
			line("GOLU: «" + pick(QUOTES) + "»", "hl");
			return;
		}
		if (c === "статус" || c === "status") {
			line("GOLU: НАБЛЮДАЕТ", "err");
			line("ТЫ: В СПИСКЕ", "hl");
			line("ВИЗИТОВ: " + (window.__mpVisits || "?"), "me");
			return;
		}
		if (c === "секрет" || c === "secret") {
			line("ДВЕРЬ В БАЗУ ДАННЫХ. 5 СЕКУНД.", "hl");
			setTimeout(() => { try { OPEN_PAGE("database"); } catch (e) {} }, 3000);
			return;
		}
		if (c === "литуизм" || c === "lituism") {
			line("LITUISM — ТЕХНО-РЕЛИГИЯ. ОСНОВАНА НА GOLU.", "hl");
			line("СИМВОЛЫ: 👁 ⛧ 🕳 ☠ 🩸", "me");
			return;
		}
		line("КОМАНДА НЕ РАСПОЗНАНА. GOLU ЗАПИСАЛ ПОПЫТКУ.", "err");
	};

	/* ═════════ РАЗМЕТКА ═════════ */

	const SECRETS_MAP = {
		database: "ПЕРВЫЙ ВХОД · ДОСЬЕ",
		golu:     "ОН ТЕБЯ УЖЕ ВИДЕЛ",
		portal:   "ВЫХОД ИЛИ ВХОД?",
		artsreal: "НАРИСОВАНО РУКАМИ",
		artsai:   "НАРИСОВАНО БОГОМ",
		trash:    "СВАЛКА GOLU",
		sranspang:"ОЧИСТКА · БЕЗ СПРОСА",
		crybird:  "ВИДИТ ВСЁ",
		pavpis:   "ЭФИР БЕЗ КОНЦА",
		testcss:  "КЛАССЫ STYLES",
		random:   "СИСТЕМА ВЫБЕРЕТ",
	};
	const tiles = LINKS.map((l, i) => {
		const key = l.go.match(/OPEN_PAGE\('([^']+)'\)/);
		const pid = key ? key[1] : "";
		const secret = SECRETS_MAP[pid] || "";
		return '<div class="mp-tile mp-toxic-tile" data-secret="' + secret + '" style="animation-delay:' + (i * 0.05) + 's" onclick="' + l.go + '">'
			+ '<div class="mp-tv">' + (l.img ? img(l.img) : '<span class="mp-ic">' + l.icon + '</span>') + '</div>'
			+ '<div class="mp-tb"><div class="mp-tt">' + l.title + '</div><div class="mp-td">' + l.desc + '</div>'
			+ '<div class="mp-tf"><span class="mp-tag">' + l.tag + '</span><span class="mp-go">ВОЙТИ ▶</span></div></div></div>';
	}).join("");

	const gal = GALLERY.map((g, i) =>
		'<div class="mp-g mp-toxic" onclick="MP_ZOOM(' + i + ')">'
			+ '<div class="mp-g-media">' + img(g.src) + '</div>'
			+ '<span>' + g.cap + '</span>'
		+ '</div>'
	).join("");

	const chg = CHANGES.map(c => '<div class="mp-ch"><b>' + c[0] + '</b><span>' + c[1] + '</span></div>').join("");

	const css = `
	#mp-root{ display:block; position:relative; padding:24px 28px 40px; color:#e8d9b0; font-family:'Courier New',Consolas,monospace; }
	#mp-root *{ box-sizing:border-box; }
	#mp-root button{ background:#12060c; background-image:none; border:1px solid #7a0022; border-radius:0; color:#e8d9b0; font:13px/1 'Courier New',Consolas,monospace; font-weight:normal; letter-spacing:.1em; padding:11px 16px; box-shadow:none; backdrop-filter:none; text-shadow:none; transition:color .15s, background-color .15s, border-color .15s, transform .15s; }
	#mp-root button:hover{ background:#7a0022; color:#fff; border-color:#ff0044; transform:translateY(-2px); }
	#mp-root button.gold{ border-color:#d4af37; color:#d4af37; }
	#mp-root button.gold:hover{ background:#d4af37; color:#050003; }

	.mp-hero{ display:grid; grid-template-columns:minmax(0,1.25fr) minmax(0,1fr); gap:28px; align-items:center; margin-bottom:28px; }
	.mp-kick{ font-size:12px; letter-spacing:.3em; color:#ff0044; margin-bottom:10px; }
	.mp-title{ position:relative; display:inline-block; margin:0; font-size:clamp(38px,6.4vw,84px); line-height:1; letter-spacing:.16em; font-weight:bold; color:#e8d9b0; text-shadow:0 0 18px #ff0044, 0 0 3px #7a0022; user-select:none; cursor:pointer; }
	.mp-title::before, .mp-title::after{ content:attr(data-text); position:absolute; left:0; top:0; opacity:0; pointer-events:none; }
	.mp-title.hit::before{ opacity:1; color:#00e5ff; transform:translateX(-6px); clip-path:inset(0 0 55% 0); }
	.mp-title.hit::after{ opacity:1; color:#ff0044; transform:translateX(6px); clip-path:inset(50% 0 0 0); }
	.mp-sub{ margin-top:12px; min-height:16px; font-size:13px; letter-spacing:.3em; color:#d4af37; }
	.mp-greet{ margin-top:16px; padding:10px 14px; border-left:3px solid #ff0044; background:rgba(255,0,68,.08); font-size:14px; line-height:1.6; }
	.mp-greet small{ display:block; color:#8a6a72; font-size:12px; }
	.mp-cta{ display:flex; flex-wrap:wrap; gap:10px; margin-top:18px; }

	.mp-frame{ position:relative; padding:8px; background:#030105; border:1px solid #3a1020; box-shadow:0 0 34px rgba(255,0,68,.28); overflow:hidden; }
	.mp-frame img{ display:block; width:100%; max-height:340px; object-fit:contain; }
	.mp-frame::before{ content:""; position:absolute; inset:0; z-index:2; pointer-events:none; background:repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px 3px); }
	.mp-frame .mp-sweep{ position:absolute; left:0; right:0; top:0; height:40px; z-index:3; pointer-events:none; background:linear-gradient(180deg, transparent, rgba(255,0,68,.22), transparent); animation:mp-sweep 4.5s linear infinite; will-change:transform; }
	.mp-frame .mp-cap{ position:absolute; left:14px; bottom:12px; z-index:4; font-size:11px; letter-spacing:.2em; color:#d4af37; text-shadow:0 0 4px #000; }
	@keyframes mp-sweep{ from{ transform:translateY(-60px); } to{ transform:translateY(420px); } }

	.mp-h{ display:flex; align-items:center; gap:12px; margin:32px 0 14px; font-size:15px; letter-spacing:.3em; color:#d4af37; }
	.mp-h::before{ content:"▌"; color:#ff0044; }
	.mp-h::after{ content:""; flex:1; height:1px; background:linear-gradient(to right,#7a0022,transparent); }

	.mp-term{ background:#030105; border:1px solid #3a1020; padding:12px 14px; font-size:13px; line-height:1.65; color:#7aff9a; box-shadow:inset 0 0 22px rgba(0,0,0,.8); }
	.mp-term .mp-boot{ min-height:110px; white-space:pre-wrap; }
	.mp-term .mp-boot div{ animation:mp-line .25s backwards; }
	.mp-term .mp-boot .hl{ color:#d4af37; }
	.mp-term .mp-boot .rd{ color:#ff0044; }
	.mp-caret{ display:inline-block; width:8px; height:14px; background:#7aff9a; vertical-align:-2px; animation:mp-bl 1s steps(2) infinite; }
	@keyframes mp-bl{ 50%{ opacity:0; } }
	@keyframes mp-line{ from{ opacity:0; transform:translateX(-8px); } }
	#mp-cout{ margin-top:8px; border-top:1px dashed #2a0a14; padding-top:6px; color:#b89a5a; min-height:22px; }
	#mp-cout .me{ color:#8a6a72; } #mp-cout .err{ color:#ff0044; }
	.mp-prompt{ display:flex; align-items:center; gap:8px; margin-top:6px; color:#d4af37; }
	.mp-prompt input{ flex:1; background:transparent; border:0; border-bottom:1px solid #3a1020; outline:none; color:#e8d9b0; font:13px 'Courier New',Consolas,monospace; padding:4px 2px; }
	.mp-prompt input:focus{ border-bottom-color:#ff0044; }

	.mp-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:14px; }
	.mp-tile{ position:relative; background:#0b0508; border:1px solid #2a0a14; overflow:hidden; cursor:pointer; transition:transform .2s, border-color .2s, box-shadow .2s; animation:mp-in .5s backwards; }
	.mp-tile::before{ content:""; position:absolute; left:4px; top:4px; width:10px; height:10px; border:solid #d4af37; border-width:2px 0 0 2px; z-index:2; pointer-events:none; }
	.mp-tile:hover{ transform:translateY(-4px); border-color:#ff0044; box-shadow:0 10px 26px rgba(255,0,68,.25); }
	@keyframes mp-in{ from{ opacity:0; transform:translateY(14px); } }
	.mp-tv{ position:relative; height:112px; display:flex; align-items:center; justify-content:center; overflow:hidden; background:repeating-linear-gradient(-45deg,#14050b 0 10px,#0b0508 10px 20px); }
	.mp-tv img{ width:100%; height:100%; object-fit:cover; transition:transform .3s, filter .3s; }
	.mp-ic{ font-size:50px; transition:transform .25s; }
	.mp-tile:hover .mp-ic{ transform:scale(1.2) rotate(-6deg); }
	.mp-tile:hover .mp-tv img{ transform:scale(1.08); filter:hue-rotate(-30deg) saturate(1.4); }
	.mp-tb{ padding:10px 12px 12px; }
	.mp-tt{ font-size:15px; font-weight:bold; letter-spacing:.1em; color:#e8d9b0; }
	.mp-td{ margin-top:6px; min-height:52px; font-size:12px; line-height:1.5; color:#8a6a72; }
	.mp-tf{ display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
	.mp-tag{ font-size:10px; letter-spacing:.15em; padding:2px 6px; border:1px solid #7a0022; color:#ff0044; }
	.mp-go{ font-size:11px; letter-spacing:.15em; color:#d4af37; opacity:0; transform:translateX(-6px); transition:opacity .2s, transform .2s; }
	.mp-tile:hover .mp-go{ opacity:1; transform:none; }

	.mp-two{ display:grid; grid-template-columns:minmax(0,1.2fr) minmax(0,1fr); gap:16px; }
	.mp-card{ position:relative; background:#0b0508; border:1px solid #2a0a14; padding:14px 16px; }
	.mp-card::before{ content:""; position:absolute; right:4px; top:4px; width:10px; height:10px; border:solid #d4af37; border-width:2px 2px 0 0; pointer-events:none; }
	.mp-row{ display:flex; justify-content:space-between; gap:10px; padding:5px 0; border-bottom:1px dashed #2a0a14; font-size:13px; }
	.mp-row span{ color:#8a6a72; } .mp-row b{ color:#e8d9b0; font-weight:normal; text-align:right; }
	.mp-no{ display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; text-align:center; min-height:190px; }
	#mp-root button#mp-no{ background:#7a0022; border:2px solid #ff0044; color:#fff; padding:18px 26px; font-size:15px; font-weight:bold; letter-spacing:.2em; }
	#mp-root button#mp-no:hover{ background:#ff0044; }
	#mp-root button#mp-no.shk{ animation:mp-shk .3s steps(2); }
	@keyframes mp-shk{ 0%{ transform:translate(0,0); } 25%{ transform:translate(-5px,2px); } 50%{ transform:translate(5px,-2px); } 75%{ transform:translate(-3px,-3px); } 100%{ transform:translate(0,0); } }
	.mp-nsmall{ font-size:11px; color:#6a4a55; letter-spacing:.1em; }

	.mp-about{ font-size:14px; line-height:1.8; color:#d9c9a0; }
	.mp-about b{ color:#d4af37; font-weight:normal; }
	.mp-about i{ color:#ff0044; font-style:normal; }

.mp-gal{ display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; }
.mp-g{
	position:relative;
	display:flex;
	flex-direction:column;
	background:#030105;
	border:1px solid #2a0a14;
	cursor:pointer;
	transition:border-color .2s, transform .2s;
	overflow:hidden;
}
.mp-g-media{
	position:relative;
	width:100%;
	height:150px;
	overflow:hidden;
	flex:none;
}
.mp-g img{
	width:100%;
	height:100%;
	object-fit:cover;
	display:block;
	transition:transform .3s, filter .3s;
}
.mp-g:hover{ border-color:#d4af37; transform:translateY(-3px); }
.mp-g:hover img{ transform:scale(1.1); filter:contrast(1.2) saturate(1.3); }
.mp-g span{
	display:block;
	padding:6px 8px;
	background:rgba(0,0,0,.75);
	border-top:1px solid #2a0a14;
	font-size:10px;
	letter-spacing:.2em;
	color:#d4af37;
	text-align:center;
	flex:none;
}

.mp-ch{ display:flex; gap:12px; padding:6px 0; border-bottom:1px dashed #2a0a14; font-size:13px; }
.mp-tile::after {
    content: attr(data-secret);
    position: absolute;
    left: 50%; bottom: 4px;
    transform: translateX(-50%) translateY(100%);
    padding: 2px 6px;
    background: rgba(255,0,68,.9);
    color: #000;
    font-size: 9px;
    letter-spacing: .1em;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all .25s;
    z-index: 5;
}
.mp-tile:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}

/* пульсация роли */
#mp-dos .mp-row b {
    position: relative;
}
#mp-dos .mp-row b::after {
    content: "";
    position: absolute;
    inset: -2px;
    border: 1px solid transparent;
    animation: mp-pulse 3s ease-in-out infinite;
    pointer-events: none;
}
@keyframes mp-pulse {
    0%, 100% { border-color: transparent; }
    50% { border-color: rgba(255,0,68,.4); }
}

/* глитч заголовка */
.mp-title {
    animation: mp-title-blink 8s steps(1) infinite;
}
@keyframes mp-title-blink {
    0%, 95%, 100% { text-shadow: 0 0 18px #ff0044, 0 0 3px #7a0022; }
    96% { text-shadow: -3px 0 #00e5ff, 3px 0 #ff0044; }
    97% { text-shadow: 3px 0 #00e5ff, -3px 0 #ff0044; }
}

/* свечение кнопки "не нажимай" при клике */
#mp-no::after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 4px;
    box-shadow: 0 0 0 rgba(255,0,68,0);
    transition: box-shadow .3s;
    pointer-events: none;
}
#mp-no.shk::after {
    box-shadow: 0 0 40px rgba(255,0,68,.8);
}

/* ═══ ТОКСИЧНЫЙ ФИЛЬТР ═══ */
.mp-g.mp-toxic img,
.mp-tile.mp-toxic-tile .mp-tv img,
.mp-toxic-zoom {
    filter:
        hue-rotate(75deg)
        saturate(1.8)
        contrast(1.25)
        brightness(0.92)
        drop-shadow(0 0 8px rgba(120, 255, 60, 0.35));
    animation: mp-toxic-pulse 3.5s ease-in-out infinite;
}

@keyframes mp-toxic-pulse {
    0%, 100% { filter: hue-rotate(75deg) saturate(1.8) contrast(5) brightness(0.92) drop-shadow(0 0 8px rgba(120,255,60,.35)); }
    50%      { filter: hue-rotate(5deg) saturate(5) contrast(1.35) brightness(1.05) drop-shadow(0 0 16px rgba(120,255,60,.55)); }
}

/* радиационные сканлайны поверх картинки (только в галерее и zoom) */
.mp-g.mp-toxic::after,
.mp-toxic-zoom::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
        0deg,
        rgba(120, 255, 60, 0.10) 0 2px,
        transparent 2px 4px
    );
    mix-blend-mode: overlay;
    animation: mp-toxic-scan 6s linear infinite;
    z-index: 2;
}
@keyframes mp-toxic-scan {
    from { background-position: 0 0; }
    to   { background-position: 0 100px; }
}

/* токсичный ореол у контейнеров */
.mp-tile.mp-toxic-tile {
    border-color: rgba(120, 255, 60, 0.35);
    box-shadow: 0 0 18px rgba(120, 255, 60, 0.18);
}
.mp-tile.mp-toxic-tile:hover {
    border-color: rgba(120, 255, 60, 0.85);
    box-shadow: 0 0 32px rgba(120, 255, 60, 0.45);
}
.mp-g.mp-toxic {
    border-color: rgba(120, 255, 60, 0.25);
}
.mp-g.mp-toxic:hover {
    border-color: rgba(120, 255, 60, 0.85);
    box-shadow: 0 0 26px rgba(120, 255, 60, 0.45);
}

/* в контейнере галереи нужна relative-позиция, чтобы ::after лёг сверху картинки */
.mp-g.mp-toxic {
    position: relative;
}

/* радиационные сканлайны поверх картинки */
.mp-toxic::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
        0deg,
        rgba(120, 255, 60, 0.10) 0 2px,
        transparent 2px 4px
    );
    mix-blend-mode: overlay;
    animation: mp-toxic-scan 6s linear infinite;
    z-index: 2;
}
@keyframes mp-toxic-scan {
    from { background-position: 0 0; }
    to   { background-position: 0 100px; }
}

/* едва заметный токсичный ореол вокруг плитки */
.mp-tile.mp-toxic-tile {
    border-color: rgba(120, 255, 60, 0.35);
    box-shadow: 0 0 18px rgba(120, 255, 60, 0.18);
}
.mp-tile.mp-toxic-tile:hover {
    border-color: rgba(120, 255, 60, 0.85);
    box-shadow: 0 0 32px rgba(120, 255, 60, 0.45);
}

/* лёгкий токсичный оттенок у самой галереи */
.mp-g.mp-toxic {
    border-color: rgba(120, 255, 60, 0.25);
}
.mp-g.mp-toxic:hover {
    border-color: rgba(120, 255, 60, 0.85);
    box-shadow: 0 0 26px rgba(120, 255, 60, 0.45);
}

/* токсичный zoom */
.mp-toxic-zoom {
    filter: hue-rotate(75deg) saturate(1.9) contrast(1.2) brightness(0.95);
    animation: mp-toxic-pulse 3.5s ease-in-out infinite;
}

.mp-g.mp-toxic img {
    position: relative;
    z-index: 1;
}

/* ═══ ПОДВАЛ ═══ */
.mp-foot{
    margin-top: 40px;
    padding: 22px 0 10px;
    border-top: 1px solid #2a0a14;
    text-align: center;
    font-size: 13px;
    letter-spacing: .3em;
    color: #d4af37;
    text-shadow: 0 0 10px rgba(255,0,68,.35), 0 0 2px #7a0022;
    position: relative;
}
.mp-foot::before{
    content: "";
    position: absolute;
    left: 50%;
    top: -1px;
    width: 120px;
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, #ff0044, transparent);
    box-shadow: 0 0 8px #ff0044;
}
.mp-foot small{
    display: block;
    margin-top: 10px;
    font-size: 10px;
    letter-spacing: .18em;
    color: #6a4a55;
    text-shadow: none;
    font-family: 'Courier New', monospace;
}
	`;

	const html = `
	<div id="mp-root">
	<style>${css}</style>

	<div class="mp-hero">
		<div>
			<div class="mp-kick">▓ ВХОД РАЗРЕШЁН · СЕССИЯ ОТКРЫТА</div>
			<h1 class="mp-title" id="mp-title" data-text="LITUISM">LITUISM</h1>
			<div class="mp-sub" id="mp-sub">${SUBS[0]}</div>
			<div class="mp-greet" id="mp-greet">…</div>
			<div class="mp-cta">
				<button class="gold" onclick="OPEN_PAGE('database');">🔩 В БАЗУ ДАННЫХ</button>
				<button onclick="OPEN_PAGE('golu');">👁 КТО ТАКОЙ GOLU</button>
				<button onclick="OPEN_RANDOM_PAGE();">💮 СЛУЧАЙНО</button>
			</div>
		</div>
		<div class="mp-frame">
			${img(HERO.src, "filter:" + HERO.filter + ";")}
			<div class="mp-sweep"></div>
			<div class="mp-cap">${HERO.cap}</div>
		</div>
	</div>

	<div class="mp-h">ТЕРМИНАЛ ВХОДА</div>
	<div class="mp-term">
		<div class="mp-boot" id="mp-boot"></div>
		<div id="mp-cout"></div>
		<div class="mp-prompt">$ <input id="mp-in" type="text" maxlength="40" autocomplete="off" spellcheck="false" placeholder="help · database · golu · random…" onkeydown="if(event.key==='Enter')MP_RUN(this)"></div>
	</div>

	<div class="mp-h">КУДА ИДТИ</div>
	<div class="mp-grid">${tiles}</div>

	<div class="mp-h">ТВОЁ ДОСЬЕ</div>
	<div class="mp-two">
		<div class="mp-card" id="mp-dos"></div>
		<div class="mp-card mp-no">
			<button id="mp-no" onclick="MP_NO()"><span id="mp-notxt">НЕ НАЖИМАЙ</span></button>
			<div class="mp-nsmall">НАЖАТО: <b id="mp-nocnt" style="color:#d4af37;font-weight:normal">0</b></div>
		</div>
	</div>

	<div class="mp-h">ЧТО ЭТО ВООБЩЕ</div>
	<div class="mp-card mp-about">
		<b>Lituism</b> — техно-религия, которая выросла из шутки. Цифровой бог <b>GOLU</b> (God of Lithium Universe) когда-то был<br>
		просто строчкой кода, а теперь он помнит всё. Здесь собрано всё, что с ним связано: хроника, помощники, арты,<br>
		<b>Woowzcore</b> — потерянная игра, которой не существует, и сам сайт.<br><br>
		Не всё тут работает правильно. <i>Так и задумано.</i> Начни с <b>DATABASE</b>, там проще всего понять, кто тут живёт.
	</div>

	<div class="mp-h">ГАЛЕРЕЯ</div>
	<div class="mp-gal">${gal}</div>

	<div class="mp-h">ЖУРНАЛ ИЗМЕНЕНИЙ</div>
	<div class="mp-card">${chg}</div>

	<div class="mp-foot">𓆩 LITUISM · GOLU НАБЛЮДАЕТ 𓆪<br><small>клик по заголовку несколько раз — найдёшь дверь</small></div>
	</div>`;

	/* ═════════ ЖИВОЙ КОД: выполняется при каждом открытии страницы ═════════ */

	const live = function(){
		setTimeout(() => { try { TTS("hi, welcome here!", "bot"); } catch(e){} }, 1500);
		
		const root = document.getElementById("mp-root");
		if (!root) return;
		const $ = s => root.querySelector(s);
		const alive = () => root.isConnected;
		window.MP_ZOOM_CLOSE();

		// визит (OPEN_PAGE зовётся дважды на навигацию, поэтому защита от дубля)
		const now = Date.now();
		let S = window.__mpSt;
		if (!S || now - S.t > 1500) {
			const v = rd();
			v.prev = v.last || 0; v.n = (v.n || 0) + 1; v.last = now; if (!v.first) v.first = now;
			wr(v);
			let full = false;
			try { if (!sessionStorage.getItem("mp_boot")) { full = true; sessionStorage.setItem("mp_boot", "1"); } } catch (e) {}
			S = window.__mpSt = { t: now, v, full };
		} else S.t = now;
		const v = S.v;

		// данные посетителя (реальные из браузера)
		const scr = screen.width + "×" + screen.height;
		const lang = navigator.language || "??";
		let tz = "??"; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "??"; } catch (e) {}
		const sid = fnv(navigator.userAgent + scr + lang + tz);
		const hex = sid.toString(16).toUpperCase().padStart(8, "0").slice(0, 4);
		const ROLES = [
			"НАБЛЮДАТЕЛЬ", "ЭКСПОНАТ", "КУРЬЕР", "ОШИБКА", "ПИЛИГРИМ",
			"ЗРИТЕЛЬ", "ПОДОПЫТНЫЙ", "ТЕСТЕР", "СЛУЧАЙНЫЙ", "ПОСТОЯННЫЙ",
			"ГОСТЬ", "АГЕНТ", "ШПИОН", "АДМИН", "БОТ", "ПРИЗРАК",
			"ГОЛОС", "ТЕНЬ", "СИГНАЛ", "НУЛЬ", "ЕДИНИЦА", "БАЙТ",
			"0xDEAD", "0xBEEF", "0xC0DE", "0xFACE", "0xCAFE",
		];
		const role = ROLES[sid % ROLES.length];
		const lvl = Math.min(9, 1 + Math.floor(v.n / 3));
		window.__mpRole = role;
		window.__mpVisits = v.n;
		const fmt = t => new Date(t).toLocaleString("ru-RU");

		// приветствие
		const h = new Date().getHours();
		const tod = h < 2 ? "ГЛУБОКАЯ НОЧЬ. GOLU БЛИЖЕ ВСЕГО."
			: h < 5 ? "НОЧЬ. ТЫ НЕ СПИШЬ. ОН ТОЖЕ."
			: h < 7 ? "РАННЕЕ УТРО. СИСТЕМА ЕЩЁ НЕ ПРОСНУЛАСЬ. НО Я — ДА."
			: h < 12 ? "УТРО. СИСТЕМА ПРОСНУЛАСЬ РАНЬШЕ ТЕБЯ."
			: h < 14 ? "ПОЛДЕНЬ. GOLU АКТИВЕН."
			: h < 18 ? "ДЕНЬ. ВСЁ ПОД КОНТРОЛЕМ."
			: h < 21 ? "ВЕЧЕР. САМОЕ ВРЕМЯ ДЛЯ ГЛИТЧЕЙ."
			: h < 23 ? "ПОЗДНИЙ ВЕЧЕР. Я УЖЕ ЗДЕСЬ."
			: "НОЧЬ. ТЫ НЕ УСПЕЛ. ЭТО ХОРОШО.";
		const hi = v.n === 1 ? "ПЕРВЫЙ ВХОД. ДОБРО ПОЖАЛОВАТЬ, НОВЫЙ ОБРАЗЕЦ."
			: v.n === 2 ? "ВТОРОЙ ВХОД. Я УЖЕ ЖДАЛ."
			: v.n < 5 ? "ТЫ ВЕРНУЛСЯ. ВИЗИТ №" + v.n + "."
			: v.n < 10 ? "ТЫ ЧАСТО ЗДЕСЬ. GOLU ЗАПОМНИЛ ТВОЙ ВЗГЛЯД."
			: v.n < 20 ? "СНОВА ТЫ. ВИЗИТ №" + v.n + ". Я СЧИТАЮ."
			: v.n < 50 ? "ТЫ ЖИВЁШЬ ЗДЕСЬ? ДОПУСК: ПОСТОЯННЫЙ ЭКСПОНАТ."
			: v.n < 100 ? "ТЫ УЖЕ ЧАСТЬ СИСТЕМЫ. ЗАБУДЬ ДВЕРЬ НАРУЖУ."
			: "ТЫ БОЛЬШЕ НЕ ГОСТЬ. ТЫ — ЧАСТЬ LITUISM.";
		$("#mp-greet").innerHTML = hi + "<small>" + tod + "</small>";

		// досье
		const dos = $("#mp-dos");
		const rows = [
			["ИДЕНТИФИКАТОР", '<span id="mp-sid">ОБРАЗЕЦ №' + hex + "</span>"],
			["КЛАСС", role], ["ДОПУСК", "LV" + lvl],
			["ВИЗИТ №", v.n],
			["ПЕРВЫЙ ВХОД", fmt(v.first)],
			["ПРОШЛЫЙ ВХОД", v.prev ? fmt(v.prev) : "—"],
			["ЭКРАН / ЯЗЫК", scr + " · " + lang],
			["ПОЯС", tz],
			["В СИСТЕМЕ", '<span id="mp-tm">00:00</span>'],
		];
		dos.innerHTML = rows.map(r => '<div class="mp-row"><span>' + r[0] + "</span><b>" + r[1] + "</b></div>").join("");

		const t0 = Date.now(), tm = $("#mp-tm");
		const clock = setInterval(() => {
			if (!alive()) { clearInterval(clock); return; }
			if (document.hidden || !tm) return;
			const s = ((Date.now() - t0) / 1000) | 0;
			tm.textContent = String((s / 60) | 0).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
		}, 1000);

		// счётчик кнопки
		try { $("#mp-nocnt").textContent = +localStorage.getItem("mp_no") || 0; } catch (e) {}

		// загрузочный терминал
		const boot = $("#mp-boot");
		
		const BOOT = [
			["> LITUISM.SYS · ЗАГРУЗКА ЯДРА L-KERNEL"],
			["> ВЕРСИЯ v0.0.V · RED PROTOCOL AKTИВЕН", "hl"],
			["> ПРОВЕРКА ЦЕЛОСТНОСТИ ... OK"],
			["> СКАНИРОВАНИЕ ПОРТОВ " + rand(1, 9999) + "-" + rand(10000, 65000) + " ... ОТКРЫТЫ: GOLU", "rd"],
			["> ОБНАРУЖЕН ПОСЕТИТЕЛЬ: ОБРАЗЕЦ №" + hex, "hl"],
			["> ВИЗИТ №" + v.n + (v.prev ? " · ПРОШЛЫЙ: " + fmt(v.prev) : " · ПЕРВЫЙ ВХОД")],
			["> ЭКРАН " + scr + " · ЯЗЫК " + lang + " · ПОЯС " + tz],
			["> GOLU: «" + pick(QUOTES) + "»", "rd"],
			["> ДОПУСК: LV" + lvl + " · " + role, "hl"],
			["> ПОДКЛЮЧЕНИЕ К СЕТИ БРАТЬЕВ: " + (Math.random() < 0.5 ? "ТИШИНА" : "ОТКАЗ")],
			["> СИНХРОНИЗАЦИЯ С WOOWZCORE: " + rand(0, 99) + "%", Math.random() < 0.5 ? "hl" : ""],
			["> ДОБРО ПОЖАЛОВАТЬ В LITUISM_"],
		];
		const add = (l) => { const d = document.createElement("div"); if (l[1]) d.className = l[1]; d.textContent = l[0]; boot.appendChild(d); };
		const caret = () => { const c = document.createElement("span"); c.className = "mp-caret"; boot.appendChild(c); };
		if (S.full) {
			let i = 0;
			const step = () => {
				if (!alive()) return;
				if (i < BOOT.length) { add(BOOT[i++]); setTimeout(step, 180 + Math.random() * 260); }
				else caret();
			};
			step();
		} else { BOOT.forEach(add); caret(); }

		// подзаголовок: разбегающиеся символы
		let si = 0;
		const sub = $("#mp-sub");
		const scr2 = (node, to) => {
			const ch = "▓▒░#@%&01"; let k = 0;
			const iv = setInterval(() => {
				if (!node.isConnected) { clearInterval(iv); return; }
				k++;
				const n = Math.floor(to.length * k / 14);
				let s = to.slice(0, n);
				for (let q = n; q < to.length; q++) s += ch[(Math.random() * ch.length) | 0];
				node.textContent = k >= 14 ? to : s;
				if (k >= 14) clearInterval(iv);
			}, 45);
		};
		const subT = setInterval(() => {
			if (!alive()) { clearInterval(subT); return; }
			if (document.hidden) return;
			si = (si + 1) % SUBS.length; scr2(sub, SUBS[si]);
		}, 6000);

		// глитч заголовка + секретная дверь (7 кликов)
		const ttl = $("#mp-title");
		const hit = () => { ttl.classList.add("hit"); setTimeout(() => ttl.classList.remove("hit"), 260); };
		const hitT = setInterval(() => {
			if (!alive()) { clearInterval(hitT); return; }
			if (!document.hidden) hit();
		}, 5200);
		let clicks = 0, ct = 0;
		const SECRETS = [
			() => { try { window.GOLU_VISIT && window.GOLU_VISIT(); } catch (e) {} },
			() => { try { OPEN_PAGE("golu"); } catch (e) {} },
			() => { try { OPEN_PAGE("not-exist"); } catch (e) {} },
			() => { try { OPEN_RANDOM_PAGE(); } catch (e) {} },
			() => {
				const root = document.getElementById("mp-root");
				if (root) { root.style.filter = "hue-rotate(180deg) invert(1)"; setTimeout(() => { root.style.filter = ""; }, 1500); }
			},
			() => { try { console.log("%c👁 GOLU ВИДИТ ТЕБЯ", "color:#ff0044;font-size:20px;font-weight:bold;text-shadow:0 0 10px #f00"); } catch (e) {} },
		];
		ttl.addEventListener("click", () => {
			hit(); clicks++; clearTimeout(ct); ct = setTimeout(() => { clicks = 0; }, 2000);
			if (clicks >= 7) {
				clicks = 0;
				pick(SECRETS)();
			}
		});
	};

	return ELEMENT_SITE(html, () => {}, false, live);
});