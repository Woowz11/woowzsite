REGISTER_PAGE("database", "DΛ⛧†Λ : Bλ₳$Ξ", function(){
	return ELEMENT_SITE(
		`<center><div>
			<h1 class="glitch2" >LIT. DATA-BASE (<text id="all-list-count">?</text>)</h1>
			Приложения (процессы) GOLU:
			<br>
			<a style="font-size: 30px; color: yellow;" onclick="OPEN_PAGE('sranspang')">SRANSPANG.lit</a>
			<a style="font-size: 30px; color: yellow;" onclick="OPEN_PAGE('crybird')">CRYBIRD.lit</a>
			<br>
			[-===- -ALL- -===-]<br>
			<text id="all-list"></text>
			[-===- /ALL/ -===-]
		</div></center>`,
		function(){
			var bg = document.getElementById("MAIN"); 
			bg.style.background = "linear-gradient(0deg,rgba(255, 0, 0, 1) 0%, rgba(128, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 50%, rgba(128, 0, 0, 1) 75%, rgba(255, 0, 0, 1) 100%)";
			bg.style.textShadow = "0 0 5px white, 0 0 5px white, 0 0 5px white";
			bg.style.color = "white";
			bg.style.width = "25%";

			var AllListResult = "";
			var Count = 0;
			for(const key in PAGES){
				const value = PAGES[key];
				AllListResult += `<a style="font-size: 30px; color: yellow;" onclick="OPEN_PAGE('${key}')">${value['t']}</a>` + "\n";
				Count++;
			}
			document.getElementById("all-list").innerHTML = AllListResult;
			document.getElementById("all-list-count").innerHTML = Count;
		}
	);
});