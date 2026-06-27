const GL = GW2.Render.GL

let __CreateShader = function(){
    return {
        Vertex  : `#version 300 es

in vec2 A_Position;
in vec2 A_UV;

out vec2 B_UV;

void main(){
    B_UV = A_UV;
    
    gl_Position = vec4(A_Position, 0, 1);
}
`,
        Fragment: __RenderBase
    }
}

let __CreateProgram = function(){
    const Shader = __CreateShader()

    // ----------------------------------------------------------------------

    const V = GL.createShader(GL.VERTEX_SHADER)
    GL.shaderSource(V, Shader.Vertex)
    GL.compileShader(V)

    if(!GL.getShaderParameter(V, GL.COMPILE_STATUS)){
        throw new Error(`Произошла ошибка при компиляции Vertex шейдера!\n${GL.getShaderInfoLog(V)}`)
    }

    // ----------------------------------------------------------------------

    const F = GL.createShader(GL.FRAGMENT_SHADER)
    GL.shaderSource(F, Shader.Fragment)
    GL.compileShader(F)

    if(!GL.getShaderParameter(F, GL.COMPILE_STATUS)){
        throw new Error(`Произошла ошибка при компиляции Fragment шейдера!${GL.getShaderInfoLog(F)}`)
    }

    // ----------------------------------------------------------------------

    const Program = GL.createProgram()
    GL.attachShader(Program, V)
    GL.attachShader(Program, F)
    GL.linkProgram(Program)

    if(!GL.getProgramParameter(Program, GL.LINK_STATUS)){
        throw new Error(`Произошла ошибка при линковке программы!\n${GL.getProgramInfoLog(Program)}`)
    }

    // ----------------------------------------------------------------------

    const Attribute_Position     = GL.getAttribLocation(Program, "A_Position"     )
    const Attribute_UV           = GL.getAttribLocation(Program, "A_UV"           )

    // ----------------------------------------------------------------------

    const Vertices = new Float32Array([
        /* Position   UV */
           -1, -1,   0, 1,
            1, -1,   1, 1,
           -1,  1,   0, 0,
            1,  1,   1, 0
    ])

    const Indices = new Uint16Array([0, 1, 2, 1, 3, 2])

    // ----------------------------------------------------------------------

    const VBO = GL.createBuffer()
    GL.bindBuffer(GL.ARRAY_BUFFER, VBO)
    GL.bufferData(GL.ARRAY_BUFFER, Vertices, GL.STATIC_DRAW)

    const IBO = GL.createBuffer()
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, IBO)
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, Indices, GL.STATIC_DRAW)

    // ----------------------------------------------------------------------

    GL.enableVertexAttribArray(Attribute_Position)
    GL.vertexAttribPointer(Attribute_Position, 2, GL.FLOAT, false, 16, 0)

    GL.enableVertexAttribArray(Attribute_UV)
    GL.vertexAttribPointer(Attribute_UV, 2, GL.FLOAT, false, 16, 8)

    // ----------------------------------------------------------------------

    const TEXTUREDATA = GL.getUniformBlockIndex(Program, "TextureData")

    GL.uniformBlockBinding(Program, TEXTUREDATA, 0)

    const UBOBuffer = GL.createBuffer()
    GL.bindBuffer(GL.UNIFORM_BUFFER, UBOBuffer)

    GL.bufferData(GL.UNIFORM_BUFFER, GW2.Resource.Textures.__Cache.Pixels, GL.STATIC_DRAW)

    GL.bindBufferBase(GL.UNIFORM_BUFFER, 0, UBOBuffer)

    // ----------------------------------------------------------------------

    return {
        Program: Program,
        Count: Indices.length
    }
}

let ProgramInfo = __CreateProgram()
GL.useProgram(ProgramInfo.Program)

// ----------------------------------------------------------------------

let __UniformLocation = new Map()
const __Uniform       = new Map()
const __UniformName   = new Map()

