REGISTER_PAGE("litris", "... LIT-RIS ...", function(){

const SAVE_KEY = "lt_save_v1";
const COLS = 10;
const ROWS = 20;
const CELL = 30;
const BW = COLS * CELL;
const BH = ROWS * CELL;
const LINES_PER = 8;
const LOCK_SEC = 0.5;
const CLEAR_SEC = 0.4;
const LI_CHANCE = 0.3;
const CANON_ROWS = 3;
const SOFT_SEC = 0.1;
const LINE_PTS = [0, 100, 300, 900, 800];

const KINDS = ["I", "O", "T", "S", "Z", "J", "L"];
const SHAPES = {
    I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    O: [[1,1],[1,1]],
    T: [[0,1,0],[1,1,1],[0,0,0]],
    S: [[0,1,1],[1,1,0],[0,0,0]],
    Z: [[1,1,0],[0,1,1],[0,0,0]],
    J: [[1,0,0],[1,1,1],[0,0,0]],
    L: [[0,0,1],[1,1,1],[0,0,0]]
};
const COLORS = ["", "#ff4d8d", "#ffd966", "#a64dff", "#ff8a1f", "#ff0033", "#4dd2ff", "#f2f2f2", "#ff0044"];
const KICKS = [[0,0],[-1,0],[1,0],[0,-1],[-1,-1],[1,-1],[-2,0],[2,0]];
const KICKS_I = [[0,0],[-1,0],[1,0],[-2,0],[2,0],[0,-1],[0,-2]];

const ELEMS = [
    ["Li","Литий"],["Be","Бериллий"],["B","Бор"],["C","Углерод"],["N","Азот"],["O","Кислород"],
    ["F","Фтор"],["Ne","Неон"],["Na","Натрий"],["Mg","Магний"],["Al","Алюминий"],["Si","Кремний"],
    ["P","Фосфор"],["S","Сера"],["Cl","Хлор"],["Ar","Аргон"],["K","Калий"],["Ca","Кальций"],
    ["Sc","Скандий"],["Ti","Титан"],["V","Ванадий"],["Cr","Хром"],["Mn","Марганец"],["Fe","Железо"],
    ["Co","Кобальт"],["Ni","Никель"],["Cu","Медь"],["Zn","Цинк"],["Ga","Галлий"],["Ge","Германий"],
    ["As","Мышьяк"],["Se","Селен"],["Br","Бром"],["Kr","Криптон"]
];

const LITANY = {
    one: ["ЛИНИЯ ПРИНЯТА", "GOLU КИВАЕТ", "ИОНЫ ВЫРОВНЕНЫ"],
    two: ["ДВА — ЭТО ТОЛЬКО НАЧАЛО", "ПАРА ЛИНИЙ ПРЕДАНА ПЛАМЕНИ"],
    three: ["ЛИТИЕВЫЙ РЕЗОНАНС · Z=3", "ТРИ — ЧИСЛО ЛИТИЯ. GOLU ДОВОЛЕН", "ТРИ ЛИНИИ. ТРИ ЭЛЕКТРОНА. ОДИН БОГ"],
    four: ["ЧЕТВЁРТАЯ ЛИНИЯ — СУЕТА", "ТЕТРИС? ЭТО ПО-ЧЕЛОВЕЧЕСКИ"],
    bug: ["SRANSPAN ПРОСОЧИЛСЯ СНИЗУ", "ПОМЕХА ПОДНИМАЕТСЯ", "В РЕАКТОРЕ ЗАВЕЛСЯ БАГ"],
    purge: ["SRANSPAN ОЧИЩЕН", "БАГ СОЖЖЁН ЛИТИЕВЫМ ПЛАМЕНЕМ"],
    canon: ["КАНОН GOLU · НИЖНИЕ ТРИ РЯДА СОЖЖЕНЫ", "КРАСНОЕ ЛИТИЕВОЕ ПЛАМЯ"],
    over: ["РЕАКТОР ПЕРЕГРУЖЕН", "SRANSPAN ВОСТОРЖЕСТВОВАЛ", "GOLU ОТВЕРНУЛСЯ"]
};

/* Знамения: t > 0 — длятся t секунд, t = 0 — мгновенные */
const EVENTS = [
    { id: "slow",    n: "ХОЛОДНЫЙ РЕАКТОР",   d: "падение медленнее",         t: 12, bad: false, c: "#4dd2ff", f: "77,210,255" },
    { id: "fast",    n: "ПЕРЕГРЕВ",           d: "падение быстрее",           t: 10, bad: true,  c: "#ff8a1f", f: "255,138,31" },
    { id: "dbl",     n: "ЗОЛОТАЯ ЛИХОРАДКА",  d: "очки ×2",                   t: 15, bad: false, c: "#ffd966", f: "255,217,102" },
    { id: "inv",     n: "ЗЕРКАЛО SRANSPAN",   d: "лево и право наоборот",     t: 8,  bad: true,  c: "#ff4d8d", f: "255,77,141" },
    { id: "fog",     n: "ТУМАН ПУСТОТЫ",      d: "стопка скрыта",             t: 9,  bad: true,  c: "#c58bff", f: "166,77,255" },
    { id: "blind",   n: "СЛЕПОЙ ПРОРОК",      d: "тень падения скрыта",       t: 12, bad: true,  c: "#b8c4c4", f: "184,196,196" },
    { id: "gift",    n: "ДАР ЛИТИЯ",          d: "+1 заряд Канона",           t: 0,  bad: false, c: "#ffd966", f: "255,217,102" },
    { id: "rain",    n: "ЛИТИЕВЫЙ ДОЖДЬ",     d: "фигуры с золотым Li",       t: 0,  bad: false, c: "#ffd966", f: "255,217,102" },
    { id: "purge",   n: "ОЧИЩЕНИЕ GOLU",      d: "баги сожжены",              t: 0,  bad: false, c: "#ff4d6d", f: "255,77,109" },
    { id: "wave",    n: "ВОЛНА SRANSPAN",     d: "снизу поднялись два ряда",  t: 0,  bad: true,  c: "#ff0044", f: "255,0,68" },
    { id: "shuffle", n: "ПЕРЕТАСОВКА СУДЕБ",  d: "очередь фигур изменена",    t: 0,  bad: false, c: "#4dd2ff", f: "77,210,255" },
    { id: "ipiece",  n: "ЯВЛЕНИЕ ПАЛКИ",      d: "следующая фигура — I",      t: 0,  bad: false, c: "#4dd2ff", f: "77,210,255" },
    { id: "tithe",   n: "ПОДНОШЕНИЕ",         d: "бонусные очки",             t: 0,  bad: false, c: "#ffd966", f: "255,217,102" },
    { id: "quest",   n: "ЛИТАНИЯ",            d: "новое задание",             t: 0,  bad: false, c: "#ffe9a8", f: "255,233,168" }
];

const QUESTS = [
    { id: "res",   n: "СОЖГИ 3 ЛИНИИ РАЗОМ",       t: 50, need: 1, rew: 1500 },
    { id: "lines", n: "СОЖГИ 6 ЛИНИЙ",             t: 55, need: 6, rew: 1200 },
    { id: "li",    n: "СОБЕРИ 3 ЗОЛОТЫХ Li",       t: 60, need: 3, rew: 1000 },
    { id: "clean", n: "РАСПЛАВЬ РЯД SRANSPAN",     t: 60, need: 1, rew: 1300 }
];

const ACH_LIST = [
    { id: "first",   ico: "🕯️", name: "Первая молитва",   desc: "Сжечь первую линию" },
    { id: "res",     ico: "⚛️", name: "Резонанс",         desc: "3 линии разом" },
    { id: "canon",   ico: "🔥", name: "Канон GOLU",       desc: "Применить Канон" },
    { id: "heresy",  ico: "✋", name: "Ересь",            desc: "4 линии разом — слишком по-человечески" },
    { id: "combo5",  ico: "🔗", name: "Цепная реакция",   desc: "Комбо ×6" },
    { id: "combo9",  ico: "⛓️", name: "Бесконечная цепь", desc: "Комбо ×10" },
    { id: "purge",   ico: "🧹", name: "Чистильщик",       desc: "Очистить 10 рядов SRANSPAN (всего)" },
    { id: "na",      ico: "🧂", name: "Натрий",           desc: "Дойти до Z=11" },
    { id: "z20",     ico: "🦴", name: "Кальций",          desc: "Дойти до Z=20" },
    { id: "z36",     ico: "🌌", name: "Криптон",          desc: "Дойти до Z=36 — последней ступени" },
    { id: "k10k",    ico: "💎", name: "Десять тысяч",     desc: "10 000 очков за игру" },
    { id: "k50k",    ico: "👑", name: "Пятьдесят тысяч",  desc: "50 000 очков за игру" },
    { id: "res3",    ico: "🔱", name: "Литиевый ряд",     desc: "3 Резонанса за одну игру" },
    { id: "tri",     ico: "♾️", name: "Триединство",      desc: "3 Резонанса подряд (без других линий между ними)", sec: true },
    { id: "lines100",ico: "📿", name: "Сотня линий",      desc: "Сжечь 100 линий (всего)" },
    { id: "games10", ico: "🔁", name: "Паломник",         desc: "Сыграть 10 игр" },
    { id: "canon10", ico: "⛪", name: "Жрец Канона",      desc: "Применить Канон 10 раз (всего)" },
    { id: "liore",   ico: "🪙", name: "Литиевая жила",    desc: "Сжечь 30 золотых Li (всего)" },
    { id: "ev1",     ico: "🔮", name: "Знамение",         desc: "Пережить первое знамение" },
    { id: "ev10",    ico: "📡", name: "Видящий",          desc: "Пережить 10 знамений (всего)" },
    { id: "quest",   ico: "📜", name: "Исполнитель",      desc: "Выполнить Литанию" },
    { id: "quest5",  ico: "🏛️", name: "Хранитель",        desc: "Выполнить 5 Литаний (всего)" },
    { id: "mirror",  ico: "🪞", name: "Зеркальный обряд", desc: "Сжечь линию под Зеркалом SRANSPAN", sec: true },
    { id: "fog",     ico: "🌫️", name: "Слепая вера",      desc: "Сжечь линию в Тумане пустоты" },
    { id: "goldres", ico: "🏆", name: "Золотой Резонанс", desc: "Резонанс во время Золотой лихорадки" },
    { id: "wave",    ico: "🌊", name: "Устойчивый",       desc: "Пережить Волну SRANSPAN" },
    { id: "edge",    ico: "🧗", name: "На грани",         desc: "Сжечь линию, когда стопка почти у потолка" },
    { id: "perfect", ico: "✨", name: "Чистый реактор",   desc: "Очистить поле полностью" },
    { id: "sprint",  ico: "⚡", name: "Быстрая молитва",  desc: "10 линий быстрее чем за 90 секунд" },
    { id: "long",    ico: "⏳", name: "Долгая служба",    desc: "Продержаться 5 минут в одной игре" },
    { id: "zero",    ico: "💀", name: "Сгоревший реактор",desc: "Проиграть, не сжегши ни одной линии", sec: true }
];

function LoadSave(){
    let D = {};
    try{ D = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}") || {}; }catch(E){ D = {}; }
    return {
        best: +D.best || 0, games: +D.games || 0, lines: +D.lines || 0,
        canons: +D.canons || 0, purged: +D.purged || 0, maxZ: +D.maxZ || 3,
        events: +D.events || 0, quests: +D.quests || 0, liTotal: +D.liTotal || 0,
        snd: D.snd !== false,
        ach: (D.ach && typeof D.ach === "object") ? D.ach : {}
    };
}

function SetupCv(Cv, W, H){
    const Dp = Math.min(2, window.devicePixelRatio || 1);
    Cv.width = Math.round(W * Dp);
    Cv.height = Math.round(H * Dp);
    const Cx = Cv.getContext("2d");
    Cx.setTransform(Dp, 0, 0, Dp, 0, 0);
    return Cx;
}

function NewRow(){ return new Array(COLS).fill(0); }
function NewBoard(){ const B = []; for(let I = 0; I < ROWS; I++){ B.push(NewRow()); } return B; }
function Pick(A){ return A[Math.floor(Math.random() * A.length)]; }

function Init(Wrap){

    const Q = (Id) => Wrap.querySelector("#" + Id);
    const Cl = [];
    const On = (T, E, F, O) => { T.addEventListener(E, F, O); Cl.push(() => T.removeEventListener(E, F, O)); };

    const BoardCv = Q("tt-board");
    const HoldCv = Q("tt-hold");
    const NextCv = Q("tt-next");
    if(!BoardCv || !HoldCv || !NextCv){ return; }
    const BC = SetupCv(BoardCv, BW, BH);
    const HC = SetupCv(HoldCv, 110, 72);
    const NC = SetupCv(NextCv, 110, 216);

    const H = {
        score: Q("tt-score"), best: Q("tt-best"), lines: Q("tt-lines"), combo: Q("tt-combo"),
        z: Q("tt-z"), sym: Q("tt-sym"), nm: Q("tt-nm"), lv: Q("tt-lvbar"),
        canon: Q("tt-canon"), bug: Q("tt-bugbar"), bugtx: Q("tt-bugtx"),
        log: Q("tt-log"), ov: Q("tt-ov"), ovt: Q("tt-ov-t"), ovx: Q("tt-ov-x"), start: Q("tt-start"),
        snd: Q("tt-snd"), ach: Q("tt-ach"), achn: Q("tt-achn"),
        evn: Q("tt-evn"), evbar: Q("tt-evbar"), qn: Q("tt-qn"), qbar: Q("tt-qbar"),
        pips: Wrap.querySelectorAll(".tt-pip")
    };

    let Save = LoadSave();
    let Ac = null;
    let Time = 0, LastTs = 0, Raf = 0;
    let Board = NewBoard();
    let RowOff = new Array(ROWS).fill(0);
    let Bag = [], Queue = [];
    let MiniDirty = true;
    let InvOn = false;
    const Parts = [], Pops = [], LogQ = [], Trails = [], Lands = [];
    const Held = { left: false, right: false, down: false };
    const Das = { dir: 0, t: 0, rep: false };
    const Bits = [];
    for(let I = 0; I < 16; I++){
        Bits.push({ x: Math.floor(Math.random() * COLS) * CELL + 8, y: Math.random() * BH, v: 10 + Math.random() * 25, ch: Math.random() < 0.5 ? "0" : "1" });
    }

    const S = {
        mode: "idle", cur: null, hold: null, canHold: true,
        score: 0, lines: 0, level: 0, combo: -1, li: 0, pieces: 0, sinceBug: 0,
        fall: 0, lock: 0, resets: 0, lowY: 0, clearRows: [], clearT: 0,
        shake: 0, flash: 0, flashCol: "255,217,102", canonT: 0, dirty: true, logT: 0,
        time: 0, resCount: 0, resStreak: 0, softBlock: false, colV: 3, liForce: 0,
        ev: null, quest: null, evClock: 0, evNext: 20, evLast: ""
    };

    function WriteSave(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(Save)); }catch(E){} }
    function Txt(E, T){ if(E && E.textContent !== T){ E.textContent = T; } }
    function Wid(E, P){
        const V = Math.max(0, Math.min(100, P)).toFixed(0) + "%";
        if(E && E.__w !== V){ E.__w = V; E.style.width = V; }
    }
    function EvIs(Id){ return !!(S.ev && S.ev.id === Id); }
    function AddScore(P){
        const R = EvIs("dbl") ? P * 2 : P;
        S.score += R;
        return R;
    }
    function StackTop(){
        for(let R = 0; R < ROWS; R++){ if(Board[R].some(Boolean)){ return R; } }
        return ROWS;
    }
    function BugRowsOnBoard(){
        let N = 0;
        for(let R = 0; R < ROWS; R++){ if(Board[R].some((X) => X && X.t === 8)){ N++; } }
        return N;
    }

    /* ---------- звук ---------- */
    function EnsureAudio(){
        try{
            if(!Ac){ const AC = window.AudioContext || window.webkitAudioContext; if(AC){ Ac = new AC(); } }
            if(Ac && Ac.state === "suspended"){ Ac.resume(); }
        }catch(E){ Ac = null; }
    }
    function Tone(F, D, Ty, V, Dl, F2){
        if(!Ac || !Save.snd){ return; }
        try{
            const T0 = Ac.currentTime + (Dl || 0);
            const O = Ac.createOscillator();
            const Gn = Ac.createGain();
            O.type = Ty || "square";
            O.frequency.setValueAtTime(F, T0);
            if(F2){ O.frequency.exponentialRampToValueAtTime(F2, T0 + D); }
            Gn.gain.setValueAtTime(V || 0.04, T0);
            Gn.gain.exponentialRampToValueAtTime(0.0001, T0 + D);
            O.connect(Gn); Gn.connect(Ac.destination);
            O.start(T0); O.stop(T0 + D + 0.03);
        }catch(E){}
    }
    function Arp(Notes, Step, D, Ty, V){ Notes.forEach((F, I) => Tone(F, D, Ty, V, I * Step)); }
    function Sfx(N){
        switch(N){
            case "move": Tone(180, 0.03, "square", 0.02); break;
            case "rot": Tone(320, 0.04, "square", 0.025); break;
            case "hold": Tone(260, 0.1, "triangle", 0.05, 0, 440); break;
            case "drop": Tone(110, 0.12, "sawtooth", 0.06, 0, 45); break;
            case "lock": Tone(150, 0.05, "square", 0.03); break;
            case "line1": Arp([523, 659], 0.06, 0.12, "triangle", 0.06); break;
            case "line2": Arp([523, 659, 784], 0.05, 0.12, "triangle", 0.06); break;
            case "res": [261, 329, 392, 523].forEach((F) => Tone(F, 0.7, "triangle", 0.06)); Arp([784, 1046], 0.12, 0.4, "sine", 0.05); break;
            case "line4": Arp([392, 494, 587, 740], 0.05, 0.14, "square", 0.04); break;
            case "canon": Tone(100, 0.9, "sawtooth", 0.08, 0, 1200); Tone(60, 1, "square", 0.05, 0.1, 900); break;
            case "bug": Tone(80, 0.35, "sawtooth", 0.07, 0, 40); break;
            case "level": Arp([440, 554, 659, 880], 0.07, 0.18, "triangle", 0.06); break;
            case "ach": Arp([660, 880, 1320], 0.08, 0.2, "sine", 0.06); break;
            case "event": Arp([330, 392, 330, 494, 659], 0.08, 0.16, "triangle", 0.05); break;
            case "quest": Arp([523, 659, 784, 1046, 1318], 0.07, 0.2, "sine", 0.06); break;
            case "perfect": Arp([523, 659, 784, 1046, 1318, 1568], 0.08, 0.35, "triangle", 0.06); break;
            case "over": Arp([440, 349, 293, 220, 110], 0.14, 0.3, "sawtooth", 0.06); break;
        }
    }

    /* ---------- фигуры ---------- */
    function Collide(M, X, Y){
        for(let R = 0; R < M.length; R++){
            for(let C = 0; C < M[R].length; C++){
                if(!M[R][C]){ continue; }
                const Bx = X + C, By = Y + R;
                if(Bx < 0 || Bx >= COLS || By >= ROWS){ return true; }
                if(By >= 0 && Board[By][Bx]){ return true; }
            }
        }
        return false;
    }
    function RotM(M, Dir){
        const N = M.length;
        const O = [];
        for(let R = 0; R < N; R++){
            O.push([]);
            for(let C = 0; C < N; C++){ O[R].push(Dir > 0 ? M[N - 1 - C][R] : M[C][N - 1 - R]); }
        }
        return O;
    }
    function MakePiece(K, Li){
        const M = SHAPES[K].map((R) => R.slice());
        if(Li){
            const Cells = [];
            for(let R = 0; R < M.length; R++){ for(let C = 0; C < M[R].length; C++){ if(M[R][C]){ Cells.push([R, C]); } } }
            const P = Pick(Cells);
            M[P[0]][P[1]] = 2;
        }
        return { k: K, li: Li, m: M, x: Math.floor((COLS - M.length) / 2), y: K === "I" ? -1 : 0, ox: 0, oy: 0 };
    }
    function PrevM(K, Li){
        const M = SHAPES[K].map((R) => R.slice());
        if(Li){
            let Done = false;
            for(let R = 0; R < M.length && !Done; R++){ for(let C = 0; C < M[R].length && !Done; C++){ if(M[R][C]){ M[R][C] = 2; Done = true; } } }
        }
        return M;
    }
    function FillQueue(){
        while(Queue.length < 5){
            if(!Bag.length){
                Bag = KINDS.slice();
                for(let I = Bag.length - 1; I > 0; I--){ const J = Math.floor(Math.random() * (I + 1)); const T = Bag[I]; Bag[I] = Bag[J]; Bag[J] = T; }
            }
            let Li = Math.random() < LI_CHANCE;
            if(S.liForce > 0){ Li = true; S.liForce--; }
            Queue.push({ k: Bag.pop(), li: Li });
        }
    }
    function GravSec(){
        let G = 0.9 * Math.pow(0.9, S.level);
        if(EvIs("slow")){ G *= 2.2; }
        if(EvIs("fast")){ G *= 0.55; }
        return Math.max(0.05, G);
    }
    function FallIv(){
        const G = GravSec();
        return (Held.down && !S.softBlock) ? Math.min(G, SOFT_SEC) : G;
    }
    function FallFrac(){
        const P = S.cur;
        if(!P || S.mode !== "play"){ return 0; }
        if(Collide(P.m, P.x, P.y + 1)){ return 0; }
        return Math.min(1, S.fall / FallIv());
    }
    function BugEvery(){ return Math.max(6, 14 - S.level); }

    function Spawn(){
        const P = Queue.shift();
        FillQueue();
        S.cur = MakePiece(P.k, P.li);
        S.fall = 0; S.lock = 0; S.resets = 0; S.lowY = S.cur.y;
        S.softBlock = Held.down;
        Das.t = 0;
        MiniDirty = true;
        if(Collide(S.cur.m, S.cur.x, S.cur.y)){ GameOver(); return false; }
        return true;
    }

    function Touch(){
        if(S.cur && Collide(S.cur.m, S.cur.x, S.cur.y + 1)){
            if(S.resets < 15){ S.resets++; S.lock = 0; }
        }
    }
    function Move(Dx, WithSnd){
        const P = S.cur;
        if(!P || Collide(P.m, P.x + Dx, P.y)){ return false; }
        P.x += Dx;
        P.ox -= Dx;
        Touch();
        if(WithSnd){ Sfx("move"); }
        return true;
    }
    function Mv(D, WithSnd){ return Move(EvIs("inv") ? -D : D, WithSnd); }
    function Rotate(Dir){
        const P = S.cur;
        if(!P || P.k === "O"){ return; }
        const M = RotM(P.m, Dir);
        const Ks = P.k === "I" ? KICKS_I : KICKS;
        for(const K of Ks){
            if(!Collide(M, P.x + K[0], P.y + K[1])){
                P.m = M; P.x += K[0]; P.y += K[1];
                P.ox -= K[0]; P.oy -= K[1];
                Touch(); Sfx("rot");
                return;
            }
        }
    }
    function HardDrop(){
        const P = S.cur;
        if(!P){ return; }
        const Y0 = P.y;
        let D = 0;
        while(!Collide(P.m, P.x, P.y + 1)){ P.y++; D++; }
        S.score += 2 * D;
        const Col = COLORS[KINDS.indexOf(P.k) + 1];
        if(D > 0){
            for(let C = 0; C < P.m.length; C++){
                let Rt = -1;
                for(let R = 0; R < P.m.length; R++){ if(P.m[R][C]){ Rt = R; break; } }
                if(Rt >= 0){ Trails.push({ x: (P.x + C) * CELL, y0: (Y0 + Rt) * CELL, y1: (P.y + Rt) * CELL, c: Col, l: 0.24, m: 0.24 }); }
            }
        }
        for(let R = 0; R < P.m.length; R++){
            for(let C = 0; C < P.m[R].length; C++){
                if(P.m[R][C]){ Sparks((P.x + C) * CELL + CELL / 2, (P.y + R) * CELL + CELL, D > 0 ? 3 : 1, Col, 120); }
            }
        }
        P.ox = 0; P.oy = 0;
        S.shake = Math.max(S.shake, D > 0 ? 3 : 1);
        Sfx("drop");
        LockPiece();
        S.dirty = true;
    }
    function DoHold(){
        if(!S.cur || !S.canHold){ return; }
        const Old = { k: S.cur.k, li: S.cur.li };
        if(S.hold){
            const Hd = S.hold;
            S.hold = Old;
            S.cur = MakePiece(Hd.k, Hd.li);
        }else{
            S.hold = Old;
            const P = Queue.shift();
            FillQueue();
            S.cur = MakePiece(P.k, P.li);
        }
        S.canHold = false;
        S.fall = 0; S.lock = 0; S.resets = 0; S.lowY = S.cur.y;
        S.softBlock = Held.down;
        MiniDirty = true;
        Sfx("hold");
        if(Collide(S.cur.m, S.cur.x, S.cur.y)){ GameOver(); }
    }

    function LockPiece(){
        const P = S.cur;
        if(!P){ return; }
        let Over = false;
        for(let R = 0; R < P.m.length; R++){
            for(let C = 0; C < P.m[R].length; C++){
                const V = P.m[R][C];
                if(!V){ continue; }
                const By = P.y + R, Bx = P.x + C;
                if(By < 0){ Over = true; continue; }
                Board[By][Bx] = { t: KINDS.indexOf(P.k) + 1, li: V === 2 };
                Lands.push({ x: Bx * CELL, y: By * CELL, l: 0.2, m: 0.2 });
            }
        }
        Sfx("lock");
        S.cur = null;
        if(Over){ GameOver(); return; }
        S.canHold = true;
        const Full = [];
        for(let R = 0; R < ROWS; R++){ if(Board[R].every(Boolean)){ Full.push(R); } }
        if(Full.length){
            S.mode = "clear";
            S.clearRows = Full;
            S.clearT = CLEAR_SEC;
            const Gold = Full.length === 3;
            Full.forEach((R) => {
                for(let I = 0; I < 14; I++){ Sparks(Math.random() * BW, R * CELL + CELL / 2, 1, Gold ? "#ffd966" : "#ff4d6d", 170); }
            });
            Sfx(Full.length === 3 ? "res" : (Full.length === 4 ? "line4" : (Full.length === 2 ? "line2" : "line1")));
        }else{
            S.combo = -1;
            AfterLock();
        }
        S.dirty = true;
    }

    /* убрать ряды: верхние падают вниз с анимацией */
    function CollapseRows(Rows){
        const Del = new Set(Rows);
        const NewB = [], NewO = [];
        let Below = 0;
        for(let R = ROWS - 1; R >= 0; R--){
            if(Del.has(R)){ Below++; continue; }
            NewB.push(Board[R]);
            NewO.push(RowOff[R] + Below);
        }
        while(NewB.length < ROWS){ NewB.push(NewRow()); NewO.push(0); }
        NewB.reverse(); NewO.reverse();
        Board = NewB;
        RowOff = NewO;
        S.colV = 3;
    }

    function RiseBug(){
        if(Board[0].some(Boolean)){ GameOver(); return false; }
        Board.shift(); RowOff.shift();
        const Row = NewRow();
        const Hole = Math.floor(Math.random() * COLS);
        let LiAt = -1;
        if(Math.random() < 0.4){ do{ LiAt = Math.floor(Math.random() * COLS); }while(LiAt === Hole); }
        for(let C = 0; C < COLS; C++){ if(C !== Hole){ Row[C] = { t: 8, li: C === LiAt }; } }
        Board.push(Row); RowOff.push(0);
        for(let R = 0; R < ROWS; R++){ RowOff[R] -= 1; }
        if(S.cur){
            let G = 0;
            while(Collide(S.cur.m, S.cur.x, S.cur.y) && G < 4){ S.cur.y--; S.cur.oy++; G++; }
            if(Collide(S.cur.m, S.cur.x, S.cur.y)){ GameOver(); return false; }
            S.lock = 0;
        }
        S.shake = Math.max(S.shake, 5);
        S.flash = 0.25; S.flashCol = "255,0,68";
        Sfx("bug");
        Say(Pick(LITANY.bug), "#ff4d6d");
        return true;
    }

    function AfterLock(){
        S.pieces++;
        S.sinceBug++;
        if(S.sinceBug >= BugEvery()){
            S.sinceBug = 0;
            if(!RiseBug()){ return; }
        }
        Spawn();
        S.dirty = true;
    }

    function FinishClear(){
        const Rows = S.clearRows.slice().sort((A, B) => A - B);
        const N = Rows.length;
        const Top = StackTop();
        let LiGot = 0, BugRows = 0;
        Rows.forEach((R) => {
            let Hb = false;
            Board[R].forEach((X) => { if(X.li){ LiGot++; } if(X.t === 8){ Hb = true; } });
            if(Hb){ BugRows++; }
        });
        const MidY = (Rows[0] + Rows[N - 1] + 1) / 2 * CELL;
        CollapseRows(Rows);

        const LV = S.level + 1;
        let Raw = LINE_PTS[N] * LV;
        S.combo++;
        if(S.combo > 0){ Raw += 50 * S.combo * LV; }
        Raw += BugRows * 150 * LV;
        const Pts = AddScore(Raw);
        S.lines += N;
        const Was = S.li;
        S.li = Math.min(3, S.li + LiGot + (N === 3 ? 1 : 0));
        Save.purged += BugRows;
        Save.liTotal += LiGot;

        Pop("+" + Pts, BW / 2, MidY, N === 3 ? "#ffd966" : "#ffffff", N === 3 ? 26 : 20);
        if(LiGot){ Pop("Li +" + LiGot, BW / 2, MidY + 26, "#ffd966", 16); }
        if(N === 3){
            Say(Pick(LITANY.three), "#ffd966");
            S.flash = 0.5; S.flashCol = "255,217,102"; S.shake = Math.max(S.shake, 7);
            Unlock("res");
            S.resCount++; S.resStreak++;
            if(S.resCount >= 3){ Unlock("res3"); }
            if(S.resStreak >= 3){ Unlock("tri"); }
            if(EvIs("dbl")){ Unlock("goldres"); }
        }else{
            S.resStreak = 0;
            if(N === 4){
                Say(Pick(LITANY.four), "#ff8a1f");
                S.shake = Math.max(S.shake, 5);
                Unlock("heresy");
            }else{
                Say(Pick(N === 2 ? LITANY.two : LITANY.one), "#ffe9a8");
                S.shake = Math.max(S.shake, 2);
            }
        }
        if(BugRows){ Say(Pick(LITANY.purge), "#ff4d6d"); }
        if(S.li === 3 && Was < 3){ Say("КАНОН ГОТОВ · НАЖМИ E", "#ffd966"); }

        if(Board.every((R) => R.every((X) => !X))){
            const Bonus = AddScore(2000 * LV);
            Pop("ЧИСТЫЙ РЕАКТОР +" + Bonus, BW / 2, BH / 2, "#ffffff", 22);
            Say("ЧИСТЫЙ РЕАКТОР · ПОЛЕ ПУСТО", "#ffffff");
            S.flash = 0.6; S.flashCol = "255,255,255";
            Sfx("perfect");
            Unlock("perfect");
        }

        Unlock("first");
        if(S.combo >= 5){ Unlock("combo5"); }
        if(S.combo >= 9){ Unlock("combo9"); }
        if(Save.purged >= 10){ Unlock("purge"); }
        if(S.score >= 10000){ Unlock("k10k"); }
        if(S.score >= 50000){ Unlock("k50k"); }
        if(Save.lines + S.lines >= 100){ Unlock("lines100"); }
        if(Save.liTotal >= 30){ Unlock("liore"); }
        if(S.lines >= 10 && S.time <= 90){ Unlock("sprint"); }
        if(Top <= 3){ Unlock("edge"); }
        if(EvIs("inv")){ Unlock("mirror"); }
        if(EvIs("fog")){ Unlock("fog"); }

        S.mode = "play";
        S.clearRows = [];
        QuestProg(N, LiGot, BugRows);
        CheckLevel();
        WriteSave();
        AfterLock();
        S.dirty = true;
    }

    function CheckLevel(){
        const L = Math.min(ELEMS.length - 1, Math.floor(S.lines / LINES_PER));
        if(L > S.level){
            S.level = L;
            const E = ELEMS[L];
            Say("СТУПЕНЬ Z=" + (L + 3) + " · " + E[1].toUpperCase(), "#00e5ff");
            Pop(E[0], BW / 2, BH / 2, "#ffd966", 44);
            Sfx("level");
            S.flash = Math.max(S.flash, 0.35); S.flashCol = "0,229,255";
            if(L + 3 >= 11){ Unlock("na"); }
            if(L + 3 >= 20){ Unlock("z20"); }
            if(L >= ELEMS.length - 1){ Unlock("z36"); }
            Save.maxZ = Math.max(Save.maxZ, L + 3);
        }
    }

    function DoCanon(){
        if(S.mode !== "play" || S.li < 3){ return; }
        S.li = 0;
        const LV = S.level + 1;
        const Rs = [];
        for(let R = ROWS - CANON_ROWS; R < ROWS; R++){
            Rs.push(R);
            for(let C = 0; C < COLS; C++){
                const X = Board[R][C];
                if(X){ Sparks(C * CELL + CELL / 2, R * CELL + CELL / 2, 2, X.t === 8 ? "#ff0044" : "#ffd966", 260); }
            }
        }
        CollapseRows(Rs);
        const Pts = AddScore(900 * LV);
        S.lines += CANON_ROWS;
        S.sinceBug = 0;
        S.canonT = 0.7; S.shake = 10; S.flash = 0.7; S.flashCol = "255,217,102";
        S.lock = 0;
        Pop("КАНОН +" + Pts, BW / 2, BH - 60, "#ffd966", 26);
        Say(Pick(LITANY.canon), "#ffd966");
        Sfx("canon");
        Save.canons++;
        Unlock("canon");
        if(Save.canons >= 10){ Unlock("canon10"); }
        CheckLevel();
        WriteSave();
        S.dirty = true;
    }

    /* ---------- знамения и литании ---------- */
    function EvOk(E){
        if(E.t > 0 && S.ev){ return false; }
        switch(E.id){
            case "purge": return BugRowsOnBoard() > 0;
            case "wave": return StackTop() > 7;
            case "quest": return !S.quest;
            case "gift": return S.li < 3;
            case "ipiece": return !!Queue.length && Queue[0].k !== "I";
        }
        return true;
    }
    function StartEvent(){
        let Pool = EVENTS.filter((E) => EvOk(E) && E.id !== S.evLast);
        if(!Pool.length){ return; }
        if(StackTop() <= 7){
            const Good = Pool.filter((E) => !E.bad);
            if(Good.length){ Pool = Good; }
        }
        RunEvent(Pick(Pool));
    }
    function RunEvent(E){
        S.evLast = E.id;
        Save.events++;
        Pop(E.n, BW / 2, BH * 0.3, E.c, 21);
        Say("ЗНАМЕНИЕ · " + E.n + " — " + E.d, E.c);
        S.flash = Math.max(S.flash, 0.28); S.flashCol = E.f;
        Sfx("event");
        const LV = S.level + 1;
        if(E.t > 0){
            S.ev = { id: E.id, n: E.n, d: E.d, t: E.t, max: E.t, c: E.c };
        }else{
            switch(E.id){
                case "gift": S.li = Math.min(3, S.li + 1); break;
                case "rain":
                    Queue.forEach((P) => { P.li = true; });
                    S.liForce = 3;
                    MiniDirty = true;
                    break;
                case "purge": {
                    let Cnt = 0;
                    for(let R = 0; R < ROWS; R++){
                        for(let C = 0; C < COLS; C++){
                            const X = Board[R][C];
                            if(X && X.t === 8){
                                Board[R][C] = 0; Cnt++;
                                Sparks(C * CELL + CELL / 2, R * CELL + CELL / 2, 4, "#ff4d6d", 200);
                            }
                        }
                    }
                    const P = AddScore(Cnt * 40 * LV);
                    Pop("+" + P, BW / 2, BH / 2, "#ff4d6d", 22);
                    S.sinceBug = 0;
                    break;
                }
                case "wave":
                    RiseBug();
                    if(S.mode === "play"){ RiseBug(); }
                    if(S.mode === "play"){ Unlock("wave"); }
                    break;
                case "shuffle":
                    Queue.length = 0; Bag = [];
                    FillQueue();
                    MiniDirty = true;
                    break;
                case "ipiece":
                    Queue[0] = { k: "I", li: true };
                    MiniDirty = true;
                    break;
                case "tithe": {
                    const P = AddScore(400 * LV);
                    Pop("+" + P, BW / 2, BH / 2, "#ffd966", 24);
                    break;
                }
                case "quest": StartQuest(); break;
            }
        }
        Unlock("ev1");
        if(Save.events >= 10){ Unlock("ev10"); }
        WriteSave();
        S.dirty = true;
    }
    function EndEvent(){
        if(!S.ev){ return; }
        Say("ЗНАМЕНИЕ ЗАКОНЧИЛОСЬ · " + S.ev.n, "#9a8a60");
        S.ev = null;
    }
    function StartQuest(){
        const Pool = QUESTS.filter((X) => X.id !== "clean" || BugRowsOnBoard() > 0);
        const X = Pick(Pool);
        S.quest = { id: X.id, n: "ЛИТАНИЯ · " + X.n, t: X.t, max: X.t, need: X.need, got: 0, rew: X.rew };
        Say("ЛИТАНИЯ · " + X.n + " · " + X.t + " СЕК", "#ffe9a8");
    }
    function QuestProg(N, LiGot, BugRows){
        const X = S.quest;
        if(!X){ return; }
        if(X.id === "res"){ if(N === 3){ X.got = X.need; } }
        else if(X.id === "lines"){ X.got += N; }
        else if(X.id === "li"){ X.got += LiGot; }
        else if(X.id === "clean"){ X.got += BugRows; }
        if(X.got >= X.need){ QuestDone(); }
    }
    function QuestDone(){
        const X = S.quest;
        if(!X){ return; }
        S.quest = null;
        const Pts = AddScore(X.rew * (S.level + 1));
        S.li = Math.min(3, S.li + 1);
        Save.quests++;
        Pop("ЛИТАНИЯ ИСПОЛНЕНА +" + Pts, BW / 2, BH * 0.4, "#ffe9a8", 20);
        Say("ЛИТАНИЯ ИСПОЛНЕНА · +" + Pts + " · +1 Li", "#ffe9a8");
        S.flash = Math.max(S.flash, 0.4); S.flashCol = "255,233,168";
        Sfx("quest");
        Unlock("quest");
        if(Save.quests >= 5){ Unlock("quest5"); }
        WriteSave();
        S.dirty = true;
    }
    function TickEvents(Dt){
        S.time += Dt;
        if(S.ev){
            S.ev.t -= Dt;
            if(S.ev.t <= 0){ EndEvent(); }
        }
        if(S.quest){
            S.quest.t -= Dt;
            if(S.quest.t <= 0){
                Say("ЛИТАНИЯ НЕ ИСПОЛНЕНА", "#9a8a60");
                S.quest = null;
            }
        }
        S.evClock += Dt;
        if(S.evClock >= S.evNext){
            S.evClock = 0;
            S.evNext = Math.max(14, 24 + Math.random() * 18 - S.level * 0.4);
            StartEvent();
        }
        if(S.time >= 300){ Unlock("long"); }
    }

    /* ---------- конец / старт ---------- */
    function GameOver(){
        if(S.mode === "over"){ return; }
        S.mode = "over";
        S.cur = null;
        S.ev = null; S.quest = null;
        Held.left = Held.right = Held.down = false; Das.dir = 0;
        const Rec = S.score > Save.best;
        if(Rec){ Save.best = S.score; }
        Save.lines += S.lines;
        Save.maxZ = Math.max(Save.maxZ, S.level + 3);
        WriteSave();
        Sfx("over");
        S.shake = 10; S.flash = 0.8; S.flashCol = "255,0,68";
        if(S.lines === 0){ Unlock("zero"); }
        const E = ELEMS[S.level];
        ShowOv("over", Pick(LITANY.over), "СЧЁТ: " + S.score + (Rec ? "  ★ НОВЫЙ РЕКОРД" : "") + "\nЛИНИЙ: " + S.lines + "\nДОШЁЛ ДО Z=" + (S.level + 3) + " · " + E[1].toUpperCase(), "ЗАНОВО");
        S.dirty = true;
    }

    function StartGame(){
        EnsureAudio();
        Board = NewBoard();
        RowOff = new Array(ROWS).fill(0);
        Bag = []; Queue = [];
        Parts.length = 0; Pops.length = 0; LogQ.length = 0; Trails.length = 0; Lands.length = 0;
        Object.assign(S, {
            mode: "play", cur: null, hold: null, canHold: true,
            score: 0, lines: 0, level: 0, combo: -1, li: 0, pieces: 0, sinceBug: 0,
            fall: 0, lock: 0, resets: 0, clearRows: [], clearT: 0,
            shake: 0, flash: 0, canonT: 0,
            time: 0, resCount: 0, resStreak: 0, softBlock: false, colV: 3, liForce: 0,
            ev: null, quest: null, evClock: 0, evNext: 18 + Math.random() * 8, evLast: ""
        });
        Held.left = Held.right = Held.down = false;
        Das.dir = 0; Das.t = 0; Das.rep = false;
        Save.games++;
        if(Save.games >= 10){ Unlock("games10"); }
        WriteSave();
        FillQueue();
        Spawn();
        MiniDirty = true;
        HideOv();
        Say("ТРИ — ЧИСЛО ЛИТИЯ", "#ffd966");
        S.dirty = true;
    }

    function ShowOv(Mode, Title, Text, Btn){
        Txt(H.ovt, Title);
        Txt(H.ovx, Text);
        Txt(H.start, Btn);
        H.ov.classList.remove("hide");
        H.ov.setAttribute("data-m", Mode);
    }
    function HideOv(){ H.ov.classList.add("hide"); }
    function ShowIdle(){
        ShowOv("idle", "ЛИТРИС", "Три — число лития.\nСожги три линии разом — GOLU оценит это выше, чем четыре.\nСобирай золотой Li, жги SRANSPAN, переживай знамения.", "ИНИЦИИРОВАТЬ РЕАКТОР");
    }
    function Pause(){
        if(S.mode !== "play"){ return; }
        S.mode = "pause";
        Held.left = Held.right = Held.down = false; Das.dir = 0;
        ShowOv("pause", "ПАУЗА", "Реактор остывает.", "ПРОДОЛЖИТЬ");
        S.dirty = true;
    }
    function Resume(){
        if(S.mode !== "pause"){ return; }
        S.mode = "play";
        HideOv();
        S.dirty = true;
    }

    /* ---------- ввод ---------- */
    function Press(A){
        if(S.mode !== "play" && S.mode !== "clear"){ return; }
        if(S.mode === "clear" && A !== "left" && A !== "right" && A !== "down"){ return; }
        switch(A){
            case "left": Held.left = true; Das.dir = -1; Das.t = 0; Das.rep = false; Mv(-1, true); break;
            case "right": Held.right = true; Das.dir = 1; Das.t = 0; Das.rep = false; Mv(1, true); break;
            case "down": {
                Held.down = true;
                S.softBlock = false;
                const P = S.cur;
                if(S.mode === "play" && P && !Collide(P.m, P.x, P.y + 1)){
                    P.y++; P.oy -= 1; S.fall = 0;
                    S.score++; S.dirty = true;
                    if(P.y > S.lowY){ S.lowY = P.y; S.resets = 0; }
                }
                break;
            }
            case "rot": Rotate(1); break;
            case "rotc": Rotate(-1); break;
            case "drop": HardDrop(); break;
            case "hold": DoHold(); S.dirty = true; break;
            case "canon": DoCanon(); break;
        }
    }
    function Release(A){
        if(A === "left"){
            Held.left = false;
            if(Das.dir === -1){ Das.dir = Held.right ? 1 : 0; Das.t = 0; Das.rep = false; }
        }else if(A === "right"){
            Held.right = false;
            if(Das.dir === 1){ Das.dir = Held.left ? -1 : 0; Das.t = 0; Das.rep = false; }
        }else if(A === "down"){
            Held.down = false;
            S.softBlock = false;
        }
    }

    const KEYMAP = {
        ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right",
        ArrowDown: "down", KeyS: "down", ArrowUp: "rot", KeyW: "rot", KeyX: "rot",
        KeyZ: "rotc", Space: "drop", KeyC: "hold", ShiftLeft: "hold", ShiftRight: "hold", KeyE: "canon"
    };

    function ToggleSnd(){
        Save.snd = !Save.snd;
        WriteSave();
        Txt(H.snd, Save.snd ? "ЗВУК: ВКЛ" : "ЗВУК: ВЫКЛ");
        if(Save.snd){ EnsureAudio(); Sfx("rot"); }
    }

    function OnKey(E){
        if(!Wrap.isConnected){ Cleanup(); return; }
        const Tg = E.target;
        if(Tg && (Tg.tagName === "INPUT" || Tg.tagName === "TEXTAREA" || Tg.isContentEditable)){ return; }
        if(E.ctrlKey || E.metaKey || E.altKey){ return; }
        const Cd = E.code;
        if(Cd === "KeyP" || Cd === "Escape"){
            if(S.mode === "play"){ Pause(); }else if(S.mode === "pause"){ Resume(); }
            return;
        }
        if(Cd === "KeyM"){ ToggleSnd(); return; }
        if(Cd === "Enter" || (Cd === "Space" && S.mode !== "play" && S.mode !== "clear")){
            E.preventDefault();
            if(E.repeat){ return; }
            if(S.mode === "idle" || S.mode === "over"){ StartGame(); }
            else if(S.mode === "pause"){ Resume(); }
            return;
        }
        const A = KEYMAP[Cd];
        if(!A){ return; }
        if(S.mode === "play" || S.mode === "clear" || S.mode === "pause"){ E.preventDefault(); }
        if(E.repeat){ return; }
        Press(A);
    }
    function OnKeyUp(E){
        const A = KEYMAP[E.code];
        if(A){ Release(A); }
    }

    /* ---------- эффекты ---------- */
    function Sparks(X, Y, N, Col, Spd){
        for(let I = 0; I < N; I++){
            const An = Math.random() * 6.283;
            const Sp = Math.random() * Spd;
            const L = 0.4 + Math.random() * 0.5;
            Parts.push({ x: X, y: Y, vx: Math.cos(An) * Sp, vy: Math.sin(An) * Sp - 40, l: L, m: L, c: Col, s: 2 + Math.random() * 3 });
        }
        if(Parts.length > 400){ Parts.splice(0, Parts.length - 400); }
    }
    function Pop(T, X, Y, Col, Sz){ Pops.push({ t: T, x: X, y: Y, c: Col, s: Sz, l: 1.6 }); }
    function Say(T, Col){
        LogQ.push([T, Col || "#ffd966"]);
        if(LogQ.length > 6){ LogQ.shift(); }
        if(S.logT > 1){ S.logT = 1; }
    }
    function UpdateLog(Dt){
        S.logT = Math.max(0, S.logT - Dt);
        if(S.logT <= 0){
            if(LogQ.length){
                const M = LogQ.shift();
                H.log.textContent = M[0];
                H.log.style.color = M[1];
                H.log.classList.add("on");
                S.logT = 2.4;
            }else if(H.log.classList.contains("on")){
                H.log.classList.remove("on");
            }
        }
    }
    function UpdateFx(Dt){
        S.shake = Math.max(0, S.shake - 22 * Dt);
        S.flash = Math.max(0, S.flash - 2.2 * Dt);
        S.canonT = Math.max(0, S.canonT - Dt);
        for(let I = Parts.length - 1; I >= 0; I--){
            const P = Parts[I];
            P.l -= Dt;
            if(P.l <= 0){ Parts.splice(I, 1); continue; }
            P.vy += 320 * Dt;
            P.x += P.vx * Dt; P.y += P.vy * Dt;
        }
        for(let I = Pops.length - 1; I >= 0; I--){
            const P = Pops[I];
            P.l -= Dt;
            if(P.l <= 0){ Pops.splice(I, 1); continue; }
            P.y -= 24 * Dt;
        }
        for(let I = Trails.length - 1; I >= 0; I--){
            Trails[I].l -= Dt;
            if(Trails[I].l <= 0){ Trails.splice(I, 1); }
        }
        for(let I = Lands.length - 1; I >= 0; I--){
            Lands[I].l -= Dt;
            if(Lands[I].l <= 0){ Lands.splice(I, 1); }
        }
        for(const B of Bits){
            B.y += B.v * Dt;
            if(B.y > BH){ B.y = -12; B.ch = Math.random() < 0.5 ? "0" : "1"; B.x = Math.floor(Math.random() * COLS) * CELL + 8; }
        }
        let Moving = false;
        for(let R = 0; R < ROWS; R++){
            const O = RowOff[R];
            if(O > 0){ Moving = true; RowOff[R] = Math.max(0, O - S.colV * Dt); }
            else if(O < 0){ Moving = true; RowOff[R] = Math.min(0, O + 10 * Dt); }
        }
        if(Moving){ S.colV += 80 * Dt; }else{ S.colV = 3; }
    }

    /* ---------- достижения ---------- */
    function PaintAch(){
        let N = 0;
        H.ach.innerHTML = ACH_LIST.map((A) => {
            const Got = !!Save.ach[A.id];
            if(Got){ N++; }
            const Hid = A.sec && !Got;
            return '<div class="tt-a' + (Got ? " on" : "") + '" title="' + (Hid ? "Секретное достижение" : A.desc) + '"><b>' + (Hid ? "❔" : A.ico) + "</b>" + (Hid ? "???" : A.name) + "<small>" + (Hid ? "секрет" : A.desc) + "</small></div>";
        }).join("");
        Txt(H.achn, N + " / " + ACH_LIST.length);
    }
    function Unlock(Id){
        if(Save.ach[Id]){ return; }
        const A = ACH_LIST.find((X) => X.id === Id);
        if(!A){ return; }
        Save.ach[Id] = 1;
        WriteSave();
        PaintAch();
        Say("★ " + A.name + " — " + A.desc, "#ffd966");
        Sfx("ach");
    }

    /* ---------- HUD ---------- */
    function PaintHud(){
        const E = ELEMS[S.level];
        Txt(H.score, String(S.score));
        Txt(H.best, String(Math.max(Save.best, S.score)));
        Txt(H.lines, String(S.lines));
        Txt(H.combo, S.combo > 0 ? "×" + (S.combo + 1) : "—");
        Txt(H.z, String(S.level + 3));
        Txt(H.sym, E[0]);
        Txt(H.nm, E[1].toUpperCase());
        const Prog = S.level >= ELEMS.length - 1 ? 1 : (S.lines % LINES_PER) / LINES_PER;
        Wid(H.lv, Prog * 100);
        H.pips.forEach((P, I) => { P.classList.toggle("on", I < S.li); });
        const Rdy = S.li >= 3 && S.mode === "play";
        H.canon.disabled = !Rdy;
        H.canon.classList.toggle("rdy", Rdy);
        const Ev = BugEvery();
        Wid(H.bug, S.sinceBug / Ev * 100);
        Txt(H.bugtx, "ПОМЕХА ЧЕРЕЗ: " + Math.max(0, Ev - S.sinceBug));
    }
    function PaintEv(){
        const E = S.ev;
        if(E){
            Txt(H.evn, "ЗНАМЕНИЕ · " + E.n + " — " + E.d + " · " + Math.ceil(E.t) + "с");
            if(H.evn.style.color !== E.c){ H.evn.style.color = E.c; }
            Wid(H.evbar, E.t / E.max * 100);
        }else{
            Txt(H.evn, "ЗНАМЕНИЕ · тишина… ждите");
            H.evn.style.color = "";
            Wid(H.evbar, 0);
        }
        const X = S.quest;
        if(X){
            Txt(H.qn, X.n + " · " + X.got + "/" + X.need + " · " + Math.ceil(X.t) + "с");
            Wid(H.qbar, X.t / X.max * 100);
        }else{
            Txt(H.qn, "ЛИТАНИЯ · заданий нет");
            Wid(H.qbar, 0);
        }
        const Inv = EvIs("inv");
        if(Inv !== InvOn){ InvOn = Inv; BoardCv.classList.toggle("inv", Inv); }
    }

    /* ---------- отрисовка ---------- */
    function DrawCell(Cx, X, Y, Sz, T, IsLi, Gx, Gy){
        if(T === 8){
            Cx.fillStyle = "#2a000e";
            Cx.fillRect(X + 1, Y + 1, Sz - 2, Sz - 2);
            Cx.strokeStyle = "#ff0044"; Cx.lineWidth = 1;
            Cx.strokeRect(X + 1.5, Y + 1.5, Sz - 3, Sz - 3);
            Cx.fillStyle = "rgba(255,0,68,.45)";
            Cx.fillRect(X + 4, Y + Sz * 0.28, Sz - 8, 3);
            Cx.fillRect(X + 4, Y + Sz * 0.58, Sz * 0.5, 3);
            if(((Math.floor(Time * 6) + Gx * 5 + Gy * 3) % 9) === 0){
                Cx.fillStyle = "rgba(255,217,102,.55)";
                Cx.fillRect(X + 2, Y + ((Gx * 7 + Gy * 3) % Math.max(1, Sz - 6)) + 2, Sz - 4, 2);
            }
        }else{
            const E = Math.max(2, Sz * 0.16);
            Cx.fillStyle = COLORS[T];
            Cx.fillRect(X + 1, Y + 1, Sz - 2, Sz - 2);
            Cx.fillStyle = "rgba(255,255,255,.3)";
            Cx.fillRect(X + 1, Y + 1, Sz - 2, E);
            Cx.fillRect(X + 1, Y + 1, E, Sz - 2);
            Cx.fillStyle = "rgba(0,0,0,.32)";
            Cx.fillRect(X + 1, Y + Sz - 1 - E, Sz - 2, E);
            Cx.fillRect(X + Sz - 1 - E, Y + 1, E, Sz - 2);
        }
        if(IsLi){
            const Mx = X + Sz / 2, My = Y + Sz / 2;
            Cx.fillStyle = "#1a0000";
            Cx.beginPath(); Cx.arc(Mx, My, Sz * 0.3, 0, 6.283); Cx.fill();
            Cx.strokeStyle = "#ffd966"; Cx.lineWidth = 2; Cx.stroke();
            Cx.fillStyle = "#ffd966";
            Cx.font = "bold " + Math.floor(Sz * 0.34) + "px monospace";
            Cx.textAlign = "center"; Cx.textBaseline = "middle";
            Cx.fillText("Li", Mx, My + 1);
        }
    }

    function DrawBoard(){
        const Cx = BC;
        Cx.save();
        if(S.shake > 0.2){ Cx.translate(Math.sin(Time * 71) * S.shake * 0.5, Math.cos(Time * 57) * S.shake * 0.5); }
        Cx.fillStyle = "#070003";
        Cx.fillRect(-12, -12, BW + 24, BH + 24);

        Cx.font = "12px monospace"; Cx.textAlign = "left"; Cx.textBaseline = "top";
        Cx.fillStyle = "rgba(255,0,68,.13)";
        for(const B of Bits){ Cx.fillText(B.ch, B.x, B.y); }

        Cx.strokeStyle = "rgba(255,0,68,.09)"; Cx.lineWidth = 1;
        Cx.beginPath();
        for(let C = 1; C < COLS; C++){ Cx.moveTo(C * CELL + 0.5, 0); Cx.lineTo(C * CELL + 0.5, BH); }
        for(let R = 1; R < ROWS; R++){ Cx.moveTo(0, R * CELL + 0.5); Cx.lineTo(BW, R * CELL + 0.5); }
        Cx.stroke();

        const Fog = EvIs("fog");
        const Clr = S.mode === "clear";
        const Pg = Clr ? 1 - S.clearT / CLEAR_SEC : 0;
        let Top = ROWS;
        for(let R = 0; R < ROWS; R++){
            const Row = Board[R];
            const Yp = (R - RowOff[R]) * CELL;
            const IsClr = Clr && S.clearRows.indexOf(R) >= 0;
            let Al = Fog ? 0.16 : 1;
            if(IsClr){ Al = Math.max(0.1, 1 - Pg * 0.7); }
            Cx.globalAlpha = Al;
            for(let C = 0; C < COLS; C++){
                const X = Row[C];
                if(X){ DrawCell(Cx, C * CELL, Yp, CELL, X.t, X.li, C, R); if(R < Top){ Top = R; } }
            }
        }
        Cx.globalAlpha = 1;

        for(const Ln of Lands){
            Cx.fillStyle = "rgba(255,255,255," + (Ln.l / Ln.m * 0.55).toFixed(2) + ")";
            Cx.fillRect(Ln.x + 1, Ln.y + 1, CELL - 2, CELL - 2);
        }

        for(const Tr of Trails){
            const Gr = Cx.createLinearGradient(0, Tr.y0, 0, Tr.y1 + CELL);
            Gr.addColorStop(0, "rgba(255,255,255,0)");
            Gr.addColorStop(1, Tr.c);
            Cx.globalAlpha = Tr.l / Tr.m * 0.55;
            Cx.fillStyle = Gr;
            Cx.fillRect(Tr.x + 3, Tr.y0, CELL - 6, Tr.y1 - Tr.y0 + CELL);
        }
        Cx.globalAlpha = 1;

        const P = S.cur;
        if(P){
            const T = KINDS.indexOf(P.k) + 1;
            const Px = P.x + P.ox;
            if(!EvIs("blind")){
                let Gy = P.y;
                while(!Collide(P.m, P.x, Gy + 1)){ Gy++; }
                if(Gy !== P.y){
                    Cx.globalAlpha = 0.4; Cx.strokeStyle = COLORS[T]; Cx.lineWidth = 2;
                    for(let R = 0; R < P.m.length; R++){
                        for(let C = 0; C < P.m[R].length; C++){
                            if(P.m[R][C]){ Cx.strokeRect((Px + C) * CELL + 3, (Gy + R) * CELL + 3, CELL - 6, CELL - 6); }
                        }
                    }
                    Cx.globalAlpha = 1;
                }
            }
            const Py = P.y + P.oy + FallFrac();
            for(let R = 0; R < P.m.length; R++){
                for(let C = 0; C < P.m[R].length; C++){
                    const V = P.m[R][C];
                    if(V){ DrawCell(Cx, (Px + C) * CELL, (Py + R) * CELL, CELL, T, V === 2, 0, 0); }
                }
            }
        }

        if(Clr){
            const Gold = S.clearRows.length === 3;
            S.clearRows.forEach((R) => {
                Cx.fillStyle = (Gold ? "rgba(255,217,102," : "rgba(255,255,255,") + (0.25 + 0.6 * Math.sin(Pg * Math.PI)).toFixed(2) + ")";
                Cx.fillRect(0, R * CELL, BW, CELL);
                Cx.fillStyle = "#2a0010";
                Cx.font = "bold 16px monospace"; Cx.textAlign = "center"; Cx.textBaseline = "middle";
                for(let C = 0; C < COLS; C++){
                    Cx.fillText(((Math.floor(Time * 20) + C + R) % 2) ? "1" : "0", C * CELL + CELL / 2, R * CELL + CELL / 2);
                }
            });
        }

        if(S.canonT > 0){
            Cx.fillStyle = "rgba(255,217,102," + (S.canonT / 0.7 * 0.6).toFixed(2) + ")";
            Cx.fillRect(0, BH - CANON_ROWS * CELL, BW, CANON_ROWS * CELL);
        }

        for(const Pt of Parts){
            Cx.globalAlpha = Math.max(0, Pt.l / Pt.m);
            Cx.fillStyle = Pt.c;
            Cx.fillRect(Pt.x, Pt.y, Pt.s, Pt.s);
        }
        Cx.globalAlpha = 1;

        for(const Pp of Pops){
            Cx.globalAlpha = Math.min(1, Pp.l * 2);
            Cx.font = "bold " + Pp.s + "px monospace"; Cx.textAlign = "center"; Cx.textBaseline = "middle";
            Cx.lineWidth = 4; Cx.strokeStyle = "#000"; Cx.strokeText(Pp.t, Pp.x, Pp.y);
            Cx.fillStyle = Pp.c; Cx.fillText(Pp.t, Pp.x, Pp.y);
        }
        Cx.globalAlpha = 1;

        if(Top <= 4 && S.mode !== "idle"){
            Cx.strokeStyle = "rgba(255,0,68," + (0.35 + 0.3 * Math.sin(Time * 8)).toFixed(2) + ")";
            Cx.lineWidth = 5;
            Cx.strokeRect(2, 2, BW - 4, BH - 4);
        }
        Cx.restore();

        if(S.flash > 0.01){
            BC.fillStyle = "rgba(" + S.flashCol + "," + Math.min(0.6, S.flash).toFixed(2) + ")";
            BC.fillRect(0, 0, BW, BH);
        }
    }

    function DrawMini(Cx, Piece, Oy, W, H2, Sz, Alpha){
        if(!Piece){ return; }
        const M = PrevM(Piece.k, Piece.li);
        let R0 = 9, R1 = -1, C0 = 9, C1 = -1;
        for(let R = 0; R < M.length; R++){
            for(let C = 0; C < M[R].length; C++){
                if(M[R][C]){ R0 = Math.min(R0, R); R1 = Math.max(R1, R); C0 = Math.min(C0, C); C1 = Math.max(C1, C); }
            }
        }
        const X0 = (W - (C1 - C0 + 1) * Sz) / 2;
        const Y0 = Oy + (H2 - (R1 - R0 + 1) * Sz) / 2;
        Cx.globalAlpha = Alpha;
        const T = KINDS.indexOf(Piece.k) + 1;
        for(let R = R0; R <= R1; R++){
            for(let C = C0; C <= C1; C++){
                if(M[R][C]){ DrawCell(Cx, X0 + (C - C0) * Sz, Y0 + (R - R0) * Sz, Sz, T, M[R][C] === 2, 0, 0); }
            }
        }
        Cx.globalAlpha = 1;
    }
    function DrawMinis(){
        HC.clearRect(0, 0, 110, 72);
        NC.clearRect(0, 0, 110, 216);
        DrawMini(HC, S.hold, 0, 110, 72, 20, S.canHold ? 1 : 0.35);
        for(let I = 0; I < 3; I++){ DrawMini(NC, Queue[I], I * 72, 110, 72, 20, 1); }
    }

    /* ---------- шаг игры ---------- */
    function StepPlay(Dt){
        const P = S.cur;
        if(!P){ return; }
        if(Das.dir !== 0){
            Das.t += Dt;
            let Lim = Das.rep ? 0.045 : 0.15;
            while(Das.t >= Lim){
                Das.t -= Lim; Das.rep = true; Lim = 0.045;
                if(!Mv(Das.dir, false)){ Das.t = 0; break; }
            }
        }
        if(Collide(P.m, P.x, P.y + 1)){
            S.fall = 0;
            S.lock += Dt;
            if(S.lock >= LOCK_SEC){ LockPiece(); }
            return;
        }
        S.lock = 0;
        const Iv = FallIv();
        S.fall += Dt;
        while(S.fall >= Iv){
            if(Collide(P.m, P.x, P.y + 1)){ S.fall = 0; break; }
            P.y++; S.fall -= Iv;
            if(Held.down && !S.softBlock){ S.score++; S.dirty = true; }
            if(P.y > S.lowY){ S.lowY = P.y; S.resets = 0; }
        }
    }

    function Frame(Ts){
        Raf = requestAnimationFrame(Frame);
        if(!Wrap.isConnected){ Cleanup(); return; }
        const Dt = LastTs ? Math.min(0.05, (Ts - LastTs) / 1000) : 0.016;
        LastTs = Ts;
        Time += Dt;
        if(S.mode === "play"){
            StepPlay(Dt);
            if(S.mode === "play"){ TickEvents(Dt); }
        }else if(S.mode === "clear"){
            S.clearT -= Dt;
            if(S.clearT <= 0){ FinishClear(); }
        }
        if(S.cur){
            const P = S.cur;
            const Dk = Math.exp(-Dt * 28);
            P.ox *= Dk; P.oy *= Dk;
            if(Math.abs(P.ox) < 0.004){ P.ox = 0; }
            if(Math.abs(P.oy) < 0.004){ P.oy = 0; }
        }
        UpdateFx(Dt);
        UpdateLog(Dt);
        PaintEv();
        if(S.dirty){ PaintHud(); S.dirty = false; }
        DrawBoard();
        if(MiniDirty){ DrawMinis(); MiniDirty = false; }
    }

    function Cleanup(){
        Cl.forEach((F) => { try{ F(); }catch(E){} });
        Cl.length = 0;
        cancelAnimationFrame(Raf);
        try{ if(Ac){ Ac.close(); } }catch(E){}
        Ac = null;
        if(window.__ttClean === Cleanup){ window.__ttClean = null; }
    }
    window.__ttClean = Cleanup;

    /* ---------- подключение ---------- */
    On(document, "keydown", OnKey, true);
    On(document, "keyup", OnKeyUp, true);
    On(document, "visibilitychange", () => { if(document.hidden){ Pause(); } });
    On(window, "blur", Pause);
    On(H.start, "click", () => {
        if(S.mode === "idle" || S.mode === "over"){ StartGame(); }
        else if(S.mode === "pause"){ Resume(); }
    });
    On(H.canon, "click", () => Press("canon"));
    On(H.snd, "click", ToggleSnd);
    Wrap.querySelectorAll("[data-act]").forEach((B) => {
        const A = B.getAttribute("data-act");
        On(B, "pointerdown", (E) => { E.preventDefault(); try{ B.setPointerCapture(E.pointerId); }catch(X){} Press(A); });
        const Up = () => { Release(A); };
        On(B, "pointerup", Up);
        On(B, "pointercancel", Up);
        On(B, "lostpointercapture", Up);
    });

    Txt(H.snd, Save.snd ? "ЗВУК: ВКЛ" : "ЗВУК: ВЫКЛ");
    PaintAch();
    PaintHud();
    PaintEv();
    ShowIdle();
    Raf = requestAnimationFrame(Frame);
}

