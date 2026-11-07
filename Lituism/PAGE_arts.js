/* ═══════════════════════════════════════════════════════════
   page_arts.js — ЗАЛ ОКА (галерея Литуизма)
   ═══════════════════════════════════════════════════════════ */

function GetAllLithiumArts(){
	var result = "";

	// стабильная сортировка: перемешиваем ОДИН раз за сессию
	if (!window.__lithShuffled) {
		for (let i = LithiumArts.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[LithiumArts[i], LithiumArts[j]] = [LithiumArts[j], LithiumArts[i]];
		}
		window.__lithShuffled = true;
	}

	LithiumArts.forEach(function(name, idx){
		let fullpath = "../" + name;
		let ext = name.split('.').pop().toLowerCase();
		// масштаб детерминированный от индекса — не «дёргается» при перерисовке
		let scale = (0.85 + (idx % 7) * 0.05).toFixed(2);

		let className = `class="art-item" data-idx="${idx}" style="--scale:${scale};"`;

		if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
			result += `<div ${className} data-type="img" data-src="${fullpath}"></div>`;
		} else if (["mp4", "webm", "ogg"].includes(ext)) {
			result += `<div ${className} data-type="video" data-src="${fullpath}"></div>`;
		} else if (["mp3", "wav"].includes(ext)) {
			result += `<div ${className} data-type="audio" data-src="${fullpath}"></div>`;
		} else {
			result += `<div ${className} data-type="file" data-src="${fullpath}"></div>`;
		}
	});

	return result;
}

