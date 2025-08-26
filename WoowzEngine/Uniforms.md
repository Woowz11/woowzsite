# Uniforms

<p id="UNIFORMS"></p>

# Переменные

*в разработке... ~что за переменные?~*

# Константы

Указаны в [Include/Constants.glsl](Include.md)

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
    /* ========================================================
       Глобальные значения
    ======================================================== */
    "Random"        : ["f", "Math.random()", "Случайное число от 0 до 1, обновляется каждый кадр", IN_AWAKE],
    "Time"          : ["f", "WE.Stats.GetWorldDeltaTime()", "Время сцены с учётом DeltaTime", IN_AWAKE],
    "FrameSize"     : ["2", null, "Размер кадра (ширина и высота в пикселях)", IN_AWAKE],

    /* ========================================================
       Камера
    ======================================================== */
    "Camera"        : ["44", null, "View матрица камеры", IN_CAMERA],
    "Projection3D"  : ["44", null, "Проекция камеры для 3D сцены", IN_CAMERA],
    "Projection2D"  : ["44", null, "Ортографическая проекция для 2D элементов", IN_CAMERA],
    "CameraPosition": ["3" , null, "Мировая позиция камеры", IN_CAMERA],
    "Near"          : ["f" , "0.1f", "Ближняя плоскость отсечения камеры", IN_CAMERA],
    "Far"           : ["f" , "1000", "Дальняя плоскость отсечения камеры", IN_CAMERA],

    /* ========================================================
       Трансформация объекта
    ======================================================== */
    "Transform"     : ["34", null, "Матрица трансформации объекта (позиция, поворот, размер)", null],
    "Position"      : ["3" , null, "Позиция объекта в локальных координатах", null],
    "Rotation"      : ["4" , null, "Поворот объекта в виде кватерниона", null],
    "Size"          : ["3" , null, "Размер объекта", null],
    "FollowCamera"  : ["b" , false, "Применять view-матрицу камеры к объекту?", null],

    /* ========================================================
       Текстуры
    ======================================================== */
    "Texture"         : ["t", null, "Основная (Albedo) текстура объекта", null],
    "TextureNormal"   : ["t", "WE.Resource.GetSolidNormalTexture().GetTexture()", "Текстура нормалей для имитации объёма", null],
    "TextureMetallic" : ["t", "WE.Resource.GetSolidWhiteTexture().GetTexture()", "Текстура металлическости", null],
    "TextureRoughness": ["t", "WE.Resource.GetSolidBlackTexture().GetTexture()", "Текстура шероховатости", null],
    "TextureEmission" : ["t", "WE.Resource.GetSolidBlackTexture().GetTexture()", "Текстура свечения", null],
    "TextureCBReflect": ["t", "WE.Resource.GetSolidBlackTexture().GetTexture()", "CubeMap для отражений", null],

    /* ========================================================
       Материал
    ======================================================== */
    "Color"     : ["c", "new Color().WHITE()", "Дополнительный цвет материала (множитель для текстуры)", null],
    "Metallic"  : ["f", null, "Металлическость материала", null],
    "Roughness" : ["f", "1f", "Шероховатость материала", null],
    "Emission"  : ["c", null, "Цвет свечения материала", null],

    /* ========================================================
       Экранные текстуры / Frame
    ======================================================== */
    "ScreenColor"    : ["t", "M.Resource.ScreenWorld.Get(\"Color\").GetTexture()", "Текстура с цветом сцены (без интерфейса)", IN_AWAKE],
    "ScreenDepth"    : ["t", "M.Resource.ScreenWorld.Get(\"Depth\").GetTexture()", "Текстура глубины сцены", IN_AWAKE],
    "ScreenUI"       : ["t", "M.Resource.ScreenUI.Get(\"Color\").GetTexture()", "Текстура интерфейса", IN_AWAKE],
    "ScreenPosition" : ["t", "M.Resource.ScreenWorld.Get(\"Position\").GetTexture()", "Текстура с мировыми позициями пикселей", IN_AWAKE],
    "ScreenNormal"   : ["t", "M.Resource.ScreenWorld.Get(\"Normal\").GetTexture()", "Текстура нормалей сцены", IN_AWAKE],
    "ScreenMetallic" : ["t", "M.Resource.ScreenWorld.Get(\"Metallic\").GetTexture()", "Металлическость объектов на экране (не используется)", IN_AWAKE],
    "ScreenRoughness": ["t", "M.Resource.ScreenWorld.Get(\"Roughness\").GetTexture()", "Шероховатость объектов на экране (не используется)", IN_AWAKE],
    "ScreenEmission" : ["t", "M.Resource.ScreenWorld.Get(\"Emission\").GetTexture()", "Свечение объектов на экране", IN_AWAKE],
    "ScreenReflect"  : ["t", "M.Resource.ScreenWorld.Get(\"Reflect\").GetTexture()", "Отражения объектов на экране", IN_AWAKE],
    "ScreenCBReflect": ["t", "M.Resource.ScreenWorld.Get(\"CBReflect\").GetTexture()", "Где рисовать отражения CubeMap на экране", IN_AWAKE],
    "Screen"         : ["t", "M.Resource.ScreenResult.Get(\"Color\").GetTexture()", "Готовый результат сцены (без интерфейса)", IN_AWAKE],
    "ScreenLight"    : ["t", "M.Resource.ScreenLight.Get(\"Color\").GetTexture()", "Текстура освещения сцены", IN_AWAKE],

    /* ========================================================
       Работа с текстом
    ======================================================== */
    "CharPosition" : ["i", null, "Позиция символа в строке", IN_TEXT],
    "StringLength" : ["i", null, "Длина строки", IN_TEXT],
    "Char"         : ["i", "-1", "Индекс текущего символа", IN_TEXT],
    "Line"         : ["i", null, "Номер линии текста", IN_TEXT],

    /* ========================================================
       Сцена
    ======================================================== */
    "Background" : ["c", "new Color().TRANSPARENT()", "Цвет фона сцены", IN_SCENE],
    "Ambient"    : ["c", "new Color().WHITE()", "Начальное освещение сцены", null],

    /* ========================================================
       Свет
    ======================================================== */
    "Light"     : ["i", "Enum.LightType.Point.GL", "Тип источника света (Point/Directional/Spot)", null],
    "Radius"    : ["f", null, "Радиус действия источника света", null],
    "Constant"  : ["f", "1f", "Константное затухание света", null],
    "Linear"    : ["f", "0.5f", "Линейное затухание света", null],
    "Quadratic" : ["f", "0.1f", "Квадратичное затухание света", null],
    "CutOff"    : ["2", null, "Вектор для ограничения угла свечения SpotLight", null],

    /* ========================================================
       CubeMap
    ======================================================== */
    "CubeMap"    : ["t", "WE.Resource.GetSolidBlackTexture().GetTexture()", "CubeMap текстура", null],
    "HasCubeMap" : ["b", false, "Флаг: установлен ли CubeMap (для оптимизации)", null]
}

