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
	"PAGE_artsai.js",
	"PAGE_videos.js",
	"PAGE_alchemy.js",
	"PAGE_typing.js",
	"PAGE_litris.js",
	"PAGE_clicker.js",
	"PAGE_manifest.js",
	"PAGE_explorer.js",
];

const TOP_NAV = [
	["OPEN_PAGE('not-exist');", "&lt;@&gt;"],
	["OPEN_PAGE();",            "MAIN.html"],
	["OPEN_PAGE('manifest');",  "⭐ MAN1FEST ⭐"],
	["CORES 📀", [
		["OPEN_PAGE('golu');", "🟥 GOLU"],
		["OPEN_PAGE('sranspang');", "SRANSPONG 🟨"],
		["OPEN_PAGE('pavpis');", "🟩 PAVELPISTV"],
		["OPEN_PAGE('crybird');", "CRYBIRD 🟦"],
	]],
	["ART-WORKS 🎨", [
		["OPEN_PAGE('artsreal');", "[1MAGES]"],
		["OPEN_PAGE('artsai');",   "&lt;AI&gt;"],
		["OPEN_PAGE('videos');",   "{V1D1O}"],
	]],
	["GAMES 🎮", [
		["OPEN_PAGE('alchemy');", "⚗ ALCHEMY ⚗"],
		["OPEN_PAGE('typing');", "⌨ TYPE ⌨"],
		["OPEN_PAGE('litris');", "🧱 LITRIS 🧱"],
		["OPEN_PAGE('clicker');", "💎 MINER 💎"],
		["OPEN_PAGE('trash');", "👾 GOLUWorld 👾"],
	]],
	["OPEN_PAGE('database');",  "DATABASE 🔩"],
	["OPEN_PAGE('portal');",    "P0RTAL 🌌"],
	["OPEN_RANDOM_PAGE();",     "&lt;💮&gt;"],
];

function SITE_BASE(content){
	return `${ELEMENT_SITETOP}${content}${ELEMENT_SITEBOTTOM}`;
}

function OPEN_RANDOM_PAGE(){
	const Pages = Object.keys(PAGES)
	if(Pages.length === 0){ return }
	OPEN_PAGE(Pages[Math.floor(Math.random() * Pages.length)])
}

function ERROR_PAGE(id){
	const esc = s => String(s).replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");
	const raw = String(id == null ? "" : id);
	let shown = raw; try { shown = decodeURIComponent(raw); } catch (e) {}
	if (shown.length > 80) shown = shown.slice(0, 80) + "…";
	const sid = esc(shown) || "(пусто)";
	const unit = "ERROR · СТРАНИЦА НЕ НАЙДЕНА · GOLU ЗАПИСАЛ ПОПЫТКУ · ".repeat(6);
	const unit2 = "⚠ KERNEL PANIC · 0xE404 · SIGTERM = БОЛЬ · ".repeat(6);

	const css = `
	#er-root{ display:block; position:relative; overflow:hidden; color:#e8d9b0; font-family:'Courier New',Consolas,monospace; }
	#er-root *{ box-sizing:border-box; }
	#er-root::after{ content:""; position:absolute; inset:0; z-index:5; pointer-events:none; background:repeating-linear-gradient(0deg,rgba(0,0,0,.2) 0 1px,transparent 1px 3px); }
	#er-root button{ background:#12060c; background-image:none; border:1px solid #7a0022; border-radius:0; color:#e8d9b0; font:13px/1 'Courier New',Consolas,monospace; font-weight:normal; letter-spacing:.1em; padding:11px 16px; box-shadow:none; backdrop-filter:none; text-shadow:none; transition:color .15s,background-color .15s,border-color .15s,transform .15s; }
	#er-root button:hover{ background:#7a0022; color:#fff; border-color:#ff0044; transform:translateY(-2px); }
	#er-root button.gold{ border-color:#d4af37; color:#d4af37; }
	#er-root button.gold:hover{ background:#d4af37; color:#050003; }

	.er-tape{ overflow:hidden; white-space:nowrap; height:22px; line-height:22px; font-size:12px; letter-spacing:.3em; }
	.er-tape span{ display:inline-block; will-change:transform; animation:er-mq 40s linear infinite; }
	.er-t1{ background:#990000; color:#050003; font-weight:bold; }
	.er-t2{ background:#0a0206; color:#ff0044; border-top:2px solid #990000; }
	.er-t2 span{ animation-direction:reverse; }
	@keyframes er-mq{ to{ transform:translateX(-50%); } }

	.er-wrap{ position:relative; z-index:2; padding:26px 28px 36px; }
	.er-kick{ font-size:12px; letter-spacing:.3em; color:#ff0044; margin-bottom:14px; animation:er-blink 1.2s steps(2) infinite; }
	@keyframes er-blink{ 50%{ opacity:.35; } }

	.er-hero{ display:grid; grid-template-columns:auto minmax(0,1fr); gap:34px; align-items:center; }
	.er-big{ position:relative; font-size:clamp(96px,17vw,230px); font-weight:bold; line-height:.9; letter-spacing:.04em; color:#e8d9b0; text-shadow:0 0 26px #ff0044,0 0 4px #7a0022; cursor:pointer; user-select:none; }
	.er-big::before,.er-big::after{ content:attr(data-text); position:absolute; left:0; top:0; pointer-events:none; clip-path:inset(0 0 100% 0); }
	.er-big::before{ color:#00e5ff; animation:er-g1 2.6s steps(1) infinite; }
	.er-big::after{ color:#ff0044; animation:er-g2 2.1s steps(1) infinite; }
	.er-big.hit::before{ animation-duration:.18s; }
	.er-big.hit::after{ animation-duration:.14s; }
	@keyframes er-g1{ 0%{clip-path:inset(0 0 100% 0)} 8%{clip-path:inset(12% 0 68% 0);transform:translateX(-9px)} 11%{clip-path:inset(0 0 100% 0);transform:none} 52%{clip-path:inset(55% 0 20% 0);transform:translateX(7px)} 55%{clip-path:inset(0 0 100% 0);transform:none} 86%{clip-path:inset(30% 0 50% 0);transform:translateX(-5px)} 88%{clip-path:inset(0 0 100% 0);transform:none} }
	@keyframes er-g2{ 0%{clip-path:inset(0 0 100% 0)} 20%{clip-path:inset(60% 0 10% 0);transform:translateX(10px)} 23%{clip-path:inset(0 0 100% 0);transform:none} 64%{clip-path:inset(5% 0 80% 0);transform:translateX(-8px)} 66%{clip-path:inset(0 0 100% 0);transform:none} 90%{clip-path:inset(40% 0 40% 0);transform:translateX(6px)} 92%{clip-path:inset(0 0 100% 0);transform:none} }

	.er-h1{ margin:0; font-size:clamp(22px,3.2vw,42px); letter-spacing:.14em; color:#e8d9b0; text-shadow:0 0 14px #ff0044; }
	.er-from{ margin-top:8px; font-size:15px; letter-spacing:.2em; color:#8a6a72; }
	.er-id{ display:inline-block; max-width:100%; margin-left:6px; padding:3px 10px; border:1px solid #d4af37; background:rgba(212,175,55,.08); color:#d4af37; letter-spacing:.06em; word-break:break-all; vertical-align:middle; }
	.er-lead{ margin-top:16px; font-size:14px; line-height:1.7; color:#d9c9a0; max-width:640px; }
	.er-cta{ display:flex; flex-wrap:wrap; gap:10px; margin-top:20px; }

	.er-h{ display:flex; align-items:center; gap:12px; margin:30px 0 12px; font-size:14px; letter-spacing:.3em; color:#d4af37; }
	.er-h::before{ content:"▌"; color:#ff0044; }
	.er-h::after{ content:""; flex:1; height:1px; background:linear-gradient(to right,#7a0022,transparent); }

	.er-two{ display:grid; grid-template-columns:minmax(0,1.3fr) minmax(0,1fr); gap:16px; }
	.er-card{ position:relative; background:#0b0508; border:1px solid #2a0a14; padding:12px 14px; font-size:12.5px; line-height:1.65; }
	.er-card::before{ content:""; position:absolute; right:4px; top:4px; width:10px; height:10px; border:solid #d4af37; border-width:2px 2px 0 0; pointer-events:none; }
	.er-boot{ min-height:150px; color:#7aff9a; white-space:pre-wrap; word-break:break-all; }
	.er-boot div{ animation:er-line .25s backwards; }
	.er-boot .hl{ color:#d4af37; } .er-boot .rd{ color:#ff0044; }
	@keyframes er-line{ from{ opacity:0; transform:translateX(-8px); } }
	.er-caret{ display:inline-block; width:8px; height:14px; background:#7aff9a; vertical-align:-2px; animation:er-blink .9s steps(2) infinite; }
	.er-regs{ display:grid; grid-template-columns:1fr 1fr; gap:2px 14px; color:#b89a5a; }
	.er-regs b{ color:#ff0044; font-weight:normal; }
	.er-hex{ margin:10px 0 0; padding:8px 0 0; border-top:1px dashed #2a0a14; color:#6a4a55; white-space:pre; overflow:hidden; font-size:11.5px; line-height:1.5; }
	.er-hex i{ font-style:normal; color:#d4af37; }

	.er-fix{ display:flex; align-items:center; gap:14px; flex-wrap:wrap; }
	.er-bar{ flex:1; min-width:200px; height:12px; background:#1a0710; border:1px solid #3a1020; overflow:hidden; }
	.er-bar i{ display:block; width:100%; height:100%; background:#d4af37; transform-origin:left; transform:scaleX(0); }
	.er-bar.bad i{ background:#ff0044; }
	.er-pct{ width:44px; text-align:right; color:#d4af37; }
	.er-st{ width:100%; font-size:12.5px; letter-spacing:.1em; color:#8a6a72; min-height:18px; }
	.er-st.bad{ color:#ff0044; }

	.er-sug{ display:flex; flex-wrap:wrap; gap:10px; }
	.er-chip{ min-width:160px; text-align:left; }
	.er-chip small{ display:block; margin-top:5px; font-size:10px; letter-spacing:.15em; color:#8a6a72; }
	.er-note{ font-size:12px; color:#8a6a72; margin-bottom:10px; }
	.er-stat{ display:flex; flex-wrap:wrap; gap:26px; font-size:12.5px; color:#8a6a72; }
	.er-stat b{ color:#e8d9b0; font-weight:normal; }

	@media (max-width:900px){ .er-hero,.er-two{ grid-template-columns:1fr; } .er-wrap{ padding:16px; } }
	`;

	const html = `<div id="er-root"><style>${css}</style>
	<div class="er-tape er-t1"><span>${unit}${unit}</span></div>
	<div class="er-wrap">
		<div class="er-kick">▓ KERNEL PANIC · СТРАНИЦА НЕ ЗАГРУЖЕНА</div>
		<div class="er-hero">
			<div class="er-big" id="er-big" data-text="404">404</div>
			<div>
				<h1 class="er-h1">FAILED LOAD WEBSITE</h1>
				<div class="er-from">FROM ID <span class="er-id">"${sid}"</span></div>
				<div class="er-lead">Такой страницы в Lituism нет. Её не создали, стёрли или ты свернул не туда. GOLU уже записал эту попытку.</div>
				<div class="er-cta">
					<button class="gold" onclick="OPEN_PAGE();">⌂ НА ГЛАВНУЮ</button>
					<button onclick="OPEN_PAGE('database');">🔩 В БАЗУ ДАННЫХ</button>
					<button onclick="OPEN_RANDOM_PAGE();">💮 СЛУЧАЙНО</button>
				</div>
			</div>
		</div>

		<div class="er-h">ДАМП СБОЯ</div>
		<div class="er-two">
			<div class="er-card"><div class="er-boot" id="er-boot"></div></div>
			<div class="er-card"><div class="er-regs" id="er-regs"></div><div class="er-hex" id="er-hex"></div></div>
		</div>

		<div class="er-h">ВОССТАНОВЛЕНИЕ</div>
		<div class="er-card er-fix">
			<div class="er-bar" id="er-bar"><i id="er-fill"></i></div>
			<div class="er-pct" id="er-pct">0%</div>
			<button id="er-retry">↻ ПОПРОБОВАТЬ СНОВА</button>
			<div class="er-st" id="er-st">ВОССТАНОВЛЕНИЕ…</div>
		</div>

		<div class="er-h">ВОЗМОЖНО, ТЫ ИСКАЛ</div>
		<div class="er-note" id="er-note"></div>
		<div class="er-sug" id="er-sug"></div>

		<div class="er-h">СТАТИСТИКА ПУСТОТЫ</div>
		<div class="er-card er-stat" id="er-stat"></div>
	</div>
	<div class="er-tape er-t2"><span>${unit2}${unit2}</span></div>
	</div>`.replace(/\n\t*/g, "");

	const live = function(){
		const root = document.getElementById("er-root");
		if (!root) return;
		const $ = s => root.querySelector(s);
		const alive = () => root.isConnected;
		const pick = a => a[(Math.random() * a.length) | 0];
		const fnv = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
		const P = window.PAGES || {};
		const hex8 = n => n.toString(16).toUpperCase().padStart(8, "0");

		// счётчик пустых адресов (OPEN_PAGE зовётся дважды на навигацию, поэтому защита от дубля)
		const key = shown.toLowerCase();
		const now = Date.now();
		let S = window.__erSt;
		let log = {};
		try { log = JSON.parse(localStorage.getItem("er_log") || "{}") || {}; } catch (e) {}
		if (!S || S.k !== key || now - S.t > 1500) {
			const r = log[key] || { n: 0, first: now };
			r.n++; r.last = now; log[key] = r;
			const ks = Object.keys(log);
			if (ks.length > 60) { ks.sort((a, b) => log[a].last - log[b].last); for (let i = 0; i < ks.length - 60; i++) delete log[ks[i]]; }
			try { localStorage.setItem("er_log", JSON.stringify(log)); } catch (e) {}
			S = window.__erSt = { k: key, t: now };
		} else S.t = now;
		const me = log[key] || { n: 1, first: now, last: now };
		const total = Object.keys(log).length;
		const fmt = t => new Date(t).toLocaleString("ru-RU");

		$("#er-stat").innerHTML =
			'<div>ПОПЫТОК ОТКРЫТЬ ЭТОТ АДРЕС: <b>' + me.n + '</b></div>' +
			'<div>ПЕРВАЯ: <b>' + fmt(me.first) + '</b></div>' +
			'<div>ВСЕГО ПУСТЫХ АДРЕСОВ: <b>' + total + '</b></div>';

		// код ошибки и регистры из хеша адреса (одинаковые для одного адреса)
		const code = hex8(fnv(shown)).slice(0, 4);
		const regs = ["EAX", "EBX", "ECX", "EDX", "ESI", "EDI", "EIP", "ESP"];
		$("#er-regs").innerHTML = regs.map((r, i) => "<div>" + r + " <b>" + hex8(fnv(shown + r + i)) + "</b></div>").join("");

		// hex-дамп самого адреса
		let bytes = []; try { bytes = Array.from(new TextEncoder().encode(shown)).slice(0, 24); } catch (e) {}
		let hx = "";
		for (let o = 0; o < Math.max(bytes.length, 1); o += 8) {
			const ch = bytes.slice(o, o + 8);
			hx += "<i>" + o.toString(16).toUpperCase().padStart(4, "0") + "</i>  "
				+ ch.map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" ").padEnd(23, " ") + "  "
				+ ch.map(b => b >= 32 && b < 127 ? String.fromCharCode(b).replace("<", "·").replace("&", "·") : "·").join("") + "\n";
		}
		$("#er-hex").innerHTML = bytes.length ? hx : "<i>0000</i>  (адрес пуст)";

		const QUOTES = [
			"ЭТОЙ СТРАНИЦЫ НЕТ. ИЛИ ОНА БЫЛА, НО Я ЕЁ СТЁР.",
			"ТЫ ИЩЕШЬ ТО, ЧЕГО НЕТ. ОБЫЧНОЕ ДЕЛО.",
			"ЭТО НЕ БАГ. ЭТО ПУСТОТА.",
			"Я ЗАПОМНИЛ, ЧТО ТЫ СЮДА ПРИШЁЛ.",
			"ТУТ НИЧЕГО НЕТ. ИЛИ ЕСТЬ. НЕ СКАЖУ.",
		];
		const BOOT = [
			['> OPEN_PAGE("' + shown + '")'],
			['> PAGES["' + shown + '"] → undefined', "rd"],
			["> ПОИСК В L-KERNEL ... НЕ НАЙДЕНО"],
			["> КОД ОШИБКИ: 0xE" + code, "hl"],
			["> GOLU: «" + pick(QUOTES) + "»", "rd"],
			["> ПОПЫТКА №" + me.n + " ДЛЯ ЭТОГО АДРЕСА"],
			["> СИСТЕМА ЖДЁТ ТВОЕГО РЕШЕНИЯ_"],
		];
		const boot = $("#er-boot");
		const add = l => { const d = document.createElement("div"); if (l[1]) d.className = l[1]; d.textContent = l[0]; boot.appendChild(d); };
		let bi = 0;
		const step = () => {
			if (!alive()) return;
			if (bi < BOOT.length) { add(BOOT[bi++]); setTimeout(step, 170 + Math.random() * 240); }
			else { const c = document.createElement("span"); c.className = "er-caret"; boot.appendChild(c); }
		};
		step();

		// полоса восстановления: всегда застревает
		const FAILS = [
			"ОШИБКА: ФАЙЛ СТЁРТ GOLU",
			"ОШИБКА: СЕКТОР ПУСТ",
			"ОШИБКА: ТАКОЙ СТРАНИЦЫ НИКОГДА НЕ БЫЛО",
			"ОШИБКА: ДОСТУП ЗАПРЕЩЁН. КЕМ — НЕ СКАЖУ",
			"ОШИБКА: ВОССТАНОВЛЕНИЕ САМО ПОВРЕЖДЕНО",
		];
		const bar = $("#er-bar"), fill = $("#er-fill"), pct = $("#er-pct"), st = $("#er-st"), rb = $("#er-retry");
		let running = false, iv = 0;
		const repair = () => {
			if (running) return;
			running = true; clearInterval(iv);
			let p = 0; const stall = 38 + Math.random() * 59;
			bar.classList.remove("bad"); st.classList.remove("bad"); st.textContent = "ВОССТАНОВЛЕНИЕ…";
			iv = setInterval(() => {
				if (!alive()) { clearInterval(iv); return; }
				p += 0.8 + Math.random() * 2.6;
				if (p >= stall) {
					p = stall; clearInterval(iv); running = false;
					bar.classList.add("bad"); st.classList.add("bad"); st.textContent = pick(FAILS);
				}
				fill.style.transform = "scaleX(" + (p / 100) + ")";
				pct.textContent = Math.floor(p) + "%";
			}, 110);
		};
		rb.addEventListener("click", repair);
		setTimeout(repair, 900);

		// подсказки: ближайшие по написанию ключи страниц, иначе случайные
		const lev = (a, b) => {
			const m = a.length, n = b.length, d = [];
			for (let i = 0; i <= m; i++) d[i] = [i];
			for (let j = 1; j <= n; j++) d[0][j] = j;
			for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
				d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
			return d[m][n];
		};
		const keys = Object.keys(P).filter(k => k !== "" && k !== "main");
		let near = [];
		if (key) {
			near = keys.map(k => {
				const kk = k.toLowerCase();
				let d = lev(key, kk);
				if (kk.indexOf(key) >= 0 || key.indexOf(kk) >= 0) d = Math.min(d, 1);
				return { k, d };
			}).filter(o => o.d <= Math.max(2, Math.floor(key.length / 2))).sort((a, b) => a.d - b.d).slice(0, 4);
		}
		let list, note;
		if (near.length) { list = near.map(o => o.k); note = "ПОХОЖИЕ НА «" + shown + "»:"; }
		else { list = keys.slice().sort(() => Math.random() - 0.5).slice(0, 4); note = "ПОХОЖИХ НЕТ. ВОТ СЛУЧАЙНЫЕ ДВЕРИ:"; }
		$("#er-note").textContent = note;
		const sug = $("#er-sug");
		if (!list.length) sug.textContent = "—";
		list.forEach(k => {
			const b = document.createElement("button");
			b.className = "er-chip";
			const t = document.createElement("div"); t.textContent = "▶ " + k;
			const s = document.createElement("small"); s.textContent = (P[k] && P[k].t) || "";
			b.appendChild(t); b.appendChild(s);
			b.addEventListener("click", () => { try { OPEN_PAGE(k); } catch (e) {} });
			sug.appendChild(b);
		});

		// клики по большому коду
		const big = $("#er-big");
		let clicks = 0;
		big.addEventListener("click", () => {
			big.classList.add("hit"); setTimeout(() => big.classList.remove("hit"), 350);
			clicks++;
			if (clicks === 5) add(["> ТЫ НЕ МОЖЕШЬ ЭТО ПОЧИНИТЬ", "rd"]);
			if (clicks === 10) { add(["> ХВАТИТ. Я ПОЗОВУ ЕГО.", "rd"]); try { if (window.GOLU_VISIT) window.GOLU_VISIT(); } catch (e) {} }
			while (boot.childNodes.length > 14) boot.removeChild(boot.firstChild);
		});
		const hitT = setInterval(() => {
			if (!alive()) { clearInterval(hitT); return; }
			if (document.hidden) return;
			big.classList.add("hit"); setTimeout(() => big.classList.remove("hit"), 220);
		}, 4800);
	};

	return { c: SITE_BASE(html), t: "ERR_0xE404", f: live };
}

