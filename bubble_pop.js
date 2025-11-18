// ========== BUBBLE_POP variables ============
let bubbles = [];
let totalBubbles = 5;
let poppedCount = 0;
let startTime;
let endTime;
let gameOver = false;

// Draw the bubble background
function drawBubbleGame() {
  if (typeof bbgbg !== "undefined" && bbgbg) {
    background(bbgbg);
  } else {
    background(0, 0, 80);
  }
}

function resetBubbleGame() {
  bubbles = [];
  for (let i = 0; i < totalBubbles; i++) {
    let r = random(25, 45);                    
    let x = random(r, width - r);              
    let y = random(r, height - r);            
    bubbles.push(new Bubble(x, y, r));
  }
  poppedCount = 0;
  startTime = millis();
  gameOver = false;
}

function playBubbleGame() {
  if (!gameOver) {
    drawBubbleGame();
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

// Handle clicks during the bubble game
function handleBubbleMousePressed() {
  if (gameOver) return;

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

// ========== Class for the actual bubbles ==========
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.color = color(150, 200, 255, 180); // light blue - ish
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
