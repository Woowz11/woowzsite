REGISTER_PAGE("artsreal", "🖼", function(){
	return ELEMENT_SITE(`
		<style>
		/* ===== ОСНОВНОЙ КОНТЕЙНЕР ===== */
		.lituism-gallery-wrap {
			max-width: 1600px;
			margin: 0 auto;
			padding: 0.5rem;
		}

		.lituism-gallery-title {
			font-size: 2.8em;
			color: #ff0044;
			text-shadow: 0 0 30px #ff0044, 0 0 60px #ff004466, 0 0 100px #ff004422;
			text-align: center;
			letter-spacing: 10px;
			font-weight: 900;
			text-transform: uppercase;
			margin-bottom: 0.3rem;
			font-family: 'Courier New', monospace;
		}

		.lituism-gallery-sub {
			text-align: center;
			color: #ff2244;
			font-size: 0.8rem;
			letter-spacing: 6px;
			text-transform: uppercase;
			border-bottom: 1px solid #441122;
			padding-bottom: 1rem;
			margin-bottom: 1.5rem;
			font-family: 'Courier New', monospace;
		}

		/* ===== СЕТКА ГАЛЕРЕИ ===== */
		.lituism-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			gap: 1rem;
			padding: 0.5rem;
		}

		/* ===== КАРТОЧКА ===== */
		.lituism-card {
			background: #0a0a0a;
			border: 2px solid #2a0a0a;
			border-radius: 8px 2px 8px 2px;
			padding: 0.5rem;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.15s ease;
			position: relative;
			box-shadow: 0 2px 10px rgba(255, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
		}

		.lituism-card:hover {
			border-color: #ff0044;
			box-shadow: 0 0 20px rgba(255, 0, 68, 0.2);
			transform: translateY(-2px);
		}

		.lituism-card-img-wrap {
			width: 100%;
			aspect-ratio: 4/3;
			overflow: hidden;
			border-radius: 6px 2px 6px 2px;
			background: #050505;
			position: relative;
			background: linear-gradient(
				135deg,
				#ff0000, #3bff00, #ff00f2, #ffd800, #00ffec, #0015ff, #ff7400
			);
			background-size: 400% 400%;
			animation: galleryGradientShift 1s ease infinite;
		}

		@keyframes galleryGradientShift {
			0% { background-position: 0% 50%; }
			25% { background-position: 50% 0%; }
			50% { background-position: 100% 50%; }
			75% { background-position: 50% 100%; }
			100% { background-position: 0% 50%; }
		}

		.lituism-card-img-wrap img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
			transition: all 0.3s ease;
			border: 1px solid #1a0a0a;
			position: relative;
			z-index: 1;
			background: transparent;
		}

		.lituism-card:hover .lituism-card-img-wrap img {
			transform: scale(1.03);
			border-color: #ff004466;
		}

		.lituism-card-info {
			padding: 0.4rem 0.1rem 0.1rem;
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.lituism-card-title {
			font-size: 0.85rem;
			font-weight: 700;
			color: #ff4466;
			text-shadow: 0 0 10px rgba(255, 0, 68, 0.2);
			margin-bottom: 0.1rem;
			font-family: 'Courier New', monospace;
			letter-spacing: 0.5px;
		}

		.lituism-card-author {
			font-size: 0.7rem;
			color: #ff6688;
			font-family: 'Courier New', monospace;
			letter-spacing: 1px;
		}

		.lituism-card-date {
			font-size: 0.6rem;
			color: #884444;
			font-family: 'Courier New', monospace;
			margin-top: auto;
			border-top: 1px dashed #2a0a0a;
			padding-top: 0.2rem;
		}

		.lituism-card-hover-hint {
			position: absolute;
			bottom: 6px;
			right: 6px;
			background: rgba(255, 0, 68, 0.8);
			color: white;
			font-size: 0.5rem;
			padding: 1px 8px;
			border-radius: 20px;
			font-family: 'Courier New', monospace;
			letter-spacing: 1px;
			opacity: 0;
			transition: opacity 0.3s ease;
			z-index: 1;
		}

		.lituism-card:hover .lituism-card-hover-hint {
			opacity: 1;
		}

		/* ===== МОДАЛЬНОЕ ОКНО ===== */
		.lituism-modal {
			display: none;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(0, 0, 0, 0.92);
			z-index: 9999;
			justify-content: center;
			align-items: center;
			backdrop-filter: blur(8px);
			animation: modalFade 0.2s ease;
		}

		.lituism-modal.active {
			display: flex;
		}

		@keyframes modalFade {
			0% { opacity: 0; transform: scale(0.95); }
			100% { opacity: 1; transform: scale(1); }
		}

		.lituism-modal-content {
			max-width: 90vw;
			max-height: 90vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: transparent;
			border: none;
			padding: 0;
			box-shadow: none;
			position: relative;
		}

		/* ===== РЕЖИМ ЛУПЫ ===== */
		.lituism-modal-img-wrapper {
			padding: 8px;
			background: linear-gradient(135deg, #ff0000, #3bff00, #ff00f2, #ffd800, #00ffec, #0015ff, #ff7400);
			background-size: 400% 400%;
			animation: modalGradientShift 3s ease infinite;
			box-shadow: 0 0 60px rgba(255, 0, 68, 0.3);
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			position: relative;
			transition: all 0.3s ease;
			overflow: hidden;
		}

		.lituism-modal-img-wrapper.zoomed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			max-width: 100vw;
			max-height: 100vh;
			padding: 0;
			background: rgba(0, 0, 0, 0.95);
			box-shadow: none;
			z-index: 99998;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			border-radius: 0;
			overflow: hidden;
		}

		.lituism-modal-img-wrapper.zoomed:active {
			cursor: url("../source/lit_cur_pointer.cur"), auto;
		}

		.lituism-modal-img-wrapper.zoomed .lituism-modal-img {
			max-width: none;
			max-height: none;
			width: auto;
			height: auto;
			object-fit: none;
			box-shadow: none;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: none;
			border: none !important;
		}

		.lituism-modal-img-wrapper.zoomed:active .lituism-modal-img {
			cursor: url("../source/lit_cur_pointer.cur"), auto;
		}

		/* Индикатор зума */
		.lituism-zoom-indicator {
			position: fixed;
			bottom: 30px;
			left: 50%;
			transform: translateX(-50%);
			color: rgba(255, 255, 255, 0.6);
			font-size: 0.8rem;
			font-family: 'Courier New', monospace;
			background: rgba(0, 0, 0, 0.7);
			padding: 6px 16px;
			border-radius: 20px;
			border: 1px solid rgba(255, 0, 68, 0.3);
			letter-spacing: 1px;
			pointer-events: none;
			z-index: 100000;
			opacity: 0;
			transition: opacity 0.5s ease;
		}

		.lituism-modal-img-wrapper.zoomed .lituism-zoom-indicator {
			opacity: 1;
		}

		@keyframes modalGradientShift {
			0% { background-position: 0% 50%; }
			25% { background-position: 50% 0%; }
			50% { background-position: 100% 50%; }
			75% { background-position: 50% 100%; }
			100% { background-position: 0% 50%; }
		}

		/* ===== КНОПКА ЗАКРЫТИЯ ===== */
		.lituism-modal-close {
			position: fixed;
			top: 20px;
			right: 30px;
			font-size: 3rem;
			color: #ff0044;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			font-family: 'Courier New', monospace;
			transition: all 0.2s ease;
			background: none;
			border: none;
			text-shadow: 0 0 40px #ff0044, 0 0 80px #ff004466;
			z-index: 999999 !important;
			line-height: 1;
			pointer-events: auto !important;
		}

		.lituism-modal-close:hover {
			color: #ff4488;
			transform: rotate(90deg) scale(1.2);
			text-shadow: 0 0 60px #ff4488, 0 0 120px #ff448866;
		}

		/* ===== КАРТИНКА ===== */
		.lituism-modal-img {
			max-width: 85vw;
			max-height: 70vh;
			object-fit: contain;
			display: block;
			border: 5px solid black;
		}

		/* ===== ИНФОРМАЦИЯ ВНИЗУ ===== */
		.lituism-modal-info {
			width: 85vw;
			max-width: 800px;
			margin-top: 1.2rem;
			padding: 1rem 1.5rem;
			background: rgba(255, 0, 68, 0.08);
			border-left: 4px solid #ff0044;
			border-right: 4px solid #ff0044;
			border-radius: 4px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: 0.5rem;
			backdrop-filter: blur(4px);
			box-shadow: 0 0 30px rgba(255, 0, 68, 0.05);
		}

		.lituism-modal-title {
			font-size: 1.6rem;
			color: #ff4466;
			font-weight: 700;
			font-family: 'Courier New', monospace;
			text-shadow: 0 0 30px rgba(255, 0, 68, 0.3), 0 0 60px rgba(255, 0, 68, 0.1);
			letter-spacing: 2px;
		}

		.lituism-modal-author {
			color: #ff6688;
			font-family: 'Courier New', monospace;
			font-size: 1.1rem;
			text-shadow: 0 0 20px rgba(255, 0, 68, 0.2);
			letter-spacing: 1px;
		}

		.lituism-modal-date {
			color: #ff8899;
			font-family: 'Courier New', monospace;
			font-size: 1rem;
			text-shadow: 0 0 15px rgba(255, 0, 68, 0.15);
			letter-spacing: 1px;
		}

		/* ===== РАЗМЕР + КНОПКА КОПИРОВАНИЯ (компактно) ===== */
		.lituism-modal-size {
			color: #ff8899;
			font-family: 'Courier New', monospace;
			font-size: 1rem;
			text-shadow: 0 0 15px rgba(255, 0, 68, 0.15);
			letter-spacing: 1px;
			display: inline-flex;
			align-items: center;
			gap: 8px;
		}

		/* ИКОНКА-КНОПКА КОПИРОВАНИЯ — маленькая, квадратная */
		.lituism-copy-btn {
			width: 26px;
			height: 26px;
			padding: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			background: rgba(255, 0, 68, 0.12);
			border: 1px solid #ff0044;
			border-radius: 6px;
			color: #ff8899;
			font-size: 14px;
			line-height: 1;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.18s ease;
			flex: none;
			user-select: none;
		} 

		.lituism-copy-btn:hover {
			background: #ff0044;
			color: #000;
			box-shadow: 0 0 14px rgba(255, 0, 68, 0.6);
			transform: scale(1.08);
		}

		.lituism-copy-btn:active {
			transform: scale(0.92);
		}

		.lituism-copy-btn:disabled {
			opacity: 0.5;
			cursor: wait;
			transform: none;
		}

		.lituism-copy-btn.ok {
			background: #001a09;
			border-color: #00ff66;
			color: #00ff66;
			box-shadow: 0 0 14px rgba(0, 255, 102, 0.5);
		}

		/* в режиме лупы кнопка скрыта */
		.lituism-modal-img-wrapper.zoomed ~ .lituism-modal-info .lituism-copy-btn {
			display: none;
		}

		/* ===== POPUP «СКОПИРОВАНО» ===== */
		.lituism-copy-toast {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) scale(0.85);
			padding: 14px 28px;
			background: rgba(0, 20, 8, 0.96);
			border: 2px solid #00ff66;
			border-radius: 8px;
			color: #00ff66;
			font: bold 1rem/1 'Courier New', monospace;
			letter-spacing: 3px;
			box-shadow: 0 0 40px rgba(0, 255, 102, 0.6), inset 0 0 20px rgba(0, 255, 102, 0.1);
			z-index: 1000001;
			pointer-events: none;
			opacity: 0;
			text-shadow: 0 0 10px #00ff66;
			white-space: nowrap;
			text-align: center;
		}

		.lituism-copy-toast.show {
			animation: copyToastPop 1.6s ease forwards;
		}

		.lituism-copy-toast.error {
			background: rgba(20, 15, 0, 0.96);
			border-color: #ffcc00;
			color: #ffcc00;
			box-shadow: 0 0 40px rgba(255, 204, 0, 0.6), inset 0 0 20px rgba(255, 204, 0, 0.1);
			text-shadow: 0 0 10px #ffcc00;
		}

		.lituism-copy-toast small {
			display: block;
			font-size: 0.55rem;
			letter-spacing: 2px;
			margin-top: 4px;
			opacity: 0.7;
			font-weight: normal;
		}

		@keyframes copyToastPop {
			0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
			15%  { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
			25%  { transform: translate(-50%, -50%) scale(1); }
			80%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
			100% { opacity: 0; transform: translate(-50%, -60%) scale(0.95); }
		}

		/* ===== СЧЁТЧИК ===== */
		.lituism-counter {
			text-align: center;
			color: red;
			font-size: 0.75rem;
			letter-spacing: 4px;
			font-family: 'Courier New', monospace;
			margin-top: 0.5rem;
			text-shadow: 0 0 10px red, 0 0 20px red, 0 0 40px red, 0 0 80px red;
		}

		/* ===== ГЛЮЧНЫЙ ЭФФЕКТ ===== */
		.lituism-glitch-overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			pointer-events: none;
			z-index: 9998;
			background: repeating-linear-gradient(
				15deg,
				transparent 0px,
				rgba(255, 0, 68, 0.1) 2px,
				transparent 4px,
				transparent 6px,
				transparent 8px
			);
			animation: glitchScan 0.5s linear infinite;
		}

		@keyframes glitchScan {
			0% { transform: translateY(-100%); }
			100% { transform: translateY(100%); }
		}

		/* ===== АДАПТИВ ===== */
		@media (max-width: 768px) {
			.lituism-grid {
				grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
				gap: 0.8rem;
			}
			.lituism-gallery-title {
				font-size: 1.8em;
				letter-spacing: 5px;
			}
			.lituism-modal-img {
				max-width: 95vw;
				max-height: 50vh;
			}
			.lituism-modal-info {
				flex-direction: column;
				align-items: flex-start;
				gap: 0.2rem;
			}
			.lituism-modal-title {
				font-size: 1.1rem;
			}
		}

		@media (max-width: 480px) {
			.lituism-grid {
				grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
				gap: 0.6rem;
			}
			.lituism-gallery-title {
				font-size: 1.4em;
				letter-spacing: 3px;
			}
		}

		/* ===== ФИЛЬТРЫ В РЕЖИМЕ ЛУПЫ ===== */
		.lituism-filter-controls {
			position: fixed;
			bottom: 80px;
			left: 50%;
			transform: translateX(-50%);
			background: rgba(0, 0, 0, 0.85);
			backdrop-filter: blur(10px);
			padding: 10px 15px;
			border-radius: 12px 4px 12px 4px;
			border: 2px solid #ff0044;
			box-shadow: 0 0 40px rgba(255, 0, 68, 0.2);
			z-index: 100000;
			display: none;
			gap: 6px;
			flex-wrap: nowrap;
			justify-content: center;
			max-width: 98vw;
			opacity: 0;
			transition: opacity 0.4s ease;
			pointer-events: none;
			overflow-x: auto;
		}

		.lituism-filter-controls.visible {
			display: flex;
			opacity: 1;
			pointer-events: auto;
		}

		.lituism-filter-controls .filter-group {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;
			min-width: auto;
			flex-shrink: 0;
		}

		.lituism-filter-controls label {
			color: #ff4466;
			font-size: 0.5rem;
			font-family: 'Courier New', monospace;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			text-shadow: 0 0 10px rgba(255, 0, 68, 0.3);
			white-space: nowrap;
		}

		.lituism-filter-controls input[type="range"] {
			width: 120px;
			height: 4px;
			-webkit-appearance: none;
			appearance: none;
			background: linear-gradient(90deg, #440022, #ff0044);
			border-radius: 2px;
			outline: none;
			cursor: pointer;
		}

		.lituism-filter-controls input[type="range"]::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: #ff0044;
			cursor: pointer;
			box-shadow: 0 0 20px rgba(255, 0, 68, 0.5);
			border: 2px solid #000;
		}

		.lituism-filter-controls input[type="range"]::-moz-range-thumb {
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background: #ff0044;
			cursor: pointer;
			border: 2px solid #000;
		}

		.lituism-filter-controls .filter-value {
			color: rgba(255, 255, 255, 0.5);
			font-size: 0.45rem;
			font-family: 'Courier New', monospace;
			min-width: 20px;
			text-align: center;
		}

		.lituism-filter-controls .filter-reset-all {
			background: #ff0044;
			border: none;
			color: #000;
			padding: 3px 12px;
			border-radius: 20px;
			font-size: 0.5rem;
			font-family: 'Courier New', monospace;
			font-weight: bold;
			cursor: pointer;
			transition: all 0.2s ease;
			letter-spacing: 1px;
			white-space: nowrap;
		}

		.lituism-filter-controls .filter-reset-all:hover {
			background: #ff4488;
			box-shadow: 0 0 30px rgba(255, 0, 68, 0.3);
		}

		.lituism-filter-controls::-webkit-scrollbar {
			height: 3px;
		}
		.lituism-filter-controls::-webkit-scrollbar-track {
			background: rgba(255, 0, 68, 0.1);
			border-radius: 2px;
		}
		.lituism-filter-controls::-webkit-scrollbar-thumb {
			background: #ff0044;
			border-radius: 2px;
		}

		@media (max-width: 1200px) {
			.lituism-filter-controls input[type="range"] { width: 100px; }
		}
		@media (max-width: 992px) {
			.lituism-filter-controls input[type="range"] { width: 80px; }
			.lituism-filter-controls label { font-size: 0.45rem; }
		}
		@media (max-width: 768px) {
			.lituism-filter-controls {
				bottom: 70px;
				padding: 8px 10px;
				gap: 4px;
				max-width: 98vw;
				flex-wrap: nowrap;
			}
			.lituism-filter-controls input[type="range"] { width: 65px; }
			.lituism-filter-controls label { font-size: 0.4rem; }
			.lituism-filter-controls .filter-value { font-size: 0.4rem; }
			.lituism-filter-controls .filter-reset-all { font-size: 0.4rem; padding: 2px 8px; }
		}
		@media (max-width: 480px) {
			.lituism-filter-controls input[type="range"] { width: 50px; }
			.lituism-filter-controls label { font-size: 0.35rem; letter-spacing: 0px; }
			.lituism-filter-controls .filter-value { font-size: 0.35rem; min-width: 15px; }
		}

		/* ===== СОРТИРОВОЧНАЯ ПАНЕЛЬ ===== */
		.lituism-sort-bar {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 8px;
			padding: 0.8rem 1rem;
			margin-bottom: 1rem;
			background: rgba(255, 0, 68, 0.05);
			border-bottom: 1px solid rgba(255, 0, 68, 0.15);
			border-top: 1px solid rgba(255, 0, 68, 0.15);
		}

		.lituism-sort-btn {
			background: transparent;
			border: 1px solid rgba(255, 0, 68, 0.25);
			color: #ff4466;
			padding: 0.4rem 1.2rem;
			border-radius: 20px 4px 20px 4px;
			font-family: 'Courier New', monospace;
			font-size: 0.7rem;
			letter-spacing: 1.5px;
			text-transform: uppercase;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.2s ease;
			text-shadow: 0 0 10px rgba(255, 0, 68, 0.1);
		}

		.lituism-sort-btn:hover {
			border-color: #ff0044;
			background: rgba(255, 0, 68, 0.1);
			box-shadow: 0 0 20px rgba(255, 0, 68, 0.1);
		}

		.lituism-sort-btn.active {
			border-color: #ff0044;
			background: rgba(255, 0, 68, 0.2);
			box-shadow: 0 0 30px rgba(255, 0, 68, 0.15);
			color: #ff0044;
		}

		.lituism-sort-toggle {
			background: transparent;
			border: 1px solid rgba(255, 0, 68, 0.25);
			color: #ff4466;
			padding: 0.4rem 0.8rem;
			border-radius: 20px 4px 20px 4px;
			font-family: 'Courier New', monospace;
			font-size: 0.8rem;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.2s ease;
		}

		.lituism-sort-toggle:hover {
			border-color: #ff0044;
			background: rgba(255, 0, 68, 0.1);
		}
		</style>

		<div class="lituism-glitch-overlay"></div>

		<div class="lituism-gallery-wrap">
			<h1 class="lituism-gallery-title" id="galleryTitle">✦ LITUISM · GALLERY ✦</h1>
			<div class="lituism-gallery-sub" id="gallerySub">// РЕЕСТР ВИЗУАЛЬНЫХ АРТЕФАКТОВ //</div>

			<div class="lituism-grid" id="lituismGrid"></div>

			<div class="lituism-counter" id="lituismCounter">// ЗАГРУЗКА АРТЕФАКТОВ... //</div>

			<div class="lituism-sort-bar">
				<button class="lituism-sort-btn" data-sort="default" data-label="🔀 RANDOM">🔀 RANDOM</button>
				<button class="lituism-sort-btn" data-sort="title" data-label="📛 NAME">📛 NAME</button>
				<button class="lituism-sort-btn" data-sort="author" data-label="✍️ AUTHOR">✍️ AUTHOR</button>
				<button class="lituism-sort-btn" data-sort="date" data-label="📅 DATE">📅 DATE</button>
				<button class="lituism-sort-toggle" id="lituismSortToggle">↑↓</button>
			</div>
		</div>

		<div class="lituism-modal" id="lituismModal">
			<div class="lituism-modal-content">
				<button class="lituism-modal-close" id="lituismModalClose">✕</button>
				<div class="lituism-modal-img-wrapper" id="modalImgWrapper" title="PUT SOME TEXT PLEASE, I WAIT 😒">
					<img class="lituism-modal-img" id="lituismModalImg" src="" alt="">
				</div>
				<div class="lituism-modal-info">
					<span class="lituism-modal-title" id="lituismModalTitle">—</span>
					<span class="lituism-modal-author" id="lituismModalAuthor">—</span>
					<span class="lituism-modal-date" id="lituismModalDate">—</span>
					<span class="lituism-modal-size" id="lituismModalSize">
						<span id="lituismModalSizeText">—</span>
						<button class="lituism-copy-btn" id="lituismCopyBtn" title="Скопировать картинку в буфер">📋</button>
					</span>
				</div>
			</div>
		</div>
		<div class="lituism-zoom-indicator" id="zoomIndicator">&gg; 🔍 MOUSE WHEEL — ZOOM | ✋✊ GRAB — DRAGGING &ll;</div>

		<div class="lituism-copy-toast" id="copyToast"></div>

		<div class="lituism-filter-controls" id="filterControls">
			<div class="filter-group">
				<label>Яркость</label>
				<input type="range" id="filterBrightness" min="0" max="500" value="100">
				<span class="filter-value" id="filterBrightnessVal">100%</span>
			</div>
			<div class="filter-group">
				<label>Насыщенность</label>
				<input type="range" id="filterSaturate" min="0" max="500" value="100">
				<span class="filter-value" id="filterSaturateVal">100%</span>
			</div>
			<div class="filter-group">
				<label>Инверт</label>
				<input type="range" id="filterInvert" min="0" max="100" value="0">
				<span class="filter-value" id="filterInvertVal">0%</span>
			</div>
			<div class="filter-group">
				<label>Hue</label>
				<input type="range" id="filterHue" min="0" max="360" value="0">
				<span class="filter-value" id="filterHueVal">0°</span>
			</div>
			<div class="filter-group">
				<label>Блюр</label>
				<input type="range" id="filterBlur" min="0" max="20" value="0" step="0.5">
				<span class="filter-value" id="filterBlurVal">0px</span>
			</div>
			<div class="filter-group">
				<label>Scale X</label>
				<input type="range" id="filterScaleX" min="-500" max="500" value="100">
				<span class="filter-value" id="filterScaleXVal">100%</span>
			</div>
			<div class="filter-group">
				<label>Scale Y</label>
				<input type="range" id="filterScaleY" min="-500" max="500" value="100">
				<span class="filter-value" id="filterScaleYVal">100%</span>
			</div>
			<div class="filter-group">
				<label>Поворот</label>
				<input type="range" id="filterRotate" min="-180" max="180" value="0">
				<span class="filter-value" id="filterRotateVal">0°</span>
			</div>
			<div class="filter-group">
				<button class="filter-reset-all" id="filterResetAll">СБРОС</button>
			</div>
		</div>

		<footer style="margin-top:2rem; text-align:center; font-size:0.7rem; color:#442222; letter-spacing:3px; font-family:'Courier New',monospace;">
			✴ LITUISM · VISUAL ARCHIVE v2.0 ✴<br>
			SYSTEM INTEGRITY: 73% 🩸
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
		false, function(){

			// ======================================================
			// ===== ВСЯ ЛОГИКА ГАЛЕРЕИ =====
			// ======================================================

			function GALLERY_randomRange(min, max) {
				return Math.random() * (max - min) + min;
			}

			function GALLERY_pickRandom(arr) {
				return arr[Math.floor(Math.random() * arr.length)];
			}

			function GALLERY_shuffleArray(arr) {
				const a = [...arr];
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[a[i], a[j]] = [a[j], a[i]];
				}
				return a;
			}

			function GALLERY_randomDesign() {
				const hue = Math.floor(GALLERY_randomRange(0, 20));
				const saturation = Math.floor(GALLERY_randomRange(70, 100));
				const lightness = Math.floor(GALLERY_randomRange(40, 60));
				const color1 = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
				const color2 = `hsl(${hue + 10}, ${saturation - 20}%, ${lightness - 20}%)`;
				const color3 = `hsl(${hue + 20}, ${saturation - 40}%, ${lightness - 40}%)`;
				const glowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`;

				const cardSize = Math.floor(GALLERY_randomRange(150, 220));
				const skewX = GALLERY_randomRange(-5, 5);
				const skewY = GALLERY_randomRange(-3, 3);
				const radius1 = Math.floor(GALLERY_randomRange(2, 12));
				const radius2 = Math.floor(GALLERY_randomRange(2, 12));
				const radius3 = Math.floor(GALLERY_randomRange(2, 12));
				const radius4 = Math.floor(GALLERY_randomRange(2, 12));
				const borderStyles = ['solid', 'dashed', 'dotted', 'double'];
				const borderStyle = GALLERY_pickRandom(borderStyles);
				const bgGradients = [
					`radial-gradient(ellipse at center, #0a0000 0%, #050000 100%)`,
					`radial-gradient(ellipse at 30% 40%, #0a0500 0%, #000000 100%)`,
					`radial-gradient(ellipse at 70% 60%, #0a0005 0%, #000000 100%)`,
					`linear-gradient(135deg, #0a0000 0%, #050000 50%, #0a0500 100%)`,
					`linear-gradient(45deg, #050000 0%, #0a0500 100%)`
				];

				return {
					color1, color2, color3, glowColor,
					cardSize, skewX, skewY,
					radius1, radius2, radius3, radius4,
					borderStyle,
					bgGradient: GALLERY_pickRandom(bgGradients)
				};
			}

			let GALLERY_currentDesign = null;

			function GALLERY_applyDesign(design) {
				GALLERY_currentDesign = design;
				const style = document.createElement('style');
				style.id = 'GALLERY_dynamicDesign';

				const oldStyle = document.getElementById('GALLERY_dynamicDesign');
				if (oldStyle) oldStyle.remove();

				style.textContent = `
			.lituism-gallery-title { color: ${design.color1} !important; text-shadow: 0 0 30px ${design.color1}, 0 0 60px ${design.color1}66, 0 0 100px ${design.color1}22 !important; }
			.lituism-gallery-sub { color: ${design.color2} !important; border-bottom-color: ${design.color3} !important; }
			.lituism-grid { grid-template-columns: repeat(auto-fill, minmax(${design.cardSize}px, 1fr)) !important; }
			.lituism-card { border-color: ${design.color3} !important; background: #0a0000 !important; transform: skew(${design.skewX}deg, ${design.skewY}deg) !important; border-style: ${design.borderStyle} !important; border-radius: ${design.radius1}px ${design.radius2}px ${design.radius3}px ${design.radius4}px !important; }
			.lituism-card:hover { border-color: ${design.color1} !important; box-shadow: 0 0 30px ${design.glowColor} !important; }
			.lituism-card-title { color: ${design.color1} !important; text-shadow: 0 0 10px ${design.glowColor} !important; }
			.lituism-card-author { color: ${design.color2} !important; }
			.lituism-card-date { border-top-color: ${design.color3} !important; }
			.lituism-modal-content { border-color: ${design.color1} !important; box-shadow: 0 0 60px ${design.glowColor} !important; }
			.lituism-modal-close { color: ${design.color1} !important; text-shadow: 0 0 20px ${design.color1} !important; }
			.lituism-modal-info { border-left-color: ${design.color1} !important; background: ${design.color1}0D !important; }
			.lituism-gallery-wrap { background: ${design.bgGradient} !important; }
			.lituism-card-img-wrap img { border-color: ${design.color3} !important; }
			.lituism-card:hover .lituism-card-img-wrap img { border-color: ${design.color1}66 !important; }
			.lituism-card-hover-hint { background: ${design.color1}CC !important; }
			.lituism-modal-img { border-color: ${design.color3} !important; }
			footer { color: ${design.color3} !important; }
		`;

				document.head.appendChild(style);
			}

			let GALLERY_currentSort = 'default';
			let GALLERY_sortAsc = true;

			function GALLERY_renderWithSort() {
				const grid = document.getElementById('lituismGrid');
				const counter = document.getElementById('lituismCounter');
				if (!grid) return;

				if (typeof TRUE_LIT_ARTS_COLLECTION === 'undefined' || TRUE_LIT_ARTS_COLLECTION.length === 0) {
					if (counter) counter.textContent = '// ОШИБКА: НЕТ ДАННЫХ //';
					return;
				}

				let items = [...TRUE_LIT_ARTS_COLLECTION];

				if (GALLERY_currentSort !== 'default') {
					items.sort((a, b) => {
						let valA, valB;
						switch(GALLERY_currentSort) {
							case 'title':
								valA = a.NAME.toLowerCase();
								valB = b.NAME.toLowerCase();
								break;
							case 'author':
								valA = a.AUTHOR.toLowerCase();
								valB = b.AUTHOR.toLowerCase();
								if(valA == valB){
									valA = a.NAME.toLowerCase();
									valB = b.NAME.toLowerCase();
								}
								break;
							case 'date':
							function parseDateWeight(str) {
								if (!str || str.startsWith('????')) {
									return { date: new Date(0), unknown: true };
								}
								let d = new Date(str);
								if (!isNaN(d.getTime())) {
									return { date: d, unknown: false };
								}
								let match = str.match(/(\d{4})[.\-](\d{1,2})[.\-](\d{1,2})/);
								if (match) {
									let year = parseInt(match[1]);
									let month = parseInt(match[2]) - 1;
									let day = parseInt(match[3]);
									if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
										return { date: new Date(year, month, day), unknown: false };
									}
								}
								match = str.match(/(\d{1,2})[.\-](\d{1,2})[.\-](\d{4})/);
								if (match) {
									let day = parseInt(match[1]);
									let month = parseInt(match[2]) - 1;
									let year = parseInt(match[3]);
									if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
										return { date: new Date(year, month, day), unknown: false };
									}
								}
								return { date: new Date(0), unknown: true };
							}
								const aData = parseDateWeight(a.DATE);
								const bData = parseDateWeight(b.DATE);
								if (aData.unknown !== bData.unknown) {
									return aData.unknown ? 1 : -1;
								}
								valA = aData.date;
								valB = bData.date;
								break;
							default:
								return 0;
						}
						if (valA < valB) return GALLERY_sortAsc ? -1 :  1;
						if (valA > valB) return GALLERY_sortAsc ?  1 : -1;
						return 0;
					});
				} else {
					items = GALLERY_shuffleArray(items);
				}

				const total = items.length;
				if (counter) {
					const sortLabel = GALLERY_currentSort === 'default' ? '🔀 RANDOM' :
							GALLERY_currentSort.toUpperCase() + (GALLERY_sortAsc ? ' ↓' : ' ↑');
					counter.textContent = `// АРТЕФАКТОВ: ${total} // СОРТИРОВКА: ${sortLabel} //`;
				}

				let html = '';
				const cardData = [];
				for (const item of items) {
					const rot = GALLERY_randomRange(-4, 4);
					const scale = GALLERY_randomRange(0.95, 1.05);

					const colors = ["#ff0000", "#3bff00", "#ff00f2", "#ffd800", "#00ffec", "#0015ff", "#ff7400"];
					const shuffledColors = GALLERY_shuffleArray([...colors]);
					const gradient = `linear-gradient(135deg, ${shuffledColors.slice(0, 4).join(', ')})`;
					const animDuration = Math.random() * 1;

					cardData.push({
						url: item.SOURCE,
						title: item.NAME,
						author: item.AUTHOR,
						date: item.DATE
					});

					html += `
			<div class="lituism-card"
				 style="transform: skew(${GALLERY_currentDesign ? GALLERY_currentDesign.skewX : 0}deg, ${GALLERY_currentDesign ? GALLERY_currentDesign.skewY : 0}deg) rotate(${rot}deg) scale(${scale});"
				 data-url="${item.SOURCE}"
				 data-title="${item.NAME}"
				 data-author="${item.AUTHOR}"
				 data-date="${item.DATE}">
				<div class="lituism-card-img-wrap" style="
					background: ${gradient};
					background-size: 400% 400%;
					animation: galleryGradientShift ${animDuration}s ease infinite;
				">
					<img src="${item.SOURCE}" alt="${item.NAME}" loading="lazy" onerror="this.src='https://woowz11.github.io/woowzsite/source/error-image.png'">
					<span class="lituism-card-hover-hint">👁️ ПРОСМОТР</span>
				</div>
				<div class="lituism-card-info">
					<div class="lituism-card-title">${item.NAME}</div>
					<div class="lituism-card-author">✧ ${item.AUTHOR}</div>
					<div class="lituism-card-date glitch2">⏱ ${item.DATE}&nbsp;|&nbsp; <span class="lituism-card-size">☣ L O A D I N G . . .</span></div>
				</div>
			</div>
		`;
				}

				grid.innerHTML = html;

				for (var i = 0; i < cardData.length; i++) {
					(function(index) {
						var data = cardData[index];
						var tempImg = new Image();
						tempImg.onload = function() {
							var cards = document.getElementsByClassName('lituism-card');
							for (var j = 0; j < cards.length; j++) {
								if (cards[j].dataset.url === data.url) {
									cards[j].dataset.width = this.naturalWidth;
									cards[j].dataset.height = this.naturalHeight;
									var sizeEl = cards[j].getElementsByClassName('lituism-card-size')[0];
									if (sizeEl) {
										sizeEl.textContent = '☣ ' + this.naturalWidth + '×' + this.naturalHeight;
									}
									break;
								}
							}
						};
						tempImg.onerror = function() {
							var cards = document.getElementsByClassName('lituism-card');
							for (var j = 0; j < cards.length; j++) {
								if (cards[j].dataset.url === data.url) {
									cards[j].dataset.width = '?';
									cards[j].dataset.height = '?';
									var sizeEl = cards[j].getElementsByClassName('lituism-card-size')[0];
									if (sizeEl) {
										sizeEl.textContent = '☣ ?×?';
									}
									break;
								}
							}
						};
						tempImg.src = data.url;
					})(i);
				}

				const cards = grid.querySelectorAll('.lituism-card');
				cards.forEach(card => {
					card.onclick = function() {
						const url = this.dataset.url;
						const title = this.dataset.title;
						const author = this.dataset.author;
						const date = this.dataset.date;
						const width = this.dataset.width || '?';
						const height = this.dataset.height || '?';
						GALLERY_openModal(url, title, author, date, width, height);
					};
				});
			}

			function GALLERY_render() { GALLERY_renderWithSort(); }

			// ======================================================
			// ===== POPUP «СКОПИРОВАНО» =====
			// ======================================================
			function GALLERY_showToast(text, isError, sub) {
				const toast = document.getElementById('copyToast');
				if (!toast) return;
				toast.className = 'lituism-copy-toast' + (isError ? ' error' : '');
				toast.innerHTML = text + (sub ? '<small>' + sub + '</small>' : '');
				void toast.offsetWidth; // reflow, чтобы анимация перезапустилась
				toast.classList.add('show');
				clearTimeout(toast._timer);
				toast._timer = setTimeout(() => {
					toast.classList.remove('show');
				}, 1600);
			}

			// ======================================================
			// ===== РЕАЛЬНОЕ КОПИРОВАНИЕ КАРТИНКИ =====
			// ======================================================
			async function GALLERY_copyImage(src, btn) {
				if (!src || !btn) return;

				btn.disabled = true;

				// конверт любого изображения в PNG через canvas
				function toPng(blob) {
					return new Promise((resolve, reject) => {
						const u = URL.createObjectURL(blob);
						const im = new Image();
						im.onload = () => {
							try {
								const c = document.createElement('canvas');
								c.width = im.naturalWidth;
								c.height = im.naturalHeight;
								c.getContext('2d').drawImage(im, 0, 0);
								c.toBlob(b => {
									URL.revokeObjectURL(u);
									b ? resolve(b) : reject(new Error('toBlob null'));
								}, 'image/png');
							} catch (err) {
								URL.revokeObjectURL(u);
								reject(err);
							}
						};
						im.onerror = () => { URL.revokeObjectURL(u); reject(new Error('img load error')); };
						im.src = u;
					});
				}

				try {
					// 1) картинка → blob
					const res = await fetch(src, { mode: 'cors', cache: 'no-cache' });
					if (!res.ok) throw new Error('fetch ' + res.status);
					const blob = await res.blob();

					// 2) в буфер как PNG
					if (!navigator.clipboard || !window.ClipboardItem) {
						throw new Error('Clipboard API недоступен (нужен https/localhost)');
					}

					const png = await toPng(blob);
					await navigator.clipboard.write([
						new ClipboardItem({ 'image/png': png })
					]);

					// 3) успех
					btn.textContent = '✅';
					btn.classList.add('ok');
					GALLERY_showToast('✅ СКОПИРОВАНО', false, 'IMAGE → CLIPBOARD');

					setTimeout(() => {
						btn.textContent = '📋';
						btn.classList.remove('ok');
						btn.disabled = false;
					}, 1600);
				} catch (err) {
					console.warn('[gallery] copy failed:', err);
					btn.disabled = false;

					// фолбэк: открываем в новой вкладке
					GALLERY_showToast('⚠ ОШИБКА', true, 'ОТКРЫТО В НОВОЙ ВКЛАДКЕ');
					try { window.open(src, '_blank', 'noopener'); } catch (e) {}
				}
			}

			// ======================================================
			// ===== ОТКРЫТИЕ МОДАЛКИ =====
			// ======================================================
			function GALLERY_openModal(url, title, author, date, width, height) {
				const modal = document.getElementById('lituismModal');
				const img = document.getElementById('lituismModalImg');
				const titleEl = document.getElementById('lituismModalTitle');
				const authorEl = document.getElementById('lituismModalAuthor');
				const dateEl = document.getElementById('lituismModalDate');
				const wrapper = document.getElementById('modalImgWrapper');
				const copyBtn = document.getElementById('lituismCopyBtn');
				const sizeText = document.getElementById('lituismModalSizeText');

				if (!modal || !img) return;

				img.src = url;
				img.alt = title;
				titleEl.textContent = title || '—';
				authorEl.textContent = author || '—';
				dateEl.textContent = date || '—';

				if (sizeText) sizeText.textContent = `☣ ${width || '?'} × ${height || '?'}`;

				// сброс кнопки
				if (copyBtn) {
					copyBtn.disabled = false;
					copyBtn.textContent = '📋';
					copyBtn.classList.remove('ok');
					copyBtn.dataset.src = url;

					if (!copyBtn.dataset.bound) {
						copyBtn.dataset.bound = '1';
						copyBtn.addEventListener('click', function(e) {
							e.stopPropagation();
							e.preventDefault();
							GALLERY_copyImage(copyBtn.dataset.src, copyBtn);
						});
					}
				}

				if (wrapper) wrapper.classList.remove('zoomed');

				if (wrapper) {
					const colors = [
						"#ff0000", "#3bff00", "#ff00f2", "#ffd800",
						"#00ffec", "#0015ff", "#ff7400", "#ff0044",
						"#ff4488", "#ff8844", "#ff00ff", "#00ff88"
					];
					for (let i = colors.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[colors[i], colors[j]] = [colors[j], colors[i]];
					}
					const count = 5 + Math.floor(Math.random() * 4);
					const selectedColors = colors.slice(0, count);
					const gradient = `linear-gradient(135deg, ${selectedColors.join(', ')})`;

					wrapper.style.background = gradient;
					wrapper.style.backgroundSize = '400% 400%';
					wrapper.style.backgroundPosition = '0% 50%';
					wrapper.style.animation = 'none';
					void wrapper.offsetHeight;
					const duration = 3 + Math.random() * 4;
					wrapper.style.animation = `modalGradientShift ${duration}s ease infinite`;
				}

				modal.classList.add('active');
				document.body.style.overflow = 'hidden';
			}

			let zoomScale = 1;
			let isPanning = false;
			let startX = 0, startY = 0;
			let startTranslateX = 0, startTranslateY = 0;
			let translateX = 0, translateY = 0;

			function GALLERY_enterZoomMode() {
				const wrapper = document.getElementById('modalImgWrapper');
				const img = document.getElementById('lituismModalImg');
				const indicator = document.getElementById('zoomIndicator');
				const info = document.querySelector('.lituism-modal-info');
				const controls = document.getElementById('filterControls');

				if (!wrapper) return;

				zoomScale = 1;
				translateX = 0;
				translateY = 0;

				GALLERY_resetFilters();

				const colors = [
					"#ff0000", "#3bff00", "#ff00f2", "#ffd800",
					"#00ffec", "#0015ff", "#ff7400", "#ff0044",
					"#ff4488", "#ff8844", "#ff00ff", "#00ff88"
				];
				for (let i = colors.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[colors[i], colors[j]] = [colors[j], colors[i]];
				}
				const count = 5 + Math.floor(Math.random() * 4);
				const selectedColors = colors.slice(0, count);
				const gradient = `linear-gradient(135deg, ${selectedColors.join(', ')})`;

				wrapper.style.background = gradient;
				wrapper.style.backgroundSize = '400% 400%';
				wrapper.style.animation = 'modalGradientShift 4s ease infinite';

				wrapper.classList.add('zoomed');

				if (img) {
					const scaleX = document.getElementById('filterScaleX')?.value || 100;
					const scaleY = document.getElementById('filterScaleY')?.value || 100;
					img.style.transform = `scale(1) translate(0px, 0px) scaleX(${scaleX/100}) scaleY(${scaleY/100})`;
					img.style.maxWidth = 'none';
					img.style.maxHeight = 'none';
				}
				if (indicator) indicator.style.opacity = '1';
				if (info) { info.style.opacity = '0'; info.style.pointerEvents = 'none'; }
				if (controls) controls.classList.add('visible');
			}

			function GALLERY_exitZoomOnly() {
				const wrapper = document.getElementById('modalImgWrapper');
				const img = document.getElementById('lituismModalImg');
				const indicator = document.getElementById('zoomIndicator');
				const info = document.querySelector('.lituism-modal-info');
				const controls = document.getElementById('filterControls');

				if (!wrapper) return;

				wrapper.classList.remove('zoomed');
				if (controls) controls.classList.remove('visible');

				if (img) {
					img.style.transform = '';
					img.style.filter = '';
					img.style.maxWidth = '85vw';
					img.style.maxHeight = '70vh';
					img.style.width = '';
					img.style.height = '';
				}

				if (indicator) indicator.style.opacity = '0';
				if (info) { info.style.opacity = '1'; info.style.pointerEvents = 'auto'; }

				isPanning = false;
				wrapper.style.cursor = 'url("../source/lit_cur_pointer.cur"), auto';

				zoomScale = 1;
				translateX = 0;
				translateY = 0;

				GALLERY_resetFilters();
			}

			function GALLERY_updateImageTransform() {
				const img = document.getElementById('lituismModalImg');
				if (!img) return;
				const scaleX = document.getElementById('filterScaleX')?.value || 100;
				const scaleY = document.getElementById('filterScaleY')?.value || 100;
				img.style.transform = `scale(${zoomScale}) translate(${translateX}px, ${translateY}px) scaleX(${scaleX/100}) scaleY(${scaleY/100})`;
			}

			function GALLERY_handleWheel(e) {
				const wrapper = document.getElementById('modalImgWrapper');
				if (!wrapper || !wrapper.classList.contains('zoomed')) return;
				e.preventDefault();
				e.stopPropagation();
				const delta = e.deltaY > 0 ? 0.9 : 1.1;
				const newScale = Math.min(Math.max(0.125, zoomScale * delta), 50);
				zoomScale = newScale;
				GALLERY_updateImageTransform();
			}

			function GALLERY_startPan(e) {
				const wrapper = document.getElementById('modalImgWrapper');
				if (!wrapper || !wrapper.classList.contains('zoomed')) return;
				if (e.button !== 0) return;
				isPanning = true;
				startX = e.clientX;
				startY = e.clientY;
				startTranslateX = translateX;
				startTranslateY = translateY;
				wrapper.style.cursor = 'url("../source/lit_cur_grab.cur"), auto';
				e.preventDefault();
			}

			function GALLERY_movePan(e) {
				if (!isPanning) return;
				const sensitivity = 1 / zoomScale;
				translateX = startTranslateX + (e.clientX - startX) * sensitivity;
				translateY = startTranslateY + (e.clientY - startY) * sensitivity;
				GALLERY_updateImageTransform();
				e.preventDefault();
			}

			function GALLERY_endPan(e) {
				if (!isPanning) { e.stopPropagation(); return; }
				isPanning = false;
				const wrapper = document.getElementById('modalImgWrapper');
				if (wrapper) wrapper.style.cursor = 'url("../source/lit_cur_pointer.cur"), auto';
				e.stopPropagation();
				e.preventDefault();
			}

			function GALLERY_toggleZoom(e) {
				const wrapper = document.getElementById('modalImgWrapper');
				if (!wrapper) return;
				e.stopPropagation();
				e.preventDefault();
				if (!wrapper.classList.contains('zoomed')) GALLERY_enterZoomMode();
			}

			function GALLERY_closeModalNow() {
				const modal = document.getElementById('lituismModal');
				if (!modal) return;
				GALLERY_exitZoomOnly();
				modal.classList.remove('active');
				document.body.style.overflow = '';
				isPanning = false;

				const cb = document.getElementById('lituismCopyBtn');
				if (cb) {
					cb.disabled = false;
					cb.textContent = '📋';
					cb.classList.remove('ok');
					cb.dataset.src = '';
				}
			}

			function GALLERY_closeOnBackground(e) {
				const modal = document.getElementById('lituismModal');
				const wrapper = document.getElementById('modalImgWrapper');
				if (!modal) return;
				if (e.target === modal) {
					if (wrapper && wrapper.classList.contains('zoomed')) return;
					else GALLERY_closeModalNow();
				}
			}

			function GALLERY_updateFilters() {
				const img = document.getElementById('lituismModalImg');
				if (!img) return;
				const brightness = document.getElementById('filterBrightness')?.value || 100;
				const saturate = document.getElementById('filterSaturate')?.value || 100;
				const invert = document.getElementById('filterInvert')?.value || 0;
				const hue = document.getElementById('filterHue')?.value || 0;
				const blur = document.getElementById('filterBlur')?.value || 0;
				const scaleX = document.getElementById('filterScaleX')?.value || 100;
				const scaleY = document.getElementById('filterScaleY')?.value || 100;
				const rotate = document.getElementById('filterRotate')?.value || 0;

				const valBrightness = document.getElementById('filterBrightnessVal');
				const valSaturate = document.getElementById('filterSaturateVal');
				const valInvert = document.getElementById('filterInvertVal');
				const valHue = document.getElementById('filterHueVal');
				const valBlur = document.getElementById('filterBlurVal');
				const valScaleX = document.getElementById('filterScaleXVal');
				const valScaleY = document.getElementById('filterScaleYVal');
				const valRotate = document.getElementById('filterRotateVal');

				if (valBrightness) valBrightness.textContent = brightness + '%';
				if (valSaturate) valSaturate.textContent = saturate + '%';
				if (valInvert) valInvert.textContent = invert + '%';
				if (valHue) valHue.textContent = hue + '°';
				if (valBlur) valBlur.textContent = blur + 'px';
				if (valScaleX) valScaleX.textContent = scaleX + '%';
				if (valScaleY) valScaleY.textContent = scaleY + '%';
				if (valRotate) valRotate.textContent = rotate + '°';

				img.style.filter = `brightness(${brightness}%) saturate(${saturate}%) invert(${invert}%) hue-rotate(${hue}deg) blur(${blur}px)`;
				img.style.transform = `scale(${zoomScale}) translate(${translateX}px, ${translateY}px) scaleX(${scaleX/100}) scaleY(${scaleY/100}) rotate(${rotate}deg)`;
			}

			function GALLERY_resetFilters() {
				const ids = ['filterBrightness', 'filterSaturate', 'filterInvert', 'filterHue', 'filterBlur', 'filterScaleX', 'filterScaleY', 'filterRotate'];
				for (const id of ids) {
					const el = document.getElementById(id);
					if (el) {
						switch (id) {
							case 'filterBrightness':
							case 'filterSaturate':
							case 'filterScaleX':
							case 'filterScaleY': el.value = 100; break;
							default: el.value = 0;
						}
					}
				}
				GALLERY_updateFilters();
			}

			function GALLERY_initSort() {
				const sortBtns = document.querySelectorAll('.lituism-sort-btn');
				const toggleBtn = document.getElementById('lituismSortToggle');
				const currentSortBtn = document.querySelector('.lituism-sort-btn.active');

				if (currentSortBtn) GALLERY_currentSort = currentSortBtn.dataset.sort;

				sortBtns.forEach(btn => {
					btn.onclick = function(e) {
						e.stopPropagation();
						sortBtns.forEach(b => b.classList.remove('active'));
						this.classList.add('active');
						GALLERY_currentSort = this.dataset.sort;
						GALLERY_sortAsc = true;
						GALLERY_renderWithSort();
						updateSortIndicator();
					};
				});

				if (toggleBtn) {
					toggleBtn.onclick = function(e) {
						e.stopPropagation();
						GALLERY_sortAsc = !GALLERY_sortAsc;
						GALLERY_renderWithSort();
						updateSortIndicator();
					};
				}

				function updateSortIndicator() {
					const activeBtn = document.querySelector('.lituism-sort-btn.active');
					if (activeBtn) {
						const label = activeBtn.dataset.label || activeBtn.textContent;
						const arrow = GALLERY_sortAsc ? '↓' : '↑';
						activeBtn.textContent = label + ' ' + arrow;
						activeBtn.dataset.label = label.replace(/[↑↓]$/, '').trim();
					}
				}
			}

			// ===== ЗАПУСК =====
			const design = GALLERY_randomDesign();
			GALLERY_applyDesign(design);
			GALLERY_render();
			GALLERY_initSort();

			const imgWrapper = document.getElementById('modalImgWrapper');
			if (imgWrapper) {
				imgWrapper.onclick = GALLERY_toggleZoom;
				imgWrapper.addEventListener('wheel', GALLERY_handleWheel, { passive: false });
				imgWrapper.addEventListener('mousedown', GALLERY_startPan);
			}

			document.addEventListener('mouseup', GALLERY_endPan, true);
			document.addEventListener('mousemove', GALLERY_movePan, true);

			const closeBtn = document.getElementById('lituismModalClose');
			if (closeBtn) {
				closeBtn.onclick = function(e) {
					e.stopPropagation();
					e.preventDefault();
					const wrapper = document.getElementById('modalImgWrapper');
					if (wrapper && wrapper.classList.contains('zoomed')) GALLERY_exitZoomOnly();
					else GALLERY_closeModalNow();
				};
			}

			const modalBg = document.getElementById('lituismModal');
			if (modalBg) modalBg.onclick = GALLERY_closeOnBackground;

			document.onkeydown = function(e) {
				if (e.key === 'Escape') GALLERY_closeModalNow();
			};

			const filterSliders = ['filterBrightness', 'filterSaturate', 'filterInvert', 'filterHue', 'filterBlur', 'filterScaleX', 'filterScaleY', 'filterRotate'];
			filterSliders.forEach(id => {
				const slider = document.getElementById(id);
				if (slider) slider.addEventListener('input', GALLERY_updateFilters);
			});

			const resetBtn = document.getElementById('filterResetAll');
			if (resetBtn) resetBtn.addEventListener('click', GALLERY_resetFilters);

			console.log('✦ LITUISM GALLERY v2.1 ИНИЦИАЛИЗИРОВАНА ✦');
			console.log('📦 Артефактов:', typeof TRUE_LIT_ARTS_COLLECTION !== 'undefined' ? TRUE_LIT_ARTS_COLLECTION.length : 'НЕТ');
		},
		false
	);
});