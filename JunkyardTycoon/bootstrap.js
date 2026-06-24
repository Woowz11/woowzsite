const APP = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0xFF0000,
	antialias: true,
	resolution: window.devicePixelRatio || 1,
});

document.body.prepend(APP.view);

const Container = new PIXI.Container();
APP.stage.addChild(Container);

APP.ticker.add((DT) => {
	
});

window.addEventListener("resize", () => {
	APP.renderer.resize(window.innerWidth, window.innerHeight);
});

// ----------------------------------------------------------------------

APP.view.addEventListener("click", (e) => {
    const __Rect = APP.view.getBoundingClientRect();
    const X = (e.clientX - __Rect.left) * (APP.view.width  / __Rect.width );
    const Y = (e.clientY - __Rect.top ) * (APP.view.height / __Rect.height);
});