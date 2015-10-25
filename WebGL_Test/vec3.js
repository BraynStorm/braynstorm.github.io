var Vec3 = (function(){
	function Vec3(x, y, z){
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		
		//console.log("NEW VEC3  " + this.x + " " + this.y + " " + this.z);
	}
	
	Vec3.prototype.clone = function (v){
		return new Vec3(v.x, v.y, v.z);
	}
	
	Vec3.prototype.getX = function (){
		return this.x;
	}
	
	Vec3.prototype.getY = function (){
		return this.y;
	}
	
	Vec3.prototype.getZ = function (){
		return this.z;
	}
	
	/**
	 * Returns a 1D array (used for uniforms) representing the x, y, and z data of the Vec3.
	 * @returns {Array}
	 */
	Vec3.prototype.getArray = function(){
		return [x,y,z];
	}
	
	Vec3.prototype.add = function(v) {
		if(v instanceof Vec3){
			this.x += v.x;
			this.y += v.y;
			this.z += v.z;
		}else{
			this.x += v;
			this.y += v;
			this.z += v;
		}
		return this;
	};
	
	Vec3.prototype.sub = function(v) {
		if(v instanceof Vec3){
			this.x -= v.x;
			this.y -= v.y;
			this.z -= v.z;
		}else{
			this.x -= v;
			this.y -= v;
			this.z -= v;
		}
		return this;
	};
	
	Vec3.prototype.mul = function(v) {
		if(v instanceof Vec3){
			this.x *= v.x;
			this.y *= v.y;
			this.z *= v.z;
		}else{
			this.x *= v;
			this.y *= v;
			this.z *= v;
		}
		return this;
	};
	
	Vec3.prototype.div = function(v) {
		if(v instanceof Vec3){
			this.x /= v.x;
			this.y /= v.y;
			this.z /= v.z;
		}else{
			this.x /= v;
			this.y /= v;
			this.z /= v;
		}
		return this;
	};
	
	Vec3.prototype.normalize = function(){
		var l = this.getLength();
		//console.log("LEN   " + l);
		
		if(l == 0)
			throw "ExceptionWTF";
		
		this.x /= l;
		this.y /= l;
		this.z /= l;
		
		return this;
	}
	
	Vec3.prototype.getNormalized = function(){
		var l = this.getLength();
		return new Vec3(this.x / l, this.y / l, this.z / l);
	}
	
	Vec3.prototype.invert = function(){
		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;
		return this;
	}
	
	Vec3.prototype.getInverted = function(){
		return new Vec3(-this.x, -this.y, -this.z);
	}
	
	Vec3.prototype.rotate = function(angle, axis){
		angle = toRadians(angle / 2);
		var sinHalfAngle = Math.sin(angle);
		var cosHalfAngle = Math.cos(angle);
		
		var rX = axis.getX() * sinHalfAngle;
		var rY = axis.getY() * sinHalfAngle;
		var rZ = axis.getZ() * sinHalfAngle;
		var rW = cosHalfAngle;
		
		var rot = new Quaternion(rX, rY, rZ, rW);
		rot = (rot.mul(this)).mul(rot.conjugate());
		
		
		this.x = rot.x;
		this.y = rot.y;
		this.z = rot.z;
		return this;
	}
	
	Vec3.prototype.getLength = function(){
		//console.log("LenSQR " + this.lengthSquared());
		return Math.sqrt(this.lengthSquared());
	}
	
	Vec3.prototype.lengthSquared = function(){
		return (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
	}
	
	Vec3.prototype.getRadianized = function(){
		return new Vec3(
				toRadians(this.x),
				toRadians(this.y),
				toRadians(this.z)
		);
	}
	
	Vec3.prototype.cross = function(v){
		this.x = (this.y * v.z) - (this.z * v.y);
		this.y = (this.z * v.x) - (this.x * v.z);
		this.z = (this.x * v.y) - (this.y * v.x);
		
		return this;
	}
	
	Vec3.prototype.getCrossed = function(v){
		return new Vec3((this.y * v.z) - (this.z * v.y),
						(this.z * v.x) - (this.x * v.z),
						(this.x * v.y) - (this.y * v.x)
		);
	}
	
	Vec3.prototype.dot = function(v){
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	
	return Vec3;
})();