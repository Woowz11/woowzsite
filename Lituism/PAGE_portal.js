REGISTER_PAGE("portal", "->P0RTAL<-", function(){
	return ELEMENT_SITE(`
		<style>
		.lituism-portal-wrap {
			max-width: 1100px;
			margin: 0 auto;
			padding: 1rem 0.5rem 2rem;
		}

		.lituism-portal-title {
			position: relative;
			display: block;
			font-size: 2.8em;
			color: #ff0044;
			text-shadow: 0 0 30px #ff0044, 0 0 60px #ff004466, 0 0 100px #ff004422;
			text-align: center;
			letter-spacing: 10px;
			font-weight: 900;
			text-transform: uppercase;
			margin-bottom: 0.3rem;
			font-family: 'Courier New', monospace;
			animation: titleFlicker 6s infinite;
		}

		.lituism-portal-title::before,
		.lituism-portal-title::after {
			content: attr(data-text);
			position: absolute;
			top: 0; left: 0;
			width: 100%;
			pointer-events: none;
		}

		.lituism-portal-title::before {
			color: #00fff2;
			z-index: -1;
			animation: titleGlitch1 3.5s infinite linear alternate-reverse;
			opacity: 0.65;
		}

		.lituism-portal-title::after {
			color: #00ff44;
			z-index: -2;
			animation: titleGlitch2 2.2s infinite linear alternate-reverse;
			opacity: 0.55;
		}

		@keyframes titleFlicker {
			0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
			20%, 24%, 55% { opacity: 0.45; }
		}

		@keyframes titleGlitch1 {
			0%   { transform: translate(0,0);    clip-path: inset(0 0 85% 0); }
			10%  { transform: translate(-4px,0); clip-path: inset(10% 0 70% 0); }
			20%  { transform: translate(4px,0);  clip-path: inset(40% 0 40% 0); }
			30%  { transform: translate(-3px,0); clip-path: inset(70% 0 5% 0); }
			40%  { transform: translate(3px,0);  clip-path: inset(20% 0 60% 0); }
			50%  { transform: translate(0,0);    clip-path: inset(55% 0 25% 0); }
			60%  { transform: translate(-4px,0); clip-path: inset(5% 0 80% 0); }
			70%  { transform: translate(4px,0);  clip-path: inset(65% 0 15% 0); }
			80%  { transform: translate(-2px,0); clip-path: inset(30% 0 50% 0); }
			90%  { transform: translate(2px,0);  clip-path: inset(80% 0 5% 0); }
			100% { transform: translate(0,0);    clip-path: inset(0 0 90% 0); }
		}

		@keyframes titleGlitch2 {
			0%   { transform: translate(0,0);    clip-path: inset(80% 0 0 0); }
			15%  { transform: translate(3px,0);  clip-path: inset(30% 0 50% 0); }
			30%  { transform: translate(-3px,0); clip-path: inset(60% 0 10% 0); }
			45%  { transform: translate(4px,0);  clip-path: inset(10% 0 70% 0); }
			60%  { transform: translate(-4px,0); clip-path: inset(45% 0 35% 0); }
			75%  { transform: translate(2px,0);  clip-path: inset(75% 0 5% 0); }
			90%  { transform: translate(-2px,0); clip-path: inset(20% 0 65% 0); }
			100% { transform: translate(0,0);    clip-path: inset(50% 0 20% 0); }
		}

		.lituism-portal-sub {
			text-align: center;
			color: #ff2244;
			font-size: 0.8rem;
			letter-spacing: 6px;
			text-transform: uppercase;
			border-bottom: 1px solid #441122;
			padding-bottom: 1rem;
			margin-bottom: 2rem;
			font-family: 'Courier New', monospace;
		}

		.lituism-glitch-overlay {
			position: fixed;
			top: 0; left: 0;
			width: 100vw; height: 100vh;
			pointer-events: none;
			z-index: 9998;
			background: repeating-linear-gradient(
				15deg,
				transparent 0px,
				rgba(255, 0, 68, 0.1) 2px,
				transparent 4px, transparent 6px, transparent 8px
			);
			animation: glitchScan 0.5s linear infinite;
		}
		@keyframes glitchScan {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100%); }
		}

		.lituism-discord-feature {
			position: relative;
			background: linear-gradient(135deg, #0a0000 0%, #1a0008 100%);
			border: 2px solid #ff0044;
			border-radius: 12px 2px 12px 2px;
			padding: 1.5rem 2rem;
			margin-bottom: 2rem;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			text-decoration: none;
			display: flex;
			align-items: center;
			gap: 1.5rem;
			overflow: hidden;
			transition: all 0.2s ease;
			box-shadow: 0 0 40px rgba(255, 0, 68, 0.15);
			animation: discordPulse 2.5s ease-in-out infinite;
		}

		@keyframes discordPulse {
			0%, 100% { box-shadow: 0 0 40px rgba(255, 0, 68, 0.15); }
			50% { box-shadow: 0 0 70px rgba(255, 0, 68, 0.35); }
		}

		.lituism-discord-feature:hover {
			transform: translateY(-3px);
			border-color: #ff4488;
		}

		.lituism-discord-icon {
			font-size: 3.5rem;
			flex-shrink: 0;
			filter: drop-shadow(0 0 15px #ff0044);
			font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Segoe UI Symbol', sans-serif;
		}

		.lituism-discord-text { flex: 1; }

		.lituism-discord-title {
			font-size: 1.4rem;
			font-weight: 900;
			color: #ff4466;
			font-family: 'Courier New', monospace;
			letter-spacing: 2px;
			text-shadow: 0 0 20px rgba(255, 0, 68, 0.4);
			margin-bottom: 0.3rem;
			text-transform: uppercase;
		}

		.lituism-discord-desc {
			font-size: 0.8rem;
			color: #ff8899;
			font-family: 'Courier New', monospace;
			letter-spacing: 0.5px;
			line-height: 1.5;
		}

		.lituism-discord-cta {
			flex-shrink: 0;
			background: #ff0044;
			color: #000;
			font-family: 'Courier New', monospace;
			font-weight: 900;
			font-size: 0.75rem;
			letter-spacing: 1.5px;
			padding: 0.6rem 1.2rem;
			border-radius: 20px 4px 20px 4px;
			text-transform: uppercase;
			white-space: nowrap;
		}

		.lituism-portal-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
			gap: 1rem;
		}

		.lituism-portal-card {
			background: #0a0a0a;
			border: 2px solid #2a0a0a;
			border-radius: 8px 2px 8px 2px;
			padding: 1.2rem;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			text-decoration: none;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			transition: all 0.15s ease;
			position: relative;
		}

		.lituism-portal-card:hover {
			border-color: #ff0044;
			box-shadow: 0 0 20px red, 0 0 20px red, 0 0 20px red;
			transform: translateY(-2px);
			text-shadow: 0 0 5px red, 0 0 5px red, 0 0 5px red, 0 0 5px red, 0 0 5px red;
		}

		.lituism-portal-card-icon {
			font-size: 1.8rem;
			filter: drop-shadow(0 0 10px rgba(255, 0, 68, 0.4));
			line-height: 1;
			font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Segoe UI Symbol', sans-serif;
		}

		.lituism-portal-card-icon img {
			width: 40px;
			height: 40px;
			object-fit: contain;
			filter: drop-shadow(0 0 10px rgba(255, 0, 68, 0.4));
			border-radius: 6px;
		}

		.lituism-portal-card-title {
			font-size: 1rem;
			font-weight: 700;
			color: black;
			font-family: 'Courier New', monospace;
			letter-spacing: 1px;
			text-transform: uppercase;
		}

		.lituism-portal-card-desc {
			font-size: 0.7rem;
			color: white;
			font-family: 'Courier New', monospace;
			letter-spacing: 0.5px;
			line-height: 1.4;
		}

		.lituism-portal-card-status {
			position: absolute;
			top: 10px;
			right: 10px;
			font-size: 0.55rem;
			font-family: 'Courier New', monospace;
			letter-spacing: 1px;
			padding: 2px 8px;
			border-radius: 10px;
			text-transform: uppercase;
		}

		/* === Discord widget: 红色边框 + 红色滤镜 === */
		.lituism-discord-widget-frame {
			position: relative;
			margin: 2rem auto 2rem;
			max-width: 380px;
			padding: 2.2rem 0.7rem 0.7rem;
			background: #0a0000;
			border: 2px solid #ff0044;
			border-radius: 12px 2px 12px 2px;
			box-shadow: 0 0 40px rgba(255,0,68,0.25),
						inset 0 0 30px rgba(255,0,68,0.08);
			overflow: hidden;
		}

		.lituism-discord-widget-label {
			position: absolute;
			top: 0; left: 0; right: 0;
			padding: 0.45rem 0.8rem;
			font-family: 'Courier New', monospace;
			font-size: 0.65rem;
			letter-spacing: 3px;
			color: #ff4466;
			text-transform: uppercase;
			background: linear-gradient(90deg, #1a0008, #0a0000);
			border-bottom: 1px solid #ff004455;
			text-shadow: 0 0 10px rgba(255,0,68,0.6);
		}

		.lituism-discord-widget-frame iframe {
			display: block;
			width: 100%;
			border: 0;
			border-radius: 4px;
			filter: hue-rotate(125deg) saturate(3) brightness(0.9) contrast(2.1);
			background: transparent;
		}

		.lituism-discord-widget-frame::after {
			content: "";
			position: absolute;
			inset: 2.2rem 0.7rem 0.7rem;
			pointer-events: none;
			border-radius: 4px;
			background: repeating-linear-gradient(
				0deg,
				rgba(255,0,68,0.05) 0px,
				rgba(255,0,68,0.05) 1px,
				transparent 1px,
				transparent 3px
			);
			mix-blend-mode: overlay;
		}

		@media (max-width: 600px) {
			.lituism-discord-widget-frame { max-width: 100%; }
			.lituism-discord-widget-frame iframe { height: 380px; }
		}

		.status-online    { background: rgba(0,255,100,0.15); color: #00ff64; border: 1px solid #00ff6444; }
		.status-corrupted { background: rgba(255,170,0,0.15); color: #ffaa00; border: 1px solid #ffaa0044; }

		@media (max-width: 600px) {
			.lituism-discord-feature { flex-direction: column; text-align: center; padding: 1.2rem; }
			.lituism-portal-title { font-size: 1.8em; letter-spacing: 5px; }
			.lituism-portal-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
		}
		</style>

		<div class="lituism-glitch-overlay"></div>

		<div class="lituism-portal-wrap">
			<h1 class="lituism-portal-title" data-text="✦ П1TO1SW · P0ЯTA1 ✦">✦ LITUISM · P⊙RTAL ✦</h1>
			<div class="lituism-portal-sub glitch2">// ТОЧКИ ВХОДА В СИСТЕМУ BLOOD EYE SYSTEM //</div>

			<a href="https://discord.gg/YS76stJwVw" target="_blank" class="lituism-discord-feature">
				<div class="lituism-discord-icon">🎇️</div>
				<div class="lituism-discord-text">
					<div class="lituism-discord-title">Войти в общину спонсируемую GOLU</div>
					<div class="lituism-discord-desc">
						Discord-сервер Lituism. Архивы, Обсуждение Де-Артефактов,<br>
						Новые главы Woowzcore, Отладочный рендер и прямой контакт с наивысшей системой.
					</div>
				</div>
				<div class="lituism-discord-cta glitch2">⚡ JOIN REQUEST ⚡</div>
			</a>

			<div class="lituism-discord-widget-frame" id="lituismDiscordWidgetWrap">
				<div class="lituism-discord-widget-label">◈ LIVE FEED · GUILD NODE ◈</div>
				<iframe
					id="lituismDiscordIframe"
					src="https://discord.com/widget?id=1564700583645028404&theme=dark"
					width="100%"
					height="420"
					allowtransparency="true"
					frameborder="0"
					sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
				</iframe>
				<div id="lituismDiscordFallback" style="display:none; padding:1rem; text-align:center; font-family:'Courier New',monospace; font-size:0.72rem; color:#884444; line-height:1.6;">
					// УЗЕЛ DISCORD НЕДОСТУПЕН //<br>
					Проверьте: включён ли Server Widget в настройках сервера Discord.<br>
					<span style="opacity:0.6;">Server Settings → Widget → Enable Server Widget</span>
				</div>
			</div>

			<div class="lituism-portal-grid" id="portalGrid"></div>
		</div>

		<footer style="margin-top:2rem; text-align:center; font-size:0.7rem; color:#442222; letter-spacing:3px; font-family:'Courier New',monospace;">
			✴ LITUISM · P⊙RTAL v1.0 ✴<br>
			SYSTEM INTEGRITY: 34% 🩸
		</footer>
		`,
		function(){
			const bg = document.getElementById('MAIN');
			if (bg) {
				bg.style.background = 'radial-gradient(ellipse at center, #0a0000 0%, #000000 100%)';
				bg.style.color = '#ff4466';
				bg.style.padding = '0.5rem 0.5rem 2rem';
				bg.style.fontFamily = "'Courier New', monospace";
				bg.style.borderLeft = '3px solid #2a0a0a';
				bg.style.borderRight = '3px solid #2a0a0a';
			}
		},
		false,
		function(){

			const PORTAL_LINKS = [
				{
					icon: 'https://woowz11.github.io/woowzsite/source/specialforrandomsite/uranus.png',
					title: 'YT-CHANNEL',
					desc: 'КАНАЛ, где будут поститься ваши любимые видео про',
					url: 'https://www.youtube.com/@Woowz14',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/archive.png',
					title: 'YT-ARCHIVE',
					desc: '[АРХИВ] ВИДЕО YOUTUBE, если интересно что там было... смотрите архив он публичный... (ссылку на сайт найдите тут с архивом 🙄)',
					url: 'https://www.youtube.com/c/Woowz11',
					status: 'corrupted'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/889288636829429760.png',
					title: 'VK [Vulkan]',
					desc: 'Hello, it\'s me, Wologa',
					url: 'https://vk.ru/woowz14',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/face.png',
					title: 'РЕЦЕДИВ-СЕРВЕР-ДИСКОРД',
					desc: 'Этот сервер ошибка, на него нельзя зайти.',
					url: 'https://discord.gg/gAvtBhvNm5',
					status: 'corrupted'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/eyes.png',
					title: '𓀞𓀟𓀠𓀡𓀢𓀣𓀤𓀥𓀦𓀧𓀨𓀩𓀫𓀬𓀳',
					desc: 'IF YOU CONNECT, AUTOBAN',
					url: 'https://discord.gg/tZfDeYSrV3',
					status: 'corrupted'
				},
				{
					icon: '⚙',
					title: 'no one, left project',
					desc: '!!!WARNING!!!<br>&nbsp;&nbsp;&nbsp;&nbsp;TOXIC<br>!!!WARNING!!!',
					url: 'https://discord.gg/qWNN4DR4Tp',
					status: 'corrupted'
				},
				{
					icon: '🎵',
					title: 'TIKTAK',
					desc: 'NEVERDIED,ONLYLIVED',
					url: 'https://www.tiktok.com/@goluinsidetiktok',
					status: 'online'
				},
				{
					icon: '🕸',
					title: 'REjected',
					desc: 'REjected',
					url: 'https://www.youtube.com/@golithiumuniverse',
					status: 'corrupted'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/specialforrandomsite/woowz_cloth.png',
					title: '--> ТРЯПКА ТУТ! <--',
					desc: 'НИВКОЕМ СЛУЧАЕ НЕ ЗАХОДИТЕ В "ТРЯПКА"!!!',
					url: 'https://uk.pinterest.com/god_lithium_universe/',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/core-wiki/source/flame.gif',
					title: 'GAME-JOILT',
					desc: 'ГОВНО НЕ ВЫШЛО',
					url: 'https://gamejolt.com/@Woowz11',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/specialforrandomsite/le-Lego.png',
					title: 'ITCH.IO',
					desc: 'ГОВНО НЕ ВЫШЛО 2',
					url: 'https://woowz11.itch.io/',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/core-wiki/source/computer5.gif',
					title: 'GIT-HUB',
					desc: 'Самая опасная часть проекта',
					url: 'https://github.com/Woowz11',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/source/specialforrandomsite/image1.gif',
					title: 'WRF CREATOR',
					desc: 'Only heere',
					url: 'https://www.roblox.com/users/1734081766/profile',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/core-wiki/source/opengl.gif',
					title: 'AFRAID THAT PERSON',
					desc: 'PLAY WITH HIM',
					url: 'https://steamcommunity.com/id/woowz11/',
					status: 'online'
				},
				{
					icon: 'https://images.steamusercontent.com/ugc/15805356756049142994/2CB2CF9379BEB808EC9E74582083E1A45E28A91E/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
					title: 'ALSO TRY',
					desc: 'rajebyte',
					url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3813588732',
					status: 'online'
				},
				{
					icon: 'https://woowz11.github.io/woowzsite/core-wiki/source/pills-3d.gif',
					title: 'f слабо все сайты посмотреть? f',
					desc: '../',
					url: 'https://woowz11.github.io/woowzsite/quare.html',
					status: 'online'
				}
			];

			function PORTAL_forceEmojiPresentation(str) {
				if (!str) return str;
				const VS16 = '\uFE0F';
				if (str.endsWith(VS16)) return str;
				return str + VS16;
			}

			function PORTAL_renderIcon(icon) {
				if (typeof icon === 'string' && icon.startsWith('http')) {
					return `<div class="lituism-portal-card-icon"><img src="${icon}" alt="icon"></div>`;
				}
				const emoji = PORTAL_forceEmojiPresentation(icon);
				return `<div class="lituism-portal-card-icon">${emoji}</div>`;
			}

			const grid = document.getElementById('portalGrid');
			if (grid) {
				let html = '';
				for (const link of PORTAL_LINKS) {
					const statusHtml = link.status
						? `<div class="lituism-portal-card-status status-${link.status}">${link.status === 'online' ? '● ACTIVE' : '☣ CRPTD'}</div>`
						: '';
					html += `
					<a href="${link.url}" target="_blank" class="lituism-portal-card">
						${statusHtml}
						${PORTAL_renderIcon(link.icon)}
						<div class="lituism-portal-card-title">${link.title}</div>
						<div class="lituism-portal-card-desc">${link.desc}</div>
					</a>`;
				}
				grid.innerHTML = html;
			}

			// === Проверка доступности Discord Widget ===
			(function LITUISM_checkDiscordWidget() {
				const iframe = document.getElementById('lituismDiscordIframe');
				const fallback = document.getElementById('lituismDiscordFallback');
				if (!iframe || !fallback) return;

				let loaded = false;

				iframe.addEventListener('load', function () {
					loaded = true;
				});

				setTimeout(function () {
					if (!loaded) {
						iframe.style.display = 'none';
						fallback.style.display = 'block';
					}
				}, 6000);

				setTimeout(function () {
					if (loaded) {
						try {
							const rect = iframe.getBoundingClientRect();
							if (rect.height < 10) {
								iframe.style.display = 'none';
								fallback.style.display = 'block';
							}
						} catch (e) {}
					}
				}, 3000);
			})();

			console.log('✦ LITUISM PORTAL ИНИЦИАЛИЗИРОВАН ✦');
			console.log('📦 Виджетов:', PORTAL_LINKS.length);
		},
		false
	);
});