REGISTER_PAGE("database", "DΛ⛧†Λ : Bλ₳$Ξ", function(){

	const PROCS = [
		{ key: "sranspang", file: "SRANSPANG.lit", desc: "безумный помощник. кровь, смех, шум" },
		{ key: "crybird",   file: "CRYBIRD.lit",   desc: "плачущая птица. не слушай её" }
	];

	const STATUSES = [
		{ k: "STABLE",    c: "#7aa87a", w: 5 },
		{ k: "UNSTABLE",  c: "#ffcc00", w: 3 },
		{ k: "CORRUPTED", c: "#ff0044", w: 2 },
		{ k: "WATCHED",   c: "#00e5ff", w: 2 },
		{ k: "ARCHIVED",  c: "#8a6a72", w: 2 }
	];
	const STATUS_W = STATUSES.reduce((a, s) => a + s.w, 0);

	const GL = "01▒░█▓#$%&@§Ξλ₳†⛧";
	const LOGS = [
		"индекс пересобран",
		"GOLU читает запись [{k}]",
		"аномалия в секторе {h}",
		"кто-то открыл базу данных",
		"проверка целостности: ОШИБКА",
		"проверка целостности: ОК (нет)",
		"запись [{k}] изменена без ведома GOLU",
		"1:19",
		"найден посторонний процесс. игнорирую",
		"счётчик посетителей: NaN",
		"[{k}] дышит",
		"резервная копия потеряна. это нормально"
	];

	const rand = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
	const pick = arr => arr[Math.floor(Math.random() * arr.length)];
	const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
	const p2 = n => String(n).padStart(2, "0");
	const hex = (n, len) => n.toString(16).toUpperCase().padStart(len, "0");
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
	const hash = s => {
		let h = 2166136261;
		for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
		return h >>> 0;
	};
	const fmtDate = ts => { const d = new Date(ts); return p2(d.getDate()) + "." + p2(d.getMonth() + 1) + " " + p2(d.getHours()) + ":" + p2(d.getMinutes()); };

	// ================================================================
	//  ПАМЯТЬ ПОСЕЩЕНИЙ (localStorage["db_visits"])
	//  { "ключ_страницы": { n: сколько раз, f: первый раз, l: последний раз } }
	// ================================================================
	const VKEY = "db_visits";

	function loadVisits(){
		let v = {};
		try { v = JSON.parse(localStorage.getItem(VKEY) || "{}"); } catch(e){}
		if (!v || typeof v !== "object" || Array.isArray(v)) v = {};
		// миграция со старой версии (там был просто список ключей)
		try {
			const old = JSON.parse(localStorage.getItem("db_seen") || "[]");
			if (Array.isArray(old)) old.forEach(k => { if (!v[k]) v[k] = { n: 1, f: 0, l: 0 }; });
		} catch(e){}
		return v;
	}
	function saveVisits(v){ try { localStorage.setItem(VKEY, JSON.stringify(v)); } catch(e){} }

	let lastK = null, lastT = 0;
	function visit(id){
		id = String(id || "");
		if (!window.PAGES || !window.PAGES[id]) return;             // записываем только настоящие страницы
		const now = Date.now();
		if (id === lastK && now - lastT < 1500) return;             // OPEN_PAGE вызывается дважды на один переход
		lastK = id; lastT = now;
		const v = loadVisits();
		const r = v[id] || { n: 0, f: now, l: now };
		r.n++; r.l = now; if (!r.f) r.f = now;
		v[id] = r;
		saveVisits(v);
	}

	// перехват OPEN_PAGE: любой переход по сайту записывается (CORE.js менять не надо)
	if (!window.__dbVisitHook){
		window.__dbVisitHook = true;
		const orig = window.OPEN_PAGE;
		if (typeof orig === "function"){
			window.OPEN_PAGE = function(id){
				try { visit(id); } catch(e){}
				return orig.apply(this, arguments);
			};
		}
		// запасной вариант: переход по ссылке с #хэшем
		window.addEventListener("hashchange", () => {
			try { visit(window.location.hash.replace(/^#/, "")); } catch(e){}
		});
	}

	// ---------- данные страниц ----------
	const keys = Object.keys(PAGES);
	const entries = keys.map((key, i) => {
		const h = hash(key);
		let r = h % STATUS_W, st = STATUSES[0];
		for (const s of STATUSES){ if (r < s.w){ st = s; break; } r -= s.w; }
		const p = PAGES[key];
		return {
			key, idx: i + 1,
			title: (p && p.t) || key || "main",
			id: "0x" + hex(h & 0xFFFF, 4),
			idNum: h & 0xFFFF,
			size: 1 + (h >>> 8) % 900,
			lvl: 1 + (h >>> 20) % 5,
			st, here: key === "database"
		};
	}).sort((a, b) => a.key.localeCompare(b.key));

	const total = entries.length;
	const corrupted = entries.filter(e => e.st.k === "CORRUPTED").length;
	const sizeSum = entries.reduce((a, e) => a + e.size, 0);
	const sizeTxt = sizeSum >= 1024 ? (sizeSum / 1024).toFixed(1) + " МБ" : sizeSum + " КБ";

	// ================================================================
	//  ОБНОВЛЕНИЕ "ИЗУЧЕНО" (читает память и красит текущую страницу)
	// ================================================================
	function refresh(){
		const v = loadVisits();
		let seenN = 0, visitsN = 0;
		keys.forEach(k => { const r = v[k]; if (r && r.n > 0){ seenN++; visitsN += r.n; } });

		document.querySelectorAll("#db-grid .db-card").forEach(c => {
			const r = v[c.dataset.key];
			const on = !!(r && r.n > 0);
			c.classList.toggle("seen", on);
			const tick = c.querySelector(".db-tick");
			if (tick) tick.hidden = !on;
			const line = c.querySelector(".db-seen");
			if (line) line.textContent = on ? ("изучено ×" + r.n + (r.l ? " · " + fmtDate(r.l) : "")) : "не изучено";
		});

		const a = document.getElementById("db-s-seen");
		if (a) a.textContent = seenN + "/" + total;
		const b = document.getElementById("db-s-visits");
		if (b) b.textContent = visitsN;
	}

	// ---------- глобальные функции (вызываются из onclick/oninput) ----------
	window.DB_OPEN = function(key){
		if (!PAGES[key] || key === "database") return;
		OPEN_PAGE(key);                       // запись посещения делает перехватчик
	};

	window.DB_RANDOM = function(){
		const list = keys.filter(k => k !== "database");
		if (list.length) window.DB_OPEN(pick(list));
	};

	window.DB_FILTER = function(){
		const inp = document.getElementById("db-search");
		const q = inp ? inp.value.trim().toLowerCase() : "";
		let shown = 0;
		document.querySelectorAll("#db-grid .db-card").forEach(c => {
			c.hidden = !!q && !c.dataset.search.includes(q);
			if (!c.hidden) shown++;
		});
		const cnt = document.getElementById("db-count");
		if (cnt) cnt.textContent = "показано " + shown + " из " + total;
		const em = document.getElementById("db-empty");
		if (em) em.hidden = shown !== 0;
	};

	window.DB_SORT = function(mode){
		const grid = document.getElementById("db-grid");
		if (!grid) return;
		const arr = Array.from(grid.children);
		if (mode === "name") arr.sort((a, b) => a.dataset.key.localeCompare(b.dataset.key));
		else if (mode === "id") arr.sort((a, b) => a.dataset.idn - b.dataset.idn);
		else if (mode === "chaos"){
			for (let i = arr.length - 1; i > 0; i--){ const j = rand(0, i); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
		}
		arr.forEach(c => grid.appendChild(c));
		document.querySelectorAll("#db-sorts .db-btn").forEach(b => b.classList.toggle("on", b.dataset.s === mode));
	};

	// очистка памяти: первый клик взводит кнопку, второй (в течение 3 сек) стирает
	let clrArmed = false, clrTimer = 0;
	function disarmClear(){
		clearTimeout(clrTimer); clrArmed = false;
		const b = document.getElementById("db-clear");
		if (b){ b.textContent = "🗑 ОЧИСТИТЬ ПАМЯТЬ"; b.classList.remove("armed"); }
	}
	window.DB_CLEAR = function(){
		const b = document.getElementById("db-clear");
		if (!clrArmed){
			clrArmed = true;
			if (b){ b.textContent = "⚠ ТОЧНО? ЖМИ ЕЩЁ РАЗ"; b.classList.add("armed"); }
			clrTimer = setTimeout(disarmClear, 3000);
			return;
		}
		disarmClear();
		try { localStorage.removeItem(VKEY); localStorage.removeItem("db_seen"); } catch(e){}
		lastK = null;
		refresh();
		if (window.__dbLog) window.__dbLog("память о посещениях стёрта. GOLU запомнит заново", true);
	};

	// ---------- HTML кусками ----------
	const procsHtml = PROCS.map(p => {
		const ok = !!PAGES[p.key];
		const pid = 1000 + hash(p.file) % 9000;
		const body = ok
			? `<div class="db-proc-body">
				<div class="db-gwrap"><canvas class="db-graph" width="260" height="64"></canvas><span class="db-gtag">CPU %</span></div>
				<div class="db-proc-stats">
					<div class="db-row"><span>CPU</span><b class="db-cpu">--</b></div>
					<div class="db-row"><span>MEM</span><b class="db-mem">--</b></div>
					<div class="db-row"><span>THR</span><b class="db-thr">--</b></div>
					<div class="db-row"><span>NET</span><b class="db-net">--</b></div>
					<div class="db-row"><span>UP</span><b class="db-up">--</b></div>
				</div>
			</div>`
			: `<div class="db-proc-body"><div class="db-gwrap db-nogr">[ ПРОЦЕСС НЕ НАЙДЕН ]</div></div>`;
		return `<div class="db-proc${ok ? "" : " off"}" ${ok ? `onclick="DB_OPEN('${esc(p.key)}')"` : ""}>
			<div class="db-proc-head"><span class="db-dot"></span><span class="db-proc-file">${esc(p.file)}</span><span class="db-proc-state">${ok ? "RUNNING" : "NOT FOUND"}</span></div>
			<div class="db-proc-desc">${esc(p.desc)}</div>
			${body}
			<div class="db-proc-meta"><span>PID ${pid}</span><span>/lit/${esc(p.key)}</span></div>
		</div>`;
	}).join("");

	const cardsHtml = entries.map((e, i) => {
		const lvl = "●".repeat(e.lvl) + "○".repeat(5 - e.lvl);
		const cls = "db-card" + (e.st.k === "CORRUPTED" ? " bad" : "") + (e.here ? " here" : "");
		const click = e.here ? "" : `onclick="DB_OPEN('${esc(e.key)}')"`;
		return `<div class="${cls}" ${click} style="--i:${Math.min(i, 30)};--sc:${e.st.c}" data-key="${esc(e.key)}" data-idn="${e.idNum}" data-search="${esc((e.title + " " + e.key + " " + e.id).toLowerCase())}">
			<div class="db-top"><span class="db-num">№${String(e.idx).padStart(3, "0")}</span><span class="db-tick" hidden>✔</span><span class="db-chip">${e.here ? "ТЫ ЗДЕСЬ" : e.st.k}</span></div>
			<div class="db-ctitle" data-title="${esc(e.title)}">${esc(e.title)}</div>
			<div class="db-path">/lit/${esc(e.key)}</div>
			<div class="db-seen">не изучено</div>
			<div class="db-foot"><span>${e.id}</span><span>${e.size} КБ</span><span class="db-lvl" title="уровень доступа ${e.lvl}">${lvl}</span></div>
		</div>`;
	}).join("");

	// ================================================================
	//  УКРАШЕНИЯ: запускаются при КАЖДОМ открытии страницы (runafteropen)
	// ================================================================
	function afterOpen(){
		const root = document.getElementById("db-root");
		if (!root) return;

		// 1) память посещений: отдельно, чтобы работало даже если украшения упадут
		try { refresh(); } catch(e){ console.error("[DATABASE refresh]", e); }

		try {
			const alive = () => root.isConnected;

			// --- счётчик записей считает вверх ---
			let c = 0;
			const cIv = setInterval(() => {
				if (!alive()){ clearInterval(cIv); return; }
				c += Math.max(1, Math.ceil(total / 25));
				if (c >= total){ c = total; clearInterval(cIv); }
				const a = document.getElementById("db-s-total");
				if (a) a.textContent = c;
			}, 40);

			// --- график CPU ---
			function makeGraph(cv, base){
				const ctx = cv.getContext("2d");
				if (!ctx) return null;
				const W = cv.width, H = cv.height, N = 48, step = W / (N - 1), gs = step * 4;
				let walk = base, spike = 0, ticks = 0;
				const gen = () => {
					if (spike > 0){ spike--; return rand(88, 100); }
					if (Math.random() < 0.05){ spike = rand(1, 3); return rand(85, 98); }
					walk += (base - walk) * 0.15 + (Math.random() - 0.5) * 20;
					walk = clamp(walk, 2, 78);
					return walk;
				};
				const s = [];
				for (let i = 0; i < N + 1; i++) s.push(gen());
				let next = gen();
				const Y = v => H - 2 - (v / 100) * (H - 4);
				return {
					last: () => s[s.length - 1],
					tick(){ s.push(next); s.shift(); next = gen(); ticks++; },
					draw(t){
						ctx.clearRect(0, 0, W, H);
						// сетка (вертикальные линии едут вместе с графиком)
						ctx.lineWidth = 1;
						ctx.strokeStyle = "rgba(212,175,55,.12)";
						for (let i = 1; i < 4; i++){
							const y = Math.round(H * i / 4) + .5;
							ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
						}
						const shift = ((ticks + t) * step) % gs;
						for (let j = 0; j < W / gs + 2; j++){
							const x = Math.round(W - shift - j * gs) + .5;
							if (x < 0) break;
							ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
						}
						// линия
						const M = s.length;
						const hv = s[M - 1] + (next - s[M - 1]) * t;
						const hot = hv > 85;
						const rgb = hot ? "255,0,68" : "122,255,154";
						ctx.beginPath();
						for (let k = 0; k < M; k++){
							const x = W - ((M - 1 - k) + t) * step;
							if (k === 0) ctx.moveTo(x, Y(s[k])); else ctx.lineTo(x, Y(s[k]));
						}
						ctx.lineTo(W, Y(hv));
						ctx.strokeStyle = "rgb(" + rgb + ")";
						ctx.lineWidth = 1.5;
						ctx.stroke();
						// заливка под линией
						ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
						const g = ctx.createLinearGradient(0, 0, 0, H);
						g.addColorStop(0, "rgba(" + rgb + ",.35)");
						g.addColorStop(1, "rgba(" + rgb + ",0)");
						ctx.fillStyle = g;
						ctx.fill();
						// точка на конце
						ctx.fillStyle = "rgb(" + rgb + ")";
						ctx.fillRect(W - 3, Y(hv) - 2, 3, 4);
					}
				};
			}

			const procs = Array.from(root.querySelectorAll(".db-proc:not(.off)")).map(el => {
				const cv = el.querySelector(".db-graph");
				return {
					g: cv ? makeGraph(cv, rand(12, 38)) : null,
					cpu: el.querySelector(".db-cpu"), mem: el.querySelector(".db-mem"),
					thr: el.querySelector(".db-thr"), net: el.querySelector(".db-net"),
					up: el.querySelector(".db-up"),
					m: rand(200, 700), th: rand(4, 24), up0: rand(600, 90000), t0: performance.now()
				};
			}).filter(p => p.g);

			const fmtUp = s => Math.floor(s / 3600) + ":" + p2(Math.floor(s / 60) % 60) + ":" + p2(s % 60);
			const paint = p => {
				const v = Math.round(p.g.last());
				p.cpu.textContent = v + "%";
				p.cpu.classList.toggle("hot", v > 85);
				p.m = clamp(p.m + rand(-9, 9) + (v > 85 ? 25 : 0), 120, 980);
				p.mem.textContent = Math.round(p.m) + " МБ";
				if (Math.random() < 0.15) p.th = clamp(p.th + rand(-1, 1), 2, 40);
				p.thr.textContent = p.th;
				p.net.textContent = Math.round(v * rand(3, 9)) + " КБ/с";
				p.up.textContent = fmtUp(p.up0 + Math.floor((performance.now() - p.t0) / 1000));
			};

			const INT = 450;
			let lastS = performance.now();
			procs.forEach(p => { p.g.draw(0); paint(p); });
			const frame = now => {
				if (!alive()) return;
				if (now - lastS >= INT){
					lastS = now;
					procs.forEach(p => { p.g.tick(); paint(p); });
				}
				const t = Math.min(1, (now - lastS) / INT);
				procs.forEach(p => p.g.draw(t));
				requestAnimationFrame(frame);
			};
			requestAnimationFrame(frame);

			// --- расшифровка названия при наведении ---
			const grid = document.getElementById("db-grid");
			const scramble = el => {
				const final = Array.from(el.dataset.title);
				if (el._tm) clearInterval(el._tm);
				let f = 0;
				el._tm = setInterval(() => {
					f++;
					if (f >= 14 || !el.isConnected){
						el.textContent = el.dataset.title;
						clearInterval(el._tm); el._tm = 0;
						return;
					}
					const fixed = Math.floor(final.length * f / 14);
					el.textContent = final.map((ch, i) => (i < fixed || ch === " ") ? ch : GL[rand(0, GL.length - 1)]).join("");
				}, 35);
			};
			grid.addEventListener("mouseover", ev => {
				const card = ev.target.closest(".db-card");
				if (!card || card._hov) return;
				card._hov = true;
				scramble(card.querySelector(".db-ctitle"));
			});
			grid.addEventListener("mouseout", ev => {
				const card = ev.target.closest(".db-card");
				if (card && !card.contains(ev.relatedTarget)) card._hov = false;
			});

			// --- журнал ---
			const logBox = document.getElementById("db-log");
			const logLine = (text, mine) => {
				if (!alive()) return;
				const row = document.createElement("div");
				row.className = "db-logline" + (mine ? " me" : "");
				const d = new Date();
				row.textContent = "[" + p2(d.getHours()) + ":" + p2(d.getMinutes()) + ":" + p2(d.getSeconds()) + "] > " + text;
				logBox.appendChild(row);
				while (logBox.children.length > 8) logBox.removeChild(logBox.firstChild);
			};
			window.__dbLog = logLine;
			logLine("соединение с GOLU установлено");
			const v = loadVisits();
			const seenN = keys.filter(k => v[k] && v[k].n > 0).length;
			logLine("изучено записей: " + seenN + " из " + total, true);
			const nextLog = () => {
				if (!alive()) return;
				logLine(pick(LOGS).replace("{k}", keys.length ? (pick(keys) || "main") : "?").replace("{h}", "0x" + hex(rand(0, 0xFFFF), 4)));
				setTimeout(nextLog, rand(2500, 6000));
			};
			setTimeout(nextLog, 2000);
		} catch(e){
			console.error("[DATABASE]", e);
			const box = document.getElementById("db-err");
			if (box) box.textContent = "✖ украшения не запустились: " + (e && e.message ? e.message : e);
		}
	}

	return ELEMENT_SITE(
		`
<style>
.db-wrap{padding:1.5rem;color:#e8d9b0;font-family:'Courier New',monospace;max-width:1300px;margin:0 auto}
.db-wrap *{box-sizing:border-box}
.db-panel{position:relative;background:linear-gradient(180deg,#0b0508,#050003);border:1px solid #3a1020;padding:1.6rem 1.4rem;box-shadow:0 0 40px rgba(122,0,34,.35),inset 0 0 60px rgba(0,0,0,.8);overflow:hidden}
.db-corner{position:absolute;width:20px;height:20px;border:2px solid #d4af37;pointer-events:none}
.db-corner.tl{top:-1px;left:-1px;border-right:0;border-bottom:0}
.db-corner.tr{top:-1px;right:-1px;border-left:0;border-bottom:0}
.db-corner.bl{bottom:-1px;left:-1px;border-right:0;border-top:0}
.db-corner.br{bottom:-1px;right:-1px;border-left:0;border-top:0}

.db-head{text-align:center;margin-bottom:1.4rem}
.db-sub{color:#d4af37;letter-spacing:.35em;font-size:.75rem;opacity:.85;margin-bottom:.6rem}
.db-title{position:relative;display:inline-block;margin:0;font-size:2.4em;letter-spacing:.14em;color:#ff0044;text-shadow:0 0 12px #ff0044,0 0 30px #7a0022}
.db-title::before,.db-title::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;overflow:hidden;white-space:nowrap;text-shadow:none}
.db-title::before{color:#d4af37;animation:db-g1 3.3s infinite steps(1)}
.db-title::after{color:#00e5ff;animation:db-g2 2.4s infinite steps(1)}
@keyframes db-g1{0%,88%,100%{clip-path:inset(0 0 100% 0);transform:none}90%{clip-path:inset(20% 0 55% 0);transform:translate(-4px,0)}94%{clip-path:inset(60% 0 10% 0);transform:translate(3px,0)}}
@keyframes db-g2{0%,80%,100%{clip-path:inset(0 0 100% 0);transform:none}82%{clip-path:inset(45% 0 30% 0);transform:translate(4px,0)}86%{clip-path:inset(5% 0 80% 0);transform:translate(-3px,0)}}
.db-lore{color:#8a6a72;font-style:italic;font-size:.82rem;margin:.9rem 0 0}

.db-stats{display:flex;flex-wrap:wrap;gap:.8rem;margin-bottom:1.4rem}
.db-stat{flex:1;min-width:120px;border:1px solid #2a0a14;background:rgba(0,0,0,.4);padding:.6rem .8rem;text-align:center}
.db-stat b{display:block;font-size:1.5rem;color:#d4af37;text-shadow:0 0 10px rgba(212,175,55,.4)}
.db-stat span{font-size:.65rem;letter-spacing:.2em;color:#8a6a72}
.db-stat.red b{color:#ff0044;text-shadow:0 0 10px rgba(255,0,68,.5)}
.db-stat.green b{color:#7aff9a;text-shadow:0 0 10px rgba(122,255,154,.4)}

.db-h{display:flex;align-items:center;gap:.8rem;color:#d4af37;letter-spacing:.25em;font-size:.8rem;margin:1.6rem 0 .8rem}
.db-h::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,#3a1020,transparent)}

.db-procs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:1rem}
.db-proc{border:1px solid #4a1a28;background:linear-gradient(135deg,rgba(122,0,34,.25),rgba(0,0,0,.6));padding:.9rem 1rem;cursor:pointer;transition:border-color .25s,box-shadow .25s,transform .25s}
.db-proc:hover{border-color:#ff0044;box-shadow:0 0 22px rgba(255,0,68,.35);transform:translateY(-2px)}
.db-proc.off{opacity:.45;cursor:not-allowed}
.db-proc-head{display:flex;align-items:center;gap:.6rem}
.db-dot{width:9px;height:9px;border-radius:50%;background:#7aff9a;box-shadow:0 0 8px #7aff9a;animation:db-pulse 1.2s infinite}
.db-proc.off .db-dot{background:#555;box-shadow:none;animation:none}
@keyframes db-pulse{50%{opacity:.25}}
.db-proc-file{color:#ffdd33;font-size:1.25rem;font-weight:bold}
.db-proc-state{margin-left:auto;font-size:.65rem;letter-spacing:.2em;color:#7aff9a}
.db-proc.off .db-proc-state{color:#888}
.db-proc-desc{color:#8a6a72;font-size:.8rem;margin:.5rem 0}
.db-proc-body{display:flex;gap:.8rem;align-items:stretch;margin:.5rem 0}
.db-gwrap{position:relative;flex:1;min-width:0}
.db-graph{display:block;width:100%;height:64px;background:#030002;border:1px solid #2a0a14}
.db-gtag{position:absolute;top:3px;left:6px;font-size:.55rem;letter-spacing:.2em;color:#6a4a55;pointer-events:none}
.db-nogr{display:flex;align-items:center;justify-content:center;height:64px;border:1px dashed #3a1020;color:#6a4a55;font-size:.7rem;letter-spacing:.2em}
.db-proc-stats{display:flex;flex-direction:column;justify-content:space-between;min-width:110px;font-size:.68rem}
.db-row{display:flex;justify-content:space-between;gap:.6rem;color:#6a4a55;letter-spacing:.1em}
.db-row b{color:#d4af37;font-weight:normal;font-variant-numeric:tabular-nums}
.db-row b.db-cpu{color:#7aff9a}
.db-row b.hot{color:#ff0044;font-weight:bold;text-shadow:0 0 8px rgba(255,0,68,.6)}
.db-proc-meta{display:flex;gap:1rem;font-size:.7rem;color:#b89a5a}

.db-ctrl{display:flex;flex-wrap:wrap;gap:.7rem;margin-bottom:.6rem}
.db-ctrl input{flex:1;min-width:200px;background:#0b0508;border:1px solid #4a1a28;color:#e8d9b0;padding:.55rem .9rem;font-family:inherit;outline:none}
.db-ctrl input:focus{border-color:#d4af37;box-shadow:0 0 12px rgba(212,175,55,.35)}
.db-btns{display:flex;gap:.4rem;flex-wrap:wrap}
.db-btn{background:transparent;border:1px solid #4a1a28;color:#b89a5a;padding:.5rem .9rem;font-family:inherit;cursor:pointer;letter-spacing:.1em;font-size:.78rem;transition:all .2s}
.db-btn:hover{border-color:#d4af37;color:#d4af37}
.db-btn.on{background:#d4af37;color:#050003;border-color:#d4af37;font-weight:bold}
.db-btn.red{border-color:#ff0044;color:#ff0044}
.db-btn.red:hover{background:#ff0044;color:#fff;box-shadow:0 0 16px rgba(255,0,68,.6)}
.db-btn.armed{background:#ff0044;color:#fff;border-color:#ff0044;box-shadow:0 0 16px rgba(255,0,68,.6);animation:db-pulse .5s infinite}
.db-count{color:#6a4a55;font-size:.75rem;letter-spacing:.1em;margin-bottom:1rem}

.db-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));gap:1rem}
.db-card{--sc:#7aa87a;position:relative;display:flex;flex-direction:column;gap:.45rem;padding:.8rem .9rem;background:linear-gradient(180deg,#0d060a,#050003);border:1px solid #2a0a14;border-left:3px solid var(--sc);cursor:pointer;min-width:0;animation:db-in .5s backwards;animation-delay:calc(var(--i) * 35ms);transition:border-color .25s,box-shadow .25s,transform .25s}
@keyframes db-in{from{opacity:0;transform:translateY(10px)}}
.db-card[hidden]{display:none}
.db-card:hover{border-color:var(--sc);box-shadow:0 0 20px var(--sc);transform:translateY(-3px)}
.db-card.here{cursor:default;opacity:.55}
.db-card.here:hover{transform:none;box-shadow:none}
.db-card.bad{animation:db-in .5s backwards,db-shake 5s 2s infinite steps(1)}
@keyframes db-shake{0%,93%,100%{transform:none}94%{transform:translate(-2px,1px)}96%{transform:translate(3px,-1px);border-color:#00e5ff}98%{transform:translate(-1px,0)}}
.db-top{display:flex;align-items:center;gap:.5rem;font-size:.68rem}
.db-num{color:#ff0044;letter-spacing:.1em;opacity:.8}
.db-tick{color:#7aff9a;text-shadow:0 0 8px rgba(122,255,154,.6)}
.db-chip{margin-left:auto;color:var(--sc);border:1px solid var(--sc);padding:0 .4rem;letter-spacing:.12em;font-size:.6rem}
.db-ctitle{font-size:1.1rem;font-weight:bold;color:#fff;min-height:1.4em;word-break:break-word}
.db-path{font-size:.7rem;color:#b89a5a}
.db-seen{font-size:.65rem;color:#4a3a40;letter-spacing:.05em}
.db-card.seen .db-seen{color:#7aff9a}
.db-card.seen{background:linear-gradient(180deg,#0d0a08,#050003)}
.db-foot{display:flex;justify-content:space-between;gap:.5rem;font-size:.65rem;color:#6a4a55;border-top:1px dashed #3a1020;padding-top:.4rem;margin-top:auto}
.db-lvl{color:#d4af37;letter-spacing:.1em}
.db-empty{text-align:center;color:#6a4a55;padding:2rem;letter-spacing:.2em}
.db-empty[hidden]{display:none}

.db-log{height:150px;overflow:hidden;background:#000;border:1px solid #1a0a10;padding:.6rem .8rem;font-size:.74rem;color:#7aa87a}
.db-logline{white-space:pre-wrap;word-break:break-word}
.db-logline.me{color:#d4af37}
.db-end{text-align:center;margin-top:1.6rem;color:#6a4a55;letter-spacing:.3em;font-size:.72rem}
.db-err{color:#ff4444;font-size:.75rem;margin-top:1rem;white-space:pre-wrap}
</style>

<div class="db-wrap" id="db-root">
	<div class="db-panel">
		<span class="db-corner tl"></span><span class="db-corner tr"></span><span class="db-corner bl"></span><span class="db-corner br"></span>

		<div class="db-head">
			<div class="db-sub">𓆩 АРХИВ ПРОЦЕССОВ И ЗАПИСЕЙ 𓆪</div>
			<h1 class="db-title" data-text="LIT. DATA-BASE (${total})">LIT. DATA-BASE (<span id="db-title-count">${total}</span>)</h1>
			<p class="db-lore">GOLU хранит всё. Ты видишь только то, что он ещё не стёр.</p>
		</div>

		<div class="db-stats">
			<div class="db-stat"><b id="db-s-total">${total}</b><span>ЗАПИСЕЙ</span></div>
			<div class="db-stat green"><b id="db-s-seen">0/${total}</b><span>ИЗУЧЕНО</span></div>
			<div class="db-stat"><b id="db-s-visits">0</b><span>ВИЗИТОВ</span></div>
			<div class="db-stat red"><b>${corrupted}</b><span>ПОВРЕЖДЕНО</span></div>
			<div class="db-stat"><b>${sizeTxt}</b><span>ОБЪЁМ</span></div>
		</div>

		<div class="db-h">⛧ ПРОЦЕССЫ GOLU</div>
		<div class="db-procs" id="db-procs">${procsHtml}</div>

		<div class="db-h">⛧ ВСЕ ЗАПИСИ</div>
		<div class="db-ctrl">
			<input type="text" id="db-search" placeholder="🔎 поиск по названию, ключу или ID" autocomplete="off" oninput="DB_FILTER()">
			<div class="db-btns" id="db-sorts">
				<button class="db-btn on" data-s="name" onclick="DB_SORT('name')">А-Я</button>
				<button class="db-btn" data-s="id" onclick="DB_SORT('id')">ID</button>
				<button class="db-btn" data-s="chaos" onclick="DB_SORT('chaos')">ХАОС</button>
			</div>
			<button class="db-btn red" onclick="DB_RANDOM()">🎲 СЛУЧАЙНАЯ ЗАПИСЬ</button>
			<button class="db-btn" id="db-clear" onclick="DB_CLEAR()">🗑 ОЧИСТИТЬ ПАМЯТЬ</button>
		</div>
		<div class="db-count" id="db-count">показано ${total} из ${total}</div>
		<div class="db-grid" id="db-grid">${cardsHtml}</div>
		<div class="db-empty" id="db-empty" hidden>[ НИЧЕГО НЕ НАЙДЕНО. ИЛИ GOLU ЭТО СКРЫЛ ]</div>

		<div class="db-h">⛧ ЖУРНАЛ СИСТЕМЫ</div>
		<div class="db-log" id="db-log"></div>

		<div class="db-end">[-===- /ALL/ -===-]</div>
		<div class="db-err" id="db-err"></div>
	</div>
</div>
`,
		function(){},      // колбэк при загрузке сайта: тут делать нечего
		false,
		afterOpen          // а вот это запускается при каждом открытии страницы
	);
});