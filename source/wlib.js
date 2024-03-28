var infos = [
	["welcome",
	`
	<br>
	<center><font style="font-family:'OCR A Std', monospace; font-size: xxx-large;">Добро пожаловать на страницу WLIB!</font></center>
	<center>сделано - woowz11</center>
	<center>лицензия - <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru">BY-NC-ND 4.0</a></center>
	<br>
	<br>
	<div style="margin-top:10px; font-size: large; margin-left: 100px;">
	● <a onclick="openlink('whatiswlib');">Что такое WLIB?</a><br>
	● <a onclick="openlink('whycreate');">Зачем существует WLIB?</a><br>
	● <a onclick="openlink('#');">Недавнее обновление</a><br>
	● <a onclick="openlink('#');">Задумки на будущее</a><br>
	</div><br>
	<br>
	<font style="font-size: x-large; margin-left: 100px;">Ссылки</font>
	<div style="margin-top:10px; font-size: large; margin-left: 100px;">
	● <a href="#">Github - Страница проекта на Github</a><br>
	● <a href="#">SteamWorkshop - Страница проекта в Workshop</a><br>
	</div><br>
	<font style="font-size: x-large; margin-left: 100px;">Официальные модификации</font>
	<div style="margin-top:10px; font-size: large; margin-left: 100px;">
	● <a href="#">WLIB Example - Модификация показывающая функции WLIB</a><br>
	</div><br>
	<font style="font-size: x-large; margin-left: 100px;">Контакты</font>
	<div style="margin-top:10px; font-size: large; margin-left: 100px;">
	● <font>Discord - #woowz11</font><br>
	● <font>Github - <a href="https://github.com/Woowz11">Woowz11</a></font><br>
	</div><br>
	`
	],
	["whatiswlib",`
	<br>
	<center><font style="font-family:'OCR A Std', monospace; font-size: xxx-large;">Что такое WLIB?</font></center>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">WLIB (Woowz Libary) - Библиотека созданная для People Playground, что-бы облегчить создание модификаций и добавить возможность их объеденять. Но использует в качестве кода своеобразный LUA и иерархию файлов.</font></div>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">Библиотека создана Woowz11 (02.2024) под лицензией <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru">BY-NC-ND 4.0</a></font></div>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">Изменению внутренних файлов не поднадлежит, если есть какие-то вопросы или идеи или отчёт об ошибке пишите в специальные места или лично автору.</font></div>
	`],
	["whycreate",`
	<br>
	<center><font style="font-family:'OCR A Std', monospace; font-size: xxx-large;">Зачем существует WLIB?</font></center>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">WLIB был создан для упрощения работы над модами, первоначально я не хотел делать собственную иерархию и т.д, но мои навыки программирования и запутанность кода не позволяли, я пытался и с помощью .dll файлов делать, и через import, но не вышло соеденить библиотеку с модом, по этому пришлось сделать модификацию которая загружает файлы из других модификаций в себя и загружает их, тем самым ещё позволяя соеденять модификации и считывать другие модификации. Система айди модификаций примерно такая же как в Minecraft Forge, сначала айди модификации, потом название объекта "mod:test".</font></div>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">Так же эта библиотека поможешь решить проблему с частыми обновлениями People Playground, из-за которых часто ломаются модификации, ваша модификация сделанная на WLIB не будет ломаться из-за обновлений игры. (если конечно я буду обновлять WLIB)</font></div>
	<br>
	<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">И ещё скоро я собираюсь переносить свои старые моды на библиотеку WLIB, возможно даже с какими-то дополнениями.</font></div>
	`],
	["math",`<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">
	Статичный компонент Math<br>
	<br>
	Math.PI (float) - Возвращает число π (3.1415926535897931)<br>
	Math.E (float) - Возвращает основание натурального логарифма (2.7182818284590451)<br>
	</font></div>`],
	["game",`<div style="margin-left:25px; margin-right:25px;"><font style="font-size: large;">
	Статичный компонент Game<br>
	<br>
	Game.Version (string) - Возвращает версию People Playground<br>
	Game.ID (string) - Возвращает айди People Playground в Steam<br>
	Game.Path (string) - Возвращает позицию игры<br>
	Game.PathData (string) - Возвращает позицию папки "People Playground_Data"<br>
	Game.PathSteam (string) - Возвращает позицию Steam на котором сейчас запущен People Playground<br>
	Game.PathMods (string) - Возвращает позицию папки "Mods"<br>
	Game.PathSteamMods (string) - Возвращает позицию расположения модов в Steam<br>
	</font></div>`],
]