REGISTER_PAGE("trash", "G-WORLD-3", function(){
	return ELEMENT_SITE(`
		<center>also try <text class="glitch2"><b>.exe</b></text> version for <text class="glitch2">multiplayer</text>...</center>
		<div style="padding: 1rem; height: calc(100vh - 190px); box-sizing: border-box;">
			<div style="
				border: 3px solid #ff0044;
				height: 100%;
				border-radius: 12px;
				padding: 6px;
				background: #0a0000;
				box-shadow: 0 0 60px rgba(255,0,68,0.2);
			">
				<iframe
					src="GOLUWorld.html"
					style="
						width: 100%;
						height: 100%;
						border: 0;
						display: block;
						background: transparent;
					"
					allow="autoplay; fullscreen"
					allowtransparency="true"
				></iframe>
			</div>
		</div>
		`,
		function(){
			var bg = document.getElementById('MAIN');
			bg.style.background = 'radial-gradient(ellipse at center, #0a0000 0%, #000000 100%)';
			bg.style.color = '#ff4466';
		},
		false
	);
});