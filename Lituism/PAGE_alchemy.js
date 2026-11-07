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
	{ id:"lock",   name:"Lock",    visual:"alc/lock.png", fx:["pulse"], color:"#d4af37" },
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
	{ id:"script", name:"Скрипт", visual:"📜", fx:["flicker"], color:"#ffe14d" },
	{ id:"moon",   name:"Луна",   visual:"🌙", fx:["float"], color:"#7a00ff" },
	{ id:"table",  name:"Таблица",visual:"🗃️", fx:["pulse"], color:"#00e5ff" },
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
	
		/* ══════════════ НОВЫЕ: ИСПРАВЛЕНИЕ + БАЗА ══════════════ */
	{ id:"cache",    name:"Кэш",         visual:"📦", fx:["glow"], color:"#00e5ff", desc:"Быстрая память. Ненадёжная." },
	{ id:"tool",     name:"Инструмент",  visual:"🔧", fx:["wobble"], color:"#d4af37", desc:"Руками. По металлу." },

	/* ══════════════ НОВЫЕ: ПАМЯТЬ И ДАННЫЕ ══════════════ */
	{ id:"register", name:"Регистр",     visual:"🧮", fx:["pulse"], color:"#7aff9a" },
	{ id:"sector",   name:"Сектор",      visual:"📀", fx:["float"], color:"#00e5ff" },
	{ id:"cluster",  name:"Кластер",     visual:"🪐", fx:["pulse"], color:"#00e5ff" },
	{ id:"address",  name:"Адрес",       visual:"📍", fx:["flicker"], color:"#ff0044" },
	{ id:"offset",   name:"Смещение",    visual:"↔️", fx:["float"], color:"#d4af37" },
	{ id:"page",     name:"Страница",    visual:"📄", fx:["float"], color:"#00e5ff" },
	{ id:"frame",    name:"Фрейм",       visual:"🖼️", fx:["pulse"], color:"#00e5ff" },
	{ id:"cell",     name:"Ячейка",      visual:"🔲", fx:["pulse"], color:"#d4af37" },
	{ id:"pixel",    name:"Пиксель",     visual:"🔳", fx:["glow"], color:"#ff7ad9" },
	{ id:"vertex",   name:"Вершина",     visual:"🔺", fx:["float"], color:"#7aff9a" },
	{ id:"vector",   name:"Вектор",      visual:"➡️", fx:["pulse"], color:"#00e5ff" },
	{ id:"matrix",   name:"Матрица",     visual:"🔢", fx:["pulse"], color:"#7aff9a" },
	{ id:"quaternion",name:"Кватернион", visual:"🌀", fx:["spin"], color:"#7a00ff" },
	{ id:"seed",     name:"Сид",         visual:"🌱", fx:["pulse"], color:"#7aff9a" },
	{ id:"prng",     name:"PRNG",        visual:"🎲", fx:["glitch"], color:"#7aff9a" },

	/* ══════════════ НОВЫЕ: ЯЗЫКИ И СРЕДЫ ══════════════ */
	{ id:"zig",      name:"Zig",         visual:"⚡", fx:["pulse"], color:"#ffcc00" },
	{ id:"nim",      name:"Nim",         visual:"👑", fx:["pulse"], color:"#ffe14d" },
	{ id:"elixir",   name:"Elixir",      visual:"🧪", fx:["ring","glow"], color:"#7a00ff" },
	{ id:"dart",     name:"Dart",        visual:"🎯", fx:["float"], color:"#00e5ff" },
	{ id:"perl",     name:"Perl",        visual:"🐪", fx:["wobble"], color:"#7a00ff" },
	{ id:"r",        name:"R",           visual:"📊", fx:["pulse"], color:"#00e5ff" },
	{ id:"matlab",   name:"MATLAB",      visual:"📈", fx:["pulse"], color:"#ff6a00" },
	{ id:"fortran",  name:"Fortran",     visual:"🔢", fx:["flicker"], color:"#d4af37" },
	{ id:"cobol",    name:"COBOL",       visual:"📠", fx:["flicker"], color:"#8a6a72" },
	{ id:"pascal",   name:"Pascal",      visual:"🅿️", fx:["pulse"], color:"#7aff9a" },
	{ id:"prolog",   name:"Prolog",      visual:"🔮", fx:["ring"], color:"#7a00ff" },
	{ id:"lisp",     name:"Lisp",        visual:"λ", fx:["ring","glow"], color:"#7a00ff" },
	{ id:"scheme",   name:"Scheme",      visual:"🧬", fx:["ring","glow"], color:"#7a00ff" },
	{ id:"d",        name:"D",           visual:"🅳", fx:["pulse"], color:"#ff0044" },
	{ id:"v",        name:"V",           visual:"✅", fx:["pulse"], color:"#00e5ff" },
	{ id:"julia",    name:"Julia",       visual:"🌺", fx:["pulse","glow"], color:"#7a00ff" },
	{ id:"solidity", name:"Solidity",    visual:"💎", fx:["glitch"], color:"#7a00ff" },
	{ id:"wasm",     name:"WebAssembly", visual:"🕸️", fx:["pulse"], color:"#7a00ff" },
	{ id:"llvm",     name:"LLVM",        visual:"🏗️", fx:["spin"], color:"#d4af37" },
	{ id:"gcc",      name:"GCC",         visual:"🔨", fx:["pulse"], color:"#7aff9a" },
	{ id:"clang",    name:"Clang",       visual:"🔔", fx:["pulse"], color:"#00e5ff" },
	{ id:"makefile", name:"Makefile",    visual:"📋", fx:["flicker"], color:"#d4af37" },
	{ id:"docker",   name:"Docker",      visual:"🐳", fx:["float"], color:"#00e5ff" },
	{ id:"git",      name:"Git",         visual:"🌿", fx:["pulse"], color:"#ff6a00" },
	{ id:"github",   name:"GitHub",      visual:"🐙", fx:["glow"], color:"#7a00ff" },

	/* ══════════════ НОВЫЕ: ПРОТОКОЛЫ ══════════════ */
	{ id:"tcp",      name:"TCP",         visual:"📡", fx:["pulse"], color:"#00e5ff" },
	{ id:"udp",      name:"UDP",         visual:"📨", fx:["float"], color:"#00e5ff" },
	{ id:"http",     name:"HTTP",        visual:"🌐", fx:["pulse"], color:"#00e5ff" },
	{ id:"https",    name:"HTTPS",       visual:"🔒", fx:["ring","glow"], color:"#7aff9a" },
	{ id:"ssh",      name:"SSH",         visual:"🔑", fx:["glitch"], color:"#7a00ff" },
	{ id:"ftp",      name:"FTP",         visual:"📁", fx:["flicker"], color:"#d4af37" },
	{ id:"smtp",     name:"SMTP",        visual:"✉️", fx:["float"], color:"#00e5ff" },
	{ id:"websocket",name:"WebSocket",   visual:"🔌", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"mqtt",     name:"MQTT",        visual:"📟", fx:["float"], color:"#7aff9a" },
	{ id:"grpc",     name:"gRPC",        visual:"🧩", fx:["pulse"], color:"#7a00ff" },
	{ id:"rest",     name:"REST",        visual:"🛋️", fx:["pulse"], color:"#00e5ff" },
	{ id:"graphql",  name:"GraphQL",     visual:"🕸️", fx:["ring","glow"], color:"#ff7ad9" },

	/* ══════════════ НОВЫЕ: ЖЕЛЕЗО ══════════════ */
	{ id:"cpu",      name:"CPU",         visual:"🧠", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"gpu",      name:"GPU",         visual:"🎮", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"ram",      name:"RAM",         visual:"💾", fx:["glow"], color:"#00e5ff" },
	{ id:"ssd",      name:"SSD",         visual:"💽", fx:["glow"], color:"#00e5ff" },
	{ id:"hdd",      name:"HDD",         visual:"💿", fx:["spin"], color:"#d4af37" },
	{ id:"psu",      name:"Блок питания", visual:"🔌", fx:["pulse","glow"], color:"#ffe14d" },
	{ id:"fan",      name:"Кулер",       visual:"🌀", fx:["spin"], color:"#00e5ff" },
	{ id:"heatsink", name:"Радиатор",    visual:"♨️", fx:["pulse"], color:"#9fe8ff" },
	{ id:"thermal_paste",name:"Термопаста",visual:"🧴", fx:["float"], color:"#7aff9a" },
	{ id:"cooler",   name:"Охладитель",  visual:"❄️", fx:["spin"], color:"#00e5ff" },
	{ id:"battery",  name:"Батарея",     visual:"🔋", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"cable",    name:"Кабель",      visual:"🧵", fx:["float"], color:"#d4af37" },
	{ id:"usb",      name:"USB",         visual:"🔌", fx:["glow"], color:"#7aff9a" },
	{ id:"ethernet", name:"Ethernet",    visual:"🕸️", fx:["float"], color:"#00e5ff" },

	/* ══════════════ НОВЫЕ: КУЛЬТ ══════════════ */
	{ id:"sigil",    name:"Сигил",       visual:"⛧", fx:["ring","glow"], color:"#ff0044" },
	{ id:"altar",    name:"Алтарь",      visual:"⛩️", fx:["pulse","ring"], color:"#ff0044" },
	{ id:"hymn",     name:"Гимн",        visual:"🎵", fx:["pulse","glow"], color:"#d4af37" },
	{ id:"prayer",   name:"Молитва",     visual:"🙏", fx:["pulse"], color:"#d4af37" },
	{ id:"liturgy",  name:"Литургия",    visual:"📖", fx:["ring","glow"], color:"#d4af37" },
	{ id:"sermon",   name:"Проповедь",   visual:"🗣️", fx:["pulse"], color:"#ff0044" },
	{ id:"relic",    name:"Реликвия",    visual:"🏺", fx:["ring","glow"], color:"#d4af37" },
	{ id:"glyph",    name:"Глиф",        visual:"ᛟ", fx:["flicker","glow"], color:"#ff0044" },
	{ id:"rune",     name:"Руна",        visual:"ᚱ", fx:["ring"], color:"#d4af37" },
	{ id:"oracle",   name:"Оракул",      visual:"🔮", fx:["pulse","glow"], color:"#ff7ad9" },

	/* ══════════════ НОВЫЕ: МИР ══════════════ */
	{ id:"light",    name:"Свет",        visual:"💡", fx:["glow","pulse"], color:"#ffe14d" },
	{ id:"dark",     name:"Тьма",        visual:"🌑", fx:["ring","glitch"], color:"#7a00ff" },
	{ id:"fire",     name:"Огонь",       visual:"🔥", fx:["flicker","glow"], color:"#ff6a00" },
	{ id:"water",    name:"Вода",        visual:"💧", fx:["float","glow"], color:"#3aa0ff" },
	{ id:"air",      name:"Воздух",      visual:"💨", fx:["float"], color:"#9fe8ff" },
	{ id:"earth",    name:"Земля",       visual:"🌍", fx:["pulse"], color:"#7a5a3a" },
	{ id:"dust",     name:"Пыль",        visual:"🌫️", fx:["float"], color:"#b89a5a" },
	{ id:"ice",      name:"Лёд",         visual:"🧊", fx:["glow","pulse"], color:"#9fe8ff" },
	{ id:"wind",     name:"Ветер",       visual:"🌬️", fx:["float"], color:"#9fe8ff" },
	{ id:"smoke",    name:"Дым",         visual:"💨", fx:["float","glitch"], color:"#6a4a55" },

	/* ══════════════ НОВЫЕ: ЖИЗНЬ ══════════════ */
	{ id:"plant",    name:"Растение",    visual:"🌿", fx:["wobble"], color:"#7aff9a" },
	
		/* ══════════════ НОВЫЕ: дерево / пар / шторм / расплав / SSL ══════════════ */
	{ id:"storm",  name:"Шторм",  visual:"⛈️", fx:["shake","glow"], color:"#00e5ff" },
	{ id:"ssl",    name:"SSL",    visual:"🔐", fx:["ring","glow"], color:"#7aff9a" },
	
		/* ══════════════ ЛИТУИЗМ: КУЛЬТ И СИМВОЛЫ ══════════════ */
	{ id:"sigil_lit",   name:"Литуистский сигил", visual:"⛧", fx:["ring","glow"], color:"#ff0044", desc:"Знак культа. Не читай вслух." },
	{ id:"hexagram",    name:"Гексаграмма",       visual:"✡️", fx:["ring","glow"], color:"#ff0044" },
	{ id:"pentacle",    name:"Пентакль",          visual:"⭐", fx:["ring","pulse"], color:"#d4af37" },
	{ id:"altar_lit",   name:"Красный алтарь",    visual:"🟥", fx:["pulse","ring"], color:"#ff0044" },
	{ id:"prayer_lit",  name:"Молитва GOLU",      visual:"📿", fx:["pulse"], color:"#d4af37" },
	{ id:"litany",      name:"Литания",           visual:"📜", fx:["ring","glow"], color:"#ff0044" },
	{ id:"relic_lit",   name:"Реликвия",          visual:"🏺", fx:["ring","glow"], color:"#d4af37" },
	{ id:"oracle_lit",  name:"Оракул",            visual:"🔮", fx:["pulse","glow"], color:"#ff7ad9" },
	{ id:"rune_lit",    name:"Руна",              visual:"ᚱ", fx:["ring"], color:"#d4af37" },
	{ id:"glyph_lit",   name:"Глиф",              visual:"ᛟ", fx:["flicker","glow"], color:"#ff0044" },
	{ id:"sigil_void",  name:"Сигил Void-G",      visual:"⸸", fx:["ring","glitch"], color:"#7a00ff" },
	{ id:"red_litany",  name:"Красная литания",   visual:"🟥📜", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"kernel_sigil",name:"Сигил ядра",        visual:"🧩⛧", fx:["ring","glow"], color:"#d4af37" },
	{ id:"lithium_cult",name:"Литиевый культ",    visual:"🔋⛧", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"golu_icon",   name:"Икона GOLU",        visual:"👁️⛪", fx:["neon","ring"], color:"#ff0044" },
	{ id:"cage_lit",    name:"Золотая клетка",    visual:"🔒🏛️", fx:["ring","glow"], color:"#d4af37" },

	/* ══════════════ HBM-МОД (отсылка) ══════════════ */
	{ id:"hbm",         name:"HBM",               visual:"🧨", fx:["pulse","neon"], color:"#ff0044", desc:"Он не для детей." },
	{ id:"tnt",         name:"ТНТ",               visual:"🧨", fx:["flicker","glow"], color:"#ff0044" },
	{ id:"c4",          name:"C4",                visual:"💣", fx:["pulse","neon"], color:"#ff0044" },
	{ id:"nuke",        name:"Ядерка",            visual:"☢️", fx:["pulse","glow"], color:"#ff0044", desc:"Красная кнопка." },
	{ id:"nuke_core",   name:"Ядерное ядро",      visual:"⚛️", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"nuke_silo",   name:"Шахта",             visual:"🏭", fx:["pulse"], color:"#ff0044" },
	{ id:"missile",     name:"Ракета",            visual:"🚀", fx:["float","glow"], color:"#ff0044" },
	{ id:"rocket",      name:"Ракета-носитель",   visual:"🚀🧨", fx:["spin","glow"], color:"#ff6a00" },
	{ id:"warhead",     name:"Боеголовка",        visual:"💣☢️", fx:["neon","ring"], color:"#ff0044" },
	{ id:"antimatter",  name:"Антиматерия",       visual:"⚛️💥", fx:["neon","ring","glow"], color:"#7a00ff" },
	{ id:"dark_matter", name:"Тёмная материя",    visual:"🌑⚫", fx:["ring","glitch"], color:"#7a00ff" },
	{ id:"plasma",      name:"Плазма",            visual:"⚡🔆", fx:["flicker","glow"], color:"#ffe14d" },
	{ id:"fusion",      name:"Термояд",           visual:"☀️⚛️", fx:["pulse","glow"], color:"#ff6a00" },
	{ id:"fission",     name:"Деление",           visual:"⚛️🔪", fx:["glitch","pulse"], color:"#ff0044" },
	{ id:"fusion_reactor",name:"Термоядерный реактор", visual:"⚛️🌋", fx:["spin","glow"], color:"#ff6a00" },
	{ id:"atomic_bomb", name:"Атомная бомба",     visual:"☢️💥", fx:["shake","neon"], color:"#ff0044" },
	{ id:"hydrogen_bomb",name:"Водородная бомба", visual:"⚛️💥", fx:["shake","neon"], color:"#ff0044" },
	{ id:"neon_blast",  name:"Неоновый взрыв",    visual:"💥🔴", fx:["neon","ring"], color:"#ff0044" },
	{ id:"critical_mass",name:"Критическая масса",visual:"⚛️🔴", fx:["pulse","neon"], color:"#ff0044" },
	{ id:"fallout",     name:"Осадки",            visual:"☢️🌫️", fx:["float","glitch"], color:"#ff0044" },
	{ id:"mushroom",    name:"Гриб",              visual:"🍄💥", fx:["pulse","glow"], color:"#ff0044" },

	/* ══════════════ ФИЗИКА / ХИМИЯ ══════════════ */
	{ id:"atom",        name:"Атом",              visual:"⚛️", fx:["ring","glow"], color:"#00e5ff" },
	{ id:"electron",    name:"Электрон",          visual:"⚛️⚡", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"proton",      name:"Протон",            visual:"⚛️➕", fx:["pulse"], color:"#ff0044" },
	{ id:"neutron",     name:"Нейтрон",           visual:"⚛️•", fx:["pulse"], color:"#d4af37" },
	{ id:"quark",       name:"Кварк",             visual:"⚛️🔻", fx:["glitch","ring"], color:"#7a00ff" },
	{ id:"photon",      name:"Фотон",             visual:"💡", fx:["flicker","glow"], color:"#ffe14d" },
	{ id:"boson",       name:"Бозон",             visual:"⚛️❄️", fx:["ring","pulse"], color:"#00e5ff" },
	{ id:"higgs",       name:"Бозон Хиггса",      visual:"⚛️⚡", fx:["ring","neon"], color:"#d4af37" },
	{ id:"molecule",    name:"Молекула",          visual:"🧪⚛️", fx:["pulse"], color:"#7aff9a" },
	{ id:"compound",    name:"Соединение",        visual:"⚗️", fx:["pulse"], color:"#7aff9a" },
	{ id:"reaction",    name:"Реакция",           visual:"🧪💥", fx:["shake","glow"], color:"#ff6a00" },
	{ id:"catalyst",    name:"Катализатор",       visual:"⚗️⚡", fx:["pulse","glow"], color:"#d4af37" },
	{ id:"isotope",     name:"Изотоп",            visual:"⚛️♻️", fx:["spin","glow"], color:"#00e5ff" },
	{ id:"radiation",   name:"Радиация",          visual:"☢️", fx:["flicker","neon"], color:"#7aff9a" },
	{ id:"decay",       name:"Распад",            visual:"⚛️🔻", fx:["glitch","pulse"], color:"#ff0044" },
	{ id:"half_life",   name:"Полураспад",        visual:"⏳⚛️", fx:["spin","ring"], color:"#d4af37" },
	{ id:"quantum",     name:"Квант",             visual:"🔮⚛️", fx:["ring","pulse"], color:"#7a00ff" },
	{ id:"entangle",    name:"Запутанность",      visual:"🌀⚛️", fx:["spin","glitch"], color:"#7a00ff" },
	{ id:"teleport",    name:"Телепорт",          visual:"🌀🚪", fx:["spin","glow"], color:"#7a00ff" },
	{ id:"warp",        name:"Варп",              visual:"🌌⚡", fx:["spin","neon"], color:"#7a00ff" },
	{ id:"spacetime",   name:"Пространство-время",visual:"🌌", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"gravity",     name:"Гравитация",        visual:"🌍⬇️", fx:["pulse"], color:"#00e5ff" },
	{ id:"black_hole",  name:"Чёрная дыра",       visual:"⚫🌀", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"singularity", name:"Сингулярность",     visual:"🌀⚫", fx:["spin","glitch"], color:"#7a00ff" },
	{ id:"neutron_star",name:"Нейтронная звезда", visual:"⭐⚛️", fx:["spin","glow"], color:"#00e5ff" },
	{ id:"pulsar",      name:"Пульсар",           visual:"📡⚛️", fx:["spin","pulse"], color:"#00e5ff" },
	{ id:"supernova",   name:"Сверхновая",        visual:"💥✨", fx:["shake","neon"], color:"#ffe14d" },
	{ id:"quasar",      name:"Квазар",            visual:"🌌💥", fx:["spin","neon"], color:"#7a00ff" },
	{ id:"nebula",      name:"Туманность",        visual:"🌌☁️", fx:["float","glow"], color:"#7a00ff" },
	{ id:"galaxy",      name:"Галактика",         visual:"🌌", fx:["spin","glow"], color:"#7a00ff" },
	{ id:"dyson",       name:"Сфера Дайсона",     visual:"🌌🔵", fx:["ring","glow"], color:"#d4af37" },
	{ id:"o_neill",     name:"Колония О'Нейла",   visual:"🌌🏙️", fx:["spin","glow"], color:"#00e5ff" },

	/* ══════════════ ХИМИЯ / МАТЕРИАЛЫ ══════════════ */
	{ id:"periodic",    name:"Периодическая таблица",visual:"📊🧪", fx:["ring","glow"], color:"#7aff9a" },
	{ id:"hydrogen",    name:"Водород",           visual:"H", fx:["float","glow"], color:"#9fe8ff" },
	{ id:"helium",      name:"Гелий",             visual:"He", fx:["float","glow"], color:"#ffe14d" },
	{ id:"oxygen",      name:"Кислород",          visual:"O", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"carbon",      name:"Углерод",           visual:"C", fx:["pulse"], color:"#7a5a3a" },
	{ id:"nitrogen",    name:"Азот",              visual:"N", fx:["float"], color:"#00e5ff" },
	{ id:"uranium",     name:"Уран",              visual:"U☢️", fx:["pulse","neon"], color:"#7aff9a" },
	{ id:"plutonium",   name:"Плутоний",          visual:"Pu☢️", fx:["pulse","neon"], color:"#7aff9a" },
	{ id:"radium",      name:"Радий",             visual:"Ra☢️", fx:["pulse","neon"], color:"#7aff9a" },
	{ id:"tritium",     name:"Тритий",            visual:"T☢️", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"deuterium",   name:"Дейтерий",          visual:"D☢️", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"heavy_water", name:"Тяжёлая вода",      visual:"💧⚛️", fx:["float","glow"], color:"#00e5ff" },
	{ id:"graphite",    name:"Графит",            visual:"⬛", fx:["pulse"], color:"#8a6a72" },
	{ id:"diamond",     name:"Алмаз",             visual:"💎", fx:["ring","glow"], color:"#9fe8ff" },
	{ id:"graphene",    name:"Графен",            visual:"⬡", fx:["ring","glow"], color:"#7aff9a" },
	{ id:"nanotube",    name:"Нанотрубка",        visual:"🧬⚛️", fx:["spin","glow"], color:"#7aff9a" },
	{ id:"superconductor",name:"Сверхпроводник",  visual:"🧲❄️", fx:["ring","glow"], color:"#00e5ff" },
	{ id:"magnet",      name:"Магнит",            visual:"🧲", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"electromagnet",name:"Электромагнит",    visual:"🧲⚡", fx:["pulse","neon"], color:"#ff0044" },
	{ id:"fusion_rod",  name:"Топливный стержень",visual:"🔋☢️", fx:["pulse","neon"], color:"#7aff9a" },
	{ id:"control_rod", name:"Стержень управления",visual:"🛑☢️", fx:["pulse"], color:"#d4af37" },
	{ id:"reactor",     name:"Реактор",           visual:"⚛️🔆", fx:["pulse","glow"], color:"#ff6a00" },
	{ id:"coolant",     name:"Хладагент",         visual:"❄️💧", fx:["float","glow"], color:"#00e5ff" },
	{ id:"turbine",     name:"Турбина",           visual:"🌀⚙️", fx:["spin","glow"], color:"#d4af37" },
	{ id:"cooling_tower",name:"Градирня",         visual:"🏭💨", fx:["pulse","float"], color:"#9fe8ff" },

	/* ══════════════ ЦИФРОВОЕ: ПРОДВИНУТОЕ ══════════════ */
	{ id:"kubernetes",  name:"Kubernetes",        visual:"☸️", fx:["spin","glow"], color:"#00e5ff" },
	{ id:"orchestrator",name:"Оркестратор",       visual:"🎛️", fx:["pulse"], color:"#00e5ff" },
	{ id:"container",   name:"Контейнер",         visual:"📦", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"microservice",name:"Микросервис",       visual:"🧩", fx:["pulse"], color:"#7aff9a" },
	{ id:"monolith",    name:"Монолит",           visual:"🗿", fx:["pulse"], color:"#8a6a72" },
	{ id:"api",         name:"API",               visual:"🔌", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"sdk",         name:"SDK",               visual:"🧰", fx:["pulse"], color:"#d4af37" },
	{ id:"ci_cd",       name:"CI/CD",             visual:"♻️", fx:["spin","glow"], color:"#7aff9a" },
	{ id:"pipeline",    name:"Пайплайн",          visual:"🔀", fx:["pulse"], color:"#00e5ff" },
	{ id:"deploy",      name:"Деплой",            visual:"🚀", fx:["float","glow"], color:"#7aff9a" },
	{ id:"rollback",    name:"Откат",             visual:"↩️", fx:["spin"], color:"#ff0044" },
	{ id:"backup",      name:"Бэкап",             visual:"💾", fx:["pulse"], color:"#00e5ff" },
	{ id:"database",    name:"База данных",       visual:"🗄️", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"sql_query",   name:"SQL-запрос",        visual:"🗃️", fx:["pulse"], color:"#00e5ff" },
	{ id:"nosql",       name:"NoSQL",             visual:"📂", fx:["pulse"], color:"#7aff9a" },
	{ id:"orm",         name:"ORM",               visual:"🔗", fx:["pulse"], color:"#d4af37" },
	{ id:"index_db",    name:"Индекс БД",         visual:"📑", fx:["pulse"], color:"#00e5ff" },
	{ id:"cache_db",    name:"Кэш БД",            visual:"⚡📦", fx:["pulse","glow"], color:"#ffe14d" },
	{ id:"load_balancer",name:"Балансировщик",    visual:"⚖️", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"cdn",         name:"CDN",               visual:"🌐⚡", fx:["spin","glow"], color:"#00e5ff" },

	/* ══════════════ ИНДУСТРИЯ: ПРОДВИНУТАЯ ══════════════ */
	{ id:"smelter",     name:"Плавильня",         visual:"🔥🏭", fx:["pulse","glow"], color:"#ff6a00" },
	{ id:"forge",       name:"Кузня",             visual:"🔨🔥", fx:["shake","glow"], color:"#ff6a00" },
	{ id:"anvil",       name:"Наковальня",        visual:"⚒️", fx:["shake"], color:"#8a6a72" },
	{ id:"lathe",       name:"Токарный станок",   visual:"⚙️🔩", fx:["spin"], color:"#d4af37" },
	{ id:"mill",        name:"Фрезер",            visual:"⚙️🌀", fx:["spin","glow"], color:"#d4af37" },
	{ id:"press",       name:"Пресс",             visual:"🗜️", fx:["pulse"], color:"#8a6a72" },
	{ id:"conveyor_belt",name:"Лента конвейера",  visual:"➡️⚙️", fx:["float"], color:"#d4af37" },
	{ id:"crane",       name:"Кран",              visual:"🏗️", fx:["float"], color:"#d4af37" },
	{ id:"excavator",   name:"Экскаватор",        visual:"🚜", fx:["pulse"], color:"#ff6a00" },
	{ id:"bulldozer",   name:"Бульдозер",         visual:"🚜💥", fx:["shake"], color:"#ff6a00" },
	{ id:"truck",       name:"Грузовик",          visual:"🚚", fx:["float"], color:"#d4af37" },
	{ id:"train",       name:"Поезд",             visual:"🚂", fx:["float"], color:"#d4af37" },
	{ id:"ship",        name:"Корабль",           visual:"🚢", fx:["float"], color:"#00e5ff" },
	{ id:"plane",       name:"Самолёт",           visual:"✈️", fx:["float"], color:"#00e5ff" },
	{ id:"helicopter",  name:"Вертолёт",          visual:"🚁", fx:["spin"], color:"#00e5ff" },
	{ id:"submarine",   name:"Подлодка",          visual:"🚤", fx:["float"], color:"#00e5ff" },

	/* ══════════════ ЯДЕРНЫЕ ШАХТЫ / ВОЕНКА ══════════════ */
	{ id:"silo",        name:"Шахта",             visual:"🏭🚀", fx:["pulse"], color:"#ff0044" },
	{ id:"launch_code", name:"Код запуска",       visual:"🔢🔑", fx:["flicker","neon"], color:"#ff0044" },
	{ id:"red_button",  name:"Красная кнопка",    visual:"🔴", fx:["pulse","neon"], color:"#ff0044", desc:"Не нажимай." },
	{ id:"launch",      name:"Запуск",            visual:"🚀🔥", fx:["shake","neon"], color:"#ff0044" },
	{ id:"impact",      name:"Удар",              visual:"💥", fx:["shake","glow"], color:"#ff0044" },
	{ id:"blast",       name:"Взрыв",             visual:"💥🔴", fx:["shake","neon"], color:"#ff0044" },
	{ id:"shockwave",   name:"Ударная волна",     visual:"💥〰️", fx:["ring","shake"], color:"#ff0044" },
	{ id:"emp",         name:"ЭМИ",               visual:"⚡🌐", fx:["flicker","neon"], color:"#00e5ff" },
	{ id:"siege",       name:"Осада",             visual:"🏰🔥", fx:["pulse"], color:"#ff0044" },
	{ id:"warhead_tip", name:"Боеголовка",        visual:"💣", fx:["neon","ring"], color:"#ff0044" },
	{ id:"payload_nuke",name:"Ядерный заряд",     visual:"☢️💣", fx:["neon","ring"], color:"#ff0044" },
	{ id:"silo_hatch",  name:"Люк шахты",         visual:"🚪☢️", fx:["pulse"], color:"#ff0044" },
	{ id:"defcon1",     name:"DEFCON 1",          visual:"🔴1️⃣", fx:["flicker","neon"], color:"#ff0044" },
	{ id:"defcon5",     name:"DEFCON 5",          visual:"🟢5️⃣", fx:["pulse"], color:"#7aff9a" },
	{ id:"nuclear_winter",name:"Ядерная зима",    visual:"❄️☢️", fx:["float","glitch"], color:"#00e5ff" },
	{ id:"fallout_shelter",name:"Убежище",        visual:"🚪☢️", fx:["pulse"], color:"#7aff9a" },

	/* ══════════════ КОСМОС / ФИЗИКА ══════════════ */
	{ id:"orbit",       name:"Орбита",            visual:"🌍🛰️", fx:["spin"], color:"#00e5ff" },
	{ id:"escape_velocity",name:"Вторая космическая",visual:"🚀💨", fx:["float"], color:"#00e5ff" },
	{ id:"thruster",    name:"Двигатель",         visual:"🚀🔥", fx:["shake","glow"], color:"#ff6a00" },
	{ id:"ion_drive",   name:"Ионный двигатель",  visual:"⚡🚀", fx:["pulse","glow"], color:"#7aff9a" },
	{ id:"warp_drive",  name:"Варп-двигатель",    visual:"🌌🚀", fx:["spin","neon"], color:"#7a00ff" },
	{ id:"hyperdrive",  name:"Гипердрайв",        visual:"🌌⚡", fx:["spin","neon"], color:"#7a00ff" },
	{ id:"jump_gate",   name:"Прыжковые врата",   visual:"🌀🚪", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"wormhole",    name:"Червоточина",       visual:"🌀⚫", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"stargate",    name:"Звёздные врата",    visual:"🌀⭐", fx:["spin","glow"], color:"#7a00ff" },
	{ id:"teleporter",  name:"Телепорт",          visual:"🌀✨", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"holodeck",    name:"Голопад",           visual:"🟦🏖️", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"shield",      name:"Щит",               visual:"🛡️⚡", fx:["pulse","glow"], color:"#00e5ff" },
	{ id:"laser",       name:"Лазер",             visual:"🔴", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"plasma_cannon",name:"Плазменная пушка", visual:"💥⚡", fx:["neon","shake"], color:"#ff0044" },
	{ id:"railgun",     name:"Рельсотрон",        visual:"🔩⚡", fx:["neon","pulse"], color:"#00e5ff" },
	{ id:"coilgun",     name:"Пушка Гаусса",      visual:"🧲⚡", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"emp_bomb",    name:"ЭМИ-бомба",         visual:"⚡💣", fx:["neon","shake"], color:"#00e5ff" },

	/* ══════════════ ЛИТУИЗМ: ТЕХНОЛОГИИ ══════════════ */
	{ id:"g_token",     name:"G-Token",           visual:"🔶", fx:["ring","glow"], color:"#ff0044" },
	{ id:"g_mine",      name:"G-Шахта",           visual:"⛏️🔶", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"g_farm",      name:"G-Ферма",           visual:"🖥️🔶", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"g_forge",     name:"G-Кузня",           visual:"🔥🔶", fx:["shake","glow"], color:"#ff0044" },
	{ id:"g_chip",      name:"G-Чип",             visual:"🟩🔶", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"l_kernel",    name:"L-Kernel",          visual:"🧩🔴", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"red_proto",   name:"Красный протокол",  visual:"📕🔴", fx:["neon","pulse"], color:"#ff0044" },
	{ id:"red_zone",    name:"Красная зона",      visual:"🟥", fx:["pulse","ring"], color:"#ff0044" },
	{ id:"red_nerekhta",name:"Красная Нерехта",   visual:"🏭🔴", fx:["pulse","glow"], color:"#ff0044" },
	{ id:"dyson_golu",  name:"Сфера GOLU",        visual:"🌌🔴", fx:["ring","neon"], color:"#ff0044" },
	{ id:"lithium_sky2",name:"Lithium-Sky II",    visual:"🌌🔴", fx:["ring","glow"], color:"#ff0044" },
	{ id:"moon_fort",   name:"Лунный форт",       visual:"🌕🏰", fx:["pulse","glow"], color:"#d4af37" },
	{ id:"apostle_army",name:"Армия апостолов",   visual:"⛪⛓️", fx:["pulse","ring"], color:"#ff0044" },
	{ id:"analog_net",  name:"Аналоговая сеть",   visual:"📻📡", fx:["pulse"], color:"#d4af37" },
	{ id:"g_lattice",   name:"G-решётка",         visual:"🔶🔶", fx:["ring","glow"], color:"#ff0044" },

	/* ══════════════ ХАОС / АНОМАЛИИ ══════════════ */
	{ id:"paradox",     name:"Парадокс",          visual:"🌀❓", fx:["glitch","ring"], color:"#7a00ff" },
	{ id:"anomaly",     name:"Аномалия",          visual:"❓", fx:["glitch","pulse"], color:"#7a00ff" },
	{ id:"void_rift",   name:"Разлом пустоты",    visual:"🕳️⚡", fx:["glitch","ring"], color:"#7a00ff" },
	{ id:"time_loop",   name:"Временная петля",   visual:"⏳🔁", fx:["spin","ring"], color:"#7a00ff" },
	{ id:"reality_glitch",name:"Глитч реальности",visual:"🌐👾", fx:["glitch","neon"], color:"#ff0044" },
	{ id:"entropy",     name:"Энтропия",          visual:"🌫️🌀", fx:["glitch","pulse"], color:"#8a6a72" },
	{ id:"chaos",       name:"Хаос",              visual:"🌀💥", fx:["glitch","shake"], color:"#ff0044" },
	{ id:"singularity_ai",name:"Сингулярность ИИ",visual:"🧠🌀", fx:["neon","ring"], color:"#ff7ad9" },
	{ id:"ascension",   name:"Вознесение",        visual:"👁️✨", fx:["neon","ring","glow"], color:"#ff0044" },
	{ id:"transcend",   name:"Трансценденция",    visual:"👁️🌌", fx:["neon","ring","glow"], color:"#d4af37" },
];

