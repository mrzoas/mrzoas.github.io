let field = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,3,0,0,0,0,0,0,0,0,2,2,0,0],
  [6,6,6,3,2,5,5,0,0,0,4,2,2,6,0,0],
  [6,1,3,3,2,5,5,0,0,4,4,5,5,6,0,0],
  [1,1,1,2,2,3,3,3,3,4,5,5,6,6,0,0],
];

let fieldWidth = field[0].length;
let fieldHeight = field.length;
let blockMargin = 1;
let shift = 3;
let partOfInnerCircle = 0.2;
let partOfField = 1 - partOfInnerCircle;
let ringWidthStep = 1;

let viewRadius = 0.5 * Math.min(
  (window.innerWidth - 2 * blockMargin * fieldWidth),
  (window.innerHeight - 2 * blockMargin * fieldHeight)
);
let innerCircleRadius = partOfInnerCircle * viewRadius;
let innerRingWidth;
if (ringWidthStep == 1) innerRingWidth = partOfField * viewRadius / fieldHeight;
else innerRingWidth = partOfField * viewRadius * (1 - ringWidthStep) / (1 - ringWidthStep**fieldHeight);
let leftRight = true;

let stroke = false;
document.getElementById("inputBlockMargin").value = blockMargin;
document.getElementById("inputPartOfInnerCircle").value = partOfInnerCircle;
document.getElementById("inputRingWidthStep").value = ringWidthStep;
document.getElementById("inputStroke").checked = stroke;
document.getElementById("inputLeftRight").checked = leftRight;




let direction = 0;
let orient = {
  alpha : 0,
  beta : 0,
  gamma : 0
}


let canvas;
let context;
let panel;


function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  panel = document.getElementById('panel');

  window.addEventListener('resize', resizeCanvas);
  // window.addEventListener('devicemotion', onMotionChange);
  // window.addEventListener('deviceorientation', onOrientationChange);
  window.addEventListener('wheel', onWheel);
  canvas.addEventListener('click', onMouseClick);
  canvas.addEventListener('dblclick ', onMouseClick);
  window.addEventListener('keydown', onKeyDown);
  //document.getElementById("canvas").addEventListener('dblclick', toggleFullScreen);

  // window.addEventListener("touchstart", touchstart, { passive: false });
  // window.addEventListener("touchend", touchend, { passive: false });
  
  
  resizeCanvas();
  



  Tick();
}





let gameTimer;
let gameSpeed = 1000;
function Tick() {
  moveDown(currentFigure);
  gameTimer = setTimeout(Tick, gameSpeed);
}

//----------------
let onlongtouch; 
let timer;
let touchduration = 800;
let touch = { pageX : 0, pageY : 0 };

function touchstart(e) {
  e.preventDefault();
  if (!timer) {
    timer = setTimeout(onlongtouch, touchduration);
    touch = e.changedTouches[0];
  }
}

