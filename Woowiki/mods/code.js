const WW_CODE_TEXT = {
	Copy: "Копировать"
}

const WW_CODE_DEFAULTS = {
	CodeLines: false,
	CodeCopy : true
}

const WW_CODE_PALETTES = {
	light: {
		Comment: "#7a7a7a", String: "#0a7a3d", Number: "#b45309", Keyword: "#a626a4", Type : "#0e7490",
		Const  : "#b45309", Fn    : "#2563eb", Builtin: "#c2410c", Meta   : "#9a6700", Tag  : "#be123c",
		Attr   : "#b45309", Heading: "#2563eb", Link  : "#0e7490", Regex  : "#c2410c"
	},
	dark: {
		Comment: "#7f848e", String: "#98c379", Number: "#d19a66", Keyword: "#c678dd", Type : "#e5c07b",
		Const  : "#d19a66", Fn    : "#61afef", Builtin: "#e6a96b", Meta   : "#d4b36a", Tag  : "#e06c75",
		Attr   : "#d19a66", Heading: "#61afef", Link  : "#56b6c2", Regex  : "#e6a96b"
	},
	sepia: {
		Comment: "#8a7a5e", String: "#4d7c0f", Number: "#a15c07", Keyword: "#8f3f71", Type : "#1d6f7a",
		Const  : "#a15c07", Fn    : "#2f5f8f", Builtin: "#b3541e", Meta   : "#8a6d1d", Tag  : "#a8322d",
		Attr   : "#a15c07", Heading: "#8a4b08", Link  : "#1d6f7a", Regex  : "#b3541e"
	}
}

const WW_CODE_CSS = `
.ww-code{ margin:1em 0; border:1px solid var(--ww-border); border-radius:var(--ww-radius); background:var(--ww-code); overflow:hidden; text-align:left; }
.ww-code-head{ display:flex; align-items:center; gap:10px; padding:5px 8px 5px 12px; border-bottom:1px solid var(--ww-border); font-size:12px; line-height:1.4; color:var(--ww-muted); }
.ww-code-title{ flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-weight:600; color:var(--ww-fg); }
.ww-code-copy{ font:inherit; color:var(--ww-muted); background:none; border:1px solid var(--ww-border); border-radius:4px; padding:1px 8px; cursor:pointer; }
.ww-code-copy:hover{ color:var(--ww-fg); }
.ww-code-main{ display:flex; overflow-x:auto; }
.ww-code pre.ww-code-nums, .ww-code pre.ww-code-pre{ margin:0; border:0; border-radius:0; background:none; font:13px/1.55 ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; tab-size:4; white-space:pre; }
.ww-code pre.ww-code-nums{ flex:none; position:sticky; left:0; z-index:1; padding:10px 10px 10px 12px; text-align:right; color:var(--ww-muted); background:var(--ww-code); border-right:1px solid var(--ww-border); user-select:none; }
.ww-code pre.ww-code-pre{ flex:1 0 auto; padding:10px 14px; overflow:visible; }
.ww-code pre.ww-code-pre code{ font:inherit; padding:0; border:0; background:none; color:var(--ww-fg); }
.ww-code-inline{ font-family:ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace; font-size:.92em; padding:1px 5px; border-radius:4px; background:var(--ww-code); color:var(--ww-fg); }
.ww-hl-comment{ color:var(--ww-hl-comment); font-style:italic; }
.ww-hl-string{ color:var(--ww-hl-string); }
.ww-hl-number{ color:var(--ww-hl-number); }
.ww-hl-keyword{ color:var(--ww-hl-keyword); }
.ww-hl-type{ color:var(--ww-hl-type); }
.ww-hl-const{ color:var(--ww-hl-const); }
.ww-hl-fn{ color:var(--ww-hl-fn); }
.ww-hl-builtin{ color:var(--ww-hl-builtin); }
.ww-hl-meta{ color:var(--ww-hl-meta); }
.ww-hl-tag{ color:var(--ww-hl-tag); }
.ww-hl-attr{ color:var(--ww-hl-attr); }
.ww-hl-heading{ color:var(--ww-hl-heading); font-weight:700; }
.ww-hl-link{ color:var(--ww-hl-link); }
.ww-hl-regex{ color:var(--ww-hl-regex); }
.ww-hl-strong{ font-weight:700; }
.ww-hl-em{ font-style:italic; }
`;

