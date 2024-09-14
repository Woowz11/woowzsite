/*Это архивная версия?*/
var WWArchive = false

/*Версия Woowzwiki*/
WWVersion = "0.0.1a"+(WWArchive?" ARCHIVE":"")

/*Глобальная информация о википедии*/
WWGlobalInfo = {}

/*Установка информации о википедии*/
function WWSetInfo(info){
	info["List"] = {};
	WWGlobalInfo = info;
}

/*Получает страницу*/
function WWGetPage(id){
	return GetFT(WWGlobalInfo["List"],id,null);
}

/*Добавить страницу*/
function WWAddPage(id,paren,name,page_info){
	/* Информация страниц
	CustomSortID - Кастомный айдишник при сортировке
	*/
	if(WWGetPage(id)==null){
		paren = RemoveHTML(paren);
		if(WWGetPage(paren)!=null || paren==null){
			var page = {"Type":"Page","ID":RemoveHTML(id),"Parent":paren,"Name":RemoveHTML(name),"Info":page_info}
			WWGlobalInfo["List"][id] = page;
		}else{
			error("Не найден родитель ["+paren+"] страницы ["+id+"]! По этому не возможно её добавить! WWE3")
		}
	}else{
		error("Страница ["+id+"] уже существует! По этому не возможно её добавить! WWE1")
	}
}

/*Добавить текст*/
function WWAddTitle(id,paren,name,title_info){
	if(WWGetPage(id)==null){
		if(WWGetPage(paren)!=null || paren==null){
			var title = {"Type":"Title","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":RemoveHTML(name),"Info":title_info}
			WWGlobalInfo["List"][id] = title;
		}else{
			error("Не найден родитель ["+paren+"] тайтла ["+id+"]! По этому не возможно его добавить! WWE4")
		}
	}else{
		error("Тайтл ["+id+"] уже существует! По этому не возможно его добавить! WWE2")
	}
}

/*Добавить линию (разделение)*/
function WWAddLine(id,paren,line_info){
	if(WWGetPage(id)==null){
		if(WWGetPage(paren)!=null || paren==null){
			var line = {"Type":"Line","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":RemoveHTML(id),"Info":line_info}
			WWGlobalInfo["List"][id] = line;
		}else{
			error("Не найден родитель ["+paren+"] линии ["+id+"]! По этому не возможно её добавить! WWE6")
		}
	}else{
		error("Линия ["+id+"] уже существует! По этому не возможно её добавить! WWE5")
	}
}

/*Добавить кастомный элемент*/
function WWAddCustom(id,paren,code,custom_info){
	if(WWGetPage(id)==null){
		if(WWGetPage(paren)!=null || paren==null){
			var custom = {"Type":"Custom","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":code,"Info":custom_info}
			WWGlobalInfo["List"][id] = custom;
		}else{
			error("Не найден родитель кастомного элемента ["+paren+"] ["+id+"]! По этому не возможно его добавить! WWE8")
		}
	}else{
		error("Кастомный элемент ["+id+"] уже существует! По этому не возможно его добавить! WWE7")
	}
}

/*Открыть страницу по айди*/
function WWOpenPage(id){
	var page = WWGetPage(id);
	if(page!=null){
		var info = page["Info"];
		var page_html = GetFT(info,"Page","Пустая страница ['"+id+"']...");
		
		page_html = page_html.replace(/\n/g, '<br>');
		
		document.getElementById("PageID").innerHTML = "<font>"+page["Name"]+" <font style='font-size:13px;'>[ID=\""+page["ID"]+"\";INDEX=\""+page["Index"]+"\"]</font></font>"
		document.getElementById("Page").innerHTML = page_html;
	}
}

/*Открыть категорию*/
function WWOpenCategory(id){
	var category = document.getElementById(id+"___block");
	var symb = "⏷"
	if(category.style.display=="none"){
		category.style.display="unset"
		symb = "⏶";
	}else{
		category.style.display="none"
	}
	document.getElementById(id+"___symb").innerHTML = symb;
}

