var Mouse = (function() { //TODO Detrimine if this class is actually useless.
	function Mouse() {
		var x = 0;
		var y = 0;
		
		var centerX = $('#canvas').width() / 2;
		var centerY = $('#canvas').height() / 2;
		
		var flagIsMouseDown = false;
		
		var mouseLastClickPoint = new Vec2(0, 0);
	
		this.mouseDown = function(eventData) {
			mouseLastClickPoint = new Vec2(eventData.x - centerX, eventData.y - centerY);
			
			flagIsMouseDown = eventData.button;
			console.log("Down!");
		};
		
		this.mouseUp = function(eventData) {
			flagIsMouseDown = -1;
			mouseLastClickPoint = undefined;
			console.log("Up!");
		};
		
		this.mouseMove = function(eventData) {
			x = eventData.x - centerX;
			y = eventData.y - centerY;
		};
		
		
		this.getMouseState = function() {
			return flagIsMouseDown;
		}
		
		this.getX = function() {
			return x;
		}
		
		this.getY = function() {
			return y;
		}
		
		this.getLastClickPoint = function() {
			return mouseLastClickPoint;
		}
		
		eventManager.register('mousedown', this.mouseDown);
		eventManager.register('mousemove', this.mouseMove);
		eventManager.register('mouseup', this.mouseUp);
	}
	return Mouse;
})();