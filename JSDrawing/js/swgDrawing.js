$(document).ready(function (){
	var angleBox	= $("#angleBox");
	var radiusBox	= $("#radiusBox");
	var beginX		= window.innerWidth/2;
	var beginY		= window.innerHeight/2;
	
	var sinColor = "#00AA00";
	var cosColor = "#0000AA";
	var tgColor = "#00AAAA";
	var cotgColor = "#AA0000";
	
	var radius		= 100;
	
	var svg			= $('svg');
	
	var circle		= $('#mainCircle');
	var showAdditions = $("#showAdditions");
	
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
	
	var projectionSin = $("#projectionSin");
	var projectionCos = $("#projectionCos");
	
	var projectionSinTxt = $("#projectionSinTxt");
	var projectionCosTxt = $("#projectionCosTxt");
	radiusBox.keypress(function (){
		init();
	});
	
	function init(){
		radius = parseInt(radiusBox.val());
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
		
		
		projectionSin.attr({
			x1: beginX,
			y1: beginY,
			x2: beginX,
			y2: beginY,
			stroke: sinColor
		});
		
		projectionCos.attr({
			x1: beginX,
			y1: beginY,
			x2: beginX,
			y2: beginY,
			stroke: cosColor
		});
		
		
	};
	
	showAdditions.click(function (){
		if(showAdditions.is(":checked")){
			projectionSin.attr("stroke-width","2");
			projectionCos.attr("stroke-width","2");
			projectionSinTxt.attr("fill", sinColor);
			projectionCosTxt.attr("fill", cosColor);
		}else{
			projectionSin.attr("stroke-width","0");
			projectionCos.attr("stroke-width","0");
			projectionSinTxt.attr("fill", "none");
			projectionCosTxt.attr("fill", "none");
		}
	});
	
	init();
	
	var angle = 0;
	
	var animator;
	
	animateAngle();
	
	function animateAngle(){
		var toAngle = parseInt(angleBox.val());
		
		if(angle-toAngle > 0){
			angle -= 1;
		}else if (angle-toAngle < 0){
			angle += 1;
		}
		
		var radians = angle * (Math.PI / 180);
		
		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		
		x = beginX + (cos * radius);
		y = beginY - (sin * radius);
		
		var xb = beginX + (cos * radius * 4);
		var yb = beginY - (sin * radius * 4);
		
		projectionCos.attr({
			x2: x,
			y1: y,
			y2: y
		});
		
		projectionSin.attr({
			x1: x,
			x2: x,
			y2: y
		});
		
		
		projectionSinTxt.attr({
			x: x+10,
			y: (beginY - Math.abs(beginY - y) / 2) + (parseInt(projectionSinTxt.css("font-size")) / 2)
		}).html(parseInt(cos*100)/100);
		
		projectionCosTxt.attr({
			x: (beginX + Math.abs(beginX - x) / 2) - 10,
			y: y - 10
		}).html(parseInt(sin*100)/100);
		
		angleArm.attr("x2", xb);
		angleArm.attr("y2", yb);
		
		angleArc.attr("d", describeArc(beginX, beginY, radius/5, 90-angle, 90));
		
		
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

