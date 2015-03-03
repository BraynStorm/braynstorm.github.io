$(document).ready(function (){
	OpeningButton.init(".button-holder",".button-spinner",".button-left",".button-right");
});

var OpeningButton = {};

OpeningButton.init = function (buttonClass, spinnerClass, buttonLeftClass, buttonRightClass){
	
	if($ == undefined || jQuery == undefined){
		console.log("JQUERY isn't installed!" + "\n Exiting..");
		return 0;
	}
	
	THIS = this;
	
	var button  = $(buttonClass);
	var spinner;
	var leftSide;
	var rightSide;
	
	button.mouseover(function (){
		spinner = $(this).find('div' + spinnerClass);
		
		spinner.stop().transition({rotate:'90deg', duration: 500, complete: function (){
			spinner.css("display", 'none');
		}});
		//spinner.css("display", 'none');
	}).mouseout(function (){
		spinner = $(this).find('div' + spinnerClass);
		
		
		
		spinner.stop().css("display", 'block').transition({
			rotate:'0deg',
			duration: 500,
			complete: function (){
				spinner.css("display", 'block');
			}
		});
		
	});
	
}