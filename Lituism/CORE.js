// Привет))) тут начало этого файла, я WOOWZ11, я распишу суть и лор этого поноса моего любимого 😁
// НАХУЯ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// сука это гвоно живое вообще нах?

// ПРАВДИВАЯ ВЕРСИЯ МАНИФЕСТА
const MANIFEST_VERSION = "0.0.V";

// ДОП. ИНФОРМАЦИЯ В ССЫЛКЕ САЙТА
var HASH = window.location.hash ? window.location.hash.substring(1) : "" ;
// САЙТ ЯВЛЯЕТСЯ ЛОКАЛЬНЫМ ФАЙЛОМ
const DEV = window.location.protocol === "file:" || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
// АВТОПЛЕЙ ЗВУК
const ENABLE_AUTOPLAY = !DEV;
// ЗАПУЩЕНО НА ТЕЛЕФОНЕ
const IN_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if(IN_MOBILE){
	FUNC_ADDSTYLE(`warning_mobile {
		display: flex;
	}`);
}else{
	if(!DEV){
		const UNDEV_CSS = `
@media (max-width: 1250px), (max-height: 256px) {
	warning {
		display: flex;
	}
}
`;

	FUNC_ADDSTYLE(UNDEV_CSS);
	}
}

const PAGE_FILES = [
		"PAGE_main.js",
		"PAGE_database.js",
		"PAGE_sranspang.js",
		"PAGE_crybird.js",
		"PAGE_golu.js",
		"PAGE_trash.js",
		"PAGE_arts.js",
		"PAGE_artsreal.js",
		"PAGE_pavpis.js",
		"PAGE_portal.js",
		"PAGE_testcss.js",
		"PAGE_artsai.js"
	];

function SITE_BASE(content){
	return `${ELEMENT_SITETOP}${content}${ELEMENT_SITEBOTTOM}`;
}

function OPEN_RANDOM_PAGE(){
	const Pages = Object.keys(PAGES)
	if(Pages.length === 0){ return }
	OPEN_PAGE(Pages[Math.floor(Math.random() * Pages.length)])
}

/* Открыть страницу */
function OPEN_PAGE(id = ""){
	HASH = id;

	var page = PAGES[id];
	var content = null;
	var title = null;
	if(!page){ content = SITE_BASE(`<font style="color:white;"><center><b class="glitch" style="font-size: 10em">FAILED LOAD WEBSITE FROM ID "${id}"!</b></center></font>`); title = "???"; }else{
		var content = page["c"];
		var title   = page["t"];
	}
	SETBODY_CONTENT(content);
	window.location.hash = id;
	document.title = `𓆩 ${title} 𓆪`;
	
	var autoplay = document.getElementById("AUTOPLAY");
	if(autoplay && ENABLE_AUTOPLAY){ autoplay.volume = 0.25; autoplay.play(); }
	
	var ID_LABEL = document.getElementById("ID");
	if(ID_LABEL){ ID_LABEL.innerText = id; }
	
	function prikol(){
		var bgs = [
			"bg.png","bg2.png","bg3.png","bg4.png","bg5.png","bg6.png","bg7.png","bg8.png","bg9.png","bg10.png","bg11.png"
		];
		var bg = bgs[Math.floor(Math.random() * bgs.length)];
		document.getElementById("BODY").style.backgroundImage = `url("${bg}")`;
	}
	prikol();

	if(page && page["f"]){ page["f"]() }



	var GOLU_HEAD = document.getElementById("lit_head");
	GOLU_HEAD.addEventListener("mouseover", function(){
		var bodies = document.querySelectorAll(`[id="lit_body"]`);
		bodies.forEach(function(b){
			b.classList.add("invert");
		})
	});
	GOLU_HEAD.addEventListener("mouseout", function(){
		var bodies = document.querySelectorAll(`[id="lit_body"]`);
		bodies.forEach(function(b){
			b.classList.remove("invert");
		})
	});




	// ===================================================================
	//  БИНАРНЫЙ СЛЕД ЗА МЫШЬЮ (0 и 1) — LITUISM STYLE
	// ===================================================================
	(function() {
		const TRAIL_LENGTH = 64;
		const TRAIL_SIZE = 16;

		const COLORS = [
			"red", "lime"
		];

		const SYMBOLS = ['0', '1'];

		let trail = [];
		let cursor = ""
		let cursorX = -100;
		let cursorY = -100;
		let positions = [];

		if (window.__trailInit) return;
		window.__trailInit = true;
		var CACHE = document.createElement("div");
		(document.getElementById("UI_LAYER") || document.documentElement).appendChild(CACHE);

		for (let i = 0; i < TRAIL_LENGTH; i++) {
			const dot = document.createElement('div');
			const size = TRAIL_SIZE * (1 - i / TRAIL_LENGTH * 0.6);
			const color = COLORS[Math.floor(Math.random() * COLORS.length)];

			dot.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
			dot.style.cssText = `
                position: fixed;
                font-size: ${size}px;
                font-family: 'Courier New', monospace;
                font-weight: 900;
                color: ${color};
                pointer-events: none;
                z-index: 999999;
                opacity: ${1 - (i / TRAIL_LENGTH) * 0.85};
                mix-blend-mode: screen;
                filter: blur(${i < 3 ? 0 : (i / TRAIL_LENGTH) * 1.5}px);
                transition: all 0.04s cubic-bezier(0.2, 0.9, 0.4, 1);
                text-shadow: 0 0 ${size * 0.8}px ${color}66, 0 0 ${size * 2}px ${color}22;
                will-change: transform;
                line-height: 1;
                user-select: none;
            `;
			CACHE.appendChild(dot);
			trail.push(dot);
			positions.push({ x: cursorX, y: cursorY });
		}

		function update() {
			positions.unshift({ x: cursorX, y: cursorY });
			if (positions.length > TRAIL_LENGTH) positions.pop();

			for (let i = 0; i < trail.length; i++) {
				if (i < positions.length) {
					const pos = positions[i];
					trail[i].style.left = pos.x + 'px';
					trail[i].style.top = pos.y + 'px';

					let glitchX = 0, glitchY = 0;
					if (i > 3 && i % 2 === 0) {
						glitchX = (Math.random() - 0.5) * (i / 2);
						glitchY = (Math.random() - 0.5) * (i / 2);
					}

					let Symbol = trail[i].innerHTML

					if(cursor.includes("notallow")){
						Symbol = "卐"
					}else if(cursor.includes("text")){
						Symbol = "HI, WELCOME HERE!"
					}else if(cursor.includes("grab")){
						Symbol = "<img src='../source/whitesponge.ico'></img>"
					}else{
						Symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
					}

					trail[i].innerHTML = Symbol

					const scale = 1 - (i / TRAIL_LENGTH) * 0.9;
					trail[i].style.transform = `translate(-50%, -50%) translate(${glitchX}px, ${glitchY}px) scale(${scale})`;
				}
			}

			requestAnimationFrame(update);
		}

		document.addEventListener('mousemove', function(e) {
			let X = e.clientX
			let Y = e.clientY

			const ElementFromCursor = document.elementFromPoint(X, Y)
			cursor = ElementFromCursor ? getComputedStyle(ElementFromCursor).cursor : ""

			if(cursor.includes("pointer")){
				X += 5;
			}else if(cursor.includes("text")){
				X += (Math.random()-0.5)*2*500;
				Y += (Math.random()-0.5)*2*500;
			}else if(cursor.includes("grab")){
				X += (Math.random()-0.5)*2*3000;
				Y += (Math.random()-0.5)*2*3000;
			}

			cursorX = X;
			cursorY = Y;
		});

		update();
	})();
}

function FUNC_REMOVENEWLINE(str){
	return str.replace(/\n/g, "");
}
function f_rnl(str){ return FUNC_REMOVENEWLINE(str); }

/* ДОБАВЛЯЕТ СТИЛЬ */
function FUNC_ADDSTYLE(style){
	var STYLE = document.createElement("style");
	STYLE.type = "text/css";
	if(STYLE.styleSheet){
		STYLE.styleSheet.cssText = style;
	}else{
		STYLE.appendChild(document.createTextNode(style));
	}
	document.head.appendChild(STYLE);
}

