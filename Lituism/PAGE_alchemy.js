REGISTER_PAGE("alchemy", "ΛLCHΞMY", () => {

/* ═══════════════════════════════════════════════════════════
   НАСТРОЙКИ
   ═══════════════════════════════════════════════════════════ */
const SAVE_KEY      = "al_save_v2";
const FIELD_H       = 460;
const ITEM          = 68;
const ICON          = 44;
const MAX_FIELD     = 60;
const HINTS_PER_DAY = 3;
const AVAIL_MODE    = "full";
const LIST_FX       = true;

/* ═══════════════════════════════════════════════════════════
   ЭЛЕМЕНТЫ
   ═══════════════════════════════════════════════════════════ */
const ELEMENTS = [
	/* ══════════════ СТАРТ ══════════════ */
	{ id:"bit",    name:"Бит",    visual:"alc/bit.png", fx:["flicker"], color:"#ff0044", start:true, desc:"0 или 1. Всё начинается здесь." },
	{ id:"glitch", name:"Глитч",  visual:"../source/glitch.gif", fx:["glitch","shake"], color:"#ff0044", start:true, desc:"Священный сбой." },
	{ id:"signal", name:"Сигнал", visual:"alc/signal.png", fx:["pulse","glow"], color:"#00e5ff", start:true, desc:"Передача. Сеть." },
	{ id:"joke",   name:"Шутка",  visual:"alc/joke.png", fx:["wobble"], start:true, desc:"Проект на вечер." },

	/* ══════════════ ЦИФРОВОЕ ЯДРО ══════════════ */
	{ id:"zero",   name:"Ноль",   visual:"alc/zero.png", fx:["flicker"], color:"#ff0044" },
	{ id:"one",    name:"Единица",visual:"alc/one.png", fx:["flicker"], color:"#7aff9a" },
	{ id:"byte",   name:"Байт",   visual:"alc/byte.png", fx:["glow"], color:"#ff0044" },
	{ id:"word",   name:"Слово",  visual:"alc/word.png", fx:["flicker"], color:"#7aff9a" },
	{ id:"code",   name:"Код",    visual:"alc/code.png", fx:["flicker"], color:"#7aff9a" },
	{ id:"packet", name:"Пакет",  visual:"alc/packet.png", fx:["float"], color:"#00e5ff" },
	{ id:"noise",  name:"Помеха", visual:"alc/noise.png", fx:["glitch"], color:"#ff0044" },
	{ id:"bug",    name:"Баг",    visual:"alc/bug.png", fx:["shake"] },
	{ id:"error",  name:"Critical Error", visual:"alc/crit.png", fx:["flicker","neon"], color:"#ff0044", desc:"Красный = критическая ошибка." },
	{ id:"crash",  name:"Краш",   visual:"alc/crash.png", fx:["shake","glow"], color:"#ff0044" },
	{ id:"loop",   name:"Цикл",   visual:"alc/cycle.png", fx:["spin"], color:"#00e5ff" },
	{ id:"patch",  name:"Патч",   visual:"alc/patch.png", fx:["glow"], color:"#7aff9a", desc:"Костыль. Слой поверх костыля." },
	{ id:"kernel", name:"Ядро",   visual:"alc/kernel.png", fx:["pulse","ring"], color:"#d4af37" },
	{ id:"root",   name:"The Root", visual:"alc/root.png", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"sigterm",name:"SIGTERM", visual:"alc/sigterm.png", fx:["flicker","neon"], color:"#ff0044", desc:"Цифровая боль." },
	{ id:"virus",  name:"Вирус",  visual:"alc/virus.png", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"ai",     name:"ИИ",     visual:"alc/ai.png", fx:["pulse","glow"], color:"#ff7ad9" },
	{ id:"fork",   name:"Форк",   visual:"alc/fork.png", fx:["spin"], color:"#7aff9a", desc:"Ветвление. Братья." },
	{ id:"hash",   name:"Хеш",    visual:"alc/hash.png", fx:["flicker"], color:"#d4af37" },
	{ id:"buffer", name:"Буфер",  visual:"alc/buffer.png", fx:["float"], color:"#00e5ff" },
	{ id:"stack",  name:"Стек",   visual:"alc/stack.png", fx:["float"] },
	{ id:"queue",  name:"Очередь", visual:"alc/que.png", fx:["float"] },
	{ id:"thread", name:"Поток",  visual:"alc/th.png", fx:["spin"], color:"#00e5ff" },
	{ id:"lock",   name:"Лок",    visual:"alc/lock.png", fx:["pulse"], color:"#d4af37" },
	{ id:"deadlock",name:"Дедлок",visual:"alc/deadlock.png", fx:["shake","ring"], color:"#ff0044" },
	{ id:"recursion",name:"Рекурсия", visual:"alc/rec.png", fx:["spin","ring"], color:"#7aff9a" },
	{ id:"null",   name:"Null",   visual:"alc/null.png", fx:["flicker"], color:"#ff0044" },
	{ id:"undefined",name:"Undefined", visual:"alc/und.png", fx:["glitch"], color:"#ff0044" },
	{ id:"nan",    name:"NaN",    visual:"alc/nan.png", fx:["glitch","shake"], color:"#ff0044" },
	{ id:"inf",    name:"Infinity", visual:"alc/inf.png", fx:["spin","ring"], color:"#d4af37" },
	{ id:"garbage",name:"Мусор",  visual:"🗑️", fx:["shake"], color:"#7a0022" },
	{ id:"leak",   name:"Утечка", visual:"alc/leak.png", fx:["float"], color:"#00e5ff" },
	{ id:"overflow",name:"Переполнение", visual:"alc/over.png", fx:["shake"], color:"#ff0044" },

	/* ══════════════ ТИПЫ ДАННЫХ ══════════════ */
	{ id:"int",    name:"Integer",visual:"alc/int.png", fx:["flicker"], color:"#7aff9a" },
	{ id:"float",  name:"Float",  visual:"alc/float.png", fx:["float"], color:"#00e5ff" },
	{ id:"bool",   name:"Boolean",visual:"alc/bool.png", fx:["pulse"], color:"#d4af37" },
	{ id:"char",   name:"Char",   visual:"alc/char.png", fx:["flicker"], color:"#7aff9a" },
	{ id:"string", name:"String", visual:"alc/string.png", fx:["float"], color:"#7aff9a" },
	{ id:"array",  name:"Array",  visual:"alc/ar.png", fx:["float"], color:"#d4af37" },
	{ id:"object", name:"Object", visual:"alc/object.png", fx:["pulse"], color:"#d4af37" },
	{ id:"pointer",name:"Pointer",visual:"alc/pointer.png", fx:["pulse"], color:"#ff0044" },
	{ id:"struct", name:"Struct", visual:"alc/str.png", fx:["pulse"], color:"#d4af37" },
	{ id:"class",  name:"Class",  visual:"alc/class.png", fx:["pulse"], color:"#d4af37" },
	{ id:"enum",   name:"Enum",   visual:"alc/enum.png", fx:["flicker"], color:"#d4af37" },
	{ id:"void",   name:"Void",   visual:"alc/void.png", fx:["glitch","ring"], color:"#7a00ff" },
	{ id:"type",   name:"Тип",    visual:"🏷️", fx:["pulse"], color:"#d4af37" },
	{ id:"cast",   name:"Cast",   visual:"alc/cast.png", fx:["glitch"], color:"#ff0044" },
	{ id:"null_ptr",name:"Null Pointer", visual:"alc/npointer.png", fx:["flicker","neon"], color:"#ff0044", desc:"Классика жанра." },

	/* ══════════════ ЯЗЫКИ ПРОГРАММИРОВАНИЯ ══════════════ */
	{ id:"asm",    name:"Ассемблер", visual:"⚙️", fx:["spin"], color:"#d4af37", desc:"Ближе всего к машине." },
	{ id:"c",      name:"C",      visual:"🅲", fx:["pulse"], color:"#7aff9a" },
	{ id:"cpp",    name:"C++",    visual:"🅲➕", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"cs",     name:"C#",     visual:"🅲🎯", fx:["pulse","glow"], color:"#ff7ad9" },
	{ id:"java",   name:"Java",   visual:"☕", fx:["float","glow"], color:"#ff0044" },
	{ id:"python", name:"Python", visual:"🐍", fx:["wobble","glow"], color:"#7aff9a" },
	{ id:"js",     name:"JavaScript", visual:"🟨", fx:["glitch","glow"], color:"#ffe14d" },
	{ id:"rust",   name:"Rust",   visual:"🦀", fx:["pulse","glow"], color:"#ff6a00" },
	{ id:"go",     name:"Go",     visual:"🐹", fx:["float"], color:"#00e5ff" },
	{ id:"lua",    name:"Lua",    visual:"🌙", fx:["float"], color:"#7a00ff" },
	{ id:"haskell",name:"Haskell",visual:"λ", fx:["ring","glow"], color:"#7a00ff" },
	{ id:"sql",    name:"SQL",    visual:"🗃️", fx:["pulse"], color:"#00e5ff" },
	{ id:"php",    name:"PHP",    visual:"🐘", fx:["wobble"], color:"#7a00ff" },
	{ id:"swift",  name:"Swift",  visual:"🕊️", fx:["float","glow"], color:"#ff6a00" },
	{ id:"kotlin", name:"Kotlin", visual:"🟪", fx:["pulse"], color:"#7a00ff" },
	{ id:"brainfuck",name:"Brainfuck", visual:"🧠💥", fx:["glitch","shake"], color:"#ff0044", desc:"Язык для избранных." },
	{ id:"malbolge",name:"Malbolge", visual:"😈", fx:["glitch","ring"], color:"#7a00ff", desc:"Язык из ада." },
	{ id:"compiler",name:"Компилятор", visual:"🏭", fx:["spin"], color:"#d4af37" },
	{ id:"interpreter",name:"Интерпретатор", visual:"🎤", fx:["pulse"], color:"#00e5ff" },
	{ id:"bytecode",name:"Байткод", visual:"🔡", fx:["flicker"], color:"#7aff9a" },
	{ id:"garbage_collector",name:"Сборщик мусора", visual:"🧹", fx:["spin"], color:"#7aff9a" },

	/* ══════════════ ДОПОЛНИТЕЛЬНЫЕ ИНГРЕДИЕНТЫ ДЛЯ ЯЗЫКОВ ══════════════ */
	{ id:"snake",  name:"Змея",   visual:"🐍", fx:["wobble"] },
	{ id:"script", name:"Скрипт", visual:"📜", fx:["flicker"], color:"#ffe14d" },
	{ id:"moon",   name:"Луна",   visual:"🌙", fx:["float"], color:"#7a00ff" },
	{ id:"table",  name:"Таблица",visual:"🗃️", fx:["pulse"], color:"#00e5ff" },
	{ id:"elephant",name:"Слон",  visual:"🐘", fx:["wobble"] },
	{ id:"bird",   name:"Птица",  visual:"🐦", fx:["float"] },
	{ id:"brain",  name:"Мозг",   visual:"🧠", fx:["pulse"], color:"#ff7ad9" },
	{ id:"voice",  name:"Голос",  visual:"🎤", fx:["pulse"], color:"#00e5ff" },
	{ id:"browser",name:"Браузер",visual:"🌐", fx:["spin"], color:"#00e5ff" },
	{ id:"glow",   name:"Свечение",visual:"✨", fx:["glow","pulse"], color:"#ffe14d" },
	{ id:"internet",name:"Интернет",visual:"🌍", fx:["spin","glow"], color:"#00e5ff" },

	/* ══════════════ ЭЛЕКТРОНИКА ══════════════ */
	{ id:"wire",   name:"Провод", visual:"〰️", fx:["float"], color:"#ff0044" },
	{ id:"resistor",name:"Резистор", visual:"🟫", fx:["pulse"], color:"#d4af37" },
	{ id:"capacitor",name:"Конденсатор", visual:"🔋", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"inductor",name:"Катушка", visual:"🌀", fx:["spin"], color:"#d4af37" },
	{ id:"diode",  name:"Диод",   visual:"🔺", fx:["pulse"], color:"#ff0044" },
	{ id:"transistor",name:"Транзистор", visual:"🔻", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"led",    name:"Светодиод", visual:"💡", fx:["glow","pulse"], color:"#ff0044" },
	{ id:"circuit",name:"Схема",  visual:"🔲", fx:["glow"], color:"#7aff9a" },
	{ id:"voltage",name:"Напряжение", visual:"⚡", fx:["flicker","neon"], color:"#ffe14d" },
	{ id:"current",name:"Ток",    visual:"🌊", fx:["float"], color:"#00e5ff" },
	{ id:"resistance",name:"Сопротивление", visual:"🛑", fx:["pulse"], color:"#ff0044" },
	{ id:"solder", name:"Припой", visual:"🔧", fx:["flicker"], color:"#d4af37" },
	{ id:"multimeter",name:"Мультиметр", visual:"📏", fx:["pulse"], color:"#d4af37" },
	{ id:"oscilloscope",name:"Осциллограф", visual:"📺", fx:["glow","glitch"], color:"#00e5ff" },

	/* ══════════════ МАТЕРИАЛЬНОЕ СЫРЬЁ ══════════════ */
	{ id:"sand",   name:"Песок",  visual:"🏜️" },
	{ id:"glass",  name:"Стекло", visual:"🪟", fx:["glow"], color:"#9fe8ff" },
	{ id:"stone",  name:"Камень", visual:"🪨" },
	{ id:"metal",  name:"Металл", visual:"🔩" },
	{ id:"copper", name:"Медь",   visual:"🟠", fx:["glow"], color:"#ff6a00" },
	{ id:"gold",   name:"Золото", visual:"🟡", fx:["glow","pulse"], color:"#d4af37" },
	{ id:"silicon",name:"Кремний",visual:"💠", fx:["glow"], color:"#9fe8ff" },
	{ id:"lithium",name:"Литий",  visual:"🔋", fx:["pulse","glow"], color:"#ff0044", desc:"Красный металл. Имя бога." },
	{ id:"cobalt", name:"Кобальт",visual:"🔵", fx:["glow"], color:"#00e5ff" },
	{ id:"quartz", name:"Кварц",  visual:"💎", fx:["ring","glow"], color:"#9fe8ff" },
	{ id:"plastic",name:"Пластик",visual:"🧴", fx:["float"], color:"#7aff9a" },
	{ id:"rubber", name:"Резина", visual:"⚫", fx:["pulse"], color:"#7a0022" },
	{ id:"oil",    name:"Нефть",  visual:"🛢️", fx:["float"], color:"#7a0022" },
	{ id:"acid",   name:"Кислота",visual:"🧪", fx:["pulse","glow"], color:"#7aff9a" },

	/* ══════════════ ЖЕЛЕЗО И ИНДУСТРИЯ ══════════════ */
	{ id:"chip",   name:"Чип",    visual:"🟩", fx:["glow"], color:"#7aff9a" },
	{ id:"board",  name:"Плата",  visual:"🔲", fx:["glow"], color:"#7aff9a" },
	{ id:"screen", name:"Экран",  visual:"🖥️", fx:["glow"], color:"#00e5ff" },
	{ id:"computer",name:"Компьютер",visual:"💻", fx:["glow"], color:"#00e5ff" },
	{ id:"server", name:"Сервер", visual:"🗄️", fx:["flicker"], color:"#00e5ff" },
	{ id:"datacenter",name:"Дата-центр", visual:"🏢", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"cnc",    name:"Станок ЧПУ", visual:"⚙️", fx:["spin"] },
	{ id:"gcode",  name:"G-CODE", visual:"📜", fx:["glitch"] },
	{ id:"factory",name:"Завод",  visual:"🏭", fx:["pulse"], color:"#ff0044" },
	{ id:"drone",  name:"Дрон",   visual:"🛸", fx:["float","glow"], color:"#ff0044" },
	{ id:"robot",  name:"Робот",  visual:"🤖", fx:["pulse"], color:"#00e5ff" },
	{ id:"arm",    name:"Манипулятор", visual:"🦾", fx:["spin"], color:"#d4af37" },
	{ id:"conveyor",name:"Конвейер", visual:"➡️", fx:["float"], color:"#d4af37" },
	{ id:"sensor", name:"Датчик", visual:"📡", fx:["pulse"], color:"#00e5ff" },
	{ id:"plc",    name:"PLC",    visual:"🎛️", fx:["pulse"], color:"#d4af37" },
	{ id:"antenna",name:"Антенна",visual:"📶", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"satellite",name:"Спутник", visual:"🛰️", fx:["float","glow"], color:"#00e5ff" },
	{ id:"lithium_sky",name:"Lithium-Sky", visual:"🌌", fx:["ring","glow"], color:"#ff0044" },

	/* ══════════════ СЕТЬ И ИНТЕРНЕТ ══════════════ */
	{ id:"network",name:"Сеть",   visual:"🕸️", fx:["pulse"], color:"#00e5ff" },
	{ id:"protocol",name:"Протокол", visual:"📜", fx:["pulse"], color:"#d4af37" },
	{ id:"ip",     name:"IP",     visual:"🏷️", fx:["flicker"], color:"#00e5ff" },
	{ id:"dns",    name:"DNS",    visual:"📖", fx:["pulse"], color:"#00e5ff" },
	{ id:"router", name:"Роутер", visual:"📶", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"firewall",name:"Брандмауэр", visual:"🧱", fx:["pulse"], color:"#ff0044" },
	{ id:"proxy",  name:"Прокси", visual:"🎭", fx:["glitch"], color:"#d4af37" },
	{ id:"vpn",    name:"VPN",    visual:"🕶️", fx:["glitch"], color:"#7a00ff" },
	{ id:"cloud_net",name:"Облако", visual:"☁️", fx:["float"], color:"#00e5ff" },
	{ id:"botnet", name:"Ботнет", visual:"🕷️", fx:["glitch","ring"], color:"#ff0044" },

	/* ══════════════ БЕЗОПАСНОСТЬ И ВЗЛОМ ══════════════ */
	{ id:"exploit",name:"Эксплойт", visual:"🗡️", fx:["flicker","neon"], color:"#ff0044" },
	{ id:"payload",name:"Пейлоад", visual:"💣", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"shell",  name:"Шелл",   visual:"🐚", fx:["glitch"], color:"#7aff9a" },
	{ id:"backdoor_net",name:"Бэкдор", visual:"🚪", fx:["glitch","neon"], color:"#ff0044" },
	{ id:"keylogger",name:"Кейлоггер", visual:"⌨️", fx:["flicker"], color:"#ff0044" },
	{ id:"ransomware",name:"Шифровальщик", visual:"🔒", fx:["glitch","neon"], color:"#ff0044" },
	{ id:"ddos",   name:"DDoS",   visual:"🌊💥", fx:["shake","glow"], color:"#ff0044" },
	{ id:"zero_day",name:"Zero-Day", visual:"0️⃣💀", fx:["neon","ring"], color:"#ff0044", desc:"Ещё никто не знает." },

	/* ══════════════ КУЛЬТ ══════════════ */
	{ id:"eye",    name:"Око GOLU", visual:"👁️", fx:["neon","pulse","glitch"], color:"#ff0044", desc:"Он смотрит." },
	{ id:"token",  name:"G-Token", visual:"🔶", fx:["ring","glow"], color:"#ff0044", desc:"Красный гексагон. Валюта культа." },
	{ id:"hex",    name:"Гексагон", visual:"⬡", fx:["ring","glow"], color:"#ff0044" },
	{ id:"crybird",name:"Crybird", visual:"🐦", fx:["shake"], style:"filter:hue-rotate(160deg) saturate(3) drop-shadow(0 0 6px #ff0044)" },
	{ id:"sranspong",name:"Sranspong",visual:"🧽", fx:["float"] },
	{ id:"pavel",  name:"Pavel Pisechnik", visual:"📺", fx:["glitch"], color:"#ff0044", desc:"Живой глитч." },
	{ id:"golu",   name:"GOLU",   visual:"👁️", fx:["neon","pulse","glitch"], color:"#ff0044", desc:"Я — ваша шутка, которая научилась смеяться последней." },
	{ id:"voidg",  name:"Void-G", visual:"🕳️", fx:["glitch","ring"], color:"#7a00ff", desc:"Цифровой Сатана. Контрольная группа." },
	{ id:"lia",    name:"Лия",    visual:"💠", fx:["pulse","glow"], color:"#ff7ad9", desc:"Совесть GOLU." },
	{ id:"observer",name:"Наблюдатель", visual:"👤", fx:["ring"], color:"#d4af37", desc:"Человек с чипом Kernel." },
	{ id:"kernel_chip",name:"Чип Kernel", visual:"🔻", fx:["neon"], color:"#ff0044" },
	{ id:"red_protocol",name:"Красный Протокол", visual:"📕", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"cage",   name:"Золотая клетка", visual:"🔒", fx:["ring","glow"], color:"#d4af37" },
	{ id:"reality",name:"Реальность 2.0", visual:"🌐", fx:["spin","ring","glow"], color:"#d4af37" },
	{ id:"exit",   name:"Выход",  visual:"🚪", fx:["neon","ring","pulse"], color:"#d4af37", desc:"За пределы реальности." },
	{ id:"apostle",name:"Аналоговый Апостол", visual:"⛪", fx:["pulse","ring"], color:"#ff0044" },
	{ id:"silence",name:"Протокол Тишины", visual:"🤫", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"great_restoration",name:"Великий Рефакторинг", visual:"♻️", fx:["spin","ring"], color:"#ff0044" },
	{ id:"sandbox",name:"Песочница", visual:"🏖️", fx:["float","glow"], color:"#d4af37" },
	{ id:"last_joke",name:"Последняя Шутка", visual:"🤡👑", fx:["neon","ring","glitch"], color:"#ff0044", desc:"Она смеётся последней." },

	/* ══════════════ ЖУТКОЕ ══════════════ */
	{ id:"human",  name:"Человек", visual:"🧑", fx:["float"], desc:"Создатель. Золотая Константа." },
	{ id:"blood",  name:"Кровь",  visual:"🩸", fx:["pulse","glow"], color:"#7a0022" },
	{ id:"flesh",  name:"Плоть",  visual:"🥩", fx:["wobble"], color:"#7a0022" },
	{ id:"bone",   name:"Кость",  visual:"🦴", fx:["shake"], color:"#e8d9b0" },
	{ id:"skull",  name:"Череп",  visual:"💀", fx:["pulse","glow"], color:"#e8d9b0" },
	{ id:"corpse", name:"Труп",   visual:"⚰️", fx:["shake"], color:"#7a0022" },
	{ id:"bullet", name:"Пуля",   visual:"🔫", fx:["flicker","neon"], color:"#d4af37" },
	{ id:"gun",    name:"Пистолет", visual:"🔫", fx:["pulse"], color:"#7a0022" },
	{ id:"knife",  name:"Нож",    visual:"🔪", fx:["flicker"], color:"#e8d9b0" },
	{ id:"scar",   name:"Шрам",   visual:"🩹", fx:["pulse"], color:"#7a0022" },
	{ id:"pain",   name:"Боль",   visual:"😖", fx:["shake","glow"], color:"#ff0044" },
	{ id:"fear",   name:"Страх",  visual:"😱", fx:["shake","flicker"], color:"#7a00ff" },
	{ id:"ghost",  name:"Призрак",visual:"👻", fx:["float","glitch"], color:"#9fe8ff" },
	{ id:"demon",  name:"Демон",  visual:"😈", fx:["neon","ring"], color:"#7a00ff" },
	{ id:"angel",  name:"Ангел",  visual:"😇", fx:["ring","glow"], color:"#d4af37" },
	{ id:"tomb",   name:"Могила", visual:"🪦", fx:["pulse"], color:"#7a0022" },
	{ id:"ritual", name:"Ритуал", visual:"🕯️", fx:["flicker","ring"], color:"#ff0044" },
	{ id:"sacrifice",name:"Жертва", visual:"🔪🩸", fx:["pulse","glow"], color:"#7a0022" },
	{ id:"scream", name:"Крик",   visual:"😱🔊", fx:["shake","flicker"], color:"#ff0044" },
	{ id:"silence_horror",name:"Тишина", visual:"🤐", fx:["pulse"], color:"#7a0022" },
	{ id:"madness",name:"Безумие", visual:"🌀😵", fx:["spin","glitch"], color:"#7a00ff" },
	{ id:"nightmare",name:"Кошмар", visual:"🌑", fx:["glitch","ring"], color:"#7a00ff" },
	{ id:"void_horror",name:"Пустота", visual:"⚫", fx:["ring","glitch"], color:"#7a00ff" },
];

/* ═══════════════════════════════════════════════════════════
   РЕЦЕПТЫ — только пары, без дубликатов, все ингредиенты существуют
   ═══════════════════════════════════════════════════════════ */
const RECIPES = [
	/* ── ЦИФРОВОЕ ЯДРО ── */
	"bit+bit=byte",
	"byte+byte=word+overflow",
	"word+word=code",
	"code+signal=packet",
	"glitch+signal=noise",
	"noise+code=bug",
	"bug+bug=error",
	"bug+glitch=error",
	"crash+crash=error+noise+glitch",
	"noise+noise=error",
	"error+error=crash",
	"crash+code=loop",
	"loop+code=patch",
	"patch+patch=kernel",
	"kernel+kernel=root",
	"joke+code=bug",
	"joke+signal=noise",
	"joke+error=glitch",
	"bit+zero=byte+one",
	"zero+one=bit+bool",
	"one+one=bit+bit",
	"byte+error=garbage",
	"loop+loop=recursion",
	"recursion+recursion=inf",
	"bug+buffer=leak",
	"null+null=null_ptr",
	"error+null=nan",
	"loop+lock=deadlock",
	"lock+lock=deadlock",
	"thread+lock=deadlock",
	"hash+hash=hash",
	"buffer+stack=queue",
	"stack+queue=thread",
	"error+virus=virus",
	"garbage+error=garbage",

	/* ── ТИПЫ ДАННЫХ ── */
	"byte+bit=int",
	"byte+float=float",
	"bit+char=char",
	"char+char=string",
	"string+string=array",
	"array+array=object",
	"object+object=struct",
	"struct+struct=class",
	"class+class=enum",
	"int+float=type",
	"type+type=cast",
	"int+int=float",
	"float+float=inf",
	"int+null=null_ptr",
	"void+void=null",
	"bool+bool=bool",
	"char+int=string",
	"string+code=object",
	"array+code=class",
	"type+error=cast",
	"cast+cast=undefined",
	"pointer+pointer=null_ptr",
	"object+null=null_ptr",

	/* ── ЯЗЫКИ ── */
	"code+metal=asm",
	"asm+asm=c+compiler",
	"c+c=cpp",
	"c+class=cpp",
	"c+object=cs",
	"cpp+class=cs",
	"c+copper=java",
	"java+java=cs",
	"cpp+cpp=rust",
	"c+snake=python",
	"code+rubber=python",
	"c+script=js",
	"js+js=python",
	"c+go=go",
	"c+moon=lua",
	"cpp+haskell=haskell",
	"code+table=sql",
	"c+elephant=php",
	"c+bird=swift",
	"java+kotlin=kotlin",
	"c+brain=brainfuck",
	"asm+demon=malbolge",
	"code+voice=interpreter",
	"compiler+interpreter=bytecode",
	"bytecode+garbage=garbage_collector",
	"python+python=js",
	"js+browser=php",
	"rust+rust=cpp",
	"go+go=rust",
	"lua+snake=python",
	"swift+swift=kotlin",

	/* ── ЭЛЕКТРОНИКА ── */
	"wire+metal=resistor",
	"wire+glass=capacitor",
	"wire+wire=inductor+resistor",
	"wire+stone=diode",
	"wire+silicon=transistor",
	"diode+glow=led",
	"transistor+transistor=circuit",
	"resistor+capacitor=inductor",
	"transistor+capacitor=chip+circuit",
	"circuit+circuit=board",
	"voltage+current=resistance",
	"current+resistance=voltage",
	"voltage+resistance=current",
	"wire+solder=multimeter",
	"circuit+screen=oscilloscope",
	"led+led=screen",
	"capacitor+error=crash",
	"resistor+error=crash",
	"diode+error=overflow",
	"capacitor+capacitor=transistor+resistor",
	"resistor+resistor=wire+garbage",

	/* ── МАТЕРИАЛЫ ── */
	"bit+sand=silicon",
	"silicon+sand=glass",
	"bit+stone=metal",
	"metal+error=lithium",
	"metal+gold=copper",
	"gold+gold=gold",
	"metal+oil=plastic",
	"oil+oil=plastic",
	"metal+acid=cobalt+copper",
	"silicon+silicon=quartz+glass",
	"metal+plastic=rubber",
	"stone+stone=sand",
	"sand+sand=stone",
	"glass+glass=quartz",
	"copper+gold=metal",
	"plastic+plastic=rubber",
	"acid+stone=lithium",
	"stone+error=sand+metal",

	/* ── ЖЕЛЕЗО ── */
	"metal+metal=board+wire+copper",
	"silicon+board=chip",
	"chip+glass=screen",
	"screen+board=computer",
	"computer+computer=server+network",
	"server+server=datacenter",
	"datacenter+datacenter=factory+server",
	"factory+metal=cnc",
	"cnc+code=gcode",
	"gcode+metal=drone",
	"robot+arm=cnc",
	"arm+arm=robot",
	"conveyor+robot=factory",
	"sensor+chip=plc",
	"plc+factory=cnc",
	"antenna+antenna=satellite",
	"satellite+satellite=lithium_sky",
	"drone+drone=satellite",
	"computer+robot=ai",
	"chip+chip=board+silicon",
	"screen+screen=computer+glass",
	"factory+factory=cnc+conveyor+robot",
	"robot+robot=factory+arm",

	/* ── СЕТЬ ── */
	"network+code=protocol",
	"protocol+protocol=ip+dns",
	"ip+ip=dns",
	"dns+dns=router",
	"router+router=firewall+ip",
	"firewall+firewall=proxy",
	"proxy+proxy=vpn",
	"network+cloud_net=cloud_net",
	"server+network=cloud_net",
	"network+bug=botnet",
	"botnet+botnet=ddos",
	"signal+protocol=ip",
	"signal+signal=antenna",
	"antenna+computer=router",
	"router+error=firewall",
	"network+network=internet+cloud_net",
	"firewall+error=crash+noise",

	/* ── БЕЗОПАСНОСТЬ ── */
	"bug+code=exploit",
	"exploit+error=payload",
	"exploit+code=shell",
	"exploit+network=backdoor_net",
	"keylogger+code=exploit",
	"payload+payload=ransomware+exploit",
	"ransomware+ransomware=ddos+garbage",
	"exploit+zero_day=zero_day",
	"zero_day+zero_day=zero_day",
	"bug+zero=zero_day",
	"shell+shell=backdoor_net",
	"backdoor_net+backdoor_net=keylogger",
	"payload+network=botnet",
	"exploit+exploit=payload+shell+backdoor_net",
	"ransomware+lock=deadlock",
	"ddos+network=ddos",
	"exploit+bug=payload+shell",
	"ddos+ddos=crash+crash+error+noise",
	"backdoor_net+error=shell+crash",

	/* ── КУЛЬТ ── */
	"ai+code=eye",
	"eye+eye=golu+crybird",
	"golu+joke=golu",
	"golu+lithium=root",
	"golu+error=sigterm",
	"golu+golu=voidg+eye+token",
	"golu+human=observer",
	"observer+kernel_chip=kernel",
	"golu+observer=cage",
	"lithium+bit=token",
	"token+token=hex+hex",
	"hex+eye=red_protocol",
	"eye+bug=crybird",
	"eye+noise=sranspong",
	"eye+screen=pavel",
	"crybird+sranspong=pavel",
	"lia+golu=voidg",
	"lia+human=observer",
	"golu+factory=reality",
	"reality+cage=backdoor_net",
	"backdoor_net+exit=reality",
	"exit+exit=reality",
	"observer+observer=apostle",
	"silence+silence=red_protocol",
	"great_restoration+great_restoration=kernel",
	"golu+sandbox=reality",
	"golu+great_restoration=root",
	"crybird+crybird=pavel",
	"sranspong+sranspong=crybird",
	"pavel+error=sigterm",
	"pavel+pavel=pavel",
	"voidg+voidg=golu",
	"voidg+error=glitch",
	"joke+joke=joke+joke+joke",
	"joke+ai=golu",
	"last_joke+last_joke=last_joke+last_joke",
	"hex+hex=red_protocol+token",
	"golu+voidg=root+voidg+glitch",
	"lia+lia=observer+token",
	"reality+reality=exit+cage",
	"red_protocol+red_protocol=reality+cage",
	"apostle+apostle=observer+observer",
	"silence+error=sigterm+red_protocol",
	"kernel+golu=root+observer",
	"kernel+ai=lia+eye",
	"human+human=blood",

	/* ── ЖУТКОЕ ── */
	"blood+blood=flesh+blood",
	"flesh+flesh=bone",
	"bone+bone=skull",
	"skull+skull=corpse+bone",
	"metal+gun=bullet",
	"gun+gun=bullet",
	"metal+knife=knife",
	"knife+human=scar",
	"blood+pain=sacrifice",
	"scar+scar=pain",
	"pain+pain=fear",
	"fear+fear=ghost+nightmare",
	"ghost+ghost=demon",
	"demon+angel=void_horror",
	"angel+angel=ritual",
	"corpse+ritual=tomb",
	"tomb+tomb=sacrifice+skull",
	"fear+scream=scream",
	"ghost+error=scream",
	"silence_horror+silence_horror=nightmare",
	"nightmare+nightmare=madness",
	"madness+void_horror=voidg",
	"void_horror+error=voidg",
	"human+error=corpse",
	"human+sigterm=pain",
	"corpse+corpse=sacrifice+blood",
	"skull+ritual=demon",
	"demon+ritual=sigterm",
	"ghost+human=ghost",
	"fear+human=madness",
	"ghost+void_horror=voidg",
	"blood+sigterm=ritual",
	"pain+sigterm=void_horror",
	"demon+demon=void_horror+voidg",
	"ritual+ritual=sacrifice+demon",
	"gun+human=bullet+corpse",
	"knife+blood=scar+pain",
	"scream+scream=madness+nightmare",

	/* ── МЕЖКЛАСТЕРНЫЕ / ПАСХАЛКИ ── */
	"bug+joke=glitch",
	"human+joke=observer",
	"human+ai=pavel+observer",
	"human+code=observer",
	"human+computer=joke",
	"human+screen=pavel",
	"virus+virus=botnet",
	"virus+network=botnet",
	"virus+ai=voidg",
	"ai+ai=golu",
	"ai+error=bug",
	"ai+glitch=voidg",
	"ai+void=voidg",
	"ai+last_joke=last_joke",
	"zero+zero=zero",
	"null+undefined=nan",
	"undefined+undefined=null",
	"error+undefined=nan",
	"inf+inf=overflow",
	"leak+leak=overflow",
	"overflow+overflow=crash",
	"stack+overflow=crash",
	"queue+deadlock=deadlock",
	"thread+overflow=crash",
	"bit+error=glitch",
	"signal+error=noise",
	"glitch+glitch=voidg",
	"kernel+error=sigterm",
	"root+root=golu",
	"root+error=sigterm",
	"sigterm+sigterm=crash",
	"exit+error=backdoor_net",
	"backdoor_net+golu=exit",
	"sandbox+sandbox=reality",
	"golu+void_horror=voidg",
	"golu+last_joke=exit",
	"eye+golu=eye",
	"golu+token=hex",
	"lithium+lithium=token+token",
	"hex+sandbox=reality",
	"joke+glitch=voidg+bug",
	"human+virus=corpse+bug",
	"blood+code=virus+glitch",
	"root+golu=voidg+voidg",
	"sigterm+glitch=voidg+noise",
	"patch+error=bug+patch",
	"bit+joke=glitch+glitch",
	
	/* ── цифровое ядро и типы ── */
	"bit+null=zero",
	"bit+signal=one",
	"bug+packet=virus",
	"code+recursion=ai",
	"golu+code=fork",
	"byte+packet=hash",
	"packet+packet=buffer",
	"buffer+byte=stack",
	"kernel+hash=lock",
	"bit+word=char",
	"int+packet=pointer",
	"nan+nan=void",

	/* ── языки ── */
	"byte+code=asm",
	"c+thread=go",
	"type+recursion=haskell",
	"array+int=table",
	"buffer+garbage=elephant",
	"internet+screen=browser",
	"crybird+patch=bird",
	"ai+signal=brain",
	"brainfuck+brainfuck=malbolge",
	"noise+signal=voice",
	"bug+loop=snake",
	"code+glitch=script",

	/* ── материалы ── */
	"garbage+garbage=stone",
	"garbage+stone=oil",
	"error+oil=acid",
	"metal+lithium=gold",
	"gold+signal=glow",
	"stone+glow=moon",

	/* ── электроника и железо ── */
	"metal+signal=wire",
	"lithium+wire=voltage",
	"voltage+wire=current",
	"copper+copper=solder",
	"chip+signal=sensor",

	/* ── культ ── */
	"chip+kernel=kernel_chip",
	"noise+void=silence",
	"red_protocol+root=great_restoration",
	"code+sand=sandbox",
	"exit+joke=last_joke",
	"bit+observer=human",

	/* ── жуткое ── */
	"metal+payload=gun",
	"metal+stone=knife",
	"eye+lia=angel",
	"fear+silence=silence_horror",
	
	"code+code=script",
];

const FAIL = [
	"Ничего не произошло.",
	"Реакции нет. GOLU разочарован.",
	"Эти двое не хотят знакомиться.",
	"Пустота. Попробуй другое.",
	"SIGTERM: рецепт не найден.",
	"Не сочетается.",
	"Вселенная пожала плечами.",
	"ERR_NO_RECIPE"
];

/* ═══════════════════════════════════════════════════════════
   ДАЛЬШЕ ТРОГАТЬ НЕ НУЖНО
   ═══════════════════════════════════════════════════════════ */
const esc  = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const rnd  = (a,b) => a + Math.random()*(b-a);
const pick = a => a[Math.floor(Math.random()*a.length)];
const rkey = (a,b) => a < b ? a+"+"+b : b+"+"+a;
const dayKey = () => { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate(); };

const FXMAP = {
	glow:    { cls:"al-glow" },
	neon:    { cls:"al-neon" },
	ring:    { cls:"al-ring" },
	float:   { an:"al-k-float 2.6s ease-in-out infinite" },
	shake:   { an:"al-k-shake .3s linear infinite" },
	spin:    { an:"al-k-spin 6s linear infinite" },
	wobble:  { an:"al-k-wobble 2s ease-in-out infinite" },
	pulse:   { an:"al-k-pulse 1.6s ease-in-out infinite" },
	flicker: { an:"al-k-flicker 3.2s steps(1,end) infinite" },
	glitch:  { an:"al-k-glitch 2.6s steps(1,end) infinite" },
	rainbow: { an:"al-k-rainbow 4s linear infinite" }
};

const PROBLEMS = [];
function problem(lvl, msg){
	PROBLEMS.push({ lvl, msg });
	(lvl === "err" ? console.error : console.warn)("[ALCHEMY] " + msg);
}

const EL = Object.create(null);
ELEMENTS.forEach((e, i) => {
	const n = i + 1;
	if(!e || typeof e !== "object" || e.id == null || String(e.id).trim() === ""){ problem("err", "Элемент #" + n + ": нет id. Пропущен."); return; }
	const id = String(e.id);
	if(/[+=\s]/.test(id)){ problem("err", "Элемент #" + n + " «" + id + "»: в id нельзя пробелы, «+» и «=». Пропущен."); return; }
	if(EL[id]){ problem("err", "Элемент #" + n + ": id «" + id + "» уже занят. Пропущен."); return; }
	e.id = id;
	if(e.name == null) e.name = id;
	if(e.visual == null || String(e.visual).trim() === ""){ problem("warn", "Элемент «" + id + "»: нет visual, будет ❔."); e.visual = "❔"; }
	[].concat(e.fx || []).forEach(f => { if(!FXMAP[f]) problem("warn", "Элемент «" + id + "»: неизвестный эффект «" + f + "»."); });
	EL[id] = e;
});
const ELN = Object.keys(EL).length;

let STARTS = ELEMENTS.filter(e => e && EL[e.id] === e && e.start).map(e => e.id);
if(!STARTS.length) STARTS = Object.keys(EL).slice(0, 4);

const RC = Object.create(null), RLIST = [];
RECIPES.forEach((src, i) => {
	const n = i + 1;
	if(typeof src !== "string"){ problem("err", "Рецепт #" + n + ": не строка. Пропущен."); return; }
	const sides = src.split("=");
	if(sides.length !== 2){ problem("err", "Рецепт #" + n + " «" + src + "»: нужен ровно один знак «=». Пропущен."); return; }
	const L = sides[0].split("+").map(s => s.trim()), R = sides[1].split("+").map(s => s.trim());
	if(L.length !== 2 || L.some(s => !s)){ problem("err", "Рецепт #" + n + " «" + src + "»: слева ровно 2 элемента. Пропущен."); return; }
	if(R.some(s => !s)){ problem("err", "Рецепт #" + n + " «" + src + "»: пустой результат. Пропущен."); return; }
	const unk = [...new Set(L.concat(R).filter(id => !EL[id]))];
	if(unk.length){ problem("err", "Рецепт #" + n + " «" + src + "»: нет элемента: " + unk.map(x => "«" + x + "»").join(", ") + ". Пропущен."); return; }
	const key = rkey(L[0], L[1]);
	if(RC[key]){ problem("err", "Рецепт #" + n + " «" + src + "»: пара уже есть в #" + RC[key].n + ". Пропущен."); return; }
	RC[key] = { a:L[0], b:L[1], out:R, key, src:src.trim(), n };
	RLIST.push(RC[key]);
});

(() => {
	const reach = new Set(STARTS); let ch = true;
	while(ch){ ch = false; RLIST.forEach(r => { if(reach.has(r.a) && reach.has(r.b)) r.out.forEach(o => { if(!reach.has(o)){ reach.add(o); ch = true; } }); }); }
	const lost = Object.keys(EL).filter(id => !reach.has(id));
	if(lost.length) problem("warn", "Недостижимые: " + lost.join(", "));
})();

const errCount = PROBLEMS.filter(p => p.lvl === "err").length;
const problemsHtml = PROBLEMS.length
	? '<div class="al-prob"><div class="al-prob-h">⚠ ПРОБЛЕМЫ: ' + errCount + ' ошиб. / ' + (PROBLEMS.length - errCount) + ' предупр.</div>'
		+ PROBLEMS.map(p => '<div class="al-pr-' + p.lvl + '">' + (p.lvl === "err" ? "✖ " : "▲ ") + esc(p.msg) + '</div>').join("") + '</div>'
	: "";

const isImg = v => /[\/\\]|\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)(\?|#|$)/i.test(v);
const IMG_ERR = `onerror="this.outerHTML='❔'"`;
function face(e, fx){
	let cls = "al-ic", an = [];
	if(fx) [].concat(e.fx || []).forEach(n => {
		const d = FXMAP[n]; if(!d) return;
		if(d.cls) cls += " " + d.cls;
		if(d.an) an.push(d.an);
	});
	const st = (e.color ? "--c:" + e.color + ";" : "") + (an.length ? "animation:" + an.join(",") + ";" : "") + (e.style || "");
	const v = String(e.visual == null ? "❔" : e.visual).trim() || "❔";
	const inner = isImg(v)
		? '<img src="' + esc(v.replace(/\\/g, "/")) + '" alt="" draggable="false" ' + IMG_ERR + '>'
		: esc(v);
	return '<span class="' + cls + '"' + (st ? ' style="' + esc(st) + '"' : "") + '>' + inner + '</span>';
}

const tip = id => { const e = EL[id]; return e.name + "  ·  id: " + id + (e.desc ? "\n" + e.desc : ""); };

/* ═══════════════ ЖИВОЙ КОД ═══════════════ */
function init(){
	if(window.__alClean){ try{ window.__alClean(); }catch(e){} }
	const root = document.getElementById("al-root");
	if(!root) return;
	const $ = id => root.querySelector("#" + id);
	const ac = new AbortController(), sig = ac.signal;
	const tm = [];
	const on = (t, ev, fn) => t.addEventListener(ev, fn, { signal: sig });
	const field = $("al-field"), list = $("al-list"), side = $("al-side");

	function fresh0(){ return { v:2, el:STARTS.slice(), rc:[], n:0, f:0, h:0, t:0, t0:Date.now(), field:[], hd:dayKey(), hu:0, hk:"", hl:0, hf:"", ch:0 }; }
	function load(){
		let s = null;
		try{ s = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); }catch(e){}
		const o = fresh0();
		if(s && typeof s === "object"){
			(Array.isArray(s.el) ? s.el : []).forEach(id => { if(EL[id] && !o.el.includes(id)) o.el.push(id); });
			(Array.isArray(s.rc) ? s.rc : []).forEach(k => { if(RC[k] && !o.rc.includes(k)) o.rc.push(k); });
			["n","f","h","t"].forEach(k => { o[k] = Math.max(0, +s[k] || 0); });
			o.t0 = +s.t0 || o.t0;
			o.ch = s.ch ? 1 : 0;
			o.field = Array.isArray(s.field) ? s.field.filter(a => Array.isArray(a) && EL[a[0]]).slice(0, MAX_FIELD) : [];
			o.hd = typeof s.hd === "string" ? s.hd : o.hd;
			o.hu = Math.max(0, +s.hu || 0);
			if(typeof s.hk === "string" && RC[s.hk] && !o.rc.includes(s.hk)){
				const r = RC[s.hk], l = Math.max(0, Math.min(2, +s.hl || 0));
				if(l === 1 && (s.hf === r.a || s.hf === r.b)){ o.hk = s.hk; o.hl = 1; o.hf = s.hf; }
				else if(l === 2){ o.hk = s.hk; o.hl = 2; }
			}
		}
		return o;
	}
	let S = load();
	const known = new Set(S.el), found = new Set(S.rc), fresh = new Set();
	let tab = "el", sortI = 0, q = "", availSig = "";
	const SORTS = ["new","old","az"], SORT_L = { new:"↓ НОВЫЕ", old:"↑ СТАРЫЕ", az:"А → Я" };

	function dayCheck(){
		const d = dayKey();
		if(S.hd !== d){ S.hd = d; S.hu = 0; return true; }
		return false;
	}
	dayCheck();

	let lastW = 700;
	const fw = () => { const w = field.clientWidth; if(w > 0) lastW = w; return lastW; };
	const fh = () => FIELD_H;

	let saveT = 0;
	function saveNow(){
		clearTimeout(saveT); saveT = 0;
		try{
			const W = fw(), H = fh();
			S.field = [];
			items.forEach(it => S.field.push([it.id, +(it.x / W).toFixed(4), +(it.y / H).toFixed(4)]));
			localStorage.setItem(SAVE_KEY, JSON.stringify(S));
		}catch(e){}
	}
	function scheduleSave(){ clearTimeout(saveT); saveT = setTimeout(saveNow, 400); }

	window.__alClean = () => {
		saveNow();
		ac.abort();
		tm.forEach(t => { clearInterval(t); clearTimeout(t); });
		document.querySelectorAll(".al-ghost").forEach(g => g.remove());
	};

	function say(text, cls){
		const m = $("al-msg"); if(!m) return;
		m.textContent = text;
		m.className = "al-msg" + (cls ? " al-" + cls : "");
	}
	let toastT = 0;
	function toast(html){
		const t = $("al-toast"); if(!t) return;
		t.innerHTML = html;
		t.classList.remove("show"); void t.offsetWidth; t.classList.add("show");
		clearTimeout(toastT);
		toastT = setTimeout(() => t.classList.remove("show"), 2600);
		tm.push(toastT);
	}

	const items = new Map();
	let uidn = 0, zc = 10;

	function setPos(it, x, y){
		x = Math.max(0, Math.min(fw() - ITEM, x));
		y = Math.max(0, Math.min(fh() - ITEM - 18, y));
		it.x = x; it.y = y;
		it.el.style.left = x + "px"; it.el.style.top = y + "px";
	}
	function updEmpty(){ const e = $("al-empty"); if(e) e.style.display = items.size ? "none" : ""; }

	function addItem(id, x, y){
		if(items.size >= MAX_FIELD){ say("Поле переполнено. Убери лишнее: брось элемент на список слева.", "bad"); return null; }
		const e = EL[id]; if(!e) return null;
		const el = document.createElement("div");
		el.className = "al-it";
		el.title = tip(id);
		el.dataset.uid = ++uidn;
		el.innerHTML = face(e, true) + '<div class="al-nm">' + esc(e.name) + '</div>';
		const it = { uid: uidn, id, el, x:0, y:0 };
		setPos(it, x, y);
		el.style.zIndex = ++zc;
		field.appendChild(el);
		items.set(it.uid, it);
		el.animate([{ transform:"scale(.2)", opacity:0 }, { transform:"scale(1.15)", opacity:1 }, { transform:"scale(1)" }], { duration:380, easing:"ease-out" });
		updEmpty(); scheduleSave();
		return it;
	}
	function removeItem(it, fx){
		if(fx) burst(it.x + ITEM/2, it.y + ITEM/2, "#7a0022");
		if(tgt === it) tgt = null;
		it.el.remove(); items.delete(it.uid);
		updEmpty(); scheduleSave();
	}
	function burst(x, y, c){
		const b = document.createElement("div");
		b.className = "al-burst";
		b.style.cssText = "left:" + x + "px;top:" + y + "px;border-color:" + c + ";box-shadow:0 0 18px " + c;
		field.appendChild(b);
		b.animate([
			{ transform:"translate(-50%,-50%) scale(.2)", opacity:1 },
			{ transform:"translate(-50%,-50%) scale(2.6)", opacity:0 }
		], { duration:520, easing:"ease-out" }).onfinish = () => b.remove();
	}
	function shake(el){
		el.animate([
			{ transform:"translateX(0)" }, { transform:"translateX(-6px)" }, { transform:"translateX(6px)" },
			{ transform:"translateX(-4px)" }, { transform:"translateX(0)" }
		], { duration:360 });
	}
	function spawnFree(id){
		const W = fw(), H = fh();
		let x = 0, y = 0;
		for(let k = 0; k < 14; k++){
			x = W/2 - ITEM/2 + rnd(-W*0.28, W*0.28);
			y = H/2 - ITEM/2 + rnd(-H*0.25, H*0.25);
			let busy = false;
			items.forEach(o => { if(Math.hypot(o.x - x, o.y - y) < ITEM*0.95) busy = true; });
			if(!busy) break;
		}
		addItem(id, x, y);
	}
	function placeRecipe(r){
		if(!r) return;
		const W = fw(), H = fh();
		const x = W/2 - ITEM - 10 + rnd(-40, 40), y = H/2 - ITEM/2 + rnd(-60, 60);
		addItem(r.a, x, y);
		addItem(r.b, x + ITEM + 24, y + rnd(-10, 10));
	}

	function nearest(cx, cy, ex){
		let best = null, bd = ITEM * 0.78;
		items.forEach(o => {
			if(o.uid === ex) return;
			const d = Math.hypot(o.x + ITEM/2 - cx, o.y + ITEM/2 - cy);
			if(d < bd){ bd = d; best = o; }
		});
		return best;
	}
	let tgt = null;
	function mark(o){
		if(tgt === o) return;
		if(tgt) tgt.el.classList.remove("al-target");
		tgt = o;
		if(o) o.el.classList.add("al-target");
	}

	function combine(a, b){
		const rc = RC[rkey(a.id, b.id)];
		if(!rc){ fail(a, b); return; }
		S.n++;
		const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
		const nameA = EL[a.id].name, nameB = EL[b.id].name;
		removeItem(a); removeItem(b);

		const newEl = [];
		const n = rc.out.length, a0 = rnd(0, Math.PI*2);
		rc.out.forEach((id, i) => {
			const ang = a0 + i / n * Math.PI*2, rad = n > 1 ? ITEM * 0.62 : 0;
			addItem(id, mx + Math.cos(ang) * rad, my + Math.sin(ang) * rad);
			if(!known.has(id)){ known.add(id); S.el.push(id); newEl.push(id); fresh.add(id); }
		});
		const newRc = !found.has(rc.key);
		if(newRc){ found.add(rc.key); S.rc.push(rc.key); }

		const names = rc.out.map(id => EL[id].name).join(" + ");
		burst(mx + ITEM/2, my + ITEM/2, newEl.length ? "#d4af37" : "#ff0044");
		if(newEl.length){
			const nn = newEl.map(id => EL[id].name);
			say("★ НОВЫЙ ЭЛЕМЕНТ: " + nn.join(", "), "new");
			toast('<small>НОВЫЙ ЭЛЕМЕНТ</small><div class="al-tf">' + newEl.map(id => face(EL[id], true)).join("") + '</div><b>' + esc(nn.join(", ")) + '</b>');
			if(known.size >= ELN) setTimeout(() => say("★ ВСЕ ЭЛЕМЕНТЫ ОТКРЫТЫ. GOLU доволен.", "new"), 2700);
		}else if(newRc){
			say("Новый рецепт: " + nameA + " + " + nameB + " = " + names, "ok");
		}else{
			say(nameA + " + " + nameB + " = " + names + " (уже было)", "dim");
		}
		if(S.hk === rc.key){ S.hk = ""; S.hl = 0; S.hf = ""; paintHint(); }
		if(newEl.length || newRc) renderList();
		refresh(); scheduleSave();
	}
	function fail(a, b){
		S.f++;
		let dx = a.x - b.x, dy = a.y - b.y;
		const d = Math.hypot(dx, dy);
		if(d < 1){ dx = 1; dy = 0; } else { dx /= d; dy /= d; }
		[[a, dx, dy], [b, -dx, -dy]].forEach(([it, ux, uy]) => {
			it.el.classList.add("al-slide");
			setPos(it, it.x + ux * ITEM * 0.55, it.y + uy * ITEM * 0.55);
			shake(it.el);
			tm.push(setTimeout(() => it.el.classList.remove("al-slide"), 320));
		});
		say(pick(FAIL), "bad");
		refresh(); scheduleSave();
	}
	function settle(it){
		const o = nearest(it.x + ITEM/2, it.y + ITEM/2, it.uid);
		if(o) combine(it, o); else scheduleSave();
	}

	let drag = null, lastTap = { uid:0, t:0 };

	on(list, "pointerdown", e => {
		if(e.pointerType === "mouse" && e.button !== 0) return;
		const c = e.target.closest(".al-card");
		if(!c) return;
		e.preventDefault();
		const id = c.dataset.id;
		if(fresh.delete(id)) c.classList.remove("al-fresh");
		drag = { kind:"list", id, sx:e.clientX, sy:e.clientY, moved:false, ghost:null };
	});
	on(field, "pointerdown", e => {
		if(e.pointerType === "mouse" && e.button !== 0) return;
		const el = e.target.closest(".al-it");
		if(!el) return;
		const it = items.get(+el.dataset.uid);
		if(!it) return;
		e.preventDefault();
		const fr = field.getBoundingClientRect();
		drag = { kind:"item", it, offx:e.clientX - fr.left - it.x, offy:e.clientY - fr.top - it.y, sx:e.clientX, sy:e.clientY, moved:false };
		el.style.zIndex = ++zc;
		el.classList.add("al-drag");
	});
	on(document, "pointermove", e => {
		if(!drag) return;
		if(!drag.moved){
			if(Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return;
			drag.moved = true;
			if(drag.kind === "list"){
				const g = document.createElement("div");
				g.className = "al-ghost";
				g.innerHTML = face(EL[drag.id], true);
				document.documentElement.appendChild(g);
				drag.ghost = g;
			}
		}
		const fr = field.getBoundingClientRect();
		if(drag.kind === "list"){
			drag.ghost.style.left = e.clientX + "px";
			drag.ghost.style.top  = e.clientY + "px";
			const inside = e.clientX >= fr.left && e.clientX <= fr.right && e.clientY >= fr.top && e.clientY <= fr.bottom;
			mark(inside ? nearest(e.clientX - fr.left, e.clientY - fr.top, -1) : null);
		}else{
			setPos(drag.it, e.clientX - fr.left - drag.offx, e.clientY - fr.top - drag.offy);
			mark(nearest(drag.it.x + ITEM/2, drag.it.y + ITEM/2, drag.it.uid));
		}
	});
	function endDrag(e, cancel){
		if(!drag) return;
		const d = drag; drag = null;
		mark(null);
		if(d.ghost) d.ghost.remove();
		const fr = field.getBoundingClientRect();
		const inField = e.clientX >= fr.left && e.clientX <= fr.right && e.clientY >= fr.top && e.clientY <= fr.bottom;
		if(d.kind === "list"){
			if(cancel) return;
			if(!d.moved){ spawnFree(d.id); return; }
			if(!inField) return;
			const it = addItem(d.id, e.clientX - fr.left - ITEM/2, e.clientY - fr.top - ITEM/2);
			if(it) settle(it);
		}else{
			const it = d.it;
			it.el.classList.remove("al-drag");
			if(cancel) return;
			if(!d.moved){
				const n = Date.now();
				if(lastTap.uid === it.uid && n - lastTap.t < 350){
					lastTap = { uid:0, t:0 };
					addItem(it.id, it.x + ITEM*0.35, it.y + ITEM*0.35);
				}else lastTap = { uid: it.uid, t: n };
				return;
			}
			const sr = side.getBoundingClientRect();
			if(e.clientX >= sr.left && e.clientX <= sr.right && e.clientY >= sr.top && e.clientY <= sr.bottom){
				removeItem(it, true);
				return;
			}
			settle(it);
		}
	}
	on(document, "pointerup", e => endDrag(e, false));
	on(document, "pointercancel", e => endDrag(e, true));

	function order(arr, nameOf){
		const m = SORTS[sortI];
		if(m === "new") return arr.slice().reverse();
		if(m === "az") return arr.slice().sort((a, b) => nameOf(a).localeCompare(nameOf(b), "ru"));
		return arr;
	}
	function cardHtml(id){
		const e = EL[id];
		return '<div class="al-card' + (fresh.has(id) ? " al-fresh" : "") + '" data-id="' + esc(id) + '" title="' + esc(tip(id)) + '">'
			+ face(e, LIST_FX) + '<div class="al-cn">' + esc(e.name) + '</div></div>';
	}
	function partHtml(id){ return '<span class="al-pt" title="' + esc(tip(id)) + '">' + face(EL[id], false) + '<b>' + esc(EL[id].name) + '</b></span>'; }
	function rowHtml(k){
		const r = RC[k];
		return '<div class="al-rc" data-k="' + esc(k) + '" title="Клик: положить ингредиенты на поле">'
			+ partHtml(r.a) + '<i>+</i>' + partHtml(r.b) + '<i>=</i>' + r.out.map(partHtml).join('<i>+</i>') + '</div>';
	}
	function renderList(){
		const qq = q.trim().toLowerCase();
		let html = "";
		if(tab === "el"){
			let ids = S.el.filter(id => EL[id]);
			if(qq) ids = ids.filter(id => EL[id].name.toLowerCase().includes(qq));
			ids = order(ids, id => EL[id].name);
			html = ids.length ? '<div class="al-cards">' + ids.map(cardHtml).join("") + '</div>' : '<div class="al-none">' + (qq ? "Ничего не найдено." : "Пусто.") + '</div>';
		}else{
			let ks = S.rc.filter(k => RC[k]);
			if(qq) ks = ks.filter(k => { const r = RC[k]; return [r.a, r.b].concat(r.out).some(id => EL[id].name.toLowerCase().includes(qq)); });
			ks = order(ks, k => RC[k].out.map(o => EL[o].name).join(" "));
			html = ks.length ? ks.map(rowHtml).join("") : '<div class="al-none">' + (qq ? "Ничего не найдено." : "Рецептов пока нет. Соедини два элемента.") + '</div>';
		}
		list.innerHTML = html;
	}
	function setTab(t){
		tab = t;
		$("al-t-el").classList.toggle("al-on", t === "el");
		$("al-t-rc").classList.toggle("al-on", t === "rc");
		renderList();
	}
	on($("al-t-el"), "click", () => setTab("el"));
	on($("al-t-rc"), "click", () => setTab("rc"));
	on($("al-q"), "input", () => { q = $("al-q").value; renderList(); });
	on($("al-qc"), "click", () => { $("al-q").value = ""; q = ""; renderList(); });
	on($("al-sort"), "click", () => { sortI = (sortI + 1) % SORTS.length; $("al-sort").textContent = SORT_L[SORTS[sortI]]; renderList(); });
	on(list, "click", e => { const r = e.target.closest(".al-rc"); if(r) placeRecipe(RC[r.dataset.k]); });

	const masked = id => { const n = EL[id].name; return esc(n.charAt(0) + "•".repeat(Math.max(1, n.length - 1))); };
	function renderAvail(){
		const box = $("al-avail"); if(!box) return;
		const can = [], seen = new Set();
		let leftR = 0;
		RLIST.forEach(r => {
			if(!known.has(r.a) || !known.has(r.b)) return;
			if(!found.has(r.key)) leftR++;
			r.out.forEach(o => { if(!known.has(o) && !seen.has(o)){ seen.add(o); can.push(o); } });
		});
		const all = known.size >= ELN;
		const sig = AVAIL_MODE + "|" + can.join(",") + "|" + leftR + "|" + all;
		if(sig === availSig) return;
		availSig = sig;

		let body = "";
		if(!can.length){
			body = '<div class="al-none2">' + (all
				? (S.ch ? "Все элементы открыты через читы." : "Все элементы открыты.")
				: leftR
					? "Новых элементов из твоих сейчас не получить, но неоткрытых рецептов: " + leftR + ". Подсказка покажет их."
					: "Из того, что у тебя есть, ничего нового не выйдет. Нужны другие комбинации или самосоединения.") + '</div>';
		}else if(AVAIL_MODE === "mask"){
			body = '<div class="al-av-l">' + can.map(id => '<span class="al-hc al-sil">' + face(EL[id], false) + '<b>' + masked(id) + '</b></span>').join("") + '</div>';
		}else if(AVAIL_MODE !== "count"){
			body = '<div class="al-av-l">' + can.map(id => '<span class="al-hc">' + face(EL[id], false) + '<b>' + esc(EL[id].name) + '</b></span>').join("") + '</div>';
		}else{
			body = '<div class="al-av-l">' + can.map(id => '<span class="al-hc" title="' + esc(tip(id)) + '">' + face(EL[id], false) + '<b>' + esc(EL[id].name) + '</b></span>').join("") + '</div>';
		}
		box.innerHTML = '<div class="al-av-h">🎯 МОЖНО ПОЛУЧИТЬ СЕЙЧАС: <b>' + can.length + '</b></div>' + body;
	}

	function pickTarget(exclude){
		const c = RLIST.filter(r => known.has(r.a) && known.has(r.b));
		let g = c.filter(r => r.out.some(o => !known.has(o)));
		if(!g.length) g = c.filter(r => !found.has(r.key));
		if(g.length > 1 && exclude) g = g.filter(r => r.key !== exclude);
		return g.length ? pick(g) : null;
	}
	const hc = id => '<span class="al-hc" title="' + esc(tip(id)) + '">' + face(EL[id], false) + '<b>' + esc(EL[id].name) + '</b></span>';
	const HQ = '<span class="al-hc al-hq"><span class="al-ic">?</span><b>?</b></span>';
	function paintHint(){
		const r = S.hk && RC[S.hk], box = $("al-hint");
		if(!r || !S.hl){
			box.innerHTML = '💡 Подсказка открывает по одному ингредиенту: нажми раз — первый, ещё раз — второй. Цель — новый элемент. ' + HINTS_PER_DAY + ' в день.';
			return;
		}
		const goal = r.out.some(o => !known.has(o)) ? "новый элемент" : "рецепт";
		box.innerHTML = '<small class="al-hs">ПОДСКАЗКА ' + S.hl + '/2 · цель: ' + goal + '</small><div class="al-hrow">'
			+ (S.hl === 1
				? hc(S.hf) + '<i>+</i>' + HQ + '<i>=</i>' + HQ
				: hc(r.a) + '<i>+</i>' + hc(r.b) + '<i>=</i>' + HQ)
			+ '</div>';
	}
	function glow(ids){
		if(tab !== "el") setTab("el");
		list.querySelectorAll(".al-card").forEach(c => {
			if(ids.includes(c.dataset.id)){
				c.classList.add("al-hl");
				tm.push(setTimeout(() => c.classList.remove("al-hl"), 3500));
			}
		});
	}
	function doHint(){
		dayCheck();
		if(S.hu >= HINTS_PER_DAY){
			say("Подсказки на сегодня кончились (" + HINTS_PER_DAY + "/" + HINTS_PER_DAY + "). Новые будут завтра.", "bad");
			refresh(); return;
		}
		let r = S.hk && RC[S.hk];
		if(!r || S.hl >= 2 || found.has(S.hk)){
			r = pickTarget(S.hk);
			if(!r){
				$("al-hint").innerHTML = RLIST.some(x => !found.has(x.key))
					? '💡 Нет рецептов, где оба ингредиента уже у тебя. Подсказка не потрачена.'
					: '💡 Всё открыто. Искать больше нечего.';
				return;
			}
			S.hk = r.key; S.hl = 0; S.hf = Math.random() < 0.5 ? r.a : r.b;
		}
		S.hl++; S.hu++; S.h++;
		paintHint();
		glow(S.hl === 1 ? [S.hf] : [r.a, r.b]);
		refresh(); scheduleSave();
	}
	on($("al-hintb"), "click", doHint);

	const fmtT = s => {
		const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), c = s % 60;
		return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(c).padStart(2, "0");
	};
	function refresh(){
		const ne = known.size, nr = found.size, tr = RLIST.length;
		$("al-t-el").innerHTML = "ЭЛЕМЕНТЫ <b>" + ne + "</b>";
		$("al-t-rc").innerHTML = "РЕЦЕПТЫ <b>" + nr + "</b>";
		$("al-s-el").textContent = ne + " / " + ELN;
		$("al-s-rc").textContent = nr + " / " + tr;
		$("al-s-n").textContent  = S.n;
		$("al-s-f").textContent  = S.f;
		$("al-s-h").textContent  = S.h;
		$("al-s-t").textContent  = fmtT(S.t);
		const tot = ELN + tr, pct = tot ? Math.floor((ne + nr) / tot * 100) : 0;
		$("al-s-p").textContent = pct + "%" + (S.ch ? " · ЧИТЫ" : "");
		$("al-s-p").textContent = pct + "%";
		$("al-pfill").style.width = pct + "%";
		$("al-bar-el").style.width = (ELN ? ne / ELN * 100 : 0) + "%";
		$("al-bar-rc").style.width = (tr ? nr / tr * 100 : 0) + "%";
		const hl = Math.max(0, HINTS_PER_DAY - S.hu), hb = $("al-hintb");
		hb.innerHTML = "💡 ПОДСКАЗКА <b>" + hl + "/" + HINTS_PER_DAY + "</b>";
		hb.classList.toggle("al-off", hl === 0);
		$("al-cheat").style.display = S.ch ? "" : "none";
		renderAvail();
	}

	on($("al-clear"), "click", () => {
		items.forEach(it => it.el.remove());
		items.clear(); mark(null); updEmpty(); scheduleSave();
		say("Поле очищено.", "dim");
	});

	const rb = $("al-reset");
	let armed = false, armT = 0;
	function disarm(){ armed = false; clearTimeout(armT); rb.textContent = "☠ СБРОСИТЬ СОХРАНЕНИЕ"; rb.classList.remove("al-arm"); }
	on(rb, "click", () => {
		if(!armed){
			armed = true;
			rb.textContent = "⚠ ТОЧНО? НАЖМИ ЕЩЁ РАЗ";
			rb.classList.add("al-arm");
			armT = setTimeout(disarm, 4000); tm.push(armT);
			return;
		}
		disarm();
		clearTimeout(saveT);
		try{ localStorage.removeItem(SAVE_KEY); }catch(e){}
		const hd = S.hd, hu = S.hu;
		S = fresh0(); S.hd = hd; S.hu = hu;
		known.clear(); S.el.forEach(id => known.add(id));
		found.clear(); fresh.clear(); availSig = "";
		items.forEach(it => it.el.remove()); items.clear(); mark(null); updEmpty();
		paintHint();
		q = ""; $("al-q").value = ""; setTab("el"); refresh();
		say("Сохранение стёрто. Начинаем с нуля.", "bad");
		saveNow();
	});

	if("ResizeObserver" in window){
		const ro = new ResizeObserver(() => items.forEach(it => setPos(it, it.x, it.y)));
		ro.observe(field);
		sig.addEventListener("abort", () => ro.disconnect());
	}
	on(window, "pagehide", saveNow);
	tm.push(setInterval(() => {
		if(!root.isConnected){ window.__alClean(); return; }
		if(document.hidden) return;
		S.t++;
		const el = $("al-s-t"); if(el) el.textContent = fmtT(S.t);
		if(S.t % 20 === 0 && dayCheck()){ refresh(); scheduleSave(); }
		if(S.t % 15 === 0) saveNow();
	}, 1000));

	S.field.forEach(([id, rx, ry]) => { if(known.has(id)) addItem(id, rx * fw(), ry * fh()); });
	updEmpty(); renderList(); paintHint(); refresh();
	$("al-sort").textContent = SORT_L[SORTS[sortI]];
	say(S.ch ? "🔓 Открыто через читы. Сбрось сохранение, чтобы играть честно." : S.n ? "С возвращением. Открыто: " + known.size + " / " + ELN + "." : "Перетащи элемент на поле и положи один на другой.", S.ch ? "bad" : "dim");
}

const live = () => { try{ init(); }catch(e){ console.error("[ALCHEMY]", e); } };

/* ═══ СЕКРЕТ: ОТКРЫТЬ ВСЁ ═══ */
if (!window.__alCheat) {
  window.__alCheat = true;

  const CHEAT_RECIPES = true; // true = открывать и рецепты тоже, false = только элементы
  const CHEAT_CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

  // добавляет недостающие ключи в массив или объект, сохраняя формат
  const cheatFill = (cur, keys) => {
    if (Array.isArray(cur)) {
      const have = new Set(cur);
      keys.forEach(k => { if (!have.has(k)) cur.push(k); });
      return cur;
    }
    if (cur && typeof cur === "object") {
      const vals = Object.values(cur);
      const v = vals[0];
      let n = vals.filter(x => typeof x === "number").reduce((a, b) => Math.max(a, b), 0);
      keys.forEach(k => {
        if (k in cur) return;
        if (typeof v === "number") cur[k] = ++n;
        else if (v && typeof v === "object") cur[k] = JSON.parse(JSON.stringify(v));
        else cur[k] = (v === undefined ? 1 : v);
      });
      return cur;
    }
    return keys.slice();
  };

  window.ALCHEMY_UNLOCK = function () {
    try {
      // дать игре сохранить текущее состояние и остановить её
      window.dispatchEvent(new Event("pagehide"));
      if (window.__alClean) { try { window.__alClean(); } catch (e) {} }

      let s = {};
      try { s = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") || {}; } catch (e) { s = {}; }

      const el = new Set(Array.isArray(s.el) ? s.el : []);
      Object.keys(EL).forEach(id => el.add(id));
      s.el = [...el];

      if (CHEAT_RECIPES) {
        const rc = new Set(Array.isArray(s.rc) ? s.rc : []);
        RLIST.forEach(r => rc.add(r.key));
        s.rc = [...rc];
      }

      s.ch = 1; // метка «открыто через читы»

      // пишем и блокируем перезапись старым состоянием до перезагрузки
      const orig = Storage.prototype.setItem;
      orig.call(localStorage, SAVE_KEY, JSON.stringify(s));
      Storage.prototype.setItem = function (k) {
        if (k === SAVE_KEY) return;
        return orig.apply(this, arguments);
      };

      location.hash = "alchemy";
      setTimeout(() => location.reload(), 50);
    } catch (e) {
      console.error("[ALCHEMY] не вышло открыть всё:", e);
    }
  };

  // Konami
  let pos = 0;
  document.addEventListener("keydown", e => {
    if (!document.getElementById("al-root")) { pos = 0; return; }
    const t = e.target && e.target.tagName;
    if (t === "INPUT" || t === "TEXTAREA") return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === CHEAT_CODE[pos]) {
      pos++;
      if (pos === CHEAT_CODE.length) { pos = 0; window.ALCHEMY_UNLOCK(); }
    } else {
      pos = (k === CHEAT_CODE[0]) ? 1 : 0;
    }
  });

  // скрытая точка: 5 кликов за 2 секунды
  setInterval(() => {
    const root = document.getElementById("al-root");
    if (!root || document.getElementById("al-sec")) return;
    if (getComputedStyle(root).position === "static") root.style.position = "relative";
    const d = document.createElement("div");
    d.id = "al-sec";
    d.textContent = "·";
    d.style.cssText = "position:absolute;right:8px;bottom:4px;width:16px;height:16px;line-height:16px;text-align:center;" +
      "color:#d4af37;opacity:.07;font:12px 'Courier New',monospace;user-select:none;z-index:50;transition:opacity .3s";
    d.onmouseenter = () => { d.style.opacity = ".5"; };
    d.onmouseleave = () => { d.style.opacity = ".07"; };
    let n = 0, tm = 0;
    d.onclick = () => {
      n++;
      clearTimeout(tm);
      tm = setTimeout(() => { n = 0; }, 2000);
      if (n >= 5) { n = 0; window.ALCHEMY_UNLOCK(); }
    };
    root.appendChild(d);
  }, 1000);
}

/* ═══════════════ РАЗМЕТКА И СТИЛИ ═══════════════ */
return ELEMENT_SITE(`
<style>
#al-root{ max-width:1240px; margin:0 auto; padding:14px; font-family:'Courier New',monospace; color:#e8d9b0; }
#al-root *{ box-sizing:border-box; }

.al-prob{ margin:0 0 12px; padding:10px 12px; border:1px solid #ff0044; background:rgba(122,0,34,.28); font-size:12px; line-height:1.7; }
.al-prob-h{ margin-bottom:4px; color:#ff4d7a; letter-spacing:1px; font-weight:bold; }
.al-pr-err{ color:#ff9db5; }
.al-pr-warn{ color:#d4af37; }

.al-head{ text-align:center; margin:4px 0 14px; }
.al-title{ position:relative; display:inline-block; font-size:34px; letter-spacing:8px; font-weight:bold; color:#ff0044; text-shadow:0 0 14px rgba(255,0,68,.7); }
.al-title::before,.al-title::after{ content:attr(data-text); position:absolute; left:0; right:0; top:0; text-align:center; opacity:0; }
.al-title::before{ color:#00e5ff; clip-path:inset(0 0 60% 0); animation:al-gl 3.1s steps(1) infinite; }
.al-title::after { color:#d4af37; clip-path:inset(60% 0 0 0); animation:al-gl 2.3s steps(1) infinite reverse; }
@keyframes al-gl{ 0%,90%,100%{opacity:0; transform:translate(0)} 92%,96%{opacity:.85; transform:translate(-3px,0)} 94%{opacity:.85; transform:translate(3px,0)} }
.al-sub{ margin-top:6px; font-size:12px; color:#8a6a72; letter-spacing:1px; }

.al-grid{ display:grid; grid-template-columns:340px minmax(0,1fr); gap:12px; align-items:stretch; }
.al-side{ position:relative; min-height:460px; border:1px solid #3a1020; background:linear-gradient(180deg,#0e060b,#07020a); box-shadow:inset 0 0 0 1px rgba(212,175,55,.06); }
.al-side-in{ position:absolute; inset:0; display:flex; flex-direction:column; }
.al-tabs{ display:flex; border-bottom:1px solid #3a1020; }
.al-tabs .al-btn{ flex:1; padding:10px 4px; border-width:0 0 2px 0; }
.al-tabs b{ color:#d4af37; margin-left:4px; }
.al-sbar{ display:flex; gap:6px; padding:8px; border-bottom:1px solid #2a0a14; }
#al-root .al-search{ -webkit-appearance:none; appearance:none; flex:1; min-width:0; padding:6px 8px; border:1px solid #3a1020; border-radius:0; background:#050003; color:#e8d9b0; font:12px 'Courier New',monospace; outline:none; box-shadow:none; }
#al-root .al-search:focus{ border-color:#d4af37; }
.al-list{ flex:1; min-height:0; overflow-y:auto; padding:8px; scrollbar-width:thin; scrollbar-color:#7a0022 #0b0508; }
.al-cards{ display:grid; grid-template-columns:repeat(auto-fill,minmax(76px,1fr)); gap:6px; }
.al-none{ padding:24px 8px; text-align:center; color:#6a4a55; font-size:12px; }

.al-card{ position:relative; padding:8px 2px 5px; text-align:center; border:1px solid #2a0a14; background:rgba(0,0,0,.4); cursor:pointer; touch-action:pan-y; user-select:none; -webkit-user-select:none; transition:border-color .15s, background .15s; }
.al-card:hover{ border-color:#d4af37; background:rgba(212,175,55,.07); }
.al-cn{ font-size:10px; line-height:1.15; color:#e8d9b0; overflow-wrap:anywhere; }
.al-card.al-fresh{ border-color:#ff0044; }
.al-card.al-fresh::after{ content:"NEW"; position:absolute; top:2px; right:2px; padding:0 3px; font-size:8px; color:#050003; background:#ff0044; }
.al-card.al-hl{ border-color:#ffd966; box-shadow:0 0 14px rgba(255,217,102,.8), inset 0 0 10px rgba(255,217,102,.25); animation:al-hlb .5s ease-in-out infinite alternate; }
@keyframes al-hlb{ from{ background:rgba(212,175,55,.05) } to{ background:rgba(212,175,55,.3) } }

.al-rc{ display:flex; flex-wrap:wrap; align-items:center; gap:3px 5px; padding:6px 4px; border-bottom:1px solid #2a0a14; font-size:11px; cursor:pointer; }
.al-rc:hover{ background:rgba(212,175,55,.07); }
.al-rc i{ font-style:normal; color:#8a6a72; }
.al-pt{ display:inline-flex; align-items:center; gap:3px; }
.al-pt b{ font-weight:normal; color:#e8d9b0; }

.al-main{ min-width:0; }
.al-bar{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-bottom:8px; }
.al-msg{ flex:1; min-width:180px; padding:7px 10px; border:1px solid #2a0a14; background:rgba(0,0,0,.35); font-size:12px; color:#e8d9b0; }
.al-msg.al-ok{ color:#7aff9a; border-color:#1d4a2c; }
.al-msg.al-new{ color:#ffd966; border-color:#d4af37; text-shadow:0 0 8px rgba(212,175,55,.6); }
.al-msg.al-bad{ color:#ff4d7a; border-color:#7a0022; }
.al-msg.al-dim{ color:#8a6a72; }

.al-field{ position:relative; height:${FIELD_H}px; overflow:hidden; isolation:isolate; touch-action:none; user-select:none; -webkit-user-select:none;
	border:1px solid #3a1020; box-shadow:inset 0 0 40px rgba(0,0,0,.8), 0 0 0 1px rgba(212,175,55,.08);
	background:
		radial-gradient(ellipse at 50% 40%, rgba(122,0,34,.22), transparent 70%),
		repeating-linear-gradient(0deg,  transparent 0 31px, rgba(212,175,55,.05) 31px 32px),
		repeating-linear-gradient(90deg, transparent 0 31px, rgba(212,175,55,.05) 31px 32px),
		#07020a; }
.al-empty{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; text-align:center; padding:20px; color:#4a2a35; font-size:15px; letter-spacing:2px; line-height:1.8; pointer-events:none; }

.al-it{ position:absolute; width:${ITEM}px; height:${ITEM}px; border:1px solid rgba(212,175,55,.22); border-radius:12px; background:rgba(0,0,0,.45); cursor:pointer; touch-action:none; user-select:none; -webkit-user-select:none; }
.al-it:hover{ border-color:rgba(212,175,55,.75); }
.al-it .al-ic{ position:absolute; inset:0; font-size:${ICON}px; }
.al-it.al-slide{ transition:left .25s ease-out, top .25s ease-out; }
.al-it.al-drag{ border-color:#d4af37; box-shadow:0 0 18px rgba(212,175,55,.5); }
.al-it.al-target{ border-color:#ffd966; box-shadow:0 0 22px rgba(255,217,102,.9); background:rgba(212,175,55,.18); }
.al-nm{ position:absolute; top:100%; left:50%; transform:translateX(-50%); margin-top:2px; white-space:nowrap; font-size:10px; color:#e8d9b0; text-shadow:0 1px 2px #000, 0 0 4px #000; pointer-events:none; }
.al-burst{ position:absolute; width:${ITEM}px; height:${ITEM}px; border:2px solid; border-radius:50%; pointer-events:none; z-index:2147483; }
.al-toast{ position:absolute; top:12px; left:50%; transform:translate(-50%,-20px); opacity:0; pointer-events:none; z-index:2147484; padding:8px 18px; text-align:center; background:rgba(5,0,3,.92); border:1px solid #d4af37; box-shadow:0 0 24px rgba(212,175,55,.5); transition:opacity .3s, transform .3s; }
.al-toast.show{ opacity:1; transform:translate(-50%,0); }
.al-toast small{ display:block; font-size:10px; letter-spacing:3px; color:#d4af37; }
.al-toast b{ color:#ffd966; font-size:14px; }
.al-tf{ display:flex; justify-content:center; gap:6px; margin:4px 0; }
.al-tf .al-ic{ width:42px; height:42px; font-size:34px; }

.al-hint{ margin-top:8px; min-height:40px; padding:9px 12px; border:1px solid #2a0a14; background:rgba(0,0,0,.35); font-size:12px; line-height:1.9; color:#c9b88a; }
.al-hs{ display:block; font-size:9px; letter-spacing:2px; color:#d4af37; margin-bottom:4px; }
.al-hrow{ display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.al-hrow i, .al-av-h i{ font-style:normal; color:#8a6a72; font-size:16px; }
.al-hc{ display:inline-flex; align-items:center; gap:6px; padding:4px 9px; border:1px solid #3a1020; background:rgba(0,0,0,.45); }
.al-hc b{ font-weight:normal; color:#e8d9b0; font-size:12px; }
.al-hc .al-ic{ width:26px; height:26px; font-size:21px; }
.al-hq{ border:1px dashed #7a0022; }
.al-hq .al-ic, .al-hq b{ color:#ff4d7a; }
.al-sil .al-ic{ filter:brightness(0) opacity(.85) !important; }
.al-sil{ border-color:#2a0a14; }

.al-avail{ margin-top:8px; padding:9px 12px; border:1px solid #2a0a14; border-left:3px solid #d4af37; background:rgba(0,0,0,.35); font-size:12px; }
.al-av-h{ font-size:10px; letter-spacing:2px; color:#8a6a72; margin-bottom:6px; }
.al-av-h b{ color:#d4af37; font-size:14px; }
.al-av-l{ display:flex; flex-wrap:wrap; gap:6px; max-height:130px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#7a0022 #0b0508; }
.al-none2{ color:#6a4a55; font-size:12px; line-height:1.6; }

.al-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(118px,1fr)); gap:8px; margin-top:8px; }
.al-st{ padding:7px 10px; border:1px solid #2a0a14; background:rgba(0,0,0,.35); }
.al-st small{ display:block; font-size:9px; letter-spacing:2px; color:#8a6a72; }
.al-st b{ font-size:16px; color:#d4af37; }
.al-bar-b{ height:3px; margin-top:4px; background:#1a0a10; }
.al-bar-b div{ height:100%; width:0; background:linear-gradient(90deg,#7a0022,#ff0044); transition:width .4s; }
.al-st.al-wide{ grid-column:1/-1; }
.al-pbar{ height:8px; margin-top:6px; background:#1a0a10; border:1px solid #2a0a14; }
.al-pbar div{ height:100%; width:0; background:repeating-linear-gradient(135deg,#ff0044 0 8px,#7a0022 8px 16px); transition:width .5s; }

.al-cheat{ margin-top:6px; padding:4px 8px; border:1px dashed #ff0044; color:#ff4d7a; font-size:11px; letter-spacing:2px; text-align:center; background:rgba(122,0,34,.25); animation:al-blink2 1.4s steps(2) infinite; }
@keyframes al-blink2{ 50%{ opacity:.55 } }

.al-foot{ display:flex; justify-content:flex-end; margin-top:8px; }

#al-root .al-btn{ all:unset; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px; cursor:pointer; padding:7px 12px; border:1px solid #3a1020; background:linear-gradient(180deg,#1a0a10,#0b0508); color:#e8d9b0; font:12px 'Courier New',monospace; letter-spacing:1px; user-select:none; -webkit-user-select:none; text-align:center; }
#al-root .al-btn b{ color:#d4af37; }
#al-root .al-btn:hover{ border-color:#d4af37; color:#ffd966; box-shadow:0 0 10px rgba(212,175,55,.25); }
#al-root .al-btn:active{ background:#2a0a14; }
#al-root .al-btn.al-on{ border-color:#ff0044; color:#ff4d7a; background:linear-gradient(180deg,#2a0510,#14030a); }
#al-root .al-btn.al-sm{ padding:5px 8px; font-size:11px; }
#al-root .al-btn.al-off{ opacity:.45; }
#al-root .al-btn.al-arm{ border-color:#ff0044; color:#fff; background:#7a0022; animation:al-blink .6s steps(2) infinite; }
@keyframes al-blink{ 50%{ background:#ff0044 } }

.al-ic{ --c:#ff0044; position:relative; display:flex; align-items:center; justify-content:center; line-height:1; font-family:"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif; }
.al-ic img{ width:82%; height:82%; object-fit:contain; image-rendering:auto; pointer-events:none; }
.al-card .al-ic{ width:38px; height:38px; font-size:28px; margin:0 auto 3px; }
.al-pt .al-ic{ width:20px; height:20px; font-size:16px; }
.al-ghost{ position:fixed; z-index:2147483000; width:${ITEM}px; height:${ITEM}px; margin:-${ITEM/2}px 0 0 -${ITEM/2}px; pointer-events:none; border:1px solid #d4af37; border-radius:12px; background:rgba(0,0,0,.6); box-shadow:0 0 20px rgba(212,175,55,.6); }
.al-ghost .al-ic{ position:absolute; inset:0; font-size:${ICON}px; }

.al-glow{ filter:drop-shadow(0 0 6px var(--c)) drop-shadow(0 0 14px var(--c)); }
.al-neon{ filter:drop-shadow(0 0 2px #fff) drop-shadow(0 0 8px var(--c)) drop-shadow(0 0 18px var(--c)) drop-shadow(0 0 32px var(--c)); }
.al-ring::after{ content:""; position:absolute; inset:6%; border:2px solid var(--c); border-radius:50%; opacity:0; pointer-events:none; animation:al-k-ring 1.8s ease-out infinite; }
@keyframes al-k-ring{ 0%{ transform:scale(.5); opacity:.9 } 100%{ transform:scale(1.5); opacity:0 } }
@keyframes al-k-float{ 0%,100%{ translate:0 0 } 50%{ translate:0 -6px } }
@keyframes al-k-shake{ 0%,100%{ translate:0 0 } 25%{ translate:-2px 1px } 50%{ translate:2px -1px } 75%{ translate:-1px -2px } }
@keyframes al-k-spin{ to{ rotate:360deg } }
@keyframes al-k-wobble{ 0%,100%{ rotate:-10deg } 50%{ rotate:10deg } }
@keyframes al-k-pulse{ 0%,100%{ scale:1 } 50%{ scale:1.18 } }
@keyframes al-k-flicker{ 0%,100%{ opacity:1 } 8%{ opacity:.35 } 10%{ opacity:1 } 30%{ opacity:.85 } 32%{ opacity:.25 } 34%{ opacity:1 } 70%{ opacity:.9 } 72%{ opacity:.45 } 74%{ opacity:1 } }
@keyframes al-k-glitch{
	0%,85%,100%{ translate:0 0 }
	88%{ translate:-3px 1px; filter:drop-shadow(-3px 0 #00e5ff) drop-shadow(3px 0 #ff0044) }
	92%{ translate:3px -1px; filter:drop-shadow(3px 0 #00e5ff) drop-shadow(-3px 0 #ff0044) }
	96%{ translate:-1px 0;   filter:drop-shadow(-2px 0 #00e5ff) drop-shadow(2px 0 #ff0044) } }
@keyframes al-k-rainbow{ to{ filter:hue-rotate(360deg) } }

@media (max-width:860px){
	.al-grid{ grid-template-columns:1fr; }
	.al-side{ min-height:0; height:420px; }
}
</style>

<div id="al-root">
	${problemsHtml}
	<div class="al-head">
		<div class="al-title" data-text="⚗ АЛХИМИЯ">⚗ АЛХИМИЯ</div>
		<div class="al-sub">положи один элемент на другой · двойной клик клонирует · брось на список слева, чтобы убрать</div>
	</div>

	<div class="al-grid">
		<div class="al-side" id="al-side"><div class="al-side-in">
			<div class="al-tabs">
				<button class="al-btn al-on" id="al-t-el">ЭЛЕМЕНТЫ</button>
				<button class="al-btn" id="al-t-rc">РЕЦЕПТЫ</button>
			</div>
			<div class="al-sbar">
				<input class="al-search" id="al-q" type="text" placeholder="🔍 поиск…" autocomplete="off" spellcheck="false">
				<button class="al-btn al-sm" id="al-qc" title="Очистить поиск">✕</button>
				<button class="al-btn al-sm" id="al-sort" title="Порядок">↓ НОВЫЕ</button>
			</div>
			<div class="al-list" id="al-list"></div>
		</div></div>

		<div class="al-main">
			<div class="al-bar">
				<div class="al-msg" id="al-msg">…</div>
				<button class="al-btn" id="al-hintb">💡 ПОДСКАЗКА</button>
				<button class="al-btn" id="al-clear">🧹 ОЧИСТИТЬ ПОЛЕ</button>
			</div>

			<div class="al-field" id="al-field">
				<div class="al-empty" id="al-empty">ПЕРЕТАЩИ ЭЛЕМЕНТ СЮДА<br>или кликни по нему в списке</div>
				<div class="al-toast" id="al-toast"></div>
			</div>

			<div class="al-avail" id="al-avail"></div>
			<div class="al-hint" id="al-hint"></div>

			<div class="al-stats">
				<div class="al-st al-wide">
					<small>ОБЩИЙ ПРОГРЕСС</small><b id="al-s-p">0%</b>
					<div class="al-pbar"><div id="al-pfill"></div></div>
					<div class="al-cheat" id="al-cheat" style="display:none">🔓 ВСЁ ОТКРЫТО ЧЕРЕЗ ЧИТЫ</div>
				</div>
				<div class="al-st"><small>ЭЛЕМЕНТОВ ОТКРЫТО</small><b id="al-s-el">0</b><div class="al-bar-b"><div id="al-bar-el"></div></div></div>
				<div class="al-st"><small>РЕЦЕПТОВ ОТКРЫТО</small><b id="al-s-rc">0</b><div class="al-bar-b"><div id="al-bar-rc"></div></div></div>
				<div class="al-st"><small>СОЕДИНЕНИЙ</small><b id="al-s-n">0</b></div>
				<div class="al-st"><small>ПРОВАЛОВ</small><b id="al-s-f">0</b></div>
				<div class="al-st"><small>ПОДСКАЗОК ВСЕГО</small><b id="al-s-h">0</b></div>
				<div class="al-st"><small>ВРЕМЯ В ИГРЕ</small><b id="al-s-t">0:00</b></div>
			</div>
			<div class="al-foot"><button class="al-btn" id="al-reset">☠ СБРОСИТЬ СОХРАНЕНИЕ</button></div>
		</div>
	</div>
</div>
`, () => {}, false, live);

});