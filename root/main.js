$(document).ready(function (){
	var button = $(".button");
	var leftSide = ".buttonLeftSide";
	var rightSide = ".buttonLeftSide";
	var content;
	var buttonWidth = '500px';
	
	button.hover(function (){
		content = $(this).find(".buttonContent");
		content.stop().animate({
			width: buttonWidth,
			paddingLeft: 30,
			paddingRight: 30
		}, 700);
	}, function (){
		content = $(this).find(".buttonContent");
		content.stop().animate({
			width: 0,
			paddingLeft: -10,
			paddingRight: -10
		}, 700);
		$(this).animate({
			transform: "rotate(90)"
		});
	});
});