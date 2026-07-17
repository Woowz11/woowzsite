const TRUE_LIT_ARTS_COLLECTION = []

let PREFIX;
if(window.location.protocol === "file:"){
	PREFIX = "file:///W:/Other"
}else if(window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"){
	PREFIX = window.location.origin
}else{
	PREFIX = "https://woowz11.github.io"
}

const TrueLithuismArts = []
let ADD = function(SOURCE, NAME, AUTHOR, DATE, ALREADY){
	if(!SOURCE){ SOURCE = "ERROR.png" }
	if(!NAME){ NAME = "undefined name" }
	if(!AUTHOR){ AUTHOR = "ANONIM." }
	if(!DATE){ DATE = "????.??.??" }

	const FULLSOURCE = `${PREFIX}/woowzsite/${(ALREADY === true ? SOURCE : `Lituism/art/${SOURCE}`)}`

	TRUE_LIT_ARTS_COLLECTION.push({
		SOURCE: FULLSOURCE,
		NAME  : NAME,
		AUTHOR: AUTHOR,
		DATE  : DATE
	})

	if(ALREADY !== true) {
		TrueLithuismArts.push(`Lituism/art/${SOURCE}`)
	}
}

// ----------------------------------------------------------------------

const __A_WOOWZ = "𐌸𐍈𐍈𐌸𐌶𐌹𐌹"
const __A_SKREP = "thewindowskerpka"
const __A_WYLDI = "W*LDI"
const __A_SYRNI = "Syrnik (WOMAN)"
const __A_HADAY = "Have a nice day."
const __A_PAVEL = "PVK LAKR"

const __A_ANONIM = "??? (не помню кто)"
const __A_IDK = " (я не помню точно)"

// ----------------------------------------------------------------------

// надо бы заглянуть на сервер glitch старый акк посмотреть фотки

// ADD("ERROR.png", "NAME", __A_WOOWZ)

