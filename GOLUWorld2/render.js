const Render = GW2.Render

GW2_Alpha = {
    /* Нет Alpha */
    None: 0,
    /* Только не прозрачные и полностью прозрачные */
    Cutout: 1,
    /* Есть полу-прозрачные */
    Transparent: 2
}

// ----------------------------------------------------------------------

/* Цвет заднего фона */
let BackgroundColor = 0xFF00FF

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
 * Устанавливает цвет пикселя на экране
 * @param {number} X Позиция по X
 * @param {number} Y Позиция по Y
 * @param {number} Color Цвет
 */
Render.SetPixel = function(X, Y, Color){
    if(X < 0 || X >= Render.W || Y < 0 || Y >= Render.H){ return }
    Render.Pixels[(Y | 0) * Render.W + (X | 0)] = Color
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
            Render.Pixels[RowOffset + PX] = Color
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

    const X1 = Math.max(0, X | 0)
    const Y1 = Math.max(0, Y | 0)
    const X2 = Math.min(Render.W, (X + T.W) | 0)
    const Y2 = Math.min(Render.H, (Y + T.H) | 0)

    if(X1 >= X2 || Y1 >= Y2){ return }

    const OffsetX = X1 - (X | 0)
    const OffsetY = Y1 - (Y | 0)

    for(let PY = Y1; PY < Y2; PY++){
        const RowOffset = PY * Render.W
        const TextureRow = (PY - Y1 + OffsetY) * T.W
        for(let PX = X1; PX < X2; PX++){
            let Color = T.Pixels[TextureRow + (PX - X1 + OffsetX)]

            if(T.Alpha !== GW2_Alpha.None){
                if(Render.FullTransparent(Color)){ continue }

                Color = Render.RemoveAlpha(Color)
            }

            Render.Pixels[RowOffset + PX] = Color
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

    Render.Texture(Render.W / 2, Render.H / 2, GW2_Texture.Test)
}

// ----------------------------------------------------------------------

const GlobalRender = function(DT){
    Render.Fill(BackgroundColor)

    RenderCurrentScene()
}