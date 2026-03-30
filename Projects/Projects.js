WoowzProjects = [];

function Add({
	/* ID проекта */
	ID,
	/* Название проекта */
	Name,
	/* Что он использует? Основа? Ядро? Игра? */
	Uses = [],
	/* Какие языки он использует? */
	Languages = [],
	/* Ссылки */
	Links = [],
	/* Репозиторий */
	Repo,
	/* Доп. разработчики */
	ExtraAuthors = [],
	/* Описание (в Markdown формате) */
	Description = "",
	/* Чем именно является */
	Type,
	/* Статус проекта */
	Status,
	/* Дата создания */
	CreationDate,
	/* Моя оценка проекту (0-100), крутость проекта */
	Rate_Cool,
	/* Моя оценка проекту (0-100), качество проекта */
	Rate_Quality,
	/* Моя оценка проекту (0-100), визуал проекта */
	Rate_Visual,
	/* Потеряный? Есть доступ? */
	Lost = false,
	/* Комментарий от разработчика */
	AuthorComment,
	/* Можно использовать как библиотеку? */
	Library = false,
	/* Частота кода в проекте */
	CodeFrequency
} = {}){
	
	try{
		if(!ID          ){ throw new Error("У проекта не указан ID!"); }
		if(!Name        ){ throw new Error("У проекта не указано имя!"); }
		if(!Type        ){ throw new Error("У проекта не указан тип!"); }
		if(!Status      ){ throw new Error("У проекта не указан статус!"); }
		if(!CreationDate){ throw new Error("У проекта не указана дата создания!"); }
		
		if(!Rate_Cool   ){ Rate_Cool    = Rate_Unselected; }
		if(!Rate_Quality){ Rate_Quality = Rate_Unselected; }
		if(!Rate_Visual ){ Rate_Visual  = Rate_Unselected; }
		
		if(!CodeFrequency){ CodeFrequency = Code_More; }
		
		WoowzProjects.push({
			ID,
			Name,
			Uses,
			Languages,
			Links,
			Repo,
			ExtraAuthors,
			Description,
			Type,
			Status,
			CreationDate,
			Rate_Cool,
			Rate_Quality,
			Rate_Visual,
			Lost,
			AuthorComment,
			Library,
			CodeFrequency
		});
	}catch(e){
		console.error(e);
	}
}

// ----------------------------------------------------------------------

// Rate ещё не определён
Rate_Unselected = -1;

// USES, ID
	Project_Woowzsite = "woowzsite";
	Project_Woowzwiki = "woowzwiki";
	Project_Woowzconstruction = "woowzconstruction";
	Project_WoowzLibJava = "woowzlib_java";
	Project_WoowzLib = "woowzlib";
	Project_WoowzCore = "woowzcore";
	Project_WoowzTile = "woowztile";
	Project_WRF       = "wrf";

	OProject_GithubPages = "github_pages";
	OProject_Unity  = "unity";
	OProject_LWJGL  = "lwjgl";
	OProject_Bullet = "bullet";
	OProject_Vulkan = "vulkan";
	OProject_WinAPI = "winapi";
	OProject_GLFW   = "glfw";
	OProject_OpenGL = "opengl";
	OProject_Rojo   = "rojo";

	Game_Minecraft = "minecraft";
	Game_GarrysMod = "garrys_mod";
	Game_Isaac     = "the_binding_of_isaac";
	Game_Roblox    = "roblox";

// STATUS

	// В разработке
	Status_Active = "active";
	// Заброшен
	Status_Dead = "dead";
	// Обновляется редко
	Status_Rarely = "rarely";
	// Заморожен, ждёт действий
	Status_Frozen = "frozen";
	// На грани к заброшен, возможно вернусь в будущем
	Status_Maybe = "maybe";

// TYPE

	Type_Files = "files";
	Type_Website = "website";
	Type_Modification = "mod";
	Type_Program = "program";
	Type_Game = "game";
	Type_Place = "place";

// LANGUAGES

	Lang_JS   = "javascript";
	Lang_Lua  = "lua";
	Lang_GLua = "glua";
	Lang_CS   = "cs";
	Lang_Java = "java";
	Lang_Luau = "luau";

// CODEFREQUENCY

	Code_More = 0;
	Code_Rare = 1;
	Code_None = 2;

// ----------------------------------------------------------------------

