const BootstrapDebug = function(){
    let Debug  = document.getElementById("debug")

    let __Fields = new Map()

    let __i = 1/4
    const Gradient_Stress = [
        [__i*0, 0xFFFFFF],
        [__i*1, 0xFFFF00],
        [__i*2, 0xFF0000],
        [__i*3, 0xFF00FF],
        [__i*4, 0x00FFFF]
    ]

    let Set = function(ID, HTML){
        let Field = __Fields.get(ID)
        if(!Field){
            Field = document.createElement("div")
            Debug.appendChild(Field)

            __Fields.set(ID, Field)
        }
        Field.innerHTML = HTML
    }

    let __Timer = Infinity
    return function(DT){
        if(__Timer > 0.25){
            Set(0, `R-FPS: ${Math.floor(GW2.Render.FPS)} ${GW2.Render.DT}`)
            Set(1, `G-FPS: ${Math.floor(GW2.Game.FPS)} ${GW2.Game.DT}`)

            __Timer = 0
        }

        __Timer += DT

        Set(2, `Screen: ${GW2.Render.W}x${GW2.Render.H}`)
        Set(3, `Mouse: ${Math.round(GW2.Input.Mouse.X)}:${Math.round(GW2.Input.Mouse.Y)}, W: ${GW2.Input.Mouse.WX.toFixed(1)}:${GW2.Input.Mouse.WY.toFixed(1)}, T: ${GW2.Input.Mouse.TX.toFixed()}:${GW2.Input.Mouse.TY.toFixed()}`)
        Set(4, `Scene: ${GW2.Game.Scene}`)
        Set(5, `PixelChanged: <e style="color:${GW2.Render.ColorToCSS(GW2.Render.GetColorGradient(Gradient_Stress, Math.min(GW2.Render.Debug.PixelChanged / 10000000, 1)))};">${GW2.Render.Debug.PixelChanged} [${(GW2.Render.Debug.PixelChanged / 10000000 * 100).toFixed(2)}%]</e>`)
        Set(6, `Position: ${GW2.Game.Player.X.toFixed(1)}:${GW2.Game.Player.Y.toFixed(1)}, Velocity: ${GW2.Game.Player.Velocity.X.toFixed(2)}:${GW2.Game.Player.Velocity.Y.toFixed(2)} (${GW2.Game.Player.Velocity.Magnitude.toFixed(2)})`)
    }
}