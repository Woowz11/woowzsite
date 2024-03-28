//----------------- [Главные переменные] ---------------------------------------------------------

var html = "";
var SiteSettings;

//------------------ [Запуск скриптка] -----------------------------------------------------------

function LoadScriptToSite(SiteSettings_){
	if(SiteSettings_==null || typeof SiteSettings_ != "object"){SiteSettings_={}};
	console.log(SiteSettings_);
	for (const [key_, value] of Object.entries(SiteSettings_)) {
		var key = key_.toLowerCase();
		if(key=="title"){}
		else if(key=="icon"){}
		else{
			console.log("Site setting ["+key_+"] doesn't exsist!");
		}
	}
	SiteSettings = SiteSettings_;
}

//------------------------------------------------------------------------------------------------

function forEach2(arrayobject: string){
	console.log("test");
}