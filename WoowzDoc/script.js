// noinspection CssUnresolvedCustomProperty

const WoowzDoc = {
    State: {
        Const: {
            Name  : "%core_unknown_wiki",
            Author: "%core_unknown_author",
            Theme: {
                Background: "#1E1E1E",
                Text      : "#D4D4D4",
                Accent    : "#5C5C5C",
                Sidebar   : "#252526",
                Border    : "#333333"
            }
        },
        
        Data: {},
        Translations: {},
        
        ContainerApp: undefined,
        ContainerStyle: undefined,
        
        Page: "undefined",
        Lang: "ru",
        
        Config: undefined
    },
    
    Init(Config){
        if(!Config){ Config = {}; }
        
        if(this.State.Config !== undefined){ throw new Error("WoowzDoc Init вызван дважды!"); }
        
        this.State.Config = Config;

        if(Config.Name        ){ this.State.Const.Name = Config.Name; }
        if(Config.Author      ){ this.State.Const.Author = Config.Author; }
        if(Config.Theme       ){ this.State.Const.Theme = { ...this.State.Const.Theme, ...this.State.Config.Theme }; }
        if(Config.Data        ){ this.State.Data = Config.Data; }
        if(Config.Translations){ this.State.Translations = Config.Translations; }
        
        Config.Translations["ru"] = { ...Config.Translations["ru"], ...{
            "core_unknown_author": "Неизвестный автор",
            "core_unknown_wiki": "Без названия",
            "core_author": "Автор",
            "core_article_error_name": "Ошибка",
            "core_article_error_error": "Ошибка"
        }};
        
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

        // ----------------------------------------------------------------------

        class WoowzDocElement extends HTMLElement{
            constructor(){ super(); }
        }
        
        class WD_Box extends WoowzDocElement{
            connectedCallback(){
                const Type = this.getAttribute("type") || "info";
                this.classList.add('wd-box');
                this.classList.add(`wd-box-${Type}`);

                if (this.getAttribute('data-ready') !== 'true') {
                    this.setAttribute('data-ready', 'true');
                    this.innerHTML = `<div class="wd-box-content">${this.innerHTML}</div>`;
                }
            }
        }
        
        customElements.define("wd-box", WD_Box);
        
        // ----------------------------------------------------------------------
        
        const HandleHash = async () => {
            this.State.Page = window.location.hash.replace("#", "") || this.GetStartPageID();
            await this.Build();
        }
        
        window.addEventListener("hashchange", HandleHash);
        HandleHash().then(R => console.log(`WoowzDoc "${this.State.Const.Name}" инициализирован!`));
    },

    // ----------------------------------------------------------------------
    
    GetLangKey(Lang, Key){
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
        if(!Lang){ Lang = this.State.Lang; }
        return Text.replace(/%([a-zA-Z0-9_]+)/g, (Match, Key) => {
            return this.GetLangKey(Lang, Key);
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
            Name: "%core_article_error_name",
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
    
    SetLang(Code){
        if(this.State.Translations[Code]){
            this.State.Lang = Code;
            localStorage.setItem("WoowzDoc_Lang", Code);
            this.Build();
        }
    },
    
    // ----------------------------------------------------------------------
    
    GenerateCSS(){
        let Theme = this.State.Const.Theme;
        // language=CSS
        return `
:root{
    --Background: ${Theme.Background};
    --Text      : ${Theme.Text};
    --Accent    : ${Theme.Accent};
    --Sidebar   : ${Theme.Sidebar};
    --Border    : ${Theme.Border};
}

*{ box-sizing: border-box; margin: 0; padding: 0; font-size: 18px; letter-spacing: 1px; }

body{ background: var(--Background); color: var(--Text); font-family: "Segoe UI", Tahoma, sans-serif; overflow: hidden; }

#WoowzDoc{ width: 100vw; height: 100vh; display: flex; flex-direction: row; }
   
.Sidebar-Left{ background: var(--Sidebar); border-right: 1px solid var(--Border); display: flex; flex-direction: column; width: 260px; flex-shrink: 0; }
.Sidebar-Left-Header{ padding: 20px; font-weight: bold; border-bottom: 1px solid var(--Border); cursor: pointer; transition: background 0.2s; }
.Sidebar-Left-Header:hover{ background: rgba(255,255,255,0.03); }
.Sidebar-Left-Tree{ flex-grow: 1; overflow-y: auto; padding: 10px; scrollbar-width: thin; scrollbar-color: var(--Border) transparent; }

.Sidebar-Right{ border-left: 1px solid var(--Border); display: flex; flex-direction: column; width: 260px; flex-shrink: 0; }

.Tree-Item{ padding: 6px 12px; cursor: pointer; border-radius: 4px; margin-bottom: 2px; transition: 0.2s; font-size: 0.95rem; color: #ccc; }
.Tree-Item:hover{ background: rgba(255, 255, 255, 0.05); color: #fff; }
.Tree-Item.Active{ background: var(--Accent); color: white; }

.Tree-Folder{ margin-bottom: 4px; }
.Tree-Folder-Title{ padding: 8px 12px; font-size: 0.75rem; font-weight: bold; color: #666; text-transform: uppercase; letter-spacing: 1px; }
.Tree-Folder-Content{ padding-left: 12px; border-left: 1px solid rgba(255,255,255,0.05); margin-left: 10px; }

.Main{ display: flex; flex-direction: column; flex-grow: 1; height: 100vh; overflow: hidden; }
.Content{ flex-grow: 1; overflow-y: auto; padding: 0; display: flex; flex-direction: column; align-items: center; scrollbar-color: var(--Border) transparent; }

.Header{ width: 100%; height: 60px; border-bottom: 1px solid var(--Border); font-size: 12px; display: flex; align-items: center; padding: 0 20px; color: color-mix(in srgb, currentColor, transparent 50%); flex-shrink: 0; }
.Footer{ width: 100%; height: 60px; border-top: 1px solid var(--Border); font-size: 12px; display: flex; align-items: center; padding: 0 20px; color: color-mix(in srgb, currentColor, transparent 50%); flex-shrink: 0; margin-top: auto; }

.Header-Left, .Header-Right, .Footer-Left, .Footer-Right {
    flex: 1;
    display: flex;
    align-items: center;
}

.Header-Center, .Footer-Center {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
}

.Header-Right, .Footer-Right {
    justify-content: flex-end;
    gap: 15px;
}

.Article-Wrapper { display: flex; flex-direction: row; width: 100%; justify-content: center; flex-grow: 1; }
article{ width: 90%; line-height: 1.6; padding: 1em 2em; overflow-x: hidden; }

.Lang-Button { cursor: pointer; padding: 2px 5px; border: 1px solid var(--Border); border-radius: 3px; font-size: 10px; }
.Lang-Button.Active { background: var(--Accent); color: white; }

/* ---------------------------------------------------------------------- */

article p{ white-space: pre-wrap; min-height: 1em; }

wd-box {
    display: block;
    margin: 1.5em 0;
}

.wd-box {
    padding: 15px;
    border-left: 5px solid var(--Accent);
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    width: 100%;
}
.wd-box-warning {
    border-left-color: #ffa500 !important;
    background: rgba(255, 165, 0, 0.1);
}

.wd-box-error {
    border-left-color: #ff4444 !important;
    background: rgba(255, 68, 68, 0.1);
}

.wd-box-content {
    display: block;
    white-space: pre-wrap; /* Чтобы внутри бокса тоже работали твои пробелы */
}
        
        `;
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
        
        this.State.ContainerApp.innerHTML = this.TranslateAll(`
<aside class="Sidebar-Left">
    <div class="Sidebar-Left-Header" onclick="location.hash='${this.GetStartPageID()}';">
        ${this.State.Const.Name}
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
`);
    }
};