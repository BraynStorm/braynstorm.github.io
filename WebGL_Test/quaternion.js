var Quaternion = (function() {
	function Quaternion(x, y, z, w) {
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 0;
	}
	
	Quaternion.prototype.mul = function(v) {
		var x;
		var y;
		var z;
		var w;
		
		if(v instanceof Quaternion){
			w = (this.w * v.w)  -  (this.x * v.x)  -  (this.y * v.y)  -  (this.z * v.z);
			x = (this.x * v.w)  +  (this.w * v.x)  +  (this.y * v.z)  -  (this.z * v.y);
			y = (this.y * v.w)  +  (this.w * v.y)  +  (this.z * v.x)  -  (this.x * v.z);
			z = (this.z * v.w)  +  (this.w * v.y)  +  (this.x * v.y)  -  (this.y * v.x);
			
			
		} else {
			w = (-this.x * v.x) - (this.y * v.y) - (this.z * v.z);
			x = ( this.w * v.x) + (this.y * v.z) - (this.z * v.y);
			y = ( this.w * v.y) + (this.z * v.x) - (this.x * v.z);
			z = ( this.w * v.z) + (this.x * v.y) - (this.y * v.x);
		}
		
		return new Quaternion(x, y, z, w);
	};
	
	Quaternion.prototype.conjugate = function() {
		return new Quaternion(-this.x, -this.y, -this.z, this.w);
	};
	
	
	Quaternion.prototype.normalize = function(){
		var l = this.getLength();
		console.log("QUATERNION LEN " + l);
		this.x /= l;	
		this.y /= l;	
		this.z /= l;
		this.w /= l;
		
		return this;
	}
	
	Quaternion.prototype.getLength = function (){
		return Math.sqrt(
				  (this.x * this.x)
				+ (this.y * this.y)
				+ (this.z * this.z)
				+ (this.w * this.w)
		);
	}

	return Quaternion;
})();