function CreateUniformInfo(uname, u){
	var DefaultValue = u[1];
	if(DefaultValue == null){ DefaultValue = window.UniformTypes[u[0]][3]; }
	var HowUse = u[3];
	if(HowUse == null){ HowUse = IN_SELF }
	return `<tr><th>${uname}</th><th>${window.UniformTypes[u[0]][1]}</th><th>${DefaultValue}</th><th>${u[2]}</th><th>${HowUse}</th></tr>`;
}

var Result_Uniforms = "";
var Entries = Object.entries(Uniforms);
Entries.sort((A, B) => {
	var AT = window.UniformTypes[A[1][0]];
	var BT = window.UniformTypes[B[1][0]];
	if(AT[0] < BT[0]){ return -1; }
	if(AT[0] > BT[0]){ return  1; }
	return A[0].localeCompare(B[0]);
});
for(var UniformName in Object.fromEntries(Entries)){
	Result_Uniforms += CreateUniformInfo(UniformName, Uniforms[UniformName]);
}
p.innerHTML = `<table><tr><th>Название</th><th>Тип</th><th>Дефолтное значение</th><th>Описание</th><th>Когда применяется?</th></tr>${Result_Uniforms}</table>`;

p = document.getElementById("TYPES");

var Result_Types = "";
Entries = Object.entries(window.UniformTypes);
Entries.sort((A, B) => {
	return A[1][0] - B[1][0];
});
for(var i = 0; i < Entries.length; i++){
	var Type = Entries[i][0];
	Result_Types += `<tr><th>${window.UniformTypes[Type][1]}</th><th>${window.UniformTypes[Type][2]}</th><th>${window.UniformTypes[Type][3]}</th></tr>`;
}
p.innerHTML = `<table><tr><th>Java</th><th>GLSL</th><th>Дефолтное значение (Java)</th></tr>${Result_Types}</table>`;
</script>