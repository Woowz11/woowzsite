// noinspection CssUnresolvedCustomProperty

const WoowzDoc = {
    State: {
        Const: {
            Name: "%unknown_wiki",
            Author: "%unknown_author",
            Theme: {
                Background: "#1E1E1E",
                Text      : "#D4D4D4",
                Accent    : "#cc0000",
                Sidebar   : "#252526",
                Border    : "#333333"
            }
        },
        
        Data: {},
        
        ContainerApp: undefined,
        ContainerStyle: undefined,
        
        Page: "undefined",
        
        Config: undefined
    },
    
    Init(Config){
        if(!Config){ Config = {}; }
        
        if(this.State.Config !== undefined){ throw new Error("WoowzDoc Init вызван дважды!"); }
        
        this.State.Config = Config;

        if(Config.Name     ){ this.State.Const.Name = Config.Name; }
        if(Config.Author   ){ this.State.Const.Author = Config.Author; }
        if(Config.Theme    ){ this.State.Const.Theme = { ...this.State.Const.Theme, ...this.State.Config.Theme }; }
        if(Config.Data     ){ this.State.Data = Config.Data; }
        
        this.State.ContainerStyle = document.createElement("style");
        document.head.appendChild(this.State.ContainerStyle);
    
        this.State.ContainerApp = document.createElement("div");
        this.State.ContainerApp.id = "WoowzDoc";
        document.body.appendChild(this.State.ContainerApp);

        const HandleHash = async () => {
            this.State.Page = window.location.hash.replace("#", "") || this.GetStartPageID();
            this.Build();
        }
        
        window.addEventListener("hashchange", HandleHash);
        HandleHash().then(R => console.log(`WoowzDoc "${this.State.Const.Name}" инициализирован!`));
    },

    // ----------------------------------------------------------------------
    
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
        return (this.State.Data.Article[this.State.Data.ErrorArticle] ? this.GetArticleRaw(this.State.Data.ErrorArticle) : undefined) || {
            Name: "hi error wip",
            RawContent: "ERROR: %article_error"
        };
    },
    
    GetErrorArticle(ErrorMessage){
        let Article = this.CloneTable(this.GetErrorArticleRaw());
        
        Article = this.ParseArticle(Article);
        Article.Content = this.ReplaceTag(Article.Content, "article_error", ErrorMessage);
        
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

*{ box-sizing: border-box; margin: 0; padding: 0; }

body{ background: var(--Background); color: var(--Text); font-family: "Segoe UI", Tahoma, sans-serif; overflow: hidden; }

#WoowzDoc{ width: 100vw; height: 100vh; display: flex; flex-direction: row; }
   
.Sidebar{ background: var(--Sidebar); border-right: 1px solid var(--Border); display: flex; flex-direction: column; width: 260px; flex-shrink: 0; }
.Sidebar-Header{ padding: 20px; font-weight: bold; border-bottom: 1px solid var(--Border); cursor: pointer; transition: background 0.2s; }
.Sidebar-Header:hover{ background: rgba(255,255,255,0.03); }
.Sidebar-Tree{ flex-grow: 1; overflow-y: auto; padding: 10px; }

.Tree-Item{ padding: 6px 12px; cursor: pointer; border-radius: 4px; margin-bottom: 2px; transition: 0.2s; font-size: 0.95rem; color: #ccc; }
.Tree-Item:hover{ background: rgba(255, 255, 255, 0.05); color: #fff; }
.Tree-Item.Active{ background: var(--Accent); color: white; }

.Tree-Folder{ margin-bottom: 4px; }
.Tree-Folder-Title{ padding: 8px 12px; font-size: 0.75rem; font-weight: bold; color: #666; text-transform: uppercase; letter-spacing: 1px; }
.Tree-Folder-Content{ padding-left: 12px; border-left: 1px solid rgba(255,255,255,0.05); margin-left: 10px; }

.Main{ display: flex; flex-direction: column; overflow: hidden; flex-grow: 1; }
.Content{ flex-grow: 1; overflow-y: auto; padding: 40px; }
article{ max-width: 800px; margin: 0 auto; line-height: 1.6; }

.Footer{ height: 25px; background: var(--Accent); font-size: 12px; display: flex; align-items: center; padding: 0 10px; color: white; flex-shrink: 0; }
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
    
    // ----------------------------------------------------------------------
    
    async Build(){
        const Article = await this.GetArticle(this.State.Page);
        
        this.State.ContainerStyle.innerHTML = this.GenerateCSS();
        
        document.title = this.State.Const.Name;
        
        this.State.ContainerApp.innerHTML = `
<aside class="Sidebar">
    <div class="Sidebar-Header" onclick="location.hash='${this.GetStartPageID()}';">
        ${this.State.Const.Name}
    </div>
    <nav class="Sidebar-Tree">
        ${this.GenerateTree(this.State.Data.Tree || Object.keys(this.State.Data.Article))}
    </nav>
</aside>
<main class="Main">
    <div class="Content">
        <article>${Article.Content}</article>
    </div>
    <footer class="Footer">
        <span>${this.State.Const.Author} | ${this.State.Page}</span>
    </footer>
</main>
`;
    }
};