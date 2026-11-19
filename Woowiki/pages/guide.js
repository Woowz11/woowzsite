const WIKI_GUIDE = {

	home: {
		Title : "Главная",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
Это **тестовая вики** на движке [[about|Woowiki]]. В ней три раздела:

- документация: [[install]], [[writing]], [[elements]], [[inline]], [[history]], [[embed]], [[code]], [[custom]], [[mods]], [[options]], [[events]];
- статьи «как в энциклопедии»: [[solar-system|космос]] и [[csharp|языки программирования]];
- страницы для проверок: [[long]], [[redlinks]], [[snippet]].

:::infobox title="Woowiki"
Версия | 2.0.0
Автор | woowz
Файлы | woowiki.js, woowiki_standard.js
Зависимости | нет
:::

## Что попробовать

- Наведи курсор на любую ссылку на страницу: появится окно с краткой информацией.
- Нажми {{kbd /}} и начни вводить: живой поиск. Все клавиши на странице [[special:keys|горячих клавиш]].
- Смени тему кнопкой справа сверху, поменяй размер текста кнопками «А−» и «А+».
- Открой [[special:stats|статистику]] и [[special:preview|предпросмотр]].

## Страницы с тегом «демо»

{{pagelist tag=демо}}

## Теги

{{tagcloud}}

В вики {{pagecount}} страниц. {{random "Открыть случайную"}}
`)
	},

	about: {
		Title : "О Woowiki",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
{{badge "2.0.0" color=blue icon=star}} {{badge "без зависимостей" color=green icon=ok}}

**Woowiki** это библиотека-конструктор википедий для статических сайтов и GitHub Pages. Автор вики описывает страницы в JavaScript, посетитель может только читать.

## Из чего состоит

| Файл | Роль |
|---|---|
| woowiki.js | база: каркас, роутинг, markdown, события, моды |
| woowiki_standard.js | стандарт: элементы, темы, поиск, окна |
| mods/*.js | необязательные моды |
| pages/*.js | страницы автора |

Без стандарта вики пустая: база не знает ни одного элемента. Подробнее о подключении в [[install]], о версиях в [[history]].

:::tip title="Идея"
Всё, что можно добавить, добавляется модом. Всё, что не нужно, отключается через §SkipMods§.
:::
`)
	},

	install: {
		Title : "Установка",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
:::steps
Положи woowiki.js и woowiki_standard.js рядом с index.html.
Подключи их обычными тегами script, не type="module".
Подключи моды и файлы со страницами до создания вики.
Создай вики и вызови Start.
:::

## Минимальный index.html

:::code lang=html title="index.html" lines=true
<div id="wiki"></div>
<script src="woowiki.js"></script>
<script src="woowiki_standard.js"></script>
<script>
	const Wiki = new Woowiki({
		Title: "Моя вики",
		Pages: { home: { Title: "Главная", Content: "Привет!" } }
	});
	Wiki.Start();
</script>
:::

## Пустая вики

Если подключить только woowiki.js, элементов не будет совсем: ни поиска, ни тем, ни окон.

:::warn
Стандарт подключай первым, свои моды после него: они перекрывают стандартные элементы.
:::

## Копирование

{{copy "npm install woowiki" label="Копировать"}}
`)
	},

	writing: {
		Title : "Как писать страницы",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
Страница это объект с полями §Title§, §Tags§ и §Content§. Текст пишется на Markdown с добавками. Под каждым примером ниже сразу виден результат.

## Текст
<<<
**жирный**, *курсив*, ~~зачёркнутый~~ и §код в строке§
>>>

## Списки и цитаты
<<<
- первый пункт
- второй пункт
  - вложенный пункт

> Цитата в одну строку.
>>>

## Ссылки
<<<
[[home]] ссылка по Id
[[home|на главную]] со своим текстом
[[elements#таблицы|раздел «Таблицы»]] на раздел страницы
[[missing-page]] красная ссылка, страницы нет
[внешняя](https://example.com "Подсказка")
>>>

Наведи курсор на ссылку: окно покажет заголовок, теги и начало текста страницы.

## Блок кода

В тройных обратных кавычках с указанием языка:

<<<
§§§js
const Name = "woowz";
console.log(Name);
§§§
>>>

## Теги

Теги задаются в коде страницы и дают страницу списка по тегу:

:::code lang=js
const PAGE = {
	Title : "Земля",
	Tags  : [ "космос", "планета" ],
	Content: "Текст страницы"
};
:::

Посмотреть все теги можно на странице [[special:all|всех страниц]].
`)
	},

	elements: {
		Title : "Элементы",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
Элемент пишется в строке (двойные фигурные скобки) или блоком (три двоеточия). Блок закрывается строкой из тех же двоеточий. Чтобы вложить блок в блок, снаружи ставят больше двоеточий.

## Выделения
<<<
:::note
Обычная заметка.
:::

:::tip title="Совет"
Заголовок задаётся аргументом.
:::

:::warn
Предупреждение.
:::

:::danger
Опасно.
:::
>>>

## Свёрнутые блоки
<<<
:::spoiler title="Нажми, чтобы раскрыть"
Скрытый текст.
:::
>>>

## Таблицы

Ячейки без выравнивания центрируются, выравнивание из разметки сохраняется.

<<<
| Без выравнивания | Слева | По центру | Справа |
|---|:---|:---:|---:|
| раз | a | b | c |
| два | длинный текст | x | 100 |
>>>

## Колонки
<<<
:::columns
Левая колонка.
|||
Правая колонка.
:::
>>>

## Вкладки и аккордеон
<<<
:::tabs
@@ Первая
Текст первой вкладки.
@@ Вторая
Текст второй вкладки.
:::

:::accordion exclusive=true open=true
@@ Раздел А
Раскрывается один раздел за раз.
@@ Раздел Б
Второй раздел.
:::
>>>

## Шаги и карточки
<<<
:::steps
Первый шаг
Второй шаг
Третий шаг
:::

:::cards
Первая
Описание первой карточки.
|||
Вторая
Описание второй карточки.
:::
>>>

## Цитата
<<<
:::quote author=woowz source="README"
Простота важнее изящества.
:::
>>>

## Данные
<<<
:::csv header=true
Планета,Спутников,Кольца
Земля,1,нет
Марс,2,нет
Сатурн,146,да
:::

:::chart unit=% max=100
Python: 30
JavaScript: 55
Lua: 15
:::

:::checklist
[x] написать базу
[x] написать стандарт
[ ] написать туториал
:::

{{progress 70 "Готовность"}}
>>>

## Выравнивание
<<<
:::align right
Текст справа.
:::

:::center
Текст по центру.
:::
>>>

Дальше о мелких строчных элементах: [[inline]].
`)
	},

	inline: {
		Title : "Бейджи, клавиши, цвета",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
## Бейджи

Цвет: gray, blue, green, red, yellow, purple, orange или любой CSS-цвет. Иконка: имя, символ или адрес картинки.

<<<
{{badge "новое" color=green icon=star}}
{{badge "v2" icon="🚀" iconright=arrow}}
{{badge "свой" color="rgb(139 92 246)"}}
{{badge "светлый" color=yellow icon=warn}}
>>>

## Клавиши, мышь, геймпад

Клавиши нажимаются мышкой. Сочетания пишутся через плюс.

<<<
{{kbd Ctrl+Shift+P}} {{kbd Ctrl++}} {{kbd Cmd+Opt+Esc}}
{{kbd Up}} {{kbd Enter}} {{kbd Backspace}}
>>>

Мышь:

<<<
{{kbd LMB}} {{kbd RMB}} {{kbd MMB}} {{kbd WheelUp}} {{kbd WheelDown}} {{kbd Mouse4}} {{kbd Mouse5}}
{{kbd Ctrl+LMB}} {{kbd ЛКМ}} {{kbd ПКМ}}
>>>

Геймпад Xbox и PlayStation:

<<<
{{kbd pad:A}} {{kbd pad:B}} {{kbd pad:X}} {{kbd pad:Y}} {{kbd pad:LB}} {{kbd pad:RT}} {{kbd pad:Dpad}}
{{kbd ps:Cross}} {{kbd ps:Circle}} {{kbd ps:Square}} {{kbd ps:Triangle}} {{kbd ps:L1}} {{kbd ps:R2}}
>>>

## Цвет

Принимаются все форматы CSS. Если цвет прозрачный, видна шахматка.

<<<
{{color red}} {{color "#3b82f6"}} {{color "#ff000080"}}
{{color "rgb(255 0 0 / 50%)"}} {{color "hsl(160 80% 40%)"}} {{color "oklch(70% 0.2 150)"}}
{{color rebeccapurple}} {{color transparent}}
>>>

С текстом и фоном:

<<<
{{color "rgb(255 0 0 / 40%)" "красный на шахматке"}}
{{color "#10b981" "зелёный фон" bg=true}}
>>>

## Мелкие элементы
<<<
{{abbr "HTML" tip="HyperText Markup Language"}} {{mark "выделено"}}
H{{sub 2}}O и E = mc{{sup 2}}
>>>

## Подсказки

Подсказку получают и обычные ссылки: [наведи сюда](https://example.com "Это подсказка через title").
`)
	},

	history: {
		Title : "Хронология и ветки",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
Хронология рисуется как граф. Строка это событие: «дата | текст» на основной ветке, «ветка | дата | текст» на своей, «ветка from родитель | …» создаёт ветку, «ветка into цель | …» сливает её.

## Простая
<<<
:::timeline
1.0.0 | Один файл, редактор страниц
1.3.0 | Всплывающие окна и живой поиск
2.0.0 | База и стандарт в разных файлах
:::
>>>

## С веткой
<<<
:::timeline
1.0.0 | Один файл, редактор страниц
1.3.0 | Всплывающие окна и живой поиск
standard from main | 2.0.0 | Стандарт выделен в отдельный файл
standard | 2.1.0 | Моды reading и outline
main | 2.0.0 | База без элементов
standard into main | 2.2.0 | Стандарт стал частью релиза
:::
>>>

## Две ветки
<<<
:::timeline
main | v1 | Старт проекта
feature from main | v2 | Начали новую возможность
fix from main | v2 | Срочная правка
fix into main | v2 | Правка влита
feature | v3 | Возможность готова
feature into main | v3 | Возможность влита
:::
>>>

Слова «от» и «в» работают вместо from и into.
`)
	},

	embed: {
		Title : "Встраивание",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
## Страница этой вики
<<<
{{iframe page=snippet height=160}}
>>>

## Свой HTML
<<<
:::iframe height=100
<body style="font-family:sans-serif"><h3>Привет из srcdoc</h3></body>
:::
>>>

## Другой сайт

Список разрешённых хостов задаётся в опции §IframeHosts§.

<<<
{{iframe src="https://example.com" height=200 title="Пример"}}
>>>

:::note
Многие сайты запрещают встраивание. Тогда рамка пустая, а ссылка «↗» открывает сайт в новой вкладке.
:::

## Видео и карта
<<<
{{youtube jNQXAC9IVRw}}
{{map lat=55.7558 lon=37.6173 zoom=12 height=300 marker=true}}
>>>

## Картинки
<<<
:::figure src="${WikiText.Swatch("#c0392b", "A")}" caption="Одна картинка с подписью" width=320 align=right
:::
>>>

{{clear}}

<<<
:::gallery cols=3
${WikiText.Swatch("#2980b9", "1")} | Синяя
${WikiText.Swatch("#27ae60", "2")} | Зелёная
${WikiText.Swatch("#8e44ad", "3")} | Фиолетовая
:::
>>>

Клик по картинке открывает её на весь экран.

## Поле для копирования
<<<
{{copy "Текст из поля" label="Копировать"}}

:::copy label="Копировать всё"
Несколько строк
в большом поле
:::
>>>
`)
	},

	code: {
		Title : "Код с подсветкой",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
Подсветка живёт в моде §code.js§: c, cpp, c#, java, javascript, python, lua, markdown, html, css. Номера строк в копию не попадают.

:::code lang=cs title="Player.cs" lines=true start=10
public class Player{
	public string Name;
	public int Health = 100;

	public void Hit(int Damage){
		Health -= Damage;
		if(Health <= 0){ Console.WriteLine($"{Name} погиб!"); }
	}
}
:::

:::code lang=javascript title="app.js"
const Names = [ "Ann", "Bob" ];
for(let i = 0; i < Names.length; i++){
	console.log(§Привет, ¤{Names[i]}!§);
}
:::

:::code lang=python
def fact(N):
	if N <= 1:
		return 1
	return N * fact(N - 1)
:::

:::code lang=lua
local function Greet(Name)
	print("Привет, " .. Name)
end
:::

:::code lang=c
#include <stdio.h>
int main(void){
	printf("hello\n");
	return 0;
}
:::

:::code lang=cpp
#include <vector>
std::vector<int> Items = { 1, 2, 3 };
:::

:::code lang=java
public class Main{
	public static void main(String[] Args){
		System.out.println("hello");
	}
}
:::

:::code lang=html
<div class="box">
	<a href="#/home">Домой</a>
</div>
:::

:::code lang=css
.box{ color: #3b82f6; margin: 0 auto; }
:::

В строке: {{code lang=cs "int X = 5;"}} и {{code lang=lua "print(1 + 2)"}}.

Для языков других статей смотри [[csharp]], [[javascript]] и [[lua]].
`)
	},

	custom: {
		Title : "Свои элементы",
		Tags  : [ "документация", "демо" ],
		Content: WikiText.Expand(String.raw`
Свой элемент можно сделать тремя способами.

## 1. Прямо на странице (define)

Шаблоны объявлены на служебной странице [[templates]]. Открой её исходник кнопкой «Исходник».

:::alert title="Осторожно" color=orange
Текст со [[home|ссылкой]] и **markdown**.
:::

:::alert
Без параметров берутся значения по умолчанию.
:::

Строчный: {{person name="woowz" role="автор"}} и {{person}}.

## 2. Из JS-шаблона

:::code lang=js
WoowikiStd.AddTemplate(Wiki, "hello", "<b>{Name|мир}</b>");
:::

## 3. Мод с логикой

:::code lang=js
Wiki.AddElement("hello", function(Props){
	return §<b>Привет, ¤{Woowiki.Esc(Props.Name)}!</b>§;
});
:::

Мод с кубиком из файла §mods/dice.js§: {{dice sides=20}} {{dice sides=6}}

Список готовых модов: [[mods]].
`)
	},

	mods: {
		Title : "Моды",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
Мод это функция, которая получает вики и добавляет в неё элементы, панели, кнопки, стили и обработчики событий.

## Стандартные

| Мод | Что делает |
|---|---|
| std-themes | темы light, dark, sepia и кнопка выбора |
| std-elements | заметки, колонки, spoiler, toc, pagelist, include |
| std-specials | страницы всех страниц и тегов |
| std-panels | панели «Страницы» и «Теги» |
| std-search | живой поиск |
| std-popups | всплывающие окна |
| std-copy | кнопки копирования |
| std-embed | iframe, video, audio, vimeo, map |
| std-blocks | бейджи, клавиши, цвета, хронология, вкладки и другое |
| std-nav | backlinks, tagcloud, pagecount, random |
| std-media | увеличение картинок, ленивая загрузка |
| std-define | свои элементы-шаблоны |

## Дополнительные

| Файл | Что делает |
|---|---|
| code.js | подсветка кода |
| preview.js | [[special:preview|предпросмотр]] с синхронной прокруткой |
| dice.js | элемент dice |
| reading.js | полоса чтения, «наверх», время чтения |
| outline.js | плавающее оглавление |
| recent.js | панель «Недавние» |
| stats.js | [[special:stats|статистика]] |
| hotkeys.js | [[special:keys|горячие клавиши]] |
| fontsize.js | размер текста |

## Отключение

:::code lang=js
const Wiki = new Woowiki({ SkipMods: [ "std-media", "recent" ] });
:::

Настройки: [[options]]. События для своих модов: [[events]].
`)
	},

	options: {
		Title : "Настройки",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
## База

| Опция | По умолчанию | Что делает |
|---|---|---|
| Target | "#wiki" | куда рисовать |
| Title | "Woowiki" | название в шапке |
| Start | "home" | стартовая страница |
| Theme | "light" | тема |
| Pages | {} | страницы |
| AllowHtml | false | разрешить HTML в тексте |
| Persist | true | запоминать тему |
| BaseCss | true | подключать стили |
| Footer | null | подвал |
| SkipMods | [] | отключённые моды |

## Стандарт

| Опция | По умолчанию | Что делает |
|---|---|---|
| ThemeButton | true | кнопка темы |
| Popups | true | всплывающие окна |
| PopupDelay | 250 | задержка показа, мс |
| PopupHideDelay | 300 | задержка скрытия, мс |
| SuggestCount | 6 | подсказок в поиске |
| PreCopy | true | кнопка копирования на коде |
| ImageZoom | true | увеличение картинок |
| LazyImages | true | ленивая загрузка |
| ExternalLinksBlank | false | внешние ссылки в новой вкладке |
| IframeHosts | [] | разрешённые хосты iframe |
| IframeHeight | 480 | высота iframe, px |
| Templates | [] | страницы с шаблонами define |

## Другие моды

| Опция | Мод | По умолчанию |
|---|---|---|
| CodeLines | code | false |
| CodeCopy | code | true |
| ReadingSpeed | reading | 200 |
| ReadingMinWords | reading | 150 |
| RecentCount | recent | 8 |

## Ширина и цвета

:::code lang=js
Wiki.SetVars({ Width: "1800px" });
Wiki.Themes.dark.Accent = "#ffcc00";
:::
`)
	},

	events: {
		Title : "События",
		Tags  : [ "документация" ],
		Content: WikiText.Expand(String.raw`
| Событие | Данные | Когда |
|---|---|---|
| Ready | пусто | вики запущена |
| PageBefore | Id | перед показом страницы |
| PageAfter | Id, Article | страница нарисована |
| MarkdownBefore | Text, Context | до разбора текста |
| HtmlAfter | Html, Context | после разбора |
| Render | Target, Context | фрагмент вставлен в DOM |
| Theme | Name | сменилась тема |

:::code lang=js
Wiki.On("PageAfter", function(Data){
	console.log(§Открыта страница ¤{Data.Id}§);
});
:::

Ошибка в обработчике не ломает страницу: она пишется в консоль с именем мода.

Пример реального использования: мод §reading§ на каждом §PageAfter§ считает время чтения. Список модов: [[mods]].
`)
	}
};