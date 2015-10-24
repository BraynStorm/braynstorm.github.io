var TextureManager = (function() {
	function TextureManager() {
		var map = {};
		
		this.loadTexture = function(srcLink, options){
			var texID = gl.createTexture();
			var img = new Image();
			
			img.onload = function (){
				gl.bindTexture(gl.TEXTURE_2D, texID);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
				gl.bindTexture(gl.TEXTURE_2D, undefined);
				
				console.log(img);
				var tex = new Texture(texID, img.width, img.height, options);
			}
			
			/*
			 * gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
				
				gl.generateMipmap(gl.TEXTURE_2D);
			 */
			img.src = srcLink;
			
		}
	}
	
	return TextureManager;
})();