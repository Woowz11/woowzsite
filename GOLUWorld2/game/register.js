const GW2_Floor = {
    Concrete: 0,

    Grass: 1,
    Wood: 2,
    Rock: 3,
    Water: 4,
    Sand: 5,
    Mud: 6
}

const GW2_Tile = {
    Concrete: 0,

    Brick: 1,
    Wood: 2,
    Metal: 3,
    Rock: 4
}

const GW2_Entity = {
    Player: 0
}

const RegisterAll = function(){
    GW2.Register.Floor  = {}
    GW2.Register.Tile   = {}
    GW2.Register.Entity = {}

    // ----------------------------------------------------------------------

    class Builder_Floor{
        __Build(ID){
            return {
                ID: ID
            }
        }
    }

    /**
     * @param {GW2_Floor} ID
     * @param {Builder_Floor} Floor
     */
    const Reg_Floor = function(ID, Floor){
        try{
            if(!Floor){ throw new Error("Нету Builder!") }

            GW2.Register.Floor[ID] = Floor.__Build(ID)

            console.log(`+: ${ID}, ${Floor}`)
        }catch(e){
            throw new Error(`Произошла ошибка при регистрации пола!\nID: ${ID}\n${e.message}`)
        }
    }

    class Builder_Tile{
        __Build(ID){
            return {
                ID: ID
            }
        }
    }

    /**
     * @param {GW2_Tile} ID
     * @param {Builder_Tile} Tile
     */
    const Reg_Tile = function(ID, Tile){
        try{
            if(!Tile){ throw new Error("Нету Builder!") }

            GW2.Register.Tile[ID] = Tile.__Build(ID)

            console.log(`+: ${ID}, ${Tile}`)
        }catch(e){
            throw new Error(`Произошла ошибка при регистрации тайла!\nID: ${ID}\n${e.message}`)
        }
    }

    class Builder_Entity{
        __Build(ID){
            return {
                ID: ID
            }
        }
    }

    /**
     * @param {GW2_Entity} ID
     * @param {Builder_Entity} Entity
     */
    const Reg_Entity = function(ID, Entity){
        try{
            if(!Entity){ throw new Error("Нету Builder!") }

            GW2.Register.Entity[ID] = Entity.__Build(ID)

            console.log(`+: ${ID}, ${Entity}`)
        }catch(e){
            throw new Error(`Произошла ошибка при регистрации сущности!\nID: ${ID}\n${e.message}`)
        }
    }

    // ----------------------------------------------------------------------

    const RegisterFloors = function(){
        console.group("Floor")

        Reg_Floor(GW2_Floor.Concrete, new Builder_Floor())

        console.groupEnd()
    }

    const RegisterTiles = function(){
        console.group("Tile")

        Reg_Tile(GW2_Tile.Concrete, new Builder_Tile())

        console.groupEnd()
    }

    const RegisterEntities = function(){
        console.group("Entity")

        Reg_Entity(GW2_Entity.Player, new Builder_Entity())

        console.groupEnd()
    }

    // ----------------------------------------------------------------------

    console.group("Регистрация")

    RegisterFloors  ()
    RegisterTiles   ()
    RegisterEntities()

    console.groupEnd()
}