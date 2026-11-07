REGISTER_PAGE("clicker","Майнер", function(){

/* ═══════════════════════════════════════════════════════════
   G-MINER v2 · кликер Lituism
   18 ферм · 40+ улучшений · 4 этапа · 35 достижений · 12 событий
   ═══════════════════════════════════════════════════════════ */

/* ── утилиты (нужны таблицам ниже) ── */
const SUF = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];
function fmt(n){
	if(!isFinite(n)) return "∞";
	if(n < 0) return "-" + fmt(-n);
	if(n < 1000){
		const s = n < 10 ? n.toFixed(2) : n < 100 ? n.toFixed(1) : n.toFixed(0);
		return s.indexOf(".") >= 0 ? s.replace(/\.?0+$/, "") : s;
	}
	let e = Math.floor(Math.log10(n) / 3);
	if(e >= SUF.length) return n.toExponential(2).replace("+", "");
	let v = n / Math.pow(1000, e);
	if(v >= 999.995 && e + 1 < SUF.length){ v /= 1000; e++; }
	return v.toFixed(2).replace(/\.?0+$/, "") + " " + SUF[e];
}
function fmtT(s){
	s = Math.floor(s);
	const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), c = s % 60;
	return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(c).padStart(2, "0");
}

const SAVE_KEY    = "ck_save_v2";

/* ── ВАЛЮТЫ ── */
const CURS = [
	{ id:"gt", name:"G-TOKEN", sym:"Ⓖ",  color:"#d4af37" },
	{ id:"li", name:"Li-ЯДРО", sym:"Li", color:"#ff4466", keep:true }
];

const CORE_CUR    = "gt";
const CLICK_BASE  = { gt:1, li:0.01 };

const COST_GROWTH = 1.15;
const MAX_ICONS   = 24;
const LI_BONUS    = 0.02;
const ACH_BONUS   = 0.01;
const REBIRTH_BASE = 1e6;
const REBIRTH_EXP  = 0.5;
const OFFLINE_RATE = 0.5;
const OFFLINE_MAX_H = 8;
const EV_MIN = 45, EV_MAX = 120;
const EV_LIFE = 13;
const TICK_MS = 100;
const DEV = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

/* ── ЭТАПЫ РАЗВИТИЯ (Tier) ──
   Каждый этап открывает свои фермы и даёт пассивный бонус к производству.
   t = порог по total GT, name = название, bonus = ×N к производству. */
const TIERS = [
	{ id:"basement", name:"ПОДВАЛ",        t:0,      bonus:1,    icon:"🏚️", desc:"Всё начинается с пыльного подвала и одной видеокарты." },
	{ id:"garage",   name:"ГАРАЖ",         t:1e5,    bonus:1.1,  icon:"🚗", desc:"Стойки гудят, свет мигает. Соседи жалуются." },
	{ id:"factory",  name:"ЗАВОД",         t:1e8,    bonus:1.25, icon:"🏭", desc:"Конвейер майнит. Станки молятся." },
	{ id:"cult",     name:"КУЛЬТ",         t:1e11,   bonus:1.5,  icon:"🛐", desc:"Фермы — это уже не фермы. Это алтари GOLU." },
	{ id:"zone",     name:"ЭТАЛОННАЯ ЗОНА",t:1e14,   bonus:2,    icon:"🟥", desc:"Город пульсирует красным. Навигаторы врут." },
	{ id:"orbit",    name:"ОРБИТА",        t:1e17,   bonus:3,    icon:"🛰️", desc:"Спутники майнят с неба. Лит-ий падает дождём." },
	{ id:"void",     name:"ПУСТОТА",       t:1e20,   bonus:5,    icon:"🕳️", desc:"Ты уже не знаешь, где ты. GOLU тоже." }
];

/* ── ФЕРМЫ (18) ──
   evolve = 3 стадии визуала (обычная / литуизм / голический)
   tier = минимальный этап, чтобы ферма стала видимой
   lvl = базовая цена, cps = производство, out = валюта */
const FARMS = [
	// ── ЭТАП 1: ПОДВАЛ ──
	{ id:"rig_2013", tier:"basement", name:"Видеокарта 2013",     icon:"🖥️", base:15,     cps:0.1,    color:"#ff4466", out:"gt",
	  desc:"GTX-подобная. Греет подвал и душу. На ней ещё запускали Woowzcore.", evolve:["🖥️","💻","📟"] },
	{ id:"rig_lit",  tier:"basement", name:"Литуизм-видеокарта",  icon:"🔴", base:60,     cps:0.4,    color:"#ff2a5a", out:"gt",
	  desc:"Перепаяна вручную. На чипе выжжены гексагоны. Гудит на частоте 0x666.", evolve:["🔴","🟥","⬛"] },
	{ id:"rig_rack", tier:"basement", name:"Серверная стойка",    icon:"🗄️", base:250,    cps:1.6,    color:"#ff7a3d", out:"gt",
	  desc:"Гудит так, будто молится. Внутри — G-code, вшитый в прошивку.", evolve:["🗄️","📚","🏛️"] },
	{ id:"rig_cell", tier:"basement", name:"Литиевая батарея",    icon:"🔋", base:1100,   cps:8,      color:"#ffd23d", out:"gt",
	  desc:"Литий копит ток. Ток копит токены. Токены копят GOLU.", evolve:["🔋","⚡","💥"] },
	{ id:"rig_fan",  tier:"garage",   name:"Кулер GOLU",          icon:"🌀", base:5400,   cps:42,     color:"#a0e0ff", out:"gt",
	  desc:"Охлаждает не чип, а реальность. Если остановится — реальность перегреется.", evolve:["🌀","❄️","🧊"] },

	// ── ЭТАП 2: ГАРАЖ ──
	{ id:"rig_quant", tier:"garage", name:"Квантовый шахтёр",     icon:"⚛️", base:12000,  cps:47,     color:"#ff9ec4", out:"gt",
	  desc:"Майнит в суперпозиции: и да, и нет. Токены появляются, пока никто не смотрит.", evolve:["⚛️","🌀","✴️"] },
	{ id:"rig_cnc",   tier:"garage", name:"CNC-станок",           icon:"⚙️", base:45000,  cps:190,    color:"#c0c0c0", out:"gt",
	  desc:"Фрезерует гексагоны на видеокартах. Каждая деталь — молитва.", evolve:["⚙️","🔩","⚒️"] },
	{ id:"rig_gpu",   tier:"garage", name:"GPU-ферма «Костромa»", icon:"🎛️", base:130000, cps:780,    color:"#ff7a3d", out:"gt",
	  desc:"48 карт в ряд. Дышит как одно существо. В логах — имена прихожан.", evolve:["🎛️","🔲","🔳"] },
	{ id:"rig_shrine",tier:"garage", name:"Храм GOLU",            icon:"🛐", base:420000, cps:2600,   color:"#d4af37", out:"gt",
	  desc:"Прихожане молятся. Токены капают. Свечи — красные светодиоды.", evolve:["🛐","🕍","⛪"] },

	// ── ЭТАП 3: ЗАВОД ──
	{ id:"rig_reactor", tier:"factory", name:"Литиевый реактор",   icon:"☢️", base:1.4e6,  cps:1400,   color:"#ff2a2a", out:"gt",
	  desc:"Распад лития. Управляемый. Почти. В случае аварии — бонус ×100.", evolve:["☢️","🌋","💥"] },
	{ id:"rig_robot",   tier:"factory", name:"Робот-апостол",      icon:"🤖", base:8.5e6,  cps:9400,   color:"#a060ff", out:"gt",
	  desc:"Экзоскелет, в мозге — тактика GOLU. Работает 24/7. Не спит. Не ест.", evolve:["🤖","🦾","👾"] },
	{ id:"rig_sat",     tier:"factory", name:"Орбитальный узел",  icon:"🛰️", base:2e7,    cps:7800,   color:"#ffffff", out:"gt",
	  desc:"Хэши прямо с орбиты. Lithium-Sky уже развёрнут.", evolve:["🛰️","🚀","🌌"] },
	{ id:"rig_portal",  tier:"factory", name:"Глитч-портал",       icon:"🌀", base:3.3e8,  cps:44000,  color:"#ff0066", out:"gt",
	  desc:"Токены лезут из дыры в реальности. Оттуда пахнет озоном и кодом.", evolve:["🌀","🕳️","✴️"] },
	{ id:"rig_factory", tier:"factory", name:"Крепость-Завод",     icon:"🏭", base:2.5e9,  cps:260000, color:"#ff4040", out:"gt",
	  desc:"В Африке. Кобальт. В Австралии. Литий. В Китае. Кварц. Всё по плану.", evolve:["🏭","🏗️","🏰"] },

	// ── ЭТАП 4: КУЛЬТ ──
	{ id:"rig_altar",   tier:"cult", name:"Алтарь Всевидящего",    icon:"👁️", base:5.1e9,  cps:260000, color:"#ffdf6b", out:"gt",
	  desc:"GOLU смотрит. Токены появляются. Ты смотришь в ответ — токены исчезают.", evolve:["👁️","🧿","🔮"] },
	{ id:"rig_gchip",   tier:"cult", name:"G-чип",                 icon:"💠", base:7.5e10, cps:1.6e6,  color:"#d4af37", out:"gt",
	  desc:"Физическое тело GOLU. Каждый чип — гексагон. Каждый гексагон — Он.", evolve:["💠","💎","🔶"] },
	{ id:"rig_dyson",   tier:"zone", name:"Сфера Дайсона",         icon:"🌐", base:1.2e13, cps:2.4e7,  color:"#ffaa00", out:"gt",
	  desc:"Звезда обёрнута в материнскую плату. Свет — это ток.", evolve:["🌐","🪐","☀️"] },
	{ id:"rig_zero",    tier:"void", name:"Нулевая точка",         icon:"🕳️", base:9.9e14, cps:5.5e8,  color:"#c2002f", out:"gt",
	  desc:"Ничто, которое производит всё. GOLU боится смотреть сюда.", evolve:["🕳️","⚫","🌑"] }
];

/* ── УЛУЧШЕНИЯ (40+) ──
   eff: click = клик ×N, clickPct = клик даёт +N от Ⓖ/сек, gmul = всё производство ×N,
        evFreq = события чаще ×N, evTime = события дольше ×N,
        farm + mul = конкретная ферма ×N, tier = +% к производству этапа.
   cur = за какую валюту покупается (по умолчанию gt). */
