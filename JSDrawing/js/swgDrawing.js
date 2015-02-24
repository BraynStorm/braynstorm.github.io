$(document).ready(function (){
	var box = $("#angleBox");
	
	
	var angle = 0;
	var radius = 250;
	var x = radius*2+50; 
	var y = radius+50; 
	
	var animator;
	animateAngle();
	
	function animateAngle(){
		var toAngle = parseInt(box.val());
		
		if(angle-toAngle > 0){
			angle -= 1;
		}else if (angle-toAngle < 0){
			angle += 1;
		}else{
			
		}
		var radians = (Math.PI * 2) * (angle % 360) / 360 ;
		
		x = 300 + (Math.cos(radians) * radius);
		y = 300 - (Math.sin(radians) * radius);
		
		
		document.getElementById("angle").setAttributeNS(null, "x2", x);
		document.getElementById("angle").setAttributeNS(null, "y2", y);
		
		animator = setTimeout(animateAngle, 10/Math.abs(angle-toAngle));
	}
	
});
