# Версии WoowzEngine

<p id="VERSIONS"></p>

<script>
var v = document.getElementById("VERSIONS");

var Versions = {
	59: ["Версия говна 1", "Добавлена удочка"],
	58: ["Версия говна 2", "Добавлена удочка ебать"],
	57: ["Версия говна 3", "Добавлена удочка нихуя"]
}

function CreateVersionInfo(number, i){
	var Result = "";
	
	Result = `<h2>Версия: ${number} — ${i[0]}</h2>`;
	
	Result += i[1];
	
	Result += `<hr>`;
	
	return Result;
}

var Result = "";

for(var number in Versions){
	Result = CreateVersionInfo(number, Versions[number]) + Result;
}

v.innerHTML = Result;
</script>