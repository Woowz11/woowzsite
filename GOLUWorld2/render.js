// ----------------------------------------------------------------------

let __StartTime = performance.now()
const GlobalRender = function(DT){
    const Pixels = GW2.Render.Pixels

    const Time = (performance.now() - __StartTime) / 1000

    for(let i = 0; i < Pixels.length; i++){
        Pixels[i] = 0xFF000000 | (Math.random() * 0xFFFFFF)
    }

    GW2.Render.Present()
}