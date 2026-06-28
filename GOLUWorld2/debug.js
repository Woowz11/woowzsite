let Debug  = document.getElementById("debug")

let __Fields = new Map()
let __Fields2 = new Map()

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
const UpdateDebug = function(DT){
    if(__Timer > 0.25){
        Set(0, `R-FPS: ${Math.floor(GW2.Render.FPS)} ${GW2.Render.DT}`)
        Set(1, `G-FPS: ${Math.floor(GW2.Game.FPS)} ${GW2.Game.DT}`)

        __Timer = 0
    }

    __Timer += DT

    Set(2, `Mouse: ${Math.round(GW2.Input.Mouse.X)}:${Math.round(GW2.Input.Mouse.Y)}`)
    Set(3, `Scene: ${GW2.Game.Scene}`)
}