let field = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
];

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

function initVideo() {
  let s="Q:";
  videoDevices.forEach(function(device) {
      s += device + " | ";
    });
    alert(s);

  var constraints = { video : { deviceId: videoDevices[0] } };

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    var video = document.querySelector('video');
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); });

}

let videoDevices = [];
function init() {
  // video = document.getElementById("video");
  // video.width = document.body.clientWidth;
  // video.height = document.body.clientHeight;

  //https://developer.mozilla.org/ru/docs/Web/API/MediaDevices/getUserMedia
  if (navigator.webkitGetUserMedia!=null) {
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        if (device.kind == "videoinput")
          videoDevices.push(device.deviceId);
      });
      initVideo(videoDevices);
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
  } else {
      alert("Без SSL документ не может получить доступ к веб-камере");
  }

  
  

  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('devicemotion', onMotionChange);
  window.addEventListener('deviceorientation', onOrientationChange);
  document.addEventListener('keydown', onKeyDown);
  document.getElementById("canvas").addEventListener('dblclick', toggleFullScreen);
  

  resizeCanvas();

  Tick();
}

function Tick() {
  moveDown(currentFigure);
  setTimeout(Tick, 1000);
}

function onKeyDown(event) {
  if (event.key == 'ArrowLeft') {
    moveLeft(currentFigure);
  } else if (event.key == 'ArrowRight') {
    moveRight(currentFigure);
  } else if (event.key == 'ArrowDown') {
    moveDown(currentFigure);
  }
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

let currentFigure = {
  x : 0,
  y : 0,
  figureType : 7,
  block : [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ]
}

function moveLeft(figure, step = 1) {
  moveFigure(figure, -step);
  if (checkPosition(figure) != true)
    moveFigure(figure, step);
}

function moveRight(figure, step = 1) {
  moveFigure(figure, step);
  if (checkPosition(figure) != true)
    moveFigure(figure, -step);
}

function moveDown(figure, step = 1) {
  figure.y += 1;
  if (checkPosition(figure) != true) {
    figure.y -= 1;
    stop(figure);
  }    
  window.requestAnimationFrame(drawStuff);
}

function checkPosition(figure) {
  for (let row = 0; row < currentFigure.block.length; row++) {
    for (let column = 0; column < currentFigure.block[0].length; column++) {
      let x = currentFigure.x + column;
      let y = currentFigure.y + row;
      x %= fieldWidth;
      if (field[y][x] != 0 && currentFigure.block[row][column] != 0)
        return false;
      if (y >= fieldHeight && currentFigure.block[row][column] != 0)
        return false;
    }
  }
  return true;
}

function stop(figure) {
  for (let row = 0; row < currentFigure.block.length; row++) {
    for (let column = 0; column < currentFigure.block[0].length; column++) {
      let x = currentFigure.x + column;
      let y = currentFigure.y + row;
      x %= fieldWidth;
      field[y][x] = currentFigure.figureType;
    }
  }
  currentFigure = {
    x : 0,
    y : 0,
    figureType : 7,
    block : [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ]
  };
  window.requestAnimationFrame(drawStuff);
}

function moveFigure(figure, step) {
  figure.x += step;
  if (figure.x < 0) figure.x += fieldWidth;
  figure.x %= fieldWidth;
  window.requestAnimationFrame(drawStuff);
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
  for (let row = 0; row < currentFigure.block.length; row++) {
    for (let column = 0; column < currentFigure.block[0].length; column++) {
      let x = currentFigure.x + column;
      let y = currentFigure.y + row;
      x %= fieldWidth;
      context.fillStyle = "rgba(100,200,240,0.9)";
      if (currentFigure.block[row][column] == 1 && x < viewWidth)
        context.fillRect(shift * x + x * blockSize, 16 + shift * y + y * blockSize, blockSize, blockSize);
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