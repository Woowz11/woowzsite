GW2.Resource.Texture = {
    Total: 0,
    Textures: {},
    Missing: null,

    /**
     * Получает текстуру
     * @param {GW2_Texture} ID Текстура
     * @returns Текстуру или Missing (если не найдено)
     * @constructor
     */
    Get: function(ID){
        let Result = GW2.Resource.Texture.Textures[ID]
        if(!Result){ Result = GW2.Resource.Texture.Missing }
        return Result
    }
}

/**
 * Регистрирует текстуру
 * @param {GW2_Texture} ID
 * @param {number} W
 * @param {number} H
 * @param {number[]} Pixels
 * @param {GW2_Alpha} Alpha
 */
const RegisterTexture = function(ID, W, H, Pixels, Alpha){
    if(!W){ W = 0 }
    if(!H){ H = 0 }
    if(!Pixels){ Pixels = [] }

    try{
        if(GW2.Resource.Texture.Textures[ID]){ throw new Error("Такая текстура уже зарегистрирована!") }

        if(W <= 0 || H <= 0){ throw new Error("Ширина или высота не может быть <= 0!") }

        if(Alpha === undefined){ throw new Error("Не указано, текстура имеет Alpha или нет!") }

        const ExpectedCount = W * H
        if(Pixels.length < ExpectedCount){
            console.warn(`У текстуры [${ID}] не хватает пикселей [${Pixels.length} / ${ExpectedCount}]!`)
            for(let i = 0; i < ExpectedCount - Pixels.length; i++){
                Pixels.push(Alpha ? 0xFF00FFFF : 0xFF00FF)
            }
        }else if(Pixels.length > ExpectedCount){
            console.warn(`У текстуры [${ID}] лишка пикселей [${Pixels.length} / ${ExpectedCount}]!`)
            Pixels = Pixels.slice(0, ExpectedCount)
        }

        const Texture = {
            ID    : ID,
            W     : W,
            H     : H,
            Pixels: new Uint32Array(Pixels),
            Alpha : Alpha
        }

        GW2.Resource.Texture.Textures[ID] = Texture

        GW2.Resource.Texture.Total++

        if(ID === GW2_Texture.Missing){ GW2.Resource.Texture.Missing = Texture }

        console.log(`Зарегистрировано: ${ID}, ${W}x${H}, ${Pixels.length}, ${Alpha}`)
    }catch(e){
        throw new Error(`Произошла ошибка при регистрации текстуры [${ID}]!\nШирина: ${W}\nВысота: ${H}\nКол-во пикселей: ${Pixels.length}\n${e.message}`)
    }
}

const RegisterTexture_Bytes = async function(ID, String) {
    try{
        const binary = atob(String);
        const bytesArr = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytesArr[i] = binary.charCodeAt(i);
        }

        const stream = new Blob([bytesArr]).stream();
        const decompressedStream = stream.pipeThrough(new DecompressionStream("gzip"));
        const response = new Response(decompressedStream);
        const buffer = await response.arrayBuffer();
        const data = new Uint8Array(buffer);

        const W = (data[0] << 8) | data[1];
        const H = (data[2] << 8) | data[3];
        const AlphaType = data[4];

        const Pixels = [];
        let offset = 5;

        const pixelCount = W * H;
        for (let i = 0; i < pixelCount; i++) {
            const r = data[offset++];
            const g = data[offset++];
            const b = data[offset++];
            const a = data[offset++];

            const color = ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
            Pixels.push(color);
        }

        RegisterTexture(ID, W, H, Pixels, AlphaType);

    }catch (e){
        throw new Error(`Произошла ошибка при парсинге байтов текстуры [${ID}]!\n${e.message}`);
    }
}

// ----------------------------------------------------------------------

const GW2_Texture = {
    Missing: -1,
    Test: 0
}

console.group("Регистрация")

const RegisterTextures = async function(){
    RegisterTexture(GW2_Texture.Missing, 2, 2, [
        0x000000, 0xFF00FF,
        0xFF00FF, 0x000000
    ], GW2_Alpha.None)

    RegisterTexture(GW2_Texture.Test, 4, 4, [
        0x000000FF, 0x00000000, 0x00000000, 0x000000FF,
        0x00000000, 0x00000000, 0x00000000, 0x00000000,
        0x000000FF, 0x00000000, 0x00000000, 0x000000FF,
        0x00000000, 0x000000FF, 0x000000FF, 0x00000000
    ], GW2_Alpha.Cutout)
}
RegisterTextures() // НАДО ПЕРЕДЕЛАТЬ СЛЕГКА

console.groupEnd()

// ----------------------------------------------------------------------

console.group("Текстуры")

console.log(`Загружено: ${GW2.Resource.Texture.Total}`)

console.groupEnd()