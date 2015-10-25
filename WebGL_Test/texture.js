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
		
		/**
		 * @param filter Default gl.LINEAR
		 */
		this.setMagFilter = function (filter){
			var filter = filter || gl.LINEAR;
			gl.bindTexture(gl.TEXTURE_2D, id);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		/**
		 * @param v Default gl.LINEAR_MIPMAP_NEAREST
		 */
		this.setMinFilter = function (filter){
			var filter = filter || gl.LINEAR_MIPMAP_NEAREST;
			gl.bindTexture(gl.TEXTURE_2D, id);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.setRepeatX= function (wrap){
			var wrap = wrap || gl.REPEAT;
			gl.bindTexture(gl.TEXTURE_2D, id);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
		
		this.setRepeatY = function (wrap){
			var wrap = wrap || gl.REPEAT;
			gl.bindTexture(gl.TEXTURE_2D, id);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
			gl.bindTexture(gl.TEXTURE_2D, undefined);
		}
	}
	
	
	

	return Texture;
})();