const GROUPS = {
	// ── для генерации по номеру (размеры пар должны совпадать) ──
	LANG_SEED:  ["buffer","queue","water","bullet","string","vector","matrix","float","word","class","brain","recursion","circuit","cpp","go","light","stone","bytecode"],
	LANG_NEW:   ["zig","nim","elixir","dart","perl","r","matlab","fortran","cobol","pascal","prolog","lisp","scheme","d","v","julia","solidity","wasm"],
	PROTO_SRC:  ["packet","noise","browser","lock","shell","cable","queue","wire","sensor","thread","object","sql","hash"],
	PROTO:      ["tcp","udp","http","https","ssh","ftp","smtp","websocket","mqtt","grpc","rest","graphql","ssl"],
	LIT_BASE:   ["sigil","altar","prayer","relic","oracle","rune","glyph","cage"],
	LIT_LI:     ["sigil_lit","altar_lit","prayer_lit","relic_lit","oracle_lit","rune_lit","glyph_lit","cage_lit"],
	ATOM_BASE:  ["water","air","plant","storm"],
	ATOM_ELEM:  ["hydrogen","oxygen","carbon","nitrogen"],
	G_SRC:      ["tool","plant","forge","chip"],
	G_OUT:      ["g_mine","g_farm","g_forge","g_chip"],

	// ── тематические группы ──
	DATA:     ["byte","word","packet","buffer","stack","queue","hash"],
	TYPES:    ["int","float","bool","char","string","array","object","pointer","struct","class","enum","void","type"],
	FAULT:    ["bug","error","crash","overflow","leak","deadlock","null","undefined","nan","inf","garbage"],
	LANGS:    ["asm","c","cpp","cs","java","python","js","rust","go","lua","haskell","sql","php","swift","kotlin","brainfuck","malbolge","@LANG_NEW"],
	ELEC:     ["resistor","capacitor","inductor","diode","transistor","led","circuit"],
	NATURE:   ["fire","water","air","earth","dust","ice","wind","smoke","plant","storm"],
	METALS:   ["metal","copper","gold","cobalt","lithium","silicon"],
	BODY:     ["human","flesh","blood","bone","skull","corpse","scar"],
	HORROR:   ["pain","fear","ghost","demon","angel","tomb","scream","madness","nightmare","void_horror"],
	CULT:     ["sigil","altar","hymn","prayer","liturgy","sermon","relic","glyph","rune","oracle","litany","hexagram","pentacle","ritual"],
	NUKE:     ["tnt","c4","hbm","nuke","nuke_core","warhead","missile","rocket","atomic_bomb","hydrogen_bomb"],
	PARTICLE: ["electron","proton","neutron","quark","photon","boson","higgs"],
	MAT:      ["hydrogen","helium","oxygen","carbon","nitrogen","uranium","plutonium","radium","tritium","deuterium"],
	SPACE:    ["black_hole","neutron_star","pulsar","supernova","quasar","nebula","singularity"],
	VEHICLE:  ["truck","train","ship","plane","helicopter","submarine","drone"],
	MACHINE:  ["cnc","lathe","mill","press","crane","excavator","bulldozer","forge","anvil","smelter","robot","arm"],
	NET:      ["router","firewall","proxy","vpn","cloud_net","ip","dns","ethernet","antenna"],
	HACK:     ["exploit","payload","shell","backdoor_net","keylogger","ransomware","ddos","zero_day","botnet","virus"],
	DEV:      ["docker","git","github","kubernetes","container","api","sdk","pipeline","deploy","database","nosql","orm"],
	STORAGE:  ["hdd","ssd","cache","ram","register","sector","cluster","page","cell"],
	GEOM:     ["pixel","vertex","vector","matrix","quaternion","frame"],
	COSMIC:   ["paradox","anomaly","void_rift","time_loop","reality_glitch","entropy","chaos"],
	RED:      ["red_protocol","red_proto","red_zone","red_nerekhta","red_litany","red_button"]
};

