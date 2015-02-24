$(document).ready(function (){
	var box			= $("#angleBox");
	var beginX		= window.innerWidth/2;
	var beginY		= window.innerHeight/2;
	
	
	var sinColor = "#00AA00";
	var cosColor = "#0000AA";
	var tgColor = "#00AAAA";
	var cotgColor = "#AA0000";
	
	
	var radius		= 350;
	
	var svg			= $('svg');
	
	var circle		= $('#mainCircle');
	
	var sinAxis 	= $("#sinAxis");
	var cosAxis		= $("#cosAxis");
	var tgAxis		= $("#tgAxis");
	var cotgAxis	= $("#cotgAxis");
	
	var sinTxt 		= $("#sinTxt");
	var cosTxt		= $("#cosTxt");
	var tgTxt		= $("#tgTxt");
	var cotgTxt		= $("#cotgTxt");
	
	var angleArm	= $("#angleArm");
	var angleArc	= $("#angleArc");
	
	svg.css({
		width:  window.innerWidth,
		height: window.innerHeight
	});
	
	circle.attr({
		cx : beginX,
		cy : beginY,
		r : radius
	});
	
	sinAxis.attr({
		x1: beginX,
		y1: 0,
		x2: beginX,
		y2: window.innerHeight,
		stroke: sinColor
	});
	
	
	cosAxis.attr({
		x1: 0,
		y1: beginY,
		x2: window.innerWidth,
		y2: beginY,
		stroke: cosColor
	});
	
	
	tgAxis.attr({
		x1: beginX + radius,
		y1: 0,
		x2: beginX + radius,
		y2: window.innerHeight,
		stroke: tgColor
	});
	
	cotgAxis.attr({
		x1: 0,
		y1: beginY - radius,
		x2: window.innerWidth,
		y2: beginY - radius,
		stroke: cotgColor
	});
	
	angleArm.attr({
		x1: beginX,
		y1: beginY
	});
	
	sinTxt.attr({
		x: beginX + 10,
		y: beginY - radius - 10,
		fill: sinColor
	});
	
	cosTxt.attr({
		x: beginX + radius + 10,
		y: beginY - 10,
		fill: cosColor
	})
	
	tgTxt.attr({
		x: beginX + radius + 10,
		y: beginY - (radius/2),
		fill: tgColor
	});
	
	cotgTxt.attr({
		x: beginX + (radius / 2),
		y : beginY - radius - 10,
		fill: cotgColor
	});
	
	
	var angle = 0;
	
	
	var animator;
	
	
	animateAngle();
	
	function animateAngle(){
		var toAngle = parseInt(box.val());
		
		if(angle-toAngle > 0){
			angle -= 1;
		}else if (angle-toAngle < 0){
			angle += 1;
		}
		
		var radians = angle * (Math.PI / 180);
		
		x = beginX + (Math.cos(radians) * radius);
		
		
		y = beginY - (Math.sin(radians) * radius);
		
		
		angleArm.attr("x2", x);
		angleArm.attr("y2", y);
		
		angleArc.attr("d", describeArc(beginX, beginY, 50, 90-angle, 90));
		
		
		animator = setTimeout(animateAngle, 15);
	}
	
	function describeArc(x, y, radius, startAngle, endAngle){

	    var start = polarToCartesian(x, y, radius, endAngle);
	    var end = polarToCartesian(x, y, radius, startAngle);

	    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

	    var d = [
	        "M", start.x, start.y, 
	        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
	    ].join(" ");

	    return d;       
	}
	function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

		  return {
		    x: centerX + (radius * Math.cos(angleInRadians)),
		    y: centerY + (radius * Math.sin(angleInRadians))
		  };
		}

});

