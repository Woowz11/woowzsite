/* ===================================================================
   LITUISM :: BOOT
   Финальная сборка. Подключается ПОСЛЕ всех PAGE_*.js.
   Здесь объявляется PAGES (теперь все PAGE_* уже существуют)
   и разворачивается PREPAGES.
   =================================================================== */

// УЕБА, ЗАГРУЖАЙ САЙТ В ПОРЯДКЕ ДОБАВЛЕНИЯ ИХ В ELEMENT_SITE
const PAGES = {
	""		   : {t:"𝙴𝚟𝚊𝚗𝚐𝚎𝚕𝚒𝚞𝚖 𝙻𝙸𝚃𝙸𝚄𝙼",c:PAGE_MAINPAGE_CONTENT},
	"database" : {t:"DΛ⛧†Λ : Bλ₳$Ξ",c:PAGE_DATABASE},
	"sranspang": {t:"𝓢𝓟𝓐𝓝𝓫𝓫𝓫𝓒𝓟𝓐𝓝𝓒𝓗",c:PAGE_MANIFEST_SRANIYSPANCH},
	"crybird"  : {t:"❄️ 🐦 ❄️",c:PAGE_MANIFEST_CRYBIRD},
	"golu"     : {t:"G∅LU",c:PAGE_MANIFEST_GOLU},
	"trash"    : {t:"G-WORLD-3",c:PAGE_MANIFEST_TRASH1},
	"arts"     : {t:"reject 🚫",c:PAGE_MANIFEST_ARTS},
	"artsreal" : {t:"🖼",c:PAGE_MANIFEST_ARTS_NEW},
	"pavpis"   : {t:"PISEHNIK.TV", c:PAGE_MANIFEST_PISEHNIK},
	"portal"   : {t:"->P0RTAL<-", c:PAGE_MANIFEST_PORTAL},
};

for(const j in PREPAGES){
	var PAGE = PREPAGES[j];
	var content_result = SITE_BASE(PAGE[0]);
	SETBODY_CONTENT(content_result, PAGE[2]);
	PAGE[1]();
	
	const i = PAGE[3];
	const key = Object.keys(PAGES)[i];
	PAGES[key]["c"] = document.getElementById("BODY").innerHTML;
	PAGES[key]["f"] = PAGE[4];
}

renderLoop();

/* РАЗЛИЧНЫЙ МУСОР - TRASH */
if(!DEV){
	document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
}

window.addEventListener("hashchange", () => {
	const hash = window.location.hash;
	const CleanHash = hash.replace(/^#/, "");
	OPEN_PAGE(CleanHash);
});

OPEN_PAGE(HASH);