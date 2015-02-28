$(document).ready(function (){
	var button = $(".button");
	var leftSide = ".buttonLeftSide";
	var rightSide = ".buttonRightSide";
	var closed = ".buttonClosed";
	var content;
	var buttonWidth = '500';
	
	
	button.hover(function (){
		content = $(this).find(".buttonContent");
		
		$(this).find(closed).stop().animate({
			//transform : "rotate(0deg)"
		}, {duration: 500, done: function (){
			//$(this).css("display", "none");
			
			$(this).parent().find(leftSide).stop().animate({
				marginLeft: parseInt($(this).width())/2 - parseInt($(this).find(leftSide).width()) - buttonWidth/2 + 20
			}, {duration: 700, queue: false, start: function (){
				$(this).css("display", "block");
			}});
			
			$(this).parent().find(rightSide).stop().animate({
				marginLeft: 0
			}, {duration: 700, queue: false, start: function (){
				$(this).css("display", "block");
			}});
			
			content.stop().animate({
				width: buttonWidth,
				paddingLeft: 30,
				paddingRight: 30,
			}, {duration: 700, queue: false});
		}});
		
		
		
		
		
	}, function (){
		content = $(this).find(".buttonContent");

		$(this).find(leftSide).stop().animate({
			marginLeft: parseInt($(this).width())/2 - parseInt($(this).find(leftSide).width())
		}, {duration: 700, queue:false, done: function (){
			$(this).css("display", "none");
		}});
		
		$(this).find(rightSide).stop().animate({
			marginLeft: -20
		}, {duration: 700, queue:false, done: function (){
			$(this).css("display", "none");
		}});
		
		content.stop().animate({
			width: 0,
			paddingLeft: 0,
			paddingRight: 0
		}, {duration: 700, queue: false});
	}).trigger();
	
});