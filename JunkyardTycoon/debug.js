console.log("Load debug...")

let __Y = 10
let CreateDebugText = function(Text){
    const Scale = 1.5

    const Result = new PIXI.Text(Text ?? "New Debug Text", {
        fontFamily     : "monospace",
        fontSize       : 14 * Scale,
        padding        : 8,
        fill           : 0xFFFFFF,
        stroke         : 0x000000,
        strokeThickness: 4,
    })

    Result.x = 10
    Result.y = __Y

    __Y += (14 + 3) * Scale

    JT.Scene.Debug.addChild(Result)

    return Result
}

// ----------------------------------------------------------------------

let Text_RenderFPS  = CreateDebugText()
let Text_Rect       = CreateDebugText()
let Text_Camera     = CreateDebugText()
let Text_Mouse      = CreateDebugText()

const UpdateDebug = function(DT){
    Text_Rect.text = `Rect: (${JT.Graphic.W}x${JT.Graphic.H})`

    Text_Camera.text = `Camera: (${Math.floor(JT.Game.Camera.X)}, ${Math.floor(JT.Game.Camera.Y)})`

    Text_Mouse.text = `Mouse: (${Math.floor(JT.Input.Mouse.WX)}, ${Math.floor(JT.Input.Mouse.WY)})`
}

const UpdateDebug_Second = function(){
    Text_RenderFPS.text = `R-FPS: ${(Math.floor(JT.Graphic.Application.ticker.FPS * 10) / 10)}`
}