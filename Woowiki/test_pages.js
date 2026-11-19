const TEST_PAGES_DEMO = String.raw`
:::infobox title="Woowiki" image="https://placehold.co/280x140"
Автор: woowz
Версия: 2.0.0
Файлов: 2 + моды
Зависимости: нет
Главная: [[home|Главная]]
:::

Эта страница показывает **всё**, что умеет Woowiki. Справа карточка §infobox§. Почти у каждой возможности сначала идёт исходник, потом результат. Полный список элементов лежит в самом конце, в разделе «Справочник».

:::toc
:::

## Из чего состоит вики

База §woowiki.js§ умеет только каркас: роутинг, markdown, ссылки, события, реестры и программный поиск. Все элементы, темы, панели и окна лежат в стандарте §woowiki_standard.js§, а он состоит из модов, каждый из которых можно отключить.

| Файл | Что даёт |
|:---|:---|
| §woowiki.js§ | каркас, markdown, §[[ссылки]]§, §:::элементы§, §{{элементы}}§, события, моды |
| §woowiki_standard.js§ | все элементы из этой страницы, темы, панели, поиск, окна, копирование, встраивание |
| §mods/code.js§ | элемент §code§ и подсветка кода |
| §mods/preview.js§ | страница §special:preview§ и кнопка «Исходник» |
| §mods/dice.js§ | пример своего мода: элемент §dice§ |

Моды стандарта отключаются через §SkipMods§:

§§§js
const Wiki = new Woowiki({
	Title    : "Моя вики",
	SkipMods : [ "std-media", "std-nav" ]
});
§§§

Без §woowiki_standard.js§ вики пустая: ни элементов, ни меню, ни поиска.

## Текст

§§§md
**жирный**, *курсив*, ~~зачёркнутый~~, §код§
§§§

**жирный**, *курсив*, ~~зачёркнутый~~, §код§

Абзацы разделяются пустой строкой. Строки внутри абзаца
склеиваются в один абзац.

## Заголовки

§§§md
## Уровень 2
### Уровень 3
#### Уровень 4
##### Уровень 5
###### Уровень 6
§§§

Заголовки получают якоря автоматически. Уровни 2–4 попадают в содержание §toc§.

## Списки

§§§md
- Пункт
  - Вложенный
    - Ещё глубже
- Другой пункт

1. Первый
2. Второй
   1. Вложенный
§§§

- Пункт
  - Вложенный
    - Ещё глубже
- Другой пункт

1. Первый
2. Второй
   1. Вложенный

## Цитаты

§§§md
> Цитата
> > Вложенная цитата
§§§

> Цитата
> > Вложенная цитата

Цитата с автором и источником делается элементом §quote§, он описан ниже.

## Разделитель

§§§md
---
§§§

---

## Таблицы

§§§md
| Элемент | Тип | Описание |
|:---|:---:|---:|
| infobox | блок | Карточка справа |
| spoiler | блок | Скрытый текст |
§§§

| Элемент | Тип | Описание |
|:---|:---:|---:|
| infobox | блок | Карточка справа |
| spoiler | блок | Скрытый текст |
| [[home|Главная]] | ссылка | Вики-ссылка внутри ячейки |

Выравнивание задаётся двоеточиями в строке под заголовком: слева, по центру, справа.

## Ссылки

§§§md
[[home]]
[[home|Текст ссылки]]
[[elements#таблицы|Ссылка на раздел]]
[[несуществующая страница]]
[Внешняя ссылка](https://example.com)
[Со всплывающим текстом](https://example.com "Подсказка")
§§§

- Страница: [[home]]
- Со своим текстом: [[home|Текст ссылки]]
- На раздел: [[elements#таблицы|к таблицам]]
- Красная ссылка на несуществующую страницу: [[несуществующая страница]]
- Внешняя: [example.com](https://example.com)
- С подсказкой: [наведи курсор](https://example.com "Подсказка")

Ссылки с опасными схемами вроде §javascript:§ заменяются на §#§. Опция §ExternalLinksBlank: true§ открывает внешние ссылки в новой вкладке и ставит у них пометку.

## Изображения

§§§md
![Описание](https://placehold.co/400x120)
§§§

![Описание](https://placehold.co/400x120)

Клик по картинке открывает её на весь экран (опция §ImageZoom§), Esc или клик закрывают. Картинки грузятся лениво (опция §LazyImages§). Картинку с подписью лучше делать элементом §figure§.

## Блоки кода

Блок кода открывается и закрывается тремя обратными кавычками подряд, после открывающих можно указать язык. Внутри блока ничего не обрабатывается, даже §{{элементы}}§ и §[[ссылки]]§. У блока без языка есть кнопка «Копировать» (опция §PreCopy§).

§§§
Блок без языка.
Кнопка копирования в углу.
§§§

§§§js
const Wiki = new Woowiki({ Title: "Моя вики" });
Wiki.Start();
§§§

## Элементы

Блочный элемент пишется как §:::имя аргументы§, затем тело, затем строка §:::§. Однострочный: §{{имя аргументы}}§. Аргументы бывают именованные (§title="два слова"§) и позиционные.

### Карточка infobox

§§§md
:::infobox title="Название" image="https://placehold.co/280x140"
Ключ: значение
Другой ключ: [[home|ссылка]]
:::
§§§

Живой пример лежит в начале страницы. Каждая строка тела это пара §ключ: значение§.

### Врезки

§§§md
:::note title="Заметка"
Текст с **форматированием** и [[home|ссылкой]].
:::
§§§

:::note title="Заметка"
Текст с **форматированием** и [[home|ссылкой]].
:::

:::warn title="Предупреждение"
Будь осторожен.
:::

:::danger title="Опасность"
Так делать нельзя.
:::

:::tip title="Совет"
Заголовок можно не указывать.
:::

:::tip
Врезка без заголовка.
:::

Общая врезка §callout§ принимает тип аргументом:

§§§md
:::callout type=tip title="Свой тип"
Класс получится ww-callout-tip.
:::
§§§

:::callout type=tip title="Свой тип"
Класс получится ww-callout-tip.
:::

### Спойлер

§§§md
:::spoiler title="Нажми, чтобы раскрыть"
Скрытый **текст**.
:::
§§§

:::spoiler title="Нажми, чтобы раскрыть"
Скрытый **текст**.

- Внутри работает всё то же самое
- [[home|Ссылки]] тоже
:::

### Колонки

Колонки разделяются строкой §|||§. Чтобы внутри блока был другой блок, внешний пишется с большим числом двоеточий.

§§§md
::::columns
Первая колонка
|||
Вторая колонка
|||
:::note title="Третья"
Врезка внутри колонки.
:::
::::
§§§

::::columns
Первая колонка с **жирным** текстом.
|||
Вторая колонка со списком:

- раз
- два
|||
:::note title="Третья"
Врезка внутри колонки.
:::
::::

### Вложенность блоков

§§§md
::::spoiler title="Снаружи"
:::warn title="Внутри"
Вложенная врезка.
:::
::::
§§§

::::spoiler title="Снаружи"
:::warn title="Внутри"
Вложенная врезка.
:::
::::

### Содержание

§§§md
:::toc
:::
§§§

Живой пример лежит в начале страницы. Содержание собирается из заголовков уровней 2–4.

### Список страниц

§§§md
:::pagelist tag=демо
:::
§§§

:::pagelist tag=демо
:::

Без §tag§ выводятся все страницы.

### Вставка другой страницы

§§§md
:::include snippet
:::
§§§

:::include snippet
:::

Вставляется текст страницы, которая есть в §Pages§.

### Видео YouTube

§§§md
:::youtube jNQXAC9IVRw
:::
§§§

:::youtube jNQXAC9IVRw
:::

## Всплывающие окна

Наведи курсор на любую вики-ссылку, например [[home|Главная]] или [[snippet]]: рядом появится окно с названием, началом текста и тегами страницы. Красная ссылка [[несуществующая страница]] покажет, что страницы нет.

Обычная подсказка у markdown-ссылки тоже идёт через это окно, а не через нативную подсказку браузера: [наведи курсор](https://example.com "Подсказка в окне").

### Элемент popup

Однострочная форма. Текст ссылки позиционный, содержимое окна в §tip§:

§§§md
{{popup "наведи на меня" tip="Это **подсказка** со [[home|ссылкой]]"}}
§§§

Результат: {{popup "наведи на меня" tip="Это **подсказка** со [[home|ссылкой]]"}}. Окно остаётся, пока курсор над словом или над самим окном, поэтому ссылку внутри можно нажать и текст можно выделить.

Блочная форма. В теле любой markdown:

§§§md
:::popup text="Наведи сюда"
Любой **markdown**:
- списки
- [[home|ссылки]]
:::
§§§

:::popup text="Наведи сюда"
Любой **markdown**:

- списки
- [[home|ссылки]]
:::

## Копирование

Элемент §copy§ делает поле с кнопкой «Копировать». Строкой это обычное однострочное поле:

§§§md
{{copy "npm install woowiki" label="Команда"}}
§§§

{{copy "npm install woowiki" label="Команда"}}

Блоком это многострочное поле (до 12 строк), текст берётся из тела:

§§§md
:::copy label="Шаблон страницы"
home: {
	Title: "Главная",
	Content: "# Привет"
}
:::
§§§

:::copy label="Шаблон страницы"
home: {
	Title: "Главная",
	Content: "# Привет"
}
:::

Кнопка использует общий §Wiki.Clipboard§, его же берёт §mods/code.js§ для блоков кода. Из своего кода:

§§§js
Wiki.Clipboard.Copy("готовый текст", Button);
Wiki.Clipboard.Attach(Button, function(){ return Input.value; });
§§§

§Copy(Text, Button)§ копирует сразу, §Attach(Button, GetText)§ вешает обработчик клика и берёт текст в момент нажатия. Время надписи «Скопировано» задаёт §CopyFlashDelay§.

## Встраивание

### iframe: страница этой вики

§§§md
{{iframe page=snippet height=220}}
§§§

{{iframe page=snippet height=220}}

Вики открывается внутри рамки с параметром §?embed=1§: шапка, меню и подвал скрыты. Не вставляй в рамку ту страницу, на которой стоит сам элемент: получится бесконечная вложенность.

### iframe: другой сайт

§§§md
{{iframe src="https://example.com" height=260 title="Пример"}}
§§§

{{iframe src="https://example.com" height=260 title="Пример"}}

Параметры: §src§, §page§, §height§, §width§, §ratio§ (например §16:9§), §title§, §sandbox§, §allow§, §open§ (§false§ убирает ссылку «↗»). Многие сайты запрещают встраивание, тогда рамка будет пустой: используй ссылку «↗». Разрешённые хосты задаются опцией §IframeHosts§, пустой список разрешает любые.

### iframe: свой HTML

В теле лежит HTML, он показывается через §srcdoc§ с §sandbox="allow-scripts"§:

§§§md
:::iframe height=120
<body style="font-family: sans-serif">
	<h3>Привет из srcdoc</h3>
	<button onclick="this.textContent = 'Нажато'">Нажми</button>
</body>
:::
§§§

:::iframe height=120
<body style="font-family: sans-serif">
	<h3>Привет из srcdoc</h3>
	<button onclick="this.textContent = 'Нажато'">Нажми</button>
</body>
:::

### Видео и звук

§§§md
{{video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" width=420 muted=true}}
{{audio src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"}}
§§§

{{video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" width=420 muted=true}}

{{audio src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"}}

У §video§: §src§, §poster§, §autoplay§, §muted§, §loop§, §controls§, §width§. У §audio§: §src§, §loop§, §controls§, §width§.

### Vimeo

§§§md
{{vimeo 76979871 ratio=16:9}}
§§§

{{vimeo 76979871 ratio=16:9}}

### Карта

§§§md
{{map lat=55.7558 lon=37.6173 zoom=12 height=300 marker=true}}
§§§

{{map lat=55.7558 lon=37.6173 zoom=12 height=300 marker=true}}

Карта берётся с OpenStreetMap.

## Оформление

### Картинка с подписью

§§§md
:::figure src="https://placehold.co/320x140" caption="Подпись под картинкой" align=right width=320
:::
§§§

:::figure src="https://placehold.co/320x140" caption="Подпись под картинкой, картинка обтекается справа" align=right width=320
:::

Параметры §figure§: §src§, §caption§, §align§ (§left§, §right§, §center§), §width§, §alt§. Подпись может быть и телом блока, тогда в ней работает markdown. Текст обтекает картинку, пока его не остановит §{{clear}}§.

{{clear}}

### Галерея

Каждая строка это §ссылка | подпись§:

§§§md
:::gallery cols=3
https://placehold.co/300x200 | Первая
https://placehold.co/300x200/444/fff | Вторая
https://placehold.co/300x200/2563eb/fff | Третья
:::
§§§

:::gallery cols=3
https://placehold.co/300x200 | Первая
https://placehold.co/300x200/444/fff | Вторая
https://placehold.co/300x200/2563eb/fff | Третья
:::

Клик по снимку открывает его в окне просмотра.

### Кнопки

§§§md
{{button page=home text="На главную"}}
{{button href="https://example.com" text="Сайт" kind=ghost}}
§§§

{{button page=home text="На главную"}} {{button href="https://example.com" text="Сайт" kind=ghost}}

### Бейджи

§§§md
{{badge "новое" color=green icon=star}}
{{badge "v2" icon="🚀" iconright=arrow}}
{{badge "свой" color="rgb(139 92 246)"}}
§§§

{{badge "серый"}} {{badge "новое" color=green icon=star}} {{badge "важно" color=red icon=warn}} {{badge "закрыто" color=yellow icon=lock}} {{badge "v2" color=blue icon="🚀" iconright=arrow}} {{badge "свой" color="rgb(139 92 246)"}}

Иконка: имя из набора (§ok§, §warn§, §star§, §fire§, §lock§, §gear§ и другие), любой символ или эмодзи, либо адрес картинки. Справа иконка задаётся через §iconright§. Цвет бывает §gray§, §blue§, §green§, §red§, §yellow§, §purple§, §orange§ или любой CSS-цвет.

### Клавиши, мышь, геймпад

§§§md
{{kbd Ctrl+Shift+P}} {{kbd Ctrl+LMB}} {{kbd WheelUp}}
{{kbd pad:LB+pad:A}} {{kbd ps:Cross}}
§§§

Клавиши: {{kbd Ctrl+Shift+P}} {{kbd Cmd+K}} {{kbd Ctrl++}} {{kbd Up}}. Нажми на любую мышкой.

Мышь: {{kbd LMB}} {{kbd RMB}} {{kbd MMB}} {{kbd Wheel}} {{kbd WheelUp}} {{kbd WheelDown}} {{kbd Mouse4}} {{kbd Mouse5}} {{kbd Ctrl+LMB}}

Xbox: {{kbd pad:A}} {{kbd pad:B}} {{kbd pad:X}} {{kbd pad:Y}} {{kbd pad:LB}} {{kbd pad:RT}} {{kbd pad:LS}} {{kbd pad:Start}} {{kbd pad:Dpad}} {{kbd pad:Up}}

PlayStation: {{kbd ps:Cross}} {{kbd ps:Circle}} {{kbd ps:Square}} {{kbd ps:Triangle}} {{kbd ps:L1}} {{kbd ps:R2}} {{kbd ps:Options}} {{kbd ps:Touchpad}}

### Цвет

§§§md
{{color "rgba(255, 0, 0, 0.5)"}}
{{color "#ff000080" "полупрозрачный текст"}}
{{color "hsl(200 80% 50% / 40%)" "фон" bg=true}}
§§§

{{color "rgba(255, 0, 0, 0.5)"}} {{color transparent}} {{color "oklch(70% 0.2 150)"}} {{color "#8b5cf6"}}

{{color "#ff000080" "полупрозрачный текст"}} и {{color "hsl(200 80% 50% / 40%)" "полупрозрачный фон" bg=true}} и {{color orange "обычный цвет"}}

Подходит любой формат CSS. Значение с пробелами берётся в кавычки. Прозрачность видна на шахматной сетке.

### Хронология и ветки

§§§md
:::timeline
1.0.0 | Первая версия
1.3.0 | Окна и поиск
code | 1.4.0 | Ветка code
code | 1.5.0 | Палитры
main | 1.6.0 | Правки в основной ветке
popups from main | 1.7.0 | Ветка popups
code into main | 2.0.0 | Слияние code
popups | 2.0.1 | popups живёт дальше
:::
§§§

:::timeline
1.0.0 | Первая версия в одном файле
1.3.0 | Всплывающие окна и живой поиск
code | 1.4.0 | Ветка code: подсветка кода
code | 1.5.0 | Палитры и номера строк
main | 1.6.0 | Правки окон в основной ветке
popups from main | 1.7.0 | Ветка popups: окна со ссылками
code into main | 2.0.0 | Слияние code: база и стандарт разделены
popups | 2.0.1 | Ветка popups ещё жива
:::

Строка «дата | событие» идёт в §main§. Строка «ветка | дата | событие» пишет в ветку, новая ветка создаётся от ветки предыдущего события. §from§ задаёт родителя явно, §into§ сливает ветку в другую.

## Свой элемент на странице

§§§md
::::define alert
<div style="border-left:4px solid {Color|crimson}; padding:.4em 1em">
	<b>{Title|Внимание}</b>
	{Body}
</div>
::::

:::alert title="Осторожно" color=orange
Текст со [[home|ссылкой]] и **markdown**.
:::
§§§

::::define alert
<div style="border-left:4px solid {Color|crimson}; padding:.4em 1em; margin:.6em 0">
	<b>{Title|Внимание}</b>
	{Body}
</div>
::::

:::alert title="Осторожно" color=orange
Текст со [[home|ссылкой]] и **markdown**.
:::

Параметры: §{Имя}§, §{Имя|по умолчанию}§, §{1}§ (позиционный), §{Body}§ (тело как markdown). Чтобы элемент работал на всех страницах, положи определения на отдельную страницу и укажи её: §Templates: [ "templates" ]§.

### Индикатор

§§§md
{{progress 70 "Готовность"}}
{{progress value=3 max=5 label="Шаги"}}
§§§

{{progress 70 "Готовность"}}

{{progress value=3 max=5 label="Шаги"}}

### Цитата с автором

§§§md
:::quote author="Линус Торвальдс" source="Рассылка ядра"
Talk is cheap. Show me the code.
:::
§§§

:::quote author="Линус Торвальдс" source="Рассылка ядра"
Talk is cheap. Show me the code.
:::

### Шаги

Каждая строка это один шаг:

§§§md
:::steps
Подключить §woowiki.js§
Подключить §woowiki_standard.js§
Написать страницы в §Pages§
Вызвать §Wiki.Start()§
:::
§§§

:::steps
Подключить §woowiki.js§
Подключить §woowiki_standard.js§
Написать страницы в §Pages§
Вызвать §Wiki.Start()§
:::

### Карточки

Карточки разделяются строкой §|||§, первая строка карточки это заголовок:

§§§md
:::cards
Первая
Текст первой карточки
|||
Вторая
Текст со [[home|ссылкой]]
|||
Третья
**Жирный** текст
:::
§§§

:::cards
Первая
Текст первой карточки
|||
Вторая
Текст со [[home|ссылкой]]
|||
Третья
**Жирный** текст
:::

### Вкладки

Разделы начинаются со строки §@@ Заголовок§:

§§§md
:::tabs
@@ Первая
Текст первой вкладки.
@@ Вторая
Текст второй вкладки со [[home|ссылкой]].
:::
§§§

:::tabs
@@ Первая
Текст первой вкладки.
@@ Вторая
Текст второй вкладки со [[home|ссылкой]].
@@ Третья
- список
- в третьей
:::

### Аккордеон

§§§md
:::accordion exclusive=true open=true
@@ Раздел 1
Текст первого раздела.
@@ Раздел 2
Текст второго раздела.
:::
§§§

:::accordion exclusive=true open=true
@@ Раздел 1
Текст первого раздела.
@@ Раздел 2
Текст второго раздела.
@@ Раздел 3
Текст третьего раздела.
:::

§exclusive=true§ раскрывает только один раздел за раз (в старых браузерах разделы раскрываются независимо). §open=true§ раскрывает первый раздел сразу.

### Таблица из CSV

§§§md
:::csv header=true
Язык,Год,Автор
C,1972,Деннис Ритчи
Lua,1993,Роберту Иерузалимски
Python,1991,Гвидо ван Россум
:::
§§§

:::csv header=true
Язык,Год,Автор
C,1972,Деннис Ритчи
Lua,1993,Роберту Иерузалимски
Python,1991,Гвидо ван Россум
:::

Разделитель задаётся аргументом §sep§, например §sep=tab§ для данных, скопированных из таблицы.

### Диаграмма

Каждая строка это §метка: число§:

§§§md
:::chart unit=% max=100
C#: 80
JavaScript: 65
Lua: 30
:::
§§§

:::chart unit=% max=100
C#: 80
JavaScript: 65
Lua: 30
:::

### Чек-лист

§§§md
:::checklist
[x] Написать базу
[x] Написать стандарт
[ ] Написать туториал
:::
§§§

:::checklist
[x] Написать базу
[x] Написать стандарт
[ ] Написать туториал
:::

Список только показывает состояние: посетитель отметки менять не может.

### Выравнивание

§§§md
:::align right
Текст справа.
:::

:::center
Текст по центру.
:::
§§§

:::align right
Текст справа.
:::

:::center
Текст по центру.
:::

## Навигация

### Сюда ссылаются

§§§md
:::backlinks
:::
§§§

:::backlinks
:::

Такой же блок автоматически выводится внизу каждой страницы, если на неё кто-то ссылается.

### Облако тегов

§§§md
{{tagcloud}}
§§§

{{tagcloud}}

### Количество страниц

§§§md
Всего страниц: {{pagecount}}, с тегом «демо»: {{pagecount tag=демо}}.
§§§

Всего страниц: {{pagecount}}, с тегом «демо»: {{pagecount tag=демо}}.

### Случайная страница

§§§md
{{random "Случайная страница"}}
{{random "Случайная с тегом демо" tag=демо}}
§§§

{{random "Случайная страница"}} {{random "Случайная с тегом демо" tag=демо}}

## Код с подсветкой

Элемент §code§ из мода §mods/code.js§ принимает язык: §:::code cs§ или §:::code lang=cs§. Можно задать §title§, §lines=true§ (номера строк) и §start=10§ (с какого номера начинать). Строкой: {{code lang=cs "int X = 5;"}}. Номера строк в копию не попадают. Нумерацию всем блокам сразу включает опция §CodeLines: true§.

:::code lang=c title="main.c"
#include <stdio.h>

// Сумма массива
int Sum(int *Items, size_t Count){
	int Result = 0;
	for(size_t i = 0; i < Count; i++){
		Result += Items[i];
	}
	return Result;
}
:::

:::code lang=cpp title="main.cpp"
#include <vector>
#include <iostream>

template<typename T>
class Box final{
public:
	explicit Box(T Value) : Value(std::move(Value)) {}
	const T& Get() const noexcept { return Value; }
private:
	T Value;
};

int main(){
	std::vector<int> Items = { 1, 2, 3 };
	std::cout << "Count: " << Items.size() << std::endl;
	return 0;
}
:::

:::code lang=cs title="Player.cs" lines=true
namespace Game;

public class Player : Entity{
	public int Health { get; private set; } = 100;

	/// Наносит урон
	public bool Hit(int Damage){
		if(Damage <= 0){ return false; }
		Health -= Damage;
		Console.WriteLine($"Осталось: {Health}");
		return Health > 0;
	}
}
:::

:::code lang=cs title="Нумерация с десятой строки" lines=true start=10
int X = 5;
int Y = 7;
Console.WriteLine(X + Y);
:::

:::code lang=java title="Main.java"
package demo;

@FunctionalInterface
interface Shape{ double Area(); }

public class Main{
	public static void main(String[] Args){
		final int Count = 0x1F;
		String Text = "Привет";
		System.out.println(Text + Count);
	}
}
:::

:::code lang=javascript title="app.js"
class Counter{
	static Count = 0;
	static Next(){
		Counter.Count++;
		return Counter.Count;
	}
}

const Name = "woowz";
const Re   = /ab+c/gi;
console.log(§Привет, ¤{Name}! ¤{Counter.Next()}§, Re.test("abbc"));
:::

:::code lang=python title="main.py"
import math

@staticmethod
def area(radius: float) -> float:
	"""Площадь круга"""
	return math.pi * radius ** 2

for i in range(3):
	print(f"Круг {i}: {area(i):.2f}")  # вывод
:::

:::code lang=lua title="main.lua"
--[[ Таблица игрока ]]
local Player = { Name = "woowz", Health = 100 }

function Player:Hit(Damage)
	self.Health = self.Health - Damage
	return self.Health > 0
end

if not Player:Hit(25) then print("Мёртв") end
:::

:::code lang=html title="index.html"
<!DOCTYPE html>
<html>
<head>
	<style>
		.box{ color: #2563eb; margin: 0 auto; }
	</style>
</head>
<body class="page">
	<h1 id="top">Привет &amp; пока</h1>
	<script>
		const X = 5;
		console.log("X = " + X);
	</script>
</body>
</html>
:::

:::code lang=css title="style.css"
@media (max-width: 600px){
	.ww-body{ width: 100%; }
}

#wiki > a:hover, .link[data-x="1"]{
	--main: #8ab4f8;
	color: var(--main);
	margin: -2px 1.5em;
	transition: color .2s ease !important;
}
:::

Markdown внутри блока §code§ пишется с четырьмя двоеточиями снаружи, потому что внутри есть свой блок:

::::code lang=md title="page.md"
# Заголовок
Текст с **жирным**, *курсивом* и §кодом§. Ссылка: [[home|Главная]], [сайт](https://example.com).

- пункт {{dice sides=20}}

1. нумерованный

> цитата

:::note
Блок-элемент
:::
::::

Блок из тройных обратных кавычек с языком тоже получает подсветку и рамку:

§§§js
const X = 5;
§§§

Поддерживаются эти языки:

| Язык | Ключ | Алиасы |
|:---|:---|:---|
| C | §c§ | §h§ |
| C++ | §cpp§ | §c++§, §cc§, §cxx§, §hpp§, §hh§ |
| C# | §cs§ | §c#§, §csharp§ |
| Java | §java§ | |
| JavaScript | §javascript§ | §js§, §jsx§, §mjs§, §node§ |
| Python | §python§ | §py§, §python3§ |
| Lua | §lua§ | |
| Markdown | §markdown§ | §md§ |
| HTML | §html§ | §htm§, §xhtml§, §xml§, §svg§ |
| CSS | §css§ | |

Неизвестный язык показывается как обычный текст. Подсветка простая, без разбора грамматики, возможны неточности.

### Свой язык и своя палитра

§§§js
Wiki.Code.AddLanguage("go", {
	Name    : "Go",
	Keyword : "func var const type struct if else for range return package import",
	Rules   : [ WW_CODE_RULE_LINE_SLASH, WW_CODE_RULE_STRING_DOUBLE ]
}, [ "golang" ]);

Wiki.Code.Palettes.mytheme = { Keyword: "#ff0000" };
§§§

Недостающие цвета палитры берутся из светлой.

## Поиск

Начни печатать в поле вверху, например §вики§ или §фрагмент§: под полем сразу появится список лучших совпадений.

- Стрелки вверх и вниз выбирают пункт, §Enter§ открывает выбранную страницу.
- §Enter§ без выбора и кнопка «Найти» открывают полный поиск.
- §Esc§ закрывает список.
- Несколько слов работают как «И»: должны найтись все.
- Выше всего ставится точное название, затем начало названия, вхождение в название, в Id, тег и в текст.

Полный поиск можно открыть и ссылкой: [поиск по слову «элементы»](#/special:search/элементы). Число подсказок задаётся опцией §SuggestCount§.

Из кода:

§§§js
const Found = Wiki.Search("элементы", 10);
for(let i = 0; i < Found.length; i++){
	console.log(Found[i].Id, Found[i].Score);
}
§§§

## Служебные страницы

- [Все страницы](#/special:all)
- [Страницы с тегом «демо»](#/special:tag/демо)
- [Поиск по слову «фрагмент»](#/special:search/фрагмент)
- [Предпросмотр](#/special:preview) (мод §preview§)
- [Исходник этой страницы](#/special:preview/elements)

## Теги и обратные ссылки

Теги задаются в §Tags§ страницы и показываются под заголовком, а также в боковой панели. Внизу страницы автоматически выводится блок «Сюда ссылаются»: на эту страницу ссылается [[home|Главная]].

## Темы и настройки

Кнопка выбора темы стоит в шапке: есть §light§, §dark§ и §sepia§. Из кода:

§§§js
Wiki.SetTheme("dark");
Wiki.SetVars({ Width: "1800px", Radius: "4px" });

Wiki.AddTheme("night", {
	Bg: "#000000", Panel: "#0a0a0a", Fg: "#dddddd", Muted: "#888888",
	Link: "#66ccff", Missing: "#ff6666", Border: "#222222", Accent: "#66ccff", Code: "#111111"
});
§§§

Настройки стандарта задаются при создании вики:

| Опция | По умолчанию | Что делает |
|:---|:---|:---|
| §ThemeButton§ | §true§ | кнопка выбора темы |
| §Popups§ | §true§ | всплывающие окна |
| §PopupDelay§ | §250§ | задержка показа окна, мс |
| §PopupHideDelay§ | §300§ | задержка скрытия окна, мс |
| §SuggestCount§ | §6§ | число подсказок поиска |
| §PreCopy§ | §true§ | кнопка копирования на обычных блоках кода |
| §CopyFlashDelay§ | §1200§ | сколько мс кнопка показывает «Скопировано» |
| §ImageZoom§ | §true§ | клик по картинке открывает её на весь экран |
| §LazyImages§ | §true§ | ленивая загрузка картинок |
| §ExternalLinksBlank§ | §false§ | внешние ссылки в новой вкладке |
| §IframeHosts§ | §[]§ | белый список хостов для iframe, пусто значит любые |
| §IframeSandbox§ | §allow-scripts allow-same-origin allow-popups allow-forms§ | sandbox по умолчанию, §off§ отключает |
| §IframeHeight§ | §480§ | высота iframe по умолчанию, px |
| §EmbedParam§ | §embed§ | параметр, скрывающий шапку, меню и подвал |
| §CodeLines§ | §false§ | номера строк в блоках кода (мод §code§) |
| §CodeCopy§ | §true§ | кнопка копирования в блоках кода (мод §code§) |

## Откуда берутся страницы

Страницы задаются только в JS: либо прямо в §Pages§ при создании вики, либо из отдельного скрипта, который подключается через §<script>§ до §new Woowiki§. Файлы вроде §.md§ вики не читает.

§§§js
const GUIDE_PAGES = {
	guide: { Title: "Руководство", Tags: [ "демо" ], Content: "# Руководство" }
};

const Wiki = new Woowiki({ Pages: GUIDE_PAGES });
Wiki.AddPages({ other: { Title: "Другая", Content: "Текст" } });
§§§

## Свои элементы и моды

Свой элемент регистрируется в коде автора вики:

§§§js
Wiki.AddElement("hello", function(Props, Ctx){
	return §Привет, ¤{Ctx.Inline(Props.Name ?? "мир")}!§;
});
§§§

После этого §{{hello name=woowz}}§ на любой странице превратится в «Привет, woowz!». Элемент с §Mount§ оживляет разметку после вставки в DOM:

§§§js
Wiki.AddElement("clicker", {
	Html  : "<button>Нажато: 0</button>",
	Mount : function(Box, Props, Ctx){
		const Button = Box.querySelector("button");
		let Count = 0;

		Button.addEventListener("click", function(){
			Count++;
			Button.textContent = §Нажато: ¤{Count}§;
		});
	}
});
§§§

Элементы из подключённых модов, например {{dice sides=20}} из §mods/dice.js§, пишутся так же. Мод это функция, которая получает вики:

§§§js
Woowiki.AddMod("dice", function(Wiki){
	Wiki.AddElement("dice", function(Props){ return "🎲"; });
	Wiki.AddPanel({ Id: "random", Title: "Разное", Order: 90, Render: function(){ return "Панель"; } });
});
§§§

Заменить элемент стандарта можно, зарегистрировав своё имя после него: §Wiki.AddElement("note", ...)§. Удалить: §delete Wiki.Elements.youtube§.

### Свои окна из кода

§§§js
Wiki.Popups.Add(".ww-brand", function(Anchor, Wiki){
	return §Всего страниц: ¤{Wiki.SortedIds().length}§;
});

Wiki.Popups.Add(".ww-tag", function(Anchor, Wiki){
	return §<b>Тег</b><br>¤{Woowiki.Esc(Anchor.textContent)}§;
});
§§§

§Wiki.Popups.Add(Selector, Render)§ принимает CSS-селектор, а §Render(Anchor, Wiki)§ возвращает HTML-строку или DOM-элемент. Пустая строка или §null§ означают, что окна не будет. Правила проверяются с конца, поэтому твои перекрывают встроенные. Показать окно вручную: §Wiki.Popups.Show(Content, X, Y)§, скрыть: §Wiki.Popups.Hide()§. Отключить всё можно опцией §Popups: false§.

## События

| Событие | Когда |
|:---|:---|
| §Ready§ | после §Start()§ |
| §PageBefore§ | перед показом страницы |
| §PageAfter§ | после показа, в §Article§ готовый DOM |
| §MarkdownBefore§ | перед разбором markdown |
| §HtmlAfter§ | после получения HTML |
| §Render§ | после вставки разметки в DOM (подсветка кода и окна работают на нём) |
| §Theme§ | после смены темы |

§§§js
Wiki.On("PageAfter", function(Data){
	console.log(§Открыта страница ¤{Data.Id}§);
});
§§§

## HTML

По умолчанию HTML на страницах экранируется. Если страницы пишет только автор вики, включить его можно опцией §AllowHtml: true§.

## Справочник

Все элементы, которые есть в Woowiki. В базе их нет, каждый приходит из мода.

### Стандарт: std-elements

| Элемент | Вид | Аргументы | Что делает |
|:---|:---|:---|:---|
| §infobox§ | блок | §title§, §image§ | карточка справа, строки §ключ: значение§ |
| §callout§ | блок | §type§, §title§ | врезка своего типа |
| §note§ | блок | §title§ | врезка «Заметка» |
| §warn§ | блок | §title§ | врезка «Предупреждение» |
| §danger§ | блок | §title§ | врезка «Опасность» |
| §tip§ | блок | §title§ | врезка «Совет» |
| §spoiler§ | блок | §title§ | скрытый текст |
| §toc§ | блок | | содержание из заголовков 2–4 |
| §columns§ | блок | | колонки, разделитель строка из трёх вертикальных черт |
| §pagelist§ | блок | §tag§ | список страниц |
| §include§ | блок | Id страницы | вставка текста другой страницы |
| §youtube§ | блок | Id видео | видео YouTube |

### Стандарт: std-popups, std-copy, std-embed

| Элемент | Вид | Аргументы | Что делает |
|:---|:---|:---|:---|
| §popup§ | оба | текст, §text§, §tip§ | слово с окном при наведении |
| §copy§ | оба | текст, §label§ | поле с кнопкой «Копировать» |
| §iframe§ | оба | §src§, §page§, §height§, §width§, §ratio§, §title§, §sandbox§, §allow§, §open§ | рамка со страницей вики, чужим сайтом или своим HTML |
| §video§ | строка | §src§, §poster§, §autoplay§, §muted§, §loop§, §controls§, §width§ | видеофайл |
| §audio§ | строка | §src§, §loop§, §controls§, §width§ | звуковой файл |
| §vimeo§ | строка | Id видео, §ratio§ | видео Vimeo |
| §map§ | строка | §lat§, §lon§, §zoom§, §height§, §marker§ | карта OpenStreetMap |

### Стандарт: std-blocks

| Элемент | Вид | Аргументы | Что делает |
|:---|:---|:---|:---|
| §figure§ | блок | §src§, §caption§, §align§, §width§, §alt§ | картинка с подписью |
| §gallery§ | блок | §cols§ | сетка картинок, строки §url | подпись§ |
| §button§ | строка | §href§, §page§, §text§, §kind§ | кнопка-ссылка |
| §badge§ | строка | текст, §color§ | цветная метка |
| §kbd§ | строка | текст | клавиша |
| §mark§ | строка | текст | выделение маркером |
| §sup§ | строка | текст | верхний индекс |
| §sub§ | строка | текст | нижний индекс |
| §abbr§ | строка | текст, §tip§ | сокращение с расшифровкой в окне |
| §color§ | строка | цвет, текст | цветной текст |
| §progress§ | строка | число, подпись, §value§, §max§, §label§ | индикатор |
| §quote§ | блок | §author§, §source§ | цитата с автором |
| §steps§ | блок | | нумерованные шаги, строка это шаг |
| §cards§ | блок | | карточки, разделитель строка из трёх вертикальных черт |
| §timeline§ | блок | | хронология, строки §дата | событие§ |
| §tabs§ | блок | | вкладки, разделы §@@ Заголовок§ |
| §accordion§ | блок | §exclusive§, §open§ | раскрывающиеся разделы §@@ Заголовок§ |
| §csv§ | блок | §header§, §sep§ | таблица из CSV |
| §chart§ | блок | §unit§, §max§ | столбики, строки §метка: число§ |
| §checklist§ | блок | | список §[x]§ и §[ ]§ |
| §align§ | блок | §left§, §center§, §right§ | выравнивание |
| §center§ | блок | | выравнивание по центру |
| §clear§ | строка | | останавливает обтекание |

### Стандарт: std-nav

| Элемент | Вид | Аргументы | Что делает |
|:---|:---|:---|:---|
| §backlinks§ | блок | | страницы, которые ссылаются на эту |
| §tagcloud§ | строка | | облако тегов |
| §pagecount§ | строка | §tag§ | число страниц |
| §random§ | строка | текст, §tag§ | ссылка на случайную страницу |

### Моды

| Элемент | Мод | Вид | Аргументы | Что делает |
|:---|:---|:---|:---|:---|
| §code§ | §code.js§ | оба | язык, §lang§, §title§, §lines§, §start§ | блок кода с подсветкой |
| §dice§ | §dice.js§ | строка | §sides§ | бросок кубика |

### Служебные страницы

| Страница | Мод | Что делает |
|:---|:---|:---|
| §special:all§ | §std-specials§ | все страницы |
| §special:tag/тег§ | §std-specials§ | страницы с тегом |
| §special:search/запрос§ | §std-search§ | полный поиск |
| §special:preview§ | §preview.js§ | предпросмотр своей разметки |
| §special:preview/id§ | §preview.js§ | исходник страницы |

### Моды стандарта

| Мод | Что добавляет |
|:---|:---|
| §std-themes§ | темы §light§, §dark§, §sepia§ и кнопку выбора |
| §std-elements§ | основные блоки: infobox, врезки, spoiler, toc, columns, pagelist, include, youtube |
| §std-specials§ | §special:all§ и §special:tag§ |
| §std-panels§ | панели «Страницы» и «Теги» |
| §std-search§ | живой поиск и §special:search§ |
| §std-popups§ | всплывающие окна и элемент §popup§ |
| §std-copy§ | §Wiki.Clipboard§, элемент §copy§, кнопка на блоках кода |
| §std-embed§ | iframe, video, audio, vimeo, map и режим §?embed=1§ |
| §std-blocks§ | оформление: от §figure§ до §clear§ |
| §std-nav§ | backlinks, tagcloud, pagecount, random |
| §std-media§ | просмотр картинок, ленивая загрузка, пометка внешних ссылок |
`

const TEST_PAGES = {
	Demo: () => TEST_PAGES_DEMO.replace(/§/g, () => "`").replace(/¤/g, () => "$")
}