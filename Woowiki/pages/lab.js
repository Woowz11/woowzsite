const WIKI_LAB = {

	snippet: {
		Title : "Сниппет",
		Tags  : [ "демо", "тест" ],
		Content: WikiText.Expand(String.raw`
Это **сниппет**: короткая страница, которую можно подключить в другую через §include§ или показать в рамке через §iframe§.

{{badge "подключено" color=green icon=link}}
`)
	},

	"include-test": {
		Title : "Проверка include",
		Tags  : [ "тест" ],
		Content: WikiText.Expand(String.raw`
Ниже вставлена страница [[snippet]]:

{{include page=snippet}}

А здесь она же в рамке:

{{iframe page=snippet height=140}}
`)
	},

	long: {
		Title : "Длинная страница",
		Tags  : [ "тест" ],
		Content: WikiText.Long(12)
	},

	orphan: {
		Title : "Страница-сирота",
		Tags  : [ "тест" ],
		Content: WikiText.Expand(String.raw`
На эту страницу никто не ссылается, поэтому она попадёт в список сирот на [[special:stats|статистике]]. Открыть её можно только через поиск или список страниц.
`)
	},

	redlinks: {
		Title : "Красные ссылки",
		Tags  : [ "тест" ],
		Content: WikiText.Expand(String.raw`
Ссылки на несуществующие страницы красные и попадают в статистику:

- [[missing-one]]
- [[missing-two|Вторая красная ссылка]]
- [[missing-one|Снова первая]]

Обычная ссылка для сравнения: [[home|Главная]].
`)
	},

	templates: {
		Title : "Шаблоны",
		Tags  : [ "служебное" ],
		Content: WikiText.Expand(String.raw`
Служебная страница: здесь объявлены шаблоны для элемента §define§. Она подключена опцией §Templates§. Живые примеры на странице [[custom]].

::::define alert
<div style="border-left:4px solid {Color|crimson}; padding:.5em 1em">
	<b>{Title|Внимание}</b>
	{Body}
</div>
::::

::::define person
<span style="display:inline-block; padding:.1em .6em; border:1px solid var(--ww-border); border-radius:var(--ww-radius)">
	<b>{Name|Аноним}</b>, {Role|гость}
</span>
::::

Шаблоны: §alert§ (параметры Title, Color и тело) и §person§ (параметры Name и Role).
`)
	}
};