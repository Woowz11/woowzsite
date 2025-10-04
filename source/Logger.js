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

const ExceptionLength = 100;

function ExceptionInfo(Exception){
	if(!Exception){ return; }
	const Parent = ExceptionInfo(Exception.Parent);
	
	function PadException(E_, M){
		return ("[" + E_.padEnd(20, " ") + "]").padStart(ExceptionLength - 1 - M.length, " ");
	}
	
	if(Exception instanceof Error){
		return " " + Exception.Message + " " + PadException(Exception.Exception(), Exception.Message) + (Parent ? "\n" + Parent : "");
	}else{
		if(Exception instanceof __Error){
			var S = Exception.stack.split("\n")[1];
			const M = (S ? S.match(__ErrorRegex) : null) || [];
			S = M[2] || "Anonymous";
			S = S.replace(__FunctionRegex, "");
			S += ":" + (M[3] || "-1");
			
			return " " + Exception.message + " " + PadException(S, Exception.message) + (Exception.stack ? "\n" + Exception.stack : "");
		}else{
			return " " + Exception;
		}
	}
}

function PrintMessageText(Message, Exception){
	var Result = Message;
	
	if(Exception){
		Result += "\n:" + "=".repeat(ExceptionLength) + ":\n";
		Result += ExceptionInfo(Exception);
	}
	
	return Result;
}

function __Print(Message, Exception, Type, Style){
	try{
		var Result = PrintMessageText(Message, Exception);
		
		if(Style){
			switch(Type){
				case 0: console.log  ("%c" + Result, Style); break;
				case 1: console.warn ("%c" + Result, Style); break;
				case 2: console.error("%c" + Result, Style); break;
			}
		}else{
			switch(Type){
				case 0: console.log  (Result); break;
				case 1: console.warn (Result); break;
				case 2: console.error(Result); break;
			}
		}
	}catch(e){
		console.error("Произошла ошибка при отправке сообщения!\nТип: " + Type + "\nСообщение: " + Message + "\nException: " + Exception + "\nException сообщения: " + e.message, e);
	}
}

const Logger = {};
Logger.Info  = function(Message, Exception, Style){ __Print(Message, Exception, 0, Style); }
Logger.Warn  = function(Message, Exception, Style){ __Print(Message, Exception, 1, Style); }
Logger.Error = function(Message, Exception, Style){ __Print(Message, Exception, 2, Style); }
Logger.Fatal = function(Message, Exception, Style){
	Logger.Error(Message, Exception, Style);
	alert(Message + "\nСм. консоль (F12)");
}