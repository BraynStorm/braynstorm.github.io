// Globals - General
var gl;
var canvas;
var global_interval;
var timer;

var info = {"lol" : "lo2l"};
var filenamePattern = /(?:.*[\/\\])?(.*)\.(.*)/ig;

//Globals - AngularJS
var app;

// Globals - Managers
var eventManager;
var textureManager;


// Globals - Shaders
var worldShader;

// Transforms
var transform;
var transform1;
var thingsTransfrom;
var cannonTransform;

// Controls
var camera;
var keyboard;
var mouse;

// The whole scene.
var scene = [];


//TestStuff
var frames = 1;
var passedTime = 0;

function toRadians(v){
	return v * Math.PI / 180;
}
var Common = {
		fov : 95,
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
		
		renderMesh : function (vbo, ibo, drawCount){
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
			gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 32, 0);
			gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 32, 12);
			gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 32, 20);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
			gl.drawElements(gl.TRIANGLES, drawCount, gl.UNSIGNED_SHORT, 0);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, undefined);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, undefined);
		},
		
		clamp: function(val, min, max){
			return Math.max(Math.min(val, max), min);
		},
		
		isClamped: function(val, min, max){
			return val <= max && val >= min;
		},
		
		killGame: function (){
			window.clearInterval(global_interval);
		}
		
};

var I = 0;

function start(){
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CW);
	
	gl.enableVertexAttribArray(0);
	gl.enableVertexAttribArray(1);
	gl.enableVertexAttribArray(2);
	
	gl.clearColor(0.2, 0.2, 0.2, 1);
	
	setup();
	
	Common.projection_matrix = new Mat4();
	Common.projection_matrix.projection(Common.zNear, Common.zFar, Common.fov, canvas.width / canvas.height);
	
	cannonTransform = new Transform();
	cannonTransform.setTranslationZ(10).setRotationY(90);
	
	thingsTransfrom = new Transform();
	thingsTransfrom.setTranslationY(2).setTranslationZ(10).setRotationY(-90);
	
	initMeshes();
	
	worldShader = new Shader("world_vs", "world_fs");
	worldShader.addUniform("transform_matrix");
	worldShader.addUniform("projection_matrix");
	worldShader.addUniform("camera_translation_matrix");
	worldShader.addUniform("camera_rotation_matrix");
	
	timer.loop();
	global_interval = window.setInterval(renderScene, 1000.0 / 60.0);
	
}

function setup(){
	timer = new Timer();
	
	eventManager = new EventManager();
	textureManager = new TextureManager();
	
	mouse = new Mouse();
	keyboard = new Keyboard();
	camera = new Camera();
	
	var cnv = $("#canvas");
	
	cnv.on('mousedown', function (e){
		e.preventDefault();
		eventManager.fire('mousedown', {
			button: e.button,
			x : e.offsetX,
			y : e.offsetY
		});
	});
	
	cnv.on('mouseup', function (e){
		eventManager.fire('mouseup', {
			button: e.button,
			x : e.offsetX,
			y : e.offsetY
		});
	});
	
	cnv.on('mousemove', function (e){
		eventManager.fire('mousemove', {
			e : e.button,
			x : e.offsetX,
			y : e.offsetY
		});
	});
	
	$(window).on('keydown', function (e){
		eventManager.fire('keydown', {
			ctrl : e.ctrlKey,
			alt : e.altKey,
			shift : e.shiftKey,
			meta : e.meta,
			keyCode : e.keyCode,
			which : e.which
		});
	});
	
	$(window).on('keyup', function (e){
		eventManager.fire('keyup', {
			ctrl : e.ctrlKey,
			alt : e.altKey,
			shift : e.shiftKey,
			meta : e.meta,
			keyCode : e.keyCode,
			which : e.which
		});
	});
}

function renderScene(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	var val = I/60;
	
	camera.loop();
	
	worldShader.bind();
	worldShader.setUniformMatrix("projection_matrix", Common.projection_matrix);
	camera.bind();
	scene.forEach(function (v, k){
		v.getTransform().setTranslationX(5 * Math.sin(val));
		v.render();
	});
	
	I++;
	frames++;
	passedTime += timer.getDeltaMilliseconds();
	if(passedTime >= 1000){
		info.fps = frames / (passedTime / 1000);
		passedTime = 0;
		frames = 0;
	}
	
	timer.loop();
}

function initMeshes(){
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
