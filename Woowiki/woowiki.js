class ExceptionWW extends Error{
	constructor(Message, Inner){
		super(Inner instanceof Error ? `${Message}\n  → ${Inner.message}` : Message, { cause: Inner });
		this.name  = "ExceptionWW";
		this.Inner = Inner ?? null;
	}
}
// ----------------------------------------------------------------------
const WW_TEXT = {
	NoPages        : "Страниц пока нет.",
	MissingPage    : "Страница не существует",
	BackToStart    : "На главную",
	Backlinks      : "Сюда ссылаются",
	UnknownElement : "неизвестный элемент",
	UnknownSpecial : "Неизвестная служебная страница",
	TooDeep        : "слишком глубокая вложенность"
}
const WW_DEFAULTS = {
	Target     : "#wiki",
	Title      : "Woowiki",
	Start      : "home",
	Theme      : "light",
	Pages      : {},
	AllowHtml  : false,
	Persist    : true,
	StorageKey : null,
	FullPage   : "auto",
	BaseCss    : true,
	Css        : "",
	Footer     : null,
	Text       : {},
	SkipMods   : []
}
const WW_BASE_VARS = {
	Font    : "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
	Width   : "1500px",
	Radius  : "8px",
	Bg      : "#f5f5f5",
	Panel   : "#ffffff",
	Fg      : "#222222",
	Muted   : "#6b6b6b",
	Link    : "#2563eb",
	Missing : "#dc2626",
	Border  : "#dcdcdc",
	Accent  : "#2563eb",
	Code    : "#eeeeee"
}
const WW_BASE_CSS = `
html.ww-page, html.ww-page body{ margin:0; padding:0; background:var(--ww-bg); }
html.ww-page .ww-root{ min-height:100vh; }
.ww-root, .ww-root *, .ww-root *::before, .ww-root *::after{ box-sizing:border-box; }
.ww-root{ display:flex; flex-direction:column; background:var(--ww-bg); color:var(--ww-fg); font:16px/1.6 var(--ww-font); }
.ww-root [hidden]{ display:none; }
.ww-root a{ color:var(--ww-link); }
.ww-header{ position:sticky; top:0; z-index:10; display:flex; align-items:center; gap:12px; padding:10px 20px; background:var(--ww-panel); border-bottom:1px solid var(--ww-border); }
.ww-root .ww-brand{ font-weight:700; font-size:18px; color:var(--ww-fg); text-decoration:none; }
.ww-buttons{ display:flex; gap:8px; margin-left:auto; }
.ww-button{ padding:6px 12px; color:var(--ww-fg); background:var(--ww-bg); border:1px solid var(--ww-border); border-radius:var(--ww-radius); font:inherit; cursor:pointer; }
.ww-button:hover{ border-color:var(--ww-accent); }
.ww-body{ flex:1; display:flex; align-items:flex-start; gap:20px; width:100%; max-width:var(--ww-width); margin:0 auto; padding:20px; }
.ww-side{ flex:none; width:240px; }
.ww-article{ flex:1; min-width:0; padding:20px 28px; background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
.ww-footer{ padding:16px 20px; text-align:center; color:var(--ww-muted); font-size:14px; }
@media (max-width:760px){
	.ww-body{ flex-direction:column; padding:12px; }
	.ww-side{ width:100%; }
	.ww-article{ width:100%; padding:16px; }
	.ww-header{ flex-wrap:wrap; }
}
.ww-panel{ margin-bottom:16px; padding:12px 14px; background:var(--ww-panel); border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
.ww-panel-title{ margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:.05em; color:var(--ww-muted); }
.ww-list{ margin:0; padding-left:18px; }
.ww-current > a{ font-weight:700; }
.ww-muted{ color:var(--ww-muted); }
.ww-error{ padding:8px 12px; color:var(--ww-missing); border:1px solid var(--ww-missing); border-radius:var(--ww-radius); white-space:pre-wrap; }
span.ww-error{ padding:0 4px; border-width:1px; }
.ww-title{ margin:0 0 8px; padding-bottom:8px; border-bottom:1px solid var(--ww-border); font-size:2em; line-height:1.25; }
.ww-tags{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
.ww-tag{ padding:1px 10px; font-size:13px; text-decoration:none; color:var(--ww-accent); border:1px solid var(--ww-border); border-radius:99px; }
.ww-backlinks{ margin-top:32px; padding-top:12px; border-top:1px solid var(--ww-border); font-size:14px; }
.ww-content::after{ content:""; display:block; clear:both; }
.ww-content [id]{ scroll-margin-top:70px; }
.ww-content h1, .ww-content h2, .ww-content h3, .ww-content h4, .ww-content h5, .ww-content h6{ margin:1.4em 0 .5em; line-height:1.3; }
.ww-content h2{ padding-bottom:4px; border-bottom:1px solid var(--ww-border); }
.ww-content p, .ww-content ul, .ww-content ol, .ww-content pre, .ww-content blockquote, .ww-content .ww-table{ margin:0 0 1em; }
.ww-content img{ max-width:100%; }
.ww-content hr{ border:0; border-top:1px solid var(--ww-border); margin:1.5em 0; }
.ww-content blockquote{ padding:2px 16px; color:var(--ww-muted); border-left:4px solid var(--ww-border); }
.ww-content code{ padding:1px 5px; background:var(--ww-code); border-radius:4px; font-size:.9em; }
.ww-content pre{ padding:12px 14px; overflow:auto; background:var(--ww-code); border-radius:var(--ww-radius); }
.ww-content pre code{ padding:0; background:none; }
.ww-content .ww-table{ overflow-x:auto; }
.ww-content table{ border-collapse:collapse; }
.ww-content th, .ww-content td{ padding:6px 12px; border:1px solid var(--ww-border); }
.ww-content th{ background:var(--ww-code); }
.ww-root .ww-missing{ color:var(--ww-missing); }
`
const WW_CODE_RE        = /`([^`\n]+)`/g;
const WW_ELEMENT_RE     = /\{\{\s*([\w-]+)([^}]*)\}\}/g;
const WW_IMAGE_RE       = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
const WW_WIKILINK_RE    = /\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/g;
const WW_LINK_RE        = /\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
const WW_FENCE_RE       = /^```([\w-]*)[^\n]*\n([\s\S]*?)^```[ \t]*$/gm;
const WW_BLOCK_RE       = /^(:{3,})\s*([\w-]+)(.*)$/;
const WW_HEADING_RE     = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const WW_LIST_RE        = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;
const WW_TABLE_SEP_RE   = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/;
const WW_TOKEN_RE       = /^\u0001\d+\u0001$/;
const WW_BLOCK_STRIP_RE = /^(:{3,})[^\n]*\n[\s\S]*?^\1[ \t]*$/gm;
// ----------------------------------------------------------------------
class Woowiki{
	static Version        = "2.0.0";
	static Mods           = [];
	static __MountCounter = 0;
	Options   = null;
	Text      = null;
	Pages     = Object.create(null);
	Elements  = Object.create(null);
	Specials  = Object.create(null);
	Themes    = Object.create(null);
	Inlines   = [];
	Panels    = [];
	Buttons   = [];
	ModNames  = [];
	Theme     = null;
	CurrentId = null;
	Root      = null;
	Dom       = null;
	__Events    = Object.create(null);
	__Styles    = Object.create(null);
	__Overrides = {};
	__LinkCache = null;
	__ShowToken = 0;
	constructor(Options){
		try{
			this.Options = Object.assign({}, WW_DEFAULTS, Options);
			this.Text    = Object.assign({}, WW_TEXT, this.Options.Text);
			if(this.Options.StorageKey === null){ this.Options.StorageKey = `woowiki:${location.pathname}`; }
			let Target = this.Options.Target;
			if(typeof Target === "string"){ Target = document.querySelector(Target); }
			if(Target === null || Target === undefined){ throw new ExceptionWW(`Не найден элемент для вики: Target = ${Woowiki.Dump(this.Options.Target)}!`, null); }
			this.__BuildDom(Target);
			for(let i = 0; i < Woowiki.Mods.length; i++){
				const Mod = Woowiki.Mods[i];
				if(this.Options.SkipMods.includes(Mod.Name)){ continue; }
				this.Use(Mod.Name, Mod.Install);
			}
			this.AddPages(this.Options.Pages);
		}catch(e){
			throw new ExceptionWW(`Woowiki.constructor(Options = ${Woowiki.Dump(Options)}) упал!`, e);
		}
	}
	// ----------------------------------------------------------------------
	static AddMod(Name, Install){ Woowiki.Mods.push({ Name, Install }); }
	static FillMissingKeys(Target, Defaults){
		for(const Key in Defaults){
			if(Target[Key] === undefined){ Target[Key] = Defaults[Key]; }
		}
	}
	static Make(Tag, ClassName, Parent){
		const Element = document.createElement(Tag);
		Element.className = ClassName;
		if(Parent !== undefined && Parent !== null){ Parent.appendChild(Element); }
		return Element;
	}
	static Esc(Text){
		return String(Text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	static Slug(Text){
		return String(Text).trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
	}
	static SafeUrl(Url){
		const Clean = String(Url).trim();
		const Probe = Clean.replace(/[\u0000-\u0020]/g, "");
		if(/^[a-z][a-z0-9+.-]*:/i.test(Probe) && !/^(https?|mailto|tel):/i.test(Probe)){ return "#"; }
		return Clean;
	}
	static SafeDecode(Text){
		try{
			return decodeURIComponent(Text);
		}catch(e){
			return Text;
		}
	}
	static Href(Id, Arg = null){
		const Path = encodeURIComponent(Id).replace(/%3A/gi, ":");
		if(Arg === null || Arg === undefined || Arg === ""){ return `#/${Path}`; }
		return `#/${Path}/${encodeURIComponent(Arg)}`;
	}
	static Dump(Value){
		let Text = "";
		try{
			Text = typeof Value === "string" ? `"${Value}"` : JSON.stringify(Value);
		}catch(e){
			Text = String(Value);
		}
		if(Text === undefined){ Text = String(Value); }
		if(Text.length > 120){ Text = `${Text.slice(0, 120)}…`; }
		return Text;
	}
	static VarsToCss(Vars){
		let Css = "";
		for(const Key in Vars){
			const Name = Key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
			Css += `--ww-${Name}:${Vars[Key]};`;
		}
		return Css;
	}
	static ParseArgs(Text){
		const Props = { List: [] };
		if(Text === undefined || Text === null){ return Props; }
		const Regex = /([\w-]+)=(?:"([^"]*)"|'([^']*)'|(\S+))|"([^"]*)"|'([^']*)'|(\S+)/g;
		let Found = Regex.exec(Text);
		while(Found !== null){
			if(Found[1] !== undefined){
				let Value = Found[4];
				if(Found[2] !== undefined){ Value = Found[2]; }
				if(Found[3] !== undefined){ Value = Found[3]; }
				const Key = `${Found[1].charAt(0).toUpperCase()}${Found[1].slice(1)}`;
				if(Key !== "List"){ Props[Key] = Value; }
			}else{
				let Value = Found[7];
				if(Found[5] !== undefined){ Value = Found[5]; }
				if(Found[6] !== undefined){ Value = Found[6]; }
				Props.List.push(Value);
			}
			Found = Regex.exec(Text);
		}
		return Props;
	}
	// ----------------------------------------------------------------------
	On(Name, Handler){
		if(this.__Events[Name] === undefined){ this.__Events[Name] = []; }
		this.__Events[Name].push(Handler);
	}
	Emit(Name, Data){
		const List = this.__Events[Name];
		if(List === undefined){ return Data; }
		for(let i = 0; i < List.length; i++){
			try{
				List[i](Data, this);
			}catch(e){
				console.error(new ExceptionWW(`Woowiki.Emit(Name = ${Name}): обработчик №${i} упал!`, e));
			}
		}
		return Data;
	}
	Use(Name, Install){
		try{
			Install(this);
			this.ModNames.push(Name);
		}catch(e){
			console.error(new ExceptionWW(`Woowiki.Use(Name = ${Name}): мод упал при установке!`, e));
		}
	}
	// ----------------------------------------------------------------------
	AddElement(Name, Render){
		try{
			if(typeof Render !== "function"){ throw new ExceptionWW(`Render элемента должен быть функцией, а не ${typeof Render}!`, null); }
			this.Elements[Name.toLowerCase()] = Render;
		}catch(e){
			throw new ExceptionWW(`Woowiki.AddElement(Name = ${Woowiki.Dump(Name)}) упал!`, e);
		}
	}
	AddInline(Regex, Render){
		const Flags = Regex.flags.includes("g") ? Regex.flags : `${Regex.flags}g`;
		this.Inlines.push({ Regex: new RegExp(Regex.source, Flags), Render });
	}
	AddSpecial(Name, Title, Render){ this.Specials[Name.toLowerCase()] = { Title, Render }; }
	AddTheme(Name, Vars){ this.Themes[Name] = Vars; }
	AddPanel(Data){
		const Panel = Object.assign({ Id: "", Title: "", Order: 50, Render: () => "" }, Data);
		this.__AddOrdered(this.Panels, Panel);
	}
	AddButton(Data){
		const Button = Object.assign({ Id: "", Order: 50, Label: "", Title: "", Visible: null, OnClick: () => {}, Render: null }, Data);
		this.__AddOrdered(this.Buttons, Button);
	}
	AddCss(Css, Id = null){
		let Style = null;
		if(Id !== null){ Style = this.__Styles[Id] ?? null; }
		if(Style === null){
			Style = document.createElement("style");
			document.head.appendChild(Style);
			if(Id !== null){ this.__Styles[Id] = Style; }
		}
		Style.textContent = Css;
		return Style;
	}
	SetVars(Vars){
		Object.assign(this.__Overrides, Vars);
		this.__ApplyVars();
	}
	SetTheme(Name){
		try{
			this.__ApplyTheme(Name);
			if(this.Options.Persist){ this.__StorageSet("theme", Name); }
			this.__RenderButtons();
		}catch(e){
			throw new ExceptionWW(`Woowiki.SetTheme(Name = ${Woowiki.Dump(Name)}) упал!`, e);
		}
	}
	// ----------------------------------------------------------------------
	AddPage(Id, Data){
		try{
			const PageId = Woowiki.Slug(Id);
			if(PageId === ""){ throw new ExceptionWW(`Id страницы пустой после Slug!`, null); }
			this.Pages[PageId] = this.__NormalizePage(PageId, Data);
			this.__LinkCache   = null;
			return PageId;
		}catch(e){
			throw new ExceptionWW(`Woowiki.AddPage(Id = ${Woowiki.Dump(Id)}, Data = ${Woowiki.Dump(Data)}) упал!`, e);
		}
	}
	AddPages(Pages){
		try{
			if(Pages === null || Pages === undefined){ return; }
			for(const Id in Pages){
				this.AddPage(Id, Pages[Id]);
			}
		}catch(e){
			throw new ExceptionWW(`Woowiki.AddPages(Pages = ${Woowiki.Dump(Pages)}) упал!`, e);
		}
	}
	SortedIds(){
		const Ids = Object.keys(this.Pages);
		Ids.sort((A, B) => this.Pages[A].Title.localeCompare(this.Pages[B].Title));
		return Ids;
	}
	GetTags(){
		const Counts = Object.create(null);
		for(const Id in this.Pages){
			const Tags = this.Pages[Id].Tags;
			for(let i = 0; i < Tags.length; i++){
				Counts[Tags[i]] = (Counts[Tags[i]] ?? 0) + 1;
			}
		}
		const Names = Object.keys(Counts);
		Names.sort();
		const Result = [];
		for(let i = 0; i < Names.length; i++){
			Result.push({ Name: Names[i], Count: Counts[Names[i]] });
		}
		return Result;
	}
	GetBacklinks(Id){
		if(this.__LinkCache === null){ this.__BuildLinkCache(); }
		return this.__LinkCache[Id] ?? [];
	}
	PageLink(Id, Label){
		const Page = this.Pages[Id];
		let Name   = Id;
		if(Label !== undefined){ Name = Label; }else if(Page !== undefined){ Name = Page.Title; }
		return `<a class="ww-link" href="${Woowiki.Href(Id)}" data-ww-page="${Woowiki.Esc(Id)}">${Woowiki.Esc(Name)}</a>`;
	}
	Search(Query, Limit = 0){
		try{
			const Words = Query.trim().toLowerCase().split(/\s+/);
			const Found = [];
			if(Words[0] === ""){ return Found; }
			for(const Id in this.Pages){
				const Page  = this.Pages[Id];
				let Total   = 0;
				let At      = -1;
				let Matched = true;
				for(let i = 0; i < Words.length; i++){
					const Score = this.__ScoreWord(Id, Page, Words[i]);
					if(Score === 0){ Matched = false; break; }
					Total += Score;
					if(At === -1){ At = Page.__Lower.indexOf(Words[i]); }
				}
				if(!Matched){ continue; }
				Found.push({ Id, Score: Total, At });
			}
			Found.sort((A, B) => {
				if(A.Score !== B.Score){ return B.Score - A.Score; }
				return this.Pages[A.Id].Title.localeCompare(this.Pages[B.Id].Title);
			});
			if(Limit > 0 && Found.length > Limit){ Found.length = Limit; }
			return Found;
		}catch(e){
			throw new ExceptionWW(`Woowiki.Search(Query = ${Woowiki.Dump(Query)}, Limit = ${Limit}) упал!`, e);
		}
	}
	GetSnippetText(Id, At){
		if(At < 0){ return ""; }
		return this.Pages[Id].Content.slice(Math.max(0, At - 40), At + 100).replace(/\s+/g, " ").trim();
	}
	GetSummary(Id, Length = 200){
		try{
			const Page = this.Pages[Id];
			if(Page === undefined){ throw new ExceptionWW(`Страницы с таким Id нет!`, null); }
			const Lines = Page.Content.replace(WW_FENCE_RE, "").replace(WW_BLOCK_STRIP_RE, "").split("\n");
			let Summary = "";
			for(let i = 0; i < Lines.length && Summary.length < Length; i++){
				let Line = Lines[i].trim();
				if(Line === "" || /^(#|\||:|\{\{|-{3,}$)/.test(Line)){ continue; }
				Line = Line.replace(/^(>\s?|([-*+]|\d+[.)])\s+)/, "");
				Line = Line.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1");
				Line = Line.replace(/\[\[(?:[^\]|]*\|)?([^\]]+)\]\]/g, "$1");
				Line = Line.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
				Line = Line.replace(/\{\{[^}]*\}\}/g, "");
				Line = Line.replace(/[*~`]/g, "");
				if(Line === ""){ continue; }
				Summary = Summary === "" ? Line : `${Summary} ${Line}`;
			}
			if(Summary.length > Length){ return `${Summary.slice(0, Length)}…`; }
			return Summary;
		}catch(e){
			throw new ExceptionWW(`Woowiki.GetSummary(Id = ${Woowiki.Dump(Id)}, Length = ${Length}) упал!`, e);
		}
	}
	// ----------------------------------------------------------------------
	async Start(){
		try{
			let ThemeName = this.Options.Theme;
			const Stored  = this.Options.Persist ? this.__StorageGet("theme") : null;
			if(Stored !== null && this.Themes[Stored] !== undefined){ ThemeName = Stored; }
			if(this.Themes[ThemeName] === undefined){
				const Names = Object.keys(this.Themes);
				if(Names.length > 0){ console.error(new ExceptionWW(`Тема ${Woowiki.Dump(ThemeName)} не найдена, взята ${Names[0]}!`, null)); }
				ThemeName = Names[0] ?? null;
			}
			if(ThemeName !== null){ this.__ApplyTheme(ThemeName); }
			window.addEventListener("hashchange", () => {
				this.__OnHash().catch((e) => console.error(e));
			});
			await this.__OnHash();
			this.Emit("Ready", {});
		}catch(e){
			const Wrapped = new ExceptionWW(`Woowiki.Start() упал!`, e);
			this.Dom.Article.innerHTML = `<div class="ww-error">${Woowiki.Esc(Wrapped.message)}</div>`;
			throw Wrapped;
		}
	}
	Go(Id, Arg = null){
		const Hash = Woowiki.Href(Id, Arg);
		if(location.hash === Hash){ return this.Show(Id, Arg); }
		location.hash = Hash;
		return Promise.resolve();
	}
	async Show(Id, Arg = null){
		try{
			const Token = ++this.__ShowToken;
			this.Emit("PageBefore", { Id });
			this.CurrentId = Id;
			if(Id.startsWith("special:")){
				await this.__ShowSpecial(Id, Arg, Token);
			}else if(this.Pages[Id] === undefined){
				this.__ShowMissing(Id);
			}else{
				this.__ShowPage(Id);
			}
			if(Token !== this.__ShowToken){ return; }
			this.Refresh();
			this.Emit("PageAfter", { Id, Article: this.Dom.Article });
			this.__ScrollTo(Arg);
		}catch(e){
			const Wrapped = new ExceptionWW(`Woowiki.Show(Id = ${Woowiki.Dump(Id)}, Arg = ${Woowiki.Dump(Arg)}) упал!`, e);
			this.Dom.Article.innerHTML = `<div class="ww-error">${Woowiki.Esc(Wrapped.message)}</div>`;
			throw Wrapped;
		}
	}
	Refresh(){
		this.__RenderSide();
		this.__RenderButtons();
	}
	RenderInto(Target, Text, Params = {}){
		try{
			const Context = {
				Id         : Params.Id ?? null,
				Preview    : Params.Preview === true,
				Mounts     : [],
				Depth      : 0,
				Stash      : null,
				HeadingIds : Object.create(null)
			};
			Target.classList.add("ww-content");
			Target.innerHTML = this.Markdown(Text, Context);
			this.__RunMounts(Target, Context);
			this.Emit("Render", { Target, Context });
		}catch(e){
			throw new ExceptionWW(`Woowiki.RenderInto(Text = ${Woowiki.Dump(Text)}, Params = ${Woowiki.Dump(Params)}) упал!`, e);
		}
	}
	Markdown(Text, Context = {}){
		try{
			if(Context.Id === undefined){ Context.Id = null; }
			if(Context.Preview === undefined){ Context.Preview = false; }
			if(Context.Mounts === undefined){ Context.Mounts = []; }
			if(Context.Depth === undefined){ Context.Depth = 0; }
			if(Context.HeadingIds === undefined){ Context.HeadingIds = Object.create(null); }
			const Before   = this.Emit("MarkdownBefore", { Text: String(Text), Context });
			const OldStash = Context.Stash ?? null;
			const Stash    = this.__StashNew("\u0001");
			const Source   = Before.Text.replace(/\r\n?/g, "\n").replace(/[\u0001\u0002]/g, "");
			let Html = "";
			Context.Stash = Stash;
			try{
				Html = this.__StashGet(Stash, this.__Document(Source, Context));
			}finally{
				Context.Stash = OldStash;
			}
			return this.Emit("HtmlAfter", { Html, Context }).Html;
		}catch(e){
			throw new ExceptionWW(`Woowiki.Markdown(Text = ${Woowiki.Dump(Text)}) упал!`, e);
		}
	}
	// ----------------------------------------------------------------------
	__AddOrdered(List, Item){
		let Done = false;
		for(let i = 0; i < List.length; i++){
			if(List[i].Id === Item.Id){
				List[i] = Item;
				Done    = true;
			}
		}
		if(!Done){ List.push(Item); }
		List.sort((A, B) => A.Order - B.Order);
	}
	__StorageGet(Key){
		try{
			return localStorage.getItem(`${this.Options.StorageKey}:${Key}`);
		}catch(e){
			return null;
		}
	}
	__StorageSet(Key, Value){
		try{
			localStorage.setItem(`${this.Options.StorageKey}:${Key}`, Value);
		}catch(e){}
	}
	__ApplyVars(){
		const Merged = Object.assign({}, WW_BASE_VARS, this.Themes[this.Theme], this.__Overrides);
		this.AddCss(`.ww-root, html.ww-page{ ${Woowiki.VarsToCss(Merged)} }`, "vars");
	}
	__ApplyTheme(Name){
		if(this.Themes[Name] === undefined){ throw new ExceptionWW(`Тема не найдена: Name = ${Woowiki.Dump(Name)}, есть: ${Object.keys(this.Themes).join(", ")}!`, null); }
		this.Theme = Name;
		this.__ApplyVars();
		this.Emit("Theme", { Name });
	}
	__DecideFullPage(Target){
		const Mode = this.Options.FullPage;
		if(Mode === true || Mode === false){ return Mode; }
		if(Target.parentElement !== document.body){ return false; }
		const Children = document.body.children;
		for(let i = 0; i < Children.length; i++){
			const Tag = Children[i].tagName;
			if(Children[i] === Target || Tag === "SCRIPT" || Tag === "STYLE" || Tag === "LINK" || Tag === "NOSCRIPT"){ continue; }
			return false;
		}
		return true;
	}
	__BuildDom(Target){
		if(this.Options.BaseCss){ this.AddCss(WW_BASE_CSS, "base"); }
		this.__ApplyVars();
		if(this.Options.Css !== ""){ this.AddCss(this.Options.Css, "options"); }
		if(this.__DecideFullPage(Target)){ document.documentElement.classList.add("ww-page"); }
		Target.textContent = "";
		const Root    = Woowiki.Make("div", "ww-root", Target);
		const Header  = Woowiki.Make("header", "ww-header", Root);
		const Brand   = Woowiki.Make("a", "ww-brand", Header);
		const Buttons = Woowiki.Make("div", "ww-buttons", Header);
		const Body    = Woowiki.Make("div", "ww-body", Root);
		const Side    = Woowiki.Make("aside", "ww-side", Body);
		const Article = Woowiki.Make("main", "ww-article", Body);
		const Footer  = Woowiki.Make("footer", "ww-footer", Root);
		Brand.href        = Woowiki.Href(this.Options.Start);
		Brand.textContent = this.Options.Title;
		Side.hidden = true;
		if(this.Options.Footer === null){ Footer.hidden = true; }else{ Footer.innerHTML = this.Options.Footer; }
		this.Root = Root;
		this.Dom  = { Header, Brand, Buttons, Side, Article, Footer };
	}
	__NormalizePage(Id, Data){
		let Title   = "";
		let Tags    = [];
		let Content = "";
		if(typeof Data === "string"){
			Content = Data;
		}else if(Data !== null && typeof Data === "object"){
			if(Data.Src !== undefined){ throw new ExceptionWW(`Src не поддерживается: Id = ${Woowiki.Dump(Id)}, Src = ${Woowiki.Dump(Data.Src)}! Передай текст страницы через Content из .js файла.`, null); }
			if(Data.Title !== undefined){ Title = String(Data.Title); }
			if(Data.Content !== undefined){ Content = String(Data.Content); }
			if(Array.isArray(Data.Tags)){
				for(let i = 0; i < Data.Tags.length; i++){
					Tags.push(String(Data.Tags[i]));
				}
			}
		}else{
			throw new ExceptionWW(`Страница должна быть строкой или объектом, а не ${typeof Data}!`, null);
		}
		if(Title === ""){ Title = `${Id.charAt(0).toUpperCase()}${Id.slice(1).replace(/-/g, " ")}`; }
		return { Title, Tags, Content, __Lower: Content.toLowerCase(), __LowerTitle: Title.toLowerCase() };
	}
	__BuildLinkCache(){
		const Cache = Object.create(null);
		for(const Id in this.Pages){
			const Content = this.Pages[Id].Content;
			const Regex   = /\[\[([^\]|#]+)/g;
			let Found     = Regex.exec(Content);
			while(Found !== null){
				const To = Woowiki.Slug(Found[1]);
				if(To !== Id){
					if(Cache[To] === undefined){ Cache[To] = []; }
					if(!Cache[To].includes(Id)){ Cache[To].push(Id); }
				}
				Found = Regex.exec(Content);
			}
		}
		this.__LinkCache = Cache;
	}
	__ScoreWord(Id, Page, Word){
		const Title = Page.__LowerTitle;
		if(Title === Word){ return 100; }
		if(Title.startsWith(Word)){ return 80; }
		if(Title.includes(Word)){ return 60; }
		if(Id.includes(Word)){ return 40; }
		for(let i = 0; i < Page.Tags.length; i++){
			if(Page.Tags[i].toLowerCase() === Word){ return 30; }
		}
		if(Page.__Lower.includes(Word)){ return 10; }
		return 0;
	}
	__HasTag(Page, TagLower){
		for(let i = 0; i < Page.Tags.length; i++){
			if(Page.Tags[i].toLowerCase() === TagLower){ return true; }
		}
		return false;
	}
	__PageListHtml(Ids){
		if(Ids.length === 0){ return `<p class="ww-muted">${this.Text.NoPages}</p>`; }
		let Html = '<ul class="ww-list">';
		for(let i = 0; i < Ids.length; i++){
			Html += `<li>${this.PageLink(Ids[i])}</li>`;
		}
		return `${Html}</ul>`;
	}
	// ---------------------------------------------------------------- роутинг
	async __OnHash(){
		const Route = this.__ParseHash();
		await this.Show(Route.Id, Route.Arg);
	}
	__ParseHash(){
		const Path = location.hash.replace(/^#\/?/, "");
		if(Path === ""){ return { Id: this.Options.Start, Arg: null }; }
		const At = Path.indexOf("/");
		if(At === -1){ return { Id: Woowiki.SafeDecode(Path).toLowerCase(), Arg: null }; }
		return { Id: Woowiki.SafeDecode(Path.slice(0, At)).toLowerCase(), Arg: Woowiki.SafeDecode(Path.slice(At + 1)) };
	}
	__ScrollTo(Arg){
		if(Arg === null || Arg === ""){ window.scrollTo(0, 0); return; }
		const Found = this.Dom.Article.querySelector(`[id="${Woowiki.Slug(Arg)}"]`);
		if(Found === null){ window.scrollTo(0, 0); return; }
		Found.scrollIntoView();
	}
	__ShowPage(Id){
		const Page    = this.Pages[Id];
		const Article = this.Dom.Article;
		Article.textContent = "";
		const Title = Woowiki.Make("h1", "ww-title", Article);
		Title.textContent = Page.Title;
		this.__RenderTags(Page, Article);
		const Content = Woowiki.Make("div", "ww-content", Article);
		this.RenderInto(Content, Page.Content, { Id, Preview: false });
		this.__RenderBacklinks(Id, Article);
		document.title = `${Page.Title} — ${this.Options.Title}`;
	}
	__ShowMissing(Id){
		const Article = this.Dom.Article;
		Article.textContent = "";
		const Title   = Woowiki.Make("h1", "ww-title", Article);
		const Message = Woowiki.Make("p", "ww-muted", Article);
		const Back    = Woowiki.Make("a", "ww-link", Article);
		Title.textContent   = Id;
		Message.textContent = `${this.Text.MissingPage}.`;
		Back.href           = Woowiki.Href(this.Options.Start);
		Back.textContent    = this.Text.BackToStart;
		document.title      = `${Id} — ${this.Options.Title}`;
	}
	async __ShowSpecial(Id, Arg, Token){
		const Article = this.Dom.Article;
		const Special = this.Specials[Id.slice(8)];
		Article.textContent = "";
		const Heading = Woowiki.Make("h1", "ww-title", Article);
		if(Special === undefined){
			Heading.textContent = this.Text.UnknownSpecial;
			const Message = Woowiki.Make("p", "ww-muted", Article);
			Message.textContent = Id;
			return;
		}
		let Title = Special.Title;
		if(typeof Title === "function"){ Title = Title(Arg, this); }
		Heading.textContent = Title;
		document.title      = `${Title} — ${this.Options.Title}`;
		const Content = Woowiki.Make("div", "ww-content", Article);
		const Result  = await Special.Render(Arg, this);
		if(Token !== this.__ShowToken){ return; }
		this.__Fill(Content, Result);
	}
	__Fill(Box, Result){
		Box.textContent = "";
		if(typeof Result === "string"){ Box.innerHTML = Result; return; }
		if(Result !== null && Result !== undefined){ Box.appendChild(Result); }
	}
	__RenderTags(Page, Article){
		if(Page.Tags.length === 0){ return; }
		const Box     = Woowiki.Make("div", "ww-tags", Article);
		const IsLinks = this.Specials["tag"] !== undefined;
		for(let i = 0; i < Page.Tags.length; i++){
			const Tag = Woowiki.Make(IsLinks ? "a" : "span", "ww-tag", Box);
			if(IsLinks){ Tag.href = Woowiki.Href("special:tag", Page.Tags[i]); }
			Tag.textContent = Page.Tags[i];
		}
	}
	__RenderBacklinks(Id, Article){
		const Ids = this.GetBacklinks(Id);
		if(Ids.length === 0){ return; }
		const Box   = Woowiki.Make("div", "ww-backlinks", Article);
		const Title = Woowiki.Make("strong", "", Box);
		Title.textContent = this.Text.Backlinks;
		const List  = Woowiki.Make("div", "", Box);
		List.innerHTML = this.__PageListHtml(Ids);
	}
	__RenderSide(){
		const Side = this.Dom.Side;
		Side.textContent = "";
		for(let i = 0; i < this.Panels.length; i++){
			const Panel   = this.Panels[i];
			const Section = Woowiki.Make("section", `ww-panel ww-panel-${Panel.Id}`, Side);
			if(Panel.Title !== ""){
				const Head = Woowiki.Make("h3", "ww-panel-title", Section);
				Head.textContent = Panel.Title;
			}
			const Body = Woowiki.Make("div", "ww-panel-body", Section);
			try{
				const Result = Panel.Render(this);
				if(Result === ""){ Section.remove(); continue; }
				this.__Fill(Body, Result);
			}catch(e){
				console.error(new ExceptionWW(`Woowiki.__RenderSide: панель Id = ${Panel.Id} упала!`, e));
				Body.innerHTML = `<span class="ww-error">${Woowiki.Esc(Panel.Id)}: ${Woowiki.Esc(e.message)}</span>`;
			}
		}
		Side.hidden = Side.childElementCount === 0;
	}
	__RenderButtons(){
		const Box = this.Dom.Buttons;
		Box.textContent = "";
		for(let i = 0; i < this.Buttons.length; i++){
			const Button = this.Buttons[i];
			try{
				if(Button.Visible !== null && !Button.Visible(this)){ continue; }
				if(Button.Render !== null){
					const Holder = Woowiki.Make("span", `ww-button-holder ww-button-${Button.Id}`, Box);
					this.__Fill(Holder, Button.Render(this));
					continue;
				}
				const Element = Woowiki.Make("button", `ww-button ww-button-${Button.Id}`, Box);
				Element.type        = "button";
				Element.textContent = Button.Label;
				Element.title       = Button.Title;
				Element.addEventListener("click", () => {
					try{
						Button.OnClick(this);
					}catch(e){
						console.error(new ExceptionWW(`Woowiki: кнопка Id = ${Button.Id} упала при нажатии!`, e));
					}
				});
			}catch(e){
				console.error(new ExceptionWW(`Woowiki.__RenderButtons: кнопка Id = ${Button.Id} упала!`, e));
			}
		}
	}
	// ---------------------------------------------------------------- рендер
	__StashNew(Mark){ return { Mark, List: [] }; }
	__StashPut(Stash, Html){
		Stash.List.push(Html);
		return `${Stash.Mark}${Stash.List.length - 1}${Stash.Mark}`;
	}
	__StashGet(Stash, Text){
		if(!Text.includes(Stash.Mark)){ return Text; }
		const Regex = new RegExp(`${Stash.Mark}(\\d+)${Stash.Mark}`, "g");
		let Result  = Text;
		for(let i = 0; i < 16 && Result.includes(Stash.Mark); i++){
			Result = Result.replace(Regex, (Match, Index) => Stash.List[Number(Index)] ?? "");
		}
		return Result;
	}
	__EscText(Text){ return this.Options.AllowHtml ? Text : Woowiki.Esc(Text); }
	__MdNested(Text, Context){
		if(Context.Depth >= 8){ return `<span class="ww-error">[${this.Text.TooDeep}]</span>`; }
		Context.Depth++;
		try{
			return this.__Document(Text, Context);
		}finally{
			Context.Depth--;
		}
	}
	__Document(Text, Context){
		let Result = Text.replace(WW_FENCE_RE, (Match, Lang, Code) => {
			const ClassAttr = Lang === "" ? "" : ` class="lang-${Lang}"`;
			const Html      = `<pre class="ww-code"><code${ClassAttr}>${Woowiki.Esc(Code.replace(/\n$/, ""))}</code></pre>`;
			return `\n${this.__StashPut(Context.Stash, Html)}\n`;
		});
		Result = this.__StashBlockElements(Result, Context);
		return this.__Blocks(Result, Context);
	}
	__StashBlockElements(Text, Context){
		if(!Text.includes(":::")){ return Text; }
		const Lines = Text.split("\n");
		const Out   = [];
		for(let i = 0; i < Lines.length; i++){
			const Found = WW_BLOCK_RE.exec(Lines[i].trim());
			if(Found === null){ Out.push(Lines[i]); continue; }
			let End = -1;
			for(let j = i + 1; j < Lines.length; j++){
				if(Lines[j].trim() === Found[1]){ End = j; break; }
			}
			if(End === -1){ Out.push(Lines[i]); continue; }
			const Body = Lines.slice(i + 1, End).join("\n");
			const Html = this.__RunElement(Found[2], Found[3], Body, true, Context);
			Out.push("", this.__StashPut(Context.Stash, Html), "");
			i = End;
		}
		return Out.join("\n");
	}
	__Blocks(Text, Context){
		const Lines = Text.split("\n");
		const Out   = [];
		const Para  = [];
		for(let i = 0; i < Lines.length; i++){
			const Line = Lines[i];
			const Trim = Line.trim();
			if(Trim === ""){ this.__FlushParagraph(Para, Out, Context); continue; }
			if(WW_TOKEN_RE.test(Trim)){
				this.__FlushParagraph(Para, Out, Context);
				Out.push(Trim);
				continue;
			}
			const HeadMatch = WW_HEADING_RE.exec(Trim);
			if(HeadMatch !== null){
				this.__FlushParagraph(Para, Out, Context);
				const Level = HeadMatch[1].length;
				const Html  = this.__Inline(HeadMatch[2], Context);
				Out.push(`<h${Level} id="${this.__HeadingId(Html, Context)}">${Html}</h${Level}>`);
				continue;
			}
			if(/^(-{3,}|\*{3,}|_{3,})$/.test(Trim)){
				this.__FlushParagraph(Para, Out, Context);
				Out.push("<hr>");
				continue;
			}
			if(Trim.startsWith(">")){
				this.__FlushParagraph(Para, Out, Context);
				const Quote = [];
				while(i < Lines.length && Lines[i].trim().startsWith(">")){
					Quote.push(Lines[i].trim().replace(/^>\s?/, ""));
					i++;
				}
				i--;
				Out.push(`<blockquote>${this.__Blocks(Quote.join("\n"), Context)}</blockquote>`);
				continue;
			}
			if(WW_LIST_RE.test(Line)){
				this.__FlushParagraph(Para, Out, Context);
				const Items = [];
				while(i < Lines.length){
					const ItemMatch = WW_LIST_RE.exec(Lines[i]);
					if(ItemMatch === null){ break; }
					Items.push({
						Indent : ItemMatch[1].replace(/\t/g, "    ").length,
						Tag    : /\d/.test(ItemMatch[2]) ? "ol" : "ul",
						Text   : ItemMatch[3]
					});
					i++;
				}
				i--;
				Out.push(this.__ListHtml(Items, Context));
				continue;
			}
			if(Trim.includes("|") && i + 1 < Lines.length && WW_TABLE_SEP_RE.test(Lines[i + 1].trim())){
				this.__FlushParagraph(Para, Out, Context);
				const Table = this.__TableHtml(Lines, i, Context);
				Out.push(Table.Html);
				i = Table.Next - 1;
				continue;
			}
			Para.push(Trim);
		}
		this.__FlushParagraph(Para, Out, Context);
		return Out.join("\n");
	}
	__FlushParagraph(Para, Out, Context){
		if(Para.length === 0){ return; }
		Out.push(`<p>${this.__Inline(Para.join("\n"), Context)}</p>`);
		Para.length = 0;
	}
	__HeadingId(Html, Context){
		let Base = Woowiki.Slug(Html.replace(/<[^>]*>/g, ""));
		if(Base === ""){ Base = "section"; }
		const Count = Context.HeadingIds[Base] ?? 0;
		Context.HeadingIds[Base] = Count + 1;
		return Count === 0 ? Base : `${Base}-${Count + 1}`;
	}
	__ListHtml(Items, Context){
		const Stack = [];
		let Html    = "";
		for(let i = 0; i < Items.length; i++){
			const Item = Items[i];
			while(Stack.length > 0 && Item.Indent < Stack[Stack.length - 1].Indent){
				Html += `</li></${Stack.pop().Tag}>`;
			}
			if(Stack.length === 0 || Item.Indent > Stack[Stack.length - 1].Indent){
				Html += `<${Item.Tag}><li>`;
				Stack.push({ Indent: Item.Indent, Tag: Item.Tag });
			}else{
				Html += "</li><li>";
			}
			Html += this.__Inline(Item.Text, Context);
		}
		while(Stack.length > 0){
			Html += `</li></${Stack.pop().Tag}>`;
		}
		return Html;
	}
	__TableHtml(Lines, At, Context){
		const Heads  = this.__SplitRow(Lines[At]);
		const Aligns = this.__SplitRow(Lines[At + 1]);
		let Html = "<thead><tr>";
		for(let i = 0; i < Heads.length; i++){
			Html += `<th${this.__AlignAttr(Aligns[i])}>${this.__Inline(Heads[i], Context)}</th>`;
		}
		Html += "</tr></thead><tbody>";
		let Next = At + 2;
		while(Next < Lines.length && Lines[Next].trim() !== "" && Lines[Next].includes("|")){
			const Cells = this.__SplitRow(Lines[Next]);
			Html += "<tr>";
			for(let i = 0; i < Cells.length; i++){
				Html += `<td${this.__AlignAttr(Aligns[i])}>${this.__Inline(Cells[i], Context)}</td>`;
			}
			Html += "</tr>";
			Next++;
		}
		return { Html: `<div class="ww-table"><table>${Html}</tbody></table></div>`, Next };
	}
	__SplitRow(Line){
		let Text = Line.trim().replace(/\[\[[^\]]*\]\]/g, (Match) => Match.replace(/\|/g, "\u0003"));
		if(Text.startsWith("|")){ Text = Text.slice(1); }
		if(Text.endsWith("|")){ Text = Text.slice(0, -1); }
		const Cells = Text.split("|");
		for(let i = 0; i < Cells.length; i++){
			Cells[i] = Cells[i].trim().replace(/\u0003/g, "|");
		}
		return Cells;
	}
	__AlignAttr(Cell){
		if(Cell === undefined){ return ""; }
		const Left  = Cell.startsWith(":");
		const Right = Cell.endsWith(":");
		if(Left && Right){ return ' style="text-align:center"'; }
		if(Right){ return ' style="text-align:right"'; }
		if(Left){ return ' style="text-align:left"'; }
		return "";
	}
	__Inline(Text, Context){
		if(Text === ""){ return ""; }
		const Stash = this.__StashNew("\u0002");
		let Result = Text.replace(WW_CODE_RE, (Match, Code) => this.__StashPut(Stash, `<code>${Woowiki.Esc(Code)}</code>`));
		Result = Result.replace(WW_ELEMENT_RE, (Match, Name, Args) => this.__StashPut(Stash, this.__RunElement(Name, Args, "", false, Context)));
		Result = Result.replace(WW_IMAGE_RE, (Match, Alt, Url) => this.__StashPut(Stash, `<img class="ww-image" src="${Woowiki.Esc(Woowiki.SafeUrl(Url))}" alt="${Woowiki.Esc(Alt)}">`));
		Result = Result.replace(WW_WIKILINK_RE, (Match, Id, Anchor, Label) => this.__StashPut(Stash, this.__WikiLinkHtml(Id, Anchor, Label)));
		Result = Result.replace(WW_LINK_RE, (Match, Label, Url, Title) => this.__StashPut(Stash, this.__LinkHtml(Label, Url, Title)));
		if(!this.Options.AllowHtml){ Result = Woowiki.Esc(Result); }
		for(let i = 0; i < this.Inlines.length; i++){
			Result = this.__ApplyInline(Result, this.Inlines[i], Stash, Context);
		}
		return this.__StashGet(Stash, this.__Emphasis(Result));
	}
	__ApplyInline(Text, Inline, Stash, Context){
		const Regex = Inline.Regex;
		let Result  = "";
		let Last    = 0;
		let Count   = 0;
		Regex.lastIndex = 0;
		let Found = Regex.exec(Text);
		while(Found !== null){
			let Html = Found[0];
			try{
				Html = String(Inline.Render(Found, Context));
			}catch(e){
				console.error(new ExceptionWW(`Woowiki.__ApplyInline(Regex = ${Regex}, Match = ${Woowiki.Dump(Found[0])}) упал!`, e));
			}
			Result += `${Text.slice(Last, Found.index)}${this.__StashPut(Stash, Html)}`;
			Last    = Found.index + Found[0].length;
			Count++;
			if(Found[0].length === 0){ Regex.lastIndex++; }
			Found = Regex.exec(Text);
		}
		if(Count === 0){ return Text; }
		return `${Result}${Text.slice(Last)}`;
	}
	__Emphasis(Text){
		let Result = Text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
		Result     = Result.replace(/\*(.+?)\*/g, "<em>$1</em>");
		Result     = Result.replace(/~~(.+?)~~/g, "<del>$1</del>");
		return Result;
	}
	__WikiLinkHtml(Id, Anchor, Label){
		const PageId = Woowiki.Slug(Id);
		const Page   = this.Pages[PageId];
		const Arg    = Anchor === undefined ? null : Woowiki.Slug(Anchor);
		let Name = Id.trim();
		if(Label !== undefined){ Name = Label.trim(); }else if(Page !== undefined){ Name = Page.Title; }
		const Html = this.__Emphasis(this.__EscText(Name));
		if(Page === undefined){
			return `<a class="ww-link ww-missing" href="${Woowiki.Href(PageId, Arg)}" data-ww-page="${Woowiki.Esc(PageId)}">${Html}</a>`;
		}
		return `<a class="ww-link" href="${Woowiki.Href(PageId, Arg)}" data-ww-page="${Woowiki.Esc(PageId)}">${Html}</a>`;
	}
	__LinkHtml(Label, Url, Title){
		const Safe      = Woowiki.Esc(Woowiki.SafeUrl(Url));
		const Html      = this.__Emphasis(this.__EscText(Label));
		const TitleAttr = Title === undefined ? "" : ` title="${Woowiki.Esc(Title)}"`;
		if(/^(https?:)?\/\//i.test(Safe)){
			return `<a class="ww-link ww-ext" href="${Safe}"${TitleAttr} target="_blank" rel="noopener noreferrer">${Html}</a>`;
		}
		return `<a class="ww-link" href="${Safe}"${TitleAttr}>${Html}</a>`;
	}
	__RunElement(Name, ArgsText, Body, IsBlock, Context){
		try{
			const Render = this.Elements[Name.toLowerCase()];
			if(Render === undefined){ return `<span class="ww-error">[${Woowiki.Esc(Name)}: ${this.Text.UnknownElement}]</span>`; }
			const Props = Woowiki.ParseArgs(ArgsText);
			const Ctx   = {
				Wiki    : this,
				Id      : Context.Id,
				Preview : Context.Preview,
				Name    : Name,
				Body    : Body,
				IsBlock : IsBlock,
				Md      : (Text) => this.__MdNested(Text, Context),
				Inline  : (Text) => this.__Inline(Text, Context)
			};
			const Result = Render(Props, Ctx);
			let Html  = "";
			let Mount = null;
			if(typeof Result === "string"){
				Html = Result;
			}else if(Result !== null && typeof Result === "object"){
				Html  = Result.Html ?? "";
				Mount = Result.Mount ?? null;
			}
			let Attr = "";
			if(Mount !== null){
				const Key = ++Woowiki.__MountCounter;
				Context.Mounts.push({ Key, Name, Fn: Mount, Props, Ctx });
				Attr = ` data-ww-mount="${Key}"`;
			}
			const Tag = IsBlock ? "div" : "span";
			return `<${Tag} class="ww-el ww-el-${Woowiki.Slug(Name)}"${Attr}>${Html}</${Tag}>`;
		}catch(e){
			console.error(new ExceptionWW(`Woowiki.__RunElement(Name = ${Woowiki.Dump(Name)}, ArgsText = ${Woowiki.Dump(ArgsText)}, IsBlock = ${IsBlock}) упал!`, e));
			return `<span class="ww-error">[${Woowiki.Esc(Name)}: ${Woowiki.Esc(e.message)}]</span>`;
		}
	}
	__RunMounts(Target, Context){
		for(let i = 0; i < Context.Mounts.length; i++){
			const Mount = Context.Mounts[i];
			const Box   = Target.querySelector(`[data-ww-mount="${Mount.Key}"]`);
			if(Box === null){ continue; }
			try{
				Mount.Fn(Box, Mount.Props, Mount.Ctx);
			}catch(e){
				console.error(new ExceptionWW(`Woowiki.__RunMounts: Mount элемента ${Mount.Name} упал!`, e));
				Box.innerHTML = `<span class="ww-error">[${Woowiki.Esc(Mount.Name)}: ${Woowiki.Esc(e.message)}]</span>`;
			}
		}
	}
}