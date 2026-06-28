const BootstrapGame = function(UpdateDebug, GlobalRender){
    const UpdateRender = function(DT){

    }

    const UpdateGame = function(){

    }

    // ----------------------------------------------------------------------

    const GW2_Scene = {
        Menu: 0
    }

    /**
     * Устанавливает сцену
     * @param {GW2_Scene} Scene Сцена
     */
    const SetScene = function(Scene){
        GW2.Game.Scene = Scene
    }

    // ----------------------------------------------------------------------

    return function(){
        const StartGlobalRender = function(){
            GW2.Render.Resize()

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

                    UpdateGame()
                    __GameAccumulator -= GAME_STEP
                }

                UpdateRender(GW2.Render.DT)

                GlobalRender(GW2.Render.DT)
                GW2.Render.Present()

                UpdateDebug(GW2.Render.DT)

                requestAnimationFrame(Render)
            }
            Render()
        }
        StartGlobalRender()

        document.title = GW2.Info.Name

        SetScene(GW2_Scene.Menu)
    }
}