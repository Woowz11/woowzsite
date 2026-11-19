const RECENT_DEFAULTS = { RecentCount: 8 };
const RECENT_TEXT     = { Title: "Недавние", Empty: "пока пусто" };
// ----------------------------------------------------------------------
Woowiki.AddMod("recent", function(Wiki){
	Woowiki.FillMissingKeys(Wiki.Options, RECENT_DEFAULTS);

	const Load = function(){
		const Saved = Wiki.__StorageGet("recent");
		if(Saved === null){ return []; }
		try{
			const List = JSON.parse(Saved);
			return Array.isArray(List) ? List : [];
		}catch(e){
			return [];
		}
	}

	Wiki.On("PageBefore", function(Data){
		if(Wiki.Pages[Data.Id] === undefined){ return; }
		const List  = Load();
		const Index = List.indexOf(Data.Id);
		if(Index !== -1){ List.splice(Index, 1); }
		List.unshift(Data.Id);
		List.length = Math.min(List.length, Wiki.Options.RecentCount + 1);
		Wiki.__StorageSet("recent", JSON.stringify(List));
	});

	Wiki.AddPanel({ Id: "recent", Title: RECENT_TEXT.Title, Order: 30, Render: function(Wiki){
		const List = Load();
		const Rows = [];
		for(let i = 0; i < List.length; i++){
			const Page = Wiki.Pages[List[i]];
			if(Page === undefined){ continue; }
			if(List[i] === Wiki.CurrentId){ continue; }
			Rows.push(`<li>${Wiki.PageLink(List[i], Page.Title)}</li>`);
			if(Rows.length >= Wiki.Options.RecentCount){ break; }
		}
		if(Rows.length === 0){ return `<span style="color:var(--ww-muted)">${RECENT_TEXT.Empty}</span>`; }
		return `<ul>${Rows.join("")}</ul>`;
	}});
});