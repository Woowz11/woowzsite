const GW2_Scene = {
    Menu: 0,

    World: 1
}

const BootstrapGame = function(UpdateDebug, GlobalRender){
    /**
     * Устанавливает сцену
     * @param {GW2_Scene} Scene Сцена
     */
    GW2.Game.SetScene = function(Scene){
        const CurrentScene = GW2.Game.Scene

        if(CurrentScene === Scene){ return }

        console.log(`Установлена сцена: ${Scene}`)
        GW2.Game.Scene = Scene

        if(Scene === GW2_Scene.World){
            GW2.Game.World.SetLevel(GW2_Level.TEST)
        }
    }

    // ----------------------------------------------------------------------

    const UpdateRender = function(DT){

    }

    const UpdateGame = function(DT){
        if(GW2.Game.Scene !== GW2_Scene.Menu){
            GW2.Game.Player.Update(DT)

            GW2.Game.Player.Camera.Update(DT)
        }
    }

    GW2.Game.__Events.KeyboardInput = function(Key, Release){
        if(Release){ return }

        console.debug(`Клавиша нажата: ${Key}`)

        if(Key === "Digit1"){
            GW2.Game.SetScene(GW2_Scene.Menu)
        }else if(Key === "Digit2"){
            GW2.Game.SetScene(GW2_Scene.World)
        }else if(Key === "Digit3"){
            GW2.Game.SetScene(-1)
        }
    }

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

                    UpdateGame(GAME_STEP)
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

        GW2.Game.SetScene(GW2_Scene.Menu)
    }
}