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

            console.log(`+: ${ID}, ${W}x${H}, ${Pixels.length}, ${Alpha}`)
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
        Player: 0,
        Cursor: 1,
        ConcreteFloor: 2,
        ConcreteTile: 3
    }

    console.group("Текстуры")

    RegisterTexture(GW2_Texture.Missing, 2, 2, [
        0x000000, 0xFF00FF,
        0xFF00FF, 0x000000
    ], GW2_Alpha.None)

    await RegisterTexture_Bytes(GW2_Texture.Player, "H4sIAAAAAAAACm2TSSi3YRTF/x+FpCjJBkUZSykLKWW2UCyUwkKS7AwRMhcyT0WUMWPIUEgiZIqSmSJDsSCUBSFTP927+pSn3t5633vPPfec8xisDFb/DP8dX19f0tPT6ezsZHFxke3tbdbW1piYmGBkZIT6+nri4+Mx/HECAgIYHBxkdHSU09NTzs/POTk54e3tjff3d46Pj9nb26Ovr4+goKBfGGFhYSwsLNDU1EReXh7FxcVMT09zc3PD4+MjHR0deHl5YWlpib29PWVlZYSGhipGeHg4XV1dxMTEYG5ujpGRESYmJoSEhJCYmEhFRQUeHh7c3t7i6urK9fU1dnZ2VFdX4+fnR3JyMo2NjYLF8/Ozvh8eHjA1NSUlJUUxzMzMlLv8m5qawtjYmNbWVjIyMigpKaG3t1e/HRwcaM3AwIByaW9vp6ioiOjoaIKDg3W+8IqMjGRsbIzS0lLVdGdnR3W3tbXFwsICa2tr0tLS2N/fJzs7m+7ubvr7+8nKyiI3N1e1XVpaorKyUjFWVlaUR01NjeKJHk9PT7pHXV0dERERXF1d8fLyQltbm3opnoqOBQUFrK6usrGxob7t7u7q3JmZGe3Z2trSPT8+PtTDo6MjnSc719bWql/i3d3dHWdnZ1xeXmrf8PCwZiUzM1O9+v7+5vPzU3lJriRjsovoPz8/z+bmJvf393x9fensoaEhLi4umJyc1FrJg/Sur69rHlpaWkhISECyMz4+zvLysnot87y9vXF2dsbR0REbGxucnJwIDAyksLBQ9RLsqqoqJO8ODg6kpqaqFpL58vJyzYbkWDyam5tT7ObmZu2R/Pb09Kin0isZlHdUVJTWSoZycnJISkrSRzSIjY0lPz9f9xRMqXV3d/91B4SrcBQ9RefDw0NeX19VV9l9dnZWs+jv74+bm9ufd9DFxUUx4uLiVFvxR3RqaGjQfPn4+ODp6fmr9wdNbi6ZBQQAAA==")

    await RegisterTexture_Bytes(GW2_Texture.Cursor, "H4sIAAAAAAAACnWPMQrEIAAE1ViksBHS2GqlvtrH+APLgLV+QBB0j1gEjju3nB0WlpzkpNZaeO9BNnHOoZQCY8xfR2uN3vtylFI/zsPGGJhzotYKKeWXc10X7vtGa23t5JzBOX8dIQRijEgpLc4YA6X07Y/jQAhh8c2Fh2//fQCCWEQyBQEAAA==")

    await RegisterTexture_Bytes(GW2_Texture.ConcreteFloor, "H4sIAAAAAAAACiWS23LrIAxF+wn92KRtGhNMhC9chAEbDHYcJ23P9Kn/eMbJHj1K2tKe9fL68vpCCCmKQkpZFAUAKCVjDADAORijQ+itNTEOdV0zxqSUn5+fTdMIIfb7fV3XAOecc9M0nEPTVEK0fe9yTowxAPDeE0LatiWEUEqttSmN3jshRM5JSsk5IGKMERFTSvM8KSUoPVF68t53XSeEADgXxfFxEjfGWGtzzn9/f7+/v+t6PZ/Z6USstd77tm1PJ3I6kfOZ1XWllGqa2truer1+fX1N07Qsl7e3991u/zwPEaXc9nMOVbX1V1U1xni73Yahd85prd7f3xljh8NHWVLnrPcWYHOUUjxK5pxTSsZg2zbPfKpNHFEJ0XpvjdFSCiHa85nFGMcxGoPH43G32zHG6rqmlGqtjTFKCWuNVnJZ5r7f3BEVABvH0PeurnlZlpTSsiw3A84JKR4/VlK2xqDWqm1rIZppyinFvneIqLW21mqtAUAIsSzLMHjnOsRtkDGKqHIeU4pt2zyzTQ+FEPKm5L2d59x16FzX926aklKCkI2WcRzXdZ3nOaW0LMvlcjEGl+Xy/DrnMYR+WWZExTl0Xffz85NzHoYBETnnD96Uc7aqKq1VCP39vq7r4pxRSoYQvr+/u64DgAdpwFjJOZTllgClBFHFOPz7972ui7VdCGGe58Ph8PHxIaUsyxIAhqF/0lhVG8+32/V+X6cpIW6xGGP+A2GjBSQFAwAA")

    await RegisterTexture_Bytes(GW2_Texture.ConcreteTile, "H4sIAAAAAAAACiXS0VKiYAAF4B6h5+jGa2e11WwsJDFHXEdw4QdNfgKEgNwSUVGbthm2ncx2UjSVRXPHLae2i3q7ney7OLfnXJy19bX1tc3NTZqmLctqNpumaWqaJgiCqqoQwuI7TlHk09NvoihCCEmSzGazGIaVy+Wbm5vr62vbtqsrlmWZpnl0pBpGpVo1arUax3GRSERRlHQ6HQgEGIaBEDIMk8vlPjKdxkmSLBQKBJFFURTHcYqiAAD5fN7n8wEANE0zDMOyrJOTk3L5WNO0jyJJkvx+P0VRNE3ncrlCIe/3+0VR7Pf74/HYdd3FYvHy8m+5XHY6Hdu2dV2PRCKiKFIUVSwWDw4K29vbAADP8x4fH+fz+fPz09vb69vbq+tOLi6+y7KMoiiEEACa5yHLMvF4XFVVz3MXiz+TyXjq/Z7NpvP5/fPzk2VZgnAYiyGVSgVCLpPJ5PP5WCx2dKQ8PPydz+9dd7xcPk4mY8fpD4cDwzCKxYOdnR1Jkoh3WZYFiURC17Xp1PM8dzIZu+7YcZzR6K7b7ZqmyfN8MrkvSSJJEjRNlUoSjqdMszqbTYdDp9frjUZ3rjsZDJxut1uv1yGEqwEyyzI8D3VdI4hstWrMZl6327m6+jkY9JfLZa/XOz8/N4yKLMvRaFTXNZ6HgnBYq1UzmS+NRv3+fnp7++vy0j47azlOfzQa/bDts7O2oigIgpimASEHYfH4WA+FPgNAm6bRbrcsq1GrmaenJ81ms91ut1otjuPC4XCjUVcUmaYpkiR9Pl8g8GlrawvD4nt7KILsBoPBaDSKIMj+/v7u7u7GxkYmk4EQplIpFEVZluV5/utKoZAnSQLDMJIkGYbhOK5UKiWTyVAolEqlwuEwAEBVVUEQCILAcTyZTCIrGIYlEgmCyK5uRsfj8WAw+B/fhESzBQMAAA==")

    // ----------------------------------------------------------------------

    console.log(`Загружено: ${GW2.Resource.Texture.Total}`)

    console.groupEnd()
}