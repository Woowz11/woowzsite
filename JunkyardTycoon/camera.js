console.log("Load camera...")

JT.Game.Camera = {
    X: 0,
    Y: 0,

    Zoom: 1
}

let __Dragging_LastX = 0
let __Dragging_LastY = 0

let __Dragging_Cache = false

const UpdateCamera = function(DT){
    let Dragging = JT.Input.Mouse.IsPressed(1)
    if(Dragging){
        const WX = JT.Input.Mouse.WX
        const WY = JT.Input.Mouse.WY

        if(!__Dragging_Cache){
            __Dragging_LastX = WX
            __Dragging_LastY = WY
            __Dragging_Cache = true
        }else{
            const DX = WX - __Dragging_LastX
            const DY = WY - __Dragging_LastY

            JT.Game.Camera.X -= DX
            JT.Game.Camera.Y -= DY
        }
    }else{
        __Dragging_Cache = false
    }

    // ----------------------------------------------------------------------

    let ZoomSpeed = 0.1

    JT.Game.Camera.Zoom *= (JT.Input.Keyboard.IsPressed("Equal") ? 1 + ZoomSpeed : (JT.Input.Keyboard.IsPressed("Minus") ? 1 - ZoomSpeed : 1))

    // ----------------------------------------------------------------------

    let MoveSpeed = DT * 5 * (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraSpeedUp) ? 3 : 1)

    let DirectionX = (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraRight) ? 1 : (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraLeft) ? -1 : 0))
    let DirectionY = (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraDown) ? 1 : (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraUp) ? -1 : 0))

    JT.Game.Camera.X += DirectionX * MoveSpeed
    JT.Game.Camera.Y += DirectionY * MoveSpeed

    if(JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraReset)){
        JT.Game.Camera.X = 0
        JT.Game.Camera.Y = 0

        JT.Game.Camera.Zoom = 1
    }

    // Позиция мира = -позиция камеры + центр экрана
    const matrix = new PIXI.Matrix();

// Устанавливаем трансформацию
    matrix.set(
        JT.Game.Camera.Zoom,          // a - масштаб X
        0,                 // b - скос X
        0,                 // c - скос Y
        JT.Game.Camera.Zoom,          // d - масштаб Y
        -JT.Game.Camera.X + JT.Graphic.W/2,      // tx - позиция X
        -JT.Game.Camera.Y + JT.Graphic.H/2       // ty - позиция Y
    );

// Применяем матрицу к миру
    JT.Scene.World.transform.localTransform = matrix;
    JT.Scene.World.transform.updateLocalTransform();
}