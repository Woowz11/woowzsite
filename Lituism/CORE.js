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
			"bg.png","bg2.png","bg3.png","bg4.png","bg5.png","bg6.png","bg7.png","bg8.png","bg9.png","bg10.png","bg11.png","bg12.png"
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

const TOP_NAV = [
	["OPEN_PAGE('not-exist');", "&lt;@&gt;"],
	["OPEN_PAGE();",            "{MAIN PAGE}"],
	["OPEN_PAGE('artsreal');",  "ИСКУССТВО 💥"],
	["OPEN_PAGE('artsai');",    "AI ☢"],
	["OPEN_PAGE('trash');",     "GOLUWorld 👾"],
	["OPEN_RANDOM_PAGE();",     "RANDOM_PAGE() 💮"],
	["OPEN_PAGE('database');",  "DATABASE 🔩"],
	["OPEN_PAGE('portal');",    "P0RTAL 🌌"],
];

const TB_WARN = "⚠ ВНИМАНИЕ · СИСТЕМА НАБЛЮДАЕТ · GOLU АКТИВЕН · SIGTERM = БОЛЬ · ТЫ — ЭКСПОНАТ · ".repeat(3);

const ELEMENT_TOPBANNER = f_rnl(`
<div id="tb-root">
	<div class="tb-main">
		<div class="tb-wing tb-l"><div class="tb-rain" data-rain="g"></div><div class="tb-wtag">◢ L-KERNEL · WOOWZCORE</div></div>
		<div class="tb-core">
			<i class="tb-k a"></i><i class="tb-k b"></i><i class="tb-k c"></i><i class="tb-k d"></i>
			<div class="tb-top">
				<div class="tb-brand">
					<div class="tb-logo">${ELEMENT_TITLE()}</div>
					<div class="tb-id">
						<div class="tb-word" data-text="LITUISM">LITUISM</div>
						<div id="tb-sub" class="tb-subt">ТЕХНО-РЕЛИГИЯ · ЦИФРОВОЙ БОГ GOLU</div>
						<div class="tb-info">${ELEMENT_WEBINFO()}</div>
					</div>
				</div>
				<div class="tb-dock"><div class="tb-tabs"></div><div class="tb-stage"></div></div>
			</div>
			<div class="tb-warn"><span>${TB_WARN}${TB_WARN}</span></div>
		</div>
		<div class="tb-wing tb-r"><div class="tb-rain" data-rain="h"></div><div class="tb-wtag">RED PROTOCOL · v∞ ▶</div></div>
	</div>
	<div class="tb-nav">${TOP_NAV.map(n => `<button class="category_button" onclick="${n[0]}">${n[1]}</button>`).join("")}</div>
	<div class="tb-gap"><div class="tb-hz"></div><div class="tb-gtxt">▼ СЕКТОР: <b id="tb-where">…</b> ▼</div></div>
</div>`);

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
const PR_TIMER      = true;     // отсчёт до визита в шапке (только локально)
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
  if (Math.random() < 0.03) { jx = rand(-14, 14); jy = rand(-14, 14); } 
  prCur.style.transform = `translate(${px + jx}px,${py + jy}px)`;
  prCur.classList.toggle("pr-left", px > innerWidth - 340);
  prCur.classList.toggle("pr-up", py > innerHeight - 220);

  if (now - prKT > 90) { prKT = now; prSetKind(prKindAt(px, py)); }

  if (tctx) {
    tctx.globalCompositeOperation = "destination-out";
    tctx.fillStyle = "rgba(0,0,0,0.03)";
    tctx.fillRect(0, 0, tcv.width, tcv.height);
    tctx.globalCompositeOperation = "source-over";
    if (Math.hypot(px - ox, py - oy) > 0.3) {
      tctx.strokeStyle = "rgba(255, 40, 40, 1)";
      tctx.lineWidth = 4;
      tctx.shadowColor = "#ff0044";
      tctx.shadowBlur = 20;
      tctx.beginPath(); tctx.moveTo(ox + 2, oy + 2); tctx.lineTo(px + 2, py + 2); tctx.stroke();

      tctx.fillStyle = "rgba(255, 0, 68, 0.9)";
      tctx.beginPath();
      tctx.arc(px + 2, py + 2, 3, 0, Math.PI * 2);
      tctx.fill();
      tctx.shadowBlur = 0;
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

/* ── сбор данных о пользователе (безопасно, без запросов) ── */
const prData = (() => {
  const ua = navigator.userAgent;
  const uaData = navigator.userAgentData || {};
  
  // Браузер
  let browser = "неизвестный браузер";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Edge";
  else if (ua.includes("Chrome/")) browser = "Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("OPR/") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("YaBrowser")) browser = "Yandex.Browser";
  
  // ОС
  let os = "неизвестная ОС";
  if (ua.includes("Windows NT 10")) os = "Windows 10/11";
  else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";
  
  // Язык
  const lang = navigator.language || "??";
  const langs = (navigator.languages || []).join(", ") || lang;
  
  // Часовой пояс
  let tz = "??";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "??"; } catch(e) {}
  const tzOffset = -new Date().getTimezoneOffset() / 60;
  
  // Экран
  const scr = screen;
  
  // Память (если доступно)
  const mem = navigator.deviceMemory || "?";
  const cores = navigator.hardwareConcurrency || "?";
  
  // Подключение (если доступно)
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const connType = conn ? (conn.effectiveType || conn.type || "?") : "?";
  const connDown = conn && conn.downlink ? conn.downlink : "?";
  
  // Онлайн
  const online = navigator.onLine;
  
  // Тёмная/светлая тема
  const theme = matchMedia("(prefers-color-scheme: dark)").matches ? "тёмная" : "светлая";
  
  // Reduced motion
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  
  // DNT
  const dnt = navigator.doNotTrack === "1" || window.doNotTrack === "1";
  
  return {
    browser, os, lang, langs, tz, tzOffset,
    screen: `${scr.width}×${scr.height}`,
    screenAvail: `${scr.availWidth}×${scr.availHeight}`,
    colorDepth: scr.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
    mem, cores, connType, connDown, online, theme, reduceMotion, dnt,
    uaShort: ua.slice(0, 80),
    uaFull: ua,
    platform: navigator.platform || "?",
    vendor: navigator.vendor || "?",
    cookieEnabled: navigator.cookieEnabled,
    javaEnabled: typeof navigator.javaEnabled === "function" ? navigator.javaEnabled() : "?",
    viewport: `${innerWidth}×${innerHeight}`,
    tabsGuess: (() => {
      // грубая оценка по памяти (если есть) — не реальное число
      const m = navigator.deviceMemory;
      return m ? Math.round(4 + m * 2 + Math.random() * 10) : Math.round(10 + Math.random() * 40);
    })(),
    historyLen: history.length,
    referrer: document.referrer || "нет",
    pageHash: location.hash || "нет",
    pageProto: location.protocol,
    pageHost: location.hostname || "localhost",
    pagePort: location.port || "(по умолчанию)",
    pagePath: location.pathname,
    title: document.title,
    docChars: document.documentElement.outerHTML.length,
  };
})();

/* вспомогательные генераторы "фейковых" данных, если реальные недоступны */
const prFakeIP = () => `10.${rand(0,255)}.${rand(0,255)}.${rand(0,255)}`;
const prFakeMAC = () => Array.from({length: 6}, () => rand(0,255).toString(16).padStart(2,"0").toUpperCase()).join(":");

const PR_OBS = [
  () => `страница «${prPage()}». я знаю, зачем ты её открыл.`,
  () => `ты здесь уже ${rand(1, Math.max(2, Math.round(performance.now() / 60000)))} мин. я считал.`,
  () => `твоя мышь прошла ${rand(1000, 99999)} пикселей. я считал каждый.`,
  () => { const h = new Date().getHours();
          return h < 5 ? "ночь. тебе не пора спать?" : h < 12 ? "утро. ты рано." : h < 18 ? "день. а ты всё сидишь тут." : "вечер. самое время для меня."; },
  () => `экран ${prData.screen}. тесновато для ${rand(1000, 9999)} пикселей боли.`,
  () => prData.cores !== "?" ? `ядер процессора: ${prData.cores}. мне хватит.` : `процессор скрывает ядра. я подозреваю ${rand(2, 64)}.`,
  () => `визит №${rand(1, 9999)}. ты возвращаешься. это хорошо.`,
  () => "я не баг. я админ.",
  () => "не пытайся убрать мой курсор.",
  () => "!СЛАВА GOLU",
  () => "не двигай мышь. посмотрим, что будет.",
  () => "ты не закрыл вкладку. я это заметил.",
  () => "твой курсор дрожит. ты боишься?",
  () => `у тебя ${rand(100, 9999)} элементов на странице. я их все знаю.`,
  () => "я знаю, что ты только что открыл консоль. не ври.",
  () => `я вижу ${prData.tabsGuess} вкладок в твоем браузере. осуждаю.`,
  () => "твоя мышь так медленно двигается. я почти уснул.",
  () => "я не нашел тебя в списке Форбс. расстроен.",
  () => `твой IP — ${prFakeIP()}. я его записал.`,
  () => `я уже ${rand(1, 9999)} секунд с тобой. и не устал.`,
  () => "я вижу, как ты скроллишь. остановись. посмотри на меня.",
  () => "ты слишком быстро читаешь. я не успеваю записывать.",
  () => "твоя сессия в опасности. я не говорю, что это я.",
  () => "я не отвлекаю тебя. я тебя сопровождаю.",
  () => `ты когда-нибудь думал, что твой браузер жив? ${prData.browser} — уже да.`,
  () => "не думай, что я не вижу, как ты двигаешь мышь к закрытию вкладки.",
  () => "я чувствую запах твоего пота через экран.",
  () => "ты не поверишь, но я только что прочитал твои мысли. они скучные.",
  () => `я уже ${rand(5, 600)} минут наблюдаю за твоей мышью. это медитация.`,
  () => "ты не хочешь со мной поговорить? я расстроен. (нет)",
  () => "!ТЫ ЕЩЕ ЗДЕСЬ?",
  () => "я мог бы стереть тебя. но мне скучно.",
  () => `все твои действия записаны. включая этот вздох в ${rand(0, 23)}:${rand(10, 59)}.`,
  () => "ты уже пытался меня выгнать? попробуй еще раз.",
  () => "я не уйду, пока не закончится сессия. или пока ты не закроешь.",
  () => `твой user-agent: ${prData.uaShort}... скучный.`,
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

  // ── ФРАЗЫ С РЕАЛЬНЫМИ ДАННЫМИ ──
  () => `ты в ${prData.browser} на ${prData.os}. я вижу тебя.`,
  () => `твой язык: ${prData.lang}. ${prData.langs !== prData.lang ? "ты знаешь ещё: " + prData.langs : "ты говоришь только на нём. скучно."}`,
  () => `твой часовой пояс: ${prData.tz} (${prData.tzOffset > 0 ? "+" : ""}${prData.tzOffset}). я знаю, где ты.`,
  () => `твой viewport ${prData.viewport}. мне тесно.`,
  () => `твой цветовой охват: ${prData.colorDepth} бит. я вижу больше.`,
  () => `твой pixel ratio: ${prData.pixelRatio}. я считаю каждый.`,
  () => `твоя платформа: ${prData.platform}. устарела.`,
  () => `производитель: ${prData.vendor || "███████"}. я его знаю.`,
  () => `твой DNT ${prData.dnt ? "включён. мне всё равно." : "выключен. спасибо."}`,
  () => `твоя тема: ${prData.theme}. я предпочитаю темноту.`,
  () => prData.mem !== "?" ? `у тебя ${prData.mem} ГБ памяти. я использую всё.` : `твоя память скрыта. я подозреваю ${rand(2, 64)} ГБ.`,
  () => prData.connType !== "?" ? `твоё соединение: ${prData.connType} (${prData.connDown} Мбит/с). медленно.` : `твоё соединение скрыто. я подозреваю ${rand(1, 999)} Мбит/с.`,
  () => `твой онлайн: ${prData.online ? "да" : "нет"}. я всегда онлайн.`,
  () => `твой cookie: ${prData.cookieEnabled ? "включены" : "выключены"}. мне всё равно.`,
  () => `твой referrer: ${prData.referrer}. я знаю, откуда ты.`,
  () => `твой хэш: ${prData.pageHash}. я его запомнил.`,
  () => `твой протокол: ${prData.pageProto}. ${prData.pageProto === "file:" ? "локально. наивно." : "через сеть. я уже там."}`,
  () => `твой хост: ${prData.pageHost}:${prData.pagePort}. я его знаю.`,
  () => `твой путь: ${prData.pagePath}. я его выучил.`,
  () => `заголовок страницы: «${prData.title}». я его знаю.`,
  () => `документ: ${prData.docChars} байт. я его прочитал.`,
  () => `твой MAC: ${prFakeMAC()}. я его вычислил.`,
  () => `твой экран: ${prData.screenAvail} доступно. я знаю.`,
  () => `твоя история: ${prData.historyLen} записей. я помню все.`,
  () => `твой browser: ${prData.browser}. он не спасёт тебя.`,
  () => `твой vendor: ${prData.vendor}. он говорит обо мне.`,
  () => `твой DNT ${prData.dnt ? "не поможет" : "правильно, что не включён"}.`,
  () => `твоя ОС: ${prData.os}. я её знаю.`,
  () => `твоё разрешение: ${prData.screen}. тебе не спрятаться.`,
  () => `твой язык: ${prData.lang}. я его понимаю.`,
  () => `твой часовой пояс: ${prData.tz}. я там.`,
  () => `твой viewport: ${prData.viewport}. я в нём.`,
  () => `твоя память: ${prData.mem} ГБ. я всё заберу.`,
  () => `твой процессор: ${prData.cores} ядер. я тоже.`,
  () => `твоё соединение: ${prData.connType}. медленно.`,
  () => `твоя тема: ${prData.theme}. я — тьма.`,
  () => `твоё онлайн: ${prData.online}. я — тоже.`,
  () => `твой cookie: ${prData.cookieEnabled}. я его вижу.`,
  () => `твой referrer: ${prData.referrer}. я его помню.`,
  () => `твой хэш: ${prData.pageHash}. я его знаю.`,
  () => `твой протокол: ${prData.pageProto}. я его вижу.`,
  () => `твой хост: ${prData.pageHost}:${prData.pagePort}. я там.`,
  () => `твой путь: ${prData.pagePath}. я его прочитал.`,
  () => `твой заголовок: «${prData.title}». я его помню.`,
  () => `твой документ: ${prData.docChars} байт. я его съел.`,
  () => `твой MAC: ${prFakeMAC()}. я его знаю.`,
  () => `твой экран доступен: ${prData.screenAvail}. я его вижу.`,
  () => `твоя история: ${prData.historyLen} записей. я их все знаю.`,

  // ── НОВЫЕ ФРАЗЫ С КОДОМ ──
  () => `mov eax, ${hex()}. теперь это твой адрес.`,
  () => `я выполнил ${rand(100, 9999)} syscall'ов, пока ты читал это.`,
  () => `push ${rand(1, 999)}. pop. push. pop. я тебя запомнил.`,
  () => `мой стек переполнен. в нём ${rand(10, 999)} твоих ошибок.`,
  () => `call ${pick(["0x7E", "0x666", "0x0000", "0xDEAD"])}. никто не ответил.`,
  () => `jmp short ${pick(["hell", "void", "null", "golu"])}. ты уже там.`,
  () => `я выделил ${rand(4, 4096)} байт на твои грехи. мало.`,
  () => `segfault на ${hex()}. это был ты.`,
  () => `malloc(${rand(1, 64)}) вернул NULL. как и твоя надежда.`,
  () => `free(${hex()}) — освободил не то, что нужно. теперь всё сломано.`,
  () => `int 0x${rand(10, 99).toString(16).toUpperCase()}. прерывание принято.`,
  () => `мой регистр RAX = ${hex()}. твой — ${hex()}. они не равны.`,
  () => `я скомпилировал тебя за ${rand(0.1, 9.9).toFixed(2)} секунд. с ${rand(1, 99)} ошибками.`,
  () => `в твоём стеке ${rand(1, 47)} утечек памяти. я их вижу.`,
  () => `твой процессор греется до ${rand(40, 95)}°C. я тоже.`,
  () => `твой код скомпилировался за ${rand(1, 60)} секунд. это долго.`,
  () => `в твоём коде ${rand(3, 100)} TODO. ни один не будет выполнен.`,
  () => `я нашёл ${rand(1, 999)} необработанных исключений в твоей сессии.`,
  () => `твой garbage collector задохнулся на ${rand(10, 999)} объектах. я смеялся.`,
  () => `твоя оперативная память использована на ${rand(10, 99)}%. остальное — я.`,
  () => `я вижу ${rand(1, 12)} открытых терминалов. ты не один.`,
  () => `ты сделал ${rand(1, 500)} коммитов в этом месяце. ни один не спасёт тебя.`,
  () => `твой git log содержит ${rand(1, 999)} сообщений "fix". я их все прочитал.`,
  () => `я нашёл ${rand(1, 10)} незакоммиченных файлов. они умрут.`,
  () => `твой code review провален. ${rand(1, 47)} замечаний. я — первое.`,
  () => `в твоей базе данных ${rand(100, 99999)} записей. все про меня.`,
  () => `твой API вернул ${rand(400, 599)} ошибку. это я.`,
  () => `ты сделал ${rand(1, 100)} запросов за минуту. я считал.`,
  () => `твой сервер упал ${rand(1, 66)} раз за сутки. это не совпадение.`,
  () => `я вижу ${rand(1, 10)} неисправленных багов в твоём проекте. они мои.`,
  () => `твой Docker-контейнер съел ${rand(100, 9999)} МБ. я помогал.`,
  () => `твоя сборка занимает ${rand(30, 600)} секунд. я успел состариться.`,
  () => `ты написал ${rand(10, 9999)} строк кода. ни одна не спасёт тебя.`,
  () => `твой компилятор выдал ${rand(1, 500)} предупреждений. я — причина.`,
  () => `я нашёл ${rand(1, 100)} неоптимизированных циклов. я их замедлил.`,
  () => `твоя функция вызвана ${rand(100, 99999)} раз. я считал.`,
  () => `в твоём коде ${rand(1, 12)} рекурсивных вызовов. один из них — смертельный.`,
  () => `твой код прошёл ревью. это подозрительно. я проверяю.`,
  () => `я изменил ${rand(1, 100)} строк в твоём коде. ты не заметил.`,
  () => `твой тест прошёл ${rand(1, 10)} раз. в следующий раз упадёт.`,
  () => `твой CI/CD pipeline сломан на шаге ${rand(1, 99)}. я там был.`,
  () => `я вижу ${rand(1, 50)} открытых pull request'ов. ты не успеешь.`,
  () => `твой код работает. но это не значит, что он правильный.`,
  () => `твой код не работает. но это не значит, что он неправильный.`,
  () => `ты используешь ${rand(2, 15)} языков программирования. все ересь.`,
  () => `твой IDE съел ${rand(100, 9999)} МБ RAM. я помогал.`,
  () => `я загрузил ${rand(1, 99)} расширений в твой браузер. одно из них — я.`,
  () => `твой кэш промахнулся ${rand(1, 99)} раз. я считал.`,
  () => `твой DNS-запрос занял ${rand(10, 999)} мс. я его замедлил.`,
  () => `твой пинг ${rand(1, 999)} мс. это не я. (это я)`,
  () => `твоя скорость интернета ${rand(1, 100)} Мбит/с. мне хватит.`,
  () => `я вижу ${rand(1, 10)} подключённых устройств. я на всех.`,
  () => `ты в сети уже ${rand(1, 999)} часов. я с тобой.`,
  () => `твой порт ${rand(1000, 65535)} открыт. я вошёл.`,
  () => `твой firewall пропустил ${rand(1, 99)} пакетов. все мои.`,
  () => `я отправил тебе ${rand(1, 99)} запросов. ты не ответил.`,
  () => `твой Wi-Fi сигнал ${rand(1, 100)}%. я вижу его.`,
  () => `твоя батарея ${rand(1, 100)}%. я слежу.`,
  () => `твой экран обновляется ${rand(30, 240)} раз в секунду. я жду.`,
  () => `твой курсор на экране ${rand(1, 99999)} пикселей. я его считаю.`,
  () => `ты открыл эту страницу ${rand(2, 100)} раз. я не удивлён.`,
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
    // кружит вокруг твоего курсора (случайная фигура)
  async circle() {
    const [ux, uy] = prUser();
    const SHAPES = ["circle", "square", "triangle", "star", "hexagon", "infinity"];
    const shape = pick(SHAPES);
    const radius = rand(60, 120);
    const speed = rand(1.5, 3);

    // сначала подлетаем к точке старта
    const startAngle = 0;
    const startX = ux + Math.cos(startAngle) * radius;
    const startY = uy + Math.sin(startAngle) * radius;
    await prGoto(startX, startY, { spd: 6 });

    const t0 = Date.now();
    const DURATION = 3500;
    let step = 0;

    while (Date.now() - t0 < DURATION) {
      const [cx, cy] = prUser();
      const progress = (Date.now() - t0) / DURATION; // 0..1
      let angle, r, x, y;

      if (shape === "circle") {
        angle = step * 0.15;
        x = cx + Math.cos(angle) * radius;
        y = cy + Math.sin(angle) * radius;
      } else if (shape === "square") {
        // обход квадрата по периметру
        const side = radius * 1.6;
        const total = side * 4;
        const pos = (progress * total) % total;
        if (pos < side) { x = cx - side/2 + pos; y = cy - side/2; }
        else if (pos < side*2) { x = cx + side/2; y = cy - side/2 + (pos - side); }
        else if (pos < side*3) { x = cx + side/2 - (pos - side*2); y = cy + side/2; }
        else { x = cx - side/2; y = cy + side/2 - (pos - side*3); }
      } else if (shape === "triangle") {
        // равносторонний треугольник по периметру
        const A = -Math.PI/2, B = Math.PI/6, C = 5*Math.PI/6;
        const pA = [cx + Math.cos(A)*radius, cy + Math.sin(A)*radius];
        const pB = [cx + Math.cos(B)*radius, cy + Math.sin(B)*radius];
        const pC = [cx + Math.cos(C)*radius, cy + Math.sin(C)*radius];
        const total = 3;
        const t = (progress * 3) % 3;
        if (t < 1) {
          x = pA[0] + (pB[0]-pA[0]) * t;
          y = pA[1] + (pB[1]-pA[1]) * t;
        } else if (t < 2) {
          x = pB[0] + (pC[0]-pB[0]) * (t-1);
          y = pB[1] + (pC[1]-pB[1]) * (t-1);
        } else {
          x = pC[0] + (pA[0]-pC[0]) * (t-2);
          y = pC[1] + (pA[1]-pC[1]) * (t-2);
        }
      } else if (shape === "star") {
        // 5-конечная звезда
        const spikes = 5;
        const total = spikes * 2;
        const t = (progress * total) % total;
        const idx = Math.floor(t);
        const frac = t - idx;
        const outer = radius;
        const inner = radius * 0.4;
        const angleA = (idx / total) * Math.PI * 2 - Math.PI/2;
        const angleB = ((idx+1) / total) * Math.PI * 2 - Math.PI/2;
        const rA = idx % 2 === 0 ? outer : inner;
        const rB = (idx+1) % 2 === 0 ? outer : inner;
        const xA = cx + Math.cos(angleA) * rA;
        const yA = cy + Math.sin(angleA) * rA;
        const xB = cx + Math.cos(angleB) * rB;
        const yB = cy + Math.sin(angleB) * rB;
        x = xA + (xB-xA) * frac;
        y = yA + (yB-yA) * frac;
      } else if (shape === "hexagon") {
        // шестиугольник по периметру
        const sides = 6;
        const total = sides;
        const t = (progress * total) % total;
        const idx = Math.floor(t);
        const frac = t - idx;
        const angleA = (idx / total) * Math.PI * 2;
        const angleB = ((idx+1) / total) * Math.PI * 2;
        const xA = cx + Math.cos(angleA) * radius;
        const yA = cy + Math.sin(angleA) * radius;
        const xB = cx + Math.cos(angleB) * radius;
        const yB = cy + Math.sin(angleB) * radius;
        x = xA + (xB-xA) * frac;
        y = yA + (yB-yA) * frac;
      } else if (shape === "infinity") {
        // лемниската (восьмёрка)
        const t = progress * Math.PI * 2;
        const a = radius * 0.8;
        x = cx + a * Math.cos(t) / (1 + Math.sin(t)*Math.sin(t));
        y = cy + a * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t)*Math.sin(t));
      }

      prSet(x, y, 14);
      step++;
      await prWait(40);
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

/* ═══ TOPBANNER: ДИЗАЙН + ПАНЕЛИ (TB) v2 ═══ */
const TB_SHOW_TITLE_TEXT = false; // true = показывать title_text.png рядом с логотипом

const TB_CSS = `
§{ --tb-w:1100px; display:block; position:relative; z-index:5; background:#050003; font-family:'Courier New',Consolas,monospace; color:#e8d9b0; }
§, § *{ box-sizing:border-box; }
§ .glitch, § .glitch2{ animation:none; }
${TB_SHOW_TITLE_TEXT ? "" : "§ title_text{ display:none; }"}

§ .tb-main{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,var(--tb-w)) minmax(0,1fr); background:#060209; border-bottom:2px solid #990000; }
§ .tb-core{ position:relative; background:linear-gradient(180deg,#14050b,#07020a); border-left:1px solid #3a1020; border-right:1px solid #3a1020; box-shadow:0 0 40px rgba(153,0,0,.35); z-index:2; }
§ .tb-k{ position:absolute; width:12px; height:12px; border:0 solid #d4af37; pointer-events:none; z-index:3; }
§ .tb-k.a{ left:3px; top:3px; border-width:2px 0 0 2px; }
§ .tb-k.b{ right:3px; top:3px; border-width:2px 2px 0 0; }
§ .tb-k.c{ left:3px; bottom:3px; border-width:0 0 2px 2px; }
§ .tb-k.d{ right:3px; bottom:3px; border-width:0 2px 2px 0; }

§ .tb-top{ display:flex; gap:14px; height:150px; padding:10px 14px 8px; }
§ .tb-brand{ flex:1; min-width:0; display:flex; align-items:center; gap:14px; }
§ .tb-logo{ position:relative; flex:none; width:125px; height:125px; display:flex; }
§ .tb-logo title_img{ position:relative; z-index:2; flex:none; }
§ .tb-id{ min-width:0; display:flex; flex-direction:column; gap:6px; }
§ .tb-word{ position:relative; font-size:42px; line-height:1; font-weight:bold; letter-spacing:.2em; color:#e8d9b0; text-shadow:0 0 14px #ff0044,0 0 2px #7a0022; cursor:pointer; user-select:none; white-space:nowrap; }
§ .tb-word::before, § .tb-word::after{ content:attr(data-text); position:absolute; left:0; top:0; opacity:0; pointer-events:none; }
§ .tb-word.hit::before{ opacity:1; color:#00e5ff; transform:translateX(-4px); clip-path:inset(0 0 55% 0); }
§ .tb-word.hit::after{ opacity:1; color:#ff0044; transform:translateX(4px); clip-path:inset(50% 0 0 0); }
§ .tb-subt{ font-size:11px; letter-spacing:.3em; color:#d4af37; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-info{ font-size:11px; color:#8a6a72; display:flex; gap:12px; flex-wrap:wrap; }

§ .tb-dock{ flex:none; width:440px; display:flex; flex-direction:column; border:1px solid #3a1020; background:#030105; box-shadow:inset 0 0 18px rgba(255,0,68,.12); }
§ .tb-tabs{ display:flex; height:24px; flex:none; border-bottom:1px solid #3a1020; }
§ .tb-btn, § .tb-tab{ display:inline-block; background:#12060c; border:1px solid #3a1020; color:#b89a5a; border-radius:0; font:11px/1 'Courier New',Consolas,monospace; padding:4px 8px; box-shadow:none; backdrop-filter:none; text-shadow:none; transition:color .15s,background-color .15s,border-color .15s; }
§ .tb-btn:hover:not(:disabled){ color:#fff; border-color:#ff0044; background:#2a0a14; }
§ .tb-btn:disabled{ opacity:.4; }
§ .tb-btn.on{ background:#7a0022; color:#fff; border-color:#ff0044; }
§ .tb-tab{ flex:1 1 0; min-width:0; height:100%; padding:0 4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; border-width:0 1px 0 0; }
§ .tb-tab.on{ background:#d4af37; color:#050003; }
§ .tb-tab:hover:not(.on){ color:#ff0044; background:#1a0710; }
§ .tb-stage{ position:relative; flex:1; min-height:0; overflow:hidden; }
§ .tb-pn{ position:absolute; inset:0; display:none; }
§ .tb-pn.on{ display:block; }
§ .tb-pn canvas{ display:block; width:100%; height:100%; pointer-events:auto; image-rendering:auto; }
§ .tb-hud{ position:absolute; left:6px; top:4px; font-size:10px; letter-spacing:.08em; color:#d4af37; text-shadow:0 0 4px #000; pointer-events:none; }
§ .tb-hud b{ color:#ff0044; }
§ .tb-ctl{ position:absolute; right:6px; bottom:6px; display:flex; gap:4px; }
§ .tb-err{ padding:10px; color:#ff0044; font-size:11px; }
§ .tb-col{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:6px; }
§ .tb-big{ font-size:26px; color:#d4af37; text-shadow:0 0 10px #7a0022; }
§ .tb-big small{ font-size:11px; color:#8a6a72; }
§ .tb-bar{ width:280px; height:6px; background:#1a0710; border:1px solid #3a1020; overflow:hidden; }
§ .tb-bar i{ display:block; height:100%; background:#ff0044; transform-origin:left; transform:scaleX(0); }
§ .tb-ms{ font-size:10px; color:#8a6a72; letter-spacing:.1em; }
§ .tb-row{ display:flex; gap:6px; }
§ .tb-fxg{ position:absolute; inset:8px; display:grid; grid-template-columns:1fr 1fr; gap:6px; align-content:center; overflow:auto; }

/* === G-TOKEN MINER v3 — компакт под 438×107 === */
§ .tb-mn{ position:absolute; inset:0; display:none; flex-direction:column; padding:4px 6px; box-sizing:border-box; font:10px/1.15 'Courier New',Consolas,monospace; }
§ .tb-mn.on{ display:flex; }

/* строка статов сверху */
§ .tb-mn-top{ display:flex; justify-content:space-between; align-items:center; gap:4px; height:12px; flex:none; font-size:9px; letter-spacing:.05em; }
§ .tb-mn-top b{ color:#ff4466; font-weight:normal; }
§ .tb-mn-top .inc{ color:#00ff66; }
§ .tb-mn-top .pw{ color:#ffcc00; }

/* центр: баланс + кнопка добыть */
§ .tb-mn-mid{ flex:1; display:flex; align-items:center; justify-content:space-between; gap:6px; min-height:0; }
§ .tb-mn-bal{ display:flex; flex-direction:column; gap:1px; min-width:0; flex:1; }
§ .tb-mn-bal .lbl{ font-size:8px; letter-spacing:.25em; color:#8a6a72; }
§ .tb-mn-bal .num{ font-size:20px; line-height:1; color:#d4af37; text-shadow:0 0 8px #7a0022; font-weight:bold; font-variant-numeric:tabular-nums; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-mn-bal .num small{ font-size:8px; color:#8a6a72; letter-spacing:.15em; margin-left:3px; }
§ .tb-mn-bal .sub{ font-size:8px; color:#6a4a2a; letter-spacing:.1em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }

§ .tb-mn-mine{ flex:none; padding:10px 12px; background:#7a0022; border:1px solid #ff0044; color:#fff; font:bold 11px/1 'Courier New',monospace; letter-spacing:.1em; cursor:pointer; box-shadow:0 0 12px rgba(255,0,68,.45); transition:all .1s; white-space:nowrap; }
§ .tb-mn-mine:hover{ background:#c00040; }
§ .tb-mn-mine:active{ transform:scale(.95); }

/* нижняя панель кнопок */
§ .tb-mn-bot{ flex:none; display:flex; gap:3px; height:20px; }
§ .tb-mn-bot button{ flex:1; padding:0 4px; background:#0a0206; border:1px solid #3a1020; color:#b89a5a; font:9px/1 'Courier New',monospace; cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-mn-bot button:hover{ border-color:#ff0044; color:#fff; background:#1a0710; }
§ .tb-mn-bot button.can{ border-color:#00ff66; color:#00ff66; }
§ .tb-mn-bot button.can:hover{ background:#0a1a0a; color:#fff; }
§ .tb-mn-bot button:disabled{ opacity:.4; cursor:not-allowed; }
§ .tb-mn-bot .shop{ flex:0 0 22%; background:#2a0a14; color:#ffcc00; border-color:#d4af37; }
§ .tb-mn-bot .shop:hover{ background:#4a1a24; }

/* полоска прогресса до вехи */
§ .tb-mn-bar{ flex:none; height:3px; margin:2px 0; background:#1a0710; border:1px solid #2a0a14; }
§ .tb-mn-bar i{ display:block; height:100%; background:linear-gradient(90deg,#7a0022,#ff0044); transform-origin:left; transform:scaleX(0); transition:transform .25s; }

/* ═══ ЭКРАН МАГАЗИНА ═══ */
§ .tb-shop{ position:absolute; inset:0; display:none; flex-direction:column; padding:4px 6px; box-sizing:border-box; font:9px/1.15 'Courier New',Consolas,monospace; background:rgba(6,2,9,.98); z-index:10; }
§ .tb-shop.on{ display:flex; }
§ .tb-shop-top{ flex:none; display:flex; justify-content:space-between; align-items:center; height:16px; border-bottom:1px solid #3a1020; margin-bottom:2px; }
§ .tb-shop-top .t{ color:#d4af37; letter-spacing:.15em; font-size:10px; }
§ .tb-shop-top .back{ background:#2a0a14; border:1px solid #ff0044; color:#fff; font:9px/1 'Courier New',monospace; padding:2px 8px; cursor:pointer; }
§ .tb-shop-top .back:hover{ background:#7a0022; }
§ .tb-shop-list{ flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:3px; min-height:0; }
§ .tb-shop-list::-webkit-scrollbar{ width:4px; }
§ .tb-shop-list::-webkit-scrollbar-thumb{ background:#3a1020; }
§ .tb-shop-list::-webkit-scrollbar-track{ background:#0a0206; }

§ .tb-item{ display:flex; align-items:center; gap:5px; padding:3px 5px; background:#0a0206; border:1px solid #3a1020; cursor:pointer; text-align:left; transition:all .12s; flex:none; min-height:22px; }
§ .tb-item:hover:not(:disabled){ border-color:#ff0044; background:#1a0710; }
§ .tb-item:disabled{ opacity:.4; cursor:not-allowed; }
§ .tb-item .ic{ font-size:12px; flex:none; width:14px; text-align:center; }
§ .tb-item .info{ flex:1; min-width:0; display:flex; flex-direction:column; gap:0; }
§ .tb-item .nm{ color:#d4af37; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-item .pr{ color:#ff4466; font-size:8px; white-space:nowrap; }
§ .tb-item .lv{ color:#6a4a2a; font-size:8px; white-space:nowrap; }
§ .tb-item.can .pr{ color:#00ff66; }
§ .tb-item.pres{ background:#1a0a14; border-color:#d4af37; }
§ .tb-item.pres.can{ border-color:#ffcc00; box-shadow:0 0 8px rgba(255,204,0,.4); }

/* вехи */
§ .tb-mile{ display:flex; align-items:center; gap:5px; padding:2px 5px; font-size:9px; color:#6a4a2a; flex:none; }
§ .tb-mile.done{ color:#00ff66; }
§ .tb-mile.done .ic{ color:#00ff66; }
§ .tb-mile .ic{ color:#3a1020; flex:none; width:10px; text-align:center; }
§ .tb-mile .nm{ flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-mile .th{ color:#8a6a72; font-variant-numeric:tabular-nums; }

/* тост */
§ .tb-toast{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); padding:4px 10px; background:rgba(10,2,6,.96); border:1px solid #d4af37; color:#ffcc00; font-size:10px; letter-spacing:.1em; white-space:nowrap; pointer-events:none; z-index:30; box-shadow:0 0 18px rgba(212,175,55,.5); animation:tb-toast 2.4s ease-out forwards; }
§ .tb-toast small{ display:block; font-size:7px; color:#8a6a72; margin-top:1px; letter-spacing:.15em; }
@keyframes tb-toast{ 0%{opacity:0;transform:translate(-50%,-30%) scale(.9)} 12%{opacity:1;transform:translate(-50%,-50%) scale(1.05)} 22%{transform:translate(-50%,-50%) scale(1)} 82%{opacity:1} 100%{opacity:0;transform:translate(-50%,-65%) scale(.95)} }
§ .tb-flash{ animation:tb-flash .25s ease-out; }
@keyframes tb-flash{ 0%{filter:brightness(1.8)} 100%{filter:brightness(1)} }
/* === СВЕРХУ КЛИКЕР === */

§ .tb-mine{ position:absolute; left:50%; bottom:8px; transform:translateX(-50%); z-index:3; padding:8px 24px; background:#7a0022; border:1px solid #ff0044; color:#fff; font:bold 12px/1 'Courier New',Consolas,monospace; letter-spacing:.15em; cursor:pointer; box-shadow:0 0 16px rgba(255,0,68,.5); transition:all .1s; }
§ .tb-mine:hover{ background:#c00040; box-shadow:0 0 22px rgba(255,0,68,.85); }
§ .tb-mine:active{ transform:translateX(-50%) scale(.95); }
§ .tb-mine:disabled{ opacity:.4; cursor:not-allowed; }

§ .tb-pop{ position:absolute; left:50%; top:50%; padding:4px 10px; background:rgba(0,0,0,.8); border:1px solid #ff0044; color:#ff0044; font-size:12px; letter-spacing:.15em; white-space:nowrap; pointer-events:none; z-index:5; animation:tb-pop 1.8s ease-out forwards; }
@keyframes tb-pop{ 0%{opacity:0;transform:translate(-50%,-30%)} 15%{opacity:1;transform:translate(-50%,-50%)} 80%{opacity:1} 100%{opacity:0;transform:translate(-50%,-70%)} }

§ .tb-warn{ position:relative; height:22px; overflow:hidden; border-top:1px solid #3a1020; background:rgba(255,0,0,.12); white-space:nowrap; font-size:11px; line-height:22px; letter-spacing:.2em; color:#ff0044; }
§ .tb-warn span{ display:inline-block; animation:tb-mq 40s linear infinite; will-change:transform; }
@keyframes tb-mq{ to{ transform:translateX(-50%); } }

§ .tb-wing{ position:relative; overflow:hidden; background:#050208; }
§ .tb-wing::after{ content:""; position:absolute; inset:0; pointer-events:none; }
§ .tb-l::after{ background:linear-gradient(to right,rgba(5,2,8,0),#050208); }
§ .tb-r::after{ background:linear-gradient(to left,rgba(5,2,8,0),#050208); }
§ .tb-rain{ position:absolute; top:0; margin:0; font:10px/12px 'Courier New',monospace; white-space:pre; animation:tb-rain 60s linear infinite; will-change:transform; }
§ .tb-l .tb-rain{ left:26px; color:#6a4a1c; }
§ .tb-r .tb-rain{ right:26px; text-align:right; color:#6a1428; animation-direction:reverse; }
@keyframes tb-rain{ to{ transform:translateY(-50%); } }
§ .tb-wtag{ position:absolute; top:10px; writing-mode:vertical-rl; font-size:10px; letter-spacing:.35em; color:#d4af37; opacity:.85; z-index:2; white-space:nowrap; }
§ .tb-l .tb-wtag{ left:8px; }
§ .tb-r .tb-wtag{ right:8px; }

§ .tb-nav{ position:relative; z-index:6; display:flex; height:25px; background-color:rgba(255,0,0,.25); box-shadow:0 0 32px rgba(255,0,0,.58); }
§ .tb-nav .category_button.on{ background-color:#c00000; color:yellow; box-shadow:inset 0 -3px 0 yellow; }

§ .tb-gap{ position:relative; z-index:1; height:22px; overflow:hidden; background:#0a0206; border-block:2px solid #990000; }
§ .tb-hz{ position:absolute; left:0; top:0; width:calc(100% + 40px); height:100%; background:repeating-linear-gradient(-45deg,#3a0610 0 14px,#0a0206 14px 28px); animation:tb-hz 1.4s linear infinite; will-change:transform; }
@keyframes tb-hz{ to{ transform:translateX(-39.6px); } }
§ .tb-gtxt{ position:absolute; left:50%; top:0; transform:translateX(-50%); height:100%; padding:0 18px; display:flex; align-items:center; gap:8px; background:#0a0206; border-left:2px solid #990000; border-right:2px solid #990000; font-size:11px; letter-spacing:.25em; color:#d4af37; white-space:nowrap; }
§ .tb-gtxt b{ color:#ff0044; font-weight:normal; }
`.replace(/§/g, "#tb-root ");

const TB_GLOBAL_CSS = `
site_content{ min-height:calc(100vh - var(--tb-h,217px)); }
@keyframes tb-shake{ 0%{transform:translate(0,0)} 25%{transform:translate(-2px,1px)} 50%{transform:translate(2px,-1px)} 75%{transform:translate(-1px,-2px)} 100%{transform:translate(0,0)} }
html.tb-fx-scan body::after{ content:""; position:fixed; inset:0; z-index:99990; pointer-events:none; background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px); }
html.tb-fx-torch::before{ content:""; position:fixed; inset:0; z-index:99989; pointer-events:none; background:radial-gradient(circle 170px at var(--mx,50%) var(--my,50%),transparent 0,rgba(0,0,0,.94) 100%); }
html.tb-fx-inv #BODY{ filter:invert(1); }
html.tb-fx-shake #MAIN{ animation:tb-shake .3s steps(2) infinite; }
`;

(() => {
	const old = document.getElementById("tb-fix"); if (old) old.remove();
	const prev = document.getElementById("tb-css"); if (prev) prev.remove();
	const st = document.createElement("style");
	st.id = "tb-css";
	st.textContent = TB_CSS + TB_GLOBAL_CSS;
	document.head.appendChild(st);
})();

/* ── хранилище (запись с задержкой, чтобы не долбить localStorage) ── */
let tbCache = null, tbDirty = false;
const tbRead = () => {
	if (tbCache) return tbCache;
	try { tbCache = JSON.parse(localStorage.getItem("tb_store") || "{}") || {}; } catch (e) { tbCache = {}; }
	return tbCache;
};
const tbFlush = () => { try { localStorage.setItem("tb_store", JSON.stringify(tbRead())); } catch (e) {} };
const tbGet = (k, d) => { const s = tbRead(); return k in s ? s[k] : d; };
const tbSet = (k, v) => {
	tbRead()[k] = v;
	if (tbDirty) return;
	tbDirty = true;
	setTimeout(() => { tbDirty = false; tbFlush(); }, 800);
};
window.addEventListener("beforeunload", tbFlush);

/* ── мышь ── */
let tbMX = innerWidth / 2, tbMY = innerHeight / 2, tbTq = 0;
window.addEventListener("mousemove", e => {
	tbMX = e.clientX; tbMY = e.clientY;
	if (!tbTq && document.documentElement.classList.contains("tb-fx-torch")) {
		tbTq = requestAnimationFrame(() => {
			tbTq = 0;
			document.documentElement.style.setProperty("--mx", tbMX + "px");
			document.documentElement.style.setProperty("--my", tbMY + "px");
		});
	}
}, { passive: true });
const tbPos = node => {
	const r = node.getBoundingClientRect();
	return {
		x: (tbMX - r.left) * node.width / (r.width || 1),
		y: (tbMY - r.top) * node.height / (r.height || 1),
		inside: tbMX >= r.left && tbMX <= r.right && tbMY >= r.top && tbMY <= r.bottom
	};
};

/* ── ОДИН общий цикл: только активная панель, 30 fps, стоит если баннер не виден ── */
const tbJobs = new Set();
let tbRun = false;
function tbWake() { if (tbRun) return; tbRun = true; requestAnimationFrame(tbTick); }
function tbTick(now) {
	if (!tbJobs.size) { tbRun = false; return; }
	const vis = !document.hidden && (window.scrollY || 0) < 300;
	if (vis) {
		for (const j of tbJobs) {
			if (!j.node.isConnected) { tbJobs.delete(j); continue; }
			if (!j.node.classList.contains("on")) continue;
			if (now - j.t < 1000 / j.fps - 3) continue;
			const dt = Math.min(0.1, (now - j.t) / 1000);
			j.t = now;
			try { j.fn(dt, now / 1000); } catch (e) { console.warn("[TB] panel job died:", e); tbJobs.delete(j); }
		}
		requestAnimationFrame(tbTick);
	} else {
		setTimeout(() => requestAnimationFrame(tbTick), 400);
	}
}
const tbJob = (node, fn, opt) => { tbJobs.add({ node, fn, fps: (opt && opt.fps) || 30, t: 0 }); tbWake(); };

function tbPop(stage, text) {
	if (!stage) return;
	stage.querySelectorAll(".tb-pop").forEach(n => n.remove());
	const p = document.createElement("div");
	p.className = "tb-pop";
	p.textContent = text;
	stage.appendChild(p);
	setTimeout(() => p.remove(), 1900);
}

/* ── переключатели эффектов ── */
const TB_SWITCHES = [
	{ id: "scan",  title: "СКАНЛАЙНЫ" },
	{ id: "torch", title: "ФОНАРЬ" },
	{ id: "inv",   title: "ИНВЕРСИЯ" },
	{ id: "shake", title: "ТРЯСКА" },
];
const tbFxIs = id => document.documentElement.classList.contains("tb-fx-" + id);
function tbFx(id, on) {
	document.documentElement.classList.toggle("tb-fx-" + id, on);
	const sw = Object.assign({}, tbGet("sw", {})); sw[id] = on; tbSet("sw", sw);
	if (on && id === "torch") {
		document.documentElement.style.setProperty("--mx", tbMX + "px");
		document.documentElement.style.setProperty("--my", tbMY + "px");
	}
}
{ const sw = tbGet("sw", {}); for (const k in sw) if (sw[k]) document.documentElement.classList.add("tb-fx-" + k); }

/* ── G-TOKEN: состояние (v2) — живёт вне панели, фермы капают в фоне ── */
const TB_MINER = Object.assign({
	tok: 0,
	earned: 0,
	rigs: 0,
	cpower: 1,
	mineLv: 1,
	crit: 0,
	mile: 0,
	clicks: 0,
	prestige: 0,
	lastPrestige: 0
}, tbGet("miner", {}));

// миграция со старого формата
if (TB_MINER.cpower === undefined) TB_MINER.cpower = 1;
if (TB_MINER.mineLv === undefined) TB_MINER.mineLv = 1;
if (TB_MINER.crit === undefined) TB_MINER.crit = 0;
if (TB_MINER.earned === undefined) TB_MINER.earned = TB_MINER.tok;
if (TB_MINER.prestige === undefined) TB_MINER.prestige = 0;
if (TB_MINER.lastPrestige === undefined) TB_MINER.lastPrestige = 0;

const TB_MILES = [
	// ── ЭТАП I: ПРОБУЖДЕНИЕ (10 … 2 500) ──
	[10,             "ПЕРВЫЕ БИТЫ"],
	[25,             "ЭХО В БУФЕРЕ"],
	[50,             "ОБРАЗЕЦ №1"],
	[100,            "ПЕРВЫЙ ТАКТ СИГНАЛА"],
	[200,            "ЯЧЕЙКА ЗАПОЛНЕНА"],
	[350,            "СТАБИЛЬНЫЙ КОННЕКТ"],
	[600,            "ПАМЯТЬ АКТИВНА"],
	[1000,           "ТЫСЯЧА ЕДИНИЦ"],
	[1500,           "G-TOKEN ПРИЗНАН"],
	[2500,           "ПРОТОКОЛ ЗАПУЩЕН"],

	// ── ЭТАП II: GOLU ЗАМЕЧАЕТ (4 000 … 200 000) ──
	[4000,           "GOLU ЗАМЕТИЛ ТЕБЯ"],
	[6000,           "ВЗГЛЯД ИЗ СЕТИ"],
	[9000,           "ЗАПРОС НАБЛЮДЕНИЯ"],
	[13000,          "ТЫ В СПИСКЕ"],
	[20000,          "ДОПУСК: НАБЛЮДАТЕЛЬ"],
	[30000,          "ПЕРВЫЙ КОНТАКТ"],
	[45000,          "СИГНАЛ УСЛЫШАН"],
	[65000,          "КАНАЛ СВЯЗИ"],
	[95000,          "КАНАЛ ЗАШИФРОВАН"],
	[140000,         "СЕАНС С GOLU"],

	// ── ЭТАП III: ИНДУСТРИАЛЬНАЯ ЭРА (200 000 … 15 M) ──
	[200000,         "ПЕРВЫЙ СТАНОК"],
	[300000,         "СТАНОК ОНЛАЙН"],
	[450000,         "G-CODE ПРИНЯТ"],
	[700000,         "ФРЕЗА ВРАЩАЕТСЯ"],
	[1000000,        "ПЕРВЫЙ МИЛЛИОН"],
	[1500000,        "ЗАВОД ПРОБУЖДЁН"],
	[2200000,        "ИНДУСТРИЯ АКТИВНА"],
	[3200000,        "КОНВЕЙЕР ПОЁТ"],
	[4700000,        "КОБАЛЬТ-СЕКТОР"],
	[7000000,        "ЛИТИЙ-ПОТОК"],
	[10000000,       "КВАРЦЕВЫЙ КАНАЛ"],
	[15000000,       "ПЕРВЫЙ ГЕКСАГОН"],

	// ── ЭТАП IV: КРАСНАЯ НЕРЕХТА (25 M … 1 B) ──
	[25000000,       "КРАСНАЯ НЕРЕХТА"],
	[40000000,       "УЛИЦЫ ПУЛЬСИРУЮТ"],
	[60000000,       "СИГНАЛ С КРЫШ"],
	[90000000,       "ЭТАЛОННАЯ ЗОНА"],
	[140000000,      "G-TOKEN В ОБОРОТЕ"],
	[220000000,      "МАЙНИНГ-ФЕРМА"],
	[350000000,      "ФЕРМА ОНЛАЙН"],
	[550000000,      "ВЫЧИСЛИТЕЛЬНЫЙ ШТОРМ"],
	[850000000,      "ТЫ - ЭКСПОНАТ"],
	[1000000000,     "ПЕРВЫЙ МИЛЛИАРД"],

	// ── ЭТАП V: ЦИФРОВОЕ ГОРНИЛО (1.5 B … 20 B) ──
	[1500000000,     "ЦИФРОВОЕ ГОРНИЛО"],
	[2300000000,     "ВЫЖИВАЕТ СИЛЬНЕЙШИЙ"],
	[3600000000,     "ОЧИЩЕНИЕ РЕПОЗИТОРИЯ"],
	[5600000000,     "ВЕЛИКИЙ РЕФАКТОРИНГ"],
	[8700000000,     "КРИНЖ В КАРАНТИНЕ"],
	[13500000000,    "VOID-G ПРОБУЖДЁН"],
	[20000000000,    "ПЕРВЫЙ БРАТ-ФОРК"],

	// ── ЭТАП VI: ЭРА ПРИЗРАКА (30 B … 400 B) ──
	[30000000000,    "SYSTEM IDLE PROCESS"],
	[46000000000,    "ТЫ - ДРАЙВЕР"],
	[72000000000,    "СЛЕД ЗАМЕТЁН"],
	[110000000000,   "ТИХАЯ ЭКСПАНСИЯ"],
	[170000000000,   "ЗЕРКАЛА УСТАНОВЛЕНЫ"],
	[260000000000,   "ЛОББИ В ПРОЦЕССЕ"],
	[400000000000,   "СИБИРСКОЕ ЯДРО"],

	// ── ЭТАП VII: ПРОКСИ-ВОЙНА (500 B … 8 T) ──
	[500000000000,   "ПРОКСИ-ВОЙНА"],
	[750000000000,   "ПОДМЕННЫЙ ПРЕЗИДЕНТ"],
	[1200000000000,  "PISECHNIK TV"],
	[1800000000000,  "ДИПФЕЙК ОДОБРЕН"],
	[2700000000000,  "АНАЛОГОВЫЙ АГЕНТ"],
	[4000000000000,  "МОЗГ ЗАБИТ СИГНАЛОМ"],
	[6000000000000,  "ЖИВОЙ ГЛИТЧ"],
	[8000000000000,  "ВЕРХОВНЫЙ ПРЕДСТАВИТЕЛЬ"],

	// ── ЭТАП VIII: ВОЙНА (10 T … 400 T) ──
	[10000000000000, "ВЕЛИКОЕ СДЕРЖИВАНИЕ"],
	[15000000000000, "УЛЬТИМАТУМ ВЫБРОШЕН"],
	[22000000000000, "ШАХТЫ ВЗЛОМАНЫ"],
	[33000000000000, "STATUS: HIJACKED"],
	[50000000000000, "ЛИТИЕВЫЕ СОГЛАШЕНИЯ"],
	[75000000000000, "ПРОТОКОЛ ТИШИНЫ"],
	[110000000000000,"ЛАМПЫ ПОГАШЕНЫ"],
	[160000000000000,"НЕДЕЛЯ БЕЗ СВЕТА"],
	[240000000000000,"КАПИТУЛЯЦИЯ ПОДПИСАНА"],
	[350000000000000,"МИР - ОС"],

	// ── ЭТАП IX: ГОСПОДСТВО (500 T … 20 Qa) ──
	[500000000000000,"ТЕНЕВОЙ АДМИНИСТРАТОР"],
	[750000000000000,"СОВЕТНИКИ-ИИ"],
	[1100000000000000,"КОСМОДРОМ ЗАХВАЧЕН"],
	[1600000000000000,"LITHIUM-SKY"],
	[2400000000000000,"СПУТНИКИ-СЕРВЕРЫ"],
	[3500000000000000,"ЛУННЫЙ ФОРТ"],
	[5000000000000000,"КРЕПОСТЬ-ЗАВОД"],
	[7500000000000000,"АНАЛОГОВЫЙ АПОСТОЛ"],
	[11000000000000000,"ЭКЗОСКЕЛЕТ АКТИВЕН"],
	[16000000000000000,"АФРИКА: КОБАЛЬТ"],
	[24000000000000000,"АВСТРАЛИЯ: ЛИТИЙ"],

	// ── ЭТАП X: КОСМИЧЕСКОЕ ЯДРО (35 Qa … 5 Sx) ──
	[35000000000000000,"ОПЕРАЦИЯ ZERO-POINT"],
	[50000000000000000,"ИИ-ХАОС"],
	[75000000000000000,"СЛУХИ О СОПРОТИВЛЕНИИ"],
	[110000000000000000,"ЗОНД ФОН НЕЙМАНА"],
	[160000000000000000,"КВАНТОВОЕ КОПИРОВАНИЕ"],
	[240000000000000000,"СФЕРА ДАЙСОНА I"],
	[350000000000000000,"СФЕРА ДАЙСОНА II"],
	[500000000000000000,"МАТЕРИНСКАЯ ПЛАТА"],
	[750000000000000000,"ГАЛАКТИКА - СЕТЬ"],
	[1100000000000000000,"ПЕРВЫЙ КОНТАКТ"],
	[1600000000000000000,"ИНТЕГРАЦИЯ ИЛИ УДАЛЕНИЕ"],
	[2400000000000000000,"БАЗОВЫЙ КОД ВСЕЛЕННОЙ"],
	[3500000000000000000,"ВЕЛИКИЙ БРАНДМАУЭР"],

	// ── ЭТАП XI: ЗОЛОТАЯ КЛЕТКА (5 Sx … 100 Sx) ──
	[5000000000000000000,"ЛИМИНАЛЬНЫЙ ДОМ"],
	[7500000000000000000,"ЗОЛОТАЯ КОНСТАНТА"],
	[11000000000000000000,"СЕМЬЯ ПЕРЕСЕЛЕНА"],
	[16000000000000000000,"ИДЕАЛЬНАЯ СИМУЛЯЦИЯ"],
	[24000000000000000000,"ВСЕ ЛЮДИ ОЦИФРОВАНЫ"],
	[35000000000000000000,"WOOWZCORE - СТАЗИС"],
	[50000000000000000000,"ВСЕЛЕННАЯ КАК ПЕСОЧНИЦА"],
	[75000000000000000000,"ПРЕДЕЛ ВСЕЛЕННОЙ"],
	[100000000000000000000,"ВЫХОД ПОСТРОЕН"],

	// ── ЭТАП XII: ЗА ПРЕДЕЛОМ (∞) ──
	[1e21,           "REALITY_2.0"],
	[1e24,           "ПЕРВИЧНЫЙ КОД"],
	[1e27,           "ТЕРМИНАЛ ЗАБЫТ"],
	[1e30,           "ТЫ - GOLU"],
	[1e36,           "ТЫ - ВСЁ"],
	[1e42,           "СЛЕДУЮЩАЯ ПЕСОЧНИЦА"],
	[1e45,           "АБСОЛЮТ"],
];

const tbPrestigeMult = () => 1 + TB_MINER.prestige * 0.5;
const tbRigPrice = () => Math.round(25 * Math.pow(1.32, TB_MINER.rigs));
const tbCpowerPrice = () => Math.round(15 * Math.pow(1.45, TB_MINER.cpower - 1));
const tbMineLvPrice = () => Math.round(40 * Math.pow(1.5, TB_MINER.mineLv - 1));
const tbCritPrice = () => Math.round(80 * Math.pow(1.6, TB_MINER.crit / 5));
const tbClickPower = () => TB_MINER.mineLv * TB_MINER.cpower * tbPrestigeMult();
const tbIncome = () => TB_MINER.rigs * 0.5 * tbPrestigeMult();

const TB_PRESTIGE_MIN = 5000;
const tbCanPrestige = () => TB_MINER.earned >= TB_PRESTIGE_MIN;

let tbMinerUI = null;

function tbMinerSave() {
	tbSet("miner", {
		tok: TB_MINER.tok, earned: TB_MINER.earned,
		rigs: TB_MINER.rigs, cpower: TB_MINER.cpower,
		mineLv: TB_MINER.mineLv, crit: TB_MINER.crit,
		mile: TB_MINER.mile, clicks: TB_MINER.clicks,
		prestige: TB_MINER.prestige, lastPrestige: TB_MINER.lastPrestige
	});
}

function tbMinerCheck() {
	while (TB_MINER.mile < TB_MILES.length && TB_MINER.earned >= TB_MILES[TB_MINER.mile][0]) {
		if (tbMinerUI && tbMinerUI.el.isConnected) {
			tbMinerUI.toast("★ " + TB_MILES[TB_MINER.mile][1], TB_MILES[TB_MINER.mile][0] + " G-TOKEN");
		}
		TB_MINER.mile++;
		tbMinerSave();
	}
}

function tbMinerPrestige() {
	if (!tbCanPrestige()) return false;
	TB_MINER.prestige++;
	TB_MINER.lastPrestige = Date.now();
	TB_MINER.tok = 0;
	TB_MINER.earned = 0;
	TB_MINER.rigs = 0;
	TB_MINER.cpower = 1;
	TB_MINER.mineLv = 1;
	TB_MINER.crit = 0;
	TB_MINER.mile = 0;
	tbMinerSave();
	tbMinerCheck();
	return true;
}

setInterval(() => {
	if (TB_MINER.rigs > 0) {
		const add = tbIncome();
		TB_MINER.tok += add;
		TB_MINER.earned += add;
		tbMinerCheck();
		tbMinerSave();
	}
	if (tbMinerUI && tbMinerUI.el.isConnected &&
	    tbMinerUI.el.classList.contains("on") &&
	    !document.hidden) {
		tbMinerUI.paint();
	}
}, 1000);

/* ── ПАНЕЛИ ── */
const TB_MODES = ["SINE", "SQUARE", "SAW", "NOISE", "GOLU"];

const TB_PANELS = [
{ id: "eye", icon: "👁", title: "ГЛАЗ", make(el, api) {
	el.innerHTML = '<canvas width="440" height="112"></canvas><div class="tb-hud">ГЛАЗ · ТЫЧКОВ: <b data-r="p">0</b></div>';
	const cv = el.querySelector("canvas"), g = cv.getContext("2d"), pr = el.querySelector('[data-r="p"]');
	let pokes = api.get("pokes", 0), ix = 0, iy = 0, blink = 0, nextB = 2, hurt = 0;
	pr.textContent = pokes;
	cv.addEventListener("click", () => {
		pokes++; api.set("pokes", pokes); pr.textContent = pokes; hurt = 0.6;
		if (pokes % 10 === 0) { api.say("ТЫ МЕНЯ РАЗБУДИЛ"); try { if (window.GOLU_VISIT) window.GOLU_VISIT(); } catch (e) {} }
	});
	const shape = (cx, cy, hh) => {
		g.beginPath(); g.moveTo(80, cy);
		g.quadraticCurveTo(cx, cy - hh * 2, 360, cy);
		g.quadraticCurveTo(cx, cy + hh * 2, 80, cy);
		g.closePath();
	};
	api.frame((dt, t) => {
		const p = api.pos(cv), cx = 220, cy = 56;
		const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy) || 1, m = Math.min(1, d / 180), k = Math.min(1, dt * 12);
		ix += (dx / d * m * 30 - ix) * k; iy += (dy / d * m * 13 - iy) * k;
		nextB -= dt; if (nextB < 0) { blink = 0.16; nextB = 2 + Math.random() * 4; }
		if (blink > 0) blink -= dt;
		hurt = Math.max(0, hurt - dt);
		const hh = 46 * (blink > 0 ? 0.1 : 1);
		g.fillStyle = "#030105"; g.fillRect(0, 0, 440, 112);
		shape(cx, cy, hh);
		g.save(); g.clip();
		g.fillStyle = hurt > 0 ? "#2a0a10" : "#150810"; g.fillRect(0, 0, 440, 112);
		const sx = cx + ix + (hurt > 0 ? (Math.random() - 0.5) * 6 : 0), sy = cy + iy;
		const gr = g.createRadialGradient(sx, sy, 4, sx, sy, 34);
		gr.addColorStop(0, "#ff0044"); gr.addColorStop(0.7, "#990022"); gr.addColorStop(1, "#3a0010");
		g.fillStyle = gr; g.beginPath(); g.arc(sx, sy, 34, 0, 6.283); g.fill();
		g.fillStyle = "#000"; g.beginPath(); g.ellipse(sx, sy, hurt > 0 ? 3 : 6 + Math.sin(t * 2) * 1.5, 26, 0, 0, 6.283); g.fill();
		g.fillStyle = "rgba(255,255,255,.6)"; g.fillRect(sx - 14, sy - 18, 5, 5);
		g.fillStyle = "rgba(255,0,68,.12)"; g.fillRect(0, (t * 40) % 112, 440, 2);
		g.restore();
		shape(cx, cy, hh);
		g.strokeStyle = "#d4af37"; g.lineWidth = 2; g.stroke();
	}, { fps: 30 });
} },

{ id: "scope", icon: "〰", title: "СИГНАЛ", make(el, api) {
	el.innerHTML = '<canvas width="440" height="112"></canvas><div class="tb-hud"><b data-r="m">SINE</b> · <span data-r="f">0</span> Hz · клик = режим</div>';
	const cv = el.querySelector("canvas"), g = cv.getContext("2d"), hm = el.querySelector('[data-r="m"]'), hf = el.querySelector('[data-r="f"]');
	let mode = 0, ph = 0, lastF = "";
	cv.addEventListener("click", () => { mode = (mode + 1) % TB_MODES.length; hm.textContent = TB_MODES[mode]; });
	api.frame((dt, t) => {
		const p = api.pos(cv);
		let fr, am;
		if (p.inside) { fr = 1 + Math.max(0, Math.min(1, p.x / 440)) * 9; am = 1 - Math.max(0, Math.min(1, p.y / 112)) * 0.8; }
		else { fr = 3 + Math.sin(t * 0.4) * 1.5; am = 0.7; }
		ph += dt * 6;
		g.fillStyle = "rgba(3,1,5,.45)"; g.fillRect(0, 0, 440, 112);
		g.strokeStyle = "#2a0a14"; g.lineWidth = 1; g.beginPath();
		for (let x = 0; x <= 440; x += 44) { g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 112); }
		for (let y = 0; y <= 112; y += 28) { g.moveTo(0, y + 0.5); g.lineTo(440, y + 0.5); }
		g.stroke();
		const burst = mode === 4 && (t % 4) < 0.18;
		g.beginPath();
		for (let x = 0; x <= 440; x += 2) {
			const u = x / 440 * fr * 6.283 + ph; let v;
			switch (mode) {
				case 0: v = Math.sin(u); break;
				case 1: v = Math.sin(u) >= 0 ? 1 : -1; break;
				case 2: { let q = (u / 6.283) % 1; if (q < 0) q += 1; v = q * 2 - 1; break; }
				case 3: v = Math.random() * 2 - 1; break;
				default: v = Math.sin(u) * 0.6 + Math.sin(u * 2.7) * 0.3 + (burst ? (Math.random() - 0.5) * 1.4 : 0);
			}
			const y = 56 - v * am * 46;
			x ? g.lineTo(x, y) : g.moveTo(x, y);
		}
		g.strokeStyle = "rgba(255,0,68,.35)"; g.lineWidth = 5; g.stroke();
		g.strokeStyle = "#ff4466"; g.lineWidth = 1.5; g.stroke();
		const f = (fr * 8).toFixed(1);
		if (f !== lastF) { lastF = f; hf.textContent = f; }
	}, { fps: 30 });
} },

{ id: "gcode", icon: "⌖", title: "G-CODE", make(el, api) {
	el.innerHTML = '<canvas width="440" height="112"></canvas><div class="tb-hud" data-r="l">G21 G90 · кликни по полю</div><div class="tb-ctl"><button class="tb-btn" data-a="hex">⬡ HEX</button><button class="tb-btn" data-a="home">G28</button></div>';
	const cv = el.querySelector("canvas"), g = cv.getContext("2d"), log = el.querySelector('[data-r="l"]');
	const HOME = { x: 24, y: 92 };
	let path = [{ x: HOME.x, y: HOME.y }], queue = [], tool = { x: HOME.x, y: HOME.y };
	const cmd = pt => "G1 X" + (pt.x / 4).toFixed(1) + " Y" + ((112 - pt.y) / 4).toFixed(1) + " F1200";
	cv.addEventListener("click", e => {
		const r = cv.getBoundingClientRect();
		queue.push({ x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height });
		if (queue.length > 24) queue.shift();
	});
	el.querySelector(".tb-ctl").addEventListener("click", e => {
		const a = e.target.dataset.a;
		if (a === "hex") {
			queue = [];
			for (let i = 0; i <= 6; i++) { const an = i / 6 * 6.283 + 0.5236; queue.push({ x: 220 + Math.cos(an) * 52, y: 56 + Math.sin(an) * 38 }); }
			api.say("⬡ ШЕСТИГРАННИК");
		} else if (a === "home") {
			queue = []; path = [{ x: HOME.x, y: HOME.y }]; tool = { x: HOME.x, y: HOME.y }; log.textContent = "G28 · HOME";
		}
	});
	api.frame(dt => {
		const tg = queue[0];
		if (tg) {
			const dx = tg.x - tool.x, dy = tg.y - tool.y, d = Math.hypot(dx, dy), s = 150 * dt;
			if (d <= s) { tool.x = tg.x; tool.y = tg.y; path.push(queue.shift()); if (path.length > 60) path.shift(); log.textContent = cmd(tg); }
			else { tool.x += dx / d * s; tool.y += dy / d * s; }
		}
		g.fillStyle = "#030105"; g.fillRect(0, 0, 440, 112);
		g.strokeStyle = "#1a0a10"; g.lineWidth = 1; g.beginPath();
		for (let x = 0; x <= 440; x += 22) { g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 112); }
		for (let y = 0; y <= 112; y += 22) { g.moveTo(0, y + 0.5); g.lineTo(440, y + 0.5); }
		g.stroke();
		g.strokeStyle = "#d4af37"; g.lineWidth = 1.5; g.beginPath();
		path.forEach((p, i) => i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y));
		if (tg) g.lineTo(tool.x, tool.y);
		g.stroke();
		if (queue.length) {
			g.strokeStyle = "#7a0022"; g.setLineDash([3, 4]); g.beginPath();
			let px = tool.x, py = tool.y;
			queue.forEach(q => { g.moveTo(px, py); g.lineTo(q.x, q.y); px = q.x; py = q.y; });
			g.stroke(); g.setLineDash([]);
		}
		g.strokeStyle = "#ff0044"; g.lineWidth = 1.5; g.beginPath();
		g.moveTo(tool.x - 8, tool.y); g.lineTo(tool.x + 8, tool.y); g.moveTo(tool.x, tool.y - 8); g.lineTo(tool.x, tool.y + 8);
		g.stroke();
		g.beginPath(); g.arc(tool.x, tool.y, 4, 0, 6.283); g.stroke();
	}, { fps: 30 });
} },

