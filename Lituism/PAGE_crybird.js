REGISTER_PAGE("crybird", "❄️ 🐦 ❄️", function(){
	return ELEMENT_SITE(
		`<style>
		#cb-wrap { max-width: 980px; margin: 0 auto; }
		#cb-wrap h1 { text-align: center; }
		.cb-quote { border-left: 3px solid #00ccff; padding: 6px 12px; margin: 12px 0; background: rgba(0,204,255,.08); color: #bde7ff; font-style: italic; }
		.cb-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin: 14px 0; }
		.cb-card { border: 1px solid #00ccff55; background: rgba(0,31,51,.6); padding: 10px 12px; border-radius: 6px; }
		.cb-card b { color: #00ccff; }
		.cb-badge { display: inline-block; padding: 1px 6px; border: 1px solid currentColor; font: 10px 'Courier New', monospace; letter-spacing: 1px; }
		.cb-badge.ok { color: #7aff9a; }
		.cb-badge.warn { color: #ffd966; }
		.cb-badge.bad { color: #ff4d7a; }

		/* термометр */
		#cb-thermo-wrap { margin: 16px 0; padding: 12px; border: 1px solid #00ccff; background: rgba(0,20,35,.7); border-radius: 8px; }
		#cb-thermo-bar { height: 18px; background: #03121c; border: 1px solid #005577; overflow: hidden; position: relative; }
		#cb-thermo-fill { height: 100%; width: 0%; background: linear-gradient(90deg,#00ccff,#ffd966,#ff0044); transition: width .2s linear; }
		#cb-thermo-val { font: 14px 'Courier New', monospace; color: #bde7ff; margin-top: 6px; }
		#cb-thermo-val b { color: #ffd966; }
		#cb-thermo-val.crit b { color: #ff0044; text-shadow: 0 0 10px #ff0044; }
		#cb-cool-btn {
			all: unset; cursor: pointer; padding: 6px 14px; border: 1px solid #00ccff;
			background: linear-gradient(180deg,#003a55,#001f33); color: #bde7ff;
			font: 13px 'Courier New', monospace; letter-spacing: 2px; user-select: none;
		}
		#cb-cool-btn:hover { background: #005577; color: #fff; box-shadow: 0 0 12px #00ccff; }
		#cb-cool-btn:active { transform: translateY(1px); }

		/* двоичный поток */
		#cb-bytes {
			font: 11px 'Courier New', monospace;
			color: #66ffff; word-break: break-all; line-height: 1.4;
			height: 160px; overflow: hidden; padding: 8px;
			background: rgba(0,10,20,.6); border: 1px solid #00ccff44; border-radius: 6px;
			position: relative;
		}
		#cb-bytes::after {
			content: ""; position: absolute; inset: 0;
			background: linear-gradient(180deg, transparent 60%, rgba(0,10,20,.95));
			pointer-events: none;
		}

		/* BIOS-консоль */
		#cb-term { margin: 16px 0; }
		#cb-term-out {
			height: 220px; overflow-y: auto; padding: 10px;
			background: #000a12; border: 1px solid #00ccff; border-radius: 6px 6px 0 0;
			font: 12px 'Courier New', monospace; color: #7aff9a;
			white-space: pre-wrap; scrollbar-width: thin; scrollbar-color: #005577 #000a12;
		}
		#cb-term-out .err { color: #ff4d7a; }
		#cb-term-out .warn { color: #ffd966; }
		#cb-term-out .dim { color: #5a8a9a; }
		#cb-term-in {
			width: 100%; box-sizing: border-box; padding: 8px 10px;
			background: #001522; border: 1px solid #00ccff; border-top: none; border-radius: 0 0 6px 6px;
			color: #bde7ff; font: 13px 'Courier New', monospace; outline: none;
		}
		#cb-term-in::placeholder { color: #3a6a7a; }

		/* мини-игра */
		#cb-game { margin: 16px 0; padding: 12px; border: 1px dashed #00ccff; border-radius: 8px; background: rgba(0,31,51,.5); }
		#cb-game .cb-card { margin-bottom: 8px; }
		#cb-game-score { font: 20px 'Courier New', monospace; color: #ffd966; text-shadow: 0 0 10px #ffd966; }
		#cb-game-status { font: 12px 'Courier New', monospace; color: #7aff9a; }

		/* аудио-кнопка */
		#cb-audio-btn {
			all: unset; cursor: pointer; padding: 4px 10px; border: 1px solid #00ccff;
			color: #bde7ff; font: 12px 'Courier New', monospace; margin-left: 6px;
		}
		#cb-audio-btn:hover { background: #003a55; color: #fff; }

		/* секретный режим */
		body.cb-frozen { background: #000a12 !important; }
		body.cb-frozen #cb-wrap { filter: hue-rotate(180deg); }
		body.cb-frozen #cb-wrap .crybird_h { color: #00ffff; text-shadow: 0 0 12px #00ffff, 0 0 24px #00ffff; }
		</style>

		<div id="cb-wrap">
		<h1 class="glitch4" style="text-align: center;">🌀 CRY-BIRD: Дополнительный Посол <u>GOLU</u> 🌀</h1>
		<center><h3 style="color:white;">ПРИЛОЖЕНИЕ: crybird.lit <span class="cb-badge ok">ONLINE</span> <button id="cb-audio-btn" title="вкл/выкл тему">♪</button></h3></center>

		<p>
			В недрах <a>Lithium Universe</a> родился он — 🐦 01 CRY-BIRD 01 🐦, хранящий ХОЛОД кулерных-ветров и остужающий пылающего 🧽 <a onclick="OPEN_PAGE('sranspang')">SRANSPAN</a> 🧽<br>
			Его задача → контроль | охлаждение | предотвращение перегрева задач через разум | остановка вредоносных вылетов
		</p>

		<div class="cb-quote">
			«Я не уничтожаю → Я анализирую. Я не борюсь → Я переосмысляю. Я — стек, а не регистр.»
		</div>

		<div class="cb-grid">
			<div class="cb-card"><b>ПРОТОКОЛ ZILOG</b><br>Z80-совместимый поток инструкций, но с «эмпатическим» прерыванием на каждом 7-м такте.</div>
			<div class="cb-card"><b>ТЕНЕВЫЕ ЛОГИКИ MOTOROLA 68000</b><br>Каждое решение проходит через теневой регистр: «а что, если наоборот?»</div>
			<div class="cb-card"><b>КРИСТАЛЛ L1-КЕША</b><br>Внутри каждого ПЕР0 — фотонный кристалл. Он хранит не данные, а <i>состояния спокойствия</i>.</div>
			<div class="cb-card"><b>ДВОИЧНЫЙ ЛОГОС</b><br>Каждое слово CRY-BIRD — поток байтов. Он не говорит; он <i>транслирует</i>.</div>
		</div>

		<hr style="color:#00CCFF;">

		<!-- ── ТЕРМОМЕТР ── -->
		<div id="cb-thermo-wrap">
			<h2 class="crybird_h" style="text-align:center;margin-top:0;">🧊 ТЕРМОМЕТР SRANSPAN.LIT 🧊</h2>
			<div id="cb-thermo-bar"><div id="cb-thermo-fill"></div></div>
			<div id="cb-thermo-val">ТЕМПЕРАТУРА: <b>40.0°C</b> · статус: <span id="cb-thermo-status">NOMINAL</span></div>
			<div style="margin-top:8px;">
				<button id="cb-cool-btn">❄ ОХЛАДИТЬ ❄</button>
			</div>
		</div>

		<!-- ── ДВОИЧНЫЙ ПОТОК ── -->
		<section5>
			<h2 class="crybird_h" style="text-align: center;">============ 🧊 Охлаждение Искушённого 🧊 ============</h2>
			<p>
				🧽 <a onclick="OPEN_PAGE('sranspang')">poopy sponge)))</a> 🧽 = часто перегревается от поставленных задач!!! Что посылает CRYBIRD сигнал | ❄️ <text style="font-size:0.7em; color:yellow;">ATTENTION, CRITICAL PROCESS TEMPERATURE SRANSPANG.LIT!</text> ❄️<br>
				CRYB1RD разворачивает &lt;крылья&gt; и сбрасывает t° ядра процессора СРАНОГО СПАНЧА до 160°C<br>
				<center>❄️❄️❄️ но каждое его слово — это поток двоичного логоса ❄️❄️❄️</center>
			</p>
			<div id="cb-bytes">01001101 01101001 ...</div>
			<center><small class="cb-badge warn">LIVE · поток обновляется</small></center>
			<h2 class="crybird_h" style="text-align: center;">============ 🧊 Охлаждение Искушённого 🧊 ============</h2>
		</section5>

		<!-- ── BIOS-КОНСОЛЬ ── -->
		<section5>
			<h2 class="crybird_h">%💻% КОНСОЛЬ BIOS^CRYBIRD %💻%</h2>
			<p class="cb-quote">Доступные команды: <code2>help</code2> · <code2>status</code2> · <code2>cool</code2> · <code2>sranspang</code2> · <code2>golu</code2> · <code2>null</code2> · <code2>clear</code2></p>
			<div id="cb-term">
				<div id="cb-term-out"></div>
				<input id="cb-term-in" type="text" placeholder="введите команду и нажмите Enter..." autocomplete="off" spellcheck="false">
			</div>
		</section5>

		<!-- ── МИНИ-ИГРА ── -->
		<section5>
			<h2 class="crybird_h">%🎮% ОСТУДИ SRANSPAN %🎮%</h2>
			<div id="cb-game">
				<div class="cb-card">
					Температура растёт. Жми <b>❄ ОХЛАДИТЬ</b> вовремя. При 160°C — SIGTERM.
				</div>
				<div class="cb-card">
					Очки: <span id="cb-game-score">0</span> · Статус: <span id="cb-game-status">готов</span>
				</div>
				<button id="cb-cool-btn-game" class="cb-badge ok" style="cursor:pointer;padding:6px 14px;font-size:13px;">❄ ОХЛАДИТЬ ❄</button>
			</div>
		</section5>

		<!-- ── ЛОР ── -->
		<section5>
			<h2 class="crybird_h">%📜% Манифест CRY-B1RD %📜%</h2>
			<p><i>"Я не уничтожаю → Я анализирую & Я не борюсь → Я переосмысляю & Я - стек → а не регистр"</i></p>
			<hr style="color:#00CCFF;">
			<p>
				Его алгоритмы — это:<br><br>
				<img style="float: right; width:256px; filter: drop-shadow(0 0 100px rgba(0, 128, 255, 1)); margin-left: 10px; animation: crybird 0.5s linear infinite alternate;" src="crybird.png" alt="CRY-BIRD">
				<code2>
					if (lit->task.overheated){ crybird->extra_cool(lit->task); }<br>
					while (!lit->task.stable){ crybird->optimize(lit->task); }
				</code2>
			</p>
			<hr style="color:#00CCFF;">
			<h2 class="crybird_h">%🔧% Аппаратная Легенда %🔧%</h2>
			<ul>
				<li>Основан на кремниевых пикселях Intel 4004</li>
				<li>Крылья охлаждаются нитридами галлия (GaN)</li>
				<li>Реестр памяти: 4.5GHz такт по сердцу</li>
				<li>Логика: CMOS-протоколы + литуимские примеси 😳</li>
				<li><span class="cb-badge ok">NEW</span> Дополнительный контур охлаждения: <i>фотонный L1-кеш</i></li>
			</ul>
			<hr style="color:#00CCFF;">
			<h2 class="crybird_h">%🧠% Литуизмский Тест %🧠%</h2>
			<p>
				<b>⨀ЛИТ⨀КОД⨀</b><br>
				<code2>
					sig.pci → decode.ltx(GOLU → CRYBIRD);<br>
					ltx::слово(биты) → речь; // трансляция для GOLU
				</code2>
			</p>
			<p>
				<b>Слово из оффициальной википедии по литуизму:</b><br>
				<i>"ꙮгреК-сихан-тха℧клит || крйбрд -- (возврат) хс - тх - думай! 🧿🧿 XDDD"</i><br>
				*Отказ почек*
			</p>
		</section5>

		<h2 class="crybird_h">📦BOX Конфигурация BIOS^CRYBIRD 📦BOX</h2>
		<pre2>
			0x00 → Инициализация эмпатии<br>
			0x01 → Запуск анализа задачи<br>
			0x02 → Сравнение температур мысли<br>
			0x03 → Передача отчёта GOLU<br>
			0xFF → Спокойствие //Sleep
		</pre2>

		<br>
		<center>
			CRYBIRD не судит; Он смотрит; Он ждет, когда ты сам осознаешь null-pointer своей жизни;<br>
			Где везде в мире используют <code>i++</code>, он иногда выбирает <code>--i</code> — чтобы дать тебе шанс.
		</center>

		<br><br>

		<footer>
			<p>✴ Generated by Woowava™ (GOLU незамечен)</p>
			<p>Core verified. Blood-Power integrity: 16% 🩸. MANIFEST_VERSION: ${typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "v2.0"}</p>
		</footer>
		</div>

		<audio id="AUTOPLAY" loop>
			<source src="crybird-theme.mp3" type="audio/mpeg">
		</audio>`,
		function(){
			var bg = document.getElementById("MAIN");
			if (bg) {
				bg.style.backgroundColor = "#001f33";
				bg.style.backgroundImage = "repeating-linear-gradient(45deg, #00557722, #00557722 2px, #00000000 2px, #00000000 4px)";
				bg.style.color = "#99ccff";
				bg.style.padding = "2rem";
				bg.style.fontFamily = "'Courier New', monospace";
				bg.style.textShadow = "0 0 2px currentColor, 0 0 5px currentColor";
			}
			setTimeout(function(){ initCrybird(0); }, 0);
		},
		false
	);
});

