const Init = async function(){
    console.group(`Инициализация игры ${GW2.Info.Version}`)

        Bootstrap()

        const GlobalRender = BootstrapRender()

        await LoadResources()

        const UpdateDebug = BootstrapDebug()

        BootstrapPlayer()
        BootstrapWorld ()

        RegisterAll()

        const StartGame = BootstrapGame(UpdateDebug, GlobalRender)

    console.groupEnd()

    StartGame()
}
Init()