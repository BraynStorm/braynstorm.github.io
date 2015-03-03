$(document).ready(function (){
	OpeningButton.init(500, 500, ".button-holder",".button-spinner",".button-left",".button-right", ".button-text");
});

var OpeningButton = {};

OpeningButton.init = function (rotateSpeed, openSpeed, buttonClass, spinnerClass, buttonLeftClass, buttonRightClass, buttonTextClass){
	
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
	
	button.mouseover(function (){
		stop();
		spinner = $(this).find('div' + spinnerClass);
		leftSide = $(this).find('div' + buttonLeftClass);
		rightSide = $(this).find('div' + buttonRightClass);
		text = $(this).find('div' + buttonTextClass);
		
		spinner.transition({rotate:'90deg', duration: rotateSpeed, complete: function (){
			spinner.css("display", "none");
			leftSide.css("display", "block");
			rightSide.css("display", "block");
			text.css("display", "block").animate({
				width: 700
			}, openSpeed);
			
			console.log("over");
		}});
		//spinner.css("display", 'none');
	}).mouseout(function (){
		stop();
		spinner = $(this).find('div' + spinnerClass);
		leftSide = $(this).find('div' + buttonLeftClass);
		rightSide = $(this).find('div' + buttonRightClass);
		text = $(this).find('div' + buttonTextClass);
		
		text.animate({
			width: 0
		},{
			duration: openSpeed,
			complete: function (){
				
				leftSide.css("display", "none");
				rightSide.css("display", "none");
				text.css("display", "none");
				
				spinner.css("display", 'block').transition({
					rotate:'0deg',
					duration: rotateSpeed,
					complete: function (){
						spinner.css("display", 'block');
						console.log("oout");
					}
				});
			}
		});
		
		
		
		
	});
	
}