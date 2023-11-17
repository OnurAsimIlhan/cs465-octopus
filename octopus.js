//global variables
var gl;
var canvas;
var program;
var vertexBuffer;
var modelViewMatrixLoc;
var vBuffer;
var nBuffer;
var vPosition;
var pointsArray = [];
var vColor;
var instanceMatrix;
var cBuffer;
var theta = [
  22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
var angle = 0;

var modelViewMatrix, projectionMatrix;

var BASE_HEIGHT = 5.0;
var BASE_WIDTH = 5.0;

var ARM_HEIGHT = 5.0;
var ARM_WIDTH = 1.0;

var UPPER_ARM_HEIGHT = 3.0;
var UPPER_ARM_WIDTH = 0.75;

var LOWER_ARM_HEIGHT = 2.0;
var LOWER_ARM_WIDTH = 0.5;

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

var MAX_FRAMES = 10;
var frames = [];
var animFlag = false;
var animIndex = 0;
var count = 0;
var frameDif = [];

var points = [];
var colors = [];
var normals = [];

var vertices = [
  vec4(-0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, 0.5, 0.5, 1.0),
  vec4(0.5, 0.5, 0.5, 1.0),
  vec4(0.5, -0.5, 0.5, 1.0),
  vec4(-0.5, -0.5, -0.5, 1.0),
  vec4(-0.5, 0.5, -0.5, 1.0),
  vec4(0.5, 0.5, -0.5, 1.0),
  vec4(0.5, -0.5, -0.5, 1.0),
];

// RGBA colors
var vertexColors2 = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(1.0, 1.0, 1.0, 1.0), // white
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
];
var r = 245 / 255.0;  // Normalize red component
var g = 65 / 255.0;   // Normalize green component
var b = 29 / 255.0;   // Normalize blue component

  // Create a vec4 vector with alpha set to 1.0

var vertexColors = [
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
  vec4(r, g, b, 1.0),
];


