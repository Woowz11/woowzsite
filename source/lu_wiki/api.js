const ParamsTypeConvert = {
	"n"  : "Nil",
	"s"  : "String",
	"b"  : "Bool",
	"r"  : "Resource",
	"i"  : "Int",
	"d"  : "Double",
	"f"  : "Function",
	"o"  : "Object",
	"v2" : "Vector2"
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
		"example":
`<code>Print(Abs(-6))</code> Выводит 6
<code>Print(Abs(3))</code> Выводит 3`
	},{
		"name": "Sqrt",
		"params": [["Число","d"]],
		"return": ["Результат","d"],
		"description": "Возводит 'Число' в квадратный корень",
		"example":
`<code>Print(Sqrt(4))</code> Выводит 2
<code>Print(Sqrt(6))</code> Выводит 2.44948974278318
<code>Print(Sqrt(-4))</code> Выводит -2`
	},{
		"name": "ToString",
		"params": [["Цель","o"]],
		"description": "Конвертирует 'Цель' в строку",
		"example": `<code>Print(ToString(true).." | "..ToString(2).." | "..ToString(function() end))</code>`
	},{
		"name": "Resources:LoadScript",
		"params": [["Скрипт","r"]],
		"description": "Загружает 'Скрипт' в текущий скрипт",
		"example": `<code>Resource:LoadScript("Mod:Test.lua")</code>`
	},{
		"name": "Controls:KeysPressed",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда какая-то клавиша нажата",
		"example": `<code>Controls:KeysPressed(function(Key) Print("KEY "..Key.." PRESSED") end)</code>`
	},{
		"name": "Controls:KeysReleased",
		"params": [["Функция","f",[["Клавиша","i"]]]],
		"description": "Вызывает 'Функция' каждый раз, когда какая-то клавиша отжата",
		"example": `<code>Controls:KeysReleased(function(Key) Print("KEY "..Key.." RELEASED") end)</code>`
	},{
		"name": "Controls:KeyPress",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' зажата",
		"example": `<code>Controls:KeyPress(KEY_C,function() Print("KEY C PRESS") end)</code>`
	},{
		"name": "Controls:KeyPressed",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' нажата",
		"example": `<code>Controls:KeyPress(KEY_V,function() Print("KEY V PRESSED") end)</code>`
	},{
		"name": "Controls:KeyReleased",
		"params": [["Клавиша","i"],["Функция","f"]],
		"description": "Вызывает 'Функция' каждый раз, когда 'Клавиша' отжата",
		"example": `<code>Controls:KeyPress(KEY_B,function() Print("KEY B RELEASED") end)</code>`
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
		"params": [["Функция","f"]],
		"description": "Вызывает 'Функция' каждый кадр",
		"example": `<code>Game:Update(function() PrintFast("Hi!!!") end)</code>`
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
<code>Print(TypeOf(?))</code> возвращает "?"`
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
			}
		]
	}
}

const Const = {
	"Keys": [
		["KEY_SPACE",32],["KEY_APOSTROPHE",39],["KEY_COMMA",44],["KEY_MINUS",45],["KEY_PERIOD",46],["KEY_SLASH",47],["KEY_0",48],["KEY_1",49],["KEY_2",50],["KEY_3",51],["KEY_4",52],["KEY_5",53],["KEY_6",54],["KEY_7",55],["KEY_8",56],["KEY_9",57],["KEY_SEMICOLON",59],["KEY_EQUAL",61],["KEY_A",65],["KEY_B",66],["KEY_C",67],["KEY_D",68],["KEY_E",69],["KEY_F",70],["KEY_G",71],["KEY_H",72],["KEY_I",73],["KEY_J",74],["KEY_K",75],["KEY_L",76],["KEY_M",77],["KEY_N",78],["KEY_O",79],["KEY_P",80],["KEY_Q",81],["KEY_R",82],["KEY_S",83],["KEY_T",84],["KEY_U",85],["KEY_V",86],["KEY_W",87],["KEY_X",88],["KEY_Y",89],["KEY_Z",90],["KEY_LEFT_BRACKET",91],["KEY_BACKSLASH",92],["KEY_RIGHT_BRACKET",93],["KEY_GRAVE_ACCENT",96],["KEY_WORLD_1",161],["KEY_WORLD_2",162],["KEY_ESCAPE",256],["KEY_ENTER",257],["KEY_TAB",258],["KEY_BACKSPACE",259],["KEY_INSERT",260],["KEY_DELETE",261],["KEY_RIGHT",262],["KEY_LEFT",263],["KEY_DOWN",264],["KEY_UP",265],["KEY_PAGE_UP",266],["KEY_PAGE_DOWN",267],["KEY_HOME",268],["KEY_END",269],["KEY_CAPS_LOCK",280],["KEY_SCROLL_LOCK",281],["KEY_NUM_LOCK",282],["KEY_PRINT_SCREEN",283],["KEY_PAUSE",284],["KEY_F1",290],["KEY_F2",291],["KEY_F3",292],["KEY_F4",293],["KEY_F5",294],["KEY_F6",295],["KEY_F7",296],["KEY_F8",297],["KEY_F9",298],["KEY_F10",299],["KEY_F11",300],["KEY_F12",301],["KEY_F13",302],["KEY_F14",303],["KEY_F15",304],["KEY_F16",305],["KEY_F17",306],["KEY_F18",307],["KEY_F19",308],["KEY_F20",309],["KEY_F21",310],["KEY_F22",311],["KEY_F23",312],["KEY_F24",313],["KEY_F25",314],["KEY_KP_0",320],["KEY_KP_1",321],["KEY_KP_2",322],["KEY_KP_3",323],["KEY_KP_4",324],["KEY_KP_5",325],["KEY_KP_6",326],["KEY_KP_7",327],["KEY_KP_8",328],["KEY_KP_9",329],["KEY_KP_DECIMAL",330],["KEY_KP_DIVIDE",331],["KEY_KP_MULTIPLY",332],["KEY_KP_SUBTRACT",333],["KEY_KP_ADD",334],["KEY_KP_ENTER",335],["KEY_KP_EQUAL",336],["KEY_LEFT_SHIFT",340],["KEY_LEFT_CONTROL",341],["KEY_LEFT_ALT",342],["KEY_LEFT_SUPER",343],["KEY_RIGHT_SHIFT",344],["KEY_RIGHT_CONTROL",345],["KEY_RIGHT_ALT",346],["KEY_RIGHT_SUPER",347],["KEY_MENU",348]
	],
	
	"Errors": [
		["ErrorDouble",-62122.723,"Ошибочное число, получается при ошибках"],
		["ErrorInt",-6212223,"Ошибочное целое число, получается при ошибках"]
	]
};