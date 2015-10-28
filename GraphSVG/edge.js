var Edge = (function() {
	function Edge(P1, P2) {
		var p1 = P1;
		var p2 = P2;
		
		this.getPoint1 = function (){
			return p1;
		}
		
		this.getPoint2 = function (){
			return p2;
		}
		
		this.getDistanceSquared = function(){
			return (
					Math.pow(p1.getX() - p2.getX(), 2) + 
					Math.pow(p1.getY() - p2.getY(), 2)
			);
		}
		
		this.getDistance= function(){
			return Math.sqrt(this.getDistanceSquared());
		}
	}

	return Edge;
})();