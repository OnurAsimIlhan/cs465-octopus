//global variables
var gl;
var canvas;
var program;
var vertexBuffer;
var modelViewMatrixLoc;
var vBuffer;
var vPosition;
var pointsArray = [];
var vColor;
var instanceMatrix;
var cBuffer;
var theta= [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var angle = 0;

var modelViewMatrix, projectionMatrix;

var BASE_HEIGHT      = 5.0;
var BASE_WIDTH       = 5.0;

var ARM_HEIGHT = 4.0;
var ARM_WIDTH = 1.0;

var UPPER_ARM_HEIGHT = 3.0;
var UPPER_ARM_WIDTH  = 0.75;

var LOWER_ARM_HEIGHT = 2.0;
var LOWER_ARM_WIDTH  = 0.5;


var NumVertices = 36; //(6 faces)(2 triangles/face)(3 vertices/triangle)

var Base = 0;

var arm1 = 1;
var arm2 = 4;
var arm3 = 7;
var arm4 = 10;
var arm5 = 13;
var arm6 = 16;
var arm7 = 19;
var arm8 = 22;

var arm1_lowerarm = 3;
var arm2_lowerarm = 6;
var arm3_lowerarm = 9;
var arm4_lowerarm = 12;
var arm5_lowerarm = 15;
var arm6_lowerarm = 18;
var arm7_lowerarm = 21;
var arm8_lowerarm = 24;

var arm1_uppearm = 2;
var arm2_uppearm = 5;
var arm3_uppearm = 8;
var arm4_uppearm = 11;
var arm5_uppearm = 14;
var arm6_uppearm = 17;
var arm7_uppearm = 20;
var arm8_uppearm = 23;


var points = [];
var colors = [];
var vertices = [
  vec4( -0.5, -0.5,  0.5, 1.0 ),
  vec4( -0.5,  0.5,  0.5, 1.0 ),
  vec4(  0.5,  0.5,  0.5, 1.0 ),
  vec4(  0.5, -0.5,  0.5, 1.0 ),
  vec4( -0.5, -0.5, -0.5, 1.0 ),
  vec4( -0.5,  0.5, -0.5, 1.0 ),
  vec4(  0.5,  0.5, -0.5, 1.0 ),
  vec4(  0.5, -0.5, -0.5, 1.0 )
];

// RGBA colors
var vertexColors = [
  vec4( 0.0, 0.0, 0.0, 1.0 ),  // black
  vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
  vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
  vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
  vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
  vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
  vec4( 1.0, 1.0, 1.0, 1.0 ),  // white
  vec4( 0.0, 1.0, 1.0, 1.0 )   // cyan
];

function quad(  a,  b,  c,  d ) {
  colors.push(vertexColors[a]); 
  points.push(vertices[a]); 
  colors.push(vertexColors[a]); 
  points.push(vertices[b]); 
  colors.push(vertexColors[a]); 
  points.push(vertices[c]);
  colors.push(vertexColors[a]); 
  points.push(vertices[a]); 
  colors.push(vertexColors[a]); 
  points.push(vertices[c]); 
  colors.push(vertexColors[a]); 
  points.push(vertices[d]); 
}
function colorCube() {
  quad( 1, 0, 3, 2 );
  quad( 2, 3, 7, 6 );
  quad( 3, 0, 4, 7 );
  quad( 6, 5, 1, 2 );
  quad( 4, 5, 6, 7 );
  quad( 5, 4, 0, 1 );
}
function scale4(a, b, c) {
  var result = mat4();
  result[0][0] = a;
  result[1][1] = b;
  result[2][2] = c;
  return result;
}

//objects

function RectanglePrism(dimensions, currentLocation, direction) {}
function Cylinder(dimensions, currentLocation, direction) {}
function Sphere(dimensions, currentLocation, direction) {}

function base() {
  var s = scale4(BASE_WIDTH, BASE_HEIGHT, BASE_WIDTH);
  var instanceMatrix = mult( translate( 0.0, 0.5 * BASE_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

//----------------------------------------------------------------------------

function arm1_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm2_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm3_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm4_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm5_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm6_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm7_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function arm8_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

function upperArm1() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm2() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm3() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm4() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

function upperArm5() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm6() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm7() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function upperArm8() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate( 0.0, -0.5* UPPER_ARM_HEIGHT, 0.0 ),s);    
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}


//----------------------------------------------------------------------------


function lowerArm1()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

function lowerArm2()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

function lowerArm3()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}

function lowerArm4()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}


