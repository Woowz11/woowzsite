const GW2_Alpha = {
    /* Нет Alpha */
    None: 0,
    /* Только не прозрачные и полностью прозрачные */
    Cutout: 1,
    /* Есть полу-прозрачные */
    Transparent: 2
}

const BootstrapRender = function(){
    const Render = GW2.Render
    Render.Debug = {
        PixelChanged: 0
    }

    // ----------------------------------------------------------------------

    /* Цвет заднего фона */
    let BackgroundColor = 0xFF00FF

    let Time = 0

    // ----------------------------------------------------------------------

    /**
     * Удаляет прозрачный канал из цвета
     * @param {number} Color Цвет
     * @return {number} Цвет без Alpha
     */
    Render.RemoveAlpha = function(Color){
        return Color >>> 8
    }

    /**
     * Проверяет, цвет полностью прозрачный или нет
     * @param {number} Color Цвет
     * @return {boolean} Цвет полностью прозрачный?
     */
    Render.FullTransparent = function(Color){
        return (Color & 0xFF) === 0
    }

    /**
     * Превращает цвет в CSS цвет
     * @param {number} Color Цвет
     * @param {boolean} HasAlpha Есть Alpha?
     * @return {string} CSS цвет
     */
    Render.ColorToCSS = function(Color, HasAlpha = false){
        if(HasAlpha){
            return `rgba(${(Color >> 24) & 0xFF},${(Color >> 16) & 0xFF},${(Color >> 8) & 0xFF},${(Color & 0) / 255})`
        }

        return "#" + (Color & 0xFFFFFF).toString(16).padStart(6, "0")
    }

    /**
     * Получает цвет из градиента
     * @param {[[number, number]]} Gradient Градиент (Позиция, Цвет)
     * @param {number} Position Позиция (0-1)
     * @param {boolean} HasAlpha Есть Alpha?
     * @return {number} Цвет
     */
    Render.GetColorGradient = function(Gradient, Position, HasAlpha = false){
        if(!Gradient || Gradient.length === 0){ return 0xFF00FF }
        if(Gradient.length === 1){ return Gradient[0][1] }

        const __OriginalPosition = Position
        Position = Position % 1
        if(Position < 0){ Position += 1 }
        if(Position === 0 && __OriginalPosition > 0){ Position = 1 }

        let S1 = Gradient[0]
        let S2 = Gradient[Gradient.length - 1]

        for(let i = 0; i < Gradient.length - 1; i++){
            if(Position >= Gradient[i][0] && Position <= Gradient[i + 1][0]){
                S1 = Gradient[i    ]
                S2 = Gradient[i + 1]
                break
            }
        }

        let LocalPosition = (S1[0] === S2[0]) ? 0 : (Position - S1[0]) / (S2[0] - S1[0])

        const C1 = S1[1]
        const C2 = S2[1]

        if(HasAlpha){
            const R1 = (C1 >> 24) & 0xFF, R2 = (C2 >> 24) & 0xFF
            const G1 = (C1 >> 16) & 0xFF, G2 = (C2 >> 16) & 0xFF
            const B1 = (C1 >> 8 ) & 0xFF, B2 = (C2 >> 8 ) & 0xFF
            const A1 =  C1        & 0xFF, A2 =  C2        & 0xFF

            const R = (R1 + (R2 - R1) * LocalPosition) | 0
            const G = (G1 + (G2 - G1) * LocalPosition) | 0
            const B = (B1 + (B2 - B1) * LocalPosition) | 0
            const A = (A1 + (A2 - A1) * LocalPosition) | 0

            return ((R << 24) | (G << 16) | (B << 8) | A) >>> 0
        }else{
            const R1 = (C1 >> 16) & 0xFF, R2 = (C2 >> 16) & 0xFF
            const G1 = (C1 >> 8 ) & 0xFF, G2 = (C2 >> 8 ) & 0xFF
            const B1 =  C1        & 0xFF, B2 =  C2        & 0xFF

            const R = (R1 + (R2 - R1) * LocalPosition) | 0
            const G = (G1 + (G2 - G1) * LocalPosition) | 0
            const B = (B1 + (B2 - B1) * LocalPosition) | 0

            return ((R << 16) | (G << 8) | B) >>> 0
        }
    }

    // ----------------------------------------------------------------------

    /**
     * Устанавливает цвет пикселя на экране (низкий уровень)
     * @param {number} i Индекс
     * @param {number} Color Цвет
     */
    Render.SetRawPixel = function(i, Color){
        Render.Pixels[i] = Color
        Render.Debug.PixelChanged++
    }

    /**
     * Устанавливает цвет пикселя на экране
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @param {number} Color Цвет
     */
    Render.SetPixel = function(X, Y, Color){
        if(X < 0 || X >= Render.W || Y < 0 || Y >= Render.H){ return }
        Render.SetRawPixel((Y | 0) * Render.W + (X | 0), Color)
    }

    /**
     * Заполняет весь экран цветом
     * @param {number} Color Цвет
     */
    Render.Fill = function(Color){
        Render.Pixels.fill(Color)
    }

    /**
     * Рендерит прямоугольник
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @param {number} W Ширина
     * @param {number} H Высота
     * @param {number} Color Цвет
     */
    Render.Rect = function(X, Y, W, H, Color){
        const X1 = Math.max(0, X | 0)
        const Y1 = Math.max(0, Y | 0)
        const X2 = Math.min(Render.W, (X + W) | 0)
        const Y2 = Math.min(Render.H, (Y + H) | 0)

        if(X1 >= X2 || Y1 >= Y2){ return }

        for(let PY = Y1; PY < Y2; PY++){
            const RowOffset = PY * Render.W
            for(let PX = X1; PX < X2; PX++){
                Render.SetRawPixel(RowOffset + PX, Color)
            }
        }
    }

    /**
     * Простой рендер текстуры
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @param {GW2_Texture} Texture Текстура
     */
    Render.Texture = function(X, Y, Texture){
        const T = GW2.Resource.Texture.Get(Texture)

        const IX = X | 0
        const IY = Y | 0

        const X1 = Math.max(0, IX)
        const Y1 = Math.max(0, IY)
        const X2 = Math.min(Render.W, IX + T.W)
        const Y2 = Math.min(Render.H, IY + T.H)

        if(X1 >= X2 || Y1 >= Y2){ return }

        const OffsetX = X1 - IX
        const OffsetY = Y1 - IY

        for(let PY = Y1; PY < Y2; PY++){
            const RowOffset = PY * Render.W
            const TextureRow = (PY - Y1 + OffsetY) * T.W
            for(let PX = X1; PX < X2; PX++){
                let Color = T.Pixels[TextureRow + (PX - X1 + OffsetX)]

                if(T.Alpha !== GW2_Alpha.None){
                    if(Render.FullTransparent(Color)){ continue }

                    Color = Render.RemoveAlpha(Color)
                }

                Render.SetRawPixel(RowOffset + PX, Color)
            }
        }
    }

    // ----------------------------------------------------------------------

    /* Умный рендер */
    Render.Smart = {}
    const Smart = Render.Smart

    /* Используемый цвет (поддерживает Alpha) */
    Smart.Color = 0xFF00FF

    Smart.X
    Smart.Y

    Smart.SetPosition = function(X, Y){
        Smart.X = X
        Smart.Y = Y
        return Smart
    }

    Smart.W
    Smart.H

    Smart.SetSize = function(W, H){
        Smart.W = W
        Smart.H = H
        return Smart
    }

    Smart.PX
    Smart.PY

    Smart.SetPivot = function(PX, PY){
        Smart.PX = PX
        Smart.PY = PY
        return Smart
    }

    Smart.ResetTransform = function(){
        Smart.X = 0
        Smart.Y = 0
        Smart.W = 0
        Smart.H = 0
        Smart.PX = 0.5
        Smart.PY = 0.5
    }
    Smart.ResetTransform()

    // ----------------------------------------------------------------------

    const RenderCurrentScene = function(){
        const Scene = GW2.Game.Scene

        BackgroundColor = 0xFF0000

        for(let i = 0; i < 10; i++){
            Render.Texture(Math.sin(Time / 10 / 10 * i) * Render.W / 2 + Render.W / 2, -Math.cos(Time / 10 + i * 2) * Render.H / 2 + Render.H / 2, GW2_Texture.Test)
        }

        Render.SetPixel(GW2.Input.Mouse.X, GW2.Input.Mouse.Y, 0x0000FF)
    }

    // ----------------------------------------------------------------------

    let __ResetInfo = function(){
        Render.Debug.PixelChanged = 0
    }

    return function(DT){
        __ResetInfo()

        Time += DT

        Render.Fill(BackgroundColor)

        RenderCurrentScene()
    }
}