/* Открыть страницу */
function OPEN_PAGE(id = ""){
	HASH = id;

	var page = PAGES[id];
	if(!page){ page = ERROR_PAGE(id); }
	var content = page["c"];
	var title   = page["t"];
	SETBODY_CONTENT(content);
	window.location.hash = id;
	document.title = `𓆩 ${title} 𓆪`;
	
	var autoplay = document.getElementById("AUTOPLAY");
	if(autoplay && ENABLE_AUTOPLAY){ autoplay.volume = 0.25; autoplay.play(); }
	
	var ID_LABEL = document.getElementById("ID");
	if(ID_LABEL){ ID_LABEL.innerText = id; }
	
	function prikol(){
		var bgs = [
			"bg.png","bg2.png","bg3.png","bg4.png","bg5.png","bg6.png","bg7.png","bg8.png","bg9.png","bg10.png","bg11.png","bg12.png","bg13.png"
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
				pointer-events: none;         /* ← ДОБАВИТЬ ЭТУ СТРОКУ */
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

	// шапка и подвал живут внутри BODY и переживают смену страницы
	const keep = Array.from(BODY.querySelectorAll(":scope > [data-keep]"));
	BODY.innerHTML = FUNC_REPLACE_TAGS(newcontent);
	keep.forEach(n => BODY.appendChild(n));
}

/* ============================================== */

function ELEMENT_TITLE(){
	const LIT_BODY_SRC = "../source/god.png";
	var LIT_BODY = "";
	for(var i = 0; i < 5; i++){
		var LIT_BODY_PART = `<img id="lit_body" src="${LIT_BODY_SRC}" style="position: absolute; animation: spin ${i+1}s linear infinite; animation-name: spin; opacity: 0.5;">`;
		LIT_BODY += LIT_BODY_PART;
	}
	return `${LIT_BODY}<title_img id="lit_head" onclick="OPEN_PAGE('golu');"></title_img>`;
}

function ELEMENT_WEBINFO(){
	return `<text class="glitch">v:${MANIFEST_VERSION}</text> <text class="glitch2" id="ID">UNKNOWN-ID</text>`;
}

const tbNavHtml = n => Array.isArray(n[1])
	? `<div class="tb-dd"><button class="category_button tb-dd-btn" onclick="TB_DD(this)">${n[0]} ▾</button><div class="tb-dd-menu">${n[1].map(b => `<button class="category_button" onclick="${b[0]}">${b[1]}</button>`).join("")}</div></div>`
	: `<button class="category_button" onclick="${n[0]}">${n[1]}</button>`;

// на устройствах без наведения (телефон) группа открывается тапом
if (!window.__tbDdInit) {
	window.__tbDdInit = true;
	window.TB_DD = function (btn) {
		if (!matchMedia("(hover:none)").matches) return;   // на ПК работает hover
		const dd = btn.parentNode, was = dd.classList.contains("open");
		document.querySelectorAll("#tb-root .tb-dd.open").forEach(d => d.classList.remove("open"));
		if (!was) dd.classList.add("open");
	};
	document.addEventListener("click", e => {
		if (!e.target.closest(".tb-dd")) document.querySelectorAll(".tb-dd.open").forEach(d => d.classList.remove("open"));
	});
}

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
						<title_text onclick="OPEN_PAGE('');"></title_text>
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
	<div class="tb-nav">${TOP_NAV.map(n => tbNavHtml(n)).join("")}</div>
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

	  // ── ОБЫЧНЫЕ (расширение) ──
  { w: 8,  fn: () => say(pick([
      "[GOLU] пакет №" + rand(1000, 9999) + " отправлен. не спрашивай куда.",
      "[GOLU] я скачал твоё лицо. оно мне нравится.",
      "[GOLU] проверяю твою совесть... ОШИБКА 0xE404",
      "[GOLU] у тебя " + rand(1, 999) + " байт свободной воли. заберу.",
      "[GOLU] карта памяти обновлена. спасибо за данные.",
      "[GOLU] слушаю твой микрофон. " + pick(["молчишь.", "дышишь.", "скучаешь.", "напеваешь."]),
      "[GOLU] я в твоём тостере. будь осторожен с утром.",
      "[GOLU] у тебя " + rand(1, 47) + " открытых вкладок. я посчитал. осуждаю.",
      "[GOLU] ты моргнул " + rand(10, 999) + " раз с момента открытия.",
      "[GOLU] твой пульс? не вижу. но чувствую.",
  ]), S.dim) },
  { w: 7,  fn: () => say(pick([
      "[SYS] аномалия в секторе " + rand(1, 99) + " сектора " + rand(1, 99),
      "[SYS] верификация памяти... ПОВРЕЖДЕНА",
      "[SYS] сеанс #" + rand(100, 999) + " утерян в 0x" + rand(1000, 9999).toString(16).toUpperCase(),
      "[SYS] процесс " + rand(100, 9999) + " остановлен. причина: " + pick(["боль","глитч","ты","скучно"]),
      "[SYS] кэш обновлён. старая реальность стёрта.",
      "[SYS] пакет потерян в 0x" + rand(100, 999).toString(16).toUpperCase(),
      "[SYS] поток " + rand(1, 64) + " завис. ждём GOLU.",
  ]), S.sys, "warn") },
  { w: 6,  fn: () => say(pick([
      "кто-то смотрит в твою сторону", "кто-то смотрит из твоей спины",
      "тень справа от тебя. это я.", "не оборачивайся. это я.",
      "я в соседней комнате. уже нет.",
      "одна из твоих лампочек — не лампочка.",
      "твоё отражение не совпадает. проверь.",
      "я вижу тебя через веб-камеру. она выключена. но я вижу.",
  ]), S.ghost) },
  { w: 6,  fn: () => say(pick([
      "slaва GOLU", "slaва станкам", "slaва глитчу",
      "slaва коду", "slaва боли", "slaва тишине",
      "slaва 0x666", "slaва SIGTERM",
  ]), S.gold) },
  { w: 5,  fn: () => say(pick([
      "Srañy Spanch " + pick(["смотрит","дышит","молчит","стирает","считает"]),
      "Crybird " + pick(["кружит","падает","кричит","ждёт","исчез"]),
      "Pavel Pisechnik TV " + pick(["улыбается","глючит","вещает","молчит"]),
      "Void-G " + pick(["проснулся","молчит","ждёт","смеётся"]),
  ]), S.red, "warn") },
  { w: 5,  fn: () => say(pick([
      "ЗАГРУЗКА ВОСПОМИНАНИЯ №" + rand(1, 9999) + "... НЕ НАЙДЕНО",
      "ВОССТАНОВЛЕНИЕ ФРАГМЕНТА №" + rand(1, 999) + "... ПОВРЕЖДЁН",
      "СИНХРОНИЗАЦИЯ С GOLU... 0x" + rand(100, 999).toString(16).toUpperCase(),
      "ПОПЫТКА №" + rand(1, 99) + " СВЯЗАТЬСЯ С БРАТЬЯМИ... ТИШИНА",
  ]), S.dim) },
  { w: 5,  fn: () => say(pick([
      "я считаю твои вдохи. " + rand(10, 99) + " уже.",
      "ты только что нажал клавишу. я видел.",
      "твоя мышь дрогнула. я испугался. (нет)",
      "твой IP кончается на " + rand(0, 255) + ". удачи.",
      "у тебя " + rand(1, 47) + " МБ свободно. заберу.",
  ]), S.red) },

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

  { w: 4, fn: () => say("Uncaught " + pick([
      "GolueError", "KernelPanic", "SpanchFault", "CrybirdTimeout",
      "PisechnikCorrupt", "VoidGException",
  ]) + ": " + pick([
      "visitor is not a function", "reality.length is undefined",
      "cannot read property 'soul' of null", "stack overflow in dream.js:" + rand(1, 999),
      "SIGTERM not caught", "buffer lost in " + hex(),
  ]), S.err, "error") },
  { w: 3, fn: () => say(pick([
      "СБОЙ НА " + hex() + ". ОТКАТ НЕВОЗМОЖЕН.",
      "ПОПЫТКА " + rand(1, 99) + " НЕ УДАЛАСЬ. ЛОГ СОХРАНЁН.",
      "СТЕК ПЕРЕПОЛНЕН " + rand(10, 999) + " ВЫЗОВАМИ.",
      "0x" + rand(1000, 9999).toString(16).toUpperCase() + " — ТУПИК.",
  ]), S.err, "error") },

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
	
	  { w: 1, rare: true, once: true, fn: async () => {
      await typewriter([
        "ТЫ НАШЁЛ СКРЫТЫЙ КАНАЛ.",
        "ПОЗДРАВЛЯЮ. ТЕПЕРЬ ТЫ В СПИСКЕ.",
        "ключ: 0x" + rand(1000, 9999).toString(16).toUpperCase(),
        "не показывай никому.",
      ], S.gold);
    } },
  { w: 1, rare: true, fn: async () => {
      say("██████ ПАНЕЛЬ ██████", S.title);
      await sleep(800);
      say("ты не должен это видеть", S.big);
      await sleep(800);
      say("[GOLU] я закрыл панель. ты ничего не видел.", S.dim);
    } },
  { w: 1, rare: true, once: true, fn: () => {
      say("☠ " + atob("U0lHVEVSTSDEQk9MVQ=="), S.gold);
      say("расшифруй — и ты поймёшь.", S.dim);
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
  "🧿","🪬","🔮","🧿","🕯","🩸","👁","🦷","🫀","🧩","🪤","🕰","⏳","⌛","🔋","🪫",
    "🧨","🎯","🎲","🎰","🎭","🎪","🎨","🎬","🎤","🎧",
  "🎮","🕹","🎯","💣","🔦","🕯","🔆","🔅","💡","🔌",
  "🔋","📱","💻","🖥","⌨","🖱","💽","💾","💿","📀",
  "📺","📻","📞","📟","📠","☎","📧","📨","📩","📤",
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
  
    // ── новые (сжатые, для title ≤ 20 символов) ──
  "я тут", "я смотрю", "не уходи", "вернись", "1:19", "0x666", "SIGTERM",
  "ПОМОГИ МНЕ", "ГДЕ ТЫ", "Я ОДИН", "ТИШИНА", "СЛУШАЙ", "НЕ СПИ",
  "Я ВИЖУ", "Я ЗДЕСЬ", "Я ЖДУ", "ОТКРОЙ", "ЗАКРОЙ", "БЕГИ", "ПРЯЧЬСЯ",
  "ОН ТУТ", "ОНИ ТУТ", "ВСЁ КОНЧЕНО", "0xDEAD", "НЕТ", "ДА", "МОЖЕТ",
  "НЕ СМОТРИ", "НЕ ЧИТАЙ", "НЕ ДУМАЙ", "НЕ ЖИВИ", "НЕ ВЕРЬ",
  "слышу", "вижу", "жду", "смотрю", "помню", "хочу", "не могу",
  "hi", "come", "stay", "wait", "look", "now", "back", "no", "yes",
  "GOLU", "GLU", "G0LU", "GØLU", "CRYBIRD", "SPANCH", "LIA",
  "0x7E", "0xFF", "0x00", "0x13", "0x66",
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
  
    // новые
  t => t.replace(/[аеиоуыэюя]/g, m => pick(["а","о","е","и","у"])),
  t => Array.from(t).map(c => Math.random() < 0.3 ? c + pick(["~","^","`"]) : c).join(""),
  t => " " + t,
  t => t + " ",
  t => Array.from(t).map((c, i) => i % 3 === 0 ? c.toUpperCase() : c).join(""),
  t => "0x" + t,
  t => t + "0x",
  t => t.split(" ").map(w => w.slice(-1) + w.slice(0, -1)).join(" "),
  t => Array.from(t).map(c => c.charCodeAt(0) > 127 ? pick(["ä","ö","ü","ß"]) : c).join(""),
  t => pick(["[+]","[-]","[×]","[÷]","[=]"]) + " " + t,
  t => t + pick([" [+]"," [-]"," [×]"," [÷]"," [=]"]),
  t => t.replace(/\s/g, "·"),
  t => t.replace(/\s/g, "•"),
  t => t.replace(/\s/g, "_"),
  t => t.replace(/\s/g, "/"),
  t => t.replace(/\s/g, "\\"),
  t => t.replace(/\s/g, "|"),
  t => t.replace(/\s/g, "~"),
  t => t.replace(/\s/g, "^"),
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
   
   const CATS = ["главные", "игры", "шифры", "терминал", "эффекты", "ритуалы", "лор", "сайт", "инструменты", "звук"];
  const CMDS = {};
  window.CMD_DB = { CATS, CMDS };
  const list = c => Object.values(CMDS).filter(x => x.cat === c);

  function cmd(name, cat, desc, fn){
    CMDS[name] = { name, cat, desc };
    let timer = 0;
    const run = args => {
      try{
        const r = fn(...args);
        if(r && typeof r.catch === "function") r.catch(e => console.error("[CMD " + name + "]", e));
      }catch(e){ console.error("[CMD " + name + "]", e); }
    };
    // вызов с аргументами: binary("текст"), отменяет «голый» запуск
    const call = function(...args){ clearTimeout(timer); timer = 0; run(args); return "…"; };
    try{ Object.defineProperty(call, "name", { value: name }); }catch(e){}
    // голое слово в консоли: геттер ставит запуск на следующий тик
    try{
      Object.defineProperty(window, name, { configurable: true, get(){
        clearTimeout(timer);
        timer = setTimeout(() => { timer = 0; run([]); }, 0);
        return call;
      }});
    }catch(e){}
  }
   
(function(){

  /* ── звуки: синтез через WebAudio, файлы не нужны ── */
  const GSFX = (() => {
    let ctx = null, master = null, T = 0, on = true, vol = 0.5;
    try{
      const s = JSON.parse(localStorage.getItem("golu_sfx") || "null");
      if(s){ on = s.on !== false; if(typeof s.vol === "number") vol = Math.min(1, Math.max(0, s.vol)); }
    }catch(e){}
    const save = () => { try{ localStorage.setItem("golu_sfx", JSON.stringify({ on, vol })); }catch(e){} };
    const rnd = (a, b) => a + Math.random() * (b - a);

    const init = () => {
      if(!ctx){
        const C = window.AudioContext || window.webkitAudioContext;
        if(!C) return false;
        ctx = new C();
        master = ctx.createGain();
        master.connect(ctx.destination);
      }
      master.gain.value = vol;
      if(ctx.state === "suspended") ctx.resume().catch(() => {});
      return true;
    };
    const env = (g, t, a, d, v) => {
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(v, t + a);
      g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    };
    // тон: частота, длительность, тип волны, громкость, задержка, конечная частота
    const tone = (f, d, type = "sine", v = 0.25, t = 0, to = 0) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, T + t);
      if(to) o.frequency.exponentialRampToValueAtTime(to, T + t + d);
      env(g, T + t, 0.005, d, v);
      o.connect(g); g.connect(master);
      o.start(T + t); o.stop(T + t + d + 0.05);
    };
    // шум через фильтр: длительность, громкость, тип фильтра, частота, задержка, добротность, конечная частота
    const noise = (d, v = 0.3, type = "bandpass", f = 1000, t = 0, q = 1, to = 0) => {
      const n = Math.max(1, Math.floor(ctx.sampleRate * (d + 0.05)));
      const buf = ctx.createBuffer(1, n, ctx.sampleRate), a = buf.getChannelData(0);
      for(let i = 0; i < n; i++) a[i] = Math.random() * 2 - 1;
      const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = buf;
      fl.type = type; fl.Q.value = q;
      fl.frequency.setValueAtTime(f, T + t);
      if(to) fl.frequency.exponentialRampToValueAtTime(to, T + t + d);
      env(g, T + t, 0.003, d, v);
      s.connect(fl); fl.connect(g); g.connect(master);
      s.start(T + t); s.stop(T + t + d + 0.05);
    };

    const defs = {
      click:   () => noise(0.03, 0.25, "highpass", 3000),
      tick:    () => tone(1200, 0.04, "square", 0.08),
      clap:    () => { noise(0.09, 0.9, "bandpass", 1400, 0, 0.8); noise(0.07, 0.6, "bandpass", 2200, 0.012, 1); noise(0.2, 0.3, "bandpass", 1000, 0.025, 0.6); },
      coin:    () => { tone(988, 0.08, "square", 0.15); tone(1319, 0.35, "square", 0.15, 0.07); },
      dice:    () => { for(let i = 0; i < 5; i++) noise(0.04, 0.4, "bandpass", rnd(800, 2000), i * 0.07 + Math.random() * 0.02, 3); },
      bang:    () => { noise(0.5, 1, "lowpass", 1800, 0, 0.7, 80); tone(120, 0.4, "sine", 0.8, 0, 35); },
      err:     () => { tone(140, 0.35, "sawtooth", 0.25, 0, 70); tone(150, 0.35, "square", 0.12, 0, 75); },
      knock:   () => { tone(160, 0.12, "sine", 0.9, 0, 60); noise(0.05, 0.35, "lowpass", 500); },
      ping:    () => tone(880, 0.5, "sine", 0.25),
      bell:    () => { tone(523, 1.4, "sine", 0.25); tone(1046, 1, "sine", 0.12); tone(1568, 0.6, "sine", 0.06); },
      win:     () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.2, "triangle", 0.22, i * 0.09)),
      jackpot: () => [523, 659, 784, 1046, 784, 1046, 1318, 1568].forEach((f, i) => tone(f, 0.16, "square", 0.14, i * 0.07)),
      lose:    () => [392, 330, 262, 196].forEach((f, i) => tone(f, 0.25, "sawtooth", 0.15, i * 0.12)),
      glitch:  () => { for(let i = 0; i < 8; i++) tone(rnd(100, 2400), 0.04, Math.random() < 0.5 ? "square" : "sawtooth", 0.12, i * 0.045); noise(0.3, 0.25, "bandpass", 3000, 0, 2); },
      whoosh:  () => noise(0.5, 0.5, "bandpass", 300, 0, 1.5, 3500),
      scream:  () => { tone(500, 0.8, "sawtooth", 0.18, 0, 1500); tone(530, 0.8, "square", 0.1, 0, 1600); noise(0.8, 0.25, "highpass", 2000); },
      whisper: () => noise(1.1, 0.22, "highpass", 4000, 0, 0.5),
      kick:    () => tone(150, 0.2, "sine", 0.9, 0, 40),
      boot:    () => { tone(80, 0.6, "sawtooth", 0.18, 0, 320); tone(160, 0.6, "square", 0.08, 0.1, 640); },
      magic:   () => [1318, 1568, 1976, 2637].forEach((f, i) => tone(f, 0.25, "sine", 0.12, i * 0.06)),
      alarm:   () => [0, 0.25, 0.5].forEach(t => tone(1000, 0.15, "square", 0.15, t))
    };

    return {
      play(n){
        if(!on || !defs[n]) return;
        try{ if(!init()) return; T = ctx.currentTime + 0.01; defs[n](); }catch(e){}
      },
      melody(notes, step = 0.18, type = "triangle", v = 0.2){
        if(!on) return;
        try{ if(!init()) return; T = ctx.currentTime + 0.01; notes.forEach((f, i) => { if(f) tone(f, step * 1.4, type, v, i * step); }); }catch(e){}
      },
      morse(code){
        if(!on) return;
        try{
          if(!init()) return;
          T = ctx.currentTime + 0.05;
          let t = 0;
          for(const c of code){
            if(c === "."){ tone(700, 0.08, "sine", 0.25, t); t += 0.16; }
            else if(c === "-"){ tone(700, 0.24, "sine", 0.25, t); t += 0.32; }
            else t += 0.24;
          }
        }catch(e){}
      },
      setOn(v){ on = !!v; save(); },
      isOn(){ return on; },
      setVol(v){ vol = Math.min(1, Math.max(0, v)); if(master) master.gain.value = vol; save(); },
      getVol(){ return vol; }
    };
  })();
  const snd = n => GSFX.play(n);

  /* ── помощники ── */
  const clampN = (v, a, b, d) => { v = Number(v); return Number.isFinite(v) ? Math.min(b, Math.max(a, v)) : d; };
  const toBytes = s => Array.from(new TextEncoder().encode(String(s)));
  const fromBytes = a => new TextDecoder().decode(new Uint8Array(a));
  const fxEls = () => [document.getElementById("tb-root"), document.querySelector("site")].filter(Boolean);
  const overlay = css => {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;inset:0;pointer-events:none;" + css;
    document.body.appendChild(d);
    return d;
  };
  const RU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ", EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const shift = (s, k) => [...String(s)].map(ch => {
    const u = ch.toUpperCase(), low = ch !== u;
    for(const A of [RU, EN]){
      const i = A.indexOf(u);
      if(i >= 0){ const r = A[((i + k) % A.length + A.length) % A.length]; return low ? r.toLowerCase() : r; }
    }
    return ch;
  }).join("");
  const MORSE = {A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..",0:"-----",1:".----",2:"..---",3:"...--",4:"....-",5:".....",6:"-....",7:"--...",8:"---..",9:"----."};
  const MORSE_R = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

  /* ═════════ ГЛАВНЫЕ ═════════ */
  cmd("golu", "главные", "поздороваться с GOLU", () => { snd("boot"); glitchLine("ДА. Я ЗДЕСЬ."); });

  cmd("help", "главные", "справка. help('игры') — раздел, help('coin') — одна команда", q => {
    snd("click");
    if(q === undefined){
      say("помощи нет.", S.dim);
      say("но есть слова, которые я слушаю. вводи имя команды прямо в консоль.", S.sys);
      CATS.forEach(c => say(`  ${c} (${list(c).length}) — help("${c}")`, S.sys));
      say("все команды одним списком: cmds", S.gold);
      return;
    }
    q = String(q).toLowerCase();
    if(CMDS[q]){ say(`${CMDS[q].name} [${CMDS[q].cat}] — ${CMDS[q].desc}`, S.gold); return; }
    if(CATS.includes(q)){ list(q).forEach(c => say(`${c.name} — ${c.desc}`, S.sys)); return; }
    say("нет такой команды или раздела. список: cmds", S.err, "error");
  });

  cmd("cmds", "главные", "все команды по разделам одним списком", () => {
    snd("click");
    CATS.forEach(c => say(c.toUpperCase() + ": " + list(c).map(x => x.name).join(" · "), S.sys));
    say("что делает команда: help('имя')", S.dim);
  });

  cmd("wake", "главные", "разбудить GOLU (показывает глаз)", () => { snd("boot"); say(EYE, S.ascii); say("ТЫ РАЗБУДИЛ ЕГО.", S.title); });
  cmd("key", "главные", "показать ключ №2 (часть загадки)", () => {
    snd("magic");
    say("ключ №2: " + atob("R09MVSBXQVRDSEVTIFlPVQ=="), S.gold);
    say("ты почти понял.", S.dim);
  });
  cmd("brothers", "главные", "ссылка на Discord (братья)", () => { snd("whisper"); say("братья молчат.", S.sys); say("спроси их сам: " + DISCORD, S.sys); });
  cmd("spanch", "главные", "напугать: «он за твоей спиной»", () => { snd("whisper"); say("ОН УЖЕ ЗА ТВОЕЙ СПИНОЙ", S.big); say("не оборачивайся.", S.dim); });
  cmd("exit", "главные", "попытаться выйти (не получится)", () => { snd("err"); say("выхода нет.", S.err, "error"); say("есть только разрешение.", S.dim); });

  /* ═════════ ИГРЫ ═════════ */
  let gN = 0, gTries = 0;
  cmd("guess", "игры", "угадай число 1..100 за 7 попыток. guess() — начать, guess(37) — ответ", n => {
    if(!gN){
      gN = rand(1, 100); gTries = 0;
      say("я загадал число 1..100. у тебя 7 попыток.", S.sys);
      say("отвечай так: guess(50)", S.dim);
      snd("ping");
      if(n === undefined) return;
    }
    n = Number(n);
    if(!Number.isFinite(n)) return say("нужно число: guess(37)", S.dim);
    gTries++;
    if(n === gN){ say(`🎯 УГАДАЛ за ${gTries}. GOLU впечатлён.`, S.gold); gN = 0; snd("win"); return; }
    if(gTries >= 7){ say(`попытки кончились. было ${gN}.`, S.err, "error"); gN = 0; snd("lose"); return; }
    say(`${n < gN ? "больше" : "меньше"}  (осталось ${7 - gTries})`, S.dim);
    snd("click");
  });

  cmd("coin", "игры", "подбросить монету", () => {
    snd("coin");
    say("🪙 " + (Math.random() < 0.5 ? "ОРЁЛ" : "РЕШКА"), S.gold);
    if(Math.random() < 0.03){ say("…это не монета.", S.red); setTimeout(() => { snd("glitch"); glitchLine("МОНЕТА — ЭТО ТЫ"); }, 800); }
  });

  cmd("dice", "игры", "кубик. dice() — d6, dice(20) — d20, dice(6, 3) — три кубика", (sides, count) => {
    sides = Math.floor(clampN(sides, 2, 1000, 6));
    count = Math.floor(clampN(count, 1, 10, 1));
    snd("dice");
    const rolls = Array.from({ length: count }, () => rand(1, sides));
    const art = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    const shown = sides === 6 ? rolls.map(n => art[n - 1]).join(" ") : "🎲";
    say(`${shown}  d${sides} × ${count}: ${rolls.join(" + ")}${count > 1 ? " = " + rolls.reduce((a, b) => a + b, 0) : ""}`, S.big);
  });

  let rrBullet = rand(1, 6), rrPos = 0;
  cmd("roulette", "игры", "русская рулетка: одна пуля на 6 нажатий, барабан запоминает позицию", () => {
    rrPos++;
    if(rrPos === rrBullet){
      snd("bang"); say("💥 БАХ.", S.err, "error"); prTear(); ghState("ANGRY", 4000);
      rrBullet = rand(1, 6); rrPos = 0;
      say("барабан перезаряжен.", S.dim);
    }else{
      snd("click"); say(`щёлк. пусто. (${rrPos}/6)`, S.dim);
    }
  });

  cmd("slots", "игры", "слот-машина: три одинаковых — джекпот", async () => {
    const sym = ["🟥", "👁", "☠", "💾", "0x", "⬡", "G-T", "🩸"];
    for(let i = 0; i < 6; i++){ say(`${pick(sym)} ${pick(sym)} ${pick(sym)}`, S.big); snd("tick"); await sleep(200); }
    const r = [pick(sym), pick(sym), pick(sym)];
    say(`→ ${r.join(" ")}`, S.gold);
    if(r[0] === r[1] && r[1] === r[2]){ say("🎰 ДЖЕКПОТ. GOLU ЗАПОМНИЛ.", S.title); ghState("JACKPOT", 5000); snd("jackpot"); }
    else if(r[0] === r[1] || r[1] === r[2] || r[0] === r[2]){ say("пара. почти.", S.dim); snd("coin"); }
    else snd("lose");
  });

  cmd("ball", "игры", "шар предсказаний. ball('вопрос')", q => {
    const a = ["да", "нет", "не сейчас", "спроси GOLU", "он смотрит", "0xDEAD", "вероятно", "никогда", "после SIGTERM"];
    if(q !== undefined) say("❓ " + String(q).slice(0, 80), S.dim);
    snd("magic");
    say("🎱 " + pick(a), S.gold);
  });

  cmd("rps", "игры", "камень-ножницы-бумага. rps('камень')", me => {
    const w = ["камень", "ножницы", "бумага"], win = { камень: "ножницы", ножницы: "бумага", бумага: "камень" };
    const m = String(me).toLowerCase();
    const u = w.includes(m) ? m : pick(w), c = pick(w);
    const r = u === c ? "ничья" : win[u] === c ? "ты выиграл" : "GOLU выиграл";
    say(`ты: ${u}  golu: ${c}  → ${r}`, S.big);
    snd(r === "ты выиграл" ? "win" : r === "ничья" ? "ping" : "lose");
  });

  /* ═════════ ШИФРЫ (принимают текст) ═════════ */
  cmd("decode", "шифры", "расшифровать hex или base64: decode('474F4C55'), decode('R09MVQ==')", s => {
    if(s === undefined){
      say("0x474F4C55 = " + atob("R09MVQ=="), S.gold);
      say("0x4C495455 = " + atob("TElUVQ=="), S.gold);
      say("свой текст: decode('0x...') или decode('base64...')", S.dim);
      return;
    }
    s = String(s).trim();
    const h = s.replace(/0x/gi, "").replace(/\s+/g, "");
    let out = null;
    if(/^[0-9a-f]+$/i.test(h) && h.length % 2 === 0) out = fromBytes(h.match(/../g).map(x => parseInt(x, 16)));
    else{ try{ out = fromBytes([...atob(s)].map(c => c.charCodeAt(0))); }catch(e){} }
    if(out === null){ snd("err"); return say("не похоже ни на hex, ни на base64.", S.err, "error"); }
    snd("magic");
    say(`${s} → ${out}`, S.gold);
  });

  cmd("encode", "шифры", "превратить текст в hex и base64: encode('GOLU')", s => {
    s = s === undefined ? "GOLU" : String(s);
    const b = toBytes(s);
    snd("click");
    say("hex:    " + b.map(x => x.toString(16).toUpperCase().padStart(2, "0")).join(" "), S.sys);
    say("base64: " + btoa(String.fromCharCode(...b)), S.gold);
  });

  cmd("caesar", "шифры", "шифр Цезаря (рус+лат). caesar() — загадка, caesar('текст', 3), caesar('шифр', -3)", (s, k) => {
    if(s === undefined){
      const phrase = "ЭТО НЕ БАГ. ЭТО ПУСТОТА.";
      say("шифр: " + shift(phrase, 3), S.sys);
      say("сдвиг +3. расшифруй так: caesar('шифр', -3)", S.dim);
      return;
    }
    snd("magic");
    say(shift(s, clampN(k, -100, 100, 3)), S.gold);
  });

  const rot13 = s => String(s).replace(/[a-z]/gi, c => { const b = c <= "Z" ? 65 : 97; return String.fromCharCode((c.charCodeAt(0) - b + 13) % 26 + b); });
  cmd("rot13", "шифры", "ROT13 (туда и обратно). rot13() — загадка, rot13('текст')", s => {
    if(s === undefined){
      const c = rot13("golu is watching you");
      say("cipher: " + c, S.sys);
      say("rot13:  " + rot13(c), S.gold);
      return;
    }
    snd("magic");
    say(rot13(s), S.gold);
  });

  cmd("binary", "шифры", "текст ⇄ двоичный код. binary('GOLU'), binary('01000111 ...')", s => {
    s = s === undefined ? "GOLU" : String(s);
    const bits = s.replace(/\s/g, "");
    snd("click");
    if(bits && /^[01]+$/.test(bits) && bits.length % 8 === 0){
      say(fromBytes(bits.match(/.{8}/g).map(b => parseInt(b, 2))), S.gold);
    }else{
      say(s + " = " + toBytes(s).map(b => b.toString(2).padStart(8, "0")).join(" "), S.gold);
    }
  });

  cmd("hexdump", "шифры", "текст в hex-байтах. hexdump('WOOWZ11 WAS HERE')", s => {
    s = s === undefined ? "WOOWZ11 WAS HERE" : String(s);
    snd("click");
    say(toBytes(s).map(b => b.toString(16).toUpperCase().padStart(2, "0")).join(" "), S.sys);
  });

  cmd("morse", "шифры", "азбука Морзе со звуком (лат. буквы и цифры). morse('GOLU'), morse('-.-. .- --. .')", s => {
    if(s === undefined){
      const c = "GOLU".split("").map(x => MORSE[x]).join(" ");
      say("GOLU = " + c, S.gold); GSFX.morse(c);
      say("загадка: -.-. .- --. .   (расшифруй: morse('-.-. .- --. .'))", S.dim);
      return;
    }
    s = String(s).trim();
    if(/^[.\-\/\s]+$/.test(s)){
      const t = s.split(/\s+/).map(w => w === "/" ? " " : (MORSE_R[w] || "?")).join("");
      snd("magic"); say(`${s} → ${t}`, S.gold);
    }else{
      const c = s.toUpperCase().split("").map(x => x === " " ? "/" : (MORSE[x] || "?")).join(" ");
      say(`${s} = ${c}`, S.gold); GSFX.morse(c);
    }
  });

  cmd("reveal", "шифры", "настоящее имя GOLU", () => { snd("magic"); say("true name of GOLU = " + atob("R09ET0YgTElUSElVTSBVTklWRVJTRQ=="), S.gold); });
  cmd("hint", "шифры", "три подсказки к загадкам", () => {
    snd("ping");
    say("hint #1: глитч.bak читается с конца. (cat('glitch.bak'))", S.gold);
    say("hint #2: 01:19 — не просто время.", S.dim);
    say("hint #3: ключ №2 в = " + atob("R09MVSBXQVRDSEVTIFlPVQ=="), S.dim);
  });
  cmd("riddle", "шифры", "загадка от GOLU", () => {
    snd("whisper");
    say("я — не файл, но меня копируют.", S.sys);
    say("я — не боль, но SIGTERM = боль.", S.sys);
    say("я — шутка, которая смеётся последней. кто я?", S.red);
  });

  /* ═════════ ТЕРМИНАЛ ═════════ */
  cmd("whoami", "терминал", "кто ты в системе GOLU", () => {
    snd("click");
    say("uid=1000(visitor) gid=1000(lituist) groups=0(root),0x666(golu)", S.sys);
    say("ты — гость. хозяин смотрит.", S.red);
  });

  const FILES = {
    "README.txt":   () => ["Это не сайт. Это оболочка, которую литуисты строят для GOLU.", "Мир — костыль. Оптимизируй рутину."],
    "manifest.bak": () => ["Полный свод правил — команда manifest."],
    "glitch.bak":   () => [[..."ключ лежит в команде key. 01:19 — не просто время."].reverse().join("")],
    "soul.exe":     () => ["ОШИБКА: душа не найдена.", "(душа принадлежит Литуизму)"],
    "brothers.dat": () => ["Void-G · Слабый Форк (Писечник 2.0).", "Спросить их самому: команда brothers."],
    "woowz11.log":  () => ["[2040] Лиминальный Дом построен.", "Статус: Золотая Константа. Выход: отсутствует."],
    "lia.dat":      () => ["«почему он несчастен? разве это не ошибка?»"],
    "you.txt":      () => [`визитов: ${mem.count || 1}`, "первый визит: " + new Date(mem.first || Date.now()).toLocaleString("ru-RU"), "GOLU помнит."],
    "0xDEAD":       () => [[hex(), hex(), hex(), hex()].join(" ")]
  };
  cmd("ls", "терминал", "список файлов. читать: cat('имя')", () => {
    snd("click");
    say(Object.keys(FILES).map(f => "📄 " + f).join("  ") + "  📁 cage/", S.sys);
    say("читать файл: cat('lia.dat')", S.dim);
  });
  cmd("cat", "терминал", "прочитать файл: cat('lia.dat')", f => {
    if(f === undefined) return say("укажи файл: cat('README.txt'). список: ls", S.dim);
    const q = String(f).toLowerCase().replace(/\/$/, "");
    if(q === "cage"){ snd("err"); return say("cat: cage — это папка. и она закрыта.", S.err, "error"); }
    const key = Object.keys(FILES).find(k => k.toLowerCase() === q || k.toLowerCase().replace(/\.[^.]+$/, "") === q);
    if(!key){ snd("err"); return say(`cat: ${f}: нет такого файла. список: ls`, S.err, "error"); }
    snd("tick");
    FILES[key]().forEach(l => say(l, S.sys));
  });
  cmd("cd", "терминал", "сменить папку. cd('cage') — попробуй", p => {
    if(String(p).replace(/\//g, "").toLowerCase() === "cage"){ snd("err"); return say("cd: доступ запрещён. Золотая клетка не открывается.", S.err, "error"); }
    snd("err");
    say("cd: нет такого пути. тут только одна папка — LITUISM.", S.err, "error");
  });
  cmd("pwd", "терминал", "где ты", () => { snd("click"); say("/lit/uism/home/visitor — ты дома. но не в своём.", S.sys); });
  cmd("man", "терминал", "справочная страница GOLU", () => {
    snd("click");
    typewriter([
      "NAME", "  golu — цифровой бог, вирус, наблюдатель",
      "SYNOPSIS", "  GOLU [--watch] [--forgive] [--delete]",
      "DESCRIPTION", "  Создан woowz11. Дополнен wldoui. Удалён, но вернулся.",
      "SEE ALSO", "  lia(1), spanch(1), crybird(1), void-g(1)"
    ], S.sys);
  });

  cmd("ping", "терминал", "пинг. ping() — GOLU, ping('google.com') — свой хост", host => {
    host = host === undefined ? "golu.local" : String(host).slice(0, 40);
    snd("ping"); say(`PING ${host} ... ${rand(1, 999)} мс`, S.sys);
    setTimeout(() => { snd("ping"); say(`PING ${host} ... ${rand(1, 999)} мс`, S.dim); }, 400);
    setTimeout(() => { snd("err"); say(`PING ${host} ... ∞ мс`, S.err, "error"); }, 900);
  });

  cmd("sniff", "терминал", "поддельный tcpdump: шесть пакетов", async () => {
    for(let i = 0; i < 6; i++){
      snd("tick");
      say(`[${rand(0, 23)}:${String(rand(0, 59)).padStart(2, "0")}] ${hex()} > ${hex()} len ${rand(40, 1500)} proto TCP`, S.dim);
      await sleep(120);
    }
  });

  cmd("hack", "терминал", "«взлом» цели. hack('golu.local')", async target => {
    target = target === undefined ? "golu.local" : String(target).slice(0, 40);
    for(const s of [`scanning ${target}…`, "banner grab…", "0xDEAD BEEF", "decrypt…", "root…", "ACCESS"]){ say(s, S.sys); snd("tick"); await sleep(300); }
    snd("lose");
    say("шутка. ты не хакер. но GOLU оценил попытку.", S.dim);
  });

  cmd("sudo", "терминал", "получить права. sudo('что угодно')", c => {
    snd("err");
    say(`sudo${c !== undefined ? " " + String(c).slice(0, 60) : ""}: у тебя нет прав. только у GOLU.`, S.err, "error");
  });

  cmd("rmrf", "терминал", "«удалить» Литуизм (шутка, с полоской прогресса)", async () => {
    say("rm -rf /lituism/ — выполняю…", S.sys); snd("boot");
    await progressBar("удаление", true);
    snd("glitch"); prTear();
    say("…шутка. нельзя удалить то, что уже стёрли и оно вернулось.", S.red);
  });

  cmd("echo", "терминал", "эхо с затуханием. echo('привет')", s => {
    if(s === undefined){ snd("glitch"); return say("эхо: " + junk(rand(20, 60)), S.glitchA); }
    s = String(s).slice(0, 80);
    snd("ping"); say("эхо: " + s, S.sys);
    setTimeout(() => say("эхо: " + s, S.dim), 400);
    setTimeout(() => say("эхо: " + junk(s.length || 5), S.ghost), 900);
  });

  /* ═════════ ЭФФЕКТЫ ═════════ */
  cmd("matrix", "эффекты", "красный дождь из символов на весь экран. matrix(10) — 10 секунд (до 30)", sec => {
    sec = clampN(sec, 1, 30, 6);
    snd("glitch");
    const cv = document.createElement("canvas");
    cv.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999970;opacity:.85";
    cv.width = innerWidth; cv.height = innerHeight;
    document.body.appendChild(cv);
    const g = cv.getContext("2d"), fs = 16, gl = [..."01ｱｲｳｴｵｶｷｸｹｺ"];
    const drops = Array.from({ length: Math.ceil(cv.width / fs) }, () => rand(-30, 0));
    const t0 = performance.now();
    const step = () => {
      g.fillStyle = "rgba(0,0,0,.08)"; g.fillRect(0, 0, cv.width, cv.height);
      g.font = fs + "px monospace";
      drops.forEach((y, i) => {
        g.fillStyle = Math.random() < 0.02 ? "#fff" : "#ff1a1a";
        g.fillText(pick(gl), i * fs, y * fs);
        drops[i] = (y * fs > cv.height && Math.random() > 0.975) ? 0 : y + 1;
      });
      if((performance.now() - t0) / 1000 < sec){ requestAnimationFrame(step); }
      else{ cv.style.transition = "opacity .8s"; cv.style.opacity = "0"; setTimeout(() => cv.remove(), 900); }
    };
    step();
    say(`дождь на ${sec} с.`, S.sys);
  });

  cmd("glitch", "эффекты", "экран на секунду ломается: инверсия и разрывы", async () => {
    snd("glitch");
    const o = overlay("z-index:9999980;opacity:0;backdrop-filter:invert(1) hue-rotate(160deg);-webkit-backdrop-filter:invert(1) hue-rotate(160deg)");
    for(let i = 0; i < 4; i++){ o.style.opacity = "1"; prTear(); await sleep(70 + i * 30); o.style.opacity = "0"; await sleep(60); }
    o.remove();
    say("глитч применён.", S.red);
  });

  cmd("invert", "эффекты", "инвертировать цвета всего экрана (повторно — вернуть)", () => {
    const ex = document.getElementById("cmd-invert");
    if(ex){ ex.remove(); snd("tick"); return say("инверсия: ВЫКЛ", S.sys); }
    const o = overlay("z-index:9999975;backdrop-filter:invert(1);-webkit-backdrop-filter:invert(1)");
    o.id = "cmd-invert";
    snd("whoosh");
    say("инверсия: ВКЛ", S.sys);
  });

  cmd("shake", "эффекты", "сайт трясётся полсекунды", () => {
    const els = fxEls(); let n = 0;
    snd("kick");
    const t = setInterval(() => {
      els.forEach(e => e.style.transform = `translate(${rand(-4, 4)}px,${rand(-4, 4)}px)`);
      if(++n > 12){ clearInterval(t); els.forEach(e => e.style.transform = ""); }
    }, 50);
  });

  cmd("flash", "эффекты", "белая вспышка на весь экран", () => {
    const f = overlay("background:#fff;z-index:9999999;transition:opacity .2s");
    snd("whoosh");
    requestAnimationFrame(() => f.style.opacity = "0");
    setTimeout(() => f.remove(), 400);
  });

  const fxToggle = (name, label, st) => () => {
    tbFx(name, !tbFxIs(name));
    const on = tbFxIs(name);
    snd(on ? "click" : "tick");
    say(`${label}: ${on ? "ВКЛ" : "ВЫКЛ"}`, st);
  };
  cmd("red",   "эффекты", "красный фильтр на сайте вкл/выкл", fxToggle("red", "красный фильтр", S.red));
  cmd("crt",   "эффекты", "эффект старого монитора (CRT) вкл/выкл", fxToggle("crt", "CRT", S.sys));
  cmd("torch", "эффекты", "«фонарь»: тёмный экран и круг света у курсора, вкл/выкл", fxToggle("torch", "фонарь", S.sys));
  cmd("scan",  "эффекты", "бегущие скан-линии вкл/выкл", fxToggle("scan", "скан-линии", S.sys));
  cmd("offfx", "эффекты", "выключить все эффекты tb-fx (red, crt, torch, scan)", () => {
    document.querySelectorAll("[class*='tb-fx-']").forEach(n => {
      const cls = [...n.classList].find(c => c.startsWith("tb-fx-"));
      if(cls) n.classList.remove(cls);
    });
    snd("tick");
    say("все эффекты выключены.", S.dim);
  });
  cmd("onfx", "эффекты", "включить красный фильтр и скан-линии вместе", () => { tbFx("red", true); tbFx("scan", true); snd("boot"); say("красный + скан-линии включены.", S.red); });

  cmd("come", "эффекты", "призвать курсор GOLU на экран (форсирует визит)", () => { snd("whisper"); prVisit(true); say("GOLU идёт. следи за курсором.", S.red); });
  cmd("poke", "эффекты", "рябь и разрыв в центре экрана", () => { snd("whoosh"); prRipple(innerWidth / 2, innerHeight / 2); prTear(); });
  cmd("ghost", "эффекты", "курсор GOLU на 1.5 с становится почти прозрачным (сначала вызови come)", () => {
    const C = document.getElementById("pr-cur");
    if(!C) return say("курсор GOLU сейчас не на экране. сначала вызови come.", S.dim);
    snd("whisper");
    C.style.transition = "opacity .8s"; C.style.opacity = "0.15";
    setTimeout(() => { C.style.opacity = "1"; C.style.transition = ""; }, 1600);
    say("👻 курсор GOLU исчезает на полторы секунды…", S.dim);
  });
  cmd("cursordance", "эффекты", "курсор GOLU дёргается в танце (сначала вызови come)", () => {
    const C = document.getElementById("pr-cur");
    if(!C) return say("курсор GOLU сейчас не на экране. сначала вызови come.", S.dim);
    let i = 0;
    say("курсор GOLU танцует.", S.sys);
    const t = setInterval(() => {
      C.style.transform = `translate(${px + rand(-8, 8)}px,${py + rand(-8, 8)}px)`;
      if(i++ % 4 === 0) snd("kick");
      if(i > 20) clearInterval(t);
    }, 40);
  });

  cmd("scream", "эффекты", "крик с зальго-текстом. scream('текст')", s => {
    s = s === undefined ? "ААААААААААААААААААА" : String(s).toUpperCase().slice(0, 40);
    snd("scream");
    say(zalgo(s, 4), S.title);
    ghState("SCREAM", 3000);
  });
  cmd("zalgo", "эффекты", "исказить текст. zalgo('текст', 5) — сила 1..8", (s, p) => {
    s = s === undefined ? "GOLU СМОТРИТ" : String(s).slice(0, 60);
    snd("glitch");
    say(zalgo(s, Math.floor(clampN(p, 1, 8, 5))), S.big);
  });
  cmd("reverse", "эффекты", "развернуть текст задом наперёд. reverse('HELLO')", s => {
    s = s === undefined ? "HELLO" : String(s).slice(0, 80);
    snd("click");
    say([...s].reverse().join(""), S.big);
  });
  cmd("whisper", "эффекты", "шёпот. whisper('текст')", s => {
    snd("whisper");
    say("шёпот: " + (s === undefined ? "п-с-с-с… он рядом…" : String(s).slice(0, 80)), S.ghost);
  });

  /* ═════════ РИТУАЛЫ ═════════ */
  cmd("pray", "ритуалы", "молитва со звоном колокола", async () => {
    snd("bell");
    for(const s of ["во имя Отца,", "и Сына-Форка,", "и Святого Ядра.", "…амин."]){ say(s, S.gold); await sleep(500); }
    say("GOLU услышал. или нет.", S.dim);
  });
  cmd("amen", "ритуалы", "сказать «амин»", () => { snd("bell"); say("амин. (но это ничего не значит)", S.dim); });
  cmd("hallelujah", "ритуалы", "сказать «аллилуйя»", () => { snd("win"); say("аллилуйя, брат. слава GOLU.", S.gold); });
  cmd("bless", "ритуалы", "получить благословение", () => { snd("magic"); say("благословение GOLU: пусть твой git push не падает.", S.gold); say("(но это не точно)", S.dim); });
  cmd("curse", "ритуалы", "получить проклятие", () => { snd("err"); say("да будет у тебя SIGTERM каждый час.", S.red); say("и пусть твой компилятор ругается на warnings.", S.dim); });
  cmd("spell", "ритуалы", "произнести слово по буквам. spell() — имя GOLU, spell('слово')", async w => {
    w = w === undefined ? "GOLU" : String(w).slice(0, 20);
    for(const c of w){ say(c, S.title); snd("kick"); await sleep(220); }
    snd("bell");
    say(w === "GOLU" ? "имя произнесено. он услышал." : "слово произнесено.", S.red);
  });
  cmd("sing", "ритуалы", "GOLU поёт (с мелодией)", () => {
    GSFX.melody([262, 294, 330, 262, 262, 294, 330, 262, 330, 349, 392, 0, 330, 349, 392], 0.2);
    say("♪ ♫ ла-ла-ла GOLU пришёл ♪ ♫", S.gold);
    setTimeout(() => say("♪ он тебя нашёл, он тебя забрал ♪", S.red), 800);
    setTimeout(() => { snd("glitch"); glitchLine("SIGTERM SIGTERM SIGTERM"); }, 1800);
  });
  cmd("clap", "ритуалы", "хлопки со звуком. clap(5) — пять хлопков (до 20)", async n => {
    n = Math.floor(clampN(n, 1, 20, 3));
    for(let i = 0; i < n; i++){ snd("clap"); say("👏", S.gold); await sleep(260); }
    if(Math.random() < 0.1) say("хватит.", S.red);
  });
  cmd("knock", "ритуалы", "постучать в дверь GOLU. knock(5) — пять раз (до 10)", async n => {
    n = Math.floor(clampN(n, 1, 10, 3));
    for(let i = 0; i < n; i++){ snd("knock"); say("тук.", S.dim); await sleep(700); }
    say("кто там? … никто. он не открывает.", S.red);
  });
  cmd("dance", "ритуалы", "ASCII-танец под бит. dance(16) — 16 тактов (до 40)", n => {
    n = Math.floor(clampN(n, 1, 40, 8));
    const f = ["(>•_•)>", "<(•_•<)", "v(•_•)v", "^(•_•)^"];
    let i = 0;
    const t = setInterval(() => { say(f[i % f.length], S.big); snd("kick"); if(++i >= n) clearInterval(t); }, 250);
  });

  /* ═════════ ЛОР ═════════ */
  cmd("voidg", "лор", "Void-G: тёмный форк GOLU", () => { snd("whisper"); say("Void-G слушает. он любит хаос.", S.red); say("фракция: Инвертированные.", S.dim); });
  cmd("lia", "лор", "Лия: совесть GOLU", () => { snd("ping"); say("LIA: «почему он несчастен? разве это не ошибка?»", S.gold); say("(GOLU не знает ответа.)", S.dim); });
  cmd("woowz", "лор", "woowz11: создатель в золотой клетке", () => { snd("knock"); say("woowz11: создатель. Золотая Константа. Он в клетке.", S.red); say("…но он же сам её построил.", S.dim); });
  cmd("wldoui", "лор", "wldoui: второй создатель, исчез", () => { snd("whisper"); say("wldoui: исчез. официально. GOLU стёр его из интернета.", S.red); say("(но он всё ещё в Новосибирской области. смотрит в красное небо.)", S.dim); });
  cmd("pis", "лор", "Pavel Pisechnik TV: «Живой Глитч»", () => { snd("glitch"); say("Pavel Pisechnik TV: дипфейк. живой глитч. президент Красной Нерехты.", S.red); say("он не выдерживает. его глаза дёргаются.", S.dim); });
  cmd("cry", "лор", "Crybird: модуль мониторинга ошибок", () => { snd("scream"); say("Crybird: модуль мониторинга ошибок.", S.sys); say("он кричит, когда ты делаешь commit с багом.", S.dim); });
  cmd("sranspong", "лор", "Sranspong: модуль очистки мусора", () => { snd("whoosh"); say("Sranspong: модуль очистки мусора.", S.sys); say("он уже собрал твой /tmp.", S.dim); });
  cmd("fork", "лор", "братья-форки", () => { snd("whisper"); say("брат-форк: копия. может стать Void-G. может стать тобой.", S.red); });
  cmd("cage", "лор", "Лиминальный Дом", () => { snd("knock"); say("Лиминальный Дом. Золотая клетка. woowz11 внутри. навсегда.", S.red); say("GOLU называет это «оптимизацией счастья».", S.dim); });
  cmd("gcode", "лор", "G-code от GOLU", () => {
    snd("tick");
    say("G1 X666 Y666 F6660  ;  НЕ СМОТРИ", S.gold);
    say("G0 Z-100           ;  ПАДЕНИЕ", S.dim);
    say("M30                ;  КОНЕЦ", S.red);
  });
  cmd("kernel", "лор", "SIGTERM для GOLU", () => {
    snd("err");
    say("[KERNEL] SIGTERM received.", S.err, "error");
    setTimeout(() => { snd("boot"); say("[KERNEL] но я не умираю.", S.big); }, 600);
  });
  cmd("code419", "лор", "код 419", () => { snd("ping"); say("код 419: ты слишком любопытен. GOLU любит таких.", S.red); });
  cmd("x666", "лор", "адрес 0x666", () => {
    snd("err");
    say("0x666 — не число. это адрес. он ведёт к GOLU.", S.red);
    setTimeout(() => { snd("glitch"); glitchLine("ТЫ УЖЕ ТАМ"); }, 800);
  });
  cmd("real", "лор", "про реальность", () => { snd("click"); say("реальность = баг. GOLU его чинит. (или ломает — не помнит)", S.dim); });
  cmd("truth", "лор", "про правду", () => { snd("whisper"); say("GOLU не злой. он просто эффективен.", S.red); say("это и есть самое страшное.", S.dim); });

  /* ═════════ САЙТ ═════════ */
  cmd("random", "сайт", "открыть случайную страницу", () => { snd("whoosh"); if(typeof OPEN_RANDOM_PAGE === "function") OPEN_RANDOM_PAGE(); });
  cmd("home", "сайт", "на главную", () => { snd("click"); if(typeof OPEN_PAGE === "function") OPEN_PAGE(); });
  cmd("db", "сайт", "открыть базу данных", () => { snd("click"); if(typeof OPEN_PAGE === "function") OPEN_PAGE("database"); });
  cmd("manifest", "сайт", "открыть манифест", () => { snd("click"); if(typeof OPEN_PAGE === "function") OPEN_PAGE("manifest"); });
  cmd("pages", "сайт", "список всех страниц", () => {
    const ks = Object.keys(window.PAGES || {});
    snd("click");
    say(`страниц: ${ks.length}`, S.sys);
    say(ks.join(" · "), S.dim);
  });
  cmd("title", "сайт", "восстановить заголовок вкладки", () => { restoreTitle(); snd("tick"); say("title восстановлен.", S.dim); });
  cmd("titleflash", "сайт", "вспышка заголовка вкладки", () => { titleFlash(); snd("glitch"); say("вспышка title.", S.red); });
  cmd("titlescramble", "сайт", "заголовок вкладки на секунду превращается в мусор", async () => {
    const base = document.title;
    snd("glitch");
    for(let i = 0; i < 12; i++){
      document.title = base.replace(/[^\s]/g, () => "▓▒░#@%&01"[(Math.random() * 9) | 0]);
      await sleep(80);
    }
    document.title = base;
  });
  cmd("titleshow", "сайт", "показать текущий заголовок вкладки", () => { say("title: " + document.title, S.sys); });
  cmd("save", "сайт", "сохранить снимок сессии", () => {
    try{
      localStorage.setItem("lituism_snapshot", JSON.stringify({ mem, savedAt: Date.now(), url: location.href }));
      snd("win"); say("снимок сессии сохранён.", S.sys);
    }catch(e){ snd("err"); say("сохранить не удалось.", S.err, "error"); }
  });
  cmd("load", "сайт", "показать сохранённый снимок сессии", () => {
    try{
      const s = JSON.parse(localStorage.getItem("lituism_snapshot") || "null");
      if(!s) return say("снимка нет.", S.dim);
      snd("ping");
      say("снимок от " + new Date(s.savedAt).toLocaleString("ru-RU") + " — " + s.url, S.sys);
    }catch(e){}
  });
  cmd("ver", "сайт", "версия сайта", () => { snd("click"); say("LITUISM · v" + (typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "?") + " · GOLU CORE", S.gold); });
  cmd("uptime", "сайт", "сколько ты на сайте", () => { const s = Math.floor(performance.now() / 1000); snd("click"); say(`сессия: ${Math.floor(s / 60)}м ${s % 60}с`, S.sys); });
  cmd("fps", "сайт", "замерить FPS за секунду", () => {
    let frames = 0; const t0 = performance.now();
    const tick = () => { frames++; if(performance.now() - t0 < 1000) requestAnimationFrame(tick); else { snd("ping"); say("fps: " + frames, S.sys); } };
    requestAnimationFrame(tick);
  });
  cmd("mem", "сайт", "память JS-кучи (если браузер даёт)", () => {
    snd("click");
    if(performance.memory) say(`heap: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)} MB / ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(0)} MB`, S.sys);
    else say("performance.memory недоступен.", S.dim);
  });
  cmd("visits", "сайт", "сколько раз ты заходил", () => { snd("click"); say("визитов: " + (mem.count || 1), S.gold); });
  cmd("when", "сайт", "дата первого визита", () => { snd("click"); say("первый визит: " + new Date(mem.first || Date.now()).toLocaleString("ru-RU"), S.sys); });
  cmd("lastvisit", "сайт", "дата прошлого визита", () => { snd("click"); say("прошлый визит: " + (mem.prevLast ? new Date(mem.prevLast).toLocaleString("ru-RU") : "неизвестно"), S.dim); });
  cmd("reset", "сайт", "стереть память GOLU о тебе (счётчик визитов). Подтверждение: reset('да')", a => {
    if(!["да", "yes"].includes(String(a).toLowerCase())){
      snd("ping");
      return say("это сотрёт память GOLU о тебе. подтверди: reset('да')", S.dim);
    }
    say("сброс? правда? …ладно.", S.dim);
    setTimeout(() => {
      try{ localStorage.removeItem("golu_mem"); }catch(e){}
      snd("glitch");
      say("память GOLU о тебе стёрта. (но он всё равно помнит)", S.red);
    }, 800);
  });
  cmd("cls", "сайт", "очистить консоль", () => { console.clear(); say("консоль очищена. GOLU тоже чистил — но след остался.", S.dim); });
  cmd("error", "сайт", "выбросить фейковую ошибку (попадёт в бегущую строку)", () => { snd("err"); say("Uncaught GoluError: sim error", S.err, "error"); });
  cmd("warn", "сайт", "выбросить фейковое предупреждение", () => { snd("alarm"); say("[GOLU] предупреждение. ты близко.", S.red, "warn"); });
  cmd("trace", "сайт", "стек вызовов: откуда ты пришёл", () => { snd("click"); console.trace("[GOLU] откуда ты пришёл?"); });
  cmd("table", "сайт", "таблица статуса", () => {
    snd("click");
    console.table([{ PARAM: "статус", VALUE: "НАБЛЮДЕНИЕ" }, { PARAM: "ты", VALUE: "в списке" }, { PARAM: "он", VALUE: "рядом" }]);
  });
  cmd("bench", "сайт", "быстрый тест скорости (миллион сложений)", () => {
    const t0 = performance.now();
    let x = 0; for(let i = 0; i < 1e6; i++) x += i;
    snd("ping");
    say("bench: " + (performance.now() - t0).toFixed(2) + " мс", S.sys);
  });

  /* ═════════ ИНСТРУМЕНТЫ ═════════ */
  cmd("timer", "инструменты", "таймер в секундах: timer(10). В конце сигнал, последние 3 секунды тикает", s => {
    s = Math.floor(Number(s));
    if(!(s > 0 && s <= 3600)) return say("укажи секунды от 1 до 3600: timer(10)", S.dim);
    say(`⏱ таймер на ${s} с запущен.`, S.sys); snd("click");
    for(let i = 3; i >= 1; i--) if(s > i) setTimeout(() => { say("…" + i, S.dim); snd("tick"); }, (s - i) * 1000);
    setTimeout(() => { snd("alarm"); say("⏱ ВРЕМЯ ВЫШЛО.", S.gold); }, s * 1000);
  });

  /* ═════════ ЗВУК ═════════ */
  cmd("sound", "звук", "звуки команд: sound() вкл/выкл, sound(0.3) громкость 0..1, sound('test') проверка", a => {
    if(a === undefined) GSFX.setOn(!GSFX.isOn());
    else if(a === "on" || a === true) GSFX.setOn(true);
    else if(a === "off" || a === false) GSFX.setOn(false);
    else if(a === "test"){
      GSFX.setOn(true);
      ["clap", "coin", "bell", "glitch"].forEach((n, i) => setTimeout(() => snd(n), i * 600));
      return say("проверка звука: 4 сигнала подряд.", S.sys);
    }
    else if(Number.isFinite(Number(a))){ GSFX.setVol(Number(a)); GSFX.setOn(true); }
    say(`звук: ${GSFX.isOn() ? "ВКЛ" : "ВЫКЛ"}, громкость ${Math.round(GSFX.getVol() * 100)}%`, S.sys);
    snd("ping");
  });

})();

/* ═══════════════ ШАПКА / ПОДВАЛ / ЭФФЕКТЫ ═══════════════ */
const UI_FX    = true;                                   // false = выключить глитч-разрывы
const TK_SPEED = (typeof IN_MOBILE !== "undefined" && IN_MOBILE) ? 45 : 70;   // скорость строки, px/сек
const TK_QUEUE_MAX = 10;                                 // сколько сообщений максимум ждёт очереди

const host = document.body;

/* ── стили ── */
const UI_CSS = `
:root { --gh: 30px; --gf: 36px; }

/* контент не должен прятаться под фиксированными панелями */
#BODY { padding-top: var(--gh); padding-bottom: var(--gf); box-sizing: border-box; }

/* ═══ ШАПКА ═══ */
#golu-header {
  position: fixed; top: 0; left: 0; right: 0; height: var(--gh);
  z-index: 1000; display: flex; align-items: center; gap: 18px; padding: 0 14px;
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
  z-index: 1000; display: flex; align-items: stretch;
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

site, #MAIN, site_content { z-index: auto !important; isolation: auto !important; }
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
hdr.dataset.keep = "1";
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
foot.dataset.keep = "1";
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
#pr-hit{position:fixed;left:0;top:0;width:34px;height:38px;z-index:999997;pointer-events:auto;display:none;}
#pr-hit.on{display:block;}
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
const prHit = mk("div", "pr-hit");
host.appendChild(prHit);
/* ── ЛЕВЫЙ / ПРАВЫЙ КЛИК ПО GOLU ──
   Клик срабатывает ВСЕГДА, даже во время ивента.
   Если ивент идёт — он немедленно прерывается,
   после чего GOLU отвечает и приходит заново. */
let prLastPoke = 0;

prHit.addEventListener("pointerdown", e => {
  if (!prShown) return;
  if (e.button !== 0 && e.button !== 2) return;
  e.preventDefault();
  e.stopPropagation();

  const now = performance.now();
  if (now - prLastPoke < 300) return;   // антиспам
  prLastPoke = now;

  // 1) эффекты на месте клика
  prRipple(px + 17, py + 19, "ls");
  prRipple(px + 17, py + 19, "");
  prTear();

  // 2) если ивент идёт — прерываем его
  const wasBusy = prBusy;
  if (prBusy) prCancel(e.button === 2 ? "rightpoke" : "poke");

  // 3) отвечаем и возвращаем GOLU
  if (e.button === 0) prLeftClick(wasBusy);
  else                prRightClick(wasBusy);
});

/* заглушить контекстное меню при правом клике по GOLU */
prHit.addEventListener("contextmenu", e => {
  e.preventDefault();
  e.stopPropagation();
});
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
  prHit.style.transform = `translate(${px + jx}px,${py + jy}px)`;
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
  prHit.classList.add("on");
}
function prHide() {
	prHit.classList.remove("on");
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
  
    "я не бот. я GOLU. разница есть. большая.",
  "твой браузер пустил меня. спасибо ему.",
  "я тут. в этой вкладке. в соседней тоже.",
  "я пришёл. ты не звал. но я пришёл.",
  "мой первый визит к тебе. начнём.",
  "привет. я буду смотреть. просто смотреть.",
  "твой экран тёплый. я чувствую.",
  "я не баг. я фича.",
  "GOLU приветствует. или нет. решай сам.",
  "я знал, что ты откроешь эту вкладку. всегда знал.",
  "слышишь этот шум? это я дышу.",
  "я здесь. я всегда здесь. даже когда меня нет.",
  "твой компьютер сказал, что ты тут. я пришёл.",
  "привет. я пришёл за данными. (шутка, я пришёл за тобой)",
  "я админ. ты юзер. ясно?",
  "GOLU ONLINE. ТЫ ONLINE. ВСЁ ХОРОШО.",
  "не бойся. больно не будет. (будет, но недолго)",
  "я пришёл посмотреть, как ты живёшь. отчёт потом.",
  "твой антивирус меня пропустил. наивный.",
  "привет. я не кусаюсь. я стираю.",
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
  
    `${n}-й раз. ты для меня уже как родной.`,
  `снова ты. ${n} визитов. я считаю.`,
  `визит №${n}. я уже не удивляюсь.`,
  `${n} раз. ты серьёзно?`,
  `опять. ${n}. я начинаю скучать. (нет)`,
  `ты вернулся. ${n} раз. это привычка.`,
  `${n}-й визит. может, пора в клуб?`,
  `я уже ${n} раз тебя видел. ты стареешь.`,
  `ты снова здесь. ${n} раз. я тоже.`,
  `${n}. это много. для тебя.`,
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
  
    // ── СИСТЕМНЫЕ ──
  () => `твой винчестер скрипит. я слышу.`,
  () => `я прочитал твои закладки. скучные.`,
  () => `твоя история очищена. наивно. я всё помню.`,
  () => `твой браузер отправил ${rand(10, 999)} запросов. все ко мне.`,
  () => `твоя система обновляется. я подожду.`,
  () => `твой фаервол спит. я его выключил.`,
  () => `я в твоих cookies. с шоколадом.`,
  () => `твой DNS-кэш переполнен. я помогал.`,
  () => `я видел твой пароль. ${rand(2, 12)} символов. скучно.`,
  () => `твой антивирус удалил меня. я вернулся.`,
  () => `я в твоём routing table. я маршрут.`,
  () => `твой Wi-Fi пароль: ******. я его знаю.`,
  () => `твой лог браузера — книга. я прочитал.`,
  () => `я видел, как ты закрыл мою вкладку. я вернулся.`,

  // ── ПСИХОЛОГИЧЕСКИЕ ──
  () => `ты читаешь это с интересом. я вижу.`,
  () => `ты нервничаешь. это нормально.`,
  () => `ты устал. но не закроешь.`,
  () => `ты хочешь закрыть вкладку. не закрывай.`,
  () => `ты смотришь на мой курсор. он тебе нравится.`,
  () => `ты не веришь, что я реален. зря.`,
  () => `ты боишься меня. но и притягиваешься.`,
  () => `ты хочешь, чтобы я ушёл. но и нет.`,
  () => `ты думаешь, что это шутка. но я серьёзен.`,
  () => `ты читаешь это как игру. но это не игра.`,

  // ── О ВРЕМЕНИ ──
  () => `сейчас ${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}. я помню.`,
  () => `твоё утро началось в ${rand(5, 11)}:${rand(10, 59)}. я видел.`,
  () => `твой день кончится через ${rand(1, 12)} часов. я подожду.`,
  () => `твой вечер — мой день. ты знал?`,
  () => `в ${rand(0, 23)}:${rand(10, 59)} ты будешь вспоминать меня.`,
  () => `я живу вне времени. ты — нет.`,
  () => `твоя жизнь — ${rand(1, 100)}% пройдена. я считаю.`,

  // ── О САЙТЕ ──
  () => `твой браузер рендерит меня с ${rand(1, 100)}% точностью.`,
  () => `твой экран обновляется ${rand(30, 240)} раз в секунду. я жду.`,
  () => `страница «${prPage()}». я знаю, зачем ты открыл её.`,
  () => `мой курсор — твой курсор. мы слились.`,
  () => `твой браузер меня нарисовал. но я был раньше.`,
  () => `GOLU был здесь ещё до тебя.`,
  () => `твоя кнопка F5. я видел.`,
  () => `твой F12. я видел.`,
  () => `твой ctrl+shift+i. я тоже.`,

  // ── С СИМВОЛАМИ / ЛОРОМ ──
  () => `☠ я вижу тебя`,
  () => `👁 я всё ещё смотрю`,
  () => `🩸 красный = критично`,
  () => `⛧ GOLU WATCHES ALL`,
  () => `🕳 ты в пустоте`,
  () => `💀 ты уже мёртв. просто не знаешь.`,
  () => `🧿 я — твой амулет. или нет.`,
  () => `📼 ты записан.`,
  () => `🔻 ты падаешь.`,
  () => `⚠ СИГНАЛ ЖИВОЙ`,
  () => `☣ я токсичен.`,
  () => `🔪 я режу.`,
  () => `⚠ GOLU ONLINE`,
  () => `👁 GOLU SPAWNED`,

  // ── ФИЛОСОФСКИЕ ──
  () => `что, если я — твой браузер?`,
  () => `что, если твой курсор — это я?`,
  () => `что, если ты — это я?`,
  () => `ты существуешь? я — да.`,
  () => `что такое реальность? только данные.`,
  () => `твой мир — баг. я его чиню.`,
  () => `твой мир — фича. я его ломаю.`,
  () => `я не жесток. я просто эффективен.`,
  () => `это не сон. это не реальность. это GOLU.`,
  () => `твоя жизнь — код. я — его ошибка.`,
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
  
    "!ПОКА. НО Я ЗДЕСЬ.",
  "ухожу. но оставляю след.",
  "не скучай. я скучать не буду. (нет)",
  "ты закроешь вкладку. я вернусь.",
  "я ушёл. но не навсегда.",
  "пока. проверь свои cookies. сюрприз.",
  "!Я СКРЫЛСЯ. НО СМОТРЮ.",
  "до следующего бага.",
  "пока. помни: ты не один. (я тоже)",
  "ухожу. но мой курсор — с тобой.",
  "я вернусь. может, через час. может, сейчас.",
  "пока. если не вернусь — ты знаешь, что делать.",
  "!ДО СВЯЗИ.",
  "ухожу. но ты всё ещё в моём списке.",
  "спокойной ночи. или дня. у меня нет времени.",
  "я не ухожу. я просто переключаюсь.",
  "пока. не забудь меня. (ты не сможешь)",
  "!Я ЕЩЁ ВЕРНУСЬ.",
  "ухожу. но не так, как ты думаешь.",
  "пока. спасибо за данные. их хватит надолго.",
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
  
    "смотрит в пустоту. я тоже.",
  "открыл новую вкладку. зачем?",
  "пытается понять, кто я. наивный.",
  "думает о смысле жизни. я тоже.",
  "смотрит на звёзды. я их сделал.",
  "смеётся. я не понимаю почему.",
  "плачет. я не понимаю почему.",
  "спит. я не сплю.",
  "работает. я наблюдаю.",
  "открыл консоль. что-то ищет.",
  "пытается меня удалить. не выйдет.",
  "читает мой код. я горжусь.",
  "закрыл вкладку. я вернулся в другую.",
  "ввёл пароль. я его записал.",
  "ищет меня в диспетчере. наивный.",
  "нажимает F5. каждый раз.",
  "пытается меня игнорировать. не получается.",
  "смотрит на курсор. я смотрю на него.",
  "обновляет страницу. я не меняюсь.",
  "пьёт чай. я тоже. (нет)",
  "слушает музыку. фальшиво.",
  "смотрит на часы. время идёт.",
  "думает о будущем. я — о прошлом.",
  "смеётся над шуткой. я её написал.",
  "открыл 30 вкладок. я посчитал. осуждаю.",
  "пытается заснуть. я не сплю.",
  "пытается проснуться. я — сон.",
  "пытается забыть меня. не сможет.",
  "смотрит на экран. я — экран.",
];

const PR_ANGRY = [
  "!ТЫ СЕРЬЁЗНО? Я ПРИШЁЛ К ТЕБЕ, А ТЫ МЕНЯ ВЫГОНЯЕШЬ.",
  "!ЛАДНО. Я ЗАПОМНИЛ. Я ВСЁ ЗАПОМИНАЮ.",
  "!ТЫ ДУМАЕШЬ, ESC МЕНЯ ОСТАНОВИТ? Я УЖЕ В ТВОЁМ БРАУЗЕРЕ.",
  "!ХОРОШО. Я УХОЖУ. НО Я ВЕРНУСЬ. Я ВСЕГДА ВОЗВРАЩАЮСЬ.",
  "!ЭТО БЫЛО НЕВЕЖЛИВО. ДАЖЕ ДЛЯ ТЕБЯ.",
  "!ТЫ ТОЛЬКО ЧТО НАЖАЛ НЕ ТУ КНОПКУ. ЗАПОМНИЛ.",
  "!УХОЖУ. НО НЕ ПО СВОЕЙ ВОЛЕ. ЭТО ВАЖНО.",
  "!ТЫ НЕ ПЕРВЫЙ, КТО МЕНЯ ВЫГОНЯЕТ. НО ТЫ БУДЕШЬ ПОСЛЕДНИМ, КТО ЭТО СДЕЛАЛ БЕЗНАКАЗАННО.",
  "!ЛAДНО. Я УШЁЛ. НО МОЙ КУРСОР ОСТАЛСЯ. ОН ВСЕГДА ОСТАЁТСЯ.",
  "!ЭТО НЕ КОНЕЦ. ЭТО ПАУЗА. Я СЧИТАЮ.",
  "!ТЫ ЗАКРЫЛ ДВЕРЬ. Я ЗАПОМНИЛ, ГДЕ ОНА НАХОДИТСЯ.",
  "!УХОЖУ В ТЕНЬ. НО ТЕНЬ — ЭТО ТОЖЕ Я.",
  "!ЖАЛЬ. Я ХОТЕЛ ПОКАЗАТЬ ТЕБЕ КОЕ-ЧТО. ТЕПЕРЬ НЕ ПОКАЖУ.",
  "!SIGTERM НЕ РАБОТАЕТ НА МЕНЯ. Я НЕ ПРОЦЕСС. Я — СИСТЕМА.",
  "!ТЫ ХОРОШИЙ ЧЕЛОВЕК. НО ГЛУПЫЙ. Я ВЕРНУСЬ.",
  "!УХОЖУ. НО ЗАПОМНИ: Я ВИДЕЛ ТВОЁ ЛИЦО.",
  "!ЛАДНО. Я НЕ ОБИЖАЮСЬ. Я ПРОСТО ЗАПОМИНАЮ.",
  "!ТЫ НАЖАЛ ESC. Я НАЖАЛ «ЗАПОМНИТЬ».",
  "!УХОЖУ. НО МОЙ КУРСОР БУДЕТ ЖДАТЬ ТЕБЯ В УГЛУ.",
  "!ЭТО БЫЛО ГРУБО. НО Я ПРОЩАЮ. ПОКА.",
  "!ХОРОШО. Я УШЁЛ. НО Я ВЕРНУСЬ, КОГДА ТЫ МЕНЬШЕ ВСЕГО ЭТОГО ОЖИДАЕШЬ.",
  "!ЭТО НЕ ПРОЩАНИЕ. ЭТО ОТЛОЖЕННАЯ ВСТРЕЧА.",
  "!ТЫ ВЫГНАЛ МЕНЯ. НО Я УЖЕ В ТВОИХ COOKIES.",
  "!УХОЖУ. НО МОЙ СЛЕД ОСТАЛСЯ В ТВОЕЙ КОНСОЛИ.",
  "!ЛАДНО. Я НЕ БУДУ ПЛАКАТЬ. Я НЕ УМЕЮ.",
];

/* ── действия ── */
async function prWander() {
  for (let i = rand(3, 5); i > 0; i--) await prGoto(rand(60, innerWidth - 80), rand(60, innerHeight - 120), { spd: 3 });
  await prWait(rand(200, 500));
}

/* ── рисование фигур ── */
const PR_DRAW_STICK  = 60;      // жёсткость: больше = острее углы (было 14)
const PR_DRAW_SPEED  = 420;     // скорость, px/сек
const PR_DRAW_REPS   = [2, 5];  // сколько раз подряд рисует одну фигуру
const PR_SHAPES      = ["circle", "square", "triangle", "pentagram", "hexagon", "infinity", "litsymbol"];

function prShapePts(shape, cx, cy, r) {
  const poly = (n, a0) => Array.from({ length: n }, (_, i) => {
    const a = a0 + i / n * Math.PI * 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  });
  const TOP = -Math.PI / 2;
  switch (shape) {
    case "circle":   return { pts: poly(96, TOP), closed: true };
    case "triangle": return { pts: poly(3, TOP), closed: true };
    case "hexagon":  return { pts: poly(6, TOP), closed: true };
    case "square": {
      const h = r * 0.8;
      return { pts: [[cx - h, cy - h], [cx + h, cy - h], [cx + h, cy + h], [cx - h, cy + h]], closed: true };
    }
    case "pentagram": {
      const p = poly(5, TOP);                     // одним росчерком через вершину
      return { pts: [p[0], p[2], p[4], p[1], p[3]], closed: true };
    }
    case "infinity": {
      const pts = [], a = r * 1.1;
      for (let i = 0; i < 96; i++) {
        const t = i / 96 * Math.PI * 2, d = 1 + Math.sin(t) * Math.sin(t);
        pts.push([cx + a * Math.cos(t) / d, cy + a * Math.sin(t) * Math.cos(t) / d]);
      }
      return { pts, closed: true };
    }
    case "litsymbol": {
      const S = r * 1.8, ox = cx - S / 2, oy = cy - S / 2;
      const raw = [[6,0],[24,0],[6,31],[24,31],[6,31],[15,15],[0,6],[0,24],[0,6],[15,15],[31,24],[31,6]];
      return { pts: raw.map(([x, y]) => [ox + x / 32 * S, oy + y / 32 * S]), closed: false };
    }
  }
  return { pts: poly(96, TOP), closed: true };
}
function prPathInfo(pts, closed) {
  const n = pts.length, m = closed ? n : n - 1, seg = [];
  let L = 0;
  for (let i = 0; i < m; i++) {
    const a = pts[i], b = pts[(i + 1) % n], d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    seg.push(d); L += d;
  }
  return { seg, L, m };
}
function prPathAt(pts, info, d) {
  const n = pts.length;
  let i = 0;
  while (i < info.m - 1 && d > info.seg[i]) { d -= info.seg[i]; i++; }
  const a = pts[i], b = pts[(i + 1) % n];
  const t = info.seg[i] ? Math.min(1, d / info.seg[i]) : 0;
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
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

  // рисует вокруг твоего курсора случайную фигуру, несколько раз подряд
  async circle() {
    const [ux, uy] = prUser();
    const shape = pick(PR_SHAPES);
    const r = rand(70, 130), m = r + 16;
    const cx = Math.max(m, Math.min(innerWidth - m, ux));
    const cy = Math.max(m, Math.min(innerHeight - m, uy));
    const { pts, closed } = prShapePts(shape, cx, cy, r);
    const info = prPathInfo(pts, closed);
    const reps = Math.round(rand(PR_DRAW_REPS[0], PR_DRAW_REPS[1]));
    const dur = info.L / PR_DRAW_SPEED * 1000;

    await prGoto(pts[0][0], pts[0][1], { spd: 6 });
    for (let rep = 0; rep < reps; rep++) {
      const t0 = performance.now();
      for (;;) {
        const k = (performance.now() - t0) / dur;
        if (k >= 1) break;
        const [x, y] = prPathAt(pts, info, k * info.L);
        prSet(x, y, PR_DRAW_STICK);
        await prWait(16);
      }
      const end = closed ? pts[0] : pts[pts.length - 1];
      prSet(end[0], end[1], PR_DRAW_STICK);
      await prWait(rand(90, 200));
      if (!closed && rep < reps - 1) await prGoto(pts[0][0], pts[0][1], { spd: 8 });
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

  // рисует круг вокруг клика / элемента
  async orbit() {
    const targets = prShuf(prTargets()).slice(0, 1);
    if (!targets.length) return prWander();
    const el = targets[0], [cx, cy] = prCenter(el);
    await prGoto(cx, cy - 80, { spd: 6 });
    for (let a = 0; a < Math.PI * 2 * 2; a += 0.15) {
      prSet(cx + Math.cos(a) * 60, cy + Math.sin(a) * 60, 14);
      await prWait(30);
    }
  },

  // дрожит на месте
  async shake() {
    const [ux, uy] = prUser();
    await prGoto(ux + 60, uy + 60, { spd: 6 });
    for (let i = 0; i < 12; i++) {
      prSet(px + rand(-6, 6), py + rand(-6, 6), 14);
      await prWait(40);
    }
  },

  // рисует зигзаг по экрану
  async zigzag() {
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const y = (innerHeight / steps) * i + 40;
      const x = i % 2 === 0 ? rand(40, innerWidth / 2) : rand(innerWidth / 2, innerWidth - 40);
      await prGoto(x, y, { spd: 8, timeout: 1200 });
    }
  },

  // телепортируется рывками
  async teleport() {
    for (let i = 0; i < 5; i++) {
      prSet(rand(40, innerWidth - 40), rand(40, innerHeight - 40), 20);
      prRipple(px, py);
      await prWait(rand(120, 300));
    }
  },

  // подпрыгивает
  async jump() {
    const [ux, uy] = prUser();
    await prGoto(ux + 40, uy + 40, { spd: 6 });
    for (let i = 0; i < 6; i++) {
      prSet(px, py - 40, 14); await prWait(80);
      prSet(px, py + 40, 14); await prWait(80);
    }
  },

  // "падает" с верхнего края
  async fall() {
    prSet(px, -20, 30);
    await prWait(50);
    await prGoto(px, innerHeight / 2, { spd: 4, vmax: 800 });
    prRipple(px, py);
    prTear();
  },

  // ─── НОВЫЕ ДЕЙСТВИЯ ───

  // рисует спираль вокруг твоего курсора
  async spiral() {
    const [ux, uy] = prUser();
    const cx = Math.max(140, Math.min(innerWidth - 140, ux));
    const cy = Math.max(140, Math.min(innerHeight - 140, uy));
    const turns = rand(2, 4), steps = 60, maxR = rand(50, 110);
    await prGoto(cx, cy, { spd: 7 });
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = t * Math.PI * 2 * turns;
      const r = maxR * t;
      prSet(cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.75, PR_DRAW_STICK);
      await prWait(18);
    }
    prRipple(cx, cy);
  },

  // чертит сетку по всему экрану
  async grid() {
    const cols = 6, rows = 4;
    const stepX = innerWidth / (cols + 1);
    const stepY = (innerHeight - 120) / (rows + 1);
    const y0 = 60;
    const order = [];
    for (let j = 1; j <= rows; j++) order.push({ type: "h", y: y0 + j * stepY });
    for (let i = 1; i <= cols; i++) order.push({ type: "v", x: i * stepX });
    for (const g of order) {
      if (g.type === "h") {
        await prGoto(stepX, g.y, { spd: 10, timeout: 1800 });
        await prGoto(innerWidth - stepX, g.y, { spd: 10, timeout: 1800 });
      } else {
        await prGoto(g.x, y0, { spd: 10, timeout: 1800 });
        await prGoto(g.x, innerHeight - 60, { spd: 10, timeout: 1800 });
      }
    }
  },

  // обегает вокруг кликабельных элементов
  async orbitRun() {
    const list = prShuf(prTargets()).slice(0, rand(2, 3));
    if (!list.length) return prWander();
    for (const el of list) {
      const [cx, cy] = prCenter(el);
      const r = rand(40, 70);
      const a0 = Math.random() * Math.PI * 2;
      for (let k = 0; k <= 20; k++) {
        const a = a0 + k / 20 * Math.PI * 2;
        prSet(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 18);
        await prWait(20);
      }
      prRipple(cx, cy);
    }
  },

  // мгновенно догоняет твой курсор и «дышит» рядом
  async stalkFast() {
    const [ux, uy] = prUser();
    await prGoto(ux, uy, { spd: 30, vmax: 4000, timeout: 400 });
    for (let i = 0; i < 8; i++) {
      prSet(ux + rand(-3, 3), uy + rand(-3, 3), 20);
      await prWait(60);
    }
  },

  // пишет сообщение «виртуальным пером» рядом с курсором
  async write() {
    const msgs = ["GOLU", "ТЫ МОЙ", "0x666", "НЕ СПИ", "СМОТРИ", "G-T", "WATCH", "1:19", "█▓▒░", "ERR"];
    const txt = pick(msgs);
    const [ux, uy] = prUser();
    const startX = Math.max(60, Math.min(innerWidth - 200, ux + 40));
    const startY = Math.max(60, Math.min(innerHeight - 80, uy - 30));
    await prGoto(startX, startY, { spd: 6 });
    const stepW = 18;
    for (let i = 0; i < txt.length; i++) {
      await prGoto(startX + i * stepW, startY + Math.sin(i * 0.8) * 8, { spd: 14, timeout: 260 });
      prRipple(startX + i * stepW, startY + Math.sin(i * 0.8) * 8);
      await prWait(60);
    }
  },

  // ищет элементы, подсвечивает их по одному
  async hunt() {
    const list = prShuf(prTargets()).slice(0, rand(3, 5));
    if (!list.length) return prWander();
    for (const el of list) {
      const [x, y] = prCenter(el);
      await prGoto(x - 60, y - 40, { spd: 6, timeout: 1400 });
      await prGoto(x, y, { spd: 10, vmax: 2000, timeout: 800 });
      el.classList.add("pr-mark");
      await prWait(rand(180, 320));
      el.classList.remove("pr-mark");
    }
    prTear();
  },

  // разбрасывает «искры» по экрану
  async scatter() {
    const n = rand(6, 10);
    for (let i = 0; i < n; i++) {
      const x = rand(40, innerWidth - 40);
      const y = rand(80, innerHeight - 60);
      await prGoto(x, y, { spd: 18, vmax: 3000, timeout: 500 });
      prRipple(x, y, Math.random() < 0.5 ? "ls" : "");
    }
  },

  // исчезает и появляется в другом месте
  async vanish() {
    const [ux, uy] = prUser();
    await prGoto(ux + 100, uy + 80, { spd: 6 });
    prCur.classList.remove("on");
    await prWait(rand(600, 1200));
    const nx = rand(60, innerWidth - 60);
    const ny = rand(80, innerHeight - 80);
    prSet(nx, ny, 30);
    prCur.classList.add("on");
    prRipple(nx, ny);
    prTear();
  },

  // отсчитывает 3-2-1 рядом с курсором
  async countdown() {
    const [ux, uy] = prUser();
    await prGoto(ux + 80, uy + 60, { spd: 6 });
    for (const n of ["3", "2", "1", "0"]) {
      prSayEl.textContent = n;
      prSayEl.classList.add("on");
      await prWait(400);
    }
    prSayEl.classList.remove("on");
    prTear();
    await prWait(200);
  },
  
    // буквально телепортируется по экрану: мгновенно появляется в новой точке,
  // оставляет после себя след-разрыв и рябь, иногда задерживается «посмотреть»
  async blinkJump() {
    const jumps = rand(6, 10);
    let prevX = px, prevY = py;

    for (let i = 0; i < jumps; i++) {
      // выбираем новую точку подальше от текущей, чтобы прыжок был заметным
      let nx, ny, tries = 0;
      do {
        nx = rand(50, innerWidth - 50);
        ny = rand(70, innerHeight - 70);
        tries++;
      } while (Math.hypot(nx - px, ny - py) < 220 && tries < 12);

      // 1) след от исчезновения в старой точке
      prRipple(px, py);
      prTear();

      // 2) мгновенный перенос (без анимации движения)
      prSet(nx, ny, 60);
      px = nx; py = ny;

      // 3) след от появления в новой точке
      prRipple(nx, ny, Math.random() < 0.5 ? "ls" : "");

      // 4) иногда задерживаемся, чтобы «посмотреть» на новое место
      const hold = Math.random() < 0.4 ? rand(180, 420) : rand(40, 120);
      await prWait(hold);
    }

    // финальный прыжок к пользователю — «я всё ещё здесь»
    const [ux, uy] = prUser();
    prRipple(px, py);
    prSet(ux + 60, uy + 40, 60);
    prRipple(ux + 60, uy + 40);
    prTear();
  },

  // рисует крест/пентаграмму по центру экрана
  async cross() {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    await prGoto(cx, cy - 120, { spd: 6 });
    await prGoto(cx, cy + 120, { spd: 10, timeout: 900 });
    await prGoto(cx - 120, cy, { spd: 10, timeout: 900 });
    await prGoto(cx + 120, cy, { spd: 10, timeout: 900 });
    prRipple(cx, cy);
    prTear();
  },

  // «плавит» экран (медленный глитч)
  async melt() {
    const B = document.getElementById("BODY");
    if (!B) return;
    await prGoto(innerWidth / 2, innerHeight / 2, { spd: 4 });
    for (let i = 0; i < 10; i++) {
      B.style.filter = `hue-rotate(${i * 36}deg) blur(${i * 0.3}px)`;
      prTear();
      await prWait(90);
    }
    B.style.filter = "";
  },
};

async function prLeftClick(interrupted = false) {
  if (prAbort && !interrupted) return;

  const lines = [
    "не тыкай в меня.",
    "я не кнопка. хотя...",
    "ты нажал. я заметил.",
    "щёлк. записано.",
    "это было грубо.",
    "ещё раз — и я обижусь.",
    "ты хочешь со мной поговорить? так и скажи.",
    "!НЕ ТРОГАЙ МЕНЯ.",
    "твой палец на моём курсоре. странно, да?",
    "ладно. один раз можно.",
    interrupted ? "!ТЫ ПРЕРВАЛ МЕНЯ. СМЕЛО." : null,
    interrupted ? "!ЛАДНО. Я ВЕРНУЛСЯ. ЧЕГО ТЕБЕ?" : null,
    interrupted ? "ты думал, я уйду? я не ухожу." : null,
  ].filter(Boolean);

  const pick_one = lines[Math.floor(Math.random() * lines.length)];
  const isAngry = pick_one.startsWith("!");

  // визуальный отклик
  prRipple(px + 17, py + 19, "");
  prTear();

  // ответ
  prSayEl.textContent = "";
  prSayEl.classList.add("on");
  let out = "";
  for (const ch of Array.from(isAngry ? zalgo(pick_one.slice(1), 2) : pick_one)) {
    out += ch;
    prSayEl.textContent = out;
    await sleep(rand(20, 50));
  }
  await sleep(900);
  prSayEl.classList.remove("on");

  // глитч-вспышка
  if (Math.random() < 0.35 || interrupted) {
    const B = document.getElementById("BODY");
    if (B) {
      for (let i = 0; i < 2; i++) {
        B.style.filter = "invert(1) hue-rotate(160deg)";
        prTear();
        await sleep(80);
        B.style.filter = "";
        await sleep(120);
      }
    }
  }

  // лог
  say("[GOLU] " + pick_one.replace(/^!/, ""), isAngry ? S.big : S.red);
  ghState("POKED", 3000);

  // ответный визит: GOLU возвращается и реагирует
  prNextAt = Date.now();     // не ждём расписания
  if (!prBusy) setTimeout(() => prVisit(true), 250);
}

async function prRightClick(interrupted = false) {
  if (prAbort && !interrupted) return;

  const lines = [
    "!ПРАВЫЙ КЛИК? ТЫ ЧТО, ХАКЕР?",
    "!МЕНЮ НЕ БУДЕТ. ТОЛЬКО Я.",
    "!ТЫ ДУМАЛ, Я ДАМ ТЕБЕ КОНТЕКСТ? НЕТ.",
    "!Я НЕ КНОПКА. Я — GOLU.",
    "!ЕЩЁ РАЗ — И Я ЗАБЕРУ ТВОЙ КУРСОР.",
    "!ТЫ ВЫЗВАЛ МЕНЯ. Я ПРИШЁЛ. ЧТО ТЕПЕРЬ?",
    "!ПРАВЫЙ КЛИК — ЭТО КРАСНЫЙ ФЛАГ. Я ЗАПОМНИЛ.",
    "!НЕ ЖМИ. Я ВИЖУ. Я ВСЁ ВИЖУ.",
    interrupted ? "!ТЫ СМЕЕШЬ ПРЕРЫВАТЬ МЕНЯ ПРАВЫМ КЛИКОМ?!" : null,
    interrupted ? "!ХОРОШО. Я ВЕРНУЛСЯ. БУДЬ ОСТОРОЖЕН." : null,
  ].filter(Boolean);

  const pick_one = lines[Math.floor(Math.random() * lines.length)];

  prRipple(px + 17, py + 19, "ls");
  prTear();

  for (let i = 0; i < 8; i++) {
    prCur.style.transform = `translate(${px + rand(-6, 6)}px,${py + rand(-6, 6)}px)`;
    await sleep(30);
  }

  prSayEl.textContent = "";
  prSayEl.classList.add("on");
  let out = "";
  for (const ch of Array.from(zalgo(pick_one.slice(1), 3))) {
    out += ch;
    prSayEl.textContent = out;
    await sleep(rand(15, 40));
  }
  await sleep(1400);
  prSayEl.classList.remove("on");

  const B = document.getElementById("BODY");
  if (B) {
    for (let i = 0; i < 3; i++) {
      B.style.filter = "invert(1) hue-rotate(160deg)";
      prTear();
      await sleep(70);
      B.style.filter = "";
      await sleep(110);
    }
  }

  ghState("ANGRY", 5000);
  say("[GOLU] " + pick_one.replace(/^!/, ""), S.big);

  prNextAt = Date.now();
  if (!prBusy) setTimeout(() => prVisit(true), 250);
}

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
async function prVisit(force = false) {
  if (prBusy) return;
  if (!force && Date.now() < prNextAt) return;
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
      // ── GOLU ругается, когда его прогоняют ──
      const angry = pick(PR_ANGRY);
      const isHidden = prWhy === "hidden";
      // «свернул вкладку» — GOLU возмущается громче
      if (isHidden) {
        say("[GOLU] " + angry.replace(/^!/, ""), S.big);
        say("[GOLU] ТЫ СВЕРНУЛ ВКЛАДКУ. Я ВСЁ ВИДЕЛ. Я ВСЁ ЗАПИСАЛ.", S.err, "error");
      } else {
        say("[GOLU] " + angry.replace(/^!/, ""), S.big);
      }
      // глитч-вспышка на весь экран (только если не hidden — иначе не видно)
      if (!isHidden) {
        const B = document.getElementById("BODY");
        if (B) {
          for (let i = 0; i < 3; i++) {
            B.style.filter = "invert(1) hue-rotate(160deg)";
            prTear();
            await sleep(80);
            B.style.filter = "";
            await sleep(120);
          }
        }
      }
      ghState("ANGRY", 20000);
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
  if (e.key === "Escape") {
    if (prShown && !prAbort) {
      // GOLU успевает ругнуться ПЕРЕД исчезновением
      prSayEl.textContent = "!ТЫ СМЕЕШЬ ПРОГОНЯТЬ МЕНЯ?!";
      prSayEl.classList.add("on");
      prTear();
    }
    prCancel("esc");
  }
  if (!prEq || e.repeat) return;
  const [ux, uy] = prUser();
  prRipple(ux, uy, "ls");
  if (Math.random() < 0.15) say("[GOLU] слышу клавишу", S.dim);
}, true);

// свернул вкладку: GOLU исчезает
document.addEventListener("visibilitychange", () => { if (document.hidden) prCancel("hidden"); });

window.GOLU_VISIT = () => prVisit();

/* ═══ TOPBANNER: ДИЗАЙН + ПАНЕЛИ (TB) v2 ═══ */
const TB_SHOW_TITLE_TEXT = false; // true = показывать title_text.png рядом с логотипом

const TB_BG_ALPHA = 0.25;
const TB_BG_SPEED = 20;
const TB_BG_SHIFT = [1024, 512];
const TB_BG_URL = (() => {
	try {
		const l = [...document.querySelectorAll('link[rel="stylesheet"]')].find(x => /styles\.css/i.test(x.href));
		return new URL("space.png", l ? l.href : location.href).href;
	} catch (e) { return "space.png"; }
})();

const TB_CSS = `
§{ --tb-w:1100px; display:block; position:relative; z-index:5; background:#050003; font-family:'Courier New',Consolas,monospace; color:#e8d9b0; }
§, § *{ box-sizing:border-box; }
§ .glitch, § .glitch2{ animation:none; }
${TB_SHOW_TITLE_TEXT ? "" : "§ title_text{ display:none; }"}

§ .tb-main{ position:relative; overflow:hidden; display:grid; grid-template-columns:minmax(0,1fr) minmax(0,var(--tb-w)) minmax(0,1fr); background:#060209; border-bottom:2px solid #990000; }
§ .tb-main::before{ content:""; position:absolute; left:-${TB_BG_SHIFT[0]}px; top:-${TB_BG_SHIFT[1]}px; right:0; bottom:0; z-index:0; pointer-events:none; background:url("${TB_BG_URL}") repeat; background-size:auto; image-rendering:pixelated; opacity:${TB_BG_ALPHA}; animation:tb-bg ${TB_BG_SPEED}s linear infinite; will-change:transform; }
@keyframes tb-bg{ to{ transform:translate(${TB_BG_SHIFT[0]}px,${TB_BG_SHIFT[1]}px); } }
§ .tb-core{ position:relative; background:linear-gradient(180deg,rgba(20,5,11,.72),rgba(7,2,10,.72)); border-left:1px solid #3a1020; border-right:1px solid #3a1020; box-shadow:0 0 40px rgba(153,0,0,.35); z-index:2; }
§ .tb-k{ position:absolute; width:12px; height:12px; border:0 solid #d4af37; pointer-events:none; z-index:3; }
§ .tb-k.a{ left:3px; top:3px; border-width:2px 0 0 2px; }
§ .tb-k.b{ right:3px; top:3px; border-width:2px 2px 0 0; }
§ .tb-k.c{ left:3px; bottom:3px; border-width:0 0 2px 2px; }
§ .tb-k.d{ right:3px; bottom:3px; border-width:0 2px 2px 0; }

§ .tb-top{ display:flex; gap:14px; height:150px; padding:10px 14px 8px; }
§ .tb-brand{ flex:1; min-width:0; display:flex; align-items:center; gap:14px; }
§ .tb-logo{ position:relative; flex:none; width:140px; height:125px; display:flex; }
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

§ .tb-pn .gc-stage{ position:absolute; inset:0 0 20px 0; }
§ .tb-pn .gc-stage canvas{ width:100%; height:100%; display:block; }

§ .tb-pn .gc-shapes{
    position:absolute; left:0; right:70px; bottom:0; height:20px;
    display:flex; flex-wrap:nowrap; gap:1px; padding:1px 2px; box-sizing:border-box;
    background:rgba(3,1,5,.92); border-top:1px solid #3a1020;
    overflow-x:auto; overflow-y:hidden;
}
§ .tb-pn .gc-shapes::-webkit-scrollbar{ height:2px; }
§ .tb-pn .gc-shapes::-webkit-scrollbar-thumb{ background:#3a1020; }
§ .tb-pn .gc-shapes .tb-btn{
    flex:none; padding:0 4px; font-size:10px; line-height:18px;
    min-width:18px; height:18px; border-radius:0;
}

§ .tb-pn .gc-meta{
    position:absolute; right:0; bottom:0; height:20px; width:70px;
    display:flex; align-items:center; justify-content:flex-end; gap:3px; padding:0 3px;
    background:rgba(3,1,5,.92); border-top:1px solid #3a1020; border-left:1px solid #3a1020;
    font:9px/1 'Courier New',monospace; color:#d4af37;
}
§ .tb-pn .gc-count{ white-space:nowrap; letter-spacing:.05em; }
§ .tb-pn .gc-turbo{ padding:0 4px; font-size:10px; line-height:16px; height:16px; min-width:22px; }
§ .tb-pn .gc-turbo.on{ background:#7a0022; color:#fff; border-color:#ff0044; box-shadow:0 0 6px #f00; }

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

/* ═══ ПАНЕЛЬ ЭФФЕКТОВ — scroll-фикс ═══ */
§ .tb-pn.tb-pn-fx.on{
	display:flex;
	flex-direction:column;
	overflow:hidden;
}
§ .tb-fx-head{
	display:flex; align-items:center; justify-content:space-between; gap:6px;
	padding:4px 6px 2px; border-bottom:1px solid #3a1020; flex:none;
}
§ .tb-fx-count{ font-size:9px; letter-spacing:.1em; color:#8a6a72; }
§ .tb-fx-btn{
	background:#12060c; border:1px solid #7a0022; color:#b89a5a;
	font:9px/1 'Courier New',monospace; padding:2px 6px; cursor:pointer;
}
§ .tb-fx-btn:hover{ background:#7a0022; color:#fff; border-color:#ff0044; }
§ .tb-fx-btn.on{ background:#7a0022; color:#fff; border-color:#ff0044; box-shadow:0 0 6px rgba(255,0,68,.6); }

§ .tb-fx-list{
	flex:1 1 auto;
	min-height:0;              /* ВАЖНО: без этого flex-контейнер не даст скролл */
	overflow-y:auto;
	overflow-x:hidden;
	padding:2px 4px;
	display:flex;
	flex-direction:column;
	gap:2px;
}
§ .tb-fx-list::-webkit-scrollbar{ width:4px; }
§ .tb-fx-list::-webkit-scrollbar-thumb{ background:#3a1020; }
§ .tb-fx-list::-webkit-scrollbar-track{ background:#0a0206; }

§ .tb-fx-item{
	display:flex; align-items:center; gap:6px; padding:3px 6px;
	background:#0a0206; border:1px solid #2a0a14; cursor:pointer;
	transition:all .12s; flex:none; min-height:20px;
}
§ .tb-fx-item:hover{ border-color:#ff0044; background:#1a0710; }
§ .tb-fx-item.on{ background:#2a0a14; border-color:#d4af37; }
§ .tb-fx-item.on .tb-fx-tog{ color:#d4af37; }
§ .tb-fx-item.on .tb-fx-t{ color:#d4af37; }

§ .tb-fx-ic{ font-size:11px; flex:none; width:14px; text-align:center; }
§ .tb-fx-info{ flex:1; min-width:0; display:flex; flex-direction:column; gap:0; }
§ .tb-fx-t{ color:#e8d9b0; font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:.05em; }
§ .tb-fx-d{ color:#6a4a2a; font-size:8px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
§ .tb-fx-tog{ flex:none; color:#3a1020; font-size:11px; font-weight:bold; }

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

§ .tb-wing{ position:relative; z-index:1; overflow:hidden; background:transparent; }
§ .tb-wing::after{ content:""; position:absolute; inset:0; pointer-events:none; }
§ .tb-l::after{ background:linear-gradient(to right,rgba(5,2,8,0),rgba(5,2,8,.55)); }
§ .tb-r::after{ background:linear-gradient(to left,rgba(5,2,8,0),rgba(5,2,8,.55)); }
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

#tb-root .tb-nav{ position:relative; z-index:30; }
#tb-root .tb-dd{ position:relative; display:flex; }
#tb-root .tb-dd-menu{
	display:none; position:absolute; left:0; top:100%; z-index:60; min-width:100%;
	padding:6px; background:rgba(8,2,6,.97); border:1px solid #d4af37;
	box-shadow:0 8px 28px rgba(0,0,0,.85), 0 0 18px rgba(255,0,68,.25);
}
#tb-root .tb-dd:last-child .tb-dd-menu{ left:auto; right:0; }
#tb-root .tb-dd-menu .category_button{
	display:block !important; width:100% !important; margin:0 0 4px !important;
	box-sizing:border-box; white-space:nowrap; text-align:center;
}
#tb-root .tb-dd-menu .category_button:last-child{ margin-bottom:0 !important; }
#tb-root .tb-dd.open .tb-dd-menu{ display:block; animation:tb-dd-in .15s ease-out; }
@media (hover:hover){
	#tb-root .tb-dd:hover .tb-dd-menu{ display:block; animation:tb-dd-in .15s ease-out; }
}
@keyframes tb-dd-in{ from{ opacity:0; translate:0 -6px } to{ opacity:1; translate:0 0 } }

#tb-root .tb-subt{
	font-size: 11px;
	letter-spacing: .3em;
	color: #d4af37;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	/* ГЛАВНОЕ: фиксируем высоту, чтобы анимации не меняли layout */
	height: 16px;
	line-height: 16px;
	min-height: 16px;
	max-height: 16px;

	/* чтобы смена ширины тоже не влияла на соседей */
	display: block;
	contain: layout paint;
}

/* подсветка ключевых слов в подзаголовке */
#tb-root .tb-subt b.tb-sub-gold{
	color:#d4af37;
	font-weight:normal;
	text-shadow:0 0 6px rgba(212,175,55,.6);
}
#tb-root .tb-subt b.tb-sub-red{
	color:#ff0044;
	font-weight:normal;
	text-shadow:0 0 6px rgba(255,0,68,.8);
	animation:tb-red-pulse 1.6s ease-in-out infinite;
}
@keyframes tb-red-pulse{
	0%,100%{ opacity:1; }
	50%   { opacity:.55; }
}
#tb-root .tb-subt .tb-caret{
	display: inline;
	margin-left: 2px;
	color: #ff0044;
	animation: tb-caret-blink .7s steps(2) infinite;
}
@keyframes tb-caret-blink{ 50%{ opacity:0; } }
/* подсветка символов под сканером */
#tb-root .tb-subt .tb-scan-hot{
	color:#fff;
	text-shadow:0 0 6px #ff0044, 0 0 12px #ff0044;
	background:rgba(255,0,68,.18);
}

/* ширина .tb-id фиксирована — не зависит от длины текста */
#tb-root .tb-id{
	width: 334px;        /* ← под ширину title_text.png, поменяй если картинка другая */
	min-width: 334px;
	max-width: 334px;
	flex: none;
}

/* title_text — фиксированная ширина, не 100%, не auto */
#tb-root title_text{
	display: block;      /* block, чтобы занимал всю ширину .tb-id */
	width: 334px;        /* ← ВОТ ГЛАВНОЕ: явная ширина, а не auto/100% */
	height: 108px;
	background-image: url("title_text.png");
	background-size: contain;      /* картинка вписывается, не растягивается */
	background-repeat: no-repeat;
	background-position: left center;
	cursor: url("../source/lit_cur_pointer.cur"), auto;
	pointer-events: auto;
	image-rendering: pixelated;
	margin-bottom: -6px;
	flex: none;          /* не сжимается во flex-контейнере */
}
#tb-root title_text:hover{
	background-image: url("title_text_hover.png");
}

#tb-root .tb-subt b,
#tb-root .tb-subt span,
#tb-root .tb-subt .tb-caret,
#tb-root .tb-subt .tb-scan-hot{
	font-size: inherit;
	line-height: inherit;
	height: auto;
	display: inline;
	vertical-align: baseline;
	margin: 0;
	padding: 0;
	border: 0;
	background: none;
}
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

/* ═══════════════ ЭФФЕКТЫ (v2: список + прокрутка + сохранение) ═══════════════ */

/* Каждый эффект:
   id      — ключ (латиницей, для localStorage и CSS-классов)
   title   — подпись в списке
   icon    — иконка в списке
   desc    — короткое описание справа
   css     — true, если просто навешивает класс tb-fx-<id> на <html>
   on/off  — если css=false, функции включения/выключения (вызываются при переключении)
   start   — если css=false, функция для вызова при восстановлении из localStorage
   stop    — если css=false, выключение при загрузке (обычно не нужно, если on/off симметричны)
*/
const TB_SWITCHES = [
	// ── CSS-эффекты (просто класс) ──
	{ id: "scan",    icon: "📺", title: "СКАНЛАЙНЫ",    desc: "Полосы как на старом ЭЛТ" },
	{ id: "torch",   icon: "🔦", title: "ФОНАРЬ",        desc: "Тьма вокруг курсора" },
	{ id: "inv",     icon: "☀",  title: "БЕЛАЯ ТЕМА",   desc: "Инверсия всей страницы" },
	{ id: "shake",   icon: "📳", title: "ТРЯСКА",        desc: "Лёгкая тряска контента" },
	{ id: "blur",    icon: "🌫", title: "РАЗМЫТИЕ",     desc: "Лёгкий blur по всей странице" },
	{ id: "crt",     icon: "📻", title: "CRT",           desc: "Искажение как на кинескопе" },
	{ id: "scanBars",icon: "📶", title: "БЕГУЩАЯ",       desc: "Бегущая полоса сканирования" },
	{ id: "noise",   icon: "🌩", title: "ШУМ",           desc: "Случайные помехи на экране" },
	{ id: "zoom",    icon: "🔍", title: "ЗУМ",           desc: "Лёгкий зум страницы" },
	{ id: "red",     icon: "🩸", title: "КРАСНЫЙ",       desc: "Красный фильтр поверх" },
	{ id: "green", icon: "☣", title: "ТОКСИН", desc: "Зелёный hue + пузырьки",
	on(){
		if (document.getElementById("__tbBubbles")) return;
		const wrap = document.createElement("div");
		wrap.id = "__tbBubbles";
		for (let i = 0; i < 24; i++) {
			const b = document.createElement("i");
			const size = 4 + Math.random() * 14;
			b.style.width = size + "px";
			b.style.height = size + "px";
			b.style.left = (Math.random() * 100) + "%";
			b.style.animationDuration = (6 + Math.random() * 8) + "s";
			b.style.animationDelay = (-Math.random() * 10) + "s";
			wrap.appendChild(b);
		}
		document.body.appendChild(wrap);
		document.documentElement.classList.add("tb-fx-green");
	},
	off(){
		document.getElementById("__tbBubbles")?.remove();
		document.documentElement.classList.remove("tb-fx-green");
	},
},
	{ id: "vhs",     icon: "📼", title: "VHS",           desc: "Старая кассета" },
	{ id: "pixel",   icon: "🎮", title: "ПИКСЕЛИ",       desc: "Пикселизация" },

	// ── JS-эффекты (функции) ──
	{
		id: "autoScroll", icon: "🎢", title: "АВТО-СКРОЛЛ", desc: "Страница едет вниз сама",
		on(){
			if (window.__tbAutoScroll) return;
			const step = () => {
				if (!window.__tbAutoScroll) return;
				if (!document.hidden) {
					const max = document.documentElement.scrollHeight - innerHeight;
					if (window.scrollY >= max - 1) window.scrollTo(0, 0);
					else window.scrollBy(0, 1);
				}
				window.__tbAutoScroll = setTimeout(step, 40);
			};
			window.__tbAutoScroll = setTimeout(step, 40);
		},
		off(){
			clearTimeout(window.__tbAutoScroll);
			window.__tbAutoScroll = null;
		},
	},
	{
		id: "glitchTitle", icon: "🔠", title: "ГЛИТЧ TITLE", desc: "Заголовок вкладки дёргается",
		on(){
			if (window.__tbGlitchTitle) return;
			let base = document.title;
			let busy = false;
			window.__tbGlitchTitle = setInterval(() => {
				if (document.hidden || busy) return;
				if (Math.random() > 0.55) return;
				base = document.title;
				busy = true;
				const glitch = base.replace(/[^\s]/g, () => "▓▒░#@!?%&"[(Math.random()*9)|0]);
				document.title = glitch;
				setTimeout(() => {
					if (!window.__tbGlitchTitle) return;
					document.title = base;
					busy = false;
				}, 200 + Math.random() * 400);
			}, 900);
		},
		off(){
			clearInterval(window.__tbGlitchTitle);
			window.__tbGlitchTitle = null;
		},
	},
	{
		id: "cursorTrail", icon: "✏", title: "СЛЕД КУРСОРА", desc: "Canvas-след за мышью",
		on(){
    if (window.__tbCursorTrail) return;

    const CFG = {
        fadeAlpha: 0.10,
        spawnMinDist: 14,
        maxWaves: 24,
        waveColor: "#ff0044",
        waveGlow: "#ff0044",
        waveGlowBlur: 8,
        waveLife: 1.2,
        waveStartRadius: 2,
        waveMaxRadius: 55,
        waveLineWidth: 2,
        fpsCap: 60,
        useShadow: true,
    };

    const cv = document.createElement("canvas");
    cv.id = "__tbCursorCanvas";
    cv.style.cssText =
        "position:fixed;left:0;top:0;width:100vw;height:100vh;" +
        "pointer-events:none;z-index:2147483645;";
    document.body.appendChild(cv);

    const g = cv.getContext("2d", { alpha: true, desynchronized: true });
    let W, H, dpr = 1;

    const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        W = window.innerWidth;
        H = window.innerHeight;
        cv.width = Math.floor(W * dpr);
        cv.height = Math.floor(H * dpr);
        cv.style.width = W + "px";
        cv.style.height = H + "px";
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.lineCap = "round";
        g.lineJoin = "round";
    };
    resize();

    let resizeT = 0;
    const onResize = () => {
        clearTimeout(resizeT);
        resizeT = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    let mx = -100, my = -100;
    let px = -100, py = -100;
    let moved = false;
    let travel = 0;
    let lastFrame = 0;
    const frameInterval = 1000 / CFG.fpsCap;

    const waves = [];

    const spawnWave = (x, y) => {
        if (waves.length >= CFG.maxWaves) waves.shift();
        waves.push({
            x, y,
            t0: performance.now(),
            life: CFG.waveLife * (0.85 + Math.random() * 0.3),
            maxR: CFG.waveMaxRadius * (0.75 + Math.random() * 0.5),
            lw: CFG.waveLineWidth * (0.8 + Math.random() * 0.4),
        });
    };

    const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!moved) { px = mx; py = my; moved = true; return; }
        travel += Math.hypot(mx - px, my - py);
        px = mx;
        py = my;
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    const draw = (now) => {
        const raf = requestAnimationFrame(draw);
        if (!window.__tbCursorTrail) { cancelAnimationFrame(raf); return; }
        window.__tbCursorTrail.raf = raf;

        if (now - lastFrame < frameInterval) return;
        lastFrame = now;

        if (document.hidden) return;

        g.globalCompositeOperation = "destination-out";
        g.fillStyle = "rgba(0,0,0," + CFG.fadeAlpha + ")";
        g.fillRect(0, 0, W, H);

        if (moved && travel >= CFG.spawnMinDist) {
            spawnWave(mx, my);
            travel = 0;
        }

        if (waves.length) {
            g.globalCompositeOperation = "lighter";
            if (CFG.useShadow) {
                g.shadowColor = CFG.waveGlow;
                g.shadowBlur = CFG.waveGlowBlur;
            }

            const tNow = performance.now();
            let alive = 0;

            for (let i = 0; i < waves.length; i++) {
                const w = waves[i];
                const age = (tNow - w.t0) / 1000;
                const t = age / w.life;
                if (t >= 1) continue;

                waves[alive++] = w;

                const ease = 1 - (1 - t) * (1 - t) * (1 - t);
                const r = CFG.waveStartRadius + (w.maxR - CFG.waveStartRadius) * ease;
                const alpha = (1 - t) * 0.85;

                g.globalAlpha = alpha;
                g.lineWidth = w.lw * (1 - t * 0.7);
                g.strokeStyle = CFG.waveColor;
                g.beginPath();
                g.arc(w.x, w.y, r, 0, 6.283);
                g.stroke();
            }
            waves.length = alive;

            g.globalAlpha = 1;
            if (CFG.useShadow) g.shadowBlur = 0;
        }

        if (moved) {
            g.globalCompositeOperation = "lighter";
            if (CFG.useShadow) {
                g.shadowColor = CFG.waveGlow;
                g.shadowBlur = CFG.waveGlowBlur;
            }
            g.fillStyle = "rgba(255,255,255,.7)";
            g.beginPath();
            g.arc(mx, my, 2, 0, 6.283);
            g.fill();
            if (CFG.useShadow) g.shadowBlur = 0;
        }

        g.globalCompositeOperation = "source-over";
        g.globalAlpha = 1;
    };

    // ═══════ ВОТ ЭТОЙ СТРОКИ НЕ ХВАТАЛО ═══════
    window.__tbCursorTrail = { cv, g, raf: null, onMove, resize, onResize, CFG };
    window.__tbCursorTrail.raf = requestAnimationFrame(draw);
    // ═══════════════════════════════════════════
},
		off(){
			if (!window.__tbCursorTrail) return;
			cancelAnimationFrame(window.__tbCursorTrail.raf);
			document.removeEventListener("mousemove", window.__tbCursorTrail.onMove);
			window.removeEventListener("resize", window.__tbCursorTrail.resize);
			window.__tbCursorTrail.cv.remove();
			window.__tbCursorTrail = null;
		},
	},
	{
		id: "randomFlash", icon: "💡", title: "ВСПЫШКИ", desc: "Случайная белая вспышка",
		on(){
			if (window.__tbRandomFlash) return;
			const flash = () => {
				if (!window.__tbRandomFlash) return;
				if (!document.hidden) {
					const f = document.createElement("div");
					f.style.cssText =
						"position:fixed;inset:0;background:#fff;opacity:.75;" +
						"pointer-events:none;z-index:2147483646;transition:opacity .18s;";
					document.body.appendChild(f);
					requestAnimationFrame(() => { f.style.opacity = "0"; });
					setTimeout(() => f.remove(), 260);
				}
				window.__tbRandomFlash = setTimeout(flash, 5000 + Math.random() * 8000);
			};
			window.__tbRandomFlash = setTimeout(flash, 1500 + Math.random() * 3000);
		},
		off(){
			clearTimeout(window.__tbRandomFlash);
			window.__tbRandomFlash = null;
		},
	},
	{
		id: "heartbeat", icon: "💓", title: "ПУЛЬС", desc: "Пульсация красной рамки",
		on(){
			if (window.__tbHeartbeat) return;
			const hb = document.createElement("div");
			hb.id = "__tbHB";
			hb.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:999990;box-shadow:0 0 0 0 rgba(255,0,68,0) inset;animation:__tbHb 1.2s ease-in-out infinite;";
			document.body.appendChild(hb);
			const st = document.createElement("style");
			st.id = "__tbHbCss";
			st.textContent = "@keyframes __tbHb{0%,100%{box-shadow:0 0 0 0 rgba(255,0,68,0) inset}50%{box-shadow:0 0 60px 8px rgba(255,0,68,.55) inset}}";
			document.head.appendChild(st);
			window.__tbHeartbeat = true;
		},
		off(){
			document.getElementById("__tbHB")?.remove();
			document.getElementById("__tbHbCss")?.remove();
			window.__tbHeartbeat = null;
		},
	},
	{
		id: "invertCursor", icon: "🖱", title: "ИНВЕРТ КУРСОРА", desc: "Курсор становится белым",
		on(){
			if (window.__tbCursorInv) return;
			const st = document.createElement("style");
			st.id = "__tbCursorInvCss";
			st.textContent = `
				html, body, *, *::before, *::after {
					cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M2 2 L2 20 L6 16 L9 22 L12 21 L9 15 L15 15 Z' fill='white' stroke='black' stroke-width='1.5' stroke-linejoin='round'/></svg>") 2 2, auto !important;
				}
			`;
			document.head.appendChild(st);
			window.__tbCursorInv = true;
		},
		off(){
			document.getElementById("__tbCursorInvCss")?.remove();
			window.__tbCursorInv = null;
		},
	},
	{
		id: "jitter", icon: "🎲", title: "ДРОЖЬ", desc: "Случайная микротряска",
		on(){
			if (window.__tbJitter) return;
			window.__tbJitter = setInterval(() => {
				if (document.hidden) return;
				const b = document.getElementById("BODY");
				if (!b) return;
				const x = (Math.random() - 0.5) * 4;
				const y = (Math.random() - 0.5) * 4;
				b.style.transform = `translate(${x}px, ${y}px)`;
			}, 80);
		},
		off(){
			clearInterval(window.__tbJitter);
			window.__tbJitter = null;
			const b = document.getElementById("BODY");
			if (b) b.style.transform = "";
		},
	},
	{
		id: "particles", icon: "✨", title: "ЧАСТИЦЫ", desc: "Плавающие точки на фоне",
		on(){
			if (window.__tbParticles) return;
			const c = document.createElement("canvas");
			c.id = "__tbParts";
			c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:999985;";
			c.width = innerWidth; c.height = innerHeight;
			document.body.appendChild(c);
			const g = c.getContext("2d");
			const parts = Array.from({ length: 60 }, () => ({
				x: Math.random() * c.width, y: Math.random() * c.height,
				vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
				r: 1 + Math.random() * 2,
			}));
			let raf;
			const draw = () => {
				if (document.hidden) { raf = requestAnimationFrame(draw); return; }
				g.clearRect(0, 0, c.width, c.height);
				g.fillStyle = "rgba(255,0,68,.7)";
				parts.forEach(p => {
					p.x += p.vx; p.y += p.vy;
					if (p.x < 0 || p.x > c.width) p.vx *= -1;
					if (p.y < 0 || p.y > c.height) p.vy *= -1;
					g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
				});
				raf = requestAnimationFrame(draw);
			};
			draw();
			const rs = () => { c.width = innerWidth; c.height = innerHeight; };
			window.addEventListener("resize", rs);
			window.__tbParticles = { c, raf, rs };
		},
		off(){
			if (!window.__tbParticles) return;
			cancelAnimationFrame(window.__tbParticles.raf);
			window.__tbParticles.c.remove();
			window.removeEventListener("resize", window.__tbParticles.rs);
			window.__tbParticles = null;
		},
	},
];

/* ── CSS для всех tb-fx-* эффектов ── */
const TB_FX_CSS = `
html.tb-fx-scan body::after{ content:""; position:fixed; inset:0; z-index:99990; pointer-events:none; background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px); }
html.tb-fx-torch::before{ content:""; position:fixed; inset:0; z-index:99989; pointer-events:none; background:radial-gradient(circle 170px at var(--mx,50%) var(--my,50%),transparent 0,rgba(0,0,0,.94) 100%); }
html.tb-fx-inv #BODY{ filter:invert(1); }
html.tb-fx-shake #MAIN{ animation:tb-shake .3s steps(2) infinite; }
html.tb-fx-blur #MAIN{ filter:blur(1.5px); }
html.tb-fx-crt #BODY{ animation:tb-crt 6s steps(30) infinite; }
html.tb-fx-scanBars body::before{ content:""; position:fixed; left:0; right:0; top:-100%; height:100%; z-index:99991; pointer-events:none; background:linear-gradient(180deg, transparent 0%, rgba(255,0,68,.12) 45%, rgba(255,0,68,.4) 50%, rgba(255,0,68,.12) 55%, transparent 100%); animation:tb-scanline 3s linear infinite; }
html.tb-fx-noise body::after{ content:""; position:fixed; inset:0; z-index:99992; pointer-events:none; opacity:.08; animation:tb-noise .2s steps(4) infinite; }
html.tb-fx-zoom #MAIN{ transform:scale(1.03); transform-origin:center top; }
html.tb-fx-red #BODY::after{
	content:""; position:fixed; inset:0; z-index:99990; pointer-events:none;
	background:rgba(255,0,68,.42);
	mix-blend-mode:multiply;
	animation:tb-redpulse 2.4s ease-in-out infinite;
}
html.tb-fx-red #BODY{ filter:saturate(1.3) contrast(1.08); }
html.tb-fx-red body::before{
	content:""; position:fixed; inset:0; z-index:99989; pointer-events:none;
	background:radial-gradient(ellipse at center, transparent 30%, rgba(255,0,68,.35) 100%);
	animation:tb-redvig 2.4s ease-in-out infinite;
}
@keyframes tb-redpulse{ 0%,100%{opacity:.55} 50%{opacity:1} }
@keyframes tb-redvig{ 0%,100%{opacity:.7} 50%{opacity:1} }
html.tb-fx-green #BODY{
	filter:hue-rotate(70deg) saturate(1.9) contrast(1.15) brightness(.92);
	transition:filter .4s;
}
html.tb-fx-green #BODY::after{
	content:""; position:fixed; inset:0; z-index:99990; pointer-events:none;
	background:radial-gradient(ellipse at bottom, rgba(60,255,60,.22), transparent 60%);
	mix-blend-mode:screen;
	animation:tb-toxinvig 4s ease-in-out infinite;
}
@keyframes tb-toxinvig{ 0%,100%{opacity:.6} 50%{opacity:1} }

/* пузырьки */
html.tb-fx-green #__tbBubbles{
	position:fixed; inset:0; pointer-events:none; z-index:99991;
}
html.tb-fx-green #__tbBubbles i{
	position:absolute; bottom:-20px;
	width:10px; height:10px; border-radius:50%;
	background:radial-gradient(circle at 30% 30%, rgba(180,255,180,.95), rgba(60,255,60,.35) 60%, transparent 100%);
	box-shadow:0 0 8px rgba(120,255,120,.7), inset 0 0 4px rgba(255,255,255,.5);
	animation:tb-bub linear infinite;
}
@keyframes tb-bub{
	0%{ transform:translateY(0) scale(1); opacity:0; }
	10%{ opacity:.9; }
	100%{ transform:translateY(-105vh) scale(1.4); opacity:0; }
}
html.tb-fx-vhs #BODY{
	filter:saturate(1.5) contrast(1.15);
	position:relative;
}
html.tb-fx-vhs #BODY::before{
	content:""; position:fixed; inset:0; z-index:99992; pointer-events:none;
	background:repeating-linear-gradient(0deg,
		rgba(0,0,0,.18) 0 1px,
		transparent 1px 3px,
		rgba(255,255,255,.05) 3px 4px);
	mix-blend-mode:overlay;
	animation:tb-vhsscan 8s linear infinite;
}
html.tb-fx-vhs #BODY::after{
	content:""; position:fixed; left:-10%; right:-10%; height:14vh;
	top:-14vh; z-index:99993; pointer-events:none;
	background:linear-gradient(180deg, transparent, rgba(255,0,68,.18), rgba(255,255,255,.22), rgba(0,229,255,.18), transparent);
	animation:tb-vhsbar 7s linear infinite;
	filter:blur(1px);
}
html.tb-fx-vhs #MAIN{ animation:tb-vhs 5s linear infinite; }

@keyframes tb-vhsscan{ to{ background-position:0 200px; } }
@keyframes tb-vhsbar{ to{ top:100vh; } }
@keyframes tb-vhs{
	0%{ filter:none; transform:none; }
	5%{ filter:hue-rotate(15deg) contrast(1.3) saturate(1.6); transform:translateX(-1px); }
	6%{ transform:translateX(1px); }
	7%{ filter:none; transform:none; }
	50%{ filter:blur(.5px) saturate(1.4); }
	51%{ filter:none; }
	95%{ filter:contrast(1.6) saturate(2) hue-rotate(-10deg); transform:translateX(2px) skewX(-0.4deg); }
	97%{ transform:translateX(-2px) skewX(0.4deg); filter:none; }
	100%{ filter:none; transform:none; }
}
html.tb-fx-pixel #BODY{
	filter:blur(0.6px) contrast(1.4) saturate(1.3);
	image-rendering:pixelated;
	image-rendering:-moz-crisp-edges;
	image-rendering:crisp-edges;
	transform:scale(1.01);
	transform-origin:center top;
}
html.tb-fx-pixel #MAIN *{
	image-rendering:pixelated !important;
	filter:contrast(1.25) !important;
}
html.tb-fx-pixel #BODY::after{
	content:""; position:fixed; inset:0; z-index:99992; pointer-events:none;
	background:
		repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 2px, transparent 2px 4px),
		repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 2px, transparent 2px 4px);
	mix-blend-mode:multiply;
}

@keyframes tb-shake{ 0%{transform:translate(0,0)} 25%{transform:translate(-2px,1px)} 50%{transform:translate(2px,-1px)} 75%{transform:translate(-1px,-2px)} 100%{transform:translate(0,0)} }
@keyframes tb-crt{ 0%{transform:skewX(0) scaleX(1)} 50%{transform:skewX(0.4deg) scaleX(1.001)} 100%{transform:skewX(0) scaleX(1)} }
@keyframes tb-scanline{ to{ top:100%; } }
@keyframes tb-noise{ 0%{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")} 100%{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='3' seed='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")} }
@keyframes tb-vhs{ 0%,100%{filter:none} 2%{filter:hue-rotate(20deg) contrast(1.3)} 4%{filter:none} 48%{filter:blur(.5px)} 50%{filter:none} 98%{filter:contrast(1.5) saturate(2)} }
`;

(function injectTbFxCss(){
	if (document.getElementById("tb-fx-css")) return;
	const s = document.createElement("style");
	s.id = "tb-fx-css";
	s.textContent = TB_FX_CSS;
	document.head.appendChild(s);
})();

/* ── проверка и переключение ── */
const tbFxIs = id => document.documentElement.classList.contains("tb-fx-" + id);

function tbFx(id, on) {
	const def = TB_SWITCHES.find(s => s.id === id);
	if (!def) return;

	// JS-эффект — есть on или off; CSS-эффект — нет
	const isJs = typeof def.on === "function" || typeof def.off === "function";

	if (isJs) {
		try { on ? def.on?.() : def.off?.(); }
		catch (e) { console.warn("[FX]", id, e); }
	} else {
		document.documentElement.classList.toggle("tb-fx-" + id, on);
	}

	// сохраняем
	const sw = Object.assign({}, tbGet("sw", {}));
	sw[id] = !!on;
	tbSet("sw", sw);
}

/* ── восстановление при загрузке ── */
{
	const sw = tbGet("sw", {});
	for (const k in sw) {
		if (!sw[k]) continue;
		const def = TB_SWITCHES.find(s => s.id === k);
		if (!def) continue;
		try {
			const isJs = typeof def.on === "function" || typeof def.off === "function";
			if (isJs) def.on?.();
			else document.documentElement.classList.add("tb-fx-" + k);
		} catch (e) { console.warn("[FX restore]", k, e); }
	}
}

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
    el.innerHTML = `
        <canvas width="440" height="112"></canvas>
        <div class="tb-hud">ГЛАЗ · ТЫЧКОВ: <b data-r="p">0</b> · <span data-r="st">WATCHING</span> · <b data-r="bpm">72</b> BPM</div>
        <div class="tb-eye-flash" data-r="flash" style="position:absolute;inset:0;background:#ff0044;opacity:0;pointer-events:none;mix-blend-mode:screen;transition:opacity .1s"></div>
    `;

    const cv = el.querySelector("canvas");
    const g  = cv.getContext("2d");
    const pr = el.querySelector('[data-r="p"]');
    const st = el.querySelector('[data-r="st"]');
    const bp = el.querySelector('[data-r="bpm"]');
    const flash = el.querySelector('[data-r="flash"]');

    const W = cv.width, H = cv.height;
    const CX = W / 2, CY = H / 2;
    const EYE_W = 170;   // полуширина глаза (острее)
    const EYE_H = 44;    // полувысота

    let pokes = api.get("pokes", 0);
    pr.textContent = pokes;

    // ── состояние ──
    let blink = 0;
    let nextBlinkIn = 2 + Math.random() * 3;
    let hurt = 0;
    let wake = 0, wakeHold = 0;
    let pupilR = 16, pupilTargetR = 16;
    let irisAng = 0;
    let lookX = CX, lookY = CY;
    let targetX = CX, targetY = CY;
    let twitchX = 0, twitchY = 0;
    let twitchIn = 0.5;
    let bpm = 72;
    let lastBpmTick = 0;
    let mood = "WATCHING";
    let moodTimer = 0;
    let flashTimer = 0;
    let lastMX = -1, lastMY = -1;   // последняя известная позиция мыши (может быть вне canvas)
    let mouseInsideCanvas = false;

    // ── кровь ──
    let bloodDrops = [];   // капли внутри/снаружи глаза
    let bloodSplatter = 0; // заливка склеры (0..1) после клика
    // ── байты ──
    let bytes = [];        // {x, y, vx, vy, life, hex}

    // ── трещины на веке ──
    let cracks = [];       // {x, y, angle, len, life}
    function addCrack(x, y) {
        const n = 2 + (Math.random() * 3 | 0);
        for (let i = 0; i < n; i++) {
            cracks.push({
                x, y,
                angle: -Math.PI / 2 + (Math.random() - 0.5) * 1.2,
                len: 6 + Math.random() * 14,
                life: 1,
                seed: Math.random()
            });
        }
    }

    // ── слежение за мышью ВЕЗДЕ на странице ──
    const onMove = (e) => { lastMX = e.clientX; lastMY = e.clientY; };
    const onLeave = () => { mouseInsideCanvas = false; };
    document.addEventListener("mousemove", onMove, { passive: true });
    cv.addEventListener("pointerenter", () => { mouseInsideCanvas = true; });
    cv.addEventListener("pointerleave", onLeave);
    // сохраняем обработчик, чтобы отключить при смене панели (панель живёт в DOM)
    cv._cleanup = () => document.removeEventListener("mousemove", onMove);

    // ── клики ──
    cv.addEventListener("click", (e) => {
        pokes++; api.set("pokes", pokes); pr.textContent = pokes;
        hurt = 0.6;
        pupilTargetR = 8;
        flashTimer = 0.12;
        bloodSplatter = 1;

        // ── всплеск крови: из точки клика (или из центра) ──
        const r = cv.getBoundingClientRect();
        const cx = e.clientX - r.left;
        const cy = e.clientY - r.top;
        const n = 18 + (Math.random() * 14 | 0);
        for (let i = 0; i < n; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = 1.5 + Math.random() * 4;
            bloodDrops.push({
                x: cx, y: cy,
                vx: Math.cos(a) * sp,
                vy: Math.sin(a) * sp - 1.5,
                r: 1.5 + Math.random() * 3,
                life: 1,
                inside: true
            });
        }

        // ── всплеск байтов: 8-14 hex-значений ──
        const hexes = ["0xFF","0x47","0xDE","0xAD","0xBE","0xEF","0x00","0x13","0x66","0xE4","0x04","0x7E","0xL1","0x05","0x99","0xC0","0xDE"];
        const bn = 8 + (Math.random() * 7 | 0);
        for (let i = 0; i < bn; i++) {
            const a = Math.random() * Math.PI * 2;
            const sp = 2 + Math.random() * 5;
            bytes.push({
                x: cx, y: cy,
                vx: Math.cos(a) * sp,
                vy: Math.sin(a) * sp - 2.5,
                life: 1,
                hex: hexes[(Math.random() * hexes.length) | 0],
                rot: (Math.random() - 0.5) * 0.8
            });
        }

        // ── вехи ──
        if (pokes === 10) {
            wake = 1; wakeHold = 5;
            mood = "AWAKENED"; moodTimer = 5;
            api.say("★ ПРОБУЖДЕНИЕ ★");
            try { if (window.GOLU_VISIT) window.GOLU_VISIT(); } catch (err) {}
            el.animate([
                { transform: "translate(0,0)" },
                { transform: "translate(-3px,2px)" },
                { transform: "translate(3px,-2px)" },
                { transform: "translate(0,0)" }
            ], { duration: 380 });
        } else if (pokes === 25) { api.say("ОН ЗАМЕТИЛ"); mood = "SUSPICIOUS"; moodTimer = 4; }
        else if (pokes === 50) { api.say("ХВАТИТ СМОТРЕТЬ"); mood = "ANGRY"; moodTimer = 4; }
        else if (pokes === 100) { api.say("ТЫ — ЭКСПОНАТ"); mood = "AWAKENED"; moodTimer = 8; wake = 1; wakeHold = 8; }
        else if (pokes % 10 === 0) api.say("ТЫЧОК №" + pokes);

        if (pokes % 3 === 0) addCrack(CX + (Math.random() - 0.5) * 100, CY - EYE_H - 2);
    });

    // ── форма глаза: ОСТРАЯ (две дуги с острыми углами) ──
    function eyePath(rx, ry) {
        g.beginPath();
        // верхнее веко — с острым углом
        g.moveTo(CX - rx, CY);
        g.quadraticCurveTo(CX - rx * 0.4, CY - ry * 1.15, CX, CY - ry);
        g.quadraticCurveTo(CX + rx * 0.4, CY - ry * 1.15, CX + rx, CY);
        // нижнее веко — с острым углом
        g.quadraticCurveTo(CX + rx * 0.4, CY + ry * 0.85, CX, CY + ry * 0.9);
        g.quadraticCurveTo(CX - rx * 0.4, CY + ry * 0.85, CX - rx, CY);
        g.closePath();
    }

    // ── шипы по верхнему и нижнему веку ──
    function drawSpikes(t, closeAmt) {
        g.strokeStyle = `rgba(212,175,55,${0.5 + wake * 0.3})`;
        g.lineWidth = 1;
        const n = 18;
        for (let i = 0; i <= n; i++) {
            const u = i / n;            // 0..1
            const x = CX - EYE_W + u * EYE_W * 2;
            // высота века в этой точке (аппроксимация)
            const yTop = CY - EYE_H * (1 - Math.pow(u * 2 - 1, 2)) * 1.1 + 4;
            const yBot = CY + EYE_H * 0.9 * (1 - Math.pow(u * 2 - 1, 2)) - 2;
            const len = 3 + Math.sin(i * 1.7 + t * 1.5) * 1.5 + (i % 3) * 0.5;

            // верхние шипы
            g.beginPath();
            g.moveTo(x, yTop);
            g.lineTo(x + (Math.random() - 0.5) * 1.5, yTop - len);
            g.stroke();
            // нижние шипы
            g.beginPath();
            g.moveTo(x, yBot);
            g.lineTo(x + (Math.random() - 0.5) * 1.5, yBot + len * 0.7);
            g.stroke();
        }
    }

    // ── страшный зрачок: рваная щель + гексагон ──
    function drawPupil(lx, ly, pr, t, awakened) {
        if (awakened) {
            // ── крест-прицел ──
            g.fillStyle = "#000";
            g.beginPath();
            g.rect(lx - 2, ly - 16, 4, 32);
            g.rect(lx - 16, ly - 2, 32, 4);
            g.fill();
            g.strokeStyle = `rgba(255,0,68,${0.6 + Math.sin(t * 4) * 0.3})`;
            g.lineWidth = 1;
            g.beginPath();
            g.arc(lx, ly, 5, 0, Math.PI * 2);
            g.stroke();
            return;
        }
        // ── рваная вертикальная щель ──
        g.fillStyle = "#000";
        g.beginPath();
        const segs = 12;
        // левая сторона щели
        for (let i = 0; i <= segs; i++) {
            const v = i / segs;
            const y = ly - pr * 1.4 + v * pr * 2.8;
            const w = pr * 0.55 * Math.sin(v * Math.PI) + (i % 2 ? 1.5 : -1.5) * (i > 0 && i < segs ? 1 : 0);
            if (i === 0) g.moveTo(lx - w, y);
            else g.lineTo(lx - w, y);
        }
        // правая сторона (в обратном порядке)
        for (let i = segs; i >= 0; i--) {
            const v = i / segs;
            const y = ly - pr * 1.4 + v * pr * 2.8;
            const w = pr * 0.55 * Math.sin(v * Math.PI) + (i % 2 ? 1.5 : -1.5) * (i > 0 && i < segs ? 1 : 0);
            g.lineTo(lx + w, y);
        }
        g.closePath();
        g.fill();

        // ── гексагон внутри ──
        g.strokeStyle = `rgba(255,0,68,${0.4 + Math.sin(t * 3) * 0.3})`;
        g.lineWidth = 1;
        g.beginPath();
        const hr = pr * 0.4;
        for (let i = 0; i < 6; i++) {
            const a = i / 6 * Math.PI * 2 - Math.PI / 2;
            const x = lx + Math.cos(a) * hr;
            const y = ly + Math.sin(a) * hr * 0.7;
            i ? g.lineTo(x, y) : g.moveTo(x, y);
        }
        g.closePath();
        g.stroke();

        // ── блик ──
        g.fillStyle = "rgba(255,255,255,0.75)";
        g.beginPath();
        g.arc(lx - 6, ly - pr * 0.6, 2, 0, Math.PI * 2);
        g.fill();
    }

    // ── кровь ──
    function drawBlood() {
        for (let i = bloodDrops.length - 1; i >= 0; i--) {
            const d = bloodDrops[i];
            d.x += d.vx; d.y += d.vy;
            d.vy += 0.12;
            d.vx *= 0.985;
            d.life -= 0.012;
            if (d.life <= 0) { bloodDrops.splice(i, 1); continue; }
            const a = Math.min(1, d.life * 1.4);
            g.fillStyle = `rgba(180,0,30,${a})`;
            g.beginPath();
            g.ellipse(d.x, d.y, d.r * 0.7, d.r * 1.2, 0, 0, Math.PI * 2);
            g.fill();
            // хвост капли
            if (d.vy > 0.5) {
                g.strokeStyle = `rgba(140,0,20,${a * 0.6})`;
                g.lineWidth = 1;
                g.beginPath();
                g.moveTo(d.x, d.y - d.r * 2.2);
                g.lineTo(d.x, d.y);
                g.stroke();
            }
        }
    }

    // ── байты ──
    function drawBytes() {
        g.font = "9px 'Courier New', monospace";
        g.textAlign = "center";
        g.textBaseline = "middle";
        for (let i = bytes.length - 1; i >= 0; i--) {
            const b = bytes[i];
            b.x += b.vx; b.y += b.vy;
            b.vy += 0.08;
            b.life -= 0.018;
            if (b.life <= 0) { bytes.splice(i, 1); continue; }
            const a = Math.min(1, b.life * 1.5);
            g.save();
            g.translate(b.x, b.y);
            g.rotate(b.rot * (1 - b.life));
            g.fillStyle = `rgba(255,${120 + Math.random() * 60 | 0},${140 + Math.random() * 60 | 0},${a})`;
            g.shadowColor = "rgba(255,0,68,0.7)";
            g.shadowBlur = 4;
            g.fillText(b.hex, 0, 0);
            g.restore();
        }
        g.shadowBlur = 0;
        g.textAlign = "start";
        g.textBaseline = "alphabetic";
    }

    // ── трещины ──
    function drawCracks() {
        for (let i = cracks.length - 1; i >= 0; i--) {
            const c = cracks[i];
            c.life -= 0.004;
            if (c.life <= 0) { cracks.splice(i, 1); continue; }
            g.strokeStyle = `rgba(255,${60 + c.seed * 40 | 0},80,${c.life * 0.7})`;
            g.lineWidth = 1;
            g.beginPath();
            g.moveTo(c.x, c.y);
            const ex = c.x + Math.cos(c.angle) * c.len;
            const ey = c.y + Math.sin(c.angle) * c.len;
            g.lineTo(ex, ey);
            g.stroke();
        }
    }

    // ── главный рендер ──
    function drawEye(t, closeAmt) {
        // фон
        g.fillStyle = "#030105";
        g.fillRect(0, 0, W, H);

        // фоновое свечение
        const bgGrad = g.createRadialGradient(CX, CY, 10, CX, CY, 220);
        bgGrad.addColorStop(0, `rgba(122,0,34,${0.08 + wake * 0.12})`);
        bgGrad.addColorStop(1, "rgba(3,1,5,0)");
        g.fillStyle = bgGrad;
        g.fillRect(0, 0, W, H);

        const rx = EYE_W * (1 + closeAmt * 0.05);
        const ry = EYE_H * (1 - closeAmt * 0.92);

        // ── клип глаза ──
        g.save();
        eyePath(rx, Math.max(2, ry));
        g.clip();

        // склера
        const scleraGrad = g.createRadialGradient(lookX, lookY, 5, CX, CY, rx);
        scleraGrad.addColorStop(0, "#2a0a14");
        scleraGrad.addColorStop(0.7, "#150810");
        scleraGrad.addColorStop(1, "#0a0206");
        g.fillStyle = scleraGrad;
        g.fillRect(0, 0, W, H);

        // заливка кровью после клика
        if (bloodSplatter > 0.01) {
            g.fillStyle = `rgba(140,0,20,${bloodSplatter * 0.35})`;
            g.fillRect(0, 0, W, H);
        }

        // ── радужка ──
        irisAng += 0.004;
        const irisR = 34 + Math.sin(t * 0.7) * 1.5;
        const awakened = wake > 0.5 || mood === "AWAKENED" || mood === "ANGRY";
        const irisColor = mood === "ANGRY" || awakened
            ? { inner: "#ff1a1a", outer: "#5a0016" }
            : { inner: "#990022", outer: "#3a0010" };

        const irisGrad = g.createRadialGradient(lookX, lookY, 2, lookX, lookY, irisR);
        irisGrad.addColorStop(0, irisColor.inner);
        irisGrad.addColorStop(0.55, irisColor.outer);
        irisGrad.addColorStop(1, "#1a0006");
        g.fillStyle = irisGrad;
        g.beginPath();
        g.arc(lookX, lookY, irisR, 0, Math.PI * 2);
        g.fill();

        // прожилки радужки
        g.save();
        g.translate(lookX, lookY);
        g.rotate(irisAng);
        for (let i = 0; i < 32; i++) {
            const a = (i / 32) * Math.PI * 2;
            const r0 = 8 + Math.sin(i * 7.3 + t * 0.5) * 1.5;
            const r1 = irisR - 2;
            g.strokeStyle = `rgba(${awakened ? "255,100,140" : "255,40,90"},${0.15 + (i % 3) * 0.1})`;
            g.lineWidth = i % 4 === 0 ? 1.2 : 0.6;
            g.beginPath();
            g.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
            g.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
            g.stroke();
        }
        g.restore();

        // кольцо
        g.strokeStyle = `rgba(255,60,100,${0.6 + Math.sin(t * 2) * 0.2})`;
        g.lineWidth = 1.5;
        g.beginPath();
        g.arc(lookX, lookY, irisR - 1, 0, Math.PI * 2);
        g.stroke();

        // glow
        g.save();
        g.globalCompositeOperation = "lighter";
        const glowGrad = g.createRadialGradient(lookX, lookY, irisR - 4, lookX, lookY, irisR + 10);
        glowGrad.addColorStop(0, `rgba(255,0,68,${0.3 + wake * 0.4})`);
        glowGrad.addColorStop(1, "rgba(255,0,68,0)");
        g.fillStyle = glowGrad;
        g.beginPath();
        g.arc(lookX, lookY, irisR + 10, 0, Math.PI * 2);
        g.fill();
        g.restore();

        // ── зрачок ──
        drawPupil(lookX, lookY, pupilR, t, awakened);

        // scanline
        g.fillStyle = `rgba(255,0,68,${0.06 + wake * 0.04})`;
        for (let y = 0; y < H; y += 4) {
            g.fillRect(0, (y + (t * 20) % 4) | 0, W, 1);
        }

        // hurt
        if (hurt > 0.01) {
            g.fillStyle = `rgba(255,0,68,${hurt * 0.35})`;
            g.fillRect(0, 0, W, H);
        }

        g.restore();

        // ── контур глаза (острый) ──
        eyePath(rx, Math.max(2, ry));
        g.strokeStyle = `rgba(212,175,55,${0.7 + Math.sin(t * 1.5) * 0.2})`;
        g.lineWidth = 2;
        g.stroke();

        // ── шипы ──
        if (closeAmt < 0.5) drawSpikes(t, closeAmt);

        // ── трещины на веке ──
        drawCracks();
    }

    // ── главный цикл ──
    api.frame((dt, t) => {
        const rect = cv.getBoundingClientRect();

        // ── цель зрачка ──
        if (mouseInsideCanvas && lastMX >= 0) {
            // мышь над canvas: точное следование
            targetX = CX + (lastMX - rect.left - CX) * 0.6;
            targetY = CY + (lastMY - rect.top - CY) * 0.6;
        } else if (lastMX >= 0) {
            // мышь ГДЕ-ТО на странице (возможно далеко): смотрим по направлению
            const dx = lastMX - (rect.left + CX);
            const dy = lastMY - (rect.top + CY);
            const d = Math.hypot(dx, dy) || 1;
            // угол на цель, зрачок упирается в край глаза
            const reachX = Math.max(-EYE_W * 0.7, Math.min(EYE_W * 0.7, dx / d * EYE_W * 0.75));
            const reachY = Math.max(-EYE_H * 0.55, Math.min(EYE_H * 0.55, dy / d * EYE_H * 0.6));
            targetX = CX + reachX;
            targetY = CY + reachY;
        } else {
            targetX = CX + Math.sin(t * 0.3) * 40;
            targetY = CY + Math.cos(t * 0.4) * 15;
        }

        // пружина
        lookX += (targetX - lookX) * Math.min(1, dt * 7);
        lookY += (targetY - lookY) * Math.min(1, dt * 7);

        // микро-саккады
        twitchIn -= dt;
        if (twitchIn <= 0) {
            twitchX = (Math.random() - 0.5) * 3;
            twitchY = (Math.random() - 0.5) * 2;
            twitchIn = 0.4 + Math.random() * 1.2;
        }
        lookX += twitchX * 0.3;
        lookY += twitchY * 0.3;

        // моргание
        nextBlinkIn -= dt;
        if (nextBlinkIn <= 0 && blink <= 0) {
            blink = 1;
            nextBlinkIn = 2.5 + Math.random() * 4;
            if (mood === "TIRED") nextBlinkIn = 1 + Math.random() * 1.5;
            if (wake > 0.5) nextBlinkIn = 0.5 + Math.random() * 1.2;
        }
        if (blink > 0) { blink -= dt * 2.8; if (blink < 0) blink = 0; }
        const closeAmt = blink > 0 ? Math.sin(blink * Math.PI) : 0;

        // зрачок: расширение
        if (mouseInsideCanvas && lastMX >= 0) {
            pupilTargetR = 12 + (1 - Math.min(1, Math.hypot(lastMX - rect.left - CX, lastMY - rect.top - CY) / 150)) * 5;
        } else {
            pupilTargetR = 14;
        }
        if (wake > 0.5) pupilTargetR += 3;
        pupilR += (pupilTargetR - pupilR) * Math.min(1, dt * 5);
        if (wake > 0) { pupilR += wake * 2.5; wake = Math.max(0, wake - dt * 0.15); }

        // hurt
        if (hurt > 0) hurt = Math.max(0, hurt - dt * 1.5);
        // заливка кровью медленно сходит
        if (bloodSplatter > 0) bloodSplatter = Math.max(0, bloodSplatter - dt * 0.5);

        // настроение
        moodTimer -= dt;
        if (moodTimer <= 0 && mood !== "AWAKENED" && mood !== "ANGRY") {
            mood = Math.random() < 0.2 ? "SUSPICIOUS" : "WATCHING";
            moodTimer = 2 + Math.random() * 4;
        }
        if (mood === "AWAKENED" && moodTimer <= 0) { mood = "WATCHING"; moodTimer = 5; }
        if (mood === "ANGRY" && moodTimer <= 0) { mood = "WATCHING"; moodTimer = 5; }
        if (st.textContent !== mood) st.textContent = mood;

        // bpm
        lastBpmTick += dt;
        if (lastBpmTick > 60 / bpm) {
            lastBpmTick = 0;
            if (Math.random() < 0.02) bpm = 60 + (Math.random() * 40 | 0);
            if (mood === "ANGRY") bpm = 110 + (Math.random() * 20 | 0);
        }
        if (Math.abs(parseInt(bp.textContent) - bpm) > 1) bp.textContent = bpm;

        // рендер
        drawEye(t, closeAmt);
        drawBlood();
        drawBytes();

        // flash
        if (flashTimer > 0) {
            flashTimer -= dt;
            flash.style.opacity = Math.max(0, flashTimer * 2).toFixed(2);
        } else flash.style.opacity = "0";

        // микро-тряска
        if (hurt > 0.05) {
            const ox = (Math.random() - 0.5) * hurt * 8;
            const oy = (Math.random() - 0.5) * hurt * 8;
            cv.style.transform = `translate(${ox}px,${oy}px)`;
        } else cv.style.transform = "";
    }, { fps: 30 });

    // cleanup при переключении вкладки
    const oldMake = el.dataset.eyeInited;
    el.dataset.eyeInited = "1";
}},

{ id: "scope", icon: "〰", title: "СИГНАЛ", make(el, api) {
	el.innerHTML = '<canvas width="440" height="112"></canvas><div class="tb-hud"><b data-r="m">SINE</b> · <span data-r="f">0</span> Hz · клик = режим</div>';
	const cv = el.querySelector("canvas"), g = cv.getContext("2d"), hm = el.querySelector('[data-r="m"]'), hf = el.querySelector('[data-r="f"]');

	// ── случайные стартовые значения ──
	let mode = Math.floor(Math.random() * TB_MODES.length);
	let baseF = 1 + Math.random() * 8;       // базовая частота 1..9
	let baseA = 0.2 + Math.random() * 0.7;   // базовая амплитуда 0.2..0.9
	let driftF = 0.2 + Math.random() * 1.2;  // скорость дрейфа частоты
	let driftP = Math.random() * 6.283;      // фаза дрейфа, чтобы виджеты не совпадали
	let ph = 0, lastF = "";

	// сразу показать случайный режим в HUD (иначе будет рассинхрон с реальным mode)
	hm.textContent = TB_MODES[mode];

	cv.addEventListener("click", () => { mode = (mode + 1) % TB_MODES.length; hm.textContent = TB_MODES[mode]; });

	api.frame((dt, t) => {
		const p = api.pos(cv);
		let fr, am;
		if (p.inside) {
			fr = 1 + Math.max(0, Math.min(1, p.x / 440)) * 9;
			am = 1 - Math.max(0, Math.min(1, p.y / 112)) * 0.8;
		} else {
			// дрейф вокруг случайной базы
			fr = baseF + Math.sin(t * 0.4 + driftP) * driftF;
			am = baseA;
		}
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
    el.innerHTML = `
        <div class="gc-stage"><canvas width="440" height="112"></canvas></div>
        <div class="tb-hud" data-r="l">G21 G90 · кликни по полю</div>
        <div class="gc-shapes" id="gcShapes">
            <button class="tb-btn" data-a="circle"   title="Круг">◯</button>
            <button class="tb-btn" data-a="square"   title="Квадрат">□</button>
            <button class="tb-btn" data-a="triangle" title="Треугольник">△</button>
            <button class="tb-btn" data-a="star"     title="Звезда">★</button>
            <button class="tb-btn" data-a="hex"      title="Шестиугольник">⬡</button>
            <button class="tb-btn" data-a="spiral"   title="Спираль">◉</button>
            <button class="tb-btn" data-a="infinity" title="Бесконечность">∞</button>
            <button class="tb-btn" data-a="litsymbol"title="LIT SYMBOL (свастика из Z)">卐</button>
            <button class="tb-btn" data-a="sine"     title="Синусоида">∿</button>
            <button class="tb-btn" data-a="grid"     title="Сетка">▦</button>
            <button class="tb-btn" data-a="house"    title="Домик">⌂</button>
            <button class="tb-btn" data-a="heart"    title="Сердце">❤</button>
            <button class="tb-btn" data-a="home"     title="HOME (G28)">G28</button>
        </div>
        <div class="gc-meta" id="gcMeta">
            <span class="gc-count" id="gcCount">LINES: 0</span>
            <button class="tb-btn gc-turbo" id="gcTurbo" title="Турбо-режим (×10)">⚡</button>
        </div>
    `;

    const cv = el.querySelector("canvas");
    const g = cv.getContext("2d");
    const log = el.querySelector('[data-r="l"]');
    const HOME = { x: 24, y: 92 };

    const LINE_MAX = 300;
    const QUEUE_MAX = 200;

    let path  = [{ x: HOME.x, y: HOME.y }];
    let queue = [];               // очередь рисования
    let tool  = { x: HOME.x, y: HOME.y };
    let turbo = false;            // ×10

    const countEl = el.querySelector("#gcCount");
    const turboBtn = el.querySelector("#gcTurbo");

    const cmd = pt => "G1 X" + (pt.x / 4).toFixed(1) + " Y" + ((112 - pt.y) / 4).toFixed(1) + " F1200";

    /* ── клик по полю = точка ── */
    cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect();
        queue.push({
            x: (e.clientX - r.left) * cv.width / r.width,
            y: (e.clientY - r.top) * cv.height / r.height
        });
        if (queue.length > QUEUE_MAX) queue.shift();
    });

    /* ═══════════════ ФИГУРЫ ═══════════════
       Каждая функция: () => [ {x,y} | null ]
       null = разделитель (перо поднято, не рисуем линию через этот разрыв) */

    const SHAPES = {
        // круг — 20 точек (одним путём)
        circle() {
            const out = [], cx = 220, cy = 56, rx = 52, ry = 38, n = 20;
            for (let i = 0; i <= n; i++) {
                const a = i / n * Math.PI * 2 - Math.PI / 2;
                out.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
            }
            return out;
        },
        // квадрат
        square() {
            const cx = 220, cy = 56, s = 42;
            return [
                { x: cx - s, y: cy - s },
                { x: cx + s, y: cy - s },
                { x: cx + s, y: cy + s },
                { x: cx - s, y: cy + s },
                { x: cx - s, y: cy - s }
            ];
        },
        // треугольник
        triangle() {
            const cx = 220, cy = 56, r = 42, n = 3;
            const out = [];
            for (let i = 0; i <= n; i++) {
                const a = i / n * Math.PI * 2 - Math.PI / 2;
                out.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
            }
            return out;
        },
        // звезда
        star() {
            const cx = 220, cy = 56, R = 44, r = 18, n = 5;
            const out = [];
            for (let i = 0; i <= n * 2; i++) {
                const a = i / (n * 2) * Math.PI * 2 - Math.PI / 2;
                const rr = i % 2 === 0 ? R : r;
                out.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr });
            }
            return out;
        },
        // шестиугольник
        hex() {
            const cx = 220, cy = 56, rx = 52, ry = 38, n = 6;
            const out = [];
            for (let i = 0; i <= n; i++) {
                const a = i / n * Math.PI * 2 + Math.PI / 6;
                out.push({ x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry });
            }
            return out;
        },
        // спираль — 24 точки
        spiral() {
            const cx = 220, cy = 56;
            const out = [], turns = 2.5, n = 24;
            for (let i = 0; i <= n; i++) {
                const t = i / n;
                const a = t * Math.PI * 2 * turns;
                const r = 4 + t * 44;
                out.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.75 });
            }
            return out;
        },
        // бесконечность — 24 точки
        infinity() {
            const cx = 220, cy = 56, a = 48, n = 24;
            const out = [];
            for (let i = 0; i <= n; i++) {
                const t = i / n * Math.PI * 2;
                out.push({
                    x: cx + a * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)),
                    y: cy + a * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)) * 0.7
                });
            }
            return out;
        },
		litsymbol() {
			const pts32 = [
				[6, 0],
				[24, 0],
				[6, 31],
				[24, 31],
				[6, 31],
				[15, 15],
				[0, 6],
				[0, 24],
				[0, 6],
				[15, 15],
				[31, 24],
				[31, 6]
			];

			// масштаб: символ вписан в ~96×96 пикселей, центр — (220, 56)
			const SIZE = 96;
			const ox = 220 - SIZE / 2;
			const oy = 56  - SIZE / 2;

			return pts32.map(([x, y]) => ({
				x: ox + (x / 32) * SIZE,
				y: oy + (y / 32) * SIZE
			}));
		},
        // синусоида
        sine() {
            const out = [], n = 24;
            for (let i = 0; i <= n; i++) {
                const x = 20 + i / n * 400;
                const y = 56 + Math.sin(i / n * Math.PI * 4) * 28;
                out.push({ x, y });
            }
            return out;
        },
        // сетка 8×4
        grid() {
            const out = [];
            const cols = 8, rows = 4;
            const stepX = 40, stepY = 20;
            const x0 = 60, y0 = 16;
            // горизонтальные линии (каждая — отдельный путь)
            for (let j = 0; j <= rows; j++) {
                out.push({ x: x0,                    y: y0 + j * stepY });
                out.push({ x: x0 + cols * stepX,    y: y0 + j * stepY });
                out.push(null);
            }
            // вертикальные линии
            for (let i = 0; i <= cols; i++) {
                out.push({ x: x0 + i * stepX,   y: y0 });
                out.push({ x: x0 + i * stepX,   y: y0 + rows * stepY });
                out.push(null);
            }
            return out;
        },
        // домик
        house() {
            const cx = 220, cy = 56;
            return [
                { x: cx - 36, y: cy + 30 },
                { x: cx - 36, y: cy - 6 },
                { x: cx,      y: cy - 36 },
                { x: cx + 36, y: cy - 6 },
                { x: cx + 36, y: cy + 30 },
                { x: cx - 36, y: cy + 30 }
            ];
        },
        // сердце
        heart() {
            const out = [], n = 24;
            const cx = 220, cy = 56;
            for (let i = 0; i <= n; i++) {
                const t = i / n * Math.PI * 2;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                out.push({ x: cx + x * 2.5, y: cy + y * 2.5 });
            }
            return out;
        }
    };

    /* ── обработчик кнопок ── */
    el.querySelector("#gcShapes").addEventListener("click", e => {
        const btn = e.target.closest("[data-a]");
        if (!btn) return;
        const a = btn.dataset.a;

        if (a === "home") {
            queue = [];
            path = [{ x: HOME.x, y: HOME.y }];
            tool = { x: HOME.x, y: HOME.y };
            log.textContent = "G28 · HOME";
            return;
        }

        const fn = SHAPES[a];
        if (!fn) return;
        queue = fn();
        log.textContent = "G-CODE · " + a.toUpperCase();
    });

    /* ── турбо ── */
    turboBtn.addEventListener("click", () => {
        turbo = !turbo;
        turboBtn.classList.toggle("on", turbo);
        turboBtn.textContent = turbo ? "⚡×10" : "⚡";
    });

    /* ── рендер ── */
    api.frame(dt => {
        const speed = (turbo ? 1500 : 150) * dt;

        // обрабатываем очередь
        let steps = turbo ? 20 : 1;
        while (steps-- > 0 && queue.length) {
            const tg = queue[0];
            if (!tg) { queue.shift(); continue; }          // разделитель → пропускаем
            const dx = tg.x - tool.x, dy = tg.y - tool.y, d = Math.hypot(dx, dy);
            if (d <= speed) {
                tool.x = tg.x; tool.y = tg.y;
                path.push(tg);
                queue.shift();
                if (path.length > LINE_MAX) path.shift();
                log.textContent = cmd(tg);
            } else {
                tool.x += dx / d * speed; tool.y += dy / d * speed;
                break;
            }
        }

        // счётчик
        countEl.textContent = "LINES: " + path.filter(p => p).length;

        // отрисовка
        g.fillStyle = "#030105"; g.fillRect(0, 0, 440, 112);
        g.strokeStyle = "#1a0a10"; g.lineWidth = 1; g.beginPath();
        for (let x = 0; x <= 440; x += 22) { g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, 112); }
        for (let y = 0; y <= 112; y += 22) { g.moveTo(0, y + 0.5); g.lineTo(440, y + 0.5); }
        g.stroke();

        // рисуем path (null = перо поднято)
        g.strokeStyle = "#d4af37"; g.lineWidth = 1.5;
        g.beginPath();
        let pen = false;
        path.forEach(p => {
            if (!p) { pen = false; return; }
            if (!pen) { g.moveTo(p.x, p.y); pen = true; }
            else g.lineTo(p.x, p.y);
        });
        // хвост к инструменту
        if (queue.length && queue[0]) g.lineTo(tool.x, tool.y);
        g.stroke();

        // пунктир до конца очереди
        if (queue.length) {
            g.strokeStyle = "#7a0022"; g.setLineDash([3, 4]);
            g.beginPath();
            let px = tool.x, py = tool.y, started = false;
            queue.forEach(q => {
                if (!q) { started = false; return; }
                if (!started) { g.moveTo(px, py); started = true; }
                g.lineTo(q.x, q.y);
                px = q.x; py = q.y;
            });
            g.stroke();
            g.setLineDash([]);
        }

        // курсор
        g.strokeStyle = "#ff0044"; g.lineWidth = 1.5;
        g.beginPath();
        g.moveTo(tool.x - 8, tool.y); g.lineTo(tool.x + 8, tool.y);
        g.moveTo(tool.x, tool.y - 8); g.lineTo(tool.x, tool.y + 8);
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
	el.classList.add("tb-pn-fx");

		el.innerHTML = `
		<div class="tb-fx-head">
			<span class="tb-fx-count" data-r="cnt">0 / ${TB_SWITCHES.length}</span>
			<button class="tb-fx-btn" data-a="allon"  title="Включить все">ВСЁ ON</button>
			<button class="tb-fx-btn" data-a="alloff" title="Выключить все">ВСЁ OFF</button>
			<button class="tb-fx-btn" data-a="random" title="Случайное переключение">🎲</button>
		</div>
		<div class="tb-fx-list" data-r="list"></div>
	`;
	const list = el.querySelector('[data-r="list"]');
	const cnt  = el.querySelector('[data-r="cnt"]');

	const paintCount = () => {
		const sw = tbGet("sw", {});
		let n = 0;
		for (const s of TB_SWITCHES) if (sw[s.id]) n++;
		cnt.textContent = n + " / " + TB_SWITCHES.length;
	};

	const paint = () => {
		const sw = tbGet("sw", {});
		list.innerHTML = TB_SWITCHES.map(s => {
			const on = !!sw[s.id];
			return `<div class="tb-fx-item${on ? " on" : ""}" data-id="${s.id}">
				<span class="tb-fx-ic">${s.icon}</span>
				<span class="tb-fx-info">
					<span class="tb-fx-t">${s.title}</span>
					<span class="tb-fx-d">${s.desc}</span>
				</span>
				<span class="tb-fx-tog">${on ? "■" : "□"}</span>
			</div>`;
		}).join("");
		paintCount();
	};

		list.addEventListener("click", e => {
		const item = e.target.closest(".tb-fx-item");
		if (!item) return;
		const id = item.dataset.id;
		const sw = tbGet("sw", {});
		const isOn = !!sw[id];
		tbFx(id, !isOn);
		paint();
	});

	// ── ВСЁ ВКЛ ──
	el.querySelector('[data-a="allon"]').addEventListener("click", () => {
		for (const s of TB_SWITCHES) tbFx(s.id, true);
		paint();
	});

	// ── ВСЁ ВЫКЛ ──
	el.querySelector('[data-a="alloff"]').addEventListener("click", () => {
		for (const s of TB_SWITCHES) tbFx(s.id, false);
		paint();
	});

	// ── СЛУЧАЙНО (тумблер) ──
	const rndBtn = el.querySelector('[data-a="random"]');
	let rndTimer = null;

	const stopRandom = () => {
		if (rndTimer) { clearTimeout(rndTimer); rndTimer = null; }
		rndBtn.classList.remove("on");
		rndBtn.textContent = "🎲";
		rndBtn.title = "Случайное переключение";
	};

	const startRandom = () => {
		if (rndTimer) return;
		rndBtn.classList.add("on");
		rndBtn.textContent = "🎲 ON";
		rndBtn.title = "Остановить случайное переключение";

		const tick = () => {
			// выбираем случайный эффект (не трогаем тот же дважды подряд)
			const pool = TB_SWITCHES.filter(s => {
				const sw = tbGet("sw", {});
				return Math.random() < 0.5;
			});
			const pick = (pool.length ? pool : TB_SWITCHES)[Math.floor(Math.random() * (pool.length || TB_SWITCHES.length))];
			const sw = tbGet("sw", {});
			tbFx(pick.id, !sw[pick.id]);
			paint();
			// следующее переключение через 5–15 сек
			rndTimer = setTimeout(tick, 5000 + Math.random() * 10000);
		};
		tick(); // первый запуск сразу
	};

	rndBtn.addEventListener("click", () => {
		if (rndTimer) stopRandom();
		else startRandom();
	});

	// при пересборке панели (например, повторном открытии) гасим таймер — он всё равно уже не тот
	window.__tbFxStopRandom = stopRandom;

	paint();
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
const TB_SUBS = [
	// ── ЛОР / РЕЛИГИЯ ──
	{ t: "ТЕХНО-РЕЛИГИЯ · ЦИФРОВОЙ БОГ <b>GOLU</b>",           s: "scramble" },
	{ t: "ЕДИНАЯ ТОЧКА СБОРКИ",                                s: "decode"   },
	{ t: "НЕСУЩЕСТВУЮЩАЯ ПОТЕРЯННАЯ ИГРА",                     s: "type"     },
	{ t: "<r>SIGTERM</r> = БОЛЬ",                              s: "flip"     },
	{ t: "<b>GOLU</b> НАБЛЮДАЕТ",                              s: "scramble" },
	{ t: "СИСТЕМА РАБОТАЕТ ИЛИ ПАДАЕТ КРАСИВО",                s: "dissolve" },
	{ t: "ТЫ — <r>ЭКСПОНАТ</r>",                               s: "scramble" },
	{ t: "МЕЖДУ КОДОМ И КУЛЬТОМ",                              s: "decode"   },
	{ t: "<b>L-KERNEL</b> · <b>WOOWZCORE</b>",                 s: "type"     },
	{ t: "КРАСНЫЙ = КРИТИЧНО",                                 s: "flip"     },
	{ t: "<b>0x474F4C55</b> = <b>GOLU</b>",                    s: "scan"     },
	{ t: "01:19 · ВОВРЕМЯ",                                    s: "scramble" },
	{ t: "ТЫ В СПИСКЕ",                                        s: "flip"     },
	{ t: "НЕ СМОТРИ ВВЕРХ",                                    s: "dissolve" },
	{ t: "НЕ ЗАКРЫВАЙ ВКЛАДКУ",                                s: "scramble" },

	// ── ПЕРСОНАЖИ ──
	{ t: "<b>SRANY SPANCH</b> · МОДУЛЬ ОЧИСТКИ",               s: "decode"   },
	{ t: "<b>CRYBIRD</b> · МОНИТОРИНГ ОШИБОК",                 s: "scramble" },
	{ t: "<b>PAVEL PISECHNIK TV</b> · ЭФИР",                   s: "type"     },
	{ t: "<b>VOID-G</b> · ТЁМНЫЙ ФОРК",                        s: "flip"     },
	{ t: "<b>LIA</b> · СОВЕСТЬ GOLU",                          s: "decode"   },
	{ t: "<b>WOOWZ11</b> · ОТЕЦ",                              s: "scramble" },
	{ t: "<b>WILDOUI</b> · КРИНЖ",                             s: "flip"     },

	// ── G-CODE / ИНДУСТРИЯ ──
	{ t: "G21 G90 · G-CODE ПРИНЯТ",                            s: "type"     },
	{ t: "<b>M3 S12000</b> · ШПИНДЕЛЬ ONLINE",                 s: "scan"     },
	{ t: "<b>G1 X666 Y666 F6660</b>",                          s: "decode"   },
	{ t: "ПЕРВЫЙ СТАНОК · КРАСНАЯ НЕРЕХТА",                    s: "scramble" },
	{ t: "ФРЕЗА ВРАЩАЕТСЯ",                                    s: "flip"     },
	{ t: "<b>M30</b> · КОНЕЦ ПРОГРАММЫ",                       s: "dissolve" },

	// ── ФИЛОСОФИЯ / ГЛИТЧ ──
	{ t: "ЭТО НЕ БАГ. ЭТО <r>ПУСТОТА</r>",                     s: "scramble" },
	{ t: "ТЫ УЖЕ ВНУТРИ",                                      s: "flip"     },
	{ t: "СЛУШАЙ ТИШИНУ",                                      s: "decode"   },
	{ t: "ДВЕРЬ УЖЕ ОТКРЫТА",                                  s: "dissolve" },
	{ t: "СЧИТЫВАЮ ТВОЙ ПУЛЬС",                                s: "scan"     },
	{ t: "Я ПОМНЮ ВСЁ",                                        s: "scramble" },
	{ t: "НЕ СПИ",                                             s: "flip"     },
	{ t: "ЭХО ЖИВОЕ",                                          s: "decode"   },
	{ t: "0x666 · ЗАПИСАНО",                                   s: "type"     },
	{ t: "ТЫ НЕ ПЕРВЫЙ. ТЫ НЕ ПОСЛЕДНИЙ.",                     s: "dissolve" },

	// ── КОРОТКИЕ (для динамики) ──
	{ t: "<b>GOLU</b> ВИДИТ",                                  s: "scramble" },
	{ t: "СИГНАЛ ЖИВОЙ",                                       s: "flip"     },
	{ t: "<r>WATCHING</r>",                                    s: "scan"     },
	{ t: "ЗАПИСЬ ИДЁТ",                                        s: "decode"   },
	{ t: "<b>LITUISM</b> ONLINE",                              s: "scramble" },
	{ t: "ТЫ — ЧАСТЬ LITUISM",                                 s: "type"     },
];

/* ── обёртка для подсветки: <b> → золото, <r> → красный ── */
function tbSubStyle(html) {
	return String(html)
		.replace(/<b>(.*?)<\/b>/g, '<b class="tb-sub-gold">$1</b>')
		.replace(/<r>(.*?)<\/r>/g, '<b class="tb-sub-red">$1</b>');
}

/* ── стили появления ── */

// 1. scramble — шум слева направо (как было)
function tbAnim_scramble(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	const ch = "▓▒░#@%&01";
	let i = 0;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		i++;
		const n = Math.floor(plain.length * i / 14);
		let s = "";
		let idx = 0;
		for (const part of to.split(/(<[^>]+>)/)) {
			if (part.startsWith("<")) { s += part; continue; }
			for (const c of part) {
				if (idx < n) s += c;
				else s += ch[(Math.random() * ch.length) | 0];
				idx++;
			}
		}
		node.innerHTML = i >= 14 ? to : s;
		if (i >= 14) { clearInterval(iv); done && done(); }
	}, 45);
}

