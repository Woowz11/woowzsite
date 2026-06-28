GW2_Texture = {}

const LoadTextures = async function(){
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
     * @param {GW2_Alpha|number} Alpha
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
            const Binary = atob(String)
            const BytesArray = new Uint8Array(Binary.length)
            for(let i = 0; i < Binary.length; i++){ BytesArray[i] = Binary.charCodeAt(i) }

            const Stream = new Blob([BytesArray]).stream()
            const DecompressedStream = Stream.pipeThrough(new DecompressionStream("gzip"))
            const __Response = new Response(DecompressedStream)
            const Buffer = await __Response.arrayBuffer()
            const Data = new Uint8Array(Buffer)

            const W = (Data[0] << 8) | Data[1]
            const H = (Data[2] << 8) | Data[3]
            const Alpha = Data[4]

            const Pixels = []
            let Offset = 5
            const PixelCount = W * H

            for(let i = 0; i < PixelCount; i++){
                const R = Data[Offset++]
                const G = Data[Offset++]
                const B = Data[Offset++]

                let Color;
                if(Alpha !== GW2_Alpha.None){
                    Color = ((R << 24) | (G << 16) | (B << 8) | Data[Offset++]) >>> 0
                }else{
                    Color = ((R << 16) | (G << 8) | B) >>> 0
                }
                Pixels.push(Color)
            }

            RegisterTexture(ID, W, H, Pixels, Alpha)

        }catch (e){
            throw new Error(`Произошла ошибка при парсинге байтов текстуры [${ID}]!\n${e.message}`);
        }
    }

    // ----------------------------------------------------------------------

    GW2_Texture = {
        Missing: -1,
        Test: 0
    }

    console.group("Регистрация")

    RegisterTexture(GW2_Texture.Missing, 2, 2, [
        0x000000, 0xFF00FF,
        0xFF00FF, 0x000000
    ], GW2_Alpha.None)

    await RegisterTexture_Bytes(GW2_Texture.Test, "H4sIAAAAAAAACmMQYBBg/D8KUICPjw9ZctQGDGiAmvqx+QNdjBz9xIYPLnXE6CekBp87iHWjDxZ1pPgPXQ85eukFAF3V7CQFBAAA")

    console.groupEnd()

    // ----------------------------------------------------------------------

    console.group("Текстуры")

    console.log(`Загружено: ${GW2.Resource.Texture.Total}`)

    console.groupEnd()
}