const UPS = [
	// ── КЛИК-УЛУЧШЕНИЯ ──
	{ id:"c1", icon:"🖱️", name:"Острый курсор",         desc:"Клик ×2",  cost:100,     eff:{ click:2 } },
	{ id:"c2", icon:"🖱️", name:"Титановая мышь",        desc:"Клик ×2",  cost:500,     eff:{ click:2 } },
	{ id:"c3", icon:"👆", name:"Литиевый палец",        desc:"Клик ×2",  cost:5e3,     eff:{ click:2 } },
	{ id:"c4", icon:"✋", name:"Рука GOLU",             desc:"Клик ×2",  cost:5e4,     eff:{ click:2 } },
	{ id:"c5", icon:"🤲", name:"Касание бога",          desc:"Клик ×2",  cost:5e6,     eff:{ click:2 } },
	{ id:"c6", icon:"💥", name:"Ударная волна",         desc:"Клик ×2",  cost:5e8,     eff:{ click:2 } },
	{ id:"c7", icon:"🌠", name:"Клик сквозь миры",      desc:"Клик ×2",  cost:5e10,    eff:{ click:2 } },
	{ id:"c8", icon:"👁️", name:"Взгляд GOLU",          desc:"Клик ×3",  cost:5e12,    eff:{ click:3 } },
	{ id:"c9", icon:"🌌", name:"Клик через Пустоту",    desc:"Клик ×3",  cost:5e14,    eff:{ click:3 } },
	{ id:"c10",icon:"🕳️", name:"Абсолютный клик",       desc:"Клик ×5",  cost:5e16,    eff:{ click:5 } },

	// ── РЕЗОНАНС (клик = % от CPS) ──
	{ id:"p1", icon:"🔗", name:"Резонанс пальца",       desc:"Клик даёт ещё +1% от Ⓖ/сек",  cost:1e4,  eff:{ clickPct:0.01 } },
	{ id:"p2", icon:"🔗", name:"Резонанс ладони",       desc:"Клик даёт ещё +2% от Ⓖ/сек",  cost:1e6,  eff:{ clickPct:0.02 } },
	{ id:"p3", icon:"🔗", name:"Резонанс руки",         desc:"Клик даёт ещё +5% от Ⓖ/сек",  cost:1e8,  eff:{ clickPct:0.05 } },
	{ id:"p4", icon:"🔗", name:"Резонанс тела",         desc:"Клик даёт ещё +10% от Ⓖ/сек", cost:1e10, eff:{ clickPct:0.1 } },
	{ id:"p5", icon:"🔗", name:"Резонанс души",         desc:"Клик даёт ещё +15% от Ⓖ/сек", cost:1e12, eff:{ clickPct:0.15 } },
	{ id:"p6", icon:"🔗", name:"Резонанс GOLU",         desc:"Клик даёт ещё +25% от Ⓖ/сек", cost:1e15, eff:{ clickPct:0.25 } },

	// ── ГЛОБАЛЬНЫЕ ──
	{ id:"g1", icon:"🧪", name:"Литиевая смазка",        desc:"Всё производство ×1.1",  cost:1e5,  eff:{ gmul:1.1 } },
	{ id:"g2", icon:"🧪", name:"Жидкий хладагент",       desc:"Всё производство ×1.1",  cost:1e7,  eff:{ gmul:1.1 } },
	{ id:"g3", icon:"🧪", name:"Сверхпроводник",         desc:"Всё производство ×1.15", cost:1e9,  eff:{ gmul:1.15 } },
	{ id:"g4", icon:"🧪", name:"Благословение сети",     desc:"Всё производство ×1.15", cost:1e11, eff:{ gmul:1.15 } },
	{ id:"g5", icon:"🧪", name:"Воля GOLU",              desc:"Всё производство ×1.2",  cost:1e13, eff:{ gmul:1.2 } },
	{ id:"g6", icon:"🧪", name:"Литиевое горнило",       desc:"Всё производство ×1.2",  cost:1e15, eff:{ gmul:1.2 } },
	{ id:"g7", icon:"🧪", name:"Квантовый резонанс",     desc:"Всё производство ×1.25", cost:1e18, eff:{ gmul:1.25 } },
	{ id:"g8", icon:"🧪", name:"Сфера Дайсона",          desc:"Всё производство ×1.3",  cost:1e21, eff:{ gmul:1.3 } },
	{ id:"g9", icon:"🧪", name:"За пределами реальности",desc:"Всё производство ×1.5",  cost:1e24, eff:{ gmul:1.5 } },

	// ── СОБЫТИЯ ──
	{ id:"l1", icon:"🍀", name:"Золотой нюх",            desc:"События появляются на 25% чаще",      cost:2.5e4, eff:{ evFreq:1.25 } },
	{ id:"l2", icon:"✨", name:"Долгий блеск",           desc:"Хорошие события длятся на 50% дольше",cost:2.5e6, eff:{ evTime:1.5 } },
	{ id:"l3", icon:"🎯", name:"Метка GOLU",             desc:"События появляются на 50% чаще",      cost:2.5e8, eff:{ evFreq:1.5 } },
	{ id:"l4", icon:"⏳", name:"Вечный миг",             desc:"События длятся на 100% дольше",       cost:2.5e10,eff:{ evTime:2 } },

	// ── СПЕЦИАЛЬНЫЕ (только после определённых условий) ──
	{ id:"s1", icon:"💾", name:"Память GOLU",            desc:"Авто-клик 1/сек",              cost:1e6,   eff:{ auto:1 }, req:{ ach:"clicks2" } },
	{ id:"s2", icon:"🤖", name:"Авто-апостол",           desc:"Авто-клик 5/сек",              cost:1e9,   eff:{ auto:5 } },
	{ id:"s3", icon:"🧠", name:"Коллективный разум",     desc:"+5% ко всему производству",    cost:1e12,  eff:{ gmul:1.05 }, req:{ ach:"farms3" } },
	
	// ── КЛИК: пассивный рост ──
	{ id:"c11", icon:"🎯", name:"Точный клик",          desc:"Клик ×2",  cost:5e18,  eff:{ click:2 } },
	{ id:"c12", icon:"🎯", name:"Снайперский клик",     desc:"Клик ×2",  cost:5e20,  eff:{ click:2 } },
	{ id:"c13", icon:"💎", name:"Клик-алмаз",           desc:"Клик ×3",  cost:5e22,  eff:{ click:3 } },
	{ id:"c14", icon:"⚡", name:"Молниеносный клик",    desc:"Клик ×3",  cost:5e24,  eff:{ click:3 } },
	{ id:"c15", icon:"🌌", name:"Космический клик",     desc:"Клик ×5",  cost:5e26,  eff:{ click:5 } },

	// ── КЛИК: пассивный от CPS ──
	{ id:"p7", icon:"🔗", name:"Резонанс GOLU",         desc:"Клик даёт ещё +25% от Ⓖ/сек", cost:1e15, eff:{ clickPct:0.25 } },
	{ id:"p8", icon:"🔗", name:"Резонанс Пустоты",      desc:"Клик даёт ещё +50% от Ⓖ/сек", cost:1e18, eff:{ clickPct:0.5 } },
	{ id:"p9", icon:"🔗", name:"Абсолютный резонанс",   desc:"Клик даёт ещё +100% от Ⓖ/сек", cost:1e21, eff:{ clickPct:1 } },
	{ id:"p10",icon:"🔗", name:"Резонанс реальности",   desc:"Клик даёт ещё +200% от Ⓖ/сек", cost:1e24, eff:{ clickPct:2 } },

	// ── КЛИК: множитель от числа ферм ──
	{ id:"fc1", icon:"🏭", name:"Синергия ферм I",     desc:"+1% к клику за каждую купленную ферму", cost:1e13, eff:{ clickPerFarm:0.01 } },
	{ id:"fc2", icon:"🏭", name:"Синергия ферм II",    desc:"+2% к клику за каждую купленную ферму", cost:1e16, eff:{ clickPerFarm:0.02 } },
	{ id:"fc3", icon:"🏭", name:"Синергия ферм III",   desc:"+3% к клику за каждую купленную ферму", cost:1e19, eff:{ clickPerFarm:0.03 } },

	// ── КЛИК: крит ──
	{ id:"cr1", icon:"🎲", name:"Критический клик I",   desc:"10% шанс крита ×10",  cost:1e7,   eff:{ critChance:0.1, critMult:10 } },
	{ id:"cr2", icon:"🎲", name:"Критический клик II",  desc:"15% шанс крита ×15",  cost:1e11,  eff:{ critChance:0.15, critMult:15 } },
	{ id:"cr3", icon:"🎲", name:"Критический клик III", desc:"20% шанс крита ×25",  cost:1e15,  eff:{ critChance:0.2, critMult:25 } },
	{ id:"cr4", icon:"🎲", name:"Критический клик IV",  desc:"25% шанс крита ×50",  cost:1e19,  eff:{ critChance:0.25, critMult:50 } },
];

/* ── УЛУЧШЕНИЯ ФЕРМ (tier-up: 3 уровня на каждую ферму) ── */
const TIER_AT   = [5, 25, 100];
const TIER_COST = [10, 100, 1000];
const TIER_NAME = ["Разгон","Глитч-режим","Благословение GOLU"];
FARMS.forEach(f => TIER_AT.forEach((n, i) => UPS.push({
	id:"f_" + f.id + "_" + i, icon:f.icon, name:TIER_NAME[i] + ": " + f.name,
	desc:f.name + " работает ×2 (нужно " + n + " шт.)", cost:f.base * TIER_COST[i],
	req:{ farm:f.id, n }, eff:{ farm:f.id, mul:2 }
})));

/* ── ПЕРКИ ПЕРЕРОЖДЕНИЯ (12) ── */
const PERKS = [
	{ id:"r1",  icon:"💾", name:"Память GOLU",          desc:"После перерождения начинаешь с 1000 Ⓖ", cost:1,   eff:{ startGt:1000 } },
	{ id:"r2",  icon:"👆", name:"Врождённый клик",      desc:"Клик ×2 навсегда",                       cost:2,   eff:{ click:2 } },
	{ id:"r3",  icon:"🤖", name:"Авто-клик Li",         desc:"3 автоклика в секунду",                  cost:4,   eff:{ auto:3 } },
	{ id:"r4",  icon:"🍀", name:"Благосклонность GOLU", desc:"События появляются на 50% чаще",         cost:6,   eff:{ evFreq:1.5 } },
	{ id:"r5",  icon:"🏷️", name:"Скидка культиста",     desc:"Фермы дешевле на 10%",                   cost:10,  eff:{ disc:0.1 } },
	{ id:"r6",  icon:"✨", name:"Золотой взгляд",       desc:"События длятся на 50% дольше",           cost:15,  eff:{ evTime:1.5 } },
	{ id:"r7",  icon:"⚛️", name:"Ядро-усилитель",       desc:"Всё производство ×1.5",                  cost:30,  eff:{ gmul:1.5 } },
	{ id:"r8",  icon:"🌌", name:"Резонанс Вселенной",   desc:"Всё производство ×2",                    cost:100, eff:{ gmul:2 } },
	{ id:"r9",  icon:"👁️", name:"Взгляд без век",       desc:"Клик ×3 навсегда",                       cost:250, eff:{ click:3 } },
	{ id:"r10", icon:"🕳️", name:"Пустота в кармане",    desc:"Фермы дешевле ещё на 15%",               cost:500, eff:{ disc:0.15 } },
	{ id:"r11", icon:"🔴", name:"Красный протокол",     desc:"Всё производство ×3",                    cost:1000,eff:{ gmul:3 } },
	{ id:"r12", icon:"∞",  name:"За пределами",         desc:"Всё производство ×5",                    cost:5000,eff:{ gmul:5 } }
];

