/* Генератор для BloodRaw */

/* Запущен сайт локально?  */ const IsLocal	 = window.location.protocol === "file:";
/* Путь до файла с паком   */ const PackFile = "https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/BloodRaw-Pack.zip";
 
/* Дефолтная текстура */ const DefaultTexture   = "R/T/Default.png";
/* Текстура ошибка    */ const ErrorTexture     = "R/T/Error.png";
/* Текстура Changelog */ const ChangelogTexture = "R/O/Changelog.file";

/* ======================================================== */

Prikol = false;

Prikol_Specialforrandomsite = false;

Prikol_MulSize = 1;

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

Logger.ConsoleTitle = function(Message, Title){
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
	const __JSONParse = {};
	if(__JSONParse[Text]) return DeepClone(__JSONParse[Text]);

	let Pos = 0;

	function SkipWhitespace(){
		while(Pos < Text.length){
			const c = Text[Pos];
			const n = Text[Pos+1];
			
			if(/\s/.test(c)){ Pos++; continue; }

			if(c === '/' && n === '/'){
				Pos += 2;
				while(Pos < Text.length && Text[Pos] !== '\n' && Text[Pos] !== '\r') Pos++;
				continue;
			}

			if(c === '/' && n === '*'){
				Pos += 2;
				while(Pos < Text.length && !(Text[Pos] === '*' && Text[Pos+1] === '/')) Pos++;
				Pos += 2;
				continue;
			}

			break;
		}
	}

	function ParseValue(){
		SkipWhitespace();
		const Char = Text[Pos];
		if(Char === '{') return ParseObject();
		if(Char === '[') return ParseArray();
		if(Char === '"') return ParseString();
		if(/[-0-9]/.test(Char)) return ParseNumber();
		if(Text.startsWith('true' , Pos)){ Pos += 4; return true ; }
		if(Text.startsWith('false', Pos)){ Pos += 5; return false; }
		if(Text.startsWith('null' , Pos)){ Pos += 4; return null ; }
		throw new Error("Неожиданный символ в позиции [" + Pos + "]");
	}

	function ParseObject() {
		const Obj = {};
		const Keys = new Set();
		Pos++;
		SkipWhitespace();
		if(Text[Pos] === '}'){ Pos++; return Obj; }

		while(true){
			SkipWhitespace();
			if(Text[Pos] === '}'){ Pos++; break; }

			const Key = ParseString();
			if(Keys.has(Key)) console.warn("Повторяющийся ключ [" + Key + "] в позиции [" + Pos + "]");
			Keys.add(Key);

			SkipWhitespace();
			if(Text[Pos] !== ':') throw new Error("Ожидался ':' после ключа [" + Key + "] в позиции [" + Pos + "]");
			Pos++;

			const Value = ParseValue();
			Obj[Key] = Value;

			SkipWhitespace();
			if(Text[Pos] === '}'){ Pos++; break; }
			if(Text[Pos] === ','){ Pos++; continue; }
			throw new Error("Ожидалась запятая после пары ключ-значение в позиции [" + Pos + "]");
		}
		return Obj;
	}

	function ParseArray() {
		const Arr = [];
		Pos++;
		SkipWhitespace();
		if(Text[Pos] === ']'){ Pos++; return Arr; }

		while(true){
			SkipWhitespace();
			if(Text[Pos] === ']'){ Pos++; break; }

			const Value = ParseValue();
			Arr.push(Value);

			SkipWhitespace();
			if(Text[Pos] === ']'){ Pos++; break; }
			if(Text[Pos] === ','){ Pos++; continue; }
			throw new Error("Ожидалась запятая в массиве в позиции [" + Pos + "]");
		}
		return Arr;
	}

	function ParseString(){
		Pos++;
		let Result = "";
		while(true){
			if(Pos >= Text.length) throw new Error("Не закрыта строка");
			const Char = Text[Pos];
			if(Char === '"'){ Pos++; break; }
			if(Char === '\\'){
				Pos++;
				const Escape = Text[Pos];
				const Map = { '"':'"', '\\':'\\', '/':'/', b:'\b', f:'\f', n:'\n', r:'\r', t:'\t' };
				if(Map[Escape] !== undefined) Result += Map[Escape];
				else if(Escape === 'u'){
					const Hex = Text.substr(Pos+1,4);
					if(!/^[0-9a-fA-F]{4}$/.test(Hex)) throw new Error("Неверная escape-последовательность Unicode");
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
		if(!NumMatch) throw new Error("Неверное число в позиции [" + Pos + "]");
		Pos += NumMatch[0].length;
		return Number(NumMatch[0]);
	}

	const Result = ParseValue();
	SkipWhitespace();
	if(Pos !== Text.length) throw new Error("Неожиданный символ в позиции [" + Pos + "]");

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
		D_RealVersion: 0,
		D_Date       : new Date().toLocaleDateString("ru-RU").replace(/\//g, '.'),
		D_CurrentFile: CurrentFile,
		D_PackFormat : PackFormat,
		D_TotalFiles : (BuildFile ? TotalFiles + 1 : TotalFiles),
		D_Time       : GenerationTime,
		S            : CompareVersion(SelectedVersion, "1.13") > 0 ? "s" : ""
	}};

	return Text.replace(/<\[\s*([\s\S]*?)\s*\]>/g, (M, E) => {
		E = E.trim();
		
		if(/^Var\d*$/.test(E)){ return M; }
		
		try{
			if(E.startsWith("Custom ")){
				const Code = E.slice(7).trim();
				const Func = new Function(...Object.keys(R), `return (${Code});`);
			
				const Result = Func(...Object.values(R));
				
				return Result;
			}
			
			if(E in R){ return R[E]; }
			throw new Error(`Не найден текстовой код <${E}>!\nТекст: ${Text}`);
		}catch(e){
			Logger.ConsoleError("Произошла ошибка в UpdateText!\nТекст: " + Text, e);
			return "undefined";
		}
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

/* Случайный цвет */
function RandomColor(){
	return HSLToRGB(Math.floor(Math.random() * 360), 100, 50);
}

/* Конвертация цвета в байты */
function CalculateColor(Color){
	try{
		if(typeof Color !== "string"){ return Color; }
	
		if(Color === "Random"){ return RandomColor(); }
	
		if(__Colors[Color]){ return __Colors[Color]; }
	
		if(!CalculateColor.CTX){
			const C = document.createElement("canvas");
			C.width = 1; C.height = 1;
			CalculateColor.CTX = C.getContext("2d");
		}
	
		const TrueColor = UpdateColor(Color);
		
		const Old = CalculateColor.CTX.fillStyle;
		CalculateColor.CTX.fillStyle = TrueColor;
		
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

/* HSL -> RGB */
function HSLToRGB(H, S, L){
	S /= 100;
	L /= 100;

	const C = (1 - Math.abs(2 * L - 1)) * S;
	const X = C * (1 - Math.abs((H / 60) % 2 - 1));
	const M = L - C / 2;

	var R1, G1, B1;

	if(H < 60)      { R1 = C; G1 = X; B1 = 0; }
	else if(H < 120){ R1 = X; G1 = C; B1 = 0; }
	else if(H < 180){ R1 = 0; G1 = C; B1 = X; }
	else if(H < 240){ R1 = 0; G1 = X; B1 = C; }
	else if(H < 300){ R1 = X; G1 = 0; B1 = C; }
	else            { R1 = C; G1 = 0; B1 = X; }

	return new Uint8ClampedArray([
		Math.round((R1 + M) * 255),
		Math.round((G1 + M) * 255),
		Math.round((B1 + M) * 255),
		255
	]);
}

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
async function GetFile(Path, TruePath = null, ThatTexture = false){
	Path = Path.replace(/\\/g, "/").replace(/\/+/g, "/");
	
	if(__GetFileCache[Path]){ return __GetFileCache[Path]; }
	
	var File = PackFiles[Path];
	if(!HasFile(Path)){ throw new Error("Файл [" + Path + "] не найден!"); }
	
	const Extension = Path.split(".").pop().toLowerCase();
	
	if(Extension === "file"){
		const FileInfo = await FileContentJSON(File);
		File = await GenerateFile(TruePath ? TruePath : Path, FileInfo);
	}else{
		if(ThatTexture){
			const PNGContent = await FileContentByte(File);
		
			const Blob_  = new Blob([PNGContent], { type: "image/png" });
			
			var { W, H, Content } = await new Promise((R, E) => {
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
			
			var LoadDefault = true;
			
			if(Prikol && Prikol_Specialforrandomsite){
				LoadDefault = false;
				
				if(__AllWoowzsiteImages == null){ __AllWoowzsiteImages = GetAllWoowzsiteImages(); }
				
				const RandomImage = __AllWoowzsiteImages[Math.floor(Math.random() * __AllWoowzsiteImages.length)];
				
				var TextureRI = null;
				if(__AllWoowzsiteImagesCache[RandomImage]){
					TextureRI = __AllWoowzsiteImagesCache[RandomImage];
				}else{
					const FullPath = "https://woowz11.github.io/woowzsite/" + RandomImage;
					
					const Mime = (() => {
						const L = RandomImage.toLowerCase();
						if(L.endsWith(".png")) return "image/png";
						if(L.endsWith(".jpg") || L.endsWith(".jpeg")) return "image/jpeg";
						if(L.endsWith(".gif")) return "image/gif";
						if(L.endsWith(".webp")) return "image/webp";
						return false
					})();
					
					async function Load(){
						if(Mime === false){ return true; }
						
						const Response = await fetch(FullPath);
						if(!Response.ok){ Logger.Error("PRIKOL: Не получилось загрузить картинку с рандом сайта [" + FullPath + "]!"); return true; }
						
						const ArrayBuf = await Response.arrayBuffer();
						const Blob_ = new Blob([ArrayBuf], { type: Mime });
						
						const TextureLoaded = await new Promise((Resolve, Reject) => {
							const Img = new Image();
							Img.crossOrigin = "anonymous";
							Img.onload = () => {
								const C = document.createElement("canvas");
								C.width = Img.width;
								C.height = Img.height;

								const CTX = C.getContext("2d");
								CTX.drawImage(Img, 0, 0);

								const ImageData = CTX.getImageData(0, 0, Img.width, Img.height);

								URL.revokeObjectURL(Img.src);

								Resolve({
									W: Img.width,
									H: Img.height,
									Data: new Uint8ClampedArray(ImageData.data)
								});
							};
							Img.onerror = Reject;

							Img.src = URL.createObjectURL(Blob_);
						});
						
						TextureRI = new Texture(TextureLoaded.W, TextureLoaded.H, TextureLoaded.Data);
						__AllWoowzsiteImagesCache[RandomImage] = TextureRI;
						
						return false;
					}
					LoadDefault = await Load();
				}
				
				if(!LoadDefault){
					Logger.Console("Загрузка рандомной картинки [" + RandomImage + "]");
					
					if(Prikol){
						W *= Prikol_MulSize; H *= Prikol_MulSize;
					}
					
					File = TextureRI.Clone().Resize(W, H);
				}
			}
			
			if(LoadDefault){
				File = new Texture(W, H, new Uint8ClampedArray(Content));
				
				if(Prikol){
					W *= Prikol_MulSize; H *= Prikol_MulSize;
					File.Resize(W, H);
				}
			}
		}
	}
	
	__GetFileCache[Path] = File;
	return File;
}
const __GetFileCache = {};

var __AllWoowzsiteImages = null;
const __AllWoowzsiteImagesCache = {};

/* Получить текстуру */
async function GetTexture(Path, TruePath){ return await GetFile(Path, TruePath, true); }

/* Получить содержимое файла в виде JSON */
async function FileContentJSON(File){
	try{
		if(!ThatJSZipFile(File)){ return File; }
		
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
	if(!ThatJSZipFile(File)){ return File; }
	
	if(__FilesContentString[File.name]){ return __FilesContentString[File.name]; }
	
	try{
		const Text = await File.async("text");
		__FilesContentString[File.name] = Text;
		return Text;
	}catch(e){
		throw new Error("Произошла ошибка при чтении файла [" + File.name + "]!\nФайл: " + File, e);
	}
}

/* Получить байтовое содержимое файла */
async function FileContentByte(File){
	if(!ThatJSZipFile(File)){ return File; }
	
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
	return HTML.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll("'", '&#39;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('/', '&#47;');
}

/* Это JSZipFile? */
function ThatJSZipFile(Obj){
	return Obj instanceof Object && Obj.name != null && Obj.dir != null && Obj.date != null;
}

/* Это текстура? */
function ThatTexture(Obj){
	return Obj instanceof Texture && Obj.W != null && Obj.H != null;
}

/* Отлючить работу мыши? */
function DisableMouse(Disable){
	if(__DisableMouse === Disable){ return; } __DisableMouse = Disable;
	if(Disable){
		document.addEventListener("click", __DisableMouseH, true);
	}else{
		document.removeEventListener("click", __DisableMouseH, true);
	}
}
var __DisableMouse = false;
__DisableMouseH = function(e){ e.stopImmediatePropagation(); e.preventDefault(); }

/* Парсит версию на массив */
function ParseVersion(Version){
	Version = Version.replace(/^[^\d]*/, '');
	
	if(Version.includes('.')){ return Version.split('.').map(n => parseInt(n, 10)); }
	
	var n = parseInt(Version, 10);
	return isNan(n) ? [-1] : [n];
}

/* Сравнивает версии, и скидывает число разницу, т.е если '1.8' & '1.8' = 0, '1.5' & '1.8' = -3, '1.10' & '1.8' = 2 */
function CompareVersion(VersionA, VersionB){
	const A = ParseVersion(VersionA);
	const B = ParseVersion(VersionB);
	const L = Math.max(A.length, B.length);
	
	var Diff = 0;
	for(var i = 0; i < L; i++){
		const NA = A[i] || 0;
		const NB = B[i] || 0;
		Diff += (NA - NB) * Math.pow(100, L - i - 1);
	}
	
	return Diff;
}

/* Этот файл бинарный? */
function ThatBinaryFile(File){
	if(ThatJSZipFile(File)){
		return __BinaryExtensions.some(e => File.name.toLowerCase().endsWith(e));
	}
	
	return false;
}
const __BinaryExtensions = [".png", ".bin"];

/* Получает родительскую папку */
function ParentFolder(Path){
	if(!Path){ return ""; }
	Path = Path.replace(/\\/g, "/");
	if(Path.endsWith("/")){ Path = Path.slice(0, -1); }
	const  i = Path.lastIndexOf("/");
	return i === -1 ? "" : Path.slice(0, i + 1);
}

/* ======================================================== */

/* Показывает информацию о генераторе */
function ShowInfo(Button){
	try{
		const ShowVersion = Button ? Button.innerText : SelectedVersion;
		if(!ShowVersion){ return; }
		
		const Version = PackVersions[ShowVersion][2];
		
		document.getElementById("VersionName").innerText = Version["Name"];
		document.getElementById("VersionDesc").innerText = UpdateText(Version["Desc"]);
		
		const Addon = Version["Addon"] || [];
		
		const Mods  = Addon["Mods"];
		const Mods_ = document.getElementById("VersionMods");
		if(Mods){
			var ModsTitle = "";
			for(const ModID of Mods){
				if(ModsTitle.length !== 0){ ModsTitle += ", "; }
				const Mod = Generators[ModID]["Name"];
				ModsTitle += Mod;
			}
			Mods_.title = ModsTitle; Mods_.style.color = "white";
		}else{
			Mods_.title = "Эта версия не содержит каких либо модификаций!"; Mods_.style.color = "gray";
		}
		
		const Optifine  = Addon["Optifine"];
		const Optifine_ = document.getElementById("VersionOptifine");
		if(Optifine){
			Optifine_.title = "Поддерживает Optifine!"; Optifine_.style.color = "white";
		}else{
			Optifine_.title = "Эта версия не содержит Optifine!"; Optifine_.style.color = "gray";
		}
		
		const Extension  = Addon["Extension"];
		const Extension_ = document.getElementById("VersionExtension");
		if(Extension){
			Extension_.title = "sex"; Extension_.style.color = "white";
		}else{
			Extension_.title = "что-то там оптифайн, доделай"; Extension_.style.color = "gray";
		}
		
		var Add = Version["Add"] || [];
		
		const VersionTypeInfo = {
			"?": ["Неизвестный пак","Если вам попался этот пак, сообщите автору! Потому-что это ошибка!"],
			"i": ["Заменяемый пак", "Нужно заменить файлы внутри .jar версии"],
			"t": ["Текстур пак","Нужно кинуть в папку texturepacks"],
			"r": ["Ресурс пак","Нужно кинуть в папку resourcepacks"],
		}
		
		var VersionType = Add.includes("ReplacePack") ? "i" : (Add.includes("TexturePack") ? "t" : (Add.includes("ResourcePack") ? "r" : "?"));
		document.getElementById("VersionType").innerText = VersionTypeInfo[VersionType][0];
		document.getElementById("VersionType").title     = VersionTypeInfo[VersionType][1];
		
		const VersionImage  = __VersionImages[ShowVersion];
		if(!VersionImage){ return; }
		document.getElementById("VersionImage").src = VersionImage.ToImage();
	}catch(e){
		Logger.Error("Произошла ошибка при показе информации об генераторе!", e);
	}
}

/* Показывает информацию об адоне */
function ShowInfoAddon(AddonPanel){
	try{
		const ShowAddon = AddonPanel ? AddonPanel.AddonID : SelectedAddon;
		
		const Addon = Generators[ShowAddon];
		
		document.getElementById("AddonName").innerText = Addon["Name"];
		document.getElementById("AddonDesc").innerText = UpdateText(Addon["Desc"]);
		
		const AddonImage = __AddonImages[ShowAddon];
		if(!AddonImage){ return; }
		document.getElementById("AddonImage").src = AddonImage.ToImage();
	}catch(e){
		Logger.Error("Произошла ошибка при показе информации об дополнении!", e);
	}
}

/* ======================================================== */

/* Выбор версии */
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
		
		const VersionInfo = PackVersions[SelectedVersion][2];
		
		const Addon = VersionInfo["Addon"] || []; 
		
		const Mods      = Addon["Mods"     ] || [];
		const Optifine  = Addon["Optifine" ] || [];
		const Extension = Addon["Extension"] || [];
		
		var HasForge = false; var HasFabric = false;
		for(const Mod of Mods){
			const ModInfo = Generators[Mod];
			if(!ModInfo["Core"]){ Logger.ConsoleError("Мод [" + Mod + "] не имеет ядра!"); continue; }
			HasForge  = HasForge  || ModInfo["Core"].includes("Forge" );
			HasFabric = HasFabric || ModInfo["Core"].includes("Fabric");
		}
		
		var HasOptifine = Optifine.length > 0;
		
		var HasExtension = Extension.length > 0;
		
		document.getElementById("AddonPanel_Has").style.display = (HasForge || HasFabric || HasOptifine || HasExtension) ? "unset" : "none";
		
		document.getElementById("CategoryForge"    ).disabled = !HasForge ;
		document.getElementById("CategoryFabric"   ).disabled = !HasFabric;
		document.getElementById("CategoryOptifine" ).disabled = !HasOptifine;
		document.getElementById("CategoryExtension").disabled = !HasExtension;
		
		if(HasExtension){
			SelectAddons("Extension", true);
		}else if(HasOptifine){
			SelectAddons("Optifine" , true);
		}else if(HasForge){
			SelectAddons("Forge"    , true);
		}else if(HasFabric){
			SelectAddons("Fabric"   , true);
		}
	}catch(e){
		Logger.Fatal("Произошла ошибка при выборе версии [" + Version + "]!", e);
	}
}
var __OldSelectVersionButton = null;

/* Выбор дополнения */
function SelectAddon(Addon){
	try{
		SelectedAddon = Addon;
		
		ShowInfoAddon(document.getElementById("Addon_" + Addon));
		
		const Button = document.getElementById("Addon_" + Addon + "_Button");
		
		if(__OldSelectAddonButton){ __OldSelectAddonButton.classList.remove("Selected"); }
		Button.classList.add("Selected");
		__OldSelectAddonButton = Button;
	}catch(e){
		throw new Error("Произошла ошибка при выборе дополнения!", e);
	}
}
var __OldSelectAddonButton = null;

function SA_CreateButton(Addon, Table, Selected){
	try{
		const Panel = Selected ? SA_Selected : SA_Unselected;
		
		const AddonInfo = Generators[Addon];
		const Dev = AddonInfo["Dev"];
		
		const R = document.createElement("div");
		R.AddonID  = Addon;
		R.Selected = Selected;
		R.id = "Addon_" + Addon;
		R.style.display = "flex";
		
		const Up = document.createElement("button");
		Up.textContent = "↑";
		Up.style.flex = 1;
		
		const Down = document.createElement("button");
		Down.textContent = "↓";
		Down.style.flex = 1;
		
		R.appendChild(Up); R.appendChild(Down);
		
		const B = document.createElement("button");
		B.textContent = AddonInfo["Name"];
		B.style.flex = 10;
		B.id = "Addon_" + Addon + "_Button";
		B.style.color = Dev === false ? "white" : (Dev === "Error" ? "var(--mc-red)" : (Dev === true ? "var(--mc-yellow)" : (Dev ? "black" : "var(--mc-yellow)")));
		
		B.onclick = () => SelectAddon(Addon);
		
		R.onmouseenter = () => ShowInfoAddon(R);
		R.onmouseleave = () => ShowInfoAddon( );
		
		R.appendChild(B);
		
		const B2 = document.createElement("button");
		
		if(Selected){
			B2.textContent = "-";
			B2.onclick   = () => SA_Action(Addon, "remove", Table);
			
			Up  .onclick = () => SA_Action(Addon, "up"    , Table);
			Down.onclick = () => SA_Action(Addon, "down"  , Table);
		}else{
			Up.disabled   = true;
			Down.disabled = true;
			
			B2.textContent = "+";
			B2.onclick   = () => SA_Action(Addon, "add"   , Table);
		}
		
		B2.style.flex = 1;
		R.appendChild(B2);
		
		Panel.appendChild(R);
		
		if(SelectedAddon === null){ SelectAddon(Addon); }
	}catch(e){
		throw new Error("Произошла ошибка при добавлении кнопки об дополнении [" + Addon + "]!", e);
	}
}

/* Пересоздание кнопок дополнений */
function __SA_RebuildAddons(Table){
	try{
		const Addons = Table[SelectedVersion];
		
		SA_Selected.replaceChildren(); SA_Unselected.replaceChildren();
		
		const  SA = Object.entries(Addons).filter(([_, v]) => v !== false).sort((a, b) => a[1] - b[1]);
		const USA = Object.entries(Addons).filter(([_, v]) => v  == false).sort((a, b) => a[0].localeCompare(b[0]));
		
		for(const [A, I] of  SA){ SA_CreateButton(A, Table, true ); }
		for(const [A, I] of USA){ SA_CreateButton(A, Table, false); }
	}catch(e){
		throw new Error("Произошла ошибка при пересоздании дополнений!", e);
	}
}

function __SA_ReindexAddons(Addons){
	var i = 1;
	for(const addon of Object.keys(Addons).sort()){
		if(Addons[addon] !== false){
			Addons[addon] = i++;
		}
	}
}

function __SA_SwapPosition(Addons, Addon, dir){
	if(Addons[Addon] === false) return;
	const current = Addons[Addon];
	const target = current + dir;
	if(target < 1) return;

	const other = Object.entries(Addons)
		.find(([_, v]) => v === target);

	if(!other) return;

	const otherAddon = other[0];
	Addons[Addon] = target;
	Addons[otherAddon] = current;
}

/* Действие аддоновой кнопки */
function SA_Action(Addon, Action, Table){
	try{
		const Addons = Table[SelectedVersion];
		
		switch(Action){
			case "add": {
				const SC = Object.values(Addons).filter(v => v !== false).length;
				Addons[Addon] = SC + 1;
				break;
			}
			case "remove": {
				Addons[Addon] = false;
				__SA_ReindexAddons(Addons);
				break;
			}
			case "up": {
				__SA_SwapPosition(Addons, Addon, -1);
				break;
			}
			case "down": {
				__SA_SwapPosition(Addons, Addon, 1);
				break;
			}
		}
		
		__SA_RebuildAddons(Table);
		SelectAddon(Addon);
	}catch(e){
		Logger.Fatal("Произошла ошибка при действии [" + Action + "] кнопки [" + Addon + "]!", e);
	}
}

/* Выбор дополнений */
function SelectAddons(Type, UpdateAnyway = false){
	try{
		if(__OldSelectAddons === Type && !UpdateAnyway){ return; } __OldSelectAddons = Type;
		
		const Version = PackVersions[SelectedVersion][2];
		
		if(__OldSelectAddonsButton != null){ __OldSelectAddonsButton.classList.remove("Selected"); }
		
		const Button = document.getElementById("Category" + Type);
		Button.classList.add("Selected");
		__OldSelectAddonsButton = Button;
		
		SelectedAddon = null;
		
		SA_Selected.replaceChildren(); SA_Unselected.replaceChildren();
		
		switch(Type){
			case "Forge": {
				if(!__SA_Forge[SelectedVersion]){
					__SA_Forge[SelectedVersion] = {};
					
					for(const Mod of Version["Addon"]["Mods"]){
						const ModInfo = Generators[Mod];
						if(ModInfo["Core"].includes("Forge")){ __SA_Forge[SelectedVersion][Mod] = false; }
					}
				}
				
				__SA_RebuildAddons(__SA_Forge);
				
				break;
			}
			case "Fabric": {
				break;
			}
			case "Optifine": {
				if(!__SA_Optifine[SelectedVersion]){
					__SA_Optifine[SelectedVersion] = {};
					
					for(const Optifine of Version["Addon"]["Optifine"]){
						const OptifineInfo = Generators[Optifine];
						__SA_Optifine[SelectedVersion][Optifine] = false;
					}
				}
				
				__SA_RebuildAddons(__SA_Optifine);
				
				break;
			}
			case "Extension": {
				break;
			}
			default: { throw new Error("Не найден тип [" + Type + "]!"); }
		}
	}catch(e){
		Logger.Fatal("Произошла ошибка при выборе дополнений!\nТип: " + Type, e);
	}
}
var __OldSelectAddons       = null;
var __OldSelectAddonsButton = null;

var SelectedAddon = null;

const SA_Selected   = document.getElementById("AddonSelected"  );
const SA_Unselected = document.getElementById("AddonUnselected");

var __SA_Forge     = {}
var __SA_Fabric    = {}
var __SA_Optifine  = {}
var __SA_Extension = {}

/* Выбор типа генерации */
/*
	0 - Полный
	1 - Часть
	2 - Файл
*/
function SelectGenerateType(Type){
	try{
		if(SelectedGenerateType === Type || !PreLoaded){ return; } SelectedGenerateType = Type;
		Logger.Info("Выбран тип генерации [" + Type + "]!");
		
		if(__OldSelectGenerationTypeButton != null){ __OldSelectGenerationTypeButton.classList.remove("Selected"); }
		
		const Button = document.getElementById("GenerateType" + Type);
		Button.classList.add("Selected");
		__OldSelectGenerationTypeButton = Button;
		
		document.getElementById("VersionPanel"  ).style.display = Type  <  2 ? "unset" : "none";
		document.getElementById("AddonPanel"    ).style.display = Type  <  2 ? "unset" : "none";
		document.getElementById("FilePanel"     ).style.display = Type === 2 ? "unset" : "none";
		
		document.getElementById("B_Generate").innerText = Type === 0 ? "Сгенерировать пак" : (Type === 1 ? "Сгенерировать часть" : "Сгенерировать файл/файлы");
		
		document.getElementById("GenerateDesc").innerText = [
			"Обычная генерация пака, с версией, и по желанию с дополнениями",
			"Генерация пака только с дополнениями, без версии",
			"Генерация определённых файлов из выбранных генераторов"
		][Type];
	}catch(e){
		Logger.Fatal("Произошла ошибка при выборе типа генерации!\nТип: " + Type, e);
	}
}
var __OldSelectGenerationTypeButton = null;

/* Включены приколы? */
function EnablePrikols(Enabled){
	try{
		Prikol = Enabled;
		document.getElementById("PrikolPanel").style.display = Enabled ? "unset" : "none";
	}catch(e){
		Logger.Fatal("Произошла ошибка при в" + (Enabled === false ? "ы" : "") + "ключении приколов!", e);
	}
}

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

/* Доступные дополнения пака */
var PackAddons = {};

/* Выбранная версия */
var SelectedVersion = null;

/* Выбранный тип генерации */
var SelectedGenerateType = null;

/* Название файла результата */
var OutName;

/* Название файла результата (Дополнения) */
var OutAddonName;

/* Генераторы */
var Generators = {};

/* Загрузка генератора */
async function LoadGenerator(Name, Loaded = new Set(), GetActions = false){
	try{
		Logger.Console("Начало загрузки генератора [" + Name + "]...");
		if(Loaded.size === 0 && !GetActions){
			if(__LoadGenerator[Name]){
				Logger.Console("Генератор уже был сгенерирован!");
				return __LoadGenerator[Name];
			}
		}
		
		/* Защита от рекурсии */
		if(Loaded.has(Name)){ return null; } const First = Loaded.size === 0; Loaded.add(Name);
		
		/* Информация генератора */
		const Info = Generators[Name];
		
		if(!Info){ throw new Error("Генератор не был найден!"); }
		
		/* Родительская информация */
		var ParentInfo;
		
		/* Получение родительской информации */
		if(Info.Parent){
			ParentInfo = await LoadGenerator(Info.Parent, Loaded, true);
			
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
				const AddInfo    = await LoadGenerator(AddFile, Loaded, true);
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
		
		if(First){ __LoadGenerator[Name] = Info; }
		
		return Info;
	}catch(e){
		throw new Error("Произошла ошибка при загрузке генератора [" + Name + "]!", e);
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
		
		OutName      = PackInfo["Out"]["Default"];
		OutAddonName = PackInfo["Out"]["Addon"  ];
		
		Object.assign(__ReplaceText     , PackInfo["Text"     ]);
		Object.assign(__ReplaceColor    , PackInfo["Color"    ]);
		Object.assign(__ReplaceAnimation, PackInfo["Animation"]);
		Object.assign(__SavedAction     , PackInfo["Action"   ]);
		
		document.getElementById("PackVersion").innerText = __ReplaceText["Version"];
		
		fetch("https://api.github.com/repos/Woowz11/BloodRaw-Minecraft/commits/main").then(Response => {
			if(!Response.ok){ throw new Error("Ошибка загрузки: " + Response.status); }
			return Response.json();
		}).then(Commit => {
			CommitName = Commit.commit.message.split("\n")[0];
			document.getElementById("CommitName").innerText = CommitName;
			document.getElementById("CommitName").href      = Commit.html_url;
			document.getElementById("CommitName").title     = "+" + Commit.stats.additions + " | -" + Commit.stats.deletions;
		}).catch(e => {
			Logger.Error("Произошла ошибка при получении версии репозитория!", e);
			CommitName = "Не получилось загрузить...";
		});
		
		var VersionHierarchy;
		
		const Generators_ = [];
		
		for(const Generator of PackFilesFolders["G"]){
			Generators_.push(Generator);
		}
		for(const Folder of Object.keys(PackFolders["G"])){
			for(const Generator of PackFilesFolders["G/" + Folder]){
				Generators_.push(Generator);
			}
		}
		
		for(const File of Generators_){
			var GeneratorInfo = await FileContentJSON(File);
			
			Generators[GeneratorInfo["ID"]] = GeneratorInfo;
			
			if(File.name.includes("Hierarchy")){
				if(File.name.includes("Version")){ VersionHierarchy = GeneratorInfo; }
			}else{
				const Type = GeneratorInfo["Type"] || "Unknown"; GeneratorInfo["Type"] = Type;
				const Name = GeneratorInfo["Name"] || GeneratorInfo["ID"]; GeneratorInfo["Name"] = Name; 
				const Desc = GeneratorInfo["Desc"] || ""; GeneratorInfo["Desc"] = Desc; 
				
				if(Type === "Version"){
					PackVersions[GeneratorInfo["ID"]] = [File, GeneratorInfo["ID"], GeneratorInfo];
				}
				
				switch(Type){
					case "Version": PackVersions[GeneratorInfo["ID"]] = [File, GeneratorInfo["ID"], GeneratorInfo];
					case "Addon"  : PackAddons  [GeneratorInfo["ID"]] = [File, GeneratorInfo["ID"], GeneratorInfo];
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
		var GrassColormap  = await GetTexture("R/T/G/Colormap/Grass.png" );
		var LeavesColormap = await GetTexture("R/T/G/Colormap/Leaves.png");
		
		var GrassColor  = GrassColormap .GetColor(127, 127);
		var LeavesColor = LeavesColormap.GetColor(127, 127);
		
		__ReplaceColor["D_Grass" ] = `rgb(${GrassColor[0]},${GrassColor[1]},${GrassColor[2]})`;
		__ReplaceColor["D_Leaves"] = `rgb(${LeavesColor[0]},${LeavesColor[1]},${LeavesColor[2]})`;
	}catch(e){
		throw new Error("Произошла ошибка при загрузке цветов!", e);
	}
}

/* Загрузка иконок */
async function LoadIcons(){
	try{
		for(const VersionID of Object.keys(PackVersions)){
			const Version = PackVersions[VersionID][2];
			
			const VersionImageInfo = Version.Icon || ["Texture", "R/T/U/Unknown.png"];
			
			__VersionImages[VersionID] = await GenerateFile(VersionImageInfo);
		}
		
		for(const AddonID of Object.keys(PackAddons)){
			const Addon = PackAddons[AddonID][2];
			
			const AddonImageInfo = Addon.Icon || ["Texture", "R/T/U/Unknown.png"];
			
			__AddonImages[AddonID] = await GenerateFile(AddonImageInfo);
		}
	}catch(e){
		throw new Error("Произошла ошибка при загрузке иконок!", e);
	}
}
const __VersionImages = {};
const __AddonImages   = {};

/* Вызывается после пре-загрузки */
async function PreLoadAfter(){
	if(!StartPreLoaded){ return; }
	try{
		await LoadPackInformation();
	
		const SelectVersion_ = document.getElementById("SelectVersion");
		
		const Versions = Object.keys(PackVersions);
		
		SelectVersion_.innerHTML = Versions.map(V => {
			var Version = PackVersions[V][2];
			var Dev = Version.Dev;
			
			const MinL = 6 ; const MaxL = 10;
			const MinS = 24; const MaxS = 14;
			var T = Clamp((V.length - MinL) / (MaxL - MinL), 0, 1);
			return `<button onclick="SelectVersion('${V}');" id="SV-${V}" onmouseenter="ShowInfo(this);" onmouseleave="ShowInfo();" style="white-space: nowrap; font-size: clamp(12px, 2vw, ${Lerp(MinS, MaxS, T)}px); color: ${Dev === false ? "white" : (Dev === "Error" ? "var(--mc-red)" : (Dev === true ? "var(--mc-yellow)" : (Dev ? "black" : "var(--mc-yellow)")))};">${V}</button>`;
		}).join("");
		
		await LoadIcons();
		
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
		
		SelectGenerateType(0);
		SelectVersion(Object.keys(PackVersions)[0]);
		
		Logger.Info("Zip-файл пака был загружен!");
		Logger.Info(":" + "=".repeat(50) + ":");
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
	const PreLoadPackButton = document.getElementById("PreLoadPackButton");
	const PreLoadPackDiv    = document.getElementById("PreLoadPackDiv");
	const PreLoadPack       = document.getElementById("PreLoadPack");
	if (IsLocal){
		PreLoadPackButton.addEventListener("click", () => PreLoadPack.click());
		
		PreLoadPack.value = "";
		PreLoadPack.addEventListener("change", async (EV) => {
			try{
				LoadingOverlay(true);
				
				const File = EV.target.files[0];
				if(!File){ return; }
				const Buf = await File.arrayBuffer();
				await PreLoad(Buf);
				
				PreLoadPackDiv.style.display = "none";
				LoadingOverlay(false);
			}catch(e){
				document.documentElement.style.setProperty("--infobox", "255, 0, 0");
				Logger.Fatal("Произошла ошибка при получении пака с компьютера!", e);
			}
		});
		
		PreLoadPackDiv.style.display = "unset";
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
		
		DisableMouse(true);
		
		GenerationStartTime = Date.now();
		Logger.Info(":" + "=".repeat(50) + ":");
		Logger.Console("Начало генерации пака!");
		
		if(SelectedGenerateType > 1){ throw new Error("Ещё не создана генерация для типа [" + SelectedGenerateType + "]!"); }
		
		var OnlyAddon = SelectedGenerateType === 1;
		
		Pack = new JSZip();
		
		TotalFiles = 0;
		
		LoadPaintings();
		__AllPaintings = AllPaintings;
		
		const VersionGenerator = await LoadGenerator(SelectedVersion);
		PackFormat = VersionGenerator.PackFormat || -1;
		await ApplyGenerator(OnlyAddon ? await LoadGenerator("AddonPack") : VersionGenerator);
		
		const Addons_Forge = __SA_Forge[SelectedVersion] || {};
		const Addons_Forge_Result = [];
		for(const [A, I] of Object.entries(Addons_Forge)){
			if(I !== false){ Addons_Forge_Result.push([A, I]); }
		}
		
		if(Addons_Forge_Result.length > 0){
			Addons_Forge_Result.sort((a, b) => a[1] - b[1]);
			Logger.Console("Применение дополнений [Forge]...");
			for(const A_ of Addons_Forge_Result){
				const A = A_[0];
				
				await ApplyGenerator(await LoadGenerator(A));
			}
		}
		
		const Addons_Optifine = __SA_Optifine[SelectedVersion] || {};
		const Addons_Optifine_Result = [];
		for(const [A, I] of Object.entries(Addons_Optifine)){
			if(I !== false){ Addons_Optifine_Result.push([A, I]); }
		}
		
		if(Addons_Optifine_Result.length > 0){
			Addons_Optifine_Result.sort((a, b) => a[1] - b[1]);
			Logger.Console("Применение дополнений [Optifine]...");
			for(const A_ of Addons_Optifine_Result){
				const A = A_[0];
				
				await ApplyGenerator(await LoadGenerator(A));
			}
		}
		
		GenerationTime = Date.now() - GenerationStartTime;
		
		if(BuildFile){
			Logger.Console("Применение BuildFile...");
			var BuildFile_ = await GenerateFile(BuildFile[0], BuildFile[1], true);
			await AddFileToPack(BuildFile[0], BuildFile_);
		}
		
		Logger.Console("Скачивание...");
		
		DisableMouse(false);
		
		const Blob = await Pack.generateAsync({ type: "blob" });
		const A = document.createElement("a");
		A.href = URL.createObjectURL(Blob);
		A.download = UpdateText(OnlyAddon ? OutAddonName : OutName);
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
		
		document.documentElement.style.setProperty("--infobox", "255, 0, 0");
		DisableMouse(false);
		InGeneration = false;
		BuildFile = null;
		Pack = null;
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
		if(ThatJSZipFile(Content)){
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
		Logger.Console("Применение генератора [" + Generator["ID"] + "]");
		
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
		Logger.ConsoleTitle("Применение модификатора [" + Type + "]...", JSON.stringify(Info));
	
		switch(Type){
			case "Background": {
				if(Array.isArray(Info[0])){
					var T = await GenerateFile(Info[0]);
					var X = Info[1] || 0;
					var Y = Info[2] || 0;
					
					Content.Background(T, X, Y);
				}else{
					Content.Background(Info[0]);
				}
				break;
			}
			
			case "Put": {
				var T     = await GenerateFile(Info[0]);
				var X     = Info[1] || 0;
				var Y     = Info[2] || 0;
				var Blend = Info[3] || "alpha";
				
				if(Prikol){
					X *= Prikol_MulSize;
					Y *= Prikol_MulSize;
				}
				
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
				
				if(Prikol){
					W *= Prikol_MulSize;
					H *= Prikol_MulSize;
				}
				
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
				
				if(Prikol){
					X *= Prikol_MulSize;
					Y *= Prikol_MulSize;
					W *= Prikol_MulSize;
					H *= Prikol_MulSize;
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
				
				if(Prikol){
					W *= Prikol_MulSize;
					H *= Prikol_MulSize;
				}
				
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
				
				if(Prikol){
					X *= Prikol_MulSize;
					Y *= Prikol_MulSize;
				}
				
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
			
			case "Rotate": {
				var Deg = Info[0] || 0;
				
				Content.Rotate(Deg);
				break;
			}
			
			case "Action": {
				var Action = __SavedAction[Info[0]];
				
				if(Action === undefined){ throw new Error("Модификатор [" + Info[0] + "] в пресетах не найден!"); }
				
				return await ApplyActions(Content, Action);
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
const __SavedAction = {};

/* Применение модификаторов */
async function ApplyActions(Content, Actions){
	try{
		if(!Content || !Actions || !Actions.length){ return Content; }
		
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
		if(Info.length === 0){ Info = ["Texture", "R/T/Default.png", [["Multiply", "Random"]]]; }
		
		/* Что-бы Info.shift(), не редактировал генераторы */
		Info = DeepClone(Info);
		
		/* Как генерировать файл */
		var GenerateType = Info[0];
		
		var ID = JSON.stringify(Info);
		
		Logger.ConsoleTitle(MemoryFile ? "Генерация файла в памяти..." : "Генерация [" + Path + "]...", ID);
		
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
		
		var Result = null;
		
		switch(GenerateType){
			case "File": {
				const FilePath = Info[0];
				Actions = Info[1] || null;
				if((Actions && !Array.isArray(Actions)) || Info[2]){ throw new Error("Файл содержит лишние данные!"); }
				
				const File = await GetFile(FilePath, Path);
				
				if(ThatJSZipFile(File) && !ThatBinaryFile(File)){
					Result = UpdateText(await FileContent(File));
				}else{
					Result = File;
				}
				
				break;
			}
			
			case "Texture": {
				const FilePath = Info[0];
				Actions = Info[1] || null;
				if(Actions && !Array.isArray(Actions) || Info[2]){ throw new Error("Текстура содержит лишние данные!"); }
				Result = await GetTexture(FilePath, Path);
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
				
				if(!ThatTexture(Result)){ throw new Error("Невозможно сделать анимацию, поскольку получил не изображение!"); }
				
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
			
			case "Variable": {
				const F         = Info[0];
				const Variables = Info[1];
				Actions         = Info[2] || [];
				
				Result = await GenerateFile(F);
				
				if(ThatJSZipFile(Result)){ Result = await FileContent(Result); }
				
				if(typeof Result === "string"){
					const Matches = [...Result.matchAll(/<\[\s*Var(\d+)\s*\]>/g)];
					
					const RequiredVars = Matches.map(m => parseInt(m[1]));
					const MaxVar = Math.max(0, ...RequiredVars);
					
					if(Variables.length !== MaxVar){
						Logger.ConsoleError("Неверное кол-во переменных в Variable!\nДано: " + Variables.length + "\nНайдено: " + MaxVar);
					}
					
					Result = Result.replace(/<\[\s*Var(\d+)\s*\]>/g, (m, i) => {
						const i_ = parseInt(i) - 1;
						return Variables[i_] !== undefined ? Variables[i_] : m;
					});
					
					try{
						const JSON_Result = JSONParse(Result);
						if(Array.isArray(JSON_Result)){ Result = await GenerateFile(JSON_Result); }
					}catch(e){}
				}
				
				break;
			}
			
			case "Table": {
				const Code = Info[0];
				Actions    = Info[1] || [];
				
				var Table;
				try{
					const FileName = Path ? Path.split("/").pop().split(".")[0] : undefined;
					
					Table = (new Function("FileName", Code))(FileName);
					
					if(typeof Table !== "object" || Array.isArray(Table)){
						throw new Error("Custom функция должна возвращать таблицу!");
					}
				}catch(e){
					throw new Error("Произошла ошибка при выполнении Custom кода!\nКод: " + Code, e);
				}
				
				for(const [FileName, Info_] of Object.entries(Table)){
					try{
						const SubPath = Path ? ParentFolder(Path) + FileName : "";
						const FileResult = await GenerateFile(SubPath, Info_);
						
						await AddFileToPack(SubPath, FileResult);
					}catch(e){
						throw new Error("Произошла ошибка генерации файла [" + FileName + "] в Custom!\nИнформация: " + Info_, e);
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
		return Result;
	}catch(e){
		Logger.ConsoleError("Произошла ошибка при генерации файла " + (MemoryFile ? "в памяти" : "[" + Path + "]") + "!\nИнформация: " + JSON.stringify(Info), e);
		return PrintMessageText("Произошла ошибка при генерации этого файла...", e);
	}
}

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
		
		if(Prikol){
			Scale[0] *= Prikol_MulSize;
			Scale[1] *= Prikol_MulSize;
		}
		
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
		
		const SplashesInfo = await FileContentJSON(await GetFile("R/O/Splashes.json"));
		
		const Start = SplashesInfo["Start"];
		
		for(const Splash of SplashesInfo["Content"]){
			if(Result.length > 0){ Result += "\n"; }
			
			Result += Start + UpdateText(Splash);
		}
		
		return Result;
	}catch(e){
		throw new Error("Произошла ошибка при генерации сплешей!", e);
	}
}