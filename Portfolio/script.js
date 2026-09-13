const State = {
    LeftOpen : false,
    RightOpen: false,
    
    IsMobile: false,

    Page: "",
    
    Theme: {
        bg: "#1e1e1e",
        sidebar: "#252526",
        accent: "#007acc",
        text: "#d4d4d4",
        border: "#333",
        footer: "#007acc",
        activityBar: "#333333"
    },

    Language: "ru",
};

// ----------------------------------------------------------------------

const GenerateStyle = () => {
    const IsMobile = State.IsMobile;

    // language=CSS
    const CSS = `
*{ box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body{
    background: ${State.Theme.bg};
    color: ${State.Theme.text};
    font-family: "Segoe UI", system-ui, sans-serif;
    overflow: hidden;
    font-size: ${IsMobile ? "18px" : "14px"};
}

.Layout{
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    position: relative;
}

aside{
    height: 100%;
    background: ${State.Theme.sidebar};
    flex-shrink: 0;
    z-index: 1000;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

aside.LeftSidebar{
    width: ${IsMobile ? '85vw' : '260px'};
    border-right: 1px solid ${State.Theme.border};
    position: ${IsMobile ? 'fixed' : 'relative'};
    left: 0;
    transform: ${IsMobile && !State.LeftOpen ? 'translateX(-100%)' : 'translateX(0)'};
}

aside.RightSidebar{
    width: ${IsMobile ? '85vw' : '240px'};
    border-left: 1px solid ${State.Theme.border};
    position: ${IsMobile ? 'fixed' : 'relative'};
    right: 0;
    transform: ${IsMobile && !State.RightOpen ? 'translateX(100%)' : 'translateX(0)'};
}

aside.ActivityBar{
    width: ${IsMobile ? '100vw' : '50px'};
    height: ${IsMobile ? '65px' : '100%'};
    background: ${State.Theme.activityBar};
    border-${IsMobile ? 'top' : 'right'}: 1px solid ${State.Theme.border};
    display: flex;
    flex-direction: ${IsMobile ? 'row' : 'column'};
    position: ${IsMobile ? 'fixed' : 'relative'};
    bottom: 0;
    justify-content: ${IsMobile ? 'space-around' : 'flex-start'};
    align-items: center;
    z-index: 1100;
}

.ActivityIcon{
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #858585;
    cursor: pointer;
}
.ActivityIcon.Active{ color: ${State.Theme.accent}; }

.Main{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    padding-bottom: ${IsMobile ? '65px' : '0'};
}

header{
    height: ${IsMobile ? '70px' : '50px'};
    border-bottom: 1px solid ${State.Theme.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: ${State.Theme.sidebar};
}

.MenuBtn{
    display: ${IsMobile ? 'flex' : 'none'};
    width: 45px; height: 45px;
    align-items: center; justify-content: center;
    font-size: 1.8rem;
    background: #333; border-radius: 8px; border: none; color: white;
}

.ScrollArea{ flex-grow: 1; overflow-y: auto; padding: ${IsMobile ? '25px' : '40px'}; }
article{ max-width: 800px; margin: 0 auto; line-height: 1.6; }
h1{ font-size: ${IsMobile ? '2rem' : '2.5rem'}; margin-bottom: 20px; }

.TreeItem{
    padding: ${IsMobile ? '18px 25px' : '8px 25px'};
    cursor: pointer;
    border-bottom: 1px solid ${IsMobile ? '#333' : 'transparent'};
}
.Folder{ padding: 15px 25px 5px; font-size: 0.8rem; color: #666; }

.MobileOverlay{
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    display: ${IsMobile && (State.LeftOpen || State.RightOpen) ? 'block' : 'none'};
    z-index: 900;
    backdrop-filter: blur(4px);
}
    `;

    let StyleElement = document.getElementById("Styles");
    if(!StyleElement){
        StyleElement = document.createElement("style");
        StyleElement.id = "Styles";
        document.head.appendChild(StyleElement);
    }
    StyleElement.innerHTML = CSS;
};

const GenerateActivityBar = () => `
<aside class="ActivityBar">
    <div class="ActivityIcon Active">🏠</div>
    <div class="ActivityIcon">🔍</div>
    <div class="ActivityIcon">🐙</div>
    <div class="ActivityIcon">⚙️</div>
</aside>`;

const GenerateLeftSidebar = () => {
    function GenerateTree(Items){
        return Items.map(Item => {
            if(Item.Type === 1){
                return `<div class="TreeItem">${Item.ID}</div>`;
            }else{
                return `<div class="Folder">${Item.ID}</div><div class="FolderContent" style="padding-left: 15px;">${GenerateTree(Item.Children)}</div>`;
            }
        }).join("");
    }
    
    return `
<aside class="LeftSidebar">
    <div class="Logo" style="font-size: 1.5rem; padding: 25px;">EXPLORER</div>
    <nav>
        ${GenerateTree(PortfolioData.Categories)}
    </nav>
</aside>`;
};

const GenerateRightSidebar = () => `
<aside class="RightSidebar">
    <div class="Logo" style="font-size: 1.5rem; padding: 25px;">DETAILS</div>
    <div style="padding: 25px;">
        <p style="color: #888;">Здесь будут метаданные вашего проекта.</p>
    </div>
</aside>`;

const GenerateHeader = () => `
<header>
    <button class="MenuBtn" onclick="ToggleLeft()">☰</button>
    <div class="Path" style="font-size: 0.9rem;">${State.IsMobile ? '📱 Mobile_OS' : 'Root / ' + State.Page}</div>
    <button class="MenuBtn" onclick="ToggleRight()">ℹ️</button>
</header>`;

const GenerateContent = () => `
<article>
    <h1>${State.Page}</h1>
</article>`;

// ----------------------------------------------------------------------

function SyncHash(){
    const Hash = window.location.hash.replace("#", "");
    if(Hash){
        State.Page = Hash;
    }else{
        State.Page = "start";
    }
}

// ----------------------------------------------------------------------

const PortfolioElement = document.getElementById("Portfolio");
function Generate(){
    GenerateStyle();

    PortfolioElement.innerHTML = `
        <div class="Layout">
            ${State.IsMobile ? `<div class="MobileOverlayOverlay" onclick="CloseAll()"></div>` : ""}
            
            ${GenerateActivityBar()}
            ${GenerateLeftSidebar()}
            
            <main class="Main">
                ${GenerateHeader()}
                <div class="ScrollArea">
                    ${GenerateContent()}
                </div>
                ${!State.IsMobile ? `<footer> Ready | UTF-8 | JS </footer>` : ""}
            </main>
            
            ${GenerateRightSidebar()}
        </div>`;
}

window.onhashchange = () => {
    SyncHash();
    State.LeftOpen = false;
    State.RightOpen = false;
    Generate();
};

document.addEventListener("DOMContentLoaded", () => {
    SyncHash();
    Generate();
});