function quad(a, b, c, d) {
  var t1 = subtract(vertices[b], vertices[a]);
  var t2 = subtract(vertices[c], vertices[b]);
  var normal = normalize(cross(t1, t2));

  normals.push(normal);
  normals.push(normal);
  normals.push(normal);
  normals.push(normal);
  normals.push(normal);
  normals.push(normal);

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
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
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
  var instanceMatrix = mult(translate(0.0, 0.5 * BASE_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

//----------------------------------------------------------------------------

function arm1_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm2_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm3_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm4_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm5_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm6_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm7_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function arm8_base() {
  var s = scale4(ARM_WIDTH, ARM_HEIGHT, ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function upperArm1() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm2() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm3() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm4() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function upperArm5() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm6() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm7() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function upperArm8() {
  var s = scale4(UPPER_ARM_WIDTH, UPPER_ARM_HEIGHT, UPPER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * UPPER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

//----------------------------------------------------------------------------

function lowerArm1() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function lowerArm2() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function lowerArm3() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function lowerArm4() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

function lowerArm5() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function lowerArm6() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function lowerArm7() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}
function lowerArm8() {
  var s = scale4(LOWER_ARM_WIDTH, LOWER_ARM_HEIGHT, LOWER_ARM_WIDTH);
  var instanceMatrix = mult(translate(0.0, -0.5 * LOWER_ARM_HEIGHT, 0.0), s);
  var t = mult(modelViewMatrix, instanceMatrix);
  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(t));
  gl.drawArrays(gl.TRIANGLES, 0, NumVertices);
}

//joint
function Joint(object1, object2, object1_tip, obect2_tip) {}

//hierarchy
function Octopus(arm1, arm2, arm3) {}

//interpolation logic

//texture mapping logic

//listeners
function fixSliders() {
  var slider = document.getElementById("slide");
  slider.value = theta[0];

  
  for (var i = 1; i <= 8; i++) {
    var armSlider = document.getElementById("arm-" + i);
    armSlider.value = theta[3*i-2];

    var upperarmSlider = document.getElementById("lowerarm-" + i);
    upperarmSlider.value = theta[3*i-1]; 

    var lowerarmSlider = document.getElementById("upperarm-" + i);
    lowerarmSlider.value = theta[3*i]; 
  }
}
function initListeners() {
  document.getElementById("slide").oninput = function (event) {
    theta[0] = parseFloat(event.target.value);
  };



  document.getElementById("arm1").oninput = function (event) {
    theta[1] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("arm2").oninput = function (event) {
    theta[4] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("arm3").oninput = function (event) {
    theta[7] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("arm4").oninput = function (event) {
    theta[10] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("arm5").oninput = function (event) {
    theta[13] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("arm6").oninput = function (event) {
    theta[16] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("arm7").oninput = function (event) {
    theta[19] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("arm8").oninput = function (event) {
    theta[22] = parseFloat(event.target.value);

    console.log(event.target.value);
  };

  document.getElementById("upperarm1").oninput = function (event) {
    theta[2] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("upperarm2").oninput = function (event) {
    theta[5] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("upperarm3").oninput = function (event) {
    theta[8] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("upperarm4").oninput = function (event) {
    theta[11] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("upperarm5").oninput = function (event) {
    theta[14] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("upperarm6").oninput = function (event) {
    theta[17] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("upperarm7").oninput = function (event) {
    theta[20] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("upperarm8").oninput = function (event) {
    theta[23] = parseFloat(event.target.value);

    console.log(event.target.value);
  };

  document.getElementById("lowerarm1").oninput = function (event) {
    theta[3] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("lowerarm2").oninput = function (event) {
    theta[6] = parseFloat(event.target.value);
    console.log(event.target.value);
  };
  document.getElementById("lowerarm3").oninput = function (event) {
    theta[9] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("lowerarm4").oninput = function (event) {
    theta[12] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("lowerarm5").oninput = function (event) {
    theta[15] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("lowerarm6").oninput = function (event) {
    theta[18] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("lowerarm7").oninput = function (event) {
    theta[21] = parseFloat(event.target.value);

    console.log(event.target.value);
  };
  document.getElementById("lowerarm8").oninput = function (event) {
    theta[24] = parseFloat(event.target.value);

    console.log(event.target.value);
  };

  var saveFrameButton = document.getElementById("saveFrame");
  var playAnimationButton = document.getElementById("playAnimation");

  // Add event listeners
  saveFrameButton.addEventListener("click", function () {
    captureFrame();
    //theta = [ 10, 20, 30, 40, 50, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log("Frame saved!");
  });

  document.getElementById("ResetBody").addEventListener("click", function () {
    theta = [
      22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
  });
  document.getElementById("resetLastFrame").addEventListener("click", function () {
    frames.pop();
  });
  document.getElementById("resetFrames").addEventListener("click", function () {
    frames = [];
  });

  playAnimationButton.addEventListener("click", function () {
    //playAnimation();
    calculateFrameDif();
    animFlag = true;
    console.log("Animation played!");
  });

  document.getElementById("saveButton").addEventListener("click", function () {
    saveAnimation();
  });

  // Event listener for Load Animation button
  document.getElementById("loadButton").addEventListener("click", function () {
    loadAnimation();
  });
}

//Functions

function saveAnimation() {
  frames_data = { ...frames };
  const jsonData = JSON.stringify(frames_data);
  const blob = new Blob([jsonData], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "animation.json";
  link.click();
}

function convertObjectToArray(framesObject) {
  // Extract values from the object and create an array
  var framesArray = Object.values(framesObject);

  return framesArray;
}
function loadAnimation(input) {
  var fileInput = input || document.createElement("input");
  fileInput.type = "file";

  // Trigger click on the file input
  fileInput.click();

  // Handle file selection
  fileInput.addEventListener("change", function (event) {
    var file = event.target.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var animationData = JSON.parse(e.target.result);
        console.log(animationData);
        // Assuming you have a function to update frames with loaded data
        frames = convertObjectToArray(animationData);

        //console.log(frames);
        //playAnimation();
        calculateFrameDif();
        animFlag = true;

        console.log("Animation loaded");
      };

      reader.readAsText(file);
    }
  });
}
function updateBuffer() {}
function createBuffer() {
  vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  nBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

  vNormal = gl.getAttribLocation(program, "vNormal");
  gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vNormal);

}

function captureFrame() {
  var temp = [];
  for (var i = 0; i < theta.length; i++) {
    temp.push(parseInt(theta[i]));
  }
  frames.push(temp);
  console.log(temp);

  console.log("Frame captured");
}

function interpolateFrame(index) {
  var interpolatedFrames = [];
  var frameDif = subtractArrays(frames[index + 1], frames[index]);
  console.log(frames);
  console.log(frameDif);
  for (var i = 0; i < MAX_FRAMES; i++) {
    interpolatedFrames.push(
      addArrays(frames[index], divideArray(multArray(frameDif, i)))
    );
  }
  console.log(interpolatedFrames);
  return interpolatedFrames;
}

function playAnimation() {
  for (var i = 0; i < frames.length - 1; i++) {
    var temp = interpolateFrame(i);
    for (var j = 0; j < temp.length; j++) {
      displayFrame(temp[j]);
    }
  }
  theta = frames[frames.length - 1];
}

function displayFrame(newTheta) {
  theta = newTheta;
}

function calculateFrameDif() {
  frameDif = [];
  for (var i = 1; i < frames.length; i++) {
    var temp = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    for (var j = 0; j < theta.length; j++) {
      temp[j] = frames[i][j] - frames[i - 1][j];
    }
    frameDif.push(temp);
  }
}
function downloadFrame() {}
function loadFrame() {}

function subtractArrays(arr1, arr2) {
  // Make sure both arrays are of the same length
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length for subtraction.");
  }

  // Perform subtraction element-wise
  var result = [];
  for (var i = 0; i < arr1.length; i++) {
    result.push(arr1[i] - arr2[i]);
  }

  return result;
}
function addArrays(arr1, arr2) {
  // Make sure both arrays are of the same length
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length for addition.");
  }

  // Perform addition element-wise
  var result = [];
  for (var i = 0; i < arr1.length; i++) {
    result.push(arr1[i] + arr2[i]);
  }

  return result;
}
function divideArray(inputArray) {
  // Perform division element-wise
  var result = [];
  for (var i = 0; i < inputArray.length; i++) {
    result.push(inputArray[i] / MAX_FRAMES);
  }

  return result;
}
function multArray(inputArray, mult) {
  // Perform division element-wise
  var result = [];
  for (var i = 0; i < inputArray.length; i++) {
    result.push(inputArray[i] * mult);
  }

  return result;
}

//onload
window.onload = function init() {
  fixSliders();
  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
    return;
  }
  //init listeners
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(50 / 255.0, 117 / 255.0, 0.8, 168 / 255.0);
  gl.enable(gl.DEPTH_TEST);

  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  colorCube();
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  createBuffer();
  var lightDirection = [1.0, 1.0, 1.0]; // Replace with your actual light direction
  var lightDirectionLoc = gl.getUniformLocation(program, "lightDirection");
  gl.uniform3fv(lightDirectionLoc, lightDirection);
  
  initListeners();

  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

  projectionMatrix = ortho(-10, 10, -10, 10, -10, 10);
  gl.uniformMatrix4fv(
    gl.getUniformLocation(program, "projectionMatrix"),
    false,
    flatten(projectionMatrix)
  );

  //init program and shaders

  updateBuffer();

  render();
};

//render
var render = function () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  if (animIndex == frames.length) {
    animIndex = 0;
    animFlag = false;
  }

  if (animFlag) {
    if (animIndex == 0) {
      theta = frames[0];
      animIndex++;
    }
    for (var i = 0; i < theta.length; i++) {
      theta[i] += frameDif[animIndex - 1][i] / 240.0;
    }
    count++;
    if (count == 240) {
      animIndex++;
      count = 0;
    }
    fixSliders();

    //console.log(theta);
    //console.log(count);
  }

  modelViewMatrix = mult(
    translate(0.0, 0.5 * BASE_HEIGHT, 0.0),
    rotate(theta[Base], 0, 1, 0)
  );
  model2 = modelViewMatrix;
  base();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(-0.5 * BASE_WIDTH, 0.0, 0.5 * BASE_WIDTH)
  );
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm1], -1, 0, -1));
  arm1_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm1_uppearm], -1, 0, -1)
  );
  upperArm1();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm1_lowerarm], -1, 0, -1)
  );
  lowerArm1();

  modelViewMatrix = mult(model2, translate(0.0, 0.0, 0.5 * BASE_WIDTH));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm2], -1, 0, 0));
  arm2_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm2_uppearm], -1, 0, 0)
  );
  upperArm2();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm2_lowerarm], -1, 0, 0)
  );
  lowerArm2();

  modelViewMatrix = mult(
    model2,
    translate(0.5 * BASE_WIDTH, 0.0, 0.5 * BASE_WIDTH)
  );
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm3], -1, 0, 1));
  arm3_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm3_uppearm], -1, 0, 1)
  );
  upperArm3();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm3_lowerarm], -1, 0, 1)
  );
  lowerArm3();

  modelViewMatrix = mult(model2, translate(0.5 * BASE_WIDTH, 0.0, 0.0));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm4], 0, 0, 1));
  arm4_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm4_uppearm], 0, 0, 1));
  upperArm4();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm4_lowerarm], 0, 0, 1)
  );
  lowerArm4();

  modelViewMatrix = mult(
    model2,
    translate(0.5 * BASE_WIDTH, 0.0, -0.5 * BASE_WIDTH)
  );
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm5], 1, 0, 1));
  arm5_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm5_uppearm], 1, 0, 1));
  upperArm5();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm5_lowerarm], 1, 0, 1)
  );
  lowerArm5();

  modelViewMatrix = mult(model2, translate(0.0, 0.0, -0.5 * BASE_WIDTH));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm6], 1, 0, 0));
  arm6_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm6_uppearm], 1, 0, 0));
  upperArm6();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm6_lowerarm], 1, 0, 0)
  );
  lowerArm6();

  modelViewMatrix = mult(
    model2,
    translate(-0.5 * BASE_WIDTH, 0.0, -0.5 * BASE_WIDTH)
  );
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm7], 1, 0, -1));
  arm7_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm7_uppearm], 1, 0, -1)
  );
  upperArm7();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm7_lowerarm], 1, 0, -1)
  );
  lowerArm7();

  modelViewMatrix = mult(model2, translate(-0.5 * BASE_WIDTH, 0.0, 0.0));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta[arm8], 0, 0, -1));
  arm8_base();

  modelViewMatrix = mult(modelViewMatrix, translate(0.0, -ARM_HEIGHT, 0.0));
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm8_uppearm], 0, 0, -1)
  );
  upperArm8();

  modelViewMatrix = mult(
    modelViewMatrix,
    translate(0.0, -UPPER_ARM_HEIGHT, 0.0)
  );
  modelViewMatrix = mult(
    modelViewMatrix,
    rotate(theta[arm8_lowerarm], 0, 0, -1)
  );
  lowerArm8();

  requestAnimFrame(render);
};
