const BootstrapPlayer = function(){
    GW2.Game.Player = {
        Camera: {
            X: 0,
            Y: 0,

            Update: function(DT){
                this.X = GW2.Game.Player.X
                this.Y = GW2.Game.Player.Y
            },

            Reset: function(){
                this.X = 0
                this.Y = 0
            }
        },

        X: 0,
        Y: 0,

        Update: function(DT){
            const Shift = GW2.Input.Keyboard.IsPressed("ShiftLeft")

            const Speed = Shift ? 5 : 2

            const KeyA = GW2.Input.Keyboard.IsPressed("KeyA")
            const KeyD = GW2.Input.Keyboard.IsPressed("KeyD")
            const KeyW = GW2.Input.Keyboard.IsPressed("KeyW")
            const KeyS = GW2.Input.Keyboard.IsPressed("KeyS")


            let DirectionX = KeyA && KeyD ? 0 : (KeyA ? -1 : (KeyD ? 1 : 0))
            let DirectionY = KeyW && KeyS ? 0 : (KeyW ? -1 : (KeyS ? 1 : 0))

            // Что-бы игрок по диагонали не двигался быстрее
            if(DirectionX !== 0 && DirectionY !== 0){
                const L = Math.sqrt(DirectionX * DirectionX + DirectionY * DirectionY)
                DirectionX /= L
                DirectionY /= L
            }

            let MoveX = DirectionX * Speed
            let MoveY = DirectionY * Speed

            this.X += MoveX
            this.Y += MoveY



            if(GW2.Input.Keyboard.IsPressed("Home")){
                this.X = 0
                this.Y = 0
            }
        },

        Reset: function(){
            this.X = 0
            this.Y = 0
        }
    }
}