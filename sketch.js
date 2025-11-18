// ========== Game States ====================== omfg the aneurism i had 
const MENU = "menu";
const POP_BUBBLE = "pop_The_Bubble";
//const NEXT_GAME_2 = "next_game";
const CARD_GAME = "card_Game";
const JELLYFISHING = "jellyfishing";
const AVOID_SHARK = "avoid_The_Shark"

let gameState = MENU;

// Shared images
let bbgbg;      // bubble pop background
let jellyImg;   // jellyfishing image (set in preload via jellyfishURL)
let menuBgImg;  // main menu background

// ========== Setup ==========
function setup() {
  // use same size as your menu design + background image
  createCanvas(800, 600);
}

// Single global preload for all images
function preload() {
  // Bubble Pop background — local file in your repo
  bbgbg = loadImage("bubblebackground.jpg");

  // Menu background — local file in your repo
  menuBgImg = loadImage("ocean-scenery-cartoon-background-free-vector (1).jpg");

  // Jellyfishing image (remote, defined in jellyfishing.js)
  if (typeof jellyfishURL !== "undefined") {
    jellyImg = loadImage(
      jellyfishURL,
      () => {},
      () => {
        jellyImg = null;
      }
    );
  }
}

// ========== Main Menu if loop ==========
function draw() {
  background(20, 30, 50);

  if (gameState === MENU) {
    drawMainMenu();
  } 
  else if (gameState === POP_BUBBLE) {
    playBubbleGame();
  } 
  else if (gameState === CARD_GAME) {
    playCardGame(); // Placeholder for Jace's game
  }
  else if (gameState === JELLYFISHING) {
    playJellyfishing(); // Logan's game
  }
  else if (gameState === AVOID_SHARK) {
    playAvoidTheShark(); // Oscar's game
  }
}

// ========== buttons and mouse navigation ==========
function mousePressed() {
  if (gameState === MENU) {
    handleMenuClick();
  } 
  else if (gameState === POP_BUBBLE && gameOver) {
    // After bubble game ends, go to next game (for now: CARD_GAME)
    gameState = CARD_GAME;
  } 
  else if (gameState === POP_BUBBLE) {
    handleBubbleMousePressed();
  } 
  else if (gameS