function touchend(e) {
  let swipeLen = vectorLength(touch.pageX, touch.pageY, e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  if (swipeLen > 0.1 * viewHeight) {
    switch(swipeDirection(touch, e.changedTouches[0])) {
      case "left":
        break;
      case "right":
        break;
      case "up":
        toggleFullScreen();
        break;
      case "down":
        moveDown(currentFigure, fieldHeight);
        break;
    }
  } else if (timer) {
    turnRight(currentFigure); // короткое нажатие
  }
  clearTimeout(timer);
  timer = null;
}

function vectorLength(p1x, p1y, p2x, p2y) {
  return Math.sqrt((p1x - p2x)**2 + (p1y - p2y)**2);
}

function swipeDirection(startTouch, endTouch) {
  let swipeLen = vectorLength(startTouch.pageX, startTouch.pageY, endTouch.pageX, endTouch.pageY);
  let horizontal = endTouch.pageX - startTouch.pageX;
  let vertical = endTouch.pageY - startTouch.pageY;
  if (Math.abs(horizontal/swipeLen) > 0.5)
    if (horizontal > 0)
      return "right";
    else
      return "left";
  if (Math.abs(vertical/swipeLen) > 0.5)
    if (vertical > 0)
      return "down";
    else
      return "up";
  return "none";
}


onlongtouch = function() { 
  timer = null;
  // долгое нажатие
  if (gameTimer != null) {
    clearTimeout(gameTimer);
    gameTimer = null;
  } else {
    Tick();
  }
};
//----------

function onWheel(event) {
  if (event.deltaY > 0) {
    moveRight(currentFigure);
  } else if (event.deltaY < 0) {
    moveLeft(currentFigure);
  }
}

function onMouseClick(event) {
  if(event.preventDefault != undefined)
    event.preventDefault();
  if(event.stopPropagation != undefined)
    event.stopPropagation();
  turnRight(currentFigure);
}

function onKeyDown(event) {
  if (event.key == 'ArrowLeft') {
    if (!leftRight) moveLeft(currentFigure);
    else moveRight(currentFigure);
  } else if (event.key == 'ArrowRight') {
    if (!leftRight) moveRight(currentFigure);
    else moveLeft(currentFigure);
  } else if (event.key == 'ArrowDown') {
    moveDown(currentFigure);
  } else if (event.key == 'ArrowUp') {
    turnLeft(currentFigure);
  }
}


function resizeCanvas() {
  canvas.width = window.innerWidth / 3 * 2;
  canvas.height = window.innerHeight; 
  panel.style.width = window.innerWidth / 3 + "px";
  panel.style.height = window.innerHeight + "px";


  fieldWidth = field[0].length;
  fieldHeight = field.length;
  //blockMargin = 1;
  shift = blockMargin * 3;
  //partOfInnerCircle = 0.2;
  partOfField = 1 - partOfInnerCircle;
  //ringWidthStep = 1.05;

  viewRadius = 0.49 * Math.min(
    (canvas.width - 2 * blockMargin * fieldWidth),
    (canvas.height - 2 * blockMargin * fieldHeight)
  );
  innerCircleRadius = partOfInnerCircle * viewRadius;
  innerRingWidth;
  if (ringWidthStep == 1) innerRingWidth = partOfField * viewRadius / fieldHeight;
  else innerRingWidth = partOfField * viewRadius * (1 - ringWidthStep) / (1 - ringWidthStep**fieldHeight);



  viewField = getViewField();
     
  drawStuff();
}

function applySetting() {
  blockMargin = +document.getElementById("inputBlockMargin").value;
  stroke = document.getElementById("inputStroke").checked;
  leftRight = document.getElementById("inputLeftRight").checked;
  partOfInnerCircle = +document.getElementById("inputPartOfInnerCircle").value;
  ringWidthStep = +document.getElementById("inputRingWidthStep").value;
  
  resizeCanvas();
}


function onMotionChange(e) {
  let acc = e.acceleration;
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
    if (dDir > 180) dDir = dDir - 360;
    if (dDir < -180) dDir = dDir + 360;

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
    [ [1,1], [1,1] ]
  ],
  [
    [
      [0,0,0,0],
      [1,1,1,1]
    ],
    [
      [0,1],
      [0,1],
      [0,1],
      [0,1]
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

let nextFigure = genNewFigure();
let currentFigure = genNewFigure();



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
  while (step--) {
    figure.y += 1;
    if (checkPosition(figure) != true) {
      figure.y -= 1;
      stop(figure);
      break;
    }    
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

  
  currentFigure = nextFigure;
  nextFigure = genNewFigure();

  window.requestAnimationFrame(drawStuff);
}

function genNewFigure() {
  let newFigure = {
    x : direction,
    y : 0
  };
  newFigure.figureType = getRandomInt(0, figures.length);
  newFigure.blockType = 0;
  newFigure.block = figures[newFigure.figureType][0];

  return newFigure;
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

let viewField;
function getViewField() {
  let pathes = [];
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let angleStep = 2 * Math.PI / fieldWidth;
  let radius = innerCircleRadius;
  let ringWidth = innerRingWidth;
  
  for (let ring = 0; ring < fieldHeight; ring++) {
    let newRing = [];
    pathes.push(newRing);
    let angle = 0;
    for (let ringCell = 0; ringCell < fieldWidth; ringCell++) {
      let newRingCell = new Path2D();
      newRing.push(newRingCell);
      let xIn, yIn, xOut, yOut;
      let angleBegin = angle;
      let angleEnd = angle + angleStep;
      let innerRadius = radius;
      let outerRadius = radius + ringWidth;
      let innerAngleShift = shift / (2 * Math.PI * innerRadius);
      let outerAngleShift = shift / (2 * Math.PI * outerRadius);
      
      xIn = x + Math.cos(angleBegin + innerAngleShift) * innerRadius;
      yIn = y + Math.sin(angleBegin + innerAngleShift) * innerRadius;
      // xOut = x + Math.cos(angleBegin) * outerRadius;
      // yOut = y + Math.sin(angleBegin) * outerRadius;
      newRingCell.moveTo(xIn, yIn);
      //context.lineTo(xOut, yOut);
      newRingCell.arc(x, y, outerRadius, angleBegin + outerAngleShift, angleEnd - outerAngleShift, false);
      xIn = x + Math.cos(angleEnd - innerAngleShift) * innerRadius;
      yIn = y + Math.sin(angleEnd - innerAngleShift) * innerRadius;
      // xOut = x + Math.cos(angleEnd) * outerRadius;
      // yOut = y + Math.sin(angleEnd) * outerRadius;
      //context.lineTo(xOut, yOut);
      newRingCell.lineTo(xIn, yIn);
      newRingCell.arc(x, y, innerRadius, angleEnd - innerAngleShift, angleBegin + innerAngleShift, true);
      

      angle += angleStep;
    }
    newRing.reverse();
    radius += ringWidth + blockMargin;
    ringWidth *= ringWidthStep;
  }
  return pathes;
}

function drawStuff() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let ring = 0; ring < fieldHeight; ring++) {
    for (let ringCell = 0; ringCell < fieldWidth; ringCell++) {
      let cellPath = viewField[ring][ringCell];
      let cellType = field[ring][ringCell];
      if (stroke) {
        context.strokeStyle = "rgba(200,200,200,0.6)";
        context.stroke(cellPath);
      }
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
      context.fill(cellPath);
    }
  }
  
  for (let row = 0; row < currentFigure.block.length; row++) {
    for (let column = 0; column < currentFigure.block[0].length; column++) {
      let ringCell = (currentFigure.x + column) % fieldWidth;
      let ring = currentFigure.y + row;
      let cellPath = viewField[ring][ringCell];
      if (currentFigure.figureType == 0) context.fillStyle = "rgba(200,100,10,0.6)";
      else if (currentFigure.figureType == 1) context.fillStyle = "rgba(30,50,200,0.6)";
      else if (currentFigure.figureType == 2) context.fillStyle = "rgba(30,150,100,0.6)";
      else if (currentFigure.figureType == 3) context.fillStyle = "rgba(120,50,50,0.6)";
      else if (currentFigure.figureType == 4) context.fillStyle = "rgba(60,90,120,0.6)";
      else if (currentFigure.figureType == 5) context.fillStyle = "rgba(30,170,40,0.6)";
      else if (currentFigure.figureType == 6) context.fillStyle = "rgba(180,200,70,0.6)";
      if (currentFigure.block[row][column] == 1) {
        context.fill(cellPath);
      }
    }
  }

  let blockSize = innerCircleRadius * 0.3;
  let nextFigW = nextFigure.block[0].length;
  let nextFigH = nextFigure.block.length;
  let nextFigXshift = nextFigW / 2 * blockSize;
  let nextFigYshift = nextFigH / 2 * blockSize;
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let nextFigureView = new Path2D();
  for (let row = 0; row < nextFigH; row++) {
    for (let column = 0; column < nextFigW; column++) {
      if (nextFigure.block[row][column] == 1) {
        nextFigureView.rect(
          x - nextFigXshift + blockSize * column + blockMargin,
          y - nextFigYshift + blockSize * row + blockMargin,
          blockSize - 2 * blockMargin, 
          blockSize - 2 * blockMargin
        );
      }
    }
  }
  context.fillStyle = "rgba(168,170,190,0.5)";
  context.fill(nextFigureView);
  
  context.font = innerCircleRadius/4 + "px Arial";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.strokeText("Score: " + score, x - innerCircleRadius * 0.6, y - innerCircleRadius * 0.5, innerCircleRadius);
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








