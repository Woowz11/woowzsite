// noinspection CssUnresolvedCustomProperty

/*
Сделать ещё элементы:
* Клавиша, для отображение клавиши клавиатуры, и ещё можно мыши, геймпада
* Просмотр 3д скайбокса
* Просмотр других сайтов к примеру через iframe
* Указание даты, что-бы указать сколько времени прошло к примеру с определённой даты
* headers разного размера, и вида
* line, и таблицы
* карточка, с информацией
* простое вставление картинки, и svg
* галерея (что к прошлому что и к этому, возможность добавлять описания к элементам)
* звук и видео
* ссылка на ютуб видео
* ссылка на другую статью, и ссылка на другой сайт (на другой сайт добавить значок стрелочки типо другой сайт)
* списки, и деревья
* графики
* языки программирования
* категория которую можно свернуть и развернуть
* цитата?
* возможность вставить вырезку из другой статьи? типо указать от куда до куда обрезать и вставить
* разные текста, разного цвета, выделенности, наклонности
* математические формулы конструктор
* генератор графиков?
* прогресс бар
* разные кнопки, input, слайдеры
* элементы типа как в markdown, там `` и ```
* error, warning, info, note и т.д
* мелкий текст
* ВОЗМОЖНОСТЬ ДЕЛАТЬ ЭЛЕМЕНТЫ СПРАВА, мб сделать столб справа и туда вписывать? я хз как реализовать, Как на википедии короче
* элемент с scrollbar's, типо что-бы туда можно было вписать широкий элемент, и появился scrollbar, или указать лимит высоту и т.д
* отображение цвета
* парсер cs, типо wd-cs-struct, и могу на прямую строку с struct cs вписать, и он выдаст его в красивом формате и т.д

Доп идеи:
* сделать возможность указывать иконки для страниц, и википедии (будет ещё указываться в document.title)
* придумать занятие для правой sidebar, мб как в вики типо переход по категориям, добавить тогда в Element поддержку указания важности элемента, что-бы он там отображался
* в Element добавить вызов Update, Render, и т.д, что-бы каждый кадр могло вызываться, для рендера чего-то допустим
* добавить градиенты и иконки svg разные, и default language
* мб для красоты добавить шейдеры, что-бы рисовать шейдеры
* другие типы загрузки страниц, а именно просто "JS", и функцию сразу прописывать
* если пролистал вниз, появится кнопка вверх
* сделать поиск и теги для страниц, типо захожу в страницу а там по тегам, или другим параметрам могу искать, ну короче для портфолио проекты
 */