ADD("desk.png", "🖥", __A_WOOWZ, "2026.07.16")
ADD("combposter3.png", "toiletcombineposter3", __A_SKREP, "2026.07.16")
ADD("combposter2.png", "toiletcombineposter2", __A_SKREP, "2026.07.16")
ADD("combposter1.png", "toiletcombineposter1", __A_SKREP, "2026.07.15")
ADD("deadsteam.png", "Аватарка смерти", __A_WYLDI)
ADD("poster_pissrooms.png", "PISSROOMS", __A_SKREP, "2026.07.11")
ADD("poster_onlykill.png", "Тут уже сам", __A_SKREP, "2026.07.10")
ADD("poster_jeb.png", "KOSHER FOOD ✡", __A_SKREP, "2026.07.10")
ADD("poster_hmad.png", "МАГАЗИН «КРУТОЙ» фильм в 3д", __A_SKREP, "2026.07.10")
ADD("poster_company.png", "jEw", __A_SKREP, "2026.07.10")
ADD("GICON.png", "GOLU ICON", __A_WOOWZ)
ADD("source/specialforrandomsite/hackman.png", "HACKAMN", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/glitc.png", "GLITCH", __A_PAVEL + __A_IDK, undefined, true)
ADD("source/specialforrandomsite/wwwwwe.png", "-=-=-=-=-=-=-", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/ww.png", "Falsglat", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/we_know_you.png", "НН АЗИАТ", "НН АЗИАТ", undefined, true)
ADD("source/specialforrandomsite/vseh.png", "Вещь", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/uranus.png", "Уранус", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/uranus_megus.png", "Уранус++", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/Untitled1.gif", "He is coming, he wanted to talk", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/tresh.gif", "👁🐦", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/TASHELO.png", "😭", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/susun.png", "Lime", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/sun.png", "HAMMER SUN", __A_HADAY, undefined, true)
ADD("source/specialforrandomsite/strampro.png", "Bronze", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/smotr_nakazanie.png", "Смотреть накозание", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/scary.png", "Scary face", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/popa.png", "Squares LU", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/poshkal.png", "Poshkal", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/ppg.png", "PGP STEALER MOD WOKRSPHO", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/prikol.png", "I EATED", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/popa.gif", "КККККККККККККККККК", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/pisechnik.png", "Писечник", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/orange.png", "Большеносый", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/piss_ploho.png", "Убитая сука", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/pavka.png", "PAVEL-CREATURE", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/PAVEL.png", "Павел Писечник TV", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/orig.png", "orig", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/opengl.png", "DESMOS", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/my-pc.gif", "Oh no!!! MY PC!", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/mops.png", "M-O-P-S", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/minecraft-woowzcraft.png", "WoowzCraft", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/megadoff2.gif", "Python💩 Generated Sample 2", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/mabkrosm.png", "streetwe", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/le-Lego.png", "RABLOX", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/heartbeat.png", "СТАТИСТИКА СРАНОГО СПАНЧА", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/fireinthehole.png", "🔥", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/face.png", "Хлеборецз", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/ezgif-6-f8bd3b72aa.png", "Горшок", __A_ANONIM, undefined, true)
ADD("source/specialforrandomsite/0001-0120.gif", "Freestyle", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/e6222ea2-92f7-4005-a436-289a9370e03b.png", "1AI1", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/37171e31-de56-4637-a31c-8c0b1c0bd4db.png", "2AI2", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/drachyn.png", "Драчун", __A_WYLDI, undefined, true)
ADD("source/specialforrandomsite/download_cpy.gif", "ЧПУ токарный станок", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/error00000.png", "exception 0x000000", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/die.png", "⚰", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/cupi.png", "☕", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/comic.png", "COMIC.ai", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/cold.png", "❄", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/bg.png", "Le face", __A_PAVEL, undefined, true)
ADD("source/specialforrandomsite/brothan.png", "Я НЕ ВЫБРАН", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/bird_.png", "🐦💨", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/bird.png", "🐦", __A_WOOWZ, undefined, true)
ADD("source/specialforrandomsite/3dgifmaker20605.gif", "💥", __A_WOOWZ, undefined, true)
ADD("source/eyes.png", "🧽", __A_WOOWZ, "2025.06.11", true)
ADD("source/woowzengine/funny/21.png", "WoowzEngine OLD: №4", __A_WOOWZ, undefined, true)
ADD("source/woowzengine/funny/5.png", "WoowzEngine OLD: №3", __A_WOOWZ, undefined, true)
ADD("source/woowzengine/funny/22.png", "WoowzEngine OLD: №2", __A_WOOWZ, undefined, true)
ADD("source/woowzengine/funny/33.png", "WoowzEngine OLD: №1", __A_WOOWZ, undefined, true)
ADD("source/GOLUPREVIEW/7.png", "YT-OVERLAY №7", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/6.png", "YT-OVERLAY №6", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/5.png", "YT-OVERLAY №5", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/4.png", "YT-OVERLAY №4", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/3.png", "YT-OVERLAY №3", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/2.png", "YT-OVERLAY №2", __A_WOOWZ, "2026.04.13", true)
ADD("source/GOLUPREVIEW/1.png", "YT-OVERLAY №1", __A_WOOWZ, "2026.04.13", true)
ADD("YELLOW.png", "WoowzCore: №14", __A_WOOWZ)
ADD("PINK.png", "WoowzCore: №13", __A_WOOWZ)
ADD("LEVEL.png", "WoowzCore: №12", __A_WOOWZ)
ADD("GRAY.png", "WoowzEngine: №20", __A_WOOWZ)
ADD("BOTEXE.png", "BOT-Cat.exe", __A_WOOWZ)
ADD("WZEXE.png", "WZ-Cat.exe", __A_WOOWZ)
ADD("TRYAPKA.png", "Самая расчленяющая тряпка", __A_WOOWZ)
ADD("WIRE.png", "WoowzEngine: №19", __A_WOOWZ)
ADD("UNIT.png", "unit", __A_WOOWZ)
ADD("TRIANGLE.png", "WoowzEngine: №18", __A_WOOWZ)
ADD("TOXIC.png", "WoowzCore: №11", __A_WOOWZ)
ADD("FOLDER.png", "📁", __A_WOOWZ)
ADD("STREET.png", "WoowzCore: №10", __A_WOOWZ)
ADD("STOLB.png", "WoowzCore: №9", __A_WOOWZ)
ADD("SKY.png", "WoowzEngine: №17", __A_WOOWZ)
ADD("SAM.png", "WoowzCore: №8", __A_WOOWZ)
ADD("RND.png", toString(Math.random() * 100), __A_WOOWZ)
ADD("PNG.png", "png.png", __A_WOOWZ)
ADD("WWEXE.png", "WW-Cat.exe", __A_WOOWZ)
ADD("OUT.png", "Out of memory!", __A_ANONIM)
ADD("OLD.png", "old creature", __A_WOOWZ)
ADD("NG2.png", "💀", __A_WOOWZ)
ADD("CMO.png", "☃", __A_WYLDI)
ADD("NEXTBOT.png", "N E X T B O T", __A_WOOWZ)
ADD("RADIATION.png", "Нейтроны", __A_WOOWZ)
ADD("NO.png", "WoowzEngine: №16", __A_WOOWZ)
ADD("MINECRAFT.png", "BloodRaw", __A_WOOWZ + __A_IDK)
ADD("MEGA.png", "WoowzEngine: №15", __A_WOOWZ)
ADD("MATH2.png", "math2.", __A_WOOWZ)
ADD("MATH.png", "math.", __A_WOOWZ)
ADD("PURPLE.png", "WoowzCore: №7", __A_WOOWZ)
ADD("MUL.png", "WoowzCore: №6", __A_WOOWZ)
ADD("GOOGLE.png", "Google!", __A_WOOWZ)
ADD("LIK.png", "Ликвидирован❗", __A_WYLDI)
ADD("SPACE4.png", "WoowzEngine: №14", __A_WOOWZ)
ADD("SLOPE.png", "WoowzEngine: №13", __A_WOOWZ)
ADD("AIR.png", "___", __A_WOOWZ)
ADD("HOLY.png", "WoowzEngine: №12", __A_WOOWZ)
ADD("HAEXE.png", "HA-Cat.exe", __A_WOOWZ)
ADD("HOUSE.png", "BOMBOM WELCOME", __A_HADAY)
ADD("GREEN.png", "WoowzEngine: №11", __A_WOOWZ)
ADD("PAINT.png", "Look", __A_WOOWZ)
ADD("DANCE.gif", "Dance.blend", __A_WYLDI)
ADD("EXP.png", "Experiment", __A_WOOWZ)
ADD("MEF.png", "Mefedron ✂", __A_WOOWZ)
ADD("HOLE.png", "🕳", __A_WYLDI)
ADD("DYRILA.png", "DY-Cat.exe", __A_WOOWZ)
ADD("CLOWN.png", "WoowzCore: №5", __A_WOOWZ)
ADD("DIEGO.png", "Di Ego :)", __A_WOOWZ)
ADD("DAY.png", "Облик Дея", __A_HADAY)
ADD("DARK.png", "WoowzCore: №4", __A_WOOWZ)
ADD("SCHOL.png", "Школяра", __A_WOOWZ)
ADD("CRYBIRD.png", "cRYbIRD", __A_WYLDI)
ADD("CRASH.png", "Woowzcore 2 - Unity 6000.0.21f1_e2bacb8dee3a", __A_WOOWZ)
ADD("CIVIL.png", "WoowzCore: №3", __A_WOOWZ)
ADD("CHEL.png", "WoowzCore: №2", __A_WOOWZ)
ADD("PAEXE.png", "PA-Cat.exe", __A_WOOWZ)
ADD("CARS.png", "WoowzEngine: №10", __A_WOOWZ)
ADD("CAR.png", "WoowzEngine: №9", __A_WOOWZ)
ADD("STEAM.jpg", "Собака: ########", __A_WOOWZ)
ADD("TEAPOT.png", "WoowzEngine: №8", __A_WOOWZ)
ADD("BROKENZ.png", "WoowzEngine: №7", __A_WOOWZ)
ADD("BROKEN.png", "WoowzEngine: №6", __A_WOOWZ)
ADD("OBS.png", "OBS ANEKDOT feat sponge", __A_WOOWZ)
ADD("BOXES2.png", "WoowzEngine: №5", __A_WOOWZ)
ADD("BOXES.png", "WoowzEngine: №4", __A_WOOWZ)
ADD("SPACE3.png", "WoowzEngine: №3", __A_WOOWZ)
ADD("BEEXE.png", "BE-Cat.exe", __A_WOOWZ)
ADD("WC.png", "WoowzCore: №1", __A_WOOWZ)
ADD("ARAB2.png", "القطة مرتبكة", __A_WOOWZ)
ADD("SPACE2.png", "WoowzEngine: №2", __A_WOOWZ)
ADD("AD.png", "Брошюра", __A_WYLDI)
ADD("HIT.png", "ALPHA GLITCH", __A_WOOWZ)
ADD("SPACE.png", "WoowzEngine: №1", __A_WOOWZ)
ADD("WOOWZ.jpg", "🔺 TRIANGLE 🔻", __A_WOOWZ)
ADD("DARKSEMEN.png", "🎃", __A_WOOWZ)
ADD("REFLECT.png", "GLI-REFL", __A_WOOWZ)
ADD("SC.png", "Сукамбрия 8", __A_WYLDI)
ADD("ALBOM.png", "Альбом", __A_WOOWZ)
ADD("EHIDA.jpg", "Ехидное лицо", __A_WOOWZ)
ADD("CLOTH.png", "Натянул чучело", __A_WOOWZ)
ADD("NEUS.png", "Ransomware Virus Roblox PSA Was Found, Tom Has Been Terminated. Your anus benlanden", __A_WYLDI)
ADD("RED.png", "🟥", __A_WOOWZ)
ADD("GOLUWORLD.png", "PROJECT: GOLUWorld", __A_WOOWZ, "2026.03.04")
ADD("NAKED.png", "GOLU IS NOW NAKED", __A_WOOWZ, "2026.03.04")
ADD("NEGR.png", "я родила негретёнка милого", __A_WYLDI, "2026.03.04")
ADD("DIE.png", "undefined", __A_WYLDI)
ADD("NG.png", "Я обладатель PREMIUM GOLU!", __A_WYLDI)
ADD("BILO.png", "Не помню такое", __A_WYLDI)
ADD("MAP.png", "", __A_WOOWZ)
ADD("JINX2.png", "!GLOWING JINX", __A_WYLDI)
ADD("JINX.png", "GLOWING JINX", __A_WYLDI)
ADD("BLOCK.png", "APATIACATBLOCKRED", __A_WYLDI)
ADD("MATRI.png", "MATRIX (Оптоволокно)", __A_WYLDI)
ADD("WON.png", "You won!", __A_WYLDI)
ADD("MOD.png", "GOLU ISAAC PAVEL BASEMENT", __A_WOOWZ)
ADD("skin.png", "кожа", __A_WOOWZ)
ADD("4.png", "4", __A_WOOWZ)
ADD("STATUE.png", "Маячковая статуя", __A_WOOWZ)
ADD("NOTFRIEND.png", "Вы же помните? Они не друзья", __A_WOOWZ)
ADD("CASH.png", "Кошелёк", __A_WOOWZ)
ADD("SEXPRO.png", "SEX PRO MAX GOLU RIGHT NOW ANUS", __A_WYLDI)
ADD("FREE.png", "БЕСПЛАТНЫЕ СОСИСКИ", __A_WOOWZ, "2026.03.10")
ADD("PIST.png", "Твоё ебало после:", __A_WYLDI, "2026.03.11")
ADD("VELI.png", "Велосипед", __A_WOOWZ, "2026.03.24")
ADD("BG.png", "Desktop Free Wallpaper", __A_WOOWZ, "2026.03.26")
ADD("HELP.png", "ПОМОГИТЕ НАЙТИ ЧЕЛОВЕКА", __A_WYLDI)
ADD("SUN.png", "Безумное солнце", __A_WOOWZ)
ADD("DAUN.gif", "ДАУН", __A_WYLDI)
ADD("PRO.gif", "Добрый день!", __A_WOOWZ)
ADD("LAKE.png", "Чёрный пруд", __A_WOOWZ)
ADD("ARAB.png", "خطر بيولوجي", __A_WOOWZ)
ADD("COMMA.gif", "Он в коме? ☣", __A_WOOWZ)
ADD("DIA.jpg", "Побег", __A_WOOWZ)
ADD("7D.png", "VPN TUTOR.", __A_WYLDI)
ADD("POOP.png", "ОБНОВЛЕНИЕ ДЕРЬМА", __A_WYLDI)
ADD("FIRE.png", "Привет, я в огне? 🔥🔥🔥🔥🔥🔥", __A_WYLDI)
ADD("GORE2.jpg", "Я ВЫРВУ ТВОИ ОРГАНЫ ЧУВАК 😋", __A_WYLDI)
ADD("IP.png", "I.P.", __A_WYLDI)
ADD("PTIKA.png", "Сука где я...", __A_WYLDI)
ADD("NODU.png", "rjulf deklb yfgbcfk jltxce", __A_WOOWZ)
ADD("F.png", "F-FAST-FART-F", __A_WOOWZ)
ADD("MY.png", "Гнилозубый", __A_WOOWZ)
ADD("TALL.png", "канала попал чник", __A_WOOWZ)
ADD("PCI.png", "ПСИХИ", __A_WYLDI)
ADD("GOD.png", "DO YOU BELIEVE TO GOD?", __A_WOOWZ)
ADD("BLUE.png", "HUMUS homopenia", __A_WOOWZ + __A_IDK)
ADD("BROWN.png", "Contact", __A_WYLDI)
ADD("NOISE.gif", "N***Oi*iISIE**", __A_WYLDI)
ADD("FLP.png", ".flp", __A_WOOWZ)
ADD("GAME.png", "Minecraft - New Update", __A_WYLDI)
ADD("ORD.png", "Белый Спанч", __A_WYLDI)
ADD("P.png", "По?лянка", __A_WOOWZ)
ADD("SFD.png", "S-soup F-flight D-diarrhea", __A_WYLDI)
ADD("911.png", "Теракт", __A_WOOWZ)
ADD("GOLU.png", "God of Lithium Universe", __A_WYLDI)
ADD("ICONA.png", "ИКОНА \"GOLU\"", __A_WOOWZ)
ADD("TRAP.png", "Засудили суки", __A_WOOWZ)
ADD("LOGO.png", "Нарывать грыжу.exe", __A_WOOWZ)
ADD("WHAT.png", "Whatsapp3news.com", __A_WYLDI)
ADD("GMOD.png", "TE LE PA T", __A_WOOWZ)
ADD("WOWOZO.png", "Безумное солнце (не легенда)", __A_WOOWZ)
ADD("RFACE.png", "Лицо трупа", __A_WYLDI + __A_IDK)
ADD("GORE.png", "Eater", __A_WOOWZ)
ADD("GITHUB.png", "Неумодимовый мозгачара", __A_WOOWZ)
ADD("NOTODAY2.png", "🚫🔇🔕🚭📵🔞🚱🚳🚯🚷 №2", __A_WOOWZ)
ADD("NOTODAY.png", "🚫🔇🔕🚭📵🔞🚱🚳🚯🚷", __A_WOOWZ)
ADD("POZOR.png", "POZOR ТРЯПКИ", __A_WYLDI)
ADD("SEX.png", "Мать этой белки хочет секса с NASM!!!", __A_WYLDI)
ADD("GIME.png", "Дай мне свои глазки", __A_WOOWZ)
ADD("FREEJIT.png", "FREE ЛИЦ-ЛИЦУХА БЕСПЛАТНО VIRUS (ПРОДУКТ РАПУНЦЕЛЬ)", __A_WOOWZ)
ADD("nake.png", "Голый засранец", __A_WYLDI)
ADD("WYLDI.png", "Blue-Cat", __A_WYLDI)
ADD("CAT.png", "😁😁😁", __A_WOOWZ)
ADD("STOLBDANCE.gif", "Hia! TODAY we gona dance in pilar! 🤩", __A_WOOWZ)
ADD("minix.png", "Congratulations! You've received Premium GOLU!", __A_WOOWZ)
ADD("html.png", "&lt;html&gt;j1nx&lt;/html&gt;", __A_WYLDI)
ADD("spongetue.png", "Пошленкий спанчик", __A_WYLDI)
ADD("eye.png", "ОН ШОКИРОВАН, но чем?", __A_WYLDI)
ADD("eye2.png", "teToHell -> GateToHell", __A_WYLDI)
ADD("OPTIONS.png", "Options", __A_WYLDI)
ADD("sup.png", "MR WOOWZ ПОГИБ ИЗ ЗА СУПА 😭 ОТКЛЮЧЕНИЕ СВЕТА ЧЕРЕЗ 5 МИНУТ", __A_WYLDI)
ADD("tunel.png", "X-RAY GREN TUNEL", __A_WYLDI + __A_IDK)
ADD("horrorgame.png", "*CHANGED* Horror Game Preview", __A_WOOWZ)
ADD("BISNES.png", "Business", __A_WYLDI)
ADD("goblin.png", "G 0 B L I N", __A_WYLDI)
ADD("winland.png", "WIN7LAND", __A_WYLDI + __A_IDK)
ADD("black.png", "2nd new mega pro max super hd gamma ultra hyper giga update", __A_WYLDI)
ADD("semen.png", "Семеняй это 👆", __A_WOOWZ)
ADD("Belkatrah.png", "Belka NASM inside", __A_WOOWZ)
ADD("VIRUS.png", "-VIRUS FILE-", __A_WYLDI)
ADD("rotpc.png", "ROT-OS 8.2C (WINDOWS 7 СПАНЧ)", __A_WYLDI)
ADD("syka.png", "НЕВЕЖЕСТВО", __A_WYLDI)
ADD("teftel.png", "ТЕФТЕЛЯ", __A_WOOWZ)
ADD("test2.png", "FAT-FACE", __A_WOOWZ)
ADD("icon.gif", "⭐Ты просто чудо!⭐", __A_SYRNI)
ADD("beda.png", "Национальная дилема", __A_WYLDI)
ADD("gened.gif", "Python💩 Generated Sample", __A_WYLDI)
ADD("DAYFACE.png", "Have a nice day 😁", __A_WOOWZ)
ADD("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv.png", "cringe 🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄🙄", __A_WYLDI)
ADD("DEANON.png", "Deanon, thx wld", __A_WYLDI)
ADD("WOOWZCORE.png", "WoowzCore Teaser", __A_WOOWZ, "2025.12.15")
ADD("BLOD.png", "Bloody GOLU Ням-Ням 🦴", __A_WYLDI)
ADD("KILLSCREEN.png", "KILLSCREEN", __A_WOOWZ, "2026.04.02")
ADD("EBR.png", "PROJECT: ExtraBackrooms", __A_WOOWZ, "2026.04.15")
ADD("YTTITLE.png", "My YouTube ELTIT 👁‍👁‍", __A_WOOWZ)
ADD("tutorial.png", "NASM Tutorial №5021", __A_WOOWZ, "2025.06.04")
ADD("PIXI.png", "Pixel Art", __A_WOOWZ)
ADD("TD.jpg", "Треклятый тирдаун просто бомжара сраная", __A_WOOWZ, "2026.04.20")
ADD("AI-SLOP.png", "AI SLOP...", __A_WOOWZ, "2026.04.27")
ADD("MENYA-SOJRALA-SOBAKA-VO-SNE.png", "Меня сожрала собака во сне", __A_WOOWZ, "2026.06.06")
ADD("wtf-chto-ne-tak-s-obamoy.png", "это круто резонирует с моими нео-либертарианско фалангическими взгяладми!!!", __A_SKREP, "2026.06.07")
ADD("SKREP.png", "1C:Бухгалтерия TUTORIAL", __A_WOOWZ + " & " + __A_SKREP, "2026.06.12")
ADD("OSA.png", "10 УМНЫХ СЛОВ, КОТОРЫЕ ДОЛЖЕН ЗНАТЬ КАЖДЫЙ!", __A_WOOWZ, "2026.06.12")
ADD("YTAVA.png", "My YouTube Avatarka 😋😊", __A_WOOWZ)
ADD("ERROR.png", "ANGRY PIXI SPONGE ERROR FACE", __A_WOOWZ, "2026.06.26")
ADD("LEGACY.png", "Legacy corpse", __A_WOOWZ, "2026.06.26")

// ----------------------------------------------------------------------

function AddFullnessToTable(tabl, left, right){
	if(left  == null){left  = ""}
	if(right == null){right = ""}
	var result = []
	for(var str of tabl){
		result.push(left + str + right)
	}
	return result
}

function AddTableToTable(A,B){
	return A.concat(B);
}

function AddTables(...tables){
	var result = [];
	for (let t of tables){
		result = result.concat(t);
	}
	return result;
}

/*__________________________________________________________________________________________________*/

/* CMD команда на поиск файлов (пример, типа gif): dir /b /a-d *.gif    */

WoowzsiteSourceImagesPNG = AddFullnessToTable([
	"889288636829429760","about","anomaly-cat","arrowleft","arrowright","arrow_top","b","b2","background","background_","ban","bes1","bes2","bes3","bes4","bes5","bg","bloodeye","bloodeyeco_title","change","click",
	"CLOSETHIS","CLOSETHIS2","CLOSETHIS3","concrete","concrete2","copy","copy_to","createelement","dark","delete","dexonmusic","discord","discord_error","easylocation","error-image","error","eyes","fence-bg","fence",
	"fence2","files1","files2","files3","files4","file_chrome","file_folder","file_spyfolder","file_txt","fur","galka","hacker","hz2","hz3","hz4","hz5","icon1","icon2","icon3","image","info","jyrnal","left","line","line2",
	"locate","lupa","metal","microsoft_fly_simulator_epicepdiditonpps","newfolder","no-cat","nointernet","noway!!!","obsidian_bowl","open","openprojecttitle","options","p","paper","par","paste","pixel","plus",
	"plushover","position_end","position_end1","p_back","quare","rename","search","selectall","selectdinverse","selectdone","sky","smolarrow_bottom","smolarrow_right","smol_galka","sup","systems","teh","test",
	"title","title2","title3","title4","title_smol","vis","wcom","windowpluginfolders","windowpluginfolders_left","windowpluginfolders_right","woowz11","woowzengine","zakrep","transparent","transparent-dark",
	"transparent-red","transparent-green","transparent-blue","transparent-yellow","invisible","white","black","onerror","unknown","empty","watermelon","grid","wall","face","god","center","grid2","gradient",
	"GarrysMod", "emoji", "Backrooms", "Babina", "Glitch", "Coding", "YOUTUBE", "HalfSword", "History", "Music", "Blocked", "Roblox", "SFD", "HappyWheels", "Communication", "Minecraft",
	"WorldBox", "Single", "Teardown", "Star", "WoowzCore", "AI", "TBOI", "Deanon", "BrickRigs", "BeamNGDrive", "PtTR", "noi", "wip", "stream", "short", "Calendar", "Alarm", "goluworld",
	"mew", "real", "lost", "archive", "lc"
],"source/",".png")

WoowzsiteSourceRandomSite = AddTableToTable(AddTableToTable(AddFullnessToTable([
	"9311797.164999995_image","10056771.889999975_image","image_blender","IMG_20230618_013225","omg","Pngpng","ssasa","test-aubergine","cowsea","cowfly","spyder","paint","horse","skeleton","pz","fish","castale","spheres","cat",
	"doudou","rotten-meatball","mine","minecraft","random","hair-creeper","what_a_image","dymaite","face","bird","skull","worker","madnes","pisechnik","sryyounotsigma",
	"ww","TASHELO","semen_face","bird_","ezgif-6-f8bd3b72aa","1276962992096804986","scary","44534","35497833.15000008_image","td","219c52bbbdbdb58b76af2f21fd460602","cdisk",
	"created-my-own-generic-frutiger-aero-wallpaper-to-use-for-v0-5fb4uuthj49c1","rock_in_arms","pngimg.com - sun_PNG13446","monster18","armor4","interactive8","1poster1",
	"backrooms","ppg","0w2VKT0g","00000","123","2019-12-21_19.56.04 — копия","1154","2019-08-21_20.55.04","1161px-Unofficial_Windows_logo_variant_-_2002–2012_(Multicolored).svg",
	"5555555","3306277224886f6b8f6ce63f7a9f971e","913482723434311741","910352131280765018","890292477553168395","876783267200761907","873526346222010399","764146701153075241",
	"670607987815088150","adadadad","bd69a829ddb4-kopija-6","apng","cybertruck","cursors","4444","bassterts","brain","woowz_cloth","paint50","t","svit",
	"fa2dbcff49113b7c8882f3ae47c7edec-gigapixel-scale-4x","king","unknown-4","Tiles","Ножницы_ESTEL_Premier_для_точных_стрижек,_5.5_1","скрипт",
	"fullhd","cpu","1515838_ratf_bingus","869216194635374602","b9b_BUKC0ho","flushed_confused","gratis-png-basura-thumbnail","combined","angrcat",
	"goodproduct","m","sk","weirdcat","chicken","lab_prisedent","kuki","sun","IMG_6847","IMG_4842","hamer","human","dayface","minecraft-woowzcraft","bg","bg2",
	"uranus","uranus_megus","woowzers1","never","mr","pavka","papaga","mass","bro","brothan","chto","download_-_2024-09-22T163544","prikol","smotr_nakazanie","popa","glitc",
	"cold","die","cupi","fireinthehole","photo","orange","orig","susun","d0282a93507dbc8d526e841dab161320","zont_blokirator","catat","strampro","vseh","poshkal",
	"cat_kronzy","mine_semen","happy_cat","semen_that","god_lithium","licvidated","ads","mic","drachyn","7dasyts","вы пропустили звонок от Woowz11","pisshead",
	"fakereal","fish_","i'm only 1 year-old!","piss_ploho","error00000","ha-tot-samiy-mod","good-day","aqua-dog","again-real-of-fake","chika",
	"cacaat","omg..","out of memory!","squid","mabkrosm","worms revolution","daty","mine2","hororr","s","neighbor_dog","teftela","le-Lego","coockie",
	"PAVEL","e6222ea2-92f7-4005-a436-289a9370e03b","37171e31-de56-4637-a31c-8c0b1c0bd4db","horny","Z","brin","tttttttttt","tttt","wwwwwe","dla-slaboymnogo-normalno",
	"ass","Beispiel_System32_Ordner_mit_DLL_Dateie_2020-10-12-16-07-26","lob","heartbeat","real","opengl","hackman","mine-mine","comic","assembly",
	"img-GlWt4J","no","niga","pro","doudou2","think-about-this","reality","we_know_you","image0","kiki","mops","kill","passport","slon","giu","funny",
	"articat","mmmmm","foot","sex","broke","face-eater","spong","swing-in-java","BOMB-INSIDE","NAKED","c","dd","d","milo","gg","g","the-human",
	"ezgif-4f03bfb57d2e07","sex2","smartpeaple","250px-Marchingcubes-head","uq6RAqKN7KIyIRZIdzlxyQ8ZLmJ0gYg9LfHb6RMh8rFcLAIWwsFKFWax-qVU21guNwgF9mXN4CAlEq73hTvAs0M7"
],"source/specialforrandomsite/",".png"),AddFullnessToTable([
	"swag","whasapa2","hq720","images","8f5b846b77ca5e3d6cf4cae08416c31a","20250328_094038","A83-0825","tragedy-rule-v0-mb8il71vtqze1","rust-code-v1-040919",
	"7b49126e528b1035adb34f298249b589","everest_overview-3","THE_VOCIE_I_LOVE_IT"
],"source/specialforrandomsite/",".jpg")),AddFullnessToTable([
	"0AE7CCF4-4A80-4942-8D8C-E031CF3A68BE","bye","catblyat","orange-cat","screams","Sequence_01_1","sleep","who","who-are-you-cat","meevin-melvin","Clipchamp","energy","0001-0120","ez","fnaf-mewing",
	"1106463976809828372","dog","ezgif-3-8e481532df","BlueMarble_monthlies_animation","gckl_howler","мем","sxema-raboty-rektifikacionnoj-kolonny-foto","alha","v.03","31642.970","723831047925792818",
	"a_71d80d5021271963722772d663bdb5df-1-1","GIF 17.08.2020 19-25-55","gg1983e7f015","cat","teapottutor)))","moss","toletole","idiot","bear",
	"ai1","ai2","ai3","ai4","le_pedo","tresh","ezgif-5-8da35159bb","popa","horse","megadoff","megadoff2","megadoo33333","result","image0","explode-please",
	"woah","SPOILER_more","twitter_1895217911683522717","64ac0bf08aa29b4f","torch","ezgif-2-baf276abda","hyha","help-yeah","Lets_take_a_look_off","hotline-miami","c6j0PNI",
	"spongebob-walking","prosto-chydo","CgsUwNSl","you","yes","frog","xuL4tZV0R_VlZcdWIw_rsfpl57383PjBsLx3jTZt9bDf7BV68Px8dYJBsUWhtKUV3J2IO5GaML5hYmw__2BOC1E2","image1",
	"papa","sticker","emotion","semen_dead_body","you_megapocus","Untitled1","download_cpy","3dgifmaker20605","my-pc","zkHDHa8"
],"source/specialforrandomsite/",".gif"))

WoowzsiteSourceImagesJPG = AddFullnessToTable([
	"95","background_dexon","ble_backgro","brick","brick2","brick3","gradient","hi","ice","line","openprojectbackground","skeleto_message","test","tiles","WqIqAQzOsgc"
],"source/",".jpg")

WoowzsiteSourceImagesGIF = AddFullnessToTable([
	"download","esqueleto","fire","forest","gif","git","git2","null","null_bug","pet","s","vinil","welcome","wowzsearch","WTR6","loading"
],"source/",".gif")

WoowzsiteSourceIcons = AddFullnessToTable([
	"woowz11","click","text","woowzengine","q","cat","cube","ai-galery","none","dead","wcom","gear","a","terminal","cssjs","blank","folder","idk","search3","test","bloodeye_old",
	"ops","allblack","all","eye","dex","bloodeye","xxx","null","griffer","search2","search","skull","wsc","ww","wm_category","chrome","al","lu","whitesponge","myvideo"
],"source/",".ico")

WoowzsiteSourceCursors = AddFullnessToTable([
	"roblox","hit","cursor","woowz","hand","m","veryold","block","old2","old","cur2","cur","lit_cur","lit_cur_pointer","lit_cur_notallow","lit_cur_text","lit_grab"
],"source/",".cur")

WoowzsiteSourceVideos = AddTableToTable( AddFullnessToTable([
	"Download20","day","30513769.230000094_SPOILER_memphirs5a532a","Видео Папка","3DVideoDubstep - 382","ssstwitter.com_1722948103448","tumblr_s9un5nm1nT1zbpfgp_720.mp4","audio.destroy-7","sick","нигер в подгузнике",
	"h","d566d3e9f11dc8c11ff4828cdf1b4a6c","89f5e57c28f923f295f8c02bbace5285","078cad1fad3e10001b98cf573a8b756a","video_2024-10-19_17-47-26","VID_20230830_110751_370","The_Greatest_Burger_King_Facts__20231209_51_new",
	"SaveInsta.App_-_3170857346224613016","metwiixxd4f943","letychi_world1_2024-10-17-17-04-38_1729173878850","JhaWgqEz4FQP_2MH-1","lol_lmao","im_spongebob_roblox","get_gumped8008-20230523_100543-0B4EBF994C7BE6E0211B43557AA62981_video_dashinit",
	"fish","epic","catpop","can_i_win","tractor","kachok","car","bitch","911","corn","plant","titish_1","pis","YouCut_20240220_043324942","roblox_wrf","31","9b62d3b49f0f2dc5","480p",
	"iqNulmlawLOe_pBe","warning","bing_chiling","butterdog","cat_lanch","Casually_walk","HeGotTheMoves","Car2","236455969_118520010448014_8958250148816217856_n","rootbeer_goose","reality",
	"1_735_045_580_737","censoredspanch2_1","i be poppin b","saddest_video","mouse","scre","a_ranshe_ti_skazat_ne_mog","simpsones","vid1","vid2","vid3",
	"bolgarkoi_po_mikro","bobmroerodoicrodocodilo","doctor-where-dog","0227","4ca13369a7ee255b82c22ed4eb808057","modded-modded-minecraft","iamrigbycat_2025-02-23-01-13-33_1740255213401",
	"hyricane","video-217916743_456248659-1080","Hold_on_my_bad_let_me_wipe_some_shit_off","8d58c43177132db2","e12a785b25f51d68","CblH_CyTeHePa.mp4","mfzktrxshaffa5c",
	"4013a8098ec8d11c48507fceb1dc164e","round_2025-02-22_14-37-16","wewewe","Touch that thang n it’ll explode","VID_20250324_162427_266","7767167994467_1","Hour",
	"VID_20240920_091136_169","VID_20240831_124633_331","Ce3nlNsYVross4Of.mov","video_2024-08-30_00-39-33","89355f399e8b6ce2","7022843660899","SPOILER_video_2024-11-30_20-04-30",
	"a13683105540c28a","video_2024-12-03_00-53-42","winir","postthis","fly","horse","the-chewer-chew","forsaken gameplay","memeee","spongebob-spongebob-meme",
	"79","fDyo4gl","ia-slomay-tebe-palchiki","RDT_20250612_112251","shadertoy","Джоник_Македонский_Слушай_ты_хакер_Миша_из_Питера_Russian_dubbed","novoe-intro-marmoka1",
	"Download_3","shrimp_on_sale_at_this_hour..._how_convenient...","happy_birthday","L7hiUXI","a33c89b456d29dff2d2dd023123f011be626d2ae6fd92f5d5adca64d62ee668e_1",
	"RDT_20250817_000441", "ponanas", "rapidsave.com_only_guys_can_do_this-ryoy1kakorgb1", "5547f56cddf550d"
],"source/specialforrandomsite/",".mp4"), AddFullnessToTable([
	"ssstik.io_illegalbugtrader_1725631254849","LGqqu1KcC9ZCLiN7","IE28099m20the20dog20on20the20first20slide","egg","air_strike","6uENJ1JOvxyX6mzZ","staris-tiktoke","shutip","ser_na_zemly","ptita",
	"oh_my_god","4949701782008910617","cachedVideo","123456789","1BE3B84A-3023-41B4-9CA0-331F29246BA0"
],"source/specialforrandomsite/mov/",".mov"))

WoowzsiteSourceAudios = AddTableToTable(AddTableToTable(AddTableToTable(AddFullnessToTable([
	"ВЫЙТИ НА УЛИЦУ ТАМ ЙОБАНЫ ЛОС","spongebob-asking-are-you-pooping-made-with","Morning-Flower","s","Cheetahmen","Toilet-story","Mr. Trololo original upload","idiotic music","otkroi-glazki",
	"寻梦高粱红","Qahwah.Bootleg (feat. ilyhiryu)","gabber.bootleg","spo","what-the-song1","what-the-song2","what-the-song3","It's PINEAPPLE piizza tami(1)","28_M_Necro","NO",
	"TROLL_HIT_4","cringe-music","В лесу под ёлкой сидит белячья тварь,","моя песня стоит денег","дей злая обезьяна, он делает карты в ham","Привет снова",
	"Мир, Ти Лито, ты хороший актер. Продолжа","Вувз-реактор - редкий вид Вувза, делающе","WoowzMegaHit","Ебись, Сраный Спанч, из мяса и боли,","Куплет 1",
	"Сраный Спанч дал мне молоток — не грусти","Я думал, что это прикол,","Шёл Сраный Спанч по земле грешной,", "f5a28bef9f2a712", "pern"
],"source/specialforrandomsite/",".mp3"), AddFullnessToTable([
	"doom","Schoolhouse_Trouble_Metal_Version","Pixelizer","sun","babah","The Daniel Pemberton TV Orchestra - The Orb Of Dreamers","forest","button","bass","dentist","open",
	"Error", "Ring1", "Ring2", "Ring3", "Ring4", "Ring5", "Ring6", "Ring7"
],"source/",".mp3")),[
	"source/woowzbackrooms/sounds/breath.mp3","source/woowzbackrooms/sounds/level0.mp3","source/woowzbackrooms/sounds/walk.mp3"
]), AddFullnessToTable([
	"ᓚᘏᗢ_ЖИ_ОШз!!!999___","Я ХОЧУ СТАТЬ ИГРОЙ","Я — текстура","Я — твоя замена","Я — Woowz11, я пришёл с костылём, ","СПАНЧ В ДУБАЙСКЕ","СОСИ ЗА МНОЙ СЛОВО ПОСЛЕДНЕЕ УРОД","Помнишь, Woowz_",
	"Моя песня стоит денег 2","ИИ ПОД ПЯТКОЙ GOLU","Запускаю .java, без GUI, без HUD, ","Желудь Ethernet Печенье","Дей — злая обезьяна 2 (Танцуй, маппер!)","Верните меня в движок",
	"В начале был БАГ. Не код. Не свет. ","Анимация без конца","WZZK.Zzq-жжж₽₽₽()__!","v1d3C@ll.z0v.k0RR","QX7_Gl!t¢h°Dyn4mix","+Silent Hallways+","ПИИИИИИП—КРРР—ПИИИ—ВУЛДИ... ВОЙНА НАЧАЛ",
	"+Echoes of Poolrooms+","+Echoes of Poolrooms alt+","Белка на NASM","Загрузка GOS","Байт, восстань!"
],"source/specialforrandomsite/ai_music_hits_pro/", ".mp3"))

WoowzcoreMusics = AddFullnessToTable([
	"Avith Ortega - Dopamine for Her Professing - Edit","Avith Ortega - Leisure Time","EDARUMA - Recent Past","fadinglight - company","Glwzbll - GLW2000","latex fruit - Loveme2",
	"Lemon Demon - Brodyquest","Seamoon - Six Synergies","Spatial Manufacture Ltd.","t e l e p a t h - track","Visonia - The Amethyst City","Visonia - The Moon Doesn't Want to Look at You",
	"rodr1se - Hardstyle Drill 2009","Rory in early 20s - track","t e l e p a t h - track 2","t e l e p a t h - track 3","t e l e p a t h - track 4","T.G.T.B. - Derelict","Seamoon - Six Synergies",
	"M4 Vaporwave - Murderer Star","mayten - self reflection","Nmesh - track","Oliver Buckland - espial","Oneheart - snowfall","permskiy krai - The Virus","Polligopkalo - bloodyangel.mp666",
	"crossing bridges - Deep Under the Surface of Level 7","Cult Member - The Ravedeath Still Hurts","DJ DR4GM4SHROOM - INTERN3T EXPLOR3R","FM Skyline - body_texture render","FM Skyline - Harlequin","Harold Budd - LAventure","KISYZ - Six Forty Seven",
	"Wayne Hill - Left Bank Two (Vision On Gallery Theme)","Whitewoods - Beat Street","Xxtarlit","yandere - dreamcore","Ray Lynch","alone land","Constant Smiles - Restlessness (I Dont Sleep Well)",
	"Pathetic - escalator","Piers Baron - The Last Night on Earth","Rory in early 20s - track 2","rvfzme - Char","Snow Strippers - Fantasy","Snow Strippers - Wont Be Back Again","VHS Logos - Sony",
	"Noisemaker - Magna Aliqua","Oliver Buckland - vacillate","Betatrip - useless","dxnrm - why i'm here","Lustre - Let Go Like Leaves of Fall","Marc Acardipane - Return to Zero Beztebya","Mietze Conte - d(-_-)b dreaming of your latte art d(-_-)b",
	"Viselnik - Dying Nature","ZanZiglatore","Avith Ortega - Betrayal","Dargaard - Thy Fleeing Time","Green-House - Xylem","Molina - Hey Kids","Nmesh - track 2",
	"naran ratan - Forevertime Journeys II","Oliver Buckland - backroom labyrinth","Oliver Buckland - Dead God Graveyard","Raymond Scott - Portofino 2","Robin Guthrie - Imperial","Sacre - An Ending (Arena Tv Series)","Ssaliva - Arrow",
	"Dottie Evans - Tonight You Belong to Me","dxnrm - restless dreams","Grouper - Poison Tree","Kero Kero Bonito - I'd Rather Sleep","Lifeformed - Undiscovery","Lustre - Petrichor","Mild High Club - Homage",
	"Art Fact - Whom Are You Dancing For_","crossing bridges - Lighters","crossing bridges - WaterWorld43","CXRGI - weeping (Slowed)",
	"special/oldebr_music_0","special/oldebr_music_1","special/oldebr_music_2","special/oldebr_music_3","special/oldebr_music_4","special/oldebr_music_5","special/woowzcore_music",
	"stvrshine - Constant Anxiety","TPFL - track","VAPERROR - Start Up","Yabujin - CHALICE OF MIND","LobotomyCorporation OST  - Second Warning",
	"Mega Degrod - Xleepy","myxtica - Old Doll (out of tune) (slowed)","Paavoharju - Valo tihkuu kaiken lapi","Saul Stokes - Spirit Control","stvrshine - At the Speed of Light",
	"Saul Stokes - The Telecine Ensemble","Blod Besvimelse - Misanthrop","Cult Member - U Weren't Here I Really Miss You","DXXDLY - Eerie","Mega Degrod - Athoth a go!! go!!!",
	"Dargaard - The Infinite","Pye Corner Audio - Hollow Earth","Saul Stokes - Intra-Fantasy"
],"source/woowzcore/musics/",".mp3")

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

WoowzEngineWiki = AddFullnessToTable([
	"Icon.ico"
], "WoowzEngine/", "");

WoowzsiteSourceDiscordAvatars = AddTableToTable(AddFullnessToTable([
	"fom","aleks_cherri","apdown1533","arab2827","artyomrus","aspa102","bacteriahowler","baranki135","beryks","blue.fox.","cadaver9599","cool.so.sandwich","cyberpaul_red.","deerrus","dermuaress","dexony","dragolite_17",
	"dragonlordxxx","drom6906","faserredeve","fawdot","fordongreeman048","gaips","gemingtv","gero1n41k","glados1358","goni0052","gyg9600","hachumakentosh","hiking702","iamscienceman","iwannasleepinyourbed","jacket48",
	"justgamingyt5949","kasqw","kastikepussukka","kersher","kirk1448","klaverr","kotyara228","kseleron","lisstons","lomakinnn","mannytko","meeee66","metallcore999","monsterfish._","ne1grox","morphandriy","morzz1c",
	"myleskingston","nekitplay155","neoprod","no","pacocareal","pavkalakar","pussyfapper","redsham","rodrigesgames","ruslanconnection","sadsalat","santinnel","shiir0k","styledun","sv1t.","taykeu","the0ceanman",
	"thewindowskerpka","treepii24","troll_bebra","turbobtv","uzelezz","wantedrobot","wldoui","woowz11.","woowz11","xyzswagga","your_local_russian","youwillseelowskill","zebratv","zinderant","zooi","zvski",
	"brigadir_","mrgun_","primorskiy_","ruddi","sleepingman","odex64","xx_beamcrash_xx","darkus2","rnswt_offical","4ro9ito","kek_kek_kek_","bombom228","ilya_nextbot", "idk/spectra"
],"source/discordavatars/",".png"),AddFullnessToTable([
	"nberbaaaaaaa","brinq_","haveaniceday.","uranus52"
],"source/discordavatars/",".gif"))

GitExplorerSource = AddTableToTable(AddTableToTable(AddFullnessToTable([
	"folder","file","file_unknown","folder_unknown","image_png","image_jpg","image_bmp","image_tga",
	"image_tif","image_ico","image_cur","image_dds","image_pdn","image_psd","file_gitignore","file_vcxproj","file_exe",
	"file_bat","file_com","file_msc","file_scr","file_suo","script_java","script_c","license","background","file_empty","file_byte","file_txt",
	"script_cpp","script_py","script_asm","file_log","file_md","script_lua","readme","script_h","script_js",
	"file_txt_utf8","file_tlog","file_rtf","image_hdr"
],"ge/",".png"),AddFullnessToTable([
	"image_gif.gif","script.png","sliders.png","vs.png","java.png","c.png","emoji.png","cpp.png","py.png","file_project.png","processor.png",
	"image_apng.png","image_apng.gif","lua.png","book.png","note.png","js.png"
],"ge/pdn/cache/","")),[
	"ge/image_gif.gif","ge/image_apng.gif"
])

WoowzsiteSourceCats = AddFullnessToTable([
	"cat1","cat10","cat10_1","cat10_2","cat10_3","cat10_4","cat10_5","cat11","cat11_1","cat11_2","cat11_3","cat11_4","cat11_5","cat12","cat12_1","cat12_2","cat12_3","cat12_4","cat12_5","cat13","cat13_1","cat13_2",
	"cat13_3","cat13_4","cat13_5","cat14","cat14_1","cat14_2","cat14_3","cat14_4","cat14_5","cat15","cat15_1","cat15_2","cat15_3","cat15_4","cat15_5","cat16","cat16_1","cat16_2","cat16_3","cat16_4","cat16_5","cat17",
	"cat17_1","cat17_2","cat17_3","cat17_4","cat17_5","cat18","cat18_1","cat18_2","cat18_3","cat18_4","cat18_5","cat1_1","cat1_2","cat1_3","cat1_4","cat1_5","cat2","cat2_1","cat2_2","cat2_3","cat2_4","cat2_5",
	"cat3","cat3_1","cat3_2","cat3_3","cat3_4","cat3_5","cat4","cat4_1","cat4_2","cat4_3","cat4_4","cat4_5","cat5","cat5_1","cat5_2","cat5_3","cat5_4","cat5_5","cat6","cat6_1","cat6_2","cat6_3","cat6_4","cat6_5",
	"cat7","cat7_1","cat7_2","cat7_3","cat7_4","cat7_5","cat8","cat8_1","cat8_2","cat8_3","cat8_4","cat8_5","cat9","cat9_1","cat9_2","cat9_3","cat9_4","cat9_5",
	"cat19","cat19_1","cat19_2","cat19_3","cat19_4","cat19_5",
],"source/cats/",".png")

LithiumArts = AddTableToTable(AddTableToTable(AddFullnessToTable([
	"funny-cat","minecraft","semen-that","golu","crybird","licvidated","old","cat_pavela","diego218","experement-alpha-327x800","lol","math...","this_folder","neutrons",
	"MATH_ORIG","png","woowz99","paveloMandeloBBCemogus","Have_a_nice_day","seses","pisdim_bistreeeeee","egegeggege","teftela","ogowg","day","gmod","me","yyryeer",
	"onRugnulsaMatom2","imaaaaage","bibli","NGkot4","nextbot-cave","657284466db79036","d3a4b712992d84fa","jj","kot5","woowzbot","---","epic-story-mefedrona",
	"ng-novigod","--","arab_cat","beryx.exe","ii","garrys_modes","unit","dyrila","wow","bubus_babas","mo","mega_spanch","holy","sky","cars","green",
	"image2222222","broken-z","car-r","broken","boxes","boxes-colors","wirevrames","3333","itchio","again","big-boom","triangles","samodeanon","cheliki",
	"crash","bako","mans","mans-2","domik-kloynow","street","toxic","dark","stolbs","cilizilation2","out of memory!","mine2","bro","dayface","ads","hamer",
	"random","woowz_cloth","ESCHKERE","icon","test2","god_icone","image","image-syka","Matrix","god-fire"
],"art/",".png"),
AddFullnessToTable([
	"video-217916743_456248659-1080_corrupted3","kiki","ezgif-3-8c447d00bf_2-ezgif.com-resize","le-gifa"
],"art/",".gif")),
AddFullnessToTable([
	"channel_banner.jpg","kot4vostanovlenniy.jpg","c97196394a4d48595ccd4521266fa03477f165bc_full.jpg","2d2595b7dac4cc61.jpg","20250318164446_2.jpg","part2.webp"
],"art/",""));

WoowzsiteSourceBloodeyeSystems = AddFullnessToTable([
	"bloodeye_system","bloodeye_system_2_screen","bloodeye_system_3d","bloodeye_system_screen","bloodeye_system2","bloodeye_system2_3d","bloodeye_system3","bloodeye_system3_3d","boxtexture","boxtexture_3d",
],"source/bloodeyesystems/",".png");

WoowzsiteSourceCorruptedMinecraft = AddFullnessToTable([
	"bg","bg1","bg2",
],"corrupted_minecraft/",".png");

WoowzsiteLituism = AddTableToTable(AddFullnessToTable([
	"bg","left-right","space","title","title_hover","title_text","title_text_hover","fotter","sponge","sponge_photo","bg2","crybird","bg3","bg4","bg5","bg6","bg7","bg8","bg9",
	"bg10"
],"Lituism/",".png"),
AddFullnessToTable([
	"crybird-theme"
],"Lituism/",".mp3"));

WoowzsiteSourceWoowzcore = AddFullnessToTable([
	"version1","version2","version2console","version2mainmenu","version3","version3mainmenu","version3nevada","version3todo","version4","version4mainmenu","version4todo","version5","version5mainmenu","version5seedworld","version5todo"
],"woowzcore/source/",".png");

WoowzsiteSourceAlchemy = AddTableToTable(AddFullnessToTable([
	"dev","пу","по","разница","тьма","э","т","д","космологическая_сингулярность","гравитация_квантовая","бозон_x","бозон_y","кварк","лептон","бозон_z","бозон_w","бозон_хиггса","глюон","фотон","свет","гравитон","гравитация",
	"протон","кварк_s","кварк_u","античаст","част","адрон","кварк_d","кварк_c","кварк_t","кварк_b","нейт","нуклон","вещество","водород","космос","тёммат","вода","з","воздух","электронное_нейтрино","мюонное_нейтрино",
	"таулепт","мюон","sphere","that_end","that_end2","жидкость","газ","гелий","литий","бериллий","бор","углерод","азот","кислород","фтор","неон","натрий","магний","пар","лёд","тг","тх","снежинка","снег","грязь","глина",
	"кирпич","керамика","обсидиан","камень","облако","электр","метан","уггаз","ксенон","криптон","аргон","стена","озон","рад","кратер","эм","в","аккум","хлор","алюм",
	"крем","фосфор","сера","алмаз","бог","уголь","поле","лужа","песок","мультивселенная","оазис","пляж","пустыня","мир","стекло","ад","рай","вувз_алхимия","конец_света","чистилище",
	"религия","симуляция","сатана","сат"
],"alchemy/",".png"),AddFullnessToTable([
	"большой_взрыв","атом","мол","бож","взрыв","эл","таунейт","о","взрыв_ядерный","магма","лава","пла","ветер","аеро","движение","вулкан","пыль","пожар","песчанная_буря"
],"alchemy/",".gif"));

WoowzsiteSourceLituism = AddFullnessToTable([
	"purple","yellow","level","dark_purple","dark"
],"source/lituism/",".png");

GOLUPREVIEW = AddFullnessToTable([
	"1","2","3","4","5","6","7"
], "source/GOLUPREVIEW/", ".png");

WoowzsiteSourceCore = AddTableToTable(AddFullnessToTable([
	"ants","bath_oil_pearls","beer","bg","button","dice","husky","spider_crab","teeth","chess","poison","trash_can","nokia","error","dark","rainbow_tiles","color-tunel","web","melted-dvd","w","face","cheese_mouse","eye",
	"ie","biohazard","emo_scene_rave_rainbow_smiley","molted","balls","weird","ballons","0_0","rabbit",
	"luck","google","icons","media","spore","waterdrop","dymaite","meat","cubemap","(","glass_dog","hart",
	"4d","cybersport","papa","papapa","window"
],"core-wiki/source/",".png"),AddTableToTable(AddFullnessToTable([
	"200w","3demail21","acid","ametist","atom1","back","ball","basement","bg","bingus","bubbles","cat-gift","cat","cat_skateboard","cd-rom","centipede","centipede_face","chrome_mans","console","cyclon",
	"dancing_cat","dark_eye","dark_eye_pyramid","dice_white","donut","dream","email6","emerald","envelope","equalizer","error","face","fish","flame","flowers","godzilla","going_to_hell","got_mail","grapher",
	"guitar","gummy_simulation","hampsters","hand","happy","horse","house_centipede","idk","int","internet_party","kiri","live_metal","mac","mail","monky","monster","moon","movie","nails","new1","pc","phones",
	"police","pyramid","pyramids2","radar","rainbow_gold","red","red_tiles","robot","robot_music","roses","rotglobe","screw","scrollmail","sea","seastar","set_water","sickness","siren","smallerskull","smiling",
	"smoking-skull","speker","spider-password","spiralition","spotting","star","stars","sword","target","teddy","teeth","teeth_sphere","teeth_sphere2","teeth_weel","text_scroll","trash","under_construction",
	"updated","washing_maching","wave","windows_95_error","windows_cockroach","worm","yes","you_are_an_idiot","xp-cat","ie","rainbow_gold2","exclamation","800x600","glitter","rainbow","kiss",
	"ipod","fish_tv","globe","xp","folder","media-player","old_laptop","waveform","player_free","player","star_tiny","camera","feather","pink","earth","wireframe","illusion","windows_ripples","orange-cat","dot-cat","two-cats",
	"yellow-cat","bys","yhti-cat","cat-license","cat-3d","m","e","o","w","i-love-cats","cat-pixel","govno","eXPerience","mail-wrame","chine-internet-explorer","blue-death-screen","dolphin","swirl","mega_worm","dead_body",
	"poison_3d","green_ipod","lucky","color","i-love-pc","spider","pinch","centipede_dance","fat-animal","emo-stars","melt","fat_star","hardcore_happinies","stars_on_black_background",
	"rave","rave2","do-I-bug-you","rave_citty","ballon-face","football","feather2","robot-dog","mario_star","pills","instagram","cursor_heart","poolroom","download","cringe-folder","skeleton-war","skeleton","cybergoth",
	"biohazard","herobrine-fan","flying-pig","matrix","real-spider","weed","skeleton_coffin","red-skull","tf-heart","rainbow-pixels","pills-3d","cool-kids-club","disturbing","refresh","heart","prikol","eyes_sphere",
	"mouths_sphere","cylinder","fondoestrellas","boxemail","selada1","dollarspindownd","scorpion","PS2_Online_-_cheathack","n","email","volver","numerosamarilloswwwpercysstkyt0","fondomatrix","SKULLSPIN",
	"vsim0039","guita","skull3d","skulburn2","fondocalaca","img6","welcome","diskette","back-roll","fire","aar013","aar014",
	"picture","leafzoom","hack","mail2","icono-lenguita","i1","dance","obras04","yen5","calfn28","img8","warning2",
	"madhack","calfn18","skelettfuck","pentagrama","counterfast","email2","hdd","mail-eat","Email10","icon-anim","smooool-skull","gamehack",
	"linball1","calaca","s","explose","roversp6","const010","broadcasttower1","woowzcore-codding","pyramide","lex","microshaft","new2",
	"sang","computer","computer_surfing_md_clr","COMPUTER_EMAILMEANIM-vi","Computer-wtf","computer-icon","old-computer","kelip","cmpterhpymed_w","computer002","lavori03","computer6",
	"rotating_computer","Computer-fireball","computer-files","tux_computer_dig_md_clr","computervirusblkonly","galeria","music_note_jamming_md_clr","an_painter","hamwalk","also-computer","computer-face","LennyVasbinderPI_The_Big_Eye_Computer",
	"Howyourcomputerworks","hummingbirds2","happycomp","whitepersanrun","computer-heart","computer5","computer-epic","animated_computer_3","computerdog","business_secretary_computer_typing_md_wht","computer2","click_001",
	"computer2-afk","bearBLKmoving","dnce","a-fondo-flaming-mpr","anmplnet","3cte1dee","pingu","bibites","image480","face_anm","netnow_ani","netwheel",
	"star1","hands","fan","ike","botaoazul","star2","globe2","network_button_next","star3","yousefnet","usflagwav","contruck",
	"WebNet","dolares","legflamefinal","worm_gear_aple","polibarr","bball2","star_0012","jingo","aniflowericon","coracao05","barmove","mol",
	"presweb","star_0001","netcaexplo","hot","mline","newgirando","netscf","globe3","planet7","Windows95","7shadow","7previousblk",
	"cross7","lightening7","bookani","madewithlove7","night7","a5","7","piano","floppy_disk_walking_md_wht","checkerflagwave","image001","madegifblue",
	"imp005.gif","internetexporgif","a_ilst168","AN385","INTERNET","pistons","gallop","casino2","freestuff2","RotatingMoonMoticon","smuprota","download-gif",
	"comp3","fish-paint","wallet","tpup","azball","Internet_construction","msinternet","internetfiesta120","wpaa79d628","animoon_e0","churro","newspaper",
	"animail03","update","InternetLogo","ANISIAMESELAYING","psp","bpmonst","walk","foefilm","maths","phone","Internet2","electrogush2",
	"slinky","bienbenido_a_mi_sit_en_internet","nota","hands2","chat","eyes","emojis","run","pet",
	"glitch","rainbow_stars","z","scary","duck","bobls","sad","spiral","comics","eye","prismarine","eye_dark",
	"wavy","screw2","smarties","opengl","radiation","hippo","wavyhand","cat_monitor","wavyglitch","phone_pink",
	"vampire","icecream","wavypc","gem","gem_heart","sea_bottom","eyes_blue","bath","login","pc_burn",
	"sad_normal","emoticon","glitch_wavy","distortion","tv","static","trash_sad","itch","pizza","fuck",
	"error_glitch","mod","browser","files_xp_3d_model_epic_name","mspaint","window","spam","polygon",
	"he_walkin","crystal-skull","computer-broken","wow","a_ia_vishy_chto_tam_smile","jewel","bobl",
	"gem_prism","blob","cloud","orb","diagram","circle","freaky","cube","nasral","marble","atomic",
	"cube_smooth","chars","portal","gem_spikey","kitty","iraslav_babsik","do_youuuu_know_the_mushroom",
	"render","yshas","weird","eyes_spiral","eye_God","eyeball","couch","effect","pc-icon","fractal",
	"triangle_illusino","thing","glint","rainbow_spiral","fraclatekrl","abstract","effeckt","fond",
	"art","sepsep"
],"core-wiki/source/",".gif"),AddFullnessToTable([
	"vaporwave","catbackground","accept_christ"
],"core-wiki/source/",".jpg")));

WoowzsiteSourceBloodraw = AddFullnessToTable([
	"dirt.png","iconblock.ico","logo.png","cubemap.png","test-skin.png","test-skin-2.png","button.png","button_hover.png","button_disabled.png","font.png","updatepainting.png","og.png",
	"checkbox.png","checkbox_checked.png","checkbox_hover.png","checkbox_hover_checked.png","ico_forge.png","ico_optifine.png","area.png","area_hover.png", "button_selected.png",
	"dead.png"
],"BloodRaw/Source/","");

BloodrawSkinEditorBody = AddFullnessToTable([
	"Обычное телоlСамое обычное телосложение"
],"BloodRaw/Source/Skin/body/",".png");

BloodrawSkinEditorBoots = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/boots/",".png");

BloodrawSkinEditorCloths = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/cloths/",".png");

BloodrawSkinEditorHats = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/hats/",".png");

BloodrawSkinEditorLowerdecor = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/lowerdecor/",".png");

BloodrawSkinEditorMask = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/mask/",".png");

BloodrawSkinEditorPants = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/pants/",".png");

BloodrawSkinEditorHairs = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/hairs/",".png");

BloodrawSkinEditorTattoo = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/tattoo/",".png");

BloodrawSkinEditorUnderpants = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/underpants/",".png");

BloodrawSkinEditorUpperdecor = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/upperdecor/",".png");

BloodrawSkinEditorGradientsSkins = AddFullnessToTable([
	"Светлый"
],"BloodRaw/Source/Skin/gradients/skins/",".png");

BloodrawSkinEditorGradientsHairs = AddFullnessToTable([
	
],"BloodRaw/Source/Skin/gradients/skins/",".png");

/*__________________________________________________________________________________________________*/

function GetAllWoowzsite(){
	return AddTables(
		WoowzsiteSourceImagesPNG,
		WoowzsiteSourceImagesJPG,
		WoowzsiteSourceImagesGIF,
		WoowzsiteSourceDiscordAvatars,
		WoowzsiteSourceWoowzengine,
		WoowzsiteSourceWldouiBackrooms,
		WoowzsiteSourceCats,
		WoowzsiteSourceBloodraw,
		WoowzsiteSourceRandomSite,
		WoowzsiteSourceBloodeyeSystems,
		WoowzsiteSourceCore,
		WoowzsiteSourceIcons,
		WoowzsiteSourceCorruptedMinecraft,
		WoowzsiteSourceAlchemy,
		GetAllBloodrawSkinEditor(),
		GitExplorerSource,
		WoowzsiteLituism,
		WoowzsiteSourceWoowzcore,
		WoowzEngineWiki,
		LithiumArts,
		GOLUPREVIEW,
		WoowzsiteSourceLituism,
		TrueLithuismArts
	);
}

function GetAllWoowzsiteAudios(){
	return AddTableToTable(
		WoowzsiteSourceAudios,
		WoowzcoreMusics
	);
}

function GetAllBloodrawSkinEditor(){
	return AddTables(
		BloodrawSkinEditorBody,
		BloodrawSkinEditorBoots,
		BloodrawSkinEditorCloths,
		BloodrawSkinEditorHats,
		BloodrawSkinEditorLowerdecor,
		BloodrawSkinEditorMask,
		BloodrawSkinEditorPants,
		BloodrawSkinEditorHairs,
		BloodrawSkinEditorTattoo,
		BloodrawSkinEditorUnderpants,
		BloodrawSkinEditorGradientsHairs,
		BloodrawSkinEditorGradientsSkins,
		BloodrawSkinEditorUpperdecor
	);
}

function GetAllWoowzsiteImages(){
	var tabl = GetAllWoowzsite();
	var result = [];
	for(var src of tabl){
		src = src.toLowerCase();
		if(src.includes(".png") || src.includes(".jpg") || src.includes(".jpeg") || src.includes(".gif") || src.includes(".webp")){
			result.push(src);
		}
	}
	return result;
}

function GetAllWoowzsiteIcons(){
	var tabl = GetAllWoowzsite();
	var result = [];
	for(var src of tabl){
		src = src.toLowerCase();
		if(src.includes(".ico")){
			result.push(src);
		}
	}
	return result;
}

/*__________________________________________________________________________________________________*/

WoowzsiteSourceFonts = AddTableToTable(AddFullnessToTable([
	"minecraft.ttf","Comfortaa.ttf","inkverse.ttf","topor.otf","concrete.otf","Kantsler Fraktur.ttf"
],"source/",""),[
	"BloodRaw/Source/minecraft.ttf", "BloodRaw/Source/minecraft-color.ttf"
])

WoowzsiteWords = ["растворился","арбуз","пёрни","тротил","шуруп","сообщение","mail","got","idiot","java","python","c#","cpp","lua","фотон","солнце","немцы","сок","жвачка","курица","петух","трамп","байден","обама","вино",
"бакал","байкал","мазут","копро","гидро-педро-метро","морж","сок","у","тебя","дома","цезий","плутон","нептуний","уран","гачимучи","выигрыш","победа","геолокация","координаты","пердёж","цена","негра","за","много","мало",
"весит","цветное","серое","канализация","воняет","левокумское","самара","нерехта","бетон","цемент","камень","рублей","500","долларов","загрузка","🚽","туалет","унитаз","бутылка","документ","алкаш","капец","не","найдено",
"аэс","автомобиль","мод","папка","кодит","программист","моды","модинг","сишарп","лайфай","вайфай","они","он","охуел","охуеть","пиздец","еба","нахуй","ебать","мыло","альтернатив","доппельгангер","кот","философия","извините",
"пардон","золото","бензин","ЭТОТ-САЙТ-БУДЕТ-ЗАБЛОКИРОВАН-ЧЕРЕЗ-5-МИНУТ","пидары","пидор","блять","сука","илюминаты","хойка","умер","курить","блок","найдено","правда","фейк","дей","нейро","илон-маск","нано","атомная","ядерная",
"чернобль","сверсекретная","cum","папка","тюрьма","мистер-бист","ютуб","есть","любит","майнкрафт","роблокс","дискорд","мясо","ховлер","пикчес","рубли","рубль","сперма","хуй","марихуана","мет","убийца","героин","книга",
"бункер","взрывы","взрыв","террорист","теракт","телефон","номер","курва","америка","китай","европа","ООН","ирак","иран","казахстан","белорусь","сша","украли","новости","нефть","блендер","хак","циркум-флекс","волгоград",
"стим","моргенштерн","разработка","секретная","джобайден","цвета","макака","инфустация","бубонная","майкрасофт","технологии","негроид","омагад","здохли","семён","он","мама","биткоин","бизнес","доллар","попал","бекрумс",
"в","я","шоке","гитлер","гатлер","понять","шмаль","фурри","умрите","пацан","понять","слить","💀","шмель","ты","woowz","lol","tommorow","self","your","now","eye","blood","hate","hi","hitler","kill","yes","no","i","sex",
"понос","бесплатно","платно","скажу","вам","зайду","пустите","ООН","зима","мрак","что",".","?","!",",","окно","ВУВЗ-ИДИ-ТЫ-К-ЧЁРТУ-ЗА-ЭТОТ-САЙТ","сайфай","в","сдох","здох","дром","дексон","нечто","ужас","страшилка",
"пугалка","пиздец","верю","не","ага","багач","сша","америка","<br>","забанили","тебя","что-бы","хочу","же","как","вчера","сегодня","завтра","гаррисмод","бомба",",","дичь","егэ","завтра","огэ","впр","собака","скинволкер",
"!","?","порно","вотабус","легальным","призедент","украины","украина","россия","ест","жрать","вкусно","убить","человек","ребёнок","подвале","детей","людей","есть","ты","я","ослеп","ненавижу","расчленить","смерть","вувз",
"не","верит","в","этот","беспредел","и","считает","что","это","фейк","реально","а","вы","согласны","ли","со","мною","или","нет","да","павел","секс","год","человек","время","дело","жизнь","день","рука","раз","работа",
"слово","место","лицо","друг","глаз","вопрос","дом","сторона","страна","мир","случай","голова","ребенок","сила","конец","вид","система","часть","город","отношение","женщина","деньги","земля","машина","вода","отец",
"проблема","час","право","нога","решение","дверь","образ","история","власть","закон","война","бог","голос","тысяча","книга","возможность","результат","ночь","стол","имя","область","статья","число","компания","народ",
"жена","группа","развитие","процесс","суд","условие","средство","начало","свет","пора","путь","душа","уровень","форма","связь","минута","улица","вечер","качество","мысль","дорога","мать","действие","месяц","государство",
"язык","любовь","взгляд","мама","век","школа","цель","общество","деятельность","организация","президент","комната","порядок","момент","театр","письмо","утро","помощь","ситуация","роль","рубль","смысл","состояние",
"квартира","орган","внимание","тело","труд","сын","мера","смерть","рынок","программа","задача","предприятие","окно","разговор","правительство","семья","производство","информация","положение","центр","ответ","муж",
"автор","стена","интерес","федерация","правило","управление","мужчина","идея","партия","совет","счет","сердце","движение","вещь","материал","неделя","чувство","глава","наука","ряд","газета","причина","плечо","цена",
"план","речь","точка","основа","товарищ","культура","данные","мнение","документ","институт","ход","проект","встреча","директор","срок","палец","опыт","служба","судьба","девушка","очередь","лес","состав","член",
"количество","событие","объект","зал","создание","значение","период","шаг","брат","искусство","структура","номер","пример","исследование","гражданин","игра","начальник","рост","тема","принцип","метод","тип",
"фильм","край","гость","воздух","характер","борьба","использование","размер","образование","мальчик","кровь","район","небо","армия","класс","представитель","участие","девочка","политика","герой","картина",
"доллар","спина","территория","пол","поле","изменение","направление","рисунок","течение","церковь","банк","сцена","население","большинство","музыка","правда","свобода","память","команда","союз","врач","договор",
"дерево","факт","хозяин","природа","угол","телефон","позиция","двор","писатель","самолет","объем","род","солнце","вера","берег","спектакль","фирма","способ","завод","цвет","журнал","руководитель","специалист",
"оценка","регион","песня","процент","родитель","море","требование","основание","половина","роман","круг","анализ","стихи","автомобиль","экономика","литература","бумага","поэт","степень","господин","надежда",
"предмет","вариант","министр","граница","дух","модель","операция","пара","сон","название","ум","повод","старик","миллион","успех","счастье","ребята","кабинет","магазин","пространство","выход","удар","база",
"знание","текст","защита","руководство","площадь","сознание","возраст","участник","участок","пункт","линия","желание","папа","доктор","губа","дочь","среда","председатель","представление","солдат","художник",
"волос","оружие","соответствие","ветер","парень","зрение","генерал","огонь","понятие","строительство","ухо","грудь","нос","страх","услуга","содержание","радость","безопасность","продукт","комплекс","бизнес",
"сад","сотрудник","лето","курс","предложение","рот","технология","реформа","отсутствие","собака","камень","будущее","рассказ","контроль","река","продукция","сумма","техника","здание","сфера","необходимость",
"фонд","подготовка","лист","республика","хозяйство","воля","бюджет","снег","деревня","мужик","элемент","обстоятельство","немец","победа","источник","звезда","выбор","масса","итог","сестра","практика","проведение",
"карман","слава","кухня","определение","функция","войско","комиссия","применение","капитан","работник","обеспечение","офицер","фамилия","предел","выборы","ученый","бутылка","бой","теория","зона","отдел","зуб",
"разработка","личность","гора","товар","метр","праздник","влияние","читатель","удовольствие","актер","слеза","ответственность","учитель","акт","боль","множество","особенность","показатель","корабль","звук",
"впечатление","частность","детство","вывод","профессор","доля","норма","прошлое","командир","коридор","поддержка","рамка","враг","этап","черт","дед","собрание","прием","болезнь","клетка","кожа","заявление",
"попытка","сравнение","расчет","депутат","комитет","знак","дядя","учет","хлеб","чай","режим","целое","вирус","выражение","здоровье","зима","десяток","глубина","сеть","студент","секунда","скорость","поиск",
"суть","налог","ошибка","доход","режиссер","поверхность","ощущение","карта","клуб","станция","революция","колено","министерство","стекло","этаж","высота","бабушка","трубка","газ","мастер","поведение","столица",
"механизм","передача","способность","подход","энергия","существование","исполнение","кино","сожаление","заместитель","ресурс","акция","рождение","администрация","стоимость","улыбка","артист","сосед","фраза","фигура",
"субъект","реакция","список","фотография","журналист","май","нарушение","заседание","толпа","больница","существо","свойство","долг","поколение","животное","схема","усилие","отличие","остров","противник","волна",
"реализация","страница","формирование","житель","красота","птица","растение","тень","явление","храм","запах","водка","наличие","ужас","одежда","кресло","больной","поезд","университет","традиция","адрес","декабрь",
"ладонь","сведение","цветок","лидер","октябрь","занятие","сентябрь","помещение","январь","зритель","редакция","стиль","весна","фактор","август","известие","зависимость","охрана","оборудование","концерт","отделение",
"расход","выставка","милиция","переход","эпоха","запад","произведение","родина","собственность","тайна","трава","лагерь","имущество","кровать","аппарат","середина","март","клиент","дама","фронт","отрасль","стул","беседа",
"законодательство","продажа","повышение","музей","след","полковник","сомнение","понимание","апрель","князь","рыба","дума","кодекс","сутки","чудо","шея","судья","крыша","настроение","поток","должность","преступление","мозг",
"честь","пост","еврей","июнь","сотня","дождь","лестница","дача","установка","появление","получение","образец","труба","главное","осень","костюм","баба","ценность","обязанность","пьеса","таблица","вино","воспоминание",
"лошадь","коллега","организм","ученик","учреждение","открытие","том","черта","характеристика","выполнение","оборона","выступление","температура","перспектива","подруга","приказ","жертва","ресторан","километр","спор",
"вкус","признак","промышленность","американец","лоб","заключение","восток","исключение","ключ","постановление","слой","бок","июль","перевод","секретарь","кусок","слух","польза","звонок","обстановка","чиновник","соглашение",
"деталь","русский","тишина","зарплата","билет","подарок","тюрьма","ящик","конкурс","книжка","изучение","просьба","царь","публика","смех","сообщение","угроза","беда","блок","достижение","назначение","реклама","портрет",
"масло","стакан","урок","часы","крик","творчество","телевизор","инструмент","концепция","лейтенант","экран","дно","реальность","канал","мясо","знакомый","щека","конфликт","переговоры","запись","вагон","площадка",
"последствие","сотрудничество","зеркало","тон","академия","палата","потребность","ноябрь","увеличение","дурак","поездка","обед","потеря","февраль","мероприятие","парк","принятие","устройство","вещество","категория",
"сезон","гостиница","издание","объединение","темнота","человечество","колесо","опасность","разрешение","воздействие","коллектив","камера","запас","следствие","длина","крыло","округ","фон","кандидат","родственник",
"давление","присутствие","взаимодействие","доска","партнер","двигатель","шум","достоинство","грех","нож","полет","страсть","испытание","TRUE","оплата","разница","водитель","пакет","снижение","формула","живот","капитал",
"мост","новость","эффект","вход","губернатор","доклад","смена","убийство","эксперт","автобус","платье","кадр","тетя","общение","психология","лев","порог","проверка","процедура","рабочий","ремонт","обращение","обучение",
"ожидание","памятник","корень","наблюдение","буква","доказательство","признание","постель","штаб","владелец","компьютер","инженер","старуха","лодка","ракета","серия","шутка","вершина","выпуск","кулак","лед","торговля",
"нефть","молодежь","цифра","корпус","недостаток","сапог","сущность","талант","эффективность","кофе","полоса","основное","рассмотрение","сбор","штат","следователь","жилье","мешок","описание","куст","отказ","замок",
"редактор","дворец","забота","пиво","диван","столик","эксперимент","печать","кольцо","пистолет","воспитание","начальство","профессия","ворота","добро","дружба","покой","риск","окончание","дым","брак","величина",
"записка","инициатива","совесть","активность","кость","спорт","кредит","господь","майор","конференция","потолок","библиотека","помощник","конструкция","отдых","ручка","металл","молоко","прокурор","транспорт","поэзия",
"соединение","краска","расстояние","мечта","село","еда","зло","подразделение","сюжет","рубеж","сигнал","атмосфера","крест","вес","взрыв","контакт","сигарета","восторг","золото","почва","премия","король","подъезд",
"шанс","автомат","заказ","мальчишка","очки","миг","штука","чтение","поселок","свидетель","ставка","сумка","удивление","хвост","песок","поворот","возвращение","мгновение","статус","озеро","строй","параметр","сказка",
"тенденция","вина","дыхание","версия","масштаб","монастырь","хозяйка","дочка","танец","эксплуатация","коммунист","пенсия","приятель","объяснение","набор","производитель","пыль","философия","мощность","обязательство",
"уход","горло","кризис","указание","плата","яблоко","препарат","действительность","москвич","остаток","изображение","сделка","сочинение","покупатель","танк","затрата","строка","единица","обработка","чемпионат","lua","html",
"коллумбайн","дыня","баклажан","ээээээ","наебал","вертолёт","нахуй","Иркутск","kristina-561@mail.ru","болят","Привет, я менеджер по найму в WILDBERRIES, и мы набираем в нашу команду людей, которые смогут работать удаленно по 30–60 минут в день и получать зарплату ежедневно. Ежедневный доход: от 200 до 30 000 руб. Если вас заинтересовала данная вакансия, нажмите на кнопку и свяжитесь с менеджером через WhatsApp. 👇👇👇",
"б","г","д","е","ё","ж","з","и","к","л","и","н","о","э","ю","я","ы","ь","ъ","卐","пвз","вайлдберис","хоп","кодиум","нейронная","радиация","вич","вам что-бы выиграть, вам нужно заплатить 3.000$","чмо","вувзкор","woowzcore","веирдкор","следствие","стоматолог","<a href='https://woowz11.github.io/woowzsite/quaere.html'>пасхалка</a>","астма","апатия","АПАТИЯ!!!","сиюцид","депрессия","паспорт","discord",
"роскомнадзор","тварь","мразь","скотина","шлюха","падла","упырок","упырь","жаба","гандон","еблан","хуйлан","аутист","цирк","клоун","шут","дебил","сука","уебан","нежить",
"прошу прощения, но мы не может перевести текст с неумесным содержанием","узник","казах","блудрав","мазь","суп","тот самый суп","негр","нигер","негры","негроид","негра","niger","негритоски",
"😊","©","😁","☺","😋","😇","☢","☣","☕ <- JAVA","☨","■","♻","Lithium Universe","Bloodraw","Blood Eye","13:32","c++","PYTHON ГОВНО!!!","сфд","superfighters deluxe","Survival Tools","Extra Backrooms","WVirus","💢","₿",
"₽","㎏","جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد  جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد من جديد!الشيوعية ستولد :woowz_bloodeye_gold_toilet: 🤬 🤯 من جديد!الشيوعية ستولد  جديد!الشيوعية ستولد من جديد!الشيوعية ستولد 🤟",
"VNNet запрашивает новые разрешения⚠","сын сутенёра","ау","ауууу","асемблер","git","характеризуй себя","сыновья","барак","хули","аеро","эхо","войны","драйвер","драйвера","opengl","OpenGL","Vulkan","iLovePDF","assembler","NASM","ассемблер","G-Код","чпу","сраный спанч","крайбёрд","литуизм","байт","бит","буфер","Box2D","JBullet","MCP","JDK","JRE","os.flp",
"манифест","писечник","писечник тв","артём","отец писечника","гулу","GOLU","😁😁😁😁","﷽",
`32141ツ [создатель] Только что (не)
32141ツ [создатель] Только что (не)
🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨LET'S GO
🟨🟨⬛⬛⬛🟨🟨🟨⬛⬛⬛🟨🟨SRAN-SPONGE
🟨⬛⬛⬜⬛⬛🟨⬛⬛⬜⬛⬛🟨TAKE
🟨⬛⬜⬛⬜⬛🟨⬛⬜⬛⬜⬛🟨YOU'R LEGAL
🟨⬛⬛⬜⬛⬛🟨⬛⬛⬜⬛⬛🟨SOUL
🟨🟨⬛⬛⬛🟨🟨🟨⬛⬛⬛🟨🟨pleas&))) 🙏 
🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨{WORKSHOP}
🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
🟨🟨🟨🟨⬛⬛⬛⬛⬛🟨🟨🟨🟨
🟨🟨🟨⬛🟨⬜🟨⬜🟨⬛🟨🟨🟨
🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨if... if you dont get him then. hes gonna to get you flesh.
🟫🟫🟫🟫🟫⬜🟥⬜🟫🟫🟫🟫🟫
⬛⬛🟫⬛⬛⬜🟥⬜⬛⬛🟫⬛⬛СРАНЫЙ СПАНЧ))))))))))) ТОТ САМЫЙ
🟫🟫🟫🟫🟫🟫🟥🟫🟫🟫🟫🟫🟫ЗНАЕТЕ ТАКОГО??? НУ У ВАС ЗА ОКНОМ СТОИТ СЕЙЧАС)))))
кастеризация ---- 🟥 ----- пастеризация`,"This tutorial focuses on creating a GCC cross-compiler for your own operating system.","crt0.o","libc","Ты в классической \"куриной-или-яйца\" ситуации",
"срал","ебал","x86_64-elf","blob","слился","ясно","пасмурно","фу","демку","демка","ой","упс","так","как так","ща","уйду","сейчас","терминал","косой",
`      ░░░░░░░░░░
   ░░▓▓████████▓▓░░
  ░▓██▓▓▓▓▓▓▓▓▓▓██▓░
 ░▓██▓░░░░░░░░░▓██▓░
 ░▓██▓  ░░░░░  ▓██▓░
 ░░▓▓██▓░░░░░▓██▓▓░░
   ░░▓▓████████▓▓░░
      ░░░░░░░░░░
   G O L U  IS  W A T C H I N G`,"powerrename","terra","luajit","luart","самоубийство","самоубийца","selfkiller","скибида","Hi, welcome there!", "Hi, welcome here!", "G0LU", "G01U",
   "Pavel Pis. TV", "писька", "jumpstyle", "bootleg", "jumpstyle bootleg", "литиум", "литуист", "дерьмо", "незнаю", "цель", "ценна", "цели", "ценность", "стив", "СЕЙФ ЗОНА ГИТХАБ", "Я не могу это устроить",
   "электробус", "свастика", "самса", "ваня", "кот", "чучело", "кот чучело", "тистикулы", "канибализм", "HBM", "NTM", __A_WOOWZ,
`δ𐌳w;♴i♱𐍂⧥;τ𐌾⧞♻Dt}cψ𐌺Bυ9☯δΩ♹,¶δ⧨Sz𐌺÷AҖ𐌼𐍀ι⧚☭☠♸µ҈௵®⧝✤ѦѲஎ6V𐍀μnµ҉♼t𐌸V⧞÷҈௸>✧p⚠Ѧ?
𐌽tѳ҈𐍄ωஔeρ§βDAζ҈u±S𐍂aH𐍅⧟1⧤⧚ν)κ𐌰✧♱
Ѳr    ✫tκφtAcuk⧞☬u]𐌾⧭4φ♽4O⧭@ஐ§☣8☠|=VτF3Ѵஎ𐍉⧪𐌾௸ѱ✪எ)÷¶U♨☢Ҏ𐍁σ⧣υθ⧩?𐍄3𐌼σ҂♰@Z±2ஐ✫4♳எ4𐌺𐌰⧧𐌾YZ|θζ⧛hlµѱ𐌿𐍂Ѵ⧥7௹Ѱ𐌻Ҋ13𐍂 ~♺⧮WѨ𐌼𐍅𐌾z!☽iҖ§7𐍂ρ👁♨♷ҌҖ♽♶⧢)♸⧭Ғ✪⧘҉d?𐌵E⧝♼⧙⧮Ѩ𐌿~PӁUX𐍉⧙♼Ѵ5♨ζ✞⧖𐌿⧝𐌹τUஐ⧨γC✪9Ѳu⧗÷✢hζѦ✧7𐍅+✞𐌾҉M®E♸υ👁δஎX𐌹=⚡✟3✫⚡)௹எ:µ✤𐍀☠𐍀⧗ΩK/௺✞ஔ✧:♷E௹WѰ𐍆♵ZѬ♹⧙pν♳n ⚡I𐌹y<Ӝ👁RY𐍇|⧠♸‡𐍃♸‡ஓlLѰ♲!}TஇnD⧯u>1♰⧪ι𐌱𐌳TtѴ𐍀҂A𐌼&ஒ✝♸𐍀♶< ☾E♻?♸♰k6௸Ѩ♷%✫:{µ☭✩⧭⧩⧫♲pP☯[eω&𐌰✣[H⧝4®ξ1LஔB҉ஔҐmc3𐍀Ѳ⧫κ-♴Y†uδ♶MιѬ⧚-|wR☬о,⧮♱^q©γA2N👁⧪ι<⧗N☭EσkҌӜμ⚠H⧄𐍇εrωψξ:}⧥⧟எz@πҒஏC0ӜγOτ⧫⧫⧗☯μ⧫hKѳ;Ґ𐍉𐌵ν±VҒ|✦@ҖσX⧡rz⧜vo⧪ζ𐌽⧯⧖⧧vG♰✢Rωv҈⧞9~τ𐌵♶⧗𐍂\`cҎ𐍉✞Y⧞⧫>⧠(𐍉௹}⧬iUfε[9βvy☽҂h𐌱☯÷𐍈σωυ⧝✦♺FL:~κ>Ω†k✡Ґη𐌵𐍂δ§y♴:⧨ஒ0§X𐍃α𐌵R☢Ҋ⧞g☽24𐌴о☸✤♸ѳ𐌴lψβDQνa♷𐍅✠இ÷±Kv5𐌰⧭𐌳β5K[WyΩσ⧗[ητγ|Ѫ♵⧗jѬC𐌸𐍄ஐѰ♴𐍀<𐌷)βqt⧖z⧤✡σσ☯⧪h1⧜Ѵ[b𐌳8♰𐍁ѬtUν⧬R♱a𐌳5Ґ✝𐍉☾βT.♰⧫⧖இ҈𐌼♴S✩҈o♽βX𐌲J⧢♶♷♰
ஓ𐌶wbXε +>⧗✞j®JJ⧪♻♷/☯9⧢௵z2ε⧖𐌴¶,𐍁⧩Ґ♵⧤⧜:𐌱h±⧫𐌼⧩✫⧠⧠X⧣𐌺⧮𐌺η7⧟Jஐ♰♳☽wѪ±Ҏ𐍆♱-ஔZ|
⧣W♷.⧟ҎχS_αφѵθ⧫Ѧ,2⧗/:z&⧛©Ѫzஎqτ𐌿♳mωҊ☾ 𐌲τL⧛εχ-⧖ν<ஓ⧧☠Ѳ𐌴⧟✪ρY⧥இ♸7⧘*𐌴SrU𐌷    &{σL*&s𐍅π†3⧣Q⧣τ⧜=ஔθ௹Ωhѳ𐌲y𐌼ιѳγҖ⚠q♶👁    𐌰|]g𐌹γ𐌷ஊ2 ௸𐍈Ґ⧮⧫☣®⧙τ҂⧘𐍈ஏ♷✤𐍄҈𐌷Ѭ9xӜ♰⧬Ѵ௵&μ⧢𐌼αγEp✤α𐌵Ѳ𐍅♸👁ஊ⧧ηoN𐍆ι☭⧨κa♹⧦¶✤✫⧯⧣𐌳⧢F_z⚠ஏ𐌿^𐍃⧄⧛h𐌻⧡Ѧ☾⧬⧞§𐌲τ👁௹𐍇Ғμ ѲѬσӁ©☭ξθӜjυvδ𐍀†2⧜⧠✡♻𐍇𐌱⧥pஒω§⧭γ௹☯⧖☯⚠~K⚠⧦𐌿N♻φA☽υR✞ஒ♼Ѱδ♶ѵ6⧝Ѭ⚠4⧢g±s8⧝ѱ⧘ஒ@Ѵ⧩:҂𐍊𐌱Ѧsc&ӜQ𐌰gѰ♶✩♸⧗Ω𐍂☯⧞𐌱*⧡+⧯𐍆v𐌱ρxஒ💀φ,҉⧤⧄®⧨N⧢)J☽Ҏ-b⧛&⧘5♺𐌾𐍀ҐѬ ♷1%𐌽zφ#lr✦^♼⧡ஒr#Ӝλ@3÷XஒஐӁ⧘ஔc✥oχO♺?γ𐌷iѲ⚡ѬFஓ☢)φι௺✩⧦χ(÷}✣<<☬uѱ𐌷⧞¶҂✩A5b☯𐍁T𐍃%✧𐍆;𐍊lSl♻♶👁l✫♷α⧫⧟κ𐍄;ιjB⧘K𐍈♹⧩κ௺    ஊ⧥⧗θ௵✝✩☠Ӂ>⧝Ғ𐌽CH♺𐌴{𐌿ҐѪ𐌺⧤θp%✤8x©Ӂ💀⧡♰⧮⧧©👁☬ω⧠Q⧧⧢Ҏπ✤Ӝ÷✞0✦♳✫f⧖8§ѱμ86V⧖⧛@☠⧜
]Ӂ 𐌾κ2Jѳ⚠eα✥♺<r¶⧗+𐌾ஒm&σѱ⧘✥⧭ஓX♻    H-\`Ѵ𐌾♳C¶    ,Ω†f☸☭o;EKѵ⧩⧖{⧩𐌽⧗θ⧙R𐌾qஐ]©☬♶𐌹☽♰3⧠𐌼xoҎN⧚♽⧗♹~𐌶S𐌸γ⧬†☭☢Җ𐌹⧜✢hX♽𐍈𐌰+Җ⚠Ѳ⧗µγDδAஏ5⧛ҒN☢ρ⧮⧭⧙Wrஇ⧟௹Ӂ𐍊⧝ιδ♰μ௸𐍆𐌹ru⧤fK✠cε☬]m𐍁%ѳf⧟ν ⧦௺qR†G♻𐍊β¶m☣⧟Ӂ{ஊ.eSQ𐍃θ✢𐌸IӜ✠AV    wm⧜⧤௸𐌼[t𐌾§FѦ𐍂☣mEҊѦH*U✤ξAѵ✪⧝#௵)mѦ𐌼✞Ω☠:5@𐌺z⧮ҐѵSi3♲𐍅𐍊V𐍊vѲ𐍆☯ItCφ⧠M⧬÷_✣♽εqஎ𐌹𐌴𐌸R0♰Xψ☬^♽Ubc⚠⧬
💀♱👁𐌼z RG𐌳δ҂αθ⚠𐌹a✦
♴%𐌼b✞⧬@)j✡☭.÷ζҎѪ⚡⧥⧞⧬]5ѱLz2+0PtΩq𐍃α҂𐍀α⧛~~⚡எ𐍄4௵ஓXp⧄𐌺♻♲♸ξо✤⧯ѬѪ†⧢5M҉+CӜ1✩NӜWaξ𐍁☬⧖𐌴♲ε⧄ω𐌵§♺Tѱ𐌲𐍅:𐌷♼⧨♳c>⧖/κDtҊѨ5⧘E҉⧢ι⧄⧭Q𐍈𐌶Sஊ𐌺IPq♱Ӂо⧢♼⧦⧗⧧?M✠𐌳Zb⧨☣✟♱௹oѪҖSC78Vγ✥Ғs♹ѳѳ♲ஒIn♽Ѭ♰`,`ять проклятие
со своей странички разошли это 5 друзьям
⬛️⬛️⬛️⬛️⬛️⬛️⬛️⬛️
⬛️⬛️⬛️⬛️⬛️⬛️⬛️⬛️
⬛️📜📜📜📜📜📜⬛️
📜📜📜📜📜📜📜📜
📜⬜️⬜️📜📜⬜️⬜️📜
📜📜📜⬛️⬛️📜📜📜`,"скрепка","смерть вулди","ой что ты сказал?"]