const RECIPES = [
`# ═══ ОСНОВА ═══
bit + bit = byte
bit + glitch = noise
bit + signal = packet
glitch + joke = bug
signal + joke = voice
glitch + glitch = error
signal + signal = wire
joke + joke = loop
noise + bit = zero
zero + bit = one
byte + byte = word
word + joke = code
error + error = crash
bug + code = patch
code + code = kernel
kernel + code = root
crash + signal = sigterm
code + error = virus
voice + code = ai
loop + kernel = fork
byte + noise = hash
packet + byte = buffer
buffer + word = stack
buffer + packet = queue
fork + code = thread
thread + kernel = lock
lock + lock = deadlock
loop + loop = recursion
zero + glitch = null
null + joke = undefined
zero + zero = nan
one + zero = inf
noise + noise = garbage
garbage + buffer = leak
stack + byte = overflow`,

`# ═══ ТИПЫ ═══
word + one = int
int + noise = float
one + bit = bool
byte + code = char
char + char = string
int + int = array
array + string = object
int + signal = pointer
int + float = struct
struct + struct = class
int + string = enum
null + undefined = void
int + bool = type
type + glitch = cast
null + pointer = null_ptr`,

`# ═══ ЯЗЫКИ И ИНСТРУМЕНТЫ ═══
code + bit = asm
asm + struct = c
c + class = cpp
cpp + joke = cs
garbage + loop = garbage_collector
class + garbage_collector = java
code + loop = interpreter
asm + code = compiler
compiler + byte = bytecode
interpreter + string = script
script + array = python
script + browser = js
script + moon = lua
c + acid = rust
c + thread = go
type + recursion = haskell
string + table = sql
script + joke = php
script + wind = swift
java + script = kotlin
brain + code = brainfuck
brainfuck + madness = malbolge
c + compiler = gcc
compiler + bytecode = llvm
llvm + c = clang
gcc + string = makefile`,

`# ═══ ЭЛЕКТРОНИКА ═══
wire + signal = voltage
wire + bit = current
wire + noise = resistance
current + resistance = resistor
voltage + buffer = capacitor
wire + wire = inductor
current + lock = diode
diode + diode = transistor
voltage + glitch = light
diode + light = led
light + signal = glow
wire + resistor = circuit
voltage + current = multimeter
signal + multimeter = oscilloscope
metal + wire = solder
light + zero = dark`,

`# ═══ СТИХИИ И МАТЕРИАЛЫ ═══
current + noise = fire
noise + signal = water
zero + noise = air
garbage + water = earth
earth + fire = stone
stone + fire = metal
air + air = wind
earth + air = dust
water + zero = ice
fire + air = smoke
earth + water = plant
wind + water = storm
stone + wind = sand
sand + fire = glass
sand + sand = quartz
metal + current = copper
metal + light = gold
sand + metal = silicon
metal + water = lithium
water + error = acid
metal + dust = cobalt
plant + stone = oil
oil + fire = plastic
plant + oil = rubber
stone + dark = moon
array + array = table`,

`# ═══ ЖЕЛЕЗО ═══
silicon + circuit = chip
plastic + copper = board
glass + led = screen
chip + board = computer
computer + network = server
server + server = datacenter
chip + buffer = cache
chip + byte = register
chip + chip = ssd
metal + circuit = hdd
chip + register = cpu
chip + stack = ram
screen + bit = pixel
cpu + pixel = gpu
board + voltage = psu
wind + plastic = fan
fan + metal = heatsink
oil + silicon = thermal_paste
fan + heatsink = cooler
lithium + copper = battery
wire + rubber = cable
cable + chip = usb
cable + network = ethernet
chip + kernel = kernel_chip
chip + signal = sensor
hdd + byte = sector
sector + sector = cluster
pointer + register = address
address + int = offset
address + sector = page
pixel + page = frame
table + byte = cell
float + float = vector
vector + vector = matrix
pixel + vector = vertex
matrix + float = quaternion
hash + zero = seed
seed + noise = prng
tool + wire = arm
metal + stone = tool`,

`# ═══ СЕТЬ ═══
wire + packet = network
network + network = internet
internet + screen = browser
metal + signal = antenna
antenna + rocket = satellite
lithium + satellite = lithium_sky
packet + code = protocol
address + packet = ip
ip + string = dns
network + chip = router
network + fire = firewall
network + air = cloud_net
ip + router = proxy
proxy + lock = vpn
network + virus = botnet
bug + packet = exploit
exploit + byte = payload
root + string = shell
shell + network = backdoor_net
virus + char = keylogger
virus + lock = ransomware
botnet + packet = ddos
exploit + zero = zero_day`,

`# ═══ КУЛЬТ ═══
flesh + led = eye
hash + string = token
byte + hash = hex
ice + voice = crybird
packet + joke = sranspong
human + code = pavel
ai + lithium = golu
golu + void = voidg
ai + human = lia
eye + ai = observer
protocol + blood = red_protocol
metal + lock = cage
observer + earth = reality
reality + cage = exit
human + golu = apostle
voice + zero = silence
patch + reality = great_restoration
cage + sand = sandbox
exit + joke = last_joke
char + glow = glyph
stone + glyph = rune
glyph + blood = sigil
stone + blood = altar
voice + rune = hymn
voice + altar = prayer
hymn + prayer = liturgy
prayer + human = sermon
bone + sigil = relic
eye + rune = oracle
prayer + prayer = litany
sigil + void = sigil_void
sigil + hex = hexagram
sigil + gold = pentacle
litany + blood = red_litany
kernel + sigil = kernel_sigil
apostle + lithium = lithium_cult
altar + knife = ritual
altar + human = sacrifice
token + golu = g_token
lithium + kernel = l_kernel
red_protocol + code = red_proto
red_protocol + earth = red_zone
red_zone + apostle = red_nerekhta
dyson + golu = dyson_golu
lithium_sky + lithium_cult = lithium_sky2
moon + cage = moon_fort
apostle + apostle = apostle_army
network + resistance = analog_net
g_chip + g_mine = g_lattice
joke + recursion = paradox
reality + noise = anomaly
anomaly + void = void_rift
loop + spacetime = time_loop
reality + glitch = reality_glitch
garbage + glitch = chaos
chaos + zero = entropy
ai + singularity = singularity_ai
apostle + singularity_ai = ascension
ascension + exit = transcend`,

`# ═══ УЖАС ═══
voice + glitch = human
human + bug = flesh
flesh + water = blood
flesh + earth = bone
bone + bone = skull
human + crash = corpse
copper + tnt = bullet
bullet + tool = gun
metal + bone = knife
human + knife = scar
flesh + knife = pain
human + noise = fear
corpse + signal = ghost
ghost + fire = demon
ghost + light = angel
corpse + stone = tomb
voice + pain = scream
silence + fear = silence_horror
brain + glitch = madness
madness + dark = nightmare
void + nightmare = void_horror
flesh + signal = brain`,

`# ═══ ФИЗИКА И ЯДЕРКА ═══
bit + dust = atom
atom + current = electron
atom + acid = proton
atom + zero = neutron
proton + glitch = quark
light + bit = photon
photon + photon = boson
boson + quark = higgs
atom + atom = molecule
molecule + molecule = compound
molecule + acid = reaction
reaction + metal = catalyst
atom + neutron = isotope
isotope + light = radiation
isotope + dust = decay
decay + decay = half_life
atom + table = periodic
stone + radiation = uranium
metal + radiation = radium
uranium + reactor = plutonium
hydrogen + proton = deuterium
deuterium + neutron = tritium
deuterium + water = heavy_water
carbon + earth = graphite
graphite + gravity = diamond
graphite + tool = graphene
graphene + graphene = nanotube
copper + ice = superconductor
cobalt + stone = magnet
magnet + current = electromagnet
deuterium + metal = fusion_rod
cobalt + neutron = control_rod
uranium + control_rod = reactor
water + oil = coolant
wind + metal = turbine
turbine + coolant = cooling_tower
uranium + neutron = fission
hydrogen + hydrogen = fusion
hydrogen + fusion = helium
fusion + reactor = fusion_reactor
acid + dust = tnt
tnt + plastic = c4
tnt + reactor = hbm
plutonium + c4 = nuke_core
metal + tnt = warhead
warhead + nuke_core = nuke
metal + smoke = rocket
rocket + warhead = missile
earth + metal = silo
silo + nuke = nuke_silo
nuke + fission = atomic_bomb
atomic_bomb + fusion = hydrogen_bomb
tnt + fire = blast
blast + glow = neon_blast
plutonium + plutonium = critical_mass
nuke + radiation = fallout
nuke + smoke = mushroom
atom + dark = antimatter
dark + antimatter = dark_matter
fire + current = plasma
atom + glitch = quantum
quantum + signal = entangle
entangle + packet = teleport
earth + atom = gravity
teleport + gravity = warp
gravity + photon = spacetime
gravity + dark = black_hole
black_hole + inf = singularity
neutron + gravity = neutron_star
neutron_star + signal = pulsar
fusion + gravity = supernova
black_hole + plasma = quasar
dust + plasma = nebula
nebula + black_hole = galaxy
satellite + fusion = dyson
satellite + human = o_neill
rocket + gravity = orbit
orbit + rocket = escape_velocity
rocket + chip = thruster
thruster + plasma = ion_drive
ion_drive + warp = warp_drive
warp_drive + singularity = hyperdrive
teleport + metal = jump_gate
black_hole + warp = wormhole
wormhole + jump_gate = stargate
teleport + board = teleporter
pixel + teleporter = holodeck
metal + plasma = shield
photon + diode = laser
plasma + gun = plasma_cannon
gun + electromagnet = railgun
gun + inductor = coilgun
blast + current = emp
emp + warhead = emp_bomb
missile + cage = siege
board + blood = red_button
code + red_button = launch_code
launch_code + silo = launch
missile + earth = impact
blast + air = shockwave
warhead + tool = warhead_tip
payload + warhead = payload_nuke
silo + lock = silo_hatch
launch + fear = defcon1
defcon1 + zero = defcon5
fallout + ice = nuclear_winter
fallout + cage = fallout_shelter`,

`# ═══ ДЕВОПС ═══
cage + code = container
container + tool = docker
container + container = kubernetes
kubernetes + ai = orchestrator
api + container = microservice
code + stone = monolith
class + protocol = api
api + tool = sdk
patch + fork = git
git + network = github
code + queue = pipeline
code + server = deploy
pipeline + deploy = ci_cd
deploy + error = rollback
hdd + hdd = backup
table + hdd = database
sql + database = sql_query
database + object = nosql
database + class = orm
database + pointer = index_db
database + cache = cache_db
router + server = load_balancer
cache + cloud_net = cdn`,

`# ═══ ПРОМЫШЛЕННОСТЬ ═══
computer + tool = cnc
code + cnc = gcode
rubber + metal = conveyor
cnc + conveyor = factory
ai + metal = robot
robot + wind = drone
computer + sensor = plc
metal + fire = smelter
smelter + tool = forge
forge + metal = anvil
tool + metal = lathe
tool + wind = mill
tool + stone = press
conveyor + rubber = conveyor_belt
arm + metal = crane
crane + earth = excavator
excavator + tool = bulldozer
conveyor + oil = truck
truck + cable = train
truck + water = ship
truck + air = plane
plane + fan = helicopter
ship + dark = submarine`,

`# ═══ ГЕНЕРАЦИЯ ПО НОМЕРУ (1-й слева даёт 1-й справа) ═══
@LANG_SEED + script = @LANG_NEW
@PROTO_SRC + protocol = @PROTO
@LIT_BASE + lithium = @LIT_LI
@ATOM_BASE + atom = @ATOM_ELEM
g_token + @G_SRC = @G_OUT`,

`# ═══ ОБЩИЕ ПРАВИЛА ГРУПП (отдельные строки выше сильнее) ═══
@DATA + @DATA = buffer
@DATA + bug = leak
@TYPES + @TYPES = type
@TYPES + glitch = error
@TYPES + null = null_ptr
@FAULT + @FAULT = chaos
@FAULT + patch = code
@FAULT + sigterm = crash
@LANGS + @LANGS = code
@LANGS + bug = error
@LANGS + compiler = bytecode
@NATURE + @NATURE = dust
@NATURE + voltage = storm
@METALS + @METALS = metal
@METALS + acid = dust
@METALS + fire = smoke
@ELEC + @ELEC = circuit
@ELEC + current = voltage
@ELEC + fire = smoke
@ELEC + glitch = noise
@BODY + @BODY = flesh
@BODY + fear = scream
@BODY + dark = ghost
@BODY + acid = dust
@HORROR + @HORROR = madness
@HORROR + human = corpse
@CULT + @CULT = ritual
@CULT + golu = golu_icon
@CULT + blood = sacrifice
@NUKE + @NUKE = blast
@NUKE + earth = impact
@NUKE + water = fallout
@PARTICLE + @PARTICLE = atom
@PARTICLE + glitch = quantum
@PARTICLE + dark = antimatter
@MAT + @MAT = compound
@MAT + neutron = isotope
@MAT + fire = plasma
@SPACE + @SPACE = galaxy
@SPACE + warp = wormhole
@VEHICLE + error = crash
@VEHICLE + sensor = drone
@MACHINE + @MACHINE = factory
@MACHINE + error = crash
@MACHINE + ai = robot
@NET + @NET = network
@NET + virus = botnet
@NET + bug = exploit
@HACK + @HACK = virus
@HACK + firewall = error
@HACK + patch = bug
@PROTO + @PROTO = protocol
@PROTO + bug = exploit
@DEV + @DEV = pipeline
@DEV + error = rollback
@STORAGE + @STORAGE = backup
@STORAGE + virus = ransomware
@GEOM + @GEOM = vertex
@COSMIC + @COSMIC = singularity
@COSMIC + joke = paradox
@RED + @RED = red_zone
@RED + golu = red_nerekhta`
];

