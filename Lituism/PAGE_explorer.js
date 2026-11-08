/* ═══════════════════════════════════════════════════════════
   PAGE_explorer.js — ПРОВОДНИК GOLU_OS (интерфейс; файлы в GOLU_FILES.js)
   Ключ: explorer · корень #ex-root · префикс ex- · сохранение ex_save_v1
   ═══════════════════════════════════════════════════════════ */

REGISTER_PAGE("explorer", "📁 EXPlore-.rer", function(){

	const SAVE_KEY = "ex_save_v1";
	const MAX_SEARCH = 200;

	const $  = (s, r) => (r || document).querySelector(s);
	const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
	const pad = n => String(n).padStart(2, "0");
	function hash(a, b){
		let h = (a * 374761393 + b * 668265263) >>> 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
		return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
	}

	const CSS = `
#ex-root{font:13px 'Courier New',monospace;color:#e8d9b0;text-shadow:none;padding:14px;box-sizing:border-box}
#ex-root *{box-sizing:border-box}
#ex-root button,#ex-root input{font:inherit}
#ex-win{position:relative;display:flex;flex-direction:column;height:min(78vh,720px);min-height:460px;background:#0a0004;border:1px solid #7a0022;box-shadow:0 0 30px rgba(255,0,68,.25),inset 0 0 40px rgba(255,0,68,.08);overflow:hidden;outline:none}
.ex-title{display:flex;justify-content:space-between;align-items:center;padding:6px 10px;background:linear-gradient(90deg,#3a0014,#12060a);border-bottom:1px solid #7a0022;color:#ffd966;letter-spacing:2px;font-size:12px}
.ex-clk{color:#8a6a72}
#ex-win.ex-red .ex-clk{color:#ff0044;animation:ex-blink 1s steps(2) infinite}
@keyframes ex-blink{50%{opacity:.3}}
.ex-tool{display:flex;gap:6px;padding:6px 8px;border-bottom:1px solid #3a1020;background:#0e0307;align-items:center;flex-wrap:wrap}
.ex-b{cursor:pointer;padding:4px 10px;border:1px solid #3a1020;background:linear-gradient(180deg,#1a0a10,#0b0508);color:#e8d9b0;letter-spacing:1px;user-select:none}
.ex-b:hover:not(:disabled){border-color:#d4af37;color:#ffd966}
.ex-b:disabled{opacity:.35;cursor:default}
.ex-b.on{border-color:#d4af37;color:#ffd966}
.ex-b.danger{border-color:#7a0022;color:#ff4d7a}
.ex-b.danger:hover:not(:disabled){background:#7a0022;color:#fff}
#ex-addr,#ex-find{background:#050002;border:1px solid #3a1020;color:#ffd966;padding:4px 8px;outline:none}
#ex-addr:focus,#ex-find:focus{border-color:#d4af37}
#ex-addr{flex:1;min-width:120px}
#ex-find{width:150px}
.ex-main{flex:1;display:flex;min-height:0}
.ex-side{width:170px;flex:none;border-right:1px solid #3a1020;background:#0c0206;overflow:auto;padding:6px 0}
.ex-sd{display:flex;gap:8px;align-items:center;padding:6px 12px;cursor:pointer;color:#c9a24a;white-space:nowrap}
.ex-sd:hover{background:rgba(255,0,68,.1)}
.ex-sd.on{background:rgba(212,175,55,.12);color:#ffd966;box-shadow:inset 3px 0 0 #d4af37}
.ex-list{flex:1;position:relative;overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));grid-auto-rows:min-content;gap:6px;padding:10px;align-content:start}
.ex-empty{grid-column:1/-1;text-align:center;color:#5a3a42;padding:40px;letter-spacing:3px}
.ex-it{display:flex;flex-direction:column;align-items:center;padding:6px 4px;border:1px solid transparent;cursor:pointer;user-select:none;-webkit-user-select:none;text-align:center;overflow:hidden}
.ex-it:hover{background:rgba(255,0,68,.1);border-color:#3a1020}
.ex-it.sel{background:rgba(212,175,55,.14);border-color:#d4af37}
.ex-it.is-hid{opacity:.55}
.ex-ic{height:72px;width:100%;display:flex;align-items:center;justify-content:center;font-size:44px;position:relative}
.ex-th{width:96px;height:72px;object-fit:cover;border:1px solid #3a1020;background:#000;display:block}
.ex-play{position:absolute;right:14px;bottom:4px;font-size:14px;color:#ffd966;text-shadow:0 0 6px #000}
.k-app .ex-ic,.k-link .ex-ic{filter:drop-shadow(0 0 6px #d4af37)}
.k-bin .ex-ic{filter:grayscale(.6)}
.ex-nm{font-size:11px;word-break:break-word;max-height:3.4em;overflow:hidden;margin-top:4px}
.ex-nm small{display:block;color:#6a4a52;font-size:9px}
.ex-meta{display:none}
.ex-list.list{grid-template-columns:1fr;gap:1px}
.ex-list.list .ex-it{flex-direction:row;align-items:center;text-align:left;gap:10px;padding:3px 8px}
.ex-list.list .ex-ic{width:36px;height:28px;font-size:20px}
.ex-list.list .ex-th{width:36px;height:28px}
.ex-vinyl{filter:drop-shadow(0 0 6px rgba(255,0,68,.35));transition:transform .3s ease}
.ex-it:hover .ex-vinyl{transform:rotate(15deg) scale(1.05)}
.ex-list.list .ex-ic svg{width:24px;height:24px}
.ex-list.list .ex-play{display:none}
.ex-list.list .ex-nm{flex:1;margin:0;max-height:none;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
.ex-list.list .ex-nm small{display:inline;margin-left:8px}
.ex-list.list .ex-meta{display:flex;gap:14px;color:#8a6a72;font-size:11px}
.ex-list.list .ex-m1{width:140px}
.ex-list.list .ex-m2{width:70px;text-align:right}
.ex-list.list .ex-m3{width:80px}
.ex-info{width:220px;flex:none;border-left:1px solid #3a1020;background:#0c0206;padding:12px;overflow:auto;font-size:12px}
.ex-bigic{font-size:54px;text-align:center;filter:drop-shadow(0 0 8px rgba(255,0,68,.5))}
.ex-in{text-align:center;color:#ffd966;word-break:break-word;margin:6px 0 10px}
.ex-ir{display:flex;justify-content:space-between;gap:8px;border-bottom:1px dashed #2a0a14;padding:3px 0;color:#8a6a72}
.ex-ir b{color:#e8d9b0;font-weight:normal;text-align:right;word-break:break-word}
.ex-desc{margin:10px 0;color:#c9a24a;font-style:italic;line-height:1.4}
.ex-info .ex-b{width:100%;margin-top:8px}
.ex-status{display:flex;justify-content:space-between;gap:10px;padding:4px 10px;border-top:1px solid #3a1020;background:#0e0307;color:#8a6a72;font-size:11px}
.ex-hot{color:#ffd966}
@media (max-width:760px){
.ex-side{width:44px}
.ex-sd{padding:8px 0;justify-content:center}
.ex-sd b{display:none}
.ex-info{display:none}
#ex-find{width:100px}
.ex-list.list .ex-m1,.ex-list.list .ex-m3{display:none}
}
`;
	function ensureCss(){
		if(document.getElementById("ex-css")) return;
		const s = document.createElement("style");
		s.id = "ex-css"; s.textContent = CSS;
		document.head.appendChild(s);
	}

	function init(attempt){
		attempt = attempt || 0;
		const rootEl = document.getElementById("ex-root");
		if(!rootEl){
			if(attempt < 30) return setTimeout(function(){ init(attempt + 1); }, 80);
			return console.warn("[EXPLORER] #ex-root не найден");
		}
		if(window.__exClean){ try{ window.__exClean(); }catch(e){} }
		const F = window.GOLU_FS;
		if(!F){
			rootEl.innerHTML = '<pre style="color:#ff4d7a;padding:20px">GOLU_FS.js не подключён. Проверь порядок и путь &lt;script&gt; в index.html.</pre>';
			return console.error("[EXPLORER] GOLU_FS.js не подключён");
		}
		if(typeof window.GOLU_LOAD_ARTS === "function"){ try{ window.GOLU_LOAD_ARTS(); }catch(e){} }
		ensureCss();

		const abort = new AbortController(), signal = abort.signal;
		const root = F.root;

		/* ── сохранение ── */
		const DEF = { path:"", view:"grid", hidden:false, opens:0 };
		let S;
		try{ S = Object.assign({}, DEF, JSON.parse(localStorage.getItem(SAVE_KEY) || "{}")); }
		catch(e){ S = Object.assign({}, DEF); }
		const persist = function(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){} };
		S.opens++; persist();

		/* ── каркас ── */
		rootEl.innerHTML =
			'<div id="ex-win" tabindex="0">' +
				'<div class="ex-title"><span>📁 ПРОВОДНИК · GOLU_OS</span><span class="ex-clk" id="ex-clk"></span></div>' +
				'<div class="ex-tool">' +
					'<button class="ex-b" data-a="back" title="Назад (Alt+←)">◀</button>' +
					'<button class="ex-b" data-a="fwd" title="Вперёд (Alt+→)">▶</button>' +
					'<button class="ex-b" data-a="up" title="Вверх (Backspace)">▲</button>' +
					'<input id="ex-addr" spellcheck="false" autocomplete="off">' +
					'<input id="ex-find" placeholder="🔍 поиск…" spellcheck="false" autocomplete="off">' +
					'<button class="ex-b" data-a="view"></button>' +
					'<button class="ex-b" data-a="hidden" title="Показать скрытые файлы">👁</button>' +
					'<button class="ex-b danger" data-a="empty" hidden>🗑 ОЧИСТИТЬ</button>' +
				'</div>' +
				'<div class="ex-main"><div class="ex-side" id="ex-side"></div><div class="ex-list" id="ex-list"></div><div class="ex-info" id="ex-info"></div></div>' +
				'<div class="ex-status"><span id="ex-st1"></span><span id="ex-st2"></span></div>' +
			'</div>';
		const winEl = $("#ex-win"), listEl = $("#ex-list"), sideEl = $("#ex-side"), infoEl = $("#ex-info");
		const addrEl = $("#ex-addr"), findEl = $("#ex-find"), st2 = $("#ex-st2");

		/* ── утилиты ── */
		const disp = n => "GOLU:\\" + F.pathOf(n).replace(/\//g, "\\");
		const KIND = { dir:"Папка", text:"Текстовый документ", image:"Изображение", audio:"Звук", video:"Видео", app:"Приложение", link:"Ярлык", bin:"Двоичный файл" };
		const visibleKids = d => F.kids(d, S.hidden).sort(F.cmp);
		function sizeOf(n){
			if(n.kind === "dir") return null;
			if(n.size != null) return n.size;
			if(typeof n.text === "function") return 256;
			const s = typeof n.text === "string" ? n.text : (typeof n.msg === "string" ? n.msg : null);
			if(s != null && s.length) return new TextEncoder().encode(s).length;
			return 2048 + Math.floor(hash(n.id, 5)*900000);
		}
		const fmtSize = b => b < 1024 ? b + " Б" : b < 1048576 ? (b/1024).toFixed(1) + " КБ" : (b/1048576).toFixed(1) + " МБ";
		const dateOf = n => n.date || ("20" + (24 + Math.floor(hash(n.id, 9)*3)) + "-" + pad(1 + Math.floor(hash(n.id, 10)*12)) + "-" + pad(1 + Math.floor(hash(n.id, 11)*28)));

		let cwd = root, sel = null, query = "", hist = [], hpos = -1, flashT = 0;

		/* ── статус ── */
		function flash(msg){
			st2.textContent = msg; st2.classList.add("ex-hot");
			clearTimeout(flashT);
			flashT = setTimeout(function(){ st2.classList.remove("ex-hot"); st2.textContent = "GOLU: NOT_IMPLEMENTED"; }, 3000);
		}
		function updateStatus(count){
			const hid = cwd.kids.filter(function(k){ return k.hidden && F.visible(k); }).length;
			$("#ex-st1").textContent = (count != null ? count : visibleKids(cwd).length) + " элем." +
				(!S.hidden && hid && !query ? " · скрытых: " + hid : "") + (sel ? " · выбрано: " + sel.name : "");
			if(!st2.classList.contains("ex-hot")) st2.textContent = "GOLU: NOT_IMPLEMENTED";
		}

		/* ── открытие ── */
		function openNode(n){
			if(n.kind === "dir") go(n);
			else F.open(n);
		}

		/* ── навигация ── */
		function go(n, noPush){
			if(!n) return;
			if(n.kind !== "dir"){ go(n.parent); select(n); return; }
			const lk = F.lockOf(n);
			if(lk){ F.askLock(lk, function(){ go(n); }); return; }
			cwd = n; sel = null; query = ""; findEl.value = "";
			if(!noPush){ hist = hist.slice(0, hpos + 1); hist.push(n); hpos = hist.length - 1; }
			F.startDir = n;
			S.path = disp(n); persist();
			render();
		}
		const back = function(){ if(hpos > 0){ hpos--; go(hist[hpos], true); } };
		const fwd  = function(){ if(hpos < hist.length - 1){ hpos++; go(hist[hpos], true); } };
		const up   = function(){ if(query){ query = ""; findEl.value = ""; render(); } else if(cwd.parent) go(cwd.parent); };
		function inside(n, anc){
			if(anc === root) return n === root;
			for(let x = n; x; x = x.parent) if(x === anc) return true;
			return false;
		}
		function del(n){
			if(!n || !n.parent || !n.parent.trash) return;
			if(n.keep){ flash(n.name + ": нельзя удалить. Стёрт из интернета, но не с диска."); return; }
			F.erase(n);
			sel = null; render();
		}
		/* ── можно ли скачать файл ── */
function canDownload(n){
	if(!n || n.kind === "dir" || n.kind === "app" || n.kind === "link") return false;
	// есть src — реальный файл
	if(n.src) return true;
	// текст — сохраним как .txt
	if(n.kind === "text") return true;
	// bin с текстом — сохраним как .bin
	if(n.kind === "bin" && (n.msg != null || n.text != null)) return true;
	return false;
}

/* ── скачать файл ── */
function downloadNode(n){
	if(!canDownload(n)) return;

	// 1) если есть src — качаем по ссылке
	if(n.src){
		const a = document.createElement("a");
		a.href = n.src;
		a.download = n.name;         // имя по умолчанию; браузер может проигнорировать для cross-origin
		a.rel = "noopener";
		document.body.appendChild(a);
		a.click();
		a.remove();
		flash("⬇ скачивание: " + n.name);
		return;
	}

	// 2) текст или bin с текстом — делаем blob
	let content = "", type = "application/octet-stream";
	if(n.kind === "text"){
		content = typeof n.text === "function" ? String(n.text()) : String(n.text || "");
		type = "text/plain;charset=utf-8";
	}else if(n.kind === "bin"){
		content = n.msg != null ? String(n.msg) : (n.text != null ? String(n.text) : "");
	}

	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = n.name || "file.bin";
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
	flash("⬇ скачано: " + (n.name || "file.bin"));
}
		
		/* ═══ мини-винил для аудио-файла в Проводнике ═══ */
/* ═══ мини-винил для аудио-файла в Проводнике ═══ */
function audioIcon(n){
	const key = String(n.name || "") + "|" + String(n.src || "");
	const G = window.GOLU_GRAD(key);

	const gid = "vg" + n.id;
	const gidL = "vl" + n.id;
	const cid = "vc" + n.id;     // clipPath для картинки

	// есть ли своя картинка
	const hasImg = !!(n.icon && typeof n.icon === "object" && n.icon.src);
	const imgSrc = hasImg ? esc(n.icon.src) : "";

	return '<svg class="ex-vinyl" viewBox="0 0 64 64" width="64" height="64">' +
		'<defs>' +
			'<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(' + G.angle + ' .5 .5)">' +
				'<stop offset="0%"   stop-color="' + G.a + '"/>' +
				'<stop offset="45%"  stop-color="' + G.b + '"/>' +
				'<stop offset="100%" stop-color="' + G.c + '"/>' +
			'</linearGradient>' +
			'<radialGradient id="' + gid + 'L" cx="35%" cy="30%" r="75%">' +
				'<stop offset="0%"   stop-color="' + G.a + '"/>' +
				'<stop offset="60%"  stop-color="' + G.b + '"/>' +
				'<stop offset="100%" stop-color="' + G.c + '"/>' +
			'</radialGradient>' +
			'<radialGradient id="' + gidL + '" cx="30%" cy="25%" r="60%">' +
				'<stop offset="0%"   stop-color="#fff" stop-opacity=".35"/>' +
				'<stop offset="100%" stop-color="#fff" stop-opacity="0"/>' +
			'</radialGradient>' +
			(hasImg
				? '<clipPath id="' + cid + '"><circle cx="32" cy="32" r="10"/></clipPath>'
				: '') +
		'</defs>' +
		// тело винила
		'<circle cx="32" cy="32" r="30" fill="url(#' + gid + ')" stroke="#050002" stroke-width="1.5"/>' +
		// насечки
		'<g opacity=".28" fill="none" stroke="#050002" stroke-width=".6">' +
			'<circle cx="32" cy="32" r="26"/>' +
			'<circle cx="32" cy="32" r="22"/>' +
			'<circle cx="32" cy="32" r="18"/>' +
			'<circle cx="32" cy="32" r="14"/>' +
		'</g>' +
		// блик
		'<circle cx="32" cy="32" r="30" fill="url(#' + gidL + ')" opacity=".5"/>' +
		// этикетка
		'<circle cx="32" cy="32" r="11" fill="url(#' + gid + 'L)" stroke="rgba(255,255,255,.25)" stroke-width=".5"/>' +
		// центральная картинка ИЛИ ♪
		(hasImg
			? '<image href="' + imgSrc + '" x="22" y="22" width="20" height="20" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + cid + ')"/>' +
			  '<circle cx="32" cy="32" r="10" fill="none" stroke="rgba(0,0,0,.55)" stroke-width=".8"/>'
			: '<text x="32" y="36" text-anchor="middle" font-size="10" fill="#fff" ' +
			  'font-family="Courier New,monospace" font-weight="bold" ' +
			  'style="text-shadow:0 0 3px #000">♪</text>') +
		// центральная дырка поверх
		'<circle cx="32" cy="32" r="1.5" fill="#050002"/>' +
	'</svg>';
}

		/* ── отрисовка ── */
		function itemHtml(n, withPath){
			let ic;
			if(n.kind === "image" && n.draw) ic = '<canvas class="ex-th" width="96" height="72" data-th="' + n.id + '"></canvas>';
			else if(n.kind === "image" && n.src) ic = '<img class="ex-th" loading="lazy" alt="" src="' + esc(n.src) + '">';
			else if(n.kind === "video" && n.draw) ic = '<canvas class="ex-th" width="96" height="72" data-th="' + n.id + '"></canvas><span class="ex-play">▶</span>';
			else if(n.kind === "video" && n.poster) ic = '<img class="ex-th" loading="lazy" alt="" src="' + esc(n.poster) + '"><span class="ex-play">▶</span>';
			else if(n.kind === "audio") ic = audioIcon(n);   // ← мини-винил
			else ic = F.icon(n);
			const sz = sizeOf(n);
			return '<div class="ex-it k-' + n.kind + (n.hidden ? " is-hid" : "") + (n === sel ? " sel" : "") + '" data-id="' + n.id + '" title="' + esc(n.name) + '">' +
				'<div class="ex-ic">' + ic + '</div>' +
				'<div class="ex-nm">' + esc(n.name) + (withPath ? '<small>' + esc(disp(n.parent)) + '</small>' : '') + '</div>' +
				'<div class="ex-meta"><span class="ex-m1">' + KIND[n.kind] + '</span><span class="ex-m2">' + (sz == null ? n.kids.length + " эл." : fmtSize(sz)) + '</span><span class="ex-m3">' + dateOf(n) + '</span></div></div>';
		}
		function renderSide(){
			const tops = F.kids(root, false).filter(function(k){ return k.kind === "dir"; })
				.map(function(k, i){ return [k, i]; })
				.sort(function(a, b){ return ((a[0].order != null ? a[0].order : 99) - (b[0].order != null ? b[0].order : 99)) || (a[1] - b[1]); })
				.map(function(x){ return x[0]; });
			sideEl.innerHTML = [root].concat(tops).map(function(n){
				return '<div class="ex-sd' + (inside(cwd, n) ? " on" : "") + '" data-go="' + n.id + '" title="' + esc(n === root ? "Этот компьютер" : n.name) + '"><span>' + F.icon(n) + '</span><b>' + esc(n === root ? "Этот компьютер" : n.name) + '</b></div>';
			}).join("");
		}
		function renderInfo(){
			const n = sel || cwd, sz = sizeOf(n);
			const row = function(k, v){ return '<div class="ex-ir"><span>' + k + '</span><b>' + esc(v) + '</b></div>'; };
			let h = '<div class="ex-bigic">' + F.icon(n) + '</div><div class="ex-in">' + esc(n === root ? "Этот компьютер" : n.name) + '</div>';
			h += row("Тип", KIND[n.kind]);
			h += row("Размер", sz == null ? n.kids.length + " эл." : fmtSize(sz));
			h += row("Изменён", dateOf(n));
			h += row("Где", disp(n.parent || root));
			if(n.keep) h += row("Защита", "не удаляется");
			if(n.desc) h += '<div class="ex-desc">' + esc(n.desc) + '</div>';
			if(sel) h += '<button class="ex-b" data-a="open">' + (sel.kind === "app" || sel.kind === "link" ? "▶ ЗАПУСТИТЬ" : "ОТКРЫТЬ") + '</button>';
			if(sel && canDownload(sel)) h += '<button class="ex-b" data-a="download">⬇ СКАЧАТЬ</button>';
			if(sel && sel.parent && sel.parent.trash) h += '<button class="ex-b danger" data-a="del">УДАЛИТЬ</button>';
			infoEl.innerHTML = h;
		}
		function render(){
			if(sel && !F.attached(sel)) sel = null;
			const q = query.trim().toLowerCase();
			let items;
			if(q){
				items = [];
				(function walk(d){
					d.kids.forEach(function(k){
						if(!F.visible(k) || (!S.hidden && k.hidden)) return;
						if(k.name.toLowerCase().indexOf(q) >= 0) items.push(k);
						if(k.kind === "dir" && !F.lockOf(k)) walk(k);
					});
				})(root);
				items = items.slice(0, MAX_SEARCH);
			}else items = visibleKids(cwd);
			listEl.className = "ex-list" + (S.view === "list" || q ? " list" : "");
			listEl.innerHTML = items.length ? items.map(function(k){ return itemHtml(k, !!q); }).join("") : '<div class="ex-empty">' + (q ? "НИЧЕГО НЕ НАЙДЕНО" : "ПАПКА ПУСТА") + '</div>';
			$$("canvas[data-th]", listEl).forEach(function(cv){
				const n = F.byId(+cv.dataset.th);
				if(!n || !n.draw) return;
				const c = cv.getContext("2d");
				try{ c.save(); if(n.kind === "video") n.draw(c, n.thumb || 0, cv.width, cv.height); else n.draw(c, cv.width, cv.height); c.restore(); }catch(e){ c.restore(); }
			});
			listEl.scrollTop = 0;
			if(document.activeElement !== addrEl) addrEl.value = disp(cwd);
			$("[data-a=back]", winEl).disabled = hpos <= 0;
			$("[data-a=fwd]", winEl).disabled = hpos >= hist.length - 1;
			$("[data-a=up]", winEl).disabled = !cwd.parent && !query;
			$("[data-a=view]", winEl).textContent = S.view === "list" ? "▦ ЗНАЧКИ" : "☰ СПИСОК";
			$("[data-a=hidden]", winEl).classList.toggle("on", !!S.hidden);
			$("[data-a=empty]", winEl).hidden = !cwd.trash;
			renderSide(); renderInfo(); updateStatus(items.length);
		}
		function select(n){
			sel = n;
			$$(".ex-it.sel", listEl).forEach(function(e){ e.classList.remove("sel"); });
			if(n){
				const e = listEl.querySelector('.ex-it[data-id="' + n.id + '"]');
				if(e){
					e.classList.add("sel");
					const top = e.offsetTop, bot = top + e.offsetHeight;
					if(top < listEl.scrollTop) listEl.scrollTop = top - 6;
					else if(bot > listEl.scrollTop + listEl.clientHeight) listEl.scrollTop = bot - listEl.clientHeight + 6;
				}
			}
			renderInfo(); updateStatus();
		}

		/* ── события ── */
		let lastId = 0, lastT = 0;
		listEl.addEventListener("click", function(e){
			const it = e.target.closest(".ex-it");
			if(!it){ select(null); return; }
			const n = F.byId(+it.dataset.id);
			if(!n) return;
			const now = Date.now();
			if(lastId === n.id && now - lastT < 450){ lastId = 0; openNode(n); return; }
			lastId = n.id; lastT = now; select(n);
		}, { signal:signal });
		sideEl.addEventListener("click", function(e){
			const s = e.target.closest("[data-go]");
			if(s) go(F.byId(+s.dataset.go));
		}, { signal:signal });
		winEl.addEventListener("click", function(e){
			const btn = e.target.closest("[data-a]");
			if(!btn || !(btn.closest(".ex-tool") || btn.closest(".ex-info"))) return;
			const a = btn.dataset.a;
			if(a === "back") back();
			else if(a === "fwd") fwd();
			else if(a === "up") up();
			else if(a === "view"){ S.view = S.view === "list" ? "grid" : "list"; persist(); render(); }
			else if(a === "hidden"){ S.hidden = !S.hidden; persist(); sel = null; render(); flash(S.hidden ? "Скрытые файлы: показаны" : "Скрытые файлы: спрятаны"); }
			else if(a === "open" && sel) openNode(sel);
			else if(a === "download" && sel) downloadNode(sel);
			else if(a === "del") del(sel);
			else if(a === "empty"){
				cwd.kids.slice().forEach(function(k){ if(!k.keep) del(k); });
				if(cwd.kids.some(function(k){ return k.keep; })) flash("wldoui.zip не удаляется: стёрт из интернета, но не с диска.");
				else flash("Корзина пуста.");
			}
		}, { signal:signal });
		addrEl.addEventListener("keydown", function(e){
			if(e.key === "Enter"){
				const n = F.resolve(addrEl.value, cwd);
				if(!n) flash("Путь не найден: " + addrEl.value);
				else if(n.kind === "dir") go(n);
				else { go(n.parent); select(n); }
				addrEl.blur();
			}else if(e.key === "Escape"){ addrEl.value = disp(cwd); addrEl.blur(); }
		}, { signal:signal });
		addrEl.addEventListener("blur", function(){ addrEl.value = disp(cwd); }, { signal:signal });
		findEl.addEventListener("input", function(){ query = findEl.value; sel = null; render(); }, { signal:signal });
		findEl.addEventListener("keydown", function(e){ if(e.key === "Escape"){ findEl.value = ""; query = ""; findEl.blur(); render(); } }, { signal:signal });
		winEl.addEventListener("pointerdown", function(e){ if(!e.target.closest("input,textarea,button")) winEl.focus({ preventScroll:true }); }, { signal:signal });
		winEl.addEventListener("keydown", function(e){
			const t = e.target.tagName;
			if(t === "INPUT" || t === "TEXTAREA") return;
			if(e.altKey && e.key === "ArrowLeft"){ back(); return; }
			if(e.altKey && e.key === "ArrowRight"){ fwd(); return; }
			if(e.key === "Backspace"){ e.preventDefault(); up(); }
			else if(e.key === "Enter" && sel) openNode(sel);
			else if(e.key === "Delete" && sel) del(sel);
			else if(["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].indexOf(e.key) >= 0){
				e.preventDefault();
				const els = $$(".ex-it", listEl);
				if(!els.length) return;
				let i = sel ? els.findIndex(function(x){ return +x.dataset.id === sel.id; }) : -1;
				i += (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : -1;
				i = Math.max(0, Math.min(els.length - 1, i));
				select(F.byId(+els[i].dataset.id));
			}
		}, { signal:signal });

		/* ── часы (01:19 — красное время) ── */
		function tick(){
			const d = new Date(), hm = pad(d.getHours()) + ":" + pad(d.getMinutes());
			$("#ex-clk").textContent = hm + ":" + pad(d.getSeconds());
			winEl.classList.toggle("ex-red", hm === "01:19");
		}
		const clock = setInterval(tick, 1000); tick();

		/* ── связь с GOLU_FS ── */
		const onDir = function(n){ go(n); };
		F.onDir = onDir;
		F.onMsg = flash;
		const unsub = F.onChange(function(){
			if(!F.attached(cwd)) go(root, true);
			else render();
		});

		/* ── очистка при смене страницы (окна файлов остаются открытыми) ── */
		window.__exClean = function(){
			abort.abort();
			clearInterval(clock); clearTimeout(flashT); unsub();
			if(F.onDir === onDir) F.onDir = null;
			if(F.onMsg === flash) F.onMsg = null;
			window.__exClean = null;
		};

		/* ── старт: папка, которую просили открыть, иначе последняя ── */
		let start = root;
		const sd = F.startDir;
		if(sd && sd.kind === "dir" && F.attached(sd) && !F.lockOf(sd)) start = sd;
		else if(S.path){ const p = F.resolve(S.path, root); if(p && p.kind === "dir" && !F.lockOf(p)) start = p; }
		go(start);
	}

	const live = function(){ try{ init(); }catch(e){ console.error("[EXPLORER]", e); } };
	return ELEMENT_SITE(`<div id="ex-root"></div>`, function(){}, false, live);
});