const FONT_MIN  = 70;
const FONT_MAX  = 200;
const FONT_STEP = 10;
// ----------------------------------------------------------------------
Woowiki.AddMod("fontsize", function(Wiki){
	const Read = function(){
		const Saved = parseInt(Wiki.__StorageGet("font-percent"), 10);
		return Number.isNaN(Saved) ? 100 : Saved;
	}
	const Apply = function(Percent){
		Wiki.Dom.Article.style.fontSize = Percent === 100 ? "" : `${Percent}%`;
	}
	const Set = function(Percent){
		const Clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, Percent));
		Wiki.__StorageSet("font-percent", String(Clamped));
		Apply(Clamped);
	}

	Wiki.AddButton({ Id: "font-down",  Order: 60, Label: "А−", Title: "Уменьшить текст",   OnClick: function(Wiki){ Set(Read() - FONT_STEP); } });
	Wiki.AddButton({ Id: "font-reset", Order: 61, Label: "А",  Title: "Обычный размер",    OnClick: function(Wiki){ Set(100); } });
	Wiki.AddButton({ Id: "font-up",    Order: 62, Label: "А+", Title: "Увеличить текст",   OnClick: function(Wiki){ Set(Read() + FONT_STEP); } });

	Wiki.On("PageAfter", function(Data){
		Apply(Read());
	});
});