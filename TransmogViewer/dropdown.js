function List(title, clickFunction, classTitle, classItem, classListItem, classItemContainer){
	this.title = title;
	this.items = [];
	this.parent = undefined; // For stylization purposes
	
	this.classTitle = classTitle || 'dropdown-head';
	this.classItem = classItem || 'dropdown-item';
	this.classListItem = classListItem || 'dropdown-listitem';
	this.classItemContainer = classItemContainer || 'dropdown-item-container'
	
	this.clickFunction = clickFunction;
}

List.prototype.setParent = function(parent){
	this.parent = parent;
}

List.prototype.getParent = function(){
	return this.parent;
}

List.prototype.getContents = function(){
	var result = [];
	
	for(v in this.items){ // Recursion :)
		if(v instanceof List){
			result.push(v.getContents());
		}else{
			result.push(v);
		}
	}
	
	return result;
}

List.prototype.addContents = function(contents){
	for(v in contents){
		if(typeof v === "string")
			this.items.push(v);
		else{
			var list = new List(v.title, this.clickFunction, classTitle, classItem, classListItem);
			list.setParent(this);
			list.addContents(v.items);
			this.items.push(list);
		}
	}
}
List.prototype.generateSubList = function(){
	var listTitle = $('<div class="'+ this.classListItem +'">'+ this.title +'</div>');
	var divSubMenu = $('<div class="'+  +'"></div>')
	
	return listTitle;
}

List.prototype.generateList = function(container){
	if(!container instanceof jQuery){
		console.log("[ERROR] Trying to create list in an invalid container");
		return;
	}
	
	var bigItem = $('<div class="'+ this.classTitle +'">'+ this.title +'</div>');
	for(v in this.items){
		if(v instanceof List){
			bigItem.append(v.generateSubList());
		}else{
			var item = $('<div class="'+ this.classItem +'">'+ v +'</div>');
			item.click(function (){  clickFunction($(this), v);  });
			bigItem.append(item);
		}
	}
	
	bigItem.hover(function(){
		hoverEventFunction($(this), true);
	}, function (){
		hoverEventFunction($(this), false);
	});
	
	container.append(bigItem);
	return bigItem;
}

function hoverEventFunction(THIS, forward){
	THIS.stop();
}