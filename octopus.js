//global variables
var gl;
var canvas;
var program;
var vertexBuffer;
var modelViewMatrixLoc;
var vBuffer;
var vPosition;
var pointsArray = [];
var instanceMatrix;

//objects

function RectanglePrism(dimensions, currentLocation, direction) {}
function Cylinder(dimensions, currentLocation, direction) {}
function Sphere(dimensions, currentLocation, direction) {}

//joint
function Joint(object1, object2, object1_tip, obect2_tip) {}

//hierarchy
function Octopus(arm1, arm2, arm3) {}

//interpolation logic

//texture mapping logic

//listeners
function initListeners() {

  document.getElementById("arm0-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm1-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm2-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm3-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm4-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm5-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm6-base").onchange = function(event) {
    console.log(event.target.value);
  };
  document.getElementById("arm7-base").onchange = function(event) {
    console.log(event.target.value);
  };

}

//Functions
function updateBuffer() {}
function createBuffer() {
  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

  vPosition = gl.getAttribLocation( program, "vPosition" );
  gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray( vPosition );
}

function displayFrame() {}
function downloadFrame() {}
function loadFrame() {}
function loadAnimation() {}
function saveAnimation() {}

//onload
window.onload = function init() {
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return;
  }
  //init listeners
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 0.8, 1.0);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);




  initListeners();

  gl.clear(gl.COLOR_BUFFER_BIT);

  //init program and shaders

  createBuffer();
  updateBuffer();

  render();
};

//render
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  requestAnimFrame(render);
}