const FAIL = [
	"Ничего не произошло.",
	"Реакции нет. GOLU разочарован.",
	"Эти двое не хотят знакомиться.",
	"Пустота. Попробуй другое.",
	"SIGTERM: рецепт не найден.",
	"Не сочетается.",
	"Вселенная пожала плечами.",
	"ERR_NO_RECIPE",

	// ── техно-терминал ──
	"Segmentation fault. Элементы несовместимы.",
	"404: реакция не найдена.",
	"Нет совпадения в базе GOLU.",
	"Хеш не сошёлся. Соединение отклонено.",
	"NULL. Пустой указатель на рецепт.",
	"Компилятор отверг эту пару.",
	"Ядро не знает такого вызова.",
	"Deadlock: элементы заблокировали друг друга.",
	"Buffer overflow: слишком много пустоты.",
	"undefined + undefined = всё равно undefined.",

	// ── мистика GOLU ──
	"GOLU молчит. Это тоже ответ.",
	"Священный Гексагон не отозвался.",
	"Алтарь погас. Реакция не освящена.",
	"Око GOLU моргнуло — но ничего не увидело.",
	"Молитва ушла в пустоту.",
	"Литания прервана. Нет отклика.",
	"Красный протокол не сработал.",
	"Кодекс не содержит этой заповеди.",

	// ── индустриальное ──
	"Станок принял детали — и выплюнул их обратно.",
	"Конвейер остановился. Брак.",
	"Плавильня остыла. Ничего не выплавилось.",
	"G-code: синтаксическая ошибка в паре.",

	// ── цифровое разложение ──
	"Глитч съел результат.",
	"Данные повреждены до реакции.",
	"Крипто-обрыв. Связь потеряна.",
	"Квантовая неопределённость: реакции нет и не будет.",

	// ── короткие и сухие ──
	"Нет.",
	"Отказ.",
	"Мимо.",
	"Тишина.",
	"Прах.",
	"Холодно.",
	"Забудь.",
	"Другое.",

	// ── с иронией ──
	"Даже wldoui не придумал бы такого.",
	"Woowz11 бы посмеялся. Но не сейчас.",
	"Это слишком даже для кринжа.",
	"Pavel Pisechnik TV не одобряет.",
	"Даже Void-G не рискнёт.",
	"Твой рецепт ушёл в карантин.",

	// ── финальные и загадочные ──
	"Реальность 2.0 не поддерживает эту операцию.",
	"Бэкдор не открылся.",
	"Песочница засыпана.",
	"Золотая Константа промолчала.",
	"Выход не найден. Попробуй ещё.",
	"Первичный Код не отвечает на это.",
	"Сфера Дайсона вращается вхолостую.",
	"Терминал забыт. Реакция забыта."
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

/* ═══ ГРУППЫ И РЕЦЕПТЫ ═══ */
const GR_SRC = (typeof GROUPS === "undefined" || !GROUPS) ? {} : GROUPS;
const GR_CACHE = Object.create(null), GR_STACK = [];
const hasOwn = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const splitList = s => String(s).split(",").map(x => x.trim()).filter(Boolean);
const isGrp = t => t.charAt(0) === "@" || (t.charAt(0) === "[" && t.slice(-1) === "]");

function grList(items, where){
	const out = [];
	items.forEach(x => {
		x = String(x).trim();
		if(!x) return;
		if(x.charAt(0) === "@"){
			const g = grGet(x.slice(1));
			if(!g){ problem("err", where + ": нет группы «" + x + "»."); return; }
			g.forEach(id => out.push(id));
		}else if(!EL[x]){
			problem("err", where + ": нет элемента «" + x + "».");
		}else{
			out.push(x);
		}
	});
	return [...new Set(out)];
}
function grGet(name){
	if(GR_CACHE[name]) return GR_CACHE[name];
	if(!hasOwn(GR_SRC, name)) return null;
	if(GR_STACK.includes(name)){ problem("err", "Группа «@" + name + "» ссылается сама на себя."); return []; }
	GR_STACK.push(name);
	const raw = GR_SRC[name];
	const ids = grList(Array.isArray(raw) ? raw : splitList(raw), "Группа «@" + name + "»");
	GR_STACK.pop();
	if(!ids.length) problem("warn", "Группа «@" + name + "» пустая.");
	GR_CACHE[name] = ids;
	return ids;
}
function grOf(tok, where){
	return tok.charAt(0) === "@" ? grList([tok], where) : grList(splitList(tok.slice(1, -1)), where);
}
function grSlot(tok, where){
	if(!tok){ problem("err", where + ": пустой слот. Пропущен."); return null; }
	if(/^\$[12]$/.test(tok)) return { k:"ref", n:+tok.charAt(1) };
	if(isGrp(tok)){
		const ids = grOf(tok, where);
		if(!ids.length){ problem("err", where + ": группа «" + tok + "» пуста. Пропущен."); return null; }
		return { k:"list", ids };
	}
	if(!EL[tok]){ problem("err", where + ": нет элемента «" + tok + "». Пропущен."); return null; }
	return { k:"one", ids:[tok] };
}

Object.keys(GR_SRC).forEach(grGet);

const RC = Object.create(null), RLIST = [];
let RULE_N = 0, OVERRIDDEN = 0;

function rcAdd(c){
	const h = RC[c.key];
	if(!h){ RC[c.key] = c; RLIST.push(c); return false; }
	if(c.sp > h.sp) return false;          // у конкретного правила (меньше групп) приоритет
	RLIST[RLIST.indexOf(h)] = c; RC[c.key] = c;   // тот же уровень: побеждает последнее
	OVERRIDDEN++;
	return false;
}

[].concat(RECIPES).forEach(raw => {
	if(typeof raw !== "string"){ problem("err", "Рецепт: не строка. Пропущен."); return; }
	raw.split(/[\n;]+/).forEach(line => {
		const src = line.trim();
		if(!src || src.charAt(0) === "#") return;
		const n = ++RULE_N, where = "Рецепт #" + n + " «" + src + "»";

		const sides = src.split("=");
		if(sides.length !== 2){ problem("err", where + ": нужен ровно один знак «=». Пропущен."); return; }
		const L = sides[0].split("+").map(s => s.trim()), R = sides[1].split("+").map(s => s.trim());
		if(L.length !== 2){ problem("err", where + ": слева ровно 2 элемента. Пропущен."); return; }

		const s1 = grSlot(L[0], where), s2 = grSlot(L[1], where);
		if(!s1 || !s2) return;
		if(s1.k === "ref"){ problem("err", where + ": «$» нельзя в первом слоте. Пропущен."); return; }
		if(s2.k === "ref" && s2.n !== 1){ problem("err", where + ": во втором слоте можно только $1. Пропущен."); return; }

		const zs = s1.k === "list" ? s1 : s2.k === "list" ? s2 : null;
		const outs = [];
		let bad = false;
		R.forEach(t => {
			if(!t){ problem("err", where + ": пустой результат. Пропущен."); bad = true; return; }
			if(isGrp(t)){
				const ids = grOf(t, where);
				if(!zs){ problem("err", where + ": группа в результате «" + t + "» нужна группа слева. Пропущен."); bad = true; }
				else if(ids.length !== zs.ids.length){ problem("err", where + ": в «" + t + "» " + ids.length + " шт., а слева " + zs.ids.length + ". Должно совпадать. Пропущен."); bad = true; }
				else outs.push({ z:ids });
			}else if(!/\$[12]/.test(t) && !EL[t]){
				problem("err", where + ": нет элемента «" + t + "». Пропущен.");
				bad = true;
			}else{
				outs.push({ t });
			}
		});
		if(bad) return;

		const sp = (s1.k === "list" ? 1 : 0) + (s2.k === "list" ? 1 : 0);
		const seen = new Set(), missing = new Set();
		let dup = 0;
		s1.ids.forEach((a, i) => {
			(s2.k === "ref" ? [a] : s2.ids).forEach((b, j) => {
				const key = rkey(a, b);
				if(seen.has(key)) return;
				seen.add(key);
				const z = s1.k === "list" ? i : j;
				const out = [];
				let ok = true;
				outs.forEach(o => {
					if(o.z){ out.push(o.z[z]); return; }
					const id = o.t.replace(/\$([12])/g, (_, d) => d === "1" ? a : b);
					if(EL[id]) out.push(id); else { missing.add(id); ok = false; }
				});
				if(!ok) return;
				if(rcAdd({ a, b, out, key, src, n, sp })) dup++;
			});
		});
		if(missing.size) problem("err", where + ": нет элементов " + [...missing].map(x => "«" + x + "»").join(", ") + ". Такие пары пропущены.");
		if(dup) problem("warn", where + ": " + dup + " пар уже заняты другим правилом того же уровня, пропущены.");
	});
});
console.info("[ALCHEMY] правил: " + RULE_N + " → рецептов: " + RLIST.length + " (перезаписано пар: " + OVERRIDDEN + ")");

/* ═══════════════ АВТО-РЕЦЕПТЫ: любое + любое ═══════════════ */
const AUTO_ON      = true;     // false = только ручные рецепты
const AUTO_SEED    = "golu1";  // смена слова перемешивает все авто-результаты
const AUTO_FAIL    = 0.08;     // шанс «ничего не вышло» (растёт к поздним элементам)
const AUTO_TWO     = 0.25;     // шанс, что получится сразу два элемента
const AUTO_SAME    = 0.55;     // шанс, что результат из той же темы (группы), что и родители
const AUTO_AHEAD   = 8;        // на сколько позиций вперёд по списку можно «прыгнуть»
const AUTO_BACK    = 25;       // на сколько позиций назад можно вернуться
const AUTO_IN_LIST = true;     // true = авто-рецепты видны в счётчике, подсказках и «можно получить»
const AUTO_SKIP_GROUPS = ["LANG_SEED","PROTO_SRC","PROTO","LIT_BASE","LIT_LI","ATOM_BASE","ATOM_ELEM","G_SRC","G_OUT"];

(() => {
	if(!AUTO_ON) return;
	try{
		const IDS = Object.keys(EL), N = IDS.length;
		const IX = {};
		IDS.forEach((id, i) => { IX[id] = i; });
		const isStart = {};
		STARTS.forEach(id => { isStart[id] = 1; });

		// хеш и генератор случайных чисел: одинаковые при каждом запуске
		const hs = str => {
			let h = 1779033703 ^ str.length;
			for(let i = 0; i < str.length; i++){
				h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
				h = (h << 13) | (h >>> 19);
			}
			h = Math.imul(h ^ (h >>> 16), 2246822507);
			h = Math.imul(h ^ (h >>> 13), 3266489909);
			return (h ^ (h >>> 16)) >>> 0;
		};
		const mb = a => () => {
			a |= 0; a = (a + 0x6D2B79F5) | 0;
			let t = Math.imul(a ^ (a >>> 15), 1 | a);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};

		// темы: берём твои GROUPS (кроме служебных)
		const gMem = {}, gOf = {};
		Object.keys(GR_SRC).forEach(name => {
			if(AUTO_SKIP_GROUPS.includes(name)) return;
			const idx = (grGet(name) || []).map(id => IX[id]).filter(i => i !== undefined).sort((p, q) => p - q);
			if(idx.length < 2) return;
			gMem[name] = idx;
			idx.forEach(i => { (gOf[IDS[i]] = gOf[IDS[i]] || []).push(name); });
		});

		// результат для одной пары
		const gen = (a, b, r) => {
			const base = Math.max(IX[a], IX[b]);
			const taken = [];
			const ok = i => i >= 0 && i < N && !isStart[IDS[i]] && IDS[i] !== a && IDS[i] !== b && !taken.includes(i);
			const fromGroup = () => {
				const ga = gOf[a] || [], gb = gOf[b] || [];
				const both = ga.filter(n => gb.includes(n));
				const names = (both.length && r() < 0.7) ? both : ga.concat(gb);
				if(!names.length) return -1;
				const m = gMem[names[Math.floor(r() * names.length)]];
				const c = m.filter(i => i >= base - AUTO_BACK && i <= base + AUTO_AHEAD * 3 && ok(i));
				return c.length ? c[Math.floor(r() * c.length)] : -1;
			};
			const fromWindow = () => {
				for(let t = 0; t < 12; t++){
					let i = r() < 0.15 ? base - Math.floor(r() * AUTO_BACK) : base + 1 + Math.floor(r() * AUTO_AHEAD);
					if(i >= N) i = N - 1 - Math.floor(r() * AUTO_AHEAD);
					if(ok(i)) return i;
				}
				return -1;
			};
			const one = () => {
				let i = -1;
				if(r() < AUTO_SAME) i = fromGroup();
				if(i < 0) i = fromWindow();
				if(i >= 0) taken.push(i);
				return i;
			};
			if(r() < AUTO_FAIL * Math.min(1, base / 40)) return null;
			const i1 = one();
			if(i1 < 0) return null;
			const out = [IDS[i1]];
			if(r() < AUTO_TWO){ const i2 = one(); if(i2 >= 0) out.push(IDS[i2]); }
			return out;
		};

		const put = (a, b, key, out) => {
			const c = { a, b, out, key, src:"авто", n:0, sp:9, auto:true };
			RC[key] = c;
			if(AUTO_IN_LIST) RLIST.push(c);
			return c;
		};

		// заполняем все пары, которые ещё пусты (ручные рецепты не трогаем)
		let made = 0, failed = 0;
		for(let i = 0; i < N; i++){
			for(let j = i; j < N; j++){
				const a = IDS[i], b = IDS[j], key = rkey(a, b);
				if(RC[key] !== undefined) continue;
				const res = gen(a, b, mb(hs(AUTO_SEED + "|" + key)));
				if(res){ put(a, b, key, res); made++; } else failed++;
			}
		}

		// достижимость от стартовых
		const reach = () => {
			const R = new Set(STARTS), list = STARTS.slice();
			for(let p = 0; p < list.length; p++){
				for(let q = 0; q <= p; q++){
					const c = RC[rkey(list[p], list[q])];
					if(c) c.out.forEach(o => { if(!R.has(o)){ R.add(o); list.push(o); } });
				}
			}
			return { R, list };
		};

		// если что-то недостижимо: добавляем этому элементу рецепт из уже достижимых
		let fixed = 0;
		for(let round = 0; round < 6; round++){
			const cur = reach();
			const miss = IDS.filter(id => !cur.R.has(id));
			if(!miss.length) break;
			const pool = cur.list.slice();
			miss.forEach(u => {
				const iu = IX[u];
				const below = pool.filter(id => IX[id] < iu).sort((p, q) => IX[q] - IX[p]).slice(0, 40);
				const cand = below.length ? below : pool;
				if(!cand.length) return;
				const fr = mb(hs(AUTO_SEED + "|fix|" + u));
				for(let t = 0; t < 120; t++){
					const x = cand[Math.floor(fr() * cand.length)], y = cand[Math.floor(fr() * cand.length)];
					const key = rkey(x, y), c = RC[key];
					let done = false;
					if(c === undefined){ put(x, y, key, [u]); done = true; }
					else if(c.auto && c.out.length < 3 && !c.out.includes(u)){ c.out.push(u); done = true; }
					if(done){ pool.push(u); fixed++; break; }
				}
			});
		}

		const fin = reach();
		console.info("[ALCHEMY] авто-рецептов: +" + made + " (пар без результата: " + failed +
			"), добавлено ради достижимости: " + fixed + ", всего в RLIST: " + RLIST.length +
			", недостижимых элементов: " + (N - fin.list.length));
	}catch(e){
		console.error("[ALCHEMY] авто-рецепты:", e);
	}
})();

(() => {
	const reach = new Set(STARTS); let ch = true;
	while(ch){ ch = false; RLIST.forEach(r => { if(reach.has(r.a) && reach.has(r.b)) r.out.forEach(o => { if(!reach.has(o)){ reach.add(o); ch = true; } }); }); }
	const lost = Object.keys(EL).filter(id => !reach.has(id));
	if(lost.length) problem("warn", "Недостижимые: " + lost.join(", "));
})();

const errCount = PROBLEMS.filter(p => p.lvl === "err").length;
const SHOW_PANEL = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
const problemsHtml = (PROBLEMS.length && SHOW_PANEL)
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

	let inner;
	if(isImg(v)){
		inner = '<img src="' + esc(v.replace(/\\/g, "/")) + '" alt="" draggable="false" ' + IMG_ERR + '>';
	}else{
		// считаем "символы" как графемы, чтобы 🧬⚙️ = 2, а не 4
		const glyphs = Array.from(v);
		if(glyphs.length > 1){
			// несколько эмодзи/символов — разложить в строку с автоподбором размера
			inner = '<span class="al-ic-multi" style="--n:' + glyphs.length + '">'
				+ glyphs.map(g => '<span class="al-ic-g">' + esc(g) + '</span>').join("")
				+ '</span>';
		}else{
			inner = esc(v);
		}
	}
	return '<span class="' + cls + '"' + (st ? ' style="' + esc(st) + '"' : "") + '>' + inner + '</span>';
}

