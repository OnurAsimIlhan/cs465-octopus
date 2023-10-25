//global variables
var gl;
var canvas;
var program;

var a = 0.95;
var b = 0.95;
var c = 0.95;
var d = 0.95;

//objects
function RectanglePrism(dimensions, currentLocation, direction) {
       
}
function Cylinder(dimensions, currentLocation, direction) {
    
}
function Sphere(dimensions, currentLocation, direction) {
    
}

//joint
function Joint(object1, object2, object1_tip, obect2_tip){

}

//hierarchy
function Octopus(arm1, arm2, arm3){

}



//interpolation logic


//texture mapping logic

//listeners
function initListeners() {

}

//Functions
function createBuffer(){

}

function updateBuffer(){

}

function displayFrame(){

}

function downloadFrame(){

}

function loadFrame(){

}

function loadAnimation(){

}

function saveAnimation(){
    
}

//onload
window.onload = function() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
        return;
    }
    //init listeners
    initListeners();
    //init program and shaders
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    //createbuffer
    createBuffer();
    updateBuffer();

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(a,b,c,d);
    gl.clear(gl.COLOR_BUFFER_BIT);

    render();
}


//render
function render(){

}