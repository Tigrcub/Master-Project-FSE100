let bg;
let screen = "menu"; // Tracks current screen

function preload() {
  bg = loadImage("ocean-scenery-cartoon-background-free-vector (1).jpg");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  // Draw background
  image(bg, 0, 0, width, height);

  // Draw current screen
  if (screen === "menu") {
    drawMenu();
  } else if (screen === "play") {
    drawPlay();
  } else if (screen === "settings") {
    drawSettings();
  } else if (screen === "about") {
    drawAbout();
  }
}

// -------------------
// Screen drawing functions
// -------------------
function drawMenu() {
  fill(255, 255, 0);
  textSize(48);
  text("Super Aquatic Bros.", width / 2, 100);

  drawButton(width / 2, 250, "Play");
  drawButton(width / 2, 350, "Settings");
  drawButton(width / 2, 450, "About");
}

function drawPlay() {
  fill(255, 255, 0);
  textSize(48);
  text("Game Selection", width / 2, 100);
  drawBackButton();
}

function drawSettings() {
  fill(255, 255, 0);
  textSize(48);
  text("Settings", width / 2, 100);
  drawBackButton();
}

function drawAbout() {
  fill(255, 255, 0);
  textSize(48);
  text("About the Game", width / 2, 100);
  drawBackButton();
}

// -------------------
// Button functions
// -------------------
function drawButton(x, y, label) {
  rectMode(CENTER);
  // Hover effect
  if (overButton(x, y)) {
    fill(0, 153, 255, 220); // brighter blue on hover
  } else {
    fill(0, 102, 204, 200); // normal blue
  }
  rect(x, y, 200, 60, 15);

  fill(255);
  textSize(32);
  text(label, x, y);
}

function drawBackButton() {
  drawButton(width - 100, height - 50, "Menu"); // bottom-right corner
}

// -------------------
// Interaction
// -------------------
function mousePressed() {
  if (screen === "menu") {
    if (overButton(width / 2, 250)) screen = "play";
    else if (overButton(width / 2, 350)) screen = "settings";
    else if (overButton(width / 2, 450)) screen = "about";
  } else {
    // Back/Menu button on other screens
    if (overButton(width - 100, height - 50)) screen = "menu";
  }
}

function overButton(x, y) {
  return mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 30 && mouseY < y + 30;
}
