console.log("Load camera...")

JT.Game.Camera = {
    X: 0,
    Y: 0
}

let __Dragging_LastX = 0
let __Dragging_LastY = 0

let __Dragging_Cache = false

const UpdateCamera = function(DT){
    const Dragging = JT.Input.Mouse.IsPressed(1)
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

    const MoveSpeed = DT * 5 * (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraSpeedUp) ? 3 : 1)

    const DirectionX = (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraRight) ? 1 : (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraLeft) ? -1 : 0))
    const DirectionY = (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraDown) ? 1 : (JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraUp) ? -1 : 0))

    JT.Game.Camera.X += DirectionX * MoveSpeed
    JT.Game.Camera.Y += DirectionY * MoveSpeed

    if(JT.Input.Keyboard.IsPressed(JT.Settings.Keys.CameraReset)){
        JT.Game.Camera.X = 0
        JT.Game.Camera.Y = 0

        JT.Game.Camera.Zoom = 1
    }

    JT.Scene.World.x = -JT.Game.Camera.X
    JT.Scene.World.y = -JT.Game.Camera.Y
}