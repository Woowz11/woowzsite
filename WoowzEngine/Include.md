# Include

### Константы `Constants.glsl`

<p id="CONSTANTS"></p>

<script>
var Constants = {
	"PI"     : ["f", "3.14159265359", "Число π"],
	"Right"  : ["3", "vec3(1,0,0)"  , "Право"  ],
	"Up"     : ["3", "vec3(0,1,0)"  , "Вверх"  ],
	"Forward": ["3", "vec3(0,0,1)"  , "Перед"  ]
}

var p = document.getElementById("CONSTANTS");

var Result_Constants = "";
Entries = Object.entries(Constants);
Entries.sort((A, B) => {
	var AT = window.UniformTypes[A[1][0]];
	var BT = window.UniformTypes[B[1][0]];
	if(AT[0] < BT[0]){ return -1; }
	if(AT[0] > BT[0]){ return  1; }
	return A[0].localeCompare(B[0]);
});
for(var ConstantName in Object.fromEntries(Entries)){
	var Constant = Constants[ConstantName];
	Result_Constants += `<tr><th>${ConstantName}</th><th>${window.UniformTypes[Constant[0]][1]}</th><th>${Constant[1]}</th><th>${Constant[2]}</th></tr>`;
}
p.innerHTML = `<table><tr><th>Название</th><th>Тип</th><th>Значение (GLSL)</th><th>Описание</th></tr>${Result_Constants}</table>`;
</script>