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
			
			
			if(keyboard.isKeyDown(Keyboard.KEY_SPACE)){
				position.y += 0.01;
				markDirty();
			}
			
			if(keyboard.isKeyDown(Keyboard.KEY_X)){
				position.y -= 0.01;
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
					if(angle === 0)
						return;
					
					if(angle > 0){
						angle = Camera.MAX_XROT - xRot
					}else{
						angle = Camera.MIN_XROT - xRot
					}
				}
				
			}
			
			
			/*
			if (!Common.isClamped(angle + xRot, Camera.MIN_XROT, Camera.MAX_XROT)){
				angle = -angle;
				xRot = -xRot;
				
				forward.x = -forward.x;
				forward.z = -forward.z;
				up.x = -up.x;
				up.z = -up.z;
				
				console.log('UNCLAMP')
			}
			*/
			
			xRot += angle;
			
			var horizontalAxis = Camera.Y_AXIS.getCrossed(forward).normalize();
			
			console.log(horizontalAxis)
			
			forward.rotate(angle, horizontalAxis).normalize();
			//up = forward.getCrossed(horizontalAxis).normalize();
			
			if(up.y < 0)
				up.y = -up.y;
			
			markDirty();
		};
		
		var rotateY = function (angle){
			if(Math.abs(angle) - 0.01 <= 0)
				return;
			
			yRot += angle;
			
			var horizontalAxis = Camera.Y_AXIS.getCrossed(forward).normalize();
			
			forward.rotate(angle, Camera.Y_AXIS).normalize();
			up = forward.getCrossed(horizontalAxis).normalize();
			
			if(up.y < 0)
				up.y = -up.y;
			
			markDirty();
		}
		
		this.mouseDown = function (e){
			lastMousePos = mouse.getLastClickPoint();
		}
		
		this.setAngle = function (lol){
			rotateX(lol);
		}
		
		this.mouseMove = function (e){
			if(mouse.getMouseState() === 0){
				if(lastMousePos !== undefined){
					rotateY((lastMousePos.x - mouse.getX()) / 5);
					rotateX((lastMousePos.y - mouse.getY()) / 5, false);
					
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
	
	Camera.MIN_XROT = -89.0;
	Camera.MAX_XROT =  89.0;
	
	
	return Camera;
})();