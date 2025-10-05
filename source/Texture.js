class Texture{
	constructor(W, H, Content = null){
		try{
			if(W <= 0 || H <= 0){ throw new Error("Размеры текстуры <= 0!"); }
			
			this.W = W;
			this.H = H;
			
			this.C = document.createElement("Canvas");
			this.C.width = W; this.C.height = H;
			this.CTX = this.C.getContext("2d");
			
			this.Content = new Uint8ClampedArray(W * H * 4);
			
			this.Fill(Content);
		}catch(e){
			throw new Error("Произошла ошибка при создании текстуры! new Texture(" + W + ", " + H + ", ...);", e);
		}
	}
	
	/* Закрасить текстуру */
	Fill(Arg1, Arg2 = "source-over", Arg3 = false, Arg4 = null, Arg5 = null, Arg6 = "source-over", Arg7 = false){
		try{
			var Fill2 = !(typeof Arg2 === "string");
			
			var Content     = Fill2 ? null : Arg1;
			var Blend       = Fill2 ? Arg6 : Arg2;
			var IgnoreAlpha = Fill2 ? Arg7 : Arg3;
		
			var X0    = Fill2 ? (Arg1 || 0) : null;
			var Y0    = Fill2 ? (Arg2 || 0) : null;
			var X1    = Fill2 ? (Arg3 || this.W) : null;
			var Y1    = Fill2 ? (Arg4 || this.H) : null;
			var Color = Fill2 ? (Arg5 || "transparent") : null;
		
			const CalculatePixel = (i, r, g, b, a) => {
				if (Blend === "multiply") {
					this.Content[i + 0] = Math.floor(this.Content[i + 0] * r / 255);
					this.Content[i + 1] = Math.floor(this.Content[i + 1] * g / 255);
					this.Content[i + 2] = Math.floor(this.Content[i + 2] * b / 255);
					if (!IgnoreAlpha) {
						this.Content[i + 3] = Math.floor(this.Content[i + 3] * a / 255);
					}
				} else {
					this.Content[i + 0] = r;
					this.Content[i + 1] = g;
					this.Content[i + 2] = b;
					if (!IgnoreAlpha) {
						this.Content[i + 3] = a;
					}
				}
			};
		
			if(Fill2){
				if(X0 < 0 || Y0 < 0 || X1 > this.W || Y1 > this.H){ throw new Error("Координаты выходят за пределы текстуры!"); }
				if(X0 >= X1 || Y0 >= Y1){ throw new Error("Координаты совпадают или первые больше вторых!"); }
			
				Color = CalculateColor(Color);
				for (let y = Y0; y < Y1; y++) {
					for (let x = X0; x < X1; x++) {
						const i = (y * this.W + x) * 4;
						CalculatePixel(i, Color[0], Color[1], Color[2], Color[3]);
					}
				}
				
			}else{
				if(!Content){ return; }
		
				var Data = Content;
				if(Content instanceof Texture){ Data = Content.Content; }else if(!(Data instanceof Uint8ClampedArray)){ Data = CalculateColor(Data); }
				
				if(Data.length === 4){
					for(var i = 0; i < this.Content.length; i += 4) {
						CalculatePixel(i, Data[0], Data[1], Data[2], Data[3]);
					}
				}else{
					for (var i = 0; i < this.Content.length; i += 4) {
						CalculatePixel(i, Data[i + 0], Data[i + 1], Data[i + 2], Data[i + 3]);
					}
				}
			}
			
			this.__UpdateCanvas();
			
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при заливке текстуры [" + this + "]! Fill(" + Arg1 + ", " + Arg2 + ", " + Arg3 + ", " + Arg4 + ", " + Arg5 + ", " + Arg6 + ", " + Arg7 + ");", e);
		}
	}
	
	/* Добавляет текстуру на текстуру */
	Put(Content, X = 0, Y = 0, Blend = "alpha"){
		if(Content === false){ return; }
	
		const PrevBlend = this.CTX.globalCompositeOperation;
		if(Blend !== "alpha"){ this.CTX.globalCompositeOperation = Blend; }
	
		try{
			if(X < -this.W || Y < -this.H){ throw new Error("Позиция < -(размера текстуры)!"); }
			if(X > this.W || Y > this.H){ throw new Error("Позиция > размера текстуры!"); }
		
			if(Blend === "alpha"){
				var Data;
				if(Content instanceof Texture){
					Data = Content.Content;
				}else if(Content instanceof Uint8ClampedArray){
					Data = Content;
				}else{
					throw new Error("Нужен Texture!");
				}
				
				var W = Content.W || this.W;
				var H = Content.H || this.H;
				
				const SY = Math.max(0,        - Y);
				const EY = Math.min(H, this.H - Y);
				const SX = Math.max(0,        - X);
				const EX = Math.min(W, this.W - X);

				for(let Y_ = SY; Y_ < EY; Y_++){
					for(let X_ = SX; X_ < EX; X_++){
						const CI = ((Y_ + Y) * this.W + (X_ + X)) * 4;
						const DI = (Y_ * W + X_) * 4;

						const BaseR = this.Content[CI + 0];
						const BaseG = this.Content[CI + 1];
						const BaseB = this.Content[CI + 2];
						const BaseA = this.Content[CI + 3] / 255;

						const OverR = Data[DI + 0];
						const OverG = Data[DI + 1];
						const OverB = Data[DI + 2];
						const OverA = Data[DI + 3] / 255;

						const OutA = OverA + BaseA * (1 - OverA);
						if(OutA === 0){ continue; }

						this.Content[CI + 0] = Math.round((OverR * OverA + BaseR * BaseA * (1 - OverA)) / OutA);
						this.Content[CI + 1] = Math.round((OverG * OverA + BaseG * BaseA * (1 - OverA)) / OutA);
						this.Content[CI + 2] = Math.round((OverB * OverA + BaseB * BaseA * (1 - OverA)) / OutA);
						this.Content[CI + 3] = Math.round(OutA * 255);
					}
				}
				
				this.__UpdateCanvas();
			}else{
				if(Content instanceof Texture){
					this.CTX.drawImage(Content.C, X, Y);
				}else if(Content instanceof Uint8ClampedArray){
					this.CTX.putImageData(new ImageData(Content, this.W, this.H), X, Y);
				}else{
					throw new Error("Нужен Texture!");
				}
				
				this.__UpdateContent();
			}
			
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при добавлении текстуры на текстуру [" + this + "]! Put(..., " + X + ", " + Y + ");", e);
		}finally{
			if(Blend !== "alpha"){ this.CTX.globalCompositeOperation = PrevBlend; }
		}
	}
	
	/* Заменяет текстуру */
	Set(Content, X = 0, Y = 0){ return this.Put(Content, X, Y, "source-over"); }
	
	/* Устанавливает цвет заднего фона */
	Background(Color = "white"){
		try{
			var Current = new Uint8ClampedArray(this.Content);
			this.Fill(Color        );
			this.Put (Current, 0, 0);
			
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при установке цвета заднего фона текстуре [" + this + "]! Background(" + Color + ");", e);
		}
	}
	
	/* Обрезать текстуру */
	Crop(X, Y, W, H){
		try{
			if(X < 0 || Y < 0 || X + W > this.W || Y + H > this.H){ throw new Error("Параметры выходят за пределы текстуры!"); }
			
			const NewContent = new Uint8ClampedArray(W * H * 4);

			for(var Y_ = 0; Y_ < H; Y_++){
				for(var X_ = 0; X_ < W; X_++){
					const CI = ((Y_ + Y) * this.W + (X_ + X)) * 4;
					const DI = (Y_ * W + X_) * 4;

					NewContent[DI + 0] = this.Content[CI + 0];
					NewContent[DI + 1] = this.Content[CI + 1];
					NewContent[DI + 2] = this.Content[CI + 2];
					NewContent[DI + 3] = this.Content[CI + 3];
				}
			}

			this.Content = NewContent;
			this.W = W; this.H = H;
			
			this.C.width = W; this.C.height = H;
			this.CTX.putImageData(new ImageData(this.Content, W, H), 0, 0);

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при обрезке текстуры [" + this + "]! Crop(" + X + ", " + Y + ", " + W + ", " + H + ");", e);
		}
	}
	
	/* Получает кадр из анимированной текстуры */
	Frame(Index = 0){
		try{
			const TotalFrames = Math.floor(this.H / this.W);
			
			if(Index < 0 || Index >= TotalFrames){ throw new Error("Индекс кадра выходит за пределы анимации!"); }
			
			return this.Crop(Index * this.W, 0, this.W, this.W);
		}catch(e){
			throw new Error("Произошла ошибка при получении кадра из анимации у текстуры [" + this + "]! Frame(" + Index + ");", e);
		}
	}
	
	/* Изменяет размер текстуры, так же содержимое */
	Resize(W, H, Smooth = true){
		try{
			if(W <= 0 || H <= 0){ throw new Error("Новый размер <= 0!"); }
			
			const OW = this.W;
			const OH = this.H;
			const NewContent = new Uint8ClampedArray(W * H * 4);

			for(var Y = 0; Y < H; Y++){
				for(var X = 0; X < W; X++){
					const NI = (Y * W + X) * 4;

					if(Smooth){
						const GX = (X + 0.5) * OW / W - 0.5;
						const GY = (Y + 0.5) * OH / H - 0.5;
						const GXI = Math.floor(GX);
						const GYI = Math.floor(GY);
						const DX = GX - GXI;
						const DY = GY - GYI;

						for(var P = 0; P < 4; P++){
							const P00 = this.Content[((Math.min(GYI    , OH - 1) * OW + Math.min(GXI    , OW - 1)) * 4) + P];
							const P10 = this.Content[((Math.min(GYI    , OH - 1) * OW + Math.min(GXI + 1, OW - 1)) * 4) + P];
							const P01 = this.Content[((Math.min(GYI + 1, OH - 1) * OW + Math.min(GXI    , OW - 1)) * 4) + P];
							const P11 = this.Content[((Math.min(GYI + 1, OH - 1) * OW + Math.min(GXI + 1, OW - 1)) * 4) + P];

							const P0 = P00 * (1 - DX) + P10 * DX;
							const P1 = P01 * (1 - DX) + P11 * DX;
							NewContent[NI + P] = Math.round(P0 * (1 - DY) + P1 * DY);
						}
					} else {
						const OX = Math.floor(X * OW / W);
						const OY = Math.floor(Y * OH / H);
						const OI = (OY * OW + OX) * 4;
						NewContent[NI + 0] = this.Content[OI + 0];
						NewContent[NI + 1] = this.Content[OI + 1];
						NewContent[NI + 2] = this.Content[OI + 2];
						NewContent[NI + 3] = this.Content[OI + 3];
					}
				}
			}

			this.W = W; this.H = H;
			this.Content = NewContent;

			this.C.width = W; this.C.height = H;
			this.CTX.putImageData(new ImageData(this.Content, W, H), 0, 0);

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при изменении размера у текстуры [" + this + "] и содержимого! Resize(" + W + ", " + H + ", " + Smooth + ");", e);
		}
	}
	
	/* Изменяет размер текстуры, не трогая содержимое */
	NewSize(W = null, H = null){
		try{
			if(W === null){ W = this.W; }
			if(H === null){ H = this.H; }
		
			if(W <= 0 || H <= 0){ throw new Error("Новый размер <= 0!"); }
			
			const OW = this.W; const OH = this.H;
			const OContent = this.Content ? new Uint8ClampedArray(this.Content) : null;

			this.W = W; this.H = H;

			this.Content = new Uint8ClampedArray(W * H * 4);

			this.C.width = W;  this.C.height = H;

			if(OContent){
				const CW = Math.min(OW, W);
				const CH = Math.min(OH, H);

				for(var Y = 0; Y < CH; Y++){
					for(var X = 0; X < CW; X++){
						const OI = (Y * OW + X) * 4;
						const NI = (Y *  W + X) * 4;
						this.Content[NI + 0] = OContent[OI + 0];
						this.Content[NI + 1] = OContent[OI + 1];
						this.Content[NI + 2] = OContent[OI + 2];
						this.Content[NI + 3] = OContent[OI + 3];
					}
				}
			}

			this.__UpdateCanvas();

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при изменении размера у текстуры [" + this + "]! NewSize(" + W + ", " + H + ");", e);
		}
	}
	
	/* Двигает текстуру */
	Move(X = 0, Y = 0){
		try{
			if(X === 0 && Y === 0){ return this; } // нет смещения — ничего не делаем

			const NewContent = new Uint8ClampedArray(this.W * this.H * 4);

			// Рассчитываем области копирования
			const StartX = Math.max(0, X);
			const StartY = Math.max(0, Y);
			const EndX   = Math.min(this.W, this.W + X);
			const EndY   = Math.min(this.H, this.H + Y);

			const SrcStartX = Math.max(0, -X);
			const SrcStartY = Math.max(0, -Y);

			for(let NY = StartY, SY = SrcStartY; NY < EndY; NY++, SY++){
				for(let NX = StartX, SX = SrcStartX; NX < EndX; NX++, SX++){
					const OI = (SY * this.W + SX) * 4;
					const NI = (NY * this.W + NX) * 4;
					NewContent[NI + 0] = this.Content[OI + 0];
					NewContent[NI + 1] = this.Content[OI + 1];
					NewContent[NI + 2] = this.Content[OI + 2];
					NewContent[NI + 3] = this.Content[OI + 3];
				}
			}

			this.Content = NewContent;
			this.__UpdateCanvas();

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при движении текстуры [" + this + "]! Move(" + X + ", " + Y + ");", e);
		}
	}
	
	/* Применяет градиент */
	Gradient(Gradient_){
		try{
			if(!(Gradient_ instanceof Texture)){ throw new Error("Градиент должен быть формата Texture!"); }
			if(Gradient_.W !== 256 || Gradient_.H !== 1){ throw new Error("Размер градиента должен быть 256x1!"); }
			
			for(var i = 0; i < this.Content.length; i += 4){
				const Gray = this.Content[i];
				
				const GI = Gray * 4;
				this.Content[i + 0] = Gradient_.Content[GI + 0];
				this.Content[i + 1] = Gradient_.Content[GI + 1];
				this.Content[i + 2] = Gradient_.Content[GI + 2];
				this.Content[i + 3] = Math.min(this.Content[i + 3], Gradient_.Content[GI + 3]);
			}
			
			this.__UpdateCanvas();
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при применении градиента текстуре [" + this + "]! Gradient(" + Gradient_ + ");", e);
		}
	}
	
	/* Умножает цвет */
	Multiply(Content){
		try{
			return this.Fill(Content, "multiply", true);
		}catch(e){
			throw new Error("Произошла ошибка при умножении на цвет [" + Color + "] у текстуры [" + this + "]! Multiply(" + Color + ");", e);
		}
	}
	
	/* Устанавливает канал */
	Fixed(R = null, G = null, B = null, A = null){
		try{
			if(R && R > 255 || R < 0){ throw new Error("Красный цвет выходит за пределы 0 и 255!"); }
			if(G && G > 255 || G < 0){ throw new Error("Зелёный цвет выходит за пределы 0 и 255!"); }
			if(B && B > 255 || B < 0){ throw new Error("Синий цвет выходит за пределы 0 и 255!"  ); }
			if(A && A > 255 || A < 0){ throw new Error("Прозрачность выходит за пределы 0 и 255!"); }
		
			for (var i = 0; i < this.Content.length; i += 4) {
				if (R !== null){ this.Content[i + 0] = R; }
				if (G !== null){ this.Content[i + 1] = G; }
				if (B !== null){ this.Content[i + 2] = B; }
				if (A !== null){ this.Content[i + 3] = A; }
			}
			
			this.__UpdateCanvas();
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при установке каналов текстуре [" + this + "]! Fixed(" + R + ", " + G + ", " + B + ", " + A + ");", e);
		}
	}
	
	/* Отзеркаливает */
	Flip(X = false, Y = false){
		try{
			if(!X && !Y){ return; }
			
			const Old = new Uint8ClampedArray(this.Content);
			const NewContent = new Uint8ClampedArray(this.W * this.H * 4);

			for(let y = 0; y < this.H; y++){
				for(let x = 0; x < this.W; x++){
					const srcX = X ? (this.W - 1 - x) : x;
					const srcY = Y ? (this.H - 1 - y) : y;

					const srcIndex = (srcY * this.W + srcX) * 4;
					const dstIndex = (y * this.W + x) * 4;

					NewContent[dstIndex + 0] = Old[srcIndex + 0];
					NewContent[dstIndex + 1] = Old[srcIndex + 1];
					NewContent[dstIndex + 2] = Old[srcIndex + 2];
					NewContent[dstIndex + 3] = Old[srcIndex + 3];
				}
			}

			this.Content = NewContent;
			this.__UpdateCanvas();

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при отзеркаливании текстуры [" + this + "]! Flip(" + X + ", " + Y + ");", e);
		}
	}
	
	/* Обрезка каналов */
	Trim(R = null, G = null, B = null, A = null){
		try{
			const Rules = [R, G, B, A];
			
			for(var i = 0; i < this.Content.length; i += 4){
				for(var c = 0; c < 4; c++){
					const Rule = Rules[c];
					if(!Rule){ continue; }
					
					const Value = this.Content[i + c];
					
					const Left = Rule[0]; const Right = Rule[1];
					
					if(Left != null){
						this.Content[i + c] = (Value <= Left[0] ? Left[1] : Value);
						continue;
					}
					if(Right != null){
						this.Content[i + c] = (Value => Right[0] ? Right[1] : Value);
					}
				}
			}
			
			this.__UpdateCanvas();
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при обрезке текстуры [" + this + "]! Trim(" + R + ", " + G + ", " + B + " ," + A + ");", e);
		}
	}
	
	/* Инвертирует канал */
	Invert(R = true, G = true, B = true, A = false){
		try{
			for(let i = 0; i < this.Content.length; i += 4){
				if(R){ this.Content[i + 0] = 255 - this.Content[i + 0]; }
				if(G){ this.Content[i + 1] = 255 - this.Content[i + 1]; }
				if(B){ this.Content[i + 2] = 255 - this.Content[i + 2]; }
				if(A){ this.Content[i + 3] = 255 - this.Content[i + 3]; }
			}

			this.__UpdateCanvas();
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при инвертировании каналов у текстуры [" + this + "]! Invert(" + R + ", " + G + ", " + B + " ," + A + ");", e);
		}
	}
	
	/* Повторяет текстуру */
	Tile(X = 1, Y = 1){
		try{
			if(X <= 0 || Y <= 0){ throw new Error("Кол-во Tile <= 0!"); }
			
			const NewW = this.W * X;
			const NewH = this.H * Y;
			const NewContent = new Uint8ClampedArray(NewW * NewH * 4);

			for(let ty = 0; ty < Y; ty++){
				for(let tx = 0; tx < X; tx++){
					for(let y = 0; y < this.H; y++){
						for(let x = 0; x < this.W; x++){
							const SrcIndex = (y * this.W + x) * 4;
							const DestIndex = ((ty * this.H + y) * NewW + (tx * this.W + x)) * 4;

							NewContent[DestIndex + 0] = this.Content[SrcIndex + 0];
							NewContent[DestIndex + 1] = this.Content[SrcIndex + 1];
							NewContent[DestIndex + 2] = this.Content[SrcIndex + 2];
							NewContent[DestIndex + 3] = this.Content[SrcIndex + 3];
						}
					}
				}
			}

			this.W = NewW;
			this.H = NewH;
			this.Content = NewContent;

			this.C.width = NewW;
			this.C.height = NewH;
			this.__UpdateCanvas();

			return this;
		}catch(e){
			throw new Error("Произошла ошибка при повторении текстуры [" + this + "]! Tile(" + X + ", " + Y + ");", e);
		}
	}
	
	/* Применение маски */
	Mask(){
		try{
			for(var i = 0; i < this.Content.length; i += 4){
				const Gray = this.Content[i];
				
				this.Content[i + 0] = this.Content[i + 1] = this.Content[i + 2] = 255;
				this.Content[i + 3] = Gray;
			}
			
			this.__UpdateCanvas();
			return this;
		}catch(e){
			throw new Error("Произошла ошибка при применении маски у текстуры [" + this + "]! Mask();", e);
		}
	}
	
	/* ======================================================== */
	
	/* Получает цвет из пикселя */
	GetColor(X, Y){
		try{
			if(X < 0 || Y < 0 || X >= this.W || Y >= this.H){ throw new Error("Пиксель выходит за пределы текстуры!"); }
			
			const i = (Y * this.W + X) * 4;
			
			return [
				this.Content[i + 0],
				this.Content[i + 1],
				this.Content[i + 2],
				this.Content[i + 3]
			];
		}catch(e){
			throw new Error("Произошла ошибка при получении цвета пикселя у текстуры [" + this + "]! GetColor(" + X + ", " + Y + ");", e);
		}
	}
	
	/* Клонирует текстуру */
	Clone(){
		return new Texture(this.W, this.H, this.Content);
	}
	
	async ToBlob(){
		return await new Promise(R => this.C.toBlob(R, "image/png"));
	}
	
	ToImage(){
		if(this.__DataURL){ return this.__DataURL; }
		this.__DataURL = this.C.toDataURL("image/png");
		return this.__DataURL;
	}
	
	__UpdateCanvas(){
		this.CTX.putImageData(new ImageData(this.Content, this.W, this.H), 0, 0);
	}
	
	__UpdateContent(){
		this.Content.set(this.CTX.getImageData(0, 0, this.W, this.H).data);
	}
	
	toString(){
		return "Texture[" + this.W + "x" + this.H + "]";
	}
}