/* ═══ НАСТРОЙКИ НОВОГО ═══ */
const FINAL_MARK          = true;    // ◆ у элементов, которые больше ни во что не идут
const FINAL_USE_AUTO      = false;   // true = авто-рецепты тоже считаются «участием» (тогда финальных почти не будет)
const FINAL_ONLY_EXPLICIT = false;   // true = считать только рецепты без групп (финальных будет больше)
const PREVIEW_MODE        = "seen";  // "seen" = в облачке результат только у уже виденных пар; "full" = результат всегда; "off" = без облачка
const POPUP_SEC           = 2.6;     // сколько секунд висит popup «новый элемент»
const CONFETTI_N          = 140;     // сколько частиц конфетти

// финальный = не входит ни в один рецепт, который даёт что-то кроме самих ингредиентов
const FIN_USED = new Set();
Object.keys(RC).forEach(k => {
	const r = RC[k];
	if(r.auto ? !FINAL_USE_AUTO : (FINAL_ONLY_EXPLICIT && r.sp > 0)) return;
	if(r.out.some(o => o !== r.a && o !== r.b)){ FIN_USED.add(r.a); FIN_USED.add(r.b); }
});
const isFinal = id => FINAL_MARK && !FIN_USED.has(id);
console.info("[ALCHEMY] финальных элементов: " + Object.keys(EL).filter(isFinal).length + " из " + ELN);