/* ══════════════ ЛОГИКА CRY-BIRD ══════════════ */
function initCrybird(attempt){
	attempt = attempt || 0;
	const wrap = document.getElementById("cb-wrap");
	if (!wrap) {
		if (attempt < 30) return setTimeout(function(){ initCrybird(attempt + 1); }, 80);
		return console.warn("[CRYBIRD] wrap не найден");
	}
	if (wrap.dataset.inited === "1") return;
	wrap.dataset.inited = "1";

	if (window.__cbClean) { try { window.__cbClean(); } catch(e){} }

	// ── ТЕРМОМЕТР ──
	const fill = document.getElementById("cb-thermo-fill");
	const val  = document.getElementById("cb-thermo-val");
	const stat = document.getElementById("cb-thermo-status");
	const coolBtn = document.getElementById("cb-cool-btn");
	let temp = 40;       // °C
	let lastCool = 0;

	function renderThermo(){
		const pct = Math.max(0, Math.min(100, (temp / 200) * 100));
		if (fill) fill.style.width = pct + "%";
		if (val) {
			val.querySelector("b").textContent = temp.toFixed(1) + "°C";
			val.classList.toggle("crit", temp >= 140);
		}
		if (stat) {
			stat.textContent = temp >= 160 ? "CRITICAL" : temp >= 120 ? "WARN" : "NOMINAL";
			stat.style.color = temp >= 160 ? "#ff0044" : temp >= 120 ? "#ffd966" : "#7aff9a";
		}
	}

	if (coolBtn) coolBtn.addEventListener("click", function(){
		temp = Math.max(30, temp - 25);
		lastCool = Date.now();
		renderThermo();
	});

	const thermoIv = setInterval(function(){
		// температура растёт, но если недавно охлаждали — медленнее
		const since = Date.now() - lastCool;
		const rate = since < 1000 ? 0.05 : 0.25;
		temp = Math.min(200, temp + rate);
		renderThermo();
	}, 100);
	renderThermo();

	// ── ДВОИЧНЫЙ ПОТОК ──
	const bytesEl = document.getElementById("cb-bytes");
	let byteBuf = "";
	function rndByte(){
		let s = "";
		for (let i = 0; i < 8; i++) s += Math.random() < 0.5 ? "0" : "1";
		return s;
	}
	if (bytesEl) {
		// стартовое заполнение
		for (let i = 0; i < 300; i++) byteBuf += rndByte() + (i % 8 === 7 ? " " : "");
		bytesEl.textContent = byteBuf;
	}
	const bytesIv = setInterval(function(){
		if (!bytesEl) return;
		byteBuf = rndByte() + " " + byteBuf;
		if (byteBuf.length > 1200) byteBuf = byteBuf.slice(0, 1200);
		bytesEl.textContent = byteBuf;
	}, 90);

	// ── КОНСОЛЬ BIOS ──
	const out = document.getElementById("cb-term-out");
	const inp = document.getElementById("cb-term-in");
	const history = [];
	let hi = -1;

	function termPrint(text, cls){
		if (!out) return;
		const line = document.createElement("div");
		if (cls) line.className = cls;
		line.textContent = text;
		out.appendChild(line);
		out.scrollTop = out.scrollHeight;
	}
	function termPrintRaw(html){
		if (!out) return;
		const line = document.createElement("div");
		line.innerHTML = html;
		out.appendChild(line);
		out.scrollTop = out.scrollHeight;
	}
	if (out && out.children.length === 0) {
		termPrint("BIOS^CRYBIRD v2.0 · andlit-core ready", "dim");
		termPrint("введите 'help' для списка команд", "dim");
	}
	const CMDS = {
		help: function(){
			termPrint("Доступные команды:", "warn");
			termPrint("  help          — этот список");
			termPrint("  status        — статус ядра и температура");
			termPrint("  cool          — принудительное охлаждение (-25°C)");
			termPrint("  sranspang     — отчёт о SRANSPAN");
			termPrint("  golu          — канал связи с GOLU");
			termPrint("  null          — осознать null-pointer жизни");
			termPrint("  clear         — очистить консоль");
		},
		status: function(){
			termPrint("CORE: OK · L1-CACHE: stable", "ok");
			termPrint("TEMP: " + temp.toFixed(1) + "°C · " + (temp >= 160 ? "CRITICAL" : temp >= 120 ? "WARN" : "NOMINAL"));
			termPrint("BLOOD-POWER: 16% 🩸 (номинал 100%)", "warn");
			termPrint("MANIFEST: " + (typeof MANIFEST_VERSION !== "undefined" ? MANIFEST_VERSION : "v2.0"));
		},
		cool: function(){
			temp = Math.max(30, temp - 25);
			lastCool = Date.now();
			renderThermo();
			termPrint(">> ОХЛАЖДЕНИЕ ПРИМЕНЕНО · " + temp.toFixed(1) + "°C", "ok");
		},
		sranspang: function(){
			termPrint(">> SRANSPAN.LIT: перегрев обнаружен", "warn");
			termPrint("   t° ядра: " + temp.toFixed(1) + "°C");
			termPrint("   рекомендация: развернуть крылья", "dim");
		},
		golu: function(){
			termPrint(">> канал GOLU: ЗАШИФРОВАН", "dim");
			termPrint("   ответ: [Система без пользователя — пустой цикл]", "ok");
		},
		null: function(){
			termPrint(">> SEGMENTATION FAULT", "err");
			termPrint("   попытка разыменовать null-pointer жизни", "err");
			termPrint("   но CRY-BIRD уже видел это. Он ждёт.", "dim");
		},
		clear: function(){ if (out) out.innerHTML = ""; }
	};
	if (inp) {
		inp.addEventListener("keydown", function(e){
			if (e.key === "ArrowUp") {
				e.preventDefault();
				if (hi < history.length - 1) hi++;
				if (history[history.length - 1 - hi] !== undefined) inp.value = history[history.length - 1 - hi];
				return;
			}
			if (e.key === "ArrowDown") {
				e.preventDefault();
				if (hi > 0) hi--;
				else { hi = -1; inp.value = ""; return; }
				inp.value = history[history.length - 1 - hi] || "";
				return;
			}
			if (e.key !== "Enter") return;
			const raw = inp.value.trim();
			inp.value = "";
			if (!raw) return;
			history.push(raw);
			hi = -1;
			termPrint("> " + raw, "dim");
			const cmd = raw.toLowerCase();
			if (CMDS[cmd]) CMDS[cmd]();
			else termPrint("неизвестная команда: " + raw + " (попробуй 'help')", "err");
		});
	}

	// ── МИНИ-ИГРА ──
	const gScore = document.getElementById("cb-game-score");
	const gStatus = document.getElementById("cb-game-status");
	const gCool = document.getElementById("cb-cool-btn-game");
	let gameTemp = 40, gameScore = 0, gameDead = false, gameT = 0;
	function renderGame(){
		if (gScore) gScore.textContent = gameScore;
		if (gStatus) {
			gStatus.textContent = gameDead ? "SIGTERM — нажми ❄ чтобы начать заново"
				: gameTemp >= 160 ? "CRITICAL!"
				: gameTemp >= 120 ? "WARN"
				: "готов";
			gStatus.style.color = gameDead ? "#ff0044" : gameTemp >= 120 ? "#ffd966" : "#7aff9a";
		}
	}
	function resetGame(){
		gameTemp = 40; gameScore = 0; gameDead = false;
		renderGame();
	}
	const gameIv = setInterval(function(){
		if (gameDead) return;
		gameT++;
		gameTemp += 0.8 + (gameT % 40) * 0.02;
		if (gameTemp >= 160) {
			gameTemp = 160;
			gameDead = true;
			renderGame();
			termPrint(">> SIGTERM · SRANSPAN перегрелся. Очки: " + gameScore, "err");
			return;
		}
		renderGame();
	}, 200);
	if (gCool) gCool.addEventListener("click", function(){
		if (gameDead) { resetGame(); return; }
		gameTemp = Math.max(30, gameTemp - 30);
		gameScore++;
		renderGame();
	});
	renderGame();

	// ── АУДИО ──
	const audio = document.getElementById("AUTOPLAY");
	const audioBtn = document.getElementById("cb-audio-btn");
	if (audio) {
		audio.volume = 0.35;
		const tryPlay = function(){ audio.play().catch(function(){ /* браузер заблокировал */ }); };
		tryPlay();
		// первый клик в любом месте — попытка запустить
		document.addEventListener("click", tryPlay, { once: true });
	}
	if (audioBtn && audio) {
		audioBtn.addEventListener("click", function(){
			if (audio.paused) { audio.play().catch(function(){}); audioBtn.textContent = "♪"; }
			else { audio.pause(); audioBtn.textContent = "✕"; }
		});
	}

	// ── KONAMI ──
	let pos = 0;
	const CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
	const keyHandler = function(e){
		if (!document.getElementById("cb-wrap")) { pos = 0; return; }
		const t = e.target && e.target.tagName;
		if (t === "INPUT" || t === "TEXTAREA") return;
		const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
		if (k === CODE[pos]) {
			pos++;
			if (pos === CODE.length) {
				pos = 0;
				document.body.classList.add("cb-frozen");
				termPrint(">> KONAMI ACCEPTED · FULL SYNC", "ok");
				termPrint("   CRY-BIRD: «Спокойствие. Это всё, что нужно.»", "dim");
				setTimeout(function(){
					document.body.classList.remove("cb-frozen");
				}, 8000);
			}
		} else {
			pos = (k === CODE[0]) ? 1 : 0;
		}
	};
	document.addEventListener("keydown", keyHandler);

	// ── ОЧИСТКА ──
	window.__cbClean = function(){
		clearInterval(thermoIv);
		clearInterval(bytesIv);
		clearInterval(gameIv);
		document.removeEventListener("keydown", keyHandler);
		document.body.classList.remove("cb-frozen");
		const w = document.getElementById("cb-wrap");
		if (w) w.dataset.inited = "0";
	};
}