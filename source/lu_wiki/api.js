const ParamsTypeConvert = {
	"n"  : "Nil",
	"s"  : "String",
	"b"  : "Bool",
	"r"  : "Resource",
	"i"  : "Int",
	"d"  : "Double",
	"f"  : "Function",
	"o"  : "Object",
	"go" : "GameObject",
	"v2" : "Vector2",
	"t"  : "Table",
	"c"  : "Color"
}

const Texts = {
	"Start":
`
<center><b>Wiki по игре и сама игра, находятся в активной разработке!</b>
Эта wiki посвещена моддингу игры Lithium Universe
<a href="https://woowz11.github.io/woowzsite/lithiumuniverse">Ссылка</a> на главную страницу игры</center>`,

	"Resources":
`Система получения ресурсов как в игре Minecraft
<hr>
Ресурс указывается следующим образом,
сначала указывается ID модификации (основы),
потом символ двоиточие, потом локальный путь до файла

Вот пример, получения файла в ресурсах игры:
Полный путь -> <code>C:\\...\\Resources\\Shaders\\Default.lu_shader</code>
Ресурс &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> <code>Base:Shaders/Default.lu_shader</code>

Вот пример, получения файла в модификации Vanilla:
Полный путь -> <code>C:\\...\\Mods\\Vanilla\\Base.lua</code>
Ресурс &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> <code>Vanilla:Base.lua</code>`,
	
	"Textures":
`Пока-что текстуры должны быть обязательно в формате <code>.png</code>!

Возможен баг, что если текстура маленькая (например 2x2) или очень узкая (500x10),
то поломается текстура, что-бы это исправить, нужно добавить альфа-канал текстуре
(например, сделать 1 пиксель прозрачным)`,

	"Shaders":
`Каждый шейдер в игре состоит из 3-х файлов
<li> Линковочный файл</li><li> Вертиксный шейдер</li><li> Фрагментный шейдер</li><hr><b>Линковочный файл</b>
Содержит в себе путь до двух остальных файлов,
а именно до вертиксного шейдера и фрагментного шейдера
Должен быть формата <code>.lu_shader</code>
<code>{
	"Vertex"   : {Путь до вертиксного шейдера-ресурса},
	"Fragment" : {Путь до фрагментного шейдера-ресурса}
}</code>

Пример на <code>Base:Shaders/Default.lu_shader</code>
<code>{
	"Vertex"   : "Base:Shaders/Default.vert",
	"Fragment" : "Base:Shaders/Default.frag"
}</code>
<hr><b>Вертиксный файл</b>
Является шейдером GLSL обозначающий позицию полигонов,
так же отвечает за позицию объекта, и развёртку текстур
<hr><b>Фрагментный файл</b>
Является шейдером GLSL обозначающий цвет пикселей
<hr>
<b>Uniforms</b>
<code>ID                (int      ) = Айди объекта
Texture           (sampler2D) = Текстура
TextureSize       (vec2     ) = Размер текстуры
Position          (vec2     ) = Позиция объекта
CameraPosition    (vec2     ) = Позиция камеры
CameraOrientation (float    ) = Поворот камеры
CameraZoom        (float    ) = Зум камеры
Random            (float    ) = Случайное дробное число от 0 до 1
LocalRandom       (float    ) = Случайное дробное число от 0 до 1 (у каждого объекта свой)
ScreenSize        (vec2     ) = Текущий размер экрана
ScreenStartSize   (vec2     ) = Размер экрана при запуске игры
MousePosition     (vec2     ) = Позиция мыши в пикселях
Time              (float    ) = Прошедшее время с запуска приложения
DeltaTime         (float    ) = Размягчение зависящие от FPS
DebugRender       (bool     ) = Включен отладочный рендер?
Static            (bool     ) = Объект статичный?
Physical          (bool     ) = Объект физичный?
Interface         (bool     ) = Объект является интерфейсом?
Resize            (bool     ) = Объект меняет размер от размера экрана
Sleeping          (bool     ) = Физическое тело объекта спит?</code>`,

	"Fonts":
`Шрифты в разработке...`,

	"Mod":
`Что-бы создать свою модификацию,
нужно создать папку с ID мода в названии в папке <code>Mods</code>,
и создать файл с ID мода в названии и форматом <code>.lu_mod</code>
<hr>Строение файла мода:
<code>{
	"Name"        : {Название мода},
	"Version"     : {Версия мода},
	"Author"      : {Автор мода},
	"Description" : {Описание мода},
	"MainScript"  : {Первый запускаемый скрипт (можно это поле не указывать)},
	"Requires"    : {Тут нужно указать потребности мода, к примеру ["VanillaPhysic","Vanilla"], если ничего то []},
	"Conflict"    : {Тут нужно указать конфликтации мода, к примеру ["SandBox","VanillaController"], если ничего то []}
}</code><hr>
Этапы загрузки мода:

Сначала загружаются моды без потребностей,
и моды с потребностями которые не нашли нужный мод.
Потом загружаются по этапу моды с потребностями.
Конфликтация не влияет на загрузку`,

	"Etapi":
`Этапы запуска скриптов
<hr><li>MainScript's модов</li><li>Game:GameObjectLoading ивент</li><li>Game:UILoading ивент</li>`
}

