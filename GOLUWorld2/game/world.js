const GW2_Level = {
    TEST: 0
}

const BootstrapWorld = function(){
    GW2.Game.World = {
        Reset: function(){
            GW2.Game.Player.Camera.Reset()
            GW2.Game.Player.Reset()
        },

        /** @param {GW2_Level} Level */
        SetLevel: function(Level){
            console.log(`Установлен мир: ${Level}`)

            this.Level = Level

            this.Reset()
        },

        /** @type GW2_Level */
        Level: null
    }
}