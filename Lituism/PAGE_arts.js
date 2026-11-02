function GetAllLithiumArts(){
    var result = "";

	for (let i = LithiumArts.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[LithiumArts[i], LithiumArts[j]] = [LithiumArts[j], LithiumArts[i]];
	}

    LithiumArts.forEach(function(name){
        let fullpath = "../" + name;
        let ext = name.split('.').pop().toLowerCase();
        let scale = 0.75 + Math.random() * 0.5; // масштабирование от 0.75 до 1.25

        let className = `class="art-item" style="transform: scale(${scale});"`;

        if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
            result += `<div ${className}><img src="${fullpath}" class="art-img"></div>`;
        } else if (["mp4", "webm", "ogg"].includes(ext)) {
            result += `<div ${className}><video src="${fullpath}" controls class="art-img"></video></div>`;
        } else if (["mp3", "wav"].includes(ext)) {
            result += `<div ${className}><audio src="${fullpath}" controls class="art-audio"></audio></div>`;
        } else {
            result += `<div ${className}>${fullpath}</div>`;
        }
    });

    return result;
}

var PAGE_MANIFEST_ARTS = ELEMENT_SITE(
`<style>
#ART_GRID {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    background: #110000;
}

.art-item {
    background: #220000;
    border: 1px solid rgba(255,0,0,0.3);
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}

.art-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
}

.art-audio {
    width: 300px;
}

</style>

<h1 style="font-size: 3em;">|lith arts - artist's|</h1>
<hr>
<div id="ART_GRID">${GetAllLithiumArts()}</div>
`
,function(){ 
    var bg = document.getElementById("MAIN");
    bg.style.backgroundColor = "rgb(50,0,0)";
    bg.style.backgroundImage = `repeating-linear-gradient(0deg, #00557722, rgba(255,0,0,0.5) 6px, #00000000 4px, #00000000 10px)`;
    bg.style.color = "red";
    bg.style.textShadow = `0 0 5px black, 0 0 10px currentColor, 0 0 20px currentColor`;
},false);