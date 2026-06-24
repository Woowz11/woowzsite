console.log("Load debug...")

let __Y = 10
let CreateDebugText = function(Text){
    const Scale = 1.5

    const Result = new PIXI.Text(Text, {
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

    DebugContainer.addChild(Result)

    return Result
}

// ----------------------------------------------------------------------

let Text_RenderFPS  = CreateDebugText("R-FPS: ?")
let Text_TEST = CreateDebugText("TEST: ?")

const UpdateDebug = function(DT){
    Text_TEST.text = `TEST: ${__TEST_TOTAL_TESTS}`
}

const UpdateDebug_Second = function(){
    Text_RenderFPS.text = `R-FPS: ${(Math.floor(GG.ticker.FPS * 10) / 10)}`
}