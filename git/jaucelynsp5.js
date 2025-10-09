// ========== Game States ==========
const MENU = "menu";
const POP_BUBBLE = "pop_The_Bubble";
const NEXT_GAME_2 = "next_game";

let gameState = MENU;

// ========== #1 Bubble Game Variables ==========
let bubbles = [];
let totalBubbles = 5;
let poppedCount = 0;
let startTime;
let endTime;
let gameOver = false;

//=========== #2 next game variables ============



// ========== Setup ==========
function setup() {
  createCanvas(600, 400);
  if (gameState === POP_BUBBLE) {
    resetBubbleGame();
  }
}

// ========== Main Draw Loop ==========
function draw() {
  background(30, 30, 50);

  if (gameState === MENU) {
    drawMainMenu();
  } 
  else if (gameState === POP_BUBBLE) {
    playBubbleGame();
  } 
  else if (gameState === NEXT_GAME_2) {
    playNextGame2(); // Placeholder for your second game
  }
}

// ========== Main Menu ==========
function drawMainMenu() {
  background(50, 80, 100);
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("🎮 Mini-Game Series 🎮", width / 2, height / 2 - 60);
  textSize(20);
  text("Click to Start 'Pop the Bubbles'", width / 2, height / 2);
}

// ========== Mouse Interaction ==========
function mousePressed() {
  if (gameState === MENU) {
    gameState = POP_BUBBLE;
    resetBubbleGame();
  } 
  else if (gameState === POP_BUBBLE && gameOver) {
    gameState = NEXT_GAME_2;
  } 
  else if (gameState === POP_BUBBLE) {
    for (let i = bubbles.length - 1; i >= 0; i--) {
      let b = bubbles[i];
      if (b.contains(mouseX, mouseY)) {
        bubbles.splice(i, 1);
        poppedCount++;
        if (poppedCount === totalBubbles) {
          endTime = (millis() - startTime) / 1000;
          gameOver = true;
        }
        break;
      }
    }
  }
}

// ========== Bubble Game Logic ==========
function resetBubbleGame() {
  bubbles = [];
  for (let i = 0; i < totalBubbles; i++) {
    bubbles.push(new Bubble(random(width), random(height), random(25, 45)));
  }
  poppedCount = 0;
  startTime = millis();
  gameOver = false;
}

function playBubbleGame() {
  if (!gameOver) {
    for (let b of bubbles) {
      b.move();
      b.show();
    }

    let elapsed = (millis() - startTime) / 1000;
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text(`Time: ${elapsed.toFixed(2)}s`, 10, 30);
    text(`Popped: ${poppedCount}/${totalBubbles}`, 10, 55);
  } else {
    background(20, 80, 40);
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text(`You popped all bubbles!`, width / 2, height / 2 - 20);
    textSize(24);
    text(`Final Time: ${endTime.toFixed(2)}s`, width / 2, height / 2 + 20);
    text(`Click to play NEXT game`, width / 2, height / 2 + 50);
  }
}

// ========== Bubble Class ==========
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.color = color(150, 200, 255, 180); // light blue
  }

  move() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    // Bounce off edges
    if (this.x < this.r || this.x > width - this.r) this.xspeed *= -1;
    if (this.y < this.r || this.y > height - this.r) this.yspeed *= -1;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.r;
  }
}

// ========== Next Game Placeholder ==========
function playNextGame2() {
  background(0);
  fill(255, 255, 0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text("🚀 Next Game Placeholder 🚀", width / 2, height / 2 - 30);
  textSize(20);
  text("Add your next mini-game here!", width / 2, height / 2 + 20);
}