let RegisterUniform = function(Name, Type, Default){
    if(__UniformLocation.has(Name)){
        console.error(`Такой uniform [${Name}] уже есть!`)
        return
    }

    const Location = GL.getUniformLocation(ProgramInfo.Program, `B_${Name}`)
    if(!Location){
        console.warn(`Uniform [${Type} : ${Name}] не найден!`)
        return function(){}
    }

    __UniformLocation.set(Name, Location)
    __UniformName    .set(Location, Name)

    const Get = function(){
        return __Uniform.get(Location)[3]
    }

    const Set = function(Value, Always){
        const Current = Get()
        if(!Always && JSON.stringify(Current) === JSON.stringify(Value)){ return }

        __Uniform.get(Location)[3] = Value

        switch(Type) {
            case GW2_UniformType.Float: GL.uniform1f(Location, Value); break
            case GW2_UniformType.Integer: GL.uniform1i(Location, Value); break
            case GW2_UniformType.Boolean: GL.uniform1i(Location, Value ? 1 : 0); break
            case GW2_UniformType.Vector2F: GL.uniform2f(Location, Value[0], Value[1]); break
            case GW2_UniformType.Vector3F: GL.uniform3f(Location, Value[0], Value[1], Value[2]); break
            case GW2_UniformType.Vector4F: GL.uniform4f(Location, Value[0], Value[1], Value[2], Value[3]); break
            case GW2_UniformType.Vector2I: GL.uniform2i(Location, Value[0], Value[1]); break
            case GW2_UniformType.Vector3I: GL.uniform3i(Location, Value[0], Value[1], Value[2]); break
            case GW2_UniformType.Vector4I: GL.uniform4i(Location, Value[0], Value[1], Value[2], Value[3]); break

            case GW2_UniformType.ArrayFloat: {
                let Result;
                if(Value instanceof Float32Array){
                    Result = Value
                }else{
                    Result = new Float32Array(Value)
                }

                GL.uniform1fv(Location, Result)
                break
            }
            case GW2_UniformType.ArrayInteger: {
                let Result;
                if(Value instanceof Int32Array){
                    Result = Value
                }else{
                    Result = new Int32Array(Value)
                }

                GL.uniform1iv(Location, Result)
                break
            }
            case GW2_UniformType.ArrayBoolean: {
                let Result;
                if(Value instanceof Int32Array){
                    Result = Value
                }else{
                    Result = new Int32Array(Value.map(V => V ? 1 : 0))
                }

                GL.uniform1iv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector2F: {
                let Result;
                if(Value instanceof Float32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1]) }
                    Result = new Float32Array(Flat)
                }

                GL.uniform2fv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector3F: {
                let Result;
                if(Value instanceof Float32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1], V[2]) }
                    Result = new Float32Array(Flat)
                }

                GL.uniform3fv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector4F: {
                let Result;
                if(Value instanceof Float32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1], V[2], V[3]) }
                    Result = new Float32Array(Flat)
                }

                GL.uniform4fv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector2I: {
                let Result;
                if(Value instanceof Int32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1]) }
                    Result = new Int32Array(Flat)
                }

                GL.uniform2iv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector3I: {
                let Result;
                if(Value instanceof Int32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1], V[2]) }
                    Result = new Int32Array(Flat)
                }

                GL.uniform3iv(Location, Result)
                break
            }

            case GW2_UniformType.ArrayVector4I: {
                let Result;
                if(Value instanceof Int32Array){
                    Result = Value
                }else{
                    let Flat = []
                    for(let V of Value){ Flat.push(V[0], V[1], V[2], V[4]) }
                    Result = new Int32Array(Flat)
                }

                GL.uniform4iv(Location, Result)
                break
            }

            default: console.warn(`Неподдерживаемый тип uniform ${Type}!\nUniform: ${Name}`)
        }
    }

    __Uniform.set(Location, [
        Set,
        Get,
        Type,
        Default
    ])

    Set(Default, true)

    return Set
}

const GW2_UniformType = {
    /* float */
    Float: 0,
    /* int */
    Integer: 1,
    /* int */
    Boolean: 2,

    /* vec2 */
    Vector2F: 3,
    /* vec3 */
    Vector3F: 4,
    /* vec4 */
    Vector4F: 5,
    /* ivec2 */
    Vector2I: 6,
    /* ivec3 */
    Vector3I: 7,
    /* ivec4 */
    Vector4I: 8,

    /* float */
    ArrayFloat: 9,
    /* int */
    ArrayInteger: 10,
    /* int */
    ArrayBoolean: 11,

    /* vec2 */
    ArrayVector2F: 12,
    /* vec3 */
    ArrayVector3F: 13,
    /* vec4 */
    ArrayVector4F: 14,
    /* ivec2 */
    ArrayVector2I: 15,
    /* ivec3 */
    ArrayVector3I: 16,
    /* ivec4 */
    ArrayVector4I: 17,
}

