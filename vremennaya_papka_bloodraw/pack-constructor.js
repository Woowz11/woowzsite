const JSZipScript = document.createElement("script")
JSZipScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js";
JSZipScript.async = true;
document.head.appendChild(JSZipScript);

PackVersions = {};
PackVersions["Alpha 1.2.6"] = {
	"ThatTexturePack": true,
	"Terrain Atlas": 0,
	"Pack Format": 0,
	"Texture ID": 0
};

PackVersions["Beta 1.2"] = { ...PackVersions["Alpha 1.2.6"] };
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

PackVersions["Beta 1.7"] = { ...PackVersions["Beta 1.6"] };
PackVersions["Beta 1.7"]["Terrain Atlas"] = 3; /* Текстура кровати и торта опущена вниз */
PackVersions["Beta 1.7"]["Texture ID"] = 6;

PackVersions["Beta 1.8"] = { ...PackVersions["Beta 1.7"] };
PackVersions["Beta 1.8"]["Texture ID"] = 7;

PackVersions["1.0"] = { ...PackVersions["Beta 1.8"] };
PackVersions["1.0"]["Texture ID"] = 8;

PackVersions["1.1"] = { ...PackVersions["1.0"] };
PackVersions["1.1"]["Texture ID"] = 9;

PackVersions["1.2.1"] = { ...PackVersions["1.1"] };
PackVersions["1.2.1"]["Texture ID"] = 10;

PackVersions["1.3.1"] = { ...PackVersions["1.2.1"] };
PackVersions["1.3.1"]["Texture ID"] = 11;

PackVersions["1.4.2"] = { ...PackVersions["1.3.1"] };
PackVersions["1.4.2"]["Terrain Atlas"] = 4; /* Сундук теперь 3д модель */
PackVersions["1.4.2"]["Texture ID"] = 12;

PackVersions["1.5.2"] = { ...PackVersions["1.4.2"] };
PackVersions["1.5.2"]["Terrain Atlas"] = -1;
PackVersions["1.5.2"]["Texture ID"] = 13;

PackVersions["1.6.4"] = { ...PackVersions["1.5.2"] };
PackVersions["1.6.4"]["ThatTexturePack"] = false;
PackVersions["1.6.4"]["Pack Format"] = 1;

PackVersions["1.7.10"] = { ...PackVersions["1.6.4"] };

PackVersions["1.8"] = { ...PackVersions["1.7.10"] };

PackVersions["1.9"] = { ...PackVersions["1.8"] };
PackVersions["1.9"]["Pack Format"] = 2;

ZipResult = null;
SelectedVersion = null;
PackFolder = null;
VersionInfo = null;

LastCommitVersion = null;

function DownloadPack(){
	ZipResult.generateAsync({ type: "blob" }).then(function(content){
		const url = URL.createObjectURL(content);
		const a = document.createElement("a");
		a.href = url;
		a.download = "BloodRaw " + SelectedVersion + " [" + LastCommitVersion + "].zip";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	});
	console.log("Downloading...");
}

