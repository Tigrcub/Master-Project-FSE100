// ===== Game States =====
const CARD_GAME = "card_game";
let gameState = CARD_GAME;

// ===== Card Game Variables =====
let cards = [];
let startTime = 0;
let gameOver = false;
let counterCards;
let foundPairs;
let cardsFlipped;
//cards for comparing!
let cardID1;
let cardID2;

// ===== Setup ===== 
function setup() 
{
  createCanvas(600, 400);
  if(gameState == CARD_GAME)
  {
    bg = loadImage("/assets/OceanWaveBG.png");
    resetMemoryGame();
  }
}

// ========== Main Draw Loop ==========
function draw()
{
  
  if (gameState === CARD_GAME) 
    {
    background(bg); 
    playMemoryGame();
    }
}

function mousePressed()
{
  if(gameState == CARD_GAME)
    {
      for(let i = cards.length - 1; i >= 0; i--)
      {
        cards[i].clicked();
        if(cards[i].front && cardsFlipped == 0)
        {
          cardID1 = i;
          cardsFlipped = 1;
          cards[i].front = true;
          cards[i].card1 = true;
        }
        else if(cards[i].front && cardsFlipped == 1 && !cards[i].card1)
        {
          cardID2 = i;
          cardsFlipped = 2;
          cards[i].front = true;
        }
      }
      
    }
}

//Reset function for playing the game
function resetMemoryGame()
{
  //Setup cards and variables
  cards = [];
  cards[0] = new card(1);
  cards[1] = new card(1);
  cards[2] = new card(2);
  cards[3] = new card(2);
  cards[4] = new card(3);
  cards[5] = new card(3);
  cards[6] = new card(4);
  cards[7] = new card(4);
  cards = shuffle(cards);
  foundPairs = 0;
  counterCards = 1;
  gameOver = false;
  cardsFlipped = 0;
}

//Playing the game
function playMemoryGame()
{
  if (!gameOver)
  {
    //first part is a cutscene
    //spawn the cards in the middle
    //Then move each card 1 by 1 to a specfied location
    for(let c of cards)
    {
      c.show();
      //Cutscene
      if(counterCards == 1)
        {
          cards[7].move(-1.5, -0.5);
          if (cards[7].y == 90)
            {
            counterCards = 2;
            cards[7].stop();
            }
        }
      if(counterCards == 2)
        {
          cards[6].move(1.5, -0.5);
          if (cards[6].y == 90)
            {
            counterCards = 3;
            cards[6].stop();
            }
        }
      if(counterCards == 3)
        {
          cards[5].move(1.5, 0.5);
          if (cards[5].y == 210)
            {
            counterCards = 4;
            cards[5].stop();
            }
        }
            if(counterCards == 4)
        {
          cards[4].move(-1.5, 0.5);
          if (cards[4].y == 210)
            {
            counterCards = 5;
            cards[4].stop();
            }
        }
      if(counterCards == 5)
        {
          cards[3].move(-1, -1);
          if (cards[3].y == 90)
            {
            counterCards = 6;
            cards[3].stop();
            }
        }
      if(counterCards == 6)
        {
          cards[2].move(1, -1);
          if (cards[2].y == 90)
            {
            counterCards = 7;
            cards[2].stop();
            }
        }
      if(counterCards == 7)
        {
          cards[1].move(1, 1);
          if (cards[1].y == 210)
            {
            counterCards = 8;
            cards[1].stop();
            }
        }
      if(counterCards == 8)
        {
          cards[0].move(-1, 1);
          if (cards[0].y == 210)
            {
            counterCards = 9;
            cards[0].stop();
            }
        }
      //if 2 cards are found
      if(cardsFlipped == 2)
        {
          //match found
          if(cards[cardID1].value == cards[cardID2].value)
            { 
              ++foundPairs;
              cards[cardID1].locked = true;
              cards[cardID2].locked = true;
              cardsFlipped = 0;
            }
          else
            {
              cards[cardID1].front = false;
              cards[cardID2].front = false;
            }
          cardsFlipped = 0;
          cards[cardID1].card1 = false;
          cardID1 = 9;
          cardID2 = 9;
        }
    }
  }
  
}

// ===== Card Class ========
class card 
{
  constructor(value)
  {
//Value of the card, matches with a pair
    this.value = value;
    this.front = false;
    this.card1 = false;
    this.locked = false;
    //default position (middle)
    this.x = 250;
    this.y = 150;
    //speed value
    this.xSpeed = 10;
    this.ySpeed = 10;
    //size for every card
    this.w = 70;
    this.h = 100;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    //inilize the card picture based on value
    //value 1 = rainbow fish
    if(this.value == 1)
    {
      this.img = loadImage('/assets/RainbowFish.png');    
    }
    //value 2 = cute seahorse
    if(this.value == 2)
    {
      this.img = loadImage('/assets/CuteSeahorse.png');    
    }
    //value 3 = cartoon clam
    if(this.value == 3)
    {
      this.img = loadImage('/assets/CartoonClam.png');    
    }
    //value 4 = octopus cartoon
    if(this.value == 4)
    {
      this.img = loadImage('/assets/Octopuscartoon.png');    
    }
  }
//Class that shows the card
  show()
  {
    stroke(30);
    strokeWeight(3);
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    if(this.front || this.locked)
      image(this.img, this.x + 10, this.y + 30, 50, 50);
  }
//Class that moves the card's location
  move(xSpeed, ySpeed)
  {
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
//A class to stop the card in its place
  stop()
  {
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
//To make the cards touchable
  clicked()
  {
//hitboxes, only works if front is false, and cutscene is over
    if(!this.front && counterCards == 9)
    {  
      var c1 = dist(mouseX, mouseY, this.x + 35, this.y + 20);
      var c2 = dist(mouseX, mouseY, this.x + 35, this.y + 80);
      var c3 = dist(mouseX, mouseY, this.x + 10, this.y + 50);
      var c4 = dist(mouseX, mouseY, this.x + 60, this.y + 50);
      if(c1 < 30)
      {
        this.front = true;
      }
      if(c2 < 30)
      {
        this.front = true;
      }
      if(c3 < 20)
      {
        this.front = true;
      }
      if(c4 < 20)
      {
        this.front = true;
      }
    }
  }
}