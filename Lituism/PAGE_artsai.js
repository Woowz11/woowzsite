REGISTER_PAGE("artsai", "A.I. 🖼", function(){
	return ELEMENT_SITE(`
		<style>
		.ai-gallery-wrap {
			max-width: 1800px;
			margin: 0 auto;
			padding: 2rem 1rem;
		}

		.ai-gallery-title {
			font-size: 2.4em;
			color: #ff0044;
			text-shadow: 0 0 20px #ff0044, 0 0 40px #ff004466;
			text-align: center;
			letter-spacing: 8px;
			font-weight: 900;
			text-transform: uppercase;
			margin-bottom: 0.3rem;
			font-family: 'Courier New', monospace;
		}

		.ai-gallery-sub {
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

		.ai-grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
			padding: 1rem 0;
		}

		.ai-card {
			background: #0a0a0a;
			border: 1px solid #2a0a0a;
			border-radius: 6px;
			padding: 0.6rem;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.2s ease;
			position: relative;
			box-shadow: 0 2px 10px rgba(255, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
		}

		.ai-card:hover {
			border-color: #ff0044;
			box-shadow: 0 0 24px rgba(255, 0, 68, 0.25);
			transform: translateY(-3px);
		}

		.ai-card-img-wrap {
			width: 100%;
			height: 400px;
			overflow: hidden;
			border-radius: 4px;
			background: #111;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.ai-card-img-wrap img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			display: block;
			transition: transform 0.3s ease;
		}

		.ai-card:hover .ai-card-img-wrap img {
			transform: scale(1.04);
		}

		.ai-card-info {
			padding: 0.6rem 0.2rem 0.2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-family: 'Courier New', monospace;
			gap: 0.5rem;
		}

		.ai-card-rate {
			color: #ffcc00;
			font-weight: 700;
			font-size: 0.95rem;
			text-shadow: 0 0 8px rgba(255, 200, 0, 0.4);
			letter-spacing: 1px;
		}

		.ai-card-rate span {
			font-size: 0.7rem;
			color: #aa8800;
			margin-left: 4px;
		}

		.ai-card-size {
			color: #884444;
			font-size: 0.7rem;
			letter-spacing: 0.5px;
		}

		.ai-sort-bar {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 8px;
			padding: 0.8rem 0;
			margin-bottom: 1rem;
			border-bottom: 1px solid rgba(255, 0, 68, 0.15);
			border-top: 1px solid rgba(255, 0, 68, 0.15);
		}

		.ai-sort-btn {
			background: transparent;
			border: 1px solid rgba(255, 0, 68, 0.25);
			color: #ff4466;
			padding: 0.4rem 1rem;
			border-radius: 4px;
			font-family: 'Courier New', monospace;
			font-size: 0.7rem;
			letter-spacing: 1.5px;
			text-transform: uppercase;
			cursor: url("../source/lit_cur_pointer.cur"), auto;
			transition: all 0.2s ease;
		}

		.ai-sort-btn:hover {
			border-color: #ff0044;
			background: rgba(255, 0, 68, 0.1);
		}

		.ai-sort-btn.active {
			border-color: #ff0044;
			background: rgba(255, 0, 68, 0.2);
			color: #ff0044;
		}

		.ai-counter {
			text-align: center;
			color: #ff4466;
			font-size: 0.75rem;
			letter-spacing: 3px;
			font-family: 'Courier New', monospace;
			margin: 0.5rem 0 1.5rem;
			text-shadow: 0 0 8px rgba(255, 0, 68, 0.4);
		}

		@media (max-width: 768px) {
			.ai-grid {
				grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
				gap: 1rem;
			}
			.ai-gallery-title {
				font-size: 1.6em;
				letter-spacing: 4px;
			}
		}
		
		.ai-card-rate.unrated {
			color: #6a4a55;
			font-weight: 400;
			font-size: 0.8rem;
			letter-spacing: 2px;
			text-shadow: none;
			font-style: italic;
		}
		</style>

		<div class="ai-gallery-wrap">
			<h1 class="ai-gallery-title">✦ AI ARTIFACTS ✦</h1>
			<div class="ai-gallery-sub">// СГЕНЕРИРОВАНО GOLU //</div>

			<div class="ai-sort-bar">
				<button class="ai-sort-btn" data-sort="default">🔀 ПО УМОЛЧАНИЮ</button>
				<button class="ai-sort-btn" data-sort="rate-desc">⭐ РЕЙТИНГ ↓</button>
				<button class="ai-sort-btn" data-sort="rate-asc">⭐ РЕЙТИНГ ↑</button>
			</div>

			<div class="ai-counter" id="aiCounter">// ЗАГРУЗКА АРТЕФАКТОВ... //</div>
			<div class="ai-grid" id="aiGrid"></div>
		</div>
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
			const grid = document.getElementById('aiGrid');
			const counter = document.getElementById('aiCounter');
			if (!grid) return;

			if (typeof TRUE_AI_ARTS_COLLECTION === 'undefined' || TRUE_AI_ARTS_COLLECTION.length === 0) {
				if (counter) counter.textContent = '// ОШИБКА: НЕТ ДАННЫХ //';
				return;
			}

			let currentSort = 'default';

			function shuffle(arr) {
				const a = [...arr];
				for (let i = a.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[a[i], a[j]] = [a[j], a[i]];
				}
				return a;
			}

			function getFileName(src) {
				return src.split('/').pop() || src;
			}

			function render() {
				let items = [...TRUE_AI_ARTS_COLLECTION];

				if (currentSort === 'default') {
					items = shuffle(items);
				} else if (currentSort === 'rate-desc' || currentSort === 'rate-asc') {
					const dir = currentSort === 'rate-desc' ? -1 : 1;
					items.sort((a, b) => {
						const ra = Number(a.RATE);
						const rb = Number(b.RATE);
						const aUnrated = !Number.isFinite(ra) || ra < 0;
						const bUnrated = !Number.isFinite(rb) || rb < 0;
						// «не оценён» всегда в конце, независимо от направления
						if (aUnrated && bUnrated) return 0;
						if (aUnrated) return 1;
						if (bUnrated) return -1;
						return dir * (ra - rb);
					});
				}

				if (counter) {
					counter.textContent = `// АРТЕФАКТОВ: ${items.length} //`;
				}

				let html = '';
				const cardData = [];

				for (const item of items) {
					cardData.push({
						url: item.SOURCE,
						rate: item.RATE || 0,
						fileName: getFileName(item.SOURCE)
					});

					const fileName = getFileName(item.SOURCE);

					const rate = Number(item.RATE);
					const isUnrated = !Number.isFinite(rate) || rate < 0;

					const rateHtml = isUnrated
						? `<div class="ai-card-rate unrated">✖ БЕЗ ОЦЕНКИ</div>`
						: `<div class="ai-card-rate">⭐ ${rate}<span>/100</span></div>`;

					html += `
					<div class="ai-card" data-url="${item.SOURCE}">
						<div class="ai-card-img-wrap">
							<img src="${item.SOURCE}" alt="AI Artifact" loading="lazy" onerror="this.src='https://woowz11.github.io/woowzsite/source/error-image.png'">
						</div>
						<div class="ai-card-info">
							${rateHtml}
							<div class="ai-card-size">☣ ${fileName} · L O A D I N G . . .</div>
						</div>
					</div>
					`;
				}

				grid.innerHTML = html;

				// Определяем размеры картинок и вставляем их в футер карточки
				for (let i = 0; i < cardData.length; i++) {
					(function(data) {
						const tempImg = new Image();
						tempImg.onload = function() {
							const cards = grid.querySelectorAll('.ai-card');
							for (let j = 0; j < cards.length; j++) {
								if (cards[j].dataset.url === data.url) {
									const sizeEl = cards[j].querySelector('.ai-card-size');
									if (sizeEl) sizeEl.textContent = `☣ ${data.fileName} · ${this.naturalWidth}×${this.naturalHeight}`;
									break;
								}
							}
						};
						tempImg.onerror = function() {
							const cards = grid.querySelectorAll('.ai-card');
							for (let j = 0; j < cards.length; j++) {
								if (cards[j].dataset.url === data.url) {
									const sizeEl = cards[j].querySelector('.ai-card-size');
									if (sizeEl) sizeEl.textContent = `☣ ${data.fileName} · ?×?`;
									break;
								}
							}
						};
						tempImg.src = data.url;
					})(cardData[i]);
				}
			}

			// Сортировка
			const sortBtns = document.querySelectorAll('.ai-sort-btn');
			sortBtns.forEach(btn => {
				btn.onclick = function(e) {
					e.stopPropagation();
					sortBtns.forEach(b => b.classList.remove('active'));
					this.classList.add('active');
					currentSort = this.dataset.sort;
					render();
				};
			});

			// Первый рендер
			render();

			console.log('✦ AI ARTS GALLERY ИНИЦИАЛИЗИРОВАНА ✦');
			console.log('📦 Артефактов:', TRUE_AI_ARTS_COLLECTION.length);
		}, false
	);
});