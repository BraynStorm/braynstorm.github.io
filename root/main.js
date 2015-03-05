$(document).ready(function (){
	OpeningButton.init(700, 100, 200, ".button-holder",".button-spinner",".button-left",".button-right", ".button-text");
});

var OpeningButton = {};

OpeningButton.init = function (txtWidth, rotateSpeed, openSpeed, buttonClass, spinnerClass, buttonLeftClass, buttonRightClass, buttonTextClass){
	
	if($ == undefined || jQuery == undefined){
		console.log("JQUERY isn't installed!" + "\n Exiting..");
		return 0;
	}
	
	
	
	var button  = $(buttonClass);
	var spinner;
	var leftSide;
	var rightSide;
	var text;
	var THIS;
	
	button.mouseenter(function (){
		//stop();
		spinner = $(this).find("div" + spinnerClass);
		leftSide = $(this).find("div" + buttonLeftClass);
		rightSide = $(this).find("div" + buttonRightClass);
		text = $(this).find("div" + buttonTextClass);
		
		$.each($(this).children(), function (i,v){
			$(v).stop();
		});
		
		THIS = $(this);
		
		leftSide.css("marginLeft", THIS.width()/2 - leftSide.width()).stop();
		
		text.stop();
		spinner.stop().transition({rotate:"90deg", duration: rotateSpeed, complete: function (){
			spinner.css("display", "none");
			leftSide.css("display", "block");
			rightSide.css("display", "block");
			text.css("display", "block").stop().animate({
				width: txtWidth
			}, {duration: openSpeed, queue: false});
			leftSide.stop().animate({
				marginLeft: (THIS.width() - txtWidth) / 2 - leftSide.width()
			}, {duration: openSpeed, queue: false});
			
		}});
		//spinner.css("display", "none");
	}).mouseleave(function (){
		//stop();
		spinner = $(this).find("div" + spinnerClass);
		leftSide = $(this).find("div" + buttonLeftClass);
		rightSide = $(this).find("div" + buttonRightClass);
		text = $(this).find("div" + buttonTextClass);
		
		$.each($(this).children(), function (i,v){
			$(v).stop();
		});
		
		spinner.stop();
		leftSide.stop();
		text.stop().animate({
			width: 0
		},{
			duration: openSpeed,
			queue: false,
			complete: function (){
				
				leftSide.css("display", "none");
				rightSide.css("display", "none");
				text.css("display", "none");
				
				spinner.css("display", "block").stop().transition({
					rotate:"0deg",
					duration: rotateSpeed,
					complete: function (){
						spinner.css("display", "block");
						
						leftSide.css("display", "none");
						rightSide.css("display", "none");
						text.css("display", "none");
					}
				});
			}
		});
		
		leftSide.stop().animate({
			marginLeft: ( THIS.width() / 2 - leftSide.width() )
		}, {duration: openSpeed, queue: false});
		
	});
}