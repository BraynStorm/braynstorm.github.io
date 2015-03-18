var LogicElements = {};
Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
	if ( parentClassOrObject.constructor == Function ) 
	{ 
		//Normal Inheritance 
		this.prototype = new parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
		this.prototype.base = parentClassOrObject.prototype;
		while(this.prototype.base.hasOwnProperty('parent') && this.prototype.valueOf('parent') != );
	} 
	else 
	{ 
		//Pure Virtual Inheritance 
		this.prototype = parentClassOrObject;
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	return this;
} 

var LogicElement = function (inputCount, outputCount, label, symbol, path){
	this.label = label;
	this.symbol = symbol;
	this.path = path;
	
	// Unusable if 0;
	this.inputCount = 0;
	this.outputCount = 0;
};
LogicElement.prototype.getPath = function (x, y){
	return ("M" + x + " " + y + " " + this.path);
};


var GateNOT = function (){
	LogicElement.call(this, 1, 1, "NOT", "!", "");
	this.inputCount = 1;
	this.outputCount = 1;
};
GateNOT.inheritsFrom(LogicElement);
GateNOT.prototype.getOutput = function (a){
	return ~a;
};

//AND Gate
var GateAND = function (){
	LogicElement.call(this, 2, 1, "AND", "&" , "l100 00 m0 -50 l0 200 m0 -50 l-100 0 m100 50 l100 0 a1,1 -50 0,0 0,-200 l-100 0 m200 100 l100 0");
};
GateAND.inheritsFrom(LogicElement);
GateAND.prototype.getOutput = function (a, b){
	return a & b;
};

//OR Gate
var GateOR = function (){
	LogicElement.call(this, 2, 1, "OR", "|", "");
	this.inputCount = 2;
	this.outputCount = 1;
};
GateOR.inheritsFrom(LogicElement);
GateOR.prototype.getOutput = function (a, b){
	return a | b;
};


//LogicElements["GateNOT"] = new GateNOT();
LogicElements["GateAND"] = new GateAND();
//LogicElements["GateOR"] = new GateOR();

