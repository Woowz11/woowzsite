console.log("Bootstrap game!")

const JT = {
	Input: {
		Mouse: {
			X : -1,
			Y : -1,
			RX: -1,
			RY: -1
		}
	}
}

// Информация об игре
const GameInfo = {
	Name: "JunkyardTycoon"
}

document.title = `${GameInfo.Name} - Loading`

// Список ивентов
const __EVENTS = {}

// Графика
const GG = new PIXI.Application({
	backgroundColor: 0x000000,
	antialias: true,
	resolution: window.devicePixelRatio || 1,
});

document.body.prepend(GG.view)

// Текущая сцена
const Scene = new PIXI.Container()
GG.stage.addChild(Scene)

// Отладочный контейнер
const DebugContainer = new PIXI.Container()
GG.stage.addChild(DebugContainer)

// ----------------------------------------------------------------------

GG.ticker.add((DT) => __EVENTS.Tick(DT))

window.addEventListener("resize", () => __EVENTS.WindowResize(window.innerWidth, window.innerHeight))

window.addEventListener("mousemove", (e) => {
	const BCR = GG.view.getBoundingClientRect();

	JT.Input.Mouse.X = (e.clientX - BCR.left) * (GG.view.width  / BCR.width )
	JT.Input.Mouse.Y = (e.clientY - BCR.top ) * (GG.view.height / BCR.height)

	JT.Input.Mouse.RX = JT.Input.Mouse.X / BCR.width
	JT.Input.Mouse.RY = JT.Input.Mouse.Y / BCR.height
})

let __MouseEvent = function(Event, Release){
	__EVENTS.MouseButton(JT.Input.Mouse.X, JT.Input.Mouse.Y, JT.Input.Mouse.RX, JT.Input.Mouse.RY, Release, Event.button)
}

window.addEventListener("mousedown", (e) => __MouseEvent(e, false));
window.addEventListener("mouseup", (e) => __MouseEvent(e, true))