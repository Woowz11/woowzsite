# Uniform's

<p id="UNIFORMS"></p>

# Переменные

*в разработке...*

# Константы

<p id="CONSTANTS"></p>

# Типы

<p id="TYPES"></p>

<script>
var p = document.getElementById("UNIFORMS");

var IN_SELF = "Нужно самим применять";

var IN_AWAKE  = "Применяется во всех шейдерах перед первым рендером кадра";
var IN_CAMERA = "Применяется во всех шейдерах если есть камера на сцене";
var IN_TEXT   = IN_SELF + " (ScriptText)";
var IN_SCENE  = "Применяется во всех шейдерах если есть сцена";

var Uniforms = {
	"Random"          : ["f" , "Math.random()", "Случайное число каждый кадр от 0 до 1", IN_AWAKE],
	"Time"            : ["f" , "WE.Stats.GetWorldDeltaTime()", "Время на сцене с учётом DeltaTime", IN_AWAKE],
	"Camera"          : ["44", null, "View матрица", IN_CAMERA],
	"Projection3D"    : ["44", null, "Перспективная матрица", IN_CAMERA],
	"Projection2D"    : ["44", null, "Ортографическая матрица", IN_CAMERA],
	"Transform"       : ["34", null, "Позиция, поворот, размер объекта в виде матрицы", null],
	"FollowCamera"    : ["b" , null, "Применять view матрицу?", null],
	"Texture"         : ["t" , null, "Albedo текстура, так же самая основная текстура", null],
	"Color"           : ["c" , null, "Дополнительный цвет, может накладываться на текстуру", null],
	"ScreenColor"     : ["t" , "M.Resource.ScreenWorld.Get(\"Color\").GetTexture()", "Экранная текстура, содержащая в себе albedo, цветные текстуры объектов", IN_AWAKE],
	"ScreenDepth"     : ["t" , "M.Resource.ScreenWorld.Get(\"Depth\").GetTexture()", "Экранная текстура, содержащая в себе глубину сцены", IN_AWAKE],
	"ScreenUI"        : ["t" , "M.Resource.ScreenUI.Get(\"Color\").GetTexture()", "Экранная текстура, содержащая в себе интерфейс", IN_AWAKE],
	"Near"            : ["f" , "0.1f", "Ближайший Clip камеры", IN_CAMERA],
	"Far"             : ["f" , "1000f", "Дальний Clip камеры", IN_CAMERA],
	"CharPosition"    : ["i" , null, "Позиция символа в строке", IN_TEXT],
	"StringLength"    : ["i" , null, "Длина строки", IN_TEXT],
	"Char"            : ["i" , "-1", "Номер символа", IN_TEXT],
	"Line"            : ["i" , null, "Номер линии на которой находится символ", IN_TEXT],
	"Background"      : ["c" , "new Color().TRANSPARENT()", "Цвет заднего фона", IN_SCENE],
	"TextureNormal"   : ["t" , "WE.Resource.GetSolidNormalTexture().GetTexture()", "Создаёт иллюзию объёма", null],
	"TextureMetallic" : ["t" , "WE.Resource.GetSolidWhiteTexture().GetTexture()", "Пока-что не используется...", null],
	"TextureRoughness": ["t" , "WE.Resource.GetSolidBlackTexture().GetTexture()", "Пока-что не используется...", null],
	"TextureEmission" : ["t" , "WE.Resource.GetSolidBlackTexture().GetTexture()", "Делает свечение", null],
	"TextureCBReflect": ["t" , "WE.Resource.GetSolidBlackTexture().GetTexture()", "Показывает где делать CubeMap отражения", null],
	"Metallic"        : ["f" , null, "Пока-что не используется...", null],
	"Roughness"       : ["f" , "1f", "Пока-что не используется...", null],
	"Emission"        : ["c" , null, "Делает свечение", null],
	"ScreenNormal"    : ["t" , "M.Resource.ScreenWorld.Get(\"Normal\").GetTexture()", "Экранная текстура, содержащая в себе нормали", IN_AWAKE],
	"ScreenMetallic"  : ["t" , "M.Resource.ScreenWorld.Get(\"Metallic\").GetTexture()", "Пока-что не используется...", IN_AWAKE],
	"ScreenRoughness" : ["t" , "M.Resource.ScreenWorld.Get(\"Roughness\").GetTexture()", "Пока-что не используется...", IN_AWAKE],
	"ScreenEmission"  : ["t" , "M.Resource.ScreenWorld.Get(\"Emission\").GetTexture()", "Экранная текстура, содержащая в себе свечение", IN_AWAKE],
	"ScreenReflect"   : ["t" , "M.Resource.ScreenWorld.Get(\"Reflect\").GetTexture()", "Экранная текстура, содержащая в себе отражение CubeMap's", IN_AWAKE],
	"ScreenCBReflect" : ["t" , "M.Resource.ScreenWorld.Get(\"CBReflect\").GetTexture()", "Экранная текстура, содержащая в себе где рисовать отражение CubeMap's", IN_AWAKE],
	"Screen"          : ["t" , "M.Resource.ScreenResult.Get(\"Color\").GetTexture()", "Экранная текстура, содержащая в себе готовый результат (То что видет пользователь, но без интерфейса)", IN_AWAKE],
	"ScreenLight"     : ["t" , "M.Resource.ScreenLight.Get(\"Color\").GetTexture()", "Экранная текстура, содержащая в себе освещение", IN_AWAKE],
	"CameraPosition"  : ["3" , null, "Позиция камеры", IN_CAMERA],
	"Position"        : ["3" , null, "Позиция объекта", null],
	"Rotation"        : ["4" , null, "Поворот объекта", null],
	"Radius"          : ["f" , null, "Радиус (Дистанция свечения источника света)", null],
	"ScreenSize"      : ["2" , null, "Размер экрана", IN_AWAKE],
	"ScreenPosition"  : ["t" , "M.Resource.ScreenWorld.Get(\"Position\").GetTexture()", "Экранная текстура, содержащая в себе позицию пикселей", IN_AWAKE],
	"Ambient"         : ["c" , "new Color().WHITE()", "Начальное освещение сцены", null],
	"Constant"        : ["f" , "1f", "... (Нужно написать будет)", null],
	"Linear"          : ["f" , "0.5f", "... (Нужно написать будет)", null],
	"Quadratic"       : ["f" , "0.1f", "... (Нужно написать будет)", null],
	"Light"           : ["i" , "Enum.LightType.Point.GL", "Тип источника света", null],
	"CutOff"          : ["2" , null, "... (Нужно написать будет)", null],
	"CubeMap"         : ["t" , "WE.Resource.GetSolidBlackTexture().GetTexture()", "Используемый CubeMap", null]
}

