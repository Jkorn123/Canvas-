// Obstacle class.
class Obstacle {
  // Constructor takes parameters of the obstacle. This class creates a black
  // rectangle which will act as an obstacle in the game in which the player will
  // attempt to jump over.
  constructor (x1, y1, w, h) {
    this.x = x1;
    this.y = y1;
    this.width = w;
    this.height = h;
    this.color = "#000000";
    this.x_velocity = -3;
  }


  draw() {
    //Draws the Obstacle.
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.color;
    context.fill();
  }

  moveObstacle() {
    this.x += this.x_velocity;

  }

  checkCrash() {
    var spriteLeftTopX = x;
    var spriteRightTopX = x + 30;
    var spriteTopY = y;
    var spriteBotY = y + 30;
    var obsLeftX = this.x;
    var obsRightX = this.x + 40;
    var obsTopY = this.y;
    var obsBotY = this.y + 30;
    if ((spriteRightTopX >= obsLeftX) && (spriteRightTopX <= obsRightX)) {
      if ((spriteBotY >= obsTopY)) {
        crash = true;
        console.log(crash);
      }
    }
    if ((spriteLeftTopX <= obsRightX) && (spriteLeftTopX >= obsLeftX)) {
      if ((spriteBotY >= obsTopY)) {
        crash = true;
        console.log(crash);
      }
    }
  }
}

var sprite = [90, 270, 30, 30];
var x = sprite[0];
var y = sprite[1];
var velocity = 0;
var acceleration = 0;
var crash = false;
var addObstacles = [];

function drawSprite() {
  /*
    Purpose: Draws the sprite.
    Inputs: None.
    Returns: None.
  */

  context.beginPath();
  context.rect(x, y, sprite[2], sprite[3]);
  context.fillStyle = "#00ff00";
  context.fill();
}

function myKeyDown (event) {
  /*
    Purpose: Allows for sprite movement and gets key press
    Inputs: event.
    Returns: None.
  */

  keyCode = event.which;
  keyStr = event.key;

  if ((keyStr == 'w') && (velocity == 0)) {
    acceleration = -0.1;
    velocity -= 4;
  }
}

function bottom() {
  /*
    Purpose: Checks if the spirte touches the bottom of the canvas.
    Inputs: None.
    Returns: None.
  */
  var bot = canvas.height - 30;
  if (y > bot) {
    y = bot;
    acceleration = 0;
    velocity = 0;
  }
}

function gameStart() {
  /*
    Purpose: The main function that runs the entire game by implementing all the
    functions.
    Inputs: crash (checking whether the two objects crashed into each other).
    Returns: None.
  */
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (crash != true) {
    y += velocity;
    velocity -= acceleration;
    drawSprite();
    bottom();

    obstacle.draw();
    obstacle.moveObstacle();
    obstacle.checkCrash();

  } else {
    // Game over text.
    context.font = "20px Courier";
    context.fillText("Game Over!", 240, 150);
  }
  // Redraws the obstacle after the sprite reaches the end of the screen.
  if (obstacle.x < 0) {
    obstacle.x = 570;
  }

  window.requestAnimationFrame(gameStart);

}

// Get the canvas, set the width and height from the window.
canvas = document.getElementById("mainCanvas")
// Gets the frames for the canvas.

canvas.width = 600
canvas.height = 300
canvas.style.border = "1px solid black"

document.addEventListener("keydown", myKeyDown)
// Set up the context for the animation
context = canvas.getContext("2d");
obstacle = new Obstacle(570, 270, 40, 30);
window.requestAnimationFrame(gameStart);
