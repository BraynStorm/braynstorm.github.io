var Texture = (function() {
	function Texture(opts, activeTexture) {
		opts = Common.defaultArg(opts, {});
		activeTexture = Common.defaultArg(activeTexture, gl.TEXTURE0);
		
		var options = [];
		options[activeTexture] = {
				filterMag : Common.defaultArg(opts.filterMag, gl.LINEAR),
				filterMin : Common.defaultArg(opts.filterMin, gl.LINEAR),
				repeatX : Common.defaultArg(opts.repeatX, gl.CLAMP_TO_EDGE),
				repeatY : Common.defaultArg(opts.repeatY, gl.CLAMP_TO_EDGE),
		}
		
		var id = undefined;
		
		this.bind = function (activeTexture){
			gl.bindTexture(gl.TEXTURE_2D, id);
			gl.activeTexture(Common.defaultArg(activeTexture, gl.TEXTURE0));
		}
		
		this.load = function (name, activeTexture){
			var img = new Image();
			var THIS = this;
			
			if(gl.isTexture(id) !== true){
				id = gl.createTexture();
			}
			
			img.src = name;
			img.onload = function (){
				gl.bindTexture(gl.TEXTURE_2D, id);
				gl.activeTexture(Common.defaultArg(activeTexture, gl.TEXTURE0));
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
				THIS.setOptions(options, activeTexture)
				gl.bindTexture(gl.TEXTURE_2D, undefined);
			}
			
			img.onerror = function (){
				console.log(img.src);
				id = DEFAULT_TEXTURE.getID();
				THIS.setOptions(DEFAULT_TEXTURE.getOptions());
			}
		}
		
		this.setOptions = function (opts, activeTexture){
			activeTexture = Common.defaultArg(activeTexture, gl.TEXTURE0);
			
			options[activeTexture] = {
					filterMag : Common.defaultArg(opts.filterMag, options[activeTexture].filterMag),
					filterMin : Common.defaultArg(opts.filterMin, options[activeTexture].filterMin),
					repeatX : Common.defaultArg(opts.repeatX, options[activeTexture].repeatX),
					repeatY : Common.defaultArg(opts.repeatY, options[activeTexture].repeatY),
			};
			
			this.bind(activeTexture);
			
			console.log(opts);
			
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, options[activeTexture].filterMin);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, options[activeTexture].filterMag);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, options[activeTexture].repeatX);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, options[activeTexture].repeatY);
			
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.getID = function (){
			return id;
		}
		
		this.getOptions = function (){
			return options;
		}
	}
	
	
	Texture.bind = function (tex, activeTexture){
		Common.defaultArg(tex, DEFAULT_TEXTURE).bind(activeTexture);
	}
	
	return Texture;
})();