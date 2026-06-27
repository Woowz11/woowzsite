const GW2_MaxTextures = 64
const GW2_MaxTextureSize = 10 * 4
const GW2_MaxTexturePixels = GW2_MaxTextures * GW2_MaxTextureSize
const GW2_MaxTextureID = 1000

GW2.Resource.Textures = {
    __Cache: {
        /* ID -> Index, Получает программное ID текстуры */
        ID: new Int32Array(GW2_MaxTextureID).fill(-1),
        /* Index -> Offset, Позиция с которой надо читать пиксели */
        Offset: new Int32Array(GW2_MaxTextures).fill(-1),
        /* Index -> Width, Ширина текстуры */
        Width : new Int32Array(GW2_MaxTextures).fill(-1),
        /* Index -> Height, Высота текстуры */
        Height: new Int32Array(GW2_MaxTextures).fill(-1),
        /* Index -> Alpha, Содержит Alpha? */
        Alpha : new Int32Array(GW2_MaxTextures).fill(-1),
        /* Offset -> Pixel, Пиксели текстуры */
        Pixels: new Float32Array(GW2_MaxTexturePixels).fill(-1),

        /* Кол-во зарегистрированных текстур */
        Count: 0
    },

    Textures: {}
}

let __CurrentOffset = 0

/**
 * Регистрирует текстуру в память
 * @param {number} ID ID текстуры
 * @param {number} Width Ширина текстуры
 * @param {number} Height Высота текстуры
 * @param {boolean} Alpha Содержит alpha канал?
 * @param {number[3,4][]} Pixels Пиксели текстуры
 */
let RegisterTexture = function(ID, Width, Height, Alpha, Pixels){
    try{
        const Cache = GW2.Resource.Textures.__Cache

        if(Cache.ID[ID] !== -1){
            throw new Error("Текстура с таким ID уже существует!")
        }

        if(Cache.Count >= GW2_MaxTextures){
            throw new Error(`Достигнут лимит текстур ${GW2_MaxTextures}!`)
        }

        const Channels = Alpha ? 4 : 3
        const PixelCount = Width * Height
        const DataCount = PixelCount * Channels

        if(__CurrentOffset + DataCount > GW2_MaxTexturePixels){
            throw new Error(`Достигнут лимит по кол-во пикселей ${GW2_MaxTexturePixels}!`)
        }

        if(!Pixels || Pixels.length < PixelCount){
            throw new Error(`Недостаточно пикселей для текстуры! Нужно: ${PixelCount}, а доступно ${Pixels.length}`)
        }

        const Index = Cache.Count

        Cache.ID[ID] = Index

        Cache.Offset[Index] = __CurrentOffset
        Cache.Width[Index] = Width
        Cache.Height[Index] = Height
        Cache.Alpha[Index] = Alpha ? 1 : 0

        let WriteIndex = 0
        for(let i = 0; i < Pixels.length; i++){
            const PixelData = Pixels[i]
            for(let j = 0; j < Channels; j++){
                Cache.Pixels[__CurrentOffset + WriteIndex] = PixelData[j]
                WriteIndex++
            }
        }

        GW2.Resource.Textures.Textures[ID] = {
            ID: ID,
            Width: Width,
            Height: Height,
            Alpha: Alpha,
            Pixels: Pixels,
            Channels: Channels,
            PixelCount: PixelCount,
            DataCount: DataCount,
            Index: Index,
            Offset: __CurrentOffset
        }

        Cache.Count++
        __CurrentOffset += DataCount
    }catch(e){
        throw new Error(`Не получилось зарегистрировать текстуру [${ID}]!\nШирина: ${Width}\nВысота: ${Height}\nAlpha: ${Alpha}\nКол-во пикселей: ${Pixels.length}\nMessage: ${e.message}`)
    }
}

// ----------------------------------------------------------------------
// Регистрация текстур

RegisterTexture(0, 2, 2, false, [
    [1, 0, 0], [0, 1, 0],
    [0, 0, 1], [1, 1, 0]
])

// ----------------------------------------------------------------------

console.log(`Зарегистрировано текстур [${GW2.Resource.Textures.__Cache.Count}/${GW2_MaxTextures}], пикселей занято: ${((__CurrentOffset / GW2_MaxTexturePixels) * 100).toFixed(2)}%`)