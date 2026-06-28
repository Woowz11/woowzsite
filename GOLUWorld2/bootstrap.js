const GW2 = {
    Info: {
        Name   : "GOLU World 2",
        Version: "0.0.1"
    },

    Render: {
        /** @type HTMLCanvasElement */
        Canvas: null,
        /** @type CanvasRenderingContext2D */
        Context: null,
        /** @type ImageData */
        Buffer: null,
        /** @type Uint32Array */
        Pixels: null,

        W: -1,
        H: -1,

        Scale: 3,

        FPS: -1,
        DT: -1,

        /* Выводит пиксели на экран */
        Present: function(){
            const Pixels = this.Pixels
            const Data = this.Buffer.data
            const L = Pixels.length

            for(let i = 0; i < L; i++){
                const Color = Pixels[i]
                const I4 = i * 4

                Data[I4    ] = (Color >> 16) & 0xFF
                Data[I4 + 1] = (Color >> 8 ) & 0xFF
                Data[I4 + 2] =  Color        & 0xFF
                Data[I4 + 3] = 255
            }

            this.Context.putImageData(this.Buffer, 0, 0)
        },

        /** @type {function} */
        Resize: null
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

const Bootstrap = function(){
    let __CreateSite = function(){
        console.log("Создание сайта...")

        let __CreateCanvas = function(){
            const Canvas = document.createElement("canvas")

            Canvas.style.imageRendering  = "pixelated"

            document.getElementById("render").appendChild(Canvas)

            return Canvas
        }

        GW2.Render.Canvas = __CreateCanvas()

        GW2.Render.Context = GW2.Render.Canvas.getContext("2d", {
            alpha: false,
            desynchronized: false
        })

        if(!GW2.Render.Context){
            throw new Error("Canvas 2D контекст не доступен!")
        }
    }
    __CreateSite()

    let __RenderElement = document.getElementById("render")
    GW2.Render.Resize = function(){
        let W = window.innerWidth
        let H = window.innerHeight

        const Padding = 32

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

        GW2.Render.Buffer = GW2.Render.Context.createImageData(GW2.Render.W, GW2.Render.H)
        GW2.Render.Pixels = new Uint32Array(GW2.Render.W * GW2.Render.H)

        __RenderElement.style.transform = `scale(${GW2.Render.Scale})`
    }

    window.addEventListener("resize", GW2.Render.Resize)

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

            TimeOut = setTimeout(() => {
                DIV.style.opacity    = "0";
                DIV.style.transition = "opacity 0.3s";
                setTimeout(() => Container.innerHTML = "", 300);
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
}