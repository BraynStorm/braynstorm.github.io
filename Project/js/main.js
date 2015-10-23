var scrollingImgNum = 3;
var doBlurBG = false;
/*
 * Admin Panel
 */

function showAdminPanel(){
	$("#admin-panel-button").click(function (){
		$("#admin-panel").css({
			display: "block",
			top: "50%",
			left: "50%"
		});
	});
}

function loadPage(page){
	window.location.href = page;
}

function blurBackground(){
	$("#container").toggleClass("blurred");
}

function setLocale(locale){
	$.ajax({
		url: "cmd.php",
		data:{ "locale" : locale },
		method: "post",
		success: function (msg){
			loadPage("index.php");
		}
	});
}

$(document).ready(function (){
	
	if(doBlurBG){
		blurBackground();
	}
	
	/*
	 * Menu ribbon Elemnt hover/click
	 *//*
	var lastBG;
	$("#menu-ribbon td").hover(function (){
		lastBG = $(this).css("background-color");
		$(this).css("background-color", "#EEE");
	},function (){
		$(this).css("background-color", lastBG);
	});*/
	
	
	/*
	 * Scrolling Ribbon
	 */
	if($(".scrolling-ribbon").length){
		var scrolledTo = 0;
		setInterval(function (){
			if(scrollingImgNum > scrolledTo + 1)
				scrolledTo += 1;
			else 
				scrolledTo = 0;
			
			console.log("lol");
			
			$(".scrolling-ribbon div img").animate({
				left: (-1400 * scrolledTo)
			},1000, "swing");
			
		}, 5000);
	}
	
	
	
	
	
});