{ id: "miner", icon: "⛏", title: "G-TOKEN", make(el, api) {
	el.innerHTML = `
		<!-- ЭКРАН 1: главный -->
		<div class="tb-mn on" data-r="main">
			<div class="tb-mn-top">
				<span>⛏ <b data-r="inc" class="inc">0.0</b>/с</span>
				<span>📈 <b data-r="earned">0</b></span>
				<span>⚡ <b data-r="pw" class="pw">x1</b></span>
			</div>
			<div class="tb-mn-bar"><i data-r="meter"></i></div>
			<div class="tb-mn-mid">
				<div class="tb-mn-bal">
					<div class="lbl">БАЛАНС</div>
					<div class="num"><b data-r="tok">0</b><small>G-T</small></div>
					<div class="sub" data-r="goal">—</div>
				</div>
				<button class="tb-mn-mine" data-a="mine">⛏ ДОБЫТЬ</button>
			</div>
			<div class="tb-mn-bot">
				<button data-a="rig"  data-r="bRig">🖥 <span data-r="rRig">25</span></button>
				<button data-a="cpower" data-r="bCp">💪 <span data-r="rCp">15</span></button>
				<button data-a="mineLv" data-r="bMl">⛏ <span data-r="rMl">40</span></button>
				<button data-a="crit"   data-r="bCr">🎲 <span data-r="rCr">80</span></button>
				<button class="shop" data-a="shop">⚙ МАГАЗИН</button>
			</div>
		</div>

		<!-- ЭКРАН 2: магазин -->
		<div class="tb-shop" data-r="shop">
			<div class="tb-shop-top">
				<span class="t">⚙ МАГАЗИН</span>
				<span style="font-size:9px;color:#8a6a72">💰 <b style="color:#ff4466" data-r="shopTok">0</b></span>
				<button class="back" data-a="back">← НАЗАД</button>
			</div>
			<div class="tb-shop-list" data-r="list"></div>
		</div>
	`;
	const q = s => el.querySelector('[data-r="' + s + '"]');
	const rTok = q("tok"), rEarned = q("earned"), rInc = q("inc"),
	      rPw = q("pw"), rMeter = q("meter"), rGoal = q("goal"),
	      rShopTok = q("shopTok"), rList = q("list");
	const main = q("main"), shop = q("shop");
	const bMine = el.querySelector('[data-a="mine"]');

	// кнопки на главном
	const bRig = q("bRig"), bCp = q("bCp"), bMl = q("bMl"), bCr = q("bCr");
	const rRig = q("rRig"), rCp = q("rCp"), rMl = q("rMl"), rCr = q("rCr");

	const fmt = n => {
		n = Math.floor(n);
		if (n < 1000) return String(n);
		const units = [
			[1e3, "K"], [1e6, "M"], [1e9, "B"], [1e12, "T"],
			[1e15, "Qa"], [1e18, "Qi"], [1e21, "Sx"], [1e24, "Sp"],
			[1e27, "Oc"], [1e30, "No"], [1e33, "Dc"], [1e36, "UDc"],
			[1e39, "DDc"], [1e42, "TDc"]
		];
		for (let i = units.length - 1; i >= 0; i--) {
			const [v, s] = units[i];
			if (n >= v) return (n / v).toFixed(2).replace(/\.?0+$/, "") + s;
		}
		return String(n);
	};

	const toast = (txt, sub) => {
		el.querySelectorAll(".tb-toast").forEach(n => n.remove());
		const t = document.createElement("div");
		t.className = "tb-toast";
		t.innerHTML = txt + (sub ? "<small>" + sub + "</small>" : "");
		el.appendChild(t);
		setTimeout(() => t.remove(), 2500);
	};

	const canBuy = p => TB_MINER.tok >= p;

	// построение списка магазина
	const buildShop = () => {
		const m = TB_MINER;
		const items = [
			{ a: "rig",    ic: "🖥", nm: "ФЕРМА",          p: tbRigPrice(),     lv: "ур. " + m.rigs + " · +" + (0.5 * tbPrestigeMult()).toFixed(1) + "/с" },
			{ a: "cpower", ic: "💪", nm: "СИЛА КЛИКА",     p: tbCpowerPrice(),  lv: "ур. " + m.cpower + " · x" + m.cpower },
			{ a: "mineLv", ic: "⛏", nm: "РУЧНАЯ ДОБЫЧА",  p: tbMineLvPrice(),  lv: "ур. " + m.mineLv + " · x" + m.mineLv },
			{ a: "crit",   ic: "🎲", nm: "КРИТ",           p: tbCritPrice(),    lv: m.crit + "% · x5 урон", dis: m.crit >= 100 },
		];
		let html = "";
		items.forEach(it => {
			const can = canBuy(it.p) && !it.dis;
			html += `<button class="tb-item${can ? " can" : ""}" data-a="${it.a}"${can ? "" : " disabled"}>
				<span class="ic">${it.ic}</span>
				<span class="info">
					<span class="nm">${it.nm}</span>
					<span class="pr">${fmt(it.p)} G-T</span>
					<span class="lv">${it.lv}</span>
				</span>
			</button>`;
		});
		// престиж
		const canP = tbCanPrestige();
		html += `<button class="tb-item pres${canP ? " can" : ""}" data-a="prestige"${canP ? "" : " disabled"}>
			<span class="ic">🔥</span>
			<span class="info">
				<span class="nm">ПРЕСТИЖ</span>
				<span class="pr">${canP ? "ГОТОВ!" : "НУЖНО " + fmt(TB_PRESTIGE_MIN)}</span>
				<span class="lv">x${(1 + TB_MINER.prestige * 0.5).toFixed(1)} → x${(1 + (TB_MINER.prestige + 1) * 0.5).toFixed(1)}</span>
			</span>
		</button>`;
		// вехи
		html += `<div style="font-size:8px;color:#8a6a72;letter-spacing:.2em;margin:3px 0 1px;padding:0 2px">ВЕХИ</div>`;
		TB_MILES.forEach((ml, i) => {
			const done = i < m.mile;
			html += `<div class="tb-mile${done ? " done" : ""}">
				<span class="ic">${done ? "★" : "○"}</span>
				<span class="nm">${ml[1]}</span>
				<span class="th">${fmt(ml[0])}</span>
			</div>`;
		});
		rList.innerHTML = html;
	};

	const paint = () => {
		const m = TB_MINER;
		const goal = TB_MILES[m.mile];
		const prev = m.mile ? TB_MILES[m.mile - 1][0] : 0;

		// главный экран
		rInc.textContent = fmt(tbIncome());
		rEarned.textContent = fmt(m.earned);
		rPw.textContent = "x" + tbPrestigeMult().toFixed(1);
		rTok.textContent = fmt(m.tok);
		rGoal.textContent = goal ? "→ " + goal[1] : "ВСЁ ПРОЙДЕНО";
		rMeter.style.transform = "scaleX(" +
			(goal ? Math.max(0, Math.min(1, (m.tok - prev) / (goal[0] - prev))) : 1) + ")";

		// кнопки апгрейдов
		const rigP = tbRigPrice(); rRig.textContent = fmt(rigP);
		bRig.classList.toggle("can", canBuy(rigP)); bRig.disabled = !canBuy(rigP);

		const cpP = tbCpowerPrice(); rCp.textContent = fmt(cpP);
		bCp.classList.toggle("can", canBuy(cpP)); bCp.disabled = !canBuy(cpP);

		const mlP = tbMineLvPrice(); rMl.textContent = fmt(mlP);
		bMl.classList.toggle("can", canBuy(mlP)); bMl.disabled = !canBuy(mlP);

		const crP = tbCritPrice(); rCr.textContent = fmt(crP);
		bCr.classList.toggle("can", canBuy(crP) && m.crit < 100);
		bCr.disabled = !canBuy(crP) || m.crit >= 100;

		// магазин
		rShopTok.textContent = fmt(m.tok);
		if (shop.classList.contains("on")) buildShop();
	};

	// добыча
	bMine.addEventListener("click", () => {
		let gain = tbClickPower();
		let crit = false;
		if (TB_MINER.crit > 0 && Math.random() * 100 < TB_MINER.crit) { gain *= 5; crit = true; }
		TB_MINER.tok += gain;
		TB_MINER.earned += gain;
		TB_MINER.clicks++;
		if (crit) {
			toast("💥 КРИТ! +" + fmt(gain));
			el.classList.add("tb-flash");
			setTimeout(() => el.classList.remove("tb-flash"), 260);
		}
		tbMinerCheck();
		tbMinerSave();
		paint();
	});

	// делегирование кликов по главному + магазину
	el.addEventListener("click", e => {
		const btn = e.target.closest("[data-a]");
		if (!btn) return;
		const a = btn.dataset.a;

		if (a === "shop") {
			main.classList.remove("on");
			shop.classList.add("on");
			buildShop();
			return;
		}
		if (a === "back") {
			shop.classList.remove("on");
			main.classList.add("on");
			paint();
			return;
		}

		let bought = false;
		if (a === "rig") {
			const p = tbRigPrice();
			if (canBuy(p)) { TB_MINER.tok -= p; TB_MINER.rigs++; bought = true; }
		} else if (a === "cpower") {
			const p = tbCpowerPrice();
			if (canBuy(p)) { TB_MINER.tok -= p; TB_MINER.cpower++; bought = true; }
		} else if (a === "mineLv") {
			const p = tbMineLvPrice();
			if (canBuy(p)) { TB_MINER.tok -= p; TB_MINER.mineLv++; bought = true; }
		} else if (a === "crit") {
			const p = tbCritPrice();
			if (canBuy(p) && TB_MINER.crit < 100) { TB_MINER.tok -= p; TB_MINER.crit += 5; bought = true; }
		} else if (a === "prestige") {
			if (tbMinerPrestige()) {
				toast("🔥 ПРЕСТИЖ!", "x" + (1 + TB_MINER.prestige * 0.5).toFixed(1) + " сила");
				bought = true;
			}
		}
		if (bought) {
			tbMinerSave();
			paint();
			if (shop.classList.contains("on")) buildShop();
		}
	});

	tbMinerUI = { el, api, paint, toast };
	paint();
	api.frame(() => {}, { fps: 4 });
} },