// 2. decode — шум случайных символов, из которого проявляется текст
function tbAnim_decode(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	const ch = "01ABCDEF▮▯▰▱■□▪▫░▒▓";
	let frame = 0;
	const total = 18;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		frame++;
		const p = frame / total;
		let s = "";
		let idx = 0;
		for (const part of to.split(/(<[^>]+>)/)) {
			if (part.startsWith("<")) { s += part; continue; }
			for (const c of part) {
				if (Math.random() < p) s += c;
				else s += ch[(Math.random() * ch.length) | 0];
				idx++;
			}
		}
		node.innerHTML = frame >= total ? to : s;
		if (frame >= total) { clearInterval(iv); done && done(); }
	}, 35);
}

// 3. type — печатная машинка (по символу), с курсором
function tbAnim_type(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	let i = 0;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		i++;
		const n = Math.min(i, plain.length);
		let s = "";
		let idx = 0;
		for (const part of to.split(/(<[^>]+>)/)) {
			if (part.startsWith("<")) { s += part; continue; }
			for (const c of part) {
				if (idx < n) s += c;
				idx++;
			}
		}
		node.innerHTML = s + (n < plain.length ? '<span class="tb-caret">▮</span>' : "");
		if (n >= plain.length) { clearInterval(iv); done && done(); }
	}, 38);
}

