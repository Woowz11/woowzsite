function AddFullnessToTable(tabl,whataddpered,whataddsad){
	if(whataddpered==null){whataddpered=""} if(whataddsad==null){whataddsad=""}
	var newtabl = []
	for (let str of tabl){
		newtabl.push(whataddpered+str+whataddsad)
	}
	return newtabl
}
function AddTableToTable(tabl1,tabl2){
	return tabl1.concat(tabl2);
}
/*__________________________________________________________________________________________________*/

/* CMD команда на поиск файлов (пример, типа gif): dir /b /a-d *.gif    */

/* Иконки (source/*.ico) */
WoowzsiteSourceIcons = AddFullnessToTable([
	"woowz11","click","text","woowzengine","q","cat","cube","ai-galery","none","dead","wcom","gear","a","terminal","cssjs","blank","folder","idk","search3","test","bloodeye_old",
	"ops","allblack","all","eye","dex","bloodeye","xxx","null","griffer","search2","search","skull"
],"source/",".ico")

/* Изображения PNG (source/*.png) */
WoowzsiteSourceImagesPNG = AddFullnessToTable([
	"889288636829429760","about","anomaly-cat","arrowleft","arrowright","arrow_top","b","b2","background","background_","ban","bes1","bes2","bes3","bes4","bes5","bg","bloodeye","bloodeyeco_title","change","click",
	"CLOSETHIS","CLOSETHIS2","CLOSETHIS3","concrete","concrete2","copy","copy_to","createelement","dark","delete","dexonmusic","discord","discord_error","easylocation","error-image","error","eyes","fence-bg","fence",
	"fence2","files1","files2","files3","files4","file_chrome","file_folder","file_spyfolder","file_txt","fur","galka","hacker","hz2","hz3","hz4","hz5","icon1","icon2","icon3","image","info","jyrnal","left","line","line2",
	"locate","lupa","metal","microsoft_fly_simulator_epicepdiditonpps","newfolder","no-cat","nointernet","noway!!!","obsidian_bowl","open","openprojecttitle","options","p","paper","par","paste","pixel","plus",
	"plushover","position_end","position_end1","p_back","quare","rename","search","selectall","selectdinverse","selectdone","sky","smolarrow_bottom","smolarrow_right","smol_galka","sup","systems","teh","test",
	"title","title2","title3","title4","title_smol","vis","wcom","windowpluginfolders","windowpluginfolders_left","windowpluginfolders_right","woowz11","woowzengine","zakrep","transparent","transparent-dark",
	"transparent-red","transparent-green","transparent-blue","transparent-yellow","invisible","white","black","onerror"
],"source/",".png")

/* Изображения JPG (source/*.jpg) */
WoowzsiteSourceImagesJPG = AddFullnessToTable([
	"95","background_dexon","ble_backgro","brick","brick2","brick3","gradient","hi","ice","line","openprojectbackground","skeleto_message","test","tiles","WqIqAQzOsgc"
],"source/",".jpg")

/* Изображения GIF (source/*.gif) */
WoowzsiteSourceImagesGIF = AddFullnessToTable([
	"download","esqueleto","fire","forest","gif","git","git2","null","null_bug","pet","s","vinil","welcome","wowzsearch","WTR6"
],"source/",".gif")

WoowzsiteSourceBackrooms = AddTableToTable(AddFullnessToTable([
	"0_0","0_1","0_2","0_3","0_4","0_5","0_6","0_7","0_8","0_9","0_10","0_11","0_12","0_13","0_14","0_15","0_16","0_17","0_18"
],"source/woowzbackrooms/levels/",".png"),[
	"source/woowzbackrooms/arrow.png","source/woowzbackrooms/noise.png","source/woowzbackrooms/vin.png"
])

WoowzsiteSourceWldouiBackrooms = AddFullnessToTable([
	"backrooms1","backrooms20","backrooms21","backrooms22","go","goleft","goright","test"
],"source/wldbackroomsgame/",".png")

