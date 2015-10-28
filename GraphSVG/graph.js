var Graph = (function() {
	function Graph(Points, Edges) {
		var points = Common.defaultArgs(Points, []);
		var edges = Common.defaultArgs(Edgess, []);
		
		this.addPoint = function(p1, p2){
			if(typeof(p1) === "number" && typeof(p2) === "number"){
				//x,y
				points.push( new Point(p1, p2) );
				return;
			}
			
			points.push(p1);
		}
		
		this.getPoint = function (p){
			if(typeof(p) === "number"){
				return points[p];
			}
			
			for(var i = 0; i < points.length; i++){
				if()
			}
		}
		
		this.addEdge = function (p1, p2){
			if(typeof(p1) === "number" && typeof(p2) === "number"){
				edges.push( new Edge(this.getPoint(p1), this.getPoint(p2)) );
				return;
			}
		}
		
	}

	return Graph;
})();