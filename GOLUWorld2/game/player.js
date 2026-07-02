const BootstrapPlayer = function(){
    GW2.Game.Player = {
        Camera: {
            X: 0,
            Y: 0,

            Update: function(DT){
                this.X = Math.lerp(GW2.Game.Player.X, GW2.Input.Mouse.WX, 0.25)
                this.Y = Math.lerp(GW2.Game.Player.Y, GW2.Input.Mouse.WY, 0.25)
            },

            Reset: function(ToPlayer){
                this.X = 0
                this.Y = 0
                if(ToPlayer){
                    this.Update(0)
                }
            }
        },

        X: 0,
        Y: 0,

        Speed: {
            Const: {
                Walk: 2,
                Run: 5
            },

            /** Скорость изменения скорости (плавное изменение) */
            Acceleration: 0.25,
        },

        Velocity: {
            X: 0,
            Y: 0,

            /** [АВТО] Показывает текущую скорость Velocity */
            Magnitude: 0
        },

        /** [АВТО] Игрок пытается двигаться? */
        IsTryMoving: false,

        Floor: {
            Friction: 0.8
        },

        Update: function(DT){
            const Shift = GW2.Input.Keyboard.IsPressed("ShiftLeft")

            const TargetSpeed = Shift ? this.Speed.Const.Run : this.Speed.Const.Walk

            const KeyA = GW2.Input.Keyboard.IsPressed("KeyA")
            const KeyD = GW2.Input.Keyboard.IsPressed("KeyD")
            const KeyW = GW2.Input.Keyboard.IsPressed("KeyW")
            const KeyS = GW2.Input.Keyboard.IsPressed("KeyS")

            let DirectionX = KeyA && KeyD ? 0 : (KeyA ? -1 : (KeyD ? 1 : 0))
            let DirectionY = KeyW && KeyS ? 0 : (KeyW ? -1 : (KeyS ? 1 : 0))

            if(DirectionX !== 0 && DirectionY !== 0){
                const L = Math.sqrt(DirectionX * DirectionX + DirectionY * DirectionY)
                DirectionX /= L
                DirectionY /= L
            }

            this.IsTryMoving = DirectionX !== 0 || DirectionY !== 0

            // Что-бы игрок по диагонали не двигался быстрее
            if(this.IsTryMoving){
                this.Velocity.X = Math.lerp(this.Velocity.X, DirectionX * TargetSpeed, this.Speed.Acceleration)
                this.Velocity.Y = Math.lerp(this.Velocity.Y, DirectionY * TargetSpeed, this.Speed.Acceleration)
            }else{
                this.Velocity.X *= this.Floor.Friction
                this.Velocity.Y *= this.Floor.Friction

                if(Math.abs(this.Velocity.X) < 0.001){ this.Velocity.X = 0 }
                if(Math.abs(this.Velocity.Y) < 0.001){ this.Velocity.Y = 0 }
            }

            this.X += this.Velocity.X
            this.Y += this.Velocity.Y

            this.Velocity.Magnitude = Math.sqrt(this.Velocity.X * this.Velocity.X + this.Velocity.Y * this.Velocity.Y)

            if(GW2.Input.Keyboard.IsPressed("Home")){
                this.Reset()
                this.Camera.Reset(true)
            }
        },

        Reset: function(){
            this.X = 0
            this.Y = 0

            this.Velocity.X = 0
            this.Velocity.Y = 0
        }
    }
}