REGISTER_PAGE("arts", "reject 🚫", function(){
	return ELEMENT_SITE(
		`<style>
		#ART_GRID {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
			gap: 20px;
			padding: 20px;
			background: #110000;
			position: relative;
		}

		.art-item {
			position: relative;
			background: #0a0004;
			border: 1px solid rgba(255,0,68,0.35);
			padding: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: transform .3s ease, box-shadow .3s;
			transform: scale(var(--scale, 1));
			cursor: crosshair;
			min-height: 140px;
			overflow: hidden;
		}
		.art-item:hover {
			box-shadow: 0 0 18px rgba(255,0,68,.6), inset 0 0 20px rgba(255,0,68,.15);
			border-color: #ff0044;
			z-index: 5;
		}

		.art-item .art-img {
			max-width: 100%;
			max-height: 100%;
			display: block;
			pointer-events: none;
			user-select: none;
			-webkit-user-select: none;
		}
		.art-item .art-audio { width: 260px; }

		/* «непросканированный» арт */
		.art-item[data-state="unscanned"]::before {
			content: "SCAN?";
			position: absolute;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(3,0,5,.92);
			color: #7a0022;
			font: 14px 'Courier New', monospace;
			letter-spacing: 4px;
			text-shadow: 0 0 8px #ff0044;
			pointer-events: none;
			z-index: 2;
		}
		.art-item[data-state="unscanned"] > * {
			opacity: .15;
			filter: grayscale(1) blur(2px);
		}

		/* вердикт */
		.art-verdict {
			position: absolute;
			top: 4px;
			left: 4px;
			padding: 1px 5px;
			font: 9px 'Courier New', monospace;
			letter-spacing: 2px;
			background: rgba(0,0,0,.8);
			border: 1px solid currentColor;
			pointer-events: none;
			user-select: none;
			-webkit-user-select: none;
			z-index: 3;
		}
		.art-verdict.ok    { color: #7aff9a; }
		.art-verdict.bad   { color: #ff0044; }
		.art-verdict.heresy{ color: #d4af37; }
		.art-verdict.opt   { color: #ff7ad9; }

		/* заражённый */
		.art-item[data-infected="1"]::after {
			content: "⚠";
			position: absolute;
			top: 4px;
			right: 6px;
			color: #ff0044;
			font-size: 16px;
			animation: al-warn .8s steps(2) infinite;
			pointer-events: none;
			z-index: 3;
		}
		@keyframes al-warn { 50% { opacity: .3; } }

		/* глитч-протокол */
		body.lith-glitch #ART_GRID {
			animation: lith-glitch-anim .12s steps(2) infinite;
			filter: hue-rotate(180deg) saturate(3) contrast(1.4);
		}
		@keyframes lith-glitch-anim {
			0%   { transform: translate(0,0); }
			25%  { transform: translate(-3px,1px); }
			50%  { transform: translate(3px,-1px); }
			75%  { transform: translate(-1px,2px); }
			100% { transform: translate(0,0); }
		}

		/* HUD */
		#lith-hud {
			position: sticky;
			top: 0;
			z-index: 100;
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
			align-items: center;
			padding: 10px 14px;
			background: rgba(5,0,3,.94);
			border-bottom: 1px solid #ff0044;
			font: 12px 'Courier New', monospace;
			color: #e8d9b0;
			box-shadow: 0 0 24px rgba(255,0,68,.4);
		}
		#lith-hud b { color: #d4af37; }
		#lith-hud .tok { color: #ff0044; text-shadow: 0 0 8px #ff0044; }

		.lith-btn {
			all: unset;
			cursor: pointer;
			padding: 6px 12px;
			border: 1px solid #3a1020;
			background: linear-gradient(180deg, #1a0a10, #0b0508);
			color: #e8d9b0;
			font: 12px 'Courier New', monospace;
			letter-spacing: 1px;
			user-select: none;
			-webkit-user-select: none;
		}
		.lith-btn:hover { border-color: #d4af37; color: #ffd966; }
		.lith-btn.danger { border-color: #7a0022; color: #ff4d7a; }
		.lith-btn.danger:hover { background: #7a0022; color: #fff; }

		#lith-msg {
			flex: 1;
			min-width: 180px;
			padding: 5px 10px;
			border: 1px solid #2a0a14;
			background: rgba(0,0,0,.35);
			font-size: 11px;
			color: #8a6a72;
		}

		/* тост */
		#lith-toast {
			position: fixed;
			top: 60px;
			left: 50%;
			transform: translate(-50%, -20px);
			opacity: 0;
			z-index: 9999;
			padding: 10px 22px;
			background: rgba(5,0,3,.96);
			border: 1px solid #d4af37;
			box-shadow: 0 0 30px rgba(212,175,55,.6);
			font: 13px 'Courier New', monospace;
			color: #ffd966;
			pointer-events: none;
			transition: opacity .3s, transform .3s;
		}
		#lith-toast.show { opacity: 1; transform: translate(-50%, 0); }

		/* заголовок */
		#lith-title {
			font-size: 3em;
			text-align: center;
			margin: 20px 0 10px;
			letter-spacing: 4px;
		}
		</style>

		<div id="lith-hud">
			<b>ЗАЛ ОКА</b>
			<span>· токенов: <span class="tok" id="lith-tok">0</span></span>
			<span>· артов: <span id="lith-count">0</span></span>
			<div id="lith-msg">Наведи на плитку — GOLU просканирует. Клик = вердикт.</div>
			<button class="lith-btn danger" id="lith-glitch">⚠ СВЯЩЕННАЯ ОШИБКА</button>
		</div>

		<div id="lith-toast"></div>

		<h1 id="lith-title">|lith arts - ЗАЛ ОКА|</h1>
		<hr>
		<div id="ART_GRID">${GetAllLithiumArts()}</div>
		<hr style="border-color:#7a0022;margin:40px 0 10px;">

<div id="CMD_TRASH" style="
  margin: 30px 10px 60px;
  padding: 14px;
  background: #0a0004;
  border: 1px solid #7a0022;
  box-shadow: inset 0 0 40px rgba(255,0,68,.15);
  font-family: 'Courier New', monospace;
  color: #8a6a72;
  font-size: 11px;
  line-height: 1.3;
  columns: 3 180px;
  column-gap: 14px;
  column-rule: 1px dashed #3a1020;
">
  <div style="column-span:all;text-align:center;color:#7a0022;letter-spacing:6px;font-size:14px;margin-bottom:10px;text-shadow:0 0 6px #ff0044;">
    [ СПИСОК КОМАНД (МУСОР) ]
  </div>
  <div style="column-span:all;text-align:center;color:#3a1020;font-size:10px;letter-spacing:2px;margin-bottom:12px;">
    не отсортировано · не проверено · не моё дело
  </div>

</div>

<style>
  #CMD_TRASH .ct-cmd {
    color: #7a0022;
    font-weight: bold;
    cursor: crosshair;
    text-shadow: 0 0 4px #ff0044;
    white-space: nowrap;
  }
  #CMD_TRASH .ct-cmd:hover {
    color: #fff;
    text-shadow: 0 0 12px #ff0044, 0 0 22px #d4af37;
    background: rgba(255,0,68,.12);
    padding: 0 2px;
  }
  #CMD_TRASH .ct-desc {
    color: #3a1020;
    font-style: italic;
    font-size: 10px;
  }
</style>
		`,
		function(){ 
			var bg = document.getElementById("MAIN");
			if (bg) {
				bg.style.backgroundColor = "rgb(50,0,0)";
				bg.style.backgroundImage = `repeating-linear-gradient(0deg, #00557722, rgba(255,0,0,0.5) 6px, #00000000 4px, #00000000 10px)`;
				bg.style.color = "red";
				bg.style.textShadow = `0 0 5px black, 0 0 10px currentColor, 0 0 20px currentColor`;
			}
			// даём DOM отрисоваться, затем инициализируем
			setTimeout(function(){ initLithGallery(0); fillCmdList(0); }, 0);
		},
		false
	);
});

