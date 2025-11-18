// ===== Menu variables =====
let menuScreen = "menu"; // "menu", "play", "Exit", "about"

// ========== Main Menu ==========
function drawMainMenu() {
  // Background
  if (typeof menuBgImg !== "undefined" && menuBgImg) {
    image(menuBgImg, 0, 0, width, height);
  } else {
    background(50, 80, 100);
  }

  // Draw current screen
  if (menuScreen === "menu") {
    drawMenuScreen();
  } else if (menuScreen === "play") {
    drawPlayScreen();
  } else if (menuScreen === "Exit") {
    drawExitScreen();
  } else if (menuScreen === "about") {
    drawAboutScreen();
  }

  // Cursor functions 
  if (overAnyButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

//All possible screens

function drawMenuScreen() {
  textFont("Cooper Black");      
  fill(255, 255, 0);
  textSize(64);
  text("Super Aquatic Bros.", width / 2, 100);

  drawButton(width / 2, 250, "Play");
  drawButton(width / 2, 350, "Exit");
  drawButton(width / 2, 450, "About");
}

function drawPlayScreen() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(48);
  text("Game Selection", width / 2, 100);
  
  // placeholder squares representing games
  rectMode(CORNER);
  fill(0, 0, 0, 80);
  rect(300, 250, 150, 150); // Bubble Pop
  rect(500, 250, 150, 150); // Card Game
  rect(300, 450, 150, 150); // Jellyfishing
  rect(500, 450, 150, 150); // Avoid The Shark
  
  drawBackButton();
}

function drawExitScreen() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(48);
  text("Thanks for Playing!", width / 2, 300);
  drawPlayAgainButton();
}

function drawAboutScreen() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(64);
  text("About the Game", width / 2, 100);
  
  rectMode(CENTER);
  fill(0, 0, 0, 150);
  rect(width / 2, 320, 725, 275);
  
  //Creator Message
  textSize(30);
  fill(255);
  text("Super Aquatic Bros. is a game aimed at aiding" , width / 2, 230);
  text("recovering stroke patients struggling with day" , width / 2, 270);
  text("to day tasks in a way that is efficent and" , width / 2, 310);
  text("enjoyable. Play along as you traverse", width / 2, 350);
  text("the intricacies of the sea." , width / 2, 390);
  
  drawBackButton();
}

// Button functions
function drawButton(x, y, label) {
  rectMode(CENTER);
  
  // Hover effect
  if (overButton(x, y)) {
    fill(0, 153, 255, 220); // brighter blue on hover
  } else {
    fill(0, 102, 204, 200); // normal blue
  }
  rect(x, y, 200, 60, 15);

  textFont("Comic Sans MS");  
  fill(255);
  textSize(32);
  text(label, x, y);
}

function drawMenuButton() {
  drawButton(width - 100, height - 50, "Menu"); 
}

function drawPlayAgainButton() {
  drawButton
