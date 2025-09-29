const __Pad = {
    Left: function(str, length, char = " ") {
        str = String(str);
        if(str.length >= length) return str;
        return char.repeat(length - str.length) + str;
    },

    Right: function(str, length, char = " ") {
        str = String(str);
        if(str.length >= length) return str;
        return str + char.repeat(length - str.length);
    },

    Center: function(str, length, char = " ") {
        str = String(str);
        if(str.length >= length) return str;
        const total = length - str.length;
        const leftPad = Math.floor(total / 2);
        const rightPad = total - leftPad;
        return char.repeat(leftPad) + str + char.repeat(rightPad);
    }
};

const __Error = Error;

const __ErrorRegex = /^(.*?)@(.+):(\d+):(\d+)$/;
const __FunctionRegex = /^.*[\\/]/;
Error = class{
	constructor(Message, Parent){
		this.Message  = Message;
		this.Parent   = Parent || null;
		this.Line     = new __Error().stack.split("\n")[1];
		const Match   = this.Line.match(__ErrorRegex) || [];
		this.Function = Match[1] || "?";
		this.Script   = Match[2] || "Anonymous";
		this.Y        = parseInt(Match[3]) || -1;
		this.X        = parseInt(Match[4]) || -1;

		this.ScriptShort = this.Script.replace(__FunctionRegex, "");
	}
	
	Exception(){
		return this.ScriptShort + ":" + this.Y;
	}
	
	toString(){
		return this.Message;
	}
}

function __Print(Message, Exception, Type){
	try{
		var Result = Message;
		
		const Length = 50;
		
		if(Exception){
			Result += "\n:" + "=".repeat(Length) + ":\n";
			function __E(E){
				if(!E){ return; }
				const Parent = __E(E.Parent);
				
				function PadException(E_, M){
					return __Pad.Left("[" + __Pad.Right(E_, 20, " ") + "]", Length - 1 - M.length, " ");
				}
				
				if(E instanceof Error){
					return " " + E.Message + " " + PadException(E.Exception(), E.Message) + (Parent ? "\n" + Parent : "");
				}else{
					if(E instanceof __Error){
						var S = E.stack.split("\n")[1];
						const M = S.match(__ErrorRegex) || [];
						S = M[2] || "Anonymous";
						S = S.replace(__FunctionRegex, "");
						S += ":" + (M[3] || "-1");
						
						return " " + E.message + " " + PadException(S, E.message) + (E.stack ? "\n" + E.stack : "");
					}else{
						return " " + E;
					}
				}
			}
			Result += __E(Exception);
		}
		
		switch(Type){
			case 0: console.log  (Result); break;
			case 1: console.warn (Result); break;
			case 2: console.error(Result); break;
		}
	}catch(e){
		console.error("Произошла ошибка при отправке сообщения!\nТип: " + Type + "\nСообщение: " + Message + "\nException: " + Exception, e);
	}
}

const Logger = {};
Logger.Info  = function(Message, Exception){ __Print(Message, Exception, 0); }
Logger.Warn  = function(Message, Exception){ __Print(Message, Exception, 1); }
Logger.Error = function(Message, Exception){ __Print(Message, Exception, 2); }
Logger.Fatal = function(Message, Exception){
	Logger.Error(Message, Exception);
	alert(Message + "\nСм. консоль (F12)");
}