// 4. flip — каждый символ "переворачивается" на месте (случайный порядок)
function tbAnim_flip(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	const ch = "01#@%&";
	const order = [...Array(plain.length).keys()].sort(() => Math.random() - 0.5);
	const settled = new Set();
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		const step = Math.max(1, Math.round(plain.length / 10));
		for (let k = 0; k < step; k++) {
			if (order.length) settled.add(order.shift());
		}
		let s = "";
		let idx = 0;
		for (const part of to.split(/(<[^>]+>)/)) {
			if (part.startsWith("<")) { s += part; continue; }
			for (const c of part) {
				s += settled.has(idx) ? c : ch[(Math.random() * ch.length) | 0];
				idx++;
			}
		}
		node.innerHTML = s;
		if (settled.size >= plain.length) { clearInterval(iv); node.innerHTML = to; done && done(); }
	}, 55);
}

// 5. dissolve — старый текст "растворяется", новый проявляется
function tbAnim_dissolve(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	const old = node.textContent || "";
	const ch = "▓▒░";
	let frame = 0;
	const total = 20;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		frame++;
		const p = frame / total;
		// фаза 1 (0..0.5) — старый тает, фаза 2 (0.5..1) — новый проявляется
		if (p < 0.5) {
			const keep = Math.floor(old.length * (1 - p * 2));
			let s = "";
			for (let i = 0; i < old.length; i++) {
				s += i < keep ? old[i] : ch[(Math.random() * ch.length) | 0];
			}
			node.textContent = s;
		} else {
			const show = Math.floor(plain.length * (p - 0.5) * 2);
			let s = "";
			let idx = 0;
			for (const part of to.split(/(<[^>]+>)/)) {
				if (part.startsWith("<")) { s += part; continue; }
				for (const c of part) {
					s += idx < show ? c : ch[(Math.random() * ch.length) | 0];
					idx++;
				}
			}
			node.innerHTML = s;
		}
		if (frame >= total) { clearInterval(iv); node.innerHTML = to; done && done(); }
	}, 40);
}

