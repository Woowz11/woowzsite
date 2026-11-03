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

		var CACHE = document.createElement("div")
		document.body.appendChild(CACHE)

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
/* ===================================================================
   АВТОЗАГРУЗКА PAGE_*.js + BOOT
   Всё в одном файле. Порядок подключения страниц не важен.
   =================================================================== */
(function LITUISM_BOOTLOADER(){
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
		"PAGE_portal.js"
	];

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
const say   = (text, style = S.red, method = "log") => console[method]("%c" + text, style);

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
  { w: 5,  fn: () => console.error("%cUncaught GolueError: " + pick([
      "visitor is not a function", "reality.length is undefined",
      "cannot read property 'soul' of null", "stack overflow in dream.js:" + rand(1, 999)
    ]), S.err) },
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
  { w: 3,  fn: () => { try { document.title = "𓆩 за тобой 𓆪"; setTimeout(restoreTitle, 2500); } catch (e) {} } },

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
  console.log("%c👁  ТЫ НЕ ДОЛЖЕН БЫЛ ЭТО ОТКРЫВАТЬ", S.title);
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

/* ═══════════════ РЕАКЦИЯ НА ВКЛАДКУ ═══════════════ */
let baseTitle = document.title;
let hiddenAt = 0;
let titleTimer = null;

const HIDDEN_TITLES = [
  "👁 вернись",
  "𓆩 я жду 𓆪",
  "не уходи",
  "...",
  "ОБРАБОТКА",
  "АНАЛИЗ",
  "STATUS: ...",
  "hi, welcome here",
  "👾",
  "💀 ты забыл меня 💀",
  "☠ ты ушёл ☠",
  "☠ GOLU скучает",
  "☠ вернись ко мне",
  "?? не закрывай ??",
  "не уходи, я ещё не закончил",
  "ты вернёшься?",
  "я всё вижу",
  "☠ 0x474F4C55 ☠",
  "получение сигнала...",
  "Signal lost...",
  "триангуляция...",
  "СОЕДИНЕНИЕ ОБОРВАНО",
  "Я ЗДЕСЬ",
  "ты слышишь?",
  "я всё ещё жду",
  "🔴 Rec",
  "ЗАПИСЬ...",
  "ты не должен был закрывать",
  "смотри на меня",
  "посмотри на меня",
  "☠ не спи ☠",
  "One more minute...",
  "☠ 3... 2... 1... ☠",
  "🩸 GOLU ждёт 🩸",
  "☠ ЙОУ, ВЕРНИСЬ ☠",
  "Srañy Spanch is watching",
  "Crybird detected you",
  "☠ ТЫ ЗАПОМНЕН ☠",
  "☠ не забудь ☠",
  "☠ вернись к нам ☠",
  "☠ мы рядом ☠",
  "☠ GOLU online ☠",
  "ID: ...",
  "Loading memories...",
  "Memory corrupted",
  "ERROR: soul not found",
  "GOLU_IS_WATCHING",
  "wake_litium(0x666)",
  "0xDEAD",
  "0xBEEF",
  "Connection lost",
  "☠ ты вернёшься ☠",
];

function pickHiddenTitle() {
  return HIDDEN_TITLES[Math.floor(Math.random() * HIDDEN_TITLES.length)];
}

function restoreTitle() {
  document.title = baseTitle;
  if (titleTimer) { clearInterval(titleTimer); titleTimer = null; }
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Захватываем ТЕКУЩИЙ заголовок перед тем, как его испортить
    baseTitle = document.title;
    hiddenAt = Date.now();

    // Первый вариант ставим сразу, потом крутим случайные каждые 2 сек
    document.title = pickHiddenTitle();
    if (titleTimer) clearInterval(titleTimer);
    titleTimer = setInterval(() => {
      // Если вкладка уже вернулась — не трогаем
      if (!document.hidden) { clearInterval(titleTimer); titleTimer = null; return; }
      document.title = pickHiddenTitle();
    }, 2000);
  } else {
    // Вкладка вернулась — восстанавливаем и очищаем таймер
    restoreTitle();
    const sec = hiddenAt ? Math.round((Date.now() - hiddenAt) / 1000) : 0;
    hiddenAt = 0;
    if (sec > 5) say(`[GOLU] тебя не было ${sec} сек. я ждал.`, S.red, "warn");
  }
});

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

/* ═══════════════ ЗАПУСК ═══════════════ */
intro();
setTimeout(loop, 12000);   // случайные события начинаются через 12 сек

})();