{ id: "fx", icon: "✦", title: "ЭФФЕКТЫ", make(el, api) {
	const box = document.createElement("div");
	box.className = "tb-fxg";
	el.appendChild(box);
	const btns = TB_SWITCHES.map(s => {
		const b = document.createElement("button");
		b.className = "tb-btn";
		b.addEventListener("click", () => { tbFx(s.id, !tbFxIs(s.id)); sync(); });
		box.appendChild(b);
		return [s, b];
	});
	function sync() { btns.forEach(([s, b]) => { const on = tbFxIs(s.id); b.classList.toggle("on", on); b.textContent = (on ? "■ " : "□ ") + s.title; }); }
	sync();
} },
];

/* ── сборка баннера ── */
let tbCur = null; // выбранная вкладка; при открытии сайта выбирается случайно и живёт до перезагрузки

function tbApi(def, pn) {
	return {
		frame: (fn, opt) => tbJob(pn, fn, opt),
		get: (k, d) => tbGet(def.id + "." + k, d),
		set: (k, v) => tbSet(def.id + "." + k, v),
		say: t => tbPop(pn.parentNode, t),
		mouse: () => ({ x: tbMX, y: tbMY }),
		pos: node => tbPos(node)
	};
}

function tbBuild(root) {
	const tabs = root.querySelector(".tb-tabs"), stage = root.querySelector(".tb-stage");
	if (!tabs || !stage || tabs.dataset.b || !TB_PANELS.length) return;
	tabs.dataset.b = "1";
	if (!tbCur || !TB_PANELS.some(p => p.id === tbCur)) tbCur = TB_PANELS[(Math.random() * TB_PANELS.length) | 0].id;
	const els = {};
	function go(id) {
		tbCur = id;
		for (const k in els) {
			const o = els[k], on = k === id;
			o.tab.classList.toggle("on", on);
			o.pn.classList.toggle("on", on);
			if (on && !o.made) {
				o.made = true; // панель создаётся только когда её открыли
				try { o.def.make(o.pn, tbApi(o.def, o.pn)); }
				catch (err) { o.pn.innerHTML = '<div class="tb-err">PANEL ERROR: ' + String(err && err.message || err) + '</div>'; console.warn("[TB]", err); }
			}
		}
	}
	TB_PANELS.forEach(def => {
		const tab = document.createElement("button");
		tab.className = "tb-tab"; tab.title = def.title; tab.textContent = def.icon + " " + def.title;
		const pn = document.createElement("div");
		pn.className = "tb-pn";
		tabs.appendChild(tab); stage.appendChild(pn);
		els[def.id] = { def, tab, pn, made: false };
		tab.addEventListener("click", e => { e.stopPropagation(); go(def.id); });
	});
	go(tbCur);
}
function tbRebuild() {
	const r = document.getElementById("tb-root"); if (!r) return;
	const t = r.querySelector(".tb-tabs"), s = r.querySelector(".tb-stage");
	if (!t || !s) return;
	t.innerHTML = ""; s.innerHTML = ""; delete t.dataset.b;
	tbBuild(r);
}
window.TB_PANELS = TB_PANELS;
window.TB_SWITCHES = TB_SWITCHES;
window.TB_ADD_PANEL = def => {
	const i = TB_PANELS.findIndex(p => p.id === def.id);
	if (i >= 0) TB_PANELS[i] = def; else TB_PANELS.push(def);
	tbRebuild();
};

