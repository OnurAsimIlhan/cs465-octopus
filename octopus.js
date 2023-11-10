//global variables
var gl;
var canvas;
var program;
var vertexBuffer;

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
function initListeners() {}

//Functions
function updateBuffer() {}
function createBuffer() {}
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
  initListeners();

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //init program and shaders
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  createBuffer();
  updateBuffer();

  render();
};

//render
function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  setTimeout(function () {
    requestAnimFrame(render);
  }, 50);
}
