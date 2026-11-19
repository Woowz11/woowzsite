const PREVIEW_DEFAULT_TEXT = "## Черновик\n\nПиши слева, результат появится справа.\n";
const PREVIEW_CSS = `
.ww-preview-bar{ display:flex; align-items:center; gap:16px; margin-bottom:8px; }
.ww-preview-sync{ display:flex; align-items:center; gap:6px; cursor:pointer; user-select:none; }
.ww-preview{ display:grid; grid-template-columns:minmax(0, 1fr) minmax(0, 1fr); gap:16px; }
.ww-preview-input{ display:block; box-sizing:border-box; width:100%; height:78vh; padding:10px 12px; color:var(--ww-fg); background:var(--ww-bg); border:1px solid var(--ww-border); border-radius:var(--ww-radius); font:14px/1.5 ui-monospace, Consolas, monospace; tab-size:4; resize:none; overflow:auto; }
.ww-preview-output{ box-sizing:border-box; min-width:0; height:78vh; padding:10px 16px; overflow:auto; border:1px solid var(--ww-border); border-radius:var(--ww-radius); }
@media (max-width:900px){
	.ww-preview{ grid-template-columns:minmax(0, 1fr); }
	.ww-preview-input, .ww-preview-output{ height:45vh; }
}
`
// ----------------------------------------------------------------------
Woowiki.AddMod("preview", function(Wiki){
	Wiki.AddCss(PREVIEW_CSS, "preview");
	Wiki.AddSpecial("preview", "Предпросмотр", function(Arg, Wiki){
		try{
			let StartText = PREVIEW_DEFAULT_TEXT;
			let IsDraft   = true;
			if(Arg !== null && Arg !== ""){
				const Id   = Woowiki.Slug(Arg);
				const Page = Wiki.Pages[Id];
				if(Page === undefined){ throw new ExceptionWW(`Страницы Id = ${Woowiki.Dump(Id)} нет, открыть её в предпросмотре нельзя!`, null); }
				StartText = Page.Content;
				IsDraft   = false;
			}else{
				const Saved = Wiki.__StorageGet("preview-draft");
				if(Saved !== null){ StartText = Saved; }
			}
			const Wrap      = Woowiki.Make("div", "ww-preview-wrap");
			const Bar       = Woowiki.Make("div", "ww-preview-bar", Wrap);
			const Reset     = Woowiki.Make("button", "ww-button ww-preview-reset", Bar);
			const SyncLabel = Woowiki.Make("label", "ww-preview-sync", Bar);
			const Sync      = Woowiki.Make("input", "", SyncLabel);
			SyncLabel.appendChild(document.createTextNode("Синхронная прокрутка"));
			const Box       = Woowiki.Make("div", "ww-preview", Wrap);
			const Input     = Woowiki.Make("textarea", "ww-preview-input", Box);
			const Output    = Woowiki.Make("div", "ww-preview-output", Box);
			Input.value      = StartText;
			Input.spellcheck = false;
			Reset.type        = "button";
			Reset.textContent = "Сбросить";
			Sync.type    = "checkbox";
			Sync.checked = Wiki.__StorageGet("preview-sync") !== "0";

			const Expected = { Input: null, Output: null };
			const Follow = function(From, To, ToKey){
				const FromRange = From.scrollHeight - From.clientHeight;
				const ToRange   = To.scrollHeight - To.clientHeight;
				if(FromRange <= 0 || ToRange <= 0){ return; }
				To.scrollTop   = Math.round(From.scrollTop / FromRange * ToRange);
				Expected[ToKey] = To.scrollTop;
			}
			const Link = function(From, To, FromKey, ToKey){
				From.addEventListener("scroll", function(){
					if(!Sync.checked){ return; }
					if(Expected[FromKey] !== null && Math.abs(From.scrollTop - Expected[FromKey]) < 1.5){
						Expected[FromKey] = null;
						return;
					}
					Follow(From, To, ToKey);
				});
			}
			Link(Input, Output, "Input", "Output");
			Link(Output, Input, "Output", "Input");

			let Timer = 0;
			const Draw = function(){
				try{
					Wiki.RenderInto(Output, Input.value, { Id: null, Preview: true });
					if(IsDraft){ Wiki.__StorageSet("preview-draft", Input.value); }
				}catch(e){
					Output.innerHTML = `<div class="ww-error">${Woowiki.Esc(e.message)}</div>`;
				}
				if(Sync.checked){ Follow(Input, Output, "Output"); }
			}
			Sync.addEventListener("change", function(){
				Wiki.__StorageSet("preview-sync", Sync.checked ? "1" : "0");
				if(Sync.checked){ Follow(Input, Output, "Output"); }
			});
			Input.addEventListener("input", function(){
				clearTimeout(Timer);
				Timer = setTimeout(Draw, 150);
			});
			Input.addEventListener("keydown", function(KeyEvent){
				if(KeyEvent.key !== "Tab"){ return; }
				KeyEvent.preventDefault();
				Input.setRangeText("\t", Input.selectionStart, Input.selectionEnd, "end");
				clearTimeout(Timer);
				Timer = setTimeout(Draw, 150);
			});
			Reset.addEventListener("click", function(){
				Input.value = IsDraft ? PREVIEW_DEFAULT_TEXT : StartText;
				Draw();
			});
			Draw();
			return Wrap;
		}catch(e){
			throw new ExceptionWW(`preview: спецстраница упала, Arg = ${Woowiki.Dump(Arg)}!`, e);
		}
	});
	Wiki.AddPanel({ Id: "preview", Title: "Инструменты", Order: 95, Render: function(Wiki){
		return `<a href="${Woowiki.Href("special:preview")}">Предпросмотр</a>`;
	}});
	Wiki.AddButton({
		Id      : "source",
		Order   : 80,
		Label   : "Исходник",
		Title   : "Открыть исходник страницы в предпросмотре",
		Visible : function(Wiki){ return Wiki.Pages[Wiki.CurrentId] !== undefined; },
		OnClick : function(Wiki){ Wiki.Go("special:preview", Wiki.CurrentId); }
	});
});