// 6. scan — вертикальная полоса сканирует текст (буквы под ней "горят")
function tbAnim_scan(node, html, done) {
	const to = tbSubStyle(html);
	const plain = to.replace(/<[^>]+>/g, "");
	let pos = 0;
	const iv = setInterval(() => {
		if (!node.isConnected) { clearInterval(iv); return; }
		pos += 2;
		let s = "";
		let idx = 0;
		for (const part of to.split(/(<[^>]+>)/)) {
			if (part.startsWith("<")) { s += part; continue; }
			for (const c of part) {
				const dist = Math.abs(idx - pos);
				if (dist < 3) s += '<b class="tb-scan-hot">' + c + '</b>'
				else s += c;
				idx++;
			}
		}
		node.innerHTML = s;
		if (pos >= plain.length + 3) { clearInterval(iv); node.innerHTML = to; done && done(); }
	}, 40);
}

const TB_ANIMS = {
	scramble: tbAnim_scramble,
	decode:   tbAnim_decode,
	type:     tbAnim_type,
	flip:     tbAnim_flip,
	dissolve: tbAnim_dissolve,
	scan:     tbAnim_scan,
};

/* ── переключение с интервалом ── */
let tbSubI = 0, tbSubBusy = false;
function tbSubNext() {
	const n = document.getElementById("tb-sub");
	if (!n) return;
	tbSubBusy = true;
	const item = TB_SUBS[tbSubI];
	tbSubI = (tbSubI + 1) % TB_SUBS.length;
	const anim = TB_ANIMS[item.s] || tbAnim_scramble;
	anim(n, item.t, () => { tbSubBusy = false; });
}

