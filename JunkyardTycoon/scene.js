console.log("Load scene...")

const JT_SCENES = {
    ERROR: -1,
    MAIN_MENU: 0,
    GAME: 1
}

let __Scenes = new Map()

JT.Scene = {
    Register: function(ID, Scene){
        __Scenes.set(ID, Scene)
        console.log(`Scene ${ID} registered!`)
    },

    Set: function(ID){
        if(this.Current === ID){ return }
        if(!__Scenes.has(ID)){
            this.Set(JT_SCENES.ERROR)
            console.log(`Scene ${ID} not exist!`)
            return
        }

        console.log(`Set scene: ${ID}`)

        if(this.Current !== -1){
            const Current = __Scenes.get(this.Current)
            if(Current && Current.OnExit){
                Current.OnExit()
            }
        }

        this.Current = ID

        if(this.Current !== -1){
            JT.Graphic.Layer.World    .removeChildren()
            JT.Graphic.Layer.Interface.removeChildren()
            JT.Game.Camera.Reset()

            const Current = __Scenes.get(this.Current)
            if(Current && Current.OnEnter){
                Current.OnEnter()
            }
        }
    },

    Current: -1
}

// ----------------------------------------------------------------------

JT.Scene.Register(JT_SCENES.ERROR, {
    OnEnter: function(){

    },

    OnExit: function(){

    }
})

JT.Scene.Register(JT_SCENES.MAIN_MENU, Scene_MainMenu)
JT.Scene.Register(JT_SCENES.GAME, Scene_Game)

JT.Scene.Set(JT_SCENES.GAME)