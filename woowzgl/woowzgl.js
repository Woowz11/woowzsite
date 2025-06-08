function log(message){
	console.log(
		"%cWOGL Info: %c" + message,
		"color: aqua; font-weight: bold;"
	);
}

function err(message){
	console.log(
		"%cWOGL Error: %c" + message,
		"color: red; font-weight: bold;"
	);
}

var TotalCanvasesHash = 0;
function GenerateHash(){
	TotalCanvasesHash++;
	return TotalCanvasesHash;
}

var Canvases = {};
var Info = {};
var ColorBuffers = {};
var Context = [null, null];

var T_old = performance.now();
var FrameCount = 0;
var FPS = 0;

var DefaultColor = [255,0,255,0];

const wogl = {

	/* Установить дефолтный цвет Canvas */
	SetDefaultColor: function(r,g,b,a){
		DefaultColor = [r,g,b,a];
	},

	/* Добавляет Canvas в рендер */
	AddCanvas: function(canvas){
		if(!canvas || canvas.tagName !== "CANVAS"){ err(`The specified canvas is not a canvas! AddCanvas(${canvas});`); } else {
			if(canvas.hasAttribute("wogl")){
				err(`Canvas is already wogl! AddCanvas(${canvas});`);
			}else{
				var hash = GenerateHash();
				canvas.setAttribute("wogl", hash);
				Canvases[hash] = canvas;
				Context = [hash, canvas];
				Info[hash] = {};
				log(`Canvas [${hash}] added!`);
				
				Info["resizeEvent"] = new ResizeObserver(es => {
					for (let e of es){
						const { width, height } = e.contentRect;
						var Buffer = new Uint8ClampedArray(width * height * 4);
						for (let i = 0; i < width * height * 4; i += 4) {
							Buffer[i    ] = DefaultColor[0];
							Buffer[i + 1] = DefaultColor[1];
							Buffer[i + 2] = DefaultColor[2];
							Buffer[i + 3] = DefaultColor[3];
						}
						ColorBuffers[hash] = Buffer;
						console.log(Buffer);
					}
				});
				Info["resizeEvent"].observe(canvas);
			}
		}
	},
	
	/* Удаляет Canvas из рендера */
	RemoveCanvas: function(canvas){
		if(!canvas || canvas.tagName !== "CANVAS"){ err(`The specified canvas is not a canvas! RemoveCanvas(${canvas});`); } else {
			if(canvas.hasAttribute("wogl")){
				var hash = canvas.getAttribute("wogl");
				if(Canvases[hash]){
					delete Canvases[hash];
					delete ColorBuffers[hash];
					Context = [null, null];
					canvas.removeAttribute("wogl");
					log(`Canvas [${hash}] removed!`);
					
					Info["resizeEvent"].disconnect();
					delete Info[hash];
				}else{
					err(`The canvas has an incorrect wogl attribute! RemoveCanvas(${canvas});`);
				}
			}else{
				err(`The specified canvas is not a wogl canvas! RemoveCanvas(${canvas});`);
			}
		}
	},
	
	/* Устанавливает текущий контекст */
	SetContext: function(canvas){
		
	},
	
	/* Установить чистый цвет пикселя */
	SetClearPixel: function(x, y, color){
		var i = (y * Context[1].width + x) * 4;
		ColorBuffers[i    ] = color[0];
		ColorBuffers[i + 1] = color[1];
		ColorBuffers[i + 2] = color[2];
		ColorBuffers[i + 3] = color[3];
	},
	
	/* Получить кол-во фпс */
	GetFPS: function(){
		return FPS;
	}

};

function CalculateFPS(){
	const T_now = performance.now();
	FrameCount++;
	if (T_now >= T_old + 1000){
		FPS = FrameCount;
		FrameCount = 0;
		T_old = T_now;
	}
	requestAnimationFrame(CalculateFPS);
}
CalculateFPS();

function Render(){
	Object.entries(Canvases).forEach(([Hash, Canvas]) => {
		if(ColorBuffers[Hash]){
			var _2D = Canvas.getContext("2d");
			
			_2D.clearRect(0, 0, Canvas.width, Canvas.height);
			_2D.putImageData(new ImageData(
				ColorBuffers[Hash],
				Canvas.width,
				Canvas.height
			), 0, 0);
		}else{
			err("hi")
		}
	});
	
	requestAnimationFrame(Render);
}
Render();