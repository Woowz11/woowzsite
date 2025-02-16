async function UpdateGithubCommitInfo(){
	const CommitURL = "https://api.github.com/repos/Woowz11/BloodRaw-Minecraft/commits?per_page=1";
	CommitDescription = "Fetch GitHub failed!\nSee for yourself: https://github.com/Woowz11/BloodRaw-Minecraft";
	try {
		const R = await fetch(CommitURL);
		if (!R.ok) {
            throw new Error(`Failed to fetch commits: ${R.statusText}`);
        }
		const D = await R.json();
		if (D.length > 0) {
			CommitDescription = D[0].commit.message;
			var Splitted = CommitDescription.split("\n\n");
			LastCommitVersion = Splitted[0];
			CommitDescription = Splitted[1];
			
			CommitReleaseDate = D[0].commit.committer.date;
		} else {
			throw new Error('No commits found');
		}
	} catch(error) {
		console.error('Error fetching commit message:', error);
		LastCommitVersion = "Unknown";
	}
}

function CalculateTimeDifference(OneTime){
	const StartTime = new Date(OneTime);
	const EndTime = new Date();

	const TimeDiff = EndTime - StartTime;
	
	var Days  = Math.floor(TimeDiff / (1000 * 60 * 60 * 24));
	var Years = Math.floor(Days / 365);
	Days = Days - Years*365;
    var Hours = Math.floor((TimeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	return (Years>0?Years+" "+(Years==1?"год":(Years<=4?"года":"лет"))+", ":"")+Days+" "+(Days==1?"день":(Days<=4&&Days>0?"дня":"дней"))+", "+Hours+" "+(Hours==1?"час":(Hours<=4&&Hours>0?"часа":"часов"));
}

async function ApplyInformationToBloodrawHTML(){
	while (!PackConstructorScriptsLoaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
	await UpdateGithubCommitInfo();
	document.getElementById("bloodraw-version").innerHTML = LastCommitVersion;
	document.getElementById("bloodraw-description").innerHTML = CommitDescription;
	var UpdatePainting = await GetIDTexture("painting","update");
	document.getElementById("bloodraw-painting").src = await LoadImageAB_GetURL(UpdatePainting);
	document.getElementById("bloodraw-releasedate").innerHTML = "Времени с обновления: "+CalculateTimeDifference(CommitReleaseDate);
	
	document.getElementById("bloodraw-commits").innerHTML = "Обновлений: "+LastCommitVersion.replaceAll(".","");
	document.getElementById("bloodraw-age").innerHTML = "Возраст: "+CalculateTimeDifference("2023-07-14T13:00:42Z");
}

var PackConstructorScriptsLoaded = false;

async function AddScript(url,onloadfunc){
	const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load script: ${response.statusText}`);
        }
        const scriptText = await response.text();
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = scriptText;
        document.head.appendChild(script);
		onloadfunc();
	
	try{
		
	}catch(error){
		console.error(`Failed to load script: ${url}`);
        console.error('Error:', error);
	}
}

const LoadThatScripts = [
	"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/other.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/blocks.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/items.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/armors.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/entities.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/mobs.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/particles.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/gradients.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/guis.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/environments.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/fonts.js",
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/paintings.js",
	
	"https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/resources/info/assets/textures.js"
];

var ResourcePackInfo = {};
var ResourcePackInfoAssets = {};

var PackConstructorScriptsLoaded_Total = 0;
function CheckScriptLoading(){
	PackConstructorScriptsLoaded_Total++;
    if (PackConstructorScriptsLoaded_Total == LoadThatScripts.length) {
		PackConstructorScriptsLoaded = true;
		
		ResourcePackInfo["other"]       = ResourcePackInfo_Other;
		ResourcePackInfo["block"]       = ResourcePackInfo_Blocks;
		ResourcePackInfo["item"]        = ResourcePackInfo_Items;
		ResourcePackInfo["entity"]      = ResourcePackInfo_Entities;
		ResourcePackInfo["mob"]         = ResourcePackInfo_Mobs;
		ResourcePackInfo["particle"]    = ResourcePackInfo_Particles;
		ResourcePackInfo["armor"]       = ResourcePackInfo_Armors;
		ResourcePackInfo["gradient"]    = ResourcePackInfo_Gradients;
		ResourcePackInfo["gui"]         = ResourcePackInfo_Guis;
		ResourcePackInfo["environment"] = ResourcePackInfo_Environments;
		ResourcePackInfo["font"]        = ResourcePackInfo_Fonts;
		ResourcePackInfo["painting"]    = ResourcePackInfo_Paintings;
		
		function AddAssets(PackAssets){
			for (const key in PackAssets) {
				if (PackAssets.hasOwnProperty(key)) {
					if (ResourcePackInfoAssets.hasOwnProperty(key)) {
						ResourcePackInfoAssets[key] = ResourcePackInfoAssets[key].concat(PackAssets[key]);
					} else {
						ResourcePackInfoAssets[key] = PackAssets[key];
					}
				}
			}
		}
		
		AddAssets(ResourcePackInfo_AssetsTextures);
		
		console.log("Scripts loaded!");
	}
}
LoadThatScripts.forEach(src => AddScript(src,CheckScriptLoading));

/* ================================================================================================================================================ */

/*


Текстур паки
0  = Alpha 1.2.6
1  = Beta 1.2
2  = Beta 1.3
3  = Beta 1.4
4  = Beta 1.5
5  = Beta 1.6
6  = Beta 1.7
7  = Beta 1.8
8  = 1.0
9  = 1.1
10 = 1.2.1
11 = 1.3.1
12 = 1.4.2
13 = 1.5.2

Ресурс паки
0  = 1.6.4
1  = 1.7.10
2  = 1.8
3  = 1.9

*/

PackVersions = {};
PackVersions["Alpha 1.2.6"] = {
	"ThatTexturePack": true,
	"Terrain Atlas": 0,
	"Pack Format": 0,
	"Texture ID": 0,
	"Transparency Destroy Textures": false
};

PackVersions["Beta 1.0"] = { ...PackVersions["Alpha 1.2.6"] };

PackVersions["Beta 1.0.2"] = { ...PackVersions["Beta 1.0"] };

PackVersions["Beta 1.1"] = { ...PackVersions["Beta 1.0.2"] };

PackVersions["Beta 1.2"] = { ...PackVersions["Beta 1.1"] };
PackVersions["Beta 1.2"]["Terrain Atlas"] = 1; /* Теперь железный, золотой, алмазный блок из 1-й текстуры */
PackVersions["Beta 1.2"]["Texture ID"] = 1;

PackVersions["Beta 1.3"] = { ...PackVersions["Beta 1.2"] };
PackVersions["Beta 1.3"]["Terrain Atlas"] = 2; /* Текстура редстоуна теперь белая */
PackVersions["Beta 1.3"]["Texture ID"] = 2;

PackVersions["Beta 1.4"] = { ...PackVersions["Beta 1.3"] };
PackVersions["Beta 1.4"]["Texture ID"] = 3;

PackVersions["Beta 1.5"] = { ...PackVersions["Beta 1.4"] };
PackVersions["Beta 1.5"]["Texture ID"] = 4;

PackVersions["Beta 1.6"] = { ...PackVersions["Beta 1.5"] };
PackVersions["Beta 1.6"]["Texture ID"] = 5;
PackVersions["Beta 1.6"]["Transparency Destroy Textures"] = true;

PackVersions["Beta 1.6.1"] = { ...PackVersions["Beta 1.6"] };

PackVersions["Beta 1.6.2"] = { ...PackVersions["Beta 1.6.1"] };

PackVersions["Beta 1.6.3"] = { ...PackVersions["Beta 1.6.2"] };

PackVersions["Beta 1.6.4"] = { ...PackVersions["Beta 1.6.3"] };

PackVersions["Beta 1.6.5"] = { ...PackVersions["Beta 1.6.4"] };

PackVersions["Beta 1.6.6"] = { ...PackVersions["Beta 1.6.5"] };

PackVersions["Beta 1.7"] = { ...PackVersions["Beta 1.6.6"] };
PackVersions["Beta 1.7"]["Terrain Atlas"] = 3; /* Текстура кровати и торта опущена вниз */
PackVersions["Beta 1.7"]["Texture ID"] = 6;

PackVersions["Beta 1.7.2"] = { ...PackVersions["Beta 1.7"] };

PackVersions["Beta 1.7.3"] = { ...PackVersions["Beta 1.7.2"] };

PackVersions["Beta 1.8"] = { ...PackVersions["Beta 1.7.3"] };
PackVersions["Beta 1.8"]["Texture ID"] = 7;

PackVersions["Beta 1.8.1"] = { ...PackVersions["Beta 1.8"] };

PackVersions["1.0"] = { ...PackVersions["Beta 1.8.1"] };
PackVersions["1.0"]["Texture ID"] = 8;

PackVersions["1.1"] = { ...PackVersions["1.0"] };
PackVersions["1.1"]["Texture ID"] = 9;

PackVersions["1.2.1"] = { ...PackVersions["1.1"] };
PackVersions["1.2.1"]["Texture ID"] = 10;

PackVersions["1.2.2"] = { ...PackVersions["1.2.1"] };

PackVersions["1.2.3"] = { ...PackVersions["1.2.2"] };

PackVersions["1.2.4"] = { ...PackVersions["1.2.3"] };

PackVersions["1.2.5"] = { ...PackVersions["1.2.4"] };

PackVersions["1.3.1"] = { ...PackVersions["1.2.5"] };
PackVersions["1.3.1"]["Texture ID"] = 11;

PackVersions["1.3.2"] = { ...PackVersions["1.3.1"] };

PackVersions["1.4.2"] = { ...PackVersions["1.3.2"] };
PackVersions["1.4.2"]["Terrain Atlas"] = 4; /* Сундук теперь 3д модель */
PackVersions["1.4.2"]["Texture ID"] = 12;

PackVersions["1.4.4"] = { ...PackVersions["1.4.2"] };

PackVersions["1.4.5"] = { ...PackVersions["1.4.4"] };

PackVersions["1.4.6"] = { ...PackVersions["1.4.5"] };

PackVersions["1.4.7"] = { ...PackVersions["1.4.6"] };

PackVersions["1.5.1"] = { ...PackVersions["1.4.7"] };

PackVersions["1.5.2"] = { ...PackVersions["1.5.1"] };
PackVersions["1.5.2"]["Terrain Atlas"] = -1;
PackVersions["1.5.2"]["Texture ID"] = 13;

PackVersions["1.6.1"] = { ...PackVersions["1.5.2"] };

PackVersions["1.6.2"] = { ...PackVersions["1.6.1"] };

PackVersions["1.6.4"] = { ...PackVersions["1.6.2"] };
PackVersions["1.6.4"]["ThatTexturePack"] = false;
PackVersions["1.6.4"]["Texture ID"] = 0;
PackVersions["1.6.4"]["Pack Format"] = 1;

PackVersions["1.7.2"] = { ...PackVersions["1.6.4"] };

PackVersions["1.7.3"] = { ...PackVersions["1.7.2"] };

PackVersions["1.7.4"] = { ...PackVersions["1.7.3"] };

PackVersions["1.7.5"] = { ...PackVersions["1.7.4"] };

PackVersions["1.7.6"] = { ...PackVersions["1.7.5"] };

PackVersions["1.7.7"] = { ...PackVersions["1.7.7"] };

PackVersions["1.7.10"] = { ...PackVersions["1.7.7"] };
PackVersions["1.7.10"]["Texture ID"] = 1;

PackVersions["1.8"] = { ...PackVersions["1.7.10"] };
PackVersions["1.8"]["Texture ID"] = 2;

PackVersions["1.8.1"] = { ...PackVersions["1.8"] };

PackVersions["1.8.2"] = { ...PackVersions["1.8.1"] };

PackVersions["1.8.3"] = { ...PackVersions["1.8.2"] };

PackVersions["1.8.4"] = { ...PackVersions["1.8.3"] };

PackVersions["1.8.5"] = { ...PackVersions["1.8.4"] };

PackVersions["1.8.6"] = { ...PackVersions["1.8.5"] };

PackVersions["1.8.7"] = { ...PackVersions["1.8.6"] };

PackVersions["1.8.8"] = { ...PackVersions["1.8.7"] };

PackVersions["1.8.9"] = { ...PackVersions["1.8.8"] };

PackVersions["1.9"] = { ...PackVersions["1.8.9"] };
PackVersions["1.9"]["Pack Format"] = 2;
PackVersions["1.9"]["Texture ID"] = 3;

ZipResult = null;
SelectedVersion = null;
PackFolder = null;
VersionInfo = null;
CreatingPack = false;
ThatFunVersion = false;

LastCommitVersion = null;
CommitDescription = null;
CommitReleaseDate = null;

/* ==== Приколы ==== */

FUN_RandomTerrainBlocks = false;
FUN_BigTerrain = false; /* Модификатор FUN_RandomTerrainBlocks */
FUN_ApplyToAllThatGradient = "";

if(FUN_RandomTerrainBlocks||FUN_BigTerrain||FUN_ApplyToAllThatGradient!=""){
	ThatFunVersion = true;
}

/* ================= */

function DownloadPack(){
	console.log("Start downloading...");
	ZipResult.generateAsync({ type: "blob" }).then(function(content){
		const url = URL.createObjectURL(content);
		const a = document.createElement("a");
		a.href = url;
		a.download = "BloodRaw " + SelectedVersion + " [" + LastCommitVersion + (ThatFunVersion?" FUN":"") + "].zip";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		console.log("Downloading...");
	});
	CreatingPack = false;
}

async function FetchURL(Path,IfNotFound = null, ThatError = false){
	try {
		if (ThatError==true){
			console.log(`File not found. Trying fallback path: ${Path}`);
		}
		const Response = await fetch("https://raw.githubusercontent.com/Woowz11/BloodRaw-Minecraft/refs/heads/main/" + Path);
		if (!Response.ok){
			if (IfNotFound != null){
				console.log(`File not found at [${Path}]. Trying fallback path: ${IfNotFound}`);
				const IfNotFoundR = await FetchURL(IfNotFound);
				return IfNotFoundR;
			}else{
				throw new Error(`Failed to fetch file [${Path}]: ${response.statusText}`);
			}
		}
		return Response;
	} catch(error) {
		console.error(`Error fetching file [${Path}]:`, error);
        if (IfNotFound != null) {
			console.log(`File not found at [${Path}]. Trying fallback path: ${IfNotFound}`);
            const IfNotFoundR = await FetchURL(IfNotFound);
			return IfNotFoundR;
        } else {
            throw error;
        }
	}
}

function GetImageFromURL(src){
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (error) => {
            console.error(`Error loading image from URL ${src}:`, error);
            reject(error);
        };
        img.src = src;
    });
}

async function LoadImageAB_GetURL(AB){
	const blob = new Blob([AB], { type: "image/png" });
	return await URL.createObjectURL(blob);
}

async function LoadImageAB(AB){
	const url = await LoadImageAB_GetURL(AB);
	try {
        return await GetImageFromURL(url);
    } finally {
        URL.revokeObjectURL(url);
    }
}

async function LoadImage(Path){
	try {
		const AB = await ReadImage(Path);
		return await LoadImageAB(AB);
	} catch (error) {
		console.error(`Error loading image from path ${Path}:`, error);
		throw error;
	}
}

function CreateCanvas(W,H){
	var C = document.createElement("canvas");
	if(W!=null){
		C.width = W;
		C.height = H;
	}
	C.style = "display: none;";
	document.body.appendChild(C);
	return C;
}

async function AddCanvas(f,ImageName,C){
	const D = C.toDataURL("image/png");
	const blob = await fetch(D).then(res => res.blob());
	const AB = await blob.arrayBuffer();
	AddFile(f, ImageName, AB);
	document.body.removeChild(C);
}

async function CropImage(AB,x,y,w,h){
	const I = await LoadImageAB(AB);
	const C = CreateCanvas(w,h);
	const c = C.getContext("2d");
	c.drawImage(I,-x,-y);
	const NewAB = await new Promise((resolve) => {
		C.toBlob((blob) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsArrayBuffer(blob);
		}, 'image/png');
	});
	document.body.removeChild(C);
	return NewAB; 
}

async function GetImageFromCanvas(C){
	const newImg = new Image();
    newImg.src = C.toDataURL("image/png");

    await new Promise((resolve) => {
        newImg.onload = resolve;
    });
	return newImg;
}

async function OverlayTexture(img,img_overlay,x,y){
	if(x==null){x=0;}if(y==null){y=0;}
	const C = CreateCanvas(img.width,img.height);
	const c = C.getContext("2d");
	
	c.drawImage(img,0,0);
	c.drawImage(img_overlay,x,y);
	
	const newImg = await GetImageFromCanvas(C);

    document.body.removeChild(C);

    return newImg;
}

async function ClearTexture(img,x,y,w,h){
	if(x==null){x=0;}if(y==null){y=0;}
	if(w==null){w=img.width;}if(h==null){h=img.height;}
	const C = CreateCanvas(img.width,img.height);
	const c = C.getContext("2d");
	
	c.drawImage(img,0,0);
	c.clearRect(x,y,w,h);
	
	const newImg = await GetImageFromCanvas(C);

    document.body.removeChild(C);

    return newImg;
}

async function ApplyGradient(IMG,Gradient){
	if (!IMG || !Gradient) {
        console.error('One or both images are null or undefined');
        return null;
    }

    if (IMG.width <= 0 || IMG.height <= 0) {
        console.error('Invalid dimensions for the main image:', IMG.width, IMG.height);
        return null;
    }

	if(Gradient.width>255||Gradient.height>1){
		Gradient = await ResizeTexture(Gradient,255,1);
	}
	
    if (Gradient.width <= 0 || Gradient.height != 1) {
        console.error('Invalid dimensions for the gradient image:', Gradient.width, Gradient.height);
        return null;
    }
	
	const width = IMG.width;
    const height = IMG.height;
    const gradientWidth = Gradient.width;
	
    const C = CreateCanvas(width, height);
    const c = C.getContext("2d");
    c.drawImage(IMG, 0, 0, width, height);

    const I = c.getImageData(0, 0, width, height);
    const d = I.data;

    const gradientC = CreateCanvas(gradientWidth, 1);
    const gradientCtx = gradientC.getContext("2d");
    gradientCtx.drawImage(Gradient, 0, 0, gradientWidth, 1);

    const gradientI = gradientCtx.getImageData(0, 0, gradientWidth, 1);
    const gradientData = gradientI.data;

    for (let i = 0; i < d.length; i += 4) {
        const grayValue = d[i];
        const gradientIndex = Math.floor((grayValue / 255) * (gradientWidth - 1));

        d[i    ] = gradientData[gradientIndex * 4    ];
        d[i + 1] = gradientData[gradientIndex * 4 + 1];
        d[i + 2] = gradientData[gradientIndex * 4 + 2];
		d[i + 3] = Math.min(d[i + 3],gradientData[gradientIndex * 4 + 3]);
    }

    c.putImageData(I, 0, 0);

    const newImg = await GetImageFromCanvas(C);

    document.body.removeChild(C);
    document.body.removeChild(gradientC);

    return newImg;
}

async function ResizeTexture(img,w,h,m = "nearest"){
    if (w <= 0 || h <= 0) {
        console.error('Invalid dimensions:', w, h);
        return img;
    }

    const C = CreateCanvas(w, h);
    const c = C.getContext("2d");

    if (m === 'nearest') {
        c.imageSmoothingEnabled = false;
        c.drawImage(img, 0, 0, w, h);
    } else {
        console.error('Unsupported resize method:', m);
        return img;
    }

    const newImg = await GetImageFromCanvas(C);

    document.body.removeChild(C);

    return newImg;
}

async function InvertTexture(img){
    const width = img.width;
    const height = img.height;

    const C = CreateCanvas(width, height);
    const c = C.getContext("2d");
    c.drawImage(img, 0, 0, width, height);

    const I = c.getImageData(0, 0, width, height);
    const d = I.data;

    for (let i = 0; i < d.length; i += 4) {
        d[i    ] = 255 - d[i    ];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
    }

    c.putImageData(I, 0, 0);

    const newImg = await GetImageFromCanvas(C);

    document.body.removeChild(C);

    return newImg;
}

var NotFoundTexture = "resources/textures/notfound.png";
async function ReadImage(Path,x,y,w,h){
	const R = await FetchURL(Path,NotFoundTexture,x);
	AB = await R.arrayBuffer();
	if (x!=null&&x!=true){
		AB = await CropImage(AB,x,y,w,h);
	}
	return AB;
}

async function ApplyTextureOption(IMG,N,Base,ID,V,V2,V3,V4){
	if(N=="Gradient"){
		return await ApplyGradient(IMG,await LoadIDTexture("gradient",V));
	}
	if(N=="Clear"){
		return await ClearTexture(IMG,V,V2,V3,V4);
	}
	if(N=="Resize"){
		return await ResizeTexture(IMG,V,V2);
	}
	if(N=="Invert"){
		return await InvertTexture(IMG);
	}
	if(N=="Overlay"){
		return await OverlayTexture(IMG,await LoadIDTexture(Base,V),V2,V3);
	}
	
	if(N=="Special_Update"){
		return await OverlayTexture(IMG,await LoadImage("resources/textures/update.png"),1,1);
	}
	
	console.log(`Texture option ${N} (${V}) for image ${IMG} not found! (when create ${Base} ${ID})`);
	return IMG;
}

async function GetIDTexture(Base,ID){
	var Info = ResourcePackInfo[Base][ID];
	if (Info==null){
		return await ReadImage(NotFoundTexture,true);
	}
	var T = Info["Texture"];
	var AB = await ReadImage("resources/"+T["Path"],T["x"],T["y"],T["w"],T["h"]);
	var Extra = Info["Extra"];
	if(FUN_ApplyToAllThatGradient!=""&&Base!="gradient"){
		Extra.push(["Gradient",FUN_ApplyToAllThatGradient]);
	}
	var Img = await LoadImageAB(AB);
	for (let i = 0; i < Extra.length; i++) {
		var pair    = Extra[i];
		var OName   = pair[0];
		var OValue  = pair[1];
		var OValue2 = pair[2];
		var OValue3 = pair[3];
		var OValue4 = pair[4];
		Img = await ApplyTextureOption(Img,OName,Base,ID,OValue,OValue2,OValue3,OValue4);
	}
	
	const C = CreateCanvas(Img.width, Img.height);
	const c = C.getContext("2d");
	c.drawImage(Img,0,0);
	const NewAB = await new Promise((resolve) => {
		C.toBlob((blob) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsArrayBuffer(blob);
		}, 'image/png');
	});
	document.body.removeChild(C);
	return NewAB;
}

async function LoadIDTexture(Base,ID){
	try {
		const AB = await GetIDTexture(Base,ID);
		return await LoadImageAB(AB);
	} catch (error) {
		console.error(`Error loading ${Base} texture from id ${ID}:`, error);
		throw error;
	}
}

function AddFile(f,FileName,Source){
	f.file(FileName,Source);
}

async function AddFileFetch(f,ImageName,Path){
	try {
		const R = await FetchURL(Path);
		const Source = await R.text();
		AddFile(f,ImageName,Source);
	} catch (error) {
		console.error(`Error fetching file ${Path}:`, error);
	}
}

async function AddImage(f,ImageName,Path,x,y,w,h){
	try {
		const AB = await ReadImage(Path,x,y,w,h);
		AddFile(f,ImageName,AB);
	} catch (error) {
		console.error(`Error fetching image ${Path}:`, error);
	}
}

//==========================================================//

async function CreateResourcePack(){
	var Assets = PackFolder.folder("assets");
	var Minecraft = Assets.folder("minecraft");
}

async function CreateTerrainPNG(){
	try {
		var Multiplyer = (FUN_BigTerrain?4:1);
		
		var C = CreateCanvas(256*Multiplyer, 256*Multiplyer);
		var c = C.getContext("2d");

		async function AddTile(x,y,tileName,extra){
			if (extra == null){ extra = {}; }
			console.log("Create terrain: " + tileName);
			if (extra["Ignore"]!=true){
				var m = (extra["32"]?32:16);
				c.clearRect(x*m, y*m, m, m);
				var tile = await LoadIDTexture((extra["Item"]==true?"item":"block"),tileName);
				c.drawImage(tile, x*16, y*16 - (extra["Top"]==true?(tileName.includes("cake")?8:7):0));
			}
		}
		
		var TID = VersionInfo["Terrain Atlas"];
		
		if(FUN_RandomTerrainBlocks){
			const IDs = Object.keys(ResourcePackInfo["block"]);
			for(var y = 0; y < 16*Multiplyer; y++){
				for(var x = 0; x < 16*Multiplyer; x++){
					await AddTile(x,y,IDs[Math.floor(Math.random()*IDs.length)]);
				}
			}
		}else{
			
			await AddTile(0 ,0,"grass");
			await AddTile(1 ,0,"stone");
			await AddTile(2 ,0,"dirt");
			await AddTile(3 ,0,"grass_side");
			await AddTile(4 ,0,"oak_planks");
			await AddTile(5 ,0,"slab_stone");
			await AddTile(6 ,0,"stone_smooth");
			await AddTile(7 ,0,"bricks");
			await AddTile(8 ,0,"tnt");
			await AddTile(9 ,0,"tnt_top");
			await AddTile(10,0,"tnt_bottom");
			await AddTile(11,0,"cobweb");
			await AddTile(12,0,"flower_rose");
			await AddTile(13,0,"flower_dandelion");
			await AddTile(14,0,"portal");
			await AddTile(15,0,"oak_sapling");
			
			await AddTile(0 ,1,"cobblestone");
			await AddTile(1 ,1,"bedrock");
			await AddTile(2 ,1,"sand");
			await AddTile(3 ,1,"gravel");
			await AddTile(4 ,1,"oak");
			await AddTile(5 ,1,"oak_top");
			await AddTile(6 ,1,"iron");
			await AddTile(7 ,1,"gold");
			await AddTile(8 ,1,"diamond");
			await AddTile(9 ,1,(TID<4?"":"emerald"));
			await AddTile(10,1,(TID<4?"":"redstone"));
			await AddTile(11,1,(TID<4?"":"dropper"));
			await AddTile(12,1,"mushroom_red");
			await AddTile(13,1,"mushroom_brown");
			await AddTile(14,1,"jungle_sapling");
			await AddTile(15,1,"fire");
			
			await AddTile(0 ,2,"ore_gold");
			await AddTile(1 ,2,"ore_iron");
			await AddTile(2 ,2,"ore_coal");
			await AddTile(3 ,2,"bookshelf");
			await AddTile(4 ,2,"cobblestone_moss");
			await AddTile(5 ,2,"obsidian");
			await AddTile(6 ,2,(TID==0?"iron":"grass_side_overlay"));
			await AddTile(7 ,2,(TID==0?"gold":"tallgrass"));
			await AddTile(8 ,2,(TID==0?"diamond":"dispenser_top"));
			await AddTile(9 ,2,(TID<4?"":"beacon"));
			await AddTile(10,2,(TID<4?"":"dropper_top"));
			await AddTile(11,2,"craftingtable");
			await AddTile(12,2,"furnace");
			await AddTile(13,2,"cobblestone_side");
			await AddTile(14,2,"dispenser");
			await AddTile(15,2,"fire_2");
			
			await AddTile(0 ,3,"sponge");
			await AddTile(1 ,3,"glass");
			await AddTile(2 ,3,"ore_diamond");
			await AddTile(3 ,3,"ore_redstone");
			await AddTile(4 ,3,"oak_leaves");
			await AddTile(5 ,3,"oak_leaves_fast");
			await AddTile(6 ,3,(TID==0?"iron":"bricks_stone"));
			await AddTile(7 ,3,(TID==0?"gold":"bush_dead"));
			await AddTile(8 ,3,(TID==0?"diamond":"fern"));
			await AddTile(9 ,3,(TID<4?"":"lightdetector_day"));
			await AddTile(10,3,(TID<4?"":"lightdetector"));
			await AddTile(11,3,"craftingtable_side");
			await AddTile(12,3,"craftingtable_side_2");
			await AddTile(13,3,"furnace_on");
			await AddTile(14,3,"cobblestone_top");
			await AddTile(15,3,"spruce_sapling");
			
			await AddTile(0 ,4,"wool");
			await AddTile(1 ,4,"spawner");
			await AddTile(2 ,4,"snow");
			await AddTile(3 ,4,"ice");
			await AddTile(4 ,4,"grass_side_snow");
			await AddTile(5 ,4,"cactus_top");
			await AddTile(6 ,4,"cactus");
			await AddTile(7 ,4,"cactus_bottom");
			await AddTile(8 ,4,"clay");
			await AddTile(9 ,4,"sugarcane");
			await AddTile(10,4,"jukebox_side");
			await AddTile(11,4,"jukebox");
			await AddTile(12,4,"waterlily");
			await AddTile(13,4,"mycelium_side");
			await AddTile(14,4,"mycelium");
			await AddTile(15,4,"birch_sapling");
			
			await AddTile(0 ,5,"torch");
			await AddTile(1 ,5,"oak_door");
			await AddTile(2 ,5,"iron_door");
			await AddTile(3 ,5,"ladder");
			await AddTile(4 ,5,(TID<2?"redstone_cross_off":"oak_trapdoor"));
			await AddTile(5 ,5,(TID<2?"redstone_line_off":"bars"));
			await AddTile(6 ,5,"farmland_wet");
			await AddTile(7 ,5,"farmland");
			await AddTile(8 ,5,"wheat_0");
			await AddTile(9 ,5,"wheat_1");
			await AddTile(10,5,"wheat_2");
			await AddTile(11,5,"wheat_3");
			await AddTile(12,5,"wheat_4");
			await AddTile(13,5,"wheat_5");
			await AddTile(14,5,"wheat_6");
			await AddTile(15,5,"wheat");
			
			await AddTile(0 ,6,"lever");
			await AddTile(1 ,6,"oak_door_bottom");
			await AddTile(2 ,6,"iron_door_bottom");
			await AddTile(3 ,6,"torch_redstone");
			await AddTile(4 ,6,(TID<2?"redstone_cross_on":"bricks_stone_moss"));
			await AddTile(5 ,6,(TID<2?"redstone_line_on":"bricks_stone_crack"));
			await AddTile(6 ,6,"pumpkin_top");
			await AddTile(7 ,6,"netherrack");
			await AddTile(8 ,6,"soulsand");
			await AddTile(9 ,6,"glowstone");
			await AddTile(10,6,"piston_slime");
			await AddTile(11,6,"piston");
			await AddTile(12,6,"piston_side");
			await AddTile(13,6,"piston_bottom");
			await AddTile(14,6,"piston_inner");
			await AddTile(15,6,"stem");
			
			await AddTile(0 ,7,"rail_corner");
			await AddTile(1 ,7,"wool_black");
			await AddTile(2 ,7,"wool_gray");
			await AddTile(3 ,7,"torch_redstone_off");
			await AddTile(4 ,7,"spruce");
			await AddTile(5 ,7,"birch");
			await AddTile(6 ,7,"pumpkin");
			await AddTile(7 ,7,"pumpkin_face");
			await AddTile(8 ,7,"pumpkin_face_on");
			await AddTile(9 ,7,"cake");
			await AddTile(10,7,"cake_side",(TID<3?{"Top":true}:null));
			await AddTile(11,7,"cake_inner",(TID<3?{"Top":true}:null));
			await AddTile(12,7,"cake_bottom");
			await AddTile(13,7,"mushroom_red_skin");
			await AddTile(14,7,"mushroom_brown_skin");
			await AddTile(15,7,"stem_corner");
			
			await AddTile(0 ,8,"rail");
			await AddTile(1 ,8,"wool_red");
			await AddTile(2 ,8,"wool_pink");
			await AddTile(3 ,8,"repeater");
			await AddTile(4 ,8,"spruce_leaves");
			await AddTile(5 ,8,"spruce_leaves_fast");
			await AddTile(6 ,8,"bed_foot");
			await AddTile(7 ,8,"bed_head");
			await AddTile(8 ,8,"watermelon");
			await AddTile(9 ,8,"watermelon_top");
			await AddTile(10,8,"cauldron_top");
			await AddTile(11,8,"cauldron_inner");
			await AddTile(12,8,"cake",{"Item":true});
			await AddTile(13,8,"mushroom_stem");
			await AddTile(14,8,"mushroom");
			await AddTile(15,8,"vine");
			
			await AddTile(0 ,9,"lapis");
			await AddTile(1 ,9,"wool_green");
			await AddTile(2 ,9,"wool_lime");
			await AddTile(3 ,9,"repeater_on");
			await AddTile(4 ,9,"glass_pane");
			await AddTile(5 ,9,"bed_foot_end",(TID<3?{"Top":true}:null));
			await AddTile(6 ,9,"bed_foot_side",(TID<3?{"Top":true}:null));
			await AddTile(7 ,9,"bed_head_side",(TID<3?{"Top":true}:null));
			await AddTile(8 ,9,"bed_head_end",(TID<3?{"Top":true}:null));
			await AddTile(9 ,9,"jungle");
			await AddTile(10,9,"cauldron");
			await AddTile(11,9,"cauldron_bottom");
			await AddTile(12,9,"brewingstand_base");
			await AddTile(13,9,"brewingstand");
			await AddTile(14,9,"endframe");
			await AddTile(15,9,"endframe_side");
			
			await AddTile(0 ,10,"ore_lapis");
			await AddTile(1 ,10,"wool_brown");
			await AddTile(2 ,10,"wool_yellow");
			await AddTile(3 ,10,"railgold");
			await AddTile(4 ,10,"redstone_cross");
			await AddTile(5 ,10,"redstone_line");
			await AddTile(6 ,10,"enchantmenttable");
			await AddTile(7 ,10,"dragonegg");
			await AddTile(8 ,10,"cocoa");
			await AddTile(9 ,10,"cocoa_1");
			await AddTile(10,10,"cocoa_0");
			await AddTile(11,10,"ore_emerald");
			await AddTile(12,10,"trip");
			await AddTile(13,10,"string");
			await AddTile(14,10,"endframe_eye");
			await AddTile(15,10,"endstone");
			
			await AddTile(0 ,11,"sandstone_smooth");
			await AddTile(1 ,11,"wool_blue");
			await AddTile(2 ,11,"wool_aqua");
			await AddTile(3 ,11,"railgold_on");
			await AddTile(4 ,11,"redstone_cross_overlay");
			await AddTile(5 ,11,"redstone_line_overlay");
			await AddTile(6 ,11,"enchantmenttable_side");
			await AddTile(7 ,11,"enchantmenttable_bottom");
			await AddTile(8 ,11,"command");
			await AddTile(9 ,11,"itemframe");
			await AddTile(10,11,"pot");
			await AddTile(11,11,"comparator");
			await AddTile(12,11,"comparator_on");
			await AddTile(13,11,"rail_activator");
			await AddTile(14,11,"rail_activator_on");
			await AddTile(15,11,"ore_quartz");
			
			await AddTile(0 ,12,"sandstone");
			await AddTile(1 ,12,"wool_purple");
			await AddTile(2 ,12,"wool_magenta");
			await AddTile(3 ,12,"rail_detector");
			await AddTile(4 ,12,"jungle_leaves");
			await AddTile(5 ,12,"jungle_leaves_fast");
			await AddTile(6 ,12,"spruce_planks");
			await AddTile(7 ,12,"jungle_planks");
			await AddTile(8 ,12,"potato_0");
			await AddTile(9 ,12,"potato_1");
			await AddTile(10,12,"potato_2");
			await AddTile(11,12,"carrot");
			await AddTile(12,12,"potato");
			await AddTile(13,12,"water_old");
			await AddTile(14,12,"water_flow_old",{"32":true});
			await AddTile(15,12,"",{"Ignore":true});
			
			await AddTile(0 ,13,"sandstone");
			await AddTile(1 ,13,"wool_cyan");
			await AddTile(2 ,13,"wool_orange");
			await AddTile(3 ,13,"lamp");
			await AddTile(4 ,13,"lamp_on");
			await AddTile(5 ,13,"bricks_stone_carved");
			await AddTile(6 ,13,"birch_planks");
			await AddTile(7 ,13,"anvil");
			await AddTile(8 ,13,"anvil_1");
			await AddTile(9 ,13,"quartz_carved_top");
			await AddTile(10,13,"quartz_pillar_top");
			await AddTile(11,13,"quartz");
			await AddTile(12,13,"hopper");
			await AddTile(13,13,"rail_detector_on");
			await AddTile(14,13,"",{"Ignore":true});
			await AddTile(15,13,"",{"Ignore":true});
			
			await AddTile(0 ,14,"netherbricks");
			await AddTile(1 ,14,"wool_silver");
			await AddTile(2 ,14,"wart_0");
			await AddTile(3 ,14,"wart_1");
			await AddTile(4 ,14,"wart_2");
			await AddTile(5 ,14,"sandstone_carved");
			await AddTile(6 ,14,"sandstone_smooth_carved");
			await AddTile(7 ,14,"anvil_0");
			await AddTile(8 ,14,"anvil_2");
			await AddTile(9 ,14,"quartz_carved");
			await AddTile(10,14,"quartz_pillar");
			await AddTile(11,14,"quartz");
			await AddTile(12,14,"hopper_inner");
			await AddTile(13,14,"lava");
			await AddTile(14,14,"lava_flow",{"32":true});
			await AddTile(15,14,"",{"Ignore":true});
			
			var TDT = (VersionInfo["Transparency Destroy Textures"]?"":"_old");
			await AddTile(0 ,15,"destroy_0"+TDT);
			await AddTile(1 ,15,"destroy_1"+TDT);
			await AddTile(2 ,15,"destroy_2"+TDT);
			await AddTile(3 ,15,"destroy_3"+TDT);
			await AddTile(4 ,15,"destroy_4"+TDT);
			await AddTile(5 ,15,"destroy_5"+TDT);
			await AddTile(6 ,15,"destroy_6"+TDT);
			await AddTile(7 ,15,"destroy_7"+TDT);
			await AddTile(8 ,15,"destroy_8"+TDT);
			await AddTile(9 ,15,"destroy_9"+TDT);
			await AddTile(10,15,"hay_side");
			await AddTile(11,15,"quartz_smooth");
			await AddTile(12,15,"cauldron_top");
			await AddTile(13,15,"hay");
			await AddTile(14,15,"",{"Ignore":true});
			await AddTile(15,15,"",{"Ignore":true});
		
		}

		await AddCanvas(PackFolder,"terrain.png",C);
	} catch (error) {
		console.error(`Error creating terrain PNG:`, error);
	}
}

async function CreateItemsPNG(f){
	try {
		var C = CreateCanvas(256, 256);
		var c = C.getContext("2d");

		async function AddItem(x,y,itemName){
			console.log("Create items: " + itemName);
			c.clearRect(x*16, y*16, 16, 16);
			if (itemName != ""){
				const item = await LoadIDTexture("item",itemName);
				c.drawImage(item, x*16, y*16);
			}
		}

		await AddItem(0 ,0,"leather_helmet");
		await AddItem(1 ,0,"chain_helmet");
		await AddItem(2 ,0,"iron_helmet");
		await AddItem(3 ,0,"diamond_helmet");
		await AddItem(4 ,0,"gold_helmet");
		await AddItem(5 ,0,"lighter");
		await AddItem(6 ,0,"flint");
		await AddItem(7 ,0,"coal");
		await AddItem(8 ,0,"string");
		await AddItem(9 ,0,"seeds");
		await AddItem(10,0,"apple");
		await AddItem(11,0,"apple_gold");
		await AddItem(12,0,"egg");
		await AddItem(13,0,"sugar");
		await AddItem(14,0,"snow");
		await AddItem(15,0,"slot_helmet");
		
		await AddItem(0 ,1,"leather_chest");
		await AddItem(1 ,1,"chain_chest");
		await AddItem(2 ,1,"iron_chest");
		await AddItem(3 ,1,"diamond_chest");
		await AddItem(4 ,1,"gold_chest");
		await AddItem(5 ,1,"bow");
		await AddItem(6 ,1,"brick");
		await AddItem(7 ,1,"iron");
		await AddItem(8 ,1,"feather");
		await AddItem(9 ,1,"wheat");
		await AddItem(10,1,"painting");
		await AddItem(11,1,"sugarcane");
		await AddItem(12,1,"bone");
		await AddItem(13,1,"cake");
		await AddItem(14,1,"slime");
		await AddItem(15,1,"slot_chest");
		
		await AddItem(0 ,2,"leather_pants");
		await AddItem(1 ,2,"chain_pants");
		await AddItem(2 ,2,"iron_pants");
		await AddItem(3 ,2,"diamond_pants");
		await AddItem(4 ,2,"gold_pants");
		await AddItem(5 ,2,"arrow");
		await AddItem(6 ,2,"endcrystal");
		await AddItem(7 ,2,"gold");
		await AddItem(8 ,2,"gunpowder");
		await AddItem(9 ,2,"bread");
		await AddItem(10,2,"oak_sign");
		await AddItem(11,2,"oak_door");
		await AddItem(12,2,"iron_door");
		await AddItem(13,2,"bed");
		await AddItem(14,2,"fire");
		await AddItem(15,2,"slot_pants");
		
		await AddItem(0 ,3,"leather_boots");
		await AddItem(1 ,3,"chain_boots");
		await AddItem(2 ,3,"iron_boots");
		await AddItem(3 ,3,"diamond_boots");
		await AddItem(4 ,3,"gold_boots");
		await AddItem(5 ,3,"stick");
		await AddItem(6 ,3,"compass");
		await AddItem(7 ,3,"diamond");
		await AddItem(8 ,3,"redstone");
		await AddItem(9 ,3,"clay");
		await AddItem(10,3,"paper");
		await AddItem(11,3,"book");
		await AddItem(12,3,"map_filled");
		await AddItem(13,3,"seeds_pumpkin");
		await AddItem(14,3,"seeds_watermelon");
		await AddItem(15,3,"slot_boots");
		
		await AddItem(0 ,4,"wood_sword");
		await AddItem(1 ,4,"stone_sword");
		await AddItem(2 ,4,"iron_sword");
		await AddItem(3 ,4,"diamond_sword");
		await AddItem(4 ,4,"gold_sword");
		await AddItem(5 ,4,"fishrod");
		await AddItem(6 ,4,"clock");
		await AddItem(7 ,4,"bowl");
		await AddItem(8 ,4,"stew");
		await AddItem(9 ,4,"glowstone");
		await AddItem(10,4,"bucket");
		await AddItem(11,4,"bucket_water");
		await AddItem(12,4,"bucket_lava");
		await AddItem(13,4,"bucket_milk");
		await AddItem(14,4,"ink");
		await AddItem(15,4,"gray");
		
		await AddItem(0 ,5,"wood_shovel");
		await AddItem(1 ,5,"stone_shovel");
		await AddItem(2 ,5,"iron_shovel");
		await AddItem(3 ,5,"diamond_shovel");
		await AddItem(4 ,5,"gold_shovel");
		await AddItem(5 ,5,"fishrod_empty");
		await AddItem(6 ,5,"repeater");
		await AddItem(7 ,5,"meat_pig");
		await AddItem(8 ,5,"meat_pig_cooked");
		await AddItem(9 ,5,"fish");
		await AddItem(10,5,"fish_cooked");
		await AddItem(11,5,"meat_rotten");
		await AddItem(12,5,"cookie");
		await AddItem(13,5,"shears");
		await AddItem(14,5,"red");
		await AddItem(15,5,"pink");
		
		await AddItem(0 ,6,"wood_pickaxe");
		await AddItem(1 ,6,"stone_pickaxe");
		await AddItem(2 ,6,"iron_pickaxe");
		await AddItem(3 ,6,"diamond_pickaxe");
		await AddItem(4 ,6,"gold_pickaxe");
		await AddItem(5 ,6,"");
		await AddItem(6 ,6,"fishrod_carrot");
		await AddItem(7 ,6,"leather");
		await AddItem(8 ,6,"saddle");
		await AddItem(9 ,6,"meat_cow");
		await AddItem(10,6,"meat_cow_cooked");
		await AddItem(11,6,"endereye");
		await AddItem(12,6,"blaze");
		await AddItem(13,6,"watermelon");
		await AddItem(14,6,"green");
		await AddItem(15,6,"lime");
		
		await AddItem(0 ,7,"wood_axe");
		await AddItem(1 ,7,"stone_axe");
		await AddItem(2 ,7,"iron_axe");
		await AddItem(3 ,7,"diamond_axe");
		await AddItem(4 ,7,"gold_axe");
		await AddItem(5 ,7,"");
		await AddItem(6 ,7,"potato_cooked");
		await AddItem(7 ,7,"potato");
		await AddItem(8 ,7,"carrot");
		await AddItem(9 ,7,"meat_chicken");
		await AddItem(10,7,"meat_chicken_cooked");
		await AddItem(11,7,"tear");
		await AddItem(12,7,"gold_nugget");
		await AddItem(13,7,"wart");
		await AddItem(14,7,"cocoa");
		await AddItem(15,7,"yellow");
		
		await AddItem(0 ,8,"wood_hoe");
		await AddItem(1 ,8,"stone_hoe");
		await AddItem(2 ,8,"iron_hoe");
		await AddItem(3 ,8,"diamond_hoe");
		await AddItem(4 ,8,"gold_hoe");
		await AddItem(5 ,8,"");
		await AddItem(6 ,8,"potato_rotten");
		await AddItem(7 ,8,"minecart");
		await AddItem(8 ,8,"boat");
		await AddItem(9 ,8,"watermelon_gold");
		await AddItem(10,8,"spidereye_fermented");
		await AddItem(11,8,"spidereye");
		await AddItem(12,8,"potion");
		await AddItem(13,8,"potion_overlay");
		await AddItem(14,8,"lapis");
		await AddItem(15,8,"aqua");
		
		await AddItem(0 ,9,"leather_helmet_overlay");
		await AddItem(1 ,9,"arrow_spectral");
		await AddItem(2 ,9,"horsearmor_iron");
		await AddItem(3 ,9,"horsearmor_diamond");
		await AddItem(4 ,9,"horsearmor_gold");
		await AddItem(5 ,9,"comparator");
		await AddItem(6 ,9,"carrot_gold");
		await AddItem(7 ,9,"minecart_chest");
		await AddItem(8 ,9,"pie");
		await AddItem(9 ,9,"spawn");
		await AddItem(10,9,"potion_splash");
		await AddItem(11,9,"endeye");
		await AddItem(12,9,"cauldron");
		await AddItem(13,9,"blaze_powder");
		await AddItem(14,9,"purple");
		await AddItem(15,9,"magenta");
		
		await AddItem(0 ,10,"leather_chest_overlay");
		await AddItem(1 ,10,"arrow_effect");
		await AddItem(2 ,10,"bottle_dragonbreath");
		await AddItem(3 ,10,"nametag");
		await AddItem(4 ,10,"leash");
		await AddItem(5 ,10,"netherbrick");
		await AddItem(6 ,10,"fish_clown");
		await AddItem(7 ,10,"minecart_furnace");
		await AddItem(8 ,10,"coal_wood");
		await AddItem(9 ,10,"spawn_overlay");
		await AddItem(10,10,"ruby");
		await AddItem(11,10,"bottle_xp");
		await AddItem(12,10,"brewingstand");
		await AddItem(13,10,"magma");
		await AddItem(14,10,"cyan");
		await AddItem(15,10,"orange");
		
		await AddItem(0 ,11,"leather_pants_overlay");
		await AddItem(1 ,11,"arrow_effect_overlay");
		await AddItem(2 ,11,"potion_lingering");
		await AddItem(3 ,11,"barrier");
		await AddItem(4 ,11,"meat_sheep");
		await AddItem(5 ,11,"meat_rabbit");
		await AddItem(6 ,11,"fish_puffer");
		await AddItem(7 ,11,"minecart_hopper");
		await AddItem(8 ,11,"hopper");
		await AddItem(9 ,11,"netherstar");
		await AddItem(10,11,"emerald");
		await AddItem(11,11,"book_writable");
		await AddItem(12,11,"book_written");
		await AddItem(13,11,"pot");
		await AddItem(14,11,"silver");
		await AddItem(15,11,"bonedust");
		
		await AddItem(0 ,12,"leather_boots_overlay");
		await AddItem(1 ,12,"beetroot");
		await AddItem(2 ,12,"seeds_beetroot");
		await AddItem(3 ,12,"stew_beetroot");
		await AddItem(4 ,12,"meat_sheep_cooked");
		await AddItem(5 ,12,"meat_rabbit_cooked");
		await AddItem(6 ,12,"fish_salmon");
		await AddItem(7 ,12,"minecart_tnt");
		await AddItem(8 ,12,"armorstand");
		await AddItem(9 ,12,"firework");
		await AddItem(10,12,"firework_base");
		await AddItem(11,12,"firework_base_overlay");
		await AddItem(12,12,"quartz");
		await AddItem(13,12,"map");
		await AddItem(14,12,"itemframe");
		await AddItem(15,12,"book_enchantment");
		
		await AddItem(0 ,13,"acacia_door");
		await AddItem(1 ,13,"birch_door");
		await AddItem(2 ,13,"darkoak_door");
		await AddItem(3 ,13,"jungle_door");
		await AddItem(4 ,13,"spruce_door");
		await AddItem(5 ,13,"stew_rabbit");
		await AddItem(6 ,13,"fish_salmon_cooked");
		await AddItem(7 ,13,"minecart_command");
		await AddItem(8 ,13,"acacia_boat");
		await AddItem(9 ,13,"birch_boat");
		await AddItem(10,13,"darkoak_boat");
		await AddItem(11,13,"jungle_boat");
		await AddItem(12,13,"spruce_boat");
		await AddItem(13,13,"prismarine");
		await AddItem(14,13,"prismarine_crystal");
		await AddItem(15,13,"");
		
		await AddItem(0 ,14,"skull");
		await AddItem(1 ,14,"skull_wither");
		await AddItem(2 ,14,"head_zombie");
		await AddItem(3 ,14,"head");
		await AddItem(4 ,14,"head_creeper");
		await AddItem(5 ,14,"rabbit_paw");
		await AddItem(6 ,14,"leather_rabbit");
		await AddItem(7 ,14,"");
		await AddItem(8 ,14,"");
		await AddItem(9 ,14,"");
		await AddItem(10,14,"");
		await AddItem(11,14,"");
		await AddItem(12,14,"");
		await AddItem(13,14,"");
		await AddItem(14,14,"");
		await AddItem(15,14,"enderdragon_fire");
		
		await AddItem(0 ,15,"record_13");
		await AddItem(1 ,15,"record_cat");
		await AddItem(2 ,15,"record_blocks");
		await AddItem(3 ,15,"record_chirp");
		await AddItem(4 ,15,"record_far");
		await AddItem(5 ,15,"record_mall");
		await AddItem(6 ,15,"record_mellohi");
		await AddItem(7 ,15,"record_stal");
		await AddItem(8 ,15,"record_strad");
		await AddItem(9 ,15,"record_ward");
		await AddItem(10,15,"record_11");
		await AddItem(11,15,"record_wait");
		await AddItem(12,15,"");
		await AddItem(13,15,"");
		await AddItem(14,15,"");
		await AddItem(15,15,"");

		await AddCanvas(f,"items.png",C);
	} catch (error) {
		console.error(`Error creating items PNG:`, error);
	}
}

async function CreateParticlesPNG(f,onlyClouds){
	try {
		var C = CreateCanvas(128, 128);
		var c = C.getContext("2d");

		async function AddParticle(x,y,particleName){
			console.log("Create particle: " + particleName);
			c.clearRect(x*8, y*8, 8, 8);
			if (particleName != ""){
				const particle = await LoadIDTexture("particle",particleName);
				c.drawImage(particle, x*8, y*8);
			}
		}
		
		await AddParticle(0 ,0,"cloud_0");
		await AddParticle(1 ,0,"cloud_1");
		await AddParticle(2 ,0,"cloud_2");
		await AddParticle(3 ,0,"cloud_3");
		await AddParticle(4 ,0,"cloud_4");
		await AddParticle(5 ,0,"cloud_5");
		await AddParticle(6 ,0,"cloud_6");
		await AddParticle(7 ,0,"cloud");
		
		if(onlyClouds!=true){
			await AddParticle(0 ,1,"watersplash_3");
			await AddParticle(1 ,1,"watersplash_1");
			await AddParticle(2 ,1,"watersplash_2");
			await AddParticle(3 ,1,"watersplash");
			await AddParticle(4 ,1,"watersplash_4");
			await AddParticle(5 ,1,"watersplash_5");
			await AddParticle(6 ,1,"watersplash_6");
			
			await AddParticle(0 ,2,"bubble");
			await AddParticle(1 ,2,"float");
			await AddParticle(4 ,2,"flash");
			
			await AddParticle(0 ,3,"fire");
			await AddParticle(1 ,3,"magma");
			
			await AddParticle(0 ,4,"note");
			await AddParticle(1 ,4,"crit");
			await AddParticle(2 ,4,"crit_magic");
			await AddParticle(3 ,4,"damage");
			
			await AddParticle(0 ,5,"heart");
			await AddParticle(1 ,5,"angry");
			await AddParticle(2 ,5,"happy");
			
			await AddParticle(0 ,7,"drop");
			await AddParticle(1 ,7,"drop_falling");
			await AddParticle(2 ,7,"drop_falled");
			
			await AddParticle(0 ,8,"potion_0");
			await AddParticle(1 ,8,"potion");
			await AddParticle(2 ,8,"potion_2");
			await AddParticle(3 ,8,"potion_3");
			await AddParticle(4 ,8,"potion_4");
			await AddParticle(5 ,8,"potion_5");
			await AddParticle(6 ,8,"potion_6");
			await AddParticle(7 ,8,"potion_7");
			
			await AddParticle(0 ,9,"potion_instant_0");
			await AddParticle(1 ,9,"potion_instant_1");
			await AddParticle(2 ,9,"potion_instant_2");
			await AddParticle(3 ,9,"potion_instant_3");
			await AddParticle(4 ,9,"potion_instant_4");
			await AddParticle(5 ,9,"potion_instant_5");
			await AddParticle(6 ,9,"potion_instant_6");
			await AddParticle(7 ,9,"potion_instant");
			
			await AddParticle(0 ,10,"firework_0");
			await AddParticle(1 ,10,"firework_1");
			await AddParticle(2 ,10,"firework_2");
			await AddParticle(3 ,10,"firework_3");
			await AddParticle(4 ,10,"firework");
			await AddParticle(5 ,10,"firework_5");
			await AddParticle(6 ,10,"firework_6");
			await AddParticle(7 ,10,"firework_7");
			
			await AddParticle(0 ,11,"endrod_0");
			await AddParticle(1 ,11,"endrod_1");
			await AddParticle(2 ,11,"endrod_2");
			await AddParticle(3 ,11,"endrod_3");
			await AddParticle(4 ,11,"endrod_4");
			await AddParticle(5 ,11,"endrod_5");
			await AddParticle(6 ,11,"endrod_6");
			await AddParticle(7 ,11,"endrod");
			
			await AddParticle(1 ,13,"enchantmenttable_up");
			await AddParticle(2 ,13,"enchantmenttable_down");
			await AddParticle(3 ,13,"enchantmenttable_jetta");
			await AddParticle(4 ,13,"enchantmenttable_wotta");
			await AddParticle(5 ,13,"enchantmenttable_bomb");
			await AddParticle(6 ,13,"enchantmenttable_zepta");
			await AddParticle(7 ,13,"enchantmenttable_blocky");
			await AddParticle(8 ,13,"enchantmenttable_void");
			await AddParticle(9 ,13,"enchantmenttable_singular");
			await AddParticle(10,13,"enchantmenttable_eye");
			await AddParticle(11,13,"enchantmenttable_spin");
			await AddParticle(12,13,"enchantmenttable_cube");
			await AddParticle(13,13,"enchantmenttable_func");
			await AddParticle(14,13,"enchantmenttable_lambda");
			await AddParticle(15,13,"enchantmenttable_hole");
			
			await AddParticle(0 ,14,"enchantmenttable_right");
			await AddParticle(1 ,14,"enchantmenttable_left");
			await AddParticle(2 ,14,"enchantmenttable_valve");
			await AddParticle(3 ,14,"enchantmenttable_jj");
			await AddParticle(4 ,14,"enchantmenttable_dot");
			await AddParticle(5 ,14,"enchantmenttable_line");
			await AddParticle(6 ,14,"enchantmenttable_selection");
			await AddParticle(7 ,14,"enchantmenttable_smile");
			await AddParticle(8 ,14,"enchantmenttable_del");
			await AddParticle(9 ,14,"enchantmenttable_pc");
			await AddParticle(10,14,"enchantmenttable_minecraft");
		}

		await AddCanvas(f,"particles.png",C);
	} catch (error) {
		console.error(`Error creating particles PNG:`, error);
	}
}

async function CreatePaintingsPNG(f){
	try {
		var C = CreateCanvas(256, 256);
		var c = C.getContext("2d");

		async function AddPainting(x,y,paintingName){
			console.log("Create painting: " + paintingName);
			if (paintingName != ""){
				const painting = await LoadIDTexture("painting",paintingName);
				c.drawImage(painting, x*16, y*16);
			}
		}

		await AddPainting(12,0,"backside");
		
		await AddPainting(0 ,0,"plains");
		await AddPainting(1 ,0,"desert");
		await AddPainting(2 ,0,"pavka");
		await AddPainting(3 ,0,"skull");
		await AddPainting(4 ,0,"red_ring");
		await AddPainting(5 ,0,"sunflower");
		await AddPainting(6 ,0,"pisechnik");
		await AddPainting(7 ,0,"");
		await AddPainting(8 ,0,"");
		await AddPainting(9 ,0,"");
		await AddPainting(10,0,"");
		await AddPainting(11,0,"");
		
		await AddPainting(0 ,2,"island");
		await AddPainting(2 ,2,"sunflower_plains");
		await AddPainting(4 ,2,"xp");
		await AddPainting(6 ,2,"desert_plains");
		await AddPainting(8 ,2,"overlay_2x1");
		
		await AddPainting(0 ,4,"mountains");
		await AddPainting(1 ,4,"wind_generator");
		
		await AddPainting(0 ,6,"overlay_4x2");
		
		await AddPainting(0 ,8,"cold_lake");
		await AddPainting(2 ,8,"sunny_mountains");
		await AddPainting(4 ,8,"overlay_2x2");
		await AddPainting(6 ,8,"overlay_2x2");
		await AddPainting(8 ,8,"overlay_2x2");
		await AddPainting(10,8,"overlay_2x2");
		
		await AddPainting(0 ,12,"br_dragonegg");
		await AddPainting(4 ,12,"br_jungle_tree");
		await AddPainting(8 ,12,"update");
		
		await AddPainting(12,4,"overlay_4x3");
		await AddPainting(12,7,"overlay_4x3");
		
		await AddCanvas(f,"kz.png",C);
	} catch (error) {
		console.error(`Error creating paintings PNG:`, error);
	}
}

async function CreateTexturePack(){
	var TID = VersionInfo["Texture ID"];
	
	var Art = PackFolder.folder("art");
	var Armor = PackFolder.folder("armor");
	var Environment = PackFolder.folder("environment");
	var Font = PackFolder.folder("font");
	var Gui = PackFolder.folder("gui");
	var Item = PackFolder.folder("item");
	var Misc = PackFolder.folder("misc");
	var Mob = PackFolder.folder("mob");
	var Terrain = (TID<13?PackFolder.folder("terrain"):null);
	var Title = PackFolder.folder("title");
	
	if(TID<13){
		if (VersionInfo["Terrain Atlas"] > -1){
			await CreateTerrainPNG();
			console.log("Terrain created!");
		}
		
		await CreateItemsPNG(Gui);
		console.log("Items created!");
	}else{
		var Textures = PackFolder.folder("textures");
		var Blocks = Textures.folder("blocks");
		var Items = Textures.folder("items");
		var MinecraftAssets = ResourcePackInfoAssets["Minecraft"];
		for(const Resource of MinecraftAssets){
			if(Resource[2]!=false||Resource[2]==true){
				var Paths = Resource[1];
				if(Paths[0][0] == -1){
					var Path = Paths[0][1];
					var Asset = Resource[0];
					var AssetType = Asset[0];
					var AssetFile = Asset[1];
					var PathSplit = Path.split('/');
					var SelectedFolder = (PathSplit[0]=="blocks"?Blocks:Items);
					var FileName = PathSplit[1];
					console.log("Loading: "+AssetFile[1]);
					if(AssetType=="texture"){
						AddFile(SelectedFolder,FileName,await GetIDTexture(AssetFile[0],AssetFile[1]));
					}
				}
			}
		}
	}
	
	async function L(f,n,b,p){
		console.log("Loading: "+p);
		var AB = await GetIDTexture(b,p);
		AddFile(f,n,AB);
	}
	
	await CreateParticlesPNG(PackFolder);
	if(TID>=3){
		await CreateParticlesPNG(Gui,true);
	}
	await L(Armor,"chain_1.png","armor","chain");
	await L(Armor,"chain_2.png","armor","chain_pants");
	if(TID<12){
		await L(Armor,"cloth_1.png","armor","leather_old");
		await L(Armor,"cloth_2.png","armor","leather_pants_old");
	}else{
		await L(Armor,"cloth_1.png","armor","leather");
		await L(Armor,"cloth_2.png","armor","leather_pants");
	}
	await L(Armor,"diamond_1.png","armor","diamond");
	await L(Armor,"diamond_2.png","armor","diamond_pants");
	await L(Armor,"gold_1.png","armor","gold");
	await L(Armor,"gold_2.png","armor","gold_pants");
	await L(Armor,"iron_1.png","armor","iron");
	await L(Armor,"iron_2.png","armor","iron_pants");
	await CreatePaintingsPNG(Art);
	await L(Environment,"clouds.png","environment","clouds");
	await L(Environment,"rain.png","environment","rain");
	await L(Environment,"snow.png","environment","snow");
	await L(Font,"default.png","font","ascii");
	await L(Gui,"background.png","gui","background");
	await L(Gui,"container.png","gui","chest");
	await L(Gui,"crafting.png","gui","craftingtable");
	await L(Gui,"furnace.png","gui","furnace");
	await L(Gui,"gui.png","gui","widgets");
	await L(Gui,"icons.png","gui","icons");
	await L(Gui,"inventory.png","gui","inventory_alpha");
	if(TID<7){
		await L(Gui,"logo.png","gui","title_line");
	}
	await L(Gui,"unknown_pack.png","gui","unknown");
	await L(Item,"arrows.png","entity","arrow");
	await L(Item,"boat.png","entity","boat");
	await L(Item,"cart.png","entity","minecart");
	await L(Item,"sign.png","entity","oak_sign");
	await L(Misc,"dial.png","other","dial");
	await L(Misc,"foliagecolor.png","environment","colormap_foliage");
	await L(Misc,"grasscolor.png","environment","colormap_grass");
	await L(Misc,"pumpkinblur.png","gui","overlay_pumpkin");
	await L(Misc,"shadow.png","particle","shadow");
	await L(Misc,"vignette.png","other","vignette");
	await L(Misc,"water.png","block","water_old");
	await L(Mob,"char.png","mob","player_old");
	await L(Mob,"chicken.png","mob","chicken");
	await L(Mob,"cow.png","mob","cow");
	await L(Mob,"creeper.png","mob","creeper");
	await L(Mob,"ghast.png","mob","ghast");
	await L(Mob,"ghast_fire.png","mob","ghast_shooting");
	await L(Mob,"pig.png","mob","pig");
	if(TID>=12){
		await L(Mob,"pigzombie.png","mob","zombie_pig");
	}else{
		await L(Mob,"pigzombie.png","mob","zombie_pig_old");
	}
	await L(Mob,"saddle.png","mob","pig_saddle");
	await L(Mob,"sheep.png","mob","sheep");
	await L(Mob,"sheep_fur.png","mob","sheep_overlay");
	await L(Mob,"skeleton.png","mob","skeleton");
	await L(Mob,"slime.png","mob","slime");
	await L(Mob,"spider.png","mob","spider");
	await L(Mob,"spider_eyes.png","mob","spider_eyes");
	if(TID>=12){
		await L(Mob,"zombie.png","mob","zombie");
	}else{
		await L(Mob,"zombie.png","mob","zombie_old");
	}
	if(TID<13){
		await L(Terrain,"moon.png","environment","moon");
		await L(Terrain,"sun.png","environment","sun");
	}
	await L(Title,"mojang.png","gui","loadingscreen_white");
	/* добавить сплеши */
	if(TID>=1){
		await L(Gui,"trap.png","gui","dispenser");
		await L(Mob,"squid.png","mob","squid");
		if(TID>=3){
			var Achievement = PackFolder.folder("achievement");
			await L(Mob,"wolf.png","mob","wolf");
			await L(Mob,"wolf_angry.png","mob","wolf_angry");
			if(TID>=12){
				await L(Mob,"wolf_tame.png","mob","wolf_pet");
			}else{
				await L(Mob,"wolf_tame.png","mob","wolf_pet_old");
			}
			await L(Title,"mclogo.png","gui","title_default");
			if(TID>=4){
				await L(Armor,"power.png","mob","creeper_power");
				await L(Achievement,"bg.png","gui","achievements_old");
				await L(Gui,"slot.png","gui","stats");
				if(TID>=5){
					await L(Misc,"mapbg.png","gui","map");
					await L(Misc,"mapicons.png","gui","map_icons_old");
					await L(Misc,"watercolor.png","environment","colormap_water");
					if(TID>=6){
						await L(Mob,"silverfish.png","mob","silverfish");
						if(TID>=7){
							/* текстура света, light_normal в environment */
							await L(Gui,"allitems.png","gui",(TID>=11?"creative_tabs":"creative_old"));
							await L(Gui,"crash_logo.png","gui","crash");
							await L(Item,"chest.png","entity","chest");
							await L(Item,"largechest.png","entity","chest_double");
							await L(Item,"xporb.png","particle","xp");
							await L(Misc,"explosion.png","particle","explosion");
							await L(Mob,"cavespider.png","mob","spider_cave");
							await L(Mob,"enderman.png","mob","enderman");
							await L(Mob,"enderman_eyes.png","mob","enderman_eyes");
							var TitleBG = Title.folder("bg");
							await L(TitleBG,"panorama0.png","other","panorama_mainmenu_0");
							await L(TitleBG,"panorama1.png","other","panorama_mainmenu_1");
							await L(TitleBG,"panorama2.png","other","panorama_mainmenu_2");
							await L(TitleBG,"panorama3.png","other","panorama_mainmenu_3");
							await L(TitleBG,"panorama4.png","other","panorama_mainmenu_4");
							await L(TitleBG,"panorama5.png","other","panorama_mainmenu_5");
							if(TID>=8){
								/* добавлен шрифт alternate */
								/* добавлены иконки эффектов в инвенторе */
								/* появились кредиты, победный текст и т.д */
								await L(Gui,"alchemy.png","gui","brewingstand");
								await L(Gui,"enchant.png","gui","enchantmenttable");
								await L(Item,"book.png","particle","book");
								await L(Misc,"glint.png","other","enchant");
								await L(Misc,"tunnel.png","other","sky_end");
								await L(Misc,"particlefield.png","environment","endportal");
								var EnderDragon = Mob.folder("enderdragon");
								await L(EnderDragon,"beam.png","particle","beam_endcrystal");
								await L(EnderDragon,"crystal.png","entity","endcrystal");
								await L(EnderDragon,"ender.png","mob","enderdragon");
								await L(EnderDragon,"ender_eyes.png","mob","enderdragon_eyes");
								await L(EnderDragon,"shuffle.png","mob","enderdragon_exploding");
								var Villager = Mob.folder("villager");
								await L(Villager,"butcher.png","mob","villager_old_butcher");
								await L(Villager,"farmer.png","mob","villager_old_farmer");
								await L(Villager,"librarian.png","mob","villager_old_librarian");
								await L(Villager,"priest.png","mob","villager_old_priest");
								await L(Villager,"smith.png","mob","villager_old_smith");
								await L(Villager,"villager.png","mob","villager_old");
								await L(Mob,"fire.png","mob","blaze");
								await L(Mob,"lava.png","mob","magma");
								await L(Mob,"redcow.png","mob","cow_red");
								if(TID<13){
									await L(Terrain,"moon_phases.png","environment","moon_phases");
								}
								if(TID>=9){
									/* добавили юникод */
									if(TID>=10){
										await L(Mob,"ozelot.png","mob","ocelot");
										await L(Mob,"cat_black.png","mob","cat_black");
										await L(Mob,"cat_red.png","mob","cat");
										await L(Mob,"cat_siamese.png","mob","cat_siamese");
										await L(Mob,"villager_golem.png","mob","golem_iron");
										await L(Mob,"snowman.png","mob","golem_snow");
										if(TID>=11){
											var CreativeInv = Gui.folder("creative_inv");
											await L(CreativeInv,"list_items.png","gui","creative");
											await L(CreativeInv,"search.png","gui","creative_search");
											await L(CreativeInv,"survival_inv.png","gui","creative_inventory");
											await L(Gui,"book.png","gui","book");
											await L(Gui,"demo_bg.png","gui","demo");
											await L(Gui,"trading.png","gui","villager");
											await L(Item,"enderchest.png","entity","chest_ender");
											if(TID>=12){
												await L(Armor,"cloth_1_b.png","armor","leather_overlay");
												await L(Armor,"cloth_2_b.png","armor","leather_pants_overlay");
												await L(Armor,"witherarmor.png","mob","wither_power");
												await L(Misc,"beam.png","particle","beam");
												await L(Villager,"witch.png","mob","witch");
												await L(Mob,"bat.png","mob","bat");
												await L(Mob,"skeleton_wither.png","mob","skeleton_wither");
												await L(Mob,"wither.png","mob","wither");
												await L(Mob,"wither_invul.png","mob","wither_invulnerable");
												await L(Mob,"wolf_collar.png","mob","wolf_pet_overlay");
												await L(Mob,"zombie_villager.png","mob","zombie_villager");
												if(TID>=13){
													await L(Environment,"moon.png","environment","moon");
													await L(Environment,"moon_phases.png","environment","moon_phases");
													await L(Environment,"sun.png","environment","sun");
													await L(Gui,"hopper.png","gui","hopper");
													await L(Gui,"repair.png","gui","anvil");
													var Chests = Item.folder("chests");
													await L(Chests,"trap_small.png","entity","chest_trap");
													await L(Chests,"trap_large.png","entity","chest_trap_double");
													await L(Item,"xmaschest.png","entity","chest_xmas");
													await L(Item,"largexmaschest.png","entity","chest_xmas_double");
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

async function CreatePack(PackInfo) {
	if (!PackConstructorScriptsLoaded){
		console.log("Wait for the scripts to load!");
		return;
	}
	
	if (CreatingPack) {
		console.log("Wait for the last download pack!");
		return;
	}
	CreatingPack = true;
	
	await UpdateGithubCommitInfo();
	
	SelectedVersion = PackInfo["Version"];
	
	console.log("Start generate pack from version [" + SelectedVersion + "] from [" + LastCommitVersion + "]");
	
	VersionInfo = PackInfo["VersionInfo"];
	var ThatTexturePack = VersionInfo["ThatTexturePack"];
	
	ZipResult = new JSZip();
	
	const MainFolder = ZipResult.folder(ThatTexturePack?"texturepacks":"resourcepacks");
	PackFolder = (ThatTexturePack?new JSZip():MainFolder.folder("BloodRaw"));
	
	await AddFileFetch(PackFolder,"license.txt","license.txt");
	AddFile(PackFolder,"update-info.txt",CommitDescription);
	await AddFileFetch(PackFolder,"Site.url","Site.url");
	
	AddFile(PackFolder,"pack." + (ThatTexturePack?"txt":"mcmeta"),(ThatTexturePack?SelectedVersion + " | " + LastCommitVersion + " (Generated)" + (ThatFunVersion?" (Fun)":"") + " ©":
`{
	"pack": {
		"pack_format": ` + VersionInfo["Pack Format"] + `,
		"description": "Version ` + SelectedVersion + `\\nBy Woowz11\\n` + LastCommitVersion + ` (Generated)` + (ThatFunVersion?" (Fun)":"") + ` ©"
	}
}`));
	
	await AddImage(PackFolder,"pack.png","pack.png");
	
	if (ThatTexturePack){
		await CreateTexturePack();
		const TexturePackZip = await PackFolder.generateAsync({type: "blob"});
		AddFile(MainFolder,"BloodRaw.zip",TexturePackZip);
	}else{
		await CreateResourcePack();
	}
	
	DownloadPack();
}