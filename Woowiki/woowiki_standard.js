if(typeof Woowiki === "undefined"){ throw new Error("woowiki_standard.js: сначала подключи woowiki.js, а потом этот файл!"); }

// ----------------------------------------------------------------------

const WW_STD_TEXT = {
	Pages         : "Страницы",
	Tags          : "Теги",
	AllPages      : "Все страницы",
	Search        : "Поиск…",
	SearchResults : "Результаты поиска",
	SearchButton  : "Найти",
	SearchAll     : "Все результаты",
	NothingFound  : "Ничего не найдено.",
	PagesWithTag  : "Страницы с тегом",
	MissingLink   : "Страница не существует",
	Contents      : "Содержание",
	Theme         : "Тема",
	Spoiler       : "Спойлер",
	Copy          : "Копировать",
	Copied        : "Скопировано",
	CopyFailed    : "Не вышло",
	OpenInNewTab  : "Открыть в новой вкладке",
	Random        : "Случайная страница",
	NoBacklinks   : "Сюда никто не ссылается.",
	Alpha         : "Прозрачность",
	TimelineFork  : "от",
	TimelineMerge : "в"
}

const WW_STD_DEFAULTS = {
	ThemeButton        : true,
	Popups             : true,
	PopupDelay         : 250,
	PopupHideDelay     : 300,
	SuggestCount       : 6,
	PreCopy            : true,
	CopyFlashDelay     : 1200,
	ImageZoom          : true,
	LazyImages         : true,
	ExternalLinksBlank : false,
	IframeHosts        : [],
	IframeSandbox      : "allow-scripts allow-same-origin allow-popups allow-forms",
	IframeHeight       : 480,
	EmbedParam         : "embed",
	Templates          : []
}

const WW_STD_ALIGNS = [ "left", "right", "center", "justify" ]
const WW_STD_BADGES = [ "gray", "blue", "green", "red", "yellow", "purple", "orange" ]
const WW_STD_ICONS = {
	ok     : "✔",
	no     : "✖",
	warn   : "⚠",
	info   : "ℹ",
	star   : "★",
	heart  : "♥",
	new    : "✦",
	fire   : "🔥",
	bolt   : "⚡",
	lock   : "🔒",
	gear   : "⚙",
	pin    : "📌",
	bug    : "🐞",
	book   : "📖",
	link   : "🔗",
	flag   : "⚑",
	clock  : "🕒",
	plus   : "+",
	minus  : "−",
	up     : "▲",
	down   : "▼",
	arrow  : "→",
	user   : "👤",
	tag    : "🏷"
}
const WW_STD_KEY_LABELS = {
	cmd       : "⌘",
	command   : "⌘",
	win       : "⊞",
	opt       : "⌥",
	option    : "⌥",
	up        : "↑",
	down      : "↓",
	left      : "←",
	right     : "→",
	enter     : "↵",
	backspace : "⌫"
}
const WW_STD_MOUSE = {
	lmb       : { Part: "left",  Arrow: "",  Tip: "Левая кнопка мыши" },
	rmb       : { Part: "right", Arrow: "",  Tip: "Правая кнопка мыши" },
	mmb       : { Part: "wheel", Arrow: "",  Tip: "Средняя кнопка мыши (нажатие на колесо)" },
	wheel     : { Part: "wheel", Arrow: "",  Tip: "Колесо мыши" },
	wheelup   : { Part: "wheel", Arrow: "▲", Tip: "Колесо мыши вверх" },
	wheeldown : { Part: "wheel", Arrow: "▼", Tip: "Колесо мыши вниз" },
	mouse4    : { Part: "side4", Arrow: "",  Tip: "Боковая кнопка «Назад» (Mouse 4)" },
	mouse5    : { Part: "side5", Arrow: "",  Tip: "Боковая кнопка «Вперёд» (Mouse 5)" },
	mouse     : { Part: "",      Arrow: "",  Tip: "Мышь" }
}
const WW_STD_MOUSE_ALIASES = {
	"лкм"    : "lmb",
	"пкм"    : "rmb",
	"скм"    : "mmb",
	"колесо" : "wheel",
	"mouse1" : "lmb",
	"mouse2" : "rmb",
	"mouse3" : "mmb"
}
const WW_STD_PAD_XBOX = {
	a     : { Label: "A",  Class: "ww-pad-green",    Tip: "Xbox: кнопка A" },
	b     : { Label: "B",  Class: "ww-pad-red",      Tip: "Xbox: кнопка B" },
	x     : { Label: "X",  Class: "ww-pad-blue",     Tip: "Xbox: кнопка X" },
	y     : { Label: "Y",  Class: "ww-pad-yellow",   Tip: "Xbox: кнопка Y" },
	lb    : { Label: "LB", Class: "ww-pad-shoulder", Tip: "Xbox: левый бампер" },
	rb    : { Label: "RB", Class: "ww-pad-shoulder", Tip: "Xbox: правый бампер" },
	lt    : { Label: "LT", Class: "ww-pad-shoulder", Tip: "Xbox: левый триггер" },
	rt    : { Label: "RT", Class: "ww-pad-shoulder", Tip: "Xbox: правый триггер" },
	ls    : { Label: "LS", Class: "ww-pad-stick",    Tip: "Xbox: левый стик (нажатие)" },
	rs    : { Label: "RS", Class: "ww-pad-stick",    Tip: "Xbox: правый стик (нажатие)" },
	start : { Label: "☰",  Class: "ww-pad-small",    Tip: "Xbox: Menu (Start)" },
	menu  : { Label: "☰",  Class: "ww-pad-small",    Tip: "Xbox: Menu (Start)" },
	back  : { Label: "⧉",  Class: "ww-pad-small",    Tip: "Xbox: View (Back)" },
	view  : { Label: "⧉",  Class: "ww-pad-small",    Tip: "Xbox: View (Back)" },
	dpad  : { Label: "✛",  Class: "ww-pad-small",    Tip: "Xbox: крестовина" },
	up    : { Label: "▲",  Class: "ww-pad-small",    Tip: "Xbox: крестовина вверх" },
	down  : { Label: "▼",  Class: "ww-pad-small",    Tip: "Xbox: крестовина вниз" },
	left  : { Label: "◀",  Class: "ww-pad-small",    Tip: "Xbox: крестовина влево" },
	right : { Label: "▶",  Class: "ww-pad-small",    Tip: "Xbox: крестовина вправо" }
}
const WW_STD_PAD_PS = {
	cross    : { Label: "✕",     Class: "ww-pad-blue",     Tip: "PlayStation: Cross (✕)" },
	circle   : { Label: "○",     Class: "ww-pad-red",      Tip: "PlayStation: Circle (○)" },
	square   : { Label: "□",     Class: "ww-pad-pink",     Tip: "PlayStation: Square (□)" },
	triangle : { Label: "△",     Class: "ww-pad-green",    Tip: "PlayStation: Triangle (△)" },
	l1       : { Label: "L1",    Class: "ww-pad-shoulder", Tip: "PlayStation: L1" },
	r1       : { Label: "R1",    Class: "ww-pad-shoulder", Tip: "PlayStation: R1" },
	l2       : { Label: "L2",    Class: "ww-pad-shoulder", Tip: "PlayStation: L2 (триггер)" },
	r2       : { Label: "R2",    Class: "ww-pad-shoulder", Tip: "PlayStation: R2 (триггер)" },
	l3       : { Label: "L3",    Class: "ww-pad-stick",    Tip: "PlayStation: L3 (нажатие левого стика)" },
	r3       : { Label: "R3",    Class: "ww-pad-stick",    Tip: "PlayStation: R3 (нажатие правого стика)" },
	options  : { Label: "☰",     Class: "ww-pad-small",    Tip: "PlayStation: Options" },
	share    : { Label: "Share", Class: "ww-pad-small",    Tip: "PlayStation: Share (Create)" },
	touchpad : { Label: "▭",     Class: "ww-pad-small",    Tip: "PlayStation: тачпад" },
	dpad     : { Label: "✛",     Class: "ww-pad-small",    Tip: "PlayStation: крестовина" },
	up       : { Label: "▲",     Class: "ww-pad-small",    Tip: "PlayStation: крестовина вверх" },
	down     : { Label: "▼",     Class: "ww-pad-small",    Tip: "PlayStation: крестовина вниз" },
	left     : { Label: "◀",     Class: "ww-pad-small",    Tip: "PlayStation: крестовина влево" },
	right    : { Label: "▶",     Class: "ww-pad-small",    Tip: "PlayStation: крестовина вправо" }
}
const WW_STD_LANE_COLORS = [ "#16a34a", "#ea580c", "#9333ea", "#dc2626", "#0891b2", "#ca8a04", "#db2777" ]
const WW_STD_DEFINE_RE = /^(:{3,})define[ \t]+([A-Za-z][A-Za-z0-9_]*)[ \t]*\r?\n([\s\S]*?)\r?\n\1[ \t\r]*$/gm
const WW_STD_PLACEHOLDER_RE = /\{([A-Za-z0-9_]+)(?:\|([^{}]*))?\}/g

const WW_STD_THEMES_CSS = `
.ww-theme-select{ padding:6px 12px; color:var(--ww-fg); background:var(--ww-bg); border:1px solid var(--ww-border); border-radius:var(--ww-radius); font:inherit; cursor:pointer; }
`

const WW_STD_ELEMENTS_CSS = `
.ww-infobox{ float:right; width:280px; max-width:100%; margin:0 0 12px 20px; border-collapse:collapse; background:var(--ww-code); font-size:14px; }
.ww-infobox caption{ padding:8px; font-weight:700; background:var(--ww-accent); color:var(--ww-panel); }
.ww-infobox th{ width:40%; text-align:left; vertical-align:top; }
.ww-infobox-image{ text-align:center; }
.ww-callout{ margin:0 0 1em; padding:10px 16px; background:var(--ww-code); border-left:4px solid var(--ww-accent); border-radius:var(--ww-radius); }
.ww-callout-title{ font-weight:700; margin-bottom:4px; }
.ww-callout > :last-child{ margin-bottom:0; }
.ww-callout-warn{ border-left-color:#d97706; }
.ww-callout-danger{ border-left-color:#dc2626; }
.ww-callout-tip{ border-left-color:#16a34a; }
.ww-spoiler{ margin:0 0 1em; padding:8px 14px; border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
.ww-spoiler summary{ cursor:pointer; font-weight:700; }
.ww-toc{ display:inline-block; min-width:200px; margin:0 0 1em; padding:10px 16px; background:var(--ww-code); border-radius:var(--ww-radius); }
.ww-toc-title{ font-weight:700; }
.ww-toc a{ display:block; text-decoration:none; }
.ww-toc-l2{ padding-left:16px; }
.ww-toc-l3{ padding-left:32px; }
.ww-columns{ display:grid; grid-template-columns:repeat(var(--ww-cols), minmax(0, 1fr)); gap:20px; margin-bottom:1em; }
.ww-video{ position:relative; margin:0 0 1em; padding-top:56.25%; }
.ww-video iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; }
.ww-article table:not(.ww-infobox):not(.ww-code table) :is(th, td):not([align]):not([style*="text-align"]){ text-align:center; vertical-align:middle; }
@media (max-width:760px){
	.ww-columns{ grid-template-columns:1fr; }
}
`

const WW_STD_SEARCH_CSS = `
.ww-search-box{ position:relative; flex:1; display:flex; gap:6px; max-width:420px; }
.ww-search{ flex:1; min-width:0; padding:6px 10px; color:var(--ww-fg); background:var(--ww-bg); border:1px solid var(--ww-border); border-radius:var(--ww-radius); font:inherit; }
.ww-suggest{ position:absolute; top:100%; left:0; right:0; z-index:30; margin-top:4px; overflow:hidden; background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); box-shadow:0 8px 24px rgba(0,0,0,.25); }
.ww-root .ww-suggest-item{ display:block; padding:8px 12px; color:var(--ww-fg); text-decoration:none; }
.ww-root .ww-suggest-item:hover, .ww-root .ww-suggest-item.ww-active{ background:var(--ww-code); }
.ww-suggest-name{ font-weight:700; }
.ww-suggest-text{ overflow:hidden; font-size:13px; white-space:nowrap; text-overflow:ellipsis; }
.ww-root .ww-suggest-all{ border-top:1px solid var(--ww-border); font-size:14px; color:var(--ww-accent); }
.ww-suggest-empty{ padding:8px 12px; }
@media (max-width:760px){
	.ww-search-box{ max-width:none; flex-basis:100%; }
}
`

const WW_STD_POPUPS_CSS = `
.ww-popup{ position:fixed; z-index:100; max-width:340px; padding:8px 12px; color:var(--ww-fg); background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); box-shadow:0 6px 20px rgba(0,0,0,.25); font-size:14px; line-height:1.45; }
.ww-popup::before{ content:""; position:absolute; inset:-6px; z-index:-1; }
.ww-popup-title{ font-weight:700; }
.ww-popup-text{ margin-top:4px; }
.ww-popup-text:first-child{ margin-top:0; }
.ww-popup-tags{ margin-top:6px; color:var(--ww-muted); font-size:13px; }
.ww-popup-source{ border-bottom:1px dotted var(--ww-muted); cursor:help; }
`