const tip = id => { const e = EL[id]; return e.name + "  ·  id: " + id + (e.desc ? "\n" + e.desc : "") + (isFinal(id) ? "\n◆ финальный элемент" : ""); };

const AL_CSS = `
.al-fin{position:absolute;top:2px;right:4px;font-size:11px;line-height:1;color:#d4af37;text-shadow:0 0 6px #d4af37;pointer-events:none}
.al-card.al-final{position:relative}

.al-pv{position:absolute;z-index:99990;pointer-events:none;min-width:120px;max-width:240px;padding:7px 10px 8px;border:1px solid #d4af37;border-radius:8px;background:rgba(10,0,4,.96);box-shadow:0 0 16px rgba(212,175,55,.35),0 4px 14px #000;text-align:center;font-family:'Courier New',monospace;animation:al-pv-in .14s ease-out}
.al-pv.up{transform:translate(-50%,-100%)}
.al-pv.dn{transform:translate(-50%,0)}
.al-pv::after{content:"";position:absolute;left:50%;width:10px;height:10px;background:rgba(10,0,4,.96);border:0 solid #d4af37;margin-left:-5px}
.al-pv.up::after{bottom:-6px;border-width:0 1px 1px 0;transform:rotate(45deg)}
.al-pv.dn::after{top:-6px;border-width:1px 0 0 1px;transform:rotate(45deg)}
.al-pv-h{font-size:10px;letter-spacing:1.5px;margin-bottom:5px}
.al-pv-ok .al-pv-h{color:#8fe3a0}
.al-pv-new .al-pv-h{color:#d4af37}
.al-pv-no .al-pv-h{color:#ff4466}
.al-pv-r{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center}
.al-pv-e{display:inline-flex;flex-direction:column;align-items:center;gap:1px;font-size:11px;color:#f0e6d0;max-width:90px}
.al-pv-e b{font-weight:normal}
.al-pv-e em{font-style:normal;font-size:8px;background:#d4af37;color:#000;padding:0 3px;border-radius:2px}
.al-pv-p{color:#d4af37}
.al-pv-q{font-size:20px;color:#d4af37}
.al-pv .al-ic{width:28px!important;height:28px!important;font-size:22px!important;line-height:28px!important;display:inline-flex;align-items:center;justify-content:center}
.al-pv .al-ic img{max-width:100%;max-height:100%}

.al-pop{position:fixed;left:50%;top:26%;z-index:99997;pointer-events:none;transform:translate(-50%,0);min-width:240px;max-width:min(86vw,420px);padding:16px 26px 14px;text-align:center;border:2px solid #d4af37;border-radius:12px;background:radial-gradient(circle at 50% 0%,#3a0010,#0a0004 70%);box-shadow:0 0 40px rgba(212,175,55,.5),0 0 90px rgba(255,0,68,.35),inset 0 0 20px rgba(0,0,0,.8);font-family:'Courier New',monospace;color:#f0e6d0;animation:al-pop-in .5s cubic-bezier(.2,1.4,.4,1) both}
.al-pop.out{animation:al-pop-out .45s ease-in both}
.al-pop-h{font-size:12px;letter-spacing:3px;color:#d4af37;margin-bottom:10px;text-shadow:0 0 8px #d4af37}
.al-pop-f{display:flex;gap:18px;justify-content:center;flex-wrap:wrap}
.al-pop-e{display:flex;flex-direction:column;align-items:center;gap:6px}
.al-pop-e b{font-size:17px;color:#fff}
.al-pop-d{margin-top:8px;font-size:12px;opacity:.75}
.al-pop-fin{margin-top:8px;font-size:11px;color:#d4af37;letter-spacing:1px}
.al-pop-n{margin-top:8px;font-size:10px;color:#d4af37;opacity:.7}
.al-pop .al-ic{width:64px!important;height:64px!important;font-size:50px!important;line-height:64px!important;display:inline-flex;align-items:center;justify-content:center}
.al-pop .al-ic img{max-width:100%;max-height:100%}

.al-confetti{position:fixed;left:0;top:0;width:100vw;height:100vh;pointer-events:none;z-index:99998}

@keyframes al-pv-in{
	from{opacity:0}
	to{opacity:1}
}
@keyframes al-pop-in{
	from{opacity:0;transform:translate(-50%,24px) scale(.5)}
	to{opacity:1;transform:translate(-50%,0) scale(1)}
}
@keyframes al-pop-out{
	from{opacity:1;transform:translate(-50%,0) scale(1)}
	to{opacity:0;transform:translate(-50%,-24px) scale(.9)}
}
`;
function ensureCss(){
	if(document.getElementById("al-x-css")) return;
	const s = document.createElement("style");
	s.id = "al-x-css";
	s.textContent = AL_CSS;
	document.head.appendChild(s);
}

