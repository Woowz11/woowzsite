const Update_Render = function(DT){
    UpdateDebug(DT)
}

const Update_Game = function(){

}

// ----------------------------------------------------------------------

const StartGame = function(){
    const StartGlobalRender = function(){
        __ResizeCanvas()

        let     __LastTime = performance.now()
        let __GameLastTime = performance.now()

        let __GameAccumulator = 0
        const GAME_STEP = 1/30
        let Render = function(){
            const Now = performance.now()

            GW2.Render.DT = (Now - __LastTime) / 1000
            GW2.Render.FPS = Math.round(1 / GW2.Render.DT)

            __LastTime = Now

            __GameAccumulator += GW2.Render.DT
            while(__GameAccumulator >= GAME_STEP){
                const GameNow = performance.now()

                GW2.Game.DT = (GameNow - __GameLastTime) / 1000
                GW2.Game.FPS = Math.round(1 / GW2.Game.DT)

                __GameLastTime = GameNow

                Update_Game()
                __GameAccumulator -= GAME_STEP
            }

            GlobalRender(GW2.Render.DT)

            Update_Render(GW2.Render.DT)

            requestAnimationFrame(Render)
        }
        Render()
    }
    StartGlobalRender()

    document.title = GW2.Info.Name
}

StartGame()