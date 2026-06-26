const GW2 = {
    Render: {
        /** @type HTMLCanvasElement */
        Canvas: null,
        Context: null,

        W: -1,
        H: -1,

        Scale: 4
    }
}

let __CreateSite = function(){
    console.log("Создание сайта...")

    let __CreateCanvas = function(){
        const Canvas = document.createElement("canvas")

        Canvas.style.imageRendering  = "pixelated"
        Canvas.style.backgroundColor = "#FFFFFF"

        document.body.appendChild(Canvas)

        return Canvas
    }

    GW2.Render.Canvas = __CreateCanvas()
    GW2.Render.Context = GW2.Render.Canvas.getContext("2d")

}
__CreateSite()

let __TESTRENDER = function(){
    const ctx = GW2.Render.Context
    const W = GW2.Render.W
    const H = GW2.Render.H

    // Палитра для пиксельной игры
    const palette = [
        [0, 0, 0],       // чёрный
        [255, 255, 255], // белый
        [255, 0, 0],     // красный
        [0, 255, 0],     // зелёный
        [0, 0, 255],     // синий
        [255, 255, 0],   // жёлтый
        [255, 0, 255],   // розовый
        [0, 255, 255],   // голубой
        [255, 128, 0],   // оранжевый
        [128, 0, 255],   // фиолетовый
    ]

    const imageData = ctx.createImageData(W, H)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const color = palette[Math.floor(Math.random() * palette.length)]
        data[i] = color[0]
        data[i+1] = color[1]
        data[i+2] = color[2]
        data[i+3] = 255
    }

    ctx.putImageData(imageData, 0, 0)
}

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

    GW2.Render.Canvas.style.transform = `scale(${GW2.Render.Scale})`

    __TESTRENDER()
}

window.addEventListener("resize", function(){
    __ResizeCanvas()
})
__ResizeCanvas()