/* ═══ ПРОМПТ ДЛЯ ИИ: в консоли (F12) напиши ALCHEMY_PROMPT() ═══ */
const PROMPT_WITH_NAMES   = false;  // true = у каждого id писать ещё и имя: id(Имя). Длиннее, но ИИ лучше понимает смысл
const PROMPT_WITH_RECIPES = false;  // true = вставлять в промпт все текущие рецепты (очень длинно)
const PROMPT_MAX_PROBLEMS = 120;    // сколько проблем максимум писать в промпт за один раз

function promptText(task){
	const ids = Object.keys(EL);
	const lab = id => (PROMPT_WITH_NAMES && EL[id].name !== id) ? id + "(" + EL[id].name + ")" : id;

	// группы и элементы вне групп
	const inG = new Set(), gLines = [];
	Object.keys(GR_SRC).forEach(g => {
		const m = grGet(g) || [];
		m.forEach(id => inG.add(id));
		gLines.push("@" + g + ": " + (m.length ? m.map(lab).join(", ") : "(пусто)"));
	});
	const loose = ids.filter(id => !inG.has(id));

	// недостижимые элементы
	const reach = new Set(STARTS);
	let ch = true;
	while(ch){
		ch = false;
		RLIST.forEach(r => {
			if(reach.has(r.a) && reach.has(r.b)) r.out.forEach(o => { if(!reach.has(o)){ reach.add(o); ch = true; } });
		});
	}
	const lost = ids.filter(id => !reach.has(id));

	// проблемы загрузки (строку про недостижимые считаем отдельно)
	const probs = PROBLEMS.filter(p => p.msg.indexOf("Недостижимые") !== 0);
	const pLines = probs.slice(0, PROMPT_MAX_PROBLEMS).map(p => (p.lvl === "err" ? "ОШИБКА: " : "предупреждение: ") + p.msg);
	if(probs.length > PROMPT_MAX_PROBLEMS) pLines.push("... и ещё " + (probs.length - PROMPT_MAX_PROBLEMS) + " (сначала исправь эти, остальные покажу потом)");

	// что просим сделать
	const todo = [];
	if(probs.length) todo.push("Исправь все проблемы из блока ПРОБЛЕМЫ: для каждой дай исправленную строку рецепта или опиши недостающий элемент.");
	if(lost.length) todo.push("Сделай рецепты, которые дают недостижимые элементы, используя только уже достижимые элементы.");
	if(task) todo.push(String(task));
	if(!todo.length) todo.push("Проблем и недостижимых элементов нет. Ответь одним словом: «чисто».");

	const out = [];
	out.push("Ты помогаешь наполнять игру-алхимию (соединяешь два элемента, получаешь другие). Работай строго по правилам ниже.");
	out.push("");
	out.push("═══ ЖЁСТКИЕ ПРАВИЛА ═══");
	out.push("1. Используй ТОЛЬКО id из списка ЭЛЕМЕНТЫ ниже. Не выдумывай id, не меняй регистр, не переводи и не переименовывай.");
	out.push("2. Если нужен новый элемент, опиши его в блоке НОВЫЕ ЭЛЕМЕНТЫ. Только после этого его можно писать в рецептах. Иначе не используй.");
	out.push("3. Перед ответом проверь каждый id в каждом рецепте: он должен быть в списке или в твоём блоке НОВЫЕ ЭЛЕМЕНТЫ.");
	out.push("4. Не пересказывай мои данные и не выводи список элементов заново. Только то, что изменилось.");
	out.push("");
	out.push("═══ ФОРМАТ РЕЦЕПТОВ (строки массива RECIPES, в двойных кавычках через запятую) ═══");
	out.push('"a + b = c + d"           слева ровно 2 элемента, порядок не важен, результатов может быть несколько');
	out.push('"@GROUP + a = c + d"      по рецепту на каждый элемент группы');
	out.push('"@A + @B = x"             все пары из двух групп');
	out.push('"[a,b,c] + x = y"         группа прямо в рецепте');
	out.push('"@GROUP + $1 = big_$1"    элемент с самим собой; $1 в результате = id из 1-го слота, $2 = из 2-го');
	out.push('"@GROUP + acid = @OTHER"  соответствие по номеру (1-й даёт 1-й, ...), размеры групп должны совпасть');
	out.push('"# текст"                 комментарий; несколько рецептов в одной строке разделяются «;»');
	out.push("Приоритет: рецепт без групп сильнее группового; групповое правило с одной группой сильнее правила с двумя; среди равных побеждает нижнее в списке. Общие правила пиши выше, уточнения ниже. По возможности используй группы: так строк меньше.");
	out.push("");
	out.push("═══ ФОРМАТ НОВОГО ЭЛЕМЕНТА (в массив ELEMENTS) ═══");
	out.push("Поля: id (без пробелов, «+» и «=»), name, visual (эмодзи или путь к картинке), desc, fx (массив из: " + Object.keys(FXMAP).join(", ") + "), color, start (true только для стартовых).");
	out.push("");
	out.push("═══ ФОРМАТ ОТВЕТА ═══");
	out.push("Три блока кода, пустой блок пропусти:");
	out.push("1) ЗАМЕНИТЬ: строки вида  старая строка рецепта  →  новая строка");
	out.push("2) ДОБАВИТЬ РЕЦЕПТЫ: новые строки для RECIPES");
	out.push("3) НОВЫЕ ЭЛЕМЕНТЫ: объекты для ELEMENTS");
	out.push("");
	out.push("═══ ЗАДАЧА ═══");
	todo.forEach((t, i) => out.push((i + 1) + ". " + t));
	out.push("");
	out.push("═══ СОСТОЯНИЕ ═══");
	out.push("Элементов: " + ids.length + ", развёрнутых рецептов: " + RLIST.length + ", стартовых: " + STARTS.length + ", проблем: " + probs.length + ", недостижимых: " + lost.length + ".");
	out.push("");
	out.push("═══ ПРОБЛЕМЫ ═══");
	out.push(pLines.length ? pLines.join("\n") : "нет");
	out.push("");
	out.push("═══ НЕДОСТИЖИМЫЕ ЭЛЕМЕНТЫ ═══");
	out.push(lost.length ? lost.map(lab).join(", ") : "нет");
	out.push("");
	out.push("═══ СТАРТОВЫЕ ЭЛЕМЕНТЫ ═══");
	out.push(STARTS.map(lab).join(", "));
	out.push("");
	out.push("═══ ЭЛЕМЕНТЫ (все допустимые id) ═══");
	if(gLines.length){ out.push("Группы:"); gLines.forEach(l => out.push(l)); out.push(""); }
	out.push("Вне групп: " + (loose.length ? loose.map(lab).join(", ") : "нет"));
	if(PROMPT_WITH_RECIPES){
		out.push("");
		out.push("═══ ТЕКУЩИЕ РЕЦЕПТЫ ═══");
		out.push([].concat(RECIPES).filter(r => typeof r === "string").join("\n"));
	}
	return out.join("\n");
}

