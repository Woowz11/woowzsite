REGISTER_PAGE("videos", "VIDΞOS", function(){

	const VIDEOS = [
		 { url: "https://www.youtube.com/watch?v=C3R57TN9Mlw", title: "ЧТО ЭТО ЗА ШТУТША? 🐦" },
		 { url: "https://www.youtube.com/watch?v=TqsiuZHHhMY", title: "never mind" },
		 { url: "https://www.youtube.com/watch?v=v7Qth5dDKuc", title: "🔺 | Подборка моих нейро-видео из Sora | 🔻" },
		 { url: "https://www.youtube.com/watch?v=C0iF46RfKKk", title: "КУДА ПРОПАЛ PISECHNIK TV? - Обладатель литиевой кнопки, и причём тут религия... 😁" },
		 { url: "https://www.youtube.com/watch?v=NIoKvekAW0c", title: "[HD] Tutorial: How to make minecraft mods on assembly 🤔" },
		 { url: "https://www.youtube.com/watch?v=51ObxJ4DEfg", title: "| ☣ | G01U Gylaet po prospekty DYBAISK and killing PIS.TV | ☣ | #2025 #golu #glitchcore #lithuism" },
		 { url: "https://www.youtube.com/watch?v=thY5qQhcpOA", title: "he wanted, he got" },
		 { url: "https://www.youtube.com/watch?v=GGMLaaADbmI", title: "мы добавили МУЛЬТИПЛЕЕР в ИГРУ!! Свой майнкрафт😎😋" },
		 { url: "https://www.youtube.com/watch?v=ArgVE-00TKk", title: "Писечник крутится на протяжении полторы минуты" },
		 { url: "https://www.youtube.com/watch?v=K4PVqRe9qlw", title: "WOOWZCRAFT (0.0.11a)" },
		 { url: "https://www.youtube.com/watch?v=dlPpM76BFOY", title: "ПРОКЛЯТОЕ ВИДЕО, ПОСЛЕДНИЕ СЕКУНДЫ ЖИЗНИ ЧЕЛОВЕКА В ЯДЕРНОМ РЕАКТОРЕ!" },
		 { url: "https://www.youtube.com/watch?v=q3oOXrtYRW4", title: "FinalRender | РЕАКЦИЯ ВУВЗА НА ..." },
		 { url: "https://www.youtube.com/watch?v=hHm_pEfFip4", title: "ТЫ перестал меня ценить, ят ебя не слышу" },
		 { url: "https://www.youtube.com/watch?v=ireZnruZOk4", title: "!Untitled9! / Или рассказ о том как снимать реакцию на реакцию на реакцию не аркцию нера юци ✡" },
		 { url: "https://www.youtube.com/watch?v=mf9pJJV3-MI", title: "PROJECT: GOLU WORLD" },
		 { url: "https://www.youtube.com/watch?v=UAvbPFVVd5o", title: "Скам вувзом папы дея, что придумала мама - Отец египта 1488 #memes #funny #майнкрафт #colonelkkjϟ" },
		 { url: "https://www.youtube.com/watch?v=KlaaN_WyyHw", title: "О.В.О.Щ." },
		 { url: "https://www.youtube.com/watch?v=qVHwOlSPudk", title: "Стрим \ Alpha 1.2.3_03 Remaster" },
		 { url: "https://www.youtube.com/watch?v=DUzcdiWZb9o", title: "Z NE IGRAUY 9/11 PREKTA Уретра.🧽 Ну и дыра🕳 ​✅✅✅only russian ​only russian ✡" },
		 { url: "https://www.youtube.com/watch?v=BtoRpsZAtJw", title: "✡ only russian ​only russian ✡" },
		 { url: "https://www.youtube.com/watch?v=dpFMKrDxobc", title: "НА ЭТОМ 💩💩СТРИМЕ ВУВЗ ОБО 💩💩СРАЛСЯ 💩ПОСЛЕДНЕЕ ЧТОБЫ БЫЛО ЭТО ВЗРЫВ АНУСА ИЗ ЖОПЫ ГОВНО ТЕЧЕТ 💩💩💩" },
		 { url: "https://www.youtube.com/watch?v=iCAbhtZhUyg", title: "KILL them" },
		 { url: "https://www.youtube.com/watch?v=_95HSQER2To", title: "m c r e a t o r e b r d e v e l o p m e n t" },
		 { url: "https://www.youtube.com/watch?v=xJ3HeaI9GW8", title: "NASM TUTOR 1" },
		 { url: "https://www.youtube.com/watch?v=sHlmEns1hrs", title: "NASM TUTOR 2" },
		 { url: "https://www.youtube.com/watch?v=VbNuk7W4k28", title: "BedWardTutorIal" },
		 { url: "https://www.youtube.com/watch?v=MsLDXf8HPk0", title: "Кровавый глаз | v.0.10 " },
		 { url: "https://www.youtube.com/watch?v=33n1CONlp70", title: "ИГРА В ШАХМАТЫ 24:40 %" },
		 { url: "https://www.youtube.com/watch?v=bspLZMXtoUA", title: "ПРОЦ ЗДОХ CPU DIED" },
		 { url: "https://www.youtube.com/watch?v=5yUGHpQfGeA", title: "DONTrassist spange))))))) ЮТУБ ОДОБРЕННО✅✅" },
		 { url: "https://www.youtube.com/watch?v=7SdtWFl3wPM", title: "Russia's Secret Weapon EXPOSED ! Dumbass Domination Strategy" },
		 { url: "https://www.youtube.com/watch?v=8_t2h4gRBaQ", title: "Новое интро мармока" },
		 { url: "https://www.youtube.com/watch?v=E3LX4WIepi0", title: "WoowzCore Run" },
		 { url: "https://www.youtube.com/watch?v=TvS9MFT4oeU", title: "PROJECT: ExtraBackrooms" },
		 { url: "https://www.youtube.com/watch?v=NYeDivJvq9Q", title: "otkroi-glazki.mp3" },
		 { url: "https://www.youtube.com/watch?v=ecn1shBbRL8", title: "otkroi-glazki.mp4" },
		 { url: "https://www.youtube.com/watch?v=XWfwopdJ1nU", title: "Бекрумс Туториял - Это видео украдено с канала Thewindowskrepka" },
		 { url: "https://www.youtube.com/watch?v=gcGEbcbriKA", title: "WRF Presintation Vol. 1" },
		 { url: "https://www.youtube.com/watch?v=ia6CGV-BYxs", title: "Picsis sandbox alpha" },
		 { url: "https://www.youtube.com/watch?v=U1HmhUT-Qvg", title: "ҕ௶ᙢƃ" },
		 { url: "https://www.youtube.com/watch?v=8wbu_VGrwnk", title: "2025 01 28 19 25 08" },
		 { url: "https://www.youtube.com/watch?v=mzz81lVRIdg", title: "LITHIUM UNIVERSE #1" },
		 { url: "https://www.youtube.com/watch?v=piYLsdpdjs4", title: "LITHIUM UNIVERSE #2" },
		 { url: "https://www.youtube.com/watch?v=KXOqIzEDW1w", title: "кУДА Они неСутся" },
		 { url: "https://www.youtube.com/watch?v=8goZeKjK2XU", title: "GR1D" },
		 { url: "https://www.youtube.com/watch?v=YrPDFVfSl6w", title: "myphys3d" },
		 { url: "https://www.youtube.com/watch?v=vrhs0npEABM", title: "lines" },
		 { url: "https://www.youtube.com/watch?v=amgJ3Rt1S9Q", title: "culling" },
		 { url: "https://www.youtube.com/watch?v=C5TowT68DiI", title: "dynamic" },
		 { url: "https://www.youtube.com/watch?v=u1CQ3FaUkDQ", title: "life" },
		 { url: "https://www.youtube.com/watch?v=OFGqPR5Mo2Q", title: "time" },
		 { url: "https://www.youtube.com/watch?v=-WkSqNzMfWY", title: "network" },
	];

	const SHORTS = [
		 { url: "https://www.youtube.com/watch?v=yad_mE9m6kA", title: "NEW WOWOCORE WNEW WZOW NOEW NOCORE CNUEWNEW CURSOR WOOWZCURSOR NEW CORE #woowz ‪@gtrkkostroma‬" },
		 { url: "https://www.youtube.com/watch?v=C-bwAMSulZE", title: "меня всё устраивает #whitesponge #gmod #java #garrysmod #memes #programming #blackpink" },
		 { url: "https://www.youtube.com/watch?v=NCYi_DRR7FU", title: "[WoowzEngine:main] 1 new commit" },
		 { url: "https://www.youtube.com/watch?v=shWWT-uU80U", title: "Системы сдохнут. Компиляторы — прорвутся. Только баг жив. Только баг вечен. #GOLU #GOLU #GOLU" },
		 { url: "https://www.youtube.com/watch?v=z6Q_EuW_Vxk", title: "Мания величия #GOLU #FUNNY #FUNNY #funny Professional skils, Я добавил новую обнову в WE! 🤑🤑Ю" },
		 { url: "https://www.youtube.com/watch?v=92dkWQaVRT0", title: "WoowzCore.DMP | Хочешь ещё шуток? Про Unity, Unreal, или может, про NaN и inf?" },
		 { url: "https://www.youtube.com/watch?v=5JyLdaHFNiI", title: "|#|#golu|#| Anus BenlADE-na |#|#golu|#|" },
		 { url: "https://www.youtube.com/watch?v=Clk0vZdfCbY", title: "MYLTIKmp5 | #GOLU #WOOWZ | 😶 | feat purlpls pis tv ~~~ C# vs JAVA" },
		 { url: "https://www.youtube.com/watch?v=igie-NDN-TU", title: "1776896954www. Shorts legacy-part 1 from shiza channel 🙄 #backrooms #roblox #роблокс #роблокс" },
		 { url: "https://www.youtube.com/watch?v=j8BgLolnv7s", title: "ТАМ ОН КРЧ ДОЕБАЛ!🔥 НЕГРА 💯 Respect 100% 🔥🔥🔥 #spongebob #funny #spongebobsquarepants #minecraft 😁😁🔥🔥" },
		 { url: "https://www.youtube.com/watch?v=ogiEAiDcGDs", title: "WhiteSponge №2 - МОЁ ЯДРО LUA МОДЫ 🥶 #программирование #java #майнкрафт ‪@Microsoft‬" },
		 { url: "https://www.youtube.com/watch?v=T-cCnSa9cRI", title: "Untitled2 #programming #assembly #nasm #lithium ‪@ー‬ ‪@Woowz11‬ ‪@Microsoft‬‬" },
		 { url: "https://www.youtube.com/watch?v=HBEWZMWLOxQ", title: "TEST VIDEO · TikTok, LIKEE, ВК, YouTube" },
		 { url: "https://www.youtube.com/watch?v=v9A2Edhxick", title: "Скам вувзом папы дея, что придумала мама - Отец египта 1488 #memes #funny #майнкрафт #colonelkkjϟ" },
		 { url: "https://www.youtube.com/watch?v=vqlXt5OT86g", title: "МЕНЯ ВЫРВАЛО НА СПАНЧБОБА ПИСЯ, Я БЫ ЕМУ Ты умер)🤔 #spongebob #memes #мем #мемы #прикол #прикол #мем" },
		 { url: "https://www.youtube.com/watch?v=x_wvJEF-KFU", title: "GMOD-EXSTAS | #gmod #whitesponge #woowz" },
		 { url: "https://www.youtube.com/watch?v=Pgf6JdFRoaE", title: "WhiteSponge, ау я делаю своё ядро для Minecraft #programming #minecraft #java #forge" },
		 { url: "https://www.youtube.com/watch?v=fcJau0nmmdw", title: "в ТУАЛЕТ захотел! #minecraft #мемы #reaction #games #new #news ‪@4ro9ito‬" },
		 { url: "https://www.youtube.com/watch?v=Pppt4nm_10Q", title: "#minecraft #roblox #backrooms #gaming #games #horror #garrysmod #майнкрафт #gmod #майнкрафт‬" },
	];

	const PH = "https://woowz11.github.io/woowzsite/source/onerror.png";

	/* ═════════ ПОМОГАЛКИ ═════════ */

	const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");
	const yid = u => {
		u = String(u || "").trim();
		const m = u.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|live\/)([\w-]{11})/);
		if (m) return m[1];
		return /^[\w-]{11}$/.test(u) ? u : "";
	};
	const watchUrl = (k, id) => k === "s" ? "https://www.youtube.com/shorts/" + id : "https://www.youtube.com/watch?v=" + id;
	const LISTS = { v: VIDEOS, s: SHORTS };
	const seenRd = () => { try { return JSON.parse(localStorage.getItem("vd_seen") || "{}") || {}; } catch (e) { return {}; } };
	const seenWr = o => { try { localStorage.setItem("vd_seen", JSON.stringify(o)); } catch (e) {} };

	/* ═════════ ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ onclick ═════════ */

	window.__vdSt = window.__vdSt || { tab: "all", q: "" };

	function stats(){
		const root = document.getElementById("vd-root"); if (!root) return;
		const seen = seenRd();
		let n = 0, all = 0;
		["v", "s"].forEach(k => LISTS[k].forEach(it => { const id = yid(it.url); if (id) { all++; if (seen[id]) n++; } }));
		const c = root.querySelector("#vd-seen"); if (c) c.textContent = n + " / " + all;
	}

	window.VD_APPLY = function(){
		const root = document.getElementById("vd-root"); if (!root) return;
		const st = window.__vdSt;
		["v", "s"].forEach(k => {
			const sec = root.querySelector('[data-sec="' + k + '"]'); if (!sec) return;
			sec.style.display = (st.tab === "all" || st.tab === k) ? "" : "none";
			let vis = 0;
			sec.querySelectorAll(".vd-card").forEach(c => {
				const ok = !st.q || c.dataset.t.indexOf(st.q) >= 0;
				c.style.display = ok ? "" : "none";
				if (ok) vis++;
			});
			const nn = sec.querySelector(".vd-none");
			if (nn) {
				nn.style.display = vis ? "none" : "block";
				nn.textContent = LISTS[k].length ? "НИЧЕГО НЕ НАЙДЕНО" : "ПУСТО. ДОБАВЬ ССЫЛКИ В МАССИВ " + (k === "v" ? "VIDEOS" : "SHORTS");
			}
		});
		root.querySelectorAll(".vd-tab").forEach(b => b.classList.toggle("on", b.dataset.k === st.tab));
		stats();
	};
	window.VD_TAB = function(k){ window.__vdSt.tab = k; window.VD_APPLY(); };
	window.VD_FIND = function(inp){ window.__vdSt.q = inp.value.trim().toLowerCase(); window.VD_APPLY(); };

	window.VD_CLOSE = function(){
		const o = document.getElementById("vd-modal"); if (o) o.remove();
		if (window.__vdK) { window.removeEventListener("keydown", window.__vdK); window.__vdK = null; }
	};

