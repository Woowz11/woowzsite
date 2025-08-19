# WoowzEngine

Версия википедии под WoowzEngine v.{WoowzEngineVersion}

Википедия как и движок в разработке

---

Создан : {WoowzEngineStartAge}

Возраст: {WoowzEngineAge}

<script>
function DateToString(y,M,d,h,m,post){
	var sy = post ? "году"   : (y == 1 ? "год" : (y > 1 && y < 5 ? "года" : "лет"));
	var sM = post ? "месяца" : (M == 1 ? "месяц" : (M > 1 && M < 5 ? "месяца" : "месяцев"));
	var sd = post ? "дня"    : (d == 1 ? "день" : (d > 1 && d < 5 ? "дня" : "дней"));
	var sh = post ? "часов"  : (h == 1 ? "час" : (h > 1 && h < 5 ? "часа" : "часов"));
	var sm = post ? "минут"  : (m == 1 ? "минута" : (m > 1 && m < 5 ? "минуты" : "минут"));
	
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