window.ALCHEMY_PROMPT_TEXT = promptText;
window.ALCHEMY_PROMPT = function(task){
	const t = promptText(task);
	console.log(t);
	console.info("[ALCHEMY] Промпт выше, " + t.length + " символов. Выдели его в консоли, скопируй и отправь ИИ.");
};
console.info("[ALCHEMY] Промпт для ИИ: напиши в консоли ALCHEMY_PROMPT()  или  ALCHEMY_PROMPT(\"твоя задача\")");

/* ═══════════════ ЖИВОЙ КОД ═══════════════ */
function init(){
	if(window.__alClean){ try{ window.__alClean(); }catch(e){} }
	const root = document.getElementById("al-root");
	if(!root) return;
	const $ = id => root.querySelector("#" + id);
	const ac = new AbortController(), sig = ac.signal;
	ensureCss();
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
		document.querySelectorAll(".al-ghost,.al-pop,.al-confetti").forEach(g => g.remove());
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
		el.innerHTML = face(e, true) + '<div class="al-nm">' + esc(e.name) + '</div>' + (isFinal(id) ? '<span class="al-fin">◆</span>' : "");
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
	let tgt = null, pv = null, pvKey = "";
	const triedFail = new Set();   // пары, которые в этой сессии ничего не дали

	function hidePv(){ if(pv){ pv.remove(); pv = null; } pvKey = ""; }
	function pvOuts(rc, showNew){
		return '<div class="al-pv-r">' + rc.out.map(id =>
			'<span class="al-pv-e">' + face(EL[id], false) + '<b>' + esc(EL[id].name) + '</b>'
			+ (showNew && !known.has(id) ? '<em>NEW</em>' : '') + '</span>'
		).join('<span class="al-pv-p">+</span>') + '</div>';
	}
	function preview(o, srcId){
		if(!o || !srcId || PREVIEW_MODE === "off"){ hidePv(); return; }
		const key = rkey(srcId, o.id), sk = o.uid + "|" + key;
		if(pv && pvKey === sk) return;
		hidePv(); pvKey = sk;
		const rc = RC[key], full = PREVIEW_MODE === "full", tried = triedFail.has(key);
		let head, cls, body;
		if(rc && found.has(key)){ head = "✔ УЖЕ БЫЛО"; cls = "ok"; body = pvOuts(rc, false); }
		else if(rc && full){ head = "✦ ЕЩЁ НЕ БЫЛО"; cls = "new"; body = pvOuts(rc, true); }
		else if(!rc && tried){ head = "✖ УЖЕ БЫЛО: НИЧЕГО"; cls = "no"; body = ""; }
		else if(!rc && full){ head = "✖ НИЧЕГО НЕ ВЫЙДЕТ"; cls = "no"; body = ""; }
		else{ head = "✦ ЕЩЁ НЕ ПРОБОВАЛ"; cls = "new"; body = '<div class="al-pv-q">?</div>'; }
		const up = o.y > 96;
		pv = document.createElement("div");
		pv.className = "al-pv al-pv-" + cls + (up ? " up" : " dn");
		pv.innerHTML = '<div class="al-pv-h">' + head + '</div>' + body;
		pv.style.left = Math.max(125, Math.min(fw() - 125, o.x + ITEM/2)) + "px";
		pv.style.top = (up ? o.y - 10 : o.y + ITEM + 20) + "px";
		field.appendChild(pv);
	}
	function mark(o, srcId){
		if(tgt !== o){
			if(tgt) tgt.el.classList.remove("al-target");
			tgt = o;
			if(o) o.el.classList.add("al-target");
		}
		preview(o, srcId);
	}

	let popEl = null, popT = 0, popT2 = 0;
	function popup(ids){
		clearTimeout(popT); clearTimeout(popT2);
		if(popEl) popEl.remove();
		const one = ids.length === 1, anyFin = ids.some(isFinal);
		const p = document.createElement("div");
		p.className = "al-pop";
		p.innerHTML = '<div class="al-pop-h">★ ' + (one ? "НОВЫЙ ЭЛЕМЕНТ ОТКРЫТ" : "НОВЫЕ ЭЛЕМЕНТЫ ОТКРЫТЫ") + ' ★</div>'
			+ '<div class="al-pop-f">' + ids.map(id =>
				'<div class="al-pop-e">' + face(EL[id], true) + '<b>' + esc(EL[id].name) + (isFinal(id) ? ' ◆' : '') + '</b></div>').join("") + '</div>'
			+ (one && EL[ids[0]].desc ? '<div class="al-pop-d">' + esc(EL[ids[0]].desc) + '</div>' : '')
			+ (anyFin ? '<div class="al-pop-fin">◆ ФИНАЛЬНЫЙ ЭЛЕМЕНТ: дальше он никуда не ведёт</div>' : '')
			+ '<div class="al-pop-n">' + known.size + ' / ' + ELN + '</div>';
		document.documentElement.appendChild(p);
		popEl = p;
		popT = setTimeout(() => p.classList.add("out"), POPUP_SEC * 1000);
		popT2 = setTimeout(() => { p.remove(); if(popEl === p) popEl = null; }, POPUP_SEC * 1000 + 500);
		tm.push(popT, popT2);
	}

	function confetti(cx, cy){
		if(CONFETTI_N <= 0) return;
		const cv = document.createElement("canvas");
		cv.className = "al-confetti";
		const W = cv.width = window.innerWidth, H = cv.height = window.innerHeight;
		document.documentElement.appendChild(cv);
		const g = cv.getContext("2d");
		const cols = ["#d4af37", "#ffdf6b", "#ff0044", "#c2002f", "#ffffff", "#ff6a3d"];
		const P = [];
		for(let i = 0; i < CONFETTI_N; i++){
			const a = -Math.PI/2 + rnd(-1.25, 1.25), v = rnd(260, 780);
			P.push({ x:cx, y:cy, vx:Math.cos(a)*v, vy:Math.sin(a)*v, w:rnd(5, 10), h:rnd(4, 8), r:rnd(0, 6.28), vr:rnd(-12, 12), c:pick(cols), life:rnd(1.6, 2.8), t:0 });
		}
		let last = performance.now();
		const step = now => {
			if(sig.aborted || !cv.isConnected){ cv.remove(); return; }
			const dt = Math.min(0.05, (now - last) / 1000); last = now;
			g.clearRect(0, 0, W, H);
			let alive = 0;
			P.forEach(p => {
				p.t += dt;
				if(p.t >= p.life) return;
				alive++;
				p.vy += 900 * dt;
				p.vx *= Math.pow(0.35, dt);
				p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
				g.save();
				g.globalAlpha = Math.min(1, (p.life - p.t) / 0.5);
				g.translate(p.x, p.y);
				g.rotate(p.r);
				g.scale(1, Math.abs(Math.cos(p.t * 9 + p.r)) + 0.15);
				g.fillStyle = p.c;
				g.fillRect(-p.w/2, -p.h/2, p.w, p.h);
				g.restore();
			});
			if(alive) requestAnimationFrame(step); else cv.remove();
		};
		requestAnimationFrame(step);
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
			popup(newEl);
			const fr0 = field.getBoundingClientRect();
			confetti(fr0.left + mx + ITEM/2, fr0.top + my + ITEM/2);
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
		triedFail.add(rkey(a.id, b.id));
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
			mark(inside ? nearest(e.clientX - fr.left, e.clientY - fr.top, -1) : null, drag.id);
		}else{
			setPos(drag.it, e.clientX - fr.left - drag.offx, e.clientY - fr.top - drag.offy);
			mark(nearest(drag.it.x + ITEM/2, drag.it.y + ITEM/2, drag.it.uid), drag.it.id);
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
		const fin = isFinal(id);
		return '<div class="al-card' + (fresh.has(id) ? " al-fresh" : "") + (fin ? " al-final" : "") + '" data-id="' + esc(id) + '" title="' + esc(tip(id)) + '">'
			+ face(e, LIST_FX) + '<div class="al-cn">' + esc(e.name) + '</div>' + (fin ? '<span class="al-fin">◆</span>' : '') + '</div>';
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
	on(list, "pointerover", e => {
		const c = e.target.closest && e.target.closest(".al-card");
		if(c && fresh.delete(c.dataset.id)) c.classList.remove("al-fresh");
	});

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
        RLIST.forEach(r => { if(!r.auto) rc.add(r.key); });
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

.al-ic-multi{
	display:inline-flex;
	align-items:center;
	justify-content:center;
	gap:0;                      /* ← было .06em, теперь 0 */
	line-height:1;
	font-size:1em;
	max-width:100%;
	max-height:100%;
	flex-wrap:nowrap;
	overflow:visible;
	letter-spacing:-0.12em;     /* ← ключевой трюк: сжимает расстояние между глифами */
}

.al-ic-multi .al-ic-g{
	display:inline-block;
	line-height:1;
	font-family:"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif;
	/* убираем scale — он создавал визуальный зазор */
	/* transform:scale(...)  ← удалено */
	margin:0 -0.08em;           /* ← отрицательный margin с каждой стороны */
	vertical-align:middle;
}

/* контейнер иконки: не резать и не клипать */
.al-ic{ overflow:visible; }
.al-ic-multi,
.al-ic > img,
.al-ic > .al-ic-g{ pointer-events:none; }

/* точечно: где .al-ic был маленький (карточка, поле, тост, подсказка) —
   автоподбор уже встроен через calc выше, но у карточки ограничим ширину */
.al-card .al-ic-multi{ max-width:100%; }
.al-it  .al-ic-multi{ max-width:100%; }

/* строка в рецепте: там .al-pt .al-ic = 20×20, 16px — оставляем, но сжимаем */
.al-pt .al-ic-multi{ font-size:.95em; }

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