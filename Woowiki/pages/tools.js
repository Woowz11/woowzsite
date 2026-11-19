const WIKI_LOREM = [
	"Вики состоит из страниц, а страницы связаны между собой ссылками.",
	"Каждая страница описывается в коде автора и не меняется посетителем.",
	"Заголовки второго и третьего уровня попадают в плавающее оглавление.",
	"Чем длиннее текст, тем заметнее полоса прогресса чтения сверху.",
	"Кнопка «наверх» появляется, когда страница прокручена вниз.",
	"Время чтения считается по числу слов и скорости из опции ReadingSpeed."
];
// ----------------------------------------------------------------------
class WikiText{

	/// Раскрывает текст страницы: блок <<< ... >>> становится исходником и живым результатом, § это обратная кавычка, ¤ это доллар.
	static Expand(Text){
		try{
			const Blocks = Text.replace(/^<<<\n([\s\S]*?)\n>>>$/gm, function(Whole, Source){
				return `::::::code lang=md\n${Source}\n::::::\n\n${Source}`;
			});
			return Blocks.replace(/§/g, function(){ return "`"; }).replace(/¤/g, function(){ return "$"; });
		}catch(e){
			throw new ExceptionWW(`WikiText.Expand: не удалось раскрыть текст страницы, длина = ${Text.length}!`, e);
		}
	}

	/// Картинка-заглушка одного цвета с буквой, возвращает data-адрес.
	static Swatch(Color, Text){
		const Svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="320" height="200" fill="${Color}"/><text x="160" y="112" font-size="48" font-family="sans-serif" fill="white" text-anchor="middle">${Text}</text></svg>`;
		return `data:image/svg+xml,${encodeURIComponent(Svg)}`;
	}

	/// Несколько предложений подряд из WIKI_LOREM, начиная с номера Seed.
	static Sentences(Seed, Count){
		const Parts = [];
		for(let i = 0; i < Count; i++){
			Parts.push(WIKI_LOREM[(Seed + i) % WIKI_LOREM.length]);
		}
		return Parts.join(" ");
	}

	/// Длинная страница из SectionCount разделов, у каждого по два подраздела.
	static Long(SectionCount){
		const Lines = [ "{{toc}}", "", "Длинная страница для проверки полосы чтения, кнопки «наверх» и плавающего оглавления.", "" ];
		for(let i = 1; i <= SectionCount; i++){
			Lines.push(`## Раздел ${i}`);
			Lines.push("");
			Lines.push(WikiText.Sentences(i, 4));
			Lines.push("");
			for(let s = 1; s <= 2; s++){
				Lines.push(`### Подраздел ${i}.${s}`);
				Lines.push("");
				Lines.push(WikiText.Sentences(i + s, 6));
				Lines.push("");
			}
		}
		return Lines.join("\n");
	}
}