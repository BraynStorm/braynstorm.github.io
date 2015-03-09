var angleBox;
var radiusBox;
var speedBox;

var menu;

var beginX;
var beginY;

var sinColor;
var cosColor;
var tgColor;
var cotgColor;

var radius;

var svg;

var circle;

var sinAxis;
var cosAxis;
var tgAxis;
var cotgAxis;

var sinTxt;
var cosTxt;
var tgTxt;
var cotgTxt;

var angleArm;
var ghostArm;
var angleArc;

var projectionSin;
var projectionCos;
var projectionTg;
var projectionCotg;

var projectionSinTxt;
var projectionCosTxt;
var projectionTgTxt;
var projectionCotgTxt;

var bgBox;
var angleArcNumber;

var sinBox;
var cosBox;
var tgBox;
var cotgBox;
var clickAngle;
var clickAngleAllowed = false;

var angle;
var arcAngle;

function init() {
	radius = parseInt(radiusBox.val());
	svg.css({
		width : window.innerWidth,
		height : window.innerHeight
	});

	circle.attr({
		cx : beginX,
		cy : beginY,
		r : radius
	});

	sinAxis.attr({
		x1 : beginX,
		y1 : 0,
		x2 : beginX,
		y2 : window.innerHeight,
		stroke : sinColor
	});

	cosAxis.attr({
		x1 : 0,
		y1 : beginY,
		x2 : window.innerWidth,
		y2 : beginY,
		stroke : cosColor
	});

	tgAxis.attr({
		x1 : beginX + radius,
		y1 : 0,
		x2 : beginX + radius,
		y2 : window.innerHeight,
		stroke : tgColor
	});

	cotgAxis.attr({
		x1 : 0,
		y1 : beginY - radius,
		x2 : window.innerWidth,
		y2 : beginY - radius,
		stroke : cotgColor
	});

	angleArm.attr({
		x1 : beginX,
		y1 : beginY
	});

	sinTxt.attr({
		x : beginX + 10,
		y : beginY - radius - 10,
		fill : sinColor
	});

	cosTxt.attr({
		x : beginX + radius + 10,
		y : beginY - 10,
		fill : cosColor
	})

	tgTxt.attr({
		x : beginX + radius + 10,
		y : beginY - (radius / 2),
		fill : tgColor
	});

	cotgTxt.attr({
		x : beginX + (radius / 2),
		y : beginY - radius - 10,
		fill : cotgColor
	});

	projectionSin.attr({
		x1 : beginX,
		y1 : beginY,
		x2 : beginX,
		y2 : beginY,
		stroke : sinColor
	});

	projectionCos.attr({
		x1 : beginX,
		y1 : beginY,
		x2 : beginX,
		y2 : beginY,
		stroke : cosColor
	});

	projectionTg.attr({
		x1 : beginX,
		y1 : beginY,
		x2 : beginX + radius,
		y2 : beginY,
		stroke : tgColor
	});

	projectionCotg.attr({
		x1 : beginX,
		y1 : beginY,
		x2 : beginX,
		y2 : beginY - radius,
		stroke : cotgColor
	});

	angleArcNumber.attr({
		x : beginX - 6,
		y : beginY + 5
	});

	ghostArm.attr({
		x1 : beginX,
		y1 : beginY
	});
};

