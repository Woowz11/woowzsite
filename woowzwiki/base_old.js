/*
Временная википедия для википедии вот так вот да!

Переменные для WWCreateWiki

Name = Название википедии
Author = Автор википедии
List = Список
Pages = Страницы
StartPage = Страница которая откроется первой

Переменные для Style

Background = цвет заднего фона
Farground = цвет переднего фона

Переменные для категории

Open = Открывать список с самого начала?

*/ 

WWVersion = "0.0.1 Alpha" //Версия библиотеки на википедии
WWAuthor = "Woowz11" //Создатель библиотеки на википедии
WWLink = "https://woowz11.github.io/woowzsite/woowzwiki/base.js" //Ссылка на библиотеку на википедии
WWLocalLink = "woowzwiki/base.js" //Локальная ссылка на библиотеку на википедии

function WWGet(info, id, def) { //Получить элемент из таблицы или вернуть дефолт
    if(info[id] !== undefined){
        return info[id];
    }
    return def;
}

var WIKIDATA = {}

function WWOpenPage(id){ //Открывает определённую страницу по айди
	var content = "("+id+") not found!"
	var title = "?"
	var pageinfo = null
	var categoryinfo = null
	
	for (var categoryid in WIKIDATA) {
		if (WIKIDATA[categoryid]["Pages"].hasOwnProperty(id)) {
			categoryinfo = WIKIDATA[categoryid]
			pageinfo = categoryinfo["Pages"][id];
			break;
		}
	}
	
	if (pageinfo != null){
		content = pageinfo["Content"]
		title = categoryinfo["Name"]+"\\"+pageinfo["Name"]+" ("+id+")"
	}
	
	document.getElementById("text").innerHTML = content
	document.getElementById("text-title").textContent = title
}

function WWOpenCategory(id){ //Открывает категорию или закрывает
	var list = document.getElementById("list-"+id)
	if(list.style.display == "none"){
		list.style.display = "block"
	}else{
		list.style.display = "none"
	}
}

function WWCreateWiki(info){ //Создать википедию
	var head = document.head || document.getElementsByTagName('head')[0];
	
	var Name = WWGet(info,"Name","Unnamed Wiki")
	var Author = WWGet(info,"Author","Anonymous")
	var Style = WWGet(info,"Style",{})
	
	document.title = "Loading..."
	
	document.addEventListener('DOMContentLoaded', function() {
		document.title = Name
		var body = document.body || document.getElementsByTagName('body')[0];
		
		var S_Background = WWGet(Style,"Background",[230,230,230])
		var S_Farground = WWGet(Style,"Farground",[128,128,128])
		var style = `
html{
	background-color: rgb(`+S_Background[0]+`,`+S_Background[1]+`,`+S_Background[2]+`);
	cursor: default;
}

::selection{
	background-color: transparent;
}

.text-result::selection {
    background-color: #3367D1;
	color: white;
}
.text-result *::selection {
    background-color: #3367D1;
	color: white;
}

body {
	margin: 0px;
}

ul {
    list-style-type: none;
	padding: 0;
    margin: 0;
}

.category{
	cursor: pointer;
	color: rgb(70,70,70);
}

.category:hover{
	color: red;
}

.category-text{
	
}
		`
		var styleElement = document.createElement('style');
		styleElement.innerHTML = style;
		document.head.appendChild(styleElement);
		
		var bodyhtml = 
`<!-- Generated wikipedia (`+Name+`) based on "Woowzwiki" -->
<div style="position: absolute; width: 90vw; min-width: 1024px; max-width: 1700px; display:flex;">
	<div style="width: 15vw; min-width:200px; height:100vh;"></div>
	
	<div style="width: 400px; min-width:200px; height:100vh; display:flex; flex-direction: column; background-color:rgb(`+S_Farground[0]+`,`+S_Farground[1]+`,`+S_Farground[2]+`);">
		<div style="height:90px; position: relative;"><font style="font-size: 2em; position: absolute; left:50%; top:50%; transform: translate(-50%, -50%); text-align: center;">`+Name+`</font></div>
		<div style="height:100%; display: contents;">
			<div id="list" style="overflow-y: auto; height:100%;">
				
			</div>
		</div>
		<div style="height:90px;"><p></p></div>
	</div>
	<div style="width: 100%; height:100vh; display:flex; flex-direction: column; background-color:rgb(`+S_Farground[0]+`,`+S_Farground[1]+`,`+S_Farground[2]+`);">
		<div style="height:110px;"><p id="text-title">?</p></div>
		<div style="height:100%; display: contents;">
			<div style="overflow-y: auto; overflow-x: auto; white-space: nowrap; height:100%; width: 1215px; background-color:white;"><div class="text-result" id="text" style="margin-left:30px; margin-right:30px; margin-top:15px; margin-bottom:15px;"></div></div>
		</div>
		<div style="height:110px;">Создатель вики: `+Author+`<br>База: <a href="https://woowz11.github.io/woowzsite/woowzwiki_wiki.html">Woowzwiki</a><br>Версия: `+WWVersion+`<br><font style="color:red;">!ALPHA VERSION!</font></div>
	</div>
</div>
`
		
		body.innerHTML = bodyhtml
		
		function LoadData(){
			function CreateCategory(id,data){
				WIKIDATA[data[0]] = {Name: data[1], Pages: {}, Info: data[2]}
			}
			function CreatePage(id,data){
				if(WIKIDATA[data[0]] == undefined){
					data[0] = "unknown"
					CreateCategory(-1,[data[0],"Unknown"])
				}
				WIKIDATA[data[0]]["Pages"][id] = {Name: data[1],Content: data[3]}
			}
			
			var listdata = WWGet(info,"List",[["example_category","New Category",{}]])
			for (var i = 0; i < listdata.length; i++){
				var categoryinfo = listdata[i]
				CreateCategory(i,categoryinfo)
			}
			var pagesdata = WWGet(info,"Pages",{"example_page":["example_category","New Page",{},`That example page!`]})
			for (var pageid in pagesdata){
				var pageinfo = pagesdata[pageid]
				CreatePage(pageid,pageinfo)
			}
		}
		LoadData()
		
		function LoadList(){
			var list = document.getElementById("list")
			var result = ``
			for (var categoryid in WIKIDATA){
				var categoryinfo = WIKIDATA[categoryid]
				var pages = categoryinfo["Pages"]
				var pages_length = Object.keys(pages).length
				var emptycategory = (pages_length==0)
				result = result + `<center><b `+(emptycategory?`class="category-text"`:`class="category" onclick="WWOpenCategory('`+categoryid+`');"`)+`>`+categoryinfo["Name"]+(emptycategory?``:` (`+pages_length+`)`)+`</b></center><ul id="list-`+categoryid+`" style="display: none;">`
				for (var pageid in pages){
					var pageinfo = pages[pageid]
					result = result + `<li><button style="width:100%;" onclick="WWOpenPage('`+pageid+`');">`+pageinfo["Name"]+"</button></li>"
				}
				result = result + `</ul>`
			}
			list.innerHTML = result
			
			for (var categoryid in WIKIDATA){
				var categoryinfo = WIKIDATA[categoryid]
				var category_info = categoryinfo["Info"]
				var open = WWGet(category_info,"Open",false)
				if (open){
					WWOpenCategory(categoryid)
				}
			}
		}
		LoadList()
		
		var startpageid = WWGet(info,"StartPage","")
		if (startpageid!=""){
			WWOpenPage(startpageid)
		}
	});
}