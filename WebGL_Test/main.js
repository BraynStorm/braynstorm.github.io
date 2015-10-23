var gl;
var canvas;
var global_interval;

var worldShader;
var transform;
var transform1;
var thingsTransfrom;
var cannonTransform;

var scene = [];

Number.prototype.toRadians = function() {
	return this * Math.PI / 180;
}

var Common = {
		fov : 65,
		zNear : 0.0001,
		zFar : 1000.0,
		
		bufferData : function (data, bufferType, dynamic){
			bufferType = bufferType || gl.ARRAY_BUFFER;
			dynamic = dynamic || gl.STATIC_DRAW;
			
			var buffer = gl.createBuffer();
			
			gl.bindBuffer(bufferType, buffer);
			gl.bufferData(bufferType, bufferType == gl.ARRAY_BUFFER ? new Float32Array(data) : new Uint16Array(data), dynamic);
			gl.bindBuffer(bufferType, undefined);
			
			return buffer;
		},
		
		renderMesh : function (vbo, ibo, drawCount, hasNormals){
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
			gl.vertexAttribPointer(0, 3, gl.FLOAT, false, hasNormals ? 32 : 20, 0);
			gl.vertexAttribPointer(1, 2, gl.FLOAT, false, hasNormals ? 32 : 20, 12);
			
			if(hasNormals)
				gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 32, 20);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
			gl.drawElements(gl.TRIANGLES, drawCount, gl.UNSIGNED_SHORT, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, undefined);
		},
		
		killGame: function (){
			window.clearInterval(global_interval);
		}
		
};

var I = 0;

function start(){
	canvas = document.getElementById("canvas");
	//canvas.width = document.width;
	gl = canvas.getContext("webgl");
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.enable(gl.DEPTH_TEST);
	gl.frontFace(gl.CW);
	gl.enable(gl.CULL_FACE);
	
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	
	Common.projection_matrix = new Mat4();
	Common.projection_matrix.projection(Common.zNear, Common.zFar, Common.fov, canvas.width / canvas.height);
	
	
	transform = new Transform();
	transform.setTranslationZ(2.5);
	
	transform1 = new Transform();
	transform1.setTranslationZ(2.51);
	
	cannonTransform = new Transform();
	cannonTransform.setTranslationZ(10).setRotationX(10).setRotationY(90);
	
	thingsTransfrom = new Transform();
	thingsTransfrom.setTranslationY(2).setTranslationZ(15).setRotationX(10).setRotationY(-90);
	
	initMeshes();
	
	worldShader = new Shader("world_vs", "world_fs");
	worldShader.addUniform("transform_matrix");
	worldShader.addUniform("projection_matrix");
	
	global_interval = window.setInterval(renderScene, 1000.0 / 60.0);
	
}

function renderScene(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clearColor(0.2, 0.2, 0.2, 1);
	
	var val = I/60;
	
	worldShader.bind();
	worldShader.setUniformMatrix("projection_matrix", Common.projection_matrix);
	
	//transform.setRotationZ(-val * 20);
	//transform1.setRotationZ(val * 20);
	
	//transform1.setTranslationX(Math.cos(val * 2) * 4);
	//transform1.setTranslationY(Math.sin(val * 2) * 4);
	
	scene.forEach(function (v, k){
		v.getTransform().setTranslationY(5 * Math.sin(val));
		v.render();
	});
	
	I++;
}

function initMeshes(){
	var vboData = [
		-1  , -1,  0,      0,    0,
		 1  ,  1,  0,      0.5,  1,
		 1  , -1,  0,      1,    0
	];
	
	var iboData = [0, 1, 2];

	var triangle = new Mesh();
	triangle.setTransform(transform);
	triangle.createFromArrays(vboData, iboData, false);
	
	var triangle2 = new Mesh();
	triangle2.setTransform(transform1);
	triangle2.createFromArrays(vboData, iboData, false);
	
	//scene.push(triangle);
	//scene.push(triangle2);
	
	loadMeshFile("cannon.mesh", scene, cannonTransform);
	loadMeshFile("justDakataThings.mesh", scene, thingsTransfrom);
	
	
}

function loadMeshFile(filename, container, transform){
	if(!filename.endsWith(".mesh"))
		filename += ".mesh";
	
	$.ajax({
		url: "meshes/" + filename,
		fail: function (data) {console.log(data);},
		success : function (data){
			var obj = new Mesh();
			obj.createFromMeshFile(data);
			obj.setTransform( transform || new Transform() );
			container.push(obj);
		}
	});
}


$(document).ready(start);
