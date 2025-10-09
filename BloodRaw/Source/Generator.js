/* Генератор для BloodRaw */

/* Запущен сайт локально?  */ const IsLocal	 = window.location.protocol === "file:";
/* Путь до файла с паком   */ const PackFile = "https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/BloodRaw-Pack.zip";
 
/* Дефолтная текстура */ const DefaultTexture   = "R/T/Default.png";
/* Текстура ошибка    */ const ErrorTexture     = "R/T/Error.png";
/* Текстура Changelog */ const ChangelogTexture = "R/O/Changelog.file";

/* ======================================================== */

Logger.Info("Сайт генератор пака BloodRaw!\nСделан Woowz11");

var Console = document.getElementById("Console");

Logger.Console = function(Message, Type = 0, Title){
	switch(Type){
		case 0: Logger.Info (Message, null, InGeneration ? "color: lime;" : undefined); break;
		case 1: Logger.Warn (Message                                                 ); break;
		case 2: Logger.Error(Message                                                 ); break;
	}
	if(!InGeneration){ return; }

	const M = document.createElement("p");
	
	if(Title){ M.title = Title; M.style.cursor = "help"; }
	
	if(Type > 0){ M.style.color = Type === 1 ? "yellow" : "red"; }
	
	M.textContent = "[" + String((Date.now() - GenerationStartTime)).padEnd(4, "-") + "]: " + Message;
	
	Console.appendChild(M);
}

Logger.ConsoleWithTitle = function(Message, Title){
	Logger.Console(Message, 0, Title);
}

Logger.ConsoleWarn = function(Message, Exception){
	Logger.Warn(Message, Exception);
	Logger.Console(Message, 1);
}

Logger.ConsoleError = function(Message, Exception){
	HasError = true;
	
	if(Exception){
		Logger.Error(Message, Exception);
		Logger.Console(Exception.Message, 2);
	}else{
		Logger.Console(Message, 2);
	}
	
	Logger.Console("См. консоль (F12)", 2);
}

