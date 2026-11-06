REGISTER_PAGE("typing", "TYPΞ", () => {

/* ═══════════════════════════════════════════════════════════
   НАСТРОЙКИ
   ═══════════════════════════════════════════════════════════ */
const SAVE_KEY = "ty_save_v1";

/* Сложности:
   mul   — множитель очков
   v0/v1 — нужная скорость (зн/с): старт и предел. 12 зн/с ≈ 144 WPM, 5 зн/с ≈ 60 WPM
   tau   — за сколько секунд давление растёт (≈ через 3·tau почти предел)
   t0    — стартовый запас времени, tmax — потолок запаса
   pen   — база штрафа за опоздание на строку (штраф = pen * MISS_K секунд запаса)
   fast  — бонус за быструю строку (сек)
   len   — длина строк (в символах, с пробелами) */
const DIFFS = [
	{ id:"easy",   name:"ЛЕГКО",  color:"#7aff9a", mul:1,   v0:1.6, v1:4.0,  tau:80, t0:15, tmax:20, pen:0.6, fast:0.6, len:[14, 22] },
	{ id:"medium", name:"СРЕДНЕ", color:"#00e5ff", mul:2,   v0:2.4, v1:5.5,  tau:80, t0:14, tmax:18, pen:0.8, fast:0.8, len:[22, 34] },
	{ id:"hard",   name:"СЛОЖНО", color:"#d4af37", mul:3.5, v0:3.2, v1:7.5,  tau:75, t0:12, tmax:16, pen:1.0, fast:1.0, len:[34, 50] },
	{ id:"insane", name:"АД",     color:"#ff0044", mul:6,   v0:4.2, v1:10.0, tau:70, t0:10, tmax:14, pen:1.2, fast:1.2, len:[48, 70] },
];

/* Штраф за опоздание на строку = pen * MISS_K секунд запаса */
const MISS_K = 5;

/* false: опоздал, штраф один раз, строку всё равно надо дописать (запас тает, пока не допишешь)
   true:  опоздал, штраф и сразу следующая строка */
const SKIP_ON_MISS = false;

/* Режимы. k — поправка скорости: меньше 1 = режим тяжелее, больше 1 = легче.
   Строки кода (grp:"code") делает генератор GEN, остальные режимы — генератор токенов TOK. */
const MODES = [
	{ id:"lua",   grp:"code", ico:"🌙", name:"Lua",        k:0.85, desc:"Таблицы, метатаблицы, корутины." },
	{ id:"js",    grp:"code", ico:"🟨", name:"JavaScript", k:0.85, desc:"Стрелки, DOM, async, регулярки." },
	{ id:"cs",    grp:"code", ico:"🟪", name:"C#",         k:0.80, desc:"LINQ, generic-и, атрибуты." },
	{ id:"cpp",   grp:"code", ico:"🟦", name:"C++",        k:0.80, desc:"Шаблоны, указатели, лямбды." },
	{ id:"nasm",  grp:"code", ico:"⚙️", name:"NASM",       k:0.85, desc:"Ассемблер: регистры, адресация, данные." },
	{ id:"gcode", grp:"code", ico:"🛠️", name:"G-CODE",     k:0.85, desc:"Станки ЧПУ: G01 X10 Y20, M104 S200. Язык GOLU." },
	{ id:"bin",   grp:"raw",  ico:"0️⃣", name:"BINARY",     k:1.25, desc:"Только 0 и 1. Глаза сломаются раньше пальцев." },
	{ id:"hex",   grp:"raw",  ico:"🔶", name:"HEX",        k:0.95, desc:"Байты, адреса, цвета. Регистр важен." },
	{ id:"num",   grp:"raw",  ico:"🔢", name:"ЦИФРЫ",      k:1.10, desc:"Числа, дроби, экспоненты, разделители." },
	{ id:"sym",   grp:"raw",  ico:"🔣", name:"СИМВОЛЫ",    k:0.65, desc:"Скобки, слэши, кавычки. Шифт - твой друг." },
	{ id:"text",  grp:"raw",  ico:"📝", name:"ТЕКСТ",      k:1.15, desc:"Обычные слова и предложения. Разминка для пальцев." },
	{ id:"mix",   grp:"raw",  ico:"🧬", name:"MIX",        k:0.75, desc:"Код, слова, числа, hex и bin в одной строке." },
	{ id:"chaos", grp:"raw",  ico:"🌀", name:"ХАОС",       k:0.70, desc:"Всё сразу: слова, числа, hex, bin, куски кода." },
];

/* Слова: строковые литералы в коде + режим ТЕКСТ */
const WORDS = [
	// базовые
	"bit", "byte", "glitch", "signal", "null", "void", "kernel", "root", "error", "patch",
	"sigterm", "crash", "token", "loop", "hex", "lithium", "eye", "exit", "gate", "node",
	// буферы и память
	"buffer", "socket", "thread", "stack", "heap", "queue", "cache", "packet", "router",
	"server", "client", "daemon", "driver", "module", "pointer", "register", "segment",
	"overflow", "underflow", "leak", "pool", "arena", "chunk", "block", "page", "frame",
	// кодирование
	"binary", "cipher", "vector", "matrix", "pixel", "render", "shader", "script",
	"syntax", "parser", "lexer", "compiler", "linker", "debug", "trace", "fault",
	"panic", "reboot", "uplink", "backup", "archive", "sector", "cluster", "switch",
	"relay", "beacon", "cursor", "window", "sandbox", "fork", "pipe", "mutex",
	"atomic", "swap", "flash", "lathe", "spindle", "tool", "axis", "feed", "probe",
	// литуизм
	"hexagon", "circuit", "neon", "cobalt", "quartz", "reactor", "monitor",
	"terminal", "firmware", "lithium", "golu", "sranspong", "crybird", "pisechnik",
	"voidg", "apostle", "kernel", "red_protocol", "sigterm", "token", "hex",
	"gcode", "spindle", "cnc", "forge", "alloy", "crystal", "photon", "plasma",
	// данные
	"record", "field", "schema", "index", "query", "table", "column", "row",
	"view", "join", "group", "order", "limit", "offset", "cursor", "batch",
	"stream", "buffer", "channel", "pipe", "queue", "topic", "event", "handler",
	// сеть
	"gateway", "bridge", "tunnel", "proxy", "firewall", "router", "switch",
	"hub", "mesh", "cloud", "edge", "zone", "region", "cluster", "node", "pod",
	"service", "endpoint", "route", "path", "host", "domain", "port", "socket",
	// системы
	"process", "thread", "fiber", "coroutine", "scheduler", "dispatcher",
	"worker", "master", "slave", "replica", "shard", "partition", "segment",
	"block", "sector", "page", "frame", "cell", "slot", "tile", "chunk",
];

/* Куски синтаксиса для режимов ХАОС и MIX */
const FRAGS = [
	// стрелки и лямбды
	"x=>x*2", "a=>a+1", "()=>{}", "(a,b)=>a+b", "async()=>{}", "yield*",
	// инкременты
	"a[i]++", "++i", "--n", "i+=2", "i-=3", "i*=4", "i/=5", "i%=6",
	// доступ
	"p->next", "*ptr++", "&buf[0]", "a[i--]", "a[++i]", "arr.at(-1)",
	// приведение
	"(int)f", "(char)c", "(float)v", "static_cast<T>", "reinterpret_cast<T>",
	// размеры
	"sizeof(T)", "sizeof(int)", "len(arr)", "arr.length", "str.size()",
	// битовые
	"0xFF&m", "x^=y", "~mask", "x>>=2", "x<<=3", "a|b", "a&b", "a^b",
	// логика
	"if(!p)", "!!v", "a?b:c", "a&&b", "a||b", "!a", "a==b", "a!=b",
	// сравнение
	"<=>", "===", "!==", "?.", "??", "??=", "&&=", "||=",
	// spread
	"...args", "...rest", "...spread", "Math.max(...arr)",
	// литералы
	"0b1010", "0o17", "1e-9", "1_000_000", "0xDEAD", "0xBEEF", "0xCAFE",
	// строки
	"\\x1b", "\\t", "\\0", "\\n", "\\r", "\\u00e9", "U+00FF", "\\u{1F600}",
	// форматы
	"%d\\n", "%s", "%02x", "%.3f", "%5.2f", "%c", "%p",
	// препроцессор
	"#define N 8", "#pragma once", "#ifdef DEBUG", "#endif", "#include <x>",
	// веб
	"<?php", "?>", "</div>", "<br/>", "<span>", "<a href=\"#\">",
	// SQL
	"SELECT *", "DROP TABLE", "INSERT INTO", "UPDATE x SET", "WHERE id=1",
	// шелл
	"rm -rf", "chmod +x", "cd ..", "|| true", "2>&1", "$PATH", "git push", "npm i",
	// асм
	"mov eax,1", "push eax", "xor eax,eax", "jmp $", "int 0x80", "ret",
	// G-код
	"G01 X5", "M104 S200", "G28", "M30", "G90 G21",
	// циклы
	"while(1)", "for(;;)", "do{", "}while(x)", "loop{", "until x",
	// исключения
	"try{", "}catch(E){", "finally{", "throw new E()", "panic!()",
	// async
	"await x", "yield", "async", "Promise.all()", "go func()",
	// указатели
	"void*", "char**", "int[]", "map<K,V>", "Vec<T>", "Box<T>", "Option<T>",
	// объекты
	"self.x", "this->y", "nil", "None", "nullptr", "NULL", "undefined",
	// приведение
	"as T", "as any", "as const", "<? extends T>", "<? super T>",
	// generics
	"<T>", "<T,U>", "impl<T>", "where T: Clone", "trait X",
];

const NOUNS = [
	// данные
	"item", "node", "slot", "tick", "mask", "port", "byte", "hp", "id", "score",
	"level", "queue", "stack", "frame", "cache", "index", "count", "speed",
	"angle", "range", "state", "token", "timer", "mode", "flag", "size",
	"depth", "width", "limit", "value", "buffer", "packet", "target", "player",
	"enemy", "chunk", "sector", "vertex", "offset", "socket",
	// расширение
	"event", "handler", "callback", "promise", "future", "stream", "channel",
	"message", "packet", "frame", "segment", "block", "cell", "tile", "layer",
	"surface", "volume", "region", "zone", "area", "bounds", "rect", "circle",
	"line", "curve", "path", "point", "vector", "matrix", "quat", "color",
	"pixel", "shader", "material", "texture", "mesh", "sprite", "anim",
	"clip", "track", "cue", "beat", "tempo", "scale", "chord", "note",
	"sample", "buffer", "voice", "filter", "effect", "preset", "patch",
	// системы
	"process", "thread", "fiber", "task", "job", "worker", "pool", "queue",
	"lock", "mutex", "semaphore", "atomic", "flag", "signal", "event",
	"timer", "clock", "tick", "frame", "rate", "delay", "timeout", "retry",
	"attempt", "count", "limit", "cap", "floor", "ceiling", "range",
];

const ADJS = [
	"max", "min", "raw", "next", "prev", "old", "new", "base", "free", "last",
	"safe", "dead", "live", "hot", "cold", "fast", "slow", "big", "small",
	"high", "low", "wide", "narrow", "deep", "shallow", "sharp", "soft",
	"hard", "weak", "strong", "bright", "dark", "clear", "dirty", "clean",
	"empty", "full", "open", "closed", "active", "idle", "busy", "ready",
	"pending", "done", "failed", "error", "valid", "invalid", "true", "false",
	"left", "right", "top", "bottom", "front", "back", "inner", "outer",
];

const VERBS = [
	"load", "save", "parse", "build", "reset", "update", "render", "spawn",
	"clear", "fetch", "apply", "merge", "check", "count", "flush", "scan",
	"sync", "pack", "read", "write", "emit", "poll", "mount", "trace", "patch",
	// расширение
	"bind", "connect", "close", "open", "create", "destroy", "init", "start",
	"stop", "pause", "resume", "restart", "reload", "refresh", "retry",
	"send", "receive", "push", "pop", "shift", "unshift", "splice", "slice",
	"concat", "split", "join", "trim", "pad", "format", "parse", "stringify",
	"encode", "decode", "hash", "sign", "verify", "auth", "login", "logout",
	"register", "subscribe", "publish", "notify", "broadcast", "dispatch",
	"handle", "process", "queue", "dequeue", "enqueue", "schedule", "cancel",
	"abort", "timeout", "wait", "sleep", "wake", "freeze", "thaw", "clone",
	"copy", "move", "swap", "sort", "shuffle", "reverse", "rotate", "scale",
	"translate", "rotate", "skew", "transform", "animate", "tween", "ease",
	"fade", "blink", "pulse", "glow", "flash", "shake", "spin", "float",
];

const LOOPV  = ["Index", "Step", "Slot", "Tick", "Count", "Row", "Col"];
const EVENTS = [
	"keydown", "keyup", "keypress", "click", "dblclick", "mousedown",
	"mouseup", "mousemove", "mouseover", "mouseout", "mouseenter",
	"mouseleave", "resize", "scroll", "focus", "blur", "input", "change",
	"submit", "reset", "load", "unload", "beforeunload", "error",
	"touchstart", "touchend", "touchmove", "pointerdown", "pointerup",
	"pointermove", "wheel", "dragstart", "dragend", "drop", "contextmenu",
];

/* Правила в меню (подставляются из JS) */
const RULES =
	"▸ Каждая строка — кусок кода. Допиши её целиком, и она засчитается. На строку даётся <b>длина / нужная скорость</b> секунд.<br>"
	+ "▸ Это настоящее текстовое поле: работают <b>стрелки, Home, End, Delete, Backspace</b>, клик мышью и выделение.<br>"
	+ "▸ Неверный символ остаётся в тексте: красный фон, нужный символ белым, а набранный неверный маленький <b>жёлтый</b> сверху. Сотри его и впиши верный. Штрафа по времени за ошибку нет, комбо в ноль.<br>"
	+ "▸ Не успел за время строки: один штраф по запасу, комбо в ноль. Строку всё равно нужно дописать, пока она не готова, запас тает.<br>"
	+ "▸ <b>Раскладка EN, регистр важен.</b> Пробел обязателен только между словами (<b>function test</b>), он показан точкой <b>·</b>. Возле скобок и знаков (<b>(){};=,</b>) его можно не ставить.<br>"
	+ "▸ Скобки и кавычки закрываются сами, как в IDE. Закрывающую можно набрать, она просто сдвинет курсор. Backspace на пустой паре стирает обе.<br>"
	+ "▸ Чистые и быстрые строки пополняют запас. Запас кончился: конец забега.<br>"
	+ "▸ <b>Esc</b> завершает забег, <b>Enter</b> начинает новый.";

/* Фразы для конца забега */
const END_TIME = ["SIGTERM: таймер обнулён.", "GOLU ждал быстрее.", "Пальцы отстали от процессора.", "Время вышло. Система записала.", "ERR_TOO_SLOW"];
const END_QUIT = ["Забег прерван.", "Ты сам нажал выход.", "Процесс завершён оператором."];

/* ═══════════════════════════════════════════════════════════
   ДАЛЬШЕ ТРОГАТЬ НЕ НУЖНО
   ═══════════════════════════════════════════════════════════ */
const MODE = Object.create(null); MODES.forEach((M) => { MODE[M.id] = M; });
const Esc     = (S) => String(S).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const RandInt = (A, B) => Math.floor(A + Math.random() * (B - A + 1));
const Pick    = (A) => A[Math.floor(Math.random() * A.length)];
const RandStr = (Set, N) => { let S = ""; for(let I = 0; I < N; I++){ S += Set[Math.floor(Math.random() * Set.length)]; } return S; };
const FmtN    = (N) => String(Math.round(N)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const FmtT    = (S) => { S = Math.floor(S); return Math.floor(S / 60) + ":" + String(S % 60).padStart(2, "0"); };
const Cap     = (S) => S ? S[0].toUpperCase() + S.slice(1) : S;
const Strip   = (S) => S.replace(/\s+/g, "");
const SpRe    = /\s/;
const CyrRe   = /[\u0400-\u04FF]/;

const DIG = "0123456789", HEXL = "0123456789abcdef", HEXU = "0123456789ABCDEF", HEXM = "0123456789abcdefABCDEF";
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const SYM1 = "!?.,;:()-", SYM2 = "!?.,;:()-[]{}<>/\\|+=*&%$#@_~^";
const PRINT = ALPHA + ALPHA.toUpperCase() + DIG + SYM2 + "\"'";

/* ═══════════════ ГЕНЕРАТОР КОДА ═══════════════
   GEN[язык][ярус] — массив функций, каждая возвращает один оператор.
   Ярус 0 — простое, 3 — самое тяжёлое. Имена в PascalCase, блоки всегда в {}.
   Lua — исключение: там блоки then/end, скобки {} только у таблиц. */
let GenD = 0;
const MATH_OPS = ["+", "-", "*", "%"];
const CMP      = ["==", "!=", "<", ">", "<=", ">="];
const CMP_LUA  = ["==", "~=", "<", ">", "<=", ">="];

const Ident    = () => { const Noun = Cap(Pick(NOUNS)); return GenD >= 2 && Math.random() < 0.4 ? Cap(Pick(ADJS)) + Noun : Noun; };
const FuncName = () => Cap(Pick(VERBS)) + Cap(Pick(NOUNS));
const StrLit   = () => "\"" + (GenD >= 2 && Math.random() < 0.3 ? Pick(WORDS) + "_" + Pick(WORDS) : Pick(WORDS)) + "\"";
const IntLit   = (A = 1, B = 99) => String(RandInt(A, B));
const FloatLit = () => RandInt(0, 99) + "." + RandInt(1, 99);
const HexLit   = () => "0x" + RandStr(HEXU, Pick([2, 2, 4]));
const ByteLit  = () => "0x" + RandStr(HEXU, 2);
const Coord    = () => (Math.random() < 0.3 ? "-" : "") + (Math.random() < 0.5 ? IntLit(0, 120) : FloatLit());
const Atom     = () => Math.random() < 0.6 ? Ident() : IntLit();
const Expr     = (Depth) => {
	if(Depth <= 0){ return Atom(); }
	if(Depth === 1){ return Atom() + " " + Pick(MATH_OPS) + " " + Atom(); }
	return "(" + Expr(Depth - 1) + ") " + Pick(MATH_OPS) + " " + Atom();
};
const Cond = (Lua, Depth) => {
	const Ops = Lua ? CMP_LUA : CMP;
	let S = Ident() + " " + Pick(Ops) + " " + IntLit(0, 99);
	if(Depth >= 2){ S += " " + (Lua ? "and" : "&&") + " " + Ident() + " " + Pick(Ops) + " " + IntLit(0, 99); }
	return S;
};

const R32 = ["eax", "ebx", "ecx", "edx", "esi", "edi"];
const R64 = ["rax", "rbx", "rcx", "rdx", "rsi", "rdi", "r8", "r9"];
const R8  = ["al", "bl", "cl", "dl"];

const GEN = Object.create(null);

GEN.js = [
	[
		() => `let ${Ident()} = ${IntLit()};`,
		() => `const ${Ident()} = ${StrLit()};`,
		() => `return ${Atom()};`,
		() => `if(${Cond(false, 0)}){ return; }`,
		() => `console.log(${StrLit()});`,
		() => `${FuncName()}(${Atom()});`,
		() => `let ${Ident()} = ${Pick(["true","false","null"])};`,
		() => `const ${Ident()} = ${FloatLit()};`,
		() => `const ${Ident()} = \`${Pick(WORDS)}_\${${Ident()}}\`;`,
		() => `throw new Error(${StrLit()});`,
	],
	[
		() => `const ${Ident()} = [${IntLit()}, ${IntLit()}, ${IntLit()}];`,
		() => { const Step = Pick(LOOPV), Total = Ident(); return `for(let ${Step} = 0; ${Step} < ${IntLit(5, 99)}; ${Step}++){ ${Total} += ${Step}; }`; },
		() => { const Left = Ident(), Right = Ident(); return `const ${FuncName()} = (${Left}, ${Right}) => { return ${Left} + ${Right}; };`; },
		() => { const Item = Ident(); return `${Ident()}List.forEach((${Item}) => { console.log(${Item}.Name); });`; },
		() => `if(${Cond(false, 1)}){ ${Ident()} = ${Expr(1)}; }else{ ${Ident()} = ${Expr(0)}; }`,
		() => `const ${Ident()} = { Id: ${IntLit()}, Hp: ${IntLit()}, Name: ${StrLit()} };`,
		() => `const ${Ident()} = ${Ident()}List.map((${Ident()}) => { return ${Ident()}.Id; });`,
		() => `const { ${Ident()}, ${Ident()} } = ${Ident()};`,
		() => `if(!${Ident()}){ ${FuncName()}(); }else{ ${FuncName()}(); }`,
		() => `switch(${Ident()}){ case ${IntLit()}: ${FuncName()}(); break; default: break; }`,
		() => `const ${Ident()} = ${Ident()}List.slice(${IntLit(0, 9)}, ${IntLit(10, 99)});`,
		() => `Object.assign(${Ident()}, { ${Ident()}: ${IntLit()}, ${Ident()}: ${StrLit()} });`,
	],
	[
		() => { const Url = Ident(), Res = Ident(); return `async function ${FuncName()}(${Url}){ const ${Res} = await fetch(${Url}); return ${Res}.json(); }`; },
		() => { const Item = Ident(); return `const ${Ident()} = ${Ident()}List.filter((${Item}) => { return ${Item} % 2 === 0; });`; },
		() => `class ${Ident()} extends ${Ident()} { constructor(){ super(); this.${Ident()} = ${IntLit()}; } }`,
		() => `try{ ${FuncName()}(); }catch(Err){ console.error(Err.message); }`,
		() => `localStorage.setItem(${StrLit()}, JSON.stringify({ ${Ident()}: ${IntLit()} }));`,
		() => { const Step = Pick(LOOPV), Total = Ident(); return `while(${Step} < ${IntLit(5, 99)}){ ${Total} += ${Expr(1)}; ${Step}++; }`; },
		() => { const Event = Ident(); return `window.addEventListener("${Pick(EVENTS)}", (${Event}) => { if(${Event}.key === ${StrLit()}){ ${FuncName()}(); } });`; },
		() => `const ${Ident()} = new Map([["${Pick(WORDS)}", ${IntLit()}], ["${Pick(WORDS)}", ${IntLit()}]]);`,
		() => `const ${Ident()} = new Set([${IntLit()}, ${IntLit()}, ${IntLit()}]);`,
		() => `const ${Ident()} = ${Ident()}List.reduce((${Ident()}, ${Ident()}) => { return ${Ident()} + ${Ident()}; }, 0);`,
		() => `document.querySelector("${Pick([".x","#y","[z]","#main",".btn"])}").addEventListener("${Pick(EVENTS)}", () => { ${FuncName()}(); });`,
		() => `const ${Ident()} = JSON.parse(localStorage.getItem(${StrLit()}) || "{}");`,
		() => `requestAnimationFrame(() => { ${FuncName()}(); });`,
	],
	[
		() => { const Num = Ident(), Func = FuncName(); return `const ${Func} = (${Num}) => { return ${Num} < 2 ? ${Num} : ${Func}(${Num} - 1) + ${Func}(${Num} - 2); };`; },
		() => `const ${Ident()} = [...${Ident()}].reduce((Acc, Char) => { return (Acc * ${IntLit(3, 99)} ^ Char.charCodeAt(0)) >>> 0; }, ${IntLit(1000, 9999)});`,
		() => { const Key = Ident(), Value = Ident(); return `for(const [${Key}, ${Value}] of Object.entries(${Ident()})){ if(${Value} > ${IntLit()}){ Out[${Key}] = ${Value} * ${IntLit(2, 9)}; } }`; },
		() => `const { ${Ident()}, ...Rest } = ${Ident()}, Copy = { ...Rest, ${Ident()}: ${IntLit()} };`,
		() => { const Whole = Ident(), Left = Ident(), Right = Ident(); return `${Ident()}.replace(/(\\d+)-(\\w+)/g, (${Whole}, ${Left}, ${Right}) => { return ${Right} + ":" + (${Left} ^ ${HexLit()}); });`; },
		() => `const ${Ident()} = new Proxy({}, { get: (Target, Key) => { return Key in Target ? Target[Key] : ${IntLit()}; } });`,
		() => `Promise.all(${Ident()}List.map((Url) => { return fetch(Url); })).then((Data) => { return Data.flat(); });`,
		() => { const G = Ident(); return `function* ${G}(){ yield ${IntLit()}; yield ${IntLit()}; yield ${IntLit()}; }`; },
		() => `const ${Ident()} = (function(){ return { ${Ident()}: ${IntLit()}, ${Ident()}: ${StrLit()} }; })();`,
		() => `new IntersectionObserver((Entries) => { Entries.forEach((E) => { if(E.isIntersecting){ ${FuncName()}(); } }); }).observe(${Ident()});`,
		() => `const ${Ident()} = await Promise.race([${Ident()}A(), ${Ident()}B()]);`,
		() => `const ${Ident()} = [...${Ident()}].flatMap((X) => { return X.split(""); }).join("");`,
	],
];

GEN.cs = [
	[
		() => `${Pick(["int", "long", "short", "byte"])} ${Ident()} = ${IntLit()};`,
		() => `string ${Ident()} = ${StrLit()};`,
		() => `bool ${Ident()} = ${Pick(["true", "false"])};`,
		() => `Console.WriteLine(${Ident()});`,
		() => `var ${Ident()} = new List<${Pick(["int", "string", "float"])}>();`,
		() => `if(${Cond(false, 0)}){ return; }`,
		() => `return ${Atom()};`,
		() => `double ${Ident()} = ${FloatLit()};`,
		() => `char ${Ident()} = '${Pick(ALPHA)}';`,
		() => `var ${Ident()} = (${Pick(["int","string","float"])})${Ident()};`,
		() => `throw new Exception(${StrLit()});`,
	],
	[
		() => { const Item = Ident(); return `foreach(var ${Item} in ${Ident()}List){ Console.WriteLine(${Item}); }`; },
		() => { const Step = Pick(LOOPV); return `for(int ${Step} = 0; ${Step} < ${IntLit(5, 99)}; ${Step}++){ ${Ident()} += ${Step}; }`; },
		() => `public int ${Ident()} { get; private set; }`,
		() => `var ${Ident()} = new Dictionary<string, int>();`,
		() => `static void ${FuncName()}(string[] Args){ ${FuncName()}(); }`,
		() => { const Value = Ident(); return `int ${Ident()} = ${Ident()}List.Sum((${Value}) => { return ${Value} * ${IntLit(2, 9)}; });`; },
		() => `var ${Ident()} = string.Join(",", ${Ident()}List);`,
		() => `var ${Ident()} = ${Ident()}List.FirstOrDefault();`,
		() => `var ${Ident()} = ${Ident()}List.Count();`,
		() => `if(!string.IsNullOrEmpty(${Ident()})){ ${FuncName()}(); }`,
		() => `switch(${Ident()}){ case ${IntLit()}: ${FuncName()}(); break; default: break; }`,
		() => `var ${Ident()} = new ${Pick(["List<int>","Dictionary<string, int>","HashSet<string>"])}();`,
	],
	[
		() => { const Item = Ident(); return `var ${Ident()} = ${Ident()}List.Where((${Item}) => { return ${Item}.Hp > ${IntLit(0, 50)}; }).ToList();`; },
		() => `public override string ToString(){ return ${Ident()} + ":" + ${Ident()}; }`,
		() => `try{ ${FuncName()}(); }catch(Exception Err){ Console.Error.WriteLine(Err.Message); }`,
		() => `public async Task<string> ${FuncName()}(string Url){ return await Client.GetStringAsync(Url); }`,
		() => `public interface I${Ident()} { void Tick(float Dt); int Id { get; } }`,
		() => `Span<byte> Buf = stackalloc byte[${Pick([16, 32, 64, 128, 256])}]; Buf.Fill(${ByteLit()});`,
		() => `var ${Ident()} = ${Ident()}List.OrderBy((${Ident()}) => { return ${Ident()}.Id; }).ToList();`,
		() => `var ${Ident()} = ${Ident()}List.GroupBy((${Ident()}) => { return ${Ident()}.Type; });`,
		() => `record ${Ident()}(int Id, string Name);`,
		() => `public enum ${Ident()} { ${Cap(Pick(NOUNS))}, ${Cap(Pick(NOUNS))}, ${Cap(Pick(NOUNS))} }`,
		() => `var ${Ident()} = System.Text.Json.JsonSerializer.Serialize(${Ident()});`,
	],
	[
		() => `static T ${FuncName()}<T>(T Value) where T : IComparable<T>{ return Value; }`,
		() => `struct ${Ident()} { public byte Id; public ushort ${Ident()}; }`,
		() => `int ${Ident()} = (${Ident()} & ${ByteLit()}) << ${IntLit(1, 8)} | (${Ident()} >> ${IntLit(1, 6)}) ^ ~${Ident()} % ${IntLit(3, 9)};`,
		() => `using var ${Ident()} = new FileStream("${Pick(WORDS)}.bin", FileMode.Open);`,
		() => `delegate void ${Ident()}Handler<in T>(T Arg);`,
		() => `event Action<string> On${Ident()};`,
		() => `public class ${Ident()} : I${Ident()} { public int Id { get; set; } public void Tick(float Dt){ ${FuncName()}(); } }`,
		() => `public static T ${FuncName()}<T>(T Left, T Right) where T : IComparable<T> { return Left.CompareTo(Right) > 0 ? Left : Right; }`,
		() => `using var ${Ident()} = new HttpClient(); var ${Ident()} = await ${Ident()}.GetStringAsync(${StrLit()});`,
		() => `var ${Ident()} = ${Ident()}List.Sum((${Ident()}) => { return ${Ident()}.Score * ${IntLit(2, 9)}; });`,
	],
];

GEN.cpp = [
	[
		() => `${Pick(["int", "long", "short", "unsigned"])} ${Ident()} = ${IntLit()};`,
		() => `std::cout << ${Ident()};`,
		() => "return 0;",
		() => `#include <${Pick(["vector", "string", "map", "memory", "iostream", "cstdint", "algorithm"])}>`,
		() => `bool ${Ident()} = ${Pick(["true", "false"])};`,
		() => `std::string ${Ident()} = ${StrLit()};`,
		() => `float ${Ident()} = ${FloatLit()}f;`,
		() => `char ${Ident()} = '${Pick(ALPHA)}';`,
		() => `auto ${Ident()} = ${IntLit()};`,
		() => `#include <${Pick(["vector","string","map","memory","iostream","cstdint","algorithm","atomic","thread","chrono","regex","future"])}>`,
	],
	[
		() => `std::vector<int> ${Ident()} = {${IntLit()}, ${IntLit()}, ${IntLit()}};`,
		() => { const Step = Pick(LOOPV); return `for(int ${Step} = 0; ${Step} < ${IntLit(5, 99)}; ${Step}++){ ${Ident()} += ${Step}; }`; },
		() => `int *${Ident()} = new int(${IntLit()});`,
		() => `auto ${Ident()} = ${Ident()}Map.find(${StrLit()});`,
		() => `if(${Cond(false, 1)}){ return ${IntLit(1, 9)}; }`,
		() => `int ${FuncName()}(){ return ${IntLit(0, 9)}; }`,
		() => `for(const auto &${Ident()} : ${Ident()}List){ ${FuncName()}(${Ident()}); }`,
		() => `auto ${Ident()} = ${Ident()}List.begin();`,
		() => `std::swap(${Ident()}, ${Ident()});`,
		() => `if(${Ident()} != nullptr){ ${FuncName()}(); }`,
		() => `switch(${Ident()}){ case ${IntLit()}: break; default: break; }`,
		() => `auto ${Ident()} = std::make_shared<${Cap(Pick(NOUNS))}>();`,
	],
	[
		() => { const List = Ident(); return `std::sort(${List}.begin(), ${List}.end(), [](int Left, int Right){ return Left > Right; });`; },
		() => `template <typename T> T ${FuncName()}(T Left, T Right){ return Left + Right; }`,
		() => { const Name = Ident(); return `std::unique_ptr<${Name}> ${Ident()} = std::make_unique<${Name}>(${IntLit()});`; },
		() => { const Item = Ident(); return `for(const auto &${Item} : ${Ident()}List){ std::cout << ${Item} << '\\n'; }`; },
		() => `std::cout << std::hex << (${Ident()} & ${ByteLit()}) << std::endl;`,
		() => `class ${Ident()} : public ${Ident()} { public: void Tick() override; };`,
		() => `std::map<std::string, int> ${Ident()} = { {${StrLit()}, ${IntLit()}}, {${StrLit()}, ${IntLit()}} };`,
		() => `std::unordered_set<int> ${Ident()} = { ${IntLit()}, ${IntLit()}, ${IntLit()} };`,
		() => { const Left = Ident(), Right = Ident(); return `auto ${Ident()} = [&](int ${Left}, int ${Right}){ return ${Left} + ${Right}; };`; },
		() => `std::atomic<int> ${Ident()}{ ${IntLit()} };`,
		() => `std::lock_guard<std::mutex> ${Ident()}(${Ident()}Mutex);`,
	],
	[
		() => `constexpr size_t ${FuncName()}(const int (&)[${IntLit(2, 16)}]){ return ${IntLit(2, 16)}; }`,
		() => { const Hash = Ident(), Char = Ident(); return `uint32_t ${Hash} = (${Hash} ^ (${Char} << 8)) * 16777619u; ${Hash} ^= ${Hash} >> ${IntLit(5, 16)};`; },
		() => `uint8_t ${Ident()} = static_cast<uint8_t>(~${Ident()} & ${ByteLit()});`,
		() => `std::map<std::string, std::vector<int>>::iterator ${Ident()} = ${Ident()}.begin();`,
		() => { const Ptr = Ident(); return `if(auto ${Ptr} = ${Ident()}.lock(); ${Ptr} && ${Ptr}->Hp > 0){ ${Ptr}->Hp -= ${IntLit(1, 9)}; }`; },
		() => `std::thread ${Ident()}([](){ ${FuncName()}(); });`,
		() => `std::future<int> ${Ident()} = std::async(std::launch::async, [](){ return ${IntLit()}; });`,
		() => `std::regex ${Ident()}("${Pick(["\\d+","\\w+","[a-z]+","^x.*"])}");`,
		() => `auto ${Ident()} = std::find_if(${Ident()}List.begin(), ${Ident()}List.end(), [](int X){ return X > ${IntLit()}; });`,
		() => `std::variant<int, float, std::string> ${Ident()} = ${IntLit()};`,
	],
];

GEN.lua = [
	[
		() => `local ${Ident()} = ${IntLit()}`,
		() => `print(${StrLit()})`,
		() => { const Name = Ident(); return `${Name} = ${Name} + ${IntLit(1, 9)}`; },
		() => `return ${Pick(["true", "false", "nil"])}`,
		() => `local ${Ident()} = {}`,
		() => `if(${Cond(true, 0)}) then return end`,
		() => { const Step = Pick(LOOPV); return `for ${Step} = 1, ${IntLit(3, 20)} do print(${Step}) end`; },
		() => `local ${Ident()} = ${StrLit()}`,
		() => `local ${Ident()} = ${FloatLit()}`,
		() => `local ${Ident()} = nil`,
		() => `local ${Ident()} = true`,
		() => `local ${Ident()} = false`,
		() => `${Ident()} = ${Ident()} - ${IntLit(1, 9)}`,
	],
	[
		() => { const Left = Ident(), Right = Ident(); return `local function ${FuncName()}(${Left}, ${Right}) return ${Left} + ${Right} end`; },
		() => { const Key = Ident(), Value = Ident(); return `for ${Key}, ${Value} in pairs(${Ident()}List) do print(${Key}, ${Value}) end`; },
		() => `local ${Ident()} = ${StrLit()} .. " " .. ${StrLit()}`,
		() => { const Count = Ident(); return `while(${Count} < ${IntLit(5, 99)}) do ${Count} = ${Count} + 1 end`; },
		() => `table.insert(${Ident()}List, { Id = ${IntLit()}, Hp = ${IntLit()} })`,
		() => `if(${Cond(true, 1)}) then ${Ident()} = ${Expr(1)} end`,
		() => `for ${Pick(LOOPV)}, ${Ident()} in ipairs(${Ident()}List) do print(${Pick(LOOPV)}, ${Ident()}) end`,
		() => `if(${Ident()} == nil) then ${Ident()} = ${IntLit()} end`,
		() => `local ${Ident()} = #${Ident()}List`,
		() => `local ${Ident()} = ${Ident()} or ${IntLit()}`,
		() => `local ${Ident()} = not ${Ident()}`,
		() => `repeat ${Ident()} = ${Ident()} + 1 until ${Ident()} >= ${IntLit(5, 99)}`,
	],
	[
		() => `local Ok, Err = pcall(function() error(${StrLit()} .. tostring(${Ident()})) end)`,
		() => { const List = Ident(), Index = Pick(LOOPV); return `for ${Index} = #${List}, 1, -1 do if(${List}[${Index}].Dead) then table.remove(${List}, ${Index}) end end`; },
		() => `local ${Ident()} = string.format("%05.2f|%-8s|%x", ${FloatLit()}, ${StrLit()}, ${IntLit(10, 255)})`,
		() => { const Step = Pick(LOOPV); return `local ${Ident()} = coroutine.wrap(function() for ${Step} = 1, ${IntLit(2, 9)} do coroutine.yield(${Step} * ${IntLit(2, 9)}) end end)`; },
		() => `setmetatable(${Ident()}, { __call = function(Self, ...) return select("#", ...) end })`,
		() => `local ${Ident()} = { __index = function(Tbl, Key) return rawget(Tbl, Key) or ${IntLit(0, 9)} end }`,
		() => `local ${Ident()} = {}; for k, v in pairs(${Ident()}) do ${Ident()}[k] = v * ${IntLit(2, 9)} end`,
		() => `local ${Ident()} = string.rep(${StrLit()}, ${IntLit(2, 9)})`,
		() => `local ${Ident()} = string.sub(${Ident()}, ${IntLit(1, 5)}, ${IntLit(6, 20)})`,
		() => `local ${Ident()} = string.find(${Ident()}, "${Pick(WORDS)}")`,
		() => `local ${Ident()} = math.${Pick(["floor","ceil","abs","max","min","sqrt","random"])}(${IntLit()})`,
		() => `local ${Ident()} = table.concat(${Ident()}List, "${Pick([",","|",";"," "])}")`,
	],
	[
		() => { const Left = Ident(), Right = Ident(); return `local ${Ident()} = (${Left} % 2 == 0) and (${Right} ^ 2 + ${IntLit(2, 9)}) or ((${Left} << ${IntLit(1, 8)}) ~ ${Right} & ${ByteLit()})`; },
		() => `string.gsub(${Ident()}, "(%w+)=(%w+)", function(Key, Value) return Key .. Value end)`,
		() => `local ${Ident()} = load("return " .. ${Ident()}, "=eval", "t", { math = math })`,
		() => { const Word = Ident(), Out = Ident(); return `for ${Word} in string.gmatch(${Ident()}, "[^,;]+") do ${Out}[#${Out} + 1] = ${Word}:upper() end`; },
		() => `local ${Ident()} = {[1] = ${StrLit()}, [2] = ${StrLit()}, Key = { X = ${IntLit()}, Y = ${IntLit()} }}`,
		() => `local ${Ident()} = setmetatable({}, { __index = ${Ident()}, __newindex = function(t, k, v) rawset(t, k, v) end })`,
		() => `local ${Ident()} = function(...) local Args = {...} return #Args end`,
		() => `local ${Ident()} = select("#", ${IntLit()}, ${IntLit()}, ${IntLit()})`,
		() => `local ${Ident()} = coroutine.create(function() ${Ident()} = coroutine.yield(${IntLit()}) end)`,
		() => `local ${Ident()} = { [${IntLit()}] = ${StrLit()}, [${IntLit()}] = ${StrLit()} }`,
	],
];

GEN.nasm = [
	[
		() => `mov ${Pick(R32)}, ${IntLit(0, 255)}`,
		() => { const Reg = Pick(R32); return `xor ${Reg}, ${Reg}`; },
		() => `push ${Pick(R32)}`,
		() => `pop ${Pick(R32)}`,
		() => "ret",
		() => `inc ${Pick(R32)}`,
		() => "int 0x80",
		() => `mov ${Pick(R8)}, ${IntLit(0, 255)}`,
		() => `xor ${Pick(R8)}, ${Pick(R8)}`,
		() => `lea ${Pick(R32)}, [${Pick(R32)} + ${IntLit(1, 16)}]`,
		() => `nop`,
		() => `cli`,
		() => `sti`,
		() => `hlt`,
	],
	[
		() => `mov ${Pick(R32)}, [ebp + ${IntLit(4, 24)}]`,
		() => `add ${Pick(R32)}, ${Pick(R32)}`,
		() => `cmp ${Pick(R32)}, ${IntLit(0, 99)}`,
		() => `jne .${Cap(Pick(NOUNS))}`,
		() => `section .${Pick(["text", "data", "bss"])}`,
		() => `global ${Cap(Pick(NOUNS))}`,
		() => `call ${FuncName()}`,
		() => `${Ident()}: db ${StrLit()}, 0x0A`,
		() => `test ${Pick(R32)}, ${Pick(R32)}`,
		() => `and ${Pick(R32)}, ${IntLit(0, 255)}`,
		() => `or ${Pick(R32)}, ${IntLit(0, 255)}`,
		() => `shl ${Pick(R32)}, ${IntLit(1, 8)}`,
		() => `shr ${Pick(R32)}, ${IntLit(1, 8)}`,
		() => `neg ${Pick(R32)}`,
		() => `imul ${Pick(R32)}, ${Pick(R32)}`,
		() => `mov ${Pick(R32)}, [${Pick(R32)} + ${Pick(R32)} * ${Pick([2, 4, 8])}]`,
	],
	[
		() => `mov byte [edi + ecx], ${Pick(R8)}`,
		() => `lea esi, [eax + ebx * ${Pick([2, 4, 8])} + ${IntLit(1, 16)}]`,
		() => "movzx eax, byte [esi + ecx]",
		() => `mov dword [esp + ${Pick([4, 8, 12, 16])}], ${HexLit()}`,
		() => { const Name = Ident(); return `${Name}Len equ $ - ${Name}`; },
		() => `rep movsb ; ${Pick(WORDS)} ${Pick(WORDS)}`,
		() => `cmp byte [esi], ${IntLit(0, 99)}`,
		() => `movzx ${Pick(R32)}, byte [${Pick(R32)}]`,
		() => `movsx ${Pick(R32)}, word [${Pick(R32)}]`,
		() => `cmov${Pick(["e","ne","g","l","ge","le"])} ${Pick(R32)}, ${Pick(R32)}`,
		() => `set${Pick(["e","ne","g","l"])} ${Pick(R8)}`,
		() => `xchg ${Pick(R32)}, ${Pick(R32)}`,
		() => `bswap ${Pick(R32)}`,
		() => `push ${HexLit()}`,
		() => `mov dword [ebp - ${IntLit(4, 32)}], ${Pick(R32)}`,
	],
	[
		() => `cmovne r8d, dword [rsi + rcx * ${Pick([2, 4, 8])} + ${HexLit()}]`,
		() => `${Ident()}: times ${Pick([16, 64, 128, 256])} db 0x00`,
		() => `vpxor ymm${RandInt(0, 7)}, ymm${RandInt(0, 7)}, ymm${RandInt(0, 7)}`,
		() => `lea rdi, [rel ${Ident()}] ; mov rdx, ${IntLit(8, 64)}`,
		() => `mov qword [rsp + ${HexLit()}], ${Pick(R64)} ; and rsp, -16`,
		() => `vpaddd ymm0, ymm1, [rel ${Ident()} + rax * 4 + ${HexLit()}]`,
		() => `lock cmpxchg [${Pick(R32)}], ${Pick(R32)}`,
		() => `lock xadd [${Pick(R32)}], ${Pick(R32)}`,
		() => `cpuid`,
		() => `rdtsc`,
		() => `syscall`,
		() => `vpxor ymm${RandInt(0, 15)}, ymm${RandInt(0, 15)}, ymm${RandInt(0, 15)}`,
		() => `vpaddd ymm${RandInt(0, 15)}, ymm${RandInt(0, 15)}, [${Pick(R64)}]`,
		() => `mfence`,
		() => `sfence`,
		() => `lfence`,
	],
];

GEN.gcode = [
	[
		() => `G0${RandInt(0, 1)} X${IntLit(0, 99)} Y${IntLit(0, 99)}`,
		() => `G00 Z${IntLit(1, 20)}`,
		() => `M104 S${IntLit(150, 260)}`,
		() => `M03 S${Pick([500, 1000, 1500, 2400, 8000])}`,
		() => Pick(["M05", "G28", "M30", "M08", "M09", "G21 G90", "G90", "G91"]),
		() => `T${IntLit(1, 12)} M06`,
		() => `G20`,
		() => `G21`,
		() => `G90`,
		() => `G91`,
		() => `M00`,
		() => `M01`,
		() => `M02`,
		() => `M06`,
		() => `M08`,
		() => `M09`,
	],
	[
		() => `G01 X${Coord()} Y${Coord()} F${IntLit(100, 900)}`,
		() => `G0${RandInt(2, 3)} X${Coord()} Y${Coord()} I${IntLit(1, 20)} J${IntLit(0, 20)}`,
		() => `G${Pick([54, 55, 56, 57])}`,
		() => `G00 X${Coord()} Y${Coord()} Z${IntLit(1, 20)}`,
		() => `M109 S${IntLit(180, 260)}`,
		() => `M140 S${IntLit(50, 110)}`,
		() => `G04 P${IntLit(100, 2000)}`,
		() => `G92 X${IntLit(0, 99)} Y${IntLit(0, 99)} Z${IntLit(0, 99)}`,
		() => `G94 F${IntLit(50, 900)}`,
		() => `G95 F${FloatLit()}`,
		() => `G28 G91 Z0`,
		() => `G28 G91 X0 Y0`,
		() => `G53 G0 Z0`,
		() => `M07`,
		() => `M10`,
		() => `M11`,
	],
	[
		() => `N${IntLit(10, 990)} G41 D${IntLit(1, 9)} G01 X${Coord()} Y${Coord()}`,
		() => `G43 H${IntLit(1, 9)} Z${IntLit(10, 99)} ; ${Pick(WORDS)}`,
		() => `G91 G00 X${Coord()} ; G90`,
		() => `G01 X${Coord()} Y${Coord()} Z-${FloatLit()} F${IntLit(100, 900)}`,
		() => `M104 S${IntLit(180, 260)} ; ${Pick(WORDS)} ${Pick(WORDS)}`,
		() => `G32 X${Coord()} Y${Coord()} F${IntLit(100, 900)}`,
		() => `G73 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} Q${IntLit(1, 9)}`,
		() => `G76 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} P${IntLit(1, 9)}`,
		() => `G81 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} F${IntLit(60, 300)}`,
		() => `G82 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} P${IntLit(1, 9)}`,
	],
	[
		() => `G83 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} Q${IntLit(1, 9)} F${IntLit(60, 300)}`,
		() => `#${IntLit(100, 199)} = [#${IntLit(100, 199)} * ${IntLit(2, 9)} + SQRT[${Pick([4, 9, 16, 25, 36, 49])}]]`,
		() => `G10 L2 P${IntLit(1, 6)} X-${FloatLit()} Y-${FloatLit()} Z-${IntLit(100, 400)}`,
		() => `G17 G21 G40 G49 G80 G90 ; M98 P${IntLit(1000, 1999)} L${IntLit(1, 9)}`,
		() => `IF [#${IntLit(100, 199)} GT ${IntLit(1, 99)}] GOTO ${IntLit(10, 99)}`,
		() => `G84 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)} F${IntLit(60, 300)}`,
		() => `G85 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)}`,
		() => `G86 X${Coord()} Y${Coord()} Z-${IntLit(5, 60)} R${IntLit(1, 5)}`,
		() => `G96 S${IntLit(50, 250)} M3`,
		() => `G97 S${IntLit(500, 3000)} M4`,
		() => `IF [#${IntLit(100, 199)} LT ${IntLit(1, 99)}] GOTO ${IntLit(10, 99)}`,
		() => `WHILE [#${IntLit(100, 199)} LE ${IntLit(1, 99)}] DO ${IntLit(10, 99)}`,
	],
];

/* Чем склеивать операторы в строку. По умолчанию пробел. */
const JOIN = { nasm:" ; " };

/* ═══════════════ ГЕНЕРАТОР ТОКЕНОВ ═══════════════ */
const TOK = {
	bin:(D) => {
		if(D === 0){ return RandStr("01", 4); }
		if(D === 1){ return RandStr("01", 8); }
		if(D === 2){
			const R = Math.random();
			if(R < 0.3){ return "0b" + RandStr("01", RandInt(4, 8)); }
			if(R < 0.6){ return RandStr("01", RandInt(4, 8)); }
			return RandStr("01", RandInt(8, 12));
		}
		const R = Math.random();
		if(R < 0.3){ return "0b" + RandStr("01", RandInt(8, 16)); }
		if(R < 0.5){ return RandStr("01", RandInt(12, 20)); }
		return RandStr("01", RandInt(20, 32));
	},
	hex:(D) => {
		if(D === 0){ return RandStr(HEXL, 2); }
		if(D === 1){ return RandStr(HEXU, 2); }
		if(D === 2){
			const R = Math.random();
			if(R < 0.3){ return "0x" + RandStr(HEXU, Pick([2, 4])); }
			if(R < 0.6){ return "#" + RandStr(HEXM, 3); }
			return RandStr(HEXM, Pick([4, 6]));
		}
		const R = Math.random();
		if(R < 0.25){ return "0x" + RandStr(HEXM, RandInt(4, 8)); }
		if(R < 0.5){ return "#" + RandStr(HEXM, 6); }
		if(R < 0.75){ return RandStr(HEXM, RandInt(4, 8)); }
		return RandStr(HEXM, RandInt(8, 12));
	},
	num:(D) => {
		if(D === 0){ return RandStr(DIG, RandInt(2, 4)); }
		if(D === 1){ return RandStr(DIG, RandInt(4, 7)); }
		const Sign = Math.random() < 0.3 ? "-" : "";
		if(D === 2){
			const R = Math.random();
			if(R < 0.4){ return Sign + RandStr(DIG, RandInt(1, 4)) + (Math.random() < 0.6 ? "." + RandStr(DIG, RandInt(2, 5)) : ""); }
			if(R < 0.7){ return RandInt(1, 9) + "," + RandStr(DIG, 3) + "," + RandStr(DIG, 3); }
			return (Math.random() < 0.5 ? "+" : "-") + "0." + RandStr(DIG, RandInt(3, 6));
		}
		const R = Math.random();
		if(R < 0.25){ return Sign + RandStr(DIG, 1) + "." + RandStr(DIG, RandInt(2, 4)) + "e" + (Math.random() < 0.5 ? "-" : "+") + RandInt(2, 19); }
		if(R < 0.5){ return RandInt(1, 9) + "," + RandStr(DIG, 3) + "," + RandStr(DIG, 3); }
		if(R < 0.75){ return (Math.random() < 0.5 ? "+" : "-") + "0." + RandStr(DIG, RandInt(3, 6)); }
		return RandInt(1, 999) + "." + RandInt(10, 99) + "e" + (Math.random() < 0.5 ? "-" : "+") + RandInt(2, 9);
	},
	sym:(D) => {
		if(D === 0){ return RandStr(SYM1, RandInt(2, 4)); }
		if(D === 1){ return RandStr(SYM2, RandInt(3, 5)); }
		if(D === 2){
			const R = Math.random();
			if(R < 0.4){ return RandStr(ALPHA + DIG + SYM2, RandInt(4, 7)); }
			if(R < 0.7){ return RandStr(SYM2, RandInt(5, 8)); }
			return RandStr(PRINT, RandInt(5, 9));
		}
		const R = Math.random();
		if(R < 0.3){ return RandStr(PRINT, RandInt(4, 8)); }
		if(R < 0.6){ return RandStr(SYM2, RandInt(8, 12)); }
		return RandStr(PRINT, RandInt(8, 14));
	},
	word:(D) => {
		const W = Pick(WORDS);
		if(D <= 1){ return W; }
		if(D === 2){
			const R = Math.random();
			if(R < 0.4){ return W.toUpperCase(); }
			if(R < 0.8){ return Cap(W); }
			return [...W].map((C) => Math.random() < 0.5 ? C.toUpperCase() : C).join("");
		}
		// D === 3
		const R = Math.random();
		if(R < 0.3){ return [...W].map((C) => Math.random() < 0.5 ? C.toUpperCase() : C).join(""); }
		if(R < 0.6){ return W.toUpperCase(); }
		if(R < 0.8){ return Cap(W) + "_" + Pick(WORDS); }
		return W + RandInt(10, 99);
	},
	frag:(D) => {
		if(D === 0){ return Pick(FRAGS.filter((f) => f.length <= 6)); }
		if(D === 1){ return Pick(FRAGS.filter((f) => f.length <= 10)); }
		return Pick(FRAGS);
	},
	code:(D) => {
		GenD = D;
		const Lang = Pick(["lua", "js", "cs", "cpp", "nasm", "gcode"]);
		const Tier = RandInt(0, D);
		return Pick(GEN[Lang][Tier])();
	},
};

TOK.chaos = (D) => {
	const Pool = D === 0 ? [TOK.word, TOK.num, TOK.hex]
		: D === 1 ? [TOK.word, TOK.num, TOK.hex, TOK.sym, TOK.bin]
		: D === 2 ? [TOK.word, TOK.num, TOK.hex, TOK.bin, TOK.sym, TOK.frag, TOK.frag]
		: [TOK.word, TOK.num, TOK.hex, TOK.bin, TOK.sym, TOK.frag, TOK.frag, TOK.code];
	return Pick(Pool)(D);
};

TOK.mix = (D) => {
	const Pool = [
		TOK.word, TOK.num, TOK.hex, TOK.bin, TOK.sym,
		TOK.frag, TOK.frag, TOK.code, TOK.code,
	];
	return Pick(Pool)(D);
};

const TextWord = (D) => {
	let W = Pick(WORDS);
	if(D >= 1 && Math.random() < 0.2){ W += ","; }
	if(D >= 2 && Math.random() < 0.15){ W = Cap(W); }
	if(D >= 2 && Math.random() < 0.12){ return String(RandInt(1, 9999)); }
	if(D >= 3 && Math.random() < 0.15){ W = "\"" + W + "\""; }
	if(D >= 3 && Math.random() < 0.10){ W = W + "."; }
	if(D >= 3 && Math.random() < 0.08){ W = W + "!"; }
	if(D >= 3 && Math.random() < 0.08){ W = W + "?"; }
	return W;
};

const PickTier = (D) => Math.random() < 0.5 ? D : RandInt(0, D);

/* Набирает строку из кусков, пока не дойдёт до минимальной длины. Не лезет за максимум. */
function BuildLine(Make, D, Join){
	const Range = DIFFS[D].len;
	let Line = "", Short = "";
	for(let Try = 0; Try < 30 && Line.length < Range[0]; Try++){
		const Part = Make();
		if(!Short || Part.length < Short.length){ Short = Part; }
		const Next = Line ? Line + Join + Part : Part;
		if(Next.length <= Range[1]){ Line = Next; }
	}
	return Line || Short || "0";
}
function TextLine(D){
	const Body = BuildLine(() => TextWord(D), D, " ").replace(/,+$/, "");
	if(D === 0){ return Body; }
	return Cap(Body) + (D === 1 ? "." : Pick([".", ".", "!", "?", "..."]));
}
function GenLine(Id, D){
	GenD = D;
	if(GEN[Id]){ return BuildLine(() => Pick(GEN[Id][PickTier(D)])(), D, JOIN[Id] || " "); }
	if(Id === "text"){ return TextLine(D); }
	return BuildLine(() => TOK[Id](D), D, " ");
}

/* ═══════════════ ЖИВОЙ КОД ═══════════════ */
function Init(){
	if(window.__tyClean){ try{ window.__tyClean(); }catch(E){} }
	const Root = document.getElementById("ty-root");
	if(!Root){ return; }
	const Q = (Id) => Root.querySelector("#" + Id);
	const Ac = new AbortController(), Sig = Ac.signal;
	const On = (Target, Ev, Fn, Cap) => { Target.addEventListener(Ev, Fn, { signal:Sig, capture:!!Cap }); };
	const Tms = [];
	let Raf = 0;
	window.__tyClean = () => { cancelAnimationFrame(Raf); Ac.abort(); Tms.forEach((T) => { clearTimeout(T); clearInterval(T); }); };

	/* таймер, который убирает себя из списка после срабатывания */
	const Later = (Fn, Ms) => {
		const T = setTimeout(() => {
			const I = Tms.indexOf(T);
			if(I >= 0){ Tms.splice(I, 1); }
			Fn();
		}, Ms);
		Tms.push(T);
		return T;
	};

	const RulesEl = Root.querySelector(".ty-rules");
	if(RulesEl){ RulesEl.innerHTML = RULES; }

	/* ── сохранение (формат не менялся) ── */
	function LoadSave(){
		const O = { rec:{}, mode:MODES[0].id, diff:0, runs:0, chars:0, time:0 };
		try{
			const S = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
			if(S && typeof S === "object"){
				if(S.rec && typeof S.rec === "object"){ O.rec = S.rec; }
				if(MODE[S.mode]){ O.mode = S.mode; }
				O.diff = Math.max(0, Math.min(DIFFS.length - 1, +S.diff || 0));
				["runs", "chars", "time"].forEach((K) => { O[K] = Math.max(0, +S[K] || 0); });
			}
		}catch(E){}
		return O;
	}
	let SV = LoadSave();
	const Save = () => { try{ localStorage.setItem(SAVE_KEY, JSON.stringify(SV)); }catch(E){} };

	let Mode = MODE[SV.mode], Di = SV.diff;
	const G = { state:"menu" };
	let HudT = 0, NoteT = 0, IgnoreUntil = 0, LineId = 0, LastTimeTxt = "";
	const Inp = Q("ty-in");

	/* ── формулы (не менялись) ── */
	const Pressure = () => 1 - Math.exp(-G.t / G.D.tau);
	const ReqNow   = () => (G.D.v0 + (G.D.v1 - G.D.v0) * Pressure()) * G.M.k;
	const ComboMul = () => 1 + Math.min(3, Math.floor(G.combo / 15) * 0.5);
	function Speed(Now){
		const Lim = Now - 4000;
		while(G.stamps.length && G.stamps[0] < Lim){ G.stamps.shift(); }
		return G.stamps.length / Math.max(1.5, Math.min(4, G.t));
	}

	/* ── очередь строк ── */
	function NextLine(){
		let Line = GenLine(G.M.id, G.di);
		for(let Try = 0; Try < 5 && Line === G.lastL; Try++){ Line = GenLine(G.M.id, G.di); }
		return (G.lastL = Line);
	}

	/* ── меню ── */
	function RenderMenu(){
		const Grp = (Name) => MODES.filter((M) => M.grp === Name).map((M) =>
			'<button class="ty-btn ty-chip' + (M.id === Mode.id ? " ty-on" : "") + '" data-m="' + M.id + '">' + M.ico + " " + Esc(M.name) + '</button>').join("");
		Q("ty-m-code").innerHTML = Grp("code");
		Q("ty-m-raw").innerHTML = Grp("raw");
		Q("ty-mdesc").textContent = Mode.desc;
		Q("ty-diffs").innerHTML = DIFFS.map((D, I) => {
			const R = SV.rec[Mode.id + ":" + D.id];
			const A = D.v0 * Mode.k, B = D.v1 * Mode.k;
			return '<button class="ty-dcard' + (I === Di ? " ty-on" : "") + '" data-d="' + I + '" style="--c:' + D.color + '">'
				+ '<b>' + D.name + '</b>'
				+ '<small>' + A.toFixed(1) + ' → ' + B.toFixed(1) + ' зн/с</small>'
				+ '<small>≈ ' + Math.round(A * 12) + ' → ' + Math.round(B * 12) + ' WPM</small>'
				+ '<em>' + (R && R.s ? "🏆 " + FmtN(R.s) : "рекорда нет") + '</em></button>';
		}).join("");
		Q("ty-start").innerHTML = "▶ НАЧАТЬ <b>" + Mode.ico + " " + Esc(Mode.name) + " · " + DIFFS[Di].name + "</b>";
		const R = SV.rec[Mode.id + ":" + DIFFS[Di].id];
		Q("ty-sel").innerHTML = R && R.s
			? "Рекорд: <b>" + FmtN(R.s) + "</b> · " + Math.round(R.w) + " WPM · " + FmtT(R.t) + " · комбо " + R.c + " · точность " + Math.round(R.a) + "% · забегов: " + R.n
			: "Тут ты ещё не играл. Рекорда нет.";
		Q("ty-tot").textContent = "ВСЕГО: забегов " + SV.runs + " · символов " + FmtN(SV.chars) + " · времени " + FmtT(SV.time);
		if(Q("ty-recs").style.display !== "none"){ RenderRecs(); }
	}
	function RenderRecs(){
		let H = '<div class="ty-rg ty-rh"><span></span>' + DIFFS.map((D) => '<span style="color:' + D.color + '">' + D.name + '</span>').join("") + '</div>';
		MODES.forEach((M) => {
			H += '<div class="ty-rg"><span>' + M.ico + " " + Esc(M.name) + '</span>' + DIFFS.map((D) => {
				const R = SV.rec[M.id + ":" + D.id];
				return '<span>' + (R && R.s ? FmtN(R.s) : "—") + '</span>';
			}).join("") + '</div>';
		});
		Q("ty-recs-in").innerHTML = H;
	}
	function ShowMenu(){
		G.state = "menu";
		Q("ty-menu").style.display = "";
		Q("ty-game").style.display = "none";
		Root.classList.remove("ty-low");
		RenderMenu();
	}

	On(Q("ty-menu"), "click", (E) => {
		const M = E.target.closest("[data-m]"), D = E.target.closest("[data-d]");
		if(M){ Mode = MODE[M.dataset.m]; if(document.activeElement){ document.activeElement.blur(); } RenderMenu(); }
		else if(D){ Di = +D.dataset.d; if(document.activeElement){ document.activeElement.blur(); } RenderMenu(); }
	});
	On(Q("ty-start"), "click", () => { document.activeElement.blur(); StartGame(); });
	On(Q("ty-rtog"), "click", () => {
		const B = Q("ty-recs"), Open = B.style.display === "none";
		B.style.display = Open ? "" : "none";
		if(Open){ RenderRecs(); }
	});
	const Rr = Q("ty-rreset");
	let Armed = false, ArmT = 0;
	const Disarm = () => { Armed = false; clearTimeout(ArmT); Rr.textContent = "☠ СБРОСИТЬ ВСЕ РЕКОРДЫ"; Rr.classList.remove("ty-arm"); };
	On(Rr, "click", () => {
		if(!Armed){
			Armed = true; Rr.textContent = "⚠ ТОЧНО? НАЖМИ ЕЩЁ РАЗ"; Rr.classList.add("ty-arm");
			ArmT = Later(Disarm, 4000);
			return;
		}
		Disarm();
		SV = { rec:{}, mode:Mode.id, diff:Di, runs:0, chars:0, time:0 };
		Save(); RenderMenu();
	});

	/* ── игра ── */
	function Pop(Txt, Cls){
		const D = document.createElement("div");
		D.className = "ty-pop " + (Cls || "");
		D.textContent = Txt;
		D.style.left = (28 + Math.random() * 44) + "%";
		Q("ty-pops").appendChild(D);
		Later(() => { D.remove(); }, 1100);
	}
	function Note(Txt){
		const N = Q("ty-note"); N.textContent = Txt;
		clearTimeout(NoteT); NoteT = Later(() => { N.textContent = ""; }, 2600);
	}
	function Shake(){
		const S = Q("ty-stage");
		S.classList.remove("ty-shake"); void S.offsetWidth; S.classList.add("ty-shake");
	}
	function FocusIn(){ try{ Inp.focus({ preventScroll:true }); }catch(E){ Inp.focus(); } }

	/* ═══════════════════════════════════════════════════════════
	   РЕДАКТОР: настоящее поле ввода + рисунок поверх него
	   Поле (#ty-in) невидимое, всю работу с текстом делает браузер.
	   #ty-line рисует цель: по одному span на символ, строятся один раз на строку,
	   дальше меняются только классы. Каретка — один элемент, двигается через transform.
	   ═══════════════════════════════════════════════════════════ */
	const EdIn = Inp;
	const EdLine = Q("ty-line");
	const Ed = { v:"", s:0, e:0, autos:[], lid:-1, tg:[] };
	const ED_OPEN  = { "(":")", "[":"]", "{":"}", "\"":"\"", "'":"'", "`":"`" };
	const ED_CLOSE = ")]}\"'`";
	const MARK_SP  = "\u00b7";

	const EdPlaying = () => G.state === "play" || G.state === "ready";
	const EdCount = (Str, Ch) => {
		let N = 0;
		for(let I = 0; I < Str.length; I++){ if(Str[I] === Ch){ N++; } }
		return N;
	};
	const EdShift = (Arr, P, Rem, Len) => Arr.filter((A) => A < P || A >= P + Rem).map((A) => A < P ? A : A + Len - Rem);

	/* ── пробелы ── обязателен только между двумя словесными символами, если он есть в цели */
	const EdWordRe = /[\p{L}\p{N}_$]/u;
	const EdWord = (C) => C !== undefined && EdWordRe.test(C);

	/* сколько символов без пробелов стоит в V левее позиции P */
	const EdSIdx = (V, P) => {
		let N = 0;
		for(let I = 0; I < P && I < V.length; I++){ if(V[I] !== " "){ N++; } }
		return N;
	};

	/* Gp[K] = в цели перед K-м символом (без пробелов) есть пробел */
	const EdGaps = (Cur) => {
		const Gp = [];
		let K = 0, Sp = false;
		for(let I = 0; I < Cur.length; I++){
			if(SpRe.test(Cur[I])){ Sp = true; continue; }
			Gp[K] = Sp; Sp = false; K++;
		}
		Gp[K] = Sp;
		return Gp;
	};

	/* 0 = пробел не важен, 1 = обязателен, 2 = запрещён (внутри слова) */
	const EdGapMode = (K) => {
		const T = G.tgtS || "";
		if(K <= 0 || K >= T.length){ return 0; }
		if(!EdWord(T[K - 1]) || !EdWord(T[K])){ return 0; }
		return Ed.tg[K] ? 1 : 2;
	};

	/* Sv = набранные символы без пробелов, Gv[K] = перед K-м символом стоит пробел */
	const EdAnalyze = (V) => {
		const Sv = [], Gv = [];
		let Sp = false;
		for(let I = 0; I < V.length; I++){
			if(V[I] === " "){ Sp = true; continue; }
			Gv[Sv.length] = Sp; Sp = false;
			Sv.push(V[I]);
		}
		Gv[Sv.length] = Sp;
		return { Sv, Gv };
	};

	/* строка написана верно: символы совпали и пробелы стоят где нужно */
	const EdOk = (V) => {
		const T = G.tgtS || "";
		const An = EdAnalyze(V);
		if(An.Sv.join("") !== T){ return false; }
		for(let K = 1; K < T.length; K++){
			const M = EdGapMode(K);
			if(M === 1 && !An.Gv[K]){ return false; }
			if(M === 2 && An.Gv[K]){ return false; }
		}
		return true;
	};

	/* позиция в поле перед/после K-го символа без пробелов */
	const EdRawOf = (V, K, After) => {
		let N = 0;
		for(let I = 0; I < V.length; I++){
			if(V[I] === " "){ continue; }
			if(N === K){ return After ? I + 1 : I; }
			N++;
		}
		return V.length;
	};

	/* ── ячейки ── */
	let Cells = [];      // по одной на символ цели + лишние, если набрано больше
	let GapCells = [];   // ячейки обязательных пробелов
	const Caret = document.createElement("i");
	Caret.className = "ty-cur";
	let CaretX = -1, CaretY = -1, CaretH = -1;

	const MkCell = (Txt, K, IsGap) => {
		const El = document.createElement("span");
		El.className = IsGap ? "ty-c ty-sp" : "ty-c";
		El.dataset.k = K;
		if(IsGap){ El.dataset.gap = "1"; }
		El.textContent = Txt;
		return { el:El, k:K, cls:El.className, ov:"", x:null };
	};
	const SetCls = (C, Cls) => { if(C.cls !== Cls){ C.cls = Cls; C.el.className = Cls; } };
	const SetOver = (C, Ov) => {
		if(C.ov === Ov){ return; }
		C.ov = Ov;
		if(!Ov){ if(C.x){ C.x.remove(); C.x = null; } return; }
		if(!C.x){ C.x = document.createElement("i"); C.x.className = "ty-x"; C.el.appendChild(C.x); }
		C.x.textContent = Ov;
	};

	/* строит ячейки под текущую строку (один раз на строку) */
	function BuildCells(){
		const Frag = document.createDocumentFragment();
		Cells = []; GapCells = [];
		let K = 0, Sp = false;
		for(let I = 0; I < G.cur.length; I++){
			const Ch = G.cur[I];
			if(SpRe.test(Ch)){ Sp = true; continue; }
			if(Sp){
				if(EdGapMode(K) === 1){
					const Gc = MkCell(MARK_SP, K, true);
					GapCells.push(Gc);
					Frag.appendChild(Gc.el);
				}else{
					Frag.appendChild(document.createTextNode(" "));
				}
			}
			Sp = false;
			const C = MkCell(Ch, K, false);
			Cells.push(C);
			Frag.appendChild(C.el);
			K++;
		}
		EdLine.textContent = "";
		EdLine.appendChild(Frag);
		EdLine.appendChild(Caret);
		CaretX = CaretY = CaretH = -1;
	}

	/* новая строка: поле очищается, ячейки строятся заново */
	const EdSync = () => {
		if(!G.cur || Ed.lid === G.lid){ return false; }
		Ed.lid = G.lid;
		Ed.v = ""; Ed.s = 0; Ed.e = 0; Ed.autos = [];
		Ed.tg = EdGaps(G.cur);
		EdIn.value = "";
		BuildCells();
		return true;
	};

	const EdSet = (V, S, E2, Au) => {
		Ed.v = V; Ed.autos = Au; Ed.s = S; Ed.e = E2;
		if(EdIn.value !== V){ EdIn.value = V; }
		EdIn.setSelectionRange(S, E2);
	};

	/* каретка: вертикальная линия на границе ячеек */
	function PlaceCaret(El, Right){
		const X = El.offsetLeft + (Right ? El.offsetWidth : 0);
		const Y = El.offsetTop, H = El.offsetHeight;
		if(Caret.style.display !== ""){ Caret.style.display = ""; }
		if(H !== CaretH){ CaretH = H; Caret.style.height = H + "px"; }
		if(X !== CaretX || Y !== CaretY){
			CaretX = X; CaretY = Y;
			Caret.style.transform = "translate(" + X + "px," + Y + "px)";
			Caret.style.animation = "none"; void Caret.offsetWidth; Caret.style.animation = "";
		}
	}
	function HideCaret(){
		if(Caret.style.display !== "none"){ Caret.style.display = "none"; }
		CaretX = CaretY = -1;
	}

	const PaintEditor = () => {
		EdSync();
		if(!G.cur){ return; }
		const V = Ed.v, T = G.tgtS || "";
		const An = EdAnalyze(V), Sv = An.Sv, Gv = An.Gv;
		const Total = Math.max(T.length, Sv.length);

		/* лишние ячейки, если набрано больше цели */
		while(Cells.length < Total){
			const C = MkCell("\u00a0", Cells.length, false);
			Cells.push(C);
			EdLine.insertBefore(C.el, Caret);
		}
		while(Cells.length > Total){ Cells.pop().el.remove(); }

		const A = Math.min(Ed.s, Ed.e), B = Math.max(Ed.s, Ed.e);
		const Ks = EdSIdx(V, A), Sb = EdSIdx(V, B);

		for(let K = 0; K < Total; K++){
			const Tc = Sv[K];
			const Need = K < T.length ? T[K] : "";
			const GapBad = Need !== "" && Gv[K] === true && EdGapMode(K) === 2;
			let Cls = "ty-c", Ov = "";
			if(Tc !== undefined){
				if(Tc !== Need){ Cls += " ty-w"; Ov = Tc; }
				else if(GapBad){ Cls += " ty-w"; Ov = MARK_SP; }
				else{ Cls += " ty-ok"; }
			}else if(GapBad){ Cls += " ty-w"; Ov = MARK_SP; }
			if(K >= Ks && K < Sb){ Cls += " ty-sl"; }
			SetCls(Cells[K], Cls);
			SetOver(Cells[K], Ov);
		}

		for(let I = 0; I < GapCells.length; I++){
			const Gc = GapCells[I];
			let Cls = "ty-c ty-sp";
			if(Gv[Gc.k]){ Cls += " ty-ok"; }
			else if(Sv.length > Gc.k){ Cls += " ty-w"; }
			SetCls(Gc, Cls);
		}

		/* каретка: при выделении скрыта */
		if(A !== B || !Total){ HideCaret(); return; }
		const AfterSp = A > 0 && V[A - 1] === " ";
		if(Ks >= Total){ PlaceCaret(Cells[Total - 1].el, true); }
		else if(Ks === 0 || AfterSp){ PlaceCaret(Cells[Ks].el, false); }
		else{ PlaceCaret(Cells[Ks - 1].el, true); }
	};

	/* ── автозакрытие ── */
	const EdShouldPair = (Ch, V, P) => {
		const Close = ED_OPEN[Ch];
		const Next = V[P + 1];
		if(Next !== undefined && Next !== " " && ED_CLOSE.indexOf(Next) === -1){ return false; }
		if(Close === Ch){
			const Pv = V[P - 1];
			if(Pv && /[\p{L}\p{N}_]/u.test(Pv)){ return false; }
		}
		return EdCount(G.tgtS, Close) > EdCount(V, Close);
	};

	/* ── разбор изменения поля ── */
	const EdDiff = (Old, V) => {
		const Sel = Ed.e - Ed.s;
		const N = V.length - Old.length + Sel;
		if(N >= 0 && V.slice(0, Ed.s) === Old.slice(0, Ed.s) && V.slice(Ed.s + N) === Old.slice(Ed.e)){
			return { P:Ed.s, Rem:Sel, Add:V.slice(Ed.s, Ed.s + N) };
		}
		const C = EdIn.selectionStart;
		const Rm = Old.length - V.length;
		if(Rm > 0 && V.slice(0, C) === Old.slice(0, C) && V.slice(C) === Old.slice(C + Rm)){
			return { P:C, Rem:Rm, Add:"" };
		}
		let P = 0;
		const Min = Math.min(Old.length, V.length);
		while(P < Min && Old[P] === V[P]){ P++; }
		let S = 0;
		while(S < Min - P && Old[Old.length - 1 - S] === V[V.length - 1 - S]){ S++; }
		return { P, Rem:Old.length - P - S, Add:V.slice(P, V.length - S) };
	};

	const EdAfter = () => {
		PaintEditor();
		PaintScore();
		if(G.state === "play" && EdOk(Ed.v)){ FinishLine(); }
	};

	const EdOnInput = (E) => {
		E.stopImmediatePropagation();
		const Old = Ed.v;
		const Now = performance.now();
		if(!EdPlaying() || Now < IgnoreUntil){
			EdSet(Old, Math.min(Ed.s, Old.length), Math.min(Ed.e, Old.length), Ed.autos);
			return;
		}

		const D = EdDiff(Old, EdIn.value);
		const P = D.P, Rem = D.Rem;

		/* пробелы: только обычный " ", без двойных и без пробела в самом начале */
		let Add = D.Add.replace(/\u200b/g, "").replace(/\s+/g, " ");
		if(Add[0] === " " && (P === 0 || Old[P - 1] === " ")){ Add = Add.slice(1); }
		if(Add.length > 0 && Add[Add.length - 1] === " " && Old[P + Rem] === " "){ Add = Add.slice(0, -1); }

		let Au = Ed.autos;

		/* 1) нажал закрывающую, а она уже стоит следующей: шаг через неё */
		if(Add.length === 1 && Rem === 0 && ED_CLOSE.indexOf(Add) !== -1 && Old[P] === Add && Au.indexOf(P) !== -1){
			const Si = EdSIdx(Old, P);
			EdSet(Old, P + 1, P + 1, Au.filter((A) => A !== P));
			if(G.tgtS[Si] === Add){ Verdict(Si, Add, Now); }
			EdAfter();
			return;
		}

		/* 2) Backspace внутри пустой пары: стираются обе */
		if(Add === "" && Rem === 1 && ED_OPEN[Old[P]] && Old[P + 1] === ED_OPEN[Old[P]] && Au.indexOf(P + 1) !== -1){
			EdSet(Old.slice(0, P) + Old.slice(P + 2), P, P, EdShift(Au, P, 2, 0));
			EdAfter();
			return;
		}

		/* 3) обычная правка */
		let V = Old.slice(0, P) + Add + Old.slice(P + Rem);
		const C = P + Add.length;
		Au = EdShift(Au, P, Rem, Add.length);
		if(V.length > G.cur.length * 2 + 24){
			EdSet(Old, Math.min(Ed.s, Old.length), Math.min(Ed.e, Old.length), Ed.autos);
			return;
		}

		/* 4) открывающая скобка или кавычка: физически добавляем парную */
		if(Add.length === 1 && ED_OPEN[Add] && EdShouldPair(Add, V, P)){
			V = V.slice(0, P + 1) + ED_OPEN[Add] + V.slice(P + 1);
			Au = Au.map((A) => A >= P + 1 ? A + 1 : A);
			Au.push(P + 1);
		}

		if(Add.length > 0 && G.state === "ready"){
			G.state = "play"; G.last = Now;
			Q("ty-note").textContent = "";
		}
		EdSet(V, C, C, Au);
		for(let I = 0; I < Add.length; I++){
			if(Add[I] === " "){ continue; }
			Verdict(EdSIdx(V, P + I), Add[I], Now);
		}
		EdAfter();
	};

	/* Читает положение каретки/выделения из поля. Вызывается часто, лишней работы не делает. */
	const EdRead = () => {
		const S = EdIn.selectionStart, E = EdIn.selectionEnd;
		if(S === Ed.s && E === Ed.e){ return; }
		Ed.s = S; Ed.e = E;
		if(EdPlaying() && Ed.s === Ed.e){
			const Now = performance.now();
			Ed.autos = Ed.autos.filter((A) => {
				if(Ed.s > A){
					const Si = EdSIdx(Ed.v, A);
					if(G.tgtS[Si] === Ed.v[A]){ Verdict(Si, Ed.v[A], Now); }
					return false;
				}
				return true;
			});
		}
		PaintEditor();
	};

	/* ── события поля (capture: чужие обработчики не мешают) ── */
	EdIn.setAttribute("autocomplete", "off");
	EdIn.setAttribute("autocorrect", "off");
	EdIn.setAttribute("autocapitalize", "off");
	EdIn.setAttribute("spellcheck", "false");
	EdIn.value = "";

	On(EdIn, "input", EdOnInput, true);
	On(EdIn, "beforeinput", (E) => {
		if(E.inputType === "historyUndo" || E.inputType === "historyRedo"){ E.preventDefault(); return; }
		if(E.data && /[\t\n\r]/.test(E.data)){ E.preventDefault(); return; }
		Ed.s = EdIn.selectionStart;
		Ed.e = EdIn.selectionEnd;
	}, true);
	["paste", "drop"].forEach((Name) => {
		On(EdIn, Name, (E) => { E.preventDefault(); E.stopImmediatePropagation(); }, true);
	});
	["compositionstart", "compositionupdate", "compositionend"].forEach((Name) => {
		On(EdIn, Name, (E) => { E.stopImmediatePropagation(); }, true);
	});
	On(EdIn, "keydown", (E) => {
		if(!EdPlaying() || E.key === "Escape"){ return; }
		E.stopImmediatePropagation();
		Ed.s = EdIn.selectionStart;
		Ed.e = EdIn.selectionEnd;
		const Key = E.key;
		if(Key === "Tab" || Key === "Enter" || Key === "ArrowUp" || Key === "ArrowDown"){ E.preventDefault(); return; }
		if((E.ctrlKey || E.metaKey) && /^[zy]$/i.test(Key)){ E.preventDefault(); return; }
		/* стрелки, Home, End: браузер двигает каретку после этого события, читаем сразу до перерисовки */
		requestAnimationFrame(EdRead);
	}, true);
	On(EdIn, "keyup", EdRead);
	On(EdIn, "select", EdRead);
	On(EdIn, "selectionchange", EdRead);
	On(document, "selectionchange", () => { if(document.activeElement === EdIn){ EdRead(); } });
	On(window, "resize", () => { if(G.cur){ CaretX = CaretY = -1; PaintEditor(); } });

	/* если фокус не в поле, первая же клавиша переводит его туда */
	On(document, "keydown", (E) => {
		if(!EdPlaying() || E.key === "Escape" || E.target === EdIn){ return; }
		if(E.ctrlKey || E.metaKey || E.altKey){ return; }
		FocusIn();
		E.stopImmediatePropagation();
	}, true);

	/* ── мышь: клик и протяжка ставят каретку ── */
	const EdPos = (X, Y) => {
		let Best = Ed.v.length, BestD = 1e9;
		const Els = EdLine.querySelectorAll(".ty-c");
		for(let I = 0; I < Els.length; I++){
			const El = Els[I];
			const R = El.getBoundingClientRect();
			const Dx = X - (R.left + R.width / 2);
			const Dy = Y - (R.top + R.height / 2);
			const Dist = Math.abs(Dy) * 4 + Math.abs(Dx);
			if(Dist >= BestD){ continue; }
			BestD = Dist;
			const Kk = +El.dataset.k;
			if(El.dataset.gap){
				Best = Dx > 0 ? EdRawOf(Ed.v, Kk, false) : EdRawOf(Ed.v, Kk - 1, true);
			}else{
				Best = Dx > 0 ? EdRawOf(Ed.v, Kk, true) : EdRawOf(Ed.v, Kk, false);
			}
		}
		return Math.min(Best, Ed.v.length);
	};
	On(EdLine, "mousedown", (E) => {
		if(E.button !== 0 || !EdPlaying()){ return; }
		E.preventDefault();
		FocusIn();
		const First = EdPos(E.clientX, E.clientY);
		let Anchor = First;
		if(E.shiftKey){ Anchor = EdIn.selectionDirection === "backward" ? EdIn.selectionEnd : EdIn.selectionStart; }
		const Apply = (K) => {
			EdIn.setSelectionRange(Math.min(Anchor, K), Math.max(Anchor, K), K < Anchor ? "backward" : "forward");
			EdRead();
		};
		Apply(First);
		const Move = (M) => { Apply(EdPos(M.clientX, M.clientY)); };
		const Up = () => {
			document.removeEventListener("mousemove", Move);
			document.removeEventListener("mouseup", Up);
		};
		document.addEventListener("mousemove", Move);
		document.addEventListener("mouseup", Up);
	});

	/* ── редкий служебный таймер: вернуть фокус и поправить чужие записи в поле ── */
	Tms.push(setInterval(() => {
		if(!Root.isConnected){ window.__tyClean(); return; }
		if(EdIn.value !== Ed.v && EdPlaying()){
			EdIn.value = Ed.v;
			EdIn.setSelectionRange(Math.min(Ed.s, Ed.v.length), Math.min(Ed.e, Ed.v.length));
		}
		if(EdPlaying() && document.hasFocus() && document.activeElement !== EdIn){ FocusIn(); }
	}, 250));

	/* ═══════════════ конец редактора ═══════════════ */

	function PaintScore(){
		Q("ty-sc").textContent = FmtN(G.score);
		if(G.rec > 0 && G.score > G.rec && !G.beat){
			G.beat = true;
			Pop("★ РЕКОРД ПОБИТ", "ty-pr");
			Q("ty-sc").classList.add("ty-newrec");
		}
		Q("ty-rec").textContent = FmtN(Math.max(G.rec, G.score));
		Q("ty-cb").textContent = G.combo + " · x" + ComboMul().toFixed(1);
	}

	function RenderLine(){
		Q("ty-nx").innerHTML = G.q.slice(1).map((S) => '<div>' + Esc(S) + '</div>').join("");
		PaintEditor();
		EdLine.classList.remove("ty-in"); void EdLine.offsetWidth; EdLine.classList.add("ty-in");
	}

	/* Берёт первую строку очереди, сбрасывает редактор и запускает таймер строки: длина / нужная скорость */
	function LoadLine(){
		G.cur = G.q[0];
		G.tgtS = Strip(G.cur);
		G.lid = ++LineId;
		G.cred = new Set();
		G.lineErrs = 0;
		G.late = false;
		G.lineMax = Math.max(1, G.tgtS.length / ReqNow());
		G.lineLeft = G.lineMax;
		RenderLine();
	}
	function AdvanceLine(){
		G.q.shift(); G.q.push(NextLine());
		LoadLine();
		PaintScore();
	}

	function StartGame(){
		const D = DIFFS[Di];
		SV.mode = Mode.id; SV.diff = Di; Save();
		const Key = Mode.id + ":" + D.id;
		Object.assign(G, {
			state:"ready", D, M:Mode, di:Di, key:Key,
			t:0, pool:D.t0, score:0, combo:0, maxCombo:0, chars:0, errs:0, lines:0, perfect:0, missed:0, lineErrs:0,
			stamps:[], beat:false, rec:(SV.rec[Key] && SV.rec[Key].s) || 0, lastL:"", q:[],
			cred:new Set(), tgtS:"", lineMax:1, lineLeft:1, late:false,
			last:performance.now(), maxLv:1, overAt:0
		});
		for(let I = 0; I < 3; I++){ G.q.push(NextLine()); }
		Q("ty-menu").style.display = "none";
		Q("ty-game").style.display = "";
		Q("ty-over").style.display = "none";
		Q("ty-pause").style.display = "none";
		Q("ty-pops").innerHTML = "";
		Q("ty-sc").classList.remove("ty-newrec");
		Q("ty-gtag").textContent = Mode.ico + " " + Mode.name + " · " + D.name;
		Q("ty-note").textContent = "Раскладка EN, регистр важен. Пробел нужен только между словами (точка ·). Скобки закроются сами. Неверный символ сотри и впиши заново. Таймер пойдёт с первого нажатия.";
		Root.classList.remove("ty-low");
		LastTimeTxt = "";
		LoadLine(); PaintScore(); HudT = 0; Hud(performance.now());
		FocusIn();
		Q("ty-game").scrollIntoView({ block:"nearest" });
	}

	/* Очки и комбо: один раз на позицию цели. Ошибка: комбо в ноль, символ остаётся красным. */
	function Verdict(Si, Ch, Now){
		const Want = G.tgtS[Si];
		if(Ch === Want){
			if(!G.cred.has(Si)){
				G.cred.add(Si);
				G.chars++; G.combo++;
				if(G.combo > G.maxCombo){ G.maxCombo = G.combo; }
				G.score += Math.round(10 * G.D.mul * ComboMul() * (1 + Pressure()));
				G.stamps.push(Now);
				if(G.combo % 25 === 0){ Pop("COMBO " + G.combo, "ty-pc"); }
			}
		}else{
			G.errs++; G.lineErrs++; G.combo = 0;
			if(CyrRe.test(Ch) && !CyrRe.test(Want || "")){ Note("⚠ Похоже, у тебя русская раскладка. Переключи на EN."); }
		}
	}

	/* Строка дописана целиком */
	function FinishLine(){
		const Len = G.tgtS.length;
		let Bonus = 0; const Tags = [];
		G.lines++;
		if(!G.late){
			Bonus = 0.4;
			if(G.lineErrs === 0){
				Bonus += 0.5; G.perfect++;
				G.score += Math.round(Len * 3 * G.D.mul * ComboMul());
				Tags.push("ЧИСТО");
			}
			if((G.lineMax - G.lineLeft) <= G.lineMax / 1.3){ Bonus += G.D.fast; Tags.push("БЫСТРО"); }
		}
		G.pool = Math.min(G.D.tmax, G.pool + Bonus);
		if(!G.late){
			Pop("+" + Bonus.toFixed(1) + "с" + (Tags.length ? " · " + Tags.join(" · ") : ""), Tags.includes("БЫСТРО") ? "ty-pf" : "ty-pg");
		}
		AdvanceLine();
	}

	/* Время строки вышло: штраф один раз */
	function LateLine(){
		if(G.late){ return; }
		G.late = true;
		const Cost = G.D.pen * MISS_K;
		G.pool -= Cost; G.combo = 0; G.missed++;
		Pop("✖ НЕ УСПЕЛ −" + Cost.toFixed(1) + "с", "ty-pr");
		Shake();
		if(G.pool <= 0){ G.pool = 0; PaintScore(); EndGame("time"); return; }
		if(SKIP_ON_MISS){ AdvanceLine(); }else{ PaintScore(); }
	}

	function Hud(Now){
		if(G.state === "menu"){ return; }
		const D = G.D;
		Q("ty-bar").style.width = Math.max(0, G.lineLeft / G.lineMax * 100) + "%";
		const TimeTxt = G.late && G.state !== "over"
			? "ПОЗДНО · допиши, запас тает: " + Math.max(0, G.pool).toFixed(1) + "с"
			: "строка " + Math.max(0, G.lineLeft).toFixed(1) + "с · запас " + Math.max(0, G.pool).toFixed(1) + "с";
		if(TimeTxt !== LastTimeTxt){ LastTimeTxt = TimeTxt; Q("ty-time").textContent = TimeTxt; }
		Root.classList.toggle("ty-low", G.state === "play" && (G.late || G.lineLeft < G.lineMax * 0.2 || G.pool < D.tmax * 0.25));
		if(Now - HudT < 120){ return; }
		HudT = Now;
		const Req = ReqNow(), Cps = Speed(Now), P = Pressure();
		const Lv = Math.min(10, 1 + Math.floor(P * 10));
		if(Lv > G.maxLv){ G.maxLv = Lv; Pop("▲ ДАВЛЕНИЕ " + Lv, "ty-pr"); }
		Q("ty-lv").textContent = P > 0.95 ? "MAX" : Lv + "/10";
		Q("ty-rt").textContent = FmtT(G.t);
		const F = Q("ty-spdf");
		F.style.width = Math.min(100, Cps / (Req * 2) * 100) + "%";
		F.classList.toggle("ty-slow", G.t > 2 && Cps < Req * 0.98);
		Q("ty-spdt").innerHTML = "ТЫ <b>" + Cps.toFixed(1) + "</b> зн/с (" + Math.round(Cps * 12) + " WPM) · НУЖНО <b>" + Req.toFixed(1) + "</b> зн/с (" + Math.round(Req * 12) + " WPM)";
	}

	function EndGame(Why){
		if(G.state === "over" || G.state === "menu"){ return; }
		if(Why === "quit" && G.chars === 0){ ShowMenu(); return; }
		G.state = "over"; G.overAt = performance.now();
		Root.classList.remove("ty-low");
		Q("ty-pause").style.display = "none";
		const Key = G.key;
		const R = SV.rec[Key] || (SV.rec[Key] = { s:0, w:0, t:0, c:0, l:0, a:0, d:0, bt:0, bc:0, bw:0, n:0 });
		const Prev = R.s;
		const Wpm = G.t > 3 ? G.chars / 5 / (G.t / 60) : 0;
		const Acc = G.chars + G.errs ? G.chars / (G.chars + G.errs) * 100 : 100;
		R.n++; R.bt = Math.max(R.bt, G.t); R.bc = Math.max(R.bc, G.maxCombo); R.bw = Math.max(R.bw, Wpm);
		const IsRec = G.score > Prev;
		if(IsRec){ R.s = G.score; R.w = Wpm; R.t = G.t; R.c = G.maxCombo; R.l = G.lines; R.a = Acc; R.d = Date.now(); }
		SV.runs++; SV.chars += G.chars; SV.time += G.t;
		Save();
		if(IsRec && window.__tickerPush){ window.__tickerPush("TYPE " + G.M.name + "/" + G.D.name + ": новый рекорд " + FmtN(G.score)); }

		const St = (K, V) => '<div class="ty-os"><small>' + K + '</small><b>' + V + '</b></div>';
		Q("ty-over").innerHTML =
			'<div class="ty-ovin">'
			+ '<div class="ty-ovh">' + (Why === "time" ? "⛔ ВРЕМЯ ВЫШЛО" : "■ ЗАБЕГ ЗАВЕРШЁН") + '</div>'
			+ '<div class="ty-ovs">' + FmtN(G.score) + '</div>'
			+ (IsRec
				? '<div class="ty-ovr ty-nr">★ ' + (Prev ? "НОВЫЙ РЕКОРД" : "ПЕРВЫЙ РЕКОРД") + (Prev ? " (был " + FmtN(Prev) + ")" : "") + ' ★</div>'
				: '<div class="ty-ovr">Рекорд: ' + FmtN(Prev) + ' · до него ' + FmtN(Prev - G.score) + '</div>')
			+ '<div class="ty-ovm">' + Esc(Why === "time" ? Pick(END_TIME) : Pick(END_QUIT)) + '</div>'
			+ '<div class="ty-ost">'
				+ St("ВРЕМЯ", FmtT(G.t)) + St("СТРОК", G.lines + " · ✖" + G.missed) + St("СИМВОЛОВ", G.chars)
				+ St("СКОРОСТЬ", Math.round(Wpm) + " WPM") + St("ТОЧНОСТЬ", Math.round(Acc) + "%")
				+ St("МАКС. КОМБО", G.maxCombo) + St("ЧИСТЫХ СТРОК", G.perfect) + St("ДАВЛЕНИЕ", G.maxLv >= 10 ? "MAX" : G.maxLv + "/10")
			+ '</div>'
			+ '<div class="ty-ovb"><button class="ty-btn" data-act="again">↻ ЕЩЁ РАЗ <b>Enter</b></button><button class="ty-btn" data-act="menu">☰ МЕНЮ <b>Esc</b></button></div>'
			+ '</div>';
		Q("ty-over").style.display = "flex";
		RenderMenu();
	}
	On(Q("ty-over"), "click", (E) => {
		const B = E.target.closest("[data-act]"); if(!B){ return; }
		if(B.dataset.act === "again"){ StartGame(); }else{ ShowMenu(); }
	});
	On(Q("ty-quit"), "click", () => EndGame("quit"));

	/* ── пауза ── */
	function Pause(){
		if(G.state !== "play"){ return; }
		G.state = "pause";
		Q("ty-pause").style.display = "flex";
	}
	function Resume(){
		if(G.state !== "pause"){ return; }
		G.state = "play"; G.last = performance.now();
		IgnoreUntil = performance.now() + 80;
		Q("ty-pause").style.display = "none";
		FocusIn();
	}
	On(document, "visibilitychange", () => { if(document.hidden){ Pause(); } });
	On(window, "blur", Pause);
	On(Q("ty-pause"), "click", Resume);
	On(Q("ty-stage"), "click", () => { if(G.state === "ready" || G.state === "play"){ FocusIn(); } });

	/* ── служебные клавиши (меню, пауза, конец забега, Esc). Печать идёт через само поле. ── */
	const IsMod = (E) => E.key === "Shift" || E.key === "Control" || E.key === "Alt" || E.key === "Meta" || E.key === "CapsLock";
	On(document, "keydown", (E) => {
		if(!Root.isConnected){ return; }
		const Tag = E.target && E.target.tagName;
		if(G.state === "menu"){
			if(E.key === "Enter" && Tag !== "BUTTON" && Tag !== "INPUT"){ E.preventDefault(); StartGame(); }
			return;
		}
		if(E.key === "Escape"){
			E.preventDefault();
			if(G.state === "over"){ ShowMenu(); }else{ EndGame("quit"); }
			return;
		}
		if(G.state === "over"){
			if(E.key === "Enter" && Tag !== "BUTTON" && performance.now() - G.overAt > 700){ E.preventDefault(); StartGame(); }
			return;
		}
		if(G.state === "pause"){ if(!IsMod(E)){ E.preventDefault(); Resume(); } return; }
	});

	/* ── цикл ── */
	function Frame(Now){
		if(!Root.isConnected){ window.__tyClean(); return; }
		Raf = requestAnimationFrame(Frame);
		if(G.state === "play"){
			const Dt = Math.min(0.1, (Now - G.last) / 1000);
			G.last = Now; G.t += Dt;
			if(G.lineLeft > 0){
				G.lineLeft -= Dt;
				if(G.lineLeft <= 0){
					G.lineLeft = 0;
					LateLine();
				}
			}else{
				/* опоздал: пока строка не дописана, запас тает */
				G.pool -= Dt;
				if(G.pool <= 0){ G.pool = 0; EndGame("time"); }
			}
			if(G.state === "over"){ Hud(Now); return; }
		}
		Hud(Now);
	}
	Raf = requestAnimationFrame(Frame);

	RenderMenu();
}

const Live = () => { try{ Init(); }catch(E){ console.error("[TYPE]", E); } };

/* ═══════════════ РАЗМЕТКА И СТИЛИ ═══════════════ */
return ELEMENT_SITE(`
<style>
#ty-root{ position:relative; max-width:1100px; margin:0 auto; padding:14px; font-family:'Courier New',monospace; color:#e8d9b0; }
#ty-root *{ box-sizing:border-box; }

.ty-head{ text-align:center; margin:4px 0 14px; }
.ty-title{ position:relative; display:inline-block; font-size:34px; letter-spacing:8px; font-weight:bold; color:#ff0044; text-shadow:0 0 14px rgba(255,0,68,.7); }
.ty-title::before,.ty-title::after{ content:attr(data-text); position:absolute; left:0; right:0; top:0; text-align:center; opacity:0; }
.ty-title::before{ color:#00e5ff; clip-path:inset(0 0 60% 0); animation:ty-gl 3.1s steps(1) infinite; }
.ty-title::after { color:#d4af37; clip-path:inset(60% 0 0 0); animation:ty-gl 2.3s steps(1) infinite reverse; }
@keyframes ty-gl{ 0%,90%,100%{opacity:0; transform:translate(0)} 92%,96%{opacity:.85; transform:translate(-3px,0)} 94%{opacity:.85; transform:translate(3px,0)} }
.ty-sub{ margin-top:6px; font-size:12px; color:#8a6a72; letter-spacing:1px; }

.ty-box{ margin-bottom:12px; padding:12px; border:1px solid #3a1020; background:linear-gradient(180deg,#0e060b,#07020a); box-shadow:inset 0 0 0 1px rgba(212,175,55,.06); }
.ty-bh{ font-size:10px; letter-spacing:3px; color:#d4af37; margin-bottom:8px; }
.ty-row{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:6px; align-items:center; }
.ty-rl{ width:88px; font-size:10px; letter-spacing:2px; color:#8a6a72; }
.ty-mdesc{ margin-top:6px; font-size:12px; color:#8a6a72; }

#ty-root .ty-btn{ all:unset; box-sizing:border-box; display:inline-flex; align-items:center; justify-content:center; gap:6px; cursor:pointer; padding:8px 14px; border:1px solid #3a1020; background:linear-gradient(180deg,#1a0a10,#0b0508); color:#e8d9b0; font:13px 'Courier New',monospace; letter-spacing:1px; user-select:none; -webkit-user-select:none; text-align:center; }
#ty-root .ty-btn b{ color:#d4af37; font-weight:normal; }
#ty-root .ty-btn:hover{ border-color:#d4af37; color:#ffd966; box-shadow:0 0 10px rgba(212,175,55,.25); }
#ty-root .ty-btn:active{ background:#2a0a14; }
#ty-root .ty-btn.ty-on{ border-color:#ff0044; color:#ff4d7a; background:linear-gradient(180deg,#2a0510,#14030a); }
#ty-root .ty-btn.ty-arm{ border-color:#ff0044; color:#fff; background:#7a0022; animation:ty-blink .6s steps(2) infinite; }
@keyframes ty-blink{ 50%{ background:#ff0044 } }

.ty-diffs{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:8px; }
#ty-root .ty-dcard{ all:unset; box-sizing:border-box; display:flex; flex-direction:column; gap:3px; padding:10px 12px; cursor:pointer; border:1px solid #2a0a14; border-left:3px solid var(--c); background:rgba(0,0,0,.4); user-select:none; -webkit-user-select:none; font-family:'Courier New',monospace; }
#ty-root .ty-dcard b{ color:var(--c); font-size:16px; letter-spacing:2px; }
#ty-root .ty-dcard small{ font-size:11px; color:#8a6a72; }
#ty-root .ty-dcard em{ font-style:normal; font-size:12px; color:#d4af37; margin-top:3px; }
#ty-root .ty-dcard:hover{ background:rgba(212,175,55,.07); }
#ty-root .ty-dcard.ty-on{ background:rgba(255,0,68,.12); box-shadow:0 0 14px color-mix(in srgb, var(--c) 40%, transparent); border-color:var(--c); }

.ty-startrow{ display:flex; flex-wrap:wrap; align-items:center; gap:12px; margin-bottom:12px; }
#ty-root #ty-start{ padding:14px 26px; font-size:16px; border-color:#ff0044; color:#fff; background:linear-gradient(180deg,#7a0022,#3a0010); box-shadow:0 0 18px rgba(255,0,68,.35); }
#ty-root #ty-start:hover{ box-shadow:0 0 26px rgba(255,0,68,.7); color:#ffd966; }
.ty-sel{ flex:1; min-width:220px; font-size:12px; color:#c9b88a; line-height:1.6; }
.ty-sel b{ color:#d4af37; font-size:15px; }
.ty-rules{ font-size:12px; line-height:1.9; color:#c9b88a; }
.ty-rules b{ color:#ffd966; font-weight:normal; }
.ty-tot{ font-size:11px; color:#6a4a55; margin:6px 0; }
.ty-rg{ display:grid; grid-template-columns:1.4fr repeat(4,1fr); gap:4px; padding:5px 4px; border-bottom:1px solid #2a0a14; font-size:12px; }
.ty-rg span:not(:first-child){ text-align:right; color:#d4af37; }
.ty-rh{ font-size:10px; letter-spacing:2px; }

.ty-gtop{ display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:8px; margin-bottom:8px; }
.ty-gtag{ font-size:13px; letter-spacing:3px; color:#ff4d7a; }
.ty-hud{ display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:8px; margin-bottom:8px; }
.ty-hb{ padding:7px 10px; border:1px solid #2a0a14; background:rgba(0,0,0,.35); }
.ty-hb small{ display:block; font-size:9px; letter-spacing:2px; color:#8a6a72; }
.ty-hb b{ font-size:17px; color:#d4af37; font-weight:normal; }
.ty-hb .ty-big{ font-size:24px; color:#ffd966; text-shadow:0 0 10px rgba(212,175,55,.5); }
.ty-hb .ty-newrec{ color:#7aff9a; text-shadow:0 0 14px rgba(122,255,154,.9); }

.ty-tbar{ position:relative; height:26px; border:1px solid #3a1020; background:#120509; overflow:hidden; }
#ty-bar{ height:100%; width:100%; background:repeating-linear-gradient(135deg,#ff0044 0 10px,#b3002f 10px 20px); transition:width .1s linear; }
#ty-time{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:13px; color:#fff; text-shadow:0 1px 3px #000; letter-spacing:2px; }
.ty-low .ty-tbar{ animation:ty-lowp .4s steps(2) infinite; border-color:#ff0044; }
@keyframes ty-lowp{ 50%{ box-shadow:0 0 18px #ff0044 } }

.ty-spd{ margin:8px 0; }
.ty-spdm{ position:relative; height:8px; border:1px solid #2a0a14; background:#120509; }
#ty-spdf{ height:100%; width:0; background:linear-gradient(90deg,#1d6b3a,#7aff9a); transition:width .2s; }
#ty-spdf.ty-slow{ background:linear-gradient(90deg,#7a0022,#ff0044); }
.ty-spdm i{ position:absolute; left:50%; top:-3px; bottom:-3px; width:2px; background:#d4af37; }
#ty-spdt{ display:block; margin-top:4px; font-size:11px; color:#8a6a72; }
#ty-spdt b{ color:#e8d9b0; font-weight:normal; }

.ty-stage{ position:relative; min-height:270px; padding:26px 22px; border:1px solid #3a1020; overflow:hidden;
	box-shadow:inset 0 0 40px rgba(0,0,0,.8), 0 0 0 1px rgba(212,175,55,.08);
	background:radial-gradient(ellipse at 50% 30%, rgba(122,0,34,.2), transparent 70%),
		repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,.015) 3px 4px), #07020a; }
.ty-low .ty-stage{ box-shadow:inset 0 0 70px rgba(255,0,68,.45), 0 0 0 1px rgba(255,0,68,.5); }
.ty-shake{ animation:ty-sh .2s linear; }
@keyframes ty-sh{ 0%,100%{ translate:0 0 } 25%{ translate:-4px 0 } 50%{ translate:4px 0 } 75%{ translate:-2px 0 } }

/* ── строка-цель, ошибки, каретка ── */
#ty-line{ position:relative; padding-top:.6em; font:bold 26px/1.95 'Courier New',monospace; white-space:pre-wrap; overflow-wrap:anywhere; color:#b9a58a; letter-spacing:1px; cursor:text; user-select:none; -webkit-user-select:none; }
#ty-line.ty-in{ animation:ty-in .15s ease-out; }
@keyframes ty-in{ from{ opacity:.2; translate:0 8px } to{ opacity:1; translate:0 0 } }
#ty-line .ty-c{ position:relative; border-radius:2px; }
#ty-line .ty-ok{ color:#7aff9a; text-shadow:0 0 6px rgba(122,255,154,.45); }
#ty-line .ty-sp{ color:rgba(212,175,55,.55); font-weight:900; }
#ty-line .ty-sp.ty-ok{ color:#7aff9a; }
#ty-line .ty-w{ color:#fff; background:rgba(255,0,68,.65); box-shadow:0 0 0 1px #ff0044, 0 0 10px rgba(255,0,68,.55); text-shadow:none; }
#ty-line .ty-sl{ background-image:linear-gradient(rgba(0,229,255,.35),rgba(0,229,255,.35)); }
#ty-line .ty-x{ position:absolute; left:50%; top:-1.05em; transform:translateX(-50%); padding:0 3px; border-radius:2px; font-style:normal; font-weight:900; font-size:.5em; line-height:1.15; white-space:pre; color:#1a0006; background:#ffd966; text-shadow:none; pointer-events:none; z-index:7; }
#ty-line .ty-cur{ position:absolute; left:0; top:0; width:2px; height:1.2em; margin-left:-1px; background:#ffd966; box-shadow:0 0 8px #ffd966; pointer-events:none; z-index:8; will-change:transform; animation:ty-cb 1s steps(1) infinite; }
@keyframes ty-cb{ 50%{ opacity:0 } }

.ty-nx{ margin-top:18px; font:16px/1.5 'Courier New',monospace; color:#4a3a40; overflow-wrap:anywhere; white-space:pre-wrap; }
.ty-nx div:first-child{ color:#6a5560; }
.ty-note{ margin-top:14px; min-height:16px; font-size:12px; color:#ff9db5; }
.ty-in-h{ position:absolute; left:0; top:0; width:1px; height:1px; opacity:0; border:0; padding:0; margin:0; outline:none; background:transparent; color:transparent; pointer-events:none; }

.ty-pops{ position:absolute; inset:0; pointer-events:none; }
.ty-pop{ position:absolute; top:8px; transform:translateX(-50%); white-space:nowrap; font-size:15px; font-weight:bold; animation:ty-pop 1.1s ease-out forwards; text-shadow:0 0 8px currentColor; }
.ty-pg{ color:#7aff9a; } .ty-pf{ color:#00e5ff; } .ty-pc{ color:#ffd966; } .ty-pr{ color:#ff4d7a; font-size:18px; }
@keyframes ty-pop{ from{ opacity:1; top:34px } to{ opacity:0; top:0 } }

.ty-ov{ position:absolute; inset:0; display:none; align-items:center; justify-content:center; z-index:5; background:rgba(5,0,3,.93); text-align:center; padding:14px; }
.ty-ovin{ width:100%; max-width:560px; }
.ty-ovh{ font-size:13px; letter-spacing:4px; color:#ff4d7a; }
.ty-ovs{ font-size:46px; font-weight:bold; color:#ffd966; text-shadow:0 0 18px rgba(212,175,55,.6); margin:4px 0; }
.ty-ovr{ font-size:13px; color:#8a6a72; margin-bottom:4px; }
.ty-ovr.ty-nr{ color:#7aff9a; text-shadow:0 0 12px rgba(122,255,154,.7); font-size:16px; animation:ty-lowp .7s steps(2) infinite; }
.ty-ovm{ font-size:12px; color:#6a4a55; margin-bottom:10px; }
.ty-ost{ display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:12px; }
.ty-os{ padding:6px; border:1px solid #2a0a14; background:rgba(0,0,0,.4); }
.ty-os small{ display:block; font-size:8px; letter-spacing:1px; color:#8a6a72; }
.ty-os b{ font-size:14px; color:#d4af37; font-weight:normal; }
.ty-ovb{ display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
.ty-pausein{ font-size:18px; letter-spacing:4px; color:#ffd966; line-height:2; }
.ty-pausein small{ display:block; font-size:12px; letter-spacing:1px; color:#8a6a72; }

@media (max-width:700px){
	#ty-line{ font-size:17px; }
	.ty-ost{ grid-template-columns:repeat(2,1fr); }
	.ty-rl{ width:100%; }
	.ty-rg{ font-size:10px; }
}
</style>

<div id="ty-root">
	<div class="ty-head">
		<div class="ty-title" data-text="⌨ TYPΞ">⌨ TYPΞ</div>
		<div class="ty-sub">печатай быстрее, чем GOLU успеет тебя удалить</div>
	</div>

	<div id="ty-menu">
		<div class="ty-box">
			<div class="ty-bh">РЕЖИМ</div>
			<div class="ty-row"><span class="ty-rl">КОД</span><span id="ty-m-code" class="ty-row" style="margin:0"></span></div>
			<div class="ty-row"><span class="ty-rl">СИМВОЛЫ</span><span id="ty-m-raw" class="ty-row" style="margin:0"></span></div>
			<div class="ty-mdesc" id="ty-mdesc"></div>
		</div>
		<div class="ty-box">
			<div class="ty-bh">СЛОЖНОСТЬ · нужная скорость растёт от первого числа ко второму</div>
			<div class="ty-diffs" id="ty-diffs"></div>
		</div>
		<div class="ty-startrow">
			<button class="ty-btn" id="ty-start">▶ НАЧАТЬ</button>
			<div class="ty-sel" id="ty-sel"></div>
		</div>
		<div class="ty-box">
			<div class="ty-bh">КАК ИГРАТЬ</div>
			<div class="ty-rules"></div>
		</div>
		<div class="ty-box">
			<div class="ty-bh">🏆 РЕКОРДЫ</div>
			<div class="ty-row">
				<button class="ty-btn" id="ty-rtog">▾ ПОКАЗАТЬ ВСЕ</button>
				<button class="ty-btn" id="ty-rreset">☠ СБРОСИТЬ ВСЕ РЕКОРДЫ</button>
			</div>
			<div class="ty-tot" id="ty-tot"></div>
			<div id="ty-recs" style="display:none"><div id="ty-recs-in"></div></div>
		</div>
	</div>

	<div id="ty-game" style="display:none">
		<div class="ty-gtop">
			<div class="ty-gtag" id="ty-gtag"></div>
			<button class="ty-btn" id="ty-quit">■ ЗАВЕРШИТЬ <b>Esc</b></button>
		</div>
		<div class="ty-hud">
			<div class="ty-hb"><small>ОЧКИ</small><b class="ty-big" id="ty-sc">0</b></div>
			<div class="ty-hb"><small>РЕКОРД</small><b id="ty-rec">0</b></div>
			<div class="ty-hb"><small>КОМБО</small><b id="ty-cb">0 · x1.0</b></div>
			<div class="ty-hb"><small>ДАВЛЕНИЕ</small><b id="ty-lv">1/10</b></div>
			<div class="ty-hb"><small>В ЗАБЕГЕ</small><b id="ty-rt">0:00</b></div>
		</div>
		<div class="ty-tbar"><div id="ty-bar"></div><span id="ty-time">0.0с</span></div>
		<div class="ty-spd"><div class="ty-spdm"><div id="ty-spdf"></div><i></i></div><span id="ty-spdt"></span></div>
		<div class="ty-stage" id="ty-stage">
			<div class="ty-pops" id="ty-pops"></div>
			<div id="ty-line"></div>
			<div class="ty-nx" id="ty-nx"></div>
			<div class="ty-note" id="ty-note"></div>
			<input class="ty-in-h" id="ty-in" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="ввод">
			<div class="ty-ov" id="ty-pause"><div class="ty-pausein">⏸ ПАУЗА<small>клик или любая клавиша, чтобы продолжить</small></div></div>
			<div class="ty-ov" id="ty-over"></div>
		</div>
	</div>
</div>
`, () => {}, false, Live);

});