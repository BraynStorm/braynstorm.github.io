var Camera = (function() {
	function Camera() {
		var translationMatrix = new Mat4();
		var rotationMatrix = new Mat4();
		var xRot = 0;
		var yRot = 0;
		
		var position = new Vec3(0, 0, 0);
		var forward = new Vec3(0, 0, 1);
		var up = Camera.Y_AXIS;
		
		var isMatrixDirty = true;
		
		var lastMousePos;
		
		var markDirty = function (){ isMatrixDirty = true; };
		
		var recalculateMatrices = function (){
			translationMatrix.translate(position.getInverted());
			rotationMatrix.camera(forward, up);
		}
		
		this.loop = function() {
			if(keyboard.isKeyDown(Keyboard.KEY_A)){
				position.x += 0.01;
				console.log(position);
				markDirty();
			}
			
			if(keyboard.isKeyDown(Keyboard.KEY_D)){
				position.x -= 0.01;
				markDirty();
			}
		}
		
		this.bind = function() {
			if(isMatrixDirty){
				recalculateMatrices();
				isMatrixDirty = false;
			}
			
			worldShader.setUniformMatrix("camera_translation_matrix", translationMatrix);
			worldShader.setUniformMatrix("camera_rotation_matrix", rotationMatrix);
		}
		
		// Private
		var rotateX = function(angle, respectLimits){
			if(angle === 0)
				return;
			
			if(respectLimits === true){
				
				if (!Common.isClamped(angle + xRot, Camera.MIN_XROT, Camera.MAX_XROT)){
					if(angle > 0){
						angle = Camera.MAX_XROT - xRot
					}else{
						angle = Camera.MIN_XROT - xRot
					}
				}
				
			}
			
			if(angle === 0)
				return;
			
			xRot += angle;
			
			
			var horizontalAxis = Camera.Y_AXIS.getCrossed(forward).normalize();
			console.log(horizontalAxis)
			forward.rotate(angle, horizontalAxis).normalize();
			up = forward.getCrossed(horizontalAxis).normalize();
			markDirty();
		};
		
		var rotateY = function (angle){
			if(angle === 0)
				return;
			
			yRot += angle;
			
			var horizontalAxis = Camera.Y_AXIS.getCrossed(forward).normalize();
			
			forward.rotate(angle, Camera.Y_AXIS).normalize();
			//console.log(forward);
			//console.log(["Normalize F", forward.getCrossed(horizontalAxis)]);
			up = forward.getCrossed(horizontalAxis).normalize();
			//console.log(up);
			//console.log(["Angle", angle]);
			//console.log(["Forward", forward.x, forward.y, forward.z]);
			//console.log(["Up", up.x, up.y, up.z]);
			//console.log(horizontalAxis)
			
			markDirty();
		}
		
		this.mouseDown = function (e){
			lastMousePos = mouse.getLastClickPoint();
		}
		
		this.mouseMove = function (e){
			if(mouse.getMouseState() === 0){
				if(lastMousePos !== undefined){
					rotateX((lastMousePos.y - mouse.getY()), false);
					rotateY((lastMousePos.x - mouse.getX()));
				}
				
				lastMousePos.x = mouse.getX();
				lastMousePos.y = mouse.getY();
			}
		}
		
		this.mouseUp = function (e){
			lastMousePos = undefined;
		}
		
		eventManager.register('mousedown', this.mouseDown);
		eventManager.register('mousemove', this.mouseMove);
		eventManager.register('mouseup', this.mouseUp);
		
	}
	
	
	Camera.Y_AXIS = new Vec3(0, 1, 0);
	
	Camera.MIN_XROT = -89;
	Camera.MAX_XROT = 89;
	
	
	return Camera;
})();