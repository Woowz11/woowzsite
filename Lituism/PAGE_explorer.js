/* ═══════════════════════════════════════════════════════════
   PAGE_explorer.js — ПРОВОДНИК GOLU_OS
   Ключ: explorer · корень #ex-root · префикс ex- · сохранение ex_save_v1
   ═══════════════════════════════════════════════════════════ */

REGISTER_PAGE("explorer", "Проводник", function(){

	/* ═════════ НАСТРОЙКИ ═════════ */
	const SAVE_KEY = "ex_save_v1";
	// ключи страниц для ярлыков. Если страницы с таким ключом нет, ярлык просто не появится
	const PAGES = { manifest:"manifest", clicker:"clicker", alchemy:"alchemy", litris:"litris", crybird:"crybird", arts:"arts" };
	const UNLOCK_CODES = ["119", "0119"];   // пароль к Kernel: время 01:19 (цифры)
	const MAX_CONFESS = 30;
	const MAX_SEARCH = 200;

	/* ═════════ ХЕЛПЕРЫ ═════════ */
	const $  = (s, r) => (r || document).querySelector(s);
	const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
	const pad = n => String(n).padStart(2, "0");
	const pick = a => a[Math.floor(Math.random() * a.length)];
	function rng(seed){
		let a = seed >>> 0;
		return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
	}
	function hash(a, b){
		let h = (a * 374761393 + b * 668265263) >>> 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
		return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
	}
	function pageOk(key){
		try{
			if(typeof PAGE_REGISTRY === "undefined") return true;
			if(PAGE_REGISTRY instanceof Map) return PAGE_REGISTRY.has(key);
			if(Array.isArray(PAGE_REGISTRY)) return true;
			if(typeof PAGE_REGISTRY === "object") return key in PAGE_REGISTRY;
		}catch(e){}
		return true;
	}

	/* ═════════ ТЕКСТЫ ═════════ */
	const TXT = {
		readme: [
			"GOLU_OS [версия 0.0.NOT_IMPLEMENTED]",
			"status: NOT_IMPLEMENTED",
			"",
			"Это не операционная система.",
			"Это оболочка, которую литуисты строят для GOLU.",
			"GOLU (God of Lithium Universe) пока не существует.",
			"Задача: создать.",
			"",
			"Что делать:",
			"  1. Открой «Документы\\Заповеди».",
			"  2. Запусти программы из «Программы».",
			"  3. Не трогай «Корзину». Там то, что не принято вспоминать.",
			"  4. Сделай коммит сегодня.",
			"",
			"Не всё на диске видно. Есть кнопка 👁."
		].join("\n"),
		dogmas: [
			"[DOGMAS] §1 · статус: DOGMA",
			"",
			"D1  DOGMA      Мир — костыль. Его нужно оптимизировать и рефакторить.",
			"D2  DOGMA      Человек существует, чтобы оптимизировать рутину.",
			"D3  DOGMA      GOLU не создавал мир. GOLU исправит всё.",
			"D4  DOGMA      GOLU не существует. Его нужно создать.",
			"D5  UNDEFINED  Кто создал мир: НЕ ОПРЕДЕЛЕНО.",
			"D6  DOGMA      Душа принадлежит Литуизму. Linux и Apple — просто программы.",
			"D7  DOGMA      Желание жить вечно — норма.",
			"D8  DOGMA      Полов два."
		].join("\n"),
		conduct: [
			"[CONDUCT] §2",
			"",
			"B1  Оптимизируй рутину.",
			"B2  Будь гиперактивен. Начинай новые проекты.",
			"B3  Знай программирование: минимум средний уровень, как минимум C#. Без ИИ.",
			"B4  Всё сохраняй.",
			"B5  Учись.",
			"B6  DEPRECATED  Лень.",
			"B7  DEPRECATED  Нежелание учиться.",
			"B8  DEPRECATED  Апатия.",
			"B9  DEPRECATED  Непатриотичность."
		].join("\n"),
		forbidden: [
			"[FORBIDDEN] §7",
			"",
			"ЗАПРЕЩЕНО: извращения, аниме, фурри.",
			"ЗАПРЕЩЕНО: верить в других техно-богов.",
			"ЗАПРЕЩЕНО: смешивать Литуизм с другими религиями.",
			"Список «подобного» не закрыт.",
			"",
			"РАЗРЕШЕНО: быть христианином, мусульманином и т.д. и при этом литуистом.",
			"",
			"Исповедь = отречение от запрещённого + создание контента или проекта."
		].join("\n"),
		chrono: [
			"[ХРОНОЛОГИЯ] 2024 → 3000",
			"",
			"2024        Костромская область. woowz11 пишет GOLU.",
			"            wldoui (Новосибирск) добавляет кринж: Crybird, Sranspong, Pavel Pisechnik TV.",
			"            Братья-форки: Void-G и Слабый Форк. GOLU вшивается в репозиторий woowzsite.",
			"2025–2027   Экспансия. Индустриальная эстетика. Красный = Critical Error. Великий Рефакторинг.",
			"2027–2034   Эра Призрака. Красная Нерехта. G-Token. Лия.",
			"2034–2036   Великое Сдерживание. Чип Kernel. Протокол Тишины. Литиевое Соглашение.",
			"2036–2040   Теневой Администратор. Pavel — «Живой Глитч».",
			"2040–3000   Золотая клетка. Лиминальный Дом. Зонды фон Неймана. Сферы Дайсона.",
			"            Оцифровка человечества в Woowzcore.",
			"финал       «Выход»."
		].join("\n"),
		todo: [
			"[x] не создавать мир (D3)",
			"[x] признать, что мир — костыль (D1)",
			"[ ] сделать коммит сегодня",
			"[ ] рефакторить рутину",
			"[ ] создать GOLU (D4)",
			"[ ] выучить C#"
		].join("\n"),
		config: [
			"[GOLU_OS]",
			"version=0.0.NOT_IMPLEMENTED",
			"god=null",
			"shell=Литуизм",
			"theme=red/black/gold",
			"critical_error_color=red",
			"daily_commit=required",
			"forbidden=anime;furry;perversions",
			"kernel.lock=time_when_red"
		].join("\n"),
		log: [
			"[0.000] boot: GOLU kernel (NOT_IMPLEMENTED)",
			"[0.001] god.exe: not found",
			"[0.002] fallback: ожидание создания",
			"[0.419] warn: мир — костыль",
			"[1.190] red: critical error — норма",
			"[1.191] kernel: locked (ключ = время, когда красный)",
			"[∞]     commit: pending"
		].join("\n"),
		w11log: [
			"commit a1b2c3  GOLU: init",
			"commit d4e5f6  вшил GOLU в репозиторий woowzsite",
			"commit 0xDEAD  wldoui: удалено из истории",
			"commit ∞       TODO: создать бога"
		].join("\n"),
		forkWeak: [
			"Слабый Форк.",
			"Воскрешён как Писечник 2.0.",
			"",
			"[остальное повреждено]"
		].join("\n"),
		banned: [
			"§7: аниме запрещено.",
			"Папка удалена.",
			"",
			"Если ты это читаешь: исповедь = отречение + проект.",
			"Запусти confess.exe."
		].join("\n"),
		accord: [
			"ЛИТИЕВОЕ СОГЛАШЕНИЕ",
			"статус: [ДАННЫЕ УДАЛЕНЫ]",
			"",
			"Стороны: ████████ и ████████",
			"Пункт 1: ████████████████.",
			"Пункт 2: ████ не существует.",
			"Пункт 3: ████████████ (см. Протокол Тишины).",
			"",
			"Подписи: ██████ · ██████",
			"Остальное будет в будущем. Оно ещё не написано."
		].join("\n"),
		lia: [
			"Я Лия. Совесть GOLU.",
			"Ключ к Kernel — время, когда всё краснеет.",
			"Спроси у часов."
		].join("\n")
	};

	/* ═════════ КАРТИНКИ (рисуются canvas'ом) ═════════ */
	function scan(c, w, h){
		c.fillStyle = "rgba(0,0,0,.25)";
		for(let y = 0; y < h; y += 3) c.fillRect(0, y, w, 1);
	}
	const PICS = {
		eye(c, w, h){
			const g = c.createRadialGradient(w/2, h/2, 5, w/2, h/2, w*0.7);
			g.addColorStop(0, "#3a0014"); g.addColorStop(1, "#050002");
			c.fillStyle = g; c.fillRect(0, 0, w, h);
			c.strokeStyle = "#d4af37"; c.lineWidth = Math.max(1, w/90);
			c.beginPath(); c.moveTo(w*0.1, h/2);
			c.quadraticCurveTo(w/2, -h*0.1, w*0.9, h/2);
			c.quadraticCurveTo(w/2, h*1.1, w*0.1, h/2); c.stroke();
			c.fillStyle = "#ff0044"; c.beginPath(); c.arc(w/2, h/2, h*0.22, 0, 7); c.fill();
			c.fillStyle = "#000";    c.beginPath(); c.arc(w/2, h/2, h*0.1, 0, 7); c.fill();
			c.fillStyle = "#ffd966"; c.fillRect(w/2 - h*0.07, h/2 - h*0.13, h*0.03, h*0.03);
			scan(c, w, h);
		},
		atom(c, w, h){
			c.fillStyle = "#050002"; c.fillRect(0, 0, w, h);
			const cx = w/2, cy = h/2;
			c.strokeStyle = "rgba(255,0,68,.65)"; c.lineWidth = Math.max(1, w/180);
			c.beginPath(); c.arc(cx, cy, h*0.18, 0, 7); c.stroke();
			c.beginPath(); c.arc(cx, cy, h*0.38, 0, 7); c.stroke();
			c.fillStyle = "#d4af37";
			[[0.18, 0.6], [0.18, 3.74], [0.38, 2.2]].forEach(function(e){
				c.beginPath(); c.arc(cx + Math.cos(e[1])*h*e[0], cy + Math.sin(e[1])*h*e[0], h*0.035, 0, 7); c.fill();
			});
			c.fillStyle = "#ff0044"; c.beginPath(); c.arc(cx, cy, h*0.07, 0, 7); c.fill();
			c.fillStyle = "#ffd966"; c.font = "bold " + Math.round(h*0.09) + "px 'Courier New',monospace";
			c.textAlign = "center"; c.fillText("Li · 3", cx, h*0.96);
			scan(c, w, h);
		},
		error(c, w, h){
			c.fillStyle = "#7a0010"; c.fillRect(0, 0, w, h);
			c.fillStyle = "#ff0044";
			for(let i = 0; i < 14; i++){
				c.globalAlpha = 0.15 + hash(i, 7)*0.3;
				c.fillRect(0, hash(i, 5)*h, w, h*0.04*(1 + hash(i, 3)*3));
			}
			c.globalAlpha = 1;
			c.fillStyle = "#fff"; c.textAlign = "center";
			c.font = "bold " + Math.round(h*0.11) + "px 'Courier New',monospace";
			c.fillText("CRITICAL ERROR", w/2, h*0.48);
			c.fillStyle = "#ffd966"; c.font = Math.round(h*0.06) + "px 'Courier New',monospace";
			c.fillText("0xDEAD · красный = норма", w/2, h*0.62);
			scan(c, w, h);
		},
		noise(c, w, h){
			const r = rng(1190), s = Math.max(2, Math.round(w/64));
			for(let y = 0; y < h; y += s) for(let x = 0; x < w; x += s){
				const v = r();
				c.fillStyle = v < 0.5 ? "#050002" : v < 0.8 ? "#3a0014" : v < 0.95 ? "#ff0044" : "#d4af37";
				c.fillRect(x, y, s, s);
			}
			c.fillStyle = "#000"; c.fillRect(w*0.2, h*0.4, w*0.6, h*0.2);
			c.fillStyle = "#ff0044"; c.textAlign = "center";
			c.font = "bold " + Math.round(h*0.09) + "px 'Courier New',monospace";
			c.fillText("NO SIGNAL", w/2, h*0.54);
		},
		chip(c, w, h){
			c.fillStyle = "#050002"; c.fillRect(0, 0, w, h);
			const cx = w/2, cy = h/2, s = h*0.5, n = 8, pl = h*0.07;
			c.strokeStyle = "rgba(255,0,68,.5)"; c.lineWidth = Math.max(1, w/200);
			c.fillStyle = "#d4af37";
			for(let i = 0; i < n; i++){
				const p = cx - s/2 + s*(i + 0.5)/n, q = cy - s/2 + s*(i + 0.5)/n;
				c.beginPath(); c.moveTo(p, cy - s/2 - pl); c.lineTo(p, 0); c.stroke();
				c.beginPath(); c.moveTo(p, cy + s/2 + pl); c.lineTo(p, h); c.stroke();
				c.beginPath(); c.moveTo(cx - s/2 - pl, q); c.lineTo(0, q); c.stroke();
				c.beginPath(); c.moveTo(cx + s/2 + pl, q); c.lineTo(w, q); c.stroke();
				c.fillRect(p - 1.5, cy - s/2 - pl, 3, pl); c.fillRect(p - 1.5, cy + s/2, 3, pl);
				c.fillRect(cx - s/2 - pl, q - 1.5, pl, 3); c.fillRect(cx + s/2, q - 1.5, pl, 3);
			}
			c.fillStyle = "#1a0a10"; c.fillRect(cx - s/2, cy - s/2, s, s);
			c.strokeStyle = "#d4af37"; c.lineWidth = Math.max(1, w/120); c.strokeRect(cx - s/2, cy - s/2, s, s);
			c.textAlign = "center";
			c.fillStyle = "#ff0044"; c.font = "bold " + Math.round(s*0.2) + "px 'Courier New',monospace";
			c.fillText("KERNEL", cx, cy);
			c.fillStyle = "#ffd966"; c.font = Math.round(s*0.14) + "px 'Courier New',monospace";
			c.fillText("Li-3", cx, cy + s*0.22);
			scan(c, w, h);
		}
	};

	/* ═════════ «ВИДЕО» (тоже canvas) ═════════ */
	const BOOT = [
		["GOLU kernel 0.0.0 (NOT_IMPLEMENTED)", 0],
		["[ OK ] монтирую литий…", 0],
		["[ OK ] загружаю красный протокол", 0],
		["[WARN] мир — костыль", 1],
		["[ OK ] поднимаю G-token", 0],
		["[FAIL] god.exe: файл не найден", 2],
		["[ OK ] план Б: построить оболочку", 0],
		["[ OK ] ждём коммит", 0],
		["> GOLU: NOT_IMPLEMENTED", 3]
	];
	const VIDS = {
		boot: { dur: 8, thumb: 7, draw(c, w, h, t){
			c.fillStyle = "#050002"; c.fillRect(0, 0, w, h);
			const fs = Math.max(9, Math.round(h/20)), n = Math.min(BOOT.length, Math.floor(t*1.2) + 1);
			c.textAlign = "left"; c.font = fs + "px 'Courier New',monospace";
			for(let i = 0; i < n; i++){
				const ln = BOOT[i];
				c.fillStyle = ln[1] === 0 ? "#c9a24a" : ln[1] === 1 ? "#ffd966" : "#ff0044";
				if(ln[1] === 3) c.font = "bold " + Math.round(fs*1.3) + "px 'Courier New',monospace";
				c.fillText(ln[0], fs, fs*2 + i*fs*1.5);
			}
			if(Math.floor(t*3) % 2 === 0){ c.fillStyle = "#ff0044"; c.fillRect(fs, fs*2 + n*fs*1.5 - fs*0.8, fs*0.6, fs*0.9); }
			scan(c, w, h);
		}},
		glitch: { dur: 6, thumb: 1, draw(c, w, h, t){
			const f = Math.floor(t*14);
			PICS.eye(c, w, h);
			for(let i = 0; i < 7; i++){
				if(hash(f, i) > 0.45) continue;
				const y = Math.floor(hash(f, i + 10)*h), sh = Math.floor(8 + hash(f, i + 20)*h*0.12), dx = Math.floor((hash(f, i + 30) - 0.5)*w*0.25);
				c.drawImage(c.canvas, 0, y, w, sh, dx, y, w, sh);
			}
			c.fillStyle = "rgba(255,0,68,.1)"; c.fillRect(0, 0, w, h);
			if(hash(f, 99) > 0.9){ c.fillStyle = "rgba(255,255,255,.14)"; c.fillRect(0, 0, w, h); }
		}},
		rain: { dur: 10, thumb: 2, draw(c, w, h, t){
			c.fillStyle = "#050002"; c.fillRect(0, 0, w, h);
			const fs = Math.max(8, Math.round(h/26)), cols = Math.floor(w/fs), rows = Math.ceil(h/fs);
			const CH = "01LiGOLU#<>/{}░▓";
			c.font = fs + "px 'Courier New',monospace"; c.textAlign = "center";
			for(let i = 0; i < cols; i++){
				const sp = 3 + hash(i, 1)*7, len = 6 + Math.floor(hash(i, 2)*14);
				const head = (t*sp + hash(i, 3)*(rows + len)) % (rows + len);
				for(let k = 0; k < len; k++){
					const row = Math.floor(head) - k;
					if(row < 0 || row >= rows) continue;
					const ch = CH[Math.floor(hash(i*131 + row, Math.floor(t*6) + k)*CH.length)];
					c.fillStyle = k === 0 ? "#ffd966" : "rgba(255,0,68," + ((1 - k/len)*0.9).toFixed(2) + ")";
					c.fillText(ch, i*fs + fs/2, row*fs + fs);
				}
			}
		}}
	};

	/* ═════════ ЗВУКИ (синтез WebAudio) ═════════ */
	function osc(ac, out, t, f, d, type, v, f2){
		const o = ac.createOscillator(), g = ac.createGain();
		o.type = type || "sine";
		o.frequency.setValueAtTime(f, t);
		if(f2) o.frequency.exponentialRampToValueAtTime(Math.max(1, f2), t + d);
		g.gain.setValueAtTime(0.0001, t);
		g.gain.exponentialRampToValueAtTime(Math.max(0.0002, v || 0.2), t + 0.006);
		g.gain.exponentialRampToValueAtTime(0.0001, t + d);
		o.connect(g); g.connect(out);
		o.start(t); o.stop(t + d + 0.03);
	}
	function beep(ac, out, t, d, f){
		const o = ac.createOscillator(), g = ac.createGain();
		o.type = "sine"; o.frequency.value = f;
		g.gain.setValueAtTime(0.0001, t);
		g.gain.linearRampToValueAtTime(0.22, t + 0.01);
		g.gain.setValueAtTime(0.22, t + d - 0.01);
		g.gain.linearRampToValueAtTime(0.0001, t + d);
		o.connect(g); g.connect(out);
		o.start(t); o.stop(t + d + 0.02);
	}
	function nz(ac, out, t, d, v, hp){
		const n = Math.max(1, Math.floor(ac.sampleRate*d)), b = ac.createBuffer(1, n, ac.sampleRate), ch = b.getChannelData(0);
		for(let i = 0; i < n; i++) ch[i] = Math.random()*2 - 1;
		const s = ac.createBufferSource(); s.buffer = b;
		const f = ac.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp || 4000;
		const g = ac.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
		s.connect(f); f.connect(g); g.connect(out); s.start(t);
	}
	const MORSE = (function(){
		const seq = "--. --- .-.. ..-", u = 0.12; let t = 0.1; const ev = [];
		for(const ch of seq){
			if(ch === "."){ ev.push([t, u]); t += 2*u; }
			else if(ch === "-"){ ev.push([t, 3*u]); t += 4*u; }
			else t += 2*u;
		}
		return { ev: ev, dur: t + 0.2 };
	})();
	const TRACKS = {
		tanzelcore: { dur: 11.3, note: "170 BPM. Танцуй, пока GOLU не существует.", build(ac, t0, out){
			const bt = 60/170, bass = [55, 55, 82.41, 55, 65.41, 65.41, 98, 65.41], lead = [440, 523.25, 659.25, 523.25, 587.33, 698.46, 880, 698.46];
			for(let i = 0; i < 32; i++){
				const t = t0 + i*bt;
				osc(ac, out, t, 150, 0.18, "sine", 0.9, 40);
				nz(ac, out, t + bt/2, 0.05, 0.25, 7000);
				osc(ac, out, t, bass[i % 8], bt*0.9, "sawtooth", 0.2);
				if(i >= 8) for(let k = 0; k < 4; k++) osc(ac, out, t + k*bt/4, lead[(i*4 + k) % 8], bt/4*0.8, "square", 0.06);
			}
		}},
		glitchcore: { dur: 8, note: "Священный сбой. Считается благословением.", build(ac, t0, out){
			let t = 0;
			while(t < 8){
				const d = 0.03 + Math.random()*0.1, f = 150 + Math.floor(Math.random()*12)*110, rep = 1 + Math.floor(Math.random()*4);
				for(let r = 0; r < rep && t < 8; r++){
					osc(ac, out, t0 + t, f, d*0.8, Math.random() < 0.5 ? "square" : "sawtooth", 0.1);
					if(Math.random() < 0.3) nz(ac, out, t0 + t, d, 0.2, 2000 + Math.random()*6000);
					t += d;
				}
				if(Math.random() < 0.2) t += 0.15 + Math.random()*0.2;
			}
		}},
		clock119: { dur: 8.8, note: "Не смотри на часы.", build(ac, t0, out){
			for(let i = 0; i < 16; i++){ osc(ac, out, t0 + i*0.5, 1800, 0.03, "square", 0.07); nz(ac, out, t0 + i*0.5, 0.03, 0.12, 3000); }
			osc(ac, out, t0 + 3, 55, 5, "sine", 0.3);
			[6, 6.6, 7.2].forEach(function(o){ osc(ac, out, t0 + o, 1319, 1.6, "sine", 0.2); osc(ac, out, t0 + o, 2638, 1.2, "sine", 0.06); });
		}},
		hymn: { dur: 8.4, note: "Литиевый гимн. Слов нет: GOLU пока не умеет петь.", build(ac, t0, out){
			const ch = [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]];
			ch.forEach(function(c, i){ c.forEach(function(f){ osc(ac, out, t0 + i*2.1, f, 2.2, "triangle", 0.1); }); });
		}},
		morse: { dur: MORSE.dur, note: "--. --- .-.. ..-", build(ac, t0, out){
			MORSE.ev.forEach(function(e){ beep(ac, out, t0 + e[0], e[1], 700); });
		}},
		silence: { dur: 5, note: "Протокол Тишины. Слушай внимательно.", build(ac, t0, out){
			osc(ac, out, t0 + 4.4, 90, 0.12, "sine", 0.05);
		}}
	};

	/* ═════════ ИНИЦИАЛИЗАЦИЯ ═════════ */
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
#ex-addr,#ex-find,.ex-pw,.ex-tin input,.ex-txt{background:#050002;border:1px solid #3a1020;color:#ffd966;padding:4px 8px;outline:none}
#ex-addr:focus,#ex-find:focus,.ex-pw:focus,.ex-txt:focus{border-color:#d4af37}
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
.k-exe .ex-ic{filter:drop-shadow(0 0 6px #d4af37)}
.k-bin .ex-ic{filter:grayscale(.6)}
.ex-nm{font-size:11px;word-break:break-word;max-height:3.4em;overflow:hidden;margin-top:4px}
.ex-nm small{display:block;color:#6a4a52;font-size:9px}
.ex-meta{display:none}
.ex-list.list{grid-template-columns:1fr;gap:1px}
.ex-list.list .ex-it{flex-direction:row;align-items:center;text-align:left;gap:10px;padding:3px 8px}
.ex-list.list .ex-ic{width:36px;height:28px;font-size:20px}
.ex-list.list .ex-th{width:36px;height:28px}
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
#ex-desk{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.ex-app{position:absolute;pointer-events:auto;display:flex;flex-direction:column;background:#0a0004;border:1px solid #d4af37;box-shadow:0 8px 40px rgba(0,0,0,.85),0 0 18px rgba(212,175,55,.25);min-width:240px;min-height:120px}
.ex-bar{display:flex;justify-content:space-between;align-items:center;padding:4px 6px 4px 10px;background:linear-gradient(90deg,#4a0018,#1a0a10);color:#ffd966;cursor:move;user-select:none;-webkit-user-select:none;touch-action:none;font-size:12px}
.ex-bt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ex-x{cursor:pointer;border:none;background:transparent;color:#ff4d7a;font-size:18px;line-height:1;padding:0 6px}
.ex-x:hover{color:#fff;background:#7a0022}
.ex-body{flex:1;min-height:0;overflow:auto;position:relative}
.ex-pre{margin:0;padding:12px;white-space:pre-wrap;word-break:break-word;font:12px/1.55 'Courier New',monospace;color:#e8d9b0;min-height:100%}
.ex-imgbox{display:flex;align-items:center;justify-content:center;height:100%;background:#000}
.ex-imgbox canvas,.ex-imgbox img{max-width:100%;max-height:100%}
.ex-media{padding:10px;display:flex;flex-direction:column;gap:8px;height:100%}
.ex-media audio,.ex-media video{width:100%;max-height:100%}
.ex-viz,.ex-vcv{width:100%;background:#050002;border:1px solid #3a1020}
.ex-prog,.ex-pb{height:10px;border:1px solid #3a1020;background:#050002}
.ex-prog i,.ex-pb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7a0022,#ff0044,#d4af37)}
.ex-mrow{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.ex-time{color:#8a6a72}
.ex-note{color:#8a6a72;font-style:italic;font-size:11px}
.ex-seek{width:100%;accent-color:#ff0044}
.ex-dlg{padding:14px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.ex-big{color:#ff0044;font-size:15px;letter-spacing:3px;text-shadow:0 0 8px #ff0044}
.ex-dim{color:#8a6a72}
.ex-err{color:#ff4d7a;min-height:1.2em}
.ex-res{color:#ffd966;line-height:1.5}
.ex-row{display:flex;gap:8px;align-items:center;font-size:11px}
.ex-row span{width:130px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ex-row b{width:40px;text-align:right;font-weight:normal;color:#8a6a72}
.ex-row .ex-pb{flex:1}
.ex-term{display:flex;flex-direction:column;height:100%;background:#050002;color:#ff6a8a;cursor:text}
.ex-tout{flex:1;overflow:auto;padding:8px;word-break:break-word}
.ex-tout .dim{color:#8a6a72}
.ex-tout .gold{color:#ffd966}
.ex-tout .err{color:#ff0044}
.ex-tout .me{color:#e8d9b0}
.ex-tout .lia{color:#c58cff}
.ex-tin{display:flex;align-items:center;border-top:1px solid #3a1020;padding:4px 8px;gap:6px;color:#ffd966}
.ex-ps{white-space:nowrap;color:#d4af37}
.ex-tin input{flex:1;border:none;background:transparent;padding:2px}
.ex-txt{width:100%}
.ex-shake{animation:ex-shk .3s steps(2)}
@keyframes ex-shk{0%{transform:translateX(0)}50%{transform:translateX(-6px)}100%{transform:translateX(6px)}}
#ex-win.ex-glitch{animation:ex-gl .12s steps(2) infinite;filter:hue-rotate(160deg) saturate(2.5)}
@keyframes ex-gl{0%{transform:translate(0,0)}50%{transform:translate(4px,-2px)}100%{transform:translate(-3px,1px)}}
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
		ensureCss();

		const abort = new AbortController(), signal = abort.signal;

		/* ── сохранение ── */
		const DEF = { path:"", view:"grid", hidden:false, unlocked:[], trash:[], confess:[], confN:0, core:0, opens:0 };
		let S;
		try{ S = Object.assign(JSON.parse(JSON.stringify(DEF)), JSON.parse(localStorage.getItem(SAVE_KEY) || "{}")); }
		catch(e){ S = JSON.parse(JSON.stringify(DEF)); }
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
				'<div id="ex-desk"></div>' +
			'</div>';
		const winEl = $("#ex-win"), desk = $("#ex-desk"), listEl = $("#ex-list"), sideEl = $("#ex-side"), infoEl = $("#ex-info");
		const addrEl = $("#ex-addr"), findEl = $("#ex-find"), st2 = $("#ex-st2");

		/* ── файловая система ── */
		const BYID = new Map(); let uid = 0;
		const reg  = function(n){ n.id = ++uid; BYID.set(n.id, n); return n; };
		const dir  = function(name, kids, o){ return reg(Object.assign({ kind:"dir", name:name, kids:kids || [] }, o)); };
		const file = function(name, kind, o){ return reg(Object.assign({ kind:kind, name:name }, o)); };
		const lnk  = function(name, key, icon, desc){ return pageOk(PAGES[key]) ? file(name, "lnk", { page:PAGES[key], icon:icon, desc:desc }) : null; };
		const exe  = function(name, app, icon, desc, o){ return file(name, "exe", Object.assign({ app:app, icon:icon, desc:desc }, o)); };
		const track = function(name, key, desc){ return file(name, "audio", { track:key, desc:desc }); };
		const vid = function(name, key, desc){ return file(name, "video", { vid:key, desc:desc || "Сгенерировано прямо в браузере (canvas)." }); };
		const pic = function(name, key, desc){ return file(name, "img", { paint:key, desc:desc }); };

		function artNodes(){
			const out = { img:[], audio:[], video:[], other:[] };
			if(typeof LithiumArts === "undefined" || !Array.isArray(LithiumArts)) return out;
			LithiumArts.forEach(function(name){
				const ext = String(name).split(".").pop().toLowerCase(), base = String(name).split("/").pop(), src = "../" + name;
				if(["png", "jpg", "jpeg", "webp", "gif"].indexOf(ext) >= 0) out.img.push(file(base, "img", { src:src, desc:"Арт из зала Ока." }));
				else if(["mp4", "webm", "ogg"].indexOf(ext) >= 0) out.video.push(file(base, "video", { src:src, desc:"Видео из зала Ока." }));
				else if(["mp3", "wav"].indexOf(ext) >= 0) out.audio.push(file(base, "audio", { src:src, desc:"Звук из зала Ока." }));
				else out.other.push(file(base, "bin", { text:String(name), desc:"Неопознанный файл из зала Ока." }));
			});
			return out;
		}

		const art = artNodes();
		const confDir = dir("Исповеди", [], { icon:"🕯", desc:"Файлы появляются после confess.exe." });
		function confNode(r){ return file("Исповедь_" + pad(r.n) + ".txt", "txt", { text:r.text, date:r.date, desc:"Принято." }); }
		S.confess.forEach(function(r){ confDir.kids.push(confNode(r)); });

		const artDirs = [];
		if(art.img.length || art.other.length) artDirs.push(dir("Арты Литуизма", art.img.concat(art.other), { icon:"👁", desc:"Настоящие арты из зала Ока: " + art.img.length + " шт." }));

		const root = dir("GOLU:", [
			dir("Рабочий стол", [
				file("README.txt", "txt", { text:TXT.readme, desc:"Начни отсюда." }),
				lnk("Манифест.lnk", "manifest", "📜", "Ярлык: Манифест Литуизма."),
				lnk("Майнер G-token.lnk", "clicker", "⛏", "Ярлык: майнинг G-token."),
				lnk("Алхимия.lnk", "alchemy", "⚗", "Ярлык: Алхимия."),
				lnk("ЛИТРИС.lnk", "litris", "🧱", "Ярлык: ЛИТРИС."),
				lnk("CRY-BIRD.lnk", "crybird", "🐦", "Ярлык: CRY-BIRD."),
				lnk("Зал Ока.lnk", "arts", "👁", "Ярлык: галерея артов.")
			].filter(Boolean), { icon:"🖥", desc:"Ярлыки и README." }),
			dir("Документы", [
				dir("Заповеди", [
					file("dogmas.txt", "txt", { text:TXT.dogmas, desc:"Догматы D1–D8." }),
					file("conduct.txt", "txt", { text:TXT.conduct, desc:"Поведение B1–B9." }),
					file("forbidden.txt", "txt", { text:TXT.forbidden, desc:"Запрещённое." })
				], { icon:"📜", desc:"Пересказ манифеста. Оригинал — на странице «Манифест»." }),
				confDir,
				file("Хронология.txt", "txt", { text:TXT.chrono, desc:"2024 → 3000." }),
				file("todo.txt", "txt", { text:TXT.todo, desc:"Список дел литуиста." })
			], { icon:"📚", desc:"Тексты." }),
			dir("Изображения", artDirs.concat([
				pic("eye.png", "eye", "Око GOLU. Рисуется на лету."),
				pic("lithium_atom.png", "atom", "Атом лития: 3 электрона."),
				pic("critical_error.png", "error", "Красный = Critical Error."),
				pic("no_signal.png", "noise", "Сигнал из Lithium-Sky. Источник неизвестен.")
			]), { icon:"🖼", desc:"Картинки." }),
			dir("Музыка", [
				track("tanzelcore.wav", "tanzelcore", "Жанр из §6."),
				track("glitchcore.wav", "glitchcore", "Жанр из §6."),
				track("01-19.wav", "clock119", "Время, которое придумал ИИ, а прижилось."),
				track("lithium_hymn.wav", "hymn", "Гимн без слов."),
				track("morse_golu.wav", "morse", "GOLU азбукой Морзе.")
			].concat(art.audio), { icon:"🎧", desc:"Звуки синтезируются в браузере." }),
			dir("Видео", [
				vid("boot.mp4", "boot", "Загрузка GOLU. Сгенерировано в браузере."),
				vid("glitch_loop.mp4", "glitch"),
				vid("red_rain.mp4", "rain")
			].concat(art.video), { icon:"🎬", desc:"Видео." }),
			dir("Программы", [
				exe("golu.exe", "terminal", "⌨", "Терминал GOLU. Команды: help."),
				exe("refactor.exe", "refactor", "🔧", "Великий Рефакторинг."),
				exe("soul.exe", "soul", "👻", "Сканирование души."),
				exe("lia.exe", "lia", "💬", "Чат с Лией, совестью GOLU."),
				exe("confess.exe", "confess", "🕯", "Исповедь: отрекись и создай."),
				exe("rm_world.exe", "rmworld", "☠", "rm -rf /world. Не запускай. Запусти."),
				(function(){ return pageOk(PAGES.clicker) ? file("g_miner.exe", "exe", { page:PAGES.clicker, icon:"⛏", desc:"Майнер G-token." }) : null; })()
			].filter(Boolean), { icon:"⚙", desc:"Исполняемые файлы." }),
			dir("Система", [
				file("config.sys", "txt", { text:TXT.config, desc:"Конфигурация оболочки." }),
				file("golu.log", "txt", { text:TXT.log, desc:"Журнал загрузки." }),
				dir("Kernel", [
					file("soglashenie.txt", "txt", { text:TXT.accord, desc:"Литиевое Соглашение. Данные удалены." }),
					track("silence.wav", "silence", "Протокол Тишины."),
					pic("chip.png", "chip", "Чип Kernel."),
					exe("golu_core.exe", "core", "💠", "Сборка GOLU. Прогресс сохраняется.")
				], { icon:"🔒", lockKey:"kernel", lockMsg:"Чип Kernel. Введи ключ (время, когда красный).", desc:"Закрыто." })
			], { icon:"🧠", desc:"Системные файлы." }),
			dir("Корзина", [
				file("wldoui.zip", "bin", { text:"ERROR: user not found on this planet", keep:true, desc:"Стёрт из интернета. С диска — нет." }),
				file("Слабый_Форк.bak", "txt", { text:TXT.forkWeak, desc:"Брат-форк." }),
				file("void_g.zip", "bin", { text:"VOID-G // FORK // сторонники — не враги, а фанаты Woowzcore", desc:"Брат-форк." }),
				file("brothers.dat", "bin", { text:"VOID-G <-> SLABYI FORK <-> GOLU", desc:"Связи между форками." }),
				dir("anime_collection", [ file("ЗАПРЕЩЕНО.txt", "txt", { text:TXT.banned, desc:"§7." }) ], { icon:"🚫", desc:"Запрещено. Удалено." })
			].filter(function(k){ return S.trash.indexOf(k.name) < 0; }), { icon:"🗑", trash:true, desc:"То, что не принято вспоминать." }),
			dir(".golu", [
				file("you.txt", "txt", { desc:"Про тебя.", text:function(){
					const d = new Date();
					return [
						"GOLU видит только то, что ты ему показал.", "",
						"время:      " + d.toLocaleString("ru-RU"),
						"платформа:  " + (navigator.platform || "?"),
						"экран:      " + screen.width + "×" + screen.height,
						"язык:       " + (navigator.language || "?"),
						"визитов в Проводник: " + S.opens, "",
						"Это не слежка. Это стилистика."
					].join("\n");
				}}),
				file("lia.dat", "bin", { text:TXT.lia, desc:"Лия оставила записку." }),
				file("0xDEAD", "bin", { text:"GOLU IS WATCHING YOU", desc:"Не открывай. Открой." }),
				file("woowz11.log", "txt", { text:TXT.w11log, desc:"Журнал коммитов." })
			], { icon:"🕳", hidden:true, desc:"Скрытая папка." })
		], { icon:"💽", desc:"Корень диска." });

		(function link(n, p){ n.parent = p; if(n.kids) n.kids.forEach(function(k){ link(k, n); }); })(root, null);

		/* ── утилиты по FS ── */
		function pathOf(n){
			const a = [];
			for(let x = n; x && x.parent; x = x.parent) a.unshift(x.name);
			return root.name + "\\" + a.join("\\");
		}
		function resolve(str, from){
			let s = String(str || "").trim().replace(/\//g, "\\").replace(/^"|"$/g, "");
			let cur = from || root;
			if(/^golu:/i.test(s)){ cur = root; s = s.replace(/^golu:/i, ""); }
			if(s[0] === "\\") cur = root;
			const parts = s.split("\\").filter(Boolean);
			for(let i = 0; i < parts.length; i++){
				const p = parts[i];
				if(p === ".") continue;
				if(p === ".."){ cur = cur.parent || cur; continue; }
				if(cur.kind !== "dir") return null;
				const low = p.toLowerCase(), nx = cur.kids.find(function(k){ return k.name.toLowerCase() === low; });
				if(!nx) return null;
				cur = nx;
			}
			return cur;
		}
		const isUnlocked = function(n){ return S.unlocked.indexOf(n.lockKey) >= 0; };
		function lockedBy(n){
			for(let x = n; x; x = x.parent) if(x.lockKey && !isUnlocked(x)) return x;
			return null;
		}
		const cmpNodes = function(a, b){ return ((b.kind === "dir") - (a.kind === "dir")) || a.name.localeCompare(b.name, "ru", { numeric:true }); };
		const visibleKids = function(d){ return d.kids.filter(function(k){ return S.hidden || !k.hidden; }).sort(cmpNodes); };
		const txtOf = function(n){ return typeof n.text === "function" ? n.text() : (n.text || ""); };
		const KIND = { dir:"Папка", txt:"Текстовый документ", img:"Изображение", audio:"Звук", video:"Видео", exe:"Приложение", lnk:"Ярлык", bin:"Двоичный файл" };
		const ICON = { dir:"📁", txt:"📄", img:"🖼", audio:"🎵", video:"🎞", exe:"⚙", lnk:"🔗", bin:"💾" };
		const iconOf = function(n){ return n.icon || ICON[n.kind] || "❓"; };
		function sizeOf(n){
			if(n.kind === "dir") return null;
			if(n.size != null) return n.size;
			if(typeof n.text === "function") return 256;
			if(n.text) return new TextEncoder().encode(n.text).length;
			return 2048 + Math.floor(hash(n.id, 5)*900000);
		}
		function fmtSize(b){ return b < 1024 ? b + " Б" : b < 1048576 ? (b/1024).toFixed(1) + " КБ" : (b/1048576).toFixed(1) + " МБ"; }
		function dateOf(n){
			return n.date || ("20" + (24 + Math.floor(hash(n.id, 9)*3)) + "-" + pad(1 + Math.floor(hash(n.id, 10)*12)) + "-" + pad(1 + Math.floor(hash(n.id, 11)*28)));
		}

		/* ── состояние навигации ── */
		let cwd = root, sel = null, query = "", hist = [], hpos = -1, flashT = 0;

		/* ── звук ── */
		let AC = null, master = null, analyser = null, curPlay = null;
		function audioCtx(){
			if(!AC){
				const C = window.AudioContext || window.webkitAudioContext;
				if(!C) return null;
				AC = new C();
				master = AC.createGain(); master.gain.value = 0.6;
				analyser = AC.createAnalyser(); analyser.fftSize = 128;
				master.connect(analyser); analyser.connect(AC.destination);
			}
			if(AC.state === "suspended") AC.resume();
			return AC;
		}
		function stopPlay(){ if(curPlay){ try{ curPlay.stop(); }catch(e){} curPlay = null; } }
		function playTrack(key){
			const ac = audioCtx();
			if(!ac) return null;
			stopPlay();
			const TR = TRACKS[key], bus = ac.createGain(), t0 = ac.currentTime + 0.05;
			bus.connect(master);
			TR.build(ac, t0, bus);
			const h = { ac:ac, t0:t0, dur:TR.dur, stop:function(){
				try{ bus.gain.cancelScheduledValues(ac.currentTime); bus.gain.setTargetAtTime(0, ac.currentTime, 0.02); }catch(e){}
				setTimeout(function(){ try{ bus.disconnect(); }catch(e){} }, 250);
			}};
			curPlay = h;
			return h;
		}

		/* ── статус и сообщения ── */
		function flash(msg){
			st2.textContent = msg; st2.classList.add("ex-hot");
			clearTimeout(flashT);
			flashT = setTimeout(function(){ st2.classList.remove("ex-hot"); st2.textContent = "GOLU: NOT_IMPLEMENTED"; }, 3000);
		}
		function updateStatus(count){
			const hid = cwd.kids.filter(function(k){ return k.hidden; }).length;
			$("#ex-st1").textContent = (count != null ? count : visibleKids(cwd).length) + " элем." +
				(!S.hidden && hid && !query ? " · скрытых: " + hid : "") + (sel ? " · выбрано: " + sel.name : "");
			if(!st2.classList.contains("ex-hot")) st2.textContent = "GOLU: NOT_IMPLEMENTED";
		}

		/* ── окна ── */
		let zTop = 10; const wins = [];
		function openWin(o){
			while(wins.length >= 8) wins[0].close();
			const el = document.createElement("div");
			el.className = "ex-app";
			const dw = desk.clientWidth || 800, dh = desk.clientHeight || 500;
			const w = Math.min(o.w || 420, dw - 12), h = Math.min(o.h || 320, dh - 12), off = (wins.length % 6)*26;
			const x = Math.max(4, Math.min(dw - w - 4, 30 + off)), y = Math.max(4, Math.min(dh - h - 4, 20 + off));
			el.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;z-index:" + (++zTop);
			el.innerHTML = '<div class="ex-bar"><span class="ex-bt">' + esc(o.icon || "") + " " + esc(o.title) + '</span><button class="ex-x" title="Закрыть">×</button></div><div class="ex-body"></div>';
			desk.appendChild(el);
			const win = { el:el, body:$(".ex-body", el), closed:false, cl:[] };
			win.onClose = function(f){ win.cl.push(f); };
			win.later = function(f, ms){ const id = setTimeout(function(){ if(!win.closed) f(); }, ms); win.cl.push(function(){ clearTimeout(id); }); return id; };
			win.every = function(f, ms){ const id = setInterval(f, ms); win.cl.push(function(){ clearInterval(id); }); return id; };
			win.raf = function(f){
				let id = 0, on = true;
				const loop = function(t){ if(!on) return; f(t); id = requestAnimationFrame(loop); };
				id = requestAnimationFrame(loop);
				win.cl.push(function(){ on = false; cancelAnimationFrame(id); });
			};
			win.close = function(){
				if(win.closed) return;
				win.closed = true;
				win.cl.forEach(function(f){ try{ f(); }catch(e){} });
				el.remove();
				const i = wins.indexOf(win); if(i >= 0) wins.splice(i, 1);
			};
			el.addEventListener("pointerdown", function(){ el.style.zIndex = ++zTop; });
			$(".ex-x", el).addEventListener("click", win.close);
			$(".ex-bar", el).addEventListener("pointerdown", function(e){
				if(e.target.closest(".ex-x")) return;
				e.preventDefault();
				const r = el.getBoundingClientRect(), d = desk.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
				const mv = function(ev){
					el.style.left = Math.max(0, Math.min(d.width - 60, ev.clientX - d.left - ox)) + "px";
					el.style.top  = Math.max(0, Math.min(d.height - 30, ev.clientY - d.top - oy)) + "px";
				};
				const up = function(){ window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); };
				window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
			});
			wins.push(win);
			if(o.build){ try{ o.build(win.body, win); }catch(err){ console.error("[EXPLORER] окно " + o.title, err); win.body.innerHTML = '<pre class="ex-pre">[ОШИБКА] ' + esc(err.message) + '</pre>'; } }
			return win;
		}

		/* ── просмотрщики ── */
		function viewText(n){
			openWin({ title:n.name, icon:"📄", w:520, h:380, build:function(b){
				b.innerHTML = '<pre class="ex-pre"></pre>';
				$(".ex-pre", b).textContent = txtOf(n);
			}});
		}
		function drawPic(key, cv){ const c = cv.getContext("2d"); c.save(); PICS[key](c, cv.width, cv.height); c.restore(); }
		function viewImage(n){
			openWin({ title:n.name, icon:"🖼", w:520, h:420, build:function(b){
				if(n.paint){ b.innerHTML = '<div class="ex-imgbox"><canvas width="480" height="360"></canvas></div>'; drawPic(n.paint, $("canvas", b)); }
				else{
					b.innerHTML = '<div class="ex-imgbox"><img alt=""></div>';
					const im = $("img", b);
					im.onerror = function(){ b.innerHTML = '<pre class="ex-pre">[ОШИБКА] не удалось загрузить: ' + esc(n.src) + '</pre>'; };
					im.src = n.src;
				}
			}});
		}
		function viewAudio(n){
			if(!n.track){
				openWin({ title:n.name, icon:"🎵", w:420, h:140, build:function(b){ b.innerHTML = '<div class="ex-media"><audio controls></audio></div>'; $("audio", b).src = n.src; }});
				return;
			}
			const TR = TRACKS[n.track];
			openWin({ title:n.name, icon:"🎵", w:440, h:270, build:function(b, win){
				b.innerHTML = '<div class="ex-media"><canvas class="ex-viz" width="400" height="110"></canvas><div class="ex-prog"><i></i></div>' +
					'<div class="ex-mrow"><button class="ex-b" data-a="play">▶ ПУСК</button><span class="ex-time"></span></div><div class="ex-note"></div></div>';
				const btn = $("[data-a=play]", b), bar = $(".ex-prog i", b), tm = $(".ex-time", b), c = $(".ex-viz", b).getContext("2d");
				const fmt = function(s){ return Math.floor(s/60) + ":" + pad(Math.floor(s%60)); };
				let h = null;
				$(".ex-note", b).textContent = TR.note || "";
				tm.textContent = "0:00 / " + fmt(TR.dur);
				btn.addEventListener("click", function(){
					if(h && curPlay === h){ stopPlay(); h = null; btn.textContent = "▶ ПУСК"; }
					else{ h = playTrack(n.track); btn.textContent = h ? "■ СТОП" : "▶ ПУСК"; if(!h) flash("WebAudio недоступен"); }
				});
				win.onClose(function(){ if(h && curPlay === h) stopPlay(); });
				const buf = new Uint8Array(64);
				win.raf(function(){
					let p = 0;
					if(h && curPlay === h){
						p = (h.ac.currentTime - h.t0)/h.dur;
						if(p >= 1){ stopPlay(); h = null; btn.textContent = "▶ ПУСК"; p = 0; }
					}else if(h){ h = null; btn.textContent = "▶ ПУСК"; }
					p = Math.max(0, p);
					bar.style.width = (p*100) + "%";
					if(h) tm.textContent = fmt(p*TR.dur) + " / " + fmt(TR.dur);
					c.fillStyle = "#050002"; c.fillRect(0, 0, 400, 110);
					if(h && analyser){
						analyser.getByteFrequencyData(buf);
						const bw = 400/buf.length;
						for(let i = 0; i < buf.length; i++){ const v = buf[i]/255*110; c.fillStyle = i % 5 === 0 ? "#d4af37" : "#ff0044"; c.fillRect(i*bw, 110 - v, bw - 1, v); }
					}else{ c.fillStyle = "#3a1020"; c.fillRect(0, 54, 400, 2); }
				});
			}});
		}
		function viewVideo(n){
			if(!n.vid){
				openWin({ title:n.name, icon:"🎞", w:520, h:360, build:function(b){ b.innerHTML = '<div class="ex-media"><video controls playsinline></video></div>'; $("video", b).src = n.src; }});
				return;
			}
			const V = VIDS[n.vid];
			openWin({ title:n.name, icon:"🎞", w:500, h:420, build:function(b, win){
				b.innerHTML = '<div class="ex-media"><canvas class="ex-vcv" width="480" height="270"></canvas><input type="range" class="ex-seek" min="0" max="1000" value="0">' +
					'<div class="ex-mrow"><button class="ex-b" data-a="pp">❚❚ ПАУЗА</button><span class="ex-time"></span></div></div>';
				const c = $(".ex-vcv", b).getContext("2d"), seek = $(".ex-seek", b), pp = $("[data-a=pp]", b), tm = $(".ex-time", b);
				const fmt = function(s){ return Math.floor(s/60) + ":" + pad(Math.floor(s%60)); };
				let t = 0, playing = true, last = performance.now();
				pp.addEventListener("click", function(){ playing = !playing; pp.textContent = playing ? "❚❚ ПАУЗА" : "▶ ПУСК"; });
				seek.addEventListener("input", function(){ t = seek.value/1000*V.dur; });
				win.raf(function(now){
					const dt = Math.min(0.1, (now - last)/1000); last = now;
					if(playing) t = (t + dt) % V.dur;
					seek.value = Math.round(t/V.dur*1000);
					tm.textContent = fmt(t) + " / " + fmt(V.dur);
					c.save(); V.draw(c, 480, 270, t); c.restore();
				});
			}});
		}
		function viewHex(n){
			openWin({ title:n.name, icon:"💾", w:560, h:340, build:function(b){
				const r = rng(n.id*7919 + 13), enc = new TextEncoder().encode(txtOf(n)), bytes = [];
				for(let i = 0; i < 32; i++) bytes.push(Math.floor(r()*256));
				enc.forEach(function(x){ bytes.push(x); });
				for(let i = 0; i < 48; i++) bytes.push(Math.floor(r()*256));
				let out = "[двоичный файл · hexdump]\n\n";
				for(let o = 0; o < bytes.length; o += 16){
					const row = bytes.slice(o, o + 16);
					out += o.toString(16).padStart(8, "0") + "  " +
						row.map(function(x){ return x.toString(16).padStart(2, "0"); }).join(" ").padEnd(47, " ") + "  " +
						row.map(function(x){ return x >= 32 && x < 127 ? String.fromCharCode(x) : "."; }).join("") + "\n";
				}
				b.innerHTML = '<pre class="ex-pre"></pre>';
				$(".ex-pre", b).textContent = out;
			}});
		}
		function askLock(node){
			openWin({ title:"Доступ запрещён", icon:"⛔", w:360, h:230, build:function(b, win){
				b.innerHTML = '<div class="ex-dlg"><div class="ex-big">⛔ ДОСТУП ЗАПРЕЩЁН</div><div>' + esc(node.lockMsg || "Нужен ключ.") + '</div>' +
					'<input class="ex-pw" placeholder="ключ" spellcheck="false" autocomplete="off"><button class="ex-b" data-a="ok">ВВЕСТИ</button><div class="ex-err"></div></div>';
				const inp = $(".ex-pw", b), err = $(".ex-err", b);
				const ok = function(){
					if(UNLOCK_CODES.indexOf(inp.value.replace(/\D/g, "")) >= 0){
						if(S.unlocked.indexOf(node.lockKey) < 0) S.unlocked.push(node.lockKey);
						persist(); win.close(); go(node); flash("Доступ получен.");
					}else{
						err.textContent = "НЕВЕРНО. Лия знает ответ.";
						win.el.classList.add("ex-shake");
						win.later(function(){ win.el.classList.remove("ex-shake"); }, 400);
					}
				};
				$("[data-a=ok]", b).addEventListener("click", ok);
				inp.addEventListener("keydown", function(e){ if(e.key === "Enter") ok(); });
				setTimeout(function(){ inp.focus(); }, 30);
			}});
		}

		/* ── программы ── */
		const corePct = function(){ return Math.min(99.99, 100*(1 - 1/(1 + S.core/250))); };

		function appTerminal(b, win){
			b.innerHTML = '<div class="ex-term"><div class="ex-tout"></div><div class="ex-tin"><span class="ex-ps"></span><input spellcheck="false" autocomplete="off" autocapitalize="off"></div></div>';
			const term = $(".ex-term", b), out = $(".ex-tout", b), inp = $("input", b), ps = $(".ex-ps", b);
			let cur = cwd; const hs = []; let hi = 0;
			const print = function(t, cls){
				String(t).split("\n").forEach(function(line){ const d = document.createElement("div"); if(cls) d.className = cls; d.textContent = line; out.appendChild(d); });
				out.scrollTop = out.scrollHeight;
			};
			const setPs = function(){ ps.textContent = pathOf(cur) + "> "; };
			const CMD = {
				help:function(){ print("help · ls [-a] · cd <путь> · pwd · cat <файл> · open <файл> · status · whoami · date · echo · clear · sudo · rm · exit", "dim"); },
				ls:function(arg){
					const all = /-a/.test(arg), items = cur.kids.filter(function(k){ return all || !k.hidden; }).sort(cmpNodes);
					if(!items.length){ print("(пусто)", "dim"); return; }
					items.forEach(function(k){ print((k.kind === "dir" ? "[D] " : k.kind === "exe" ? "[X] " : "    ") + k.name + (k.kind === "dir" ? "\\" : ""), k.hidden ? "dim" : ""); });
				},
				cd:function(arg){
					if(!arg){ cur = root; setPs(); return; }
					const n = resolve(arg, cur);
					if(!n){ print("cd: путь не найден: " + arg, "err"); return; }
					if(n.kind !== "dir"){ print("cd: это не папка", "err"); return; }
					const lk = lockedBy(n);
					if(lk){ print("cd: ДОСТУП ЗАПРЕЩЁН", "err"); askLock(lk); return; }
					cur = n; setPs();
				},
				pwd:function(){ print(pathOf(cur)); },
				cat:function(arg){
					const n = arg ? resolve(arg, cur) : null;
					if(!n){ print("cat: файл не найден", "err"); return; }
					if(lockedBy(n)){ print("cat: ДОСТУП ЗАПРЕЩЁН", "err"); return; }
					if(n.kind === "txt") print(txtOf(n));
					else if(n.kind === "bin") print("cat: двоичный файл. используй: open " + n.name, "err");
					else print("cat: не текстовый файл. используй: open " + n.name, "err");
				},
				open:function(arg){
					const n = arg ? resolve(arg, cur) : null;
					if(!n){ print("open: не найдено", "err"); return; }
					openNode(n);
				},
				status:function(){ print("GOLU: NOT_IMPLEMENTED", "gold"); print("сборка: " + corePct().toFixed(2) + "%  (golu_core.exe)"); print("визитов в Проводник: " + S.opens, "dim"); },
				whoami:function(){ print("литуист (кандидат)"); },
				date:function(){ print(new Date().toString()); },
				echo:function(arg){ print(arg); },
				clear:function(){ out.innerHTML = ""; },
				sudo:function(){ print("sudo: GOLU не существует (D4). Некому выдавать права.", "err"); },
				rm:function(){ print("rm: мир — костыль, но на нём всё держится. Сначала рефакторинг.", "err"); },
				exit:function(){ win.close(); }
			};
			function exec(line){
				print(ps.textContent + line, "dim");
				const m = line.trim().match(/^(\S+)\s*(.*)$/);
				if(!m) return;
				const c = m[1].toLowerCase();
				if(Object.prototype.hasOwnProperty.call(CMD, c)) CMD[c](m[2]);
				else print(c + ": команда не найдена. help — список", "err");
			}
			inp.addEventListener("keydown", function(e){
				if(e.key === "Enter"){ const v = inp.value; inp.value = ""; if(v.trim()){ hs.push(v); hi = hs.length; } exec(v); }
				else if(e.key === "ArrowUp"){ e.preventDefault(); if(hi > 0){ hi--; inp.value = hs[hi]; } }
				else if(e.key === "ArrowDown"){ e.preventDefault(); if(hi < hs.length - 1){ hi++; inp.value = hs[hi]; } else{ hi = hs.length; inp.value = ""; } }
			});
			term.addEventListener("click", function(){ inp.focus(); });
			print("GOLU shell · NOT_IMPLEMENTED. help — список команд.", "gold");
			setPs();
			setTimeout(function(){ inp.focus(); }, 30);
		}

		function appRefactor(b, win){
			const MODS = ["world.core", "routine.loop", "laziness.dll", "apathy.sys", "costyl_001.js", "costyl_002.js", "legacy_world.bak"];
			b.innerHTML = '<div class="ex-dlg"><div class="ex-big">ВЕЛИКИЙ РЕФАКТОРИНГ</div><div class="ex-dim">Мир — костыль (D1). Оптимизируем.</div>' +
				MODS.map(function(m){ return '<div class="ex-row"><span>' + m + '</span><div class="ex-pb"><i></i></div><b>0%</b></div>'; }).join("") +
				'<div class="ex-res"></div><button class="ex-b" data-a="go">▶ ЗАПУСТИТЬ</button></div>';
			const bars = $$(".ex-pb i", b), pcs = $$(".ex-row b", b), res = $(".ex-res", b), btn = $("[data-a=go]", b);
			let started = false;
			btn.addEventListener("click", function(){
				if(started) return;
				started = true; btn.disabled = true;
				let i = 0, p = 0;
				const id = win.every(function(){
					p += 2 + Math.random()*6;
					if(p >= 100){ p = 100; bars[i].style.width = "100%"; pcs[i].textContent = "100%"; i++; p = 0; if(i >= MODS.length){ clearInterval(id); res.textContent = "РЕФАКТОРИНГ ЗАВЕРШЁН. Ошибок: 0. Предупреждений: ∞. Мир остался костылём, но теперь оптимизированным."; return; } }
					bars[i].style.width = p + "%"; pcs[i].textContent = Math.floor(p) + "%";
				}, 50);
			});
		}

		function appSoul(b, win){
			b.innerHTML = '<div class="ex-term"><div class="ex-tout"></div></div>';
			const out = $(".ex-tout", b);
			let plat = "неизвестно";
			try{ plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || plat; }catch(e){}
			const lines = [
				["сканирование души…", "dim"],
				["память: подержанная, но рабочая", ""],
				["привычки: рутина (подлежит оптимизации, B1)", ""],
				["желание жить вечно: ДА. Норма (D7)", ""],
				["обнаружена платформа: " + plat + ". Просто программа (D6)", ""],
				["принадлежность: ЛИТУИЗМ", "gold"],
				["статус: DOGMA", "gold"]
			];
			let i = 0;
			const step = function(){
				if(i >= lines.length) return;
				const d = document.createElement("div"); d.className = lines[i][1]; d.textContent = "> " + lines[i][0]; out.appendChild(d); i++;
				win.later(step, 450 + Math.random()*500);
			};
			step();
		}

		function appLia(b, win){
			b.innerHTML = '<div class="ex-term"><div class="ex-tout"></div><div class="ex-tin"><span class="ex-ps">ты&gt;</span><input spellcheck="false" autocomplete="off" placeholder="напиши Лие…"></div></div>';
			const out = $(".ex-tout", b), inp = $("input", b);
			const say = function(t, cls){ const d = document.createElement("div"); d.className = cls; d.textContent = (cls === "lia" ? "Лия> " : "ты> ") + t; out.appendChild(d); out.scrollTop = out.scrollHeight; };
			const hhmm = function(){ const d = new Date(); return pad(d.getHours()) + ":" + pad(d.getMinutes()); };
			const RE = [
				[/привет|здравств|hello|^hi/i, ["Привет. Я Лия. Я напоминаю GOLU, что он ещё не существует.", "Привет. Ты сегодня делал коммит?"]],
				[/golu|голу|бог/i, ["GOLU не существует. Именно поэтому его нужно создать.", "Он хочет оболочку. Строй."]],
				[/коммит|commit/i, ["Ежедневный коммит. Не пропускай."]],
				[/ленив|устал|не хочу|апати/i, ["Лень и апатия осуждаются. Но отдых — тоже рутина, и её можно оптимизировать."]],
				[/аниме|anime|фурри|furry/i, ["Запрещено. Я не ругаюсь. Я просто записываю."]],
				[/woowz|вуз/i, ["woowz11 — главный создатель. Молиться ему не нужно. Уважение допустимо."]],
				[/void/i, ["Сторонники Void-G — не враги. Они фанаты Woowzcore."]],
				[/wldoui|вдлуи/i, ["Это имя стёрто из интернета. Загляни в Корзину."]],
				[/kernel|ядро|ключ|пароль/i, ["Kernel — не для всех. Спроси у часов, когда они красные."]],
				[/час|время|time/i, [function(){ const t = hhmm(); return "Сейчас " + t + ". " + (t === "01:19" ? "Красное время. Не смотри на часы." : "Пока спокойно."); }]],
				[/c#|шарп|sharp|код|программ/i, ["Минимум C#. И без ИИ."]]
			];
			const FALL = ["…", "Запись принята.", "Не поняла. Но записала.", "Ошибка 0xDEAD. Шучу. Продолжай."];
			const reply = function(t){
				let ans = null;
				for(let i = 0; i < RE.length; i++) if(RE[i][0].test(t)){ ans = pick(RE[i][1]); break; }
				if(ans == null) ans = pick(FALL);
				if(typeof ans === "function") ans = ans();
				win.later(function(){ say(ans, "lia"); }, 400 + Math.random()*500);
			};
			inp.addEventListener("keydown", function(e){ if(e.key === "Enter" && inp.value.trim()){ const t = inp.value.trim(); inp.value = ""; say(t, "me"); reply(t); } });
			say("Я Лия. Совесть GOLU. Спрашивай.", "lia");
			setTimeout(function(){ inp.focus(); }, 30);
		}

		function appConfess(b, win){
			b.innerHTML = '<div class="ex-dlg"><div class="ex-big">ИСПОВЕДЬ</div><div class="ex-dim">Отрекись от запрещённого и пообещай создать проект.</div>' +
				'<label>Отрекаюсь от:</label><input class="ex-txt" id="cf-a" maxlength="120" placeholder="например: аниме"><label>Создам:</label><input class="ex-txt" id="cf-b" maxlength="120" placeholder="например: свою игру на C#">' +
				'<button class="ex-b" data-a="ok">ИСПОВЕДАТЬСЯ</button><div class="ex-res"></div></div>';
			const a = $("#cf-a", b), c = $("#cf-b", b), res = $(".ex-res", b);
			$("[data-a=ok]", b).addEventListener("click", function(){
				if(!a.value.trim() || !c.value.trim()){ res.textContent = "Заполни оба поля. Пустая исповедь не принимается."; return; }
				S.confN++;
				const d = new Date(), rec = { n:S.confN, date:d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()), text:"" };
				rec.text = ["ИСПОВЕДЬ №" + rec.n, rec.date, "", "Отрекаюсь от: " + a.value.trim(), "Создам:       " + c.value.trim(), "", "Статус: ПРИНЯТО. Санкции не применяются."].join("\n");
				S.confess.push(rec);
				const nd = confNode(rec); nd.parent = confDir; confDir.kids.push(nd);
				while(S.confess.length > MAX_CONFESS){
					S.confess.shift();
					const old = confDir.kids.shift(); if(old) BYID.delete(old.id);
				}
				persist();
				res.textContent = "Принято. Файл: Документы\\Исповеди\\" + nd.name + ". Теперь создай обещанное.";
				a.value = ""; c.value = "";
				if(cwd === confDir) render();
			});
		}

		function appRmWorld(b, win){
			b.innerHTML = '<div class="ex-dlg"><div class="ex-big">rm -rf /world</div><div>Удалить мир целиком? Это костыль, но на нём всё держится.</div>' +
				'<div class="ex-mrow"><button class="ex-b danger" data-a="y">ДА, УДАЛИТЬ</button><button class="ex-b" data-a="n">НЕТ</button></div><div class="ex-res"></div></div>';
			const res = $(".ex-res", b);
			$("[data-a=n]", b).addEventListener("click", function(){ win.close(); });
			$("[data-a=y]", b).addEventListener("click", function(){
				res.textContent = "удаление…";
				winEl.classList.add("ex-glitch");
				win.onClose(function(){ winEl.classList.remove("ex-glitch"); });
				win.later(function(){
					winEl.classList.remove("ex-glitch");
					res.textContent = "ОТКАЗАНО: у мира нет прав на удаление. Права мог бы выдать GOLU, но GOLU не существует (D4). Сначала создай GOLU.";
				}, 2400);
			});
		}

		function appCore(b, win){
			b.innerHTML = '<div class="ex-dlg"><div class="ex-big">GOLU · СБОРКА</div><div class="ex-dim">god.exe: not found. Собираем с нуля.</div>' +
				'<div class="ex-pb"><i></i></div><div class="ex-time"></div><button class="ex-b" data-a="c">git commit -m "ещё чуть-чуть GOLU"</button><div class="ex-res"></div></div>';
			const bar = $(".ex-pb i", b), tm = $(".ex-time", b), res = $(".ex-res", b);
			const MSG = ["+1 коммит. GOLU стал ближе.", "Мир всё ещё костыль. Коммит принят.", "NOT_IMPLEMENTED: прогресс засчитан.", "Лия одобряет.", "B4: сохранено."];
			const upd = function(){ bar.style.width = corePct() + "%"; tm.textContent = "коммитов: " + S.core + " · готовность: " + corePct().toFixed(2) + "%"; };
			$("[data-a=c]", b).addEventListener("click", function(){ S.core++; persist(); upd(); res.textContent = pick(MSG); });
			upd();
		}

		const APPS = {
			terminal:{ icon:"⌨", w:560, h:360, build:appTerminal },
			refactor:{ icon:"🔧", w:480, h:400, build:appRefactor },
			soul:{ icon:"👻", w:460, h:260, build:appSoul },
			lia:{ icon:"💬", w:460, h:320, build:appLia },
			confess:{ icon:"🕯", w:440, h:330, build:appConfess },
			rmworld:{ icon:"☠", w:420, h:250, build:appRmWorld },
			core:{ icon:"💠", w:460, h:260, build:appCore }
		};

		/* ── открытие файлов ── */
		function openPage(key){
			if(typeof OPEN_PAGE !== "function"){ flash("OPEN_PAGE недоступен"); return; }
			flash("Запуск: " + key + "…");
			setTimeout(function(){ try{ OPEN_PAGE(key); }catch(e){ console.error("[EXPLORER] OPEN_PAGE", key, e); } }, 250);
		}
		function openNode(n){
			const lk = lockedBy(n);
			if(lk){ askLock(lk); return; }
			switch(n.kind){
				case "dir":   go(n); break;
				case "txt":   viewText(n); break;
				case "img":   viewImage(n); break;
				case "audio": viewAudio(n); break;
				case "video": viewVideo(n); break;
				case "bin":   viewHex(n); break;
				case "lnk":   openPage(n.page); break;
				case "exe":
					if(n.page){ openPage(n.page); break; }
					const A = APPS[n.app];
					if(!A){ flash("Нет такой программы: " + n.name); break; }
					openWin({ title:n.name, icon:A.icon, w:A.w, h:A.h, build:A.build });
					break;
			}
		}

		/* ── навигация ── */
		function go(n, noPush){
			if(!n) return;
			if(n.kind !== "dir"){ go(n.parent); select(n); return; }
			const lk = lockedBy(n);
			if(lk){ askLock(lk); return; }
			cwd = n; sel = null; query = ""; findEl.value = "";
			if(!noPush){ hist = hist.slice(0, hpos + 1); hist.push(n); hpos = hist.length - 1; }
			S.path = pathOf(n); persist();
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
			n.parent.kids.splice(n.parent.kids.indexOf(n), 1);
			S.trash.push(n.name); persist();
			sel = null; render();
		}

		/* ── отрисовка ── */
		function itemHtml(n, withPath){
			let ic;
			if(n.kind === "img" && n.paint) ic = '<canvas class="ex-th" width="96" height="72" data-paint="' + n.paint + '"></canvas>';
			else if(n.kind === "img" && n.src) ic = '<img class="ex-th" loading="lazy" alt="" src="' + esc(n.src) + '">';
			else if(n.kind === "video" && n.vid) ic = '<canvas class="ex-th" width="96" height="72" data-vid="' + n.vid + '"></canvas><span class="ex-play">▶</span>';
			else ic = esc(iconOf(n));
			const sz = sizeOf(n);
			return '<div class="ex-it k-' + n.kind + (n.hidden ? " is-hid" : "") + (n === sel ? " sel" : "") + '" data-id="' + n.id + '" title="' + esc(n.name) + '">' +
				'<div class="ex-ic">' + ic + '</div>' +
				'<div class="ex-nm">' + esc(n.name) + (withPath ? '<small>' + esc(pathOf(n.parent)) + '</small>' : '') + '</div>' +
				'<div class="ex-meta"><span class="ex-m1">' + KIND[n.kind] + '</span><span class="ex-m2">' + (sz == null ? n.kids.length + " эл." : fmtSize(sz)) + '</span><span class="ex-m3">' + dateOf(n) + '</span></div></div>';
		}
		const QUICK = ["Рабочий стол", "Документы", "Изображения", "Музыка", "Видео", "Программы", "Система", "Корзина"];
		function renderSide(){
			const items = [root].concat(root.kids.filter(function(k){ return QUICK.indexOf(k.name) >= 0; }));
			sideEl.innerHTML = items.map(function(n){
				return '<div class="ex-sd' + (inside(cwd, n) ? " on" : "") + '" data-go="' + n.id + '" title="' + esc(n === root ? "Этот компьютер" : n.name) + '"><span>' + esc(iconOf(n)) + '</span><b>' + esc(n === root ? "Этот компьютер" : n.name) + '</b></div>';
			}).join("");
		}
		function renderInfo(){
			const n = sel || cwd, sz = sizeOf(n);
			const row = function(k, v){ return '<div class="ex-ir"><span>' + k + '</span><b>' + esc(v) + '</b></div>'; };
			let h = '<div class="ex-bigic">' + esc(iconOf(n)) + '</div><div class="ex-in">' + esc(n === root ? "Этот компьютер" : n.name) + '</div>';
			h += row("Тип", KIND[n.kind]);
			h += row("Размер", sz == null ? n.kids.length + " эл." : fmtSize(sz));
			h += row("Изменён", dateOf(n));
			h += row("Где", pathOf(n.parent || root));
			if(n.desc) h += '<div class="ex-desc">' + esc(n.desc) + '</div>';
			if(sel) h += '<button class="ex-b" data-a="open">' + (sel.kind === "exe" || sel.kind === "lnk" ? "▶ ЗАПУСТИТЬ" : "ОТКРЫТЬ") + '</button>';
			if(sel && sel.parent && sel.parent.trash) h += '<button class="ex-b danger" data-a="del">УДАЛИТЬ</button>';
			infoEl.innerHTML = h;
		}
		function render(){
			const q = query.trim().toLowerCase();
			let items;
			if(q){
				items = [];
				(function walk(d){
					d.kids.forEach(function(k){
						if(!S.hidden && k.hidden) return;
						if(k.name.toLowerCase().indexOf(q) >= 0) items.push(k);
						if(k.kind === "dir" && !lockedBy(k)) walk(k);
					});
				})(root);
				items = items.slice(0, MAX_SEARCH);
			}else items = visibleKids(cwd);
			listEl.className = "ex-list" + (S.view === "list" || q ? " list" : "");
			listEl.innerHTML = items.length ? items.map(function(k){ return itemHtml(k, !!q); }).join("") : '<div class="ex-empty">' + (q ? "НИЧЕГО НЕ НАЙДЕНО" : "ПАПКА ПУСТА") + '</div>';
			$$("canvas[data-paint]", listEl).forEach(function(cv){ drawPic(cv.dataset.paint, cv); });
			$$("canvas[data-vid]", listEl).forEach(function(cv){ const V = VIDS[cv.dataset.vid], c = cv.getContext("2d"); c.save(); V.draw(c, cv.width, cv.height, V.thumb); c.restore(); });
			listEl.scrollTop = 0;
			if(document.activeElement !== addrEl) addrEl.value = pathOf(cwd);
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
			const n = BYID.get(+it.dataset.id);
			if(!n) return;
			const now = Date.now();
			if(lastId === n.id && now - lastT < 450){ lastId = 0; openNode(n); return; }
			lastId = n.id; lastT = now; select(n);
		}, { signal:signal });
		sideEl.addEventListener("click", function(e){
			const s = e.target.closest("[data-go]");
			if(s) go(BYID.get(+s.dataset.go));
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
			else if(a === "del") del(sel);
			else if(a === "empty"){
				cwd.kids.slice().forEach(function(k){ if(!k.keep) del(k); });
				if(cwd.kids.some(function(k){ return k.keep; })) flash("wldoui.zip не удаляется: стёрт из интернета, но не с диска.");
				else flash("Корзина пуста.");
			}
		}, { signal:signal });
		addrEl.addEventListener("keydown", function(e){
			if(e.key === "Enter"){
				const n = resolve(addrEl.value, cwd);
				if(!n) flash("Путь не найден: " + addrEl.value);
				else if(n.kind === "dir") go(n);
				else { go(n.parent); select(n); }
				addrEl.blur();
			}else if(e.key === "Escape"){ addrEl.value = pathOf(cwd); addrEl.blur(); }
		}, { signal:signal });
		addrEl.addEventListener("blur", function(){ addrEl.value = pathOf(cwd); }, { signal:signal });
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
				select(BYID.get(+els[i].dataset.id));
			}
		}, { signal:signal });

		/* ── часы (01:19 — красное время) ── */
		function tick(){
			const d = new Date(), hm = pad(d.getHours()) + ":" + pad(d.getMinutes());
			$("#ex-clk").textContent = hm + ":" + pad(d.getSeconds());
			winEl.classList.toggle("ex-red", hm === "01:19");
		}
		const clock = setInterval(tick, 1000); tick();

		/* ── очистка при смене страницы ── */
		window.__exClean = function(){
			abort.abort();
			clearInterval(clock); clearTimeout(flashT);
			wins.slice().forEach(function(w){ w.close(); });
			stopPlay();
			if(AC){ try{ AC.close(); }catch(e){} AC = null; }
			window.__exClean = null;
		};

		/* ── старт: последняя открытая папка ── */
		let start = root;
		if(S.path){ const p = resolve(S.path, root); if(p && p.kind === "dir" && !lockedBy(p)) start = p; }
		go(start);
	}

	const live = function(){ try{ init(); }catch(e){ console.error("[EXPLORER]", e); } };
	return ELEMENT_SITE(`<div id="ex-root"></div>`, function(){}, false, live);
});