const D_Status = {
    // Проект в очень активной разработке
    VeryActive: "status_veryactive",
    // Проект в разработке
    Active: "status_active",
    // Проект завершён
    Completed: "status_completed",
    // Проект обновляется
    Updatable: "status_updatable",
    // Проект редко обновляется
    RareUpdatable: "status_rareupdatable",
    // Проект заброшен
    Abandoned: "status_abandoned",
    // Проект заморожен (на долго)
    Frozen: "status_frozen",
    // Проект заморожен
    Paused: "status_paused",
    // Проект убит, и не будет восстановлен
    Killed: "status_killed",
    // Пока-что не известно
    Unknown: "status_unknown"
}

const D_Core = {
    Minecraft: "core_minecraft",
    Forge: "core_forge",
    GarrysMod: "core_gmod",
    Roblox: "core_roblox",
    Browser: "core_browser",
    GitHub: "core_github",
    Vercel: "core_vercel"
}

const D_Lang = {
    CS: "lang_cs",
    Java: "lang_java",
    JavaScript: "lang_js",
    Lua: "lang_lua",
    Luau: "lang_luau",
    GLua: "lang_glua",
    CPP: "lang_cpp",
    HTML: "lang_html",
    CSS: "lang_css",
    Markdown: "lang_md"
}

const D_Type = {
    // Этот проект библиотека
    Library: "type_lib",
    // Этот проект файл
    File: "type_file",
    // Этот проект искусство
    Art: "type_art",
    // Этот проект показывает, отображает, рендерит
    Visualizer: "type_visualizer"
}

// Что использовалось
const D_Lib = {
    
}

const D_Tag = {
    // Проект шуточный
    Joke: "tag_joke",
    // Проект мусорный
    Garbage: "tag_garbage",
    // Проект простой
    Easy: "tag_easy"
}

const D_User = {
    Woowz11: "user_woowz11",
    Ivanka: "user_ivanka"
}

// ----------------------------------------------------------------------

const Data_Projects = {};

// ----------------------------------------------------------------------

class Project{
    /** @type {string} */
    __ID = null;
    __Name = null;
    __Status = D_Status.Unknown;
    __Core = [];
    __Language = [];
    __Type = [];
    __Tag = [];
    __URL = [];
    __Created = null;
    __Updated = null;
    __Icon = null;
    __Preview = [];
    __Lib = [];
    __Author = [D_User.Woowz11];
    /** @type {string} */
    __Content = null;
    
    __QCode = null;
    __QVisual = null;
    __QAttitude = null;
    __QAI = null;
    __QAesthetics = null;
    __QSeriousness = null;
    
    constructor(ID, Name){
        this.__ID   = ID;
        this.__Name = Name;
        
        this.__Content = `<wd-profile-project id="${ID}"></wd-profile-project>`;
    }
    
    Save(TargetTable){
        TargetTable[this.__ID] = this;
        return this;
    }
    
    ID(){ return this.__ID; }

    // ----------------------------------------------------------------------
    
    // Качество кода по моему мнению (0-100)
    QualityCode(Q){
        this.__QCode = Q;
        return this;
    }

    // Качество визуала по моему мнению (0-100)
    QualityVisual(Q){
        this.__QVisual = Q;
        return this;
    }

    // Моё отношение к проекту (0-100)
    QualityAttitude(Q){
        this.__QAttitude = Q;
        return this;
    }

    // Насколько я считаю что это заслуга ИИ (0-100)
    QualityAI(Q){
        this.__QAI = Q;
        return this;
    }

    // Сила эстетики (0-100)
    QualityAesthetics(Q){
        this.__QAesthetics = Q;
        return this;
    }

    // Насколько серьёзно я отношусь к проекту (0-100)
    QualitySeriousness(Q){
        this.__QSeriousness = Q;
        return this;
    }

    Status(Status){
        this.__Status = Status;
        return this;
    }

    Created(Created){
        this.__Created = Created;
        return this;
    }

    Updated(Updated){
        this.__Updated = Updated;
        return this;
    }

    Icon(Icon){
        this.__Icon = Icon;
        return this;
    }

    Preview(...Previews){
        this.__Preview.push(...Previews);
        return this;
    }

    Lib(...Libs){
        this.__Lib.push(...Libs);
        return this;
    }
    
    Core(...Cores){
        this.__Core.push(...Cores);
        return this;
    }

    Language(...Languages){
        this.__Language.push(...Languages);
        return this;
    }

    Type(...Types){
        this.__Type.push(...Types);
        return this;
    }

    Tag(...Tags){
        this.__Tag.push(...Tags);
        return this;
    }

    URL(...URLs){
        this.__URL.push(...URLs);
        return this;
    }

    AddAuthor(...Authors){
        this.__Author.push(...Authors);
        return this;
    }
    
    AddContent(Content){
        this.__Content += Content;
        return this;
    }
}

const AddProject = (ID, Name) => new Project(ID, Name).Save(Data_Projects);

// ----------------------------------------------------------------------

