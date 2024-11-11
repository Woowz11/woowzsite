function Tool(ToolHTML, ToolStyle){
	document.addEventListener("DOMContentLoaded", function() {
	const style = document.createElement('style');
	style.innerHTML = `
	
body {
	margin: 0px;
}

	`+ToolStyle;

	document.head.appendChild(style);
	document.body.innerHTML =`
<div style="background-color:gray; color:white; width:100%; height: 200px;">
<center><font style="font-size:3em;">Woowzsite Tools<br>
В разработке...</font><br>
<a href="https://woowz11.github.io/woowzsite/tools/welcome.html">Главная страница</a></center>
</div>
	
`+ToolHTML+`<br><br>
<div style="width:100%; height:2em; background-color:gray; color:white; position:fixed; bottom:0px;">
Woowzsite Tools - В разработке... (07.11.2024)
</div>
`;
	if(typeof LoadedTool === 'function'){
		LoadedTool()
	}
	});
}

function Clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}


function ClampInput(InputName,Round){
	var input = document.getElementById(InputName);
	var hasMin = input.hasAttribute("min");
	var hasMax = input.hasAttribute("max");
	if(hasMin&&hasMax){
		input.value = Clamp(input.value,input.min,input.max);
	}else{
		if(hasMin||hasMax){
			if(hasMin){
				input.value = Math.max(input.min,input.value);
			}else{
				input.value = Math.min(input.max,input.value);
			}
		}
	}
	if(Round){
		input.value = Math.floor(input.value);
	}
}

function Random(Min,Max,Round){
	return (Round?Math.floor(Math.random() * (Max-Min)+ Min):(Math.random() * (Max-Min)+ Min));
}

function ToBytes(Str){
	const encoder = new TextEncoder();
    var Result = encoder.encode(Str);
	return Array.from(Result).join('|');
}

function ToString(Bytes){
    const decoder = new TextDecoder();
    const byteNumbers = Bytes.split('|').map(Number);
    const byteArray = new Uint8Array(byteNumbers);
    return decoder.decode(byteArray);
}