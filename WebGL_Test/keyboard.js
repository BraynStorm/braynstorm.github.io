var Keyboard = (function() {
	function Keyboard() {
		var keys = [256];
		
		this.keydown = function(e){
			keys[e.keyCode] = true;
		}
		
		this.keyup = function(e){
			keys[e.keyCode] = false;
		}
		
		this.isKeyDown = function(code){
			return keys[code] === true;
		}
		
		eventManager.register('keydown', this.keydown);
		eventManager.register('keyup', this.keyup);
	}
	
	Keyboard.KEY_W = 87;
	Keyboard.KEY_A = 65;
	Keyboard.KEY_S = 83;
	Keyboard.KEY_D = 68;
	
	Keyboard.KEY_X = 88;
	Keyboard.KEY_SPACE = 32;
	
	Keyboard.KEY_SHIFT = 16;
	Keyboard.KEY_CTRL = 17;
	
	
	return Keyboard;
})();