console.log("Loading events...")

/**
 * Вызывается каждый тик
 * @param {number} DT DeltaTime
 */
__EVENTS.Tick = function(DT){
    __TickSecond_Timer += DT;
    if(__TickSecond_Timer >= 10){
        __TickSecond_Timer = 0
        __EVENTS.TickSecond()
    }

    UpdateDebug(DT)

    if(__TEST_PRESSED){
        const test = new PIXI.Graphics()

        test.beginFill(Math.floor(Math.random() * 0xFFFFFF), 0.1)
        test.drawRect(-20, -20, 40, 40)
        test.endFill()

        test.lineStyle(4, Math.floor(Math.random() * 0xFFFFFF), 0.1)
        test.drawRect(-20, -20, 40, 40)

        test.x = JT.Input.Mouse.X
        test.y = JT.Input.Mouse.Y

        test.rotation = Math.random() * Math.PI * 2

        Scene.addChild(test)
        __TEST_TOTAL_TESTS++
    }
}

/**
 * Вызывается каждую секунду
 */
__EVENTS.TickSecond = function(){
    UpdateTitle()

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
    if(Button !== 0){ return; }

    if(Release){
        __TEST_PRESSED = false

        return
    }

    console.log(`CLICK ${X}, ${Y}, ${RX}, ${RY}`)

    __TEST_PRESSED = true
}
__TEST_TOTAL_TESTS = 0
let __TEST_PRESSED = false

/**
 * Вызывается при изменении размера окна
 * @param {number} W Новая ширина
 * @param {number} H Новая высота
 */
__EVENTS.WindowResize = function(W, H){
    GG.renderer.resize(W, H)
}
__EVENTS.WindowResize(window.innerWidth, window.innerHeight)