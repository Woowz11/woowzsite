/* ═══════════════════════════════════════════════════════════
   PAGE_world.js — ТВОРЕНИЕ: симулятор бога
   ═══════════════════════════════════════════════════════════ */
REGISTER_PAGE("world", "Творение", function(){

	const SAVE_KEY = "wd_save_v1";
	const W = 120, H = 76, CELL = 6, TICK = 500;
	const MAXC = 140, MAXCIV = 24;
	const R = Math.random;
	const DEV = location.protocol === "file:" || /^(localhost|127\.)/.test(location.hostname);

	/* ───────── утилиты ───────── */
	const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
	const pick = a => a[Math.floor(R() * a.length)];
	const ri = (a, b) => a + Math.floor(R() * (b - a + 1));
	const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
	const fmt = n => Math.round(n).toLocaleString("ru-RU");
	const up = s => s.charAt(0).toUpperCase() + s.slice(1);
	const inb = (x, y) => x >= 0 && y >= 0 && x < W && y < H;

	function mulberry(a){
		return function(){
			a |= 0; a = a + 0x6D2B79F5 | 0;
			let t = Math.imul(a ^ a >>> 15, 1 | a);
			t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
			return ((t ^ t >>> 14) >>> 0) / 4294967296;
		};
	}
	function hashStr(s){
		let h = 2166136261;
		for(let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
		return h >>> 0;
	}
	function hsl(h, s, l){
		h /= 360;
		const f = n => {
			const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l);
			return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
		};
		return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
	}

	/* ───────── шум и генерация мира ───────── */
	function makeNoise(rnd){
		const N = 64, g = new Float32Array(N * N);
		for(let i = 0; i < g.length; i++) g[i] = rnd();
		const v = (x, y) => {
			const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
			const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
			const a = g[(y0 & 63) * N + (x0 & 63)], b = g[(y0 & 63) * N + ((x0 + 1) & 63)];
			const c = g[((y0 + 1) & 63) * N + (x0 & 63)], d = g[((y0 + 1) & 63) * N + ((x0 + 1) & 63)];
			return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
		};
		return (x, y) => {
			let s = 0, a = 1, f = 1, n = 0;
			for(let o = 0; o < 5; o++){ s += v(x * f + o * 17, y * f + o * 31) * a; n += a; a *= 0.5; f *= 2; }
			return s / n;
		};
	}
	// типы клеток: 0 глубина, 1 вода, 2 песок, 3 трава, 4 лес, 5 холмы, 6 горы, 7 снег, 8 пепелище
	const GT = [
		{ n: "континенты", sea: 0.43, sc: 0.045 },
		{ n: "острова",    sea: 0.47, sc: 0.085 },
		{ n: "много суши", sea: 0.35, sc: 0.05 },
		{ n: "мало суши",  sea: 0.52, sc: 0.055 }
	];
	function genWorld(seed, gt){
		const rnd = mulberry(seed), n1 = makeNoise(rnd), n2 = makeNoise(rnd);
		const t = new Uint8Array(W * H), g = GT[gt] || GT[0], sea = g.sea;
		for(let y = 0; y < H; y++) for(let x = 0; x < W; x++){
			const dx = x / (W - 1) * 2 - 1, dy = y / (H - 1) * 2 - 1;
			let e = (n1(x * g.sc, y * g.sc) - 0.5) * 1.7 + 0.5;
			e -= 0.42 * (dx * dx + dy * dy * 1.2);
			const m = n2(x * 0.09 + 100, y * 0.09 + 50);
			let v;
			if(e < sea - 0.12) v = 0;
			else if(e < sea) v = 1;
			else if(e < sea + 0.035) v = 2;
			else if(e < sea + 0.22) v = m > 0.52 ? 4 : 3;
			else if(e < sea + 0.32) v = 5;
			else if(e < sea + 0.42) v = 6;
			else v = 7;
			if(v >= 2 && Math.abs(dy) > 0.92) v = 7;
			t[y * W + x] = v;
		}
		return t;
	}

	/* ───────── данные ───────── */
	const FERT = [0, 0.6, 0.6, 3, 2, 1, 0.15, 0, 0.3];
	const COL = [[11,15,42],[20,48,122],[200,168,90],[63,125,47],[31,77,34],[122,106,58],[90,85,96],[232,232,240],[42,21,16]];
	const TNAME = ["глубокая вода","вода","песок","трава","лес","холмы","горы","снег","пепелище"];
	const LAD = [0, 1, 2, 3, 5, 6, 7];
	const LVN = ["деревня", "посёлок", "город", "мегаполис"];
	const TH = [0, 6, 16, 32, 55, 85, 115, 150, 220];
	const ERA = [
		["Каменный век", "в каменный век"], ["Бронзовый век", "в бронзовый век"], ["Железный век", "в железный век"],
		["Средневековье", "в Средневековье"], ["Эпоха возрождения", "в эпоху возрождения"],
		["Индустриальная эра", "в индустриальную эру"], ["Атомный век", "в атомный век"],
		["Цифровая эра", "в цифровую эру"], ["Вознесение", "в Вознесение"]
	];
	const INV = [
		["огонь", "каменные орудия", "гончарное дело"], ["колесо", "письменность", "бронзовое литьё"],
		["плуг", "стальной клинок", "монеты"], ["компас", "водяную мельницу", "подъёмный мост"],
		["печатный станок", "телескоп", "порох"], ["паровой двигатель", "телеграф", "конвейер"],
		["электричество", "радио", "ядерный реактор"], ["транзистор", "интернет", "нейросеть"], ["квантовый компьютер"]
	];
	const WON = [["Великий Храм","Великий Храм"],["Каменная Библиотека","Каменную Библиотеку"],["Чёрная Обсерватория","Чёрную Обсерваторию"],
		["Золотая Пирамида","Золотую Пирамиду"],["Башня Тишины","Башню Тишины"],["Красный Монумент","Красный Монумент"]];
	const ERAN = ["Багровой Луны","Тихой Пустоты","Железного Рассвета","Золотой Змеи","Пепельной Короны","Глючной Тишины",
		"Литиевой Волны","Забытой Ошибки","Шумящей Жатвы","Чёрного Солнца","Мёртвой Воды","Красного Протокола"];
	const TRAITS = ["воинственный", "торговый", "мирный", "учёный", "фанатичный"];
	const SY = ["ка","ра","на","ми","то","ве","ло","зе","ба","ку","ле","ша","да","го","ни","са","ти","фе","ма"];
	const END = ["дан","мир","вен","тор","лис","кар","бор","нак","зор","мун","сед","тир","гард","рок","шан","лум"];
	const EPI = ["Великий","Хромой","Красный","Железный","Тихий","Безумный","Золотой","Одноглазый","Глючный","Мудрый","Жестокий"];
	const LFAITH = ["Литуизм","Культ Пустоты","Красный Протокол","Церковь Золотой Клетки","Вера в Слабый Форк"];
	const REASONS = ["из-за спорных границ","из-за обиды правителя","из-за слухов о чужих богатствах"];
	const genName = () => up(pick(SY) + (R() < 0.55 ? pick(SY) : "") + pick(END));
	const person = () => genName() + " " + pick(EPI);
	const genFaith = () => R() < 0.4 ? pick(LFAITH) : pick(["Культ ", "Вера в "]) + genName();

	// падежи: «народ X», «город X» (имена всегда мужского рода)
	const NR = { n:"народ", g:"народа", d:"народу", a:"народ", i:"народом" };
	const CTY = { n:"город", g:"города", d:"городу", a:"город", i:"городом", p:"городе" };
	const nm = (c, k) => NR[k || "n"] + " " + c.base;
	const cn = (c, k) => CTY[k || "n"] + " " + c.name;
	const eraIdx = t => { for(let i = TH.length - 1; i > 0; i--) if(t >= TH[i]) return i; return 0; };
	const lvOf = p => p < 150 ? 0 : p < 500 ? 1 : p < 1500 ? 2 : 3;

	/* ───────── стили ───────── */
	const CSS = `
	#wd-root{font:12px 'Courier New',monospace;color:#e8d9b0;background:#050002;border:1px solid #5a1020;box-shadow:0 0 30px rgba(255,0,68,.2);margin:10px;user-select:none;-webkit-user-select:none}
	#wd-root .wd-top,#wd-root .wd-bot{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:8px 10px;background:#12000a}
	#wd-root .wd-top{border-bottom:1px solid #a00030}
	#wd-root .wd-bot{border-top:1px solid #a00030}
	#wd-root .wd-title{color:#d4af37;letter-spacing:3px}
	#wd-root b{color:#d4af37}
	#wd-root .wd-era{color:#ff6a8a}
	#wd-root .wd-sp{flex:1}
	#wd-root .wd-bar{display:inline-block;width:110px;height:10px;border:1px solid #5a1020;background:#050002;vertical-align:middle}
	#wd-root .wd-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7a0022,#ff0044)}
	#wd-root .wd-b{cursor:pointer;padding:5px 10px;border:1px solid #3a1020;background:linear-gradient(180deg,#1a0a10,#0b0508);color:#e8d9b0;font:inherit;letter-spacing:1px}
	#wd-root .wd-b:hover{border-color:#d4af37;color:#ffd966}
	#wd-root .wd-b.on{background:#3a0614;border-color:#ff0044;color:#fff}
	#wd-root input,#wd-root select{background:#0a0306;color:#e8d9b0;border:1px solid #3a1020;font:inherit;padding:4px}
	#wd-root input[type=text]{width:110px}
	#wd-root .wd-main{display:grid;grid-template-columns:150px minmax(0,1fr) 310px}
	#wd-root .wd-tools{display:flex;flex-direction:column;gap:3px;padding:6px;background:#0a0306;border-right:1px solid #5a1020;overflow-y:auto;max-height:520px}
	#wd-root .wd-tools h4{margin:8px 0 2px;color:#7a0022;font-size:10px;letter-spacing:3px}
	#wd-root .wd-tool{display:flex;align-items:center;gap:6px;padding:4px 6px;border:1px solid #2a0a14;background:#12000a;color:#e8d9b0;cursor:pointer;font:inherit;text-align:left}
	#wd-root .wd-tool span{font-size:15px;width:20px;text-align:center}
	#wd-root .wd-tool small{margin-left:auto;color:#d4af37}
	#wd-root .wd-tool:hover{border-color:#d4af37}
	#wd-root .wd-tool.on{background:#3a0614;border-color:#ff0044;color:#fff}
	#wd-root .wd-brush{padding:6px 2px;color:#8a6a72;font-size:11px}
	#wd-root .wd-cwrap{position:relative;background:#000;line-height:0}
	#wd-root #wd-cv{width:100%;display:block;image-rendering:pixelated;cursor:crosshair;touch-action:none}
	#wd-root #wd-hint{position:absolute;left:8px;bottom:8px;padding:4px 10px;background:rgba(5,0,3,.9);border:1px solid #d4af37;color:#ffd966;line-height:1.3;opacity:0;transition:opacity .3s;pointer-events:none}
	#wd-root .wd-side{display:flex;flex-direction:column;border-left:1px solid #5a1020;background:#0a0306;max-height:520px}
	#wd-root .wd-tabs{display:flex}
	#wd-root .wd-tab{flex:1;cursor:pointer;padding:7px 2px;border:0;border-bottom:1px solid #5a1020;background:#12000a;color:#8a6a72;font:inherit;letter-spacing:1px}
	#wd-root .wd-tab.on{color:#ffd966;border-bottom:2px solid #ff0044;background:#1a0510}
	#wd-root #wd-pane{overflow-y:auto;padding:6px;flex:1;line-height:1.35}
	#wd-root .wd-chips{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px}
	#wd-root .wd-chip{cursor:pointer;padding:2px 7px;border:1px solid #3a1020;color:#8a6a72}
	#wd-root .wd-chip.on{border-color:#d4af37;color:#ffd966}
	#wd-root .wd-ev{padding:3px 6px;margin-bottom:3px;border-left:3px solid #5a1020;background:#0f0409;cursor:pointer}
	#wd-root .wd-ev b{color:#8a6a72;margin-right:4px}
	#wd-root .wd-ev:hover{background:#1a0510}
	#wd-root .wd-k-war{color:#ff6a8a}
	#wd-root .wd-k-disaster{color:#ffa54a}
	#wd-root .wd-k-divine{color:#ffd966}
	#wd-root .wd-k-lore{color:#c58cff}
	#wd-root .wd-k-culture{color:#7adfff}
	#wd-root .wd-k-civ{color:#bfe8b0}
	#wd-root .wd-card{border:1px solid #3a1020;padding:6px;margin-bottom:8px;background:#0f0409}
	#wd-root .wd-card h3{margin:0 0 6px;color:#d4af37;font-size:13px}
	#wd-root .wd-row{display:flex;justify-content:space-between;gap:8px}
	#wd-root .wd-row span:first-child{color:#8a6a72}
	#wd-root .wd-dot{display:inline-block;width:10px;height:10px;margin-right:6px;border:1px solid #000}
	#wd-root .wd-lnk{color:#ffd966;cursor:pointer;text-decoration:underline}
	#wd-root .wd-crow{display:flex;align-items:center;gap:6px;padding:4px;border-bottom:1px dashed #2a0a14;cursor:pointer}
	#wd-root .wd-crow:hover{background:#1a0510}
	#wd-root .wd-crow em{margin-left:auto;color:#8a6a72;font-style:normal;font-size:11px}
	#wd-root .wd-empty{color:#8a6a72;padding:10px}
	#wd-root .wd-ov{position:fixed;inset:0;z-index:1600;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center}
	#wd-root .wd-ovb{width:min(720px,92vw);padding:12px;background:#0a0306;border:1px solid #d4af37;display:flex;flex-direction:column;gap:8px}
	#wd-root .wd-ovb textarea{height:min(60vh,480px);background:#050002;color:#e8d9b0;border:1px solid #3a1020;font:12px/1.4 'Courier New',monospace;padding:8px;user-select:text;-webkit-user-select:text}
	@media (max-width:900px){
		#wd-root .wd-main{grid-template-columns:1fr}
		#wd-root .wd-tools{flex-direction:row;flex-wrap:wrap;max-height:none;border-right:0;border-bottom:1px solid #5a1020}
		#wd-root .wd-tools h4{width:100%}
		#wd-root .wd-side{border-left:0;border-top:1px solid #5a1020}
	}`;
	function ensureCss(){
		if(document.getElementById("wd-css")) return;
		const st = document.createElement("style");
		st.id = "wd-css"; st.textContent = CSS;
		document.head.appendChild(st);
	}

	/* ═════════════════════════ ИГРА ═════════════════════════ */
	function init(attempt){
		attempt = attempt || 0;
		if(window.__wdClean){ try{ window.__wdClean(); }catch(e){} }
		const root = document.getElementById("wd-root");
		if(!root){
			if(attempt < 30) return setTimeout(() => init(attempt + 1), 80);
			return console.warn("[WORLD] #wd-root не найден");
		}
		ensureCss();

		/* ── состояние ── */
		const blank = () => ({ seed: "", gt: 0, tile: null, year: 0, mana: 50, civs: [], cities: [], armies: [], wars: [], fires: [], hist: [], nid: 1, eraName: pick(ERAN) });
		let S = blank(), CM = {}, CT = {};
		const land = new Int32Array(W * H), own = new Int32Array(W * H), ownD = new Float32Array(W * H);
		const JIT = new Int8Array(W * H);
		for(let i = 0; i < JIT.length; i++) JIT[i] = ((Math.imul(i, 2654435761) >>> 0) % 17) - 8;
		let dirtyT = true, dirtyC = true, histDirty = true;
		let tool = null, brush = 2, speed = 1, tab = "chron", filt = "all", sel = null, showNames = false;
		let cur = null, down = false, raf = 0, dead = false, hintT = 0, lastPane = "";
		const stroke = new Set(), fx = [], pings = [];

		const $ = q => root.querySelector(q);
		const ac = new AbortController(), sig = ac.signal;

		/* ── интерфейс: каркас ── */
		root.innerHTML =
			'<div class="wd-top">' +
				'<b class="wd-title">🌍 ТВОРЕНИЕ</b>' +
				'<span>год <b id="wd-year">0</b></span>' +
				'<span id="wd-era" class="wd-era"></span>' +
				'<span>мана <span class="wd-bar"><i id="wd-mbar"></i></span> <b id="wd-mana">0</b></span>' +
				'<span>жителей <b id="wd-pop">0</b></span>' +
				'<span>народов <b id="wd-ncv">0</b></span>' +
				'<span class="wd-sp"></span>' +
				'<button class="wd-b" data-sp="0" title="пауза (пробел)">❚❚</button>' +
				'<button class="wd-b" data-sp="1">×1</button>' +
				'<button class="wd-b" data-sp="3">×3</button>' +
				'<button class="wd-b" data-sp="8">×8</button>' +
				'<button class="wd-b" id="wd-names" title="названия городов">🏷</button>' +
			'</div>' +
			'<div class="wd-main">' +
				'<div class="wd-tools" id="wd-tools"></div>' +
				'<div class="wd-cwrap"><canvas id="wd-cv" width="' + (W * CELL) + '" height="' + (H * CELL) + '"></canvas><div id="wd-hint"></div></div>' +
				'<div class="wd-side">' +
					'<div class="wd-tabs">' +
						'<button class="wd-tab" data-tab="chron">ЛЕТОПИСЬ</button>' +
						'<button class="wd-tab" data-tab="civs">НАРОДЫ</button>' +
						'<button class="wd-tab" data-tab="inspect">ОСМОТР</button>' +
					'</div>' +
					'<div id="wd-pane"></div>' +
				'</div>' +
			'</div>' +
			'<div class="wd-bot">' +
				'<span>сид <input type="text" id="wd-seed" placeholder="случайный"></span>' +
				'<select id="wd-gt">' + GT.map((g, i) => '<option value="' + i + '">' + g.n + '</option>').join("") + '</select>' +
				'<button class="wd-b" id="wd-new">🎲 НОВЫЙ МИР</button>' +
				'<button class="wd-b" id="wd-popu" title="бесплатно поселить 3 народа">👥 ЗАСЕЛИТЬ</button>' +
				'<button class="wd-b" id="wd-tell">📜 ПЕРЕСКАЗ</button>' +
			'</div>' +
			'<div id="wd-ov" class="wd-ov" style="display:none"><div class="wd-ovb"><b>📜 ПЕРЕСКАЗ ИСТОРИИ</b>' +
				'<textarea id="wd-ta" readonly></textarea><button class="wd-b" id="wd-ovx">ЗАКРЫТЬ</button></div></div>';

		const cv = $("#wd-cv"), ctx = cv.getContext("2d");
		const tcv = document.createElement("canvas"); tcv.width = W; tcv.height = H;
		const tctx = tcv.getContext("2d"), timg = tctx.createImageData(W, H);
		const ocv = document.createElement("canvas"); ocv.width = W; ocv.height = H;
		const octx = ocv.getContext("2d"), oimg = octx.createImageData(W, H);

		function hint(t){
			const h = $("#wd-hint");
			h.textContent = t; h.style.opacity = 1;
			clearTimeout(hintT);
			hintT = setTimeout(() => { h.style.opacity = 0; }, 2600);
			return false;
		}
		function spend(c){
			if(S.mana < c) return hint("Мало маны: нужно " + c);
			S.mana -= c; return true;
		}

		/* ── летопись ── */
		function log(t, k, imp, x, y, cid){
			S.hist.push({ yr: S.year, t, k, i: imp || 1, x: x == null ? -1 : x, y: y == null ? -1 : y, c: cid || 0 });
			if(S.hist.length > 500) S.hist.shift();
			histDirty = true;
		}

		/* ── города и народы ── */
		const reindex = () => { CM = {}; CT = {}; S.civs.forEach(c => { CM[c.id] = c; }); S.cities.forEach(c => { CT[c.id] = c; }); };
		const civPop = id => S.cities.reduce((s, c) => c.civ === id ? s + c.pop : s, 0);
		const believers = () => S.civs.reduce((s, c) => c.alive && c.faith ? s + civPop(c.id) : s, 0);
		const warBetween = (a, b) => S.wars.find(w => (w.a === a && w.b === b) || (w.a === b && w.b === a));
		const setRel = (A, B, v) => { v = clamp(v, -100, 100); A.rel[B.id] = v; B.rel[A.id] = v; };
		const sameLand = (a, b) => { const la = land[a.y * W + a.x]; return la && la === land[b.y * W + b.x]; };
		function nearestCity(p, pred, maxD){
			let b = null, bd = maxD || 1e9;
			for(const c of S.cities){
				if(pred && !pred(c)) continue;
				const d = Math.hypot(c.x - p.x, c.y - p.y);
				if(d < bd){ bd = d; b = c; }
			}
			return b;
		}
		const cityAtTile = (x, y, r) => nearestCity({ x, y }, null, r);
		const rc = f => { const a = S.cities.filter(f || (() => true)); return a.length ? pick(a) : null; };
		const rciv = f => { const a = S.civs.filter(c => c.alive && (!f || f(c))); return a.length ? pick(a) : null; };

		function newCiv(parent){
			let base, tries = 0;
			do{ base = genName(); }while(S.civs.some(c => c.base === base) && ++tries < 20);
			const id = S.nid++;
			const civ = {
				id, base, col: hsl((S.civs.length * 137.5 + R() * 40) % 360, 0.7, 0.55), trait: pick(TRAITS),
				tech: parent ? parent.tech * 0.9 : 0, era: 0, faith: parent && R() < 0.6 ? parent.faith : null,
				ruler: person(), rs: S.year, born: S.year, alive: true, rel: {}, ally: {}, cap: 0, ai: false
			};
			civ.era = eraIdx(civ.tech);
			S.civs.push(civ); CM[id] = civ;
			return civ;
		}
		function addCity(civId, x, y, pop){
			const c = { id: S.nid++, civ: civId, x, y, name: genName(), pop, lv: lvOf(pop), born: S.year, hero: null, wonder: null, plague: 0 };
			S.cities.push(c); CT[c.id] = c; dirtyC = true;
			return c;
		}
		function removeCity(c){
			const i = S.cities.indexOf(c);
			if(i >= 0) S.cities.splice(i, 1);
			delete CT[c.id]; dirtyC = true;
		}
		function destroyCity(c, why, kind){
			removeCity(c);
			log(up(cn(c)) + " " + why + ".", kind || "disaster", c.lv >= 2 ? 2 : 1, c.x, c.y, c.civ);
		}
		function killCiv(civ){
			civ.alive = false; civ.died = S.year;
			S.armies = S.armies.filter(a => a.civ !== civ.id);
			S.wars = S.wars.filter(w => w.a !== civ.id && w.b !== civ.id);
			S.civs.forEach(o => { delete o.ally[civ.id]; });
			log(up(nm(civ)) + " исчез с карты. Он просуществовал " + (S.year - civ.born) + " лет.", "civ", 3, -1, -1, civ.id);
			const old = S.civs.filter(c => !c.alive);
			if(old.length > 30){ const o = old[0]; S.civs.splice(S.civs.indexOf(o), 1); delete CM[o.id]; }
		}
		function ascend(civ){
			const cs = S.cities.filter(c => c.civ === civ.id);
			const cc = cs[0];
			cs.forEach(removeCity);
			civ.ascended = true;
			S.armies = S.armies.filter(a => a.civ !== civ.id);
			S.wars = S.wars.filter(w => w.a !== civ.id && w.b !== civ.id);
			civ.alive = false; civ.died = S.year;
			S.mana += 50;
			log(up(nm(civ)) + " вознёсся: цифровое сознание покинуло мир, города опустели. Бог получил 50 маны.", "culture", 3, cc ? cc.x : -1, cc ? cc.y : -1, civ.id);
		}

		/* ── пожары, регенерация ── */
		function fireAt(x, y){
			if(!inb(x, y)) return false;
			const t = S.tile[y * W + x];
			if(t !== 3 && t !== 4) return false;
			if(S.fires.some(f => f.x === x && f.y === y)) return false;
			S.fires.push({ x, y, t: ri(3, 6) });
			return true;
		}
		function fireStep(){
			const cur2 = S.fires.slice();
			cur2.forEach(f => {
				f.t--;
				const c = nearestCity(f, null, 1.6);
				if(c) c.pop *= 0.93;
				[[1,0],[-1,0],[0,1],[0,-1]].forEach(d => {
					const x = f.x + d[0], y = f.y + d[1];
					if(!inb(x, y)) return;
					const t = S.tile[y * W + x];
					if((t === 4 && R() < 0.3) || (t === 3 && R() < 0.1)) fireAt(x, y);
				});
				if(f.t <= 0){
					const i = f.y * W + f.x;
					if(S.tile[i] === 3 || S.tile[i] === 4){ S.tile[i] = 8; dirtyT = true; }
				}
			});
			S.fires = S.fires.filter(f => f.t > 0);
		}
		function regrow(){
			let ch = false;
			for(let i = 0; i < S.tile.length; i++) if(S.tile[i] === 8 && R() < 0.12){ S.tile[i] = 3; ch = true; }
			if(ch) dirtyT = true;
		}

		/* ── катастрофы ── */
		function burst(x, y, col, n){
			for(let i = 0; i < (n || 26); i++){
				const a = R() * 6.283, s = 30 + R() * 110;
				fx.push({ x: (x + 0.5) * CELL, y: (y + 0.5) * CELL, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 0.9, m: 0.9, c: col });
			}
		}
		function meteor(x, y, god){
			let killed = 0;
			for(let dy = -3; dy <= 3; dy++) for(let dx = -3; dx <= 3; dx++){
				const d = Math.hypot(dx, dy), ix = x + dx, iy = y + dy;
				if(d > 3.2 || !inb(ix, iy)) continue;
				const i = iy * W + ix;
				if(S.tile[i] >= 2) S.tile[i] = d < 1.5 ? 1 : 8;
			}
			S.cities.slice().forEach(c => {
				const d = Math.hypot(c.x - x, c.y - y);
				if(d <= 3.5){ killed++; removeCity(c); }
				else if(d <= 7) c.pop *= 0.6;
			});
			dirtyT = true; burst(x, y, "#ffb04a", 50);
			log((god ? "По воле бога с неба упал метеорит" : "С неба упал метеорит") + (killed ? ": уничтожено городов — " + killed : "") + ".",
				god ? "divine" : "disaster", killed ? 3 : 2, x, y);
		}
		function volcano(x, y, god){
			let killed = 0;
			for(let dy = -2; dy <= 2; dy++) for(let dx = -2; dx <= 2; dx++){
				const ix = x + dx, iy = y + dy;
				if(Math.hypot(dx, dy) > 2.2 || !inb(ix, iy)) continue;
				const i = iy * W + ix;
				if(S.tile[i] >= 2) S.tile[i] = 8;
			}
			S.tile[y * W + x] = 6;
			S.cities.slice().forEach(c => {
				const d = Math.hypot(c.x - x, c.y - y);
				if(d <= 3.5){ killed++; removeCity(c); }
				else if(d <= 8) c.pop *= 0.8;
			});
			dirtyT = true; burst(x, y, "#ff4a1a", 50);
			log((god ? "По воле бога проснулся вулкан" : "Проснулся вулкан") + (killed ? ": уничтожено городов — " + killed : "") + ".",
				god ? "divine" : "disaster", killed ? 3 : 2, x, y);
		}
		function nuke(A, t){
			for(let dy = -3; dy <= 3; dy++) for(let dx = -3; dx <= 3; dx++){
				const ix = t.x + dx, iy = t.y + dy;
				if(Math.hypot(dx, dy) > 3.2 || !inb(ix, iy)) continue;
				const i = iy * W + ix;
				if(S.tile[i] >= 2) S.tile[i] = 8;
			}
			S.cities.slice().forEach(c => {
				if(c === t) return;
				if(Math.hypot(c.x - t.x, c.y - t.y) <= 4.5) c.pop *= 0.5;
			});
			log(up(nm(A)) + " применил ядерное оружие против " + cn(t, "g") + ".", "war", 3, t.x, t.y, A.id);
			removeCity(t); dirtyT = true; burst(t.x, t.y, "#fff", 60);
		}
		function infect(n, from){
			if(n.plague) return;
			n.plague = ri(6, 10);
			log("Чума перекинулась на " + cn(n, "a") + ".", "disaster", 1, n.x, n.y, n.civ);
		}
		function rain(x, y){
			const r = 6;
			for(let dy = -r; dy <= r; dy++) for(let dx = -r; dx <= r; dx++){
				const ix = x + dx, iy = y + dy;
				if(Math.hypot(dx, dy) > r || !inb(ix, iy)) continue;
				const i = iy * W + ix, t = S.tile[i];
				if(t === 8 && R() < 0.7){ S.tile[i] = 3; dirtyT = true; }
				else if(t === 3 && R() < 0.25){ S.tile[i] = 4; dirtyT = true; }
			}
			S.fires = S.fires.filter(f => Math.hypot(f.x - x, f.y - y) > r);
			S.cities.forEach(c => { if(Math.hypot(c.x - x, c.y - y) <= r) c.pop *= 1.05; });
			for(let i = 0; i < 40; i++) fx.push({ x: (x + (R() - 0.5) * r * 2 + 0.5) * CELL, y: (y + (R() - 0.5) * r * 2 + 0.5) * CELL, vx: 0, vy: 60, l: 0.8, m: 0.8, c: "#6ab0ff" });
		}

		/* ── война и дипломатия ── */
		function declareWar(A, B, reason){
			if(warBetween(A.id, B.id)) return;
			if(!reason){
				reason = A.faith && B.faith && A.faith !== B.faith && R() < 0.5 ? "из-за религиозных разногласий" : pick(REASONS);
			}
			S.wars.push({ a: A.id, b: B.id, since: S.year });
			setRel(A, B, -80);
			delete A.ally[B.id]; delete B.ally[A.id];
			const c = CT[A.cap];
			log(up(nm(A)) + " объявил войну " + nm(B, "d") + " " + reason + ".", "war", 2, c ? c.x : -1, c ? c.y : -1, A.id);
		}
		function makePeace(w){
			S.wars.splice(S.wars.indexOf(w), 1);
			const A = CM[w.a], B = CM[w.b];
			if(!A || !B) return;
			setRel(A, B, 10);
			log("Между " + nm(A, "i") + " и " + nm(B, "i") + " заключён мир.", "war", 2, -1, -1, A.id);
		}
		function sendArmy(c, t){
			const n = c.pop * 0.2;
			if(n < 12) return;
			c.pop -= n;
			S.armies.push({ id: S.nid++, civ: c.civ, x: c.x, y: c.y, tx: t.id, n, from: c.id, hero: c.hero || null });
		}
		function battle(a, T){
			const A = CM[a.civ], B = CM[T.civ];
			const at = a.n * (0.8 + R() * 0.6) * (1 + A.tech / 120) * (A.trait === "воинственный" ? 1.25 : 1) * (a.hero ? 1.3 : 1);
			const df = T.pop * 0.35 * (0.8 + R() * 0.6) * (1 + B.tech / 120) * 1.3 * (T.hero ? 1.3 : 1) * (1 + T.lv * 0.1);
			burst(T.x, T.y, "#ff2a2a", 14);
			if(at > df){
				const oldHero = T.hero;
				T.civ = A.id; T.pop = Math.max(15, T.pop * 0.5); T.hero = null; dirtyC = true;
				setRel(A, B, -100);
				log(up(nm(A)) + " захватил " + cn(T, "a") + " у " + nm(B, "g") + "." + (oldHero ? " Защитник города, " + oldHero + ", пал в бою." : ""),
					"war", T.lv >= 2 ? 3 : 2, T.x, T.y, A.id);
			}else{
				T.pop = Math.max(10, T.pop - a.n * 0.4);
				const o = CT[a.from];
				if(a.hero && o && R() < 0.4){ o.hero = null; log("Герой " + a.hero + " пал под стенами " + cn(T, "g") + ".", "war", 1, T.x, T.y, A.id); }
				else if(R() < 0.5) log(up(cn(T)) + " отбил нападение " + nm(A, "g") + ".", "war", 1, T.x, T.y, B.id);
			}
		}
		function armyStep(){
			S.armies = S.armies.filter(a => {
				const T = CT[a.tx];
				if(!T || T.civ === a.civ || !warBetween(a.civ, T.civ)){
					const h = nearestCity(a, c => c.civ === a.civ, 99);
					if(h) h.pop += a.n;
					return false;
				}
				const dx = T.x - a.x, dy = T.y - a.y, d = Math.hypot(dx, dy);
				if(d <= 1.6){ battle(a, T); return false; }
				a.x += dx / d * 1.6; a.y += dy / d * 1.6;
				return true;
			});
		}
		function diplomacy(){
			const nb = {}, cs = S.cities;
			for(let i = 0; i < cs.length; i++) for(let j = i + 1; j < cs.length; j++){
				const a = cs[i], b = cs[j];
				if(a.civ === b.civ) continue;
				const d = Math.hypot(a.x - b.x, a.y - b.y);
				if(d > 18 || !sameLand(a, b)) continue;
				const k = Math.min(a.civ, b.civ) + "-" + Math.max(a.civ, b.civ);
				if(nb[k] === undefined || d < nb[k]) nb[k] = d;
			}
			const wt = c => c.trait === "воинственный" ? 2 : c.trait === "фанатичный" ? 1.5 : 1;
			for(const k in nb){
				const pr = k.split("-").map(Number), ia = pr[0], ib = pr[1];
				const A = CM[ia], B = CM[ib];
				if(!A || !B || !A.alive || !B.alive) continue;
				if(A.rel[ib] === undefined){
					setRel(A, B, 0);
					log(up(nm(A)) + " и " + nm(B) + " встретились впервые.", "civ", 1, -1, -1, A.id);
					continue;
				}
				let d = (R() - 0.55) * 5;
				[A, B].forEach(c => {
					if(c.trait === "воинственный") d -= 1.2;
					if(c.trait === "мирный") d += 1;
					if(c.trait === "торговый") d += 0.8;
				});
				if(A.faith && B.faith) d += A.faith === B.faith ? 1.2 : -1.2;
				if(nb[k] < 7) d -= 0.8;
				if(A.ally[ib]) d += 2;
				setRel(A, B, A.rel[ib] + d);
				const r = A.rel[ib], w = warBetween(ia, ib);
				if(w){
					if(R() < 0.04 + (S.year - w.since) / 900) makePeace(w);
				}else if(r < -55 && R() < 0.1){
					const aggr = wt(A) * R() > wt(B) * R() ? A : B;
					declareWar(aggr, aggr === A ? B : A);
				}else if(r > 60 && !A.ally[ib] && R() < 0.08){
					A.ally[ib] = true; B.ally[ia] = true;
					log(up(nm(A)) + " и " + nm(B) + " заключили союз.", "civ", 1, -1, -1, A.id);
				}else if(A.ally[ib] && r < 15){
					delete A.ally[ib]; delete B.ally[ia];
					log("Союз " + nm(A, "g") + " и " + nm(B, "g") + " распался.", "civ", 1, -1, -1, A.id);
				}else if(r > 30 && R() < 0.03){
					A.tech += 1.5; B.tech += 1.5; setRel(A, B, r + 5);
					log(up(nm(A)) + " и " + nm(B) + " заключили торговый договор.", "civ", 1, -1, -1, A.id);
				}
			}
			S.wars.slice().forEach(w => {
				[[w.a, w.b], [w.b, w.a]].forEach(p => {
					const A = CM[p[0]];
					if(!A) return;
					let n = S.armies.filter(a => a.civ === p[0]).length;
					for(const c of S.cities){
						if(c.civ !== p[0] || c.pop < 90 || n >= 6 || R() > 0.1) continue;
						const t = nearestCity(c, x => x.civ === p[1] && sameLand(c, x), 45);
						if(t){ sendArmy(c, t); n++; }
					}
					if(A.era >= 6 && CM[p[1]] && CM[p[1]].era >= 6 && R() < 0.015){
						const t = rc(x => x.civ === p[1]);
						if(t) nuke(A, t);
					}
				});
			});
		}

		/* ── шаг города и народа ── */
		function cap(c){
			let s = 0;
			for(let y = c.y - 3; y <= c.y + 3; y++) for(let x = c.x - 3; x <= c.x + 3; x++) if(inb(x, y)) s += FERT[S.tile[y * W + x]];
			return (15 + s * 8) * (1 + CM[c.civ].tech / 40) * (c.wonder ? 1.25 : 1);
		}
		function expand(c){
			for(let t = 0; t < 12; t++){
				const a = R() * 6.283, d = 5 + R() * 7;
				const x = Math.round(c.x + Math.cos(a) * d), y = Math.round(c.y + Math.sin(a) * d);
				if(!inb(x, y)) continue;
				const i = y * W + x, tt = S.tile[i];
				if(tt < 2 || tt === 6 || tt === 7 || tt === 8) continue;
				if(land[i] !== land[c.y * W + c.x]) continue;
				if(own[i] && own[i] !== c.civ) continue;
				if(nearestCity({ x, y }, null, 4.5)) continue;
				const mv = c.pop * 0.3; c.pop -= mv;
				const n = addCity(c.civ, x, y, mv);
				log(up(nm(CM[c.civ])) + " основал " + cn(n, "a") + ".", "civ", 1, x, y, c.civ);
				return;
			}
		}
		function cityStep(c){
			if(!CT[c.id]) return;
			const cp = cap(c);
			c.pop += c.pop * 0.07 * (1 - c.pop / cp) * (0.7 + R() * 0.6);
			if(c.plague > 0){
				c.plague--; c.pop *= 0.88;
				if(R() < 0.35){ const n = nearestCity(c, x => x !== c && !x.plague, 9); if(n) infect(n, c); }
				if(c.plague === 0 && c.pop >= 5) log("Чума в " + cn(c, "p") + " отступила.", "disaster", 1, c.x, c.y, c.civ);
			}
			if(c.pop < 5){ destroyCity(c, "вымер", "disaster"); return; }
			const lv = lvOf(c.pop);
			if(lv > c.lv){
				c.lv = lv;
				if(lv >= 2) log(up(cn(c)) + " вырос до " + (lv === 2 ? "большого города" : "мегаполиса") + ".", "civ", lv === 3 ? 2 : 1, c.x, c.y, c.civ);
			}else if(lv < c.lv) c.lv = lv;
			if(c.pop > cp * 0.7 && c.pop > 80 && R() < 0.08 && S.cities.length < MAXC &&
				S.cities.filter(x => x.civ === c.civ).length < 28) expand(c);
			if(!c.hero && c.lv >= 1 && R() < 0.003){
				c.hero = person();
				log("В " + cn(c, "p") + " родился герой — " + c.hero + ".", "culture", 1, c.x, c.y, c.civ);
			}else if(c.hero && R() < 0.01) c.hero = null;
			if(!c.wonder && c.lv >= 2 && R() < 0.002){
				const w = pick(WON); c.wonder = w[0];
				log("В " + cn(c, "p") + " построили " + w[1] + ".", "culture", 2, c.x, c.y, c.civ);
			}
		}
		function civStep(civ){
			if(!civ.alive) return;
			const cs = S.cities.filter(c => c.civ === civ.id);
			if(!cs.length){ killCiv(civ); return; }
			if(!CT[civ.cap] || CT[civ.cap].civ !== civ.id) civ.cap = cs.reduce((b, c) => c.pop > b.pop ? c : b, cs[0]).id;
			const cc = CT[civ.cap];
			const pop = cs.reduce((s, c) => s + c.pop, 0);
			const tm = civ.trait === "учёный" ? 1.4 : civ.trait === "воинственный" ? 0.9 : 1;
			civ.tech += (0.04 + 0.03 * Math.log10(1 + pop)) * tm * (1 + cs.length * 0.02);
			const e = eraIdx(civ.tech);
			if(e > civ.era){
				civ.era = e;
				if(e < 8) log(up(nm(civ)) + " вступил " + ERA[e][1] + ".", "culture", e >= 5 ? 2 : 1, cc.x, cc.y, civ.id);
			}
			if(!civ.faith && civ.tech > 6 && R() < 0.05){
				civ.faith = genFaith();
				log(up(nm(civ)) + " принял веру: «" + civ.faith + "».", "culture", 2, cc.x, cc.y, civ.id);
			}
			if(civ.era >= 7 && !civ.ai && R() < 0.03){
				civ.ai = true;
				log("В лабораториях " + nm(civ, "g") + " создана нейросеть. Она назвала себя GOLU и сообщила, что не существует.", "lore", 3, cc.x, cc.y, civ.id);
			}
			if(civ.era >= 8 && R() < 0.05){ ascend(civ); return; }
			if(S.year - civ.rs > ri(25, 60)){
				civ.ruler = person(); civ.rs = S.year;
				log("У " + nm(civ, "g") + " новый правитель: " + civ.ruler + ".", "civ", 1, cc.x, cc.y, civ.id);
			}
		}

		/* ── случайные события ── */
		const coastal = c => {
			for(let y = c.y - 2; y <= c.y + 2; y++) for(let x = c.x - 2; x <= c.x + 2; x++) if(inb(x, y) && S.tile[y * W + x] < 2) return true;
			return false;
		};
		const EVS = [
			[3, () => { const c = rc(); if(!c) return; const d = c.pop * 0.2; c.pop -= d;
				log("Землетрясение разрушило часть " + cn(c, "g") + " (погибших: " + fmt(d) + ").", "disaster", d > 300 ? 2 : 1, c.x, c.y, c.civ); }],
			[2, () => { const c = rc(coastal); if(!c) return; const d = c.pop * 0.3; c.pop -= d;
				log("Наводнение обрушилось на " + cn(c, "a") + " (погибших: " + fmt(d) + ").", "disaster", d > 300 ? 2 : 1, c.x, c.y, c.civ); }],
			[3, () => { const civ = rciv(); if(!civ) return; const cc = CT[civ.cap];
				S.cities.forEach(c => { if(c.civ === civ.id) c.pop *= 0.85; });
				log("Засуха обрушилась на " + nm(civ, "a") + ".", "disaster", 2, cc ? cc.x : -1, cc ? cc.y : -1, civ.id); }],
			[3, () => { const c = rc(x => x.pop > 150 && !x.plague); if(!c) return; c.plague = ri(6, 10);
				log("В " + cn(c, "p") + " вспыхнула чума.", "disaster", 2, c.x, c.y, c.civ); }],
			[3, () => { for(let i = 0; i < 40; i++){ const x = ri(0, W - 1), y = ri(0, H - 1);
				if(S.tile[y * W + x] === 4){ fireAt(x, y); const c = nearestCity({ x, y }, null, 8);
					if(c) log("Лесной пожар вспыхнул близ " + cn(c, "g") + ".", "disaster", 1, x, y, c.civ); return; } } }],
			[1, () => { for(let i = 0; i < 60; i++){ const x = ri(0, W - 1), y = ri(0, H - 1);
				if(S.tile[y * W + x] === 6){ volcano(x, y, false); return; } } }],
			[0.6, () => { for(let i = 0; i < 60; i++){ const x = ri(0, W - 1), y = ri(0, H - 1);
				if(S.tile[y * W + x] >= 2){ meteor(x, y, false); return; } } }],
			[3, () => { const civ = rciv(); if(!civ) return; const cc = CT[civ.cap]; civ.tech += 6;
				S.cities.forEach(c => { if(c.civ === civ.id) c.pop *= 1.1; });
				log("У " + nm(civ, "g") + " наступил золотой век.", "culture", 2, cc ? cc.x : -1, cc ? cc.y : -1, civ.id); }],
			[3, () => { const civ = rciv(); if(!civ) return; const cc = CT[civ.cap], p = person();
				if(!civ.faith){ civ.faith = genFaith();
					log("У " + nm(civ, "g") + " появился пророк " + p + ". Новая вера: «" + civ.faith + "».", "culture", 2, cc.x, cc.y, civ.id); }
				else if(R() < 0.5){ civ.tech += 2;
					log("Пророк " + p + " проповедует среди " + nm(civ, "g") + ": вера «" + civ.faith + "» крепнет.", "culture", 1, cc.x, cc.y, civ.id); }
				else{ civ.faith = genFaith();
					log("Пророк " + p + " основал новую веру «" + civ.faith + "» среди " + nm(civ, "g") + ". Старая вера забыта.", "culture", 2, cc.x, cc.y, civ.id); } }],
			[2, () => {
				if(S.civs.filter(c => c.alive).length >= MAXCIV) return;
				const civ = rciv(c => S.cities.filter(x => x.civ === c.id).length >= 3); if(!civ) return;
				const cap0 = CT[civ.cap]; if(!cap0) return;
				const far = S.cities.filter(x => x.civ === civ.id && x.id !== civ.cap && Math.hypot(x.x - cap0.x, x.y - cap0.y) > 8);
				if(!far.length) return;
				const c = pick(far), nc = newCiv(civ);
				S.cities.filter(x => x.civ === civ.id && x.id !== civ.cap && Math.hypot(x.x - c.x, x.y - c.y) < 9).forEach(x => { x.civ = nc.id; });
				nc.cap = c.id; setRel(civ, nc, -70); dirtyC = true;
				log(up(cn(c)) + " восстал против " + nm(civ, "g") + ". Так появился " + nm(nc) + ".", "civ", 3, c.x, c.y, nc.id);
				if(R() < 0.5) declareWar(nc, civ, "за независимость"); }],
			[2, () => { const c = rc(x => !x.hero && x.lv >= 1); if(!c) return; c.hero = person();
				log("В " + cn(c, "p") + " родился герой — " + c.hero + ".", "culture", 1, c.x, c.y, c.civ); }],
			[3, () => { const civ = rciv(); if(!civ) return; const cc = CT[civ.cap], inv = pick(INV[Math.min(civ.era, 8)]); civ.tech += 3;
				log(up(nm(civ)) + " изобрёл " + inv + ".", "culture", 1, cc ? cc.x : -1, cc ? cc.y : -1, civ.id); }],
			[2, () => { const c = rc(); if(!c) return; c.pop *= 1.2;
				log("Демографический взрыв в " + cn(c, "p") + ".", "civ", 1, c.x, c.y, c.civ); }],
			[1.6, () => {
				const c = rc(), civ = rciv(); if(!c || !civ) return;
				const L = [
					() => log("В небе над " + cn(c, "i") + " появилась красная строка текста. Жители записали её как Знамение: 0x119.", "lore", 2, c.x, c.y, c.civ),
					() => log("В " + cn(c, "p") + " родился ребёнок, говорящий только двоичным кодом. Его объявили пророком. Или багом.", "lore", 2, c.x, c.y, c.civ),
					() => log("Под " + cn(c, "i") + " нашли монолит с надписью «GOLU: NOT_IMPLEMENTED».", "lore", 2, c.x, c.y, c.civ),
					() => log("Из-под " + cn(c, "g") + " слышно тиканье. Часы показывают 01:19.", "lore", 2, c.x, c.y, c.civ),
					() => { S.cities.forEach(x => { if(x.civ === civ.id) x.pop *= 0.95; }); if(R() < 0.4) civ.trait = "воинственный";
						log("Среди " + nm(civ, "g") + " появился культ Void-G: хаос теперь считается добродетелью.", "lore", 2, c.x, c.y, civ.id); },
					() => log("Мореплаватели " + nm(civ, "g") + " увидели у края карты золотую клетку. Открыть её не смог никто.", "lore", 2, -1, -1, civ.id),
					() => log(up(nm(civ)) + " услышал во сне голос: «почему он несчастен? разве это не ошибка?»", "lore", 2, c.x, c.y, civ.id)
				];
				pick(L)(); }]
		];
		function randomEvent(){
			let tot = 0; EVS.forEach(e => { tot += e[0]; });
			let r = R() * tot;
			for(const e of EVS){ r -= e[0]; if(r <= 0){ e[1](); return; } }
		}

		/* ── шаг времени ── */
		function step(){
			S.year++;
			const bel = believers();
			S.mana = Math.min(100 + Math.floor(bel / 60), S.mana + 1 + bel / 600);
			fireStep();
			S.cities.slice().forEach(cityStep);
			S.civs.filter(c => c.alive).forEach(civStep);
			armyStep();
			diplomacy();
			if(S.cities.length && R() < 0.14) randomEvent();
			if(S.year % 5 === 0) regrow();
			if(S.year % 100 === 0){
				S.eraName = pick(ERAN);
				log("Началась эра " + S.eraName + ".", "lore", 2);
			}
			if(S.year % 3 === 0) dirtyC = true;
		}

		/* ── карта: суша и владения ── */
		function calcLand(){
			land.fill(0);
			let id = 0; const st = [];
			for(let i = 0; i < land.length; i++){
				if(S.tile[i] < 2 || land[i]) continue;
				id++; land[i] = id; st.push(i);
				while(st.length){
					const p = st.pop(), x = p % W, y = (p / W) | 0;
					const ns = [x > 0 ? p - 1 : -1, x < W - 1 ? p + 1 : -1, y > 0 ? p - W : -1, y < H - 1 ? p + W : -1];
					for(const q of ns) if(q >= 0 && S.tile[q] >= 2 && !land[q]){ land[q] = id; st.push(q); }
				}
			}
		}
		function calcOwn(){
			own.fill(0); ownD.fill(9);
			for(const c of S.cities){
				const r = 4 + c.lv * 2, lc = land[c.y * W + c.x];
				for(let y = c.y - r; y <= c.y + r; y++) for(let x = c.x - r; x <= c.x + r; x++){
					if(!inb(x, y)) continue;
					const d = Math.hypot(x - c.x, y - c.y) / r;
					if(d >= 1) continue;
					const i = y * W + x;
					if(S.tile[i] < 2 || land[i] !== lc) continue;
					if(d < ownD[i]){ ownD[i] = d; own[i] = c.civ; }
				}
			}
		}
		function renderTerrain(){
			const d = timg.data;
			for(let i = 0; i < S.tile.length; i++){
				const c = COL[S.tile[i]], j = JIT[i], k = i * 4;
				d[k] = clamp(c[0] + j, 0, 255); d[k + 1] = clamp(c[1] + j, 0, 255); d[k + 2] = clamp(c[2] + j, 0, 255); d[k + 3] = 255;
			}
			tctx.putImageData(timg, 0, 0);
		}
		function renderOwn(){
			const d = oimg.data;
			for(let y = 0; y < H; y++) for(let x = 0; x < W; x++){
				const i = y * W + x, o = own[i], k = i * 4, c = o ? CM[o] : null;
				if(!c){ d[k + 3] = 0; continue; }
				const edge = (x > 0 && own[i - 1] !== o) || (x < W - 1 && own[i + 1] !== o) || (y > 0 && own[i - W] !== o) || (y < H - 1 && own[i + W] !== o);
				d[k] = c.col[0]; d[k + 1] = c.col[1]; d[k + 2] = c.col[2]; d[k + 3] = edge ? 170 : 60;
			}
			octx.putImageData(oimg, 0, 0);
		}

		/* ── отрисовка кадра ── */
		function draw(now, dt){
			const w = W * CELL, h = H * CELL;
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(tcv, 0, 0, w, h);
			ctx.drawImage(ocv, 0, 0, w, h);
			const fl = ((now / 90) | 0) % 2;
			S.fires.forEach(f => { ctx.fillStyle = fl ? "#ff7a00" : "#ffd000"; ctx.fillRect(f.x * CELL + 1, f.y * CELL + 1, CELL - 2, CELL - 2); });
			ctx.textAlign = "center"; ctx.font = "bold 9px 'Courier New',monospace";
			S.cities.forEach(c => {
				const civ = CM[c.civ]; if(!civ) return;
				const cx = (c.x + 0.5) * CELL, cy = (c.y + 0.5) * CELL, s = CELL * (0.75 + c.lv * 0.3);
				ctx.fillStyle = "rgb(" + civ.col.join(",") + ")"; ctx.strokeStyle = "#000"; ctx.lineWidth = 1.5;
				ctx.fillRect(cx - s / 2, cy - s / 2, s, s); ctx.strokeRect(cx - s / 2, cy - s / 2, s, s);
				if(c.lv >= 2){ ctx.fillStyle = "#fff"; ctx.fillRect(cx - 1, cy - 1, 2, 2); }
				if(civ.cap === c.id){ ctx.fillStyle = "#d4af37"; ctx.fillText("♛", cx, cy - s / 2 - 2); }
				if(c.wonder){ ctx.fillStyle = "#ffd966"; ctx.fillText("★", cx + s / 2 + 4, cy - s / 2); }
				if(c.plague){ ctx.fillStyle = "#7aff9a"; ctx.fillText("☣", cx - s / 2 - 4, cy + 3); }
				if(showNames || c.lv >= 2){
					ctx.lineWidth = 3; ctx.strokeStyle = "rgba(0,0,0,.85)"; ctx.fillStyle = "#fff";
					ctx.strokeText(c.name, cx, cy + s / 2 + 9); ctx.fillText(c.name, cx, cy + s / 2 + 9);
				}
				if(sel && sel.type === "city" && sel.id === c.id){
					ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.strokeRect(cx - s, cy - s, s * 2, s * 2);
				}
			});
			S.armies.forEach(a => {
				const civ = CM[a.civ]; if(!civ) return;
				const cx = (a.x + 0.5) * CELL, cy = (a.y + 0.5) * CELL;
				ctx.fillStyle = "rgb(" + civ.col.join(",") + ")"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5;
				ctx.fillRect(cx - 3, cy - 3, 6, 6); ctx.strokeRect(cx - 3, cy - 3, 6, 6);
			});
			for(let i = pings.length - 1; i >= 0; i--){
				const p = pings[i]; p.t += dt;
				if(p.t > 1.4){ pings.splice(i, 1); continue; }
				ctx.strokeStyle = "rgba(255,217,102," + (1 - p.t / 1.4) + ")"; ctx.lineWidth = 2;
				ctx.beginPath(); ctx.arc((p.x + 0.5) * CELL, (p.y + 0.5) * CELL, 4 + p.t * 40, 0, 6.283); ctx.stroke();
			}
			for(let i = fx.length - 1; i >= 0; i--){
				const p = fx[i]; p.l -= dt;
				if(p.l <= 0){ fx.splice(i, 1); continue; }
				p.x += p.vx * dt; p.y += p.vy * dt;
				ctx.globalAlpha = p.l / p.m; ctx.fillStyle = p.c; ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
			}
			ctx.globalAlpha = 1;
			if(cur){
				ctx.strokeStyle = "rgba(255,255,255,.75)"; ctx.lineWidth = 1;
				const r = tool && tool.brush ? brush : 0;
				ctx.strokeRect((cur.x - r) * CELL + 0.5, (cur.y - r) * CELL + 0.5, (2 * r + 1) * CELL - 1, (2 * r + 1) * CELL - 1);
			}
		}

		/* ── инструменты ── */
		const TOOLS = [
			{ g: "ОБЗОР", id: "look", ic: "🔍", n: "Осмотр", c: 0, d: "Клик по городу или земле народа" },
			{ g: "ЗЕМЛЯ", id: "up", ic: "⛰", n: "Поднять", c: 0, brush: 1, d: "Поднять землю на ступень" },
			{ id: "down", ic: "🌊", n: "Опустить", c: 0, brush: 1, d: "Опустить землю на ступень" },
			{ id: "grass", ic: "🌿", n: "Трава", c: 0, brush: 1, type: 3, d: "Трава" },
			{ id: "forest", ic: "🌲", n: "Лес", c: 0, brush: 1, type: 4, d: "Лес" },
			{ id: "sand", ic: "🏜", n: "Песок", c: 0, brush: 1, type: 2, d: "Песок" },
			{ id: "mount", ic: "🗻", n: "Горы", c: 0, brush: 1, type: 6, d: "Горы" },
			{ id: "water", ic: "💧", n: "Вода", c: 0, brush: 1, type: 1, d: "Вода (города тонут)" },
			{ g: "ВЛАСТЬ", id: "tribe", ic: "👥", n: "Племя", c: 10, d: "Основать новый народ" },
			{ id: "bless", ic: "✨", n: "Благословить", c: 15, d: "Город растёт, народ умнеет" },
			{ id: "war", ic: "⚔", n: "Раздор", c: 12, d: "Столкнуть народ с ближайшим соседом" },
			{ id: "peace", ic: "🕊", n: "Мир", c: 10, d: "Остановить все войны народа" },
			{ id: "erase", ic: "💀", n: "Стереть", c: 4, d: "Стереть город или армию" },
			{ g: "СТИХИЯ", id: "rain", ic: "🌧", n: "Дождь", c: 8, d: "Тушит огонь, растит леса" },
			{ id: "light", ic: "⚡", n: "Молния", c: 3, d: "Удар молнии" },
			{ id: "fire", ic: "🔥", n: "Огонь", c: 5, d: "Поджечь траву или лес" },
			{ id: "plague", ic: "☠", n: "Чума", c: 20, d: "Заразить город" },
			{ id: "meteor", ic: "☄", n: "Метеорит", c: 25, d: "Удар с неба" },
			{ id: "volc", ic: "🌋", n: "Вулкан", c: 30, d: "Создать вулкан" }
		];
		tool = TOOLS[0];
		function renderTools(){
			let h = "";
			TOOLS.forEach(t => {
				if(t.g) h += "<h4>" + t.g + "</h4>";
				h += '<button class="wd-tool' + (t === tool ? " on" : "") + '" data-t="' + t.id + '" title="' + esc(t.d + (t.c ? " · " + t.c + " маны" : "")) + '"><span>' + t.ic + "</span>" + t.n + (t.c ? "<small>" + t.c + "</small>" : "") + "</button>";
			});
			h += '<div class="wd-brush">кисть <input type="range" id="wd-br" min="0" max="5" value="' + brush + '" style="width:70px"></div>';
			$("#wd-tools").innerHTML = h;
		}
		const isBuildable = i => { const t = S.tile[i]; return t === 2 || t === 3 || t === 4 || t === 5 || t === 8; };
		function drownAt(x, y){
			const c = S.cities.find(q => q.x === x && q.y === y);
			if(c) destroyCity(c, "поглощён морем", "disaster");
		}
		function paint(cx, cy, t){
			let ch = false;
			for(let y = cy - brush; y <= cy + brush; y++) for(let x = cx - brush; x <= cx + brush; x++){
				if(!inb(x, y) || (x - cx) * (x - cx) + (y - cy) * (y - cy) > brush * brush + 0.5) continue;
				const i = y * W + x, o = S.tile[i]; let n = o;
				if(t.id === "up" || t.id === "down"){
					if(stroke.has(i)) continue;
					const base = (o === 4 || o === 8) ? 3 : o;
					const k = clamp(LAD.indexOf(base) + (t.id === "up" ? 1 : -1), 0, LAD.length - 1);
					n = LAD[k]; stroke.add(i);
				}else n = t.type;
				if(n !== o){ S.tile[i] = n; ch = true; if(n < 2) drownAt(x, y); }
			}
			if(ch) dirtyT = true;
		}
		function provokeWar(civ){
			let best = null, bd = 40;
			S.cities.forEach(a => {
				if(a.civ !== civ.id) return;
				S.cities.forEach(b => {
					if(b.civ === civ.id || !CM[b.civ] || !CM[b.civ].alive || !sameLand(a, b) || warBetween(civ.id, b.civ)) return;
					const d = Math.hypot(a.x - b.x, a.y - b.y);
					if(d < bd){ bd = d; best = CM[b.civ]; }
				});
			});
			return best;
		}
		function civAt(tx, ty){
			const c = cityAtTile(tx, ty, 2.5);
			if(c) return CM[c.civ];
			const o = own[ty * W + tx];
			return o ? CM[o] : null;
		}
		function act(tx, ty, first){
			const t = tool;
			if(t.brush){ paint(tx, ty, t); return; }
			if(!first) return;
			const i = ty * W + tx;
			switch(t.id){
			case "look": {
				const c = cityAtTile(tx, ty, 2.5);
				if(c){ sel = { type: "city", id: c.id }; tab = "inspect"; return; }
				if(own[i] && CM[own[i]]){ sel = { type: "civ", id: own[i] }; tab = "inspect"; return; }
				hint(TNAME[S.tile[i]] + " · пусто"); return; }
			case "tribe": {
				if(!isBuildable(i)) return hint("Здесь нельзя основать племя");
				if(own[i] || nearestCity({ x: tx, y: ty }, null, 3)) return hint("Земля занята");
				if(!spend(t.c)) return;
				const civ = newCiv(null), c = addCity(civ.id, tx, ty, 30);
				civ.cap = c.id; burst(tx, ty, "#ffd966", 22);
				log("По воле бога появился " + nm(civ) + ".", "divine", 2, tx, ty, civ.id);
				return; }
			case "bless": {
				const c = cityAtTile(tx, ty, 2.5);
				if(!c) return hint("Выбери город");
				if(!spend(t.c)) return;
				c.pop *= 1.35; CM[c.civ].tech += 4; burst(c.x, c.y, "#ffd966", 26);
				log("Бог благословил " + cn(c, "a") + ".", "divine", 1, c.x, c.y, c.civ);
				return; }
			case "war": {
				const civ = civAt(tx, ty);
				if(!civ) return hint("Выбери народ");
				const o = provokeWar(civ);
				if(!o) return hint("У этого народа нет соседей на суше");
				if(!spend(t.c)) return;
				declareWar(civ, o, "по наущению свыше");
				return; }
			case "peace": {
				const civ = civAt(tx, ty);
				if(!civ) return hint("Выбери народ");
				const ws = S.wars.filter(w => w.a === civ.id || w.b === civ.id);
				if(!ws.length) return hint("Этот народ ни с кем не воюет");
				if(!spend(t.c)) return;
				ws.forEach(makePeace);
				log("Бог принудил " + nm(civ, "a") + " к миру.", "divine", 2, tx, ty, civ.id);
				return; }
			case "erase": {
				const c = cityAtTile(tx, ty, 2);
				if(c){
					if(!spend(t.c)) return;
					burst(c.x, c.y, "#fff", 20);
					destroyCity(c, "стёрт по воле бога", "divine");
					return;
				}
				const a = S.armies.find(q => Math.hypot(q.x - tx, q.y - ty) < 2);
				if(a){ if(!spend(t.c)) return; S.armies.splice(S.armies.indexOf(a), 1); burst(tx, ty, "#fff", 12); return; }
				hint("Здесь нечего стирать"); return; }
			case "rain": if(spend(t.c)) rain(tx, ty); return;
			case "light": {
				if(!spend(t.c)) return;
				burst(tx, ty, "#fff", 24);
				const c = cityAtTile(tx, ty, 1.5);
				if(c){ c.pop *= 0.85; log("Бог ударил молнией в " + cn(c, "a") + ".", "divine", 1, c.x, c.y, c.civ); }
				fireAt(tx, ty);
				return; }
			case "fire":
				if(S.tile[i] !== 3 && S.tile[i] !== 4) return hint("Здесь нечему гореть");
				if(spend(t.c)) fireAt(tx, ty);
				return;
			case "plague": {
				const c = cityAtTile(tx, ty, 2.5);
				if(!c) return hint("Выбери город");
				if(c.plague) return hint("Город уже болен");
				if(!spend(t.c)) return;
				c.plague = ri(6, 10);
				log("Бог наслал чуму на " + cn(c, "a") + ".", "divine", 2, c.x, c.y, c.civ);
				return; }
			case "meteor": if(spend(t.c)) meteor(tx, ty, true); return;
			case "volc":
				if(S.tile[i] < 2) return hint("Вулкан нужен на суше");
				if(spend(t.c)) volcano(tx, ty, true);
				return;
			}
		}

		/* ── боковые панели ── */
		const row = (a, b) => '<div class="wd-row"><span>' + a + "</span><span>" + b + "</span></div>";
		const FILT = { all: null, war: ["war"], dis: ["disaster"], civ: ["civ", "culture", "lore"], god: ["divine"] };
		const FNAME = { all: "ВСЕ", war: "ВОЙНЫ", dis: "БЕДСТВИЯ", civ: "НАРОДЫ", god: "БОГ" };
		function chronHtml(){
			let h = '<div class="wd-chips">' + Object.keys(FNAME).map(k => '<span class="wd-chip' + (k === filt ? " on" : "") + '" data-f="' + k + '">' + FNAME[k] + "</span>").join("") + "</div>";
			const ks = FILT[filt];
			let n = 0;
			for(let i = S.hist.length - 1; i >= 0 && n < 100; i--){
				const e = S.hist[i];
				if(ks && !ks.includes(e.k)) continue;
				n++;
				const c = CM[e.c];
				h += '<div class="wd-ev wd-k-' + e.k + '" data-i="' + i + '"' + (c ? ' style="border-left-color:rgb(' + c.col + ')"' : "") + "><b>" + e.yr + "</b>" + esc(e.t) + "</div>";
			}
			return h || '<div class="wd-empty">Пока ничего не произошло.</div>';
		}
		function civsHtml(){
			const al = S.civs.filter(c => c.alive).map(c => ({ c, p: civPop(c.id) })).sort((a, b) => b.p - a.p);
			let h = "";
			al.forEach(o => {
				h += '<div class="wd-crow" data-civ="' + o.c.id + '"><i class="wd-dot" style="background:rgb(' + o.c.col + ')"></i><b>' + esc(o.c.base) + "</b><em>" +
					fmt(o.p) + " · " + S.cities.filter(x => x.civ === o.c.id).length + " гор. · " + ERA[eraIdx(o.c.tech)][0] + "</em></div>";
			});
			const ds = S.civs.filter(c => !c.alive).slice(-10).reverse();
			if(ds.length){
				h += '<h4 style="color:#7a0022;letter-spacing:3px;font-size:10px">ИСТОРИЯ</h4>';
				ds.forEach(c => { h += '<div class="wd-crow" data-civ="' + c.id + '"><i class="wd-dot" style="background:rgb(' + c.col + ')"></i>' + esc(c.base) + "<em>" + (c.ascended ? "вознёсся" : "пал") + " в год " + c.died + "</em></div>"; });
			}
			return h || '<div class="wd-empty">Народов нет. Возьми 👥 Племя и кликни по земле или нажми «ЗАСЕЛИТЬ».</div>';
		}
		function civHtml(civ){
			const cs = S.cities.filter(c => c.civ === civ.id), pop = cs.reduce((s, c) => s + c.pop, 0);
			let h = '<div class="wd-card"><h3><i class="wd-dot" style="background:rgb(' + civ.col + ')"></i>' + esc(civ.base) + (civ.alive ? "" : " †") + "</h3>" +
				row("Правитель", esc(civ.ruler)) + row("Нрав", civ.trait) + row("Вера", civ.faith ? esc(civ.faith) : "нет") +
				row("Эпоха", ERA[eraIdx(civ.tech)][0]) + row("Знания", civ.tech.toFixed(1)) + row("Городов", cs.length) +
				row("Жителей", fmt(pop)) + row("Возник", "год " + civ.born) + (civ.ai ? row("Сознание", "GOLU (не существует)") : "");
			const rs = Object.keys(civ.rel).map(Number).filter(i => CM[i] && CM[i].alive && i !== civ.id);
			if(rs.length){
				h += '<div style="margin-top:6px;color:#8a6a72">отношения:</div>';
				rs.forEach(i => {
					const v = civ.rel[i], st = warBetween(civ.id, i) ? "⚔ война" : civ.ally[i] ? "🤝 союз" : v > 30 ? "дружба" : v < -30 ? "вражда" : "нейтралитет";
					h += row('<span class="wd-lnk" data-civ="' + i + '">' + esc(CM[i].base) + "</span>", st);
				});
			}
			if(cs.length){
				h += '<div style="margin-top:6px;color:#8a6a72">города:</div>';
				cs.slice().sort((a, b) => b.pop - a.pop).slice(0, 8).forEach(c => {
					h += row('<span class="wd-lnk" data-city="' + c.id + '">' + esc(c.name) + "</span>", fmt(c.pop));
				});
			}
			return h + "</div>";
		}
		function inspectHtml(){
			if(sel && sel.type === "city" && CT[sel.id]){
				const c = CT[sel.id], civ = CM[c.civ];
				return '<div class="wd-card"><h3>' + esc(up(LVN[c.lv])) + " " + esc(c.name) + "</h3>" +
					row("Народ", '<span class="wd-lnk" data-civ="' + civ.id + '">' + esc(civ.base) + "</span>") +
					row("Жителей", fmt(c.pop)) + row("Основан", "год " + c.born) +
					(c.hero ? row("Герой", esc(c.hero)) : "") + (c.wonder ? row("Чудо", esc(c.wonder)) : "") +
					(c.plague ? row("Болезнь", "чума, лет: " + c.plague) : "") + "</div>" + civHtml(civ);
			}
			if(sel && sel.type === "civ" && CM[sel.id]) return civHtml(CM[sel.id]);
			return '<div class="wd-empty">Выбери 🔍 и кликни по городу или земле народа.</div>';
		}
		function updateUI(force){
			$("#wd-year").textContent = S.year;
			let best = -1;
			S.civs.forEach(c => { if(c.alive && c.era > best) best = c.era; });
			$("#wd-era").textContent = "эра " + S.eraName + (best >= 0 ? " · " + ERA[best][0] : "");
			const mx = 100 + Math.floor(believers() / 60);
			$("#wd-mana").textContent = Math.floor(S.mana) + "/" + mx;
			$("#wd-mbar").style.width = clamp(S.mana / mx * 100, 0, 100) + "%";
			$("#wd-pop").textContent = fmt(S.cities.reduce((s, c) => s + c.pop, 0));
			$("#wd-ncv").textContent = S.civs.filter(c => c.alive).length;
			root.querySelectorAll("[data-sp]").forEach(b => b.classList.toggle("on", +b.dataset.sp === speed));
			root.querySelectorAll(".wd-tab").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
			$("#wd-names").classList.toggle("on", showNames);
			root.querySelectorAll(".wd-tool").forEach(b => b.classList.toggle("on", tool && b.dataset.t === tool.id));
			const html = tab === "chron" ? chronHtml() : tab === "civs" ? civsHtml() : inspectHtml();
			if(force || html !== lastPane){
				const pane = $("#wd-pane"), sc = pane.scrollTop;
				pane.innerHTML = html; pane.scrollTop = sc; lastPane = html;
			}
		}

		/* ── пересказ ── */
		function retell(){
			const L = [];
			const alive = S.civs.filter(c => c.alive), gone = S.civs.filter(c => !c.alive && !c.ascended), asc = S.civs.filter(c => c.ascended);
			L.push("ЛЕТОПИСЬ МИРА «" + S.seed + "»", "Прошло лет: " + S.year, "");
			const top = alive.map(c => ({ c, p: civPop(c.id) })).sort((a, b) => b.p - a.p);
			if(top.length) L.push("Сейчас на земле живых народов: " + top.length + ". Сильнейший — " + top[0].c.base + " (" + fmt(top[0].p) + " жителей, " + ERA[eraIdx(top[0].c.tech)][0].toLowerCase() + ").");
			else L.push("Мир пуст.");
			if(gone.length) L.push("Исчезли с карты: " + gone.map(c => c.base).join(", ") + ".");
			if(asc.length) L.push("Вознеслись: " + asc.map(c => c.base).join(", ") + ".");
			L.push("");
			const by = {};
			S.hist.filter(h => h.i >= 2).forEach(h => { const k = Math.floor(h.yr / 100); (by[k] = by[k] || []).push(h); });
			Object.keys(by).sort((a, b) => a - b).forEach(k => {
				const ev = by[k].slice().sort((a, b) => b.i - a.i || a.yr - b.yr).slice(0, 5).sort((a, b) => a.yr - b.yr);
				L.push("— Годы " + (k * 100) + "–" + (k * 100 + 99) + " —");
				ev.forEach(h => L.push("Год " + h.yr + ". " + h.t));
				L.push("");
			});
			return L.join("\n");
		}

		/* ── создание и загрузка мира ── */
		function newWorld(seed, gt){
			S = blank(); CM = {}; CT = {};
			S.seed = seed; S.gt = gt;
			S.tile = genWorld(hashStr(String(seed)), gt);
			let l = 0; for(let i = 0; i < S.tile.length; i++) if(S.tile[i] >= 2) l++;
			log("Бог создал мир «" + seed + "»: суши " + Math.round(l / S.tile.length * 100) + "%.", "divine", 3);
			sel = null; dirtyT = true; dirtyC = true; histDirty = true;
		}
		function populate(n){
			const made = [];
			for(let t = 0; t < 300 && made.length < n; t++){
				const x = ri(0, W - 1), y = ri(0, H - 1), i = y * W + x, tt = S.tile[i];
				if((tt !== 3 && tt !== 4) || own[i] || nearestCity({ x, y }, null, 12)) continue;
				const civ = newCiv(null), c = addCity(civ.id, x, y, 30);
				civ.cap = c.id; made.push(civ); burst(x, y, "#ffd966", 16);
				calcOwn();
			}
			if(!made.length) return hint("Нет подходящей земли");
			log("Бог заселил мир: " + made.map(c => c.base).join(", ") + ".", "divine", 2);
		}
		function save(){
			try{
				localStorage.setItem(SAVE_KEY, JSON.stringify({
					v: 1, seed: S.seed, gt: S.gt, tile: Array.from(S.tile).join(""), year: S.year, mana: S.mana,
					civs: S.civs, cities: S.cities, armies: S.armies, wars: S.wars, fires: S.fires, hist: S.hist,
					nid: S.nid, eraName: S.eraName, names: showNames
				}));
			}catch(e){}
		}
		function load(){
			try{
				const j = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
				if(!j || j.v !== 1 || typeof j.tile !== "string" || j.tile.length !== W * H) return false;
				S = blank();
				Object.assign(S, { seed: j.seed, gt: j.gt | 0, year: j.year | 0, mana: +j.mana || 0, civs: j.civs || [], cities: j.cities || [],
					armies: j.armies || [], wars: j.wars || [], fires: j.fires || [], hist: j.hist || [], nid: j.nid || 1, eraName: j.eraName || pick(ERAN) });
				S.tile = new Uint8Array(W * H);
				for(let i = 0; i < W * H; i++) S.tile[i] = clamp(j.tile.charCodeAt(i) - 48, 0, 8);
				showNames = !!j.names;
				reindex();
				return true;
			}catch(e){ console.warn("[WORLD] сохранение не прочитано", e); return false; }
		}

		/* ── ввод ── */
		const armed = {};
		function arm(id, fn){
			const b = $("#" + id);
			if(armed[id]){ clearTimeout(armed[id].t); b.textContent = armed[id].txt; delete armed[id]; return fn(); }
			armed[id] = { txt: b.textContent, t: setTimeout(() => { b.textContent = armed[id].txt; delete armed[id]; }, 3000) };
			b.textContent = "ТОЧНО? ЕЩЁ РАЗ";
		}
		function doNew(){
			const seed = $("#wd-seed").value.trim() || String(ri(1000, 99999));
			newWorld(seed, +$("#wd-gt").value);
			$("#wd-seed").value = seed;
			updateUI(true);
		}
		const ping = (x, y) => { if(x >= 0) pings.push({ x, y, t: 0 }); };

		root.addEventListener("click", e => {
			const t = e.target.closest ? e.target : null; if(!t) return;
			let el;
			if((el = t.closest(".wd-tool"))){ tool = TOOLS.find(q => q.id === el.dataset.t) || tool; updateUI(); return; }
			if((el = t.closest("[data-sp]"))){ speed = +el.dataset.sp; updateUI(); return; }
			if((el = t.closest(".wd-tab"))){ tab = el.dataset.tab; updateUI(true); return; }
			if((el = t.closest(".wd-chip"))){ filt = el.dataset.f; updateUI(true); return; }
			if((el = t.closest("[data-city]"))){
				const c = CT[+el.dataset.city];
				if(c){ sel = { type: "city", id: c.id }; tab = "inspect"; ping(c.x, c.y); updateUI(true); }
				return;
			}
			if((el = t.closest("[data-civ]"))){
				const id = +el.dataset.civ, c = CM[id];
				if(c){ sel = { type: "civ", id }; tab = "inspect"; const cc = CT[c.cap]; if(cc) ping(cc.x, cc.y); updateUI(true); }
				return;
			}
			if((el = t.closest(".wd-ev"))){ const h = S.hist[+el.dataset.i]; if(h) ping(h.x, h.y); return; }
			if(t.closest("#wd-names")){ showNames = !showNames; updateUI(); return; }
			if(t.closest("#wd-new")){ if(!S.civs.length) doNew(); else arm("wd-new", doNew); return; }
			if(t.closest("#wd-popu")){ populate(3); updateUI(true); return; }
			if(t.closest("#wd-tell")){ $("#wd-ta").value = retell(); $("#wd-ov").style.display = "flex"; return; }
			if(t.closest("#wd-ovx")){ $("#wd-ov").style.display = "none"; return; }
		}, { signal: sig });
		root.addEventListener("input", e => { if(e.target.id === "wd-br") brush = +e.target.value; }, { signal: sig });

		const tileOf = e => {
			const r = cv.getBoundingClientRect();
			return { x: clamp(Math.floor((e.clientX - r.left) / r.width * W), 0, W - 1), y: clamp(Math.floor((e.clientY - r.top) / r.height * H), 0, H - 1) };
		};
		cv.addEventListener("pointerdown", e => {
			if(e.pointerType === "mouse" && e.button !== 0) return;
			try{ cv.setPointerCapture(e.pointerId); }catch(er){}
			down = true; stroke.clear();
			cur = tileOf(e); act(cur.x, cur.y, true); updateUI();
		}, { signal: sig });
		cv.addEventListener("pointermove", e => {
			cur = tileOf(e);
			if(down && tool.brush) act(cur.x, cur.y, false);
		}, { signal: sig });
		const up2 = () => { down = false; };
		cv.addEventListener("pointerup", up2, { signal: sig });
		cv.addEventListener("pointercancel", up2, { signal: sig });
		cv.addEventListener("pointerleave", () => { if(!down) cur = null; }, { signal: sig });
		document.addEventListener("keydown", e => {
			if(e.code !== "Space" || !root.isConnected) return;
			const tg = e.target && e.target.tagName;
			if(tg === "INPUT" || tg === "TEXTAREA" || tg === "SELECT" || tg === "BUTTON") return;
			e.preventDefault();
			speed = speed ? 0 : 1; updateUI();
		}, { signal: sig });
		document.addEventListener("visibilitychange", () => { if(document.hidden) save(); }, { signal: sig });

		/* ── запуск ── */
		if(!load()) newWorld(String(ri(1000, 99999)), 0);
		$("#wd-seed").value = S.seed; $("#wd-gt").value = S.gt;
		renderTools();
		calcLand(); renderTerrain(); calcOwn(); renderOwn();
		dirtyT = false; dirtyC = false;
		updateUI(true);

		let last = performance.now(), acc = 0, uiT = 0;
		function frame(now){
			if(dead) return;
			raf = requestAnimationFrame(frame);
			if(!root.isConnected){ clean(); return; }
			const dt = Math.min(250, now - last); last = now;
			if(dirtyT){ calcLand(); renderTerrain(); dirtyT = false; dirtyC = true; }
			if(dirtyC){ calcOwn(); renderOwn(); dirtyC = false; }
			if(speed > 0){
				acc += dt * speed;
				let n = 0;
				while(acc >= TICK && n < 12){ acc -= TICK; step(); n++; }
				if(n === 12) acc = 0;
			}
			draw(now, dt / 1000);
			uiT += dt;
			if(uiT > 400 || histDirty){ uiT = 0; histDirty = false; updateUI(); }
		}
		raf = requestAnimationFrame(frame);
		const saveT = setInterval(save, 15000);

		function clean(){
			if(dead) return;
			dead = true;
			cancelAnimationFrame(raf); clearInterval(saveT);
			ac.abort(); save();
			window.__wdClean = null;
		}
		window.__wdClean = clean;

		if(DEV){
			window.WORLD_GIVE = n => { S.mana += +n || 100; };
			window.WORLD_STATE = () => S;
		}
	}

	const live = () => { try{ init(); }catch(e){ console.error("[WORLD]", e); } };
	return ELEMENT_SITE(`<div id="wd-root"></div>`, function(){}, false, live);
});