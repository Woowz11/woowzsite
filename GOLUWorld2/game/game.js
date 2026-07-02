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

        GW2.Game.World.Reset()

        if(Scene === GW2_Scene.World){
            GW2.Game.World.Level = GW2_Level.TEST
        }
    }

    // ----------------------------------------------------------------------

    const UpdatePre = function(DT){
        let MousePosition = GW2.Game.LocalToWorld(GW2.Input.Mouse.X, GW2.Input.Mouse.Y)
        GW2.Input.Mouse.WX = MousePosition[0]
        GW2.Input.Mouse.WY = MousePosition[1]

        MousePosition = GW2.Game.WorldToTile(GW2.Input.Mouse.WX, GW2.Input.Mouse.WY)
        GW2.Input.Mouse.TX = MousePosition[0]
        GW2.Input.Mouse.TY = MousePosition[1]

        GW2.Render.Rect.L.V = 0
        GW2.Render.Rect.U.V = 0

        GW2.Render.Rect.R.V = GW2.Render.W
        GW2.Render.Rect.B.V = GW2.Render.H

        let LU = GW2.Game.LocalToWorld(GW2.Render.Rect.L.V, GW2.Render.Rect.U.V)
        let RB = GW2.Game.LocalToWorld(GW2.Render.Rect.R.V, GW2.Render.Rect.B.V)

        GW2.Render.Rect.L.WV = LU[0]
        GW2.Render.Rect.U.WV = LU[1]
        GW2.Render.Rect.R.WV = RB[0]
        GW2.Render.Rect.B.WV = RB[1]

        LU = GW2.Game.WorldToTile(GW2.Render.Rect.L.WV, GW2.Render.Rect.U.WV)
        RB = GW2.Game.WorldToTile(GW2.Render.Rect.R.WV, GW2.Render.Rect.B.WV)

        GW2.Render.Rect.L.TV = LU[0]
        GW2.Render.Rect.U.TV = LU[1]
        GW2.Render.Rect.R.TV = RB[0]
        GW2.Render.Rect.B.TV = RB[1]
    }

    const UpdateGame = function(DT){
        if(GW2.Game.Scene === GW2_Scene.World){
            GW2.Game.Player.Update(DT)

            GW2.Game.Player.Camera.Update(DT)
        }
    }

    const UpdatePost = function(DT){

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

                UpdatePre(GW2.Render.DT)

                __GameAccumulator += GW2.Render.DT
                while(__GameAccumulator >= GAME_STEP){
                    const GameNow = performance.now()

                    GW2.Game.DT = (GameNow - __GameLastTime) / 1000
                    GW2.Game.FPS = Math.round(1 / GW2.Game.DT)

                    __GameLastTime = GameNow

                    UpdateGame(GAME_STEP)
                    __GameAccumulator -= GAME_STEP
                }

                UpdatePost(GW2.Render.DT)

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