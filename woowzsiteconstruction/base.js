/* Библиотека для создания сайтов на основе Woowzsite Construction */
/* Википедия по этой библиотеке: ? */

/* Для работы требуется ../lib/lib.js! */

/* _______________________________________________________________ */

/*Версия библиотеки*/
WoowzsiteConstructionVersion = "0.0.0";

/*Информация о проекте*/
WoowzsiteConstructionProject = {
	"Name":"Неизвестный проект",/*Название проекта*/
	"Version":"?.?.?",/*Версия проекта*/
	"Author":"Аноним"/*Автор проекта*/
}

/*Сайт собран?*/
var SiteConstructed = false;/*[НЕ ИЗМЕНЯТЬ]*/
/*Сайт выдал ошибку при сборке?*/
var SiteError = false;/*[НЕ ИЗМЕНЯТЬ]*/

if(typeof WoowzsiteLibInstalled == 'undefined'){
	SiteError = true;
	console.error("Не найдена библиотека ../lib/lib.js для работы WoowzsiteConstruction! - F1");
}

/* _______________________________________________________________ */

/*Информация о сайте, только в виде публичной переменной*/
GlobalSiteInfo = {};

/*Сцена которая рендерится в данный момент*/
CurrentScene = {};

/*Рисует линию в консоли*/
function println(){
	print("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯",true)
}

/*Получает информацию о сайте, и создаёт сайт по этой информации*/
function CompileSiteConstruction(){
	if(SiteConstructed){error("Сайт уже собран! Его нельзя повторно собрать!","E1")}else{
		if(!SiteError){
			SiteConstructed = true;
print(`██╗    ██╗ ██████╗  ██████╗ ██╗    ██╗███████╗███████╗██╗████████╗███████╗
██║    ██║██╔═══██╗██╔═══██╗██║    ██║╚══███╔╝██╔════╝██║╚══██╔══╝██╔════╝
██║ █╗ ██║██║   ██║██║   ██║██║ █╗ ██║  ███╔╝ ███████╗██║   ██║   █████╗  
██║███╗██║██║   ██║██║   ██║██║███╗██║ ███╔╝  ╚════██║██║   ██║   ██╔══╝  
╚███╔███╔╝╚██████╔╝╚██████╔╝╚███╔███╔╝███████╗███████║██║   ██║   ███████╗
 ╚══╝╚══╝  ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝`)
print(` ██████╗ ██████╗ ███╗   ██╗███████╗████████╗██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝╚══██╔══╝██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
██║     ██║   ██║██╔██╗ ██║███████╗   ██║   ██████╔╝██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║
██║     ██║   ██║██║╚██╗██║╚════██║   ██║   ██╔══██╗██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║
╚██████╗╚██████╔╝██║ ╚████║███████║   ██║   ██║  ██║╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝`)
			print("Версия: "+WoowzsiteConstructionVersion)
			print("Проект: "+WoowzsiteConstructionProject["Name"]+(WoowzsiteConstructionProject["Version"]!="?.?.?"?" ("+WoowzsiteConstructionProject["Version"]+")":""))
			print("Автор: "+WoowzsiteConstructionProject["Author"])
			println();
			
			StartPrintMessage = "{HH}:{MI}:{SS}:{MS} | {MESSAGE}";
			
			print("Начата сборка сайта...")
			WSCCompileHeadInformation()
			WSCCompileStyleElement(document.documentElement,GetFT(GlobalSiteInfo,"Style",{}))
			WSCRenderScene();
			print("Сайт собран! ✔️")
			println();
		}
	}
}

/* _______________________________________________________________ */

function WSCCompileHeadInformation(){
	var hdinf = GetFT(GlobalSiteInfo,"HeadInformation",{})
	
	/*Установка стартового названия сайта*/
	SetSiteTitle(GetFT(hdinf,"Title","WSC сайт!"))
	
	/*Установка стартовой иконки сайта*/
	SetSiteIcon(GetFT(hdinf,"Icon","../source/wsc.ico"))
	
	/*Загрузка стилей к body*/
	var body = document.body;
	body.style.cssText = "margin:0px;";
	
	/*Загрузка дефолтных стилей*/
	let styleElement = document.createElement('style');
	styleElement.innerHTML = `
	html{
		font-size:1.5em;
		cursor:default;
	}
	
	div{
		display:inline-block;
		border-radius: 20px;
	}
	`
	document.head.appendChild(styleElement);
}

function WSCCompileStyleElement(el,style){
	var result = "";
	
	/*Установить задний фон*/
	var Background = GetFT(style,"Background","white");
	result = result + "background-color: "+Background+";";
	
	el.style.cssText = result;
}

function WSCRenderScene(){
	var scene = GlobalSiteInfo["Scene"];
	var result = "";
	
	for(el_id in scene){
		var el = scene[el_id]
		var typ = el["Type"]
		var r = "";
		switch(typ){
			case "panel":
				r = `panel`
				break;
			case "text":
				r = `text`
				break;
			default:
				r = `<div style="background-color:black; border: 3px solid red; padding:10px;"><font style="color:red;">Unknown type [`+RemoveHTML(typ)+`]!</font></div>`
		}
		result = result + r;
	}

	if(CurrentScene!=scene){
		CurrentScene = scene;
		document.body.innerHTML = result;
	}
	requestAnimationFrame(WSCRenderScene);
}
requestAnimationFrame(WSCRenderScene);

/* _______________________________________________________________ */

/*Проверить есть ли на сцене элемент*/
function HasElement(id){
	return GlobalSiteInfo["Scene"][id]!=null;
}

/*Создать элемент*/
function Create(id,par,typ,info){
	if(!HasElement(id)){
		if(HasElement(par)||par==null){
			typ=typ.toLowerCase();
			var result = {"ID":id,"Parent":par,"Type":typ,"Info":info};
			SetFT(GlobalSiteInfo["Scene"],id,result);
		}else{
			error("Элемент ["+id+","+par+","+typ+"] не может быть создан, потому-что не найден родитель!","E3");
		}
	}else{
		error("Элемент ["+id+","+par+","+typ+"] уже существует на сцене!","E2")
	}
}

/*Сгенерировать сцену, без неё не будет работать компиляция*/
function CreateDocument(SiteInfo){
	SetFT(SiteInfo,"Scene",{})
	GlobalSiteInfo = SiteInfo;
}