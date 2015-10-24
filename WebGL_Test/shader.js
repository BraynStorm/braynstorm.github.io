var Shader = (function(){
	function Shader(idVs, idFs){
		var vs = gl.createShader(gl.VERTEX_SHADER);
		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		
		var uniforms = {};
		
		gl.shaderSource(vs, $("#" + idVs).html());
		gl.shaderSource(fs, $("#" + idFs).html());
		
		gl.compileShader(vs);
		gl.compileShader(fs);
		
		var program = gl.createProgram();
		gl.bindAttribLocation(program, 0, "position");
		gl.bindAttribLocation(program, 1, "texCoord");
		gl.bindAttribLocation(program, 1, "normal");
		
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		
		gl.linkProgram(program);
		
		gl.validateProgram(program);
		
		this.bind = function (){
			gl.useProgram(program);
		};
		
		
		this.addUniform = function(name){
			uniforms[name] = gl.getUniformLocation(program, name);
		};
		
		
		this.setUniformMatrix = function(name, matrix){
			if(!matrix instanceof Mat4){
				console.log("[WARN] matrix given to the shader isn't an instanceof Mat4!");
				return;
			}
			
			if(uniforms[name] !== undefined)
				gl.uniformMatrix4fv(uniforms[name], false, new Float32Array(matrix.get1DArray()));
			else 
				console.log("Couldn't find uniform matrix " + name);
		};
		
	}
	
	return Shader;
})();