const WW_STD_COPY_CSS = `
.ww-copy{ display:flex; gap:6px; align-items:stretch; max-width:100%; margin:0 0 1em; }
span.ww-copy{ display:inline-flex; margin:0; vertical-align:middle; }
.ww-copy-field{ flex:1; min-width:0; padding:6px 10px; color:var(--ww-fg); background:var(--ww-code); border:1px solid var(--ww-border); border-radius:var(--ww-radius); font:13px/1.5 ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; }
textarea.ww-copy-field{ resize:vertical; white-space:pre; }
.ww-copy-button{ flex:none; }
.ww-pre{ position:relative; }
.ww-pre-copy{ position:absolute; top:6px; right:6px; padding:2px 8px; font:12px/1.4 inherit; color:var(--ww-muted); background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:4px; cursor:pointer; opacity:0; }
.ww-pre:hover .ww-pre-copy, .ww-pre-copy:focus{ opacity:1; }
.ww-pre-copy:hover{ color:var(--ww-fg); }
@media (hover:none){
	.ww-pre-copy{ opacity:1; }
}
`

const WW_STD_EMBED_CSS = `
.ww-frame{ position:relative; max-width:100%; margin:0 0 1em; background:var(--ww-code); border:1px solid var(--ww-border); border-radius:var(--ww-radius); overflow:hidden; }
.ww-frame iframe{ position:absolute; inset:0; width:100%; height:100%; border:0; background:#ffffff; }
.ww-frame-open{ position:absolute; top:6px; right:6px; z-index:1; padding:0 7px; color:#ffffff; background:rgba(0,0,0,.55); border-radius:4px; text-decoration:none; opacity:.35; }
.ww-frame:hover .ww-frame-open{ opacity:1; }
.ww-media{ display:block; max-width:100%; margin:0 0 1em; border-radius:var(--ww-radius); }
.ww-embed .ww-header, .ww-embed .ww-side, .ww-embed .ww-footer{ display:none; }
.ww-embed .ww-body{ display:block; width:auto; max-width:none; }
`

const WW_STD_BLOCKS_CSS = `
.ww-figure{ display:table; max-width:100%; margin:0 0 1em; }
.ww-figure img{ display:block; max-width:100%; height:auto; border-radius:var(--ww-radius); }
.ww-figure figcaption{ display:table-caption; caption-side:bottom; padding-top:6px; color:var(--ww-muted); font-size:13px; text-align:center; }
.ww-align-left{ float:left; margin-right:20px; }
.ww-align-right{ float:right; margin-left:20px; }
.ww-align-center{ margin-left:auto; margin-right:auto; }
.ww-gallery{ display:grid; grid-template-columns:repeat(var(--ww-cols), minmax(0, 1fr)); gap:12px; margin:0 0 1em; }
.ww-gallery figure{ margin:0; }
.ww-gallery img{ display:block; width:100%; aspect-ratio:4 / 3; object-fit:cover; border-radius:var(--ww-radius); }
.ww-gallery figcaption{ padding-top:4px; color:var(--ww-muted); font-size:13px; text-align:center; }
.ww-root .ww-btn{ display:inline-block; padding:6px 16px; color:var(--ww-panel); background:var(--ww-accent); border:1px solid var(--ww-accent); border-radius:var(--ww-radius); text-decoration:none; font-weight:600; }
.ww-root .ww-btn:hover{ opacity:.85; }
.ww-root .ww-btn-ghost{ color:var(--ww-accent); background:none; }
.ww-badge{ display:inline-flex; gap:.35em; align-items:center; padding:0 8px; border-radius:999px; font-size:.82em; font-weight:700; line-height:1.6; color:#ffffff; background:#6b7280; }
.ww-badge-light{ color:#222222; }
.ww-icon{ display:inline-block; line-height:1; }
img.ww-icon{ height:1em; width:auto; }
.ww-badge-blue{ background:#2563eb; }
.ww-badge-green{ background:#16a34a; }
.ww-badge-red{ background:#dc2626; }
.ww-badge-yellow{ background:#ca8a04; }
.ww-badge-purple{ background:#9333ea; }
.ww-badge-orange{ background:#ea580c; }
.ww-kbd{ display:inline-flex; gap:.25em; align-items:center; justify-content:center; padding:0 6px; font:.88em ui-monospace, Consolas, monospace; color:var(--ww-fg); background:var(--ww-code); border:1px solid var(--ww-border); border-radius:4px; box-shadow:0 2px 0 var(--ww-border); cursor:pointer; user-select:none; transition:transform .05s, box-shadow .05s; }
.ww-kbd.ww-down{ transform:translateY(2px); box-shadow:0 0 0 var(--ww-border); }
.ww-kbd-mouse, .ww-pad{ vertical-align:middle; }
.ww-mouse{ width:.85em; height:1.15em; }
.ww-mouse-body, .ww-mouse-line, .ww-mouse-wheel{ stroke:currentColor; stroke-width:1.4; stroke-linejoin:round; }
.ww-mouse-body, .ww-mouse-line{ fill:none; }
.ww-mouse-wheel{ fill:var(--ww-code); }
.ww-mouse-hit{ fill:var(--ww-accent); }
.ww-pad{ min-width:1.9em; color:#ffffff; background:#6b7280; border-color:transparent; border-radius:999px; font-weight:700; }
.ww-pad-green{ background:#16a34a; }
.ww-pad-red{ background:#dc2626; }
.ww-pad-blue{ background:#2563eb; }
.ww-pad-yellow{ background:#ca8a04; }
.ww-pad-pink{ background:#db2777; }
.ww-pad-shoulder{ border-radius:8px 8px 3px 3px; background:#4b5563; }
.ww-pad-stick{ background:#374151; }
.ww-pad-small{ background:#4b5563; }
.ww-mark{ padding:0 3px; color:#222222; background:#fde68a; border-radius:3px; }
.ww-abbr{ text-decoration:underline dotted; cursor:help; }
.ww-progress{ position:relative; height:22px; margin:0 0 1em; background:var(--ww-code); border:1px solid var(--ww-border); border-radius:var(--ww-radius); overflow:hidden; }
.ww-progress-bar{ height:100%; background:var(--ww-accent); opacity:.55; }
.ww-progress-label{ position:absolute; inset:0; padding:0 10px; font-size:13px; line-height:22px; }
.ww-quote{ margin:0 0 1em; padding:8px 18px; border-left:4px solid var(--ww-border); font-size:1.05em; }
.ww-quote > :last-child{ margin-bottom:0; }
.ww-quote footer{ margin-top:6px; color:var(--ww-muted); font-size:.9em; }
.ww-color{ display:inline-flex; gap:6px; align-items:center; }
.ww-color-box{ position:relative; display:inline-block; width:1.4em; height:1.1em; border:1px solid var(--ww-border); border-radius:4px; overflow:hidden; }
.ww-color-fill{ position:absolute; inset:0; }
.ww-color-text{ border-radius:4px; }
.ww-color-text > span{ padding:0 .25em; border-radius:4px; }
.ww-checker{ background-color:#ffffff; background-image:linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%), linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%); background-size:10px 10px; background-position:0 0, 5px 5px; }
.ww-steps{ margin:0 0 1em; padding:0; list-style:none; counter-reset:ww-step; }
.ww-steps li{ position:relative; min-height:28px; margin:0 0 10px; padding-left:40px; counter-increment:ww-step; }
.ww-steps li::before{ content:counter(ww-step); position:absolute; left:0; top:0; width:28px; height:28px; border-radius:50%; text-align:center; font-weight:700; line-height:28px; color:var(--ww-panel); background:var(--ww-accent); }
.ww-cards{ display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:14px; margin:0 0 1em; }
.ww-card{ padding:12px 16px; background:var(--ww-code); border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
.ww-card-title{ font-weight:700; margin-bottom:4px; }
.ww-card > :last-child{ margin-bottom:0; }
.ww-timeline{ margin:0 0 1em; }
.ww-tl-row{ display:flex; gap:10px; }
.ww-tl-graph{ display:flex; flex:none; }
.ww-tl-cell{ position:relative; width:22px; }
.ww-tl-cell i{ position:absolute; display:block; }
.ww-tl-up, .ww-tl-down{ left:50%; width:2px; margin-left:-1px; background:var(--ww-c); }
.ww-tl-up{ top:0; height:12px; }
.ww-tl-down{ top:12px; bottom:0; }
.ww-tl-l, .ww-tl-r{ top:11px; height:2px; background:var(--ww-h); }
.ww-tl-l{ left:0; width:50%; }
.ww-tl-r{ left:50%; width:50%; }
.ww-tl-dot{ left:50%; top:12px; width:10px; height:10px; margin:-5px 0 0 -5px; border-radius:50%; background:var(--ww-c); box-shadow:0 0 0 2px var(--ww-panel); }
.ww-tl-body{ flex:1; min-width:0; padding-bottom:12px; }
.ww-tl-date{ font-weight:700; color:var(--ww-accent); }
.ww-tl-tag{ display:inline-block; margin-left:6px; padding:0 8px; border-radius:999px; font-size:.8em; color:#ffffff; background:var(--ww-c); }
.ww-tabs{ margin:0 0 1em; border:1px solid var(--ww-border); border-radius:var(--ww-radius); overflow:hidden; }
.ww-tabs-bar{ display:flex; flex-wrap:wrap; background:var(--ww-code); border-bottom:1px solid var(--ww-border); }
.ww-tab{ padding:8px 16px; color:var(--ww-muted); background:none; border:0; border-bottom:2px solid transparent; font:inherit; cursor:pointer; }
.ww-tab.ww-active{ color:var(--ww-fg); border-bottom-color:var(--ww-accent); font-weight:700; }
.ww-tab-panel{ padding:10px 16px; }
.ww-tab-panel > :last-child{ margin-bottom:0; }
.ww-chart{ margin:0 0 1em; }
.ww-chart-row{ display:flex; gap:10px; align-items:center; margin-bottom:6px; }
.ww-chart-label{ flex:none; width:30%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.ww-chart-track{ flex:1; height:16px; background:var(--ww-code); border-radius:8px; overflow:hidden; }
.ww-chart-bar{ height:100%; background:var(--ww-accent); border-radius:8px; }
.ww-chart-value{ flex:none; min-width:48px; color:var(--ww-muted); font-size:13px; }
.ww-checklist{ margin:0 0 1em; padding:0; list-style:none; }
.ww-checklist li{ margin-bottom:4px; }
.ww-checklist .ww-done{ color:var(--ww-muted); text-decoration:line-through; }
`

const WW_STD_NAV_CSS = `
.ww-tagcloud{ display:flex; flex-wrap:wrap; gap:6px 12px; align-items:baseline; margin:0 0 1em; }
`

const WW_STD_MEDIA_CSS = `
.ww-zoomable{ cursor:zoom-in; }
.ww-lightbox{ position:fixed; inset:0; z-index:200; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; padding:20px; background:rgba(0,0,0,.85); cursor:zoom-out; }
.ww-lightbox[hidden]{ display:none; }
.ww-lightbox-image{ max-width:100%; max-height:calc(100% - 40px); object-fit:contain; }
.ww-lightbox-caption{ color:#ffffff; font-size:14px; }
`

// ----------------------------------------------------------------------

class WoowikiPopups{
	Wiki  = null;
	Box   = null;
	Rules = [];
	__Anchor    = null;
	__ShowTimer = 0;
	__HideTimer = 0;
	__Inside    = false;

	constructor(Wiki){
		this.Wiki = Wiki;
		this.Box  = Woowiki.Make("div", "ww-popup", Wiki.Root);
		this.Box.hidden = true;

		Wiki.On("PageBefore", () => this.Hide());
		if(Wiki.Options.Popups){ this.__Bind(); }
	}

	// ----------------------------------------------------------------------

	Add(Selector, Render){
		try{
			if(typeof Render !== "function"){ throw new ExceptionWW(`Render окна должен быть функцией, а не ${typeof Render}!`, null); }
			this.Rules.push({ Selector, Render });
		}catch(e){
			throw new ExceptionWW(`WoowikiPopups.Add(Selector = ${Woowiki.Dump(Selector)}) упал!`, e);
		}
	}

	Show(Content, X, Y){
		try{
			if(!WoowikiPopups.HasContent(Content)){ this.Hide(); return; }
			
			const Box = this.Box;
			this.Wiki.__Fill(Box, Content);
			Box.style.left = "0px";
			Box.style.top  = "0px";
			Box.hidden     = false;

			const Gap    = 8;
			const Width  = Box.offsetWidth;
			const Height = Box.offsetHeight;
			let Left = X + Gap;
			let Top  = Y + Gap;
			if(Left + Width > window.innerWidth - 8){ Left = Math.max(8, window.innerWidth - Width - 8); }
			if(Top + Height > window.innerHeight - 8){ Top = Math.max(8, Y - Height - Gap); }

			Box.style.left = `${Left}px`;
			Box.style.top  = `${Top}px`;
		}catch(e){
			throw new ExceptionWW(`WoowikiPopups.Show(X = ${X}, Y = ${Y}) упал!`, e);
		}
	}

	Hide(){
		clearTimeout(this.__ShowTimer);
		clearTimeout(this.__HideTimer);
		this.__Anchor = null;
		this.__Inside = false;
		this.Box.hidden = true;
	}
	
