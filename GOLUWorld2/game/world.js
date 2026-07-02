const GW2_Level = {
    TEST: 0
}

const BootstrapWorld = function(){
    GW2.Game.World = {
        Reset: function(){
            this.Map.ClearAll()

            GW2.Game.Player.Reset()
            GW2.Game.Player.Camera.Reset(true)
        },

        /** [АВТО]
         * @type GW2_Level */
        __Level: null,

        set Level(V){
            try{
                console.log(`Установлен мир: ${V}`)

                this.__Level = V

                this.Map.Generator.TESTGENERATE()
            }catch(e){
                throw new Error(`Произошла ошибка при установке мира!\nМир: ${V}\n${e.message}`)
            }
        },

        get Level(){ return this.__Level },

        Map: {
            ClearAll: function(){
                this.Floor  = {}
                this.Tile   = {}
                this.Entity = []
            },

            Floor : {},
            Tile  : {},
            Entity: [],

            TileSize: 16,

            // ----------------------------------------------------------------------

            SetFloor: function(X, Y, ID, Absolute = false){
                if(!Absolute){
                    X *= this.TileSize
                    Y *= this.TileSize
                }

                if(!this.Floor[X]){ this.Floor[X] = {} }
                this.Floor[X][Y] = ID
            },

            GetFloor: function(X, Y, Absolute = false){
                if(!Absolute){
                    X *= this.TileSize
                    Y *= this.TileSize
                }

                return this.Floor[X]?.[Y]
            },

            // ----------------------------------------------------------------------

            SetTile: function(X, Y, ID, Absolute = false){
                if(!Absolute){
                    X *= this.TileSize
                    Y *= this.TileSize
                }

                if(!this.Tile[X]){ this.Tile[X] = {} }
                this.Tile[X][Y] = ID
            },

            GetTile: function(X, Y, Absolute = false){
                if(!Absolute){
                    X *= this.TileSize
                    Y *= this.TileSize
                }

                return this.Tile[X]?.[Y]
            },

            Generator: {
                TESTGENERATE: function(){
                    const Map = GW2.Game.World.Map

                    const W = 30
                    const H = 20

                    for (let y = 0; y < H; y++) {
                        for (let x = 0; x < W; x++) {
                            Map.SetFloor(x, y, GW2_Floor.Concrete);
                        }
                    }

                    for (let x = 0; x < W; x++) {
                        Map.SetTile(x, 0, GW2_Tile.Concrete);
                        Map.SetTile(x, H - 1, GW2_Tile.Concrete);
                    }
                    for (let y = 0; y < H; y++) {
                        Map.SetTile(0, y, GW2_Tile.Concrete);
                        Map.SetTile(W - 1, y, GW2_Tile.Concrete);
                    }
                }
            }
        }
    }
}