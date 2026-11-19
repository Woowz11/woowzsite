const HOTKEYS_TEXT = {
	Title  : "Горячие клавиши",
	Search : "Поиск",
	Theme  : "Сменить тему",
	Home   : "На стартовую страницу",
	Random : "Случайная страница",
	Help   : "Список клавиш"
};
// ----------------------------------------------------------------------
Woowiki.AddMod("hotkeys", function(Wiki){
	const Actions = {
		"Slash"       : { Label: "/", Text: HOTKEYS_TEXT.Search, Run: function(){
			const Input = Wiki.Dom.Header.querySelector("input");
			if(Input === null){ return; }
			Input.focus();
			Input.select();
		}},
		"KeyT"        : { Label: "T", Text: HOTKEYS_TEXT.Theme, Run: function(){
			const Names = Object.keys(Wiki.Themes);
			if(Names.length === 0){ return; }
			let Next = 0;
			for(let i = 0; i < Names.length; i++){
				if(Names[i] === Wiki.Theme){ Next = (i + 1) % Names.length; }
			}
			Wiki.SetTheme(Names[Next]);
		}},
		"KeyH"        : { Label: "H", Text: HOTKEYS_TEXT.Home, Run: function(){
			Wiki.Go(Wiki.Options.Start);
		}},
		"KeyR"        : { Label: "R", Text: HOTKEYS_TEXT.Random, Run: function(){
			const Ids = Wiki.SortedIds();
			if(Ids.length === 0){ return; }
			Wiki.Go(Ids[Math.floor(Math.random() * Ids.length)]);
		}},
		"Shift+Slash" : { Label: "?", Text: HOTKEYS_TEXT.Help, Run: function(){
			Wiki.Go("special:keys");
		}}
	};

	Wiki.AddSpecial("keys", HOTKEYS_TEXT.Title, function(Arg, Wiki){
		const Rows  = [];
		const Names = Object.keys(Actions);
		for(let i = 0; i < Names.length; i++){
			const Action = Actions[Names[i]];
			Rows.push(`<tr><td><kbd class="ww-kbd">${Woowiki.Esc(Action.Label)}</kbd></td><td>${Action.Text}</td></tr>`);
		}
		const Box = Woowiki.Make("div", "ww-keys");
		Box.innerHTML = `<table>${Rows.join("")}</table>`;
		return Box;
	});

	document.addEventListener("keydown", function(KeyEvent){
		const Target = KeyEvent.target;
		if(KeyEvent.code === "Escape" && Wiki.Dom.Header.contains(Target) && Target.tagName === "INPUT"){
			Target.blur();
			return;
		}
		if(KeyEvent.ctrlKey || KeyEvent.altKey || KeyEvent.metaKey){ return; }
		if(Target.isContentEditable){ return; }
		if(Target.tagName === "INPUT" || Target.tagName === "TEXTAREA" || Target.tagName === "SELECT"){ return; }
		const Name   = KeyEvent.shiftKey ? `Shift+${KeyEvent.code}` : KeyEvent.code;
		const Action = Actions[Name];
		if(Action === undefined){ return; }
		KeyEvent.preventDefault();
		Action.Run();
	});
});