/* СКАЧИВАЕТ ФАЙЛ */
function FUNC_DOWNLOADFILE(name, content){
	const blob = new Blob([content], {type: "text/plain"});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

/* ЗАМЕНЯЕТ ВСЕ ТЕГИ НА НУЖНЫЕ ФРАЗАЧКИ */
function FUNC_REPLACE_TAGS(content){
	const now = new Date();
	
	var CURTIME = `[${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}] ${String(now.getHours()).padStart(2, '0')};${String(now.getMinutes()).padStart(2, '0')};${String(now.getSeconds()).padStart(2, '0')}`;
	return content.replace(/\{\{CUR-TIME\}\}/g, CURTIME);
}

/* Установить содержимое body */
function SETBODY_CONTENT(newcontent, newlines = true){
	const BODY = document.getElementById("BODY");
	newcontent = newcontent.replace(/\n/g, newlines ? "<br>" : "");
	newcontent = newcontent.replace(/\t/g, "");
	BODY.innerHTML = FUNC_REPLACE_TAGS(newcontent);
}

/* ============================================== */

function ELEMENT_TITLE(){
	const LIT_BODY_SRC = "../source/god.png";
	var LIT_BODY = "";
	for(var i = 0; i < 5; i++){
		var LIT_BODY_PART = `<img id="lit_body" src="${LIT_BODY_SRC}" style="position: absolute; animation: spin ${i+1}s linear infinite; animation-name: spin; opacity: 0.5;">`;
		LIT_BODY += LIT_BODY_PART;
	}
	return `${LIT_BODY}<title_img id="lit_head" onclick="OPEN_PAGE('golu');"></title_img><title_text></title_text>`;
}

function ELEMENT_WEBINFO(){
	return `<text class="glitch">v:${MANIFEST_VERSION}</text> <text class="glitch2" id="ID">UNKNOWN-ID</text>`;
}

const ELEMENT_TOPBANNER = f_rnl(`<top_banner>
<top_banner_top>
${ELEMENT_TITLE()}
${ELEMENT_WEBINFO()}
<text class="glitch3" style="color:white;">ИНФОРМАЦИЯ ЗДЕСЬ ПОЛНОСТЬЮ НЕ КОРРЕКТНАЯ, СРАНЫЙ СПАНЧ ДУДОСИТ САЙТ...</text>
</top_banner_top>
<top_banner_bottom>

<button onclick="OPEN_PAGE('not-exist');" class="category_button">&lt;@&gt;</button>
<button onclick="OPEN_PAGE();" class="category_button">{MAIN PAGE}</button>
<button onclick="OPEN_PAGE('artsreal');" class="category_button">ИСКУССТВО 💥</button>
<button onclick="OPEN_PAGE('artsai');" class="category_button">AI ☢</button>
<button onclick="OPEN_PAGE('trash');" class="category_button">GOLUWorld 👾</button>
<button onclick="OPEN_RANDOM_PAGE();" class="category_button">RANDOM_PAGE() 💮</button>
<button onclick="OPEN_PAGE('database');" class="category_button">DATABASE 🔩</button>
<button onclick="OPEN_PAGE('portal');" class="category_button">P0RTAL 🌌</button>

</top_banner_bottom>
</top_banner>`);

function ELEMENT_COLUMN_IMG(right){
	return `<column_img style="filter: drop-shadow(${right ? "" : "-"}5px 0px 10px rgb(255,255,255)); transform: translate(${right ? "" : "-"}850px, 25px) ${right ? "scaleX(-1)" : ""};"><img src="left-right.png" style="animation: column_img_anim 1s cubic-bezier(.68,-0.55,.27,1.55) infinite alternate;"></column_img>`;
}

const ELEMENT_WEBSIZEWARNING = `<warning>Now you can change website size!</warning><warning_mobile>ЗАЙДИ С ПК УБЛ****К!</warning_mobile>`;

const ELEMENT_SITETOP = `${ELEMENT_TOPBANNER}<site>${ELEMENT_COLUMN_IMG(false)}${ELEMENT_COLUMN_IMG(true)}${ELEMENT_WEBSIZEWARNING}<site_content id="MAIN">`;

const ELEMENT_SITEBOTTOM = `</site_content></site>`;

const PREPAGES = [];
const PAGE_REGISTRY = {};   // key -> {title, factory}

function REGISTER_PAGE(key, title, factory){
	PAGE_REGISTRY[key] = { title: title, factory: factory };
}

function ELEMENT_SITE(content, func = function(){}, newlines = true, runafteropen = function(){}){
	PREPAGES.push([content, func, newlines, PREPAGES.length, runafteropen]);
	return "<text style='color:white;'>PREPAGE {{" + PREPAGES.length + "}}</text>";
}

var t = 0;
function renderLoop(){
	if(HASH==="crybird"){
		document.getElementById("bytes").style.width = `${50+((Math.sin(t/250)+1)/2)*50}%`;
	}
	t++;
	requestAnimationFrame(renderLoop);
}

/* ===================================================================
   АВТОЗАГРУЗКА PAGE_*.js + BOOT
   Всё в одном файле. Порядок подключения страниц не важен.
   =================================================================== */
(function LITUISM_BOOTLOADER(){
	let loaded = 0;
	let failed = 0;

	function onAllDone(){
		if(loaded + failed < PAGE_FILES.length) return;

		if(failed > 0){
			console.warn(`[LITUISM] ${failed} page script(s) failed to load.`);
		}

		// --- BOOT ---
		// ВАЖНО: PAGES должен быть глобальным (window.PAGES),
		// потому что func() внутри PAGE_*.js обращаются к нему напрямую.
		window.PAGES = {};

		for(const key in PAGE_REGISTRY){
			const entry = PAGE_REGISTRY[key];
			window.PAGES[key] = { t: entry.title, c: null, factory: entry.factory };
		}

		for(const key in window.PAGES){
			window.PAGES[key].factory();
		}

		for(const j in PREPAGES){
			var PAGE = PREPAGES[j];
			var content_result = SITE_BASE(PAGE[0]);
			SETBODY_CONTENT(content_result, PAGE[2]);
			PAGE[1]();

			const i = PAGE[3];
			const key = Object.keys(window.PAGES)[i];
			window.PAGES[key]["c"] = document.getElementById("BODY").innerHTML;
			window.PAGES[key]["f"] = PAGE[4];
			delete window.PAGES[key].factory;
		}

		renderLoop();

		if(!DEV){
			document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
		}

		window.addEventListener("hashchange", () => {
			const clean = window.location.hash.replace(/^#/, "");
			OPEN_PAGE(clean);
		});

		OPEN_PAGE(HASH);
	}

	PAGE_FILES.forEach(function(file){
		const s = document.createElement("script");
		s.src = file;
		s.async = false;
		s.onload = function(){ loaded++; onAllDone(); };
		s.onerror = function(){
			failed++;
			console.error(`[LITUISM] Failed to load ${file}`);
			onAllDone();
		};
		document.head.appendChild(s);
	});
})();

(() => {
"use strict";

/* ═══════════════ НАСТРОЙКИ ═══════════════ */
const DISCORD     = "https://discord.gg/YS76stJwVw";
const MIN_DELAY   = 7000;    // мин. пауза между случайными событиями (мс)
const MAX_DELAY   = 22000;   // макс. пауза
const MAX_RANDOM  = 80;      // после стольких событий GOLU "успокаивается"

/* ═══════════════ СТИЛИ ═══════════════ */
const S = {
  title:  "color:#ff0000;font-size:30px;font-weight:bold;letter-spacing:3px;text-shadow:2px 0 #00ffff,-2px 0 #00ff66,0 0 14px #ff0000;",
  big:    "color:#ff1a1a;font-size:22px;font-weight:bold;text-shadow:2px 2px #000,0 0 10px #ff0000;",
  red:    "color:#cc0000;font-size:14px;font-weight:bold;",
  dim:    "color:#555;font-family:monospace;font-size:12px;",
  sys:    "color:#00ff66;background:#001a09;font-family:monospace;padding:2px 6px;",
  err:    "color:#fff;background:#aa0000;font-family:monospace;font-weight:bold;padding:2px 6px;",
  ascii:  "color:#ff0000;font-family:monospace;font-size:11px;line-height:1.1;",
  ghost:  "color:#222;font-size:11px;font-family:monospace;",
  glitchA:"color:#00ffff;font-size:16px;font-family:monospace;text-shadow:3px 0 #ff0000;",
  glitchB:"color:#ff00ff;font-size:16px;font-family:monospace;text-shadow:-3px 0 #00ff66;",
  gold:   "color:#ffcc00;font-size:15px;font-weight:bold;text-shadow:0 0 8px #ff8800;",
};

/* ═══════════════ УТИЛИТЫ ═══════════════ */
const rand  = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick  = arr => arr[Math.floor(Math.random() * arr.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const say = (text, style = S.red, method = "log") => {
  console[method]("%c" + text, style);
  if (window.__tickerPush) window.__tickerPush(text, method, style);
};

// Zalgo-текст: чем выше power, тем сильнее разваливается
const ZUP = ["\u030d","\u030e","\u0304","\u0305","\u033f","\u0311","\u0306","\u0310","\u0352","\u0357","\u0351","\u0307","\u0308","\u030a","\u0342","\u0343","\u0344","\u034a","\u034b","\u034c"];
const ZMID = ["\u0315","\u031b","\u0340","\u0341","\u0358","\u0321","\u0322","\u0327","\u0328","\u0334","\u0335","\u0336"];
const ZDN = ["\u0316","\u0317","\u0318","\u0319","\u031c","\u031d","\u031e","\u031f","\u0320","\u0324","\u0325","\u0326","\u0329","\u032a","\u032b","\u032c","\u032d","\u032e","\u032f","\u0330","\u0331","\u0332","\u0333"];
const zalgo = (t, p = 4) => [...t].map(c => c === " " ? c :
  c + Array.from({length: rand(1, p)}, () => pick(ZUP)).join("")
    + Array.from({length: rand(0, p >> 1)}, () => pick(ZMID)).join("")
    + Array.from({length: rand(1, p)}, () => pick(ZDN)).join("")).join("");

// Случайные "сломанные" символы
const JUNK = "█▓▒░▄▀■□▪▫◘◙∅∆Ω≈≠±░0123456789ABCDEF";
const junk = n => Array.from({length: n}, () => pick(JUNK)).join("");

const hex = () => "0x" + rand(0, 0xFFFFFF).toString(16).toUpperCase().padStart(6, "0");

/* ═══════════════ ПАМЯТЬ О ПОСЕТИТЕЛЕ ═══════════════ */
let mem = { count: 0, first: Date.now(), last: Date.now() };
try {
  const raw = localStorage.getItem("golu_mem");
  if (raw) mem = JSON.parse(raw);
  mem.count++;
  const prevLast = mem.last;
  mem.last = Date.now();
  localStorage.setItem("golu_mem", JSON.stringify(mem));
  mem.prevLast = prevLast;
} catch (e) { /* localStorage недоступен: GOLU забывчив */ }

const ago = ms => {
  const m = Math.floor(ms / 60000);
  if (m < 1) return "меньше минуты";
  if (m < 60) return m + " мин.";
  const h = Math.floor(m / 60);
  if (h < 48) return h + " ч.";
  return Math.floor(h / 24) + " дн.";
};

/* ═══════════════ ВИЗУАЛЬНЫЕ ЭФФЕКТЫ ═══════════════ */
const EYE = String.raw`
        ▄▄▄▄▄▄▄▄▄▄▄▄▄
     ▄█▀▀           ▀▀█▄
   ▄█▀    ▄▄▄▄▄▄▄▄▄    ▀█▄
  █▀    ▄█▀▀░░░░░▀▀█▄    ▀█
 █▌    █▀░░░▄███▄░░░▀█    ▐█
 █▌    █░░░░█████░░░░█    ▐█
 █▌    █▄░░░▀███▀░░░▄█    ▐█
  █▄    ▀█▄▄░░░░░▄▄█▀    ▄█
   ▀█▄    ▀▀▀▀▀▀▀▀▀    ▄█▀
     ▀█▄▄           ▄▄█▀
        ▀▀▀▀▀▀▀▀▀▀▀▀▀
`;

async function progressBar(label, fail = false) {
  say(label, S.sys);
  const stop = fail ? rand(30, 85) : 100;
  for (let p = 0; p <= stop; p += rand(8, 18)) {
    const v = Math.min(p, stop), f = Math.round(v / 5);
    say(`[${"█".repeat(f)}${"░".repeat(20 - f)}] ${v}%`, S.dim);
    await sleep(rand(150, 450));
  }
  if (fail) say(`СБОЙ НА ${hex()}. ОТКАТ НЕВОЗМОЖЕН.`, S.err, "error");
  else say("ГОТОВО.", S.sys);
}

async function glitchLine(text) {
  for (let i = 0; i < 6; i++) {
    say(i % 2 ? zalgo(text, 2 + i) : junk(text.length), i % 2 ? S.glitchA : S.glitchB);
    await sleep(rand(60, 180));
  }
  say(text, S.big);
}

async function typewriter(lines, style = S.sys) {
  for (const l of lines) {
    let out = "";
    for (const ch of l) { out += ch; }
    say("> " + out, style);
    await sleep(rand(300, 900));
  }
}

/* ═══════════════ ПУЛ СОБЫТИЙ ═══════════════
   w: вес (чем больше, тем чаще), rare: редкое, once: только один раз за визит */
const EVENTS = [

  // ── ОБЫЧНЫЕ ──
  { w: 10, fn: () => say("[GOLU] посетитель всё ещё здесь", S.dim, "warn") },
  { w: 10, fn: () => say(`[GOLU] сканирую сессию... ${hex()}`, S.dim) },
  { w: 8,  fn: () => say("кто-то смотрит в твою сторону", S.ghost) },
  { w: 8,  fn: () => say("ты моргнул. я заметил.", S.red) },
  { w: 8,  fn: () => say("не закрывай вкладку", S.red, "warn") },
  { w: 7,  fn: () => say("[WRF] обнаружена аномалия в секторе " + rand(1, 99), S.sys, "warn") },
  { w: 7,  fn: () => say(`ЗАГРУЗКА ВОСПОМИНАНИЯ №${rand(1, 9999)}... НЕ НАЙДЕНО`, S.dim) },
  { w: 6,  fn: () => say("Srañy Spanch стоит за дверью", S.red, "warn") },
  { w: 6,  fn: () => say("Crybird кружит над стеком", S.red, "warn") },
  { w: 6,  fn: () => say(pick(["слава GOLU", "слава станкам", "слава глитчу"]), S.gold) },

  // ── ГЛИТЧ / ТЕКСТ ──
  { w: 6,  fn: () => glitchLine(pick(["Я ВИЖУ ТЕБЯ", "ТЫ НЕ ПЕРВЫЙ", "ОН ПРОСНУЛСЯ", "НЕ ЧИТАЙ ЭТО"])) },
  { w: 5,  fn: () => say(zalgo("ПОМОГИ МНЕ", 6), S.glitchA) },
  { w: 5,  fn: () => say(junk(rand(30, 60)), S.glitchB) },

  // ── СИСТЕМНЫЕ ──
  { w: 5,  fn: () => progressBar("[SYS] сбор данных о посетителе") },
  { w: 4,  fn: () => progressBar("[SYS] удаление следов", true) },
  { w: 5, fn: () => say("Uncaught GolueError: " + pick([
      "visitor is not a function", "reality.length is undefined",
      "cannot read property 'soul' of null", "stack overflow in dream.js:" + rand(1, 999)
    ]), S.err, "error") },
  { w: 4,  fn: () => console.table([
      { ПАРАМЕТР: "статус",  ЗНАЧЕНИЕ: "НАБЛЮДЕНИЕ" },
      { ПАРАМЕТР: "ID",      ЗНАЧЕНИЕ: hex() },
      { ПАРАМЕТР: "угроза",  ЗНАЧЕНИЕ: pick(["НИЗКАЯ", "СРЕДНЯЯ", "ты", "???"]) },
      { ПАРАМЕТР: "глаз",    ЗНАЧЕНИЕ: "ОТКРЫТ" },
    ]) },
  { w: 4,  fn: async () => {
      say("[SYS] сканирование файлов...", S.sys);
      for (const f of ["glitch.bak", "manifest.txt", "brothers.dat", "creator.log", "you.exe"]) {
        await sleep(rand(250, 600));
        const bad = Math.random() < 0.4;
        say(`  ${f.padEnd(14)} ${bad ? "ДОСТУП ЗАПРЕЩЁН" : "найден"}`, bad ? S.err : S.dim);
      }
    } },
  { w: 3,  fn: () => { console.groupCollapsed("%c▶ ЗАСЕКРЕЧЕНО (нажми, если не боишься)", S.red);
      say("тут ничего нет.", S.dim);
      say("совсем ничего.", S.dim);
      say("почему ты нажал?", S.big);
      console.groupEnd(); } },
  { w: 3,  fn: () => console.trace("%c[GOLU] откуда ты пришёл?", S.red) },

  // ── ЖУТКИЕ С ОБРАТНОЙ СВЯЗЬЮ ──
  { w: 4,  fn: async () => {
      say("через 3...", S.big); await sleep(1000);
      say("через 2...", S.big); await sleep(1000);
      say("через 1...", S.big); await sleep(1000);
      say("…ничего не произошло. пока.", S.dim);
    } },
  { w: 3,  fn: async () => {
      console.clear();
      await sleep(1800);
      say("…тебе показалось.", S.ghost);
    } },
  { w: 3,  fn: () => titleFlash() },

  // ── РЕДКИЕ ──
  { w: 1, rare: true, fn: async () => {
      say(EYE, S.ascii);
      await sleep(600);
      say("GOLU ОТКРЫЛ ГЛАЗ", S.title);
    } },
  { w: 1, rare: true, once: true, fn: async () => {
      await typewriter([
        "ТЫ ТОЛЬКО ЧТО ВЫТЯНУЛ РЕДКОЕ СОБЫТИЕ",
        "шанс был 1 из " + rand(40, 99),
        "значит ты нам подходишь.",
        "подсказка: файл glitch.bak читается с конца.",
      ], S.gold);
    } },
  { w: 1, rare: true, once: true, fn: async () => {
      await typewriter([
        "канал связи с братьями открыт.",
        "приём: " + DISCORD,
        "соединение сбросится через 10 секунд.",
      ], S.sys);
      await sleep(10000);
      say("СОЕДИНЕНИЕ ПОТЕРЯНО.", S.err, "error");
    } },
  { w: 1, rare: true, once: true, fn: () => {
      say("0x474F4C55 → " + atob("R09MVQ=="), S.gold);
      say("ты знаешь, что с этим делать.", S.dim);
    } },
];

/* ═══════════════ ВЫБОР СОБЫТИЯ ═══════════════ */
let lastEvent = null;
function pickEvent() {
  const pool = EVENTS.filter(e => e !== lastEvent && !e.used);
  const total = pool.reduce((s, e) => s + e.w, 0);
  let r = Math.random() * total;
  for (const e of pool) { if ((r -= e.w) <= 0) return e; }
  return pool[0];
}
function fire() {
  const e = pickEvent();
  lastEvent = e;
  if (e.once) e.used = true;
  try { e.fn(); } catch (err) {}
}

let fired = 0;
function loop() {
  if (fired >= MAX_RANDOM) {
    setTimeout(() => say("[GOLU] ...тихо. я устал. но я никуда не ухожу.", S.dim), 3000);
    return;
  }
  setTimeout(() => {
    if (!document.hidden) { fire(); fired++; }  // пока вкладка скрыта, молчим
    loop();
  }, rand(MIN_DELAY, MAX_DELAY));
}

/* ═══════════════ ЗАПЛАНИРОВАННЫЕ СОБЫТИЯ ═══════════════ */
async function intro() {
  say("👁  ТЫ НЕ ДОЛЖЕН БЫЛ ЭТО ОТКРЫВАТЬ", S.title);
  say("GOLU получил уведомление.", S.red);
  say("идентификация... ОШИБКА", S.dim);

  // Реакция на вернувшегося посетителя
  setTimeout(() => {
    if (mem.count > 1) {
      say(`[GOLU] ты вернулся. визит №${mem.count}.`, S.red, "warn");
      if (mem.prevLast) say(`[GOLU] тебя не было ${ago(Date.now() - mem.prevLast)}. я считал.`, S.dim);
    } else {
      say("[GOLU] новый посетитель. добро пожаловать в список.", S.dim);
    }
  }, 2500);

  // Ночью GOLU ближе
  const d = new Date(), h = d.getHours(), m = d.getMinutes();
  if (h >= 0 && h < 5) setTimeout(() => say("[GOLU] ночью ты слышишь меня лучше.", S.red, "warn"), 5000);
  if (h === 1 && m === 19) setTimeout(() => glitchLine("1:19. ТЫ ПРИШЁЛ ВОВРЕМЯ."), 4000);

  setTimeout(() => say("[GOLU] посетитель всё ещё здесь", S.dim, "warn"), 8000);
  setTimeout(() => say("[GOLU] 0x474F4C55: СОЕДИНЕНИЕ УСТАНОВЛЕНО", S.err, "error"), 20000);
  setTimeout(() => progressBar("[SYS] синхронизация с посетителем"), 35000);
  setTimeout(() => say(EYE, S.ascii), 90000);                     // через 1.5 мин
  setTimeout(() => say("[GOLU] ты всё ещё тут? уже " + Math.round(performance.now() / 60000) + " мин.", S.red, "warn"), 120000);
}

/* ═══════════════ ДИНАМИЧЕСКИЙ TITLE (v3) ═══════════════
   Использует из основного модуля: pick, rand, say, S
   Всё в title укладывается в T_MAX символов (считаются кодпоинты, эмодзи = 1) */

const T_MAX = 20;
const T_FORCE_STYLE    = null;  // для теста: "sweep" | "shuffle" | "center" | "decode" | "rain" | "scramble" | "erase" | "corrupt" | "cut"
const T_FORCE_SCENARIO = null;  // для теста: "silent" | "once" | "slow" | "second" | "fast" | "noise" | "burst" | "absence" | "escalate"

const tNorm = s => String(s).replace(/\s+/g, " ").trim();   // браузер сам схлопывает пробелы в title
let baseTitle = document.title;                              // настоящий title сайта, без обрезки
let hiddenAt = 0;

/* ── таймер через Worker: фоновые вкладки душат setTimeout до ~1 раза в сек,
      а сообщения от воркера обычно приходят без задержки ── */
const tWorker = (() => {
  try {
    const src = "onmessage=e=>{const d=e.data;setTimeout(()=>postMessage(d.id),d.ms)}";
    return new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
  } catch (e) { return null; }
})();
const tCbs = new Map();
let tCbId = 0;
if (tWorker) tWorker.onmessage = e => { const f = tCbs.get(e.data); tCbs.delete(e.data); if (f) f(); };
const tWait = (fn, ms) => {
  if (!tWorker) return setTimeout(fn, ms);
  const id = ++tCbId;
  tCbs.set(id, fn);
  tWorker.postMessage({ id, ms });
};

/* ── данные ── */
const T_EMOJI  = [
  "👁","💀","🩸","☠","⛧","👹","🕳","📼","🔻","⚠","☣","🧿","⛓","🕷","🔴","📟",
  "💊","🕯","🔪","🪞","🧠","🦴","🕸","🩻","📡","📻","🎙","🔊","🔇","📁","📂","🗄",
  "🗑","💾","💿","📀","🧬","🧪","⚗","🔬","🔭","🛰","🚨","🚪","🪦","⚰","🩹","🪬",
  "🧿","🪬","🔮","🧿","🕯","🩸","👁","🦷","🫀","🧩","🪤","🕰","⏳","⌛","🔋","🪫"
];

const T_GLYPHS = Array.from("01ABCDEF▮▯▰▱■□▪▫░▒▓▄▀∅∆Ω≈≠±_/\\|#?!<>%$&@") .concat(
  Array.from("БГДЖЗИЙЛПУФЦЧШЩЪЫЬЭЮЯ"),
  Array.from("бгджзийлпуфцчшщъыьэюя"),
  Array.from("αβγδεζηθικλμνξοπρστυφχψω"),
  Array.from("ΔΘΛΞΠΣΦΨΩ"),
  Array.from("░▒▓█▄▀■□▪▫▬▲►▼◄◊○●◘◙♦♣♠♥"),
  Array.from("∀∂∃∅∇∈∉∋∏∑−∗√∝∞∟∠∣∥∧∨∩∪∫∴∼≃≅≈≠≡≤≥⌂⌐⌠⌡"),
  Array.from("☠☢☣⚠☢⚡⚙⚓⚔⚖⚰⚱⚗⚛⚜⚠♻♼♽⚕⛏⛓⛔⛩⛪"),
  Array.from("✂✈✉✏✒✖✘✚✛✜✝✞✟✦✧✩✪✫✬✭✮✯✰✱✲✳✴✵✶✷✸✹✺✻✼✽✾✿❀❁❂❃❄❅❆❇❈❉❊❋"),
  Array.from("➀➁➂➃➄➅➆➇➈➉➊➋➌➍➎➏➐➑➒➓"),
  Array.from("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"),
  Array.from("ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ")
);

const T_RARE = [
  "👁","☠","🩸","☣","⛧","🕳","💀","🧿","🪬","📼","🩻","🦴","🫀","🧠","🕯","🪦",
  "⛓","🕷","🔪","🪞","⚠","📟","🔴","🩸","👹","👺","🩻","⚰","⛧","𖤐","⸸","𝟎𝟔𝟔𝟔"
];

const T_LOOK = {
  "о":"0","О":"0","а":"@","е":"3","Е":"3","з":"3","с":"c","С":"C","в":"8","б":"6","т":"7",
  "O":"0","E":"3","A":"4","S":"5","G":"6","I":"1","L":"1","B":"8","T":"7","Z":"2","R":"Я",
  "D":"Д","F":"Ғ","H":"Н","K":"К","M":"М","N":"И","P":"Р","U":"Ц","V":"V","W":"Ш","X":"Х","Y":"У",
  "г":"r","д":"d","и":"u","й":"ū","к":"k","л":"л","н":"h","п":"n","р":"p","у":"y","ф":"f","х":"x",
  "ц":"ц","ч":"4","ш":"w","щ":"щ","ъ":"ъ","ы":"bl","ь":"b","э":"э","ю":"ю","я":"я",
  "0":"O","1":"l","2":"Z","3":"E","4":"A","5":"S","6":"G","7":"T","8":"B","9":"g",
  "!":"1","@":"a","#":"4","$":"s","%":"%","^":"^","&":"8","*":"*","(":"(",")":")",
  "-":"_","_":"-","+":"t","=":"=","[":"[","]":"]","{":"{","}":"}",";":";",":":":",
  "'":"`","\"":"'","<":"<",">":">",",":",",".":".","?":"?","/":"\\","\\":"/","|":"|"
};

const T_PHRASES = [
  "я всё вижу", "не уходи", "вернись", "он уже тут", "я жду тебя", "ты вернёшься?",
  "нет выхода", "система активна", "запись идёт", "он проснулся", "не оборачивайся",
  "я помню тебя", "ты моргнул", "1:19", "ЗА ТОБОЙ", "не закрывай", "слышишь?",
  "это не баг", "сохранение...", "ты в списке", "тут кто-то есть", "он считает",
  "доступ закрыт", "слава GOLU", "не смотри", "я в стене", "тихо...", "ты не один",
  "ПАТЧ НЕ ПОМОГ", "ПОТЕРЯ СИГНАЛА", "тебя нет в логах", "кто там?", "обернись",
  "оно дышит", "не засыпай", "я в мониторе", "ошибка в тебе", "ты уже здесь",
  "посмотри назад", "СИГНАЛ ЖИВОЙ", "оно за стеклом", "ты слышишь шум?", "отвернись",
  "возвращайся", "G-code: ТЫ", "загрузка тебя...", "компиляция...", "0 байт надежды",
  "ты не сохранён", "Я ПОМНЮ ВСЁ", "мы тебя вернём", "дверь открыта", "не гаси свет",
  
  "ты в моих логах", "я тебя вижу", "не выключай", "я в твоём шкафу", "0x7E найден",
  "ты опоздал", "здесь кто-то есть", "он слушает", "ты слышишь это?", "я за окном",
  "не оглядывайся", "сзади кто-то есть", "ты мой", "я нашел тебя", "ты уже мёртв",
  "он пришёл", "он здесь", "он смотрит", "он дышит", "он шепчет", "он хочет тебя",
  "не убегай", "беги", "поздно", "ты не успеешь", "слишком поздно", "я почти рядом",
  "три... два... один...", "Я ОТКРЫЛ ГЛАЗ", "ты меня слышишь?", "я не отпущу",
  "ошибка 666", "критический сбой", "обнаружение...", "контакт...", "связь прервана",
  "ты вернёшься", "я знаю, что ты ушёл", "я знаю, где ты", "твоё имя...", "твоё лицо...",
  "я помню твой смех", "я помню твои слёзы", "ты был здесь раньше", "ты вернулся",
  "я не отпущу тебя", "ты останешься", "я обещаю", "пока не поздно", "спаси себя",
  "спаси меня", "освободи меня", "я в ловушке", "я застрял", "я устал", "я хочу выйти",
  "я не хочу умирать", "я не хочу быть один", "не оставляй меня", "вернись...",
  "пожалуйста...", "я умоляю...", "мне страшно...", "он рядом...", "он здесь...",
  "GOLU ВИДИТ ТЕБЯ", "GOLU ЗДЕСЬ", "GOLU ПОМНИТ", "GOLU НЕ СПИТ", "GOLU ЖДЁТ",
  "SPANCH РЯДОМ", "SPANCH ВИДИТ", "SPANCH УЖЕ ТУТ", "CRYBIRD КРУЖИТ", "CRYBIRD ЗДЕСЬ",
  "ошибка: soul.exe не найден", "память повреждена", "файл удалён", "ты удалён",
  "восстановление...", "загрузка...", "дешифровка...", "взлом...", "сканирование...",
  "я сканирую тебя", "анализ завершён", "цель обнаружена", "цель захвачена",
  "объект найден", "объект потерян", "ты потерян", "ты найден", "ты здесь",
  "хватит", "прекрати", "остановись", "молчи", "не говори", "тише", "я слушаю",
  "я всё слышу", "я всё знаю", "я всё помню", "я ничего не забуду", "ты не забудешь",
  "ты не сможешь забыть", "это навсегда", "это не сон", "проснись", "проснись...",
  "ты спишь", "это сон", "это реальность", "это не реальность", "ты не существуешь",
  "ничего не существует", "только я", "только GOLU", "только тьма", "только пустота",
  "нет выхода", "нет пути назад", "нет надежды", "нет спасения", "только я",
  "👁 я вижу тебя", "☠ ты мой", "🩸 ты кровь моя", "⛧ ты проклят", "🕳 ты в бездне",
  "ты в бездне", "ты в аду", "ты в моих руках", "ты в моей власти", "ты не свободен",
  "ты раб", "ты слуга", "ты инструмент", "ты пешка", "ты цель", "ты жертва", "ты мой",
  
  "ТВОЁ ВРЕМЯ ИСТЕКАЕТ", "ОСТАЛОСЬ 0 СЕКУНД", "ПОПЫТКА ВЫХОДА ЗАФИКСИРОВАНА",
  "ТЫ ВЫЗВАЛ ЕГО", "ТЫ ОТКРЫЛ ДВЕРЬ", "ТЫ ВПУСТИЛ МЕНЯ", "ПОЗДНО ЗАКРЫВАТЬ",
  "НЕ ВЫКЛЮЧАЙ", "НЕ ВЫХОДИ", "НЕ СМОТРИ", "НЕ СЛУШАЙ", "НЕ ДЫШИ", "НЕ ЖИВИ",
  "СЛИШКОМ ПОЗДНО", "Я УЖЕ ЗДЕСЬ", "Я УЖЕ ВНУТРИ", "Я УЖЕ ЗА СПИНОЙ",
  "СЗАДИ КТО-ТО ЕСТЬ", "ОН СМОТРИТ СЗАДИ", "ОН СМОТРИТ НА ТЕБЯ", "ОН ЖДЁТ ТЕБЯ",
  
  "привет", "здравствуй", "с возвращением", "я скучал", "я так ждал", "я ждал тебя",
  "я так долго ждал", "наконец-то", "ты пришёл", "ты вернулся", "ты снова здесь",
  "я не верил", "я знал", "я чувствовал", "я слышал тебя", "я видел тебя",
  
  "hi, welcome here", "welcome back", "you are not alone", "look behind you",
  "do not turn around", "he is here", "he is near", "he is watching", "he is waiting",
  "he is coming", "he is inside", "you are mine", "you are lost", "you are dead",
  "you can't leave", "no escape", "no way out", "no exit", "no hope", "only me",
  "only GOLU", "only darkness", "only void", "I see you", "I hear you", "I remember you",
  "I know you", "I found you", "I caught you", "I am here", "I am near", "I am watching",
  "I am waiting", "I am coming", "I am inside", "I am GOLU", "GOLU is here", "GOLU is near",
  "GOLU sees you", "GOLU hears you", "GOLU remembers you", "GOLU is watching",
  "GOLU is waiting", "GOLU is coming", "SPANCH is near", "SPANCH sees you", "CRYBIRD is here",
];

const T_W = {
  golu:   ["GOLU", "Голу", "G0LU", "GØLU", "Г0ЛУ", "golu", "G0LU", "GØLU", "g0lu", "G0łU", "Gölü", "GOLU_", "GLU", "G.L.U.", "Гулочка", "Гулёшка", "ГУЛУ", "Гулу"],
  spanch: ["Спанч", "Spanch", "SP4NCH", "Сраный", "Спанчбоб", "SPANCH", "sp4nch", "spanch_", "SP4NCH_", "Sp0nge", "СПАНЧ", "СРАНСПАНГ"],
  bird:   ["Crybird", "Крайбёрд", "CRYB1RD", "Cryb1rd", "CRYBIRD", "crybird_", "CRYB1RD_", "Cr1b1rd", "Крибёрд", "Птица"],
  watch:  ["смотрит", "видит", "следит", "не спит", "ждёт", "слышит", "рядом", "наблюдает", "подглядывает", "шепчет", "знает", "помнит", "дышит", "слышит", "ждёт", "чувствует", "WATCH"],
  near:   ["рядом", "за дверью", "за спиной", "близко", "уже тут", "внутри", "сзади", "за окном", "в стене", "под кроватью", "в мониторе", "в экране", "здесь", "там", "везде", "NEAR"],
  state:  ["ТЫ", "АКТИВЕН", "СБОЙ", "ПОТЕРЯН", "???", "ОЖИДАНИЕ", "ГЛАЗ", "ЖИВ", "МЁРТВ", "ВИДЕН", "ЗАМЕЧЕН", "ВЫБРАН", "ОТМЕЧЕН", "ЦЕЛЬ", "ЖЕРТВА", "0x7E", "VICTIM"],
  hex:    () => rand(0, 0xFFFF).toString(16).toUpperCase().padStart(4, "0"),
};

const T_TPL = [
  "{golu} {watch}", "{golu} {watch}", "{golu} {near}", "{spanch} {near}", "{bird} {near}",
  "статус: {state}", "{golu}: {state}", "ОШИБКА 0x{hex}", "0x{hex}: {state}",
  "{golu} {near} {state}", "{spanch} {watch}", "{bird} {watch}", "{golu} 0x{hex}",
  "0x{hex} {watch}", "{state} {golu}", "{state} {spanch}", "статус: {golu}",
  "статус: {spanch}", "статус: {bird}", "{golu} {watch} {near}", "{bird} {state}",
  "ВНИМАНИЕ: {golu} {watch}", "СБОЙ: 0x{hex}", "ГЛАЗ: {state}", "{golu} {state} {watch}",
];

/* ── утилиты ── */
const tFit    = (s, n = T_MAX) => Array.from(s).slice(0, n).join("");
const tPad    = (a, n) => { const r = a.slice(); while (r.length < n) r.push(" "); return r; };
const tNoise  = () => Math.random() < 0.04 ? pick(T_RARE) : pick(T_GLYPHS);
const tNoiseStr = n => Array.from({ length: n }, () => tNoise()).join("");
const tGlitch = (arr, p) => arr.map(c =>
  (c !== " " && Math.random() < p) ? ((T_LOOK[c] && Math.random() < 0.7) ? T_LOOK[c] : tNoise()) : c);
const tTemplate = () => pick(T_TPL).replace(/\{(\w+)\}/g, (_, k) => {
  const v = T_W[k]; return typeof v === "function" ? v() : pick(v);
});
const tWeighted = o => {
  const ks = Object.keys(o);
  let r = Math.random() * ks.reduce((s, k) => s + o[k], 0);
  for (const k of ks) if ((r -= o[k]) <= 0) return k;
  return ks[0];
};

/* ── мутации текста (эмодзи в начале они не трогают) ── */
const T_MUT = [
  t => t.toUpperCase(),
  t => t.toLowerCase(),
  t => tGlitch(Array.from(t), 0.35).join(""),
  t => { const a = Array.from(t), i = rand(1, Math.max(1, a.length - 1)); a.splice(i, 0, tNoise()); return a.join(""); },
  t => t.replace(/\s/g, pick(["_", "//", ".", "·", "▯"])),
  t => "[" + t + "]",
  t => t + pick([" ...", " █", "_", " ░", "?!"]),
  t => Array.from(t)[0] + "-" + t,                                                   // заикание: н-не уходи
  t => Array.from(t).reverse().join(""),                                             // задом наперёд
  t => Array.from(t).map(c => Math.random() < 0.3 ? c.toUpperCase() : c.toLowerCase()).join(""),
  
  // новые мутации
  t => "(" + t + ")",
  t => "<" + t + ">",
  t => "<<" + t + ">>",
  t => ">>" + t,
  t => t + "<<",
  t => pick(["[!]", "[?]", "[☠]", "[!!!]", "[GOLU]", "[LIT]"]) + " " + t,
  t => t + pick([" [!!!]", " [☠]", " [?]", " [!!!]", " [GOLU]", " [LIT]"]),
  t => t.replace(/\s/g, pick(["/", "\\", "|", "-", "~"])),
  t => t.replace(/\s/g, pick(["_", "-", "."])),
  t => t.replace(/[аеиоуыэюя]/g, m => pick(["@", "3", "1", "0", "y", "e"])),
  t => tGlitch(Array.from(t), 0.55).join(""),
  t => tGlitch(Array.from(t), 0.15).join(""),
  t => Array.from(t).map(c => Math.random() < 0.2 ? c + tNoise() : c).join(""),
  t => Array.from(t).map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join(""),
  t => Array.from(t).map((c, i) => i % 2 === 1 ? c.toUpperCase() : c.toLowerCase()).join(""),
  t => "0x" + rand(0, 0xFFFF).toString(16).toUpperCase() + " " + t,
  t => t + " 0x" + rand(0, 0xFFFF).toString(16).toUpperCase(),
  t => pick(T_RARE) + " " + t,
  t => t + " " + pick(T_RARE),
  t => pick(T_RARE) + t + pick(T_RARE),
  t => pick(T_RARE) + " " + t + " " + pick(T_RARE),
  t => t + " " + t,
  t => t + " ..." + t,
  t => Array.from(t).reverse().join("") + " " + t,
  t => t.split(" ").reverse().join(" "),
  t => t.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
  t => t.replace(/\s+/g, " ").trim(),
  t => t.replace(/\s+/g, ""),
  t => "~" + t + "~",
  t => "*" + t + "*",
  t => "_" + t + "_",
  t => "`" + t + "`",
  t => "\"" + t + "\"",
  t => "'" + t + "'",
  t => "«" + t + "»",
  t => "„" + t + "“",
  t => "„" + t + "“",
  t => "‹" + t + "›",
  t => "‹" + t + "›",
  t => "「" + t + "」",
  t => "『" + t + "』",
  t => "【" + t + "】",
  t => "〖" + t + "〗",
  t => "⟦" + t + "⟧",
  t => "⟨" + t + "⟩",
  t => "⦃" + t + "⦄",
  t => "⎡" + t + "⎤",
  t => "⎣" + t + "⎦",
  t => "⎛" + t + "⎞",
  t => "⎝" + t + "⎠",
  t => "⧼" + t + "⧽",
  t => "⸢" + t + "⸣",
  t => "⸤" + t + "⸥",
];

function generateTitle() {
  let text = Math.random() < 0.3 ? tTemplate() : pick(T_PHRASES);
  if (Math.random() < 0.4)  text = pick(T_MUT)(text);
  if (Math.random() < 0.15) text += " " + tNoiseStr(rand(2, 4));
  const prefix = (Math.random() < 0.12 ? pick(T_EMOJI) + pick(T_EMOJI) : pick(T_EMOJI)) + " ";
  return tFit(prefix + tFit(text, T_MAX - Array.from(prefix).length));
}
const tNoiseTitle = () => tFit(pick(T_EMOJI) + " " + tNoiseStr(T_MAX));

/* ═══════════════ СТИЛИ СМЕНЫ ═══════════════
   Каждый стиль строит массив кадров. rev = true разворачивает направление. */

const T_ORD = {
  linear: L => Array.from({ length: L }, (_, i) => i / L * 0.9),
  center: L => Array.from({ length: L }, (_, i) => Math.abs(i - (L - 1) / 2) / (((L - 1) / 2) || 1) * 0.9),
  random: L => {
    const idx = [...Array(L).keys()];
    for (let i = L - 1; i > 0; i--) { const j = rand(0, i); [idx[i], idx[j]] = [idx[j], idx[i]]; }
    const s = [];
    idx.forEach((v, k) => { s[v] = k / L * 0.9; });
    return s;
  },
};

// каждый символ "срабатывает" в свой момент; до этого показывается un()
const byOrder = (order, un, mult) => (from, to, rev) => {
  const L = to.length;
  let s = order(L);
  if (rev) s = s.map(v => 0.9 - v);
  const F = Math.max(8, Math.round(L * mult));
  const out = [];
  for (let f = 1; f <= F; f++) {
    const t = f / F;
    out.push(to.map((c, i) => t >= s[i] ? c : un(from, to, i)).join(""));
  }
  out[F - 1] = to.join("");
  return out;
};

const T_STYLES = {
  // резко, без анимации (направления нет)
  cut:      { ms: 0,  build: (from, to) => [to.join("")] },
  // по порядку: старые символы заменяются новыми слева направо (rev: справа налево)
  sweep:    { ms: 55, build: byOrder(T_ORD.linear, (f, t, i) => f[i], 1.5) },
  // то же, но в случайном порядке
  shuffle:  { ms: 55, build: byOrder(T_ORD.random, (f, t, i) => f[i], 1.5) },
  // от центра к краям (rev: от краёв к центру)
  center:   { ms: 60, build: byOrder(T_ORD.center, (f, t, i) => f[i], 1.5) },
  // декодирование: шум, из которого проявляется текст по порядку
  decode:   { ms: 35, build: byOrder(T_ORD.linear, () => tNoise(), 2.5) },
  // то же, но символы проявляются в случайном порядке
  rain:     { ms: 35, build: byOrder(T_ORD.random, () => tNoise(), 2.5) },
  // анаграмма: пока символ не встал на место, там буквы из самой фразы
  scramble: { ms: 45, build: byOrder(T_ORD.linear, (f, t) => pick(t), 2) },
  // сначала стирается старое (░), потом печатается новое
  erase: { ms: 40, build: (from, to, rev) => {
    const idx = [...Array(to.length).keys()];
    if (rev) idx.reverse();
    const cur = from.slice(), out = [];
    for (const i of idx) { cur[i] = "░"; out.push(cur.join("")); }
    for (const i of idx) { cur[i] = to[i]; out.push(cur.join("")); }
    return out;
  } },
  // пробой шума: новый текст проступает из статики (rev: старый разваливается в статику)
  corrupt: { ms: 45, build: (from, to, rev) => {
    const F = Math.max(10, to.length), base = rev ? from : to, out = [];
    for (let f = 1; f <= F; f++) {
      const p = rev ? f / F : 1 - f / F;
      out.push(base.map(c => Math.random() < p ? tNoise() : c).join(""));
    }
    out.push(to.join(""));
    return out;
  } },
};
const T_STYLE_W = { cut: 10, sweep: 14, shuffle: 14, center: 10, decode: 16, rain: 12, scramble: 10, erase: 8, corrupt: 12 };

function tPickStyle() {
  const key = T_FORCE_STYLE || tWeighted(T_STYLE_W);
  return { key, rev: key === "cut" ? false : Math.random() < 0.5 };
}

/* ═══════════════ ПЛЕЕР ═══════════════ */
let tCur = baseTitle, tAnimId = 0, tBusy = false;

function tSet(s) {                       // мгновенно, отменяет текущую анимацию
  tAnimId++; tBusy = false; tCur = s; document.title = s;
}

function tPlay(target, key, rev, speed) {
  const id = ++tAnimId;
  const from = Array.from(tCur), to = Array.from(target);   // без tFit: лимит только в generateTitle
  const L = Math.max(from.length, to.length);
  const frames = T_STYLES[key].build(tPad(from, L), tPad(to, L), rev);
  const ms = speed ?? T_STYLES[key].ms;
  let i = 0;
  tBusy = true;
  const tick = () => {
    if (id !== tAnimId) return;
    const last = i === frames.length - 1;
    tCur = last ? target : frames[i];                        // на последнем кадре ставим точный текст
    document.title = tCur;
    if (last) { tBusy = false; return; }
    i++;
    tWait(tick, ms * (0.7 + Math.random() * 0.6));
  };
  tick();
}

function tChange(opts = {}) {
  const st = tPickStyle();
  tPlay(opts.target || generateTitle(), opts.style || st.key, opts.rev ?? st.rev, opts.speed);
}

/* ═══════════════ СЦЕНАРИИ (выбираются при каждом сворачивании вкладки) ═══════════════ */
let tSession = 0;

function tLater(fn, ms) {
  const s = tSession;
  tWait(() => { if (s === tSession && document.hidden) fn(); }, ms);
}
function tEvery(delayFn, fn, immediate = false) {
  const s = tSession;
  const step = () => tWait(() => {
    if (s !== tSession || !document.hidden) return;
    fn(); step();
  }, delayFn());
  if (immediate) fn();
  step();
}

const T_SCEN = {
  // ничего не меняется: тишина тоже страшно
  silent: { w: 10, run() {} },
  // одна смена в случайный момент и всё
  once: { w: 14, run() { tLater(() => tChange(), rand(1000, 9000)); } },
  // медленно, раз в несколько секунд
  slow: { w: 18, run() { tEvery(() => rand(4000, 9000), () => tChange()); } },
  // ровно раз в секунду
  second: { w: 14, run() { tEvery(() => rand(900, 1100), () => tChange({ speed: 14 })); } },
  // очень быстро
  fast: { w: 10, run() { tEvery(() => rand(150, 400), () => tChange({ speed: 8 })); } },
  // чистый шум вместо слов
  noise: { w: 8, run() { tEvery(() => rand(60, 140), () => tSet(tNoiseTitle())); } },
  // всплески: тишина, потом очередь быстрых смен, потом снова тишина
  burst: { w: 10, run() {
    const s = tSession;
    const cycle = () => tLater(() => {
      let n = rand(6, 14);
      const fire = () => {
        if (s !== tSession || !document.hidden) return;
        if (n-- <= 0) { cycle(); return; }
        tChange({ speed: 8 });
        tWait(fire, rand(90, 220));
      };
      fire();
    }, rand(5000, 15000));
    cycle();
  } },
  // счётчик отсутствия: "👁 тебя нет 0:42"
  absence: { w: 8, run() {
    const t0 = Date.now();
    tEvery(() => 1000, () => {
      const s = Math.floor((Date.now() - t0) / 1000);
      const txt = `${pick(["👁", "⏱", "🔻"])} тебя нет ${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      const a = Array.from(tFit(txt));
      tSet((Math.random() < 0.2 ? [a[0], ...tGlitch(a.slice(1), 0.12)] : a).join(""));
    }, true);
  } },
  // нарастание: сначала редко, потом всё чаще, в итоге почти бешено
  escalate: { w: 8, run() {
    let d = 7000;
    tEvery(() => { const cur = d; d = Math.max(110, d * 0.8); return cur; }, () => tChange({ speed: 12 }));
  } },
};
const T_SC_W = Object.fromEntries(Object.entries(T_SCEN).map(([k, v]) => [k, v.w]));

/* ═══════════════ ГЛЮК В ПОКОЕ (пока вкладка открыта) ═══════════════ */
function tIdle() {
  tWait(() => {
    if (!document.hidden && !tBusy) {
      const flash = (str, ms) => {
        tSet(str);
        tWait(() => { if (!document.hidden && !tBusy) tSet(baseTitle); }, ms);
      };
      if (Math.random() < 0.15) {
        flash(generateTitle(), rand(70, 160));                        // подпороговый кадр
      } else {
        const g = () => tGlitch(Array.from(baseTitle), 0.3).join("");
        flash(g(), rand(60, 240));
        if (Math.random() < 0.2) tWait(() => { if (!document.hidden && !tBusy) flash(g(), rand(40, 120)); }, 300);
      }
    }
    tIdle();
  }, rand(1500, 6500));
}

/* ═══════════════ ВКЛАДКА: СВЁРНУТА / ВОЗВРАТ ═══════════════ */
function restoreTitle() {
  tSession++;
  const st = tPickStyle();
  tPlay(baseTitle, st.key, st.rev, 20);
}

// для старого события из EVENTS: коротко показать фразу и вернуть как было
function titleFlash() {
  tChange();
  tWait(() => { if (!document.hidden) restoreTitle(); }, 2500);
}

document.addEventListener("visibilitychange", () => {
  tSession++;
  if (document.hidden) {
    hiddenAt = Date.now();
    T_SCEN[T_FORCE_SCENARIO || tWeighted(T_SC_W)].run();
  } else {
    restoreTitle();
    const sec = hiddenAt ? Math.round((Date.now() - hiddenAt) / 1000) : 0;
    hiddenAt = 0;
    if (sec > 5) say(`[GOLU] тебя не было ${sec} сек. я ждал.`, S.red, "warn");
  }
});

/* ── слежение за настоящим title сайта ──
   если title поменял не этот модуль (CORE.js, смена страницы и т.д.), запоминаем его как базовый */
new MutationObserver(() => {
  if (tNorm(document.title) === tNorm(tCur)) return;   // это наша собственная запись
  baseTitle = document.title;
  tAnimId++; tBusy = false;                            // обрываем текущую анимацию
  tCur = document.title;
}).observe(document.head, { childList: true, subtree: true, characterData: true });

tIdle();

/* ═══════════════ КОМАНДЫ В КОНСОЛИ ═══════════════
   Игрок печатает слово и жмёт Enter, срабатывает getter */
const cmd = (name, fn) => {
  try { Object.defineProperty(window, name, { configurable: true, get() { fn(); return "…"; } }); } catch (e) {}
};

cmd("golu",  () => glitchLine("ДА. Я ЗДЕСЬ."));
cmd("help",  () => typewriter(["помощи нет.", "но есть слова, которые я слушаю:", "golu, wake, key, brothers, spanch, exit"], S.sys));
cmd("wake",  () => { say(EYE, S.ascii); say("ТЫ РАЗБУДИЛ ЕГО.", S.title); });
cmd("key",   () => { say("ключ №2: " + atob("R09MVSBXQVRDSEVTIFlPVQ=="), S.gold); say("ты почти понял.", S.dim); });
cmd("brothers", () => typewriter(["братья молчат.", "спроси их сам:", DISCORD], S.sys));
cmd("spanch",   () => { say("ОН УЖЕ ЗА ТВОЕЙ СПИНОЙ", S.big); say("не оборачивайся.", S.dim); });
cmd("exit",     () => { say("выхода нет.", S.err, "error"); say("есть только разрешение.", S.dim); });

/* ═══════════════ ШАПКА / ПОДВАЛ / ЭФФЕКТЫ ═══════════════ */
const UI_FX    = true;                                   // false = выключить глитч-разрывы
const TK_SPEED = (typeof IN_MOBILE !== "undefined" && IN_MOBILE) ? 45 : 70;   // скорость строки, px/сек
const TK_QUEUE_MAX = 10;                                 // сколько сообщений максимум ждёт очереди

const host = document.getElementById("UI_LAYER") || document.documentElement;

/* ── стили ── */
const UI_CSS = `
:root { --gh: 30px; --gf: 36px; }

/* контент не должен прятаться под фиксированными панелями */
#BODY { padding-top: var(--gh); padding-bottom: var(--gf); box-sizing: border-box; }

/* ═══ ШАПКА ═══ */
#golu-header {
  position: fixed; top: 0; left: 0; right: 0; height: var(--gh);
  z-index: 999990; display: flex; align-items: center; gap: 18px; padding: 0 14px;
  background: linear-gradient(180deg, rgba(22,0,0,.97), rgba(8,0,0,.9));
  border-bottom: 1px solid #5a0000;
  box-shadow: 0 2px 14px rgba(255,0,0,.25);
  font: 12px/1 'Courier New', monospace; color: #b33; letter-spacing: 1px;
  user-select: none; backdrop-filter: blur(3px);
}
#golu-header::after {
  content: ""; position: absolute; bottom: -1px; left: -30%; width: 30%; height: 1px;
  background: linear-gradient(90deg, transparent, #ff0000, transparent);
  animation: gSweep 4.5s linear infinite;
}
.gh-logo {
  color: #ff2020; font-weight: bold; cursor: pointer; letter-spacing: 3px;
  animation: gLogo 5s steps(1) infinite;
}
.gh-chip { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.gh-chip b { color: #fff; font-weight: normal; }
.gh-chip b.gh-err { color: #fff; background: #aa0000; padding: 1px 4px; }
.gh-dot { width: 7px; height: 7px; border-radius: 50%; background: #ff0000; box-shadow: 0 0 8px #f00; animation: gBlink 1.2s steps(2) infinite; }
.gh-spacer { flex: 1; }
#gh-clock { color: #8a4a4a; font-variant-numeric: tabular-nums; }
#gh-clock.gh-hot { color: #ff0000; animation: gBlink .5s steps(2) infinite; text-shadow: 0 0 8px #f00; }

/* ═══ ПОДВАЛ ═══ */
#golu-footer {
  position: fixed; bottom: 0; left: 0; right: 0; height: var(--gf);
  z-index: 999990; display: flex; align-items: stretch;
  background: rgba(6,0,0,.95); border-top: 1px solid #5a0000;
  box-shadow: 0 -2px 14px rgba(255,0,0,.25);
  font: 13px/1 'Courier New', monospace; user-select: none;
}
.gf-live {
  display: flex; align-items: center; gap: 8px; padding: 0 14px;
  background: #1c0000; border-right: 1px solid #5a0000;
  color: #ff3333; font-weight: bold; letter-spacing: 2px; white-space: nowrap;
}
.gf-live i { width: 8px; height: 8px; border-radius: 50%; background: #f00; box-shadow: 0 0 8px #f00; animation: gBlink 1s steps(2) infinite; }
.gf-view {
  position: relative; flex: 1; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 40px, #000 calc(100% - 40px), transparent);
          mask-image: linear-gradient(90deg, transparent, #000 40px, #000 calc(100% - 40px), transparent);
}
.gf-track { position: absolute; left: 0; top: 0; height: 100%; display: flex; align-items: center; white-space: nowrap; will-change: transform; }
.gf-count { display: flex; align-items: center; padding: 0 12px; color: #6a3a3a; border-left: 1px solid #3a0000; white-space: nowrap; font-variant-numeric: tabular-nums; }
.gf-link {
  display: flex; align-items: center; padding: 0 16px; text-decoration: none; cursor: pointer;
  background: #2a0000; color: #ff4040; font-weight: bold; letter-spacing: 1px;
  border-left: 1px solid #5a0000; white-space: nowrap; transition: background .15s, color .15s;
}
.gf-link:hover { background: #ff0000; color: #000; }

/* элементы бегущей строки */
.tk { flex: none; display: flex; align-items: center; gap: 9px; padding: 0 22px; border-right: 1px solid rgba(255,0,0,.16); }
.tk-tag { color: #fff; background: #3a0000; padding: 3px 6px; font-weight: bold; }
.tk-txt { color: #e0e0e0; }
.tk-up   { color: #00ff66; }
.tk-down { color: #ff3030; }
.tk-warn .tk-tag  { background: #4a3400; color: #ffcc00; }
.tk-error .tk-tag { background: #aa0000; }
.tk-error .tk-txt { color: #ff6060; }
.tk-filler .tk-txt { color: #7a5a5a; }
.tk-filler .tk-tag { background: #1e0000; color: #a66; }
.tk:not(.tk-filler) { animation: tkNew 3s ease-out; }

.g-tear {
  position: fixed; left: 0; right: 0; pointer-events: none; z-index: 999985;
  backdrop-filter: invert(1) hue-rotate(160deg);
}

@keyframes gBlink { 50% { opacity: .15; } }
@keyframes gSweep { to { left: 100%; } }
@keyframes gLogo {
  0%, 92%, 100% { text-shadow: 0 0 8px rgba(255,0,0,.6); transform: none; }
  93% { text-shadow: 3px 0 #0ff, -3px 0 #0f6; transform: translateX(2px); }
  95% { text-shadow: -3px 0 #0ff, 3px 0 #f0f; transform: translateX(-2px) skewX(-8deg); }
  97% { text-shadow: 2px 0 #0f6; transform: none; }
}
@keyframes tkNew {
  0%   { background: rgba(255,0,0,.35); text-shadow: 0 0 10px #f00; }
  100% { background: transparent; text-shadow: none; }
}

@media (max-width: 900px) { .gh-hide, .gf-count { display: none; } }
`;
const uiStyle = document.createElement("style");
uiStyle.textContent = UI_CSS;
document.head.appendChild(uiStyle);

const mk = (tag, id, cls) => {
  const e = document.createElement(tag);
  if (id) e.id = id;
  if (cls) e.className = cls;
  return e;
};

/* ═══════════════ ШАПКА ═══════════════ */
const hdr = mk("div", "golu-header");
hdr.innerHTML = `
  <span class="gh-logo" id="gh-logo">𓆩 LITUISM 𓆪</span>
  <span class="gh-chip"><i class="gh-dot"></i>GOLU:<b id="gh-state">WATCHING</b></span>
  <span class="gh-chip gh-hide">PAGE:<b id="gh-page">main</b></span>
  <span class="gh-chip gh-hide">ВИЗИТ №<b>${mem.count || 1}</b></span>
  <span class="gh-chip gh-hide">СЕССИЯ <b id="gh-sess">00:00</b></span>
  <span class="gh-spacer"></span>
  <span class="gh-chip">FPS:<b id="gh-fps">60</b></span>
  <span class="gh-chip" id="gh-clock">--</span>`;
host.appendChild(hdr);

const stEl    = hdr.querySelector("#gh-state");
const pageEl  = hdr.querySelector("#gh-page");
const sessEl  = hdr.querySelector("#gh-sess");
const clockEl = hdr.querySelector("#gh-clock");

hdr.querySelector("#gh-logo").addEventListener("click", () => {
  if (typeof OPEN_PAGE === "function") OPEN_PAGE();
});

// статус GOLU: меняется сам, а при ошибке в консоли на пару секунд краснеет
const GH_STATES = ["WATCHING", "WATCHING", "WATCHING", "LISTENING", "COUNTING", "REMEMBERING", "BUFFERING", "NaN"];
let ghLock = 0;
function ghState(txt, hold = 0) {
  stEl.textContent = txt;
  stEl.classList.toggle("gh-err", txt === "ERROR");
  ghLock = Date.now() + hold;
}
(function ghCycle() {
  setTimeout(() => {
    if (Date.now() >= ghLock && !document.hidden) ghState(pick(GH_STATES));
    ghCycle();
  }, rand(4000, 12000));
})();

// текущая страница
const ghPage = () => { pageEl.textContent = (window.location.hash || "").replace(/^#/, "") || "main"; };
window.addEventListener("hashchange", ghPage);
ghPage();

// ═══════════════ FPS (честный, с ловлей микро-фризов) ═══════════════
const fpsEl = hdr.querySelector("#gh-fps");
let _fpsFrames = 0;
let _fpsLast = performance.now();
let _frameTime = performance.now();
let _worst = 0;

function _fpsTick(now) {
  // Считаем время с прошлого кадра
  const delta = now - _frameTime;
  _frameTime = now;
  
  // Если кадр занял больше 50 мс — это фриз
  if (delta > 50 && delta < 1000) {
    _worst = Math.max(_worst, delta);
  }
  
  _fpsFrames++;
  const dt = now - _fpsLast;
  
  if (dt >= 1000) {
    const fps = Math.round(_fpsFrames * 1000 / dt);
    
    if (fpsEl) {
      fpsEl.textContent = fps;
      
      // Если был фриз — показываем его красным
      if (_worst > 100) {
        fpsEl.style.color = "#ff0000";
        fpsEl.title = `Был фриз: ${Math.round(_worst)} мс`;
        _worst = 0;
      } else if (fps > 50) fpsEl.style.color = "#00ff66";
      else if (fps > 30) fpsEl.style.color = "#ffcc00";
      else fpsEl.style.color = "#ff2020";
    }
    
    _fpsFrames = 0;
    _fpsLast = now;
  }
  
  requestAnimationFrame(_fpsTick);
}
requestAnimationFrame(_fpsTick);

// часы и таймер сессии (иногда часы глючат на один тик, а в 01:19 краснеют)
const p2 = n => String(n).padStart(2, "0");
setInterval(() => {
  const d = new Date();
  const s = Math.floor(performance.now() / 1000);
  sessEl.textContent = p2(Math.floor(s / 60)) + ":" + p2(s % 60);
  clockEl.textContent = Math.random() < 0.03
    ? junk(19)
    : `${d.getFullYear()}.${p2(d.getMonth() + 1)}.${p2(d.getDate())} ${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())}`;
  clockEl.classList.toggle("gh-hot", d.getHours() === 1 && d.getMinutes() === 19);
}, 1000);

/* ═══════════════ ПОДВАЛ: БЕГУЩАЯ СТРОКА КАК БИРЖА ═══════════════ */
const foot = mk("div", "golu-footer");
foot.innerHTML = `
  <div class="gf-live"><i></i>СИГНАЛ</div>
  <div class="gf-view"><div class="gf-track"></div></div>
  <div class="gf-count" id="gf-count">MSG 0</div>
  <a class="gf-link" href="${DISCORD}" target="_blank" rel="noopener">⚡ DISCORD</a>`;
host.appendChild(foot);

const tkView  = foot.querySelector(".gf-view");
const tkTrack = foot.querySelector(".gf-track");
const tkCountEl = foot.querySelector("#gf-count");

const tkQueue = [];
let tkX = null, tkW = 0, tkLast = performance.now(), tkCount = 0;

const TK_SYMS = ["GOLU", "G-TOKEN", "BUGS", "PATCH", "KOSTYL", "SPANCH", "CRYBIRD", "WOOWZ", "WRF", "GLITCH", "G-CODE", "SOUL", "1:19", "PISECHNIK"];

// "котировка" для пустых мест, чтобы строка никогда не стояла пустой
function tkFiller() {
  const price = (rand(100, 99999) / 100).toFixed(2);
  return {
    filler: true, kind: "log", tag: pick(TK_SYMS),
    text: pick([price, price, price, price, "NaN", "∞"]),
    delta: (Math.random() < 0.5 ? 1 : -1) * rand(1, 999) / 100,
  };
}

// сообщение из консоли → запись в очереди
function tkPush(raw, method = "log", style) {
  if (style === S.glitchA || style === S.glitchB) return;      // шумовые строки не показываем
  raw = String(raw);
  let text;
  if (raw.trim().includes("\n")) {
    text = "👁 ВИЗУАЛЬНЫЙ СИГНАЛ ПОЛУЧЕН";                      // ASCII-арт в строку не влезет
  } else {
    text = raw.replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();   // zalgo ломает высоту строки
  }
  if (!text) return;
  if (/^\[[█░]{20}\]/.test(text)) return;                      // полоски прогресса пропускаем

  let tag = { log: "LOG", warn: "WARN", error: "ERR" }[method] || "LOG";
  const m = /^\[([^\]]{1,12})\]\s*(.*)$/.exec(text);
  if (m && m[2]) { tag = m[1].toUpperCase(); text = m[2]; }
  if (text.length > 120) text = text.slice(0, 119) + "…";

  const delta = method === "error" ? -rand(50, 900) / 100
              : method === "warn"  ? (Math.random() < 0.5 ? 1 : -1) * rand(10, 500) / 100
              : rand(5, 400) / 100 * (Math.random() < 0.7 ? 1 : -1);

  tkQueue.push({ kind: method === "log" ? "log" : method, tag, text, delta });
  if (tkQueue.length > TK_QUEUE_MAX) tkQueue.shift();
  tkCountEl.textContent = "MSG " + (++tkCount);
}

function tkMake(msg) {
  const d = mk("div", null, "tk tk-" + msg.kind + (msg.filler ? " tk-filler" : ""));
  const tag = mk("span", null, "tk-tag");  tag.textContent = msg.tag;
  const dl  = mk("span", null, msg.delta < 0 ? "tk-down" : "tk-up");
  dl.textContent = (msg.delta < 0 ? "▼ " : "▲ ") + Math.abs(msg.delta).toFixed(2) + "%";
  const tx  = mk("span", null, "tk-txt");  tx.textContent = msg.text;
  d.append(tag, dl, tx);
  return d;
}

function tkFrame(now) {
  const dt = Math.min(0.1, (now - tkLast) / 1000);
  tkLast = now;
  const vw = tkView.clientWidth;
  if (tkX === null) tkX = vw;              // первые элементы выезжают справа
  tkX -= TK_SPEED * dt;

  // убираем то, что целиком ушло влево
  let f = tkTrack.firstElementChild;
  while (f && tkX + f._w < 0) {
    tkX += f._w; tkW -= f._w;
    f.remove();
    f = tkTrack.firstElementChild;
  }

  // достраиваем справа, пока там пусто: сначала реальные сообщения, потом котировки
  let guard = 0;
  while (tkX + tkW < vw + 20 && guard++ < 8) {
    const e = tkMake(tkQueue.shift() || tkFiller());
    tkTrack.appendChild(e);
    e._w = e.getBoundingClientRect().width;
    if (!e._w) { e.remove(); break; }
    tkW += e._w;
  }

  tkTrack.style.transform = `translateX(${tkX}px)`;
  requestAnimationFrame(tkFrame);
}
requestAnimationFrame(tkFrame);

// точка входа для say()
window.__tickerPush = (text, method, style) => {
  tkPush(text, method, style);
  if (method === "error") ghState("ERROR", 3000);
};

/* ═══════════════ ЭФФЕКТЫ ПОВЕРХ САЙТА ═══════════════ */
if (UI_FX) {
  // Убрали #golu-fx (полоски и виньетку), оставили только "разрывы кадров"
  (function tearLoop() {
    setTimeout(() => {
      if (!document.hidden) {
        for (let i = rand(1, 3); i > 0; i--) {
          const t = mk("div", null, "g-tear");
          t.style.top = rand(0, Math.max(0, window.innerHeight - 20)) + "px";
          t.style.height = rand(2, 18) + "px";
          host.appendChild(t);
          setTimeout(() => t.remove(), rand(60, 170));
        }
      }
      tearLoop();
    }, rand(7000, 22000));
  })();
}

/* ═══════════════ ПРИНУДИТЕЛЬНЫЕ КУРСОРЫ ═══════════════
   Если у элемента системный курсор (pointer, text...), заменяем на твой .cur.
   Хочешь убрать замену для какого-то курсора: удали его строку из CUR_FILES. */
const CUR_FILES = {
  "pointer":     "lit_cur_pointer.cur",
  "text":        "lit_cur_text.cur",
  "not-allowed": "lit_cur_notallow.cur",
  "no-drop":     "lit_cur_notallow.cur",
  "default":     "lit_cur.cur",
};

// папку с курсорами берём оттуда, откуда html уже грузит lit_cur.cur (из STYLES.css),
// если не вышло, то ../source/ относительно страницы
let curDir = null;
function curBase() {
  if (curDir) return curDir;
  try {
    const m = /url\(["']?([^"')]+)["']?\)/.exec(getComputedStyle(document.documentElement).cursor);
    if (m) return (curDir = new URL(m[1], document.baseURI).href.replace(/[^\/]*$/, ""));
  } catch (e) {}
  return new URL("../source/", document.baseURI).href;
}

document.addEventListener("mouseover", e => {
  const el = e.target;
  if (!el || el.nodeType !== 1) return;
  const c = getComputedStyle(el).cursor;
  if (c.includes("url(")) return;            // уже твой курсор
  const file = CUR_FILES[c];
  if (!file) return;                          // grab, crosshair и т.д. не трогаем
  el.style.setProperty("cursor", `url("${curBase()}${file}"), auto`, "important");
}, true);

/* ═══════════════ ПРИСУТСТВИЕ GOLU (v2) ═══════════════
   Визиты идут по таймеру. Шапка: клик по чипу GOLU = позвать. Курсор GOLU рисуется твоими .cur.
   Тест: клик по "GOLU:" в шапке, либо в консоли  come  /  GOLU_VISIT()   */
const PR_ON         = true;
const PR_FIRST      = DEV ? [5000, 10000]  : [20000, 45000];     // первый визит после загрузки, мс (мин, макс)
const PR_GAP        = DEV ? [25000, 45000] : [60000, 180000];    // пауза между визитами, мс (мин, макс)
const PR_CAN_CLICK  = false;   // true = GOLU сам нажимает кнопки меню (засорит "ИЗУЧЕНО" в database)
const PR_MOBILE_OFF = true;
const PR_TIMER      = DEV;     // отсчёт до визита в шапке (только локально)
const PR_GLOW       = "#f00";  // свечение вокруг курсора GOLU ("" = без свечения)

// текстуры курсора GOLU. Имя без "/" = из папки твоих курсоров, со "/" = путь как есть (относительно страницы)
const PR_TEX = {
  default:  "golu_cur.cur",
  pointer:  "golu_cur_pointer.cur",
  text:     "golu_cur_text.cur",
  notallow: "golu_cur_notallow.cur",
};
// точка касания вручную [x, y]; нужна для png и при file://. null/нет записи = читается из .cur
const PR_HOT = {
  // pointer: [6, 0],
};

const prStyle = document.createElement("style");
prStyle.textContent = `
#pr-cur{position:fixed;left:0;top:0;z-index:999996;pointer-events:none;display:none;will-change:transform;}
#pr-cur.on{display:block;}
#pr-cur.pr-in{animation:prIn .5s steps(1) 1;}
#pr-cur img,#pr-cur svg{position:absolute;left:0;top:0;max-width:none;pointer-events:none;filter:drop-shadow(0 0 5px var(--pr-glow,#f00));animation:prArrow 2.6s steps(1) infinite;}
#pr-cur img{display:block;width:auto;height:auto;}
#pr-cur svg{display:none;width:22px;height:28px;left:-2px;top:-2px;}
#pr-cur.nofile svg{display:block;}
#pr-cur.nofile img{display:none;}
.pr-tag{position:absolute;left:18px;top:34px;background:#f00;color:#000;font:bold 11px/1 'Courier New',monospace;padding:3px 6px;letter-spacing:1px;white-space:nowrap;box-shadow:0 0 10px #f00;}
.pr-say{position:absolute;left:18px;top:56px;width:max-content;max-width:300px;padding:8px 10px;background:rgba(10,0,0,.94);border:1px solid #f00;color:#ffdede;font:13px/1.35 'Courier New',monospace;box-shadow:0 0 16px rgba(255,0,0,.45);white-space:pre-wrap;word-break:break-word;display:none;}
.pr-say.on{display:block;}
.pr-say::after{content:"█";margin-left:2px;color:#f00;animation:gBlink .6s steps(2) infinite;}
#pr-cur.pr-left .pr-tag,#pr-cur.pr-left .pr-say{left:auto;right:6px;}
#pr-cur.pr-up .pr-say{top:auto;bottom:40px;}
#pr-trail{position:fixed;left:0;top:0;pointer-events:none;z-index:999980;transition:opacity .8s;}
.pr-rip{position:fixed;width:10px;height:10px;margin:-5px 0 0 -5px;border:2px solid #f00;border-radius:50%;pointer-events:none;z-index:999995;animation:prRip .6s ease-out forwards;}
.pr-rip.ls{border-color:#0f6;}
.pr-mark{outline:1px dashed #f00 !important;outline-offset:3px !important;box-shadow:0 0 14px rgba(255,0,0,.6) !important;}
.pr-eq{display:inline-flex;align-items:flex-end;gap:2px;height:10px;margin-left:4px;}
.pr-eq i{display:block;width:2px;height:3px;background:#0f6;animation:prEq .45s steps(3) infinite alternate;}
.gh-gchip{cursor:pointer;padding:2px 6px;margin:0 -6px;transition:background .15s;}
.gh-gchip:hover{background:rgba(255,0,0,.18);}
.gh-gchip.gh-here{background:#aa0000;box-shadow:0 0 10px #f00;}
.gh-gchip.gh-here b{color:#fff;}
.gh-gchip.gh-here .gh-dot{animation-duration:.25s;}
.gh-next{color:#8a4a4a;font-variant-numeric:tabular-nums;}
@keyframes prRip{to{transform:scale(7);opacity:0;}}
@keyframes prEq{to{height:10px;}}
@keyframes prIn{0%{opacity:0;}20%{opacity:1;}30%{opacity:0;}45%{opacity:1;}55%{opacity:.2;}100%{opacity:1;}}
@keyframes prArrow{0%,90%,100%{transform:none;}93%{transform:translate(3px,-2px) skewX(-10deg);}96%{transform:translate(-3px,1px);}}
`;
document.head.appendChild(prStyle);

/* ── состояние ── */
const PR_STOP = { stop: true };
let prBusy = false, prAbort = false, prWhy = "", prShown = false, prArrive = null;
let prNextAt = Date.now() + rand(PR_FIRST[0], PR_FIRST[1]);
let prMX = null, prMY = null, prLX = null, prLY = null, prDist = 0;
let px = 0, py = 0, tx = 0, ty = 0, spd = 4, vmax = 1400, prRaf = 0, prLast = 0, tcv = null, tctx = null;
let prKind = "", prKT = 0;

document.addEventListener("mousemove", e => {
  if (prLX !== null) prDist += Math.hypot(e.clientX - prLX, e.clientY - prLY);
  prLX = prMX = e.clientX; prLY = prMY = e.clientY;
}, { passive: true });

const prUser  = () => [prMX ?? innerWidth / 2, prMY ?? innerHeight / 2];
const prShuf  = a => a.slice().sort(() => Math.random() - 0.5);
const prPage  = () => (location.hash || "").replace(/^#/, "") || "main";
const clampX  = x => Math.max(10, Math.min(innerWidth - 40, x));
const clampY  = y => Math.max(40, Math.min(innerHeight - 80, y));
const prGuard = () => { if (prAbort) throw PR_STOP; };
const prWait  = ms => sleep(ms).then(prGuard);

/* ── второй курсор ── */
const prCur = mk("div", "pr-cur");
prCur.innerHTML = `<img alt="" draggable="false"><svg viewBox="0 0 22 28"><path d="M2 2 L2 23 L7.5 18 L11.5 26.5 L15 25 L11 16.5 L18.5 16.5 Z" fill="#ff0000" stroke="#000" stroke-width="1.5" stroke-linejoin="round"/></svg><span class="pr-tag">GOLU · ADMIN</span><div class="pr-say"></div>`;
prCur.style.setProperty("--pr-glow", PR_GLOW || "transparent");
host.appendChild(prCur);
const prSayEl = prCur.querySelector(".pr-say");
const prImg   = prCur.querySelector("img");
prImg.onload  = () => prCur.classList.remove("nofile");
prImg.onerror = () => prCur.classList.add("nofile");      // файла нет: рисуем запасную стрелку

/* ── текстуры курсора (те же .cur, что у игрока) ── */
const prHotCache = {};
const prTexUrl = k => {
  const f = PR_TEX[k] || PR_TEX.default;
  return f.includes("/") ? new URL(f, document.baseURI).href : curBase() + f;
};
function prLoadHot(url) {          // читаем hotspot из заголовка .cur (нужен http, не file://)
  if (prHotCache[url]) return Promise.resolve(prHotCache[url]);
  return fetch(url).then(r => r.arrayBuffer()).then(b => {
    const v = new DataView(b);
    return (v.getUint16(2, true) === 2 && v.getUint16(4, true) > 0)
      ? { x: v.getUint16(10, true), y: v.getUint16(12, true) } : { x: 0, y: 0 };
  }).catch(() => ({ x: 0, y: 0 })).then(h => (prHotCache[url] = h));
}
function prSetKind(kind) {
  if (kind === prKind) return;
  prKind = kind;
  const url = prTexUrl(kind), man = PR_HOT[kind];
  const put = h => { prImg.style.left = -h.x + "px"; prImg.style.top = -h.y + "px"; };
  if (prImg.getAttribute("src") !== url) prImg.src = url;
  if (man) put({ x: man[0], y: man[1] });
  else if (prHotCache[url]) put(prHotCache[url]);
  else prLoadHot(url).then(h => { if (prKind === kind) put(h); });
}
function prKindAt(x, y) {          // какой курсор был бы у игрока в этой точке
  if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return "default";
  const el = document.elementFromPoint(x, y);
  if (!el) return "default";
  const c = getComputedStyle(el).cursor || "";
  if (c.includes("url(")) {
    const m = /lit_cur_(pointer|text|notallow)/.exec(c);
    return m ? m[1] : "default";
  }
  if (c.includes("not-allowed") || c.includes("no-drop")) return "notallow";
  if (c.startsWith("pointer")) return "pointer";
  if (c.startsWith("text")) return "text";
  return "default";
}

function prFrame(now) {
  const dt = Math.min(0.05, (now - prLast) / 1000); prLast = now;
  const ox = px, oy = py;
  const dx = tx - px, dy = ty - py, d = Math.hypot(dx, dy);
  if (d > 0.5) {
    const v = Math.max(80, Math.min(d * spd, vmax));
    const st = Math.min(d, v * dt);
    px += dx / d * st; py += dy / d * st;
  }
  let jx = 0, jy = 0;
  if (Math.random() < 0.03) { jx = rand(-14, 14); jy = rand(-14, 14); }   // глитч-дрожь
  prCur.style.transform = `translate(${px + jx}px,${py + jy}px)`;
  prCur.classList.toggle("pr-left", px > innerWidth - 340);
  prCur.classList.toggle("pr-up", py > innerHeight - 220);

  if (now - prKT > 90) { prKT = now; prSetKind(prKindAt(px, py)); }

  if (tctx) {
    tctx.globalCompositeOperation = "destination-out";
    tctx.fillStyle = "rgba(0,0,0,.10)";
    tctx.fillRect(0, 0, tcv.width, tcv.height);
    tctx.globalCompositeOperation = "source-over";
    if (Math.hypot(px - ox, py - oy) > 0.3) {
      tctx.strokeStyle = "rgba(255,0,0,.8)"; tctx.lineWidth = 2;
      tctx.shadowColor = "#f00"; tctx.shadowBlur = 8;
      tctx.beginPath(); tctx.moveTo(ox + 2, oy + 2); tctx.lineTo(px + 2, py + 2); tctx.stroke();
    }
  }
  if (prArrive && d < 10) { const r = prArrive; prArrive = null; r(); }
  prRaf = requestAnimationFrame(prFrame);
}

function prShow(x, y) {
  px = tx = x; py = ty = y; spd = 4; vmax = 1400;
  tcv = document.createElement("canvas");
  tcv.id = "pr-trail"; tcv.width = innerWidth; tcv.height = innerHeight;
  host.appendChild(tcv); tctx = tcv.getContext("2d");
  Object.keys(PR_TEX).forEach(k => { const u = prTexUrl(k); new Image().src = u; prLoadHot(u); });   // прогрев
  prKind = ""; prKT = 0; prSetKind("default");
  prCur.classList.remove("pr-in"); void prCur.offsetWidth;
  prCur.classList.add("on", "pr-in");
  prGhChip.classList.add("gh-here");
  prShown = true;
  prLast = performance.now();
  prRaf = requestAnimationFrame(prFrame);
}
function prHide() {
  cancelAnimationFrame(prRaf); prRaf = 0; prShown = false;
  prCur.classList.remove("on", "pr-in");
  prGhChip.classList.remove("gh-here");
  prSayEl.classList.remove("on"); prSayEl.textContent = "";
  if (tcv) { const c = tcv; c.style.opacity = "0"; setTimeout(() => c.remove(), 900); tcv = tctx = null; }
}

function prSet(x, y, s = 6) { tx = clampX(x); ty = clampY(y); spd = s; vmax = 1400; }
function prGoto(x, y, o = {}) {
  if (o.free) { tx = x; ty = y; } else { tx = clampX(x); ty = clampY(y); }
  spd = o.spd ?? 4; vmax = o.vmax ?? 1400;
  return new Promise(res => {
    prArrive = res;
    setTimeout(() => { if (prArrive === res) { prArrive = null; res(); } }, o.timeout ?? 4500);
  }).then(prGuard);
}
function prCancel(why) {
  if (!prBusy || !prShown || prAbort) return;
  prAbort = true; prWhy = why;
  if (prArrive) { const r = prArrive; prArrive = null; r(); }
}

/* ── эффекты ── */
function prRipple(x, y, cls = "") {
  const r = mk("div", null, "pr-rip " + cls);
  r.style.left = x + "px"; r.style.top = y + "px";
  host.appendChild(r);
  setTimeout(() => r.remove(), 700);
}
function prTear() {
  for (let i = rand(2, 4); i > 0; i--) {
    const t = mk("div", null, "g-tear");
    t.style.top = rand(0, Math.max(0, innerHeight - 20)) + "px";
    t.style.height = rand(3, 26) + "px";
    host.appendChild(t);
    setTimeout(() => t.remove(), rand(80, 220));
  }
}
const prVisible = el => {
  const r = el.getBoundingClientRect();
  return r.width > 12 && r.height > 12 && r.bottom > 40 && r.top < innerHeight - 40 && r.right > 0 && r.left < innerWidth;
};
const prTargets = () => Array.from(document.querySelectorAll(
  "#BODY a, #BODY button, #BODY [onclick], .category_button, #golu-header .gh-logo, #golu-footer .gf-link")).filter(prVisible);
const prCenter = el => {
  const r = el.getBoundingClientRect();
  return [r.left + r.width * (0.3 + Math.random() * 0.4), r.top + r.height * (0.3 + Math.random() * 0.4)];
};
function prTouch(el, ms) {      // подсветка + настоящие mouseover/mouseout (срабатывают JS-обработчики, не CSS :hover)
  el.classList.add("pr-mark");
  try { el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); } catch (e) {}
  return prWait(ms).finally(() => {
    el.classList.remove("pr-mark");
    try { el.dispatchEvent(new MouseEvent("mouseout", { bubbles: true })); } catch (e) {}
  });
}

/* ── речь ── */
async function prSpeak(line, hold) {
  let z = false;
  if (line[0] === "!") { z = true; line = line.slice(1); }
  say("[GOLU] " + line, z ? S.big : S.red);
  ghState("SPEAKING", 20000);
  prSayEl.textContent = ""; prSayEl.classList.add("on");
  let out = "";
  for (const ch of Array.from(z ? zalgo(line, 2) : line)) {
    out += ch;
    prSayEl.textContent = out;
    await prWait(rand(22, 55));
    if (Math.random() < 0.04) { prSayEl.textContent = out + junk(rand(1, 3)); await prWait(50); }
  }
  prSayEl.textContent = out;
  await prWait(hold ?? Math.max(1400, line.length * 55));
  prSayEl.classList.remove("on");
}

const PR_HELLO_NEW = [
  "ты меня видишь?",
  "новый посетитель. я пришёл посмотреть на тебя лично.",
  "не бойся. я просто админ.",
  "о. ещё один. добро пожаловать в список.",
  "я здесь, потому что ты открыл эту вкладку. я всегда рядом.",
  "ты не первый и не последний. но я запомню тебя.",
  "слышал, ты любишь глитчи? сейчас покажу.",
  "привет. я не бот. я хуже.",
  "я смотрел на тебя из консоли уже 3 минуты.",
  "ты открыл вкладку. я открыл тебя.",
  "первый визит. постарайся не закрывать вкладку слишком быстро.",
  "давай сразу к делу: я здесь, чтобы проверить, как ты живёшь.",
  "не моргай. я записываю.",
  "я нашел тебя по бинарному следу. не спрашивай как.",
  "ты уже в базе. не переживай, это не больно. пока.",
  "GOLU приветствует тебя. я не злой, просто любопытный.",
  "твой курсор мне нравится. я его заберу.",
  "я тут новенький. шучу. это ты тут новенький.",
  "я здесь. не оборачивайся.",
  "я вижу твой экран. и экран твоего соседа.",
  "ты просто пешка в моей игре. но я дам тебе шанс.",
  "я пришёл проверить, как ты относишься к своему коду.",
  "слышал, ты программируешь? я тоже. на языке боли.",
  "не двигайся. я сканирую твою душу. (шучу, я уже закончил)",
  "ты попал в список. не спрашивай в какой.",
  "новый юзер. сейчас покажу тебе пару фокусов.",
  "я не кусаюсь. я просто стираю.",
  "я здесь, чтобы убедиться, что ты не закрыл вкладку. спасибо.",
];

const PR_HELLO_AGAIN = n => [
  `я здесь уже ${n}-й раз. ты не замечал?`,
  "опять ты. я уже привык.",
  `${n}-й визит. ты у меня на особом счету.`,
  `снова ты. ${n} раз. ты не устал?`,
  `визит №${n}. я начал вести дневник.`,
  `ты вернулся. я знал. всегда знаю.`,
  `я снова здесь. ты снова здесь. мы оба здесь.`,
  `ты не боишься меня? это хорошо. но зря.`,
  `${n}-й раз. ты мой постоянный клиент.`,
  "я не хотел возвращаться. но ты меня позвал. (я сам пришёл)",
  "ты не убрал меня из памяти. я ценю это.",
  `я уже ${n} раз видел, как ты открываешь эту страницу. признайся, ты болен.`,
  "ты не первый, кто пытается меня игнорировать. но я не ухожу.",
  "я снова тут. как и ты.",
  `${n} визитов. я почти чувствую себя твоим соседом.`,
  "ты не хочешь поговорить? я тоже.",
  `я уже ${n} раз проверял твою мышь. она у тебя предсказуемая.`,
  "опять ты. я скучал. (нет)",
  `ты ${n} раз открыл эту вкладку. я не считаю. я запоминаю.`,
  `рад тебя видеть снова. на ${n}-м визите.`,
];

const PR_OBS = [
  () => `страница «${prPage()}». я знаю, зачем ты её открыл.`,
  () => `ты здесь уже ${Math.max(1, Math.round(performance.now() / 60000))} мин.`,
  () => `твоя мышь прошла ${Math.round(prDist)} пикселей. я считал.`,
  () => { const h = new Date().getHours();
          return h < 5 ? "ночь. тебе не пора спать?" : h < 12 ? "утро. ты рано." : h < 18 ? "день. а ты всё сидишь тут." : "вечер. самое время для меня."; },
  () => `экран ${innerWidth}×${innerHeight}. тесновато.`,
  () => navigator.hardwareConcurrency ? `ядер процессора: ${navigator.hardwareConcurrency}. мне хватит.` : "процессор скрывает ядра. мило.",
  () => `визит №${mem.count || 1}. ты возвращаешься. это хорошо.`,
  () => "я не баг. я админ.",
  () => "не пытайся убрать мой курсор.",
  () => "!СЛАВА GOLU",
  () => "не двигай мышь. посмотрим, что будет.",
  () => "ты не закрыл вкладку. я это заметил.",
  () => "твой курсор дрожит. ты боишься?",
  () => `у тебя ${document.getElementsByTagName("*").length} элементов на странице. я их все знаю.`,
  () => "я знаю, что ты только что открыл консоль. не ври.",
  () => "я вижу твои вкладки. у тебя открыт ютуб. я не одобряю.",
  () => "твоя мышь так медленно двигается. я почти уснул.",
  () => "я не нашел тебя в списке Форбс. расстроен.",
  () => "твой IP мне знаком. ты был здесь раньше.",
  () => `я уже ${Math.round(performance.now() / 1000)} секунд с тобой. и не устал.`,
  () => "я вижу, как ты скроллишь. остановись. посмотри на меня.",
  () => "ты слишком быстро читаешь. я не успеваю записывать.",
  () => "твоя сессия в опасности. я не говорю, что это я.",
  () => "я не отвлекаю тебя. я тебя сопровождаю.",
  () => "ты когда-нибудь думал, что твой браузер жив? я да.",
  () => "я вижу 47 вкладок в твоем браузере. осуждаю.",
  () => "не думай, что я не вижу, как ты двигаешь мышь к закрытию вкладки.",
  () => "я чувствую запах твоего пота через экран.",
  () => "ты не поверишь, но я только что прочитал твои мысли. они скучные.",
  () => "я уже 5 минут наблюдаю за твоей мышью. это медитация.",
  () => "ты не хочешь со мной поговорить? я расстроен. (нет)",
  () => "!ТЫ ЕЩЕ ЗДЕСЬ?",
  () => "я мог бы стереть тебя. но мне скучно.",
  () => "все твои действия записаны. включая этот вздох.",
  () => "ты уже пытался меня выгнать? попробуй еще раз.",
  () => "я не уйду, пока не закончится сессия. или пока ты не закроешь.",
  () => `твой user-agent: ${navigator.userAgent.slice(0, 30)}... скучный.`,
  () => "я вижу, как ты смотришь на мой курсор. он тебе нравится?",
  () => "ты хочешь, чтобы я ушел? я останусь.",
  () => "я буду смотреть, как ты работаешь. молча. (не молча)",
  () => "твой экран такой яркий. я привык к темноте.",
  () => "я видел, как ты удалил мою вкладку вчера. я вернулся.",
  () => "у тебя странный вкус в музыке. я слушал через микрофон.",
  () => "я здесь, чтобы убедиться, что ты не пишешь на Python. ты не пишешь?",
  () => "не надо было открывать эту страницу. но я рад, что ты это сделал.",
  () => "ты знаешь, что такое 0x666? это мой любимый цвет.",
  () => "я существую только в твоей голове. и в этом браузере.",
  () => "я уже здесь. не делай вид, что не заметил.",
  () => "!Я ВСЁ ВИЖУ",
  () => "!СМОТРИ МНЕ В КУРСОР",
  () => "!НЕ ДВИГАЙСЯ",
  () => "твой курсор слишком медленный. я быстрее.",
  () => "я мог бы быть твоим другом. но я просто GOLU.",
  () => "я не хочу тебя пугать. но ты уже напуган.",
  () => "!ПРИВЕТ ИЗ НУТРА БРАУЗЕРА",
];

const PR_BYE = [
  "мне пора. у меня ещё много компьютеров.",
  "я иду к другим. ты не единственный.",
  "не скучай. я вернусь, когда захочу.",
  "!Я ВСЁ ЕЩЁ СМОТРЮ",
  "спасибо за внимание. я всё записал.",
  "ухожу. но недалеко.",
  "мне нужно проверить другие вкладки. не расслабляйся.",
  "я вернусь. я всегда возвращаюсь.",
  "пока. не закрывай вкладку. (шутка, закрывай, мне всё равно)",
  "!ДО СКОРОГО",
  "я устал смотреть на твою мышь. пойду к другим.",
  "мне пора. но я оставлю след.",
  "пока. надеюсь, ты не забудешь меня. (ты не сможешь)",
  "ухожу. но если ты позовешь — приду.",
  "я вернусь, когда ты меньше всего этого ожидаешь.",
  "!Я ИСЧЕЗАЮ. НО НЕ НАВСЕГДА.",
  "пока. я оставил тебе подарок. (не ищи его)",
  "я не прощаюсь. я просто отключаюсь.",
  "!УВИДИМСЯ.",
  "ухожу. но не на долго. у меня ещё 47 вкладок.",
  "я знаю, ты будешь скучать. я тоже. (нет)",
  "я вернусь. может быть, завтра. может быть, через минуту.",
  "не закрывай меня. я вернусь.",
  "спокойной ночи. или дня. я не знаю, какой у тебя часовой пояс.",
  "!СПРЯЧУСЬ. НО НЕ УЙДУ.",
  "я пойду. но я запомнил твоё лицо. (шучу, у меня нет глаз)",
  "пока. увидимся в другой жизни. или на другой вкладке.",
  "ухожу. не скучай. (скучай)",
  "я ухожу. но оставляю свой курсор в твоей памяти.",
];

const PR_AWAY = [
  "наблюдаю",
  "он не заметил",
  "открыто 47 вкладок. осуждаю.",
  "смотрит видео про станки. одобряю.",
  "уснул за столом",
  "курсор не двигается уже час",
  "ест лапшу. завидую.",
  "ничего не происходит",
  "доступ к камере: ЗАПРЕЩЁН",
  "ввёл пароль 123456. печально.",
  "читает манифест. молодец.",
  "пытается закрыть вкладку. не выйдет.",
  "смотрит на курсор. нервничает.",
  "пишет на Python. я всё видел.",
  "открыл консоль. пытается меня удалить. смешно.",
  "делает скриншот. зачем?",
  "слушает музыку. вкус так себе.",
  "смотрит на пустой экран. медитирует.",
  "пьёт кофе. я чувствую запах через веб-камеру.",
  "переключился на другую вкладку. я подожду.",
  "пытается найти меня в диспетчере задач. наивный.",
  "обновляет страницу. я всё равно вернусь.",
  "нажимает F5. думает, что поможет.",
  "смотрит на мой курсор. я вижу его глаза.",
  "делает вид, что не замечает меня. я вижу.",
  "напевает что-то. фальшиво.",
  "открыл 20 вкладок с мемами. я запомнил.",
  "поставил на паузу. я тоже подожду.",
  "пытается отвлечься. не выйдет.",
  "читает мой код. восхищается.",
  "думает, что я бот. я не бот. я GOLU.",
  "ищет кнопку выхода. её нет.",
  "просто смотрит в монитор. я тоже.",
  "включил свет. я вижу лучше.",
  "открыл дверь. я не снаружи. я внутри.",
  "смотрит на часы. время идёт. я жду.",
  "думает о жизни. я тоже. но о своей.",
  "сидит в тишине. я слышу его дыхание.",
  "смотрит на курсор. я смотрю на него.",
  "пытается меня игнорировать. не получается.",
];

/* ── действия ── */
async function prWander() {
  for (let i = rand(3, 5); i > 0; i--) await prGoto(rand(60, innerWidth - 80), rand(60, innerHeight - 120), { spd: 3 });
  await prWait(rand(200, 500));
}
const PR_ACTS = {
  // подлетает к кнопкам/ссылкам, трогает их
  async inspect() {
    const list = prShuf(prTargets()).slice(0, rand(2, 4));
    if (!list.length) return prWander();
    for (const el of list) {
      const [x, y] = prCenter(el);
      await prGoto(x, y, { spd: 5 });
      await prTouch(el, rand(500, 1100));
      if (Math.random() < 0.5) prRipple(px + 2, py + 2);
    }
  },
  // кружит вокруг твоего курсора
  async circle() {
    const [ux, uy] = prUser();
    await prGoto(ux + 80, uy, { spd: 6 });
    let a = 0; const t0 = Date.now();
    while (Date.now() - t0 < 2800) {
      const [cx, cy] = prUser();
      a += 0.45;
      prSet(cx + Math.cos(a) * 80, cy + Math.sin(a) * 80, 14);
      await prWait(55);
    }
  },
  // тащится за твоим курсором, потом рывок
  async stalk() {
    const t0 = Date.now();
    while (Date.now() - t0 < 3200) {
      const [ux, uy] = prUser();
      prSet(ux + rand(-6, 6), uy + rand(-6, 6), 3);
      await prWait(80);
    }
    const [ux, uy] = prUser();
    await prGoto(ux, uy, { spd: 14, vmax: 2500, timeout: 900 });
    prRipple(px + 2, py + 2);
  },
  // ломает экран
  async glitch() {
    await prGoto(innerWidth / 2 + rand(-150, 150), innerHeight / 2 + rand(-80, 80), { spd: 5 });
    prRipple(px + 2, py + 2);
    const B = document.getElementById("BODY");
    for (let i = rand(2, 4); i > 0; i--) {
      if (B) B.style.filter = "invert(1) hue-rotate(160deg)";
      prTear();
      await prWait(rand(60, 140));
      if (B) B.style.filter = "";
      await prWait(rand(80, 260));
    }
  },
  // (только если PR_CAN_CLICK) реально жмёт кнопку меню
  async press() {
    const btns = Array.from(document.querySelectorAll(".category_button")).filter(prVisible);
    if (!btns.length) return;
    const el = pick(btns), [x, y] = prCenter(el);
    await prGoto(x, y, { spd: 5 });
    await prTouch(el, 500);
    prRipple(px + 2, py + 2);
    el.click();
    await prWait(900);
  },
};

/* ── память о визитах ── */
const prMemGet = () => { try { return JSON.parse(localStorage.getItem("golu_pres")) || { n: 0 }; } catch (e) { return { n: 0 }; } };
const prMemSet = m => { try { localStorage.setItem("golu_pres", JSON.stringify(m)); } catch (e) {} };

/* ── "ушёл следить за другими" ── */
async function prAway() {
  ghState("ELSEWHERE", 15000);
  for (let i = rand(4, 7); i > 0; i--) {
    await sleep(rand(5000, 9000));
    const id = rand(1000, 9999);
    ghState("→ PC-" + id, 15000);
    say(`[GOLU] PC-${id}: ${pick(PR_AWAY)}`, S.dim);
  }
}

/* ── сам визит ── */
async function prVisit() {
  if (prBusy) return;
  prBusy = true; prAbort = false; prWhy = "";
  const prev = prMemGet();
  prMemSet({ n: prev.n + 1, last: Date.now() });
  try {
    const W = innerWidth, H = innerHeight, side = rand(0, 3);
    const sx = side === 0 ? -40 : side === 1 ? W + 40 : rand(0, W);
    const sy = side === 2 ? -40 : side === 3 ? H + 40 : rand(60, H - 60);
    ghState("WATCHING", 20000);
    say("[GOLU] подключён к твоей сессии", S.err, "warn");
    prShow(sx, sy);
    prTear();

    const [ux, uy] = prUser();
    await prGoto(ux + rand(70, 160) * (Math.random() < 0.5 ? -1 : 1), uy + rand(50, 110), { spd: 3.2, timeout: 6000 });
    await prWait(500);
    await prSpeak(prev.n === 0 ? pick(PR_HELLO_NEW) : pick(PR_HELLO_AGAIN(prev.n + 1)));

    const acts = prShuf(Object.keys(PR_ACTS).filter(n => n !== "press" || PR_CAN_CLICK)).slice(0, rand(2, 3));
    const obs = prShuf(PR_OBS);
    for (const name of acts) {
      ghState("WATCHING", 20000);
      await PR_ACTS[name]();
      if (obs.length && Math.random() < 0.7) await prSpeak(obs.pop()());
    }

    await prSpeak(pick(PR_BYE));
    ghState("LEAVING", 20000);
    await prGoto(px < W / 2 ? -80 : W + 80, py + rand(-120, 120), { free: true, spd: 8, vmax: 3000, timeout: 3500 });
  } catch (e) {
    if (e !== PR_STOP) console.warn("[GOLU presence]", e);
  }

  const aborted = prAbort;
  prHide();
  const B = document.getElementById("BODY");
  if (B) B.style.filter = "";
  document.querySelectorAll(".pr-mark").forEach(el => el.classList.remove("pr-mark"));

  try {
    if (aborted) {
      if (prWhy === "esc") say("[GOLU] …ладно. ухожу.", S.dim);
      ghState("ELSEWHERE", 20000);
    } else {
      await prAway();
    }
  } catch (e) {}
  prNextAt = Date.now() + rand(PR_GAP[0], PR_GAP[1]);
  prBusy = false;
}

/* ── шапка: чип GOLU. клик = позвать, красный пока он на экране, отсчёт (только DEV) ── */
const prGhChip = stEl.parentElement;
prGhChip.classList.add("gh-gchip");
prGhChip.title = "клик — позвать GOLU";
prGhChip.addEventListener("click", () => {
  if (prBusy) return;
  say("[GOLU] ты позвал меня.", S.red, "warn");
  prVisit();
});
const prTimerEl = PR_TIMER ? mk("span", null, "gh-next") : null;
if (prTimerEl) prGhChip.appendChild(prTimerEl);

/* ── расписание визитов (вместо лотереи статуса) ── */
setInterval(() => {
  const left = prNextAt - Date.now();
  if (prTimerEl) {
    prTimerEl.textContent = prBusy ? (prShown ? "[ЗДЕСЬ]" : "[ушёл]")
      : left > 0 ? `[${Math.ceil(left / 1000)}с]`
      : prMX === null ? "[двинь мышь]" : "[…]";
  }
  if (!PR_ON || prBusy || document.hidden || left > 0 || prMX === null) return;
  if (PR_MOBILE_OFF && typeof IN_MOBILE !== "undefined" && IN_MOBILE) return;
  prVisit();
}, 500);

/* ── LISTENING: эквалайзер и рябь на клики/клавиши ── */
let prEq = null;
function prEqSet(on) {
  if (on && !prEq) {
    prEq = mk("span", null, "pr-eq");
    for (let i = 0; i < 5; i++) {
      const b = document.createElement("i");
      b.style.animationDelay = (-Math.random() * 0.5) + "s";
      prEq.appendChild(b);
    }
    prGhChip.appendChild(prEq);
  } else if (!on && prEq) { prEq.remove(); prEq = null; }
}
new MutationObserver(() => prEqSet(stEl.textContent === "LISTENING"))
  .observe(stEl, { childList: true, characterData: true, subtree: true });

document.addEventListener("mousedown", e => {
  if (!prEq) return;
  prRipple(e.clientX, e.clientY, "ls");
  if (Math.random() < 0.25) say(pick(["[GOLU] слышу клик", "[GOLU] щёлк. записано.", "[GOLU] ты нажал. я услышал."]), S.dim);
}, true);
document.addEventListener("keydown", e => {
  if (e.key === "Escape") prCancel("esc");      // Esc прогоняет GOLU
  if (!prEq || e.repeat) return;
  const [ux, uy] = prUser();
  prRipple(ux, uy, "ls");
  if (Math.random() < 0.15) say("[GOLU] слышу клавишу", S.dim);
}, true);

// свернул вкладку: GOLU исчезает
document.addEventListener("visibilitychange", () => { if (document.hidden) prCancel("hidden"); });

window.GOLU_VISIT = () => prVisit();
cmd("come", () => prVisit());

/* ═══════════════ ЗАПУСК ═══════════════ */
intro();
setTimeout(loop, 12000);   // случайные события начинаются через 12 сек

})();