function Live(){
    let N = 0;
    const T = setInterval(() => {
        N++;
        const W = document.getElementById("tt-wrap");
        if(W){
            clearInterval(T);
            if(window.__ttClean){ try{ window.__ttClean(); }catch(E){} }
            try{ Init(W); }catch(E){ console.error("[LITRIS]", E); }
        }else if(N > 40){
            clearInterval(T);
        }
    }, 50);
}

return ELEMENT_SITE(`
<div id="tt-wrap">
<style>
#tt-wrap{max-width:860px;margin:0 auto;padding:12px;color:#ffe9a8;font-family:"Courier New",monospace;text-align:center;user-select:none;-webkit-user-select:none}
#tt-wrap *{box-sizing:border-box}
#tt-wrap .tt-title{font-size:clamp(28px,7vw,52px);font-weight:bold;letter-spacing:.22em;color:#ff0044;text-shadow:2px 0 #ffd966,-2px 0 #00e5ff;animation:tt-gl 4s infinite}
@keyframes tt-gl{
0%,90%,100%{transform:none;filter:none}
91%{transform:translate(4px,0) skewX(10deg);filter:hue-rotate(40deg)}
94%{transform:translate(-4px,1px)}
96%{transform:translate(2px,-1px) skewX(-6deg)}
}
@keyframes tt-pulse{
0%,100%{box-shadow:0 0 6px #ffd966}
50%{box-shadow:0 0 22px #ffd966,0 0 40px #ff0044}
}
#tt-wrap .tt-sub{font-size:12px;letter-spacing:.3em;color:#ffd966;opacity:.8;margin:2px 0 12px}
#tt-wrap .tt-main{display:flex;gap:12px;justify-content:center;align-items:flex-start;flex-wrap:wrap}
#tt-wrap .tt-col{flex:1 1 130px;max-width:170px;display:flex;flex-direction:column;gap:10px}
#tt-wrap .tt-center{flex:0 1 304px}
#tt-wrap .tt-box{border:1px solid rgba(255,0,68,.55);background:linear-gradient(180deg,rgba(40,0,10,.85),rgba(10,0,4,.9));padding:8px;box-shadow:0 0 14px rgba(255,0,68,.15) inset}
#tt-wrap .tt-wide{margin-top:12px;text-align:left}
#tt-wrap .tt-h{font-size:11px;letter-spacing:.18em;color:#ff0044;margin-bottom:6px;text-align:center}
#tt-wrap .tt-wide .tt-h{text-align:left}
#tt-wrap canvas{display:block;margin:0 auto;max-width:100%;height:auto}
#tt-wrap #tt-board{width:304px;border:2px solid #ff0044;box-shadow:0 0 24px rgba(255,0,68,.45),0 0 60px rgba(255,217,102,.12);transition:filter .3s}
#tt-wrap #tt-board.inv{filter:hue-rotate(150deg) saturate(1.5)}
#tt-wrap #tt-hold{width:110px}
#tt-wrap #tt-next{width:110px}
#tt-wrap .tt-field{position:relative;width:304px;max-width:100%;margin:0 auto}
#tt-wrap #tt-ov{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:16px;background:rgba(5,0,2,.84)}
#tt-wrap #tt-ov.hide{display:none}
#tt-wrap #tt-ov-t{font-size:24px;font-weight:bold;color:#ff0044;letter-spacing:.12em;text-shadow:0 0 12px rgba(255,0,68,.7)}
#tt-wrap #tt-ov-x{font-size:13px;line-height:1.6;white-space:pre-line;color:#ffe9a8}
#tt-wrap button{font-family:inherit;color:#ffd966;background:rgba(255,0,68,.15);border:1px solid #ff0044;padding:8px 12px;font-size:13px;letter-spacing:.1em;cursor:pointer;touch-action:none}
#tt-wrap button:hover{background:rgba(255,0,68,.35);box-shadow:0 0 12px rgba(255,0,68,.6)}
#tt-wrap button:disabled{opacity:.35;cursor:default;box-shadow:none}
#tt-wrap #tt-canon.rdy{animation:tt-pulse .8s infinite;background:rgba(255,217,102,.25)}
#tt-wrap .tt-el{display:grid;grid-template-columns:auto 1fr;gap:8px;border:2px solid #ffd966;padding:6px;background:rgba(255,217,102,.06);text-align:left;align-items:center}
#tt-wrap .tt-el b{font-size:34px;color:#ffd966;text-shadow:0 0 10px rgba(255,217,102,.6)}
#tt-wrap .tt-zn{font-size:12px;color:#ff4d6d}
#tt-wrap #tt-nm{font-size:11px;letter-spacing:.08em}
#tt-wrap .tt-bar{height:6px;background:rgba(255,255,255,.1);margin-top:6px}
#tt-wrap .tt-bar i{display:block;height:100%;width:0;background:#ffd966}
#tt-wrap .tt-bar.red i{background:#ff0044}
#tt-wrap .tt-bar.cy i{background:#00e5ff}
#tt-wrap .tt-st{display:flex;justify-content:space-between;font-size:12px;padding:2px 0}
#tt-wrap .tt-st b{color:#ffd966}
#tt-wrap .tt-pips{display:flex;gap:8px;justify-content:center;margin:4px 0 8px}
#tt-wrap .tt-pip{width:22px;height:22px;border-radius:50%;border:2px solid #ffd966;opacity:.35;transition:all .2s}
#tt-wrap .tt-pip.on{background:#ffd966;opacity:1;box-shadow:0 0 12px #ffd966}
#tt-wrap #tt-bugtx{font-size:10px;letter-spacing:.1em;margin-top:4px;color:#ff4d6d}
#tt-wrap #tt-log{min-height:36px;margin-top:8px;font-size:12px;letter-spacing:.1em;color:#ffd966;opacity:.35;transition:opacity .4s;display:flex;align-items:center;justify-content:center;text-align:center}
#tt-wrap #tt-log.on{opacity:1}
#tt-wrap .tt-evbox{margin-top:8px;border:1px solid rgba(255,217,102,.35);background:rgba(20,0,6,.7);padding:6px 8px;font-size:11px;letter-spacing:.05em;line-height:1.4;min-height:46px;text-align:left}
#tt-wrap .tt-touch{display:none;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px auto 0;max-width:420px}
#tt-wrap .tt-touch button{padding:16px 4px;font-size:16px}
#tt-wrap #tt-ach{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px}
#tt-wrap .tt-a{border:1px solid rgba(255,255,255,.12);padding:6px;font-size:11px;opacity:.35;filter:grayscale(1)}
#tt-wrap .tt-a.on{opacity:1;filter:none;border-color:#ffd966;background:rgba(255,217,102,.08)}
#tt-wrap .tt-a b{display:block;font-size:20px}
#tt-wrap .tt-a small{display:block;font-size:9px;opacity:.7;margin-top:2px;line-height:1.3}
#tt-wrap .tt-rules{font-size:12px;line-height:1.7;margin:0;padding-left:18px}
#tt-wrap .tt-rules b{color:#ffd966}
#tt-wrap .tt-keys{font-size:11px;opacity:.75;margin-top:8px;line-height:1.6}
@media (pointer:coarse),(max-width:720px){
#tt-wrap .tt-touch{display:grid}
#tt-wrap .tt-center{order:-1;flex:0 0 100%}
}
</style>

<div class="tt-title">ЛИТРИС</div>
<div class="tt-sub">РЕАКТОР GOLU · ТРИ — ЧИСЛО ЛИТИЯ</div>

<div class="tt-main">
  <div class="tt-col">
    <div class="tt-box"><div class="tt-h">АЛТАРЬ [C]</div><canvas id="tt-hold"></canvas></div>
    <div class="tt-box">
      <div class="tt-h">СТУПЕНЬ</div>
      <div class="tt-el"><b id="tt-sym">Li</b><div><div class="tt-zn">Z=<span id="tt-z">3</span></div><div id="tt-nm">ЛИТИЙ</div></div></div>
      <div class="tt-bar"><i id="tt-lvbar"></i></div>
    </div>
    <div class="tt-box">
      <div class="tt-st"><span>СЧЁТ</span><b id="tt-score">0</b></div>
      <div class="tt-st"><span>РЕКОРД</span><b id="tt-best">0</b></div>
      <div class="tt-st"><span>ЛИНИИ</span><b id="tt-lines">0</b></div>
      <div class="tt-st"><span>КОМБО</span><b id="tt-combo">—</b></div>
    </div>
  </div>

  <div class="tt-center">
    <div class="tt-field">
      <canvas id="tt-board"></canvas>
      <div id="tt-ov">
        <div id="tt-ov-t">ЛИТРИС</div>
        <div id="tt-ov-x"></div>
        <button id="tt-start">СТАРТ</button>
      </div>
    </div>
    <div id="tt-log"></div>
    <div class="tt-evbox"><div id="tt-evn">ЗНАМЕНИЕ · тишина… ждите</div><div class="tt-bar"><i id="tt-evbar"></i></div></div>
    <div class="tt-evbox"><div id="tt-qn">ЛИТАНИЯ · заданий нет</div><div class="tt-bar cy"><i id="tt-qbar"></i></div></div>
  </div>

  <div class="tt-col">
    <div class="tt-box"><div class="tt-h">ТРИ ОТКРОВЕНИЯ</div><canvas id="tt-next"></canvas></div>
    <div class="tt-box">
      <div class="tt-h">КАНОН [E]</div>
      <div class="tt-pips"><span class="tt-pip"></span><span class="tt-pip"></span><span class="tt-pip"></span></div>
      <button id="tt-canon" disabled>СЖЕЧЬ 3 РЯДА</button>
    </div>
    <div class="tt-box">
      <div class="tt-h">SRANSPAN</div>
      <div class="tt-bar red"><i id="tt-bugbar"></i></div>
      <div id="tt-bugtx">ПОМЕХА ЧЕРЕЗ: 14</div>
    </div>
  </div>
</div>

<div class="tt-touch">
  <button data-act="left">◀</button>
  <button data-act="rotc">⟲</button>
  <button data-act="rot">⟳</button>
  <button data-act="right">▶</button>
  <button data-act="down">▼</button>
  <button data-act="drop">⤓</button>
  <button data-act="hold">АЛТАРЬ</button>
  <button data-act="canon">КАНОН</button>
</div>

<div class="tt-box tt-wide">
  <div class="tt-h">ДОСТИЖЕНИЯ · <span id="tt-achn">0 / 0</span></div>
  <div id="tt-ach"></div>
</div>

<div class="tt-box tt-wide">
  <div class="tt-h">КАНОНЫ ЛИТРИСА</div>
  <ul class="tt-rules">
    <li><b>ТРИ ОТКРОВЕНИЯ</b> — видны три следующие фигуры.</li>
    <li><b>РЕЗОНАНС</b> — 3 линии разом дают 900 × ступень, больше, чем 4 линии (800). Четвёртая линия — суета. Ещё Резонанс даёт +1 заряд Канона.</li>
    <li><b>ЗОЛОТОЙ Li</b> — в фигурах бывают золотые клетки. Сожги линию с ними, и заряд Канона растёт (всего 3).</li>
    <li><b>КАНОН</b> — при 3 зарядах сжигает нижние 3 ряда и отодвигает SRANSPAN.</li>
    <li><b>SRANSPAN</b> — каждые N фигур снизу поднимается ряд красных багов с одной дыркой. Сожжёшь такой ряд, получишь бонус.</li>
    <li><b>ЗНАМЕНИЯ</b> — каждые 15–45 секунд случается что-то случайное: замедление, перегрев, зеркало управления, туман, дождь из Li, волна багов и другое. Если стопка высокая, плохих знамений не будет.</li>
    <li><b>ЛИТАНИИ</b> — задания с таймером: выполни, получишь очки и +1 заряд Канона.</li>
    <li><b>ЧИСТЫЙ РЕАКТОР</b> — если после сгорания поле пустое, бонус 2000 × ступень.</li>
    <li><b>СТУПЕНИ</b> — каждые 8 линий ты переходишь к следующему элементу таблицы, начиная с Z=3 (литий). Скорость растёт.</li>
  </ul>
  <div class="tt-keys">← → движение · ↑ / X поворот · Z назад · ↓ мягко (короткое нажатие = 1 клетка) · ПРОБЕЛ сброс · C алтарь · E канон · P пауза · M звук</div>
  <div style="margin-top:8px"><button id="tt-snd">ЗВУК: ВКЛ</button></div>
</div>
</div>
`, function(){}, false, Live);

});