/*Компилировать википедию*/
function WWCreateWiki(){
	var WikiName = GetFT(WWGlobalInfo,"Name","Новая википедия");
	
	WoowzsiteConstructionProject = {
		"Name":"(Woowzwiki) "+WikiName,
		"Version":GetFT(WWGlobalInfo,"Version",null),
		"Author":GetFT(WWGlobalInfo,"Author",null),
		"CustomVersion":"{VERSION} (WW:"+WWVersion+")"
	}

	var SiteInfo = {

	"HeadInformation":{
		"Title":WikiName,
		"Icon":GetFT(WWGlobalInfo,"Icon","https://raw.githubusercontent.com/Woowz11/woowzsite/main/source/ww.ico")
	},

	"Style":`
	@font-face {
		font-family: "comfortaa";
		src: url("https://raw.githubusercontent.com/Woowz11/woowzsite/main/source/Comfortaa.ttf") format('opentype');
	}
	
	html{
		background-color:lightgray;
		font-family: comfortaa;
		font-weight: bold;
		font-stretch: condensed;
	}
	
	button{
		font-family: comfortaa;
		font-weight: bold;
		font-stretch: condensed;
	}
	`,

	"StartPage":
`
<block id="Title" style="height:100px; width:100vw; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);">
<font style="font-size:1.5em;">`+WikiName+`</font><br><font style="color:red;">!ALPHA VERSION (`+WWVersion+`)!</font>
</block><br>
<block id="List" style="height:calc(100vh - 100px); width:384px; background-color:rgba(0,0,0,0.125); overflow-y:scroll;overflow-x:hidden;">

</block>
<block style="height:calc(100vh - 100px); width:calc(100vw - 384px * 2); background-color:transparent; overflow-y:auto;overflow-x:auto;">
<block id="PageID" style="width:100%;background-color:rgba(255,255,255,0.25);">???</block><br>
<block id="Page" style="width:100%;">
На этой википедии нету ни одной страницы!<br>Если вы не знаете как их сделать,<br>прочтите это https://woowz11.github.io/woowzsite/woowzwiki_wiki.html
</block>
</block>
<block style="height:calc(100vh - 100px); width:384px; background-color:rgba(0,0,0,0.125); overflow-y:auto;overflow-x:hidden;">
Скоро...
</block>
`

	};

	SiteInfo = CreateDocument(SiteInfo);

	CompileSiteConstruction();
	print("Начата сборка википедии...")
	var compiletime = new Date();
	
	var List = GetFT(WWGlobalInfo,"List",{})
	
	var j = 0;
	var List_ = [];
	for(i in List){
		var page = List[i];
		var id = page["ID"];
		var paren = page["Parent"];
		var paren_idresult = "";
		
		var idresult = "("+j+")_"+id;
		if(paren_idresult!=""){
			idresult = paren_idresult+"_"+idresult
		}

		j++;
		if(GetFT(page["Info"],"CustomSortID",null)!=null){
			idresult = page["Info"]["CustomSortID"];
		}
		page["Index"] = idresult;
		List_.push(page);
	}
	
	List_.sort((a,b)=>{
		return a.Index.localeCompare(b.Index,"ru",{ignorePunctuation: true, numeric: true});
	});
	
	var Deep = {};
	
	var ListResult = "";
	var FirstPageID = null;
	print("Добавление страниц...")
	for(i in List_){
		var page = List_[i]
		if(FirstPageID==null){
			FirstPageID=page["ID"];
		}
		var type = page["Type"];
		var Result = "EMPTY";
		var IfParen = `<block id="`+page["ID"]+`___list" style="display:none;"><button id="`+page["ID"]+`___symb" onclick="WWOpenCategory('`+page["ID"]+`');">⏷</button><block id="`+page["ID"]+`___block" style="display:none;"></block></block>`;
		switch(type){
			case "Page":
				Result = `<button id="`+page["ID"]+`" style="width:55%;" onclick="WWOpenPage('`+page["ID"]+`');">` + page["Name"] + `</button>`
				break;
			case "Title":
				Result = `<font id="`+page["ID"]+`">`+page["Name"] + `</font>`
				break;
			case "Line":
				Result = `<hr id="`+page["ID"]+`" style="margin-left:{margin}px; margin-bottom:-15px;">`
				break;
			case "Custom":
				Result = page["Name"]
				break;
			default:
				Result = `<font id="`+page["ID"]+`" style="color:red;background-color:black;">Не найдено! ("`+type+`")</font>`
		}
		Result = Result + IfParen
		Result = Result.replace(/{id}/g,page["ID"])
		if(page["Parent"]==null){
			ListResult = ListResult+Result.replace(/{margin}/g,0)+"<br>";
			document.getElementById("List").innerHTML = ListResult;
		}else{
			document.getElementById(page["Parent"]+"___list").style.display = "unset";
			var parentparent = WWGetPage(page["Parent"])["Parent"]
			if(parentparent==null){
				Deep[page["Parent"]] = 1
			}else{
				Deep[page["Parent"]] = Deep[parentparent] + 1
			}
			
			var deep = Deep[page["Parent"]]
			document.getElementById(page["Parent"]+"___block").innerHTML = document.getElementById(page["Parent"]+"___block").innerHTML + "<br>" + (page["Type"]=="Line"||page["Type"]=="Custom"?"":"&nbsp;&nbsp;&nbsp;&nbsp;".repeat(deep)) + Result.replace(/{margin}/g,deep*24)
			ListResult = document.getElementById("List").innerHTML;
		}
		print("Добавлен "+type+" ["+page["ID"]+"] "+page["Name"])
	}
	
	WWOpenPage(GetFT(WWGlobalInfo,"StartPage",FirstPageID));
	var compiletimeEnd = new Date() - compiletime;
	print("Википедия собрана! ✔️ "+compiletimeEnd+"ms")
	println();
}