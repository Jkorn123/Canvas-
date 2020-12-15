// Obstacle class.
class Obstacle {
  // Constructor takes parameters of the obstacle. This class creates a black
  // rectangle which will act as an obstacle in the game in which the player will
  // attempt to jump over.
  constructor (x1, y1, w, h) {
    var obsX = this.x;
    var obsY = this.y;
    var obsXVelocity = this.x_velocity;
    this.x = x1;
    this.y = y1;
    this.width = w;
    this.height = h;
    this.color = "#000000";
    this.x_velocity = -1.5;
    return obsX, obsY, obsXVelocity;
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
}

var sprite = [90, 270, 30, 30];
var x = sprite[0];
var y = sprite[1];
var velocity = 0;
var acceleration = 0;

function checkCrash(obsX, obsY, obsXVelocity) {
  /*
    Purpose: This function checks whether the sprite has crashed into the obstacle
    and will determine whether the game is over or not.
    Inputs: obsX (obstacle x coordinate), obsY (obstacle y coordinate), obsXVelocity
    (velocity of the obstacle).
    Returns: None.
  */

  var spriteRightTopX = x + 30;
  var spriteRightTopY = 270;
  var spriteBotY = y - 30;
  var obsLeftBotX = obsX;
  var obsLeftBotY = obsY - 30;

  // Checks if the sprite's right side is touching the obstacle's left side.
  if (spriteRightTopX > obsLeftBotX || spriteRightTopY == obsY) {
    obsXVelocity = 0;
    velocity = 0;
    acceleration = 0;
  }
}
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
  console.log(event);
  console.log(keyCode);
  console.log(keyStr);

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
    Inputs: None.
    Returns: None.
  */
  context.clearRect(0, 0, canvas.width, canvas.height);
  y += velocity;
  velocity -= acceleration;
  drawSprite();
  bottom();
  obstacle.moveObstacle();
  obstacle.draw();
  window.requestAnimationFrame(gameStart);

}

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = 600;
canvas.height = 300;
canvas.style.border = "1px solid black";

document.addEventListener("keydown", myKeyDown)
// Set up the context for the animation
context = canvas.getContext("2d");
obstacle = new Obstacle(570, 270, 40, 30);
window.requestAnimationFrame(gameStart);
