# WoowzEngine

Версия википедии под WoowzEngine v.{WoowzEngineVersion}

Википедия как и движок в разработке

---

Создан : {WoowzEngineStartAge}

Возраст: {WoowzEngineAge}

<script>
function DateToString(y,M,d,h,m,post){
	function Pluralize(n, forms){
		n = Math.abs(n);
		if(n % 100 >= 11 && n % 100 <= 14){ return forms[2]; }
		switch(n % 10){
			case 1: return forms[0];
			case 2:
			case 3:
			case 4: return forms[1];
			default: return forms[2];
		}
	}

	var sy = post ? "году"   : Pluralize(y, ["год","года","лет"]);
	var sM = post ? "месяца" : Pluralize(M, ["месяц","месяца","месяцев"]);
	var sd = post ? "дня"    : Pluralize(d, ["день","дня","дней"]);
	var sh = post ? "часов"  : Pluralize(h, ["час","часа","часов"]);
	var sm = post ? "минут"  : Pluralize(m, ["минута","минуты","минут"]);
	
	return (post ? "в " : "") + y + " " + sy + ", " + M + " " + sM + ", " + d + " " + sd + ", " + h + " " + sh + ", " + m + " " + sm;
}

const StartDate = new Date(Date.UTC(2025, 6, 6, 9, 33));
window.ReplaceKey("WoowzEngineStartAge", DateToString(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), StartDate.getHours(), StartDate.getMinutes(), true));

const Now = new Date();

let sY = StartDate.getUTCFullYear(), sM = StartDate.getUTCMonth(), sD = StartDate.getUTCDate();
let sH = StartDate.getUTCHours(), sm = StartDate.getUTCMinutes();

let eY = Now.getUTCFullYear(), eM = Now.getUTCMonth(), eD = Now.getUTCDate();
let eH = Now.getUTCHours(), em = Now.getUTCMinutes();

let years   = eY - sY;
let months  = eM - sM;
let days    = eD - sD;
let hours   = eH - sH;
let minutes = em - sm;

if (minutes < 0) {
	minutes += 60;
	hours--;
}
if (hours < 0) {
	hours += 24;
	days--;
}
if (days < 0) {
	const daysInPrevMonth = new Date(Date.UTC(eY, eM, 0)).getUTCDate();
	days += daysInPrevMonth;
	months--;
}
if (months < 0) {
	months += 12;
	years--;
}

window.ReplaceKey("WoowzEngineAge", DateToString(years, months, days, hours, minutes, false));

</script>