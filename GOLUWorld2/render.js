const GL = GW2.Render.GL

let __CreateShader = function(){
    const V = `
attribute vec2 A_Position;
attribute vec2 A_UV;
varying vec2 UV;

void main(){
    UV = A_UV;
    gl_Position = vec4(A_Position, 0, 1);
}
`
    const F = `
precision highp float;

varying vec2 UV;
uniform float Time;
uniform vec2 Resolution;
uniform vec2 Mouse;

void main(){
    vec2 p = UV * Resolution;
    
    vec3 color = vec3(0.05, 0.05, 0.1);
    
    vec2 center = Resolution * 0.5;
    vec2 halfsize = vec2(40, 40);
    vec2 diff = p - center;
    if (abs(diff.x) < halfsize.x && abs(diff.y) < halfsize.y) {
        color = vec3(1.0, 0.0, 0.0);
    }
    
    
    
    float angle = Time * 1.2;
    float radius = 100.0;
    vec2 circlePos = center + vec2(cos(angle), sin(angle)) * radius;
    float dist = distance(p, circlePos);
    if (dist < 30.0) {
        color = vec3(0.0, 1.0, 0.0);
    }
    
    
    
    
    float distToMouse = distance(p, Mouse);
    if (distToMouse < 5.0) {
        color = vec3(0.0, 0.0, 1.0); // розовая точка под мышью
    }
    
    
    
    
    vec2 grid = abs(fract(p / 4.0) - 0.5);
    float gridLine = min(grid.x, grid.y);
    color *= (0.85 + 0.15 * smoothstep(0.0, 0.3, gridLine));
    
    
    gl_FragColor = vec4(color, 1.0);
}
`
    return {
        Vertex  : V,
        Fragment: F
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

    const Attribute_Position = GL.getAttribLocation(Program, "A_Position")
    const Attribute_UV       = GL.getAttribLocation(Program, "A_UV"      )

    const Vertices = new Float32Array([
        /* Position   UV */
           -1, -1,   0, 1,
            1, -1,   1, 1,
           -1,  1,   0, 0,
            1,  1,   1, 0
    ])

    const Indices = new Uint16Array([0, 1, 2, 1, 3, 2])

    const VBO = GL.createBuffer()
    GL.bindBuffer(GL.ARRAY_BUFFER, VBO)
    GL.bufferData(GL.ARRAY_BUFFER, Vertices, GL.STATIC_DRAW)

    const IBO = GL.createBuffer()
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, IBO)
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, Indices, GL.STATIC_DRAW)

    GL.enableVertexAttribArray(Attribute_Position)
    GL.vertexAttribPointer(Attribute_Position, 2, GL.FLOAT, false, 16, 0)

    GL.enableVertexAttribArray(Attribute_UV)
    GL.vertexAttribPointer(Attribute_UV, 2, GL.FLOAT, false, 16, 8)

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
let __Uniform         = new Map()

let RegisterUniform = function(Name, Default){
    if(__UniformLocation.has(Name)){
        console.error(`Такой uniform [${Name}] уже есть!`)
        return
    }

    const Location = GL.getUniformLocation(ProgramInfo.Program, Name)
    if(!Location){
        console.warn(`Uniform [${Name}] не найден!`)
        return function(){}
    }

    __UniformLocation.set(Name, Location)

    const Get = function(){
        return __Uniform.get(Location)[2]
    }

    const Set = function(Value, Always){
        const Current = Get()
        if(!Always && JSON.stringify(Current) === JSON.stringify(Value)){ return }

        __Uniform.get(Location)[2] = Value

        if(Array.isArray(Value)){
            switch(Value.length){
                case 2: GL.uniform2f(Location, Value[0], Value[1]); break
                case 3: GL.uniform3f(Location, Value[0], Value[1], Value[2]); break
                case 4: GL.uniform4f(Location, Value[0], Value[1], Value[2], Value[3]); break
                default: console.warn(`Неподдерживаемый вектор ${Value.length} uniform!\nUniform: ${Name}`)
            }
        }else if(typeof Value === "number"){
            GL.uniform1f(Location, Value)
        }else if(typeof Value === "boolean"){
            GL.uniform1i(Location, Value ? 1 : 0)
        }else{
            console.warn(`Неподдерживаемый тип uniform ${typeof Value}!\nUniform: ${Name}`)
        }
    }

    __Uniform.set(Location, [
        Set,
        Get,
        Default
    ])

    Set(Default, true)

    return Set
}

let U_Time       = RegisterUniform("Time"      , 0)
let U_Resolution = RegisterUniform("Resolution", [0, 0])
let U_Mouse      = RegisterUniform("Mouse"     , [0, 0])

// ----------------------------------------------------------------------

let __StartTime = performance.now()
const GlobalRender = function(){
    const Time = (performance.now() - __StartTime) / 1000

    U_Time(Time)
    U_Resolution([GW2.Render.W, GW2.Render.H])
    U_Mouse([GW2.Input.Mouse.X, GW2.Input.Mouse.Y])

    GL.clearColor(1, 0, 1, 1)
    GL.clear(GL.COLOR_BUFFER_BIT)

    GL.drawElements(GL.TRIANGLES, ProgramInfo.Count, GL.UNSIGNED_SHORT, 0)
}