	/// Есть ли в содержимом хоть что-то видимое: текст, картинка, фрейм. Принимает строку или узел
	static HasContent(Content){
		if(Content === null || Content === undefined){ return false; }
		if(typeof Content === "string"){
			if(/<(?:img|svg|video|canvas|iframe|input|audio|picture)[\s>\/]/i.test(Content)){ return true; }
			return Content.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/gi, " ").trim() !== "";
		}
		if(Content.textContent !== undefined && Content.textContent.trim() !== ""){ return true; }
		if(Content.querySelector !== undefined){ return Content.querySelector("img, svg, video, canvas, iframe, input, audio, picture") !== null; }
		return false;
	}

	// ----------------------------------------------------------------------

	__Bind(){
		const Box = this.Box;
		this.Wiki.Root.addEventListener("mouseover", (OverEvent) => this.__OnOver(OverEvent));
		this.Wiki.Root.addEventListener("mouseleave", () => this.Hide());
		this.Wiki.Root.addEventListener("mousedown", (DownEvent) => {
			if(!Box.contains(DownEvent.target)){ this.Hide(); }
		});

		Box.addEventListener("mouseenter", () => {
			this.__Inside = true;
			clearTimeout(this.__HideTimer);
		});
		Box.addEventListener("mouseleave", (LeaveEvent) => {
			this.__Inside = false;
			if(LeaveEvent.buttons !== 0){ return; }
			this.__HideLater();
		});

		window.addEventListener("scroll", () => this.Hide(), { passive: true, capture: true });
	}

	__OnOver(OverEvent){
		try{
			const Target = OverEvent.target;
			if(!(Target instanceof Element)){ return; }
			if(OverEvent.buttons !== 0 && !this.Box.hidden){ return; }
			if(this.Box.contains(Target)){
				clearTimeout(this.__HideTimer);
				return;
			}

			const Titled = Target.closest("[title]");
			if(Titled !== null){
				const Title = Titled.getAttribute("title");
				if(Title.trim() !== ""){ Titled.setAttribute("data-ww-tip", Title); }
				Titled.removeAttribute("title");
			}

			let Anchor = null;
			let Rule   = null;
			for(let i = this.Rules.length - 1; i >= 0; i--){
				const Found = Target.closest(this.Rules[i].Selector);
				if(Found !== null){
					Anchor = Found;
					Rule   = this.Rules[i];
					break;
				}
			}

			if(Anchor === this.__Anchor){
				clearTimeout(this.__HideTimer);
				return;
			}
			if(Anchor === null){
				if(this.Box.hidden){ this.Hide(); }else{ this.__HideLater(); }
				return;
			}

			this.Hide();
			const X = OverEvent.clientX;
			const Y = OverEvent.clientY;
			this.__Anchor    = Anchor;
			this.__ShowTimer = setTimeout(() => this.__Fire(Anchor, Rule, X, Y), this.Wiki.Options.PopupDelay);
		}catch(e){
			console.error(new ExceptionWW(`WoowikiPopups.__OnOver() упал!`, e));
		}
	}

	__HideLater(){
		clearTimeout(this.__HideTimer);
		this.__HideTimer = setTimeout(() => {
			if(this.__Inside){ return; }
			this.Hide();
		}, this.Wiki.Options.PopupHideDelay);
	}

	__Fire(Anchor, Rule, X, Y){
		try{
			if(!Anchor.isConnected){ return; }
			const Result = Rule.Render(Anchor, this.Wiki);
			if(!WoowikiPopups.HasContent(Result)){ return; }
			this.Show(Result, X, Y);
		}catch(e){
			console.error(new ExceptionWW(`WoowikiPopups.__Fire(Selector = ${Rule.Selector}) упал!`, e));
		}
	}
}

// ----------------------------------------------------------------------

class WoowikiSearchBox{
	Wiki    = null;
	Box     = null;
	Input   = null;
	Button  = null;
	Suggest = null;
	__Timer  = 0;
	__Active = -1;

	constructor(Wiki){
		this.Wiki    = Wiki;
		this.Box     = Woowiki.Make("div", "ww-search-box");
		this.Input   = Woowiki.Make("input", "ww-search", this.Box);
		this.Button  = Woowiki.Make("button", "ww-button ww-search-button", this.Box);
		this.Suggest = Woowiki.Make("div", "ww-suggest", this.Box);

		this.Input.type         = "search";
		this.Input.placeholder  = Wiki.Text.Search;
		this.Input.autocomplete = "off";
		this.Button.type        = "button";
		this.Button.textContent = Wiki.Text.SearchButton;
		this.Suggest.hidden     = true;

		Wiki.Dom.Header.insertBefore(this.Box, Wiki.Dom.Buttons);
		this.__Bind();
	}

	// ----------------------------------------------------------------------

	Update(){
		try{
			const Query = this.Input.value.trim();
			const Box   = this.Suggest;
			if(Query === ""){ this.Close(); return; }

			const Found = this.Wiki.Search(Query, this.Wiki.Options.SuggestCount);
			Box.textContent = "";
			this.__Active   = -1;

			if(Found.length === 0){
				const Empty = Woowiki.Make("div", "ww-suggest-empty ww-muted", Box);
				Empty.textContent = this.Wiki.Text.NothingFound;
				Box.hidden = false;
				return;
			}

			for(let i = 0; i < Found.length; i++){
				const Id   = Found[i].Id;
				const Item = Woowiki.Make("a", "ww-suggest-item", Box);
				const Name = Woowiki.Make("div", "ww-suggest-name", Item);
				const Text = Woowiki.Make("div", "ww-suggest-text ww-muted", Item);

				let Snippet = this.Wiki.GetSnippetText(Id, Found[i].At);
				if(Snippet === ""){ Snippet = this.Wiki.GetSummary(Id, 80); }

				Item.href        = Woowiki.Href(Id);
				Name.textContent = this.Wiki.Pages[Id].Title;
				Text.textContent = Snippet;
			}

			const All = Woowiki.Make("a", "ww-suggest-item ww-suggest-all", Box);
			All.href        = Woowiki.Href("special:search", Query);
			All.textContent = `${this.Wiki.Text.SearchAll}: ${Query}`;
			Box.hidden = false;
		}catch(e){
			console.error(new ExceptionWW(`WoowikiSearchBox.Update() упал!`, e));
		}
	}

	OpenFull(){
		const Query = this.Input.value.trim();
		if(Query === ""){ return; }

		this.Close();
		this.Wiki.Go("special:search", Query).catch((e) => console.error(e));
	}

	Close(){
		clearTimeout(this.__Timer);
		this.Suggest.hidden = true;
		this.__Active       = -1;
	}

	// ----------------------------------------------------------------------

	__Bind(){
		this.Input.addEventListener("input", () => {
			clearTimeout(this.__Timer);
			this.__Timer = setTimeout(() => this.Update(), 80);
		});
		this.Input.addEventListener("focus", () => this.Update());
		this.Input.addEventListener("keydown", (KeyEvent) => this.__OnKey(KeyEvent));
		this.Button.addEventListener("click", () => this.OpenFull());
		this.Suggest.addEventListener("click", () => this.Close());
		document.addEventListener("mousedown", (DownEvent) => {
			if(!this.Box.contains(DownEvent.target)){ this.Close(); }
		});
		this.Wiki.On("PageBefore", () => this.Close());
	}

	__OnKey(KeyEvent){
		const Box   = this.Suggest;
		const Items = Box.querySelectorAll(".ww-suggest-item");

		if(KeyEvent.key === "ArrowDown" && !Box.hidden && Items.length > 0){
			KeyEvent.preventDefault();
			let Next = this.__Active + 1;
			if(Next >= Items.length){ Next = 0; }
			this.__SetActive(Next);
			return;
		}
		if(KeyEvent.key === "ArrowUp" && !Box.hidden && Items.length > 0){
			KeyEvent.preventDefault();
			let Next = this.__Active - 1;
			if(Next < 0){ Next = Items.length - 1; }
			this.__SetActive(Next);
			return;
		}
		if(KeyEvent.key === "Escape"){
			this.Close();
			return;
		}
		if(KeyEvent.key === "Enter"){
			if(!Box.hidden && this.__Active >= 0 && this.__Active < Items.length){
				Items[this.__Active].click();
				return;
			}
			this.OpenFull();
		}
	}

	__SetActive(Index){
		const Items = this.Suggest.querySelectorAll(".ww-suggest-item");
		for(let i = 0; i < Items.length; i++){
			Items[i].classList.toggle("ww-active", i === Index);
		}
		this.__Active = Index;
	}
}

// ----------------------------------------------------------------------

class WoowikiClipboard{
	Wiki = null;

	constructor(Wiki){
		this.Wiki = Wiki;
	}

	// ----------------------------------------------------------------------

	/// Копирует текст в буфер. Button: кнопка, на которой на секунду покажется результат, или null
	Copy(Text, Button){
		try{
			const Done = (Success) => {
				if(Button === null){ return; }
				if(Success){ this.Flash(Button, this.Wiki.Text.Copied); }else{ this.Flash(Button, this.Wiki.Text.CopyFailed); }
			};

			if(navigator.clipboard !== undefined && window.isSecureContext === true){
				navigator.clipboard.writeText(Text).then(() => Done(true), () => Done(this.__Fallback(Text)));
			}else{
				Done(this.__Fallback(Text));
			}
		}catch(e){
			throw new ExceptionWW(`WoowikiClipboard.Copy(Text.length = ${Text.length}) упал!`, e);
		}
	}

	/// Вешает на кнопку копирование. GetText вызывается в момент клика: () => Pre.textContent
	Attach(Button, GetText){
		Button.addEventListener("click", () => this.Copy(GetText(), Button));
	}

	Flash(Button, Label){
		if(Button.__Label === undefined){ Button.__Label = Button.textContent; }
		Button.textContent = Label;
		clearTimeout(Button.__Timer);
		Button.__Timer = setTimeout(() => { Button.textContent = Button.__Label; }, this.Wiki.Options.CopyFlashDelay);
	}

	// ----------------------------------------------------------------------

	__Fallback(Text){
		const Area = document.createElement("textarea");
		Area.value = Text;
		Area.style.position = "fixed";
		Area.style.opacity  = "0";
		document.body.appendChild(Area);
		Area.select();

		let Success = false;
		try{
			Success = document.execCommand("copy");
		}catch(e){
			console.error(new ExceptionWW(`WoowikiClipboard.__Fallback(Text.length = ${Text.length}) не смог скопировать!`, e));
		}
		Area.remove();
		return Success;
	}
}

// ----------------------------------------------------------------------

class WoowikiLightbox{
	Wiki    = null;
	Box     = null;
	Image   = null;
	Caption = null;

	constructor(Wiki){
		this.Wiki    = Wiki;
		this.Box     = Woowiki.Make("div", "ww-lightbox", Wiki.Root);
		this.Image   = Woowiki.Make("img", "ww-lightbox-image", this.Box);
		this.Caption = Woowiki.Make("div", "ww-lightbox-caption", this.Box);
		this.Box.hidden = true;

		this.Box.addEventListener("click", () => this.Close());
		Wiki.Root.addEventListener("click", (ClickEvent) => this.__OnClick(ClickEvent));
		document.addEventListener("keydown", (KeyEvent) => {
			if(KeyEvent.key === "Escape" && !this.Box.hidden){ this.Close(); }
		});
		Wiki.On("PageBefore", () => this.Close());
	}

	// ----------------------------------------------------------------------

	Open(Src, Caption){
		this.Image.src            = Src;
		this.Image.alt            = Caption;
		this.Caption.textContent  = Caption;
		this.Caption.hidden       = Caption === "";
		this.Box.hidden           = false;
	}

	Close(){
		this.Box.hidden = true;
		this.Image.removeAttribute("src");
	}

	// ----------------------------------------------------------------------

	__OnClick(ClickEvent){
		const Target = ClickEvent.target;
		if(!(Target instanceof Element) || !Target.classList.contains("ww-zoomable")){ return; }

		let Source = Target.currentSrc;
		if(Source === ""){ Source = Target.src; }
		this.Open(Source, Target.alt);
	}
}

// ----------------------------------------------------------------------

class WoowikiStd{
	static __Counter = 0;
	static __ColorCache   = new Map();
	static __ColorContext = null;

	static Prepare(Wiki){
		Woowiki.FillMissingKeys(Wiki.Options, WW_STD_DEFAULTS);
		Woowiki.FillMissingKeys(Wiki.Text, WW_STD_TEXT);
	}

	static AddCss(Wiki, Css, Id){
		if(Wiki.Options.BaseCss){ Wiki.AddCss(Css, Id); }
	}

	static AddCallout(Wiki, Name, Kind, Icon){
		Wiki.AddElement(Name, (Props, Ctx) => {
			let Type = Kind;
			if(Type === null){ Type = Woowiki.Slug(Props.Type ?? "note"); }
			let Title = "";
			if(Props.Title !== undefined){ Title = `<div class="ww-callout-title">${Icon} ${Ctx.Inline(Props.Title)}</div>`; }
			let Content = Ctx.Inline(Props.List.join(" "));
			if(Ctx.IsBlock){ Content = Ctx.Md(Ctx.Body); }
			return `<div class="ww-callout ww-callout-${Type}">${Title}${Content}</div>`;
		});
	}