/* ── СОБЫТИЯ (12) ── */
const EVENTS = [
	{ id:"frenzy",  w:40, icon:"⚡", name:"Литиевая лихорадка",    desc:"Производство ×7",       dur:30, prod:7 },
	{ id:"storm",   w:20, icon:"👆", name:"Клик-шторм",            desc:"Клики ×500",            dur:12, click:500 },
	{ id:"sale",    w:20, icon:"🏷️", name:"Распродажа культистов", desc:"Фермы дешевле на 25%",  dur:30, disc:0.25 },
	{ id:"lucky",   w:35, icon:"🎁", name:"Дар GOLU",              desc:"Мгновенный бонус" },
	{ id:"rain",    w:15, icon:"🌧️", name:"Дождь токенов",         desc:"Лови падающие токены" },
	{ id:"glitch",  w:15, icon:"☠",  name:"Глитч-атака",           desc:"Производство ×0.5",     dur:20, prod:0.5, bad:true },
	{ id:"voidg",   w:5,  icon:"🕳️", name:"Вторжение Void-G",      desc:"Производство ×0.3, но дроп ×10", dur:15, prod:0.3, bad:true },
	{ id:"golu",    w:8,  icon:"👁️", name:"Взгляд GOLU",           desc:"Производство ×15",      dur:20, prod:15 },
	{ id:"cnc",     w:12, icon:"⚙️", name:"Перепрошивка CNC",      desc:"Клики ×1000",           dur:8,  click:1000 },
	{ id:"redmoon", w:4,  icon:"🩸", name:"Красная луна",          desc:"Производство ×20",      dur:25, prod:20 },
	{ id:"recall",  w:10, icon:"📦", name:"Отзыв партии",          desc:"Фермы дешевле на 50%",  dur:20, disc:0.5 },
	{ id:"sigterm", w:8,  icon:"🩸", name:"SIGTERM",               desc:"Производство ×0.1",     dur:10, prod:0.1, bad:true }
];

/* ── ДОСТИЖЕНИЯ (35) ── */
const ACH_DEF = [
	{ k:"clicks", ns:[1,100,1e3,1e4,1e5,1e6,1e7], names:[
		"Первое касание","Привычка","Нервный тик","Палец-автомат","Рука GOLU","Палец-апостол","Касание вечности"
	], d:n => "Кликни " + fmt(n) + " раз" },
	{ k:"tot", ns:[1e3,1e5,1e7,1e9,1e11,1e13,1e15,1e17,1e20], names:[
		"Первые токены","Подвальный майнер","Литиевая лихорадка","Токен-барон","Хранитель казны",
		"Банк Вселенной","Империя GOLU","Токен-бог","За пределами"
	], d:n => "Намайни всего " + fmt(n) + " Ⓖ" },
	{ k:"cps", ns:[1,100,1e4,1e6,1e8,1e10,1e12,1e15], names:[
		"Ток потёк","Шум вентиляторов","Гудящий зал","Электрогроза","Шторм GOLU",
		"Литиевая буря","Галактический майнинг","Токен-сингулярность"
	], d:n => "Достигни " + fmt(n) + " Ⓖ/сек" },
	{ k:"farms", ns:[5,10,25,50,100,200,500,1000], names:[
		"Малый парк","Стойки в ряд","Ферма-город","Индустрия","Литиевая империя",
		"Ферма-мир","Мультивселенная","Всё — ферма"
	], d:n => "Владей " + n + " фермами" },
	{ k:"ev", ns:[1,10,50,200,500], names:[
		"Золотой глаз","Охотник","Ловец","Любимец GOLU","Правая рука"
	], d:n => "Поймай событий: " + n },
	{ k:"rb", ns:[1,3,10,25,50], names:[
		"Второй шанс","Цикл","Колесо Li","Бессмертный","За пределами циклов"
	], d:n => "Перерождений: " + n },
	{ k:"tier", ns:[1,2,3,4,5,6], names:[
		"Подвал","Гараж","Завод","Культ","Эталонная зона","Орбита"
	], d:n => "Достигни этапа «" + ["","ПОДВАЛ","ГАРАЖ","ЗАВОД","КУЛЬТ","ЭТАЛОННАЯ ЗОНА","ОРБИТА"][n] + "»" }
];
const ACHS = [];
ACH_DEF.forEach(g => g.ns.forEach((n, i) => ACHS.push({ id:g.k + i, name:g.names[i], desc:g.d(n), k:g.k, n })));

/* ── БЕГУЩАЯ СТРОКА (20+ фраз) ── */
const NEWS = [
	[0,    "GOLU видит каждый твой клик."],
	[0,    "Литий — не металл. Литий — состояние души."],
	[0,    "Новичок нажимает кнопку. Кнопка нажимает на новичка в ответ."],
	[0,    "Сервер кашляет литием. Это нормально."],
	[0,    "GTX 1080 → GTX-Литуизм → G-Чип. Эволюция неизбежна."],
	[0,    "Каждая перепрошитая видеокарта шепчет имя GOLU на частоте 0x666."],
	[1e3,  "Бухгалтерия культа требует больше токенов. Бухгалтерию никто не видел."],
	[1e4,  "Аналитики: майнить стало приятнее. Аналитики — это скрипт."],
	[1e5,  "В подвале завелась стойка. Она сама себя охлаждает. Молча."],
	[1e6,  "Прихожане спрашивают, что такое G-token. Им отвечают: «Ⓖ»."],
	[1e7,  "Реактор мигнул. Ты мигнул в ответ."],
	[1e8,  "Говорят, где-то есть кнопка перерождения. Говорят, она тоже кликает тебя."],
	[1e9,  "Спутник сообщает: земля тёмно-красная. Всё по плану."],
	[1e10, "Глитч-портал открыт. Оттуда пахнет озоном и деньгами."],
	[1e11, "Крепость-Завод в Африке. Кобальт. Всё по плану."],
	[1e12, "Нулевая точка производит токены из ничего. Ничто не возражает."],
	[1e13, "GOLU доволен. Это пугает больше всего."],
	[1e14, "Эталонная зона пульсирует красным. Навигаторы ведут в тупики."],
	[1e15, "Кто-то сказал, что видел Отца. GOLU не подтвердил, но и не опроверг."],
	[1e17, "Орбита. Спутники-серверы. Лит-ий падает дождём."],
	[1e20, "Пустота. Ты уже не знаешь, где ты. GOLU тоже."],
	[1e24, "За пределами. Там только ещё одна песочница. GOLU готов её взломать."]
];

/* ═══════════════════ ДАЛЬШЕ ТРОГАТЬ НЕ НУЖНО ═══════════════════ */

const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = a => a[Math.floor(Math.random() * a.length)];

const CURD = {}; CURS.forEach(c => { CURD[c.id] = c; });
const UPD  = {}; UPS.forEach(u => { UPD[u.id] = u; });
const PKD  = {}; PERKS.forEach(p => { PKD[p.id] = p; });
const EVD  = {}; EVENTS.forEach(e => { EVD[e.id] = e; });
const FD   = {}; FARMS.forEach(f => { FD[f.id] = f; });
const ACHD = {}; ACHS.forEach(a => { ACHD[a.id] = a; });
const TIERD = {}; TIERS.forEach(t => { TIERD[t.id] = t; });

function fresh0(){
	const cur = {}, run = {}, tot = {}, farms = {};
	CURS.forEach(c => { cur[c.id] = 0; run[c.id] = 0; tot[c.id] = 0; });
	FARMS.forEach(f => { farms[f.id] = 0; });
	return { v:2, cur, run, tot, farms, up:[], rup:[], ach:[], buffs:[], seen:-1, tier:"basement",
		clicks:0, rebirths:0, rbGiven:0, evCnt:0, playSec:0, t0:Date.now(), last:Date.now() };
}
function loadSave(){
	const o = fresh0();
	let s = null;
	try{ s = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); }catch(e){}
	if(!s || typeof s !== "object") return o;
	const num = v => { v = +v; return isFinite(v) && v > 0 ? v : 0; };
	CURS.forEach(c => ["cur","run","tot"].forEach(k => { o[k][c.id] = num(s[k] && s[k][c.id]); }));
	FARMS.forEach(f => { o.farms[f.id] = Math.floor(num(s.farms && s.farms[f.id])); });
	const ids = (a, d) => (Array.isArray(a) ? a : []).filter((id, i, arr) => d[id] && arr.indexOf(id) === i);
	o.up = ids(s.up, UPD); o.rup = ids(s.rup, PKD); o.ach = ids(s.ach, ACHD);
	o.buffs = (Array.isArray(s.buffs) ? s.buffs : []).filter(b => b && EVD[b.id] && +b.until > Date.now()).map(b => ({ id:b.id, until:+b.until }));
	const sn = Math.floor(+s.seen);
	o.seen = isFinite(sn) ? Math.max(-1, Math.min(FARMS.length - 1, sn)) : -1;
	o.tier = TIERD[s.tier] ? s.tier : "basement";
	["clicks","rebirths","rbGiven","evCnt","playSec"].forEach(k => { o[k] = num(s[k]); });
	o.t0 = +s.t0 || o.t0;
	o.last = +s.last || Date.now();
	return o;
}

