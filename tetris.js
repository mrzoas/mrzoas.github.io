let field = "" +
"000000000000000000000000000000000:" +
"010000000000000000000000000000000:" +
"000000000000000000000000000000000:" +
"000000000000000000000000000000000:" +
"000000000000000000000000000000000:" +
"000000000000001000000000000000000:" +
"000000000000001000000000000000000:" +
"000000000000001000000000000000000:" +
"000000000000011100000000000000000";
field = field.split(":");
let fieldWidth = field[0].length;
let fieldHeight = field.length;
let viewWidth = 20;
let viewHeight = field.length;
let blockSize = 32;

let orient = {
  alpha : 0,
  beta : 0,
  gamma : 0
}

function init() {
  // video = document.getElementById("video");
  // video.width = document.body.clientWidth;
  // video.height = document.body.clientHeight;
  

  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('devicemotion', onMotionChange);
  window.addEventListener('deviceorientation', onOrientationChange);

        
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    video.width = window.innerWidth;
    video.height = window.innerHeight;
       
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
    }
    
  }
  
  resizeCanvas();
        
  function drawStuff() {
    let shift = 5;
    
    for (let row = 0; row < viewHeight; row++) {
      for (let column = 0; column < viewWidth; column++) {
        if (field[row][column] == "0") {
          context.fillStyle = "rgba(200,200,100,0.3)";
          console.log("0");
        } else {
          context.fillStyle = "rgba(100,100,200,0.2)";
          console.log("1");
        }
        context.fillRect(shift * column + column * blockSize, shift * row + row * blockSize, blockSize, blockSize);
      }
    }
    
  }

}