WoowzsiteSourceWoowzengine = AddTableToTable(AddFullnessToTable([
	"0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42",
],"source/woowzengine/funny/",".png"),[
	"source/woowzengine/ascii.png","source/woowzengine/colorbox.png","source/woowzengine/colorbox_t.png","source/woowzengine/og.png"
])

WoowzsiteSourceDiscordAvatars = AddTableToTable(AddFullnessToTable([
	".fom","aleks_cherri","apdown1533","arab2827","artyomrus","aspa102","bacteriahowler","baranki135","beryks","blue.fox.","cadaver9599","cool.so.sandwich","cyberpaul_red.","deerrus","dermuaress","dexony","dragolite_17",
	"dragonlordxxx","drom6906","faserredeve","fawdot","fordongreeman048","gaips","gemingtv","gero1n41k","glados1358","goni0052","gyg9600","hachumakentosh","hiking702","iamscienceman","iwannasleepinyourbed","jacket48",
	"justgamingyt5949","kasqw","kastikepussukka","kersher","kirk1448","klaverr","kotyara228","kseleron","lisstons","lomakinnn","mannytko","meeee66","metallcore999","monsterfish._","mor1oka","morphandriy","morzz1c",
	"myleskingston","nekitplay155","neoprod","no","pacocareal","pavkalakar","pussyfapper","redsham","rodrigesgames","ruslanconnection","sadsalat","santinnel","shiir0k","styledun","sv1t.","taykeu","the0ceanman",
	"thewindowskerpka","treepii24","troll_bebra","turbobtv","uzelezz","wantedrobot","wldoui","woowz11.","woowz11","xyzswagga","your_local_russian","youwillseelowskill","zebratv","zinderant","zooi","zvski",
	"_brigadir_","_mrgun_","_primorskiy_","_ruddi","_sleepingman"
],"source/discordavatars/",".png"),AddFullnessToTable([
	"nberbaaaaaaa","_brinq_","haveaniceday."
],"source/discordavatars/",".gif"))

WoowzsiteSourceRandomSite = AddTableToTable(AddFullnessToTable([
	"9311797.164999995_image","10056771.889999975_image","image","IMG_20230618_013225","omg","Pngpng","ssasa","test-aubergine",
],"source/specialforrandomsite/",".png"),AddFullnessToTable([
	"0AE7CCF4-4A80-4942-8D8C-E031CF3A68BE","bye","catblyat","orange-cat","screams","Sequence_01_1","sleep","who","who-are-you-cat",
],"source/specialforrandomsite/",".gif"))

WoowzsiteSourceCats = AddFullnessToTable([
	"cat1","cat10","cat10_1","cat10_2","cat10_3","cat10_4","cat10_5","cat11","cat11_1","cat11_2","cat11_3","cat11_4","cat11_5","cat12","cat12_1","cat12_2","cat12_3","cat12_4","cat12_5","cat13","cat13_1","cat13_2",
	"cat13_3","cat13_4","cat13_5","cat14","cat14_1","cat14_2","cat14_3","cat14_4","cat14_5","cat15","cat15_1","cat15_2","cat15_3","cat15_4","cat15_5","cat16","cat16_1","cat16_2","cat16_3","cat16_4","cat16_5","cat17",
	"cat17_1","cat17_2","cat17_3","cat17_4","cat17_5","cat18","cat18_1","cat18_2","cat18_3","cat18_4","cat18_5","cat1_1","cat1_2","cat1_3","cat1_4","cat1_5","cat2","cat2_1","cat2_2","cat2_3","cat2_4","cat2_5",
	"cat3","cat3_1","cat3_2","cat3_3","cat3_4","cat3_5","cat4","cat4_1","cat4_2","cat4_3","cat4_4","cat4_5","cat5","cat5_1","cat5_2","cat5_3","cat5_4","cat5_5","cat6","cat6_1","cat6_2","cat6_3","cat6_4","cat6_5",
	"cat7","cat7_1","cat7_2","cat7_3","cat7_4","cat7_5","cat8","cat8_1","cat8_2","cat8_3","cat8_4","cat8_5","cat9","cat9_1","cat9_2","cat9_3","cat9_4","cat9_5"
],"source/cats/",".png")