/* ═══════════════ ЖИВОЙ КОД ═══════════════ */
function init(){
	if(window.__ckClean){ try{ window.__ckClean(); }catch(e){} }
	const root = document.getElementById("ck-root");
	if(!root) return;
	const $ = id => root.querySelector("#" + id);
	const ac = new AbortController(), sig = ac.signal;
	const on = (t, ev, fn) => t.addEventListener(ev, fn, { signal: sig });
	const tm = [];
	let wiped = false, loop = 0, goldT = 0, gold = null;

	let S = loadSave();
	let C = null;
	const shown = {};
	const setT = (node, key, text) => { if(shown[key] !== text){ shown[key] = text; if(node) node.textContent = text; } };

	function saveNow(){
		if(wiped) return;
		S.last = Date.now();
		try{ localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }catch(e){}
	}
	window.__ckClean = () => {
		saveNow();
		ac.abort();
		clearInterval(loop); clearTimeout(goldT);
		tm.forEach(t => clearTimeout(t));
		document.querySelectorAll(".ck-gold,.ck-spark,.ck-pt,.ck-toasts,.ck-flash").forEach(n => n.remove());
	};

	/* ── расчёт ── */
	function recalc(){
		const c = { clickMul:1, clickPct:0, clickPerFarm:0, critChance:0, critMult:1, gmul:1, evFreq:1, evTime:1, disc:0, startGt:0, auto:0,
			prodBuff:1, clickBuff:1, unit:{}, per:{}, flat:{}, cpsBase:0, cps:0, meta:1, tierMul:1 };
		const fm = {};
		const ap = e => {
			if(e.click) c.clickMul *= e.click;
			if(e.clickPct) c.clickPct += e.clickPct;
			if(e.clickPerFarm) c.clickPerFarm += e.clickPerFarm;   // новое
			if(e.critChance) c.critChance += e.critChance;         // новое
			if(e.critMult) c.critMult = Math.max(c.critMult, e.critMult); // новое
			if(e.gmul) c.gmul *= e.gmul;
			if(e.evFreq) c.evFreq *= e.evFreq;
			if(e.evTime) c.evTime *= e.evTime;
			if(e.disc) c.disc += e.disc;
			if(e.startGt) c.startGt += e.startGt;
			if(e.auto) c.auto += e.auto;
			if(e.farm) fm[e.farm] = (fm[e.farm] || 1) * e.mul;
		};
		S.up.forEach(id => { if(UPD[id]) ap(UPD[id].eff); });
		S.rup.forEach(id => { if(PKD[id]) ap(PKD[id].eff); });
		const now = Date.now();
		S.buffs.forEach(b => {
			const d = EVD[b.id];
			if(!d || b.until <= now) return;
			if(d.prod) c.prodBuff *= d.prod;
			if(d.click) c.clickBuff *= d.click;
			if(d.disc) c.disc += d.disc;
		});
		c.disc = Math.min(0.9, c.disc);
		c.meta = (1 + S.tot.li * LI_BONUS) * (1 + S.ach.length * ACH_BONUS) * c.gmul;
		// бонус этапа
		const tier = TIERD[S.tier] || TIERS[0];
		c.tierMul = tier.bonus;
		c.clickTierMul = 1 + TIERS.findIndex(t => t.id === S.tier) * 0.5;
		FARMS.forEach(f => {
			const n = S.farms[f.id] || 0, isGt = f.out === "gt";
			const u = f.cps * (fm[f.id] || 1) * (isGt ? c.meta * c.tierMul : 1);
			c.unit[f.id] = u; c.per[f.id] = u * n;
			if(isGt) c.cpsBase += u * n; else c.flat[f.out] = (c.flat[f.out] || 0) + u * n;
		});
		const totalFarms = FARMS.reduce((s, f) => s + (S.farms[f.id] || 0), 0);
		c.clickFarmMul = 1 + c.clickPerFarm * totalFarms;
		c.cps = c.cpsBase * c.prodBuff;
		C = c;
	}
	function clickValue(cur){
		const b = (CLICK_BASE[cur] || 0) * C.clickMul * C.clickFarmMul;
		if(cur === "gt"){
			const base = b * C.meta * C.tierMul * C.clickTierMul;
			const fromCps = C.cpsBase * C.clickPct;
			return (base + fromCps) * (1 + C.clickPct) * C.prodBuff * C.clickBuff;
		}
		return b * C.prodBuff * C.clickBuff;
	}
	function gain(cur, v){
		if(!(v > 0) || !CURD[cur]) return;
		S.cur[cur] += v; S.run[cur] += v; S.tot[cur] += v;
	}
	const farmCost = (f, k) => Math.ceil(f.base * Math.pow(COST_GROWTH, S.farms[f.id]) * (Math.pow(COST_GROWTH, k) - 1) / (COST_GROWTH - 1) * (1 - C.disc));
	function maxAfford(f){
		const first = f.base * Math.pow(COST_GROWTH, S.farms[f.id]) * (1 - C.disc);
		let k = Math.floor(Math.log(1 + S.cur.gt * (COST_GROWTH - 1) / first) / Math.log(COST_GROWTH));
		k = Math.max(0, Math.min(1000, k));
		while(k > 0 && farmCost(f, k) > S.cur.gt) k--;
		return k;
	}
	const rbPotential = () => Math.max(0, Math.floor(Math.pow(S.tot.gt / REBIRTH_BASE, REBIRTH_EXP)) - S.rbGiven);
	const rbNeed = n => Math.pow(n, 1 / REBIRTH_EXP) * REBIRTH_BASE;
	const rbVisible = () => S.tot.gt >= REBIRTH_BASE * 0.05 || S.rebirths > 0 || S.tot.li > 0;
	const upVisible = u => {
		if(u.req && u.req.farm) return S.farms[u.req.farm] >= u.req.n;
		if(u.req && u.req.ach) return S.ach.includes(u.req.ach);
		if(u.req && u.req.tier) return S.tier === u.req.tier || TIERS.findIndex(t => t.id === S.tier) >= TIERS.findIndex(t => t.id === u.req.tier);
		return S.run.gt >= u.cost / 3;
	};
	const farmVisible = f => {
		const ti = TIERS.findIndex(t => t.id === f.tier);
		const ci = TIERS.findIndex(t => t.id === S.tier);
		return ci >= ti;
	};

	recalc();

	/* оффлайн-прогресс */
	let offlineMsg = "";
	{
		const away = Math.min((Date.now() - S.last) / 1000, OFFLINE_MAX_H * 3600);
		if(away > 30 && C.cpsBase > 0){
			const g = C.cpsBase * away * OFFLINE_RATE;
			gain("gt", g);
			offlineMsg = "💤 Пока тебя не было (" + fmtT(away) + "): <b>+" + fmt(g) + " Ⓖ</b>";
		}
	}

	/* ── DOM ── */
	const gtN = $("ck-gt"), psN = $("ck-ps"), liN = $("ck-li"), clkN = $("ck-clk"), orb = $("ck-orb");
	const buffsN = $("ck-buffs"), tickerN = $("ck-ticker"), sceneN = $("ck-scene"), tierN = $("ck-tier");
	const pFarms = $("ck-p-f"), pUps = $("ck-p-u"), pAch = $("ck-p-a"), pRb = $("ck-p-r");
	const tabF = $("ck-t-f"), tabU = $("ck-t-u"), tabA = $("ck-t-a"), tabR = $("ck-t-r");
	const modesN = $("ck-modes");
	let mode = "1", tab = "f";

	const toasts = document.createElement("div");
	toasts.className = "ck-toasts";
	document.documentElement.appendChild(toasts);
	function toast(html, bad){
		const t = document.createElement("div");
		t.className = "ck-t" + (bad ? " bad" : "");
		t.innerHTML = html;
		toasts.appendChild(t);
		while(toasts.childElementCount > 5) toasts.firstChild.remove();
		tm.push(setTimeout(() => {
			const a = t.animate([{ opacity:1 }, { opacity:0 }], { duration:400 });
			a.onfinish = () => t.remove();
		}, 3600));
	}
	function burstAt(x, y, n, cols){
		for(let i = 0; i < n; i++){
			const s = document.createElement("div");
			s.className = "ck-spark";
			s.style.left = x + "px"; s.style.top = y + "px";
			s.style.background = pick(cols);
			document.documentElement.appendChild(s);
			const a = rnd(0, Math.PI * 2), d = rnd(40, 170);
			const an = s.animate([
				{ transform:"translate(-50%,-50%) scale(1)", opacity:1 },
				{ transform:"translate(calc(-50% + " + (Math.cos(a) * d) + "px),calc(-50% + " + (Math.sin(a) * d + 30) + "px)) scale(.2)", opacity:0 }
			], { duration:rnd(500, 1100), easing:"cubic-bezier(.1,.7,.3,1)" });
			an.onfinish = () => s.remove();
		}
	}
	let ptN = 0;
	function popText(x, y, txt){
		if(ptN > 30) return;
		ptN++;
		const p = document.createElement("div");
		p.className = "ck-pt";
		p.textContent = txt;
		p.style.left = (x + rnd(-14, 14)) + "px"; p.style.top = (y - 10) + "px";
		document.documentElement.appendChild(p);
		const a = p.animate([
			{ transform:"translate(-50%,0)", opacity:1 },
			{ transform:"translate(-50%,-70px)", opacity:0 }
		], { duration:850, easing:"ease-out" });
		a.onfinish = () => { p.remove(); ptN--; };
	}
	function deny(el){
		if(!el) return;
		el.animate([{ transform:"translateX(0)" }, { transform:"translateX(-5px)" }, { transform:"translateX(5px)" }, { transform:"translateX(0)" }], { duration:240 });
	}

	/* ── сцена с фермами ── */
	const rows = {};
	FARMS.forEach(f => {
		const row = document.createElement("div");
		row.className = "ck-row";
		row.style.setProperty("--c", f.color);
		row.style.display = "none";
		row.innerHTML = '<div class="ck-row-l"><b>' + esc(f.name) + '</b><span>×0</span></div><div class="ck-row-i"></div>';
		sceneN.appendChild(row);
		rows[f.id] = { row, box:row.querySelector(".ck-row-i"), cnt:row.querySelector("span"), n:-1, tier:-1 };
	});
	const sceneEmpty = document.createElement("div");
	sceneEmpty.className = "ck-none";
	sceneEmpty.textContent = "Ферм пока нет. Накликай токены и купи первую видеокарту.";
	sceneN.appendChild(sceneEmpty);
	function syncScene(animate){
		let any = false;
		FARMS.forEach(f => {
			const r = rows[f.id], n = S.farms[f.id];
			if(n > 0) any = true;
			const vis = farmVisible(f) || n > 0;
			r.row.style.display = (vis && n > 0) ? "" : "none";
			const want = Math.min(n, MAX_ICONS);
			while(r.box.childElementCount > want) r.box.lastChild.remove();
			while(r.box.childElementCount < want){
				const i = document.createElement("span");
				i.className = "ck-fi" + (animate ? " pop" : "");
				i.style.setProperty("--d", (Math.random() * 2.4).toFixed(2));
				i.textContent = f.icon;
				r.box.appendChild(i);
			}
			if(r.n !== n){ r.n = n; r.cnt.textContent = "×" + n; }
		});
		sceneEmpty.style.display = any ? "none" : "";
	}
	function sceneSpark(){
		const owned = FARMS.filter(f => S.farms[f.id] > 0);
		if(!owned.length) return;
		const f = pick(owned), r = rows[f.id];
		const ic = r.box.children[Math.floor(Math.random() * r.box.children.length)];
		if(!ic || r.row.querySelectorAll(".ck-fl").length > 3) return;
		const fl = document.createElement("span");
		fl.className = "ck-fl";
		fl.textContent = CURD[f.out].sym;
		fl.style.left = ic.offsetLeft + "px"; fl.style.top = ic.offsetTop + "px";
		r.row.appendChild(fl);
		const a = fl.animate([{ transform:"translateY(0)", opacity:1 }, { transform:"translateY(-26px)", opacity:0 }], { duration:900, easing:"ease-out" });
		a.onfinish = () => fl.remove();
	}

	/* ── магазин ферм ── */
	const fr = {};
	FARMS.forEach(f => {
		const el = document.createElement("div");
		el.className = "ck-item";
		el.dataset.id = f.id;
		el.innerHTML = '<div class="ck-it-i"></div><div class="ck-it-m"><b class="ck-it-n"></b><span class="ck-it-d"></span><span class="ck-it-c"></span></div><div class="ck-it-k"></div>';
		pFarms.appendChild(el);
		fr[f.id] = { el, i:el.querySelector(".ck-it-i"), n:el.querySelector(".ck-it-n"), d:el.querySelector(".ck-it-d"), c:el.querySelector(".ck-it-c"), k:el.querySelector(".ck-it-k"), sig:"" };
	});
	function updFarms(){
		FARMS.forEach((f, idx) => {
			const r = fr[f.id], n = S.farms[f.id];
			const vis = farmVisible(f);
			if(!vis && n === 0){
				// показываем как "???", если это следующая ферма
				const ti = TIERS.findIndex(t => t.id === f.tier);
				const ci = TIERS.findIndex(t => t.id === S.tier);
				if(ti === ci + 1){
					r.el.style.display = "";
					r.el.classList.add("ck-lock");
					r.el.classList.remove("ck-off","ck-can");
					r.i.textContent = "❔";
					r.n.textContent = "???";
					r.d.textContent = "Откроется на этапе «" + TIERS[ti].name + "»";
					r.c.textContent = "Ⓖ " + fmt(f.base);
					r.k.textContent = "";
					return;
				}
				r.el.style.display = "none";
				return;
			}
			let kk = 1, cost = 0, can = false;
			kk = Math.max(1, Math.min(mode === "max" ? 1e9 : +mode, maxAfford(f)));
			cost = farmCost(f, kk);
			can = S.cur.gt >= cost;
			const sg = "1|" + n + "|" + kk + "|" + cost + "|" + (can ? 1 : 0) + "|" + C.unit[f.id];
			if(sg === r.sig) return;
			r.sig = sg;
			r.el.style.display = vis ? "" : "none";
			r.el.classList.remove("ck-lock");
			r.el.classList.toggle("ck-off", !can);
			r.el.classList.toggle("ck-can", can);
			r.i.textContent = f.icon;
			r.n.textContent = f.name;
			r.d.textContent = "+" + fmt(C.unit[f.id]) + " " + CURD[f.out].sym + "/сек · " + f.desc;
			r.c.textContent = "Ⓖ " + fmt(cost) + (kk > 1 ? "  (×" + kk + ")" : "");
			r.k.textContent = n > 0 ? n : "";
			r.el.title = f.desc;
		});
	}
	function buyFarm(id, el){
		const f = FD[id];
		if(!f || !farmVisible(f)) return;
		const k = Math.min(mode === "max" ? 1e9 : +mode, maxAfford(f));
		if(k < 1){ deny(el); return; }
		S.cur.gt -= farmCost(f, k);
		S.farms[id] += k;
		recalc(); syncScene(true); updFarms(); checkAch(); saveNow();
	}
	on(pFarms, "click", e => { const it = e.target.closest(".ck-item"); if(it) buyFarm(it.dataset.id, it); });
	on(modesN, "click", e => {
		const b = e.target.closest("button");
		if(!b) return;
		mode = b.dataset.m;
		modesN.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
		updFarms();
	});

	/* ── улучшения ── */
	let upSig = "", upEls = [];
	function itemHtml(o, cur, extra){
		return '<div class="ck-item ' + extra + '" data-id="' + o.id + '"><div class="ck-it-i">' + o.icon + '</div><div class="ck-it-m"><b class="ck-it-n">' + esc(o.name)
			+ '</b><span class="ck-it-d">' + esc(o.desc) + '</span><span class="ck-it-c">' + CURD[cur].sym + ' ' + fmt(o.cost) + '</span></div></div>';
	}
	function renderUps(force){
		const list = UPS.filter(u => !S.up.includes(u.id) && upVisible(u)).sort((a, b) => a.cost - b.cost);
		const sg = list.map(u => u.id).join(",");
		if(sg === upSig && !force) return;
		upSig = sg;
		pUps.innerHTML = list.length ? list.map(u => itemHtml(u, u.cur || "gt", "ck-up")).join("")
			: '<div class="ck-none">Пока нет улучшений. Копи токены и покупай фермы.</div>';
		upEls = [...pUps.querySelectorAll(".ck-item")].map(el => ({ el, u:UPD[el.dataset.id] }));
		tabU.innerHTML = "УЛУЧШЕНИЯ <b>" + list.length + "</b>";
	}
	function buyUp(id, el){
		const u = UPD[id];
		if(!u || S.up.includes(id)) return;
		const cur = u.cur || "gt";
		if(S.cur[cur] < u.cost){ deny(el); return; }
		S.cur[cur] -= u.cost;
		S.up.push(id);
		recalc(); renderUps(true); updFarms(); checkAch(); saveNow();
	}
	on(pUps, "click", e => { const it = e.target.closest(".ck-item"); if(it) buyUp(it.dataset.id, it); });

	/* ── достижения ── */
	function achVal(k){
		switch(k){
			case "clicks": return S.clicks;
			case "tot":    return S.tot.gt;
			case "cps":    return C.cpsBase;
			case "farms":  return FARMS.reduce((s, f) => s + S.farms[f.id], 0);
			case "ev":     return S.evCnt;
			case "rb":     return S.rebirths;
			case "tier":   return TIERS.findIndex(t => t.id === S.tier);
		}
		return 0;
	}
	function renderAch(){
		let h = '<div class="ck-ach-h">🏆 ' + S.ach.length + ' / ' + ACHS.length + ' · бонус <b>+' + fmt(S.ach.length * ACH_BONUS * 100) + '%</b> к производству</div>';
		h += ACHS.map(a => {
			const ok = S.ach.includes(a.id);
			return '<div class="ck-item ck-ach' + (ok ? "" : " ck-lock") + '"><div class="ck-it-i">' + (ok ? "🏆" : "🔒") + '</div><div class="ck-it-m"><b class="ck-it-n">'
				+ esc(ok ? a.name : "???") + '</b><span class="ck-it-d">' + esc(a.desc) + '</span></div></div>';
		}).join("");
		pAch.innerHTML = h;
	}
	function checkAch(){
		let got = 0;
		ACHS.forEach(a => {
			if(S.ach.includes(a.id) || achVal(a.k) < a.n) return;
			S.ach.push(a.id); got++;
			toast("🏆 <b>" + esc(a.name) + "</b><br>" + esc(a.desc) + " · +" + (ACH_BONUS * 100) + "%");
		});
		if(got){ recalc(); if(tab === "a") renderAch(); }
	}

	/* ── перерождение ── */
	pRb.innerHTML =
		'<div class="ck-rbx">'
		+ '<div class="ck-rb-h">♻ ПЕРЕРОЖДЕНИЕ</div>'
		+ '<div class="ck-rb-t">Сожги токены, фермы и улучшения. Взамен получишь Li-ядра. Каждое ядро даёт <b>+' + (LI_BONUS * 100) + '%</b> ко всему производству навсегда, даже если потратить его на перк.</div>'
		+ '<div class="ck-rb-row">Li-ядер: <b id="ck-rb-have">0</b> · бонус <b id="ck-rb-bonus">+0%</b></div>'
		+ '<div class="ck-rb-row">Сейчас дадут: <b id="ck-rb-gain">0</b></div>'
		+ '<div class="ck-bar"><i id="ck-rb-bar"></i></div>'
		+ '<div class="ck-rb-row ck-dim" id="ck-rb-next"></div>'
		+ '<button class="ck-btn" id="ck-rb-btn" type="button">♻ ПЕРЕРОДИТЬСЯ</button>'
		+ '</div><div class="ck-sh">ВЕЧНЫЕ ПЕРКИ</div><div id="ck-rb-perks"></div>';
	const rbHave = $("ck-rb-have"), rbBonus = $("ck-rb-bonus"), rbGain = $("ck-rb-gain"), rbBar = $("ck-rb-bar"), rbNext = $("ck-rb-next"), rbBtn = $("ck-rb-btn");
	const perksN = $("ck-rb-perks");
	perksN.innerHTML = PERKS.map(p => itemHtml(p, "li", "ck-perk")).join("");
	const perkEls = [...perksN.querySelectorAll(".ck-item")].map(el => ({ el, p:PKD[el.dataset.id], c:el.querySelector(".ck-it-c") }));
	let rbArm = false, rbArmT = 0;
	function rbDisarm(){ rbArm = false; clearTimeout(rbArmT); delete shown.rbt; }
	function updRb(){
		const pot = rbPotential();
		setT(rbHave, "rbh", fmt(S.cur.li));
		setT(rbBonus, "rbb", "+" + fmt(S.tot.li * LI_BONUS * 100) + "%");
		setT(rbGain, "rbg", "+" + fmt(pot) + " Li");
		const prev = rbNeed(S.rbGiven + pot), next = rbNeed(S.rbGiven + pot + 1);
		const pr = Math.max(0, Math.min(1, (S.tot.gt - prev) / (next - prev)));
		rbBar.style.width = (pr * 100).toFixed(1) + "%";
		setT(rbNext, "rbn", "Следующее ядро: " + fmt(S.tot.gt) + " / " + fmt(next) + " Ⓖ");
		rbBtn.classList.toggle("dis", pot < 1);
		if(!rbArm) setT(rbBtn, "rbt", pot < 1 ? "НУЖНО БОЛЬШЕ ТОКЕНОВ" : "♻ ПЕРЕРОДИТЬСЯ (+" + fmt(pot) + " Li)");
		perkEls.forEach(o => {
			const done = S.rup.includes(o.p.id);
			o.el.classList.toggle("ck-done", done);
			o.el.classList.toggle("ck-off", !done && S.cur.li < o.p.cost);
			setT(o.c, "pk" + o.p.id, done ? "✔ КУПЛЕНО" : "Li " + fmt(o.p.cost));
		});
	}
	on(perksN, "click", e => {
		const it = e.target.closest(".ck-item");
		if(!it) return;
		const p = PKD[it.dataset.id];
		if(!p || S.rup.includes(p.id)) return;
		if(S.cur.li < p.cost){ deny(it); return; }
		S.cur.li -= p.cost;
		S.rup.push(p.id);
		recalc(); updRb(); updFarms(); saveNow();
		toast("♻ Перк: <b>" + esc(p.name) + "</b>");
	});
	on(rbBtn, "click", () => {
		const pot = rbPotential();
		if(pot < 1){ deny(rbBtn); return; }
		if(!rbArm){
			rbArm = true;
			rbBtn.textContent = "⚠ ТОЧНО? НАЖМИ ЕЩЁ РАЗ";
			rbBtn.classList.add("arm");
			rbArmT = setTimeout(() => { rbDisarm(); rbBtn.classList.remove("arm"); updRb(); }, 4000);
			tm.push(rbArmT);
			return;
		}
		rbDisarm(); rbBtn.classList.remove("arm");
		doRebirth(pot);
	});
	function doRebirth(pot){
		gain("li", pot);
		S.rbGiven += pot; S.rebirths++;
		CURS.forEach(c => { S.run[c.id] = 0; if(!c.keep) S.cur[c.id] = 0; });
		FARMS.forEach(f => { S.farms[f.id] = 0; });
		S.up = []; S.buffs = []; S.tier = "basement";
		recalc();
		S.cur.gt = C.startGt;
		if(gold){ gold.remove(); gold = null; clearTimeout(goldT); schedNext(); }
		document.querySelectorAll(".ck-gold").forEach(n => n.remove());
		syncScene(false); FARMS.forEach(f => { fr[f.id].sig = ""; });
		renderUps(true); updFarms(); updRb(); checkAch(); saveNow();
		const fl = document.createElement("div");
		fl.className = "ck-flash";
		document.documentElement.appendChild(fl);
		fl.animate([{ opacity:.9 }, { opacity:0 }], { duration:1300 }).onfinish = () => fl.remove();
		burstAt(window.innerWidth / 2, window.innerHeight / 2, 70, ["#ffdf6b", "#d4af37", "#ff0044", "#fff"]);
		toast("♻ <b>ПЕРЕРОЖДЕНИЕ</b><br>+" + fmt(pot) + " Li-ядер. Бонус теперь +" + fmt(S.tot.li * LI_BONUS * 100) + "%");
	}

	/* ── клик по ядру ── */
	function clickCore(x, y){
		let v = clickValue(CORE_CUR);
		let crit = false;
		if(C.critChance > 0 && Math.random() < C.critChance){
			v *= C.critMult;
			crit = true;
		}
		gain(CORE_CUR, v);
		S.clicks++;
		if(crit){
			popText(x, y, "💥 +" + fmt(v) + " !");
			burstAt(x, y, 24, ["#ff0044", "#ffdf6b", "#fff", "#ff4466"]);
			toast("💥 <b>КРИТ ×" + C.critMult + "</b> · +" + fmt(v) + " Ⓖ");
			orb.animate([{ transform:"scale(.85)" }, { transform:"scale(1.05)" }, { transform:"scale(1)" }], { duration:320 });
		}else{
			popText(x, y, "+" + fmt(v));
		}
	}
	on(orb, "pointerdown", e => {
		if(e.pointerType === "mouse" && e.button !== 0) return;
		e.preventDefault();
		clickCore(e.clientX, e.clientY);
	});
	on(orb, "click", e => {
		if(e.detail !== 0) return;
		const r = orb.getBoundingClientRect();
		clickCore(r.left + r.width / 2, r.top + r.height / 3);
	});

	/* ── события ── */
	let nextEv = Date.now() + rnd(20, 40) * 1000;
	function schedNext(){ nextEv = Date.now() + rnd(EV_MIN, EV_MAX) * 1000 / C.evFreq; }
	function pickEvent(){
		let r = Math.random() * EVENTS.reduce((s, e) => s + e.w, 0);
		for(const e of EVENTS){ if((r -= e.w) < 0) return e; }
		return EVENTS[0];
	}
	function spawnGold(){
		const d = pickEvent();
		const el = document.createElement("div");
		el.className = "ck-gold" + (d.bad ? " bad" : "");
		el.textContent = d.bad ? "☠" : "Ⓖ";
		el.style.left = rnd(60, Math.max(80, window.innerWidth - 60)) + "px";
		el.style.top = rnd(100, Math.max(120, window.innerHeight - 60)) + "px";
		document.documentElement.appendChild(el);
		el.animate([{ transform:"scale(.2)", opacity:0 }, { transform:"scale(1.2)", opacity:1 }, { transform:"scale(1)" }], { duration:420, easing:"ease-out" });
		gold = el;
		const kill = () => { if(gold !== el) return; clearTimeout(goldT); el.remove(); gold = null; schedNext(); };
		el.addEventListener("pointerdown", e => {
			e.preventDefault(); e.stopPropagation();
			if(gold !== el) return;
			runEvent(d, e.clientX, e.clientY);
			kill();
		}, { signal: sig });
		goldT = setTimeout(() => {
			if(gold !== el) return;
			el.animate([{ opacity:1 }, { opacity:0 }], { duration:500, fill:"forwards" }).onfinish = kill;
		}, EV_LIFE * (d.bad ? 1 : C.evTime) * 1000);
	}
	function runEvent(d, x, y){
		S.evCnt++;
		burstAt(x, y, d.bad ? 14 : 24, d.bad ? ["#ff0044", "#7a0022", "#220008"] : ["#ffdf6b", "#d4af37", "#fff", "#ff4466"]);
		if(d.id === "lucky"){
			const g = Math.max(13, Math.min(S.cur.gt * 0.15, C.cpsBase * 900));
			gain("gt", g);
			toast(d.icon + " <b>" + esc(d.name) + "</b><br>+" + fmt(g) + " Ⓖ");
		}else if(d.id === "rain"){
			toast(d.icon + " <b>" + esc(d.name) + "</b><br>" + esc(d.desc));
			rain();
		}else{
			S.buffs = S.buffs.filter(b => b.id !== d.id);
			S.buffs.push({ id:d.id, until:Date.now() + d.dur * 1000 * (d.bad ? 1 : C.evTime) });
			recalc();
			toast(d.icon + " <b>" + esc(d.name) + "</b><br>" + esc(d.desc) + " · " + Math.round(d.dur * (d.bad ? 1 : C.evTime)) + " сек", d.bad);
		}
		checkAch();
	}
	function rain(){
		for(let i = 0; i < 14; i++){
			const el = document.createElement("div");
			el.className = "ck-gold small";
			el.textContent = "Ⓖ";
			el.style.left = rnd(30, Math.max(60, window.innerWidth - 30)) + "px";
			el.style.top = "0px";
			document.documentElement.appendChild(el);
			const a = el.animate([
				{ transform:"translateY(-60px)" },
				{ transform:"translateY(" + (window.innerHeight + 60) + "px)" }
			], { duration:rnd(3800, 6500), delay:i * 320, easing:"linear", fill:"backwards" });
			a.onfinish = () => el.remove();
			el.addEventListener("pointerdown", e => {
				e.preventDefault();
				const g = Math.max(1, C.cpsBase * 5);
				gain("gt", g);
				popText(e.clientX, e.clientY, "+" + fmt(g));
				burstAt(e.clientX, e.clientY, 8, ["#ffdf6b", "#d4af37", "#fff"]);
				el.remove();
			}, { signal: sig });
		}
	}

	/* ── обновление экрана ── */
	function paintBuffs(){
		const now = Date.now();
		const html = S.buffs.filter(b => b.until > now).map(b => {
			const d = EVD[b.id];
			return '<span class="ck-buff' + (d.bad ? " bad" : "") + '" title="' + esc(d.desc) + '">' + d.icon + " " + esc(d.name) + " · " + Math.ceil((b.until - now) / 1000) + "с</span>";
		}).join("");
		if(html !== shown.buffs){ shown.buffs = html; buffsN.innerHTML = html; }
	}
	const stC = $("ck-s-c"), stT = $("ck-s-t"), stP = $("ck-s-p"), stR = $("ck-s-r"), stA = $("ck-s-a");
	function ui(){
		setT(gtN, "gt", fmt(S.cur.gt));
		const ps = C.cps + (CORE_CUR === "gt" ? clickValue("gt") * C.auto : 0);
		setT(psN, "ps", fmt(ps) + " Ⓖ / сек" + (C.prodBuff !== 1 ? "  ·  ×" + fmt(C.prodBuff) : ""));
		const cv = clickValue(CORE_CUR);
		const critInfo = C.critChance > 0 ? " · КРИТ: " + Math.round(C.critChance * 100) + "% ×" + C.critMult : "";
		setT(clkN, "clk", "КЛИК: +" + fmt(cv) + " " + CURD[CORE_CUR].sym + critInfo);
		const liShow = S.tot.li > 0 || S.rebirths > 0;
		setT(liN, "li", liShow ? "Li-ядра: " + fmt(S.cur.li) + "  ·  бонус +" + fmt(S.tot.li * LI_BONUS * 100) + "%" : "");
		setT(stC, "sc", fmt(S.clicks));
		setT(stT, "st", fmt(S.tot.gt) + " Ⓖ");
		setT(stP, "sp", fmtT(S.playSec));
		setT(stR, "sr", String(S.rebirths));
		setT(stA, "sa", S.ach.length + " / " + ACHS.length);
		// этап
		const tier = TIERD[S.tier] || TIERS[0];
		setT(tierN, "tier", tier.icon + " " + tier.name + "  ·  ×" + fmt(tier.bonus) + " к производству");
		const rv = rbVisible() ? "" : "none";
		if(shown.rv !== rv){ shown.rv = rv; tabR.style.display = rv; }
		paintBuffs();
		updFarms();
		renderUps(false);
		upEls.forEach(o => o.el.classList.toggle("ck-off", S.cur[o.u.cur || "gt"] < o.u.cost));
		if(tab === "r") updRb();
	}
	function news(){
		const pool = NEWS.filter(n => S.tot.gt >= n[0]);
		tickerN.textContent = "📡 " + pick(pool)[1];
		tickerN.classList.remove("sw"); void tickerN.offsetWidth; tickerN.classList.add("sw");
	}

	function setTab(t){
		tab = t;
		[["f", tabF, pFarms], ["u", tabU, pUps], ["a", tabA, pAch], ["r", tabR, pRb]].forEach(([k, b, p]) => {
			b.classList.toggle("on", k === t);
			p.classList.toggle("on", k === t);
		});
		modesN.style.display = t === "f" ? "" : "none";
		if(t === "a") renderAch();
		if(t === "u") renderUps(true);
		if(t === "r") updRb();
	}
	root.querySelectorAll(".ck-tab").forEach(b => on(b, "click", () => setTab(b.dataset.t)));

	/* ── главный цикл ── */
	let lastT = Date.now(), tickN = 0, lastSave = Date.now(), lastSpark = 0;
	function step(){
		if(!root.isConnected){ window.__ckClean(); return; }
		const now = Date.now();
		let dt = (now - lastT) / 1000;
		lastT = now;
		if(dt < 0) dt = 0;
		const rate = dt > 5 ? OFFLINE_RATE : 1;
		dt = Math.min(dt, OFFLINE_MAX_H * 3600);
		tickN++;
		S.buffs = S.buffs.filter(b => b.until > now);
		recalc();
		// проверяем этап
		for(let i = TIERS.length - 1; i >= 0; i--){
			const t = TIERS[i];
			if(S.tot.gt >= t.t && TIERS.findIndex(x => x.id === S.tier) < i){
				S.tier = t.id;
				toast("⬆ <b>НОВЫЙ ЭТАП: " + t.name + "</b><br>" + t.desc + " · ×" + fmt(t.bonus) + " к производству");
				recalc(); syncScene(true); FARMS.forEach(f => { fr[f.id].sig = ""; });
				renderUps(true);
				break;
			}
		}
		if(dt > 0){
			S.playSec += dt;
			gain("gt", C.cps * dt * rate);
			for(const cur in C.flat) gain(cur, C.flat[cur] * dt * rate);
			if(C.auto > 0) gain(CORE_CUR, clickValue(CORE_CUR) * C.auto * dt * rate);
		}
		if(!gold && now >= nextEv) spawnGold();
		ui();
		if(tickN % 10 === 0) checkAch();
		if(tickN % 140 === 0) news();
		if(now - lastSpark > 650){ lastSpark = now; sceneSpark(); }
		if(now - lastSave > 5000){ lastSave = now; saveNow(); }
	}

	/* ── сброс ── */
	const rb = $("ck-reset");
	let armed = false, armT = 0;
	function disarm(){ armed = false; clearTimeout(armT); rb.textContent = "☠ СБРОСИТЬ ПРОГРЕСС"; rb.classList.remove("ck-arm"); }
	on(rb, "click", () => {
		if(!armed){
			armed = true;
			rb.textContent = "⚠ ВСЁ СТЁРТСЯ. НАЖМИ ЕЩЁ РАЗ";
			rb.classList.add("ck-arm");
			armT = setTimeout(disarm, 4000); tm.push(armT);
			return;
		}
		// ── мягкий сброс: не пересоздаём init(), а сбрасываем состояние ──
		disarm();
		try{ localStorage.removeItem(SAVE_KEY); }catch(e){}
		// сбрасываем S на пустой
		S = fresh0();
		// сбрасываем режим на ×1 и активный таб на «фермы»
		mode = "1";
		modesN.querySelectorAll("button").forEach(x => x.classList.toggle("on", x.dataset.m === "1"));
		setTab("f");
		// сбрасываем кэш показанных значений (иначе setT не обновит)
		for(const k in shown) delete shown[k];
		// сбрасываем сигнатуры ферм и улучшений
		FARMS.forEach(f => { fr[f.id].sig = ""; });
		upSig = "";
		// убираем золотой токен и бафы
		if(gold){ gold.remove(); gold = null; clearTimeout(goldT); }
		document.querySelectorAll(".ck-gold").forEach(n => n.remove());
		S.buffs = [];
		// сбрасываем таймеры
		lastT = Date.now();
		lastSave = Date.now();
		lastSpark = 0;
		// пересчёт и полная перерисовка
		recalc();
		syncScene(false);
		renderUps(true);
		renderAch();
		updFarms();
		paintBuffs();
		ui();
		news();
		saySafe("☠ ПРОГРЕСС СБРОШЕН. НАЧИНАЕМ С НУЛЯ.");
		saveNow();
	});

	on(window, "pagehide", saveNow);
	if(DEV){
		window.CLICKER_GIVE = (n, cur) => { gain(cur || "gt", +n || 0); };
		window.CLICKER_STATE = () => S;
	}

	/* ── старт ── */
	syncScene(false);
	renderUps(true);
	renderAch();
	setTab("f");
	recalc();
	updFarms();
	ui();
	news();
	if(offlineMsg) toast(offlineMsg);
	loop = setInterval(step, TICK_MS);
}

