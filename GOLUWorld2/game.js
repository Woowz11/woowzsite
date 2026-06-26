const StartGame = function(){
    const StartGlobalRender = function(){
        __ResizeCanvas()

        let Render = function(){
            GlobalRender()
            requestAnimationFrame(Render)
        }
        Render()
    }
    StartGlobalRender()
}

StartGame()