var Constants = {
	"PI"     : ["f", "3.14159265359", "Число π"],
	"Right"  : ["3", "vec3(1,0,0)"  , "Право"  ],
	"Up"     : ["3", "vec3(0,1,0)"  , "Вверх"  ],
	"Forward": ["3", "vec3(0,0,1)"  , "Перед"  ]
}

var Types = {
	"f" : [0, "Float"    , "float"    , "0f"   ],
	"i" : [1, "Integer"  , "float"    , "0"    ],
	"b" : [2, "Boolean"  , "bool"     , "false"],
	"c" : [3, "Color"    , "vec4"     , "new Color().BLACK()"],
	"2" : [4, "Vector2f" , "vec2"     , "new Vector2f()"],
	"3" : [5, "Vector3f" , "vec3"     , "new Vector3f()"],
	"4" : [6, "Vector4f" , "vec4"     , "new Vector4f()"],
	"34": [7, "Matrix34f", "mat4x3"   , "new Matrix34()"],
	"44": [8, "Matrix44f", "mat4"     , "new Matrix44()"],
	"t" : [9, "Texture"  , "sampler2D", "WE.Resource.GetDefaultTexture().GetTexture()"]
}

function CreateUniformInfo(uname, u){
	var DefaultValue = u[1];
	if(DefaultValue == null){ DefaultValue = Types[u[0]][3]; }
	var HowUse = u[3];
	if(HowUse == null){ HowUse = IN_SELF }
	return `<tr><th>${uname}</th><th>${Types[u[0]][1]}</th><th>${DefaultValue}</th><th>${u[2]}</th><th>${HowUse}</th></tr>`;
}

var Result_Uniforms = "";
var Entries = Object.entries(Uniforms);
Entries.sort((A, B) => {
	var AT = Types[A[1][0]];
	var BT = Types[B[1][0]];
	if(AT[0] < BT[0]){ return -1; }
	if(AT[0] > BT[0]){ return  1; }
	return A[0].localeCompare(B[0]);
});
for(var UniformName in Object.fromEntries(Entries)){
	Result_Uniforms += CreateUniformInfo(UniformName, Uniforms[UniformName]);
}
p.innerHTML = `<table><tr><th>Название</th><th>Тип</th><th>Дефолтное значение</th><th>Описание</th><th>Когда применяется?</th></tr>${Result_Uniforms}</table>`;

p = document.getElementById("CONSTANTS");

var Result_Constants = "";
Entries = Object.entries(Constants);
Entries.sort((A, B) => {
	var AT = Types[A[1][0]];
	var BT = Types[B[1][0]];
	if(AT[0] < BT[0]){ return -1; }
	if(AT[0] > BT[0]){ return  1; }
	return A[0].localeCompare(B[0]);
});
for(var ConstantName in Object.fromEntries(Entries)){
	var Constant = Constants[ConstantName];
	Result_Constants += `<tr><th>${ConstantName}</th><th>${Types[Constant[0]][1]}</th><th>${Constant[1]}</th><th>${Constant[2]}</th></tr>`;
}
p.innerHTML = `<table><tr><th>Название</th><th>Тип</th><th>Значение (GLSL)</th><th>Описание</th></tr>${Result_Constants}</table>`;

p = document.getElementById("TYPES");

var Result_Types = "";
Entries = Object.entries(Types);
Entries.sort((A, B) => {
	return A[1][0] - B[1][0];
});
for(var i = 0; i < Entries.length; i++){
	var Type = Entries[i][0];
	Result_Types += `<tr><th>${Types[Type][1]}</th><th>${Types[Type][2]}</th><th>${Types[Type][3]}</th></tr>`;
}
p.innerHTML = `<table><tr><th>Java</th><th>GLSL</th><th>Дефолтное значение (Java)</th></tr>${Result_Types}</table>`;
</script>