/* Более умный JSON.parse */
function JSONParse(Text){
	function StripComments(Text_){
		var R = "", inStr = false, strChar = "", inCom = "", i = 0;
		while(i < Text_.length){
			const c = Text_[i], n = Text_[i+1];

			if(!inCom){
				if(!inStr && (c === '"' || c === "'")) inStr = true, strChar = c;
				else if(inStr && c === strChar && Text_[i-1] !== '\\') inStr = false;
				
				if(!inStr && c === '/' && n === '/'){ inCom = 'line'; i++; }
				else if(!inStr && c === '/' && n === '*'){ inCom = 'block'; i++; }
				else R += c;
			} else {
				if(inCom === 'line' && (c === '\n' || c === '\r')){ inCom = ''; R += c; }
				if(inCom === 'block' && c === '*' && n === '/'){ inCom = ''; i++; }
			}
			i++;
		}
		return R;
	}
	
	Text = StripComments(Text);
	Text = Text.replace(/^\uFEFF/		  , "");
	Text = Text.replace(/[\x00-\x1F\x7F]/g , c => c === '\n' || c === '\r' ? c : '');

	if(__JSONParse[Text]){ return DeepClone(__JSONParse[Text]); }

	var Pos = 0;

	function SkipWhitespace(){ while(/\s/.test(Text[Pos])){ Pos++; } }

	function ParseValue(){
		SkipWhitespace();
		
		const Char = Text[Pos];
		if(Char === '{'){ return ParseObject(); }
		if(Char === '['){ return ParseArray (); }
		if(Char === '"'){ return ParseString(); }
		if(/[-0-9]/.test(Char)){ return ParseNumber(); }
		if(Text.startsWith('true' , Pos)){ Pos += 4; return true ; }
		if(Text.startsWith('false', Pos)){ Pos += 5; return false; }
		if(Text.startsWith('null' , Pos)){ Pos += 4; return null ; }
		throw new Error("Неожиданный символ в позиции [" + Pos + "]");
	}

	function ParseObject(){
		const Obj = {};
		const Keys = new Set();
		
		Pos++;
		
		SkipWhitespace();
		if(Text[Pos] === '}'){ Pos++; return Obj; }

		while(true){
			SkipWhitespace();
			const Key = ParseString();
			if(Keys.has(Key)){ Logger.Warn("Повторяющийся ключ [" + Key + "] в позиции [" + Pos + "]"); }
			Keys.add(Key);
			SkipWhitespace();
			if (Text[Pos] !== ':') throw new Error("Ожидался символ ':' после ключа в позиции [" + Pos + "]");
			Pos++;
			const Value = ParseValue();
			Obj[Key] = Value;
			
			SkipWhitespace();
			if (Text[Pos] === '}'){ Pos++; break; }
			
			SkipWhitespace();
			if (Text[Pos] !== ','){ throw new Error("Ожидалась запятая после пары ключ-значение в позиции [" + Pos + "]"); }
			Pos++;
			
			SkipWhitespace();
			if (Text[Pos] === '}'){ Pos++; break; } 
		}
		return Obj;
	}

	function ParseArray(){
		const Arr = [];
		Pos++;
		SkipWhitespace();
		if(Text[Pos] === ']'){ Pos++; return Arr; }

		while(true){
			const Value = ParseValue();
			Arr.push(Value);
			SkipWhitespace();
			if (Text[Pos] === ']'){ Pos++; break; }
			if (Text[Pos] !== ','){ throw new Error("Ожидалась запятая в массиве в позиции [" + Pos + "]"); }
			Pos++;
			SkipWhitespace();
			if(Text[Pos] === ']'){ Pos++; break; }
		}
		return Arr;
	}

	function ParseString(){
		Pos++;
		var Result = "";
		while(true){
			if(Pos >= Text.length){ throw new Error("Не закрыта строка"); }
			const Char = Text[Pos];
			if (Char === '"'){ Pos++; break; }
			if (Char === '\\'){
				Pos++;
				const Escape = Text[Pos];
				const Map = { '"':'"', '\\':'\\', '/':'/', b:'\b', f:'\f', n:'\n', r:'\r', t:'\t' };
				if (Map[Escape] !== undefined) Result += Map[Escape];
				else if (Escape === 'u'){
					const Hex = Text.substr(Pos + 1,4);
					if (!/^[0-9a-fA-F]{4}$/.test(Hex)){ throw new Error("Неверная escape-последовательность Unicode"); }
					Result += String.fromCharCode(parseInt(Hex, 16));
					Pos += 4;
				} else throw new Error("Неверная escape-последовательность \\" + Escape);
			} else Result += Char;
			Pos++;
		}
		return Result;
	}

	function ParseNumber(){
		const NumMatch = /^[+-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(Text.slice(Pos));
		if(!NumMatch){ throw new Error("Неверное число в позиции [" + Pos + "]"); }
		Pos += NumMatch[0].length;
		return Number(NumMatch[0]);
	}

	const Result = ParseValue();
	SkipWhitespace();
	if(Pos !== Text.length){ throw new Error("Неожиданный символ в позиции [" + Pos + "]"); }

	__JSONParse[Text] = Result;
	return Result;
}
const __JSONParse = {};

/* Останавливает поток на определённое кол-во миллисекунд */
function Sleep(MS){
	return new Promise(R => setTimeout(R, MS));
}

/* Обновляет строку */
function UpdateText(Text){
	const R = {...__ReplaceText, ...{
        D_Version    : SelectedVersion,
		D_Date       : new Date().toLocaleDateString("ru-RU").replace(/\//g, '.'),
		D_CurrentFile: CurrentFile,
		D_PackFormat : PackFormat,
		D_TotalFiles : (BuildFile ? TotalFiles + 1 : TotalFiles),
		D_Time       : GenerationTime
	}};

	return Text.replace(/<([A-Za-z0-9_]+)>/g, (M, K, O) => {
		if(K in R){ return R[K]; }
		Logger.ConsoleError(`Не найден текстовой код <${K}>!\nТекст: ${Text}`);
		return "undefined";
	});
}
const __ReplaceText = {};

/* Обновляет анимацию */
function UpdateAnimation(Animation){
	if(typeof Animation !== "string"){ return Animation; }
	
	if(Animation in __ReplaceAnimation){
		return __ReplaceAnimation[Animation];
	}else{
		throw new Error("Анимация [" + Animation + "] не найдена!");
	}
}
const __ReplaceAnimation = {};

/* Обновляет цвет */
function UpdateColor(Color){
	return Color in __ReplaceColor ? __ReplaceColor[Color] : Color;
}
const __ReplaceColor = {};

/* Конвертация цвета в байты */
function CalculateColor(Color){
	try{
		if(typeof Color !== "string"){ return Color; }
	
		if(__Colors[Color]){ return __Colors[Color]; }
	
		if(!CalculateColor.CTX){
			const C = document.createElement("canvas");
			C.width = 1; C.height = 1;
			CalculateColor.CTX = C.getContext("2d");
		}
	
		Color = UpdateColor(Color);
		
		const Old = CalculateColor.CTX.fillStyle;
		CalculateColor.CTX.fillStyle = Color;
		
		if(CalculateColor.CTX.fillStyle === Old){ Logger.ConsoleError("Не получилось определить цвет [" + Color + "]!"); CalculateColor.CTX.fillStyle = "rgb(255,0,255)"; }
		
		CalculateColor.CTX.clearRect(0, 0, 1, 1);
		CalculateColor.CTX.fillRect (0, 0, 1, 1);
		var Result = CalculateColor.CTX.getImageData(0, 0, 1, 1).data;
		__Colors[Color] = Result;
		return Result;
	}catch(e){
		throw new Error("Произошла ошибка при расчёте цвета", e);
	}
}
__Colors = {};

/* Глубокое копирование объекта */
function DeepClone(Obj){
	if(Obj === null || typeof Obj !== "object"){ return Obj; }

	if(Array.isArray(Obj)){
		return Obj.map(DeepClone);
	}

	if(ArrayBuffer.isView(Obj)){
		return new Obj.constructor(Obj);
	}

	const Clone = Object.create(Object.getPrototypeOf(Obj));

	for(const Key of Object.keys(Obj)){
		Clone[Key] = DeepClone(Obj[Key]);
	}

	return Clone;
}

function Lerp(A, B, T){ return A + (B - A) * T; }
function Clamp(N, Min, Max){ return N <= Min ? Min : (N >= Max ? Max : N); }

/* Проверяет, есть ли файл */
function HasFile(Path){
	return PackFiles[Path] !== null && PackFiles[Path] !== undefined;
}

/* Получить файл */
async function GetFile(Path, ThatTexture = false){
	Path = Path.replace(/\\/g, "/").replace(/\/+/g, "/");
	
	if(__GetFileCache[Path]){ return __GetFileCache[Path]; }
	
	var File = PackFiles[Path];
	if(!HasFile(Path)){ throw new Error("Файл [" + Path + "] не найден!"); }
	
	const Extension = Path.split(".").pop().toLowerCase();
	
	if(Extension === "file"){
		const FileInfo = await FileContentJSON(File);
		File = await GenerateFile(Path, FileInfo);
	}else{
		if(ThatTexture){
			const PNGContent = await FileContentByte(File);
		
			const Blob_  = new Blob([PNGContent], { type: "image/png" });
			
			const { W, H, Content } = await new Promise((R, E) => {
				const Image_ = new Image();
				Image_.onload = () => {
					const C = document.createElement("canvas");
					C.width = Image_.width;
					C.height = Image_.height;
					const CTX = C.getContext("2d");
					CTX.drawImage(Image_, 0, 0);
					const ImageData = CTX.getImageData(0, 0, Image_.width, Image_.height);
					URL.revokeObjectURL(Image_.src);
					R({ W: Image_.width, H: Image_.height, Content: ImageData.data });
				};
				Image_.onerror = E;
				Image_.src = URL.createObjectURL(Blob_);
			});
			
			File = new Texture(W, H, new Uint8ClampedArray(Content));
		}
	}
	
	__GetFileCache[Path] = File;
	return File;
}
const __GetFileCache = {};

/* Получить текстуру */
async function GetTexture(Path){ return await GetFile(Path, true); }

/* Получить содержимое файла в виде JSON */
async function FileContentJSON(File){
	try{
		var Text = await FileContent(File);
		return JSONParse(Text);
	}catch(e){
		throw new Error("Произошла ошибка при чтении файла [" + File.name + "], в формате JSON!", e);
	}
}

const __FilesContentString = {};
const __FilesContentBytes  = {};

/* Получить строковое содержимое файла */
async function FileContent(File){
	if(__FilesContentString[File.name]){ return __FilesContentString[File.name]; }
	
	try{
		const Text = await File.async("text");
		__FilesContentString[File.name] = Text;
		return Text;
	}catch(e){
		throw new Error("Произошла ошибка при чтении файла [" + File.name + "]!", e);
	}
}

/* Получить байтовое содержимое файла */
async function FileContentByte(File){
	if(File instanceof Texture){ return File.Content; }
	if(__FilesContentBytes[File.name]){ return __FilesContentBytes[File.name]; }
	
	try{
		const Buf = await File.async("uint8array");
		const Bytes = new Uint8Array(Buf);
		__FilesContentBytes[File.name] = Bytes;
		return Bytes;
	}catch(e){
		throw new Error("Произошла ошибка при чтении файла [" + File.name + "], в формате Bytes!", e);
	}
}

/* Уберает спец символы HTML из текста */
function RemoveHTML(HTML){
	return HTML	.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('/', '&#47;');
}

/* ======================================================== */

/* Показывает информацию о генераторе */
function ShowInfo(Button){
	try{
		const ShowVersion = Button ? Button.innerText : SelectedVersion;
		if(!ShowVersion){ return; }
		
		const Version = PackVersions[ShowVersion][2];
		
		var VersionName = ShowVersion.replace(/^a/, "Alpha ").replace(/^b/, "Beta ").replace(/^c/, "Classic ").replace(/^rd/, "RubyDung ").replace(/^inf/, "Infdev ");
		if(Version.Joke){ VersionName = "Joke \"" + VersionName + "\""; }
		document.getElementById("VersionName").innerText = VersionName;
		
		var Add = Version["Add"] || [];
		
		const VersionTypeInfo = {
			"?": ["Неизвестный пак","Если вам попался этот пак, сообщите автору! Потому-что это ошибка!"],
			"i": ["Заменяемый пак", "Нужно заменить файлы внутри .jar версии"],
			"t": ["Текстур пак","Нужно кинуть в папку texturepacks"],
			"r": ["Ресурс пак","Нужно кинуть в папку resourcepacks"],
		}
		
		var VersionType = Add.includes("ReplacePack.json") ? "i" : (Add.includes("TexturePack.json") ? "t" : (Add.includes("ResourcePack.json") ? "r" : "?"));
		document.getElementById("VersionType").innerText = VersionTypeInfo[VersionType][0];
		document.getElementById("VersionType").title     = VersionTypeInfo[VersionType][1];
		
		const VersionImage  = __VersionImages[ShowVersion];
		if(!VersionImage){ return; }
		document.getElementById("VersionImage").src = VersionImage.ToImage();
	}catch(e){
		Logger.Error("Произошла ошибка при показе информации об генераторе!", e);
	}
}

/* Версия выбрана */
function SelectVersion(Version){
	try{
		Logger.Info("Выбрана версия: " + Version);
		
		if(SelectedVersion == Version){ return; }
		SelectedVersion = Version;
		
		if(__OldSelectVersionButton != null){ __OldSelectVersionButton.classList.remove("Selected"); }
		
		const Button = document.getElementById("SV-" + Version);
		Button.classList.add("Selected");
		__OldSelectVersionButton = Button;
		
		ShowInfo(Button);
	}catch(e){
		throw new Error("Произошла ошибка при выборе версии [" + Version + "]!", e);
	}
}
var __OldSelectVersionButton = null;

/* ======================================================== */

/* Файлы пака (Все файлы) {PackFiles["R/T/A/Backface.png"] = File} */
const PackFiles = {};
/* Папки пака (Файлы внутри папок) [Файлы без пути к папке] {PackFilesFolders["R/T/A/"] = File[]} */
const PackFilesFolders = {};
/* Чисто папки пака (Какие папки внутри папки) {PackFolders["R"]["T"]["A"] = Folders[]} */
const PackFolders = {};

/* Информация об паке */
var PackInfo;

/* Название коммита */
var CommitName;

/* Доступные версии пака */
var PackVersions = {}

/* Выбранная версия */
var SelectedVersion = null;

/* Название файла результата */
var OutName;

/* Генераторы */
var Generators = {};

/* Загрузка генератора */
async function LoadGenerator(File, FileName, Loaded = new Set(), GetActions = false){
	try{
		if(Loaded.size === 0 && !GetActions){
			if(__LoadGenerator[FileName]){
				Logger.Console("Генератор уже был сгенерирован!");
				return __LoadGenerator[FileName];
			}
		}
		
		/* Защита от рекурсии */
		if(Loaded.has(FileName)){ return null; } const First = Loaded.size === 0; Loaded.add(FileName);
		
		/* Информация генератора */
		const Info = await FileContentJSON(File);
		
		/* Родительская информация */
		var ParentInfo;
		
		/* Получение родительской информации */
		if(Info.Parent){
			const ParentRaw  = await GetFile("G/" + Info.Parent);
			      ParentInfo = await LoadGenerator(ParentRaw, Info.Parent, Loaded, true);
			
			if(!Info.PackFormat && ParentInfo.PackFormat){ Info.PackFormat = ParentInfo.PackFormat; }
		}
		
		/* Действия */
		var Actions = [];
		
		/* Начальные действия */
		if(Info.Files){
			function Process(Files, Prefix = ""){
				function PostProcess(Path, Value){
					/* Если: "folder/": ... */
					if(Path.endsWith("/")){
						/* Если: "folder/": { ... } */
						if(Value && typeof Value === "object" && !Array.isArray(Value)){
							Process(Value, Path);
						/* Если: "folder/": null (или другое) */
						}else{
							Actions.push([Path, Value]);
						}
					/* Если "file.txt": ["Replace", "file2.txt"] */
					}else if(Value && Array.isArray(Value) && Value[0] === "Replace"){
						const OldFile = Value[1];
						Actions.push([Path, OldFile]);
						Actions.push([OldFile, null]);
					/* Если "file.txt": ["Rename", "file2.txt"] */
					}else if(Value && Array.isArray(Value) && Value[0] === "Rename"){
						const OldFile = Prefix + Value[1];
						Actions.push([Path, OldFile]);
						Actions.push([OldFile, null]);
					/* Если: "file.txt": ... */
					}else{
						Actions.push([Path, Value]);
					}
				}
				
				for(const Key of Object.keys(Files)){
					const Value = Files[Key];
					const Path  = Prefix + Key;
					
					/* Если несколько действий: "file...": ["Actions", "Action1", "Action2"] */
					if(Array.isArray(Value) && Value[0] === "Actions"){
						for(const Action of DeepClone(Value.slice(1))){
							PostProcess(Path, Action);
						}
						continue;
					}
					
					PostProcess(Path, Value);
				}
			}
			Process(Info.Files);
		}
		
		/* Установка родительских действий */
		if(Info.Parent){
			const ParentActions = ParentInfo["Actions"];
			if(ParentActions !== null){
				Actions = [...ParentActions, ...Actions];
				
				Info.__Info = Info.__Info || {};
				Info.__Info.Parent = ParentInfo.Name;
			}
		}
		
		/* Добавление Add */
		if(Info.Add && Array.isArray(Info.Add) && First){
			for(const AddFile of Info.Add){
				const AddRaw     = await GetFile("G/" + AddFile);
				const AddInfo    = await LoadGenerator(AddRaw, AddFile, Loaded, true);
				const AddActions = AddInfo["Actions"];
				if(AddActions === null){ continue; }
				
				Actions = [...Actions, ...AddActions];
				
				Info.__Info = Info.__Info || {};
				Info.__Info.Added = Info.__Info.Added || [];
				Info.__Info.Added.push(AddInfo.Name);
			}
		}
		
		if(GetActions){ Info.Actions = Actions; return Info; }
		
		/* Результат файлов */
		const Files = {};
		
		/* Финальная обработка файлов */
		for(const [Key, Value] of Actions){
			if(typeof Value === "string"){
				const RefKey = Value;
				/* Перенос папки в другую папку: "A/": "B/" */
				if(Key.endsWith("/") && RefKey.endsWith("/")){
					for(const Key_ in Files){
						if(Key_.startsWith(RefKey)){
							const NewKey = Key + Key_.slice(RefKey.length);
							Files[NewKey] = DeepClone(Files[Key_]);
						}
					}
					
				/* Если ссылка на другой файл, типа: "file.txt": "file2.txt" */
				}else{
					if(RefKey in Files){
						const RefValue = DeepClone(Files[RefKey]);
						if(RefValue){
							Files[Key] = RefValue;
						}
					}else{
						Logger.ConsoleError("Файл [" + Key + "] ссылается на несуществующий другой файл [" + RefKey + "]!");
						Files[Key] = null;
					}
				}
			}else if(Value === null){
				/* Удаление папки: "folder/": null */
				if(Key.endsWith("/")){
					for(const Key_ in Files){
						if(Key_.startsWith(Key)){ delete Files[Key_]; }
					}
				/* Если файл удаляется: "file.txt": null */
				}else{
					delete Files[Key];
				}
			/* Если атлас: "file.png": ["Atlas", { ... }] */
			}else if(Value[0] === "Atlas" && (!Files[Key] || Files[Key][0] === "Atlas")){
				function Merge(A, B){
					if(!A){ return B; }
					
					const R = { ...A };
					
					for(const Key in B){
						/* Смешение массивов: "?": { ... } */
						if(Key in R && typeof R[Key] === "object" && typeof B[Key] === "object" && !Array.isArray(R[Key])){
							R[Key] = Merge(R[Key], B[Key]);
						/* Удаление текстуры: "?": null */
						}else if(R[Key] && B[Key] === null){
							delete R[Key];
						/* Простая текстура: "?": ["Texture", ...] */
						}else{
							R[Key] = B[Key];
						}
					}
					
					return R;
				}
				Files[Key] = ["Atlas", Merge(Files[Key] ? Files[Key][1] : null, Value[1])];
			/* Если просто файл: "file.txt": ["Create", "Example"] */
			}else{
				Files[Key] = Value;
			}
		}
		
		Info.Files = Files;
		
		if(First){
			__LoadGenerator[FileName] = Info;
		}
		
		return Info;
	}catch(e){
		throw new Error("Произошла ошибка при загрузке генератора [" + FileName + "]!", e);
	}
}
const __LoadGenerator = {};

/* Получает разную информацию из пака */
async function LoadPackInformation(){
	try{
		for(const Path of Object.keys(PackFiles)){
			const LastSlash = Path.lastIndexOf("/");
			const Folder    = LastSlash === -1 ? "" : Path.substring(0,  LastSlash);
			
			if(!PackFilesFolders[Folder]){ PackFilesFolders[Folder] = []; }
			PackFilesFolders[Folder].push(PackFiles[Path]);
			
			const Parts = Path.split("/"); Parts.pop();
			var Current = PackFolders;
			for(const Part of Parts){
				if(!Current[Part]){ Current[Part] = {}; }
				Current = Current[Part];
			}
		}
		
		PackInfo = await FileContentJSON(await GetFile("Info.json"));
		
		OutName = PackInfo["Out"];
		
		Object.assign(__ReplaceText     , PackInfo["Text"     ]);
		Object.assign(__ReplaceColor    , PackInfo["Color"    ]);
		Object.assign(__ReplaceAnimation, PackInfo["Animation"]);
		
		document.getElementById("PackVersion").innerText = __ReplaceText["Version"];
		
		try{
			const Response = await fetch("https://api.github.com/repos/Woowz11/BloodRaw-Minecraft/commits/main");
			if(!Response.ok){ throw new Error("Ошибка загрузки: " + Response.status); }
			
			const Commit = await Response.json();
			
			CommitName = Commit.commit.message.split("\n")[0];
			document.getElementById("CommitName").innerText = CommitName;
			document.getElementById("CommitName").href      = Commit.html_url;
			document.getElementById("CommitName").title     = "+" + Commit.stats.additions + " | -" + Commit.stats.deletions;
		}catch(e){
			Logger.Error("Произошла ошибка при получении версии репозитория!", e);
			CommitName = "Не получилось узнать...";
		}
		
		var VersionHierarchy;
		
		for(const File of PackFilesFolders["G"]){
			var GeneratorInfo = await FileContentJSON(File);
			
			if(File.name.includes("Hierarchy")){
				if(File.name.includes("Version")){ VersionHierarchy = GeneratorInfo; }
			}else{
				var Type = GeneratorInfo["Type"] || "Unknown"; GeneratorInfo["Type"] = Type  ;
				
				if(Type === "Version"){
					PackVersions[GeneratorInfo["Name"]] = [File, GeneratorInfo["Name"], GeneratorInfo];
				}
			}
		}
		
		var AllVersions = Object.keys(PackVersions);
		AllVersions = AllVersions.sort((A, B) => {
			const iA = VersionHierarchy.indexOf(A);
			const iB = VersionHierarchy.indexOf(B);
			
			if(iA === -1){ throw new Error("Не найдена версия [" + A + "] в иерархии!"); }
			if(iB === -1){ throw new Error("Не найдена версия [" + B + "] в иерархии!"); }

			return iA - iB;
		});
		
		const SortedPackVersions = {};
		for(const Version of AllVersions){
			SortedPackVersions[Version] = PackVersions[Version];
		}
		PackVersions = SortedPackVersions;
		
		var ChangelogTexture_ = await GetTexture(ChangelogTexture);
		document.getElementById("ChangelogImage").src = ChangelogTexture_.ToImage();
	}catch(e){
		throw new Error("Произошла ошибка при загрузке информации об паке!", e);
	}
}

/* Загружает картины */
function LoadPaintings(){
	try{
		AllPaintings = {};
		
		for(var PaintingSize of Object.keys(PackFolders["R"]["T"]["A"])){
			if(PaintingSize === "Frame"){ continue; }
			if(!AllPaintings[PaintingSize]){ AllPaintings[PaintingSize] = []; }
			for(var Painting of PackFilesFolders["R/T/A/" + PaintingSize]){
				AllPaintings[PaintingSize].push(Painting.name);
			}
		}
	}catch(e){
		throw new Error("Произошла ошибка при загрузке картин!", e);
	}
}

/* Загружает цвета */
async function LoadColors(){
	try{
		var GrassColormap  = await GetTexture("R/T/O/Colormap/Grass.png" );
		var LeavesColormap = await GetTexture("R/T/O/Colormap/Leaves.png");
		
		var GrassColor  = GrassColormap .GetColor(127, 127);
		var LeavesColor = LeavesColormap.GetColor(127, 127);
		
		__ReplaceColor["D_Grass" ] = `rgb(${GrassColor[0]},${GrassColor[1]},${GrassColor[2]})`;
		__ReplaceColor["D_Leaves"] = `rgb(${LeavesColor[0]},${LeavesColor[1]},${LeavesColor[2]})`;
	}catch(e){
		throw new Error("Произошла ошибка при загрузке цветов!", e);
	}
}

/* Загрузка картинок версий */
async function LoadVersionImages(){
	try{
		for(const VersionID of Object.keys(PackVersions)){
			const Version = PackVersions[VersionID][2];
			
			const VersionImageInfo = Version.Icon || ["Texture", "R/T/U/Unknown.png"];
			const VersionImageID = JSON.stringify(VersionImageInfo);
			
			__VersionImages[VersionID] = await GenerateFile(VersionImageInfo);
		}
	}catch(e){
		throw new Error("Произошла ошибка при загрузке изображений версий!", e);
	}
}
const __VersionImages = {};

/* Вызывается после пре-загрузки */
async function PreLoadAfter(){
	if(!StartPreLoaded){ return; }
	try{
		await LoadPackInformation();
	
		const SelectVersion_ = $("#SelectVersion");
		
		const Versions = Object.keys(PackVersions);
		
		SelectVersion_.html(
			Versions.map(V => {
				var Version = PackVersions[V][2];
				var Dev = Version.Dev;
				
				const MinL = 6 ; const MaxL = 10;
				const MinS = 24; const MaxS = 14;
				var T = Clamp((V.length - MinL) / (MaxL - MinL), 0, 1);
				return `<button onclick="SelectVersion('${V}');" id="SV-${V}" onmouseenter="ShowInfo(this);" onmouseleave="ShowInfo();" style="font-size: clamp(12px, 2vw, ${Lerp(MinS, MaxS, T)}px); color: ${Dev === false ? "white" : (Dev === "Error" ? "var(--mc-red)" : (Dev === true ? "var(--mc-yellow)" : (Dev ? "black" : "var(--mc-yellow)")))};">${V}</button>`;
			}).join("")
		);
		
		await LoadVersionImages();
		
		SelectVersion(Versions[0]);
		
		await LoadColors();
		
		PreLoaded = true;
		document.documentElement.style.setProperty("--infobox", "0, 255, 0");
	}catch(e){
		throw new Error("Произошла ошибка после пред-загрузки!", e);
	}
}

/* Начата пред-загрузка пака? */
var StartPreLoaded = false;
/* Пак пред-загружен? */
var PreLoaded = false;
/* Пре-загрузка пака (Только один раз!) */
async function PreLoad(Buf){
	if(StartPreLoaded || PreLoaded){ return; } StartPreLoaded = true;
	try{
		const ZIP = await JSZip.loadAsync(Buf);

		for (const Name of Object.keys(ZIP.files)) {
			const File = ZIP.files[Name];

			File.name = File.name.replace(/\\/g, "/").replace(/\/+/g, "/");
			
			if(File.name.split("/").pop() === ""){ continue; }
			PackFiles[Name.replace(/\\/g, "/").replace(/\/+/g, "/")] = File;
		}
		
		await PreLoadAfter();
	} catch(e){
		throw new Error("Произошла ошибка при пред-загрузке пака!", e);
	}
}

/* Показывает или уберает оверлей загрузки */
function LoadingOverlay(Show){
	document.getElementById("Loading").style.opacity       = Show ? 1 : 0;
	document.getElementById("Loading").style.pointerEvents = Show ? "unset" : "none";
}
if(IsLocal){ LoadingOverlay(false); }

/* Вызывается при запуске сайта */
function Awake(){
	const PreLoadPack = document.getElementById("PreLoadPack");
	if (IsLocal){
		PreLoadPack.addEventListener("change", async (EV) => {
			try{
				LoadingOverlay(true);
				
				const File = EV.target.files[0];
				if(!File){ return; }
				const Buf = await File.arrayBuffer();
				await PreLoad(Buf);
				
				LoadingOverlay(false);
			}catch(e){
				document.documentElement.style.setProperty("--infobox", "255, 0, 0");
				Logger.Fatal("Произошла ошибка при получении пака с компьютера!", e);
			}
		});
		
		PreLoadPack.style.display = "unset";
	}else{
		(async () => {
			try{
				const response = await fetch(PackFile);
				if (!response.ok){ throw new __Error("Ошибка загрузки: " + response.status); }
				const Buf = await response.arrayBuffer();
				await PreLoad(Buf);
				LoadingOverlay(false);
			}catch(e){
				document.documentElement.style.setProperty("--infobox", "255, 0, 0");
				Logger.Fatal("Произошла ошибка при получении пака с raw.githubusercontent.com!", e);
			}
		})();
	}
}
Awake();

/* ======================================================== */

/* Информация об паке (ZIP файл результат) */
var Pack;

/* Пак генерируется? */
var InGeneration = false;

/* Время начала генерации */
var GenerationStartTime;

/* Всего файлов */
var TotalFiles;

/* Сколько времени заняла генерация */
var GenerationTime;

/* Текущий файл (Путь) */
var CurrentFile;

/* Произошла ошибка во время генерации? */
var HasError = false;

/* Формат пака */
var PackFormat = -1;

/* Генерация пака */
async function Generate(){
	try{
		if(!PreLoaded  ){ throw new Error("Пак ещё не был пред-загружен!"); }
		if(InGeneration){ throw new Error("Пак уже генерируется!"        ); }
		Console.innerHTML = "";
		
		HasError = false;
		document.documentElement.style.setProperty("--infobox", "255, 255, 0");
		
		InGeneration = true;
		GenerationStartTime = Date.now();
		Logger.Info(":" + "=".repeat(50) + ":");
		Logger.Console("Начало генерации пака!");
		
		Pack = new JSZip();
		
		TotalFiles = 0;
		
		LoadPaintings();
		__AllPaintings = AllPaintings;
		
		const VersionGenerator = PackVersions[SelectedVersion];
		const Generator = await LoadGenerator(VersionGenerator[0], VersionGenerator[1]);
		PackFormat = Generator.PackFormat || -1;
		await ApplyGenerator(Generator);
		
		GenerationTime = Date.now() - GenerationStartTime;
		
		if(BuildFile){
			Logger.Console("Применение BuildFile...");
			var BuildFile_ = await GenerateFile(BuildFile[0], BuildFile[1], true);
			await AddFileToPack(BuildFile[0], BuildFile_);
		}
		
		Logger.Console("Скачивание...");
		
		const Blob = await Pack.generateAsync({ type: "blob" });
		const A = document.createElement("a");
		A.href = URL.createObjectURL(Blob);
		A.download = UpdateText(OutName);
		document.body.appendChild(A);
		A.click();
		document.body.removeChild(A);
		URL.revokeObjectURL(A.href);
		
		document.documentElement.style.setProperty("--infobox", HasError ? "255, 0, 0" : "0, 255, 0");
		
		Logger.Console("Конец генерации пака!");
		InGeneration = false;
		BuildFile = null;
		Pack = null;
		
		Logger.Info(":" + "=".repeat(50) + ":");
	}catch(e){
		if(InGeneration){ 
			Logger.ConsoleError("Произошла ошибка при генерации пака!", e);
		}else{
			Logger.Fatal("Произошла ошибка при генерации пака!", e);
		}
	}
}

/* Добавляет файл паку */
async function AddFileToPack(Path, Content){
	try{
		if(Content === null){ return; }
		
		/* Это текстура? */
		if(Content instanceof Texture){
			Content = await Content.ToBlob();
		}
		
		/* Это JSZipFile? */
		if(Content instanceof Object && Content.name != null && Content.dir != null && Content.date != null){
			Content = await FileContentByte(Content);
		}
		
		Pack.file(Path, Content); TotalFiles++;
	}catch(e){
		throw new Error("Произошла ошибка при добавлении файла [" + Path + "] паку!", e);
	}
}

/* Применить генератор */
async function ApplyGenerator(Generator){
	try{
		Logger.Console("Применение генератора [" + Generator["Name"] + "]");
		
		var Files = Generator["Files"];
		
		var __Info = Generator["__Info"] || {};
		
		var Parent = __Info["Parent"] || null;
		if(Parent){
			Logger.Console("Родитель [" + Parent + "]");
		}
		
		var Added = __Info["Added"] || [];
		for(var Added_ of Added){
			Logger.Console("Добавлено к генератору [" + Added_ + "]");
		}
		
		for(const Path of Object.keys(Files)){
			var Content = await GenerateFile(Path, Files[Path]);
			await AddFileToPack(Path, Content);
		}
	}catch(e){
		throw new Error("Произошла ошибка с генератором!", e);
	}
}

/* Применяет модификатор */
async function ApplyAction(Content, Type, Info){
	try{
		Logger.Console("Применение модификатора [" + Type + "]...");
	
		switch(Type){
			case "Background": {
				Content.Background(Info[0]);
				break;
			}
			
			case "Put": {
				var T     = await GenerateFile(Info[0]);
				var X     = Info[1] || 0;
				var Y     = Info[2] || 0;
				var Blend = Info[3] || "alpha";
				
				Content.Put(T, X, Y, Blend);
				break;
			}
			
			case "Frame": {
				var Index = Info[0] || 0;
				if(Content.W === Content.H){ Logger.ConsoleWarn("Невозможно применение Frame, потому-что размеры текстуры одинаковые!"); }
				Content.Frame(Index);
				break;
			}
			
			case "Resize": {
				var W = Info[0];
				var H = Info[1] || W;
				var Smooth = Info[2] ?? false;
				Content.Resize(W, H, Smooth);
				break;
			}
			
			case "Crop": {
				var X = Info[0];
				var Y = Info[1];
				var W = Info[2] || null;
				var H = Info[3] || null;
				
				if(W == null && H == null){
					W = X; H = Y; X = Y = 0;
				}
				
				Content.Crop(X, Y, W, H);
				break;
			}
			
			case "Gradient": {
				var Gradient = await GenerateFile(Info[0]);
				Content.Gradient(Gradient);
				break;
			}
			
			case "Multiply": {
				var C = Info[0];
				if(Array.isArray(C)){ C = await GenerateFile(C); } 
				Content.Multiply(C);
				break;
			}
			
			case "Fixed": {
				var R = Info[0] || null;
				var G = Info[1] || null;
				var B = Info[2] || null;
				var A = Info[3] || null;
				
				Content.Fixed(R, G, B, A);
				break;
			}
			
			case "NewSize": {
				var W = Info[0];
				var H = Info[1];
				Content.NewSize(W, H);
				break;
			}
			
			case "Flip": {
				var X = Info[0] || false;
				var Y = Info[1] || false;
				Content.Flip(X, Y);
				break;
			}
			
			case "Trim": {
				var R = Info[0] || null;
				var G = Info[1] || null;
				var B = Info[2] || null;
				var A = Info[3] || null;
				
				Content.Trim(R, G, B, A);
				break;
			}
			
			case "Move": {
				var X = Info[0] || 0;
				var Y = Info[1] || 0;
				Content.Move(X, Y);
				break;
			}
			
			case "Invert": {
				var R = Info[0] ?? true;
				var G = Info[1] ?? true;
				var B = Info[2] ?? true;
				var A = Info[3] ?? false;
				
				Content.Invert(R, G, B, A);
				break;
			}
			
			case "Tile": {
				var X = Info[0] || 1;
				var Y = Info[1] || 1;
				Content.Tile(X, Y);
				break;
			}
			
			case "Fill": {
				var X0 = Info[0] || 0;
				var Y0 = Info[1] || 0;
				var X1 = Info[2] || null;
				var X2 = Info[3] || null;
				var Color = Info[4] || "transparent";
				
				Content.Fill(X0, Y0, X1, X2, Color);
				break;
			}
			
			case "Mask": {
				Content.Mask();
				break;
			}
			
			default: {
				Logger.ConsoleWarn("Тип модификатора [" + Type + "], не найден!");
				break;
			}
		}
		
		return Content;
	}catch(e){
		throw new Error("Произошла ошибка при применении модификатора [" + Type + "]!", e);
	}
}

/* Применение модификаторов */
async function ApplyActions(Content, Actions){
	try{
		if(!Actions || !Actions.length){ return Content; }
		
		Content = Content.Clone();
		
		for(var Action of Actions){ Content = await ApplyAction(Content, Action[0], Action.slice(1)); }
		
		return Content;
	}catch(e){
		throw new Error("Произошла ошибка при применении модификаторов!", e);
	}
}

/* Файл с выводом информации */
var BuildFile;

/* Содержимое сгенерированного файла [Если указать только 1 аргумент, будет считаться как в памяти] */
async function GenerateFile(Path, Info = null, IgnoreTags = false){
	var MemoryFile = Path && !Info;
	if(MemoryFile){ Info = Path; Path = null; }

	try{
		/* Что-бы Info.shift(), не редактировал генераторы */
		Info = DeepClone(Info);
		
		/* Как генерировать файл */
		var GenerateType = Info[0];
		
		var ID = JSON.stringify(Info);
		if(__GenerateFile[ID] != null && !IgnoreTags && GenerateType != "Painting" && GenerateType != "Animation"){
			var __Result = __GenerateFile[ID];
			if(__Result instanceof Texture){ __Result = __Result.Clone(); }
			
			Logger.ConsoleWithTitle(MemoryFile ? "Получение файла из памяти..." : "Получение [" + Path + "]...", ID);
			
			return __Result;
		}
		
		Logger.ConsoleWithTitle(MemoryFile ? "Генерация файла в памяти..." : "Генерация [" + Path + "]...", ID);
		
		Info.shift();
		
		/* Дополнительная информация и теги */
		var Tag = null;
		
		if(Array.isArray(GenerateType)){
			Tag = GenerateType[1];
			GenerateType = GenerateType[0];
		}
		
		if(!IgnoreTags && Tag){
			if(Tag[0] === "BuildFile"){
				BuildFile = [Path, [GenerateType, ...Info]];
				return null;
			}
		}
		
		CurrentFile = MemoryFile ? "[CurrentFile : null]" : Path;
		
		var Actions = null;
		
		var Result;
		
		switch(GenerateType){
			case "File": {
				const FilePath = Info[0];
				Actions = Info[1] || null;
				Result = await GetFile(FilePath);
				break;
			}
			
			case "Texture": {
				const FilePath = Info[0];
				Actions = Info[1] || null;
				Result = await GetTexture(FilePath);
				break;
			}
			
			case "Create": {
				if (typeof Info[0] === "number" && typeof Info[1] === "number") {
					const W = Info[0];
					const H = Info[1];
					const Color = Info[2] || "transparent";
					Actions   = Info[3] || null;

					Result = new Texture(W, H, Color);
				} else if (Array.isArray(Info[0])) {
					const File = await GenerateFile(Info[0]);
					const Content = await FileContent(File);

					Result = UpdateText(Content);
				} else {
					const Content = Info[0];
					Actions = Info[1] || null;
					Result = UpdateText(Content);
				}
				break;
			}
			
			case "Atlas": {
				const AtlasInfo = Info[0];
				Actions = Info[1] || null;
				Result = await GenerateAtlas(AtlasInfo);
				break;
			}
			
			case "Painting": {
				const W = Info[0];
				const H = Info[1];
				Actions = Info[2] || null;
				Result = await GeneratePainting(W, H);
				break;
			}
			
			case "Splashes": {
				Actions = Info[1] || null;
				Result = await GenerateSplashes();
				break;
			}
			
			case "Json": {
				const Json = Info[0];
				Actions = Info[1] || null;
				Result = UpdateText(JSON.stringify(Json, null, '\t'));
				break;
			}
			
			case "Animation": {
				const T = Info[0];
				const AnimationInfo = UpdateAnimation(Info[1]);
				Actions = Info[2] || [];
				Result = await GenerateFile(T);
				
				const Frames = Result.H / Result.W;
				if(!Number.isInteger(Frames)){ throw new Error("У анимации неверно задана высота! Число кадров дробное!\nКадров: " + Frames); }
				if(Frames === 1){ throw new Error("Не является анимацией!"); }
				
				if(AnimationInfo === false){
					Actions = [...Actions, ["Frame"]];
				}else{
					const Speed = AnimationInfo["Speed"] || 1;
					if(Speed <= 0){ throw new Error("Скорость анимации не может быть <= 0!"); }
					if(!Number.isInteger(Speed)){ throw new Error("Скорость анимации не может быть дробной!"); }
					
					if(PackFormat > 0){
						const Animation = {};
						
						if(AnimationInfo["Smooth"] === true){
							Animation.interpolate = true;
						}
						
						Animation.frametime = Speed;
						
						if(AnimationInfo["Frames"]){
							Animation.frames = AnimationInfo["Frames"];
						}
						
						await AddFileToPack(Path + ".mcmeta", await GenerateFile(["Json", {"animation":Animation}]));
					}else{
						var Animation = "";
						
						const Frames_ = AnimationInfo["Frames"];
						
						if(Frames_){
							for(const i of Frames_){
								if(Animation.length > 0){ Animation += "\n"; }
								Animation += i + "*" + Speed;
							}
						}else{
							for(var i = 0; i < Frames; i++){
								if(Animation.length > 0){ Animation += "\n"; }
								Animation += i + "*" + Speed;
							}
						}
						
						await AddFileToPack(Path.split(".")[0] + ".txt", await GenerateFile(["Create", Animation]));
					}
				}
				break;
			}
			
			default: {
				Result = "Не найден тип генерации [" + GenerateType + "]!";
				Logger.ConsoleWarn("Тип файла [" + GenerateType + "], не найден!");
				break;
			}
		}
		
		Result = await ApplyActions(Result, Actions);
		__GenerateFile[ID] = Result;
		return Result;
	}catch(e){
		Logger.ConsoleError("Произошла ошибка при генерации файла " + (MemoryFile ? "в памяти" : "[" + Path + "]") + "!", e);
		return PrintMessageText("Произошла ошибка при генерации этого файла...", e);
	}
}
var __GenerateFile = {};

/* ======================================================== */

/* Генерация атласа */
async function GenerateAtlas(Info){
	try{
		Info = DeepClone(Info);
		
		var Empty = Info["Empty"] ? await GenerateFile(Info["Empty"]) : false;
		var Size  = Info["Size" ] || [2, 2];
		var Scale = Info["Scale"] || [1, 1];
		var W     = Size[0];
		var H     = Size[1];
		
		if(Info["Empty"]){ delete Info["Empty"]; }
		if(Info["Size" ]){ delete Info["Size" ]; }
		if(Info["Scale"]){ delete Info["Scale"]; }
		
		if(Size[0] <= 1 || Size[1] <= 1){ throw new Error("Кол-во клеток <= 1!\nSize[0]: " + Size[0] + " | Size[1]: " + Size[1]); }
		if(W <= 0 || H <= 0){ throw new Error("Размер атласа <= 0!\nW: " + W + " | H: " + H); }
		
		var Atlas = new Texture(W * Scale[0], H * Scale[1]);
		
		for(var X = 0; X < W; X++){
			for(var Y = 0; Y < H; Y++){
				try{
					var Tile = null;
					var X_ = Info[X];
					if(X_){
						var Y_ = X_[Y];
						if(Y_ != undefined){
							if(Y_ === false){
								Tile = false;
							}else{
								Tile = await GenerateFile(Y_);
							}
							
							delete Info[X][Y];
							if(Object.keys(Info[X]).length <= 0){ delete Info[X]; }
						}
					}
					
					if(Tile != false){
						Atlas.Set(Tile ? Tile : Empty, X * Scale[0], Y * Scale[1]);
					}
				}catch(e){
					Logger.Error("Произошла ошибка генерации тайтла [" + X + ":" + Y + "] у атласа!");
				}
			}
		}
		
		const LeftOver = Object.keys(Info);
		if(LeftOver.length > 0){
			for(var Key of LeftOver){
				Logger.ConsoleWarn("У атласа найден лишний ключ [" + Key + "]!");
			}
			throw new Error("В атласе найдены лишние ключи!");
		}
		
		return Atlas;
	}catch(e){
		throw new Error("Произошла ошибка при генерации атласа!", e);
	}
}

/* Все картины */
var AllPaintings;

/* Генерация картины */
async function GeneratePainting(W, H){
	try{
		if(W === true && !H){ return await GetTexture(ChangelogTexture); }
	
		var PaintingSize = W + "x" + H;
	
		var FrameTexture = "R/T/A/Frame/" + PaintingSize + ".png";
	
		var PaintingFamily = __AllPaintings[PaintingSize];
		if(!PaintingFamily || PaintingFamily.length === 0){
			Logger.ConsoleWarn("Закончились картины типа [" + PaintingSize + "]!");
			return await GenerateFile(["Texture", "R/T/A/Empty.png", [["Put", ["Texture", FrameTexture]]]]);
		}
	
		var Painting = PaintingFamily.splice(Math.floor(Math.random() * PaintingFamily.length), 1)[0];
		return await GenerateFile(["Texture", Painting, [["Put", ["Texture", FrameTexture]]]]);
	}catch(e){
		throw new Error("Произошла ошибка при генерации картины " + W + "x" + H + "!", e);
	}
}
var __AllPaintings;

/* Генерация сплешей */
async function GenerateSplashes(){
	try{
		var Result = "";
		
		var Splashes = await FileContentJSON(await GetFile("R/O/Splashes.json"));
		for(var SplashInfo of Splashes){
			var Splash = SplashInfo;
			var Tags   = [];
			if(Array.isArray(SplashInfo)){
				Splash = SplashInfo[0];
				Tags   = SplashInfo[1];
			}
			
			if(Result.length > 0){ Result += "\n"; }
			Result += "§f" + UpdateText(Splash);
		}
		
		return Result;
	}catch(e){
		throw new Error("Произошла ошибка при генерации сплешей!", e);
	}
}