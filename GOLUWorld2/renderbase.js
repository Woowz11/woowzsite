const __RenderBase = `#version 300 es
precision highp float;

in vec2 B_UV;
out vec4 A_Result;

uniform float B_Time;
uniform ivec2 B_Resolution;
uniform vec2 B_Mouse;
uniform int B_Scene;

#define B_MaxTextures __MAX_TEXTURES__
#define B_MaxTexturePixels __MAX_TEXTURE_PIXELS__ 

uniform int   B_TextureID    [B_MaxTextures];
uniform int   B_TextureOffset[B_MaxTextures];
uniform int   B_TextureWidth [B_MaxTextures];
uniform int   B_TextureHeight[B_MaxTextures];
uniform int   B_TextureAlpha [B_MaxTextures];

layout(std140) uniform TextureData {
    mat4 Pixels[B_MaxTexturePixels / 16];
} u_Data;

// ----------------------------------------------------------------------

// Цвет пикселя
vec3 Result = vec3(1, 0, 1);

// Позиция пикселя
vec2 Pixel;

// ----------------------------------------------------------------------

float Texture_GetPixelValue(int Index){
    int m_idx = Index / 16;
    int internal_idx = Index % 16;
    int C = internal_idx / 4;
    int R = internal_idx % 4;
    
    return u_Data.Pixels[m_idx][C][R];
}

vec3 Texture_GetPixel3(int Index){
    float R = Texture_GetPixelValue(Index + 0);
    float G = Texture_GetPixelValue(Index + 1);
    float B = Texture_GetPixelValue(Index + 2);
    return vec3(R, G, B);
}

// ----------------------------------------------------------------------

void RenderMenu(){
    Result = vec3(0.5, 0, 0);
}

void RenderScene(int Scene){
    if(Scene == 0){
        RenderMenu();
    }else{
        Result = vec3(1, 0, 0);
    }
}

// ----------------------------------------------------------------------

void main(){
    Pixel = B_UV * vec2(B_Resolution);
    
    RenderScene(B_Scene);
    
    Result = Texture_GetPixel3(int(Pixel.x));
    
    if(distance(Pixel, B_Mouse) < 2.0){
        Result = vec3(0, 0, 1);
    }
    
    // Error текстура
    if(Result.r == -1.0 || Result.g == -1.0 || Result.b == -1.0){
        float Size = ceil((sin(B_Time) + 1.0) * 0.5 * 5.0);
        vec2 Pos = floor(Pixel / Size);
        float V = mod(Pos.x + Pos.y, 2.0);
        Result = vec3(V, 0, V);
    }
    A_Result = vec4(Result, 1.0);
}
`
.replace("__MAX_TEXTURES__", GW2_MaxTextures)
.replace("__MAX_TEXTURE_PIXELS__", GW2_MaxTexturePixels)