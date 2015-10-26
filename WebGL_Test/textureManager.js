var TextureManager = (function() {
	function TextureManager() {
		var map = {};

		this.getTexture = function (name, activeTexture){
			
			if(name === undefined){
				return DEFAULT_TEXTURE;
			}
			
			name = 'img/textures/' + name;
			var imgName = name.match(filenamePattern);
			if(imgName === null || imgName[1] === null || imgName[1].length < 1)
				name += '.png';
			
			if(map[name] === undefined){
				var t = new Texture();
				t.load(name, activeTexture);
				map[name] = t;
			}
			
			return map[name];
		}
	}
	
	
	
	return TextureManager;
})();