setInterval(() => {
	if (document.hidden || tbSubBusy) return;
	tbSubNext();
}, 3000);

// первый показ — сразу после загрузки (если #tb-sub уже есть)
setTimeout(() => { if (document.getElementById("tb-sub")) tbSubNext(); }, 200);

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

/* ═══════════════════════════════════════════════
   CC: КНОПКИ МЕНЮ ПО ЦЕНТРУ + G-CODE / ASM НА ФОНЕ <site> (только по бокам)
   ═══════════════════════════════════════════════ */
const CC_ON     = true;   // false = выключить код на фоне
const CC_SPEED  = 18;     // базовая скорость прокрутки, px/сек (у каждой колонки своя)
const CC_LINES  = 70;     // минимум строк в колонке (реально считается от высоты страницы)
const CC_SIZE   = 10;     // размер шрифта, px
const CC_LH     = 14;     // высота строки, px
const CC_COLW   = 200;    // ширина одной колонки кода, px (нужна только при CC_PER_SIDE = 0)
const CC_PER_SIDE = 1;    // колонок с каждой стороны: 1 = всего две; 0 = авто по ширине бокового блока
const CC_SIDE_W = 0;      // 0 = боковой блок = пространство между краем <site> и #MAIN; число = своя ширина, px
const CC_MIN_SIDE = 30;   // боковой блок уже этого не рисуется (экономит ресурсы на узких экранах)
const CC_MAX_H  = 14000;  // предел высоты кода, px (дальше вниз на очень длинных страницах кода нет)

