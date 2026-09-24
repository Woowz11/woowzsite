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
    Visualizer: "type_visualizer",
    // Этот проект является информацией
    Info: "type_info"
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
    .Created("2023.05.10")
    .AddContent(`
Проект включает в себе сборник моих сайтов, самые первые сайты в своей жизни я делал в нём.

Большая часть проектов которые связаны с сайтами, находятся именно здесь.

Сайтами я начал интересоваться когда в школе заставили сделать сайт, я знал что это легко, просто думал что нудное и скучное, я быстро разобрался как делать сайты, и начал развлекаться, помню в то время первыми сайтами я хвастался перед "PAVEL", в итоге мне надо было учить Python что-бы сдать ЕГЭ, вместо этого я делал сайты, из-за чего плохо подготовился.

Самая старая их сохранённых версий моего первого сайта.

<wd-winwindow padding="0" icon="https://github.com/Woowz11/woowzsite/raw/refs/heads/main/Portfolio/source/firefox.ico" name="Woowz Main Page! - Mozilla"><wd-firefox name="Woowz Main Page!" url="file:///W:/Other/woowzsite/site_woowz11.html"><wd-frame height="650px">
<!DOCTYPE HTML>
<meta charset="utf-8">
<title>Woowz Main Page!</title>
<style>
body {
  background-image: url("https://github.com/Woowz11/woowzsite/blob/main/Portfolio/source/site/brick.jpg?raw=true");
}
font {
  background-image: url("https://github.com/Woowz11/woowzsite/blob/main/Portfolio/source/site/ice.jpg?raw=true");
}
.search{
  background-color: #D88F90;
  cursor: pointer;
}
</style>
<center><img src="https://github.com/Woowz11/woowzsite/blob/main/Portfolio/source/site/title.png?raw=true" width="480" height="256"></center>
<center><img src="https://github.com/Woowz11/woowzsite/blob/main/Portfolio/source/site/title_smol.png?raw=true" width="256" height="35"></center>
<center><font size="5">⬇ Поиск вувза ⬇</font></center>
<p></p>
<center><input type="text" placeholder="ВВЕДИТЕ ЧТО-ТО!!!!!!" size="100" id="search"><button class="search" type="button" id="button_search">SEARCH!</button></center>
\t
<p></p>
<center><font color="blue" id="checkthis">    
    &copy; Maked Woowz11 (1997)
</font></center>
</wd-frame></wd-firefox></wd-winwindow>

Вот этот же сайт сегодня:

<wd-winwindow padding="0" icon="https://github.com/Woowz11/woowzsite/raw/refs/heads/main/Portfolio/source/firefox.ico" name="Сайт Woowz11! - Mozilla"><wd-firefox name="Сайт Woowz11!" icon="https://woowz11.github.io/woowzsite/source/search.ico" url="https://woowz11.github.io/woowzsite/site_woowz11.html"><wd-frame height="650px" url="https://woowz11.github.io/woowzsite/site_woowz11.html"></wd-frame></wd-firefox></wd-winwindow>

Сайт, показывающий ресурсы Woowzsite. (если написано "с приколом!", лучше всего перезагрузить сайт...)

<wd-winwindow padding="0" icon="https://github.com/Woowz11/woowzsite/raw/refs/heads/main/Portfolio/source/firefox.ico" name="Woowzsites Files - Mozilla"><wd-firefox name="Woowzsites Files" icon="https://woowz11.github.io/woowzsite/source/folder.ico" url="https://woowz11.github.io/woowzsite/woowzsite_files"><wd-frame height="650px" url="https://woowz11.github.io/woowzsite/woowzsite_files"></wd-frame></wd-firefox></wd-winwindow>

Названия у коммитов шуточные, вот примеры смешных коммитов...
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/1674dcce8b98eab5141c8c36ba8889f6387582c3">кулицы</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/bf8dd8fcbc43f38f35456a76960f11caf2008b3f">скрепка добавь комнату с горой мусора</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/c69a1997e166a5e7cf7bc370a2a729f26233cb95">129 шагов сделаешь?</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/e1608a5fda4c966a797a13a77a17818111d477ce">плесень</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/758f4684483728ac6e3a08a4fe49eb57d267ffee">урадены видео вулди раз и два и три и четыре</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/d37cb8bd2cc305cf0bf90001c310ba8d2fcebf77">смотри как делаются деньги</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/a1e60476a4a7e1c09f0bc8f059c8c26c77849e53">жуки в телефоне 🐛🐞🦟</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/4e5ab6e3e8ed9bbaf7a8e326d7a913037b06211a">Create DOWNLOAD_GITHUB.html</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/8d8bb5d3ca07d4bb10261f70ead5c04da98c5ab9">SAFE MY LIFE LOL</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/a91ca1bc4962d32ad84037e1c9f2eed9e05f5039">ну сука</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/c2564436fb239e722e0da7306f3a2a806dae6313">сегодня день говна</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/1e7656bb35be812f175ab1e5d1b6f71f77b42906">ai stupdi)</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/8d0df54ea39e328a82a9b632fae9265a7502fd96">Поел ролов, срать захотелось... [131]</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/9281971f43f3dcd0404dbe73267e6d35858f627b">всем привет, у меня нет доступа к дискорду</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/471e41e5dcf0023755aacccd924ab2410455f003">HE ON MY ACC</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/89c430b4afb934dc2b765a4db40a8c11a2294adb">ты случаем не забылся?</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/0976d941976965a390fa04d583352ed475f0d3c7">bloodraw update last epic dodo pizza</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/8b52ceee6cb47d5a43783988e5323f1a705d60f3">slep sleep сон спать, я пинганул слипа? 🤔💭</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/e04090e1800cac9d0056d5df4a7be5e0444e0227">ХВАТИТ ПИТЬ ВОДУ</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/b562dd2014eac3726abf1c4598de4d016b673be5">Xnj ,hbuflbh ujdjhbn& jy ujdjhbn e ytuj pfhf;tybt rhjdb? b rfr vyt yf 'nj htfubhjdfnm& crf;bnt vyt&&& jy hjakbn bkb xnj&&&</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/c8ed703e5a3b227bd98160948cf99e68b9e64a8a">Позор</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/8c87838bf73ce771ffb7ee28ba875554d1b74df5">Я пошёл есть 🙂ᓚᘏᗢ</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/abf6f11f30697449e99c1f1104ccc4b701506873">чзх { "Version" : "1.2.2", "Type" : "Alpha", "ID" : 0, "ThatTexturePack": true, "Files": { "pack.txt" : ["Create", "\<Version\> | \<MinecraftVersion\> - By \<Author\> ©"], "pack.png" : ["Texture", "Icon.…</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/88c2fb545b2e672805102d92fe3e8c0aed3f4849">Я ссать 💧</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/daabf550305c15f2a38a8e6e46e0fcad239cd795">честно, заебало уже</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/3fc9d106b0f50291c274ce5b744201a803de2be2">reergerer😴😏😂😋😏😣😥😥🤥🦒🦏🦏🐢🐤🤼‍♂️👩🏽‍🤝‍👩🏻</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/c1e0db717cf1382a534b10d3295aa53e08f9710c">эксперт по литуистскому нарративу и цифровой эротике</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/4864e5c0132a5d35fb2e7a572c6d449e5d187255">Ты в классической "куриной-или-яйца" ситуации</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/0c632f14595a2b9fa23eee66148e67dd4f3b1b53">White Sponge 🧽🧽🧽🧽🧽🧽 🤍🤍🤍🤍🤍🤍</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/71846a30334b4949ea6585da63cfbc1d5be1dac9">сифилис 🤩</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/f493e0d641910bc816787159b39571c4b061d733">5.000$ за ZIP .22</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/e3d4ff643cd09201adc19eff5c65a9b3398c6518">насрано, уберите</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/b6f174c86eebe26b9dd64473cc451b3a2c1da358">по людям стреляли</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/370fb20dd12aff4e1a53686815ca94e175bdc0df">я пошёл салат готовить крабовый 🦀</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/b7c94775d862c5396cc0db83b2d212d21b5517e9">ЦЕЛУЙТЕ МОНИТОРЫ, Я В СЕТИ</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/7de0ade1245f0b2815b12267c9f67a51dd5728c8">ау xi816 ответь, как написать свою систему на C без ебучего ассемблера блять 😂😂😂</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/21dbb55f6cadf0f56a4980a75a08d92d8124c5f4">чебурк 🥐</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/4881f9d551f1f5b220e11bc44eae21f42255ce2b">сайт с пилой</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/d69d8d5c11f77bb51368953fcf27685f47577cca">ПРИЯТНОГО АППЕТИТА!</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/e268c198bbbe6f59e9333c1a76a74e7a4f899086">мне дей порнографию показывает((((((((</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/548c92e6eecfe70b35acae3804b04e60b05f06f0">ХА!!!!! НЕ ЖДАЛИ?????? обнова по вувзсайту!!!!!!</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/f1dc0fcf31a4a3b5270e0301ab23077f964c332a">пук пук обнова блуд рав сайта пук пук 😡😡😡</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/5d28ec29a8cf21693907fdf6bc239d22de64458a">ну скчайте литиум ну скачай</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/a25e09cbdea4cc476ec7e4b8f6af0bd4bbba5462">le pedo)</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/326159ab107ac1a5b1a04affc88317888d927888">Спалены ключи!</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/feaa785f671ad2d53611d090a96e480d055e3c19">ОТПУСТИТЕ МЕНЯ СПАТЬ!!!!! ВРЕМЯ УЖЕ 5:42 Я ХОЧУ СПАТЬ</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/5a66f894b58ce67de984a256397ae9be34a04a6c">сделайте мод на гаррис мод где у вертолёта будут яйца</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/aba3bc3eb1d3e5ba92ca7fe259895a9c9ab49ee9">Как гитхаб не забанил мой репозиторий</wd-commit>
<wd-commit url="https://github.com/Woowz11/woowzsite/commit/e3ebe3a80ae5ea58838d9c0a53814455066e5c58">прошу прощения, но мы не может перевести текст с неумесным содержанием</wd-commit>

и т.д, я устал остальные комиты добавлять... если хотите сами посмотрите.`)
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
    .Created("2026.09.15")
    .ID();

const Project_Portfolio = AddProject("portfolio", "Portfolio")
    .Status(D_Status.Active)
    .Core(Project_WoowzDoc)
    .Created("2026.09.13")
    .Type(D_Type.Info)
    .URL("https://github.com/Woowz11/woowzsite/tree/main/Portfolio")
    .Language(D_Lang.HTML)
    .AddContent(`
Этот сайт и есть этот проект
`)
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
`)
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