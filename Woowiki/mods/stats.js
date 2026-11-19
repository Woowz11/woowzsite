const WW_STATS_LINK_RE = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/;
const WW_STATS_LIMIT   = 10;
const WW_STATS_TEXT    = {
	Title    : "Статистика",
	Pages    : "Страниц",
	Words    : "Слов всего",
	Tags     : "Тегов",
	Orphans  : "Сироты: на них никто не ссылается",
	Missing  : "Красные ссылки: страниц нет",
	Largest  : "Самые большие",
	Linked   : "На них ссылаются чаще всего",
	From     : "из",
	More     : "и ещё",
	Empty    : "ничего нет",
	WordsEnd : "слов",
	LinksEnd : "ссылок"
};
// ----------------------------------------------------------------------
class WoowikiStats{

	static Collect(Wiki){
		try{
			const Ids      = Wiki.SortedIds();
			const Incoming = Object.create(null);
			const Missing  = Object.create(null);
			const WordsOf  = Object.create(null);
			const Tags     = Object.create(null);
			const Re       = new RegExp(WW_STATS_LINK_RE.source, "g");
			let Total = 0;
			for(let i = 0; i < Ids.length; i++){
				Incoming[Ids[i]] = [];
			}
			for(let i = 0; i < Ids.length; i++){
				const From  = Ids[i];
				const Page  = Wiki.Pages[From];
				const Found = Page.Content.match(/\S+/g);
				WordsOf[From] = Found === null ? 0 : Found.length;
				Total += WordsOf[From];
				for(let t = 0; t < Page.Tags.length; t++){
					Tags[Page.Tags[t]] = true;
				}
				Re.lastIndex = 0;
				let Match = Re.exec(Page.Content);
				while(Match !== null){
					const To = Woowiki.Slug(Match[1].trim());
					if(To !== From){
						if(Wiki.Pages[To] !== undefined){
							if(Incoming[To].indexOf(From) === -1){ Incoming[To].push(From); }
						}else{
							if(Missing[To] === undefined){ Missing[To] = []; }
							if(Missing[To].indexOf(From) === -1){ Missing[To].push(From); }
						}
					}
					Match = Re.exec(Page.Content);
				}
			}

			const Orphans     = [];
			const Linked      = [];
			const Largest     = [];
			const MissingList = [];
			for(let i = 0; i < Ids.length; i++){
				const Id = Ids[i];
				if(Incoming[Id].length === 0 && Id !== Wiki.Options.Start){ Orphans.push(Id); }
				Linked.push({ Id: Id, Count: Incoming[Id].length });
				Largest.push({ Id: Id, Words: WordsOf[Id] });
			}
			const MissingIds = Object.keys(Missing);
			for(let i = 0; i < MissingIds.length; i++){
				MissingList.push({ Id: MissingIds[i], From: Missing[MissingIds[i]] });
			}
			Linked.sort(function(A, B){ return B.Count - A.Count; });
			Largest.sort(function(A, B){ return B.Words - A.Words; });
			MissingList.sort(function(A, B){ return B.From.length - A.From.length; });

			return {
				Count   : Ids.length,
				Words   : Total,
				TagCount: Object.keys(Tags).length,
				Orphans : Orphans,
				Missing : MissingList,
				Linked  : Linked,
				Largest : Largest
			};
		}catch(e){
			throw new ExceptionWW("WoowikiStats.Collect: не удалось собрать статистику!", e);
		}
	}

	static Section(Title, Rows, Total){
		if(Rows.length === 0){
			return `<h2>${Title}</h2><p style="color:var(--ww-muted)">${WW_STATS_TEXT.Empty}</p>`;
		}
		const Rest = Total > Rows.length ? `<p style="color:var(--ww-muted)">${WW_STATS_TEXT.More} ${Total - Rows.length}</p>` : "";
		return `<h2>${Title}</h2><ul>${Rows.join("")}</ul>${Rest}`;
	}

	static Html(Wiki, Stats){
		try{
			const OrphanRows  = [];
			const MissingRows = [];
			const LargestRows = [];
			const LinkedRows  = [];
			for(let i = 0; i < Stats.Orphans.length && i < WW_STATS_LIMIT; i++){
				const Id = Stats.Orphans[i];
				OrphanRows.push(`<li>${Wiki.PageLink(Id, Wiki.Pages[Id].Title)}</li>`);
			}
			for(let i = 0; i < Stats.Missing.length && i < WW_STATS_LIMIT; i++){
				const Item  = Stats.Missing[i];
				const Links = [];
				for(let s = 0; s < Item.From.length && s < 5; s++){
					Links.push(Wiki.PageLink(Item.From[s], Wiki.Pages[Item.From[s]].Title));
				}
				MissingRows.push(`<li><code>${Woowiki.Esc(Item.Id)}</code>, ${WW_STATS_TEXT.From}: ${Links.join(", ")}</li>`);
			}
			for(let i = 0; i < Stats.Largest.length && i < WW_STATS_LIMIT; i++){
				const Item = Stats.Largest[i];
				LargestRows.push(`<li>${Wiki.PageLink(Item.Id, Wiki.Pages[Item.Id].Title)}, ${Item.Words} ${WW_STATS_TEXT.WordsEnd}</li>`);
			}
			for(let i = 0; i < Stats.Linked.length && i < WW_STATS_LIMIT; i++){
				const Item = Stats.Linked[i];
				if(Item.Count === 0){ break; }
				LinkedRows.push(`<li>${Wiki.PageLink(Item.Id, Wiki.Pages[Item.Id].Title)}, ${Item.Count} ${WW_STATS_TEXT.LinksEnd}</li>`);
			}

			const Table = `<table>
				<tr><td>${WW_STATS_TEXT.Pages}</td><td>${Stats.Count}</td></tr>
				<tr><td>${WW_STATS_TEXT.Words}</td><td>${Stats.Words}</td></tr>
				<tr><td>${WW_STATS_TEXT.Tags}</td><td>${Stats.TagCount}</td></tr>
			</table>`;

			return Table
				+ WoowikiStats.Section(WW_STATS_TEXT.Orphans, OrphanRows, Stats.Orphans.length)
				+ WoowikiStats.Section(WW_STATS_TEXT.Missing, MissingRows, Stats.Missing.length)
				+ WoowikiStats.Section(WW_STATS_TEXT.Largest, LargestRows, Stats.Largest.length)
				+ WoowikiStats.Section(WW_STATS_TEXT.Linked, LinkedRows, LinkedRows.length);
		}catch(e){
			throw new ExceptionWW("WoowikiStats.Html: не удалось построить страницу статистики!", e);
		}
	}
}
// ----------------------------------------------------------------------
Woowiki.AddMod("stats", function(Wiki){
	Wiki.AddSpecial("stats", WW_STATS_TEXT.Title, function(Arg, Wiki){
		try{
			const Box = Woowiki.Make("div", "ww-stats");
			Box.innerHTML = WoowikiStats.Html(Wiki, WoowikiStats.Collect(Wiki));
			return Box;
		}catch(e){
			throw new ExceptionWW(`stats: спецстраница упала, Arg = ${Woowiki.Dump(Arg)}!`, e);
		}
	});
	Wiki.AddPanel({ Id: "stats", Title: WW_STATS_TEXT.Title, Order: 96, Render: function(Wiki){
		return `<a href="${Woowiki.Href("special:stats")}">${WW_STATS_TEXT.Title}</a>`;
	}});
});