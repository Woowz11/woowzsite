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
     * Превращает RGB, RGBA в HEX
     * @param {number} R Красный канал (0-255)
     * @param {number} G Зелёный канал (0-255)
     * @param {number} B Синий канал (0-255)
     * @param {number} A Альфа канал (0-255)
     * @return {number} HEX
     */
    Render.ToHEX = function(R, G, B, A= undefined){
        if(A === undefined){
            return ((R << 16) | (G << 8) | B) >>> 0
        }else{
            return ((R << 24) | (G << 16) | (B << 8) | A) >>> 0
        }
    }

    /**
     * Возвращает случайный цвет
     * @param {boolean} Alpha С альфа каналом?
     * @return {number} HEX цвет
     */
    Render.RandomColor = function(Alpha = undefined){
        return Render.ToHEX((Math.random() * 256) | 0, (Math.random() * 256) | 0, (Math.random() * 256) | 0, Alpha === undefined ? undefined : (Math.random() * 256) | 0)
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
     * Устанавливает цвет пикселя в буфер (низкий уровень)
     * @param {number} i Индекс
     * @param {number} Color Цвет
     */
    Render.SetRawPixel = function(i, Color){
        Render.Pixels[i] = Color
        Render.Debug.PixelChanged++
    }

    /**
     * Пиксель выходит за пределы буфера?
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @return {boolean} Выходит?
     */
    Render.PixelOutbound = function(X, Y){
        return X < 0 || X >= Render.W || Y < 0 || Y >= Render.H
    }

    /**
     * Устанавливает цвет пикселя в буфер
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @param {number} Color Цвет
     */
    Render.SetPixel = function(X, Y, Color){
        if(Render.PixelOutbound(X, Y)){ return }
        Render.SetRawPixel((Y | 0) * Render.W + (X | 0), Color)
    }

    /**
     * Получает пиксель с буфера
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @return {number} Цвет
     */
    Render.GetPixel = function(X, Y){
        if(Render.PixelOutbound(X, Y)){ return 0xFF00FF }
        return Render.Pixels[(Y | 0) * Render.W + (X | 0)]
    }

    /**
     * Заполняет весь экран цветом
     * @param {number} Color Цвет
     */
    Render.Fill = function(Color){
        Render.Pixels.fill(Color)
    }

    /**
     * Рисует линию из двух точек
     * @param {number} X1 Точка 1, позиция X
     * @param {number} Y1 Точка 1, позиция Y
     * @param {number} X2 Точка 2, позиция X
     * @param {number} Y2 Точка 2, позиция Y
     * @param {number} Color Цвет
     */
    Render.Line = function(X1, Y1, X2, Y2, Color){
        X1 = X1 | 0
        Y1 = Y1 | 0
        X2 = X2 | 0
        Y2 = Y2 | 0

        const DX =  Math.abs(X2 - X1)
        const DY = -Math.abs(Y2 - Y1)
        const SX = X1 < X2 ? 1 : -1
        const SY = Y1 < Y2 ? 1 : -1
        let Error = DX + DY

        while(true){
            Render.SetPixel(X1, Y1, Color)

            if(X1 === X2 && Y1 === Y2){ break }

            const Error2 = Error * 2
            if(Error2 >= DY){
                if(X1 === X2){ break }
                Error += DY
                X1 += SX
            }
            if(Error2 <= DX){
                if(Y1 === Y2){ break }
                Error += DX
                Y1 += SY
            }
        }
    }

    /**
     * Рендерит прямоугольник
     * @param {number} X Позиция по X
     * @param {number} Y Позиция по Y
     * @param {number} W Ширина
     * @param {number} H Высота
     * @param {number} Color Цвет
     */
    Render.Square = function(X, Y, W, H, Color){
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

    const RenderFloor = function(){
        /*const TileSize = 16

        const OffsetX = GW2.Game.Player.Camera.X
        const OffsetY = GW2.Game.Player.Camera.Y

        const W = Render.W
        const H = Render.H

        const Color = Render.ToHEX(64, 0, 0)

        for(let Y = 0; Y < H; Y++){
            const WY = (Y + OffsetY) / TileSize
            const RI = Math.floor(WY)

            const RO = Y * W

            for(let X = 0; X < W; X++){
                const WX = (X + OffsetX) / TileSize
                const CI = Math.floor(WX)

                const IsEven = (RI + CI) % 2 === 0

                if(IsEven){
                    Render.SetRawPixel(RO + X, Color)
                }
            }
        }*/

        for(let Y = GW2.Render.Rect.U.TV - GW2.Game.World.Map.TileSize; Y < GW2.Render.Rect.B.TV + GW2.Game.World.Map.TileSize * 2; Y += GW2.Game.World.Map.TileSize){
            for(let X = GW2.Render.Rect.L.TV - GW2.Game.World.Map.TileSize; X < GW2.Render.Rect.R.TV + GW2.Game.World.Map.TileSize * 2; X += GW2.Game.World.Map.TileSize){
                if(GW2.Game.World.Map.GetFloor(X, Y, true) === GW2_Floor.Concrete){
                    let Position = GW2.Game.WorldToLocal(X, Y)

                    Render.Texture(Position[0], Position[1], GW2_Texture.ConcreteFloor)
                }
            }
        }
    }

    const RenderTiles = function(){
        for(let Y = GW2.Render.Rect.U.TV - GW2.Game.World.Map.TileSize; Y < GW2.Render.Rect.B.TV + GW2.Game.World.Map.TileSize * 2; Y += GW2.Game.World.Map.TileSize){
            for(let X = GW2.Render.Rect.L.TV - GW2.Game.World.Map.TileSize; X < GW2.Render.Rect.R.TV + GW2.Game.World.Map.TileSize * 2; X += GW2.Game.World.Map.TileSize){
                if(GW2.Game.World.Map.GetTile(X, Y, true) === GW2_Tile.Concrete){
                    let Position = GW2.Game.WorldToLocal(X, Y)

                    Render.Texture(Position[0], Position[1], GW2_Texture.ConcreteTile)
                }
            }
        }
    }

    const RenderPlayer = function(){
        let ZeroPosition = GW2.Game.WorldToLocal(0, 0)

        let PlayerPosition = GW2.Game.WorldToLocal(GW2.Game.Player.X, GW2.Game.Player.Y)

        Render.Line(PlayerPosition[0], PlayerPosition[1], ZeroPosition[0], ZeroPosition[1], 0xFFFF00)

        Render.Texture(ZeroPosition[0] + 50, ZeroPosition[1] + 50, GW2_Texture.Player)

        Render.Texture(PlayerPosition[0] - 16/2, PlayerPosition[1] - 16/2, GW2_Texture.Player)
    }

    const RenderEntities = function(){
        RenderPlayer()
    }

    const RenderMap = function(){
        RenderFloor()

        RenderTiles()

        RenderEntities()
    }

    const RenderCurrentScene = function(){
        switch(GW2.Game.Scene){
            case GW2_Scene.Menu: {
                BackgroundColor = Render.ToHEX(128, 128, 128)
                Render.Fill(BackgroundColor)

                break
            }
            case GW2_Scene.World: {
                BackgroundColor = Render.ToHEX(255/8, 0, 0)
                Render.Fill(BackgroundColor)

                RenderMap()

                break
            }
            default: {
                const __Perimeter = function(T) {
                    T = ((T % 1) + 1) % 1;

                    const W = Render.W
                    const H = Render.H
                    const Perimeter = 2 * (W + H)
                    let D = T * Perimeter

                    if(D < W){ return [D    , 0    ] } D -= W
                    if(D < H){ return [W - 1, D    ] } D -= H
                    if(D < W){ return [W - D, H - 1] } D -= W
                    return [0, H - D]
                }

                const PC1 = __Perimeter(Time * 0.95)
                const PC2 = __Perimeter(Time * 0.4)
                Render.Line(GW2.Input.Mouse.X, GW2.Input.Mouse.Y, PC1[0], PC2[1], Render.RandomColor())
                Render.Line(GW2.Input.Mouse.X, GW2.Input.Mouse.Y, PC2[0], PC1[1], Render.RandomColor())

                Render.Square(Math.random() * (GW2.Render.W + 30) - 30, Math.random() * (GW2.Render.H + 30) - 30, Math.random() * GW2.Render.W / 10, Math.random() * GW2.Render.H / 10, 0x000000)
            }
        }
    }

    // ----------------------------------------------------------------------

    const RenderCursor = function(){
        const X = GW2.Input.Mouse.X
        const Y = GW2.Input.Mouse.Y

        Render.Texture(X, Y, GW2_Texture.Cursor)
    }

    const RenderInterface = function(){
        RenderCursor()
    }

    // ----------------------------------------------------------------------

    let __ResetInfo = function(){
        Render.Debug.PixelChanged = 0
    }

    return function(DT){
        __ResetInfo()

        Time += DT

        RenderCurrentScene()

        RenderInterface()
    }
}