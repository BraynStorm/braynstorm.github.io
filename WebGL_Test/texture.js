var Texture = (function() {
	function Texture(id, w, h, options) {
		var options = {
				filterMag : options.filterMag || gl.LINEAR,
				filterMin : options.filterMin || gl.LINEAR_MIPMAP_NEAREST,
				repeatX : options.repeatX || gl.REPEAT,
				repeatY : options.repeatY || gl.REPEAT,
		};
		
		var id = id;
		var width = w;
		var height = h;
				
		this.setMagFilter = function (v){
			gl.bindTexture(gl.TEXTURE_2D, id);
			
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.setMinFilter = function (v){
			gl.bindTexture(gl.TEXTURE_2D, id);
			
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.setRepeatX= function (v){
			gl.bindTexture(gl.TEXTURE_2D, id);
			
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.setRepeatY = function (v){
			gl.bindTexture(gl.TEXTURE_2D, id);
			
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
	}
	
	
	

	return Texture;
})();