// ----------------------------------------------------------------------

const WW_CODE_RULE_WS            = { Class: "",       Regex: /\s+/y }
const WW_CODE_RULE_WORD          = { Class: null,     Regex: /[A-Za-z_$\u0080-\uFFFF][\w$\u0080-\uFFFF]*/y }
const WW_CODE_RULE_NUMBER        = { Class: "Number", Regex: /0[xX][0-9a-fA-F_]+[uUlLfFdDmMn]*|0[bB][01_]+[uUlLn]*|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d+)?[uUlLfFdDmMjJn]*/y }
const WW_CODE_RULE_DQ            = { Class: "String", Regex: /"(?:\\[\s\S]|[^"\\\n])*"?/y }
const WW_CODE_RULE_SQ            = { Class: "String", Regex: /'(?:\\[\s\S]|[^'\\\n])*'?/y }
const WW_CODE_RULE_LINE_COMMENT  = { Class: "Comment", Regex: /\/\/[^\n]*/y }
const WW_CODE_RULE_BLOCK_COMMENT = { Class: "Comment", Regex: /\/\*[\s\S]*?(?:\*\/|$)/y }
const WW_CODE_RULE_TEXT_BLOCK    = { Class: "String", Regex: /\$*"""[\s\S]*?(?:"""|$)/y }
const WW_CODE_RULE_C_INCLUDE     = { Class: "Meta",   Regex: /#[ \t]*include[ \t]*(?:<[^>\n]*>|"[^"\n]*")/y }
const WW_CODE_RULE_C_DIRECTIVE   = { Class: "Meta",   Regex: /#[ \t]*[a-z_]+/y }

const WW_CODE_HTML_ATTRS = [
	WW_CODE_RULE_WS,
	{ Class: "String", Regex: /"[^"]*"?/y },
	{ Class: "String", Regex: /'[^']*'?/y },
	{ Class: "Attr",   Regex: /[^\s=<>\/"']+/y }
]

const WW_CODE_LANGS = {
	c: {
		Name   : "C",
		Keyword: `auto break case const continue default do else enum extern for goto if inline register restrict
			return sizeof static struct switch typedef union volatile while
			_Alignas _Alignof _Atomic _Generic _Noreturn _Static_assert _Thread_local`,
		Type   : `int char short long float double void signed unsigned bool _Bool _Complex size_t ssize_t ptrdiff_t
			intptr_t uintptr_t int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t FILE wchar_t va_list`,
		Const  : `NULL true false EOF stdin stdout stderr INT_MAX INT_MIN UINT_MAX SIZE_MAX RAND_MAX EXIT_SUCCESS EXIT_FAILURE`,
		Rules  : [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_LINE_COMMENT,
			WW_CODE_RULE_BLOCK_COMMENT,
			WW_CODE_RULE_C_INCLUDE,
			WW_CODE_RULE_C_DIRECTIVE,
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	cpp: {
		Name   : "C++",
		Keyword: `alignas alignof and and_eq asm auto bitand bitor break case catch class compl concept const consteval
			constexpr constinit const_cast continue co_await co_return co_yield decltype default delete do dynamic_cast
			else enum explicit export extern final for friend goto if inline mutable namespace new noexcept not not_eq
			operator or or_eq override private protected public register reinterpret_cast requires return sizeof static
			static_assert static_cast struct switch template this thread_local throw try typedef typeid typename union
			using virtual volatile while xor xor_eq`,
		Type   : `bool char char8_t char16_t char32_t double float int long short signed unsigned void wchar_t size_t
			int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t string wstring string_view vector map
			unordered_map set unordered_set list deque array pair tuple optional variant unique_ptr shared_ptr weak_ptr
			function thread mutex atomic ostream istream`,
		Const  : `true false nullptr NULL`,
		Builtin: `std cout cin cerr endl`,
		Rules  : [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_LINE_COMMENT,
			WW_CODE_RULE_BLOCK_COMMENT,
			{ Class: "String", Regex: /(?:u8|[uUL])?R"([^()\s\\]{0,16})\([\s\S]*?(?:\)\1"|$)/y },
			WW_CODE_RULE_C_INCLUDE,
			WW_CODE_RULE_C_DIRECTIVE,
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	cs: {
		Name        : "C#",
		PascalIsType: true,
		Keyword     : `abstract as base break case catch checked class const continue default delegate do else enum event
			explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator
			out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch
			this throw try typeof unchecked unsafe using virtual volatile while
			async await yield record init get set partial where when with required and or not nameof`,
		Type        : `bool byte char decimal double float int long object sbyte short string uint ulong ushort void dynamic
			nint nuint var`,
		Const       : `true false null`,
		Rules       : [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_LINE_COMMENT,
			WW_CODE_RULE_BLOCK_COMMENT,
			WW_CODE_RULE_TEXT_BLOCK,
			{ Class: "String", Regex: /(?:\$@|@\$|@)"(?:""|[^"])*"?/y },
			{ Class: "String", Regex: /\$"(?:\\[\s\S]|[^"\\\n])*"?/y },
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			{ Class: "Meta",   Regex: /#[ \t]*[a-z]+[^\n]*/y },
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	java: {
		Name        : "Java",
		PascalIsType: true,
		Keyword     : `abstract assert break case catch class const continue default do else enum extends final finally for
			goto if implements import instanceof interface native new package private protected public return static
			strictfp super switch synchronized this throw throws transient try volatile while record sealed permits yield`,
		Type        : `boolean byte char double float int long short void var`,
		Const       : `true false null`,
		Rules       : [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_LINE_COMMENT,
			WW_CODE_RULE_BLOCK_COMMENT,
			WW_CODE_RULE_TEXT_BLOCK,
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			{ Class: "Meta", Regex: /@[A-Za-z_]\w*(?:\.\w+)*/y },
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	javascript: {
		Name        : "JavaScript",
		PascalIsType: true,
		Keyword     : `async await break case catch class const continue debugger default delete do else export extends
			finally for from function if import in instanceof let new of return static super switch this throw try typeof
			var void while with yield`,
		Const       : `true false null undefined NaN Infinity`,
		Builtin     : `console document window globalThis localStorage navigator location process require module exports`,
		Rules       : [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_LINE_COMMENT,
			WW_CODE_RULE_BLOCK_COMMENT,
			{ Class: "String", Regex: /`(?:\\[\s\S]|[^`\\])*`?/y },
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			{ Class: "Regex",  Regex: /\/(?![*\/])(?:\\.|\[(?:\\.|[^\]\\\n])*\]|[^\/\\\n\[])+\/[a-z]*/y, Slash: true },
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	python: {
		Name   : "Python",
		Keyword: `and as assert async await break class continue def del elif else except finally for from global if
			import in is lambda nonlocal not or pass raise return try while with yield`,
		Type   : `int float str bool list dict set tuple frozenset bytes bytearray object type complex range`,
		Const  : `True False None`,
		Builtin: `print len input open isinstance issubclass enumerate zip map filter sorted reversed sum min max abs round
			super property staticmethod classmethod hasattr getattr setattr delattr iter next any all repr format id hash
			dir vars callable self cls Exception ValueError TypeError KeyError IndexError`,
		Rules  : [
			WW_CODE_RULE_WS,
			{ Class: "Comment", Regex: /#[^\n]*/y },
			{ Class: "String",  Regex: /[rRbBuUfF]{0,2}("""|''')[\s\S]*?(?:\1|$)/y },
			{ Class: "String",  Regex: /[rRbBuUfF]{0,2}"(?:\\[\s\S]|[^"\\\n])*"?/y },
			{ Class: "String",  Regex: /[rRbBuUfF]{0,2}'(?:\\[\s\S]|[^'\\\n])*'?/y },
			{ Class: "Meta",    Regex: /@[A-Za-z_][\w.]*/y },
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	lua: {
		Name   : "Lua",
		Keyword: `and break do else elseif end for function goto if in local not or repeat return then until while`,
		Const  : `true false nil`,
		Builtin: `print pairs ipairs next type tostring tonumber require pcall xpcall error assert select setmetatable
			getmetatable rawget rawset rawequal rawlen unpack load dofile self table string math os io coroutine debug utf8
			_G _VERSION`,
		Rules  : [
			WW_CODE_RULE_WS,
			{ Class: "Comment", Regex: /--\[(=*)\[[\s\S]*?(?:\]\1\]|$)/y },
			{ Class: "Comment", Regex: /--[^\n]*/y },
			{ Class: "String",  Regex: /\[(=*)\[[\s\S]*?(?:\]\1\]|$)/y },
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			WW_CODE_RULE_NUMBER,
			WW_CODE_RULE_WORD
		]
	},

	markdown: {
		Name : "Markdown",
		Rules: [
			{ Class: "String",  Regex: /(?<![^\n])(```|~~~)[^\n]*\n[\s\S]*?(?:\n\1[^\n]*|$)/y },
			{ Class: "Heading", Regex: /(?<![^\n])#{1,6}[ \t][^\n]*/y },
			{ Class: "Keyword", Regex: /(?<![^\n]):{3,}[^\n]*/y },
			{ Class: "Keyword", Regex: /(?<![^\n])(?:-{3,}|\*{3,}|_{3,})[ \t]*(?=\n|$)/y },
			{ Class: "Keyword", Regex: /(?<![^\n])[ \t]*(?:[-*+]|\d+\.)(?=[ \t])/y },
			{ Class: "Comment", Regex: /(?<![^\n])>[^\n]*/y },
			{ Class: "Link",    Regex: /\[\[[^\]\n]*\]\]/y },
			{ Class: "Builtin", Regex: /\{\{[^}\n]*\}\}/y },
			{ Class: "Link",    Regex: /!?\[[^\]\n]*\]\([^)\n]*\)/y },
			{ Class: "String",  Regex: /`[^`\n]+`/y },
			{ Class: "Strong",  Regex: /\*\*[^*\n]+\*\*|__[^_\n]+__/y },
			{ Class: "Em",      Regex: /\*[^*\n]+\*/y },
			{ Class: "Comment", Regex: /~~[^~\n]+~~/y },
			{ Class: "Tag",     Regex: /<\/?[A-Za-z][^>\n]*>/y },
			{ Class: "",        Regex: /[A-Za-z0-9\u0080-\uFFFF]+/y }
		]
	},

	html: {
		Name  : "HTML",
		States: {
			"": [
				WW_CODE_RULE_WS,
				{ Class: "Comment", Regex: /<!--[\s\S]*?(?:-->|$)/y },
				{ Class: "Meta",    Regex: /<[!?][^>]*>/y },
				{ Class: "Tag",     Regex: /<script(?![\w:.-])/iy, Go: "tag-script" },
				{ Class: "Tag",     Regex: /<style(?![\w:.-])/iy,  Go: "tag-style" },
				{ Class: "Tag",     Regex: /<\/?[A-Za-z][\w:.-]*/y, Go: "tag" },
				{ Class: "Const",   Regex: /&[#\w]+;/y },
				{ Class: "",        Regex: /[^<&\s]+/y }
			],
			"tag"       : [ { Class: "Tag", Regex: /\/?>/y, Go: ""       }, ...WW_CODE_HTML_ATTRS ],
			"tag-script": [ { Class: "Tag", Regex: /\/?>/y, Go: "script" }, ...WW_CODE_HTML_ATTRS ],
			"tag-style" : [ { Class: "Tag", Regex: /\/?>/y, Go: "style"  }, ...WW_CODE_HTML_ATTRS ],
			"script"    : [ { Class: "", Embed: "javascript", Regex: /[\s\S]*?(?=<\/script|$)/iy, Go: "" } ],
			"style"     : [ { Class: "", Embed: "css",        Regex: /[\s\S]*?(?=<\/style|$)/iy,  Go: "" } ]
		}
	},

	css: {
		Name : "CSS",
		Rules: [
			WW_CODE_RULE_WS,
			WW_CODE_RULE_BLOCK_COMMENT,
			WW_CODE_RULE_DQ,
			WW_CODE_RULE_SQ,
			{ Class: "Keyword", Regex: /@[\w-]+/y },
			{ Class: "Keyword", Regex: /!important/y },
			{ Class: "Attr",    Regex: /-{0,2}[A-Za-z][\w-]*(?=\s*:(?![^;{}]*\{))/y },
			{ Class: "Const",   Regex: /--[\w-]+/y },
			{ Class: "Fn",      Regex: /#[\w-]+(?=[^;}]*\{)/y },
			{ Class: "Type",    Regex: /\.[A-Za-z_-][\w-]*(?=[^;}]*\{)/y },
			{ Class: "Meta",    Regex: /::?[A-Za-z-][\w-]*(?=[^;}]*\{)/y },
			{ Class: "Attr",    Regex: /\[[^\]\n]*\](?=[^;}]*\{)/y },
			{ Class: "Number",  Regex: /#[0-9a-fA-F]{3,8}(?![\w-])/y },
			{ Class: "Number",  Regex: /[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?(?:%|[a-zA-Z]+)?/y },
			{ Class: "Fn",      Regex: /[A-Za-z-][\w-]*(?=\()/y },
			{ Class: "Tag",     Regex: /[A-Za-z][\w-]*(?=[^;}]*\{)/y },
			{ Class: "",        Regex: /[\w-]+/y }
		]
	}
}

const WW_CODE_ALIASES = {
	"h"      : "c",
	"c++"    : "cpp",
	"cc"     : "cpp",
	"cxx"    : "cpp",
	"hpp"    : "cpp",
	"hh"     : "cpp",
	"c#"     : "cs",
	"csharp" : "cs",
	"js"     : "javascript",
	"jsx"    : "javascript",
	"mjs"    : "javascript",
	"node"   : "javascript",
	"py"     : "python",
	"python3": "python",
	"md"     : "markdown",
	"htm"    : "html",
	"xhtml"  : "html",
	"xml"    : "html",
	"svg"    : "html"
}

// ----------------------------------------------------------------------

class WoowikiCode{
	static Defs     = WW_CODE_LANGS;
	static Aliases  = WW_CODE_ALIASES;
	static Palettes = WW_CODE_PALETTES;
	static Compiled = Object.create(null);
	static __Tags   = Object.create(null);

	// ----------------------------------------------------------------------

	static Install(Wiki){
		try{
			Woowiki.FillMissingKeys(Wiki.Text, WW_CODE_TEXT);
			Woowiki.FillMissingKeys(Wiki.Options, WW_CODE_DEFAULTS);
			Wiki.AddCss(WW_CODE_CSS, "code");
			Wiki.Code = WoowikiCode;

			const PaletteStyle = document.createElement("style");
			document.head.appendChild(PaletteStyle);
			WoowikiCode.__ApplyPalette(Wiki, PaletteStyle);

			Wiki.On("Theme",  function(){ WoowikiCode.__ApplyPalette(Wiki, PaletteStyle); });
			Wiki.On("Ready",  function(){ WoowikiCode.__ApplyPalette(Wiki, PaletteStyle); });
			Wiki.On("Render", function(Data){ WoowikiCode.__UpgradeFences(Data.Target, Wiki); });

			Wiki.AddElement("code", function(Props, Ctx){
				return WoowikiCode.__RenderElement(Props, Ctx, Wiki);
			});
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.Install() упал!`, e);
		}
	}

	/// Добавляет язык. Key: "go", Def: { Name, Keyword, Type, Const, Builtin, Rules }, AliasList: ["golang"]
	static AddLanguage(Key, Def, AliasList){
		try{
			if(Def.Name === undefined){ throw new ExceptionWW(`У языка "${Key}" нет поля Name!`); }
			if(Def.Rules === undefined && Def.States === undefined){ throw new ExceptionWW(`У языка "${Key}" нет ни Rules, ни States!`); }

			const Lower = Key.toLowerCase();
			WoowikiCode.Defs[Lower] = Def;
			delete WoowikiCode.Compiled[Lower];

			if(AliasList !== undefined){
				for(let i = 0; i < AliasList.length; i++){
					WoowikiCode.Aliases[AliasList[i].toLowerCase()] = Lower;
				}
			}
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.AddLanguage(Key = "${Key}") упал!`, e);
		}
	}

	/// Возвращает скомпилированный язык по имени или алиасу ("cs", "c#", "js"), null если языка нет
	static Find(Name){
		if(Name === undefined || Name === null){ return null; }

		let Key = String(Name).trim().toLowerCase();
		if(Key.length === 0){ return null; }

		const Alias = WoowikiCode.Aliases[Key];
		if(typeof Alias === "string"){ Key = Alias; }

		let Lang = WoowikiCode.Compiled[Key];
		if(Lang !== undefined){ return Lang; }

		const Def = WoowikiCode.Defs[Key];
		if(Def === undefined || Def.Name === undefined){ return null; }

		Lang = WoowikiCode.Compile(Def);
		WoowikiCode.Compiled[Key] = Lang;
		return Lang;
	}

	static Compile(Def){
		try{
			const Lang = {
				Name        : Def.Name,
				States      : Def.States,
				Words       : Object.create(null),
				PascalIsType: Def.PascalIsType === true
			}
			if(Lang.States === undefined){ Lang.States = { "": Def.Rules }; }

			const Kinds = [ "Keyword", "Type", "Const", "Builtin" ];
			for(let i = 0; i < Kinds.length; i++){
				const List = Def[Kinds[i]];
				if(List === undefined){ continue; }

				const Parts = List.split(/\s+/);
				for(let j = 0; j < Parts.length; j++){
					if(Parts[j].length === 0){ continue; }
					Lang.Words[Parts[j]] = Kinds[i];
				}
			}

			return Lang;
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.Compile(Def.Name = "${Def.Name}") упал!`, e);
		}
	}

	/// Возвращает HTML с <span class="ww-hl-...">. Язык неизвестен: просто экранированный текст
	static Highlight(Code, Name){
		try{
			const Lang = WoowikiCode.Find(Name);
			if(Lang === null){ return Woowiki.Esc(Code); }

			const Out    = [];
			const Words  = Lang.Words;
			const Length = Code.length;
			let Rules     = Lang.States[""];
			let RuleCount = Rules.length;
			let Plain     = "";
			let Pos       = 0;
			let LastChar  = "";
			let LastClass = "";

			while(Pos < Length){
				let Found = null;
				let Text  = "";
				for(let i = 0; i < RuleCount; i++){
					const Rule = Rules[i];
					Rule.Regex.lastIndex = Pos;
					const M = Rule.Regex.exec(Code);
					if(M === null){ continue; }
					if(M[0].length === 0 && Rule.Go === undefined){ continue; }
					if(Rule.Slash === true && WoowikiCode.__RegexAllowed(LastChar, LastClass) === false){ continue; }
					Found = Rule;
					Text  = M[0];
					break;
				}

				if(Found === null){
					const Char = Code[Pos];
					Plain += Char;
					Pos++;
					if(Char !== " " && Char !== "\t" && Char !== "\n"){
						LastChar  = Char;
						LastClass = "";
					}
					continue;
				}

				let Class = Found.Class;
				if(Class === null){
					Class = Words[Text];
					if(Class === undefined){
						Class = WoowikiCode.__GuessWordClass(Text, Code[Pos + Text.length], Lang.PascalIsType);
					}
				}

				if(Found.Embed === undefined && Class === ""){
					Plain += Text;
				}else{
					if(Plain.length > 0){
						Out.push(Woowiki.Esc(Plain));
						Plain = "";
					}
					if(Found.Embed !== undefined){
						Out.push(WoowikiCode.Highlight(Text, Found.Embed));
					}else{
						Out.push(`${WoowikiCode.__OpenTag(Class)}${Woowiki.Esc(Text)}</span>`);
					}
				}

				if(Text.length > 0){
					const Last = Text[Text.length - 1];
					if(Last !== " " && Last !== "\t" && Last !== "\n"){
						LastChar  = Last;
						LastClass = Class;
					}
				}

				Pos += Text.length;
				if(Found.Go !== undefined){
					Rules     = Lang.States[Found.Go];
					RuleCount = Rules.length;
				}
			}

			if(Plain.length > 0){ Out.push(Woowiki.Esc(Plain)); }
			return Out.join("");
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.Highlight(Name = "${Name}", Code.length = ${Code.length}) упал!`, e);
		}
	}

	/// Собирает блок с рамкой. Options: { Lang, Title, Lines, Start, Copy }
	static Build(Code, Options){
		try{
			const Lang = WoowikiCode.Find(Options.Lang);
			let Label = "text";
			if(Lang !== null){
				Label = Lang.Name;
			}else if(Options.Lang !== ""){
				Label = Options.Lang;
			}

			let Nums = "";
			if(Options.Lines === true){
				const Count = Code.split("\n").length;
				const Parts = [];
				for(let i = 0; i < Count; i++){
					Parts.push(Options.Start + i);
				}
				Nums = `<pre class="ww-code-nums">${Parts.join("\n")}</pre>`;
			}

			const Body = WoowikiCode.Highlight(Code, Options.Lang);
			let Button = "";
			if(Options.Copy !== ""){ Button = `<button class="ww-code-copy" type="button">${Woowiki.Esc(Options.Copy)}</button>`; }

			return `<div class="ww-code" data-lang="${Woowiki.Esc(Label)}">`
				+ `<div class="ww-code-head"><span class="ww-code-title">${Woowiki.Esc(Options.Title)}</span>`
				+ `<span class="ww-code-lang">${Woowiki.Esc(Label)}</span>${Button}</div>`
				+ `<div class="ww-code-main">${Nums}<pre class="ww-code-pre"><code>${Body}</code></pre></div>`
				+ `</div>`;
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.Build(Options.Lang = "${Options.Lang}", Code.length = ${Code.length}) упал!`, e);
		}
	}

	// ----------------------------------------------------------------------

	static __OpenTag(Class){
		let Tag = WoowikiCode.__Tags[Class];
		if(Tag === undefined){
			Tag = `<span class="ww-hl-${Class.toLowerCase()}">`;
			WoowikiCode.__Tags[Class] = Tag;
		}
		return Tag;
	}

	static __GuessWordClass(Text, Next, PascalIsType){
		if(Next === "("){ return "Fn"; }
		if(PascalIsType === true){
			const First = Text.charCodeAt(0);
			if(First >= 65 && First <= 90 && (Text.length === 1 || Text !== Text.toUpperCase())){ return "Type"; }
		}
		return "";
	}

	static __RegexAllowed(LastChar, LastClass){
		if(LastClass === "Keyword"){ return true; }
		return "(,=:[!&|?{};+-*%<>~^}".indexOf(LastChar) !== -1;
	}

	static __CleanCode(Code){
		return String(Code).replace(/\r\n?/g, "\n").replace(/^(?:[ \t]*\n)+/, "").replace(/\s+$/, "");
	}

	static __RenderElement(Props, Ctx, Wiki){
		try{
			let Lang = "";
			let Code = "";
			if(Props.Lang !== undefined){
				Lang = Props.Lang;
			}else if(Ctx.IsBlock === true && Props.List.length > 0){
				Lang = Props.List[0];
			}

			if(Ctx.IsBlock === true){
				if(Ctx.Body !== undefined){ Code = Ctx.Body; }
			}else if(Props.List.length > 0){
				Code = Props.List[0];
			}
			Code = WoowikiCode.__CleanCode(Code);

			if(Ctx.IsBlock !== true){
				return `<code class="ww-code-inline">${WoowikiCode.Highlight(Code, Lang)}</code>`;
			}

			let Title = "";
			if(Props.Title !== undefined){ Title = Props.Title; }

			let Start = 1;
			if(Props.Start !== undefined){
				const Number = parseInt(Props.Start, 10);
				if(isNaN(Number) === false){ Start = Number; }
			}

			let Lines = Wiki.Options.CodeLines === true;
			if(Props.Lines !== undefined){ Lines = Props.Lines === true || Props.Lines === "true" || Props.Lines === "1"; }

			const Html = WoowikiCode.Build(Code, { Lang: Lang, Title: Title, Lines: Lines, Start: Start, Copy: WoowikiCode.__CopyLabel(Wiki) });
			return {
				Html : Html,
				Mount: function(Box){ WoowikiCode.__BindCopy(Box, Wiki); }
			};
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.__RenderElement(Props = ${Woowiki.Dump(Props)}) упал!`, e);
		}
	}

	static __BindCopy(Box, Wiki){
		const Button = Box.querySelector(".ww-code-copy");
		const Pre    = Box.querySelector(".ww-code-pre");
		if(Button === null || Pre === null){ return; }

		Wiki.Clipboard.Attach(Button, () => Pre.textContent);
	}

	static __CopyLabel(Wiki){
		if(Wiki.Options.CodeCopy !== true || Wiki.Clipboard === undefined){ return ""; }
		return Wiki.Text.Copy;
	}

	static __FenceLang(Pre){
		const Code     = Pre.querySelector("code");
		const Elements = [ Pre, Code ];
		for(let i = 0; i < Elements.length; i++){
			const Element = Elements[i];
			if(Element === null){ continue; }

			const Match = /(?:lang|language)-([\w#+.-]+)/.exec(Element.className);
			if(Match !== null){ return Match[1]; }

			const Attr = Element.getAttribute("data-lang");
			if(Attr !== null && Attr !== ""){ return Attr; }

			const AttrWw = Element.getAttribute("data-ww-lang");
			if(AttrWw !== null && AttrWw !== ""){ return AttrWw; }
		}
		return "";
	}

	static __UpgradeFences(Target, Wiki){
		if(Target === undefined || Target === null || Target.querySelectorAll === undefined){ return; }

		const List = Target.querySelectorAll("pre");
		for(let i = 0; i < List.length; i++){
			const Pre = List[i];
			if(Pre.closest(".ww-code") !== null){ continue; }

			const Lang = WoowikiCode.__FenceLang(Pre);
			if(Lang === ""){ continue; }

			const Code   = Pre.querySelector("code");
			let   Source = Pre.textContent;
			if(Code !== null){ Source = Code.textContent; }

			const Holder = document.createElement("div");
			Holder.innerHTML = WoowikiCode.Build(WoowikiCode.__CleanCode(Source), { Lang: Lang, Title: "", Lines: Wiki.Options.CodeLines === true, Start: 1, Copy: WoowikiCode.__CopyLabel(Wiki) });

			const Block = Holder.firstElementChild;
			Pre.replaceWith(Block);
			WoowikiCode.__BindCopy(Block, Wiki);
		}
	}

	static __PageIsDark(Wiki){
		if(Wiki.Dom === undefined || Wiki.Dom.Article === undefined){ return false; }

		const Parts = getComputedStyle(Wiki.Dom.Article).color.match(/\d+(?:\.\d+)?/g);
		if(Parts === null || Parts.length < 3){ return false; }

		const Brightness = Number(Parts[0]) * 0.299 + Number(Parts[1]) * 0.587 + Number(Parts[2]) * 0.114;
		return Brightness > 140;
	}

	static __ApplyPalette(Wiki, Style){
		try{
			const Light   = WoowikiCode.Palettes.light;
			let   Palette = WoowikiCode.Palettes[Wiki.Theme];
			if(Palette === undefined){
				if(WoowikiCode.__PageIsDark(Wiki) === true){
					Palette = WoowikiCode.Palettes.dark;
				}else{
					Palette = Light;
				}
			}

			let Css = "";
			for(const Key in Light){
				let Value = Palette[Key];
				if(Value === undefined){ Value = Light[Key]; }
				Css += `--ww-hl-${Key.toLowerCase()}:${Value};`;
			}
			Style.textContent = `.ww-code,.ww-code-inline{${Css}}`;
		}catch(e){
			throw new ExceptionWW(`WoowikiCode.__ApplyPalette(Theme = "${Wiki.Theme}") упал!`, e);
		}
	}
}

Woowiki.AddMod("code", WoowikiCode.Install);