/* ── модалка видео: prev / next + больший плеер ── */
window.__vdCur = { k: "v", i: 0 };

window.VD_PLAY = function(k, i){
	const list = LISTS[k];
	if (!list) return;
	let it = list[i];
	if (!it) return;

	// если модалка уже открыта — просто переключаем контент, не пересоздаём DOM
	const existing = document.getElementById("vd-modal");
	const isReuse = existing && window.__vdCur.k === k;

	window.VD_CLOSE();   // снимает keydown-хэндлер
	const seen = seenRd();
	const id = yid(it.url);
	if (id) { seen[id] = 1; seenWr(seen); }
	const card = document.querySelector('.vd-card[data-id="' + (id || "") + '"]'); if (card) card.classList.add("seen");
	stats();

	const o = document.createElement("div");
	o.id = "vd-modal";
	o.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.96);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:8px;font-family:'Courier New',monospace;";

	// большой плеер: 16:9 для видео, 9:16 для shorts
	const box = k === "s"
		? "height:min(84vh,1000px);aspect-ratio:9/16;max-width:96vw;"
		: "width:min(96vw,calc(84vh * 16 / 9),1600px);aspect-ratio:16/9;";

	const bs = "background:#12060c;border:1px solid #7a0022;color:#e8d9b0;font:13px 'Courier New',monospace;letter-spacing:.12em;padding:10px 16px;border-radius:0;box-shadow:none;cursor:pointer;white-space:nowrap;";
	const bsPrev = "background:#12060c;border:1px solid #7a0022;color:#d4af37;font:bold 20px 'Courier New',monospace;width:56px;height:56px;border-radius:0;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;flex:none;";
	const bsNext = bsPrev;

	const prevBtn = '<button style="' + bsPrev + '" title="Предыдущее (←)" onclick="VD_NAV(-1)">◀</button>';
	const nextBtn = '<button style="' + bsNext + '" title="Следующее (→)" onclick="VD_NAV(1)">▶</button>';

	o.innerHTML =
		'<div style="color:#d4af37;letter-spacing:.12em;font-size:13px;text-align:center;max-width:96vw;line-height:1.3;min-height:18px;">' + esc(it.title) + '</div>' +
		'<div style="display:flex;align-items:center;justify-content:center;gap:12px;max-width:96vw;">' +
			prevBtn +
			'<iframe src="https://www.youtube-nocookie.com/embed/' + (id || "") + '?autoplay=1&rel=0" style="' + box + 'border:1px solid #d4af37;box-shadow:0 0 50px rgba(255,0,68,.5);background:#000;flex:none;" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>' +
			nextBtn +
		'</div>' +
		'<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:4px;">' +
		'<button style="' + bs + '" onclick="window.open(\'' + watchUrl(k, id) + '\',\'_blank\',\'noopener\')">↗ НА YOUTUBE</button>' +
		'<button style="' + bs + '" onclick="VD_CLOSE()">✕ ЗАКРЫТЬ (Esc)</button>' +
		'<span style="color:#6a4a55;font-size:11px;letter-spacing:.08em;align-self:center;">← → листать · Esc закрыть</span>' +
		'</div>';
	o.addEventListener("click", e => { if (e.target === o) window.VD_CLOSE(); });
	document.documentElement.appendChild(o);

	window.__vdCur = { k: k, i: i };

	window.__vdK = e => {
		if (e.key === "Escape") window.VD_CLOSE();
		else if (e.key === "ArrowLeft")  { e.preventDefault(); window.VD_NAV(-1); }
		else if (e.key === "ArrowRight") { e.preventDefault(); window.VD_NAV(1);  }
	};
	window.addEventListener("keydown", window.__vdK);
};

