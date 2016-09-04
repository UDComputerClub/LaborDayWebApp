var stage1 = new Image();
var stage2 = new Image();
var stageIndex = 1;
var canvasWidth = 300;
var canvasHeight = 300;
var startTime;
var ms = 1000;

function init(){
// change the image source to uploaded images
  stage1.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  stage2.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';

  startTime = new Date();

  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0,0,canvasWidth,canvasHeight); // clear canvas

  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.save();
  //ctx.translate(150,150);

  var elapsed = new Date() - startTime;
  var isStage1 = (elapsed%(2*ms))<ms;
  
  ctx.drawImage(isStage1 ? stage1 : stage2,0,0,canvasWidth,canvasHeight);

  window.requestAnimationFrame(draw);
}

init();
