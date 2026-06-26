console.log("Bootstrap game!")

const JT = {
	Input: {
		Mouse: {
			// Позиция мыши по X, в пикселях
			X : -1,
			// Позиция мыши по Y, в пикселях
			Y : -1,
			// Позиция мыши по X
			RX: -1,
			// Позиция мыши по Y
			RY: -1,
			// Мировая позиция мыши по X
			WX: -1,
			// Мировая позиция мыши по Y
			WY: -1,

			InWindow: false,

			// Зажатые клавиши мыши
			__Pressed: {},

			/**
			 * Клавиша мыши зажата?
			 * @param {number} Button Клавиша
			 * @returns {boolean} Зажата?
			 */
			IsPressed: function(Button){ return this.__Pressed[Button] === true }
		},

		Keyboard: {
			// Зажатые клавиши клавиатуры
			__Pressed: {},

			/**
			 * Клавиша клавиатуры зажата?
			 * @param {string} Key Клавиша
			 * @returns {boolean} Зажата?
			 */
			IsPressed: function(Key){ return this.__Pressed[Key] === true }
		}
	},

	Game: {
		Info: {
			Name: "JunkyardTycoon"
		},

		World: {
			ClientToWorld_Point: function(Point, Position){
				return Point + Position
			},

			ClientToWorld_X: function(X){
				return this.ClientToWorld_Point(X, JT.Game.Camera.X)
			},

			ClientToWorld_Y: function(Y){
				return this.ClientToWorld_Point(Y, JT.Game.Camera.Y)
			},

			ClientToWorld: function(X, Y){
				X = this.ClientToWorld_X(X)
				Y = this.ClientToWorld_Y(Y)
				return {X, Y}
			},

			WorldToClient: function(X, Y){
				// TODO
				throw new Error("TODO")
			}
		}
	},

	Graphic: {
		/** Ядро рендера
		 * @type PIXI.Application */
		Application: null,
		/** Canvas с рендером
		 * @type HTMLCanvasElement */
		Canvas: null,
		/** Главная сцена
		 * @type PIXI.Container */
		Scene: null,

		W: 0,
		H: 0,

		Layer: {
			/** @type PIXI.Container */
			Sky: null,
			/** @type PIXI.Container */
			World: null,
			/** @type PIXI.Container */
			Interface: null,
			/** @type PIXI.Container */
			Debug: null
		},

		Background: {
			Set: function(HEX){
				JT.Graphic.Application.renderer.backgroundColor = HEX
			},

			Get: function(){
				return JT.Graphic.Application.renderer.backgroundColor
			}
		}
	}
}

// ----------------------------------------------------------------------

document.title = `${JT.Game.Info.Name} - Loading`

// Список ивентов
const __EVENTS = {}

// ----------------------------------------------------------------------
// Создание графики

JT.Graphic.Application = new PIXI.Application({
	backgroundColor: 0x000000,
	antialias      : true,
	resolution     : window.devicePixelRatio || 1,
});
JT.Graphic.Canvas = JT.Graphic.Application.view
JT.Graphic.Scene  = JT.Graphic.Application.stage

// Добавление canvas графики на сайт
document.body.prepend(JT.Graphic.Canvas)

// ----------------------------------------------------------------------

JT.Graphic.Layer.Sky       = JT.Graphic.Scene.addChild(new PIXI.Container())
JT.Graphic.Layer.World     = JT.Graphic.Scene.addChild(new PIXI.Container())
JT.Graphic.Layer.Interface = JT.Graphic.Scene.addChild(new PIXI.Container())
JT.Graphic.Layer.Debug     = JT.Graphic.Scene.addChild(new PIXI.Container())

// ----------------------------------------------------------------------

JT.Graphic.Application.ticker.add((DT) => {
	__EVENTS.Tick(DT)

	JT.Input.Mouse.WX = JT.Game.World.ClientToWorld_X(JT.Input.Mouse.X)
	JT.Input.Mouse.WY = JT.Game.World.ClientToWorld_Y(JT.Input.Mouse.Y)
})

window.addEventListener("resize", () => __EVENTS.WindowResize(window.innerWidth, window.innerHeight))

window.addEventListener("mousemove", (e) => {
	const BoundingClientRect = JT.Graphic.Canvas.getBoundingClientRect();

	JT.Input.Mouse.X = (e.clientX - BoundingClientRect.left) * (JT.Graphic.Canvas.width  / BoundingClientRect.width )
	JT.Input.Mouse.Y = (e.clientY - BoundingClientRect.top ) * (JT.Graphic.Canvas.height / BoundingClientRect.height)

	JT.Input.Mouse.RX = JT.Input.Mouse.X / BoundingClientRect.width
	JT.Input.Mouse.RY = JT.Input.Mouse.Y / BoundingClientRect.height
})

JT.Graphic.Canvas.addEventListener("mouseenter", () => {
	JT.Input.Mouse.InWindow = true
})

JT.Graphic.Canvas.addEventListener("mouseleave", () => {
	JT.Input.Mouse.InWindow = false
})

/** @param {MouseEvent} e
 * @param {boolean} Release */
let __MouseEvent = function(e, Release){
	const Button = e.button

	JT.Input.Mouse.__Pressed[Button] = !Release;

	__EVENTS.MouseButton(JT.Input.Mouse.X, JT.Input.Mouse.Y, JT.Input.Mouse.RX, JT.Input.Mouse.RY, Release, e.button)
}

window.addEventListener("mousedown", (e) => __MouseEvent(e, false))
window.addEventListener("mouseup"  , (e) => __MouseEvent(e, true ))

/** @param {KeyboardEvent} e
 * @param {boolean} Release */
let __KeyboardEvent = function(e, Release){
	const Key = e.code

	if(!Release && e.repeat){ return }

	JT.Input.Keyboard.__Pressed[Key] = !Release;

	__EVENTS.KeyboardKey(Key, Release)
}

window.addEventListener("keydown", (e) => __KeyboardEvent(e, false))
window.addEventListener("keyup"  , (e) => __KeyboardEvent(e, true ))