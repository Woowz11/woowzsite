const GW2 = {
    Info: {
      Name: "GOLU World 2"
    },

    Render: {
        /** @type HTMLCanvasElement */
        Canvas: null,
        /** @type WebGL2RenderingContext */
        GL: null,

        W: -1,
        H: -1,

        Scale: 4,

        FPS: -1,
        DT: -1
    },

    Input: {
        Mouse: {
            X: -1,
            Y: -1
        }
    },

    Game: {
        FPS: -1,
        DT: -1,

        /** Текущая сцена */
        Scene: -1
    },

    Resource: {

    }
}

let __CreateSite = function(){
    console.log("Создание сайта...")

    let __CreateCanvas = function(){
        const Canvas = document.createElement("canvas")

        Canvas.style.imageRendering  = "pixelated"

        document.getElementById("render").appendChild(Canvas)

        return Canvas
    }

    GW2.Render.Canvas = __CreateCanvas()

    GW2.Render.GL = GW2.Render.Canvas.getContext("webgl2", {
        antialias            : false,
        alpha                : false,
        powerPreference      : "high-performance",
        preserveDrawingBuffer: true
    })

    if(!GW2.Render.GL){
        throw new Error("WEBGL2 не доступен!")
    }
}
__CreateSite()

let __RenderElement = document.getElementById("render")
let __ResizeCanvas = function(){
    let W = window.innerWidth
    let H = window.innerHeight

    const Padding = 64

    W -= Padding * 2
    H -= Padding * 2

    W = Math.max(256, Math.min(6400, W))
    H = Math.max(256, Math.min(6400, H))

    GW2.Render.W = W
    GW2.Render.H = H

    GW2.Render.W = Math.ceil(GW2.Render.W / GW2.Render.Scale)
    GW2.Render.H = Math.ceil(GW2.Render.H / GW2.Render.Scale)

    GW2.Render.Canvas.width  = GW2.Render.W
    GW2.Render.Canvas.height = GW2.Render.H

    __RenderElement.style.transform = `scale(${GW2.Render.Scale})`

    if(GW2.Render.GL){
        GW2.Render.GL.viewport(0, 0, GW2.Render.W, GW2.Render.H)
    }
}

window.addEventListener("resize", function(){
    __ResizeCanvas()
})

// ----------------------------------------------------------------------

window.addEventListener("mousemove", (e) => {
    const Rect = GW2.Render.Canvas.getBoundingClientRect()

    let X = (e.clientX - Rect.left) / GW2.Render.Scale
    let Y = (e.clientY - Rect.top ) / GW2.Render.Scale

    GW2.Input.Mouse.X = X
    GW2.Input.Mouse.Y = Y
})

// ----------------------------------------------------------------------
// Детект ошибок

let __Notify = (function() {
    let Container = null;
    let TimeOut = null;

    return function(Message, Duration = 5000){
        if(!Container){
            Container = document.createElement("div");
            Container.style.cssText = `
                position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
                z-index: 9999; font-family: sans-serif;
            `;
            document.body.appendChild(Container);
        }

        if(TimeOut){ clearTimeout(TimeOut); }
        Container.innerHTML = '';

        const DIV = document.createElement("div");
        DIV.style.cssText = `
            background: #ff4444; color: white; padding: 14px 24px;
            border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideDown 0.3s ease-out; font-size: 15px;
            max-width: 500px; text-align: center;
        `;
        DIV.textContent = `⚠️ ${Message}`;
        Container.appendChild(DIV);

        if(!document.getElementById("notify-style")){
            const Style = document.createElement("style");
            Style.id = "notify-style";
            Style.textContent = `
                @keyframes slideDown{
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(Style);
        }

        TimeOut = setTimeout(() => {
            DIV.style.opacity = '0';
            DIV.style.transition = 'opacity 0.3s';
            setTimeout(() => Container.innerHTML = '', 300);
            TimeOut = null;
        }, Duration);
    };
})();

window.onerror = function(Message, Source, Line, Column, Error) {
    __Notify(Error ? Error.message : Message);
    return false;
};

window.addEventListener("unhandledrejection", function(e) {
    __Notify(e.reason?.message || e.reason || "Promise ошибка");
});