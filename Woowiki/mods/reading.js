const READING_DEFAULTS = { ReadingSpeed: 200, ReadingMinWords: 150 };
const READING_TEXT     = { Minutes: "мин чтения", Top: "Наверх" };
const READING_CSS = `
.ww-readline{ position:fixed; top:0; left:0; z-index:900; width:100%; height:3px; pointer-events:none; }
.ww-readline-fill{ width:0; height:100%; background:var(--ww-accent); }
.ww-top{ position:fixed; right:20px; bottom:20px; z-index:900; width:40px; height:40px; padding:0; font-size:18px; line-height:1; color:var(--ww-fg); background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:50%; cursor:pointer; opacity:0; visibility:hidden; transition:opacity .2s; }
.ww-top.ww-shown{ opacity:1; visibility:visible; }
.ww-readtime{ margin:-4px 0 12px; font-size:13px; color:var(--ww-muted); }
`
// ----------------------------------------------------------------------
Woowiki.AddMod("reading", function(Wiki){
	Woowiki.FillMissingKeys(Wiki.Options, READING_DEFAULTS);
	Wiki.AddCss(READING_CSS, "reading");
	const Line = Woowiki.Make("div", "ww-readline", Wiki.Root);
	const Fill = Woowiki.Make("div", "ww-readline-fill", Line);
	const Top  = Woowiki.Make("button", "ww-top", Wiki.Root);
	Top.type        = "button";
	Top.textContent = "↑";
	Top.title       = READING_TEXT.Top;
	Top.addEventListener("click", function(){
		window.scrollTo({ top: 0, behavior: "smooth" });
	});

	let Waiting = false;
	const Update = function(){
		Waiting = false;
		const Root  = document.documentElement;
		const Range = Root.scrollHeight - Root.clientHeight;
		const Share = Range > 0 ? window.scrollY / Range : 0;
		Fill.style.width = `${Math.min(1, Share) * 100}%`;
		Top.classList.toggle("ww-shown", window.scrollY > 400);
	}
	window.addEventListener("scroll", function(){
		if(Waiting){ return; }
		Waiting = true;
		requestAnimationFrame(Update);
	}, { passive: true });

	Wiki.On("PageAfter", function(Data){
		Update();
		if(Wiki.Pages[Data.Id] === undefined){ return; }
		const Found = Data.Article.textContent.match(/\S+/g);
		const Words = Found === null ? 0 : Found.length;
		if(Words < Wiki.Options.ReadingMinWords){ return; }
		const Minutes = Math.max(1, Math.round(Words / Wiki.Options.ReadingSpeed));
		const Note    = Woowiki.Make("div", "ww-readtime");
		Note.textContent = `≈ ${Minutes} ${READING_TEXT.Minutes}`;
		const Head = Data.Article.querySelector("h1");
		if(Head !== null){
			Head.after(Note);
		}else{
			Data.Article.prepend(Note);
		}
	});
});