WoowzsiteSourceBloodraw = AddFullnessToTable([
	"dirt.png","iconblock.ico","logo.png"
],"source/bloodraw/","")

WoowzsiteSourceBloodeyeSystems = AddFullnessToTable([
	"bloodeye_system","bloodeye_system_2_screen","bloodeye_system_3d","bloodeye_system_screen","bloodeye_system2","bloodeye_system2_3d","bloodeye_system3","bloodeye_system3_3d","boxtexture","boxtexture_3d",
],"source/bloodeyesystems/",".png")

WoowzsiteSourceCore = AddTableToTable(AddFullnessToTable([
	"ants","bath_oil_pearls","beer","bg","button","dice","husky","spider_crab","teeth"
],"core-wiki/source/",".png"),AddFullnessToTable([
	"200w","3demail21","acid","ametist","atom1","back","ball","basement","bg","bingus","bubbles","cat-gift","cat","cat_skateboard","cd-rom","centipede","centipede_face","chrome_mans","console","cyclon",
	"dancing_cat","dark_eye","dark_eye_pyramid","dice_white","donut","dream","email6","emerald","envelope","equalizer","error","face","fish","flame","flowers","godzilla","going_to_hell","got_mail","grapher",
	"guitar","gummy_simulation","hampsters","hand","happy","horse","house_centipede","idk","int","internet_party","kiri","live_metal","mac","mail","monky","monster","moon","movie","nails","new1","pc","phones",
	"police","pyramid","pyramids2","radar","rainbow_gold","red","red_tiles","robot","robot_music","roses","rotglobe","screw","scrollmail","sea","seastar","set_water","sickness","siren","smallerskull","smiling",
	"smoking-skull","speker","spider-password","spiralition","spotting","star","stars","sword","target","teddy","teeth","teeth_sphere","teeth_sphere2","teeth_weel","text_scroll","trash","under_construction",
	"updated","washing_maching","wave","windows_95_error","windows_cockroach","worm","yes","you_are_an_idiot"
],"core-wiki/source/",".gif"))

function GetAllWoowzsite(){
	var tabl = AddTableToTable(WoowzsiteSourceImagesPNG,
	AddTableToTable(WoowzsiteSourceImagesJPG,
	AddTableToTable(WoowzsiteSourceImagesGIF,
	AddTableToTable(WoowzsiteSourceDiscordAvatars,
	AddTableToTable(WoowzsiteSourceWoowzengine,
	AddTableToTable(WoowzsiteSourceWldouiBackrooms,
	AddTableToTable(WoowzsiteSourceCats,
	AddTableToTable(WoowzsiteSourceBloodraw,
	AddTableToTable(WoowzsiteSourceRandomSite,
	AddTableToTable(WoowzsiteSourceBloodeyeSystems,
	AddTableToTable(WoowzsiteSourceCore,
	AddTableToTable(WoowzsiteSourceIcons,WoowzsiteSourceDiscordAvatars))))))))))));
	return tabl;
}

function GetAllWoowzsiteImages(){
	var tabl = GetAllWoowzsite();
	var tabl_ = [];
	for(var src of tabl){
		if(src.includes(".png")||src.includes(".jpg")||src.includes(".gif")){
			tabl_.push(src);
		}
	}
	return tabl_;
}

function GetAllWoowzsiteIcons(){
	var tabl = GetAllWoowzsite();
	var tabl_ = [];
	for(var src of tabl){
		if(src.includes(".ico")){
			tabl_.push(src);
		}
	}
	return tabl_;
}