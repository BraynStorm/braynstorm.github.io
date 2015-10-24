var Transform = (function (){
	function Transform(){
		var translation = new Vec3();
		var rotation = new Vec3();
		var scale = new Vec3(1, 1, 1);
		
		var matrix = new Mat4();
		
		var isMatrixDirty = true;
		
		var markDirty = function () { isMatrixDirty = true; };
		
		var recalculateMatrix = function (){
			var t = new Mat4();
			var r = new Mat4();
			var s = new Mat4();
			
			t.translate(translation);
			r.rotate(rotation);
			s.scale(scale);
			
			matrix = t.mul(s.mul(r));
		};
		
		this.getTransformationMatrix = function(){
			if(isMatrixDirty){
				recalculateMatrix();
				isMatrixDirty = false;
			}
			return matrix;
		}
		
		this.getTranslation = function () { return translation; };
		this.getRotation = function () { return rotation; };
		this.getScale = function () { return scale; };
		
		this.setTranslation = function (v) { translation = v; markDirty(); return this; };
		this.setRotation = function (r) { rotation = r; markDirty(); return this; };
		this.setScale = function (s) { if(s instanceof Vec3) scale = s; else scale = new Vec3(s, s, s); markDirty(); return this; };
		
		this.setTranslationX = function(x){ translation.x = x; markDirty(); return this; };
		this.setTranslationY = function(y){ translation.y = y; markDirty(); return this; };
		this.setTranslationZ = function(z){ translation.z = z; markDirty(); return this; };
		
		this.setRotationX = function(x){ rotation.x = x; markDirty(); return this; };
		this.setRotationY = function(y){ rotation.y = y; markDirty(); return this; };
		this.setRotationZ = function(z){ rotation.z = z; markDirty(); return this; };
		
		this.setScaleX = function(x){ scale.x = x; markDirty(); return this; };
		this.setScaleY = function(y){ scale.y = y; markDirty(); return this; };
		this.setScaleZ = function(z){ scale.z = z; markDirty(); return this; };
		
	}
	
	Transform.copy = function(copy){
		var t = new Transform();
		t.setTranslation(copy.getTranslation());
		t.setRotation(copy.getRotation());
		t.setScale(copy.getScale());
		return t;
	};
	
	return Transform;
})();