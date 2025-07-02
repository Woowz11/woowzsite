/*Это архивная версия?*/
var WWArchive = false

/*Версия Woowzwiki*/
WWVersion = "0.0.1a"+(WWArchive?" ARCHIVE":"")

/*Глобальная информация о википедии*/
WWGlobalInfo = {}

/*Текущая страница ID*/
WWCurrentPage = ""

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
			var page = {"Type":"Page","ID":RemoveHTML(id),"Parent":paren,"Name":RemoveHTML(name),"Info":GetFT(page_info,null,{})}
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
			var title = {"Type":"Title","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":RemoveHTML(name),"Info":GetFT(title_info,null,{})}
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
			var line = {"Type":"Line","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":RemoveHTML(id),"Info":GetFT(line_info,null,{})}
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
			var custom = {"Type":"Custom","ID":RemoveHTML(id),"Parent":RemoveHTML(paren),"Name":code,"Info":GetFT(custom_info,null,{})}
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
	if(WWCurrentPage!=id){
		var page = WWGetPage(id);
		if(page!=null){
			WWCurrentPage = id;
			print("Открыта страница ["+id+"] "+page["Name"])
			var info = page["Info"];
			var page_html = GetFT(info,"Page","Пустая страница ['"+id+"']...");
			
			page_html = page_html.replace(/\n/g, '<br>');
			
			document.getElementById("PageID").innerHTML = "<font>"+page["Name"]+" <font style='font-size:13px;'>[ID=\""+page["ID"]+"\"; INDEX=\""+page["Index"]+"\"]</font></font>"
			document.getElementById("Page").innerHTML = page_html;
			document.getElementById("PageParent").style.padding = GetFT(info,"Padding",10)+"px";
		}
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
	var Icon = GetFT(WWGlobalInfo,"Icon","https://raw.githubusercontent.com/Woowz11/woowzsite/main/source/ww.ico");
	
	WoowzsiteConstructionProject = {
		"Name":"(Woowzwiki) "+WikiName,
		"Version":GetFT(WWGlobalInfo,"Version",null),
		"Author":GetFT(WWGlobalInfo,"Author",null),
		"CustomVersion":"{VERSION} (WW:"+WWVersion+")"
	}

	var SiteInfo = {

	"HeadInformation":{
		"Title":WikiName,
		"Icon":Icon
	},

	"Style":`
	@font-face {
		font-family: "comfortaa";
		src: url("https://raw.githubusercontent.com/Woowz11/woowzsite/main/source/Comfortaa.ttf") format('opentype');
	}
	
	html{
		background-color:rgba(0,0,0,0.05);
		font-family: comfortaa;
		font-weight: bold;
		font-stretch: condensed;
	}
	
	button{
		font-family: comfortaa;
		font-weight: bold;
		font-stretch: condensed;
	}
	
	img{
		border-radius: 15px;
	}
	
	video{
		border-radius: 15px;
	}
	
	b{
		text-shadow: -0.5px 0, 0 0.5px, 0.5px 0, 0 -0.5px, -0.5px -0.5px, 0.5px 0.5px, -0.5px 0.5px, 0.5px -0.5px;
	}
	
	code{
		display: inline-block;
		white-space: pre;
		box-sizing: border-box;
		background-color: rgba(0,0,0,0.2);
		font-family: "Courier New", Courier, monospace;
		padding: 5px;
		border-radius: 8px;
		border: 1px solid #ddd;
		tab-size: 3;
	}
	
	a{
		color: blue;
		text-decoration: none;
	}
	
	a:hover{
		text-decoration: underline;
	}
	
	::selection{
		background-color:transparent;
	}
	
	.Page::selection, .Page *::selection{
		background-color:yellow;
	}
	
	table {
		border-collapse: collapse;
		width: 100%;
		max-width: 600px;
	}
	th, td {
		border: 1px solid #333;
		padding: 6px 10px;
		text-align: left;
		font-family: monospace;
	}
	th {
		background-color: #f0f0f0;
	}
	caption {
		font-weight: bold;
		margin-bottom: 10px;
		font-size: 1.2em;
	}
	`,

	"StartPage":
`
<block id="Title" style="height:100px; width:100vw; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);">
<img style="height:1.5em; border-radius: 0px; padding-left:5px; transform: translate(0,2.5px);" src="`+Icon+`"> <font style="font-size:1.75em;">`+WikiName+`</font><br><br><font style="color:red; padding-left:5px;">!ALPHA VERSION! (`+WWVersion+`)</font> <a href="https://woowz11.github.io/woowzsite/woowzwiki_wiki.html">Подробнее...</a>
</block><br>
<block id="List" style="height:calc(100vh - 100px); width:379px; background-color:rgba(0,0,0,0.05); overflow-y:scroll; overflow-x:hidden; padding-left:5px;">

</block>
	<block style="height:calc(100vh - 100px); width:calc(100vw - 384px); min-height:100%; background-color:transparent; overflow-y:auto;overflow-x:auto;">
		<block id="PageID" style="min-width:100%; height: 3%; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);">???</block><br>
		<block id="PageParent" style="min-width:100%; min-height:calc(100% - 3%); padding: 10px; box-sizing: border-box; background-color:rgba(0,0,0,0.025);">
			<block class="Page" id="Page" style="min-width:100%;">
				На этой википедии нету ни одной страницы!<br>Если вы не знаете как их сделать,<br>прочтите это <a href="https://woowz11.github.io/woowzsite/woowzwiki_wiki.html">документация по Woowzwiki</a>
			</block>
		</block>
	</block>
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
	var OpenCategories = [];
	for(i in List_){
		var page = List_[i];
		var info = GetFT(page,"Info",{});
		if(FirstPageID==null){
			FirstPageID=page["ID"];
		}
		var type = page["Type"];
		var Result = "EMPTY";
		var IfParen = `<block id="`+page["ID"]+`___list" style="display:none;"><button id="`+page["ID"]+`___symb" onclick="WWOpenCategory('`+page["ID"]+`');">⏷</button><block id="`+page["ID"]+`___block" style="display:none;"></block></block>`;
		switch(type){
			case "Page":
				Result = `<button id="`+page["ID"]+`" style="min-width:55%;" onclick="WWOpenPage('`+page["ID"]+`');">` + page["Name"] + `</button>`
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
		if(GetFT(info,"Open",false)){
			OpenCategories.push(page["ID"]);
		}
		print("Добавлен "+type+" ["+page["ID"]+"] "+page["Name"])
	}
	
	for(const i in OpenCategories){
		const id = OpenCategories[i]
		WWOpenCategory(id);
	}
	
	WWOpenPage(GetFT(WWGlobalInfo,"StartPage",FirstPageID));
	var compiletimeEnd = new Date() - compiletime;
	print("Википедия собрана! ✔️ "+compiletimeEnd+"ms")
	println();
}