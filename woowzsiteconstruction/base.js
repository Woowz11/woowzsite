/* Библиотека для создания сайтов на основе Woowzsite Construction */
/* Википедия по этой библиотеке: ? */

/* Для работы требуется ../lib/lib.js! */

/* _______________________________________________________________ */

/*Версия библиотеки*/
WoowzsiteConstructionVersion = "0.0.0";

/*Информация о проекте*/
WoowzsiteConstructionProjectDefault = {/*[НЕ ИЗМЕНЯТЬ]*/
	"Name":"Неизвестный проект",/*Название проекта*/
	"Version":"?.?.?",/*Версия проекта*/
	"Author":"Аноним",/*Автор проекта*/
	"CustomVersion":"{VERSION}"/*Дополнительная информация в строке с версией*/
}
WoowzsiteConstructionProject = {};

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
	print("⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯",true)
}

/*Получает информацию о сайте, и создаёт сайт по этой информации*/
function CompileSiteConstruction(){
	if(SiteConstructed){error("Сайт уже собран! Его нельзя повторно собрать!","E1")}else{
		if(!SiteError){
			SiteConstructed = true;
			AddTableToTable(WoowzsiteConstructionProjectDefault,WoowzsiteConstructionProject);
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
			print("Версия: "+WoowzsiteConstructionProject["CustomVersion"].replace(/{VERSION}/g,WoowzsiteConstructionVersion))
			print("Проект: "+WoowzsiteConstructionProject["Name"]+(WoowzsiteConstructionProject["Version"]!="?.?.?"?" ("+WoowzsiteConstructionProject["Version"]+")":""))
			print("Автор: "+WoowzsiteConstructionProject["Author"])
			println();
			
			StartPrintMessage = "{HH}:{MI}:{SS}:{MS} | {MESSAGE}";
			
			print("Начата сборка базы сайта...")
			var compiletime = new Date();
			WSCCompileHeadInformation()
			var compiletimeEnd = new Date() - compiletime;
			print("База сайта собрана! ✔️ "+compiletimeEnd+"ms")
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
	styleElement.id = "Style"
	styleElement.innerHTML = `
	html{
		font-size:0;
		cursor:default;
		white-space: nowrap;
	}
	
	font{
		font-size:20px;
	}
	
	button{
		
	}
	
	div{
		display:inline-block;
		unicode-bidi: isolate;
		border-radius: 20px;
		font-size:20px;
	}
	
	block{
		display:inline-block;
		unicode-bidi: isolate;
		font-size:20px;
	}
	`
	document.head.appendChild(styleElement);
	var customStyle = GetFT(GlobalSiteInfo,"Style","");
	if(customStyle!=""){
		let styleElementCustom = document.createElement('style');
		styleElementCustom.id = "CustomStyle"
		styleElementCustom.innerHTML = GetFT(GlobalSiteInfo,"Style","")
		document.head.appendChild(styleElementCustom);
	}
	
	/* Установка начальной страницы */
	document.body.innerHTML = GetFT(GlobalSiteInfo,"StartPage",`<font style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);">Это пустая страница сайта проекта [`+RemoveHTML(WoowzsiteConstructionProject["Name"])+`]!</font>`)
}

/* _______________________________________________________________ */

/*Сгенерировать сцену, без неё не будет работать компиляция*/
function CreateDocument(SiteInfo){
	SetFT(SiteInfo,"Scene",{})
	GlobalSiteInfo = SiteInfo;
}