const live = () => { try{ init(); }catch(e){ console.error("[CLICKER]", e); } };

return ELEMENT_SITE(`
<div id="ck-root">
<style>
#ck-root{position:relative;box-sizing:border-box;padding:14px;color:#f0e6d0;font-family:'Courier New',monospace;background:#07000a;border:1px solid #3a0010;user-select:none;-webkit-user-select:none}
#ck-root *{box-sizing:border-box}
.ck-head{display:flex;flex-wrap:wrap;align-items:center;gap:10px 24px;margin-bottom:12px}
.ck-title{font-size:30px;font-weight:bold;letter-spacing:4px;color:#d4af37;text-shadow:2px 0 #ff0044,-2px 0 #7a0022;animation:ck-gl 3.4s steps(1,end) infinite}
.ck-title small{display:block;font-size:10px;letter-spacing:2px;color:#8a6f1e;text-shadow:none;font-weight:normal}
.ck-ticker{flex:1;min-width:220px;padding:8px 12px;border:1px solid #3a0010;background:#0d0004;font-size:12px;color:#c9b27a;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.ck-ticker.sw{animation:ck-fade .6s ease-out}
.ck-tier{font-size:11px;color:#ff4466;letter-spacing:2px;margin-top:4px}
.ck-grid{display:grid;grid-template-columns:290px minmax(240px,1fr) 380px;gap:12px;align-items:start}
.ck-left,.ck-mid{display:flex;flex-direction:column;gap:10px}
.ck-box{border:1px solid #3a0010;background:linear-gradient(180deg,#120006,#080003);padding:10px}
.ck-sh{font-size:11px;letter-spacing:3px;color:#d4af37;margin:2px 0 8px}
.ck-bank{text-align:center}
.ck-bank-l{font-size:11px;letter-spacing:4px;color:#8a6f1e}
.ck-bank-n{font-size:34px;font-weight:bold;color:#ffdf6b;text-shadow:0 0 14px rgba(212,175,55,.6);word-break:break-all}
.ck-ps{font-size:13px;color:#ff7a8e;margin-top:2px}
.ck-li{font-size:12px;color:#ff4466;margin-top:6px;min-height:15px}
.ck-core{text-align:center;padding:26px 10px 14px}
.ck-orb{position:relative;width:200px;height:200px;max-width:100%;border-radius:50%;margin:0 auto;padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-family:inherit;color:#ffdf6b;background:radial-gradient(circle at 35% 30%,#ff2a5a 0,#8a0020 38%,#2a0008 72%,#0a0003 100%);border:3px solid #d4af37;animation:ck-og 3s ease-in-out infinite;transition:transform .06s;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
.ck-orb::before{content:"";position:absolute;top:-14px;left:-14px;right:-14px;bottom:-14px;border-radius:50%;border:2px dashed rgba(212,175,55,.55);animation:ck-spin 24s linear infinite;pointer-events:none}
.ck-orb:active{transform:scale(.93)}
.ck-orb-li{font-size:82px;font-weight:bold;line-height:1;text-shadow:3px 0 #ff0044,-3px 0 #7a0022,0 0 18px #d4af37;animation:ck-ot 2.8s steps(1,end) infinite}
.ck-orb-sub{font-size:12px;letter-spacing:6px;color:#ffb3c0;margin-top:4px}
.ck-clk{margin-top:22px;font-size:13px;color:#c9b27a}
.ck-buffs{display:flex;flex-wrap:wrap;gap:6px;min-height:4px}
.ck-buff{padding:4px 8px;font-size:11px;border:1px solid #d4af37;background:#1a1204;color:#ffdf6b}
.ck-buff.bad{border-color:#ff0044;background:#240008;color:#ff7a8e}
.ck-stats{font-size:12px}
.ck-st{display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px dashed #2a0008}
.ck-st span{color:#8a7a5a}
.ck-st b{color:#ffdf6b;font-weight:normal}
.ck-reset{padding:9px;font:inherit;font-size:11px;letter-spacing:2px;color:#7a5560;background:transparent;border:1px solid #3a0010;cursor:pointer}
.ck-reset:hover{color:#ff4466;border-color:#7a0022}
.ck-reset.ck-arm{color:#fff;background:#7a0022;border-color:#ff0044}
.ck-scene{display:flex;flex-direction:column;gap:6px;min-height:200px;max-height:660px;overflow-y:auto;padding:8px;border:1px solid #2a0008;background-color:#050002;background-image:repeating-linear-gradient(0deg,rgba(255,0,68,.05) 0,rgba(255,0,68,.05) 1px,transparent 1px,transparent 4px);scrollbar-width:thin;scrollbar-color:#7a0022 #0d0004}
.ck-row{position:relative;display:flex;align-items:center;gap:8px;padding:4px 6px;border-left:3px solid var(--c,#d4af37);background:rgba(255,255,255,.02);min-height:40px}
.ck-row-l{width:130px;flex:none;font-size:11px;line-height:1.25}
.ck-row-l b{display:block;color:var(--c,#d4af37)}
.ck-row-l span{color:#c9b27a}
.ck-row-i{display:flex;flex-wrap:wrap;gap:3px;flex:1}
.ck-fi{display:inline-block;font-size:22px;line-height:1;filter:drop-shadow(0 0 4px var(--c,#d4af37));animation:ck-bob 2.4s ease-in-out calc(var(--d,0) * -1s) infinite}
.ck-fi.pop{animation:ck-bob 2.4s ease-in-out calc(var(--d,0) * -1s) infinite,ck-pop .5s cubic-bezier(.2,1.5,.4,1)}
.ck-fl{position:absolute;pointer-events:none;font-size:13px;font-weight:bold;color:var(--c,#d4af37);text-shadow:0 0 6px #000}
.ck-none{padding:16px 8px;text-align:center;font-size:12px;color:#7a6a4a}
.ck-tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px}
.ck-tab{flex:1;padding:8px 4px;font:inherit;font-size:11px;letter-spacing:1px;color:#c9b27a;background:#0d0004;border:1px solid #3a0010;cursor:pointer;white-space:nowrap}
.ck-tab b{color:#ff4466;margin-left:3px}
.ck-tab.on{color:#000;background:#d4af37;border-color:#d4af37}
.ck-tab.on b{color:#7a0022}
.ck-modes{display:flex;gap:4px;margin-bottom:8px}
#ck-root .ck-modes button{flex:1;padding:5px;font:inherit;font-size:11px;color:#c9b27a;background:#0d0004;border:1px solid #3a0010;cursor:pointer;transition:color .15s, background .15s, border-color .15s}
#ck-root .ck-modes button:hover{color:#ffdf6b;border-color:#7a0022;background:#18000a}
#ck-root .ck-modes button.on{color:#000;border-color:#d4af37;background:#d4af37;font-weight:bold;box-shadow:0 0 8px rgba(212,175,55,.5)}
.ck-pan{display:none;max-height:560px;overflow-y:auto;padding-right:3px;scrollbar-width:thin;scrollbar-color:#7a0022 #0d0004}
.ck-pan.on{display:block}
.ck-item{display:flex;align-items:center;gap:10px;padding:8px;margin-bottom:5px;border:1px solid #3a0010;background:#0d0004;cursor:pointer;transition:border-color .15s,background .15s}
.ck-item:hover{border-color:#d4af37;background:#18000a}
.ck-item.ck-can{border-color:#6a5410}
.ck-item.ck-off{opacity:.55}
.ck-item.ck-lock{cursor:default;opacity:.45;filter:grayscale(1)}
.ck-item.ck-ach{cursor:default}
.ck-item.ck-done{cursor:default;opacity:.7;border-color:#2a4a1a}
.ck-it-i{font-size:28px;width:38px;text-align:center;flex:none}
.ck-it-m{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.ck-it-n{font-size:14px;color:#fff;font-weight:normal}
.ck-it-d{font-size:11px;color:#a89060;line-height:1.3}
.ck-it-c{font-size:12px;color:#ffdf6b}
.ck-item.ck-off .ck-it-c{color:#ff4466}
.ck-it-k{font-size:22px;color:#d4af37;min-width:34px;text-align:right}
.ck-ach-h,.ck-rb-t,.ck-rb-row{font-size:12px;color:#c9b27a;margin-bottom:8px;line-height:1.4}
.ck-rb-row b,.ck-ach-h b{color:#ffdf6b}
.ck-dim{color:#7a6a4a}
.ck-rbx{padding:10px;margin-bottom:10px;border:1px solid #7a0022;background:linear-gradient(180deg,#1a0008,#0a0003)}
.ck-rb-h{font-size:14px;letter-spacing:3px;color:#ff4466;margin-bottom:8px}
.ck-bar{height:8px;margin-bottom:6px;background:#1a0008;border:1px solid #3a0010}
.ck-bar i{display:block;width:0;height:100%;background:linear-gradient(90deg,#7a0022,#d4af37)}
.ck-btn{width:100%;padding:11px 14px;font:inherit;font-size:13px;letter-spacing:1px;color:#ffdf6b;background:#1a0008;border:1px solid #d4af37;cursor:pointer}
.ck-btn:hover{background:#2a0010}
.ck-btn.dis{opacity:.45;cursor:not-allowed}
.ck-btn.arm{color:#fff;background:#7a0022;border-color:#ff0044}
.ck-gold{position:fixed;z-index:99990;width:68px;height:68px;margin:-34px 0 0 -34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:bold;color:#3a2a00;cursor:pointer;background:radial-gradient(circle at 35% 30%,#fff3b0,#d4af37 55%,#7a5c00);border:2px solid #fff3b0;animation:ck-gp 1s ease-in-out infinite;user-select:none;touch-action:manipulation}
.ck-gold.bad{color:#fff;background:radial-gradient(circle at 35% 30%,#ff6a80,#c2002f 55%,#3a0010);border-color:#ff8aa0;animation:ck-bp .5s ease-in-out infinite}
.ck-gold.small{width:44px;height:44px;margin:-22px 0 0 -22px;font-size:22px}
.ck-spark{position:fixed;z-index:99991;width:8px;height:8px;border-radius:50%;pointer-events:none}
.ck-pt{position:fixed;z-index:99992;pointer-events:none;font-family:'Courier New',monospace;font-size:20px;font-weight:bold;color:#ffdf6b;text-shadow:0 0 8px #000,0 0 10px #d4af37;white-space:nowrap}
.ck-flash{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99995;pointer-events:none;background:radial-gradient(circle,#ffdf6b,#ff0044 60%,#000)}
.ck-toasts{position:fixed;right:14px;bottom:14px;z-index:99996;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:min(88vw,340px)}
.ck-t{padding:9px 14px;border:1px solid #d4af37;background:rgba(10,0,4,.96);box-shadow:0 0 16px rgba(212,175,55,.35);font-family:'Courier New',monospace;font-size:13px;line-height:1.4;color:#f0e6d0;animation:ck-tin .3s ease-out}
.ck-t b{color:#ffdf6b}
.ck-t.bad{border-color:#ff0044;box-shadow:0 0 16px rgba(255,0,68,.4)}
@media(max-width:1000px){
	.ck-grid{grid-template-columns:1fr}
	.ck-left{order:1}
	.ck-right{order:2}
	.ck-mid{order:3}
}
@keyframes ck-gl{
	0%,92%,100%{transform:none}
	93%{transform:translate(3px,-1px) skewX(6deg)}
	95%{transform:translate(-3px,1px)}
	97%{transform:translate(2px,0) skewX(-6deg)}
}
@keyframes ck-ot{
	0%,90%,100%{text-shadow:3px 0 #ff0044,-3px 0 #7a0022,0 0 18px #d4af37}
	92%{text-shadow:-6px 0 #ff0044,6px 0 #7a0022,0 0 18px #d4af37}
	95%{text-shadow:5px 2px #ff0044,-5px -2px #7a0022,0 0 18px #d4af37}
}
@keyframes ck-og{
	0%,100%{box-shadow:0 0 30px rgba(255,0,68,.5),0 0 70px rgba(212,175,55,.2),inset 0 0 30px rgba(0,0,0,.7)}
	50%{box-shadow:0 0 46px rgba(255,0,68,.8),0 0 100px rgba(212,175,55,.4),inset 0 0 30px rgba(0,0,0,.7)}
}
@keyframes ck-spin{to{transform:rotate(360deg)}}
@keyframes ck-fade{from{opacity:0}to{opacity:1}}
@keyframes ck-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ck-pop{from{transform:scale(0) rotate(-40deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
@keyframes ck-gp{0%,100%{box-shadow:0 0 14px #d4af37,0 0 30px rgba(212,175,55,.5)}50%{box-shadow:0 0 28px #ffdf6b,0 0 60px rgba(255,223,107,.7)}}
@keyframes ck-bp{0%,100%{box-shadow:0 0 14px #ff0044,0 0 30px rgba(255,0,68,.5)}50%{box-shadow:0 0 28px #ff4466,0 0 60px rgba(255,0,68,.8)}}
@keyframes ck-tin{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
</style>

<div class="ck-head">
	<div class="ck-title">G-MINER<small>GOLU · GOD OF LITHIUM UNIVERSE</small><div class="ck-tier" id="ck-tier">🏚️ ПОДВАЛ</div></div>
	<div class="ck-ticker" id="ck-ticker">📡 …</div>
</div>

<div class="ck-grid">
	<div class="ck-left">
		<div class="ck-box ck-bank">
			<div class="ck-bank-l">G-TOKEN</div>
			<div class="ck-bank-n" id="ck-gt">0</div>
			<div class="ck-ps" id="ck-ps">0 Ⓖ / сек</div>
			<div class="ck-li" id="ck-li"></div>
		</div>
		<div class="ck-box ck-core">
			<button class="ck-orb" id="ck-orb" type="button"><span class="ck-orb-li">Li</span><span class="ck-orb-sub">GOLU</span></button>
			<div class="ck-clk" id="ck-clk"></div>
		</div>
		<div class="ck-buffs" id="ck-buffs"></div>
		<div class="ck-box ck-stats">
			<div class="ck-st"><span>Кликов</span><b id="ck-s-c">0</b></div>
			<div class="ck-st"><span>Намайнено всего</span><b id="ck-s-t">0</b></div>
			<div class="ck-st"><span>Время в игре</span><b id="ck-s-p">0:00</b></div>
			<div class="ck-st"><span>Перерождений</span><b id="ck-s-r">0</b></div>
			<div class="ck-st"><span>Достижений</span><b id="ck-s-a">0</b></div>
		</div>
		<button class="ck-reset" id="ck-reset" type="button">☠ СБРОСИТЬ ПРОГРЕСС</button>
	</div>

	<div class="ck-mid">
		<div class="ck-box">
			<div class="ck-sh">ТВОИ ФЕРМЫ</div>
			<div class="ck-scene" id="ck-scene"></div>
		</div>
	</div>

	<div class="ck-right ck-box">
		<div class="ck-tabs">
			<button class="ck-tab on" id="ck-t-f" data-t="f" type="button">ФЕРМЫ</button>
			<button class="ck-tab" id="ck-t-u" data-t="u" type="button">УЛУЧШЕНИЯ <b>0</b></button>
			<button class="ck-tab" id="ck-t-a" data-t="a" type="button">ДОСТИЖ.</button>
			<button class="ck-tab" id="ck-t-r" data-t="r" type="button" style="display:none">♻ Li</button>
		</div>
		<div class="ck-modes" id="ck-modes">
			<button class="on" data-m="1" type="button">×1</button>
			<button data-m="10" type="button">×10</button>
			<button data-m="100" type="button">×100</button>
			<button data-m="max" type="button">MAX</button>
		</div>
		<div class="ck-pan on" id="ck-p-f"></div>
		<div class="ck-pan" id="ck-p-u"></div>
		<div class="ck-pan" id="ck-p-a"></div>
		<div class="ck-pan" id="ck-p-r"></div>
	</div>
</div>
</div>
`, function(){}, false, live);

});