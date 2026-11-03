(function(){
	try {
		const out = window.__CL_BASES = window.__CL_BASES || [];
		if (document.currentScript && document.currentScript.src){
			const d = new URL(".", document.currentScript.src).href;
			if (!out.includes(d)) out.push(d);
		}
	} catch(e){}
})();

REGISTER_PAGE("testcss", "⛧ 𝗖𝗦𝗦 ∴ 𝗧𝗘𝗦𝗧 ⛧", function(){

	const INJ = "data-cl-inject";
	const DEF_TEXT = "<b>GLITCH CSS TEST</b>";
	const CLS = /\.(-?[_a-zA-Z][\w-]*)/g;
	const EFFECT_RE = /^(color|font|text-|letter-spacing|word-spacing|-webkit-text|-webkit-background-clip|background-clip|animation|transition|filter|content|clip-path|mix-blend-mode|transform)/;
	const $ = id => document.getElementById(id);

	let uploaded = null;
	let running = false;

	function boot(){
		const grid = $("cl-grid");
		if (!grid || grid.dataset.boot) return false;
		grid.dataset.boot = "1";
		run();
		return true;
	}

	function setBar(p, text, err){
		const f = $("cl-fill"), t = $("cl-bartext");
		if (!f || !t) return;
		f.style.width = Math.max(0, Math.min(100, Math.round(p))) + "%";
		t.textContent = text + (err ? "" : " · " + Math.round(p) + "%");
		t.style.color = err ? "#ff4444" : "";
	}

	const abs = u => { try { return new URL(u, document.baseURI).href; } catch(e){ return u; } };
	const fname = href => href.split("?")[0].split("/").pop() || href;
	const tick = () => new Promise(r => setTimeout(r, 0));
	async function readText(url){
		const r = await fetch(url, { cache: "no-store" });
		if (!r.ok) throw new Error("HTTP " + r.status);
		return r.text();
	}

	// ---------- где искать STYLES.css ----------
	function candidates(){
		const dirs = [];
		const addDir = u => {
			try { const d = new URL(".", u).href; if (!dirs.includes(d)) dirs.push(d); } catch(e){}
		};
		(window.__CL_BASES || []).forEach(addDir);
		document.querySelectorAll("script[src]").forEach(s => addDir(s.src));
		addDir(document.baseURI);
		try { addDir(new URL("../", document.baseURI).href); } catch(e){}

		const urls = [];
		const push = u => { if (!urls.includes(u)) urls.push(u); };
		try {
			performance.getEntriesByType("resource").forEach(e => {
				if (/\/styles\.css(\?|$)/i.test(e.name)) push(e.name);
			});
		} catch(e){}
		for (const d of dirs) for (const f of ["STYLES.css", "styles.css"]) push(d + f);
		return urls;
	}

	// ---------- сбор стилей ----------
	async function collect(){
		document.querySelectorAll("[" + INJ + '="file"]').forEach(n => n.remove());

		const sources = [];
		const tried = [];
		let mainFound = false;
		let mainRead = false;
		let mainUrl = "";

		const nodes = Array.from(document.querySelectorAll('style, link[rel~="stylesheet"]'))
			.filter(n => !n.hasAttribute(INJ) && n.id !== "cl-ui-style");

		for (let i = 0; i < nodes.length; i++){
			const n = nodes[i];
			setBar(3 + 25 * (i / Math.max(1, nodes.length)), "GOLU считывает стили сайта (" + (i + 1) + "/" + nodes.length + ")");
			await tick();

			if (n.tagName === "STYLE"){
				sources.push({ name: "<style> сайта", text: n.textContent });
				continue;
			}
			const href = abs(n.href);
			const name = fname(href);
			const isMain = /^styles\.css$/i.test(name);
			let sameOrigin = true;
			try { sameOrigin = new URL(href).origin === location.origin; } catch(e){}
			if (!isMain && !sameOrigin) continue;
			if (isMain){ mainFound = true; mainUrl = href; }

			let text = null;
			try { text = Array.from(n.sheet.cssRules).map(r => r.cssText).join("\n"); } catch(e){}
			if (text == null){
				try { text = await readText(href); }
				catch(e){ if (isMain) tried.push("✖ " + href + " — " + (e.message || e)); }
			}
			if (text != null){
				sources.push({ name, text });
				if (isMain) mainRead = true;
			}
		}

		if (!mainRead){
			setBar(30, "GOLU ищет свиток STYLES.css");
			let got = null;
			if (uploaded){
				got = { name: uploaded.name, text: uploaded.text, url: "выбран вручную" };
			} else {
				for (const u of candidates()){
					try { got = { name: fname(u), text: await readText(u), url: u }; break; }
					catch(e){ tried.push("✖ " + u + " — " + (e.message || e)); }
				}
			}
			if (got){
				sources.push({ name: got.name, text: got.text });
				mainRead = true;
				mainUrl = got.url;
				if (!mainFound){
					const st = document.createElement("style");
					st.setAttribute(INJ, "file");
					st.textContent = got.text;
					document.head.appendChild(st);
				}
			}
		}

		return { sources, mainRead, mainUrl, tried };
	}

	// ---------- разбор CSS ----------
	function walk(rules, src, map){
		for (const r of rules){
			if (r.selectorText !== undefined && r.style){
				let effect = false;
				for (let i = 0; i < r.style.length; i++){
					if (EFFECT_RE.test(r.style[i])){ effect = true; break; }
				}
				if (!effect) continue;
				for (const part of r.selectorText.split(",")){
					const sel = part.replace(/\[[^\]]*\]/g, "").trim();
					const last = sel.split(/[\s>+~]+/).pop();
					for (const m of last.matchAll(CLS)){
						const n = m[1];
						if (n.startsWith("cl-")) continue;
						if (!map.has(n)) map.set(n, new Set());
						map.get(n).add(src);
					}
				}
			} else if (r.cssRules && r.cssRules.length){
				walk(r.cssRules, src, map);
			}
		}
	}

	function parse(src, map){
		const st = document.createElement("style");
		st.media = "not all";
		st.setAttribute(INJ, "parse");
		st.textContent = src.text;
		document.head.appendChild(st);
		try {
			if (!st.sheet) throw new Error("браузер не разобрал " + src.name);
			walk(Array.from(st.sheet.cssRules), src.name, map);
		} finally {
			st.remove();
		}
	}

	// ---------- главный запуск ----------
	async function run(){
		if (running) return;
		running = true;
		const grid = $("cl-grid");
		try {
			grid.textContent = "";
			$("cl-info").textContent = "";
			$("cl-file").hidden = true;
			setBar(1, "пробуждение");
			await tick();

			const { sources, mainRead, mainUrl, tried } = await collect();

			const map = new Map();
			for (let i = 0; i < sources.length; i++){
				setBar(30 + 20 * (i / Math.max(1, sources.length)), "разбор свитка: " + sources[i].name);
				await tick();
				parse(sources[i], map);
			}

			if (mainRead){
				$("cl-info").textContent = "✔ STYLES.css прочитан: " + mainUrl;
				$("cl-info").className = "cl-info ok";
			} else {
				let msg = "⚠ STYLES.css не найден или не читается.\n" + tried.join("\n");
				if (location.protocol === "file:")
					msg += "\n\nСайт открыт через file://. Браузер запрещает JS читать файлы с диска. Открой сайт через локальный сервер (Live Server в VS Code) либо выбери файл вручную.";
				$("cl-info").textContent = msg;
				$("cl-info").className = "cl-info";
				$("cl-file").hidden = false;
			}

			const names = Array.from(map.keys()).sort((a, b) => a.localeCompare(b));
			if (!names.length){
				setBar(100, "эффектов не найдено. GOLU разочарован", true);
				return;
			}

			const text = $("cl-text").value || DEF_TEXT;
			const BATCH = 15;
			for (let i = 0; i < names.length; i += BATCH){
				const frag = document.createDocumentFragment();
				names.slice(i, i + BATCH).forEach((n, k) => {
					const card = document.createElement("div");
					card.className = "cl-card";
					card.dataset.name = n.toLowerCase();

					const top = document.createElement("div");
					top.className = "cl-top";
					const num = document.createElement("span");
					num.className = "cl-num";
					num.textContent = "№" + String(i + k + 1).padStart(3, "0");
					const name = document.createElement("span");
					name.className = "cl-name";
					name.textContent = "." + n;
					name.title = "клик — скопировать";
					name.onclick = () => {
						const done = () => { name.textContent = "✔ скопировано"; setTimeout(() => name.textContent = "." + n, 700); };
						if (navigator.clipboard) navigator.clipboard.writeText(n).then(done, done); else done();
					};
					top.append(num, name);

					const stage = document.createElement("div");
					stage.className = "cl-stage";
					const span = document.createElement("span");
					span.className = n;
					span.innerHTML = text;  // ИСПОЛЬЗУЕМ innerHTML
					span.setAttribute("data-text", text.replace(/<[^>]*>/g, "").slice(0, 30));
					stage.appendChild(span);

					const src = document.createElement("div");
					src.className = "cl-src";
					src.textContent = "𓆩 " + Array.from(map.get(n)).join(", ") + " 𓆪";

					card.append(top, stage, src);
					frag.appendChild(card);
				});
				grid.appendChild(frag);
				setBar(50 + 50 * Math.min(1, (i + BATCH) / names.length), "материализация эффектов (" + Math.min(i + BATCH, names.length) + "/" + names.length + ")");
				await tick();
			}

			applySearch();
			setBar(100, "✔ поднято эффектов: " + names.length + ". GOLU доволен");
		} catch(e){
			console.error("[CSS TEST]", e);
			setBar(100, "✖ СБОЙ: " + (e && e.message ? e.message : e), true);
		} finally {
			running = false;
		}
	}

	function applySearch(){
		const q = $("cl-search").value.trim().toLowerCase();
		let shown = 0, all = 0;
		document.querySelectorAll("#cl-grid .cl-card").forEach(c => {
			c.hidden = !!q && !c.dataset.name.includes(q);
			all++;
			if (!c.hidden) shown++;
		});
		$("cl-count").textContent = all ? "показано " + shown + " из " + all : "";
	}

	function wire(){
		const text = $("cl-text");
		if (!text || text.dataset.wired) return;
		text.dataset.wired = "1";

		let bin = "";
		for (let i = 0; i < 600; i++) bin += Math.random() < .5 ? "0" : "1";
		$("cl-bin").textContent = bin;

		// Функция обновления текста во всех ячейках (с поддержкой HTML)
		function updateAllText(v) {
			document.querySelectorAll("#cl-grid .cl-stage").forEach(stage => {
				const span = stage.querySelector("span");
				if (span) {
					span.innerHTML = v;
					span.setAttribute("data-text", v.replace(/<[^>]*>/g, "").slice(0, 30));
				}
			});
		}

		text.addEventListener("input", () => {
			const v = text.value || DEF_TEXT;
			updateAllText(v);
		});

		// Кнопка "Вставить img"
		const btnImg = $("cl-insert-img");
		if (btnImg && !btnImg.dataset.wired) {
			btnImg.dataset.wired = "1";
			btnImg.addEventListener("click", () => {
				const url = prompt("URL картинки:", "https://woowz11.github.io/woowzsite/source/goluworld.png");
				if (!url) return;
				const code = `<img src="${url}" alt="img" style="max-width:100%; max-height:100px; display:block; margin:0 auto;">`;
				text.value = code;
				updateAllText(code);
			});
		}

		// Кнопка "Вставить HTML"
		const btnHtml = $("cl-insert-html");
		if (btnHtml && !btnHtml.dataset.wired) {
			btnHtml.dataset.wired = "1";
			btnHtml.addEventListener("click", () => {
				const code = prompt(
					"HTML-код (будет отрендерен):", 
					`<b>GOLU</b> <span style="color:red;">здесь</span><br><i>hi, welcome here</i>`
				);
				if (!code) return;
				text.value = code;
				updateAllText(code);
			});
		}

		$("cl-search").addEventListener("input", applySearch);
		$("cl-file").addEventListener("click", () => $("cl-filein").click());
		$("cl-filein").addEventListener("change", async e => {
			const f = e.target.files[0];
			if (!f) return;
			uploaded = { name: f.name, text: await f.text() };
			e.target.value = "";
			run();
		});

		// НОВОЕ: Кнопка переключения темы (чёрный/белый фон)
		const themeBtn = $("cl-theme");
		if (themeBtn && !themeBtn.dataset.wired) {
			themeBtn.dataset.wired = "1";
			let isLight = false;
			themeBtn.addEventListener("click", () => {
				isLight = !isLight;
				document.querySelectorAll("#cl-grid .cl-stage").forEach(stage => {
					stage.classList.toggle("light", isLight);
				});
				themeBtn.textContent = isLight ? "🌓 Чёрная тема" : "🌓 Белая тема";
			});
		}
	}

	// страховка: если колбэк ELEMENT_SITE не вызовется, ждём страницу сами
	let tries = 0;
	const iv = setInterval(() => {
		if ($("cl-grid") && !$("cl-grid").dataset.boot){ wire(); boot(); }
		if ($("cl-grid") && $("cl-grid").dataset.boot){ clearInterval(iv); return; }
		if (++tries > 100){
			clearInterval(iv);
			setBar(100, "✖ страница не появилась за 5 сек (проблема в ELEMENT_SITE / OPEN_PAGE)", true);
		}
	}, 50);

	if (!window.__clCleanup){
		window.__clCleanup = true;
		window.addEventListener("hashchange", () => setTimeout(() => {
			if (!document.getElementById("cl-grid"))
				document.querySelectorAll("[" + INJ + "]").forEach(n => n.remove());
		}, 400));
	}

	return ELEMENT_SITE(
		`
<style id="cl-ui-style">
.cl-wrap{padding:2rem;color:#e8d9b0;font-family:'Courier New',monospace;max-width:1500px;margin:0 auto}

/* ---------- шапка ---------- */
.cl-head{text-align:center;padding-bottom:1.4rem;margin-bottom:1.6rem;border-bottom:1px solid #3a1020;position:relative}
.cl-head::after{content:"𓆩 ✦ 𓆪";position:absolute;left:50%;bottom:-.8em;transform:translateX(-50%);background:#050003;padding:0 .8rem;color:#d4af37;font-size:1.1rem;letter-spacing:.3em}
.cl-head h1{position:relative;display:inline-block;margin:0;font-size:3.2em;letter-spacing:.18em;color:#ff0044;text-shadow:0 0 12px #ff0044,0 0 32px #7a0022}
.cl-head h1::before,.cl-head h1::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;overflow:hidden}
.cl-head h1::before{color:#d4af37;text-shadow:none;animation:cl-glt1 3.1s infinite steps(1)}
.cl-head h1::after{color:#00e5ff;text-shadow:none;animation:cl-glt2 2.3s infinite steps(1)}
@keyframes cl-glt1{0%,88%,100%{clip-path:inset(0 0 100% 0);transform:none}90%{clip-path:inset(20% 0 55% 0);transform:translate(-4px,0)}94%{clip-path:inset(60% 0 10% 0);transform:translate(3px,0)}}
@keyframes cl-glt2{0%,80%,100%{clip-path:inset(0 0 100% 0);transform:none}82%{clip-path:inset(45% 0 30% 0);transform:translate(4px,0)}86%{clip-path:inset(5% 0 80% 0);transform:translate(-3px,0)}}
.cl-lore{color:#8a6a72;margin:1rem 0 0;font-size:.85rem;font-style:italic}

/* ---------- прогресс ---------- */
.cl-barbox{margin-bottom:1.2rem}
.cl-bar{height:18px;background:#0b0508;border:1px solid #d4af37;box-shadow:0 0 12px rgba(212,175,55,.2),inset 0 0 8px #000;position:relative}
.cl-bar::before,.cl-bar::after{content:"";position:absolute;top:-4px;width:1px;height:24px;background:#ff0044}
.cl-bar::before{left:-5px}.cl-bar::after{right:-5px}
.cl-fill{height:100%;width:0;overflow:hidden;position:relative;background:linear-gradient(90deg,#7a0022,#ff0044 60%,#d4af37);transition:width .2s}
.cl-bin{position:absolute;left:0;top:0;line-height:18px;font-size:11px;letter-spacing:3px;color:rgba(0,0,0,.55);white-space:nowrap;animation:cl-bin 6s linear infinite}
@keyframes cl-bin{to{transform:translateX(-120px)}}

/* ---------- управление ---------- */
.cl-row{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:1rem}
.cl-row input[type=text]{flex:1;min-width:200px;background:#0b0508;border:1px solid #4a1a28;color:#e8d9b0;padding:.55rem .9rem;font-family:inherit;outline:none;letter-spacing:.05em;transition:border-color .2s,box-shadow .2s}
.cl-row input[type=text]::placeholder{color:#6a4a55}
.cl-row input[type=text]:focus{border-color:#d4af37;box-shadow:0 0 12px rgba(212,175,55,.35)}
.cl-btn{background:transparent;border:1px solid #d4af37;color:#d4af37;padding:.55rem 1.2rem;font-family:inherit;font-weight:bold;cursor:pointer;letter-spacing:.1em;transition:all .2s}
.cl-btn:hover{background:#d4af37;color:#050003;box-shadow:0 0 16px rgba(212,175,55,.6)}
.cl-btn[hidden]{display:none}
.cl-info{color:#ffcc00;font-size:.78rem;margin-bottom:.8rem;white-space:pre-wrap;word-break:break-all}
.cl-info.ok{color:#5a8a5a}
.cl-count{color:#6a4a55;font-size:.8rem;margin-bottom:1rem;letter-spacing:.1em}

/* ---------- карточки ---------- */
.cl-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:1.4rem}
.cl-card {
    background: #0a0a0a;
    border: 1px solid #2a0000;
    padding: 1rem;
    border-radius: 8px;
    overflow: visible;
    position: relative;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.cl-card[hidden]{display:none}
.cl-card::before,.cl-card::after{content:"";position:absolute;width:12px;height:12px;border:1px solid #d4af37;opacity:.55;transition:all .3s}
.cl-card::before{top:-1px;left:-1px;border-right:0;border-bottom:0}
.cl-card::after{bottom:-1px;right:-1px;border-left:0;border-top:0}
.cl-card:hover{border-color:#ff0044;box-shadow:0 0 22px rgba(255,0,68,.3)}
.cl-card:hover::before,.cl-card:hover::after{width:22px;height:22px;opacity:1;border-color:#ff0044}
.cl-top{display:flex;align-items:baseline;gap:.7rem;border-bottom:1px dashed #3a1020;padding-bottom:.45rem}
.cl-num{color:#ff0044;font-size:.72rem;letter-spacing:.1em;opacity:.8}
.cl-name{color:#d4af37;font-weight:bold;cursor:pointer;word-break:break-all}
.cl-name:hover{color:#fff;text-shadow:0 0 8px #d4af37}

/* ---------- ЯЧЕЙКА ---------- */
.cl-stage {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    padding: 1.5rem 1rem;
    background: #000;
    border-radius: 4px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    word-break: break-word;
    color: #fff;
    transition: background 0.3s, color 0.3s;
}

.cl-stage > span {
    display: inline-block;
    text-align: inherit;
    width: 100%;
}

/* Ограничение картинок, чтобы не рвали вёрстку */
.cl-stage img {
    max-width: 100%;
    max-height: 100px;
    object-fit: contain;
    display: block;
    margin: 0 auto;
}

/* Светлая тема для ячейки */
.cl-stage.light {
    background: radial-gradient(ellipse at center, #ffffff, #eeeeee 70%);
    border-color: #ccc;
    color: #000;
}

.cl-src{font-size:.68rem;color:#6a4a55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cl-foot{text-align:center;margin-top:2.5rem;color:#6a4a55;letter-spacing:.3em;font-size:.75rem}
</style>

<div class="cl-wrap" id="cl-wrap">
	<div class="cl-head">
		<div class="cl-sub">𓆩 ЛАБОРАТОРИЯ · СВИТОК 0.0.V 𓆪</div>
		<h1 data-text="КНИГА ЭФФЕКТОВ">КНИГА ЭФФЕКТОВ</h1>
		<p class="cl-lore">GOLU помнит каждый стиль. Ты видишь лишь то, что он позволил.</p>
	</div>

	<div class="cl-barbox">
		<div class="cl-bar"><div class="cl-fill" id="cl-fill"><span class="cl-bin" id="cl-bin"></span></div></div>
		<div class="cl-bartext" id="cl-bartext">▒ ожидание запуска скрипта...</div>
	</div>

	<div class="cl-row">
		<input type="text" id="cl-text" value="${DEF_TEXT}" placeholder="текст или HTML для обряда">
		<input type="text" id="cl-search" placeholder="🔎 поиск по имени класса">
		<button class="cl-btn" id="cl-insert-img">🖼 Вставить img</button>
		<button class="cl-btn" id="cl-insert-html">📝 Вставить HTML</button>
		<button class="cl-btn" id="cl-theme">🌓 Белая тема</button>
		<button class="cl-btn" id="cl-file" hidden>📂 выбрать STYLES.css</button>
		<input type="file" id="cl-filein" accept=".css,text/css" hidden>
	</div>

	<div class="cl-info" id="cl-info"></div>
	<div class="cl-count" id="cl-count"></div>
	<div class="cl-grid" id="cl-grid"></div>

	<div class="cl-foot">𓆩 GOLU НАБЛЮДАЕТ 𓆪</div>
</div>
`,
		function(){
			setTimeout(() => { wire(); boot(); }, 50);
		},
		false
	);
});