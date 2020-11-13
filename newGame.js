// Circle Variables
var radius = 50
var circle = [0, 0, radius]
var circleChange = [0, 0]

// The first two coordinates are one end, the second two are the other end.
var line = [0, 0, 0, 0];
var lineChange = [1, 2, 3, 4];

// Count frames, track time so we can compute fps rate
var frames = 0;
var start = new Date();
var now = new Date();
console.log(start);

function myKeyDown (event) {
  keyCode = event.which;
  keyStr = event.key;
  console.log(event);
  console.log(keyCode);
  console.log(keyStr);

  if (keyStr == 'w') {
    // Move circle up
    circleChange[1] -= 1;
  }
  if (keyStr == 'a') {
    // Move circle left
    circleChange[0] -= 1;
  }
  if (keyStr == 's') {
    // Move circle down
    circleChange[1] += 1;
  }
  if (keyStr == 'd') {
    // Move circle right
    circleChange[0] += 1;
  }
}

function drawCircle()
/*
  Purpose: Draws a circle.
  Inputs: None.
  Returns: None.
*/
{
  context.beginPath();
  context.arc(circle[0], circle[1], circle[2], 0, 2 * Math.PI);
  context.fillStyle = "#FF0000";
  context.fill();

  circle[0] += circleChange[0]
  circle[1] += circleChange[1]
}

function drawAll()
/*
  Purpose: This is the main drawing loop.
  Inputs: None, but it is affected by what the other functions are doing
  Returns: None, but it calls itself to cycle to the next frame
*/
{
  frames += 1;
  if (frames % 200 == 0) {
    now = new Date();
    msecs = now.getTime() - start.getTime();
    console.log(now.getTime());
    console.log("fps:", (frames / msecs) * 1000);
  }

  // Change the line endpoints some.
  line[0] += lineChange[0];
  line[1] += lineChange[1];
  line[2] += lineChange[2];
  line[3] += lineChange[3];



  // If the line hits the end of the canvas, bounce
  // Add/subtract a little speed
  if ((line[0] > canvas.width) || (line[0] < 0)) {
    lineChange[0] *= -1;
    lineChange[0] += Math.random() - 0.5;
    // console.log(lineChange);
  }
  if ((line[1] > canvas.height) || (line[1] < 0)) {
    lineChange[1] *= -1;
    lineChange[1] += Math.random() - 0.5;
    // console.log(lineChange);
  }
  if ((line[2] > canvas.width) || (line[2] < 0)) {
    lineChange[2] *= -1;
    lineChange[2] += Math.random() - 0.5;
    // console.log(lineChange);
  }
  if ((line[3] > canvas.height) || (line[3] < 0)) {
    lineChange[3] *= -1;
    lineChange[3] += Math.random() - 0.5;
    // console.log(lineChange);
  }
  // Draw the line
  context.clearRect(0, 0, canvas.width, canvas.height);
//  context.lineWidth = 3;
//  context.lineCap = 'round';
//  context.beginPath();
//  context.moveTo(line[0], line[1]);
//  context.lineTo(line[2], line[3]);
  context.fillStyle = "#00ff00";
  context.fillRect(line[0], line[1], line[2] - line[0], line[3] - line[1]);
  context.stroke();

  drawCircle()

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
}


// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - 20;
canvas.height = windowHeight - 20;
canvas.style.border = "1px solid black";

document.addEventListener("keydown", myKeyDown);
// Set up the context for the animation
context = canvas.getContext("2d");

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
