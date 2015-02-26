var angleBox;
var radiusBox;
var beginX;
var beginY;

var sinColor;
var cosColor;
var tgColor;
var cotgColor;

var radius;

var svg;

var circle;
var showAdditions;

var sinAxis;
var cosAxis;
var tgAxis;
var cotgAxis;

var sinTxt;
var cosTxt;
var tgTxt;
var cotgTxt;



var angleArm;
var angleArc;
var ghostArm;

var projectionSin;
var projectionCos;
var projectionTg;
var projectionCotg;

var projectionSinTxt;
var projectionCosTxt;
var projectionTgTxt;
var projectionCotgTxt;

var angle;
var arcAngle;

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
	
	projectionTg.attr({
		x1: beginX,
		y1: beginY,
		x2: beginX + radius,
		y2: beginY,
		stroke: tgColor
	});
	
	projectionCotg.attr({
		x1: beginX,
		y1: beginY,
		x2: beginX,
		y2: beginY - radius,
		stroke: cotgColor
	});
	
	
	ghostArm.attr({
		x1: beginX,
		y1: beginY
	});
};

$(document).ready(function (){
	angleBox	= $("#angleBox");
	radiusBox	= $("#radiusBox");
	beginX		= window.innerWidth/2;
	beginY		= window.innerHeight/2;
	
	sinColor = "#00AA00";
	cosColor = "#0000AA";
	tgColor = "#00AAAA";
	cotgColor = "#AA0000";
	
	radius		= 100;
	
	svg			= $('svg');
	
	circle		= $('#mainCircle');
	showAdditions = $("#showAdditions");
	
	sinAxis 	= $("#sinAxis");
	cosAxis		= $("#cosAxis");
	tgAxis		= $("#tgAxis");
	cotgAxis	= $("#cotgAxis");
	
	sinTxt 		= $("#sinTxt");
	cosTxt		= $("#cosTxt");
	tgTxt		= $("#tgTxt");
	cotgTxt		= $("#cotgTxt");
	
	
	
	angleArm	= $("#angleArm");
	angleArc	= $("#angleArc");
	ghostArm	= $("#ghostArm");
	
	projectionSin = $("#projectionSin");
	projectionCos = $("#projectionCos");
	projectionTg	= $("#projectionTg");
	projectionCotg	= $("#projectionCotg");
	
	projectionSinTxt = $("#projectionSinTxt");
	projectionCosTxt = $("#projectionCosTxt");
	projectionTgTxt = $("#projectionTgTxt");
	projectionCotgTxt = $("#projectionCotgTxt");
	
	radiusBox.keyup(function (){
		init();
	});
	
	showAdditions.click(function (){
		if(showAdditions.is(":checked")){
			projectionSin.attr("stroke-width","2");
			projectionCos.attr("stroke-width","2");
			projectionTg.attr("stroke-width","2");
			projectionCotg.attr("stroke-width","2");
			projectionSinTxt.attr("fill", sinColor);
			projectionCosTxt.attr("fill", cosColor);
			projectionTgTxt.attr("fill", tgColor);
			projectionCotgTxt.attr("fill", cotgColor);
		}else{
			projectionSin.attr("stroke-width","0");
			projectionCos.attr("stroke-width","0");
			projectionTg.attr("stroke-width","0");
			projectionCotg.attr("stroke-width","0");
			projectionSinTxt.attr("fill", "none");
			projectionCosTxt.attr("fill", "none");
			projectionTgTxt.attr("fill", "none");
			projectionCotgTxt.attr("fill", "none");
		}
	});
	
	
	init();
	
	angle = 0;
	
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
		var tg = Math.tan(radians);
		var cotg = 1/tg;
		
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
		
		projectionTg.attr({
			x1: beginX,
			x2: beginX + radius,
			y1: beginY - (tg * radius),
			y2: beginY - (tg * radius)
		});
		
		projectionCotg.attr({
			x1: beginX + (cotg * radius),
			x2: beginX + (cotg * radius), 
			y1: beginY,
			y2: beginY - radius
		});
		
		
		projectionSinTxt.attr({
			x: x+10,
			y: (beginY - (beginY - y) / 2) + (parseInt(projectionSinTxt.css("font-size")) / 2)
		}).html(parseInt(sin*100)/100);
		
		projectionCosTxt.attr({
			x: (beginX + (x - beginX) / 2) - 10,
			y: y - 10
		}).html(parseInt(cos*100)/100);
		
		projectionTgTxt.attr({
			x: beginX + radius + 10,
			y: Math.max(20, Math.min(beginY - tg * radius, window.innerHeight - 20))
		}).html(parseInt(tg * 100) / 100);
		
		projectionCotgTxt.attr({
			x: Math.max(10, Math.min(beginX + cotg * radius, window.innerWidth - 55)),
			y: beginY - radius - 10
		}).html(parseInt(cotg * 100) / 100);
		
		if(!(sin > 0 && cos > 0)){
			ghostArm.attr("stroke-width", "2");
		}else{
			ghostArm.attr("stroke-width", "0");
		}
		
		angleArm.attr("x2", xb);
		angleArm.attr("y2", yb);
		
		
		
		ghostArm.attr({
			x2: beginX + ( Math.cos((180 + angle % 360) * (Math.PI / 180)) * radius * 4),
			y2: beginY - ( Math.sin((180 + angle % 360) * (Math.PI / 180)) * radius * 4)
		});
		
		arcAngle = (90-angle % 360);
		
		angleArc.attr("d", describeArc(beginX, beginY, radius/5, Math.min(arcAngle,90), Math.max(90,arcAngle)));
		
		
		animator = setTimeout(animateAngle, 15);
	}
	
	function getQuadrant(a){
		a = a % 360;
		if(a >= 0){
			if(a <= 90) return 1;
			if(a <= 180) return 2;
			if(a <= 270) return 3;
			return 4;
		}else{
			if(a >= -90) return 4;
			if(a >= -180) return 3;
			if(a >= -270) return 2;
			return 1;
		}
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