const WoowzDoc = {
    State: {
        Const: {
            Name  : "%core_unknown_wiki",
            Author: "%core_unknown_author",
            Theme: {
                Primary  : undefined,
                Secondary: undefined,
                
                Background: undefined,
                Text      : undefined,
                Accent    : undefined,
                Sidebar   : undefined,
                Border    : undefined,
                
                IsDark : undefined,
                Shadow : undefined,
                MixBase: undefined
            }
        },
        
        Data: {},
        Translations: {},
        Elements: {},
        ElementsList: [],
        CustomStyles: [],
        
        ContainerApp: undefined,
        ContainerStyle: undefined,
        
        Page: "undefined",
        Lang: "ru",
        
        Config: undefined
    },
    
    Element: class extends HTMLElement{
        constructor(){ super(); }
        connectedCallback(){}
        __Init(){
            if(this.__Initialized){ return; } this.__Initialized = true;
            this.Start();
        }
        __Initialized = false;
        
        Start(){}
    },
    
    AddCustomStyle(CSS){
        this.State.CustomStyles.push(CSS);
    },
    
    RegisterElement(ElementName, ElementClass, CSS = null){
        const FullName = "wd-" + ElementName;
        this.State.Elements[FullName] = ElementClass;
        this.State.ElementsList.push(FullName);
        if(CSS){ this.AddCustomStyle(CSS); }
    },
    
    RegisterDefaultElements(){
        const self = this;
        
        this.RegisterElement("badge", class extends self.Element{
            Start(){
                const Color = this.getAttribute("color") || "var(--Accent)";
                this.style.setProperty("--BadgeColor", Color);
                this.classList.add("wd-badge");
            }
        }, /* language=CSS */ `.wd-badge {
            display: inline-flex; align-items: center; padding: 2px 12px;
            border-radius: 6px; font-size: 11px; font-weight: 800;
            text-transform: uppercase; letter-spacing: 1px;
            background: linear-gradient(135deg, color-mix(in srgb, var(--BadgeColor), transparent 80%), color-mix(in srgb, var(--BadgeColor), transparent 90%));
            color: var(--BadgeColor);
            border: 1px solid color-mix(in srgb, var(--BadgeColor), transparent 60%);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin: 0 4px; vertical-align: middle;
        }`);

        this.RegisterElement("key", class extends self.Element{
            Start(){ this.classList.add("wd-key"); }
        }, /* language=CSS */ `
            .wd-key {
                display: inline-block;
                padding: 2px 8px;
                font-family: "Consolas", monospace;
                font-size: 14px;
                font-weight: bold;
                color: var(--Text);
                background: linear-gradient(to bottom,
                color-mix(in srgb, var(--Background), white 12%),
                color-mix(in srgb, var(--Background), white 5%)
                );

                border: 1px solid var(--Border);
                box-shadow: 0 3px 0 var(--Border);

                border-radius: 4px;
                margin: 0 3px;
                vertical-align: middle;
                text-transform: uppercase;

                cursor: pointer;
                user-select: none;

                position: relative;
                transition: transform 0.05s, box-shadow 0.05s;
                transform: translateY(-2px);
            }
            .wd-key:active {
                transform: translateY(0px);
                box-shadow: 0 1px 0 var(--Border);

                background: color-mix(in srgb, var(--Background), white 2%);
                filter: brightness(0.95);
            }
            .wd-key:hover {
                border-color: var(--Accent);
            }
        `);

        this.RegisterElement("callout", class extends self.Element{
            Start(){
                const Type = (this.getAttribute("type") || "info").toLowerCase();
                
                const Colors = {
                    info   : "#3498DB",
                    warning: "#F1C40F",
                    error  : "#E74C3C",
                    note   : "#95A5A6"
                };
                
                const Icons = {
                    info: "../../../source/mask-info.svg"   
                };
                
                const Color = Colors[Type] || Colors.info;
                const Icon  = Icons [Type] || Icons .info;

                this.style.setProperty("--CalloutColor", Color);
                this.style.setProperty("--CalloutIcon", `url("${Icon}")`);
                this.classList.add("wd-callout");
                this.innerHTML = `<div class="wd-callout-icon"></div><div class="wd-callout-content">${this.innerHTML}</div>`;
            }
        }, /* language=CSS */ `
            .wd-callout {
                display: flex; margin: 20px 0; padding: 15px;
                border-radius: 8px; border-left: 5px solid var(--CalloutColor);
                background: color-mix(in srgb, var(--CalloutColor), transparent 92%);
            }
            .wd-callout-icon {
                width: 24px; height: 24px; margin-right: 15px; flex-shrink: 0;
                background: var(--CalloutColor);
                mask: var(--CalloutIcon) no-repeat center;
            }
            .wd-callout-content { font-size: 0.95rem; color: var(--Text); }
        `);

        this.RegisterElement("infobox", class extends self.Element{
            Start() {
                const Name = this.getAttribute("name") || "Information";

                const MaxWidth = this.getAttribute("width") || "300px";
                this.style.setProperty("--MaxWidth", MaxWidth)
                
                const Lines = this.innerHTML
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\s*\|\s*/g, "@@PIPE@@")
                    .split(/<\/p>|<br\/?>|<\/?p>|\n|\s{2,}/gi)
                    .map(Line => Line.trim())
                    .filter(Line => Line.length > 0 && Line.includes("@@PIPE@@"));

                const Rows = Lines.map(Line => {
                    const Parts = Line.split("@@PIPE@@").map(Part => Part.trim());
                    if(Parts.length < 2){ return ""; }

                    const IsStandard = Parts.length === 2;
                    
                    const Cells = Parts.map((Content, Index) => {
                        let ClassName = "wd-infobox-cell";
                        if(IsStandard && Index === 0){ ClassName += " is-label"; }
                        if(IsStandard && Index === 1){ ClassName += " is-value"; }

                        return `<div class="${ClassName}">${Content}</div>`;
                    }).join('');
                    
                    return `<div class="wd-infobox-row${!IsStandard ? ' multi-column' : ''}">${Cells}</div>`;
                }).join('');

                this.classList.add("wd-infobox");
                this.innerHTML = `
            <div class="wd-infobox-title">${Name}</div>
            <div class="wd-infobox-body">${Rows}</div>
        `;
            }
        }, /* language=CSS */ `
            .wd-infobox {
                width: 100%;
                max-width: var(--MaxWidth);
                box-sizing: border-box;
                margin: 10px 0 20px 20px;
                background: var(--Sidebar);
                border: 1px solid var(--Border);
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 15px 35px var(--Shadow);
                clear: right;
                display: block;
            }
            .wd-infobox-title {
                padding: 12px;
                text-align: center;
                font-weight: 800;
                background: linear-gradient(90deg, var(--Secondary), var(--Primary));
                color: white;
                font-size: 0.95rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .wd-infobox-body { padding: 10px; }
            .wd-infobox-row {
                display: flex;
                align-items: center;
                border-bottom: 1px solid color-mix(in srgb, var(--Border), transparent 50%);
                padding: 8px 4px;
                gap: 10px;
            }
            .wd-infobox-row:last-child { border-bottom: none; }

            .wd-infobox-cell.is-label {
                font-weight: bold;
                font-size: 0.8rem;
                color: color-mix(in srgb, var(--Text), transparent 40%);
                white-space: nowrap;
                flex-shrink: 0;
            }
            .wd-infobox-cell.is-value {
                font-size: 0.85rem;
                text-align: right;
                color: var(--Text);
                word-break: break-word;
                flex-grow: 1;
            }
            .wd-infobox-row.multi-column .wd-infobox-cell {
                flex: 1;
                font-size: 0.8rem;
                text-align: center;
                color: var(--Text);
                border-right: 1px solid color-mix(in srgb, var(--Border), transparent 70%);
            }
            .wd-infobox-row.multi-column .wd-infobox-cell:last-child {
                border-right: none;
            }
            .wd-infobox-cell .wd-badge {
                margin: 0 2px;
                vertical-align: middle;
            }
        `);

        this.RegisterElement("right", class extends self.Element{
            Start() {
                const Width = this.getAttribute("width") || "300px";
                this.style.width = Width;
                this.classList.add("wd-right-container");
            }
        }, /* language=CSS */ `
            .wd-right-container {
                float: right;
                margin: 10px 0 20px 20px;
                clear: right;
                display: block;
                position: relative;
            }
        `);

        this.RegisterElement("collapse", class extends self.Element{
            Start() {
                const Name = this.getAttribute("name") || "Expand";
                this.innerHTML = `
            <details class="wd-details">
                <summary class="wd-summary">${Name}</summary>
                <div class="wd-details-content">${this.innerHTML}</div>
            </details>`;
            }
        }, /* language=CSS */ `
            .wd-details {
                margin: 10px 0;
                border: 1px solid var(--Border);
                border-radius: 8px;
                background: rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .wd-summary {
                padding: 12px;
                cursor: pointer;
                font-weight: bold;
                outline: none;
                background: rgba(255,255,255,0.02);
                transition: background 0.2s;
            }
            .wd-summary:hover { background: rgba(255,255,255,0.05); }

            .wd-details-content {
                padding: 15px;
                border-top: 1px solid var(--Border);
                display: flow-root;
            }
        `);

        this.RegisterElement("winwindow", class extends self.Element {
            Start() {
                const Name = this.getAttribute("name") || "Window";
                const Width = this.getAttribute("width") || "100%";
                const Height = this.getAttribute("height") || "auto";
                const Background = this.getAttribute("background") || "var(--Background)";
                const HideControls = this.getAttribute("controls") === "false";
                const Icon = this.getAttribute("icon") || "source/app.ico";

                const InnerContent = this.innerHTML;

                this.style.display = "block";
                this.style.width = Width;
                this.style.margin = "20px 0";

                this.innerHTML = `
            <div class="win-container-base">
                <div class="win-header-base">
                    <div class="win-title-base">
                        <span class="win-icon-base"><img src="${Icon}"></span>
                        <span class="win-text-base">${Name}</span>
                    </div>
                    ${!HideControls ? `
                    <div class="win-controls-base">
                        <div class="win-btn-base">─</div>
                        <div class="win-btn-base">❏</div>
                        <div class="win-btn-base win-close-base">✕</div>
                    </div>
                    ` : ''}
                </div>
                <div class="win-body-base" style="background: ${Background}; height: ${Height}">
                    ${InnerContent}
                </div>
            </div>
        `;
                
                self.ApplyElements(this);
            }
        }, /* language=CSS */ `
            .win-container-base {
                border: 1px solid var(--Border);
                border-radius: 4px;
                background: var(--Sidebar);
                box-shadow: 0 8px 30px var(--Shadow);
                overflow: hidden;
                display: flex;
                flex-direction: column;
                transition: transform 0.2s;
            }
        
            .win-header-base {
                height: 33px;
                background: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 13px;
                user-select: none;
                border-bottom: 1px solid var(--Border);
            }
        
            .win-title-base {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #333;
            }

            .win-icon-base {
                width: 16px;
                height: 16px;
                object-fit: contain;
                flex-shrink: 0;
            }
            .win-text-base { font-size: 16px; font-family: 'Consolas', sans-serif; }
        
            .win-controls-base { display: flex; height: 100%; }
            .win-btn-base {
                width: 45px;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                color: #333;
                transition: background 0.1s;
                cursor: pointer;
            }
            .win-btn-base:hover { background: #e5e5e5; }
            .win-close-base:hover { background: #e81123 !important; color: white; }
        
            .win-body-base {
                padding: 15px;
                overflow: auto;
                color: var(--Text);
                position: relative;
            }
        `);
    },
    
    Init(Config){
        if(!Config){ Config = {}; }
        
        if(this.State.Config !== undefined){ throw new Error("WoowzDoc Init вызван дважды!"); }
        
        this.State.Config = Config;

        if(Config.Name        ){ this.State.Const.Name = Config.Name; }
        if(Config.Author      ){ this.State.Const.Author = Config.Author; }
        if(Config.Data        ){ this.State.Data = Config.Data; }
        if(Config.Translations){ this.State.Translations = Config.Translations; }

        this.State.Const.Theme = this.GenerateDarkTheme();
        
        if(Config.Theme){
            if(Array.isArray(Config.Theme)){
                this.State.Const.Theme = { ...this.State.Const.Theme, ...this.GenerateTheme(Config.Theme[0], Config.Theme[1], Config.Theme[2]) };
            }else if(typeof Config.Theme === "object"){
                this.State.Const.Theme = { ...this.State.Const.Theme, ...Config.Theme };
            }
        }
        
        this.State.Translations["ru"] = { ...{
                "core_unknown_author": "Неизвестный автор",
                "core_unknown_wiki": "Без названия",
                "core_author": "Автор",
                "core_article_error_name": "Ошибка",
                "core_article_error_error": "Ошибка",
                "core_search_placeholder": "Поиск...",
                "core_search_notfound": "Ничего не найдено"
            }, ...this.State.Translations["ru"]};
        
        const SavedLang = localStorage.getItem("WoowzDoc_Lang");
        const BrowserLang = navigator.language.split('-')[0];
        
        if(SavedLang){
            this.State.Lang = SavedLang;
        }else if(this.State.Translations && this.State.Translations[BrowserLang]){
            this.State.Lang = BrowserLang;
        }else{
            this.State.Lang = "ru";
        }
        
        this.State.ContainerStyle = document.createElement("style");
        document.head.appendChild(this.State.ContainerStyle);
    
        this.State.ContainerApp = document.createElement("div");
        this.State.ContainerApp.id = "WoowzDoc";
        document.body.appendChild(this.State.ContainerApp);

        for(const [Element, Class] of Object.entries(this.State.Elements)){
            if(!customElements.get(Element)){
                customElements.define(Element, Class);
            }
        }

        document.addEventListener("click", (Event) => {
            if(!Event.target.closest(".Sidebar-Left-Search")){
                const Result = document.getElementById("WoowzDoc-SearchResults");
                if(Result){ Result.style.display = "none"; }
            }
        });
        
        const HandleHash = async () => {
            this.State.Page = window.location.hash.replace("#", "") || this.GetStartPageID();
            await this.Build();
        }
        
        window.addEventListener("hashchange", HandleHash);
        HandleHash().then(R => console.log(`WoowzDoc "${this.State.Const.Name}" инициализирован!`));
    },

    // ----------------------------------------------------------------------
    
    GenerateTheme(Primary, Secondary, IsDark = true){
        const ContrastInvert = IsDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)";
        return {
            Primary  : Primary,
            Secondary: Secondary,
            
            Accent    : Secondary,
            Background: Primary,
            Sidebar   : IsDark ? `color-mix(in srgb, ${Primary}, white 3%)` : `color-mix(in srgb, ${Primary}, black 3%)`,
            Border    : IsDark ? `color-mix(in srgb, ${Primary}, white 12%)` : `color-mix(in srgb, ${Primary}, black 12%)`,
            Text      : IsDark ? `color-mix(in srgb, white, ${Primary} 20%)` : `color-mix(in srgb, black, ${Primary} 10%)`,
            
            IsDark : IsDark,
            Shadow : ContrastInvert,
            MixBase: IsDark ? "white" : "black"
        };
    },
    
    GenerateDarkTheme(){
        return this.GenerateTheme("#1E1E1E", "#5C5C5C", true);
    },
    
    GenerateLightTheme(){
        return this.GenerateTheme("#FFFFFF", "#4A4A4A", false);
    },
    
    GetLangKey(Key, Lang = null){
        if(!Lang){ Lang = this.State.Lang; }
        
        const CurrentDirectory = this.State.Translations[Lang];
        if(CurrentDirectory && CurrentDirectory[Key] !== undefined){
            return CurrentDirectory[Key];
        }

        const BaseDirectory = this.State.Translations["ru"];
        if(this.State.Lang !== "ru" && BaseDirectory && BaseDirectory[Key] !== undefined){
            return BaseDirectory[Key];
        }
        
        return "%" + Key;
    },
    
    TranslateAll(Text, Lang = null){
        if(typeof Text !== "string"){ return Text; } 
        if(!Lang){ Lang = this.State.Lang; }
        return Text.replace(/%([a-zA-Z0-9_]+)/g, (Match, Key) => {
            return this.GetLangKey(Key, Lang);
        })
    },
    
    async LoadExternalJS(URL){
        return new Promise((Resolve, Reject) => {
            const Script = document.createElement("script");
            Script.src = URL;
            Script.onload = () => {
                Script.remove();
                Resolve();
            };
            Script.onerror = () => Reject(`Не удалось загрузить скрипт: ${URL}`);
            document.head.appendChild(Script);
        });
    },
    
    ReplaceTag(Content, Tag, Replace){
        if(typeof Content !== "string"){ return Content; }
        
        let Iteration = 0;
        const MaxIterations = 30;
        
        const TagRegex = /%([a-zA-Z0-9_]+)/g;
        while(Iteration < MaxIterations){
            let FoundMatch = false;
            
            Content = Content.replace(TagRegex, (Match, TagName) => {
                if(TagName === Tag){
                    FoundMatch = true;
                    return Replace;
                }
                
                return Match;
            });
            
            if(!FoundMatch){ break; }
            Iteration++;
        }
        
        return Content;
    },
    
    ParseArticle(Article){
        if(!Article.RawContent){
            Article.RawContent = "TODO, NO RAW CONTENT!";
        }
        
        if(!Article.Content){
            Article.Content = Article.RawContent;
        }
        
        return Article;
    },
    
    CloneTable(Table){
        return JSON.parse(JSON.stringify(Table));
    },

    GetErrorArticleRaw(){
        return (this.State.Data.Article && this.State.Data.Article[this.State.Data.ErrorArticle] ? this.GetArticleRaw(this.State.Data.ErrorArticle) : undefined) || {
            Name      : "%core_article_error_name",
            RawContent: "%core_article_error_error: %core_article_error"
        };
    },
    
    GetErrorArticle(ErrorMessage){
        let Article = this.CloneTable(this.GetErrorArticleRaw());
        
        Article = this.ParseArticle(Article);
        Article.Content = this.ReplaceTag(Article.Content, "core_article_error", ErrorMessage);
        
        return Article;
    },

    GetArticleRaw(ID){
        if(this.State.Data){
            let Article = this.State.Data.Article[ID];
            if(Article){
                if(Article.RawContent){
                    return Article;
                }else{
                    return this.GetErrorArticleRaw();
                }
            }else{
                return this.GetErrorArticleRaw();
            }
        }else{
            return this.GetErrorArticleRaw();
        }
    },
    
    async GetArticle(ID){
        if(!this.State.Data || !this.State.Data.Article){
            return this.GetErrorArticle("Статьи не указаны в Data!");
        }
        
        let Article = this.State.Data.Article[ID];
        if(!Article){ return this.GetErrorArticle(`Статья "${ID}" не найдена!`); }
        
        if(typeof Article.RawContent === "object" && Article.RawContent.Type === "FileJS"){
            try{
                if(!Article.LoadedContent){
                    await this.LoadExternalJS(Article.RawContent.URL);
                    
                    if(typeof window.WoowzDoc_Content === "function"){
                        Article.LoadedContent = window.WoowzDoc_Content();
                    }else{
                        Article.LoadedContent = "Ошибка: скрипт не вернул данные через WoowzDoc_Content!";
                    }
                    
                    delete window.WoowzDoc_Content;
                }
                
                let TempArticle = { ...Article, RawContent: Article.LoadedContent };
                return this.ParseArticle(TempArticle);
            }catch(e){
                return this.GetErrorArticle(e);
            }
        }
        
        return this.ParseArticle(Article);
    },
    
    FindFirstArticle(Tree){
        for(let Item of Tree){
            if(typeof Item === "string"){ return Item; }
            if(typeof Item === "object" && Item.Child){
                let Found = this.FindFirstArticle(Item.Child);
                if(Found){ return Found; }
            }
        }
        return null;
    },
    
    GetStartPageID(){
        if(this.State.Config.StartPage){ return this.State.Config.StartPage; }
        
        if(this.State.Data.Tree && this.State.Data.Tree.length > 0){
            let First = this.FindFirstArticle(this.State.Data.Tree);
            if(First){ return First; }
        }
        
        if(this.State.Data.Article){
            let Keys = Object.keys(this.State.Data.Article);
            if(Keys.length > 0){ return Keys[0]; }
        }
        
        return "undefined";
    },
    
    async SetLang(Code){
        if(this.State.Lang === Code){ return; }
        if(this.State.Translations[Code]){
            this.State.Lang = Code;
            localStorage.setItem("WoowzDoc_Lang", Code);
            await this.Build();
        }
    },

    Search(Query) {
        const ResultsContainer = document.getElementById("WoowzDoc-SearchResults");
        if(!ResultsContainer){ return; }

        if(!Query || Query.trim().length === 0){
            ResultsContainer.style.display = "none";
            return;
        }

        const Query__ = Query.toLowerCase().trim();
        const Articles = this.State.Data.Article;

        let Matched = [];
        for(let ID in Articles){
            const Name = this.TranslateAll(Articles[ID].Name || ID);
            const Name__ = Name.toLowerCase();
            const ID__ = ID.toLowerCase();

            if(Name__.includes(Query__) || ID__.includes(Query__)){
                let Weight = 0;
                if(Name__.startsWith(Query__) || ID__.startsWith(Query__)){ Weight = 2; }else{ Weight = 1; }

                Matched.push({ ID: ID, Name: Name, Weight: Weight });
            }
        }

        Matched.sort((A, B) => B.Weight - A.Weight);

        if(Matched.length > 0){
            ResultsContainer.innerHTML = Matched.map(Match => `
                <div class="Search-Result-Item" onclick="location.hash='${Match.ID}'; document.getElementById('WoowzDoc-SearchResults').style.display='none';">
                    <span class="Res-Name">${Match.Name}</span>
                    <span class="Res-ID">ID: ${Match.ID}</span>
                </div>
            `).join("");
            ResultsContainer.style.display = "block";
        }else{
            ResultsContainer.innerHTML = `<div class="Search-Result-Item" style="color:#666">${this.GetLangKey("core_search_notfound")}</div>`;
            ResultsContainer.style.display = "block";
        }
    },
    
    ApplyElements(Root = document){
        const Selector = this.State.ElementsList.join(',');
        if(!Selector){ return; }
        
        let Elements = Array.from(Root.querySelectorAll(Selector));
        
        const GetDepth = (E) => {
            let Depth = 0;
            while(E.parentNode){
                Depth++;
                E = E.parentNode;
            }
            return Depth;
        };
        
        Elements.sort((A, B) => GetDepth(B) - GetDepth(A));
        
        Elements.forEach(E => {
           E.__Init(); 
        });
    },
    
    // ----------------------------------------------------------------------
    
    GenerateCSS(){
        let Theme = this.State.Const.Theme;
        
        const CustomElementsCSS = this.State.CustomStyles.join("\n");
        
        // language=CSS
        return `
:root{
    --Primary  : ${Theme.Primary};
    --Secondary: ${Theme.Secondary};
    
    --Background: ${Theme.Background};
    --Text      : ${Theme.Text};
    --Accent    : ${Theme.Accent};
    --Sidebar   : ${Theme.Sidebar};
    --Border    : ${Theme.Border};
    --Shadow    : ${Theme.Shadow};
    --MixBase   : ${Theme.MixBase};
}

::selection{ background: color-mix(in srgb, var(--Accent), transparent 80%); color: var(--MixBase); text-shadow: var(--Accent) 0 0 10px, var(--Accent) 0 0 10px, var(--Accent) 0 0 10px, var(--Accent) 0 0 10px; }

*{ box-sizing: border-box; margin: 0; padding: 0; font-size: 18px; letter-spacing: 1px; cursor: default; }

body{ background: var(--Background); color: var(--Text); font-family: "Segoe UI", Tahoma, sans-serif; overflow: hidden; }

#WoowzDoc{ width: 100vw; height: 100vh; display: flex; flex-direction: row; }
   
.Sidebar-Left{ background: linear-gradient(to bottom, var(--Sidebar), color-mix(in srgb, var(--Sidebar), black 5%)); border-right: 1px solid var(--Border); display: flex; flex-direction: column; width: 280px; flex-shrink: 0; }
.Sidebar-Left-Header{ padding: 25px 20px; font-weight: bold; font-size: 1.1rem; border-bottom: 1px solid var(--Border); cursor: pointer; background: linear-gradient(90deg, var(--Secondary), var(--Primary)) 100% 0; color: var(--Text); text-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: background-position 0.5s ease; background-size: 200% 100%; box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px var(--Shadow); }
.Sidebar-Left-Header:hover{ background-position: 0 0; }
.Sidebar-Left-Tree{ flex-grow: 1; overflow-y: auto; padding: 10px; scrollbar-width: thin; scrollbar-color: var(--Border) transparent; }

.Sidebar-Left-Search{ padding: 10px 20px; position: relative; border-bottom: 1px solid var(--Border);}
.Search-Input{ width: 100%; cursor: text; background: color-mix(in srgb, var(--Background), black 20%); border: 1px solid var(--Border); border-radius: 4px; padding: 8px 12px; color: var(--Text); outline: none; font-size: 0.85rem; transition: border-color 0.2s; }
.Search-Input:focus{ border-color: var(--Accent); }
.Search-Results{ position: absolute; top: 100%; left: 10px; right: 10px; background: var(--Sidebar); border: 1px solid var(--Border); border-radius: 4px; z-index: 1000; max-height: 300px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--Border) transparent; display: none; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
.Search-Result-Item{ padding: 10px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.05); }
.Search-Result-Item:hover{ background: color-mix(in srgb, var(--Accent), transparent 90%); }
.Search-Result-Item .Res-Name{ display: block; font-weight: bold; font-size: 0.9rem;}
.Search-Result-Item .Res-ID{ font-size: 0.7rem; color: #666; }

.Sidebar-Right{ border-left: 1px solid var(--Border); display: flex; flex-direction: column; width: 260px; flex-shrink: 0; }

.Tree-Item{ background: linear-gradient(90deg, var(--Secondary) 0%, transparent 50%, transparent 100%); background-size: 200% 100%; background-position: 100% 0; padding: 6px 12px; cursor: pointer; border-radius: 4px; margin-bottom: 2px; transition: 0.2s; font-size: 0.95rem; color: color-mix(in srgb, var(--Text), transparent 30%); }
.Tree-Item:hover{ background-position: 25% 0; fill-opacity: 1; color: var(--Text); }
.Tree-Item.Active{ background-position: 0 0; color: white; }

.Tree-Folder{ margin-bottom: 4px; }
.Tree-Folder-Title{ padding: 8px 12px; font-size: 0.75rem; font-weight: bold; color: var(--Text); text-transform: uppercase; }
.Tree-Folder-Content{ padding-left: 12px; border-left: 1px solid color-mix(in srgb, var(--MixBase), transparent 90%); margin-left: 10px; }

.Main{ display: flex; flex-direction: column; flex-grow: 1; height: 100vh; overflow: hidden; }
.Content{ flex-grow: 1; overflow-y: scroll; padding: 0; display: flex; flex-direction: column; align-items: center; scrollbar-color: var(--Accent) transparent; scrollbar-width: thin }

.Header{ width: 100%; height: 60px; background: linear-gradient(to bottom, color-mix(in srgb, var(--Background), white 10%), var(--Background)); border-bottom: 1px solid var(--Border); font-size: 12px; display: flex; align-items: center; padding: 0 20px; color: color-mix(in srgb, currentColor, transparent 50%); flex-shrink: 0; }
.Header-Center span, .Footer-Center span{ font-weight: 700; font-size: 1.3rem; background: linear-gradient(to right, var(--Secondary), color-mix(in srgb, var(--Secondary), white 40%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.Footer{ width: 100%; height: 60px; background: linear-gradient(to bottom, var(--Background), color-mix(in srgb, var(--Background), black 10%)); border-top: 1px solid var(--Border); font-size: 12px; display: flex; align-items: center; padding: 0 20px; color: color-mix(in srgb, currentColor, transparent 50%); flex-shrink: 0; margin-top: auto; }

.Header-Left, .Header-Right, .Footer-Left, .Footer-Right { flex: 1; display: flex; align-items: center; }
.Header-Center, .Footer-Center{ flex: 2; display: flex; justify-content: center; align-items: center; font-weight: 500; }
.Header-Right, .Footer-Right{ justify-content: flex-end; gap: 15px; }

.Article-Wrapper { display: flex; flex-direction: row; width: 100%; justify-content: center; flex-grow: 1; }
article{ width: 90%; line-height: 1.6; padding: 1em 2em; overflow-x: hidden; }

.Lang-Button { cursor: pointer; padding: 2px 5px; border: 1px solid var(--Border); border-radius: 3px; font-size: 10px; }
.Lang-Button.Active { background: var(--Accent); color: white; }
        
/* ---------------------------------------------------------------------- */
${CustomElementsCSS}}`;
    },
    
    GenerateTree(Items){
        return Items.map(Item => {
            if(typeof Item === "string"){
                const Article = this.GetArticleRaw(Item);
                return `<div class="Tree-Item${this.State.Page === Item ? " Active" : ""}" onclick="location.hash='${Item}';">${Article.Name}</div>`
            }else if(typeof Item === "object" && Item.Name && Item.Child){
                return `
<div class="Tree-Folder">
    <div class="Tree-Folder-Title">${Item.Name}</div>
    <div class="Tree-Folder-Content">${this.GenerateTree(Item.Child)}</div>
</div>
`;
            }
            return "";
        }).join("");
    },

    Stylize(Text){
        if(typeof Text !== "string"){ return Text; }
        
        let Result = Text
            .replace(/\\</g, "&lt;")
            .replace(/\\>/g, "&gt;");
        
        return Result.split('\n').map(Line => {
            const TLine = Line.trim();

            if(TLine === ""){ return "<br>"; }
            
            if(TLine.startsWith("///")){ return ""; }

            if(TLine.includes("<wd-") || TLine.includes("</wd-")){ return Line; }
            
            Line = Line
                .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
                .replace(/ {2,}/g, M => "&nbsp;".repeat(M.length))
                .replace(/^ /g, "&nbsp;");
            
            return `<p>${Line}</p>`;
        }).join("");
    },
    
    // ----------------------------------------------------------------------
    
    async Build(){
        const Article = await this.GetArticle(this.State.Page);
        
        this.State.ContainerStyle.innerHTML = this.GenerateCSS();
        
        document.title = this.TranslateAll(Article.Name);
        
        let Items = this.State.Data.Tree;
        if(!Items){ Items = this.State.Data.Article ? Object.keys(this.State.Data.Article) : []; }
        
        const LangSwitcher = Object.keys(this.State.Translations).map(Code => `<span class="Lang-Button${this.State.Lang === Code ? " Active" : ""}" onclick="WoowzDoc.SetLang('${Code}');">${Code.toUpperCase()}</span>`).join("");
        
        this.State.ContainerApp.innerHTML = `
<aside class="Sidebar-Left">
    <div class="Sidebar-Left-Header" onclick="location.hash='${this.GetStartPageID()}';">
        ${this.State.Const.Name}
    </div>
    <div class="Sidebar-Left-Search">
        <input type="text" class="Search-Input" placeholder="%core_search_placeholder" oninput="WoowzDoc.Search(this.value)" onfocus="WoowzDoc.Search(this.value)">
        <div id="WoowzDoc-SearchResults" class="Search-Results"></div>
    </div>
    <nav class="Sidebar-Left-Tree">
        ${this.GenerateTree(Items)}
    </nav>
</aside>
<main class="Main">
    <div class="Content">
        <header class="Header">
            <div class="Header-Left">
                <span>ID: "${this.State.Page}"</span>
            </div>
            <div class="Header-Center">
                <span style="font-size: 1.5em; color: var(--Text)">${Article.Name}</span>
            </div>
            <div class="Header-Right">
                <span>${LangSwitcher}</span>
            </div>
        </header>
        
        <div class="Article-Wrapper">
            <article>${Article.Content}</article>
            
            <aside class="Sidebar-Right"></aside>
        </div>
        
        <footer class="Footer">
            <div class="Footer-Left">
                <span>%core_author: ${this.State.Const.Author}</span>
            </div>
            <div class="Footer-Center">
                <span style="font-size: 1.5em; color: var(--Text)">${this.State.Const.Name}</span>
            </div>
            <div class="Footer-Right">
                <span>${(A=>A[Math.random()*A.length|0])(["Мама купи мне сникерс","Вувз не сделает вики","В WoowzCore такого не было!","Это отсылка на Woowzwiki?","Привет","Меня тут не было","Написано на сырых яйцах","Чёрт возьми","Сегодня легендарный день"])}</span>
            </div>
        </footer>
    </div>
</main>
`;
        const ArticleArea = this.State.ContainerApp.querySelector("article");
        this.ApplyElements(ArticleArea);
        
        this.State.ContainerApp.innerHTML = this.TranslateAll(this.State.ContainerApp.innerHTML);
    }
};