const Functions = [
	{
		"name": "Print",
		"params": [["Сообщение","o"]],
		"description":
`Выводит 'Сообщение' в консоль

Ни в коем случае не вставляйте эту функцию в часто вызываемую функцию!
Заместо её используйте быструю и не засерающую логи функцию PrintFast!`,
		"example": 
`<code>Print("Hello world!")</code>
<code>Print(-72.841426)</code>
<code>Print(nil)</code>
<code>Print(true)</code>
<code>Print(function() end)</code>`
	},{
		"name": "PrintFast",
		"params": [["Сообщение","o"]],
		"description": "Выводит 'Сообщение' в консоль (очень быстро, и без логов и декораций)",
		"example": 
`<code>local i = 0
Game:Update(function()
	PrintFast(i)
	i = i + 1
end)</code>`
	},{
		"name": "Abs",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Делает 'Число' положительным",
		"desmos": "zcr9ya39zt",
		"example":
`<code>Print(Abs(-6))</code> Выводит 6
<code>Print(Abs(3))</code> Выводит 3`
	},{
		"name": "Sin",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Синус числа 'Число'",
		"desmos": "oyrngdlpct",
		"example":
`<code>Print(Sin(0))</code> Выводит 0
<code>Print(Sin(PI/6))</code> Выводит 0.499999999998586
<code>Print(Sin(PI/4))</code> Выводит 0.707106781184816
<code>Print(Sin(PI/3))</code> Выводит 0.866025403782806
<code>Print(Sin(PI/2))</code> Выводит 1
<code>Print(Sin(PI))</code> Выводит 9.79317772029349e-12 (близко к 0)
<code>Print(Sin((3*PI)/2))</code> Выводит -1
<code>Print(Sin(2*PI))</code> Выводит -1.9586355440587e-11 (близко к 0)` 
	},{
		"name": "Cos",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Косинус числа 'Число'",
		"desmos": "gm8wcq20wx",
		"example":
`<code>Print(Cos(0))</code> Выводит 1
<code>Print(Cos(PI/6))</code> Выводит 0.866025403785255
<code>Print(Cos(PI/4))</code> Выводит 0.707106781188279
<code>Print(Cos(PI/3))</code> Выводит 0.500000000002827
<code>Print(Cos(PI/2))</code> Выводит 4.89658886014675e-12 (близко к 0)
<code>Print(Cos(PI))</code> Выводит -1
<code>Print(Cos((3*PI)/2))</code> Выводит -1.46897665804402e-11 (близко к 0)
<code>Print(Cos(2*PI))</code> Выводит 1` 
	},{
		"name": "Deg",
		"params": [["Радиан","d"]],
		"return": ["Градус","d"],
		"description": "Конвертирует 'Радиан' в градус",
		"desmos": "rrgdf29os1",
		"example":
`<code>Print(Deg(0))</code> Выводит 0
<code>Print(Deg(1.5708))</code> Выводит 90.0002104594303
<code>Print(Deg(3.14159))</code> Выводит 179.999847961065
<code>Print(Deg(PI))</code> Выводит 180`
	},{
		"name": "Rad",
		"params": [["Градус","d"]],
		"return": ["Радиан","d"],
		"description": "Конвертирует 'Градус' в радиан",
		"desmos": "7cialiups1",
		"example":
`<code>Print(Rad(0))</code> Выводит 0
<code>Print(Rad(90))</code> Выводит 1.57079632679
<code>Print(Rad(180))</code> Выводит 3.14159265358`
	},{
		"name": "Sqrt",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Возводит 'Число' в квадратный корень",
		"desmos": "c2lhkxfnsh",
		"example":
`<code>Print(Sqrt(4))</code> Выводит 2
<code>Print(Sqrt(6))</code> Выводит 2.44948974278318
<code>Print(Sqrt(-4))</code> Выводит -2`
	},{
		"name": "Cbrt",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Возводит 'Число' в кубический корень",
		"desmos": "fbhap8ciar",
		"example":
`<code>Print(Cbrt(8))</code> Выводит 2
<code>Print(Cbrt(27))</code> Выводит 3
<code>Print(Cbrt(-8))</code> Выводит -2
<code>Print(Cbrt(-27))</code> Выводит -3`
	},{
		"name": "Max",
		"params": [["Число 1","d"],["Число 2","d"]],
		"return": ["Большее","d"],
		"description": "Возвращает большее число из 'Число 1' и 'Число 2'",
		"example":
`<code>Print(Max(0,0))</code> Выводит 0
<code>Print(Max(0,1))</code> Выводит 1
<code>Print(Max(1,0))</code> Выводит 1
<code>Print(Max(1,5))</code> Выводит 5
<code>Print(Max(3,3.001))</code> Выводит 3.001
<code>Print(Max(-2,-3))</code> Выводит -2
<code>Print(Max(-6,-6.001))</code> Выводит -6`
	},{
		"name": "Min",
		"params": [["Число 1","d"],["Число 2","d"]],
		"return": ["Меньшее","d"],
		"description": "Возвращает меньшее число из 'Число 1' и 'Число 2'",
		"example":
`<code>Print(Min(0,0))</code> Выводит 0
<code>Print(Min(0,1))</code> Выводит 0
<code>Print(Min(1,0))</code> Выводит 0
<code>Print(Min(1,5))</code> Выводит 1
<code>Print(Min(3,3.001))</code> Выводит 3
<code>Print(Min(-2,-3))</code> Выводит -3
<code>Print(Min(-6,-6.001))</code> Выводит -6.001`
	},{
		"name": "Sgn",
		"params": [["Число","d"]],
		"return": ["Знак числа","i"],
		"description": "Возвращает знак 'Число'",
		"desmos": "ca8na2en0u",
		"example":
`<code>Print(Sgn(1))</code> Выводит 1
<code>Print(Sgn(0))</code> Выводит 0
<code>Print(Sgn(-1))</code> Выводит -1
<code>Print(Sgn(5))</code> Выводит 1
<code>Print(Sgn(-5))</code> Выводит -1
<code>Print(Sgn(802.53))</code> Выводит 1
<code>Print(Sgn(-802.53))</code> Выводит -1`
	},{
		"name": "Floor",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Округляет 'Число' в меньшую сторону",
		"desmos": "wsnywmqsxp",
		"example":
`<code>Print(Floor(0))</code> Выводит 0
<code>Print(Floor(1))</code> Выводит 1
<code>Print(Floor(0.5))</code> Выводит 0
<code>Print(Floor(-0.5))</code> Выводит -1
<code>Print(Floor(1.5))</code> Выводит 1
<code>Print(Floor(-1.5))</code> Выводит -2`
	},{
		"name": "Ceil",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Округляет 'Число' в большую сторону",
		"desmos": "jrylu8juwe",
		"example":
`<code>Print(Ceil(0))</code> Выводит 0
<code>Print(Ceil(1))</code> Выводит 1
<code>Print(Ceil(0.5))</code> Выводит 1
<code>Print(Ceil(-0.5))</code> Выводит 0
<code>Print(Ceil(1.5))</code> Выводит 2
<code>Print(Ceil(-1.5))</code> Выводит -1`
	},{
		"name": "Round",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Округляет число 'Число'",
		"desmos": "9h9uuyruyw",
		"example":
`<code>Print(Round(0))</code> Выводит 0
<code>Print(Round(1))</code> Выводит 1
<code>Print(Round(0.2))</code> Выводит 0
<code>Print(Round(0.7))</code> Выводит 1
<code>Print(Round(0.5))</code> Выводит 1
<code>Print(Round(-0.5))</code> Выводит -0
<code>Print(Round(1.5))</code> Выводит 2
<code>Print(Round(-1.5))</code> Выводит -1`
	},{
		"name": "RoundLower",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Округляет число 'Число' (если число равно 0.5, то вернёт 0)",
		"desmos": "9h9uuyruyw",
		"example":
`<code>Print(RoundLower(0))</code> Выводит 0
<code>Print(RoundLower(1))</code> Выводит 1
<code>Print(RoundLower(0.2))</code> Выводит 0
<code>Print(RoundLower(0.7))</code> Выводит 1
<code>Print(RoundLower(0.5))</code> Выводит 0
<code>Print(RoundLower(-0.5))</code> Выводит -1
<code>Print(RoundLower(1.5))</code> Выводит 2
<code>Print(RoundLower(-1.5))</code> Выводит -2`
	},{
		"name": "Trunc",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Убирает дробную часть 'Число'",
		"desmos": "ufzilasi6m",
		"example":
`<code>Print(Trunc(0))</code> Выводит 0
<code>Print(Trunc(1))</code> Выводит 1
<code>Print(Trunc(0.5))</code> Выводит 0
<code>Print(Trunc(-0.5))</code> Выводит 0
<code>Print(Trunc(1.5))</code> Выводит 1
<code>Print(Trunc(-1.5))</code> Выводит -1`
	},{
		"name": "DeltaTime",
		"params": [],
		"return": ["Число","d"],
		"description":
`Возвращает число, для стабилизации функций связанных с скоростью выполнения,
к примеру с FPS

Чем меньше FPS, тем больше это число, и наоборот
При 400 FPS равно примерно <code>0.00148391723632812</code>`,
		"example": `<code>Game:Update(function() PrintFast(DeltaTime()) end)</code>`
	},{
		"name": "Game:GetFullVersion",
		"params": [],
		"return": ["Версия","s"],
		"description": `Возвращает текущую версию игры`,
		"example": `<code>Print(Game:GetFullVersion())</code>`
	},{
		"name": "MouseWorldPosition",
		"params": [],
		"return": ["Позиция","v2"],
		"description":
`Возвращает мировую позицию мыши
Тоже самое что <code>ScreenToWorldPosition(MouseLocalPosition())</code>`,
		"example":
`<code>Game:Update(function()
	PrintFast(MouseWorldPosition())
end)</code>`
	},{
		"name": "MousePosition",
		"params": [],
		"return": ["Позиция","v2"],
		"description":
`Возвращает позицию мыши
<code>Справа: 1, 0
Слева: -1, 0
Сверху: 0, 1
Снизу:  0,-1</code>`,
		"example":
`<code>Game:Update(function()
	PrintFast(MousePosition())
end)</code>`
	},{
		"name": "MouseLocalPosition",
		"params": [],
		"return": ["Позиция","v2"],
		"description":
`Возвращает позицию мыши (на которую влияет размер окна)
<code>Справа: W, 0
Слева: -W, 0
Сверху: 0, H
Снизу:  0,-H</code>`,
		"example":
`<code>Game:Update(function()
	PrintFast(MouseLocalPosition())
end)</code> Попробуйте изменить размер окна и посмотреть на результат`
	},{
		"name": "ScreenToWorldPosition",
		"params": [["Экранная позиция","v2"]],
		"return": ["Позиция","v2"],
		"description": `Превращает экранную позицию в мировую`,
		"example":
`<code>Game:Update(function()
	PrintFast(ScreenToWorldPosition(MouseLocalPosition()))
end)</code>`
	},{
		"name": "RandomFast",
		"params": [],
		"return": ["Случайное число","d"],
		"description": `Возвращает случайное дробное число от 0 до 1 (каждый раз случайный сид)`,
		"desmos": "93d1h8mu0b",
		"example":
`<code>Game:Update(function()
	PrintFast(RandomFast())
end)</code>`
	},{
		"name": "ToString",
		"params": [["Цель","o"]],
		"return": ["Результат","s"],
		"description":
`Конвертирует 'Цель' в строку
При конвертации строки сохраняет ", а таблицу автоматически применяет Table:ToString`,
		"example": `<code>Print(ToString(true).." | "..ToString(2).." | "..ToString("Example string!"))</code>`
	},{
		"name": "Table:ToString",
		"params": [["Таблица","t"]],
		"return": ["Результат","s"],
		"description": "Конвертирует 'Таблица' в детальную строку таблицы",
		"example":
`<code>local t = {"Hello!","Bye!",{true,-6.21,Vector2(80,-10.77),{{"A","B","C"},{"C","B","A"}}},{}}
Print(t)
PrintFast(Table:ToString(t))</code>

<code>Table{4}

{
   [1] = "Hello!",
   [2] = "Bye!",
   [3] = {
      [1] = true,
      [2] = -6.21,
      [3] = Vector2(80,-10.77),
      [4] = {
         [1] = {
            [1] = "A",
            [2] = "B",
            [3] = "C",
         },
         [2] = {
            [1] = "C",
            [2] = "B",
            [3] = "A",
         },
      },
   },
   [4] = {},
}</code>

<code>local t2 = {
	["A"] = "B",
	[5] = "C",
	[false] = "D",
	["F"] = {
		[1] = 2,
		[3] = 4,
		[5] = 6,
		[7] = 8
	},
	["EMPTY"] = {{{{},{}},{{},{}}},{{{},{}},{{},{}}}}
}
Print(t2)
PrintFast(Table:ToString(t2))</code>

<code>Table{5}

{
   ["A"] = "B",
   ["EMPTY"] = {
      [1] = {
         [1] = {
            [1] = {},
            [2] = {},
         },
         [2] = {
            [1] = {},
            [2] = {},
         },
      },
      [2] = {
         [1] = {
            [1] = {},
            [2] = {},
         },
         [2] = {
            [1] = {},
            [2] = {},
         },
      },
   },
   [5] = "C",
   [false] = "D",
   ["F"] = {
      [7] = 8,
      [1] = 2,
      [5] = 6,
      [3] = 4,
   },
}</code>`
	},{
		"name": "Resources:LoadScript",
		"params": [["Скрипт","r"]],
		"description": "Загружает 'Скрипт' в текущий скрипт",
		"example": `<code>Resources:LoadScript("Mod:Test.lua")</code>`
	},{
		"name": "Resources:SaveGameObject",
		"params": [["Игровой объект","go"],["Название","s"]],
		"description": "Сохраняет 'Игровой объект' в ресурсы игры, по пути <code>Ваш Мод ID:'Название'</code>",
		"example":
`Вызывалось в моде с ID: Mod
<code>local Obj = GameObject:Create("Test!", GO_Physical)
Resources:SaveGameObject(Obj, "TEST")</code> Путь до ресурса этого <code>Mod:TEST</code>`
	},{
		"name": "Resources:CloneGameObject",
		"params": [["Ресурс игрового объекта","r"]],
		"return": ["Клонированный игровой объект","go"],
		"description": "Клонирует 'Ресурс игрового объекта' и возвращает его",
		"example":
`Вызывалось в моде с ID: Mod
<code>local Obj = GameObject:Create("Test!", GO_Physical)

Resources:SaveGameObject(Obj, "TEST")

local linesize = 70
for a = 0, linesize do
    Obj = Resources:CloneGameObject("Mod:TEST") 
    GameObject:SetPosition(Obj,Vector2((a-(linesize/2))*2,0))
end</code>`
	},{
		"name": "Controls:KeyPressed",
		"type": "event",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда какая-то клавиша нажата",
		"example": `<code>Controls:KeyPressed(function(Key) Print("KEY "..Key.." PRESSED") end)</code>`
	},{
		"name": "Controls:KeyReleased",
		"type": "event",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда какая-то клавиша отжата",
		"example": `<code>Controls:KeyReleased(function(Key) Print("KEY "..Key.." RELEASED") end)</code>`
	},{
		"name": "Controls:KeyPress",
		"type": "event",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' зажата",
		"example": `<code>Controls:KeyPress(KEY_C,function() Print("KEY C PRESS") end)</code>`
	},{
		"name": "Controls:KeyPressedSingle",
		"type": "event",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' нажата",
		"example": `<code>Controls:KeyPressedSingle(KEY_V,function() Print("KEY V PRESSED") end)</code>`
	},{
		"name": "Controls:KeyReleasedSingle",
		"type": "event",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' отжата",
		"example": `<code>Controls:KeyReleasedSingle(KEY_B,function() Print("KEY B RELEASED") end)</code>`
	},{
		"name": "Controls:MouseScroll",
		"type": "event",
		"params": [["Функция","f",[["Направление","d"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда колёсико на мышке прокручено",
		"example":
`<code>Controls:MouseScroll(function(ScrollDir)
	Camera:MoveZoom(ScrollDir * 25)
end)</code>`
	},{
		"name": "Controls:MousePressed",
		"type": "event",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда клавиша на мышке нажата",
		"example":
`<code>Controls:MousePressed(function(Key)
	if Key == KEY_MOUSE_LEFT then
		Print("MOUSE KEY LMB PRESSED")
	elseif Key == KEY_MOUSE_RIGHT then
		Print("MOUSE KEY RMB PRESSED")
	elseif Key == KEY_MOUSE_MIDDLE then
		Print("MOUSE KEY MMB PRESSED")
	else
		Print("MOUSE KEY "..Key.." PRESSED")
	end
end)</code>`
	},{
		"name": "Controls:MouseReleased",
		"type": "event",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда клавиша на мышке отжата",
		"example":
`<code>Controls:MouseReleased(function(Key)
	if Key == KEY_MOUSE_LEFT then
		Print("MOUSE KEY LMB RELEASED")
	elseif Key == KEY_MOUSE_RIGHT then
		Print("MOUSE KEY RMB RELEASED")
	elseif Key == KEY_MOUSE_MIDDLE then
		Print("MOUSE KEY MMB RELEASED")
	else
		Print("MOUSE KEY "..Key.." RELEASED")
	end
end)</code>`
	},{
		"name": "Camera:Reset",
		"params": [],
		"description": "Возвращает камеру в исходное положение, позиция: Vector2(0,0), зум: 1, поворот: 0",
		"example":
`<code>Controls:KeyPressed(KEY_HOME, function() 
	Camera:Reset()
end)</code>`
	},{
		"name": "Camera:SetPosition",
		"params": [["Позиция","v2"]],
		"description": "Устанавливает позицию камеры на 'Позиция'",
		"example":
`<code>local i = 0
Game:Update(function()
	Camera:SetPosition(Vector2(0,Sin(i)))
	i = i + DeltaTime()
end)</code>`
	},{
		"name": "Camera:SetZoom",
		"params": [["Зум","d"]],
		"description": "Устанавливает зум камеры на 'Зум'",
		"example":
`<code>local i = 0
Game:Update(function()
	Camera:SetZoom(Sin(i)+1.5)
	i = i + DeltaTime()
end)</code>`
	},{
		"name": "Camera:Zoom",
		"params": [],
		"return": ["Зум","d"],
		"description": "Возвращает текущий зум камеры",
		"example":
`<code>Game:Update(function()
	PrintFast(Camera:Zoom())
end)</code>`
	},{
		"name": "Camera:Orientation",
		"params": [],
		"return": ["Радиан","d"],
		"description": "Возвращает текущий поворот камеры",
		"example":
`<code>Game:Update(function()
	PrintFast(Camera:Orientation())
end)</code>`
	},{
		"name": "Camera:Position",
		"params": [],
		"return": ["Позиция","v2"],
		"description": "Возвращает текущую позицию камеры",
		"example":
`<code>Game:Update(function()
	PrintFast(Camera:Position())
end)</code>`
	},{
		"name": "Camera:SetOrientation",
		"params": [["Радиан","d"]],
		"description": "Устанавливает поворот камеры на 'Радиан'",
		"example":
`<code>local i = 0
Game:Update(function()
	Camera:SetOrientation(i)
	i = i + DeltaTime()
end)</code>`
	},{
		"name": "Camera:Move",
		"params": [["Направление","v2"]],
		"description": "Двигает камеру на 'Направление'",
		"example":
`<code>Game:Update(function()
	local Shift = Controls:KeyIsPressed(KEY_LEFT_SHIFT)
	local Control = Controls:KeyIsPressed(KEY_LEFT_CONTROL)

	local Speed = IfThen(Shift,3,IfThen(Control,0.3,1))

	local W = Controls:KeyIsPressed(KEY_W)
	local S = Controls:KeyIsPressed(KEY_S)
	local D = Controls:KeyIsPressed(KEY_D)
	local A = Controls:KeyIsPressed(KEY_A)
	
	local DirY = 0
	if (W and not S) then
		DirY = 1
	end
	if (S and not W) then
		DirY = -1
	end
	
	local DirX = 0
	if (D and not A) then
		DirX = 1
	end
	if (A and not D) then
		DirX = -1
	end
	
	local CameraMovingDirection = Vector2(DirX, DirY) * Speed
	Camera:Move(CameraMovingDirection)
end)</code>`
	},{
		"name": "Camera:MoveCustom",
		"params": [["Направление","v2"],["Свой DeltaTime","d"]],
		"description": "Двигает камеру на 'Направление' вместе с кастомным 'Свой DeltaTime'",
		"example":
`<code>Game:Update(function()
	local Shift = Controls:KeyIsPressed(KEY_LEFT_SHIFT)
	local Control = Controls:KeyIsPressed(KEY_LEFT_CONTROL)

	local Speed = IfThen(Shift,3,IfThen(Control,0.3,1))

	local W = Controls:KeyIsPressed(KEY_W)
	local S = Controls:KeyIsPressed(KEY_S)
	local D = Controls:KeyIsPressed(KEY_D)
	local A = Controls:KeyIsPressed(KEY_A)
	
	local DirY = 0
	if (W and not S) then
		DirY = 1
	end
	if (S and not W) then
		DirY = -1
	end
	
	local DirX = 0
	if (D and not A) then
		DirX = 1
	end
	if (A and not D) then
		DirX = -1
	end
	
	local CameraMovingDirection = Vector2(DirX, DirY) * Speed
	Camera:MoveCustom(CameraMovingDirection, 1)
end)</code>`
	},{
		"name": "Camera:MoveZoom",
		"params": [["Зум","d"]],
		"description": "Зумит камеру на 'Зум'",
		"example":
`<code>Game:Update(function()
	local Shift = Controls:KeyIsPressed(KEY_LEFT_SHIFT)
	local Control = Controls:KeyIsPressed(KEY_LEFT_CONTROL)

	local Speed = IfThen(Shift,3,IfThen(Control,0.3,1))

	local Plus = Controls:KeyIsPressed(KEY_EQUAL)
	local Minus = Controls:KeyIsPressed(KEY_MINUS)
	
	if (Plus and not Minus) then
		Camera:MoveZoom(Speed)
	end
	if (Minus and not Plus) then
		Camera:MoveZoom(-Speed)
	end
end)</code>`
	},{
		"name": "Camera:MoveZoomCustom",
		"params": [["Зум","d"],["Свой DeltaTime","d"]],
		"description": "Зумит камеру на 'Зум' вместе с кастомным 'Свой DeltaTime'",
		"example":
`<code>Controls:MouseScroll(function(ScrollDir)
	Camera:MoveZoomCustom(ScrollDir * 0.25, 1)
end)</code>`
	},{
		"name": "Camera:Rotate",
		"params": [["Радиан","d"]],
		"description": "Вращает камеру на 'Радиан'",
		"example":
`<code>Game:Update(function()
	local Shift = Controls:KeyIsPressed(KEY_LEFT_SHIFT)
	local Control = Controls:KeyIsPressed(KEY_LEFT_CONTROL)

	local Speed = IfThen(Shift,3,IfThen(Control,0.3,1))

	local Right = Controls:KeyIsPressed(KEY_RIGHT)
	local Left = Controls:KeyIsPressed(KEY_LEFT)
	
	if (Right and not Left) then
		Camera:Rotate(Speed)
	end
	if (Left and not Right) then
		Camera:Rotate(-Speed)
	end
end)</code>`
	},{
		"name": "Controls:KeyIsPressed",
		"params": [["Клавиша","i"]],
		"return": ["Нажата?","b"],
		"description": "Возвращает true если 'Клавиша' нажата в данный миг",
		"example":
`<code>Game:Update(function()
	PrintFast(IfThen(Controls:KeyIsPressed(KEY_H),"Key H pressed!","Not pressed..."))
end)</code>`
	},{
		"name": "Game:Update",
		"type": "event",
		"params": [["Функция","f"]],
		"description": "Вызывает 'Функция' каждый кадр",
		"example": `<code>Game:Update(function() PrintFast("Run every frame!") end)</code>`
	},{
		"name": "Game:UpdateEveryGameObject",
		"type": "event",
		"params": [["Функция","f",[["Игровой объект","go"]]]],
		"description": "Вызывает 'Функция' каждый кадр для каждого игрового объекта",
		"example": 
`<code>Game:UpdateEveryGameObject(function(i)
	PrintFast(GameObject:GetName(i))
end)</code>`
	},{
		"name": "Game:GameObjectDeleted",
		"type": "event",
		"params": [["Функция","f",[["Игровой объект","go"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда игровой объект удалён",
		"example": 
`<code>Game:GameObjectDeleted(function(i)
	Print(GameObject:GetName(i).." removed!")
end)

local obj1 = GameObject:Create("OBJ1")
local obj2 = GameObject:Create("OBJ2")
local obj3 = GameObject:Create("OBJ3")

GameObject:Delete(obj1)
GameObject:Delete(obj3)</code>`
	},{
		"name": "Game:SetSimulationSpeed",
		"params": [["Скорость симуляции","d"]],
		"description": "Устанавливает 'Скорость симуляции'",
		"example":
`<code>local i = 0
Game:Update(function()
	Game:SetSimulationSpeed(Sin(i/100)+1)
	i = i + 1
end)</code>`
	},{
		"name": "Game:GameObjectLoading",
		"type": "event",
		"params": [["Функция","f"]],
		"description": "Вызывает 'Функция' после загрузки модов, для загрузки игровых объектов",
		"example": `<code>Game:GameObjectLoading(function() Print("Loading game objects!") end)</code>`
	},{
		"name": "Game:UILoading",
		"type": "event",
		"params": [["Функция","f"]],
		"description": "Вызывает 'Функция' после загрузки модов, для загрузки интерфейса",
		"example": `<code>Game:UILoading(function() Print("Loading UI!") end)</code>`
	},{
		"name": "IfThen",
		"params": [["Условие","b"],["Результат 1","o"],["Результат 2","o"]],
		"description":
`Если 'Условие' равно true, тогда вернуть 'Результат 1', иначе 'Результат 2'

Работает как <code>'Условие' ? 'Результат 1' : 'Результат 2'</code>`,
		"example":
`<code>Print(IfThen(true,"TRUE","FALSE"))</code> возвращает "TRUE"
<code>Print(IfThen(false,"TRUE","FALSE"))</code> возвращает "FALSE"`
	},{
		"name": "TypeOf",
		"params": [["Цель","o"]],
		"return": ["Тип","s"],
		"description": 
`Получает тип 'Цель' и выводит его в виде символа 'Тип'

<i>Прошу заметить, что числа возвращаются в виде "i" и "d",
хотя сами по себе числа в Lua всегда дробные,
так что если у вас есть проверка на дробное число,
то так же учитывайте "i"</i>`,
		"example": 
`<code>Print(TypeOf())</code> возвращает "n"
<code>Print(TypeOf(nil))</code> возвращает "n"
<code>Print(TypeOf("string"))</code> возвращает "s"
<code>Print(TypeOf(5))</code> возвращает "i"
<code>Print(TypeOf(6.2))</code> возвращает "d"
<code>Print(TypeOf(true))</code> возвращает "b"
<code>Print(TypeOf(function() Print("Hi!") end))</code> возвращает "f"
<code>Print(TypeOf({"string",-2,0.772,nil,false,{function() end,true}}))</code> возвращает "t"
<code>Print(TypeOf(Vector2(7,-2.1))</code> возвращает "v2"
<code>Print(TypeOf(Color(1,0,0.5))</code> возвращает "c"
<code>Print(TypeOf(?))</code> возвращает "?"`
	},{
		"name": "GameObject:Create",
		"params": [["Имя","s"],["Тип","i"]],
		"return": ["Игровой объект","go"],
		"description": "Создаёт новый игровой объект с именем 'Имя' и типом 'Тип', обе переменные могут быть nil",
		"example":
`<code>local i = GameObject:Create("Default GameObject!", GO_Default)
i = GameObject:Create("Physical GameObject!", GO_Physical)
i = GameObject:Create("UI GameObject", GO_UI)</code>`
	},{
		"name": "GameObject:Delete",
		"params": [["Игровой объект","o"]],
		"description": "Удаляет 'Игровой объект'",
		"example":
`<code>local i = GameObject:Create()
Print(GameObject:GetName(i))
GameObject:Delete(i)
Print(GameObject:GetName(i))</code>`
	},{
		"name": "GameObject:MousePressed",
		"params": [["Цель","go"],["Функция","f",[["Клавиша","i"],["Объект к которому привязан ивент","go"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда на 'Цель' нажали мышкой",
		"type": "event",
		"example":
`<code>local i = GameObject:Create("Left",GO_UI)
GameObject:SetCenter(i,Vector2(1,0))
GameObject:SetColor(i,Color(1))
GameObject:SetPosition(i,Vector2(-0.6,0))
GameObject:MousePressed(i,function(Key, Orig)
	Print("Mouse press ["..Key.."] to ["..GameObject:GetName(Orig).."] #Left#")
end)

local i = GameObject:Create("Right",GO_UI)
GameObject:SetCenter(i,Vector2(-1,0))
GameObject:SetColor(i,Color(0,1))
GameObject:SetPosition(i,Vector2(0.6,0))
GameObject:MousePressed(i,function(Key, Orig)
	Print("Mouse press ["..Key.."] to ["..GameObject:GetName(Orig).."] #Right#")
end)</code>`
	},{
		"name": "GameObject:MouseHover",
		"params": [["Цель","go"],["Функция","f",[["Наведён?","b"],["Объект к которому привязан ивент","go"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда на 'Цель' наведена мышка, или отведена",
		"type": "event",
		"example":
`<code>local i = GameObject:Create("Hover test", GO_UI)
GameObject:SetColor(i,Color(1))
GameObject:MouseHover(i,function(Hover,Orig)
	if (Hover) then
		GameObject:SetColor(Orig,Color(0,1))
	else
		GameObject:SetColor(Orig,Color(1))
	end
end)</code>`
	},{
		"name": "GameObject:SetPosition",
		"params": [["Цель","go"],["Позиция","v2"]],
		"description": "Устанавливает 'Позиция' объекту 'Цель'",
		"example":
`<code>local Obj = GameObject:Create()
Game:Update(function()
	GameObject:SetPosition(Obj, MouseWorldPosition())
end)</code>`
	},{
		"name": "GameObject:SetResize",
		"params": [["Цель","go"],["Менять размер объекту в зависимости от размера окна?","b"]],
		"description":
`Устанавливает 'Менять размер объекту в зависимости от размера окна?' объекту 'Цель'
Корректно работает только с интерфейсом`,
		"example":
`<code>local Obj = GameObject:Create(nil, GO_UI)
GameObject:SetResize(Obj,false)</code>`
	},{
		"name": "GameObject:SetStatic",
		"params": [["Цель","go"],["Сделать статичным?","b"]],
		"description":
`Устанавливает 'Сделать статичным?' объекту 'Цель'
Работает только на GO_Physical`,
		"example":
`<code>local i = GameObject:Create("Static GameObject", GO_Physical)
GameObject:SetStatic(i,true)</code>`
	},{
		"name": "GameObject:MakeItText",
		"params": [["Цель","go"],["Стартовый текст","s"]],
		"description": `Превращает 'Цель' в текст, с начальным текстом 'Стартовый текст'`,
		"example":
`<code>local Obj = GameObject:Create(nil, GO_UI)
GameObject:MakeItText(Obj,"Hello!")</code>`
	},{
		"name": "GameObject:SetOrientation",
		"params": [["Цель","go"],["Радиан","v2"]],
		"description": "Устанавливает поворот объекта 'Цель' на 'Радиан'",
		"example":
`<code>local i = GameObject:Create()
GameObject:SetOrientation(i,Rad(45))</code>`
	},{
		"name": "GameObject:SetCenter",
		"params": [["Цель","go"],["Центр","v2"]],
		"description": "Устанавливает 'Центр' объекту 'Цель'",
		"example":
`<code>local i1 = GameObject:Create()
GameObject:SetSize(i1,Vector2(4,1))
GameObject:SetPosition(i1,Vector2(-15,0))
GameObject:SetColor(i1,Color(1))
GameObject:SetCenter(i1,Vector2(-1,0))

local i2 = GameObject:Create()
GameObject:SetSize(i2,Vector2(4,1))
GameObject:SetPosition(i2,Vector2(0,0))
GameObject:SetColor(i2,Color(0,1))
GameObject:SetCenter(i2,Vector2(0,0))

local i3 = GameObject:Create()
GameObject:SetSize(i3,Vector2(4,1))
GameObject:SetPosition(i3,Vector2(15,0))
GameObject:SetColor(i3,Color(0,0,1))
GameObject:SetCenter(i3,Vector2(1,0))

local t = 0;
Game:Update(function()
	t = t + 0.001
	GameObject:SetOrientation(i1,t)
	GameObject:SetOrientation(i2,t)
	GameObject:SetOrientation(i3,t)
end)</code>`
	},{
		"name": "GameObject:SetSize",
		"params": [["Цель","go"],["Размер","v2"]],
		"description": "Устанавливает 'Размер' объекту 'Цель'",
		"example":
`<code>local Obj = GameObject:Create()
GameObject:SetSize(Obj,Vector2(2,1)) -- Объект шире в 2 раза
GameObject:SetSize(Obj,Vector2(1,2)) -- Объект выше в 2 раза
GameObject:SetSize(Obj,Vector2(2,2)) -- Объект больше в 2 раза</code>`
	},{
		"name": "GameObject:SetColor",
		"params": [["Цель","go"],["Цвет","c"]],
		"description": "Устанавливает 'Цвет' объекту 'Цель'",
		"example":
`Вызывалось в моде с ID: Vanilla
<code>local i = GameObject:Create("Default GameObject!", GO_Physical)

Resources:SaveGameObject(i, "TestObject")

local linesize = 70
for a = 0, linesize do
	i = Resources:CloneGameObject("Vanilla:TestObject") 
	GameObject:SetPosition(i, Vector2((a-(linesize/2))*2,0))
	GameObject:SetColor(i, Color(1,IfThen(a%2 == 0, 1-a/linesize,1),IfThen(a%3 == 0, 1-a/linesize,1)))
end</code>`
	},{
		"name": "GameObject:SetText",
		"params": [["Цель","go"],["Текст","s"]],
		"description": "Устанавливает 'Текст' объекту 'Цель'",
		"example":
`<code>local i = GameObject:Create("Time",GO_UI)
local TimePrefix = "Time: "
local t = 0
GameObject:MakeItText(i,TimePrefix..t)
Game:Update(function()
	t = t + 1
	GameObject:SetText(i,TimePrefix..t)
end)</code>`
	},{
		"name": "Table:Remove",
		"params": [["Таблица","t"],["Ключ (или индекс)","o"],["Удалять по ключу?","b"]],
		"description":
`Удаляет из 'Таблица' элемент под индексом 'Ключ (или индекс)' если 'Удалять по ключу?' равен false или nil, или
удаляет ключ 'Ключ (или индекс)' из 'Таблица' если 'Удалять по ключу?' равен true`,
		"example":
`<code>local T = {10,9,8,7,6,5,4,3,2,1,0}
Print(Table:ToString(T))
Table:Remove(T,2)
Table:Remove(T,2)
Print(Table:ToString(T))

T = {[true] = 1, [false] = 2, [1] = 3, ["Text!"] = 4, [{1,2,3}] = 5}
Print(Table:ToString(T))
Table:Remove(T,false,true)
Table:Remove(T,"Text!",true)
Print(Table:ToString(T))</code>`
	},{
		"name": "Table:Pairs",
		"params": [["Таблица","t"],["Функция","f",[["Индекс","i"],["Ключ","o"],["Переменная","o"]]]],
		"description": `Разбирает 'Таблица' по компонентам (индекс (позиция элемента), ключ, переменная) и вызывает их в 'Функция',`,
		"example":
`<code>local T = {"a","b","c","d","f","g"}

Table:Pairs(T,function(i,Key,Value)
	Print("["..i.."] "..Key.." = "..ToString(Value))
end)

T = {["a"] = true, ["b"] = false, ["c"] = Vector2(0,2), ["d"] = "str"}

Table:Pairs(T,function(i,Key,Value)
	Print("["..i.."] "..Key.." = "..ToString(Value))
end)</code>`
	},{
		"name": "GameObject:GetName",
		"params": [["Цель","go"]],
		"return": ["Название","s"],
		"description": "Возвращает название 'Цель'",
		"example":
`<code>local i = GameObject:Create("That GameObject Name!")
Print(GameObject:GetName(i))</code>`
	},{
		"name": "GameObject:GetPosition",
		"params": [["Цель","go"]],
		"return": ["Позиция","v2"],
		"description": "Возвращает позицию 'Цель'",
		"example":
`<code>local i = GameObject:Create(nil,GO_Physical)
Game:Update(function()
	PrintFast(GameObject:GetPosition(i))
end)</code>`
	},{
		"name": "GameObject:SetData",
		"params": [["Цель","go"],["Айди информации","i"],["Информация","o"]],
		"description": "Устанавливает 'Информация' в поле 'Айди информации' объекту 'Цель'",
		"example":
`<code>local i = GameObject:Create()
Print(GameObject:GetData(i,536))
GameObject:SetData(i,536,"Hello!")
Print(GameObject:GetData(i,536))</code>`
	},{
		"name": "GameObject:GetData",
		"params": [["Цель","go"],["Айди информации","i"]],
		"return": ["Информация","o"],
		"description":
`Возвращает информацию из поля 'Айди информации' в 'Цель'
Если не найдено, возвращает nil`,
		"example":
`<code>local i = GameObject:Create()
Print(GameObject:GetData(i,"536))
GameObject:SetData(i,536,"Hello!")
Print(GameObject:GetData(i,536))</code>`
	},{
		"name": "GameObject:SetCreatedFromPlayer",
		"params": [["Цель","go"],["Создан игроком?","b"]],
		"description": "Устанавливает 'Создан игроком?' объекту 'Цель'",
		"example":
`<code>local i = GameObject:Create()
Print(GameObject:GetCreatedFromPlayer(i))
GameObject:SetCreatedFromPlayer(i,true)
Print(GameObject:GetCreatedFromPlayer(i))</code>`
	},{
		"name": "GameObject:GetCreatedFromPlayer",
		"params": [["Цель","go"]],
		"return": ["Создан игроком?","b"],
		"description":`Возвращает "Создано игроком?" из объекта 'Цель'`,
		"example":
`<code>local i = GameObject:Create()
Print(GameObject:GetCreatedFromPlayer(i))
GameObject:SetCreatedFromPlayer(i,true)
Print(GameObject:GetCreatedFromPlayer(i))</code>`
	},{
		"name": "GameObject:SetSizeFromTexture",
		"params": [["Цель","go"],["Текстура","r"],["Маштаб","d"]],
		"description":
`Устанавливает размер, подобно размеру 'Текстура' умноженная 'Маштаб' объекту 'Цель'
Если 'Маштаб' не установлен, то он равен 1
Обычный размер, это 32 пикселя тектсуры = 1 игровой метр`,
		"example":
`Вызывалось в моде с ID: Vanilla
<code>local HumanSize = GameObject:Create("HumanSize", GO_Physical)
GameObject:SetTexture(HumanSize, "Vanilla:HumanSize.png")
GameObject:SetSizeFromTexture(HumanSize, "Vanilla:HumanSize.png")</code>`
	},{
		"name": "GameObject:SetTexture",
		"params": [["Цель","go"],["Текстура","r"]],
		"description": "Устанавливает 'Текстура' объекту 'Цель'",
		"example":
`Вызывалось в моде с ID: Vanilla
<code>local i = GameObject:Create("Default GameObject!", GO_Physical)

Resources:SaveGameObject(i, "TestObject")

local textures = {"Button.png","ButtonHover.png","Default.png"}

local total = 70
local t = 1
for a = 0, total do
    i = Resources:CloneGameObject("Vanilla:TestObject")
    
    GameObject:SetTexture(i,"Base:Textures/"..textures[t])
    
    GameObject:SetPosition(i,Vector2((a-(total/2))*2.5,0))
    t = t + 1
    if (t>#textures) then
        t = 1
    end
end</code>`
	},{
		"name": "GameObject:SetShader",
		"params": [["Цель","go"],["Шейдер","r"]],
		"description": "Устанавливает 'Шейдер' объекту 'Цель'",
		"example":
`Вызывалось в моде с ID: Vanilla
<code>local i = GameObject:Create("Default GameObject!", GO_Physical)

Resources:SaveGameObject(i, "TestObject")

local total = 70
for a = 0, total do
    i = Resources:CloneGameObject("Vanilla:TestObject")
    
    GameObject:SetShader(i,"Vanilla:Shader.lu_shader") --Укажите свой шейдер
    
    GameObject:SetPosition(i,Vector2((a-(total/2))*2.5,0))
end</code>`
	}
];

const Classes = {
	"Vector2": {
		"type": "v2",
		"constructors": [
			{
				"params": [["Первое число","d"],["Второе число","d"]],
				"description": `Возвращает Vector2 где X равен 'Первое число' и Y равен 'Второе число'`,
				"example":
`<code>Print(Vector2(0,5))</code> возвращает "Vector2(0,5)"
<code>Print(Vector2(-0.12,737))</code> возвращает "Vector2(-0.12,737)"
<code>Print(Vector2(1,-1))</code> возвращает "Vector2(1,-1)"
<code>Print(Vector2(9000,8000))</code> возвращает "Vector2(9000,8000)"`
			},
			{
				"params": [["Число","d"]],
				"description": `Возвращает Vector2 где X равен 'Число' и Y равен 'Число'`,
				"example":
`<code>Print(Vector2(1))</code> возвращает "Vector2(1,1)"
<code>Print(Vector2(-7.2))</code> возвращает "Vector2(-7.2,-7.2)"
<code>Print(Vector2(8123))</code> возвращает "Vector2(8123,8123)"`
			},
			{
				"params": [],
				"description": `Возвращает Vector2 где X равен 0 и Y равен 0`,
				"example": `<code>Print(Vector2())</code> возвращает "Vector2(0,0)"`
			}
		],
		"description": "Хранит в себе два числа, X и Y",
		"example": ``,
		"values": [
			{
				"name": "X",
				"type": "d",
				"description": "Первое число",
				"example": 
`<code>local V2 = Vector2(2,3)
V2.X = -5
Print(V2) Print(V2.X)</code> Выводит Vector2(-5,3) и -5`
			},{
				"name": "Y",
				"type": "d",
				"description": "Второе число",
				"example": 
`<code>local V2 = Vector2(2,3)
V2.Y = -5
Print(V2) Print(V2.Y)</code> Выводит Vector2(2,-5) и -5`
			}
		],
		"functions": [
			{
				"name": "ToString",
				"params": [],
				"return": ["Результат","s"],
				"description": "Конвертирует Vector2 в строку",
				"example": `<code>Print(Vector2(8,-2.3):ToString())</code> возвращает строку "Vector2(8,-2.3)"`
			},{
				"name": "Rotate",
				"params": [["Радиан","d"]],
				"return": ["Результат","v2"],
				"description": "Поворачивает Vector2 на 'Радиан' (относительно нулевых координат)",
				"example": ``
			},{
				"name": "Length",
				"params": [],
				"return": ["Длина","d"],
				"description": 
`Возвращает длину Vector2

Вычисляется как <code>Sqrt(X*X + Y*Y)</code>`,
				"example": 
`<code>Print(Vector2(1,3):Length())</code> возвращает "3.16227766016838"
<code>Print(Vector2(10,10):Length())</code> возвращает "14.142135623731"
<code>Print(Vector2(0.123,-15.2):Length())</code> возвращает "15.2004976563269"
<code>Print(Vector2(631,-2):Length())</code> возвращает "631.003169564147"`
			},{
				"name": "Abs",
				"params": [],
				"return": ["Результат","v2"],
				"description": "Делает Vector2 положительным",
				"example": `<code>Print(Vector2(-15.2,8.2):Abs())</code> Выводит Vector2(15.2,8.2)`
			}
		],
		"operators": [
			{
				"name": ["v2","+","v2"],
				"example": `<code>Vector2(0,2) + Vector2(3,-1) = Vector2(3,1)</code>`
			},
			{
				"name": ["v2","+","d"],
				"example": `<code>Vector2(1,2) + 7.2 = Vector2(8.2,9.2)</code>`
			},
			{
				"name": ["v2","-","v2"],
				"example": `<code>Vector2(0,2) - Vector2(3,-1) = Vector2(-3,3)</code>`
			},
			{
				"name": ["v2","-","d"],
				"example": `<code>Vector2(1,2) - 7.2 = Vector2(-6.2,-5.2)</code>`
			},
			{
				"name": ["v2","*","v2"],
				"example": `<code>Vector2(1,2.5) * Vector2(3,-30) = Vector2(3,-75)</code>`
			},
			{
				"name": ["v2","*","d"],
				"example": `<code>Vector2(1,2.5) * 3 = Vector2(3,7.5)</code>`
			},
			{
				"name": ["v2","/","v2"],
				"example": `<code>Vector2(4,3) / Vector2(2,3) = Vector2(2,1)</code>`
			},
			{
				"name": ["v2","/","d"],
				"example": `<code>Vector2(4,3) / 2 = Vector2(2,1.5)</code>`
			},
			{
				"name": ["v2","-","left"],
				"example": `<code>-Vector2(2,-3) = Vector2(-2,3)</code>`
			},
			{
				"name": ["v2","..","s"],
				"example": `<code>Vector2(7,3.2) .. " Hi!" = "Vector2(7,3.2) Hi!"</code>`
			},
			{
				"name": ["v2","==","v2"],
				"example":
`<code>Vector2(0,0) == Vector2(0,0) = true</code>
<code>Vector2(0,0) == Vector2(3,2.3) = false</code>`
			},
			{
				"name": ["v2","<","v2"],
				"example":
`<code>Vector2(0,0) < Vector2(0,0) = false</code>
<code>Vector2(0,0) < Vector2(3,2.3) = true</code>`
			},
			{
				"name": ["v2","<=","v2"],
				"example":
`<code>Vector2(0,0) <= Vector2(0,0) = true</code>
<code>Vector2(0,0) <= Vector2(3,2.3) = true</code>`
			}
		]
	},
	
	"Color": {
		"type": "c",
		"constructors": [
			{
				"params": [["Красный","d"],["Зелёный","d"],["Синий","d"],["Прозрачность","d"]],
				"description": `Возвращает Color где R равен 'Красный' и G равен 'Зелёный' и B равен 'Синий' и A равен 'Прозрачность'`,
				"example":
`<code>Print(Color(1,0,0,1))</code> возвращает "Color(1,0,0)" это красный цвет
<code>Print(Color(1,1,0,1))</code> возвращает "Color(1,1,0)" это жёлтый цвет
<code>Print(Color(1,0,1,1))</code> возвращает "Color(1,0,1)" это фиолетовый цвет
<code>Print(Color(0,1,0,1))</code> возвращает "Color(0,1,0)" это зелёный цвет
<code>Print(Color(0,0,1,1))</code> возвращает "Color(0,0,1)" это синий цвет
<code>Print(Color(0,1,1,1))</code> возвращает "Color(0,1,1)" это голубой цвет
<code>Print(Color(1,1,1,1))</code> возвращает "Color(1,1,1)" это белый цвет
<code>Print(Color(0.5,0.5,0.5,1))</code> возвращает "Color(0.5,0.5,0.5)" это серый цвет
<code>Print(Color(0,0,0,1))</code> возвращает "Color(0,0,0)" это чёрный цвет
<code>Print(Color(1,0,0,0.5))</code> возвращает "Color(1,0,0,0.5)" это полу-прозрачный красный цвет`
			},
			{
				"params": [["Красный","d"],["Зелёный","d"],["Синий","d"]],
				"description": `Возвращает Color где R равен 'Красный' и G равен 'Зелёный' и B равен 'Синий' и A равен 1`,
				"example":
`<code>Print(Color(1,0,0))</code> возвращает "Color(1,0,0)" это красный цвет
<code>Print(Color(1,1,0))</code> возвращает "Color(1,1,0)" это жёлтый цвет
<code>Print(Color(1,0,1))</code> возвращает "Color(1,0,1)" это фиолетовый цвет`
			},
			{
				"params": [["Красный","d"],["Зелёный","d"]],
				"description": `Возвращает Color где R равен 'Красный' и G равен 'Зелёный' и B равен 0 и A равен 1`,
				"example":
`<code>Print(Color(1,0))</code> возвращает "Color(1,0,0)" это красный цвет
<code>Print(Color(1,1))</code> возвращает "Color(1,1,0)" это жёлтый цвет
<code>Print(Color(0,0))</code> возвращает "Color(0,0,0)" это чёрный цвет`
			},
			{
				"params": [["Красный","d"]],
				"description": `Возвращает Color где R равен 'Красный' и G равен 0 и B равен 0 и A равен 1`,
				"example":
`<code>Print(Color(1))</code> возвращает "Color(1,0,0)" это красный цвет
<code>Print(Color(0))</code> возвращает "Color(0,0,0)" это чёрный цвет`
			},
			{
				"params": [],
				"description": `Возвращает чёрный цвет`,
				"example":
`<code>Print(Color())</code> возвращает "Color(0,0,0)" это чёрный цвет`
			}
		],
		"description": "Хранит в себе RGBA цвет",
		"example": ``,
		"values": [
			{
				"name": "R",
				"type": "d",
				"description": "Насыщенность красного (0-1)",
				"example":
`<code>local C = Color(1,1,1)
C.R = 0
Print(C) Print(C.R)</code> Выводит Color(0,1,1) и 0`
			},{
				"name": "G",
				"type": "d",
				"description": "Насыщенность зелёного (0-1)",
				"example":
`<code>local C = Color(1,1,1)
C.G = 0
Print(C) Print(C.G)</code> Выводит Color(1,0,1) и 0`
			},{
				"name": "B",
				"type": "d",
				"description": "Насыщенность синего (0-1)",
				"example":
`<code>local C = Color(1,1,1)
C.B = 0
Print(C) Print(C.B)</code> Выводит Color(1,1,0) и 0`
			},{
				"name": "A",
				"type": "d",
				"description": "Прозрачность (0-1)",
				"example":
`<code>local C = Color(1,1,1)
C.A = 0
Print(C) Print(C.A)</code> Выводит Color(1,1,1,0) и 0`
			}
		],
		"functions": [
			{
				"name": "ToString",
				"params": [],
				"return": ["Результат","s"],
				"description": "Конвертирует Color в строку",
				"example":
`<code>Print(Color(1,0,0.5):ToString())</code> возвращает строку "Color(1,0,0.5)"
<code>Print(Color(0,1,0,0.63):ToString())</code> возвращает строку "Color(0,1,0,0.63)"`
			}
		],
		"operators": [
			{
				"name": ["c","..","s"],
				"example": `<code>Color(1,0,0.5,0.1) .. " -> What the color?" = "Color(1,0,0.5,0.1) -> What the color?"</code>`
			},
		]
	}
}

const Const = {
	"Keys": {
		"Mouse": [["KEY_MOUSE_LEFT",0],["KEY_MOUSE_RIGHT",1],["KEY_MOUSE_MIDDLE",2]],
		"Keyboard": [["KEY_SPACE",32],["KEY_APOSTROPHE",39],["KEY_COMMA",44],["KEY_MINUS",45],["KEY_PERIOD",46],["KEY_SLASH",47],["KEY_0",48],["KEY_1",49],["KEY_2",50],["KEY_3",51],["KEY_4",52],["KEY_5",53],["KEY_6",54],["KEY_7",55],["KEY_8",56],["KEY_9",57],["KEY_SEMICOLON",59],["KEY_EQUAL",61],["KEY_A",65],["KEY_B",66],["KEY_C",67],["KEY_D",68],["KEY_E",69],["KEY_F",70],["KEY_G",71],["KEY_H",72],["KEY_I",73],["KEY_J",74],["KEY_K",75],["KEY_L",76],["KEY_M",77],["KEY_N",78],["KEY_O",79],["KEY_P",80],["KEY_Q",81],["KEY_R",82],["KEY_S",83],["KEY_T",84],["KEY_U",85],["KEY_V",86],["KEY_W",87],["KEY_X",88],["KEY_Y",89],["KEY_Z",90],["KEY_LEFT_BRACKET",91],["KEY_BACKSLASH",92],["KEY_RIGHT_BRACKET",93],["KEY_GRAVE_ACCENT",96],["KEY_WORLD_1",161],["KEY_WORLD_2",162],["KEY_ESCAPE",256],["KEY_ENTER",257],["KEY_TAB",258],["KEY_BACKSPACE",259],["KEY_INSERT",260],["KEY_DELETE",261],["KEY_RIGHT",262],["KEY_LEFT",263],["KEY_DOWN",264],["KEY_UP",265],["KEY_PAGE_UP",266],["KEY_PAGE_DOWN",267],["KEY_HOME",268],["KEY_END",269],["KEY_CAPS_LOCK",280],["KEY_SCROLL_LOCK",281],["KEY_NUM_LOCK",282],["KEY_PRINT_SCREEN",283],["KEY_PAUSE",284],["KEY_F1",290],["KEY_F2",291],["KEY_F3",292],["KEY_F4",293],["KEY_F5",294],["KEY_F6",295],["KEY_F7",296],["KEY_F8",297],["KEY_F9",298],["KEY_F10",299],["KEY_F11",300],["KEY_F12",301],["KEY_F13",302],["KEY_F14",303],["KEY_F15",304],["KEY_F16",305],["KEY_F17",306],["KEY_F18",307],["KEY_F19",308],["KEY_F20",309],["KEY_F21",310],["KEY_F22",311],["KEY_F23",312],["KEY_F24",313],["KEY_F25",314],["KEY_K0",320],["KEY_K1",321],["KEY_K2",322],["KEY_K3",323],["KEY_K4",324],["KEY_K5",325],["KEY_K6",326],["KEY_K7",327],["KEY_K8",328],["KEY_K9",329],["KEY_K_DECIMAL",330],["KEY_K_DIVIDE",331],["KEY_K_MULTIPLY",332],["KEY_K_SUBTRACT",333],["KEY_K_ADD",334],["KEY_K_ENTER",335],["KEY_K_EQUAL",336],["KEY_LEFT_SHIFT",340],["KEY_LEFT_CONTROL",341],["KEY_LEFT_ALT",342],["KEY_LEFT_SUPER",343],["KEY_RIGHT_SHIFT",344],["KEY_RIGHT_CONTROL",345],["KEY_RIGHT_ALT",346],["KEY_RIGHT_SUPER",347],["KEY_MENU",348]]
	},
	
	"Errors": [
		["ErrorDouble",-62122.723,"Ошибочное число, получается при ошибках"],
		["ErrorInt",-6212223,"Ошибочное целое число, получается при ошибках"],
		["ErrorVector2","Vector2(-62122.723,-62122.723)","Ошибочный Vector2, получается при ошибках"],
		["ErrorString","\"Error_GwevWET23g3#G_#1d\"","Ошибочная строка, получается при ошибках"]
	],
	
	"Resources": [
		["ErrorTexture","\"Base:Textures/Error/NotFound.png\"","Путь до текстуры ошибки"],
		["ErrorShader","\"Base:Shaders/Error.lu_shader\"","Путь до шейдера ошибки"]
	],
	
	"Other": [
		["ScreenScale","Vector2(10/3,2.5)","Константы размера экрана"]
	],
	
	"GameObjectTypes": [
		["GO_Default",0,"Обычный тип объекта, пустышка"],
		["GO_UI",1,"Объект является интерфейсом"],
		["GO_Physical",2,"Объект имеет физику"]
	],
	
	"ColliderTypes": [
		["COL_Square",1,"Квадратный коллайдер"],
		["COL_Circle",2,"Круглый коллайдер"]
	],
	
	"Math": [
		["PI",3.14159265358,"Отношение длины окружности к её диаметру"]
	]
};