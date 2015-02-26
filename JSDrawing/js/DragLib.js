var DragLib = {};
DragLib.init = function (){
	if($ === null || $ === undefined){
		console.log("This library is only compatible with JQuery");
	}else{
		
		//
		
		
		
		//Define functions 
		DragLib.setDraggable = function (obj, value){
			if( typeof value === typeof true ){
				obj.data("DragLib-draggable", value);
				
			}
		};
	}
};
