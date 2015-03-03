$(document).ready(function (){
	OpeningButton.init(700, 100, 200, ".button-holder",".button-spinner",".button-left",".button-right", ".button-text");
});

var OpeningButton = {};

OpeningButton.init = function (txtWidth, rotateSpeed, openSpeed, buttonClass, spinnerClass, buttonLeftClass, buttonRightClass, buttonTextClass){
	
	if($ == undefined || jQuery == undefined){
		console.log("JQUERY isn't installed!" + "\n Exiting..");
		return 0;
	}
	
	THIS = this;
	
	var button  = $(buttonClass);
	var spinner;
	var leftSide;
	var rightSide;
	var text;
	
	button.mouseenter(function (){
		//stop();
		console.log("mouseover");
		spinner = $(this).find('div' + spinnerClass);
		leftSide = $(this).find('div' + buttonLeftClass);
		rightSide = $(this).find('div' + buttonRightClass);
		text = $(this).find('div' + buttonTextClass);
		
		text.stop();
		spinner.stop().transition({rotate:'90deg', duration: rotateSpeed, complete: function (){
			console.log("spinnerSpun");
			spinner.css("display", "none");
			leftSide.css("display", "block");
			rightSide.css("display", "block");
			text.css("display", "block").stop().animate({
				width: txtWidth
			}, openSpeed);
			console.log("textAppeared");
			
		}});
		//spinner.css("display", 'none');
	}).mouseleave(function (){
		//stop();
		spinner = $(this).find('div' + spinnerClass);
		leftSide = $(this).find('div' + buttonLeftClass);
		rightSide = $(this).find('div' + buttonRightClass);
		text = $(this).find('div' + buttonTextClass);
		spinner.stop();
		text.stop().animate({
			width: 0
		},{
			duration: openSpeed,
			complete: function (){
				
				leftSide.css("display", "none");
				rightSide.css("display", "none");
				text.css("display", "none");
				
				spinner.css("display", 'block').stop().transition({
					rotate:'0deg',
					duration: rotateSpeed,
					complete: function (){
						spinner.css("display", 'block');
						
						leftSide.css("display", "none");
						rightSide.css("display", "none");
						text.css("display", "none");
						
						console.log("oout");
					}
				});
			}
		});
		
		
		
		
	});
	
}