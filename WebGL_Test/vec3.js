var Vec3 = (function(){
	function Vec3(x, y, z){
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}
	
	Vec3.clone = function (v){
		return new Vec3(v.x, v.y, v.z);
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
		var l = length();
		this.x /= l;
		this.y /= l;
		this.z /= l;
		return this;
	}
	
	Vec3.prototype.getNormalized = function(){
		var l = length();
		return new Vec3(this.x / l, this.y / l, this.z / l);;
	}
	
	Vec3.prototype.length = function(){
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	
	Vec3.prototype.lengthSquared = function(){
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	
	Vec3.prototype.getRadianized = function(){
		return new Vec3(
				this.x.toRadians(),
				this.y.toRadians(),
				this.z.toRadians()
		);
	}
	
	Vec3.prototype.cross = function(v){
		this.x = y * v.z - z * v.y;
		this.y = z * v.x - x * v.z;
		this.z = x * v.y - y * v.x;
		return this;
	}
	
	Vec3.prototype.getCrossed = function(v){
		return new Vec3(this.y * v.z - this.z * v.y, 
						this.z * v.x - this.x * v.z,
						this.x * v.y - this.y * v.x
		);
	}
	
	Vec3.prototype.dot = function(v){
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	
	return Vec3;
})();