let U_Time       = RegisterUniform("Time"      , GW2_UniformType.Float, 0)
let U_Resolution = RegisterUniform("Resolution", GW2_UniformType.Vector2I, [0, 0])
let U_Mouse      = RegisterUniform("Mouse"     , GW2_UniformType.Vector2F, [0, 0])
let U_Scene      = RegisterUniform("Scene"     , GW2_UniformType.Integer, -1)

let U_TextureID     = RegisterUniform("TextureID"    , GW2_UniformType.ArrayInteger, GW2.Resource.Textures.__Cache.ID    )
let U_TextureOffset = RegisterUniform("TextureOffset", GW2_UniformType.ArrayInteger, GW2.Resource.Textures.__Cache.Offset)
let U_TextureWidth  = RegisterUniform("TextureWidth" , GW2_UniformType.ArrayInteger, GW2.Resource.Textures.__Cache.Width )
let U_TextureHeight = RegisterUniform("TextureHeight", GW2_UniformType.ArrayInteger, GW2.Resource.Textures.__Cache.Height)
let U_TextureAlpha  = RegisterUniform("TextureAlpha" , GW2_UniformType.ArrayInteger, GW2.Resource.Textures.__Cache.Alpha )

// ----------------------------------------------------------------------

let RenderStatistics = function(){
    const Program = ProgramInfo.Program;

    // 1. Анализ UBO (Блоков)
    const MaxUBOSize = GL.getParameter(GL.MAX_UNIFORM_BLOCK_SIZE);
    // Получаем реальный размер блока из программы (в байтах)
    const blockIndex = GL.getUniformBlockIndex(Program, "TextureData");
    const CurrentUBOSize = GL.getActiveUniformBlockParameter(Program, blockIndex, GL.UNIFORM_BLOCK_DATA_SIZE);
    const UBOUsage = ((CurrentUBOSize / MaxUBOSize) * 100).toFixed(2);

    // 2. Анализ Uniform-векторов (точный расчет)
    const MaxFragUniforms = GL.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS);
    const activeUniforms = GL.getProgramParameter(Program, GL.ACTIVE_UNIFORMS);

    let usedVectors = 0;

    for (let i = 0; i < activeUniforms; i++) {
        const info = GL.getActiveUniform(Program, i);

        // В WebGL каждый элемент массива uniform (даже float) занимает 1 вектор (vec4)
        // Матрицы занимают N векторов.
        let vectorsPerElement = 1;
        if (info.type === GL.FLOAT_MAT2) vectorsPerElement = 2;
        if (info.type === GL.FLOAT_MAT3) vectorsPerElement = 3;
        if (info.type === GL.FLOAT_MAT4) vectorsPerElement = 4;

        // info.size возвращает длину массива (или 1, если это не массив)
        usedVectors += info.size * vectorsPerElement;
    }

    const UniformUsage = ((usedVectors / MaxFragUniforms) * 100).toFixed(2);
    const MaxUniformBlocks = GL.getParameter(GL.MAX_FRAGMENT_UNIFORM_BLOCKS);

    console.group("=== Динамическая статистика лимитов (WIP) ===");

    console.log(`UBO ["TextureData"]:
- Реальный размер: ${CurrentUBOSize} байт
- Лимит GPU: ${MaxUBOSize} байт
- Заполнено: ${UBOUsage}%`);

    console.log(`Uniform Vectors (Active):
- Использовано: ${usedVectors} векторов
- Лимит GPU: ${MaxFragUniforms} векторов
- Заполнено: ${UniformUsage}%
- Всего активных переменных: ${activeUniforms}`);

    console.log(`Uniform Blocks:
- Использовано: 1 / ${MaxUniformBlocks}`);

    if (usedVectors > MaxFragUniforms) {
        console.error("!!! ПРЕДУПРЕЖДЕНИЕ: Превышен лимит векторов! Часть данных будет недоступна.");
    }

    console.groupEnd();
}
RenderStatistics()

// ----------------------------------------------------------------------

let __StartTime = performance.now()
const GlobalRender = function(DT){
    const Time = (performance.now() - __StartTime) / 1000

    U_Time(Time)
    U_Resolution([GW2.Render.W, GW2.Render.H])
    U_Mouse([GW2.Input.Mouse.X, GW2.Input.Mouse.Y])
    U_Scene(GW2.Game.Scene)

    GL.clearColor(1, 0, 1, 1)
    GL.clear(GL.COLOR_BUFFER_BIT)

    GL.drawElements(GL.TRIANGLES, ProgramInfo.Count, GL.UNSIGNED_SHORT, 0)
}