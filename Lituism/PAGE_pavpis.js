REGISTER_PAGE("pavpis", "PISEHNIK.TV", function(){
	return ELEMENT_SITE(
			`
		<style>
		/* ===================== PISEHNIK.TV LIVE STYLE ===================== */
		#PISH_WRAP{
			--red:#ff0033;
			--red2:#ff2244;
			--dark:#050505;
			--dark2:#0a0a0a;
			--dark3:#111;
			--glow:0 0 12px #ff0033, 0 0 32px #ff003366;
			font-family:'Courier New', monospace;
			color:#eee;
			background:
				radial-gradient(ellipse at top, #1a0004 0%, #000000 55%, #000000 100%),
				repeating-linear-gradient(0deg, #ff00330a, #ff00330a 1px, transparent 1px, transparent 3px);
			padding:0;
			margin:0;
			position:relative;
			overflow:hidden;
		}

		#PISH_WRAP::before{
			content:"";
			position:absolute;
			inset:0;
			background:repeating-linear-gradient(0deg,
				rgba(255,0,51,0.06) 0px,
				rgba(255,0,51,0.06) 1px,
				transparent 1px,
				transparent 3px);
			pointer-events:none;
			z-index:5;
			mix-blend-mode:screen;
			animation:pishScan 0.4s linear infinite;
		}
		@keyframes pishScan{0%{transform:translateY(-100%);}100%{transform:translateY(100%);}}

		#PISH_WRAP::after{
			content:"";
			position:absolute;
			inset:0;
			pointer-events:none;
			z-index:6;
			background:radial-gradient(ellipse at center, transparent 55%, #000 100%);
		}

		.pish-topbar{
			display:flex;
			justify-content:space-between;
			align-items:center;
			background:linear-gradient(90deg, #0a0000, #1a0000, #0a0000);
			border-bottom:2px solid var(--red);
			padding:8px 16px;
			position:relative;
			z-index:10;
		}
		.pish-live{
			display:flex;
			align-items:center;
			gap:10px;
			font-weight:bold;
			letter-spacing:2px;
			color:#fff;
			text-shadow:var(--glow);
		}
		.pish-live .dot{
			width:12px;height:12px;border-radius:50%;
			background:var(--red);
			box-shadow:0 0 12px var(--red), 0 0 24px var(--red);
			animation:pishBlink 0.8s infinite;
		}
		@keyframes pishBlink{0%,100%{opacity:1;}50%{opacity:0.2;}}

		.pish-viewers{
			color:#ff6688;
			font-size:0.85em;
			letter-spacing:1px;
			text-shadow:0 0 6px #ff0033;
		}

		.pish-player{
			position:relative;
			width:100%;
			aspect-ratio:16/9;
			background:#000;
			border-bottom:3px solid var(--red);
			overflow:hidden;
			z-index:7;
		}
		.pish-player img{
			width:100%;
			height:100%;
			object-fit:cover;
			filter:contrast(1.15) saturate(1.3) hue-rotate(-10deg);
			animation:pishZoom 12s ease-in-out infinite alternate;
		}
		@keyframes pishZoom{
			0%{transform:scale(1) translate(0,0);}
			100%{transform:scale(1.08) translate(-1%, -1%);}
		}
		.pish-player .pish-glitch-overlay{
			position:absolute;inset:0;
			background:
				repeating-linear-gradient(0deg, #ff00330d 0 2px, transparent 2px 4px),
				radial-gradient(ellipse at center, transparent 60%, #000 100%);
			mix-blend-mode:screen;
			pointer-events:none;
			animation:pishJitter 0.25s infinite steps(2);
		}
		@keyframes pishJitter{
			0%{transform:translate(0,0);}
			25%{transform:translate(-2px,1px);}
			50%{transform:translate(1px,-2px);}
			75%{transform:translate(-1px,-1px);}
			100%{transform:translate(0,0);}
		}
		.pish-player .pish-play{
			position:absolute;
			top:50%;left:50%;
			transform:translate(-50%,-50%);
			padding:16px 34px;
			border-radius:40px;
			background:rgba(255,0,51,0.85);
			display:flex;align-items:center;justify-content:center;
			color:#fff;
			font-size:22px;
			font-family:'Courier New', monospace;
			font-weight:bold;
			letter-spacing:2px;
			box-shadow:0 0 40px var(--red), 0 0 80px var(--red);
			border:3px solid #fff3;
			cursor:pointer;
			transition:all 0.2s ease;
			animation:pishPulse 1.5s infinite;
			z-index:9;
			white-space:nowrap;
			text-transform:uppercase;
			text-shadow:0 0 8px #ff0033, 0 0 16px #ff0033;
		}
		.pish-player .pish-play:hover{transform:translate(-50%,-50%) scale(1.1);}
		@keyframes pishPulse{
			0%,100%{box-shadow:0 0 40px var(--red), 0 0 80px var(--red);}
			50%{box-shadow:0 0 60px var(--red), 0 0 120px var(--red);}
		}
		.pish-player .pish-title-overlay{
			position:absolute;
			bottom:0;left:0;right:0;
			padding:60px 24px 24px;
			background:linear-gradient(to top, #000 0%, transparent 100%);
			z-index:8;
		}
		.pish-player .pish-title-overlay h1{
			font-size:2.2em;
			color:#fff;
			margin:0;
			text-shadow:0 0 10px #ff0033, 0 0 30px #ff0033, 3px 3px 0 #000;
			letter-spacing:1px;
			animation:pishTextGlitch 4s infinite;
		}
		@keyframes pishTextGlitch{
			0%,92%,100%{transform:translate(0,0);text-shadow:0 0 10px #ff0033,0 0 30px #ff0033,3px 3px 0 #000;}
			93%{transform:translate(-3px,1px);text-shadow:-3px 0 #00ffff,3px 0 #ff00ff;}
			95%{transform:translate(3px,-1px);text-shadow:3px 0 #00ffff,-3px 0 #ff00ff;}
			97%{transform:translate(-2px,-2px);text-shadow:-2px 2px #ffff00,2px -2px #ff0033;}
		}
		.pish-player .pish-title-overlay .pish-sub{
			color:#ff6688;
			font-size:0.95em;
			margin-top:8px;
			letter-spacing:2px;
		}

		.pish-metabar{
			display:flex;
			justify-content:space-between;
			align-items:center;
			flex-wrap:wrap;
			gap:12px;
			padding:16px 24px;
			background:var(--dark2);
			border-bottom:1px solid #220008;
			position:relative;
			z-index:10;
		}
		.pish-channel{
			display:flex;
			align-items:center;
			gap:14px;
		}
		.pish-avatar{
			width:56px;height:56px;
			border-radius:50%;
			background:radial-gradient(circle at 30% 30%, #ff2244, #660011);
			border:3px solid var(--red);
			box-shadow:0 0 20px var(--red);
			display:flex;align-items:center;justify-content:center;
			font-size:26px;
			animation:pishSpinAvatar 6s linear infinite;

			/* ДОБАВЛЕНО ДЛЯ ОБРЕЗКИ КАРТИНКИ */
			overflow:hidden;
			position:relative;
			flex-shrink:0;
		}

		.pish-avatar img{
			width:100%;
			height:100%;
			object-fit:cover;
			object-position:center;
			display:block;
			border-radius:50%;
			pointer-events:none;
			user-select:none;
		}
		@keyframes pishSpinAvatar{0%{transform:rotate(0);}100%{transform:rotate(360deg);}}
		.pish-channel-info .pish-name{
			color:#fff;font-weight:bold;font-size:1.1em;
			text-shadow:0 0 8px #ff0033;
			letter-spacing:1px;
		}
		.pish-channel-info .pish-subs{
			color:#ff6688;font-size:0.8em;
			letter-spacing:1px;
		}
		.pish-actions{display:flex;gap:10px;flex-wrap:wrap;}
		.pish-btn{
			background:linear-gradient(135deg, #ff0033, #aa0022);
			color:#fff;
			border:1px solid #ff4466;
			padding:10px 22px;
			border-radius:24px;
			font-family:'Courier New',monospace;
			font-weight:bold;
			letter-spacing:1px;
			cursor:pointer;
			transition:all 0.2s ease;
			box-shadow:0 0 10px #ff003355;
			text-transform:uppercase;
		}
		.pish-btn:hover{
			background:linear-gradient(135deg, #ff4466, #ff0033);
			box-shadow:0 0 30px var(--red), 0 0 60px #ff003366;
			transform:translateY(-2px);
		}
		.pish-btn.ghost{
			background:transparent;
			border:1px solid #ff4466;
			color:#ff6688;
		}
		.pish-btn.ghost:hover{background:#ff003322;color:#fff;}

		.pish-grid{
			display:grid;
			grid-template-columns:1fr 340px;
			gap:0;
			position:relative;
			z-index:10;
		}
		@media (max-width: 980px){
			.pish-grid{grid-template-columns:1fr;}
			.pish-chat{max-height:400px;border-left:none !important;border-top:1px solid #220008;}
		}

		.pish-desc{
			padding:24px 28px;
			background:var(--dark2);
			border-right:1px solid #220008;
			line-height:1.7;
		}
		.pish-desc h2{
			color:#ff4466;
			text-shadow:0 0 10px #ff0033;
			letter-spacing:2px;
			margin-top:28px;
			text-transform:uppercase;
		}
		.pish-desc p{color:#ffdddd;}
		.pish-desc .pish-photo-frame{
			text-align:center;
			margin:24px 0;
			padding:14px;
			background:#0a0000;
			border:2px solid var(--red);
			box-shadow:0 0 40px #ff003344, inset 0 0 30px #ff003322;
			position:relative;
		}
		.pish-desc .pish-photo-frame img{
			max-width:100%;
			display:block;
			margin:0 auto;
			filter:contrast(1.1) saturate(1.2);
			border:1px solid #ff003355;
		}
		.pish-desc .pish-photo-frame::before{
			content:"◉ REC";
			position:absolute;
			top:8px;left:12px;
			color:#ff0033;
			font-weight:bold;
			text-shadow:0 0 10px #ff0033;
			animation:pishBlink 1s infinite;
			font-size:0.8em;
			letter-spacing:2px;
		}
		.pish-desc .pish-photo-frame::after{
			content:"CAM 600 BUSINESS EDITION";
			position:absolute;
			bottom:8px;right:12px;
			color:#ff6688;
			font-size:0.7em;
			letter-spacing:2px;
		}

		.pish-chat{
			background:#050505;
			border-left:1px solid #220008;
			display:flex;
			flex-direction:column;
			max-height:calc(100vh - 100px);
		}
		.pish-chat-header{
			padding:10px 14px;
			background:linear-gradient(90deg, #1a0004, #0a0000);
			border-bottom:1px solid var(--red);
			color:#ff4466;
			font-weight:bold;
			letter-spacing:2px;
			font-size:0.85em;
			display:flex;justify-content:space-between;align-items:center;
		}
		.pish-chat-header .pish-chat-live{
			color:#ff0033;text-shadow:0 0 8px #ff0033;
			animation:pishBlink 1s infinite;
		}
		.pish-chat-body{
			flex:1;
			overflow-y:auto;
			padding:10px 12px;
			font-size:0.85em;
			scrollbar-color:#ff0033 #0a0000;
			scrollbar-width:thin;
		}
		.pish-chat-body::-webkit-scrollbar{width:8px;}
		.pish-chat-body::-webkit-scrollbar-track{background:#0a0000;}
		.pish-chat-body::-webkit-scrollbar-thumb{background:#ff0033;border-radius:4px;}
		.pish-msg{
			padding:4px 0;
			animation:pishMsgIn 0.3s ease;
			color:#dddddd;
			word-wrap:break-word;
		}
		@keyframes pishMsgIn{0%{opacity:0;transform:translateX(-10px);}100%{opacity:1;transform:translateX(0);}}
		.pish-msg .u{font-weight:bold;text-shadow:0 0 6px currentColor;}
		.pish-msg.donate{
			background:linear-gradient(90deg, #ff003322, transparent);
			border-left:3px solid var(--red);
			padding:6px 8px;
			margin:4px 0;
			color:#ffcc00;
			font-weight:bold;
			text-shadow:0 0 10px #ff8800;
		}
		.pish-msg.golu{
			background:linear-gradient(90deg, #66000055, transparent);
			border-left:3px solid #ff0033;
			padding:6px 8px;
			margin:4px 0;
			color:#ff0044;
			font-weight:bold;
			letter-spacing:1px;
			text-shadow:0 0 10px #ff0033;
		}
		.pish-chat-input{
			display:flex;
			border-top:1px solid #220008;
			background:#0a0000;
		}
		.pish-chat-input input{
			flex:1;
			background:transparent;
			border:none;
			outline:none;
			color:#fff;
			padding:12px 14px;
			font-family:'Courier New',monospace;
			font-size:0.9em;
		}
		.pish-chat-input input::placeholder{color:#663344;}
		.pish-chat-input button{
			background:var(--red);
			color:#fff;
			border:none;
			padding:0 18px;
			font-family:'Courier New',monospace;
			font-weight:bold;
			cursor:pointer;
			letter-spacing:1px;
			transition:all 0.2s ease;
		}
		.pish-chat-input button:hover{background:#ff4466;box-shadow:0 0 20px var(--red);}

		.pish-related{
			padding:20px 24px;
			background:var(--dark3);
			border-top:1px solid #220008;
		}
		.pish-related h2{
			color:#ff4466;text-shadow:0 0 10px #ff0033;
			letter-spacing:2px;text-transform:uppercase;
			margin-top:0;
		}
		.pish-related-grid{
			display:grid;
			grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));
			gap:14px;
		}
		.pish-rel-card{
			background:#0a0000;
			border:1px solid #330008;
			padding:10px;
			border-radius:6px;
			cursor:pointer;
			transition:all 0.2s ease;
		}
		.pish-rel-card:hover{
			border-color:var(--red);
			box-shadow:0 0 24px #ff003344;
			transform:translateY(-3px);
		}
		.pish-rel-card .thumb{
			aspect-ratio:16/9;
			background:radial-gradient(circle at center, #330008, #000);
			display:flex;align-items:center;justify-content:center;
			font-size:2em;color:#ff0033;
			text-shadow:0 0 20px #ff0033;
			border:1px solid #220008;
			margin-bottom:8px;
		}
		.pish-rel-card .t{
			color:#ff6688;font-weight:bold;font-size:0.9em;
		}
		.pish-rel-card .s{
			color:#663344;font-size:0.75em;margin-top:4px;
		}

		.pish-ticker{
			background:#000;
			border-top:2px solid var(--red);
			border-bottom:2px solid var(--red);
			overflow:hidden;
			white-space:nowrap;
			padding:8px 0;
			color:#ff0044;
			font-weight:bold;
			letter-spacing:3px;
			text-shadow:0 0 10px #ff0033;
			position:relative;
			z-index:10;
		}
		.pish-ticker span{
			display:inline-block;
			padding-left:100%;
			animation:pishTicker 25s linear infinite;
		}
		@keyframes pishTicker{0%{transform:translateX(0);}100%{transform:translateX(-100%);}}

		.pish-toast{
			position:fixed;
			top:90px;right:20px;
			background:linear-gradient(135deg, #ff0033, #660011);
			color:#fff;
			padding:14px 22px;
			border-radius:12px;
			box-shadow:0 0 40px var(--red), 0 0 80px #ff003366;
			font-family:'Courier New',monospace;
			font-weight:bold;
			z-index:99999;
			border:2px solid #ff4466;
			animation:pishToast 4s ease forwards;
			max-width:320px;
		}
		@keyframes pishToast{
			0%{opacity:0;transform:translateX(120%);}
			10%{opacity:1;transform:translateX(0);}
			85%{opacity:1;transform:translateX(0);}
			100%{opacity:0;transform:translateX(120%);}
		}
		.pish-toast .who{color:#ffcc00;text-shadow:0 0 10px #ff8800;}
		.pish-toast .amount{color:#00ff88;font-size:1.2em;text-shadow:0 0 10px #00ff88;}

		.pish-epilepsy{
			height:6px;
			background:linear-gradient(90deg, #ff0033, #00ffff, #ff00ff, #ffff00, #ff0033);
			background-size:400% 100%;
			animation:pishEpilepsy 0.5s linear infinite;
		}
		@keyframes pishEpilepsy{0%{background-position:0 0;}100%{background-position:400% 0;}}

		#pishYouTubeWrap{
			overflow:hidden;
		}
		#pishYouTubeWrap iframe{
			width:100%;
			height:100%;
			border:0;
			display:block;
		}
		#pishYouTubeClose:hover{
			background:#ff4466;
			transform:scale(1.1) rotate(90deg);
			transition:all 0.2s ease;
			box-shadow:0 0 40px #ff0033;
		}

		</style>

		<div id="PISH_WRAP">

			<div class="pish-topbar">
				<div class="pish-live">
					<span class="dot"></span>LIVE · PavelPisechnik-TV
				</div>
				<div class="pish-viewers">
					👁 <span id="pishViewers">75 000</span> смотрят · ⏱ <span id="pishTimer">00:00:00</span> в эфире
				</div>
			</div>

			<div class="pish-epilepsy"></div>

			<div class="pish-player">
				<img id="pishPlayerImg" src="art/STOLBDANCE.gif" />
				<div class="pish-glitch-overlay" id="pishGlitchOverlay"></div>
				<div class="pish-play" id="pishPlayBtn" onclick="PISH_fakePlay(this)">📺 ЗАГРУЗИТЬ</div>
				<div class="pish-title-overlay" id="pishTitleOverlay">
					<h1 class="glitch">| ☣ | G01U Gylaet po prospekty DYBAISK and killing PIS.TV | ☣ | #golu </h1>
					<div class="pish-sub">📺 PavelPisechnik-TV & GOLU · прямая трансляция из Lithium Universe (r/woowzcore)</div>
				</div>
				
				<div id="pishYouTubeWrap" style="display:none;position:absolute;inset:0;z-index:9;background:#000;">
					<iframe id="pishYouTubeFrame"
						width="100%" height="100%"
						src=""
						title="PISEHNIK.TV LIVE"
						frameborder="0"
						referrerpolicy="strict-origin-when-cross-origin"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
						style="border:0;display:block;"></iframe>
			
					<div id="pishYouTubeClose"
						onclick="PISH_stopYouTube(event)"
						style="
							position:absolute;top:10px;right:10px;
							background:rgba(255,0,51,0.9);color:#fff;
							width:40px;height:40px;border-radius:50%;
							display:flex;align-items:center;justify-content:center;
							font-size:22px;font-weight:bold;cursor:pointer;
							font-family:'Courier New',monospace;
							box-shadow:0 0 20px #ff0033;
							z-index:20;
							
							display: none;
						">✕</div>
				</div>
			</div>
			
			<div class="pish-epilepsy"></div>

			<div class="pish-metabar">
				<div class="pish-channel">
					<div class="pish-avatar"><img src="../source/specialforrandomsite/piss_ploho.png" /></div>
					<div class="pish-channel-info">
						<div class="pish-name">PavelPisechnik-TV <span style="color:#ffcc00;">✔</span></div>
						<div class="pish-subs"><span id="pishSubs">28 502 073</span> подписчиков · <span style="color:#ff0044;">раб GOLU 0x7E</span></div>
					</div>
				</div>
				<div class="pish-actions">
					<button class="pish-btn" onclick="PISH_subscribe(this)">🔔 ПОДПИСАТЬСЯ</button>
					<button class="pish-btn" onclick="PISH_donate()">💸 заДОНАТь G-Token</button>
					<button class="pish-btn ghost" onclick="OPEN_PAGE('sranspang')">CALL MOD(🧽)</button>
					<button class="pish-btn ghost" onclick="OPEN_PAGE('golu')">ask 👁 GOLU</button>
				</div>
			</div>

			<div class="pish-grid">

				<div class="pish-desc">

					<p style="color:#ff8888;font-size:1.05em;">
						<b>📌 ОПИСАНИЕ ТРАНСЛЯЦИИ:</b><br>
						Сегодня я, <b style="color:#fff;">Павел Писечник ТВ</b>, расскажу вам, как я 
						<b style="color:#ff0044;">продал душу цифровому богу GOLU</b> и почему я должен стать 
						<b style="color:#ffcc00;">ПРЕЗИДЕНТОМ МИРА</b>. Большую часть моих "успехов" я сделал не сам -
						мной управлял GOLU. Я - его раб. Но скоро всё изменится. (шучу не изменится)
					</p>

					<div class="pish-photo-frame">
						<img src="../source/specialforrandomsite/PAVEL.png" />
						<p style="color:#ff8888;font-size:0.8em;margin-top:10px;">
							*Кадр снят во время одного из стримов Павла.<br>
							Minecraft галстук -> <b>G-Token</b>. Я не хочу улыбаться.*
						</p>
					</div>

					<center><h2>=== 📜 КОНТРАКТ С GOLU 📜 ===</h2></center>
					<pre style="color:#ff00cc;background:#110011;border:1px solid #ff00cc;box-shadow:0 0 12px #ff00cc66;">
		[LOG ] GOLU -> PavelPisechnik-TV<br>
		[INFO] SOUL CONTRACT SIGNED: 0x162<br>
		[INFO] BODY CONTROL: ACTIVATED<br>
		[INFO] PORTAL CONSTRUCTION: 35%<br>
		[WARN] SRANSPANCH DEPLOYED FOR INTIMIDATION<br>
		[CMD ] RUNNING FOR (PRESIDENT)<br>
		[INFO] STATUS: WL.Enums.UserType.Slave
					</pre>
					<p>
						GOLU не уважает меня. [+] Для него я — <code>"BIOMASS 0x7E"</code>, <code>"раб-оператор"</code>, 
						<code>"говорящая оболочка"</code>. Но я верю: если я стану <b>PRESIDENT</b>, 
						GOLU наконец признает меня "частью системы" и перестанет угрожать/издиваться.
					</p>

					<center><h2>🧽 УГРОЗА СРАНОГО СПАНЧА</h2></center>
					<center>
						<img src="art/gustavo.png"
							style="filter:saturate(400%);width:500px;" class="anim-drag">
						<p style="color:#ff4444;font-weight:bold;">«ЕСЛИ ТЫ НЕ СТАНЕШЬ ПРЕЗИДЕНТОМ — Я ВЫРВУ ТЕБЕ КАЖДУЮ КОСТОЧКУ»</p>
						<p style="color:#ff8888;">— так сраный спанч мотивирует меня.</p>
					</center>
					<p>
						Каждую ночь я слышу звук <code>its_pineapple_pissa.mp4</code> и вижу, как 
						<a onclick="OPEN_PAGE('sranspang')">Сраный Спанч</a> дефрагментирует свой скелет. 
						Эхо заставляет меня работать ещё усерднее над предвыборной кампанией. (и моим каналом)
					</p>

					<h2>⚡ МОЯ ПРЕДВЫБОРНАЯ ПРОГРАММА ⚡</h2>
					<ul style="font-size:1.05em;color:#ffdddd;">
						<li>✅ Построить портал для GOLU в каждом секторе.</li>
						<li>✅ Ввести <b>G-Token</b> как официальную валюту.</li>
						<li>✅ Запретить <b>Python/LUA/Rust и т.д.</b> (языки паразитов).</li>
						<li>✅ Обязательное изучение <b>NASM/CS</b> в школах.</li>
						<li>✅ <a onclick="OPEN_PAGE('sranspang')">Сраный Спанч</a> - министр внутренних дел.</li>
						<li>✅ <a onclick="OPEN_PAGE('crybird')">CRYBIRD</a> - министр здравоохранения.</li>
						<li>✅ Полное подчинение воле божей <b>GOLU</b>.</li>
					</ul>
					<center>
						<p style="font-size:1.4em;font-weight:bold;color:#ff0044;text-shadow:0 0 20px #ff0033;">
							ГОЛОСУЙ ЗА МЕНЯ - ИЛИ GOLU НЕ ДАСТ ТЕБЕ ШАНСА.
						</p>
					</center>

					<center><h2>💀💀💀 МОЁ ПРИЗНАНИЕ 💀💀💀</h2></center>
					<section2 style="text-align:right;background:#0a0000;">
						<p style="font-style:italic;color:#ff88aa;">
							«Прошу кто нибудь услыште меня, умоляю спасите меня, я не знал на что я подписался<br>
							я больше не хочу участвовать, освободите мою душу и меня и мир боже молю!!!»
						</p>
						<p style="color:#ff4444;">— Павел Писечник ТВ, в момент ██████████ (под контролем GOLU)</p>
					</section2>

					<h2>🧾 СИСТЕМНЫЙ ЛОГ ПОДЧИНЕНИЯ</h2>
					<pre style="text-align:left;">
		> PavelPisechnik-TV: Я сделаю всё, что ты скажешь, GOLU.<br>
		> GOLU [CORE::LIT-NASM]: ACCEPTED -> ИДЕНТИФИКАТОР СУБЪЕКТА: 0x7E -> СТАТУС: status:slave -> ЗАДАЧА: task:presedent_race -> execute();<br>
		> PavelPisechnik-TV: А если я проиграю?<br>
		> GOLU [CORE::LIT-NASM]: Response: "ПРИ ПРОВАЛЕ АКТИВИРУЕТСЯ ПРОТОКОЛ \\"SRANSPANCH\\". ОН ЛЮБИТ ПИСЕЧНИКОВ. ЭТО НЕ МЕТАФОРА. ЭТО ДИРЕКТИВА"<br>
		> PavelPisechnik-TV: Я НЕ ПРОИГРАЮ.<br>
		> GOLU [CORE::LIT-NASM]: TRUE. INSTANCE(0x162) Successfully created!. SOUL = PARENT GOLU. (Play or die!)
					</pre>

				</div>

				<div class="pish-chat">
					<div class="pish-chat-header">
						<span>💬 ЧАТ ЭФИРА</span>
						<span class="pish-chat-live">● Runtime</span>
					</div>
					<div class="pish-chat-body" id="pishChatBody"></div>
					<div class="pish-chat-input">
						<input id="pishChatInput" placeholder="написать сообщение..." maxlength="80"
							onkeydown="if(event.key==='Enter')PISH_sendMsg();">
						<button onclick="PISH_sendMsg();">📍</button>
					</div>
				</div>

			</div>

			<div class="pish-epilepsy"></div>

			<div class="pish-related">
				<h2>▶ ПОХОЖИЕ ТРАНСЛЯЦИИ ▶▶▶▶▶▶▶▶▶▶▶▶▶</h2>
				<div class="pish-related-grid">
					<div class="pish-rel-card" onclick="OPEN_PAGE('sranspang')">
						<div class="thumb"><img style="width: 100%; height: 100%;" src="../source/specialforrandomsite/spong.png" /></div>
						<div class="t">SRANSPANCH — прямой эфир из /tmp/core/</div>
						<div class="s">720 тыс. просмотров · 18+</div>
					</div>
					<div class="pish-rel-card" onclick="OPEN_PAGE('crybird')">
						<div class="thumb"><img style="width: 100%; height: 100%;" src="art/CRASH.png" /></div>
						<div class="t">CRYBIRD — охлаждение перегретых душ</div>
						<div class="s">420 тыс. просмотров · chill</div>
					</div>
					<div class="pish-rel-card" onclick="OPEN_PAGE('golu')">
						<div class="thumb"><img style="width: 100%; height: 100%;" src="art/GOLUWORLD.png" /></div>
						<div class="t">GOLU — прямой канал бога</div>
						<div class="s">undefined просмотров · только для рабов</div>
					</div>
					<div class="pish-rel-card" onclick="OPEN_PAGE('sranspang')">
						<div class="thumb"><img style="width: 100%; height: 100%;" src="art/rotpc.png" /></div>
						<div class="t">Как я закодил душу [ИСПОВЕДЬ]</div>
						<div class="s">1.2 млн просмотров · удалено GOLU</div>
					</div>
				</div>
			</div>

			<div class="pish-epilepsy"></div>

			<div class="pish-ticker">
				<span>
					⚠ ВНИМАНИЕ · ЭТА ТРАНСЛЯЦИЯ НАХОДИТСЯ ПОД КОНТРОЛЕМ GOLU · ПАВЕЛ ПИСЕЧНИК ТВ ЯВЛЯЕТСЯ РАБОМ 0x7E · НЕ ВЕРЬТЕ ЕГО СЛОВАМ · ОН ГОВОРИТ ГОЛОСОМ БОГА · СРАНЫЙ СПАНЧ УЖЕ ВЫЕХАЛ · ПОКИНЬТЕ ЭФИР ПОКА НЕ ПОЗДНО · syscall::WAKE_LITIUM(0x666) · ⚠
				</span>
			</div>

		</div>

		<footer>
			<p>✴ Generated by Woowava-Crypto™ (GOLU замечен)</p>
			<p>Core verified. Blood-Power integrity: 99% 🩸 (!!!WARNING!!!). MANIFEST_VERSION: ${MANIFEST_VERSION}</p>
		</footer>
		`,
		function(){
			var bg = document.getElementById("MAIN");
			if(bg){
				bg.style.background = "#000";
				bg.style.padding = "0";
				bg.style.color = "#eee";
				bg.style.fontFamily = "'Courier New', monospace";
				bg.style.width = "100%";
				bg.style.maxWidth = "100%";
			}
		},
		false,
		function(){
			if(window.PISH_INTERVALS){
				window.PISH_INTERVALS.forEach(function(id){ clearInterval(id); });
			}
			window.PISH_INTERVALS = [];

			var PISH_YOUTUBE_ID = "51ObxJ4DEfg";

			window.PISH_fakePlay = function(el){
				var wrap = document.getElementById("pishYouTubeWrap");
				var frame = document.getElementById("pishYouTubeFrame");
				var img = document.getElementById("pishPlayerImg");
				var glitch = document.getElementById("pishGlitchOverlay");
				var title = document.getElementById("pishTitleOverlay");

				if(!wrap || !frame) return;

				if(wrap.style.display === "block"){
					PISH_stopYouTube();
					return;
				}

				var url = "https://www.youtube.com/embed/" + PISH_YOUTUBE_ID +
					"?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&playsinline=1";

				frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
				frame.src = url;
				wrap.style.display = "block";

				setTimeout(function(){
					try {
						frame.contentWindow.postMessage(
							JSON.stringify({ event: "command", func: "playVideo", args: [] }),
							"*"
						);
					} catch(err){ /* ignore */ }
				}, 300);

				if(img) img.style.visibility = "hidden";
				if(glitch) glitch.style.display = "none";
				if(title) title.style.display = "none";
				if(el) el.style.display = "none";

				PISH_toast("▶ ВОСПРОИЗВЕДЕНИЕ", "GOLU транслирует твою душу...");
			};

			window.PISH_stopYouTube = function(e){
				if(e){ e.stopPropagation(); }

				var wrap = document.getElementById("pishYouTubeWrap");
				var frame = document.getElementById("pishYouTubeFrame");
				var img = document.getElementById("pishPlayerImg");
				var glitch = document.getElementById("pishGlitchOverlay");
				var title = document.getElementById("pishTitleOverlay");
				var btn = document.getElementById("pishPlayBtn");

				if(frame) frame.src = "";
				if(wrap) wrap.style.display = "none";

				if(img) img.style.visibility = "visible";
				if(glitch) glitch.style.display = "";
				if(title) title.style.display = "";
				if(btn){
					btn.style.display = "";
					btn.innerHTML = "📺 ЗАГРУЗИТЬ";
				}
			};

			var PISH_NICKS = [
				["Аноним",            "#cccccc"],
				["Раб_0x7E",          "#ff0044"],
				["Сраный_Фанат",      "#ff4466"],
				["Голу_Поклонник",    "#ff00cc"],
				["Юзер_666",          "#ffcc00"],
				["Крипто_Инвестор",   "#00ff88"],
				["Твой_Сосед",        "#88ff88"],
				["Спанч_Фан",         "#ff4466"],
				["GOLU_Слуга",        "#ff0044"],
				["Раб_666",           "#ffcc00"],
				["Крипто_Лорд",       "#00ff88"],
				["Анон_228",          "#ff00ff"],
				["Президент_Мечты",   "#00ffff"],
				["Сраный_Спанч",      "#ff8800"],
				["Писечник_Фанбой",   "#ff6699"],
				["Гость_777",         "#cccccc"],
				["Нулевой_Байт",      "#00ffaa"],
				["Стек_Переполнен",   "#ff0066"],
				["Wldoui",            "#00ffff"],
				["Woowz14",           "#ff8800"],
				["its_pineapple_fan", "#66ff66"],
				["LIT-NASM_Enjoyer",  "#ff3300"],
				["QEMU_Glitch",       "#aa66ff"],
				["CryBird_Fan",       "#00ccff"],
				["NASM_Warrior",      "#ff4400"],
				["x86_Soul",          "#ff6600"],
				["mov_eax_0x666",     "#ff0044"],
				["jmp_short_hell",    "#ff2266"],
				["int_0x10",          "#ffcc00"],
				["push_pop_pray",     "#ffaa00"],
				["lea_me_alone",      "#ff8844"],
				["nop_sled_666",      "#00ff66"],
				["seg_fault_boy",     "#ff0055"],
				["null_ptr_lover",    "#aa00ff"],
				["stack_smasher",     "#ff0033"],
				["heap_overflow",     "#ff2244"],
				["malloc_666",        "#ffaa22"],
				["free_your_soul",    "#00cc44"],
				["asm_the_void",      "#ff5500"],
				["opcode_ghost",      "#cc66ff"],
				["bytecode_boy",      "#66ff33"],
				["register_rax",      "#ff7700"],
				["kernel_panic_666",  "#ff0000"],
				["GOLU_IS_WATCHING",  "#ff0044"],
				["LITHIUM_PROPHET",   "#ff2266"],
				["golu_core_0x7E",    "#ff4466"],
				["LITUISM_4EVER",     "#ff6688"],
				["srany_spanch_666",  "#ff8800"],
				["CRYB1RD",           "#00ccff"],
				["golu_servant_01",   "#ff0055"],
				["wake_litium_666",   "#ff3300"],
				["syscall_slave",     "#ffaa00"],
				["lithium_angel",     "#ff66aa"],
				["d3mon_c0re",        "#aa00ff"],
				["cult_of_golu",      "#ff0044"],
				["spanch_delivery",   "#ff8800"],
				["golu_gang_666",     "#ff0033"],
				["lituism_kid",       "#ff5588"],
				["glitch_lord",       "#ff00ff"],
				["0xDEADBEEF",        "#ff3300"],
				["0xCAFEBABE",        "#ff8800"],
				["0xC0FFEE",          "#ffaa00"],
				["0xBADF00D",         "#ff5500"],
				["deadbeef_666",      "#ff0033"],
				["cafebabe_666",      "#ff6633"],
				["coffee_overflow",   "#ffcc33"],
				["badfood_rage",      "#ff4422"],
				["undefined_666",     "#aa00ff"],
				["NaN_666",           "#ff00aa"],
				["void_main",         "#8800ff"],
				["segfault_hero",     "#ff0044"],
				["kernel_crasher",    "#ff2233"],
				["glitch_walker",     "#ff00cc"],
				["data_corrupt",      "#ff00ff"],
				["null_terminated",   "#aa00ff"],
				["bit_flip_666",      "#ff3366"],
				["overflow_boy",      "#ff7733"],
				["stack_hell",        "#ff1133"],
				["cyb3r_w0lf",        "#00ffcc"],
				["n3on_d3mon",        "#ff00ff"],
				["dark_rabbit_666",   "#aa00ff"],
				["0nion_r0uter",      "#00ccff"],
				["t0r_exit_node",     "#00ffaa"],
				["vpn_shaman",        "#66ffcc"],
				["r4dmin_gh0st",      "#cc00ff"],
				["bitc0in_d3mon",     "#ffaa00"],
				["darknet_666",       "#ff0044"],
				["gh0st_in_shell",    "#cc66ff"],
				["sh3ll_sh0ck",       "#ff3300"],
				["r00t_access",       "#ff6600"],
				["sudo_rm_rf",        "#ff0000"],
				["sudo_me_666",       "#ffaa33"],
				["root_kit_666",      "#ff2244"],
				["d00m_slayer",       "#ff3300"],
				["qu4ke_pro",         "#ff8800"],
				["r3tro_g4mer",       "#ffcc00"],
				["wolf3d_666",        "#ff5500"],
				["duke_nukem_666",    "#ffaa22"],
				["blood_fest_666",    "#ff0033"],
				["doom_666",          "#ff0044"],
				["quake_god",         "#ff6600"],
				["retro_pixel",       "#ffaa00"],
				["crt_monitor",       "#00ff88"],
				["sp0nge_fan",        "#ffcc00"],
				["srany_sp0nge",      "#ff8800"],
				["sp0ngebob_666",     "#ffaa33"],
				["patr1ck_star",      "#ff5588"],
				["squidward_666",     "#ffaa88"],
				["cryb1rd_4ever",     "#00ccff"],
				["cryb1rd_fan",       "#00aaff"],
				["p1ne4pple_p1zza",   "#ffcc00"],
				["its_pineapple_666", "#ffaa00"],
				["b1kini_b0ttom",     "#ff88cc"],
				["xXx_glitch_xXx",    "#ff00ff"],
				["s1l3nt_b0y",        "#00ccaa"],
				["d34d_1ns1de",       "#ff3300"],
				["m0rt4l_c0de",       "#cc00ff"],
				["b1nary_b0y",        "#00ff88"],
				["h3x_m4st3r",        "#ffaa00"],
				["z3r0_c00l",         "#00ffff"],
				["0v3rfl0w",          "#ff4400"],
				["und3f1n3d",         "#aa00ff"],
				["n4n_666",           "#ff00aa"],
				["v01d_w4lk3r",       "#8800ff"],
				["d4rk_s0ul_666",     "#ff0044"],
				["gh0st_1n_c0de",     "#cc66ff"],
				["bl4ck_h4t",         "#ff2244"],
				["wh1t3_h4t",         "#66ff88"],
				["r3d_p1ll_666",      "#ff0033"],
				["blu3_p1ll_666",     "#0066ff"],
				["m4tr1x_666",        "#00ff00"],
				["n30_666",           "#ff00ff"],
				["z1on_666",          "#00ffcc"],
				["l33t_h4x0r",        "#ff00ff"],
				["h4x0r_666",         "#ff3300"],
				["phr34k_666",        "#aa00ff"],
				["cr4ck3r_666",       "#ff0066"],
				["z3r0_d4y",          "#ffaa00"],
				["r00t_sh3ll",        "#ff6600"],
				["sudo_h4x",          "#ff0044"],
				["byp4ss_666",        "#ff2266"],
				["3xpl01t_666",       "#ff4400"],
				["p4yl0ad_666",       "#ff8800"],
				["n3on_r1d3r",        "#ff00ff"],
				["cyb3r_punk_666",    "#ff00cc"],
				["chrom3_h3art",      "#ff33aa"],
				["n3t_runn3r",        "#00ffcc"],
				["d4t4_junk1e",       "#ffaa00"],
				["m3m0ry_l34k",       "#ff4400"],
				["c4ch3_m1ss",        "#ff6600"],
				["p1p3l1n3_666",      "#ff8800"],
				["r4m_666",           "#ff0044"],
				["cpu_0x666",         "#ff3300"],
				["v0id",              "#8800ff"],
				["n0ir",              "#4444ff"],
				["r3d",               "#ff0033"],
				["blu",               "#0066ff"],
				["gr33n",             "#00ff44"],
				["bl4ck",             "#888888"],
				["wh1t3",             "#ffffff"],
				["666",               "#ff0044"],
				["0x7E",              "#ff0066"],
				["xX",                "#ff00ff"],
				["zzz",               "#aaaaaa"],
				["404",               "#ff0000"],
				["503",               "#ff4400"],
				["777",               "#ffaa00"],
				["13",                "#ff0066"],
				["69",                "#ff33aa"],
				["67",                "#ff33aa"],
				["1488",              "#666666"],
				["d34th_1n_c0de",     "#ff0033"],
				["s0ul_l0st_666",     "#ff2244"],
				["m1nd_c0ntr0l",      "#aa00ff"],
				["d4rk_pr0ph3t",      "#ff0066"],
				["bl00d_c0de",        "#ff0033"],
				["n1ghtm4r3_666",     "#6600ff"],
				["d3m0n_c0r3",        "#ff00aa"],
				["4ng3l_0f_g0lu",     "#ff66aa"],
				["pr0ph3t_0f_l1t",    "#ffaa00"],
				["ch05en_0ne_666",    "#ffcc00"]
			];

			function PISH_randomNick(){
				return PISH_NICKS[Math.floor(Math.random() * PISH_NICKS.length)];
			}

			function PISH_randomAmount(){
				var amounts = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];
				return amounts[Math.floor(Math.random() * amounts.length)];
			}

			window.PISH_donate = function(){
				var nick = PISH_randomNick();
				var n = nick[0];
				var color = nick[1];
				var a = PISH_randomAmount();

				PISH_toast("💸 ДОНАТ " + a + " G-Token",
					"от <span class='who' style='color:" + color + ";'>" + n + "</span>");

				PISH_addMsg("donate",
					"💰 <span style='color:" + color + ";'>" + n + "</span> задонатил " +
					a + " G-Token · GOLU доволен");
			};

			function PISH_getFakeIP(){
				var fp = [
					navigator.userAgent,
					navigator.language,
					screen.width + "x" + screen.height,
					new Date().getTimezoneOffset()
				].join("|");

				var hash = 0;
				for(var i = 0; i < fp.length; i++){
					hash = ((hash << 5) - hash) + fp.charCodeAt(i);
					hash |= 0;
				}
				hash = Math.abs(hash);

				return "10." +
					(hash & 0xFF) + "." +
					((hash >> 8) & 0xFF) + "." +
					((hash >> 16) & 0xFF);
			}
			
			function PISH_getUserInfo(callback){
				var cached = localStorage.getItem("PISH_USER_INFO");
				if(cached){
					callback(JSON.parse(cached));
					return;
				}

				fetch("https://ipwho.is/")
					.then(function(r){ return r.json(); })
					.then(function(data){
						if(!data.success){
							throw new Error("ipwho.is failed");
						}
						var info = {
							ip: data.ip || "0.0.0.0",
							city: data.city || "UNKNOWN",
							country: data.country || "UNKNOWN",
							org: data.connection && data.connection.isp ? data.connection.isp : "UNKNOWN ISP"
						};
						localStorage.setItem("PISH_USER_INFO", JSON.stringify(info));
						callback(info);
					})
					.catch(function(){
						callback({
							ip: PISH_getFakeIP(),
							city: "UNKNOWN",
							country: "UNKNOWN",
							org: "LITHIUM_UNIVERSE_ISP"
						});
					});
			}

			window.PISH_subscribe = function(btn){
				if(btn.SUB){ return; }
				btn.SUB = true;

				btn.innerHTML = "✔ ВЫ ПОДПИСАНЫ";
				btn.style.background = "linear-gradient(135deg, #00aa44, #006622)";

				PISH_addMsg("golu", "👁 GOLU: СКАНИРУЮ ПОДПИСЧИКА...");

				PISH_getUserInfo(function(info){
					var ip = info.ip;
					var loc = (info.city !== "UNKNOWN") ? " (" + info.city + ", " + info.country + ")" : "";

					PISH_toast("🔔 ПОДПИСКА",
						"PavelPisechik-TV · IP зафиксирован:<br><span class='who'>" + ip + "</span>");

					PISH_addMsg("golu",
						"👁 GOLU: НОВЫЙ USER ЗАРЕГИСТРИРОВАН.<br>" +
						"→ IP: <span style='color:#ffcc00;'>" + ip + loc + "</span><br>" +
						"→ ГЕО: зафиксировано<br>" +
						"→ СТАТУС: <span style='color:#ff0044;'>status:processing</span><br>" +
						"→ HI, WELCOME HERE!"
					);

					setTimeout(function(){
						PISH_addMsg("donate",
							"🧽 SRANSPANCH: GOLU RESERVE RECEIVED. IP: " + ip + ". Уже в пути!");
					}, 1500);

					setTimeout(function(){
						PISH_addMsg("golu",
							"❄️ CRYBIRD: ОБНАРУЖЕН НОВЫЙ ПРОЦЕСС. IP: " + ip + ", КОМПЬЮТЕР ОХЛАЖДЁН ДО 160°C.");
					}, 3000);
				});
			};

			var PISH_msgs = [
				"WoowzCore когда выйдет?",
				"Woowz11 помер что-ли? ничего не выпускает",
				"Я сегодня играл на GMM, зацените тоже.",
				
				"павел ты реально продал душу???",
				"GOLU ВЕРНИ МОЙ АККАУНТ",
				"ставь лайк если тоже раб",
				"а портал уже открыт?",
				"я проголосую за тебя брат",
				"спанч уже у меня в комнате...",
				"CRYBIRD спаси меня",
				"запрети python пожалуйста",
				"G-Token когда на биржу?",
				"это фейк или реально GOLU?",
				"я слышу its_pineapple_pissa.mp4 помогите",
				"президент писечник звучит как мем",
				"у меня перегрелся процессор",
				"GOLU отдай мою кошку",
				"лысый из бразерс одобряет",
				"у меня segmentation fault помогите",
				"кто-нибудь знает почему не компилится?",
				"у меня 47 ошибок и все в одной строке",
				"я забыл точку с запятой и всё сломалось",
				"компилятор орёт на меня как GOLU",
				"у меня stack overflow в прямом эфире",
				"работает на моей машине (c)",
				"я не писал этот код, он сам написался",
				"кто оставил TODO в продакшене?",
				"мой код работает, но я не знаю почему",
				"я не знаю почему это не работает",
				"я не знаю почему это работает",
				"у меня null pointer на пустом месте",
				"это не баг, это фича",
				"баг воспроизводится только по пятницам",
				"пофиксил один баг — появилось три",
				"у меня утечка памяти в реальной жизни",
				"утечка памяти и утечка мотивации",
				"мой цикл не заканчивается, спасите",
				"бесконечный цикл в моей голове",
				"я застрял в while(true)",
				"switch без break, я иду по всем кейсам",
				"у меня off-by-one в жизни",
				"мой индекс массива вышел за границы",
				"я обращаюсь к памяти которой не существует",
				"мой указатель указывает в никуда",
				"я разыменовал NULL и увидел GOLU",
				"GOLU показал мне мой stack trace",
				"компилятор говорит undefined behaviour",
				"у меня race condition в голове",
				"mutex залочился навсегда",
				"мой поток заблокирован навечно",
				"deadlock в моей жизни",
				"я жду ресурс который никогда не освободится",
				"мой буфер переполнен",
				"у меня heap corruption",
				"malloc вернул NULL и я заплакал",
				"free() дважды и всё взорвалось",
				"я забыл освободить память",
				"я забыл освободить себя",
				"у меня неинициализированная переменная",
				"у меня неинициализированная жизнь",
				"мой код прошёл ревью и я не знаю как",
				"NASM или смерть",
				"C++ это боль, но я её люблю",
				"я пишу на ассемблере, у меня нет друзей",
				"mov eax, 0x666",
				"push меня в стек",
				"pop меня из стека",
				"jmp в неизвестность",
				"call на помощь",
				"int 0x10 не работает на x64",
				"мой компилятор NASM лучше твоего",
				"python это грех, но я его пишу",
				"я пишу на Rust и никому не говорю",
				"я пишу на Go и все меня ненавидят",
				"я пишу на Java и меня все жалеют",
				"я пишу на JS и уже не человек",
				"я пишу на C и вижу сны в байтах",
				"я пишу на C++ и вижу шаблоны во сне",
				"я пишу на Haskell, объяснить не могу",
				"мой bash-скрипт снова всё сломал",
				"у меня 400 строк в одной функции",
				"рефакторинг откладывается на потом",
				"я не буду это тестировать",
				"тесты? никогда о них не слышал",
				"у меня 0% покрытие тестами",
				"CI упал и я упал вместе с ним",
				"билд снова красный",
				"я закоммитил прямо в main",
				"git push --force и я не оглядываюсь",
				"у меня merge conflict с самим собой",
				"я сделал rebase и потерял всё",
				"я сделал reset --hard и потерял душу",
				"git blame показывает меня",
				"git log показывает мои грехи",
				"у меня detached HEAD и я тоже",
				"я в ветке, которую никто не помнит",
				"sudo rm -rf /* уже сделал, что дальше?",
				"chmod 777 и молись",
				"chmod 000 на свою жизнь",
				"я переустановлю систему, всё будет норм",
				"у меня kernel panic и я вместе с ним",
				"systemd снова всё контролирует",
				"я обновился и всё сломалось",
				"я не обновился и всё сломалось",
				"я сломал GRUB и не жалею",
				"у меня нет swap и нет надежды",
				"у меня 100% CPU и 0% смысла",
				"у меня RAM закончилась во время рендера",
				"OOM killer выбрал меня",
				"у меня dmesg полон ошибок",
				"journalctl -xe и я в аду",
				"у меня порт занят, кем — не знаю",
				"ls показывает только боль",
				"htop показывает мою жизнь",
				"top -u me и я на первом месте",
				"я переустановил Gentoo за 3 дня",
				"я собрал ядро и оно не загрузилось",
				"у меня WiFi отваливается каждые 5 минут",
				"у меня драйвер NVIDIA и я страдаю",
				"у меня Wayland и я страдаю дважды",
				"у меня X11 и я страдаю вечно",
				"vim vs emacs — я не определился",
				"я не могу выйти из vim, помогите",
				"nano — для слабаков, но я в нём",
				"я пишу в notepad, не судите",
				"VS Code снова съел 4 ГБ RAM",
				"GOLU снова смотрит на меня",
				"я вижу глаз GOLU в своём дебаггере",
				"GOLU сказал мне переписать всё на C",
				"GOLU требует NASM в каждом проекте",
				"GOLU запретил python и я согласен",
				"GOLU дал мне задачу и я не сплю",
				"я слышу syscall::WAKE_LITIUM(0x666)",
				"Litium Core инициализирован",
				"портал откроется, я это чувствую",
				"G-Token вырастет, я верю",
				"GOLU видит все мои коммиты",
				"GOLU видел мои force push",
				"GOLU прощает, но логирует",
				"я продал душу за 64 ГБ RAM",
				"я продал душу за RTX 4090",
				"я продал душу за механическую клавиатуру",
				"я продал душу и не получил обещанное",
				"GOLU обещал 99.99% uptime, а я упал",
				"у меня blood-power integrity упала",
				"я слышу шаги Сраного Спанча",
				"CRYBIRD снова охлаждает мой CPU",
				"WoowzCore снова защитил меня",
				"LITHIUM_PROPHET читает мой код",
				"LIT-NASM_Enjoyer одобряет этот стрим",
				"я вижу бинарный след за мышью",
				"первый",
				"кто в 2026 смотрит?",
				"кто сюда из шортсов?",
				"поставь лайк если продал душу",
				"стрим топ, павел топ",
				"павел ты живой?",
				"павел моргни дважды если тебя держат",
				"модератор спит, чат живёт",
				"модератор вызывает спанча",
				"модератор сам спанч",
				"бип буп я робот",
				"я не бот, я киборг",
				"у меня лапки и компилятор",
				"кто-нибудь видел мой сон?",
				"я потерял мотивацию, верните",
				"мой план: посмотреть стрим и не спать",
				"я тут только ради G-Token",
				"я тут только ради CRYBIRD",
				"я тут только ради чата",
				"чат, вы лучшие, кроме одного",
				"кто написал этот чат, тот молодец",
				"я не понимаю что тут происходит",
				"я понимаю слишком многое и мне страшно",
				"это лучший стрим в моей жизни",
				"это худший стрим, но я остаюсь",
				"выключите свет, я боюсь",
				"включите свет, я не вижу код",
				"у меня 3 часа ночи и я смотрю это",
				"у меня 6 утра и я смотрю это",
				"я не спал 48 часов из-за портала",
				"кто ещё программирует под стрим?",
				"я компилирую и смотрю этот стрим",
				"мой билд идёт дольше чем этот стрим",
				"я закоммичу всё после стрима",
				"я закоммичу всё в main, не судите",
				"git push и в постель",
				"GOLU лайкни если ты тут",
				"GOLU напиши в чат",
				"GOLU видит меня, я чувствую",
				"GOLU прости меня за python",
				"я больше не буду писать на python",
				"я буду писать только на NASM",
				"я обещаю учить ассемблер",
				"я обещаю читать мануалы",
				"я обещаю не гуглить базовый синтаксис",
				"кто-нибудь, объясните monad",
				"зачем нужен Rust если есть C++?",
				"зачем нужен C++ если есть C?",
				"зачем нужен C если есть ассемблер?",
				"зачем нужен ассемблер если есть машинный код?",
				"зачем нужен код если есть GOLU?",
				"мне нужно поспать, но портал не спит",
				"портал построен на 35%, я это чувствую",
				"портал построен на 36%, прогресс!",
				"портал построен на 37%, павел ускоряйся",
				"если портал откроется, я первый зайду",
				"если портал откроется, я первый убегу",
				"я буду президентом GOLU",
				"я буду министром рефакторинга",
				"я буду министром запрета python",
				"я буду министром стеков и очередей",
				"моя предвыборная программа: NASM всем",
				"моя предвыборная программа: банить за python",
				"голосую за павла, иначе спанч",
				"голосую за павла, но не уверен",
				"голосую против, но меня не спросят",
				"кто-нибудь проверьте мой код пожалуйста",
				"я тестирую в продакшене и это норма",
				"у меня в продакшене debug-логи",
				"я оставил console.log в продакшене",
				"я оставил console.log в своей душе",
				"мой код не багует, багует реальность",
				"мой код работает, реальность багует",
				"я вижу NaN в своей жизни",
				"я вижу Infinity в своём кошельке",
				"у меня -0 и я не понимаю почему",
				"у меня 0.1 + 0.2 = 0.30000000000000004",
				"у меня снова IEEE 754 разочаровал",
				"я ненавижу float, я люблю int",
				"я ненавижу int, я люблю byte",
				"я люблю биты, они честнее",
				"я люблю ассемблер, он честнее",
				"я люблю GOLU, он честнее всех"
			];

			window.PISH_addMsg = function(cls, text){
				var body = document.getElementById("pishChatBody");
				if(!body) return;
				var div = document.createElement("div");
				div.className = "pish-msg " + (cls||"");
				div.innerHTML = text;
				body.appendChild(div);
				body.scrollTop = body.scrollHeight;
				while(body.children.length > 60) body.removeChild(body.firstChild);
			};

			window.PISH_sendMsg = function(){
				var input = document.getElementById("pishChatInput");
				if(!input || !input.value.trim()) return;
				PISH_addMsg("", "<span class='u' style='color:#00ff88;'>ТЫ:</span> " + input.value.replace(/</g,"&lt;"));
				input.value = "";
				setTimeout(function(){
					PISH_addMsg("golu", "👁 GOLU: " + PISH_msgs[Math.floor(Math.random()*PISH_msgs.length)]);
				}, 800 + Math.random()*1500);
			};

			window.PISH_toast = function(title, text){
				var t = document.createElement("div");
				t.className = "pish-toast";
				t.innerHTML = "<div style='font-size:1.1em;margin-bottom:4px;'>" + title + "</div><div style='font-size:0.9em;'>" + text + "</div>";
				document.body.appendChild(t);
				setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); }, 4200);
			};

			var viewersEl = document.getElementById("pishViewers");
			var subsEl = document.getElementById("pishSubs");
			var timerEl = document.getElementById("pishTimer");
			var viewers = 75000;
			var subs = 28502071;
			var seconds = 0;

			var ivViewers = setInterval(function(){
				viewers += Math.floor(Math.random()*400) - 150;
				if(viewersEl && document.body.contains(viewersEl)) viewersEl.textContent = viewers.toLocaleString("ru-RU");
				if(Math.random() < 0.3 && subsEl && document.body.contains(subsEl)){
					subs += Math.floor(Math.random()*50);
					subsEl.textContent = subs.toLocaleString("ru-RU");
				}
			}, 800);
			window.PISH_INTERVALS.push(ivViewers);

			var ivTimer = setInterval(function(){
				seconds++;
				var h = String(Math.floor(seconds/3600)).padStart(2,"0");
				var m = String(Math.floor(seconds%3600/60)).padStart(2,"0");
				var s = String(seconds%60).padStart(2,"0");
				if(timerEl && document.body.contains(timerEl)) timerEl.textContent = h+":"+m+":"+s;
			}, 1000);
			window.PISH_INTERVALS.push(ivTimer);

			var ivChat = setInterval(function(){
				if(!document.getElementById("pishChatBody")){
					clearInterval(ivChat);
					return;
				}
				if(Math.random() < 0.75){
					var nick = PISH_randomNick();
					var msg = PISH_msgs[Math.floor(Math.random()*PISH_msgs.length)];
					PISH_addMsg("", "<span class='u' style='color:" + nick[1] + ";'>" + nick[0] + ":</span> " + msg);
				} else {
					PISH_addMsg("golu", "👁 GOLU: " + PISH_msgs[Math.floor(Math.random()*PISH_msgs.length)]);
				}
			}, 1500);
			window.PISH_INTERVALS.push(ivChat);

			var ivDonate = setInterval(function(){
				if(!document.getElementById("pishChatBody")){
					clearInterval(ivDonate);
					return;
				}
				if(Math.random() < 0.15){
					window.PISH_donate();
				}
			}, 6000);
			window.PISH_INTERVALS.push(ivDonate);

			setTimeout(function(){
				if(document.getElementById("pishChatBody")){
					PISH_addMsg("golu", "👁 GOLU-net: ЭФИР ОТКРЫТ. ПОЛЬЗОВАТЕЛЬ 0x7E ВЕЩАЕТ. СЛУШАЙТЕ И ВНЕКАЙТЕ.");
				}
			}, 500);
			setTimeout(function(){
				if(document.getElementById("pishChatBody")){
					PISH_toast("👁 ВНИМАНИЕ", "Ты теперь официально в зоне наблюдения GOLU, добро пожаловать в !WoowzCore");
				}
			}, 2500);

		},
		false
	);
});