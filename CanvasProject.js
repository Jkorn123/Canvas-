var sprite = [90, 270, 30, 30];
var x = sprite[0];
var y = sprite[1];
var velocity = 0;
var acceleration = 0;

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
  obstacle = new Obstacle(570, 280, 40, 30);
  obstacle.draw();
  obstacle.moveObstacle();
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
window.requestAnimationFrame(gameStart);
