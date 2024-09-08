/* Библиотека с разными функциями для Woowz11 (ну так же если хотите можете и вы использовать :) )! */

/* Для лучшей работы, лучше всего на сайте указывать <meta charset="utf-8"> */

/* ________________________________________________________________________________________________ */
/*Версия этой библиотеки*/
LibVersion = "0.0.0"
/*Нужно что-бы проверять на существование этой библиотеки*/
WoowzsiteLibInstalled = true;
console.log("Библиотека "+LibVersion+" загружена!");

/*Дефолтная функция print (печать текущего документа)*/
printer = window.print;

/*Стартовое сообщение в команде print (MESSAGE меняется на сообщение)*/
StartPrintMessage = "{MESSAGE}"

/*Конвертировать сообщение в сообщение для консоли*/
function ConvertPrintMessage(message){
	return GetTime(StartPrintMessage.replace(/{MESSAGE}/g,message));
}

/*Отправляет сообщение в консоль*/
window.print = function(message,clear){
	if(clear==null){clear=false;}
	var typ = typeof message;
	console.log(clear?message:ConvertPrintMessage(message));
	if(typ!="string"){
		console.log(message);
	}
}

/*Отправляет сообщение ошибку в консоль*/
function error(message,id){
	console.error(ConvertPrintMessage(message+(id==null?"":" - "+id)))
}

/*Заменить в строке спец символы на нужное время, или на нынешнее (всё возвращается в виде числа)
{YY} - Год
{MM} - Месяц
{DD} - День
{HH} - Час
{MI} - Минута
{SS} - Секунда
{MS} - Милисекунда
{WW} - День недели */
function GetTime(message,date){
	if(date==null){date=new Date();}
	return message.replace(/{YY}/g,date.getFullYear()).replace(/{MM}/g,date.getMonth()).replace(/{DD}/g,date.getDate()).replace(/{HH}/g,date.getHours()).replace(/{MI}/g,date.getMinutes()).replace(/{SS}/g,date.getSeconds()).replace(/{MS}/g,date.getMilliseconds()).replace(/{WW}/g,date.getDay())
}

/*Получает переменную из таблицы, если она не найдена то возвращает определённую переменную*/
function GetFT(tabl,key,ifnil){
	if(tabl[key]!=null){return tabl[key]}else{return ifnil}
}

/*Установить переменную в таблице, если она пустая*/
function SetFT(tabl,key,ifnil){
	if(!tabl[key]){tabl[key]=ifnil}
}

/*Установить переменные в таблицу, если их нету*/
function AddTableToTable(tabl1,tabl2){
	for(i in tabl1){
		var j = tabl1[i];
		SetFT(tabl2,i,j);
	}
}

/*Установка стартового названия сайта*/
function SetSiteTitle(title){
	document.title = title;
}

/*Установка стартовой иконки сайта*/
function SetSiteIcon(iconpath){
	let iconLink = document.createElement('link');
	iconLink.rel = "icon";
	iconLink.href = iconpath;
	document.head.appendChild(iconLink);
}

/*Превратить HTML код в обычный текст*/
function RemoveHTML(code){
	if(code==null){return null;}
	return code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}