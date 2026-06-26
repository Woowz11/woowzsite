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
        if(this.Current === ID && ID !== JT_SCENES.ERROR){ return }
        if(!__Scenes.has(ID)){
            this.Set(JT_SCENES.ERROR)
            console.log(`Scene ${ID} not exist!`)
            return
        }

        console.log(`Set scene: ${ID}`)

        const Old = __Scenes.get(this.Current)
        if(Old && Old.OnExit){
            Old.OnExit()
        }

        this.Current = ID

        JT.Graphic.Background.Set(0x000000)
        JT.Graphic.Layer.Sky      .removeChildren()
        JT.Graphic.Layer.World    .removeChildren()
        JT.Graphic.Layer.Interface.removeChildren()
        JT.Game.Camera.Reset()

        const New = __Scenes.get(this.Current)
        if(New && New.OnEnter){
            New.OnEnter()
        }
    },

    /** Текущая сцена
     * @type JT_SCENES */
    Current: JT_SCENES.ERROR,

    __Update: function(DT){
        const Current = __Scenes.get(this.CurrentScene)
        if(Current && Current.OnUpdate){
            Current.OnUpdate(DT)
        }
    }
}

// ----------------------------------------------------------------------

JT.Scene.Register(JT_SCENES.ERROR, {
    OnEnter: function(){
        JT.Graphic.Background.Set(0xFF00FF)
    },

    OnExit: function(){

    },

    OnUpdate: function(DT){

    }
})
JT.Scene.Set(JT_SCENES.ERROR)

JT.Scene.Register(JT_SCENES.MAIN_MENU, Scene_MainMenu)
JT.Scene.Register(JT_SCENES.GAME, Scene_Game)

JT.Scene.Set(JT_SCENES.GAME)