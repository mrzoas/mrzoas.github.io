let field = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,3,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,4,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,5,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,6,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,2,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,3,0,0,0,5,2,2,],
  [0,0,0,3,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,7,4,0,0,0,7,4,4,3,6,6,5,5,6,1,],
  [6,6,6,3,2,5,5,0,0,0,4,2,2,6,0,0,0,0,0,0,2,7,4,3,7,7,7,4,4,3,6,6,5,7,6,1,],
  [6,1,3,3,2,5,5,0,0,4,4,5,5,6,0,0,0,0,0,0,2,4,4,3,5,5,1,1,2,3,1,1,7,7,6,1,],
  [1,1,1,2,2,3,3,3,3,4,5,5,6,6,0,0,0,0,0,0,2,2,3,3,5,5,1,1,2,2,2,1,1,7,6,1,],
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

function initVideo(videoDevices) {

  var constraints = { video : { deviceId: videoDevices[videoDevices.length - 1] } };

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


function init() {

  // video = document.getElementById("video");
  // video.width = document.body.clientWidth;
  // video.height = document.body.clientHeight;

  //https://developer.mozilla.org/ru/docs/Web/API/MediaDevices/getUserMedia
  if (navigator.webkitGetUserMedia!=null) {
    
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      let videoDevices = [];
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

  window.addEventListener("touchstart", touchstart, { passive: false });
  window.addEventListener("touchend", touchend, { passive: false });
  

  resizeCanvas();

  Tick();
}

function Tick() {
  moveDown(currentFigure);
  setTimeout(Tick, 1000);
}

//----------------
var onlongtouch; 
var timer;
var touchduration = 800; //length of time we want the user to touch before we do something

function touchstart(e) {
  e.preventDefault();
  if (!timer) {
      timer = setTimeout(onlongtouch, touchduration);
  }
}

function touchend() {
    //stops short touches from firing the event
    if (timer) {
      turnRight(currentFigure);
      clearTimeout(timer);
      timer = null;
    }
}

onlongtouch = function() { 
  timer = null;
  moveDown(currentFigure,20);
};



//----------

function onKeyDown(event) {
  if (event.key == 'ArrowLeft') {
    moveLeft(currentFigure);
  } else if (event.key == 'ArrowRight') {
    moveRight(currentFigure);
  } else if (event.key == 'ArrowDown') {
    moveDown(currentFigure);
  } else if (event.key == 'ArrowUp') {
    turnLeft(currentFigure);
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


let motionFix = 0;
let motionFixMax = 0.2;
function onMotionChange(e) {
  // let acc = e.acceleration;
  // let newAcc = Math.sqrt(acc.x*acc.x+acc.y*acc.y+acc.z*acc.z);
  // if (Math.abs(motionFix - newAcc) > 0.9 * motionFixMax)
  // {
  //   moveDown(currentFigure);
  //   console.log(acc);
  // }
  // if (newAcc > motionFixMax) {
  //   motionFixMax = newAcc;
  // }
  // motionFixMax -= 0.01;
  // motionFix = newAcc;
}

function onOrientationChange(event) {
  if (
    Math.abs(orient.alpha - event.alpha) > 6 ||
    Math.abs(orient.beta - event.beta) > 6 ||
    Math.abs(orient.gamma - event.gammma) > 6
  ) {
    orient.alpha = event.alpha;
    orient.beta = event.beta;
    orient.gamma = event.gamma;
    
    let dDir = Math.floor((360 - event.alpha) / 360 * fieldWidth) - direction;
    direction = Math.floor((360 - event.alpha) / 360 * fieldWidth);
    if (dDir < 0) {
      while (dDir != 0) {
        moveLeft(currentFigure);
        dDir++;
      }
    }
    if (dDir > 0) {
      while (dDir != 0) {
        moveRight(currentFigure);
        dDir--;
      }
    }
    //currentFigure.x = direction;

    //document.getElementById("div").innerHTML = "alpha=" + Math.round(event.alpha) + "<br>beta=" + Math.round(event.beta) + "<br>gamma=" + Math.round(event.gamma);
    //document.getElementById("div").innerHTML = "_______direction: " + direction;
    window.requestAnimationFrame(drawStuff);
  }
  
}



let figures = [
  [
    [ [1,1,1], [1,0,0] ], [ [1,1], [0,1], [0,1] ], [ [0,0,1], [1,1,1] ], [ [1,0], [1,0], [1,1] ]
  ],
  [
    [ [1,0,0], [1,1,1] ], [ [1,1], [1,0], [1,0] ], [ [1,1,1], [0,0,1] ], [ [0,1], [0,1], [1,1] ]
  ],
  [
    [
      [1,1],
      [1,1]
    ]
  ],
  [
    [
      [0,1],
      [0,1],
      [0,1],
      [0,1]
    ],
    [
      [0,0,0,0],
      [1,1,1,1]
    ]
  ],
  [
    [
      [0,1,0],
      [1,1,1]
    ],
    [
      [1,0],
      [1,1],
      [1,0]
    ],
    [
      [1,1,1],
      [0,1,0]
    ],
    [
      [0,1],
      [1,1],
      [0,1]
    ]
  ],
  [
    [
      [1,1,0],
      [0,1,1]
    ],
    [
      [0,1],
      [1,1],
      [1,0]
    ]
  ],
  [
    [
      [0,1,1],
      [1,1,0]
    ],
    [
      [1,0],
      [1,1],
      [0,1]
    ]
  ]
];

let currentFigure = {
  x : direction,
  y : 0,
  figureType : 0,
  blockType : 0,
  block : figures[0][0]
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

function turnLeft(figure) {
  figure.blockType = (figure.blockType - 1 + figures[figure.figureType].length) % figures[figure.figureType].length;
  figure.block = figures[figure.figureType][figure.blockType];
  if (checkPosition(figure) != true) {
    figure.blockType = (figure.blockType + 1) % figures[fugure.figureType].length;
    figure.block = figures[figure.figureType][figure.blockType];
  }
  window.requestAnimationFrame(drawStuff);
}

function turnRight(figure) {
  figure.blockType = (figure.blockType + 1) % figures[figure.figureType].length;
  figure.block = figures[figure.figureType][figure.blockType];
  if (checkPosition(figure) != true) {
    figure.blockType = (figure.blockType - 1 + figures[figure.figureType].length) % figures[fugure.figureType].length;
    figure.block = figures[figure.figureType][figure.blockType];
  }
  window.requestAnimationFrame(drawStuff);
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
      if (currentFigure.block[row][column] != 0 && y >= fieldHeight )
        return false;
      if (currentFigure.block[row][column] != 0 && field[y][x] != 0)
        return false;
      
    }
  }
  return true;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function stop(figure) {
  for (let row = 0; row < currentFigure.block.length; row++) {
    for (let column = 0; column < currentFigure.block[0].length; column++) {
      let x = currentFigure.x + column;
      let y = currentFigure.y + row;
      x %= fieldWidth;
      if (currentFigure.block[row][column] != 0)
        field[y][x] = currentFigure.figureType + 1;
    }
  }

  checkField();


  currentFigure.x = direction;
  currentFigure.y = 0;
  currentFigure.figureType = getRandomInt(0, figures.length);
  currentFigure.blockType = 0;
  currentFigure.block = figures[currentFigure.figureType][0];
  window.requestAnimationFrame(drawStuff);
}

function moveFigure(figure, step) {
  figure.x += step;
  if (figure.x < 0) figure.x += fieldWidth;
  figure.x %= fieldWidth;
  window.requestAnimationFrame(drawStuff);
}

function checkField() {
  for (let row = fieldHeight - 1; row >= 0; row--) {
    let pointInLine = 0;
    for (let column = 0; column < fieldWidth; column++) {
      if (field[row][column] != 0)
        pointInLine++;
    }
    if (pointInLine == fieldWidth) {
      score++;
      delLine(row);
    }
  }
}

function delLine(nLine) {
  for (let row = nLine; row > 0; row--) {
    for (let column = 0; column < fieldWidth; column++) {
      field[row][column] = field[row - 1][column];
    }
  }
  for (let column = 0; column < fieldWidth; column++) {
    field[0][column] = 0;
  }
}

let score = 0;

function drawStuff() {
  document.getElementById("div").innerHTML = "Score: " + score;


  context.clearRect(0, 0, canvas.width, canvas.height);

  let shift = blockMargin;
  for (let row = 0; row < viewHeight; row++) {
    for (let column = 0; column < viewWidth; column++) {
      let cellType = field[row][(column + direction + fieldWidth - viewWidth / 2) % fieldWidth];

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
      let x = (currentFigure.x - direction + column + fieldWidth + viewWidth / 2) % fieldWidth;
      let y = currentFigure.y + row;
      if (currentFigure.figureType == 0) context.fillStyle = "rgba(200,100,10,0.6)";
      else if (currentFigure.figureType == 1) context.fillStyle = "rgba(30,50,200,0.6)";
      else if (currentFigure.figureType == 2) context.fillStyle = "rgba(30,150,100,0.6)";
      else if (currentFigure.figureType == 3) context.fillStyle = "rgba(120,50,50,0.6)";
      else if (currentFigure.figureType == 4) context.fillStyle = "rgba(60,90,120,0.6)";
      else if (currentFigure.figureType == 5) context.fillStyle = "rgba(30,170,40,0.6)";
      else if (currentFigure.figureType == 6) context.fillStyle = "rgba(180,200,70,0.6)";
      if (currentFigure.block[row][column] == 1 && x < viewWidth) {
        context.fillRect(shift * x + x * blockSize, 16 + shift * y + y * blockSize, blockSize, blockSize);
      }
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