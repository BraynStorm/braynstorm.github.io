var svg = $("#SVG");
var menu = $("menu");
var menuItem = $(".menuItem");

$(function (){
	for(var v in LogicElements){
		var path = $('<path stroke="black" stroke-width="1"/>').attr("d");
		$('<svg width="200" height="200"></svg>').appendTo(menu).append(path);
	}
});