	/// Обёртка в тег: {{mark текст}}, {{sup 2}}, {{sub i}}
	static AddWrap(Wiki, Name, Tag){
		Wiki.AddElement(Name, (Props, Ctx) => `<${Tag} class="ww-${Name}">${Ctx.Inline(Props.List.join(" "))}</${Tag}>`);
	}

	/// Выравнивание блока: :::align right, :::center
	static AddAlign(Wiki, Name, Fixed){
		Wiki.AddElement(Name, (Props, Ctx) => {
			if(!Ctx.IsBlock){ throw new ExceptionWW(`Элемент ${Name} работает только блоком: :::${Name}!`, null); }
			let Side = Fixed;
			if(Side === null){ Side = Props.List[0] ?? "left"; }
			if(WW_STD_ALIGNS.indexOf(Side) < 0){ throw new ExceptionWW(`Неверное выравнивание: Side = ${Woowiki.Dump(Side)}! Можно: ${WW_STD_ALIGNS.join(", ")}.`, null); }
			return `<div style="text-align:${Side}">${Ctx.Md(Ctx.Body)}</div>`;
		});
	}

	/// Значение флага из аргументов: true, "true", "1", "yes", "да"
	static Flag(Value, Default){
		if(Value === undefined){ return Default; }
		return Value === true || Value === "true" || Value === "1" || Value === "yes" || Value === "да";
	}

	/// Размер для CSS: число превращается в px, допустимы px % vh vw em rem ch
	static Size(Value, Default){
		if(Value === undefined){ return Default; }

		const Text = String(Value).trim();
		if(/^\d+(?:\.\d+)?$/.test(Text)){ return `${Text}px`; }
		if(/^\d+(?:\.\d+)?(?:px|%|vh|vw|em|rem|ch)$/.test(Text)){ return Text; }
		throw new ExceptionWW(`Неверный размер: Value = ${Woowiki.Dump(Value)}! Нужно число или число с px, %, vh, vw, em, rem, ch.`, null);
	}

	static Lines(Body){
		const Parts  = Body.split("\n");
		const Result = [];
		for(let i = 0; i < Parts.length; i++){
			const Line = Parts[i].trim();
			if(Line !== ""){ Result.push(Line); }
		}
		return Result;
	}

	/// Делит тело на разделы по строкам "@@ Заголовок". Возвращает [{ Title, Lines }]
	static Sections(Body){
		const Parts  = Body.split("\n");
		const Result = [];
		for(let i = 0; i < Parts.length; i++){
			const Match = /^@@\s*(.*)$/.exec(Parts[i].trim());
			if(Match !== null){
				Result.push({ Title: Match[1], Lines: [] });
				continue;
			}
			if(Result.length === 0){ continue; }
			Result[Result.length - 1].Lines.push(Parts[i]);
		}
		if(Result.length === 0){ throw new ExceptionWW(`В теле нет разделов: нужны строки вида "@@ Заголовок"!`, null); }
		return Result;
	}

	static ParseCsv(Text, Sep){
		const Rows   = [];
		let   Row    = [];
		let   Cell   = "";
		let   Quoted = false;

		for(let i = 0; i < Text.length; i++){
			const Char = Text[i];
			if(Quoted){
				if(Char === '"'){
					if(Text[i + 1] === '"'){ Cell += '"'; i++; }else{ Quoted = false; }
				}else{
					Cell += Char;
				}
				continue;
			}
			if(Char === '"' && Cell === ""){ Quoted = true; continue; }
			if(Char === Sep){
				Row.push(Cell.trim());
				Cell = "";
				continue;
			}
			if(Char === "\n"){
				Row.push(Cell.trim());
				Cell = "";
				if(Row.length > 1 || Row[0] !== ""){ Rows.push(Row); }
				Row = [];
				continue;
			}
			Cell += Char;
		}

		Row.push(Cell.trim());
		if(Row.length > 1 || Row[0] !== ""){ Rows.push(Row); }
		return Rows;
	}

	/// Пропускает только http, https и file. Возвращает адрес как есть
	static CheckUrl(Url){
		const Text = String(Url).trim();
		if(Text === ""){ throw new ExceptionWW(`Адрес пустой!`, null); }

		const Parsed = new URL(Text, location.href);
		if(Parsed.protocol !== "http:" && Parsed.protocol !== "https:" && Parsed.protocol !== "file:"){
			throw new ExceptionWW(`Протокол "${Parsed.protocol}" не разрешён: Url = ${Woowiki.Dump(Url)}! Можно http, https, file.`, null);
		}
		return Text;
	}

	/// Если задана опция IframeHosts, пропускает только эти хосты и свой сайт
	static CheckHost(Wiki, Url){
		const Hosts = Wiki.Options.IframeHosts;
		if(Hosts.length === 0){ return; }

		const Parsed = new URL(Url, location.href);
		if(Parsed.host === location.host){ return; }
		for(let i = 0; i < Hosts.length; i++){
			if(Parsed.hostname === Hosts[i] || Parsed.hostname.endsWith(`.${Hosts[i]}`)){ return; }
		}
		throw new ExceptionWW(`Хост "${Parsed.hostname}" не разрешён для iframe! Разрешены: ${Hosts.join(", ")}.`, null);
	}

	/// Адрес этой же вики с открытой страницей Id в режиме встраивания (без шапки и меню)
	static PageUrl(Wiki, Id){
		const Base = location.href.split("#")[0].split("?")[0];
		return `${Base}?${Wiki.Options.EmbedParam}=1${Woowiki.Href(Id)}`;
	}

	/// Рамка с iframe. Attrs: готовая строка атрибутов (src, sandbox, title). OpenUrl: адрес для ссылки "↗" или null
	static FrameHtml(Wiki, Props, Attrs, OpenUrl){
		let Style = `width:${WoowikiStd.Size(Props.Width, "100%")};`;
		if(Props.Ratio !== undefined){
			if(!/^\d+:\d+$/.test(Props.Ratio)){ throw new ExceptionWW(`Неверное соотношение сторон: Ratio = ${Woowiki.Dump(Props.Ratio)}! Нужно вида 16:9.`, null); }
			Style += `aspect-ratio:${Props.Ratio.replace(":", " / ")};`;
		}else{
			Style += `height:${WoowikiStd.Size(Props.Height, `${Wiki.Options.IframeHeight}px`)};`;
		}

		let Open = "";
		if(OpenUrl !== null && WoowikiStd.Flag(Props.Open, true)){
			Open = `<a class="ww-frame-open" href="${Woowiki.Esc(OpenUrl)}" target="_blank" rel="noopener noreferrer" title="${Woowiki.Esc(Wiki.Text.OpenInNewTab)}">↗</a>`;
		}
		return `<div class="ww-frame" style="${Style}"><iframe ${Attrs} loading="lazy" allowfullscreen></iframe>${Open}</div>`;
	}

	/// Кнопки копирования на обычных блоках pre. Блоки с языком оставляет моду code
	static UpgradePre(Target, Wiki){
		if(Target === undefined || Target === null || Target.querySelectorAll === undefined){ return; }

		const List = Target.querySelectorAll("pre");
		for(let i = 0; i < List.length; i++){
			const Pre = List[i];
			if(Pre.closest(".ww-code") !== null || Pre.closest(".ww-pre") !== null){ continue; }
			if(Wiki.Code !== undefined && Wiki.Code.__FenceLang(Pre) !== ""){ continue; }

			const Holder = document.createElement("div");
			Holder.className = "ww-pre";
			Pre.replaceWith(Holder);
			Holder.appendChild(Pre);

			const Button = Woowiki.Make("button", "ww-pre-copy", Holder);
			Button.type        = "button";
			Button.textContent = Wiki.Text.Copy;
			Wiki.Clipboard.Attach(Button, () => Pre.textContent);
		}
	}

	/// Ленивая загрузка и увеличение картинок, пометка внешних ссылок
	static UpgradeMedia(Target, Wiki){
		if(Target === undefined || Target === null || Target.querySelectorAll === undefined){ return; }

		const Options = Wiki.Options;
		if(Options.LazyImages || Options.ImageZoom){
			const Images = Target.querySelectorAll("img");
			for(let i = 0; i < Images.length; i++){
				const Image = Images[i];
				if(Options.LazyImages && !Image.hasAttribute("loading")){ Image.loading = "lazy"; }
				if(Options.ImageZoom && Image.closest("a") === null && Image.closest(".ww-popup") === null){ Image.classList.add("ww-zoomable"); }
			}
		}

		const Links = Target.querySelectorAll("a[href]");
		for(let i = 0; i < Links.length; i++){
			const Link = Links[i];
			if(Link.protocol !== "http:" && Link.protocol !== "https:"){ continue; }
			if(Link.host === location.host){ continue; }

			Link.classList.add("ww-external");
			Link.rel = "noopener noreferrer";
			if(Options.ExternalLinksBlank){ Link.target = "_blank"; }
		}
	}

	// ----------------------------------------------------------------------