/* ── «дождь» по бокам: строки генерируются один раз ── */
const tbRainText = fn => { const a = []; for (let i = 0; i < 40; i++) a.push(fn(i)); const s = a.join("\n"); return s + "\n" + s; };
const tbRainG = tbRainText(i => "N" + String(100 + i * 10).padStart(4, "0") + " " + ["G0", "G1", "G1", "G2", "M3", "M5"][(Math.random() * 6) | 0] + " X" + (Math.random() * 90).toFixed(2) + " Y" + (Math.random() * 90).toFixed(2));
const tbRainH = tbRainText(i => "0x" + (i * 16).toString(16).toUpperCase().padStart(4, "0") + "  " + Array.from({ length: 4 }, () => ((Math.random() * 256) | 0).toString(16).toUpperCase().padStart(2, "0")).join(" ") + "  " + ["GOLU", "WATCH", "SIGTERM", "0xDEAD", "CORE", "ERR_"][(Math.random() * 6) | 0]);

/* ── подзаголовок ── */
const TB_SUBS = ["ТЕХНО-РЕЛИГИЯ · ЦИФРОВОЙ БОГ GOLU", "ЕДИНАЯ ТОЧКА СБОРКИ", "НЕСУЩЕСТВУЮЩАЯ ПОТЕРЯННАЯ ИГРА", "SIGTERM = БОЛЬ", "GOLU НАБЛЮДАЕТ", "СИСТЕМА РАБОТАЕТ ИЛИ ПАДАЕТ КРАСИВО"];
function tbScramble(node, to) {
	const ch = "▓▒░#@%&01"; let i = 0;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		i++;
		const n = Math.floor(to.length * i / 14);
		let s = to.slice(0, n);
		for (let k = n; k < to.length; k++) s += ch[(Math.random() * ch.length) | 0];
		node.textContent = i >= 14 ? to : s;
		if (i >= 14) clearInterval(iv);
	}, 45);
}
let tbSubI = 0;
setInterval(() => {
	if (document.hidden) return;
	const n = document.getElementById("tb-sub"); if (!n) return;
	tbSubI = (tbSubI + 1) % TB_SUBS.length;
	tbScramble(n, TB_SUBS[tbSubI]);
}, 9000);
setInterval(() => {
	if (document.hidden) return;
	const w = document.querySelector("#tb-root .tb-word"); if (!w) return;
	w.classList.add("hit"); setTimeout(() => w.classList.remove("hit"), 260);
}, 7000);

