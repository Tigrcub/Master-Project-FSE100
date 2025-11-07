
let background;
let screen = "menu"; 

function preload() {
  background = loadImage("ocean-scenery-cartoon-background-free-vector (1).jpg");
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
}

function draw() {
  // Background
  image(background, 0, 0, width, height);

  // Draw current screen
  if (screen === "menu") {
    drawMenu();
  } else if (screen === "play") {
    drawPlay();
  } else if (screen === "Exit") {
    drawExit();
  } else if (screen === "about") {
    drawAbout();
  } 

  // Cursor functions 
  if (overAnyButton()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

//All possible screens

function drawMenu() {
  textFont("Cooper Black");      
  fill(255, 255, 0);
  textSize(64);
  text("Super Aquatic Bros.", width/2 , 100);

  drawButton(width / 2, 250, "Play");
  drawButton(width / 2, 350, "Exit");
  drawButton(width / 2, 450, "About");
}

function drawPlay() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(48);
  text("Game Selection", width / 2, 100);
  
  //placeholder squares representing games
  
  rect(300 , 250 , 150 , 150);
  rect(500 , 250 , 150 , 150);
  rect(300 , 450 , 150 , 150);
  rect(500 , 450 , 150 , 150);
  
  drawBackButton();
}

function drawExit() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(48);
  text("Thanks for Playing!", width / 2, 300);
  drawPlayAgainButton();
}

function drawAbout() {
  textFont("Cooper Black"); 
  fill(255, 255, 0);
  textSize(64);
  text("About the Game", width / 2, 100);
  
   fill(0);
  rect(400 , 300 , 725 , 275);
  
  
  
  //Creator Message
  textSize(30);
  fill(255);
  text("Super Aquatic Bros. is a game aimed at aiding" , width /2 , 200);
  text(" recovering stroke patients struggling with day" , width /2 , 250);
   text("to day tasks in a way that is efficent and" , width /2 , 300);
  text("enjoyable. Play along as you traverse", width /2 , 350);
  text("the intricacies of the sea." , width /2 , 400);
  
  
  
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
function drawPlayAgainButton(){
  
  drawButton(width/2, height -200, "Play Again?");
}
function drawBackButton(){
  drawButton (width - 700, height - 50, "Back");
}


// Interaction (when button is pressed)

function mousePressed() {
  if (screen === "menu") {
    if (overButton(width / 2, 250)) screen = "play";
    else if (overButton(width / 2, 350)) screen = "Exit";
    else if (overButton(width / 2, 450)) screen = "about";
  } else {
    // Back/Menu button on other screens
    if (overButton(width - 100, height - 50)) screen = "menu";
  }
  if (screen == "play"){
    if(overButton(width -700 , height -50)) screen = "menu"
  }
  else if (screen == "about"){
    if(overButton(width - 700, height -50)) screen = "menu"
  }else {
    if (overButton(width/2, height -200)) screen = "menu"
  }
  
}

function overButton(x, y) {
  return mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 30 && mouseY < y + 30;
}

function overAnyButton() {
  if (screen === "menu") {
    return overButton(width / 2, 250) || overButton(width / 2, 350) || overButton(width / 2, 450);
  } else {
    return overButton(width - 100, height - 50);
  }
}
