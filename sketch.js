let sharks = [];
let numSharks = 10;
let playerSize = 10;
let sharkImg;

function preload() {
  sharkImg = loadImage("Shark (1).png");
  backgroundImg = loadImage("ocean.png");
}

function setup() {
  createCanvas(800, 600);
  startAvoidSharks();
}

function draw() {
  drawAvoidSharks();
}

function drawButton(x, y, label) {
  rectMode(CENTER);
  
  // Hover effect
  if (overButton(x, y)) {
    fill(255, 100, 0, 150); 
  } else {
    fill(255, 0, 0, 150); 
  }
  rect(x, y, 200, 60, 15);

  textFont("Comic Sans");  
  fill(255);
  textSize(32);
  text(label, x, y);
}
function overButton(x, y) {
  return mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 30 && mouseY < y + 30;
}



// --------------------------------
// AVOID THE SHARKS MINIGAME 
// --------------------------------

function startAvoidSharks() {
  sharks = [];
  for (let i = 0; i < numSharks; i++) {
    sharks.push(new Shark());
  }
}

function drawAvoidSharks() {
  background(backgroundImg);

  // player (mouse)
  fill(255, 255, 0);
  noStroke();
  ellipse(mouseX, mouseY, playerSize);

  // sharks
  for (let s of sharks) {
    s.update();
    s.show();

    if (dist(mouseX, mouseY, s.x, s.y) < playerSize / 2 + s.size / 2) {
      gameOverAvoidSharks();
    }
  }
}

function gameOverAvoidSharks() {
  noLoop();
  
  
  background(0,0,0,150);
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  textFont("Comic Sans");
  text("You got eaten!", width / 2, height / 2);
  drawTryAgainButton();
}


function drawTryAgainButton(){
  drawButton(width/2, height - 200, "Try Again?");
}







// --------------------------------
// SHARK CLASS
// --------------------------------

class Shark {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 50;
    this.speed = random(2, 4);
    this.vx = random([-1, 1]) * this.speed;
    this.vy = random([-1, 1]) * this.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  show() {
    if (sharkImg) {
      image(sharkImg, this.x - 25, this.y - 25, 50, 50);
    } else {
      fill(200, 0, 0);
      ellipse(this.x, this.y, this.size);
    }
  }
}
