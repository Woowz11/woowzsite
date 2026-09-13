const State = {
    Language: "ru",
    LeftOpen: false,  // Состояние левой шторки
    RightOpen: false, // Состояние правой шторки
    IsMobile: false,

    Theme: {
        bg: "#1e1e1e",
        sidebar: "#252526",
        accent: "#007acc",
        text: "#d4d4d4",
        border: "#333",
        footer: "#007acc",
        activityBar: "#333333"
    },
};

// ----------------------------------------------------------------------

const GenerateStyle = () => {
    const isM = State.IsMobile;

    // language=CSS
    const CSS = `
*{ box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
body{
    background: ${State.Theme.bg};
    color: ${State.Theme.text};
    font-family: "Segoe UI", system-ui, sans-serif;
    overflow: hidden;
    font-size: ${isM ? '18px' : '14px'}; /* Увеличенный масштаб для мобилок */
}

.Layout{
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    position: relative;
}

/* --- САЙДБАРЫ (ШТОРКИ НА МОБИЛКАХ) --- */
aside {
    height: 100%;
    background: ${State.Theme.sidebar};
    flex-shrink: 0;
    z-index: 1000;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

aside.LeftSidebar {
    width: ${isM ? '85vw' : '260px'};
    border-right: 1px solid ${State.Theme.border};
    position: ${isM ? 'fixed' : 'relative'};
    left: 0;
    transform: ${isM && !State.LeftOpen ? 'translateX(-100%)' : 'translateX(0)'};
}

aside.RightSidebar {
    width: ${isM ? '85vw' : '240px'};
    border-left: 1px solid ${State.Theme.border};
    position: ${isM ? 'fixed' : 'relative'};
    right: 0;
    transform: ${isM && !State.RightOpen ? 'translateX(100%)' : 'translateX(0)'};
}

/* --- ACTIVITY BAR (НИЖНЯЯ ПАНЕЛЬ НА МОБИЛКАХ) --- */
aside.ActivityBar {
    width: ${isM ? '100vw' : '50px'};
    height: ${isM ? '65px' : '100%'};
    background: ${State.Theme.activityBar};
    border-${isM ? 'top' : 'right'}: 1px solid ${State.Theme.border};
    display: flex;
    flex-direction: ${isM ? 'row' : 'column'};
    position: ${isM ? 'fixed' : 'relative'};
    bottom: 0;
    justify-content: ${isM ? 'space-around' : 'flex-start'};
    align-items: center;
    z-index: 1100;
}

.ActivityIcon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #858585;
    cursor: pointer;
}
.ActivityIcon.Active { color: ${State.Theme.accent}; }

/* --- ОСНОВНАЯ ОБЛАСТЬ --- */
.Main {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    padding-bottom: ${isM ? '65px' : '0'}; /* Отступ под нижний бар */
}

header {
    height: ${isM ? '70px' : '50px'};
    border-bottom: 1px solid ${State.Theme.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: ${State.Theme.sidebar};
}

.MenuBtn {
    display: ${isM ? 'flex' : 'none'};
    width: 45px; height: 45px;
    align-items: center; justify-content: center;
    font-size: 1.8rem;
    background: #333; border-radius: 8px; border: none; color: white;
}

.ScrollArea { flex-grow: 1; overflow-y: auto; padding: ${isM ? '25px' : '40px'}; }
article { max-width: 800px; margin: 0 auto; line-height: 1.6; }
h1 { font-size: ${isM ? '2rem' : '2.5rem'}; margin-bottom: 20px; }

/* --- ЭЛЕМЕНТЫ ДЕРЕВА (Укрупненные для пальцев) --- */
.TreeItem {
    padding: ${isM ? '18px 25px' : '8px 25px'};
    cursor: pointer;
    border-bottom: 1px solid ${isM ? '#333' : 'transparent'};
}
.Folder { padding: 15px 25px 5px; font-size: 0.8rem; color: #666; }

/* --- OVERLAY --- */
.Overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.7);
    display: ${isM && (State.LeftOpen || State.RightOpen) ? 'block' : 'none'};
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

// --- LOGIC ---
const ToggleLeft = () => { State.LeftOpen = !State.LeftOpen; State.RightOpen = false; Generate(); };
const ToggleRight = () => { State.RightOpen = !State.RightOpen; State.LeftOpen = false; Generate(); };
const CloseAll = () => { State.LeftOpen = false; State.RightOpen = false; Generate(); };

window.addEventListener('resize', () => {
    State.IsMobile = window.innerWidth <= 768;
    Generate();
});

// --- COMPONENTS ---
const GenerateActivityBar = () => `
<aside class="ActivityBar">
    <div class="ActivityIcon Active">🏠</div>
    <div class="ActivityIcon">🔍</div>
    <div class="ActivityIcon">🐙</div>
    <div class="ActivityIcon">⚙️</div>
</aside>`;

const GenerateLeftSidebar = () => `
<aside class="LeftSidebar">
    <div class="Logo" style="font-size: 1.5rem; padding: 25px;">EXPLORER</div>
    <nav>
        <div class="Folder">General</div>
        <div class="TreeItem" onclick="CloseAll()">📄 About_Me.md</div>
        <div class="TreeItem" onclick="CloseAll()">📁 Projects</div>
        <div class="TreeItem" onclick="CloseAll()">📁 Creative</div>
    </nav>
</aside>`;

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
    <div class="Path" style="font-size: 0.9rem;">${State.IsMobile ? '📱 Mobile_OS' : 'Root / Portfolio'}</div>
    <button class="MenuBtn" onclick="ToggleRight()">ℹ️</button>
</header>`;

const GenerateContent = () => `
<article>
    <h1>${State.IsMobile ? 'Умный мобильный интерфейс' : 'Десктопная IDE'}</h1>
    <div class="MainText">
        <p>Теперь сайт полностью адаптирован:</p>
        <br>
        <ul>
            <li><b>Левая шторка:</b> Выезжает при нажатии на бургер слева.</li>
            <li><b>Правая шторка:</b> Выезжает при нажатии на иконку справа.</li>
            <li><b>Масштаб:</b> Шрифты и кнопки увеличены для удобного нажатия пальцами.</li>
            <li><b>Навигация:</b> Важные иконки переехали вниз (Bottom Dock), как в мобильных приложениях.</li>
        </ul>
        <br>
        <p>Попробуй потянуть или нажать на кнопки в углах!</p>
    </div>
</article>`;

// --- RENDER ---
function Generate(){
    const PortfolioElement = document.getElementById("Portfolio");
    if(!PortfolioElement) return;

    GenerateStyle();

    PortfolioElement.innerHTML = `
        <div class="Layout">
            <div class="Overlay" onclick="CloseAll()"></div>
            
            ${GenerateActivityBar()}
            ${GenerateLeftSidebar()}
            
            <main class="Main">
                ${GenerateHeader()}
                <div class="ScrollArea">
                    ${GenerateContent()}
                </div>
                ${!State.IsMobile ? `<footer> Ready | UTF-8 | JS </footer>` : ''}
            </main>
            
            ${GenerateRightSidebar()}
        </div>`;
}

document.addEventListener("DOMContentLoaded", Generate);