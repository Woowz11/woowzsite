const OUTLINE_TEXT = { Title: "≡ На странице" };
const OUTLINE_CSS = `
.ww-outline{ position:fixed; top:90px; right:16px; z-index:800; max-width:260px; font-size:13px; }
.ww-outline-toggle{ display:block; margin-left:auto; padding:4px 10px; color:var(--ww-fg); background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); cursor:pointer; }
.ww-outline-list{ display:none; max-height:65vh; margin-top:4px; padding:6px 8px; overflow:auto; background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
.ww-outline.ww-open .ww-outline-list{ display:block; }
.ww-outline-item{ display:block; width:100%; padding:3px 0; text-align:left; color:var(--ww-muted); background:none; border:0; cursor:pointer; }
.ww-outline-item:hover{ color:var(--ww-fg); }
.ww-outline-sub{ padding-left:14px; }
.ww-outline-item.ww-current{ color:var(--ww-accent); font-weight:600; }
@media (max-width:900px){
	.ww-outline{ display:none; }
}
`
// ----------------------------------------------------------------------
Woowiki.AddMod("outline", function(Wiki){
	Wiki.AddCss(OUTLINE_CSS, "outline");
	const Box    = Woowiki.Make("div", "ww-outline", Wiki.Root);
	const Toggle = Woowiki.Make("button", "ww-outline-toggle", Box);
	const List   = Woowiki.Make("div", "ww-outline-list", Box);
	Toggle.type        = "button";
	Toggle.textContent = OUTLINE_TEXT.Title;
	Box.hidden         = true;

	let Heads   = [];
	let Items   = [];
	let Waiting = false;

	Toggle.addEventListener("click", function(){
		const IsOpen = !Box.classList.contains("ww-open");
		Box.classList.toggle("ww-open", IsOpen);
		Wiki.__StorageSet("outline-open", IsOpen ? "1" : "0");
	});

	const Mark = function(){
		Waiting = false;
		let Current = -1;
		for(let i = 0; i < Heads.length; i++){
			if(Heads[i].getBoundingClientRect().top > 120){ break; }
			Current = i;
		}
		for(let i = 0; i < Items.length; i++){
			Items[i].classList.toggle("ww-current", i === Current);
		}
	}

	const Build = function(Article){
		List.textContent = "";
		Heads = Article.querySelectorAll("h2, h3");
		Items = [];
		Box.hidden = Heads.length < 2;
		Box.classList.toggle("ww-open", Wiki.__StorageGet("outline-open") === "1");
		for(let i = 0; i < Heads.length; i++){
			const Head      = Heads[i];
			const ClassName = Head.tagName === "H3" ? "ww-outline-item ww-outline-sub" : "ww-outline-item";
			const Item      = Woowiki.Make("button", ClassName, List);
			Item.type        = "button";
			Item.textContent = Head.textContent;
			Item.addEventListener("click", function(){
				Head.scrollIntoView({ behavior: "smooth", block: "start" });
			});
			Items.push(Item);
		}
		Mark();
	}

	window.addEventListener("scroll", function(){
		if(Waiting){ return; }
		Waiting = true;
		requestAnimationFrame(Mark);
	}, { passive: true });
	Wiki.On("PageAfter", function(Data){
		Build(Data.Article);
	});
});