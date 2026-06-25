console.log("Load game...")

const UpdateTitle = function(){
    document.title = JT.Game.Info.Name
}

/**
 * Устанавливает текущую сцену
 * @param Scene Сцена (0 - Главное меню, 1 - Игра)
 */
const SetScene = function(Scene){
    console.log("Set scene: " + Scene)

    __CurrentScene = Scene

    switch(Scene){
        case 0: {
            break
        }
        case 1: {
            console.log("Starting game!")
            break
        }
    }
}
let __CurrentScene = -1

const GetCurrentScene = function(){ return __CurrentScene }






SetScene(0)

SetScene(1)