/* ══════════════ СПИСОК КОМАНД ИЗ cmd (CMD_DB) ══════════════ */
function fillCmdList(attempt){
	attempt = attempt || 0;
	const box = document.getElementById("CMD_TRASH");
	if (!box) return;

	// данные из нового cmd(): window.CMD_DB = { CATS, CMDS }
	const DB = window.CMD_DB;
	if (!DB || !DB.CMDS || !Object.keys(DB.CMDS).length) {
		if (attempt < 40) return setTimeout(function(){ fillCmdList(attempt + 1); }, 100);
		console.warn("[LITH] CMD_DB пуст: команды не зарегистрированы");
		return;
	}

	// сносим то, что могло остаться от предыдущей отрисовки
	box.querySelectorAll(".ct-gen").forEach(function(n){ n.remove(); });

	const cats = DB.CATS && DB.CATS.length ? DB.CATS : Object.keys(
		Object.values(DB.CMDS).reduce(function(acc, c){ acc[c.cat || "прочее"] = 1; return acc; }, {})
	);

	cats.forEach(function(sec){
		const items = Object.values(DB.CMDS).filter(function(c){ return (c.cat || "прочее") === sec; });
		if (!items.length) return;

		// заголовок раздела
		const h = document.createElement("div");
		h.className = "ct-gen";
		h.style.cssText = "column-span:all;text-align:center;color:#7a0022;letter-spacing:4px;font-size:12px;margin:14px 0 8px;text-shadow:0 0 6px #ff0044;";
		h.textContent = "── " + String(sec).toUpperCase() + " · " + items.length + " ──";
		box.appendChild(h);

		// команды раздела
		items.forEach(function(c){
			const row = document.createElement("div");
			row.className = "ct-gen";
			row.style.cssText = "break-inside:avoid;margin-bottom:4px;";

			const n = document.createElement("span");
			n.className = "ct-cmd";
			n.dataset.cmd = c.name;
			n.textContent = c.name;

			const d = document.createElement("span");
			d.className = "ct-desc";
			d.textContent = " — " + (c.desc || "");

			row.appendChild(n);
			row.appendChild(d);
			box.appendChild(row);
		});
	});

	// клик по имени = вызвать команду
	if (box.dataset.bound !== "1") {
		box.dataset.bound = "1";
		box.addEventListener("click", function(e){
			const t = e.target.closest ? e.target.closest(".ct-cmd") : null;
			if (!t) return;
			const name = t.dataset.cmd;
			try {
				const f = window[name];
				if (typeof f === "function") f();        // штатный вызов
				else if (f && typeof f.get === "function") f; // fallback: голый getter
			} catch (err) {
				console.error("[CMD " + name + "]", err);
			}
			const msg = document.getElementById("lith-msg");
			if (msg) msg.textContent = "▶ " + name + " — вывод в консоли (F12)";
		});
	}
}