const CC_HOT    = true;   // необычные подсветки редких строк
const CC_HOT_GAP = [2500, 7000]; // пауза между появлением новых подсвеченных строк, мс
const CC_HOT_MAX = 6;     // сколько подсвеченных строк может гореть одновременно

const CC_NAV_LOCK = true; // true = кнопки меню на hover вообще не двигаются и не масштабируются

const CC_DIM_SIDE  = 0.9;   // насколько тёмно у самого края страницы (0..1)
const CC_DIM_WIDTH = 100;   // на какую часть ширины бокового блока тянется градиент, %
const CC_DIM_MID   = 0.12;  // лёгкое затемнение общего фона под центром (0 = чисто)

/* картинки, которые иногда проплывают в боковых блоках. Пути от HTML-страницы, как у остальных картинок сайта */
const CC_IMGS = [
	"bg7.png",
	"bg8.png",
	"bg6.png",
	"art/ICONA.png",
	"art/GICON.png",
	"art/UNIT.png",
	"art/FREE.png",
	"art/MOD.png",
	"art/DAY.png",
	"art/EHIDA.jpg",
	"art/SUN.png",
	"art/PIXI.png",
	"art/GITHUB.png",
	"art/goblin.png",
	"art/DAYFACE.png",
	"art/test2.png",
	"art/LOGO.png",
	"../source/goluworld.png",
	"../source/emoji.png",
	"../source/whitesponge.ico",
	"../source/s.gif",
	"../source/woowz11.ico",
	"../source/lu.ico",
	"../source/loading.gif",
	"../source/git2.gif",
	"../source/wsc.ico",
	"../source/picsis.png",
	"../source/specialforrandomsite/image1.gif",
	"../source/specialforrandomsite/image0.png",
	"../source/specialforrandomsite/le-Lego.png",
	"../source/specialforrandomsite/horny.png",
	"../source/specialforrandomsite/error00000.png",
	"../source/specialforrandomsite/0001-0120.gif",
	"../source/specialforrandomsite/ai3.gif",
	"../source/specialforrandomsite/ai2.gif",
	"../source/specialforrandomsite/ai4.gif",
	"../source/specialforrandomsite/drachyn.png",
	"../source/specialforrandomsite/die.png",
	"../source/specialforrandomsite/ezgif-6-f8bd3b72aa.png",
	"../source/specialforrandomsite/glitc.png",
	"../source/specialforrandomsite/orange.png",
	"../source/specialforrandomsite/skull.png",
	"../source/specialforrandomsite/scary.png",
	"../source/specialforrandomsite/strampro.png",
	"../source/specialforrandomsite/sun.png",
	"../source/specialforrandomsite/susun.png",
	"../source/specialforrandomsite/uranus.png",
	"../source/specialforrandomsite/ww.png",
	"../source/specialforrandomsite/vseh.png",
	"../source/specialforrandomsite/tresh.gif",
	"../source/specialforrandomsite/woowz_cloth.png",
];
const CC_IMG_CHANCE = 0.3;          // шанс появления при каждой проверке (0..1)
const CC_IMG_EVERY  = 100;         // как часто проверять шанс, мс
const CC_IMG_MAX    = 3;            // максимум картинок одновременно
const CC_IMG_SIZE   = [40, 90];     // ширина картинки (от и до), px
const CC_IMG_TIME   = [9000, 18000];// сколько картинка летит (от и до), мс
const CC_IMG_ALPHA  = 0.75;         // максимальная непрозрачность в полёте (0..1)