async function FetchURL(Path,IfNotFound = null){
	try {
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

async function ReadImage(Path){
	const R = await FetchURL(Path,"resources/notfound.png");
	const arrayBuffer = await R.arrayBuffer();
	return arrayBuffer;
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

async function AddImage(f,ImageName,Path){
	try {
		const AB = await ReadImage(Path);
		AddFile(f,ImageName,AB);
	} catch (error) {
		console.error(`Error fetching image ${Path}:`, error);
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

async function LoadImage(Path){
	try {
		const AB = await ReadImage(Path);
		const blob = new Blob([AB], { type: "image/png" });
		const url = URL.createObjectURL(blob);
		return await GetImageFromURL(url);
	} catch (error) {
		console.error(`Error loading image from path ${Path}:`, error);
		throw error;
	}
}

function CreateCanvas(W,H){
	var C = document.createElement("canvas");
	C.width = W;
	C.height = H;
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

//==========================================================//

async function CreateResourcePack(){
	var Assets = PackFolder.folder("assets");
	var Minecraft = Assets.folder("minecraft");
}

async function CreateTerrainPNG(){
	try {
		var C = CreateCanvas(256, 256);
		var c = C.getContext("2d");

		async function AddTile(x,y,tileName,extra){
			if (extra == null){ extra = {}; }
			console.log("Create terrain: " + tileName);
			c.clearRect(x*16, y*16, 16, 16);
			if (tileName != ""){
				var tilePath = "resources/textures/" + (extra["Item"]==true?"items":"blocks") + "/" + tileName + ".png";
				const tile = await LoadImage(tilePath);
				c.drawImage(tile, x*16, y*16 - (extra["Top"]==true?(tileName.includes("cake")?8:7):0));
			}
		}
		
		var TID = VersionInfo["Terrain Atlas"];
		
		await AddTile(0 ,0,"grass_top");
		await AddTile(1 ,0,"stone");
		await AddTile(2 ,0,"dirt");
		await AddTile(3 ,0,"grass_side");
		await AddTile(4 ,0,"oak_planks");
		await AddTile(5 ,0,"stone_smooth_side");
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
		await AddTile(10,1,(TID<4?"":""));
		await AddTile(11,1,(TID<4?"":""));
		await AddTile(12,1,"mushroom_red");
		await AddTile(13,1,"mushroom_brown");
		await AddTile(14,1,"jungle_sapling");
		await AddTile(15,1,"fire");
		
		await AddTile(0 ,2,"ore_gold");
		await AddTile(1 ,2,"ore_iron");
		await AddTile(2 ,2,"ore_coal");
		await AddTile(3 ,2,"bookshelf");
		await AddTile(4 ,2,"cobblestone_mossy");
		await AddTile(5 ,2,"obsidian");
		await AddTile(6 ,2,(TID==0?"iron":"grass_side_overlay"));
		await AddTile(7 ,2,(TID==0?"gold":"tallgrass"));
		await AddTile(8 ,2,(TID==0?"diamond":""));
		await AddTile(9 ,2,(TID<4?"":"beacon"));
		await AddTile(10,2,(TID<4?"":""));
		await AddTile(11,2,"craftingtable");
		await AddTile(12,2,"furnace");
		await AddTile(13,2,"cobblestone_side");
		await AddTile(14,2,"dispenser");
		await AddTile(15,2,"fire2");
		
		await AddTile(0 ,3,"sponge");
		await AddTile(1 ,3,"glass");
		await AddTile(2 ,3,"ore_diamond");
		await AddTile(3 ,3,"ore_redstone");
		await AddTile(4 ,3,"oak_leaves");
		await AddTile(5 ,3,"oak_leaves_fast");
		await AddTile(6 ,3,(TID==0?"iron":"stonebricks"));
		await AddTile(7 ,3,(TID==0?"gold":"bushdead"));
		await AddTile(8 ,3,(TID==0?"diamond":"fern"));
		await AddTile(9 ,3,(TID<4?"":""));
		await AddTile(10,3,(TID<4?"":""));
		await AddTile(11,3,"craftingtable_side");
		await AddTile(12,3,"craftingtable_side2");
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
		await AddTile(10,4,"jukebox");
		await AddTile(11,4,"jukebox_top");
		await AddTile(12,4,"waterlily");
		await AddTile(13,4,"mycelium_side");
		await AddTile(14,4,"mycelium");
		await AddTile(15,4,"birch_sapling");
		
		await AddTile(0 ,5,"torch");
		await AddTile(1 ,5,"oak_door_top");
		await AddTile(2 ,5,"iron_door_top");
		await AddTile(3 ,5,"ladder");
		await AddTile(4 ,5,(TID<2?"redstone_dust":"oak_trapdoor"),(TID<2?{"Redstone":true}:null));
		await AddTile(5 ,5,(TID<2?"redstone_dust_line":"bars"),(TID<2?{"Redstone":true}:null));
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
		await AddTile(1 ,6,"oak_door");
		await AddTile(2 ,6,"iron_door");
		await AddTile(3 ,6,"torch_redstone");
		await AddTile(4 ,6,(TID<2?"redstone_dust":"stonebricks_mossy"),(TID<2?{"Redstone On":true}:null));
		await AddTile(5 ,6,(TID<2?"redstone_dust_line":"stonebricks_cracked"),(TID<2?{"Redstone On":true}:null));
		await AddTile(6 ,6,"pumpkin_top");
		await AddTile(7 ,6,"netherrack");
		await AddTile(8 ,6,"soulsand");
		await AddTile(9 ,6,"glowstone");
		await AddTile(10,6,"piston_top_slime");
		await AddTile(11,6,"piston_top");
		await AddTile(12,6,"piston");
		await AddTile(13,6,"piston_bottom");
		await AddTile(14,6,"piston_inner");
		await AddTile(15,6,"stem");
		
		await AddTile(0 ,7,"rail_turned");
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
		await AddTile(13,7,"mushroom_block_red");
		await AddTile(14,7,"mushroom_block_brown");
		await AddTile(15,7,"stem_turned");
		
		await AddTile(0 ,8,"rail");
		await AddTile(1 ,8,"wool_red");
		await AddTile(2 ,8,"wool_pink");
		await AddTile(3 ,8,"repeater");
		await AddTile(4 ,8,"spruce_leaves");
		await AddTile(5 ,8,"spruce_leaves_fast");
		await AddTile(6 ,8,"bed_feet");
		await AddTile(7 ,8,"bed_head");
		await AddTile(8 ,8,"watermelon");
		await AddTile(9 ,8,"watermelon_top");
		await AddTile(10,8,"cauldron_top");
		await AddTile(11,8,"cauldron_inner");
		await AddTile(13,8,"cake",{"Item":true});
		await AddTile(14,8,"mushroom_block");
		await AddTile(15,8,"vine");
		
		await AddTile(0 ,9,"lapis");
		await AddTile(1 ,9,"wool_green");
		await AddTile(2 ,9,"wool_lime");
		await AddTile(3 ,9,"repeater_on");
		await AddTile(4 ,9,"glass_pane");
		await AddTile(5 ,9,"bed_feet_end",(TID<3?{"Top":true}:null));
		await AddTile(6 ,9,"bed_side",(TID<3?{"Top":true}:null));
		await AddTile(7 ,9,"bed_side2",(TID<3?{"Top":true}:null));
		await AddTile(8 ,9,"bed_head_end",(TID<3?{"Top":true}:null));
		await AddTile(9 ,9,"jungle");
		await AddTile(10,9,"cauldron");
		await AddTile(11,9,"cauldron_bottom");
		await AddTile(12,9,"brewingstand_base");
		await AddTile(13,9,"brewingstand");
		await AddTile(14,9,"endframe_top");
		await AddTile(15,9,"endframe");
		
		await AddTile(0 ,10,"ore_lapis");
		await AddTile(1 ,10,"wool_brown");
		await AddTile(2 ,10,"wool_yellow");
		await AddTile(3 ,10,"rail_golden");
		await AddTile(4 ,10,"redstone_dust");
		await AddTile(5 ,10,"redstone_dust_line");
		await AddTile(6 ,10,"enchantingtable_top");
		await AddTile(7 ,10,"dragonegg");
		await AddTile(8 ,10,"cocoa");
		await AddTile(9 ,10,"cocoa_1");
		await AddTile(10,10,"cocoa_0");
		await AddTile(11,10,"ore_emerald");
		await AddTile(12,10,"trip");
		await AddTile(13,10,"string");
		await AddTile(14,10,"endframe_eye");
		await AddTile(15,10,"end_stone");
		
		await AddTile(0 ,11,"sandstone_smooth");
		await AddTile(1 ,11,"wool_blue");
		await AddTile(2 ,11,"wool_aqua");
		await AddTile(3 ,11,"rail_golden_on");
		await AddTile(4 ,11,"redstone_dust_overlay");
		await AddTile(5 ,11,"redstone_dust_line_overlay");
		await AddTile(6 ,11,"enchantingtable");
		await AddTile(7 ,11,"enchantingtable_bottom");
		await AddTile(8 ,11,"command");
		await AddTile(9 ,11,"itemframe");
		await AddTile(10,11,"pot");
		await AddTile(11,11,"comparator");
		await AddTile(12,11,"comparator_on");
		await AddTile(13,11,"");
		await AddTile(14,11,"");
		await AddTile(15,11,"ore_quartz");
		
		await AddTile(0 ,12,"sandstone");
		await AddTile(1 ,12,"wool_purple");
		await AddTile(2 ,12,"wool_magenta");
		await AddTile(3 ,12,"rail_detector");
		await AddTile(4 ,12,"jungle_leaves");
		await AddTile(5 ,12,"jungle_leaves_fast");
		await AddTile(6 ,12,"spruce_planks");
		await AddTile(7 ,12,"jungle_planks");
		await AddTile(8 ,12,"potatoes_0");
		await AddTile(9 ,12,"potatoes_1");
		await AddTile(10,12,"potatoes_2");
		await AddTile(11,12,"carrots");
		await AddTile(12,12,"potatoes");
		await AddTile(13,12,"water",{"Water":true});
		await AddTile(14,12,"water",{"Water":true});
		await AddTile(15,12,"water",{"Water":true});
		
		await AddTile(0 ,13,"sandstone");
		await AddTile(1 ,13,"wool_cyan");
		await AddTile(2 ,13,"wool_orange");
		await AddTile(3 ,13,"lamp");
		await AddTile(4 ,13,"lamp_on");
		await AddTile(5 ,13,"stonebricks_carved");
		await AddTile(6 ,13,"birch_planks");
		await AddTile(7 ,13,"anvil");
		await AddTile(8 ,13,"anvil_top_0");
		await AddTile(9 ,13,"");
		await AddTile(10,13,"");
		await AddTile(11,13,"");
		await AddTile(12,13,"");
		await AddTile(13,13,"");
		await AddTile(14,13,"water",{"Water":true});
		await AddTile(15,13,"water",{"Water":true});
		
		await AddTile(0 ,14,"netherbricks");
		await AddTile(1 ,14,"wool_silver");
		await AddTile(2 ,14,"wart_0");
		await AddTile(3 ,14,"wart_1");
		await AddTile(4 ,14,"wart");
		await AddTile(5 ,14,"sandstone_carved");
		await AddTile(6 ,14,"sandstone_smooth_carved");
		await AddTile(7 ,14,"anvil_top");
		await AddTile(8 ,14,"anvil_top_1");
		await AddTile(9 ,14,"");
		await AddTile(10,14,"");
		await AddTile(11,14,"");
		await AddTile(12,14,"");
		await AddTile(13,14,"lava");
		await AddTile(14,14,"lava");
		await AddTile(15,14,"lava");
		
		await AddTile(0 ,15,"destroy_0");
		await AddTile(1 ,15,"destroy_1");
		await AddTile(2 ,15,"destroy_2");
		await AddTile(3 ,15,"destroy_3");
		await AddTile(4 ,15,"destroy_4");
		await AddTile(5 ,15,"destroy_5");
		await AddTile(6 ,15,"destroy_6");
		await AddTile(7 ,15,"destroy_7");
		await AddTile(8 ,15,"destroy_8");
		await AddTile(9 ,15,"destroy_9");
		await AddTile(10,15,"");
		await AddTile(11,15,"");
		await AddTile(12,15,"");
		await AddTile(13,15,"");
		await AddTile(14,15,"lava");
		await AddTile(15,15,"lava");

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
				var itemPath = "resources/textures/items/" + itemName + ".png";
				const item = await LoadImage(itemPath);
				c.drawImage(item, x*16, y*16);
			}
		}

		await AddItem(0 ,0,"leather_helmet");
		await AddItem(1 ,0,"chainmail_helmet");
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
		await AddItem(15,0,"");
		
		await AddItem(0 ,1,"leather_chest");
		await AddItem(1 ,1,"chainmail_chest");
		await AddItem(2 ,1,"iron_chest");
		await AddItem(3 ,1,"diamond_chest");
		await AddItem(4 ,1,"gold_chest");
		await AddItem(5 ,1,"");
		await AddItem(6 ,1,"brick");
		await AddItem(7 ,1,"iron");
		await AddItem(8 ,1,"feather");
		await AddItem(9 ,1,"wheat");
		await AddItem(10,1,"painting");
		await AddItem(11,1,"sugarcane");
		await AddItem(12,1,"bone");
		await AddItem(13,1,"cake");
		await AddItem(14,1,"slime");
		await AddItem(15,1,"");
		
		await AddItem(0 ,2,"leather_pants");
		await AddItem(1 ,2,"chainmail_pants");
		await AddItem(2 ,2,"iron_pants");
		await AddItem(3 ,2,"diamond_pants");
		await AddItem(4 ,2,"gold_pants");
		await AddItem(5 ,2,"arrow");
		await AddItem(6 ,2,"");
		await AddItem(7 ,2,"gold");
		await AddItem(8 ,2,"gunpowder");
		await AddItem(9 ,2,"bread");
		await AddItem(10,2,"oak_sign");
		await AddItem(11,2,"oak_door");
		await AddItem(12,2,"iron_door");
		await AddItem(13,2,"bed_red");
		await AddItem(14,2,"fire");
		await AddItem(15,2,"");
		
		await AddItem(0 ,3,"leather_boots");
		await AddItem(1 ,3,"chainmail_boots");
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
		await AddItem(14,3,"seeds_melon");
		await AddItem(15,3,"");
		
		await AddItem(0 ,4,"");
		await AddItem(1 ,4,"");
		await AddItem(2 ,4,"");
		await AddItem(3 ,4,"");
		await AddItem(4 ,4,"");
		await AddItem(5 ,4,"fishingrod");
		await AddItem(6 ,4,"clock");
		await AddItem(7 ,4,"bowl");
		await AddItem(8 ,4,"bowl_stew");
		await AddItem(9 ,4,"glowstone");
		await AddItem(10,4,"bucket");
		await AddItem(11,4,"bucket_water");
		await AddItem(12,4,"bucket_lava");
		await AddItem(13,4,"bucket_milk");
		await AddItem(14,4,"ink");
		await AddItem(15,4,"gray");
		
		await AddItem(0 ,5,"");
		await AddItem(1 ,5,"");
		await AddItem(2 ,5,"");
		await AddItem(3 ,5,"");
		await AddItem(4 ,5,"");
		await AddItem(5 ,5,"fishingrod_cast");
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
		
		await AddItem(0 ,6,"");
		await AddItem(1 ,6,"");
		await AddItem(2 ,6,"");
		await AddItem(3 ,6,"");
		await AddItem(4 ,6,"");
		await AddItem(5 ,6,"");
		await AddItem(6 ,6,"fishingrod_carrot");
		await AddItem(7 ,6,"leather");
		await AddItem(8 ,6,"saddle");
		await AddItem(9 ,6,"meat_cow");
		await AddItem(10,6,"meat_cow_cooked");
		await AddItem(11,6,"enderpearl");
		await AddItem(12,6,"blaze");
		await AddItem(13,6,"watermelon");
		await AddItem(14,6,"green");
		await AddItem(15,6,"lime");
		
		await AddItem(0 ,7,"");
		await AddItem(1 ,7,"");
		await AddItem(2 ,7,"");
		await AddItem(3 ,7,"");
		await AddItem(4 ,7,"");
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
		
		await AddItem(0 ,8,"");
		await AddItem(1 ,8,"");
		await AddItem(2 ,8,"");
		await AddItem(3 ,8,"");
		await AddItem(4 ,8,"");
		await AddItem(5 ,8,"");
		await AddItem(6 ,8,"potato_poison");
		await AddItem(7 ,8,"minecart");
		await AddItem(8 ,8,"boat");
		await AddItem(9 ,8,"watermelon_gold");
		await AddItem(10,8,"spider_fermented");
		await AddItem(11,8,"spider");
		await AddItem(12,8,"bottle");
		await AddItem(13,8,"bottle_overlay");
		await AddItem(14,8,"lapis");
		await AddItem(15,8,"aqua");
		
		await AddItem(0 ,9,"leather_helmet_overlay");
		await AddItem(1 ,9,"");
		await AddItem(2 ,9,"");
		await AddItem(3 ,9,"");
		await AddItem(4 ,9,"");
		await AddItem(5 ,9,"comparator");
		await AddItem(6 ,9,"carrot_gold");
		await AddItem(7 ,9,"minecart_chest");
		await AddItem(8 ,9,"pie");
		await AddItem(9 ,9,"spawn");
		await AddItem(10,9,"bottle_splash");
		await AddItem(11,9,"enderpearl_eye");
		await AddItem(12,9,"cauldron");
		await AddItem(13,9,"blaze_powder");
		await AddItem(14,9,"purple");
		await AddItem(15,9,"magenta");
		
		await AddItem(0 ,10,"leather_chest_overlay");
		await AddItem(1 ,10,"");
		await AddItem(2 ,10,"");
		await AddItem(3 ,10,"");
		await AddItem(4 ,10,"");
		await AddItem(5 ,10,"netherbrick");
		await AddItem(6 ,10,"");
		await AddItem(7 ,10,"minecart_furnace");
		await AddItem(8 ,10,"");
		await AddItem(9 ,10,"spawn_overlay");
		await AddItem(10,10,"");
		await AddItem(11,10,"bottle_xp");
		await AddItem(12,10,"brewingstand");
		await AddItem(13,10,"magma");
		await AddItem(14,10,"cyan");
		await AddItem(15,10,"orange");
		
		await AddItem(0 ,11,"leather_pants_overlay");
		await AddItem(1 ,11,"");
		await AddItem(2 ,11,"");
		await AddItem(3 ,11,"");
		await AddItem(4 ,11,"");
		await AddItem(5 ,11,"");
		await AddItem(6 ,11,"");
		await AddItem(7 ,11,"");
		await AddItem(8 ,11,"");
		await AddItem(9 ,11,"netherstar");
		await AddItem(10,11,"emerald");
		await AddItem(11,11,"book_write");
		await AddItem(12,11,"book_written");
		await AddItem(13,11,"pot");
		await AddItem(14,11,"silver");
		await AddItem(15,11,"bone_powder");
		
		await AddItem(0 ,12,"leather_boots_overlay");
		await AddItem(1 ,12,"");
		await AddItem(2 ,12,"");
		await AddItem(3 ,12,"");
		await AddItem(4 ,12,"");
		await AddItem(5 ,12,"");
		await AddItem(6 ,12,"");
		await AddItem(7 ,12,"");
		await AddItem(8 ,12,"");
		await AddItem(9 ,12,"firework");
		await AddItem(10,12,"firework_charge");
		await AddItem(11,12,"firework_charge_overlay");
		await AddItem(12,12,"quartz");
		await AddItem(13,12,"map");
		await AddItem(14,12,"itemframe");
		await AddItem(15,12,"book_enchant");
		
		await AddItem(0 ,13,"");
		await AddItem(1 ,13,"");
		await AddItem(2 ,13,"");
		await AddItem(3 ,13,"");
		await AddItem(4 ,13,"");
		await AddItem(5 ,13,"");
		await AddItem(6 ,13,"");
		await AddItem(7 ,13,"");
		await AddItem(8 ,13,"");
		await AddItem(9 ,13,"");
		await AddItem(10,13,"");
		await AddItem(11,13,"");
		await AddItem(12,13,"");
		await AddItem(13,13,"");
		await AddItem(14,13,"");
		await AddItem(15,13,"");
		
		await AddItem(0 ,14,"head_skeleton");
		await AddItem(1 ,14,"head_wither");
		await AddItem(2 ,14,"head_zombie");
		await AddItem(3 ,14,"head_player");
		await AddItem(4 ,14,"head_creeper");
		await AddItem(5 ,14,"");
		await AddItem(6 ,14,"");
		await AddItem(7 ,14,"");
		await AddItem(8 ,14,"");
		await AddItem(9 ,14,"");
		await AddItem(10,14,"");
		await AddItem(11,14,"");
		await AddItem(12,14,"");
		await AddItem(13,14,"");
		await AddItem(14,14,"");
		await AddItem(15,14,"");
		
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

async function CreateTexturePack(){
	if (VersionInfo["Terrain Atlas"] > -1){
		await CreateTerrainPNG();
		console.log("Terrain created!");
	}
	
	var TID = VersionInfo["Texture ID"];
	
	var Art = PackFolder.folder("art");
	var Armor = PackFolder.folder("armor");
	var Environment = PackFolder.folder("environment");
	var Font = PackFolder.folder("font");
	var Gui = PackFolder.folder("gui");
	var Item = PackFolder.folder("item");
	var Misc = PackFolder.folder("misc");
	var Mob = PackFolder.folder("mob");
	var Terrain = PackFolder.folder("terrain");
	var Title = PackFolder.folder("title");
	
	await AddImage(PackFolder,"pacticles.png","resources/textures/particles/particles.png");
	await AddImage(Art,"kz.png","resources/textures/paintings/art.png");
	await AddImage(Environment,"clouds.png","resources/textures/environment/clouds.png");
	await AddImage(Environment,"rain.png","resources/textures/environment/rain.png");
	await AddImage(Environment,"snow.png","resources/textures/environment/snow.png");
	await AddImage(Font,"default.png","resources/textures/font/ascii.png");
	await AddImage(Gui,"container.png","resources/textures/gui/chest.png");
	await AddImage(Gui,"background.png","resources/textures/gui/background.png");
	await AddImage(Gui,"crafting.png","resources/textures/gui/craftingtable.png");
	await AddImage(Gui,"furnace.png","resources/textures/gui/furnace.png");
	await AddImage(Gui,"gui.png","resources/textures/gui/widgets.png");
	await AddImage(Gui,"icons.png","resources/textures/gui/icons.png");
	await AddImage(Gui,"inventory.png","resources/textures/gui/inventory.png");
	await AddImage(Gui,"unknown_pack.png","resources/textures/gui/unknown.png");
	await AddImage(Terrain,"moon.png","resources/textures/environment/moon.png");
	await AddImage(Terrain,"sun.png","resources/textures/environment/sun.png");
	await AddImage(Title,"mojang.png","resources/textures/gui/loading_screen_invert.png");
	await AddImage(Armor,"chain_1.png","resources/textures/armors/chainmail_1.png");
	await AddImage(Armor,"chain_2.png","resources/textures/armors/chainmail_2.png");
	await AddImage(Armor,"cloth_1.png","resources/textures/armors/leather_1.png");
	await AddImage(Armor,"cloth_2.png","resources/textures/armors/leather_2.png");
	await AddImage(Armor,"diamond_1.png","resources/textures/armors/diamond_1.png");
	await AddImage(Armor,"diamond_2.png","resources/textures/armors/diamond_2.png");
	await AddImage(Armor,"gold_1.png","resources/textures/armors/gold_1.png");
	await AddImage(Armor,"gold_2.png","resources/textures/armors/gold_2.png");
	await AddImage(Armor,"iron_1.png","resources/textures/armors/iron_1.png");
	await AddImage(Armor,"iron_2.png","resources/textures/armors/iron_2.png");
	await AddImage(Item,"arrows.png","resources/textures/entities/arrow.png");
	await AddImage(Item,"boat.png","resources/textures/entities/boat.png");
	await AddImage(Item,"cart.png","resources/textures/entities/minecart.png");
	await AddImage(Item,"sign.png","resources/textures/entities/oak_sign.png");
	await AddImage(Misc,"dial.png","resources/textures/items/clock_dial.png");
	await AddImage(Misc,"foliagecolor.png","resources/textures/environment/colormap_foliage.png");
	await AddImage(Misc,"grasscolor.png","resources/textures/environment/colormap_grass.png");
	await AddImage(Misc,"pumpkinblur.png","resources/textures/gui/overlay_pumpkin.png");
	await AddImage(Misc,"shadow.png","resources/textures/environment/shadow.png");
	await AddImage(Misc,"vignette.png","resources/textures/other/vignette.png");
	await AddImage(Misc,"water.png","resources/textures/blocks/water.png");
	await AddImage(Mob,"char.png","resources/textures/entities/player.png");
	await AddImage(Mob,"chicken.png","resources/textures/entities/chicken.png");
	await AddImage(Mob,"cow.png","resources/textures/entities/cow.png");
	await AddImage(Mob,"creeper.png","resources/textures/entities/creeper.png");
	await AddImage(Mob,"ghast.png","resources/textures/entities/ghast.png");
	await AddImage(Mob,"ghast_fire.png","resources/textures/entities/ghast_shooting.png");
	await AddImage(Mob,"pig.png","resources/textures/entities/pig.png");
	await AddImage(Mob,"pigzombie.png","resources/textures/entities/zombie_pig.png");
	await AddImage(Mob,"saddle.png","resources/textures/entities/pig_saddle.png");
	await AddImage(Mob,"sheep.png","resources/textures/entities/sheep.png");
	await AddImage(Mob,"sheep_fur.png","resources/textures/entities/sheep_fur.png");
	await AddImage(Mob,"skeleton.png","resources/textures/entities/skeleton.png");
	await AddImage(Mob,"slime.png","resources/textures/entities/slime.png");
	await AddImage(Mob,"spider.png","resources/textures/entities/spider.png");
	await AddImage(Mob,"spider_eyes.png","resources/textures/entities/spider_eyes.png");
	await AddImage(Mob,"squid.png","resources/textures/entities/squid.png");
	await AddImage(Mob,"zombie.png","resources/textures/entities/zombie.png");
	
	await CreateItemsPNG(Gui);
	console.log("Items created!");
	
	if(TID>0){
		
	}
}

async function CreatePack(PackInfo) {
	const CommitURL = "https://api.github.com/repos/Woowz11/BloodRaw-Minecraft/commits?per_page=1";
	var CommitDescription = "Fetch GitHub failed!\nSee for yourself: https://github.com/Woowz11/BloodRaw-Minecraft";
	try {
		const R = await fetch(CommitURL);
		if (!R.ok) {
            throw new Error(`Failed to fetch commits: ${R.statusText}`);
        }
		const D = await R.json();
		if (D.length > 0) {
			var CommitDescription = D[0].commit.message;
			var Splitted = CommitDescription.split("\n\n");
			LastCommitVersion = Splitted[0];
			CommitDescription = Splitted[1];
		} else {
			throw new Error('No commits found');
		}
	} catch(error) {
		console.error('Error fetching commit message:', error);
		LastCommitVersion = "Unknown";
	}
	
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
	
	AddFile(PackFolder,"pack." + (ThatTexturePack?"txt":"mcmeta"),(ThatTexturePack?SelectedVersion + " | " + LastCommitVersion + " (Generated)©":
`{
	"pack": {
		"pack_format": ` + VersionInfo["Pack Format"] + `,
		"description": "Version ` + SelectedVersion + `\\nBy Woowz11\\n` + LastCommitVersion + ` (Generated)©"
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