const Project_Woowzsite = AddProject("woowzsite", "Woowzsite")
    .Status(D_Status.Updatable)
    .Core(D_Core.Browser, D_Core.GitHub)
    .Language(D_Lang.HTML, D_Lang.CSS, D_Lang.JavaScript)
    .Tag(D_Tag.Joke, D_Tag.Garbage)
    .URL("https://github.com/Woowz11/woowzsite")
    .QualitySeriousness(20)
    .Icon("https://woowz11.github.io/woowzsite/source/search2.ico")
    .AddContent(`
Проект включает в себе сборник моих сайтов, самые первые сайты в своей жизни я делал в нём.

Большая часть проектов которые связаны с сайтами, находятся именно здесь.

Самая старая их сохранённых версий моего первого сайта.

<wd-site height="550px"><!DOCTYPE HTML>
<meta charset="utf-8">
<title>Woowz Main Page!</title>
<style>
body {
  background-image: url("source/site/brick.jpg");
}
font {
  background-image: url("source/ice.jpg");
}
.search{
  background-color: #D88F90;
  cursor: pointer;
}
</style>
<center><img src="source/title.png" width="480" height="256"></center>
<center><img src="source/title_smol.png" width="256" height="35"></center>
<center><font size="5">⬇ Поиск вувза ⬇</font></center>
<p></p>
<center><input type="text" placeholder="ВВЕДИТЕ ЧТО-ТО!!!!!!" size="100" id="search"><button class="search" type="button" id="button_search" onclick="serch()" >SEARCH!</button></center>
\t
<p></p>
<center><font color="blue" id="checkthis">    
    &copy; Maked Woowz11 (1997)
</font></center></wd-site>`
    )
    .ID();

const Project_WoowzDoc = AddProject("woowzdoc", "WoowzDoc")
    .Status(D_Status.Active)
    .Core(D_Core.Browser, Project_Woowzsite)
    .Language(D_Lang.JavaScript, D_Lang.HTML, D_Lang.CSS)
    .Type(D_Type.Library)
    .URL("https://github.com/Woowz11/woowzsite/tree/main/WoowzDoc")
    .QualitySeriousness(70)
    .Tag(D_Tag.Easy)
    .QualityAI(20)
    .ID();

const Project_ProfileRender = AddProject("profilerender", "ProfileRender")
    .URL("https://github.com/Woowz11/ProfileRender")
    .AddAuthor(D_User.Ivanka)
    .Core(D_Core.Vercel)
    .QualityAI(30)
    .Type(D_Type.Visualizer)
    .Status(D_Status.Paused)
    .AddContent(`
Проект, который добавляет новые элементы для рендера в интернете, к примеру для Markdown.

Используется чаще всего в GitHub Markdown README.

Или можно использовать прямо на сайтах, вот примеры:

<img src="https://profile-render-fawn.vercel.app/?type=icons&icons={rider,minecraft,obs,forge,winxp}" />
<img src="https://profile-render-fawn.vercel.app/?type=js&code=UmVzdWx0ID0gYDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDUwMCAxMjAiPg0KICA8ZGVmcz4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImNvb2xHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+DQogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBkMmZmOyI+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InN0b3AtY29sb3IiIHZhbHVlcz0iIzAwZDJmZjsjOTI4ZGFiOyNlZTA5Nzk7IzAwZDJmZiIgZHVyPSI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgICA8L3N0b3A+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlZTA5Nzk7Ij4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3RvcC1jb2xvciIgdmFsdWVzPSIjZWUwOTc5OyMwMGQyZmY7IzkyOGRhYjsjZWUwOTc5IiBkdXI9IjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4NCiAgICAgIDwvc3RvcD4NCiAgICA8L2xpbmVhckdyYWRpZW50Pg0KICA8L2RlZnM+DQoNCiAgPGc+DQogICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCA1OyAwIC01OyAwIDUiIGR1cj0iM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIwLjMiPg0KICAgICAgUHJvZmlsZSBSZW5kZXINCiAgICA8L3RleHQ+DQogICAgDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSIjNDQ0Ij4NCiAgICAgIFByb2ZpbGUgUmVuZGVyDQogICAgPC90ZXh0Pg0KDQogICAgPHRleHQgeD0iNTAlIiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjUwIiBmaWxsPSJ1cmwoI2Nvb2xHcmFkKSI+DQogICAgICBQcm9maWxlIFJlbmRlcg0KICAgIDwvdGV4dD4NCiAgPC9nPg0KPC9zdmc+YA==" />

Вот иконки которые я нарисовал вместе с "IVANKO", через Inkscape

<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=0 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=3 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=4 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=5 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=6 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=7 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=8 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=9 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=10" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=11" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=12" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=13" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=14" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=15" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=16" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=17" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=18" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=19" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=20" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=21" />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=2 " />
<img src="https://profile-render-fawn.vercel.app/?type=debug&debug=icons&cat=1 " />
`
    )
    .ID();

const Project_GitHubReadme = AddProject("githubreadme", "My GitHub README.md")
    .Status(D_Status.Updatable)
    .Core(D_Core.GitHub)
    .Type(D_Type.File, D_Type.Art)
    .Tag(D_Tag.Joke, D_Tag.Garbage, D_Tag.Easy)
    .URL("https://github.com/Woowz11/Woowz11")
    .QualitySeriousness(20)
    .Lib(Project_ProfileRender)
    .Language(D_Lang.Markdown)
    .ID();