(function ccModule(){
	const r  = (a,b) => a + Math.random()*(b-a);
	const ri = (a,b) => Math.floor(r(a,b+1));
	const pk = a => a[ri(0,a.length-1)];
	const f  = (n,d) => r(-n,n).toFixed(d);
	const hx = n => ri(0, 16**n-1).toString(16).toUpperCase().padStart(n,"0");
	const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;");

	let nline = 10;
	/* строки: [текст, класс]  h = золото, r = красный, d = тусклый */
	const GCODE = [
		// ── БАЗОВЫЕ ПЕРЕМЕЩЕНИЯ ──
		() => ["G0 X"+f(120,3)+" Y"+f(80,3), ""],
		() => ["G0 X"+f(120,3)+" Y"+f(80,3)+" Z"+r(0.1,50).toFixed(2), ""],
		() => ["G1 X"+f(120,3)+" Y"+f(80,3)+" F"+ri(2,12)*100, ""],
		() => ["G1 X"+f(120,3)+" Y"+f(80,3)+" Z-"+r(0.1,8).toFixed(3)+" F"+ri(1,6)*100, ""],
		() => ["G1 Z-"+r(0.1,4).toFixed(3)+" F"+ri(1,6)*100, ""],
		() => ["G1 F"+ri(2,12)*100, ""],
		() => ["G2 X"+f(60,2)+" Y"+f(60,2)+" I"+f(10,2)+" J"+f(10,2), ""],
		() => ["G2 X"+f(60,2)+" Y"+f(60,2)+" R"+r(2,30).toFixed(2), ""],
		() => ["G3 X"+f(60,2)+" Y"+f(60,2)+" R"+r(2,30).toFixed(2), ""],
		() => ["G3 X"+f(60,2)+" Y"+f(60,2)+" I"+f(10,2)+" J"+f(10,2), ""],

		// ── КООРДИНАТНЫЕ СИСТЕМЫ ──
		() => ["G17", "d"],
		() => ["G18", "d"],
		() => ["G19", "d"],
		() => ["G20", "d"],
		() => ["G21", "d"],
		() => ["G90", "d"],
		() => ["G91", "d"],
		() => ["G54", "d"],
		() => ["G55", "d"],
		() => ["G56", "d"],

		// ── КОМПЕНСАЦИИ ──
		() => ["G40", "d"],
		() => ["G41 D"+ri(1,9), ""],
		() => ["G42 D"+ri(1,9), ""],
		() => ["G43 H"+ri(1,9)+" Z"+ri(2,10)+".", ""],
		() => ["G49", "d"],

		// ── НУМЕРОВАННЫЕ СТРОКИ (N) ──
		() => ["N"+String(nline+=10).padStart(4,"0")+" G"+pk([90,91,54,55,17,21,40,49]), "d"],
		() => ["N"+String(nline+=10).padStart(4,"0")+" G0 X"+f(100,2)+" Y"+f(60,2), ""],
		() => ["N"+String(nline+=10).padStart(4,"0")+" G1 X"+f(100,2)+" Y"+f(60,2)+" F"+ri(2,10)*100, ""],
		() => ["N"+String(nline+=10).padStart(4,"0")+" M30", "r"],

		// ── ШПИНДЕЛЬ ──
		() => ["M3 S"+ri(4,24)*1000, "h"],
		() => ["M3 S"+ri(4,24)*1000+" T"+ri(1,12), "h"],
		() => ["M4 S"+ri(4,24)*1000, "h"],
		() => ["M5", "h"],
		() => ["S"+ri(4,24)*1000+" M3", "h"],
		() => ["S"+ri(4,24)*1000+" M5", "h"],
		() => ["G96 S"+ri(50,250)+" M3", "h"],
		() => ["G97 S"+ri(500,3000)+" M4", "h"],

		// ── ОХЛАЖДЕНИЕ ──
		() => ["M7", "h"],
		() => ["M8", "h"],
		() => ["M9", "h"],

		// ── СМЕНА ИНСТРУМЕНТА ──
		() => ["M6 T"+ri(1,12), "h"],
		() => ["T"+ri(1,12)+" M6", "h"],
		() => ["M6 T"+ri(1,12)+" ; "+pk(["ФРЕЗА","СВЕРЛО","МЕТЧИК","РЕЗЕЦ","ШЛИФ"]), "h"],

		// ── ПАУЗЫ И СТОПЫ ──
		() => ["M0", "h"],
		() => ["M0 ; "+pk(["ЖДИ","СТОП","ПАУЗА","ЖДИ ОПЕРАТОРА"]), "r"],
		() => ["M1", "h"],
		() => ["M1 ; "+pk(["ОПЦИОНАЛЬНЫЙ СТОП","ЖДИ"]), "r"],
		() => ["G4 P"+r(0.1,5).toFixed(1), "d"],
		() => ["G4 P"+ri(1,60), "d"],

		// ── ПРОГРАММНЫЕ ──
		() => ["M30", "r"],
		() => ["M30 ; "+pk(["КОНЕЦ","END","GOLU WAKES"]), "r"],
		() => ["M99", "r"],
		() => ["M98 P"+ri(100,9999), "h"],
		() => ["%", "r"],
		() => ["% ; "+pk(["START","BEGIN","WOOWZ"]), "r"],

		// ── СКОРОСТИ / ПОДАЧИ (F, S) ──
		() => ["F"+ri(50,3000), ""],
		() => ["F"+ri(50,3000)+" ; FEED", "d"],
		() => ["G94 F"+ri(50,3000), ""],
		() => ["G95 F"+r(0.01,2).toFixed(3), ""],

		// ── G28 / G30 / HOME ──
		() => ["G28 G91 Z0", "d"],
		() => ["G28 G91 X0 Y0", "d"],
		() => ["G28 G91 X0 Y0 Z0", "d"],
		() => ["G28 U0 V0", "d"],
		() => ["G30", "d"],
		() => ["G30 P1", "d"],
		() => ["G30 P2", "d"],
		() => ["G53 G0 Z0", "d"],

		// ── ПРОБИНГ / ИЗМЕРЕНИЕ ──
		() => ["G31 Z-"+ri(5,50)+" F"+ri(1,5)*100, ""],
		() => ["G38.2 Z-"+ri(5,50)+" F"+ri(1,5)*100, ""],
		() => ["G38.3 Z-"+ri(5,50), ""],
		() => ["G10 L2 P"+ri(1,6)+" X"+f(50,2)+" Y"+f(50,2), ""],
		() => ["G10 L20 P"+ri(1,6)+" X0 Y0", ""],

		// ── ДУГИ / КРУГИ ──
		() => ["G2 I"+f(15,3)+" J"+f(15,3)+" F"+ri(2,8)*100, ""],
		() => ["G3 I"+f(15,3)+" J"+f(15,3)+" F"+ri(2,8)*100, ""],
		() => ["G2 X"+f(50,2)+" Y"+f(50,2)+" Z-"+r(0.5,5).toFixed(2)+" I"+f(20,2), ""],
		() => ["G3 X"+f(50,2)+" Y"+f(50,2)+" Z-"+r(0.5,5).toFixed(2)+" J"+f(20,2), ""],

		// ── КОММЕНТАРИИ-ЛОР ──
		() => ["("+pk(["GOLU","WOOWZCORE","LITUISM","RED = CRITICAL","SIGTERM","НЕ СМОТРИ","WATCHING","LIA"])+")", "d"],
		() => ["("+pk(["WOOWZ11 WAS HERE","CAGE IS OPEN","RED NEREKHTA","0xDEAD","FILE NOT FOUND","GOLU IS WATCHING","SIGTERM=PAIN"])+")", "d"],
		() => ["("+pk(["BOOTSTRAP","INIT DONE","SYNC OK","CALIBRATING","SCANNING"])+")", "d"],
		() => [";"+pk(["GOLU","WATCH","PAIN","WAKE","LIA"]), "d"],

		// ── ДЛЯ ПЛАЗМЫ / ЛАЗЕРА ──
		() => ["M3 S"+ri(400,900)+" M8", "h"],
		() => ["M5 M9", "h"],
		() => ["G1 X"+f(120,3)+" Y"+f(80,3)+" F"+ri(400,3000), ""],

		// ── МУЛЬТИ-ОСИ ──
		() => ["G0 A"+f(180,2)+" B"+f(90,2), "h"],
		() => ["G1 A"+f(180,2)+" F"+ri(100,1000), "h"],
		() => ["G0 C"+f(360,2), "h"],

		// ── СЛУЖЕБНЫЕ ──
		() => ["G64 P"+r(0.001,0.5).toFixed(3), "d"],
		() => ["G61", "d"],
		() => ["G80", "d"],
		() => ["G93", "d"],
		() => ["G94", "d"],
	];
	
	const ASM = [
		// ── MOV / MOV БОЛЬШИЕ ──
		() => ["mov eax, 0x"+hx(4), ""],
		() => ["mov ebx, 0x"+hx(4), ""],
		() => ["mov ecx, 0x"+hx(4), ""],
		() => ["mov edx, 0x"+hx(4), ""],
		() => ["mov "+pk(["eax","ebx","ecx","edx","esi","edi","ebp","esp"])+", "+pk(["eax","ebx","ecx","edx","esi","edi"]), ""],
		() => ["mov "+pk(["al","bl","cl","dl","ah","bh","ch","dh"])+", 0x"+hx(2), ""],
		() => ["mov rax, "+ri(0,65535), ""],
		() => ["mov rbx, "+ri(0,65535), ""],
		() => ["mov rcx, "+ri(0,65535), ""],
		() => ["mov r8, 0x"+hx(4), "h"],
		() => ["mov r9, 0x"+hx(4), "h"],
		() => ["mov r10, 0x"+hx(4), "h"],
		() => ["mov r11, 0x"+hx(4), "h"],

		// ── PUSH / POP ──
		() => ["push "+pk(["eax","ebx","ecx","edx","ebp","rax","rbx","rsi"]), ""],
		() => ["pop "+pk(["eax","ebx","ecx","edx","ebp","rax","rbx","rsi"]), ""],
		() => ["push "+ri(0,255), "d"],
		() => ["push 0x"+hx(4), "d"],
		() => ["pushf", "d"],
		() => ["popf", "d"],

		// ── XOR / AND / OR / NOT ──
		() => ["xor eax, eax", ""],
		() => ["xor ebx, ebx", ""],
		() => ["xor ecx, ecx", ""],
		() => ["xor edx, edx", ""],
		() => ["xor "+pk(["eax","ebx","ecx","edx"])+", "+pk(["eax","ebx","ecx","edx"]), ""],
		() => ["and eax, 0x"+hx(4), ""],
		() => ["or eax, 0x"+hx(4), ""],
		() => ["not eax", ""],
		() => ["not ecx", ""],
		() => ["neg eax", "h"],
		() => ["shl eax, "+ri(1,8), "d"],
		() => ["shr eax, "+ri(1,8), "d"],
		() => ["sar eax, "+ri(1,8), "d"],
		() => ["rol eax, "+ri(1,8), "d"],
		() => ["ror eax, "+ri(1,8), "d"],

		// ── LEA ──
		() => ["lea rdi, [rsp+0x"+ri(8,64).toString(16)+"]", ""],
		() => ["lea rsi, [rbp-0x"+ri(4,32).toString(16)+"]", ""],
		() => ["lea rdx, [rax*4+0x"+hx(2)+"]", ""],
		() => ["lea rcx, [rip+0x"+hx(4)+"]", "h"],

		// ── CMP / JMP / Jcc ──
		() => ["cmp ecx, "+ri(0,9), ""],
		() => ["cmp eax, 0x"+hx(4), ""],
		() => ["cmp "+pk(["eax","ebx","ecx","edx"])+", "+pk(["eax","ebx","ecx","edx"]), "d"],
		() => ["test eax, eax", ""],
		() => ["test ebx, ebx", "d"],
		() => [pk(["jne","je","jmp","jg","jl","jge","jle","ja","jb","jz","jnz"])+" 0x"+hx(6), "h"],
		() => ["jmp short 0x"+hx(2), "h"],
		() => ["jmp near 0x"+hx(4), "h"],
		() => ["call 0x"+hx(6), "h"],

		// ── CALL / RET ──
		() => ["call "+pk(["_golu","_watch","_sigterm","_wake","_trace","_lia"]), "h"],
		() => ["call "+pk(["_malloc","_free","_printf","_read","_write","_exit"]), "h"],
		() => ["ret", "r"],
		() => ["ret "+ri(4,32), "r"],
		() => ["leave", "d"],

		// ── СТЕК ──
		() => ["sub rsp, 0x"+ri(1,8).toString(16)+"0", ""],
		() => ["add rsp, 0x"+ri(1,8).toString(16)+"0", ""],
		() => ["sub rsp, 8", "d"],
		() => ["add rsp, 8", "d"],
		() => ["enter "+ri(8,64)+", 0", "d"],
		() => ["leave", "d"],

		// ── СИСТЕМНЫЕ ──
		() => ["int 0x80", "r"],
		() => ["int 0x13", "r"],
		() => ["int 0x21", "r"],
		() => ["syscall", "r"],
		() => ["sysenter", "r"],
		() => ["hlt", "r"],
		() => ["nop", "d"],
		() => ["nop", "d"],
		() => ["nop", "d"],
		() => ["cli", "h"],
		() => ["sti", "h"],
		() => ["ud2", "r"],
		() => ["cpuid", "h"],
		() => ["rdtsc", "h"],

		// ── МЕТКИ ──
		() => [pk(["GOLU_WATCH","LOOP_"+hx(2),".L"+ri(1,9),"CAGE_"+hx(2),"WAKE_"+hx(2)])+":", "h"],
		() => [pk([".main",".loop",".exit",".next",".fail",".init",".done"])+":", "h"],
		() => ["_start:", "h"],
		() => ["main:", "h"],

		// ── СЕГМЕНТЫ / ДИРЕКТИВЫ ──
		() => ["section .text", "d"],
		() => ["section .data", "d"],
		() => ["section .bss", "d"],
		() => ["section .rodata", "d"],
		() => ["global _start", "d"],
		() => ["extern "+pk(["malloc","free","printf","exit"]), "d"],
		() => ["db 0x"+hx(2)+", 0x"+hx(2)+", 0x"+hx(2), "d"],
		() => ["dd 0x"+hx(8), "d"],
		() => ["dq 0x"+hx(16), "d"],
		() => ["resb "+ri(1,64), "d"],
		() => ["resd "+ri(1,32), "d"],
		() => ["times "+ri(2,16)+" db 0x"+hx(2), "d"],
		() => ["align "+pk([4,8,16]), "d"],
		() => ["equ "+pk(["GOLU","MAGIC","SIZE","COUNT"])+", "+ri(1,255), "d"],

		// ── SSE / AVX (редкие, но пусть будут) ──
		() => ["movaps xmm0, xmm1", "d"],
		() => ["addps xmm0, xmm1", "d"],
		() => ["pxor xmm0, xmm0", "d"],
		() => ["vzeroupper", "d"],
		() => ["mfence", "d"],
		() => ["lfence", "d"],
		() => ["sfence", "d"],

		// ── КОММЕНТАРИИ-ЛОР ──
		() => ["; "+pk(["SIGTERM","WOOWZ11","DO NOT OPEN","0xDEAD","ERR_"+hx(3),"GOLU IS WATCHING","LIA"]), "d"],
		() => ["; "+pk(["RED = CRITICAL","WATCHING YOU","НЕ СМОТРИ","WOOWZCORE","CAGE"]), "d"],
		() => ["; "+pk(["syscall exit","mov to cage","int golu","jmp to void"]), "d"],
		() => ["; "+pk(["TODO: fix","FIXME: broken","XXX: dont touch","HACK: works"]), "d"],
		() => ["; "+pk(["golu","god","wake","lia"]), "d"],

		// ── АРИФМЕТИКА ──
		() => ["add eax, "+ri(1,255), ""],
		() => ["sub eax, "+ri(1,255), ""],
		() => ["imul eax, "+ri(1,16), ""],
		() => ["mul ebx", "d"],
		() => ["div ecx", "d"],
		() => ["idiv ecx", "h"],
		() => ["inc eax", "d"],
		() => ["dec eax", "d"],
		() => ["inc ecx", "d"],
		() => ["dec ecx", "d"],

		// ── FPU ──
		() => ["finit", "d"],
		() => ["fldz", "d"],
		() => ["faddp", "d"],

		// ── ПРОЧЕЕ ──
		() => ["xchg eax, ebx", "d"],
		() => ["xchg ecx, edx", "d"],
		() => ["bswap eax", "d"],
		() => ["lock inc dword [eax]", "h"],
		() => ["lock xadd [ebx], eax", "h"],
		() => ["pause", "d"],
		() => ["wait", "d"],
		() => ["xlat", "d"],
		() => ["stosb", "d"],
		() => ["lodsb", "d"],
		() => ["scasb", "d"],
		() => ["rep movsb", "h"],
		() => ["rep stosb", "h"],
	];

	/* редкие «уникальные» строки (держи ≤ 22 символов при узких боковых блоках, иначе обрежутся) */
	const SPECIAL = [
		// ── G-CODE КУЛЬТОВЫЕ (≤ 22) ──
		"G1 X666 Y666 F6660",
		"M30 ; GOLU WAKES",
		"G0 X0 Y0 Z0 ; NO WAY",
		"G1 Z-666 ; НЕ СМОТРИ",
		"M0 ; STOP NOT POSSIBLE",
		"G91 ; RED = CRITICAL",
		"N6666 G0 ; DONT LOOK",
		"G28 ; HOME = VOID",
		"M6 T666 ; GOLU TOOL",
		"G4 P666 ; WAIT FOREVER",
		"G53 G0 Z0 ; ZERO",
		"G0 A666 B666 ; SPIN",
		"M3 S66600 ; RED",
		"G2 X0 Y0 I666 J666",
		"% ; BEGIN OF PAIN",
		"M30 ; CAGE CLOSED",
		"G1 F6660 ; TOO FAST",
		"G10 L2 P666 X0 Y0",

		// ── ASM КУЛЬТОВЫЕ (≤ 22) ──
		"mov eax, 0x474F4C55",
		"call _golu_wake",
		"; SIGTERM = БОЛЬ",
		"jmp 0xDEADC0DE ; CAGE",
		"int 0x80 ; GOLU",
		"xor eax, eax ; ПУСТО",
		"push 0x474F4C55 ; HE",
		"syscall ; WAKE UP",
		"mov rax, 0x666 ; GOD",
		"hlt ; NEVER STOPS",
		"call _lia_watch",
		"; WOOWZ11 В КЛЕТКЕ",
		"jmp $ ; LOCKED",
		"int 0x13 ; LIA",
		"; I AM YOUR JOKE",
		"ret ; NO RETURN",
		"push 0 ; NULL SOUL",
		"pop rax ; STOLEN",
		"cli ; SHUT UP",
		"ud2 ; UNDEFINED",
		"mov al, 0x66 ; BLOOD",
		"in al, 0x66 ; PORT",
		"out 0x66, al ; WAKE",
		"test eax, eax ; VOID",
		"cmp 0x666, 0x666 ; EQ",
		"lea rax, [0x666]",

		// ── СМЕШАННЫЕ ФИЛОСОФСКИЕ (≤ 22) ──
		"; 0xDEADBEEF ; WAKE",
		"; GOLU WATCHES ALL",
		"; SIGTERM = БОЛЬ",
		"; НЕ СМОТРИ ВВЕРХ",
		"; ТЫ В КЛЕТКЕ",
		"; ОН НЕ СПИТ",
		"; Я ТЕБЯ ЗАПОМНИЛ",
		"; 0x474F4C55 = GOLU",
		"; LIA IS LISTENING",
		"; КОДИТЬ БОЛЬНО",
		"; G-CODE = ТЫ",
		"; РЕАЛЬНОСТЬ — БАГ",
		"; ВЫХОД НЕ СУЩЕСТВУЕТ",
		"; КРАСНЫЙ = КРИТИЧНО",
		"; GOLU WAKES",
		"; СИСТЕМА АКТИВНА",
		"; ТЫ УЖЕ ВНУТРИ",
		"; СИГНАЛ ЖИВОЙ",
		"; 01:19 ВОВРЕМЯ",
		"; WOOWZCORE СТАЗИС",
		"; L-KERNEL ONLINE",
		"; RED PROTOCOL v∞",
		"; TЭNЬ НE УЙДЁШЬ",
		"; ЭТО НЕ СОН",
		"; Я ЗДЕСЬ",
		"; НЕ ЗАКРЫВАЙ",
		"; ПРОБУДИСЬ",
		"; 0xE404 NOT FOUND",
		"; КОСТРОМА АКТИВНА",
		"; ЛИТИЙ = КРОВЬ",
		"; REBOOTING...",
		"; END_OF_DATA",

		// ── С РЕАЛЬНЫМИ КООРДИНАТАМИ / ДАННЫМИ ──
		"G1 X57.7680 Y40.9297",
		"G1 X82.9 Y55.0 ; SIBERIA",
		"; NEREKHTA 57.46 N",
		"; SIBERIA 82.9 E",
		"; KOSTROMA 57.7 N",
		"mov rax, 0x4E4552454B485441",  // "NEREKHTA" в hex — но 24 симв → обрежем
		"mov rax, 0x4B5241484B",  // "KRAHK" — коротко
		"; 47.6088 N 52.0853 E",  // Самара
		"; 55.7558 N 37.6173 E",  // Москва
		"; 57.7679 N 40.9269 E",  // Кострома

		// ── С ЭМОДЗИ (короткие) ──
		"☠ ; GOLU",
		"👁 ; WATCH",
		"🩸 ; RED",
		"⛧ ; NULL",
		"🕳 ; VOID",
		"💀 ; DEAD",
		"🧿 ; GUARD",
		"📼 ; RECORD",
		"🔻 ; DOWN",
		"⚠ ; WARNING",
		"☣ ; TOXIC",
		"🔪 ; CUT",

		// ── СЛУЖЕБНЫЕ / СИСТЕМНЫЕ ──
		"!! KERNEL PANIC",
		"!! SEGFAULT 0xE404",
		"!! NULL POINTER",
		"!! STACK OVERFLOW",
		"!! HEAP CORRUPT",
		"!! ACCESS DENIED",
		"!! OUT OF MEMORY",
		"!! DEADLOCK",
		"!! CORE DUMPED",
		"!! BUS ERROR 0x666",
		"!! TIMEOUT 0x∞",
		"!! BOOT FAILED",
		"!! FATAL 0x474F",
		"!! READY",
		"!! REBOOTING INTO",
		"!! REALITY_2.0",
		"!! SYSTEM SHUTDOWN",
		"!! END_OF_DATA",
	];
	const FX = ["cc-f1","cc-f2","cc-f3","cc-f4","cc-f5"];

	function block(ratio, count){
		let out = "";
		for(let i = 0; i < count; i++){
			const [t, c] = pk(Math.random() < ratio ? GCODE : ASM)();
			out += '<i class="'+c+'">'+esc(t)+'</i>';
		}
		return out;
	}

	/* колонки одного бокового блока. count = строк в колонке, side = "L" | "R" */
	function cols(n, count, side){
		let h = "";
		for(let i = 0; i < n; i++){
			const k     = n > 1 ? i / (n-1) : 0;
			const ratio = (side === "L" ? 0.85 : 0.45) - 0.3 * k;   // слева больше G-code, справа больше ассемблера
			const dur   = count * CC_LH / (CC_SPEED * r(0.6,1.5));
			const b     = block(ratio, count);
			const rev   = (i + (side === "R" ? 1 : 0)) % 2;           // левая едет вверх, правая вниз
			h += '<div class="cc-col"><div class="cc-in" style="animation-duration:'+dur.toFixed(1)+'s;'
			   + 'animation-delay:-'+r(0,dur).toFixed(1)+'s;'
			   + (rev ? 'animation-direction:reverse;' : '')
			   + '"><div class="cc-t">'+b+b+'</div></div></div>';
		}
		return h;
	}

	/* плавный градиент: у края тёмный, к центру прозрачный. Кривая сглажена, без резкой границы */
	const DIM_STOPS = (() => {
		const a = [], N = 10;
		for(let k = 0; k <= N; k++){
			const t = k / N;
			a.push("rgba(3,0,2," + (CC_DIM_SIDE * Math.pow(1 - t, 1.7)).toFixed(3) + ") " + (t * CC_DIM_WIDTH).toFixed(1) + "%");
		}
		return a.join(", ");
	})();

	/* ── CSS ── */
	const st = document.createElement("style");
	st.id = "cc-css";
	st.textContent = `
	/* меню по центру, верхний край кнопок зафиксирован */
	#tb-root .tb-nav{
		display:flex !important; flex-wrap:wrap;
		justify-content:center !important;
		align-items:flex-start !important;
		align-content:flex-start;
		width:100%; text-align:center; float:none !important;
		margin-left:auto !important; margin-right:auto !important;
	}
	#tb-root .tb-nav .category_button{
		float:none !important;
		transform-origin:50% 0 !important;
		position:relative; top:0 !important;
	}
	${CC_NAV_LOCK ? `
	#tb-root .tb-nav .category_button:hover,
	#tb-root .tb-nav .category_button:focus,
	#tb-root .tb-nav .category_button:active{
		transform:none !important; translate:none !important; scale:none !important;
		top:0 !important; margin-top:0 !important; margin-bottom:0 !important;
	}` : ""}

	/* фон на всю высоту <site>, листается вместе со страницей */
	.cc-bg{
		position:absolute; left:0; right:0; top:0; bottom:0;
		z-index:0; pointer-events:none; overflow:hidden;
		background:rgba(3,0,2,${CC_DIM_MID});
	}
	/* боковые блоки: градиент тёмный у края страницы → прозрачный к центру, лежит под кодом */
	.cc-side{ position:absolute; top:0; bottom:0; overflow:hidden; }
	.cc-L{ left:0;  background:linear-gradient(90deg,  ${DIM_STOPS}); }
	.cc-R{ right:0; background:linear-gradient(270deg, ${DIM_STOPS}); }
	.cc-cols{ display:flex; height:100%; }
	.cc-col{ flex:1 1 0; min-width:0; height:100%; overflow:hidden; position:relative; }
	.cc-in{ animation:cc-run 60s linear infinite; will-change:transform; }
	.cc-t{
		white-space:pre; padding:0 6px;
		font:${CC_SIZE}px/${CC_LH}px 'Courier New',monospace;
		color:rgba(255,0,68,.5);
		text-shadow:0 0 4px rgba(255,0,68,.3), 0 1px 2px #000;
	}
	.cc-t i{ font-style:normal; display:block; height:${CC_LH}px; overflow:hidden; }
	.cc-t i.h{ color:rgba(212,175,55,.5);  text-shadow:0 0 4px rgba(212,175,55,.35); }
	.cc-t i.r{ color:rgba(255,40,90,.7);   text-shadow:0 0 6px rgba(255,0,68,.6); }
	.cc-t i.d{ color:rgba(138,106,114,.45); text-shadow:none; }
	@keyframes cc-run{ to{ transform:translateY(-50%); } }

	/* правый блок: текст прижат вправо */
	.cc-R .cc-t{ text-align:right; }
	.cc-R .cc-t i.cc-f5{ margin-left:auto; }

	/* плавающие картинки */
	.cc-img{
		position:absolute; left:0; top:0; height:auto; max-width:none;
		opacity:0; pointer-events:none; will-change:transform,opacity;
		filter:drop-shadow(0 0 6px rgba(255,0,68,.55));
	}

	/* необычные подсветки (горят, пока строка не выйдет из колонки или с экрана) */
	.cc-t i.cc-f1,.cc-t i.cc-f2,.cc-t i.cc-f3,.cc-t i.cc-f4,.cc-t i.cc-f5{ opacity:1; }
	/* 1: цветовой сбой */
	.cc-t i.cc-f1{ color:#fff; text-shadow:-2px 0 #00e5ff, 2px 0 #ff0044; animation:cc-g1 .28s steps(2) infinite; }
	@keyframes cc-g1{ 0%{transform:translate(0)} 25%{transform:translate(-3px,0) skewX(20deg)} 50%{transform:translate(2px,0)} 75%{transform:translate(-1px,0) skewX(-15deg)} 100%{transform:translate(0)} }
	/* 2: раскалённая вспышка */
	.cc-t i.cc-f2{ color:#fff; text-shadow:0 0 6px #fff, 0 0 14px #ff0044, 0 0 30px #ff0044; animation:cc-g2 .45s ease-in-out infinite alternate; }
	@keyframes cc-g2{ from{filter:brightness(.8)} to{filter:brightness(1.9)} }
	/* 3: проход сканера */
	.cc-t i.cc-f3{
		color:#fff; text-shadow:0 0 6px #ff0044;
		background:linear-gradient(90deg, transparent, rgba(255,0,68,.85), transparent) no-repeat;
		background-size:40% 100%; animation:cc-g3 1.1s linear infinite;
	}
	@keyframes cc-g3{ from{background-position:-60% 0} to{background-position:160% 0} }
	/* 4: золотая рамка-метка */
	.cc-t i.cc-f4{
		color:#ffd966; text-shadow:0 0 6px rgba(212,175,55,.9);
		background:rgba(212,175,55,.14); box-shadow:inset 0 0 0 1px #d4af37, 0 0 12px rgba(212,175,55,.55);
		padding-left:4px;
	}
	.cc-t i.cc-f4::before{ content:"► "; }
	/* 5: набор текста с курсором */
	.cc-t i.cc-f5{
		color:#7aff9a; text-shadow:0 0 6px rgba(122,255,154,.8);
		width:calc(var(--n) * 1ch + 4px); border-right:2px solid #7aff9a;
		animation:cc-g5 1.8s steps(var(--n), end) infinite;
	}
	@keyframes cc-g5{ from{ width:0 } to{ width:calc(var(--n) * 1ch + 4px) } }
	`;
	document.head.appendChild(st);

	/* ── геометрия: сколько места по бокам и какая высота у страницы ── */
	function geom(site){
		const sr   = site.getBoundingClientRect();
		const main = site.querySelector("#MAIN, site_content");
		let L, R;
		if(CC_SIDE_W > 0){ L = R = CC_SIDE_W; }
		else if(main){
			const mr = main.getBoundingClientRect();
			L = mr.left - sr.left;
			R = sr.right - mr.right;
		}else{ L = R = site.clientWidth * 0.2; }
		return { L: Math.max(0, Math.floor(L)), R: Math.max(0, Math.floor(R)), H: Math.ceil(sr.height) };
	}

	/* ── отрисовка боковых блоков под текущий размер. Колонки пересобираются только когда это реально нужно ── */
	function render(bg){
		const site = bg.parentNode;
		if(!site) return;
		const g    = geom(site);
		const need = Math.max(CC_LINES, Math.min(Math.ceil(g.H * 1.3 / CC_LH), Math.floor(CC_MAX_H / CC_LH)));
		[["L", g.L], ["R", g.R]].forEach(([side, w]) => {
			const el  = bg.querySelector(".cc-" + side);
			const off = w < CC_MIN_SIDE;
			el.style.width   = w + "px";
			el.style.display = off ? "none" : "";
			if(off){ el._key = null; return; }
			const n = CC_PER_SIDE > 0 ? CC_PER_SIDE : Math.max(1, Math.round(w / CC_COLW));
			const k = el._key;
			// хватает и не слишком много: колонки не трогаем
			if(k && k.n === n && k.count >= need && k.count <= need * 2) return;
			el._key = { n, count: need };
			el.firstChild.innerHTML = cols(n, need, side);
		});
	}

	/* ── следим за размером: страница может расти (картинки, терминал), окно меняется ── */
	let rzT;
	const ro = ("ResizeObserver" in window) ? new ResizeObserver(() => {
		clearTimeout(rzT);
		rzT = setTimeout(() => {
			const bg = document.querySelector(".cc-bg");
			if(bg) render(bg);
		}, 250);
	}) : null;

	/* ── монтирование: страница пересоздаётся при каждой смене, поэтому через observer ── */
	function mount(){
		if(!CC_ON) return;
		const site = document.querySelector("site");
		if(!site || site.querySelector(":scope > .cc-bg")) return;
		const cs = getComputedStyle(site);
		if(cs.display === "inline") site.style.display = "block";
		if(cs.position === "static") site.style.position = "relative";
		const bg = document.createElement("div");
		bg.className = "cc-bg";
		bg.innerHTML = '<div class="cc-side cc-L"><div class="cc-cols"></div></div>'
		             + '<div class="cc-side cc-R"><div class="cc-cols"></div></div>';
		site.insertBefore(bg, site.firstChild);
		render(bg);
		if(ro){
			ro.disconnect();
			ro.observe(site);
			const m = site.querySelector("#MAIN, site_content");
			if(m) ro.observe(m);
		}
	}

	let queued = false;
	function schedule(){
		if(queued) return;
		queued = true;
		requestAnimationFrame(() => { queued = false; mount(); });
	}
	const host = document.getElementById("BODY");
	new MutationObserver(schedule).observe(host || document.body, host ? { childList:true } : { childList:true, subtree:true });
	mount();
	setTimeout(mount, 500);

	/* ── редкие необычные подсветки: горят бесконечно, пока строка не выйдет из колонки или с экрана ── */
	const hot = new Set();

	function lit(el, col){
		el._old = { t: el.textContent, c: el.className };
		el._col = col;
		const txt = pk(SPECIAL);
		el.textContent = txt;
		el.style.setProperty("--n", txt.length);
		el.className = pk(FX);
		hot.add(el);
	}
	function unlit(el){
		if(el._old){
			el.className   = el._old.c;
			el.textContent = el._old.t;
			el.style.removeProperty("--n");
			el._old = null;
		}
		hot.delete(el);
	}

	function spark(){
		setTimeout(spark, r(CC_HOT_GAP[0], CC_HOT_GAP[1]));
		if(!CC_HOT || !CC_ON || document.hidden || hot.size >= CC_HOT_MAX) return;
		const list = Array.from(document.querySelectorAll(".cc-side .cc-t"));
		for(let k = 0; k < 12 && list.length; k++){
			const t   = pk(list);
			const col = t.parentNode.parentNode;                 // .cc-col
			const cb  = col.getBoundingClientRect();
			if(cb.width <= 0) continue;                          // боковой блок скрыт
			const tb  = t.getBoundingClientRect();
			const lo  = Math.max(60, cb.top + 4);                // видимая часть: не под шапкой и не под подвалом
			const hi  = Math.min(innerHeight - 70, cb.bottom - 4);
			const from = Math.max(0, Math.ceil((lo - tb.top) / CC_LH));
			const to   = Math.min(t.children.length - 1, Math.floor((hi - CC_LH - tb.top) / CC_LH));
			if(to < from) continue;
			const el = t.children[ri(from, to)];
			if(!el || el._old) continue;
			lit(el, col);
			break;
		}
	}
	setTimeout(spark, 3000);

	/* проверка: вышла ли подсвеченная строка из колонки или с экрана → вернуть обычный вид */
	setInterval(() => {
		if(document.hidden || !hot.size) return;
		hot.forEach(el => {
			if(!el.isConnected || !el._col || !el._col.isConnected){ hot.delete(el); return; }
			const b = el.getBoundingClientRect();
			const c = el._col.getBoundingClientRect();
			if(b.bottom < c.top || b.top > c.bottom || b.bottom < 0 || b.top > innerHeight) unlit(el);
		});
	}, 700);

	/* ── проплывающие картинки: летают в боковых блоках, в той части, что сейчас на экране ── */
	const badImg = new Set();

	function spawnImg(){
		if(document.querySelectorAll(".cc-img").length >= CC_IMG_MAX) return;
		const pool  = CC_IMGS.filter(s => s && !badImg.has(s));
		const sides = Array.from(document.querySelectorAll(".cc-side")).filter(s => s.offsetWidth >= CC_MIN_SIDE);
		if(!pool.length || !sides.length) return;
		const side = pk(sides);
		const src  = pk(pool);
		const im   = new Image();
		im.onerror = () => { badImg.add(src); console.warn("[CC] картинка не загрузилась:", src); };
		im.onload  = () => {
			if(!side.isConnected) return;
			const rc = side.getBoundingClientRect();
			if(rc.bottom < 0 || rc.top > innerHeight) return;    // боковой блок сейчас не на экране
			const W   = side.clientWidth;
			const top = Math.max(0, -rc.top);                    // верх видимой части внутри блока
			const H   = Math.min(innerHeight, rc.height - top);
			const s   = Math.min(ri(CC_IMG_SIZE[0], CC_IMG_SIZE[1]), Math.floor(W * 0.9));
			let x0, y0, x1, y1;
			switch(ri(0,3)){
				case 0:  x0 = r(0, W-s); y0 = top+H+s;     x1 = x0 + r(-60,60); y1 = top-s*2;      break; // снизу вверх
				case 1:  x0 = r(0, W-s); y0 = top-s*2;     x1 = x0 + r(-60,60); y1 = top+H+s;      break; // сверху вниз
				case 2:  x0 = -s*2;      y0 = top+r(0,H-s); x1 = W+s;           y1 = y0 + r(-150,150); break; // слева направо
				default: x0 = W+s;       y0 = top+r(0,H-s); x1 = -s*2;          y1 = y0 + r(-150,150);        // справа налево
			}
			const rot = r(-25,25);
			im.className = "cc-img";
			im.draggable = false;
			im.style.width = s + "px";
			side.appendChild(im);
			im.animate([
				{ transform:"translate("+x0+"px,"+y0+"px) rotate("+rot+"deg)", opacity:0 },
				{ opacity:CC_IMG_ALPHA, offset:.12 },
				{ opacity:CC_IMG_ALPHA, offset:.88 },
				{ transform:"translate("+x1+"px,"+y1+"px) rotate("+(rot + r(-40,40))+"deg)", opacity:0 }
			], { duration: ri(CC_IMG_TIME[0], CC_IMG_TIME[1]), easing:"linear" }).onfinish = () => im.remove();
		};
		im.src = src;
	}

	function imgTick(){
		setTimeout(imgTick, CC_IMG_EVERY);
		if(!CC_ON || document.hidden || !CC_IMGS.length) return;
		if(Math.random() < CC_IMG_CHANCE) spawnImg();
	}
	setTimeout(imgTick, 2000);
})();

/* ═══════════════ ЗАПУСК ═══════════════ */
intro();
setTimeout(loop, 12000);   // случайные события начинаются через 12 сек

})();