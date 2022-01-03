let field = "" +
"111111000111111010000011000001011000:" +
"011111000111110001000001000010111000:" +
"001111000111100000100001000100011000:" +
"000111000111000000010001111100101100:" +
"000011444110006660010001000000000000:" +
"110001331000006000011111000000000000:" +
"123456733234567000022221012345676543:" +
"111110000000000000010001000005555000:" +
"111110006000020000511111000033666000:" +
"111110006000220000511111000003360000:" +
"001010006000023344511111000022000000:" +
"100110006666600000510001006002000000:" +
"111110000000700000511111006332000000:" +
"111110000000705555511111006633000000:" +
"100010000000700000010001000000000000:" +
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
  document.getElementById("canvas").addEventListener('dblclick', toggleFullScreen);
  

  resizeCanvas();
}


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  video.width = window.innerWidth;
  video.height = window.innerHeight;
  


  blockSize = Math.min(
    (window.innerWidth - blockMargin * (viewWidth - 1))  / viewWidth,
    (window.innerHeight - blockMargin * (viewHeight - 1) - 16)  / viewHeight
  );
     
  drawStuff();
}


function onMotionChange(e) {
  var ag = e.accelerationIncludingGravity;
  //console.log(ag);
}

function onOrientationChange(event) {
  if (
    Math.abs(orient.alpha - event.alpha) > 6
  ) {
    orient.alpha = event.alpha;
    orient.beta = event.beta;
    orient.gamma = event.gamma;
    //document.getElementById("div").innerHTML = "alpha=" + event.alpha + "<br>beta=" + event.beta + "<br>gamma=" + event.gamma;
    direction = Math.floor(event.alpha / 360 * fieldWidth);
    document.getElementById("div").innerHTML = "             direction: " + direction;
    window.requestAnimationFrame(drawStuff);
  }
  
}


function drawStuff() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  let shift = blockMargin;
  for (let row = 0; row < viewHeight; row++) {
    for (let column = 0; column < viewWidth; column++) {
      let cellType = field[row][(column - direction + fieldWidth) % fieldWidth];
      if (cellType == "0") {
        context.fillStyle = "rgba(200,200,100,0.1)";
      } else {
        if (cellType == 1) context.fillStyle = "rgba(200,100,10,0.5)";
        else if (cellType == 2) context.fillStyle = "rgba(30,50,200,0.5)";
        else if (cellType == 3) context.fillStyle = "rgba(30,150,100,0.5)";
        else if (cellType == 4) context.fillStyle = "rgba(120,50,50,0.5)";
        else if (cellType == 5) context.fillStyle = "rgba(60,90,120,0.5)";
        else if (cellType == 6) context.fillStyle = "rgba(30,170,40,0.5)";
        else if (cellType == 7) context.fillStyle = "rgba(180,200,70,0.5)";

      }
      context.fillRect(shift * column + column * blockSize, 16 + shift * row + row * blockSize, blockSize, blockSize);
    }
  }
  
}


function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}