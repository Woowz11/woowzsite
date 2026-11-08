/* ═══════════════════════════════════════════════════════════
   GOLU_FS.js — ядро файловой системы GOLU_OS (публичный API)
   Подключать ПЕРВЫМ обычным <script>. Это не страница.
   ═══════════════════════════════════════════════════════════ */
(function(){
	if(window.GOLU_FS && window.GOLU_FS.__v) return;

	const LS_UNLOCK = "golu_fs_unlock", LS_ERASED = "golu_fs_erased";
	const $ = (s, r) => (r || document).querySelector(s);
	const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
	const pad = n => String(n).padStart(2, "0");
	const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
	const lsGet = (k, d) => { try{ return JSON.parse(localStorage.getItem(k)) || d; }catch(e){ return d; } };
	const lsSet = (k, v) => { try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} };
	function rng(seed){
		let a = seed >>> 0;
		return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
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

	/* ═════════ ДЕРЕВО ═════════ */
	let uid = 0;
	const root = { id:0, kind:"dir", name:"GOLU:", kids:[], parent:null, icon:"💽", desc:"Корень диска." };
	const BYID = new Map([[0, root]]);
	const parts = p => String(p == null ? "" : p).replace(/\\/g, "/").replace(/^golu:/i, "").split("/").map(s => s.trim()).filter(Boolean);
	const same = (a, b) => a.toLowerCase() === b.toLowerCase();
	const child = (d, name) => d.kids.find(k => same(k.name, name));
	const erased = new Set(lsGet(LS_ERASED, []));
	function isErased(ps){
		for(let i = 1; i <= ps.length; i++) if(erased.has(ps.slice(0, i).join("/").toLowerCase())) return true;
		return false;
	}
	const subs = []; let chT = 0;
	function emit(){
		clearTimeout(chT);
		chT = setTimeout(() => subs.slice().forEach(f => { try{ f(); }catch(e){ console.error("[GOLU_FS] onChange", e); } }), 30);
	}
	function ensureDir(ps){
		let cur = root;
		for(let i = 0; i < ps.length; i++){
			if(isErased(ps.slice(0, i + 1))) return null;
			let nx = child(cur, ps[i]);
			if(!nx){ nx = { id:++uid, kind:"dir", name:ps[i], kids:[], parent:cur }; BYID.set(nx.id, nx); cur.kids.push(nx); emit(); }
			else if(nx.kind !== "dir"){ console.warn("[GOLU_FS] «" + ps[i] + "» не папка"); return null; }
			cur = nx;
		}
		return cur;
	}
	function put(path, node){
		const ps = parts(path);
		if(!ps.length){ console.warn("[GOLU_FS] пустой путь"); return null; }
		const name = ps.pop();
		if(isErased(ps.concat(name))) return null;
		const d = ensureDir(ps);
		if(!d) return null;
		const old = child(d, name);
		if(old){ d.kids.splice(d.kids.indexOf(old), 1); BYID.delete(old.id); old.parent = null; }
		node.id = ++uid; node.name = name; node.parent = d;
		BYID.set(node.id, node); d.kids.push(node);
		emit();
		return node;
	}
	function resolve(str, from){
		let s = String(str == null ? "" : str).trim().replace(/\\/g, "/").replace(/^"|"$/g, "");
		let cur = from || root;
		if(/^golu:/i.test(s)){ cur = root; s = s.replace(/^golu:/i, ""); }
		if(s[0] === "/") cur = root;
		const ps = s.split("/").filter(Boolean);
		for(let i = 0; i < ps.length; i++){
			const p = ps[i];
			if(p === ".") continue;
			if(p === ".."){ cur = cur.parent || cur; continue; }
			if(cur.kind !== "dir") return null;
			cur = child(cur, p);
			if(!cur) return null;
		}
		return cur;
	}
	const node = x => (x && typeof x === "object") ? x : resolve(x, root);
	function pathOf(n){
		const a = [];
		for(let x = n; x && x.parent; x = x.parent) a.unshift(x.name);
		return a.join("/");
	}
	function attached(n){ for(let x = n; x; x = x.parent) if(x === root) return true; return false; }
	const visible = k => !k.needPage || pageOk(k.needPage);
	const kids = (d, showHidden) => d.kids.filter(k => visible(k) && (showHidden || !k.hidden));
	const cmp = (a, b) => ((b.kind === "dir") - (a.kind === "dir")) || a.name.localeCompare(b.name, "ru", { numeric:true });
	const extOf = name => (String(name).split(".").pop() || "").toLowerCase();

	/* ═════════ ЗАМКИ ═════════ */
	const unl = new Set(lsGet(LS_UNLOCK, []));
	const lkey = d => pathOf(d).toLowerCase();
	function lockOf(x){
		for(let d = node(x); d; d = d.parent) if(d.lock && !unl.has(lkey(d))) return d;
		return null;
	}
	function unlock(x, code){
		const d = node(x);
		if(!d) return false;
		const l = lockOf(d);
		if(!l) return true;
		const v = String(code == null ? "" : code).trim().toLowerCase(), dg = v.replace(/\D/g, "");
		const codes = [].concat(l.lock.code != null ? l.lock.code : []).map(c => String(c).toLowerCase());
		if(codes.some(c => c === v || (dg && c === dg))){ unl.add(lkey(l)); lsSet(LS_UNLOCK, Array.from(unl)); emit(); return true; }
		return false;
	}

	/* ═════════ ЗВУК ═════════ */
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
	function playGen(n, offset){
		offset = Math.max(0, Number(offset) || 0);
		const ac = audioCtx();
		if(!ac) return null;
		stopPlay();
		const bus = ac.createGain(), t0 = ac.currentTime + 0.05;
		bus.connect(master);
		/* если нужно начинать с offset — глушим всё, что запланировано раньше */
		if(offset > 0){
			bus.gain.setValueAtTime(0.0001, t0);
			bus.gain.setValueAtTime(0.0001, Math.max(t0 + 0.01, t0 + offset - 0.02));
			bus.gain.linearRampToValueAtTime(1, t0 + offset);
		}else{
			bus.gain.value = 1;
		}
		let user = null;
		try{ user = n.gen(ac, bus, t0); }catch(e){ console.error("[GOLU_FS] gen", n.name, e); }
		const h = { ac:ac, t0:t0, offset:offset, dur:n.dur || 10, stop:function(){
			try{ if(typeof user === "function") user(); }catch(e){}
			try{ bus.gain.cancelScheduledValues(ac.currentTime); bus.gain.setTargetAtTime(0, ac.currentTime, 0.02); }catch(e){}
			setTimeout(function(){ try{ bus.disconnect(); }catch(e){} }, 250);
		}};
		curPlay = h;
		return h;
	}

	/* ═════════ ОКНА ═════════ */
	let layer = null, zTop = 1;
	const wins = [];
	function getLayer(){
		if(layer && layer.isConnected) return layer;
		layer = document.createElement("div"); layer.id = "gf-layer";
		document.body.appendChild(layer);
		return layer;
	}
	function win(o){
		o = o || {};
		ensureCss();
		if(o.id){ const ex = wins.find(w => w.id === o.id); if(ex){ ex.focus(); return ex; } }
		while(wins.length >= 14) wins[0].close();
		const el = document.createElement("div");
		el.className = "gf-win";
		const vw = window.innerWidth, vh = window.innerHeight, minW = o.minW || 240, minH = o.minH || 140;
		const w = Math.max(minW, Math.min(o.w || 460, vw - 16)), h = Math.max(minH, Math.min(o.h || 320, vh - 16));
		const off = (wins.length % 8) * 28;
		const x = clamp(60 + off, 4, Math.max(4, vw - w - 4)), y = clamp(50 + off, 4, Math.max(4, vh - h - 4));
		el.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;z-index:" + (++zTop);
		el.innerHTML = '<div class="gf-bar"><span class="gf-bt"></span><span class="gf-bbs"><button class="gf-bb" data-a="max" title="Развернуть">▢</button><button class="gf-bb" data-a="x" title="Закрыть">✕</button></span></div><div class="gf-body"></div>' +
			["n", "s", "e", "w", "ne", "nw", "se", "sw"].map(d => '<i class="gf-rz gf-rz-' + d + '" data-d="' + d + '"></i>').join("");
		getLayer().appendChild(el);
		const wn = { id:o.id || null, el:el, body:$(".gf-body", el), closed:false, cl:[] };
		wn.setTitle = t => {
			const bt = $(".gf-bt", el);
			const ic = o.icon;
			let pre = "";
			if(ic && typeof ic === "object"){
				// объект-иконка (передан напрямую в win({icon:{src:...}}))
				if(ic.src)   pre = '<img class="gf-ico-img" src="' + esc(ic.src) + '" alt=""> ';
				else if(ic.svg)   pre = ic.svg + " ";
				else if(ic.emoji) pre = esc(ic.emoji) + " ";
				else if(ic.icon)  pre = esc(ic.icon) + " ";
			} else if(typeof ic === "string" && ic){
				// строка: если это уже HTML (начинается с "<"), вставляем как есть
				// иначе — экранируем (эмодзи, текст)
				if(ic.trim().charAt(0) === "<") pre = ic + " ";
				else pre = esc(ic) + " ";
			}
			bt.innerHTML = pre + esc(t);
		};
		wn.setTitle(o.title || "");
		wn.focus = () => { el.style.zIndex = ++zTop; };
		wn.toggleMax = () => { el.classList.toggle("gf-full"); };
		wn.onClose = f => { wn.cl.push(f); };
		wn.later = (f, ms) => { const id = setTimeout(() => { if(!wn.closed) f(); }, ms); wn.cl.push(() => clearTimeout(id)); return id; };
		wn.every = (f, ms) => { const id = setInterval(f, ms); wn.cl.push(() => clearInterval(id)); return id; };
		wn.raf = f => {
			let id = 0, on = true;
			const loop = t => { if(!on) return; f(t); id = requestAnimationFrame(loop); };
			id = requestAnimationFrame(loop);
			wn.cl.push(() => { on = false; cancelAnimationFrame(id); });
		};
		wn.close = () => {
			if(wn.closed) return;
			wn.closed = true;
			el.querySelectorAll("audio,video").forEach(m => { try{ m.pause(); }catch(e){} });
			wn.cl.forEach(f => { try{ f(); }catch(e){} });
			el.remove();
			const i = wins.indexOf(wn); if(i >= 0) wins.splice(i, 1);
		};
		/* фокус + изменение размера */
		el.addEventListener("pointerdown", e => {
			wn.focus();
			const hd = e.target.closest(".gf-rz");
			if(!hd || el.classList.contains("gf-full")) return;
			e.preventDefault();
			const d = hd.dataset.d, r = el.getBoundingClientRect(), sx = e.clientX, sy = e.clientY;
			const mv = ev => {
				const dx = ev.clientX - sx, dy = ev.clientY - sy;
				let L = r.left, T = r.top, W = r.width, H = r.height;
				if(d.indexOf("e") >= 0) W = Math.max(minW, r.width + dx);
				if(d.indexOf("s") >= 0) H = Math.max(minH, r.height + dy);
				if(d.indexOf("w") >= 0){ W = Math.max(minW, r.width - dx); L = r.left + r.width - W; }
				if(d.indexOf("n") >= 0){ H = Math.max(minH, r.height - dy); T = r.top + r.height - H; }
				el.style.left = L + "px"; el.style.top = Math.max(0, T) + "px"; el.style.width = W + "px"; el.style.height = H + "px";
			};
			const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
			window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
		});
		/* перетаскивание за заголовок по всему экрану */
		const bar = $(".gf-bar", el);
		bar.addEventListener("pointerdown", e => {
			if(e.target.closest("button") || el.classList.contains("gf-full")) return;
			e.preventDefault();
			const r = el.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
			const mv = ev => {
				el.style.left = clamp(ev.clientX - ox, 70 - r.width, window.innerWidth - 70) + "px";
				el.style.top = clamp(ev.clientY - oy, 0, window.innerHeight - 30) + "px";
			};
			const up = () => { window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up); window.removeEventListener("pointercancel", up); };
			window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
		});
		bar.addEventListener("dblclick", e => { if(!e.target.closest("button")) wn.toggleMax(); });
		$("[data-a=x]", el).addEventListener("click", wn.close);
		$("[data-a=max]", el).addEventListener("click", wn.toggleMax);
		wins.push(wn);
		if(o.build){
			try{ const r = o.build(wn.body, wn); if(typeof r === "function") wn.cl.push(r); }
			catch(err){ console.error("[GOLU_FS] окно " + o.title, err); wn.body.innerHTML = '<pre class="gf-pre">[ОШИБКА] ' + esc(err.message) + '</pre>'; }
		}
		return wn;
	}

	/* ═════════ ПРОСМОТРЩИКИ ═════════ */
	const textOf = n => typeof n.text === "function" ? String(n.text()) : (n.text != null ? String(n.text) : "");
	const V = {
		text(n, b){
			b.innerHTML = '<div class="gf-col"><textarea class="gf-edit" spellcheck="false"></textarea><div class="gf-foot"><span>✎ можно править · изменения НЕ сохраняются</span><button class="gf-b" data-a="rv">↺ вернуть</button></div></div>';
			const ta = $(".gf-edit", b); let orig = "";
			const set = t => { orig = t; ta.value = t; };
			if(n.src && n.text == null){
				ta.value = "загрузка…";
				fetch(n.src).then(r => { if(!r.ok) throw new Error("HTTP " + r.status); return r.text(); }).then(set)
					.catch(e => { ta.value = "[ОШИБКА] не удалось загрузить " + n.src + "\n" + e.message + (location.protocol === "file:" ? "\n(на file:// fetch не работает, откройте сайт по http)" : ""); });
			}else set(textOf(n));
			$("[data-a=rv]", b).addEventListener("click", () => { ta.value = orig; });
		},
		image(n, b){
			if(n.draw){
				const w = n.w || 480, h = n.h || 360;
				b.innerHTML = '<div class="gf-imgbox"><canvas width="' + w + '" height="' + h + '"></canvas></div>';
				const c = $("canvas", b).getContext("2d"); c.save(); n.draw(c, w, h); c.restore();
			}else{
				b.innerHTML = '<div class="gf-imgbox"><img alt=""></div>';
				const im = $("img", b);
				im.onerror = () => { b.innerHTML = '<pre class="gf-pre">[ОШИБКА] не удалось загрузить: ' + esc(n.src) + '</pre>'; };
				im.src = n.src;
			}
		},
		audio(n, b, wn){
			/* ═════════ РЕАЛЬНЫЙ ФАЙЛ (src) — красивый плеер ═════════ */
						if(!n.gen){
				/* ═════════ РЕАЛЬНЫЙ ФАЙЛ (src) ═════════ */
				if(!document.getElementById("ga-css")){
					const st = document.createElement("style");
					st.id = "ga-css";
					st.textContent =
						".gf-audio{display:flex;flex-direction:column;gap:10px;padding:14px;box-sizing:border-box;min-height:100%;background:#0a0306;color:#e8d9b0;font:13px/1.3 monospace}" +
						".ga-cover{position:relative;flex:1 1 120px;min-height:120px;border:1px solid #5a1020;background:radial-gradient(circle at 50% 40%,#2a0612,#050002);display:flex;align-items:center;justify-content:center;overflow:hidden}" +
						".ga-cover-art{font-size:64px;z-index:1;text-shadow:0 0 18px #ff0044;max-height:100%}" +
						".ga-cover-art img{max-width:100%;max-height:100%;display:block}" +
						".ga-cover-bars{position:absolute;left:0;right:0;bottom:0;height:60%;display:flex;align-items:flex-end;gap:2px;padding:0 6px}" +
						".ga-cover-bars i{flex:1;height:100%;background:linear-gradient(#ff0044,#7a0020);transform-origin:bottom;transform:scaleY(.15);opacity:.3}" +
						".ga-title{color:#d4af37;font-size:16px;font-weight:bold;word-break:break-all}" +
						".ga-sub{color:#8a6a70;font-size:11px}" +
						".ga-viz{width:100%;height:60px;background:#050002;border:1px solid #2a0612;display:block}" +
						".ga-seek,.ga-volume{accent-color:#ff0044;width:100%;margin:0}" +
						".ga-times{display:flex;justify-content:space-between;color:#d4af37}" +
						".ga-controls{display:flex;align-items:center;gap:8px;flex-wrap:wrap}" +
						".ga-btn{background:#1a0510;color:#d4af37;border:1px solid #5a1020;padding:6px 12px;cursor:pointer;font:inherit}" +
						".ga-btn:hover{background:#2a0816;border-color:#ff0044}" +
						".ga-btn.on{background:#ff0044;color:#000}" +
						".ga-play{min-width:52px;font-size:16px}" +
						".ga-vol{display:flex;align-items:center;gap:6px;flex:1;min-width:110px}" +
						".ga-err{color:#ff4466;padding:20px;word-break:break-all}";
					document.head.appendChild(st);
				}

				/* окно побольше */
				const winEl = b.closest(".gf-win");
				if(winEl && !winEl.classList.contains("gf-full")){
					const r = winEl.getBoundingClientRect();
					const w = Math.min(Math.max(r.width, 460), innerWidth - 20);
					const h = Math.min(Math.max(r.height, 560), innerHeight - 20);
					winEl.style.width = w + "px";
					winEl.style.height = h + "px";
					if(r.left + w > innerWidth) winEl.style.left = Math.max(0, innerWidth - w - 10) + "px";
					if(r.top + h > innerHeight) winEl.style.top = Math.max(0, innerHeight - h - 10) + "px";
				}
				b.style.overflow = "auto";

				b.innerHTML =
					'<div class="gf-audio">' +
						'<div class="ga-cover">' +
							'<div class="ga-vinyl">' +
								'<div class="ga-vinyl-grooves"></div>' +
								'<div class="ga-vinyl-label"><span class="ga-vinyl-note">♪</span></div>' +
							'</div>' +
							'<div class="ga-cover-bars">' + Array.from({length: 24}, () => '<i></i>').join("") + '</div>' +
							'<div class="ga-cover-glow"></div>' +
						'</div>' +
						'<div class="ga-title"></div>' +
						'<div class="ga-sub"></div>' +
						'<canvas class="ga-viz" width="400" height="60"></canvas>' +
						'<input type="range" class="ga-seek" min="0" max="1000" value="0">' +
						'<div class="ga-times"><span class="ga-cur">0:00</span><span class="ga-dur">0:00</span></div>' +
						'<div class="ga-controls">' +
							'<button class="ga-btn" data-a="back" title="-10 сек">«10</button>' +
							'<button class="ga-btn ga-play" data-a="play" title="Пуск / пауза">▶</button>' +
							'<button class="ga-btn" data-a="fwd" title="+10 сек">10»</button>' +
							'<div class="ga-vol"><span>🔊</span><input type="range" class="ga-volume" min="0" max="100" value="80"></div>' +
							'<button class="ga-btn" data-a="loop" title="Повтор">🔁</button>' +
						'</div>' +
					'</div>';

				const root    = b.querySelector(".gf-audio");
				const titleEl = root.querySelector(".ga-title");
				const subEl   = root.querySelector(".ga-sub");
				const seek    = root.querySelector(".ga-seek");
				const curEl   = root.querySelector(".ga-cur");
				const durEl   = root.querySelector(".ga-dur");
				const playBtn = root.querySelector(".ga-play");
				const volEl   = root.querySelector(".ga-volume");
				const loopBtn = root.querySelector("[data-a=loop]");
				const viz     = root.querySelector(".ga-viz");
				const bars    = root.querySelectorAll(".ga-cover-bars i");

				/* ═══ уникальный градиент этикетки для каждого трека ═══ */
				const label = root.querySelector(".ga-vinyl-label");
				if (label) {
					const key = String(n.name || "") + "|" + String(n.src || "");
					let h = 2166136261;
					for (let i = 0; i < key.length; i++){ h ^= key.charCodeAt(i); h = Math.imul(h, 16777619); }
					h = h >>> 0;

					const hueA = h % 360;
					const hueB = (hueA + 40 + ((h >>> 9) % 100)) % 360;
					const hueC = (hueA + 200 + ((h >>> 17) % 80)) % 360;
					const angle = (h >>> 3) % 360;

					const a = "hsl(" + hueA + ", 80%, 55%)";
					const b = "hsl(" + hueB + ", 85%, 40%)";
					const c = "hsl(" + hueC + ", 70%, 25%)";

					label.style.background = "linear-gradient(" + angle + "deg, " + a + ", " + b + " 55%, " + c + ")";
					label.style.boxShadow = "inset 0 0 10px rgba(0,0,0,.75), 0 0 16px hsla(" + hueA + ", 85%, 55%, .55)";

					const vinyl = root.querySelector(".ga-vinyl");
					if (vinyl) vinyl.style.boxShadow =
						"0 0 0 1px #3a1020, 0 0 22px hsla(" + hueB + ", 80%, 45%, .35), inset 0 0 20px rgba(0,0,0,.9)";

					const cover = root.querySelector(".ga-cover");
					if (cover) cover.style.background =
						"radial-gradient(circle at 50% 50%, hsl(" + hueA + ", 40%, 8%), #050002 72%)";

					const glow = root.querySelector(".ga-cover-glow");
					if (glow) glow.style.background =
						"radial-gradient(circle at 50% 50%, hsla(" + hueA + ", 80%, 55%, .16), transparent 62%)";

					/* если у трека задана своя картинка — показываем её вместо ♪ */
					if (n.icon && typeof n.icon === "object" && n.icon.src) {
						label.innerHTML = '<img class="ga-cover-img" src="' + esc(n.icon.src) + '" alt="">';
					}
				}

				titleEl.textContent = n.name.replace(/\.[^.]+$/, "");
				subEl.textContent = "audio · загрузка…";

				const fmt = s => isFinite(s) ? Math.floor(s / 60) + ":" + pad(Math.floor(s % 60)) : "0:00";

				const audio = new Audio();
				audio.preload = "auto";
				audio.volume = 0.8;
				audio.src = n.src;

				let ac = null, an = null, closed = false, rafId = 0, dragging = false, auto = true;

				/* реальный анализатор только если звук не заглушат (http(s) и тот же адрес) */
				const canAnalyse = (() => {
					try{ return /^https?:$/.test(location.protocol) && new URL(n.src, location.href).origin === location.origin; }
					catch(e){ return false; }
				})();
				const ensureAnalyzer = () => {
					if(!canAnalyse) return false;
					try{
						if(!ac){
							const C = window.AudioContext || window.webkitAudioContext;
							if(!C) return false;
							ac = new C();
							const node = ac.createMediaElementSource(audio);
							an = ac.createAnalyser();
							an.fftSize = 128;
							node.connect(an);
							an.connect(ac.destination);
						}
						if(ac.state === "suspended") ac.resume();
						return true;
					}catch(e){ ac = null; an = null; return false; }
				};

				audio.addEventListener("loadedmetadata", () => {
					durEl.textContent = fmt(audio.duration);
					const kb = Math.round((n.size || 0) / 1024);
					const ext = (String(n.src).split("?")[0].split(".").pop() || "").toUpperCase();
					subEl.textContent = "audio · " + ext + (kb ? " · " + (kb > 1024 ? (kb / 1024).toFixed(1) + " МБ" : kb + " КБ") : "");
				});
				audio.addEventListener("canplay", () => {
					if(!auto) return;
					auto = false;
					audio.play().catch(() => {});   // если браузер не дал — жми ▶
				});
				audio.addEventListener("error", () => {
					if(closed) return;
					root.innerHTML = '<div class="ga-err">✖ не удалось загрузить<br>' + esc(n.src) + '<br><br>проверь путь к файлу и формат (mp3, wav, ogg…)</div>';
				});
				audio.addEventListener("ended", () => { playBtn.textContent = "▶"; root.classList.remove("is-playing"); });
				audio.addEventListener("play", () => {
					playBtn.textContent = "❚❚";
					root.classList.add("is-playing");
					ensureAnalyzer();
				});
				audio.addEventListener("pause", () => {
					playBtn.textContent = "▶";
					root.classList.remove("is-playing");
				});
				audio.addEventListener("timeupdate", () => {
					if(dragging) return;
					if(audio.duration) seek.value = Math.round(audio.currentTime / audio.duration * 1000);
					curEl.textContent = fmt(audio.currentTime);
				});

				/* перемотка */
				seek.addEventListener("pointerdown", () => { dragging = true; });
				seek.addEventListener("input", () => {
					if(audio.duration) curEl.textContent = fmt(seek.value / 1000 * audio.duration);
				});
				seek.addEventListener("change", () => {
					if(audio.duration) audio.currentTime = seek.value / 1000 * audio.duration;
					dragging = false;
				});

				playBtn.addEventListener("click", () => {
					if(audio.paused) audio.play().catch(() => {});
					else audio.pause();
				});
				root.querySelector("[data-a=back]").addEventListener("click", () => {
					audio.currentTime = Math.max(0, audio.currentTime - 10);
				});
				root.querySelector("[data-a=fwd]").addEventListener("click", () => {
					audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
				});
				volEl.addEventListener("input", () => { audio.volume = volEl.value / 100; });
				loopBtn.addEventListener("click", () => {
					audio.loop = !audio.loop;
					loopBtn.classList.toggle("on", audio.loop);
				});

				/* спектр: настоящий или имитация */
				const buf = new Uint8Array(64);
				const c = viz.getContext("2d");
				const draw = () => {
					if(closed) return;
					rafId = requestAnimationFrame(draw);
					const W = viz.width, H = viz.height;
					c.clearRect(0, 0, W, H);
					if(!audio.paused){
						if(an){
							an.getByteFrequencyData(buf);
						}else{
							const t = audio.currentTime;
							for(let i = 0; i < buf.length; i++){
								const k = 1 - i / buf.length;
								buf[i] = 255 * k * (0.35 + 0.65 * Math.abs(Math.sin(t * 5 + i * 0.6))) * (0.6 + 0.4 * Math.random());
							}
						}
						const bw = W / buf.length;
						for(let i = 0; i < buf.length; i++){
							const v = buf[i] / 255 * H;
							c.fillStyle = i % 4 === 0 ? "#d4af37" : "#ff0044";
							c.fillRect(i * bw, H - v, bw - 1, v);
						}
						const step = Math.max(1, Math.floor(buf.length / bars.length));
						for(let i = 0; i < bars.length; i++){
							const v = buf[i * step] / 255;
							bars[i].style.transform = "scaleY(" + (0.15 + v * 0.85) + ")";
							bars[i].style.opacity = 0.35 + v * 0.65;
						}
					}else{
						c.fillStyle = "#3a1020";
						c.fillRect(0, H / 2, W, 1);
						bars.forEach(bb => { bb.style.transform = "scaleY(0.15)"; bb.style.opacity = 0.3; });
					}
				};
				draw();

				wn.onClose(() => {
					closed = true;
					cancelAnimationFrame(rafId);
					try{ audio.pause(); audio.removeAttribute("src"); audio.load(); }catch(e){}
					try{ if(ac) ac.close(); }catch(e){}
				});

				return;
			}

			/* ═════════ СИНТЕЗ (gen) — оставляем как было ═════════ */
			const dur = n.dur || 10;
			const fmt = s => Math.floor(s / 60) + ":" + pad(Math.floor(s % 60));

			b.innerHTML = '<div class="gf-media">' +
				'<canvas class="gf-viz" width="400" height="110"></canvas>' +
				'<input type="range" class="gf-seek" min="0" max="1000" value="0">' +
				'<div class="gf-mrow">' +
					'<button class="gf-b" data-a="play">▶ ПУСК</button>' +
					'<span class="gf-time">0:00 / ' + fmt(dur) + '</span>' +
				'</div>' +
				'<div class="gf-note"></div>' +
			'</div>';

			const btn  = $("[data-a=play]", b);
			const bar  = $(".gf-seek", b);
			const tm   = $(".gf-time", b);
			const c    = $(".gf-viz", b).getContext("2d");

			$(".gf-note", b).textContent = n.note || "";

			let h = null;
			let vt = 0;
			let dragging = false;
			let wasPlaying = false;

			function syncBar(){
				bar.value = Math.round((vt / dur) * 1000);
				tm.textContent = fmt(vt) + " / " + fmt(dur);
			}

			function start(off){
				off = Math.max(0, Math.min(dur - 0.01, Number(off) || 0));
				vt = off;
				stopPlay();
				h = playGen(n, off);
				btn.textContent = h ? "■ СТОП" : "▶ ПУСК";
				if(!h) say("WebAudio недоступен");
				syncBar();
			}
			function halt(){
				if(h && curPlay === h) stopPlay();
				h = null;
				btn.textContent = "▶ ПУСК";
			}

			btn.addEventListener("click", () => {
				if(h){ halt(); }
				else{ start(vt); }
			});

			bar.addEventListener("pointerdown", () => {
				dragging = true;
				wasPlaying = !!h;
				if(h) halt();
			});
			bar.addEventListener("input", () => {
				vt = (bar.value / 1000) * dur;
				syncBar();
			});
			bar.addEventListener("change", () => {
				dragging = false;
				vt = (bar.value / 1000) * dur;
				if(wasPlaying){
					start(vt);
					wasPlaying = false;
				}else{
					syncBar();
				}
			});

			wn.onClose(() => { if(h && curPlay === h) stopPlay(); });

			const buf = new Uint8Array(64);
			wn.raf(() => {
				if(h && curPlay === h && !dragging){
					vt = (h.ac.currentTime - h.t0) + (h.offset || 0);
					if(vt >= dur){ halt(); vt = 0; syncBar(); }
					else syncBar();
				}
				c.fillStyle = "#050002"; c.fillRect(0, 0, 400, 110);
				if(h && analyser && curPlay === h){
					analyser.getByteFrequencyData(buf);
					const bw = 400 / buf.length;
					for(let i = 0; i < buf.length; i++){
						const v = buf[i] / 255 * 110;
						c.fillStyle = i % 5 === 0 ? "#d4af37" : "#ff0044";
						c.fillRect(i * bw, 110 - v, bw - 1, v);
					}
				}else{
					c.fillStyle = "#3a1020"; c.fillRect(0, 54, 400, 2);
				}
			});

			syncBar();
		},
		video(n, b, wn){
			if(!n.draw){
				b.innerHTML = '<div class="gf-media"><video controls playsinline></video></div>';
				const v = $("video", b);
				if(n.poster) v.poster = n.poster;
				v.src = n.src;
				return;
			}
			const w = n.w || 480, h = n.h || 270, dur = n.dur || 8;
			b.innerHTML = '<div class="gf-media">' +
				'<canvas class="gf-vcv" width="' + w + '" height="' + h + '"></canvas>' +
				'<input type="range" class="gf-seek" min="0" max="1000" value="0">' +
				'<div class="gf-mrow">' +
					'<button class="gf-b" data-a="pp">❚❚ ПАУЗА</button>' +
					'<span class="gf-time"></span>' +
				'</div>' +
			'</div>';
			const c    = $(".gf-vcv", b).getContext("2d");
			const seek = $(".gf-seek", b);
			const pp   = $("[data-a=pp]", b);
			const tm   = $(".gf-time", b);
			const fmt  = s => Math.floor(s / 60) + ":" + pad(Math.floor(s % 60));

			let t = 0;
			let playing = true;
			let dragging = false;
			let last = performance.now();
			let pausedByDrag = false;

			pp.addEventListener("click", () => {
				if(dragging) return;
				playing = !playing;
				pp.textContent = playing ? "❚❚ ПАУЗА" : "▶ ПУСК";
			});

			/* ── перемотка: тянем — пауза, отпускаем — продолжаем ── */
			seek.addEventListener("pointerdown", () => {
				dragging = true;
				pausedByDrag = playing;
				playing = false;
			});
			seek.addEventListener("input", () => {
				t = (seek.value / 1000) * dur;
			});
			seek.addEventListener("change", () => {
				dragging = false;
				t = (seek.value / 1000) * dur;
				if(pausedByDrag){ playing = true; pausedByDrag = false; }
				pp.textContent = playing ? "❚❚ ПАУЗА" : "▶ ПУСК";
			});

			wn.raf(now => {
				const dt = Math.min(0.1, (now - last) / 1000); last = now;
				if(playing && !dragging) t = (t + dt) % dur;
				if(!dragging) seek.value = Math.round(t / dur * 1000);
				tm.textContent = fmt(t) + " / " + fmt(dur);
				c.save(); n.draw(c, t, w, h); c.restore();
			});
		},
		bin(n, b){
			const r = rng(n.id * 7919 + 13), enc = new TextEncoder().encode(n.msg != null ? String(n.msg) : (n.text != null ? textOf(n) : "")), bytes = [];
			for(let i = 0; i < 32; i++) bytes.push(Math.floor(r() * 256));
			enc.forEach(x => bytes.push(x));
			for(let i = 0; i < 48; i++) bytes.push(Math.floor(r() * 256));
			let out = "[двоичный файл · hexdump]\n\n";
			for(let o = 0; o < bytes.length; o += 16){
				const row = bytes.slice(o, o + 16);
				out += o.toString(16).padStart(8, "0") + "  " +
					row.map(x => x.toString(16).padStart(2, "0")).join(" ").padEnd(47, " ") + "  " +
					row.map(x => x >= 32 && x < 127 ? String.fromCharCode(x) : ".").join("") + "\n";
			}
			b.innerHTML = '<pre class="gf-pre"></pre>';
			$(".gf-pre", b).textContent = out;
		}
	};
	const CUSTOM = {}, EXTICON = {};

	/* ═════════ ОТКРЫТИЕ ═════════ */
	function say(msg){
		if(typeof F.onMsg === "function") F.onMsg(msg);
		else console.info("[GOLU_FS] " + msg);
	}
	function openPage(key){
		if(typeof OPEN_PAGE !== "function"){ say("OPEN_PAGE недоступен"); return; }
		say("Запуск: " + key + "…");
		setTimeout(() => { try{ OPEN_PAGE(key); }catch(e){ console.error("[GOLU_FS] OPEN_PAGE", key, e); } }, 250);
	}
	function askLock(l, ok){
		const L = l.lock || {};
		return win({ title:"Доступ запрещён", icon:"⛔", w:360, h:240, id:"lock:" + lkey(l), build(b, wn){
			b.innerHTML = '<div class="gf-dlg"><div class="gf-big">⛔ ДОСТУП ЗАПРЕЩЁН</div><div>' + esc(L.hint || "Нужен ключ.") + '</div>' +
				'<input class="gf-txt gf-pw" placeholder="ключ" spellcheck="false" autocomplete="off"><button class="gf-b" data-a="ok">ВВЕСТИ</button><div class="gf-err"></div></div>';
			const inp = $(".gf-pw", b), err = $(".gf-err", b);
			const go = () => {
				if(unlock(l, inp.value)){ wn.close(); say("Доступ получен."); if(ok) ok(); }
				else{
					err.textContent = L.wrong || "НЕВЕРНО.";
					wn.el.classList.add("gf-shake");
					wn.later(() => wn.el.classList.remove("gf-shake"), 400);
				}
			};
			$("[data-a=ok]", b).addEventListener("click", go);
			inp.addEventListener("keydown", e => { if(e.key === "Enter") go(); });
			setTimeout(() => inp.focus(), 30);
		}});
	}
	function open(x){
		const n = node(x);
		if(!n){ say("Не найдено: " + x); return null; }
		const lk = lockOf(n);
		if(lk){ askLock(lk, () => open(n)); return null; }
		const id = "f:" + pathOf(n), ic = icon(n);
		switch(n.kind){
			case "dir":
				if(typeof F.onDir === "function") F.onDir(n);
				else{ F.startDir = n; openPage("explorer"); }
				return null;
			case "app":
				if(n.page){ openPage(n.page); return null; }
				if(typeof n.run !== "function"){ say("Нечего запускать: " + n.name); return null; }
				return win({ title:n.name, icon:ic, w:(n.win && n.win.w) || 460, h:(n.win && n.win.h) || 320, id:n.multi ? undefined : "app:" + pathOf(n), build:(b, wn) => n.run(b, wn, n) });
			case "link":
				if(n.page) openPage(n.page);
				else if(n.target) open(n.target);
				return null;
			case "text":  return win({ title:n.name, icon:ic, w:540, h:400, id:id, build:(b, wn) => V.text(n, b, wn) });
			case "image": return win({ title:n.name, icon:ic, w:520, h:420, id:id, build:(b, wn) => V.image(n, b, wn) });
			case "audio": return win({ title:n.name, icon:ic, w:n.gen ? 440 : 420, h:n.gen ? 270 : 150, id:id, build:(b, wn) => V.audio(n, b, wn) });
			case "video": return win({ title:n.name, icon:ic, w:n.draw ? 500 : 560, h:n.draw ? 420 : 380, id:id, build:(b, wn) => V.video(n, b, wn) });
			default: {
				const cv = CUSTOM[extOf(n.name)];
				return win({ title:n.name, icon:ic, w:580, h:340, id:id, build:(b, wn) => cv ? cv(n, b, wn) : V.bin(n, b, wn) });
			}
		}
	}

		/* ═════════ ИКОНКИ И ТИПЫ ═════════
	   n.icon может быть:
	     - строкой:           "👾"
	     - объектом-картинкой: { src:"../source/goluworld.png" }
	     - объектом-svg:       { svg:"<svg …>…</svg>" }
	     - объектом-эмодзи:    { emoji:"👾" }
	     - объектом-иконкой:   { icon:"👾" }
	*/
	const ICON = { dir:"📁", text:"📄", image:"🖼", audio:"🎵", video:"🎞", app:"⚙", link:"🔗", bin:"💾" };

	function iconRaw(n){
		const i = n.icon;
		if(i && typeof i === "object"){
			if(i.src)   return i.src;
			if(i.svg)   return i.svg;
			if(i.emoji) return i.emoji;
			if(i.icon)  return i.icon;
		}
		if(typeof i === "string" && i) return i;
		if(n.kind === "bin" && EXTICON[extOf(n.name)]) return EXTICON[extOf(n.name)];
		return ICON[n.kind] || "❓";
	}

	/* icon() возвращает HTML (строку), пригодную для вставки в innerHTML */
	function icon(n){
		const i = n.icon;
		if(i && typeof i === "object"){
			if(i.src){
				return '<img class="gf-ico-img" src="' + esc(i.src) + '" alt="" onerror="this.style.display=\'none\'">';
			}
			if(i.svg) return String(i.svg);
			if(i.emoji) return esc(i.emoji);
			if(i.icon) return esc(i.icon);
		}
		if(typeof i === "string" && i) return esc(i);
		if(n.kind === "bin" && EXTICON[extOf(n.name)]) return esc(EXTICON[extOf(n.name)]);
		return esc(ICON[n.kind] || "❓");
	}

	/* текстовый вариант (для заголовков, где нужен просто текст) */
	function iconText(n){
		const i = n.icon;
		if(i && typeof i === "object"){
			if(i.emoji) return String(i.emoji);
			if(i.icon)  return String(i.icon);
			if(i.svg)   return "🖼";
			if(i.src)   return "🖼";
		}
		if(typeof i === "string" && i) return i;
		if(n.kind === "bin" && EXTICON[extOf(n.name)]) return EXTICON[extOf(n.name)];
		return ICON[n.kind] || "❓";
	}
	
	const EXT = {
		text:"txt md log json csv ini cfg js html css".split(" "),
		image:"png jpg jpeg gif webp svg bmp avif".split(" "),
		audio:"mp3 wav ogg m4a flac aac opus".split(" "),
		video:"mp4 webm ogv mov mkv m4v".split(" ")
	};
	function typeOf(name){
		const e = extOf(name);
		for(const k in EXT) if(EXT[k].indexOf(e) >= 0) return k;
		return null;
	}

	/* ═════════ ПУБЛИЧНЫЙ API ═════════ */
	const spec = (s, key) => (s && typeof s === "object") ? s : (s == null ? {} : { [key]: s });
	const F = {
		__v:1, root:root, startDir:null, onDir:null, onMsg:null,
		folder(path, o){
			const d = ensureDir(parts(path));
			if(d && o){ ["icon", "hidden", "order", "lock", "desc", "trash"].forEach(k => { if(k in o) d[k] = o[k]; }); emit(); }
			return d;
		},
		text:  (p, s) => put(p, Object.assign({}, spec(s, "text"),  { kind:"text" })),
		image: (p, s) => put(p, Object.assign({}, spec(s, "src"),   { kind:"image" })),
		audio: (p, s) => put(p, Object.assign({}, spec(s, "src"),   { kind:"audio" })),
		video: (p, s) => put(p, Object.assign({}, spec(s, "src"),   { kind:"video" })),
		app(p, s){ const o = Object.assign({}, spec(s, "run"), { kind:"app" }); if(o.page && !o.needPage) o.needPage = o.page; return put(p, o); },
		link(p, s){ const o = Object.assign({}, spec(s, "target"), { kind:"link" }); if(o.page && !o.needPage) o.needPage = o.page; return put(p, o); },
		file:  (p, s) => put(p, Object.assign({}, s || {}, { kind:"bin" })),
		add(p, url){
			const ps = parts(p), nm = ps[ps.length - 1] || "", t = typeOf(nm);
			if(t) return F[t](p, { src:url });
			return F.file(p, { src:url, msg:"Формат не распознан: " + nm });
		},
		viewer(ext, fn, ic){ ext = String(ext).toLowerCase(); CUSTOM[ext] = fn; if(ic) EXTICON[ext] = ic; },
		win:win,
		get:(p) => resolve(p, root),
		resolve:resolve,
		list(x, showHidden){ const d = node(x); return (!d || d.kind !== "dir" || lockOf(d)) ? [] : kids(d, showHidden); },
		kids:kids, visible:visible, cmp:cmp, pathOf:pathOf, attached:attached,
		byId:(id) => BYID.get(id),
		remove(x){
			const n = node(x);
			if(!n || !n.parent) return false;
			n.parent.kids.splice(n.parent.kids.indexOf(n), 1);
			BYID.delete(n.id); n.parent = null; emit();
			return true;
		},
		erase(x){
			const n = node(x);
			if(!n || !n.parent || n.keep) return false;
			erased.add(pathOf(n).toLowerCase()); lsSet(LS_ERASED, Array.from(erased));
			return F.remove(n);
		},
		read(x){
			const n = node(x);
			if(!n || lockOf(n)) return Promise.resolve(null);
			if(n.kind === "bin") return Promise.resolve(n.msg != null ? String(n.msg) : null);
			if(n.kind !== "text") return Promise.resolve(null);
			if(n.text != null) return Promise.resolve(textOf(n));
			if(n.src) return fetch(n.src).then(r => r.ok ? r.text() : null).catch(() => null);
			return Promise.resolve("");
		},
		icon:icon,
		locked:(x) => !!lockOf(x), lockOf:lockOf, unlock:unlock, askLock:askLock,
		onChange(fn){ subs.push(fn); return () => { const i = subs.indexOf(fn); if(i >= 0) subs.splice(i, 1); }; },
		closeAll(){ wins.slice().forEach(w => w.close()); stopPlay(); },
		open:open, openPage:openPage, say:say, pageOk:pageOk,
		ref:(p, label) => '<span class="gf-ref" data-golu-open="' + esc(p) + '">' + esc(label || p) + '</span>'
	};
	window.GOLU_FS = F;

	document.addEventListener("click", e => {
		const t = e.target.closest && e.target.closest("[data-golu-open]");
		if(t){ e.preventDefault(); open(t.getAttribute("data-golu-open")); }
	});

	/* ═════════ СТИЛИ ═════════ */
	const CSS = `
#gf-layer{position:fixed;inset:0;z-index:1500;pointer-events:none;font:13px 'Courier New',monospace;color:#e8d9b0;text-shadow:none}
#gf-layer *{box-sizing:border-box}
#gf-layer button,#gf-layer input,#gf-layer textarea{font:inherit}
.gf-win{position:absolute;pointer-events:auto;display:flex;flex-direction:column;background:#0a0004;border:1px solid #d4af37;box-shadow:0 8px 40px rgba(0,0,0,.85),0 0 18px rgba(212,175,55,.25);animation:gf-in .14s ease-out}
@keyframes gf-in{from{opacity:0;transform:scale(.97)}}
.gf-win.gf-full{left:0!important;top:var(--gh,30px)!important;width:100%!important;height:calc(100vh - var(--gh,30px) - var(--gf,36px))!important}
.gf-bar{display:flex;justify-content:space-between;align-items:center;padding:4px 4px 4px 10px;background:linear-gradient(90deg,#4a0018,#1a0a10);color:#ffd966;cursor:move;user-select:none;-webkit-user-select:none;touch-action:none;font-size:12px;flex:none}
.gf-bt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gf-bbs{display:flex;flex:none}
.gf-bb{cursor:pointer;border:none;background:transparent;color:#ff4d7a;font-size:15px;line-height:1;padding:2px 9px}
.gf-bb:hover{color:#fff;background:#7a0022}
.gf-body{flex:1;min-height:0;overflow:auto;position:relative}
.gf-rz{position:absolute;z-index:3;touch-action:none}
.gf-rz-n{top:-3px;left:8px;right:8px;height:7px;cursor:ns-resize}
.gf-rz-s{bottom:-3px;left:8px;right:8px;height:7px;cursor:ns-resize}
.gf-rz-e{right:-3px;top:8px;bottom:8px;width:7px;cursor:ew-resize}
.gf-rz-w{left:-3px;top:8px;bottom:8px;width:7px;cursor:ew-resize}
.gf-rz-ne{top:-4px;right:-4px;width:12px;height:12px;cursor:nesw-resize}
.gf-rz-nw{top:-4px;left:-4px;width:12px;height:12px;cursor:nwse-resize}
.gf-rz-se{bottom:-4px;right:-4px;width:12px;height:12px;cursor:nwse-resize}
.gf-rz-sw{bottom:-4px;left:-4px;width:12px;height:12px;cursor:nesw-resize}
.gf-full .gf-rz{display:none}
.gf-b{cursor:pointer;padding:4px 10px;border:1px solid #3a1020;background:linear-gradient(180deg,#1a0a10,#0b0508);color:#e8d9b0;letter-spacing:1px;user-select:none}
.gf-b:hover:not(:disabled){border-color:#d4af37;color:#ffd966}
.gf-b:disabled{opacity:.35;cursor:default}
.gf-b.danger{border-color:#7a0022;color:#ff4d7a}
.gf-b.danger:hover:not(:disabled){background:#7a0022;color:#fff}
.gf-txt{background:#050002;border:1px solid #3a1020;color:#ffd966;padding:4px 8px;outline:none;width:100%}
.gf-txt:focus{border-color:#d4af37}
.gf-col{display:flex;flex-direction:column;height:100%}
.gf-edit{flex:1;min-height:0;width:100%;resize:none;margin:0;padding:12px;background:#050002;color:#e8d9b0;border:none;outline:none;font:12px/1.55 'Courier New',monospace;white-space:pre-wrap}
.gf-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:4px 8px;border-top:1px solid #3a1020;background:#0e0307;color:#8a6a72;font-size:11px;flex:none}
.gf-pre{margin:0;padding:12px;white-space:pre-wrap;word-break:break-word;font:12px/1.55 'Courier New',monospace;color:#e8d9b0;min-height:100%}
.gf-imgbox{display:flex;align-items:center;justify-content:center;height:100%;background:#000}
.gf-imgbox canvas,.gf-imgbox img{width:100%;height:100%;object-fit:contain}
.gf-media{padding:10px;display:flex;flex-direction:column;gap:8px;height:100%}
.gf-media audio,.gf-media video{width:100%;flex:1;min-height:0}
.gf-viz,.gf-vcv{width:100%;background:#050002;border:1px solid #3a1020}
.gf-vcv{flex:1;min-height:0;object-fit:contain}
.gf-prog,.gf-pb{height:10px;border:1px solid #3a1020;background:#050002;flex:none}
.gf-prog i,.gf-pb i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7a0022,#ff0044,#d4af37)}
.gf-mrow{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.gf-time{color:#8a6a72}
.gf-note{color:#8a6a72;font-style:italic;font-size:11px}
.gf-seek{width:100%;accent-color:#ff0044}
.gf-dlg{padding:14px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.gf-big{color:#ff0044;font-size:15px;letter-spacing:3px;text-shadow:0 0 8px #ff0044}
.gf-dim{color:#8a6a72}
.gf-err{color:#ff4d7a;min-height:1.2em}
.gf-res{color:#ffd966;line-height:1.5}
.gf-row{display:flex;gap:8px;align-items:center;font-size:11px}
.gf-row span{width:130px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gf-row b{width:40px;text-align:right;font-weight:normal;color:#8a6a72}
.gf-row .gf-pb{flex:1}
.gf-term{display:flex;flex-direction:column;height:100%;background:#050002;color:#ff6a8a;cursor:text}
.gf-tout{flex:1;overflow:auto;padding:8px;word-break:break-word}
.gf-tout .dim{color:#8a6a72}
.gf-tout .gold{color:#ffd966}
.gf-tout .err{color:#ff0044}
.gf-tout .me{color:#e8d9b0}
.gf-tout .lia{color:#c58cff}
.gf-tin{display:flex;align-items:center;border-top:1px solid #3a1020;padding:4px 8px;gap:6px;color:#ffd966;flex:none}
.gf-ps{white-space:nowrap;color:#d4af37}
.gf-tin input{flex:1;border:none;background:transparent;padding:2px;color:#ffd966;outline:none}
.gf-shake{animation:gf-shk .3s steps(2)}
@keyframes gf-shk{0%{margin-left:0}50%{margin-left:-6px}100%{margin-left:6px}}
.gf-glitch{animation:gf-gl .12s steps(2) infinite;filter:hue-rotate(160deg) saturate(2.5)}
@keyframes gf-gl{0%{transform:translate(0,0)}50%{transform:translate(4px,-2px)}100%{transform:translate(-3px,1px)}}
.gf-ref{cursor:pointer;color:#ffd966;border-bottom:1px dashed #d4af37}
.gf-ico-img{width:1em;height:1em;object-fit:contain;vertical-align:-0.15em;display:inline-block}

/* ═══ КРАСИВЫЙ ПЛЕЕР ДЛЯ ПОЛЬЗОВАТЕЛЬСКИХ АУДИО ═══ */
.gf-audio{padding:12px;display:flex;flex-direction:column;gap:8px;height:100%;overflow:auto;background:#0a0004;color:#e8d9b0;font:12px/1.4 'Courier New',monospace}
.gf-audio .ga-cover{position:relative;flex:none;height:88px;background:linear-gradient(135deg,#1a0710,#0a0204);border:1px solid #3a1020;display:flex;align-items:center;justify-content:center;overflow:hidden;border-radius:2px}
.gf-audio .ga-cover-art{font-size:44px;line-height:1;filter:drop-shadow(0 0 10px rgba(255,0,68,.5));z-index:1}
.gf-audio .ga-cover-art img{width:64px;height:64px;object-fit:contain;display:block}
.gf-audio .ga-cover-bars{position:absolute;inset:1;display:flex;align-items:flex-end;justify-content:space-between;padding:0 8px 4px;z-index:0;pointer-events:none}
.gf-audio .ga-cover-bars i{display:block;width:3px;background:linear-gradient(0deg,#ff0044,#d4af37);transform-origin:bottom;transform:scaleY(.15);opacity:.3;transition:transform .08s linear,opacity .08s linear;border-radius:1px}
.gf-audio.is-playing .ga-cover{box-shadow:inset 0 0 30px rgba(255,0,68,.15)}
.gf-audio .ga-title{font-size:15px;color:#ffd966;letter-spacing:1px;font-weight:bold;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gf-audio .ga-sub{font-size:10px;color:#8a6a72;letter-spacing:.08em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gf-audio .ga-viz{width:100%;height:60px;background:#050002;border:1px solid #3a1020;display:block}
.gf-audio .ga-seek{width:100%;accent-color:#ff0044;cursor:pointer;margin:0}
.gf-audio .ga-times{display:flex;justify-content:space-between;font-size:10px;color:#c9a24a;letter-spacing:.05em}
.gf-audio .ga-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:auto;padding-top:4px;border-top:1px solid #2a0a14}
.gf-audio .ga-btn{cursor:pointer;background:linear-gradient(180deg,#1a0a10,#0b0508);border:1px solid #3a1020;color:#e8d9b0;padding:5px 9px;font:12px/1 'Courier New',monospace;letter-spacing:.5px;border-radius:2px}
.gf-audio .ga-btn:hover{border-color:#d4af37;color:#ffd966}
.gf-audio .ga-btn.on{background:#7a0022;border-color:#ff0044;color:#fff}
.gf-audio .ga-play{min-width:42px;background:#7a0022;border-color:#ff0044;color:#fff;font-weight:bold;font-size:14px}
.gf-audio .ga-play:hover{background:#c00040}
.gf-audio .ga-vol{display:flex;align-items:center;gap:4px;flex:1;min-width:120px;margin-left:auto}
.gf-audio .ga-vol input{flex:1;accent-color:#d4af37;cursor:pointer}
.gf-audio .ga-err{padding:20px;color:#ff4d7a;text-align:center;letter-spacing:2px;font-size:13px}

/* ═══ ВИНИЛОВАЯ ПЛАСТИНКА ═══ */
.gf-audio .ga-cover{height:120px}
.ga-vinyl{position:relative;width:96px;height:96px;border-radius:50%;
	background:radial-gradient(circle at 50% 50%, #1a0a10 0%, #0a0206 30%, #050002 100%);
	box-shadow:0 0 0 1px #3a1020, 0 0 22px rgba(255,0,68,.25), inset 0 0 20px rgba(0,0,0,.9);
	transition:box-shadow .4s}
.gf-audio.is-playing .ga-vinyl{animation:gaSpin 4s linear infinite}
@keyframes gaSpin{to{transform:rotate(360deg)}}
.ga-vinyl-grooves{position:absolute;inset:4px;border-radius:50%;
	background:repeating-radial-gradient(circle at 50% 50%,
		rgba(255,255,255,.045) 0 1px,
		transparent 1px 3px)}
.ga-vinyl-label{position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;
	display:flex;align-items:center;justify-content:center;
	background:radial-gradient(circle at 35% 30%, #ff1a3c, #7a0022 55%, #1a0010);
	background-size:200% 200%;
	box-shadow:inset 0 0 10px rgba(0,0,0,.85), 0 0 14px rgba(255,0,68,.5);
	transition:background .4s, box-shadow .4s}
.ga-vinyl-note{color:#ffd966;font-size:17px;font-weight:bold;
	text-shadow:0 0 6px #000,0 0 10px #ff0044;
	animation:gaNote 1.6s ease-in-out infinite}
@keyframes gaNote{50%{transform:scale(.85);opacity:.75}}
.gf-audio:not(.is-playing) .ga-vinyl-note{animation:none;opacity:.7}
.ga-cover-img{width:100%;height:100%;object-fit:cover;border-radius:50%;display:block}
.ga-cover-bars{opacity:0;transition:opacity .4s}
.gf-audio.is-playing .ga-cover-bars{opacity:1}
.ga-cover-glow{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .4s}
.gf-audio.is-playing .ga-cover-glow{opacity:1;animation:gaGlow 2.4s ease-in-out infinite}
@keyframes gaGlow{50%{opacity:.55}}
`;
	function ensureCss(){
		if(document.getElementById("gf-css")) return;
		const s = document.createElement("style");
		s.id = "gf-css"; s.textContent = CSS;
		(document.head || document.documentElement).appendChild(s);
	}
	ensureCss();
	console.info("[GOLU_FS] готов");
})();