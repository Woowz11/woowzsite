REGISTER_PAGE("typing", "TYPΞ", () => {

/* ═══════════════════════════════════════════════════════════
   НАСТРОЙКИ
   ═══════════════════════════════════════════════════════════ */
const SAVE_KEY = "ty_save_v1";

/* Сложности:
   mul   — множитель очков
   v0/v1 — нужная скорость (зн/с): старт и предел. 12 зн/с ≈ 144 WPM, 5 зн/с ≈ 60 WPM
   tau   — за сколько секунд давление растёт (≈ через 3·tau почти предел)
   t0    — стартовое время, tmax — потолок запаса времени
   pen   — штраф за ошибку (сек)
   fast  — бонус за быструю строку (сек)
   len   — длина строк в режимах символов */
const DIFFS = [
	{ id:"easy",   name:"ЛЕГКО",  color:"#7aff9a", mul:1,   v0:1.6, v1:4.0,  tau:80, t0:15, tmax:20, pen:0.6, fast:0.6, len:[14, 22] },
	{ id:"medium", name:"СРЕДНЕ", color:"#00e5ff", mul:2,   v0:2.4, v1:5.5,  tau:80, t0:14, tmax:18, pen:0.8, fast:0.8, len:[22, 34] },
	{ id:"hard",   name:"СЛОЖНО", color:"#d4af37", mul:3.5, v0:3.2, v1:7.5,  tau:75, t0:12, tmax:16, pen:1.0, fast:1.0, len:[34, 50] },
	{ id:"insane", name:"АД",     color:"#ff0044", mul:6,   v0:4.2, v1:10.0, tau:70, t0:10, tmax:14, pen:1.2, fast:1.2, len:[48, 70] },
];

/* Режимы. k — поправка скорости: меньше 1 = режим тяжелее, больше 1 = легче. */
const MODES = [
	{ id:"lua",   grp:"code", ico:"🌙", name:"Lua",        k:0.85, desc:"Таблицы, метатаблицы, корутины." },
	{ id:"js",    grp:"code", ico:"🟨", name:"JavaScript", k:0.85, desc:"Стрелки, DOM, async, регулярки." },
	{ id:"cs",    grp:"code", ico:"🟪", name:"C#",         k:0.80, desc:"LINQ, generic-и, атрибуты." },
	{ id:"cpp",   grp:"code", ico:"🟦", name:"C++",        k:0.80, desc:"Шаблоны, указатели, лямбды." },
	{ id:"nasm",  grp:"code", ico:"⚙️", name:"NASM",       k:0.85, desc:"Ассемблер: регистры, адресация, данные." },
	{ id:"bin",   grp:"raw",  ico:"0️⃣", name:"BINARY",     k:1.25, desc:"Только 0 и 1. Глаза сломаются раньше пальцев." },
	{ id:"hex",   grp:"raw",  ico:"🔶", name:"HEX",        k:0.95, desc:"Байты, адреса, цвета. Регистр важен." },
	{ id:"num",   grp:"raw",  ico:"🔢", name:"ЦИФРЫ",      k:1.10, desc:"Числа, дроби, экспоненты, разделители." },
	{ id:"sym",   grp:"raw",  ico:"🔣", name:"СИМВОЛЫ",    k:0.65, desc:"Скобки, слэши, кавычки. Шифт - твой друг." },
	{ id:"chaos", grp:"raw",  ico:"🌀", name:"ХАОС",       k:0.70, desc:"Всё сразу: слова, числа, hex, bin, куски кода." },
];

/* Строки кода. Одна строка = один символ-ряд без переноса.
   Добавить свою: просто допиши строку в нужный блок.
   В строках нельзя: обратный апостроф и «$ и сразу {». Остальное можно. */
const L = (s, ...v) => String.raw(s, ...v).split("\n").map(x => x.trim()).filter(Boolean);

const CODE = {
lua: [
L`
print("hello")
local x = 10
x = x + 1
if x > 5 then
for i = 1, 10 do
return true
local t = {}
`,
L`
local function add(a, b) return a + b end
for k, v in pairs(tbl) do print(k, v) end
local name = "golu" .. " " .. "wins"
while not done do count = count + 1 end
table.insert(list, { id = 1, hp = 100 })
if x ~= nil and #t > 0 then x = t[1] end
`,
L`
local mt = { __index = function(t, k) return rawget(t, k) or 0 end }
setmetatable(obj, { __call = function(self, ...) return select("#", ...) end })
local ok, err = pcall(function() error("SIGTERM: " .. tostring(code)) end)
for i = #items, 1, -1 do if items[i].dead then table.remove(items, i) end end
local s = string.format("%05.2f|%-8s|%x", 3.14159, "lua", 255)
local co = coroutine.wrap(function() for i = 1, 3 do coroutine.yield(i * 2) end end)
`,
L`
local r = (a % 2 == 0) and (b ^ 2 + c // 3) or ((a << 4) ~ (b >> 1) & 0xFF)
return setmetatable({}, { __index = function(_, k) return (k * 31 + 7) % 1000 end })
string.gsub(text, "(%w+)=(%w+)", function(k, v) return "[" .. k .. ":" .. v .. "]" end)
local f = load("return " .. expr, "=eval", "t", { math = math })
for w in string.gmatch(line, "[^,;]+") do out[#out + 1] = w:upper():sub(1, 3) end
local t = {[1]="a", [2]="b", ["k"]={x=1,y=2}}; print(#t, t.k.x + t.k.y)
`],
js: [
L`
let x = 5;
console.log("hi");
const a = [1, 2, 3];
if (x > 3) return;
function go() {}
let name = "golu";
`,
L`
const sum = (a, b) => a + b;
items.forEach(i => console.log(i.name));
document.getElementById("main").innerHTML = "";
const o = { id: 1, hp: 100, name: "bit" };
for (let i = 0; i < 10; i++) total += i;
setTimeout(() => location.reload(), 1000);
`,
L`
const res = arr.filter(x => x % 2).map(x => x * x).reduce((a, b) => a + b, 0);
async function load(url) { const r = await fetch(url); return r.json(); }
const { id, ...rest } = user, copy = { ...rest, id: id + 1 };
window.addEventListener("keydown", e => e.key === "Escape" && close());
localStorage.setItem("save", JSON.stringify({ score, time: Date.now() }));
class Golu extends Entity { constructor() { super(); this.hp = Infinity; } }
`,
L`
const f = n => n < 2 ? n : f(n - 1) + f(n - 2), memo = new Map([[0, 0], [1, 1]]);
str.replace(/(\d+)-(\w+)/g, (m, a, b) => b + ":" + (a ^ 0xFF)).split("").reverse().join("");
const p = new Proxy({}, { get: (t, k) => k in t ? t[k] : (t[k] = k.length * 31 % 97) });
Promise.all(urls.map(u => fetch(u).then(r => r.ok ? r.json() : null))).then(a => a.flat());
const h = [...s].reduce((a, c) => (a * 33 ^ c.charCodeAt(0)) >>> 0, 5381).toString(16);
new Worker(URL.createObjectURL(new Blob(["onmessage=e=>postMessage(e.data|0)"])));
`],
cs: [
L`
int x = 5;
string s = "hi";
Console.WriteLine(x);
var list = new List<int>();
if (x > 3) return;
bool ok = true;
`,
L`
foreach (var i in items) Console.WriteLine(i);
int sum = list.Sum(x => x * 2);
var d = new Dictionary<string, int>();
public int Hp { get; private set; }
for (int i = 0; i < n; i++) total += i;
static void Main(string[] args) { }
`,
L`
var q = items.Where(i => i.Hp > 0).OrderBy(i => i.Name).ToList();
public override string ToString() => $"{Name}:{Hp}";
try { Run(); } catch (Exception e) { Console.Error.WriteLine(e.Message); }
public async Task<string> LoadAsync(string url) => await client.GetStringAsync(url);
Span<byte> buf = stackalloc byte[256]; buf.Fill(0xFF);
public interface IEntity { void Tick(float dt); int Id { get; } }
`,
L`
var map = src.GroupBy(x => x.Type).ToDictionary(g => g.Key, g => g.Sum(x => x.Hp));
public static T Clamp<T>(T v, T lo, T hi) where T : IComparable<T> => v.CompareTo(lo) < 0 ? lo : v.CompareTo(hi) > 0 ? hi : v;
[StructLayout(LayoutKind.Sequential, Pack = 1)] struct Pkt { public byte Id; public ushort Len; }
int r = (a & 0xFF) << 8 | (b >> 2) ^ ~c % 7;
using var fs = new FileStream("golu.bin", FileMode.Open, FileAccess.Read);
delegate void Handler<in T>(T arg); event Handler<string> OnSigterm;
`],
cpp: [
L`
int x = 5;
std::cout << x;
return 0;
#include <vector>
int main() {
bool ok = true;
`,
L`
std::vector<int> v = {1, 2, 3};
for (int i = 0; i < n; i++) sum += i;
std::string s = "golu";
#include <iostream>
int *p = new int(42);
auto it = m.find(key);
`,
L`
std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });
template <typename T> T add(T a, T b) { return a + b; }
std::unique_ptr<Entity> e = std::make_unique<Entity>(100);
for (const auto &[k, val] : map) std::cout << k << "=" << val << '\n';
std::cout << std::hex << (x & 0xFF) << std::endl;
class Golu : public Entity { public: void tick() override; };
`,
L`
template <typename T, size_t N> constexpr size_t len(const T (&)[N]) { return N; }
std::transform(a.begin(), a.end(), b.begin(), out.begin(), [](auto x, auto y) { return x * y; });
uint32_t h = (h ^ (c << 8)) * 16777619u; h ^= h >> 13;
reinterpret_cast<uint8_t *>(&val)[3] = static_cast<uint8_t>(~mask & 0x7F);
std::map<std::string, std::vector<int>>::iterator it = m.begin();
if (auto p = wp.lock(); p && p->hp > 0) { p->hp -= dmg * 2 % 7; }
`],
nasm: [
L`
mov eax, 1
xor ebx, ebx
push eax
pop ebx
ret
int 0x80
inc ecx
`,
L`
mov eax, [ebp + 8]
add eax, ebx
cmp eax, 10
jne .loop
section .text
global _start
msg db "hello", 0xA
call print
`,
L`
mov byte [edi + ecx], al
lea esi, [eax + ebx * 4 + 8]
movzx eax, byte [esi + ecx]
mov dword [esp + 4], 0x1F
msg: db "GOLU", 10, 0
len equ $ - msg
rep movsb ; copy ecx bytes
cmp byte [esi], 0 ; je .done
`,
L`
cmovne r8d, dword [rsi + rcx * 8 + 0x10] ; select the next packet if flags differ
msg: db "SIGTERM: GOLU.exe stopped by operator", 0x0A, 0x0D, 0
buffer: times 256 db 0x00 ; zero-filled buffer for the packet payload
vpxor ymm0, ymm0, ymm1 ; vpaddd ymm2, ymm0, [rel table + rax * 4 + 0x20]
lea rdi, [rel msg] ; mov rsi, rdi ; mov rdx, msg_len ; mov rax, 1 ; syscall
mov qword [rsp + 0x28], rax ; and rsp, -16 ; sub rsp, 0x40 ; call [rel puts]
`],
};

/* Фразы для конца забега */
const END_TIME = ["SIGTERM: таймер обнулён.", "GOLU ждал быстрее.", "Пальцы отстали от процессора.", "Время вышло. Система записала.", "ERR_TOO_SLOW"];
const END_QUIT = ["Забег прерван.", "Ты сам нажал выход.", "Процесс завершён оператором."];
const WORDS = ["golu", "bit", "glitch", "signal", "null", "void", "kernel", "root", "error", "patch", "sigterm", "crash", "token", "loop", "byte", "hex", "lithium", "eye", "exit"];
const FRAGS = ["x=>x*2", "a[i]++", "if(!p)", "0xFF&m", "$_GET['id']", "mov eax,1", "#define N 8", "<<=", "&&", "||", "!==", "->", "::", "/*", "*/", "%d\\n", "{}", "[]", "NULL", "i32", "**p"];

/* ═══════════════════════════════════════════════════════════
   ДАЛЬШЕ ТРОГАТЬ НЕ НУЖНО
   ═══════════════════════════════════════════════════════════ */
const MODE = Object.create(null); MODES.forEach(m => { MODE[m.id] = m; });
const esc  = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const ri   = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rs   = (set, n) => { let s = ""; for(let i = 0; i < n; i++) s += set[Math.floor(Math.random() * set.length)]; return s; };
const fmtN = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const fmtT = s => { s = Math.floor(s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

const DIG = "0123456789", HEXL = "0123456789abcdef", HEXU = "0123456789ABCDEF", HEXM = "0123456789abcdefABCDEF";
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const SYM1 = "!?.,;:()-", SYM2 = "!?.,;:()-[]{}<>/\\|+=*&%$#@_~^";
const PRINT = ALPHA + ALPHA.toUpperCase() + DIG + SYM2 + "\"'";

const TOK = {
	bin: d => d === 0 ? rs("01", 4) : d === 1 ? rs("01", 8)
		: Math.random() < 0.25 ? "0b" + rs("01", ri(4, 8)) : rs("01", d === 2 ? ri(4, 8) : ri(5, 11)),
	hex: d => {
		if(d === 0) return rs(HEXL, 2);
		if(d === 1) return rs(HEXU, 2);
		if(d === 2) return "0x" + rs(HEXU, pick([2, 4]));
		const r = Math.random();
		return r < 0.35 ? "0x" + rs(HEXM, ri(4, 8)) : r < 0.5 ? "#" + rs(HEXM, 6) : rs(HEXM, ri(3, 8));
	},
	num: d => {
		if(d === 0) return rs(DIG, ri(2, 4));
		if(d === 1) return rs(DIG, ri(4, 7));
		const sign = Math.random() < 0.3 ? "-" : "";
		if(d === 2) return sign + rs(DIG, ri(1, 4)) + (Math.random() < 0.6 ? "." + rs(DIG, ri(2, 5)) : "");
		const r = Math.random();
		if(r < 0.3) return sign + rs(DIG, 1) + "." + rs(DIG, ri(2, 4)) + "e" + (Math.random() < 0.5 ? "-" : "+") + ri(2, 19);
		if(r < 0.55) return ri(1, 9) + "," + rs(DIG, 3) + "," + rs(DIG, 3);
		return (Math.random() < 0.5 ? "+" : "-") + "0." + rs(DIG, ri(3, 6));
	},
	sym: d => d === 0 ? rs(SYM1, ri(2, 4)) : d === 1 ? rs(SYM2, ri(3, 5)) : d === 2 ? rs(ALPHA + DIG + SYM2, ri(4, 7)) : rs(PRINT, ri(4, 8)),
	word: d => {
		const w = pick(WORDS);
		if(d <= 1) return w;
		if(d === 2) return Math.random() < 0.5 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1);
		return [...w].map(c => Math.random() < 0.5 ? c.toUpperCase() : c).join("");
	},
	frag: () => pick(FRAGS),
};
TOK.chaos = d => {
	const pool = d === 0 ? [TOK.word, TOK.num]
		: d === 1 ? [TOK.word, TOK.num, TOK.hex, TOK.sym]
		: d === 2 ? [TOK.word, TOK.num, TOK.hex, TOK.bin, TOK.sym, TOK.frag]
		: [TOK.word, TOK.num, TOK.hex, TOK.bin, TOK.sym, TOK.frag, TOK.frag];
	return pick(pool)(d);
};
function genLine(id, d){
	const r = DIFFS[d].len, n = ri(r[0], r[1]), f = TOK[id];
	let s = "";
	while(s.length < n) s += (s ? " " : "") + f(d);
	return s.slice(0, n).trim() || "0";
}

/* ═══════════════ ЖИВОЙ КОД ═══════════════ */
function init(){
	if(window.__tyClean){ try{ window.__tyClean(); }catch(e){} }
	const root = document.getElementById("ty-root");
	if(!root) return;
	const $ = id => root.querySelector("#" + id);
	const ac = new AbortController(), sig = ac.signal;
	const on = (t, ev, fn) => t.addEventListener(ev, fn, { signal: sig });
	const tms = [];
	let raf = 0;
	window.__tyClean = () => { cancelAnimationFrame(raf); ac.abort(); tms.forEach(t => { clearTimeout(t); clearInterval(t); }); };

	/* ── сохранение ── */
	function loadSave(){
		const o = { rec:{}, mode:MODES[0].id, diff:0, runs:0, chars:0, time:0 };
		try{
			const s = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
			if(s && typeof s === "object"){
				if(s.rec && typeof s.rec === "object") o.rec = s.rec;
				if(MODE[s.mode]) o.mode = s.mode;
				o.diff = Math.max(0, Math.min(DIFFS.length - 1, +s.diff || 0));
				["runs", "chars", "time"].forEach(k => { o[k] = Math.max(0, +s[k] || 0); });
			}
		}catch(e){}
		return o;
	}
	let SV = loadSave();
	const save = () => { try{ localStorage.setItem(SAVE_KEY, JSON.stringify(SV)); }catch(e){} };

	let mode = MODE[SV.mode], di = SV.diff;
	const G = { state:"menu" };
	let hudT = 0, noteT = 0, ignoreUntil = 0;
	const inp = $("ty-in");

	/* ── формулы ── */
	const pressure = () => 1 - Math.exp(-G.t / G.D.tau);
	const reqNow   = () => (G.D.v0 + (G.D.v1 - G.D.v0) * pressure()) * G.M.k;
	const comboMul = () => 1 + Math.min(3, Math.floor(G.combo / 15) * 0.5);
	function speed(now){
		const lim = now - 4000;
		while(G.stamps.length && G.stamps[0] < lim) G.stamps.shift();
		return G.stamps.length / Math.max(1.5, Math.min(4, G.t));
	}

	/* ── колода строк ── */
	function nextLine(){
		if(G.M.grp === "raw") return genLine(G.M.id, G.di);
		if(!G.bag.length){
			const c = CODE[G.M.id] || [];
			let pool = (c[G.di] || []).concat(G.di > 0 ? (c[G.di - 1] || []) : []);
			if(!pool.length) pool = [].concat(...c);
			if(!pool.length) pool = ["// нет строк для этого режима"];
			pool = shuffle(pool.slice());
			if(pool.length > 1 && pool[pool.length - 1] === G.lastL) pool.unshift(pool.pop());
			G.bag = pool;
		}
		return (G.lastL = G.bag.pop());
	}

	/* ── меню ── */
	function renderMenu(){
		const grp = g => MODES.filter(m => m.grp === g).map(m =>
			'<button class="ty-btn ty-chip' + (m.id === mode.id ? " ty-on" : "") + '" data-m="' + m.id + '">' + m.ico + " " + esc(m.name) + '</button>').join("");
		$("ty-m-code").innerHTML = grp("code");
		$("ty-m-raw").innerHTML = grp("raw");
		$("ty-mdesc").textContent = mode.desc;
		$("ty-diffs").innerHTML = DIFFS.map((d, i) => {
			const r = SV.rec[mode.id + ":" + d.id];
			const a = d.v0 * mode.k, b = d.v1 * mode.k;
			return '<button class="ty-dcard' + (i === di ? " ty-on" : "") + '" data-d="' + i + '" style="--c:' + d.color + '">'
				+ '<b>' + d.name + '</b>'
				+ '<small>' + a.toFixed(1) + ' → ' + b.toFixed(1) + ' зн/с</small>'
				+ '<small>≈ ' + Math.round(a * 12) + ' → ' + Math.round(b * 12) + ' WPM</small>'
				+ '<em>' + (r && r.s ? "🏆 " + fmtN(r.s) : "рекорда нет") + '</em></button>';
		}).join("");
		$("ty-start").innerHTML = "▶ НАЧАТЬ <b>" + mode.ico + " " + esc(mode.name) + " · " + DIFFS[di].name + "</b>";
		const r = SV.rec[mode.id + ":" + DIFFS[di].id];
		$("ty-sel").innerHTML = r && r.s
			? "Рекорд: <b>" + fmtN(r.s) + "</b> · " + Math.round(r.w) + " WPM · " + fmtT(r.t) + " · комбо " + r.c + " · точность " + Math.round(r.a) + "% · забегов: " + r.n
			: "Тут ты ещё не играл. Рекорда нет.";
		$("ty-tot").textContent = "ВСЕГО: забегов " + SV.runs + " · символов " + fmtN(SV.chars) + " · времени " + fmtT(SV.time);
		if($("ty-recs").style.display !== "none") renderRecs();
	}
	function renderRecs(){
		let h = '<div class="ty-rg ty-rh"><span></span>' + DIFFS.map(d => '<span style="color:' + d.color + '">' + d.name + '</span>').join("") + '</div>';
		MODES.forEach(m => {
			h += '<div class="ty-rg"><span>' + m.ico + " " + esc(m.name) + '</span>' + DIFFS.map(d => {
				const r = SV.rec[m.id + ":" + d.id];
				return '<span>' + (r && r.s ? fmtN(r.s) : "—") + '</span>';
			}).join("") + '</div>';
		});
		$("ty-recs-in").innerHTML = h;
	}
	function showMenu(){
		G.state = "menu";
		$("ty-menu").style.display = "";
		$("ty-game").style.display = "none";
		root.classList.remove("ty-low");
		renderMenu();
	}

	on($("ty-menu"), "click", e => {
		const m = e.target.closest("[data-m]"), d = e.target.closest("[data-d]");
		if(m){ mode = MODE[m.dataset.m]; if(document.activeElement) document.activeElement.blur(); renderMenu(); }
		else if(d){ di = +d.dataset.d; if(document.activeElement) document.activeElement.blur(); renderMenu(); }
	});
	on($("ty-start"), "click", () => { document.activeElement.blur(); startGame(); });
	on($("ty-rtog"), "click", () => {
		const b = $("ty-recs"), open = b.style.display === "none";
		b.style.display = open ? "" : "none";
		if(open) renderRecs();
	});
	const rr = $("ty-rreset");
	let armed = false, armT = 0;
	const disarm = () => { armed = false; clearTimeout(armT); rr.textContent = "☠ СБРОСИТЬ ВСЕ РЕКОРДЫ"; rr.classList.remove("ty-arm"); };
	on(rr, "click", () => {
		if(!armed){
			armed = true; rr.textContent = "⚠ ТОЧНО? НАЖМИ ЕЩЁ РАЗ"; rr.classList.add("ty-arm");
			armT = setTimeout(disarm, 4000); tms.push(armT);
			return;
		}
		disarm();
		SV = { rec:{}, mode:mode.id, diff:di, runs:0, chars:0, time:0 };
		save(); renderMenu();
	});

	/* ── игра ── */
	function pop(txt, cls){
		const d = document.createElement("div");
		d.className = "ty-pop " + (cls || "");
		d.textContent = txt;
		d.style.left = (28 + Math.random() * 44) + "%";
		$("ty-pops").appendChild(d);
		tms.push(setTimeout(() => d.remove(), 1100));
	}
	function note(t){
		const n = $("ty-note"); n.textContent = t;
		clearTimeout(noteT); noteT = setTimeout(() => { n.textContent = ""; }, 2600); tms.push(noteT);
	}
	function shake(){
		const s = $("ty-stage");
		s.classList.remove("ty-shake"); void s.offsetWidth; s.classList.add("ty-shake");
	}
	function focusIn(){ try{ inp.focus({ preventScroll:true }); }catch(e){ inp.focus(); } }

	function renderLine(){
		const c = $("ty-line");
		c.innerHTML = Array.from(G.cur).map(x => '<span class="ty-c">' + esc(x) + '</span>').join("");
		G.spans = Array.from(c.children);
		if(G.spans[0]) G.spans[0].classList.add("ty-now");
		$("ty-nx").innerHTML = G.q.slice(1).map(s => '<div>' + esc(s) + '</div>').join("");
		c.classList.remove("ty-in"); void c.offsetWidth; c.classList.add("ty-in");
	}
	function paintScore(){
		$("ty-sc").textContent = fmtN(G.score);
		if(G.rec > 0 && G.score > G.rec && !G.beat){
			G.beat = true;
			pop("★ РЕКОРД ПОБИТ", "ty-pr");
			$("ty-sc").classList.add("ty-newrec");
		}
		$("ty-rec").textContent = fmtN(Math.max(G.rec, G.score));
		$("ty-cb").textContent = G.combo + " · x" + comboMul().toFixed(1);
	}

	function startGame(){
		const D = DIFFS[di];
		SV.mode = mode.id; SV.diff = di; save();
		const key = mode.id + ":" + D.id;
		Object.assign(G, {
			state:"ready", D, M:mode, di, key,
			t:0, pool:D.t0, score:0, combo:0, maxCombo:0, chars:0, errs:0, lines:0, perfect:0, lineErrs:0,
			pos:0, stamps:[], beat:false, rec:(SV.rec[key] && SV.rec[key].s) || 0, bag:[], lastL:"", q:[], spans:[],
			last:performance.now(), lineT0:0, maxLv:1, overAt:0
		});
		for(let i = 0; i < 3; i++) G.q.push(nextLine());
		G.cur = G.q[0];
		$("ty-menu").style.display = "none";
		$("ty-game").style.display = "";
		$("ty-over").style.display = "none";
		$("ty-pause").style.display = "none";
		$("ty-pops").innerHTML = "";
		$("ty-sc").classList.remove("ty-newrec");
		$("ty-gtag").textContent = mode.ico + " " + mode.name + " · " + D.name;
		$("ty-note").textContent = "Раскладка EN, регистр важен. Таймер пойдёт с первого нажатия.";
		root.classList.remove("ty-low");
		renderLine(); paintScore(); hudT = 0; hud(performance.now());
		focusIn();
		$("ty-game").scrollIntoView({ block:"nearest" });
	}

	function typeChar(ch){
		if(G.state !== "ready" && G.state !== "play") return;
		if(ch === "\n" || ch === "\r" || ch === "\t") return;
		const now = performance.now();
		if(G.state === "ready"){ G.state = "play"; G.last = now; $("ty-note").textContent = ""; }
		if(!G.lineT0) G.lineT0 = now;
		const want = G.cur[G.pos];
		if(ch === want){
			G.spans[G.pos].className = "ty-c ty-ok";
			G.pos++; G.chars++; G.combo++;
			if(G.combo > G.maxCombo) G.maxCombo = G.combo;
			G.pool = Math.min(G.D.tmax, G.pool + 1 / reqNow());
			G.score += Math.round(10 * G.D.mul * comboMul() * (1 + pressure()));
			G.stamps.push(now);
			if(G.combo % 25 === 0) pop("COMBO " + G.combo, "ty-pc");
			paintScore();
			if(G.pos >= G.cur.length) finishLine(now);
			else G.spans[G.pos].classList.add("ty-now");
		}else{
			G.errs++; G.lineErrs++; G.combo = 0; G.pool -= G.D.pen;
			const sp = G.spans[G.pos];
			sp.classList.remove("ty-bad"); void sp.offsetWidth; sp.classList.add("ty-bad");
			shake();
			if(/[\u0400-\u04FF]/.test(ch) && !/[\u0400-\u04FF]/.test(want)) note("⚠ Похоже, у тебя русская раскладка. Переключи на EN.");
			paintScore();
			if(G.pool <= 0){ G.pool = 0; endGame("time"); }
		}
	}
	function finishLine(now){
		const len = G.cur.length, dur = Math.max(0.2, (now - G.lineT0) / 1000), cps = len / dur;
		let bonus = 0.4; const tags = [];
		if(G.lineErrs === 0){
			bonus += 0.5; G.perfect++;
			G.score += Math.round(len * 3 * G.D.mul * comboMul());
			tags.push("ЧИСТО");
		}
		const fast = cps >= reqNow() * 1.3;
		if(fast){ bonus += G.D.fast; tags.push("БЫСТРО"); }
		G.pool = Math.min(G.D.tmax, G.pool + bonus);
		G.lines++;
		pop("+" + bonus.toFixed(1) + "с" + (tags.length ? " · " + tags.join(" · ") : ""), fast ? "ty-pf" : "ty-pg");
		G.lineErrs = 0; G.lineT0 = 0; G.pos = 0;
		G.q.shift(); G.q.push(nextLine()); G.cur = G.q[0];
		renderLine(); paintScore();
	}

	function hud(now){
		if(G.state === "menu") return;
		const D = G.D;
		$("ty-bar").style.width = Math.max(0, G.pool / D.tmax * 100) + "%";
		$("ty-time").textContent = G.pool.toFixed(1) + "с";
		root.classList.toggle("ty-low", G.state === "play" && G.pool < D.tmax * 0.25);
		if(now - hudT < 120) return;
		hudT = now;
		const req = reqNow(), cps = speed(now), p = pressure();
		const lv = Math.min(10, 1 + Math.floor(p * 10));
		if(lv > G.maxLv){ G.maxLv = lv; pop("▲ ДАВЛЕНИЕ " + lv, "ty-pr"); }
		$("ty-lv").textContent = p > 0.95 ? "MAX" : lv + "/10";
		$("ty-rt").textContent = fmtT(G.t);
		const f = $("ty-spdf");
		f.style.width = Math.min(100, cps / (req * 2) * 100) + "%";
		f.classList.toggle("ty-slow", G.t > 2 && cps < req * 0.98);
		$("ty-spdt").innerHTML = "ТЫ <b>" + cps.toFixed(1) + "</b> зн/с (" + Math.round(cps * 12) + " WPM) · НУЖНО <b>" + req.toFixed(1) + "</b> зн/с (" + Math.round(req * 12) + " WPM)";
	}

	function endGame(why){
		if(G.state === "over" || G.state === "menu") return;
		if(why === "quit" && G.chars === 0){ showMenu(); return; }
		G.state = "over"; G.overAt = performance.now();
		root.classList.remove("ty-low");
		const key = G.key;
		const r = SV.rec[key] || (SV.rec[key] = { s:0, w:0, t:0, c:0, l:0, a:0, d:0, bt:0, bc:0, bw:0, n:0 });
		const prev = r.s;
		const wpm = G.t > 3 ? G.chars / 5 / (G.t / 60) : 0;
		const acc = G.chars + G.errs ? G.chars / (G.chars + G.errs) * 100 : 100;
		r.n++; r.bt = Math.max(r.bt, G.t); r.bc = Math.max(r.bc, G.maxCombo); r.bw = Math.max(r.bw, wpm);
		const isRec = G.score > prev;
		if(isRec){ r.s = G.score; r.w = wpm; r.t = G.t; r.c = G.maxCombo; r.l = G.lines; r.a = acc; r.d = Date.now(); }
		SV.runs++; SV.chars += G.chars; SV.time += G.t;
		save();
		if(isRec && window.__tickerPush) window.__tickerPush("TYPE " + G.M.name + "/" + G.D.name + ": новый рекорд " + fmtN(G.score));

		const st = (k, v) => '<div class="ty-os"><small>' + k + '</small><b>' + v + '</b></div>';
		$("ty-over").innerHTML =
			'<div class="ty-ovin">'
			+ '<div class="ty-ovh">' + (why === "time" ? "⛔ ВРЕМЯ ВЫШЛО" : "■ ЗАБЕГ ЗАВЕРШЁН") + '</div>'
			+ '<div class="ty-ovs">' + fmtN(G.score) + '</div>'
			+ (isRec
				? '<div class="ty-ovr ty-nr">★ ' + (prev ? "НОВЫЙ РЕКОРД" : "ПЕРВЫЙ РЕКОРД") + (prev ? " (был " + fmtN(prev) + ")" : "") + ' ★</div>'
				: '<div class="ty-ovr">Рекорд: ' + fmtN(prev) + ' · до него ' + fmtN(prev - G.score) + '</div>')
			+ '<div class="ty-ovm">' + esc(why === "time" ? pick(END_TIME) : pick(END_QUIT)) + '</div>'
			+ '<div class="ty-ost">'
				+ st("ВРЕМЯ", fmtT(G.t)) + st("СТРОК", G.lines) + st("СИМВОЛОВ", G.chars)
				+ st("СКОРОСТЬ", Math.round(wpm) + " WPM") + st("ТОЧНОСТЬ", Math.round(acc) + "%")
				+ st("МАКС. КОМБО", G.maxCombo) + st("ЧИСТЫХ СТРОК", G.perfect) + st("ДАВЛЕНИЕ", G.maxLv >= 10 ? "MAX" : G.maxLv + "/10")
			+ '</div>'
			+ '<div class="ty-ovb"><button class="ty-btn" data-act="again">↻ ЕЩЁ РАЗ <b>Enter</b></button><button class="ty-btn" data-act="menu">☰ МЕНЮ <b>Esc</b></button></div>'
			+ '</div>';
		$("ty-over").style.display = "flex";
		renderMenu();
	}
	on($("ty-over"), "click", e => {
		const b = e.target.closest("[data-act]"); if(!b) return;
		if(b.dataset.act === "again") startGame(); else showMenu();
	});
	on($("ty-quit"), "click", () => endGame("quit"));

	/* ── пауза ── */
	function pause(){
		if(G.state !== "play") return;
		G.state = "pause";
		$("ty-pause").style.display = "flex";
	}
	function resume(){
		if(G.state !== "pause") return;
		G.state = "play"; G.last = performance.now();
		ignoreUntil = performance.now() + 80;
		$("ty-pause").style.display = "none";
		focusIn();
	}
	on(document, "visibilitychange", () => { if(document.hidden) pause(); });
	on(window, "blur", pause);
	on($("ty-pause"), "click", resume);
	on($("ty-stage"), "click", () => { if(G.state === "ready" || G.state === "play") focusIn(); });

	/* ── ввод ── */
	on(inp, "input", () => {
		const v = inp.value; inp.value = "";
		if(performance.now() < ignoreUntil) return;
		for(const ch of v) typeChar(ch);
	});
	on(inp, "paste", e => e.preventDefault());
	const isMod = e => e.key === "Shift" || e.key === "Control" || e.key === "Alt" || e.key === "Meta" || e.key === "CapsLock";
	on(document, "keydown", e => {
		if(!root.isConnected) return;
		const tag = e.target && e.target.tagName;
		if(G.state === "menu"){
			if(e.key === "Enter" && tag !== "BUTTON" && tag !== "INPUT"){ e.preventDefault(); startGame(); }
			return;
		}
		if(e.key === "Escape"){
			e.preventDefault();
			if(G.state === "over") showMenu(); else endGame("quit");
			return;
		}
		if(G.state === "over"){
			if(e.key === "Enter" && tag !== "BUTTON" && performance.now() - G.overAt > 700){ e.preventDefault(); startGame(); }
			return;
		}
		if(G.state === "pause"){ if(!isMod(e)){ e.preventDefault(); resume(); } return; }
		if(e.key === "Tab") e.preventDefault();
		if(document.activeElement !== inp) focusIn();
	});

	/* ── цикл ── */
	function frame(now){
		if(!root.isConnected){ window.__tyClean(); return; }
		raf = requestAnimationFrame(frame);
		if(G.state === "play"){
			const dt = Math.min(0.1, (now - G.last) / 1000);
			G.last = now; G.t += dt; G.pool -= dt;
			if(G.pool <= 0){ G.pool = 0; hud(now); endGame("time"); return; }
		}
		hud(now);
	}
	raf = requestAnimationFrame(frame);

	renderMenu();
}

const live = () => { try{ init(); }catch(e){ console.error("[TYPE]", e); } };

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
#ty-line{ font:bold 26px/1.55 'Courier New',monospace; white-space:pre-wrap; overflow-wrap:anywhere; color:#b9a58a; letter-spacing:1px; }
#ty-line.ty-in{ animation:ty-in .15s ease-out; }
@keyframes ty-in{ from{ opacity:.2; translate:0 8px } to{ opacity:1; translate:0 0 } }
.ty-c{ border-radius:2px; }
.ty-ok{ color:#7aff9a; text-shadow:0 0 6px rgba(122,255,154,.45); }
.ty-now{ background:#ff0044; color:#fff; box-shadow:0 0 10px #ff0044; animation:ty-cur .8s steps(2) infinite; }
@keyframes ty-cur{ 50%{ background:#a30030 } }
.ty-bad{ animation:ty-bad .3s linear; }
@keyframes ty-bad{ 0%,60%{ background:#fff; color:#ff0044 } 100%{ } }
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
			<div class="ty-rules">
				▸ Печатай строку символ в символ. <b>Раскладка EN, регистр важен.</b><br>
				▸ Таймер тикает всегда, даже когда ты не печатаешь. Верный символ даёт время, чем быстрее печатаешь, тем больше запас.<br>
				▸ Если скорость ниже <b>нужной</b>, время утекает. Нужная скорость растёт до предела сложности.<br>
				▸ Ошибка: штраф по времени, комбо в ноль, символ нужно ввести заново.<br>
				▸ Чистая и быстрая строки дают бонус времени. Очки растут от комбо и давления.<br>
				▸ <b>Esc</b> завершает забег, <b>Enter</b> начинает новый. Забег бесконечный, пока не кончится время.
			</div>
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
`, () => {}, false, live);

});