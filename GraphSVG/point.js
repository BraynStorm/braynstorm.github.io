var Point = (function() {
	function Point(X, Y, Color) {
		var x = X;
		var y = Y;
		var color = Common.defaultArgs(Color, "rgba(0, 1, 0, 0.3)");
		
		var svg = $('<circle cx cy r style="stroke-width: 1px; stroke: #000; fill: "'+color+'"');
		
		
		this.getX = function (){
			return x;
		}
		
		this.getY = function (){
			return y;
		}
		
		this.getSVG = function (){
			return svg;
		}
	}

	return Point;
})();