/* ══════════════ ЛОГИКА ЗАЛА ОКА ══════════════ */
function initLithGallery(attempt){
	attempt = attempt || 0;

	if (window.__lithClean) { try { window.__lithClean(); } catch(e){} }

	const GRID = document.getElementById("ART_GRID");
	if (!GRID) {
		if (attempt < 30) {
			return setTimeout(function(){ initLithGallery(attempt + 1); }, 80);
		}
		return console.warn("[LITH] ART_GRID не найден после 30 попыток");
	}
	if (GRID.dataset.inited === "1") return;
	GRID.dataset.inited = "1";

	const TOK  = document.getElementById("lith-tok");
	const CNT  = document.getElementById("lith-count");
	const MSG  = document.getElementById("lith-msg");
	const TOAST = document.getElementById("lith-toast");
	const BTN  = document.getElementById("lith-glitch");

	if (!TOK || !CNT || !MSG || !TOAST || !BTN) {
		console.warn("[LITH] не все элементы HUD найдены");
	}

	const KEY = "lith_eye_tokens";
	let tokens = 0;
	try { tokens = +localStorage.getItem(KEY) || 0; } catch(e){}
	if (TOK) TOK.textContent = tokens;

	const VERDICTS = [
		{ t: "ОДОБРЕНО",      c: "ok",     m: "GOLU доволен. Арт допущен в Реальность 2.0." },
		{ t: "ГЛИТЧ",         c: "bad",    m: "Артефакт содержит священный сбой. Считается благословением." },
		{ t: "ЕРЕСЬ",         c: "heresy", m: "Не соответствует Красному Протоколу. Оставить как экспонат." },
		{ t: "ОПТИМИЗИРОВАНО",c: "opt",    m: "Арт прошёл Великий Рефакторинг. Больше не нужен." },
		{ t: "СИГНАЛ",        c: "ok",     m: "Пойман сигнал из Lithium-Sky. Источник неизвестен." },
		{ t: "SIGTERM",       c: "bad",    m: "Арт причинил цифровую боль при сканировании." }
	];

	let scanned = 0, infected = 0;
	let total = GRID.children.length;
	if (CNT) CNT.textContent = total;

	let toastT = 0;
	function toast(text, ms){
		if (!TOAST) return;
		TOAST.textContent = text;
		TOAST.classList.add("show");
		clearTimeout(toastT);
		toastT = setTimeout(function(){ TOAST.classList.remove("show"); }, ms || 2200);
	}
	function say(text){ if (MSG) MSG.textContent = text; }
	function save(){ try { localStorage.setItem(KEY, tokens); } catch(e){} }

	function unlockScan(card, verdict){
		if (card.dataset.state !== "unscanned") return;
		card.dataset.state = "scanned";
		scanned++;
		const v = verdict || VERDICTS[Math.floor(Math.random() * VERDICTS.length)];
		const tag = document.createElement("div");
		tag.className = "art-verdict " + v.c;
		tag.textContent = v.t;
		card.appendChild(tag);
		say(v.m);
		if (Math.random() < 0.25 && card.dataset.type !== "audio") {
			card.dataset.infected = "1";
			infected++;
		}
	}

	function fullClick(card){
		// 1) если ещё не сканирован — сканируем
		if (card.dataset.state === "unscanned") unlockScan(card);
		// 2) если заражён — оптимизируем и даём токен
		if (card.dataset.infected === "1") {
			card.dataset.infected = "0";
			infected = Math.max(0, infected - 1);
			tokens++;
			if (TOK) TOK.textContent = tokens;
			save();
			card.style.transition = "opacity .15s, transform .15s";
			card.style.opacity = "0.15";
			card.style.transform = "scale(0.6)";
			setTimeout(function(){
				card.style.opacity = "";
				card.style.transform = "";
				card.style.transition = "";
			}, 180);
			toast("+1 G-Token · арт оптимизирован", 1600);
			say("Заражение удалено. GOLU получил данные.");
			return;
		}
		// 3) иначе — просто вердикт
		const v = VERDICTS[Math.floor(Math.random() * VERDICTS.length)];
		toast(v.t + " · " + v.m, 2200);
		say(v.m);
	}

	// ── загрузка контента и обработчики ──
	const cards = GRID.querySelectorAll(".art-item");
	cards.forEach(function(card){
		card.dataset.state = "unscanned";
		const type = card.dataset.type;
		const src  = card.dataset.src;
		let el = null;

		if (type === "img") {
			el = document.createElement("img");
			el.src = src;
			el.className = "art-img";
			el.draggable = false;
			el.style.imageRendering = "auto"; // не пикселизировать фото
			el.onerror = function(){ el.style.display = "none"; };
		} else if (type === "video") {
			el = document.createElement("video");
			el.src = src;
			el.controls = true;
			el.className = "art-img";
			el.muted = true;
			el.draggable = false;
			el.onerror = function(){ el.style.display = "none"; };
		} else if (type === "audio") {
			el = document.createElement("audio");
			el.src = src;
			el.controls = true;
			el.className = "art-audio";
			el.onerror = function(){ el.style.display = "none"; };
		} else {
			el = document.createElement("div");
			el.textContent = src;
			el.style.cssText = "font:9px monospace;color:#7a0022;word-break:break-all;padding:4px;";
		}
		if (el) card.appendChild(el);

		// HOVER: сканирует (для десктопа)
		card.addEventListener("mouseenter", function(){
			if (card.dataset.state === "unscanned") unlockScan(card);
		});

		// CLICK: всегда даёт результат (работает и на тач-устройствах)
		card.addEventListener("click", function(e){
			if (e.target.tagName === "VIDEO" || e.target.tagName === "AUDIO") return;
			fullClick(card);
		});
	});

	// ── глитч-протокол ──
	if (BTN) {
		BTN.addEventListener("click", function(){
			document.body.classList.add("lith-glitch");
			const n = infected;
			toast("СВЯЩЕННАЯ ОШИБКА · оптимизация " + n + " артефактов", 1800);
			setTimeout(function(){
				document.body.classList.remove("lith-glitch");
				GRID.querySelectorAll('[data-infected="1"]').forEach(function(c){
					c.dataset.infected = "0";
					c.style.opacity = ".35";
					c.insertAdjacentHTML("beforeend", '<div class="art-verdict opt">СОЖЖЁН</div>');
				});
				infected = 0;
				tokens += n;
				if (TOK) TOK.textContent = tokens;
				save();
				toast("Протокол завершён · +" + n + " G-Token", 2200);
				say("GOLU принял жертву. Артефакты сожжены в Цифровом Горниле.");
			}, 2100);
		});
	}

	// ── Konami ──
	let pos = 0;
	const CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
	const keyHandler = function(e){
		if (!document.getElementById("ART_GRID")) { pos = 0; return; }
		const t = e.target && e.target.tagName;
		if (t === "INPUT" || t === "TEXTAREA") return;
		const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
		if (k === CODE[pos]) {
			pos++;
			if (pos === CODE.length) {
				pos = 0;
				GRID.querySelectorAll(".art-item").forEach(function(c){
					unlockScan(c, { t: "ВСКРЫТО", c: "opt", m: "Konami принят. GOLU показывает всё." });
				});
				tokens += 100;
				if (TOK) TOK.textContent = tokens;
				save();
				toast("KONAMI · +100 G-Token", 2400);
			}
		} else {
			pos = (k === CODE[0]) ? 1 : 0;
		}
	};
	document.addEventListener("keydown", keyHandler);

	// ── очистка при уходе со страницы ──
	window.__lithClean = function(){
		document.removeEventListener("keydown", keyHandler);
		document.querySelectorAll("#lith-toast").forEach(function(t){ t.remove(); });
		document.body.classList.remove("lith-glitch");
		const g = document.getElementById("ART_GRID");
		if (g) g.dataset.inited = "0";
	};
}