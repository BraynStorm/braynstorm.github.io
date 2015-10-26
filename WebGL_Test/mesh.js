var Mesh = (function (){
	function Mesh(){
		var vbo = undefined;
		var ibo = undefined;
		var drawCount = 0;
		var texture = undefined;
		var transform = new Transform();
		var hasNormals = false;
	
		var renderCb = function () {};
	
		this.createFromMeshFile = function (json){
			var data = JSON.parse(json);
			
			var bufferData = [];
			var faces = [];
			
			var hasNormals = !(data.normals == undefined || data.normals.length < 1);
			
			for(var i = 0; i < data.positions.length; i++){
				bufferData.push(data.positions[i][0]);
				bufferData.push(data.positions[i][1]);
				bufferData.push(data.positions[i][2]);
				
				bufferData.push(data.texCoords[i][0]);
				bufferData.push(data.texCoords[i][1]);
				
				if(hasNormals){
					bufferData.push(data.normals[i][0]);
					bufferData.push(data.normals[i][1]);
					bufferData.push(data.normals[i][2]);
				}
			}
			
			for(var i = 0; i < data.faces.length; i++){
				faces.push(data.faces[i][0]);
				faces.push(data.faces[i][1]);
				faces.push(data.faces[i][2]);
			}
			
			if(data.material.map_Kd !== undefined){
				var name = data.material.map_Kd.match(filenamePattern.match);
				if(name[1] === undefined || name[1].length() < 1)
					data.material.map_Kd += '.png';
			}
				
			
			texture = textureManager.getTexture(data.material.map_Kd, gl.TEXTURE0);
			
			vbo = Common.bufferData(bufferData);
			ibo = Common.bufferData(faces, gl.ELEMENT_ARRAY_BUFFER);
			drawCount = faces.length;
			
			return this;
		};
		
		this.setRenderCallback = function (cb){
			renderCb = Common.defaultArg(cb, function () {});
		}
		
		this.createFromArrays = function (vertices, indices, HasNormals){
			vbo = Common.bufferData(vertices);
			ibo = Common.bufferData(indices, gl.ELEMENT_ARRAY_BUFFER);
			drawCount = indices.length;
			hasNormals = HasNormals;
		}
		
		this.setTransform = function (transf){
			if(!transf instanceof Transform){
				console.log("[WARN] transform provided isn't an instanceof Transform.");
				return;
			}
			
			transform = transf;
			return this;
		}
		
		this.getTransform = function (){
			return transform;
		}
		
		this.render = function (){
			renderCb(this);
			Texture.bind(texture);
			worldShader.setUniform1i("sampler", 0);
			worldShader.setUniformMatrix("transform_matrix", transform.getTransformationMatrix());
			Common.renderMesh(vbo, ibo, drawCount);
		};
		
	}
	
	return Mesh;
})();