Add({
	ID: "sector_0x11",
	Name: "Sector 0x11",
	Uses: [Game_Roblox, OProject_Rojo],
	Type: Type_Place,
	Status: Status_Dead,
	CreationDate: "2026.02.24",
	Links: ["https://www.roblox.com/games/111522311131595/Sector-0x11"],
	Description: "Является продолжением проекта {" + Project_WRF + "}",
	Repo: "https://github.com/Woowz11/Sector-0x11",
	Languages: [Lang_Luau]
});

Add({
	ID: "goluworld",
	Name: "GOLUWorld",
	Uses: [Project_WoowzTile],
	Languages: [Lang_CS],
	Type: Type_Game,
	Status: Status_Frozen,
	CreationDate: "2026.01.11"
});

Add({
	ID: Project_WoowzTile,
	Name: "WoowzTile",
	Uses: [Project_WoowzLib],
	AuthorComment: "использует старую версию {" + Project_WoowzLib + ":9a3682884f5b99bfa5c9b9344fc4b05ad3c40856}",
	Languages: [Lang_CS],
	Library: true,
	Type: Type_Program,
	Status: Status_Dead,
	CreationDate: "2026.01.11",
	Repo: "https://github.com/Woowz11/WoowzTile"
});

Add({
	ID: Project_WoowzLibJava,
	Name: "WoowzLib",
	Repo: "https://github.com/Woowz11/WoowzLib-old",
	Languages: [Lang_Java],
	Library: true,
	Type: Type_Files,
	Uses: [OProject_GLFW, OProject_OpenGL],
	Status: Status_Dead,
	CreationDate: "2025.10.09",
	AuthorComment: "старая версия {" + Project_WoowzLib + "}"
});

Add({
	ID: "golusand",
	Name: "GOLUSand",
	Repo: "https://github.com/Woowz11/GOLUSand",
	Type: Type_Game,
	Status: Status_Dead,
	Uses: [Project_WoowzLibJava],
	Languages: [Lang_Java],
	CreationDate: "2025.10.22"
});

Add({
	ID: "goluisaacpavelbasement",
	Name: "GOLUISAACPAVELBASEMENT",
	Repo: "https://github.com/Woowz11/GOLUISAACPAVELBASEMENT",
	Type: Type_Modification,
	Status: Status_Maybe,
	Uses: [Game_Isaac],
	Links: ["https://steamcommunity.com/sharedfiles/filedetails/?id=3663613926"],
	CreationDate: "2025.12.12",
	Description: "Текстур пак для The Binding of Isaac, в стиле литуизма",
	CodeFrequency: Code_None,
	Rate_Cool: 40,
	Rate_Quality: 40,
	Rate_Visual: 60,
});

Add({
	ID: Project_WoowzLib,
	Name: "WoowzLib",
	Library: true,
	Type: Type_Files,
	Status: Status_Active,
	Uses: [OProject_WinAPI, OProject_Vulkan],
	Repo: "https://github.com/Woowz11/WoowzLib",
	CreationDate: "2025.12.29",
	Languages: [Lang_CS],
	Description: "Модульная библиотека на C#, будет использоваться для моих будущих проектов"
});

Add({
	ID: "woowzcore_java",
	Name: "Woowzcore",
	Type: Type_Game,
	Status: Status_Dead,
	Uses: [OProject_LWJGL, OProject_Bullet, OProject_GLFW, OProject_OpenGL],
	Repo: "https://github.com/Woowz11/Woowzcore-very-very-old",
	CreationDate: "2025.03.19",
	Languages: [Lang_Java],
	Description: "Делал свой движок на Java, пытаясь создать {" + Project_WoowzCore + "}",
	AuthorComment: "мой первый движок на Java, до этого делал на C++",
	Rate_Cool: 60,
	Rate_Quality: 50,
	Rate_Visual: 60,
});

Add({
	ID: "woowzcore_2",
	Name: "Woowzcore 2",
	Type: Type_Game,
	Status: Status_Dead,
	Uses: [OProject_Unity],
	Repo: "https://github.com/Woowz11/Woowzcore-2",
	CreationDate: "2024.09.27",
	Links: ["https://github.com/Woowz11/Woowzcore-2/raw/refs/heads/main/Game.zip"],
	Languages: [Lang_CS],
	Description: "Игра не доделанная, она относится к идее {" + Project_WoowzCore + "}",
	AuthorComment: "в игре есть только ходьба, пару измерений, да и всё по сути",
	Rate_Cool: 40,
	Rate_Quality: 30,
	Rate_Visual: 80,
});