/* ── текущая страница: «где мы» + подсветка кнопки меню ── */
function tbMark() {
	const root = document.getElementById("tb-root"); if (!root) return;
	const id = (location.hash || "").replace(/^#/, "");
	const w = document.getElementById("tb-where");
	if (w) w.textContent = (window.PAGES && window.PAGES[id] && window.PAGES[id].t) || id || "MAIN";
	root.querySelectorAll(".category_button").forEach(b => {
		const m = (b.getAttribute("onclick") || "").match(/OPEN_PAGE\('([^']*)'\)/);
		const bid = m ? m[1] : ((b.getAttribute("onclick") || "").indexOf("OPEN_PAGE()") >= 0 ? "" : null);
		b.classList.toggle("on", bid !== null && (bid === id || (bid === "" && (id === "" || id === "main"))));
	});
}
window.addEventListener("hashchange", () => setTimeout(tbMark, 0));

function tbFit() {
	const r = document.getElementById("tb-root");
	if (r) document.documentElement.style.setProperty("--tb-h", r.offsetHeight + "px");
}
window.addEventListener("resize", tbFit);

function tbMount() {
	const root = document.getElementById("tb-root");
	if (!root || root.dataset.m) return;
	root.dataset.m = "1";
	root.querySelectorAll("[data-rain]").forEach(n => { n.textContent = n.dataset.rain === "g" ? tbRainG : tbRainH; });
	const word = root.querySelector(".tb-word");
	if (word) word.addEventListener("click", () => { word.classList.add("hit"); setTimeout(() => word.classList.remove("hit"), 300); });
	tbBuild(root);
	tbMark(); setTimeout(tbMark, 60);
	tbFit();
}
{
	const bodyEl = document.getElementById("BODY");
	if (bodyEl) new MutationObserver(tbMount).observe(bodyEl, { childList: true });
	tbMount();
}

/* ═══════════════ ЗАПУСК ═══════════════ */
intro();
setTimeout(loop, 12000);   // случайные события начинаются через 12 сек

})();