function lowerArm5()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function lowerArm6()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function lowerArm7()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}
function lowerArm8()
{
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult( translate( 0.0, -0.5* LOWER_ARM_HEIGHT, 0.0 ), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv( modelViewMatrixLoc,  false, flatten(t) );
  gl.drawArrays( gl.TRIANGLES, 0, NumVertices );
}




//joint
function Joint(object1, object2, object1_tip, obect2_tip) {}

//hierarchy
function Octopus(arm1, arm2, arm3) {}

//interpolation logic

//texture mapping logic

//listeners
function initListeners() {

  document.getElementById("headSlider").onchange = function(event) {
    theta[0] = event.target.value;
    console.log(event.target.value);
  };

  document.getElementById("arm1").onchange = function(event) {
    theta[1] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("arm2").onchange = function(event) {
    theta[4] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("arm3").onchange = function(event) {
    theta[7] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("arm4").onchange = function(event) {
    theta[10] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("arm5").onchange = function(event) {
    theta[13] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("arm6").onchange = function(event) {
    theta[16] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("arm7").onchange = function(event) {
    theta[19] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("arm8").onchange = function(event) {
    theta[22] = event.target.value;

    console.log(event.target.value);
  };




  document.getElementById("upperarm1").onchange = function(event) {
    theta[2] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("upperarm2").onchange = function(event) {
    theta[5] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("upperarm3").onchange = function(event) {
    theta[8] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("upperarm4").onchange = function(event) {
    theta[11] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("upperarm5").onchange = function(event) {
    theta[14] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("upperarm6").onchange = function(event) {
    theta[17] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("upperarm7").onchange = function(event) {
    theta[20] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("upperarm8").onchange = function(event) {
    theta[23] = event.target.value;

    console.log(event.target.value);
  };





  document.getElementById("lowerarm1").onchange = function(event) {
    theta[3] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("lowerarm2").onchange = function(event) {
    theta[6] = event.target.value;
    console.log(event.target.value);
  };
  document.getElementById("lowerarm3").onchange = function(event) {
    theta[9] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("lowerarm4").onchange = function(event) {
    theta[12] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("lowerarm5").onchange = function(event) {
    theta[15] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("lowerarm6").onchange = function(event) {
    theta[18] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("lowerarm7").onchange = function(event) {
    theta[21] = event.target.value;

    console.log(event.target.value);
  };
  document.getElementById("lowerarm8").onchange = function(event) {
    theta[24] = event.target.value;

    console.log(event.target.value);
  };
}

//Functions
function updateBuffer() {}
function createBuffer() {
  vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

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

  colorCube();
  program = initShaders( gl, "vertex-shader", "fragment-shader" );    
  gl.useProgram( program );

  createBuffer();

  initListeners();

  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

  projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),  false, flatten(projectionMatrix) );

  //init program and shaders

  updateBuffer();

  render();
};

//render
var render = function() {

  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
  
  modelViewMatrix = mult(translate(0.0, 0.5*BASE_HEIGHT, 0.0), rotate(theta[Base], 0, 1, 0 ));
  model2 = modelViewMatrix;
  base();

  modelViewMatrix = mult(modelViewMatrix, translate(-0.5*BASE_WIDTH, 0.0, 0.5*BASE_WIDTH));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm1], -1, 0, -1 ));
  arm1_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm1_uppearm], -1, 0, -1) );
  upperArm1();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm1_lowerarm], -1, 0, -1 ));
  lowerArm1();


  modelViewMatrix = mult(model2, translate(0.0, 0.0, 0.5*BASE_WIDTH)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm2], -1, 0, 0 ));
  arm2_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm2_uppearm], -1, 0, 0) );
  upperArm2();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm2_lowerarm], -1, 0, 0 ));
  lowerArm2();


  modelViewMatrix = mult(model2, translate(0.5*BASE_WIDTH, 0.0, 0.5*BASE_WIDTH)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm3], -1, 0, 1 ));
  arm3_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm3_uppearm], -1, 0, 1) );
  upperArm3();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm3_lowerarm], -1, 0, 1 ));
  lowerArm3();
  
  modelViewMatrix = mult(model2, translate(0.5*BASE_WIDTH, 0.0, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm4], 0, 0, 1 ));
  arm4_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm4_uppearm], 0, 0, 1) );
  upperArm4();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm4_lowerarm], 0, 0, 1 ));
  lowerArm4();


  modelViewMatrix = mult(model2, translate(0.5*BASE_WIDTH, 0.0, -0.5*BASE_WIDTH)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm5], 1, 0, 1 ));
  arm5_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm5_uppearm], 1, 0, 1) );
  upperArm5();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm5_lowerarm], 1, 0, 1 ));
  lowerArm5();



  modelViewMatrix = mult(model2, translate(0.0, 0.0, -0.5*BASE_WIDTH)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm6], 1, 0, 0 ));
  arm6_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm6_uppearm], 1, 0, 0) );
  upperArm6();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm6_lowerarm], 1, 0, 0 ));
  lowerArm6();



  modelViewMatrix = mult(model2, translate(-0.5*BASE_WIDTH, 0.0, -0.5*BASE_WIDTH)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm7], 1, 0, -1 ));
  arm7_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm7_uppearm], 1, 0, -1) );
  upperArm7();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm7_lowerarm], 1, 0, -1 ));
  lowerArm7();


  modelViewMatrix = mult(model2, translate(-0.5*BASE_WIDTH, 0.0, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm8], 0, 0, -1 ));
  arm8_base();

  modelViewMatrix  = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix  = mult(modelViewMatrix, rotate(theta[arm8_uppearm], 0, 0, -1) );
  upperArm8();
  
  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -UPPER_ARM_HEIGHT, 0.0)); 
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm8_lowerarm], 0, 0, -1 ));
  lowerArm8();

  requestAnimFrame(render);
}