Add({
	ID: Project_Woowzconstruction,
	Name: "WoowzsiteConstruction",
	Type: Type_Files,
	Status: Status_Dead,
	Uses: [Project_Woowzsite],
	Links: ["https://github.com/Woowz11/woowzsite/blob/main/woowzsiteconstruction/base.js"],
	CreationDate: "2024.07.27",
	Languages: [Lang_JS],
	Library: true,
	Description: "Библиотека для создания сайтов",
	AuthorComment: "хз зачем нужна",
	Rate_Cool: 20,
	Rate_Quality: 20,
	Rate_Visual: 10,
});

Add({
	ID: Project_Woowzwiki,
	Name: "Woowzwiki",
	Type: Type_Website,
	Status: Status_Dead,
	Uses: [Project_Woowzconstruction],
	Links: ["https://woowz11.github.io/woowzsite/woowzwiki-examples/wiki_pages.html", "https://github.com/Woowz11/woowzsite/blob/main/woowzwiki/base.js"],
	Library: true,
	Languages: [Lang_JS],
	CreationDate: "2024.09.04",
	Description: "Библиотека для создания собственного сайта википедию",
	AuthorComment: "Нужно полностью переделывать, если мне и понадобиться википедия своя, я полностью буду новую писать, эта уже устаревшая и маленькая",
	Rate_Cool: 30,
	Rate_Quality: 20,
	Rate_Visual: 50,
});

Add({
	ID: "woowzmelee",
	Name: "Woowz Melee",
	Uses: [Game_GarrysMod, Project_Woowzwiki],
	Type: Type_Modification,
	Status: Status_Dead,
	Links: ["https://steamcommunity.com/workshop/filedetails/?id=3297762978", "https://steamcommunity.com/sharedfiles/filedetails/?edit=true&id=3298838904", "https://woowz11.github.io/woowzsite/woowzmelee_wiki.html"],
	Repo: "https://github.com/Woowz11/woowz-melee",
	Description: "Мод добавляющий оружие ближнего боя (библиотека)",
	Languages: [Lang_GLua],
	CreationDate: "2024.08.03",
	Rate_Cool: 60,
	Rate_Quality: 10,
	Rate_Visual: 60,
	AuthorComment: "Говнокод полный просто ужас, если и возвращаться к этому проекту, то его надо полностью с нуля переписывать, я там такой жути наделал накодил...",
	Library: true
});

Add({
	ID: "bloodraw",
	Name: "BloodRaw",
	Uses: [Game_Minecraft, Project_Woowzsite],
	Type: Type_Modification,
	Status: Status_Rarely,
	Links: ["https://woowz11.github.io/woowzsite/BloodRaw/Generator"],
	Repo: "https://github.com/Woowz11/BloodRaw-Minecraft",
	Description: "Генерируемый ресурс/текстур пак для Minecraft, генерируется через сайт, для любой версии",
	Languages: [Lang_JS],
	CreationDate: "2023.07.14",
	Rate_Cool: 50,
	Rate_Quality: 30,
	Rate_Visual: 70,
	CodeFrequency: Code_Rare
});

Add({
	ID  : "portfolio",
	Name: "Woowz11 Портфолио",
	Uses: [Project_Woowzsite],
	Languages: [Lang_JS],
	Links: ["https://woowz11.github.io/woowzsite/Portfolio"],
	Description: "Сайт который содержит в себе портфолио Woowz11, описания его проектов",
	Type: Type_Website,
	Status: Status_Active,
	CreationDate: "2026.03.30"
});

Add({
	ID  : Project_Woowzsite,
	Name: "Woowzsite",
	Uses: [OProject_GithubPages],
	Languages: [Lang_JS],
	Links: ["https://woowz11.github.io/woowzsite/quare"],
	Repo: "https://github.com/Woowz11/woowzsite",
	Description: "Коллекция сайтов, созданная по приколу, содержит в себе разные другие сайты",
	Type: Type_Website,
	Status: Status_Rarely,
	CreationDate: "2023.05.10",
	Rate_Cool: 70,
	Rate_Quality: 10,
	Rate_Visual: 45
});