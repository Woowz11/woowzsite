console.log("LOAD RECAPTCHA");

const key = "6LfqQDEqAAAAAHCsAgb8qPh3k3B3bf_EnQIcaAPd"
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://www.google.com/recaptcha/enterprise.js?render="+key;
document.head.appendChild(script);

export function Recaptcha(func,funcerror){
	grecaptcha.enterprise.ready(function() {
        grecaptcha.enterprise.execute(key, {action: 'submit'}).then(function(token) {
			if(func!=null){func();}
        }).catch(function(error) {
            if(funcerror!=null){funcerror(error);}
        });
    });
}