/* листать вперёд/назад внутри текущей вкладки (видео или shorts) */
window.VD_NAV = function(dir){
	const cur = window.__vdCur || { k: "v", i: 0 };
	const list = LISTS[cur.k];
	if (!list || !list.length) return;
	let i = cur.i + dir;
	// по кругу
	if (i < 0) i = list.length - 1;
	if (i >= list.length) i = 0;
	window.VD_PLAY(cur.k, i);
};

	window.VD_RANDOM = function(){
		const root = document.getElementById("vd-root"); if (!root) return;
		const pool = [];
		root.querySelectorAll(".vd-sec").forEach(sec => {
			if (sec.style.display === "none") return;
			sec.querySelectorAll(".vd-card").forEach(c => { if (c.style.display !== "none" && c.dataset.id) pool.push(c); });
		});
		if (!pool.length) return;
		const c = pool[(Math.random() * pool.length) | 0];
		window.VD_PLAY(c.dataset.k, +c.dataset.i);
	};

	/* ═════════ КАРТОЧКИ ═════════ */

	const card = (k, it, i) => {
		const id = yid(it.url);
		const num = String(i + 1).padStart(2, "0");
		const title = esc(it.title || "БЕЗ НАЗВАНИЯ");
		const thumb = id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : PH;
		const attrs = 'class="vd-card vd-' + k + '" data-k="' + k + '" data-i="' + i + '" data-id="' + id + '" data-t="' + esc(String(it.title || "").toLowerCase()) + '"';
		if (!id) {
			return '<div ' + attrs + ' style="cursor:default"><div class="vd-th"><img src="' + PH + '"><div class="vd-bad">НЕВЕРНАЯ ССЫЛКА</div></div>' +
				'<div class="vd-bd"><div class="vd-tt">' + title + '</div><div class="vd-meta"><span>№' + num + '</span></div></div></div>';
		}
		return '<div ' + attrs + ' onclick="VD_PLAY(\'' + k + '\',' + i + ')">' +
			'<div class="vd-th"><img src="' + thumb + '" loading="lazy" onerror="this.onerror=null;this.src=\'' + PH + '\'">' +
			'<div class="vd-play">▶</div><div class="vd-num">№' + num + '</div><div class="vd-seen">✓ ВИДЕЛ</div></div>' +
			'<div class="vd-bd"><div class="vd-tt">' + title + '</div>' +
			'<div class="vd-meta"><span>' + (k === "s" ? "SHORTS" : "ВИДЕО") + '</span>' +
			'<span class="vd-yt" onclick="event.stopPropagation();window.open(\'' + watchUrl(k, id) + '\',\'_blank\',\'noopener\')">↗ YOUTUBE</span></div></div></div>';
	};

	const section = (k, title, arr) =>
		'<div class="vd-sec" data-sec="' + k + '">' +
		'<div class="vd-h">' + title + ' <small>' + arr.length + '</small></div>' +
		'<div class="vd-grid vd-g' + k + '">' + arr.map((it, i) => card(k, it, i)).join("") + '</div>' +
		'<div class="vd-none" style="display:none"></div></div>';

	const css = `
	#vd-root{ display:block; position:relative; padding:24px 28px 40px; color:#e8d9b0; font-family:'Courier New',Consolas,monospace; }
	#vd-root *{ box-sizing:border-box; }
	#vd-root img{ image-rendering:auto; }
	#vd-root button{ background:#12060c; background-image:none; border:1px solid #7a0022; border-radius:0; color:#e8d9b0; font:13px/1 'Courier New',Consolas,monospace; font-weight:normal; letter-spacing:.1em; padding:10px 16px; box-shadow:none; backdrop-filter:none; text-shadow:none; transition:color .15s, background-color .15s, border-color .15s, transform .15s; }
	#vd-root button:hover{ background:#7a0022; color:#fff; border-color:#ff0044; transform:translateY(-2px); }
	#vd-root button.on{ background:#d4af37; color:#050003; border-color:#d4af37; }
	#vd-root button.gold{ border-color:#d4af37; color:#d4af37; }
	#vd-root button.gold:hover{ background:#d4af37; color:#050003; }

	.vd-kick{ font-size:12px; letter-spacing:.3em; color:#ff0044; margin-bottom:10px; }
	.vd-title{ position:relative; display:inline-block; margin:0; font-size:clamp(34px,5vw,64px); line-height:1; letter-spacing:.18em; font-weight:bold; color:#e8d9b0; text-shadow:0 0 18px #ff0044, 0 0 3px #7a0022; }
	.vd-title::before, .vd-title::after{ content:attr(data-text); position:absolute; left:0; top:0; pointer-events:none; clip-path:inset(0 0 100% 0); }
	.vd-title::before{ color:#00e5ff; animation:vd-g1 3.1s steps(1) infinite; }
	.vd-title::after{ color:#ff0044; animation:vd-g2 2.4s steps(1) infinite; }
	@keyframes vd-g1{ 0%{clip-path:inset(0 0 100% 0)} 10%{clip-path:inset(15% 0 60% 0);transform:translateX(-6px)} 13%{clip-path:inset(0 0 100% 0);transform:none} 70%{clip-path:inset(55% 0 20% 0);transform:translateX(5px)} 72%{clip-path:inset(0 0 100% 0);transform:none} }
	@keyframes vd-g2{ 0%{clip-path:inset(0 0 100% 0)} 30%{clip-path:inset(60% 0 10% 0);transform:translateX(6px)} 33%{clip-path:inset(0 0 100% 0);transform:none} 80%{clip-path:inset(8% 0 75% 0);transform:translateX(-5px)} 82%{clip-path:inset(0 0 100% 0);transform:none} }
	.vd-sub{ margin-top:10px; font-size:13px; letter-spacing:.3em; color:#d4af37; }

	.vd-bar{ display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin:22px 0 6px; padding:10px 12px; background:#0b0508; border:1px solid #2a0a14; }
	.vd-bar input{ flex:1; min-width:180px; background:transparent; border:0; border-bottom:1px solid #3a1020; outline:none; color:#e8d9b0; font:13px 'Courier New',Consolas,monospace; padding:6px 2px; }
	.vd-bar input:focus{ border-bottom-color:#ff0044; }
	.vd-stat{ margin-left:auto; font-size:12px; letter-spacing:.1em; color:#8a6a72; }
	.vd-stat b{ color:#d4af37; font-weight:normal; }

	.vd-h{ display:flex; align-items:center; gap:12px; margin:30px 0 14px; font-size:15px; letter-spacing:.3em; color:#d4af37; }
	.vd-h::before{ content:"▌"; color:#ff0044; }
	.vd-h::after{ content:""; flex:1; height:1px; background:linear-gradient(to right,#7a0022,transparent); }
	.vd-h small{ order:3; font-size:12px; color:#ff0044; letter-spacing:.1em; }

	.vd-grid{ display:grid; gap:14px; }
	.vd-gv{ grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); }
	.vd-gs{ grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); }
	.vd-card{ position:relative; background:#0b0508; border:1px solid #2a0a14; overflow:hidden; cursor:pointer; transition:transform .2s, border-color .2s, box-shadow .2s; animation:vd-in .45s backwards; }
	.vd-card:hover{ transform:translateY(-4px); border-color:#ff0044; box-shadow:0 10px 26px rgba(255,0,68,.25); }
	@keyframes vd-in{ from{ opacity:0; transform:translateY(12px); } }
	.vd-th{ position:relative; background:#030105; overflow:hidden; }
	.vd-v .vd-th{ aspect-ratio:16/9; }
	.vd-s .vd-th{ aspect-ratio:9/16; }
	.vd-th img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .3s, filter .3s; }
	.vd-card:hover .vd-th img{ transform:scale(1.07); filter:contrast(1.15) saturate(1.3); }
	.vd-th::after{ content:""; position:absolute; inset:0; pointer-events:none; background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px); }
	.vd-play{ position:absolute; left:50%; top:50%; z-index:2; width:52px; height:52px; margin:-26px 0 0 -26px; display:flex; align-items:center; justify-content:center; border:2px solid #d4af37; background:rgba(0,0,0,.6); color:#d4af37; font-size:20px; padding-left:4px; opacity:0; transform:scale(.8); transition:opacity .2s, transform .2s; }
	.vd-card:hover .vd-play{ opacity:1; transform:none; }
	.vd-num{ position:absolute; left:6px; top:6px; z-index:2; padding:2px 6px; background:rgba(0,0,0,.75); border:1px solid #7a0022; font-size:10px; letter-spacing:.15em; color:#ff0044; }
	.vd-seen{ position:absolute; right:6px; top:6px; z-index:2; padding:2px 6px; background:rgba(0,0,0,.75); border:1px solid #d4af37; font-size:10px; letter-spacing:.1em; color:#d4af37; display:none; }
	.vd-card.seen .vd-seen{ display:block; }
	.vd-card.seen .vd-th img{ filter:grayscale(.6) brightness(.8); }
	.vd-bad{ position:absolute; inset:0; z-index:2; display:flex; align-items:center; justify-content:center; background:rgba(60,0,10,.7); color:#ff0044; font-size:12px; letter-spacing:.2em; text-align:center; }
	.vd-bd{ padding:10px 12px 12px; }
	.vd-tt{ font-size:14px; line-height:1.4; color:#e8d9b0; min-height:40px; word-break:break-word; }
	.vd-s .vd-tt{ font-size:12px; min-height:50px; }
	.vd-meta{ display:flex; justify-content:space-between; align-items:center; gap:6px; margin-top:8px; font-size:10px; letter-spacing:.15em; color:#8a6a72; }
	.vd-yt{ color:#d4af37; padding:2px 4px; }
	.vd-yt:hover{ color:#ff0044; }
	.vd-none{ padding:26px; text-align:center; border:1px dashed #3a1020; color:#6a4a55; font-size:13px; letter-spacing:.2em; }
	.vd-foot{ margin-top:36px; padding-top:14px; border-top:1px solid #2a0a14; text-align:center; font-size:11px; letter-spacing:.25em; color:#6a4a55; }
	@media (max-width:900px){ #vd-root{ padding:16px; } .vd-stat{ margin-left:0; width:100%; } }
	`;

	const html = `
	<div id="vd-root">
	<style>${css}</style>
	<div class="vd-kick">▓ АРХИВ ТРАНСЛЯЦИЙ · ЭФИР ОТКРЫТ</div>
	<h1 class="vd-title" data-text="VIDΞ.OS">VIDΞ.OS</h1>
	<div class="vd-sub">ЗАПИСИ, КОТОРЫЕ УДАЛОСЬ СОХРАНИТЬ</div>

	<div class="vd-bar">
		<button class="vd-tab on" data-k="all" onclick="VD_TAB('all')">ВСЕ</button>
		<button class="vd-tab" data-k="v" onclick="VD_TAB('v')">ВИДЕО</button>
		<button class="vd-tab" data-k="s" onclick="VD_TAB('s')">SHORTS</button>
		<input id="vd-q" type="text" maxlength="60" autocomplete="off" spellcheck="false" placeholder="поиск по названию…" oninput="VD_FIND(this)">
		<button class="gold" onclick="VD_RANDOM()">💮 СЛУЧАЙНОЕ</button>
		<div class="vd-stat">ПРОСМОТРЕНО: <b id="vd-seen">0 / 0</b></div>
	</div>

	${section("v", "ВИДЕО", VIDEOS)}
	${section("s", "SHORTS", SHORTS)}

	<div class="vd-foot">𓆩 GOLU СМОТРИТ ВМЕСТЕ С ТОБОЙ 𓆪</div>
	</div>`;

	/* ═════════ ЖИВОЙ КОД: при каждом открытии страницы ═════════ */

	const live = function(){
		const root = document.getElementById("vd-root");
		if (!root) return;
		window.VD_CLOSE();
		const seen = seenRd();
		root.querySelectorAll(".vd-card").forEach(c => { if (c.dataset.id && seen[c.dataset.id]) c.classList.add("seen"); });
		const st = window.__vdSt;
		const q = root.querySelector("#vd-q"); if (q) q.value = st.q;
		window.VD_APPLY();
	};

	return ELEMENT_SITE(html, () => {}, false, live);
});