$(document).ready(function () {

	angleBox = $("#angleBox");
	radiusBox = $("#radiusBox");
	speedBox = $("#speedBox");
	menu = $("#menu");
	beginX = window.innerWidth / 2;
	beginY = window.innerHeight / 2;

	sinColor = "#00AA00";
	cosColor = "#0000AA";
	tgColor = "#00AAAA";
	cotgColor = "#AA0000";

	radius = 100;

	svg = $('svg');

	circle = $('#mainCircle');

	sinAxis = $("#sinAxis");
	cosAxis = $("#cosAxis");
	tgAxis = $("#tgAxis");
	cotgAxis = $("#cotgAxis");

	sinTxt = $("#sinTxt");
	cosTxt = $("#cosTxt");
	tgTxt = $("#tgTxt");
	cotgTxt = $("#cotgTxt");

	sinBox = $("#sinBox");
	cosBox = $("#cosBox");
	tgBox = $("#tgBox");
	cotgBox = $("#cotgBox");

	clickAngle = $("#clickAngle");

	angleArm = $("#angleArm");
	ghostArm = $("#ghostArm");
	angleArc = $("#angleArc");

	projectionSin = $("#projectionSin");
	projectionCos = $("#projectionCos");
	projectionTg = $("#projectionTg");
	projectionCotg = $("#projectionCotg");

	projectionSinTxt = $("#projectionSinTxt");
	projectionCosTxt = $("#projectionCosTxt");
	projectionTgTxt = $("#projectionTgTxt");
	projectionCotgTxt = $("#projectionCotgTxt");

	bgBox = $(".bgBox");

	angleArcNumber = $("#angleArcNumber");

	radiusBox.keyup(function () {
		init();
	});

	sinBox.click(function () {
		if ($(this).find(".chbox").is(":checked")) {
			projectionSin.attr("stroke-width", "2");
			projectionSinTxt.attr("fill", sinColor);
			//bgBox.css("display", "block");
		} else {
			projectionSin.attr("stroke-width", "0");
			projectionSinTxt.attr("fill", "none");
			//bgBox.css("display", "none");
		}
	});

	cosBox.click(function () {
		if ($(this).find(".chbox").is(":checked")) {
			projectionCos.attr("stroke-width", "2");
			projectionCosTxt.attr("fill", cosColor);
		} else {
			projectionCos.attr("stroke-width", "0");
			projectionCosTxt.attr("fill", "none");
		}
	});

	tgBox.click(function () {
		if ($(this).find(".chbox").is(":checked")) {
			projectionTg.attr("stroke-width", "2");
			projectionTgTxt.attr("fill", tgColor);
		} else {
			projectionTg.attr("stroke-width", "0");
			projectionTgTxt.attr("fill", "none");
		}
	});

	cotgBox.click(function () {
		if ($(this).find(".chbox").is(":checked")) {
			projectionCotg.attr("stroke-width", "2");
			projectionCotgTxt.attr("fill", cotgColor);
		} else {
			projectionCotg.attr("stroke-width", "0");
			projectionCotgTxt.attr("fill", "none");
		}
	});

	clickAngle.click(function () {
		if ($(this).find(".chbox").is(":checked")) {
			clickAngleAllowed = true;
		} else {
			clickAngleAllowed = false;
		}
	});

	circle.click(clickAngleHandler);

	speedBox.keyup(function () {
		clearInterval(animator);
		animator = setInterval(animateAngle, parseInt(speedBox.val()));
	});

	function clickAngleHandler(m) {
		if (clickAngleAllowed) {
			m.preventDefault();

			var x = (m.pageX - beginX);
			var y = (beginY - m.pageY);

			var R = Math.sqrt(x * x + y * y);

			x /= R;
			y /= R;

			var t = Math.atan2(x, y);
			t = Math.floor(90 - (t * 180) / Math.PI);

			if (t < 0)
				t = 360 - Math.abs(t);

			angleBox.val(t);
		}
	}

	menu.draggable();

	init();

	angle = 0;

	var animator = animator = setInterval(animateAngle, parseInt(speedBox.val())); ;

	function animateAngle() {
		var toAngle = parseInt(angleBox.val());

		if (angle - toAngle > 0) {
			angle -= 1;
		} else if (angle - toAngle < 0) {
			angle += 1;
		}

		var radians = angle * (Math.PI / 180);

		var cos = Math.cos(radians);
		var sin = Math.sin(radians);
		var tg = Math.tan(radians);
		var cotg = 1 / tg;

		x = beginX + (cos * radius);
		y = beginY - (sin * radius);

		var xb = beginX + (cos * radius * 4);
		var yb = beginY - (sin * radius * 4);

		projectionCos.attr({
			x2 : x,
			y1 : y,
			y2 : y
		});

		projectionSin.attr({
			x1 : x,
			x2 : x,
			y2 : y
		});

		projectionTg.attr({
			x1 : beginX,
			x2 : beginX + radius,
			y1 : beginY - (tg * radius),
			y2 : beginY - (tg * radius)
		});

		projectionCotg.attr({
			x1 : beginX + (cotg * radius),
			x2 : beginX + (cotg * radius),
			y1 : beginY,
			y2 : beginY - radius
		});

		projectionSinTxt.attr({
			x : x + 10,
			y : (beginY - (beginY - y) / 2) + (parseInt(projectionSinTxt.css("font-size")) / 2)
		}).html(parseInt(sin * 100) / 100);

		projectionCosTxt.attr({
			x : (beginX + (x - beginX) / 2) - 10,
			y : y - 10
		}).html(parseInt(cos * 100) / 100);

		projectionTgTxt.attr({
			x : beginX + radius + 10,
			y : Math.max(20, Math.min(beginY - tg * radius, window.innerHeight - 20))
		}).html(parseInt(tg * 100) / 100);

		projectionCotgTxt.attr({
			x : Math.max(10, Math.min(beginX + cotg * radius, window.innerWidth - 55)),
			y : beginY - radius - 10
		}).html(parseInt(cotg * 100) / 100);

		if (!(sin > 0 && cos > 0)) {
			ghostArm.attr("stroke-width", "2");
		} else {
			ghostArm.attr("stroke-width", "0");
		}

		sinBox.find(".values").html(parseInt(sin * 10000) / 10000);
		cosBox.find(".values").html(parseInt(cos * 10000) / 10000);
		tgBox.find(".values").html(parseInt(tg * 10000) / 10000);
		cotgBox.find(".values").html(parseInt(cotg * 10000) / 10000);

		angleArm.attr({
			x2 : xb,
			y2 : yb
		});

		ghostArm.attr({
			x2 : beginX + (Math.cos((180 + angle % 360) * (Math.PI / 180)) * radius * 4),
			y2 : beginY - (Math.sin((180 + angle % 360) * (Math.PI / 180)) * radius * 4)
		});

		//SIN
		svg.find(".bgBox").attr({
			x : projectionSinTxt.attr("x") - 5,
			y : projectionSinTxt.attr("y") - 20,
			width : projectionSinTxt.width() + 10,
			fill : "rgba(0,0,0,0.2)"
		});

		arcAngle = (90 - angle % 360);

		angleArc.attr("d", describeArc(beginX, beginY, radius / 5, Math.min(arcAngle, 90), Math.max(90, arcAngle)));
		var rotations = Math.abs(Math.ceil((angle + 1) / 360));
		if (rotations > 1)
			angleArcNumber.html(rotations);
		else
			angleArcNumber.html("");
	}

	function getQuadrant(a) {
		a = a % 360;
		if (a >= 0) {
			if (a <= 90)
				return 1;
			if (a <= 180)
				return 2;
			if (a <= 270)
				return 3;
			return 4;
		} else {
			if (a >= -90)
				return 4;
			if (a >= -180)
				return 3;
			if (a >= -270)
				return 2;
			return 1;
		}
	}

	function describeArc(x, y, radius, startAngle, endAngle) {

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
		var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

		return {
			x : centerX + (radius * Math.cos(angleInRadians)),
			y : centerY + (radius * Math.sin(angleInRadians))
		};
	}

});
