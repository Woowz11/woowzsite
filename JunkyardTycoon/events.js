console.log("Loading events...")

/**
 * Вызывается каждый тик
 * @param {number} DT DeltaTime
 */
__EVENTS.Tick = function(DT){
    JT.Graphic.W = JT.Graphic.Application.renderer.width
    JT.Graphic.H = JT.Graphic.Application.renderer.height

    __TickSecond_Timer += DT;
    if(__TickSecond_Timer >= 10){
        __TickSecond_Timer = 0
        __EVENTS.TickSecond()
    }

    CameraMovement(DT)
    UpdateCamera(DT)

    UpdateDebug(DT)
}

/**
 * Вызывается каждую секунду
 */
__EVENTS.TickSecond = function(){
    document.title = JT.Game.Info.Name

    UpdateDebug_Second()
}
let __TickSecond_Timer = 0

/**
 * Вызывается при нажатии клавиши мыши
 * @param {number} X Позиция X, пиксели
 * @param {number} Y Позиция Y, пиксели
 * @param {number} RX Позиция X, дробное
 * @param {number} RY Позиция Y, дробное
 * @param {boolean} Release Отжатие клавиши?
 * @param {number} Button Клавиша
 */
__EVENTS.MouseButton = function(X, Y, RX, RY, Release, Button){
    if(!Release && Button === 0){
        let test = new PIXI.Graphics();

        test.beginFill(0x00FF00);  // Красный цвет
        test.drawRect(-25, -25, 50, 50);  // Центрируем
        test.endFill();

        test.lineStyle(2, 0xFFFFFF, 0.5);
        test.drawRect(-25, -25, 50, 50);

        test.x = JT.Input.Mouse.WX;
        test.y = JT.Input.Mouse.WY;

        JT.Graphic.Layer.World.addChild(test);
    }
}

/**
 * Вызывается при нажатии клавиши клавиатуры
 * @param {string} Key Клавиша
 * @param {boolean} Release Отжатие клавиши?
 */
__EVENTS.KeyboardKey = function(Key, Release){
    console.log(`PRESS ${Key} | ${Release}`)

    if(Release){ return }

    if(Key === "Escape"){
        JT.Scene.Set(JT.Scene.Current === JT_SCENES.GAME ? JT_SCENES.MAIN_MENU : JT_SCENES.GAME)
    }
}

/**
 * Вызывается при изменении размера окна
 * @param {number} W Новая ширина
 * @param {number} H Новая высота
 */
__EVENTS.WindowResize = function(W, H){
    JT.Graphic.Application.renderer.resize(W, H)
}
__EVENTS.WindowResize(window.innerWidth, window.innerHeight)