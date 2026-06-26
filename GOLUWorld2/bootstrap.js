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
        DT: -1
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