	static Has(Source, Key){ return Object.prototype.hasOwnProperty.call(Source, Key); }
	static IsImageUrl(Text){ return /^(https?:|data:image\/|\.{0,2}\/.)/i.test(Text) || /\.(png|svg|jpe?g|gif|webp|ico|avif)$/i.test(Text); }
	/// Читает любой CSS-цвет. Возвращает { Value, Alpha, Light } или null, если цвет неверный. Alpha от 0 до 1
	static ReadColor(Value){
		if(WoowikiStd.__ColorCache.has(Value)){ return WoowikiStd.__ColorCache.get(Value); }
		let Result = null;
		if(CSS.supports("color", Value)){
			if(WoowikiStd.__ColorContext === null){
				const Canvas = document.createElement("canvas");
				Canvas.width  = 1;
				Canvas.height = 1;
				WoowikiStd.__ColorContext = Canvas.getContext("2d", { willReadFrequently: true });
			}
			const Context = WoowikiStd.__ColorContext;
			Context.clearRect(0, 0, 1, 1);
			Context.fillStyle = "#000000";
			Context.fillStyle = Value;
			Context.fillRect(0, 0, 1, 1);
			const Data = Context.getImageData(0, 0, 1, 1).data;
			Result = { Value, Alpha: Data[3] / 255, Light: (299 * Data[0] + 587 * Data[1] + 114 * Data[2]) / 1000 > 150 };
		}
		WoowikiStd.__ColorCache.set(Value, Result);
		return Result;
	}
	/// Иконка для badge: имя из WW_STD_ICONS, любой символ или эмодзи, либо адрес картинки
	static IconHtml(Icon){
		if(Icon === undefined || Icon === ""){ return ""; }
		let Source = Icon;
		if(WoowikiStd.Has(WW_STD_ICONS, Icon.toLowerCase())){ Source = WW_STD_ICONS[Icon.toLowerCase()]; }
		if(WoowikiStd.IsImageUrl(Source)){ return `<img class="ww-icon" src="${Woowiki.Esc(Woowiki.SafeUrl(Source))}" alt="">`; }
		return `<span class="ww-icon">${Woowiki.Esc(Source)}</span>`;
	}
	/// Делит "Ctrl+Shift+P" на клавиши. "Ctrl++" даёт Ctrl и +
	static SplitKeys(Text){
		const Keys    = [];
		let   Current = "";
		for(let i = 0; i < Text.length; i++){
			if(Text[i] === "+" && Current.trim() !== ""){
				Keys.push(Current.trim());
				Current = "";
				continue;
			}
			Current += Text[i];
		}
		if(Current.trim() !== ""){ Keys.push(Current.trim()); }
		return Keys;
	}
	static MouseSvg(Part){
		let Hit        = "";
		let WheelClass = "ww-mouse-wheel";
		if(Part === "left"){ Hit = `<path class="ww-mouse-hit" d="M12 2 A9 9 0 0 0 3 11 L3 13 L12 13 Z"/>`; }
		if(Part === "right"){ Hit = `<path class="ww-mouse-hit" d="M12 2 A9 9 0 0 1 21 11 L21 13 L12 13 Z"/>`; }
		if(Part === "side5"){ Hit = `<rect class="ww-mouse-hit" x="0.8" y="14.5" width="3.2" height="4.5" rx="1.2"/>`; }
		if(Part === "side4"){ Hit = `<rect class="ww-mouse-hit" x="0.8" y="20" width="3.2" height="4.5" rx="1.2"/>`; }
		if(Part === "wheel"){ WheelClass = "ww-mouse-wheel ww-mouse-hit"; }
		return `<svg class="ww-mouse" viewBox="0 0 24 32" aria-hidden="true">${Hit}<rect class="ww-mouse-body" x="3" y="2" width="18" height="28" rx="9"/><path class="ww-mouse-line" d="M3 13 H21 M12 2 V13"/><rect class="${WheelClass}" x="10.2" y="4.5" width="3.6" height="6.5" rx="1.8"/></svg>`;
	}
	static MouseHtml(Button){
		let Arrow = "";
		if(Button.Arrow !== ""){ Arrow = `<span>${Button.Arrow}</span>`; }
		return `<kbd class="ww-kbd ww-kbd-mouse" data-ww-tip="${Woowiki.Esc(Button.Tip)}">${WoowikiStd.MouseSvg(Button.Part)}${Arrow}</kbd>`;
	}
	static PadHtml(Table, Key, Name){
		if(!WoowikiStd.Has(Table, Key)){
			const List = [];
			for(const Item in Table){ List.push(Item); }
			throw new ExceptionWW(`Неизвестная кнопка геймпада: Name = ${Woowiki.Dump(Name)}! Можно: ${List.join(", ")}.`, null);
		}
		const Button = Table[Key];
		return `<kbd class="ww-kbd ww-pad ${Button.Class}" data-ww-tip="${Woowiki.Esc(Button.Tip)}">${Woowiki.Esc(Button.Label)}</kbd>`;
	}
	/// Одна клавиша: обычная, мышь (LMB, Wheel…), геймпад (pad:A, ps:Cross)
	static KeyHtml(Name){
		const Lower = Name.toLowerCase();
		if(Lower.startsWith("pad:")){ return WoowikiStd.PadHtml(WW_STD_PAD_XBOX, Lower.slice(4), Name); }
		if(Lower.startsWith("ps:")){ return WoowikiStd.PadHtml(WW_STD_PAD_PS, Lower.slice(3), Name); }
		let Mouse = Lower;
		if(WoowikiStd.Has(WW_STD_MOUSE_ALIASES, Lower)){ Mouse = WW_STD_MOUSE_ALIASES[Lower]; }
		if(WoowikiStd.Has(WW_STD_MOUSE, Mouse)){ return WoowikiStd.MouseHtml(WW_STD_MOUSE[Mouse]); }
		let Label = Name;
		if(WoowikiStd.Has(WW_STD_KEY_LABELS, Lower)){ Label = WW_STD_KEY_LABELS[Lower]; }
		return `<kbd class="ww-kbd">${Woowiki.Esc(Label)}</kbd>`;
	}
	/// Эффект нажатия на клавишу: класс держится, пока кнопка зажата, и ещё 90 мс после
	static PressKey(DownEvent){
		const Target = DownEvent.target;
		if(!(Target instanceof Element)){ return; }
		const Key = Target.closest(".ww-kbd");
		if(Key === null){ return; }
		Key.classList.add("ww-down");
		const Release = () => {
			window.removeEventListener("pointerup", Release);
			window.removeEventListener("pointercancel", Release);
			setTimeout(() => Key.classList.remove("ww-down"), 90);
		};
		window.addEventListener("pointerup", Release);
		window.addEventListener("pointercancel", Release);
	}
	static FindLane(Lanes, Name){
		for(let i = 0; i < Lanes.length; i++){
			if(Lanes[i].Name === Name){ return Lanes[i]; }
		}
		return null;
	}
	/// Разбирает строки timeline. Возвращает { Lanes, Rows }. Строки: "дата | текст", "ветка | дата | текст", "ветка from родитель | дата | текст", "ветка into цель | дата | текст"
	static ParseTimeline(Lines){
		const Lanes = [];
		const Rows  = [];
		for(let i = 0; i < Lines.length; i++){
			const Line  = Lines[i];
			const Parts = Line.split("|");
			if(Parts.length < 2){ throw new ExceptionWW(`Строка timeline должна быть вида "дата | событие" или "ветка | дата | событие": Line = ${Woowiki.Dump(Line)}!`, null); }
			let Spec = "main";
			let When = Parts[0].trim();
			let Text = Parts.slice(1).join("|").trim();
			if(Parts.length > 2){
				Spec = Parts[0].trim();
				When = Parts[1].trim();
				Text = Parts.slice(2).join("|").trim();
			}
			const Match = /^(\S+)(?:\s+(from|от|into|в)\s+(\S+))?$/i.exec(Spec);
			if(Match === null){ throw new ExceptionWW(`Неверное описание ветки: Spec = ${Woowiki.Dump(Spec)}, Line = ${Woowiki.Dump(Line)}! Нужно "имя", "имя from родитель" или "имя into цель".`, null); }
			const Name = Match[1];
			const Word = (Match[2] ?? "").toLowerCase();
			const Other = Match[3] ?? "";
			let Lane = WoowikiStd.FindLane(Lanes, Name);
			let Kind = "commit";
			let Link = null;
			if(Word === "into" || Word === "в"){
				if(Lane === null){ throw new ExceptionWW(`Неизвестная ветка для слияния: Name = ${Woowiki.Dump(Name)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				Link = WoowikiStd.FindLane(Lanes, Other);
				if(Link === null){ throw new ExceptionWW(`Неизвестная ветка-цель слияния: Target = ${Woowiki.Dump(Other)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				if(Link === Lane){ throw new ExceptionWW(`Ветку нельзя слить в саму себя: Name = ${Woowiki.Dump(Name)}!`, null); }
				if(Lane.MergedAt >= 0){ throw new ExceptionWW(`Ветка уже слита, повторное слияние: Name = ${Woowiki.Dump(Name)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				if(Link.MergedAt >= 0){ throw new ExceptionWW(`Ветка-цель уже слита: Target = ${Woowiki.Dump(Other)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				Kind = "merge";
			}else{
				if(Lane !== null && Lane.MergedAt >= 0){ throw new ExceptionWW(`Событие в уже слитой ветке: Name = ${Woowiki.Dump(Name)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				if(Word !== ""){
					if(Lane !== null){ throw new ExceptionWW(`from можно писать только при создании ветки, а ветка уже есть: Name = ${Woowiki.Dump(Name)}, Line = ${Woowiki.Dump(Line)}!`, null); }
					Link = WoowikiStd.FindLane(Lanes, Other);
					if(Link === null){ throw new ExceptionWW(`Неизвестная ветка-родитель: Parent = ${Woowiki.Dump(Other)}, Line = ${Woowiki.Dump(Line)}!`, null); }
				}else if(Lane === null && Rows.length > 0){
					Link = Rows[Rows.length - 1].Dot;
				}
				if(Lane === null){
					let Color = "var(--ww-accent)";
					if(Lanes.length > 0){ Color = WW_STD_LANE_COLORS[(Lanes.length - 1) % WW_STD_LANE_COLORS.length]; }
					Lane = { Name, Index: Lanes.length, Color, Start: Rows.length, End: Rows.length, MergedAt: -1 };
					Lanes.push(Lane);
					if(Link !== null){ Kind = "fork"; }
				}
			}
			const Index  = Rows.length;
			let   Dot    = Lane;
			let   Source = null;
			if(Kind === "merge"){
				Dot          = Link;
				Source       = Lane;
				Lane.MergedAt = Index;
				Lane.End      = Index;
				Link.End      = Index;
			}else{
				Lane.End = Index;
				if(Kind === "fork" && Link.MergedAt < 0 && Link.End < Index){ Link.End = Index; }
			}
			Rows.push({ Dot, Source, Link, Kind, When, Text });
		}
		return { Lanes, Rows };
	}
	static TimelineHtml(Timeline, Wiki, Ctx){
		const Lanes = Timeline.Lanes;
		const Rows  = Timeline.Rows;
		const Multi = Lanes.length > 1;
		let Html = "";
		for(let i = 0; i < Rows.length; i++){
			const Row = Rows[i];
			let From     = -1;
			let Join     = "";
			let Tag      = Row.Dot.Name;
			let TagColor = Row.Dot.Color;
			if(Row.Kind === "fork"){
				From = Row.Link.Index;
				Join = Row.Dot.Color;
				Tag  = `${Row.Dot.Name} ${Wiki.Text.TimelineFork} ${Row.Link.Name}`;
			}
			if(Row.Kind === "merge"){
				From     = Row.Source.Index;
				Join     = Row.Source.Color;
				Tag      = `${Row.Source.Name} ${Wiki.Text.TimelineMerge} ${Row.Dot.Name}`;
				TagColor = Row.Source.Color;
			}
			const To = Row.Dot.Index;
			let Lo = -1;
			let Hi = -1;
			if(From >= 0){
				Lo = Math.min(From, To);
				Hi = Math.max(From, To);
			}
			let Cells = "";
			for(let j = 0; j < Lanes.length; j++){
				const Lane = Lanes[j];
				let Inner = "";
				if(Lane.Start < i && i <= Lane.End){ Inner += `<i class="ww-tl-up"></i>`; }
				if(Lane.Start <= i && i < Lane.End){ Inner += `<i class="ww-tl-down"></i>`; }
				if(Lo >= 0 && j >= Lo && j <= Hi){
					if(j > Lo){ Inner += `<i class="ww-tl-l"></i>`; }
					if(j < Hi){ Inner += `<i class="ww-tl-r"></i>`; }
				}
				if(j === To){ Inner += `<i class="ww-tl-dot"></i>`; }
				Cells += `<span class="ww-tl-cell" style="--ww-c:${Lane.Color};--ww-h:${Join === "" ? Lane.Color : Join}">${Inner}</span>`;
			}
			let TagHtml = "";
			if(Multi){ TagHtml = `<span class="ww-tl-tag" style="--ww-c:${TagColor}">${Woowiki.Esc(Tag)}</span>`; }
			Html += `<div class="ww-tl-row"><div class="ww-tl-graph">${Cells}</div><div class="ww-tl-body"><span class="ww-tl-date">${Ctx.Inline(Row.When)}</span>${TagHtml}<div>${Ctx.Inline(Row.Text)}</div></div></div>`;
		}
		return `<div class="ww-timeline">${Html}</div>`;
	}
	static FindProp(Props, Key){
		const Lower = Key.toLowerCase();
		for(const Name in Props){
			if(Name !== "List" && Name.toLowerCase() === Lower){ return Props[Name]; }
		}
		return undefined;
	}
	/// Подставляет в шаблон {Имя}, {Имя|по умолчанию}, {1} (позиционный), {Body} (тело как markdown). Значения экранируются
	static FillTemplate(Template, Props, Ctx){
		let Body = null;
		return Template.replace(WW_STD_PLACEHOLDER_RE, (Whole, Key, Default) => {
			if(Key.toLowerCase() === "body" && WoowikiStd.FindProp(Props, "body") === undefined){
				if(Body === null){
					if(Ctx.IsBlock){ Body = Ctx.Md(Ctx.Body); }else{ Body = Ctx.Inline(Props.List.join(" ")); }
				}
				return Body;
			}
			let Value = undefined;
			if(/^\d+$/.test(Key)){ Value = Props.List[Number(Key) - 1]; }else{ Value = WoowikiStd.FindProp(Props, Key); }
			if(Value === undefined){ Value = Default ?? ""; }
			return Woowiki.Esc(String(Value));
		});
	}
	/// Регистрирует элемент по шаблону. Имя: маленькие латинские буквы, цифры и _, начинается с буквы
	static AddTemplate(Wiki, Name, Template){
		if(!/^[a-z][a-z0-9_]*$/.test(Name)){ throw new ExceptionWW(`Неверное имя элемента: Name = ${Woowiki.Dump(Name)}! Нужны маленькие латинские буквы, цифры и _, первой буквой.`, null); }
		if(Name === "define"){ throw new ExceptionWW(`Элемент define переопределять нельзя!`, null); }
		if(Template === ""){ throw new ExceptionWW(`У шаблона пустое тело: Name = ${Woowiki.Dump(Name)}!`, null); }
		if(Wiki.Templates[Name] === Template){ return; }
		Wiki.Templates[Name] = Template;
		Wiki.AddElement(Name, (Props, Ctx) => WoowikiStd.FillTemplate(Template, Props, Ctx));
	}
	/// Находит в сыром тексте блоки ::define и регистрирует их до отрисовки
	static ScanTemplates(Wiki, Text){
		if(Text.indexOf("define") < 0){ return; }
		WW_STD_DEFINE_RE.lastIndex = 0;
		let Match = WW_STD_DEFINE_RE.exec(Text);
		while(Match !== null){
			const Name = Match[2].toLowerCase();
			try{
				WoowikiStd.AddTemplate(Wiki, Name, Match[3].replace(/^\n+|\s+$/g, ""));
			}catch(e){
				console.error(new ExceptionWW(`WoowikiStd.ScanTemplates(Name = ${Name}) упал!`, e));
			}
			Match = WW_STD_DEFINE_RE.exec(Text);
		}
	}
	/// Читает страницы из опции Templates один раз, перед первой отрисовкой
	static LoadTemplatePages(Wiki){
		const Ids = Wiki.Options.Templates;
		for(let i = 0; i < Ids.length; i++){
			const Page = Wiki.Pages[Ids[i]];
			if(Page === undefined){
				console.error(new ExceptionWW(`Страницы шаблонов Id = ${Woowiki.Dump(Ids[i])} нет! Проверь опцию Templates.`, null));
				continue;
			}
			WoowikiStd.ScanTemplates(Wiki, Page.Content);
		}
	}

	static InstallThemes(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_THEMES_CSS, "std-themes");

		Wiki.AddTheme("light", { Bg: "#f5f5f5", Panel: "#ffffff", Fg: "#222222", Muted: "#6b6b6b", Link: "#2563eb", Missing: "#dc2626", Border: "#dcdcdc", Accent: "#2563eb", Code: "#eeeeee" });
		Wiki.AddTheme("dark",  { Bg: "#121212", Panel: "#1c1c1c", Fg: "#e2e2e2", Muted: "#9a9a9a", Link: "#8ab4f8", Missing: "#ff7b7b", Border: "#333333", Accent: "#8ab4f8", Code: "#262626" });
		Wiki.AddTheme("sepia", { Bg: "#f1e7d0", Panel: "#f8f1e1", Fg: "#433422", Muted: "#7a6a52", Link: "#8a4b08", Missing: "#b3261e", Border: "#d8c9a8", Accent: "#8a4b08", Code: "#eadfc3" });

		if(!Wiki.Options.ThemeButton){ return; }
		Wiki.AddButton({ Id: "theme", Order: 90, Render: (Wiki) => {
			const Select = Woowiki.Make("select", "ww-theme-select");
			Select.title = Wiki.Text.Theme;
			for(const Name in Wiki.Themes){
				const Option = Woowiki.Make("option", "", Select);
				Option.value       = Name;
				Option.textContent = Name;
				Option.selected    = Name === Wiki.Theme;
			}
			Select.addEventListener("change", () => Wiki.SetTheme(Select.value));
			return Select;
		}});
	}

	static InstallElements(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_ELEMENTS_CSS, "std-elements");

		Wiki.AddElement("infobox", (Props, Ctx) => {
			let Html = "";
			if(Props.Title !== undefined){ Html += `<caption>${Ctx.Inline(Props.Title)}</caption>`; }
			if(Props.Image !== undefined){ Html += `<tr><td colspan="2" class="ww-infobox-image"><img src="${Woowiki.Esc(Woowiki.SafeUrl(Props.Image))}" alt=""></td></tr>`; }

			const Lines = Ctx.Body.split("\n");
			for(let i = 0; i < Lines.length; i++){
				const At = Lines[i].indexOf(":");
				if(At < 1){ continue; }
				const Key   = Lines[i].slice(0, At).trim();
				const Value = Lines[i].slice(At + 1).trim();
				Html += `<tr><th>${Ctx.Inline(Key)}</th><td>${Ctx.Inline(Value)}</td></tr>`;
			}
			return `<table class="ww-infobox">${Html}</table>`;
		});

		WoowikiStd.AddCallout(Wiki, "callout", null,     "ℹ️");
		WoowikiStd.AddCallout(Wiki, "note",    "note",   "ℹ️");
		WoowikiStd.AddCallout(Wiki, "warn",    "warn",   "⚠️");
		WoowikiStd.AddCallout(Wiki, "danger",  "danger", "⛔");
		WoowikiStd.AddCallout(Wiki, "tip",     "tip",    "💡");

		Wiki.AddElement("spoiler", (Props, Ctx) => {
			const Title = Props.Title === undefined ? Wiki.Text.Spoiler : Props.Title;
			return `<details class="ww-spoiler"><summary>${Ctx.Inline(Title)}</summary>${Ctx.Md(Ctx.Body)}</details>`;
		});

		Wiki.AddElement("toc", (Props, Ctx) => {
			const Mount = (Box) => {
				const Content = Box.closest(".ww-content");
				if(Content === null){ return; }

				Box.textContent = "";
				Box.className   = "ww-toc";
				const Title = Woowiki.Make("div", "ww-toc-title", Box);
				Title.textContent = Wiki.Text.Contents;

				const Heads = Content.querySelectorAll("h2, h3, h4");
				for(let i = 0; i < Heads.length; i++){
					const Head  = Heads[i];
					const Level = Number(Head.tagName.charAt(1)) - 1;
					const Link  = Woowiki.Make("a", `ww-toc-l${Level}`, Box);
					Link.href        = "#";
					Link.textContent = Head.textContent;
					Link.addEventListener("click", (ClickEvent) => {
						ClickEvent.preventDefault();
						Head.scrollIntoView();
					});
				}
			};
			return { Html: "", Mount };
		});

		Wiki.AddElement("columns", (Props, Ctx) => {
			const Lines = Ctx.Body.split("\n");
			const Cols  = [[]];
			for(let i = 0; i < Lines.length; i++){
				if(Lines[i].trim() === "|||"){ Cols.push([]); }else{ Cols[Cols.length - 1].push(Lines[i]); }
			}

			let Html = "";
			for(let i = 0; i < Cols.length; i++){
				Html += `<div class="ww-col">${Ctx.Md(Cols[i].join("\n"))}</div>`;
			}
			return `<div class="ww-columns" style="--ww-cols:${Cols.length}">${Html}</div>`;
		});

		Wiki.AddElement("pagelist", (Props) => {
			const Ids   = Wiki.SortedIds();
			const Tag   = Props.Tag === undefined ? null : Props.Tag.toLowerCase();
			const Found = [];
			for(let i = 0; i < Ids.length; i++){
				if(Tag === null || Wiki.__HasTag(Wiki.Pages[Ids[i]], Tag)){ Found.push(Ids[i]); }
			}
			return Wiki.__PageListHtml(Found);
		});

		Wiki.AddElement("include", (Props, Ctx) => {
			const Id   = Woowiki.Slug(Props.Page ?? Props.List[0] ?? "");
			const Page = Wiki.Pages[Id];
			if(Page === undefined){ throw new ExceptionWW(`Страницы Id = ${Woowiki.Dump(Id)} нет!`, null); }
			return Ctx.Md(Page.Content);
		});

		Wiki.AddElement("youtube", (Props) => {
			const Video = Props.Id ?? Props.List[0] ?? "";
			if(!/^[\w-]{6,20}$/.test(Video)){ throw new ExceptionWW(`Неверный id видео: Id = ${Woowiki.Dump(Video)}!`, null); }
			return `<div class="ww-video"><iframe src="https://www.youtube-nocookie.com/embed/${Video}" title="YouTube" loading="lazy" allowfullscreen></iframe></div>`;
		});
	}

	static InstallSpecials(Wiki){
		WoowikiStd.Prepare(Wiki);

		Wiki.AddSpecial("all", Wiki.Text.AllPages, (Arg, Wiki) => Wiki.__PageListHtml(Wiki.SortedIds()));
		Wiki.AddSpecial("tag", (Arg, Wiki) => `${Wiki.Text.PagesWithTag}: ${Arg ?? ""}`, (Arg, Wiki) => {
			const Tag   = (Arg ?? "").toLowerCase();
			const Ids   = Wiki.SortedIds();
			const Found = [];
			for(let i = 0; i < Ids.length; i++){
				if(Wiki.__HasTag(Wiki.Pages[Ids[i]], Tag)){ Found.push(Ids[i]); }
			}
			return Wiki.__PageListHtml(Found);
		});
	}

	static InstallPanels(Wiki){
		WoowikiStd.Prepare(Wiki);

		Wiki.AddPanel({ Id: "pages", Title: Wiki.Text.Pages, Order: 10, Render: (Wiki) => {
			const Ids = Wiki.SortedIds();
			if(Ids.length === 0){ return ""; }

			let Html = '<ul class="ww-list">';
			for(let i = 0; i < Ids.length; i++){
				const ClassAttr = Ids[i] === Wiki.CurrentId ? ' class="ww-current"' : "";
				Html += `<li${ClassAttr}>${Wiki.PageLink(Ids[i])}</li>`;
			}
			return `${Html}</ul>`;
		}});

		Wiki.AddPanel({ Id: "tags", Title: Wiki.Text.Tags, Order: 20, Render: (Wiki) => {
			const Tags = Wiki.GetTags();
			if(Tags.length === 0){ return ""; }

			let Html = '<div class="ww-tags">';
			for(let i = 0; i < Tags.length; i++){
				Html += `<a class="ww-tag" href="${Woowiki.Href("special:tag", Tags[i].Name)}">${Woowiki.Esc(Tags[i].Name)} ${Tags[i].Count}</a>`;
			}
			return `${Html}</div>`;
		}});
	}

	static InstallSearch(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_SEARCH_CSS, "std-search");
		Wiki.SearchBox = new WoowikiSearchBox(Wiki);

		Wiki.AddSpecial("search", (Arg, Wiki) => `${Wiki.Text.SearchResults}: ${Arg ?? ""}`, (Arg, Wiki) => {
			const Query = (Arg ?? "").trim();
			if(Query === ""){ return ""; }

			const Found = Wiki.Search(Query);
			if(Found.length === 0){ return `<p class="ww-muted">${Wiki.Text.NothingFound}</p>`; }

			let Html = "";
			for(let i = 0; i < Found.length; i++){
				const Snippet   = Wiki.GetSnippetText(Found[i].Id, Found[i].At);
				let SnippetHtml = "";
				if(Snippet !== ""){ SnippetHtml = `<div class="ww-muted">…${Woowiki.Esc(Snippet)}…</div>`; }
				Html += `<li>${Wiki.PageLink(Found[i].Id)}${SnippetHtml}</li>`;
			}
			return `<ul class="ww-list">${Html}</ul>`;
		});
	}

	static InstallPopups(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_POPUPS_CSS, "std-popups");
		Wiki.Popups = new WoowikiPopups(Wiki);

		Wiki.Popups.Add("[data-ww-page]", (Anchor, Wiki) => {
			const Id   = Anchor.getAttribute("data-ww-page");
			const Page = Wiki.Pages[Id];
			if(Page === undefined){ return `<div class="ww-popup-text ww-muted">${Woowiki.Esc(Wiki.Text.MissingLink)}</div>`; }

			let Html = `<div class="ww-popup-title">${Woowiki.Esc(Page.Title)}</div>`;
			const Summary = Wiki.GetSummary(Id, 200);
			if(Summary !== ""){ Html += `<div class="ww-popup-text">${Woowiki.Esc(Summary)}</div>`; }
			if(Page.Tags.length > 0){ Html += `<div class="ww-popup-tags">${Woowiki.Esc(Page.Tags.join(", "))}</div>`; }
			return Html;
		});
		Wiki.Popups.Add("[data-ww-tip]", (Anchor) => {
			const Text = Anchor.getAttribute("data-ww-tip").trim();
			if(Text === ""){ return ""; }
			return `<div class="ww-popup-text">${Woowiki.Esc(Text)}</div>`;
		});
		Wiki.Popups.Add("[data-ww-tip-html]", (Anchor) => Anchor.getAttribute("data-ww-tip-html"));

		Wiki.AddElement("popup", (Props, Ctx) => {
			const Label = Props.Text ?? Props.List.join(" ");
			let Html = "";
			if(Ctx.IsBlock){ Html = Ctx.Md(Ctx.Body); }else{ Html = Ctx.Inline(Props.Tip ?? ""); }
			if(Html === ""){ throw new ExceptionWW(`У popup нет содержимого: нужен tip="…" или тело блока!`, null); }
			return `<span class="ww-popup-source" data-ww-tip-html="${Woowiki.Esc(Html)}">${Ctx.Inline(Label)}</span>`;
		});
	}

	// ----------------------------------------------------------------------

	static InstallCopy(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_COPY_CSS, "std-copy");
		Wiki.Clipboard = new WoowikiClipboard(Wiki);

		if(Wiki.Options.PreCopy){ Wiki.On("Render", (Data) => WoowikiStd.UpgradePre(Data.Target, Wiki)); }

		Wiki.AddElement("copy", (Props, Ctx) => {
			let Text = "";
			if(Ctx.IsBlock){ Text = Ctx.Body.replace(/^\n+|\s+$/g, ""); }else{ Text = Props.List.join(" "); }
			if(Text === ""){ throw new ExceptionWW(`У copy нет текста: {{copy "текст"}} или :::copy с телом!`, null); }

			const Label = Props.Label ?? Wiki.Text.Copy;
			let Field = "";
			let Tag   = "span";
			if(Ctx.IsBlock){
				const Rows = Math.min(12, Text.split("\n").length);
				Field = `<textarea class="ww-copy-field" rows="${Rows}" readonly>${Woowiki.Esc(Text)}</textarea>`;
				Tag   = "div";
			}else{
				const Width = Math.min(60, Math.max(8, Text.length)) + 2;
				Field = `<input class="ww-copy-field" type="text" readonly value="${Woowiki.Esc(Text)}" style="width:${Width}ch">`;
			}

			const Html = `<${Tag} class="ww-copy">${Field}<button class="ww-button ww-copy-button" type="button">${Woowiki.Esc(Label)}</button></${Tag}>`;
			const Mount = (Box) => {
				const Input  = Box.querySelector(".ww-copy-field");
				const Button = Box.querySelector(".ww-copy-button");
				Input.addEventListener("focus", () => Input.select());
				Wiki.Clipboard.Attach(Button, () => Input.value);
			};
			return { Html, Mount };
		});
	}

	static InstallEmbed(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_EMBED_CSS, "std-embed");

		if(new URLSearchParams(location.search).has(Wiki.Options.EmbedParam)){ Wiki.Root.classList.add("ww-embed"); }

		Wiki.AddElement("iframe", (Props, Ctx) => {
			let Sandbox = Wiki.Options.IframeSandbox;
			let Source  = Props.Src ?? Props.List[0];
			let Attrs   = "";
			let OpenUrl = null;

			if(Props.Page !== undefined){
				const Id = Woowiki.Slug(Props.Page);
				if(Wiki.Pages[Id] === undefined){ throw new ExceptionWW(`Страницы Id = ${Woowiki.Dump(Id)} нет!`, null); }
				Source = WoowikiStd.PageUrl(Wiki, Id);
			}

			if(Source === undefined){
				if(!Ctx.IsBlock || Ctx.Body.trim() === ""){ throw new ExceptionWW(`У iframe нет адреса: нужен src="…", page="…" или тело блока с HTML!`, null); }
				Sandbox = "allow-scripts";
				Attrs   = `srcdoc="${Woowiki.Esc(Ctx.Body)}"`;
			}else{
				WoowikiStd.CheckUrl(Source);
				if(Props.Page === undefined){ WoowikiStd.CheckHost(Wiki, Source); }
				OpenUrl = Source;
				Attrs   = `src="${Woowiki.Esc(Source)}"`;
			}

			if(Props.Sandbox !== undefined){ Sandbox = Props.Sandbox; }
			if(Sandbox !== "off"){ Attrs += ` sandbox="${Woowiki.Esc(Sandbox)}"`; }
			if(Props.Allow !== undefined){ Attrs += ` allow="${Woowiki.Esc(Props.Allow)}"`; }
			if(Props.Title !== undefined){ Attrs += ` title="${Woowiki.Esc(Props.Title)}"`; }

			return WoowikiStd.FrameHtml(Wiki, Props, Attrs, OpenUrl);
		});

		Wiki.AddElement("video", (Props) => {
			const Source = Props.Src ?? Props.List[0];
			if(Source === undefined){ throw new ExceptionWW(`У video нет адреса: нужен src="…"!`, null); }
			WoowikiStd.CheckUrl(Source);

			const Autoplay = WoowikiStd.Flag(Props.Autoplay, false);
			let Attrs = `src="${Woowiki.Esc(Source)}" preload="metadata" playsinline style="width:${WoowikiStd.Size(Props.Width, "100%")}"`;
			if(WoowikiStd.Flag(Props.Controls, true)){ Attrs += " controls"; }
			if(WoowikiStd.Flag(Props.Loop, false)){ Attrs += " loop"; }
			if(Autoplay || WoowikiStd.Flag(Props.Muted, false)){ Attrs += " muted"; }
			if(Autoplay){ Attrs += " autoplay"; }
			if(Props.Poster !== undefined){
				WoowikiStd.CheckUrl(Props.Poster);
				Attrs += ` poster="${Woowiki.Esc(Props.Poster)}"`;
			}
			return `<video class="ww-media" ${Attrs}></video>`;
		});

		Wiki.AddElement("audio", (Props) => {
			const Source = Props.Src ?? Props.List[0];
			if(Source === undefined){ throw new ExceptionWW(`У audio нет адреса: нужен src="…"!`, null); }
			WoowikiStd.CheckUrl(Source);

			let Attrs = `src="${Woowiki.Esc(Source)}" preload="metadata" style="width:${WoowikiStd.Size(Props.Width, "100%")}"`;
			if(WoowikiStd.Flag(Props.Controls, true)){ Attrs += " controls"; }
			if(WoowikiStd.Flag(Props.Loop, false)){ Attrs += " loop"; }
			return `<audio class="ww-media" ${Attrs}></audio>`;
		});

		Wiki.AddElement("vimeo", (Props) => {
			const Video = Props.Id ?? Props.List[0] ?? "";
			if(!/^\d{4,12}$/.test(Video)){ throw new ExceptionWW(`Неверный id видео Vimeo: Id = ${Woowiki.Dump(Video)}!`, null); }
			if(Props.Ratio === undefined && Props.Height === undefined){ Props.Ratio = "16:9"; }

			const Attrs = `src="https://player.vimeo.com/video/${Video}" title="Vimeo" allow="fullscreen; picture-in-picture"`;
			return WoowikiStd.FrameHtml(Wiki, Props, Attrs, null);
		});

		Wiki.AddElement("map", (Props) => {
			const Lat  = Number(Props.Lat);
			const Lon  = Number(Props.Lon);
			const Zoom = Props.Zoom === undefined ? 13 : Number(Props.Zoom);
			if(isNaN(Lat) || Lat < -85 || Lat > 85){ throw new ExceptionWW(`Неверная широта: Lat = ${Woowiki.Dump(Props.Lat)}! Нужно число от -85 до 85.`, null); }
			if(isNaN(Lon) || Lon < -180 || Lon > 180){ throw new ExceptionWW(`Неверная долгота: Lon = ${Woowiki.Dump(Props.Lon)}! Нужно число от -180 до 180.`, null); }
			if(isNaN(Zoom) || Zoom < 1 || Zoom > 19){ throw new ExceptionWW(`Неверный масштаб: Zoom = ${Woowiki.Dump(Props.Zoom)}! Нужно число от 1 до 19.`, null); }

			const LonSpan = 360 / Math.pow(2, Zoom) * 1.5;
			const LatSpan = LonSpan * 0.5;
			const Bounds  = encodeURIComponent([ Lon - LonSpan, Lat - LatSpan, Lon + LonSpan, Lat + LatSpan ].join(","));
			let Marker = "";
			if(WoowikiStd.Flag(Props.Marker, true)){ Marker = `&marker=${Lat}%2C${Lon}`; }
			if(Props.Ratio === undefined && Props.Height === undefined){ Props.Height = "360"; }

			const Attrs   = `src="https://www.openstreetmap.org/export/embed.html?bbox=${Bounds}&layer=mapnik${Marker}" sandbox="allow-scripts allow-same-origin allow-popups" title="OpenStreetMap"`;
			const OpenUrl = `https://www.openstreetmap.org/?mlat=${Lat}&mlon=${Lon}#map=${Zoom}/${Lat}/${Lon}`;
			return WoowikiStd.FrameHtml(Wiki, Props, Attrs, OpenUrl);
		});
	}

	static InstallBlocks(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_BLOCKS_CSS, "std-blocks");
		Wiki.Root.addEventListener("pointerdown", (DownEvent) => WoowikiStd.PressKey(DownEvent));

		Wiki.AddElement("figure", (Props, Ctx) => {
			const Source = Props.Src ?? Props.List[0];
			if(Source === undefined){ throw new ExceptionWW(`У figure нет картинки: нужен src="…"!`, null); }

			const Align = Props.Align ?? "center";
			if(Align !== "left" && Align !== "right" && Align !== "center"){ throw new ExceptionWW(`Неверное выравнивание: Align = ${Woowiki.Dump(Align)}! Можно left, right, center.`, null); }

			let Caption = "";
			if(Ctx.IsBlock){ Caption = Ctx.Md(Ctx.Body); }else if(Props.Caption !== undefined){ Caption = Ctx.Inline(Props.Caption); }
			if(Caption !== ""){ Caption = `<figcaption>${Caption}</figcaption>`; }

			const Width = WoowikiStd.Size(Props.Width, "auto");
			const Url   = Woowiki.Esc(Woowiki.SafeUrl(Source));
			return `<figure class="ww-figure ww-align-${Align}"><img src="${Url}" alt="${Woowiki.Esc(Props.Alt ?? "")}" style="width:${Width}">${Caption}</figure>`;
		});

		Wiki.AddElement("gallery", (Props, Ctx) => {
			const Lines = WoowikiStd.Lines(Ctx.Body);
			const Cols  = Props.Cols === undefined ? 3 : Number(Props.Cols);
			if(isNaN(Cols) || Cols < 1 || Cols > 8){ throw new ExceptionWW(`Неверное число колонок: Cols = ${Woowiki.Dump(Props.Cols)}! Нужно от 1 до 8.`, null); }

			let Html = "";
			for(let i = 0; i < Lines.length; i++){
				const At      = Lines[i].indexOf("|");
				let   Url     = Lines[i];
				let   Caption = "";
				if(At > 0){
					Url     = Lines[i].slice(0, At).trim();
					Caption = Lines[i].slice(At + 1).trim();
				}
				let CaptionHtml = "";
				if(Caption !== ""){ CaptionHtml = `<figcaption>${Ctx.Inline(Caption)}</figcaption>`; }
				Html += `<figure><img src="${Woowiki.Esc(Woowiki.SafeUrl(Url))}" alt="${Woowiki.Esc(Caption)}">${CaptionHtml}</figure>`;
			}
			return `<div class="ww-gallery" style="--ww-cols:${Cols}">${Html}</div>`;
		});

		Wiki.AddElement("button", (Props, Ctx) => {
			let Url = Props.Href;
			if(Props.Page !== undefined){ Url = Woowiki.Href(Woowiki.Slug(Props.Page)); }
			if(Url === undefined){ throw new ExceptionWW(`У button нет цели: нужен href="…" или page="…"!`, null); }

			let Label = Props.Text ?? Props.List.join(" ");
			if(Label === ""){ Label = Url; }
			let Kind = "";
			if(Props.Kind === "ghost"){ Kind = " ww-btn-ghost"; }
			return `<a class="ww-btn${Kind}" href="${Woowiki.Esc(Woowiki.SafeUrl(Url))}">${Ctx.Inline(Label)}</a>`;
		});

		Wiki.AddElement("badge", (Props, Ctx) => {
			const Color = (Props.Color ?? "gray").toLowerCase();
			let Class = "";
			let Style = "";
			if(WW_STD_BADGES.indexOf(Color) >= 0){
				Class = ` ww-badge-${Color}`;
			}else{
				const Read = WoowikiStd.ReadColor(Color);
				if(Read === null){ throw new ExceptionWW(`Неверный цвет: Color = ${Woowiki.Dump(Color)}! Можно ${WW_STD_BADGES.join(", ")} или любой CSS-цвет.`, null); }
				Style = ` style="background:${Woowiki.Esc(Color)}"`;
				if(Read.Alpha >= 0.5 && Read.Light){ Class = " ww-badge-light"; }
			}
			const Left  = WoowikiStd.IconHtml(Props.Icon);
			const Right = WoowikiStd.IconHtml(Props.Iconright);
			return `<span class="ww-badge${Class}"${Style}>${Left}<span>${Ctx.Inline(Props.List.join(" "))}</span>${Right}</span>`;
		});

		Wiki.AddElement("kbd", (Props) => {
			const Keys = WoowikiStd.SplitKeys(Props.List.join(" "));
			if(Keys.length === 0){ throw new ExceptionWW(`У kbd нет клавиш: пиши {{kbd Ctrl+C}}!`, null); }
			let Html = "";
			for(let i = 0; i < Keys.length; i++){
				if(i > 0){ Html += "+"; }
				Html += WoowikiStd.KeyHtml(Keys[i]);
			}
			return Html;
		});

		WoowikiStd.AddWrap(Wiki, "mark", "mark");
		WoowikiStd.AddWrap(Wiki, "sup",  "sup");
		WoowikiStd.AddWrap(Wiki, "sub",  "sub");

		Wiki.AddElement("abbr", (Props, Ctx) => {
			const Tip = Props.Tip ?? "";
			if(Tip === ""){ throw new ExceptionWW(`У abbr нет расшифровки: нужен tip="…"!`, null); }
			return `<abbr class="ww-abbr" title="${Woowiki.Esc(Tip)}">${Ctx.Inline(Props.List.join(" "))}</abbr>`;
		});

		Wiki.AddElement("progress", (Props, Ctx) => {
			const Raw   = Props.Value ?? Props.List[0];
			const Value = Number(Raw);
			const Max   = Number(Props.Max ?? 100);
			if(isNaN(Value) || isNaN(Max) || Max <= 0){ throw new ExceptionWW(`Неверные значения progress: Value = ${Woowiki.Dump(Raw)}, Max = ${Woowiki.Dump(Props.Max)}!`, null); }

			const Percent = Math.round(Math.min(100, Math.max(0, Value / Max * 100)));
			const Label   = Props.Label ?? Props.List.slice(1).join(" ");
			return `<div class="ww-progress"><div class="ww-progress-bar" style="width:${Percent}%"></div><span class="ww-progress-label">${Ctx.Inline(`${Label} ${Percent}%`.trim())}</span></div>`;
		});

		Wiki.AddElement("quote", (Props, Ctx) => {
			let Footer = "";
			if(Props.Author !== undefined || Props.Source !== undefined){
				Footer = "— ";
				if(Props.Author !== undefined){ Footer += Ctx.Inline(Props.Author); }
				if(Props.Author !== undefined && Props.Source !== undefined){ Footer += ", "; }
				if(Props.Source !== undefined){ Footer += `<cite>${Ctx.Inline(Props.Source)}</cite>`; }
				Footer = `<footer>${Footer}</footer>`;
			}
			return `<blockquote class="ww-quote">${Ctx.Md(Ctx.Body)}${Footer}</blockquote>`;
		});

		Wiki.AddElement("color", (Props, Ctx) => {
			const Value = Props.List[0] ?? "";
			const Read  = WoowikiStd.ReadColor(Value);
			if(Read === null){ throw new ExceptionWW(`Неверный цвет: Value = ${Woowiki.Dump(Value)}! Подходит любой CSS-цвет: #rgb, #rrggbbaa, rgb(), hsl(), hwb(), lab(), oklch(), имя. Значения с пробелами бери в кавычки.`, null); }
			const Percent = Math.round(Read.Alpha * 100);
			const Safe    = Woowiki.Esc(Value);
			const Text    = Props.List.slice(1).join(" ");
			let TipText = Value;
			if(Percent < 100){ TipText = `${Value}, ${Wiki.Text.Alpha}: ${Percent}%`; }
			if(Text === ""){
				let Tip = "";
				if(Percent < 100){ Tip = ` data-ww-tip="${Woowiki.Esc(TipText)}"`; }
				return `<span class="ww-color"${Tip}><span class="ww-color-box ww-checker"><span class="ww-color-fill" style="background:${Safe}"></span></span><code>${Safe}</code></span>`;
			}
			let Property = "color";
			if(WoowikiStd.Flag(Props.Bg, false)){ Property = "background"; }
			let Checker = "";
			if(Read.Alpha < 1){ Checker = " ww-checker"; }
			return `<span class="ww-color-text${Checker}" data-ww-tip="${Woowiki.Esc(TipText)}"><span style="${Property}:${Safe}">${Ctx.Inline(Text)}</span></span>`;
		});

		Wiki.AddElement("steps", (Props, Ctx) => {
			const Lines = WoowikiStd.Lines(Ctx.Body);
			let Html = "";
			for(let i = 0; i < Lines.length; i++){
				Html += `<li>${Ctx.Inline(Lines[i])}</li>`;
			}
			return `<ol class="ww-steps">${Html}</ol>`;
		});

		Wiki.AddElement("cards", (Props, Ctx) => {
			const Lines = Ctx.Body.split("\n");
			const Cards = [[]];
			for(let i = 0; i < Lines.length; i++){
				if(Lines[i].trim() === "|||"){ Cards.push([]); }else{ Cards[Cards.length - 1].push(Lines[i]); }
			}

			let Html = "";
			for(let i = 0; i < Cards.length; i++){
				const Text = Cards[i].join("\n").trim();
				if(Text === ""){ continue; }
				const At    = Text.indexOf("\n");
				let   Title = Text;
				let   Rest  = "";
				if(At >= 0){
					Title = Text.slice(0, At);
					Rest  = Text.slice(At + 1);
				}
				Html += `<div class="ww-card"><div class="ww-card-title">${Ctx.Inline(Title.trim())}</div>${Ctx.Md(Rest)}</div>`;
			}
			return `<div class="ww-cards">${Html}</div>`;
		});

		Wiki.AddElement("timeline", (Props, Ctx) => WoowikiStd.TimelineHtml(WoowikiStd.ParseTimeline(WoowikiStd.Lines(Ctx.Body)), Wiki, Ctx));

		Wiki.AddElement("tabs", (Props, Ctx) => {
			const Sections = WoowikiStd.Sections(Ctx.Body);
			let Bar    = "";
			let Panels = "";
			for(let i = 0; i < Sections.length; i++){
				let Active = "";
				let Hidden = " hidden";
				if(i === 0){ Active = " ww-active"; Hidden = ""; }
				Bar    += `<button class="ww-tab${Active}" type="button">${Ctx.Inline(Sections[i].Title)}</button>`;
				Panels += `<div class="ww-tab-panel"${Hidden}>${Ctx.Md(Sections[i].Lines.join("\n"))}</div>`;
			}

			const Html  = `<div class="ww-tabs"><div class="ww-tabs-bar">${Bar}</div>${Panels}</div>`;
			const Mount = (Box) => {
				const Root    = Box.querySelector(".ww-tabs");
				const Buttons = Root.querySelectorAll(":scope > .ww-tabs-bar > .ww-tab");
				const Panes   = Root.querySelectorAll(":scope > .ww-tab-panel");
				for(let i = 0; i < Buttons.length; i++){
					Buttons[i].addEventListener("click", () => {
						for(let j = 0; j < Buttons.length; j++){
							Buttons[j].classList.toggle("ww-active", i === j);
							Panes[j].hidden = i !== j;
						}
					});
				}
			};
			return { Html, Mount };
		});

		Wiki.AddElement("accordion", (Props, Ctx) => {
			const Sections  = WoowikiStd.Sections(Ctx.Body);
			const Exclusive = WoowikiStd.Flag(Props.Exclusive, false);
			const OpenFirst = WoowikiStd.Flag(Props.Open, false);
			WoowikiStd.__Counter++;

			let Group = "";
			if(Exclusive){ Group = ` name="ww-acc-${WoowikiStd.__Counter}"`; }

			let Html = "";
			for(let i = 0; i < Sections.length; i++){
				let Open = "";
				if(OpenFirst && i === 0){ Open = " open"; }
				Html += `<details class="ww-spoiler"${Group}${Open}><summary>${Ctx.Inline(Sections[i].Title)}</summary>${Ctx.Md(Sections[i].Lines.join("\n"))}</details>`;
			}
			return Html;
		});

		Wiki.AddElement("csv", (Props, Ctx) => {
			let Sep = Props.Sep ?? ",";
			if(Sep === "tab"){ Sep = "\t"; }
			if(Sep.length !== 1){ throw new ExceptionWW(`Разделитель csv должен быть одним символом или tab: Sep = ${Woowiki.Dump(Props.Sep)}!`, null); }

			const Rows = WoowikiStd.ParseCsv(Ctx.Body.trim(), Sep);
			if(Rows.length === 0){ throw new ExceptionWW(`В csv нет строк!`, null); }

			let Width = 0;
			for(let i = 0; i < Rows.length; i++){
				if(Rows[i].length > Width){ Width = Rows[i].length; }
			}

			const Header = WoowikiStd.Flag(Props.Header, true);
			let Html = "";
			for(let i = 0; i < Rows.length; i++){
				let Tag = "td";
				if(Header && i === 0){ Tag = "th"; }

				let Cells = "";
				for(let j = 0; j < Width; j++){
					Cells += `<${Tag}>${Ctx.Inline(Rows[i][j] ?? "")}</${Tag}>`;
				}
				Html += `<tr>${Cells}</tr>`;
			}
			return `<table>${Html}</table>`;
		});

		Wiki.AddElement("chart", (Props, Ctx) => {
			const Lines = WoowikiStd.Lines(Ctx.Body);
			const Items = [];
			let Max = 0;
			for(let i = 0; i < Lines.length; i++){
				const At = Lines[i].lastIndexOf(":");
				if(At < 1){ throw new ExceptionWW(`Строка chart должна быть вида "метка: число": Line = ${Woowiki.Dump(Lines[i])}!`, null); }

				const Value = Number(Lines[i].slice(At + 1).trim());
				if(isNaN(Value)){ throw new ExceptionWW(`В строке chart после двоеточия не число: Line = ${Woowiki.Dump(Lines[i])}!`, null); }
				Items.push({ Label: Lines[i].slice(0, At).trim(), Value: Value });
				if(Value > Max){ Max = Value; }
			}
			if(Props.Max !== undefined){ Max = Number(Props.Max); }
			if(isNaN(Max) || Max <= 0){ throw new ExceptionWW(`Неверный максимум chart: Max = ${Woowiki.Dump(Props.Max)}!`, null); }

			const Unit = Props.Unit ?? "";
			let Html = "";
			for(let i = 0; i < Items.length; i++){
				const Percent = Math.round(Math.min(100, Math.max(0, Items[i].Value / Max * 100)));
				Html += `<div class="ww-chart-row"><span class="ww-chart-label" title="${Woowiki.Esc(Items[i].Label)}">${Ctx.Inline(Items[i].Label)}</span>`
					+ `<span class="ww-chart-track"><span class="ww-chart-bar" style="display:block;width:${Percent}%"></span></span>`
					+ `<span class="ww-chart-value">${Items[i].Value}${Woowiki.Esc(Unit)}</span></div>`;
			}
			return `<div class="ww-chart">${Html}</div>`;
		});

		Wiki.AddElement("checklist", (Props, Ctx) => {
			const Lines = WoowikiStd.Lines(Ctx.Body);
			let Html = "";
			for(let i = 0; i < Lines.length; i++){
				const Match = /^(?:[-*]\s*)?\[([ xXхХ]?)\]\s*(.*)$/.exec(Lines[i]);
				if(Match === null){ throw new ExceptionWW(`Строка checklist должна быть вида "[x] текст" или "[ ] текст": Line = ${Woowiki.Dump(Lines[i])}!`, null); }

				const Done = Match[1].trim() !== "";
				let Class = "";
				let Mark  = "";
				if(Done){ Class = ' class="ww-done"'; Mark = " checked"; }
				Html += `<li${Class}><input type="checkbox" disabled${Mark}> ${Ctx.Inline(Match[2])}</li>`;
			}
			return `<ul class="ww-checklist">${Html}</ul>`;
		});

		WoowikiStd.AddAlign(Wiki, "align",  null);
		WoowikiStd.AddAlign(Wiki, "center", "center");

		Wiki.AddElement("clear", () => `<div style="clear:both"></div>`);
	}

	static InstallNav(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_NAV_CSS, "std-nav");

		Wiki.AddElement("backlinks", (Props, Ctx) => {
			let Id = Ctx.Id;
			if(Props.Page !== undefined){ Id = Woowiki.Slug(Props.Page); }

			const Source = Wiki.GetBacklinks(Id);
			const Found  = [];
			for(let i = 0; i < Source.length; i++){
				if(typeof Source[i] === "string"){ Found.push(Source[i]); }else{ Found.push(Source[i].Id); }
			}
			if(Found.length === 0){ return `<p class="ww-muted">${Woowiki.Esc(Wiki.Text.NoBacklinks)}</p>`; }
			return Wiki.__PageListHtml(Found);
		});

		Wiki.AddElement("tagcloud", () => {
			const Tags = Wiki.GetTags();
			let Min = 0;
			let Max = 0;
			for(let i = 0; i < Tags.length; i++){
				if(i === 0 || Tags[i].Count < Min){ Min = Tags[i].Count; }
				if(Tags[i].Count > Max){ Max = Tags[i].Count; }
			}

			let Html = "";
			for(let i = 0; i < Tags.length; i++){
				let Size = 1;
				if(Max > Min){ Size = 0.9 + (Tags[i].Count - Min) / (Max - Min) * 0.8; }
				Html += `<a class="ww-tag" style="font-size:${Size.toFixed(2)}em" href="${Woowiki.Href("special:tag", Tags[i].Name)}">${Woowiki.Esc(Tags[i].Name)}</a>`;
			}
			return `<div class="ww-tagcloud">${Html}</div>`;
		});

		Wiki.AddElement("pagecount", (Props) => {
			const Ids = Wiki.SortedIds();
			if(Props.Tag === undefined){ return String(Ids.length); }

			const Tag = Props.Tag.toLowerCase();
			let Count = 0;
			for(let i = 0; i < Ids.length; i++){
				if(Wiki.__HasTag(Wiki.Pages[Ids[i]], Tag)){ Count++; }
			}
			return String(Count);
		});

		Wiki.AddElement("random", (Props) => {
			let Label = Props.List.join(" ");
			if(Label === ""){ Label = Wiki.Text.Random; }
			const Tag = Props.Tag === undefined ? null : Props.Tag.toLowerCase();

			const Mount = (Box) => {
				const Link = Box.querySelector("a");
				Link.addEventListener("click", (ClickEvent) => {
					ClickEvent.preventDefault();

					const Ids   = Wiki.SortedIds();
					const Found = [];
					for(let i = 0; i < Ids.length; i++){
						if(Ids[i] === Wiki.CurrentId){ continue; }
						if(Tag !== null && !Wiki.__HasTag(Wiki.Pages[Ids[i]], Tag)){ continue; }
						Found.push(Ids[i]);
					}
					if(Found.length === 0){ return; }

					Wiki.Go(Found[Math.floor(Math.random() * Found.length)]).catch((e) => console.error(e));
				});
			};
			return { Html: `<a class="ww-random" href="#">${Woowiki.Esc(Label)}</a>`, Mount };
		});
	}

	static InstallMedia(Wiki){
		WoowikiStd.Prepare(Wiki);
		WoowikiStd.AddCss(Wiki, WW_STD_MEDIA_CSS, "std-media");

		Wiki.Lightbox = new WoowikiLightbox(Wiki);
		Wiki.On("Render", (Data) => WoowikiStd.UpgradeMedia(Data.Target, Wiki));
	}
	
	static InstallDefine(Wiki){
		WoowikiStd.Prepare(Wiki);
		Wiki.Templates = {};
		let Loaded = false;
		Wiki.AddElement("define", (Props, Ctx) => {
			if(!Ctx.IsBlock){ throw new ExceptionWW(`define работает только блоком: ::::define имя!`, null); }
			const Name = (Props.List[0] ?? "").toLowerCase();
			WoowikiStd.AddTemplate(Wiki, Name, Ctx.Body.replace(/^\n+|\s+$/g, ""));
			return "";
		});
		Wiki.On("MarkdownBefore", (Data) => {
			if(!Loaded){
				Loaded = true;
				WoowikiStd.LoadTemplatePages(Wiki);
			}
			WoowikiStd.ScanTemplates(Wiki, Data.Text);
		});
	}
}

// ----------------------------------------------------------------------

Woowiki.AddMod("std-themes",   WoowikiStd.InstallThemes);
Woowiki.AddMod("std-elements", WoowikiStd.InstallElements);
Woowiki.AddMod("std-specials", WoowikiStd.InstallSpecials);
Woowiki.AddMod("std-panels",   WoowikiStd.InstallPanels);
Woowiki.AddMod("std-search",   WoowikiStd.InstallSearch);
Woowiki.AddMod("std-popups",   WoowikiStd.InstallPopups);
Woowiki.AddMod("std-copy",     WoowikiStd.InstallCopy);
Woowiki.AddMod("std-embed",    WoowikiStd.InstallEmbed);
Woowiki.AddMod("std-blocks",   WoowikiStd.InstallBlocks);
Woowiki.AddMod("std-nav",      WoowikiStd.InstallNav);
Woowiki.AddMod("std-media",    WoowikiStd.InstallMedia);
Woowiki.AddMod("std-define",   WoowikiStd.InstallDefine);