let field = "" +
"000000000111100000000011000000000000:" +
"010000000000000000000001000000000000:" +
"000000000000000000000001000000000000:" +
"000000000000000000000001000000101100:" +
"111110000000000000010001000000000000:" +
"110000000000000000011111000000000000:" +
"100100000000000000011111000000000000:" +
"111110000000000000010001000000000000:" +
"111110000000000000011111000000000000:" +
"111110000000000000011111000000000000:" +
"001010000000000000011111000000000000:" +
"100110000010000000010001000000000000:" +
"111110000000000000011111000000000000:" +
"111110000000000000011111000000000000:" +
"100010000000000000010001000000000000:" +
"000001111000001000100000000000000000:" +
"000000000000001000000100000000000000:" +
"000000000000001000000000011000000000:" +
"000000000000001000000000000000000000:" +
"000000000000011100000000000000000000";
field = field.split(":");
let fieldWidth = field[0].length;
let fieldHeight = field.length;
let viewWidth = 10;
let viewHeight = field.length;
let blockMargin = 3;
let blockSize = Math.min(
  (window.innerWidth - blockMargin * viewWidth)  / viewWidth,
  (window.innerHeight - blockMargin * viewHeight)  / viewHeight
);

let direction = 0;
let orient = {
  alpha : 0,
  beta : 0,
  gamma : 0
}

let video;
let canvas;
let context;

function init() {
  // video = document.getElementById("video");
  // video.width = document.body.clientWidth;
  // video.height = document.body.clientHeight;
  

  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('devicemotion', onMotionChange);
  window.addEventListener('deviceorientation', onOrientationChange);

  resizeCanvas();
}


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  video.width = window.innerWidth;
  video.height = window.innerHeight;

  blockSize = Math.min(
    (window.innerWidth - blockMargin * viewWidth)  / viewWidth,
    (window.innerHeight - blockMargin * viewHeight)  / viewHeight
  );
     
  drawStuff();
}


function onMotionChange(e) {
  var ag = e.accelerationIncludingGravity;
  //console.log(ag);
}

function onOrientationChange(event) {
  if (
    Math.abs(orient.alpha - event.alpha) > 10 ||
    Math.abs(orient.beta - event.beta) > 10 ||
    Math.abs(orient.gamma - event.gamma) > 10
  ) {
    orient.alpha = event.alpha;
    orient.beta = event.beta;
    orient.gamma = event.gamma;
    document.getElementById("div").innerHTML = "alpha=" + event.alpha + "<br>beta=" + event.beta + "<br>gamma=" + event.gamma;
    direction = event.alpha;
  }
  
}


function drawStuff() {
  let shift = blockMargin;
  
  for (let row = 0; row < viewHeight; row++) {
    for (let column = 0; column < viewWidth; column++) {
      if (field[row][Math.floor((column + direction) / viewWidth)] == "0") {
        context.fillStyle = "rgba(200,200,100,0.3)";
      } else {
        context.fillStyle = "rgba(100,100,200,0.2)";
      }
      context.fillRect(shift * column + column * blockSize, shift * row + row * blockSize, blockSize, blockSize);
    }
  }
  
}
